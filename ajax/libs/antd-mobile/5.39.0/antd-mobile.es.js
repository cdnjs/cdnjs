import * as I from "react";
import s, { useContext as it, useRef as V, useMemo as de, useEffect as Q, useState as X, useCallback as Qe, useLayoutEffect as za, forwardRef as Ee, useImperativeHandle as ke, memo as ze, isValidElement as zn, createContext as zs, cloneElement as w0 } from "react";
import * as C0 from "react-dom";
import x0, { unstable_batchedUpdates as tf, createPortal as k0, findDOMNode as $0 } from "react-dom";
const Nr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
Nr && document.addEventListener("touchstart", () => {
}, !0);
var Ca = function() {
  return Ca = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, Ca.apply(this, arguments);
};
function un(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Pe(t, e, n, r) {
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
function _0(t, e) {
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
function S0(t) {
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
function It(t, e) {
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
function qs(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, a; r < i; r++)
      (a || !(r in e)) && (a || (a = Array.prototype.slice.call(e, 0, r)), a[r] = e[r]);
  return t.concat(a || Array.prototype.slice.call(e));
}
const Je = "${label}不是一个有效的${type}", O0 = {
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
        string: Je,
        method: Je,
        array: Je,
        object: Je,
        number: Je,
        date: Je,
        boolean: Je,
        integer: Je,
        float: Je,
        regexp: Je,
        email: Je,
        url: Je,
        hex: Je
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
}, F0 = O0, nf = {
  current: {
    locale: F0
  }
};
function sy(t) {
  nf.current = t;
}
function Fi() {
  return nf.current;
}
const rf = s.createContext(null), ly = (t) => {
  const {
    children: e
  } = t, n = un(t, ["children"]), r = ue();
  return s.createElement(rf.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function ue() {
  var t;
  return (t = it(rf)) !== null && t !== void 0 ? t : Fi();
}
function pe(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var mt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $t(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var af = { exports: {} };
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
})(af);
var N0 = af.exports;
const j = /* @__PURE__ */ $t(N0);
function W(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = j(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
  for (const r in t)
    t.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = t[r]);
  return s.cloneElement(e, n);
}
function q(...t) {
  const e = {};
  return t.forEach((n) => {
    n && Object.keys(n).forEach((r) => {
      n[r] !== void 0 && (e[r] = n[r]);
    });
  }), e;
}
function gn(t, ...e) {
  for (let n = e.length - 1; n >= 0; n -= 1)
    if (e[n] !== void 0)
      return e[n];
  return t;
}
var of = function(t) {
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
}, Rr = function(t) {
  return typeof t == "function";
}, R0 = function(t) {
  return typeof t == "number";
}, P0 = !1;
const Ni = P0;
function Yt(t) {
  Ni && (Rr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = V(t);
  e.current = de(function() {
    return t;
  }, [t]);
  var n = V();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const Us = of(Q);
function ec(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function qa(t) {
  var e = V(t);
  return e.current = t, e;
}
var M0 = function(t) {
  Ni && (Rr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = qa(t);
  Q(function() {
    return function() {
      e.current();
    };
  }, []);
};
const Ri = M0;
function A0(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Ks = A0, I0 = typeof mt == "object" && mt && mt.Object === Object && mt, T0 = I0, L0 = T0, D0 = typeof self == "object" && self && self.Object === Object && self, V0 = L0 || D0 || Function("return this")(), sf = V0, j0 = sf, B0 = function() {
  return j0.Date.now();
}, W0 = B0, Z0 = /\s/;
function H0(t) {
  for (var e = t.length; e-- && Z0.test(t.charAt(e)); )
    ;
  return e;
}
var z0 = H0, q0 = z0, U0 = /^\s+/;
function K0(t) {
  return t && t.slice(0, q0(t) + 1).replace(U0, "");
}
var Y0 = K0, G0 = sf, X0 = G0.Symbol, lf = X0, tc = lf, cf = Object.prototype, Q0 = cf.hasOwnProperty, J0 = cf.toString, Br = tc ? tc.toStringTag : void 0;
function em(t) {
  var e = Q0.call(t, Br), n = t[Br];
  try {
    t[Br] = void 0;
    var r = !0;
  } catch {
  }
  var i = J0.call(t);
  return r && (e ? t[Br] = n : delete t[Br]), i;
}
var tm = em, nm = Object.prototype, rm = nm.toString;
function im(t) {
  return rm.call(t);
}
var am = im, nc = lf, om = tm, sm = am, lm = "[object Null]", cm = "[object Undefined]", rc = nc ? nc.toStringTag : void 0;
function um(t) {
  return t == null ? t === void 0 ? cm : lm : rc && rc in Object(t) ? om(t) : sm(t);
}
var fm = um;
function dm(t) {
  return t != null && typeof t == "object";
}
var mm = dm, hm = fm, vm = mm, pm = "[object Symbol]";
function gm(t) {
  return typeof t == "symbol" || vm(t) && hm(t) == pm;
}
var ym = gm, bm = Y0, ic = Ks, Em = ym, ac = NaN, wm = /^[-+]0x[0-9a-f]+$/i, Cm = /^0b[01]+$/i, xm = /^0o[0-7]+$/i, km = parseInt;
function $m(t) {
  if (typeof t == "number")
    return t;
  if (Em(t))
    return ac;
  if (ic(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = ic(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = bm(t);
  var n = Cm.test(t);
  return n || xm.test(t) ? km(t.slice(2), n ? 2 : 8) : wm.test(t) ? ac : +t;
}
var _m = $m, Sm = Ks, _o = W0, oc = _m, Om = "Expected a function", Fm = Math.max, Nm = Math.min;
function Rm(t, e, n) {
  var r, i, a, o, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(Om);
  e = oc(e) || 0, Sm(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? Fm(oc(n.maxWait) || 0, e) : a, m = "trailing" in n ? !!n.trailing : m);
  function p(C) {
    var k = r, O = i;
    return r = i = void 0, u = C, o = t.apply(O, k), o;
  }
  function b(C) {
    return u = C, l = setTimeout(h, e), f ? p(C) : o;
  }
  function y(C) {
    var k = C - c, O = C - u, P = e - k;
    return d ? Nm(P, a - O) : P;
  }
  function g(C) {
    var k = C - c, O = C - u;
    return c === void 0 || k >= e || k < 0 || d && O >= a;
  }
  function h() {
    var C = _o();
    if (g(C))
      return x(C);
    l = setTimeout(h, y(C));
  }
  function x(C) {
    return l = void 0, m && r ? p(C) : (r = i = void 0, o);
  }
  function v() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? o : x(_o());
  }
  function w() {
    var C = _o(), k = g(C);
    if (r = arguments, i = this, c = C, k) {
      if (l === void 0)
        return b(c);
      if (d)
        return clearTimeout(l), l = setTimeout(h, e), p(c);
    }
    return l === void 0 && (l = setTimeout(h, e)), o;
  }
  return w.cancel = v, w.flush = E, w;
}
var uf = Rm;
const Pm = /* @__PURE__ */ $t(uf);
var Mm = !!(typeof window < "u" && window.document && window.document.createElement);
const Ys = Mm;
var Am = uf, Im = Ks, Tm = "Expected a function";
function Lm(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(Tm);
  return Im(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Am(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var Dm = Lm;
const Vm = /* @__PURE__ */ $t(Dm);
var jm = function(t) {
  Ni && (Rr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), Q(function() {
    t == null || t();
  }, []);
};
const Bm = jm;
var Wm = function() {
  var t = It(X({}), 2), e = t[1];
  return Qe(function() {
    return e({});
  }, []);
};
const ff = Wm;
function fn(t, e) {
  if (Ys) {
    if (!t)
      return e;
    var n;
    return Rr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var Zm = function(t) {
  return t.every(function(e) {
    var n = fn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, Hm = function(t) {
  return t ? t.getRootNode() : document;
}, zm = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return Zm(e) ? Hm(fn(e[0])) : document;
};
const qm = zm;
var Um = function(t) {
  var e = function(n, r, i) {
    var a = V(!1), o = V([]), l = V([]), c = V();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return fn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== o.current.length || !ec(d, o.current) || !ec(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, l.current = r, c.current = n());
    }), Ri(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return e;
};
const df = Um;
var Km = df(Q);
const Gs = Km;
function mf(t, e, n) {
  n === void 0 && (n = "click");
  var r = qa(t);
  Gs(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = fn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, a = qm(e), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(l) {
      return a.addEventListener(l, i);
    }), function() {
      o.forEach(function(l) {
        return a.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var hf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", p = "year", b = "date", y = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(S) {
      var $ = ["th", "st", "nd", "rd"], R = S % 100;
      return "[" + S + ($[(R - 20) % 10] || $[R] || $[0]) + "]";
    } }, v = function(S, $, R) {
      var F = String(S);
      return !F || F.length >= $ ? S : "" + Array($ + 1 - F.length).join(R) + S;
    }, E = { s: v, z: function(S) {
      var $ = -S.utcOffset(), R = Math.abs($), F = Math.floor(R / 60), N = R % 60;
      return ($ <= 0 ? "+" : "-") + v(F, 2, "0") + ":" + v(N, 2, "0");
    }, m: function S($, R) {
      if ($.date() < R.date())
        return -S(R, $);
      var F = 12 * (R.year() - $.year()) + (R.month() - $.month()), N = $.clone().add(F, d), T = R - N < 0, A = $.clone().add(F + (T ? -1 : 1), d);
      return +(-(F + (R - N) / (T ? N - A : A - N)) || 0);
    }, a: function(S) {
      return S < 0 ? Math.ceil(S) || 0 : Math.floor(S);
    }, p: function(S) {
      return { M: d, y: p, w: f, d: u, D: b, h: c, m: l, s: o, ms: a, Q: m }[S] || String(S || "").toLowerCase().replace(/s$/, "");
    }, u: function(S) {
      return S === void 0;
    } }, w = "en", C = {};
    C[w] = x;
    var k = function(S) {
      return S instanceof L;
    }, O = function S($, R, F) {
      var N;
      if (!$)
        return w;
      if (typeof $ == "string") {
        var T = $.toLowerCase();
        C[T] && (N = T), R && (C[T] = R, N = T);
        var A = $.split("-");
        if (!N && A.length > 1)
          return S(A[0]);
      } else {
        var D = $.name;
        C[D] = $, N = D;
      }
      return !F && N && (w = N), N || !F && w;
    }, P = function(S, $) {
      if (k(S))
        return S.clone();
      var R = typeof $ == "object" ? $ : {};
      return R.date = S, R.args = arguments, new L(R);
    }, _ = E;
    _.l = O, _.i = k, _.w = function(S, $) {
      return P(S, { locale: $.$L, utc: $.$u, x: $.$x, $offset: $.$offset });
    };
    var L = function() {
      function S(R) {
        this.$L = O(R.locale, null, !0), this.parse(R);
      }
      var $ = S.prototype;
      return $.parse = function(R) {
        this.$d = function(F) {
          var N = F.date, T = F.utc;
          if (N === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(N))
            return /* @__PURE__ */ new Date();
          if (N instanceof Date)
            return new Date(N);
          if (typeof N == "string" && !/Z$/i.test(N)) {
            var A = N.match(g);
            if (A) {
              var D = A[2] - 1 || 0, B = (A[7] || "0").substring(0, 3);
              return T ? new Date(Date.UTC(A[1], D, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, B)) : new Date(A[1], D, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, B);
            }
          }
          return new Date(N);
        }(R), this.$x = R.x || {}, this.init();
      }, $.init = function() {
        var R = this.$d;
        this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
      }, $.$utils = function() {
        return _;
      }, $.isValid = function() {
        return this.$d.toString() !== y;
      }, $.isSame = function(R, F) {
        var N = P(R);
        return this.startOf(F) <= N && N <= this.endOf(F);
      }, $.isAfter = function(R, F) {
        return P(R) < this.startOf(F);
      }, $.isBefore = function(R, F) {
        return this.endOf(F) < P(R);
      }, $.$g = function(R, F, N) {
        return _.u(R) ? this[F] : this.set(N, R);
      }, $.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, $.valueOf = function() {
        return this.$d.getTime();
      }, $.startOf = function(R, F) {
        var N = this, T = !!_.u(F) || F, A = _.p(R), D = function(ve, U) {
          var ee = _.w(N.$u ? Date.UTC(N.$y, U, ve) : new Date(N.$y, U, ve), N);
          return T ? ee : ee.endOf(u);
        }, B = function(ve, U) {
          return _.w(N.toDate()[ve].apply(N.toDate("s"), (T ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), N);
        }, H = this.$W, Z = this.$M, K = this.$D, Y = "set" + (this.$u ? "UTC" : "");
        switch (A) {
          case p:
            return T ? D(1, 0) : D(31, 11);
          case d:
            return T ? D(1, Z) : D(0, Z + 1);
          case f:
            var re = this.$locale().weekStart || 0, se = (H < re ? H + 7 : H) - re;
            return D(T ? K - se : K + (6 - se), Z);
          case u:
          case b:
            return B(Y + "Hours", 0);
          case c:
            return B(Y + "Minutes", 1);
          case l:
            return B(Y + "Seconds", 2);
          case o:
            return B(Y + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, $.endOf = function(R) {
        return this.startOf(R, !1);
      }, $.$set = function(R, F) {
        var N, T = _.p(R), A = "set" + (this.$u ? "UTC" : ""), D = (N = {}, N[u] = A + "Date", N[b] = A + "Date", N[d] = A + "Month", N[p] = A + "FullYear", N[c] = A + "Hours", N[l] = A + "Minutes", N[o] = A + "Seconds", N[a] = A + "Milliseconds", N)[T], B = T === u ? this.$D + (F - this.$W) : F;
        if (T === d || T === p) {
          var H = this.clone().set(b, 1);
          H.$d[D](B), H.init(), this.$d = H.set(b, Math.min(this.$D, H.daysInMonth())).$d;
        } else
          D && this.$d[D](B);
        return this.init(), this;
      }, $.set = function(R, F) {
        return this.clone().$set(R, F);
      }, $.get = function(R) {
        return this[_.p(R)]();
      }, $.add = function(R, F) {
        var N, T = this;
        R = Number(R);
        var A = _.p(F), D = function(Z) {
          var K = P(T);
          return _.w(K.date(K.date() + Math.round(Z * R)), T);
        };
        if (A === d)
          return this.set(d, this.$M + R);
        if (A === p)
          return this.set(p, this.$y + R);
        if (A === u)
          return D(1);
        if (A === f)
          return D(7);
        var B = (N = {}, N[l] = r, N[c] = i, N[o] = n, N)[A] || 1, H = this.$d.getTime() + R * B;
        return _.w(H, this);
      }, $.subtract = function(R, F) {
        return this.add(-1 * R, F);
      }, $.format = function(R) {
        var F = this, N = this.$locale();
        if (!this.isValid())
          return N.invalidDate || y;
        var T = R || "YYYY-MM-DDTHH:mm:ssZ", A = _.z(this), D = this.$H, B = this.$m, H = this.$M, Z = N.weekdays, K = N.months, Y = N.meridiem, re = function(U, ee, J, te) {
          return U && (U[ee] || U(F, T)) || J[ee].slice(0, te);
        }, se = function(U) {
          return _.s(D % 12 || 12, U, "0");
        }, ve = Y || function(U, ee, J) {
          var te = U < 12 ? "AM" : "PM";
          return J ? te.toLowerCase() : te;
        };
        return T.replace(h, function(U, ee) {
          return ee || function(J) {
            switch (J) {
              case "YY":
                return String(F.$y).slice(-2);
              case "YYYY":
                return _.s(F.$y, 4, "0");
              case "M":
                return H + 1;
              case "MM":
                return _.s(H + 1, 2, "0");
              case "MMM":
                return re(N.monthsShort, H, K, 3);
              case "MMMM":
                return re(K, H);
              case "D":
                return F.$D;
              case "DD":
                return _.s(F.$D, 2, "0");
              case "d":
                return String(F.$W);
              case "dd":
                return re(N.weekdaysMin, F.$W, Z, 2);
              case "ddd":
                return re(N.weekdaysShort, F.$W, Z, 3);
              case "dddd":
                return Z[F.$W];
              case "H":
                return String(D);
              case "HH":
                return _.s(D, 2, "0");
              case "h":
                return se(1);
              case "hh":
                return se(2);
              case "a":
                return ve(D, B, !0);
              case "A":
                return ve(D, B, !1);
              case "m":
                return String(B);
              case "mm":
                return _.s(B, 2, "0");
              case "s":
                return String(F.$s);
              case "ss":
                return _.s(F.$s, 2, "0");
              case "SSS":
                return _.s(F.$ms, 3, "0");
              case "Z":
                return A;
            }
            return null;
          }(U) || A.replace(":", "");
        });
      }, $.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, $.diff = function(R, F, N) {
        var T, A = this, D = _.p(F), B = P(R), H = (B.utcOffset() - this.utcOffset()) * r, Z = this - B, K = function() {
          return _.m(A, B);
        };
        switch (D) {
          case p:
            T = K() / 12;
            break;
          case d:
            T = K();
            break;
          case m:
            T = K() / 3;
            break;
          case f:
            T = (Z - H) / 6048e5;
            break;
          case u:
            T = (Z - H) / 864e5;
            break;
          case c:
            T = Z / i;
            break;
          case l:
            T = Z / r;
            break;
          case o:
            T = Z / n;
            break;
          default:
            T = Z;
        }
        return N ? T : _.a(T);
      }, $.daysInMonth = function() {
        return this.endOf(d).$D;
      }, $.$locale = function() {
        return C[this.$L];
      }, $.locale = function(R, F) {
        if (!R)
          return this.$L;
        var N = this.clone(), T = O(R, F, !0);
        return T && (N.$L = T), N;
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
      }, S;
    }(), M = L.prototype;
    return P.prototype = M, [["$ms", a], ["$s", o], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", p], ["$D", b]].forEach(function(S) {
      M[S[1]] = function($) {
        return this.$g($, S[0], S[1]);
      };
    }), P.extend = function(S, $) {
      return S.$i || (S($, L, P), S.$i = !0), P;
    }, P.locale = O, P.isDayjs = k, P.unix = function(S) {
      return P(1e3 * S);
    }, P.en = C[w], P.Ls = C, P.p = {}, P;
  });
})(hf);
var Ym = hf.exports;
const ae = /* @__PURE__ */ $t(Ym);
function Gm(t, e) {
  var n;
  Ni && (Rr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = qa(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = de(function() {
    return Pm(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, qs([], It(o), !1));
    }, i, e);
  }, []);
  return Ri(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function Xm(t, e, n) {
  var r = It(X({}), 2), i = r[0], a = r[1], o = Gm(function() {
    a({});
  }, n).run;
  Q(function() {
    return o();
  }, e), Us(t, [i]);
}
function Qm(t) {
  var e = It(X(t), 2), n = e[0], r = e[1], i = V(n);
  i.current = n;
  var a = Qe(function() {
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
  function t(v) {
    try {
      return v.defaultView && v.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var e = function(v) {
    for (var E = v, w = t(E); w; )
      E = w.ownerDocument, w = t(E);
    return E;
  }(window.document), n = [], r = null, i = null;
  function a(v) {
    this.time = v.time, this.target = v.target, this.rootBounds = b(v.rootBounds), this.boundingClientRect = b(v.boundingClientRect), this.intersectionRect = b(v.intersectionRect || p()), this.isIntersecting = !!v.intersectionRect;
    var E = this.boundingClientRect, w = E.width * E.height, C = this.intersectionRect, k = C.width * C.height;
    w ? this.intersectionRatio = Number((k / w).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(v, E) {
    var w = E || {};
    if (typeof v != "function")
      throw new Error("callback must be a function");
    if (w.root && w.root.nodeType != 1 && w.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = v, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(w.rootMargin), this.thresholds = this._initThresholds(w.threshold), this.root = w.root || null, this.rootMargin = this._rootMarginValues.map(function(C) {
      return C.value + C.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(v, E) {
      !v || !E ? i = p() : i = y(v, E), n.forEach(function(w) {
        w._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(v) {
    var E = this._observationTargets.some(function(w) {
      return w.element == v;
    });
    if (!E) {
      if (!(v && v.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: v, entry: null }), this._monitorIntersections(v.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(v) {
    this._observationTargets = this._observationTargets.filter(function(E) {
      return E.element != v;
    }), this._unmonitorIntersections(v.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var v = this._queuedEntries.slice();
    return this._queuedEntries = [], v;
  }, o.prototype._initThresholds = function(v) {
    var E = v || [0];
    return Array.isArray(E) || (E = [E]), E.sort().filter(function(w, C, k) {
      if (typeof w != "number" || isNaN(w) || w < 0 || w > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return w !== k[C - 1];
    });
  }, o.prototype._parseRootMargin = function(v) {
    var E = v || "0px", w = E.split(/\s+/).map(function(C) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(C);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return w[1] = w[1] || w[0], w[2] = w[2] || w[0], w[3] = w[3] || w[1], w;
  }, o.prototype._monitorIntersections = function(v) {
    var E = v.defaultView;
    if (E && this._monitoringDocuments.indexOf(v) == -1) {
      var w = this._checkForIntersections, C = null, k = null;
      this.POLL_INTERVAL ? C = E.setInterval(w, this.POLL_INTERVAL) : (u(E, "resize", w, !0), u(v, "scroll", w, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in E && (k = new E.MutationObserver(w), k.observe(v, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(v), this._monitoringUnsubscribes.push(function() {
        var _ = v.defaultView;
        _ && (C && _.clearInterval(C), f(_, "resize", w, !0)), f(v, "scroll", w, !0), k && k.disconnect();
      });
      var O = this.root && (this.root.ownerDocument || this.root) || e;
      if (v != O) {
        var P = t(v);
        P && this._monitorIntersections(P.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(v) {
    var E = this._monitoringDocuments.indexOf(v);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, C = this._observationTargets.some(function(P) {
        var _ = P.element.ownerDocument;
        if (_ == v)
          return !0;
        for (; _ && _ != w; ) {
          var L = t(_);
          if (_ = L && L.ownerDocument, _ == v)
            return !0;
        }
        return !1;
      });
      if (!C) {
        var k = this._monitoringUnsubscribes[E];
        if (this._monitoringDocuments.splice(E, 1), this._monitoringUnsubscribes.splice(E, 1), k(), v != w) {
          var O = t(v);
          O && this._unmonitorIntersections(O.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var v = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var E = 0; E < v.length; E++)
      v[E]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var v = this._rootIsInDom(), E = v ? this._getRootRect() : p();
      this._observationTargets.forEach(function(w) {
        var C = w.element, k = m(C), O = this._rootContainsTarget(C), P = w.entry, _ = v && O && this._computeTargetAndRootIntersection(C, k, E), L = null;
        this._rootContainsTarget(C) ? (!r || this.root) && (L = E) : L = p();
        var M = w.entry = new a({
          time: l(),
          target: C,
          boundingClientRect: k,
          rootBounds: L,
          intersectionRect: _
        });
        P ? v && O ? this._hasCrossedThreshold(P, M) && this._queuedEntries.push(M) : P && P.isIntersecting && this._queuedEntries.push(M) : this._queuedEntries.push(M);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(v, E, w) {
    if (window.getComputedStyle(v).display != "none") {
      for (var C = E, k = h(v), O = !1; !O && k; ) {
        var P = null, _ = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (_.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (O = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, P = null, C = null) : P = i : P = w;
          else {
            var L = h(k), M = L && m(L), S = L && this._computeTargetAndRootIntersection(L, M, w);
            M && S ? (k = L, P = y(M, S)) : (k = null, C = null);
          }
        else {
          var $ = k.ownerDocument;
          k != $.body && k != $.documentElement && _.overflow != "visible" && (P = m(k));
        }
        if (P && (C = d(P, C)), !C)
          break;
        k = k && h(k);
      }
      return C;
    }
  }, o.prototype._getRootRect = function() {
    var v;
    if (this.root && !x(this.root))
      v = m(this.root);
    else {
      var E = x(this.root) ? this.root : e, w = E.documentElement, C = E.body;
      v = {
        top: 0,
        left: 0,
        right: w.clientWidth || C.clientWidth,
        width: w.clientWidth || C.clientWidth,
        bottom: w.clientHeight || C.clientHeight,
        height: w.clientHeight || C.clientHeight
      };
    }
    return this._expandRectByRootMargin(v);
  }, o.prototype._expandRectByRootMargin = function(v) {
    var E = this._rootMarginValues.map(function(C, k) {
      return C.unit == "px" ? C.value : C.value * (k % 2 ? v.width : v.height) / 100;
    }), w = {
      top: v.top - E[0],
      right: v.right + E[1],
      bottom: v.bottom + E[2],
      left: v.left - E[3]
    };
    return w.width = w.right - w.left, w.height = w.bottom - w.top, w;
  }, o.prototype._hasCrossedThreshold = function(v, E) {
    var w = v && v.isIntersecting ? v.intersectionRatio || 0 : -1, C = E.isIntersecting ? E.intersectionRatio || 0 : -1;
    if (w !== C)
      for (var k = 0; k < this.thresholds.length; k++) {
        var O = this.thresholds[k];
        if (O == w || O == C || O < w != O < C)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || g(e, this.root);
  }, o.prototype._rootContainsTarget = function(v) {
    var E = this.root && (this.root.ownerDocument || this.root) || e;
    return g(E, v) && (!this.root || E == v.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var v = n.indexOf(this);
    v != -1 && n.splice(v, 1);
  };
  function l() {
    return window.performance && performance.now && performance.now();
  }
  function c(v, E) {
    var w = null;
    return function() {
      w || (w = setTimeout(function() {
        v(), w = null;
      }, E));
    };
  }
  function u(v, E, w, C) {
    typeof v.addEventListener == "function" ? v.addEventListener(E, w, C || !1) : typeof v.attachEvent == "function" && v.attachEvent("on" + E, w);
  }
  function f(v, E, w, C) {
    typeof v.removeEventListener == "function" ? v.removeEventListener(E, w, C || !1) : typeof v.detachEvent == "function" && v.detachEvent("on" + E, w);
  }
  function d(v, E) {
    var w = Math.max(v.top, E.top), C = Math.min(v.bottom, E.bottom), k = Math.max(v.left, E.left), O = Math.min(v.right, E.right), P = O - k, _ = C - w;
    return P >= 0 && _ >= 0 && {
      top: w,
      bottom: C,
      left: k,
      right: O,
      width: P,
      height: _
    } || null;
  }
  function m(v) {
    var E;
    try {
      E = v.getBoundingClientRect();
    } catch {
    }
    return E ? (E.width && E.height || (E = {
      top: E.top,
      right: E.right,
      bottom: E.bottom,
      left: E.left,
      width: E.right - E.left,
      height: E.bottom - E.top
    }), E) : p();
  }
  function p() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  function b(v) {
    return !v || "x" in v ? v : {
      top: v.top,
      y: v.top,
      bottom: v.bottom,
      left: v.left,
      x: v.left,
      right: v.right,
      width: v.width,
      height: v.height
    };
  }
  function y(v, E) {
    var w = E.top - v.top, C = E.left - v.left;
    return {
      top: w,
      left: C,
      height: E.height,
      width: E.width,
      bottom: w + E.height,
      right: C + E.width
    };
  }
  function g(v, E) {
    for (var w = E; w; ) {
      if (w == v)
        return !0;
      w = h(w);
    }
    return !1;
  }
  function h(v) {
    var E = v.parentNode;
    return v.nodeType == /* DOCUMENT */
    9 && v != e ? t(v) : (E && E.assignedSlot && (E = E.assignedSlot.parentNode), E && E.nodeType == 11 && E.host ? E.host : E);
  }
  function x(v) {
    return v && v.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function Jm(t, e) {
  var n = It(X(), 2), r = n[0], i = n[1], a = It(X(), 2), o = a[0], l = a[1];
  return Gs(function() {
    var c = fn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var p = S0(f), b = p.next(); !b.done; b = p.next()) {
            var y = b.value;
            l(y.intersectionRatio), i(y.isIntersecting);
          }
        } catch (g) {
          d = {
            error: g
          };
        } finally {
          try {
            b && !b.done && (m = p.return) && m.call(p);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, Ca(Ca({}, e), {
        root: fn(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, o];
}
var eh = Ys ? za : Q;
const Ae = eh;
function th(t) {
  var e = this, n = V(!1);
  return Qe(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Pe(e, void 0, void 0, function() {
      var a, o;
      return _0(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, qs([], It(r), !1))];
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
function nh(t) {
  var e = V(0), n = It(X(t), 2), r = n[0], i = n[1], a = Qe(function(o) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return Ri(function() {
    cancelAnimationFrame(e.current);
  }), [r, a];
}
var rh = function() {
  var t = V(!1);
  return Q(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const Xs = rh;
var vf = function() {
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
}(), Qo = typeof window < "u" && typeof document < "u" && window.document === document, xa = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), ih = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(xa) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), ah = 2;
function oh(t, e) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, t()), r && l();
  }
  function o() {
    ih(a);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < ah)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, e);
    i = c;
  }
  return l;
}
var sh = 20, lh = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], ch = typeof MutationObserver < "u", uh = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = oh(this.refresh.bind(this), sh);
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
      !Qo || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), ch ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !Qo || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = lh.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), pf = function(t, e) {
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
}, Er = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || xa;
}, gf = Ua(0, 0, 0, 0);
function ka(t) {
  return parseFloat(t) || 0;
}
function sc(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var a = t["border-" + i + "-width"];
    return r + ka(a);
  }, 0);
}
function fh(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var a = i[r], o = t["padding-" + a];
    n[a] = ka(o);
  }
  return n;
}
function dh(t) {
  var e = t.getBBox();
  return Ua(0, 0, e.width, e.height);
}
function mh(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return gf;
  var r = Er(t).getComputedStyle(t), i = fh(r), a = i.left + i.right, o = i.top + i.bottom, l = ka(r.width), c = ka(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + a) !== e && (l -= sc(r, "left", "right") + a), Math.round(c + o) !== n && (c -= sc(r, "top", "bottom") + o)), !vh(t)) {
    var u = Math.round(l + a) - e, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return Ua(i.left, i.top, l, c);
}
var hh = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof Er(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof Er(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function vh(t) {
  return t === Er(t).document.documentElement;
}
function ph(t) {
  return Qo ? hh(t) ? dh(t) : mh(t) : gf;
}
function gh(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return pf(o, {
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
function Ua(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var yh = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Ua(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = ph(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), bh = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = gh(n);
      pf(this, { target: e, contentRect: r });
    }
    return t;
  }()
), Eh = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new vf(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof Er(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new yh(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof Er(e).Element))
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
          return new bh(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), yf = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new vf(), bf = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = uh.getInstance(), r = new Eh(e, n, this);
      yf.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  bf.prototype[t] = function() {
    var e;
    return (e = yf.get(this))[t].apply(e, arguments);
  };
});
var wh = function() {
  return typeof xa.ResizeObserver < "u" ? xa.ResizeObserver : bf;
}(), Ch = df(za);
const xh = Ch;
var kh = Ys ? xh : Gs;
const $h = kh;
function Jo(t) {
  var e = It(nh(function() {
    var i = fn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return $h(function() {
    var i = fn(t);
    if (i) {
      var a = new wh(function(o) {
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
function Ka(t, e) {
  var n;
  Ni && (Rr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = qa(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = de(function() {
    return Vm(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, qs([], It(o), !1));
    }, i, e);
  }, []);
  return Ri(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var _h = function(t, e) {
  var n = Yt(t), r = V(null), i = Qe(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return Q(function() {
    if (!(!R0(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const Sh = _h, lc = 10;
function Oh(t, e) {
  return t > e && t > lc ? "horizontal" : e > t && e > lc ? "vertical" : "";
}
function Fh() {
  const t = V(0), e = V(0), n = V(0), r = V(0), i = V(0), a = V(0), o = V(""), l = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const p = m.touches[0];
      n.current = p.clientX < 0 ? 0 : p.clientX - t.current, r.current = p.clientY - e.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = Oh(i.current, a.current));
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
const Nh = Nr ? window : void 0, Rh = ["scroll", "auto", "overlay"];
function Ph(t) {
  return t.nodeType === 1;
}
function $a(t, e = Nh) {
  let n = t;
  for (; n && n !== e && Ph(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Rh.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Dn = !1;
if (Nr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Dn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let Wr = 0;
const cc = "adm-overflow-hidden";
function Mh(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Ya(t, e) {
  const n = Fh(), r = (o) => {
    n.move(o);
    const l = n.deltaY.current > 0 ? "10" : "01", c = $a(o.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const b = Mh(o.target);
      if (b === document.body || b === document.documentElement) {
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
    let p = "11";
    d === 0 ? p = f >= u ? "00" : "01" : u <= Math.round(m + d) && (p = "10"), p !== "11" && n.isVertical() && !(parseInt(p, 2) & parseInt(l, 2)) && o.cancelable && Dn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Dn ? {
      passive: !1
    } : !1), Wr || document.body.classList.add(cc), Wr++;
  }, a = () => {
    Wr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Wr--, Wr || document.body.classList.remove(cc));
  };
  Q(() => {
    if (e)
      return i(), () => {
        a();
      };
  }, [e]);
}
let Qs = Mi();
const ne = (t) => Pi(t, Qs);
let Js = Mi();
ne.write = (t) => Pi(t, Js);
let Ga = Mi();
ne.onStart = (t) => Pi(t, Ga);
let el = Mi();
ne.onFrame = (t) => Pi(t, el);
let tl = Mi();
ne.onFinish = (t) => Pi(t, tl);
let vr = [];
ne.setTimeout = (t, e) => {
  let n = ne.now() + e, r = () => {
    let a = vr.findIndex((o) => o.cancel == r);
    ~a && vr.splice(a, 1), sn -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return vr.splice(Ef(n), 0, i), sn += 1, wf(), i;
};
let Ef = (t) => ~(~vr.findIndex((e) => e.time > t) || ~vr.length);
ne.cancel = (t) => {
  Ga.delete(t), el.delete(t), tl.delete(t), Qs.delete(t), Js.delete(t);
};
ne.sync = (t) => {
  es = !0, ne.batchedUpdates(t), es = !1;
};
ne.throttle = (t) => {
  let e;
  function n() {
    try {
      t(...e);
    } finally {
      e = null;
    }
  }
  function r(...i) {
    e = i, ne.onStart(n);
  }
  return r.handler = t, r.cancel = () => {
    Ga.delete(n), e = null;
  }, r;
};
let nl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
ne.use = (t) => nl = t;
ne.now = typeof performance < "u" ? () => performance.now() : Date.now;
ne.batchedUpdates = (t) => t();
ne.catch = console.error;
ne.frameLoop = "always";
ne.advance = () => {
  ne.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : xf();
};
let on = -1, sn = 0, es = !1;
function Pi(t, e) {
  es ? (e.delete(t), t(0)) : (e.add(t), wf());
}
function wf() {
  on < 0 && (on = 0, ne.frameLoop !== "demand" && nl(Cf));
}
function Ah() {
  on = -1;
}
function Cf() {
  ~on && (nl(Cf), ne.batchedUpdates(xf));
}
function xf() {
  let t = on;
  on = ne.now();
  let e = Ef(on);
  if (e && (kf(vr.splice(0, e), (n) => n.handler()), sn -= e), !sn) {
    Ah();
    return;
  }
  Ga.flush(), Qs.flush(t ? Math.min(64, on - t) : 16.667), el.flush(), Js.flush(), tl.flush();
}
function Mi() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      sn += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return sn -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), sn -= e.size, kf(e, (r) => r(n) && t.add(r)), sn += t.size, e = t);
    }
  };
}
function kf(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      ne.catch(r);
    }
  });
}
function ts() {
}
const Ih = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), z = {
  arr: Array.isArray,
  obj: (t) => !!t && t.constructor.name === "Object",
  fun: (t) => typeof t == "function",
  str: (t) => typeof t == "string",
  num: (t) => typeof t == "number",
  und: (t) => t === void 0
};
function Ht(t, e) {
  if (z.arr(t)) {
    if (!z.arr(e) || t.length !== e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  return t === e;
}
const le = (t, e) => t.forEach(e);
function Tt(t, e, n) {
  if (z.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const nt = (t) => z.und(t) ? [] : z.arr(t) ? t : [t];
function si(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), le(n, e);
  }
}
const ri = (t, ...e) => si(t, (n) => n(...e)), rl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let il, $f, cn = null, _f = !1, al = ts;
const Th = (t) => {
  t.to && ($f = t.to), t.now && (ne.now = t.now), t.colors !== void 0 && (cn = t.colors), t.skipAnimation != null && (_f = t.skipAnimation), t.createStringInterpolator && (il = t.createStringInterpolator), t.requestAnimationFrame && ne.use(t.requestAnimationFrame), t.batchedUpdates && (ne.batchedUpdates = t.batchedUpdates), t.willAdvance && (al = t.willAdvance), t.frameLoop && (ne.frameLoop = t.frameLoop);
};
var vt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return il;
  },
  get to() {
    return $f;
  },
  get colors() {
    return cn;
  },
  get skipAnimation() {
    return _f;
  },
  get willAdvance() {
    return al;
  },
  assign: Th
});
const li = /* @__PURE__ */ new Set();
let dt = [], So = [], _a = 0;
const Xa = {
  get idle() {
    return !li.size && !dt.length;
  },
  start(t) {
    _a > t.priority ? (li.add(t), ne.onStart(Lh)) : (Sf(t), ne(ns));
  },
  advance: ns,
  sort(t) {
    if (_a)
      ne.onFrame(() => Xa.sort(t));
    else {
      const e = dt.indexOf(t);
      ~e && (dt.splice(e, 1), Of(t));
    }
  },
  clear() {
    dt = [], li.clear();
  }
};
function Lh() {
  li.forEach(Sf), li.clear(), ne(ns);
}
function Sf(t) {
  dt.includes(t) || Of(t);
}
function Of(t) {
  dt.splice(Dh(dt, (e) => e.priority > t.priority), 0, t);
}
function ns(t) {
  const e = So;
  for (let n = 0; n < dt.length; n++) {
    const r = dt[n];
    _a = r.priority, r.idle || (al(r), r.advance(t), r.idle || e.push(r));
  }
  return _a = 0, So = dt, So.length = 0, dt = e, dt.length > 0;
}
function Dh(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Vh = (t, e, n) => Math.min(Math.max(n, t), e), jh = {
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
}, xt = "[-+]?\\d*\\.?\\d+", Sa = xt + "%";
function Qa(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const Bh = new RegExp("rgb" + Qa(xt, xt, xt)), Wh = new RegExp("rgba" + Qa(xt, xt, xt, xt)), Zh = new RegExp("hsl" + Qa(xt, Sa, Sa)), Hh = new RegExp("hsla" + Qa(xt, Sa, Sa, xt)), zh = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, qh = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Uh = /^#([0-9a-fA-F]{6})$/, Kh = /^#([0-9a-fA-F]{8})$/;
function Yh(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = Uh.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : cn && cn[t] !== void 0 ? cn[t] : (e = Bh.exec(t)) ? (Yn(e[1]) << 24 | Yn(e[2]) << 16 | Yn(e[3]) << 8 | 255) >>> 0 : (e = Wh.exec(t)) ? (Yn(e[1]) << 24 | Yn(e[2]) << 16 | Yn(e[3]) << 8 | dc(e[4])) >>> 0 : (e = zh.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = Kh.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = qh.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Zh.exec(t)) ? (uc(fc(e[1]), zi(e[2]), zi(e[3])) | 255) >>> 0 : (e = Hh.exec(t)) ? (uc(fc(e[1]), zi(e[2]), zi(e[3])) | dc(e[4])) >>> 0 : null;
}
function Oo(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function uc(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, a = Oo(i, r, t + 1 / 3), o = Oo(i, r, t), l = Oo(i, r, t - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(l * 255) << 8;
}
function Yn(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function fc(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function dc(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function zi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function mc(t) {
  let e = Yh(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, a = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const hi = (t, e, n) => {
  if (z.fun(t))
    return t;
  if (z.arr(t))
    return hi({
      range: t,
      output: e,
      extrapolate: n
    });
  if (z.str(t.output[0]))
    return il(t);
  const r = t, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Xh(u, a);
    return Gh(u, a[f], a[f + 1], i[f], i[f + 1], c, o, l, r.map);
  };
};
function Gh(t, e, n, r, i, a, o, l, c) {
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
function Xh(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Qh = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Vh(0, 1, i / t);
}, Oa = 1.70158, qi = Oa * 1.525, hc = Oa + 1, vc = 2 * Math.PI / 3, pc = 2 * Math.PI / 4.5, Ui = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Jh = {
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
  easeInBack: (t) => hc * t * t * t - Oa * t * t,
  easeOutBack: (t) => 1 + hc * Math.pow(t - 1, 3) + Oa * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((qi + 1) * 2 * t - qi) / 2 : (Math.pow(2 * t - 2, 2) * ((qi + 1) * (t * 2 - 2) + qi) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * vc),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * vc) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * pc)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * pc) / 2 + 1,
  easeInBounce: (t) => 1 - Ui(1 - t),
  easeOutBounce: Ui,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Ui(1 - 2 * t)) / 2 : (1 + Ui(2 * t - 1)) / 2,
  steps: Qh
};
function rs() {
  return rs = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, rs.apply(this, arguments);
}
const wr = Symbol.for("FluidValue.get"), Vn = Symbol.for("FluidValue.observers"), ut = (t) => !!(t && t[wr]), Ge = (t) => t && t[wr] ? t[wr]() : t, gc = (t) => t[Vn] || null;
function e2(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function vi(t, e) {
  let n = t[Vn];
  n && n.forEach((r) => {
    e2(r, e);
  });
}
class Ff {
  constructor(e) {
    if (this[wr] = void 0, this[Vn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    t2(this, e);
  }
}
const t2 = (t, e) => Nf(t, wr, e);
function Pr(t, e) {
  if (t[wr]) {
    let n = t[Vn];
    n || Nf(t, Vn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function pi(t, e) {
  let n = t[Vn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Vn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const Nf = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), va = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, n2 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, yc = new RegExp(`(${va.source})(%|[a-z]+)`, "i"), r2 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ja = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Rf = (t) => {
  const [e, n] = i2(t);
  if (!e || rl())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Ja.test(n))
      return Rf(n);
    if (n)
      return n;
  }
  return t;
}, i2 = (t) => {
  const e = Ja.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let Fo;
const a2 = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Pf = (t) => {
  Fo || (Fo = cn ? new RegExp(`(${Object.keys(cn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((a) => Ge(a).replace(Ja, Rf).replace(n2, mc).replace(Fo, mc)), n = e.map((a) => a.match(va).map(Number)), i = n[0].map((a, o) => n.map((l) => {
    if (!(o in l))
      throw Error('The arity of each "output" value must be equal');
    return l[o];
  })).map((a) => hi(rs({}, t, {
    output: a
  })));
  return (a) => {
    var o;
    const l = !yc.test(e[0]) && ((o = e.find((u) => yc.test(u))) == null ? void 0 : o.replace(va, ""));
    let c = 0;
    return e[0].replace(va, () => `${i[c++](a)}${l || ""}`).replace(r2, a2);
  };
}, ol = "react-spring: ", Mf = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${ol}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, o2 = Mf(console.warn);
function s2() {
  o2(`${ol}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const l2 = Mf(console.warn);
function c2() {
  l2(`${ol}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function eo(t) {
  return z.str(t) && (t[0] == "#" || /\d/.test(t) || !rl() && Ja.test(t) || t in (cn || {}));
}
const sl = rl() ? Q : za, u2 = () => {
  const t = V(!1);
  return sl(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function Af() {
  const t = X()[1], e = u2();
  return () => {
    e.current && t(Math.random());
  };
}
function f2(t, e) {
  const [n] = X(() => ({
    inputs: e,
    result: t()
  })), r = V(), i = r.current;
  let a = i;
  return a ? e && a.inputs && d2(e, a.inputs) || (a = {
    inputs: e,
    result: t()
  }) : a = n, Q(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function d2(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const If = (t) => Q(t, m2), m2 = [];
function bc(t) {
  const e = V();
  return Q(() => {
    e.current = t;
  }), e.current;
}
const gi = Symbol.for("Animated:node"), h2 = (t) => !!t && t[gi] === t, Mt = (t) => t && t[gi], ll = (t, e) => Ih(t, gi, e), to = (t) => t && t[gi] && t[gi].getPayload();
class Tf {
  constructor() {
    this.payload = void 0, ll(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class Mr extends Tf {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, z.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new Mr(e);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(e, n) {
    return z.num(e) && (this.lastPosition = e, n && (e = Math.round(e / n) * n, this.done && (this.lastPosition = e))), this._value === e ? !1 : (this._value = e, !0);
  }
  reset() {
    const {
      done: e
    } = this;
    this.done = !1, z.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, e && (this.lastVelocity = null), this.v0 = null);
  }
}
class Cr extends Mr {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = hi({
      output: [e, e]
    });
  }
  static create(e) {
    return new Cr(e);
  }
  getValue() {
    let e = this._string;
    return e ?? (this._string = this._toString(this._value));
  }
  setValue(e) {
    if (z.str(e)) {
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
    e && (this._toString = hi({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const Fa = {
  dependencies: null
};
class no extends Tf {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return Tt(this.source, (r, i) => {
      h2(r) ? n[i] = r.getValue(e) : ut(r) ? n[i] = Ge(r) : e || (n[i] = r);
    }), n;
  }
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && le(this.payload, (e) => e.reset());
  }
  _makePayload(e) {
    if (e) {
      const n = /* @__PURE__ */ new Set();
      return Tt(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    Fa.dependencies && ut(e) && Fa.dependencies.add(e);
    const n = to(e);
    n && le(n, (r) => this.add(r));
  }
}
class cl extends no {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new cl(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(v2)), !0);
  }
}
function v2(t) {
  return (eo(t) ? Cr : Mr).create(t);
}
function is(t) {
  const e = Mt(t);
  return e ? e.constructor : z.arr(t) ? cl : eo(t) ? Cr : Mr;
}
function Na() {
  return Na = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Na.apply(this, arguments);
}
const Ec = (t, e) => {
  const n = !z.fun(t) || t.prototype && t.prototype.isReactComponent;
  return Ee((r, i) => {
    const a = V(null), o = n && Qe((b) => {
      a.current = y2(i, b);
    }, [i]), [l, c] = g2(r, e), u = Af(), f = () => {
      const b = a.current;
      if (n && !b)
        return;
      (b ? e.applyAnimatedValues(b, l.getValue(!0)) : !1) === !1 && u();
    }, d = new p2(f, c), m = V();
    sl(() => (m.current = d, le(c, (b) => Pr(b, d)), () => {
      m.current && (le(m.current.deps, (b) => pi(b, m.current)), ne.cancel(m.current.update));
    })), Q(f, []), If(() => () => {
      const b = m.current;
      le(b.deps, (y) => pi(y, b));
    });
    const p = e.getComponentProps(l.getValue());
    return I.createElement(t, Na({}, p, {
      ref: o
    }));
  });
};
class p2 {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && ne.write(this.update);
  }
}
function g2(t, e) {
  const n = /* @__PURE__ */ new Set();
  return Fa.dependencies = n, t.style && (t = Na({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new no(t), Fa.dependencies = null, [t, n];
}
function y2(t, e) {
  return t && (z.fun(t) ? t(e) : t.current = e), e;
}
const wc = Symbol.for("AnimatedComponent"), b2 = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new no(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const l = Cc(o) || "Anonymous";
    return z.str(o) ? o = a[o] || (a[o] = Ec(o, i)) : o = o[wc] || (o[wc] = Ec(o, i)), o.displayName = `Animated(${l})`, o;
  };
  return Tt(t, (o, l) => {
    z.arr(t) && (l = Cc(o)), a[l] = a(o);
  }), {
    animated: a
  };
}, Cc = (t) => z.str(t) ? t : t && z.str(t.displayName) ? t.displayName : z.fun(t) && t.name || null;
function Te() {
  return Te = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Te.apply(this, arguments);
}
function Rn(t, ...e) {
  return z.fun(t) ? t(...e) : t;
}
const ci = (t, e) => t === !0 || !!(e && t && (z.fun(t) ? t(e) : nt(t).includes(e))), Lf = (t, e) => z.obj(t) ? e && t[e] : t, Df = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, E2 = (t) => t, ul = (t, e = E2) => {
  let n = w2;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const a = e(t[i], i);
    z.und(a) || (r[i] = a);
  }
  return r;
}, w2 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], C2 = {
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
function x2(t) {
  const e = {};
  let n = 0;
  if (Tt(t, (r, i) => {
    C2[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Vf(t) {
  const e = x2(t);
  if (e) {
    const n = {
      to: e
    };
    return Tt(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Te({}, t);
}
function yi(t) {
  return t = Ge(t), z.arr(t) ? t.map(yi) : eo(t) ? vt.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function k2(t) {
  for (const e in t)
    return !0;
  return !1;
}
function as(t) {
  return z.fun(t) || z.arr(t) && z.obj(t[0]);
}
function $2(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function _2(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const S2 = {
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
}, os = Te({}, S2.default, {
  mass: 1,
  damping: 1,
  easing: Jh.linear,
  clamp: !1
});
class O2 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, os);
  }
}
function F2(t, e, n) {
  n && (n = Te({}, n), xc(n, e), e = Te({}, n, e)), xc(t, e), Object.assign(t, e);
  for (const o in os)
    t[o] == null && (t[o] = os[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = t;
  return z.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * a * r / i), t;
}
function xc(t, e) {
  if (!z.und(e.decay))
    t.duration = void 0;
  else {
    const n = !z.und(e.tension) || !z.und(e.friction);
    (n || !z.und(e.frequency) || !z.und(e.damping) || !z.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const kc = [];
class N2 {
  constructor() {
    this.changed = !1, this.values = kc, this.toValues = null, this.fromValues = kc, this.to = void 0, this.from = void 0, this.config = new O2(), this.immediate = !1;
  }
}
function jf(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, l) => {
    var c;
    let u, f, d = ci((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      b();
    else {
      z.und(n.pause) || (i.paused = ci(n.pause, e));
      let y = r == null ? void 0 : r.pause;
      y !== !0 && (y = i.paused || ci(y, e)), u = Rn(n.delay || 0, e), y ? (i.resumeQueue.add(p), a.pause()) : (a.resume(), p());
    }
    function m() {
      i.resumeQueue.add(p), i.timeouts.delete(f), f.cancel(), u = f.time - ne.now();
    }
    function p() {
      u > 0 && !vt.skipAnimation ? (i.delayed = !0, f = ne.setTimeout(b, u), i.pauseQueue.add(m), i.timeouts.add(f)) : b();
    }
    function b() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Te({}, n, {
          callId: t,
          cancel: d
        }), o);
      } catch (y) {
        l(y);
      }
    }
  });
}
const fl = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? pr(t.get()) : e.every((n) => n.noop) ? Bf(t.get()) : Ct(t.get(), e.every((n) => n.finished)), Bf = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), Ct = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), pr = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function Wf(t, e, n, r) {
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
    const u = ul(e, (g, h) => h === "onRest" ? void 0 : g);
    let f, d;
    const m = new Promise((g, h) => (f = g, d = h)), p = (g) => {
      const h = i <= (n.cancelId || 0) && pr(r) || i !== n.asyncId && Ct(r, !1);
      if (h)
        throw g.result = h, d(g), g;
    }, b = (g, h) => {
      const x = new $c(), v = new _c();
      return (async () => {
        if (vt.skipAnimation)
          throw bi(n), v.result = Ct(r, !1), d(v), v;
        p(x);
        const E = z.obj(g) ? Te({}, g) : Te({}, h, {
          to: g
        });
        E.parentId = i, Tt(u, (C, k) => {
          z.und(E[k]) && (E[k] = C);
        });
        const w = await r.start(E);
        return p(x), n.paused && await new Promise((C) => {
          n.resumeQueue.add(C);
        }), w;
      })();
    };
    let y;
    if (vt.skipAnimation)
      return bi(n), Ct(r, !1);
    try {
      let g;
      z.arr(t) ? g = (async (h) => {
        for (const x of h)
          await b(x);
      })(t) : g = Promise.resolve(t(b, r.stop.bind(r))), await Promise.all([g.then(f), m]), y = Ct(r.get(), !0, !1);
    } catch (g) {
      if (g instanceof $c)
        y = g.result;
      else if (g instanceof _c)
        y = g.result;
      else
        throw g;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? l : void 0, n.promise = a ? c : void 0);
    }
    return z.fun(o) && ne.batchedUpdates(() => {
      o(y, r, r.item);
    }), y;
  })();
}
function bi(t, e) {
  si(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class $c extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class _c extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const ss = (t) => t instanceof dl;
let R2 = 1;
class dl extends Ff {
  constructor(...e) {
    super(...e), this.id = R2++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = Mt(this);
    return e && e.getValue();
  }
  to(...e) {
    return vt.to(this, e);
  }
  interpolate(...e) {
    return s2(), vt.to(this, e);
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
    vi(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || Xa.sort(this), vi(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const jn = Symbol.for("SpringPhase"), Zf = 1, ls = 2, cs = 4, No = (t) => (t[jn] & Zf) > 0, Xt = (t) => (t[jn] & ls) > 0, Zr = (t) => (t[jn] & cs) > 0, Sc = (t, e) => e ? t[jn] |= ls | Zf : t[jn] &= ~ls, Oc = (t, e) => e ? t[jn] |= cs : t[jn] &= ~cs;
class P2 extends dl {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new N2(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !z.und(e) || !z.und(n)) {
      const r = z.obj(e) ? Te({}, e) : Te({}, n, {
        from: e
      });
      z.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Xt(this) || this._state.asyncTo) || Zr(this);
  }
  get goal() {
    return Ge(this.animation.to);
  }
  get velocity() {
    const e = Mt(this);
    return e instanceof Mr ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return No(this);
  }
  get isAnimating() {
    return Xt(this);
  }
  get isPaused() {
    return Zr(this);
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
    const l = to(i.to);
    !l && ut(i.to) && (o = nt(Ge(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == Cr ? 1 : l ? l[d].lastPosition : o[d];
      let p = i.immediate, b = m;
      if (!p) {
        if (b = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let y = f.elapsedTime += e;
        const g = i.fromValues[d], h = f.v0 != null ? f.v0 : f.v0 = z.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let x;
        const v = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (z.und(a.duration))
          if (a.decay) {
            const E = a.decay === !0 ? 0.998 : a.decay, w = Math.exp(-(1 - E) * y);
            b = g + h / (1 - E) * (1 - w), p = Math.abs(f.lastPosition - b) <= v, x = h * w;
          } else {
            x = f.lastVelocity == null ? h : f.lastVelocity;
            const E = a.restVelocity || v / 10, w = a.clamp ? 0 : a.bounce, C = !z.und(w), k = g == m ? f.v0 > 0 : g < m;
            let O, P = !1;
            const _ = 1, L = Math.ceil(e / _);
            for (let M = 0; M < L && (O = Math.abs(x) > E, !(!O && (p = Math.abs(m - b) <= v, p))); ++M) {
              C && (P = b == m || b > m == k, P && (x = -x * w, b = m));
              const S = -a.tension * 1e-6 * (b - m), $ = -a.friction * 1e-3 * x, R = (S + $) / a.mass;
              x = x + R * _, b = b + x * _;
            }
          }
        else {
          let E = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, y = f.elapsedTime += e)), E = (a.progress || 0) + y / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), b = g + a.easing(E) * (m - g), x = (b - f.lastPosition) / e, p = E == 1;
        }
        f.lastVelocity = x, Number.isNaN(b) && (console.warn("Got NaN while animating:", this), p = !0);
      }
      l && !l[d].done && (p = !1), p ? f.done = !0 : n = !1, f.setValue(b, a.round) && (r = !0);
    });
    const c = Mt(this), u = c.getValue();
    if (n) {
      const f = Ge(i.to);
      (u !== f || r) && !a.decay ? (c.setValue(f), this._onChange(f)) : r && a.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(e) {
    return ne.batchedUpdates(() => {
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
    if (Xt(this)) {
      const {
        to: e,
        config: n
      } = this.animation;
      ne.batchedUpdates(() => {
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
    return z.und(e) ? (r = this.queue || [], this.queue = []) : r = [z.obj(e) ? e : Te({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => fl(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), bi(this._state, e && this._lastCallId), ne.batchedUpdates(() => this._stop(n, e)), this;
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
    r = z.obj(r) ? r[n] : r, (r == null || as(r)) && (r = void 0), i = z.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return No(this) || (e.reverse && ([r, i] = [i, r]), i = Ge(i), z.und(i) ? Mt(this) || this._set(r) : this._set(i)), a;
  }
  _update(e, n) {
    let r = Te({}, e);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, ul(r, (c, u) => /^on/.test(u) ? Lf(c, i) : c)), Nc(this, r, "onProps"), zr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return jf(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: l,
      actions: {
        pause: () => {
          Zr(this) || (Oc(this, !0), ri(l.pauseQueue), zr(this, "onPause", Ct(this, Hr(this, this.animation.to)), this));
        },
        resume: () => {
          Zr(this) && (Oc(this, !1), Xt(this) && this._resume(), ri(l.resumeQueue), zr(this, "onResume", Ct(this, Hr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Hf(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(pr(this));
    const i = !z.und(e.to), a = !z.und(e.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(pr(this));
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
    a && !i && (!n.default || z.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const p = !Ht(m, f);
    p && (c.from = m), m = Ge(m);
    const b = !Ht(d, u);
    b && this._focus(d);
    const y = as(n.to), {
      config: g
    } = c, {
      decay: h,
      velocity: x
    } = g;
    (i || a) && (g.velocity = 0), n.config && !y && F2(g, Rn(n.config, o), n.config !== l.config ? Rn(l.config, o) : void 0);
    let v = Mt(this);
    if (!v || z.und(d))
      return r(Ct(this, !0));
    const E = z.und(n.reset) ? a && !n.default : !z.und(m) && ci(n.reset, o), w = E ? m : this.get(), C = yi(d), k = z.num(C) || z.arr(C) || eo(C), O = !y && (!k || ci(l.immediate || n.immediate, o));
    if (b) {
      const M = is(d);
      if (M !== v.constructor)
        if (O)
          v = this._set(C);
        else
          throw Error(`Cannot animate between ${v.constructor.name} and ${M.name}, as the "to" prop suggests`);
    }
    const P = v.constructor;
    let _ = ut(d), L = !1;
    if (!_) {
      const M = E || !No(this) && p;
      (b || M) && (L = Ht(yi(w), C), _ = !L), (!Ht(c.immediate, O) && !O || !Ht(g.decay, h) || !Ht(g.velocity, x)) && (_ = !0);
    }
    if (L && Xt(this) && (c.changed && !E ? _ = !0 : _ || this._stop(u)), !y && ((_ || ut(u)) && (c.values = v.getPayload(), c.toValues = ut(d) ? null : P == Cr ? [1] : nt(C)), c.immediate != O && (c.immediate = O, !O && !E && this._set(u)), _)) {
      const {
        onRest: M
      } = c;
      le(A2, ($) => Nc(this, n, $));
      const S = Ct(this, Hr(this, u));
      ri(this._pendingCalls, S), this._pendingCalls.add(r), c.changed && ne.batchedUpdates(() => {
        c.changed = !E, M == null || M(S, this), E ? Rn(l.onRest, S) : c.onStart == null || c.onStart(S, this);
      });
    }
    E && this._set(w), y ? r(Wf(n.to, n, this._state, this)) : _ ? this._start() : Xt(this) && !b ? this._pendingCalls.add(r) : r(Bf(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (gc(this) && this._detach(), n.to = e, gc(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    ut(n) && (Pr(n, this), ss(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    ut(e) && pi(e, this);
  }
  _set(e, n = !0) {
    const r = Ge(e);
    if (!z.und(r)) {
      const i = Mt(this);
      if (!i || !Ht(r, i.getValue())) {
        const a = is(r);
        !i || i.constructor != a ? ll(this, a.create(r)) : i.setValue(r), i && ne.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return Mt(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, zr(this, "onStart", Ct(this, Hr(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), Rn(this.animation.onChange, e, this)), Rn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    Mt(this).reset(Ge(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Xt(this) || (Sc(this, !0), Zr(this) || this._resume());
  }
  _resume() {
    vt.skipAnimation ? this.finish() : Xa.start(this);
  }
  _stop(e, n) {
    if (Xt(this)) {
      Sc(this, !1);
      const r = this.animation;
      le(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), vi(this, {
        type: "idle",
        parent: this
      });
      const i = n ? pr(this.get()) : Ct(this.get(), Hr(this, e ?? r.to));
      ri(this._pendingCalls, i), r.changed && (r.changed = !1, zr(this, "onRest", i, this));
    }
  }
}
function Hr(t, e) {
  const n = yi(e), r = yi(t.get());
  return Ht(r, n);
}
function Hf(t, e = t.loop, n = t.to) {
  let r = Rn(e);
  if (r) {
    const i = r !== !0 && Vf(r), a = (i || t).reverse, o = !i || i.reset;
    return Ei(Te({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !a || as(n) ? n : void 0,
      from: o ? t.from : void 0,
      reset: o
    }, i));
  }
}
function Ei(t) {
  const {
    to: e,
    from: n
  } = t = Vf(t), r = /* @__PURE__ */ new Set();
  return z.obj(e) && Fc(e, r), z.obj(n) && Fc(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function M2(t) {
  const e = Ei(t);
  return z.und(e.default) && (e.default = ul(e)), e;
}
function Fc(t, e) {
  Tt(t, (n, r) => n != null && e.add(r));
}
const A2 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Nc(t, e, n) {
  t.animation[n] = e[n] !== Df(e, n) ? Lf(e[n], t.key) : void 0;
}
function zr(t, e, ...n) {
  var r, i, a, o;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (a = (o = t.defaultProps)[e]) == null || a.call(o, ...n);
}
const I2 = ["onStart", "onChange", "onRest"];
let T2 = 1, L2 = class {
  constructor(e, n) {
    this.id = T2++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), e && this.start(Te({
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
      z.und(r) || this.springs[n].set(r);
    }
  }
  update(e) {
    return e && this.queue.push(Ei(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = nt(e).map(Ei) : this.queue = [], this._flush ? this._flush(this, n) : (Yf(this, n), us(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      le(nt(n), (i) => r[i].stop(!!e));
    } else
      bi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (z.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      le(nt(e), (r) => n[r].pause());
    }
    return this;
  }
  resume(e) {
    if (z.und(e))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      le(nt(e), (r) => n[r].resume());
    }
    return this;
  }
  each(e) {
    Tt(this.springs, e);
  }
  _onFrame() {
    const {
      onStart: e,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, a = this._changed.size > 0;
    (i && !this._started || a && !this._started) && (this._started = !0, si(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, l = a || o && r.size ? this.get() : null;
    a && n.size && si(n, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }), o && (this._started = !1, si(r, ([c, u]) => {
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
    ne.onFrame(this._onFrame);
  }
};
function us(t, e) {
  return Promise.all(e.map((n) => zf(t, n))).then((n) => fl(t, n));
}
async function zf(t, e, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: l,
    onResolve: c
  } = e, u = z.obj(e.default) && e.default;
  o && (e.loop = !1), i === !1 && (e.to = null), a === !1 && (e.from = null);
  const f = z.arr(i) || z.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : le(I2, (y) => {
    const g = e[y];
    if (z.fun(g)) {
      const h = t._events[y];
      e[y] = ({
        finished: x,
        cancelled: v
      }) => {
        const E = h.get(g);
        E ? (x || (E.finished = !1), v && (E.cancelled = !0)) : h.set(g, {
          value: null,
          finished: x || !1,
          cancelled: v || !1
        });
      }, u && (u[y] = e[y]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, ri(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((y) => t.springs[y].start(e)), p = e.cancel === !0 || Df(e, "cancel") === !0;
  (f || p && d.asyncId) && m.push(jf(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: ts,
      resume: ts,
      start(y, g) {
        p ? (bi(d, t._lastAsyncId), g(pr(t))) : (y.onRest = l, g(Wf(f, y, d, t)));
      }
    }
  })), d.paused && await new Promise((y) => {
    d.resumeQueue.add(y);
  });
  const b = fl(t, await Promise.all(m));
  if (o && b.finished && !(n && b.noop)) {
    const y = Hf(e, o, i);
    if (y)
      return Yf(t, [y]), zf(t, y, !0);
  }
  return c && ne.batchedUpdates(() => c(b, t, t.item)), b;
}
function Rc(t, e) {
  const n = Te({}, t.springs);
  return e && le(nt(e), (r) => {
    z.und(r.keys) && (r = Ei(r)), z.obj(r.to) || (r = Te({}, r, {
      to: void 0
    })), Kf(n, r, (i) => Uf(i));
  }), qf(t, n), n;
}
function qf(t, e) {
  Tt(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, Pr(n, t));
  });
}
function Uf(t, e) {
  const n = new P2();
  return n.key = t, e && Pr(n, e), n;
}
function Kf(t, e, n) {
  e.keys && le(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function Yf(t, e) {
  le(e, (n) => {
    Kf(t.springs, n, (r) => Uf(r, t));
  });
}
function D2(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const V2 = ["children"], ro = (t) => {
  let {
    children: e
  } = t, n = D2(t, V2);
  const r = it(Ra), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = f2(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = Ra;
  return I.createElement(o, {
    value: n
  }, e);
}, Ra = j2(ro, {});
ro.Provider = Ra.Provider;
ro.Consumer = Ra.Consumer;
function j2(t, e) {
  return Object.assign(t, I.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const B2 = () => {
  const t = [], e = function(i) {
    c2();
    const a = [];
    return le(t, (o, l) => {
      if (z.und(i))
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
    return le(t, (r) => r.pause(...arguments)), this;
  }, e.resume = function() {
    return le(t, (r) => r.resume(...arguments)), this;
  }, e.set = function(r) {
    le(t, (i) => i.set(r));
  }, e.start = function(r) {
    const i = [];
    return le(t, (a, o) => {
      if (z.und(r))
        i.push(a.start());
      else {
        const l = this._getProps(r, a, o);
        l && i.push(a.start(l));
      }
    }), i;
  }, e.stop = function() {
    return le(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return le(t, (i, a) => i.update(this._getProps(r, i, a))), this;
  };
  const n = function(i, a, o) {
    return z.fun(i) ? i(o, a) : i;
  };
  return e._getProps = n, e;
};
function W2(t, e, n) {
  const r = z.fun(e) && e;
  r && !n && (n = []);
  const i = de(() => r || arguments.length == 3 ? B2() : void 0, []), a = V(0), o = Af(), l = de(() => ({
    ctrls: [],
    queue: [],
    flush(h, x) {
      const v = Rc(h, x);
      return a.current > 0 && !l.queue.length && !Object.keys(v).some((w) => !h.springs[w]) ? us(h, x) : new Promise((w) => {
        qf(h, v), l.queue.push(() => {
          w(us(h, x));
        }), o();
      });
    }
  }), []), c = V([...l.ctrls]), u = [], f = bc(t) || 0;
  de(() => {
    le(c.current.slice(t, f), (h) => {
      $2(h, i), h.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), de(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(h, x) {
    for (let v = h; v < x; v++) {
      const E = c.current[v] || (c.current[v] = new L2(null, l.flush)), w = r ? r(v, E) : e[v];
      w && (u[v] = M2(w));
    }
  }
  const m = c.current.map((h, x) => Rc(h, u[x])), p = it(ro), b = bc(p), y = p !== b && k2(p);
  sl(() => {
    a.current++, l.ctrls = c.current;
    const {
      queue: h
    } = l;
    h.length && (l.queue = [], le(h, (x) => x())), le(c.current, (x, v) => {
      i == null || i.add(x), y && x.start({
        default: p
      });
      const E = u[v];
      E && (_2(x, E.ref), x.ref ? x.queue.push(E) : x.start(E));
    });
  }), If(() => () => {
    le(l.ctrls, (h) => h.stop(!0));
  });
  const g = m.map((h) => Te({}, h));
  return i ? [g, i] : g;
}
function Le(t, e) {
  const n = z.fun(t), [[r], i] = W2(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Pc;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(Pc || (Pc = {}));
class Gf extends dl {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = hi(...n);
    const r = this._get(), i = is(r);
    ll(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    Ht(n, r) || (Mt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Mc(this._active) && Ro(this);
  }
  _get() {
    const e = z.arr(this.source) ? this.source.map(Ge) : nt(Ge(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !Mc(this._active) && (this.idle = !1, le(to(this), (e) => {
      e.done = !1;
    }), vt.skipAnimation ? (ne.batchedUpdates(() => this.advance()), Ro(this)) : Xa.start(this));
  }
  _attach() {
    let e = 1;
    le(nt(this.source), (n) => {
      ut(n) && Pr(n, this), ss(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    le(nt(this.source), (e) => {
      ut(e) && pi(e, this);
    }), this._active.clear(), Ro(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = nt(this.source).reduce((n, r) => Math.max(n, (ss(r) ? r.priority : 0) + 1), 0));
  }
}
function Z2(t) {
  return t.idle !== !1;
}
function Mc(t) {
  return !t.size || Array.from(t).every(Z2);
}
function Ro(t) {
  t.idle || (t.idle = !0, le(to(t), (e) => {
    e.done = !0;
  }), vi(t, {
    type: "idle",
    parent: t
  }));
}
const H2 = (t, ...e) => new Gf(t, e);
vt.assign({
  createStringInterpolator: Pf,
  to: (t, e) => new Gf(t, e)
});
function ml(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const z2 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], Xf = /^--/;
function q2(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !Xf.test(t) && !(ui.hasOwnProperty(t) && ui[t]) ? e + "px" : ("" + e).trim();
}
const Ac = {};
function U2(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: l,
    viewBox: c
  } = r, u = ml(r, z2), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : Ac[m] || (Ac[m] = m.replace(/([A-Z])/g, (p) => "-" + p.toLowerCase())));
  a !== void 0 && (t.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const p = q2(m, i[m]);
      Xf.test(m) ? t.style.setProperty(m, p) : t.style[m] = p;
    }
  d.forEach((m, p) => {
    t.setAttribute(m, f[p]);
  }), o !== void 0 && (t.scrollTop = o), l !== void 0 && (t.scrollLeft = l), c !== void 0 && t.setAttribute("viewBox", c);
}
let ui = {
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
const K2 = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), Y2 = ["Webkit", "Ms", "Moz", "O"];
ui = Object.keys(ui).reduce((t, e) => (Y2.forEach((n) => t[K2(n, e)] = t[e]), t), ui);
const G2 = ["x", "y", "z"], X2 = /^(matrix|translate|scale|rotate|skew)/, Q2 = /^(translate)/, J2 = /^(rotate|skew)/, Po = (t, e) => z.num(t) && t !== 0 ? t + e : t, pa = (t, e) => z.arr(t) ? t.every((n) => pa(n, e)) : z.num(t) ? t === e : parseFloat(t) === e;
class ev extends no {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, a = ml(e, G2);
    const o = [], l = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => Po(u, "px")).join(",")})`, pa(c, 0)])), Tt(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (X2.test(u)) {
        if (delete a[u], z.und(c))
          return;
        const f = Q2.test(u) ? "px" : J2.test(u) ? "deg" : "";
        o.push(nt(c)), l.push(u === "rotate3d" ? ([d, m, p, b]) => [`rotate3d(${d},${m},${p},${Po(b, f)})`, pa(b, 0)] : (d) => [`${u}(${d.map((m) => Po(m, f)).join(",")})`, pa(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new tv(o, l)), super(a);
  }
}
class tv extends Ff {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return le(this.inputs, (r, i) => {
      const a = Ge(r[0]), [o, l] = this.transforms[i](z.arr(a) ? a : r.map(Ge));
      e += " " + o, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && le(this.inputs, (n) => le(n, (r) => ut(r) && Pr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && le(this.inputs, (n) => le(n, (r) => ut(r) && pi(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), vi(this, e);
  }
}
const nv = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], rv = ["scrollTop", "scrollLeft"];
vt.assign({
  batchedUpdates: tf,
  createStringInterpolator: Pf,
  colors: jh
});
const iv = b2(nv, {
  applyAnimatedValues: U2,
  createAnimatedStyle: (t) => new ev(t),
  getComponentProps: (t) => ml(t, rv)
}), Ce = iv.animated;
function av(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function Ar(t, e) {
  if (Nr && t) {
    const n = av(t);
    return k0(e, n);
  }
  return e;
}
function ov(t) {
  const e = V(t);
  return t && (e.current = !0), !!e.current;
}
const Ir = (t) => io(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function io(t, e, n) {
  const r = ov(t);
  return e || t ? !0 : r ? !n : !1;
}
const sv = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function dn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = sv[r];
    n[i] = function(a) {
      var o, l;
      a.stopPropagation(), (l = (o = e.props)[i]) === null || l === void 0 || l.call(o, a);
    };
  }
  return s.cloneElement(e, n);
}
const Mo = "adm-mask", lv = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, cv = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, uv = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, Ai = (t) => {
  const e = q(uv, t), {
    locale: n
  } = ue(), r = V(null);
  Ya(r, e.visible && e.disableBodyScroll);
  const i = de(() => {
    var f;
    const d = (f = lv[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = cv[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [a, o] = X(e.visible), l = Xs(), {
    opacity: c
  } = Le({
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
  }), u = dn(e.stopPropagation, W(e, s.createElement(Ce.div, {
    className: Mo,
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
    className: `${Mo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${Mo}-content`
  }, e.children))));
  return s.createElement(Ir, {
    active: a,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, Ar(e.getContainer, u));
};
function Qf(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "AddOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function fv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "CheckCircleFill-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "CheckCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Jf(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "CheckOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "CheckOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function dv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "ClockCircleFill-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "ClockCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function hl(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "CloseCircleFill-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "CloseCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ao(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "CloseOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "CloseOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function mv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "DownFill-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "DownFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ed(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", null, /* @__PURE__ */ I.createElement("rect", {
    id: "DownOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
    id: "DownOutline-down",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function hv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", null, /* @__PURE__ */ I.createElement("rect", {
    id: "ExclamationCircleFill-矩形",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function vv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "InformationCircleFill-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "InformationCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function pv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "LeftOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "LeftOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function gv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "MinusOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function yv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "QuestionCircleOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "QuestionCircleOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function bv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "RightOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
    id: "RightOutline-right",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ev(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "SearchOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "SearchOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function wv(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "SoundOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "SoundOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ic(t) {
  return /* @__PURE__ */ I.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ I.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ I.createElement("g", {
    id: "TextDeletionOutline-编组"
  }, /* @__PURE__ */ I.createElement("rect", {
    id: "TextDeletionOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ I.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const vl = {
  closeOnMaskClick: !1,
  closeIcon: s.createElement(ao, null),
  destroyOnClose: !1,
  disableBodyScroll: !0,
  forceRender: !1,
  getContainer: () => document.body,
  mask: !0,
  showCloseButton: !1,
  stopPropagation: ["click"],
  visible: !1
};
function td(t) {
  const [e, n] = X(t);
  return Ae(() => {
    n(t);
  }, [t]), e;
}
function Cv(t, e, n) {
  return Math.max(e, Math.min(t, n));
}
const Me = {
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
function Tc(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function Lc(t, e, n, r = 0.15) {
  return r === 0 ? Cv(t, e, n) : t < e ? -Tc(e - t, n - e, r) + e : t > n ? +Tc(t - n, n - e, r) + n : t;
}
function xv(t, [e, n], [r, i]) {
  const [[a, o], [l, c]] = t;
  return [Lc(e, a, o, r), Lc(n, l, c, i)];
}
function kv(t, e) {
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
function $v(t) {
  var e = kv(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function je(t, e, n) {
  return e = $v(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Dc(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function $e(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Dc(Object(n), !0).forEach(function(r) {
      je(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Dc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const nd = {
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
function Vc(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const _v = ["enter", "leave"];
function Sv(t = !1, e) {
  return t && !_v.includes(e);
}
function Ov(t, e = "", n = !1) {
  const r = nd[t], i = r && r[e] || e;
  return "on" + Vc(t) + Vc(i) + (Sv(n, i) ? "Capture" : "");
}
const Fv = ["gotpointercapture", "lostpointercapture"];
function Nv(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = Fv.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function Rv(t, e = "") {
  const n = nd[t], r = n && n[e] || e;
  return t + r;
}
function oo(t) {
  return "touches" in t;
}
function rd(t) {
  return oo(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function Pv(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function Mv(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function id(t) {
  return oo(t) ? Mv(t)[0] : t;
}
function fs(t, e) {
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
function Av(t) {
  return Pv(t).map((e) => e.identifier);
}
function jc(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return fs(n, r);
}
function Ao(t) {
  const e = id(t);
  return oo(t) ? e.identifier : e.pointerId;
}
function Bc(t) {
  const e = id(t);
  return [e.clientX, e.clientY];
}
const Wc = 40, Zc = 800;
function ad(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= Wc, n *= Wc) : r === 2 && (e *= Zc, n *= Zc), [e, n];
}
function Iv(t) {
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
function Pa(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function Tv() {
}
function Lv(...t) {
  return t.length === 0 ? Tv : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function Hc(t, e) {
  return Object.assign({}, e, t || {});
}
const Dv = 32;
class od {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? Pa(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, Iv(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const C = n._delta.map(Math.abs);
      Me.addTo(n._distance, C);
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
      const [C, k] = d;
      m[0] = f[0] !== !1 ? C - f[0] : 0, m[1] = f[1] !== !1 ? k - f[1] : 0;
    } else
      m[0] = f[0] !== !1 ? o - f[0] : 0, m[1] = f[1] !== !1 ? l - f[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const p = n.offset, b = n._active && !n._blocked || n.active;
    b && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = Pa(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [y, g] = n.offset, [[h, x], [v, E]] = n._bounds;
    n.overflow = [y < h ? -1 : y > x ? 1 : 0, g < v ? -1 : g > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = xv(n._bounds, n.offset, w), n.delta = Me.sub(n.offset, p), this.computeMovement(), b && (!n.last || a > Dv)) {
      n.delta = Me.sub(n.offset, p);
      const C = n.delta.map(Math.abs);
      Me.addTo(n.distance, C), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [C[0] / a, C[1] / a], n.timeDelta = a);
    }
  }
  emit() {
    const e = this.state, n = this.shared, r = this.config;
    if (e._active || this.clean(), (e._blocked || !e.intentional) && !e._force && !r.triggerAllEvents)
      return;
    const i = this.handler($e($e($e({}, n), e), {}, {
      [this.aliasKey]: e.values
    }));
    i !== void 0 && (e.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Vv([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class sd extends od {
  constructor(...e) {
    super(...e), je(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Me.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Me.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const n = this.state, r = this.config;
    if (!n.axis && e) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[rd(e)] : r.axisThreshold;
      n.axis = Vv(n._movement, i);
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
const jv = (t) => t, zc = 0.15, ld = {
  enabled(t = !0) {
    return t;
  },
  eventOptions(t, e, n) {
    return $e($e({}, n.shared.eventOptions), t);
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
        return [zc, zc];
      case !1:
        return [0, 0];
      default:
        return Me.toVector(t);
    }
  },
  from(t) {
    if (typeof t == "function")
      return t;
    if (t != null)
      return Me.toVector(t);
  },
  transform(t, e, n) {
    const r = t || n.shared.transform;
    return this.hasCustomTransform = !!r, r || jv;
  },
  threshold(t) {
    return Me.toVector(t, 0);
  }
}, Bv = 0, Tr = $e($e({}, ld), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = Bv) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (a) => Tr.bounds(t(a));
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
}), qc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class Wv extends sd {
  constructor(...e) {
    super(...e), je(this, "ingKey", "dragging");
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
      e._bounds = Tr.bounds(i);
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = Ao(e), r._pointerActive = !0, this.computeValues(Bc(e)), this.computeInitial(), n.preventScrollAxis && rd(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = Ao(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = Bc(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Me.sub(a, n._values), this.computeValues(a)), Me.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
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
    const i = Ao(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [l, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [p, b] = r.swipe.distance, y = r.swipe.duration;
      if (n.elapsedTime < y) {
        const g = Math.abs(l / n.timeDelta), h = Math.abs(c / n.timeDelta);
        g > d && Math.abs(u) > p && (n.swipe[0] = Math.sign(l)), h > m && Math.abs(f) > b && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, Zv(e);
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
    const n = qc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Me.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in qc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Zv(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const Ii = typeof window < "u" && window.document && window.document.createElement;
function cd() {
  return Ii && "ontouchstart" in window;
}
function Hv() {
  return cd() || Ii && window.navigator.maxTouchPoints > 1;
}
function zv() {
  return Ii && "onpointerdown" in window;
}
function qv() {
  return Ii && "exitPointerLock" in window.document;
}
function Uv() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const ft = {
  isBrowser: Ii,
  gesture: Uv(),
  touch: cd(),
  touchscreen: Hv(),
  pointer: zv(),
  pointerLock: qv()
}, Kv = 250, Yv = 180, Gv = 0.5, Xv = 50, Qv = 250, Jv = 10, Uc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, e3 = $e($e({}, Tr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && ft.pointerLock, ft.touch && n ? "touch" : this.pointerLock ? "mouse" : ft.pointer && !i ? "pointer" : ft.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Kv : void 0, !(!ft.touchscreen || n === !1))
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
    const a = Me.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: t = Gv,
    distance: e = Xv,
    duration: n = Qv
  } = {}) {
    return {
      velocity: this.transform(Me.toVector(t)),
      distance: this.transform(Me.toVector(e)),
      duration: n
    };
  },
  delay(t = 0) {
    switch (t) {
      case !0:
        return Yv;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? $e($e({}, Uc), t) : Uc;
  },
  keyboardDisplacement(t = Jv) {
    return t;
  }
});
function ud(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [a, o] = t._direction;
  (e < 0 && r > 0 && a < 0 || e > 0 && r < 0 && a > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (t._movement[1] = t._movementBound[1]);
}
const t3 = 30, n3 = 100;
class r3 extends od {
  constructor(...e) {
    super(...e), je(this, "ingKey", "pinching"), je(this, "aliasKey", "da");
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
    e === "wheel" ? this.state.offset = Me.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
    if (n._active && n._touchIds.every((a) => r.has(a)) || r.size < 2)
      return;
    this.start(e), n._touchIds = Array.from(r).slice(0, 2);
    const i = jc(e, n._touchIds);
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
    const a = fs(...Array.from(r.values()));
    a && this.pinchStart(e, a);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = jc(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = fs(...Array.from(n.values()));
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
    n._movement = [e.scale - 1, e.rotation], n._delta = Me.sub(n._movement, r), this.compute(e), this.emit();
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
    r._delta = [-ad(e)[1] / n3 * r.offset[0], 0], Me.addTo(r._movement, r._delta), ud(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const i3 = $e($e({}, ld), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !ft.touch && ft.gesture)
      return "gesture";
    if (ft.touch && r)
      return "touch";
    if (ft.touchscreen) {
      if (ft.pointer)
        return "pointer";
      if (ft.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const l = Hc(Pa(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, a = (o) => {
      const l = Hc(Pa(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(t, e, n) {
    return this.lockDirection = n.axis === "lock", Me.toVector(t, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(t) {
    return t === void 0 ? "ctrlKey" : t;
  },
  pinchOnWheel(t = !0) {
    return t;
  }
});
$e($e({}, Tr), {}, {
  mouseOnly: (t = !0) => t
});
class a3 extends sd {
  constructor(...e) {
    super(...e), je(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = ad(e), Me.addTo(n._movement, n._delta), ud(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const o3 = Tr;
$e($e({}, Tr), {}, {
  mouseOnly: (t = !0) => t
});
const pl = /* @__PURE__ */ new Map(), ds = /* @__PURE__ */ new Map();
function gl(t) {
  pl.set(t.key, t.engine), ds.set(t.key, t.resolver);
}
const fd = {
  key: "drag",
  engine: Wv,
  resolver: e3
}, s3 = {
  key: "pinch",
  engine: r3,
  resolver: i3
}, l3 = {
  key: "wheel",
  engine: a3,
  resolver: o3
};
function c3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function u3(t, e) {
  if (t == null)
    return {};
  var n = c3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
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
  window(t = ft.isBrowser ? window : void 0) {
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
function ga(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = ga(t[r], i);
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
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  } = r, u = u3(r, d3);
  if (n.shared = ga({
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  }, f3), e) {
    const f = ds.get(e);
    n[e] = ga($e({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = ds.get(f);
      d && (n[f] = ga($e({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class dd {
  constructor(e, n) {
    je(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, a) {
    const o = this._listeners, l = Rv(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = $e($e({}, c), a);
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
class h3 {
  constructor() {
    je(this, "_timeouts", /* @__PURE__ */ new Map());
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
    je(this, "gestures", /* @__PURE__ */ new Set()), je(this, "_targetEventStore", new dd(this)), je(this, "gestureEventStores", {}), je(this, "gestureTimeoutStores", {}), je(this, "handlers", {}), je(this, "config", {}), je(this, "pointerIds", /* @__PURE__ */ new Set()), je(this, "touchIds", /* @__PURE__ */ new Set()), je(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), p3(this, e);
  }
  setEventIds(e) {
    if (oo(e))
      return this.touchIds = new Set(Av(e)), this.touchIds;
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
        for (const o of this.gestures) {
          const l = this.config[o], c = Kc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = pl.get(o);
            new u(this, e, o).bind(c);
          }
        }
        const a = Kc(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (l) => this.nativeHandlers[o]($e($e({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = Lv(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: l,
          passive: c
        } = Nv(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function Gn(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new dd(t, e), t.gestureTimeoutStores[e] = new h3();
}
function p3(t, e) {
  e.drag && Gn(t, "drag"), e.wheel && Gn(t, "wheel"), e.scroll && Gn(t, "scroll"), e.move && Gn(t, "move"), e.pinch && Gn(t, "pinch"), e.hover && Gn(t, "hover");
}
const Kc = (t, e, n) => (r, i, a, o = {}, l = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : e.capture, d = (u = o.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : Ov(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(a);
}, g3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function y3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    g3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Xn(t, e, n, r, i, a) {
  if (!t.has(n) || !pl.has(r))
    return;
  const o = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && o in e && e[o](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function b3(t, e) {
  const [n, r, i] = y3(t), a = {};
  return Xn(i, n, "onDrag", "drag", a, e), Xn(i, n, "onWheel", "wheel", a, e), Xn(i, n, "onScroll", "scroll", a, e), Xn(i, n, "onPinch", "pinch", a, e), Xn(i, n, "onMove", "move", a, e), Xn(i, n, "onHover", "hover", a, e), {
    handlers: a,
    config: e,
    nativeHandlers: r
  };
}
function yl(t, e = {}, n, r) {
  const i = s.useMemo(() => new v3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function Dt(t, e) {
  return gl(fd), yl({
    drag: t
  }, e || {}, "drag");
}
function E3(t, e) {
  return gl(l3), yl({
    wheel: t
  }, e || {}, "wheel");
}
function w3(t) {
  return t.forEach(gl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = b3(n, r || {});
    return yl(i, o, void 0, a);
  };
}
const Ki = "adm-popup", C3 = Object.assign(Object.assign({}, vl), {
  closeOnSwipe: !1,
  position: "bottom"
}), Lr = (t) => {
  const {
    locale: e,
    popup: n = {}
  } = ue(), r = q(C3, n, t), i = j(`${Ki}-body`, r.bodyClassName, `${Ki}-body-position-${r.position}`), [a, o] = X(r.visible), l = V(null);
  Ya(l, r.disableBodyScroll && a ? "strict" : !1), Ae(() => {
    r.visible && o(!0);
  }, [r.visible]);
  const c = Xs(), {
    percent: u
  } = Le({
    percent: r.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var p, b;
      c.current || (o(r.visible), r.visible ? (p = r.afterShow) === null || p === void 0 || p.call(r) : (b = r.afterClose) === null || b === void 0 || b.call(r));
    }
  }), f = Dt(({
    swipe: [, p]
  }) => {
    var b;
    r.closeOnSwipe && (p === 1 && r.position === "bottom" || p === -1 && r.position === "top") && ((b = r.onClose) === null || b === void 0 || b.call(r));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(r.position)
  }), d = td(a && r.visible), m = dn(r.stopPropagation, W(r, s.createElement("div", Object.assign({
    className: Ki,
    onClick: r.onClick,
    style: {
      display: a ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(r.position) ? "none" : "auto"
    }
  }, f()), r.mask && s.createElement(Ai, {
    visible: d,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose,
    onMaskClick: (p) => {
      var b, y;
      (b = r.onMaskClick) === null || b === void 0 || b.call(r, p), r.closeOnMaskClick && ((y = r.onClose) === null || y === void 0 || y.call(r));
    },
    className: r.maskClassName,
    style: r.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: r.stopPropagation
  }), s.createElement(Ce.div, {
    className: i,
    style: Object.assign(Object.assign({}, r.bodyStyle), {
      pointerEvents: u.to((p) => p === 0 ? "unset" : "none"),
      transform: u.to((p) => r.position === "bottom" ? `translate(0, ${p}%)` : r.position === "top" ? `translate(0, -${p}%)` : r.position === "left" ? `translate(-${p}%, 0)` : r.position === "right" ? `translate(${p}%, 0)` : "none")
    }),
    ref: l
  }, r.showCloseButton && s.createElement("a", {
    className: j(`${Ki}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var p;
      (p = r.onClose) === null || p === void 0 || p.call(r);
    },
    role: "button",
    "aria-label": e.common.close
  }, r.closeIcon), r.children))));
  return s.createElement(Ir, {
    active: a,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose
  }, Ar(r.getContainer, m));
}, Yc = "adm-safe-area", Dr = (t) => W(t, s.createElement("div", {
  className: j(Yc, `${Yc}-position-${t.position}`)
})), Ma = Object.assign({}, C0), {
  version: x3,
  render: k3,
  unmountComponentAtNode: $3
} = Ma;
let so;
try {
  Number((x3 || "").split(".")[0]) >= 18 && Ma.createRoot && (so = Ma.createRoot);
} catch {
}
function Gc(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = Ma;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const Aa = "__antd_mobile_root__";
function _3(t, e) {
  k3(t, e);
}
function S3(t, e) {
  Gc(!0);
  const n = e[Aa] || so(e);
  Gc(!1), n.render(t), e[Aa] = n;
}
function O3(t, e) {
  if (so) {
    S3(t, e);
    return;
  }
  _3(t, e);
}
function F3(t) {
  return $3(t);
}
function N3(t) {
  return Pe(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[Aa]) === null || e === void 0 || e.unmount(), delete t[Aa];
    });
  });
}
function R3(t) {
  return so ? N3(t) : F3(t);
}
function Ti(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    R3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return O3(t, e), n;
}
function Bn(t) {
  const e = s.forwardRef((i, a) => {
    const [o, l] = X(!1), c = V(!1), [u, f] = X(t), d = V(0);
    Q(() => {
      c.current ? p() : l(!0);
    }, []);
    function m() {
      var b, y;
      c.current = !0, l(!1), (y = (b = u.props).onClose) === null || y === void 0 || y.call(b);
    }
    function p() {
      var b, y;
      r(), (y = (b = u.props).afterClose) === null || y === void 0 || y.call(b);
    }
    return ke(a, () => ({
      close: m,
      replace: (b) => {
        var y, g;
        d.current++, (g = (y = u.props).afterClose) === null || g === void 0 || g.call(y), f(b);
      }
    })), s.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: p
    }));
  }), n = s.createRef(), r = Ti(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Pe(this, void 0, void 0, function* () {
      var i, a, o;
      n.current ? (o = n.current) === null || o === void 0 || o.close() : (r(), (a = (i = t.props).afterClose) === null || a === void 0 || a.call(i));
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    },
    isRendered: () => !!n.current
  };
}
const He = "adm-action-sheet", P3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, md = (t) => {
  const e = q(P3, t), {
    styles: n
  } = e;
  return s.createElement(Lr, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: j(`${He}-popup`, e.popupClassName),
    style: e.popupStyle,
    getContainer: e.getContainer,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, W(e, s.createElement("div", {
    className: He
  }, e.extra && s.createElement("div", {
    className: `${He}-extra`
  }, e.extra), s.createElement("div", {
    className: `${He}-button-list`
  }, e.actions.map((r, i) => s.createElement("div", {
    key: r.key,
    className: `${He}-button-item-wrapper`
  }, s.createElement("a", {
    className: j("adm-plain-anchor", `${He}-button-item`, {
      [`${He}-button-item-danger`]: r.danger,
      [`${He}-button-item-disabled`]: r.disabled,
      [`${He}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var a, o, l;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = e.onAction) === null || o === void 0 || o.call(e, r, i), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, s.createElement("div", {
    className: `${He}-button-item-name`
  }, r.text), r.description && s.createElement("div", {
    className: `${He}-button-item-description`
  }, r.description))))), e.cancelText && s.createElement("div", {
    className: `${He}-cancel`,
    role: "option",
    "aria-label": e.cancelText
  }, s.createElement("div", {
    className: `${He}-button-item-wrapper`
  }, s.createElement("a", {
    className: j("adm-plain-anchor", `${He}-button-item`),
    onClick: e.onClose
  }, s.createElement("div", {
    className: `${He}-button-item-name`
  }, e.cancelText)))), e.safeArea && s.createElement(Dr, {
    position: "bottom"
  }))));
};
function M3(t) {
  return Bn(s.createElement(md, Object.assign({}, t)));
}
const uy = pe(md, {
  show: M3
}), Xc = "adm-auto-center", wi = (t) => W(t, s.createElement("div", {
  className: Xc
}, s.createElement("div", {
  className: `${Xc}-content`
}, t.children))), A3 = ze(() => s.createElement("svg", {
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
var bl = {}, I3 = mt && mt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(bl, "__esModule", { value: !0 });
var El = bl.staged = void 0;
const T3 = I3(s);
function hd(t) {
  return typeof t == "function" ? T3.default.createElement(L3, { stage: t }) : t;
}
function L3(t) {
  const e = t.stage();
  return hd(e);
}
function D3(t) {
  return function(n, r) {
    const i = t(n, r);
    return hd(i);
  };
}
El = bl.staged = D3;
function Pn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const V3 = (t) => {
  const e = V(null), [n] = Jm(e);
  return Q(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, Li = of(Ae), j3 = () => s.createElement("svg", {
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
})), Ia = "adm-image", W3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${Ia}-tip`
  }, s.createElement(j3, null)),
  fallback: s.createElement("div", {
    className: `${Ia}-tip`
  }, s.createElement(B3, null)),
  lazy: !1,
  draggable: !1
}, lo = El((t) => {
  const e = q(W3, t), [n, r] = X(!1), [i, a] = X(!1), o = V(null), l = V(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = X(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, Li(() => {
    r(!1), a(!1);
  }, [c]), Q(() => {
    var b;
    !((b = l.current) === null || b === void 0) && b.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const b = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${Ia}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (y) => {
        var g;
        r(!0), (g = e.onLoad) === null || g === void 0 || g.call(e, y);
      },
      onError: (y) => {
        var g;
        a(!0), (g = e.onError) === null || g === void 0 || g.call(e, y);
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
    return s.createElement(s.Fragment, null, !n && e.placeholder, b);
  }
  const p = {};
  return e.width && (p["--width"] = Pn(e.width), p.width = Pn(e.width)), e.height && (p["--height"] = Pn(e.height), p.height = Pn(e.height)), W(e, s.createElement("div", {
    ref: o,
    className: Ia,
    style: p,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(V3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), Z3 = "adm-avatar", H3 = {
  fallback: s.createElement(A3, null),
  fit: "cover"
}, fy = (t) => {
  const e = q(H3, t);
  return W(e, s.createElement(lo, {
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
}, Qn = "adm-badge", vd = s.createElement(s.Fragment, null), z3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === vd, a = j(Qn, {
    [`${Qn}-fixed`]: !!r,
    [`${Qn}-dot`]: i,
    [`${Qn}-bordered`]: t.bordered
  }), o = e || e === 0 ? W(t, s.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && s.createElement("div", {
    className: `${Qn}-content`
  }, e))) : null;
  return r ? s.createElement("div", {
    className: j(`${Qn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, o) : o;
}, ms = pe(z3, {
  dot: vd
}), q3 = "adm-dot-loading", U3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, K3 = {
  color: "default"
}, pd = ze((t) => {
  var e;
  const n = q(K3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = U3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: j("adm-loading", q3)
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
function gd(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function Y3() {
  return Nr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const ot = "adm-button", G3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(pd, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, qt = Ee((t, e) => {
  const n = q(G3, t), [r, i] = X(!1), a = V(null), o = n.loading === "auto" ? r : n.loading, l = n.disabled || o;
  ke(e, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Pe(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (gd(f))
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
    className: j(ot, {
      [`${ot}-${n.color}`]: n.color,
      [`${ot}-block`]: n.block,
      [`${ot}-disabled`]: l,
      [`${ot}-fill-outline`]: n.fill === "outline",
      [`${ot}-fill-none`]: n.fill === "none",
      [`${ot}-mini`]: n.size === "mini",
      [`${ot}-small`]: n.size === "small",
      [`${ot}-large`]: n.size === "large",
      [`${ot}-loading`]: o
    }, `${ot}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? s.createElement("div", {
    className: `${ot}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
}), Qc = () => s.createElement("svg", {
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
})))))), Jc = () => s.createElement("svg", {
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
var yd = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
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
        var f, d, m, p, b = o(this), y = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), p = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (p += 7), m.add(p, n));
        return b.diff(y, "week") + 1;
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
})(yd);
var X3 = yd.exports;
const co = /* @__PURE__ */ $t(X3);
function ce(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = ff(), a = V(e !== void 0 ? e : n);
  e !== void 0 && (a.current = e);
  const o = Yt((l, c = !1) => {
    const u = typeof l == "function" ? l(a.current) : l;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function Q3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function eu(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function Io(t) {
  return ae().year(t.year).month(t.month - 1).date(1);
}
ae.extend(co);
const we = "adm-calendar", J3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(Qc, null),
  prevYearButton: s.createElement(Jc, null),
  nextMonthButton: s.createElement(Qc, null),
  nextYearButton: s.createElement(Jc, null)
}, dy = Ee((t, e) => {
  const n = ae(), r = q(J3, t), {
    locale: i
  } = ue(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const v = a.pop();
    v && a.unshift(v);
  }
  const [o, l] = ce({
    value: r.value === void 0 ? void 0 : eu(r.selectionMode, r.value),
    defaultValue: eu(r.selectionMode, r.defaultValue),
    onChange: (v) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, v ? v[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, v));
    }
  }), [c, u] = X(!1), [f, d] = X(() => ae(o ? o[0] : n).date(1));
  Us(() => {
    var v;
    (v = r.onPageChange) === null || v === void 0 || v.call(r, f.year(), f.month() + 1);
  }, [f]), ke(e, () => ({
    jumpTo: (v) => {
      let E;
      typeof v == "function" ? E = v({
        year: f.year(),
        month: f.month() + 1
      }) : E = v, d(Io(E));
    },
    jumpToToday: () => {
      d(ae().date(1));
    }
  }));
  const m = (v, E, w) => {
    const C = f[v](E, w);
    if (v === "subtract" && r.minPage) {
      const k = Io(r.minPage);
      if (C.isBefore(k, w))
        return;
    }
    if (v === "add" && r.maxPage) {
      const k = Io(r.maxPage);
      if (C.isAfter(k, w))
        return;
    }
    d(C);
  }, p = s.createElement("div", {
    className: `${we}-header`
  }, s.createElement("a", {
    className: `${we}-arrow-button ${we}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), s.createElement("a", {
    className: `${we}-arrow-button ${we}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), s.createElement("div", {
    className: `${we}-title`
  }, Q3(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), s.createElement("a", {
    className: j(`${we}-arrow-button`, `${we}-arrow-button-right`, `${we}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), s.createElement("a", {
    className: j(`${we}-arrow-button`, `${we}-arrow-button-right`, `${we}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), b = de(() => r.max && ae(r.max), [r.max]), y = de(() => r.min && ae(r.min), [r.min]);
  function g() {
    var v;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const C = w;
      let k = !1, O = !1, P = !1, _ = !1, L = !1;
      if (o) {
        const [$, R] = o;
        O = C.isSame($, "day"), P = C.isSame(R, "day"), k = O || P || C.isAfter($, "day") && C.isBefore(R, "day"), k && (_ = (E.length % 7 === 0 || C.isSame(C.startOf("month"), "day")) && !O, L = (E.length % 7 === 6 || C.isSame(C.endOf("month"), "day")) && !P);
      }
      const M = C.month() === f.month(), S = r.shouldDisableDate ? r.shouldDisableDate(C.toDate()) : b && C.isAfter(b, "day") || y && C.isBefore(y, "day");
      E.push(s.createElement("div", {
        key: C.valueOf(),
        className: j(`${we}-cell`, (S || !M) && `${we}-cell-disabled`, M && {
          [`${we}-cell-today`]: C.isSame(n, "day"),
          [`${we}-cell-selected`]: k,
          [`${we}-cell-selected-begin`]: O,
          [`${we}-cell-selected-end`]: P,
          [`${we}-cell-selected-row-begin`]: _,
          [`${we}-cell-selected-row-end`]: L
        }),
        onClick: () => {
          if (!r.selectionMode || S)
            return;
          const $ = C.toDate();
          M || d(C.clone().date(1));
          function R() {
            if (!r.allowClear || !o)
              return !1;
            const [F, N] = o;
            return C.isSame(F, "date") && C.isSame(N, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && R()) {
              l(null);
              return;
            }
            l([$, $]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              l([$, $]), u(!0);
              return;
            }
            if (R()) {
              l(null), u(!1);
              return;
            }
            if (c) {
              const F = o[0];
              l(F > $ ? [$, F] : [F, $]), u(!1);
            } else
              l([$, $]), u(!0);
          }
        }
      }, s.createElement("div", {
        className: `${we}-cell-top`
      }, r.renderDate ? r.renderDate(C.toDate()) : C.date()), s.createElement("div", {
        className: `${we}-cell-bottom`
      }, (v = r.renderLabel) === null || v === void 0 ? void 0 : v.call(r, C.toDate())))), w = w.add(1, "day");
    }
    return E;
  }
  const h = s.createElement("div", {
    className: `${we}-cells`
  }, g()), x = s.createElement("div", {
    className: `${we}-mark`
  }, a.map((v, E) => s.createElement("div", {
    key: E,
    className: `${we}-mark-cell`
  }, v)));
  return W(r, s.createElement("div", {
    className: we
  }, p, x, h));
});
var bd = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, a) {
        return this.isSame(i, a) || this.isBefore(i, a);
      };
    };
  });
})(bd);
var ep = bd.exports;
const tp = /* @__PURE__ */ $t(ep);
function tu(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function np(t) {
  return ae().year(t.year).month(t.month - 1).date(1);
}
function Ta(t) {
  var e = I.useRef();
  e.current = t;
  var n = I.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(a));
  }, []);
  return n;
}
function Ed(t) {
  if (Array.isArray(t))
    return t;
}
function rp(t, e) {
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
function hs(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function wl(t, e) {
  if (t) {
    if (typeof t == "string")
      return hs(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return hs(t, e);
  }
}
function wd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fe(t, e) {
  return Ed(t) || rp(t, e) || wl(t, e) || wd();
}
function uo() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var nu = uo() ? I.useLayoutEffect : I.useEffect, Cd = function(e, n) {
  var r = I.useRef(!0);
  nu(function() {
    return e(r.current);
  }, n), nu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, ru = function(e, n) {
  Cd(function(r) {
    if (!r)
      return e();
  }, n);
};
function gr(t) {
  var e = I.useRef(!1), n = I.useState(t), r = Fe(n, 2), i = r[0], a = r[1];
  I.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function o(l, c) {
    c && e.current || a(l);
  }
  return [i, o];
}
function To(t) {
  return t !== void 0;
}
function xd(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, l = gr(function() {
    return To(i) ? i : To(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = Fe(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, p = Ta(a), b = gr([d]), y = Fe(b, 2), g = y[0], h = y[1];
  ru(function() {
    var v = g[0];
    u !== v && p(u, v);
  }, [g]), ru(function() {
    To(i) || f(i);
  }, [i]);
  var x = Ta(function(v, E) {
    f(v, E), h([d], E);
  });
  return [m, x];
}
function _e(t) {
  "@babel/helpers - typeof";
  return _e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _e(t);
}
var kd = { exports: {} }, ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cl = Symbol.for("react.element"), xl = Symbol.for("react.portal"), fo = Symbol.for("react.fragment"), mo = Symbol.for("react.strict_mode"), ho = Symbol.for("react.profiler"), vo = Symbol.for("react.provider"), po = Symbol.for("react.context"), ip = Symbol.for("react.server_context"), go = Symbol.for("react.forward_ref"), yo = Symbol.for("react.suspense"), bo = Symbol.for("react.suspense_list"), Eo = Symbol.for("react.memo"), wo = Symbol.for("react.lazy"), ap = Symbol.for("react.offscreen"), $d;
$d = Symbol.for("react.module.reference");
function gt(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case Cl:
        switch (t = t.type, t) {
          case fo:
          case ho:
          case mo:
          case yo:
          case bo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case ip:
              case po:
              case go:
              case wo:
              case Eo:
              case vo:
                return t;
              default:
                return e;
            }
        }
      case xl:
        return e;
    }
  }
}
ge.ContextConsumer = po;
ge.ContextProvider = vo;
ge.Element = Cl;
ge.ForwardRef = go;
ge.Fragment = fo;
ge.Lazy = wo;
ge.Memo = Eo;
ge.Portal = xl;
ge.Profiler = ho;
ge.StrictMode = mo;
ge.Suspense = yo;
ge.SuspenseList = bo;
ge.isAsyncMode = function() {
  return !1;
};
ge.isConcurrentMode = function() {
  return !1;
};
ge.isContextConsumer = function(t) {
  return gt(t) === po;
};
ge.isContextProvider = function(t) {
  return gt(t) === vo;
};
ge.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Cl;
};
ge.isForwardRef = function(t) {
  return gt(t) === go;
};
ge.isFragment = function(t) {
  return gt(t) === fo;
};
ge.isLazy = function(t) {
  return gt(t) === wo;
};
ge.isMemo = function(t) {
  return gt(t) === Eo;
};
ge.isPortal = function(t) {
  return gt(t) === xl;
};
ge.isProfiler = function(t) {
  return gt(t) === ho;
};
ge.isStrictMode = function(t) {
  return gt(t) === mo;
};
ge.isSuspense = function(t) {
  return gt(t) === yo;
};
ge.isSuspenseList = function(t) {
  return gt(t) === bo;
};
ge.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === fo || t === ho || t === mo || t === yo || t === bo || t === ap || typeof t == "object" && t !== null && (t.$$typeof === wo || t.$$typeof === Eo || t.$$typeof === vo || t.$$typeof === po || t.$$typeof === go || t.$$typeof === $d || t.getModuleId !== void 0);
};
ge.typeOf = gt;
kd.exports = ge;
var Ci = kd.exports;
function _d(t, e) {
  typeof t == "function" ? t(e) : _e(t) === "object" && t && "current" in t && (t.current = e);
}
function Sd() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e.filter(function(i) {
    return i;
  });
  return r.length <= 1 ? r[0] : function(i) {
    e.forEach(function(a) {
      _d(a, i);
    });
  };
}
function op(t) {
  var e, n, r = Ci.isMemo(t) ? t.type.type : t.type;
  return !(typeof r == "function" && !((e = r.prototype) !== null && e !== void 0 && e.render) || typeof t == "function" && !((n = t.prototype) !== null && n !== void 0 && n.render));
}
function kt(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function sp(t, e) {
  if (_e(t) !== "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (_e(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Od(t) {
  var e = sp(t, "string");
  return _e(e) === "symbol" ? e : String(e);
}
function me(t, e, n) {
  return e = Od(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function iu(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function G(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? iu(Object(n), !0).forEach(function(r) {
      me(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : iu(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function lp(t) {
  if (Array.isArray(t))
    return hs(t);
}
function Fd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function cp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function he(t) {
  return lp(t) || Fd(t) || wl(t) || cp();
}
function up(t) {
  return Ed(t) || Fd(t) || wl(t) || wd();
}
function Nd(t, e, n, r) {
  if (!e.length)
    return n;
  var i = up(e), a = i[0], o = i.slice(1), l;
  return !t && typeof a == "number" ? l = [] : Array.isArray(t) ? l = he(t) : l = G({}, t), r && n === void 0 && o.length === 1 ? delete l[a][o[0]] : l[a] = Nd(l[a], o, n, r), l;
}
function Et(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !kt(t, e.slice(0, -1)) ? t : Nd(t, e, n, r);
}
function fp(t) {
  return _e(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function au(t) {
  return Array.isArray(t) ? [] : {};
}
var dp = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function ii() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = au(e[0]);
  return e.forEach(function(i) {
    function a(o, l) {
      var c = new Set(l), u = kt(i, o), f = Array.isArray(u);
      if (f || fp(u)) {
        if (!c.has(u)) {
          c.add(u);
          var d = kt(r, o);
          f ? r = Et(r, o, []) : (!d || _e(d) !== "object") && (r = Et(r, o, au(u))), dp(u).forEach(function(m) {
            a([].concat(he(o), [m]), c);
          });
        }
      } else
        r = Et(r, o, u);
    }
    a([]);
  }), r;
}
var vs = {}, mp = function(e) {
};
function hp(t, e) {
}
function vp(t, e) {
}
function pp() {
  vs = {};
}
function Rd(t, e, n) {
  !e && !vs[n] && (t(!1, n), vs[n] = !0);
}
function ht(t, e) {
  Rd(hp, t, e);
}
function gp(t, e) {
  Rd(vp, t, e);
}
ht.preMessage = mp;
ht.resetWarned = pp;
ht.noteOnce = gp;
function yp(t, e, n) {
  const r = V(), i = () => {
    r.current && cancelAnimationFrame(r.current);
  }, a = Ta((o) => {
    i(), r.current = requestAnimationFrame(() => {
      if (n.current) {
        const l = o.format("YYYY-M"), c = n.current.querySelector(`[data-year-month="${l}"]`);
        c && c.scrollIntoView({
          block: "start",
          inline: "nearest"
        });
      }
    });
  });
  return Q(() => {
    if (e && t)
      return a(t), i;
  }, [t, e]), a;
}
ae.extend(co);
ae.extend(tp);
const Re = "adm-calendar-picker-view", Pd = s.createContext({
  visible: !1
}), bp = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, Ep = Ee((t, e) => {
  var n;
  const r = V(null), i = ae(), a = q(bp, t), {
    locale: o
  } = ue(), l = [...o.Calendar.markItems];
  if (a.weekStartsOn === "Sunday") {
    const M = l.pop();
    M && l.unshift(M);
  }
  const [c, u] = ce({
    value: a.value === void 0 ? void 0 : tu(a.selectionMode, a.value),
    defaultValue: tu(a.selectionMode, a.defaultValue),
    onChange: (M) => {
      var S, $;
      a.selectionMode === "single" ? (S = a.onChange) === null || S === void 0 || S.call(a, M ? M[0] : null) : a.selectionMode === "range" && (($ = a.onChange) === null || $ === void 0 || $.call(a, M));
    }
  }), [f, d] = X(!1), [m, p] = X(() => ae(c ? c[0] : i).date(1)), b = (M) => {
    M && p(ae(M[0]).date(1)), u(M);
  }, y = a.title !== !1, g = it(Pd), h = yp(m, g.visible, r), [x, v] = X(m), [E, w] = X(() => m.add(6, "month"));
  Q(() => {
    if (c) {
      const [M, S] = c;
      !a.min && M && ae(M).isBefore(x) && v(ae(M).date(1)), !a.max && S && ae(S).isAfter(E) && w(ae(S).endOf("month"));
    }
  }, [c]);
  const C = de(() => a.max ? ae(a.max) : E, [a.max, E]), k = de(() => a.min ? ae(a.min) : x, [a.min, x]);
  ke(e, () => ({
    jumpTo: (M) => {
      let S;
      typeof M == "function" ? S = M({
        year: m.year(),
        month: m.month() + 1
      }) : S = M;
      const $ = np(S);
      p($), h($);
    },
    jumpToToday: () => {
      const M = ae().date(1);
      p(M), h(M);
    },
    getDateRange: () => c
  }));
  const O = s.createElement("div", {
    className: `${Re}-header`
  }, s.createElement("div", {
    className: `${Re}-title`
  }, (n = a.title) !== null && n !== void 0 ? n : o.Calendar.title));
  function P() {
    var M;
    const S = [];
    let $ = k;
    for (; $.isSameOrBefore(C, "month"); ) {
      const R = $.year(), F = $.month() + 1, N = {
        year: R,
        month: F
      }, T = `${R}-${F}`, A = a.weekStartsOn === "Monday" ? $.date(1).isoWeekday() - 1 : $.date(1).isoWeekday(), D = A == 7 ? null : Array(A).fill(null).map((B, H) => s.createElement("div", {
        key: H,
        className: `${Re}-cell`
      }));
      S.push(s.createElement("div", {
        key: T,
        "data-year-month": T
      }, s.createElement("div", {
        className: `${Re}-title`
      }, (M = o.Calendar.yearAndMonth) === null || M === void 0 ? void 0 : M.replace(/\${(.*?)}/g, (B, H) => {
        var Z;
        return (Z = N[H]) === null || Z === void 0 ? void 0 : Z.toString();
      })), s.createElement("div", {
        className: `${Re}-cells`
      }, D, Array($.daysInMonth()).fill(null).map((B, H) => {
        const Z = $.date(H + 1);
        let K = !1, Y = !1, re = !1, se = !1, ve = !1;
        if (c) {
          const [te, ie] = c;
          Y = Z.isSame(te, "day"), re = Z.isSame(ie, "day"), K = Y || re || Z.isAfter(te, "day") && Z.isBefore(ie, "day"), K && (se = (S.length % 7 === 0 || Z.isSame(Z.startOf("month"), "day")) && !Y, ve = (S.length % 7 === 6 || Z.isSame(Z.endOf("month"), "day")) && !re);
        }
        const U = a.shouldDisableDate ? a.shouldDisableDate(Z.toDate()) : C && Z.isAfter(C, "day") || k && Z.isBefore(k, "day"), ee = () => {
          var te;
          if (a.renderTop === !1)
            return null;
          const ie = (xe) => s.createElement("div", {
            className: `${Re}-cell-top`
          }, xe), fe = (te = a.renderTop) === null || te === void 0 ? void 0 : te.call(a, Z.toDate());
          if (fe)
            return ie(fe);
          if (a.selectionMode === "range") {
            if (Y)
              return ie(o.Calendar.start);
            if (re)
              return ie(o.Calendar.end);
          }
          return Z.isSame(i, "day") && !K ? ie(o.Calendar.today) : ie(null);
        }, J = () => {
          var te;
          return a.renderBottom === !1 ? null : s.createElement("div", {
            className: `${Re}-cell-bottom`
          }, (te = a.renderBottom) === null || te === void 0 ? void 0 : te.call(a, Z.toDate()));
        };
        return s.createElement("div", {
          key: Z.valueOf(),
          className: j(`${Re}-cell`, {
            [`${Re}-cell-today`]: Z.isSame(i, "day"),
            [`${Re}-cell-selected`]: K,
            [`${Re}-cell-selected-begin`]: Y,
            [`${Re}-cell-selected-end`]: re,
            [`${Re}-cell-selected-row-begin`]: se,
            [`${Re}-cell-selected-row-end`]: ve,
            [`${Re}-cell-disabled`]: !!U
          }),
          onClick: () => {
            if (!a.selectionMode || U)
              return;
            const te = Z.toDate();
            function ie() {
              if (!a.allowClear || !c)
                return !1;
              const [fe, xe] = c;
              return Z.isSame(fe, "date") && Z.isSame(xe, "day");
            }
            if (a.selectionMode === "single") {
              if (a.allowClear && ie()) {
                b(null);
                return;
              }
              b([te, te]);
            } else if (a.selectionMode === "range") {
              if (!c) {
                b([te, te]), d(!0);
                return;
              }
              if (ie()) {
                b(null), d(!1);
                return;
              }
              if (f) {
                const fe = c[0];
                b(fe > te ? [te, fe] : [fe, te]), d(!1);
              } else
                b([te, te]), d(!0);
            }
          }
        }, ee(), s.createElement("div", {
          className: `${Re}-cell-date`
        }, a.renderDate ? a.renderDate(Z.toDate()) : Z.date()), J());
      })))), $ = $.add(1, "month");
    }
    return S;
  }
  const _ = s.createElement("div", {
    className: `${Re}-body`,
    ref: r
  }, P()), L = s.createElement("div", {
    className: `${Re}-mark`
  }, l.map((M, S) => s.createElement("div", {
    key: S,
    className: `${Re}-mark-cell`
  }, M)));
  return W(a, s.createElement("div", {
    className: Re
  }, y && O, L, _));
}), Yi = "adm-divider", wp = {
  contentPosition: "center",
  direction: "horizontal"
}, ps = (t) => {
  const e = q(wp, t);
  return W(e, s.createElement("div", {
    className: j(Yi, `${Yi}-${e.direction}`, `${Yi}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Yi}-content`
  }, e.children)));
}, Gi = "adm-calendar-picker", Cp = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, my = Ee((t, e) => {
  const n = q(Cp, t), {
    locale: r
  } = ue(), i = e ?? V(null), {
    visible: a,
    confirmText: o,
    popupClassName: l,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: p,
    onMaskClick: b,
    getContainer: y
  } = n, g = un(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), h = s.useMemo(() => ({
    visible: !!a
  }), [a]), x = s.createElement("div", {
    className: `${Gi}-footer`
  }, s.createElement(ps, null), s.createElement("div", {
    className: `${Gi}-footer-bottom`
  }, s.createElement(qt, {
    color: "primary",
    onClick: () => {
      var v, E, w, C;
      const k = (E = (v = i.current) === null || v === void 0 ? void 0 : v.getDateRange()) !== null && E !== void 0 ? E : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, k ? k[0] : null) : n.selectionMode === "range" && ((C = n.onConfirm) === null || C === void 0 || C.call(n, k)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Gi
  }, s.createElement(Lr, {
    visible: a,
    className: j(`${Gi}-popup`, l),
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
      b == null || b(), d && (m == null || m());
    },
    getContainer: y
  }, s.createElement(Pd.Provider, {
    value: h
  }, s.createElement(Ep, Object.assign({
    ref: i
  }, g))), x)));
});
function Di(t, e) {
  const n = Yt(t);
  Ae(() => {
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
function Md(t, e, n) {
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
function kl(t, e, n) {
  const r = Yt(t);
  Q(() => Md(e.current, n, r), [e]);
}
function Ne(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const Ad = (t, e) => {
  const [{
    scrollLeft: n
  }, r] = Le(() => ({
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
    const c = o.children.item(e).children.item(0), u = c.offsetLeft, f = c.offsetWidth, d = o.offsetWidth, m = o.scrollWidth, p = o.scrollLeft;
    if (m - d <= 0)
      return;
    const y = Ne(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: y,
      from: {
        scrollLeft: p
      },
      immediate: a && !n.isAnimating
    });
  }
  return Ae(() => {
    i(!0);
  }, []), Li(() => {
    i();
  }, [e]), kl(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Xi = "adm-scroll-mask", Id = (t) => {
  const e = V(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Le(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: a
  } = Ka((o = !1) => {
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
  return Q(() => {
    a(!0);
  }, []), Q(() => {
    const o = t.scrollTrackRef.current;
    if (o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), s.createElement(s.Fragment, null, s.createElement(Ce.div, {
    ref: e,
    className: j(Xi, `${Xi}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(Ce.div, {
    className: j(Xi, `${Xi}-right`),
    style: {
      opacity: r
    }
  }));
};
function yn(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (a) => {
      Ci.isFragment(a) ? r(a.props.children) : (e(a, n), n += 1);
    });
  }
  r(t);
}
const Qt = "adm-capsule-tabs", xp = () => null, kp = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  yn(t.children, (d, m) => {
    if (!zn(d))
      return;
    const p = d.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const b = o.push(d);
    i[p] = b - 1;
  });
  const [l, c] = ce({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Ad(n, i[l]);
  return Di(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Qt,
    ref: r
  }, s.createElement("div", {
    className: `${Qt}-header`
  }, s.createElement(Id, {
    scrollTrackRef: n
  }), s.createElement(Ce.div, {
    className: `${Qt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${Qt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: j(`${Qt}-tab`, {
      [`${Qt}-tab-active`]: d.key === l,
      [`${Qt}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(Ir, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Qt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, hy = pe(kp, {
  Tab: xp
}), Jn = "adm-card", vy = (t) => {
  const e = () => t.title || t.extra ? s.createElement("div", {
    className: j(`${Jn}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, t.icon && s.createElement("div", {
    className: `${Jn}-header-icon`
  }, t.icon), s.createElement("div", {
    className: `${Jn}-header-title`
  }, t.title), t.extra && s.createElement("div", {
    className: `${Jn}-header-extra`
  }, t.extra)) : null, n = () => t.children ? s.createElement("div", {
    className: j(`${Jn}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return W(t, s.createElement("div", {
    className: Jn,
    onClick: t.onClick
  }, e(), n()));
};
function ou(t, e, n) {
  return t * e * n / (e + n * t);
}
function xi(t, e, n, r, i = 0.15) {
  return i === 0 ? Ne(t, e, n) : t < e ? -ou(e - t, r, i) + e : t > n ? +ou(t - n, r, i) + n : t;
}
var $p = typeof Element < "u", _p = typeof Map == "function", Sp = typeof Set == "function", Op = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function ya(t, e) {
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
        if (!ya(t[r], e[r]))
          return !1;
      return !0;
    }
    var a;
    if (_p && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!ya(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (Sp && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (Op && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if ($p && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !ya(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var Fp = function(e, n) {
  try {
    return ya(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const gs = /* @__PURE__ */ $t(Fp);
function Td(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const St = "adm-picker-view", Ld = ze((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(h) {
    t.onSelect(h, t.index);
  }
  const [{
    y: a
  }, o] = Le(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), l = V(!1), c = V(null), u = V(null), f = V(34);
  Ae(() => {
    const h = u.current;
    h && (f.current = Td(window.getComputedStyle(h).getPropertyValue("height")));
  }), Ae(() => {
    if (l.current || e === null)
      return;
    const h = n.findIndex((v) => v.value === e);
    if (h < 0)
      return;
    const x = h * -f.current;
    o.start({
      y: x,
      immediate: a.goal !== x
    });
  }, [e, n]), Ae(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((h) => h.value === e)) {
      const h = n[0];
      i(h.value);
    }
  }, [n, e]);
  function d(h) {
    const x = h * -f.current;
    o.start({
      y: x
    });
    const v = n[h];
    v && i(v.value);
  }
  const m = (h) => {
    const {
      direction: [, x],
      distance: [, v],
      velocity: [, E],
      offset: [, w],
      last: C
    } = h;
    return {
      direction: x,
      distance: v,
      velocity: E,
      offset: w,
      last: C
    };
  }, p = (h) => {
    l.current = !0;
    const x = -((n.length - 1) * f.current), v = 0, {
      direction: E,
      last: w,
      velocity: C,
      offset: k
    } = m(h);
    if (w) {
      l.current = !1;
      const O = k + C * E * 50, P = Ne(O, x, v), _ = -Math.round(P / f.current);
      d(_);
    } else {
      const O = k;
      o.start({
        y: xi(O, x, v, f.current * 50, 0.2)
      });
    }
  }, b = (h) => {
    l.current = !0;
    const x = -((n.length - 1) * f.current), v = 0, {
      direction: E,
      last: w,
      velocity: C,
      distance: k
    } = m(h), O = -E, P = a.get();
    if (w) {
      l.current = !1;
      const _ = C * O * 50, L = P + k * O + _, M = Ne(L, x, v), S = -Math.round(M / f.current);
      d(S);
    } else {
      const _ = P + k * O;
      o.start({
        y: xi(_, x, v, f.current * 50, 0.2)
      });
    }
  };
  Dt((h) => {
    h.event.stopPropagation(), p(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), E3((h) => {
    h.event.stopPropagation(), b(h);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Dn ? {
      passive: !1
    } : void 0
  });
  let y = null;
  function g() {
    if (y === null)
      return null;
    const h = n[y], x = y - 1, v = y + 1, E = n[x], w = n[v];
    return s.createElement("div", {
      className: `${St}-column-accessible`
    }, s.createElement("div", {
      className: `${St}-column-accessible-current`,
      role: "button",
      "aria-label": h ? `当前选择的是：${h.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${St}-column-accessible-button`,
      onClick: () => {
        E && d(x);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${St}-column-accessible-button`,
      onClick: () => {
        w && d(v);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择下一项：${w.label}` : "没有下一项"
    }, "-"));
  }
  return s.createElement("div", {
    className: `${St}-column`
  }, s.createElement("div", {
    className: `${St}-item-height-measure`,
    ref: u
  }), s.createElement(Ce.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${St}-column-wheel`,
    "aria-hidden": !0
  }, n.map((h, x) => {
    var v;
    const E = t.value === h.value;
    E && (y = x);
    function w() {
      l.current = !1, d(x);
    }
    return s.createElement("div", {
      key: (v = h.key) !== null && v !== void 0 ? v : h.value,
      "data-selected": E,
      className: j(`${St}-column-item`, {
        [`${St}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${St}-column-item-label`
    }, r(h)));
  })), g());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !gs(t.column, e.column)));
Ld.displayName = "Wheel";
function su(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Dd(t, e) {
  const n = su(() => (typeof t == "function" ? t(e) : t).map((o) => o.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = su(() => e.map((a, o) => {
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
function Vd(t, e) {
  return de(() => Dd(t, e), [t, e]);
}
const jd = (t) => t.label;
var Bd = { exports: {} }, Wd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xr = s;
function Np(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Rp = typeof Object.is == "function" ? Object.is : Np, Pp = xr.useState, Mp = xr.useEffect, Ap = xr.useLayoutEffect, Ip = xr.useDebugValue;
function Tp(t, e) {
  var n = e(), r = Pp({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return Ap(function() {
    i.value = n, i.getSnapshot = e, Lo(i) && a({ inst: i });
  }, [t, n, e]), Mp(function() {
    return Lo(i) && a({ inst: i }), t(function() {
      Lo(i) && a({ inst: i });
    });
  }, [t]), Ip(n), n;
}
function Lo(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Rp(t, n);
  } catch {
    return !0;
  }
}
function Lp(t, e) {
  return e();
}
var Dp = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Lp : Tp;
Wd.useSyncExternalStore = xr.useSyncExternalStore !== void 0 ? xr.useSyncExternalStore : Dp;
Bd.exports = Wd;
var Vp = Bd.exports;
let $l = !1;
const ys = /* @__PURE__ */ new Set();
function Zd() {
  ys.forEach((t) => {
    t();
  });
}
function py() {
  $l = !0, Zd(), vt.assign({
    skipAnimation: !0
  });
}
function gy() {
  $l = !1, Zd(), vt.assign({
    skipAnimation: !1
  });
}
function lu() {
  return $l;
}
function jp(t) {
  return ys.add(t), () => {
    ys.delete(t);
  };
}
function Bp() {
  return Vp.useSyncExternalStore(jp, lu, lu);
}
const Do = "adm-spin-loading", Wp = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, Zp = {
  color: "default"
}, Hp = 15 * 3.14159265358979 * 2, _l = ze((t) => {
  var e;
  const n = q(Zp, t), r = Bp(), {
    percent: i
  } = Le({
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
  return W(n, s.createElement(Ce.div, {
    className: Do,
    style: {
      "--color": (e = Wp[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${Do}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(Ce.circle, {
    className: `${Do}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: Hp,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), fr = "adm-picker-view", zp = {
  defaultValue: [],
  renderLabel: jd,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${fr}-loading-content`
  }, s.createElement(_l, null))
}, Co = ze((t) => {
  const e = q(zp, t), [n, r] = X(e.value === void 0 ? e.defaultValue : e.value);
  Q(() => {
    e.value !== void 0 && e.value !== n && r(e.value);
  }, [e.value]), Q(() => {
    if (e.value === n)
      return;
    const l = window.setTimeout(() => {
      e.value !== void 0 && e.value !== n && r(e.value);
    }, 1e3);
    return () => {
      window.clearTimeout(l);
    };
  }, [e.value, n]);
  const i = Vd(e.columns, n), a = i.columns;
  Xm(() => {
    var l;
    e.value !== n && ((l = e.onChange) === null || l === void 0 || l.call(e, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = Qe((l, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = l, f;
    });
  }, []);
  return W(e, s.createElement("div", {
    className: `${fr}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, a.map((l, c) => s.createElement(Ld, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: o,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${fr}-mask`
  }, s.createElement("div", {
    className: `${fr}-mask-top`
  }), s.createElement("div", {
    className: `${fr}-mask-middle`
  }), s.createElement("div", {
    className: `${fr}-mask-bottom`
  })))));
});
Co.displayName = "PickerView";
const Jt = "adm-picker", qp = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: jd,
  destroyOnClose: !1,
  forceRender: !1
}, Sl = ze(Ee((t, e) => {
  var n;
  const {
    locale: r
  } = ue(), i = q(qp, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [a, o] = ce({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var h;
      g === !1 && ((h = i.onClose) === null || h === void 0 || h.call(i));
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
  ke(e, () => l);
  const [c, u] = ce(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var h;
      const x = Dd(i.columns, g);
      (h = i.onConfirm) === null || h === void 0 || h.call(i, g, x);
    }
  })), f = Vd(i.columns, c), [d, m] = X(c);
  Q(() => {
    d !== c && m(c);
  }, [a]), Q(() => {
    a || m(c);
  }, [c]);
  const p = Yt((g, h) => {
    var x;
    m(g), a && ((x = i.onSelect) === null || x === void 0 || x.call(i, g, h));
  }), b = W(i, s.createElement("div", {
    className: Jt
  }, s.createElement("div", {
    className: `${Jt}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Jt}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${Jt}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: j(`${Jt}-header-button`, i.loading && `${Jt}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), s.createElement("div", {
    className: `${Jt}-body`
  }, s.createElement(Co, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: p
  })))), y = s.createElement(Lr, {
    style: i.popupStyle,
    className: j(`${Jt}-popup`, i.popupClassName),
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
  }, b, s.createElement(Dr, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, y, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
Sl.displayName = "Picker";
function Up(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(Sl, Object.assign({}, t, {
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
    }, r = Ti(s.createElement(n, null));
  });
}
const Hd = pe(Sl, {
  prompt: Up
});
function zd(t) {
  const e = de(() => {
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
const qd = Ee((t, e) => {
  const {
    options: n
  } = t, r = un(t, ["options"]), i = zd(n);
  return s.createElement(Hd, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function Kp(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(qd, Object.assign({}, t, {
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
    }, r = Ti(s.createElement(n, null));
  });
}
const yy = pe(qd, {
  prompt: Kp
}), by = (t) => {
  const {
    options: e
  } = t, n = un(t, ["options"]), r = zd(e);
  return s.createElement(Co, Object.assign({}, n, {
    columns: r
  }));
}, Ke = "adm-tabs", Yp = () => null, Gp = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, Xp = (t) => {
  var e;
  const n = q(Gp, t), r = V(null), i = V(null), a = {};
  let o = null;
  const l = [], c = n.direction === "rtl";
  yn(n.children, (w, C) => {
    if (!zn(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    C === 0 && (o = k);
    const O = l.push(w);
    a[k] = O - 1;
  });
  const [u, f] = ce({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (w) => {
      var C;
      w !== null && ((C = n.onChange) === null || C === void 0 || C.call(n, w));
    }
  }), [{
    x: d,
    width: m
  }, p] = Le(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: b
  }, y] = Le(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: g,
    rightMaskOpacity: h
  }, x] = Le(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function v(w = !1, C = !1) {
    const k = r.current;
    if (!k)
      return;
    const O = a[u];
    if (O === void 0) {
      p.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const P = i.current;
    if (!P)
      return;
    const _ = k.children.item(O + 1), L = _.children.item(0), M = L.offsetLeft, S = L.offsetWidth, $ = _.offsetLeft, R = _.offsetWidth, F = k.offsetWidth, N = k.scrollWidth, T = k.scrollLeft, A = P.offsetWidth;
    let D = 0, B = 0;
    if (n.activeLineMode === "auto" ? (D = M, B = S) : n.activeLineMode === "full" ? (D = $, B = R) : D = M + (S - A) / 2, c) {
      const K = ["auto", "full"].includes(n.activeLineMode) ? B : A;
      D = -(F - D - K);
    }
    p.start({
      x: D,
      width: B,
      immediate: w
    });
    const H = N - F;
    if (H <= 0)
      return;
    let Z = 0;
    c ? Z = -Ne(F / 2 - M + S / 2 - A, 0, H) : Z = Ne(M - (F - S) / 2, 0, H), (!C || n.autoScroll !== !1) && y.start({
      scrollLeft: Z,
      from: {
        scrollLeft: T
      },
      immediate: w
    });
  }
  Ae(() => {
    v(!d.isAnimating);
  }, []), Li(() => {
    v();
  }, [u, c, n.activeLineMode]), Di(() => {
    v(!d.isAnimating);
  }, r), kl(() => {
    v(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: E
  } = Ka((w = !1) => {
    const C = r.current;
    if (!C)
      return;
    const k = C.scrollLeft;
    let O = !1, P = !1;
    c ? (O = Math.round(-k) + C.offsetWidth < C.scrollWidth, P = k < 0) : (O = k > 0, P = k + C.offsetWidth < C.scrollWidth), x.start({
      leftMaskOpacity: O ? 1 : 0,
      rightMaskOpacity: P ? 1 : 0,
      immediate: w
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Ae(() => {
    E(!0);
  }, []), W(n, s.createElement("div", {
    className: Ke,
    style: {
      direction: n.direction
    }
  }, s.createElement("div", {
    className: `${Ke}-header`
  }, s.createElement(Ce.div, {
    className: j(`${Ke}-header-mask`, `${Ke}-header-mask-left`),
    style: {
      opacity: g
    }
  }), s.createElement(Ce.div, {
    className: j(`${Ke}-header-mask`, `${Ke}-header-mask-right`),
    style: {
      opacity: h
    }
  }), s.createElement(Ce.div, {
    className: `${Ke}-tab-list`,
    ref: r,
    scrollLeft: b,
    onScroll: E,
    role: "tablist"
  }, s.createElement(Ce.div, {
    ref: i,
    className: `${Ke}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), l.map((w) => W(w.props, s.createElement("div", {
    key: w.key,
    className: j(`${Ke}-tab-wrapper`, {
      [`${Ke}-tab-wrapper-stretch`]: n.stretch
    })
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: C
      } = w;
      w.props.disabled || C != null && f(C.toString());
    },
    className: j(`${Ke}-tab`, {
      [`${Ke}-tab-active`]: w.key === u,
      [`${Ke}-tab-disabled`]: w.props.disabled
    }),
    role: "tab",
    "aria-selected": w.key === u
  }, w.props.title)))))), l.map((w) => {
    if (w.props.children === void 0)
      return null;
    const C = w.key === u;
    return s.createElement(Ir, {
      key: w.key,
      active: C,
      forceRender: w.props.forceRender,
      destroyOnClose: w.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Ke}-content`,
      style: {
        display: C ? "block" : "none"
      }
    }, w.props.children));
  })));
}, cu = pe(Xp, {
  Tab: Yp
}), qr = "adm-list", Qp = {
  mode: "default"
}, Jp = Ee((t, e) => {
  const n = q(Qp, t), r = V(null);
  return ke(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: j(qr, `${qr}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${qr}-header`
  }, n.header), s.createElement("div", {
    className: `${qr}-body`
  }, s.createElement("div", {
    className: `${qr}-body-inner`
  }, n.children))));
});
function ln(t) {
  return t != null && t !== !1;
}
const jt = "adm-list-item", e4 = (t) => {
  var e, n;
  const {
    arrow: r,
    arrowIcon: i
  } = t, {
    list: a = {}
  } = ue(), o = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, l = (n = r ?? i) !== null && n !== void 0 ? n : o, c = gn(a.arrowIcon, r !== !0 ? r : null, i !== !0 ? i : null), u = s.createElement("div", {
    className: `${jt}-content`
  }, ln(t.prefix) && s.createElement("div", {
    className: `${jt}-content-prefix`
  }, t.prefix), s.createElement("div", {
    className: `${jt}-content-main`
  }, ln(t.title) && s.createElement("div", {
    className: `${jt}-title`
  }, t.title), t.children, ln(t.description) && s.createElement("div", {
    className: `${jt}-description`
  }, t.description)), ln(t.extra) && s.createElement("div", {
    className: `${jt}-content-extra`
  }, t.extra), l && s.createElement("div", {
    className: `${jt}-content-arrow`
  }, c || s.createElement(bv, null)));
  return W(t, s.createElement(o ? "a" : "div", {
    className: j(`${jt}`, o ? ["adm-plain-anchor"] : [], t.disabled && `${jt}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, u));
}, At = pe(Jp, {
  Item: e4
}), Ud = zs(null), t4 = "adm-check-list", n4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(Jf, null)
}, r4 = (t) => {
  const {
    checkList: e = {}
  } = ue(), n = q(n4, e, t), [r, i] = ce(n);
  function a(d) {
    n.multiple ? i([...r, d]) : i([d]);
  }
  function o(d) {
    i(r.filter((m) => m !== d));
  }
  const {
    activeIcon: l,
    extra: c,
    disabled: u,
    readOnly: f
  } = n;
  return s.createElement(Ud.Provider, {
    value: {
      value: r,
      check: a,
      uncheck: o,
      activeIcon: l,
      extra: c,
      disabled: u,
      readOnly: f
    }
  }, W(n, s.createElement(At, {
    mode: n.mode,
    className: t4
  }, n.children)));
}, Qi = "adm-check-list-item", i4 = (t) => {
  const e = it(Ud);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, a = e.extra ? e.extra(n) : i, o = s.createElement("div", {
    className: `${Qi}-extra`
  }, a);
  return W(t, s.createElement(At.Item, {
    title: t.title,
    className: j(Qi, r && `${Qi}-readonly`, n && `${Qi}-active`),
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
}, uu = pe(r4, {
  Item: i4
});
function a4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function fu(t, e) {
  e || (e = {});
  var n = e.vargs || a4(t), r = [], i = /* @__PURE__ */ new Map(), a, o, l = function(p) {
    return o = setTimeout(function() {
      if (a) {
        i.delete(p);
        return;
      }
      r.splice(p, 1);
    }, e.maxAge);
  }, c = e.maxAge > 0 && e.maxAge < 1 / 0 ? l : 0, u = e.equals ? e.equals : 0, f = e.maxArgs, d = e.serializer, m;
  return t.length === 1 && !e.equals && !n ? (m = function(p) {
    d && (p = d(p));
    var b;
    return i.get(p) || (!c || c(p), i.set(p, b = t.call(this, p)), b);
  }, a = 1) : u ? m = function() {
    for (var p = f || arguments.length, b = r.length, y = -1; ++y < b; )
      if (r[y].length === p) {
        for (var g = -1; ++g < p && u(arguments[g], r[y][g]); )
          ;
        if (g === p)
          return r[y].val;
      }
    return r[y] = arguments, !c || c(y), arguments.val = t.apply(this, r[y]);
  } : m = function() {
    for (var p = f || arguments.length, b = r.length, y = -1; ++y < b; )
      if (r[y].length === p) {
        for (var g = -1; ++g < p && arguments[g] === r[y][g]; )
          ;
        if (g === p)
          return r[y].val;
      }
    return r[y] = arguments, !c || c(y), arguments.val = t.apply(this, r[y]);
  }, m.clear = function() {
    o && clearTimeout(o), i.clear(), r = [];
  }, m.keys = function() {
    return a ? [
      ...i.keys()
    ] : r.slice();
  }, m.values = function() {
    return a ? [
      ...i.values()
    ] : r.map((p) => p.val);
  }, m;
}
function Kd(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = de(() => fu((l) => {
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
    equals: gs
  }), [t]), a = de(() => fu((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: gs
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
const Ol = [];
function o4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ki = "adm-skeleton", Fl = (t) => W(t, s.createElement("div", {
  className: j(ki, {
    [`${ki}-animated`]: t.animated
  })
})), s4 = (t) => W(t, s.createElement(Fl, {
  animated: t.animated,
  className: `${ki}-title`
})), l4 = {
  lineCount: 3
}, c4 = (t) => {
  const e = q(l4, t), n = o4(1, e.lineCount), r = s.createElement("div", {
    className: `${ki}-paragraph`
  }, n.map((i) => s.createElement(Fl, {
    key: i,
    animated: e.animated,
    className: `${ki}-paragraph-line`
  })));
  return W(e, r);
}, Ji = pe(Fl, {
  Title: s4,
  Paragraph: c4
}), Vi = (t = {}) => de(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = t;
  return [n, r, a, i];
}, [JSON.stringify(t)]), bt = "adm-cascader-view", u4 = {
  defaultValue: []
}, f4 = (t) => {
  const e = q(u4, t), {
    locale: n
  } = ue(), [r, i, a, o] = Vi(e.fieldNames), l = Kd(e.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = ce(Object.assign(Object.assign({}, e), {
    onChange: (g) => {
      var h;
      (h = e.onChange) === null || h === void 0 || h.call(e, g, l(g));
    }
  })), [f, d] = X(0), m = de(() => {
    const g = [];
    let h = e.options, x = !1;
    for (const v of c) {
      const E = h.find((w) => w[i] === v);
      if (g.push({
        selected: E,
        options: h
      }), !E || !E[a]) {
        x = !0;
        break;
      }
      h = E[a];
    }
    return x || g.push({
      selected: void 0,
      options: h
    }), g;
  }, [c, e.options]);
  Us(() => {
    var g;
    (g = e.onTabsChange) === null || g === void 0 || g.call(e, f);
  }, [f]), Q(() => {
    d(m.length - 1);
  }, [c]), Q(() => {
    const g = m.length - 1;
    f > g && d(g);
  }, [f, m]);
  const p = (g, h) => {
    const x = c.slice(0, h);
    g !== void 0 && (x[h] = g), u(x);
  }, b = (g) => e.loading || g === Ol, y = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: bt
  }, s.createElement(cu, {
    activeKey: f.toString(),
    onChange: (g) => {
      const h = parseInt(g);
      d(h);
    },
    stretch: !1,
    className: `${bt}-tabs`
  }, m.map((g, h) => {
    const x = g.selected;
    return s.createElement(cu.Tab, {
      key: h.toString(),
      title: s.createElement("div", {
        className: `${bt}-header-title`
      }, x ? x[r] : typeof y == "function" ? y(h) : y),
      forceRender: !0
    }, s.createElement("div", {
      className: `${bt}-content`
    }, b(g.options) ? s.createElement("div", {
      className: `${bt}-skeleton`
    }, s.createElement(Ji, {
      className: `${bt}-skeleton-line-1`,
      animated: !0
    }), s.createElement(Ji, {
      className: `${bt}-skeleton-line-2`,
      animated: !0
    }), s.createElement(Ji, {
      className: `${bt}-skeleton-line-3`,
      animated: !0
    }), s.createElement(Ji, {
      className: `${bt}-skeleton-line-4`,
      animated: !0
    })) : s.createElement(uu, {
      value: [c[h]],
      onChange: (v) => p(v[0], h),
      activeIcon: e.activeIcon
    }, g.options.map((v) => {
      const E = c[h] === v[i];
      return s.createElement(uu.Item, {
        value: v[i],
        key: v[i],
        disabled: v[o],
        className: j(`${bt}-item`, {
          [`${bt}-item-active`]: E
        })
      }, v[r]);
    }))));
  }))));
}, d4 = pe(f4, {
  optionSkeleton: Ol
}), er = "adm-cascader", m4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, Yd = Ee((t, e) => {
  var n;
  const {
    locale: r
  } = ue(), i = q(m4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [a, o] = ce({
    value: i.visible,
    defaultValue: !1,
    onChange: (h) => {
      var x;
      h === !1 && ((x = i.onClose) === null || x === void 0 || x.call(i));
    }
  }), l = {
    toggle: () => {
      o((h) => !h);
    },
    open: () => {
      o(!0);
    },
    close: () => {
      o(!1);
    }
  };
  ke(e, () => l);
  const [c, u] = ce(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var x;
      (x = i.onConfirm) === null || x === void 0 || x.call(i, h, m(h));
    }
  })), [, f, d] = Vi(i.fieldNames), m = Kd(i.options, {
    valueName: f,
    childrenName: d
  }), [p, b] = X(c);
  Q(() => {
    a || b(c);
  }, [a, c]);
  const y = W(i, s.createElement("div", {
    className: er
  }, s.createElement("div", {
    className: `${er}-header`
  }, s.createElement("a", {
    className: `${er}-header-button`,
    onClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${er}-header-title`
  }, i.title), s.createElement("a", {
    className: `${er}-header-button`,
    onClick: () => {
      u(p, !0), o(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${er}-body`
  }, s.createElement(d4, Object.assign({}, i, {
    value: p,
    onChange: (h, x) => {
      var v;
      b(h), a && ((v = i.onSelect) === null || v === void 0 || v.call(i, h, x));
    }
  }))))), g = s.createElement(Lr, {
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, y);
  return s.createElement(s.Fragment, null, g, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function h4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(Yd, Object.assign({}, t, {
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
    }, r = Ti(s.createElement(n, null));
  });
}
const Ey = pe(Yd, {
  prompt: h4,
  optionSkeleton: Ol
}), Ur = "adm-center-popup", v4 = Object.assign(Object.assign({}, vl), {
  getContainer: null
}), Gd = (t) => {
  const {
    popup: e = {}
  } = ue(), n = q(v4, e, t), r = Xs(), i = Le({
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
      r.current || (o(n.visible), n.visible ? (d = n.afterShow) === null || d === void 0 || d.call(n) : (m = n.afterClose) === null || m === void 0 || m.call(n));
    }
  }), [a, o] = X(n.visible);
  Ae(() => {
    n.visible && o(!0);
  }, [n.visible]);
  const l = V(null);
  Ya(l, n.disableBodyScroll && a);
  const c = td(a && n.visible), u = s.createElement("div", {
    className: j(`${Ur}-body`, n.bodyClassName),
    style: n.bodyStyle
  }, n.children), f = dn(n.stopPropagation, W(n, s.createElement("div", {
    className: Ur,
    style: {
      display: a ? void 0 : "none",
      pointerEvents: a ? void 0 : "none"
    }
  }, n.mask && s.createElement(Ai, {
    visible: c,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose,
    onMaskClick: (d) => {
      var m, p;
      (m = n.onMaskClick) === null || m === void 0 || m.call(n, d), n.closeOnMaskClick && ((p = n.onClose) === null || p === void 0 || p.call(n));
    },
    style: n.maskStyle,
    className: j(`${Ur}-mask`, n.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: n.stopPropagation
  }), s.createElement("div", {
    className: `${Ur}-wrap`,
    role: n.role,
    "aria-label": n["aria-label"]
  }, s.createElement(Ce.div, {
    style: Object.assign(Object.assign({}, i), {
      pointerEvents: i.opacity.to((d) => d === 1 ? "unset" : "none")
    }),
    ref: l
  }, n.showCloseButton && s.createElement("a", {
    className: j(`${Ur}-close`, "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = n.onClose) === null || d === void 0 || d.call(n);
    }
  }, n.closeIcon), u)))));
  return s.createElement(Ir, {
    active: a,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose
  }, Ar(n.getContainer, f));
}, Xd = zs(null), p4 = {
  disabled: !1,
  defaultValue: []
}, g4 = (t) => {
  const e = q(p4, t), [n, r] = ce(e);
  return s.createElement(
    Xd.Provider,
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
}, Qd = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), y4 = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), Jd = (t) => {
  const e = V(null), n = Yt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== t.checked && t.onChange(i);
  });
  return Q(() => {
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
}, en = "adm-checkbox", b4 = {
  defaultChecked: !1,
  indeterminate: !1
}, E4 = Ee((t, e) => {
  const n = it(Xd), r = q(b4, t);
  let [i, a] = ce({
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
  }, o = o || n.disabled), ke(e, () => ({
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
    className: `${en}-custom-icon`
  }, r.icon(i, r.indeterminate)) : s.createElement("div", {
    className: `${en}-icon`
  }, r.indeterminate ? s.createElement(y4, null) : i && s.createElement(Qd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: j(en, {
      [`${en}-checked`]: i && !r.indeterminate,
      [`${en}-indeterminate`]: r.indeterminate,
      [`${en}-disabled`]: o,
      [`${en}-block`]: r.block
    })
  }, s.createElement(Jd, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${en}-content`
  }, r.children)));
}), du = pe(E4, {
  Group: g4
}), Mn = "adm-collapse", w4 = () => null, C4 = (t) => {
  const {
    visible: e
  } = t, n = V(null), r = io(e, t.forceRender, t.destroyOnClose), [{
    height: i
  }, a] = Le(() => ({
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
  return Bm(() => {
    if (!e)
      return;
    const o = n.current;
    o && a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Li(() => {
    const o = n.current;
    if (o)
      if (e) {
        let l = 0, c = () => {
        };
        const u = () => {
          l += 1;
          const f = l;
          a.start({
            height: o.offsetHeight
          })[0].then(() => {
            f === l && c();
          });
        };
        return c = Md(o, {
          childList: !0,
          subtree: !0
        }, u), u(), c;
      } else
        a.start({
          height: o.offsetHeight,
          immediate: !0
        }), a.start({
          height: 0
        });
  }, [e]), s.createElement(Ce.div, {
    className: j(`${Mn}-panel-content`, {
      [`${Mn}-panel-content-active`]: e
    }),
    style: {
      height: i.to((o) => i.idle && e ? "auto" : o)
    }
  }, s.createElement("div", {
    className: `${Mn}-panel-content-inner`,
    ref: n
  }, s.createElement(At.Item, null, r && t.children)));
}, x4 = (t) => {
  const {
    collapse: e = {}
  } = ue(), n = q(e, t), r = [];
  yn(n.children, (c) => {
    !zn(c) || typeof c.key != "string" || r.push(c);
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
  }, [a, o] = ce(i()), l = a === null ? [] : Array.isArray(a) ? a : [a];
  return W(n, s.createElement("div", {
    className: Mn
  }, s.createElement(At, null, r.map((c) => {
    const u = c.key, f = l.includes(u);
    function d(b) {
      var y, g;
      n.accordion ? o(f ? [] : [u]) : o(f ? l.filter((h) => h !== u) : [...l, u]), (g = (y = c.props).onClick) === null || g === void 0 || g.call(y, b);
    }
    const m = gn(s.createElement(ed, null), n.arrow, n.arrowIcon, c.props.arrow, c.props.arrowIcon), p = typeof m == "function" ? m(f) : s.createElement("div", {
      className: j(`${Mn}-arrow`, {
        [`${Mn}-arrow-active`]: f
      })
    }, m);
    return s.createElement(s.Fragment, {
      key: u
    }, W(c.props, s.createElement(At.Item, {
      className: `${Mn}-panel-header`,
      onClick: d,
      disabled: c.props.disabled,
      arrowIcon: p
    }, c.props.title)), s.createElement(C4, {
      visible: f,
      forceRender: !!c.props.forceRender,
      destroyOnClose: !!c.props.destroyOnClose
    }, c.props.children));
  }))));
}, wy = pe(x4, {
  Panel: w4
});
var e1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(e1);
var k4 = e1.exports;
const t1 = /* @__PURE__ */ $t(k4);
var n1 = { exports: {} };
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
})(n1);
var $4 = n1.exports;
const r1 = /* @__PURE__ */ $t($4), kr = "TILL_NOW";
ae.extend(co);
ae.extend(t1);
ae.extend(r1);
const tn = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function _4(t, e, n, r, i, a, o) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), p = e.getSeconds(), b = n.getFullYear(), y = n.getMonth() + 1, g = n.getDate(), h = n.getHours(), x = n.getMinutes(), v = n.getSeconds(), E = tn[r], w = parseInt(t[0]), C = ae(bs([t[0], t[1], "1"])), k = parseInt(t[1]), O = parseInt(t[2]), P = parseInt(t[3]), _ = parseInt(t[4]), L = w === c, M = w === b, S = L && k === u, $ = M && k === y, R = S && O === f, F = $ && O === g, N = R && P === d, T = F && P === h, A = N && _ === m, D = T && _ === x, B = (H, Z, K) => {
    let Y = [];
    for (let ve = H; ve <= Z; ve++)
      Y.push(ve);
    const re = t.slice(0, tn[K]), se = a == null ? void 0 : a[K];
    return se && typeof se == "function" && (Y = Y.filter((ve) => se(ve, {
      get date() {
        const U = [...re, ve.toString()];
        return bs(U);
      }
    }))), Y;
  };
  if (E >= tn.year) {
    const K = B(c, b, "year");
    l.push(K.map((Y) => ({
      label: i("year", Y),
      value: Y.toString()
    })));
  }
  if (E >= tn.month) {
    const K = B(L ? u : 1, M ? y : 12, "month");
    l.push(K.map((Y) => ({
      label: i("month", Y),
      value: Y.toString()
    })));
  }
  if (E >= tn.day) {
    const H = S ? f : 1, Z = $ ? g : C.daysInMonth(), K = B(H, Z, "day");
    l.push(K.map((Y) => ({
      label: i("day", Y),
      value: Y.toString()
    })));
  }
  if (E >= tn.hour) {
    const K = B(R ? d : 0, F ? h : 23, "hour");
    l.push(K.map((Y) => ({
      label: i("hour", Y),
      value: Y.toString()
    })));
  }
  if (E >= tn.minute) {
    const K = B(N ? m : 0, T ? x : 59, "minute");
    l.push(K.map((Y) => ({
      label: i("minute", Y),
      value: Y.toString()
    })));
  }
  if (E >= tn.second) {
    const K = B(A ? p : 0, D ? v : 59, "second");
    l.push(K.map((Y) => ({
      label: i("second", Y),
      value: Y.toString()
    })));
  }
  if (o && (l[0].push({
    label: i("now", null),
    value: kr
  }), kr === (t == null ? void 0 : t[0])))
    for (let H = 1; H < l.length; H += 1)
      l[H] = [];
  return l;
}
function S4(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function bs(t) {
  var e, n, r, i, a, o;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (a = t[4]) !== null && a !== void 0 ? a : "0", m = (o = t[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
var i1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    var n = "month", r = "quarter";
    return function(i, a) {
      var o = a.prototype;
      o.quarter = function(u) {
        return this.$utils().u(u) ? Math.ceil((this.month() + 1) / 3) : this.month(this.month() % 3 + 3 * (u - 1));
      };
      var l = o.add;
      o.add = function(u, f) {
        return u = Number(u), this.$utils().p(f) === r ? this.add(3 * u, n) : l.bind(this)(u, f);
      };
      var c = o.startOf;
      o.startOf = function(u, f) {
        var d = this.$utils(), m = !!d.u(f) || f;
        if (d.p(u) === r) {
          var p = this.quarter() - 1;
          return m ? this.month(3 * p).startOf(n).startOf("day") : this.month(3 * p + 2).endOf(n).endOf("day");
        }
        return c.bind(this)(u, f);
      };
    };
  });
})(i1);
var O4 = i1.exports;
const F4 = /* @__PURE__ */ $t(O4);
ae.extend(F4);
const ea = {
  year: 0,
  quarter: 1
};
function N4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = ea[r], f = parseInt(t[0]), d = f === l, m = f === c, p = ae(e), b = ae(n), y = p.quarter(), g = b.quarter(), h = (x, v, E) => {
    let w = [];
    for (let O = x; O <= v; O++)
      w.push(O);
    const C = t.slice(0, ea[E]), k = a == null ? void 0 : a[E];
    return k && typeof k == "function" && (w = w.filter((O) => k(O, {
      get date() {
        const P = [...C, O.toString()];
        return a1(P);
      }
    }))), w;
  };
  if (u >= ea.year) {
    const E = h(l, c, "year");
    o.push(E.map((w) => ({
      label: i("year", w),
      value: w.toString()
    })));
  }
  if (u >= ea.quarter) {
    const E = h(d ? y : 1, m ? g : 4, "quarter");
    o.push(E.map((w) => ({
      label: i("quarter", w),
      value: w.toString()
    })));
  }
  return o;
}
function R4(t) {
  if (!t)
    return [];
  const e = ae(t);
  return [e.year().toString(), e.quarter().toString()];
}
function a1(t) {
  var e, n;
  const r = (e = t[0]) !== null && e !== void 0 ? e : "1900", i = (n = t[1]) !== null && n !== void 0 ? n : "1";
  return ae().year(parseInt(r)).quarter(parseInt(i)).hour(0).minute(0).second(0).toDate();
}
ae.extend(co);
ae.extend(t1);
ae.extend(r1);
const Kr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function P4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = Kr[r], f = parseInt(t[0]), d = f === l, m = f === c, p = ae(e), b = ae(n), y = p.isoWeek(), g = b.isoWeek(), h = p.isoWeekday(), x = b.isoWeekday(), v = parseInt(t[1]), E = d && v === y, w = m && v === g, C = ae(`${f}-01-01`).isoWeeksInYear(), k = (O, P, _) => {
    let L = [];
    for (let $ = O; $ <= P; $++)
      L.push($);
    const M = t.slice(0, Kr[_]), S = a == null ? void 0 : a[_];
    return S && typeof S == "function" && (L = L.filter(($) => S($, {
      get date() {
        const R = [...M, $.toString()];
        return o1(R);
      }
    }))), L;
  };
  if (u >= Kr.year) {
    const _ = k(l, c, "year");
    o.push(_.map((L) => ({
      label: i("year", L),
      value: L.toString()
    })));
  }
  if (u >= Kr.week) {
    const _ = k(d ? y : 1, m ? g : C, "week");
    o.push(_.map((L) => ({
      label: i("week", L),
      value: L.toString()
    })));
  }
  if (u >= Kr["week-day"]) {
    const _ = k(E ? h : 1, w ? x : 7, "week-day");
    o.push(_.map((L) => ({
      label: i("week-day", L),
      value: L.toString()
    })));
  }
  return o;
}
function M4(t) {
  if (!t)
    return [];
  const e = ae(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function o1(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", a = (n = t[1]) !== null && n !== void 0 ? n : "1", o = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return ae(`${parseInt(i)}-01-01`).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const A4 = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, s1 = (t, e) => {
  if (e.includes("week"))
    return M4(t);
  if (e.includes("quarter"))
    return R4(t);
  {
    const n = e;
    return S4(t).slice(0, A4[n]);
  }
}, Es = (t, e) => {
  if ((t == null ? void 0 : t[0]) === kr) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? o1(t) : e.includes("quarter") ? a1(t) : bs(t);
}, l1 = (t, e, n, r, i, a, o) => r.startsWith("week") ? P4(t, e, n, r, i, a) : r.startsWith("quarter") ? N4(t, e, n, r, i, a) : _4(t, e, n, r, i, a, o);
function c1(t) {
  const {
    locale: e
  } = ue();
  return Qe((n, r) => {
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
const mu = (/* @__PURE__ */ new Date()).getFullYear(), I4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(mu - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(mu + 10)),
  precision: "day",
  defaultValue: null
}, u1 = Ee((t, e) => {
  const n = q(I4, t), {
    renderLabel: r
  } = n, [i, a] = ce({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var p;
      m !== null && ((p = n.onConfirm) === null || p === void 0 || p.call(n, m));
    }
  }), o = de(() => /* @__PURE__ */ new Date(), []), l = c1(r), c = de(() => {
    let m = i ?? o;
    return m.tillNow ? [kr] : (m = new Date(Ne(m.getTime(), n.min.getTime(), n.max.getTime())), s1(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Qe((m) => {
    const p = Es(m, n.precision);
    a(p, !0);
  }, [a, n.precision]), f = Yt((m) => {
    var p;
    const b = Es(m, n.precision);
    (p = n.onSelect) === null || p === void 0 || p.call(n, b);
  }), d = Qe((m) => l1(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return W(n, s.createElement(Hd, {
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
  }, (m, p) => {
    var b;
    return (b = n.children) === null || b === void 0 ? void 0 : b.call(n, i, p);
  }));
});
function T4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(u1, Object.assign({}, t, {
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
    }, r = Ti(s.createElement(n, null));
  });
}
const Cy = pe(u1, {
  prompt: T4,
  DATE_NOW: kr
}), hu = (/* @__PURE__ */ new Date()).getFullYear(), L4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(hu - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(hu + 10)),
  precision: "day"
}, xy = (t) => {
  var e;
  const n = q(L4, t), {
    renderLabel: r
  } = n, [i, a] = ce({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), o = c1(r), l = de(() => i != null && i.tillNow ? [kr, null, null] : s1(i, n.precision), [i, n.precision]), c = Qe((u) => {
    var f;
    const d = Es(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Co, {
    columns: (u) => l1(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, D4 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(qt, {
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
}, V4 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, f1 = (t) => {
  const e = q(V4, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Ot("image-container")
  }, s.createElement(lo, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Ot("header")
  }, s.createElement(wi, null, e.header)), !!e.title && s.createElement("div", {
    className: Ot("title")
  }, e.title), s.createElement("div", {
    className: j(Ot("content"), !e.content && Ot("content-empty"))
  }, typeof e.content == "string" ? s.createElement(wi, null, e.content) : e.content), s.createElement("div", {
    className: Ot("footer")
  }, e.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: Ot("action-row"),
      key: i
    }, a.map((o, l) => s.createElement(D4, {
      key: o.key,
      action: o,
      onAction: () => Pe(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, o, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(Gd, {
    className: j(Ot(), e.className),
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
    bodyClassName: j(Ot("body"), e.image && Ot("with-image"), e.bodyClassName),
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
function Ot(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const ws = /* @__PURE__ */ new Set();
function Nl(t) {
  const e = Bn(s.createElement(f1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      ws.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return ws.add(e.close), e;
}
function j4(t) {
  const e = {
    confirmText: Fi().locale.Dialog.ok
  }, n = q(e, t);
  return new Promise((r) => {
    Nl(Object.assign(Object.assign({}, n), {
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
const B4 = {
  confirmText: "确认",
  cancelText: "取消"
};
function W4(t) {
  const {
    locale: e
  } = Fi(), n = q(B4, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Nl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Pe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Pe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function Z4() {
  ws.forEach((t) => {
    t();
  });
}
const ky = pe(f1, {
  show: Nl,
  alert: j4,
  confirm: W4,
  clear: Z4
}), d1 = s.createContext(null), zt = "adm-dropdown-item", H4 = (t) => {
  const {
    dropdown: e = {}
  } = ue(), n = q(e, t), {
    active: r,
    highlight: i,
    onClick: a,
    title: o
  } = n, l = j(zt, {
    [`${zt}-active`]: r,
    [`${zt}-highlight`]: i ?? r
  }), c = s.useContext(d1), u = gn(s.createElement(mv, null), c, n.arrow, n.arrowIcon);
  return W(t, s.createElement("div", {
    className: l,
    onClick: a
  }, s.createElement("div", {
    className: `${zt}-title`
  }, s.createElement("span", {
    className: `${zt}-title-text`
  }, o), s.createElement("span", {
    className: j(`${zt}-title-arrow`, {
      [`${zt}-title-arrow-active`]: r
    })
  }, u))));
}, z4 = H4, q4 = (t) => {
  const {
    active: e = !1
  } = t, n = io(e, t.forceRender, t.destroyOnClose), r = j(`${zt}-content`, {
    [`${zt}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, tr = "adm-dropdown", U4 = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: vl.getContainer
}, K4 = Ee((t, e) => {
  const {
    dropdown: n = {}
  } = ue(), r = q(U4, n, t), i = gn(n.arrowIcon, t.arrow, t.arrowIcon), [a, o] = ce({
    value: r.activeKey,
    defaultValue: r.defaultActiveKey,
    onChange: r.onChange
  }), l = V(null), c = V(null);
  mf(() => {
    r.closeOnClickAway && o(null);
  }, [l, c]);
  const [u, f] = X(), d = V(null);
  Q(() => {
    const g = d.current;
    if (g && a) {
      const h = g.getBoundingClientRect();
      f(h.bottom);
    }
  }, [a]);
  const m = (g) => {
    o(a === g ? null : g);
  };
  let p = !1;
  const b = [], y = s.Children.map(r.children, (g) => {
    if (zn(g)) {
      const h = Object.assign(Object.assign({}, g.props), {
        onClick: (x) => {
          var v, E;
          m(g.key), (E = (v = g.props).onClick) === null || E === void 0 || E.call(v, x);
        },
        active: g.key === a
      });
      return b.push(g), g.props.forceRender && (p = !0), w0(g, h);
    } else
      return g;
  });
  return ke(e, () => ({
    close: () => {
      o(null);
    }
  }), [o]), W(r, s.createElement("div", {
    className: j(tr, {
      [`${tr}-open`]: !!a
    }),
    ref: d
  }, s.createElement(d1.Provider, {
    value: i
  }, s.createElement("div", {
    className: `${tr}-nav`,
    ref: l
  }, y)), s.createElement(Lr, {
    visible: !!a,
    position: "top",
    getContainer: r.getContainer,
    className: `${tr}-popup`,
    maskClassName: `${tr}-popup-mask`,
    bodyClassName: `${tr}-popup-body`,
    style: {
      top: u
    },
    forceRender: p,
    onMaskClick: r.closeOnMaskClick ? () => {
      m(null);
    } : void 0
  }, s.createElement("div", {
    ref: c
  }, b.map((g) => {
    const h = g.key === a;
    return s.createElement(q4, {
      key: g.key,
      active: h,
      forceRender: g.props.forceRender,
      destroyOnClose: g.props.destroyOnClose
    }, g.props.children);
  })))));
}), Y4 = K4, $y = pe(Y4, {
  Item: z4
});
var vu;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(vu || (vu = {}));
const G4 = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var pu;
function ba(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += X4(n + r, t), ig(t[n + r]) && r++, tg(t[n + r]) && r++, ng(t[n + r]) && r++, ag(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function X4(t, e) {
  const n = e[t];
  if (!Q4(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return gu(r) && gu(i) ? 4 : J4(r) && rg(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : eg(i) ? 4 : 2;
}
function Q4(t) {
  return t && qn(t[0].charCodeAt(0), 55296, 56319);
}
function gu(t) {
  return qn(Rl(t), 127462, 127487);
}
function J4(t) {
  return qn(Rl(t), 127988, 127988);
}
function eg(t) {
  return qn(Rl(t), 127995, 127999);
}
function tg(t) {
  return typeof t == "string" && qn(t.charCodeAt(0), 65024, 65039);
}
function ng(t) {
  return typeof t == "string" && qn(t.charCodeAt(0), 8400, 8447);
}
function rg(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && qn(e, 917504, 917631);
}
function ig(t) {
  return typeof t == "string" && G4.includes(t.charCodeAt(0));
}
function ag(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function Rl(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function qn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(pu || (pu = {}));
const ta = "...", Vo = {
  visibility: "hidden",
  whiteSpace: "inherit",
  lineHeight: "inherit",
  fontSize: "inherit"
};
function og(t, e, n, r, i, a, o) {
  const l = s.useMemo(() => ba(e), [e]), [c, u] = s.useState(0), [f, d] = s.useState([0, 0]), m = Math.ceil((f[0] + f[1]) / 2), [p, b] = s.useState(
    100
    /* STABLE_NO_ELLIPSIS */
  ), y = s.useRef(null), g = s.useRef(null), h = s.useRef(null), x = Ta(() => {
    tf(() => {
      b(
        1
        /* PREPARE */
      ), d([0, r === "middle" ? Math.ceil(l.length / 2) : l.length]);
    });
  });
  s.useLayoutEffect(() => {
    x();
  }, [l, n]), s.useLayoutEffect(() => {
    var C, k;
    if (p === 1) {
      const O = ((C = g.current) === null || C === void 0 ? void 0 : C.offsetHeight) || 0, _ = (((k = y.current) === null || k === void 0 ? void 0 : k.offsetHeight) || 0) * (n + 0.5);
      O <= _ ? b(
        100
        /* STABLE_NO_ELLIPSIS */
      ) : (u(_), b(
        2
        /* MEASURE_WALKING */
      ));
    }
  }, [p]), s.useLayoutEffect(() => {
    var C;
    if (p === 2) {
      const k = f[1] - f[0], O = ((C = h.current) === null || C === void 0 ? void 0 : C.offsetHeight) || 0;
      k > 1 ? O > c ? d([f[0], m]) : d([m, f[1]]) : (O > c ? d([f[0], f[0]]) : d([f[1], f[1]]), b(
        99
        /* STABLE_ELLIPSIS */
      ));
    }
  }, [p, f]);
  const v = (C) => {
    const k = l.slice(0, C), O = l.slice(l.length - C);
    return s.createElement(s.Fragment, null, r === "start" && s.createElement(s.Fragment, null, a, ta), r !== "start" && k.join(""), r === "middle" && s.createElement(s.Fragment, null, ta, a, ta), r !== "end" && O.join(""), r === "end" && s.createElement(s.Fragment, null, ta, a));
  }, E = s.useMemo(() => i || p === 100 ? s.createElement(s.Fragment, {
    key: "display"
  }, e, p === 99 && o) : p === 99 ? v(m) : null, [i, p, e, o, m]);
  return [s.createElement(s.Fragment, null, p === 1 && s.createElement("div", {
    key: "full",
    "aria-hidden": !0,
    ref: g,
    style: Vo
  }, e, a), p === 1 && s.createElement("div", {
    key: "stable",
    "aria-hidden": !0,
    ref: y,
    style: Vo
  }, " "), p === 2 && s.createElement("div", {
    key: "walking-mid",
    "aria-hidden": !0,
    ref: h,
    style: Vo
  }, v(m)), E), x];
}
const sg = "adm-ellipsis", lg = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, _y = (t) => {
  const e = q(lg, t), {
    content: n,
    direction: r,
    rows: i,
    expandText: a,
    collapseText: o,
    stopPropagationForActionButtons: l,
    onContentClick: c,
    defaultExpanded: u
  } = e, f = s.useRef(null), [d, m] = s.useState(u), p = a ? dn(l, s.createElement("a", {
    onClick: () => {
      m(!0);
    }
  }, a)) : null, b = o ? dn(l, s.createElement("a", {
    onClick: () => {
      m(!1);
    }
  }, o)) : null, [y, g] = og(f, n, i, r, d, p, b);
  return Di(g, f), W(e, s.createElement("div", {
    ref: f,
    className: sg,
    onClick: (h) => {
      h.target === h.currentTarget && c(h);
    }
  }, y));
}, cg = (t) => W(t, s.createElement("svg", {
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
}))))), Yr = "adm-empty", Sy = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(cg, {
      className: `${Yr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Yr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, s.createElement("div", {
    className: Yr
  }, s.createElement("div", {
    className: `${Yr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: j(`${Yr}-description`)
  }, t.description)));
}, bn = "adm-error-block", ug = {
  status: "default"
};
function fg(t) {
  return (n) => {
    var r;
    const i = q(ug, n), {
      locale: a
    } = ue(), o = a.ErrorBlock[i.status], l = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, s.createElement("div", {
      className: j(bn, {
        [`${bn}-full-page`]: i.fullPage
      })
    }, s.createElement("div", {
      className: `${bn}-image`
    }, f), s.createElement("div", {
      className: `${bn}-description`
    }, ![void 0, null].includes(c) && s.createElement("div", {
      className: `${bn}-description-title`
    }, c), ![void 0, null].includes(l) && s.createElement("div", {
      className: `${bn}-description-subtitle`
    }, l)), i.children && s.createElement("div", {
      className: `${bn}-content`
    }, i.children)));
  };
}
const dg = s.createElement("svg", {
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
}))), mg = s.createElement("svg", {
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
})))), hg = s.createElement("svg", {
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
})))), vg = s.createElement("svg", {
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
})))), pg = {
  default: dg,
  disconnected: mg,
  empty: hg,
  busy: vg
}, Oy = fg(pg), na = "adm-floating-bubble", gg = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, Fy = (t) => {
  const e = q(gg, t), n = V(null), r = V(null), [i, a] = X(e.offset === void 0 ? e.defaultOffset : e.offset);
  Q(() => {
    e.offset !== void 0 && u.start({
      x: e.offset.x,
      y: e.offset.y
    });
  }, [e.offset]);
  const [{
    x: o,
    y: l,
    opacity: c
  }, u] = Le(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = Dt((d) => {
    var m;
    let p = d.offset[0], b = d.offset[1];
    if (d.last && e.magnetic) {
      const g = n.current, h = r.current;
      if (!g || !h)
        return;
      const x = g.getBoundingClientRect(), v = h.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = o.goal - o.get(), w = v.left + E - x.left, C = x.right - (v.right + E);
        C <= w ? p += C : p -= w;
      } else if (e.magnetic === "y") {
        const E = l.goal - l.get(), w = v.top + E - x.top, C = x.bottom - (v.bottom + E);
        C <= w ? b += C : b -= w;
      }
    }
    const y = {
      x: p,
      y: b
    };
    e.offset === void 0 ? u.start(y) : a(y), (m = e.onOffsetChange) === null || m === void 0 || m.call(e, y), u.start({
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
    className: na
  }, s.createElement("div", {
    className: `${na}-boundary-outer`
  }, s.createElement("div", {
    className: `${na}-boundary`,
    ref: n
  })), s.createElement(Ce.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: H2([o, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${na}-button`,
    ref: r
  }), e.children)));
};
function Pl(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const nr = "adm-floating-panel", yg = {
  handleDraggingOfContent: !0
}, Ny = Ee((t, e) => {
  var n, r;
  const i = q(yg, t), {
    anchors: a,
    placement: o = "bottom"
  } = i, l = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, c = o !== "top", u = c ? a.map((w) => -w) : a, f = V(null), d = V(null), m = V(null), [p, b] = X(!1), y = V(!1), g = {
    top: Math.min(...u),
    bottom: Math.max(...u)
  }, h = Yt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: x
  }, v] = Le(() => ({
    y: c ? g.bottom : g.top,
    config: {
      tension: 300
    },
    onChange: (w) => {
      h(-w.value.y, x.isAnimating);
    }
  }));
  Dt((w) => {
    const [, C] = w.offset;
    if (w.first) {
      const P = w.event.target, _ = d.current;
      if (_ === P || _ != null && _.contains(P))
        y.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const L = x.goal <= g.top, M = m.current;
        if (!M)
          return;
        L ? M.scrollTop <= 0 && w.direction[1] > 0 && (y.current = !0) : y.current = !0;
      }
    }
    if (b(y.current), !y.current)
      return;
    const {
      event: k
    } = w;
    k.cancelable && Dn && k.preventDefault(), k.stopPropagation();
    let O = C;
    w.last && (y.current = !1, b(!1), O = Pl(u, C)), v.start({
      y: O
    });
  }, {
    axis: "y",
    bounds: g,
    rubberband: !0,
    from: () => [0, x.get()],
    pointer: {
      touch: !0
    },
    target: f,
    eventOptions: Dn ? {
      passive: !1
    } : void 0
  }), ke(e, () => ({
    setHeight: (w, C) => {
      v.start({
        y: -w,
        immediate: C == null ? void 0 : C.immediate
      });
    }
  }), [v]), Ya(f, !0);
  const E = s.createElement("div", {
    className: `${nr}-header`,
    ref: d
  }, s.createElement("div", {
    className: `${nr}-bar`
  }));
  return W(i, s.createElement(Ce.div, {
    ref: f,
    className: j(nr, `${nr}-${o}`),
    style: {
      height: Math.round(l),
      translateY: x.to((w) => c ? `calc(100% + (${Math.round(w)}px))` : o === "top" ? `calc(-100% + (${Math.round(w)}px))` : w)
    }
  }, s.createElement("div", {
    className: `${nr}-mask`,
    style: {
      display: p ? "block" : "none"
    }
  }), c && E, s.createElement("div", {
    className: `${nr}-content`,
    ref: m
  }, i.children), o === "top" && E));
});
function Wn() {
  return Wn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Wn.apply(this, arguments);
}
function bg(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function $r(t, e) {
  if (t == null)
    return {};
  var n = bg(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function Un(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function yu(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, Od(r.key), r);
  }
}
function Kn(t, e, n) {
  return e && yu(t.prototype, e), n && yu(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function La(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Cs(t, e) {
  return Cs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Cs(t, e);
}
function Ml(t, e) {
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
  }), e && Cs(t, e);
}
function Da(t) {
  return Da = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Da(t);
}
function Eg() {
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
function wg(t, e) {
  if (e && (_e(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return La(t);
}
function Al(t) {
  var e = Eg();
  return function() {
    var r = Da(t), i;
    if (e) {
      var a = Da(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return wg(this, i);
  };
}
function xs(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(xs(r)) : Ci.isFragment(r) && r.props ? n = n.concat(xs(r.props.children, e)) : n.push(r));
  }), n;
}
function Cg(t, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = /* @__PURE__ */ new Set();
  function i(a, o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, c = r.has(a);
    if (ht(!c, "Warning: There may be circular references"), c)
      return !1;
    if (a === o)
      return !0;
    if (n && l > 1)
      return !1;
    r.add(a);
    var u = l + 1;
    if (Array.isArray(a)) {
      if (!Array.isArray(o) || a.length !== o.length)
        return !1;
      for (var f = 0; f < a.length; f++)
        if (!i(a[f], o[f], u))
          return !1;
      return !0;
    }
    if (a && o && _e(a) === "object" && _e(o) === "object") {
      var d = Object.keys(a);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(m) {
        return i(a[m], o[m], u);
      });
    }
    return !1;
  }
  return i(t, e);
}
var An = "RC_FORM_INTERNAL_HOOKS", ye = function() {
  ht(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Zn = /* @__PURE__ */ I.createContext({
  getFieldValue: ye,
  getFieldsValue: ye,
  getFieldError: ye,
  getFieldWarning: ye,
  getFieldsError: ye,
  isFieldsTouched: ye,
  isFieldTouched: ye,
  isFieldValidating: ye,
  isFieldsValidating: ye,
  resetFields: ye,
  setFields: ye,
  setFieldValue: ye,
  setFieldsValue: ye,
  validateFields: ye,
  submit: ye,
  getInternalHooks: function() {
    return ye(), {
      dispatch: ye,
      initEntityValue: ye,
      registerField: ye,
      useSubscribe: ye,
      setInitialValues: ye,
      destroyForm: ye,
      setCallbacks: ye,
      registerWatch: ye,
      getFields: ye,
      setValidateMessages: ye,
      setPreserve: ye,
      getInitialValue: ye
    };
  }
}), Va = /* @__PURE__ */ I.createContext(null);
function ks(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function xg(t) {
  return t && !!t._init;
}
function Ut() {
  Ut = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(F, N, T) {
    F[N] = T.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(F, N, T) {
    return Object.defineProperty(F, N, {
      value: T,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), F[N];
  }
  try {
    u({}, "");
  } catch {
    u = function(T, A, D) {
      return T[A] = D;
    };
  }
  function f(F, N, T, A) {
    var D = N && N.prototype instanceof h ? N : h, B = Object.create(D.prototype), H = new $(A || []);
    return i(B, "_invoke", {
      value: _(F, T, H)
    }), B;
  }
  function d(F, N, T) {
    try {
      return {
        type: "normal",
        arg: F.call(N, T)
      };
    } catch (A) {
      return {
        type: "throw",
        arg: A
      };
    }
  }
  e.wrap = f;
  var m = "suspendedStart", p = "suspendedYield", b = "executing", y = "completed", g = {};
  function h() {
  }
  function x() {
  }
  function v() {
  }
  var E = {};
  u(E, o, function() {
    return this;
  });
  var w = Object.getPrototypeOf, C = w && w(w(R([])));
  C && C !== n && r.call(C, o) && (E = C);
  var k = v.prototype = h.prototype = Object.create(E);
  function O(F) {
    ["next", "throw", "return"].forEach(function(N) {
      u(F, N, function(T) {
        return this._invoke(N, T);
      });
    });
  }
  function P(F, N) {
    function T(D, B, H, Z) {
      var K = d(F[D], F, B);
      if (K.type !== "throw") {
        var Y = K.arg, re = Y.value;
        return re && _e(re) == "object" && r.call(re, "__await") ? N.resolve(re.__await).then(function(se) {
          T("next", se, H, Z);
        }, function(se) {
          T("throw", se, H, Z);
        }) : N.resolve(re).then(function(se) {
          Y.value = se, H(Y);
        }, function(se) {
          return T("throw", se, H, Z);
        });
      }
      Z(K.arg);
    }
    var A;
    i(this, "_invoke", {
      value: function(B, H) {
        function Z() {
          return new N(function(K, Y) {
            T(B, H, K, Y);
          });
        }
        return A = A ? A.then(Z, Z) : Z();
      }
    });
  }
  function _(F, N, T) {
    var A = m;
    return function(D, B) {
      if (A === b)
        throw new Error("Generator is already running");
      if (A === y) {
        if (D === "throw")
          throw B;
        return {
          value: t,
          done: !0
        };
      }
      for (T.method = D, T.arg = B; ; ) {
        var H = T.delegate;
        if (H) {
          var Z = L(H, T);
          if (Z) {
            if (Z === g)
              continue;
            return Z;
          }
        }
        if (T.method === "next")
          T.sent = T._sent = T.arg;
        else if (T.method === "throw") {
          if (A === m)
            throw A = y, T.arg;
          T.dispatchException(T.arg);
        } else
          T.method === "return" && T.abrupt("return", T.arg);
        A = b;
        var K = d(F, N, T);
        if (K.type === "normal") {
          if (A = T.done ? y : p, K.arg === g)
            continue;
          return {
            value: K.arg,
            done: T.done
          };
        }
        K.type === "throw" && (A = y, T.method = "throw", T.arg = K.arg);
      }
    };
  }
  function L(F, N) {
    var T = N.method, A = F.iterator[T];
    if (A === t)
      return N.delegate = null, T === "throw" && F.iterator.return && (N.method = "return", N.arg = t, L(F, N), N.method === "throw") || T !== "return" && (N.method = "throw", N.arg = new TypeError("The iterator does not provide a '" + T + "' method")), g;
    var D = d(A, F.iterator, N.arg);
    if (D.type === "throw")
      return N.method = "throw", N.arg = D.arg, N.delegate = null, g;
    var B = D.arg;
    return B ? B.done ? (N[F.resultName] = B.value, N.next = F.nextLoc, N.method !== "return" && (N.method = "next", N.arg = t), N.delegate = null, g) : B : (N.method = "throw", N.arg = new TypeError("iterator result is not an object"), N.delegate = null, g);
  }
  function M(F) {
    var N = {
      tryLoc: F[0]
    };
    1 in F && (N.catchLoc = F[1]), 2 in F && (N.finallyLoc = F[2], N.afterLoc = F[3]), this.tryEntries.push(N);
  }
  function S(F) {
    var N = F.completion || {};
    N.type = "normal", delete N.arg, F.completion = N;
  }
  function $(F) {
    this.tryEntries = [{
      tryLoc: "root"
    }], F.forEach(M, this), this.reset(!0);
  }
  function R(F) {
    if (F || F === "") {
      var N = F[o];
      if (N)
        return N.call(F);
      if (typeof F.next == "function")
        return F;
      if (!isNaN(F.length)) {
        var T = -1, A = function D() {
          for (; ++T < F.length; )
            if (r.call(F, T))
              return D.value = F[T], D.done = !1, D;
          return D.value = t, D.done = !0, D;
        };
        return A.next = A;
      }
    }
    throw new TypeError(_e(F) + " is not iterable");
  }
  return x.prototype = v, i(k, "constructor", {
    value: v,
    configurable: !0
  }), i(v, "constructor", {
    value: x,
    configurable: !0
  }), x.displayName = u(v, c, "GeneratorFunction"), e.isGeneratorFunction = function(F) {
    var N = typeof F == "function" && F.constructor;
    return !!N && (N === x || (N.displayName || N.name) === "GeneratorFunction");
  }, e.mark = function(F) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(F, v) : (F.__proto__ = v, u(F, c, "GeneratorFunction")), F.prototype = Object.create(k), F;
  }, e.awrap = function(F) {
    return {
      __await: F
    };
  }, O(P.prototype), u(P.prototype, l, function() {
    return this;
  }), e.AsyncIterator = P, e.async = function(F, N, T, A, D) {
    D === void 0 && (D = Promise);
    var B = new P(f(F, N, T, A), D);
    return e.isGeneratorFunction(N) ? B : B.next().then(function(H) {
      return H.done ? H.value : B.next();
    });
  }, O(k), u(k, c, "Generator"), u(k, o, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(F) {
    var N = Object(F), T = [];
    for (var A in N)
      T.push(A);
    return T.reverse(), function D() {
      for (; T.length; ) {
        var B = T.pop();
        if (B in N)
          return D.value = B, D.done = !1, D;
      }
      return D.done = !0, D;
    };
  }, e.values = R, $.prototype = {
    constructor: $,
    reset: function(N) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(S), !N)
        for (var T in this)
          T.charAt(0) === "t" && r.call(this, T) && !isNaN(+T.slice(1)) && (this[T] = t);
    },
    stop: function() {
      this.done = !0;
      var N = this.tryEntries[0].completion;
      if (N.type === "throw")
        throw N.arg;
      return this.rval;
    },
    dispatchException: function(N) {
      if (this.done)
        throw N;
      var T = this;
      function A(Y, re) {
        return H.type = "throw", H.arg = N, T.next = Y, re && (T.method = "next", T.arg = t), !!re;
      }
      for (var D = this.tryEntries.length - 1; D >= 0; --D) {
        var B = this.tryEntries[D], H = B.completion;
        if (B.tryLoc === "root")
          return A("end");
        if (B.tryLoc <= this.prev) {
          var Z = r.call(B, "catchLoc"), K = r.call(B, "finallyLoc");
          if (Z && K) {
            if (this.prev < B.catchLoc)
              return A(B.catchLoc, !0);
            if (this.prev < B.finallyLoc)
              return A(B.finallyLoc);
          } else if (Z) {
            if (this.prev < B.catchLoc)
              return A(B.catchLoc, !0);
          } else {
            if (!K)
              throw new Error("try statement without catch or finally");
            if (this.prev < B.finallyLoc)
              return A(B.finallyLoc);
          }
        }
      }
    },
    abrupt: function(N, T) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var D = this.tryEntries[A];
        if (D.tryLoc <= this.prev && r.call(D, "finallyLoc") && this.prev < D.finallyLoc) {
          var B = D;
          break;
        }
      }
      B && (N === "break" || N === "continue") && B.tryLoc <= T && T <= B.finallyLoc && (B = null);
      var H = B ? B.completion : {};
      return H.type = N, H.arg = T, B ? (this.method = "next", this.next = B.finallyLoc, g) : this.complete(H);
    },
    complete: function(N, T) {
      if (N.type === "throw")
        throw N.arg;
      return N.type === "break" || N.type === "continue" ? this.next = N.arg : N.type === "return" ? (this.rval = this.arg = N.arg, this.method = "return", this.next = "end") : N.type === "normal" && T && (this.next = T), g;
    },
    finish: function(N) {
      for (var T = this.tryEntries.length - 1; T >= 0; --T) {
        var A = this.tryEntries[T];
        if (A.finallyLoc === N)
          return this.complete(A.completion, A.afterLoc), S(A), g;
      }
    },
    catch: function(N) {
      for (var T = this.tryEntries.length - 1; T >= 0; --T) {
        var A = this.tryEntries[T];
        if (A.tryLoc === N) {
          var D = A.completion;
          if (D.type === "throw") {
            var B = D.arg;
            S(A);
          }
          return B;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(N, T, A) {
      return this.delegate = {
        iterator: R(N),
        resultName: T,
        nextLoc: A
      }, this.method === "next" && (this.arg = t), g;
    }
  }, e;
}
function bu(t, e, n, r, i, a, o) {
  try {
    var l = t[a](o), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function xo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var a = t.apply(e, n);
      function o(c) {
        bu(a, r, i, o, l, "next", c);
      }
      function l(c) {
        bu(a, r, i, o, l, "throw", c);
      }
      o(void 0);
    });
  };
}
function In() {
  return In = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, In.apply(this, arguments);
}
function kg(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, $i(t, e);
}
function $s(t) {
  return $s = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, $s(t);
}
function $i(t, e) {
  return $i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, $i(t, e);
}
function $g() {
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
function Ea(t, e, n) {
  return $g() ? Ea = Reflect.construct.bind() : Ea = function(i, a, o) {
    var l = [null];
    l.push.apply(l, a);
    var c = Function.bind.apply(i, l), u = new c();
    return o && $i(u, o.prototype), u;
  }, Ea.apply(null, arguments);
}
function _g(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function _s(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return _s = function(r) {
    if (r === null || !_g(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Ea(r, arguments, $s(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), $i(i, r);
  }, _s(t);
}
var Sg = /%[sdj%]/g, Og = function() {
};
typeof process < "u" && process.env;
function Ss(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function rt(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var o = t.replace(Sg, function(l) {
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
function Fg(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Ie(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || Fg(e) && typeof t == "string" && !t);
}
function Ng(t, e, n) {
  var r = [], i = 0, a = t.length;
  function o(l) {
    r.push.apply(r, l || []), i++, i === a && n(r);
  }
  t.forEach(function(l) {
    e(l, o);
  });
}
function Eu(t, e, n) {
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
function Rg(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var wu = /* @__PURE__ */ function(t) {
  kg(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ _s(Error));
function Pg(t, e, n, r, i) {
  if (e.first) {
    var a = new Promise(function(m, p) {
      var b = function(h) {
        return r(h), h.length ? p(new wu(h, Ss(h))) : m(i);
      }, y = Rg(t);
      Eu(y, n, b);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, p) {
    var b = function(g) {
      if (f.push.apply(f, g), u++, u === c)
        return r(f), f.length ? p(new wu(f, Ss(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(y) {
      var g = t[y];
      o.indexOf(y) !== -1 ? Eu(g, n, b) : Ng(g, n, b);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Mg(t) {
  return !!(t && t.message !== void 0);
}
function Ag(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Cu(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = Ag(e, t.fullFields) : r = e[n.field || t.fullField], Mg(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function xu(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = In({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var m1 = function(e, n, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || Ie(n, o || e.type)) && i.push(rt(a.messages.required, e.fullField));
}, Ig = function(e, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(rt(a.messages.whitespace, e.fullField));
}, ra, Tg = function() {
  if (ra)
    return ra;
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
  c.v4 = function(v) {
    return v && v.exact ? o : new RegExp("" + e(v) + n + e(v), "g");
  }, c.v6 = function(v) {
    return v && v.exact ? l : new RegExp("" + e(v) + i + e(v), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, p = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", b = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", h = '(?:[/?#][^\\s"]*)?', x = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + p + b + y + ")" + g + h;
  return ra = new RegExp("(?:^" + x + "$)", "i"), ra;
}, ku = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ai = {
  integer: function(e) {
    return ai.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return ai.number(e) && !ai.integer(e);
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
    return typeof e == "object" && !ai.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(ku.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Tg());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(ku.hex);
  }
}, Lg = function(e, n, r, i, a) {
  if (e.required && n === void 0) {
    m1(e, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  o.indexOf(l) > -1 ? ai[l](n) || i.push(rt(a.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(rt(a.messages.types[l], e.fullField, e.type));
}, Dg = function(e, n, r, i, a) {
  var o = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", p = typeof n == "string", b = Array.isArray(n);
  if (m ? d = "number" : p ? d = "string" : b && (d = "array"), !d)
    return !1;
  b && (f = n.length), p && (f = n.replace(u, "_").length), o ? f !== e.len && i.push(rt(a.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(rt(a.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(rt(a.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(rt(a.messages[d].range, e.fullField, e.min, e.max));
}, rr = "enum", Vg = function(e, n, r, i, a) {
  e[rr] = Array.isArray(e[rr]) ? e[rr] : [], e[rr].indexOf(n) === -1 && i.push(rt(a.messages[rr], e.fullField, e[rr].join(", ")));
}, jg = function(e, n, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(rt(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(n) || i.push(rt(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, oe = {
  required: m1,
  whitespace: Ig,
  type: Lg,
  range: Dg,
  enum: Vg,
  pattern: jg
}, Bg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n, "string") && !e.required)
      return r();
    oe.required(e, n, i, o, a, "string"), Ie(n, "string") || (oe.type(e, n, i, o, a), oe.range(e, n, i, o, a), oe.pattern(e, n, i, o, a), e.whitespace === !0 && oe.whitespace(e, n, i, o, a));
  }
  r(o);
}, Wg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && oe.type(e, n, i, o, a);
  }
  r(o);
}, Zg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && (oe.type(e, n, i, o, a), oe.range(e, n, i, o, a));
  }
  r(o);
}, Hg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && oe.type(e, n, i, o, a);
  }
  r(o);
}, zg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), Ie(n) || oe.type(e, n, i, o, a);
  }
  r(o);
}, qg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && (oe.type(e, n, i, o, a), oe.range(e, n, i, o, a));
  }
  r(o);
}, Ug = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && (oe.type(e, n, i, o, a), oe.range(e, n, i, o, a));
  }
  r(o);
}, Kg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    oe.required(e, n, i, o, a, "array"), n != null && (oe.type(e, n, i, o, a), oe.range(e, n, i, o, a));
  }
  r(o);
}, Yg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && oe.type(e, n, i, o, a);
  }
  r(o);
}, Gg = "enum", Xg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a), n !== void 0 && oe[Gg](e, n, i, o, a);
  }
  r(o);
}, Qg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n, "string") && !e.required)
      return r();
    oe.required(e, n, i, o, a), Ie(n, "string") || oe.pattern(e, n, i, o, a);
  }
  r(o);
}, Jg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n, "date") && !e.required)
      return r();
    if (oe.required(e, n, i, o, a), !Ie(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), oe.type(e, c, i, o, a), c && oe.range(e, c.getTime(), i, o, a);
    }
  }
  r(o);
}, e5 = function(e, n, r, i, a) {
  var o = [], l = Array.isArray(n) ? "array" : typeof n;
  oe.required(e, n, i, o, a, l), r(o);
}, jo = function(e, n, r, i, a) {
  var o = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Ie(n, o) && !e.required)
      return r();
    oe.required(e, n, i, l, a, o), Ie(n, o) || oe.type(e, n, i, l, a);
  }
  r(l);
}, t5 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ie(n) && !e.required)
      return r();
    oe.required(e, n, i, o, a);
  }
  r(o);
}, fi = {
  string: Bg,
  method: Wg,
  number: Zg,
  boolean: Hg,
  regexp: zg,
  integer: qg,
  float: Ug,
  array: Kg,
  object: Yg,
  enum: Xg,
  pattern: Qg,
  date: Jg,
  url: jo,
  hex: jo,
  email: jo,
  required: e5,
  any: t5
};
function Os() {
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
var Fs = Os(), ji = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = Fs, this.define(n);
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
    return r && (this._messages = xu(Os(), r)), this._messages;
  }, e.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var l = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, l), Promise.resolve(l);
    function f(y) {
      var g = [], h = {};
      function x(E) {
        if (Array.isArray(E)) {
          var w;
          g = (w = g).concat.apply(w, E);
        } else
          g.push(E);
      }
      for (var v = 0; v < y.length; v++)
        x(y[v]);
      g.length ? (h = Ss(g), u(g, h)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === Fs && (d = Os()), xu(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, p = c.keys || Object.keys(this.rules);
    p.forEach(function(y) {
      var g = o.rules[y], h = l[y];
      g.forEach(function(x) {
        var v = x;
        typeof v.transform == "function" && (l === r && (l = In({}, l)), h = l[y] = v.transform(h)), typeof v == "function" ? v = {
          validator: v
        } : v = In({}, v), v.validator = o.getValidationMethod(v), v.validator && (v.field = y, v.fullField = v.fullField || y, v.type = o.getType(v), m[y] = m[y] || [], m[y].push({
          rule: v,
          value: h,
          source: l,
          field: y
        }));
      });
    });
    var b = {};
    return Pg(m, c, function(y, g) {
      var h = y.rule, x = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      x = x && (h.required || !h.required && y.value), h.field = y.field;
      function v(C, k) {
        return In({}, k, {
          fullField: h.fullField + "." + C,
          fullFields: h.fullFields ? [].concat(h.fullFields, [C]) : [C]
        });
      }
      function E(C) {
        C === void 0 && (C = []);
        var k = Array.isArray(C) ? C : [C];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && h.message !== void 0 && (k = [].concat(h.message));
        var O = k.map(Cu(h, l));
        if (c.first && O.length)
          return b[h.field] = 1, g(O);
        if (!x)
          g(O);
        else {
          if (h.required && !y.value)
            return h.message !== void 0 ? O = [].concat(h.message).map(Cu(h, l)) : c.error && (O = [c.error(h, rt(c.messages.required, h.field))]), g(O);
          var P = {};
          h.defaultField && Object.keys(y.value).map(function(M) {
            P[M] = h.defaultField;
          }), P = In({}, P, y.rule.fields);
          var _ = {};
          Object.keys(P).forEach(function(M) {
            var S = P[M], $ = Array.isArray(S) ? S : [S];
            _[M] = $.map(v.bind(null, M));
          });
          var L = new t(_);
          L.messages(c.messages), y.rule.options && (y.rule.options.messages = c.messages, y.rule.options.error = c.error), L.validate(y.value, y.rule.options || c, function(M) {
            var S = [];
            O && O.length && S.push.apply(S, O), M && M.length && S.push.apply(S, M), g(S.length ? S : null);
          });
        }
      }
      var w;
      if (h.asyncValidator)
        w = h.asyncValidator(h, y.value, E, y.source, c);
      else if (h.validator) {
        try {
          w = h.validator(h, y.value, E, y.source, c);
        } catch (C) {
          console.error == null || console.error(C), c.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), E(C.message);
        }
        w === !0 ? E() : w === !1 ? E(typeof h.message == "function" ? h.message(h.fullField || h.field) : h.message || (h.fullField || h.field) + " fails") : w instanceof Array ? E(w) : w instanceof Error && E(w.message);
      }
      w && w.then && w.then(function() {
        return E();
      }, function(C) {
        return E(C);
      });
    }, function(y) {
      f(y);
    }, l);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !fi.hasOwnProperty(r.type))
      throw new Error(rt("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? fi.required : fi[this.getType(r)] || void 0;
  }, t;
}();
ji.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  fi[e] = n;
};
ji.warning = Og;
ji.messages = Fs;
ji.validators = fi;
var et = "'${name}' is not a valid ${type}", h1 = {
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
    string: et,
    method: et,
    array: et,
    object: et,
    number: et,
    date: et,
    boolean: et,
    integer: et,
    float: et,
    regexp: et,
    email: et,
    url: et,
    hex: et
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
}, $u = ji;
function n5(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var _u = "CODE_LOGIC_ERROR";
function Ns(t, e, n, r, i) {
  return Rs.apply(this, arguments);
}
function Rs() {
  return Rs = xo(/* @__PURE__ */ Ut().mark(function t(e, n, r, i, a) {
    var o, l, c, u, f, d, m, p, b;
    return Ut().wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return o = G({}, r), delete o.ruleIndex, $u.warning = function() {
            }, o.validator && (l = o.validator, o.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (h) {
                return console.error(h), Promise.reject(_u);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new $u(me({}, e, [o])), f = ii(h1, i.validateMessages), u.messages(f), d = [], g.prev = 10, g.next = 13, Promise.resolve(u.validate(me({}, e, n), G({}, i)));
          case 13:
            g.next = 18;
            break;
          case 15:
            g.prev = 15, g.t0 = g.catch(10), g.t0.errors && (d = g.t0.errors.map(function(h, x) {
              var v = h.message, E = v === _u ? f.default : v;
              return /* @__PURE__ */ I.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                I.cloneElement(E, {
                  key: "error_".concat(x)
                })
              ) : E;
            }));
          case 18:
            if (!(!d.length && c)) {
              g.next = 23;
              break;
            }
            return g.next = 21, Promise.all(n.map(function(h, x) {
              return Ns("".concat(e, ".").concat(x), h, c, i, a);
            }));
          case 21:
            return m = g.sent, g.abrupt("return", m.reduce(function(h, x) {
              return [].concat(he(h), he(x));
            }, []));
          case 23:
            return p = G(G({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, a), b = d.map(function(h) {
              return typeof h == "string" ? n5(h, p) : h;
            }), g.abrupt("return", b);
          case 26:
          case "end":
            return g.stop();
        }
    }, t, null, [[10, 15]]);
  })), Rs.apply(this, arguments);
}
function r5(t, e, n, r, i, a) {
  var o = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, p = G(G({}, f), {}, {
      ruleIndex: d
    });
    return m && (p.validator = function(b, y, g) {
      var h = !1, x = function() {
        for (var w = arguments.length, C = new Array(w), k = 0; k < w; k++)
          C[k] = arguments[k];
        Promise.resolve().then(function() {
          ht(!h, "Your validator function has already return a promise. `callback` will be ignored."), h || g.apply(void 0, C);
        });
      }, v = m(b, y, x);
      h = v && typeof v.then == "function" && typeof v.catch == "function", ht(h, "`callback` is deprecated. Please return a promise instead."), h && v.then(function() {
        g();
      }).catch(function(E) {
        g(E || " ");
      });
    }), p;
  }).sort(function(f, d) {
    var m = f.warningOnly, p = f.ruleIndex, b = d.warningOnly, y = d.ruleIndex;
    return !!m == !!b ? p - y : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = xo(/* @__PURE__ */ Ut().mark(function d(m, p) {
        var b, y, g;
        return Ut().wrap(function(x) {
          for (; ; )
            switch (x.prev = x.next) {
              case 0:
                b = 0;
              case 1:
                if (!(b < l.length)) {
                  x.next = 12;
                  break;
                }
                return y = l[b], x.next = 5, Ns(o, e, y, r, a);
              case 5:
                if (g = x.sent, !g.length) {
                  x.next = 9;
                  break;
                }
                return p([{
                  errors: g,
                  rule: y
                }]), x.abrupt("return");
              case 9:
                b += 1, x.next = 1;
                break;
              case 12:
                m([]);
              case 13:
              case "end":
                return x.stop();
            }
        }, d);
      }));
      return function(d, m) {
        return f.apply(this, arguments);
      };
    }());
  else {
    var u = l.map(function(f) {
      return Ns(o, e, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? a5(u) : i5(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function i5(t) {
  return Ps.apply(this, arguments);
}
function Ps() {
  return Ps = xo(/* @__PURE__ */ Ut().mark(function t(e) {
    return Ut().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var a, o = (a = []).concat.apply(a, he(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), Ps.apply(this, arguments);
}
function a5(t) {
  return Ms.apply(this, arguments);
}
function Ms() {
  return Ms = xo(/* @__PURE__ */ Ut().mark(function t(e) {
    var n;
    return Ut().wrap(function(i) {
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
  })), Ms.apply(this, arguments);
}
function Oe(t) {
  return ks(t);
}
function Su(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = kt(t, r);
    n = Et(n, r, i);
  }), n;
}
function di(t, e) {
  return t && t.some(function(n) {
    return v1(n, e);
  });
}
function v1(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function o5(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || _e(t) !== "object" || _e(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return he(i).every(function(a) {
    var o = t[a], l = e[a];
    return typeof o == "function" && typeof l == "function" ? !0 : o === l;
  });
}
function s5(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && _e(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function Ou(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], a = e - n;
  return a > 0 ? [].concat(he(t.slice(0, n)), [i], he(t.slice(n, e)), he(t.slice(e + 1, r))) : a < 0 ? [].concat(he(t.slice(0, e)), he(t.slice(e + 1, n + 1)), [i], he(t.slice(n + 1, r))) : t;
}
var l5 = ["name"], st = [];
function Fu(t, e, n, r, i, a) {
  return typeof t == "function" ? t(e, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var Il = /* @__PURE__ */ function(t) {
  Ml(n, t);
  var e = Al(n);
  function n(r) {
    var i;
    if (Un(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = void 0, i.prevValidating = void 0, i.errors = st, i.warnings = st, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, Oe(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(he(m), he(u)) : [];
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
    }, i.metaCache = null, i.triggerMetaEvent = function(c) {
      var u = i.props.onMetaChange;
      if (u) {
        var f = G(G({}, i.getMeta()), {}, {
          destroy: c
        });
        Cg(i.metaCache, f) || u(f), i.metaCache = f;
      } else
        i.metaCache = null;
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, p = d.dependencies, b = p === void 0 ? [] : p, y = d.onReset, g = f.store, h = i.getNamePath(), x = i.getValue(c), v = i.getValue(g), E = u && di(u, h);
      switch (f.type === "valueUpdate" && f.source === "external" && x !== v && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = st, i.warnings = st, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = void 0, i.errors = st, i.warnings = st, i.triggerMetaEvent(), y == null || y(), i.refresh();
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
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || st), "warnings" in w && (i.warnings = w.warnings || st), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !h.length && Fu(m, c, g, x, v, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var C = b.map(Oe);
          if (C.some(function(k) {
            return di(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!b.length || h.length || m) && Fu(m, c, g, x, v, f)) {
            i.reRender();
            return;
          }
          break;
      }
      m === !0 && i.reRender();
    }, i.validateRules = function(c) {
      var u = i.getNamePath(), f = i.getValue(), d = c || {}, m = d.triggerName, p = d.validateOnly, b = p === void 0 ? !1 : p, y = Promise.resolve().then(function() {
        if (!i.mounted)
          return [];
        var g = i.props, h = g.validateFirst, x = h === void 0 ? !1 : h, v = g.messageVariables, E = i.getRules();
        m && (E = E.filter(function(C) {
          return C;
        }).filter(function(C) {
          var k = C.validateTrigger;
          if (!k)
            return !0;
          var O = ks(k);
          return O.includes(m);
        }));
        var w = r5(u, f, E, c, x, v);
        return w.catch(function(C) {
          return C;
        }).then(function() {
          var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st;
          if (i.validatePromise === y) {
            var k;
            i.validatePromise = null;
            var O = [], P = [];
            (k = C.forEach) === null || k === void 0 || k.call(C, function(_) {
              var L = _.rule.warningOnly, M = _.errors, S = M === void 0 ? st : M;
              L ? P.push.apply(P, he(S)) : O.push.apply(O, he(S));
            }), i.errors = O, i.warnings = P, i.triggerMetaEvent(), i.reRender();
          }
        }), w;
      });
      return b || (i.validatePromise = y, i.dirty = !0, i.errors = st, i.warnings = st, i.triggerMetaEvent(), i.reRender()), y;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(An), f = u.getInitialValue;
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
        name: i.getNamePath(),
        validated: i.validatePromise === null
      };
      return c;
    }, i.getOnlyChild = function(c) {
      if (typeof c == "function") {
        var u = i.getMeta();
        return G(G({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = xs(c);
      return f.length !== 1 || !/* @__PURE__ */ I.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return kt(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, p = u.normalize, b = u.valuePropName, y = u.getValueProps, g = u.fieldContext, h = d !== void 0 ? d : g.validateTrigger, x = i.getNamePath(), v = g.getInternalHooks, E = g.getFieldsValue, w = v(An), C = w.dispatch, k = i.getValue(), O = y || function(M) {
        return me({}, b, M);
      }, P = c[f], _ = G(G({}, c), O(k));
      _[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var M, S = arguments.length, $ = new Array(S), R = 0; R < S; R++)
          $[R] = arguments[R];
        m ? M = m.apply(void 0, $) : M = s5.apply(void 0, [b].concat($)), p && (M = p(M, k, E(!0))), C({
          type: "updateValue",
          namePath: x,
          value: M
        }), P && P.apply(void 0, $);
      };
      var L = ks(h || []);
      return L.forEach(function(M) {
        var S = _[M];
        _[M] = function() {
          S && S.apply(void 0, arguments);
          var $ = i.props.rules;
          $ && $.length && C({
            type: "validateField",
            namePath: x,
            triggerName: M
          });
        };
      }), _;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(An), l = o.initEntityValue;
      l(La(i));
    }
    return i;
  }
  return Kn(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var l = o.getInternalHooks, c = l(An), u = c.registerField;
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
      return c ? u = l : /* @__PURE__ */ I.isValidElement(l) ? u = /* @__PURE__ */ I.cloneElement(l, this.getControlled(l.props)) : (ht(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ I.createElement(I.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(I.Component);
Il.contextType = Zn;
Il.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function Tl(t) {
  var e = t.name, n = $r(t, l5), r = I.useContext(Zn), i = I.useContext(Va), a = e !== void 0 ? Oe(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((a || []).join("_"))), /* @__PURE__ */ I.createElement(Il, Wn({
    key: o,
    name: a,
    isListField: !!i
  }, n, {
    fieldContext: r
  }));
}
var p1 = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, a = e.rules, o = e.validateTrigger, l = e.isListField, c = I.useContext(Zn), u = I.useContext(Va), f = I.useRef({
    keys: [],
    id: 0
  }), d = f.current, m = I.useMemo(function() {
    var g = Oe(c.prefixName) || [];
    return [].concat(he(g), he(Oe(n)));
  }, [c.prefixName, n]), p = I.useMemo(function() {
    return G(G({}, c), {}, {
      prefixName: m
    });
  }, [c, m]), b = I.useMemo(function() {
    return {
      getKey: function(h) {
        var x = m.length, v = h[x];
        return [d.keys[v], h.slice(x + 1)];
      }
    };
  }, [m]);
  if (typeof i != "function")
    return ht(!1, "Form.List only accepts function as children."), null;
  var y = function(h, x, v) {
    var E = v.source;
    return E === "internal" ? !1 : h !== x;
  };
  return /* @__PURE__ */ I.createElement(Va.Provider, {
    value: b
  }, /* @__PURE__ */ I.createElement(Zn.Provider, {
    value: p
  }, /* @__PURE__ */ I.createElement(Tl, {
    name: [],
    shouldUpdate: y,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0,
    isListField: l ?? !!u
  }, function(g, h) {
    var x = g.value, v = x === void 0 ? [] : x, E = g.onChange, w = c.getFieldValue, C = function() {
      var _ = w(m || []);
      return _ || [];
    }, k = {
      add: function(_, L) {
        var M = C();
        L >= 0 && L <= M.length ? (d.keys = [].concat(he(d.keys.slice(0, L)), [d.id], he(d.keys.slice(L))), E([].concat(he(M.slice(0, L)), [_], he(M.slice(L))))) : (d.keys = [].concat(he(d.keys), [d.id]), E([].concat(he(M), [_]))), d.id += 1;
      },
      remove: function(_) {
        var L = C(), M = new Set(Array.isArray(_) ? _ : [_]);
        M.size <= 0 || (d.keys = d.keys.filter(function(S, $) {
          return !M.has($);
        }), E(L.filter(function(S, $) {
          return !M.has($);
        })));
      },
      move: function(_, L) {
        if (_ !== L) {
          var M = C();
          _ < 0 || _ >= M.length || L < 0 || L >= M.length || (d.keys = Ou(d.keys, _, L), E(Ou(M, _, L)));
        }
      }
    }, O = v || [];
    return Array.isArray(O) || (O = []), i(O.map(function(P, _) {
      var L = d.keys[_];
      return L === void 0 && (d.keys[_] = d.id, L = d.keys[_], d.id += 1), {
        name: _,
        key: L,
        isListField: !0
      };
    }), k, h);
  })));
};
function c5(t) {
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
var g1 = "__@field_split__";
function Bo(t) {
  return t.map(function(e) {
    return "".concat(_e(e), ":").concat(e);
  }).join(g1);
}
var ir = /* @__PURE__ */ function() {
  function t() {
    Un(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return Kn(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(Bo(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(Bo(n));
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
      this.kvs.delete(Bo(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return he(this.kvs.entries()).map(function(r) {
        var i = Fe(r, 2), a = i[0], o = i[1], l = a.split(g1);
        return n({
          key: l.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = Fe(u, 3), d = f[1], m = f[2];
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
}(), u5 = ["name"], f5 = /* @__PURE__ */ Kn(function t(e) {
  var n = this;
  Un(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === An ? (n.formHooked = !0, {
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
      var a, o = ii(r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(l) {
        var c = l.key;
        o = Et(o, c, kt(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new ir();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = kt(n.initialValues, r);
    return r.length ? ii(i) : i;
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
      var i = n.getFieldsValue(), a = n.getFieldsValue(!0);
      n.watchList.forEach(function(o) {
        o(i, a, r);
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new ir();
    return n.getFieldEntities(r).forEach(function(a) {
      var o = a.getNamePath();
      i.set(o, a);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(a) {
      var o = Oe(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: Oe(a)
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
    }), Su(n.store, o.map(Oe));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = Oe(r);
    return kt(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: Oe(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = Oe(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = Oe(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], l = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(Oe), u = !1) : (c = null, u = o) : (c = o.map(Oe), u = l);
    var f = n.getFieldEntities(!0), d = function(g) {
      return g.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new ir();
    c.forEach(function(y) {
      m.set(y, []);
    }), f.forEach(function(y) {
      var g = y.getNamePath();
      c.forEach(function(h) {
        h.every(function(x, v) {
          return g[v] === x;
        }) && m.update(h, function(x) {
          return [].concat(he(x), [y]);
        });
      });
    });
    var p = function(g) {
      return g.some(d);
    }, b = m.map(function(y) {
      var g = y.value;
      return g;
    });
    return u ? b.every(p) : b.some(p);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(o) {
        return o.isFieldValidating();
      });
    var a = r.map(Oe);
    return i.some(function(o) {
      var l = o.getNamePath();
      return di(a, l) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new ir(), a = n.getFieldEntities(!0);
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
          var m = f.getNamePath(), p = n.getInitialValue(m);
          if (p !== void 0)
            ht(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var b = i.get(m);
            if (b && b.size > 1)
              ht(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (b) {
              var y = n.getFieldValue(m);
              (!r.skipExist || y === void 0) && n.updateStore(Et(n.store, m, he(b)[0].value));
            }
          }
        }
      });
    }, l;
    r.entities ? l = r.entities : r.namePathList ? (l = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = l).push.apply(f, he(he(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : l = a, o(l);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(ii(n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(Oe);
    a.forEach(function(o) {
      var l = n.getInitialValue(o);
      n.updateStore(Et(n.store, o, l));
    }), n.resetWithFieldInitialValue({
      namePathList: a
    }), n.notifyObservers(i, a, {
      type: "reset"
    }), n.notifyWatch(a);
  }, this.setFields = function(r) {
    n.warningUnhooked();
    var i = n.store, a = [];
    r.forEach(function(o) {
      var l = o.name, c = $r(o, u5), u = Oe(l);
      a.push(u), "value" in c && n.updateStore(Et(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), l = a.getMeta(), c = G(G({}, l), {}, {
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
      var a = r.getNamePath(), o = kt(n.store, a);
      o === void 0 && n.updateStore(Et(n.store, a, i));
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
            !v1(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(Et(f, i, u, !0)), n.notifyObservers(f, [i], {
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
      var o = G(G({}, a), {}, {
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
      relatedFields: [i].concat(he(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = Oe(r), o = n.store;
    n.updateStore(Et(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var l = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Su(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(he(l)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = ii(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new ir();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = Oe(f);
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
        var l = new ir();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          l.set(f, d);
        }), o.forEach(function(u) {
          u.errors = l.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var f = u.name;
        return di(r, f);
      });
      c.length && a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a, o;
    Array.isArray(r) || typeof r == "string" || typeof i == "string" ? (a = r, o = i) : o = r;
    var l = !!a, c = l ? a.map(Oe) : [], u = [], f = String(Date.now()), d = /* @__PURE__ */ new Set();
    n.getFieldEntities(!0).forEach(function(y) {
      var g;
      if (l || c.push(y.getNamePath()), !((g = o) === null || g === void 0) && g.recursive && l) {
        var h = y.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        h.every(function(E, w) {
          return a[w] === E || a[w] === void 0;
        }) && c.push(h);
      }
      if (!(!y.props.rules || !y.props.rules.length)) {
        var x = y.getNamePath();
        if (d.add(x.join(f)), !l || di(c, x)) {
          var v = y.validateRules(G({
            validateMessages: G(G({}, h1), n.validateMessages)
          }, o));
          u.push(v.then(function() {
            return {
              name: x,
              errors: [],
              warnings: []
            };
          }).catch(function(E) {
            var w, C = [], k = [];
            return (w = E.forEach) === null || w === void 0 || w.call(E, function(O) {
              var P = O.rule.warningOnly, _ = O.errors;
              P ? k.push.apply(k, he(_)) : C.push.apply(C, he(_));
            }), C.length ? Promise.reject({
              name: x,
              errors: C,
              warnings: k
            }) : {
              name: x,
              errors: C,
              warnings: k
            };
          }));
        }
      }
    });
    var m = c5(u);
    n.lastValidatePromise = m, m.catch(function(y) {
      return y;
    }).then(function(y) {
      var g = y.map(function(h) {
        var x = h.name;
        return x;
      });
      n.notifyObservers(n.store, g, {
        type: "validateFinish"
      }), n.triggerOnFieldsChange(g, y);
    });
    var p = m.then(function() {
      return n.lastValidatePromise === m ? Promise.resolve(n.getFieldsValue(c)) : Promise.reject([]);
    }).catch(function(y) {
      var g = y.filter(function(h) {
        return h && h.errors.length;
      });
      return Promise.reject({
        values: n.getFieldsValue(c),
        errorFields: g,
        outOfDate: n.lastValidatePromise !== m
      });
    });
    p.catch(function(y) {
      return y;
    });
    var b = c.filter(function(y) {
      return d.has(y.join(f));
    });
    return n.triggerOnFieldsChange(b), p;
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
function Ll(t) {
  var e = I.useRef(), n = I.useState({}), r = Fe(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var a = function() {
        i({});
      }, o = new f5(a);
      e.current = o.getForm();
    }
  return [e.current];
}
var As = /* @__PURE__ */ I.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), d5 = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, a = e.children, o = I.useContext(As), l = I.useRef({});
  return /* @__PURE__ */ I.createElement(As.Provider, {
    value: G(G({}, o), {}, {
      validateMessages: G(G({}, o.validateMessages), n),
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
        u && (l.current = G(G({}, l.current), {}, me({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = G({}, l.current);
        delete f[u], l.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, m5 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], h5 = function(e, n) {
  var r = e.name, i = e.initialValues, a = e.fields, o = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, p = m === void 0 ? "onChange" : m, b = e.onValuesChange, y = e.onFieldsChange, g = e.onFinish, h = e.onFinishFailed, x = $r(e, m5), v = I.useContext(As), E = Ll(o), w = Fe(E, 1), C = w[0], k = C.getInternalHooks(An), O = k.useSubscribe, P = k.setInitialValues, _ = k.setCallbacks, L = k.setValidateMessages, M = k.setPreserve, S = k.destroyForm;
  I.useImperativeHandle(n, function() {
    return C;
  }), I.useEffect(function() {
    return v.registerForm(r, C), function() {
      v.unregisterForm(r);
    };
  }, [v, C, r]), L(G(G({}, v.validateMessages), d)), _({
    onValuesChange: b,
    onFieldsChange: function(H) {
      if (v.triggerFormChange(r, H), y) {
        for (var Z = arguments.length, K = new Array(Z > 1 ? Z - 1 : 0), Y = 1; Y < Z; Y++)
          K[Y - 1] = arguments[Y];
        y.apply(void 0, [H].concat(K));
      }
    },
    onFinish: function(H) {
      v.triggerFormFinish(r, H), g && g(H);
    },
    onFinishFailed: h
  }), M(l);
  var $ = I.useRef(null);
  P(i, !$.current), $.current || ($.current = !0), I.useEffect(
    function() {
      return S;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var R, F = typeof c == "function";
  if (F) {
    var N = C.getFieldsValue(!0);
    R = c(N, C);
  } else
    R = c;
  O(!F);
  var T = I.useRef();
  I.useEffect(function() {
    o5(T.current || [], a || []) || C.setFields(a || []), T.current = a;
  }, [a, C]);
  var A = I.useMemo(function() {
    return G(G({}, C), {}, {
      validateTrigger: p
    });
  }, [C, p]), D = /* @__PURE__ */ I.createElement(Va.Provider, {
    value: null
  }, /* @__PURE__ */ I.createElement(Zn.Provider, {
    value: A
  }, R));
  return f === !1 ? D : /* @__PURE__ */ I.createElement(f, Wn({}, x, {
    onSubmit: function(H) {
      H.preventDefault(), H.stopPropagation(), C.submit();
    },
    onReset: function(H) {
      var Z;
      H.preventDefault(), C.resetFields(), (Z = x.onReset) === null || Z === void 0 || Z.call(x, H);
    }
  }), D);
};
function Nu(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function Dl() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, a = e[1], o = a === void 0 ? {} : a, l = xg(o) ? {
    form: o
  } : o, c = l.form, u = X(), f = Fe(u, 2), d = f[0], m = f[1], p = de(function() {
    return Nu(d);
  }, [d]), b = V(p);
  b.current = p;
  var y = it(Zn), g = c || y, h = g && g._init, x = Oe(i), v = V(x);
  return v.current = x, Q(
    function() {
      if (h) {
        var E = g.getFieldsValue, w = g.getInternalHooks, C = w(An), k = C.registerWatch, O = k(function(_, L) {
          var M = kt(l.preserve ? L : _, v.current), S = Nu(M);
          b.current !== S && (b.current = S, m(M));
        }), P = kt(l.preserve ? E(!0) : E(), v.current);
        return m(P), O;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [h]
  ), d;
}
var v5 = /* @__PURE__ */ I.forwardRef(h5), Vr = v5;
Vr.FormProvider = d5;
Vr.Field = Tl;
Vr.List = p1;
Vr.useForm = Ll;
Vr.useWatch = Dl;
const y1 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, Vl = s.createContext(y1), Ru = s.createContext(null), b1 = () => null;
var p5 = function(e) {
  return g5(e) && !y5(e);
};
function g5(t) {
  return !!t && typeof t == "object";
}
function y5(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || w5(t);
}
var b5 = typeof Symbol == "function" && Symbol.for, E5 = b5 ? Symbol.for("react.element") : 60103;
function w5(t) {
  return t.$$typeof === E5;
}
function C5(t) {
  return Array.isArray(t) ? [] : {};
}
function _i(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? _r(C5(t), t, e) : t;
}
function x5(t, e, n) {
  return t.concat(e).map(function(r) {
    return _i(r, n);
  });
}
function k5(t, e) {
  if (!e.customMerge)
    return _r;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : _r;
}
function $5(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Pu(t) {
  return Object.keys(t).concat($5(t));
}
function E1(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function _5(t, e) {
  return E1(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function S5(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && Pu(t).forEach(function(i) {
    r[i] = _i(t[i], n);
  }), Pu(e).forEach(function(i) {
    _5(t, i) || (E1(t, i) && n.isMergeableObject(e[i]) ? r[i] = k5(i, n)(t[i], e[i], n) : r[i] = _i(e[i], n));
  }), r;
}
function _r(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || x5, n.isMergeableObject = n.isMergeableObject || p5, n.cloneUnlessOtherwiseSpecified = _i;
  var r = Array.isArray(e), i = Array.isArray(t), a = r === i;
  return a ? r ? n.arrayMerge(t, e, n) : S5(t, e, n) : _i(e, n);
}
_r.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return _r(r, i, n);
  }, {});
};
var O5 = _r, F5 = O5;
const N5 = /* @__PURE__ */ $t(F5), w1 = (t) => s.createElement(p1, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((a) => ({
    index: a.name,
    key: a.key
  })), i = t.children(r, n).map((a, o) => {
    var l;
    return s.createElement(At, {
      key: r[o].key,
      mode: "card",
      header: (l = t.renderHeader) === null || l === void 0 ? void 0 : l.call(t, r[o], n)
    }, a);
  });
  return t.renderAdd && i.push(s.createElement(At, {
    key: "add",
    mode: "card"
  }, s.createElement(At.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), s.createElement(s.Fragment, null, i);
}), Mu = "adm-form", R5 = y1, P5 = Ee((t, e) => {
  const n = q(R5, t), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: l,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = un(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: p
  } = ue(), b = de(() => N5(p.Form.defaultValidateMessages, m.validateMessages || {}), [p.Form.defaultValidateMessages, m.validateMessages]), y = [];
  let g = null, h = [], x = 0;
  function v() {
    h.length !== 0 && (x += 1, y.push(s.createElement(At, {
      header: g,
      key: x,
      mode: u
    }, h)), h = []);
  }
  return yn(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === b1) {
        v(), g = E.props.children;
        return;
      }
      if (E.type === w1) {
        v(), y.push(E);
        return;
      }
    }
    h.push(E);
  }), v(), s.createElement(Vr, Object.assign({
    className: j(Mu, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: b
  }), s.createElement(Vl.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, y), c && s.createElement("div", {
    className: `${Mu}-footer`
  }, c));
});
var Si = {}, C1 = { exports: {} }, x1 = { exports: {} };
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
})(x1);
var M5 = x1.exports;
(function(t) {
  var e = M5.default;
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
})(C1);
var A5 = C1.exports, k1 = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(k1);
var I5 = k1.exports, yt = {};
Object.defineProperty(yt, "__esModule", {
  value: !0
});
yt.call = jl;
yt.default = void 0;
yt.note = _1;
yt.noteOnce = O1;
yt.preMessage = void 0;
yt.resetWarned = S1;
yt.warning = $1;
yt.warningOnce = Bi;
var Is = {}, T5 = yt.preMessage = function(e) {
};
function $1(t, e) {
}
function _1(t, e) {
}
function S1() {
  Is = {};
}
function jl(t, e, n) {
  !e && !Is[n] && (t(!1, n), Is[n] = !0);
}
function Bi(t, e) {
  jl($1, t, e);
}
function O1(t, e) {
  jl(_1, t, e);
}
Bi.preMessage = T5;
Bi.resetWarned = S1;
Bi.noteOnce = O1;
yt.default = Bi;
var L5 = A5.default, D5 = I5.default;
Object.defineProperty(Si, "__esModule", {
  value: !0
});
var F1 = Si.default = Si.HOOK_MARK = void 0, V5 = D5(yt), j5 = L5(s), B5 = "RC_FORM_INTERNAL_HOOKS";
Si.HOOK_MARK = B5;
var be = function() {
  (0, V5.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, W5 = /* @__PURE__ */ j5.createContext({
  getFieldValue: be,
  getFieldsValue: be,
  getFieldError: be,
  getFieldWarning: be,
  getFieldsError: be,
  isFieldsTouched: be,
  isFieldTouched: be,
  isFieldValidating: be,
  isFieldsValidating: be,
  resetFields: be,
  setFields: be,
  setFieldValue: be,
  setFieldsValue: be,
  validateFields: be,
  submit: be,
  getInternalHooks: function() {
    return be(), {
      dispatch: be,
      initEntityValue: be,
      registerField: be,
      useSubscribe: be,
      setInitialValues: be,
      destroyForm: be,
      setCallbacks: be,
      registerWatch: be,
      getFields: be,
      setValidateMessages: be,
      setPreserve: be,
      getInitialValue: be
    };
  }
}), Z5 = W5;
F1 = Si.default = Z5;
function H5(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const z5 = ["top", "right", "bottom", "left"], Sr = Math.min, Tn = Math.max, ja = Math.round, ia = Math.floor, mn = (t) => ({
  x: t,
  y: t
}), q5 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, U5 = {
  start: "end",
  end: "start"
};
function Ts(t, e, n) {
  return Tn(t, Sr(e, n));
}
function hn(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function vn(t) {
  return t.split("-")[0];
}
function Wi(t) {
  return t.split("-")[1];
}
function Bl(t) {
  return t === "x" ? "y" : "x";
}
function Wl(t) {
  return t === "y" ? "height" : "width";
}
function Zi(t) {
  return ["top", "bottom"].includes(vn(t)) ? "y" : "x";
}
function Zl(t) {
  return Bl(Zi(t));
}
function K5(t, e, n) {
  n === void 0 && (n = !1);
  const r = Wi(t), i = Zl(t), a = Wl(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (o = Ba(o)), [o, Ba(o)];
}
function Y5(t) {
  const e = Ba(t);
  return [Ls(t), e, Ls(e)];
}
function Ls(t) {
  return t.replace(/start|end/g, (e) => U5[e]);
}
function G5(t, e, n) {
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
function X5(t, e, n, r) {
  const i = Wi(t);
  let a = G5(vn(t), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), e && (a = a.concat(a.map(Ls)))), a;
}
function Ba(t) {
  return t.replace(/left|right|bottom|top/g, (e) => q5[e]);
}
function Q5(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function N1(t) {
  return typeof t != "number" ? Q5(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Wa(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function Au(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const a = Zi(e), o = Zl(e), l = Wl(o), c = vn(e), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: f,
        y: r.y - i.height
      };
      break;
    case "bottom":
      p = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      p = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Wi(e)) {
    case "start":
      p[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      p[o] += m * (n && u ? -1 : 1);
      break;
  }
  return p;
}
const J5 = async (t, e, n) => {
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
  } = Au(u, r, c), m = r, p = {}, b = 0;
  for (let y = 0; y < l.length; y++) {
    const {
      name: g,
      fn: h
    } = l[y], {
      x,
      y: v,
      data: E,
      reset: w
    } = await h({
      x: f,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: i,
      middlewareData: p,
      rects: u,
      platform: o,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (f = x ?? f, d = v ?? d, p = {
      ...p,
      [g]: {
        ...p[g],
        ...E
      }
    }, w && b <= 50) {
      b++, typeof w == "object" && (w.placement && (m = w.placement), w.rects && (u = w.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : w.rects), {
        x: f,
        y: d
      } = Au(u, m, c)), y = -1;
      continue;
    }
  }
  return {
    x: f,
    y: d,
    placement: m,
    strategy: i,
    middlewareData: p
  };
};
async function Za(t, e) {
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
    padding: p = 0
  } = hn(e, t), b = N1(p), g = l[m ? d === "floating" ? "reference" : "floating" : d], h = Wa(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), x = d === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, v = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l.floating)), E = await (a.isElement == null ? void 0 : a.isElement(v)) ? await (a.getScale == null ? void 0 : a.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = Wa(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: x,
    offsetParent: v,
    strategy: c
  }) : x);
  return {
    top: (h.top - w.top + b.top) / E.y,
    bottom: (w.bottom - h.bottom + b.bottom) / E.y,
    left: (h.left - w.left + b.left) / E.x,
    right: (w.right - h.right + b.right) / E.x
  };
}
const e6 = (t) => ({
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
    } = hn(t, e) || {};
    if (u == null)
      return {};
    const d = N1(f), m = {
      x: n,
      y: r
    }, p = Zl(i), b = Wl(p), y = await o.getDimensions(u), g = p === "y", h = g ? "top" : "left", x = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", E = a.reference[b] + a.reference[p] - m[p] - a.floating[b], w = m[p] - a.reference[p], C = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let k = C ? C[v] : 0;
    (!k || !await (o.isElement == null ? void 0 : o.isElement(C))) && (k = l.floating[v] || a.floating[b]);
    const O = E / 2 - w / 2, P = k / 2 - y[b] / 2 - 1, _ = Sr(d[h], P), L = Sr(d[x], P), M = _, S = k - y[b] - L, $ = k / 2 - y[b] / 2 + O, R = Ts(M, $, S), F = !c.arrow && Wi(i) != null && $ != R && a.reference[b] / 2 - ($ < M ? _ : L) - y[b] / 2 < 0, N = F ? $ < M ? $ - M : $ - S : 0;
    return {
      [p]: m[p] + N,
      data: {
        [p]: R,
        centerOffset: $ - R - N,
        ...F && {
          alignmentOffset: N
        }
      },
      reset: F
    };
  }
}), t6 = function(t) {
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
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: y = !0,
        ...g
      } = hn(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const h = vn(i), x = vn(l) === l, v = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (x || !y ? [Ba(l)] : Y5(l));
      !m && b !== "none" && E.push(...X5(l, y, b, v));
      const w = [l, ...E], C = await Za(e, g), k = [];
      let O = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(C[h]), d) {
        const M = K5(i, o, v);
        k.push(C[M[0]], C[M[1]]);
      }
      if (O = [...O, {
        placement: i,
        overflows: k
      }], !k.every((M) => M <= 0)) {
        var P, _;
        const M = (((P = a.flip) == null ? void 0 : P.index) || 0) + 1, S = w[M];
        if (S)
          return {
            data: {
              index: M,
              overflows: O
            },
            reset: {
              placement: S
            }
          };
        let $ = (_ = O.filter((R) => R.overflows[0] <= 0).sort((R, F) => R.overflows[1] - F.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!$)
          switch (p) {
            case "bestFit": {
              var L;
              const R = (L = O.map((F) => [F.placement, F.overflows.filter((N) => N > 0).reduce((N, T) => N + T, 0)]).sort((F, N) => F[1] - N[1])[0]) == null ? void 0 : L[0];
              R && ($ = R);
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
function Iu(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Tu(t) {
  return z5.some((e) => t[e] >= 0);
}
const n6 = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = hn(t, e);
      switch (r) {
        case "referenceHidden": {
          const a = await Za(e, {
            ...i,
            elementContext: "reference"
          }), o = Iu(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Tu(o)
            }
          };
        }
        case "escaped": {
          const a = await Za(e, {
            ...i,
            altBoundary: !0
          }), o = Iu(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Tu(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function r6(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = vn(n), l = Wi(n), c = Zi(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = hn(e, t);
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: b
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
  return l && typeof b == "number" && (p = l === "end" ? b * -1 : b), c ? {
    x: p * f,
    y: m * u
  } : {
    x: m * u,
    y: p * f
  };
}
const i6 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await r6(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, a6 = function(t) {
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
              x: h,
              y: x
            } = g;
            return {
              x: h,
              y: x
            };
          }
        },
        ...c
      } = hn(t, e), u = {
        x: n,
        y: r
      }, f = await Za(e, c), d = Zi(vn(i)), m = Bl(d);
      let p = u[m], b = u[d];
      if (a) {
        const g = m === "y" ? "top" : "left", h = m === "y" ? "bottom" : "right", x = p + f[g], v = p - f[h];
        p = Ts(x, p, v);
      }
      if (o) {
        const g = d === "y" ? "top" : "left", h = d === "y" ? "bottom" : "right", x = b + f[g], v = b - f[h];
        b = Ts(x, b, v);
      }
      const y = l.fn({
        ...e,
        [m]: p,
        [d]: b
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
}, o6 = function(t) {
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
      } = hn(t, e), f = {
        x: n,
        y: r
      }, d = Zi(i), m = Bl(d);
      let p = f[m], b = f[d];
      const y = hn(l, e), g = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (c) {
        const v = m === "y" ? "height" : "width", E = a.reference[m] - a.floating[v] + g.mainAxis, w = a.reference[m] + a.reference[v] - g.mainAxis;
        p < E ? p = E : p > w && (p = w);
      }
      if (u) {
        var h, x;
        const v = m === "y" ? "width" : "height", E = ["top", "left"].includes(vn(i)), w = a.reference[d] - a.floating[v] + (E && ((h = o.offset) == null ? void 0 : h[d]) || 0) + (E ? 0 : g.crossAxis), C = a.reference[d] + a.reference[v] + (E ? 0 : ((x = o.offset) == null ? void 0 : x[d]) || 0) - (E ? g.crossAxis : 0);
        b < w ? b = w : b > C && (b = C);
      }
      return {
        [m]: p,
        [d]: b
      };
    }
  };
};
function pn(t) {
  return R1(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function at(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Gt(t) {
  var e;
  return (e = (R1(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function R1(t) {
  return t instanceof Node || t instanceof at(t).Node;
}
function Kt(t) {
  return t instanceof Element || t instanceof at(t).Element;
}
function Lt(t) {
  return t instanceof HTMLElement || t instanceof at(t).HTMLElement;
}
function Lu(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof at(t).ShadowRoot;
}
function Hi(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = pt(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function s6(t) {
  return ["table", "td", "th"].includes(pn(t));
}
function Hl(t) {
  const e = zl(), n = pt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function l6(t) {
  let e = Or(t);
  for (; Lt(e) && !ko(e); ) {
    if (Hl(e))
      return e;
    e = Or(e);
  }
  return null;
}
function zl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ko(t) {
  return ["html", "body", "#document"].includes(pn(t));
}
function pt(t) {
  return at(t).getComputedStyle(t);
}
function $o(t) {
  return Kt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Or(t) {
  if (pn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Lu(t) && t.host || // Fallback.
    Gt(t)
  );
  return Lu(e) ? e.host : e;
}
function P1(t) {
  const e = Or(t);
  return ko(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Lt(e) && Hi(e) ? e : P1(e);
}
function Oi(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = P1(t), a = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = at(i);
  return a ? e.concat(o, o.visualViewport || [], Hi(i) ? i : [], o.frameElement && n ? Oi(o.frameElement) : []) : e.concat(i, Oi(i, [], n));
}
function M1(t) {
  const e = pt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = Lt(t), a = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, l = ja(n) !== a || ja(r) !== o;
  return l && (n = a, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function ql(t) {
  return Kt(t) ? t : t.contextElement;
}
function yr(t) {
  const e = ql(t);
  if (!Lt(e))
    return mn(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = M1(e);
  let o = (a ? ja(n.width) : n.width) / r, l = (a ? ja(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const c6 = /* @__PURE__ */ mn(0);
function A1(t) {
  const e = at(t);
  return !zl() || !e.visualViewport ? c6 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function u6(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== at(t) ? !1 : e;
}
function Hn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = ql(t);
  let o = mn(1);
  e && (r ? Kt(r) && (o = yr(r)) : o = yr(t));
  const l = u6(a, n, r) ? A1(a) : mn(0);
  let c = (i.left + l.x) / o.x, u = (i.top + l.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = at(a), p = r && Kt(r) ? at(r) : r;
    let b = m.frameElement;
    for (; b && r && p !== m; ) {
      const y = yr(b), g = b.getBoundingClientRect(), h = pt(b), x = g.left + (b.clientLeft + parseFloat(h.paddingLeft)) * y.x, v = g.top + (b.clientTop + parseFloat(h.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += x, u += v, b = at(b).frameElement;
    }
  }
  return Wa({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function f6(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = Lt(n), a = Gt(n);
  if (n === a)
    return e;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = mn(1);
  const c = mn(0);
  if ((i || !i && r !== "fixed") && ((pn(n) !== "body" || Hi(a)) && (o = $o(n)), Lt(n))) {
    const u = Hn(n);
    l = yr(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - o.scrollLeft * l.x + c.x,
    y: e.y * l.y - o.scrollTop * l.y + c.y
  };
}
function d6(t) {
  return Array.from(t.getClientRects());
}
function I1(t) {
  return Hn(Gt(t)).left + $o(t).scrollLeft;
}
function m6(t) {
  const e = Gt(t), n = $o(t), r = t.ownerDocument.body, i = Tn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), a = Tn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + I1(t);
  const l = -n.scrollTop;
  return pt(r).direction === "rtl" && (o += Tn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: l
  };
}
function h6(t, e) {
  const n = at(t), r = Gt(t), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, l = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = zl();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function v6(t, e) {
  const n = Hn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, a = Lt(t) ? yr(t) : mn(1), o = t.clientWidth * a.x, l = t.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: l,
    x: c,
    y: u
  };
}
function Du(t, e, n) {
  let r;
  if (e === "viewport")
    r = h6(t, n);
  else if (e === "document")
    r = m6(Gt(t));
  else if (Kt(e))
    r = v6(e, n);
  else {
    const i = A1(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return Wa(r);
}
function T1(t, e) {
  const n = Or(t);
  return n === e || !Kt(n) || ko(n) ? !1 : pt(n).position === "fixed" || T1(n, e);
}
function p6(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Oi(t, [], !1).filter((l) => Kt(l) && pn(l) !== "body"), i = null;
  const a = pt(t).position === "fixed";
  let o = a ? Or(t) : t;
  for (; Kt(o) && !ko(o); ) {
    const l = pt(o), c = Hl(o);
    !c && l.position === "fixed" && (i = null), (a ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Hi(o) && !c && T1(t, o)) ? r = r.filter((f) => f !== o) : i = l, o = Or(o);
  }
  return e.set(t, r), r;
}
function g6(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? p6(e, this._c) : [].concat(n), r], l = o[0], c = o.reduce((u, f) => {
    const d = Du(e, f, i);
    return u.top = Tn(d.top, u.top), u.right = Sr(d.right, u.right), u.bottom = Sr(d.bottom, u.bottom), u.left = Tn(d.left, u.left), u;
  }, Du(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function y6(t) {
  return M1(t);
}
function b6(t, e, n) {
  const r = Lt(e), i = Gt(e), a = n === "fixed", o = Hn(t, !0, a, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = mn(0);
  if (r || !r && !a)
    if ((pn(e) !== "body" || Hi(i)) && (l = $o(e)), r) {
      const u = Hn(e, !0, a, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = I1(i));
  return {
    x: o.left + l.scrollLeft - c.x,
    y: o.top + l.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function Vu(t, e) {
  return !Lt(t) || pt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function L1(t, e) {
  const n = at(t);
  if (!Lt(t))
    return n;
  let r = Vu(t, e);
  for (; r && s6(r) && pt(r).position === "static"; )
    r = Vu(r, e);
  return r && (pn(r) === "html" || pn(r) === "body" && pt(r).position === "static" && !Hl(r)) ? n : r || l6(t) || n;
}
const E6 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || L1, a = this.getDimensions;
  return {
    reference: b6(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function w6(t) {
  return pt(t).direction === "rtl";
}
const C6 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: f6,
  getDocumentElement: Gt,
  getClippingRect: g6,
  getOffsetParent: L1,
  getElementRects: E6,
  getClientRects: d6,
  getDimensions: y6,
  getScale: yr,
  isElement: Kt,
  isRTL: w6
};
function x6(t, e) {
  let n = null, r;
  const i = Gt(t);
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
    const p = ia(f), b = ia(i.clientWidth - (u + d)), y = ia(i.clientHeight - (f + m)), g = ia(u), x = {
      rootMargin: -p + "px " + -b + "px " + -y + "px " + -g + "px",
      threshold: Tn(0, Sr(1, c)) || 1
    };
    let v = !0;
    function E(w) {
      const C = w[0].intersectionRatio;
      if (C !== c) {
        if (!v)
          return o();
        C ? o(!1, C) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 100);
      }
      v = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...x,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, x);
    }
    n.observe(t);
  }
  return o(!0), a;
}
function k6(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = ql(t), f = i || a ? [...u ? Oi(u) : [], ...Oi(e)] : [];
  f.forEach((h) => {
    i && h.addEventListener("scroll", n, {
      passive: !0
    }), a && h.addEventListener("resize", n);
  });
  const d = u && l ? x6(u, n) : null;
  let m = -1, p = null;
  o && (p = new ResizeObserver((h) => {
    let [x] = h;
    x && x.target === u && p && (p.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      p && p.observe(e);
    })), n();
  }), u && !c && p.observe(u), p.observe(e));
  let b, y = c ? Hn(t) : null;
  c && g();
  function g() {
    const h = Hn(t);
    y && (h.x !== y.x || h.y !== y.y || h.width !== y.width || h.height !== y.height) && n(), y = h, b = requestAnimationFrame(g);
  }
  return n(), () => {
    f.forEach((h) => {
      i && h.removeEventListener("scroll", n), a && h.removeEventListener("resize", n);
    }), d && d(), p && p.disconnect(), p = null, c && cancelAnimationFrame(b);
  };
}
const $6 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: C6,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return J5(t, e, {
    ...i,
    platform: a
  });
};
let dr = null, br = null;
Nr && (dr = document.createElement("div"), dr.className = "adm-px-tester", dr.style.setProperty("--size", "10"), document.body.appendChild(dr), br = document.createElement("div"), br.className = "adm-px-tester", document.body.appendChild(br));
function Ln(t) {
  return dr === null || br === null || dr.getBoundingClientRect().height === 10 ? t : (br.style.setProperty("--size", t.toString()), br.getBoundingClientRect().height);
}
const _6 = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), S6 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function O6(t) {
  var e;
  return (e = S6[t]) !== null && e !== void 0 ? e : t;
}
class F6 extends s.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = $0(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return s.Children.only(this.props.children);
  }
}
const En = "adm-popover", N6 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, D1 = Ee((t, e) => {
  const n = q(N6, t), r = O6(n.placement), [i, a] = ce({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  ke(e, () => ({
    show: () => a(!0),
    hide: () => a(!1),
    visible: i
  }), [i]);
  const o = V(null), l = V(null), c = V(null), u = dn(n.stopPropagation, W(n, s.createElement("div", {
    className: j(En, `${En}-${n.mode}`, {
      [`${En}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${En}-arrow`,
    ref: c
  }, s.createElement(_6, {
    className: `${En}-arrow-icon`
  })), s.createElement("div", {
    className: `${En}-inner`
  }, s.createElement("div", {
    className: `${En}-inner-content`
  }, n.content))))), [f, d] = X(null);
  function m() {
    var b, y, g;
    return Pe(this, void 0, void 0, function* () {
      const h = (y = (b = o.current) === null || b === void 0 ? void 0 : b.element) !== null && y !== void 0 ? y : null, x = l.current, v = c.current;
      if (d(h), !h || !x || !v)
        return;
      const {
        x: E,
        y: w,
        placement: C,
        middlewareData: k
      } = yield $6(h, x, {
        placement: r,
        middleware: [i6(Ln(12)), a6({
          padding: Ln(4),
          crossAxis: !1,
          limiter: o6()
        }), t6(), n6(), e6({
          element: v,
          padding: Ln(12)
        })]
      });
      Object.assign(x.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const O = C.split("-")[0], P = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[O], {
        x: _,
        y: L
      } = (g = k.arrow) !== null && g !== void 0 ? g : {};
      Object.assign(v.style, {
        left: _ != null ? `${_}px` : "",
        top: L != null ? `${L}px` : "",
        right: "",
        bottom: "",
        [P]: "calc(var(--arrow-size) * -1)"
      });
      const M = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[O];
      v.style.setProperty("--arrow-icon-rotate", M);
    });
  }
  Ae(() => {
    m();
  }), Q(() => {
    if (!f || !n.trigger)
      return;
    function b() {
      a((y) => !y);
    }
    return f.addEventListener("click", b), () => {
      f.removeEventListener("click", b);
    };
  }, [f, n.trigger]), Q(() => {
    const b = l.current;
    if (!(!f || !b || !i))
      return k6(f, b, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f, i]), mf(() => {
    n.trigger && a(!1);
  }, [() => {
    var b;
    return (b = o.current) === null || b === void 0 ? void 0 : b.element;
  }, l], ["click", "touchmove"]);
  const p = io(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(F6, {
    ref: o
  }, n.children), p && Ar(n.getContainer, u));
}), nn = "adm-popover-menu", R6 = Ee((t, e) => {
  const n = V(null);
  ke(e, () => n.current, []);
  const r = Qe((a) => {
    var o;
    const {
      onAction: l
    } = t;
    l && l(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [t.onAction]), i = de(() => {
    const a = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), o = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${nn}-list`
    }, s.createElement("div", {
      className: j(`${nn}-list-inner`, {
        [`${nn}-list-scroll`]: a
      }),
      style: {
        height: o
      }
    }, t.actions.map((l, c) => {
      var u;
      return s.createElement("a", {
        key: (u = l.key) !== null && u !== void 0 ? u : c,
        className: j(`${nn}-item`, "adm-plain-anchor", {
          [`${nn}-item-disabled`]: l.disabled
        }),
        onClick: () => {
          var f;
          l.disabled || (r(l), (f = l.onClick) === null || f === void 0 || f.call(l));
        }
      }, l.icon && s.createElement("div", {
        className: `${nn}-item-icon`
      }, l.icon), s.createElement("div", {
        className: `${nn}-item-text`
      }, l.text));
    })));
  }, [t.actions, r]);
  return s.createElement(D1, Object.assign({
    ref: n
  }, t, {
    className: j(nn, t.className),
    content: i
  }), t.children);
}), V1 = pe(D1, {
  Menu: R6
});
function Wo(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function P6(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function M6(t) {
  return typeof t == "function" && !P6(t) && t.defaultProps === void 0;
}
function j1(t) {
  return Ci.isFragment(t) ? !1 : Ci.isMemo(t) ? j1(t.type) : !M6(t.type);
}
const A6 = "__SPLIT__", Ye = "adm-form-item", I6 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), T6 = (t) => {
  var e;
  const {
    locale: n,
    form: r = {}
  } = ue(), {
    style: i,
    extra: a,
    label: o,
    help: l,
    helpIcon: c,
    required: u,
    children: f,
    htmlFor: d,
    hidden: m,
    arrow: p,
    arrowIcon: b,
    childElementPosition: y = "normal"
  } = q(r, t), g = it(Vl), h = t.hasFeedback !== void 0 ? t.hasFeedback : g.hasFeedback, x = t.layout || g.layout, v = (e = t.disabled) !== null && e !== void 0 ? e : g.disabled, E = (() => {
    const {
      requiredMarkStyle: k
    } = g;
    switch (k) {
      case "asterisk":
        return u && s.createElement("span", {
          className: `${Ye}-required-asterisk`
        }, "*");
      case "text-required":
        return u && s.createElement("span", {
          className: `${Ye}-required-text`
        }, "(", n.Form.required, ")");
      case "text-optional":
        return !u && s.createElement("span", {
          className: `${Ye}-required-text`
        }, "(", n.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), w = !!o && s.createElement("label", {
    className: `${Ye}-label`,
    htmlFor: d
  }, o, E, l && s.createElement(V1, {
    content: l,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${Ye}-label-help`,
    onClick: (k) => {
      k.stopPropagation(), k.preventDefault();
    }
  }, c || s.createElement(yv, null)))), C = (!!t.description || h) && s.createElement(s.Fragment, null, t.description, h && s.createElement(s.Fragment, null, t.errors.map((k, O) => s.createElement("div", {
    key: `error-${O}`,
    className: `${Ye}-feedback-error`
  }, k)), t.warnings.map((k, O) => s.createElement("div", {
    key: `warning-${O}`,
    className: `${Ye}-feedback-warning`
  }, k))));
  return W(t, s.createElement(At.Item, {
    style: i,
    title: x === "vertical" && w,
    prefix: x === "horizontal" && w,
    extra: a,
    description: C,
    className: j(Ye, `${Ye}-${x}`, {
      [`${Ye}-hidden`]: m,
      [`${Ye}-has-error`]: t.errors.length
    }),
    disabled: v,
    onClick: t.onClick,
    clickable: t.clickable,
    arrowIcon: b || p
  }, s.createElement("div", {
    className: j(`${Ye}-child`, `${Ye}-child-position-${y}`)
  }, s.createElement("div", {
    className: j(`${Ye}-child-inner`)
  }, f))));
}, L6 = (t) => {
  const {
    // 样式相关
    style: e,
    // FormItem 相关
    label: n,
    help: r,
    helpIcon: i,
    extra: a,
    hasFeedback: o,
    name: l,
    required: c,
    noStyle: u,
    hidden: f,
    layout: d,
    childElementPosition: m,
    description: p,
    // Field 相关
    disabled: b,
    rules: y,
    children: g,
    messageVariables: h,
    trigger: x = "onChange",
    validateTrigger: v = x,
    onClick: E,
    shouldUpdate: w,
    dependencies: C,
    clickable: k,
    arrow: O,
    arrowIcon: P
  } = t, _ = un(t, ["style", "label", "help", "helpIcon", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow", "arrowIcon"]), {
    name: L
  } = it(Vl), {
    validateTrigger: M
  } = it(F1), S = H5(v, M, x), $ = V(null), R = V(0);
  R.current += 1;
  const [F, N] = X({}), T = Qe((K, Y) => {
    N((re) => {
      const se = Object.assign({}, re), ve = Y.join(A6);
      return K.destroy ? delete se[ve] : se[ve] = K, se;
    });
  }, [N]);
  function A(K, Y, re, se) {
    var ve, U;
    if (u && !f)
      return K;
    const ee = (ve = re == null ? void 0 : re.errors) !== null && ve !== void 0 ? ve : [], J = Object.keys(F).reduce((fe, xe) => {
      var qe, De;
      const Vt = (De = (qe = F[xe]) === null || qe === void 0 ? void 0 : qe.errors) !== null && De !== void 0 ? De : [];
      return Vt.length && (fe = [...fe, ...Vt]), fe;
    }, ee), te = (U = re == null ? void 0 : re.warnings) !== null && U !== void 0 ? U : [], ie = Object.keys(F).reduce((fe, xe) => {
      var qe, De;
      const Vt = (De = (qe = F[xe]) === null || qe === void 0 ? void 0 : qe.warnings) !== null && De !== void 0 ? De : [];
      return Vt.length && (fe = [...fe, ...Vt]), fe;
    }, te);
    return W(t, s.createElement(T6, {
      style: e,
      label: n,
      extra: a,
      help: r,
      helpIcon: i,
      description: p,
      required: se,
      disabled: b,
      hasFeedback: o,
      htmlFor: Y,
      errors: J,
      warnings: ie,
      onClick: E && ((fe) => E(fe, $)),
      hidden: f,
      layout: d,
      childElementPosition: m,
      clickable: k,
      arrow: O,
      arrowIcon: P
    }, s.createElement(Ru.Provider, {
      value: T
    }, K)));
  }
  const D = typeof g == "function";
  if (!l && !D && !t.dependencies)
    return A(g);
  let B = {};
  B.label = typeof n == "string" ? n : "", h && (B = Object.assign(Object.assign({}, B), h));
  const H = it(Ru), Z = (K) => {
    if (u && H) {
      const Y = K.name;
      H(K, Y);
    }
  };
  return s.createElement(Tl, Object.assign({}, _, {
    name: l,
    shouldUpdate: w,
    dependencies: C,
    rules: y,
    trigger: x,
    validateTrigger: S,
    onMetaChange: Z,
    messageVariables: B
  }), (K, Y, re) => {
    let se = null;
    const ve = c !== void 0 ? c : y && y.some((J) => !!(J && typeof J == "object" && J.required)), U = Wo(l).length && Y ? Y.name : [], ee = (U.length > 0 && L ? [L, ...U] : U).join("_");
    if (D)
      (w || C) && !l && (se = g(re));
    else if (!(C && !l))
      if (s.isValidElement(g)) {
        g.props.defaultValue;
        const J = Object.assign(Object.assign({}, g.props), K);
        j1(g) && (J.ref = (ie) => {
          const fe = g.ref;
          fe && (typeof fe == "function" && fe(ie), "current" in fe && (fe.current = ie)), $.current = ie;
        }), J.id || (J.id = ee), (/* @__PURE__ */ new Set([...Wo(x), ...Wo(S)])).forEach((ie) => {
          J[ie] = (...fe) => {
            var xe, qe, De;
            (xe = K[ie]) === null || xe === void 0 || xe.call(K, ...fe), (De = (qe = g.props)[ie]) === null || De === void 0 || De.call(qe, ...fe);
          };
        }), se = s.createElement(I6, {
          value: K[t.valuePropName || "value"],
          update: R.current
        }, s.cloneElement(g, J));
      } else
        se = g;
    return A(se, ee, Y, ve);
  });
}, D6 = (t) => {
  const e = ff(), n = it(Zn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((a) => s.createElement(V6, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: e
  })));
}, V6 = ze((t) => {
  const e = Dl(t.namePath, t.form);
  return Li(() => {
    t.onChange();
  }, [e]), null;
}), Ry = pe(P5, {
  Item: L6,
  Subscribe: D6,
  Header: b1,
  Array: w1,
  useForm: Ll,
  useWatch: Dl
}), B1 = "adm-grid", j6 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = Pn(n[0]), e["--gap-vertical"] = Pn(n[1])) : e["--gap"] = Pn(n)), W(t, s.createElement("div", {
    className: B1,
    style: e
  }, t.children));
}, B6 = (t) => {
  const e = q({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${B1}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, W1 = pe(j6, {
  Item: B6
}), aa = () => [1, 0, 0, 1, 0, 0], ju = (t) => t[4], Bu = (t) => t[5], Gr = (t) => t[0], Xr = (t, e, n) => Z1([1, 0, 0, 1, e, n], t), W6 = (t, e, n = e) => Z1([e, 0, 0, n, 0, 0], t), Z6 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], Z1 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], H6 = w3([fd, s3]), Zo = "adm-image-viewer", H1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n,
    imageRender: r,
    index: i
  } = t, a = V([]), o = V(null), l = V(null), [{
    matrix: c
  }, u] = Le(() => ({
    matrix: aa(),
    config: {
      tension: 200
    }
  })), f = Jo(o), d = Jo(l), m = V(!1), p = (h) => {
    if (!f || !d)
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
    const x = -f.width / 2, v = -f.height / 2, E = -d.width / 2, w = -d.height / 2, C = Gr(h), k = C * d.width, O = C * d.height, P = x - (k - f.width), _ = x, L = v - (O - f.height), M = v, [S, $] = Z6(h, [E, w]);
    return {
      x: {
        position: S,
        minX: P,
        maxX: _
      },
      y: {
        position: $,
        minY: L,
        maxY: M
      }
    };
  }, b = (h, x, v, E = 0) => [h <= x - E, h >= v + E], y = (h, x, v = !1) => {
    if (!f || !d)
      return h;
    const E = Gr(h), w = E * d.width, C = E * d.height, {
      x: {
        position: k,
        minX: O,
        maxX: P
      },
      y: {
        position: _,
        minY: L,
        maxY: M
      }
    } = p(h);
    if (x === "translate") {
      let S = k, $ = _;
      return w > f.width ? S = v ? Ne(k, O, P) : xi(k, O, P, E * 50) : S = -w / 2, C > f.height ? $ = v ? Ne(_, L, M) : xi(_, L, M, E * 50) : $ = -C / 2, Xr(h, S - k, $ - _);
    }
    if (x === "scale" && v) {
      const [S, $] = [w > f.width ? Ne(k, O, P) : -w / 2, C > f.height ? Ne(_, L, M) : -C / 2];
      return Xr(h, S - k, $ - _);
    }
    return h;
  };
  H6({
    onDrag: (h) => {
      var x;
      if (h.first) {
        const {
          x: {
            position: E,
            minX: w,
            maxX: C
          }
        } = p(c.get());
        a.current = b(E, w, C);
        return;
      }
      if (h.pinching)
        return h.cancel();
      if (h.tap && h.elapsedTime > 0 && h.elapsedTime < 1e3) {
        (x = t.onTap) === null || x === void 0 || x.call(t);
        return;
      }
      const v = Gr(c.get());
      if (e && (e.current = v !== 1), !m.current && v <= 1)
        u.start({
          matrix: aa()
        });
      else {
        const E = c.get(), w = [h.offset[0] - ju(E), h.offset[1] - Bu(E)], C = Xr(E, ...h.last ? [w[0] + h.velocity[0] * h.direction[0] * 200, w[1] + h.velocity[1] * h.direction[1] * 200] : w);
        u.start({
          matrix: y(C, "translate", h.last),
          immediate: !h.last
        });
        const {
          x: {
            position: k,
            minX: O,
            maxX: P
          }
        } = p(C);
        h.last && a.current.some((_) => _) && b(k, O, P).some((_) => _) && (e && (e.current = !1), u.start({
          matrix: aa()
        }));
      }
    },
    onPinch: (h) => {
      var x;
      m.current = !h.last;
      const [v] = h.offset;
      if (v < 0)
        return;
      let E;
      n === "auto" ? E = f && d ? Math.max(f.height / d.height, f.width / d.width) : 1 : E = n;
      const w = h.last ? Ne(v, 1, E) : v;
      if ((x = t.onZoomChange) === null || x === void 0 || x.call(t, w), h.last && w <= 1)
        u.start({
          matrix: aa()
        }), e && (e.current = !1);
      else {
        if (!f)
          return;
        const C = c.get(), k = Gr(C), O = h.origin[0] - f.width / 2, P = h.origin[1] - f.height / 2;
        let _ = Xr(C, -O, -P);
        _ = W6(_, w / k), _ = Xr(_, O, P), u.start({
          matrix: y(_, "scale", h.last),
          immediate: !h.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: o,
    drag: {
      from: () => [ju(c.get()), Bu(c.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Gr(c.get()), 0],
      pointer: {
        touch: !0
      }
    }
  });
  const g = typeof r == "function" && r(t.image, {
    index: i
  });
  return s.createElement("div", {
    className: `${Zo}-slide`
  }, s.createElement("div", {
    className: `${Zo}-control`,
    ref: o
  }, s.createElement(Ce.div, {
    className: `${Zo}-image-wrapper`,
    style: {
      matrix: c
    }
  }, g || s.createElement("img", {
    ref: l,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, Ho = "adm-image-viewer", z6 = Ee((t, e) => {
  const n = window.innerWidth + Ln(16), [{
    x: r
  }, i] = Le(() => ({
    x: t.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = t.images.length;
  function o(u, f = !1) {
    var d;
    const m = Ne(u, 0, a - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  ke(e, () => ({
    swipeTo: o
  }));
  const l = V(!1), c = Dt((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, p = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(Ne(Math.round((f + p) / n), d, m));
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
    className: `${Ho}-slides`
  }, c()), s.createElement(Ce.div, {
    className: `${Ho}-indicator`
  }, r.to((u) => `${Ne(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), s.createElement(Ce.div, {
    className: `${Ho}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(H1, {
    key: f,
    image: u,
    onTap: t.onTap,
    maxZoom: t.maxZoom,
    imageRender: t.imageRender,
    index: f,
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
}), Ha = "adm-image-viewer", z1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, q1 = (t) => {
  var e, n, r;
  const i = q(z1, t), a = s.createElement(Ai, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: j(`${Ha}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, (i.image || typeof i.imageRender == "function") && s.createElement(H1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom,
    imageRender: i.imageRender
  })), i.image && s.createElement("div", {
    className: `${Ha}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(Dr, {
    position: "bottom"
  })));
  return Ar(i.getContainer, a);
}, q6 = Object.assign(Object.assign({}, z1), {
  defaultIndex: 0
}), U1 = Ee((t, e) => {
  var n, r, i;
  const a = q(q6, t), [o, l] = X(a.defaultIndex), c = V(null);
  ke(e, () => ({
    swipeTo: (d, m) => {
      var p;
      l(d), (p = c.current) === null || p === void 0 || p.swipeTo(d, m);
    }
  }));
  const u = Qe((d) => {
    var m;
    d !== o && (l(d), (m = a.onIndexChange) === null || m === void 0 || m.call(a, d));
  }, [a.onIndexChange, o]), f = s.createElement(Ai, {
    visible: a.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: a.afterClose,
    destroyOnClose: !0,
    className: (n = a == null ? void 0 : a.classNames) === null || n === void 0 ? void 0 : n.mask
  }, s.createElement("div", {
    className: j(`${Ha}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && s.createElement(z6, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom,
    imageRender: a.imageRender
  })), a.images && s.createElement("div", {
    className: `${Ha}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), s.createElement(Dr, {
    position: "bottom"
  })));
  return Ar(a.getContainer, f);
}), Fr = /* @__PURE__ */ new Set();
function U6(t) {
  Ul();
  const e = Bn(s.createElement(q1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Fr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Fr.add(e), e;
}
function K6(t) {
  Ul();
  const e = Bn(s.createElement(U1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Fr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Fr.add(e), e;
}
function Ul() {
  Fr.forEach((t) => {
    t.close();
  }), Fr.clear();
}
const Y6 = pe(U1, {
  show: K6
}), G6 = pe(q1, {
  Multi: Y6,
  show: U6,
  clear: Ul
}), wn = "adm-space", X6 = {
  direction: "horizontal"
}, Kl = (t) => {
  const e = q(X6, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(wn, {
      [`${wn}-wrap`]: e.wrap,
      [`${wn}-block`]: e.block,
      [`${wn}-${n}`]: !0,
      [`${wn}-align-${e.align}`]: !!e.align,
      [`${wn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${wn}-item`
  }, i))));
}, Cn = "adm-image-uploader", Q6 = (t) => {
  const {
    locale: e
  } = ue(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: l
  } = t, c = de(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  Q(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${Cn}-cell-mask`
    }, s.createElement("span", {
      className: `${Cn}-cell-loading`
    }, s.createElement(_l, {
      color: "white"
    }), s.createElement("span", {
      className: `${Cn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${Cn}-cell-delete`,
      onClick: o
    }, a);
  }
  return s.createElement("div", {
    className: j(`${Cn}-cell`, t.status === "fail" && `${Cn}-cell-fail`)
  }, s.createElement(lo, {
    className: `${Cn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, Wu = Q6, Pt = "adm-image-uploader", J6 = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(ao, {
    className: `${Pt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, Py = Ee((t, e) => {
  const {
    locale: n
  } = ue(), r = q(J6, t), {
    columns: i
  } = r, [a, o] = ce(r), [l, c] = X([]), u = V(null), f = Jo(u), d = V(null), [m, p] = X(80), b = V(null);
  Ae(() => {
    const S = d.current;
    if (i && f && S) {
      const $ = f.width, R = Td(window.getComputedStyle(S).getPropertyValue("height"));
      p(($ - R * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const y = {
    "--cell-size": m + "px"
  };
  Ae(() => {
    c((S) => S.filter(($) => $.url === void 0 ? !0 : !a.some((R) => R.url === $.url)));
  }, [a]), Ae(() => {
    var S;
    (S = r.onUploadQueueChange) === null || S === void 0 || S.call(r, l.map(($) => ({
      id: $.id,
      status: $.status
    })));
  }, [l]);
  const g = V(0), {
    maxCount: h,
    onPreview: x,
    renderItem: v
  } = r;
  function E(S, $) {
    return Pe(this, void 0, void 0, function* () {
      const {
        beforeUpload: R
      } = r;
      let F = S;
      return F = yield R == null ? void 0 : R(S, $), F;
    });
  }
  function w(S) {
    return r.showFailed ? S : S.filter(($) => $.status !== "fail");
  }
  function C(S) {
    var $;
    return Pe(this, void 0, void 0, function* () {
      S.persist();
      const {
        files: R
      } = S.target;
      if (!R)
        return;
      let F = [].slice.call(R);
      if (S.target.value = "", r.beforeUpload) {
        const A = F.map((D) => E(D, F));
        yield Promise.all(A).then((D) => {
          F = D.filter(Boolean);
        });
      }
      if (F.length === 0)
        return;
      if (h > 0) {
        const A = a.length + F.length - h;
        A > 0 && (F = F.slice(0, F.length - A), ($ = r.onCountExceed) === null || $ === void 0 || $.call(r, A));
      }
      const N = F.map((A) => ({
        id: g.current++,
        status: "pending",
        file: A
      }));
      c((A) => [...w(A), ...N]);
      const T = [];
      yield Promise.all(N.map((A, D) => Pe(this, void 0, void 0, function* () {
        try {
          const B = yield r.upload(A.file);
          T[D] = B, c((H) => H.map((Z) => Z.id === A.id ? Object.assign(Object.assign({}, Z), {
            status: "success",
            url: B.url
          }) : Z));
        } catch (B) {
          c((H) => H.map((Z) => Z.id === A.id ? Object.assign(Object.assign({}, Z), {
            status: "fail"
          }) : Z)), console.error(B);
        }
      }))), o((A) => A.concat(T).filter(Boolean));
    });
  }
  const k = V(null);
  function O(S) {
    k.current = G6.Multi.show({
      images: a.map(($) => $.url),
      defaultIndex: S,
      onClose: () => {
        k.current = null;
      }
    });
  }
  Ri(() => {
    var S;
    (S = k.current) === null || S === void 0 || S.close();
  });
  const P = w(l), _ = r.showUpload && (h === 0 || a.length + P.length < h), L = () => a.map((S, $) => {
    var R, F;
    const N = s.createElement(Wu, {
      key: (R = S.key) !== null && R !== void 0 ? R : $,
      url: (F = S.thumbnailUrl) !== null && F !== void 0 ? F : S.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && O($), x && x($, S);
      },
      onDelete: () => Pe(void 0, void 0, void 0, function* () {
        var T;
        (yield (T = r.onDelete) === null || T === void 0 ? void 0 : T.call(r, S)) !== !1 && o(a.filter((D, B) => B !== $));
      })
    });
    return v ? v(N, S, a) : N;
  }), M = s.createElement(s.Fragment, null, L(), l.map((S) => !r.showFailed && S.status === "fail" ? null : s.createElement(Wu, {
    key: S.id,
    file: S.file,
    deletable: S.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: S.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(l.filter(($) => $.id !== S.id));
    }
  })), s.createElement("div", {
    className: `${Pt}-upload-button-wrap`,
    style: _ ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${Pt}-cell ${Pt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${Pt}-upload-button-icon`
  }, s.createElement(Qf, null))), !r.disableUpload && s.createElement("input", {
    "aria-label": n.ImageUploader.upload,
    ref: b,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${Pt}-input`,
    onChange: C
  })));
  return ke(e, () => ({
    get nativeElement() {
      return b.current;
    }
  })), W(r, s.createElement("div", {
    className: Pt,
    ref: u
  }, i ? s.createElement(W1, {
    className: `${Pt}-grid`,
    columns: i,
    style: y
  }, s.createElement("div", {
    className: `${Pt}-gap-measure`,
    ref: d
  }), M.props.children) : s.createElement(Kl, {
    className: `${Pt}-space`,
    wrap: !0,
    block: !0
  }, M.props.children)));
}), K1 = () => null, ar = "adm-index-bar", e7 = (t) => {
  const [e, n] = X(!1);
  return s.createElement("div", {
    className: j(`${ar}-sidebar`, {
      [`${ar}-sidebar-interacting`]: e
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
      className: `${ar}-sidebar-row`,
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
      className: `${ar}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: j(`${ar}-sidebar-item`, {
        [`${ar}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, or = "adm-index-bar", t7 = {
  sticky: !0
}, n7 = Ee((t, e) => {
  const n = q(t7, t), r = Ln(35), i = V(null), a = [], o = [];
  yn(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === K1 && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(W(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${or}-anchor`
    }, s.createElement("div", {
      className: `${or}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = X(() => {
    const d = a[0];
    return d ? d.index : null;
  });
  ke(e, () => ({
    scrollTo: u
  }));
  function u(d) {
    var m;
    const p = i.current;
    if (!p)
      return;
    const b = p.children;
    for (let y = 0; y < b.length; y++) {
      const g = b.item(y);
      if (!g)
        continue;
      if (g.dataset.index === d) {
        p.scrollTop = g.offsetTop, c(d), l !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
        return;
      }
    }
  }
  const {
    run: f
  } = Ka(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const p = m.scrollTop, b = m.getElementsByClassName(`${or}-anchor`);
    for (let y = 0; y < b.length; y++) {
      const g = b.item(y);
      if (!g)
        continue;
      const h = g.dataset.index;
      if (h && g.offsetTop + g.clientHeight - r > p) {
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
    className: j(`${or}`, {
      [`${or}-sticky`]: n.sticky
    })
  }, s.createElement(e7, {
    indexItems: a,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${or}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), My = pe(n7, {
  Panel: K1
});
function r7(t) {
  return t === window;
}
const Y1 = "adm-infinite-scroll", i7 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(a7, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, Ay = (t) => {
  const e = q(i7, t), [n, r] = X(!1), i = th((p) => Pe(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(p);
    } catch (b) {
      throw r(!0), b;
    }
  })), a = V(null), [o, l] = X({}), c = V(o), [u, f] = X(), {
    run: d
  } = Ka(() => Pe(void 0, void 0, void 0, function* () {
    if (c.current !== o || !e.hasMore)
      return;
    const p = a.current;
    if (!p || !p.offsetParent)
      return;
    const b = $a(p);
    if (f(b), !b)
      return;
    const g = p.getBoundingClientRect().top;
    if ((r7(b) ? window.innerHeight : b.getBoundingClientRect().bottom) >= g - e.threshold) {
      const x = {};
      c.current = x;
      try {
        yield i(!1), l(x);
      } catch {
      }
    }
  }), {
    wait: 100,
    leading: !0,
    trailing: !0
  });
  Q(() => {
    d();
  }), Q(() => {
    if (!a.current || !u)
      return;
    function b() {
      d();
    }
    return u.addEventListener("scroll", b), () => {
      u.removeEventListener("scroll", b);
    };
  }, [u]);
  function m() {
    return Pe(this, void 0, void 0, function* () {
      r(!1);
      try {
        yield i(!0), l(c.current);
      } catch {
      }
    });
  }
  return W(e, s.createElement("div", {
    className: Y1,
    ref: a
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, a7 = (t) => {
  const {
    locale: e
  } = ue();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${Y1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(pd, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function G1({
  onEnterPress: t,
  onKeyDown: e,
  nativeInputRef: n,
  enterKeyHint: r
}) {
  const i = (a) => {
    t && (a.code === "Enter" || a.keyCode === 13) && t(a), e == null || e(a);
  };
  return Ae(() => {
    const a = n.current;
    if (!(!r || !a))
      return a.setAttribute("enterkeyhint", r), () => {
        a.removeAttribute("enterkeyhint");
      };
  }, [r]), i;
}
const oa = "adm-input", o7 = {
  defaultValue: "",
  clearIcon: s.createElement(hl, null),
  onlyShowClearWhenFocus: !0
}, X1 = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = ue(), i = q(o7, r, t), [a, o] = ce(i), [l, c] = X(!1), u = V(!1), f = V(null), d = G1({
    onEnterPress: i.onEnterPress,
    onKeyDown: i.onKeyDown,
    nativeInputRef: f,
    enterKeyHint: i.enterKeyHint
  });
  ke(e, () => ({
    clear: () => {
      o("");
    },
    focus: () => {
      var b;
      (b = f.current) === null || b === void 0 || b.focus();
    },
    blur: () => {
      var b;
      (b = f.current) === null || b === void 0 || b.blur();
    },
    get nativeElement() {
      return f.current;
    }
  }));
  function m() {
    let b = a;
    if (i.type === "number") {
      const y = b && Ne(parseFloat(b), i.min, i.max).toString();
      Number(b) !== Number(y) && (b = y);
    }
    b !== a && o(b);
  }
  const p = !i.clearable || !a || i.readOnly ? !1 : i.onlyShowClearWhenFocus ? l : !0;
  return W(i, s.createElement("div", {
    className: j(`${oa}`, i.disabled && `${oa}-disabled`)
  }, s.createElement("input", {
    ref: f,
    className: `${oa}-element`,
    value: a,
    onChange: (b) => {
      o(b.target.value);
    },
    onFocus: (b) => {
      var y;
      c(!0), (y = i.onFocus) === null || y === void 0 || y.call(i, b);
    },
    onBlur: (b) => {
      var y;
      c(!1), m(), (y = i.onBlur) === null || y === void 0 || y.call(i, b);
    },
    onPaste: i.onPaste,
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
    onCompositionStart: (b) => {
      var y;
      u.current = !0, (y = i.onCompositionStart) === null || y === void 0 || y.call(i, b);
    },
    onCompositionEnd: (b) => {
      var y;
      u.current = !1, (y = i.onCompositionEnd) === null || y === void 0 || y.call(i, b);
    },
    onClick: i.onClick,
    step: i.step,
    role: i.role,
    "aria-valuenow": i["aria-valuenow"],
    "aria-valuemax": i["aria-valuemax"],
    "aria-valuemin": i["aria-valuemin"],
    "aria-label": i["aria-label"]
  }), p && s.createElement("div", {
    className: `${oa}-clear`,
    onMouseDown: (b) => {
      b.preventDefault();
    },
    onClick: () => {
      var b, y;
      o(""), (b = i.onClear) === null || b === void 0 || b.call(i), Y3() && u.current && (u.current = !1, (y = f.current) === null || y === void 0 || y.blur());
    },
    "aria-label": n.Input.clear
  }, i.clearIcon)));
}), Ft = "adm-jumbo-tabs", s7 = () => null, l7 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  yn(t.children, (d, m) => {
    if (!zn(d))
      return;
    const p = d.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const b = o.push(d);
    i[p] = b - 1;
  });
  const [l, c] = ce({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Ad(n, i[l]);
  return Di(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Ft,
    ref: r
  }, s.createElement("div", {
    className: `${Ft}-header`
  }, s.createElement(Id, {
    scrollTrackRef: n
  }), s.createElement(Ce.div, {
    className: `${Ft}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, s.createElement("div", {
    key: d.key,
    className: `${Ft}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: j(`${Ft}-tab`, {
      [`${Ft}-tab-active`]: d.key === l,
      [`${Ft}-tab-disabled`]: d.props.disabled
    })
  }, s.createElement("div", {
    className: `${Ft}-tab-title`
  }, d.props.title), s.createElement("div", {
    className: `${Ft}-tab-description`
  }, d.props.description))))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(Ir, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Ft}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, Iy = pe(l7, {
  Tab: s7
}), c7 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, s.createElement(qt, {
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
}, u7 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, Q1 = (t) => {
  const e = q(u7, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Bt("image-container")
  }, s.createElement(lo, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Bt("header")
  }, s.createElement(wi, null, e.header)), !!e.title && s.createElement("div", {
    className: Bt("title")
  }, e.title), s.createElement("div", {
    className: Bt("content")
  }, typeof e.content == "string" ? s.createElement(wi, null, e.content) : e.content), s.createElement(Kl, {
    direction: "vertical",
    block: !0,
    className: j(Bt("footer"), e.actions.length === 0 && Bt("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(c7, {
    key: r.key,
    action: r,
    onAction: () => Pe(void 0, void 0, void 0, function* () {
      var a, o, l;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = e.onAction) === null || o === void 0 ? void 0 : o.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(Gd, {
    className: j(Bt(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: j(Bt("body"), e.image && Bt("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function Bt(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const Ds = /* @__PURE__ */ new Set();
function Yl(t) {
  const e = Bn(s.createElement(Q1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Ds.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Ds.add(e.close), e;
}
function f7(t) {
  const e = {
    confirmText: Fi().locale.Modal.ok
  }, n = q(e, t);
  return new Promise((r) => {
    Yl(Object.assign(Object.assign({}, n), {
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
const d7 = {
  confirmText: "确认",
  cancelText: "取消"
};
function m7(t) {
  const {
    locale: e
  } = Fi(), n = q(d7, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Yl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Pe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Pe(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function h7() {
  Ds.forEach((t) => {
    t();
  });
}
const Ty = pe(Q1, {
  show: Yl,
  alert: f7,
  confirm: m7,
  clear: h7
}), sr = "adm-nav-bar", Zu = s.createElement(pv, null), Ly = (t) => {
  const {
    navBar: e = {}
  } = ue(), n = q(e, t), {
    back: r,
    backIcon: i,
    backArrow: a
  } = n, o = e.backIcon || Zu, l = gn(Zu, e.backIcon, a === !0 ? o : a, i === !0 ? o : i);
  return W(n, s.createElement("div", {
    className: j(sr)
  }, s.createElement("div", {
    className: `${sr}-left`,
    role: "button"
  }, r !== null && s.createElement("div", {
    className: `${sr}-back`,
    onClick: n.onBack
  }, l && s.createElement("span", {
    className: `${sr}-back-arrow`
  }, l), s.createElement("span", {
    "aria-hidden": "true"
  }, r)), n.left), s.createElement("div", {
    className: `${sr}-title`
  }, n.children), s.createElement("div", {
    className: `${sr}-right`
  }, n.right)));
}, lt = "adm-notice-bar", v7 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: s.createElement(wv, null),
  wrap: !1,
  shape: "rectangular",
  bordered: "block"
}, Dy = ze((t) => {
  const {
    noticeBar: e = {}
  } = ue(), n = q(v7, e, t), r = gn(s.createElement(ao, {
    className: `${lt}-close-icon`
  }), e.closeIcon, t.closeIcon), i = V(null), a = V(null), [o, l] = X(!0), c = n.speed, u = V(!0), f = V(!1);
  function d() {
    if (u.current || n.wrap)
      return;
    const m = i.current, p = a.current;
    if (!m || !p)
      return;
    if (m.offsetWidth >= p.offsetWidth) {
      f.current = !1, p.style.removeProperty("transition-duration"), p.style.removeProperty("transform");
      return;
    }
    if (f.current)
      return;
    const b = !p.style.transform;
    p.style.transitionDuration = "0s", b ? p.style.transform = "translateX(0)" : p.style.transform = `translateX(${m.offsetWidth}px)`;
    const y = b ? p.offsetWidth : m.offsetWidth + p.offsetWidth;
    f.current = !0, p.style.transitionDuration = `${Math.round(y / c)}s`, p.style.transform = `translateX(-${p.offsetWidth}px)`;
  }
  return Sh(() => {
    u.current = !1, d();
  }, n.delay), Di(() => {
    d();
  }, i), kl(() => {
    d();
  }, a, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), o ? W(n, s.createElement("div", {
    className: j(lt, `${lt}-${n.color}`, `${lt}-${n.shape}`, {
      [`${lt}-wrap`]: n.wrap,
      [`${lt}-bordered`]: n.bordered === !0,
      [`${lt}-without-border`]: n.bordered === !1
    }),
    onClick: n.onClick
  }, n.icon && s.createElement("span", {
    className: `${lt}-left`
  }, n.icon), s.createElement("span", {
    ref: i,
    className: `${lt}-content`
  }, s.createElement("span", {
    onTransitionEnd: () => {
      f.current = !1, d();
    },
    ref: a,
    className: `${lt}-content-inner`
  }, n.content)), (n.closeable || n.extra) && s.createElement("span", {
    className: `${lt}-right`
  }, n.extra, n.closeable && s.createElement("div", {
    className: `${lt}-close`,
    onClick: () => {
      var m;
      l(!1), (m = n.onClose) === null || m === void 0 || m.call(n);
    }
  }, r)))) : null;
});
function p7(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const Se = "adm-number-keyboard", g7 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Vy = (t) => {
  const e = q(g7, t), {
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
  } = ue(), d = V(null), m = de(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], C = l ? p7(w) : w, k = Array.isArray(o) ? o : [o];
    return C.push("0"), a ? (k.length === 2 && C.splice(9, 0, k.pop()), C.push(k[0] || "")) : (C.splice(9, 0, k[0] || ""), C.push(k[1] || "BACKSPACE")), C;
  }, [o, a, l, l && n]), p = V(-1), b = V(-1), y = Yt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), g = () => {
    p.current = window.setTimeout(() => {
      y(), b.current = window.setInterval(y, 150);
    }, 700);
  }, h = () => {
    clearTimeout(p.current), clearInterval(b.current);
  }, x = (w, C) => {
    var k, O;
    switch (w.preventDefault(), C) {
      case "BACKSPACE":
        y == null || y();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && ((O = e.onClose) === null || O === void 0 || O.call(e));
        break;
      default:
        C !== "" && (u == null || u(C));
        break;
    }
  }, v = () => !c && !r ? null : s.createElement("div", {
    className: j(`${Se}-header`, {
      [`${Se}-header-with-title`]: !!r
    })
  }, !!r && s.createElement("div", {
    className: `${Se}-title`,
    "aria-label": r
  }, r), c && s.createElement("span", {
    className: `${Se}-header-close-button`,
    onClick: () => {
      var w;
      (w = e.onClose) === null || w === void 0 || w.call(e);
    },
    role: "button",
    title: f.common.close,
    tabIndex: -1
  }, s.createElement(ed, null))), E = (w, C) => {
    const k = /^\d$/.test(w), O = j(`${Se}-key`, {
      [`${Se}-key-number`]: k,
      [`${Se}-key-sign`]: !k && w,
      [`${Se}-key-mid`]: C === 9 && !!a && m.length < 12
    }), P = w ? {
      role: "button",
      title: w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: O,
      onTouchStart: () => {
        h(), w === "BACKSPACE" && g();
      },
      onTouchEnd: (_) => {
        x(_, w), w === "BACKSPACE" && h();
      }
    }, P), w === "BACKSPACE" ? s.createElement(Ic, null) : w);
  };
  return s.createElement(Lr, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    className: `${Se}-popup`,
    stopPropagation: e.stopPropagation,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, W(e, s.createElement("div", {
    ref: d,
    className: Se,
    onMouseDown: (w) => {
      w.preventDefault();
    }
  }, v(), s.createElement("div", {
    className: `${Se}-wrapper`
  }, s.createElement("div", {
    className: j(`${Se}-main`, {
      [`${Se}-main-confirmed-style`]: !!a
    })
  }, m.map(E)), !!a && s.createElement("div", {
    className: `${Se}-confirm`
  }, s.createElement("div", {
    className: `${Se}-key ${Se}-key-extra ${Se}-key-bs`,
    onTouchStart: () => {
      g();
    },
    onTouchEnd: (w) => {
      x(w, "BACKSPACE"), h();
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(Ic, null)), s.createElement("div", {
    className: `${Se}-key ${Se}-key-extra ${Se}-key-ok`,
    onTouchEnd: (w) => x(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), e.safeArea && s.createElement("div", {
    className: `${Se}-footer`
  }, s.createElement(Dr, {
    position: "bottom"
  })))));
}, Qr = "adm-page-indicator", y7 = {
  color: "primary",
  direction: "horizontal"
}, b7 = ze((t) => {
  const e = q(y7, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: j(`${Qr}-dot`, {
        [`${Qr}-dot-active`]: e.current === r
      })
    }));
  return W(e, s.createElement("div", {
    className: j(Qr, `${Qr}-${e.direction}`, `${Qr}-color-${e.color}`)
  }, n));
}), Nt = "adm-passcode-input", Hu = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0,
  inputMode: "numeric"
}, jy = Ee((t, e) => {
  const n = q(Hu, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Hu.length, {
    locale: i
  } = ue(), [a, o] = X(!1), [l, c] = ce(n), u = V(null), f = V(null);
  Q(() => {
    var y;
    l.length >= r && ((y = n.onFill) === null || y === void 0 || y.call(n, l));
  }, [l, r]);
  const d = () => {
    var y, g;
    n.keyboard || (y = f.current) === null || y === void 0 || y.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  Q(() => {
    if (!a)
      return;
    const y = window.setTimeout(() => {
      var g;
      (g = u.current) === null || g === void 0 || g.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(y);
    };
  }, [a]);
  const m = () => {
    var y;
    o(!1), (y = n.onBlur) === null || y === void 0 || y.call(n);
  };
  ke(e, () => ({
    focus: () => {
      var y;
      return (y = u.current) === null || y === void 0 ? void 0 : y.focus();
    },
    blur: () => {
      var y, g;
      (y = u.current) === null || y === void 0 || y.blur(), (g = f.current) === null || g === void 0 || g.blur();
    }
  }));
  const p = () => {
    const y = [], g = l.split(""), h = g.length, x = Ne(g.length, 0, r - 1);
    for (let v = 0; v < r; v++)
      y.push(s.createElement("div", {
        className: j(`${Nt}-cell`, {
          [`${Nt}-cell-caret`]: n.caret && h === v && a,
          [`${Nt}-cell-focused`]: x === v && a,
          [`${Nt}-cell-dot`]: !n.plain && g[v]
        }),
        key: v
      }, g[v] && n.plain ? g[v] : ""));
    return y;
  }, b = j(Nt, {
    [`${Nt}-focused`]: a,
    [`${Nt}-error`]: n.error,
    [`${Nt}-seperated`]: n.seperated
  });
  return s.createElement(s.Fragment, null, W(n, s.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: b,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, s.createElement("div", {
    className: `${Nt}-cell-container`
  }, p()), s.createElement("input", {
    ref: f,
    className: `${Nt}-native-input`,
    value: l,
    type: "text",
    pattern: "[0-9]*",
    inputMode: n.inputMode,
    onChange: (y) => {
      c(y.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && s.cloneElement(n.keyboard, {
    visible: a,
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
}), Jr = "adm-progress-bar", E7 = {
  percent: 0,
  rounded: !0,
  text: !1
}, By = (t) => {
  const e = q(E7, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, s.createElement("div", {
    className: j(Jr, e.rounded && `${Jr}-rounded`)
  }, s.createElement("div", {
    className: `${Jr}-trail`
  }, s.createElement("div", {
    className: `${Jr}-fill`,
    style: n
  })), ln(r) && s.createElement("div", {
    className: `${Jr}-text`
  }, r)));
}, lr = "adm-progress-circle", Wy = (t) => {
  const e = q({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, s.createElement("div", {
    className: `${lr}`,
    style: n
  }, s.createElement("div", {
    className: `${lr}-content`
  }, s.createElement("svg", {
    className: `${lr}-svg`
  }, s.createElement("circle", {
    className: `${lr}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${lr}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${lr}-info`
  }, e.children))));
}, w7 = (t) => new Promise((e) => setTimeout(e, t)), sa = "adm-pull-to-refresh", C7 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, Zy = (t) => {
  var e, n;
  const {
    locale: r
  } = ue(), i = q(C7, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), a = (e = i.headHeight) !== null && e !== void 0 ? e : Ln(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Ln(60), [l, c] = X("pulling"), [u, f] = Le(() => ({
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
  Q(() => {
    var g;
    (g = d.current) === null || g === void 0 || g.addEventListener("touchmove", () => {
    });
  }, []);
  const p = () => new Promise((g) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), g();
      }
    });
  });
  function b() {
    return Pe(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw p(), g;
      }
      i.completeDelay > 0 && (yield w7(i.completeDelay)), p();
    });
  }
  Dt((g) => {
    if (l === "refreshing" || l === "complete")
      return;
    const {
      event: h
    } = g;
    if (g.last) {
      m.current = !1, l === "canRelease" ? b() : f.start({
        height: 0
      });
      return;
    }
    const [, x] = g.movement, v = Math.ceil(x);
    if (g.first && v > 0) {
      let k = function(O) {
        return "scrollTop" in O ? O.scrollTop : O.scrollY;
      };
      const w = g.event.target;
      if (!w || !(w instanceof Element))
        return;
      let C = $a(w);
      for (; ; ) {
        if (!C || k(C) > 0)
          return;
        if (C instanceof Window)
          break;
        C = $a(C.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    h.cancelable && h.preventDefault(), h.stopPropagation();
    const E = Math.max(xi(v, 0, 0, a * 5, 0.5), 0);
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
    eventOptions: Dn ? {
      passive: !1
    } : void 0
  });
  const y = () => {
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
  return s.createElement(Ce.div, {
    ref: d,
    className: sa
  }, s.createElement(Ce.div, {
    style: u,
    className: `${sa}-head`
  }, s.createElement("div", {
    className: `${sa}-head-content`,
    style: {
      height: a
    }
  }, y())), s.createElement("div", {
    className: `${sa}-content`
  }, i.children));
}, J1 = zs(null), x7 = {
  disabled: !1,
  defaultValue: null
}, k7 = (t) => {
  const e = q(x7, t), [n, r] = ce({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = e.onChange) === null || a === void 0 || a.call(e, i));
    }
  });
  return s.createElement(
    J1.Provider,
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
}, xn = "adm-radio", $7 = {
  defaultChecked: !1
}, _7 = (t) => {
  const e = q($7, t), n = it(J1);
  let [r, i] = ce({
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
    className: `${xn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${xn}-icon`
  }, r && s.createElement(Qd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: j(xn, {
      [`${xn}-checked`]: r,
      [`${xn}-disabled`]: a,
      [`${xn}-block`]: e.block
    })
  }, s.createElement(Jd, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${xn}-content`
  }, e.children)));
}, Hy = pe(_7, {
  Group: k7
}), S7 = () => s.createElement("svg", {
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
})), kn = "adm-rate", O7 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(S7, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, zy = (t) => {
  const e = q(O7, t), [n, r] = ce(e), i = V(null), a = Array(e.count).fill(null);
  function o(c, u) {
    return s.createElement("div", {
      className: j(`${kn}-star`, {
        [`${kn}-star-active`]: n >= c,
        [`${kn}-star-half`]: u,
        [`${kn}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const l = Dt((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), p = (u - m.left) / m.width * e.count, b = e.allowHalf ? Math.ceil(p * 2) / 2 : Math.ceil(p), y = Ne(b, 0, e.count);
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
    className: j(kn, {
      [`${kn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), a.map((c, u) => s.createElement("div", {
    key: u,
    className: j(`${kn}-box`)
  }, e.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, e0 = (t) => {
  const {
    result: e = {}
  } = ue(), {
    successIcon: n = s.createElement(fv, null),
    errorIcon: r = s.createElement(hl, null),
    infoIcon: i = s.createElement(vv, null),
    waitingIcon: a = s.createElement(dv, null),
    warningIcon: o = s.createElement(hv, null)
  } = e || {};
  switch (t) {
    case "success":
      return n;
    case "error":
      return r;
    case "info":
      return i;
    case "waiting":
      return a;
    case "warning":
      return o;
    default:
      return null;
  }
}, ei = "adm-result", F7 = {
  status: "info"
}, qy = (t) => {
  const e = q(F7, t), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = e, o = e0(n);
  return n ? W(e, s.createElement("div", {
    className: j(ei, `${ei}-${n}`)
  }, s.createElement("div", {
    className: `${ei}-icon`
  }, a || o), s.createElement("div", {
    className: `${ei}-title`
  }, r), !!i && s.createElement("div", {
    className: `${ei}-description`
  }, i))) : null;
}, Ve = "adm-result-page", N7 = {
  status: "info",
  details: []
}, R7 = (t) => {
  const e = q(N7, t), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = e0(n), [m, p] = X(!0), b = ln(c), y = ln(l);
  return W(e, s.createElement("div", {
    className: Ve
  }, s.createElement("div", {
    className: `${Ve}-header`
  }, s.createElement("div", {
    className: `${Ve}-icon`
  }, o || d), s.createElement("div", {
    className: `${Ve}-title`
  }, r), ln(i) ? s.createElement("div", {
    className: `${Ve}-description`
  }, i) : null, a != null && a.length ? s.createElement("div", {
    className: `${Ve}-details`
  }, (m ? a.slice(0, 3) : a).map((g, h) => s.createElement("div", {
    className: j(`${Ve}-detail`, g.bold && `${Ve}-detail-bold`),
    key: h
  }, s.createElement("span", null, g.label), s.createElement("span", null, g.value))), a.length > 3 && s.createElement("div", {
    onClick: () => p((g) => !g)
  }, s.createElement("div", {
    className: j(`${Ve}-collapse`, !m && `${Ve}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ve}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ve}-bg`
  }))), s.createElement("div", {
    className: `${Ve}-content`
  }, e.children), (y || b) && s.createElement("div", {
    className: `${Ve}-footer`
  }, b && s.createElement(qt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ve}-footer-btn`
  }, c), y && b && s.createElement("div", {
    className: `${Ve}-footer-space`
  }), y && s.createElement(qt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ve}-footer-btn`
  }, l))));
}, P7 = "adm-result-page-card", M7 = (t) => W(t, s.createElement("div", {
  className: j(`${P7}`)
}, t.children)), Uy = pe(R7, {
  Card: M7
}), rn = "adm-search-bar", A7 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0
}, Ky = Ee((t, e) => {
  const {
    locale: n,
    searchBar: r = {}
  } = ue(), i = q(A7, r, {
    cancelText: n.common.cancel
  }, t), a = gn(s.createElement(Ev, null), r.searchIcon, t.icon, t.searchIcon), [o, l] = ce(i), [c, u] = X(!1), f = V(null), d = V(!1);
  ke(e, () => ({
    clear: () => {
      var p;
      return (p = f.current) === null || p === void 0 ? void 0 : p.clear();
    },
    focus: () => {
      var p;
      return (p = f.current) === null || p === void 0 ? void 0 : p.focus();
    },
    blur: () => {
      var p;
      return (p = f.current) === null || p === void 0 ? void 0 : p.blur();
    },
    get nativeElement() {
      var p, b;
      return (b = (p = f.current) === null || p === void 0 ? void 0 : p.nativeElement) !== null && b !== void 0 ? b : null;
    }
  }));
  const m = () => {
    let p;
    return typeof i.showCancelButton == "function" ? p = i.showCancelButton(c, o) : p = i.showCancelButton && c, p && s.createElement("div", {
      className: `${rn}-suffix`
    }, s.createElement(qt, {
      fill: "none",
      className: `${rn}-cancel-button`,
      onClick: () => {
        var b, y, g;
        i.clearOnCancel && ((b = f.current) === null || b === void 0 || b.clear()), (y = f.current) === null || y === void 0 || y.blur(), (g = i.onCancel) === null || g === void 0 || g.call(i);
      },
      onMouseDown: (b) => {
        b.preventDefault();
      }
    }, i.cancelText));
  };
  return W(i, s.createElement("div", {
    className: j(rn, {
      [`${rn}-active`]: c
    })
  }, s.createElement("div", {
    className: `${rn}-input-box`
  }, a && s.createElement("div", {
    className: `${rn}-input-box-icon`
  }, a), s.createElement(X1, {
    ref: f,
    className: j(`${rn}-input`, {
      [`${rn}-input-without-icon`]: !a
    }),
    value: o,
    onChange: l,
    maxLength: i.maxLength,
    autoFocus: i.autoFocus,
    placeholder: i.placeholder,
    clearable: i.clearable,
    onlyShowClearWhenFocus: i.onlyShowClearWhenFocus,
    onFocus: (p) => {
      var b;
      u(!0), (b = i.onFocus) === null || b === void 0 || b.call(i, p);
    },
    onBlur: (p) => {
      var b;
      u(!1), (b = i.onBlur) === null || b === void 0 || b.call(i, p);
    },
    onClear: i.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      var p, b;
      d.current || ((p = f.current) === null || p === void 0 || p.blur(), (b = i.onSearch) === null || b === void 0 || b.call(i, o));
    },
    "aria-label": n.SearchBar.name,
    onCompositionStart: (p) => {
      var b;
      d.current = !0, (b = i.onCompositionStart) === null || b === void 0 || b.call(i, p);
    },
    onCompositionEnd: (p) => {
      var b;
      d.current = !1, (b = i.onCompositionEnd) === null || b === void 0 || b.call(i, p);
    }
  })), m()));
});
function I7(t, e) {
  var n = G({}, t);
  return Array.isArray(e) && e.forEach(function(r) {
    delete n[r];
  }), n;
}
function T7(t) {
  return t instanceof HTMLElement || t instanceof SVGElement;
}
function L7(t) {
  return T7(t) ? t : t instanceof s.Component ? x0.findDOMNode(t) : null;
}
var D7 = /* @__PURE__ */ I.createContext({}), V7 = /* @__PURE__ */ function(t) {
  Ml(n, t);
  var e = Al(n);
  function n() {
    return Un(this, n), e.apply(this, arguments);
  }
  return Kn(n, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), n;
}(I.Component), Nn = "none", la = "appear", ca = "enter", ua = "leave", zu = "none", wt = "prepare", mr = "start", hr = "active", Gl = "end", t0 = "prepared";
function qu(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit".concat(t)] = "webkit".concat(e), n["Moz".concat(t)] = "moz".concat(e), n["ms".concat(t)] = "MS".concat(e), n["O".concat(t)] = "o".concat(e.toLowerCase()), n;
}
function j7(t, e) {
  var n = {
    animationend: qu("Animation", "AnimationEnd"),
    transitionend: qu("Transition", "TransitionEnd")
  };
  return t && ("AnimationEvent" in e || delete n.animationend.animation, "TransitionEvent" in e || delete n.transitionend.transition), n;
}
var B7 = j7(uo(), typeof window < "u" ? window : {}), n0 = {};
if (uo()) {
  var W7 = document.createElement("div");
  n0 = W7.style;
}
var fa = {};
function r0(t) {
  if (fa[t])
    return fa[t];
  var e = B7[t];
  if (e)
    for (var n = Object.keys(e), r = n.length, i = 0; i < r; i += 1) {
      var a = n[i];
      if (Object.prototype.hasOwnProperty.call(e, a) && a in n0)
        return fa[t] = e[a], fa[t];
    }
  return "";
}
var i0 = r0("animationend"), a0 = r0("transitionend"), o0 = !!(i0 && a0), Uu = i0 || "animationend", Ku = a0 || "transitionend";
function Yu(t, e) {
  if (!t)
    return null;
  if (_e(t) === "object") {
    var n = e.replace(/-\w/g, function(r) {
      return r[1].toUpperCase();
    });
    return t[n];
  }
  return "".concat(t, "-").concat(e);
}
const Z7 = function(t) {
  var e = V(), n = V(t);
  n.current = t;
  var r = I.useCallback(function(o) {
    n.current(o);
  }, []);
  function i(o) {
    o && (o.removeEventListener(Ku, r), o.removeEventListener(Uu, r));
  }
  function a(o) {
    e.current && e.current !== o && i(e.current), o && o !== e.current && (o.addEventListener(Ku, r), o.addEventListener(Uu, r), e.current = o);
  }
  return I.useEffect(function() {
    return function() {
      i(e.current);
    };
  }, []), [a, i];
};
var s0 = uo() ? za : Q, l0 = function(e) {
  return +setTimeout(e, 16);
}, c0 = function(e) {
  return clearTimeout(e);
};
typeof window < "u" && "requestAnimationFrame" in window && (l0 = function(e) {
  return window.requestAnimationFrame(e);
}, c0 = function(e) {
  return window.cancelAnimationFrame(e);
});
var Gu = 0, Xl = /* @__PURE__ */ new Map();
function u0(t) {
  Xl.delete(t);
}
var Vs = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Gu += 1;
  var r = Gu;
  function i(a) {
    if (a === 0)
      u0(r), e();
    else {
      var o = l0(function() {
        i(a - 1);
      });
      Xl.set(r, o);
    }
  }
  return i(n), r;
};
Vs.cancel = function(t) {
  var e = Xl.get(t);
  return u0(t), c0(e);
};
const H7 = function() {
  var t = I.useRef(null);
  function e() {
    Vs.cancel(t.current);
  }
  function n(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    e();
    var a = Vs(function() {
      i <= 1 ? r({
        isCanceled: function() {
          return a !== t.current;
        }
      }) : n(r, i - 1);
    });
    t.current = a;
  }
  return I.useEffect(function() {
    return function() {
      e();
    };
  }, []), [n, e];
};
var z7 = [wt, mr, hr, Gl], q7 = [wt, t0], f0 = !1, U7 = !0;
function d0(t) {
  return t === hr || t === Gl;
}
const K7 = function(t, e, n) {
  var r = gr(zu), i = Fe(r, 2), a = i[0], o = i[1], l = H7(), c = Fe(l, 2), u = c[0], f = c[1];
  function d() {
    o(wt, !0);
  }
  var m = e ? q7 : z7;
  return s0(function() {
    if (a !== zu && a !== Gl) {
      var p = m.indexOf(a), b = m[p + 1], y = n(a);
      y === f0 ? o(b, !0) : b && u(function(g) {
        function h() {
          g.isCanceled() || o(b, !0);
        }
        y === !0 ? h() : Promise.resolve(y).then(h);
      });
    }
  }, [t, a]), I.useEffect(function() {
    return function() {
      f();
    };
  }, []), [d, a];
};
function Y7(t, e, n, r) {
  var i = r.motionEnter, a = i === void 0 ? !0 : i, o = r.motionAppear, l = o === void 0 ? !0 : o, c = r.motionLeave, u = c === void 0 ? !0 : c, f = r.motionDeadline, d = r.motionLeaveImmediately, m = r.onAppearPrepare, p = r.onEnterPrepare, b = r.onLeavePrepare, y = r.onAppearStart, g = r.onEnterStart, h = r.onLeaveStart, x = r.onAppearActive, v = r.onEnterActive, E = r.onLeaveActive, w = r.onAppearEnd, C = r.onEnterEnd, k = r.onLeaveEnd, O = r.onVisibleChanged, P = gr(), _ = Fe(P, 2), L = _[0], M = _[1], S = gr(Nn), $ = Fe(S, 2), R = $[0], F = $[1], N = gr(null), T = Fe(N, 2), A = T[0], D = T[1], B = V(!1), H = V(null);
  function Z() {
    return n();
  }
  var K = V(!1);
  function Y() {
    F(Nn, !0), D(null, !0);
  }
  function re(Ue) {
    var Be = Z();
    if (!(Ue && !Ue.deadline && Ue.target !== Be)) {
      var We = K.current, _t;
      R === la && We ? _t = w == null ? void 0 : w(Be, Ue) : R === ca && We ? _t = C == null ? void 0 : C(Be, Ue) : R === ua && We && (_t = k == null ? void 0 : k(Be, Ue)), R !== Nn && We && _t !== !1 && Y();
    }
  }
  var se = Z7(re), ve = Fe(se, 1), U = ve[0], ee = function(Be) {
    var We, _t, jr;
    switch (Be) {
      case la:
        return We = {}, me(We, wt, m), me(We, mr, y), me(We, hr, x), We;
      case ca:
        return _t = {}, me(_t, wt, p), me(_t, mr, g), me(_t, hr, v), _t;
      case ua:
        return jr = {}, me(jr, wt, b), me(jr, mr, h), me(jr, hr, E), jr;
      default:
        return {};
    }
  }, J = I.useMemo(function() {
    return ee(R);
  }, [R]), te = K7(R, !t, function(Ue) {
    if (Ue === wt) {
      var Be = J[wt];
      return Be ? Be(Z()) : f0;
    }
    if (xe in J) {
      var We;
      D(((We = J[xe]) === null || We === void 0 ? void 0 : We.call(J, Z(), null)) || null);
    }
    return xe === hr && (U(Z()), f > 0 && (clearTimeout(H.current), H.current = setTimeout(function() {
      re({
        deadline: !0
      });
    }, f))), xe === t0 && Y(), U7;
  }), ie = Fe(te, 2), fe = ie[0], xe = ie[1], qe = d0(xe);
  K.current = qe, s0(function() {
    M(e);
    var Ue = B.current;
    B.current = !0;
    var Be;
    !Ue && e && l && (Be = la), Ue && e && a && (Be = ca), (Ue && !e && u || !Ue && d && !e && u) && (Be = ua);
    var We = ee(Be);
    Be && (t || We[wt]) ? (F(Be), fe()) : F(Nn);
  }, [e]), Q(function() {
    // Cancel appear
    (R === la && !l || // Cancel enter
    R === ca && !a || // Cancel leave
    R === ua && !u) && F(Nn);
  }, [l, a, u]), Q(function() {
    return function() {
      B.current = !1, clearTimeout(H.current);
    };
  }, []);
  var De = I.useRef(!1);
  Q(function() {
    L && (De.current = !0), L !== void 0 && R === Nn && ((De.current || L) && (O == null || O(L)), De.current = !0);
  }, [L, R]);
  var Vt = A;
  return J[wt] && xe === mr && (Vt = G({
    transition: "none"
  }, Vt)), [R, xe, Vt, L ?? e];
}
function G7(t) {
  var e = t;
  _e(t) === "object" && (e = t.transitionSupport);
  function n(i, a) {
    return !!(i.motionName && e && a !== !1);
  }
  var r = /* @__PURE__ */ I.forwardRef(function(i, a) {
    var o = i.visible, l = o === void 0 ? !0 : o, c = i.removeOnLeave, u = c === void 0 ? !0 : c, f = i.forceRender, d = i.children, m = i.motionName, p = i.leavedClassName, b = i.eventProps, y = I.useContext(D7), g = y.motion, h = n(i, g), x = V(), v = V();
    function E() {
      try {
        return x.current instanceof HTMLElement ? x.current : L7(v.current);
      } catch {
        return null;
      }
    }
    var w = Y7(h, l, E, i), C = Fe(w, 4), k = C[0], O = C[1], P = C[2], _ = C[3], L = I.useRef(_);
    _ && (L.current = !0);
    var M = I.useCallback(function(D) {
      x.current = D, _d(a, D);
    }, [a]), S, $ = G(G({}, b), {}, {
      visible: l
    });
    if (!d)
      S = null;
    else if (k === Nn)
      _ ? S = d(G({}, $), M) : !u && L.current && p ? S = d(G(G({}, $), {}, {
        className: p
      }), M) : f || !u && !p ? S = d(G(G({}, $), {}, {
        style: {
          display: "none"
        }
      }), M) : S = null;
    else {
      var R, F;
      O === wt ? F = "prepare" : d0(O) ? F = "active" : O === mr && (F = "start");
      var N = Yu(m, "".concat(k, "-").concat(F));
      S = d(G(G({}, $), {}, {
        className: j(Yu(m, k), (R = {}, me(R, N, N && F), me(R, m, typeof m == "string"), R)),
        style: P
      }), M);
    }
    if (/* @__PURE__ */ I.isValidElement(S) && op(S)) {
      var T = S, A = T.ref;
      A || (S = /* @__PURE__ */ I.cloneElement(S, {
        ref: M
      }));
    }
    return /* @__PURE__ */ I.createElement(V7, {
      ref: v
    }, S);
  });
  return r.displayName = "CSSMotion", r;
}
const m0 = G7(o0);
var js = "add", Bs = "keep", Ws = "remove", zo = "removed";
function X7(t) {
  var e;
  return t && _e(t) === "object" && "key" in t ? e = t : e = {
    key: t
  }, G(G({}, e), {}, {
    key: String(e.key)
  });
}
function Zs() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return t.map(X7);
}
function Q7() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = [], r = 0, i = e.length, a = Zs(t), o = Zs(e);
  a.forEach(function(u) {
    for (var f = !1, d = r; d < i; d += 1) {
      var m = o[d];
      if (m.key === u.key) {
        r < d && (n = n.concat(o.slice(r, d).map(function(p) {
          return G(G({}, p), {}, {
            status: js
          });
        })), r = d), n.push(G(G({}, m), {}, {
          status: Bs
        })), r += 1, f = !0;
        break;
      }
    }
    f || n.push(G(G({}, u), {}, {
      status: Ws
    }));
  }), r < i && (n = n.concat(o.slice(r).map(function(u) {
    return G(G({}, u), {}, {
      status: js
    });
  })));
  var l = {};
  n.forEach(function(u) {
    var f = u.key;
    l[f] = (l[f] || 0) + 1;
  });
  var c = Object.keys(l).filter(function(u) {
    return l[u] > 1;
  });
  return c.forEach(function(u) {
    n = n.filter(function(f) {
      var d = f.key, m = f.status;
      return d !== u || m !== Ws;
    }), n.forEach(function(f) {
      f.key === u && (f.status = Bs);
    });
  }), n;
}
var J7 = ["component", "children", "onVisibleChanged", "onAllRemoved"], e8 = ["status"], t8 = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function n8(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : m0, n = /* @__PURE__ */ function(r) {
    Ml(a, r);
    var i = Al(a);
    function a() {
      var o;
      Un(this, a);
      for (var l = arguments.length, c = new Array(l), u = 0; u < l; u++)
        c[u] = arguments[u];
      return o = i.call.apply(i, [this].concat(c)), me(La(o), "state", {
        keyEntities: []
      }), me(La(o), "removeKey", function(f) {
        var d = o.state.keyEntities, m = d.map(function(p) {
          return p.key !== f ? p : G(G({}, p), {}, {
            status: zo
          });
        });
        return o.setState({
          keyEntities: m
        }), m.filter(function(p) {
          var b = p.status;
          return b !== zo;
        }).length;
      }), o;
    }
    return Kn(a, [{
      key: "render",
      value: function() {
        var l = this, c = this.state.keyEntities, u = this.props, f = u.component, d = u.children, m = u.onVisibleChanged, p = u.onAllRemoved, b = $r(u, J7), y = f || I.Fragment, g = {};
        return t8.forEach(function(h) {
          g[h] = b[h], delete b[h];
        }), delete b.keys, /* @__PURE__ */ I.createElement(y, b, c.map(function(h, x) {
          var v = h.status, E = $r(h, e8), w = v === js || v === Bs;
          return /* @__PURE__ */ I.createElement(e, Wn({}, g, {
            key: E.key,
            visible: w,
            eventProps: E,
            onVisibleChanged: function(k) {
              if (m == null || m(k, {
                key: E.key
              }), !k) {
                var O = l.removeKey(E.key);
                O === 0 && p && p();
              }
            }
          }), function(C, k) {
            return d(G(G({}, C), {}, {
              index: x
            }), k);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(l, c) {
        var u = l.keys, f = c.keyEntities, d = Zs(u), m = Q7(f, d);
        return {
          keyEntities: m.filter(function(p) {
            var b = f.find(function(y) {
              var g = y.key;
              return p.key === g;
            });
            return !(b && b.status === zo && p.status === Ws);
          })
        };
      }
    }]), a;
  }(I.Component);
  return me(n, "defaultProps", {
    component: "div"
  }), n;
}
n8(o0);
var Xu = function(e) {
  return e ? {
    left: e.offsetLeft,
    right: e.parentElement.clientWidth - e.clientWidth - e.offsetLeft,
    width: e.clientWidth
  } : null;
}, cr = function(e) {
  return e !== void 0 ? "".concat(e, "px") : void 0;
};
function r8(t) {
  var e = t.prefixCls, n = t.containerRef, r = t.value, i = t.getValueIndex, a = t.motionName, o = t.onMotionStart, l = t.onMotionEnd, c = t.direction, u = I.useRef(null), f = I.useState(r), d = Fe(f, 2), m = d[0], p = d[1], b = function(S) {
    var $, R = i(S), F = ($ = n.current) === null || $ === void 0 ? void 0 : $.querySelectorAll(".".concat(e, "-item"))[R];
    return (F == null ? void 0 : F.offsetParent) && F;
  }, y = I.useState(null), g = Fe(y, 2), h = g[0], x = g[1], v = I.useState(null), E = Fe(v, 2), w = E[0], C = E[1];
  Cd(function() {
    if (m !== r) {
      var M = b(m), S = b(r), $ = Xu(M), R = Xu(S);
      p(r), x($), C(R), M && S ? o() : l();
    }
  }, [r]);
  var k = I.useMemo(function() {
    return cr(c === "rtl" ? -(h == null ? void 0 : h.right) : h == null ? void 0 : h.left);
  }, [c, h]), O = I.useMemo(function() {
    return cr(c === "rtl" ? -(w == null ? void 0 : w.right) : w == null ? void 0 : w.left);
  }, [c, w]), P = function() {
    return {
      transform: "translateX(var(--thumb-start-left))",
      width: "var(--thumb-start-width)"
    };
  }, _ = function() {
    return {
      transform: "translateX(var(--thumb-active-left))",
      width: "var(--thumb-active-width)"
    };
  }, L = function() {
    x(null), C(null), l();
  };
  return !h || !w ? null : /* @__PURE__ */ I.createElement(m0, {
    visible: !0,
    motionName: a,
    motionAppear: !0,
    onAppearStart: P,
    onAppearActive: _,
    onVisibleChanged: L
  }, function(M, S) {
    var $ = M.className, R = M.style, F = G(G({}, R), {}, {
      "--thumb-start-left": k,
      "--thumb-start-width": cr(h == null ? void 0 : h.width),
      "--thumb-active-left": O,
      "--thumb-active-width": cr(w == null ? void 0 : w.width)
    }), N = {
      ref: Sd(u, S),
      style: F,
      className: j("".concat(e, "-thumb"), $)
    };
    return /* @__PURE__ */ I.createElement("div", N);
  });
}
var i8 = ["prefixCls", "direction", "options", "disabled", "defaultValue", "value", "onChange", "className", "motionName"];
function a8(t) {
  if (typeof t.title < "u")
    return t.title;
  if (_e(t.label) !== "object") {
    var e;
    return (e = t.label) === null || e === void 0 ? void 0 : e.toString();
  }
}
function o8(t) {
  return t.map(function(e) {
    if (_e(e) === "object" && e !== null) {
      var n = a8(e);
      return G(G({}, e), {}, {
        title: n
      });
    }
    return {
      label: e == null ? void 0 : e.toString(),
      title: e == null ? void 0 : e.toString(),
      value: e
    };
  });
}
var s8 = function(e) {
  var n = e.prefixCls, r = e.className, i = e.disabled, a = e.checked, o = e.label, l = e.title, c = e.value, u = e.onChange, f = function(m) {
    i || u(m, c);
  };
  return /* @__PURE__ */ I.createElement("label", {
    className: j(r, me({}, "".concat(n, "-item-disabled"), i))
  }, /* @__PURE__ */ I.createElement("input", {
    className: "".concat(n, "-item-input"),
    type: "radio",
    disabled: i,
    checked: a,
    onChange: f
  }), /* @__PURE__ */ I.createElement("div", {
    className: "".concat(n, "-item-label"),
    title: l,
    role: "option",
    "aria-selected": a
  }, o));
}, l8 = /* @__PURE__ */ I.forwardRef(function(t, e) {
  var n, r, i = t.prefixCls, a = i === void 0 ? "rc-segmented" : i, o = t.direction, l = t.options, c = l === void 0 ? [] : l, u = t.disabled, f = t.defaultValue, d = t.value, m = t.onChange, p = t.className, b = p === void 0 ? "" : p, y = t.motionName, g = y === void 0 ? "thumb-motion" : y, h = $r(t, i8), x = I.useRef(null), v = I.useMemo(function() {
    return Sd(x, e);
  }, [x, e]), E = I.useMemo(function() {
    return o8(c);
  }, [c]), w = xd((n = E[0]) === null || n === void 0 ? void 0 : n.value, {
    value: d,
    defaultValue: f
  }), C = Fe(w, 2), k = C[0], O = C[1], P = I.useState(!1), _ = Fe(P, 2), L = _[0], M = _[1], S = function(F, N) {
    u || (O(N), m == null || m(N));
  }, $ = I7(h, ["children"]);
  return /* @__PURE__ */ I.createElement("div", Wn({
    role: "listbox",
    "aria-label": "segmented control"
  }, $, {
    className: j(a, (r = {}, me(r, "".concat(a, "-rtl"), o === "rtl"), me(r, "".concat(a, "-disabled"), u), r), b),
    ref: v
  }), /* @__PURE__ */ I.createElement("div", {
    className: "".concat(a, "-group")
  }, /* @__PURE__ */ I.createElement(r8, {
    prefixCls: a,
    value: k,
    containerRef: x,
    motionName: "".concat(a, "-").concat(g),
    direction: o,
    getValueIndex: function(F) {
      return E.findIndex(function(N) {
        return N.value === F;
      });
    },
    onMotionStart: function() {
      M(!0);
    },
    onMotionEnd: function() {
      M(!1);
    }
  }), E.map(function(R) {
    return /* @__PURE__ */ I.createElement(s8, Wn({}, R, {
      key: R.value,
      prefixCls: a,
      className: j(R.className, "".concat(a, "-item"), me({}, "".concat(a, "-item-selected"), R.value === k && !L)),
      checked: R.value === k,
      onChange: S,
      disabled: !!u || !!R.disabled
    }));
  })));
}), c8 = l8;
function u8(t) {
  return typeof t == "object" && !!(t != null && t.icon);
}
const da = "adm-segmented", Yy = I.forwardRef((t, e) => {
  const {
    prefixCls: n,
    className: r,
    block: i,
    options: a = []
  } = t, o = un(
    t,
    ["prefixCls", "className", "block", "options"]
  ), l = I.useMemo(() => a.map((c) => {
    if (u8(c)) {
      const {
        icon: u,
        label: f
      } = c, d = un(c, ["icon", "label"]);
      return Object.assign(Object.assign({}, d), {
        label: I.createElement(I.Fragment, null, I.createElement("span", {
          className: `${da}-item-icon`
        }, u), f && I.createElement("span", null, f))
      });
    }
    return c;
  }), [a, da]);
  return W(t, I.createElement(c8, Object.assign({}, o, {
    className: j(r, {
      [`${da}-block`]: i
    }),
    options: l,
    ref: e,
    prefixCls: da
  })));
}), f8 = ze(() => s.createElement("svg", {
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
})))))))), $n = "adm-selector", d8 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, Gy = (t) => {
  const e = q(d8, t), [n, r, , i] = Vi(e.fieldNames), [a, o] = ce({
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
  } = ue(), c = e.options.map((u) => {
    const f = (a || []).includes(u[r]), d = u[i] || e.disabled, m = j(`${$n}-item`, {
      [`${$n}-item-active`]: f && !e.multiple,
      [`${$n}-item-multiple-active`]: f && e.multiple,
      [`${$n}-item-disabled`]: d
    });
    return s.createElement("div", {
      key: u[r],
      className: m,
      onClick: () => {
        if (!d)
          if (e.multiple) {
            const p = f ? a.filter((b) => b !== u[r]) : [...a, u[r]];
            o(p);
          } else {
            const p = f ? [] : [u[r]];
            o(p);
          }
      },
      role: "option",
      "aria-selected": f && !e.multiple || f && e.multiple
    }, u[n], u.description && s.createElement("div", {
      className: `${$n}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${$n}-check-mark-wrapper`
    }, s.createElement(f8, null)));
  });
  return W(e, s.createElement("div", {
    className: $n,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(W1, {
    columns: e.columns
  }, c) : s.createElement(Kl, {
    wrap: !0
  }, c)));
}, qo = ze((t) => W(t, s.createElement("svg", {
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
}))))), Ze = "adm-side-bar", m8 = () => null, h8 = (t) => {
  var e;
  let n = null;
  const r = [];
  yn(t.children, (c, u) => {
    if (!zn(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, a] = ce({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = t.onChange) === null || u === void 0 || u.call(t, c));
    }
  }), o = r[r.length - 1], l = o && o.key === i;
  return W(t, s.createElement("div", {
    className: Ze
  }, s.createElement("div", {
    className: `${Ze}-items`
  }, r.map((c, u) => {
    const f = c.key === i, d = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return W(c.props, s.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: p
        } = c;
        p == null || c.props.disabled || a(p.toString());
      },
      className: j(`${Ze}-item`, {
        [`${Ze}-item-active`]: f,
        [`${Ze}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(qo, {
      className: `${Ze}-item-corner ${Ze}-item-corner-top`
    }), m && s.createElement(qo, {
      className: `${Ze}-item-corner ${Ze}-item-corner-bottom`
    })), s.createElement(ms, {
      content: c.props.badge,
      className: `${Ze}-badge`
    }, s.createElement("div", {
      className: `${Ze}-item-title`
    }, f && s.createElement("div", {
      className: `${Ze}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: j(`${Ze}-extra-space`, l && `${Ze}-item-active-next-sibling`)
  }, l && s.createElement(qo, {
    className: `${Ze}-item-corner ${Ze}-item-corner-top`
  }))));
}, Xy = pe(h8, {
  Item: m8
}), Uo = "adm-slider", v8 = ({
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
      [`${Uo}-tick`]: !0,
      [`${Uo}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${Uo}-ticks`
  }, o);
}, p8 = v8, Ko = "adm-slider-mark", g8 = ({
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
      [`${Ko}-text`]: !0,
      [`${Ko}-text-active`]: f
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
    className: Ko
  }, l);
}, y8 = g8;
function Hs() {
  return typeof BigInt == "function";
}
function h0(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function mi(t) {
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
function Ql(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function oi(t) {
  var e = String(t);
  if (Ql(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && p0(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function v0(t) {
  var e = String(t);
  if (Ql(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(Hs() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(Hs() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(oi(e));
  }
  return mi(e).fullStr;
}
function p0(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var b8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Un(this, t), me(this, "origin", ""), me(this, "negative", void 0), me(this, "integer", void 0), me(this, "decimal", void 0), me(this, "decimalLen", void 0), me(this, "empty", void 0), me(this, "nan", void 0), h0(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (Ql(n) && (n = Number(n)), n = typeof n == "string" ? n : v0(n), p0(n)) {
      var r = mi(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Kn(t, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), l = n.alignDecimal(a), c = r(o, l).toString(), u = i(a), f = mi(c), d = f.negativeStr, m = f.trimStr, p = "".concat(d).concat(m.padStart(u + 1, "0"));
      return new t("".concat(p.slice(0, -u), ".").concat(p.slice(-u)));
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
      return n ? this.isInvalidate() ? "" : mi("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), E8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Un(this, t), me(this, "origin", ""), me(this, "number", void 0), me(this, "empty", void 0), h0(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return Kn(t, [{
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
      var a = Math.max(oi(this.number), oi(r));
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
      var a = Math.max(oi(this.number), oi(r));
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
      return n ? this.isInvalidate() ? "" : v0(this.number) : this.origin;
    }
  }]), t;
}();
function Xe(t) {
  return Hs() ? new b8(t) : new E8(t);
}
function Jl(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = mi(t), a = i.negativeStr, o = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = Xe(t).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return Jl(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const w8 = (t) => W(t, s.createElement("svg", {
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
})))), Yo = "adm-slider", C8 = (t) => {
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
  } = ue(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = X(!1), p = Dt((g) => {
    var h;
    if (i)
      return;
    g.first && (c.current = e);
    const x = g.xy[0] - g.initial[0], v = (h = t.trackRef.current) === null || h === void 0 ? void 0 : h.offsetWidth;
    if (!v)
      return;
    const E = x / Math.ceil(v) * (r - n);
    l(c.current + E, g.first, g.last), m(!g.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), b = typeof t.popover == "function" ? t.popover : t.popover ? (g) => g.toString() : null, y = s.createElement("div", {
    className: `${Yo}-thumb`
  }, a || s.createElement(w8, {
    className: `${Yo}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${Yo}-thumb-container`,
    style: f()
  }, p(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), b ? s.createElement(V1, {
    content: b(e),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, y) : y);
}, x8 = C8, ti = "adm-slider", k8 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, Qy = (t) => {
  var e;
  const n = q(k8, t), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: l,
    step: c,
    icon: u
  } = n;
  function f($) {
    return $.sort((R, F) => R - F);
  }
  function d($) {
    return n.range ? $ : [n.min, $];
  }
  function m($, R) {
    const F = Xe($), N = Jl(F.toString(), ".", R);
    return Xe(N).toNumber();
  }
  function p($) {
    const R = Math.max(b(c), b($[0]), b($[1]));
    return n.range ? $.map((F) => m(F, R)) : m($[1], R);
  }
  function b($) {
    return (`${$}`.split(".")[1] || "").length;
  }
  function y($) {
    var R;
    (R = n.onAfterChange) === null || R === void 0 || R.call(n, p($));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (g = [0, n.value]);
  const [h, x] = ce({
    value: g,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), v = f(d(h));
  function E($) {
    const R = f($), F = v;
    R[0] === F[0] && R[1] === F[1] || x(p(R));
  }
  const w = V(null), C = `${100 * (v[1] - v[0]) / (i - r)}%`, k = `${100 * (v[0] - r) / (i - r)}%`, O = de(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort(($, R) => $ - R);
    if (l) {
      const $ = [];
      for (let R = Xe(r); R.lessEquals(Xe(i)); R = R.add(c))
        $.push(R.toNumber());
      return $;
    }
    return [];
  }, [o, l, c, r, i]);
  function P($) {
    const R = $ < r ? r : $ > i ? i : $;
    let F = r;
    if (O.length)
      F = Pl(O, R);
    else {
      const N = Math.round((R - r) / c), T = Xe(N).multi(c);
      F = Xe(r).add(T.toString()).toNumber();
    }
    return F;
  }
  const _ = V(0), L = ($) => {
    if (_.current > 0 || ($.stopPropagation(), a))
      return;
    const R = w.current;
    if (!R)
      return;
    const F = R.getBoundingClientRect().left, N = ($.clientX - F) / Math.ceil(R.offsetWidth) * (i - r) + r, T = P(N);
    let A;
    n.range ? Math.abs(T - v[0]) > Math.abs(T - v[1]) ? A = [v[0], T] : A = [T, v[1]] : A = [n.min, T], E(A), y(A);
  }, M = V(), S = ($) => s.createElement(x8, {
    key: $,
    value: v[$],
    min: r,
    max: i,
    disabled: a,
    trackRef: w,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (R, F, N) => {
      F && (_.current += 1, M.current = v);
      const T = P(R), A = M.current;
      if (!A)
        return;
      const D = [...A];
      D[$] = T, E(D), N && (y(D), window.setTimeout(() => {
        _.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return W(n, s.createElement("div", {
    className: j(ti, {
      [`${ti}-disabled`]: a
    })
  }, s.createElement("div", {
    className: `${ti}-track-container`,
    onClick: L
  }, s.createElement("div", {
    className: `${ti}-track`,
    onClick: L,
    ref: w
  }, s.createElement("div", {
    className: `${ti}-fill`,
    style: {
      width: C,
      left: k
    }
  }), n.ticks && s.createElement(p8, {
    points: O,
    min: r,
    max: i,
    lowerBound: v[0],
    upperBound: v[1]
  }), n.range && S(0), S(1))), o && s.createElement(y8, {
    min: r,
    max: i,
    marks: o,
    lowerBound: v[0],
    upperBound: v[1]
  })));
}, ur = "adm-stepper", $8 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function _8(t, e) {
  const n = q($8, t), {
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
    formatter: p,
    parser: b
  } = n, {
    locale: y
  } = ue();
  ke(e, () => ({
    focus: () => {
      var A;
      (A = M.current) === null || A === void 0 || A.focus();
    },
    blur: () => {
      var A;
      (A = M.current) === null || A === void 0 || A.blur();
    },
    get nativeElement() {
      var A, D;
      return (D = (A = M.current) === null || A === void 0 ? void 0 : A.nativeElement) !== null && D !== void 0 ? D : null;
    }
  }));
  const g = (A) => (d !== void 0 ? Jl(A.toString(), ".", d) : A).toString(), h = (A) => m ? A.toString() : A.toNumber(), x = (A) => {
    if (A === "")
      return null;
    if (b)
      return String(b(A));
    const D = Xe(A);
    return D.isInvalidate() ? null : D.toString();
  }, v = (A) => A === null ? "" : p ? p(A) : g(A), [E, w] = xd(r, {
    value: i,
    onChange: (A) => {
      a == null || a(A);
    }
  }), [C, k] = X(() => v(E));
  function O(A) {
    if (A.isNaN())
      return;
    let D = A;
    if (u !== void 0) {
      const B = Xe(u);
      D.lessEquals(B) && (D = B);
    }
    if (c !== void 0) {
      const B = Xe(c);
      B.lessEquals(D) && (D = B);
    }
    d !== void 0 && (D = Xe(g(h(D)))), w(h(D));
  }
  const P = (A) => {
    k(A);
    const D = x(A);
    D === null ? n.allowEmpty ? w(null) : w(r) : O(Xe(D));
  }, [_, L] = X(!1), M = s.useRef(null);
  function S(A) {
    L(A), A && k(E != null ? String(E) : "");
  }
  Q(() => {
    var A, D, B;
    _ && ((B = (D = (A = M.current) === null || A === void 0 ? void 0 : A.nativeElement) === null || D === void 0 ? void 0 : D.select) === null || B === void 0 || B.call(D));
  }, [_]), Q(() => {
    _ || k(v(E));
  }, [_, E, d]);
  const $ = (A) => {
    let D = Xe(l);
    A || (D = D.negate()), O(Xe(E ?? 0).add(D.toString()));
  }, R = () => {
    $(!1);
  }, F = () => {
    $(!0);
  }, N = () => o ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, T = () => o ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: j(ur, {
      [`${ur}-active`]: _
    })
  }, s.createElement(qt, {
    className: `${ur}-minus`,
    onClick: R,
    disabled: N(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.decrease
  }, s.createElement(gv, null)), s.createElement("div", {
    className: `${ur}-middle`
  }, s.createElement(X1, {
    ref: M,
    className: `${ur}-input`,
    onFocus: (A) => {
      var D;
      S(!0), (D = n.onFocus) === null || D === void 0 || D.call(n, A);
    },
    value: C,
    onChange: (A) => {
      o || P(A);
    },
    disabled: o,
    onBlur: (A) => {
      var D;
      S(!1), (D = n.onBlur) === null || D === void 0 || D.call(n, A);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(C),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(qt, {
    className: `${ur}-plus`,
    onClick: F,
    disabled: T(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.increase
  }, s.createElement(Qf, null))));
}
const Jy = Ee(_8), _n = "adm-step", S8 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, s.createElement("div", {
    className: j(`${_n}`, `${_n}-status-${i}`)
  }, s.createElement("div", {
    className: `${_n}-indicator`
  }, s.createElement("div", {
    className: `${_n}-icon-container`
  }, r)), s.createElement("div", {
    className: `${_n}-content`
  }, s.createElement("div", {
    className: `${_n}-title`
  }, e), !!n && s.createElement("div", {
    className: `${_n}-description`
  }, n))));
}, Qu = "adm-steps", O8 = "adm-step", F8 = s.createElement("span", {
  className: `${O8}-icon-dot`
}), N8 = {
  current: 0,
  direction: "horizontal"
}, R8 = (t) => {
  const e = q(N8, t), {
    direction: n,
    current: r
  } = e, i = j(Qu, `${Qu}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (a, o) => {
    var l;
    if (!s.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : F8;
    return s.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, e9 = pe(R8, {
  Step: S8
}), an = "adm-swipe-action", P8 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, t9 = Ee((t, e) => {
  const n = q(P8, t), r = V(null), i = V(null), a = V(null);
  function o(h) {
    const x = h.current;
    return x ? x.offsetWidth : 0;
  }
  function l() {
    return o(i);
  }
  function c() {
    return o(a);
  }
  const [{
    x: u
  }, f] = Le(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = V(!1), m = V(null);
  function p() {
    var h;
    (h = m.current) === null || h === void 0 || h.call(m), d.current = !1;
  }
  const b = Dt((h) => {
    var x;
    if (m.current = h.cancel, !h.intentional || (h.down && (d.current = !0), !d.current))
      return;
    const [v] = h.offset;
    if (h.last) {
      const E = l(), w = c();
      let C = v + h.velocity[0] * h.direction[0] * 50;
      v > 0 ? C = Math.max(0, C) : v < 0 ? C = Math.min(0, C) : C = 0;
      const k = Pl([-w, 0, E], C);
      f.start({
        x: k
      }), k !== 0 && ((x = t.onActionsReveal) === null || x === void 0 || x.call(t, k > 0 ? "left" : "right")), window.setTimeout(() => {
        d.current = !1;
      });
    } else
      f.start({
        x: v,
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
  }), y = () => {
    var h;
    f.start({
      x: 0
    }), p(), (h = n.onClose) === null || h === void 0 || h.call(n);
  };
  ke(e, () => ({
    show: (h = "right") => {
      var x;
      h === "right" ? f.start({
        x: -c()
      }) : h === "left" && f.start({
        x: l()
      }), (x = t.onActionsReveal) === null || x === void 0 || x.call(t, h);
    },
    close: y
  })), Q(() => {
    if (!n.closeOnTouchOutside)
      return;
    function h(x) {
      if (u.get() === 0)
        return;
      const v = r.current;
      v && !v.contains(x.target) && y();
    }
    return document.addEventListener("touchstart", h), () => {
      document.removeEventListener("touchstart", h);
    };
  }, [n.closeOnTouchOutside]);
  function g(h) {
    var x, v;
    const E = (x = h.color) !== null && x !== void 0 ? x : "light";
    return s.createElement(qt, {
      key: h.key,
      className: `${an}-action-button`,
      style: {
        "--background-color": (v = M8[E]) !== null && v !== void 0 ? v : E
      },
      onClick: (w) => {
        var C, k;
        n.closeOnAction && y(), (C = h.onClick) === null || C === void 0 || C.call(h, w), (k = n.onAction) === null || k === void 0 || k.call(n, h, w);
      }
    }, h.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: an
  }, b(), {
    ref: r,
    onClickCapture: (h) => {
      d.current && (h.stopPropagation(), h.preventDefault());
    }
  }), s.createElement(Ce.div, {
    className: `${an}-track`,
    style: {
      x: u
    }
  }, dn(n.stopPropagation, s.createElement("div", {
    className: `${an}-actions ${an}-actions-left`,
    ref: i
  }, n.leftActions.map(g))), s.createElement("div", {
    className: `${an}-content`,
    onClickCapture: (h) => {
      u.goal !== 0 && (h.preventDefault(), h.stopPropagation(), y());
    }
  }, s.createElement(Ce.div, {
    style: {
      pointerEvents: u.to((h) => h !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), dn(n.stopPropagation, s.createElement("div", {
    className: `${an}-actions ${an}-actions-right`,
    ref: a
  }, n.rightActions.map(g))))));
}), M8 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, g0 = (t) => W(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function A8(t) {
  const [e, n] = X(t), r = V(e);
  return Q(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function I8(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const l = t[o], c = e[o];
    typeof l == "function" && typeof c == "function" ? a[o] = function(...u) {
      l(...u), c(...u);
    } : a[o] = l || c;
  }), a;
}
const Rt = "adm-swiper", T8 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, L8 = {
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
let ma;
const D8 = Ee(El((t, e) => {
  const n = q(L8, t), {
    direction: r,
    total: i,
    children: a,
    indicator: o
  } = n, [l] = X({}), c = V(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: p,
    renderChildren: b
  } = de(() => {
    let g = 0, h, x;
    return typeof a == "function" ? h = a : x = s.Children.map(a, (v) => !s.isValidElement(v) || v.type !== g0 ? null : (g++, v)), {
      renderChildren: h,
      validChildren: x,
      count: g
    };
  }, [a]), y = i ?? p;
  return y === 0 || !m && !b ? null : () => {
    let g = n.loop;
    f * (y - 1) < 1 && (g = !1);
    const h = V(null);
    function x() {
      const U = h.current;
      return U ? (u ? U.offsetHeight : U.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [v, E, w] = Qm(n.defaultIndex), [C, k, O] = A8(!1);
    function P(U) {
      let ee = 0, J = y - 1;
      return n.stuckAtBoundary && (ee += d / f, J -= (1 - f - d) / f), Ne(U, ee, J);
    }
    const [{
      position: _
    }, L] = Le(() => ({
      position: P(v) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (O.current || !g)
          return;
        const U = _.get(), ee = 100 * y, J = Go(U, ee);
        J !== U && L.start({
          position: J,
          immediate: !0
        });
      }
    }), [y]), M = V(null);
    function S() {
      var U;
      (U = M.current) === null || U === void 0 || U.call(M), O.current = !1;
    }
    const $ = Dt((U) => {
      if (M.current = U.cancel, !U.intentional || (U.first && !ma && (ma = l), ma !== l))
        return;
      ma = U.last ? void 0 : l;
      const ee = x();
      if (!ee)
        return;
      const J = u ? 1 : 0, te = U.offset[J], ie = U.direction[J], fe = U.velocity[J];
      if (k(!0), !U.last)
        L.start({
          position: te * 100 / ee,
          immediate: !0
        });
      else {
        const xe = Math.floor(te / ee), qe = xe + 1, De = Math.round((te + fe * 2e3 * ie) / ee);
        R(Ne(De, xe, qe)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([U, ee]) => [-U, -ee],
      from: () => {
        const U = x();
        return [_.get() / 100 * U, _.get() / 100 * U];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (g)
          return {};
        const U = x(), ee = P(0) * U, J = P(y - 1) * U;
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
    function R(U, ee = !1) {
      var J;
      const te = Math.round(U), ie = g ? Go(te, y) : Ne(te, 0, y - 1);
      ie !== w() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, ie)), E(ie), L.start({
        position: (g ? te : P(te)) * 100,
        immediate: ee
      });
    }
    function F() {
      R(Math.round(_.get() / 100) + 1);
    }
    function N() {
      R(Math.round(_.get() / 100) - 1);
    }
    ke(e, () => ({
      swipeTo: R,
      swipeNext: F,
      swipePrev: N
    })), Ae(() => {
      const U = y - 1;
      v > U && R(U, !0);
    });
    const {
      autoplay: T,
      autoplayInterval: A
    } = n, D = () => {
      c.current = window.setTimeout(() => {
        T === "reverse" ? N() : F(), D();
      }, A);
    };
    Q(() => {
      if (!(!T || C))
        return D(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [T, A, C, y]);
    function B(U, ee) {
      let J = {};
      return g && (J = {
        [u ? "y" : "x"]: _.to((te) => {
          let ie = -te + U * 100;
          const fe = y * 100, xe = fe / 2;
          return ie = Go(ie + xe, fe) - xe, `${ie}%`;
        }),
        [u ? "top" : "left"]: `-${U * 100}%`
      }), s.createElement(Ce.div, {
        className: j(`${Rt}-slide`, {
          [`${Rt}-slide-active`]: v === U
        }),
        style: J,
        key: U
      }, ee);
    }
    function H() {
      if (b && i) {
        const ee = Math.max(v - 2, 0), J = Math.min(v + 2, i - 1), te = [];
        for (let ie = ee; ie <= J; ie += 1)
          te.push(B(ie, b(ie)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${Rt}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), te);
      }
      return s.Children.map(m, (U, ee) => B(ee, U));
    }
    function Z() {
      return g ? s.createElement("div", {
        className: `${Rt}-track-inner`
      }, H()) : s.createElement(Ce.div, {
        className: `${Rt}-track-inner`,
        style: {
          [u ? "y" : "x"]: _.to((U) => `${-U}%`)
        }
      }, H());
    }
    const K = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, Y = Object.assign({}, n.allowTouchMove ? $() : {}), re = {};
    for (const U of n.stopPropagation) {
      const ee = T8[U];
      re[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const se = I8(Y, re);
    let ve = null;
    return typeof o == "function" ? ve = o(y, v) : o !== !1 && (ve = s.createElement("div", {
      className: `${Rt}-indicator`
    }, s.createElement(b7, Object.assign({}, n.indicatorProps, {
      total: y,
      current: v,
      direction: r
    })))), W(n, s.createElement("div", {
      className: j(Rt, `${Rt}-${r}`),
      style: K
    }, s.createElement("div", Object.assign({
      ref: h,
      className: j(`${Rt}-track`, {
        [`${Rt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (U) => {
        O.current && U.stopPropagation(), S();
      }
    }, se), Z()), ve));
  };
}));
function Go(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const n9 = pe(D8, {
  Item: g0
}), V8 = ze((t) => W(t, s.createElement("svg", {
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
})))))))), Sn = "adm-switch", j8 = {
  defaultChecked: !1
}, r9 = (t) => {
  const e = q(j8, t), n = e.disabled || e.loading || !1, [r, i] = X(!1), {
    locale: a
  } = ue(), [o, l] = ce({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Pe(this, void 0, void 0, function* () {
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
      if (gd(f)) {
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
    className: j(Sn, {
      [`${Sn}-checked`]: o,
      [`${Sn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${Sn}-checkbox`
  }, s.createElement("div", {
    className: `${Sn}-handle`
  }, (e.loading || r) && s.createElement(V8, {
    className: `${Sn}-spin-icon`
  })), s.createElement("div", {
    className: `${Sn}-inner`
  }, o ? e.checkedText : e.uncheckedText))));
}, B8 = () => null, Wt = "adm-tab-bar", W8 = {
  safeArea: !1
}, Z8 = (t) => {
  var e;
  const n = q(W8, t);
  let r = null;
  const i = [];
  yn(n.children, (l, c) => {
    if (!zn(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [a, o] = ce({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : r,
    onChange: (l) => {
      var c;
      l !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, l));
    }
  });
  return W(n, s.createElement("div", {
    className: Wt
  }, s.createElement("div", {
    className: `${Wt}-wrap`
  }, i.map((l) => {
    const c = l.key === a;
    function u() {
      const f = l.props.icon && s.createElement("div", {
        className: `${Wt}-item-icon`
      }, typeof l.props.icon == "function" ? l.props.icon(c) : l.props.icon), d = l.props.title && s.createElement("div", {
        className: j(`${Wt}-item-title`, !!f && `${Wt}-item-title-with-icon`)
      }, typeof l.props.title == "function" ? l.props.title(c) : l.props.title);
      return f ? s.createElement(s.Fragment, null, s.createElement(ms, {
        content: l.props.badge,
        className: `${Wt}-icon-badge`
      }, f), d) : d ? s.createElement(ms, {
        content: l.props.badge,
        className: `${Wt}-title-badge`
      }, d) : null;
    }
    return W(l.props, s.createElement("div", {
      key: l.key,
      onClick: () => {
        var f, d;
        const {
          key: m
        } = l;
        m != null && (o(m.toString()), (d = (f = l.props).onClick) === null || d === void 0 || d.call(f));
      },
      className: j(`${Wt}-item`, {
        [`${Wt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(Dr, {
    position: "bottom"
  })));
}, i9 = pe(Z8, {
  Item: B8
}), Ju = "adm-tag", H8 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, z8 = {
  color: "default",
  fill: "solid",
  round: !1
}, a9 = (t) => {
  var e;
  const n = q(z8, t), r = (e = H8[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(Ju, {
      [`${Ju}-round`]: n.round
    })
  }, n.children));
}, ni = "adm-text-area", y0 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, q8 = Ee((t, e) => {
  const n = q(y0, t), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, l] = ce(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = V(null), u = V("auto"), f = V(null), d = G1({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown,
    nativeInputRef: c,
    enterKeyHint: n.enterKeyHint
  });
  ke(e, () => ({
    clear: () => {
      l("");
    },
    focus: () => {
      var g;
      (g = c.current) === null || g === void 0 || g.focus();
    },
    blur: () => {
      var g;
      (g = c.current) === null || g === void 0 || g.blur();
    },
    get nativeElement() {
      return c.current;
    }
  })), Ae(() => {
    if (!r)
      return;
    const g = c.current, h = f.current;
    if (!g || (g.style.height = u.current, !h))
      return;
    let x = h.scrollHeight;
    if (typeof r == "object") {
      const v = window.getComputedStyle(g), E = parseFloat(v.lineHeight);
      r.minRows && (x = Math.max(x, r.minRows * E)), r.maxRows && (x = Math.min(x, r.maxRows * E));
    }
    u.current = `${x}px`, g.style.height = `${x}px`;
  }, [o, r]);
  const m = V(!1);
  let p;
  const b = ba(o).length;
  typeof i == "function" ? p = i(b, a) : i && (p = s.createElement("div", {
    className: `${ni}-count`
  }, a === void 0 ? b : b + "/" + a));
  let y = n.rows;
  return typeof r == "object" && (r.maxRows && y > r.maxRows && (y = r.maxRows), r.minRows && y < r.minRows && (y = r.minRows)), W(n, s.createElement("div", {
    className: ni
  }, s.createElement("textarea", {
    ref: c,
    className: `${ni}-element`,
    rows: y,
    value: o,
    placeholder: n.placeholder,
    onChange: (g) => {
      let h = g.target.value;
      a && !m.current && (h = ba(h).slice(0, a).join("")), l(h);
    },
    id: n.id,
    onCompositionStart: (g) => {
      var h;
      m.current = !0, (h = n.onCompositionStart) === null || h === void 0 || h.call(n, g);
    },
    onCompositionEnd: (g) => {
      var h;
      if (m.current = !1, a) {
        const x = g.target.value;
        l(ba(x).slice(0, a).join(""));
      }
      (h = n.onCompositionEnd) === null || h === void 0 || h.call(n, g);
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
  }), p, r && s.createElement("textarea", {
    ref: f,
    className: `${ni}-element ${ni}-element-hidden`,
    value: o,
    rows: y,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
q8.defaultProps = y0;
const Zt = "adm-toast", U8 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, K8 = (t) => {
  const e = q(U8, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = e, o = de(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(Jf, {
          className: `${Zt}-icon-success`
        });
      case "fail":
        return s.createElement(ao, {
          className: `${Zt}-icon-fail`
        });
      case "loading":
        return s.createElement(_l, {
          color: "white",
          className: `${Zt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = de(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return s.createElement(Ai, {
    visible: e.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: e.getContainer,
    afterClose: e.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, e.maskStyle),
    className: j(`${Zt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: j(`${Zt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: j(`${Zt}-main`, i ? `${Zt}-main-icon` : `${Zt}-main-text`)
  }, o && s.createElement("div", {
    className: `${Zt}-icon`
  }, o), s.createElement(wi, null, r))));
};
let tt = null, Xo = null;
const wa = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, Y8 = (t) => s.createElement(K8, Object.assign({}, t));
function G8(t) {
  var e;
  const n = q(wa, typeof t == "string" ? {
    content: t
  } : t), r = s.createElement(Y8, Object.assign({}, n, {
    onClose: () => {
      tt = null;
    }
  }));
  return tt ? !((e = tt.isRendered) === null || e === void 0) && e.call(tt) ? tt.replace(r) : (tt.close(), tt = Bn(r)) : tt = Bn(r), Xo && window.clearTimeout(Xo), n.duration !== 0 && (Xo = window.setTimeout(() => {
    b0();
  }, n.duration)), tt;
}
function b0() {
  tt == null || tt.close(), tt = null;
}
function X8(t) {
  t.duration !== void 0 && (wa.duration = t.duration), t.position !== void 0 && (wa.position = t.position), t.maskClickable !== void 0 && (wa.maskClickable = t.maskClickable);
}
const Q8 = {
  show: G8,
  clear: b0,
  config: X8
}, o9 = Q8;
function E0(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[e] ? i = Math.max(i, n(a[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const ha = "adm-tree-select", J8 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, ey = (t) => {
  const e = q(J8, t), [n, r, i] = Vi(e.fieldNames), [a, o] = ce({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = de(() => {
    const p = E0(e.options, i), b = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
    function g(h, x) {
      x.forEach((v) => {
        y.set(v[r], h), b.set(v[r], v), v[i] && g(v, v[i]);
      });
    }
    return g(void 0, e.options), [p, b, y];
  }, [e.options]), f = (p) => {
    var b;
    const y = [];
    let g = p;
    for (; g; )
      y.push(g), g = u.get(g[r]);
    const h = y.reverse().map((x) => x[r]);
    o(h), (b = e.onChange) === null || b === void 0 || b.call(e, h, {
      options: y
    });
  }, d = (p = [], b) => p.map((y) => {
    const g = y[r] === a[b];
    return s.createElement("div", {
      key: y[r],
      className: j(`${ha}-item`, {
        [`${ha}-item-active`]: g
      }),
      onClick: () => {
        g || f(y);
      }
    }, y[n]);
  }), m = () => {
    var p;
    const b = [];
    for (let y = 0; y < l; y++) {
      let g = `${100 / l}%`;
      l === 2 && y === 0 && (g = "33.33%"), l === 2 && y === 1 && (g = "66.67%");
      const h = s.createElement("div", {
        key: y,
        className: j(`${ha}-column`),
        style: {
          width: g
        }
      }, d(y === 0 ? e.options : (p = c.get(a[y - 1])) === null || p === void 0 ? void 0 : p[i], y));
      b.push(h);
    }
    return b;
  };
  return W(e, s.createElement("div", {
    className: ha
  }, m()));
}, ct = "adm-tree-select-multiple", ty = (t) => {
  const e = q({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  Q(() => {
  }, []);
  const [n, r, i] = Vi(e.fieldNames), [a, o] = ce({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ce({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const O = [], P = (_) => {
      var L;
      _ && (!((L = _[i]) === null || L === void 0) && L.length ? _[i].forEach((M) => P(M)) : O.push(_[r]));
    };
    return P(k), O;
  }, [f, d, m] = de(() => {
    const k = E0(e.options, i), O = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map();
    function _(L, M) {
      M.forEach((S) => {
        P.set(S[r], L), O.set(S[r], S), S[i] && _(S, S[i]);
      });
    }
    return _(void 0, e.options), [k, O, P];
  }, [e.options]), p = de(() => {
    let k = [];
    return l.forEach((O) => {
      const P = d.get(O);
      k = k.concat(u(P));
    }), k;
  }, [l, d]), b = de(() => {
    const k = /* @__PURE__ */ new Map(), O = (P) => {
      const _ = m.get(P);
      _ && (k.set(_[r], !0), O(_[r]));
    };
    return p.forEach((P) => {
      k.set(P, !0), O(P);
    }), k;
  }, [m, l]), y = (k) => {
    var O;
    let P = [...k], _ = [];
    const L = (S) => {
      S.forEach(($) => {
        var R;
        if (_.includes($))
          return;
        const F = m.get($);
        if (!F)
          return;
        const N = ((R = F[i]) === null || R === void 0 ? void 0 : R.map((T) => T[r])) || [];
        N.every((T) => P.includes(T)) && (P.push(F[r]), _ = _.concat(N));
      });
    };
    for (let S = 0; S < f; S++)
      L(P);
    P = P.filter((S) => !_.includes(S));
    const M = P.map((S) => d.get(S));
    c(P), (O = e.onChange) === null || O === void 0 || O.call(e, P, M);
  }, g = (k) => {
    var O;
    const P = [];
    let _ = k;
    for (; _; )
      P.unshift(_), _ = m.get(_[r]);
    const L = P.map((M) => M[r]);
    o(L), (O = e.onExpand) === null || O === void 0 || O.call(e, L, P);
  }, h = (k, O) => {
    var P;
    const _ = (P = e.selectAllText) === null || P === void 0 ? void 0 : P[O];
    if (!_)
      return;
    let L = [];
    k.forEach((S) => {
      L = L.concat(u(S));
    });
    const M = L.every((S) => p.includes(S));
    return s.createElement("div", {
      onClick: () => {
        y(M ? p.filter((S) => !L.includes(S)) : p.concat(L));
      },
      className: `${ct}-item`
    }, _);
  }, x = (k, O) => {
    var P;
    const _ = (P = e.selectAllText) === null || P === void 0 ? void 0 : P[O];
    if (!_)
      return;
    const L = k.map(($) => $[r]), M = L.every(($) => p.includes($)), S = M ? !1 : L.some(($) => p.includes($));
    return s.createElement("div", {
      onClick: () => {
        y(M ? p.filter(($) => !L.includes($)) : p.concat(L));
      },
      className: j(`${ct}-item`, `${ct}-item-leaf`)
    }, s.createElement(du, {
      className: `${ct}-item-checkbox`,
      checked: M,
      indeterminate: S
    }), _);
  }, v = (k) => {
    const O = a.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        O || g(k);
      },
      className: j(`${ct}-item`, {
        [`${ct}-item-expand`]: O
      })
    }, k[n], !!b.get(k[r]) && s.createElement("div", {
      className: `${ct}-dot`
    }));
  }, E = (k) => {
    const O = p.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        y(O ? p.filter((P) => P !== k[r]) : [...p, k[r]]);
      },
      className: j(`${ct}-item`, `${ct}-item-leaf`)
    }, s.createElement(du, {
      className: `${ct}-item-checkbox`,
      checked: O
    }), k[n]);
  }, w = (k = [], O) => k.length === 0 ? void 0 : f === O + 1 ? s.createElement(s.Fragment, null, x(k, O), k.map((_) => E(_))) : s.createElement(s.Fragment, null, h(k, O), k.map((_) => v(_))), C = () => {
    var k;
    const O = [];
    for (let P = 0; P < f; P++) {
      let _ = `${100 / f}%`;
      f === 2 && P === 0 && (_ = "33.33%"), f === 2 && P === 1 && (_ = "66.67%");
      const L = s.createElement("div", {
        key: P,
        className: j(`${ct}-column`),
        style: {
          width: _
        }
      }, w(P === 0 ? e.options : (k = d.get(a[P - 1])) === null || k === void 0 ? void 0 : k[i], P));
      O.push(L);
    }
    return O;
  };
  return W(e, s.createElement("div", {
    className: ct
  }, C()));
}, s9 = pe(ey, {
  Multiple: ty
}), On = "adm-virtual-input", ny = {
  defaultValue: ""
}, l9 = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = ue(), i = q(ny, r, t), [a, o] = ce(i), l = V(null), c = V(null), [u, f] = X(!1), d = gn(s.createElement(hl, null), r.clearIcon, t.clearIcon);
  function m() {
    const h = l.current;
    if (!h || document.activeElement !== h)
      return;
    const x = c.current;
    x && (x.scrollLeft = x.clientWidth);
  }
  Ae(() => {
    m();
  }, [a]), Q(() => {
    u && m();
  }, [u]), ke(e, () => ({
    focus: () => {
      var h;
      (h = l.current) === null || h === void 0 || h.focus();
    },
    blur: () => {
      var h;
      (h = l.current) === null || h === void 0 || h.blur();
    }
  }));
  function p() {
    var h;
    f(!0), (h = i.onFocus) === null || h === void 0 || h.call(i);
  }
  function b() {
    var h;
    f(!1), (h = i.onBlur) === null || h === void 0 || h.call(i);
  }
  const y = i.keyboard, g = y && s.cloneElement(y, {
    onInput: (h) => {
      var x, v;
      o(a + h), (v = (x = y.props).onInput) === null || v === void 0 || v.call(x, h);
    },
    onDelete: () => {
      var h, x;
      o(a.slice(0, -1)), (x = (h = y.props).onDelete) === null || x === void 0 || x.call(h);
    },
    visible: u,
    onClose: () => {
      var h, x, v, E;
      const w = document.activeElement;
      w && (!((h = l.current) === null || h === void 0) && h.contains(w)) ? w.blur() : (x = l.current) === null || x === void 0 || x.blur(), (E = (v = y.props).onClose) === null || E === void 0 || E.call(v);
    },
    getContainer: null
  });
  return W(i, s.createElement("div", {
    ref: l,
    className: j(On, {
      [`${On}-disabled`]: i.disabled
    }),
    tabIndex: i.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: p,
    onBlur: b,
    onClick: i.onClick
  }, s.createElement("div", {
    className: `${On}-content`,
    ref: c,
    "aria-disabled": i.disabled,
    "aria-label": i.placeholder
  }, a, s.createElement("div", {
    className: `${On}-caret-container`
  }, u && s.createElement("div", {
    className: `${On}-caret`
  }))), i.clearable && !!a && u && s.createElement("div", {
    className: `${On}-clear`,
    onClick: (h) => {
      var x;
      h.stopPropagation(), o(""), (x = i.onClear) === null || x === void 0 || x.call(i);
    },
    role: "button",
    "aria-label": n.Input.clear
  }, d), [void 0, null, ""].includes(a) && s.createElement("div", {
    className: `${On}-placeholder`
  }, i.placeholder), g));
}), ef = "adm-water-mark", ry = {
  fullPage: !0
}, c9 = (t) => {
  const e = q(ry, t), {
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
    fontWeight: p = "normal",
    fontColor: b = "rgba(0,0,0,.15)",
    fontSize: y = 14,
    fontFamily: g = "sans-serif"
  } = e, [h, x] = X("");
  return Q(() => {
    const v = document.createElement("canvas"), E = window.devicePixelRatio, w = v.getContext("2d"), C = `${(r + a) * E}px`, k = `${(i + o) * E}px`, O = a * E, P = o * E;
    if (v.setAttribute("width", C), v.setAttribute("height", k), w) {
      if (c) {
        w.translate(O / 2, P / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = new Image();
        _.crossOrigin = "anonymous", _.referrerPolicy = "no-referrer", _.onload = () => {
          w.drawImage(_, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), x(v.toDataURL());
        }, _.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate(O / 2, P / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = Number(y) * E;
        w.font = `${m} normal ${p} ${_}px/${P}px ${g}`, w.fillStyle = b, Array.isArray(d) ? d.forEach((L, M) => w.fillText(L, 0, M * _)) : w.fillText(d, 0, 0), w.restore(), x(v.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, p, a, o, g, b, c, d, y]), W(e, s.createElement("div", {
    className: j(ef, {
      [`${ef}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: h === "" ? void 0 : `url('${h}')`
    }
  }));
}, Fn = "adm-footer", iy = {
  label: "",
  links: [],
  content: "",
  chips: []
}, u9 = (t) => {
  const e = q(iy, t), {
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
    className: j(Fn)
  }, n && s.createElement("div", {
    className: `${Fn}-label`
  }, s.createElement(ps, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${Fn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(ps, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${Fn}-content`
  }, i), a && a.length > 0 && s.createElement("div", {
    className: `${Fn}-chips`
  }, a.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: j(`${Fn}-chip`, {
      [`${Fn}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  uy as ActionSheet,
  wi as AutoCenter,
  fy as Avatar,
  ms as Badge,
  qt as Button,
  dy as Calendar,
  my as CalendarPicker,
  Ep as CalendarPickerView,
  hy as CapsuleTabs,
  vy as Card,
  yy as CascadePicker,
  by as CascadePickerView,
  Ey as Cascader,
  d4 as CascaderView,
  Gd as CenterPopup,
  uu as CheckList,
  du as Checkbox,
  wy as Collapse,
  ly as ConfigProvider,
  Cy as DatePicker,
  xy as DatePickerView,
  ky as Dialog,
  ps as Divider,
  pd as DotLoading,
  $y as Dropdown,
  _y as Ellipsis,
  Sy as Empty,
  Oy as ErrorBlock,
  Fy as FloatingBubble,
  Ny as FloatingPanel,
  u9 as Footer,
  Ry as Form,
  W1 as Grid,
  lo as Image,
  Py as ImageUploader,
  G6 as ImageViewer,
  My as IndexBar,
  Ay as InfiniteScroll,
  X1 as Input,
  Iy as JumboTabs,
  At as List,
  pd as Loading,
  Ai as Mask,
  Ty as Modal,
  Ly as NavBar,
  Dy as NoticeBar,
  Vy as NumberKeyboard,
  b7 as PageIndicator,
  jy as PasscodeInput,
  Hd as Picker,
  Co as PickerView,
  V1 as Popover,
  Lr as Popup,
  By as ProgressBar,
  Wy as ProgressCircle,
  Zy as PullToRefresh,
  Hy as Radio,
  zy as Rate,
  qy as Result,
  Uy as ResultPage,
  Dr as SafeArea,
  Id as ScrollMask,
  Ky as SearchBar,
  Yy as Segmented,
  Gy as Selector,
  Xy as SideBar,
  Ji as Skeleton,
  Qy as Slider,
  Kl as Space,
  _l as SpinLoading,
  Jy as Stepper,
  e9 as Steps,
  t9 as SwipeAction,
  n9 as Swiper,
  r9 as Switch,
  i9 as TabBar,
  cu as Tabs,
  a9 as Tag,
  q8 as TextArea,
  o9 as Toast,
  s9 as TreeSelect,
  l9 as VirtualInput,
  c9 as WaterMark,
  fg as createErrorBlock,
  py as reduceMotion,
  gy as restoreMotion,
  sy as setDefaultConfig,
  ue as useConfig
};
