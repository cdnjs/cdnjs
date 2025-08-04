import * as D from "react";
import s, { useContext as at, useRef as W, useMemo as me, useEffect as J, useState as X, useCallback as Qe, useLayoutEffect as Ja, forwardRef as Ee, useImperativeHandle as _e, memo as He, version as lm, isValidElement as bn, createContext as ll, cloneElement as cm } from "react";
import Fa, { unstable_batchedUpdates as Pf, createPortal as um } from "react-dom";
const Mr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
Mr && document.addEventListener("touchstart", () => {
}, !0);
var Ra = function() {
  return Ra = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, Ra.apply(this, arguments);
};
function dn(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Me(t, e, n, r) {
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
function fm(t, e) {
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
function dm(t) {
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
function cl(t, e, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = e.length, a; r < i; r++)
      (a || !(r in e)) && (a || (a = Array.prototype.slice.call(e, 0, r)), a[r] = e[r]);
  return t.concat(a || Array.prototype.slice.call(e));
}
const Je = "${label}不是一个有效的${type}", mm = {
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
    startAndEnd: "开始/结束",
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
}, hm = mm, Mf = {
  current: {
    locale: hm
  }
};
function I9(t) {
  Mf.current = t;
}
function Ai() {
  return Mf.current;
}
const Af = s.createContext(null), L9 = (t) => {
  const {
    children: e
  } = t, n = dn(t, ["children"]), r = fe();
  return s.createElement(Af.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function fe() {
  var t;
  return (t = at(Af)) !== null && t !== void 0 ? t : Ai();
}
function pe(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function $t(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Tf = { exports: {} };
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
})(Tf);
var vm = Tf.exports;
const Z = /* @__PURE__ */ $t(vm);
function H(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = Z(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
  for (const r in t)
    t.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = t[r]);
  return s.cloneElement(e, n);
}
function G(...t) {
  const e = {};
  return t.forEach((n) => {
    n && Object.keys(n).forEach((r) => {
      n[r] !== void 0 && (e[r] = n[r]);
    });
  }), e;
}
function En(t, ...e) {
  for (let n = e.length - 1; n >= 0; n -= 1)
    if (e[n] !== void 0)
      return e[n];
  return t;
}
var If = function(t) {
  return function(e, n) {
    var r = W(!1);
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
}, Ar = function(t) {
  return typeof t == "function";
}, pm = function(t) {
  return typeof t == "number";
}, gm = !1;
const Ti = gm;
function Gt(t) {
  Ti && (Ar(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
  var e = W(t);
  e.current = me(function() {
    return t;
  }, [t]);
  var n = W();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return e.current.apply(this, r);
  }), n.current;
}
const ul = If(J);
function $c(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function eo(t) {
  var e = W(t);
  return e.current = t, e;
}
var ym = function(t) {
  Ti && (Ar(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = eo(t);
  J(function() {
    return function() {
      e.current();
    };
  }, []);
};
const Ii = ym;
function bm(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var fl = bm, Em = typeof ht == "object" && ht && ht.Object === Object && ht, wm = Em, Cm = wm, xm = typeof self == "object" && self && self.Object === Object && self, km = Cm || xm || Function("return this")(), Lf = km, _m = Lf, $m = function() {
  return _m.Date.now();
}, Sm = $m, Om = /\s/;
function Fm(t) {
  for (var e = t.length; e-- && Om.test(t.charAt(e)); )
    ;
  return e;
}
var Rm = Fm, Nm = Rm, Pm = /^\s+/;
function Mm(t) {
  return t && t.slice(0, Nm(t) + 1).replace(Pm, "");
}
var Am = Mm, Tm = Lf, Im = Tm.Symbol, Df = Im, Sc = Df, Vf = Object.prototype, Lm = Vf.hasOwnProperty, Dm = Vf.toString, Hr = Sc ? Sc.toStringTag : void 0;
function Vm(t) {
  var e = Lm.call(t, Hr), n = t[Hr];
  try {
    t[Hr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Dm.call(t);
  return r && (e ? t[Hr] = n : delete t[Hr]), i;
}
var jm = Vm, Bm = Object.prototype, Wm = Bm.toString;
function Zm(t) {
  return Wm.call(t);
}
var qm = Zm, Oc = Df, Hm = jm, Um = qm, zm = "[object Null]", Km = "[object Undefined]", Fc = Oc ? Oc.toStringTag : void 0;
function Ym(t) {
  return t == null ? t === void 0 ? Km : zm : Fc && Fc in Object(t) ? Hm(t) : Um(t);
}
var Gm = Ym;
function Xm(t) {
  return t != null && typeof t == "object";
}
var Qm = Xm, Jm = Gm, eh = Qm, th = "[object Symbol]";
function nh(t) {
  return typeof t == "symbol" || eh(t) && Jm(t) == th;
}
var rh = nh, ih = Am, Rc = fl, ah = rh, Nc = NaN, oh = /^[-+]0x[0-9a-f]+$/i, sh = /^0b[01]+$/i, lh = /^0o[0-7]+$/i, ch = parseInt;
function uh(t) {
  if (typeof t == "number")
    return t;
  if (ah(t))
    return Nc;
  if (Rc(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Rc(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = ih(t);
  var n = sh.test(t);
  return n || lh.test(t) ? ch(t.slice(2), n ? 2 : 8) : oh.test(t) ? Nc : +t;
}
var fh = uh, dh = fl, Lo = Sm, Pc = fh, mh = "Expected a function", hh = Math.max, vh = Math.min;
function ph(t, e, n) {
  var r, i, a, o, l, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(mh);
  e = Pc(e) || 0, dh(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? hh(Pc(n.maxWait) || 0, e) : a, m = "trailing" in n ? !!n.trailing : m);
  function p(C) {
    var k = r, F = i;
    return r = i = void 0, u = C, o = t.apply(F, k), o;
  }
  function b(C) {
    return u = C, l = setTimeout(h, e), f ? p(C) : o;
  }
  function y(C) {
    var k = C - c, F = C - u, M = e - k;
    return d ? vh(M, a - F) : M;
  }
  function g(C) {
    var k = C - c, F = C - u;
    return c === void 0 || k >= e || k < 0 || d && F >= a;
  }
  function h() {
    var C = Lo();
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
    return l === void 0 ? o : x(Lo());
  }
  function w() {
    var C = Lo(), k = g(C);
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
var jf = ph;
const gh = /* @__PURE__ */ $t(jf);
var yh = !!(typeof window < "u" && window.document && window.document.createElement);
const dl = yh;
var bh = jf, Eh = fl, wh = "Expected a function";
function Ch(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(wh);
  return Eh(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), bh(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var xh = Ch;
const kh = /* @__PURE__ */ $t(xh);
var _h = function(t) {
  Ti && (Ar(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), J(function() {
    t == null || t();
  }, []);
};
const $h = _h;
var Sh = function() {
  var t = It(X({}), 2), e = t[1];
  return Qe(function() {
    return e({});
  }, []);
};
const Bf = Sh;
function mn(t, e) {
  if (dl) {
    if (!t)
      return e;
    var n;
    return Ar(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var Oh = function(t) {
  return t.every(function(e) {
    var n = mn(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, Fh = function(t) {
  return t ? t.getRootNode() : document;
}, Rh = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return Oh(e) ? Fh(mn(e[0])) : document;
};
const Nh = Rh;
var Ph = function(t) {
  var e = function(n, r, i) {
    var a = W(!1), o = W([]), l = W([]), c = W();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return mn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = d, l.current = r, c.current = n();
        return;
      }
      (d.length !== o.current.length || !$c(d, o.current) || !$c(r, l.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, l.current = r, c.current = n());
    }), Ii(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return e;
};
const Wf = Ph;
var Mh = Wf(J);
const ml = Mh;
function Zf(t, e, n) {
  n === void 0 && (n = "click");
  var r = eo(t);
  ml(function() {
    var i = function(l) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = mn(u);
        return !f || f.contains(l.target);
      }) || r.current(l);
    }, a = Nh(e), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(l) {
      return a.addEventListener(l, i);
    }), function() {
      o.forEach(function(l) {
        return a.removeEventListener(l, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var qf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", l = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", p = "year", b = "date", y = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, h = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(P) {
      var R = ["th", "st", "nd", "rd"], T = P % 100;
      return "[" + P + (R[(T - 20) % 10] || R[T] || R[0]) + "]";
    } }, v = function(P, R, T) {
      var N = String(P);
      return !N || N.length >= R ? P : "" + Array(R + 1 - N.length).join(T) + P;
    }, E = { s: v, z: function(P) {
      var R = -P.utcOffset(), T = Math.abs(R), N = Math.floor(T / 60), $ = T % 60;
      return (R <= 0 ? "+" : "-") + v(N, 2, "0") + ":" + v($, 2, "0");
    }, m: function P(R, T) {
      if (R.date() < T.date())
        return -P(T, R);
      var N = 12 * (T.year() - R.year()) + (T.month() - R.month()), $ = R.clone().add(N, d), A = T - $ < 0, _ = R.clone().add(N + (A ? -1 : 1), d);
      return +(-(N + (T - $) / (A ? $ - _ : _ - $)) || 0);
    }, a: function(P) {
      return P < 0 ? Math.ceil(P) || 0 : Math.floor(P);
    }, p: function(P) {
      return { M: d, y: p, w: f, d: u, D: b, h: c, m: l, s: o, ms: a, Q: m }[P] || String(P || "").toLowerCase().replace(/s$/, "");
    }, u: function(P) {
      return P === void 0;
    } }, w = "en", C = {};
    C[w] = x;
    var k = function(P) {
      return P instanceof V;
    }, F = function P(R, T, N) {
      var $;
      if (!R)
        return w;
      if (typeof R == "string") {
        var A = R.toLowerCase();
        C[A] && ($ = A), T && (C[A] = T, $ = A);
        var _ = R.split("-");
        if (!$ && _.length > 1)
          return P(_[0]);
      } else {
        var O = R.name;
        C[O] = R, $ = O;
      }
      return !N && $ && (w = $), $ || !N && w;
    }, M = function(P, R) {
      if (k(P))
        return P.clone();
      var T = typeof R == "object" ? R : {};
      return T.date = P, T.args = arguments, new V(T);
    }, S = E;
    S.l = F, S.i = k, S.w = function(P, R) {
      return M(P, { locale: R.$L, utc: R.$u, x: R.$x, $offset: R.$offset });
    };
    var V = function() {
      function P(T) {
        this.$L = F(T.locale, null, !0), this.parse(T);
      }
      var R = P.prototype;
      return R.parse = function(T) {
        this.$d = function(N) {
          var $ = N.date, A = N.utc;
          if ($ === null)
            return /* @__PURE__ */ new Date(NaN);
          if (S.u($))
            return /* @__PURE__ */ new Date();
          if ($ instanceof Date)
            return new Date($);
          if (typeof $ == "string" && !/Z$/i.test($)) {
            var _ = $.match(g);
            if (_) {
              var O = _[2] - 1 || 0, L = (_[7] || "0").substring(0, 3);
              return A ? new Date(Date.UTC(_[1], O, _[3] || 1, _[4] || 0, _[5] || 0, _[6] || 0, L)) : new Date(_[1], O, _[3] || 1, _[4] || 0, _[5] || 0, _[6] || 0, L);
            }
          }
          return new Date($);
        }(T), this.$x = T.x || {}, this.init();
      }, R.init = function() {
        var T = this.$d;
        this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds();
      }, R.$utils = function() {
        return S;
      }, R.isValid = function() {
        return this.$d.toString() !== y;
      }, R.isSame = function(T, N) {
        var $ = M(T);
        return this.startOf(N) <= $ && $ <= this.endOf(N);
      }, R.isAfter = function(T, N) {
        return M(T) < this.startOf(N);
      }, R.isBefore = function(T, N) {
        return this.endOf(N) < M(T);
      }, R.$g = function(T, N, $) {
        return S.u(T) ? this[N] : this.set($, T);
      }, R.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, R.valueOf = function() {
        return this.$d.getTime();
      }, R.startOf = function(T, N) {
        var $ = this, A = !!S.u(N) || N, _ = S.p(T), O = function(oe, U) {
          var ee = S.w($.$u ? Date.UTC($.$y, U, oe) : new Date($.$y, U, oe), $);
          return A ? ee : ee.endOf(u);
        }, L = function(oe, U) {
          return S.w($.toDate()[oe].apply($.toDate("s"), (A ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), $);
        }, B = this.$W, j = this.$M, q = this.$D, K = "set" + (this.$u ? "UTC" : "");
        switch (_) {
          case p:
            return A ? O(1, 0) : O(31, 11);
          case d:
            return A ? O(1, j) : O(0, j + 1);
          case f:
            var z = this.$locale().weekStart || 0, ne = (B < z ? B + 7 : B) - z;
            return O(A ? q - ne : q + (6 - ne), j);
          case u:
          case b:
            return L(K + "Hours", 0);
          case c:
            return L(K + "Minutes", 1);
          case l:
            return L(K + "Seconds", 2);
          case o:
            return L(K + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, R.endOf = function(T) {
        return this.startOf(T, !1);
      }, R.$set = function(T, N) {
        var $, A = S.p(T), _ = "set" + (this.$u ? "UTC" : ""), O = ($ = {}, $[u] = _ + "Date", $[b] = _ + "Date", $[d] = _ + "Month", $[p] = _ + "FullYear", $[c] = _ + "Hours", $[l] = _ + "Minutes", $[o] = _ + "Seconds", $[a] = _ + "Milliseconds", $)[A], L = A === u ? this.$D + (N - this.$W) : N;
        if (A === d || A === p) {
          var B = this.clone().set(b, 1);
          B.$d[O](L), B.init(), this.$d = B.set(b, Math.min(this.$D, B.daysInMonth())).$d;
        } else
          O && this.$d[O](L);
        return this.init(), this;
      }, R.set = function(T, N) {
        return this.clone().$set(T, N);
      }, R.get = function(T) {
        return this[S.p(T)]();
      }, R.add = function(T, N) {
        var $, A = this;
        T = Number(T);
        var _ = S.p(N), O = function(j) {
          var q = M(A);
          return S.w(q.date(q.date() + Math.round(j * T)), A);
        };
        if (_ === d)
          return this.set(d, this.$M + T);
        if (_ === p)
          return this.set(p, this.$y + T);
        if (_ === u)
          return O(1);
        if (_ === f)
          return O(7);
        var L = ($ = {}, $[l] = r, $[c] = i, $[o] = n, $)[_] || 1, B = this.$d.getTime() + T * L;
        return S.w(B, this);
      }, R.subtract = function(T, N) {
        return this.add(-1 * T, N);
      }, R.format = function(T) {
        var N = this, $ = this.$locale();
        if (!this.isValid())
          return $.invalidDate || y;
        var A = T || "YYYY-MM-DDTHH:mm:ssZ", _ = S.z(this), O = this.$H, L = this.$m, B = this.$M, j = $.weekdays, q = $.months, K = $.meridiem, z = function(U, ee, te, re) {
          return U && (U[ee] || U(N, A)) || te[ee].slice(0, re);
        }, ne = function(U) {
          return S.s(O % 12 || 12, U, "0");
        }, oe = K || function(U, ee, te) {
          var re = U < 12 ? "AM" : "PM";
          return te ? re.toLowerCase() : re;
        };
        return A.replace(h, function(U, ee) {
          return ee || function(te) {
            switch (te) {
              case "YY":
                return String(N.$y).slice(-2);
              case "YYYY":
                return S.s(N.$y, 4, "0");
              case "M":
                return B + 1;
              case "MM":
                return S.s(B + 1, 2, "0");
              case "MMM":
                return z($.monthsShort, B, q, 3);
              case "MMMM":
                return z(q, B);
              case "D":
                return N.$D;
              case "DD":
                return S.s(N.$D, 2, "0");
              case "d":
                return String(N.$W);
              case "dd":
                return z($.weekdaysMin, N.$W, j, 2);
              case "ddd":
                return z($.weekdaysShort, N.$W, j, 3);
              case "dddd":
                return j[N.$W];
              case "H":
                return String(O);
              case "HH":
                return S.s(O, 2, "0");
              case "h":
                return ne(1);
              case "hh":
                return ne(2);
              case "a":
                return oe(O, L, !0);
              case "A":
                return oe(O, L, !1);
              case "m":
                return String(L);
              case "mm":
                return S.s(L, 2, "0");
              case "s":
                return String(N.$s);
              case "ss":
                return S.s(N.$s, 2, "0");
              case "SSS":
                return S.s(N.$ms, 3, "0");
              case "Z":
                return _;
            }
            return null;
          }(U) || _.replace(":", "");
        });
      }, R.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, R.diff = function(T, N, $) {
        var A, _ = this, O = S.p(N), L = M(T), B = (L.utcOffset() - this.utcOffset()) * r, j = this - L, q = function() {
          return S.m(_, L);
        };
        switch (O) {
          case p:
            A = q() / 12;
            break;
          case d:
            A = q();
            break;
          case m:
            A = q() / 3;
            break;
          case f:
            A = (j - B) / 6048e5;
            break;
          case u:
            A = (j - B) / 864e5;
            break;
          case c:
            A = j / i;
            break;
          case l:
            A = j / r;
            break;
          case o:
            A = j / n;
            break;
          default:
            A = j;
        }
        return $ ? A : S.a(A);
      }, R.daysInMonth = function() {
        return this.endOf(d).$D;
      }, R.$locale = function() {
        return C[this.$L];
      }, R.locale = function(T, N) {
        if (!T)
          return this.$L;
        var $ = this.clone(), A = F(T, N, !0);
        return A && ($.$L = A), $;
      }, R.clone = function() {
        return S.w(this.$d, this);
      }, R.toDate = function() {
        return new Date(this.valueOf());
      }, R.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, R.toISOString = function() {
        return this.$d.toISOString();
      }, R.toString = function() {
        return this.$d.toUTCString();
      }, P;
    }(), I = V.prototype;
    return M.prototype = I, [["$ms", a], ["$s", o], ["$m", l], ["$H", c], ["$W", u], ["$M", d], ["$y", p], ["$D", b]].forEach(function(P) {
      I[P[1]] = function(R) {
        return this.$g(R, P[0], P[1]);
      };
    }), M.extend = function(P, R) {
      return P.$i || (P(R, V, M), P.$i = !0), M;
    }, M.locale = F, M.isDayjs = k, M.unix = function(P) {
      return M(1e3 * P);
    }, M.en = C[w], M.Ls = C, M.p = {}, M;
  });
})(qf);
var Ah = qf.exports;
const se = /* @__PURE__ */ $t(Ah);
function Th(t, e) {
  var n;
  Ti && (Ar(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = eo(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = me(function() {
    return gh(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, cl([], It(o), !1));
    }, i, e);
  }, []);
  return Ii(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function Ih(t, e, n) {
  var r = It(X({}), 2), i = r[0], a = r[1], o = Th(function() {
    a({});
  }, n).run;
  J(function() {
    return o();
  }, e), ul(t, [i]);
}
function Lh(t) {
  var e = It(X(t), 2), n = e[0], r = e[1], i = W(n);
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
        var S = v.defaultView;
        S && (C && S.clearInterval(C), f(S, "resize", w, !0)), f(v, "scroll", w, !0), k && k.disconnect();
      });
      var F = this.root && (this.root.ownerDocument || this.root) || e;
      if (v != F) {
        var M = t(v);
        M && this._monitorIntersections(M.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(v) {
    var E = this._monitoringDocuments.indexOf(v);
    if (E != -1) {
      var w = this.root && (this.root.ownerDocument || this.root) || e, C = this._observationTargets.some(function(M) {
        var S = M.element.ownerDocument;
        if (S == v)
          return !0;
        for (; S && S != w; ) {
          var V = t(S);
          if (S = V && V.ownerDocument, S == v)
            return !0;
        }
        return !1;
      });
      if (!C) {
        var k = this._monitoringUnsubscribes[E];
        if (this._monitoringDocuments.splice(E, 1), this._monitoringUnsubscribes.splice(E, 1), k(), v != w) {
          var F = t(v);
          F && this._unmonitorIntersections(F.ownerDocument);
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
        var C = w.element, k = m(C), F = this._rootContainsTarget(C), M = w.entry, S = v && F && this._computeTargetAndRootIntersection(C, k, E), V = null;
        this._rootContainsTarget(C) ? (!r || this.root) && (V = E) : V = p();
        var I = w.entry = new a({
          time: l(),
          target: C,
          boundingClientRect: k,
          rootBounds: V,
          intersectionRect: S
        });
        M ? v && F ? this._hasCrossedThreshold(M, I) && this._queuedEntries.push(I) : M && M.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(v, E, w) {
    if (window.getComputedStyle(v).display != "none") {
      for (var C = E, k = h(v), F = !1; !F && k; ) {
        var M = null, S = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (S.display == "none")
          return null;
        if (k == this.root || k.nodeType == /* DOCUMENT */
        9)
          if (F = !0, k == this.root || k == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, M = null, C = null) : M = i : M = w;
          else {
            var V = h(k), I = V && m(V), P = V && this._computeTargetAndRootIntersection(V, I, w);
            I && P ? (k = V, M = y(I, P)) : (k = null, C = null);
          }
        else {
          var R = k.ownerDocument;
          k != R.body && k != R.documentElement && S.overflow != "visible" && (M = m(k));
        }
        if (M && (C = d(M, C)), !C)
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
        var F = this.thresholds[k];
        if (F == w || F == C || F < w != F < C)
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
    var w = Math.max(v.top, E.top), C = Math.min(v.bottom, E.bottom), k = Math.max(v.left, E.left), F = Math.min(v.right, E.right), M = F - k, S = C - w;
    return M >= 0 && S >= 0 && {
      top: w,
      bottom: C,
      left: k,
      right: F,
      width: M,
      height: S
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
function Dh(t, e) {
  var n = It(X(), 2), r = n[0], i = n[1], a = It(X(), 2), o = a[0], l = a[1];
  return ml(function() {
    var c = mn(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var p = dm(f), b = p.next(); !b.done; b = p.next()) {
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
      }, Ra(Ra({}, e), {
        root: mn(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, o];
}
var Vh = dl ? Ja : J;
const Ie = Vh;
function jh(t) {
  var e = this, n = W(!1);
  return Qe(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Me(e, void 0, void 0, function() {
      var a, o;
      return fm(this, function(l) {
        switch (l.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, l.label = 1;
          case 1:
            return l.trys.push([1, 3, , 4]), [4, t.apply(void 0, cl([], It(r), !1))];
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
function Bh(t) {
  var e = W(0), n = It(X(t), 2), r = n[0], i = n[1], a = Qe(function(o) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return Ii(function() {
    cancelAnimationFrame(e.current);
  }), [r, a];
}
var Wh = function() {
  var t = W(!1);
  return J(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const hl = Wh;
var Hf = function() {
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
}(), fs = typeof window < "u" && typeof document < "u" && window.document === document, Na = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), Zh = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(Na) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), qh = 2;
function Hh(t, e) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, t()), r && l();
  }
  function o() {
    Zh(a);
  }
  function l() {
    var c = Date.now();
    if (n) {
      if (c - i < qh)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, e);
    i = c;
  }
  return l;
}
var Uh = 20, zh = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], Kh = typeof MutationObserver < "u", Yh = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = Hh(this.refresh.bind(this), Uh);
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
      !fs || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), Kh ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !fs || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = zh.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), Uf = function(t, e) {
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
}, kr = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || Na;
}, zf = to(0, 0, 0, 0);
function Pa(t) {
  return parseFloat(t) || 0;
}
function Mc(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var a = t["border-" + i + "-width"];
    return r + Pa(a);
  }, 0);
}
function Gh(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var a = i[r], o = t["padding-" + a];
    n[a] = Pa(o);
  }
  return n;
}
function Xh(t) {
  var e = t.getBBox();
  return to(0, 0, e.width, e.height);
}
function Qh(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return zf;
  var r = kr(t).getComputedStyle(t), i = Gh(r), a = i.left + i.right, o = i.top + i.bottom, l = Pa(r.width), c = Pa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(l + a) !== e && (l -= Mc(r, "left", "right") + a), Math.round(c + o) !== n && (c -= Mc(r, "top", "bottom") + o)), !ev(t)) {
    var u = Math.round(l + a) - e, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (l -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return to(i.left, i.top, l, c);
}
var Jh = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof kr(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof kr(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function ev(t) {
  return t === kr(t).document.documentElement;
}
function tv(t) {
  return fs ? Jh(t) ? Xh(t) : Qh(t) : zf;
}
function nv(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return Uf(o, {
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
function to(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var rv = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = to(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = tv(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), iv = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = nv(n);
      Uf(this, { target: e, contentRect: r });
    }
    return t;
  }()
), av = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Hf(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof kr(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new rv(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof kr(e).Element))
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
          return new iv(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), Kf = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Hf(), Yf = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = Yh.getInstance(), r = new av(e, n, this);
      Kf.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  Yf.prototype[t] = function() {
    var e;
    return (e = Kf.get(this))[t].apply(e, arguments);
  };
});
var ov = function() {
  return typeof Na.ResizeObserver < "u" ? Na.ResizeObserver : Yf;
}(), sv = Wf(Ja);
const lv = sv;
var cv = dl ? lv : ml;
const uv = cv;
function ds(t) {
  var e = It(Bh(function() {
    var i = mn(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return uv(function() {
    var i = mn(t);
    if (i) {
      var a = new ov(function(o) {
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
function no(t, e) {
  var n;
  Ti && (Ar(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = eo(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = me(function() {
    return kh(function() {
      for (var o = [], l = 0; l < arguments.length; l++)
        o[l] = arguments[l];
      return r.current.apply(r, cl([], It(o), !1));
    }, i, e);
  }, []);
  return Ii(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var fv = function(t, e) {
  var n = Gt(t), r = W(null), i = Qe(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return J(function() {
    if (!(!pm(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const dv = fv, Ac = 10;
function mv(t, e) {
  return t > e && t > Ac ? "horizontal" : e > t && e > Ac ? "vertical" : "";
}
function hv() {
  const t = W(0), e = W(0), n = W(0), r = W(0), i = W(0), a = W(0), o = W(""), l = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const p = m.touches[0];
      n.current = p.clientX < 0 ? 0 : p.clientX - t.current, r.current = p.clientY - e.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = mv(i.current, a.current));
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
const vv = Mr ? window : void 0, pv = ["scroll", "auto", "overlay"];
function gv(t) {
  return t.nodeType === 1;
}
function Ma(t, e = vv) {
  let n = t;
  for (; n && n !== e && gv(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (pv.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Zn = !1;
if (Mr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Zn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let Ur = 0;
const Tc = "adm-overflow-hidden";
function yv(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function ro(t, e) {
  const n = hv(), r = (o) => {
    n.move(o);
    const l = n.deltaY.current > 0 ? "10" : "01", c = Ma(o.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const b = yv(o.target);
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
    d === 0 ? p = f >= u ? "00" : "01" : u <= Math.round(m + d) && (p = "10"), p !== "11" && n.isVertical() && !(parseInt(p, 2) & parseInt(l, 2)) && o.cancelable && Zn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Zn ? {
      passive: !1
    } : !1), Ur || document.body.classList.add(Tc), Ur++;
  }, a = () => {
    Ur && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Ur--, Ur || document.body.classList.remove(Tc));
  };
  J(() => {
    if (e)
      return i(), () => {
        a();
      };
  }, [e]);
}
let vl = Di();
const ie = (t) => Li(t, vl);
let pl = Di();
ie.write = (t) => Li(t, pl);
let io = Di();
ie.onStart = (t) => Li(t, io);
let gl = Di();
ie.onFrame = (t) => Li(t, gl);
let yl = Di();
ie.onFinish = (t) => Li(t, yl);
let br = [];
ie.setTimeout = (t, e) => {
  let n = ie.now() + e, r = () => {
    let a = br.findIndex((o) => o.cancel == r);
    ~a && br.splice(a, 1), cn -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return br.splice(Gf(n), 0, i), cn += 1, Xf(), i;
};
let Gf = (t) => ~(~br.findIndex((e) => e.time > t) || ~br.length);
ie.cancel = (t) => {
  io.delete(t), gl.delete(t), yl.delete(t), vl.delete(t), pl.delete(t);
};
ie.sync = (t) => {
  ms = !0, ie.batchedUpdates(t), ms = !1;
};
ie.throttle = (t) => {
  let e;
  function n() {
    try {
      t(...e);
    } finally {
      e = null;
    }
  }
  function r(...i) {
    e = i, ie.onStart(n);
  }
  return r.handler = t, r.cancel = () => {
    io.delete(n), e = null;
  }, r;
};
let bl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
ie.use = (t) => bl = t;
ie.now = typeof performance < "u" ? () => performance.now() : Date.now;
ie.batchedUpdates = (t) => t();
ie.catch = console.error;
ie.frameLoop = "always";
ie.advance = () => {
  ie.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Jf();
};
let ln = -1, cn = 0, ms = !1;
function Li(t, e) {
  ms ? (e.delete(t), t(0)) : (e.add(t), Xf());
}
function Xf() {
  ln < 0 && (ln = 0, ie.frameLoop !== "demand" && bl(Qf));
}
function bv() {
  ln = -1;
}
function Qf() {
  ~ln && (bl(Qf), ie.batchedUpdates(Jf));
}
function Jf() {
  let t = ln;
  ln = ie.now();
  let e = Gf(ln);
  if (e && (ed(br.splice(0, e), (n) => n.handler()), cn -= e), !cn) {
    bv();
    return;
  }
  io.flush(), vl.flush(t ? Math.min(64, ln - t) : 16.667), gl.flush(), pl.flush(), yl.flush();
}
function Di() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      cn += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return cn -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), cn -= e.size, ed(e, (r) => r(n) && t.add(r)), cn += t.size, e = t);
    }
  };
}
function ed(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      ie.catch(r);
    }
  });
}
function hs() {
}
const Ev = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), Y = {
  arr: Array.isArray,
  obj: (t) => !!t && t.constructor.name === "Object",
  fun: (t) => typeof t == "function",
  str: (t) => typeof t == "string",
  num: (t) => typeof t == "number",
  und: (t) => t === void 0
};
function Ht(t, e) {
  if (Y.arr(t)) {
    if (!Y.arr(e) || t.length !== e.length)
      return !1;
    for (let n = 0; n < t.length; n++)
      if (t[n] !== e[n])
        return !1;
    return !0;
  }
  return t === e;
}
const ce = (t, e) => t.forEach(e);
function Lt(t, e, n) {
  if (Y.arr(t)) {
    for (let r = 0; r < t.length; r++)
      e.call(n, t[r], `${r}`);
    return;
  }
  for (const r in t)
    t.hasOwnProperty(r) && e.call(n, t[r], r);
}
const rt = (t) => Y.und(t) ? [] : Y.arr(t) ? t : [t];
function fi(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), ce(n, e);
  }
}
const si = (t, ...e) => fi(t, (n) => n(...e)), El = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let wl, td, fn = null, nd = !1, Cl = hs;
const wv = (t) => {
  t.to && (td = t.to), t.now && (ie.now = t.now), t.colors !== void 0 && (fn = t.colors), t.skipAnimation != null && (nd = t.skipAnimation), t.createStringInterpolator && (wl = t.createStringInterpolator), t.requestAnimationFrame && ie.use(t.requestAnimationFrame), t.batchedUpdates && (ie.batchedUpdates = t.batchedUpdates), t.willAdvance && (Cl = t.willAdvance), t.frameLoop && (ie.frameLoop = t.frameLoop);
};
var pt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return wl;
  },
  get to() {
    return td;
  },
  get colors() {
    return fn;
  },
  get skipAnimation() {
    return nd;
  },
  get willAdvance() {
    return Cl;
  },
  assign: wv
});
const di = /* @__PURE__ */ new Set();
let mt = [], Do = [], Aa = 0;
const ao = {
  get idle() {
    return !di.size && !mt.length;
  },
  start(t) {
    Aa > t.priority ? (di.add(t), ie.onStart(Cv)) : (rd(t), ie(vs));
  },
  advance: vs,
  sort(t) {
    if (Aa)
      ie.onFrame(() => ao.sort(t));
    else {
      const e = mt.indexOf(t);
      ~e && (mt.splice(e, 1), id(t));
    }
  },
  clear() {
    mt = [], di.clear();
  }
};
function Cv() {
  di.forEach(rd), di.clear(), ie(vs);
}
function rd(t) {
  mt.includes(t) || id(t);
}
function id(t) {
  mt.splice(xv(mt, (e) => e.priority > t.priority), 0, t);
}
function vs(t) {
  const e = Do;
  for (let n = 0; n < mt.length; n++) {
    const r = mt[n];
    Aa = r.priority, r.idle || (Cl(r), r.advance(t), r.idle || e.push(r));
  }
  return Aa = 0, Do = mt, Do.length = 0, mt = e, mt.length > 0;
}
function xv(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const kv = (t, e, n) => Math.min(Math.max(n, t), e), _v = {
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
}, kt = "[-+]?\\d*\\.?\\d+", Ta = kt + "%";
function oo(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const $v = new RegExp("rgb" + oo(kt, kt, kt)), Sv = new RegExp("rgba" + oo(kt, kt, kt, kt)), Ov = new RegExp("hsl" + oo(kt, Ta, Ta)), Fv = new RegExp("hsla" + oo(kt, Ta, Ta, kt)), Rv = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Nv = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Pv = /^#([0-9a-fA-F]{6})$/, Mv = /^#([0-9a-fA-F]{8})$/;
function Av(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = Pv.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : fn && fn[t] !== void 0 ? fn[t] : (e = $v.exec(t)) ? (Jn(e[1]) << 24 | Jn(e[2]) << 16 | Jn(e[3]) << 8 | 255) >>> 0 : (e = Sv.exec(t)) ? (Jn(e[1]) << 24 | Jn(e[2]) << 16 | Jn(e[3]) << 8 | Dc(e[4])) >>> 0 : (e = Rv.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = Mv.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = Nv.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = Ov.exec(t)) ? (Ic(Lc(e[1]), Qi(e[2]), Qi(e[3])) | 255) >>> 0 : (e = Fv.exec(t)) ? (Ic(Lc(e[1]), Qi(e[2]), Qi(e[3])) | Dc(e[4])) >>> 0 : null;
}
function Vo(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Ic(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, a = Vo(i, r, t + 1 / 3), o = Vo(i, r, t), l = Vo(i, r, t - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(l * 255) << 8;
}
function Jn(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function Lc(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Dc(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function Qi(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Vc(t) {
  let e = Av(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, a = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const bi = (t, e, n) => {
  if (Y.fun(t))
    return t;
  if (Y.arr(t))
    return bi({
      range: t,
      output: e,
      extrapolate: n
    });
  if (Y.str(t.output[0]))
    return wl(t);
  const r = t, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", l = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = Iv(u, a);
    return Tv(u, a[f], a[f + 1], i[f], i[f + 1], c, o, l, r.map);
  };
};
function Tv(t, e, n, r, i, a, o, l, c) {
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
function Iv(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const Lv = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return kv(0, 1, i / t);
}, Ia = 1.70158, Ji = Ia * 1.525, jc = Ia + 1, Bc = 2 * Math.PI / 3, Wc = 2 * Math.PI / 4.5, ea = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, Dv = {
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
  easeInBack: (t) => jc * t * t * t - Ia * t * t,
  easeOutBack: (t) => 1 + jc * Math.pow(t - 1, 3) + Ia * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Ji + 1) * 2 * t - Ji) / 2 : (Math.pow(2 * t - 2, 2) * ((Ji + 1) * (t * 2 - 2) + Ji) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Bc),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Bc) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * Wc)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * Wc) / 2 + 1,
  easeInBounce: (t) => 1 - ea(1 - t),
  easeOutBounce: ea,
  easeInOutBounce: (t) => t < 0.5 ? (1 - ea(1 - 2 * t)) / 2 : (1 + ea(2 * t - 1)) / 2,
  steps: Lv
};
function ps() {
  return ps = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, ps.apply(this, arguments);
}
const _r = Symbol.for("FluidValue.get"), qn = Symbol.for("FluidValue.observers"), ft = (t) => !!(t && t[_r]), Ge = (t) => t && t[_r] ? t[_r]() : t, Zc = (t) => t[qn] || null;
function Vv(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function Ei(t, e) {
  let n = t[qn];
  n && n.forEach((r) => {
    Vv(r, e);
  });
}
class ad {
  constructor(e) {
    if (this[_r] = void 0, this[qn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    jv(this, e);
  }
}
const jv = (t, e) => od(t, _r, e);
function Tr(t, e) {
  if (t[_r]) {
    let n = t[qn];
    n || od(t, qn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function wi(t, e) {
  let n = t[qn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[qn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const od = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), Ca = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Bv = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, qc = new RegExp(`(${Ca.source})(%|[a-z]+)`, "i"), Wv = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, so = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, sd = (t) => {
  const [e, n] = Zv(t);
  if (!e || El())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && so.test(n))
      return sd(n);
    if (n)
      return n;
  }
  return t;
}, Zv = (t) => {
  const e = so.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let jo;
const qv = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, ld = (t) => {
  jo || (jo = fn ? new RegExp(`(${Object.keys(fn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((a) => Ge(a).replace(so, sd).replace(Bv, Vc).replace(jo, Vc)), n = e.map((a) => a.match(Ca).map(Number)), i = n[0].map((a, o) => n.map((l) => {
    if (!(o in l))
      throw Error('The arity of each "output" value must be equal');
    return l[o];
  })).map((a) => bi(ps({}, t, {
    output: a
  })));
  return (a) => {
    var o;
    const l = !qc.test(e[0]) && ((o = e.find((u) => qc.test(u))) == null ? void 0 : o.replace(Ca, ""));
    let c = 0;
    return e[0].replace(Ca, () => `${i[c++](a)}${l || ""}`).replace(Wv, qv);
  };
}, xl = "react-spring: ", cd = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${xl}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, Hv = cd(console.warn);
function Uv() {
  Hv(`${xl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const zv = cd(console.warn);
function Kv() {
  zv(`${xl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function lo(t) {
  return Y.str(t) && (t[0] == "#" || /\d/.test(t) || !El() && so.test(t) || t in (fn || {}));
}
const kl = El() ? J : Ja, Yv = () => {
  const t = W(!1);
  return kl(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function ud() {
  const t = X()[1], e = Yv();
  return () => {
    e.current && t(Math.random());
  };
}
function Gv(t, e) {
  const [n] = X(() => ({
    inputs: e,
    result: t()
  })), r = W(), i = r.current;
  let a = i;
  return a ? e && a.inputs && Xv(e, a.inputs) || (a = {
    inputs: e,
    result: t()
  }) : a = n, J(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function Xv(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const fd = (t) => J(t, Qv), Qv = [];
function Hc(t) {
  const e = W();
  return J(() => {
    e.current = t;
  }), e.current;
}
const Ci = Symbol.for("Animated:node"), Jv = (t) => !!t && t[Ci] === t, At = (t) => t && t[Ci], _l = (t, e) => Ev(t, Ci, e), co = (t) => t && t[Ci] && t[Ci].getPayload();
class dd {
  constructor() {
    this.payload = void 0, _l(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class Ir extends dd {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, Y.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new Ir(e);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(e, n) {
    return Y.num(e) && (this.lastPosition = e, n && (e = Math.round(e / n) * n, this.done && (this.lastPosition = e))), this._value === e ? !1 : (this._value = e, !0);
  }
  reset() {
    const {
      done: e
    } = this;
    this.done = !1, Y.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, e && (this.lastVelocity = null), this.v0 = null);
  }
}
class $r extends Ir {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = bi({
      output: [e, e]
    });
  }
  static create(e) {
    return new $r(e);
  }
  getValue() {
    let e = this._string;
    return e ?? (this._string = this._toString(this._value));
  }
  setValue(e) {
    if (Y.str(e)) {
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
    e && (this._toString = bi({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const La = {
  dependencies: null
};
class uo extends dd {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return Lt(this.source, (r, i) => {
      Jv(r) ? n[i] = r.getValue(e) : ft(r) ? n[i] = Ge(r) : e || (n[i] = r);
    }), n;
  }
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && ce(this.payload, (e) => e.reset());
  }
  _makePayload(e) {
    if (e) {
      const n = /* @__PURE__ */ new Set();
      return Lt(e, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(e) {
    La.dependencies && ft(e) && La.dependencies.add(e);
    const n = co(e);
    n && ce(n, (r) => this.add(r));
  }
}
class $l extends uo {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new $l(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(e2)), !0);
  }
}
function e2(t) {
  return (lo(t) ? $r : Ir).create(t);
}
function gs(t) {
  const e = At(t);
  return e ? e.constructor : Y.arr(t) ? $l : lo(t) ? $r : Ir;
}
function Da() {
  return Da = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Da.apply(this, arguments);
}
const Uc = (t, e) => {
  const n = !Y.fun(t) || t.prototype && t.prototype.isReactComponent;
  return Ee((r, i) => {
    const a = W(null), o = n && Qe((b) => {
      a.current = r2(i, b);
    }, [i]), [l, c] = n2(r, e), u = ud(), f = () => {
      const b = a.current;
      if (n && !b)
        return;
      (b ? e.applyAnimatedValues(b, l.getValue(!0)) : !1) === !1 && u();
    }, d = new t2(f, c), m = W();
    kl(() => (m.current = d, ce(c, (b) => Tr(b, d)), () => {
      m.current && (ce(m.current.deps, (b) => wi(b, m.current)), ie.cancel(m.current.update));
    })), J(f, []), fd(() => () => {
      const b = m.current;
      ce(b.deps, (y) => wi(y, b));
    });
    const p = e.getComponentProps(l.getValue());
    return D.createElement(t, Da({}, p, {
      ref: o
    }));
  });
};
class t2 {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && ie.write(this.update);
  }
}
function n2(t, e) {
  const n = /* @__PURE__ */ new Set();
  return La.dependencies = n, t.style && (t = Da({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new uo(t), La.dependencies = null, [t, n];
}
function r2(t, e) {
  return t && (Y.fun(t) ? t(e) : t.current = e), e;
}
const zc = Symbol.for("AnimatedComponent"), i2 = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new uo(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const l = Kc(o) || "Anonymous";
    return Y.str(o) ? o = a[o] || (a[o] = Uc(o, i)) : o = o[zc] || (o[zc] = Uc(o, i)), o.displayName = `Animated(${l})`, o;
  };
  return Lt(t, (o, l) => {
    Y.arr(t) && (l = Kc(o)), a[l] = a(o);
  }), {
    animated: a
  };
}, Kc = (t) => Y.str(t) ? t : t && Y.str(t.displayName) ? t.displayName : Y.fun(t) && t.name || null;
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
function An(t, ...e) {
  return Y.fun(t) ? t(...e) : t;
}
const mi = (t, e) => t === !0 || !!(e && t && (Y.fun(t) ? t(e) : rt(t).includes(e))), md = (t, e) => Y.obj(t) ? e && t[e] : t, hd = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, a2 = (t) => t, Sl = (t, e = a2) => {
  let n = o2;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const a = e(t[i], i);
    Y.und(a) || (r[i] = a);
  }
  return r;
}, o2 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], s2 = {
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
function l2(t) {
  const e = {};
  let n = 0;
  if (Lt(t, (r, i) => {
    s2[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function vd(t) {
  const e = l2(t);
  if (e) {
    const n = {
      to: e
    };
    return Lt(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Te({}, t);
}
function xi(t) {
  return t = Ge(t), Y.arr(t) ? t.map(xi) : lo(t) ? pt.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function c2(t) {
  for (const e in t)
    return !0;
  return !1;
}
function ys(t) {
  return Y.fun(t) || Y.arr(t) && Y.obj(t[0]);
}
function u2(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function f2(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const d2 = {
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
}, bs = Te({}, d2.default, {
  mass: 1,
  damping: 1,
  easing: Dv.linear,
  clamp: !1
});
class m2 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, bs);
  }
}
function h2(t, e, n) {
  n && (n = Te({}, n), Yc(n, e), e = Te({}, n, e)), Yc(t, e), Object.assign(t, e);
  for (const o in bs)
    t[o] == null && (t[o] = bs[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = t;
  return Y.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * a * r / i), t;
}
function Yc(t, e) {
  if (!Y.und(e.decay))
    t.duration = void 0;
  else {
    const n = !Y.und(e.tension) || !Y.und(e.friction);
    (n || !Y.und(e.frequency) || !Y.und(e.damping) || !Y.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const Gc = [];
class v2 {
  constructor() {
    this.changed = !1, this.values = Gc, this.toValues = null, this.fromValues = Gc, this.to = void 0, this.from = void 0, this.config = new m2(), this.immediate = !1;
  }
}
function pd(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, l) => {
    var c;
    let u, f, d = mi((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      b();
    else {
      Y.und(n.pause) || (i.paused = mi(n.pause, e));
      let y = r == null ? void 0 : r.pause;
      y !== !0 && (y = i.paused || mi(y, e)), u = An(n.delay || 0, e), y ? (i.resumeQueue.add(p), a.pause()) : (a.resume(), p());
    }
    function m() {
      i.resumeQueue.add(p), i.timeouts.delete(f), f.cancel(), u = f.time - ie.now();
    }
    function p() {
      u > 0 && !pt.skipAnimation ? (i.delayed = !0, f = ie.setTimeout(b, u), i.pauseQueue.add(m), i.timeouts.add(f)) : b();
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
const Ol = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? Er(t.get()) : e.every((n) => n.noop) ? gd(t.get()) : xt(t.get(), e.every((n) => n.finished)), gd = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), xt = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), Er = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function yd(t, e, n, r) {
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
    const u = Sl(e, (g, h) => h === "onRest" ? void 0 : g);
    let f, d;
    const m = new Promise((g, h) => (f = g, d = h)), p = (g) => {
      const h = i <= (n.cancelId || 0) && Er(r) || i !== n.asyncId && xt(r, !1);
      if (h)
        throw g.result = h, d(g), g;
    }, b = (g, h) => {
      const x = new Xc(), v = new Qc();
      return (async () => {
        if (pt.skipAnimation)
          throw ki(n), v.result = xt(r, !1), d(v), v;
        p(x);
        const E = Y.obj(g) ? Te({}, g) : Te({}, h, {
          to: g
        });
        E.parentId = i, Lt(u, (C, k) => {
          Y.und(E[k]) && (E[k] = C);
        });
        const w = await r.start(E);
        return p(x), n.paused && await new Promise((C) => {
          n.resumeQueue.add(C);
        }), w;
      })();
    };
    let y;
    if (pt.skipAnimation)
      return ki(n), xt(r, !1);
    try {
      let g;
      Y.arr(t) ? g = (async (h) => {
        for (const x of h)
          await b(x);
      })(t) : g = Promise.resolve(t(b, r.stop.bind(r))), await Promise.all([g.then(f), m]), y = xt(r.get(), !0, !1);
    } catch (g) {
      if (g instanceof Xc)
        y = g.result;
      else if (g instanceof Qc)
        y = g.result;
      else
        throw g;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? l : void 0, n.promise = a ? c : void 0);
    }
    return Y.fun(o) && ie.batchedUpdates(() => {
      o(y, r, r.item);
    }), y;
  })();
}
function ki(t, e) {
  fi(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class Xc extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class Qc extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const Es = (t) => t instanceof Fl;
let p2 = 1;
class Fl extends ad {
  constructor(...e) {
    super(...e), this.id = p2++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = At(this);
    return e && e.getValue();
  }
  to(...e) {
    return pt.to(this, e);
  }
  interpolate(...e) {
    return Uv(), pt.to(this, e);
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
    Ei(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || ao.sort(this), Ei(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const Hn = Symbol.for("SpringPhase"), bd = 1, ws = 2, Cs = 4, Bo = (t) => (t[Hn] & bd) > 0, Qt = (t) => (t[Hn] & ws) > 0, zr = (t) => (t[Hn] & Cs) > 0, Jc = (t, e) => e ? t[Hn] |= ws | bd : t[Hn] &= ~ws, eu = (t, e) => e ? t[Hn] |= Cs : t[Hn] &= ~Cs;
class g2 extends Fl {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new v2(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !Y.und(e) || !Y.und(n)) {
      const r = Y.obj(e) ? Te({}, e) : Te({}, n, {
        from: e
      });
      Y.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Qt(this) || this._state.asyncTo) || zr(this);
  }
  get goal() {
    return Ge(this.animation.to);
  }
  get velocity() {
    const e = At(this);
    return e instanceof Ir ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Bo(this);
  }
  get isAnimating() {
    return Qt(this);
  }
  get isPaused() {
    return zr(this);
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
    const l = co(i.to);
    !l && ft(i.to) && (o = rt(Ge(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == $r ? 1 : l ? l[d].lastPosition : o[d];
      let p = i.immediate, b = m;
      if (!p) {
        if (b = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let y = f.elapsedTime += e;
        const g = i.fromValues[d], h = f.v0 != null ? f.v0 : f.v0 = Y.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let x;
        const v = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (Y.und(a.duration))
          if (a.decay) {
            const E = a.decay === !0 ? 0.998 : a.decay, w = Math.exp(-(1 - E) * y);
            b = g + h / (1 - E) * (1 - w), p = Math.abs(f.lastPosition - b) <= v, x = h * w;
          } else {
            x = f.lastVelocity == null ? h : f.lastVelocity;
            const E = a.restVelocity || v / 10, w = a.clamp ? 0 : a.bounce, C = !Y.und(w), k = g == m ? f.v0 > 0 : g < m;
            let F, M = !1;
            const S = 1, V = Math.ceil(e / S);
            for (let I = 0; I < V && (F = Math.abs(x) > E, !(!F && (p = Math.abs(m - b) <= v, p))); ++I) {
              C && (M = b == m || b > m == k, M && (x = -x * w, b = m));
              const P = -a.tension * 1e-6 * (b - m), R = -a.friction * 1e-3 * x, T = (P + R) / a.mass;
              x = x + T * S, b = b + x * S;
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
    const c = At(this), u = c.getValue();
    if (n) {
      const f = Ge(i.to);
      (u !== f || r) && !a.decay ? (c.setValue(f), this._onChange(f)) : r && a.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(e) {
    return ie.batchedUpdates(() => {
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
    if (Qt(this)) {
      const {
        to: e,
        config: n
      } = this.animation;
      ie.batchedUpdates(() => {
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
    return Y.und(e) ? (r = this.queue || [], this.queue = []) : r = [Y.obj(e) ? e : Te({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Ol(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), ki(this._state, e && this._lastCallId), ie.batchedUpdates(() => this._stop(n, e)), this;
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
    r = Y.obj(r) ? r[n] : r, (r == null || ys(r)) && (r = void 0), i = Y.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Bo(this) || (e.reverse && ([r, i] = [i, r]), i = Ge(i), Y.und(i) ? At(this) || this._set(r) : this._set(i)), a;
  }
  _update(e, n) {
    let r = Te({}, e);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, Sl(r, (c, u) => /^on/.test(u) ? md(c, i) : c)), nu(this, r, "onProps"), Yr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const l = this._state;
    return pd(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: l,
      actions: {
        pause: () => {
          zr(this) || (eu(this, !0), si(l.pauseQueue), Yr(this, "onPause", xt(this, Kr(this, this.animation.to)), this));
        },
        resume: () => {
          zr(this) && (eu(this, !1), Qt(this) && this._resume(), si(l.resumeQueue), Yr(this, "onResume", xt(this, Kr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Ed(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Er(this));
    const i = !Y.und(e.to), a = !Y.und(e.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(Er(this));
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
    a && !i && (!n.default || Y.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const p = !Ht(m, f);
    p && (c.from = m), m = Ge(m);
    const b = !Ht(d, u);
    b && this._focus(d);
    const y = ys(n.to), {
      config: g
    } = c, {
      decay: h,
      velocity: x
    } = g;
    (i || a) && (g.velocity = 0), n.config && !y && h2(g, An(n.config, o), n.config !== l.config ? An(l.config, o) : void 0);
    let v = At(this);
    if (!v || Y.und(d))
      return r(xt(this, !0));
    const E = Y.und(n.reset) ? a && !n.default : !Y.und(m) && mi(n.reset, o), w = E ? m : this.get(), C = xi(d), k = Y.num(C) || Y.arr(C) || lo(C), F = !y && (!k || mi(l.immediate || n.immediate, o));
    if (b) {
      const I = gs(d);
      if (I !== v.constructor)
        if (F)
          v = this._set(C);
        else
          throw Error(`Cannot animate between ${v.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const M = v.constructor;
    let S = ft(d), V = !1;
    if (!S) {
      const I = E || !Bo(this) && p;
      (b || I) && (V = Ht(xi(w), C), S = !V), (!Ht(c.immediate, F) && !F || !Ht(g.decay, h) || !Ht(g.velocity, x)) && (S = !0);
    }
    if (V && Qt(this) && (c.changed && !E ? S = !0 : S || this._stop(u)), !y && ((S || ft(u)) && (c.values = v.getPayload(), c.toValues = ft(d) ? null : M == $r ? [1] : rt(C)), c.immediate != F && (c.immediate = F, !F && !E && this._set(u)), S)) {
      const {
        onRest: I
      } = c;
      ce(b2, (R) => nu(this, n, R));
      const P = xt(this, Kr(this, u));
      si(this._pendingCalls, P), this._pendingCalls.add(r), c.changed && ie.batchedUpdates(() => {
        c.changed = !E, I == null || I(P, this), E ? An(l.onRest, P) : c.onStart == null || c.onStart(P, this);
      });
    }
    E && this._set(w), y ? r(yd(n.to, n, this._state, this)) : S ? this._start() : Qt(this) && !b ? this._pendingCalls.add(r) : r(gd(w));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (Zc(this) && this._detach(), n.to = e, Zc(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    ft(n) && (Tr(n, this), Es(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    ft(e) && wi(e, this);
  }
  _set(e, n = !0) {
    const r = Ge(e);
    if (!Y.und(r)) {
      const i = At(this);
      if (!i || !Ht(r, i.getValue())) {
        const a = gs(r);
        !i || i.constructor != a ? _l(this, a.create(r)) : i.setValue(r), i && ie.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return At(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, Yr(this, "onStart", xt(this, Kr(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), An(this.animation.onChange, e, this)), An(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    At(this).reset(Ge(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), Qt(this) || (Jc(this, !0), zr(this) || this._resume());
  }
  _resume() {
    pt.skipAnimation ? this.finish() : ao.start(this);
  }
  _stop(e, n) {
    if (Qt(this)) {
      Jc(this, !1);
      const r = this.animation;
      ce(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), Ei(this, {
        type: "idle",
        parent: this
      });
      const i = n ? Er(this.get()) : xt(this.get(), Kr(this, e ?? r.to));
      si(this._pendingCalls, i), r.changed && (r.changed = !1, Yr(this, "onRest", i, this));
    }
  }
}
function Kr(t, e) {
  const n = xi(e), r = xi(t.get());
  return Ht(r, n);
}
function Ed(t, e = t.loop, n = t.to) {
  let r = An(e);
  if (r) {
    const i = r !== !0 && vd(r), a = (i || t).reverse, o = !i || i.reset;
    return _i(Te({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !a || ys(n) ? n : void 0,
      from: o ? t.from : void 0,
      reset: o
    }, i));
  }
}
function _i(t) {
  const {
    to: e,
    from: n
  } = t = vd(t), r = /* @__PURE__ */ new Set();
  return Y.obj(e) && tu(e, r), Y.obj(n) && tu(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function y2(t) {
  const e = _i(t);
  return Y.und(e.default) && (e.default = Sl(e)), e;
}
function tu(t, e) {
  Lt(t, (n, r) => n != null && e.add(r));
}
const b2 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function nu(t, e, n) {
  t.animation[n] = e[n] !== hd(e, n) ? md(e[n], t.key) : void 0;
}
function Yr(t, e, ...n) {
  var r, i, a, o;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (a = (o = t.defaultProps)[e]) == null || a.call(o, ...n);
}
const E2 = ["onStart", "onChange", "onRest"];
let w2 = 1, C2 = class {
  constructor(e, n) {
    this.id = w2++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
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
      Y.und(r) || this.springs[n].set(r);
    }
  }
  update(e) {
    return e && this.queue.push(_i(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = rt(e).map(_i) : this.queue = [], this._flush ? this._flush(this, n) : (_d(this, n), xs(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      ce(rt(n), (i) => r[i].stop(!!e));
    } else
      ki(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (Y.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      ce(rt(e), (r) => n[r].pause());
    }
    return this;
  }
  resume(e) {
    if (Y.und(e))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      ce(rt(e), (r) => n[r].resume());
    }
    return this;
  }
  each(e) {
    Lt(this.springs, e);
  }
  _onFrame() {
    const {
      onStart: e,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, a = this._changed.size > 0;
    (i && !this._started || a && !this._started) && (this._started = !0, fi(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, l = a || o && r.size ? this.get() : null;
    a && n.size && fi(n, ([c, u]) => {
      u.value = l, c(u, this, this._item);
    }), o && (this._started = !1, fi(r, ([c, u]) => {
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
    ie.onFrame(this._onFrame);
  }
};
function xs(t, e) {
  return Promise.all(e.map((n) => wd(t, n))).then((n) => Ol(t, n));
}
async function wd(t, e, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: l,
    onResolve: c
  } = e, u = Y.obj(e.default) && e.default;
  o && (e.loop = !1), i === !1 && (e.to = null), a === !1 && (e.from = null);
  const f = Y.arr(i) || Y.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : ce(E2, (y) => {
    const g = e[y];
    if (Y.fun(g)) {
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
  e.pause === !d.paused ? (d.paused = e.pause, si(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((y) => t.springs[y].start(e)), p = e.cancel === !0 || hd(e, "cancel") === !0;
  (f || p && d.asyncId) && m.push(pd(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: hs,
      resume: hs,
      start(y, g) {
        p ? (ki(d, t._lastAsyncId), g(Er(t))) : (y.onRest = l, g(yd(f, y, d, t)));
      }
    }
  })), d.paused && await new Promise((y) => {
    d.resumeQueue.add(y);
  });
  const b = Ol(t, await Promise.all(m));
  if (o && b.finished && !(n && b.noop)) {
    const y = Ed(e, o, i);
    if (y)
      return _d(t, [y]), wd(t, y, !0);
  }
  return c && ie.batchedUpdates(() => c(b, t, t.item)), b;
}
function ru(t, e) {
  const n = Te({}, t.springs);
  return e && ce(rt(e), (r) => {
    Y.und(r.keys) && (r = _i(r)), Y.obj(r.to) || (r = Te({}, r, {
      to: void 0
    })), kd(n, r, (i) => xd(i));
  }), Cd(t, n), n;
}
function Cd(t, e) {
  Lt(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, Tr(n, t));
  });
}
function xd(t, e) {
  const n = new g2();
  return n.key = t, e && Tr(n, e), n;
}
function kd(t, e, n) {
  e.keys && ce(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function _d(t, e) {
  ce(e, (n) => {
    kd(t.springs, n, (r) => xd(r, t));
  });
}
function x2(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const k2 = ["children"], fo = (t) => {
  let {
    children: e
  } = t, n = x2(t, k2);
  const r = at(Va), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = Gv(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = Va;
  return D.createElement(o, {
    value: n
  }, e);
}, Va = _2(fo, {});
fo.Provider = Va.Provider;
fo.Consumer = Va.Consumer;
function _2(t, e) {
  return Object.assign(t, D.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const $2 = () => {
  const t = [], e = function(i) {
    Kv();
    const a = [];
    return ce(t, (o, l) => {
      if (Y.und(i))
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
    return ce(t, (r) => r.pause(...arguments)), this;
  }, e.resume = function() {
    return ce(t, (r) => r.resume(...arguments)), this;
  }, e.set = function(r) {
    ce(t, (i) => i.set(r));
  }, e.start = function(r) {
    const i = [];
    return ce(t, (a, o) => {
      if (Y.und(r))
        i.push(a.start());
      else {
        const l = this._getProps(r, a, o);
        l && i.push(a.start(l));
      }
    }), i;
  }, e.stop = function() {
    return ce(t, (r) => r.stop(...arguments)), this;
  }, e.update = function(r) {
    return ce(t, (i, a) => i.update(this._getProps(r, i, a))), this;
  };
  const n = function(i, a, o) {
    return Y.fun(i) ? i(o, a) : i;
  };
  return e._getProps = n, e;
};
function S2(t, e, n) {
  const r = Y.fun(e) && e;
  r && !n && (n = []);
  const i = me(() => r || arguments.length == 3 ? $2() : void 0, []), a = W(0), o = ud(), l = me(() => ({
    ctrls: [],
    queue: [],
    flush(h, x) {
      const v = ru(h, x);
      return a.current > 0 && !l.queue.length && !Object.keys(v).some((w) => !h.springs[w]) ? xs(h, x) : new Promise((w) => {
        Cd(h, v), l.queue.push(() => {
          w(xs(h, x));
        }), o();
      });
    }
  }), []), c = W([...l.ctrls]), u = [], f = Hc(t) || 0;
  me(() => {
    ce(c.current.slice(t, f), (h) => {
      u2(h, i), h.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), me(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(h, x) {
    for (let v = h; v < x; v++) {
      const E = c.current[v] || (c.current[v] = new C2(null, l.flush)), w = r ? r(v, E) : e[v];
      w && (u[v] = y2(w));
    }
  }
  const m = c.current.map((h, x) => ru(h, u[x])), p = at(fo), b = Hc(p), y = p !== b && c2(p);
  kl(() => {
    a.current++, l.ctrls = c.current;
    const {
      queue: h
    } = l;
    h.length && (l.queue = [], ce(h, (x) => x())), ce(c.current, (x, v) => {
      i == null || i.add(x), y && x.start({
        default: p
      });
      const E = u[v];
      E && (f2(x, E.ref), x.ref ? x.queue.push(E) : x.start(E));
    });
  }), fd(() => () => {
    ce(l.ctrls, (h) => h.stop(!0));
  });
  const g = m.map((h) => Te({}, h));
  return i ? [g, i] : g;
}
function Le(t, e) {
  const n = Y.fun(t), [[r], i] = S2(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let iu;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(iu || (iu = {}));
class $d extends Fl {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = bi(...n);
    const r = this._get(), i = gs(r);
    _l(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    Ht(n, r) || (At(this).setValue(n), this._onChange(n, this.idle)), !this.idle && au(this._active) && Wo(this);
  }
  _get() {
    const e = Y.arr(this.source) ? this.source.map(Ge) : rt(Ge(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !au(this._active) && (this.idle = !1, ce(co(this), (e) => {
      e.done = !1;
    }), pt.skipAnimation ? (ie.batchedUpdates(() => this.advance()), Wo(this)) : ao.start(this));
  }
  _attach() {
    let e = 1;
    ce(rt(this.source), (n) => {
      ft(n) && Tr(n, this), Es(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    ce(rt(this.source), (e) => {
      ft(e) && wi(e, this);
    }), this._active.clear(), Wo(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = rt(this.source).reduce((n, r) => Math.max(n, (Es(r) ? r.priority : 0) + 1), 0));
  }
}
function O2(t) {
  return t.idle !== !1;
}
function au(t) {
  return !t.size || Array.from(t).every(O2);
}
function Wo(t) {
  t.idle || (t.idle = !0, ce(co(t), (e) => {
    e.done = !0;
  }), Ei(t, {
    type: "idle",
    parent: t
  }));
}
const F2 = (t, ...e) => new $d(t, e);
pt.assign({
  createStringInterpolator: ld,
  to: (t, e) => new $d(t, e)
});
function Rl(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const R2 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], Sd = /^--/;
function N2(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !Sd.test(t) && !(hi.hasOwnProperty(t) && hi[t]) ? e + "px" : ("" + e).trim();
}
const ou = {};
function P2(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: l,
    viewBox: c
  } = r, u = Rl(r, R2), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : ou[m] || (ou[m] = m.replace(/([A-Z])/g, (p) => "-" + p.toLowerCase())));
  a !== void 0 && (t.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const p = N2(m, i[m]);
      Sd.test(m) ? t.style.setProperty(m, p) : t.style[m] = p;
    }
  d.forEach((m, p) => {
    t.setAttribute(m, f[p]);
  }), o !== void 0 && (t.scrollTop = o), l !== void 0 && (t.scrollLeft = l), c !== void 0 && t.setAttribute("viewBox", c);
}
let hi = {
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
const M2 = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), A2 = ["Webkit", "Ms", "Moz", "O"];
hi = Object.keys(hi).reduce((t, e) => (A2.forEach((n) => t[M2(n, e)] = t[e]), t), hi);
const T2 = ["x", "y", "z"], I2 = /^(matrix|translate|scale|rotate|skew)/, L2 = /^(translate)/, D2 = /^(rotate|skew)/, Zo = (t, e) => Y.num(t) && t !== 0 ? t + e : t, xa = (t, e) => Y.arr(t) ? t.every((n) => xa(n, e)) : Y.num(t) ? t === e : parseFloat(t) === e;
class V2 extends uo {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, a = Rl(e, T2);
    const o = [], l = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), l.push((c) => [`translate3d(${c.map((u) => Zo(u, "px")).join(",")})`, xa(c, 0)])), Lt(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), l.push((f) => [f, f === ""]);
      else if (I2.test(u)) {
        if (delete a[u], Y.und(c))
          return;
        const f = L2.test(u) ? "px" : D2.test(u) ? "deg" : "";
        o.push(rt(c)), l.push(u === "rotate3d" ? ([d, m, p, b]) => [`rotate3d(${d},${m},${p},${Zo(b, f)})`, xa(b, 0)] : (d) => [`${u}(${d.map((m) => Zo(m, f)).join(",")})`, xa(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new j2(o, l)), super(a);
  }
}
class j2 extends ad {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return ce(this.inputs, (r, i) => {
      const a = Ge(r[0]), [o, l] = this.transforms[i](Y.arr(a) ? a : r.map(Ge));
      e += " " + o, n = n && l;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && ce(this.inputs, (n) => ce(n, (r) => ft(r) && Tr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && ce(this.inputs, (n) => ce(n, (r) => ft(r) && wi(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), Ei(this, e);
  }
}
const B2 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], W2 = ["scrollTop", "scrollLeft"];
pt.assign({
  batchedUpdates: Pf,
  createStringInterpolator: ld,
  colors: _v
});
const Z2 = i2(B2, {
  applyAnimatedValues: P2,
  createAnimatedStyle: (t) => new V2(t),
  getComponentProps: (t) => Rl(t, W2)
}), Ce = Z2.animated;
function q2(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function Lr(t, e) {
  if (Mr && t) {
    const n = q2(t);
    return um(e, n);
  }
  return e;
}
function H2(t) {
  const e = W(t);
  return t && (e.current = !0), !!e.current;
}
const Dr = (t) => mo(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function mo(t, e, n) {
  const r = H2(t);
  return e || t ? !0 : r ? !n : !1;
}
const U2 = {
  click: "onClick",
  touchstart: "onTouchStart"
};
function hn(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = U2[r];
    n[i] = function(a) {
      var o, l;
      a.stopPropagation(), (l = (o = e.props)[i]) === null || l === void 0 || l.call(o, a);
    };
  }
  return s.cloneElement(e, n);
}
const qo = "adm-mask", z2 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, K2 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, Y2 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, Vi = (t) => {
  const e = G(Y2, t), {
    locale: n
  } = fe(), r = W(null);
  ro(r, e.visible && e.disableBodyScroll);
  const i = me(() => {
    var f;
    const d = (f = z2[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = K2[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [a, o] = X(e.visible), l = hl(), {
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
  }), u = hn(e.stopPropagation, H(e, s.createElement(Ce.div, {
    className: qo,
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
    className: `${qo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), s.createElement("div", {
    className: `${qo}-content`
  }, e.children))));
  return s.createElement(Dr, {
    active: a,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, Lr(e.getContainer, u));
};
function Od(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "AddOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function G2(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "CheckCircleFill-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "CheckCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Fd(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "CheckOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "CheckOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function X2(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "ClockCircleFill-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "ClockCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Nl(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "CloseCircleFill-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "CloseCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ho(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "CloseOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "CloseOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Q2(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "DownFill-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "DownFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Rd(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", null, /* @__PURE__ */ D.createElement("rect", {
    id: "DownOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
    id: "DownOutline-down",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function J2(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", null, /* @__PURE__ */ D.createElement("rect", {
    id: "ExclamationCircleFill-矩形",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ep(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "InformationCircleFill-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "InformationCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function tp(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "LeftOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "LeftOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function np(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "MinusOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function rp(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "QuestionCircleOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "QuestionCircleOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ip(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "RightOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
    id: "RightOutline-right",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ap(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "SearchOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "SearchOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function op(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "SoundOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "SoundOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function su(t) {
  return /* @__PURE__ */ D.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ D.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ D.createElement("g", {
    id: "TextDeletionOutline-编组"
  }, /* @__PURE__ */ D.createElement("rect", {
    id: "TextDeletionOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ D.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Pl = {
  closeOnMaskClick: !1,
  closeIcon: s.createElement(ho, null),
  destroyOnClose: !1,
  disableBodyScroll: !0,
  forceRender: !1,
  getContainer: () => document.body,
  mask: !0,
  showCloseButton: !1,
  stopPropagation: ["click"],
  visible: !1
};
function Nd(t) {
  const [e, n] = X(t);
  return Ie(() => {
    n(t);
  }, [t]), e;
}
function sp(t, e, n) {
  return Math.max(e, Math.min(t, n));
}
const Pe = {
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
function lu(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function cu(t, e, n, r = 0.15) {
  return r === 0 ? sp(t, e, n) : t < e ? -lu(e - t, n - e, r) + e : t > n ? +lu(t - n, n - e, r) + n : t;
}
function lp(t, [e, n], [r, i]) {
  const [[a, o], [l, c]] = t;
  return [cu(e, a, o, r), cu(n, l, c, i)];
}
function cp(t, e) {
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
function up(t) {
  var e = cp(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function je(t, e, n) {
  return e = up(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function uu(t, e) {
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
    e % 2 ? uu(Object(n), !0).forEach(function(r) {
      je(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : uu(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const Pd = {
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
function fu(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const fp = ["enter", "leave"];
function dp(t = !1, e) {
  return t && !fp.includes(e);
}
function mp(t, e = "", n = !1) {
  const r = Pd[t], i = r && r[e] || e;
  return "on" + fu(t) + fu(i) + (dp(n, i) ? "Capture" : "");
}
const hp = ["gotpointercapture", "lostpointercapture"];
function vp(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = hp.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function pp(t, e = "") {
  const n = Pd[t], r = n && n[e] || e;
  return t + r;
}
function vo(t) {
  return "touches" in t;
}
function Md(t) {
  return vo(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function gp(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function yp(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function Ad(t) {
  return vo(t) ? yp(t)[0] : t;
}
function ks(t, e) {
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
function bp(t) {
  return gp(t).map((e) => e.identifier);
}
function du(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return ks(n, r);
}
function Ho(t) {
  const e = Ad(t);
  return vo(t) ? e.identifier : e.pointerId;
}
function mu(t) {
  const e = Ad(t);
  return [e.clientX, e.clientY];
}
const hu = 40, vu = 800;
function Td(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= hu, n *= hu) : r === 2 && (e *= vu, n *= vu), [e, n];
}
function Ep(t) {
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
function ja(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function wp() {
}
function Cp(...t) {
  return t.length === 0 ? wp : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function pu(t, e) {
  return Object.assign({}, e, t || {});
}
const xp = 32;
class Id {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? ja(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, Ep(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const C = n._delta.map(Math.abs);
      Pe.addTo(n._distance, C);
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
    b && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = ja(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [y, g] = n.offset, [[h, x], [v, E]] = n._bounds;
    n.overflow = [y < h ? -1 : y > x ? 1 : 0, g < v ? -1 : g > E ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const w = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = lp(n._bounds, n.offset, w), n.delta = Pe.sub(n.offset, p), this.computeMovement(), b && (!n.last || a > xp)) {
      n.delta = Pe.sub(n.offset, p);
      const C = n.delta.map(Math.abs);
      Pe.addTo(n.distance, C), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [C[0] / a, C[1] / a], n.timeDelta = a);
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
function kp([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class Ld extends Id {
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
    this.state.offset = Pe.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Pe.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(e) {
    const n = this.state, r = this.config;
    if (!n.axis && e) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[Md(e)] : r.axisThreshold;
      n.axis = kp(n._movement, i);
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
const _p = (t) => t, gu = 0.15, Dd = {
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
        return [gu, gu];
      case !1:
        return [0, 0];
      default:
        return Pe.toVector(t);
    }
  },
  from(t) {
    if (typeof t == "function")
      return t;
    if (t != null)
      return Pe.toVector(t);
  },
  transform(t, e, n) {
    const r = t || n.shared.transform;
    return this.hasCustomTransform = !!r, r || _p;
  },
  threshold(t) {
    return Pe.toVector(t, 0);
  }
}, $p = 0, Vr = $e($e({}, Dd), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = $p) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (a) => Vr.bounds(t(a));
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
}), yu = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class Sp extends Ld {
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
      e._bounds = Vr.bounds(i);
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = Ho(e), r._pointerActive = !0, this.computeValues(mu(e)), this.computeInitial(), n.preventScrollAxis && Md(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
  }
  startPointerDrag(e) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(e), this.emit();
  }
  pointerMove(e) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = Ho(e);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = mu(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Pe.sub(a, n._values), this.computeValues(a)), Pe.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
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
    const i = Ho(e);
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
    this.state._preventScroll = !1, Op(e);
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
    const n = yu[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Pe.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in yu && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Op(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const ji = typeof window < "u" && window.document && window.document.createElement;
function Vd() {
  return ji && "ontouchstart" in window;
}
function Fp() {
  return Vd() || ji && window.navigator.maxTouchPoints > 1;
}
function Rp() {
  return ji && "onpointerdown" in window;
}
function Np() {
  return ji && "exitPointerLock" in window.document;
}
function Pp() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const dt = {
  isBrowser: ji,
  gesture: Pp(),
  touch: Vd(),
  touchscreen: Fp(),
  pointer: Rp(),
  pointerLock: Np()
}, Mp = 250, Ap = 180, Tp = 0.5, Ip = 50, Lp = 250, Dp = 10, bu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Vp = $e($e({}, Vr), {}, {
  device(t, e, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && dt.pointerLock, dt.touch && n ? "touch" : this.pointerLock ? "mouse" : dt.pointer && !i ? "pointer" : dt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(t, e, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Mp : void 0, !(!dt.touchscreen || n === !1))
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
    const a = Pe.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: t = Tp,
    distance: e = Ip,
    duration: n = Lp
  } = {}) {
    return {
      velocity: this.transform(Pe.toVector(t)),
      distance: this.transform(Pe.toVector(e)),
      duration: n
    };
  },
  delay(t = 0) {
    switch (t) {
      case !0:
        return Ap;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? $e($e({}, bu), t) : bu;
  },
  keyboardDisplacement(t = Dp) {
    return t;
  }
});
function jd(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [a, o] = t._direction;
  (e < 0 && r > 0 && a < 0 || e > 0 && r < 0 && a > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (t._movement[1] = t._movementBound[1]);
}
const jp = 30, Bp = 100;
class Wp extends Id {
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
    e === "wheel" ? this.state.offset = Pe.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * jp - Math.abs(r);
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
    const i = du(e, n._touchIds);
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
    const a = ks(...Array.from(r.values()));
    a && this.pinchStart(e, a);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = du(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = ks(...Array.from(n.values()));
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
    n._movement = [e.scale - 1, e.rotation], n._delta = Pe.sub(n._movement, r), this.compute(e), this.emit();
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
    r._delta = [-Td(e)[1] / Bp * r.offset[0], 0], Pe.addTo(r._movement, r._delta), jd(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const Zp = $e($e({}, Dd), {}, {
  device(t, e, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !dt.touch && dt.gesture)
      return "gesture";
    if (dt.touch && r)
      return "touch";
    if (dt.touchscreen) {
      if (dt.pointer)
        return "pointer";
      if (dt.touch)
        return "touch";
    }
  },
  bounds(t, e, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const l = pu(ja(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    }, a = (o) => {
      const l = pu(ja(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [l.min, l.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(t, e, n) {
    return this.lockDirection = n.axis === "lock", Pe.toVector(t, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(t) {
    return t === void 0 ? "ctrlKey" : t;
  },
  pinchOnWheel(t = !0) {
    return t;
  }
});
$e($e({}, Vr), {}, {
  mouseOnly: (t = !0) => t
});
class qp extends Ld {
  constructor(...e) {
    super(...e), je(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = Td(e), Pe.addTo(n._movement, n._delta), jd(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const Hp = Vr;
$e($e({}, Vr), {}, {
  mouseOnly: (t = !0) => t
});
const Ml = /* @__PURE__ */ new Map(), _s = /* @__PURE__ */ new Map();
function Al(t) {
  Ml.set(t.key, t.engine), _s.set(t.key, t.resolver);
}
const Bd = {
  key: "drag",
  engine: Sp,
  resolver: Vp
}, Up = {
  key: "pinch",
  engine: Wp,
  resolver: Zp
}, zp = {
  key: "wheel",
  engine: qp,
  resolver: Hp
};
function Kp(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Yp(t, e) {
  if (t == null)
    return {};
  var n = Kp(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const Gp = {
  target(t) {
    if (t)
      return () => "current" in t ? t.current : t;
  },
  enabled(t = !0) {
    return t;
  },
  window(t = dt.isBrowser ? window : void 0) {
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
}, Xp = ["target", "eventOptions", "window", "enabled", "transform"];
function ka(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = ka(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function Qp(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  } = r, u = Yp(r, Xp);
  if (n.shared = ka({
    target: i,
    eventOptions: a,
    window: o,
    enabled: l,
    transform: c
  }, Gp), e) {
    const f = _s.get(e);
    n[e] = ka($e({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = _s.get(f);
      d && (n[f] = ka($e({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class Wd {
  constructor(e, n) {
    je(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, a) {
    const o = this._listeners, l = pp(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = $e($e({}, c), a);
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
class Jp {
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
class e3 {
  constructor(e) {
    je(this, "gestures", /* @__PURE__ */ new Set()), je(this, "_targetEventStore", new Wd(this)), je(this, "gestureEventStores", {}), je(this, "gestureTimeoutStores", {}), je(this, "handlers", {}), je(this, "config", {}), je(this, "pointerIds", /* @__PURE__ */ new Set()), je(this, "touchIds", /* @__PURE__ */ new Set()), je(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), t3(this, e);
  }
  setEventIds(e) {
    if (vo(e))
      return this.touchIds = new Set(bp(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = Qp(e, n, this.config);
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
          const l = this.config[o], c = Eu(r, l.eventOptions, !!i);
          if (l.enabled) {
            const u = Ml.get(o);
            new u(this, e, o).bind(c);
          }
        }
        const a = Eu(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (l) => this.nativeHandlers[o]($e($e({}, this.state.shared), {}, {
            event: l,
            args: e
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = Cp(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: l,
          passive: c
        } = vp(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: l,
          passive: c
        });
      }
    }
  }
}
function er(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new Wd(t, e), t.gestureTimeoutStores[e] = new Jp();
}
function t3(t, e) {
  e.drag && er(t, "drag"), e.wheel && er(t, "wheel"), e.scroll && er(t, "scroll"), e.move && er(t, "move"), e.pinch && er(t, "pinch"), e.hover && er(t, "hover");
}
const Eu = (t, e, n) => (r, i, a, o = {}, l = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : e.capture, d = (u = o.passive) !== null && u !== void 0 ? u : e.passive;
  let m = l ? r : mp(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(a);
}, n3 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function r3(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    n3.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function tr(t, e, n, r, i, a) {
  if (!t.has(n) || !Ml.has(r))
    return;
  const o = n + "Start", l = n + "End", c = (u) => {
    let f;
    return u.first && o in e && e[o](u), n in e && (f = e[n](u)), u.last && l in e && e[l](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function i3(t, e) {
  const [n, r, i] = r3(t), a = {};
  return tr(i, n, "onDrag", "drag", a, e), tr(i, n, "onWheel", "wheel", a, e), tr(i, n, "onScroll", "scroll", a, e), tr(i, n, "onPinch", "pinch", a, e), tr(i, n, "onMove", "move", a, e), tr(i, n, "onHover", "hover", a, e), {
    handlers: a,
    config: e,
    nativeHandlers: r
  };
}
function Tl(t, e = {}, n, r) {
  const i = s.useMemo(() => new e3(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), s.useEffect(i.effect.bind(i)), s.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function Vt(t, e) {
  return Al(Bd), Tl({
    drag: t
  }, e || {}, "drag");
}
function a3(t, e) {
  return Al(zp), Tl({
    wheel: t
  }, e || {}, "wheel");
}
function o3(t) {
  return t.forEach(Al), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = i3(n, r || {});
    return Tl(i, o, void 0, a);
  };
}
const ta = "adm-popup", s3 = Object.assign(Object.assign({}, Pl), {
  closeOnSwipe: !1,
  position: "bottom"
}), jr = (t) => {
  const {
    locale: e,
    popup: n = {}
  } = fe(), r = G(s3, n, t), i = Z(`${ta}-body`, r.bodyClassName, `${ta}-body-position-${r.position}`), [a, o] = X(r.visible), l = W(null);
  ro(l, r.disableBodyScroll && a ? "strict" : !1), Ie(() => {
    r.visible && o(!0);
  }, [r.visible]);
  const c = hl(), {
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
  }), f = Vt(({
    swipe: [, p]
  }) => {
    var b;
    r.closeOnSwipe && (p === 1 && r.position === "bottom" || p === -1 && r.position === "top") && ((b = r.onClose) === null || b === void 0 || b.call(r));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(r.position)
  }), d = Nd(a && r.visible), m = hn(r.stopPropagation, H(r, s.createElement("div", Object.assign({
    className: ta,
    onClick: r.onClick,
    style: {
      display: a ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(r.position) ? "none" : "auto"
    }
  }, f()), r.mask && s.createElement(Vi, {
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
    className: Z(`${ta}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var p;
      (p = r.onClose) === null || p === void 0 || p.call(r);
    },
    role: "button",
    "aria-label": e.common.close
  }, r.closeIcon), r.children))));
  return s.createElement(Dr, {
    active: a,
    forceRender: r.forceRender,
    destroyOnClose: r.destroyOnClose
  }, Lr(r.getContainer, m));
}, wu = "adm-safe-area", Br = (t) => H(t, s.createElement("div", {
  className: Z(wu, `${wu}-position-${t.position}`)
}));
var yt = {};
Object.defineProperty(yt, "__esModule", {
  value: !0
});
yt.call = Il;
yt.default = void 0;
yt.note = qd;
yt.noteOnce = Ud;
yt.preMessage = void 0;
yt.resetWarned = Hd;
yt.warning = Zd;
yt.warningOnce = Bi;
var $s = {}, l3 = yt.preMessage = function(e) {
};
function Zd(t, e) {
}
function qd(t, e) {
}
function Hd() {
  $s = {};
}
function Il(t, e, n) {
  !e && !$s[n] && (t(!1, n), $s[n] = !0);
}
function Bi(t, e) {
  Il(Zd, t, e);
}
function Ud(t, e) {
  Il(qd, t, e);
}
Bi.preMessage = l3;
Bi.resetWarned = Hd;
Bi.noteOnce = Ud;
yt.default = Bi;
var Wi = {}, zd = { exports: {} }, Kd = { exports: {} };
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
})(Kd);
var wn = Kd.exports;
(function(t) {
  var e = wn.default;
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
})(zd);
var po = zd.exports, Yd = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Yd);
var Wr = Yd.exports, Gd = { exports: {} };
(function(t) {
  var e = wn.default;
  function n() {
    t.exports = n = function() {
      return i;
    }, t.exports.__esModule = !0, t.exports.default = t.exports;
    var r, i = {}, a = Object.prototype, o = a.hasOwnProperty, l = Object.defineProperty || function(_, O, L) {
      _[O] = L.value;
    }, c = typeof Symbol == "function" ? Symbol : {}, u = c.iterator || "@@iterator", f = c.asyncIterator || "@@asyncIterator", d = c.toStringTag || "@@toStringTag";
    function m(_, O, L) {
      return Object.defineProperty(_, O, {
        value: L,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), _[O];
    }
    try {
      m({}, "");
    } catch {
      m = function(L, B, j) {
        return L[B] = j;
      };
    }
    function p(_, O, L, B) {
      var j = O && O.prototype instanceof E ? O : E, q = Object.create(j.prototype), K = new $(B || []);
      return l(q, "_invoke", {
        value: P(_, L, K)
      }), q;
    }
    function b(_, O, L) {
      try {
        return {
          type: "normal",
          arg: _.call(O, L)
        };
      } catch (B) {
        return {
          type: "throw",
          arg: B
        };
      }
    }
    i.wrap = p;
    var y = "suspendedStart", g = "suspendedYield", h = "executing", x = "completed", v = {};
    function E() {
    }
    function w() {
    }
    function C() {
    }
    var k = {};
    m(k, u, function() {
      return this;
    });
    var F = Object.getPrototypeOf, M = F && F(F(A([])));
    M && M !== a && o.call(M, u) && (k = M);
    var S = C.prototype = E.prototype = Object.create(k);
    function V(_) {
      ["next", "throw", "return"].forEach(function(O) {
        m(_, O, function(L) {
          return this._invoke(O, L);
        });
      });
    }
    function I(_, O) {
      function L(j, q, K, z) {
        var ne = b(_[j], _, q);
        if (ne.type !== "throw") {
          var oe = ne.arg, U = oe.value;
          return U && e(U) == "object" && o.call(U, "__await") ? O.resolve(U.__await).then(function(ee) {
            L("next", ee, K, z);
          }, function(ee) {
            L("throw", ee, K, z);
          }) : O.resolve(U).then(function(ee) {
            oe.value = ee, K(oe);
          }, function(ee) {
            return L("throw", ee, K, z);
          });
        }
        z(ne.arg);
      }
      var B;
      l(this, "_invoke", {
        value: function(q, K) {
          function z() {
            return new O(function(ne, oe) {
              L(q, K, ne, oe);
            });
          }
          return B = B ? B.then(z, z) : z();
        }
      });
    }
    function P(_, O, L) {
      var B = y;
      return function(j, q) {
        if (B === h)
          throw new Error("Generator is already running");
        if (B === x) {
          if (j === "throw")
            throw q;
          return {
            value: r,
            done: !0
          };
        }
        for (L.method = j, L.arg = q; ; ) {
          var K = L.delegate;
          if (K) {
            var z = R(K, L);
            if (z) {
              if (z === v)
                continue;
              return z;
            }
          }
          if (L.method === "next")
            L.sent = L._sent = L.arg;
          else if (L.method === "throw") {
            if (B === y)
              throw B = x, L.arg;
            L.dispatchException(L.arg);
          } else
            L.method === "return" && L.abrupt("return", L.arg);
          B = h;
          var ne = b(_, O, L);
          if (ne.type === "normal") {
            if (B = L.done ? x : g, ne.arg === v)
              continue;
            return {
              value: ne.arg,
              done: L.done
            };
          }
          ne.type === "throw" && (B = x, L.method = "throw", L.arg = ne.arg);
        }
      };
    }
    function R(_, O) {
      var L = O.method, B = _.iterator[L];
      if (B === r)
        return O.delegate = null, L === "throw" && _.iterator.return && (O.method = "return", O.arg = r, R(_, O), O.method === "throw") || L !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + L + "' method")), v;
      var j = b(B, _.iterator, O.arg);
      if (j.type === "throw")
        return O.method = "throw", O.arg = j.arg, O.delegate = null, v;
      var q = j.arg;
      return q ? q.done ? (O[_.resultName] = q.value, O.next = _.nextLoc, O.method !== "return" && (O.method = "next", O.arg = r), O.delegate = null, v) : q : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, v);
    }
    function T(_) {
      var O = {
        tryLoc: _[0]
      };
      1 in _ && (O.catchLoc = _[1]), 2 in _ && (O.finallyLoc = _[2], O.afterLoc = _[3]), this.tryEntries.push(O);
    }
    function N(_) {
      var O = _.completion || {};
      O.type = "normal", delete O.arg, _.completion = O;
    }
    function $(_) {
      this.tryEntries = [{
        tryLoc: "root"
      }], _.forEach(T, this), this.reset(!0);
    }
    function A(_) {
      if (_ || _ === "") {
        var O = _[u];
        if (O)
          return O.call(_);
        if (typeof _.next == "function")
          return _;
        if (!isNaN(_.length)) {
          var L = -1, B = function j() {
            for (; ++L < _.length; )
              if (o.call(_, L))
                return j.value = _[L], j.done = !1, j;
            return j.value = r, j.done = !0, j;
          };
          return B.next = B;
        }
      }
      throw new TypeError(e(_) + " is not iterable");
    }
    return w.prototype = C, l(S, "constructor", {
      value: C,
      configurable: !0
    }), l(C, "constructor", {
      value: w,
      configurable: !0
    }), w.displayName = m(C, d, "GeneratorFunction"), i.isGeneratorFunction = function(_) {
      var O = typeof _ == "function" && _.constructor;
      return !!O && (O === w || (O.displayName || O.name) === "GeneratorFunction");
    }, i.mark = function(_) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(_, C) : (_.__proto__ = C, m(_, d, "GeneratorFunction")), _.prototype = Object.create(S), _;
    }, i.awrap = function(_) {
      return {
        __await: _
      };
    }, V(I.prototype), m(I.prototype, f, function() {
      return this;
    }), i.AsyncIterator = I, i.async = function(_, O, L, B, j) {
      j === void 0 && (j = Promise);
      var q = new I(p(_, O, L, B), j);
      return i.isGeneratorFunction(O) ? q : q.next().then(function(K) {
        return K.done ? K.value : q.next();
      });
    }, V(S), m(S, d, "Generator"), m(S, u, function() {
      return this;
    }), m(S, "toString", function() {
      return "[object Generator]";
    }), i.keys = function(_) {
      var O = Object(_), L = [];
      for (var B in O)
        L.push(B);
      return L.reverse(), function j() {
        for (; L.length; ) {
          var q = L.pop();
          if (q in O)
            return j.value = q, j.done = !1, j;
        }
        return j.done = !0, j;
      };
    }, i.values = A, $.prototype = {
      constructor: $,
      reset: function(O) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = r, this.done = !1, this.delegate = null, this.method = "next", this.arg = r, this.tryEntries.forEach(N), !O)
          for (var L in this)
            L.charAt(0) === "t" && o.call(this, L) && !isNaN(+L.slice(1)) && (this[L] = r);
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
        var L = this;
        function B(oe, U) {
          return K.type = "throw", K.arg = O, L.next = oe, U && (L.method = "next", L.arg = r), !!U;
        }
        for (var j = this.tryEntries.length - 1; j >= 0; --j) {
          var q = this.tryEntries[j], K = q.completion;
          if (q.tryLoc === "root")
            return B("end");
          if (q.tryLoc <= this.prev) {
            var z = o.call(q, "catchLoc"), ne = o.call(q, "finallyLoc");
            if (z && ne) {
              if (this.prev < q.catchLoc)
                return B(q.catchLoc, !0);
              if (this.prev < q.finallyLoc)
                return B(q.finallyLoc);
            } else if (z) {
              if (this.prev < q.catchLoc)
                return B(q.catchLoc, !0);
            } else {
              if (!ne)
                throw new Error("try statement without catch or finally");
              if (this.prev < q.finallyLoc)
                return B(q.finallyLoc);
            }
          }
        }
      },
      abrupt: function(O, L) {
        for (var B = this.tryEntries.length - 1; B >= 0; --B) {
          var j = this.tryEntries[B];
          if (j.tryLoc <= this.prev && o.call(j, "finallyLoc") && this.prev < j.finallyLoc) {
            var q = j;
            break;
          }
        }
        q && (O === "break" || O === "continue") && q.tryLoc <= L && L <= q.finallyLoc && (q = null);
        var K = q ? q.completion : {};
        return K.type = O, K.arg = L, q ? (this.method = "next", this.next = q.finallyLoc, v) : this.complete(K);
      },
      complete: function(O, L) {
        if (O.type === "throw")
          throw O.arg;
        return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && L && (this.next = L), v;
      },
      finish: function(O) {
        for (var L = this.tryEntries.length - 1; L >= 0; --L) {
          var B = this.tryEntries[L];
          if (B.finallyLoc === O)
            return this.complete(B.completion, B.afterLoc), N(B), v;
        }
      },
      catch: function(O) {
        for (var L = this.tryEntries.length - 1; L >= 0; --L) {
          var B = this.tryEntries[L];
          if (B.tryLoc === O) {
            var j = B.completion;
            if (j.type === "throw") {
              var q = j.arg;
              N(B);
            }
            return q;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(O, L, B) {
        return this.delegate = {
          iterator: A(O),
          resultName: L,
          nextLoc: B
        }, this.method === "next" && (this.arg = r), v;
      }
    }, i;
  }
  t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Gd);
var c3 = Gd.exports, Xd = { exports: {} };
(function(t) {
  function e(r, i, a, o, l, c, u) {
    try {
      var f = r[c](u), d = f.value;
    } catch (m) {
      a(m);
      return;
    }
    f.done ? i(d) : Promise.resolve(d).then(o, l);
  }
  function n(r) {
    return function() {
      var i = this, a = arguments;
      return new Promise(function(o, l) {
        var c = r.apply(i, a);
        function u(d) {
          e(c, o, l, u, f, "next", d);
        }
        function f(d) {
          e(c, o, l, u, f, "throw", d);
        }
        u(void 0);
      });
    };
  }
  t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Xd);
var u3 = Xd.exports, Qd = { exports: {} }, Jd = { exports: {} }, e1 = { exports: {} }, t1 = { exports: {} };
(function(t) {
  var e = wn.default;
  function n(r, i) {
    if (e(r) !== "object" || r === null)
      return r;
    var a = r[Symbol.toPrimitive];
    if (a !== void 0) {
      var o = a.call(r, i || "default");
      if (e(o) !== "object")
        return o;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (i === "string" ? String : Number)(r);
  }
  t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
})(t1);
var f3 = t1.exports;
(function(t) {
  var e = wn.default, n = f3;
  function r(i) {
    var a = n(i, "string");
    return e(a) === "symbol" ? a : String(a);
  }
  t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
})(e1);
var d3 = e1.exports;
(function(t) {
  var e = d3;
  function n(r, i, a) {
    return i = e(i), i in r ? Object.defineProperty(r, i, {
      value: a,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : r[i] = a, r;
  }
  t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Jd);
var m3 = Jd.exports;
(function(t) {
  var e = m3;
  function n(i, a) {
    var o = Object.keys(i);
    if (Object.getOwnPropertySymbols) {
      var l = Object.getOwnPropertySymbols(i);
      a && (l = l.filter(function(c) {
        return Object.getOwnPropertyDescriptor(i, c).enumerable;
      })), o.push.apply(o, l);
    }
    return o;
  }
  function r(i) {
    for (var a = 1; a < arguments.length; a++) {
      var o = arguments[a] != null ? arguments[a] : {};
      a % 2 ? n(Object(o), !0).forEach(function(l) {
        e(i, l, o[l]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(o)) : n(Object(o)).forEach(function(l) {
        Object.defineProperty(i, l, Object.getOwnPropertyDescriptor(o, l));
      });
    }
    return i;
  }
  t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Qd);
var h3 = Qd.exports, v3 = po.default, go = Wr.default;
Object.defineProperty(Wi, "__esModule", {
  value: !0
});
Wi._r = $3;
Wi._u = R3;
var p3 = Wi.render = S3, g3 = Wi.unmount = N3, Ba = go(c3), n1 = go(u3), y3 = go(wn), b3 = go(h3), E3 = v3(Fa), Zi = (0, b3.default)({}, E3), w3 = Zi.version, Uo = Zi.render, C3 = Zi.unmountComponentAtNode, yo;
try {
  var x3 = Number((w3 || "").split(".")[0]);
  x3 >= 18 && (yo = Zi.createRoot);
} catch {
}
function Cu(t) {
  var e = Zi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  e && (0, y3.default)(e) === "object" && (e.usingClientEntryPoint = t);
}
var Wa = "__rc_react_root__";
function k3(t, e) {
  Cu(!0);
  var n = e[Wa] || yo(e);
  Cu(!1), n.render(t), e[Wa] = n;
}
function _3(t, e) {
  Uo == null || Uo(t, e);
}
function $3(t, e) {
}
function S3(t, e) {
  if (yo) {
    k3(t, e);
    return;
  }
  _3(t, e);
}
function O3(t) {
  return Ss.apply(this, arguments);
}
function Ss() {
  return Ss = (0, n1.default)(/* @__PURE__ */ (0, Ba.default)().mark(function t(e) {
    return (0, Ba.default)().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.resolve().then(function() {
              var i;
              (i = e[Wa]) === null || i === void 0 || i.unmount(), delete e[Wa];
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), Ss.apply(this, arguments);
}
function F3(t) {
  C3(t);
}
function R3(t) {
}
function N3(t) {
  return Os.apply(this, arguments);
}
function Os() {
  return Os = (0, n1.default)(/* @__PURE__ */ (0, Ba.default)().mark(function t(e) {
    return (0, Ba.default)().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            if (yo === void 0) {
              r.next = 2;
              break;
            }
            return r.abrupt("return", O3(e));
          case 2:
            F3(e);
          case 3:
          case "end":
            return r.stop();
        }
    }, t);
  })), Os.apply(this, arguments);
}
const P3 = (t, e) => (p3(t, e), () => g3(e));
let xu = P3;
function M3(t) {
  return t && (xu = t), xu;
}
function qi(t) {
  const e = document.createElement("div");
  return document.body.appendChild(e), M3()(t, e);
}
function Un(t) {
  const e = s.forwardRef((i, a) => {
    const [o, l] = X(!1), c = W(!1), [u, f] = X(t), d = W(0);
    J(() => {
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
    return _e(a, () => ({
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
  }), n = s.createRef(), r = qi(s.createElement(e, {
    ref: n
  }));
  return {
    close: () => Me(this, void 0, void 0, function* () {
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
const qe = "adm-action-sheet", A3 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, r1 = (t) => {
  const e = G(A3, t), {
    styles: n
  } = e;
  return s.createElement(jr, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: Z(`${qe}-popup`, e.popupClassName),
    style: e.popupStyle,
    getContainer: e.getContainer,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, H(e, s.createElement("div", {
    className: qe
  }, e.extra && s.createElement("div", {
    className: `${qe}-extra`
  }, e.extra), s.createElement("div", {
    className: `${qe}-button-list`
  }, e.actions.map((r, i) => s.createElement("div", {
    key: r.key,
    className: `${qe}-button-item-wrapper`
  }, s.createElement("a", {
    className: Z("adm-plain-anchor", `${qe}-button-item`, {
      [`${qe}-button-item-danger`]: r.danger,
      [`${qe}-button-item-disabled`]: r.disabled,
      [`${qe}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var a, o, l;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = e.onAction) === null || o === void 0 || o.call(e, r, i), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, s.createElement("div", {
    className: `${qe}-button-item-name`
  }, r.text), r.description && s.createElement("div", {
    className: `${qe}-button-item-description`
  }, r.description))))), e.cancelText && s.createElement("div", {
    className: `${qe}-cancel`,
    role: "option",
    "aria-label": e.cancelText
  }, s.createElement("div", {
    className: `${qe}-button-item-wrapper`
  }, s.createElement("a", {
    className: Z("adm-plain-anchor", `${qe}-button-item`),
    onClick: e.onClose
  }, s.createElement("div", {
    className: `${qe}-button-item-name`
  }, e.cancelText)))), e.safeArea && s.createElement(Br, {
    position: "bottom"
  }))));
};
function T3(t) {
  return Un(s.createElement(r1, Object.assign({}, t)));
}
const V9 = pe(r1, {
  show: T3
}), ku = "adm-auto-center", $i = (t) => H(t, s.createElement("div", {
  className: ku
}, s.createElement("div", {
  className: `${ku}-content`
}, t.children))), I3 = He(() => s.createElement("svg", {
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
var Ll = {}, L3 = ht && ht.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty(Ll, "__esModule", { value: !0 });
var Dl = Ll.staged = void 0;
const D3 = L3(s);
function i1(t) {
  return typeof t == "function" ? D3.default.createElement(V3, { stage: t }) : t;
}
function V3(t) {
  const e = t.stage();
  return i1(e);
}
function j3(t) {
  return function(n, r) {
    const i = t(n, r);
    return i1(i);
  };
}
Dl = Ll.staged = j3;
function Tn(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const B3 = (t) => {
  const e = W(null), [n] = Dh(e);
  return J(() => {
    n && t.onActive();
  }, [n]), s.createElement("div", {
    ref: e
  });
}, Hi = If(Ie), W3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Z3 = () => s.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, s.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Za = "adm-image", q3 = {
  fit: "fill",
  placeholder: s.createElement("div", {
    className: `${Za}-tip`
  }, s.createElement(W3, null)),
  fallback: s.createElement("div", {
    className: `${Za}-tip`
  }, s.createElement(Z3, null)),
  lazy: !1,
  draggable: !1
}, bo = Dl((t) => {
  const e = G(q3, t), [n, r] = X(!1), [i, a] = X(!1), o = W(null), l = W(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = X(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, Hi(() => {
    r(!1), a(!1);
  }, [c]), J(() => {
    var b;
    !((b = l.current) === null || b === void 0) && b.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return s.createElement(s.Fragment, null, e.fallback);
    const b = s.createElement("img", {
      ref: l,
      id: e.id,
      className: `${Za}-img`,
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
  return e.width && (p["--width"] = Tn(e.width), p.width = Tn(e.width)), e.height && (p["--height"] = Tn(e.height), p.height = Tn(e.height)), H(e, s.createElement("div", {
    ref: o,
    className: Za,
    style: p,
    onClick: e.onContainerClick
  }, e.lazy && !f && s.createElement(B3, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), H3 = "adm-avatar", U3 = {
  fallback: s.createElement(I3, null),
  fit: "cover"
}, j9 = (t) => {
  const e = G(U3, t);
  return H(e, s.createElement(bo, {
    className: H3,
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
}, nr = "adm-badge", a1 = s.createElement(s.Fragment, null), z3 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === a1, a = Z(nr, {
    [`${nr}-fixed`]: !!r,
    [`${nr}-dot`]: i,
    [`${nr}-bordered`]: t.bordered
  }), o = e || e === 0 ? H(t, s.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && s.createElement("div", {
    className: `${nr}-content`
  }, e))) : null;
  return r ? s.createElement("div", {
    className: Z(`${nr}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, o) : o;
}, Fs = pe(z3, {
  dot: a1
}), K3 = "adm-dot-loading", Y3 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, G3 = {
  color: "default"
}, o1 = He((t) => {
  var e;
  const n = G(G3, t);
  return H(n, s.createElement("div", {
    style: {
      color: (e = Y3[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: Z("adm-loading", K3)
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
function s1(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function X3() {
  return Mr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const st = "adm-button", Q3 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: s.createElement(o1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, zt = Ee((t, e) => {
  const n = G(Q3, t), [r, i] = X(!1), a = W(null), o = n.loading === "auto" ? r : n.loading, l = n.disabled || o;
  _e(e, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Me(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (s1(f))
      try {
        i(!0), yield f, i(!1);
      } catch (d) {
        throw i(!1), d;
      }
  });
  return H(n, s.createElement("button", {
    ref: a,
    type: n.type,
    form: n.form,
    onClick: c,
    className: Z(st, {
      [`${st}-${n.color}`]: n.color,
      [`${st}-block`]: n.block,
      [`${st}-disabled`]: l,
      [`${st}-fill-outline`]: n.fill === "outline",
      [`${st}-fill-none`]: n.fill === "none",
      [`${st}-mini`]: n.size === "mini",
      [`${st}-small`]: n.size === "small",
      [`${st}-large`]: n.size === "large",
      [`${st}-loading`]: o
    }, `${st}-shape-${n.shape}`),
    disabled: l,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? s.createElement("div", {
    className: `${st}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : s.createElement("span", null, n.children)));
});
var l1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
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
})(l1);
var J3 = l1.exports;
const Eo = /* @__PURE__ */ $t(J3);
function eg(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function ue(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = Bf(), a = W(e !== void 0 ? e : n);
  e !== void 0 && (a.current = e);
  const o = Gt((l, c = !1) => {
    const u = typeof l == "function" ? l(a.current) : l;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
const _u = () => s.createElement("svg", {
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
})))))), $u = () => s.createElement("svg", {
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
function Su(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function zo(t) {
  return se().year(t.year).month(t.month - 1).date(1);
}
se.extend(Eo);
const we = "adm-calendar", tg = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: s.createElement(_u, null),
  prevYearButton: s.createElement($u, null),
  nextMonthButton: s.createElement(_u, null),
  nextYearButton: s.createElement($u, null)
}, B9 = Ee((t, e) => {
  const n = se(), r = G(tg, t), {
    locale: i
  } = fe(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const v = a.pop();
    v && a.unshift(v);
  }
  const [o, l] = ue({
    value: r.value === void 0 ? void 0 : Su(r.selectionMode, r.value),
    defaultValue: Su(r.selectionMode, r.defaultValue),
    onChange: (v) => {
      var E, w;
      r.selectionMode === "single" ? (E = r.onChange) === null || E === void 0 || E.call(r, v ? v[0] : null) : r.selectionMode === "range" && ((w = r.onChange) === null || w === void 0 || w.call(r, v));
    }
  }), [c, u] = X(!1), [f, d] = X(() => se(o ? o[0] : n).date(1));
  ul(() => {
    var v;
    (v = r.onPageChange) === null || v === void 0 || v.call(r, f.year(), f.month() + 1);
  }, [f]), _e(e, () => ({
    jumpTo: (v) => {
      let E;
      typeof v == "function" ? E = v({
        year: f.year(),
        month: f.month() + 1
      }) : E = v, d(zo(E));
    },
    jumpToToday: () => {
      d(se().date(1));
    }
  }));
  const m = (v, E, w) => {
    const C = f[v](E, w);
    if (v === "subtract" && r.minPage) {
      const k = zo(r.minPage);
      if (C.isBefore(k, w))
        return;
    }
    if (v === "add" && r.maxPage) {
      const k = zo(r.maxPage);
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
  }, eg(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), s.createElement("a", {
    className: Z(`${we}-arrow-button`, `${we}-arrow-button-right`, `${we}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), s.createElement("a", {
    className: Z(`${we}-arrow-button`, `${we}-arrow-button-right`, `${we}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), b = me(() => r.max && se(r.max), [r.max]), y = me(() => r.min && se(r.min), [r.min]);
  function g() {
    var v;
    const E = [];
    let w = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (w = w.add(1, "day")); E.length < 6 * 7; ) {
      const C = w;
      let k = !1, F = !1, M = !1, S = !1, V = !1;
      if (o) {
        const [N, $] = o;
        F = C.isSame(N, "day"), M = C.isSame($, "day"), k = F || M || C.isAfter(N, "day") && C.isBefore($, "day"), k && (S = (E.length % 7 === 0 || C.isSame(C.startOf("month"), "day")) && !F, V = (E.length % 7 === 6 || C.isSame(C.endOf("month"), "day")) && !M);
      }
      const I = C.month() === f.month(), P = r.shouldDisableDate ? r.shouldDisableDate(C.toDate()) : b && C.isAfter(b, "day") || y && C.isBefore(y, "day"), R = s.createElement("div", {
        key: C.valueOf(),
        className: Z(`${we}-cell`, (P || !I) && `${we}-cell-disabled`, I && {
          [`${we}-cell-today`]: C.isSame(n, "day"),
          [`${we}-cell-selected`]: k,
          [`${we}-cell-selected-begin`]: F,
          [`${we}-cell-selected-end`]: M,
          [`${we}-cell-selected-row-begin`]: S,
          [`${we}-cell-selected-row-end`]: V
        }),
        onClick: () => {
          if (!r.selectionMode || P)
            return;
          const N = C.toDate();
          I || d(C.clone().date(1));
          function $() {
            if (!r.allowClear || !o)
              return !1;
            const [A, _] = o;
            return C.isSame(A, "date") && C.isSame(_, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && $()) {
              l(null);
              return;
            }
            l([N, N]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              l([N, N]), u(!0);
              return;
            }
            if ($()) {
              l(null), u(!1);
              return;
            }
            if (c) {
              const A = o[0];
              l(A > N ? [N, A] : [A, N]), u(!1);
            } else
              l([N, N]), u(!0);
          }
        }
      }, s.createElement("div", {
        className: `${we}-cell-top`
      }, r.renderDate ? r.renderDate(C.toDate()) : C.date()), s.createElement("div", {
        className: `${we}-cell-bottom`
      }, (v = r.renderLabel) === null || v === void 0 ? void 0 : v.call(r, C.toDate()))), T = r.cellRender ? s.createElement(s.Fragment, {
        key: C.valueOf()
      }, r.cellRender(R, {
        date: C.toDate()
      })) : R;
      E.push(T), w = w.add(1, "day");
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
  return H(r, s.createElement("div", {
    className: we
  }, p, x, h));
});
var c1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, a) {
        return this.isSame(i, a) || this.isBefore(i, a);
      };
    };
  });
})(c1);
var ng = c1.exports;
const rg = /* @__PURE__ */ $t(ng);
function Ou(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function ig(t) {
  return se().year(t.year).month(t.month - 1).date(1);
}
function qa(t) {
  var e = D.useRef();
  e.current = t;
  var n = D.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(a));
  }, []);
  return n;
}
function u1(t) {
  if (Array.isArray(t))
    return t;
}
function ag(t, e) {
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
function Rs(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function Vl(t, e) {
  if (t) {
    if (typeof t == "string")
      return Rs(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Rs(t, e);
  }
}
function f1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Fe(t, e) {
  return u1(t) || ag(t, e) || Vl(t, e) || f1();
}
function wo() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Fu = wo() ? D.useLayoutEffect : D.useEffect, d1 = function(e, n) {
  var r = D.useRef(!0);
  Fu(function() {
    return e(r.current);
  }, n), Fu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, Ru = function(e, n) {
  d1(function(r) {
    if (!r)
      return e();
  }, n);
};
function wr(t) {
  var e = D.useRef(!1), n = D.useState(t), r = Fe(n, 2), i = r[0], a = r[1];
  D.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function o(l, c) {
    c && e.current || a(l);
  }
  return [i, o];
}
function Ko(t) {
  return t !== void 0;
}
function m1(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, l = wr(function() {
    return Ko(i) ? i : Ko(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = Fe(l, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, p = qa(a), b = wr([d]), y = Fe(b, 2), g = y[0], h = y[1];
  Ru(function() {
    var v = g[0];
    u !== v && p(u, v);
  }, [g]), Ru(function() {
    Ko(i) || f(i);
  }, [i]);
  var x = qa(function(v, E) {
    f(v, E), h([d], E);
  });
  return [m, x];
}
function ke(t) {
  "@babel/helpers - typeof";
  return ke = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, ke(t);
}
var h1 = { exports: {} }, ge = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var jl = Symbol.for("react.element"), Bl = Symbol.for("react.portal"), Co = Symbol.for("react.fragment"), xo = Symbol.for("react.strict_mode"), ko = Symbol.for("react.profiler"), _o = Symbol.for("react.provider"), $o = Symbol.for("react.context"), og = Symbol.for("react.server_context"), So = Symbol.for("react.forward_ref"), Oo = Symbol.for("react.suspense"), Fo = Symbol.for("react.suspense_list"), Ro = Symbol.for("react.memo"), No = Symbol.for("react.lazy"), sg = Symbol.for("react.offscreen"), v1;
v1 = Symbol.for("react.module.reference");
function bt(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case jl:
        switch (t = t.type, t) {
          case Co:
          case ko:
          case xo:
          case Oo:
          case Fo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case og:
              case $o:
              case So:
              case No:
              case Ro:
              case _o:
                return t;
              default:
                return e;
            }
        }
      case Bl:
        return e;
    }
  }
}
ge.ContextConsumer = $o;
ge.ContextProvider = _o;
ge.Element = jl;
ge.ForwardRef = So;
ge.Fragment = Co;
ge.Lazy = No;
ge.Memo = Ro;
ge.Portal = Bl;
ge.Profiler = ko;
ge.StrictMode = xo;
ge.Suspense = Oo;
ge.SuspenseList = Fo;
ge.isAsyncMode = function() {
  return !1;
};
ge.isConcurrentMode = function() {
  return !1;
};
ge.isContextConsumer = function(t) {
  return bt(t) === $o;
};
ge.isContextProvider = function(t) {
  return bt(t) === _o;
};
ge.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === jl;
};
ge.isForwardRef = function(t) {
  return bt(t) === So;
};
ge.isFragment = function(t) {
  return bt(t) === Co;
};
ge.isLazy = function(t) {
  return bt(t) === No;
};
ge.isMemo = function(t) {
  return bt(t) === Ro;
};
ge.isPortal = function(t) {
  return bt(t) === Bl;
};
ge.isProfiler = function(t) {
  return bt(t) === ko;
};
ge.isStrictMode = function(t) {
  return bt(t) === xo;
};
ge.isSuspense = function(t) {
  return bt(t) === Oo;
};
ge.isSuspenseList = function(t) {
  return bt(t) === Fo;
};
ge.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === Co || t === ko || t === xo || t === Oo || t === Fo || t === sg || typeof t == "object" && t !== null && (t.$$typeof === No || t.$$typeof === Ro || t.$$typeof === _o || t.$$typeof === $o || t.$$typeof === So || t.$$typeof === v1 || t.getModuleId !== void 0);
};
ge.typeOf = bt;
h1.exports = ge;
var Vn = h1.exports, lg = Symbol.for("react.element"), cg = Symbol.for("react.transitional.element"), ug = Symbol.for("react.fragment");
function p1(t) {
  return (
    // Base object type
    t && ke(t) === "object" && // React Element type
    (t.$$typeof === lg || t.$$typeof === cg) && // React Fragment type
    t.type === ug
  );
}
var fg = Number(lm.split(".")[0]), g1 = function(e, n) {
  typeof e == "function" ? e(n) : ke(e) === "object" && e && "current" in e && (e.current = n);
}, y1 = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  var i = n.filter(Boolean);
  return i.length <= 1 ? i[0] : function(a) {
    n.forEach(function(o) {
      g1(o, a);
    });
  };
}, dg = function(e) {
  var n, r;
  if (!e)
    return !1;
  if (mg(e) && fg >= 19)
    return !0;
  var i = Vn.isMemo(e) ? e.type.type : e.type;
  return !(typeof i == "function" && !((n = i.prototype) !== null && n !== void 0 && n.render) && i.$$typeof !== Vn.ForwardRef || typeof e == "function" && !((r = e.prototype) !== null && r !== void 0 && r.render) && e.$$typeof !== Vn.ForwardRef);
};
function mg(t) {
  return /* @__PURE__ */ bn(t) && !p1(t);
}
function _t(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function hg(t, e) {
  if (ke(t) !== "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (ke(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function b1(t) {
  var e = hg(t, "string");
  return ke(e) === "symbol" ? e : String(e);
}
function he(t, e, n) {
  return e = b1(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Nu(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    e && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(t, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Q(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Nu(Object(n), !0).forEach(function(r) {
      he(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Nu(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function vg(t) {
  if (Array.isArray(t))
    return Rs(t);
}
function E1(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function pg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ve(t) {
  return vg(t) || E1(t) || Vl(t) || pg();
}
function gg(t) {
  return u1(t) || E1(t) || Vl(t) || f1();
}
function w1(t, e, n, r) {
  if (!e.length)
    return n;
  var i = gg(e), a = i[0], o = i.slice(1), l;
  return !t && typeof a == "number" ? l = [] : Array.isArray(t) ? l = ve(t) : l = Q({}, t), r && n === void 0 && o.length === 1 ? delete l[a][o[0]] : l[a] = w1(l[a], o, n, r), l;
}
function wt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !_t(t, e.slice(0, -1)) ? t : w1(t, e, n, r);
}
function yg(t) {
  return ke(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function Pu(t) {
  return Array.isArray(t) ? [] : {};
}
var bg = typeof Reflect > "u" ? Object.keys : Reflect.ownKeys;
function li() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = Pu(e[0]);
  return e.forEach(function(i) {
    function a(o, l) {
      var c = new Set(l), u = _t(i, o), f = Array.isArray(u);
      if (f || yg(u)) {
        if (!c.has(u)) {
          c.add(u);
          var d = _t(r, o);
          f ? r = wt(r, o, []) : (!d || ke(d) !== "object") && (r = wt(r, o, Pu(u))), bg(u).forEach(function(m) {
            a([].concat(ve(o), [m]), c);
          });
        }
      } else
        r = wt(r, o, u);
    }
    a([]);
  }), r;
}
var Ns = {}, Eg = function(e) {
};
function wg(t, e) {
}
function Cg(t, e) {
}
function xg() {
  Ns = {};
}
function C1(t, e, n) {
  !e && !Ns[n] && (t(!1, n), Ns[n] = !0);
}
function vt(t, e) {
  C1(wg, t, e);
}
function kg(t, e) {
  C1(Cg, t, e);
}
vt.preMessage = Eg;
vt.resetWarned = xg;
vt.noteOnce = kg;
function _g(t, e, n) {
  const r = W(), i = () => {
    r.current && cancelAnimationFrame(r.current);
  }, a = qa((o) => {
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
  return J(() => {
    if (e && t)
      return a(t), i;
  }, [t, e]), a;
}
se.extend(Eo);
se.extend(rg);
const Ne = "adm-calendar-picker-view", x1 = s.createContext({
  visible: !1
}), $g = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, Sg = Ee((t, e) => {
  var n;
  const r = W(null), i = se(), a = G($g, t), {
    locale: o
  } = fe(), l = [...o.Calendar.markItems];
  if (a.weekStartsOn === "Sunday") {
    const I = l.pop();
    I && l.unshift(I);
  }
  const [c, u] = ue({
    value: a.value === void 0 ? void 0 : Ou(a.selectionMode, a.value),
    defaultValue: Ou(a.selectionMode, a.defaultValue),
    onChange: (I) => {
      var P, R;
      a.selectionMode === "single" ? (P = a.onChange) === null || P === void 0 || P.call(a, I ? I[0] : null) : a.selectionMode === "range" && ((R = a.onChange) === null || R === void 0 || R.call(a, I));
    }
  }), [f, d] = X(!1), [m, p] = X(() => se(c ? c[0] : i).date(1)), b = (I) => {
    I && p(se(I[0]).date(1)), u(I);
  }, y = a.title !== !1, g = at(x1), h = _g(m, g.visible, r), [x, v] = X(m), [E, w] = X(() => m.add(6, "month"));
  J(() => {
    if (c) {
      const [I, P] = c;
      !a.min && I && se(I).isBefore(x) && v(se(I).date(1)), !a.max && P && se(P).isAfter(E) && w(se(P).endOf("month"));
    }
  }, [c]);
  const C = me(() => a.max ? se(a.max) : E, [a.max, E]), k = me(() => a.min ? se(a.min) : x, [a.min, x]);
  _e(e, () => ({
    jumpTo: (I) => {
      let P;
      typeof I == "function" ? P = I({
        year: m.year(),
        month: m.month() + 1
      }) : P = I;
      const R = ig(P);
      p(R), h(R);
    },
    jumpToToday: () => {
      const I = se().date(1);
      p(I), h(I);
    },
    getDateRange: () => c
  }));
  const F = s.createElement("div", {
    className: `${Ne}-header`
  }, s.createElement("div", {
    className: `${Ne}-title`
  }, (n = a.title) !== null && n !== void 0 ? n : o.Calendar.title));
  function M() {
    var I;
    const P = [];
    let R = k;
    for (; R.isSameOrBefore(C, "month"); ) {
      const T = R.year(), N = R.month() + 1, $ = {
        year: T,
        month: N
      }, A = `${T}-${N}`, _ = a.weekStartsOn === "Monday" ? R.date(1).isoWeekday() - 1 : R.date(1).isoWeekday(), O = _ == 7 ? null : Array(_).fill(null).map((L, B) => s.createElement("div", {
        key: B,
        className: `${Ne}-cell`
      }));
      P.push(s.createElement("div", {
        key: A,
        "data-year-month": A
      }, s.createElement("div", {
        className: `${Ne}-title`
      }, (I = o.Calendar.yearAndMonth) === null || I === void 0 ? void 0 : I.replace(/\${(.*?)}/g, (L, B) => {
        var j;
        return (j = $[B]) === null || j === void 0 ? void 0 : j.toString();
      })), s.createElement("div", {
        className: `${Ne}-cells`
      }, O, Array(R.daysInMonth()).fill(null).map((L, B) => {
        const j = R.date(B + 1);
        let q = !1, K = !1, z = !1, ne = !1, oe = !1;
        if (c) {
          const [re, ae] = c;
          K = j.isSame(re, "day"), z = j.isSame(ae, "day"), q = K || z || j.isAfter(re, "day") && j.isBefore(ae, "day"), q && (ne = (P.length % 7 === 0 || j.isSame(j.startOf("month"), "day")) && !K, oe = (P.length % 7 === 6 || j.isSame(j.endOf("month"), "day")) && !z);
        }
        const U = a.shouldDisableDate ? a.shouldDisableDate(j.toDate()) : C && j.isAfter(C, "day") || k && j.isBefore(k, "day"), ee = () => {
          var re;
          if (a.renderTop === !1)
            return null;
          const ae = (xe) => s.createElement("div", {
            className: `${Ne}-cell-top`
          }, xe), de = (re = a.renderTop) === null || re === void 0 ? void 0 : re.call(a, j.toDate());
          if (de)
            return ae(de);
          if (a.selectionMode === "range") {
            if (K && z)
              return ae(o.Calendar.startAndEnd);
            if (K)
              return ae(o.Calendar.start);
            if (z)
              return ae(o.Calendar.end);
          }
          return j.isSame(i, "day") && !q ? ae(o.Calendar.today) : ae(null);
        }, te = () => {
          var re;
          return a.renderBottom === !1 ? null : s.createElement("div", {
            className: `${Ne}-cell-bottom`
          }, (re = a.renderBottom) === null || re === void 0 ? void 0 : re.call(a, j.toDate()));
        };
        return s.createElement("div", {
          key: j.valueOf(),
          className: Z(`${Ne}-cell`, {
            [`${Ne}-cell-today`]: j.isSame(i, "day"),
            [`${Ne}-cell-selected`]: q,
            [`${Ne}-cell-selected-begin`]: K,
            [`${Ne}-cell-selected-end`]: z,
            [`${Ne}-cell-selected-row-begin`]: ne,
            [`${Ne}-cell-selected-row-end`]: oe,
            [`${Ne}-cell-disabled`]: !!U
          }),
          onClick: () => {
            if (!a.selectionMode || U)
              return;
            const re = j.toDate();
            function ae() {
              if (!a.allowClear || !c)
                return !1;
              const [de, xe] = c;
              return j.isSame(de, "date") && j.isSame(xe, "day");
            }
            if (a.selectionMode === "single") {
              if (a.allowClear && ae()) {
                b(null);
                return;
              }
              b([re, re]);
            } else if (a.selectionMode === "range") {
              if (!c) {
                b([re, re]), d(!0);
                return;
              }
              if (ae()) {
                b(null), d(!1);
                return;
              }
              if (f) {
                const de = c[0];
                b(de > re ? [re, de] : [de, re]), d(!1);
              } else
                b([re, re]), d(!0);
            }
          }
        }, ee(), s.createElement("div", {
          className: `${Ne}-cell-date`
        }, a.renderDate ? a.renderDate(j.toDate()) : j.date()), te());
      })))), R = R.add(1, "month");
    }
    return P;
  }
  const S = s.createElement("div", {
    className: `${Ne}-body`,
    ref: r
  }, M()), V = s.createElement("div", {
    className: `${Ne}-mark`
  }, l.map((I, P) => s.createElement("div", {
    key: P,
    className: `${Ne}-mark-cell`
  }, I)));
  return H(a, s.createElement("div", {
    className: Ne
  }, y && F, V, S));
}), na = "adm-divider", Og = {
  contentPosition: "center",
  direction: "horizontal"
}, Ps = (t) => {
  const e = G(Og, t);
  return H(e, s.createElement("div", {
    className: Z(na, `${na}-${e.direction}`, `${na}-${e.contentPosition}`)
  }, e.children && s.createElement("div", {
    className: `${na}-content`
  }, e.children)));
}, ra = "adm-calendar-picker", Fg = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, W9 = Ee((t, e) => {
  const n = G(Fg, t), {
    locale: r
  } = fe(), i = e ?? W(null), {
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
  } = n, g = dn(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), h = s.useMemo(() => ({
    visible: !!a
  }), [a]), x = s.createElement("div", {
    className: `${ra}-footer`
  }, s.createElement(Ps, null), s.createElement("div", {
    className: `${ra}-footer-bottom`
  }, s.createElement(zt, {
    color: "primary",
    onClick: () => {
      var v, E, w, C;
      const k = (E = (v = i.current) === null || v === void 0 ? void 0 : v.getDateRange()) !== null && E !== void 0 ? E : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, k ? k[0] : null) : n.selectionMode === "range" && ((C = n.onConfirm) === null || C === void 0 || C.call(n, k)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return H(n, s.createElement("div", {
    className: ra
  }, s.createElement(jr, {
    visible: a,
    className: Z(`${ra}-popup`, l),
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
  }, s.createElement(x1.Provider, {
    value: h
  }, s.createElement(Sg, Object.assign({
    ref: i
  }, g))), x)));
});
function Ui(t, e) {
  const n = Gt(t);
  Ie(() => {
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
function k1(t, e, n) {
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
function Wl(t, e, n) {
  const r = Gt(t);
  J(() => k1(e.current, n, r), [e]);
}
function Re(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const _1 = (t, e) => {
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
    const y = Re(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: y,
      from: {
        scrollLeft: p
      },
      immediate: a && !n.isAnimating
    });
  }
  return Ie(() => {
    i(!0);
  }, []), Hi(() => {
    i();
  }, [e]), Wl(() => {
    i(!0);
  }, t, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, ia = "adm-scroll-mask", $1 = (t) => {
  const e = W(null), [{
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
  } = no((o = !1) => {
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
  return J(() => {
    a(!0);
  }, []), J(() => {
    const o = t.scrollTrackRef.current;
    if (o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), s.createElement(s.Fragment, null, s.createElement(Ce.div, {
    ref: e,
    className: Z(ia, `${ia}-left`),
    style: {
      opacity: n
    }
  }), s.createElement(Ce.div, {
    className: Z(ia, `${ia}-right`),
    style: {
      opacity: r
    }
  }));
};
function Cn(t, e) {
  let n = 0;
  function r(i) {
    s.Children.forEach(i, (a) => {
      Vn.isFragment(a) ? r(a.props.children) : (e(a, n), n += 1);
    });
  }
  r(t);
}
const Jt = "adm-capsule-tabs", Rg = () => null, Ng = (t) => {
  var e;
  const n = W(null), r = W(null), i = {};
  let a = null;
  const o = [];
  Cn(t.children, (d, m) => {
    if (!bn(d))
      return;
    const p = d.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const b = o.push(d);
    i[p] = b - 1;
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
  } = _1(n, i[l]);
  return Ui(() => {
    f(!0);
  }, r), H(t, s.createElement("div", {
    className: Jt,
    ref: r
  }, s.createElement("div", {
    className: `${Jt}-header`
  }, s.createElement($1, {
    scrollTrackRef: n
  }), s.createElement(Ce.div, {
    className: `${Jt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => H(d.props, s.createElement("div", {
    key: d.key,
    className: `${Jt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: Z(`${Jt}-tab`, {
      [`${Jt}-tab-active`]: d.key === l,
      [`${Jt}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(Dr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Jt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, Z9 = pe(Ng, {
  Tab: Rg
}), rr = "adm-card", q9 = (t) => {
  const e = () => t.title || t.extra ? s.createElement("div", {
    className: Z(`${rr}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, t.icon && s.createElement("div", {
    className: `${rr}-header-icon`
  }, t.icon), s.createElement("div", {
    className: `${rr}-header-title`
  }, t.title), t.extra && s.createElement("div", {
    className: `${rr}-header-extra`
  }, t.extra)) : null, n = () => t.children ? s.createElement("div", {
    className: Z(`${rr}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return H(t, s.createElement("div", {
    className: rr,
    onClick: t.onClick
  }, e(), n()));
};
function Mu(t, e, n) {
  return t * e * n / (e + n * t);
}
function Si(t, e, n, r, i = 0.15) {
  return i === 0 ? Re(t, e, n) : t < e ? -Mu(e - t, r, i) + e : t > n ? +Mu(t - n, r, i) + n : t;
}
var Pg = typeof Element < "u", Mg = typeof Map == "function", Ag = typeof Set == "function", Tg = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function _a(t, e) {
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
        if (!_a(t[r], e[r]))
          return !1;
      return !0;
    }
    var a;
    if (Mg && t instanceof Map && e instanceof Map) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!_a(r.value[1], e.get(r.value[0])))
          return !1;
      return !0;
    }
    if (Ag && t instanceof Set && e instanceof Set) {
      if (t.size !== e.size)
        return !1;
      for (a = t.entries(); !(r = a.next()).done; )
        if (!e.has(r.value[0]))
          return !1;
      return !0;
    }
    if (Tg && ArrayBuffer.isView(t) && ArrayBuffer.isView(e)) {
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
    if (Pg && t instanceof Element)
      return !1;
    for (r = n; r-- !== 0; )
      if (!((i[r] === "_owner" || i[r] === "__v" || i[r] === "__o") && t.$$typeof) && !_a(t[i[r]], e[i[r]]))
        return !1;
    return !0;
  }
  return t !== t && e !== e;
}
var Ig = function(e, n) {
  try {
    return _a(e, n);
  } catch (r) {
    if ((r.message || "").match(/stack|recursion/i))
      return console.warn("react-fast-compare cannot handle circular refs"), !1;
    throw r;
  }
};
const Ms = /* @__PURE__ */ $t(Ig);
function S1(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const Ot = "adm-picker-view", O1 = He((t) => {
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
  })), l = W(!1), c = W(null), u = W(null), f = W(34);
  Ie(() => {
    const h = u.current;
    h && (f.current = S1(window.getComputedStyle(h).getPropertyValue("height")));
  }), Ie(() => {
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
  }, [e, n]), Ie(() => {
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
      const F = k + C * E * 50, M = Re(F, x, v), S = -Math.round(M / f.current);
      d(S);
    } else {
      const F = k;
      o.start({
        y: Si(F, x, v, f.current * 50, 0.2)
      });
    }
  }, b = (h) => {
    l.current = !0;
    const x = -((n.length - 1) * f.current), v = 0, {
      direction: E,
      last: w,
      velocity: C,
      distance: k
    } = m(h), F = -E, M = a.get();
    if (w) {
      l.current = !1;
      const S = C * F * 50, V = M + k * F + S, I = Re(V, x, v), P = -Math.round(I / f.current);
      d(P);
    } else {
      const S = M + k * F;
      o.start({
        y: Si(S, x, v, f.current * 50, 0.2)
      });
    }
  };
  Vt((h) => {
    h.event.stopPropagation(), p(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), a3((h) => {
    h.event.stopPropagation(), b(h);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Zn ? {
      passive: !1
    } : void 0
  });
  let y = null;
  function g() {
    if (y === null)
      return null;
    const h = n[y], x = y - 1, v = y + 1, E = n[x], w = n[v];
    return s.createElement("div", {
      className: `${Ot}-column-accessible`
    }, s.createElement("div", {
      className: `${Ot}-column-accessible-current`,
      role: "button",
      "aria-label": h ? `当前选择的是：${h.label}` : "当前未选择"
    }, "-"), s.createElement("div", {
      className: `${Ot}-column-accessible-button`,
      onClick: () => {
        E && d(x);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择上一项：${E.label}` : "没有上一项"
    }, "-"), s.createElement("div", {
      className: `${Ot}-column-accessible-button`,
      onClick: () => {
        w && d(v);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择下一项：${w.label}` : "没有下一项"
    }, "-"));
  }
  return s.createElement("div", {
    className: `${Ot}-column`
  }, s.createElement("div", {
    className: `${Ot}-item-height-measure`,
    ref: u
  }), s.createElement(Ce.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${Ot}-column-wheel`,
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
      className: Z(`${Ot}-column-item`, {
        [`${Ot}-column-item-active`]: E
      }),
      onClick: w,
      "aria-hidden": !E,
      "aria-label": E ? "active" : ""
    }, s.createElement("div", {
      className: `${Ot}-column-item-label`
    }, r(h)));
  })), g());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !Ms(t.column, e.column)));
O1.displayName = "Wheel";
function Au(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function F1(t, e) {
  const n = Au(() => (typeof t == "function" ? t(e) : t).map((o) => o.map((l) => typeof l == "string" ? {
    label: l,
    value: l
  } : l))), r = Au(() => e.map((a, o) => {
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
function R1(t, e) {
  return me(() => F1(t, e), [t, e]);
}
const N1 = (t) => t.label;
var P1 = { exports: {} }, M1 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sr = s;
function Lg(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var Dg = typeof Object.is == "function" ? Object.is : Lg, Vg = Sr.useState, jg = Sr.useEffect, Bg = Sr.useLayoutEffect, Wg = Sr.useDebugValue;
function Zg(t, e) {
  var n = e(), r = Vg({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return Bg(function() {
    i.value = n, i.getSnapshot = e, Yo(i) && a({ inst: i });
  }, [t, n, e]), jg(function() {
    return Yo(i) && a({ inst: i }), t(function() {
      Yo(i) && a({ inst: i });
    });
  }, [t]), Wg(n), n;
}
function Yo(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Dg(t, n);
  } catch {
    return !0;
  }
}
function qg(t, e) {
  return e();
}
var Hg = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? qg : Zg;
M1.useSyncExternalStore = Sr.useSyncExternalStore !== void 0 ? Sr.useSyncExternalStore : Hg;
P1.exports = M1;
var Ug = P1.exports;
let Zl = !1;
const As = /* @__PURE__ */ new Set();
function A1() {
  As.forEach((t) => {
    t();
  });
}
function H9() {
  Zl = !0, A1(), pt.assign({
    skipAnimation: !0
  });
}
function U9() {
  Zl = !1, A1(), pt.assign({
    skipAnimation: !1
  });
}
function Tu() {
  return Zl;
}
function zg(t) {
  return As.add(t), () => {
    As.delete(t);
  };
}
function Kg() {
  return Ug.useSyncExternalStore(zg, Tu, Tu);
}
const Go = "adm-spin-loading", Yg = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, Gg = {
  color: "default"
}, Xg = 15 * 3.14159265358979 * 2, ql = He((t) => {
  var e;
  const n = G(Gg, t), r = Kg(), {
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
  return H(n, s.createElement(Ce.div, {
    className: Go,
    style: {
      "--color": (e = Yg[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, s.createElement("svg", {
    className: `${Go}-svg`,
    viewBox: "0 0 32 32"
  }, s.createElement(Ce.circle, {
    className: `${Go}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: Xg,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), vr = "adm-picker-view", Qg = {
  defaultValue: [],
  renderLabel: N1,
  mouseWheel: !1,
  loadingContent: s.createElement("div", {
    className: `${vr}-loading-content`
  }, s.createElement(ql, null))
}, Po = He((t) => {
  const e = G(Qg, t), [n, r] = X(e.value === void 0 ? e.defaultValue : e.value);
  J(() => {
    e.value !== void 0 && e.value !== n && r(e.value);
  }, [e.value]), J(() => {
    if (e.value === n)
      return;
    const l = window.setTimeout(() => {
      e.value !== void 0 && e.value !== n && r(e.value);
    }, 1e3);
    return () => {
      window.clearTimeout(l);
    };
  }, [e.value, n]);
  const i = R1(e.columns, n), a = i.columns;
  Ih(() => {
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
  return H(e, s.createElement("div", {
    className: `${vr}`
  }, e.loading ? e.loadingContent : s.createElement(s.Fragment, null, a.map((l, c) => s.createElement(O1, {
    key: c,
    index: c,
    column: l,
    value: n[c],
    onSelect: o,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), s.createElement("div", {
    className: `${vr}-mask`
  }, s.createElement("div", {
    className: `${vr}-mask-top`
  }), s.createElement("div", {
    className: `${vr}-mask-middle`
  }), s.createElement("div", {
    className: `${vr}-mask-bottom`
  })))));
});
Po.displayName = "PickerView";
const en = "adm-picker", Jg = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: N1,
  destroyOnClose: !1,
  forceRender: !1
}, Hl = He(Ee((t, e) => {
  var n;
  const {
    locale: r
  } = fe(), i = G(Jg, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [a, o] = ue({
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
  _e(e, () => l);
  const [c, u] = ue(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var h;
      const x = F1(i.columns, g);
      (h = i.onConfirm) === null || h === void 0 || h.call(i, g, x);
    }
  })), f = R1(i.columns, c), [d, m] = X(c);
  J(() => {
    d !== c && m(c);
  }, [a]), J(() => {
    a || m(c);
  }, [c]);
  const p = Gt((g, h) => {
    var x;
    m(g), a && ((x = i.onSelect) === null || x === void 0 || x.call(i, g, h));
  }), b = H(i, s.createElement("div", {
    className: en
  }, s.createElement("div", {
    className: `${en}-header`
  }, s.createElement("a", {
    role: "button",
    className: `${en}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${en}-header-title`
  }, i.title), s.createElement("a", {
    role: "button",
    className: Z(`${en}-header-button`, i.loading && `${en}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), s.createElement("div", {
    className: `${en}-body`
  }, s.createElement(Po, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: p
  })))), y = s.createElement(jr, {
    style: i.popupStyle,
    className: Z(`${en}-popup`, i.popupClassName),
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
  }, b, s.createElement(Br, {
    position: "bottom"
  }));
  return s.createElement(s.Fragment, null, y, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, l));
}));
Hl.displayName = "Picker";
function e4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return J(() => {
        a(!0);
      }, []), s.createElement(Hl, Object.assign({}, t, {
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
    }, r = qi(s.createElement(n, null));
  });
}
const T1 = pe(Hl, {
  prompt: e4
});
function I1(t) {
  const e = me(() => {
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
const L1 = Ee((t, e) => {
  const {
    options: n
  } = t, r = dn(t, ["options"]), i = I1(n);
  return s.createElement(T1, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function t4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return J(() => {
        a(!0);
      }, []), s.createElement(L1, Object.assign({}, t, {
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
    }, r = qi(s.createElement(n, null));
  });
}
const z9 = pe(L1, {
  prompt: t4
}), K9 = (t) => {
  const {
    options: e
  } = t, n = dn(t, ["options"]), r = I1(e);
  return s.createElement(Po, Object.assign({}, n, {
    columns: r
  }));
}, Ke = "adm-tabs", n4 = () => null, r4 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, i4 = (t) => {
  var e;
  const n = G(r4, t), r = W(null), i = W(null), a = W({}), o = {};
  let l = null;
  const c = [], u = n.direction === "rtl";
  Cn(n.children, (k, F) => {
    if (!bn(k))
      return;
    const M = k.key;
    if (typeof M != "string")
      return;
    F === 0 && (l = M);
    const S = c.push(k);
    o[M] = S - 1;
  });
  const [f, d] = ue({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : l,
    onChange: (k) => {
      var F;
      k !== null && ((F = n.onChange) === null || F === void 0 || F.call(n, k));
    }
  }), [{
    x: m,
    width: p
  }, b] = Le(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: y
  }, g] = Le(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: h,
    rightMaskOpacity: x
  }, v] = Le(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function E(k = !1, F = !1) {
    const M = r.current;
    if (!M)
      return;
    const S = o[f];
    if (S === void 0) {
      b.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const V = i.current;
    if (!V)
      return;
    const I = M.children.item(S + 1), P = I.children.item(0), R = P.offsetLeft, T = P.offsetWidth, N = I.offsetLeft, $ = I.offsetWidth, A = M.offsetWidth, _ = M.scrollWidth, O = M.scrollLeft, L = V.offsetWidth;
    let B = 0, j = 0;
    if (n.activeLineMode === "auto" ? (B = R, j = T) : n.activeLineMode === "full" ? (B = N, j = $) : B = R + (T - L) / 2, u) {
      const z = ["auto", "full"].includes(n.activeLineMode) ? j : L;
      B = -(A - B - z);
    }
    b.start({
      x: B,
      width: j,
      immediate: k
    });
    const q = _ - A;
    if (q <= 0)
      return;
    let K = 0;
    u ? K = -Re(A / 2 - R + T / 2 - L, 0, q) : K = Re(R - (A - T) / 2, 0, q), (!F || n.autoScroll !== !1) && g.start({
      scrollLeft: K,
      from: {
        scrollLeft: O
      },
      immediate: k
    });
  }
  Ie(() => {
    E(!m.isAnimating);
  }, []), Hi(() => {
    E();
  }, [f, u, n.activeLineMode]), Ui(() => {
    E(!m.isAnimating);
  }, r), Wl(() => {
    E(!m.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: w
  } = no((k) => {
    const F = r.current;
    if (!F)
      return;
    const M = F.scrollLeft;
    let S = !1, V = !1;
    u ? (S = Math.round(-M) + F.offsetWidth < F.scrollWidth, V = M < 0) : (S = M > 0, V = M + F.offsetWidth < F.scrollWidth), v.start({
      leftMaskOpacity: S ? 1 : 0,
      rightMaskOpacity: V ? 1 : 0,
      immediate: k
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  Ie(() => {
    w(!0);
  }, []);
  const C = (k) => {
    const F = Object.keys(o), M = o[f], S = u ? k.key === "ArrowLeft" : k.key === "ArrowRight", V = u ? k.key === "ArrowRight" : k.key === "ArrowLeft", R = ((T, N) => {
      const $ = F.length;
      for (let A = 0; A < $; A++) {
        const _ = (T + N * (A + 1) + $) % $, O = F[_], L = c.find((B) => B.key === O);
        if (!(L != null && L.props.disabled))
          return O;
      }
      return F[T];
    })(M, S ? 1 : -1);
    (S || V) && (k.preventDefault(), d(R));
  };
  return J(() => {
    var k;
    f && a.current[f] && ((k = a.current[f]) === null || k === void 0 || k.focus());
  }, [f]), H(n, s.createElement("div", {
    className: Ke,
    style: {
      direction: n.direction
    }
  }, s.createElement("div", {
    className: `${Ke}-header`
  }, s.createElement(Ce.div, {
    className: Z(`${Ke}-header-mask`, `${Ke}-header-mask-left`),
    style: {
      opacity: h
    }
  }), s.createElement(Ce.div, {
    className: Z(`${Ke}-header-mask`, `${Ke}-header-mask-right`),
    style: {
      opacity: x
    }
  }), s.createElement(Ce.div, {
    className: `${Ke}-tab-list`,
    ref: r,
    scrollLeft: y,
    onScroll: w,
    onKeyDown: C,
    role: "tablist"
  }, s.createElement(Ce.div, {
    ref: i,
    className: `${Ke}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : p,
      x: m
    }
  }), c.map((k) => H(k.props, s.createElement("div", {
    key: k.key,
    className: Z(`${Ke}-tab-wrapper`, {
      [`${Ke}-tab-wrapper-stretch`]: n.stretch
    })
  }, s.createElement("div", {
    role: "tab",
    "aria-selected": k.key === f,
    tabIndex: k.key === f ? 0 : -1,
    ref: (F) => a.current[k.key] = F,
    onClick: () => {
      const {
        key: F
      } = k;
      k.props.disabled || F != null && d(F.toString());
    },
    className: Z(`${Ke}-tab`, {
      [`${Ke}-tab-active`]: k.key === f,
      [`${Ke}-tab-disabled`]: k.props.disabled
    })
  }, k.props.title)))))), c.map((k) => {
    if (k.props.children === void 0)
      return null;
    const F = k.key === f;
    return s.createElement(Dr, {
      key: k.key,
      active: F,
      forceRender: k.props.forceRender,
      destroyOnClose: k.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Ke}-content`,
      style: {
        display: F ? "block" : "none"
      }
    }, k.props.children));
  })));
}, Iu = pe(i4, {
  Tab: n4
}), Gr = "adm-list", a4 = {
  mode: "default"
}, o4 = Ee((t, e) => {
  const n = G(a4, t), r = W(null);
  return _e(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), H(n, s.createElement("div", {
    className: Z(Gr, `${Gr}-${n.mode}`),
    ref: r
  }, n.header && s.createElement("div", {
    className: `${Gr}-header`
  }, n.header), s.createElement("div", {
    className: `${Gr}-body`
  }, s.createElement("div", {
    className: `${Gr}-body-inner`
  }, n.children))));
});
function un(t) {
  return t != null && t !== !1;
}
const Bt = "adm-list-item", s4 = (t) => {
  var e, n;
  const {
    arrow: r,
    arrowIcon: i
  } = t, {
    list: a = {}
  } = fe(), o = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, l = (n = r ?? i) !== null && n !== void 0 ? n : o, c = En(a.arrowIcon, r !== !0 ? r : null, i !== !0 ? i : null), u = s.createElement("div", {
    className: `${Bt}-content`
  }, un(t.prefix) && s.createElement("div", {
    className: `${Bt}-content-prefix`
  }, t.prefix), s.createElement("div", {
    className: `${Bt}-content-main`
  }, un(t.title) && s.createElement("div", {
    className: `${Bt}-title`
  }, t.title), t.children, un(t.description) && s.createElement("div", {
    className: `${Bt}-description`
  }, t.description)), un(t.extra) && s.createElement("div", {
    className: `${Bt}-content-extra`
  }, t.extra), l && s.createElement("div", {
    className: `${Bt}-content-arrow`
  }, c || s.createElement(ip, null)));
  return H(t, s.createElement(o ? "a" : "div", {
    className: Z(`${Bt}`, o ? ["adm-plain-anchor"] : [], t.disabled && `${Bt}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, u));
}, Tt = pe(o4, {
  Item: s4
}), D1 = ll(null), l4 = "adm-check-list", c4 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: s.createElement(Fd, null)
}, u4 = (t) => {
  const {
    checkList: e = {}
  } = fe(), n = G(c4, e, t), [r, i] = ue(n);
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
  return s.createElement(D1.Provider, {
    value: {
      value: r,
      check: a,
      uncheck: o,
      activeIcon: l,
      extra: c,
      disabled: u,
      readOnly: f
    }
  }, H(n, s.createElement(Tt, {
    mode: n.mode,
    className: l4
  }, n.children)));
}, aa = "adm-check-list-item", f4 = (t) => {
  const e = at(D1);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, a = e.extra ? e.extra(n) : i, o = s.createElement("div", {
    className: `${aa}-extra`
  }, a);
  return H(t, s.createElement(Tt.Item, {
    title: t.title,
    className: Z(aa, r && `${aa}-readonly`, n && `${aa}-active`),
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
}, Lu = pe(u4, {
  Item: f4
});
function d4(t) {
  var e = t + "", n = e.indexOf("...");
  return n >= 0 && (n < e.indexOf(")") || e.indexOf("arguments") >= 0);
}
function Du(t, e) {
  e || (e = {});
  var n = e.vargs || d4(t), r = [], i = /* @__PURE__ */ new Map(), a, o, l = function(p) {
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
function V1(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = me(() => Du((l) => {
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
    equals: Ms
  }), [t]), a = me(() => Du((l) => l.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, {
    equals: Ms
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
const Ul = [];
function m4(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const Oi = "adm-skeleton", zl = (t) => H(t, s.createElement("div", {
  className: Z(Oi, {
    [`${Oi}-animated`]: t.animated
  })
})), h4 = (t) => H(t, s.createElement(zl, {
  animated: t.animated,
  className: `${Oi}-title`
})), v4 = {
  lineCount: 3
}, p4 = (t) => {
  const e = G(v4, t), n = m4(1, e.lineCount), r = s.createElement("div", {
    className: `${Oi}-paragraph`
  }, n.map((i) => s.createElement(zl, {
    key: i,
    animated: e.animated,
    className: `${Oi}-paragraph-line`
  })));
  return H(e, r);
}, oa = pe(zl, {
  Title: h4,
  Paragraph: p4
}), zi = (t = {}) => me(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = t;
  return [n, r, a, i];
}, [JSON.stringify(t)]), Et = "adm-cascader-view", g4 = {
  defaultValue: []
}, y4 = (t) => {
  const e = G(g4, t), {
    locale: n
  } = fe(), [r, i, a, o] = zi(e.fieldNames), l = V1(e.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = ue(Object.assign(Object.assign({}, e), {
    onChange: (g) => {
      var h;
      (h = e.onChange) === null || h === void 0 || h.call(e, g, l(g));
    }
  })), [f, d] = X(0), m = me(() => {
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
  ul(() => {
    var g;
    (g = e.onTabsChange) === null || g === void 0 || g.call(e, f);
  }, [f]), J(() => {
    d(m.length - 1);
  }, [c]), J(() => {
    const g = m.length - 1;
    f > g && d(g);
  }, [f, m]);
  const p = (g, h) => {
    const x = c.slice(0, h);
    g !== void 0 && (x[h] = g), u(x);
  }, b = (g) => e.loading || g === Ul, y = e.placeholder || n.Cascader.placeholder;
  return H(e, s.createElement("div", {
    className: Et
  }, s.createElement(Iu, {
    activeKey: f.toString(),
    onChange: (g) => {
      const h = parseInt(g);
      d(h);
    },
    stretch: !1,
    className: `${Et}-tabs`
  }, m.map((g, h) => {
    const x = g.selected;
    return s.createElement(Iu.Tab, {
      key: h.toString(),
      title: s.createElement("div", {
        className: `${Et}-header-title`
      }, x ? x[r] : typeof y == "function" ? y(h) : y),
      forceRender: !0
    }, s.createElement("div", {
      className: `${Et}-content`
    }, b(g.options) ? s.createElement("div", {
      className: `${Et}-skeleton`
    }, s.createElement(oa, {
      className: `${Et}-skeleton-line-1`,
      animated: !0
    }), s.createElement(oa, {
      className: `${Et}-skeleton-line-2`,
      animated: !0
    }), s.createElement(oa, {
      className: `${Et}-skeleton-line-3`,
      animated: !0
    }), s.createElement(oa, {
      className: `${Et}-skeleton-line-4`,
      animated: !0
    })) : s.createElement(Lu, {
      value: [c[h]],
      onChange: (v) => p(v[0], h),
      activeIcon: e.activeIcon
    }, g.options.map((v) => {
      const E = c[h] === v[i];
      return s.createElement(Lu.Item, {
        value: v[i],
        key: v[i],
        disabled: v[o],
        className: Z(`${Et}-item`, {
          [`${Et}-item-active`]: E
        })
      }, v[r]);
    }))));
  }))));
}, b4 = pe(y4, {
  optionSkeleton: Ul
}), ir = "adm-cascader", E4 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, j1 = Ee((t, e) => {
  var n;
  const {
    locale: r
  } = fe(), i = G(E4, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [a, o] = ue({
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
  _e(e, () => l);
  const [c, u] = ue(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var x;
      (x = i.onConfirm) === null || x === void 0 || x.call(i, h, m(h));
    }
  })), [, f, d] = zi(i.fieldNames), m = V1(i.options, {
    valueName: f,
    childrenName: d
  }), [p, b] = X(c);
  J(() => {
    a || b(c);
  }, [a, c]);
  const y = H(i, s.createElement("div", {
    className: ir
  }, s.createElement("div", {
    className: `${ir}-header`
  }, s.createElement("a", {
    className: `${ir}-header-button`,
    onClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    }
  }, i.cancelText), s.createElement("div", {
    className: `${ir}-header-title`
  }, i.title), s.createElement("a", {
    className: `${ir}-header-button`,
    onClick: () => {
      u(p, !0), o(!1);
    }
  }, i.confirmText)), s.createElement("div", {
    className: `${ir}-body`
  }, s.createElement(b4, Object.assign({}, i, {
    value: p,
    onChange: (h, x) => {
      var v;
      b(h), a && ((v = i.onSelect) === null || v === void 0 || v.call(i, h, x));
    }
  }))))), g = s.createElement(jr, {
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
function w4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return J(() => {
        a(!0);
      }, []), s.createElement(j1, Object.assign({}, t, {
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
    }, r = qi(s.createElement(n, null));
  });
}
const Y9 = pe(j1, {
  prompt: w4,
  optionSkeleton: Ul
}), Xr = "adm-center-popup", C4 = Object.assign(Object.assign({}, Pl), {
  getContainer: null
}), B1 = (t) => {
  const {
    popup: e = {}
  } = fe(), n = G(C4, e, t), r = hl(), i = Le({
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
  Ie(() => {
    n.visible && o(!0);
  }, [n.visible]);
  const l = W(null);
  ro(l, n.disableBodyScroll && a);
  const c = Nd(a && n.visible), u = s.createElement("div", {
    className: Z(`${Xr}-body`, n.bodyClassName),
    style: n.bodyStyle
  }, n.children), f = hn(n.stopPropagation, H(n, s.createElement("div", {
    className: Xr,
    style: {
      display: a ? void 0 : "none",
      pointerEvents: a ? void 0 : "none"
    }
  }, n.mask && s.createElement(Vi, {
    visible: c,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose,
    onMaskClick: (d) => {
      var m, p;
      (m = n.onMaskClick) === null || m === void 0 || m.call(n, d), n.closeOnMaskClick && ((p = n.onClose) === null || p === void 0 || p.call(n));
    },
    style: n.maskStyle,
    className: Z(`${Xr}-mask`, n.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: n.stopPropagation
  }), s.createElement("div", {
    className: `${Xr}-wrap`,
    role: n.role,
    "aria-label": n["aria-label"]
  }, s.createElement(Ce.div, {
    style: Object.assign(Object.assign({}, i), {
      pointerEvents: i.opacity.to((d) => d === 1 ? "unset" : "none")
    }),
    ref: l
  }, n.showCloseButton && s.createElement("a", {
    className: Z(`${Xr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = n.onClose) === null || d === void 0 || d.call(n);
    }
  }, n.closeIcon), u)))));
  return s.createElement(Dr, {
    active: a,
    forceRender: n.forceRender,
    destroyOnClose: n.destroyOnClose
  }, Lr(n.getContainer, f));
}, W1 = ll(null), x4 = {
  disabled: !1,
  defaultValue: []
}, k4 = (t) => {
  const e = G(x4, t), [n, r] = ue(e);
  return s.createElement(
    W1.Provider,
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
}, Z1 = He((t) => H(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), _4 = He((t) => H(t, s.createElement("svg", {
  viewBox: "0 0 40 40"
}, s.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), q1 = (t) => {
  const e = W(null), n = Gt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== t.checked && t.onChange(i);
  });
  return J(() => {
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
}, tn = "adm-checkbox", $4 = {
  defaultChecked: !1,
  indeterminate: !1
}, S4 = Ee((t, e) => {
  const n = at(W1), r = G($4, t);
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
  }, o = o || n.disabled), _e(e, () => ({
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
    className: `${tn}-custom-icon`
  }, r.icon(i, r.indeterminate)) : s.createElement("div", {
    className: `${tn}-icon`
  }, r.indeterminate ? s.createElement(_4, null) : i && s.createElement(Z1, null));
  return H(r, s.createElement("label", {
    onClick: r.onClick,
    className: Z(tn, {
      [`${tn}-checked`]: i && !r.indeterminate,
      [`${tn}-indeterminate`]: r.indeterminate,
      [`${tn}-disabled`]: o,
      [`${tn}-block`]: r.block
    })
  }, s.createElement(q1, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && s.createElement("div", {
    className: `${tn}-content`
  }, r.children)));
}), Vu = pe(S4, {
  Group: k4
}), In = "adm-collapse", O4 = () => null, F4 = (t) => {
  const {
    visible: e
  } = t, n = W(null), r = mo(e, t.forceRender, t.destroyOnClose), [{
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
  return $h(() => {
    if (!e)
      return;
    const o = n.current;
    o && a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Hi(() => {
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
        return c = k1(o, {
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
    className: Z(`${In}-panel-content`, {
      [`${In}-panel-content-active`]: e
    }),
    style: {
      height: i.to((o) => i.idle && e ? "auto" : o)
    }
  }, s.createElement("div", {
    className: `${In}-panel-content-inner`,
    ref: n
  }, s.createElement(Tt.Item, null, r && t.children)));
}, R4 = (t) => {
  const {
    collapse: e = {}
  } = fe(), n = G(e, t), r = [];
  Cn(n.children, (c) => {
    !bn(c) || typeof c.key != "string" || r.push(c);
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
  return H(n, s.createElement("div", {
    className: In
  }, s.createElement(Tt, null, r.map((c) => {
    const u = c.key, f = l.includes(u);
    function d(b) {
      var y, g;
      n.accordion ? o(f ? [] : [u]) : o(f ? l.filter((h) => h !== u) : [...l, u]), (g = (y = c.props).onClick) === null || g === void 0 || g.call(y, b);
    }
    const m = En(s.createElement(Rd, null), n.arrow, n.arrowIcon, c.props.arrow, c.props.arrowIcon), p = typeof m == "function" ? m(f) : s.createElement("div", {
      className: Z(`${In}-arrow`, {
        [`${In}-arrow-active`]: f
      })
    }, m);
    return s.createElement(s.Fragment, {
      key: u
    }, H(c.props, s.createElement(Tt.Item, {
      className: `${In}-panel-header`,
      onClick: d,
      disabled: c.props.disabled,
      arrowIcon: p
    }, c.props.title)), s.createElement(F4, {
      visible: f,
      forceRender: !!c.props.forceRender,
      destroyOnClose: !!c.props.destroyOnClose
    }, c.props.children));
  }))));
}, G9 = pe(R4, {
  Panel: O4
});
var H1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(H1);
var N4 = H1.exports;
const U1 = /* @__PURE__ */ $t(N4);
var z1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(z1);
var P4 = z1.exports;
const K1 = /* @__PURE__ */ $t(P4), jn = "TILL_NOW";
se.extend(Eo);
se.extend(K1);
se.extend(U1);
const nn = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function M4(t, e, n, r, i, a, o) {
  const l = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), p = e.getSeconds(), b = n.getFullYear(), y = n.getMonth() + 1, g = n.getDate(), h = n.getHours(), x = n.getMinutes(), v = n.getSeconds(), E = nn[r], w = parseInt(t[0]), C = se(Ts([t[0], t[1], "1"])), k = parseInt(t[1]), F = parseInt(t[2]), M = parseInt(t[3]), S = parseInt(t[4]), V = parseInt(t[5]), I = w === c, P = w === b, R = I && k === u, T = P && k === y, N = R && F === f, $ = T && F === g, A = N && M === d, _ = $ && M === h, O = A && S === m, L = _ && S === x, B = (j, q, K) => {
    let z = [];
    for (let U = j; U <= q; U++)
      z.push(U);
    const ne = t.slice(0, nn[K]), oe = a == null ? void 0 : a[K];
    return oe && typeof oe == "function" && (z = z.filter((U) => oe(U, {
      get date() {
        const ee = [...ne, U.toString()];
        return Ts(ee);
      }
    }))), z;
  };
  if (E >= nn.year) {
    const K = B(c, b, "year");
    l.push(K.map((z) => ({
      label: i("year", z, {
        selected: w === z
      }),
      value: z.toString()
    })));
  }
  if (E >= nn.month) {
    const K = B(I ? u : 1, P ? y : 12, "month");
    l.push(K.map((z) => ({
      label: i("month", z, {
        selected: k === z
      }),
      value: z.toString()
    })));
  }
  if (E >= nn.day) {
    const j = R ? f : 1, q = T ? g : C.daysInMonth(), K = B(j, q, "day");
    l.push(K.map((z) => ({
      label: i("day", z, {
        selected: F === z
      }),
      value: z.toString()
    })));
  }
  if (E >= nn.hour) {
    const K = B(N ? d : 0, $ ? h : 23, "hour");
    l.push(K.map((z) => ({
      label: i("hour", z, {
        selected: M === z
      }),
      value: z.toString()
    })));
  }
  if (E >= nn.minute) {
    const K = B(A ? m : 0, _ ? x : 59, "minute");
    l.push(K.map((z) => ({
      label: i("minute", z, {
        selected: S === z
      }),
      value: z.toString()
    })));
  }
  if (E >= nn.second) {
    const K = B(O ? p : 0, L ? v : 59, "second");
    l.push(K.map((z) => ({
      label: i("second", z, {
        selected: V === z
      }),
      value: z.toString()
    })));
  }
  if (o && (l[0].push({
    label: i("now", null, {
      selected: t[0] === jn
    }),
    value: jn
  }), jn === (t == null ? void 0 : t[0])))
    for (let j = 1; j < l.length; j += 1)
      l[j] = [];
  return l;
}
function A4(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function Ts(t) {
  var e, n, r, i, a, o;
  const l = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (a = t[4]) !== null && a !== void 0 ? a : "0", m = (o = t[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(l), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
var Y1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
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
})(Y1);
var T4 = Y1.exports;
const I4 = /* @__PURE__ */ $t(T4);
se.extend(I4);
const sa = {
  year: 0,
  quarter: 1
};
function L4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = sa[r], f = parseInt(t[0]), d = f === l, m = f === c, p = se(e), b = se(n), y = p.quarter(), g = b.quarter(), h = parseInt(t[1]), x = (v, E, w) => {
    let C = [];
    for (let M = v; M <= E; M++)
      C.push(M);
    const k = t.slice(0, sa[w]), F = a == null ? void 0 : a[w];
    return F && typeof F == "function" && (C = C.filter((M) => F(M, {
      get date() {
        const S = [...k, M.toString()];
        return G1(S);
      }
    }))), C;
  };
  if (u >= sa.year) {
    const w = x(l, c, "year");
    o.push(w.map((C) => ({
      label: i("year", C, {
        selected: f === C
      }),
      value: C.toString()
    })));
  }
  if (u >= sa.quarter) {
    const w = x(d ? y : 1, m ? g : 4, "quarter");
    o.push(w.map((C) => ({
      label: i("quarter", C, {
        selected: h === C
      }),
      value: C.toString()
    })));
  }
  return o;
}
function D4(t) {
  if (!t)
    return [];
  const e = se(t);
  return [e.year().toString(), e.quarter().toString()];
}
function G1(t) {
  var e, n;
  const r = (e = t[0]) !== null && e !== void 0 ? e : "1900", i = (n = t[1]) !== null && n !== void 0 ? n : "1";
  return se().year(parseInt(r)).quarter(parseInt(i)).hour(0).minute(0).second(0).toDate();
}
se.extend(Eo);
se.extend(K1);
se.extend(U1);
const Qr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function V4(t, e, n, r, i, a) {
  const o = [], l = e.getFullYear(), c = n.getFullYear(), u = Qr[r], f = parseInt(t[0]), d = f === l, m = f === c, p = se(e), b = se(n), y = p.isoWeek(), g = b.isoWeek(), h = p.isoWeekday(), x = b.isoWeekday(), v = parseInt(t[1]), E = parseInt(t[2]), w = d && v === y, C = m && v === g, k = se(`${f}-01-01`).isoWeeksInYear(), F = (M, S, V) => {
    let I = [];
    for (let T = M; T <= S; T++)
      I.push(T);
    const P = t.slice(0, Qr[V]), R = a == null ? void 0 : a[V];
    return R && typeof R == "function" && (I = I.filter((T) => R(T, {
      get date() {
        const N = [...P, T.toString()];
        return X1(N);
      }
    }))), I;
  };
  if (u >= Qr.year) {
    const V = F(l, c, "year");
    o.push(V.map((I) => ({
      label: i("year", I, {
        selected: f === I
      }),
      value: I.toString()
    })));
  }
  if (u >= Qr.week) {
    const V = F(d ? y : 1, m ? g : k, "week");
    o.push(V.map((I) => ({
      label: i("week", I, {
        selected: v === I
      }),
      value: I.toString()
    })));
  }
  if (u >= Qr["week-day"]) {
    const V = F(w ? h : 1, C ? x : 7, "week-day");
    o.push(V.map((I) => ({
      label: i("week-day", I, {
        selected: E === I
      }),
      value: I.toString()
    })));
  }
  return o;
}
function j4(t) {
  if (!t)
    return [];
  const e = se(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function X1(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", a = (n = t[1]) !== null && n !== void 0 ? n : "1", o = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return se(`${parseInt(i)}-01-04`).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const B4 = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, Q1 = (t, e) => {
  if (e.includes("week"))
    return j4(t);
  if (e.includes("quarter"))
    return D4(t);
  {
    const n = e;
    return A4(t).slice(0, B4[n]);
  }
}, Is = (t, e) => {
  if ((t == null ? void 0 : t[0]) === jn) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? X1(t) : e.includes("quarter") ? G1(t) : Ts(t);
}, J1 = (t, e, n, r, i, a, o) => r.startsWith("week") ? V4(t, e, n, r, i, a) : r.startsWith("quarter") ? L4(t, e, n, r, i, a) : M4(t, e, n, r, i, a, o);
function e0(t) {
  const {
    locale: e
  } = fe();
  return Qe((n, r, i) => {
    if (t)
      return t(n, r, i);
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
const ju = (/* @__PURE__ */ new Date()).getFullYear(), W4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(ju - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(ju + 10)),
  precision: "day",
  defaultValue: null
}, t0 = Ee((t, e) => {
  const n = G(W4, t), {
    renderLabel: r
  } = n, [i, a] = ue({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var p;
      m !== null && ((p = n.onConfirm) === null || p === void 0 || p.call(n, m));
    }
  }), o = me(() => /* @__PURE__ */ new Date(), []), l = e0(r), c = me(() => {
    let m = i ?? o;
    return m.tillNow ? [jn] : (m = new Date(Re(m.getTime(), n.min.getTime(), n.max.getTime())), Q1(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Qe((m) => {
    const p = Is(m, n.precision);
    a(p, !0);
  }, [a, n.precision]), f = Gt((m) => {
    var p;
    const b = Is(m, n.precision);
    (p = n.onSelect) === null || p === void 0 || p.call(n, b);
  }), d = Qe((m) => J1(m, n.min, n.max, n.precision, l, n.filter, n.tillNow), [n.min, n.max, n.precision, l, n.tillNow]);
  return H(n, s.createElement(T1, {
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
function Z4(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = X(!1);
      return J(() => {
        a(!0);
      }, []), s.createElement(t0, Object.assign({}, t, {
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
    }, r = qi(s.createElement(n, null));
  });
}
const X9 = pe(t0, {
  prompt: Z4,
  DATE_NOW: jn
}), Bu = (/* @__PURE__ */ new Date()).getFullYear(), q4 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Bu - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Bu + 10)),
  precision: "day"
}, Q9 = (t) => {
  var e;
  const n = G(q4, t), {
    renderLabel: r
  } = n, [i, a] = ue({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), o = e0(r), l = me(() => i != null && i.tillNow ? [jn, null, null] : Q1(i, n.precision), [i, n.precision]), c = Qe((u) => {
    var f;
    const d = Is(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return H(n, s.createElement(Po, {
    columns: (u) => J1(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: l,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, H4 = (t) => {
  const {
    action: e
  } = t;
  return H(t.action, s.createElement(zt, {
    key: e.key,
    onClick: t.onAction,
    className: Z("adm-dialog-button", {
      "adm-dialog-button-bold": e.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, U4 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, n0 = (t) => {
  const e = G(U4, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Ft("image-container")
  }, s.createElement(bo, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Ft("header")
  }, s.createElement($i, null, e.header)), !!e.title && s.createElement("div", {
    className: Ft("title")
  }, e.title), s.createElement("div", {
    className: Z(Ft("content"), !e.content && Ft("content-empty"))
  }, typeof e.content == "string" ? s.createElement($i, null, e.content) : e.content), s.createElement("div", {
    className: Ft("footer")
  }, e.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return s.createElement("div", {
      className: Ft("action-row"),
      key: i
    }, a.map((o, l) => s.createElement(H4, {
      key: o.key,
      action: o,
      onAction: () => Me(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, o, l)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return s.createElement(B1, {
    className: Z(Ft(), e.className),
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
    bodyClassName: Z(Ft("body"), e.image && Ft("with-image"), e.bodyClassName),
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
function Ft(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const Ls = /* @__PURE__ */ new Set();
function Kl(t) {
  const e = Un(s.createElement(n0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Ls.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Ls.add(e.close), e;
}
function z4(t) {
  const e = {
    confirmText: Ai().locale.Dialog.ok
  }, n = G(e, t);
  return new Promise((r) => {
    Kl(Object.assign(Object.assign({}, n), {
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
const K4 = {
  confirmText: "确认",
  cancelText: "取消"
};
function Y4(t) {
  const {
    locale: e
  } = Ai(), n = G(K4, {
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
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Me(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Me(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function G4() {
  Ls.forEach((t) => {
    t();
  });
}
const J9 = pe(n0, {
  show: Kl,
  alert: z4,
  confirm: Y4,
  clear: G4
}), r0 = s.createContext(null), Ut = "adm-dropdown-item", X4 = (t) => {
  const {
    dropdown: e = {}
  } = fe(), n = G(e, t), {
    active: r,
    highlight: i,
    onClick: a,
    title: o
  } = n, l = Z(Ut, {
    [`${Ut}-active`]: r,
    [`${Ut}-highlight`]: i ?? r
  }), c = s.useContext(r0), u = En(s.createElement(Q2, null), c, n.arrow, n.arrowIcon);
  return H(t, s.createElement("div", {
    className: l,
    onClick: a
  }, s.createElement("div", {
    className: `${Ut}-title`
  }, s.createElement("span", {
    className: `${Ut}-title-text`
  }, o), s.createElement("span", {
    className: Z(`${Ut}-title-arrow`, {
      [`${Ut}-title-arrow-active`]: r
    })
  }, u))));
}, Q4 = X4, J4 = (t) => {
  const {
    active: e = !1
  } = t, n = mo(e, t.forceRender, t.destroyOnClose), r = Z(`${Ut}-content`, {
    [`${Ut}-content-hidden`]: !e
  });
  return n ? s.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, ar = "adm-dropdown", e5 = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Pl.getContainer
}, t5 = Ee((t, e) => {
  const {
    dropdown: n = {}
  } = fe(), r = G(e5, n, t), i = En(n.arrowIcon, t.arrow, t.arrowIcon), [a, o] = ue({
    value: r.activeKey,
    defaultValue: r.defaultActiveKey,
    onChange: r.onChange
  }), l = W(null), c = W(null);
  Zf(() => {
    r.closeOnClickAway && o(null);
  }, [l, c]);
  const [u, f] = X(), d = W(null);
  J(() => {
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
    if (bn(g)) {
      const h = Object.assign(Object.assign({}, g.props), {
        onClick: (x) => {
          var v, E;
          m(g.key), (E = (v = g.props).onClick) === null || E === void 0 || E.call(v, x);
        },
        active: g.key === a
      });
      return b.push(g), g.props.forceRender && (p = !0), cm(g, h);
    } else
      return g;
  });
  return _e(e, () => ({
    close: () => {
      o(null);
    }
  }), [o]), H(r, s.createElement("div", {
    className: Z(ar, {
      [`${ar}-open`]: !!a
    }),
    ref: d
  }, s.createElement(r0.Provider, {
    value: i
  }, s.createElement("div", {
    className: `${ar}-nav`,
    ref: l
  }, y)), s.createElement(jr, {
    visible: !!a,
    position: "top",
    getContainer: r.getContainer,
    className: `${ar}-popup`,
    maskClassName: `${ar}-popup-mask`,
    bodyClassName: `${ar}-popup-body`,
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
    return s.createElement(J4, {
      key: g.key,
      active: h,
      forceRender: g.props.forceRender,
      destroyOnClose: g.props.destroyOnClose
    }, g.props.children);
  })))));
}), n5 = t5, eb = pe(n5, {
  Item: Q4
});
var Fi = {}, Yl = {};
Object.defineProperty(Yl, "__esModule", {
  value: !0
});
Yl.default = r5;
function r5() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var vi, i5 = Wr.default, a5 = po.default;
Object.defineProperty(Fi, "__esModule", {
  value: !0
});
Fi.useLayoutUpdateEffect = vi = Fi.default = void 0;
var Ds = a5(s), o5 = i5(Yl), Wu = (0, o5.default)() ? Ds.useLayoutEffect : Ds.useEffect, i0 = function(e, n) {
  var r = Ds.useRef(!0);
  Wu(function() {
    return e(r.current);
  }, n), Wu(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
};
Fi.useLayoutUpdateEffect = function(e, n) {
  i0(function(r) {
    if (!r)
      return e();
  }, n);
};
vi = Fi.default = i0;
var Zu;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(Zu || (Zu = {}));
const s5 = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var qu;
function $a(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += l5(n + r, t), v5(t[n + r]) && r++, d5(t[n + r]) && r++, m5(t[n + r]) && r++, p5(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function l5(t, e) {
  const n = e[t];
  if (!c5(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Hu(r) && Hu(i) ? 4 : u5(r) && h5(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : f5(i) ? 4 : 2;
}
function c5(t) {
  return t && Gn(t[0].charCodeAt(0), 55296, 56319);
}
function Hu(t) {
  return Gn(Gl(t), 127462, 127487);
}
function u5(t) {
  return Gn(Gl(t), 127988, 127988);
}
function f5(t) {
  return Gn(Gl(t), 127995, 127999);
}
function d5(t) {
  return typeof t == "string" && Gn(t.charCodeAt(0), 65024, 65039);
}
function m5(t) {
  return typeof t == "string" && Gn(t.charCodeAt(0), 8400, 8447);
}
function h5(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && Gn(e, 917504, 917631);
}
function v5(t) {
  return typeof t == "string" && s5.includes(t.charCodeAt(0));
}
function p5(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function Gl(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function Gn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(qu || (qu = {}));
const la = "...", Xo = {
  visibility: "hidden",
  whiteSpace: "inherit",
  lineHeight: "inherit",
  fontSize: "inherit"
};
function g5(t, e, n, r, i, a, o) {
  const l = s.useMemo(() => $a(e), [e]), [c, u] = s.useState(0), [f, d] = s.useState([0, 0]), m = Math.ceil((f[0] + f[1]) / 2), [p, b] = s.useState(
    100
    /* STABLE_NO_ELLIPSIS */
  ), y = s.useRef(null), g = s.useRef(null), h = s.useRef(null), x = qa(() => {
    Pf(() => {
      b(
        1
        /* PREPARE */
      ), d([0, r === "middle" ? Math.ceil(l.length / 2) : l.length]);
    });
  });
  vi(() => {
    x();
  }, [l, n]), vi(() => {
    var C, k;
    if (p === 1) {
      const F = ((C = g.current) === null || C === void 0 ? void 0 : C.offsetHeight) || 0, S = (((k = y.current) === null || k === void 0 ? void 0 : k.offsetHeight) || 0) * (n + 0.5);
      F <= S ? b(
        100
        /* STABLE_NO_ELLIPSIS */
      ) : (u(S), b(
        2
        /* MEASURE_WALKING */
      ));
    }
  }, [p]), vi(() => {
    var C;
    if (p === 2) {
      const k = f[1] - f[0], F = ((C = h.current) === null || C === void 0 ? void 0 : C.offsetHeight) || 0;
      k > 1 ? F > c ? d([f[0], m]) : d([m, f[1]]) : (F > c ? d([f[0], f[0]]) : d([f[1], f[1]]), b(
        99
        /* STABLE_ELLIPSIS */
      ));
    }
  }, [p, f]);
  const v = (C) => {
    const k = l.slice(0, C), F = l.slice(l.length - C);
    return s.createElement(s.Fragment, null, r === "start" && s.createElement(s.Fragment, null, a, la), r !== "start" && k.join(""), r === "middle" && s.createElement(s.Fragment, null, la, a, la), r !== "end" && F.join(""), r === "end" && s.createElement(s.Fragment, null, la, a));
  }, E = s.useMemo(() => i || p === 100 ? s.createElement(s.Fragment, {
    key: "display"
  }, e, p === 99 && o) : p === 99 ? v(m) : null, [i, p, e, o, m]);
  return [s.createElement(s.Fragment, null, p === 1 && s.createElement("div", {
    key: "full",
    "aria-hidden": !0,
    ref: g,
    style: Xo
  }, e, a), p === 1 && s.createElement("div", {
    key: "stable",
    "aria-hidden": !0,
    ref: y,
    style: Xo
  }, " "), p === 2 && s.createElement("div", {
    key: "walking-mid",
    "aria-hidden": !0,
    ref: h,
    style: Xo
  }, v(m)), E), x];
}
const y5 = "adm-ellipsis", b5 = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, tb = (t) => {
  const e = G(b5, t), {
    content: n,
    direction: r,
    rows: i,
    expandText: a,
    collapseText: o,
    stopPropagationForActionButtons: l,
    onContentClick: c,
    defaultExpanded: u
  } = e, f = s.useRef(null), [d, m] = s.useState(u), p = a ? hn(l, s.createElement("a", {
    onClick: (h) => {
      var x;
      m(!0), (x = e.onExpand) === null || x === void 0 || x.call(e, !0, {
        event: h
      });
    }
  }, a)) : null, b = o ? hn(l, s.createElement("a", {
    onClick: (h) => {
      var x;
      m(!1), (x = e.onExpand) === null || x === void 0 || x.call(e, !1, {
        event: h
      });
    }
  }, o)) : null, [y, g] = g5(f, n, i, r, d, p, b);
  return Ui(g, f), H(e, s.createElement("div", {
    ref: f,
    className: y5,
    onClick: (h) => {
      h.target === h.currentTarget && c(h);
    }
  }, y));
}, E5 = (t) => H(t, s.createElement("svg", {
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
}))))), Jr = "adm-empty", nb = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? s.createElement(E5, {
      className: `${Jr}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? s.createElement("img", {
      className: `${Jr}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return H(t, s.createElement("div", {
    className: Jr
  }, s.createElement("div", {
    className: `${Jr}-image-container`
  }, e()), t.description && s.createElement("div", {
    className: Z(`${Jr}-description`)
  }, t.description)));
}, xn = "adm-error-block", w5 = {
  status: "default"
};
function C5(t) {
  return (n) => {
    var r;
    const i = G(w5, n), {
      locale: a
    } = fe(), o = a.ErrorBlock[i.status], l = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? s.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return H(i, s.createElement("div", {
      className: Z(xn, {
        [`${xn}-full-page`]: i.fullPage
      })
    }, s.createElement("div", {
      className: `${xn}-image`
    }, f), s.createElement("div", {
      className: `${xn}-description`
    }, ![void 0, null].includes(c) && s.createElement("div", {
      className: `${xn}-description-title`
    }, c), ![void 0, null].includes(l) && s.createElement("div", {
      className: `${xn}-description-subtitle`
    }, l)), i.children && s.createElement("div", {
      className: `${xn}-content`
    }, i.children)));
  };
}
const x5 = s.createElement("svg", {
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
}))), k5 = s.createElement("svg", {
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
})))), _5 = s.createElement("svg", {
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
})))), $5 = s.createElement("svg", {
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
})))), S5 = {
  default: x5,
  disconnected: k5,
  empty: _5,
  busy: $5
}, rb = C5(S5), ca = "adm-floating-bubble", O5 = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, ib = (t) => {
  const e = G(O5, t), n = W(null), r = W(null), [i, a] = X(e.offset === void 0 ? e.defaultOffset : e.offset);
  J(() => {
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
  })), f = Vt((d) => {
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
  return H(e, s.createElement("div", {
    className: ca
  }, s.createElement("div", {
    className: `${ca}-boundary-outer`
  }, s.createElement("div", {
    className: `${ca}-boundary`,
    ref: n
  })), s.createElement(Ce.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: F2([o, l], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${ca}-button`,
    ref: r
  }), e.children)));
};
function Xl(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const or = "adm-floating-panel", F5 = {
  handleDraggingOfContent: !0
}, ab = Ee((t, e) => {
  var n, r;
  const i = G(F5, t), {
    anchors: a,
    placement: o = "bottom"
  } = i, l = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, c = o !== "top", u = c ? a.map((w) => -w) : a, f = W(null), d = W(null), m = W(null), [p, b] = X(!1), y = W(!1), g = {
    top: Math.min(...u),
    bottom: Math.max(...u)
  }, h = Gt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
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
  Vt((w) => {
    const [, C] = w.offset;
    if (w.first) {
      const M = w.event.target, S = d.current;
      if (S === M || S != null && S.contains(M))
        y.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const V = x.goal <= g.top, I = m.current;
        if (!I)
          return;
        V ? I.scrollTop <= 0 && w.direction[1] > 0 && (y.current = !0) : y.current = !0;
      }
    }
    if (b(y.current), !y.current)
      return;
    const {
      event: k
    } = w;
    k.cancelable && Zn && k.preventDefault(), k.stopPropagation();
    let F = C;
    w.last && (y.current = !1, b(!1), F = Xl(u, C)), v.start({
      y: F
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
    eventOptions: Zn ? {
      passive: !1
    } : void 0
  }), _e(e, () => ({
    setHeight: (w, C) => {
      v.start({
        y: -w,
        immediate: C == null ? void 0 : C.immediate
      });
    }
  }), [v]), ro(f, !0);
  const E = s.createElement("div", {
    className: `${or}-header`,
    ref: d
  }, s.createElement("div", {
    className: `${or}-bar`
  }));
  return H(i, s.createElement(Ce.div, {
    ref: f,
    className: Z(or, `${or}-${o}`),
    style: {
      height: Math.round(l),
      translateY: x.to((w) => c ? `calc(100% + (${Math.round(w)}px))` : o === "top" ? `calc(-100% + (${Math.round(w)}px))` : w)
    }
  }, s.createElement("div", {
    className: `${or}-mask`,
    style: {
      display: p ? "block" : "none"
    }
  }), c && E, s.createElement("div", {
    className: `${or}-content`,
    ref: m
  }, i.children), o === "top" && E));
});
function zn() {
  return zn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, zn.apply(this, arguments);
}
function R5(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Or(t, e) {
  if (t == null)
    return {};
  var n = R5(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function Xn(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Uu(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, b1(r.key), r);
  }
}
function Qn(t, e, n) {
  return e && Uu(t.prototype, e), n && Uu(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function Ha(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Vs(t, e) {
  return Vs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Vs(t, e);
}
function Ql(t, e) {
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
  }), e && Vs(t, e);
}
function Ua(t) {
  return Ua = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ua(t);
}
function N5() {
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
function P5(t, e) {
  if (e && (ke(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Ha(t);
}
function Jl(t) {
  var e = N5();
  return function() {
    var r = Ua(t), i;
    if (e) {
      var a = Ua(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return P5(this, i);
  };
}
function js(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return s.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(js(r)) : p1(r) && r.props ? n = n.concat(js(r.props.children, e)) : n.push(r));
  }), n;
}
function M5(t, e) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = /* @__PURE__ */ new Set();
  function i(a, o) {
    var l = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1, c = r.has(a);
    if (vt(!c, "Warning: There may be circular references"), c)
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
    if (a && o && ke(a) === "object" && ke(o) === "object") {
      var d = Object.keys(a);
      return d.length !== Object.keys(o).length ? !1 : d.every(function(m) {
        return i(a[m], o[m], u);
      });
    }
    return !1;
  }
  return i(t, e);
}
var Ln = "RC_FORM_INTERNAL_HOOKS", ye = function() {
  vt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Kn = /* @__PURE__ */ D.createContext({
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
}), za = /* @__PURE__ */ D.createContext(null);
function Bs(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function A5(t) {
  return t && !!t._init;
}
function Kt() {
  Kt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(N, $, A) {
    N[$] = A.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", l = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(N, $, A) {
    return Object.defineProperty(N, $, {
      value: A,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), N[$];
  }
  try {
    u({}, "");
  } catch {
    u = function(A, _, O) {
      return A[_] = O;
    };
  }
  function f(N, $, A, _) {
    var O = $ && $.prototype instanceof h ? $ : h, L = Object.create(O.prototype), B = new R(_ || []);
    return i(L, "_invoke", {
      value: S(N, A, B)
    }), L;
  }
  function d(N, $, A) {
    try {
      return {
        type: "normal",
        arg: N.call($, A)
      };
    } catch (_) {
      return {
        type: "throw",
        arg: _
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
  var w = Object.getPrototypeOf, C = w && w(w(T([])));
  C && C !== n && r.call(C, o) && (E = C);
  var k = v.prototype = h.prototype = Object.create(E);
  function F(N) {
    ["next", "throw", "return"].forEach(function($) {
      u(N, $, function(A) {
        return this._invoke($, A);
      });
    });
  }
  function M(N, $) {
    function A(O, L, B, j) {
      var q = d(N[O], N, L);
      if (q.type !== "throw") {
        var K = q.arg, z = K.value;
        return z && ke(z) == "object" && r.call(z, "__await") ? $.resolve(z.__await).then(function(ne) {
          A("next", ne, B, j);
        }, function(ne) {
          A("throw", ne, B, j);
        }) : $.resolve(z).then(function(ne) {
          K.value = ne, B(K);
        }, function(ne) {
          return A("throw", ne, B, j);
        });
      }
      j(q.arg);
    }
    var _;
    i(this, "_invoke", {
      value: function(L, B) {
        function j() {
          return new $(function(q, K) {
            A(L, B, q, K);
          });
        }
        return _ = _ ? _.then(j, j) : j();
      }
    });
  }
  function S(N, $, A) {
    var _ = m;
    return function(O, L) {
      if (_ === b)
        throw new Error("Generator is already running");
      if (_ === y) {
        if (O === "throw")
          throw L;
        return {
          value: t,
          done: !0
        };
      }
      for (A.method = O, A.arg = L; ; ) {
        var B = A.delegate;
        if (B) {
          var j = V(B, A);
          if (j) {
            if (j === g)
              continue;
            return j;
          }
        }
        if (A.method === "next")
          A.sent = A._sent = A.arg;
        else if (A.method === "throw") {
          if (_ === m)
            throw _ = y, A.arg;
          A.dispatchException(A.arg);
        } else
          A.method === "return" && A.abrupt("return", A.arg);
        _ = b;
        var q = d(N, $, A);
        if (q.type === "normal") {
          if (_ = A.done ? y : p, q.arg === g)
            continue;
          return {
            value: q.arg,
            done: A.done
          };
        }
        q.type === "throw" && (_ = y, A.method = "throw", A.arg = q.arg);
      }
    };
  }
  function V(N, $) {
    var A = $.method, _ = N.iterator[A];
    if (_ === t)
      return $.delegate = null, A === "throw" && N.iterator.return && ($.method = "return", $.arg = t, V(N, $), $.method === "throw") || A !== "return" && ($.method = "throw", $.arg = new TypeError("The iterator does not provide a '" + A + "' method")), g;
    var O = d(_, N.iterator, $.arg);
    if (O.type === "throw")
      return $.method = "throw", $.arg = O.arg, $.delegate = null, g;
    var L = O.arg;
    return L ? L.done ? ($[N.resultName] = L.value, $.next = N.nextLoc, $.method !== "return" && ($.method = "next", $.arg = t), $.delegate = null, g) : L : ($.method = "throw", $.arg = new TypeError("iterator result is not an object"), $.delegate = null, g);
  }
  function I(N) {
    var $ = {
      tryLoc: N[0]
    };
    1 in N && ($.catchLoc = N[1]), 2 in N && ($.finallyLoc = N[2], $.afterLoc = N[3]), this.tryEntries.push($);
  }
  function P(N) {
    var $ = N.completion || {};
    $.type = "normal", delete $.arg, N.completion = $;
  }
  function R(N) {
    this.tryEntries = [{
      tryLoc: "root"
    }], N.forEach(I, this), this.reset(!0);
  }
  function T(N) {
    if (N || N === "") {
      var $ = N[o];
      if ($)
        return $.call(N);
      if (typeof N.next == "function")
        return N;
      if (!isNaN(N.length)) {
        var A = -1, _ = function O() {
          for (; ++A < N.length; )
            if (r.call(N, A))
              return O.value = N[A], O.done = !1, O;
          return O.value = t, O.done = !0, O;
        };
        return _.next = _;
      }
    }
    throw new TypeError(ke(N) + " is not iterable");
  }
  return x.prototype = v, i(k, "constructor", {
    value: v,
    configurable: !0
  }), i(v, "constructor", {
    value: x,
    configurable: !0
  }), x.displayName = u(v, c, "GeneratorFunction"), e.isGeneratorFunction = function(N) {
    var $ = typeof N == "function" && N.constructor;
    return !!$ && ($ === x || ($.displayName || $.name) === "GeneratorFunction");
  }, e.mark = function(N) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(N, v) : (N.__proto__ = v, u(N, c, "GeneratorFunction")), N.prototype = Object.create(k), N;
  }, e.awrap = function(N) {
    return {
      __await: N
    };
  }, F(M.prototype), u(M.prototype, l, function() {
    return this;
  }), e.AsyncIterator = M, e.async = function(N, $, A, _, O) {
    O === void 0 && (O = Promise);
    var L = new M(f(N, $, A, _), O);
    return e.isGeneratorFunction($) ? L : L.next().then(function(B) {
      return B.done ? B.value : L.next();
    });
  }, F(k), u(k, c, "Generator"), u(k, o, function() {
    return this;
  }), u(k, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(N) {
    var $ = Object(N), A = [];
    for (var _ in $)
      A.push(_);
    return A.reverse(), function O() {
      for (; A.length; ) {
        var L = A.pop();
        if (L in $)
          return O.value = L, O.done = !1, O;
      }
      return O.done = !0, O;
    };
  }, e.values = T, R.prototype = {
    constructor: R,
    reset: function($) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(P), !$)
        for (var A in this)
          A.charAt(0) === "t" && r.call(this, A) && !isNaN(+A.slice(1)) && (this[A] = t);
    },
    stop: function() {
      this.done = !0;
      var $ = this.tryEntries[0].completion;
      if ($.type === "throw")
        throw $.arg;
      return this.rval;
    },
    dispatchException: function($) {
      if (this.done)
        throw $;
      var A = this;
      function _(K, z) {
        return B.type = "throw", B.arg = $, A.next = K, z && (A.method = "next", A.arg = t), !!z;
      }
      for (var O = this.tryEntries.length - 1; O >= 0; --O) {
        var L = this.tryEntries[O], B = L.completion;
        if (L.tryLoc === "root")
          return _("end");
        if (L.tryLoc <= this.prev) {
          var j = r.call(L, "catchLoc"), q = r.call(L, "finallyLoc");
          if (j && q) {
            if (this.prev < L.catchLoc)
              return _(L.catchLoc, !0);
            if (this.prev < L.finallyLoc)
              return _(L.finallyLoc);
          } else if (j) {
            if (this.prev < L.catchLoc)
              return _(L.catchLoc, !0);
          } else {
            if (!q)
              throw new Error("try statement without catch or finally");
            if (this.prev < L.finallyLoc)
              return _(L.finallyLoc);
          }
        }
      }
    },
    abrupt: function($, A) {
      for (var _ = this.tryEntries.length - 1; _ >= 0; --_) {
        var O = this.tryEntries[_];
        if (O.tryLoc <= this.prev && r.call(O, "finallyLoc") && this.prev < O.finallyLoc) {
          var L = O;
          break;
        }
      }
      L && ($ === "break" || $ === "continue") && L.tryLoc <= A && A <= L.finallyLoc && (L = null);
      var B = L ? L.completion : {};
      return B.type = $, B.arg = A, L ? (this.method = "next", this.next = L.finallyLoc, g) : this.complete(B);
    },
    complete: function($, A) {
      if ($.type === "throw")
        throw $.arg;
      return $.type === "break" || $.type === "continue" ? this.next = $.arg : $.type === "return" ? (this.rval = this.arg = $.arg, this.method = "return", this.next = "end") : $.type === "normal" && A && (this.next = A), g;
    },
    finish: function($) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var _ = this.tryEntries[A];
        if (_.finallyLoc === $)
          return this.complete(_.completion, _.afterLoc), P(_), g;
      }
    },
    catch: function($) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var _ = this.tryEntries[A];
        if (_.tryLoc === $) {
          var O = _.completion;
          if (O.type === "throw") {
            var L = O.arg;
            P(_);
          }
          return L;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function($, A, _) {
      return this.delegate = {
        iterator: T($),
        resultName: A,
        nextLoc: _
      }, this.method === "next" && (this.arg = t), g;
    }
  }, e;
}
function zu(t, e, n, r, i, a, o) {
  try {
    var l = t[a](o), c = l.value;
  } catch (u) {
    n(u);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(r, i);
}
function Mo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var a = t.apply(e, n);
      function o(c) {
        zu(a, r, i, o, l, "next", c);
      }
      function l(c) {
        zu(a, r, i, o, l, "throw", c);
      }
      o(void 0);
    });
  };
}
function Dn() {
  return Dn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Dn.apply(this, arguments);
}
function T5(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, Ri(t, e);
}
function Ws(t) {
  return Ws = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ws(t);
}
function Ri(t, e) {
  return Ri = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ri(t, e);
}
function I5() {
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
function Sa(t, e, n) {
  return I5() ? Sa = Reflect.construct.bind() : Sa = function(i, a, o) {
    var l = [null];
    l.push.apply(l, a);
    var c = Function.bind.apply(i, l), u = new c();
    return o && Ri(u, o.prototype), u;
  }, Sa.apply(null, arguments);
}
function L5(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function Zs(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Zs = function(r) {
    if (r === null || !L5(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return Sa(r, arguments, Ws(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), Ri(i, r);
  }, Zs(t);
}
var D5 = /%[sdj%]/g, V5 = function() {
};
typeof process < "u" && process.env;
function qs(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function it(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var o = t.replace(D5, function(l) {
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
function j5(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Ae(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || j5(e) && typeof t == "string" && !t);
}
function B5(t, e, n) {
  var r = [], i = 0, a = t.length;
  function o(l) {
    r.push.apply(r, l || []), i++, i === a && n(r);
  }
  t.forEach(function(l) {
    e(l, o);
  });
}
function Ku(t, e, n) {
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
function W5(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var Yu = /* @__PURE__ */ function(t) {
  T5(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ Zs(Error));
function Z5(t, e, n, r, i) {
  if (e.first) {
    var a = new Promise(function(m, p) {
      var b = function(h) {
        return r(h), h.length ? p(new Yu(h, qs(h))) : m(i);
      }, y = W5(t);
      Ku(y, n, b);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], l = Object.keys(t), c = l.length, u = 0, f = [], d = new Promise(function(m, p) {
    var b = function(g) {
      if (f.push.apply(f, g), u++, u === c)
        return r(f), f.length ? p(new Yu(f, qs(f))) : m(i);
    };
    l.length || (r(f), m(i)), l.forEach(function(y) {
      var g = t[y];
      o.indexOf(y) !== -1 ? Ku(g, n, b) : B5(g, n, b);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function q5(t) {
  return !!(t && t.message !== void 0);
}
function H5(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Gu(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = H5(e, t.fullFields) : r = e[n.field || t.fullField], q5(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Xu(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = Dn({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var a0 = function(e, n, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || Ae(n, o || e.type)) && i.push(it(a.messages.required, e.fullField));
}, U5 = function(e, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(it(a.messages.whitespace, e.fullField));
}, ua, z5 = function() {
  if (ua)
    return ua;
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
  return ua = new RegExp("(?:^" + x + "$)", "i"), ua;
}, Qu = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ci = {
  integer: function(e) {
    return ci.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return ci.number(e) && !ci.integer(e);
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
    return typeof e == "object" && !ci.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Qu.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(z5());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Qu.hex);
  }
}, K5 = function(e, n, r, i, a) {
  if (e.required && n === void 0) {
    a0(e, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], l = e.type;
  o.indexOf(l) > -1 ? ci[l](n) || i.push(it(a.messages.types[l], e.fullField, e.type)) : l && typeof n !== e.type && i.push(it(a.messages.types[l], e.fullField, e.type));
}, Y5 = function(e, n, r, i, a) {
  var o = typeof e.len == "number", l = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", p = typeof n == "string", b = Array.isArray(n);
  if (m ? d = "number" : p ? d = "string" : b && (d = "array"), !d)
    return !1;
  b && (f = n.length), p && (f = n.replace(u, "_").length), o ? f !== e.len && i.push(it(a.messages[d].len, e.fullField, e.len)) : l && !c && f < e.min ? i.push(it(a.messages[d].min, e.fullField, e.min)) : c && !l && f > e.max ? i.push(it(a.messages[d].max, e.fullField, e.max)) : l && c && (f < e.min || f > e.max) && i.push(it(a.messages[d].range, e.fullField, e.min, e.max));
}, sr = "enum", G5 = function(e, n, r, i, a) {
  e[sr] = Array.isArray(e[sr]) ? e[sr] : [], e[sr].indexOf(n) === -1 && i.push(it(a.messages[sr], e.fullField, e[sr].join(", ")));
}, X5 = function(e, n, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(it(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(n) || i.push(it(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, le = {
  required: a0,
  whitespace: U5,
  type: K5,
  range: Y5,
  enum: G5,
  pattern: X5
}, Q5 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n, "string") && !e.required)
      return r();
    le.required(e, n, i, o, a, "string"), Ae(n, "string") || (le.type(e, n, i, o, a), le.range(e, n, i, o, a), le.pattern(e, n, i, o, a), e.whitespace === !0 && le.whitespace(e, n, i, o, a));
  }
  r(o);
}, J5 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && le.type(e, n, i, o, a);
  }
  r(o);
}, e6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n === "" && (n = void 0), Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && (le.type(e, n, i, o, a), le.range(e, n, i, o, a));
  }
  r(o);
}, t6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && le.type(e, n, i, o, a);
  }
  r(o);
}, n6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), Ae(n) || le.type(e, n, i, o, a);
  }
  r(o);
}, r6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && (le.type(e, n, i, o, a), le.range(e, n, i, o, a));
  }
  r(o);
}, i6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && (le.type(e, n, i, o, a), le.range(e, n, i, o, a));
  }
  r(o);
}, a6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (n == null && !e.required)
      return r();
    le.required(e, n, i, o, a, "array"), n != null && (le.type(e, n, i, o, a), le.range(e, n, i, o, a));
  }
  r(o);
}, o6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && le.type(e, n, i, o, a);
  }
  r(o);
}, s6 = "enum", l6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a), n !== void 0 && le[s6](e, n, i, o, a);
  }
  r(o);
}, c6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n, "string") && !e.required)
      return r();
    le.required(e, n, i, o, a), Ae(n, "string") || le.pattern(e, n, i, o, a);
  }
  r(o);
}, u6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n, "date") && !e.required)
      return r();
    if (le.required(e, n, i, o, a), !Ae(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), le.type(e, c, i, o, a), c && le.range(e, c.getTime(), i, o, a);
    }
  }
  r(o);
}, f6 = function(e, n, r, i, a) {
  var o = [], l = Array.isArray(n) ? "array" : typeof n;
  le.required(e, n, i, o, a, l), r(o);
}, Qo = function(e, n, r, i, a) {
  var o = e.type, l = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Ae(n, o) && !e.required)
      return r();
    le.required(e, n, i, l, a, o), Ae(n, o) || le.type(e, n, i, l, a);
  }
  r(l);
}, d6 = function(e, n, r, i, a) {
  var o = [], l = e.required || !e.required && i.hasOwnProperty(e.field);
  if (l) {
    if (Ae(n) && !e.required)
      return r();
    le.required(e, n, i, o, a);
  }
  r(o);
}, pi = {
  string: Q5,
  method: J5,
  number: e6,
  boolean: t6,
  regexp: n6,
  integer: r6,
  float: i6,
  array: a6,
  object: o6,
  enum: l6,
  pattern: c6,
  date: u6,
  url: Qo,
  hex: Qo,
  email: Qo,
  required: f6,
  any: d6
};
function Hs() {
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
var Us = Hs(), Ki = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = Us, this.define(n);
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
    return r && (this._messages = Xu(Hs(), r)), this._messages;
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
      g.length ? (h = qs(g), u(g, h)) : u(null, l);
    }
    if (c.messages) {
      var d = this.messages();
      d === Us && (d = Hs()), Xu(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, p = c.keys || Object.keys(this.rules);
    p.forEach(function(y) {
      var g = o.rules[y], h = l[y];
      g.forEach(function(x) {
        var v = x;
        typeof v.transform == "function" && (l === r && (l = Dn({}, l)), h = l[y] = v.transform(h)), typeof v == "function" ? v = {
          validator: v
        } : v = Dn({}, v), v.validator = o.getValidationMethod(v), v.validator && (v.field = y, v.fullField = v.fullField || y, v.type = o.getType(v), m[y] = m[y] || [], m[y].push({
          rule: v,
          value: h,
          source: l,
          field: y
        }));
      });
    });
    var b = {};
    return Z5(m, c, function(y, g) {
      var h = y.rule, x = (h.type === "object" || h.type === "array") && (typeof h.fields == "object" || typeof h.defaultField == "object");
      x = x && (h.required || !h.required && y.value), h.field = y.field;
      function v(C, k) {
        return Dn({}, k, {
          fullField: h.fullField + "." + C,
          fullFields: h.fullFields ? [].concat(h.fullFields, [C]) : [C]
        });
      }
      function E(C) {
        C === void 0 && (C = []);
        var k = Array.isArray(C) ? C : [C];
        !c.suppressWarning && k.length && t.warning("async-validator:", k), k.length && h.message !== void 0 && (k = [].concat(h.message));
        var F = k.map(Gu(h, l));
        if (c.first && F.length)
          return b[h.field] = 1, g(F);
        if (!x)
          g(F);
        else {
          if (h.required && !y.value)
            return h.message !== void 0 ? F = [].concat(h.message).map(Gu(h, l)) : c.error && (F = [c.error(h, it(c.messages.required, h.field))]), g(F);
          var M = {};
          h.defaultField && Object.keys(y.value).map(function(I) {
            M[I] = h.defaultField;
          }), M = Dn({}, M, y.rule.fields);
          var S = {};
          Object.keys(M).forEach(function(I) {
            var P = M[I], R = Array.isArray(P) ? P : [P];
            S[I] = R.map(v.bind(null, I));
          });
          var V = new t(S);
          V.messages(c.messages), y.rule.options && (y.rule.options.messages = c.messages, y.rule.options.error = c.error), V.validate(y.value, y.rule.options || c, function(I) {
            var P = [];
            F && F.length && P.push.apply(P, F), I && I.length && P.push.apply(P, I), g(P.length ? P : null);
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
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !pi.hasOwnProperty(r.type))
      throw new Error(it("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? pi.required : pi[this.getType(r)] || void 0;
  }, t;
}();
Ki.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  pi[e] = n;
};
Ki.warning = V5;
Ki.messages = Us;
Ki.validators = pi;
var et = "'${name}' is not a valid ${type}", o0 = {
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
}, Ju = Ki;
function m6(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var ef = "CODE_LOGIC_ERROR";
function zs(t, e, n, r, i) {
  return Ks.apply(this, arguments);
}
function Ks() {
  return Ks = Mo(/* @__PURE__ */ Kt().mark(function t(e, n, r, i, a) {
    var o, l, c, u, f, d, m, p, b;
    return Kt().wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return o = Q({}, r), delete o.ruleIndex, Ju.warning = function() {
            }, o.validator && (l = o.validator, o.validator = function() {
              try {
                return l.apply(void 0, arguments);
              } catch (h) {
                return console.error(h), Promise.reject(ef);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new Ju(he({}, e, [o])), f = li(o0, i.validateMessages), u.messages(f), d = [], g.prev = 10, g.next = 13, Promise.resolve(u.validate(he({}, e, n), Q({}, i)));
          case 13:
            g.next = 18;
            break;
          case 15:
            g.prev = 15, g.t0 = g.catch(10), g.t0.errors && (d = g.t0.errors.map(function(h, x) {
              var v = h.message, E = v === ef ? f.default : v;
              return /* @__PURE__ */ D.isValidElement(E) ? (
                // Wrap ReactNode with `key`
                D.cloneElement(E, {
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
              return zs("".concat(e, ".").concat(x), h, c, i, a);
            }));
          case 21:
            return m = g.sent, g.abrupt("return", m.reduce(function(h, x) {
              return [].concat(ve(h), ve(x));
            }, []));
          case 23:
            return p = Q(Q({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, a), b = d.map(function(h) {
              return typeof h == "string" ? m6(h, p) : h;
            }), g.abrupt("return", b);
          case 26:
          case "end":
            return g.stop();
        }
    }, t, null, [[10, 15]]);
  })), Ks.apply(this, arguments);
}
function h6(t, e, n, r, i, a) {
  var o = t.join("."), l = n.map(function(f, d) {
    var m = f.validator, p = Q(Q({}, f), {}, {
      ruleIndex: d
    });
    return m && (p.validator = function(b, y, g) {
      var h = !1, x = function() {
        for (var w = arguments.length, C = new Array(w), k = 0; k < w; k++)
          C[k] = arguments[k];
        Promise.resolve().then(function() {
          vt(!h, "Your validator function has already return a promise. `callback` will be ignored."), h || g.apply(void 0, C);
        });
      }, v = m(b, y, x);
      h = v && typeof v.then == "function" && typeof v.catch == "function", vt(h, "`callback` is deprecated. Please return a promise instead."), h && v.then(function() {
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
      var f = Mo(/* @__PURE__ */ Kt().mark(function d(m, p) {
        var b, y, g;
        return Kt().wrap(function(x) {
          for (; ; )
            switch (x.prev = x.next) {
              case 0:
                b = 0;
              case 1:
                if (!(b < l.length)) {
                  x.next = 12;
                  break;
                }
                return y = l[b], x.next = 5, zs(o, e, y, r, a);
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
      return zs(o, e, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? p6(u) : v6(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function v6(t) {
  return Ys.apply(this, arguments);
}
function Ys() {
  return Ys = Mo(/* @__PURE__ */ Kt().mark(function t(e) {
    return Kt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(e).then(function(i) {
              var a, o = (a = []).concat.apply(a, ve(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, t);
  })), Ys.apply(this, arguments);
}
function p6(t) {
  return Gs.apply(this, arguments);
}
function Gs() {
  return Gs = Mo(/* @__PURE__ */ Kt().mark(function t(e) {
    var n;
    return Kt().wrap(function(i) {
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
  })), Gs.apply(this, arguments);
}
function Oe(t) {
  return Bs(t);
}
function tf(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = _t(t, r);
    n = wt(n, r, i);
  }), n;
}
function gi(t, e) {
  return t && t.some(function(n) {
    return s0(n, e);
  });
}
function s0(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function g6(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || ke(t) !== "object" || ke(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return ve(i).every(function(a) {
    var o = t[a], l = e[a];
    return typeof o == "function" && typeof l == "function" ? !0 : o === l;
  });
}
function y6(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && ke(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function nf(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], a = e - n;
  return a > 0 ? [].concat(ve(t.slice(0, n)), [i], ve(t.slice(n, e)), ve(t.slice(e + 1, r))) : a < 0 ? [].concat(ve(t.slice(0, e)), ve(t.slice(e + 1, n + 1)), [i], ve(t.slice(n + 1, r))) : t;
}
var b6 = ["name"], lt = [];
function rf(t, e, n, r, i, a) {
  return typeof t == "function" ? t(e, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var ec = /* @__PURE__ */ function(t) {
  Ql(n, t);
  var e = Jl(n);
  function n(r) {
    var i;
    if (Xn(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = void 0, i.prevValidating = void 0, i.errors = lt, i.warnings = lt, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, Oe(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(ve(m), ve(u)) : [];
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
        var f = Q(Q({}, i.getMeta()), {}, {
          destroy: c
        });
        M5(i.metaCache, f) || u(f), i.metaCache = f;
      } else
        i.metaCache = null;
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, p = d.dependencies, b = p === void 0 ? [] : p, y = d.onReset, g = f.store, h = i.getNamePath(), x = i.getValue(c), v = i.getValue(g), E = u && gi(u, h);
      switch (f.type === "valueUpdate" && f.source === "external" && x !== v && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = lt, i.warnings = lt, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || E) {
            i.touched = !1, i.dirty = !1, i.validatePromise = void 0, i.errors = lt, i.warnings = lt, i.triggerMetaEvent(), y == null || y(), i.refresh();
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
            "touched" in w && (i.touched = w.touched), "validating" in w && !("originRCField" in w) && (i.validatePromise = w.validating ? Promise.resolve([]) : null), "errors" in w && (i.errors = w.errors || lt), "warnings" in w && (i.warnings = w.warnings || lt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !h.length && rf(m, c, g, x, v, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var C = b.map(Oe);
          if (C.some(function(k) {
            return gi(f.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (E || (!b.length || h.length || m) && rf(m, c, g, x, v, f)) {
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
          var F = Bs(k);
          return F.includes(m);
        }));
        var w = h6(u, f, E, c, x, v);
        return w.catch(function(C) {
          return C;
        }).then(function() {
          var C = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : lt;
          if (i.validatePromise === y) {
            var k;
            i.validatePromise = null;
            var F = [], M = [];
            (k = C.forEach) === null || k === void 0 || k.call(C, function(S) {
              var V = S.rule.warningOnly, I = S.errors, P = I === void 0 ? lt : I;
              V ? M.push.apply(M, ve(P)) : F.push.apply(F, ve(P));
            }), i.errors = F, i.warnings = M, i.triggerMetaEvent(), i.reRender();
          }
        }), w;
      });
      return b || (i.validatePromise = y, i.dirty = !0, i.errors = lt, i.warnings = lt, i.triggerMetaEvent(), i.reRender()), y;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(Ln), f = u.getInitialValue;
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
        return Q(Q({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = js(c);
      return f.length !== 1 || !/* @__PURE__ */ D.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return _t(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, p = u.normalize, b = u.valuePropName, y = u.getValueProps, g = u.fieldContext, h = d !== void 0 ? d : g.validateTrigger, x = i.getNamePath(), v = g.getInternalHooks, E = g.getFieldsValue, w = v(Ln), C = w.dispatch, k = i.getValue(), F = y || function(I) {
        return he({}, b, I);
      }, M = c[f], S = Q(Q({}, c), F(k));
      S[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, P = arguments.length, R = new Array(P), T = 0; T < P; T++)
          R[T] = arguments[T];
        m ? I = m.apply(void 0, R) : I = y6.apply(void 0, [b].concat(R)), p && (I = p(I, k, E(!0))), C({
          type: "updateValue",
          namePath: x,
          value: I
        }), M && M.apply(void 0, R);
      };
      var V = Bs(h || []);
      return V.forEach(function(I) {
        var P = S[I];
        S[I] = function() {
          P && P.apply(void 0, arguments);
          var R = i.props.rules;
          R && R.length && C({
            type: "validateField",
            namePath: x,
            triggerName: I
          });
        };
      }), S;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(Ln), l = o.initEntityValue;
      l(Ha(i));
    }
    return i;
  }
  return Qn(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var l = o.getInternalHooks, c = l(Ln), u = c.registerField;
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
      return c ? u = l : /* @__PURE__ */ D.isValidElement(l) ? u = /* @__PURE__ */ D.cloneElement(l, this.getControlled(l.props)) : (vt(!l, "`children` of Field is not validate ReactElement."), u = l), /* @__PURE__ */ D.createElement(D.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(D.Component);
ec.contextType = Kn;
ec.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function tc(t) {
  var e = t.name, n = Or(t, b6), r = D.useContext(Kn), i = D.useContext(za), a = e !== void 0 ? Oe(e) : void 0, o = "keep";
  return n.isListField || (o = "_".concat((a || []).join("_"))), /* @__PURE__ */ D.createElement(ec, zn({
    key: o,
    name: a,
    isListField: !!i
  }, n, {
    fieldContext: r
  }));
}
var l0 = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, a = e.rules, o = e.validateTrigger, l = e.isListField, c = D.useContext(Kn), u = D.useContext(za), f = D.useRef({
    keys: [],
    id: 0
  }), d = f.current, m = D.useMemo(function() {
    var g = Oe(c.prefixName) || [];
    return [].concat(ve(g), ve(Oe(n)));
  }, [c.prefixName, n]), p = D.useMemo(function() {
    return Q(Q({}, c), {}, {
      prefixName: m
    });
  }, [c, m]), b = D.useMemo(function() {
    return {
      getKey: function(h) {
        var x = m.length, v = h[x];
        return [d.keys[v], h.slice(x + 1)];
      }
    };
  }, [m]);
  if (typeof i != "function")
    return vt(!1, "Form.List only accepts function as children."), null;
  var y = function(h, x, v) {
    var E = v.source;
    return E === "internal" ? !1 : h !== x;
  };
  return /* @__PURE__ */ D.createElement(za.Provider, {
    value: b
  }, /* @__PURE__ */ D.createElement(Kn.Provider, {
    value: p
  }, /* @__PURE__ */ D.createElement(tc, {
    name: [],
    shouldUpdate: y,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0,
    isListField: l ?? !!u
  }, function(g, h) {
    var x = g.value, v = x === void 0 ? [] : x, E = g.onChange, w = c.getFieldValue, C = function() {
      var S = w(m || []);
      return S || [];
    }, k = {
      add: function(S, V) {
        var I = C();
        V >= 0 && V <= I.length ? (d.keys = [].concat(ve(d.keys.slice(0, V)), [d.id], ve(d.keys.slice(V))), E([].concat(ve(I.slice(0, V)), [S], ve(I.slice(V))))) : (d.keys = [].concat(ve(d.keys), [d.id]), E([].concat(ve(I), [S]))), d.id += 1;
      },
      remove: function(S) {
        var V = C(), I = new Set(Array.isArray(S) ? S : [S]);
        I.size <= 0 || (d.keys = d.keys.filter(function(P, R) {
          return !I.has(R);
        }), E(V.filter(function(P, R) {
          return !I.has(R);
        })));
      },
      move: function(S, V) {
        if (S !== V) {
          var I = C();
          S < 0 || S >= I.length || V < 0 || V >= I.length || (d.keys = nf(d.keys, S, V), E(nf(I, S, V)));
        }
      }
    }, F = v || [];
    return Array.isArray(F) || (F = []), i(F.map(function(M, S) {
      var V = d.keys[S];
      return V === void 0 && (d.keys[S] = d.id, V = d.keys[S], d.id += 1), {
        name: S,
        key: V,
        isListField: !0
      };
    }), k, h);
  })));
};
function E6(t) {
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
var c0 = "__@field_split__";
function Jo(t) {
  return t.map(function(e) {
    return "".concat(ke(e), ":").concat(e);
  }).join(c0);
}
var lr = /* @__PURE__ */ function() {
  function t() {
    Xn(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return Qn(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(Jo(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(Jo(n));
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
      this.kvs.delete(Jo(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return ve(this.kvs.entries()).map(function(r) {
        var i = Fe(r, 2), a = i[0], o = i[1], l = a.split(c0);
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
}(), w6 = ["name"], C6 = /* @__PURE__ */ Qn(function t(e) {
  var n = this;
  Xn(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === Ln ? (n.formHooked = !0, {
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
      var a, o = li(r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(l) {
        var c = l.key;
        o = wt(o, c, _t(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new lr();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = _t(n.initialValues, r);
    return r.length ? li(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new lr();
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
    }), tf(n.store, o.map(Oe));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = Oe(r);
    return _t(n.store, i);
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
    var m = new lr();
    c.forEach(function(y) {
      m.set(y, []);
    }), f.forEach(function(y) {
      var g = y.getNamePath();
      c.forEach(function(h) {
        h.every(function(x, v) {
          return g[v] === x;
        }) && m.update(h, function(x) {
          return [].concat(ve(x), [y]);
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
      return gi(a, l) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new lr(), a = n.getFieldEntities(!0);
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
            vt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var b = i.get(m);
            if (b && b.size > 1)
              vt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (b) {
              var y = n.getFieldValue(m);
              (!r.skipExist || y === void 0) && n.updateStore(wt(n.store, m, ve(b)[0].value));
            }
          }
        }
      });
    }, l;
    r.entities ? l = r.entities : r.namePathList ? (l = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = l).push.apply(f, ve(ve(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : l = a, o(l);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(li(n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(Oe);
    a.forEach(function(o) {
      var l = n.getInitialValue(o);
      n.updateStore(wt(n.store, o, l));
    }), n.resetWithFieldInitialValue({
      namePathList: a
    }), n.notifyObservers(i, a, {
      type: "reset"
    }), n.notifyWatch(a);
  }, this.setFields = function(r) {
    n.warningUnhooked();
    var i = n.store, a = [];
    r.forEach(function(o) {
      var l = o.name, c = Or(o, w6), u = Oe(l);
      a.push(u), "value" in c && n.updateStore(wt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), l = a.getMeta(), c = Q(Q({}, l), {}, {
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
      var a = r.getNamePath(), o = _t(n.store, a);
      o === void 0 && n.updateStore(wt(n.store, a, i));
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
            !s0(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(wt(f, i, u, !0)), n.notifyObservers(f, [i], {
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
      var o = Q(Q({}, a), {}, {
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
      relatedFields: [i].concat(ve(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = Oe(r), o = n.store;
    n.updateStore(wt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var l = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = tf(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(ve(l)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = li(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new lr();
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
        var l = new lr();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          l.set(f, d);
        }), o.forEach(function(u) {
          u.errors = l.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var f = u.name;
        return gi(r, f);
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
        if (d.add(x.join(f)), !l || gi(c, x)) {
          var v = y.validateRules(Q({
            validateMessages: Q(Q({}, o0), n.validateMessages)
          }, o));
          u.push(v.then(function() {
            return {
              name: x,
              errors: [],
              warnings: []
            };
          }).catch(function(E) {
            var w, C = [], k = [];
            return (w = E.forEach) === null || w === void 0 || w.call(E, function(F) {
              var M = F.rule.warningOnly, S = F.errors;
              M ? k.push.apply(k, ve(S)) : C.push.apply(C, ve(S));
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
    var m = E6(u);
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
function nc(t) {
  var e = D.useRef(), n = D.useState({}), r = Fe(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var a = function() {
        i({});
      }, o = new C6(a);
      e.current = o.getForm();
    }
  return [e.current];
}
var Xs = /* @__PURE__ */ D.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), x6 = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, a = e.children, o = D.useContext(Xs), l = D.useRef({});
  return /* @__PURE__ */ D.createElement(Xs.Provider, {
    value: Q(Q({}, o), {}, {
      validateMessages: Q(Q({}, o.validateMessages), n),
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
        u && (l.current = Q(Q({}, l.current), {}, he({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = Q({}, l.current);
        delete f[u], l.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, k6 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], _6 = function(e, n) {
  var r = e.name, i = e.initialValues, a = e.fields, o = e.form, l = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, p = m === void 0 ? "onChange" : m, b = e.onValuesChange, y = e.onFieldsChange, g = e.onFinish, h = e.onFinishFailed, x = Or(e, k6), v = D.useContext(Xs), E = nc(o), w = Fe(E, 1), C = w[0], k = C.getInternalHooks(Ln), F = k.useSubscribe, M = k.setInitialValues, S = k.setCallbacks, V = k.setValidateMessages, I = k.setPreserve, P = k.destroyForm;
  D.useImperativeHandle(n, function() {
    return C;
  }), D.useEffect(function() {
    return v.registerForm(r, C), function() {
      v.unregisterForm(r);
    };
  }, [v, C, r]), V(Q(Q({}, v.validateMessages), d)), S({
    onValuesChange: b,
    onFieldsChange: function(B) {
      if (v.triggerFormChange(r, B), y) {
        for (var j = arguments.length, q = new Array(j > 1 ? j - 1 : 0), K = 1; K < j; K++)
          q[K - 1] = arguments[K];
        y.apply(void 0, [B].concat(q));
      }
    },
    onFinish: function(B) {
      v.triggerFormFinish(r, B), g && g(B);
    },
    onFinishFailed: h
  }), I(l);
  var R = D.useRef(null);
  M(i, !R.current), R.current || (R.current = !0), D.useEffect(
    function() {
      return P;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var T, N = typeof c == "function";
  if (N) {
    var $ = C.getFieldsValue(!0);
    T = c($, C);
  } else
    T = c;
  F(!N);
  var A = D.useRef();
  D.useEffect(function() {
    g6(A.current || [], a || []) || C.setFields(a || []), A.current = a;
  }, [a, C]);
  var _ = D.useMemo(function() {
    return Q(Q({}, C), {}, {
      validateTrigger: p
    });
  }, [C, p]), O = /* @__PURE__ */ D.createElement(za.Provider, {
    value: null
  }, /* @__PURE__ */ D.createElement(Kn.Provider, {
    value: _
  }, T));
  return f === !1 ? O : /* @__PURE__ */ D.createElement(f, zn({}, x, {
    onSubmit: function(B) {
      B.preventDefault(), B.stopPropagation(), C.submit();
    },
    onReset: function(B) {
      var j;
      B.preventDefault(), C.resetFields(), (j = x.onReset) === null || j === void 0 || j.call(x, B);
    }
  }), O);
};
function af(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function rc() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, a = e[1], o = a === void 0 ? {} : a, l = A5(o) ? {
    form: o
  } : o, c = l.form, u = X(), f = Fe(u, 2), d = f[0], m = f[1], p = me(function() {
    return af(d);
  }, [d]), b = W(p);
  b.current = p;
  var y = at(Kn), g = c || y, h = g && g._init, x = Oe(i), v = W(x);
  return v.current = x, J(
    function() {
      if (h) {
        var E = g.getFieldsValue, w = g.getInternalHooks, C = w(Ln), k = C.registerWatch, F = k(function(S, V) {
          var I = _t(l.preserve ? V : S, v.current), P = af(I);
          b.current !== P && (b.current = P, m(I));
        }), M = _t(l.preserve ? E(!0) : E(), v.current);
        return m(M), F;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [h]
  ), d;
}
var $6 = /* @__PURE__ */ D.forwardRef(_6), Zr = $6;
Zr.FormProvider = x6;
Zr.Field = tc;
Zr.List = l0;
Zr.useForm = nc;
Zr.useWatch = rc;
const u0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, ic = s.createContext(u0), of = s.createContext(null), f0 = () => null;
var S6 = function(e) {
  return O6(e) && !F6(e);
};
function O6(t) {
  return !!t && typeof t == "object";
}
function F6(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object RegExp]" || e === "[object Date]" || P6(t);
}
var R6 = typeof Symbol == "function" && Symbol.for, N6 = R6 ? Symbol.for("react.element") : 60103;
function P6(t) {
  return t.$$typeof === N6;
}
function M6(t) {
  return Array.isArray(t) ? [] : {};
}
function Ni(t, e) {
  return e.clone !== !1 && e.isMergeableObject(t) ? Fr(M6(t), t, e) : t;
}
function A6(t, e, n) {
  return t.concat(e).map(function(r) {
    return Ni(r, n);
  });
}
function T6(t, e) {
  if (!e.customMerge)
    return Fr;
  var n = e.customMerge(t);
  return typeof n == "function" ? n : Fr;
}
function I6(t) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(t).filter(function(e) {
    return Object.propertyIsEnumerable.call(t, e);
  }) : [];
}
function sf(t) {
  return Object.keys(t).concat(I6(t));
}
function d0(t, e) {
  try {
    return e in t;
  } catch {
    return !1;
  }
}
function L6(t, e) {
  return d0(t, e) && !(Object.hasOwnProperty.call(t, e) && Object.propertyIsEnumerable.call(t, e));
}
function D6(t, e, n) {
  var r = {};
  return n.isMergeableObject(t) && sf(t).forEach(function(i) {
    r[i] = Ni(t[i], n);
  }), sf(e).forEach(function(i) {
    L6(t, i) || (d0(t, i) && n.isMergeableObject(e[i]) ? r[i] = T6(i, n)(t[i], e[i], n) : r[i] = Ni(e[i], n));
  }), r;
}
function Fr(t, e, n) {
  n = n || {}, n.arrayMerge = n.arrayMerge || A6, n.isMergeableObject = n.isMergeableObject || S6, n.cloneUnlessOtherwiseSpecified = Ni;
  var r = Array.isArray(e), i = Array.isArray(t), a = r === i;
  return a ? r ? n.arrayMerge(t, e, n) : D6(t, e, n) : Ni(e, n);
}
Fr.all = function(e, n) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(r, i) {
    return Fr(r, i, n);
  }, {});
};
var V6 = Fr, j6 = V6;
const B6 = /* @__PURE__ */ $t(j6), m0 = (t) => s.createElement(l0, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((a) => ({
    index: a.name,
    key: a.key
  })), i = t.children(r, n).map((a, o) => {
    var l;
    return s.createElement(Tt, {
      key: r[o].key,
      mode: "card",
      header: (l = t.renderHeader) === null || l === void 0 ? void 0 : l.call(t, r[o], n)
    }, a);
  });
  return t.renderAdd && i.push(s.createElement(Tt, {
    key: "add",
    mode: "card"
  }, s.createElement(Tt.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), s.createElement(s.Fragment, null, i);
}), lf = "adm-form", W6 = u0, Z6 = Ee((t, e) => {
  const n = G(W6, t), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: l,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = dn(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: p
  } = fe(), b = me(() => B6(p.Form.defaultValidateMessages, m.validateMessages || {}), [p.Form.defaultValidateMessages, m.validateMessages]), y = [];
  let g = null, h = [], x = 0;
  function v() {
    h.length !== 0 && (x += 1, y.push(s.createElement(Tt, {
      header: g,
      key: x,
      mode: u
    }, h)), h = []);
  }
  return Cn(n.children, (E) => {
    if (s.isValidElement(E)) {
      if (E.type === f0) {
        v(), g = E.props.children;
        return;
      }
      if (E.type === m0) {
        v(), y.push(E);
        return;
      }
    }
    h.push(E);
  }), v(), s.createElement(Zr, Object.assign({
    className: Z(lf, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: b
  }), s.createElement(ic.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: l,
      requiredMarkStyle: d,
      disabled: f
    }
  }, y), c && s.createElement("div", {
    className: `${lf}-footer`
  }, c));
});
var Pi = {}, q6 = po.default, H6 = Wr.default;
Object.defineProperty(Pi, "__esModule", {
  value: !0
});
var h0 = Pi.default = Pi.HOOK_MARK = void 0, U6 = H6(yt), z6 = q6(s), K6 = "RC_FORM_INTERNAL_HOOKS";
Pi.HOOK_MARK = K6;
var be = function() {
  (0, U6.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Y6 = /* @__PURE__ */ z6.createContext({
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
}), G6 = Y6;
h0 = Pi.default = G6;
function X6(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const Q6 = ["top", "right", "bottom", "left"], Rr = Math.min, Bn = Math.max, Ka = Math.round, fa = Math.floor, vn = (t) => ({
  x: t,
  y: t
}), J6 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, e7 = {
  start: "end",
  end: "start"
};
function Qs(t, e, n) {
  return Bn(t, Rr(e, n));
}
function pn(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function gn(t) {
  return t.split("-")[0];
}
function Yi(t) {
  return t.split("-")[1];
}
function ac(t) {
  return t === "x" ? "y" : "x";
}
function oc(t) {
  return t === "y" ? "height" : "width";
}
function Gi(t) {
  return ["top", "bottom"].includes(gn(t)) ? "y" : "x";
}
function sc(t) {
  return ac(Gi(t));
}
function t7(t, e, n) {
  n === void 0 && (n = !1);
  const r = Yi(t), i = sc(t), a = oc(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (o = Ya(o)), [o, Ya(o)];
}
function n7(t) {
  const e = Ya(t);
  return [Js(t), e, Js(e)];
}
function Js(t) {
  return t.replace(/start|end/g, (e) => e7[e]);
}
function r7(t, e, n) {
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
function i7(t, e, n, r) {
  const i = Yi(t);
  let a = r7(gn(t), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), e && (a = a.concat(a.map(Js)))), a;
}
function Ya(t) {
  return t.replace(/left|right|bottom|top/g, (e) => J6[e]);
}
function a7(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function v0(t) {
  return typeof t != "number" ? a7(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ga(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function cf(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const a = Gi(e), o = sc(e), l = oc(o), c = gn(e), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[l] / 2 - i[l] / 2;
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
  switch (Yi(e)) {
    case "start":
      p[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      p[o] += m * (n && u ? -1 : 1);
      break;
  }
  return p;
}
const o7 = async (t, e, n) => {
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
  } = cf(u, r, c), m = r, p = {}, b = 0;
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
      } = cf(u, m, c)), y = -1;
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
async function Xa(t, e) {
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
  } = pn(e, t), b = v0(p), g = l[m ? d === "floating" ? "reference" : "floating" : d], h = Ga(await a.getClippingRect({
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
  }, w = Ga(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const s7 = (t) => ({
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
    } = pn(t, e) || {};
    if (u == null)
      return {};
    const d = v0(f), m = {
      x: n,
      y: r
    }, p = sc(i), b = oc(p), y = await o.getDimensions(u), g = p === "y", h = g ? "top" : "left", x = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", E = a.reference[b] + a.reference[p] - m[p] - a.floating[b], w = m[p] - a.reference[p], C = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let k = C ? C[v] : 0;
    (!k || !await (o.isElement == null ? void 0 : o.isElement(C))) && (k = l.floating[v] || a.floating[b]);
    const F = E / 2 - w / 2, M = k / 2 - y[b] / 2 - 1, S = Rr(d[h], M), V = Rr(d[x], M), I = S, P = k - y[b] - V, R = k / 2 - y[b] / 2 + F, T = Qs(I, R, P), N = !c.arrow && Yi(i) != null && R != T && a.reference[b] / 2 - (R < I ? S : V) - y[b] / 2 < 0, $ = N ? R < I ? R - I : R - P : 0;
    return {
      [p]: m[p] + $,
      data: {
        [p]: T,
        centerOffset: R - T - $,
        ...N && {
          alignmentOffset: $
        }
      },
      reset: N
    };
  }
}), l7 = function(t) {
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
      } = pn(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const h = gn(i), x = gn(l) === l, v = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (x || !y ? [Ya(l)] : n7(l));
      !m && b !== "none" && E.push(...i7(l, y, b, v));
      const w = [l, ...E], C = await Xa(e, g), k = [];
      let F = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && k.push(C[h]), d) {
        const I = t7(i, o, v);
        k.push(C[I[0]], C[I[1]]);
      }
      if (F = [...F, {
        placement: i,
        overflows: k
      }], !k.every((I) => I <= 0)) {
        var M, S;
        const I = (((M = a.flip) == null ? void 0 : M.index) || 0) + 1, P = w[I];
        if (P)
          return {
            data: {
              index: I,
              overflows: F
            },
            reset: {
              placement: P
            }
          };
        let R = (S = F.filter((T) => T.overflows[0] <= 0).sort((T, N) => T.overflows[1] - N.overflows[1])[0]) == null ? void 0 : S.placement;
        if (!R)
          switch (p) {
            case "bestFit": {
              var V;
              const T = (V = F.map((N) => [N.placement, N.overflows.filter(($) => $ > 0).reduce(($, A) => $ + A, 0)]).sort((N, $) => N[1] - $[1])[0]) == null ? void 0 : V[0];
              T && (R = T);
              break;
            }
            case "initialPlacement":
              R = l;
              break;
          }
        if (i !== R)
          return {
            reset: {
              placement: R
            }
          };
      }
      return {};
    }
  };
};
function uf(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function ff(t) {
  return Q6.some((e) => t[e] >= 0);
}
const c7 = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = pn(t, e);
      switch (r) {
        case "referenceHidden": {
          const a = await Xa(e, {
            ...i,
            elementContext: "reference"
          }), o = uf(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: ff(o)
            }
          };
        }
        case "escaped": {
          const a = await Xa(e, {
            ...i,
            altBoundary: !0
          }), o = uf(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: ff(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function u7(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = gn(n), l = Yi(n), c = Gi(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = pn(e, t);
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
const f7 = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await u7(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, d7 = function(t) {
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
      } = pn(t, e), u = {
        x: n,
        y: r
      }, f = await Xa(e, c), d = Gi(gn(i)), m = ac(d);
      let p = u[m], b = u[d];
      if (a) {
        const g = m === "y" ? "top" : "left", h = m === "y" ? "bottom" : "right", x = p + f[g], v = p - f[h];
        p = Qs(x, p, v);
      }
      if (o) {
        const g = d === "y" ? "top" : "left", h = d === "y" ? "bottom" : "right", x = b + f[g], v = b - f[h];
        b = Qs(x, b, v);
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
}, m7 = function(t) {
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
      } = pn(t, e), f = {
        x: n,
        y: r
      }, d = Gi(i), m = ac(d);
      let p = f[m], b = f[d];
      const y = pn(l, e), g = typeof y == "number" ? {
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
        const v = m === "y" ? "width" : "height", E = ["top", "left"].includes(gn(i)), w = a.reference[d] - a.floating[v] + (E && ((h = o.offset) == null ? void 0 : h[d]) || 0) + (E ? 0 : g.crossAxis), C = a.reference[d] + a.reference[v] + (E ? 0 : ((x = o.offset) == null ? void 0 : x[d]) || 0) - (E ? g.crossAxis : 0);
        b < w ? b = w : b > C && (b = C);
      }
      return {
        [m]: p,
        [d]: b
      };
    }
  };
};
function yn(t) {
  return p0(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function ot(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Xt(t) {
  var e;
  return (e = (p0(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function p0(t) {
  return t instanceof Node || t instanceof ot(t).Node;
}
function Yt(t) {
  return t instanceof Element || t instanceof ot(t).Element;
}
function Dt(t) {
  return t instanceof HTMLElement || t instanceof ot(t).HTMLElement;
}
function df(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof ot(t).ShadowRoot;
}
function Xi(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = gt(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function h7(t) {
  return ["table", "td", "th"].includes(yn(t));
}
function lc(t) {
  const e = cc(), n = gt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function v7(t) {
  let e = Nr(t);
  for (; Dt(e) && !Ao(e); ) {
    if (lc(e))
      return e;
    e = Nr(e);
  }
  return null;
}
function cc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Ao(t) {
  return ["html", "body", "#document"].includes(yn(t));
}
function gt(t) {
  return ot(t).getComputedStyle(t);
}
function To(t) {
  return Yt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function Nr(t) {
  if (yn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    df(t) && t.host || // Fallback.
    Xt(t)
  );
  return df(e) ? e.host : e;
}
function g0(t) {
  const e = Nr(t);
  return Ao(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Dt(e) && Xi(e) ? e : g0(e);
}
function Mi(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = g0(t), a = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = ot(i);
  return a ? e.concat(o, o.visualViewport || [], Xi(i) ? i : [], o.frameElement && n ? Mi(o.frameElement) : []) : e.concat(i, Mi(i, [], n));
}
function y0(t) {
  const e = gt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = Dt(t), a = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, l = Ka(n) !== a || Ka(r) !== o;
  return l && (n = a, r = o), {
    width: n,
    height: r,
    $: l
  };
}
function uc(t) {
  return Yt(t) ? t : t.contextElement;
}
function Cr(t) {
  const e = uc(t);
  if (!Dt(e))
    return vn(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = y0(e);
  let o = (a ? Ka(n.width) : n.width) / r, l = (a ? Ka(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!l || !Number.isFinite(l)) && (l = 1), {
    x: o,
    y: l
  };
}
const p7 = /* @__PURE__ */ vn(0);
function b0(t) {
  const e = ot(t);
  return !cc() || !e.visualViewport ? p7 : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function g7(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== ot(t) ? !1 : e;
}
function Yn(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = uc(t);
  let o = vn(1);
  e && (r ? Yt(r) && (o = Cr(r)) : o = Cr(t));
  const l = g7(a, n, r) ? b0(a) : vn(0);
  let c = (i.left + l.x) / o.x, u = (i.top + l.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = ot(a), p = r && Yt(r) ? ot(r) : r;
    let b = m.frameElement;
    for (; b && r && p !== m; ) {
      const y = Cr(b), g = b.getBoundingClientRect(), h = gt(b), x = g.left + (b.clientLeft + parseFloat(h.paddingLeft)) * y.x, v = g.top + (b.clientTop + parseFloat(h.paddingTop)) * y.y;
      c *= y.x, u *= y.y, f *= y.x, d *= y.y, c += x, u += v, b = ot(b).frameElement;
    }
  }
  return Ga({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function y7(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = Dt(n), a = Xt(n);
  if (n === a)
    return e;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = vn(1);
  const c = vn(0);
  if ((i || !i && r !== "fixed") && ((yn(n) !== "body" || Xi(a)) && (o = To(n)), Dt(n))) {
    const u = Yn(n);
    l = Cr(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * l.x,
    height: e.height * l.y,
    x: e.x * l.x - o.scrollLeft * l.x + c.x,
    y: e.y * l.y - o.scrollTop * l.y + c.y
  };
}
function b7(t) {
  return Array.from(t.getClientRects());
}
function E0(t) {
  return Yn(Xt(t)).left + To(t).scrollLeft;
}
function E7(t) {
  const e = Xt(t), n = To(t), r = t.ownerDocument.body, i = Bn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), a = Bn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + E0(t);
  const l = -n.scrollTop;
  return gt(r).direction === "rtl" && (o += Bn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: l
  };
}
function w7(t, e) {
  const n = ot(t), r = Xt(t), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, l = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = cc();
    (!u || u && e === "fixed") && (l = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: l,
    y: c
  };
}
function C7(t, e) {
  const n = Yn(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, a = Dt(t) ? Cr(t) : vn(1), o = t.clientWidth * a.x, l = t.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: l,
    x: c,
    y: u
  };
}
function mf(t, e, n) {
  let r;
  if (e === "viewport")
    r = w7(t, n);
  else if (e === "document")
    r = E7(Xt(t));
  else if (Yt(e))
    r = C7(e, n);
  else {
    const i = b0(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return Ga(r);
}
function w0(t, e) {
  const n = Nr(t);
  return n === e || !Yt(n) || Ao(n) ? !1 : gt(n).position === "fixed" || w0(n, e);
}
function x7(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = Mi(t, [], !1).filter((l) => Yt(l) && yn(l) !== "body"), i = null;
  const a = gt(t).position === "fixed";
  let o = a ? Nr(t) : t;
  for (; Yt(o) && !Ao(o); ) {
    const l = gt(o), c = lc(o);
    !c && l.position === "fixed" && (i = null), (a ? !c && !i : !c && l.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Xi(o) && !c && w0(t, o)) ? r = r.filter((f) => f !== o) : i = l, o = Nr(o);
  }
  return e.set(t, r), r;
}
function k7(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? x7(e, this._c) : [].concat(n), r], l = o[0], c = o.reduce((u, f) => {
    const d = mf(e, f, i);
    return u.top = Bn(d.top, u.top), u.right = Rr(d.right, u.right), u.bottom = Rr(d.bottom, u.bottom), u.left = Bn(d.left, u.left), u;
  }, mf(e, l, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function _7(t) {
  return y0(t);
}
function $7(t, e, n) {
  const r = Dt(e), i = Xt(e), a = n === "fixed", o = Yn(t, !0, a, e);
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = vn(0);
  if (r || !r && !a)
    if ((yn(e) !== "body" || Xi(i)) && (l = To(e)), r) {
      const u = Yn(e, !0, a, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = E0(i));
  return {
    x: o.left + l.scrollLeft - c.x,
    y: o.top + l.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function hf(t, e) {
  return !Dt(t) || gt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function C0(t, e) {
  const n = ot(t);
  if (!Dt(t))
    return n;
  let r = hf(t, e);
  for (; r && h7(r) && gt(r).position === "static"; )
    r = hf(r, e);
  return r && (yn(r) === "html" || yn(r) === "body" && gt(r).position === "static" && !lc(r)) ? n : r || v7(t) || n;
}
const S7 = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || C0, a = this.getDimensions;
  return {
    reference: $7(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function O7(t) {
  return gt(t).direction === "rtl";
}
const F7 = {
  convertOffsetParentRelativeRectToViewportRelativeRect: y7,
  getDocumentElement: Xt,
  getClippingRect: k7,
  getOffsetParent: C0,
  getElementRects: S7,
  getClientRects: b7,
  getDimensions: _7,
  getScale: Cr,
  isElement: Yt,
  isRTL: O7
};
function R7(t, e) {
  let n = null, r;
  const i = Xt(t);
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
    const p = fa(f), b = fa(i.clientWidth - (u + d)), y = fa(i.clientHeight - (f + m)), g = fa(u), x = {
      rootMargin: -p + "px " + -b + "px " + -y + "px " + -g + "px",
      threshold: Bn(0, Rr(1, c)) || 1
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
function N7(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: l = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = uc(t), f = i || a ? [...u ? Mi(u) : [], ...Mi(e)] : [];
  f.forEach((h) => {
    i && h.addEventListener("scroll", n, {
      passive: !0
    }), a && h.addEventListener("resize", n);
  });
  const d = u && l ? R7(u, n) : null;
  let m = -1, p = null;
  o && (p = new ResizeObserver((h) => {
    let [x] = h;
    x && x.target === u && p && (p.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      p && p.observe(e);
    })), n();
  }), u && !c && p.observe(u), p.observe(e));
  let b, y = c ? Yn(t) : null;
  c && g();
  function g() {
    const h = Yn(t);
    y && (h.x !== y.x || h.y !== y.y || h.width !== y.width || h.height !== y.height) && n(), y = h, b = requestAnimationFrame(g);
  }
  return n(), () => {
    f.forEach((h) => {
      i && h.removeEventListener("scroll", n), a && h.removeEventListener("resize", n);
    }), d && d(), p && p.disconnect(), p = null, c && cancelAnimationFrame(b);
  };
}
const P7 = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: F7,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return o7(t, e, {
    ...i,
    platform: a
  });
};
let pr = null, xr = null;
Mr && (pr = document.createElement("div"), pr.className = "adm-px-tester", pr.style.setProperty("--size", "10"), document.body.appendChild(pr), xr = document.createElement("div"), xr.className = "adm-px-tester", document.body.appendChild(xr));
function Wn(t) {
  return pr === null || xr === null || pr.getBoundingClientRect().height === 10 ? t : (xr.style.setProperty("--size", t.toString()), xr.getBoundingClientRect().height);
}
const M7 = He((t) => H(t, s.createElement("svg", {
  viewBox: "0 0 30 16"
}, s.createElement("g", {
  fill: "currentColor"
}, s.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), A7 = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function T7(t) {
  var e;
  return (e = A7[t]) !== null && e !== void 0 ? e : t;
}
var Io = {}, fc = Wr.default;
Object.defineProperty(Io, "__esModule", {
  value: !0
});
var I7 = Io.default = j7, L7 = Io.getDOM = x0;
Io.isDOM = el;
var D7 = fc(wn), V7 = fc(s), vf = fc(Fa);
function el(t) {
  return t instanceof HTMLElement || t instanceof SVGElement;
}
function x0(t) {
  return t && (0, D7.default)(t) === "object" && el(t.nativeElement) ? t.nativeElement : el(t) ? t : null;
}
function j7(t) {
  var e = x0(t);
  if (e)
    return e;
  if (t instanceof V7.default.Component) {
    var n;
    return (n = vf.default.findDOMNode) === null || n === void 0 ? void 0 : n.call(vf.default, t);
  }
  return null;
}
var nt = {}, dc = {}, B7 = po.default;
Object.defineProperty(dc, "__esModule", {
  value: !0
});
dc.default = Z7;
var W7 = B7(s);
function Z7(t, e, n) {
  var r = W7.useRef({});
  return (!("value" in r.current) || n(r.current.condition, e)) && (r.current.value = t(), r.current.condition = e), r.current.value;
}
var mc = {}, q7 = Wr.default;
Object.defineProperty(mc, "__esModule", {
  value: !0
});
mc.default = Y7;
var H7 = q7(wn), U7 = Symbol.for("react.element"), z7 = Symbol.for("react.transitional.element"), K7 = Symbol.for("react.fragment");
function Y7(t) {
  return (
    // Base object type
    t && (0, H7.default)(t) === "object" && // React Element type
    (t.$$typeof === U7 || t.$$typeof === z7) && // React Fragment type
    t.type === K7
  );
}
var hc, vc, pc, gc = Wr.default;
Object.defineProperty(nt, "__esModule", {
  value: !0
});
nt.useComposeRef = pc = nt.supportRef = nt.supportNodeRef = vc = nt.getNodeRef = nt.fillRef = hc = nt.composeRef = void 0;
var G7 = gc(wn), k0 = s, es = Vn, X7 = gc(dc), Q7 = gc(mc), J7 = Number(k0.version.split(".")[0]), ey = nt.fillRef = function(e, n) {
  typeof e == "function" ? e(n) : (0, G7.default)(e) === "object" && e && "current" in e && (e.current = n);
}, ty = hc = nt.composeRef = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  var i = n.filter(Boolean);
  return i.length <= 1 ? i[0] : function(a) {
    n.forEach(function(o) {
      ey(o, a);
    });
  };
};
nt.useComposeRef = function() {
  for (var e = arguments.length, n = new Array(e), r = 0; r < e; r++)
    n[r] = arguments[r];
  return (0, X7.default)(function() {
    return ty.apply(void 0, n);
  }, n, function(i, a) {
    return i.length !== a.length || i.every(function(o, l) {
      return o !== a[l];
    });
  });
};
var ny = pc = nt.supportRef = function(e) {
  var n, r;
  if (!e)
    return !1;
  if (yc(e) && J7 >= 19)
    return !0;
  var i = (0, es.isMemo)(e) ? e.type.type : e.type;
  return !(typeof i == "function" && !((n = i.prototype) !== null && n !== void 0 && n.render) && i.$$typeof !== es.ForwardRef || typeof e == "function" && !((r = e.prototype) !== null && r !== void 0 && r.render) && e.$$typeof !== es.ForwardRef);
};
function yc(t) {
  return /* @__PURE__ */ (0, k0.isValidElement)(t) && !(0, Q7.default)(t);
}
nt.supportNodeRef = function(e) {
  return yc(e) && ny(e);
};
vc = nt.getNodeRef = function(e) {
  if (e && yc(e)) {
    var n = e;
    return n.props.propertyIsEnumerable("ref") ? n.props.ref : n.ref;
  }
  return null;
};
class ry extends D.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = I7(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return this.props.children;
  }
}
const iy = D.forwardRef(({
  children: t
}, e) => {
  const n = D.useRef(null), r = D.createRef(), i = D.Children.only(t), a = pc(t), o = () => {
    var c;
    return a ? L7(n.current) : (c = r.current) === null || c === void 0 ? void 0 : c.element;
  };
  D.useImperativeHandle(e, () => ({
    element: o()
  }));
  const l = hc(n, vc(i));
  return a ? D.cloneElement(i, {
    ref: l
  }) : D.createElement(ry, {
    ref: r
  }, i);
}), kn = "adm-popover", ay = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, _0 = Ee((t, e) => {
  const n = G(ay, t), r = T7(n.placement), [i, a] = ue({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  _e(e, () => ({
    show: () => a(!0),
    hide: () => a(!1),
    visible: i
  }), [i]);
  const o = W(null), l = W(null), c = W(null), u = hn(n.stopPropagation, H(n, s.createElement("div", {
    className: Z(kn, `${kn}-${n.mode}`, {
      [`${kn}-hidden`]: !i
    }),
    ref: l
  }, s.createElement("div", {
    className: `${kn}-arrow`,
    ref: c
  }, s.createElement(M7, {
    className: `${kn}-arrow-icon`
  })), s.createElement("div", {
    className: `${kn}-inner`
  }, s.createElement("div", {
    className: `${kn}-inner-content`
  }, n.content))))), [f, d] = X(null);
  function m() {
    var b, y, g;
    return Me(this, void 0, void 0, function* () {
      const h = (y = (b = o.current) === null || b === void 0 ? void 0 : b.element) !== null && y !== void 0 ? y : null, x = l.current, v = c.current;
      if (d(h), !h || !x || !v)
        return;
      const {
        x: E,
        y: w,
        placement: C,
        middlewareData: k
      } = yield P7(h, x, {
        placement: r,
        middleware: [f7(Wn(12)), d7({
          padding: Wn(4),
          crossAxis: !1,
          limiter: m7()
        }), l7(), c7(), s7({
          element: v,
          padding: Wn(12)
        })]
      });
      Object.assign(x.style, {
        left: `${E}px`,
        top: `${w}px`
      });
      const F = C.split("-")[0], M = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[F], {
        x: S,
        y: V
      } = (g = k.arrow) !== null && g !== void 0 ? g : {};
      Object.assign(v.style, {
        left: S != null ? `${S}px` : "",
        top: V != null ? `${V}px` : "",
        right: "",
        bottom: "",
        [M]: "calc(var(--arrow-size) * -1)"
      });
      const I = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[F];
      v.style.setProperty("--arrow-icon-rotate", I);
    });
  }
  Ie(() => {
    m();
  }), J(() => {
    if (!f || !n.trigger)
      return;
    function b() {
      a((y) => !y);
    }
    return f.addEventListener("click", b), () => {
      f.removeEventListener("click", b);
    };
  }, [f, n.trigger]), J(() => {
    const b = l.current;
    if (!(!f || !b || !i))
      return N7(f, b, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f, i]), Zf(() => {
    n.trigger && a(!1);
  }, [() => {
    var b;
    return (b = o.current) === null || b === void 0 ? void 0 : b.element;
  }, l], ["click", "touchmove"]);
  const p = mo(i, !1, n.destroyOnHide);
  return s.createElement(s.Fragment, null, s.createElement(iy, {
    ref: o
  }, n.children), p && Lr(n.getContainer, u));
}), rn = "adm-popover-menu", oy = Ee((t, e) => {
  const n = W(null);
  _e(e, () => n.current, []);
  const r = Qe((a) => {
    var o;
    const {
      onAction: l
    } = t;
    l && l(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [t.onAction]), i = me(() => {
    const a = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), o = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return s.createElement("div", {
      className: `${rn}-list`
    }, s.createElement("div", {
      className: Z(`${rn}-list-inner`, {
        [`${rn}-list-scroll`]: a
      }),
      style: {
        height: o
      }
    }, t.actions.map((l, c) => {
      var u;
      return s.createElement("a", {
        key: (u = l.key) !== null && u !== void 0 ? u : c,
        className: Z(`${rn}-item`, "adm-plain-anchor", {
          [`${rn}-item-disabled`]: l.disabled
        }),
        onClick: () => {
          var f;
          l.disabled || (r(l), (f = l.onClick) === null || f === void 0 || f.call(l));
        }
      }, l.icon && s.createElement("div", {
        className: `${rn}-item-icon`
      }, l.icon), s.createElement("div", {
        className: `${rn}-item-text`
      }, l.text));
    })));
  }, [t.actions, r]);
  return s.createElement(_0, Object.assign({
    ref: n
  }, t, {
    className: Z(rn, t.className),
    content: i
  }), t.children);
}), $0 = pe(_0, {
  Menu: oy
});
function ts(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function sy(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function ly(t) {
  return typeof t == "function" && !sy(t) && t.defaultProps === void 0;
}
function S0(t) {
  return Vn.isFragment(t) ? !1 : Vn.isMemo(t) ? S0(t.type) : !ly(t.type);
}
const cy = "__SPLIT__", Ye = "adm-form-item", uy = s.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), fy = (t) => {
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
    arrow: p,
    arrowIcon: b,
    childElementPosition: y = "normal"
  } = G(r, t), g = at(ic), h = t.hasFeedback !== void 0 ? t.hasFeedback : g.hasFeedback, x = t.layout || g.layout, v = (e = t.disabled) !== null && e !== void 0 ? e : g.disabled, E = (() => {
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
  }, o, E, l && s.createElement($0, {
    content: l,
    mode: "dark",
    trigger: "click"
  }, s.createElement("span", {
    className: `${Ye}-label-help`,
    onClick: (k) => {
      k.stopPropagation(), k.preventDefault();
    }
  }, c || s.createElement(rp, null)))), C = (!!t.description || h) && s.createElement(s.Fragment, null, t.description, h && s.createElement(s.Fragment, null, t.errors.map((k, F) => s.createElement("div", {
    key: `error-${F}`,
    className: `${Ye}-feedback-error`
  }, k)), t.warnings.map((k, F) => s.createElement("div", {
    key: `warning-${F}`,
    className: `${Ye}-feedback-warning`
  }, k))));
  return H(t, s.createElement(Tt.Item, {
    style: i,
    title: x === "vertical" && w,
    prefix: x === "horizontal" && w,
    extra: a,
    description: C,
    className: Z(Ye, `${Ye}-${x}`, {
      [`${Ye}-hidden`]: m,
      [`${Ye}-has-error`]: t.errors.length
    }),
    disabled: v,
    onClick: t.onClick,
    clickable: t.clickable,
    arrowIcon: b || p
  }, s.createElement("div", {
    className: Z(`${Ye}-child`, `${Ye}-child-position-${y}`)
  }, s.createElement("div", {
    className: Z(`${Ye}-child-inner`)
  }, f))));
}, dy = (t) => {
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
    arrow: F,
    arrowIcon: M
  } = t, S = dn(t, ["style", "label", "help", "helpIcon", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow", "arrowIcon"]), {
    name: V
  } = at(ic), {
    validateTrigger: I
  } = at(h0), P = X6(v, I, x), R = W(null), T = W(0);
  T.current += 1;
  const [N, $] = X({}), A = Qe((q, K) => {
    $((z) => {
      const ne = Object.assign({}, z), oe = K.join(cy);
      return q.destroy ? delete ne[oe] : ne[oe] = q, ne;
    });
  }, [$]);
  function _(q, K, z, ne) {
    var oe, U;
    if (u && !f)
      return q;
    const ee = (oe = z == null ? void 0 : z.errors) !== null && oe !== void 0 ? oe : [], te = Object.keys(N).reduce((de, xe) => {
      var Ue, De;
      const jt = (De = (Ue = N[xe]) === null || Ue === void 0 ? void 0 : Ue.errors) !== null && De !== void 0 ? De : [];
      return jt.length && (de = [...de, ...jt]), de;
    }, ee), re = (U = z == null ? void 0 : z.warnings) !== null && U !== void 0 ? U : [], ae = Object.keys(N).reduce((de, xe) => {
      var Ue, De;
      const jt = (De = (Ue = N[xe]) === null || Ue === void 0 ? void 0 : Ue.warnings) !== null && De !== void 0 ? De : [];
      return jt.length && (de = [...de, ...jt]), de;
    }, re);
    return H(t, s.createElement(fy, {
      style: e,
      label: n,
      extra: a,
      help: r,
      helpIcon: i,
      description: p,
      required: ne,
      disabled: b,
      hasFeedback: o,
      htmlFor: K,
      errors: te,
      warnings: ae,
      onClick: E && ((de) => E(de, R)),
      hidden: f,
      layout: d,
      childElementPosition: m,
      clickable: k,
      arrow: F,
      arrowIcon: M
    }, s.createElement(of.Provider, {
      value: A
    }, q)));
  }
  const O = typeof g == "function";
  if (!l && !O && !t.dependencies)
    return _(g);
  let L = {};
  L.label = typeof n == "string" ? n : "", h && (L = Object.assign(Object.assign({}, L), h));
  const B = at(of), j = (q) => {
    if (u && B) {
      const K = q.name;
      B(q, K);
    }
  };
  return s.createElement(tc, Object.assign({}, S, {
    name: l,
    shouldUpdate: w,
    dependencies: C,
    rules: y,
    trigger: x,
    validateTrigger: P,
    onMetaChange: j,
    messageVariables: L
  }), (q, K, z) => {
    let ne = null;
    const oe = c !== void 0 ? c : y && y.some((te) => !!(te && typeof te == "object" && te.required)), U = ts(l).length && K ? K.name : [], ee = (U.length > 0 && V ? [V, ...U] : U).join("_");
    if (O)
      (w || C) && !l && (ne = g(z));
    else if (!(C && !l))
      if (s.isValidElement(g)) {
        g.props.defaultValue;
        const te = Object.assign(Object.assign({}, g.props), q);
        S0(g) && (te.ref = (ae) => {
          const de = g.ref;
          de && (typeof de == "function" && de(ae), "current" in de && (de.current = ae)), R.current = ae;
        }), te.id || (te.id = ee), (/* @__PURE__ */ new Set([...ts(x), ...ts(P)])).forEach((ae) => {
          te[ae] = (...de) => {
            var xe, Ue, De;
            (xe = q[ae]) === null || xe === void 0 || xe.call(q, ...de), (De = (Ue = g.props)[ae]) === null || De === void 0 || De.call(Ue, ...de);
          };
        }), ne = s.createElement(uy, {
          value: q[t.valuePropName || "value"],
          update: T.current
        }, s.cloneElement(g, te));
      } else
        ne = g;
    return _(ne, ee, K, oe);
  });
}, my = (t) => {
  const e = Bf(), n = at(Kn), r = n.getFieldsValue(t.to), i = s.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return s.createElement(s.Fragment, null, i, t.to.map((a) => s.createElement(hy, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: e
  })));
}, hy = He((t) => {
  const e = rc(t.namePath, t.form);
  return Hi(() => {
    t.onChange();
  }, [e]), null;
}), ob = pe(Z6, {
  Item: dy,
  Subscribe: my,
  Header: f0,
  Array: m0,
  useForm: nc,
  useWatch: rc
}), O0 = "adm-grid", vy = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = Tn(n[0]), e["--gap-vertical"] = Tn(n[1])) : e["--gap"] = Tn(n)), H(t, s.createElement("div", {
    className: O0,
    style: e
  }, t.children));
}, py = (t) => {
  const e = G({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return H(e, s.createElement("div", {
    className: `${O0}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, F0 = pe(vy, {
  Item: py
}), da = () => [1, 0, 0, 1, 0, 0], pf = (t) => t[4], gf = (t) => t[5], ei = (t) => t[0], ti = (t, e, n) => R0([1, 0, 0, 1, e, n], t), gy = (t, e, n = e) => R0([e, 0, 0, n, 0, 0], t), yy = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], R0 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], by = o3([Bd, Up]), ns = "adm-image-viewer", N0 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n,
    imageRender: r,
    index: i
  } = t, a = W([]), o = W(null), l = W(null), [{
    matrix: c
  }, u] = Le(() => ({
    matrix: da(),
    config: {
      tension: 200
    }
  })), f = ds(o), d = ds(l), m = W(!1), p = (h) => {
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
    const x = -f.width / 2, v = -f.height / 2, E = -d.width / 2, w = -d.height / 2, C = ei(h), k = C * d.width, F = C * d.height, M = x - (k - f.width), S = x, V = v - (F - f.height), I = v, [P, R] = yy(h, [E, w]);
    return {
      x: {
        position: P,
        minX: M,
        maxX: S
      },
      y: {
        position: R,
        minY: V,
        maxY: I
      }
    };
  }, b = (h, x, v, E = 0) => [h <= x - E, h >= v + E], y = (h, x, v = !1) => {
    if (!f || !d)
      return h;
    const E = ei(h), w = E * d.width, C = E * d.height, {
      x: {
        position: k,
        minX: F,
        maxX: M
      },
      y: {
        position: S,
        minY: V,
        maxY: I
      }
    } = p(h);
    if (x === "translate") {
      let P = k, R = S;
      return w > f.width ? P = v ? Re(k, F, M) : Si(k, F, M, E * 50) : P = -w / 2, C > f.height ? R = v ? Re(S, V, I) : Si(S, V, I, E * 50) : R = -C / 2, ti(h, P - k, R - S);
    }
    if (x === "scale" && v) {
      const [P, R] = [w > f.width ? Re(k, F, M) : -w / 2, C > f.height ? Re(S, V, I) : -C / 2];
      return ti(h, P - k, R - S);
    }
    return h;
  };
  by({
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
      const v = ei(c.get());
      if (e && (e.current = v !== 1), !m.current && v <= 1)
        u.start({
          matrix: da()
        });
      else {
        const E = c.get(), w = [h.offset[0] - pf(E), h.offset[1] - gf(E)], C = ti(E, ...h.last ? [w[0] + h.velocity[0] * h.direction[0] * 200, w[1] + h.velocity[1] * h.direction[1] * 200] : w);
        u.start({
          matrix: y(C, "translate", h.last),
          immediate: !h.last
        });
        const {
          x: {
            position: k,
            minX: F,
            maxX: M
          }
        } = p(C);
        h.last && a.current.some((S) => S) && b(k, F, M).some((S) => S) && (e && (e.current = !1), u.start({
          matrix: da()
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
      const w = h.last ? Re(v, 1, E) : v;
      if ((x = t.onZoomChange) === null || x === void 0 || x.call(t, w), h.last && w <= 1)
        u.start({
          matrix: da()
        }), e && (e.current = !1);
      else {
        if (!f)
          return;
        const C = c.get(), k = ei(C), F = h.origin[0] - f.width / 2, M = h.origin[1] - f.height / 2;
        let S = ti(C, -F, -M);
        S = gy(S, w / k), S = ti(S, F, M), u.start({
          matrix: y(S, "scale", h.last),
          immediate: !h.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: o,
    drag: {
      from: () => [pf(c.get()), gf(c.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [ei(c.get()), 0],
      pointer: {
        touch: !0
      }
    }
  });
  const g = typeof r == "function" && r(t.image, {
    index: i
  });
  return s.createElement("div", {
    className: `${ns}-slide`
  }, s.createElement("div", {
    className: `${ns}-control`,
    ref: o
  }, s.createElement(Ce.div, {
    className: `${ns}-image-wrapper`,
    style: {
      matrix: c
    }
  }, g || s.createElement("img", {
    ref: l,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, rs = "adm-image-viewer", Ey = Ee((t, e) => {
  const n = window.innerWidth + Wn(16), [{
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
    const m = Re(u, 0, a - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  _e(e, () => ({
    swipeTo: o
  }));
  const l = W(!1), c = Vt((u) => {
    if (l.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, p = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(Re(Math.round((f + p) / n), d, m));
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
    className: `${rs}-slides`
  }, c()), s.createElement(Ce.div, {
    className: `${rs}-indicator`
  }, r.to((u) => `${Re(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), s.createElement(Ce.div, {
    className: `${rs}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => s.createElement(N0, {
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
}), Qa = "adm-image-viewer", P0 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, M0 = (t) => {
  var e, n, r;
  const i = G(P0, t), a = s.createElement(Vi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, s.createElement("div", {
    className: Z(`${Qa}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, (i.image || typeof i.imageRender == "function") && s.createElement(N0, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom,
    imageRender: i.imageRender
  })), i.image && s.createElement("div", {
    className: `${Qa}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), s.createElement(Br, {
    position: "bottom"
  })));
  return Lr(i.getContainer, a);
}, wy = Object.assign(Object.assign({}, P0), {
  defaultIndex: 0
}), A0 = Ee((t, e) => {
  var n, r, i;
  const a = G(wy, t), [o, l] = X(a.defaultIndex), c = W(null);
  _e(e, () => ({
    swipeTo: (d, m) => {
      var p;
      l(d), (p = c.current) === null || p === void 0 || p.swipeTo(d, m);
    }
  }));
  const u = Qe((d) => {
    var m;
    d !== o && (l(d), (m = a.onIndexChange) === null || m === void 0 || m.call(a, d));
  }, [a.onIndexChange, o]), f = s.createElement(Vi, {
    visible: a.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: a.afterClose,
    destroyOnClose: !0,
    className: (n = a == null ? void 0 : a.classNames) === null || n === void 0 ? void 0 : n.mask
  }, s.createElement("div", {
    className: Z(`${Qa}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && s.createElement(Ey, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom,
    imageRender: a.imageRender
  })), a.images && s.createElement("div", {
    className: `${Qa}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), s.createElement(Br, {
    position: "bottom"
  })));
  return Lr(a.getContainer, f);
}), Pr = /* @__PURE__ */ new Set();
function Cy(t) {
  bc();
  const e = Un(s.createElement(M0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Pr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Pr.add(e), e;
}
function xy(t) {
  bc();
  const e = Un(s.createElement(A0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Pr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Pr.add(e), e;
}
function bc() {
  Pr.forEach((t) => {
    t.close();
  }), Pr.clear();
}
const ky = pe(A0, {
  show: xy
}), _y = pe(M0, {
  Multi: ky,
  show: Cy,
  clear: bc
}), _n = "adm-space", $y = {
  direction: "horizontal"
}, Ec = (t) => {
  const e = G($y, t), {
    direction: n,
    onClick: r
  } = e;
  return H(e, s.createElement("div", {
    className: Z(_n, {
      [`${_n}-wrap`]: e.wrap,
      [`${_n}-block`]: e.block,
      [`${_n}-${n}`]: !0,
      [`${_n}-align-${e.align}`]: !!e.align,
      [`${_n}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, s.Children.map(e.children, (i) => i != null && s.createElement("div", {
    className: `${_n}-item`
  }, i))));
}, $n = "adm-image-uploader", Sy = (t) => {
  const {
    locale: e
  } = fe(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: l
  } = t, c = me(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  J(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && s.createElement("div", {
      className: `${$n}-cell-mask`
    }, s.createElement("span", {
      className: `${$n}-cell-loading`
    }, s.createElement(ql, {
      color: "white"
    }), s.createElement("span", {
      className: `${$n}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && s.createElement("span", {
      className: `${$n}-cell-delete`,
      onClick: o
    }, a);
  }
  return s.createElement("div", {
    className: Z(`${$n}-cell`, t.status === "fail" && `${$n}-cell-fail`)
  }, s.createElement(bo, {
    className: `${$n}-cell-image`,
    src: c,
    fit: l,
    onClick: t.onClick
  }), u(), f());
}, yf = Sy, Mt = "adm-image-uploader", Oy = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: s.createElement(ho, {
    className: `${Mt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, sb = Ee((t, e) => {
  const {
    locale: n
  } = fe(), r = G(Oy, t), {
    columns: i
  } = r, [a, o] = ue(r), [l, c] = X([]), u = W(null), f = ds(u), d = W(null), [m, p] = X(80), b = W(null);
  Ie(() => {
    const P = d.current;
    if (i && f && P) {
      const R = f.width, T = S1(window.getComputedStyle(P).getPropertyValue("height"));
      p((R - T * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const y = {
    "--cell-size": m + "px"
  };
  Ie(() => {
    c((P) => P.filter((R) => R.url === void 0 ? !0 : !a.some((T) => T.url === R.url)));
  }, [a]), Ie(() => {
    var P;
    (P = r.onUploadQueueChange) === null || P === void 0 || P.call(r, l.map((R) => ({
      id: R.id,
      status: R.status
    })));
  }, [l]);
  const g = W(0), {
    maxCount: h,
    onPreview: x,
    renderItem: v
  } = r;
  function E(P, R) {
    return Me(this, void 0, void 0, function* () {
      const {
        beforeUpload: T
      } = r;
      let N = P;
      return N = yield T == null ? void 0 : T(P, R), N;
    });
  }
  function w(P) {
    return r.showFailed ? P : P.filter((R) => R.status !== "fail");
  }
  function C(P) {
    var R;
    return Me(this, void 0, void 0, function* () {
      P.persist();
      const {
        files: T
      } = P.target;
      if (!T)
        return;
      let N = [].slice.call(T);
      if (P.target.value = "", r.beforeUpload) {
        const _ = N.map((O) => E(O, N));
        yield Promise.all(_).then((O) => {
          N = O.filter(Boolean);
        });
      }
      if (N.length === 0)
        return;
      if (h > 0) {
        const _ = a.length + N.length - h;
        _ > 0 && (N = N.slice(0, N.length - _), (R = r.onCountExceed) === null || R === void 0 || R.call(r, _));
      }
      const $ = N.map((_) => ({
        id: g.current++,
        status: "pending",
        file: _
      }));
      c((_) => [...w(_), ...$]);
      const A = [];
      yield Promise.all($.map((_, O) => Me(this, void 0, void 0, function* () {
        try {
          const L = yield r.upload(_.file);
          A[O] = L, c((B) => B.map((j) => j.id === _.id ? Object.assign(Object.assign({}, j), {
            status: "success",
            url: L.url
          }) : j));
        } catch (L) {
          c((B) => B.map((j) => j.id === _.id ? Object.assign(Object.assign({}, j), {
            status: "fail"
          }) : j)), console.error(L);
        }
      }))), o((_) => _.concat(A).filter(Boolean));
    });
  }
  const k = W(null);
  function F(P) {
    k.current = _y.Multi.show({
      images: a.map((R) => R.url),
      defaultIndex: P,
      onClose: () => {
        k.current = null;
      }
    });
  }
  Ii(() => {
    var P;
    (P = k.current) === null || P === void 0 || P.close();
  });
  const M = w(l), S = r.showUpload && (h === 0 || a.length + M.length < h), V = () => a.map((P, R) => {
    var T, N;
    const $ = s.createElement(yf, {
      key: (T = P.key) !== null && T !== void 0 ? T : R,
      url: (N = P.thumbnailUrl) !== null && N !== void 0 ? N : P.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && F(R), x && x(R, P);
      },
      onDelete: () => Me(void 0, void 0, void 0, function* () {
        var A;
        (yield (A = r.onDelete) === null || A === void 0 ? void 0 : A.call(r, P)) !== !1 && o(a.filter((O, L) => L !== R));
      })
    });
    return v ? v($, P, a) : $;
  }), I = s.createElement(s.Fragment, null, V(), l.map((P) => !r.showFailed && P.status === "fail" ? null : s.createElement(yf, {
    key: P.id,
    file: P.file,
    deletable: P.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: P.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(l.filter((R) => R.id !== P.id));
    }
  })), s.createElement("div", {
    className: `${Mt}-upload-button-wrap`,
    style: S ? void 0 : {
      display: "none"
    }
  }, r.children || s.createElement("span", {
    className: `${Mt}-cell ${Mt}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, s.createElement("span", {
    className: `${Mt}-upload-button-icon`
  }, s.createElement(Od, null))), !r.disableUpload && s.createElement("input", {
    "aria-label": n.ImageUploader.upload,
    ref: b,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${Mt}-input`,
    onChange: C
  })));
  return _e(e, () => ({
    get nativeElement() {
      return b.current;
    }
  })), H(r, s.createElement("div", {
    className: Mt,
    ref: u
  }, i ? s.createElement(F0, {
    className: `${Mt}-grid`,
    columns: i,
    style: y
  }, s.createElement("div", {
    className: `${Mt}-gap-measure`,
    ref: d
  }), I.props.children) : s.createElement(Ec, {
    className: `${Mt}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
}), T0 = () => null, cr = "adm-index-bar", Fy = (t) => {
  const [e, n] = X(!1);
  return s.createElement("div", {
    className: Z(`${cr}-sidebar`, {
      [`${cr}-sidebar-interacting`]: e
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
      className: `${cr}-sidebar-row`,
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
      className: `${cr}-sidebar-bubble`
    }, i), s.createElement("div", {
      className: Z(`${cr}-sidebar-item`, {
        [`${cr}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, s.createElement("div", null, i)));
  }));
}, ur = "adm-index-bar", Ry = {
  sticky: !0
}, Ny = Ee((t, e) => {
  const n = G(Ry, t), r = Wn(35), i = W(null), a = [], o = [];
  Cn(n.children, (d) => {
    var m;
    s.isValidElement(d) && d.type === T0 && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(H(d.props, s.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${ur}-anchor`
    }, s.createElement("div", {
      className: `${ur}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [l, c] = X(() => {
    const d = a[0];
    return d ? d.index : null;
  });
  _e(e, () => ({
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
  } = no(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const p = m.scrollTop, b = m.getElementsByClassName(`${ur}-anchor`);
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
  return H(n, s.createElement("div", {
    className: Z(`${ur}`, {
      [`${ur}-sticky`]: n.sticky
    })
  }, s.createElement(Fy, {
    indexItems: a,
    activeIndex: l,
    onActive: (d) => {
      u(d);
    }
  }), s.createElement("div", {
    className: `${ur}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), lb = pe(Ny, {
  Panel: T0
});
function Py(t) {
  return t === window;
}
const I0 = "adm-infinite-scroll", My = {
  threshold: 250,
  children: (t, e, n) => s.createElement(Ay, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, cb = (t) => {
  const e = G(My, t), [n, r] = X(!1), i = jh((p) => Me(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(p);
    } catch (b) {
      throw r(!0), b;
    }
  })), a = W(null), [o, l] = X({}), c = W(o), [u, f] = X(), {
    run: d
  } = no(() => Me(void 0, void 0, void 0, function* () {
    if (c.current !== o || !e.hasMore)
      return;
    const p = a.current;
    if (!p || !p.offsetParent)
      return;
    const b = Ma(p);
    if (f(b), !b)
      return;
    const g = p.getBoundingClientRect().top;
    if ((Py(b) ? window.innerHeight : b.getBoundingClientRect().bottom) >= g - e.threshold) {
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
  J(() => {
    d();
  }), J(() => {
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
    return Me(this, void 0, void 0, function* () {
      r(!1);
      try {
        yield i(!0), l(c.current);
      } catch {
      }
    });
  }
  return H(e, s.createElement("div", {
    className: I0,
    ref: a
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, Ay = (t) => {
  const {
    locale: e
  } = fe();
  return t.hasMore ? t.failed ? s.createElement("span", null, s.createElement("span", {
    className: `${I0}-failed-text`
  }, e.InfiniteScroll.failedToLoad), s.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : s.createElement(s.Fragment, null, s.createElement("span", null, e.common.loading), s.createElement(o1, null)) : s.createElement("span", null, e.InfiniteScroll.noMore);
};
function L0({
  onEnterPress: t,
  onKeyDown: e
}) {
  return (r) => {
    t && (r.code === "Enter" || r.keyCode === 13) && t(r), e == null || e(r);
  };
}
const ma = "adm-input", Ty = {
  defaultValue: "",
  clearIcon: s.createElement(Nl, null),
  onlyShowClearWhenFocus: !0
}, D0 = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = fe(), i = G(Ty, r, t), [a, o] = ue(i), [l, c] = X(!1), u = W(!1), f = W(null), d = L0({
    onEnterPress: i.onEnterPress,
    onKeyDown: i.onKeyDown
  });
  _e(e, () => ({
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
      const y = b && Re(parseFloat(b), i.min, i.max).toString();
      Number(b) !== Number(y) && (b = y);
    }
    b !== a && o(b);
  }
  const p = !i.clearable || !a || i.readOnly ? !1 : i.onlyShowClearWhenFocus ? l : !0;
  return H(i, s.createElement("div", {
    className: Z(`${ma}`, i.disabled && `${ma}-disabled`)
  }, s.createElement("input", {
    ref: f,
    className: `${ma}-element`,
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
    className: `${ma}-clear`,
    onMouseDown: (b) => {
      b.preventDefault();
    },
    onClick: () => {
      var b, y;
      o(""), (b = i.onClear) === null || b === void 0 || b.call(i), X3() && u.current && (u.current = !1, (y = f.current) === null || y === void 0 || y.blur());
    },
    "aria-label": n.Input.clear
  }, i.clearIcon)));
}), Rt = "adm-jumbo-tabs", Iy = () => null, Ly = (t) => {
  var e;
  const n = W(null), r = W(null), i = {};
  let a = null;
  const o = [];
  Cn(t.children, (d, m) => {
    if (!bn(d))
      return;
    const p = d.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const b = o.push(d);
    i[p] = b - 1;
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
  } = _1(n, i[l]);
  return Ui(() => {
    f(!0);
  }, r), H(t, s.createElement("div", {
    className: Rt,
    ref: r
  }, s.createElement("div", {
    className: `${Rt}-header`
  }, s.createElement($1, {
    scrollTrackRef: n
  }), s.createElement(Ce.div, {
    className: `${Rt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => H(d.props, s.createElement("div", {
    key: d.key,
    className: `${Rt}-tab-wrapper`
  }, s.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: Z(`${Rt}-tab`, {
      [`${Rt}-tab-active`]: d.key === l,
      [`${Rt}-tab-disabled`]: d.props.disabled
    })
  }, s.createElement("div", {
    className: `${Rt}-tab-title`
  }, d.props.title), s.createElement("div", {
    className: `${Rt}-tab-description`
  }, d.props.description))))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === l;
    return s.createElement(Dr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, s.createElement("div", {
      className: `${Rt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, ub = pe(Ly, {
  Tab: Iy
}), Dy = (t) => {
  const {
    action: e
  } = t;
  return H(t.action, s.createElement(zt, {
    key: e.key,
    onClick: t.onAction,
    className: Z("adm-modal-button", {
      "adm-modal-button-primary": t.action.primary
    }),
    fill: t.action.primary ? "solid" : "none",
    size: t.action.primary ? "large" : "middle",
    block: !0,
    color: e.danger ? "danger" : "primary",
    loading: "auto",
    disabled: e.disabled
  }, e.text));
}, Vy = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, V0 = (t) => {
  const e = G(Vy, t), n = s.createElement(s.Fragment, null, !!e.image && s.createElement("div", {
    className: Wt("image-container")
  }, s.createElement(bo, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && s.createElement("div", {
    className: Wt("header")
  }, s.createElement($i, null, e.header)), !!e.title && s.createElement("div", {
    className: Wt("title")
  }, e.title), s.createElement("div", {
    className: Wt("content")
  }, typeof e.content == "string" ? s.createElement($i, null, e.content) : e.content), s.createElement(Ec, {
    direction: "vertical",
    block: !0,
    className: Z(Wt("footer"), e.actions.length === 0 && Wt("footer-empty"))
  }, e.actions.map((r, i) => s.createElement(Dy, {
    key: r.key,
    action: r,
    onAction: () => Me(void 0, void 0, void 0, function* () {
      var a, o, l;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = e.onAction) === null || o === void 0 ? void 0 : o.call(e, r, i)]), e.closeOnAction && ((l = e.onClose) === null || l === void 0 || l.call(e));
    })
  }))));
  return s.createElement(B1, {
    className: Z(Wt(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: Z(Wt("body"), e.image && Wt("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function Wt(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const tl = /* @__PURE__ */ new Set();
function wc(t) {
  const e = Un(s.createElement(V0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      tl.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return tl.add(e.close), e;
}
function jy(t) {
  const e = {
    confirmText: Ai().locale.Modal.ok
  }, n = G(e, t);
  return new Promise((r) => {
    wc(Object.assign(Object.assign({}, n), {
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
const By = {
  confirmText: "确认",
  cancelText: "取消"
};
function Wy(t) {
  const {
    locale: e
  } = Ai(), n = G(By, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    wc(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Me(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Me(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function Zy() {
  tl.forEach((t) => {
    t();
  });
}
const fb = pe(V0, {
  show: wc,
  alert: jy,
  confirm: Wy,
  clear: Zy
}), fr = "adm-nav-bar", bf = s.createElement(tp, null), db = (t) => {
  const {
    navBar: e = {}
  } = fe(), n = G(e, t), {
    back: r,
    backIcon: i,
    backArrow: a
  } = n, o = e.backIcon || bf, l = En(bf, e.backIcon, a === !0 ? o : a, i === !0 ? o : i);
  return H(n, s.createElement("div", {
    className: Z(fr)
  }, s.createElement("div", {
    className: `${fr}-left`,
    role: "button"
  }, r !== null && s.createElement("div", {
    className: `${fr}-back`,
    onClick: n.onBack
  }, l && s.createElement("span", {
    className: `${fr}-back-arrow`
  }, l), s.createElement("span", {
    "aria-hidden": "true"
  }, r)), n.left), s.createElement("div", {
    className: `${fr}-title`
  }, n.children), s.createElement("div", {
    className: `${fr}-right`
  }, n.right)));
}, ct = "adm-notice-bar", qy = {
  color: "default",
  delay: 2e3,
  speed: 50,
  icon: s.createElement(op, null),
  wrap: !1,
  shape: "rectangular",
  bordered: "block"
}, mb = He((t) => {
  const {
    noticeBar: e = {}
  } = fe(), n = G(qy, e, t), r = En(s.createElement(ho, {
    className: `${ct}-close-icon`
  }), e.closeIcon, t.closeIcon), i = W(null), a = W(null), [o, l] = X(!0), c = n.speed, u = W(!0), f = W(!1);
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
  return dv(() => {
    u.current = !1, d();
  }, n.delay), Ui(() => {
    d();
  }, i), Wl(() => {
    d();
  }, a, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), o ? H(n, s.createElement("div", {
    className: Z(ct, `${ct}-${n.color}`, `${ct}-${n.shape}`, {
      [`${ct}-wrap`]: n.wrap,
      [`${ct}-bordered`]: n.bordered === !0,
      [`${ct}-without-border`]: n.bordered === !1
    }),
    onClick: n.onClick
  }, n.icon && s.createElement("span", {
    className: `${ct}-left`
  }, n.icon), s.createElement("span", {
    ref: i,
    className: `${ct}-content`
  }, s.createElement("span", {
    onTransitionEnd: () => {
      f.current = !1, d();
    },
    ref: a,
    className: `${ct}-content-inner`
  }, n.content)), (n.closeable || n.extra) && s.createElement("span", {
    className: `${ct}-right`
  }, n.extra, n.closeable && s.createElement("div", {
    className: `${ct}-close`,
    onClick: () => {
      var m;
      l(!1), (m = n.onClose) === null || m === void 0 || m.call(n);
    }
  }, r)))) : null;
});
function Hy(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const Se = "adm-number-keyboard", Uy = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, hb = (t) => {
  const e = G(Uy, t), {
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
  } = fe(), d = W(null), m = me(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], C = l ? Hy(w) : w, k = Array.isArray(o) ? o : [o];
    return C.push("0"), a ? (k.length === 2 && C.splice(9, 0, k.pop()), C.push(k[0] || "")) : (C.splice(9, 0, k[0] || ""), C.push(k[1] || "BACKSPACE")), C;
  }, [o, a, l, l && n]), p = W(-1), b = W(-1), y = Gt(() => {
    var w;
    (w = e.onDelete) === null || w === void 0 || w.call(e);
  }), g = () => {
    p.current = window.setTimeout(() => {
      y(), b.current = window.setInterval(y, 150);
    }, 700);
  }, h = () => {
    clearTimeout(p.current), clearInterval(b.current);
  }, x = (w, C) => {
    var k, F;
    switch (w.preventDefault(), C) {
      case "BACKSPACE":
        y == null || y();
        break;
      case "OK":
        (k = e.onConfirm) === null || k === void 0 || k.call(e), e.closeOnConfirm && ((F = e.onClose) === null || F === void 0 || F.call(e));
        break;
      default:
        C !== "" && (u == null || u(C));
        break;
    }
  }, v = () => !c && !r ? null : s.createElement("div", {
    className: Z(`${Se}-header`, {
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
  }, s.createElement(Rd, null))), E = (w, C) => {
    const k = /^\d$/.test(w), F = w === "BACKSPACE", M = Z(`${Se}-key`, {
      [`${Se}-key-number`]: k,
      [`${Se}-key-sign`]: !k && w,
      [`${Se}-key-mid`]: C === 9 && !!a && m.length < 12
    }), S = w ? {
      role: "button",
      title: F ? f.Input.clear : w,
      tabIndex: -1
    } : void 0;
    return s.createElement("div", Object.assign({
      key: w,
      className: M,
      // 仅为  backspace 绑定，支持长按快速删除
      onTouchStart: F ? () => {
        h(), g();
      } : void 0,
      onTouchEnd: F ? (V) => {
        h(), x(V, w);
      } : void 0,
      // <div role="button" title="1" onTouchEnd={e => {}}>1</div> 安卓上 talback 可读不可点
      // see https://ua-gilded-eef7f9.netlify.app/grid-button-bug.html
      // 所以还是绑定 click，通过 touchEnd 的 preventDefault 防重复触发
      onClick: (V) => {
        h(), x(V, w);
      }
    }, S), F ? s.createElement(su, null) : w);
  };
  return s.createElement(jr, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    className: `${Se}-popup`,
    stopPropagation: e.stopPropagation,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, H(e, s.createElement("div", {
    ref: d,
    className: Se,
    onMouseDown: (w) => {
      w.preventDefault();
    }
  }, v(), s.createElement("div", {
    className: `${Se}-wrapper`
  }, s.createElement("div", {
    className: Z(`${Se}-main`, {
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
      h(), x(w, "BACKSPACE");
    },
    onClick: (w) => {
      h(), x(w, "BACKSPACE");
    },
    onContextMenu: (w) => {
      w.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, s.createElement(su, null)), s.createElement("div", {
    className: `${Se}-key ${Se}-key-extra ${Se}-key-ok`,
    onClick: (w) => x(w, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), e.safeArea && s.createElement("div", {
    className: `${Se}-footer`
  }, s.createElement(Br, {
    position: "bottom"
  })))));
}, ni = "adm-page-indicator", zy = {
  color: "primary",
  direction: "horizontal"
}, Ky = He((t) => {
  const e = G(zy, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(s.createElement("div", {
      key: r,
      className: Z(`${ni}-dot`, {
        [`${ni}-dot-active`]: e.current === r
      })
    }));
  return H(e, s.createElement("div", {
    className: Z(ni, `${ni}-${e.direction}`, `${ni}-color-${e.color}`)
  }, n));
}), Nt = "adm-passcode-input", Ef = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0,
  inputMode: "numeric"
}, vb = Ee((t, e) => {
  const n = G(Ef, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Ef.length, {
    locale: i
  } = fe(), [a, o] = X(!1), [l, c] = ue(n), u = W(null), f = W(null);
  J(() => {
    var y;
    l.length >= r && ((y = n.onFill) === null || y === void 0 || y.call(n, l));
  }, [l, r]);
  const d = () => {
    var y, g;
    n.keyboard || (y = f.current) === null || y === void 0 || y.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  J(() => {
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
  _e(e, () => ({
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
    const y = [], g = l.split(""), h = g.length, x = Re(g.length, 0, r - 1);
    for (let v = 0; v < r; v++)
      y.push(s.createElement("div", {
        className: Z(`${Nt}-cell`, {
          [`${Nt}-cell-caret`]: n.caret && h === v && a,
          [`${Nt}-cell-focused`]: x === v && a,
          [`${Nt}-cell-dot`]: !n.plain && g[v]
        }),
        key: v
      }, g[v] && n.plain ? g[v] : ""));
    return y;
  }, b = Z(Nt, {
    [`${Nt}-focused`]: a,
    [`${Nt}-error`]: n.error,
    [`${Nt}-seperated`]: n.seperated
  });
  return s.createElement(s.Fragment, null, H(n, s.createElement("div", {
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
}), ri = "adm-progress-bar", Yy = {
  percent: 0,
  rounded: !0,
  text: !1
}, pb = (t) => {
  const e = G(Yy, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return H(e, s.createElement("div", {
    className: Z(ri, e.rounded && `${ri}-rounded`)
  }, s.createElement("div", {
    className: `${ri}-trail`
  }, s.createElement("div", {
    className: `${ri}-fill`,
    style: n
  })), un(r) && s.createElement("div", {
    className: `${ri}-text`
  }, r)));
}, dr = "adm-progress-circle", gb = (t) => {
  const e = G({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return H(e, s.createElement("div", {
    className: `${dr}`,
    style: n
  }, s.createElement("div", {
    className: `${dr}-content`
  }, s.createElement("svg", {
    className: `${dr}-svg`
  }, s.createElement("circle", {
    className: `${dr}-track`,
    fill: "transparent"
  }), s.createElement("circle", {
    className: `${dr}-fill`,
    fill: "transparent"
  })), s.createElement("div", {
    className: `${dr}-info`
  }, e.children))));
}, Gy = (t) => new Promise((e) => setTimeout(e, t)), ha = "adm-pull-to-refresh", Xy = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, yb = (t) => {
  var e, n;
  const {
    locale: r
  } = fe(), i = G(Xy, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), a = (e = i.headHeight) !== null && e !== void 0 ? e : Wn(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Wn(60), [l, c] = X("pulling"), [u, f] = Le(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      round: !0,
      clamp: !0
    }
  })), d = W(null), m = W(!1);
  J(() => {
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
    return Me(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw p(), g;
      }
      i.completeDelay > 0 && (yield Gy(i.completeDelay)), p();
    });
  }
  Vt((g) => {
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
      let k = function(F) {
        return "scrollTop" in F ? F.scrollTop : F.scrollY;
      };
      const w = g.event.target;
      if (!w || !(w instanceof Element))
        return;
      let C = Ma(w);
      for (; ; ) {
        if (!C || k(C) > 0)
          return;
        if (C instanceof Window)
          break;
        C = Ma(C.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    h.cancelable && h.preventDefault(), h.stopPropagation();
    const E = Math.max(Si(v, 0, 0, a * 5, 0.5), 0);
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
    eventOptions: Zn ? {
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
    className: ha
  }, s.createElement(Ce.div, {
    style: u,
    className: `${ha}-head`
  }, s.createElement("div", {
    className: `${ha}-head-content`,
    style: {
      height: a
    }
  }, y())), s.createElement("div", {
    className: `${ha}-content`
  }, i.children));
}, j0 = ll(null), Qy = {
  disabled: !1,
  defaultValue: null
}, Jy = (t) => {
  const e = G(Qy, t), [n, r] = ue({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = e.onChange) === null || a === void 0 || a.call(e, i));
    }
  });
  return s.createElement(
    j0.Provider,
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
}, Sn = "adm-radio", e8 = {
  defaultChecked: !1
}, t8 = (t) => {
  const e = G(e8, t), n = at(j0);
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
    className: `${Sn}-custom-icon`
  }, e.icon(r)) : s.createElement("div", {
    className: `${Sn}-icon`
  }, r && s.createElement(Z1, null));
  return H(e, s.createElement("label", {
    onClick: e.onClick,
    className: Z(Sn, {
      [`${Sn}-checked`]: r,
      [`${Sn}-disabled`]: a,
      [`${Sn}-block`]: e.block
    })
  }, s.createElement(q1, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: e.id
  }), l(), e.children && s.createElement("div", {
    className: `${Sn}-content`
  }, e.children)));
}, bb = pe(t8, {
  Group: Jy
}), n8 = () => s.createElement("svg", {
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
})), On = "adm-rate", r8 = {
  count: 5,
  allowHalf: !1,
  character: s.createElement(n8, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, Eb = (t) => {
  const e = G(r8, t), [n, r] = ue(e), i = W(null), a = Array(e.count).fill(null);
  function o(c, u) {
    return s.createElement("div", {
      className: Z(`${On}-star`, {
        [`${On}-star-active`]: n >= c,
        [`${On}-star-half`]: u,
        [`${On}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const l = Vt((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), p = (u - m.left) / m.width * e.count, b = e.allowHalf ? Math.ceil(p * 2) / 2 : Math.ceil(p), y = Re(b, 0, e.count);
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
  return H(e, s.createElement("div", Object.assign({
    className: Z(On, {
      [`${On}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, l()), a.map((c, u) => s.createElement("div", {
    key: u,
    className: Z(`${On}-box`)
  }, e.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, B0 = (t) => {
  const {
    result: e = {}
  } = fe(), {
    successIcon: n = s.createElement(G2, null),
    errorIcon: r = s.createElement(Nl, null),
    infoIcon: i = s.createElement(ep, null),
    waitingIcon: a = s.createElement(X2, null),
    warningIcon: o = s.createElement(J2, null)
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
}, ii = "adm-result", i8 = {
  status: "info"
}, wb = (t) => {
  const e = G(i8, t), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = e, o = B0(n);
  return n ? H(e, s.createElement("div", {
    className: Z(ii, `${ii}-${n}`)
  }, s.createElement("div", {
    className: `${ii}-icon`
  }, a || o), s.createElement("div", {
    className: `${ii}-title`
  }, r), !!i && s.createElement("div", {
    className: `${ii}-description`
  }, i))) : null;
}, Ve = "adm-result-page", a8 = {
  status: "info",
  details: []
}, o8 = (t) => {
  const e = G(a8, t), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: l,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = B0(n), [m, p] = X(!0), b = un(c), y = un(l);
  return H(e, s.createElement("div", {
    className: Ve
  }, s.createElement("div", {
    className: `${Ve}-header`
  }, s.createElement("div", {
    className: `${Ve}-icon`
  }, o || d), s.createElement("div", {
    className: `${Ve}-title`
  }, r), un(i) ? s.createElement("div", {
    className: `${Ve}-description`
  }, i) : null, a != null && a.length ? s.createElement("div", {
    className: `${Ve}-details`
  }, (m ? a.slice(0, 3) : a).map((g, h) => s.createElement("div", {
    className: Z(`${Ve}-detail`, g.bold && `${Ve}-detail-bold`),
    key: h
  }, s.createElement("span", null, g.label), s.createElement("span", null, g.value))), a.length > 3 && s.createElement("div", {
    onClick: () => p((g) => !g)
  }, s.createElement("div", {
    className: Z(`${Ve}-collapse`, !m && `${Ve}-collapse-active`)
  }))) : null, s.createElement("div", {
    className: `${Ve}-bgWrapper`
  }, s.createElement("div", {
    className: `${Ve}-bg`
  }))), s.createElement("div", {
    className: `${Ve}-content`
  }, e.children), (y || b) && s.createElement("div", {
    className: `${Ve}-footer`
  }, b && s.createElement(zt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Ve}-footer-btn`
  }, c), y && b && s.createElement("div", {
    className: `${Ve}-footer-space`
  }), y && s.createElement(zt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ve}-footer-btn`
  }, l))));
}, s8 = "adm-result-page-card", l8 = (t) => H(t, s.createElement("div", {
  className: Z(`${s8}`)
}, t.children)), Cb = pe(o8, {
  Card: l8
}), an = "adm-search-bar", c8 = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0
}, xb = Ee((t, e) => {
  const {
    locale: n,
    searchBar: r = {}
  } = fe(), i = G(c8, r, {
    cancelText: n.common.cancel
  }, t), a = En(s.createElement(ap, null), r.searchIcon, t.icon, t.searchIcon), [o, l] = ue(i), [c, u] = X(!1), f = W(null), d = W(!1);
  _e(e, () => ({
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
      className: `${an}-suffix`
    }, s.createElement(zt, {
      fill: "none",
      className: `${an}-cancel-button`,
      onClick: () => {
        var b, y, g;
        i.clearOnCancel && ((b = f.current) === null || b === void 0 || b.clear()), (y = f.current) === null || y === void 0 || y.blur(), (g = i.onCancel) === null || g === void 0 || g.call(i);
      },
      onMouseDown: (b) => {
        b.preventDefault();
      }
    }, i.cancelText));
  };
  return H(i, s.createElement("div", {
    className: Z(an, {
      [`${an}-active`]: c
    })
  }, s.createElement("div", {
    className: `${an}-input-box`
  }, a && s.createElement("div", {
    className: `${an}-input-box-icon`
  }, a), s.createElement(D0, {
    ref: f,
    className: Z(`${an}-input`, {
      [`${an}-input-without-icon`]: !a
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
function u8(t, e) {
  var n = Object.assign({}, t);
  return Array.isArray(e) && e.forEach(function(r) {
    delete n[r];
  }), n;
}
function wf(t) {
  return t instanceof HTMLElement || t instanceof SVGElement;
}
function f8(t) {
  return t && ke(t) === "object" && wf(t.nativeElement) ? t.nativeElement : wf(t) ? t : null;
}
function d8(t) {
  var e = f8(t);
  if (e)
    return e;
  if (t instanceof s.Component) {
    var n;
    return (n = Fa.findDOMNode) === null || n === void 0 ? void 0 : n.call(Fa, t);
  }
  return null;
}
var m8 = /* @__PURE__ */ D.createContext({}), h8 = /* @__PURE__ */ function(t) {
  Ql(n, t);
  var e = Jl(n);
  function n() {
    return Xn(this, n), e.apply(this, arguments);
  }
  return Qn(n, [{
    key: "render",
    value: function() {
      return this.props.children;
    }
  }]), n;
}(D.Component), Mn = "none", va = "appear", pa = "enter", ga = "leave", Cf = "none", Ct = "prepare", gr = "start", yr = "active", Cc = "end", W0 = "prepared";
function xf(t, e) {
  var n = {};
  return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit".concat(t)] = "webkit".concat(e), n["Moz".concat(t)] = "moz".concat(e), n["ms".concat(t)] = "MS".concat(e), n["O".concat(t)] = "o".concat(e.toLowerCase()), n;
}
function v8(t, e) {
  var n = {
    animationend: xf("Animation", "AnimationEnd"),
    transitionend: xf("Transition", "TransitionEnd")
  };
  return t && ("AnimationEvent" in e || delete n.animationend.animation, "TransitionEvent" in e || delete n.transitionend.transition), n;
}
var p8 = v8(wo(), typeof window < "u" ? window : {}), Z0 = {};
if (wo()) {
  var g8 = document.createElement("div");
  Z0 = g8.style;
}
var ya = {};
function q0(t) {
  if (ya[t])
    return ya[t];
  var e = p8[t];
  if (e)
    for (var n = Object.keys(e), r = n.length, i = 0; i < r; i += 1) {
      var a = n[i];
      if (Object.prototype.hasOwnProperty.call(e, a) && a in Z0)
        return ya[t] = e[a], ya[t];
    }
  return "";
}
var H0 = q0("animationend"), U0 = q0("transitionend"), z0 = !!(H0 && U0), kf = H0 || "animationend", _f = U0 || "transitionend";
function $f(t, e) {
  if (!t)
    return null;
  if (ke(t) === "object") {
    var n = e.replace(/-\w/g, function(r) {
      return r[1].toUpperCase();
    });
    return t[n];
  }
  return "".concat(t, "-").concat(e);
}
const y8 = function(t) {
  var e = W(), n = W(t);
  n.current = t;
  var r = D.useCallback(function(o) {
    n.current(o);
  }, []);
  function i(o) {
    o && (o.removeEventListener(_f, r), o.removeEventListener(kf, r));
  }
  function a(o) {
    e.current && e.current !== o && i(e.current), o && o !== e.current && (o.addEventListener(_f, r), o.addEventListener(kf, r), e.current = o);
  }
  return D.useEffect(function() {
    return function() {
      i(e.current);
    };
  }, []), [a, i];
};
var K0 = wo() ? Ja : J, Y0 = function(e) {
  return +setTimeout(e, 16);
}, G0 = function(e) {
  return clearTimeout(e);
};
typeof window < "u" && "requestAnimationFrame" in window && (Y0 = function(e) {
  return window.requestAnimationFrame(e);
}, G0 = function(e) {
  return window.cancelAnimationFrame(e);
});
var Sf = 0, xc = /* @__PURE__ */ new Map();
function X0(t) {
  xc.delete(t);
}
var nl = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  Sf += 1;
  var r = Sf;
  function i(a) {
    if (a === 0)
      X0(r), e();
    else {
      var o = Y0(function() {
        i(a - 1);
      });
      xc.set(r, o);
    }
  }
  return i(n), r;
};
nl.cancel = function(t) {
  var e = xc.get(t);
  return X0(t), G0(e);
};
const b8 = function() {
  var t = D.useRef(null);
  function e() {
    nl.cancel(t.current);
  }
  function n(r) {
    var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    e();
    var a = nl(function() {
      i <= 1 ? r({
        isCanceled: function() {
          return a !== t.current;
        }
      }) : n(r, i - 1);
    });
    t.current = a;
  }
  return D.useEffect(function() {
    return function() {
      e();
    };
  }, []), [n, e];
};
var E8 = [Ct, gr, yr, Cc], w8 = [Ct, W0], Q0 = !1, C8 = !0;
function J0(t) {
  return t === yr || t === Cc;
}
const x8 = function(t, e, n) {
  var r = wr(Cf), i = Fe(r, 2), a = i[0], o = i[1], l = b8(), c = Fe(l, 2), u = c[0], f = c[1];
  function d() {
    o(Ct, !0);
  }
  var m = e ? w8 : E8;
  return K0(function() {
    if (a !== Cf && a !== Cc) {
      var p = m.indexOf(a), b = m[p + 1], y = n(a);
      y === Q0 ? o(b, !0) : b && u(function(g) {
        function h() {
          g.isCanceled() || o(b, !0);
        }
        y === !0 ? h() : Promise.resolve(y).then(h);
      });
    }
  }, [t, a]), D.useEffect(function() {
    return function() {
      f();
    };
  }, []), [d, a];
};
function k8(t, e, n, r) {
  var i = r.motionEnter, a = i === void 0 ? !0 : i, o = r.motionAppear, l = o === void 0 ? !0 : o, c = r.motionLeave, u = c === void 0 ? !0 : c, f = r.motionDeadline, d = r.motionLeaveImmediately, m = r.onAppearPrepare, p = r.onEnterPrepare, b = r.onLeavePrepare, y = r.onAppearStart, g = r.onEnterStart, h = r.onLeaveStart, x = r.onAppearActive, v = r.onEnterActive, E = r.onLeaveActive, w = r.onAppearEnd, C = r.onEnterEnd, k = r.onLeaveEnd, F = r.onVisibleChanged, M = wr(), S = Fe(M, 2), V = S[0], I = S[1], P = wr(Mn), R = Fe(P, 2), T = R[0], N = R[1], $ = wr(null), A = Fe($, 2), _ = A[0], O = A[1], L = W(!1), B = W(null);
  function j() {
    return n();
  }
  var q = W(!1);
  function K() {
    N(Mn, !0), O(null, !0);
  }
  function z(ze) {
    var Be = j();
    if (!(ze && !ze.deadline && ze.target !== Be)) {
      var We = q.current, St;
      T === va && We ? St = w == null ? void 0 : w(Be, ze) : T === pa && We ? St = C == null ? void 0 : C(Be, ze) : T === ga && We && (St = k == null ? void 0 : k(Be, ze)), T !== Mn && We && St !== !1 && K();
    }
  }
  var ne = y8(z), oe = Fe(ne, 1), U = oe[0], ee = function(Be) {
    var We, St, qr;
    switch (Be) {
      case va:
        return We = {}, he(We, Ct, m), he(We, gr, y), he(We, yr, x), We;
      case pa:
        return St = {}, he(St, Ct, p), he(St, gr, g), he(St, yr, v), St;
      case ga:
        return qr = {}, he(qr, Ct, b), he(qr, gr, h), he(qr, yr, E), qr;
      default:
        return {};
    }
  }, te = D.useMemo(function() {
    return ee(T);
  }, [T]), re = x8(T, !t, function(ze) {
    if (ze === Ct) {
      var Be = te[Ct];
      return Be ? Be(j()) : Q0;
    }
    if (xe in te) {
      var We;
      O(((We = te[xe]) === null || We === void 0 ? void 0 : We.call(te, j(), null)) || null);
    }
    return xe === yr && (U(j()), f > 0 && (clearTimeout(B.current), B.current = setTimeout(function() {
      z({
        deadline: !0
      });
    }, f))), xe === W0 && K(), C8;
  }), ae = Fe(re, 2), de = ae[0], xe = ae[1], Ue = J0(xe);
  q.current = Ue, K0(function() {
    I(e);
    var ze = L.current;
    L.current = !0;
    var Be;
    !ze && e && l && (Be = va), ze && e && a && (Be = pa), (ze && !e && u || !ze && d && !e && u) && (Be = ga);
    var We = ee(Be);
    Be && (t || We[Ct]) ? (N(Be), de()) : N(Mn);
  }, [e]), J(function() {
    // Cancel appear
    (T === va && !l || // Cancel enter
    T === pa && !a || // Cancel leave
    T === ga && !u) && N(Mn);
  }, [l, a, u]), J(function() {
    return function() {
      L.current = !1, clearTimeout(B.current);
    };
  }, []);
  var De = D.useRef(!1);
  J(function() {
    V && (De.current = !0), V !== void 0 && T === Mn && ((De.current || V) && (F == null || F(V)), De.current = !0);
  }, [V, T]);
  var jt = _;
  return te[Ct] && xe === gr && (jt = Q({
    transition: "none"
  }, jt)), [T, xe, jt, V ?? e];
}
function _8(t) {
  var e = t;
  ke(t) === "object" && (e = t.transitionSupport);
  function n(i, a) {
    return !!(i.motionName && e && a !== !1);
  }
  var r = /* @__PURE__ */ D.forwardRef(function(i, a) {
    var o = i.visible, l = o === void 0 ? !0 : o, c = i.removeOnLeave, u = c === void 0 ? !0 : c, f = i.forceRender, d = i.children, m = i.motionName, p = i.leavedClassName, b = i.eventProps, y = D.useContext(m8), g = y.motion, h = n(i, g), x = W(), v = W();
    function E() {
      try {
        return x.current instanceof HTMLElement ? x.current : d8(v.current);
      } catch {
        return null;
      }
    }
    var w = k8(h, l, E, i), C = Fe(w, 4), k = C[0], F = C[1], M = C[2], S = C[3], V = D.useRef(S);
    S && (V.current = !0);
    var I = D.useCallback(function(O) {
      x.current = O, g1(a, O);
    }, [a]), P, R = Q(Q({}, b), {}, {
      visible: l
    });
    if (!d)
      P = null;
    else if (k === Mn)
      S ? P = d(Q({}, R), I) : !u && V.current && p ? P = d(Q(Q({}, R), {}, {
        className: p
      }), I) : f || !u && !p ? P = d(Q(Q({}, R), {}, {
        style: {
          display: "none"
        }
      }), I) : P = null;
    else {
      var T, N;
      F === Ct ? N = "prepare" : J0(F) ? N = "active" : F === gr && (N = "start");
      var $ = $f(m, "".concat(k, "-").concat(N));
      P = d(Q(Q({}, R), {}, {
        className: Z($f(m, k), (T = {}, he(T, $, $ && N), he(T, m, typeof m == "string"), T)),
        style: M
      }), I);
    }
    if (/* @__PURE__ */ D.isValidElement(P) && dg(P)) {
      var A = P, _ = A.ref;
      _ || (P = /* @__PURE__ */ D.cloneElement(P, {
        ref: I
      }));
    }
    return /* @__PURE__ */ D.createElement(h8, {
      ref: v
    }, P);
  });
  return r.displayName = "CSSMotion", r;
}
const em = _8(z0);
var rl = "add", il = "keep", al = "remove", is = "removed";
function $8(t) {
  var e;
  return t && ke(t) === "object" && "key" in t ? e = t : e = {
    key: t
  }, Q(Q({}, e), {}, {
    key: String(e.key)
  });
}
function ol() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  return t.map($8);
}
function S8() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], n = [], r = 0, i = e.length, a = ol(t), o = ol(e);
  a.forEach(function(u) {
    for (var f = !1, d = r; d < i; d += 1) {
      var m = o[d];
      if (m.key === u.key) {
        r < d && (n = n.concat(o.slice(r, d).map(function(p) {
          return Q(Q({}, p), {}, {
            status: rl
          });
        })), r = d), n.push(Q(Q({}, m), {}, {
          status: il
        })), r += 1, f = !0;
        break;
      }
    }
    f || n.push(Q(Q({}, u), {}, {
      status: al
    }));
  }), r < i && (n = n.concat(o.slice(r).map(function(u) {
    return Q(Q({}, u), {}, {
      status: rl
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
      return d !== u || m !== al;
    }), n.forEach(function(f) {
      f.key === u && (f.status = il);
    });
  }), n;
}
var O8 = ["component", "children", "onVisibleChanged", "onAllRemoved"], F8 = ["status"], R8 = ["eventProps", "visible", "children", "motionName", "motionAppear", "motionEnter", "motionLeave", "motionLeaveImmediately", "motionDeadline", "removeOnLeave", "leavedClassName", "onAppearPrepare", "onAppearStart", "onAppearActive", "onAppearEnd", "onEnterStart", "onEnterActive", "onEnterEnd", "onLeaveStart", "onLeaveActive", "onLeaveEnd"];
function N8(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : em, n = /* @__PURE__ */ function(r) {
    Ql(a, r);
    var i = Jl(a);
    function a() {
      var o;
      Xn(this, a);
      for (var l = arguments.length, c = new Array(l), u = 0; u < l; u++)
        c[u] = arguments[u];
      return o = i.call.apply(i, [this].concat(c)), he(Ha(o), "state", {
        keyEntities: []
      }), he(Ha(o), "removeKey", function(f) {
        var d = o.state.keyEntities, m = d.map(function(p) {
          return p.key !== f ? p : Q(Q({}, p), {}, {
            status: is
          });
        });
        return o.setState({
          keyEntities: m
        }), m.filter(function(p) {
          var b = p.status;
          return b !== is;
        }).length;
      }), o;
    }
    return Qn(a, [{
      key: "render",
      value: function() {
        var l = this, c = this.state.keyEntities, u = this.props, f = u.component, d = u.children, m = u.onVisibleChanged, p = u.onAllRemoved, b = Or(u, O8), y = f || D.Fragment, g = {};
        return R8.forEach(function(h) {
          g[h] = b[h], delete b[h];
        }), delete b.keys, /* @__PURE__ */ D.createElement(y, b, c.map(function(h, x) {
          var v = h.status, E = Or(h, F8), w = v === rl || v === il;
          return /* @__PURE__ */ D.createElement(e, zn({}, g, {
            key: E.key,
            visible: w,
            eventProps: E,
            onVisibleChanged: function(k) {
              if (m == null || m(k, {
                key: E.key
              }), !k) {
                var F = l.removeKey(E.key);
                F === 0 && p && p();
              }
            }
          }), function(C, k) {
            return d(Q(Q({}, C), {}, {
              index: x
            }), k);
          });
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function(l, c) {
        var u = l.keys, f = c.keyEntities, d = ol(u), m = S8(f, d);
        return {
          keyEntities: m.filter(function(p) {
            var b = f.find(function(y) {
              var g = y.key;
              return p.key === g;
            });
            return !(b && b.status === is && p.status === al);
          })
        };
      }
    }]), a;
  }(D.Component);
  return he(n, "defaultProps", {
    component: "div"
  }), n;
}
N8(z0);
var Of = function(e) {
  return e ? {
    left: e.offsetLeft,
    right: e.parentElement.clientWidth - e.clientWidth - e.offsetLeft,
    width: e.clientWidth
  } : null;
}, mr = function(e) {
  return e !== void 0 ? "".concat(e, "px") : void 0;
};
function P8(t) {
  var e = t.prefixCls, n = t.containerRef, r = t.value, i = t.getValueIndex, a = t.motionName, o = t.onMotionStart, l = t.onMotionEnd, c = t.direction, u = D.useRef(null), f = D.useState(r), d = Fe(f, 2), m = d[0], p = d[1], b = function(P) {
    var R, T = i(P), N = (R = n.current) === null || R === void 0 ? void 0 : R.querySelectorAll(".".concat(e, "-item"))[T];
    return (N == null ? void 0 : N.offsetParent) && N;
  }, y = D.useState(null), g = Fe(y, 2), h = g[0], x = g[1], v = D.useState(null), E = Fe(v, 2), w = E[0], C = E[1];
  d1(function() {
    if (m !== r) {
      var I = b(m), P = b(r), R = Of(I), T = Of(P);
      p(r), x(R), C(T), I && P ? o() : l();
    }
  }, [r]);
  var k = D.useMemo(function() {
    return mr(c === "rtl" ? -(h == null ? void 0 : h.right) : h == null ? void 0 : h.left);
  }, [c, h]), F = D.useMemo(function() {
    return mr(c === "rtl" ? -(w == null ? void 0 : w.right) : w == null ? void 0 : w.left);
  }, [c, w]), M = function() {
    return {
      transform: "translateX(var(--thumb-start-left))",
      width: "var(--thumb-start-width)"
    };
  }, S = function() {
    return {
      transform: "translateX(var(--thumb-active-left))",
      width: "var(--thumb-active-width)"
    };
  }, V = function() {
    x(null), C(null), l();
  };
  return !h || !w ? null : /* @__PURE__ */ D.createElement(em, {
    visible: !0,
    motionName: a,
    motionAppear: !0,
    onAppearStart: M,
    onAppearActive: S,
    onVisibleChanged: V
  }, function(I, P) {
    var R = I.className, T = I.style, N = Q(Q({}, T), {}, {
      "--thumb-start-left": k,
      "--thumb-start-width": mr(h == null ? void 0 : h.width),
      "--thumb-active-left": F,
      "--thumb-active-width": mr(w == null ? void 0 : w.width)
    }), $ = {
      ref: y1(u, P),
      style: N,
      className: Z("".concat(e, "-thumb"), R)
    };
    return /* @__PURE__ */ D.createElement("div", $);
  });
}
var M8 = ["prefixCls", "direction", "options", "disabled", "defaultValue", "value", "onChange", "className", "motionName"];
function A8(t) {
  if (typeof t.title < "u")
    return t.title;
  if (ke(t.label) !== "object") {
    var e;
    return (e = t.label) === null || e === void 0 ? void 0 : e.toString();
  }
}
function T8(t) {
  return t.map(function(e) {
    if (ke(e) === "object" && e !== null) {
      var n = A8(e);
      return Q(Q({}, e), {}, {
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
var I8 = function(e) {
  var n = e.prefixCls, r = e.className, i = e.disabled, a = e.checked, o = e.label, l = e.title, c = e.value, u = e.onChange, f = function(m) {
    i || u(m, c);
  };
  return /* @__PURE__ */ D.createElement("label", {
    className: Z(r, he({}, "".concat(n, "-item-disabled"), i))
  }, /* @__PURE__ */ D.createElement("input", {
    className: "".concat(n, "-item-input"),
    type: "radio",
    disabled: i,
    checked: a,
    onChange: f
  }), /* @__PURE__ */ D.createElement("div", {
    className: "".concat(n, "-item-label"),
    title: l,
    role: "option",
    "aria-selected": a
  }, o));
}, L8 = /* @__PURE__ */ D.forwardRef(function(t, e) {
  var n, r, i = t.prefixCls, a = i === void 0 ? "rc-segmented" : i, o = t.direction, l = t.options, c = l === void 0 ? [] : l, u = t.disabled, f = t.defaultValue, d = t.value, m = t.onChange, p = t.className, b = p === void 0 ? "" : p, y = t.motionName, g = y === void 0 ? "thumb-motion" : y, h = Or(t, M8), x = D.useRef(null), v = D.useMemo(function() {
    return y1(x, e);
  }, [x, e]), E = D.useMemo(function() {
    return T8(c);
  }, [c]), w = m1((n = E[0]) === null || n === void 0 ? void 0 : n.value, {
    value: d,
    defaultValue: f
  }), C = Fe(w, 2), k = C[0], F = C[1], M = D.useState(!1), S = Fe(M, 2), V = S[0], I = S[1], P = function(N, $) {
    u || (F($), m == null || m($));
  }, R = u8(h, ["children"]);
  return /* @__PURE__ */ D.createElement("div", zn({
    role: "listbox",
    "aria-label": "segmented control"
  }, R, {
    className: Z(a, (r = {}, he(r, "".concat(a, "-rtl"), o === "rtl"), he(r, "".concat(a, "-disabled"), u), r), b),
    ref: v
  }), /* @__PURE__ */ D.createElement("div", {
    className: "".concat(a, "-group")
  }, /* @__PURE__ */ D.createElement(P8, {
    prefixCls: a,
    value: k,
    containerRef: x,
    motionName: "".concat(a, "-").concat(g),
    direction: o,
    getValueIndex: function(N) {
      return E.findIndex(function($) {
        return $.value === N;
      });
    },
    onMotionStart: function() {
      I(!0);
    },
    onMotionEnd: function() {
      I(!1);
    }
  }), E.map(function(T) {
    return /* @__PURE__ */ D.createElement(I8, zn({}, T, {
      key: T.value,
      prefixCls: a,
      className: Z(T.className, "".concat(a, "-item"), he({}, "".concat(a, "-item-selected"), T.value === k && !V)),
      checked: T.value === k,
      onChange: P,
      disabled: !!u || !!T.disabled
    }));
  })));
}), D8 = L8;
function V8(t) {
  return typeof t == "object" && !!(t != null && t.icon);
}
const ba = "adm-segmented", kb = D.forwardRef((t, e) => {
  const {
    prefixCls: n,
    className: r,
    block: i,
    options: a = []
  } = t, o = dn(
    t,
    ["prefixCls", "className", "block", "options"]
  ), l = D.useMemo(() => a.map((c) => {
    if (V8(c)) {
      const {
        icon: u,
        label: f
      } = c, d = dn(c, ["icon", "label"]);
      return Object.assign(Object.assign({}, d), {
        label: D.createElement(D.Fragment, null, D.createElement("span", {
          className: `${ba}-item-icon`
        }, u), f && D.createElement("span", null, f))
      });
    }
    return c;
  }), [a, ba]);
  return H(t, D.createElement(D8, Object.assign({}, o, {
    className: Z(r, {
      [`${ba}-block`]: i
    }),
    options: l,
    ref: e,
    prefixCls: ba
  })));
}), j8 = He(() => s.createElement("svg", {
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
})))))))), Fn = "adm-selector", B8 = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, _b = (t) => {
  const e = G(B8, t), [n, r, , i] = zi(e.fieldNames), [a, o] = ue({
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
    const f = (a || []).includes(u[r]), d = u[i] || e.disabled, m = Z(`${Fn}-item`, {
      [`${Fn}-item-active`]: f && !e.multiple,
      [`${Fn}-item-multiple-active`]: f && e.multiple,
      [`${Fn}-item-disabled`]: d
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
      className: `${Fn}-item-description`
    }, u.description), f && e.showCheckMark && s.createElement("div", {
      className: `${Fn}-check-mark-wrapper`
    }, s.createElement(j8, null)));
  });
  return H(e, s.createElement("div", {
    className: Fn,
    role: "listbox",
    "aria-label": l.Selector.name
  }, e.columns ? s.createElement(F0, {
    columns: e.columns
  }, c) : s.createElement(Ec, {
    wrap: !0
  }, c)));
}, as = He((t) => H(t, s.createElement("svg", {
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
}))))), Ze = "adm-side-bar", W8 = () => null, Z8 = (t) => {
  var e;
  let n = null;
  const r = [];
  Cn(t.children, (c, u) => {
    if (!bn(c))
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
  return H(t, s.createElement("div", {
    className: Ze
  }, s.createElement("div", {
    className: `${Ze}-items`
  }, r.map((c, u) => {
    const f = c.key === i, d = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return H(c.props, s.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: p
        } = c;
        p == null || c.props.disabled || a(p.toString());
      },
      className: Z(`${Ze}-item`, {
        [`${Ze}-item-active`]: f,
        [`${Ze}-item-disabled`]: c.props.disabled
      })
    }, s.createElement(s.Fragment, null, d && s.createElement(as, {
      className: `${Ze}-item-corner ${Ze}-item-corner-top`
    }), m && s.createElement(as, {
      className: `${Ze}-item-corner ${Ze}-item-corner-bottom`
    })), s.createElement(Fs, {
      content: c.props.badge,
      className: `${Ze}-badge`
    }, s.createElement("div", {
      className: `${Ze}-item-title`
    }, f && s.createElement("div", {
      className: `${Ze}-item-highlight`
    }), c.props.title))));
  })), s.createElement("div", {
    className: Z(`${Ze}-extra-space`, l && `${Ze}-item-active-next-sibling`)
  }, l && s.createElement(as, {
    className: `${Ze}-item-corner ${Ze}-item-corner-top`
  }))));
}, $b = pe(Z8, {
  Item: W8
}), os = "adm-slider", q8 = ({
  points: t,
  max: e,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = e - n, o = t.map((l) => {
    const c = `${Math.abs(l - n) / a * 100}%`, u = l <= r && l >= i, f = {
      left: c
    }, d = Z({
      [`${os}-tick`]: !0,
      [`${os}-tick-active`]: u
    });
    return s.createElement("span", {
      className: d,
      style: f,
      key: l
    });
  });
  return s.createElement("div", {
    className: `${os}-ticks`
  }, o);
}, H8 = q8, ss = "adm-slider-mark", U8 = ({
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
    const f = c <= e && c >= n, d = Z({
      [`${ss}-text`]: !0,
      [`${ss}-text-active`]: f
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
    className: ss
  }, l);
}, z8 = U8;
function sl() {
  return typeof BigInt == "function";
}
function tm(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function yi(t) {
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
function kc(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function ui(t) {
  var e = String(t);
  if (kc(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && rm(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function nm(t) {
  var e = String(t);
  if (kc(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(sl() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(sl() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(ui(e));
  }
  return yi(e).fullStr;
}
function rm(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var K8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Xn(this, t), he(this, "origin", ""), he(this, "negative", void 0), he(this, "integer", void 0), he(this, "decimal", void 0), he(this, "decimalLen", void 0), he(this, "empty", void 0), he(this, "nan", void 0), tm(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (kc(n) && (n = Number(n)), n = typeof n == "string" ? n : nm(n), rm(n)) {
      var r = yi(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Qn(t, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), l = n.alignDecimal(a), c = r(o, l).toString(), u = i(a), f = yi(c), d = f.negativeStr, m = f.trimStr, p = "".concat(d).concat(m.padStart(u + 1, "0"));
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
      return n ? this.isInvalidate() ? "" : yi("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), Y8 = /* @__PURE__ */ function() {
  function t(e) {
    if (Xn(this, t), he(this, "origin", ""), he(this, "number", void 0), he(this, "empty", void 0), tm(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return Qn(t, [{
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
      var a = Math.max(ui(this.number), ui(r));
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
      var a = Math.max(ui(this.number), ui(r));
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
      return n ? this.isInvalidate() ? "" : nm(this.number) : this.origin;
    }
  }]), t;
}();
function Xe(t) {
  return sl() ? new K8(t) : new Y8(t);
}
function _c(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = yi(t), a = i.negativeStr, o = i.integerStr, l = i.decimalStr, c = "".concat(e).concat(l), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(l[n]);
    if (f >= 5 && !r) {
      var d = Xe(t).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return _c(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(l.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const G8 = (t) => H(t, s.createElement("svg", {
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
})))), ls = "adm-slider", X8 = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: a,
    residentPopover: o,
    onDrag: l
  } = t, c = W(e), {
    locale: u
  } = fe(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = X(!1), p = Vt((g) => {
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
    className: `${ls}-thumb`
  }, a || s.createElement(G8, {
    className: `${ls}-thumb-icon`
  }));
  return s.createElement("div", Object.assign({
    className: `${ls}-thumb-container`,
    style: f()
  }, p(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), b ? s.createElement($0, {
    content: b(e),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, y) : y);
}, Q8 = X8, ai = "adm-slider", J8 = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, Sb = (t) => {
  var e;
  const n = G(J8, t), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: l,
    step: c,
    icon: u
  } = n;
  function f(R) {
    return R.sort((T, N) => T - N);
  }
  function d(R) {
    return n.range ? R : [n.min, R];
  }
  function m(R, T) {
    const N = Xe(R), $ = _c(N.toString(), ".", T);
    return Xe($).toNumber();
  }
  function p(R) {
    const T = Math.max(b(c), b(R[0]), b(R[1]));
    return n.range ? R.map((N) => m(N, T)) : m(R[1], T);
  }
  function b(R) {
    return (`${R}`.split(".")[1] || "").length;
  }
  function y(R) {
    var T;
    (T = n.onAfterChange) === null || T === void 0 || T.call(n, p(R));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (g = [0, n.value]);
  const [h, x] = ue({
    value: g,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), v = f(d(h));
  function E(R) {
    const T = f(R), N = v;
    T[0] === N[0] && T[1] === N[1] || x(p(T));
  }
  const w = W(null), C = `${100 * (v[1] - v[0]) / (i - r)}%`, k = `${100 * (v[0] - r) / (i - r)}%`, F = me(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((R, T) => R - T);
    if (l) {
      const R = [];
      for (let T = Xe(r); T.lessEquals(Xe(i)); T = T.add(c))
        R.push(T.toNumber());
      return R;
    }
    return [];
  }, [o, l, c, r, i]);
  function M(R) {
    const T = R < r ? r : R > i ? i : R;
    let N = r;
    if (F.length)
      N = Xl(F, T);
    else {
      const $ = Math.round((T - r) / c), A = Xe($).multi(c);
      N = Xe(r).add(A.toString()).toNumber();
    }
    return N;
  }
  const S = W(0), V = (R) => {
    if (S.current > 0 || (R.stopPropagation(), a))
      return;
    const T = w.current;
    if (!T)
      return;
    const N = T.getBoundingClientRect().left, $ = (R.clientX - N) / Math.ceil(T.offsetWidth) * (i - r) + r, A = M($);
    let _;
    n.range ? Math.abs(A - v[0]) > Math.abs(A - v[1]) ? _ = [v[0], A] : _ = [A, v[1]] : _ = [n.min, A], E(_), y(_);
  }, I = W(), P = (R) => s.createElement(Q8, {
    key: R,
    value: v[R],
    min: r,
    max: i,
    disabled: a,
    trackRef: w,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (T, N, $) => {
      N && (S.current += 1, I.current = v);
      const A = M(T), _ = I.current;
      if (!_)
        return;
      const O = [..._];
      O[R] = A, E(O), $ && (y(O), window.setTimeout(() => {
        S.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return H(n, s.createElement("div", {
    className: Z(ai, {
      [`${ai}-disabled`]: a
    })
  }, s.createElement("div", {
    className: `${ai}-track-container`,
    onClick: V
  }, s.createElement("div", {
    className: `${ai}-track`,
    onClick: V,
    ref: w
  }, s.createElement("div", {
    className: `${ai}-fill`,
    style: {
      width: C,
      left: k
    }
  }), n.ticks && s.createElement(H8, {
    points: F,
    min: r,
    max: i,
    lowerBound: v[0],
    upperBound: v[1]
  }), n.range && P(0), P(1))), o && s.createElement(z8, {
    min: r,
    max: i,
    marks: o,
    lowerBound: v[0],
    upperBound: v[1]
  })));
}, hr = "adm-stepper", e9 = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function t9(t, e) {
  const n = G(e9, t), {
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
  } = fe();
  _e(e, () => ({
    focus: () => {
      var _;
      (_ = I.current) === null || _ === void 0 || _.focus();
    },
    blur: () => {
      var _;
      (_ = I.current) === null || _ === void 0 || _.blur();
    },
    get nativeElement() {
      var _, O;
      return (O = (_ = I.current) === null || _ === void 0 ? void 0 : _.nativeElement) !== null && O !== void 0 ? O : null;
    }
  }));
  const g = (_) => (d !== void 0 ? _c(_.toString(), ".", d) : _).toString(), h = (_) => m ? _.toString() : _.toNumber(), x = (_) => {
    if (_ === "")
      return null;
    if (b)
      return String(b(_));
    const O = Xe(_);
    return O.isInvalidate() ? null : O.toString();
  }, v = (_) => _ === null ? "" : p ? p(_) : g(_), [E, w] = m1(r, {
    value: i,
    onChange: (_) => {
      a == null || a(_);
    }
  }), [C, k] = X(() => v(E));
  function F(_) {
    if (_.isNaN())
      return;
    let O = _;
    if (u !== void 0) {
      const L = Xe(u);
      O.lessEquals(L) && (O = L);
    }
    if (c !== void 0) {
      const L = Xe(c);
      L.lessEquals(O) && (O = L);
    }
    d !== void 0 && (O = Xe(g(h(O)))), w(h(O));
  }
  const M = (_) => {
    k(_);
    const O = x(_);
    O === null ? n.allowEmpty ? w(null) : w(r) : F(Xe(O));
  }, [S, V] = X(!1), I = s.useRef(null);
  function P(_) {
    V(_), _ && k(E != null ? String(E) : "");
  }
  J(() => {
    var _, O, L;
    S && ((L = (O = (_ = I.current) === null || _ === void 0 ? void 0 : _.nativeElement) === null || O === void 0 ? void 0 : O.select) === null || L === void 0 || L.call(O));
  }, [S]), J(() => {
    S || k(v(E));
  }, [S, E, d]);
  const R = (_) => {
    let O = Xe(l);
    _ || (O = O.negate()), F(Xe(E ?? 0).add(O.toString()));
  }, T = () => {
    R(!1);
  }, N = () => {
    R(!0);
  }, $ = () => o ? !0 : E === null ? !1 : u !== void 0 ? E <= u : !1, A = () => o ? !0 : E === null ? !1 : c !== void 0 ? E >= c : !1;
  return H(n, s.createElement("div", {
    className: Z(hr, {
      [`${hr}-active`]: S
    })
  }, s.createElement(zt, {
    className: `${hr}-minus`,
    onClick: T,
    disabled: $(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.decrease
  }, s.createElement(np, null)), s.createElement("div", {
    className: `${hr}-middle`
  }, s.createElement(D0, {
    ref: I,
    className: `${hr}-input`,
    onFocus: (_) => {
      var O;
      P(!0), (O = n.onFocus) === null || O === void 0 || O.call(n, _);
    },
    value: C,
    onChange: (_) => {
      o || M(_);
    },
    disabled: o,
    onBlur: (_) => {
      var O;
      P(!1), (O = n.onBlur) === null || O === void 0 || O.call(n, _);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(C),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), s.createElement(zt, {
    className: `${hr}-plus`,
    onClick: N,
    disabled: A(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": y.Stepper.increase
  }, s.createElement(Od, null))));
}
const Ob = Ee(t9), Rn = "adm-step", n9 = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return H(t, s.createElement("div", {
    className: Z(`${Rn}`, `${Rn}-status-${i}`)
  }, s.createElement("div", {
    className: `${Rn}-indicator`
  }, s.createElement("div", {
    className: `${Rn}-icon-container`
  }, r)), s.createElement("div", {
    className: `${Rn}-content`
  }, s.createElement("div", {
    className: `${Rn}-title`
  }, e), !!n && s.createElement("div", {
    className: `${Rn}-description`
  }, n))));
}, Ff = "adm-steps", r9 = "adm-step", i9 = s.createElement("span", {
  className: `${r9}-icon-dot`
}), a9 = {
  current: 0,
  direction: "horizontal"
}, o9 = (t) => {
  const e = G(a9, t), {
    direction: n,
    current: r
  } = e, i = Z(Ff, `${Ff}-${n}`);
  return H(e, s.createElement("div", {
    className: i
  }, s.Children.map(e.children, (a, o) => {
    var l;
    if (!s.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (l = c.icon) !== null && l !== void 0 ? l : i9;
    return s.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, Fb = pe(o9, {
  Step: n9
}), on = "adm-swipe-action", s9 = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, Rb = Ee((t, e) => {
  const n = G(s9, t), r = W(null), i = W(null), a = W(null);
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
  }), []), d = W(!1), m = W(null);
  function p() {
    var h;
    (h = m.current) === null || h === void 0 || h.call(m), d.current = !1;
  }
  const b = Vt((h) => {
    var x;
    if (m.current = h.cancel, !h.intentional || (h.down && (d.current = !0), !d.current))
      return;
    const [v] = h.offset;
    if (h.last) {
      const E = l(), w = c();
      let C = v + h.velocity[0] * h.direction[0] * 50;
      v > 0 ? C = Math.max(0, C) : v < 0 ? C = Math.min(0, C) : C = 0;
      const k = Xl([-w, 0, E], C);
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
  _e(e, () => ({
    show: (h = "right") => {
      var x;
      h === "right" ? f.start({
        x: -c()
      }) : h === "left" && f.start({
        x: l()
      }), (x = t.onActionsReveal) === null || x === void 0 || x.call(t, h);
    },
    close: y
  })), J(() => {
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
    return s.createElement(zt, {
      key: h.key,
      className: `${on}-action-button`,
      style: {
        "--background-color": (v = l9[E]) !== null && v !== void 0 ? v : E
      },
      onClick: (w) => {
        var C, k;
        n.closeOnAction && y(), (C = h.onClick) === null || C === void 0 || C.call(h, w), (k = n.onAction) === null || k === void 0 || k.call(n, h, w);
      }
    }, h.text);
  }
  return H(n, s.createElement("div", Object.assign({
    className: on
  }, b(), {
    ref: r,
    onClickCapture: (h) => {
      d.current && (h.stopPropagation(), h.preventDefault());
    }
  }), s.createElement(Ce.div, {
    className: `${on}-track`,
    style: {
      x: u
    }
  }, hn(n.stopPropagation, s.createElement("div", {
    className: `${on}-actions ${on}-actions-left`,
    ref: i
  }, n.leftActions.map(g))), s.createElement("div", {
    className: `${on}-content`,
    onClickCapture: (h) => {
      u.goal !== 0 && (h.preventDefault(), h.stopPropagation(), y());
    }
  }, s.createElement(Ce.div, {
    style: {
      pointerEvents: u.to((h) => h !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), hn(n.stopPropagation, s.createElement("div", {
    className: `${on}-actions ${on}-actions-right`,
    ref: a
  }, n.rightActions.map(g))))));
}), l9 = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, im = (t) => H(t, s.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function c9(t) {
  const [e, n] = X(t), r = W(e);
  return J(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function u9(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const l = t[o], c = e[o];
    typeof l == "function" && typeof c == "function" ? a[o] = function(...u) {
      l(...u), c(...u);
    } : a[o] = l || c;
  }), a;
}
const Pt = "adm-swiper", f9 = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, d9 = {
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
let Ea;
const m9 = Ee(Dl((t, e) => {
  const n = G(d9, t), {
    direction: r,
    total: i,
    children: a,
    indicator: o
  } = n, [l] = X({}), c = W(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: p,
    renderChildren: b
  } = me(() => {
    let g = 0, h, x;
    return typeof a == "function" ? h = a : x = s.Children.map(a, (v) => !s.isValidElement(v) || v.type !== im ? null : (g++, v)), {
      renderChildren: h,
      validChildren: x,
      count: g
    };
  }, [a]), y = i ?? p;
  return y === 0 || !m && !b ? null : () => {
    let g = n.loop;
    f * (y - 1) < 1 && (g = !1);
    const h = W(null);
    function x() {
      const U = h.current;
      return U ? (u ? U.offsetHeight : U.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [v, E, w] = Lh(n.defaultIndex), [C, k, F] = c9(!1);
    function M(U) {
      let ee = 0, te = y - 1;
      return n.stuckAtBoundary && (ee += d / f, te -= (1 - f - d) / f), Re(U, ee, te);
    }
    const [{
      position: S
    }, V] = Le(() => ({
      position: M(v) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (F.current || !g)
          return;
        const U = S.get(), ee = 100 * y, te = cs(U, ee);
        te !== U && V.start({
          position: te,
          immediate: !0
        });
      }
    }), [y]), I = W(null);
    function P() {
      var U;
      (U = I.current) === null || U === void 0 || U.call(I), F.current = !1;
    }
    const R = Vt((U) => {
      if (I.current = U.cancel, !U.intentional || (U.first && !Ea && (Ea = l), Ea !== l))
        return;
      Ea = U.last ? void 0 : l;
      const ee = x();
      if (!ee)
        return;
      const te = u ? 1 : 0, re = U.offset[te], ae = U.direction[te], de = U.velocity[te];
      if (k(!0), !U.last)
        V.start({
          position: re * 100 / ee,
          immediate: !0
        });
      else {
        const xe = Math.floor(re / ee), Ue = xe + 1, De = Math.round((re + de * 2e3 * ae) / ee);
        T(Re(De, xe, Ue)), window.setTimeout(() => {
          k(!1);
        });
      }
    }, {
      transform: ([U, ee]) => [-U, -ee],
      from: () => {
        const U = x();
        return [S.get() / 100 * U, S.get() / 100 * U];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (g)
          return {};
        const U = x(), ee = M(0) * U, te = M(y - 1) * U;
        return u ? {
          top: ee,
          bottom: te
        } : {
          left: ee,
          right: te
        };
      },
      rubberband: n.rubberband,
      axis: u ? "y" : "x",
      preventScroll: !u,
      pointer: {
        touch: !0
      }
    });
    function T(U, ee = !1) {
      var te;
      const re = Math.round(U), ae = g ? cs(re, y) : Re(re, 0, y - 1);
      ae !== w() && ((te = n.onIndexChange) === null || te === void 0 || te.call(n, ae)), E(ae), V.start({
        position: (g ? re : M(re)) * 100,
        immediate: ee
      });
    }
    function N() {
      T(Math.round(S.get() / 100) + 1);
    }
    function $() {
      T(Math.round(S.get() / 100) - 1);
    }
    _e(e, () => ({
      swipeTo: T,
      swipeNext: N,
      swipePrev: $
    })), Ie(() => {
      const U = y - 1;
      v > U && T(U, !0);
    });
    const {
      autoplay: A,
      autoplayInterval: _
    } = n, O = () => {
      c.current = window.setTimeout(() => {
        A === "reverse" ? $() : N(), O();
      }, _);
    };
    J(() => {
      if (!(!A || C))
        return O(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [A, _, C, y]);
    function L(U, ee) {
      let te = {};
      return g && (te = {
        [u ? "y" : "x"]: S.to((re) => {
          let ae = -re + U * 100;
          const de = y * 100, xe = de / 2;
          return ae = cs(ae + xe, de) - xe, `${ae}%`;
        }),
        [u ? "top" : "left"]: `-${U * 100}%`
      }), s.createElement(Ce.div, {
        className: Z(`${Pt}-slide`, {
          [`${Pt}-slide-active`]: v === U
        }),
        style: te,
        key: U
      }, ee);
    }
    function B() {
      if (b && i) {
        const ee = Math.max(v - 2, 0), te = Math.min(v + 2, i - 1), re = [];
        for (let ae = ee; ae <= te; ae += 1)
          re.push(L(ae, b(ae)));
        return s.createElement(s.Fragment, null, s.createElement("div", {
          className: `${Pt}-slide-placeholder`,
          style: {
            [u ? "height" : "width"]: `${ee * 100}%`
          }
        }), re);
      }
      return s.Children.map(m, (U, ee) => L(ee, U));
    }
    function j() {
      return g ? s.createElement("div", {
        className: `${Pt}-track-inner`
      }, B()) : s.createElement(Ce.div, {
        className: `${Pt}-track-inner`,
        style: {
          [u ? "y" : "x"]: S.to((U) => `${-U}%`)
        }
      }, B());
    }
    const q = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, K = Object.assign({}, n.allowTouchMove ? R() : {}), z = {};
    for (const U of n.stopPropagation) {
      const ee = f9[U];
      z[ee] = function(te) {
        te.stopPropagation();
      };
    }
    const ne = u9(K, z);
    let oe = null;
    return typeof o == "function" ? oe = o(y, v) : o !== !1 && (oe = s.createElement("div", {
      className: `${Pt}-indicator`
    }, s.createElement(Ky, Object.assign({}, n.indicatorProps, {
      total: y,
      current: v,
      direction: r
    })))), H(n, s.createElement("div", {
      className: Z(Pt, `${Pt}-${r}`),
      style: q
    }, s.createElement("div", Object.assign({
      ref: h,
      className: Z(`${Pt}-track`, {
        [`${Pt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (U) => {
        F.current && U.stopPropagation(), P();
      }
    }, ne), j()), oe));
  };
}));
function cs(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const Nb = pe(m9, {
  Item: im
}), h9 = He((t) => H(t, s.createElement("svg", {
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
})))))))), Nn = "adm-switch", v9 = {
  defaultChecked: !1
}, Pb = (t) => {
  const e = G(v9, t), n = e.disabled || e.loading || !1, [r, i] = X(!1), {
    locale: a
  } = fe(), [o, l] = ue({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Me(this, void 0, void 0, function* () {
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
      if (s1(f)) {
        i(!0);
        try {
          yield f, i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
    });
  }
  return H(e, s.createElement("div", {
    onClick: c,
    className: Z(Nn, {
      [`${Nn}-checked`]: o,
      [`${Nn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, s.createElement("div", {
    className: `${Nn}-checkbox`
  }, s.createElement("div", {
    className: `${Nn}-handle`
  }, (e.loading || r) && s.createElement(h9, {
    className: `${Nn}-spin-icon`
  })), s.createElement("div", {
    className: `${Nn}-inner`
  }, o ? e.checkedText : e.uncheckedText))));
}, p9 = () => null, Zt = "adm-tab-bar", g9 = {
  safeArea: !1
}, y9 = (t) => {
  var e;
  const n = G(g9, t);
  let r = null;
  const i = [];
  Cn(n.children, (l, c) => {
    if (!bn(l))
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
  return H(n, s.createElement("div", {
    className: Zt
  }, s.createElement("div", {
    className: `${Zt}-wrap`
  }, i.map((l) => {
    const c = l.key === a;
    function u() {
      const f = l.props.icon && s.createElement("div", {
        className: `${Zt}-item-icon`
      }, typeof l.props.icon == "function" ? l.props.icon(c) : l.props.icon), d = l.props.title && s.createElement("div", {
        className: Z(`${Zt}-item-title`, !!f && `${Zt}-item-title-with-icon`)
      }, typeof l.props.title == "function" ? l.props.title(c) : l.props.title);
      return f ? s.createElement(s.Fragment, null, s.createElement(Fs, {
        content: l.props.badge,
        className: `${Zt}-icon-badge`
      }, f), d) : d ? s.createElement(Fs, {
        content: l.props.badge,
        className: `${Zt}-title-badge`
      }, d) : null;
    }
    return H(l.props, s.createElement("div", {
      key: l.key,
      onClick: () => {
        var f, d;
        const {
          key: m
        } = l;
        m != null && (o(m.toString()), (d = (f = l.props).onClick) === null || d === void 0 || d.call(f));
      },
      className: Z(`${Zt}-item`, {
        [`${Zt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && s.createElement(Br, {
    position: "bottom"
  })));
}, Mb = pe(y9, {
  Item: p9
}), Rf = "adm-tag", b9 = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, E9 = {
  color: "default",
  fill: "solid",
  round: !1
}, Ab = (t) => {
  var e;
  const n = G(E9, t), r = (e = b9[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return H(n, s.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: Z(Rf, {
      [`${Rf}-round`]: n.round
    })
  }, n.children));
}, oi = "adm-text-area", am = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, w9 = Ee((t, e) => {
  const n = G(am, t), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, l] = ue(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = W(null), u = W("auto"), f = W(null), d = L0({
    onEnterPress: n.onEnterPress,
    onKeyDown: n.onKeyDown
  });
  _e(e, () => ({
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
  })), Ie(() => {
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
  const m = W(!1);
  let p;
  const b = $a(o).length;
  typeof i == "function" ? p = i(b, a) : i && (p = s.createElement("div", {
    className: `${oi}-count`
  }, a === void 0 ? b : b + "/" + a));
  let y = n.rows;
  return typeof r == "object" && (r.maxRows && y > r.maxRows && (y = r.maxRows), r.minRows && y < r.minRows && (y = r.minRows)), H(n, s.createElement("div", {
    className: oi
  }, s.createElement("textarea", {
    ref: c,
    className: `${oi}-element`,
    rows: y,
    value: o,
    placeholder: n.placeholder,
    onChange: (g) => {
      let h = g.target.value;
      a && !m.current && (h = $a(h).slice(0, a).join("")), l(h);
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
        l($a(x).slice(0, a).join(""));
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
    onKeyDown: d,
    enterKeyHint: n.enterKeyHint
  }), p, r && s.createElement("textarea", {
    ref: f,
    className: `${oi}-element ${oi}-element-hidden`,
    value: o,
    rows: y,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
w9.defaultProps = am;
const qt = "adm-toast", C9 = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, x9 = (t) => {
  const e = G(C9, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = e, o = me(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return s.createElement(Fd, {
          className: `${qt}-icon-success`
        });
      case "fail":
        return s.createElement(ho, {
          className: `${qt}-icon-fail`
        });
      case "loading":
        return s.createElement(ql, {
          color: "white",
          className: `${qt}-loading`
        });
      default:
        return i;
    }
  }, [i]), l = me(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return s.createElement(Vi, {
    visible: e.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: e.getContainer,
    afterClose: e.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, e.maskStyle),
    className: Z(`${qt}-mask`, e.maskClassName),
    stopPropagation: e.stopPropagation
  }, s.createElement("div", {
    className: Z(`${qt}-wrap`)
  }, s.createElement("div", {
    style: {
      top: l
    },
    className: Z(`${qt}-main`, i ? `${qt}-main-icon` : `${qt}-main-text`)
  }, o && s.createElement("div", {
    className: `${qt}-icon`
  }, o), s.createElement($i, null, r))));
};
let tt = null, us = null;
const Oa = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, k9 = (t) => s.createElement(x9, Object.assign({}, t));
function _9(t) {
  var e;
  const n = G(Oa, typeof t == "string" ? {
    content: t
  } : t), r = s.createElement(k9, Object.assign({}, n, {
    onClose: () => {
      tt = null;
    }
  }));
  return tt ? !((e = tt.isRendered) === null || e === void 0) && e.call(tt) ? tt.replace(r) : (tt.close(), tt = Un(r)) : tt = Un(r), us && window.clearTimeout(us), n.duration !== 0 && (us = window.setTimeout(() => {
    om();
  }, n.duration)), tt;
}
function om() {
  tt == null || tt.close(), tt = null;
}
function $9(t) {
  t.duration !== void 0 && (Oa.duration = t.duration), t.position !== void 0 && (Oa.position = t.position), t.maskClickable !== void 0 && (Oa.maskClickable = t.maskClickable);
}
const S9 = {
  show: _9,
  clear: om,
  config: $9
}, Tb = S9;
function sm(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[e] ? i = Math.max(i, n(a[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const wa = "adm-tree-select", O9 = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, F9 = (t) => {
  const e = G(O9, t), [n, r, i] = zi(e.fieldNames), [a, o] = ue({
    value: e.value,
    defaultValue: e.defaultValue
  }), [l, c, u] = me(() => {
    const p = sm(e.options, i), b = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Map();
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
      className: Z(`${wa}-item`, {
        [`${wa}-item-active`]: g
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
        className: Z(`${wa}-column`),
        style: {
          width: g
        }
      }, d(y === 0 ? e.options : (p = c.get(a[y - 1])) === null || p === void 0 ? void 0 : p[i], y));
      b.push(h);
    }
    return b;
  };
  return H(e, s.createElement("div", {
    className: wa
  }, m()));
}, ut = "adm-tree-select-multiple", R9 = (t) => {
  const e = G({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  J(() => {
  }, []);
  const [n, r, i] = zi(e.fieldNames), [a, o] = ue({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [l, c] = ue({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = (k) => {
    const F = [], M = (S) => {
      var V;
      S && (!((V = S[i]) === null || V === void 0) && V.length ? S[i].forEach((I) => M(I)) : F.push(S[r]));
    };
    return M(k), F;
  }, [f, d, m] = me(() => {
    const k = sm(e.options, i), F = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map();
    function S(V, I) {
      I.forEach((P) => {
        M.set(P[r], V), F.set(P[r], P), P[i] && S(P, P[i]);
      });
    }
    return S(void 0, e.options), [k, F, M];
  }, [e.options]), p = me(() => {
    let k = [];
    return l.forEach((F) => {
      const M = d.get(F);
      k = k.concat(u(M));
    }), k;
  }, [l, d]), b = me(() => {
    const k = /* @__PURE__ */ new Map(), F = (M) => {
      const S = m.get(M);
      S && (k.set(S[r], !0), F(S[r]));
    };
    return p.forEach((M) => {
      k.set(M, !0), F(M);
    }), k;
  }, [m, l]), y = (k) => {
    var F;
    let M = [...k], S = [];
    const V = (P) => {
      P.forEach((R) => {
        var T;
        if (S.includes(R))
          return;
        const N = m.get(R);
        if (!N)
          return;
        const $ = ((T = N[i]) === null || T === void 0 ? void 0 : T.map((A) => A[r])) || [];
        $.every((A) => M.includes(A)) && (M.push(N[r]), S = S.concat($));
      });
    };
    for (let P = 0; P < f; P++)
      V(M);
    M = M.filter((P) => !S.includes(P));
    const I = M.map((P) => d.get(P));
    c(M), (F = e.onChange) === null || F === void 0 || F.call(e, M, I);
  }, g = (k) => {
    var F;
    const M = [];
    let S = k;
    for (; S; )
      M.unshift(S), S = m.get(S[r]);
    const V = M.map((I) => I[r]);
    o(V), (F = e.onExpand) === null || F === void 0 || F.call(e, V, M);
  }, h = (k, F) => {
    var M;
    const S = (M = e.selectAllText) === null || M === void 0 ? void 0 : M[F];
    if (!S)
      return;
    let V = [];
    k.forEach((P) => {
      V = V.concat(u(P));
    });
    const I = V.every((P) => p.includes(P));
    return s.createElement("div", {
      onClick: () => {
        y(I ? p.filter((P) => !V.includes(P)) : p.concat(V));
      },
      className: `${ut}-item`
    }, S);
  }, x = (k, F) => {
    var M;
    const S = (M = e.selectAllText) === null || M === void 0 ? void 0 : M[F];
    if (!S)
      return;
    const V = k.map((R) => R[r]), I = V.every((R) => p.includes(R)), P = I ? !1 : V.some((R) => p.includes(R));
    return s.createElement("div", {
      onClick: () => {
        y(I ? p.filter((R) => !V.includes(R)) : p.concat(V));
      },
      className: Z(`${ut}-item`, `${ut}-item-leaf`)
    }, s.createElement(Vu, {
      className: `${ut}-item-checkbox`,
      checked: I,
      indeterminate: P
    }), S);
  }, v = (k) => {
    const F = a.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        F || g(k);
      },
      className: Z(`${ut}-item`, {
        [`${ut}-item-expand`]: F
      })
    }, k[n], !!b.get(k[r]) && s.createElement("div", {
      className: `${ut}-dot`
    }));
  }, E = (k) => {
    const F = p.includes(k[r]);
    return s.createElement("div", {
      key: k[r],
      onClick: () => {
        y(F ? p.filter((M) => M !== k[r]) : [...p, k[r]]);
      },
      className: Z(`${ut}-item`, `${ut}-item-leaf`)
    }, s.createElement(Vu, {
      className: `${ut}-item-checkbox`,
      checked: F
    }), k[n]);
  }, w = (k = [], F) => k.length === 0 ? void 0 : f === F + 1 ? s.createElement(s.Fragment, null, x(k, F), k.map((S) => E(S))) : s.createElement(s.Fragment, null, h(k, F), k.map((S) => v(S))), C = () => {
    var k;
    const F = [];
    for (let M = 0; M < f; M++) {
      let S = `${100 / f}%`;
      f === 2 && M === 0 && (S = "33.33%"), f === 2 && M === 1 && (S = "66.67%");
      const V = s.createElement("div", {
        key: M,
        className: Z(`${ut}-column`),
        style: {
          width: S
        }
      }, w(M === 0 ? e.options : (k = d.get(a[M - 1])) === null || k === void 0 ? void 0 : k[i], M));
      F.push(V);
    }
    return F;
  };
  return H(e, s.createElement("div", {
    className: ut
  }, C()));
}, Ib = pe(F9, {
  Multiple: R9
}), sn = "adm-virtual-input", N9 = {
  defaultValue: "",
  cursor: {
    movable: !1
  }
}, Lb = Ee((t, e) => {
  const {
    locale: n,
    input: r = {}
  } = fe(), i = G(N9, r, t), [a, o] = ue(i), l = W(null), c = W(null), [u, f] = X(!1), [d, m] = X(a.length), p = W({}), b = W(), y = W(null), g = W(0), h = W(null), [x, v] = X(!1), E = W(), w = En(s.createElement(Nl, null), r.clearIcon, t.clearIcon);
  function C() {
    const $ = l.current;
    if (!$ || document.activeElement !== $)
      return;
    const A = c.current;
    A && (A.scrollLeft = A.clientWidth);
  }
  J(() => {
    y.current && (g.current = y.current.getBoundingClientRect().width);
  }, [a]), J(() => {
    a === p.current.newValue ? p.current.mode === "input" ? m(($) => $ + 1) : p.current.mode === "delete" && m(($) => $ - 1) : m(a.length);
  }, [a]), Ie(() => {
    C();
  }, [a]), J(() => {
    u && C();
  }, [u]), _e(e, () => ({
    focus: () => {
      var $;
      ($ = l.current) === null || $ === void 0 || $.focus();
    },
    blur: () => {
      var $;
      ($ = l.current) === null || $ === void 0 || $.blur();
    }
  }));
  function k() {
    var $;
    f(!0), ($ = i.onFocus) === null || $ === void 0 || $.call(i);
  }
  function F() {
    var $;
    f(!1), ($ = i.onBlur) === null || $ === void 0 || $.call(i);
  }
  const M = i.keyboard, S = M && s.cloneElement(M, {
    onInput: ($) => {
      var A, _;
      const O = a.substring(0, d) + $ + a.substring(d);
      p.current = {
        newValue: O,
        mode: "input"
      }, o(O), (_ = (A = M.props).onInput) === null || _ === void 0 || _.call(A, $);
    },
    onDelete: () => {
      var $, A;
      if (d === 0)
        return;
      const _ = a.substring(0, d - 1) + a.substring(d);
      p.current = {
        newValue: _,
        mode: "delete"
      }, o(_), (A = ($ = M.props).onDelete) === null || A === void 0 || A.call($);
    },
    visible: u,
    onClose: () => {
      var $, A, _, O;
      const L = document.activeElement;
      L && (!(($ = l.current) === null || $ === void 0) && $.contains(L)) ? L.blur() : (A = l.current) === null || A === void 0 || A.blur(), (O = (_ = M.props).onClose) === null || O === void 0 || O.call(_);
    },
    getContainer: null
  }), V = () => {
    var $, A;
    d !== a.length && (m(a.length), (A = ($ = i.cursor) === null || $ === void 0 ? void 0 : $.onMove) === null || A === void 0 || A.call($, a.length));
  }, I = ($) => (A) => {
    var _, O, L;
    if (i.disabled || !(!((_ = i.cursor) === null || _ === void 0) && _.movable))
      return;
    A.stopPropagation();
    const B = A.target.getBoundingClientRect(), j = B.left + B.width / 2, z = A.clientX > j ? $ + 1 : $;
    m(z), (L = (O = i.cursor) === null || O === void 0 ? void 0 : O.onMove) === null || L === void 0 || L.call(O, z);
  }, P = ($) => {
    var A;
    if (i.disabled || !(!((A = i.cursor) === null || A === void 0) && A.movable) || !h.current)
      return;
    const _ = $.touches[0], O = h.current.getBoundingClientRect();
    Math.abs(_.clientX - (O.left + O.width / 2)) < 20 ? b.current = {
      startX: _.clientX,
      startCaretPosition: d
    } : b.current = null;
  }, R = ($) => {
    var A, _, O;
    if (!b.current || !(!((A = i.cursor) === null || A === void 0) && A.movable))
      return;
    v(!0);
    const B = $.touches[0].clientX - b.current.startX, j = g.current, q = Math.round(B / j);
    let K = b.current.startCaretPosition + q;
    K = Math.max(0, Math.min(K, a.length)), m(K), (O = (_ = i.cursor) === null || _ === void 0 ? void 0 : _.onMove) === null || O === void 0 || O.call(_, K), E.current && clearTimeout(E.current), E.current = setTimeout(() => {
      v(!1), E.current = null;
    }, 500);
  }, T = () => {
    b.current = null, v(!1), E.current && (clearTimeout(E.current), E.current = null);
  }, N = (a + "").split("");
  return H(i, s.createElement("div", {
    ref: l,
    className: Z(sn, {
      [`${sn}-disabled`]: i.disabled,
      [`${sn}-caret-dragging`]: x
    }),
    tabIndex: i.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: k,
    onBlur: F,
    onClick: i.onClick
  }, s.createElement("div", {
    className: `${sn}-content`,
    ref: c,
    "aria-disabled": i.disabled,
    "aria-label": i.placeholder,
    onClick: V,
    onTouchStart: P,
    onTouchMove: R,
    onTouchEnd: T
  }, N.slice(0, d).map(($, A) => s.createElement("span", {
    ref: A === 0 ? y : void 0,
    key: A,
    onClick: I(A)
  }, $)), s.createElement("div", {
    className: `${sn}-caret-container`
  }, u && s.createElement("div", {
    ref: h,
    className: `${sn}-caret`
  })), N.slice(d).map(($, A) => s.createElement("span", {
    key: A,
    onClick: I(A + d)
  }, $))), i.clearable && !!a && u && s.createElement("div", {
    className: `${sn}-clear`,
    onClick: ($) => {
      var A;
      $.stopPropagation(), o(""), (A = i.onClear) === null || A === void 0 || A.call(i);
    },
    role: "button",
    "aria-label": n.Input.clear
  }, w), [void 0, null, ""].includes(a) && s.createElement("div", {
    className: `${sn}-placeholder`
  }, i.placeholder), S));
}), Nf = "adm-water-mark", P9 = {
  fullPage: !0
}, Db = (t) => {
  const e = G(P9, t), {
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
  return J(() => {
    const v = document.createElement("canvas"), E = window.devicePixelRatio, w = v.getContext("2d"), C = `${(r + a) * E}px`, k = `${(i + o) * E}px`, F = a * E, M = o * E;
    if (v.setAttribute("width", C), v.setAttribute("height", k), w) {
      if (c) {
        w.translate(F / 2, M / 2), w.rotate(Math.PI / 180 * Number(l));
        const S = new Image();
        S.crossOrigin = "anonymous", S.referrerPolicy = "no-referrer", S.onload = () => {
          w.drawImage(S, -u * E / 2, -f * E / 2, u * E, f * E), w.restore(), x(v.toDataURL());
        }, S.src = c;
      } else if (d) {
        w.textBaseline = "middle", w.textAlign = "center", w.translate(F / 2, M / 2), w.rotate(Math.PI / 180 * Number(l));
        const S = Number(y) * E;
        w.font = `${m} normal ${p} ${S}px/${M}px ${g}`, w.fillStyle = b, Array.isArray(d) ? d.forEach((V, I) => w.fillText(V, 0, I * S)) : w.fillText(d, 0, 0), w.restore(), x(v.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, l, m, p, a, o, g, b, c, d, y]), H(e, s.createElement("div", {
    className: Z(Nf, {
      [`${Nf}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: h === "" ? void 0 : `url('${h}')`
    }
  }));
}, Pn = "adm-footer", M9 = {
  label: "",
  links: [],
  content: "",
  chips: []
}, Vb = (t) => {
  const e = G(M9, t), {
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
  return H(e, s.createElement("div", {
    className: Z(Pn)
  }, n && s.createElement("div", {
    className: `${Pn}-label`
  }, s.createElement(Ps, null, n)), !!(r != null && r.length) && s.createElement("div", {
    className: `${Pn}-links`
  }, r.map((f, d) => s.createElement(s.Fragment, {
    key: d
  }, s.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && s.createElement(Ps, {
    direction: "vertical"
  })))), i && s.createElement("div", {
    className: `${Pn}-content`
  }, i), a && a.length > 0 && s.createElement("div", {
    className: `${Pn}-chips`
  }, a.map((f, d) => s.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: Z(`${Pn}-chip`, {
      [`${Pn}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  V9 as ActionSheet,
  $i as AutoCenter,
  j9 as Avatar,
  Fs as Badge,
  zt as Button,
  B9 as Calendar,
  W9 as CalendarPicker,
  Sg as CalendarPickerView,
  Z9 as CapsuleTabs,
  q9 as Card,
  z9 as CascadePicker,
  K9 as CascadePickerView,
  Y9 as Cascader,
  b4 as CascaderView,
  B1 as CenterPopup,
  Lu as CheckList,
  Vu as Checkbox,
  G9 as Collapse,
  L9 as ConfigProvider,
  X9 as DatePicker,
  Q9 as DatePickerView,
  J9 as Dialog,
  Ps as Divider,
  o1 as DotLoading,
  eb as Dropdown,
  tb as Ellipsis,
  nb as Empty,
  rb as ErrorBlock,
  ib as FloatingBubble,
  ab as FloatingPanel,
  Vb as Footer,
  ob as Form,
  F0 as Grid,
  bo as Image,
  sb as ImageUploader,
  _y as ImageViewer,
  lb as IndexBar,
  cb as InfiniteScroll,
  D0 as Input,
  ub as JumboTabs,
  Tt as List,
  o1 as Loading,
  Vi as Mask,
  fb as Modal,
  db as NavBar,
  mb as NoticeBar,
  hb as NumberKeyboard,
  Ky as PageIndicator,
  vb as PasscodeInput,
  T1 as Picker,
  Po as PickerView,
  $0 as Popover,
  jr as Popup,
  pb as ProgressBar,
  gb as ProgressCircle,
  yb as PullToRefresh,
  bb as Radio,
  Eb as Rate,
  wb as Result,
  Cb as ResultPage,
  Br as SafeArea,
  $1 as ScrollMask,
  xb as SearchBar,
  kb as Segmented,
  _b as Selector,
  $b as SideBar,
  oa as Skeleton,
  Sb as Slider,
  Ec as Space,
  ql as SpinLoading,
  Ob as Stepper,
  Fb as Steps,
  Rb as SwipeAction,
  Nb as Swiper,
  Pb as Switch,
  Mb as TabBar,
  Iu as Tabs,
  Ab as Tag,
  w9 as TextArea,
  Tb as Toast,
  Ib as TreeSelect,
  Lb as VirtualInput,
  Db as WaterMark,
  C5 as createErrorBlock,
  H9 as reduceMotion,
  U9 as restoreMotion,
  I9 as setDefaultConfig,
  M3 as unstableSetRender,
  fe as useConfig
};
