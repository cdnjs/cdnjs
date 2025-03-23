import * as T from "react";
import s, { useContext as it, useRef as V, useMemo as ce, useEffect as Q, useState as Y, useCallback as Qe, useLayoutEffect as Za, forwardRef as Ee, useImperativeHandle as xe, memo as ze, isValidElement as zn, createContext as Hs, cloneElement as b0 } from "react";
import * as E0 from "react-dom";
import w0, { unstable_batchedUpdates as C0, createPortal as x0, findDOMNode as k0 } from "react-dom";
const Fr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
Fr && document.addEventListener("touchstart", () => {
}, !0);
var wa = function() {
  return wa = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, wa.apply(this, arguments);
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
function Re(t, e, n, r) {
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
function $0(t, e) {
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
function _0(t) {
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
function Tt(t, e) {
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
function zs(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, a; r < i; r++)
      (a || !(r in e)) && (a || (a = Array.prototype.slice.call(e, 0, r)), a[r] = e[r]);
  return t.concat(a || Array.prototype.slice.call(e));
}
const Je = "${label}不是一个有效的${type}", S0 = {
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
}, O0 = S0, ef = {
  current: {
    locale: O0
  }
};
function ay(t) {
  ef.current = t;
}
function Fi() {
  return ef.current;
}
const tf = s.createContext(null), oy = (t) => {
  const {
    children: e
  } = t, n = un(t, ["children"]), r = fe();
  return s.createElement(tf.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function fe() {
  var t;
  return (t = it(tf)) !== null && t !== void 0 ? t : Fi();
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
var nf = { exports: {} };
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
})(nf);
var F0 = nf.exports;
const j = /* @__PURE__ */ $t(F0);
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
var rf = function(t) {
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
}, Nr = function(t) {
  return typeof t == "function";
}, N0 = function(t) {
  return typeof t == "number";
}, P0 = !1;
const Ni = P0;
function Yt(t) {
  Ni && (Nr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = V(t);
  e.current = ce(function() {
    return t;
  }, [t]);
  var n = V();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const qs = rf(Q);
function Jl(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function Ha(t) {
  var e = V(t);
  return e.current = t, e;
}
var R0 = function(t) {
  Ni && (Nr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = Ha(t);
  Q(function() {
    return function() {
      e.current();
    };
  }, []);
};
const Pi = R0;
function M0(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var Us = M0, A0 = typeof mt == "object" && mt && mt.Object === Object && mt, T0 = A0, I0 = T0, L0 = typeof self == "object" && self && self.Object === Object && self, D0 = I0 || L0 || Function("return this")(), af = D0, V0 = af, j0 = function() {
  return V0.Date.now();
}, B0 = j0, W0 = /\s/;
function Z0(t) {
  for (var e = t.length; e-- && W0.test(t.charAt(e)); )
    ;
  return e;
}
var H0 = Z0, z0 = H0, q0 = /^\s+/;
function U0(t) {
  return t && t.slice(0, z0(t) + 1).replace(q0, "");
}
var K0 = U0, Y0 = af, G0 = Y0.Symbol, of = G0, ec = of, sf = Object.prototype, X0 = sf.hasOwnProperty, Q0 = sf.toString, jr = ec ? ec.toStringTag : void 0;
function J0(t) {
  var e = X0.call(t, jr), n = t[jr];
  try {
    t[jr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Q0.call(t);
  return r && (e ? t[jr] = n : delete t[jr]), i;
}
var em = J0, tm = Object.prototype, nm = tm.toString;
function rm(t) {
  return nm.call(t);
}
var im = rm, tc = of, am = em, om = im, sm = "[object Null]", lm = "[object Undefined]", nc = tc ? tc.toStringTag : void 0;
function cm(t) {
  return t == null ? t === void 0 ? lm : sm : nc && nc in Object(t) ? am(t) : om(t);
}
var um = cm;
function fm(t) {
  return t != null && typeof t == "object";
}
var dm = fm, mm = um, hm = dm, vm = "[object Symbol]";
function pm(t) {
  return typeof t == "symbol" || hm(t) && mm(t) == vm;
}
var gm = pm, ym = K0, rc = Us, bm = gm, ic = NaN, Em = /^[-+]0x[0-9a-f]+$/i, wm = /^0b[01]+$/i, Cm = /^0o[0-7]+$/i, xm = parseInt;
function km(t) {
  if (typeof t == "number")
    return t;
  if (bm(t))
    return ic;
  if (rc(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = rc(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = ym(t);
  var n = wm.test(t);
  return n || Cm.test(t) ? xm(t.slice(2), n ? 2 : 8) : Em.test(t) ? ic : +t;
}
var $m = km, _m = Us, ko = B0, ac = $m, Sm = "Expected a function", Om = Math.max, Fm = Math.min;
function Nm(t, e, n) {
  var r, i, a, o, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(Sm);
  e = ac(e) || 0, _m(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? Om(ac(n.maxWait) || 0, e) : a, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var k = r, N = i;
    return r = i = void 0, u = x, o = t.apply(N, k), o;
  }
  function g(x) {
    return u = x, l = setTimeout(h, e), f ? b(x) : o;
  }
  function y(x) {
    var k = x - c, N = x - u, M = e - k;
    return d ? Fm(M, a - N) : M;
  }
  function v(x) {
    var k = x - c, N = x - u;
    return c === void 0 || k >= e || k < 0 || d && N >= a;
  }
  function h() {
    var x = ko();
    if (v(x))
      return C(x);
    l = setTimeout(h, y(x));
  }
  function C(x) {
    return l = void 0, m && r ? b(x) : (r = i = void 0, o);
  }
  function p() {
    l !== void 0 && clearTimeout(l), u = 0, r = c = i = l = void 0;
  }
  function E() {
    return l === void 0 ? o : C(ko());
  }
  function w() {
    var x = ko(), k = v(x);
    if (r = arguments, i = this, c = x, k) {
      if (l === void 0)
        return g(c);
      if (d)
        return clearTimeout(l), l = setTimeout(h, e), b(c);
    }
    return l === void 0 && (l = setTimeout(h, e)), o;
  }
  return w.cancel = p, w.flush = E, w;
}
var lf = Nm;
const Pm = /* @__PURE__ */ $t(lf);
var Rm = !!(typeof window < "u" && window.document && window.document.createElement);
const Ks = Rm;
var Mm = lf, Am = Us, Tm = "Expected a function";
function Im(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(Tm);
  return Am(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Mm(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var Lm = Im;
const Dm = /* @__PURE__ */ $t(Lm);
var Vm = function(t) {
  Ni && (Nr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), Q(function() {
    t == null || t();
  }, []);
};
const jm = Vm;
var Bm = function() {
  var t = Tt(Y({}), 2), e = t[1];
  return Qe(function() {
    return e({});
  }, []);
};
const cf = Bm;
function fn(t, e) {
  if (Ks) {
    if (!t)
      return e;
    var n;
    return Nr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var Wm = function(t) {
  return t.every(function(e) {
    var n = fn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, Zm = function(t) {
  return t ? t.getRootNode() : document;
}, Hm = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return Wm(e) ? Zm(fn(e[0])) : document;
};
const zm = Hm;
var qm = function(t) {
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
      (d.length !== o.current.length || !Jl(d, o.current) || !Jl(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, l.current = r, c.current = n());
    }), Pi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return e;
};
const uf = qm;
var Um = uf(Q);
const Ys = Um;
function ff(t, e, n) {
  n === void 0 && (n = "click");
  var r = Ha(t);
  Ys(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = fn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, a = zm(e), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(l) {
      return a.addEventListener(l, i);
    }), function() {
      o.forEach(function(l) {
        return a.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var df = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(mt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", g = "date", y = "Invalid Date", v = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(O) {
      var $ = ["th", "st", "nd", "rd"], P = O % 100;
      return "[" + O + ($[(P - 20) % 10] || $[P] || $[0]) + "]";
    } }, p = function(O, $, P) {
      var S = String(O);
      return !S || S.length >= $ ? O : "" + Array($ + 1 - S.length).join(P) + O;
    }, E = { s: p, z: function(O) {
      var $ = -O.utcOffset(), P = Math.abs($), S = Math.floor(P / 60), F = P % 60;
      return ($ <= 0 ? "+" : "-") + p(S, 2, "0") + ":" + p(F, 2, "0");
    }, m: function O($, P) {
      if ($.date() < P.date())
        return -O(P, $);
      var S = 12 * (P.year() - $.year()) + (P.month() - $.month()), F = $.clone().add(S, d), I = P - F < 0, R = $.clone().add(S + (I ? -1 : 1), d);
      return +(-(S + (P - F) / (I ? F - R : R - F)) || 0);
    }, a: function(O) {
      return O < 0 ? Math.ceil(O) || 0 : Math.floor(O);
    }, p: function(O) {
      return { M: d, y: b, w: f, d: u, D: g, h: c, m: l, s: o, ms: a, Q: m }[O] || String(O || "").toLowerCase().replace(/s$/, "");
    }, u: function(O) {
      return O === void 0;
    } }, w = "en", x = {};
    x[w] = C;
    var k = function(O) {
      return O instanceof L;
    }, N = function O($, P, S) {
      var F;
      if (!$)
        return w;
      if (typeof $ == "string") {
        var I = $.toLowerCase();
        x[I] && (F = I), P && (x[I] = P, F = I);
        var R = $.split("-");
        if (!F && R.length > 1)
          return O(R[0]);
      } else {
        var D = $.name;
        x[D] = $, F = D;
      }
      return !S && F && (w = F), F || !S && w;
    }, M = function(O, $) {
      if (k(O))
        return O.clone();
      var P = typeof $ == "object" ? $ : {};
      return P.date = O, P.args = arguments, new L(P);
    }, _ = E;
    _.l = N, _.i = k, _.w = function(O, $) {
      return M(O, { locale: $.$L, utc: $.$u, x: $.$x, $offset: $.$offset });
    };
    var L = function() {
      function O(P) {
        this.$L = N(P.locale, null, !0), this.parse(P);
      }
      var $ = O.prototype;
      return $.parse = function(P) {
        this.$d = function(S) {
          var F = S.date, I = S.utc;
          if (F === null)
            return /* @__PURE__ */ new Date(NaN);
          if (_.u(F))
            return /* @__PURE__ */ new Date();
          if (F instanceof Date)
            return new Date(F);
          if (typeof F == "string" && !/Z$/i.test(F)) {
            var R = F.match(v);
            if (R) {
              var D = R[2] - 1 || 0, B = (R[7] || "0").substring(0, 3);
              return I ? new Date(Date.UTC(R[1], D, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, B)) : new Date(R[1], D, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, B);
            }
          }
          return new Date(F);
        }(P), this.$x = P.x || {}, this.init();
      }, $.init = function() {
        var P = this.$d;
        this.$y = P.getFullYear(), this.$M = P.getMonth(), this.$D = P.getDate(), this.$W = P.getDay(), this.$H = P.getHours(), this.$m = P.getMinutes(), this.$s = P.getSeconds(), this.$ms = P.getMilliseconds();
      }, $.$utils = function() {
        return _;
      }, $.isValid = function() {
        return this.$d.toString() !== y;
      }, $.isSame = function(P, S) {
        var F = M(P);
        return this.startOf(S) <= F && F <= this.endOf(S);
      }, $.isAfter = function(P, S) {
        return M(P) < this.startOf(S);
      }, $.isBefore = function(P, S) {
        return this.endOf(S) < M(P);
      }, $.$g = function(P, S, F) {
        return _.u(P) ? this[S] : this.set(F, P);
      }, $.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, $.valueOf = function() {
        return this.$d.getTime();
      }, $.startOf = function(P, S) {
        var F = this, I = !!_.u(S) || S, R = _.p(P), D = function(he, K) {
          var ee = _.w(F.$u ? Date.UTC(F.$y, K, he) : new Date(F.$y, K, he), F);
          return I ? ee : ee.endOf(u);
        }, B = function(he, K) {
          return _.w(F.toDate()[he].apply(F.toDate("s"), (I ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(K)), F);
        }, Z = this.$W, U = this.$M, H = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (R) {
          case b:
            return I ? D(1, 0) : D(31, 11);
          case d:
            return I ? D(1, U) : D(0, U + 1);
          case f:
            var ne = this.$locale().weekStart || 0, ie = (Z < ne ? Z + 7 : Z) - ne;
            return D(I ? H - ie : H + (6 - ie), U);
          case u:
          case g:
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
      }, $.endOf = function(P) {
        return this.startOf(P, !1);
      }, $.$set = function(P, S) {
        var F, I = _.p(P), R = "set" + (this.$u ? "UTC" : ""), D = (F = {}, F[u] = R + "Date", F[g] = R + "Date", F[d] = R + "Month", F[b] = R + "FullYear", F[c] = R + "Hours", F[l] = R + "Minutes", F[o] = R + "Seconds", F[a] = R + "Milliseconds", F)[I], B = I === u ? this.$D + (S - this.$W) : S;
        if (I === d || I === b) {
          var Z = this.clone().set(g, 1);
          Z.$d[D](B), Z.init(), this.$d = Z.set(g, Math.min(this.$D, Z.daysInMonth())).$d;
        } else
          D && this.$d[D](B);
        return this.init(), this;
      }, $.set = function(P, S) {
        return this.clone().$set(P, S);
      }, $.get = function(P) {
        return this[_.p(P)]();
      }, $.add = function(P, S) {
        var F, I = this;
        P = Number(P);
        var R = _.p(S), D = function(U) {
          var H = M(I);
          return _.w(H.date(H.date() + Math.round(U * P)), I);
        };
        if (R === d)
          return this.set(d, this.$M + P);
        if (R === b)
          return this.set(b, this.$y + P);
        if (R === u)
          return D(1);
        if (R === f)
          return D(7);
        var B = (F = {}, F[l] = r, F[c] = i, F[o] = n, F)[R] || 1, Z = this.$d.getTime() + P * B;
        return _.w(Z, this);
      }, $.subtract = function(P, S) {
        return this.add(-1 * P, S);
      }, $.format = function(P) {
        var S = this, F = this.$locale();
        if (!this.isValid())
          return F.invalidDate || y;
        var I = P || "YYYY-MM-DDTHH:mm:ssZ", R = _.z(this), D = this.$H, B = this.$m, Z = this.$M, U = F.weekdays, H = F.months, G = F.meridiem, ne = function(K, ee, J, re) {
          return K && (K[ee] || K(S, I)) || J[ee].slice(0, re);
        }, ie = function(K) {
          return _.s(D % 12 || 12, K, "0");
        }, he = G || function(K, ee, J) {
          var re = K < 12 ? "AM" : "PM";
          return J ? re.toLowerCase() : re;
        };
        return I.replace(h, function(K, ee) {
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
                return ne(F.monthsShort, Z, H, 3);
              case "MMMM":
                return ne(H, Z);
              case "D":
                return S.$D;
              case "DD":
                return _.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return ne(F.weekdaysMin, S.$W, U, 2);
              case "ddd":
                return ne(F.weekdaysShort, S.$W, U, 3);
              case "dddd":
                return U[S.$W];
              case "H":
                return String(D);
              case "HH":
                return _.s(D, 2, "0");
              case "h":
                return ie(1);
              case "hh":
                return ie(2);
              case "a":
                return he(D, B, !0);
              case "A":
                return he(D, B, !1);
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
                return R;
            }
            return null;
          }(K) || R.replace(":", "");
        });
      }, $.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, $.diff = function(P, S, F) {
        var I, R = this, D = _.p(S), B = M(P), Z = (B.utcOffset() - this.utcOffset()) * r, U = this - B, H = function() {
          return _.m(R, B);
        };
        switch (D) {
          case b:
            I = H() / 12;
            break;
          case d:
            I = H();
            break;
          case m:
            I = H() / 3;
            break;
          case f:
            I = (U - Z) / 6048e5;
            break;
          case u:
            I = (U - Z) / 864e5;
            break;
          case c:
            I = U / i;
            break;
          case l:
            I = U / r;
            break;
          case o:
            I = U / n;
            break;
          default:
            I = U;
        }
        return F ? I : _.a(I);
      }, $.daysInMonth = function() {
        return this.endOf(d).$D;
      }, $.$locale = function() {
        return x[this.$L];
      }, $.locale = function(P, S) {
        if (!P)
          return this.$L;
        var F = this.clone(), I = N(P, S, !0);
        return I && (F.$L = I), F;
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
      }, O;
    }(), A = L.prototype;
    return M.prototype = A, [["$ms", a], ["$s", o], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", g]].forEach(function(O) {
      A[O[1]] = function($) {
        return this.$g($, O[0], O[1]);
      };
    }), M.extend = function(O, $) {
      return O.$i || (O($, L, M), O.$i = !0), M;
    }, M.locale = N, M.isDayjs = k, M.unix = function(O) {
      return M(1e3 * O);
    }, M.en = x[w], M.Ls = x, M.p = {}, M;
  });
})(df);
var Km = df.exports;
const ae = /* @__PURE__ */ $t(Km);
function Ym(t, e) {
  var n;
  Ni && (Nr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = Ha(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ce(function() {
    return Pm(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, zs([], Tt(o), !1));
    }, i, e);
  }, []);
  return Pi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function Gm(t, e, n) {
  var r = Tt(Y({}), 2), i = r[0], a = r[1], o = Ym(function() {
    a({});
  }, n).run;
  Q(function() {
    return o();
  }, e), qs(t, [i]);
}
function Xm(t) {
  var e = Tt(Y(t), 2), n = e[0], r = e[1], i = V(n);
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
  function a(p) {
    this.time = p.time, this.target = p.target, this.rootBounds = g(p.rootBounds), this.boundingClientRect = g(p.boundingClientRect), this.intersectionRect = g(p.intersectionRect || b()), this.isIntersecting = !!p.intersectionRect;
    var E = this.boundingClientRect, w = E.width * E.height, x = this.intersectionRect, k = x.width * x.height;
    w ? this.intersectionRatio = Number((k / w).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(p, E) {
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
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(p, E) {
      !p || !E ? i = b() : i = y(p, E), n.forEach(function(w) {
        w._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(p) {
    var E = this._observationTargets.some(function(w) {
      return w.element == p;
    });
    if (!E) {
      if (!(p && p.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: p, entry: null }), this._monitorIntersections(p.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(p) {
    this._observationTargets = this._observationTargets.filter(function(E) {
      return E.element != p;
    }), this._unmonitorIntersections(p.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var p = this._queuedEntries.slice();
    return this._queuedEntries = [], p;
  }, o.prototype._initThresholds = function(p) {
    var E = p || [0];
    return Array.isArray(E) || (E = [E]), E.sort().filter(function(w, x, k) {
      if (typeof w != "number" || isNaN(w) || w < 0 || w > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return w !== k[x - 1];
    });
  }, o.prototype._parseRootMargin = function(p) {
    var E = p || "0px", w = E.split(/\s+/).map(function(x) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(x);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return w[1] = w[1] || w[0], w[2] = w[2] || w[0], w[3] = w[3] || w[1], w;
  }, o.prototype._monitorIntersections = function(p) {
    var E = p.defaultView;
    if (E && this._monitoringDocuments.indexOf(p) == -1) {
      var w = this._checkForIntersections, x = null, k = null;
      this.POLL_INTERVAL ? x = E.setInterval(w, this.POLL_INTERVAL) : (u(E, "resize", w, !0), u(p, "scroll", w, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in E && (k = new E.MutationObserver(w), k.observe(p, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(p), this._monitoringUnsubscribes.push(function() {
        var _ = p.defaultView;
        _ && (x && _.clearInterval(x), f(_, "resize", w, !0)), f(p, "scroll", w, !0), k && k.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || e;
      if (p != N) {
        var M = t(p);
        M && this._monitorIntersections(M.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(p) {
    var E = this._monitoringDocuments.indexOf(p);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, x = this._observationTargets.some(function(M) {
        var _ = M.element.ownerDocument;
        if (_ == p)
          return !0;
        for (; _ && _ != w; ) {
          var L = t(_);
          if (_ = L && L.ownerDocument, _ == p)
            return !0;
        }
        return !1;
      });
      if (!x) {
        var k = this._monitoringUnsubscribes[E];
        if (this._monitoringDocuments.splice(E, 1), this._monitoringUnsubscribes.splice(E, 1), k(), p != w) {
          var N = t(p);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var p = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var E = 0; E < p.length; E++)
      p[E]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var p = this._rootIsInDom(), E = p ? this._getRootRect() : b();
      this._observationTargets.forEach(function(w) {
        var x = w.element, k = m(x), N = this._rootContainsTarget(x), M = w.entry, _ = p && N && this._computeTargetAndRootIntersection(x, k, E), L = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (L = E) : L = b();
        var A = w.entry = new a({
          time: l(),
          target: x,
          boundingClientRect: k,
          rootBounds: L,
          intersectionRect: _
        });
        M ? p && N ? this._hasCrossedThreshold(M, A) && this._queuedEntries.push(A) : M && M.isIntersecting && this._queuedEntries.push(A) : this._queuedEntries.push(A);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(p, E, w) {
    if (window.getComputedStyle(p).display != "none") {
      for (var x = E, k = h(p), N = !1; !N && k; ) {
        var M = null, _ = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (_.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (N = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, M = null, x = null) : M = i : M = w;
          else {
            var L = h(k), A = L && m(L), O = L && this._computeTargetAndRootIntersection(L, A, w);
            A && O ? (k = L, M = y(A, O)) : (k = null, x = null);
          }
        else {
          var $ = k.ownerDocument;
          k != $.body && k != $.documentElement && _.overflow != "visible" && (M = m(k));
        }
        if (M && (x = d(M, x)), !x)
          break;
        k = k && h(k);
      }
      return x;
    }
  }, o.prototype._getRootRect = function() {
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
  }, o.prototype._expandRectByRootMargin = function(p) {
    var E = this._rootMarginValues.map(function(x, k) {
      return x.unit == "px" ? x.value : x.value * (k % 2 ? p.width : p.height) / 100;
    }), w = {
      top: p.top - E[0],
      right: p.right + E[1],
      bottom: p.bottom + E[2],
      left: p.left - E[3]
    };
    return w.width = w.right - w.left, w.height = w.bottom - w.top, w;
  }, o.prototype._hasCrossedThreshold = function(p, E) {
    var w = p && p.isIntersecting ? p.intersectionRatio || 0 : -1, x = E.isIntersecting ? E.intersectionRatio || 0 : -1;
    if (w !== x)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == w || N == x || N < w != N < x)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || v(e, this.root);
  }, o.prototype._rootContainsTarget = function(p) {
    var E = this.root && (this.root.ownerDocument || this.root) || e;
    return v(E, p) && (!this.root || E == p.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
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
    var w = Math.max(p.top, E.top), x = Math.min(p.bottom, E.bottom), k = Math.max(p.left, E.left), N = Math.min(p.right, E.right), M = N - k, _ = x - w;
    return M >= 0 && _ >= 0 && {
      top: w,
      bottom: x,
      left: k,
      right: N,
      width: M,
      height: _
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
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function Qm(t, e) {
  var n = Tt(Y(), 2), r = n[0], i = n[1], a = Tt(Y(), 2), o = a[0], l = a[1];
  return Ys(function() {
    var c = fn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = _0(f), g = b.next(); !g.done; g = b.next()) {
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
      }, wa(wa({}, e), {
        root: fn(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, o];
}
var Jm = Ks ? Za : Q;
const Ae = Jm;
function eh(t) {
  var e = this, n = V(!1);
  return Qe(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Re(e, void 0, void 0, function() {
      var a, o;
      return $0(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, zs([], Tt(r), !1))];
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
function th(t) {
  var e = V(0), n = Tt(Y(t), 2), r = n[0], i = n[1], a = Qe(function(o) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return Pi(function() {
    cancelAnimationFrame(e.current);
  }), [r, a];
}
var nh = function() {
  var t = V(!1);
  return Q(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const Gs = nh;
var mf = function() {
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
}(), Go = typeof window < "u" && typeof document < "u" && window.document === document, Ca = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), rh = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Ca) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), ih = 2;
function ah(t, e) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, t()), r && l();
  }
  function o() {
    rh(a);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < ih)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, e);
    i = c;
  }
  return l;
}
var oh = 20, sh = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], lh = typeof MutationObserver < "u", ch = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = ah(this.refresh.bind(this), oh);
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
      !Go || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), lh ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !Go || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = sh.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), hf = function(t, e) {
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
}, br = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || Ca;
}, vf = za(0, 0, 0, 0);
function xa(t) {
  return parseFloat(t) || 0;
}
function oc(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var a = t["border-" + i + "-width"];
    return r + xa(a);
  }, 0);
}
function uh(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var a = i[r], o = t["padding-" + a];
    n[a] = xa(o);
  }
  return n;
}
function fh(t) {
  var e = t.getBBox();
  return za(0, 0, e.width, e.height);
}
function dh(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return vf;
  var r = br(t).getComputedStyle(t), i = uh(r), a = i.left + i.right, o = i.top + i.bottom, l = xa(r.width), c = xa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + a) !== e && (l -= oc(r, "left", "right") + a), Math.round(c + o) !== n && (c -= oc(r, "top", "bottom") + o)), !hh(t)) {
    var u = Math.round(l + a) - e, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return za(i.left, i.top, l, c);
}
var mh = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof br(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof br(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function hh(t) {
  return t === br(t).document.documentElement;
}
function vh(t) {
  return Go ? mh(t) ? fh(t) : dh(t) : vf;
}
function ph(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return hf(o, {
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
function za(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var gh = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = za(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = vh(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), yh = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = ph(n);
      hf(this, { target: e, contentRect: r });
    }
    return t;
  }()
), bh = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new mf(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof br(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new gh(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof br(e).Element))
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
          return new yh(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), pf = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new mf(), gf = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = ch.getInstance(), r = new bh(e, n, this);
      pf.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  gf.prototype[t] = function() {
    var e;
    return (e = pf.get(this))[t].apply(e, arguments);
  };
});
var Eh = function() {
  return typeof Ca.ResizeObserver < "u" ? Ca.ResizeObserver : gf;
}(), wh = uf(Za);
const Ch = wh;
var xh = Ks ? Ch : Ys;
const kh = xh;
function Xo(t) {
  var e = Tt(th(function() {
    var i = fn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return kh(function() {
    var i = fn(t);
    if (i) {
      var a = new Eh(function(o) {
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
function qa(t, e) {
  var n;
  Ni && (Nr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = Ha(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ce(function() {
    return Dm(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, zs([], Tt(o), !1));
    }, i, e);
  }, []);
  return Pi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var $h = function(t, e) {
  var n = Yt(t), r = V(null), i = Qe(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return Q(function() {
    if (!(!N0(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const _h = $h, sc = 10;
function Sh(t, e) {
  return t > e && t > sc ? "horizontal" : e > t && e > sc ? "vertical" : "";
}
function Oh() {
  const t = V(0), e = V(0), n = V(0), r = V(0), i = V(0), a = V(0), o = V(""), l = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = Sh(i.current, a.current));
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
const Fh = Fr ? window : void 0, Nh = ["scroll", "auto", "overlay"];
function Ph(t) {
  return t.nodeType === 1;
}
function ka(t, e = Fh) {
  let n = t;
  for (; n && n !== e && Ph(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (Nh.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Dn = !1;
if (Fr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Dn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let Br = 0;
const lc = "adm-overflow-hidden";
function Rh(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Ua(t, e) {
  const n = Oh(), r = (o) => {
    n.move(o);
    const l = n.deltaY.current > 0 ? "10" : "01", c = ka(o.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const g = Rh(o.target);
      if (g === document.body || g === document.documentElement) {
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
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(l, 2)) && o.cancelable && Dn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Dn ? {
      passive: !1
    } : !1), Br || document.body.classList.add(lc), Br++;
  }, a = () => {
    Br && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Br--, Br || document.body.classList.remove(lc));
  };
  Q(() => {
    if (e)
      return i(), () => {
        a();
      };
  }, [e]);
}
let Xs = Mi();
const te = (t) => Ri(t, Xs);
let Qs = Mi();
te.write = (t) => Ri(t, Qs);
let Ka = Mi();
te.onStart = (t) => Ri(t, Ka);
let Js = Mi();
te.onFrame = (t) => Ri(t, Js);
let el = Mi();
te.onFinish = (t) => Ri(t, el);
let hr = [];
te.setTimeout = (t, e) => {
  let n = te.now() + e, r = () => {
    let a = hr.findIndex((o) => o.cancel == r);
    ~a && hr.splice(a, 1), sn -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return hr.splice(yf(n), 0, i), sn += 1, bf(), i;
};
let yf = (t) => ~(~hr.findIndex((e) => e.time > t) || ~hr.length);
te.cancel = (t) => {
  Ka.delete(t), Js.delete(t), el.delete(t), Xs.delete(t), Qs.delete(t);
};
te.sync = (t) => {
  Qo = !0, te.batchedUpdates(t), Qo = !1;
};
te.throttle = (t) => {
  let e;
  function n() {
    try {
      t(...e);
    } finally {
      e = null;
    }
  }
  function r(...i) {
    e = i, te.onStart(n);
  }
  return r.handler = t, r.cancel = () => {
    Ka.delete(n), e = null;
  }, r;
};
let tl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
te.use = (t) => tl = t;
te.now = typeof performance < "u" ? () => performance.now() : Date.now;
te.batchedUpdates = (t) => t();
te.catch = console.error;
te.frameLoop = "always";
te.advance = () => {
  te.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : wf();
};
let on = -1, sn = 0, Qo = !1;
function Ri(t, e) {
  Qo ? (e.delete(t), t(0)) : (e.add(t), bf());
}
function bf() {
  on < 0 && (on = 0, te.frameLoop !== "demand" && tl(Ef));
}
function Mh() {
  on = -1;
}
function Ef() {
  ~on && (tl(Ef), te.batchedUpdates(wf));
}
function wf() {
  let t = on;
  on = te.now();
  let e = yf(on);
  if (e && (Cf(hr.splice(0, e), (n) => n.handler()), sn -= e), !sn) {
    Mh();
    return;
  }
  Ka.flush(), Xs.flush(t ? Math.min(64, on - t) : 16.667), Js.flush(), Qs.flush(), el.flush();
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
      e.size && (t = /* @__PURE__ */ new Set(), sn -= e.size, Cf(e, (r) => r(n) && t.add(r)), sn += t.size, e = t);
    }
  };
}
function Cf(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      te.catch(r);
    }
  });
}
function Jo() {
}
const Ah = (t, e, n) => Object.defineProperty(t, e, {
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
function It(t, e, n) {
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
const ri = (t, ...e) => si(t, (n) => n(...e)), nl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let rl, xf, cn = null, kf = !1, il = Jo;
const Th = (t) => {
  t.to && (xf = t.to), t.now && (te.now = t.now), t.colors !== void 0 && (cn = t.colors), t.skipAnimation != null && (kf = t.skipAnimation), t.createStringInterpolator && (rl = t.createStringInterpolator), t.requestAnimationFrame && te.use(t.requestAnimationFrame), t.batchedUpdates && (te.batchedUpdates = t.batchedUpdates), t.willAdvance && (il = t.willAdvance), t.frameLoop && (te.frameLoop = t.frameLoop);
};
var vt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return rl;
  },
  get to() {
    return xf;
  },
  get colors() {
    return cn;
  },
  get skipAnimation() {
    return kf;
  },
  get willAdvance() {
    return il;
  },
  assign: Th
});
const li = /* @__PURE__ */ new Set();
let dt = [], $o = [], $a = 0;
const Ya = {
  get idle() {
    return !li.size && !dt.length;
  },
  start(t) {
    $a > t.priority ? (li.add(t), te.onStart(Ih)) : ($f(t), te(es));
  },
  advance: es,
  sort(t) {
    if ($a)
      te.onFrame(() => Ya.sort(t));
    else {
      const e = dt.indexOf(t);
      ~e && (dt.splice(e, 1), _f(t));
    }
  },
  clear() {
    dt = [], li.clear();
  }
};
function Ih() {
  li.forEach($f), li.clear(), te(es);
}
function $f(t) {
  dt.includes(t) || _f(t);
}
function _f(t) {
  dt.splice(Lh(dt, (e) => e.priority > t.priority), 0, t);
}
function es(t) {
  const e = $o;
  for (let n = 0; n < dt.length; n++) {
    const r = dt[n];
    $a = r.priority, r.idle || (il(r), r.advance(t), r.idle || e.push(r));
  }
  return $a = 0, $o = dt, $o.length = 0, dt = e, dt.length > 0;
}
function Lh(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const Dh = (t, e, n) => Math.min(Math.max(n, t), e), Vh = {
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
}, xt = "[-+]?\\d*\\.?\\d+", _a = xt + "%";
function Ga(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const jh = new RegExp("rgb" + Ga(xt, xt, xt)), Bh = new RegExp("rgba" + Ga(xt, xt, xt, xt)), Wh = new RegExp("hsl" + Ga(xt, _a, _a)), Zh = new RegExp("hsla" + Ga(xt, _a, _a, xt)), Hh = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, zh = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, qh = /^#([0-9a-fA-F]{6})$/, Uh = /^#([0-9a-fA-F]{8})$/;
function Kh(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = qh.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : cn && cn[t] !== void 0 ? cn[t] : (e = jh.exec(t)) ? (Yn(e[1]) << 24 | Yn(e[2]) << 16 | Yn(e[3]) << 8 | 255) >>> 0 : (e = Bh.exec(t)) ? (Yn(e[1]) << 24 | Yn(e[2]) << 16 | Yn(e[3]) << 8 | fc(e[4])) >>> 0 : (e = Hh.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = Uh.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = zh.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Wh.exec(t)) ? (cc(uc(e[1]), zi(e[2]), zi(e[3])) | 255) >>> 0 : (e = Zh.exec(t)) ? (cc(uc(e[1]), zi(e[2]), zi(e[3])) | fc(e[4])) >>> 0 : null;
}
function _o(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function cc(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, a = _o(i, r, t + 1 / 3), o = _o(i, r, t), l = _o(i, r, t - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(l * 255) << 8;
}
function Yn(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function uc(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function fc(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function zi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function dc(t) {
  let e = Kh(t);
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
    return rl(t);
  const r = t, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Gh(u, a);
    return Yh(u, a[f], a[f + 1], i[f], i[f + 1], c, o, l, r.map);
  };
};
function Yh(t, e, n, r, i, a, o, l, c) {
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
function Gh(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Xh = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return Dh(0, 1, i / t);
}, Sa = 1.70158, qi = Sa * 1.525, mc = Sa + 1, hc = 2 * Math.PI / 3, vc = 2 * Math.PI / 4.5, Ui = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Qh = {
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
  easeInBack: (t) => mc * t * t * t - Sa * t * t,
  easeOutBack: (t) => 1 + mc * Math.pow(t - 1, 3) + Sa * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((qi + 1) * 2 * t - qi) / 2 : (Math.pow(2 * t - 2, 2) * ((qi + 1) * (t * 2 - 2) + qi) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * hc),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * hc) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * vc)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * vc) / 2 + 1,
  easeInBounce: (t) => 1 - Ui(1 - t),
  easeOutBounce: Ui,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Ui(1 - 2 * t)) / 2 : (1 + Ui(2 * t - 1)) / 2,
  steps: Xh
};
function ts() {
  return ts = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, ts.apply(this, arguments);
}
const Er = Symbol.for("FluidValue.get"), Vn = Symbol.for("FluidValue.observers"), ut = (t) => !!(t && t[Er]), Ge = (t) => t && t[Er] ? t[Er]() : t, pc = (t) => t[Vn] || null;
function Jh(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function vi(t, e) {
  let n = t[Vn];
  n && n.forEach((r) => {
    Jh(r, e);
  });
}
class Sf {
  constructor(e) {
    if (this[Er] = void 0, this[Vn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    e2(this, e);
  }
}
const e2 = (t, e) => Of(t, Er, e);
function Pr(t, e) {
  if (t[Er]) {
    let n = t[Vn];
    n || Of(t, Vn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
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
const Of = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), ha = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, t2 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, gc = new RegExp(`(${ha.source})(%|[a-z]+)`, "i"), n2 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Xa = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Ff = (t) => {
  const [e, n] = r2(t);
  if (!e || nl())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Xa.test(n))
      return Ff(n);
    if (n)
      return n;
  }
  return t;
}, r2 = (t) => {
  const e = Xa.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let So;
const i2 = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Nf = (t) => {
  So || (So = cn ? new RegExp(`(${Object.keys(cn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((a) => Ge(a).replace(Xa, Ff).replace(t2, dc).replace(So, dc)), n = e.map((a) => a.match(ha).map(Number)), i = n[0].map((a, o) => n.map((l) => {
    if (!(o in l))
      throw Error('The arity of each "output" value must be equal');
    return l[o];
  })).map((a) => hi(ts({}, t, {
    output: a
  })));
  return (a) => {
    var o;
    const l = !gc.test(e[0]) && ((o = e.find((u) => gc.test(u))) == null ? void 0 : o.replace(ha, ""));
    let c = 0;
    return e[0].replace(ha, () => `${i[c++](a)}${l || ""}`).replace(n2, i2);
  };
}, al = "react-spring: ", Pf = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${al}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, a2 = Pf(console.warn);
function o2() {
  a2(`${al}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const s2 = Pf(console.warn);
function l2() {
  s2(`${al}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Qa(t) {
  return z.str(t) && (t[0] == "#" || /\d/.test(t) || !nl() && Xa.test(t) || t in (cn || {}));
}
const ol = nl() ? Q : Za, c2 = () => {
  const t = V(!1);
  return ol(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function Rf() {
  const t = Y()[1], e = c2();
  return () => {
    e.current && t(Math.random());
  };
}
function u2(t, e) {
  const [n] = Y(() => ({
    inputs: e,
    result: t()
  })), r = V(), i = r.current;
  let a = i;
  return a ? e && a.inputs && f2(e, a.inputs) || (a = {
    inputs: e,
    result: t()
  }) : a = n, Q(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function f2(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const Mf = (t) => Q(t, d2), d2 = [];
function yc(t) {
  const e = V();
  return Q(() => {
    e.current = t;
  }), e.current;
}
const gi = Symbol.for("Animated:node"), m2 = (t) => !!t && t[gi] === t, Mt = (t) => t && t[gi], sl = (t, e) => Ah(t, gi, e), Ja = (t) => t && t[gi] && t[gi].getPayload();
class Af {
  constructor() {
    this.payload = void 0, sl(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class Rr extends Af {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, z.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new Rr(e);
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
class wr extends Rr {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = hi({
      output: [e, e]
    });
  }
  static create(e) {
    return new wr(e);
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
const Oa = {
  dependencies: null
};
class eo extends Af {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return It(this.source, (r, i) => {
      m2(r) ? n[i] = r.getValue(e) : ut(r) ? n[i] = Ge(r) : e || (n[i] = r);
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
      return It(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    Oa.dependencies && ut(e) && Oa.dependencies.add(e);
    const n = Ja(e);
    n && le(n, (r) => this.add(r));
  }
}
class ll extends eo {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new ll(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(h2)), !0);
  }
}
function h2(t) {
  return (Qa(t) ? wr : Rr).create(t);
}
function ns(t) {
  const e = Mt(t);
  return e ? e.constructor : z.arr(t) ? ll : Qa(t) ? wr : Rr;
}
function Fa() {
  return Fa = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Fa.apply(this, arguments);
}
const bc = (t, e) => {
  const n = !z.fun(t) || t.prototype && t.prototype.isReactComponent;
  return Ee((r, i) => {
    const a = V(null), o = n && Qe((g) => {
      a.current = g2(i, g);
    }, [i]), [l, c] = p2(r, e), u = Rf(), f = () => {
      const g = a.current;
      if (n && !g)
        return;
      (g ? e.applyAnimatedValues(g, l.getValue(!0)) : !1) === !1 && u();
    }, d = new v2(f, c), m = V();
    ol(() => (m.current = d, le(c, (g) => Pr(g, d)), () => {
      m.current && (le(m.current.deps, (g) => pi(g, m.current)), te.cancel(m.current.update));
    })), Q(f, []), Mf(() => () => {
      const g = m.current;
      le(g.deps, (y) => pi(y, g));
    });
    const b = e.getComponentProps(l.getValue());
    return T.createElement(t, Fa({}, b, {
      ref: o
    }));
  });
};
class v2 {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && te.write(this.update);
  }
}
function p2(t, e) {
  const n = /* @__PURE__ */ new Set();
  return Oa.dependencies = n, t.style && (t = Fa({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new eo(t), Oa.dependencies = null, [t, n];
}
function g2(t, e) {
  return t && (z.fun(t) ? t(e) : t.current = e), e;
}
const Ec = Symbol.for("AnimatedComponent"), y2 = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new eo(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const l = wc(o) || "Anonymous";
    return z.str(o) ? o = a[o] || (a[o] = bc(o, i)) : o = o[Ec] || (o[Ec] = bc(o, i)), o.displayName = `Animated(${l})`, o;
  };
  return It(t, (o, l) => {
    z.arr(t) && (l = wc(o)), a[l] = a(o);
  }), {
    animated: a
  };
}, wc = (t) => z.str(t) ? t : t && z.str(t.displayName) ? t.displayName : z.fun(t) && t.name || null;
function Ie() {
  return Ie = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ie.apply(this, arguments);
}
function Pn(t, ...e) {
  return z.fun(t) ? t(...e) : t;
}
const ci = (t, e) => t === !0 || !!(e && t && (z.fun(t) ? t(e) : nt(t).includes(e))), Tf = (t, e) => z.obj(t) ? e && t[e] : t, If = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, b2 = (t) => t, cl = (t, e = b2) => {
  let n = E2;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const a = e(t[i], i);
    z.und(a) || (r[i] = a);
  }
  return r;
}, E2 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], w2 = {
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
function C2(t) {
  const e = {};
  let n = 0;
  if (It(t, (r, i) => {
    w2[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Lf(t) {
  const e = C2(t);
  if (e) {
    const n = {
      to: e
    };
    return It(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Ie({}, t);
}
function yi(t) {
  return t = Ge(t), z.arr(t) ? t.map(yi) : Qa(t) ? vt.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function x2(t) {
  for (const e in t)
    return !0;
  return !1;
}
function rs(t) {
  return z.fun(t) || z.arr(t) && z.obj(t[0]);
}
function k2(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function $2(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const _2 = {
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
}, is = Ie({}, _2.default, {
  mass: 1,
  damping: 1,
  easing: Qh.linear,
  clamp: !1
});
class S2 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, is);
  }
}
function O2(t, e, n) {
  n && (n = Ie({}, n), Cc(n, e), e = Ie({}, n, e)), Cc(t, e), Object.assign(t, e);
  for (const o in is)
    t[o] == null && (t[o] = is[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = t;
  return z.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * a * r / i), t;
}
function Cc(t, e) {
  if (!z.und(e.decay))
    t.duration = void 0;
  else {
    const n = !z.und(e.tension) || !z.und(e.friction);
    (n || !z.und(e.frequency) || !z.und(e.damping) || !z.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const xc = [];
class F2 {
  constructor() {
    this.changed = !1, this.values = xc, this.toValues = null, this.fromValues = xc, this.to = void 0, this.from = void 0, this.config = new S2(), this.immediate = !1;
  }
}
function Df(t, {
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
      g();
    else {
      z.und(n.pause) || (i.paused = ci(n.pause, e));
      let y = r == null ? void 0 : r.pause;
      y !== !0 && (y = i.paused || ci(y, e)), u = Pn(n.delay || 0, e), y ? (i.resumeQueue.add(b), a.pause()) : (a.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - te.now();
    }
    function b() {
      u > 0 && !vt.skipAnimation ? (i.delayed = !0, f = te.setTimeout(g, u), i.pauseQueue.add(m), i.timeouts.add(f)) : g();
    }
    function g() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Ie({}, n, {
          callId: t,
          cancel: d
        }), o);
      } catch (y) {
        l(y);
      }
    }
  });
}
const ul = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? vr(t.get()) : e.every((n) => n.noop) ? Vf(t.get()) : Ct(t.get(), e.every((n) => n.finished)), Vf = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), Ct = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), vr = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function jf(t, e, n, r) {
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
    const u = cl(e, (v, h) => h === "onRest" ? void 0 : v);
    let f, d;
    const m = new Promise((v, h) => (f = v, d = h)), b = (v) => {
      const h = i <= (n.cancelId || 0) && vr(r) || i !== n.asyncId && Ct(r, !1);
      if (h)
        throw v.result = h, d(v), v;
    }, g = (v, h) => {
      const C = new kc(), p = new $c();
      return (async () => {
        if (vt.skipAnimation)
          throw bi(n), p.result = Ct(r, !1), d(p), p;
        b(C);
        const E = z.obj(v) ? Ie({}, v) : Ie({}, h, {
          to: v
        });
        E.parentId = i, It(u, (x, k) => {
          z.und(E[k]) && (E[k] = x);
        });
        const w = await r.start(E);
        return b(C), n.paused && await new Promise((x) => {
          n.resumeQueue.add(x);
        }), w;
      })();
    };
    let y;
    if (vt.skipAnimation)
      return bi(n), Ct(r, !1);
    try {
      let v;
      z.arr(t) ? v = (async (h) => {
        for (const C of h)
          await g(C);
      })(t) : v = Promise.resolve(t(g, r.stop.bind(r))), await Promise.all([v.then(f), m]), y = Ct(r.get(), !0, !1);
    } catch (v) {
      if (v instanceof kc)
        y = v.result;
      else if (v instanceof $c)
        y = v.result;
      else
        throw v;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? l : void 0, n.promise = a ? c : void 0);
    }
    return z.fun(o) && te.batchedUpdates(() => {
      o(y, r, r.item);
    }), y;
  })();
}
function bi(t, e) {
  si(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class kc extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class $c extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const as = (t) => t instanceof fl;
let N2 = 1;
class fl extends Sf {
  constructor(...e) {
    super(...e), this.id = N2++, this.key = void 0, this._priority = 0;
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
    return o2(), vt.to(this, e);
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
    this.idle || Ya.sort(this), vi(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const jn = Symbol.for("SpringPhase"), Bf = 1, os = 2, ss = 4, Oo = (t) => (t[jn] & Bf) > 0, Xt = (t) => (t[jn] & os) > 0, Wr = (t) => (t[jn] & ss) > 0, _c = (t, e) => e ? t[jn] |= os | Bf : t[jn] &= ~os, Sc = (t, e) => e ? t[jn] |= ss : t[jn] &= ~ss;
class P2 extends fl {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new F2(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !z.und(e) || !z.und(n)) {
      const r = z.obj(e) ? Ie({}, e) : Ie({}, n, {
        from: e
      });
      z.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Xt(this) || this._state.asyncTo) || Wr(this);
  }
  get goal() {
    return Ge(this.animation.to);
  }
  get velocity() {
    const e = Mt(this);
    return e instanceof Rr ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Oo(this);
  }
  get isAnimating() {
    return Xt(this);
  }
  get isPaused() {
    return Wr(this);
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
    const l = Ja(i.to);
    !l && ut(i.to) && (o = nt(Ge(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == wr ? 1 : l ? l[d].lastPosition : o[d];
      let b = i.immediate, g = m;
      if (!b) {
        if (g = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let y = f.elapsedTime += e;
        const v = i.fromValues[d], h = f.v0 != null ? f.v0 : f.v0 = z.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let C;
        const p = a.precision || (v == m ? 5e-3 : Math.min(1, Math.abs(m - v) * 1e-3));
        if (z.und(a.duration))
          if (a.decay) {
            const E = a.decay === !0 ? 0.998 : a.decay, w = Math.exp(-(1 - E) * y);
            g = v + h / (1 - E) * (1 - w), b = Math.abs(f.lastPosition - g) <= p, C = h * w;
          } else {
            C = f.lastVelocity == null ? h : f.lastVelocity;
            const E = a.restVelocity || p / 10, w = a.clamp ? 0 : a.bounce, x = !z.und(w), k = v == m ? f.v0 > 0 : v < m;
            let N, M = !1;
            const _ = 1, L = Math.ceil(e / _);
            for (let A = 0; A < L && (N = Math.abs(C) > E, !(!N && (b = Math.abs(m - g) <= p, b))); ++A) {
              x && (M = g == m || g > m == k, M && (C = -C * w, g = m));
              const O = -a.tension * 1e-6 * (g - m), $ = -a.friction * 1e-3 * C, P = (O + $) / a.mass;
              C = C + P * _, g = g + C * _;
            }
          }
        else {
          let E = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, y = f.elapsedTime += e)), E = (a.progress || 0) + y / this._memoizedDuration, E = E > 1 ? 1 : E < 0 ? 0 : E, f.durationProgress = E), g = v + a.easing(E) * (m - v), C = (g - f.lastPosition) / e, b = E == 1;
        }
        f.lastVelocity = C, Number.isNaN(g) && (console.warn("Got NaN while animating:", this), b = !0);
      }
      l && !l[d].done && (b = !1), b ? f.done = !0 : n = !1, f.setValue(g, a.round) && (r = !0);
    });
    const c = Mt(this), u = c.getValue();
    if (n) {
      const f = Ge(i.to);
      (u !== f || r) && !a.decay ? (c.setValue(f), this._onChange(f)) : r && a.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(e) {
    return te.batchedUpdates(() => {
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
      te.batchedUpdates(() => {
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
    return z.und(e) ? (r = this.queue || [], this.queue = []) : r = [z.obj(e) ? e : Ie({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => ul(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), bi(this._state, e && this._lastCallId), te.batchedUpdates(() => this._stop(n, e)), this;
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
    r = z.obj(r) ? r[n] : r, (r == null || rs(r)) && (r = void 0), i = z.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Oo(this) || (e.reverse && ([r, i] = [i, r]), i = Ge(i), z.und(i) ? Mt(this) || this._set(r) : this._set(i)), a;
  }
  _update(e, n) {
    let r = Ie({}, e);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, cl(r, (c, u) => /^on/.test(u) ? Tf(c, i) : c)), Fc(this, r, "onProps"), Hr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return Df(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: l,
      actions: {
        pause: () => {
          Wr(this) || (Sc(this, !0), ri(l.pauseQueue), Hr(this, "onPause", Ct(this, Zr(this, this.animation.to)), this));
        },
        resume: () => {
          Wr(this) && (Sc(this, !1), Xt(this) && this._resume(), ri(l.resumeQueue), Hr(this, "onResume", Ct(this, Zr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Wf(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(vr(this));
    const i = !z.und(e.to), a = !z.und(e.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(vr(this));
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
    const b = !Ht(m, f);
    b && (c.from = m), m = Ge(m);
    const g = !Ht(d, u);
    g && this._focus(d);
    const y = rs(n.to), {
      config: v
    } = c, {
      decay: h,
      velocity: C
    } = v;
    (i || a) && (v.velocity = 0), n.config && !y && O2(v, Pn(n.config, o), n.config !== l.config ? Pn(l.config, o) : void 0);
    let p = Mt(this);
    if (!p || z.und(d))
      return r(Ct(this, !0));
    const E = z.und(n.reset) ? a && !n.default : !z.und(m) && ci(n.reset, o), w = E ? m : this.get(), x = yi(d), k = z.num(x) || z.arr(x) || Qa(x), N = !y && (!k || ci(l.immediate || n.immediate, o));
    if (g) {
      const A = ns(d);
      if (A !== p.constructor)
        if (N)
          p = this._set(x);
        else
          throw Error(`Cannot animate between ${p.constructor.name} and ${A.name}, as the "to" prop suggests`);
    }
    const M = p.constructor;
    let _ = ut(d), L = !1;
    if (!_) {
      const A = E || !Oo(this) && b;
      (g || A) && (L = Ht(yi(w), x), _ = !L), (!Ht(c.immediate, N) && !N || !Ht(v.decay, h) || !Ht(v.velocity, C)) && (_ = !0);
    }
    if (L && Xt(this) && (c.changed && !E ? _ = !0 : _ || this._stop(u)), !y && ((_ || ut(u)) && (c.values = p.getPayload(), c.toValues = ut(d) ? null : M == wr ? [1] : nt(x)), c.immediate != N && (c.immediate = N, !N && !E && this._set(u)), _)) {
      const {
        onRest: A
      } = c;
      le(M2, ($) => Fc(this, n, $));
      const O = Ct(this, Zr(this, u));
      ri(this._pendingCalls, O), this._pendingCalls.add(r), c.changed && te.batchedUpdates(() => {
        c.changed = !E, A == null || A(O, this), E ? Pn(l.onRest, O) : c.onStart == null || c.onStart(O, this);
      });
    }
    E && this._set(w), y ? r(jf(n.to, n, this._state, this)) : _ ? this._start() : Xt(this) && !g ? this._pendingCalls.add(r) : r(Vf(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (pc(this) && this._detach(), n.to = e, pc(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    ut(n) && (Pr(n, this), as(n) && (e = n.priority + 1)), this.priority = e;
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
        const a = ns(r);
        !i || i.constructor != a ? sl(this, a.create(r)) : i.setValue(r), i && te.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return Mt(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, Hr(this, "onStart", Ct(this, Zr(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), Pn(this.animation.onChange, e, this)), Pn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    Mt(this).reset(Ge(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Xt(this) || (_c(this, !0), Wr(this) || this._resume());
  }
  _resume() {
    vt.skipAnimation ? this.finish() : Ya.start(this);
  }
  _stop(e, n) {
    if (Xt(this)) {
      _c(this, !1);
      const r = this.animation;
      le(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), vi(this, {
        type: "idle",
        parent: this
      });
      const i = n ? vr(this.get()) : Ct(this.get(), Zr(this, e ?? r.to));
      ri(this._pendingCalls, i), r.changed && (r.changed = !1, Hr(this, "onRest", i, this));
    }
  }
}
function Zr(t, e) {
  const n = yi(e), r = yi(t.get());
  return Ht(r, n);
}
function Wf(t, e = t.loop, n = t.to) {
  let r = Pn(e);
  if (r) {
    const i = r !== !0 && Lf(r), a = (i || t).reverse, o = !i || i.reset;
    return Ei(Ie({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !a || rs(n) ? n : void 0,
      from: o ? t.from : void 0,
      reset: o
    }, i));
  }
}
function Ei(t) {
  const {
    to: e,
    from: n
  } = t = Lf(t), r = /* @__PURE__ */ new Set();
  return z.obj(e) && Oc(e, r), z.obj(n) && Oc(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function R2(t) {
  const e = Ei(t);
  return z.und(e.default) && (e.default = cl(e)), e;
}
function Oc(t, e) {
  It(t, (n, r) => n != null && e.add(r));
}
const M2 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Fc(t, e, n) {
  t.animation[n] = e[n] !== If(e, n) ? Tf(e[n], t.key) : void 0;
}
function Hr(t, e, ...n) {
  var r, i, a, o;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (a = (o = t.defaultProps)[e]) == null || a.call(o, ...n);
}
const A2 = ["onStart", "onChange", "onRest"];
let T2 = 1, I2 = class {
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
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), e && this.start(Ie({
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
    return e ? n = nt(e).map(Ei) : this.queue = [], this._flush ? this._flush(this, n) : (Uf(this, n), ls(this, n));
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
    It(this.springs, e);
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
    te.onFrame(this._onFrame);
  }
};
function ls(t, e) {
  return Promise.all(e.map((n) => Zf(t, n))).then((n) => ul(t, n));
}
async function Zf(t, e, n) {
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
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : le(A2, (y) => {
    const v = e[y];
    if (z.fun(v)) {
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
  e.pause === !d.paused ? (d.paused = e.pause, ri(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((y) => t.springs[y].start(e)), b = e.cancel === !0 || If(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(Df(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: Jo,
      resume: Jo,
      start(y, v) {
        b ? (bi(d, t._lastAsyncId), v(vr(t))) : (y.onRest = l, v(jf(f, y, d, t)));
      }
    }
  })), d.paused && await new Promise((y) => {
    d.resumeQueue.add(y);
  });
  const g = ul(t, await Promise.all(m));
  if (o && g.finished && !(n && g.noop)) {
    const y = Wf(e, o, i);
    if (y)
      return Uf(t, [y]), Zf(t, y, !0);
  }
  return c && te.batchedUpdates(() => c(g, t, t.item)), g;
}
function Nc(t, e) {
  const n = Ie({}, t.springs);
  return e && le(nt(e), (r) => {
    z.und(r.keys) && (r = Ei(r)), z.obj(r.to) || (r = Ie({}, r, {
      to: void 0
    })), qf(n, r, (i) => zf(i));
  }), Hf(t, n), n;
}
function Hf(t, e) {
  It(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, Pr(n, t));
  });
}
function zf(t, e) {
  const n = new P2();
  return n.key = t, e && Pr(n, e), n;
}
function qf(t, e, n) {
  e.keys && le(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function Uf(t, e) {
  le(e, (n) => {
    qf(t.springs, n, (r) => zf(r, t));
  });
}
function L2(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const D2 = ["children"], to = (t) => {
  let {
    children: e
  } = t, n = L2(t, D2);
  const r = it(Na), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = u2(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = Na;
  return T.createElement(o, {
    value: n
  }, e);
}, Na = V2(to, {});
to.Provider = Na.Provider;
to.Consumer = Na.Consumer;
function V2(t, e) {
  return Object.assign(t, T.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const j2 = () => {
  const t = [], e = function(i) {
    l2();
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
function B2(t, e, n) {
  const r = z.fun(e) && e;
  r && !n && (n = []);
  const i = ce(() => r || arguments.length == 3 ? j2() : void 0, []), a = V(0), o = Rf(), l = ce(() => ({
    ctrls: [],
    queue: [],
    flush(h, C) {
      const p = Nc(h, C);
      return a.current > 0 && !l.queue.length && !Object.keys(p).some((w) => !h.springs[w]) ? ls(h, C) : new Promise((w) => {
        Hf(h, p), l.queue.push(() => {
          w(ls(h, C));
        }), o();
      });
    }
  }), []), c = V([...l.ctrls]), u = [], f = yc(t) || 0;
  ce(() => {
    le(c.current.slice(t, f), (h) => {
      k2(h, i), h.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), ce(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(h, C) {
    for (let p = h; p < C; p++) {
      const E = c.current[p] || (c.current[p] = new I2(null, l.flush)), w = r ? r(p, E) : e[p];
      w && (u[p] = R2(w));
    }
  }
  const m = c.current.map((h, C) => Nc(h, u[C])), b = it(to), g = yc(b), y = b !== g && x2(b);
  ol(() => {
    a.current++, l.ctrls = c.current;
    const {
      queue: h
    } = l;
    h.length && (l.queue = [], le(h, (C) => C())), le(c.current, (C, p) => {
      i == null || i.add(C), y && C.start({
        default: b
      });
      const E = u[p];
      E && ($2(C, E.ref), C.ref ? C.queue.push(E) : C.start(E));
    });
  }), Mf(() => () => {
    le(l.ctrls, (h) => h.stop(!0));
  });
  const v = m.map((h) => Ie({}, h));
  return i ? [v, i] : v;
}
function Le(t, e) {
  const n = z.fun(t), [[r], i] = B2(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Pc;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(Pc || (Pc = {}));
class Kf extends fl {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = hi(...n);
    const r = this._get(), i = ns(r);
    sl(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    Ht(n, r) || (Mt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Rc(this._active) && Fo(this);
  }
  _get() {
    const e = z.arr(this.source) ? this.source.map(Ge) : nt(Ge(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !Rc(this._active) && (this.idle = !1, le(Ja(this), (e) => {
      e.done = !1;
    }), vt.skipAnimation ? (te.batchedUpdates(() => this.advance()), Fo(this)) : Ya.start(this));
  }
  _attach() {
    let e = 1;
    le(nt(this.source), (n) => {
      ut(n) && Pr(n, this), as(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    le(nt(this.source), (e) => {
      ut(e) && pi(e, this);
    }), this._active.clear(), Fo(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = nt(this.source).reduce((n, r) => Math.max(n, (as(r) ? r.priority : 0) + 1), 0));
  }
}
function W2(t) {
  return t.idle !== !1;
}
function Rc(t) {
  return !t.size || Array.from(t).every(W2);
}
function Fo(t) {
  t.idle || (t.idle = !0, le(Ja(t), (e) => {
    e.done = !0;
  }), vi(t, {
    type: "idle",
    parent: t
  }));
}
const Z2 = (t, ...e) => new Kf(t, e);
vt.assign({
  createStringInterpolator: Nf,
  to: (t, e) => new Kf(t, e)
});
function dl(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const H2 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], Yf = /^--/;
function z2(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !Yf.test(t) && !(ui.hasOwnProperty(t) && ui[t]) ? e + "px" : ("" + e).trim();
}
const Mc = {};
function q2(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: l,
    viewBox: c
  } = r, u = dl(r, H2), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : Mc[m] || (Mc[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  a !== void 0 && (t.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = z2(m, i[m]);
      Yf.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
    }
  d.forEach((m, b) => {
    t.setAttribute(m, f[b]);
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
const U2 = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), K2 = ["Webkit", "Ms", "Moz", "O"];
ui = Object.keys(ui).reduce((t, e) => (K2.forEach((n) => t[U2(n, e)] = t[e]), t), ui);
const Y2 = ["x", "y", "z"], G2 = /^(matrix|translate|scale|rotate|skew)/, X2 = /^(translate)/, Q2 = /^(rotate|skew)/, No = (t, e) => z.num(t) && t !== 0 ? t + e : t, va = (t, e) => z.arr(t) ? t.every((n) => va(n, e)) : z.num(t) ? t === e : parseFloat(t) === e;
class J2 extends eo {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, a = dl(e, Y2);
    const o = [], l = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => No(u, "px")).join(",")})`, va(c, 0)])), It(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (G2.test(u)) {
        if (delete a[u], z.und(c))
          return;
        const f = X2.test(u) ? "px" : Q2.test(u) ? "deg" : "";
        o.push(nt(c)), l.push(u === "rotate3d" ? ([d, m, b, g]) => [`rotate3d(${d},${m},${b},${No(g, f)})`, va(g, 0)] : (d) => [`${u}(${d.map((m) => No(m, f)).join(",")})`, va(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new ev(o, l)), super(a);
  }
}
class ev extends Sf {
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
const tv = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], nv = ["scrollTop", "scrollLeft"];
vt.assign({
  batchedUpdates: C0,
  createStringInterpolator: Nf,
  colors: Vh
});
const rv = y2(tv, {
  applyAnimatedValues: q2,
  createAnimatedStyle: (t) => new J2(t),
  getComponentProps: (t) => dl(t, nv)
}), Ce = rv.animated;
function iv(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function Mr(t, e) {
  if (Fr && t) {
    const n = iv(t);
    return x0(e, n);
  }
  return e;
}
function av(t) {
  const e = V(t);
  return t && (e.current = !0), !!e.current;
}
const Ar = (t) => no(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function no(t, e, n) {
  const r = av(t);
  return e || t ? !0 : r ? !n : !1;
}
const ov = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function dn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = ov[r];
    n[i] = function(a) {
      var o, l;
      a.stopPropagation(), (l = (o = e.props)[i]) === null || l === void 0 || l.call(o, a);
    };
  }
  return s.cloneElement(e, n);
}
const Po = "adm-mask", sv = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, lv = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, cv = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, Ai = (t) => {
  const e = q(cv, t), {
    locale: n
  } = fe(), r = V(null);
  Ua(r, e.visible && e.disableBodyScroll);
  const i = ce(() => {
    var f;
    const d = (f = sv[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = lv[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [a, o] = Y(e.visible), l = Gs(), {
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
    className: Po,
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
    className: `${Po}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${Po}-content`
  }, e.children))));
  return s.createElement(Ar, {
    active: a,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, Mr(e.getContainer, u));
};
function Gf(t) {
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
function uv(t) {
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
function Xf(t) {
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
function fv(t) {
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
function ml(t) {
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
function ro(t) {
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
function dv(t) {
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
function Qf(t) {
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
function mv(t) {
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
function hv(t) {
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
function vv(t) {
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
function pv(t) {
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
function gv(t) {
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
function yv(t) {
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
function bv(t) {
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
function Ev(t) {
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
function Ac(t) {
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
const hl = {
  closeOnMaskClick: !1,
  closeIcon: s.createElement(ro, null),
  destroyOnClose: !1,
  disableBodyScroll: !0,
  forceRender: !1,
  getContainer: () => document.body,
  mask: !0,
  showCloseButton: !1,
  stopPropagation: ["click"],
  visible: !1
};
function Jf(t) {
  const [e, n] = Y(t);
  return Ae(() => {
    n(t);
  }, [t]), e;
}
function wv(t, e, n) {
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
function Ic(t, e, n, r = 0.15) {
  return r === 0 ? wv(t, e, n) : t < e ? -Tc(e - t, n - e, r) + e : t > n ? +Tc(t - n, n - e, r) + n : t;
}
function Cv(t, [e, n], [r, i]) {
  const [[a, o], [l, c]] = t;
  return [Ic(e, a, o, r), Ic(n, l, c, i)];
}
function xv(t, e) {
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
function kv(t) {
  var e = xv(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function je(t, e, n) {
  return e = kv(e), e in t ? Object.defineProperty(t, e, {
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
function $e(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Lc(Object(n), !0).forEach(function(r) {
      je(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Lc(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const ed = {
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
function Dc(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const $v = ["enter", "leave"];
function _v(t = !1, e) {
  return t && !$v.includes(e);
}
function Sv(t, e = "", n = !1) {
  const r = ed[t], i = r && r[e] || e;
  return "on" + Dc(t) + Dc(i) + (_v(n, i) ? "Capture" : "");
}
const Ov = ["gotpointercapture", "lostpointercapture"];
function Fv(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = Ov.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function Nv(t, e = "") {
  const n = ed[t], r = n && n[e] || e;
  return t + r;
}
function io(t) {
  return "touches" in t;
}
function td(t) {
  return io(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function Pv(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function Rv(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function nd(t) {
  return io(t) ? Rv(t)[0] : t;
}
function cs(t, e) {
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
function Mv(t) {
  return Pv(t).map((e) => e.identifier);
}
function Vc(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return cs(n, r);
}
function Ro(t) {
  const e = nd(t);
  return io(t) ? e.identifier : e.pointerId;
}
function jc(t) {
  const e = nd(t);
  return [e.clientX, e.clientY];
}
const Bc = 40, Wc = 800;
function rd(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= Bc, n *= Bc) : r === 2 && (e *= Wc, n *= Wc), [e, n];
}
function Av(t) {
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
function Iv(...t) {
  return t.length === 0 ? Tv : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function Zc(t, e) {
  return Object.assign({}, e, t || {});
}
const Lv = 32;
class id {
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, Av(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Me.addTo(n._distance, x);
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
    const b = n.offset, g = n._active && !n._blocked || n.active;
    g && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = Pa(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [y, v] = n.offset, [[h, C], [p, E]] = n._bounds;
    n.overflow = [y < h ? -1 : y > C ? 1 : 0, v < p ? -1 : v > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = Cv(n._bounds, n.offset, w), n.delta = Me.sub(n.offset, b), this.computeMovement(), g && (!n.last || a > Lv)) {
      n.delta = Me.sub(n.offset, b);
      const x = n.delta.map(Math.abs);
      Me.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [x[0] / a, x[1] / a], n.timeDelta = a);
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
function Dv([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class ad extends id {
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
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[td(e)] : r.axisThreshold;
      n.axis = Dv(n._movement, i);
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
const Vv = (t) => t, Hc = 0.15, od = {
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
        return [Hc, Hc];
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
    return this.hasCustomTransform = !!r, r || Vv;
  },
  threshold(t) {
    return Me.toVector(t, 0);
  }
}, jv = 0, Tr = $e($e({}, od), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = jv) {
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
}), zc = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class Bv extends ad {
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = Ro(e), r._pointerActive = !0, this.computeValues(jc(e)), this.computeInitial(), n.preventScrollAxis && td(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = Ro(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = jc(e);
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
    const i = Ro(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(e);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
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
    this.state._preventScroll = !1, Wv(e);
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
    const n = zc[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Me.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in zc && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Wv(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const Ti = typeof window < "u" && window.document && window.document.createElement;
function sd() {
  return Ti && "ontouchstart" in window;
}
function Zv() {
  return sd() || Ti && window.navigator.maxTouchPoints > 1;
}
function Hv() {
  return Ti && "onpointerdown" in window;
}
function zv() {
  return Ti && "exitPointerLock" in window.document;
}
function qv() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const ft = {
  isBrowser: Ti,
  gesture: qv(),
  touch: sd(),
  touchscreen: Zv(),
  pointer: Hv(),
  pointerLock: zv()
}, Uv = 250, Kv = 180, Yv = 0.5, Gv = 50, Xv = 250, Qv = 10, qc = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Jv = $e($e({}, Tr), {}, {
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
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Uv : void 0, !(!ft.touchscreen || n === !1))
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
    velocity: t = Yv,
    distance: e = Gv,
    duration: n = Xv
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
        return Kv;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? $e($e({}, qc), t) : qc;
  },
  keyboardDisplacement(t = Qv) {
    return t;
  }
});
function ld(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [a, o] = t._direction;
  (e < 0 && r > 0 && a < 0 || e > 0 && r < 0 && a > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (t._movement[1] = t._movementBound[1]);
}
const e3 = 30, t3 = 100;
class n3 extends id {
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
      const i = Math.abs(n) * e3 - Math.abs(r);
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
    const i = Vc(e, n._touchIds);
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
    const a = cs(...Array.from(r.values()));
    a && this.pinchStart(e, a);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = Vc(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = cs(...Array.from(n.values()));
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
    r._delta = [-rd(e)[1] / t3 * r.offset[0], 0], Me.addTo(r._movement, r._delta), ld(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const r3 = $e($e({}, od), {}, {
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
      const l = Zc(Pa(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, a = (o) => {
      const l = Zc(Pa(r, o), {
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
class i3 extends ad {
  constructor(...e) {
    super(...e), je(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = rd(e), Me.addTo(n._movement, n._delta), ld(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const a3 = Tr;
$e($e({}, Tr), {}, {
  mouseOnly: (t = !0) => t
});
const vl = /* @__PURE__ */ new Map(), us = /* @__PURE__ */ new Map();
function pl(t) {
  vl.set(t.key, t.engine), us.set(t.key, t.resolver);
}
const cd = {
  key: "drag",
  engine: Bv,
  resolver: Jv
}, o3 = {
  key: "pinch",
  engine: n3,
  resolver: r3
}, s3 = {
  key: "wheel",
  engine: i3,
  resolver: a3
};
function l3(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function c3(t, e) {
  if (t == null)
    return {};
  var n = l3(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const u3 = {
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
}, f3 = ["target", "eventOptions", "window", "enabled", "transform"];
function pa(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = pa(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function d3(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  } = r, u = c3(r, f3);
  if (n.shared = pa({
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  }, u3), e) {
    const f = us.get(e);
    n[e] = pa($e({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = us.get(f);
      d && (n[f] = pa($e({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class ud {
  constructor(e, n) {
    je(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, a) {
    const o = this._listeners, l = Nv(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = $e($e({}, c), a);
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
class m3 {
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
class h3 {
  constructor(e) {
    je(this, "gestures", /* @__PURE__ */ new Set()), je(this, "_targetEventStore", new ud(this)), je(this, "gestureEventStores", {}), je(this, "gestureTimeoutStores", {}), je(this, "handlers", {}), je(this, "config", {}), je(this, "pointerIds", /* @__PURE__ */ new Set()), je(this, "touchIds", /* @__PURE__ */ new Set()), je(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), v3(this, e);
  }
  setEventIds(e) {
    if (io(e))
      return this.touchIds = new Set(Mv(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = d3(e, n, this.config);
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
          const l = this.config[o], c = Uc(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = vl.get(o);
            new u(this, e, o).bind(c);
          }
        }
        const a = Uc(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (l) => this.nativeHandlers[o]($e($e({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = Iv(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: l,
          passive: c
        } = Fv(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function Gn(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new ud(t, e), t.gestureTimeoutStores[e] = new m3();
}
function v3(t, e) {
  e.drag && Gn(t, "drag"), e.wheel && Gn(t, "wheel"), e.scroll && Gn(t, "scroll"), e.move && Gn(t, "move"), e.pinch && Gn(t, "pinch"), e.hover && Gn(t, "hover");
}
const Uc = (t, e, n) => (r, i, a, o = {}, l = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : e.capture, d = (u = o.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : Sv(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(a);
}, p3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function g3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    p3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Xn(t, e, n, r, i, a) {
  if (!t.has(n) || !vl.has(r))
    return;
  const o = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && o in e && e[o](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function y3(t, e) {
  const [n, r, i] = g3(t), a = {};
  return Xn(i, n, "onDrag", "drag", a, e), Xn(i, n, "onWheel", "wheel", a, e), Xn(i, n, "onScroll", "scroll", a, e), Xn(i, n, "onPinch", "pinch", a, e), Xn(i, n, "onMove", "move", a, e), Xn(i, n, "onHover", "hover", a, e), {
    handlers: a,
    config: e,
    nativeHandlers: r
  };
}
function gl(t, e = {}, n, r) {
  const i = s.useMemo(() => new h3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function Dt(t, e) {
  return pl(cd), gl({
    drag: t
  }, e || {}, "drag");
}
function b3(t, e) {
  return pl(s3), gl({
    wheel: t
  }, e || {}, "wheel");
}
function E3(t) {
  return t.forEach(pl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = y3(n, r || {});
    return gl(i, o, void 0, a);
  };
}
const Ki = "adm-popup", w3 = Object.assign(Object.assign({}, hl), {
  closeOnSwipe: !1,
  position: "bottom"
}), Ir = (t) => {
  const {
    locale: e,
    popup: n = {}
  } = fe(), r = q(w3, n, t), i = j(`${Ki}-body`, r.bodyClassName, `${Ki}-body-position-${r.position}`), [a, o] = Y(r.visible), l = V(null);
  Ua(l, r.disableBodyScroll && a ? "strict" : !1), Ae(() => {
    r.visible && o(!0);
  }, [r.visible]);
  const c = Gs(), {
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
      var b, g;
      c.current || (o(r.visible), r.visible ? (b = r.afterShow) === null || b === void 0 || b.call(r) : (g = r.afterClose) === null || g === void 0 || g.call(r));
    }
  }), f = Dt(({
    swipe: [, b]
  }) => {
    var g;
    r.closeOnSwipe && (b === 1 && r.position === "bottom" || b === -1 && r.position === "top") && ((g = r.onClose) === null || g === void 0 || g.call(r));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(r.position)
  }), d = Jf(a && r.visible), m = dn(r.stopPropagation, W(r, s.createElement("div", Object.assign({
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
    onMaskClick: (b) => {
      var g, y;
      (g = r.onMaskClick) === null || g === void 0 || g.call(r, b), r.closeOnMaskClick && ((y = r.onClose) === null || y === void 0 || y.call(r));
    },
    className: r.maskClassName,
    style: r.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: r.stopPropagation
  }), s.createElement(Ce.div, {
    className: i,
    style: Object.assign(Object.assign({}, r.bodyStyle), {
      pointerEvents: u.to((b) => b === 0 ? "unset" : "none"),
      transform: u.to((b) => r.position === "bottom" ? `translate(0, ${b}%)` : r.position === "top" ? `translate(0, -${b}%)` : r.position === "left" ? `translate(-${b}%, 0)` : r.position === "right" ? `translate(${b}%, 0)` : "none")
    }),
    ref: l
  }, r.showCloseButton && s.createElement("a", {
    className: j(`${Ki}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var b;
      (b = r.onClose) === null || b === void 0 || b.call(r);
    },
    role: "button",
    "aria-label": e.common.close
  }, r.closeIcon), r.children))));
  return s.createElement(Ar, {
    active: a,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose
  }, Mr(r.getContainer, m));
}, Kc = "adm-safe-area", Lr = (t) => W(t, s.createElement("div", {
  className: j(Kc, `${Kc}-position-${t.position}`)
})), Ra = Object.assign({}, E0), {
  version: C3,
  render: x3,
  unmountComponentAtNode: k3
} = Ra;
let ao;
try {
  Number((C3 || "").split(".")[0]) >= 18 && Ra.createRoot && (ao = Ra.createRoot);
} catch {
}
function Yc(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = Ra;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const Ma = "__antd_mobile_root__";
function $3(t, e) {
  x3(t, e);
}
function _3(t, e) {
  Yc(!0);
  const n = e[Ma] || ao(e);
  Yc(!1), n.render(t), e[Ma] = n;
}
function S3(t, e) {
  if (ao) {
    _3(t, e);
    return;
  }
  $3(t, e);
}
function O3(t) {
  return k3(t);
}
function F3(t) {
  return Re(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[Ma]) === null || e === void 0 || e.unmount(), delete t[Ma];
    });
  });
}
function N3(t) {
  return ao ? F3(t) : O3(t);
}
function Ii(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    N3(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return S3(t, e), n;
}
function Bn(t) {
  const e = s.forwardRef((i, a) => {
    const [o, l] = Y(!1), c = V(!1), [u, f] = Y(t), d = V(0);
    Q(() => {
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
    return xe(a, () => ({
      close: m,
      replace: (g) => {
        var y, v;
        d.current++, (v = (y = u.props).afterClose) === null || v === void 0 || v.call(y), f(g);
      }
    })), s.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: b
    }));
  }), n = s.createRef(), r = Ii(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Re(this, void 0, void 0, function* () {
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
}, fd = (t) => {
  const e = q(P3, t), {
    styles: n
  } = e;
  return s.createElement(Ir, {
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
  }, e.cancelText)))), e.safeArea && s.createElement(Lr, {
    position: "bottom"
  }))));
};
function R3(t) {
  return Bn(s.createElement(fd, Object.assign({}, t)));
}
const ly = pe(fd, {
  show: R3
}), Gc = "adm-auto-center", wi = (t) => W(t, s.createElement("div", {
  className: Gc
}, s.createElement("div", {
  className: `${Gc}-content`
}, t.children))), M3 = ze(() => s.createElement("svg", {
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
var yl = {}, A3 = mt && mt.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(yl, "__esModule", { value: !0 });
var bl = yl.staged = void 0;
const T3 = A3(s);
function dd(t) {
  return typeof t == "function" ? T3.default.createElement(I3, { stage: t }) : t;
}
function I3(t) {
  const e = t.stage();
  return dd(e);
}
function L3(t) {
  return function(n, r) {
    const i = t(n, r);
    return dd(i);
  };
}
bl = yl.staged = L3;
function Rn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const D3 = (t) => {
  const e = V(null), [n] = Qm(e);
  return Q(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, Li = rf(Ae), V3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), j3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Aa = "adm-image", B3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${Aa}-tip`
  }, s.createElement(V3, null)),
  fallback: s.createElement("div", {
    className: `${Aa}-tip`
  }, s.createElement(j3, null)),
  lazy: !1,
  draggable: !1
}, oo = bl((t) => {
  const e = q(B3, t), [n, r] = Y(!1), [i, a] = Y(!1), o = V(null), l = V(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = Y(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, Li(() => {
    r(!1), a(!1);
  }, [c]), Q(() => {
    var g;
    !((g = l.current) === null || g === void 0) && g.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const g = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${Aa}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (y) => {
        var v;
        r(!0), (v = e.onLoad) === null || v === void 0 || v.call(e, y);
      },
      onError: (y) => {
        var v;
        a(!0), (v = e.onError) === null || v === void 0 || v.call(e, y);
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
  return e.width && (b["--width"] = Rn(e.width), b.width = Rn(e.width)), e.height && (b["--height"] = Rn(e.height), b.height = Rn(e.height)), W(e, s.createElement("div", {
    ref: o,
    className: Aa,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(D3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), W3 = "adm-avatar", Z3 = {
  fallback: s.createElement(M3, null),
  fit: "cover"
}, cy = (t) => {
  const e = q(Z3, t);
  return W(e, s.createElement(oo, {
    className: W3,
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
}, Qn = "adm-badge", md = s.createElement(s.Fragment, null), H3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === md, a = j(Qn, {
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
}, fs = pe(H3, {
  dot: md
}), z3 = "adm-dot-loading", q3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, U3 = {
  color: "default"
}, hd = ze((t) => {
  var e;
  const n = q(U3, t);
  return W(n, s.createElement("div", {
    style: {
      color: (e = q3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: j("adm-loading", z3)
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
function vd(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function K3() {
  return Fr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const ot = "adm-button", Y3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(hd, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, qt = Ee((t, e) => {
  const n = q(Y3, t), [r, i] = Y(!1), a = V(null), o = n.loading === "auto" ? r : n.loading, l = n.disabled || o;
  xe(e, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Re(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (vd(f))
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
}), Xc = () => s.createElement("svg", {
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
})))))), Qc = () => s.createElement("svg", {
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
var pd = { exports: {} };
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
        var f, d, m, b, g = o(this), y = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), b = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (b += 7), m.add(b, n));
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
})(pd);
var G3 = pd.exports;
const so = /* @__PURE__ */ $t(G3);
function ue(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = cf(), a = V(e !== void 0 ? e : n);
  e !== void 0 && (a.current = e);
  const o = Yt((l, c = !1) => {
    const u = typeof l == "function" ? l(a.current) : l;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function X3(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function Jc(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function Mo(t) {
  return ae().year(t.year).month(t.month - 1).date(1);
}
ae.extend(so);
const we = "adm-calendar", Q3 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(Xc, null),
  prevYearButton: s.createElement(Qc, null),
  nextMonthButton: s.createElement(Xc, null),
  nextYearButton: s.createElement(Qc, null)
}, uy = Ee((t, e) => {
  const n = ae(), r = q(Q3, t), {
    locale: i
  } = fe(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const p = a.pop();
    p && a.unshift(p);
  }
  const [o, l] = ue({
    value: r.value === void 0 ? void 0 : Jc(r.selectionMode, r.value),
    defaultValue: Jc(r.selectionMode, r.defaultValue),
    onChange: (p) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, p ? p[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, p));
    }
  }), [c, u] = Y(!1), [f, d] = Y(() => ae(o ? o[0] : n).date(1));
  qs(() => {
    var p;
    (p = r.onPageChange) === null || p === void 0 || p.call(r, f.year(), f.month() + 1);
  }, [f]), xe(e, () => ({
    jumpTo: (p) => {
      let E;
      typeof p == "function" ? E = p({
        year: f.year(),
        month: f.month() + 1
      }) : E = p, d(Mo(E));
    },
    jumpToToday: () => {
      d(ae().date(1));
    }
  }));
  const m = (p, E, w) => {
    const x = f[p](E, w);
    if (p === "subtract" && r.minPage) {
      const k = Mo(r.minPage);
      if (x.isBefore(k, w))
        return;
    }
    if (p === "add" && r.maxPage) {
      const k = Mo(r.maxPage);
      if (x.isAfter(k, w))
        return;
    }
    d(x);
  }, b = s.createElement("div", {
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
  }, X3(i.Calendar.yearAndMonth, {
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
  }, r.nextYearButton)), g = ce(() => r.max && ae(r.max), [r.max]), y = ce(() => r.min && ae(r.min), [r.min]);
  function v() {
    var p;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const x = w;
      let k = !1, N = !1, M = !1, _ = !1, L = !1;
      if (o) {
        const [$, P] = o;
        N = x.isSame($, "day"), M = x.isSame(P, "day"), k = N || M || x.isAfter($, "day") && x.isBefore(P, "day"), k && (_ = (E.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !N, L = (E.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !M);
      }
      const A = x.month() === f.month(), O = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : g && x.isAfter(g, "day") || y && x.isBefore(y, "day");
      E.push(s.createElement("div", {
        key: x.valueOf(),
        className: j(`${we}-cell`, (O || !A) && `${we}-cell-disabled`, A && {
          [`${we}-cell-today`]: x.isSame(n, "day"),
          [`${we}-cell-selected`]: k,
          [`${we}-cell-selected-begin`]: N,
          [`${we}-cell-selected-end`]: M,
          [`${we}-cell-selected-row-begin`]: _,
          [`${we}-cell-selected-row-end`]: L
        }),
        onClick: () => {
          if (!r.selectionMode || O)
            return;
          const $ = x.toDate();
          A || d(x.clone().date(1));
          function P() {
            if (!r.allowClear || !o)
              return !1;
            const [S, F] = o;
            return x.isSame(S, "date") && x.isSame(F, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && P()) {
              l(null);
              return;
            }
            l([$, $]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              l([$, $]), u(!0);
              return;
            }
            if (P()) {
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
        className: `${we}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), s.createElement("div", {
        className: `${we}-cell-bottom`
      }, (p = r.renderLabel) === null || p === void 0 ? void 0 : p.call(r, x.toDate())))), w = w.add(1, "day");
    }
    return E;
  }
  const h = s.createElement("div", {
    className: `${we}-cells`
  }, v()), C = s.createElement("div", {
    className: `${we}-mark`
  }, a.map((p, E) => s.createElement("div", {
    key: E,
    className: `${we}-mark-cell`
  }, p)));
  return W(r, s.createElement("div", {
    className: we
  }, b, C, h));
});
var gd = { exports: {} };
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
})(gd);
var J3 = gd.exports;
const ep = /* @__PURE__ */ $t(J3);
function eu(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function tp(t) {
  return ae().year(t.year).month(t.month - 1).date(1);
}
function ds(t) {
  var e = T.useRef();
  e.current = t;
  var n = T.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(a));
  }, []);
  return n;
}
function yd(t) {
  if (Array.isArray(t))
    return t;
}
function np(t, e) {
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
function ms(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function El(t, e) {
  if (t) {
    if (typeof t == "string")
      return ms(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return ms(t, e);
  }
}
function bd() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fe(t, e) {
  return yd(t) || np(t, e) || El(t, e) || bd();
}
function lo() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var tu = lo() ? T.useLayoutEffect : T.useEffect, Ed = function(e, n) {
  var r = T.useRef(!0);
  tu(function() {
    return e(r.current);
  }, n), tu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, nu = function(e, n) {
  Ed(function(r) {
    if (!r)
      return e();
  }, n);
};
function pr(t) {
  var e = T.useRef(!1), n = T.useState(t), r = Fe(n, 2), i = r[0], a = r[1];
  T.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function o(l, c) {
    c && e.current || a(l);
  }
  return [i, o];
}
function Ao(t) {
  return t !== void 0;
}
function wd(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, l = pr(function() {
    return Ao(i) ? i : Ao(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = Fe(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, b = ds(a), g = pr([d]), y = Fe(g, 2), v = y[0], h = y[1];
  nu(function() {
    var p = v[0];
    u !== p && b(u, p);
  }, [v]), nu(function() {
    Ao(i) || f(i);
  }, [i]);
  var C = ds(function(p, E) {
    f(p, E), h([d], E);
  });
  return [m, C];
}
function _e(t) {
  "@babel/helpers - typeof";
  return _e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, _e(t);
}
var Cd = { exports: {} }, ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wl = Symbol.for("react.element"), Cl = Symbol.for("react.portal"), co = Symbol.for("react.fragment"), uo = Symbol.for("react.strict_mode"), fo = Symbol.for("react.profiler"), mo = Symbol.for("react.provider"), ho = Symbol.for("react.context"), rp = Symbol.for("react.server_context"), vo = Symbol.for("react.forward_ref"), po = Symbol.for("react.suspense"), go = Symbol.for("react.suspense_list"), yo = Symbol.for("react.memo"), bo = Symbol.for("react.lazy"), ip = Symbol.for("react.offscreen"), xd;
xd = Symbol.for("react.module.reference");
function gt(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case wl:
        switch (t = t.type, t) {
          case co:
          case fo:
          case uo:
          case po:
          case go:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case rp:
              case ho:
              case vo:
              case bo:
              case yo:
              case mo:
                return t;
              default:
                return e;
            }
        }
      case Cl:
        return e;
    }
  }
}
ge.ContextConsumer = ho;
ge.ContextProvider = mo;
ge.Element = wl;
ge.ForwardRef = vo;
ge.Fragment = co;
ge.Lazy = bo;
ge.Memo = yo;
ge.Portal = Cl;
ge.Profiler = fo;
ge.StrictMode = uo;
ge.Suspense = po;
ge.SuspenseList = go;
ge.isAsyncMode = function() {
  return !1;
};
ge.isConcurrentMode = function() {
  return !1;
};
ge.isContextConsumer = function(t) {
  return gt(t) === ho;
};
ge.isContextProvider = function(t) {
  return gt(t) === mo;
};
ge.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === wl;
};
ge.isForwardRef = function(t) {
  return gt(t) === vo;
};
ge.isFragment = function(t) {
  return gt(t) === co;
};
ge.isLazy = function(t) {
  return gt(t) === bo;
};
ge.isMemo = function(t) {
  return gt(t) === yo;
};
ge.isPortal = function(t) {
  return gt(t) === Cl;
};
ge.isProfiler = function(t) {
  return gt(t) === fo;
};
ge.isStrictMode = function(t) {
  return gt(t) === uo;
};
ge.isSuspense = function(t) {
  return gt(t) === po;
};
ge.isSuspenseList = function(t) {
  return gt(t) === go;
};
ge.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === co || t === fo || t === uo || t === po || t === go || t === ip || typeof t == "object" && t !== null && (t.$$typeof === bo || t.$$typeof === yo || t.$$typeof === mo || t.$$typeof === ho || t.$$typeof === vo || t.$$typeof === xd || t.getModuleId !== void 0);
};
ge.typeOf = gt;
Cd.exports = ge;
var Ci = Cd.exports;
function kd(t, e) {
  typeof t == "function" ? t(e) : _e(t) === "object" && t && "current" in t && (t.current = e);
}
function $d() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e.filter(function(i) {
    return i;
  });
  return r.length <= 1 ? r[0] : function(i) {
    e.forEach(function(a) {
      kd(a, i);
    });
  };
}
function ap(t) {
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
function op(t, e) {
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
function _d(t) {
  var e = op(t, "string");
  return _e(e) === "symbol" ? e : String(e);
}
function de(t, e, n) {
  return e = _d(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function ru(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function X(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ru(Object(n), !0).forEach(function(r) {
      de(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : ru(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function sp(t) {
  if (Array.isArray(t))
    return ms(t);
}
function Sd(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function lp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function me(t) {
  return sp(t) || Sd(t) || El(t) || lp();
}
function cp(t) {
  return yd(t) || Sd(t) || El(t) || bd();
}
function Od(t, e, n, r) {
  if (!e.length)
    return n;
  var i = cp(e), a = i[0], o = i.slice(1), l;
  return !t && typeof a == "number" ? l = [] : Array.isArray(t) ? l = me(t) : l = X({}, t), r && n === void 0 && o.length === 1 ? delete l[a][o[0]] : l[a] = Od(l[a], o, n, r), l;
}
function Et(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !kt(t, e.slice(0, -1)) ? t : Od(t, e, n, r);
}
function up(t) {
  return _e(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function iu(t) {
  return Array.isArray(t) ? [] : {};
}
var fp = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function ii() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = iu(e[0]);
  return e.forEach(function(i) {
    function a(o, l) {
      var c = new Set(l), u = kt(i, o), f = Array.isArray(u);
      if (f || up(u)) {
        if (!c.has(u)) {
          c.add(u);
          var d = kt(r, o);
          f ? r = Et(r, o, []) : (!d || _e(d) !== "object") && (r = Et(r, o, iu(u))), fp(u).forEach(function(m) {
            a([].concat(me(o), [m]), c);
          });
        }
      } else
        r = Et(r, o, u);
    }
    a([]);
  }), r;
}
var hs = {}, dp = function(e) {
};
function mp(t, e) {
}
function hp(t, e) {
}
function vp() {
  hs = {};
}
function Fd(t, e, n) {
  !e && !hs[n] && (t(!1, n), hs[n] = !0);
}
function ht(t, e) {
  Fd(mp, t, e);
}
function pp(t, e) {
  Fd(hp, t, e);
}
ht.preMessage = dp;
ht.resetWarned = vp;
ht.noteOnce = pp;
function gp(t, e, n) {
  const r = V(), i = () => {
    r.current && cancelAnimationFrame(r.current);
  }, a = ds((o) => {
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
ae.extend(so);
ae.extend(ep);
const Pe = "adm-calendar-picker-view", Nd = s.createContext({
  visible: !1
}), yp = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, bp = Ee((t, e) => {
  var n;
  const r = V(null), i = ae(), a = q(yp, t), {
    locale: o
  } = fe(), l = [...o.Calendar.markItems];
  if (a.weekStartsOn === "Sunday") {
    const A = l.pop();
    A && l.unshift(A);
  }
  const [c, u] = ue({
    value: a.value === void 0 ? void 0 : eu(a.selectionMode, a.value),
    defaultValue: eu(a.selectionMode, a.defaultValue),
    onChange: (A) => {
      var O, $;
      a.selectionMode === "single" ? (O = a.onChange) === null || O === void 0 || O.call(a, A ? A[0] : null) : a.selectionMode === "range" && (($ = a.onChange) === null || $ === void 0 || $.call(a, A));
    }
  }), [f, d] = Y(!1), [m, b] = Y(() => ae(c ? c[0] : i).date(1)), g = (A) => {
    A && b(ae(A[0]).date(1)), u(A);
  }, y = a.title !== !1, v = it(Nd), h = gp(m, v.visible, r), [C, p] = Y(m), [E, w] = Y(() => m.add(6, "month"));
  Q(() => {
    if (c) {
      const [A, O] = c;
      !a.min && A && ae(A).isBefore(C) && p(ae(A).date(1)), !a.max && O && ae(O).isAfter(E) && w(ae(O).endOf("month"));
    }
  }, [c]);
  const x = ce(() => a.max ? ae(a.max) : E, [a.max, E]), k = ce(() => a.min ? ae(a.min) : C, [a.min, C]);
  xe(e, () => ({
    jumpTo: (A) => {
      let O;
      typeof A == "function" ? O = A({
        year: m.year(),
        month: m.month() + 1
      }) : O = A;
      const $ = tp(O);
      b($), h($);
    },
    jumpToToday: () => {
      const A = ae().date(1);
      b(A), h(A);
    },
    getDateRange: () => c
  }));
  const N = s.createElement("div", {
    className: `${Pe}-header`
  }, s.createElement("div", {
    className: `${Pe}-title`
  }, (n = a.title) !== null && n !== void 0 ? n : o.Calendar.title));
  function M() {
    var A;
    const O = [];
    let $ = k;
    for (; $.isSameOrBefore(x, "month"); ) {
      const P = $.year(), S = $.month() + 1, F = {
        year: P,
        month: S
      }, I = `${P}-${S}`, R = a.weekStartsOn === "Monday" ? $.date(1).isoWeekday() - 1 : $.date(1).isoWeekday(), D = R == 7 ? null : Array(R).fill(null).map((B, Z) => s.createElement("div", {
        key: Z,
        className: `${Pe}-cell`
      }));
      O.push(s.createElement("div", {
        key: I,
        "data-year-month": I
      }, s.createElement("div", {
        className: `${Pe}-title`
      }, (A = o.Calendar.yearAndMonth) === null || A === void 0 ? void 0 : A.replace(/\${(.*?)}/g, (B, Z) => {
        var U;
        return (U = F[Z]) === null || U === void 0 ? void 0 : U.toString();
      })), s.createElement("div", {
        className: `${Pe}-cells`
      }, D, Array($.daysInMonth()).fill(null).map((B, Z) => {
        var U;
        const H = $.date(Z + 1);
        let G = !1, ne = !1, ie = !1, he = !1, K = !1;
        if (c) {
          const [re, oe] = c;
          ne = H.isSame(re, "day"), ie = H.isSame(oe, "day"), G = ne || ie || H.isAfter(re, "day") && H.isBefore(oe, "day"), G && (he = (O.length % 7 === 0 || H.isSame(H.startOf("month"), "day")) && !ne, K = (O.length % 7 === 6 || H.isSame(H.endOf("month"), "day")) && !ie);
        }
        const ee = a.shouldDisableDate ? a.shouldDisableDate(H.toDate()) : x && H.isAfter(x, "day") || k && H.isBefore(k, "day"), J = () => {
          var re;
          const oe = (re = a.renderTop) === null || re === void 0 ? void 0 : re.call(a, H.toDate());
          if (oe)
            return oe;
          if (a.selectionMode === "range") {
            if (ne)
              return o.Calendar.start;
            if (ie)
              return o.Calendar.end;
          }
          if (H.isSame(i, "day") && !G)
            return o.Calendar.today;
        };
        return s.createElement("div", {
          key: H.valueOf(),
          className: j(`${Pe}-cell`, {
            [`${Pe}-cell-today`]: H.isSame(i, "day"),
            [`${Pe}-cell-selected`]: G,
            [`${Pe}-cell-selected-begin`]: ne,
            [`${Pe}-cell-selected-end`]: ie,
            [`${Pe}-cell-selected-row-begin`]: he,
            [`${Pe}-cell-selected-row-end`]: K,
            [`${Pe}-cell-disabled`]: !!ee
          }),
          onClick: () => {
            if (!a.selectionMode || ee)
              return;
            const re = H.toDate();
            function oe() {
              if (!a.allowClear || !c)
                return !1;
              const [ve, ke] = c;
              return H.isSame(ve, "date") && H.isSame(ke, "day");
            }
            if (a.selectionMode === "single") {
              if (a.allowClear && oe()) {
                g(null);
                return;
              }
              g([re, re]);
            } else if (a.selectionMode === "range") {
              if (!c) {
                g([re, re]), d(!0);
                return;
              }
              if (oe()) {
                g(null), d(!1);
                return;
              }
              if (f) {
                const ve = c[0];
                g(ve > re ? [re, ve] : [ve, re]), d(!1);
              } else
                g([re, re]), d(!0);
            }
          }
        }, s.createElement("div", {
          className: `${Pe}-cell-top`
        }, J()), s.createElement("div", {
          className: `${Pe}-cell-date`
        }, a.renderDate ? a.renderDate(H.toDate()) : H.date()), s.createElement("div", {
          className: `${Pe}-cell-bottom`
        }, (U = a.renderBottom) === null || U === void 0 ? void 0 : U.call(a, H.toDate())));
      })))), $ = $.add(1, "month");
    }
    return O;
  }
  const _ = s.createElement("div", {
    className: `${Pe}-body`,
    ref: r
  }, M()), L = s.createElement("div", {
    className: `${Pe}-mark`
  }, l.map((A, O) => s.createElement("div", {
    key: O,
    className: `${Pe}-mark-cell`
  }, A)));
  return W(a, s.createElement("div", {
    className: Pe
  }, y && N, L, _));
}), Yi = "adm-divider", Ep = {
  contentPosition: "center",
  direction: "horizontal"
}, vs = (t) => {
  const e = q(Ep, t);
  return W(e, s.createElement("div", {
    className: j(Yi, `${Yi}-${e.direction}`, `${Yi}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${Yi}-content`
  }, e.children)));
}, Gi = "adm-calendar-picker", wp = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, fy = Ee((t, e) => {
  const n = q(wp, t), {
    locale: r
  } = fe(), i = e ?? V(null), {
    visible: a,
    confirmText: o,
    popupClassName: l,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: b,
    onMaskClick: g,
    getContainer: y
  } = n, v = un(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), h = s.useMemo(() => ({
    visible: !!a
  }), [a]), C = s.createElement("div", {
    className: `${Gi}-footer`
  }, s.createElement(vs, null), s.createElement("div", {
    className: `${Gi}-footer-bottom`
  }, s.createElement(qt, {
    color: "primary",
    onClick: () => {
      var p, E, w, x;
      const k = (E = (p = i.current) === null || p === void 0 ? void 0 : p.getDateRange()) !== null && E !== void 0 ? E : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, k ? k[0] : null) : n.selectionMode === "range" && ((x = n.onConfirm) === null || x === void 0 || x.call(n, k)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return W(n, s.createElement("div", {
    className: Gi
  }, s.createElement(Ir, {
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
      g == null || g(), d && (m == null || m());
    },
    getContainer: y
  }, s.createElement(Nd.Provider, {
    value: h
  }, s.createElement(bp, Object.assign({
    ref: i
  }, v))), C)));
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
function Pd(t, e, n) {
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
function xl(t, e, n) {
  const r = Yt(t);
  Q(() => Pd(e.current, n, r), [e]);
}
function Ne(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const Rd = (t, e) => {
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
    const c = o.children.item(e).children.item(0), u = c.offsetLeft, f = c.offsetWidth, d = o.offsetWidth, m = o.scrollWidth, b = o.scrollLeft;
    if (m - d <= 0)
      return;
    const y = Ne(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: y,
      from: {
        scrollLeft: b
      },
      immediate: a && !n.isAnimating
    });
  }
  return Ae(() => {
    i(!0);
  }, []), Li(() => {
    i();
  }, [e]), xl(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Xi = "adm-scroll-mask", Md = (t) => {
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
  } = qa((o = !1) => {
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
const Qt = "adm-capsule-tabs", Cp = () => null, xp = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  yn(t.children, (d, m) => {
    if (!zn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const g = o.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ue({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Rd(n, i[l]);
  return Di(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Qt,
    ref: r
  }, s.createElement("div", {
    className: `${Qt}-header`
  }, s.createElement(Md, {
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
    return s.createElement(Ar, {
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
}, dy = pe(xp, {
  Tab: Cp
}), Jn = "adm-card", my = (t) => {
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
function au(t, e, n) {
  return t * e * n / (e + n * t);
}
function xi(t, e, n, r, i = 0.15) {
  return i === 0 ? Ne(t, e, n) : t < e ? -au(e - t, r, i) + e : t > n ? +au(t - n, r, i) + n : t;
}
var kp = typeof Element < "u", $p = typeof Map == "function", _p = typeof Set == "function", Sp = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function ga(t, e) {
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
        if (!ga(t[r], e[r]))
          return !1;
      return !0;
    }
    var a;
    if ($p && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!ga(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (_p && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (Sp && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if (kp && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !ga(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var Op = function(e, n) {
  try {
    return ga(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const ps = /* @__PURE__ */ $t(Op);
function Ad(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const St = "adm-picker-view", Td = ze((t) => {
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
    h && (f.current = Ad(window.getComputedStyle(h).getPropertyValue("height")));
  }), Ae(() => {
    if (l.current || e === null)
      return;
    const h = n.findIndex((p) => p.value === e);
    if (h < 0)
      return;
    const C = h * -f.current;
    o.start({
      y: C,
      immediate: a.goal !== C
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
    const C = h * -f.current;
    o.start({
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
      const N = k + x * E * 50, M = Ne(N, C, p), _ = -Math.round(M / f.current);
      d(_);
    } else {
      const N = k;
      o.start({
        y: xi(N, C, p, f.current * 50, 0.2)
      });
    }
  }, g = (h) => {
    l.current = !0;
    const C = -((n.length - 1) * f.current), p = 0, {
      direction: E,
      last: w,
      velocity: x,
      distance: k
    } = m(h), N = -E, M = a.get();
    if (w) {
      l.current = !1;
      const _ = x * N * 50, L = M + k * N + _, A = Ne(L, C, p), O = -Math.round(A / f.current);
      d(O);
    } else {
      const _ = M + k * N;
      o.start({
        y: xi(_, C, p, f.current * 50, 0.2)
      });
    }
  };
  Dt((h) => {
    h.event.stopPropagation(), b(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), b3((h) => {
    h.event.stopPropagation(), g(h);
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
  function v() {
    if (y === null)
      return null;
    const h = n[y], C = y - 1, p = y + 1, E = n[C], w = n[p];
    return s.createElement("div", {
      className: `${St}-column-accessible`
    }, s.createElement("div", {
      className: `${St}-column-accessible-current`,
      role: "button",
      "aria-label": h ? `当前选择的是：${h.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${St}-column-accessible-button`,
      onClick: () => {
        E && d(C);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${St}-column-accessible-button`,
      onClick: () => {
        w && d(p);
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
      className: j(`${St}-column-item`, {
        [`${St}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${St}-column-item-label`
    }, r(h)));
  })), v());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !ps(t.column, e.column)));
Td.displayName = "Wheel";
function ou(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function Id(t, e) {
  const n = ou(() => (typeof t == "function" ? t(e) : t).map((o) => o.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = ou(() => e.map((a, o) => {
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
function Ld(t, e) {
  return ce(() => Id(t, e), [t, e]);
}
const Dd = (t) => t.label;
var Vd = { exports: {} }, jd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cr = s;
function Fp(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Np = typeof Object.is == "function" ? Object.is : Fp, Pp = Cr.useState, Rp = Cr.useEffect, Mp = Cr.useLayoutEffect, Ap = Cr.useDebugValue;
function Tp(t, e) {
  var n = e(), r = Pp({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return Mp(function() {
    i.value = n, i.getSnapshot = e, To(i) && a({ inst: i });
  }, [t, n, e]), Rp(function() {
    return To(i) && a({ inst: i }), t(function() {
      To(i) && a({ inst: i });
    });
  }, [t]), Ap(n), n;
}
function To(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Np(t, n);
  } catch {
    return !0;
  }
}
function Ip(t, e) {
  return e();
}
var Lp = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Ip : Tp;
jd.useSyncExternalStore = Cr.useSyncExternalStore !== void 0 ? Cr.useSyncExternalStore : Lp;
Vd.exports = jd;
var Dp = Vd.exports;
let kl = !1;
const gs = /* @__PURE__ */ new Set();
function Bd() {
  gs.forEach((t) => {
    t();
  });
}
function hy() {
  kl = !0, Bd(), vt.assign({
    skipAnimation: !0
  });
}
function vy() {
  kl = !1, Bd(), vt.assign({
    skipAnimation: !1
  });
}
function su() {
  return kl;
}
function Vp(t) {
  return gs.add(t), () => {
    gs.delete(t);
  };
}
function jp() {
  return Dp.useSyncExternalStore(Vp, su, su);
}
const Io = "adm-spin-loading", Bp = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, Wp = {
  color: "default"
}, Zp = 15 * 3.14159265358979 * 2, $l = ze((t) => {
  var e;
  const n = q(Wp, t), r = jp(), {
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
    className: Io,
    style: {
      "--color": (e = Bp[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${Io}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(Ce.circle, {
    className: `${Io}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: Zp,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), ur = "adm-picker-view", Hp = {
  defaultValue: [],
  renderLabel: Dd,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${ur}-loading-content`
  }, s.createElement($l, null))
}, Eo = ze((t) => {
  const e = q(Hp, t), [n, r] = Y(e.value === void 0 ? e.defaultValue : e.value);
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
  const i = Ld(e.columns, n), a = i.columns;
  Gm(() => {
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
    className: `${ur}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, a.map((l, c) => s.createElement(Td, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: o,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${ur}-mask`
  }, s.createElement("div", {
    className: `${ur}-mask-top`
  }), s.createElement("div", {
    className: `${ur}-mask-middle`
  }), s.createElement("div", {
    className: `${ur}-mask-bottom`
  })))));
});
Eo.displayName = "PickerView";
const Jt = "adm-picker", zp = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: Dd,
  destroyOnClose: !1,
  forceRender: !1
}, _l = ze(Ee((t, e) => {
  var n;
  const {
    locale: r
  } = fe(), i = q(zp, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [a, o] = ue({
    value: i.visible,
    defaultValue: !1,
    onChange: (v) => {
      var h;
      v === !1 && ((h = i.onClose) === null || h === void 0 || h.call(i));
    }
  }), l = {
    toggle: () => {
      o((v) => !v);
    },
    open: () => {
      o(!0);
    },
    close: () => {
      o(!1);
    }
  };
  xe(e, () => l);
  const [c, u] = ue(Object.assign(Object.assign({}, i), {
    onChange: (v) => {
      var h;
      const C = Id(i.columns, v);
      (h = i.onConfirm) === null || h === void 0 || h.call(i, v, C);
    }
  })), f = Ld(i.columns, c), [d, m] = Y(c);
  Q(() => {
    d !== c && m(c);
  }, [a]), Q(() => {
    a || m(c);
  }, [c]);
  const b = Yt((v, h) => {
    var C;
    m(v), a && ((C = i.onSelect) === null || C === void 0 || C.call(i, v, h));
  }), g = W(i, s.createElement("div", {
    className: Jt
  }, s.createElement("div", {
    className: `${Jt}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${Jt}-header-button`,
    onClick: () => {
      var v;
      (v = i.onCancel) === null || v === void 0 || v.call(i), o(!1);
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
  }, s.createElement(Eo, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: b
  })))), y = s.createElement(Ir, {
    style: i.popupStyle,
    className: j(`${Jt}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var v;
      i.closeOnMaskClick && ((v = i.onCancel) === null || v === void 0 || v.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, g, s.createElement(Lr, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, y, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
_l.displayName = "Picker";
function qp(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = Y(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(_l, Object.assign({}, t, {
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
    }, r = Ii(s.createElement(n, null));
  });
}
const Wd = pe(_l, {
  prompt: qp
});
function Zd(t) {
  const e = ce(() => {
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
const Hd = Ee((t, e) => {
  const {
    options: n
  } = t, r = un(t, ["options"]), i = Zd(n);
  return s.createElement(Wd, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function Up(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = Y(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(Hd, Object.assign({}, t, {
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
    }, r = Ii(s.createElement(n, null));
  });
}
const py = pe(Hd, {
  prompt: Up
}), gy = (t) => {
  const {
    options: e
  } = t, n = un(t, ["options"]), r = Zd(e);
  return s.createElement(Eo, Object.assign({}, n, {
    columns: r
  }));
}, Ke = "adm-tabs", Kp = () => null, Yp = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, Gp = (t) => {
  var e;
  const n = q(Yp, t), r = V(null), i = V(null), a = {};
  let o = null;
  const l = [], c = n.direction === "rtl";
  yn(n.children, (w, x) => {
    if (!zn(w))
      return;
    const k = w.key;
    if (typeof k != "string")
      return;
    x === 0 && (o = k);
    const N = l.push(w);
    a[k] = N - 1;
  });
  const [u, f] = ue({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (w) => {
      var x;
      w !== null && ((x = n.onChange) === null || x === void 0 || x.call(n, w));
    }
  }), [{
    x: d,
    width: m
  }, b] = Le(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: g
  }, y] = Le(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: v,
    rightMaskOpacity: h
  }, C] = Le(() => ({
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
    const N = a[u];
    if (N === void 0) {
      b.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const M = i.current;
    if (!M)
      return;
    const _ = k.children.item(N + 1), L = _.children.item(0), A = L.offsetLeft, O = L.offsetWidth, $ = _.offsetLeft, P = _.offsetWidth, S = k.offsetWidth, F = k.scrollWidth, I = k.scrollLeft, R = M.offsetWidth;
    let D = 0, B = 0;
    if (n.activeLineMode === "auto" ? (D = A, B = O) : n.activeLineMode === "full" ? (D = $, B = P) : D = A + (O - R) / 2, c) {
      const H = ["auto", "full"].includes(n.activeLineMode) ? B : R;
      D = -(S - D - H);
    }
    b.start({
      x: D,
      width: B,
      immediate: w
    });
    const Z = F - S;
    if (Z <= 0)
      return;
    let U = 0;
    c ? U = -Ne(S / 2 - A + O / 2 - R, 0, Z) : U = Ne(A - (S - O) / 2, 0, Z), (!x || n.autoScroll !== !1) && y.start({
      scrollLeft: U,
      from: {
        scrollLeft: I
      },
      immediate: w
    });
  }
  Ae(() => {
    p(!d.isAnimating);
  }, []), Li(() => {
    p();
  }, [u, c, n.activeLineMode]), Di(() => {
    p(!d.isAnimating);
  }, r), xl(() => {
    p(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: E
  } = qa((w = !1) => {
    const x = r.current;
    if (!x)
      return;
    const k = x.scrollLeft;
    let N = !1, M = !1;
    c ? (N = Math.round(-k) + x.offsetWidth < x.scrollWidth, M = k < 0) : (N = k > 0, M = k + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: N ? 1 : 0,
      rightMaskOpacity: M ? 1 : 0,
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
      opacity: v
    }
  }), s.createElement(Ce.div, {
    className: j(`${Ke}-header-mask`, `${Ke}-header-mask-right`),
    style: {
      opacity: h
    }
  }), s.createElement(Ce.div, {
    className: `${Ke}-tab-list`,
    ref: r,
    scrollLeft: g,
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
        key: x
      } = w;
      w.props.disabled || x != null && f(x.toString());
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
    const x = w.key === u;
    return s.createElement(Ar, {
      key: w.key,
      active: x,
      forceRender: w.props.forceRender,
      destroyOnClose: w.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Ke}-content`,
      style: {
        display: x ? "block" : "none"
      }
    }, w.props.children));
  })));
}, lu = pe(Gp, {
  Tab: Kp
}), zr = "adm-list", Xp = {
  mode: "default"
}, Qp = Ee((t, e) => {
  const n = q(Xp, t), r = V(null);
  return xe(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, s.createElement("div", {
    className: j(zr, `${zr}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${zr}-header`
  }, n.header), s.createElement("div", {
    className: `${zr}-body`
  }, s.createElement("div", {
    className: `${zr}-body-inner`
  }, n.children))));
});
function ln(t) {
  return t != null && t !== !1;
}
const jt = "adm-list-item", Jp = (t) => {
  var e, n;
  const {
    arrow: r,
    arrowIcon: i
  } = t, {
    list: a = {}
  } = fe(), o = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, l = (n = r ?? i) !== null && n !== void 0 ? n : o, c = gn(a.arrowIcon, r !== !0 ? r : null, i !== !0 ? i : null), u = s.createElement("div", {
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
  }, c || s.createElement(yv, null)));
  return W(t, s.createElement(o ? "a" : "div", {
    className: j(`${jt}`, o ? ["adm-plain-anchor"] : [], t.disabled && `${jt}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, u));
}, At = pe(Qp, {
  Item: Jp
}), zd = Hs(null), e4 = "adm-check-list", t4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(Xf, null)
}, n4 = (t) => {
  const {
    checkList: e = {}
  } = fe(), n = q(t4, e, t), [r, i] = ue(n);
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
  return s.createElement(zd.Provider, {
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
    className: e4
  }, n.children)));
}, Qi = "adm-check-list-item", r4 = (t) => {
  const e = it(zd);
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
}, cu = pe(n4, {
  Item: r4
});
function i4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function uu(t, e) {
  e || (e = {});
  var n = e.vargs || i4(t), r = [], i = /* @__PURE__ */ new Map(), a, o, l = function(b) {
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
    var g;
    return i.get(b) || (!c || c(b), i.set(b, g = t.call(this, b)), g);
  }, a = 1) : u ? m = function() {
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
function qd(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = ce(() => uu((l) => {
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
    equals: ps
  }), [t]), a = ce(() => uu((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: ps
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
const Sl = [];
function a4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const ki = "adm-skeleton", Ol = (t) => W(t, s.createElement("div", {
  className: j(ki, {
    [`${ki}-animated`]: t.animated
  })
})), o4 = (t) => W(t, s.createElement(Ol, {
  animated: t.animated,
  className: `${ki}-title`
})), s4 = {
  lineCount: 3
}, l4 = (t) => {
  const e = q(s4, t), n = a4(1, e.lineCount), r = s.createElement("div", {
    className: `${ki}-paragraph`
  }, n.map((i) => s.createElement(Ol, {
    key: i,
    animated: e.animated,
    className: `${ki}-paragraph-line`
  })));
  return W(e, r);
}, Ji = pe(Ol, {
  Title: o4,
  Paragraph: l4
}), Vi = (t = {}) => ce(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = t;
  return [n, r, a, i];
}, [JSON.stringify(t)]), bt = "adm-cascader-view", c4 = {
  defaultValue: []
}, u4 = (t) => {
  const e = q(c4, t), {
    locale: n
  } = fe(), [r, i, a, o] = Vi(e.fieldNames), l = qd(e.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = ue(Object.assign(Object.assign({}, e), {
    onChange: (v) => {
      var h;
      (h = e.onChange) === null || h === void 0 || h.call(e, v, l(v));
    }
  })), [f, d] = Y(0), m = ce(() => {
    const v = [];
    let h = e.options, C = !1;
    for (const p of c) {
      const E = h.find((w) => w[i] === p);
      if (v.push({
        selected: E,
        options: h
      }), !E || !E[a]) {
        C = !0;
        break;
      }
      h = E[a];
    }
    return C || v.push({
      selected: void 0,
      options: h
    }), v;
  }, [c, e.options]);
  qs(() => {
    var v;
    (v = e.onTabsChange) === null || v === void 0 || v.call(e, f);
  }, [f]), Q(() => {
    d(m.length - 1);
  }, [c]), Q(() => {
    const v = m.length - 1;
    f > v && d(v);
  }, [f, m]);
  const b = (v, h) => {
    const C = c.slice(0, h);
    v !== void 0 && (C[h] = v), u(C);
  }, g = (v) => e.loading || v === Sl, y = e.placeholder || n.Cascader.placeholder;
  return W(e, s.createElement("div", {
    className: bt
  }, s.createElement(lu, {
    activeKey: f.toString(),
    onChange: (v) => {
      const h = parseInt(v);
      d(h);
    },
    stretch: !1,
    className: `${bt}-tabs`
  }, m.map((v, h) => {
    const C = v.selected;
    return s.createElement(lu.Tab, {
      key: h.toString(),
      title: s.createElement("div", {
        className: `${bt}-header-title`
      }, C ? C[r] : typeof y == "function" ? y(h) : y),
      forceRender: !0
    }, s.createElement("div", {
      className: `${bt}-content`
    }, g(v.options) ? s.createElement("div", {
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
    })) : s.createElement(cu, {
      value: [c[h]],
      onChange: (p) => b(p[0], h),
      activeIcon: e.activeIcon
    }, v.options.map((p) => {
      const E = c[h] === p[i];
      return s.createElement(cu.Item, {
        value: p[i],
        key: p[i],
        disabled: p[o],
        className: j(`${bt}-item`, {
          [`${bt}-item-active`]: E
        })
      }, p[r]);
    }))));
  }))));
}, f4 = pe(u4, {
  optionSkeleton: Sl
}), er = "adm-cascader", d4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, Ud = Ee((t, e) => {
  var n;
  const {
    locale: r
  } = fe(), i = q(d4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [a, o] = ue({
    value: i.visible,
    defaultValue: !1,
    onChange: (h) => {
      var C;
      h === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
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
  xe(e, () => l);
  const [c, u] = ue(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, h, m(h));
    }
  })), [, f, d] = Vi(i.fieldNames), m = qd(i.options, {
    valueName: f,
    childrenName: d
  }), [b, g] = Y(c);
  Q(() => {
    a || g(c);
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
      u(b, !0), o(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${er}-body`
  }, s.createElement(f4, Object.assign({}, i, {
    value: b,
    onChange: (h, C) => {
      var p;
      g(h), a && ((p = i.onSelect) === null || p === void 0 || p.call(i, h, C));
    }
  }))))), v = s.createElement(Ir, {
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
  return s.createElement(s.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, l));
});
function m4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = Y(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(Ud, Object.assign({}, t, {
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
    }, r = Ii(s.createElement(n, null));
  });
}
const yy = pe(Ud, {
  prompt: m4,
  optionSkeleton: Sl
}), qr = "adm-center-popup", h4 = Object.assign(Object.assign({}, hl), {
  getContainer: null
}), Kd = (t) => {
  const {
    popup: e = {}
  } = fe(), n = q(h4, e, t), r = Gs(), i = Le({
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
  }), [a, o] = Y(n.visible);
  Ae(() => {
    n.visible && o(!0);
  }, [n.visible]);
  const l = V(null);
  Ua(l, n.disableBodyScroll && a);
  const c = Jf(a && n.visible), u = s.createElement("div", {
    className: j(`${qr}-body`, n.bodyClassName),
    style: n.bodyStyle
  }, n.children), f = dn(n.stopPropagation, W(n, s.createElement("div", {
    className: qr,
    style: {
      display: a ? void 0 : "none",
      pointerEvents: a ? void 0 : "none"
    }
  }, n.mask && s.createElement(Ai, {
    visible: c,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose,
    onMaskClick: (d) => {
      var m, b;
      (m = n.onMaskClick) === null || m === void 0 || m.call(n, d), n.closeOnMaskClick && ((b = n.onClose) === null || b === void 0 || b.call(n));
    },
    style: n.maskStyle,
    className: j(`${qr}-mask`, n.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: n.stopPropagation
  }), s.createElement("div", {
    className: `${qr}-wrap`,
    role: n.role,
    "aria-label": n["aria-label"]
  }, s.createElement(Ce.div, {
    style: Object.assign(Object.assign({}, i), {
      pointerEvents: i.opacity.to((d) => d === 1 ? "unset" : "none")
    }),
    ref: l
  }, n.showCloseButton && s.createElement("a", {
    className: j(`${qr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = n.onClose) === null || d === void 0 || d.call(n);
    }
  }, n.closeIcon), u)))));
  return s.createElement(Ar, {
    active: a,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose
  }, Mr(n.getContainer, f));
}, Yd = Hs(null), v4 = {
  disabled: !1,
  defaultValue: []
}, p4 = (t) => {
  const e = q(v4, t), [n, r] = ue(e);
  return s.createElement(
    Yd.Provider,
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
}, Gd = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), g4 = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), Xd = (t) => {
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
}, en = "adm-checkbox", y4 = {
  defaultChecked: !1,
  indeterminate: !1
}, b4 = Ee((t, e) => {
  const n = it(Yd), r = q(y4, t);
  let [i, a] = ue({
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
  }, o = o || n.disabled), xe(e, () => ({
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
  }, r.indeterminate ? s.createElement(g4, null) : i && s.createElement(Gd, null));
  return W(r, s.createElement("label", {
    onClick: r.onClick,
    className: j(en, {
      [`${en}-checked`]: i && !r.indeterminate,
      [`${en}-indeterminate`]: r.indeterminate,
      [`${en}-disabled`]: o,
      [`${en}-block`]: r.block
    })
  }, s.createElement(Xd, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${en}-content`
  }, r.children)));
}), fu = pe(b4, {
  Group: p4
}), Mn = "adm-collapse", E4 = () => null, w4 = (t) => {
  const {
    visible: e
  } = t, n = V(null), r = no(e, t.forceRender, t.destroyOnClose), [{
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
  return jm(() => {
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
        return c = Pd(o, {
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
}, C4 = (t) => {
  const {
    collapse: e = {}
  } = fe(), n = q(e, t), r = [];
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
  }, [a, o] = ue(i()), l = a === null ? [] : Array.isArray(a) ? a : [a];
  return W(n, s.createElement("div", {
    className: Mn
  }, s.createElement(At, null, r.map((c) => {
    const u = c.key, f = l.includes(u);
    function d(g) {
      var y, v;
      n.accordion ? o(f ? [] : [u]) : o(f ? l.filter((h) => h !== u) : [...l, u]), (v = (y = c.props).onClick) === null || v === void 0 || v.call(y, g);
    }
    const m = gn(s.createElement(Qf, null), n.arrow, n.arrowIcon, c.props.arrow, c.props.arrowIcon), b = typeof m == "function" ? m(f) : s.createElement("div", {
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
      arrowIcon: b
    }, c.props.title)), s.createElement(w4, {
      visible: f,
      forceRender: !!c.props.forceRender,
      destroyOnClose: !!c.props.destroyOnClose
    }, c.props.children));
  }))));
}, by = pe(C4, {
  Panel: E4
});
var Qd = { exports: {} };
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
})(Qd);
var x4 = Qd.exports;
const Jd = /* @__PURE__ */ $t(x4);
var e1 = { exports: {} };
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
})(e1);
var k4 = e1.exports;
const t1 = /* @__PURE__ */ $t(k4), xr = "TILL_NOW";
ae.extend(so);
ae.extend(Jd);
ae.extend(t1);
const tn = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function $4(t, e, n, r, i, a, o) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), g = n.getFullYear(), y = n.getMonth() + 1, v = n.getDate(), h = n.getHours(), C = n.getMinutes(), p = n.getSeconds(), E = tn[r], w = parseInt(t[0]), x = ae(ys([t[0], t[1], "1"])), k = parseInt(t[1]), N = parseInt(t[2]), M = parseInt(t[3]), _ = parseInt(t[4]), L = w === c, A = w === g, O = L && k === u, $ = A && k === y, P = O && N === f, S = $ && N === v, F = P && M === d, I = S && M === h, R = F && _ === m, D = I && _ === C, B = (Z, U, H) => {
    let G = [];
    for (let he = Z; he <= U; he++)
      G.push(he);
    const ne = t.slice(0, tn[H]), ie = a == null ? void 0 : a[H];
    return ie && typeof ie == "function" && (G = G.filter((he) => ie(he, {
      get date() {
        const K = [...ne, he.toString()];
        return ys(K);
      }
    }))), G;
  };
  if (E >= tn.year) {
    const H = B(c, g, "year");
    l.push(H.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (E >= tn.month) {
    const H = B(L ? u : 1, A ? y : 12, "month");
    l.push(H.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (E >= tn.day) {
    const Z = O ? f : 1, U = $ ? v : x.daysInMonth(), H = B(Z, U, "day");
    l.push(H.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (E >= tn.hour) {
    const H = B(P ? d : 0, S ? h : 23, "hour");
    l.push(H.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (E >= tn.minute) {
    const H = B(F ? m : 0, I ? C : 59, "minute");
    l.push(H.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (E >= tn.second) {
    const H = B(R ? b : 0, D ? p : 59, "second");
    l.push(H.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (o && (l[0].push({
    label: i("now", null),
    value: xr
  }), xr === (t == null ? void 0 : t[0])))
    for (let Z = 1; Z < l.length; Z += 1)
      l[Z] = [];
  return l;
}
function _4(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function ys(t) {
  var e, n, r, i, a, o;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (a = t[4]) !== null && a !== void 0 ? a : "0", m = (o = t[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
var n1 = { exports: {} };
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
          var b = this.quarter() - 1;
          return m ? this.month(3 * b).startOf(n).startOf("day") : this.month(3 * b + 2).endOf(n).endOf("day");
        }
        return c.bind(this)(u, f);
      };
    };
  });
})(n1);
var S4 = n1.exports;
const O4 = /* @__PURE__ */ $t(S4);
ae.extend(O4);
const ea = {
  year: 0,
  quarter: 1
};
function F4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = ea[r], f = parseInt(t[0]), d = f === l, m = f === c, b = ae(e), g = ae(n), y = b.quarter(), v = g.quarter(), h = (C, p, E) => {
    let w = [];
    for (let N = C; N <= p; N++)
      w.push(N);
    const x = t.slice(0, ea[E]), k = a == null ? void 0 : a[E];
    return k && typeof k == "function" && (w = w.filter((N) => k(N, {
      get date() {
        const M = [...x, N.toString()];
        return r1(M);
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
    const E = h(d ? y : 1, m ? v : 4, "quarter");
    o.push(E.map((w) => ({
      label: i("quarter", w),
      value: w.toString()
    })));
  }
  return o;
}
function N4(t) {
  if (!t)
    return [];
  const e = ae(t);
  return [e.year().toString(), e.quarter().toString()];
}
function r1(t) {
  var e, n;
  const r = (e = t[0]) !== null && e !== void 0 ? e : "1900", i = (n = t[1]) !== null && n !== void 0 ? n : "1";
  return ae().year(parseInt(r)).quarter(parseInt(i)).hour(0).minute(0).second(0).toDate();
}
ae.extend(so);
ae.extend(Jd);
ae.extend(t1);
const Ur = {
  year: 0,
  week: 1,
  "week-day": 2
};
function P4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = Ur[r], f = parseInt(t[0]), d = f === l, m = f === c, b = ae(e), g = ae(n), y = b.isoWeek(), v = g.isoWeek(), h = b.isoWeekday(), C = g.isoWeekday(), p = parseInt(t[1]), E = d && p === y, w = m && p === v, x = ae(`${f}-01-01`).isoWeeksInYear(), k = (N, M, _) => {
    let L = [];
    for (let $ = N; $ <= M; $++)
      L.push($);
    const A = t.slice(0, Ur[_]), O = a == null ? void 0 : a[_];
    return O && typeof O == "function" && (L = L.filter(($) => O($, {
      get date() {
        const P = [...A, $.toString()];
        return i1(P);
      }
    }))), L;
  };
  if (u >= Ur.year) {
    const _ = k(l, c, "year");
    o.push(_.map((L) => ({
      label: i("year", L),
      value: L.toString()
    })));
  }
  if (u >= Ur.week) {
    const _ = k(d ? y : 1, m ? v : x, "week");
    o.push(_.map((L) => ({
      label: i("week", L),
      value: L.toString()
    })));
  }
  if (u >= Ur["week-day"]) {
    const _ = k(E ? h : 1, w ? C : 7, "week-day");
    o.push(_.map((L) => ({
      label: i("week-day", L),
      value: L.toString()
    })));
  }
  return o;
}
function R4(t) {
  if (!t)
    return [];
  const e = ae(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function i1(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", a = (n = t[1]) !== null && n !== void 0 ? n : "1", o = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return ae().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const M4 = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, a1 = (t, e) => {
  if (e.includes("week"))
    return R4(t);
  if (e.includes("quarter"))
    return N4(t);
  {
    const n = e;
    return _4(t).slice(0, M4[n]);
  }
}, bs = (t, e) => {
  if ((t == null ? void 0 : t[0]) === xr) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? i1(t) : e.includes("quarter") ? r1(t) : ys(t);
}, o1 = (t, e, n, r, i, a, o) => r.startsWith("week") ? P4(t, e, n, r, i, a) : r.startsWith("quarter") ? F4(t, e, n, r, i, a) : $4(t, e, n, r, i, a, o);
function s1(t) {
  const {
    locale: e
  } = fe();
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
const du = (/* @__PURE__ */ new Date()).getFullYear(), A4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(du - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(du + 10)),
  precision: "day",
  defaultValue: null
}, l1 = Ee((t, e) => {
  const n = q(A4, t), {
    renderLabel: r
  } = n, [i, a] = ue({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), o = ce(() => /* @__PURE__ */ new Date(), []), l = s1(r), c = ce(() => {
    let m = i ?? o;
    return m.tillNow ? [xr] : (m = new Date(Ne(m.getTime(), n.min.getTime(), n.max.getTime())), a1(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Qe((m) => {
    const b = bs(m, n.precision);
    a(b, !0);
  }, [a, n.precision]), f = Yt((m) => {
    var b;
    const g = bs(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, g);
  }), d = Qe((m) => o1(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return W(n, s.createElement(Wd, {
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
function T4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = Y(!1);
      return Q(() => {
        a(!0);
      }, []), s.createElement(l1, Object.assign({}, t, {
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
    }, r = Ii(s.createElement(n, null));
  });
}
const Ey = pe(l1, {
  prompt: T4,
  DATE_NOW: xr
}), mu = (/* @__PURE__ */ new Date()).getFullYear(), I4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(mu - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(mu + 10)),
  precision: "day"
}, wy = (t) => {
  var e;
  const n = q(I4, t), {
    renderLabel: r
  } = n, [i, a] = ue({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), o = s1(r), l = ce(() => i != null && i.tillNow ? [xr, null, null] : a1(i, n.precision), [i, n.precision]), c = Qe((u) => {
    var f;
    const d = bs(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, s.createElement(Eo, {
    columns: (u) => o1(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, L4 = (t) => {
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
}, D4 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, c1 = (t) => {
  const e = q(D4, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Ot("image-container")
  }, s.createElement(oo, {
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
    }, a.map((o, l) => s.createElement(L4, {
      key: o.key,
      action: o,
      onAction: () => Re(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, o, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(Kd, {
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
const Es = /* @__PURE__ */ new Set();
function Fl(t) {
  const e = Bn(s.createElement(c1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Es.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Es.add(e.close), e;
}
function V4(t) {
  const e = {
    confirmText: Fi().locale.Dialog.ok
  }, n = q(e, t);
  return new Promise((r) => {
    Fl(Object.assign(Object.assign({}, n), {
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
const j4 = {
  confirmText: "确认",
  cancelText: "取消"
};
function B4(t) {
  const {
    locale: e
  } = Fi(), n = q(j4, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Fl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Re(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Re(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function W4() {
  Es.forEach((t) => {
    t();
  });
}
const Cy = pe(c1, {
  show: Fl,
  alert: V4,
  confirm: B4,
  clear: W4
}), u1 = s.createContext(null), zt = "adm-dropdown-item", Z4 = (t) => {
  const {
    dropdown: e = {}
  } = fe(), n = q(e, t), {
    active: r,
    highlight: i,
    onClick: a,
    title: o
  } = n, l = j(zt, {
    [`${zt}-active`]: r,
    [`${zt}-highlight`]: i ?? r
  }), c = s.useContext(u1), u = gn(s.createElement(dv, null), c, n.arrow, n.arrowIcon);
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
}, H4 = Z4, z4 = (t) => {
  const {
    active: e = !1
  } = t, n = no(e, t.forceRender, t.destroyOnClose), r = j(`${zt}-content`, {
    [`${zt}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, tr = "adm-dropdown", q4 = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: hl.getContainer
}, U4 = Ee((t, e) => {
  const {
    dropdown: n = {}
  } = fe(), r = q(q4, n, t), i = gn(n.arrowIcon, t.arrow, t.arrowIcon), [a, o] = ue({
    value: r.activeKey,
    defaultValue: r.defaultActiveKey,
    onChange: r.onChange
  }), l = V(null), c = V(null);
  ff(() => {
    r.closeOnClickAway && o(null);
  }, [l, c]);
  const [u, f] = Y(), d = V(null);
  Q(() => {
    const v = d.current;
    if (v && a) {
      const h = v.getBoundingClientRect();
      f(h.bottom);
    }
  }, [a]);
  const m = (v) => {
    o(a === v ? null : v);
  };
  let b = !1;
  const g = [], y = s.Children.map(r.children, (v) => {
    if (zn(v)) {
      const h = Object.assign(Object.assign({}, v.props), {
        onClick: (C) => {
          var p, E;
          m(v.key), (E = (p = v.props).onClick) === null || E === void 0 || E.call(p, C);
        },
        active: v.key === a
      });
      return g.push(v), v.props.forceRender && (b = !0), b0(v, h);
    } else
      return v;
  });
  return xe(e, () => ({
    close: () => {
      o(null);
    }
  }), [o]), W(r, s.createElement("div", {
    className: j(tr, {
      [`${tr}-open`]: !!a
    }),
    ref: d
  }, s.createElement(u1.Provider, {
    value: i
  }, s.createElement("div", {
    className: `${tr}-nav`,
    ref: l
  }, y)), s.createElement(Ir, {
    visible: !!a,
    position: "top",
    getContainer: r.getContainer,
    className: `${tr}-popup`,
    maskClassName: `${tr}-popup-mask`,
    bodyClassName: `${tr}-popup-body`,
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
    const h = v.key === a;
    return s.createElement(z4, {
      key: v.key,
      active: h,
      forceRender: v.props.forceRender,
      destroyOnClose: v.props.destroyOnClose
    }, v.props.children);
  })))));
}), K4 = U4, xy = pe(K4, {
  Item: H4
});
var hu;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(hu || (hu = {}));
const Y4 = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var vu;
function ya(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += G4(n + r, t), rg(t[n + r]) && r++, eg(t[n + r]) && r++, tg(t[n + r]) && r++, ig(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function G4(t, e) {
  const n = e[t];
  if (!X4(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return pu(r) && pu(i) ? 4 : Q4(r) && ng(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : J4(i) ? 4 : 2;
}
function X4(t) {
  return t && qn(t[0].charCodeAt(0), 55296, 56319);
}
function pu(t) {
  return qn(Nl(t), 127462, 127487);
}
function Q4(t) {
  return qn(Nl(t), 127988, 127988);
}
function J4(t) {
  return qn(Nl(t), 127995, 127999);
}
function eg(t) {
  return typeof t == "string" && qn(t.charCodeAt(0), 65024, 65039);
}
function tg(t) {
  return typeof t == "string" && qn(t.charCodeAt(0), 8400, 8447);
}
function ng(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && qn(e, 917504, 917631);
}
function rg(t) {
  return typeof t == "string" && Y4.includes(t.charCodeAt(0));
}
function ig(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function Nl(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function qn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(vu || (vu = {}));
const ag = "adm-ellipsis", og = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, ky = (t) => {
  const e = q(og, t), n = V(null), r = V(null), i = V(null), [a, o] = Y({}), [l, c] = Y(e.defaultExpanded), [u, f] = Y(!1), d = ce(() => ya(e.content), [e.content]);
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
    Array.prototype.slice.apply(w).forEach((_) => {
      x.style.setProperty(_, w.getPropertyValue(_));
    }), p.style.display = E, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const N = Lo(w.lineHeight), M = Math.floor(N * (e.rows + 0.5) + Lo(w.paddingTop) + Lo(w.paddingBottom));
    if (x.innerText = e.content, document.body.appendChild(x), x.offsetHeight <= M)
      f(!1);
    else {
      let $ = function(I, R) {
        if (R - I <= 1)
          return e.direction === "end" ? {
            leading: m(0, I) + "..."
          } : {
            tailing: "..." + m(R, _)
          };
        const D = Math.round((I + R) / 2);
        return e.direction === "end" ? x.innerHTML = m(0, D) + "..." + O : x.innerHTML = O + "..." + m(D, _), x.offsetHeight <= M ? e.direction === "end" ? $(D, R) : $(I, D) : e.direction === "end" ? $(I, D) : $(D, R);
      }, P = function(I, R) {
        if (I[1] - I[0] <= 1 && R[1] - R[0] <= 1)
          return {
            leading: m(0, I[0]) + "...",
            tailing: "..." + m(R[1], _)
          };
        const D = Math.floor((I[0] + I[1]) / 2), B = Math.ceil((R[0] + R[1]) / 2);
        return x.innerHTML = m(0, D) + "..." + O + "..." + m(B, _), x.offsetHeight <= M ? P([D, I[1]], [R[0], B]) : P([I[0], D], [B, R[1]]);
      };
      f(!0);
      const _ = e.content.length, L = typeof e.collapseText == "string" ? e.collapseText : (h = i.current) === null || h === void 0 ? void 0 : h.innerHTML, A = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, O = l ? L : A, S = Math.floor((0 + _) / 2), F = e.direction === "middle" ? P([0, S], [S, _]) : $(0, _);
      o(F);
    }
    document.body.removeChild(x);
  }
  Di(b, n), Ae(() => {
    b();
  }, [e.content, e.direction, e.rows, e.expandText, e.collapseText]);
  const g = !!e.expandText && dn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, e.expandText)), y = !!e.collapseText && dn(e.stopPropagationForActionButtons, s.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, e.collapseText)), v = () => u ? l ? s.createElement(s.Fragment, null, e.content, y) : s.createElement(s.Fragment, null, a.leading, g, a.tailing) : e.content;
  return W(e, s.createElement("div", {
    ref: n,
    className: ag,
    onClick: (h) => {
      h.target === h.currentTarget && e.onContentClick(h);
    }
  }, v()));
};
function Lo(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const sg = (t) => W(t, s.createElement("svg", {
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
}))))), Kr = "adm-empty", $y = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(sg, {
      className: `${Kr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Kr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, s.createElement("div", {
    className: Kr
  }, s.createElement("div", {
    className: `${Kr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: j(`${Kr}-description`)
  }, t.description)));
}, bn = "adm-error-block", lg = {
  status: "default"
};
function cg(t) {
  return (n) => {
    var r;
    const i = q(lg, n), {
      locale: a
    } = fe(), o = a.ErrorBlock[i.status], l = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
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
const ug = s.createElement("svg", {
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
}))), fg = s.createElement("svg", {
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
})))), dg = s.createElement("svg", {
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
})))), mg = s.createElement("svg", {
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
})))), hg = {
  default: ug,
  disconnected: fg,
  empty: dg,
  busy: mg
}, _y = cg(hg), ta = "adm-floating-bubble", vg = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, Sy = (t) => {
  const e = q(vg, t), n = V(null), r = V(null), [i, a] = Y(e.offset === void 0 ? e.defaultOffset : e.offset);
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
    let b = d.offset[0], g = d.offset[1];
    if (d.last && e.magnetic) {
      const v = n.current, h = r.current;
      if (!v || !h)
        return;
      const C = v.getBoundingClientRect(), p = h.getBoundingClientRect();
      if (e.magnetic === "x") {
        const E = o.goal - o.get(), w = p.left + E - C.left, x = C.right - (p.right + E);
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
    className: ta
  }, s.createElement("div", {
    className: `${ta}-boundary-outer`
  }, s.createElement("div", {
    className: `${ta}-boundary`,
    ref: n
  })), s.createElement(Ce.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: Z2([o, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${ta}-button`,
    ref: r
  }), e.children)));
};
function Pl(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Yr = "adm-floating-panel", pg = {
  handleDraggingOfContent: !0
}, Oy = Ee((t, e) => {
  var n, r;
  const i = q(pg, t), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, l = a.map((C) => -C), c = V(null), u = V(null), f = V(null), [d, m] = Y(!1), b = V(!1), g = {
    top: l[l.length - 1],
    bottom: l[0]
  }, y = Yt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: v
  }, h] = Le(() => ({
    y: g.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      y(-C.value.y, v.isAnimating);
    }
  }));
  return Dt((C) => {
    const [, p] = C.offset;
    if (C.first) {
      const x = C.event.target, k = u.current;
      if (k === x || k != null && k.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = v.goal <= g.top, M = f.current;
        if (!M)
          return;
        N ? M.scrollTop <= 0 && C.direction[1] > 0 && (b.current = !0) : b.current = !0;
      }
    }
    if (m(b.current), !b.current)
      return;
    const {
      event: E
    } = C;
    E.cancelable && Dn && E.preventDefault(), E.stopPropagation();
    let w = p;
    C.last && (b.current = !1, m(!1), w = Pl(l, p)), h.start({
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
    eventOptions: Dn ? {
      passive: !1
    } : void 0
  }), xe(e, () => ({
    setHeight: (C, p) => {
      h.start({
        y: -C,
        immediate: p == null ? void 0 : p.immediate
      });
    }
  }), [h]), Ua(c, !0), W(i, s.createElement(Ce.div, {
    ref: c,
    className: Yr,
    style: {
      height: Math.round(o),
      translateY: v.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, s.createElement("div", {
    className: `${Yr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), s.createElement("div", {
    className: `${Yr}-header`,
    ref: u
  }, s.createElement("div", {
    className: `${Yr}-bar`
  })), s.createElement("div", {
    className: `${Yr}-content`,
    ref: f
  }, i.children)));
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
function gg(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function kr(t, e) {
  if (t == null)
    return {};
  var n = gg(t, e), r, i;
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
function gu(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, _d(r.key), r);
  }
}
function Kn(t, e, n) {
  return e && gu(t.prototype, e), n && gu(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function Ta(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function ws(t, e) {
  return ws = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, ws(t, e);
}
function Rl(t, e) {
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
  }), e && ws(t, e);
}
function Ia(t) {
  return Ia = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ia(t);
}
function yg() {
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
function bg(t, e) {
  if (e && (_e(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Ta(t);
}
function Ml(t) {
  var e = yg();
  return function() {
    var r = Ia(t), i;
    if (e) {
      var a = Ia(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return bg(this, i);
  };
}
function Cs(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(Cs(r)) : Ci.isFragment(r) && r.props ? n = n.concat(Cs(r.props.children, e)) : n.push(r));
  }), n;
}
function Eg(t, e) {
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
}, Zn = /* @__PURE__ */ T.createContext({
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
}), La = /* @__PURE__ */ T.createContext(null);
function xs(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function wg(t) {
  return t && !!t._init;
}
function Ut() {
  Ut = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(S, F, I) {
    S[F] = I.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(S, F, I) {
    return Object.defineProperty(S, F, {
      value: I,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), S[F];
  }
  try {
    u({}, "");
  } catch {
    u = function(I, R, D) {
      return I[R] = D;
    };
  }
  function f(S, F, I, R) {
    var D = F && F.prototype instanceof h ? F : h, B = Object.create(D.prototype), Z = new $(R || []);
    return i(B, "_invoke", {
      value: _(S, I, Z)
    }), B;
  }
  function d(S, F, I) {
    try {
      return {
        type: "normal",
        arg: S.call(F, I)
      };
    } catch (R) {
      return {
        type: "throw",
        arg: R
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
  u(E, o, function() {
    return this;
  });
  var w = Object.getPrototypeOf, x = w && w(w(P([])));
  x && x !== n && r.call(x, o) && (E = x);
  var k = p.prototype = h.prototype = Object.create(E);
  function N(S) {
    ["next", "throw", "return"].forEach(function(F) {
      u(S, F, function(I) {
        return this._invoke(F, I);
      });
    });
  }
  function M(S, F) {
    function I(D, B, Z, U) {
      var H = d(S[D], S, B);
      if (H.type !== "throw") {
        var G = H.arg, ne = G.value;
        return ne && _e(ne) == "object" && r.call(ne, "__await") ? F.resolve(ne.__await).then(function(ie) {
          I("next", ie, Z, U);
        }, function(ie) {
          I("throw", ie, Z, U);
        }) : F.resolve(ne).then(function(ie) {
          G.value = ie, Z(G);
        }, function(ie) {
          return I("throw", ie, Z, U);
        });
      }
      U(H.arg);
    }
    var R;
    i(this, "_invoke", {
      value: function(B, Z) {
        function U() {
          return new F(function(H, G) {
            I(B, Z, H, G);
          });
        }
        return R = R ? R.then(U, U) : U();
      }
    });
  }
  function _(S, F, I) {
    var R = m;
    return function(D, B) {
      if (R === g)
        throw new Error("Generator is already running");
      if (R === y) {
        if (D === "throw")
          throw B;
        return {
          value: t,
          done: !0
        };
      }
      for (I.method = D, I.arg = B; ; ) {
        var Z = I.delegate;
        if (Z) {
          var U = L(Z, I);
          if (U) {
            if (U === v)
              continue;
            return U;
          }
        }
        if (I.method === "next")
          I.sent = I._sent = I.arg;
        else if (I.method === "throw") {
          if (R === m)
            throw R = y, I.arg;
          I.dispatchException(I.arg);
        } else
          I.method === "return" && I.abrupt("return", I.arg);
        R = g;
        var H = d(S, F, I);
        if (H.type === "normal") {
          if (R = I.done ? y : b, H.arg === v)
            continue;
          return {
            value: H.arg,
            done: I.done
          };
        }
        H.type === "throw" && (R = y, I.method = "throw", I.arg = H.arg);
      }
    };
  }
  function L(S, F) {
    var I = F.method, R = S.iterator[I];
    if (R === t)
      return F.delegate = null, I === "throw" && S.iterator.return && (F.method = "return", F.arg = t, L(S, F), F.method === "throw") || I !== "return" && (F.method = "throw", F.arg = new TypeError("The iterator does not provide a '" + I + "' method")), v;
    var D = d(R, S.iterator, F.arg);
    if (D.type === "throw")
      return F.method = "throw", F.arg = D.arg, F.delegate = null, v;
    var B = D.arg;
    return B ? B.done ? (F[S.resultName] = B.value, F.next = S.nextLoc, F.method !== "return" && (F.method = "next", F.arg = t), F.delegate = null, v) : B : (F.method = "throw", F.arg = new TypeError("iterator result is not an object"), F.delegate = null, v);
  }
  function A(S) {
    var F = {
      tryLoc: S[0]
    };
    1 in S && (F.catchLoc = S[1]), 2 in S && (F.finallyLoc = S[2], F.afterLoc = S[3]), this.tryEntries.push(F);
  }
  function O(S) {
    var F = S.completion || {};
    F.type = "normal", delete F.arg, S.completion = F;
  }
  function $(S) {
    this.tryEntries = [{
      tryLoc: "root"
    }], S.forEach(A, this), this.reset(!0);
  }
  function P(S) {
    if (S || S === "") {
      var F = S[o];
      if (F)
        return F.call(S);
      if (typeof S.next == "function")
        return S;
      if (!isNaN(S.length)) {
        var I = -1, R = function D() {
          for (; ++I < S.length; )
            if (r.call(S, I))
              return D.value = S[I], D.done = !1, D;
          return D.value = t, D.done = !0, D;
        };
        return R.next = R;
      }
    }
    throw new TypeError(_e(S) + " is not iterable");
  }
  return C.prototype = p, i(k, "constructor", {
    value: p,
    configurable: !0
  }), i(p, "constructor", {
    value: C,
    configurable: !0
  }), C.displayName = u(p, c, "GeneratorFunction"), e.isGeneratorFunction = function(S) {
    var F = typeof S == "function" && S.constructor;
    return !!F && (F === C || (F.displayName || F.name) === "GeneratorFunction");
  }, e.mark = function(S) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(S, p) : (S.__proto__ = p, u(S, c, "GeneratorFunction")), S.prototype = Object.create(k), S;
  }, e.awrap = function(S) {
    return {
      __await: S
    };
  }, N(M.prototype), u(M.prototype, l, function() {
    return this;
  }), e.AsyncIterator = M, e.async = function(S, F, I, R, D) {
    D === void 0 && (D = Promise);
    var B = new M(f(S, F, I, R), D);
    return e.isGeneratorFunction(F) ? B : B.next().then(function(Z) {
      return Z.done ? Z.value : B.next();
    });
  }, N(k), u(k, c, "Generator"), u(k, o, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(S) {
    var F = Object(S), I = [];
    for (var R in F)
      I.push(R);
    return I.reverse(), function D() {
      for (; I.length; ) {
        var B = I.pop();
        if (B in F)
          return D.value = B, D.done = !1, D;
      }
      return D.done = !0, D;
    };
  }, e.values = P, $.prototype = {
    constructor: $,
    reset: function(F) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(O), !F)
        for (var I in this)
          I.charAt(0) === "t" && r.call(this, I) && !isNaN(+I.slice(1)) && (this[I] = t);
    },
    stop: function() {
      this.done = !0;
      var F = this.tryEntries[0].completion;
      if (F.type === "throw")
        throw F.arg;
      return this.rval;
    },
    dispatchException: function(F) {
      if (this.done)
        throw F;
      var I = this;
      function R(G, ne) {
        return Z.type = "throw", Z.arg = F, I.next = G, ne && (I.method = "next", I.arg = t), !!ne;
      }
      for (var D = this.tryEntries.length - 1; D >= 0; --D) {
        var B = this.tryEntries[D], Z = B.completion;
        if (B.tryLoc === "root")
          return R("end");
        if (B.tryLoc <= this.prev) {
          var U = r.call(B, "catchLoc"), H = r.call(B, "finallyLoc");
          if (U && H) {
            if (this.prev < B.catchLoc)
              return R(B.catchLoc, !0);
            if (this.prev < B.finallyLoc)
              return R(B.finallyLoc);
          } else if (U) {
            if (this.prev < B.catchLoc)
              return R(B.catchLoc, !0);
          } else {
            if (!H)
              throw new Error("try statement without catch or finally");
            if (this.prev < B.finallyLoc)
              return R(B.finallyLoc);
          }
        }
      }
    },
    abrupt: function(F, I) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var D = this.tryEntries[R];
        if (D.tryLoc <= this.prev && r.call(D, "finallyLoc") && this.prev < D.finallyLoc) {
          var B = D;
          break;
        }
      }
      B && (F === "break" || F === "continue") && B.tryLoc <= I && I <= B.finallyLoc && (B = null);
      var Z = B ? B.completion : {};
      return Z.type = F, Z.arg = I, B ? (this.method = "next", this.next = B.finallyLoc, v) : this.complete(Z);
    },
    complete: function(F, I) {
      if (F.type === "throw")
        throw F.arg;
      return F.type === "break" || F.type === "continue" ? this.next = F.arg : F.type === "return" ? (this.rval = this.arg = F.arg, this.method = "return", this.next = "end") : F.type === "normal" && I && (this.next = I), v;
    },
    finish: function(F) {
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var R = this.tryEntries[I];
        if (R.finallyLoc === F)
          return this.complete(R.completion, R.afterLoc), O(R), v;
      }
    },
    catch: function(F) {
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var R = this.tryEntries[I];
        if (R.tryLoc === F) {
          var D = R.completion;
          if (D.type === "throw") {
            var B = D.arg;
            O(R);
          }
          return B;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(F, I, R) {
      return this.delegate = {
        iterator: P(F),
        resultName: I,
        nextLoc: R
      }, this.method === "next" && (this.arg = t), v;
    }
  }, e;
}
function yu(t, e, n, r, i, a, o) {
  try {
    var l = t[a](o), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function wo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var a = t.apply(e, n);
      function o(c) {
        yu(a, r, i, o, l, "next", c);
      }
      function l(c) {
        yu(a, r, i, o, l, "throw", c);
      }
      o(void 0);
    });
  };
}
function Tn() {
  return Tn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Tn.apply(this, arguments);
}
function Cg(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, $i(t, e);
}
function ks(t) {
  return ks = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ks(t);
}
function $i(t, e) {
  return $i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, $i(t, e);
}
function xg() {
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
function ba(t, e, n) {
  return xg() ? ba = Reflect.construct.bind() : ba = function(i, a, o) {
    var l = [null];
    l.push.apply(l, a);
    var c = Function.bind.apply(i, l), u = new c();
    return o && $i(u, o.prototype), u;
  }, ba.apply(null, arguments);
}
function kg(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function $s(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return $s = function(r) {
    if (r === null || !kg(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return ba(r, arguments, ks(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), $i(i, r);
  }, $s(t);
}
var $g = /%[sdj%]/g, _g = function() {
};
typeof process < "u" && process.env;
function _s(t) {
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
    var o = t.replace($g, function(l) {
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
function Sg(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Te(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || Sg(e) && typeof t == "string" && !t);
}
function Og(t, e, n) {
  var r = [], i = 0, a = t.length;
  function o(l) {
    r.push.apply(r, l || []), i++, i === a && n(r);
  }
  t.forEach(function(l) {
    e(l, o);
  });
}
function bu(t, e, n) {
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
function Fg(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Eu = /* @__PURE__ */ function(t) {
  Cg(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ $s(Error));
function Ng(t, e, n, r, i) {
  if (e.first) {
    var a = new Promise(function(m, b) {
      var g = function(h) {
        return r(h), h.length ? b(new Eu(h, _s(h))) : m(i);
      }, y = Fg(t);
      bu(y, n, g);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, b) {
    var g = function(v) {
      if (f.push.apply(f, v), u++, u === c)
        return r(f), f.length ? b(new Eu(f, _s(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(y) {
      var v = t[y];
      o.indexOf(y) !== -1 ? bu(v, n, g) : Og(v, n, g);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Pg(t) {
  return !!(t && t.message !== void 0);
}
function Rg(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function wu(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = Rg(e, t.fullFields) : r = e[n.field || t.fullField], Pg(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Cu(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = Tn({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var f1 = function(e, n, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || Te(n, o || e.type)) && i.push(rt(a.messages.required, e.fullField));
}, Mg = function(e, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(rt(a.messages.whitespace, e.fullField));
}, na, Ag = function() {
  if (na)
    return na;
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
  c.v4 = function(p) {
    return p && p.exact ? o : new RegExp("" + e(p) + n + e(p), "g");
  }, c.v6 = function(p) {
    return p && p.exact ? l : new RegExp("" + e(p) + i + e(p), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", g = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", y = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", v = "(?::\\d{2,5})?", h = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + g + y + ")" + v + h;
  return na = new RegExp("(?:^" + C + "$)", "i"), na;
}, xu = {
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
    return typeof e == "string" && e.length <= 320 && !!e.match(xu.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(Ag());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(xu.hex);
  }
}, Tg = function(e, n, r, i, a) {
  if (e.required && n === void 0) {
    f1(e, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  o.indexOf(l) > -1 ? ai[l](n) || i.push(rt(a.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(rt(a.messages.types[l], e.fullField, e.type));
}, Ig = function(e, n, r, i, a) {
  var o = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", g = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : g && (d = "array"), !d)
    return !1;
  g && (f = n.length), b && (f = n.replace(u, "_").length), o ? f !== e.len && i.push(rt(a.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(rt(a.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(rt(a.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(rt(a.messages[d].range, e.fullField, e.min, e.max));
}, nr = "enum", Lg = function(e, n, r, i, a) {
  e[nr] = Array.isArray(e[nr]) ? e[nr] : [], e[nr].indexOf(n) === -1 && i.push(rt(a.messages[nr], e.fullField, e[nr].join(", ")));
}, Dg = function(e, n, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(rt(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(n) || i.push(rt(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, se = {
  required: f1,
  whitespace: Mg,
  type: Tg,
  range: Ig,
  enum: Lg,
  pattern: Dg
}, Vg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n, "string") && !e.required)
      return r();
    se.required(e, n, i, o, a, "string"), Te(n, "string") || (se.type(e, n, i, o, a), se.range(e, n, i, o, a), se.pattern(e, n, i, o, a), e.whitespace === !0 && se.whitespace(e, n, i, o, a));
  }
  r(o);
}, jg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && se.type(e, n, i, o, a);
  }
  r(o);
}, Bg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && (se.type(e, n, i, o, a), se.range(e, n, i, o, a));
  }
  r(o);
}, Wg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && se.type(e, n, i, o, a);
  }
  r(o);
}, Zg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), Te(n) || se.type(e, n, i, o, a);
  }
  r(o);
}, Hg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && (se.type(e, n, i, o, a), se.range(e, n, i, o, a));
  }
  r(o);
}, zg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && (se.type(e, n, i, o, a), se.range(e, n, i, o, a));
  }
  r(o);
}, qg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    se.required(e, n, i, o, a, "array"), n != null && (se.type(e, n, i, o, a), se.range(e, n, i, o, a));
  }
  r(o);
}, Ug = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && se.type(e, n, i, o, a);
  }
  r(o);
}, Kg = "enum", Yg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a), n !== void 0 && se[Kg](e, n, i, o, a);
  }
  r(o);
}, Gg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n, "string") && !e.required)
      return r();
    se.required(e, n, i, o, a), Te(n, "string") || se.pattern(e, n, i, o, a);
  }
  r(o);
}, Xg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n, "date") && !e.required)
      return r();
    if (se.required(e, n, i, o, a), !Te(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), se.type(e, c, i, o, a), c && se.range(e, c.getTime(), i, o, a);
    }
  }
  r(o);
}, Qg = function(e, n, r, i, a) {
  var o = [], l = Array.isArray(n) ? "array" : typeof n;
  se.required(e, n, i, o, a, l), r(o);
}, Do = function(e, n, r, i, a) {
  var o = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Te(n, o) && !e.required)
      return r();
    se.required(e, n, i, l, a, o), Te(n, o) || se.type(e, n, i, l, a);
  }
  r(l);
}, Jg = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Te(n) && !e.required)
      return r();
    se.required(e, n, i, o, a);
  }
  r(o);
}, fi = {
  string: Vg,
  method: jg,
  number: Bg,
  boolean: Wg,
  regexp: Zg,
  integer: Hg,
  float: zg,
  array: qg,
  object: Ug,
  enum: Yg,
  pattern: Gg,
  date: Xg,
  url: Do,
  hex: Do,
  email: Do,
  required: Qg,
  any: Jg
};
function Ss() {
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
var Os = Ss(), ji = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = Os, this.define(n);
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
    return r && (this._messages = Cu(Ss(), r)), this._messages;
  }, e.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var l = r, c = i, u = a;
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
      v.length ? (h = _s(v), u(v, h)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === Os && (d = Ss()), Cu(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(y) {
      var v = o.rules[y], h = l[y];
      v.forEach(function(C) {
        var p = C;
        typeof p.transform == "function" && (l === r && (l = Tn({}, l)), h = l[y] = p.transform(h)), typeof p == "function" ? p = {
          validator: p
        } : p = Tn({}, p), p.validator = o.getValidationMethod(p), p.validator && (p.field = y, p.fullField = p.fullField || y, p.type = o.getType(p), m[y] = m[y] || [], m[y].push({
          rule: p,
          value: h,
          source: l,
          field: y
        }));
      });
    });
    var g = {};
    return Ng(m, c, function(y, v) {
      var h = y.rule, C = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      C = C && (h.required || !h.required && y.value), h.field = y.field;
      function p(x, k) {
        return Tn({}, k, {
          fullField: h.fullField + "." + x,
          fullFields: h.fullFields ? [].concat(h.fullFields, [x]) : [x]
        });
      }
      function E(x) {
        x === void 0 && (x = []);
        var k = Array.isArray(x) ? x : [x];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && h.message !== void 0 && (k = [].concat(h.message));
        var N = k.map(wu(h, l));
        if (c.first && N.length)
          return g[h.field] = 1, v(N);
        if (!C)
          v(N);
        else {
          if (h.required && !y.value)
            return h.message !== void 0 ? N = [].concat(h.message).map(wu(h, l)) : c.error && (N = [c.error(h, rt(c.messages.required, h.field))]), v(N);
          var M = {};
          h.defaultField && Object.keys(y.value).map(function(A) {
            M[A] = h.defaultField;
          }), M = Tn({}, M, y.rule.fields);
          var _ = {};
          Object.keys(M).forEach(function(A) {
            var O = M[A], $ = Array.isArray(O) ? O : [O];
            _[A] = $.map(p.bind(null, A));
          });
          var L = new t(_);
          L.messages(c.messages), y.rule.options && (y.rule.options.messages = c.messages, y.rule.options.error = c.error), L.validate(y.value, y.rule.options || c, function(A) {
            var O = [];
            N && N.length && O.push.apply(O, N), A && A.length && O.push.apply(O, A), v(O.length ? O : null);
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
ji.warning = _g;
ji.messages = Os;
ji.validators = fi;
var et = "'${name}' is not a valid ${type}", d1 = {
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
}, ku = ji;
function e5(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var $u = "CODE_LOGIC_ERROR";
function Fs(t, e, n, r, i) {
  return Ns.apply(this, arguments);
}
function Ns() {
  return Ns = wo(/* @__PURE__ */ Ut().mark(function t(e, n, r, i, a) {
    var o, l, c, u, f, d, m, b, g;
    return Ut().wrap(function(v) {
      for (; ; )
        switch (v.prev = v.next) {
          case 0:
            return o = X({}, r), delete o.ruleIndex, ku.warning = function() {
            }, o.validator && (l = o.validator, o.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (h) {
                return console.error(h), Promise.reject($u);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new ku(de({}, e, [o])), f = ii(d1, i.validateMessages), u.messages(f), d = [], v.prev = 10, v.next = 13, Promise.resolve(u.validate(de({}, e, n), X({}, i)));
          case 13:
            v.next = 18;
            break;
          case 15:
            v.prev = 15, v.t0 = v.catch(10), v.t0.errors && (d = v.t0.errors.map(function(h, C) {
              var p = h.message, E = p === $u ? f.default : p;
              return /* @__PURE__ */ T.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                T.cloneElement(E, {
                  key: "error_".concat(C)
                })
              ) : E;
            }));
          case 18:
            if (!(!d.length && c)) {
              v.next = 23;
              break;
            }
            return v.next = 21, Promise.all(n.map(function(h, C) {
              return Fs("".concat(e, ".").concat(C), h, c, i, a);
            }));
          case 21:
            return m = v.sent, v.abrupt("return", m.reduce(function(h, C) {
              return [].concat(me(h), me(C));
            }, []));
          case 23:
            return b = X(X({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, a), g = d.map(function(h) {
              return typeof h == "string" ? e5(h, b) : h;
            }), v.abrupt("return", g);
          case 26:
          case "end":
            return v.stop();
        }
    }, t, null, [[10, 15]]);
  })), Ns.apply(this, arguments);
}
function t5(t, e, n, r, i, a) {
  var o = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, b = X(X({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(g, y, v) {
      var h = !1, C = function() {
        for (var w = arguments.length, x = new Array(w), k = 0; k < w; k++)
          x[k] = arguments[k];
        Promise.resolve().then(function() {
          ht(!h, "Your validator function has already return a promise. `callback` will be ignored."), h || v.apply(void 0, x);
        });
      }, p = m(g, y, C);
      h = p && typeof p.then == "function" && typeof p.catch == "function", ht(h, "`callback` is deprecated. Please return a promise instead."), h && p.then(function() {
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
      var f = wo(/* @__PURE__ */ Ut().mark(function d(m, b) {
        var g, y, v;
        return Ut().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                g = 0;
              case 1:
                if (!(g < l.length)) {
                  C.next = 12;
                  break;
                }
                return y = l[g], C.next = 5, Fs(o, e, y, r, a);
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
      return Fs(o, e, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? r5(u) : n5(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function n5(t) {
  return Ps.apply(this, arguments);
}
function Ps() {
  return Ps = wo(/* @__PURE__ */ Ut().mark(function t(e) {
    return Ut().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var a, o = (a = []).concat.apply(a, me(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), Ps.apply(this, arguments);
}
function r5(t) {
  return Rs.apply(this, arguments);
}
function Rs() {
  return Rs = wo(/* @__PURE__ */ Ut().mark(function t(e) {
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
  })), Rs.apply(this, arguments);
}
function Oe(t) {
  return xs(t);
}
function _u(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = kt(t, r);
    n = Et(n, r, i);
  }), n;
}
function di(t, e) {
  return t && t.some(function(n) {
    return m1(n, e);
  });
}
function m1(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function i5(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || _e(t) !== "object" || _e(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return me(i).every(function(a) {
    var o = t[a], l = e[a];
    return typeof o == "function" && typeof l == "function" ? !0 : o === l;
  });
}
function a5(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && _e(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function Su(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], a = e - n;
  return a > 0 ? [].concat(me(t.slice(0, n)), [i], me(t.slice(n, e)), me(t.slice(e + 1, r))) : a < 0 ? [].concat(me(t.slice(0, e)), me(t.slice(e + 1, n + 1)), [i], me(t.slice(n + 1, r))) : t;
}
var o5 = ["name"], st = [];
function Ou(t, e, n, r, i, a) {
  return typeof t == "function" ? t(e, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var Al = /* @__PURE__ */ function(t) {
  Rl(n, t);
  var e = Ml(n);
  function n(r) {
    var i;
    if (Un(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = void 0, i.prevValidating = void 0, i.errors = st, i.warnings = st, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, Oe(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(me(m), me(u)) : [];
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
        var f = X(X({}, i.getMeta()), {}, {
          destroy: c
        });
        Eg(i.metaCache, f) || u(f), i.metaCache = f;
      } else
        i.metaCache = null;
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, g = b === void 0 ? [] : b, y = d.onReset, v = f.store, h = i.getNamePath(), C = i.getValue(c), p = i.getValue(v), E = u && di(u, h);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== p && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = st, i.warnings = st, i.triggerMetaEvent()), f.type) {
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
          if (m && !h.length && Ou(m, c, v, C, p, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = g.map(Oe);
          if (x.some(function(k) {
            return di(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!g.length || h.length || m) && Ou(m, c, v, C, p, f)) {
            i.reRender();
            return;
          }
          break;
      }
      m === !0 && i.reRender();
    }, i.validateRules = function(c) {
      var u = i.getNamePath(), f = i.getValue(), d = c || {}, m = d.triggerName, b = d.validateOnly, g = b === void 0 ? !1 : b, y = Promise.resolve().then(function() {
        if (!i.mounted)
          return [];
        var v = i.props, h = v.validateFirst, C = h === void 0 ? !1 : h, p = v.messageVariables, E = i.getRules();
        m && (E = E.filter(function(x) {
          return x;
        }).filter(function(x) {
          var k = x.validateTrigger;
          if (!k)
            return !0;
          var N = xs(k);
          return N.includes(m);
        }));
        var w = t5(u, f, E, c, C, p);
        return w.catch(function(x) {
          return x;
        }).then(function() {
          var x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : st;
          if (i.validatePromise === y) {
            var k;
            i.validatePromise = null;
            var N = [], M = [];
            (k = x.forEach) === null || k === void 0 || k.call(x, function(_) {
              var L = _.rule.warningOnly, A = _.errors, O = A === void 0 ? st : A;
              L ? M.push.apply(M, me(O)) : N.push.apply(N, me(O));
            }), i.errors = N, i.warnings = M, i.triggerMetaEvent(), i.reRender();
          }
        }), w;
      });
      return g || (i.validatePromise = y, i.dirty = !0, i.errors = st, i.warnings = st, i.triggerMetaEvent(), i.reRender()), y;
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
        return X(X({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = Cs(c);
      return f.length !== 1 || !/* @__PURE__ */ T.isValidElement(f[0]) ? {
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
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, g = u.valuePropName, y = u.getValueProps, v = u.fieldContext, h = d !== void 0 ? d : v.validateTrigger, C = i.getNamePath(), p = v.getInternalHooks, E = v.getFieldsValue, w = p(An), x = w.dispatch, k = i.getValue(), N = y || function(A) {
        return de({}, g, A);
      }, M = c[f], _ = X(X({}, c), N(k));
      _[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var A, O = arguments.length, $ = new Array(O), P = 0; P < O; P++)
          $[P] = arguments[P];
        m ? A = m.apply(void 0, $) : A = a5.apply(void 0, [g].concat($)), b && (A = b(A, k, E(!0))), x({
          type: "updateValue",
          namePath: C,
          value: A
        }), M && M.apply(void 0, $);
      };
      var L = xs(h || []);
      return L.forEach(function(A) {
        var O = _[A];
        _[A] = function() {
          O && O.apply(void 0, arguments);
          var $ = i.props.rules;
          $ && $.length && x({
            type: "validateField",
            namePath: C,
            triggerName: A
          });
        };
      }), _;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(An), l = o.initEntityValue;
      l(Ta(i));
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
      return c ? u = l : /* @__PURE__ */ T.isValidElement(l) ? u = /* @__PURE__ */ T.cloneElement(l, this.getControlled(l.props)) : (ht(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ T.createElement(T.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(T.Component);
Al.contextType = Zn;
Al.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function Tl(t) {
  var e = t.name, n = kr(t, o5), r = T.useContext(Zn), i = T.useContext(La), a = e !== void 0 ? Oe(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((a || []).join("_"))), /* @__PURE__ */ T.createElement(Al, Wn({
    key: o,
    name: a,
    isListField: !!i
  }, n, {
    fieldContext: r
  }));
}
var h1 = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, a = e.rules, o = e.validateTrigger, l = e.isListField, c = T.useContext(Zn), u = T.useContext(La), f = T.useRef({
    keys: [],
    id: 0
  }), d = f.current, m = T.useMemo(function() {
    var v = Oe(c.prefixName) || [];
    return [].concat(me(v), me(Oe(n)));
  }, [c.prefixName, n]), b = T.useMemo(function() {
    return X(X({}, c), {}, {
      prefixName: m
    });
  }, [c, m]), g = T.useMemo(function() {
    return {
      getKey: function(h) {
        var C = m.length, p = h[C];
        return [d.keys[p], h.slice(C + 1)];
      }
    };
  }, [m]);
  if (typeof i != "function")
    return ht(!1, "Form.List only accepts function as children."), null;
  var y = function(h, C, p) {
    var E = p.source;
    return E === "internal" ? !1 : h !== C;
  };
  return /* @__PURE__ */ T.createElement(La.Provider, {
    value: g
  }, /* @__PURE__ */ T.createElement(Zn.Provider, {
    value: b
  }, /* @__PURE__ */ T.createElement(Tl, {
    name: [],
    shouldUpdate: y,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0,
    isListField: l ?? !!u
  }, function(v, h) {
    var C = v.value, p = C === void 0 ? [] : C, E = v.onChange, w = c.getFieldValue, x = function() {
      var _ = w(m || []);
      return _ || [];
    }, k = {
      add: function(_, L) {
        var A = x();
        L >= 0 && L <= A.length ? (d.keys = [].concat(me(d.keys.slice(0, L)), [d.id], me(d.keys.slice(L))), E([].concat(me(A.slice(0, L)), [_], me(A.slice(L))))) : (d.keys = [].concat(me(d.keys), [d.id]), E([].concat(me(A), [_]))), d.id += 1;
      },
      remove: function(_) {
        var L = x(), A = new Set(Array.isArray(_) ? _ : [_]);
        A.size <= 0 || (d.keys = d.keys.filter(function(O, $) {
          return !A.has($);
        }), E(L.filter(function(O, $) {
          return !A.has($);
        })));
      },
      move: function(_, L) {
        if (_ !== L) {
          var A = x();
          _ < 0 || _ >= A.length || L < 0 || L >= A.length || (d.keys = Su(d.keys, _, L), E(Su(A, _, L)));
        }
      }
    }, N = p || [];
    return Array.isArray(N) || (N = []), i(N.map(function(M, _) {
      var L = d.keys[_];
      return L === void 0 && (d.keys[_] = d.id, L = d.keys[_], d.id += 1), {
        name: _,
        key: L,
        isListField: !0
      };
    }), k, h);
  })));
};
function s5(t) {
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
var v1 = "__@field_split__";
function Vo(t) {
  return t.map(function(e) {
    return "".concat(_e(e), ":").concat(e);
  }).join(v1);
}
var rr = /* @__PURE__ */ function() {
  function t() {
    Un(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return Kn(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(Vo(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(Vo(n));
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
      this.kvs.delete(Vo(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return me(this.kvs.entries()).map(function(r) {
        var i = Fe(r, 2), a = i[0], o = i[1], l = a.split(v1);
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
}(), l5 = ["name"], c5 = /* @__PURE__ */ Kn(function t(e) {
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
    var r = new rr();
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new rr();
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
    }), _u(n.store, o.map(Oe));
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
    var f = n.getFieldEntities(!0), d = function(v) {
      return v.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new rr();
    c.forEach(function(y) {
      m.set(y, []);
    }), f.forEach(function(y) {
      var v = y.getNamePath();
      c.forEach(function(h) {
        h.every(function(C, p) {
          return v[p] === C;
        }) && m.update(h, function(C) {
          return [].concat(me(C), [y]);
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new rr(), a = n.getFieldEntities(!0);
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
            var g = i.get(m);
            if (g && g.size > 1)
              ht(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var y = n.getFieldValue(m);
              (!r.skipExist || y === void 0) && n.updateStore(Et(n.store, m, me(g)[0].value));
            }
          }
        }
      });
    }, l;
    r.entities ? l = r.entities : r.namePathList ? (l = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = l).push.apply(f, me(me(u).map(function(d) {
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
      var l = o.name, c = kr(o, l5), u = Oe(l);
      a.push(u), "value" in c && n.updateStore(Et(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), l = a.getMeta(), c = X(X({}, l), {}, {
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
            !m1(d.getNamePath(), i)
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
      var o = X(X({}, a), {}, {
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
      relatedFields: [i].concat(me(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = Oe(r), o = n.store;
    n.updateStore(Et(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var l = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = _u(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(me(l)));
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new rr();
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
        var l = new rr();
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
      var v;
      if (l || c.push(y.getNamePath()), !((v = o) === null || v === void 0) && v.recursive && l) {
        var h = y.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        h.every(function(E, w) {
          return a[w] === E || a[w] === void 0;
        }) && c.push(h);
      }
      if (!(!y.props.rules || !y.props.rules.length)) {
        var C = y.getNamePath();
        if (d.add(C.join(f)), !l || di(c, C)) {
          var p = y.validateRules(X({
            validateMessages: X(X({}, d1), n.validateMessages)
          }, o));
          u.push(p.then(function() {
            return {
              name: C,
              errors: [],
              warnings: []
            };
          }).catch(function(E) {
            var w, x = [], k = [];
            return (w = E.forEach) === null || w === void 0 || w.call(E, function(N) {
              var M = N.rule.warningOnly, _ = N.errors;
              M ? k.push.apply(k, me(_)) : x.push.apply(x, me(_));
            }), x.length ? Promise.reject({
              name: C,
              errors: x,
              warnings: k
            }) : {
              name: C,
              errors: x,
              warnings: k
            };
          }));
        }
      }
    });
    var m = s5(u);
    n.lastValidatePromise = m, m.catch(function(y) {
      return y;
    }).then(function(y) {
      var v = y.map(function(h) {
        var C = h.name;
        return C;
      });
      n.notifyObservers(n.store, v, {
        type: "validateFinish"
      }), n.triggerOnFieldsChange(v, y);
    });
    var b = m.then(function() {
      return n.lastValidatePromise === m ? Promise.resolve(n.getFieldsValue(c)) : Promise.reject([]);
    }).catch(function(y) {
      var v = y.filter(function(h) {
        return h && h.errors.length;
      });
      return Promise.reject({
        values: n.getFieldsValue(c),
        errorFields: v,
        outOfDate: n.lastValidatePromise !== m
      });
    });
    b.catch(function(y) {
      return y;
    });
    var g = c.filter(function(y) {
      return d.has(y.join(f));
    });
    return n.triggerOnFieldsChange(g), b;
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
function Il(t) {
  var e = T.useRef(), n = T.useState({}), r = Fe(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var a = function() {
        i({});
      }, o = new c5(a);
      e.current = o.getForm();
    }
  return [e.current];
}
var Ms = /* @__PURE__ */ T.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), u5 = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, a = e.children, o = T.useContext(Ms), l = T.useRef({});
  return /* @__PURE__ */ T.createElement(Ms.Provider, {
    value: X(X({}, o), {}, {
      validateMessages: X(X({}, o.validateMessages), n),
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
        u && (l.current = X(X({}, l.current), {}, de({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = X({}, l.current);
        delete f[u], l.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, f5 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], d5 = function(e, n) {
  var r = e.name, i = e.initialValues, a = e.fields, o = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, g = e.onValuesChange, y = e.onFieldsChange, v = e.onFinish, h = e.onFinishFailed, C = kr(e, f5), p = T.useContext(Ms), E = Il(o), w = Fe(E, 1), x = w[0], k = x.getInternalHooks(An), N = k.useSubscribe, M = k.setInitialValues, _ = k.setCallbacks, L = k.setValidateMessages, A = k.setPreserve, O = k.destroyForm;
  T.useImperativeHandle(n, function() {
    return x;
  }), T.useEffect(function() {
    return p.registerForm(r, x), function() {
      p.unregisterForm(r);
    };
  }, [p, x, r]), L(X(X({}, p.validateMessages), d)), _({
    onValuesChange: g,
    onFieldsChange: function(Z) {
      if (p.triggerFormChange(r, Z), y) {
        for (var U = arguments.length, H = new Array(U > 1 ? U - 1 : 0), G = 1; G < U; G++)
          H[G - 1] = arguments[G];
        y.apply(void 0, [Z].concat(H));
      }
    },
    onFinish: function(Z) {
      p.triggerFormFinish(r, Z), v && v(Z);
    },
    onFinishFailed: h
  }), A(l);
  var $ = T.useRef(null);
  M(i, !$.current), $.current || ($.current = !0), T.useEffect(
    function() {
      return O;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var P, S = typeof c == "function";
  if (S) {
    var F = x.getFieldsValue(!0);
    P = c(F, x);
  } else
    P = c;
  N(!S);
  var I = T.useRef();
  T.useEffect(function() {
    i5(I.current || [], a || []) || x.setFields(a || []), I.current = a;
  }, [a, x]);
  var R = T.useMemo(function() {
    return X(X({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), D = /* @__PURE__ */ T.createElement(La.Provider, {
    value: null
  }, /* @__PURE__ */ T.createElement(Zn.Provider, {
    value: R
  }, P));
  return f === !1 ? D : /* @__PURE__ */ T.createElement(f, Wn({}, C, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), x.submit();
    },
    onReset: function(Z) {
      var U;
      Z.preventDefault(), x.resetFields(), (U = C.onReset) === null || U === void 0 || U.call(C, Z);
    }
  }), D);
};
function Fu(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function Ll() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, a = e[1], o = a === void 0 ? {} : a, l = wg(o) ? {
    form: o
  } : o, c = l.form, u = Y(), f = Fe(u, 2), d = f[0], m = f[1], b = ce(function() {
    return Fu(d);
  }, [d]), g = V(b);
  g.current = b;
  var y = it(Zn), v = c || y, h = v && v._init, C = Oe(i), p = V(C);
  return p.current = C, Q(
    function() {
      if (h) {
        var E = v.getFieldsValue, w = v.getInternalHooks, x = w(An), k = x.registerWatch, N = k(function(_, L) {
          var A = kt(l.preserve ? L : _, p.current), O = Fu(A);
          g.current !== O && (g.current = O, m(A));
        }), M = kt(l.preserve ? E(!0) : E(), p.current);
        return m(M), N;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [h]
  ), d;
}
var m5 = /* @__PURE__ */ T.forwardRef(d5), Dr = m5;
Dr.FormProvider = u5;
Dr.Field = Tl;
Dr.List = h1;
Dr.useForm = Il;
Dr.useWatch = Ll;
const p1 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, Dl = s.createContext(p1), Nu = s.createContext(null), g1 = () => null;
var h5 = function(e) {
  return v5(e) && !p5(e);
};
function v5(t) {
  return !!t && typeof t == "object";
}
function p5(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || b5(t);
}
var g5 = typeof Symbol == "function" && Symbol.for, y5 = g5 ? Symbol.for("react.element") : 60103;
function b5(t) {
  return t.$$typeof === y5;
}
function E5(t) {
  return Array.isArray(t) ? [] : {};
}
function _i(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? $r(E5(t), t, e) : t;
}
function w5(t, e, n) {
  return t.concat(e).map(function(r) {
    return _i(r, n);
  });
}
function C5(t, e) {
  if (!e.customMerge)
    return $r;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : $r;
}
function x5(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function Pu(t) {
  return Object.keys(t).concat(x5(t));
}
function y1(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function k5(t, e) {
  return y1(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function $5(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && Pu(t).forEach(function(i) {
    r[i] = _i(t[i], n);
  }), Pu(e).forEach(function(i) {
    k5(t, i) || (y1(t, i) && n.isMergeableObject(e[i]) ? r[i] = C5(i, n)(t[i], e[i], n) : r[i] = _i(e[i], n));
  }), r;
}
function $r(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || w5, n.isMergeableObject = n.isMergeableObject || h5, n.cloneUnlessOtherwiseSpecified = _i;
  var r = Array.isArray(e), i = Array.isArray(t), a = r === i;
  return a ? r ? n.arrayMerge(t, e, n) : $5(t, e, n) : _i(e, n);
}
$r.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return $r(r, i, n);
  }, {});
};
var _5 = $r, S5 = _5;
const O5 = /* @__PURE__ */ $t(S5), b1 = (t) => s.createElement(h1, {
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
}), Ru = "adm-form", F5 = p1, N5 = Ee((t, e) => {
  const n = q(F5, t), {
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
    locale: b
  } = fe(), g = ce(() => O5(b.Form.defaultValidateMessages, m.validateMessages || {}), [b.Form.defaultValidateMessages, m.validateMessages]), y = [];
  let v = null, h = [], C = 0;
  function p() {
    h.length !== 0 && (C += 1, y.push(s.createElement(At, {
      header: v,
      key: C,
      mode: u
    }, h)), h = []);
  }
  return yn(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === g1) {
        p(), v = E.props.children;
        return;
      }
      if (E.type === b1) {
        p(), y.push(E);
        return;
      }
    }
    h.push(E);
  }), p(), s.createElement(Dr, Object.assign({
    className: j(Ru, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: g
  }), s.createElement(Dl.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, y), c && s.createElement("div", {
    className: `${Ru}-footer`
  }, c));
});
var Si = {}, E1 = { exports: {} }, w1 = { exports: {} };
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
})(w1);
var P5 = w1.exports;
(function(t) {
  var e = P5.default;
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
})(E1);
var R5 = E1.exports, C1 = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(C1);
var M5 = C1.exports, yt = {};
Object.defineProperty(yt, "__esModule", {
  value: !0
});
yt.call = Vl;
yt.default = void 0;
yt.note = k1;
yt.noteOnce = _1;
yt.preMessage = void 0;
yt.resetWarned = $1;
yt.warning = x1;
yt.warningOnce = Bi;
var As = {}, A5 = yt.preMessage = function(e) {
};
function x1(t, e) {
}
function k1(t, e) {
}
function $1() {
  As = {};
}
function Vl(t, e, n) {
  !e && !As[n] && (t(!1, n), As[n] = !0);
}
function Bi(t, e) {
  Vl(x1, t, e);
}
function _1(t, e) {
  Vl(k1, t, e);
}
Bi.preMessage = A5;
Bi.resetWarned = $1;
Bi.noteOnce = _1;
yt.default = Bi;
var T5 = R5.default, I5 = M5.default;
Object.defineProperty(Si, "__esModule", {
  value: !0
});
var S1 = Si.default = Si.HOOK_MARK = void 0, L5 = I5(yt), D5 = T5(s), V5 = "RC_FORM_INTERNAL_HOOKS";
Si.HOOK_MARK = V5;
var be = function() {
  (0, L5.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, j5 = /* @__PURE__ */ D5.createContext({
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
}), B5 = j5;
S1 = Si.default = B5;
function W5(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const Z5 = ze((t) => W(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), H5 = ["top", "right", "bottom", "left"], _r = Math.min, In = Math.max, Da = Math.round, ra = Math.floor, mn = (t) => ({
  x: t,
  y: t
}), z5 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, q5 = {
  start: "end",
  end: "start"
};
function Ts(t, e, n) {
  return In(t, _r(e, n));
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
function jl(t) {
  return t === "x" ? "y" : "x";
}
function Bl(t) {
  return t === "y" ? "height" : "width";
}
function Zi(t) {
  return ["top", "bottom"].includes(vn(t)) ? "y" : "x";
}
function Wl(t) {
  return jl(Zi(t));
}
function U5(t, e, n) {
  n === void 0 && (n = !1);
  const r = Wi(t), i = Wl(t), a = Bl(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (o = Va(o)), [o, Va(o)];
}
function K5(t) {
  const e = Va(t);
  return [Is(t), e, Is(e)];
}
function Is(t) {
  return t.replace(/start|end/g, (e) => q5[e]);
}
function Y5(t, e, n) {
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
function G5(t, e, n, r) {
  const i = Wi(t);
  let a = Y5(vn(t), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), e && (a = a.concat(a.map(Is)))), a;
}
function Va(t) {
  return t.replace(/left|right|bottom|top/g, (e) => z5[e]);
}
function X5(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function O1(t) {
  return typeof t != "number" ? X5(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function ja(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function Mu(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const a = Zi(e), o = Wl(e), l = Bl(o), c = vn(e), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
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
  switch (Wi(e)) {
    case "start":
      b[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      b[o] += m * (n && u ? -1 : 1);
      break;
  }
  return b;
}
const Q5 = async (t, e, n) => {
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
  } = Mu(u, r, c), m = r, b = {}, g = 0;
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
      platform: o,
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
      g++, typeof w == "object" && (w.placement && (m = w.placement), w.rects && (u = w.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : w.rects), {
        x: f,
        y: d
      } = Mu(u, m, c)), y = -1;
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
async function Ba(t, e) {
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
  } = hn(e, t), g = O1(b), v = l[m ? d === "floating" ? "reference" : "floating" : d], h = ja(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(v))) == null || n ? v : v.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(l.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), C = d === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, p = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(l.floating)), E = await (a.isElement == null ? void 0 : a.isElement(p)) ? await (a.getScale == null ? void 0 : a.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = ja(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const J5 = (t) => ({
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
    const d = O1(f), m = {
      x: n,
      y: r
    }, b = Wl(i), g = Bl(b), y = await o.getDimensions(u), v = b === "y", h = v ? "top" : "left", C = v ? "bottom" : "right", p = v ? "clientHeight" : "clientWidth", E = a.reference[g] + a.reference[b] - m[b] - a.floating[g], w = m[b] - a.reference[b], x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let k = x ? x[p] : 0;
    (!k || !await (o.isElement == null ? void 0 : o.isElement(x))) && (k = l.floating[p] || a.floating[g]);
    const N = E / 2 - w / 2, M = k / 2 - y[g] / 2 - 1, _ = _r(d[h], M), L = _r(d[C], M), A = _, O = k - y[g] - L, $ = k / 2 - y[g] / 2 + N, P = Ts(A, $, O), S = !c.arrow && Wi(i) != null && $ != P && a.reference[g] / 2 - ($ < A ? _ : L) - y[g] / 2 < 0, F = S ? $ < A ? $ - A : $ - O : 0;
    return {
      [b]: m[b] + F,
      data: {
        [b]: P,
        centerOffset: $ - P - F,
        ...S && {
          alignmentOffset: F
        }
      },
      reset: S
    };
  }
}), e6 = function(t) {
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
        fallbackAxisSideDirection: g = "none",
        flipAlignment: y = !0,
        ...v
      } = hn(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const h = vn(i), C = vn(l) === l, p = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (C || !y ? [Va(l)] : K5(l));
      !m && g !== "none" && E.push(...G5(l, y, g, p));
      const w = [l, ...E], x = await Ba(e, v), k = [];
      let N = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(x[h]), d) {
        const A = U5(i, o, p);
        k.push(x[A[0]], x[A[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: k
      }], !k.every((A) => A <= 0)) {
        var M, _;
        const A = (((M = a.flip) == null ? void 0 : M.index) || 0) + 1, O = w[A];
        if (O)
          return {
            data: {
              index: A,
              overflows: N
            },
            reset: {
              placement: O
            }
          };
        let $ = (_ = N.filter((P) => P.overflows[0] <= 0).sort((P, S) => P.overflows[1] - S.overflows[1])[0]) == null ? void 0 : _.placement;
        if (!$)
          switch (b) {
            case "bestFit": {
              var L;
              const P = (L = N.map((S) => [S.placement, S.overflows.filter((F) => F > 0).reduce((F, I) => F + I, 0)]).sort((S, F) => S[1] - F[1])[0]) == null ? void 0 : L[0];
              P && ($ = P);
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
function Au(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function Tu(t) {
  return H5.some((e) => t[e] >= 0);
}
const t6 = function(t) {
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
          const a = await Ba(e, {
            ...i,
            elementContext: "reference"
          }), o = Au(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Tu(o)
            }
          };
        }
        case "escaped": {
          const a = await Ba(e, {
            ...i,
            altBoundary: !0
          }), o = Au(a, n.floating);
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
async function n6(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = vn(n), l = Wi(n), c = Zi(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = hn(e, t);
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
const r6 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await n6(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, i6 = function(t) {
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
      } = hn(t, e), u = {
        x: n,
        y: r
      }, f = await Ba(e, c), d = Zi(vn(i)), m = jl(d);
      let b = u[m], g = u[d];
      if (a) {
        const v = m === "y" ? "top" : "left", h = m === "y" ? "bottom" : "right", C = b + f[v], p = b - f[h];
        b = Ts(C, b, p);
      }
      if (o) {
        const v = d === "y" ? "top" : "left", h = d === "y" ? "bottom" : "right", C = g + f[v], p = g - f[h];
        g = Ts(C, g, p);
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
}, a6 = function(t) {
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
      }, d = Zi(i), m = jl(d);
      let b = f[m], g = f[d];
      const y = hn(l, e), v = typeof y == "number" ? {
        mainAxis: y,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...y
      };
      if (c) {
        const p = m === "y" ? "height" : "width", E = a.reference[m] - a.floating[p] + v.mainAxis, w = a.reference[m] + a.reference[p] - v.mainAxis;
        b < E ? b = E : b > w && (b = w);
      }
      if (u) {
        var h, C;
        const p = m === "y" ? "width" : "height", E = ["top", "left"].includes(vn(i)), w = a.reference[d] - a.floating[p] + (E && ((h = o.offset) == null ? void 0 : h[d]) || 0) + (E ? 0 : v.crossAxis), x = a.reference[d] + a.reference[p] + (E ? 0 : ((C = o.offset) == null ? void 0 : C[d]) || 0) - (E ? v.crossAxis : 0);
        g < w ? g = w : g > x && (g = x);
      }
      return {
        [m]: b,
        [d]: g
      };
    }
  };
};
function pn(t) {
  return F1(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function at(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Gt(t) {
  var e;
  return (e = (F1(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function F1(t) {
  return t instanceof Node || t instanceof at(t).Node;
}
function Kt(t) {
  return t instanceof Element || t instanceof at(t).Element;
}
function Lt(t) {
  return t instanceof HTMLElement || t instanceof at(t).HTMLElement;
}
function Iu(t) {
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
function o6(t) {
  return ["table", "td", "th"].includes(pn(t));
}
function Zl(t) {
  const e = Hl(), n = pt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function s6(t) {
  let e = Sr(t);
  for (; Lt(e) && !Co(e); ) {
    if (Zl(e))
      return e;
    e = Sr(e);
  }
  return null;
}
function Hl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Co(t) {
  return ["html", "body", "#document"].includes(pn(t));
}
function pt(t) {
  return at(t).getComputedStyle(t);
}
function xo(t) {
  return Kt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Sr(t) {
  if (pn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    Iu(t) && t.host || // Fallback.
    Gt(t)
  );
  return Iu(e) ? e.host : e;
}
function N1(t) {
  const e = Sr(t);
  return Co(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Lt(e) && Hi(e) ? e : N1(e);
}
function Oi(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = N1(t), a = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = at(i);
  return a ? e.concat(o, o.visualViewport || [], Hi(i) ? i : [], o.frameElement && n ? Oi(o.frameElement) : []) : e.concat(i, Oi(i, [], n));
}
function P1(t) {
  const e = pt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = Lt(t), a = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, l = Da(n) !== a || Da(r) !== o;
  return l && (n = a, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function zl(t) {
  return Kt(t) ? t : t.contextElement;
}
function gr(t) {
  const e = zl(t);
  if (!Lt(e))
    return mn(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = P1(e);
  let o = (a ? Da(n.width) : n.width) / r, l = (a ? Da(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const l6 = /* @__PURE__ */ mn(0);
function R1(t) {
  const e = at(t);
  return !Hl() || !e.visualViewport ? l6 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function c6(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== at(t) ? !1 : e;
}
function Hn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = zl(t);
  let o = mn(1);
  e && (r ? Kt(r) && (o = gr(r)) : o = gr(t));
  const l = c6(a, n, r) ? R1(a) : mn(0);
  let c = (i.left + l.x) / o.x, u = (i.top + l.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = at(a), b = r && Kt(r) ? at(r) : r;
    let g = m.frameElement;
    for (; g && r && b !== m; ) {
      const y = gr(g), v = g.getBoundingClientRect(), h = pt(g), C = v.left + (g.clientLeft + parseFloat(h.paddingLeft)) * y.x, p = v.top + (g.clientTop + parseFloat(h.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += C, u += p, g = at(g).frameElement;
    }
  }
  return ja({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function u6(t) {
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
  if ((i || !i && r !== "fixed") && ((pn(n) !== "body" || Hi(a)) && (o = xo(n)), Lt(n))) {
    const u = Hn(n);
    l = gr(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - o.scrollLeft * l.x + c.x,
    y: e.y * l.y - o.scrollTop * l.y + c.y
  };
}
function f6(t) {
  return Array.from(t.getClientRects());
}
function M1(t) {
  return Hn(Gt(t)).left + xo(t).scrollLeft;
}
function d6(t) {
  const e = Gt(t), n = xo(t), r = t.ownerDocument.body, i = In(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), a = In(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + M1(t);
  const l = -n.scrollTop;
  return pt(r).direction === "rtl" && (o += In(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: l
  };
}
function m6(t, e) {
  const n = at(t), r = Gt(t), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, l = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = Hl();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function h6(t, e) {
  const n = Hn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, a = Lt(t) ? gr(t) : mn(1), o = t.clientWidth * a.x, l = t.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: l,
    x: c,
    y: u
  };
}
function Lu(t, e, n) {
  let r;
  if (e === "viewport")
    r = m6(t, n);
  else if (e === "document")
    r = d6(Gt(t));
  else if (Kt(e))
    r = h6(e, n);
  else {
    const i = R1(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return ja(r);
}
function A1(t, e) {
  const n = Sr(t);
  return n === e || !Kt(n) || Co(n) ? !1 : pt(n).position === "fixed" || A1(n, e);
}
function v6(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Oi(t, [], !1).filter((l) => Kt(l) && pn(l) !== "body"), i = null;
  const a = pt(t).position === "fixed";
  let o = a ? Sr(t) : t;
  for (; Kt(o) && !Co(o); ) {
    const l = pt(o), c = Zl(o);
    !c && l.position === "fixed" && (i = null), (a ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Hi(o) && !c && A1(t, o)) ? r = r.filter((f) => f !== o) : i = l, o = Sr(o);
  }
  return e.set(t, r), r;
}
function p6(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? v6(e, this._c) : [].concat(n), r], l = o[0], c = o.reduce((u, f) => {
    const d = Lu(e, f, i);
    return u.top = In(d.top, u.top), u.right = _r(d.right, u.right), u.bottom = _r(d.bottom, u.bottom), u.left = In(d.left, u.left), u;
  }, Lu(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function g6(t) {
  return P1(t);
}
function y6(t, e, n) {
  const r = Lt(e), i = Gt(e), a = n === "fixed", o = Hn(t, !0, a, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = mn(0);
  if (r || !r && !a)
    if ((pn(e) !== "body" || Hi(i)) && (l = xo(e)), r) {
      const u = Hn(e, !0, a, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = M1(i));
  return {
    x: o.left + l.scrollLeft - c.x,
    y: o.top + l.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function Du(t, e) {
  return !Lt(t) || pt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function T1(t, e) {
  const n = at(t);
  if (!Lt(t))
    return n;
  let r = Du(t, e);
  for (; r && o6(r) && pt(r).position === "static"; )
    r = Du(r, e);
  return r && (pn(r) === "html" || pn(r) === "body" && pt(r).position === "static" && !Zl(r)) ? n : r || s6(t) || n;
}
const b6 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || T1, a = this.getDimensions;
  return {
    reference: y6(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function E6(t) {
  return pt(t).direction === "rtl";
}
const w6 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: u6,
  getDocumentElement: Gt,
  getClippingRect: p6,
  getOffsetParent: T1,
  getElementRects: b6,
  getClientRects: f6,
  getDimensions: g6,
  getScale: gr,
  isElement: Kt,
  isRTL: E6
};
function C6(t, e) {
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
    const b = ra(f), g = ra(i.clientWidth - (u + d)), y = ra(i.clientHeight - (f + m)), v = ra(u), C = {
      rootMargin: -b + "px " + -g + "px " + -y + "px " + -v + "px",
      threshold: In(0, _r(1, c)) || 1
    };
    let p = !0;
    function E(w) {
      const x = w[0].intersectionRatio;
      if (x !== c) {
        if (!p)
          return o();
        x ? o(!1, x) : r = setTimeout(() => {
          o(!1, 1e-7);
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
  return o(!0), a;
}
function x6(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = zl(t), f = i || a ? [...u ? Oi(u) : [], ...Oi(e)] : [];
  f.forEach((h) => {
    i && h.addEventListener("scroll", n, {
      passive: !0
    }), a && h.addEventListener("resize", n);
  });
  const d = u && l ? C6(u, n) : null;
  let m = -1, b = null;
  o && (b = new ResizeObserver((h) => {
    let [C] = h;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let g, y = c ? Hn(t) : null;
  c && v();
  function v() {
    const h = Hn(t);
    y && (h.x !== y.x || h.y !== y.y || h.width !== y.width || h.height !== y.height) && n(), y = h, g = requestAnimationFrame(v);
  }
  return n(), () => {
    f.forEach((h) => {
      i && h.removeEventListener("scroll", n), a && h.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(g);
  };
}
const k6 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: w6,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return Q5(t, e, {
    ...i,
    platform: a
  });
};
class $6 extends s.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = k0(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return s.Children.only(this.props.children);
  }
}
const _6 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function S6(t) {
  var e;
  return (e = _6[t]) !== null && e !== void 0 ? e : t;
}
let fr = null, yr = null;
Fr && (fr = document.createElement("div"), fr.className = "adm-px-tester", fr.style.setProperty("--size", "10"), document.body.appendChild(fr), yr = document.createElement("div"), yr.className = "adm-px-tester", document.body.appendChild(yr));
function Ln(t) {
  return fr === null || yr === null || fr.getBoundingClientRect().height === 10 ? t : (yr.style.setProperty("--size", t.toString()), yr.getBoundingClientRect().height);
}
const En = "adm-popover", O6 = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, I1 = Ee((t, e) => {
  const n = q(O6, t), r = S6(n.placement), [i, a] = ue({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  xe(e, () => ({
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
  }, s.createElement(Z5, {
    className: `${En}-arrow-icon`
  })), s.createElement("div", {
    className: `${En}-inner`
  }, s.createElement("div", {
    className: `${En}-inner-content`
  }, n.content))))), [f, d] = Y(null);
  function m() {
    var g, y, v;
    return Re(this, void 0, void 0, function* () {
      const h = (y = (g = o.current) === null || g === void 0 ? void 0 : g.element) !== null && y !== void 0 ? y : null, C = l.current, p = c.current;
      if (d(h), !h || !C || !p)
        return;
      const {
        x: E,
        y: w,
        placement: x,
        middlewareData: k
      } = yield k6(h, C, {
        placement: r,
        middleware: [r6(Ln(12)), i6({
          padding: Ln(4),
          crossAxis: !1,
          limiter: a6()
        }), e6(), t6(), J5({
          element: p,
          padding: Ln(12)
        })]
      });
      Object.assign(C.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const N = x.split("-")[0], M = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[N], {
        x: _,
        y: L
      } = (v = k.arrow) !== null && v !== void 0 ? v : {};
      Object.assign(p.style, {
        left: _ != null ? `${_}px` : "",
        top: L != null ? `${L}px` : "",
        right: "",
        bottom: "",
        [M]: "calc(var(--arrow-size) * -1)"
      });
      const A = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[N];
      p.style.setProperty("--arrow-icon-rotate", A);
    });
  }
  Ae(() => {
    m();
  }), Q(() => {
    if (!f || !n.trigger)
      return;
    function g() {
      a((y) => !y);
    }
    return f.addEventListener("click", g), () => {
      f.removeEventListener("click", g);
    };
  }, [f, n.trigger]), Q(() => {
    const g = l.current;
    if (!(!f || !g))
      return x6(f, g, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), ff(() => {
    n.trigger && a(!1);
  }, [() => {
    var g;
    return (g = o.current) === null || g === void 0 ? void 0 : g.element;
  }, l], ["click", "touchmove"]);
  const b = no(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement($6, {
    ref: o
  }, n.children), b && Mr(n.getContainer, u));
}), nn = "adm-popover-menu", F6 = Ee((t, e) => {
  const n = V(null);
  xe(e, () => n.current, []);
  const r = Qe((a) => {
    var o;
    const {
      onAction: l
    } = t;
    l && l(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [t.onAction]), i = ce(() => {
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
  return s.createElement(I1, Object.assign({
    ref: n
  }, t, {
    className: j(nn, t.className),
    content: i
  }), t.children);
}), L1 = pe(I1, {
  Menu: F6
});
function jo(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function N6(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function P6(t) {
  return typeof t == "function" && !N6(t) && t.defaultProps === void 0;
}
function D1(t) {
  return Ci.isFragment(t) ? !1 : Ci.isMemo(t) ? D1(t.type) : !P6(t.type);
}
const R6 = "__SPLIT__", Ye = "adm-form-item", M6 = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), A6 = (t) => {
  var e;
  const {
    locale: n,
    form: r = {}
  } = fe(), {
    style: i,
    extra: a,
    label: o,
    help: l,
    helpIcon: c,
    required: u,
    children: f,
    htmlFor: d,
    hidden: m,
    arrow: b,
    arrowIcon: g,
    childElementPosition: y = "normal"
  } = q(r, t), v = it(Dl), h = t.hasFeedback !== void 0 ? t.hasFeedback : v.hasFeedback, C = t.layout || v.layout, p = (e = t.disabled) !== null && e !== void 0 ? e : v.disabled, E = (() => {
    const {
      requiredMarkStyle: k
    } = v;
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
  }, o, E, l && s.createElement(L1, {
    content: l,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${Ye}-label-help`,
    onClick: (k) => {
      k.stopPropagation(), k.preventDefault();
    }
  }, c || s.createElement(gv, null)))), x = (!!t.description || h) && s.createElement(s.Fragment, null, t.description, h && s.createElement(s.Fragment, null, t.errors.map((k, N) => s.createElement("div", {
    key: `error-${N}`,
    className: `${Ye}-feedback-error`
  }, k)), t.warnings.map((k, N) => s.createElement("div", {
    key: `warning-${N}`,
    className: `${Ye}-feedback-warning`
  }, k))));
  return W(t, s.createElement(At.Item, {
    style: i,
    title: C === "vertical" && w,
    prefix: C === "horizontal" && w,
    extra: a,
    description: x,
    className: j(Ye, `${Ye}-${C}`, {
      [`${Ye}-hidden`]: m,
      [`${Ye}-has-error`]: t.errors.length
    }),
    disabled: p,
    onClick: t.onClick,
    clickable: t.clickable,
    arrowIcon: g || b
  }, s.createElement("div", {
    className: j(`${Ye}-child`, `${Ye}-child-position-${y}`)
  }, s.createElement("div", {
    className: j(`${Ye}-child-inner`)
  }, f))));
}, T6 = (t) => {
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
    arrow: N,
    arrowIcon: M
  } = t, _ = un(t, ["style", "label", "help", "helpIcon", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow", "arrowIcon"]), {
    name: L
  } = it(Dl), {
    validateTrigger: A
  } = it(S1), O = W5(p, A, C), $ = V(null), P = V(0);
  P.current += 1;
  const [S, F] = Y({}), I = Qe((H, G) => {
    F((ne) => {
      const ie = Object.assign({}, ne), he = G.join(R6);
      return H.destroy ? delete ie[he] : ie[he] = H, ie;
    });
  }, [F]);
  function R(H, G, ne, ie) {
    var he, K;
    if (u && !f)
      return H;
    const ee = (he = ne == null ? void 0 : ne.errors) !== null && he !== void 0 ? he : [], J = Object.keys(S).reduce((ve, ke) => {
      var qe, De;
      const Vt = (De = (qe = S[ke]) === null || qe === void 0 ? void 0 : qe.errors) !== null && De !== void 0 ? De : [];
      return Vt.length && (ve = [...ve, ...Vt]), ve;
    }, ee), re = (K = ne == null ? void 0 : ne.warnings) !== null && K !== void 0 ? K : [], oe = Object.keys(S).reduce((ve, ke) => {
      var qe, De;
      const Vt = (De = (qe = S[ke]) === null || qe === void 0 ? void 0 : qe.warnings) !== null && De !== void 0 ? De : [];
      return Vt.length && (ve = [...ve, ...Vt]), ve;
    }, re);
    return W(t, s.createElement(A6, {
      style: e,
      label: n,
      extra: a,
      help: r,
      helpIcon: i,
      description: b,
      required: ie,
      disabled: g,
      hasFeedback: o,
      htmlFor: G,
      errors: J,
      warnings: oe,
      onClick: E && ((ve) => E(ve, $)),
      hidden: f,
      layout: d,
      childElementPosition: m,
      clickable: k,
      arrow: N,
      arrowIcon: M
    }, s.createElement(Nu.Provider, {
      value: I
    }, H)));
  }
  const D = typeof v == "function";
  if (!l && !D && !t.dependencies)
    return R(v);
  let B = {};
  B.label = typeof n == "string" ? n : "", h && (B = Object.assign(Object.assign({}, B), h));
  const Z = it(Nu), U = (H) => {
    if (u && Z) {
      const G = H.name;
      Z(H, G);
    }
  };
  return s.createElement(Tl, Object.assign({}, _, {
    name: l,
    shouldUpdate: w,
    dependencies: x,
    rules: y,
    trigger: C,
    validateTrigger: O,
    onMetaChange: U,
    messageVariables: B
  }), (H, G, ne) => {
    let ie = null;
    const he = c !== void 0 ? c : y && y.some((J) => !!(J && typeof J == "object" && J.required)), K = jo(l).length && G ? G.name : [], ee = (K.length > 0 && L ? [L, ...K] : K).join("_");
    if (D)
      (w || x) && !l && (ie = v(ne));
    else if (!(x && !l))
      if (s.isValidElement(v)) {
        v.props.defaultValue;
        const J = Object.assign(Object.assign({}, v.props), H);
        D1(v) && (J.ref = (oe) => {
          const ve = v.ref;
          ve && (typeof ve == "function" && ve(oe), "current" in ve && (ve.current = oe)), $.current = oe;
        }), J.id || (J.id = ee), (/* @__PURE__ */ new Set([...jo(C), ...jo(O)])).forEach((oe) => {
          J[oe] = (...ve) => {
            var ke, qe, De;
            (ke = H[oe]) === null || ke === void 0 || ke.call(H, ...ve), (De = (qe = v.props)[oe]) === null || De === void 0 || De.call(qe, ...ve);
          };
        }), ie = s.createElement(M6, {
          value: H[t.valuePropName || "value"],
          update: P.current
        }, s.cloneElement(v, J));
      } else
        ie = v;
    return R(ie, ee, G, he);
  });
}, I6 = (t) => {
  const e = cf(), n = it(Zn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((a) => s.createElement(L6, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: e
  })));
}, L6 = ze((t) => {
  const e = Ll(t.namePath, t.form);
  return Li(() => {
    t.onChange();
  }, [e]), null;
}), Fy = pe(N5, {
  Item: T6,
  Subscribe: I6,
  Header: g1,
  Array: b1,
  useForm: Il,
  useWatch: Ll
}), V1 = "adm-grid", D6 = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = Rn(n[0]), e["--gap-vertical"] = Rn(n[1])) : e["--gap"] = Rn(n)), W(t, s.createElement("div", {
    className: V1,
    style: e
  }, t.children));
}, V6 = (t) => {
  const e = q({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, s.createElement("div", {
    className: `${V1}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, j1 = pe(D6, {
  Item: V6
}), j6 = E3([cd, o3]), ia = () => [1, 0, 0, 1, 0, 0], Vu = (t) => t[4], ju = (t) => t[5], Gr = (t) => t[0], Xr = (t, e, n) => B1([1, 0, 0, 1, e, n], t), B6 = (t, e, n = e) => B1([e, 0, 0, n, 0, 0], t), W6 = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], B1 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], Bo = "adm-image-viewer", W1 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = V([]), i = V(null), a = V(null), [{
    matrix: o
  }, l] = Le(() => ({
    matrix: ia(),
    config: {
      tension: 200
    }
  })), c = Xo(i), u = Xo(a), f = V(!1), d = (g) => {
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
    const y = -c.width / 2, v = -c.height / 2, h = -u.width / 2, C = -u.height / 2, p = Gr(g), E = p * u.width, w = p * u.height, x = y - (E - c.width), k = y, N = v - (w - c.height), M = v, [_, L] = W6(g, [h, C]);
    return {
      x: {
        position: _,
        minX: x,
        maxX: k
      },
      y: {
        position: L,
        minY: N,
        maxY: M
      }
    };
  }, m = (g, y, v, h = 0) => [g <= y - h, g >= v + h], b = (g, y, v = !1) => {
    if (!c || !u)
      return g;
    const h = Gr(g), C = h * u.width, p = h * u.height, {
      x: {
        position: E,
        minX: w,
        maxX: x
      },
      y: {
        position: k,
        minY: N,
        maxY: M
      }
    } = d(g);
    if (y === "translate") {
      let _ = E, L = k;
      return C > c.width ? _ = v ? Ne(E, w, x) : xi(E, w, x, h * 50) : _ = -C / 2, p > c.height ? L = v ? Ne(k, N, M) : xi(k, N, M, h * 50) : L = -p / 2, Xr(g, _ - E, L - k);
    }
    if (y === "scale" && v) {
      const [_, L] = [C > c.width ? Ne(E, w, x) : -C / 2, p > c.height ? Ne(k, N, M) : -p / 2];
      return Xr(g, _ - E, L - k);
    }
    return g;
  };
  return j6({
    onDrag: (g) => {
      var y;
      if (g.first) {
        const {
          x: {
            position: h,
            minX: C,
            maxX: p
          }
        } = d(o.get());
        r.current = m(h, C, p);
        return;
      }
      if (g.pinching)
        return g.cancel();
      if (g.tap && g.elapsedTime > 0 && g.elapsedTime < 1e3) {
        (y = t.onTap) === null || y === void 0 || y.call(t);
        return;
      }
      const v = Gr(o.get());
      if (e && (e.current = v !== 1), !f.current && v <= 1)
        l.start({
          matrix: ia()
        });
      else {
        const h = o.get(), C = [g.offset[0] - Vu(h), g.offset[1] - ju(h)], p = Xr(h, ...g.last ? [C[0] + g.velocity[0] * g.direction[0] * 200, C[1] + g.velocity[1] * g.direction[1] * 200] : C);
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
          matrix: ia()
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
      const C = g.last ? Ne(v, 1, h) : v;
      if ((y = t.onZoomChange) === null || y === void 0 || y.call(t, C), g.last && C <= 1)
        l.start({
          matrix: ia()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const p = o.get(), E = Gr(p), w = g.origin[0] - c.width / 2, x = g.origin[1] - c.height / 2;
        let k = Xr(p, -w, -x);
        k = B6(k, C / E), k = Xr(k, w, x), l.start({
          matrix: b(k, "scale", g.last),
          immediate: !g.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [Vu(o.get()), ju(o.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Gr(o.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), s.createElement("div", {
    className: `${Bo}-slide`
  }, s.createElement("div", {
    className: `${Bo}-control`,
    ref: i
  }, s.createElement(Ce.div, {
    className: `${Bo}-image-wrapper`,
    style: {
      matrix: o
    }
  }, s.createElement("img", {
    ref: a,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, Wo = "adm-image-viewer", Z6 = Ee((t, e) => {
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
  xe(e, () => ({
    swipeTo: o
  }));
  const l = V(!1), c = Dt((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, b = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(Ne(Math.round((f + b) / n), d, m));
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
    className: `${Wo}-slides`
  }, c()), s.createElement(Ce.div, {
    className: `${Wo}-indicator`
  }, r.to((u) => `${Ne(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), s.createElement(Ce.div, {
    className: `${Wo}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(W1, {
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
}), Wa = "adm-image-viewer", Z1 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, H1 = (t) => {
  var e, n, r;
  const i = q(Z1, t), a = s.createElement(Ai, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: j(`${Wa}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && s.createElement(W1, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && s.createElement("div", {
    className: `${Wa}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(Lr, {
    position: "bottom"
  })));
  return Mr(i.getContainer, a);
}, H6 = Object.assign(Object.assign({}, Z1), {
  defaultIndex: 0
}), z1 = Ee((t, e) => {
  var n, r, i;
  const a = q(H6, t), [o, l] = Y(a.defaultIndex), c = V(null);
  xe(e, () => ({
    swipeTo: (d, m) => {
      var b;
      l(d), (b = c.current) === null || b === void 0 || b.swipeTo(d, m);
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
    className: j(`${Wa}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && s.createElement(Z6, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom
  })), a.images && s.createElement("div", {
    className: `${Wa}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), s.createElement(Lr, {
    position: "bottom"
  })));
  return Mr(a.getContainer, f);
}), Or = /* @__PURE__ */ new Set();
function z6(t) {
  ql();
  const e = Bn(s.createElement(H1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Or.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Or.add(e), e;
}
function q6(t) {
  ql();
  const e = Bn(s.createElement(z1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Or.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Or.add(e), e;
}
function ql() {
  Or.forEach((t) => {
    t.close();
  }), Or.clear();
}
const U6 = pe(z1, {
  show: q6
}), K6 = pe(H1, {
  Multi: U6,
  show: z6,
  clear: ql
}), wn = "adm-image-uploader", Y6 = (t) => {
  const {
    locale: e
  } = fe(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: l
  } = t, c = ce(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  Q(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${wn}-cell-mask`
    }, s.createElement("span", {
      className: `${wn}-cell-loading`
    }, s.createElement($l, {
      color: "white"
    }), s.createElement("span", {
      className: `${wn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${wn}-cell-delete`,
      onClick: o
    }, a);
  }
  return s.createElement("div", {
    className: j(`${wn}-cell`, t.status === "fail" && `${wn}-cell-fail`)
  }, s.createElement(oo, {
    className: `${wn}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, Bu = Y6, Cn = "adm-space", G6 = {
  direction: "horizontal"
}, Ul = (t) => {
  const e = q(G6, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, s.createElement("div", {
    className: j(Cn, {
      [`${Cn}-wrap`]: e.wrap,
      [`${Cn}-block`]: e.block,
      [`${Cn}-${n}`]: !0,
      [`${Cn}-align-${e.align}`]: !!e.align,
      [`${Cn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${Cn}-item`
  }, i))));
}, Rt = "adm-image-uploader", X6 = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(ro, {
    className: `${Rt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, Ny = Ee((t, e) => {
  const {
    locale: n
  } = fe(), r = q(X6, t), {
    columns: i
  } = r, [a, o] = ue(r), [l, c] = Y([]), u = V(null), f = Xo(u), d = V(null), [m, b] = Y(80), g = V(null);
  Ae(() => {
    const O = d.current;
    if (i && f && O) {
      const $ = f.width, P = Ad(window.getComputedStyle(O).getPropertyValue("height"));
      b(($ - P * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const y = {
    "--cell-size": m + "px"
  };
  Ae(() => {
    c((O) => O.filter(($) => $.url === void 0 ? !0 : !a.some((P) => P.url === $.url)));
  }, [a]), Ae(() => {
    var O;
    (O = r.onUploadQueueChange) === null || O === void 0 || O.call(r, l.map(($) => ({
      id: $.id,
      status: $.status
    })));
  }, [l]);
  const v = V(0), {
    maxCount: h,
    onPreview: C,
    renderItem: p
  } = r;
  function E(O, $) {
    return Re(this, void 0, void 0, function* () {
      const {
        beforeUpload: P
      } = r;
      let S = O;
      return S = yield P == null ? void 0 : P(O, $), S;
    });
  }
  function w(O) {
    return r.showFailed ? O : O.filter(($) => $.status !== "fail");
  }
  function x(O) {
    var $;
    return Re(this, void 0, void 0, function* () {
      O.persist();
      const {
        files: P
      } = O.target;
      if (!P)
        return;
      let S = [].slice.call(P);
      if (O.target.value = "", r.beforeUpload) {
        const R = S.map((D) => E(D, S));
        yield Promise.all(R).then((D) => {
          S = D.filter(Boolean);
        });
      }
      if (S.length === 0)
        return;
      if (h > 0) {
        const R = a.length + S.length - h;
        R > 0 && (S = S.slice(0, S.length - R), ($ = r.onCountExceed) === null || $ === void 0 || $.call(r, R));
      }
      const F = S.map((R) => ({
        id: v.current++,
        status: "pending",
        file: R
      }));
      c((R) => [...w(R), ...F]);
      const I = [];
      yield Promise.all(F.map((R, D) => Re(this, void 0, void 0, function* () {
        try {
          const B = yield r.upload(R.file);
          I[D] = B, c((Z) => Z.map((U) => U.id === R.id ? Object.assign(Object.assign({}, U), {
            status: "success",
            url: B.url
          }) : U));
        } catch (B) {
          throw c((Z) => Z.map((U) => U.id === R.id ? Object.assign(Object.assign({}, U), {
            status: "fail"
          }) : U)), B;
        }
      }))).catch((R) => console.error(R)), o((R) => R.concat(I));
    });
  }
  const k = V(null);
  function N(O) {
    k.current = K6.Multi.show({
      images: a.map(($) => $.url),
      defaultIndex: O,
      onClose: () => {
        k.current = null;
      }
    });
  }
  Pi(() => {
    var O;
    (O = k.current) === null || O === void 0 || O.close();
  });
  const M = w(l), _ = r.showUpload && (h === 0 || a.length + M.length < h), L = () => a.map((O, $) => {
    var P, S;
    const F = s.createElement(Bu, {
      key: (P = O.key) !== null && P !== void 0 ? P : $,
      url: (S = O.thumbnailUrl) !== null && S !== void 0 ? S : O.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && N($), C && C($, O);
      },
      onDelete: () => Re(void 0, void 0, void 0, function* () {
        var I;
        (yield (I = r.onDelete) === null || I === void 0 ? void 0 : I.call(r, O)) !== !1 && o(a.filter((D, B) => B !== $));
      })
    });
    return p ? p(F, O, a) : F;
  }), A = s.createElement(s.Fragment, null, L(), l.map((O) => !r.showFailed && O.status === "fail" ? null : s.createElement(Bu, {
    key: O.id,
    file: O.file,
    deletable: O.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: O.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(l.filter(($) => $.id !== O.id));
    }
  })), s.createElement("div", {
    className: `${Rt}-upload-button-wrap`,
    style: _ ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${Rt}-cell ${Rt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${Rt}-upload-button-icon`
  }, s.createElement(Gf, null))), !r.disableUpload && s.createElement("input", {
    "aria-label": n.ImageUploader.upload,
    ref: g,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${Rt}-input`,
    onChange: x
  })));
  return xe(e, () => ({
    get nativeElement() {
      return g.current;
    }
  })), W(r, s.createElement("div", {
    className: Rt,
    ref: u
  }, i ? s.createElement(j1, {
    className: `${Rt}-grid`,
    columns: i,
    style: y
  }, s.createElement("div", {
    className: `${Rt}-gap-measure`,
    ref: d
  }), A.props.children) : s.createElement(Ul, {
    className: `${Rt}-space`,
    wrap: !0,
    block: !0
  }, A.props.children)));
}), q1 = () => null, ir = "adm-index-bar", Q6 = (t) => {
  const [e, n] = Y(!1);
  return s.createElement("div", {
    className: j(`${ir}-sidebar`, {
      [`${ir}-sidebar-interacting`]: e
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
      className: `${ir}-sidebar-row`,
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
      className: `${ir}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: j(`${ir}-sidebar-item`, {
        [`${ir}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, ar = "adm-index-bar", J6 = {
  sticky: !0
}, e7 = Ee((t, e) => {
  const n = q(J6, t), r = Ln(35), i = V(null), a = [], o = [];
  yn(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === q1 && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(W(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${ar}-anchor`
    }, s.createElement("div", {
      className: `${ar}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = Y(() => {
    const d = a[0];
    return d ? d.index : null;
  });
  xe(e, () => ({
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
  } = qa(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const b = m.scrollTop, g = m.getElementsByClassName(`${ar}-anchor`);
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
    className: j(`${ar}`, {
      [`${ar}-sticky`]: n.sticky
    })
  }, s.createElement(Q6, {
    indexItems: a,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${ar}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), Py = pe(e7, {
  Panel: q1
});
function t7(t) {
  return t === window;
}
const U1 = "adm-infinite-scroll", n7 = {
  threshold: 250,
  children: (t, e, n) => s.createElement(r7, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, Ry = (t) => {
  const e = q(n7, t), [n, r] = Y(!1), i = eh((b) => Re(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (g) {
      throw r(!0), g;
    }
  })), a = V(null), [o, l] = Y({}), c = V(o), [u, f] = Y(), {
    run: d
  } = qa(() => Re(void 0, void 0, void 0, function* () {
    if (c.current !== o || !e.hasMore)
      return;
    const b = a.current;
    if (!b || !b.offsetParent)
      return;
    const g = ka(b);
    if (f(g), !g)
      return;
    const v = b.getBoundingClientRect().top;
    if ((t7(g) ? window.innerHeight : g.getBoundingClientRect().bottom) >= v - e.threshold) {
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
  Q(() => {
    d();
  }), Q(() => {
    if (!a.current || !u)
      return;
    function g() {
      d();
    }
    return u.addEventListener("scroll", g), () => {
      u.removeEventListener("scroll", g);
    };
  }, [u]);
  function m() {
    return Re(this, void 0, void 0, function* () {
      r(!1);
      try {
        yield i(!0), l(c.current);
      } catch {
      }
    });
  }
  return W(e, s.createElement("div", {
    className: U1,
    ref: a
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, r7 = (t) => {
  const {
    locale: e
  } = fe();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${U1}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(hd, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function K1({
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
const aa = "adm-input", i7 = {
  defaultValue: "",
  clearIcon: s.createElement(ml, null),
  onlyShowClearWhenFocus: !0
}, Y1 = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = fe(), i = q(i7, r, t), [a, o] = ue(i), [l, c] = Y(!1), u = V(!1), f = V(null), d = K1({
    onEnterPress: i.onEnterPress,
    onKeyDown: i.onKeyDown,
    nativeInputRef: f,
    enterKeyHint: i.enterKeyHint
  });
  xe(e, () => ({
    clear: () => {
      o("");
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
    let g = a;
    if (i.type === "number") {
      const y = g && Ne(parseFloat(g), i.min, i.max).toString();
      Number(g) !== Number(y) && (g = y);
    }
    g !== a && o(g);
  }
  const b = !i.clearable || !a || i.readOnly ? !1 : i.onlyShowClearWhenFocus ? l : !0;
  return W(i, s.createElement("div", {
    className: j(`${aa}`, i.disabled && `${aa}-disabled`)
  }, s.createElement("input", {
    ref: f,
    className: `${aa}-element`,
    value: a,
    onChange: (g) => {
      o(g.target.value);
    },
    onFocus: (g) => {
      var y;
      c(!0), (y = i.onFocus) === null || y === void 0 || y.call(i, g);
    },
    onBlur: (g) => {
      var y;
      c(!1), m(), (y = i.onBlur) === null || y === void 0 || y.call(i, g);
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
    className: `${aa}-clear`,
    onMouseDown: (g) => {
      g.preventDefault();
    },
    onClick: () => {
      var g, y;
      o(""), (g = i.onClear) === null || g === void 0 || g.call(i), K3() && u.current && (u.current = !1, (y = f.current) === null || y === void 0 || y.blur());
    },
    "aria-label": n.Input.clear
  }, i.clearIcon)));
}), Ft = "adm-jumbo-tabs", a7 = () => null, o7 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  yn(t.children, (d, m) => {
    if (!zn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const g = o.push(d);
    i[b] = g - 1;
  });
  const [l, c] = ue({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = Rd(n, i[l]);
  return Di(() => {
    f(!0);
  }, r), W(t, s.createElement("div", {
    className: Ft,
    ref: r
  }, s.createElement("div", {
    className: `${Ft}-header`
  }, s.createElement(Md, {
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
    return s.createElement(Ar, {
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
}, My = pe(o7, {
  Tab: a7
}), s7 = (t) => {
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
}, l7 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, G1 = (t) => {
  const e = q(l7, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Bt("image-container")
  }, s.createElement(oo, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Bt("header")
  }, s.createElement(wi, null, e.header)), !!e.title && s.createElement("div", {
    className: Bt("title")
  }, e.title), s.createElement("div", {
    className: Bt("content")
  }, typeof e.content == "string" ? s.createElement(wi, null, e.content) : e.content), s.createElement(Ul, {
    direction: "vertical",
    block: !0,
    className: j(Bt("footer"), e.actions.length === 0 && Bt("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(s7, {
    key: r.key,
    action: r,
    onAction: () => Re(void 0, void 0, void 0, function* () {
      var a, o, l;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = e.onAction) === null || o === void 0 ? void 0 : o.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(Kd, {
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
const Ls = /* @__PURE__ */ new Set();
function Kl(t) {
  const e = Bn(s.createElement(G1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Ls.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Ls.add(e.close), e;
}
function c7(t) {
  const e = {
    confirmText: Fi().locale.Modal.ok
  }, n = q(e, t);
  return new Promise((r) => {
    Kl(Object.assign(Object.assign({}, n), {
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
const u7 = {
  confirmText: "确认",
  cancelText: "取消"
};
function f7(t) {
  const {
    locale: e
  } = Fi(), n = q(u7, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Kl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Re(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Re(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function d7() {
  Ls.forEach((t) => {
    t();
  });
}
const Ay = pe(G1, {
  show: Kl,
  alert: c7,
  confirm: f7,
  clear: d7
}), or = "adm-nav-bar", Wu = s.createElement(vv, null), Ty = (t) => {
  const {
    navBar: e = {}
  } = fe(), n = q(e, t), {
    back: r,
    backIcon: i,
    backArrow: a
  } = n, o = e.backIcon || Wu, l = gn(Wu, e.backIcon, a === !0 ? o : a, i === !0 ? o : i);
  return W(n, s.createElement("div", {
    className: j(or)
  }, s.createElement("div", {
    className: `${or}-left`,
    role: "button"
  }, r !== null && s.createElement("div", {
    className: `${or}-back`,
    onClick: n.onBack
  }, l && s.createElement("span", {
    className: `${or}-back-arrow`
  }, l), s.createElement("span", {
    "aria-hidden": "true"
  }, r)), n.left), s.createElement("div", {
    className: `${or}-title`
  }, n.children), s.createElement("div", {
    className: `${or}-right`
  }, n.right)));
}, lt = "adm-notice-bar", m7 = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: s.createElement(Ev, null),
  wrap: !1,
  shape: "rectangular",
  bordered: "block"
}, Iy = ze((t) => {
  const {
    noticeBar: e = {}
  } = fe(), n = q(m7, e, t), r = gn(s.createElement(ro, {
    className: `${lt}-close-icon`
  }), e.closeIcon, t.closeIcon), i = V(null), a = V(null), [o, l] = Y(!0), c = n.speed, u = V(!0), f = V(!1);
  function d() {
    if (u.current || n.wrap)
      return;
    const m = i.current, b = a.current;
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
  return _h(() => {
    u.current = !1, d();
  }, n.delay), Di(() => {
    d();
  }, i), xl(() => {
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
function h7(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const Se = "adm-number-keyboard", v7 = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Ly = (t) => {
  const e = q(v7, t), {
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
  } = fe(), d = V(null), m = ce(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = l ? h7(w) : w, k = Array.isArray(o) ? o : [o];
    return x.push("0"), a ? (k.length === 2 && x.splice(9, 0, k.pop()), x.push(k[0] || "")) : (x.splice(9, 0, k[0] || ""), x.push(k[1] || "BACKSPACE")), x;
  }, [o, a, l, l && n]), b = V(-1), g = V(-1), y = Yt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), v = () => {
    b.current = window.setTimeout(() => {
      y(), g.current = window.setInterval(y, 150);
    }, 700);
  }, h = () => {
    clearTimeout(b.current), clearInterval(g.current);
  }, C = (w, x) => {
    var k, N;
    switch (w.preventDefault(), x) {
      case "BACKSPACE":
        y == null || y();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && ((N = e.onClose) === null || N === void 0 || N.call(e));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, p = () => !c && !r ? null : s.createElement("div", {
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
  }, s.createElement(Qf, null))), E = (w, x) => {
    const k = /^\d$/.test(w), N = j(`${Se}-key`, {
      [`${Se}-key-number`]: k,
      [`${Se}-key-sign`]: !k && w,
      [`${Se}-key-mid`]: x === 9 && !!a && m.length < 12
    }), M = w ? {
      role: "button",
      title: w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: N,
      onTouchStart: () => {
        h(), w === "BACKSPACE" && v();
      },
      onTouchEnd: (_) => {
        C(_, w), w === "BACKSPACE" && h();
      }
    }, M), w === "BACKSPACE" ? s.createElement(Ac, null) : w);
  };
  return s.createElement(Ir, {
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
  }, p(), s.createElement("div", {
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
  }, s.createElement(Ac, null)), s.createElement("div", {
    className: `${Se}-key ${Se}-key-extra ${Se}-key-ok`,
    onTouchEnd: (w) => C(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), e.safeArea && s.createElement("div", {
    className: `${Se}-footer`
  }, s.createElement(Lr, {
    position: "bottom"
  })))));
}, Qr = "adm-page-indicator", p7 = {
  color: "primary",
  direction: "horizontal"
}, g7 = ze((t) => {
  const e = q(p7, t), n = [];
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
}), Nt = "adm-passcode-input", Zu = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, Dy = Ee((t, e) => {
  const n = q(Zu, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Zu.length, {
    locale: i
  } = fe(), [a, o] = Y(!1), [l, c] = ue(n), u = V(null), f = V(null);
  Q(() => {
    var y;
    l.length >= r && ((y = n.onFill) === null || y === void 0 || y.call(n, l));
  }, [l, r]);
  const d = () => {
    var y, v;
    n.keyboard || (y = f.current) === null || y === void 0 || y.focus(), o(!0), (v = n.onFocus) === null || v === void 0 || v.call(n);
  };
  Q(() => {
    if (!a)
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
  }, [a]);
  const m = () => {
    var y;
    o(!1), (y = n.onBlur) === null || y === void 0 || y.call(n);
  };
  xe(e, () => ({
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
    const y = [], v = l.split(""), h = v.length, C = Ne(v.length, 0, r - 1);
    for (let p = 0; p < r; p++)
      y.push(s.createElement("div", {
        className: j(`${Nt}-cell`, {
          [`${Nt}-cell-caret`]: n.caret && h === p && a,
          [`${Nt}-cell-focused`]: C === p && a,
          [`${Nt}-cell-dot`]: !n.plain && v[p]
        }),
        key: p
      }, v[p] && n.plain ? v[p] : ""));
    return y;
  }, g = j(Nt, {
    [`${Nt}-focused`]: a,
    [`${Nt}-error`]: n.error,
    [`${Nt}-seperated`]: n.seperated
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
    className: `${Nt}-cell-container`
  }, b()), s.createElement("input", {
    ref: f,
    className: `${Nt}-native-input`,
    value: l,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
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
}), Jr = "adm-progress-bar", y7 = {
  percent: 0,
  rounded: !0,
  text: !1
}, Vy = (t) => {
  const e = q(y7, t), n = {
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
}, sr = "adm-progress-circle", jy = (t) => {
  const e = q({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, s.createElement("div", {
    className: `${sr}`,
    style: n
  }, s.createElement("div", {
    className: `${sr}-content`
  }, s.createElement("svg", {
    className: `${sr}-svg`
  }, s.createElement("circle", {
    className: `${sr}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${sr}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${sr}-info`
  }, e.children))));
}, b7 = (t) => new Promise((e) => setTimeout(e, t)), oa = "adm-pull-to-refresh", E7 = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, By = (t) => {
  var e, n;
  const {
    locale: r
  } = fe(), i = q(E7, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), a = (e = i.headHeight) !== null && e !== void 0 ? e : Ln(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Ln(60), [l, c] = Y("pulling"), [u, f] = Le(() => ({
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
    return Re(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (v) {
        throw b(), v;
      }
      i.completeDelay > 0 && (yield b7(i.completeDelay)), b();
    });
  }
  Dt((v) => {
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
      let k = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const w = v.event.target;
      if (!w || !(w instanceof Element))
        return;
      let x = ka(w);
      for (; ; ) {
        if (!x || k(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = ka(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    h.cancelable && h.preventDefault(), h.stopPropagation();
    const E = Math.max(xi(p, 0, 0, a * 5, 0.5), 0);
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
  return s.createElement(Ce.div, {
    ref: d,
    className: oa
  }, s.createElement(Ce.div, {
    style: u,
    className: `${oa}-head`
  }, s.createElement("div", {
    className: `${oa}-head-content`,
    style: {
      height: a
    }
  }, y())), s.createElement("div", {
    className: `${oa}-content`
  }, i.children));
}, X1 = Hs(null), w7 = {
  disabled: !1,
  defaultValue: null
}, C7 = (t) => {
  const e = q(w7, t), [n, r] = ue({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = e.onChange) === null || a === void 0 || a.call(e, i));
    }
  });
  return s.createElement(
    X1.Provider,
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
}, xn = "adm-radio", x7 = {
  defaultChecked: !1
}, k7 = (t) => {
  const e = q(x7, t), n = it(X1);
  let [r, i] = ue({
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
  }, r && s.createElement(Gd, null));
  return W(e, s.createElement("label", {
    onClick: e.onClick,
    className: j(xn, {
      [`${xn}-checked`]: r,
      [`${xn}-disabled`]: a,
      [`${xn}-block`]: e.block
    })
  }, s.createElement(Xd, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${xn}-content`
  }, e.children)));
}, Wy = pe(k7, {
  Group: C7
}), $7 = () => s.createElement("svg", {
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
})), kn = "adm-rate", _7 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement($7, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, Zy = (t) => {
  const e = q(_7, t), [n, r] = ue(e), i = V(null), a = Array(e.count).fill(null);
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
    const m = d.getBoundingClientRect(), b = (u - m.left) / m.width * e.count, g = e.allowHalf ? Math.ceil(b * 2) / 2 : Math.ceil(b), y = Ne(g, 0, e.count);
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
}, Q1 = (t) => {
  const {
    result: e = {}
  } = fe(), {
    successIcon: n = s.createElement(uv, null),
    errorIcon: r = s.createElement(ml, null),
    infoIcon: i = s.createElement(hv, null),
    waitingIcon: a = s.createElement(fv, null),
    warningIcon: o = s.createElement(mv, null)
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
}, ei = "adm-result", S7 = {
  status: "info"
}, Hy = (t) => {
  const e = q(S7, t), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = e, o = Q1(n);
  return n ? W(e, s.createElement("div", {
    className: j(ei, `${ei}-${n}`)
  }, s.createElement("div", {
    className: `${ei}-icon`
  }, a || o), s.createElement("div", {
    className: `${ei}-title`
  }, r), !!i && s.createElement("div", {
    className: `${ei}-description`
  }, i))) : null;
}, Ve = "adm-result-page", O7 = {
  status: "info",
  details: []
}, F7 = (t) => {
  const e = q(O7, t), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = Q1(n), [m, b] = Y(!0), g = ln(c), y = ln(l);
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
  }, (m ? a.slice(0, 3) : a).map((v, h) => s.createElement("div", {
    className: j(`${Ve}-detail`, v.bold && `${Ve}-detail-bold`),
    key: h
  }, s.createElement("span", null, v.label), s.createElement("span", null, v.value))), a.length > 3 && s.createElement("div", {
    onClick: () => b((v) => !v)
  }, s.createElement("div", {
    className: j(`${Ve}-collapse`, !m && `${Ve}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ve}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ve}-bg`
  }))), s.createElement("div", {
    className: `${Ve}-content`
  }, e.children), (y || g) && s.createElement("div", {
    className: `${Ve}-footer`
  }, g && s.createElement(qt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ve}-footer-btn`
  }, c), y && g && s.createElement("div", {
    className: `${Ve}-footer-space`
  }), y && s.createElement(qt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ve}-footer-btn`
  }, l))));
}, N7 = "adm-result-page-card", P7 = (t) => W(t, s.createElement("div", {
  className: j(`${N7}`)
}, t.children)), zy = pe(F7, {
  Card: P7
}), rn = "adm-search-bar", R7 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0
}, qy = Ee((t, e) => {
  const {
    locale: n,
    searchBar: r = {}
  } = fe(), i = q(R7, r, {
    cancelText: n.common.cancel
  }, t), a = gn(s.createElement(bv, null), r.searchIcon, t.icon, t.searchIcon), [o, l] = ue(i), [c, u] = Y(!1), f = V(null), d = V(!1);
  xe(e, () => ({
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
    return typeof i.showCancelButton == "function" ? b = i.showCancelButton(c, o) : b = i.showCancelButton && c, b && s.createElement("div", {
      className: `${rn}-suffix`
    }, s.createElement(qt, {
      fill: "none",
      className: `${rn}-cancel-button`,
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
    className: j(rn, {
      [`${rn}-active`]: c
    })
  }, s.createElement("div", {
    className: `${rn}-input-box`
  }, a && s.createElement("div", {
    className: `${rn}-input-box-icon`
  }, a), s.createElement(Y1, {
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
      d.current || ((b = f.current) === null || b === void 0 || b.blur(), (g = i.onSearch) === null || g === void 0 || g.call(i, o));
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
});
function M7(t, e) {
  var n = X({}, t);
  return Array.isArray(e) && e.forEach(function(r) {
    delete n[r];
  }), n;
}
function A7(t) {
  return t instanceof HTMLElement || t instanceof SVGElement;
}
function T7(t) {
  return A7(t) ? t : t instanceof s.Component ? w0.findDOMNode(t) : null;
}
var I7 = /* @__PURE__ */ T.createContext({}), L7 = /* @__PURE__ */ function(t) {
  Rl(n, t);
  var e = Ml(n);
  function n() {
    return Un(this, n), e.apply(this, arguments);
  }
  return Kn(n, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), n;
}(T.Component), Nn = "none", sa = "appear", la = "enter", ca = "leave", Hu = "none", wt = "prepare", dr = "start", mr = "active", Yl = "end", J1 = "prepared";
function zu(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit".concat(t)] = "webkit".concat(e), n["Moz".concat(t)] = "moz".concat(e), n["ms".concat(t)] = "MS".concat(e), n["O".concat(t)] = "o".concat(e.toLowerCase()), n;
}
function D7(t, e) {
  var n = {
    animationend: zu("Animation", "AnimationEnd"),
    transitionend: zu("Transition", "TransitionEnd")
  };
  return t && ("AnimationEvent" in e || delete n.animationend.animation, "TransitionEvent" in e || delete n.transitionend.transition), n;
}
var V7 = D7(lo(), typeof window < "u" ? window : {}), e0 = {};
if (lo()) {
  var j7 = document.createElement("div");
  e0 = j7.style;
}
var ua = {};
function t0(t) {
  if (ua[t])
    return ua[t];
  var e = V7[t];
  if (e)
    for (var n = Object.keys(e), r = n.length, i = 0; i < r; i += 1) {
      var a = n[i];
      if (Object.prototype.hasOwnProperty.call(e, a) && a in e0)
        return ua[t] = e[a], ua[t];
    }
  return "";
}
var n0 = t0("animationend"), r0 = t0("transitionend"), i0 = !!(n0 && r0), qu = n0 || "animationend", Uu = r0 || "transitionend";
function Ku(t, e) {
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
const B7 = function(t) {
  var e = V(), n = V(t);
  n.current = t;
  var r = T.useCallback(function(o) {
    n.current(o);
  }, []);
  function i(o) {
    o && (o.removeEventListener(Uu, r), o.removeEventListener(qu, r));
  }
  function a(o) {
    e.current && e.current !== o && i(e.current), o && o !== e.current && (o.addEventListener(Uu, r), o.addEventListener(qu, r), e.current = o);
  }
  return T.useEffect(function() {
    return function() {
      i(e.current);
    };
  }, []), [a, i];
};
var a0 = lo() ? Za : Q, o0 = function(e) {
  return +setTimeout(e, 16);
}, s0 = function(e) {
  return clearTimeout(e);
};
typeof window < "u" && "requestAnimationFrame" in window && (o0 = function(e) {
  return window.requestAnimationFrame(e);
}, s0 = function(e) {
  return window.cancelAnimationFrame(e);
});
var Yu = 0, Gl = /* @__PURE__ */ new Map();
function l0(t) {
  Gl.delete(t);
}
var Ds = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Yu += 1;
  var r = Yu;
  function i(a) {
    if (a === 0)
      l0(r), e();
    else {
      var o = o0(function() {
        i(a - 1);
      });
      Gl.set(r, o);
    }
  }
  return i(n), r;
};
Ds.cancel = function(t) {
  var e = Gl.get(t);
  return l0(t), s0(e);
};
const W7 = function() {
  var t = T.useRef(null);
  function e() {
    Ds.cancel(t.current);
  }
  function n(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    e();
    var a = Ds(function() {
      i <= 1 ? r({
        isCanceled: function() {
          return a !== t.current;
        }
      }) : n(r, i - 1);
    });
    t.current = a;
  }
  return T.useEffect(function() {
    return function() {
      e();
    };
  }, []), [n, e];
};
var Z7 = [wt, dr, mr, Yl], H7 = [wt, J1], c0 = !1, z7 = !0;
function u0(t) {
  return t === mr || t === Yl;
}
const q7 = function(t, e, n) {
  var r = pr(Hu), i = Fe(r, 2), a = i[0], o = i[1], l = W7(), c = Fe(l, 2), u = c[0], f = c[1];
  function d() {
    o(wt, !0);
  }
  var m = e ? H7 : Z7;
  return a0(function() {
    if (a !== Hu && a !== Yl) {
      var b = m.indexOf(a), g = m[b + 1], y = n(a);
      y === c0 ? o(g, !0) : g && u(function(v) {
        function h() {
          v.isCanceled() || o(g, !0);
        }
        y === !0 ? h() : Promise.resolve(y).then(h);
      });
    }
  }, [t, a]), T.useEffect(function() {
    return function() {
      f();
    };
  }, []), [d, a];
};
function U7(t, e, n, r) {
  var i = r.motionEnter, a = i === void 0 ? !0 : i, o = r.motionAppear, l = o === void 0 ? !0 : o, c = r.motionLeave, u = c === void 0 ? !0 : c, f = r.motionDeadline, d = r.motionLeaveImmediately, m = r.onAppearPrepare, b = r.onEnterPrepare, g = r.onLeavePrepare, y = r.onAppearStart, v = r.onEnterStart, h = r.onLeaveStart, C = r.onAppearActive, p = r.onEnterActive, E = r.onLeaveActive, w = r.onAppearEnd, x = r.onEnterEnd, k = r.onLeaveEnd, N = r.onVisibleChanged, M = pr(), _ = Fe(M, 2), L = _[0], A = _[1], O = pr(Nn), $ = Fe(O, 2), P = $[0], S = $[1], F = pr(null), I = Fe(F, 2), R = I[0], D = I[1], B = V(!1), Z = V(null);
  function U() {
    return n();
  }
  var H = V(!1);
  function G() {
    S(Nn, !0), D(null, !0);
  }
  function ne(Ue) {
    var Be = U();
    if (!(Ue && !Ue.deadline && Ue.target !== Be)) {
      var We = H.current, _t;
      P === sa && We ? _t = w == null ? void 0 : w(Be, Ue) : P === la && We ? _t = x == null ? void 0 : x(Be, Ue) : P === ca && We && (_t = k == null ? void 0 : k(Be, Ue)), P !== Nn && We && _t !== !1 && G();
    }
  }
  var ie = B7(ne), he = Fe(ie, 1), K = he[0], ee = function(Be) {
    var We, _t, Vr;
    switch (Be) {
      case sa:
        return We = {}, de(We, wt, m), de(We, dr, y), de(We, mr, C), We;
      case la:
        return _t = {}, de(_t, wt, b), de(_t, dr, v), de(_t, mr, p), _t;
      case ca:
        return Vr = {}, de(Vr, wt, g), de(Vr, dr, h), de(Vr, mr, E), Vr;
      default:
        return {};
    }
  }, J = T.useMemo(function() {
    return ee(P);
  }, [P]), re = q7(P, !t, function(Ue) {
    if (Ue === wt) {
      var Be = J[wt];
      return Be ? Be(U()) : c0;
    }
    if (ke in J) {
      var We;
      D(((We = J[ke]) === null || We === void 0 ? void 0 : We.call(J, U(), null)) || null);
    }
    return ke === mr && (K(U()), f > 0 && (clearTimeout(Z.current), Z.current = setTimeout(function() {
      ne({
        deadline: !0
      });
    }, f))), ke === J1 && G(), z7;
  }), oe = Fe(re, 2), ve = oe[0], ke = oe[1], qe = u0(ke);
  H.current = qe, a0(function() {
    A(e);
    var Ue = B.current;
    B.current = !0;
    var Be;
    !Ue && e && l && (Be = sa), Ue && e && a && (Be = la), (Ue && !e && u || !Ue && d && !e && u) && (Be = ca);
    var We = ee(Be);
    Be && (t || We[wt]) ? (S(Be), ve()) : S(Nn);
  }, [e]), Q(function() {
    // Cancel appear
    (P === sa && !l || // Cancel enter
    P === la && !a || // Cancel leave
    P === ca && !u) && S(Nn);
  }, [l, a, u]), Q(function() {
    return function() {
      B.current = !1, clearTimeout(Z.current);
    };
  }, []);
  var De = T.useRef(!1);
  Q(function() {
    L && (De.current = !0), L !== void 0 && P === Nn && ((De.current || L) && (N == null || N(L)), De.current = !0);
  }, [L, P]);
  var Vt = R;
  return J[wt] && ke === dr && (Vt = X({
    transition: "none"
  }, Vt)), [P, ke, Vt, L ?? e];
}
function K7(t) {
  var e = t;
  _e(t) === "object" && (e = t.transitionSupport);
  function n(i, a) {
    return !!(i.motionName && e && a !== !1);
  }
  var r = /* @__PURE__ */ T.forwardRef(function(i, a) {
    var o = i.visible, l = o === void 0 ? !0 : o, c = i.removeOnLeave, u = c === void 0 ? !0 : c, f = i.forceRender, d = i.children, m = i.motionName, b = i.leavedClassName, g = i.eventProps, y = T.useContext(I7), v = y.motion, h = n(i, v), C = V(), p = V();
    function E() {
      try {
        return C.current instanceof HTMLElement ? C.current : T7(p.current);
      } catch {
        return null;
      }
    }
    var w = U7(h, l, E, i), x = Fe(w, 4), k = x[0], N = x[1], M = x[2], _ = x[3], L = T.useRef(_);
    _ && (L.current = !0);
    var A = T.useCallback(function(D) {
      C.current = D, kd(a, D);
    }, [a]), O, $ = X(X({}, g), {}, {
      visible: l
    });
    if (!d)
      O = null;
    else if (k === Nn)
      _ ? O = d(X({}, $), A) : !u && L.current && b ? O = d(X(X({}, $), {}, {
        className: b
      }), A) : f || !u && !b ? O = d(X(X({}, $), {}, {
        style: {
          display: "none"
        }
      }), A) : O = null;
    else {
      var P, S;
      N === wt ? S = "prepare" : u0(N) ? S = "active" : N === dr && (S = "start");
      var F = Ku(m, "".concat(k, "-").concat(S));
      O = d(X(X({}, $), {}, {
        className: j(Ku(m, k), (P = {}, de(P, F, F && S), de(P, m, typeof m == "string"), P)),
        style: M
      }), A);
    }
    if (/* @__PURE__ */ T.isValidElement(O) && ap(O)) {
      var I = O, R = I.ref;
      R || (O = /* @__PURE__ */ T.cloneElement(O, {
        ref: A
      }));
    }
    return /* @__PURE__ */ T.createElement(L7, {
      ref: p
    }, O);
  });
  return r.displayName = "CSSMotion", r;
}
const f0 = K7(i0);
var Vs = "add", js = "keep", Bs = "remove", Zo = "removed";
function Y7(t) {
  var e;
  return t && _e(t) === "object" && "key" in t ? e = t : e = {
    key: t
  }, X(X({}, e), {}, {
    key: String(e.key)
  });
}
function Ws() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return t.map(Y7);
}
function G7() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = [], r = 0, i = e.length, a = Ws(t), o = Ws(e);
  a.forEach(function(u) {
    for (var f = !1, d = r; d < i; d += 1) {
      var m = o[d];
      if (m.key === u.key) {
        r < d && (n = n.concat(o.slice(r, d).map(function(b) {
          return X(X({}, b), {}, {
            status: Vs
          });
        })), r = d), n.push(X(X({}, m), {}, {
          status: js
        })), r += 1, f = !0;
        break;
      }
    }
    f || n.push(X(X({}, u), {}, {
      status: Bs
    }));
  }), r < i && (n = n.concat(o.slice(r).map(function(u) {
    return X(X({}, u), {}, {
      status: Vs
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
      return d !== u || m !== Bs;
    }), n.forEach(function(f) {
      f.key === u && (f.status = js);
    });
  }), n;
}
var X7 = ["component", "children", "onVisibleChanged", "onAllRemoved"], Q7 = ["status"], J7 = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function e8(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : f0, n = /* @__PURE__ */ function(r) {
    Rl(a, r);
    var i = Ml(a);
    function a() {
      var o;
      Un(this, a);
      for (var l = arguments.length, c = new Array(l), u = 0; u < l; u++)
        c[u] = arguments[u];
      return o = i.call.apply(i, [this].concat(c)), de(Ta(o), "state", {
        keyEntities: []
      }), de(Ta(o), "removeKey", function(f) {
        var d = o.state.keyEntities, m = d.map(function(b) {
          return b.key !== f ? b : X(X({}, b), {}, {
            status: Zo
          });
        });
        return o.setState({
          keyEntities: m
        }), m.filter(function(b) {
          var g = b.status;
          return g !== Zo;
        }).length;
      }), o;
    }
    return Kn(a, [{
      key: "render",
      value: function() {
        var l = this, c = this.state.keyEntities, u = this.props, f = u.component, d = u.children, m = u.onVisibleChanged, b = u.onAllRemoved, g = kr(u, X7), y = f || T.Fragment, v = {};
        return J7.forEach(function(h) {
          v[h] = g[h], delete g[h];
        }), delete g.keys, /* @__PURE__ */ T.createElement(y, g, c.map(function(h, C) {
          var p = h.status, E = kr(h, Q7), w = p === Vs || p === js;
          return /* @__PURE__ */ T.createElement(e, Wn({}, v, {
            key: E.key,
            visible: w,
            eventProps: E,
            onVisibleChanged: function(k) {
              if (m == null || m(k, {
                key: E.key
              }), !k) {
                var N = l.removeKey(E.key);
                N === 0 && b && b();
              }
            }
          }), function(x, k) {
            return d(X(X({}, x), {}, {
              index: C
            }), k);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(l, c) {
        var u = l.keys, f = c.keyEntities, d = Ws(u), m = G7(f, d);
        return {
          keyEntities: m.filter(function(b) {
            var g = f.find(function(y) {
              var v = y.key;
              return b.key === v;
            });
            return !(g && g.status === Zo && b.status === Bs);
          })
        };
      }
    }]), a;
  }(T.Component);
  return de(n, "defaultProps", {
    component: "div"
  }), n;
}
e8(i0);
var Gu = function(e) {
  return e ? {
    left: e.offsetLeft,
    right: e.parentElement.clientWidth - e.clientWidth - e.offsetLeft,
    width: e.clientWidth
  } : null;
}, lr = function(e) {
  return e !== void 0 ? "".concat(e, "px") : void 0;
};
function t8(t) {
  var e = t.prefixCls, n = t.containerRef, r = t.value, i = t.getValueIndex, a = t.motionName, o = t.onMotionStart, l = t.onMotionEnd, c = t.direction, u = T.useRef(null), f = T.useState(r), d = Fe(f, 2), m = d[0], b = d[1], g = function(O) {
    var $, P = i(O), S = ($ = n.current) === null || $ === void 0 ? void 0 : $.querySelectorAll(".".concat(e, "-item"))[P];
    return (S == null ? void 0 : S.offsetParent) && S;
  }, y = T.useState(null), v = Fe(y, 2), h = v[0], C = v[1], p = T.useState(null), E = Fe(p, 2), w = E[0], x = E[1];
  Ed(function() {
    if (m !== r) {
      var A = g(m), O = g(r), $ = Gu(A), P = Gu(O);
      b(r), C($), x(P), A && O ? o() : l();
    }
  }, [r]);
  var k = T.useMemo(function() {
    return lr(c === "rtl" ? -(h == null ? void 0 : h.right) : h == null ? void 0 : h.left);
  }, [c, h]), N = T.useMemo(function() {
    return lr(c === "rtl" ? -(w == null ? void 0 : w.right) : w == null ? void 0 : w.left);
  }, [c, w]), M = function() {
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
    C(null), x(null), l();
  };
  return !h || !w ? null : /* @__PURE__ */ T.createElement(f0, {
    visible: !0,
    motionName: a,
    motionAppear: !0,
    onAppearStart: M,
    onAppearActive: _,
    onVisibleChanged: L
  }, function(A, O) {
    var $ = A.className, P = A.style, S = X(X({}, P), {}, {
      "--thumb-start-left": k,
      "--thumb-start-width": lr(h == null ? void 0 : h.width),
      "--thumb-active-left": N,
      "--thumb-active-width": lr(w == null ? void 0 : w.width)
    }), F = {
      ref: $d(u, O),
      style: S,
      className: j("".concat(e, "-thumb"), $)
    };
    return /* @__PURE__ */ T.createElement("div", F);
  });
}
var n8 = ["prefixCls", "direction", "options", "disabled", "defaultValue", "value", "onChange", "className", "motionName"];
function r8(t) {
  if (typeof t.title < "u")
    return t.title;
  if (_e(t.label) !== "object") {
    var e;
    return (e = t.label) === null || e === void 0 ? void 0 : e.toString();
  }
}
function i8(t) {
  return t.map(function(e) {
    if (_e(e) === "object" && e !== null) {
      var n = r8(e);
      return X(X({}, e), {}, {
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
var a8 = function(e) {
  var n = e.prefixCls, r = e.className, i = e.disabled, a = e.checked, o = e.label, l = e.title, c = e.value, u = e.onChange, f = function(m) {
    i || u(m, c);
  };
  return /* @__PURE__ */ T.createElement("label", {
    className: j(r, de({}, "".concat(n, "-item-disabled"), i))
  }, /* @__PURE__ */ T.createElement("input", {
    className: "".concat(n, "-item-input"),
    type: "radio",
    disabled: i,
    checked: a,
    onChange: f
  }), /* @__PURE__ */ T.createElement("div", {
    className: "".concat(n, "-item-label"),
    title: l,
    role: "option",
    "aria-selected": a
  }, o));
}, o8 = /* @__PURE__ */ T.forwardRef(function(t, e) {
  var n, r, i = t.prefixCls, a = i === void 0 ? "rc-segmented" : i, o = t.direction, l = t.options, c = l === void 0 ? [] : l, u = t.disabled, f = t.defaultValue, d = t.value, m = t.onChange, b = t.className, g = b === void 0 ? "" : b, y = t.motionName, v = y === void 0 ? "thumb-motion" : y, h = kr(t, n8), C = T.useRef(null), p = T.useMemo(function() {
    return $d(C, e);
  }, [C, e]), E = T.useMemo(function() {
    return i8(c);
  }, [c]), w = wd((n = E[0]) === null || n === void 0 ? void 0 : n.value, {
    value: d,
    defaultValue: f
  }), x = Fe(w, 2), k = x[0], N = x[1], M = T.useState(!1), _ = Fe(M, 2), L = _[0], A = _[1], O = function(S, F) {
    u || (N(F), m == null || m(F));
  }, $ = M7(h, ["children"]);
  return /* @__PURE__ */ T.createElement("div", Wn({
    role: "listbox",
    "aria-label": "segmented control"
  }, $, {
    className: j(a, (r = {}, de(r, "".concat(a, "-rtl"), o === "rtl"), de(r, "".concat(a, "-disabled"), u), r), g),
    ref: p
  }), /* @__PURE__ */ T.createElement("div", {
    className: "".concat(a, "-group")
  }, /* @__PURE__ */ T.createElement(t8, {
    prefixCls: a,
    value: k,
    containerRef: C,
    motionName: "".concat(a, "-").concat(v),
    direction: o,
    getValueIndex: function(S) {
      return E.findIndex(function(F) {
        return F.value === S;
      });
    },
    onMotionStart: function() {
      A(!0);
    },
    onMotionEnd: function() {
      A(!1);
    }
  }), E.map(function(P) {
    return /* @__PURE__ */ T.createElement(a8, Wn({}, P, {
      key: P.value,
      prefixCls: a,
      className: j(P.className, "".concat(a, "-item"), de({}, "".concat(a, "-item-selected"), P.value === k && !L)),
      checked: P.value === k,
      onChange: O,
      disabled: !!u || !!P.disabled
    }));
  })));
}), s8 = o8;
function l8(t) {
  return typeof t == "object" && !!(t != null && t.icon);
}
const fa = "adm-segmented", Uy = T.forwardRef((t, e) => {
  const {
    prefixCls: n,
    className: r,
    block: i,
    options: a = []
  } = t, o = un(
    t,
    ["prefixCls", "className", "block", "options"]
  ), l = T.useMemo(() => a.map((c) => {
    if (l8(c)) {
      const {
        icon: u,
        label: f
      } = c, d = un(c, ["icon", "label"]);
      return Object.assign(Object.assign({}, d), {
        label: T.createElement(T.Fragment, null, T.createElement("span", {
          className: `${fa}-item-icon`
        }, u), f && T.createElement("span", null, f))
      });
    }
    return c;
  }), [a, fa]);
  return W(t, T.createElement(s8, Object.assign({}, o, {
    className: j(r, {
      [`${fa}-block`]: i
    }),
    options: l,
    ref: e,
    prefixCls: fa
  })));
}), c8 = ze(() => s.createElement("svg", {
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
})))))))), $n = "adm-selector", u8 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, Ky = (t) => {
  const e = q(u8, t), [n, r, , i] = Vi(e.fieldNames), [a, o] = ue({
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
  } = fe(), c = e.options.map((u) => {
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
            const b = f ? a.filter((g) => g !== u[r]) : [...a, u[r]];
            o(b);
          } else {
            const b = f ? [] : [u[r]];
            o(b);
          }
      },
      role: "option",
      "aria-selected": f && !e.multiple || f && e.multiple
    }, u[n], u.description && s.createElement("div", {
      className: `${$n}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${$n}-check-mark-wrapper`
    }, s.createElement(c8, null)));
  });
  return W(e, s.createElement("div", {
    className: $n,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(j1, {
    columns: e.columns
  }, c) : s.createElement(Ul, {
    wrap: !0
  }, c)));
}, Ho = ze((t) => W(t, s.createElement("svg", {
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
}))))), Ze = "adm-side-bar", f8 = () => null, d8 = (t) => {
  var e;
  let n = null;
  const r = [];
  yn(t.children, (c, u) => {
    if (!zn(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, a] = ue({
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
          key: b
        } = c;
        b == null || c.props.disabled || a(b.toString());
      },
      className: j(`${Ze}-item`, {
        [`${Ze}-item-active`]: f,
        [`${Ze}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(Ho, {
      className: `${Ze}-item-corner ${Ze}-item-corner-top`
    }), m && s.createElement(Ho, {
      className: `${Ze}-item-corner ${Ze}-item-corner-bottom`
    })), s.createElement(fs, {
      content: c.props.badge,
      className: `${Ze}-badge`
    }, s.createElement("div", {
      className: `${Ze}-item-title`
    }, f && s.createElement("div", {
      className: `${Ze}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: j(`${Ze}-extra-space`, l && `${Ze}-item-active-next-sibling`)
  }, l && s.createElement(Ho, {
    className: `${Ze}-item-corner ${Ze}-item-corner-top`
  }))));
}, Yy = pe(d8, {
  Item: f8
}), zo = "adm-slider", m8 = ({
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
      [`${zo}-tick`]: !0,
      [`${zo}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${zo}-ticks`
  }, o);
}, h8 = m8, qo = "adm-slider-mark", v8 = ({
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
      [`${qo}-text`]: !0,
      [`${qo}-text-active`]: f
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
    className: qo
  }, l);
}, p8 = v8;
function Zs() {
  return typeof BigInt == "function";
}
function d0(t) {
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
function Xl(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function oi(t) {
  var e = String(t);
  if (Xl(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && h0(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function m0(t) {
  var e = String(t);
  if (Xl(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(Zs() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(Zs() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(oi(e));
  }
  return mi(e).fullStr;
}
function h0(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var g8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Un(this, t), de(this, "origin", ""), de(this, "negative", void 0), de(this, "integer", void 0), de(this, "decimal", void 0), de(this, "decimalLen", void 0), de(this, "empty", void 0), de(this, "nan", void 0), d0(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (Xl(n) && (n = Number(n)), n = typeof n == "string" ? n : m0(n), h0(n)) {
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), l = n.alignDecimal(a), c = r(o, l).toString(), u = i(a), f = mi(c), d = f.negativeStr, m = f.trimStr, b = "".concat(d).concat(m.padStart(u + 1, "0"));
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
      return n ? this.isInvalidate() ? "" : mi("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), y8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Un(this, t), de(this, "origin", ""), de(this, "number", void 0), de(this, "empty", void 0), d0(e)) {
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
      return n ? this.isInvalidate() ? "" : m0(this.number) : this.origin;
    }
  }]), t;
}();
function Xe(t) {
  return Zs() ? new g8(t) : new y8(t);
}
function Ql(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = mi(t), a = i.negativeStr, o = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = Xe(t).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return Ql(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const b8 = (t) => W(t, s.createElement("svg", {
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
})))), Uo = "adm-slider", E8 = (t) => {
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
  } = fe(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = Y(!1), b = Dt((v) => {
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
    className: `${Uo}-thumb`
  }, a || s.createElement(b8, {
    className: `${Uo}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${Uo}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), g ? s.createElement(L1, {
    content: g(e),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, y) : y);
}, w8 = E8, ti = "adm-slider", C8 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, Gy = (t) => {
  var e;
  const n = q(C8, t), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: l,
    step: c,
    icon: u
  } = n;
  function f($) {
    return $.sort((P, S) => P - S);
  }
  function d($) {
    return n.range ? $ : [n.min, $];
  }
  function m($, P) {
    const S = Xe($), F = Ql(S.toString(), ".", P);
    return Xe(F).toNumber();
  }
  function b($) {
    const P = Math.max(g(c), g($[0]), g($[1]));
    return n.range ? $.map((S) => m(S, P)) : m($[1], P);
  }
  function g($) {
    return (`${$}`.split(".")[1] || "").length;
  }
  function y($) {
    var P;
    (P = n.onAfterChange) === null || P === void 0 || P.call(n, b($));
  }
  let v = n.value;
  n.range && typeof n.value == "number" && (v = [0, n.value]);
  const [h, C] = ue({
    value: v,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), p = f(d(h));
  function E($) {
    const P = f($), S = p;
    P[0] === S[0] && P[1] === S[1] || C(b(P));
  }
  const w = V(null), x = `${100 * (p[1] - p[0]) / (i - r)}%`, k = `${100 * (p[0] - r) / (i - r)}%`, N = ce(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort(($, P) => $ - P);
    if (l) {
      const $ = [];
      for (let P = Xe(r); P.lessEquals(Xe(i)); P = P.add(c))
        $.push(P.toNumber());
      return $;
    }
    return [];
  }, [o, l, c, r, i]);
  function M($) {
    const P = $ < r ? r : $ > i ? i : $;
    let S = r;
    if (N.length)
      S = Pl(N, P);
    else {
      const F = Math.round((P - r) / c), I = Xe(F).multi(c);
      S = Xe(r).add(I.toString()).toNumber();
    }
    return S;
  }
  const _ = V(0), L = ($) => {
    if (_.current > 0 || ($.stopPropagation(), a))
      return;
    const P = w.current;
    if (!P)
      return;
    const S = P.getBoundingClientRect().left, F = ($.clientX - S) / Math.ceil(P.offsetWidth) * (i - r) + r, I = M(F);
    let R;
    n.range ? Math.abs(I - p[0]) > Math.abs(I - p[1]) ? R = [p[0], I] : R = [I, p[1]] : R = [n.min, I], E(R), y(R);
  }, A = V(), O = ($) => s.createElement(w8, {
    key: $,
    value: p[$],
    min: r,
    max: i,
    disabled: a,
    trackRef: w,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (P, S, F) => {
      S && (_.current += 1, A.current = p);
      const I = M(P), R = A.current;
      if (!R)
        return;
      const D = [...R];
      D[$] = I, E(D), F && (y(D), window.setTimeout(() => {
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
      width: x,
      left: k
    }
  }), n.ticks && s.createElement(h8, {
    points: N,
    min: r,
    max: i,
    lowerBound: p[0],
    upperBound: p[1]
  }), n.range && O(0), O(1))), o && s.createElement(p8, {
    min: r,
    max: i,
    marks: o,
    lowerBound: p[0],
    upperBound: p[1]
  })));
}, cr = "adm-stepper", x8 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function k8(t, e) {
  const n = q(x8, t), {
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
    parser: g
  } = n, {
    locale: y
  } = fe();
  xe(e, () => ({
    focus: () => {
      var R;
      (R = A.current) === null || R === void 0 || R.focus();
    },
    blur: () => {
      var R;
      (R = A.current) === null || R === void 0 || R.blur();
    },
    get nativeElement() {
      var R, D;
      return (D = (R = A.current) === null || R === void 0 ? void 0 : R.nativeElement) !== null && D !== void 0 ? D : null;
    }
  }));
  const v = (R) => (d !== void 0 ? Ql(R.toString(), ".", d) : R).toString(), h = (R) => m ? R.toString() : R.toNumber(), C = (R) => {
    if (R === "")
      return null;
    if (g)
      return String(g(R));
    const D = Xe(R);
    return D.isInvalidate() ? null : D.toString();
  }, p = (R) => R === null ? "" : b ? b(R) : v(R), [E, w] = wd(r, {
    value: i,
    onChange: (R) => {
      a == null || a(R);
    }
  }), [x, k] = Y(() => p(E));
  function N(R) {
    if (R.isNaN())
      return;
    let D = R;
    if (u !== void 0) {
      const B = Xe(u);
      D.lessEquals(B) && (D = B);
    }
    if (c !== void 0) {
      const B = Xe(c);
      B.lessEquals(D) && (D = B);
    }
    d !== void 0 && (D = Xe(v(h(D)))), w(h(D));
  }
  const M = (R) => {
    k(R);
    const D = C(R);
    D === null ? n.allowEmpty ? w(null) : w(r) : N(Xe(D));
  }, [_, L] = Y(!1), A = s.useRef(null);
  function O(R) {
    L(R), R && k(E != null ? String(E) : "");
  }
  Q(() => {
    var R, D, B;
    _ && ((B = (D = (R = A.current) === null || R === void 0 ? void 0 : R.nativeElement) === null || D === void 0 ? void 0 : D.select) === null || B === void 0 || B.call(D));
  }, [_]), Q(() => {
    _ || k(p(E));
  }, [_, E, d]);
  const $ = (R) => {
    let D = Xe(l);
    R || (D = D.negate()), N(Xe(E ?? 0).add(D.toString()));
  }, P = () => {
    $(!1);
  }, S = () => {
    $(!0);
  }, F = () => o ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, I = () => o ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return W(n, s.createElement("div", {
    className: j(cr, {
      [`${cr}-active`]: _
    })
  }, s.createElement(qt, {
    className: `${cr}-minus`,
    onClick: P,
    disabled: F(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.decrease
  }, s.createElement(pv, null)), s.createElement("div", {
    className: `${cr}-middle`
  }, s.createElement(Y1, {
    ref: A,
    className: `${cr}-input`,
    onFocus: (R) => {
      var D;
      O(!0), (D = n.onFocus) === null || D === void 0 || D.call(n, R);
    },
    value: x,
    onChange: (R) => {
      o || M(R);
    },
    disabled: o,
    onBlur: (R) => {
      var D;
      O(!1), (D = n.onBlur) === null || D === void 0 || D.call(n, R);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(qt, {
    className: `${cr}-plus`,
    onClick: S,
    disabled: I(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.increase
  }, s.createElement(Gf, null))));
}
const Xy = Ee(k8), _n = "adm-step", $8 = (t) => {
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
}, Xu = "adm-steps", _8 = "adm-step", S8 = s.createElement("span", {
  className: `${_8}-icon-dot`
}), O8 = {
  current: 0,
  direction: "horizontal"
}, F8 = (t) => {
  const e = q(O8, t), {
    direction: n,
    current: r
  } = e, i = j(Xu, `${Xu}-${n}`);
  return W(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (a, o) => {
    var l;
    if (!s.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : S8;
    return s.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, Qy = pe(F8, {
  Step: $8
}), an = "adm-swipe-action", N8 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, Jy = Ee((t, e) => {
  const n = q(N8, t), r = V(null), i = V(null), a = V(null);
  function o(h) {
    const C = h.current;
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
  }, f] = Le(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = V(!1), m = V(null);
  function b() {
    var h;
    (h = m.current) === null || h === void 0 || h.call(m), d.current = !1;
  }
  const g = Dt((h) => {
    var C;
    if (m.current = h.cancel, !h.intentional || (h.down && (d.current = !0), !d.current))
      return;
    const [p] = h.offset;
    if (h.last) {
      const E = l(), w = c();
      let x = p + h.velocity[0] * h.direction[0] * 50;
      p > 0 ? x = Math.max(0, x) : p < 0 ? x = Math.min(0, x) : x = 0;
      const k = Pl([-w, 0, E], x);
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
  xe(e, () => ({
    show: (h = "right") => {
      var C;
      h === "right" ? f.start({
        x: -c()
      }) : h === "left" && f.start({
        x: l()
      }), (C = t.onActionsReveal) === null || C === void 0 || C.call(t, h);
    },
    close: y
  })), Q(() => {
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
    return s.createElement(qt, {
      key: h.key,
      className: `${an}-action-button`,
      style: {
        "--background-color": (p = P8[E]) !== null && p !== void 0 ? p : E
      },
      onClick: (w) => {
        var x, k;
        n.closeOnAction && y(), (x = h.onClick) === null || x === void 0 || x.call(h, w), (k = n.onAction) === null || k === void 0 || k.call(n, h, w);
      }
    }, h.text);
  }
  return W(n, s.createElement("div", Object.assign({
    className: an
  }, g(), {
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
  }, n.leftActions.map(v))), s.createElement("div", {
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
  }, n.rightActions.map(v))))));
}), P8 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, v0 = (t) => W(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function R8(t) {
  const [e, n] = Y(t), r = V(e);
  return Q(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function M8(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const l = t[o], c = e[o];
    typeof l == "function" && typeof c == "function" ? a[o] = function(...u) {
      l(...u), c(...u);
    } : a[o] = l || c;
  }), a;
}
const Pt = "adm-swiper", A8 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, T8 = {
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
let da;
const I8 = Ee(bl((t, e) => {
  const n = q(T8, t), {
    direction: r,
    total: i,
    children: a,
    indicator: o
  } = n, [l] = Y({}), c = V(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: g
  } = ce(() => {
    let v = 0, h, C;
    return typeof a == "function" ? h = a : C = s.Children.map(a, (p) => !s.isValidElement(p) || p.type !== v0 ? null : (v++, p)), {
      renderChildren: h,
      validChildren: C,
      count: v
    };
  }, [a]), y = i ?? b;
  return y === 0 || !m && !g ? null : () => {
    let v = n.loop;
    f * (y - 1) < 1 && (v = !1);
    const h = V(null);
    function C() {
      const K = h.current;
      return K ? (u ? K.offsetHeight : K.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [p, E, w] = Xm(n.defaultIndex), [x, k, N] = R8(!1);
    function M(K) {
      let ee = 0, J = y - 1;
      return n.stuckAtBoundary && (ee += d / f, J -= (1 - f - d) / f), Ne(K, ee, J);
    }
    const [{
      position: _
    }, L] = Le(() => ({
      position: M(p) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (N.current || !v)
          return;
        const K = _.get(), ee = 100 * y, J = Ko(K, ee);
        J !== K && L.start({
          position: J,
          immediate: !0
        });
      }
    }), [y]), A = V(null);
    function O() {
      var K;
      (K = A.current) === null || K === void 0 || K.call(A), N.current = !1;
    }
    const $ = Dt((K) => {
      if (A.current = K.cancel, !K.intentional || (K.first && !da && (da = l), da !== l))
        return;
      da = K.last ? void 0 : l;
      const ee = C();
      if (!ee)
        return;
      const J = u ? 1 : 0, re = K.offset[J], oe = K.direction[J], ve = K.velocity[J];
      if (k(!0), !K.last)
        L.start({
          position: re * 100 / ee,
          immediate: !0
        });
      else {
        const ke = Math.floor(re / ee), qe = ke + 1, De = Math.round((re + ve * 2e3 * oe) / ee);
        P(Ne(De, ke, qe)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([K, ee]) => [-K, -ee],
      from: () => {
        const K = C();
        return [_.get() / 100 * K, _.get() / 100 * K];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (v)
          return {};
        const K = C(), ee = M(0) * K, J = M(y - 1) * K;
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
    function P(K, ee = !1) {
      var J;
      const re = Math.round(K), oe = v ? Ko(re, y) : Ne(re, 0, y - 1);
      oe !== w() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, oe)), E(oe), L.start({
        position: (v ? re : M(re)) * 100,
        immediate: ee
      });
    }
    function S() {
      P(Math.round(_.get() / 100) + 1);
    }
    function F() {
      P(Math.round(_.get() / 100) - 1);
    }
    xe(e, () => ({
      swipeTo: P,
      swipeNext: S,
      swipePrev: F
    })), Ae(() => {
      const K = y - 1;
      p > K && P(K, !0);
    });
    const {
      autoplay: I,
      autoplayInterval: R
    } = n, D = () => {
      c.current = window.setTimeout(() => {
        I === "reverse" ? F() : S(), D();
      }, R);
    };
    Q(() => {
      if (!(!I || x))
        return D(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [I, R, x, y]);
    function B(K, ee) {
      let J = {};
      return v && (J = {
        [u ? "y" : "x"]: _.to((re) => {
          let oe = -re + K * 100;
          const ve = y * 100, ke = ve / 2;
          return oe = Ko(oe + ke, ve) - ke, `${oe}%`;
        }),
        [u ? "top" : "left"]: `-${K * 100}%`
      }), s.createElement(Ce.div, {
        className: j(`${Pt}-slide`, {
          [`${Pt}-slide-active`]: p === K
        }),
        style: J,
        key: K
      }, ee);
    }
    function Z() {
      if (g && i) {
        const ee = Math.max(p - 2, 0), J = Math.min(p + 2, i - 1), re = [];
        for (let oe = ee; oe <= J; oe += 1)
          re.push(B(oe, g(oe)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${Pt}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), re);
      }
      return s.Children.map(m, (K, ee) => B(ee, K));
    }
    function U() {
      return v ? s.createElement("div", {
        className: `${Pt}-track-inner`
      }, Z()) : s.createElement(Ce.div, {
        className: `${Pt}-track-inner`,
        style: {
          [u ? "y" : "x"]: _.to((K) => `${-K}%`)
        }
      }, Z());
    }
    const H = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, G = Object.assign({}, n.allowTouchMove ? $() : {}), ne = {};
    for (const K of n.stopPropagation) {
      const ee = A8[K];
      ne[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const ie = M8(G, ne);
    let he = null;
    return typeof o == "function" ? he = o(y, p) : o !== !1 && (he = s.createElement("div", {
      className: `${Pt}-indicator`
    }, s.createElement(g7, Object.assign({}, n.indicatorProps, {
      total: y,
      current: p,
      direction: r
    })))), W(n, s.createElement("div", {
      className: j(Pt, `${Pt}-${r}`),
      style: H
    }, s.createElement("div", Object.assign({
      ref: h,
      className: j(`${Pt}-track`, {
        [`${Pt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (K) => {
        N.current && K.stopPropagation(), O();
      }
    }, ie), U()), he));
  };
}));
function Ko(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const e9 = pe(I8, {
  Item: v0
}), L8 = ze((t) => W(t, s.createElement("svg", {
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
})))))))), Sn = "adm-switch", D8 = {
  defaultChecked: !1
}, t9 = (t) => {
  const e = q(D8, t), n = e.disabled || e.loading || !1, [r, i] = Y(!1), {
    locale: a
  } = fe(), [o, l] = ue({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Re(this, void 0, void 0, function* () {
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
      if (vd(f)) {
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
  }, (e.loading || r) && s.createElement(L8, {
    className: `${Sn}-spin-icon`
  })), s.createElement("div", {
    className: `${Sn}-inner`
  }, o ? e.checkedText : e.uncheckedText))));
}, V8 = () => null, Wt = "adm-tab-bar", j8 = {
  safeArea: !1
}, B8 = (t) => {
  var e;
  const n = q(j8, t);
  let r = null;
  const i = [];
  yn(n.children, (l, c) => {
    if (!zn(l))
      return;
    const u = l.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(l));
  });
  const [a, o] = ue({
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
      return f ? s.createElement(s.Fragment, null, s.createElement(fs, {
        content: l.props.badge,
        className: `${Wt}-icon-badge`
      }, f), d) : d ? s.createElement(fs, {
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
  })), n.safeArea && s.createElement(Lr, {
    position: "bottom"
  })));
}, n9 = pe(B8, {
  Item: V8
}), Qu = "adm-tag", W8 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, Z8 = {
  color: "default",
  fill: "solid",
  round: !1
}, r9 = (t) => {
  var e;
  const n = q(Z8, t), r = (e = W8[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(Qu, {
      [`${Qu}-round`]: n.round
    })
  }, n.children));
}, ni = "adm-text-area", p0 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, H8 = Ee((t, e) => {
  const n = q(p0, t), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, l] = ue(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = V(null), u = V("auto"), f = V(null), d = K1({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown,
    nativeInputRef: c,
    enterKeyHint: n.enterKeyHint
  });
  xe(e, () => ({
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
  })), Ae(() => {
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
  }, [o, r]);
  const m = V(!1);
  let b;
  const g = ya(o).length;
  typeof i == "function" ? b = i(g, a) : i && (b = s.createElement("div", {
    className: `${ni}-count`
  }, a === void 0 ? g : g + "/" + a));
  let y = n.rows;
  return typeof r == "object" && (r.maxRows && y > r.maxRows && (y = r.maxRows), r.minRows && y < r.minRows && (y = r.minRows)), W(n, s.createElement("div", {
    className: ni
  }, s.createElement("textarea", {
    ref: c,
    className: `${ni}-element`,
    rows: y,
    value: o,
    placeholder: n.placeholder,
    onChange: (v) => {
      let h = v.target.value;
      a && !m.current && (h = ya(h).slice(0, a).join("")), l(h);
    },
    id: n.id,
    onCompositionStart: (v) => {
      var h;
      m.current = !0, (h = n.onCompositionStart) === null || h === void 0 || h.call(n, v);
    },
    onCompositionEnd: (v) => {
      var h;
      if (m.current = !1, a) {
        const C = v.target.value;
        l(ya(C).slice(0, a).join(""));
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
    className: `${ni}-element ${ni}-element-hidden`,
    value: o,
    rows: y,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
H8.defaultProps = p0;
const Zt = "adm-toast", z8 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, q8 = (t) => {
  const e = q(z8, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = e, o = ce(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(Xf, {
          className: `${Zt}-icon-success`
        });
      case "fail":
        return s.createElement(ro, {
          className: `${Zt}-icon-fail`
        });
      case "loading":
        return s.createElement($l, {
          color: "white",
          className: `${Zt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = ce(() => {
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
let tt = null, Yo = null;
const Ea = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, U8 = (t) => s.createElement(q8, Object.assign({}, t));
function K8(t) {
  var e;
  const n = q(Ea, typeof t == "string" ? {
    content: t
  } : t), r = s.createElement(U8, Object.assign({}, n, {
    onClose: () => {
      tt = null;
    }
  }));
  return tt ? !((e = tt.isRendered) === null || e === void 0) && e.call(tt) ? tt.replace(r) : (tt.close(), tt = Bn(r)) : tt = Bn(r), Yo && window.clearTimeout(Yo), n.duration !== 0 && (Yo = window.setTimeout(() => {
    g0();
  }, n.duration)), tt;
}
function g0() {
  tt == null || tt.close(), tt = null;
}
function Y8(t) {
  t.duration !== void 0 && (Ea.duration = t.duration), t.position !== void 0 && (Ea.position = t.position), t.maskClickable !== void 0 && (Ea.maskClickable = t.maskClickable);
}
const G8 = {
  show: K8,
  clear: g0,
  config: Y8
}, i9 = G8;
function y0(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[e] ? i = Math.max(i, n(a[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const ma = "adm-tree-select", X8 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, Q8 = (t) => {
  const e = q(X8, t), [n, r, i] = Vi(e.fieldNames), [a, o] = ue({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = ce(() => {
    const b = y0(e.options, i), g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
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
    o(h), (g = e.onChange) === null || g === void 0 || g.call(e, h, {
      options: y
    });
  }, d = (b = [], g) => b.map((y) => {
    const v = y[r] === a[g];
    return s.createElement("div", {
      key: y[r],
      className: j(`${ma}-item`, {
        [`${ma}-item-active`]: v
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
        className: j(`${ma}-column`),
        style: {
          width: v
        }
      }, d(y === 0 ? e.options : (b = c.get(a[y - 1])) === null || b === void 0 ? void 0 : b[i], y));
      g.push(h);
    }
    return g;
  };
  return W(e, s.createElement("div", {
    className: ma
  }, m()));
}, ct = "adm-tree-select-multiple", J8 = (t) => {
  const e = q({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  Q(() => {
  }, []);
  const [n, r, i] = Vi(e.fieldNames), [a, o] = ue({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ue({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const N = [], M = (_) => {
      var L;
      _ && (!((L = _[i]) === null || L === void 0) && L.length ? _[i].forEach((A) => M(A)) : N.push(_[r]));
    };
    return M(k), N;
  }, [f, d, m] = ce(() => {
    const k = y0(e.options, i), N = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
    function _(L, A) {
      A.forEach((O) => {
        M.set(O[r], L), N.set(O[r], O), O[i] && _(O, O[i]);
      });
    }
    return _(void 0, e.options), [k, N, M];
  }, [e.options]), b = ce(() => {
    let k = [];
    return l.forEach((N) => {
      const M = d.get(N);
      k = k.concat(u(M));
    }), k;
  }, [l, d]), g = ce(() => {
    const k = /* @__PURE__ */ new Map(), N = (M) => {
      const _ = m.get(M);
      _ && (k.set(_[r], !0), N(_[r]));
    };
    return b.forEach((M) => {
      k.set(M, !0), N(M);
    }), k;
  }, [m, l]), y = (k) => {
    var N;
    let M = [...k], _ = [];
    const L = (O) => {
      O.forEach(($) => {
        var P;
        if (_.includes($))
          return;
        const S = m.get($);
        if (!S)
          return;
        const F = ((P = S[i]) === null || P === void 0 ? void 0 : P.map((I) => I[r])) || [];
        F.every((I) => M.includes(I)) && (M.push(S[r]), _ = _.concat(F));
      });
    };
    for (let O = 0; O < f; O++)
      L(M);
    M = M.filter((O) => !_.includes(O));
    const A = M.map((O) => d.get(O));
    c(M), (N = e.onChange) === null || N === void 0 || N.call(e, M, A);
  }, v = (k) => {
    var N;
    const M = [];
    let _ = k;
    for (; _; )
      M.unshift(_), _ = m.get(_[r]);
    const L = M.map((A) => A[r]);
    o(L), (N = e.onExpand) === null || N === void 0 || N.call(e, L, M);
  }, h = (k, N) => {
    var M;
    const _ = (M = e.selectAllText) === null || M === void 0 ? void 0 : M[N];
    if (!_)
      return;
    let L = [];
    k.forEach((O) => {
      L = L.concat(u(O));
    });
    const A = L.every((O) => b.includes(O));
    return s.createElement("div", {
      onClick: () => {
        y(A ? b.filter((O) => !L.includes(O)) : b.concat(L));
      },
      className: `${ct}-item`
    }, _);
  }, C = (k, N) => {
    var M;
    const _ = (M = e.selectAllText) === null || M === void 0 ? void 0 : M[N];
    if (!_)
      return;
    const L = k.map(($) => $[r]), A = L.every(($) => b.includes($)), O = A ? !1 : L.some(($) => b.includes($));
    return s.createElement("div", {
      onClick: () => {
        y(A ? b.filter(($) => !L.includes($)) : b.concat(L));
      },
      className: j(`${ct}-item`, `${ct}-item-leaf`)
    }, s.createElement(fu, {
      className: `${ct}-item-checkbox`,
      checked: A,
      indeterminate: O
    }), _);
  }, p = (k) => {
    const N = a.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        N || v(k);
      },
      className: j(`${ct}-item`, {
        [`${ct}-item-expand`]: N
      })
    }, k[n], !!g.get(k[r]) && s.createElement("div", {
      className: `${ct}-dot`
    }));
  }, E = (k) => {
    const N = b.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        y(N ? b.filter((M) => M !== k[r]) : [...b, k[r]]);
      },
      className: j(`${ct}-item`, `${ct}-item-leaf`)
    }, s.createElement(fu, {
      className: `${ct}-item-checkbox`,
      checked: N
    }), k[n]);
  }, w = (k = [], N) => k.length === 0 ? void 0 : f === N + 1 ? s.createElement(s.Fragment, null, C(k, N), k.map((_) => E(_))) : s.createElement(s.Fragment, null, h(k, N), k.map((_) => p(_))), x = () => {
    var k;
    const N = [];
    for (let M = 0; M < f; M++) {
      let _ = `${100 / f}%`;
      f === 2 && M === 0 && (_ = "33.33%"), f === 2 && M === 1 && (_ = "66.67%");
      const L = s.createElement("div", {
        key: M,
        className: j(`${ct}-column`),
        style: {
          width: _
        }
      }, w(M === 0 ? e.options : (k = d.get(a[M - 1])) === null || k === void 0 ? void 0 : k[i], M));
      N.push(L);
    }
    return N;
  };
  return W(e, s.createElement("div", {
    className: ct
  }, x()));
}, a9 = pe(Q8, {
  Multiple: J8
}), On = "adm-virtual-input", ey = {
  defaultValue: ""
}, o9 = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = fe(), i = q(ey, r, t), [a, o] = ue(i), l = V(null), c = V(null), [u, f] = Y(!1), d = gn(s.createElement(ml, null), r.clearIcon, t.clearIcon);
  function m() {
    const h = l.current;
    if (!h || document.activeElement !== h)
      return;
    const C = c.current;
    C && (C.scrollLeft = C.clientWidth);
  }
  Ae(() => {
    m();
  }, [a]), Q(() => {
    u && m();
  }, [u]), xe(e, () => ({
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
      o(a + h), (p = (C = y.props).onInput) === null || p === void 0 || p.call(C, h);
    },
    onDelete: () => {
      var h, C;
      o(a.slice(0, -1)), (C = (h = y.props).onDelete) === null || C === void 0 || C.call(h);
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
    className: j(On, {
      [`${On}-disabled`]: i.disabled
    }),
    tabIndex: i.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: b,
    onBlur: g,
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
      var C;
      h.stopPropagation(), o(""), (C = i.onClear) === null || C === void 0 || C.call(i);
    },
    role: "button",
    "aria-label": n.Input.clear
  }, d), [void 0, null, ""].includes(a) && s.createElement("div", {
    className: `${On}-placeholder`
  }, i.placeholder), v));
}), Ju = "adm-water-mark", ty = {
  fullPage: !0
}, s9 = (t) => {
  const e = q(ty, t), {
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
    fontColor: g = "rgba(0,0,0,.15)",
    fontSize: y = 14,
    fontFamily: v = "sans-serif"
  } = e, [h, C] = Y("");
  return Q(() => {
    const p = document.createElement("canvas"), E = window.devicePixelRatio, w = p.getContext("2d"), x = `${(r + a) * E}px`, k = `${(i + o) * E}px`, N = a * E, M = o * E;
    if (p.setAttribute("width", x), p.setAttribute("height", k), w) {
      if (c) {
        w.translate(N / 2, M / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = new Image();
        _.crossOrigin = "anonymous", _.referrerPolicy = "no-referrer", _.onload = () => {
          w.drawImage(_, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), C(p.toDataURL());
        }, _.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate(N / 2, M / 2), w.rotate(Math.PI / 180 * Number(l));
        const _ = Number(y) * E;
        w.font = `${m} normal ${b} ${_}px/${M}px ${v}`, w.fillStyle = g, Array.isArray(d) ? d.forEach((L, A) => w.fillText(L, 0, A * _)) : w.fillText(d, 0, 0), w.restore(), C(p.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, b, a, o, v, g, c, d, y]), W(e, s.createElement("div", {
    className: j(Ju, {
      [`${Ju}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: h === "" ? void 0 : `url('${h}')`
    }
  }));
}, Fn = "adm-footer", ny = {
  label: "",
  links: [],
  content: "",
  chips: []
}, l9 = (t) => {
  const e = q(ny, t), {
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
  }, s.createElement(vs, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${Fn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(vs, {
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
  ly as ActionSheet,
  wi as AutoCenter,
  cy as Avatar,
  fs as Badge,
  qt as Button,
  uy as Calendar,
  fy as CalendarPicker,
  bp as CalendarPickerView,
  dy as CapsuleTabs,
  my as Card,
  py as CascadePicker,
  gy as CascadePickerView,
  yy as Cascader,
  f4 as CascaderView,
  Kd as CenterPopup,
  cu as CheckList,
  fu as Checkbox,
  by as Collapse,
  oy as ConfigProvider,
  Ey as DatePicker,
  wy as DatePickerView,
  Cy as Dialog,
  vs as Divider,
  hd as DotLoading,
  xy as Dropdown,
  ky as Ellipsis,
  $y as Empty,
  _y as ErrorBlock,
  Sy as FloatingBubble,
  Oy as FloatingPanel,
  l9 as Footer,
  Fy as Form,
  j1 as Grid,
  oo as Image,
  Ny as ImageUploader,
  K6 as ImageViewer,
  Py as IndexBar,
  Ry as InfiniteScroll,
  Y1 as Input,
  My as JumboTabs,
  At as List,
  hd as Loading,
  Ai as Mask,
  Ay as Modal,
  Ty as NavBar,
  Iy as NoticeBar,
  Ly as NumberKeyboard,
  g7 as PageIndicator,
  Dy as PasscodeInput,
  Wd as Picker,
  Eo as PickerView,
  L1 as Popover,
  Ir as Popup,
  Vy as ProgressBar,
  jy as ProgressCircle,
  By as PullToRefresh,
  Wy as Radio,
  Zy as Rate,
  Hy as Result,
  zy as ResultPage,
  Lr as SafeArea,
  Md as ScrollMask,
  qy as SearchBar,
  Uy as Segmented,
  Ky as Selector,
  Yy as SideBar,
  Ji as Skeleton,
  Gy as Slider,
  Ul as Space,
  $l as SpinLoading,
  Xy as Stepper,
  Qy as Steps,
  Jy as SwipeAction,
  e9 as Swiper,
  t9 as Switch,
  n9 as TabBar,
  lu as Tabs,
  r9 as Tag,
  H8 as TextArea,
  i9 as Toast,
  a9 as TreeSelect,
  o9 as VirtualInput,
  s9 as WaterMark,
  cg as createErrorBlock,
  hy as reduceMotion,
  vy as restoreMotion,
  ay as setDefaultConfig,
  fe as useConfig
};
