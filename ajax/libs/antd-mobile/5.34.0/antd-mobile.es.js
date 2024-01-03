import * as L from "react";
import l, { useContext as ot, useRef as V, useMemo as ie, useEffect as X, useState as K, useCallback as Ue, useLayoutEffect as Zs, forwardRef as me, useImperativeHandle as we, memo as Be, isValidElement as Dn, createContext as Hs, cloneElement as J0 } from "react";
import * as em from "react-dom";
import { unstable_batchedUpdates as tm, createPortal as nm, findDOMNode as rm } from "react-dom";
const vr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
vr && document.addEventListener("touchstart", () => {
}, !0);
var fa = function() {
  return fa = Object.assign || function(e) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (e[a] = n[a]);
    }
    return e;
  }, fa.apply(this, arguments);
};
function pr(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(t); i < r.length; i++)
      e.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, r[i]) && (n[r[i]] = t[r[i]]);
  return n;
}
function Se(t, e, n, r) {
  function i(a) {
    return a instanceof n ? a : new n(function(o) {
      o(a);
    });
  }
  return new (n || (n = Promise))(function(a, o) {
    function s(f) {
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
      f.done ? a(f.value) : i(f.value).then(s, c);
    }
    u((r = r.apply(t, e || [])).next());
  });
}
function im(t, e) {
  var n = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, r, i, a, o;
  return o = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function s(u) {
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
function am(t) {
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
function _t(t, e) {
  var n = typeof Symbol == "function" && t[Symbol.iterator];
  if (!n)
    return t;
  var r = n.call(t), i, a = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(i = r.next()).done; )
      a.push(i.value);
  } catch (s) {
    o = { error: s };
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
function om(t, e) {
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
const Ke = "${label} is not a valid ${type}", sm = {
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
}, Ge = "${label}不是一个有效的${type}", lm = om(sm, {
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
        string: Ge,
        method: Ge,
        array: Ge,
        object: Ge,
        number: Ge,
        date: Ge,
        boolean: Ge,
        integer: Ge,
        float: Ge,
        regexp: Ge,
        email: Ge,
        url: Ge,
        hex: Ge
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
}), cm = lm, Ff = {
  current: {
    locale: cm
  }
};
function h_(t) {
  Ff.current = t;
}
function bi() {
  return Ff.current;
}
const Nf = l.createContext(null), v_ = (t) => {
  const {
    children: e
  } = t, n = pr(t, ["children"]), r = ye();
  return l.createElement(Nf.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, e);
};
function ye() {
  var t;
  return (t = ot(Nf)) !== null && t !== void 0 ? t : bi();
}
function le(t, e) {
  const n = t;
  for (const r in e)
    e.hasOwnProperty(r) && (n[r] = e[r]);
  return n;
}
var ht = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ct(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Pf = { exports: {} };
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
              var s = n.apply(null, a);
              s && r.push(s);
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
})(Pf);
var um = Pf.exports;
const B = /* @__PURE__ */ ct(um);
function W(t, e) {
  const n = Object.assign({}, e.props);
  t.className && (n.className = B(e.props.className, t.className)), t.style && (n.style = Object.assign(Object.assign({}, n.style), t.style)), t.tabIndex !== void 0 && (n.tabIndex = t.tabIndex);
  for (const r in t)
    t.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = t[r]);
  return l.cloneElement(e, n);
}
var fm = typeof ht == "object" && ht && ht.Object === Object && ht, Af = fm, dm = Af, mm = typeof self == "object" && self && self.Object === Object && self, hm = dm || mm || Function("return this")(), gt = hm, vm = gt, pm = vm.Symbol, Us = pm, rc = Us, Tf = Object.prototype, gm = Tf.hasOwnProperty, ym = Tf.toString, Tr = rc ? rc.toStringTag : void 0;
function bm(t) {
  var e = gm.call(t, Tr), n = t[Tr];
  try {
    t[Tr] = void 0;
    var r = !0;
  } catch {
  }
  var i = ym.call(t);
  return r && (e ? t[Tr] = n : delete t[Tr]), i;
}
var wm = bm, Em = Object.prototype, Cm = Em.toString;
function xm(t) {
  return Cm.call(t);
}
var $m = xm, ic = Us, _m = wm, km = $m, Om = "[object Null]", Sm = "[object Undefined]", ac = ic ? ic.toStringTag : void 0;
function Fm(t) {
  return t == null ? t === void 0 ? Sm : Om : ac && ac in Object(t) ? _m(t) : km(t);
}
var gr = Fm;
function Nm(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var St = Nm, Pm = gr, Am = St, Tm = "[object AsyncFunction]", Rm = "[object Function]", Mm = "[object GeneratorFunction]", Im = "[object Proxy]";
function Lm(t) {
  if (!Am(t))
    return !1;
  var e = Pm(t);
  return e == Rm || e == Mm || e == Tm || e == Im;
}
var qs = Lm, Dm = gt, Vm = Dm["__core-js_shared__"], jm = Vm, xo = jm, oc = function() {
  var t = /[^.]+$/.exec(xo && xo.keys && xo.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function Bm(t) {
  return !!oc && oc in t;
}
var Wm = Bm, Zm = Function.prototype, Hm = Zm.toString;
function zm(t) {
  if (t != null) {
    try {
      return Hm.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var Rf = zm, Um = qs, qm = Wm, Km = St, Gm = Rf, Ym = /[\\^$.*+?()[\]{}|]/g, Xm = /^\[object .+?Constructor\]$/, Qm = Function.prototype, Jm = Object.prototype, eh = Qm.toString, th = Jm.hasOwnProperty, nh = RegExp(
  "^" + eh.call(th).replace(Ym, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function rh(t) {
  if (!Km(t) || qm(t))
    return !1;
  var e = Um(t) ? nh : Xm;
  return e.test(Gm(t));
}
var ih = rh;
function ah(t, e) {
  return t == null ? void 0 : t[e];
}
var oh = ah, sh = ih, lh = oh;
function ch(t, e) {
  var n = lh(t, e);
  return sh(n) ? n : void 0;
}
var Vn = ch, uh = Vn, fh = function() {
  try {
    var t = uh(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), Mf = fh, sc = Mf;
function dh(t, e, n) {
  e == "__proto__" && sc ? sc(t, e, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : t[e] = n;
}
var Ks = dh;
function mh(t, e) {
  return t === e || t !== t && e !== e;
}
var wi = mh, hh = Ks, vh = wi, ph = Object.prototype, gh = ph.hasOwnProperty;
function yh(t, e, n) {
  var r = t[e];
  (!(gh.call(t, e) && vh(r, n)) || n === void 0 && !(e in t)) && hh(t, e, n);
}
var bh = yh, wh = bh, Eh = Ks;
function Ch(t, e, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = e.length; ++a < o; ) {
    var s = e[a], c = r ? r(n[s], t[s], s, n, t) : void 0;
    c === void 0 && (c = t[s]), i ? Eh(n, s, c) : wh(n, s, c);
  }
  return n;
}
var If = Ch;
function xh(t) {
  return t;
}
var Lf = xh;
function $h(t, e, n) {
  switch (n.length) {
    case 0:
      return t.call(e);
    case 1:
      return t.call(e, n[0]);
    case 2:
      return t.call(e, n[0], n[1]);
    case 3:
      return t.call(e, n[0], n[1], n[2]);
  }
  return t.apply(e, n);
}
var _h = $h, kh = _h, lc = Math.max;
function Oh(t, e, n) {
  return e = lc(e === void 0 ? t.length - 1 : e, 0), function() {
    for (var r = arguments, i = -1, a = lc(r.length - e, 0), o = Array(a); ++i < a; )
      o[i] = r[e + i];
    i = -1;
    for (var s = Array(e + 1); ++i < e; )
      s[i] = r[i];
    return s[e] = n(o), kh(t, this, s);
  };
}
var Sh = Oh;
function Fh(t) {
  return function() {
    return t;
  };
}
var Nh = Fh, Ph = Nh, cc = Mf, Ah = Lf, Th = cc ? function(t, e) {
  return cc(t, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ph(e),
    writable: !0
  });
} : Ah, Rh = Th, Mh = 800, Ih = 16, Lh = Date.now;
function Dh(t) {
  var e = 0, n = 0;
  return function() {
    var r = Lh(), i = Ih - (r - n);
    if (n = r, i > 0) {
      if (++e >= Mh)
        return arguments[0];
    } else
      e = 0;
    return t.apply(void 0, arguments);
  };
}
var Vh = Dh, jh = Rh, Bh = Vh, Wh = Bh(jh), Zh = Wh, Hh = Lf, zh = Sh, Uh = Zh;
function qh(t, e) {
  return Uh(zh(t, e, Hh), t + "");
}
var Kh = qh, Gh = 9007199254740991;
function Yh(t) {
  return typeof t == "number" && t > -1 && t % 1 == 0 && t <= Gh;
}
var Df = Yh, Xh = qs, Qh = Df;
function Jh(t) {
  return t != null && Qh(t.length) && !Xh(t);
}
var La = Jh, e2 = 9007199254740991, t2 = /^(?:0|[1-9]\d*)$/;
function n2(t, e) {
  var n = typeof t;
  return e = e ?? e2, !!e && (n == "number" || n != "symbol" && t2.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
var Vf = n2, r2 = wi, i2 = La, a2 = Vf, o2 = St;
function s2(t, e, n) {
  if (!o2(n))
    return !1;
  var r = typeof e;
  return (r == "number" ? i2(n) && a2(e, n.length) : r == "string" && e in n) ? r2(n[e], t) : !1;
}
var l2 = s2, c2 = Kh, u2 = l2;
function f2(t) {
  return c2(function(e, n) {
    var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (a = t.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && u2(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), e = Object(e); ++r < i; ) {
      var s = n[r];
      s && t(e, s, r, a);
    }
    return e;
  });
}
var jf = f2;
function d2(t, e) {
  for (var n = -1, r = Array(t); ++n < t; )
    r[n] = e(n);
  return r;
}
var m2 = d2;
function h2(t) {
  return t != null && typeof t == "object";
}
var jn = h2, v2 = gr, p2 = jn, g2 = "[object Arguments]";
function y2(t) {
  return p2(t) && v2(t) == g2;
}
var b2 = y2, uc = b2, w2 = jn, Bf = Object.prototype, E2 = Bf.hasOwnProperty, C2 = Bf.propertyIsEnumerable, x2 = uc(/* @__PURE__ */ function() {
  return arguments;
}()) ? uc : function(t) {
  return w2(t) && E2.call(t, "callee") && !C2.call(t, "callee");
}, Wf = x2, $2 = Array.isArray, Da = $2, da = { exports: {} };
function _2() {
  return !1;
}
var k2 = _2;
da.exports;
(function(t, e) {
  var n = gt, r = k2, i = e && !e.nodeType && e, a = i && !0 && t && !t.nodeType && t, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  t.exports = u;
})(da, da.exports);
var Gs = da.exports, O2 = gr, S2 = Df, F2 = jn, N2 = "[object Arguments]", P2 = "[object Array]", A2 = "[object Boolean]", T2 = "[object Date]", R2 = "[object Error]", M2 = "[object Function]", I2 = "[object Map]", L2 = "[object Number]", D2 = "[object Object]", V2 = "[object RegExp]", j2 = "[object Set]", B2 = "[object String]", W2 = "[object WeakMap]", Z2 = "[object ArrayBuffer]", H2 = "[object DataView]", z2 = "[object Float32Array]", U2 = "[object Float64Array]", q2 = "[object Int8Array]", K2 = "[object Int16Array]", G2 = "[object Int32Array]", Y2 = "[object Uint8Array]", X2 = "[object Uint8ClampedArray]", Q2 = "[object Uint16Array]", J2 = "[object Uint32Array]", be = {};
be[z2] = be[U2] = be[q2] = be[K2] = be[G2] = be[Y2] = be[X2] = be[Q2] = be[J2] = !0;
be[N2] = be[P2] = be[Z2] = be[A2] = be[H2] = be[T2] = be[R2] = be[M2] = be[I2] = be[L2] = be[D2] = be[V2] = be[j2] = be[B2] = be[W2] = !1;
function ev(t) {
  return F2(t) && S2(t.length) && !!be[O2(t)];
}
var tv = ev;
function nv(t) {
  return function(e) {
    return t(e);
  };
}
var rv = nv, ma = { exports: {} };
ma.exports;
(function(t, e) {
  var n = Af, r = e && !e.nodeType && e, i = r && !0 && t && !t.nodeType && t, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  t.exports = s;
})(ma, ma.exports);
var iv = ma.exports, av = tv, ov = rv, fc = iv, dc = fc && fc.isTypedArray, sv = dc ? ov(dc) : av, Ys = sv, lv = m2, cv = Wf, uv = Da, fv = Gs, dv = Vf, mv = Ys, hv = Object.prototype, vv = hv.hasOwnProperty;
function pv(t, e) {
  var n = uv(t), r = !n && cv(t), i = !n && !r && fv(t), a = !n && !r && !i && mv(t), o = n || r || i || a, s = o ? lv(t.length, String) : [], c = s.length;
  for (var u in t)
    (e || vv.call(t, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    dv(u, c))) && s.push(u);
  return s;
}
var Zf = pv, gv = Object.prototype;
function yv(t) {
  var e = t && t.constructor, n = typeof e == "function" && e.prototype || gv;
  return t === n;
}
var Xs = yv;
function bv(t, e) {
  return function(n) {
    return t(e(n));
  };
}
var Hf = bv, wv = Hf, Ev = wv(Object.keys, Object), Cv = Ev, xv = Xs, $v = Cv, _v = Object.prototype, kv = _v.hasOwnProperty;
function Ov(t) {
  if (!xv(t))
    return $v(t);
  var e = [];
  for (var n in Object(t))
    kv.call(t, n) && n != "constructor" && e.push(n);
  return e;
}
var Sv = Ov, Fv = Zf, Nv = Sv, Pv = La;
function Av(t) {
  return Pv(t) ? Fv(t) : Nv(t);
}
var zf = Av, Tv = If, Rv = jf, Mv = zf, Iv = Rv(function(t, e, n, r) {
  Tv(e, Mv(e), t, r);
}), Lv = Iv;
const Dv = /* @__PURE__ */ ct(Lv);
function U(...t) {
  function e(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, t[0]);
  for (let r = 1; r < t.length; r++)
    n = Dv(n, t[r], e);
  return n;
}
var Uf = function(t) {
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
}, yr = function(t) {
  return typeof t == "function";
}, Vv = function(t) {
  return typeof t == "number";
}, jv = !1;
const Ei = jv;
function Zt(t) {
  Ei && (yr(t) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof t)));
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
const Qs = Uf(X);
function mc(t, e) {
  if (t === e)
    return !0;
  for (var n = 0; n < t.length; n++)
    if (!Object.is(t[n], e[n]))
      return !1;
  return !0;
}
function Va(t) {
  var e = V(t);
  return e.current = t, e;
}
var Bv = function(t) {
  Ei && (yr(t) || console.error("useUnmount expected parameter is a function, got ".concat(typeof t)));
  var e = Va(t);
  X(function() {
    return function() {
      e.current();
    };
  }, []);
};
const Ci = Bv;
var Wv = gt, Zv = function() {
  return Wv.Date.now();
}, Hv = Zv, zv = /\s/;
function Uv(t) {
  for (var e = t.length; e-- && zv.test(t.charAt(e)); )
    ;
  return e;
}
var qv = Uv, Kv = qv, Gv = /^\s+/;
function Yv(t) {
  return t && t.slice(0, Kv(t) + 1).replace(Gv, "");
}
var Xv = Yv, Qv = gr, Jv = jn, e3 = "[object Symbol]";
function t3(t) {
  return typeof t == "symbol" || Jv(t) && Qv(t) == e3;
}
var n3 = t3, r3 = Xv, hc = St, i3 = n3, vc = NaN, a3 = /^[-+]0x[0-9a-f]+$/i, o3 = /^0b[01]+$/i, s3 = /^0o[0-7]+$/i, l3 = parseInt;
function c3(t) {
  if (typeof t == "number")
    return t;
  if (i3(t))
    return vc;
  if (hc(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = hc(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = r3(t);
  var n = o3.test(t);
  return n || s3.test(t) ? l3(t.slice(2), n ? 2 : 8) : a3.test(t) ? vc : +t;
}
var u3 = c3, f3 = St, $o = Hv, pc = u3, d3 = "Expected a function", m3 = Math.max, h3 = Math.min;
function v3(t, e, n) {
  var r, i, a, o, s, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof t != "function")
    throw new TypeError(d3);
  e = pc(e) || 0, f3(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? m3(pc(n.maxWait) || 0, e) : a, m = "trailing" in n ? !!n.trailing : m);
  function b(x) {
    var $ = r, N = i;
    return r = i = void 0, u = x, o = t.apply(N, $), o;
  }
  function p(x) {
    return u = x, s = setTimeout(g, e), f ? b(x) : o;
  }
  function v(x) {
    var $ = x - c, N = x - u, F = e - $;
    return d ? h3(F, a - N) : F;
  }
  function y(x) {
    var $ = x - c, N = x - u;
    return c === void 0 || $ >= e || $ < 0 || d && N >= a;
  }
  function g() {
    var x = $o();
    if (y(x))
      return C(x);
    s = setTimeout(g, v(x));
  }
  function C(x) {
    return s = void 0, m && r ? b(x) : (r = i = void 0, o);
  }
  function h() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function w() {
    return s === void 0 ? o : C($o());
  }
  function E() {
    var x = $o(), $ = y(x);
    if (r = arguments, i = this, c = x, $) {
      if (s === void 0)
        return p(c);
      if (d)
        return clearTimeout(s), s = setTimeout(g, e), b(c);
    }
    return s === void 0 && (s = setTimeout(g, e)), o;
  }
  return E.cancel = h, E.flush = w, E;
}
var qf = v3;
const p3 = /* @__PURE__ */ ct(qf);
var g3 = !!(typeof window < "u" && window.document && window.document.createElement);
const Js = g3;
var y3 = qf, b3 = St, w3 = "Expected a function";
function E3(t, e, n) {
  var r = !0, i = !0;
  if (typeof t != "function")
    throw new TypeError(w3);
  return b3(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), y3(t, e, {
    leading: r,
    maxWait: e,
    trailing: i
  });
}
var C3 = E3;
const x3 = /* @__PURE__ */ ct(C3);
var $3 = function(t) {
  Ei && (yr(t) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof t, '".'))), X(function() {
    t == null || t();
  }, []);
};
const _3 = $3;
var k3 = function() {
  var t = _t(K({}), 2), e = t[1];
  return Ue(function() {
    return e({});
  }, []);
};
const Kf = k3;
function an(t, e) {
  if (Js) {
    if (!t)
      return e;
    var n;
    return yr(t) ? n = t() : "current" in t ? n = t.current : n = t, n;
  }
}
var O3 = function(t) {
  return t.every(function(e) {
    var n = an(e);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, S3 = function(t) {
  return t ? t.getRootNode() : document;
}, F3 = function(t) {
  if (!t || !document.getRootNode)
    return document;
  var e = Array.isArray(t) ? t : [t];
  return O3(e) ? S3(an(e[0])) : document;
};
const N3 = F3;
var P3 = function(t) {
  var e = function(n, r, i) {
    var a = V(!1), o = V([]), s = V([]), c = V();
    t(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return an(m);
      });
      if (!a.current) {
        a.current = !0, o.current = d, s.current = r, c.current = n();
        return;
      }
      (d.length !== o.current.length || !mc(d, o.current) || !mc(r, s.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, s.current = r, c.current = n());
    }), Ci(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return e;
};
const Gf = P3;
var A3 = Gf(X);
const el = A3;
function Yf(t, e, n) {
  n === void 0 && (n = "click");
  var r = Va(t);
  el(function() {
    var i = function(s) {
      var c = Array.isArray(e) ? e : [e];
      c.some(function(u) {
        var f = an(u);
        return !f || f.contains(s.target);
      }) || r.current(s);
    }, a = N3(e), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(s) {
      return a.addEventListener(s, i);
    }), function() {
      o.forEach(function(s) {
        return a.removeEventListener(s, i);
      });
    };
  }, Array.isArray(n) ? n : [n], e);
}
var Xf = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", b = "year", p = "date", v = "Invalid Date", y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(A) {
      var _ = ["th", "st", "nd", "rd"], T = A % 100;
      return "[" + A + (_[(T - 20) % 10] || _[T] || _[0]) + "]";
    } }, h = function(A, _, T) {
      var S = String(A);
      return !S || S.length >= _ ? A : "" + Array(_ + 1 - S.length).join(T) + A;
    }, w = { s: h, z: function(A) {
      var _ = -A.utcOffset(), T = Math.abs(_), S = Math.floor(T / 60), O = T % 60;
      return (_ <= 0 ? "+" : "-") + h(S, 2, "0") + ":" + h(O, 2, "0");
    }, m: function A(_, T) {
      if (_.date() < T.date())
        return -A(T, _);
      var S = 12 * (T.year() - _.year()) + (T.month() - _.month()), O = _.clone().add(S, d), R = T - O < 0, P = _.clone().add(S + (R ? -1 : 1), d);
      return +(-(S + (T - O) / (R ? O - P : P - O)) || 0);
    }, a: function(A) {
      return A < 0 ? Math.ceil(A) || 0 : Math.floor(A);
    }, p: function(A) {
      return { M: d, y: b, w: f, d: u, D: p, h: c, m: s, s: o, ms: a, Q: m }[A] || String(A || "").toLowerCase().replace(/s$/, "");
    }, u: function(A) {
      return A === void 0;
    } }, E = "en", x = {};
    x[E] = C;
    var $ = function(A) {
      return A instanceof D;
    }, N = function A(_, T, S) {
      var O;
      if (!_)
        return E;
      if (typeof _ == "string") {
        var R = _.toLowerCase();
        x[R] && (O = R), T && (x[R] = T, O = R);
        var P = _.split("-");
        if (!O && P.length > 1)
          return A(P[0]);
      } else {
        var M = _.name;
        x[M] = _, O = M;
      }
      return !S && O && (E = O), O || !S && E;
    }, F = function(A, _) {
      if ($(A))
        return A.clone();
      var T = typeof _ == "object" ? _ : {};
      return T.date = A, T.args = arguments, new D(T);
    }, k = w;
    k.l = N, k.i = $, k.w = function(A, _) {
      return F(A, { locale: _.$L, utc: _.$u, x: _.$x, $offset: _.$offset });
    };
    var D = function() {
      function A(T) {
        this.$L = N(T.locale, null, !0), this.parse(T);
      }
      var _ = A.prototype;
      return _.parse = function(T) {
        this.$d = function(S) {
          var O = S.date, R = S.utc;
          if (O === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(O))
            return /* @__PURE__ */ new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var P = O.match(y);
            if (P) {
              var M = P[2] - 1 || 0, j = (P[7] || "0").substring(0, 3);
              return R ? new Date(Date.UTC(P[1], M, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, j)) : new Date(P[1], M, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, j);
            }
          }
          return new Date(O);
        }(T), this.$x = T.x || {}, this.init();
      }, _.init = function() {
        var T = this.$d;
        this.$y = T.getFullYear(), this.$M = T.getMonth(), this.$D = T.getDate(), this.$W = T.getDay(), this.$H = T.getHours(), this.$m = T.getMinutes(), this.$s = T.getSeconds(), this.$ms = T.getMilliseconds();
      }, _.$utils = function() {
        return k;
      }, _.isValid = function() {
        return this.$d.toString() !== v;
      }, _.isSame = function(T, S) {
        var O = F(T);
        return this.startOf(S) <= O && O <= this.endOf(S);
      }, _.isAfter = function(T, S) {
        return F(T) < this.startOf(S);
      }, _.isBefore = function(T, S) {
        return this.endOf(S) < F(T);
      }, _.$g = function(T, S, O) {
        return k.u(T) ? this[S] : this.set(O, T);
      }, _.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, _.valueOf = function() {
        return this.$d.getTime();
      }, _.startOf = function(T, S) {
        var O = this, R = !!k.u(S) || S, P = k.p(T), M = function(Ee, z) {
          var ee = k.w(O.$u ? Date.UTC(O.$y, z, Ee) : new Date(O.$y, z, Ee), O);
          return R ? ee : ee.endOf(u);
        }, j = function(Ee, z) {
          return k.w(O.toDate()[Ee].apply(O.toDate("s"), (R ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(z)), O);
        }, Z = this.$W, q = this.$M, G = this.$D, Y = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case b:
            return R ? M(1, 0) : M(31, 11);
          case d:
            return R ? M(1, q) : M(0, q + 1);
          case f:
            var ce = this.$locale().weekStart || 0, he = (Z < ce ? Z + 7 : Z) - ce;
            return M(R ? G - he : G + (6 - he), q);
          case u:
          case p:
            return j(Y + "Hours", 0);
          case c:
            return j(Y + "Minutes", 1);
          case s:
            return j(Y + "Seconds", 2);
          case o:
            return j(Y + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, _.endOf = function(T) {
        return this.startOf(T, !1);
      }, _.$set = function(T, S) {
        var O, R = k.p(T), P = "set" + (this.$u ? "UTC" : ""), M = (O = {}, O[u] = P + "Date", O[p] = P + "Date", O[d] = P + "Month", O[b] = P + "FullYear", O[c] = P + "Hours", O[s] = P + "Minutes", O[o] = P + "Seconds", O[a] = P + "Milliseconds", O)[R], j = R === u ? this.$D + (S - this.$W) : S;
        if (R === d || R === b) {
          var Z = this.clone().set(p, 1);
          Z.$d[M](j), Z.init(), this.$d = Z.set(p, Math.min(this.$D, Z.daysInMonth())).$d;
        } else
          M && this.$d[M](j);
        return this.init(), this;
      }, _.set = function(T, S) {
        return this.clone().$set(T, S);
      }, _.get = function(T) {
        return this[k.p(T)]();
      }, _.add = function(T, S) {
        var O, R = this;
        T = Number(T);
        var P = k.p(S), M = function(q) {
          var G = F(R);
          return k.w(G.date(G.date() + Math.round(q * T)), R);
        };
        if (P === d)
          return this.set(d, this.$M + T);
        if (P === b)
          return this.set(b, this.$y + T);
        if (P === u)
          return M(1);
        if (P === f)
          return M(7);
        var j = (O = {}, O[s] = r, O[c] = i, O[o] = n, O)[P] || 1, Z = this.$d.getTime() + T * j;
        return k.w(Z, this);
      }, _.subtract = function(T, S) {
        return this.add(-1 * T, S);
      }, _.format = function(T) {
        var S = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || v;
        var R = T || "YYYY-MM-DDTHH:mm:ssZ", P = k.z(this), M = this.$H, j = this.$m, Z = this.$M, q = O.weekdays, G = O.months, Y = O.meridiem, ce = function(z, ee, J, te) {
          return z && (z[ee] || z(S, R)) || J[ee].slice(0, te);
        }, he = function(z) {
          return k.s(M % 12 || 12, z, "0");
        }, Ee = Y || function(z, ee, J) {
          var te = z < 12 ? "AM" : "PM";
          return J ? te.toLowerCase() : te;
        };
        return R.replace(g, function(z, ee) {
          return ee || function(J) {
            switch (J) {
              case "YY":
                return String(S.$y).slice(-2);
              case "YYYY":
                return k.s(S.$y, 4, "0");
              case "M":
                return Z + 1;
              case "MM":
                return k.s(Z + 1, 2, "0");
              case "MMM":
                return ce(O.monthsShort, Z, G, 3);
              case "MMMM":
                return ce(G, Z);
              case "D":
                return S.$D;
              case "DD":
                return k.s(S.$D, 2, "0");
              case "d":
                return String(S.$W);
              case "dd":
                return ce(O.weekdaysMin, S.$W, q, 2);
              case "ddd":
                return ce(O.weekdaysShort, S.$W, q, 3);
              case "dddd":
                return q[S.$W];
              case "H":
                return String(M);
              case "HH":
                return k.s(M, 2, "0");
              case "h":
                return he(1);
              case "hh":
                return he(2);
              case "a":
                return Ee(M, j, !0);
              case "A":
                return Ee(M, j, !1);
              case "m":
                return String(j);
              case "mm":
                return k.s(j, 2, "0");
              case "s":
                return String(S.$s);
              case "ss":
                return k.s(S.$s, 2, "0");
              case "SSS":
                return k.s(S.$ms, 3, "0");
              case "Z":
                return P;
            }
            return null;
          }(z) || P.replace(":", "");
        });
      }, _.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, _.diff = function(T, S, O) {
        var R, P = this, M = k.p(S), j = F(T), Z = (j.utcOffset() - this.utcOffset()) * r, q = this - j, G = function() {
          return k.m(P, j);
        };
        switch (M) {
          case b:
            R = G() / 12;
            break;
          case d:
            R = G();
            break;
          case m:
            R = G() / 3;
            break;
          case f:
            R = (q - Z) / 6048e5;
            break;
          case u:
            R = (q - Z) / 864e5;
            break;
          case c:
            R = q / i;
            break;
          case s:
            R = q / r;
            break;
          case o:
            R = q / n;
            break;
          default:
            R = q;
        }
        return O ? R : k.a(R);
      }, _.daysInMonth = function() {
        return this.endOf(d).$D;
      }, _.$locale = function() {
        return x[this.$L];
      }, _.locale = function(T, S) {
        if (!T)
          return this.$L;
        var O = this.clone(), R = N(T, S, !0);
        return R && (O.$L = R), O;
      }, _.clone = function() {
        return k.w(this.$d, this);
      }, _.toDate = function() {
        return new Date(this.valueOf());
      }, _.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, _.toISOString = function() {
        return this.$d.toISOString();
      }, _.toString = function() {
        return this.$d.toUTCString();
      }, A;
    }(), I = D.prototype;
    return F.prototype = I, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", d], ["$y", b], ["$D", p]].forEach(function(A) {
      I[A[1]] = function(_) {
        return this.$g(_, A[0], A[1]);
      };
    }), F.extend = function(A, _) {
      return A.$i || (A(_, D, F), A.$i = !0), F;
    }, F.locale = N, F.isDayjs = $, F.unix = function(A) {
      return F(1e3 * A);
    }, F.en = x[E], F.Ls = x, F.p = {}, F;
  });
})(Xf);
var T3 = Xf.exports;
const ve = /* @__PURE__ */ ct(T3);
function R3(t, e) {
  var n;
  Ei && (yr(t) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof t)));
  var r = Va(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ie(function() {
    return p3(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, zs([], _t(o), !1));
    }, i, e);
  }, []);
  return Ci(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function M3(t, e, n) {
  var r = _t(K({}), 2), i = r[0], a = r[1], o = R3(function() {
    a({});
  }, n).run;
  X(function() {
    return o();
  }, e), Qs(t, [i]);
}
function I3() {
  this.__data__ = [], this.size = 0;
}
var L3 = I3, D3 = wi;
function V3(t, e) {
  for (var n = t.length; n--; )
    if (D3(t[n][0], e))
      return n;
  return -1;
}
var ja = V3, j3 = ja, B3 = Array.prototype, W3 = B3.splice;
function Z3(t) {
  var e = this.__data__, n = j3(e, t);
  if (n < 0)
    return !1;
  var r = e.length - 1;
  return n == r ? e.pop() : W3.call(e, n, 1), --this.size, !0;
}
var H3 = Z3, z3 = ja;
function U3(t) {
  var e = this.__data__, n = z3(e, t);
  return n < 0 ? void 0 : e[n][1];
}
var q3 = U3, K3 = ja;
function G3(t) {
  return K3(this.__data__, t) > -1;
}
var Y3 = G3, X3 = ja;
function Q3(t, e) {
  var n = this.__data__, r = X3(n, t);
  return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this;
}
var J3 = Q3, ep = L3, tp = H3, np = q3, rp = Y3, ip = J3;
function br(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
br.prototype.clear = ep;
br.prototype.delete = tp;
br.prototype.get = np;
br.prototype.has = rp;
br.prototype.set = ip;
var Ba = br, ap = Ba;
function op() {
  this.__data__ = new ap(), this.size = 0;
}
var sp = op;
function lp(t) {
  var e = this.__data__, n = e.delete(t);
  return this.size = e.size, n;
}
var cp = lp;
function up(t) {
  return this.__data__.get(t);
}
var fp = up;
function dp(t) {
  return this.__data__.has(t);
}
var mp = dp, hp = Vn, vp = gt, pp = hp(vp, "Map"), tl = pp, gp = Vn, yp = gp(Object, "create"), Wa = yp, gc = Wa;
function bp() {
  this.__data__ = gc ? gc(null) : {}, this.size = 0;
}
var wp = bp;
function Ep(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var Cp = Ep, xp = Wa, $p = "__lodash_hash_undefined__", _p = Object.prototype, kp = _p.hasOwnProperty;
function Op(t) {
  var e = this.__data__;
  if (xp) {
    var n = e[t];
    return n === $p ? void 0 : n;
  }
  return kp.call(e, t) ? e[t] : void 0;
}
var Sp = Op, Fp = Wa, Np = Object.prototype, Pp = Np.hasOwnProperty;
function Ap(t) {
  var e = this.__data__;
  return Fp ? e[t] !== void 0 : Pp.call(e, t);
}
var Tp = Ap, Rp = Wa, Mp = "__lodash_hash_undefined__";
function Ip(t, e) {
  var n = this.__data__;
  return this.size += this.has(t) ? 0 : 1, n[t] = Rp && e === void 0 ? Mp : e, this;
}
var Lp = Ip, Dp = wp, Vp = Cp, jp = Sp, Bp = Tp, Wp = Lp;
function wr(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
wr.prototype.clear = Dp;
wr.prototype.delete = Vp;
wr.prototype.get = jp;
wr.prototype.has = Bp;
wr.prototype.set = Wp;
var Zp = wr, yc = Zp, Hp = Ba, zp = tl;
function Up() {
  this.size = 0, this.__data__ = {
    hash: new yc(),
    map: new (zp || Hp)(),
    string: new yc()
  };
}
var qp = Up;
function Kp(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
var Gp = Kp, Yp = Gp;
function Xp(t, e) {
  var n = t.__data__;
  return Yp(e) ? n[typeof e == "string" ? "string" : "hash"] : n.map;
}
var Za = Xp, Qp = Za;
function Jp(t) {
  var e = Qp(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
var eg = Jp, tg = Za;
function ng(t) {
  return tg(this, t).get(t);
}
var rg = ng, ig = Za;
function ag(t) {
  return ig(this, t).has(t);
}
var og = ag, sg = Za;
function lg(t, e) {
  var n = sg(this, t), r = n.size;
  return n.set(t, e), this.size += n.size == r ? 0 : 1, this;
}
var cg = lg, ug = qp, fg = eg, dg = rg, mg = og, hg = cg;
function Er(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.clear(); ++e < n; ) {
    var r = t[e];
    this.set(r[0], r[1]);
  }
}
Er.prototype.clear = ug;
Er.prototype.delete = fg;
Er.prototype.get = dg;
Er.prototype.has = mg;
Er.prototype.set = hg;
var nl = Er, vg = Ba, pg = tl, gg = nl, yg = 200;
function bg(t, e) {
  var n = this.__data__;
  if (n instanceof vg) {
    var r = n.__data__;
    if (!pg || r.length < yg - 1)
      return r.push([t, e]), this.size = ++n.size, this;
    n = this.__data__ = new gg(r);
  }
  return n.set(t, e), this.size = n.size, this;
}
var wg = bg, Eg = Ba, Cg = sp, xg = cp, $g = fp, _g = mp, kg = wg;
function Cr(t) {
  var e = this.__data__ = new Eg(t);
  this.size = e.size;
}
Cr.prototype.clear = Cg;
Cr.prototype.delete = xg;
Cr.prototype.get = $g;
Cr.prototype.has = _g;
Cr.prototype.set = kg;
var Qf = Cr, Og = "__lodash_hash_undefined__";
function Sg(t) {
  return this.__data__.set(t, Og), this;
}
var Fg = Sg;
function Ng(t) {
  return this.__data__.has(t);
}
var Pg = Ng, Ag = nl, Tg = Fg, Rg = Pg;
function ha(t) {
  var e = -1, n = t == null ? 0 : t.length;
  for (this.__data__ = new Ag(); ++e < n; )
    this.add(t[e]);
}
ha.prototype.add = ha.prototype.push = Tg;
ha.prototype.has = Rg;
var Mg = ha;
function Ig(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length; ++n < r; )
    if (e(t[n], n, t))
      return !0;
  return !1;
}
var Lg = Ig;
function Dg(t, e) {
  return t.has(e);
}
var Vg = Dg, jg = Mg, Bg = Lg, Wg = Vg, Zg = 1, Hg = 2;
function zg(t, e, n, r, i, a) {
  var o = n & Zg, s = t.length, c = e.length;
  if (s != c && !(o && c > s))
    return !1;
  var u = a.get(t), f = a.get(e);
  if (u && f)
    return u == e && f == t;
  var d = -1, m = !0, b = n & Hg ? new jg() : void 0;
  for (a.set(t, e), a.set(e, t); ++d < s; ) {
    var p = t[d], v = e[d];
    if (r)
      var y = o ? r(v, p, d, e, t, a) : r(p, v, d, t, e, a);
    if (y !== void 0) {
      if (y)
        continue;
      m = !1;
      break;
    }
    if (b) {
      if (!Bg(e, function(g, C) {
        if (!Wg(b, C) && (p === g || i(p, g, n, r, a)))
          return b.push(C);
      })) {
        m = !1;
        break;
      }
    } else if (!(p === v || i(p, v, n, r, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(t), a.delete(e), m;
}
var Jf = zg, Ug = gt, qg = Ug.Uint8Array, ed = qg;
function Kg(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r, i) {
    n[++e] = [i, r];
  }), n;
}
var Gg = Kg;
function Yg(t) {
  var e = -1, n = Array(t.size);
  return t.forEach(function(r) {
    n[++e] = r;
  }), n;
}
var Xg = Yg, bc = Us, wc = ed, Qg = wi, Jg = Jf, e4 = Gg, t4 = Xg, n4 = 1, r4 = 2, i4 = "[object Boolean]", a4 = "[object Date]", o4 = "[object Error]", s4 = "[object Map]", l4 = "[object Number]", c4 = "[object RegExp]", u4 = "[object Set]", f4 = "[object String]", d4 = "[object Symbol]", m4 = "[object ArrayBuffer]", h4 = "[object DataView]", Ec = bc ? bc.prototype : void 0, _o = Ec ? Ec.valueOf : void 0;
function v4(t, e, n, r, i, a, o) {
  switch (n) {
    case h4:
      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
        return !1;
      t = t.buffer, e = e.buffer;
    case m4:
      return !(t.byteLength != e.byteLength || !a(new wc(t), new wc(e)));
    case i4:
    case a4:
    case l4:
      return Qg(+t, +e);
    case o4:
      return t.name == e.name && t.message == e.message;
    case c4:
    case f4:
      return t == e + "";
    case s4:
      var s = e4;
    case u4:
      var c = r & n4;
      if (s || (s = t4), t.size != e.size && !c)
        return !1;
      var u = o.get(t);
      if (u)
        return u == e;
      r |= r4, o.set(t, e);
      var f = Jg(s(t), s(e), r, i, a, o);
      return o.delete(t), f;
    case d4:
      if (_o)
        return _o.call(t) == _o.call(e);
  }
  return !1;
}
var p4 = v4;
function g4(t, e) {
  for (var n = -1, r = e.length, i = t.length; ++n < r; )
    t[i + n] = e[n];
  return t;
}
var y4 = g4, b4 = y4, w4 = Da;
function E4(t, e, n) {
  var r = e(t);
  return w4(t) ? r : b4(r, n(t));
}
var C4 = E4;
function x4(t, e) {
  for (var n = -1, r = t == null ? 0 : t.length, i = 0, a = []; ++n < r; ) {
    var o = t[n];
    e(o, n, t) && (a[i++] = o);
  }
  return a;
}
var $4 = x4;
function _4() {
  return [];
}
var k4 = _4, O4 = $4, S4 = k4, F4 = Object.prototype, N4 = F4.propertyIsEnumerable, Cc = Object.getOwnPropertySymbols, P4 = Cc ? function(t) {
  return t == null ? [] : (t = Object(t), O4(Cc(t), function(e) {
    return N4.call(t, e);
  }));
} : S4, A4 = P4, T4 = C4, R4 = A4, M4 = zf;
function I4(t) {
  return T4(t, M4, R4);
}
var L4 = I4, xc = L4, D4 = 1, V4 = Object.prototype, j4 = V4.hasOwnProperty;
function B4(t, e, n, r, i, a) {
  var o = n & D4, s = xc(t), c = s.length, u = xc(e), f = u.length;
  if (c != f && !o)
    return !1;
  for (var d = c; d--; ) {
    var m = s[d];
    if (!(o ? m in e : j4.call(e, m)))
      return !1;
  }
  var b = a.get(t), p = a.get(e);
  if (b && p)
    return b == e && p == t;
  var v = !0;
  a.set(t, e), a.set(e, t);
  for (var y = o; ++d < c; ) {
    m = s[d];
    var g = t[m], C = e[m];
    if (r)
      var h = o ? r(C, g, m, e, t, a) : r(g, C, m, t, e, a);
    if (!(h === void 0 ? g === C || i(g, C, n, r, a) : h)) {
      v = !1;
      break;
    }
    y || (y = m == "constructor");
  }
  if (v && !y) {
    var w = t.constructor, E = e.constructor;
    w != E && "constructor" in t && "constructor" in e && !(typeof w == "function" && w instanceof w && typeof E == "function" && E instanceof E) && (v = !1);
  }
  return a.delete(t), a.delete(e), v;
}
var W4 = B4, Z4 = Vn, H4 = gt, z4 = Z4(H4, "DataView"), U4 = z4, q4 = Vn, K4 = gt, G4 = q4(K4, "Promise"), Y4 = G4, X4 = Vn, Q4 = gt, J4 = X4(Q4, "Set"), e5 = J4, t5 = Vn, n5 = gt, r5 = t5(n5, "WeakMap"), i5 = r5, Xo = U4, Qo = tl, Jo = Y4, es = e5, ts = i5, td = gr, xr = Rf, $c = "[object Map]", a5 = "[object Object]", _c = "[object Promise]", kc = "[object Set]", Oc = "[object WeakMap]", Sc = "[object DataView]", o5 = xr(Xo), s5 = xr(Qo), l5 = xr(Jo), c5 = xr(es), u5 = xr(ts), _n = td;
(Xo && _n(new Xo(new ArrayBuffer(1))) != Sc || Qo && _n(new Qo()) != $c || Jo && _n(Jo.resolve()) != _c || es && _n(new es()) != kc || ts && _n(new ts()) != Oc) && (_n = function(t) {
  var e = td(t), n = e == a5 ? t.constructor : void 0, r = n ? xr(n) : "";
  if (r)
    switch (r) {
      case o5:
        return Sc;
      case s5:
        return $c;
      case l5:
        return _c;
      case c5:
        return kc;
      case u5:
        return Oc;
    }
  return e;
});
var f5 = _n, ko = Qf, d5 = Jf, m5 = p4, h5 = W4, Fc = f5, Nc = Da, Pc = Gs, v5 = Ys, p5 = 1, Ac = "[object Arguments]", Tc = "[object Array]", Vi = "[object Object]", g5 = Object.prototype, Rc = g5.hasOwnProperty;
function y5(t, e, n, r, i, a) {
  var o = Nc(t), s = Nc(e), c = o ? Tc : Fc(t), u = s ? Tc : Fc(e);
  c = c == Ac ? Vi : c, u = u == Ac ? Vi : u;
  var f = c == Vi, d = u == Vi, m = c == u;
  if (m && Pc(t)) {
    if (!Pc(e))
      return !1;
    o = !0, f = !1;
  }
  if (m && !f)
    return a || (a = new ko()), o || v5(t) ? d5(t, e, n, r, i, a) : m5(t, e, c, n, r, i, a);
  if (!(n & p5)) {
    var b = f && Rc.call(t, "__wrapped__"), p = d && Rc.call(e, "__wrapped__");
    if (b || p) {
      var v = b ? t.value() : t, y = p ? e.value() : e;
      return a || (a = new ko()), i(v, y, n, r, a);
    }
  }
  return m ? (a || (a = new ko()), h5(t, e, n, r, i, a)) : !1;
}
var b5 = y5, w5 = b5, Mc = jn;
function nd(t, e, n, r, i) {
  return t === e ? !0 : t == null || e == null || !Mc(t) && !Mc(e) ? t !== t && e !== e : w5(t, e, n, r, nd, i);
}
var E5 = nd, C5 = E5;
function x5(t, e) {
  return C5(t, e);
}
var $5 = x5;
const _5 = /* @__PURE__ */ ct($5);
function k5(t) {
  var e = _t(K(t), 2), n = e[0], r = e[1], i = V(n);
  i.current = n;
  var a = Ue(function() {
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
    for (var w = h, E = t(w); E; )
      w = E.ownerDocument, E = t(w);
    return w;
  }(window.document), n = [], r = null, i = null;
  function a(h) {
    this.time = h.time, this.target = h.target, this.rootBounds = p(h.rootBounds), this.boundingClientRect = p(h.boundingClientRect), this.intersectionRect = p(h.intersectionRect || b()), this.isIntersecting = !!h.intersectionRect;
    var w = this.boundingClientRect, E = w.width * w.height, x = this.intersectionRect, $ = x.width * x.height;
    E ? this.intersectionRatio = Number(($ / E).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(h, w) {
    var E = w || {};
    if (typeof h != "function")
      throw new Error("callback must be a function");
    if (E.root && E.root.nodeType != 1 && E.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = h, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(E.rootMargin), this.thresholds = this._initThresholds(E.threshold), this.root = E.root || null, this.rootMargin = this._rootMarginValues.map(function(x) {
      return x.value + x.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(h, w) {
      !h || !w ? i = b() : i = v(h, w), n.forEach(function(E) {
        E._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(h) {
    var w = this._observationTargets.some(function(E) {
      return E.element == h;
    });
    if (!w) {
      if (!(h && h.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: h, entry: null }), this._monitorIntersections(h.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(h) {
    this._observationTargets = this._observationTargets.filter(function(w) {
      return w.element != h;
    }), this._unmonitorIntersections(h.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var h = this._queuedEntries.slice();
    return this._queuedEntries = [], h;
  }, o.prototype._initThresholds = function(h) {
    var w = h || [0];
    return Array.isArray(w) || (w = [w]), w.sort().filter(function(E, x, $) {
      if (typeof E != "number" || isNaN(E) || E < 0 || E > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return E !== $[x - 1];
    });
  }, o.prototype._parseRootMargin = function(h) {
    var w = h || "0px", E = w.split(/\s+/).map(function(x) {
      var $ = /^(-?\d*\.?\d+)(px|%)$/.exec(x);
      if (!$)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat($[1]), unit: $[2] };
    });
    return E[1] = E[1] || E[0], E[2] = E[2] || E[0], E[3] = E[3] || E[1], E;
  }, o.prototype._monitorIntersections = function(h) {
    var w = h.defaultView;
    if (w && this._monitoringDocuments.indexOf(h) == -1) {
      var E = this._checkForIntersections, x = null, $ = null;
      this.POLL_INTERVAL ? x = w.setInterval(E, this.POLL_INTERVAL) : (u(w, "resize", E, !0), u(h, "scroll", E, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in w && ($ = new w.MutationObserver(E), $.observe(h, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(h), this._monitoringUnsubscribes.push(function() {
        var k = h.defaultView;
        k && (x && k.clearInterval(x), f(k, "resize", E, !0)), f(h, "scroll", E, !0), $ && $.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || e;
      if (h != N) {
        var F = t(h);
        F && this._monitorIntersections(F.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(h) {
    var w = this._monitoringDocuments.indexOf(h);
    if (w != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || e, x = this._observationTargets.some(function(F) {
        var k = F.element.ownerDocument;
        if (k == h)
          return !0;
        for (; k && k != E; ) {
          var D = t(k);
          if (k = D && D.ownerDocument, k == h)
            return !0;
        }
        return !1;
      });
      if (!x) {
        var $ = this._monitoringUnsubscribes[w];
        if (this._monitoringDocuments.splice(w, 1), this._monitoringUnsubscribes.splice(w, 1), $(), h != E) {
          var N = t(h);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var h = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var w = 0; w < h.length; w++)
      h[w]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var h = this._rootIsInDom(), w = h ? this._getRootRect() : b();
      this._observationTargets.forEach(function(E) {
        var x = E.element, $ = m(x), N = this._rootContainsTarget(x), F = E.entry, k = h && N && this._computeTargetAndRootIntersection(x, $, w), D = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (D = w) : D = b();
        var I = E.entry = new a({
          time: s(),
          target: x,
          boundingClientRect: $,
          rootBounds: D,
          intersectionRect: k
        });
        F ? h && N ? this._hasCrossedThreshold(F, I) && this._queuedEntries.push(I) : F && F.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(h, w, E) {
    if (window.getComputedStyle(h).display != "none") {
      for (var x = w, $ = g(h), N = !1; !N && $; ) {
        var F = null, k = $.nodeType == 1 ? window.getComputedStyle($) : {};
        if (k.display == "none")
          return null;
        if ($ == this.root || $.nodeType == /* DOCUMENT */
        9)
          if (N = !0, $ == this.root || $ == e)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? ($ = null, F = null, x = null) : F = i : F = E;
          else {
            var D = g($), I = D && m(D), A = D && this._computeTargetAndRootIntersection(D, I, E);
            I && A ? ($ = D, F = v(I, A)) : ($ = null, x = null);
          }
        else {
          var _ = $.ownerDocument;
          $ != _.body && $ != _.documentElement && k.overflow != "visible" && (F = m($));
        }
        if (F && (x = d(F, x)), !x)
          break;
        $ = $ && g($);
      }
      return x;
    }
  }, o.prototype._getRootRect = function() {
    var h;
    if (this.root && !C(this.root))
      h = m(this.root);
    else {
      var w = C(this.root) ? this.root : e, E = w.documentElement, x = w.body;
      h = {
        top: 0,
        left: 0,
        right: E.clientWidth || x.clientWidth,
        width: E.clientWidth || x.clientWidth,
        bottom: E.clientHeight || x.clientHeight,
        height: E.clientHeight || x.clientHeight
      };
    }
    return this._expandRectByRootMargin(h);
  }, o.prototype._expandRectByRootMargin = function(h) {
    var w = this._rootMarginValues.map(function(x, $) {
      return x.unit == "px" ? x.value : x.value * ($ % 2 ? h.width : h.height) / 100;
    }), E = {
      top: h.top - w[0],
      right: h.right + w[1],
      bottom: h.bottom + w[2],
      left: h.left - w[3]
    };
    return E.width = E.right - E.left, E.height = E.bottom - E.top, E;
  }, o.prototype._hasCrossedThreshold = function(h, w) {
    var E = h && h.isIntersecting ? h.intersectionRatio || 0 : -1, x = w.isIntersecting ? w.intersectionRatio || 0 : -1;
    if (E !== x)
      for (var $ = 0; $ < this.thresholds.length; $++) {
        var N = this.thresholds[$];
        if (N == E || N == x || N < E != N < x)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || y(e, this.root);
  }, o.prototype._rootContainsTarget = function(h) {
    var w = this.root && (this.root.ownerDocument || this.root) || e;
    return y(w, h) && (!this.root || w == h.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var h = n.indexOf(this);
    h != -1 && n.splice(h, 1);
  };
  function s() {
    return window.performance && performance.now && performance.now();
  }
  function c(h, w) {
    var E = null;
    return function() {
      E || (E = setTimeout(function() {
        h(), E = null;
      }, w));
    };
  }
  function u(h, w, E, x) {
    typeof h.addEventListener == "function" ? h.addEventListener(w, E, x || !1) : typeof h.attachEvent == "function" && h.attachEvent("on" + w, E);
  }
  function f(h, w, E, x) {
    typeof h.removeEventListener == "function" ? h.removeEventListener(w, E, x || !1) : typeof h.detachEvent == "function" && h.detachEvent("on" + w, E);
  }
  function d(h, w) {
    var E = Math.max(h.top, w.top), x = Math.min(h.bottom, w.bottom), $ = Math.max(h.left, w.left), N = Math.min(h.right, w.right), F = N - $, k = x - E;
    return F >= 0 && k >= 0 && {
      top: E,
      bottom: x,
      left: $,
      right: N,
      width: F,
      height: k
    } || null;
  }
  function m(h) {
    var w;
    try {
      w = h.getBoundingClientRect();
    } catch {
    }
    return w ? (w.width && w.height || (w = {
      top: w.top,
      right: w.right,
      bottom: w.bottom,
      left: w.left,
      width: w.right - w.left,
      height: w.bottom - w.top
    }), w) : b();
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
  function v(h, w) {
    var E = w.top - h.top, x = w.left - h.left;
    return {
      top: E,
      left: x,
      height: w.height,
      width: w.width,
      bottom: E + w.height,
      right: x + w.width
    };
  }
  function y(h, w) {
    for (var E = w; E; ) {
      if (E == h)
        return !0;
      E = g(E);
    }
    return !1;
  }
  function g(h) {
    var w = h.parentNode;
    return h.nodeType == /* DOCUMENT */
    9 && h != e ? t(h) : (w && w.assignedSlot && (w = w.assignedSlot.parentNode), w && w.nodeType == 11 && w.host ? w.host : w);
  }
  function C(h) {
    return h && h.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function O5(t, e) {
  var n = _t(K(), 2), r = n[0], i = n[1], a = _t(K(), 2), o = a[0], s = a[1];
  return el(function() {
    var c = an(t);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var b = am(f), p = b.next(); !p.done; p = b.next()) {
            var v = p.value;
            s(v.intersectionRatio), i(v.isIntersecting);
          }
        } catch (y) {
          d = {
            error: y
          };
        } finally {
          try {
            p && !p.done && (m = b.return) && m.call(b);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, fa(fa({}, e), {
        root: an(e == null ? void 0 : e.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [e == null ? void 0 : e.rootMargin, e == null ? void 0 : e.threshold], t), [r, o];
}
var S5 = Js ? Zs : X;
const Ne = S5;
function F5(t) {
  var e = this, n = V(!1);
  return Ue(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Se(e, void 0, void 0, function() {
      var a, o;
      return im(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, t.apply(void 0, zs([], _t(r), !1))];
          case 2:
            return a = s.sent(), n.current = !1, [2, a];
          case 3:
            throw o = s.sent(), n.current = !1, o;
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
function N5(t) {
  var e = V(0), n = _t(K(t), 2), r = n[0], i = n[1], a = Ue(function(o) {
    cancelAnimationFrame(e.current), e.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return Ci(function() {
    cancelAnimationFrame(e.current);
  }), [r, a];
}
var P5 = Hf, A5 = P5(Object.getPrototypeOf, Object), rd = A5, T5 = gr, R5 = rd, M5 = jn, I5 = "[object Object]", L5 = Function.prototype, D5 = Object.prototype, id = L5.toString, V5 = D5.hasOwnProperty, j5 = id.call(Object);
function B5(t) {
  if (!M5(t) || T5(t) != I5)
    return !1;
  var e = R5(t);
  if (e === null)
    return !0;
  var n = V5.call(e, "constructor") && e.constructor;
  return typeof n == "function" && n instanceof n && id.call(n) == j5;
}
var W5 = B5, Z5 = function() {
  var t = V(!1);
  return X(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []), t;
};
const rl = Z5;
var ad = function() {
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
}(), ns = typeof window < "u" && typeof document < "u" && window.document === document, va = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), H5 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(va) : function(t) {
    return setTimeout(function() {
      return t(Date.now());
    }, 1e3 / 60);
  };
}(), z5 = 2;
function U5(t, e) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, t()), r && s();
  }
  function o() {
    H5(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < z5)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, e);
    i = c;
  }
  return s;
}
var q5 = 20, K5 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], G5 = typeof MutationObserver < "u", Y5 = (
  /** @class */
  function() {
    function t() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = U5(this.refresh.bind(this), q5);
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
      !ns || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), G5 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, t.prototype.disconnect_ = function() {
      !ns || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, t.prototype.onTransitionEnd_ = function(e) {
      var n = e.propertyName, r = n === void 0 ? "" : n, i = K5.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, t.getInstance = function() {
      return this.instance_ || (this.instance_ = new t()), this.instance_;
    }, t.instance_ = null, t;
  }()
), od = function(t, e) {
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
}, sr = function(t) {
  var e = t && t.ownerDocument && t.ownerDocument.defaultView;
  return e || va;
}, sd = Ha(0, 0, 0, 0);
function pa(t) {
  return parseFloat(t) || 0;
}
function Ic(t) {
  for (var e = [], n = 1; n < arguments.length; n++)
    e[n - 1] = arguments[n];
  return e.reduce(function(r, i) {
    var a = t["border-" + i + "-width"];
    return r + pa(a);
  }, 0);
}
function X5(t) {
  for (var e = ["top", "right", "bottom", "left"], n = {}, r = 0, i = e; r < i.length; r++) {
    var a = i[r], o = t["padding-" + a];
    n[a] = pa(o);
  }
  return n;
}
function Q5(t) {
  var e = t.getBBox();
  return Ha(0, 0, e.width, e.height);
}
function J5(t) {
  var e = t.clientWidth, n = t.clientHeight;
  if (!e && !n)
    return sd;
  var r = sr(t).getComputedStyle(t), i = X5(r), a = i.left + i.right, o = i.top + i.bottom, s = pa(r.width), c = pa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== e && (s -= Ic(r, "left", "right") + a), Math.round(c + o) !== n && (c -= Ic(r, "top", "bottom") + o)), !t6(t)) {
    var u = Math.round(s + a) - e, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return Ha(i.left, i.top, s, c);
}
var e6 = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(t) {
    return t instanceof sr(t).SVGGraphicsElement;
  } : function(t) {
    return t instanceof sr(t).SVGElement && typeof t.getBBox == "function";
  };
}();
function t6(t) {
  return t === sr(t).document.documentElement;
}
function n6(t) {
  return ns ? e6(t) ? Q5(t) : J5(t) : sd;
}
function r6(t) {
  var e = t.x, n = t.y, r = t.width, i = t.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return od(o, {
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
function Ha(t, e, n, r) {
  return { x: t, y: e, width: n, height: r };
}
var i6 = (
  /** @class */
  function() {
    function t(e) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Ha(0, 0, 0, 0), this.target = e;
    }
    return t.prototype.isActive = function() {
      var e = n6(this.target);
      return this.contentRect_ = e, e.width !== this.broadcastWidth || e.height !== this.broadcastHeight;
    }, t.prototype.broadcastRect = function() {
      var e = this.contentRect_;
      return this.broadcastWidth = e.width, this.broadcastHeight = e.height, e;
    }, t;
  }()
), a6 = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e, n) {
      var r = r6(n);
      od(this, { target: e, contentRect: r });
    }
    return t;
  }()
), o6 = (
  /** @class */
  function() {
    function t(e, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new ad(), typeof e != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = e, this.controller_ = n, this.callbackCtx_ = r;
    }
    return t.prototype.observe = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof sr(e).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(e) || (n.set(e, new i6(e)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, t.prototype.unobserve = function(e) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(e instanceof sr(e).Element))
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
          return new a6(r.target, r.broadcastRect());
        });
        this.callback_.call(e, n, e), this.clearActive();
      }
    }, t.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, t.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, t;
  }()
), ld = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new ad(), cd = (
  /** @class */
  /* @__PURE__ */ function() {
    function t(e) {
      if (!(this instanceof t))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = Y5.getInstance(), r = new o6(e, n, this);
      ld.set(this, r);
    }
    return t;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(t) {
  cd.prototype[t] = function() {
    var e;
    return (e = ld.get(this))[t].apply(e, arguments);
  };
});
var s6 = function() {
  return typeof va.ResizeObserver < "u" ? va.ResizeObserver : cd;
}(), l6 = Gf(Zs);
const c6 = l6;
var u6 = Js ? c6 : el;
const f6 = u6;
function rs(t) {
  var e = _t(N5(function() {
    var i = an(t);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = e[0], r = e[1];
  return f6(function() {
    var i = an(t);
    if (i) {
      var a = new s6(function(o) {
        o.forEach(function(s) {
          var c = s.target, u = c.clientWidth, f = c.clientHeight;
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
function za(t, e) {
  var n;
  Ei && (yr(t) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof t)));
  var r = Va(t), i = (n = e == null ? void 0 : e.wait) !== null && n !== void 0 ? n : 1e3, a = ie(function() {
    return x3(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, zs([], _t(o), !1));
    }, i, e);
  }, []);
  return Ci(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var d6 = function(t, e) {
  var n = Zt(t), r = V(null), i = Ue(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return X(function() {
    if (!(!Vv(e) || e < 0))
      return r.current = setTimeout(n, e), i;
  }, [e]), i;
};
const m6 = d6, Lc = 10;
function h6(t, e) {
  return t > e && t > Lc ? "horizontal" : e > t && e > Lc ? "vertical" : "";
}
function v6() {
  const t = V(0), e = V(0), n = V(0), r = V(0), i = V(0), a = V(0), o = V(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const b = m.touches[0];
      n.current = b.clientX < 0 ? 0 : b.clientX - t.current, r.current = b.clientY - e.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = h6(i.current, a.current));
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
    isVertical: s,
    isHorizontal: c
  };
}
const p6 = vr ? window : void 0, g6 = ["scroll", "auto", "overlay"];
function y6(t) {
  return t.nodeType === 1;
}
function ga(t, e = p6) {
  let n = t;
  for (; n && n !== e && y6(n); ) {
    if (n === document.body)
      return e;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (g6.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return e;
}
let Tn = !1;
if (vr)
  try {
    const t = {};
    Object.defineProperty(t, "passive", {
      get() {
        Tn = !0;
      }
    }), window.addEventListener("test-passive", null, t);
  } catch {
  }
let Rr = 0;
const Dc = "adm-overflow-hidden";
function b6(t) {
  let e = t == null ? void 0 : t.parentElement;
  for (; e; ) {
    if (e.clientHeight < e.scrollHeight)
      return e;
    e = e.parentElement;
  }
  return null;
}
function Ua(t, e) {
  const n = v6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = ga(o.target, t.current);
    if (!c)
      return;
    if (e === "strict") {
      const p = b6(o.target);
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
    d === 0 ? b = f >= u ? "00" : "01" : u <= Math.round(m + d) && (b = "10"), b !== "11" && n.isVertical() && !(parseInt(b, 2) & parseInt(s, 2)) && o.cancelable && Tn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Tn ? {
      passive: !1
    } : !1), Rr || document.body.classList.add(Dc), Rr++;
  }, a = () => {
    Rr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Rr--, Rr || document.body.classList.remove(Dc));
  };
  X(() => {
    if (e)
      return i(), () => {
        a();
      };
  }, [e]);
}
let il = $i();
const Q = (t) => xi(t, il);
let al = $i();
Q.write = (t) => xi(t, al);
let qa = $i();
Q.onStart = (t) => xi(t, qa);
let ol = $i();
Q.onFrame = (t) => xi(t, ol);
let sl = $i();
Q.onFinish = (t) => xi(t, sl);
let rr = [];
Q.setTimeout = (t, e) => {
  let n = Q.now() + e, r = () => {
    let a = rr.findIndex((o) => o.cancel == r);
    ~a && rr.splice(a, 1), tn -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: t,
    cancel: r
  };
  return rr.splice(ud(n), 0, i), tn += 1, fd(), i;
};
let ud = (t) => ~(~rr.findIndex((e) => e.time > t) || ~rr.length);
Q.cancel = (t) => {
  qa.delete(t), ol.delete(t), sl.delete(t), il.delete(t), al.delete(t);
};
Q.sync = (t) => {
  is = !0, Q.batchedUpdates(t), is = !1;
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
    qa.delete(n), e = null;
  }, r;
};
let ll = typeof window < "u" ? window.requestAnimationFrame : () => {
};
Q.use = (t) => ll = t;
Q.now = typeof performance < "u" ? () => performance.now() : Date.now;
Q.batchedUpdates = (t) => t();
Q.catch = console.error;
Q.frameLoop = "always";
Q.advance = () => {
  Q.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : md();
};
let en = -1, tn = 0, is = !1;
function xi(t, e) {
  is ? (e.delete(t), t(0)) : (e.add(t), fd());
}
function fd() {
  en < 0 && (en = 0, Q.frameLoop !== "demand" && ll(dd));
}
function w6() {
  en = -1;
}
function dd() {
  ~en && (ll(dd), Q.batchedUpdates(md));
}
function md() {
  let t = en;
  en = Q.now();
  let e = ud(en);
  if (e && (hd(rr.splice(0, e), (n) => n.handler()), tn -= e), !tn) {
    w6();
    return;
  }
  qa.flush(), il.flush(t ? Math.min(64, en - t) : 16.667), ol.flush(), al.flush(), sl.flush();
}
function $i() {
  let t = /* @__PURE__ */ new Set(), e = t;
  return {
    add(n) {
      tn += e == t && !t.has(n) ? 1 : 0, t.add(n);
    },
    delete(n) {
      return tn -= e == t && t.has(n) ? 1 : 0, t.delete(n);
    },
    flush(n) {
      e.size && (t = /* @__PURE__ */ new Set(), tn -= e.size, hd(e, (r) => r(n) && t.add(r)), tn += t.size, e = t);
    }
  };
}
function hd(t, e) {
  t.forEach((n) => {
    try {
      e(n);
    } catch (r) {
      Q.catch(r);
    }
  });
}
function as() {
}
const E6 = (t, e, n) => Object.defineProperty(t, e, {
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
const Xe = (t) => H.und(t) ? [] : H.arr(t) ? t : [t];
function Jr(t, e) {
  if (t.size) {
    const n = Array.from(t);
    t.clear(), re(n, e);
  }
}
const Yr = (t, ...e) => Jr(t, (n) => n(...e)), cl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let ul, vd, rn = null, pd = !1, fl = as;
const C6 = (t) => {
  t.to && (vd = t.to), t.now && (Q.now = t.now), t.colors !== void 0 && (rn = t.colors), t.skipAnimation != null && (pd = t.skipAnimation), t.createStringInterpolator && (ul = t.createStringInterpolator), t.requestAnimationFrame && Q.use(t.requestAnimationFrame), t.batchedUpdates && (Q.batchedUpdates = t.batchedUpdates), t.willAdvance && (fl = t.willAdvance), t.frameLoop && (Q.frameLoop = t.frameLoop);
};
var st = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return ul;
  },
  get to() {
    return vd;
  },
  get colors() {
    return rn;
  },
  get skipAnimation() {
    return pd;
  },
  get willAdvance() {
    return fl;
  },
  assign: C6
});
const ei = /* @__PURE__ */ new Set();
let at = [], Oo = [], ya = 0;
const Ka = {
  get idle() {
    return !ei.size && !at.length;
  },
  start(t) {
    ya > t.priority ? (ei.add(t), Q.onStart(x6)) : (gd(t), Q(os));
  },
  advance: os,
  sort(t) {
    if (ya)
      Q.onFrame(() => Ka.sort(t));
    else {
      const e = at.indexOf(t);
      ~e && (at.splice(e, 1), yd(t));
    }
  },
  clear() {
    at = [], ei.clear();
  }
};
function x6() {
  ei.forEach(gd), ei.clear(), Q(os);
}
function gd(t) {
  at.includes(t) || yd(t);
}
function yd(t) {
  at.splice($6(at, (e) => e.priority > t.priority), 0, t);
}
function os(t) {
  const e = Oo;
  for (let n = 0; n < at.length; n++) {
    const r = at[n];
    ya = r.priority, r.idle || (fl(r), r.advance(t), r.idle || e.push(r));
  }
  return ya = 0, Oo = at, Oo.length = 0, at = e, at.length > 0;
}
function $6(t, e) {
  const n = t.findIndex(e);
  return n < 0 ? t.length : n;
}
const _6 = (t, e, n) => Math.min(Math.max(n, t), e), k6 = {
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
}, vt = "[-+]?\\d*\\.?\\d+", ba = vt + "%";
function Ga(...t) {
  return "\\(\\s*(" + t.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const O6 = new RegExp("rgb" + Ga(vt, vt, vt)), S6 = new RegExp("rgba" + Ga(vt, vt, vt, vt)), F6 = new RegExp("hsl" + Ga(vt, ba, ba)), N6 = new RegExp("hsla" + Ga(vt, ba, ba, vt)), P6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, A6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, T6 = /^#([0-9a-fA-F]{6})$/, R6 = /^#([0-9a-fA-F]{8})$/;
function M6(t) {
  let e;
  return typeof t == "number" ? t >>> 0 === t && t >= 0 && t <= 4294967295 ? t : null : (e = T6.exec(t)) ? parseInt(e[1] + "ff", 16) >>> 0 : rn && rn[t] !== void 0 ? rn[t] : (e = O6.exec(t)) ? (Wn(e[1]) << 24 | Wn(e[2]) << 16 | Wn(e[3]) << 8 | 255) >>> 0 : (e = S6.exec(t)) ? (Wn(e[1]) << 24 | Wn(e[2]) << 16 | Wn(e[3]) << 8 | Bc(e[4])) >>> 0 : (e = P6.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + "ff", 16) >>> 0 : (e = R6.exec(t)) ? parseInt(e[1], 16) >>> 0 : (e = A6.exec(t)) ? parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3] + e[4] + e[4], 16) >>> 0 : (e = F6.exec(t)) ? (Vc(jc(e[1]), ji(e[2]), ji(e[3])) | 255) >>> 0 : (e = N6.exec(t)) ? (Vc(jc(e[1]), ji(e[2]), ji(e[3])) | Bc(e[4])) >>> 0 : null;
}
function So(t, e, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + (e - t) * 6 * n : n < 1 / 2 ? e : n < 2 / 3 ? t + (e - t) * (2 / 3 - n) * 6 : t;
}
function Vc(t, e, n) {
  const r = n < 0.5 ? n * (1 + e) : n + e - n * e, i = 2 * n - r, a = So(i, r, t + 1 / 3), o = So(i, r, t), s = So(i, r, t - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(s * 255) << 8;
}
function Wn(t) {
  const e = parseInt(t, 10);
  return e < 0 ? 0 : e > 255 ? 255 : e;
}
function jc(t) {
  return (parseFloat(t) % 360 + 360) % 360 / 360;
}
function Bc(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 1 ? 255 : Math.round(e * 255);
}
function ji(t) {
  const e = parseFloat(t);
  return e < 0 ? 0 : e > 100 ? 1 : e / 100;
}
function Wc(t) {
  let e = M6(t);
  if (e === null)
    return t;
  e = e || 0;
  let n = (e & 4278190080) >>> 24, r = (e & 16711680) >>> 16, i = (e & 65280) >>> 8, a = (e & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const oi = (t, e, n) => {
  if (H.fun(t))
    return t;
  if (H.arr(t))
    return oi({
      range: t,
      output: e,
      extrapolate: n
    });
  if (H.str(t.output[0]))
    return ul(t);
  const r = t, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = L6(u, a);
    return I6(u, a[f], a[f + 1], i[f], i[f + 1], c, o, s, r.map);
  };
};
function I6(t, e, n, r, i, a, o, s, c) {
  let u = c ? c(t) : t;
  if (u < e) {
    if (o === "identity")
      return u;
    o === "clamp" && (u = e);
  }
  if (u > n) {
    if (s === "identity")
      return u;
    s === "clamp" && (u = n);
  }
  return r === i ? r : e === n ? t <= e ? r : i : (e === -1 / 0 ? u = -u : n === 1 / 0 ? u = u - e : u = (u - e) / (n - e), u = a(u), r === -1 / 0 ? u = -u : i === 1 / 0 ? u = u + r : u = u * (i - r) + r, u);
}
function L6(t, e) {
  for (var n = 1; n < e.length - 1 && !(e[n] >= t); ++n)
    ;
  return n - 1;
}
const D6 = (t, e = "end") => (n) => {
  n = e === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * t, i = e === "end" ? Math.floor(r) : Math.ceil(r);
  return _6(0, 1, i / t);
}, wa = 1.70158, Bi = wa * 1.525, Zc = wa + 1, Hc = 2 * Math.PI / 3, zc = 2 * Math.PI / 4.5, Wi = (t) => t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375 : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375, V6 = {
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
  easeInBack: (t) => Zc * t * t * t - wa * t * t,
  easeOutBack: (t) => 1 + Zc * Math.pow(t - 1, 3) + wa * Math.pow(t - 1, 2),
  easeInOutBack: (t) => t < 0.5 ? Math.pow(2 * t, 2) * ((Bi + 1) * 2 * t - Bi) / 2 : (Math.pow(2 * t - 2, 2) * ((Bi + 1) * (t * 2 - 2) + Bi) + 2) / 2,
  easeInElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * Hc),
  easeOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * Hc) + 1,
  easeInOutElastic: (t) => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * zc)) / 2 : Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * zc) / 2 + 1,
  easeInBounce: (t) => 1 - Wi(1 - t),
  easeOutBounce: Wi,
  easeInOutBounce: (t) => t < 0.5 ? (1 - Wi(1 - 2 * t)) / 2 : (1 + Wi(2 * t - 1)) / 2,
  steps: D6
};
function ss() {
  return ss = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, ss.apply(this, arguments);
}
const lr = Symbol.for("FluidValue.get"), Rn = Symbol.for("FluidValue.observers"), rt = (t) => !!(t && t[lr]), He = (t) => t && t[lr] ? t[lr]() : t, Uc = (t) => t[Rn] || null;
function j6(t, e) {
  t.eventObserved ? t.eventObserved(e) : t(e);
}
function si(t, e) {
  let n = t[Rn];
  n && n.forEach((r) => {
    j6(r, e);
  });
}
class bd {
  constructor(e) {
    if (this[lr] = void 0, this[Rn] = void 0, !e && !(e = this.get))
      throw Error("Unknown getter");
    B6(this, e);
  }
}
const B6 = (t, e) => wd(t, lr, e);
function $r(t, e) {
  if (t[lr]) {
    let n = t[Rn];
    n || wd(t, Rn, n = /* @__PURE__ */ new Set()), n.has(e) || (n.add(e), t.observerAdded && t.observerAdded(n.size, e));
  }
  return e;
}
function li(t, e) {
  let n = t[Rn];
  if (n && n.has(e)) {
    const r = n.size - 1;
    r ? n.delete(e) : t[Rn] = null, t.observerRemoved && t.observerRemoved(r, e);
  }
}
const wd = (t, e, n) => Object.defineProperty(t, e, {
  value: n,
  writable: !0,
  configurable: !0
}), ia = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, W6 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, qc = new RegExp(`(${ia.source})(%|[a-z]+)`, "i"), Z6 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ya = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Ed = (t) => {
  const [e, n] = H6(t);
  if (!e || cl())
    return t;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(e);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || t;
  } else {
    if (n && Ya.test(n))
      return Ed(n);
    if (n)
      return n;
  }
  return t;
}, H6 = (t) => {
  const e = Ya.exec(t);
  if (!e)
    return [,];
  const [, n, r] = e;
  return [n, r];
};
let Fo;
const z6 = (t, e, n, r, i) => `rgba(${Math.round(e)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Cd = (t) => {
  Fo || (Fo = rn ? new RegExp(`(${Object.keys(rn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const e = t.output.map((a) => He(a).replace(Ya, Ed).replace(W6, Wc).replace(Fo, Wc)), n = e.map((a) => a.match(ia).map(Number)), i = n[0].map((a, o) => n.map((s) => {
    if (!(o in s))
      throw Error('The arity of each "output" value must be equal');
    return s[o];
  })).map((a) => oi(ss({}, t, {
    output: a
  })));
  return (a) => {
    var o;
    const s = !qc.test(e[0]) && ((o = e.find((u) => qc.test(u))) == null ? void 0 : o.replace(ia, ""));
    let c = 0;
    return e[0].replace(ia, () => `${i[c++](a)}${s || ""}`).replace(Z6, z6);
  };
}, dl = "react-spring: ", xd = (t) => {
  const e = t;
  let n = !1;
  if (typeof e != "function")
    throw new TypeError(`${dl}once requires a function parameter`);
  return (...r) => {
    n || (e(...r), n = !0);
  };
}, U6 = xd(console.warn);
function q6() {
  U6(`${dl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const K6 = xd(console.warn);
function G6() {
  K6(`${dl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Xa(t) {
  return H.str(t) && (t[0] == "#" || /\d/.test(t) || !cl() && Ya.test(t) || t in (rn || {}));
}
const ml = cl() ? X : Zs, Y6 = () => {
  const t = V(!1);
  return ml(() => (t.current = !0, () => {
    t.current = !1;
  }), []), t;
};
function $d() {
  const t = K()[1], e = Y6();
  return () => {
    e.current && t(Math.random());
  };
}
function X6(t, e) {
  const [n] = K(() => ({
    inputs: e,
    result: t()
  })), r = V(), i = r.current;
  let a = i;
  return a ? e && a.inputs && Q6(e, a.inputs) || (a = {
    inputs: e,
    result: t()
  }) : a = n, X(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function Q6(t, e) {
  if (t.length !== e.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (t[n] !== e[n])
      return !1;
  return !0;
}
const _d = (t) => X(t, J6), J6 = [];
function Kc(t) {
  const e = V();
  return X(() => {
    e.current = t;
  }), e.current;
}
const ci = Symbol.for("Animated:node"), e7 = (t) => !!t && t[ci] === t, xt = (t) => t && t[ci], hl = (t, e) => E6(t, ci, e), Qa = (t) => t && t[ci] && t[ci].getPayload();
class kd {
  constructor() {
    this.payload = void 0, hl(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class _r extends kd {
  constructor(e) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = e, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(e) {
    return new _r(e);
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
class cr extends _r {
  constructor(e) {
    super(0), this._string = null, this._toString = void 0, this._toString = oi({
      output: [e, e]
    });
  }
  static create(e) {
    return new cr(e);
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
    e && (this._toString = oi({
      output: [this.getValue(), e]
    })), this._value = 0, super.reset();
  }
}
const Ea = {
  dependencies: null
};
class Ja extends kd {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const n = {};
    return kt(this.source, (r, i) => {
      e7(r) ? n[i] = r.getValue(e) : rt(r) ? n[i] = He(r) : e || (n[i] = r);
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
    Ea.dependencies && rt(e) && Ea.dependencies.add(e);
    const n = Qa(e);
    n && re(n, (r) => this.add(r));
  }
}
class vl extends Ja {
  constructor(e) {
    super(e);
  }
  static create(e) {
    return new vl(e);
  }
  getValue() {
    return this.source.map((e) => e.getValue());
  }
  setValue(e) {
    const n = this.getPayload();
    return e.length == n.length ? n.map((r, i) => r.setValue(e[i])).some(Boolean) : (super.setValue(e.map(t7)), !0);
  }
}
function t7(t) {
  return (Xa(t) ? cr : _r).create(t);
}
function ls(t) {
  const e = xt(t);
  return e ? e.constructor : H.arr(t) ? vl : Xa(t) ? cr : _r;
}
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ca.apply(this, arguments);
}
const Gc = (t, e) => {
  const n = !H.fun(t) || t.prototype && t.prototype.isReactComponent;
  return me((r, i) => {
    const a = V(null), o = n && Ue((p) => {
      a.current = i7(i, p);
    }, [i]), [s, c] = r7(r, e), u = $d(), f = () => {
      const p = a.current;
      if (n && !p)
        return;
      (p ? e.applyAnimatedValues(p, s.getValue(!0)) : !1) === !1 && u();
    }, d = new n7(f, c), m = V();
    ml(() => (m.current = d, re(c, (p) => $r(p, d)), () => {
      m.current && (re(m.current.deps, (p) => li(p, m.current)), Q.cancel(m.current.update));
    })), X(f, []), _d(() => () => {
      const p = m.current;
      re(p.deps, (v) => li(v, p));
    });
    const b = e.getComponentProps(s.getValue());
    return L.createElement(t, Ca({}, b, {
      ref: o
    }));
  });
};
class n7 {
  constructor(e, n) {
    this.update = e, this.deps = n;
  }
  eventObserved(e) {
    e.type == "change" && Q.write(this.update);
  }
}
function r7(t, e) {
  const n = /* @__PURE__ */ new Set();
  return Ea.dependencies = n, t.style && (t = Ca({}, t, {
    style: e.createAnimatedStyle(t.style)
  })), t = new Ja(t), Ea.dependencies = null, [t, n];
}
function i7(t, e) {
  return t && (H.fun(t) ? t(e) : t.current = e), e;
}
const Yc = Symbol.for("AnimatedComponent"), a7 = (t, {
  applyAnimatedValues: e = () => !1,
  createAnimatedStyle: n = (i) => new Ja(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: e,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const s = Xc(o) || "Anonymous";
    return H.str(o) ? o = a[o] || (a[o] = Gc(o, i)) : o = o[Yc] || (o[Yc] = Gc(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return kt(t, (o, s) => {
    H.arr(t) && (s = Xc(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, Xc = (t) => H.str(t) ? t : t && H.str(t.displayName) ? t.displayName : H.fun(t) && t.name || null;
function Ae() {
  return Ae = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ae.apply(this, arguments);
}
function kn(t, ...e) {
  return H.fun(t) ? t(...e) : t;
}
const ti = (t, e) => t === !0 || !!(e && t && (H.fun(t) ? t(e) : Xe(t).includes(e))), Od = (t, e) => H.obj(t) ? e && t[e] : t, Sd = (t, e) => t.default === !0 ? t[e] : t.default ? t.default[e] : void 0, o7 = (t) => t, pl = (t, e = o7) => {
  let n = s7;
  t.default && t.default !== !0 && (t = t.default, n = Object.keys(t));
  const r = {};
  for (const i of n) {
    const a = e(t[i], i);
    H.und(a) || (r[i] = a);
  }
  return r;
}, s7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], l7 = {
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
function c7(t) {
  const e = {};
  let n = 0;
  if (kt(t, (r, i) => {
    l7[i] || (e[i] = r, n++);
  }), n)
    return e;
}
function Fd(t) {
  const e = c7(t);
  if (e) {
    const n = {
      to: e
    };
    return kt(t, (r, i) => i in e || (n[i] = r)), n;
  }
  return Ae({}, t);
}
function ui(t) {
  return t = He(t), H.arr(t) ? t.map(ui) : Xa(t) ? st.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function u7(t) {
  for (const e in t)
    return !0;
  return !1;
}
function cs(t) {
  return H.fun(t) || H.arr(t) && H.obj(t[0]);
}
function f7(t, e) {
  var n;
  (n = t.ref) == null || n.delete(t), e == null || e.delete(t);
}
function d7(t, e) {
  if (e && t.ref !== e) {
    var n;
    (n = t.ref) == null || n.delete(t), e.add(t), t.ref = e;
  }
}
const m7 = {
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
}, us = Ae({}, m7.default, {
  mass: 1,
  damping: 1,
  easing: V6.linear,
  clamp: !1
});
class h7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, us);
  }
}
function v7(t, e, n) {
  n && (n = Ae({}, n), Qc(n, e), e = Ae({}, n, e)), Qc(t, e), Object.assign(t, e);
  for (const o in us)
    t[o] == null && (t[o] = us[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = t;
  return H.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), t.tension = Math.pow(2 * Math.PI / i, 2) * r, t.friction = 4 * Math.PI * a * r / i), t;
}
function Qc(t, e) {
  if (!H.und(e.decay))
    t.duration = void 0;
  else {
    const n = !H.und(e.tension) || !H.und(e.friction);
    (n || !H.und(e.frequency) || !H.und(e.damping) || !H.und(e.mass)) && (t.duration = void 0, t.decay = void 0), n && (t.frequency = void 0);
  }
}
const Jc = [];
class p7 {
  constructor() {
    this.changed = !1, this.values = Jc, this.toValues = null, this.fromValues = Jc, this.to = void 0, this.from = void 0, this.config = new h7(), this.immediate = !1;
  }
}
function Nd(t, {
  key: e,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, s) => {
    var c;
    let u, f, d = ti((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, e);
    if (d)
      p();
    else {
      H.und(n.pause) || (i.paused = ti(n.pause, e));
      let v = r == null ? void 0 : r.pause;
      v !== !0 && (v = i.paused || ti(v, e)), u = kn(n.delay || 0, e), v ? (i.resumeQueue.add(b), a.pause()) : (a.resume(), b());
    }
    function m() {
      i.resumeQueue.add(b), i.timeouts.delete(f), f.cancel(), u = f.time - Q.now();
    }
    function b() {
      u > 0 && !st.skipAnimation ? (i.delayed = !0, f = Q.setTimeout(p, u), i.pauseQueue.add(m), i.timeouts.add(f)) : p();
    }
    function p() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), t <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Ae({}, n, {
          callId: t,
          cancel: d
        }), o);
      } catch (v) {
        s(v);
      }
    }
  });
}
const gl = (t, e) => e.length == 1 ? e[0] : e.some((n) => n.cancelled) ? ir(t.get()) : e.every((n) => n.noop) ? Pd(t.get()) : mt(t.get(), e.every((n) => n.finished)), Pd = (t) => ({
  value: t,
  noop: !0,
  finished: !0,
  cancelled: !1
}), mt = (t, e, n = !1) => ({
  value: t,
  finished: e,
  cancelled: n
}), ir = (t) => ({
  value: t,
  cancelled: !0,
  finished: !1
});
function Ad(t, e, n, r) {
  const {
    callId: i,
    parentId: a,
    onRest: o
  } = e, {
    asyncTo: s,
    promise: c
  } = n;
  return !a && t === s && !e.reset ? c : n.promise = (async () => {
    n.asyncId = i, n.asyncTo = t;
    const u = pl(e, (y, g) => g === "onRest" ? void 0 : y);
    let f, d;
    const m = new Promise((y, g) => (f = y, d = g)), b = (y) => {
      const g = i <= (n.cancelId || 0) && ir(r) || i !== n.asyncId && mt(r, !1);
      if (g)
        throw y.result = g, d(y), y;
    }, p = (y, g) => {
      const C = new eu(), h = new tu();
      return (async () => {
        if (st.skipAnimation)
          throw fi(n), h.result = mt(r, !1), d(h), h;
        b(C);
        const w = H.obj(y) ? Ae({}, y) : Ae({}, g, {
          to: y
        });
        w.parentId = i, kt(u, (x, $) => {
          H.und(w[$]) && (w[$] = x);
        });
        const E = await r.start(w);
        return b(C), n.paused && await new Promise((x) => {
          n.resumeQueue.add(x);
        }), E;
      })();
    };
    let v;
    if (st.skipAnimation)
      return fi(n), mt(r, !1);
    try {
      let y;
      H.arr(t) ? y = (async (g) => {
        for (const C of g)
          await p(C);
      })(t) : y = Promise.resolve(t(p, r.stop.bind(r))), await Promise.all([y.then(f), m]), v = mt(r.get(), !0, !1);
    } catch (y) {
      if (y instanceof eu)
        v = y.result;
      else if (y instanceof tu)
        v = y.result;
      else
        throw y;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? s : void 0, n.promise = a ? c : void 0);
    }
    return H.fun(o) && Q.batchedUpdates(() => {
      o(v, r, r.item);
    }), v;
  })();
}
function fi(t, e) {
  Jr(t.timeouts, (n) => n.cancel()), t.pauseQueue.clear(), t.resumeQueue.clear(), t.asyncId = t.asyncTo = t.promise = void 0, e && (t.cancelId = e);
}
class eu extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class tu extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const fs = (t) => t instanceof yl;
let g7 = 1;
class yl extends bd {
  constructor(...e) {
    super(...e), this.id = g7++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  get() {
    const e = xt(this);
    return e && e.getValue();
  }
  to(...e) {
    return st.to(this, e);
  }
  interpolate(...e) {
    return q6(), st.to(this, e);
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
    si(this, {
      type: "change",
      parent: this,
      value: e,
      idle: n
    });
  }
  _onPriorityChange(e) {
    this.idle || Ka.sort(this), si(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
}
const Mn = Symbol.for("SpringPhase"), Td = 1, ds = 2, ms = 4, No = (t) => (t[Mn] & Td) > 0, zt = (t) => (t[Mn] & ds) > 0, Mr = (t) => (t[Mn] & ms) > 0, nu = (t, e) => e ? t[Mn] |= ds | Td : t[Mn] &= ~ds, ru = (t, e) => e ? t[Mn] |= ms : t[Mn] &= ~ms;
class y7 extends yl {
  constructor(e, n) {
    if (super(), this.key = void 0, this.animation = new p7(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !H.und(e) || !H.und(n)) {
      const r = H.obj(e) ? Ae({}, e) : Ae({}, n, {
        from: e
      });
      H.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(zt(this) || this._state.asyncTo) || Mr(this);
  }
  get goal() {
    return He(this.animation.to);
  }
  get velocity() {
    const e = xt(this);
    return e instanceof _r ? e.lastVelocity || 0 : e.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return No(this);
  }
  get isAnimating() {
    return zt(this);
  }
  get isPaused() {
    return Mr(this);
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
    const s = Qa(i.to);
    !s && rt(i.to) && (o = Xe(He(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == cr ? 1 : s ? s[d].lastPosition : o[d];
      let b = i.immediate, p = m;
      if (!b) {
        if (p = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let v = f.elapsedTime += e;
        const y = i.fromValues[d], g = f.v0 != null ? f.v0 : f.v0 = H.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let C;
        const h = a.precision || (y == m ? 5e-3 : Math.min(1, Math.abs(m - y) * 1e-3));
        if (H.und(a.duration))
          if (a.decay) {
            const w = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - w) * v);
            p = y + g / (1 - w) * (1 - E), b = Math.abs(f.lastPosition - p) <= h, C = g * E;
          } else {
            C = f.lastVelocity == null ? g : f.lastVelocity;
            const w = a.restVelocity || h / 10, E = a.clamp ? 0 : a.bounce, x = !H.und(E), $ = y == m ? f.v0 > 0 : y < m;
            let N, F = !1;
            const k = 1, D = Math.ceil(e / k);
            for (let I = 0; I < D && (N = Math.abs(C) > w, !(!N && (b = Math.abs(m - p) <= h, b))); ++I) {
              x && (F = p == m || p > m == $, F && (C = -C * E, p = m));
              const A = -a.tension * 1e-6 * (p - m), _ = -a.friction * 1e-3 * C, T = (A + _) / a.mass;
              C = C + T * k, p = p + C * k;
            }
          }
        else {
          let w = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, v = f.elapsedTime += e)), w = (a.progress || 0) + v / this._memoizedDuration, w = w > 1 ? 1 : w < 0 ? 0 : w, f.durationProgress = w), p = y + a.easing(w) * (m - y), C = (p - f.lastPosition) / e, b = w == 1;
        }
        f.lastVelocity = C, Number.isNaN(p) && (console.warn("Got NaN while animating:", this), b = !0);
      }
      s && !s[d].done && (b = !1), b ? f.done = !0 : n = !1, f.setValue(p, a.round) && (r = !0);
    });
    const c = xt(this), u = c.getValue();
    if (n) {
      const f = He(i.to);
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
    if (zt(this)) {
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
    return H.und(e) ? (r = this.queue || [], this.queue = []) : r = [H.obj(e) ? e : Ae({}, n, {
      to: e
    })], Promise.all(r.map((i) => this._update(i))).then((i) => gl(this, i));
  }
  stop(e) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), fi(this._state, e && this._lastCallId), Q.batchedUpdates(() => this._stop(n, e)), this;
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
    r = H.obj(r) ? r[n] : r, (r == null || cs(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return No(this) || (e.reverse && ([r, i] = [i, r]), i = He(i), H.und(i) ? xt(this) || this._set(r) : this._set(i)), a;
  }
  _update(e, n) {
    let r = Ae({}, e);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, pl(r, (c, u) => /^on/.test(u) ? Od(c, i) : c)), au(this, r, "onProps"), Lr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return Nd(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Mr(this) || (ru(this, !0), Yr(s.pauseQueue), Lr(this, "onPause", mt(this, Ir(this, this.animation.to)), this));
        },
        resume: () => {
          Mr(this) && (ru(this, !1), zt(this) && this._resume(), Yr(s.resumeQueue), Lr(this, "onResume", mt(this, Ir(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Rd(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(e, n, r) {
    if (n.cancel)
      return this.stop(!0), r(ir(this));
    const i = !H.und(e.to), a = !H.und(e.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(ir(this));
    const {
      key: o,
      defaultProps: s,
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
    const b = !It(m, f);
    b && (c.from = m), m = He(m);
    const p = !It(d, u);
    p && this._focus(d);
    const v = cs(n.to), {
      config: y
    } = c, {
      decay: g,
      velocity: C
    } = y;
    (i || a) && (y.velocity = 0), n.config && !v && v7(y, kn(n.config, o), n.config !== s.config ? kn(s.config, o) : void 0);
    let h = xt(this);
    if (!h || H.und(d))
      return r(mt(this, !0));
    const w = H.und(n.reset) ? a && !n.default : !H.und(m) && ti(n.reset, o), E = w ? m : this.get(), x = ui(d), $ = H.num(x) || H.arr(x) || Xa(x), N = !v && (!$ || ti(s.immediate || n.immediate, o));
    if (p) {
      const I = ls(d);
      if (I !== h.constructor)
        if (N)
          h = this._set(x);
        else
          throw Error(`Cannot animate between ${h.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const F = h.constructor;
    let k = rt(d), D = !1;
    if (!k) {
      const I = w || !No(this) && b;
      (p || I) && (D = It(ui(E), x), k = !D), (!It(c.immediate, N) && !N || !It(y.decay, g) || !It(y.velocity, C)) && (k = !0);
    }
    if (D && zt(this) && (c.changed && !w ? k = !0 : k || this._stop(u)), !v && ((k || rt(u)) && (c.values = h.getPayload(), c.toValues = rt(d) ? null : F == cr ? [1] : Xe(x)), c.immediate != N && (c.immediate = N, !N && !w && this._set(u)), k)) {
      const {
        onRest: I
      } = c;
      re(w7, (_) => au(this, n, _));
      const A = mt(this, Ir(this, u));
      Yr(this._pendingCalls, A), this._pendingCalls.add(r), c.changed && Q.batchedUpdates(() => {
        c.changed = !w, I == null || I(A, this), w ? kn(s.onRest, A) : c.onStart == null || c.onStart(A, this);
      });
    }
    w && this._set(E), v ? r(Ad(n.to, n, this._state, this)) : k ? this._start() : zt(this) && !p ? this._pendingCalls.add(r) : r(Pd(E));
  }
  _focus(e) {
    const n = this.animation;
    e !== n.to && (Uc(this) && this._detach(), n.to = e, Uc(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const {
      to: n
    } = this.animation;
    rt(n) && ($r(n, this), fs(n) && (e = n.priority + 1)), this.priority = e;
  }
  _detach() {
    const {
      to: e
    } = this.animation;
    rt(e) && li(e, this);
  }
  _set(e, n = !0) {
    const r = He(e);
    if (!H.und(r)) {
      const i = xt(this);
      if (!i || !It(r, i.getValue())) {
        const a = ls(r);
        !i || i.constructor != a ? hl(this, a.create(r)) : i.setValue(r), i && Q.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return xt(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, Lr(this, "onStart", mt(this, Ir(this, e.to)), this));
  }
  _onChange(e, n) {
    n || (this._onStart(), kn(this.animation.onChange, e, this)), kn(this.defaultProps.onChange, e, this), super._onChange(e, n);
  }
  _start() {
    const e = this.animation;
    xt(this).reset(He(e.to)), e.immediate || (e.fromValues = e.values.map((n) => n.lastPosition)), zt(this) || (nu(this, !0), Mr(this) || this._resume());
  }
  _resume() {
    st.skipAnimation ? this.finish() : Ka.start(this);
  }
  _stop(e, n) {
    if (zt(this)) {
      nu(this, !1);
      const r = this.animation;
      re(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), si(this, {
        type: "idle",
        parent: this
      });
      const i = n ? ir(this.get()) : mt(this.get(), Ir(this, e ?? r.to));
      Yr(this._pendingCalls, i), r.changed && (r.changed = !1, Lr(this, "onRest", i, this));
    }
  }
}
function Ir(t, e) {
  const n = ui(e), r = ui(t.get());
  return It(r, n);
}
function Rd(t, e = t.loop, n = t.to) {
  let r = kn(e);
  if (r) {
    const i = r !== !0 && Fd(r), a = (i || t).reverse, o = !i || i.reset;
    return di(Ae({}, t, {
      loop: e,
      default: !1,
      pause: void 0,
      to: !a || cs(n) ? n : void 0,
      from: o ? t.from : void 0,
      reset: o
    }, i));
  }
}
function di(t) {
  const {
    to: e,
    from: n
  } = t = Fd(t), r = /* @__PURE__ */ new Set();
  return H.obj(e) && iu(e, r), H.obj(n) && iu(n, r), t.keys = r.size ? Array.from(r) : null, t;
}
function b7(t) {
  const e = di(t);
  return H.und(e.default) && (e.default = pl(e)), e;
}
function iu(t, e) {
  kt(t, (n, r) => n != null && e.add(r));
}
const w7 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function au(t, e, n) {
  t.animation[n] = e[n] !== Sd(e, n) ? Od(e[n], t.key) : void 0;
}
function Lr(t, e, ...n) {
  var r, i, a, o;
  (r = (i = t.animation)[e]) == null || r.call(i, ...n), (a = (o = t.defaultProps)[e]) == null || a.call(o, ...n);
}
const E7 = ["onStart", "onChange", "onRest"];
let C7 = 1, x7 = class {
  constructor(e, n) {
    this.id = C7++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), e && this.start(Ae({
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
    return e && this.queue.push(di(e)), this;
  }
  start(e) {
    let {
      queue: n
    } = this;
    return e ? n = Xe(e).map(di) : this.queue = [], this._flush ? this._flush(this, n) : (Vd(this, n), hs(this, n));
  }
  stop(e, n) {
    if (e !== !!e && (n = e), n) {
      const r = this.springs;
      re(Xe(n), (i) => r[i].stop(!!e));
    } else
      fi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  pause(e) {
    if (H.und(e))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      re(Xe(e), (r) => n[r].pause());
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
      re(Xe(e), (r) => n[r].resume());
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
    (i && !this._started || a && !this._started) && (this._started = !0, Jr(e, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, s = a || o && r.size ? this.get() : null;
    a && n.size && Jr(n, ([c, u]) => {
      u.value = s, c(u, this, this._item);
    }), o && (this._started = !1, Jr(r, ([c, u]) => {
      u.value = s, c(u, this, this._item);
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
function hs(t, e) {
  return Promise.all(e.map((n) => Md(t, n))).then((n) => gl(t, n));
}
async function Md(t, e, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = e, u = H.obj(e.default) && e.default;
  o && (e.loop = !1), i === !1 && (e.to = null), a === !1 && (e.from = null);
  const f = H.arr(i) || H.fun(i) ? i : void 0;
  f ? (e.to = void 0, e.onRest = void 0, u && (u.onRest = void 0)) : re(E7, (v) => {
    const y = e[v];
    if (H.fun(y)) {
      const g = t._events[v];
      e[v] = ({
        finished: C,
        cancelled: h
      }) => {
        const w = g.get(y);
        w ? (C || (w.finished = !1), h && (w.cancelled = !0)) : g.set(y, {
          value: null,
          finished: C || !1,
          cancelled: h || !1
        });
      }, u && (u[v] = e[v]);
    }
  });
  const d = t._state;
  e.pause === !d.paused ? (d.paused = e.pause, Yr(e.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (e.pause = !0);
  const m = (r || Object.keys(t.springs)).map((v) => t.springs[v].start(e)), b = e.cancel === !0 || Sd(e, "cancel") === !0;
  (f || b && d.asyncId) && m.push(Nd(++t._lastAsyncId, {
    props: e,
    state: d,
    actions: {
      pause: as,
      resume: as,
      start(v, y) {
        b ? (fi(d, t._lastAsyncId), y(ir(t))) : (v.onRest = s, y(Ad(f, v, d, t)));
      }
    }
  })), d.paused && await new Promise((v) => {
    d.resumeQueue.add(v);
  });
  const p = gl(t, await Promise.all(m));
  if (o && p.finished && !(n && p.noop)) {
    const v = Rd(e, o, i);
    if (v)
      return Vd(t, [v]), Md(t, v, !0);
  }
  return c && Q.batchedUpdates(() => c(p, t, t.item)), p;
}
function ou(t, e) {
  const n = Ae({}, t.springs);
  return e && re(Xe(e), (r) => {
    H.und(r.keys) && (r = di(r)), H.obj(r.to) || (r = Ae({}, r, {
      to: void 0
    })), Dd(n, r, (i) => Ld(i));
  }), Id(t, n), n;
}
function Id(t, e) {
  kt(e, (n, r) => {
    t.springs[r] || (t.springs[r] = n, $r(n, t));
  });
}
function Ld(t, e) {
  const n = new y7();
  return n.key = t, e && $r(n, e), n;
}
function Dd(t, e, n) {
  e.keys && re(e.keys, (r) => {
    (t[r] || (t[r] = n(r)))._prepareNode(e);
  });
}
function Vd(t, e) {
  re(e, (n) => {
    Dd(t.springs, n, (r) => Ld(r, t));
  });
}
function $7(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const _7 = ["children"], eo = (t) => {
  let {
    children: e
  } = t, n = $7(t, _7);
  const r = ot(xa), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = X6(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = xa;
  return L.createElement(o, {
    value: n
  }, e);
}, xa = k7(eo, {});
eo.Provider = xa.Provider;
eo.Consumer = xa.Consumer;
function k7(t, e) {
  return Object.assign(t, L.createContext(e)), t.Provider._context = t, t.Consumer._context = t, t;
}
const O7 = () => {
  const t = [], e = function(i) {
    G6();
    const a = [];
    return re(t, (o, s) => {
      if (H.und(i))
        a.push(o.start());
      else {
        const c = n(i, o, s);
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
        const s = this._getProps(r, a, o);
        s && i.push(a.start(s));
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
function S7(t, e, n) {
  const r = H.fun(e) && e;
  r && !n && (n = []);
  const i = ie(() => r || arguments.length == 3 ? O7() : void 0, []), a = V(0), o = $d(), s = ie(() => ({
    ctrls: [],
    queue: [],
    flush(g, C) {
      const h = ou(g, C);
      return a.current > 0 && !s.queue.length && !Object.keys(h).some((E) => !g.springs[E]) ? hs(g, C) : new Promise((E) => {
        Id(g, h), s.queue.push(() => {
          E(hs(g, C));
        }), o();
      });
    }
  }), []), c = V([...s.ctrls]), u = [], f = Kc(t) || 0;
  ie(() => {
    re(c.current.slice(t, f), (g) => {
      f7(g, i), g.stop(!0);
    }), c.current.length = t, d(f, t);
  }, [t]), ie(() => {
    d(0, Math.min(f, t));
  }, n);
  function d(g, C) {
    for (let h = g; h < C; h++) {
      const w = c.current[h] || (c.current[h] = new x7(null, s.flush)), E = r ? r(h, w) : e[h];
      E && (u[h] = b7(E));
    }
  }
  const m = c.current.map((g, C) => ou(g, u[C])), b = ot(eo), p = Kc(b), v = b !== p && u7(b);
  ml(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: g
    } = s;
    g.length && (s.queue = [], re(g, (C) => C())), re(c.current, (C, h) => {
      i == null || i.add(C), v && C.start({
        default: b
      });
      const w = u[h];
      w && (d7(C, w.ref), C.ref ? C.queue.push(w) : C.start(w));
    });
  }), _d(() => () => {
    re(s.ctrls, (g) => g.stop(!0));
  });
  const y = m.map((g) => Ae({}, g));
  return i ? [y, i] : y;
}
function Te(t, e) {
  const n = H.fun(t), [[r], i] = S7(1, n ? t : [t], n ? e || [] : e);
  return n || arguments.length == 2 ? [r, i] : r;
}
let su;
(function(t) {
  t.MOUNT = "mount", t.ENTER = "enter", t.UPDATE = "update", t.LEAVE = "leave";
})(su || (su = {}));
class jd extends yl {
  constructor(e, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = e, this.calc = oi(...n);
    const r = this._get(), i = ls(r);
    hl(this, i.create(r));
  }
  advance(e) {
    const n = this._get(), r = this.get();
    It(n, r) || (xt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && lu(this._active) && Po(this);
  }
  _get() {
    const e = H.arr(this.source) ? this.source.map(He) : Xe(He(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !lu(this._active) && (this.idle = !1, re(Qa(this), (e) => {
      e.done = !1;
    }), st.skipAnimation ? (Q.batchedUpdates(() => this.advance()), Po(this)) : Ka.start(this));
  }
  _attach() {
    let e = 1;
    re(Xe(this.source), (n) => {
      rt(n) && $r(n, this), fs(n) && (n.idle || this._active.add(n), e = Math.max(e, n.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    re(Xe(this.source), (e) => {
      rt(e) && li(e, this);
    }), this._active.clear(), Po(this);
  }
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = Xe(this.source).reduce((n, r) => Math.max(n, (fs(r) ? r.priority : 0) + 1), 0));
  }
}
function F7(t) {
  return t.idle !== !1;
}
function lu(t) {
  return !t.size || Array.from(t).every(F7);
}
function Po(t) {
  t.idle || (t.idle = !0, re(Qa(t), (e) => {
    e.done = !0;
  }), si(t, {
    type: "idle",
    parent: t
  }));
}
const N7 = (t, ...e) => new jd(t, e);
st.assign({
  createStringInterpolator: Cd,
  to: (t, e) => new jd(t, e)
});
function bl(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
const P7 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], Bd = /^--/;
function A7(t, e) {
  return e == null || typeof e == "boolean" || e === "" ? "" : typeof e == "number" && e !== 0 && !Bd.test(t) && !(ni.hasOwnProperty(t) && ni[t]) ? e + "px" : ("" + e).trim();
}
const cu = {};
function T7(t, e) {
  if (!t.nodeType || !t.setAttribute)
    return !1;
  const n = t.nodeName === "filter" || t.parentNode && t.parentNode.nodeName === "filter", r = e, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = bl(r, P7), f = Object.values(u), d = Object.keys(u).map((m) => n || t.hasAttribute(m) ? m : cu[m] || (cu[m] = m.replace(/([A-Z])/g, (b) => "-" + b.toLowerCase())));
  a !== void 0 && (t.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const b = A7(m, i[m]);
      Bd.test(m) ? t.style.setProperty(m, b) : t.style[m] = b;
    }
  d.forEach((m, b) => {
    t.setAttribute(m, f[b]);
  }), o !== void 0 && (t.scrollTop = o), s !== void 0 && (t.scrollLeft = s), c !== void 0 && t.setAttribute("viewBox", c);
}
let ni = {
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
const R7 = (t, e) => t + e.charAt(0).toUpperCase() + e.substring(1), M7 = ["Webkit", "Ms", "Moz", "O"];
ni = Object.keys(ni).reduce((t, e) => (M7.forEach((n) => t[R7(n, e)] = t[e]), t), ni);
const I7 = ["x", "y", "z"], L7 = /^(matrix|translate|scale|rotate|skew)/, D7 = /^(translate)/, V7 = /^(rotate|skew)/, Ao = (t, e) => H.num(t) && t !== 0 ? t + e : t, aa = (t, e) => H.arr(t) ? t.every((n) => aa(n, e)) : H.num(t) ? t === e : parseFloat(t) === e;
class j7 extends Ja {
  constructor(e) {
    let {
      x: n,
      y: r,
      z: i
    } = e, a = bl(e, I7);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => Ao(u, "px")).join(",")})`, aa(c, 0)])), kt(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((f) => [f, f === ""]);
      else if (L7.test(u)) {
        if (delete a[u], H.und(c))
          return;
        const f = D7.test(u) ? "px" : V7.test(u) ? "deg" : "";
        o.push(Xe(c)), s.push(u === "rotate3d" ? ([d, m, b, p]) => [`rotate3d(${d},${m},${b},${Ao(p, f)})`, aa(p, 0)] : (d) => [`${u}(${d.map((m) => Ao(m, f)).join(",")})`, aa(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new B7(o, s)), super(a);
  }
}
class B7 extends bd {
  constructor(e, n) {
    super(), this._value = null, this.inputs = e, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", n = !0;
    return re(this.inputs, (r, i) => {
      const a = He(r[0]), [o, s] = this.transforms[i](H.arr(a) ? a : r.map(He));
      e += " " + o, n = n && s;
    }), n ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && re(this.inputs, (n) => re(n, (r) => rt(r) && $r(r, this)));
  }
  observerRemoved(e) {
    e == 0 && re(this.inputs, (n) => re(n, (r) => rt(r) && li(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), si(this, e);
  }
}
const W7 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], Z7 = ["scrollTop", "scrollLeft"];
st.assign({
  batchedUpdates: tm,
  createStringInterpolator: Cd,
  colors: k6
});
const H7 = a7(W7, {
  applyAnimatedValues: T7,
  createAnimatedStyle: (t) => new j7(t),
  getComponentProps: (t) => bl(t, Z7)
}), ge = H7.animated;
function z7(t) {
  return (typeof t == "function" ? t() : t) || document.body;
}
function kr(t, e) {
  if (vr && t) {
    const n = z7(t);
    return nm(e, n);
  }
  return e;
}
function U7(t) {
  const e = V(t);
  return t && (e.current = !0), !!e.current;
}
const Or = (t) => to(t.active, t.forceRender, t.destroyOnClose) ? t.children : null;
function to(t, e, n) {
  const r = U7(t);
  return e || t ? !0 : r ? !n : !1;
}
const q7 = {
  click: "onClick"
};
function on(t, e) {
  const n = Object.assign({}, e.props);
  for (const r of t) {
    const i = q7[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = e.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(e, n);
}
const To = "adm-mask", K7 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, G7 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, Y7 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, _i = (t) => {
  const e = U(Y7, t), {
    locale: n
  } = ye(), r = V(null);
  Ua(r, e.visible && e.disableBodyScroll);
  const i = ie(() => {
    var f;
    const d = (f = K7[e.opacity]) !== null && f !== void 0 ? f : e.opacity, m = G7[e.color];
    return m ? `rgba(${m}, ${d})` : e.color;
  }, [e.color, e.opacity]), [a, o] = K(e.visible), s = rl(), {
    opacity: c
  } = Te({
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
      s.current || (o(e.visible), e.visible ? (f = e.afterShow) === null || f === void 0 || f.call(e) : (d = e.afterClose) === null || d === void 0 || d.call(e));
    }
  }), u = on(e.stopPropagation, W(e, l.createElement(ge.div, {
    className: To,
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
  }, e.onMaskClick && l.createElement("div", {
    className: `${To}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: e.onMaskClick
  }), l.createElement("div", {
    className: `${To}-content`
  }, e.children))));
  return l.createElement(Or, {
    active: a,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, kr(e.getContainer, u));
};
function Wd(t) {
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
function Zd(t) {
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
function Hd(t) {
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
function zd(t) {
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
function no(t) {
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
function ki(t) {
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
function X7(t) {
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
function Ud(t) {
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
function qd(t) {
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
function Kd(t) {
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
function Q7(t) {
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
function J7(t) {
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
function ey(t) {
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
function ty(t) {
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
function ny(t) {
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
function ry(t) {
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
function uu(t) {
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
const wl = {
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
function Gd(t) {
  const [e, n] = K(t);
  return Ne(() => {
    n(t);
  }, [t]), e;
}
function iy(t, e, n) {
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
function fu(t, e, n) {
  return e === 0 || Math.abs(e) === 1 / 0 ? Math.pow(t, n * 5) : t * e * n / (e + n * t);
}
function du(t, e, n, r = 0.15) {
  return r === 0 ? iy(t, e, n) : t < e ? -fu(e - t, n - e, r) + e : t > n ? +fu(t - n, n - e, r) + n : t;
}
function ay(t, [e, n], [r, i]) {
  const [[a, o], [s, c]] = t;
  return [du(e, a, o, r), du(n, s, c, i)];
}
function oy(t, e) {
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
function sy(t) {
  var e = oy(t, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Ie(t, e, n) {
  return e = sy(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function mu(t, e) {
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
    e % 2 ? mu(Object(n), !0).forEach(function(r) {
      Ie(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : mu(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
const Yd = {
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
function hu(t) {
  return t ? t[0].toUpperCase() + t.slice(1) : "";
}
const ly = ["enter", "leave"];
function cy(t = !1, e) {
  return t && !ly.includes(e);
}
function uy(t, e = "", n = !1) {
  const r = Yd[t], i = r && r[e] || e;
  return "on" + hu(t) + hu(i) + (cy(n, i) ? "Capture" : "");
}
const fy = ["gotpointercapture", "lostpointercapture"];
function dy(t) {
  let e = t.substring(2).toLowerCase();
  const n = !!~e.indexOf("passive");
  n && (e = e.replace("passive", ""));
  const r = fy.includes(e) ? "capturecapture" : "capture", i = !!~e.indexOf(r);
  return i && (e = e.replace("capture", "")), {
    device: e,
    capture: i,
    passive: n
  };
}
function my(t, e = "") {
  const n = Yd[t], r = n && n[e] || e;
  return t + r;
}
function ro(t) {
  return "touches" in t;
}
function Xd(t) {
  return ro(t) ? "touch" : "pointerType" in t ? t.pointerType : "mouse";
}
function hy(t) {
  return Array.from(t.touches).filter((e) => {
    var n, r;
    return e.target === t.currentTarget || ((n = t.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, e.target));
  });
}
function vy(t) {
  return t.type === "touchend" || t.type === "touchcancel" ? t.changedTouches : t.targetTouches;
}
function Qd(t) {
  return ro(t) ? vy(t)[0] : t;
}
function vs(t, e) {
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
function py(t) {
  return hy(t).map((e) => e.identifier);
}
function vu(t, e) {
  const [n, r] = Array.from(t.touches).filter((i) => e.includes(i.identifier));
  return vs(n, r);
}
function Ro(t) {
  const e = Qd(t);
  return ro(t) ? e.identifier : e.pointerId;
}
function pu(t) {
  const e = Qd(t);
  return [e.clientX, e.clientY];
}
const gu = 40, yu = 800;
function Jd(t) {
  let {
    deltaX: e,
    deltaY: n,
    deltaMode: r
  } = t;
  return r === 1 ? (e *= gu, n *= gu) : r === 2 && (e *= yu, n *= yu), [e, n];
}
function gy(t) {
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
function $a(t, ...e) {
  return typeof t == "function" ? t(...e) : t;
}
function yy() {
}
function by(...t) {
  return t.length === 0 ? yy : t.length === 1 ? t[0] : function() {
    let e;
    for (const n of t)
      e = n.apply(this, arguments) || e;
    return e;
  };
}
function bu(t, e) {
  return Object.assign({}, e, t || {});
}
const wy = 32;
class e1 {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = e.target, n.currentTarget = e.currentTarget, n.lastOffset = r.from ? $a(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = e.timeStamp);
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
    if (e && (n.event = e, r.preventDefault && e.cancelable && n.event.preventDefault(), n.type = e.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, gy(e)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = e.timeStamp - n.timeStamp, n.timeStamp = e.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Fe.addTo(n._distance, x);
    }
    this.axisIntent && this.axisIntent(e);
    const [o, s] = n._movement, [c, u] = r.threshold, {
      _step: f,
      values: d
    } = n;
    if (r.hasCustomTransform ? (f[0] === !1 && (f[0] = Math.abs(o) >= c && d[0]), f[1] === !1 && (f[1] = Math.abs(s) >= u && d[1])) : (f[0] === !1 && (f[0] = Math.abs(o) >= c && Math.sign(o) * c), f[1] === !1 && (f[1] = Math.abs(s) >= u && Math.sign(s) * u)), n.intentional = f[0] !== !1 || f[1] !== !1, !n.intentional)
      return;
    const m = [0, 0];
    if (r.hasCustomTransform) {
      const [x, $] = d;
      m[0] = f[0] !== !1 ? x - f[0] : 0, m[1] = f[1] !== !1 ? $ - f[1] : 0;
    } else
      m[0] = f[0] !== !1 ? o - f[0] : 0, m[1] = f[1] !== !1 ? s - f[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const b = n.offset, p = n._active && !n._blocked || n.active;
    p && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, e && (n.first && ("bounds" in r && (n._bounds = $a(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [v, y] = n.offset, [[g, C], [h, w]] = n._bounds;
    n.overflow = [v < g ? -1 : v > C ? 1 : 0, y < h ? -1 : y > w ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = ay(n._bounds, n.offset, E), n.delta = Fe.sub(n.offset, b), this.computeMovement(), p && (!n.last || a > wy)) {
      n.delta = Fe.sub(n.offset, b);
      const x = n.delta.map(Math.abs);
      Fe.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [x[0] / a, x[1] / a], n.timeDelta = a);
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
function Ey([t, e], n) {
  const r = Math.abs(t), i = Math.abs(e);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class t1 extends e1 {
  constructor(...e) {
    super(...e), Ie(this, "aliasKey", "xy");
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
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[Xd(e)] : r.axisThreshold;
      n.axis = Ey(n._movement, i);
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
const Cy = (t) => t, wu = 0.15, n1 = {
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
        return [wu, wu];
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
    return this.hasCustomTransform = !!r, r || Cy;
  },
  threshold(t) {
    return Fe.toVector(t, 0);
  }
}, xy = 0, Sr = Ce(Ce({}, n1), {}, {
  axis(t, e, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(t = xy) {
    return t;
  },
  bounds(t = {}) {
    if (typeof t == "function")
      return (a) => Sr.bounds(t(a));
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
}), Eu = {
  ArrowRight: (t, e = 1) => [t * e, 0],
  ArrowLeft: (t, e = 1) => [-1 * t * e, 0],
  ArrowUp: (t, e = 1) => [0, -1 * t * e],
  ArrowDown: (t, e = 1) => [0, t * e]
};
class $y extends t1 {
  constructor(...e) {
    super(...e), Ie(this, "ingKey", "dragging");
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
      e._bounds = Sr.bounds(i);
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
    n.pointerCapture && e.target.setPointerCapture(e.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(e), this.setupPointer(e), r._pointerId = Ro(e), r._pointerActive = !0, this.computeValues(pu(e)), this.computeInitial(), n.preventScrollAxis && Xd(e) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(e)) : n.delay > 0 ? (this.setupDelayTrigger(e), n.triggerAllEvents && (this.compute(e), this.emit())) : this.startPointerDrag(e));
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
    const a = pu(e);
    if (document.pointerLockElement === e.target ? n._delta = [e.movementX, e.movementY] : (n._delta = Fe.sub(a, n._values), this.computeValues(a)), Fe.addTo(n._movement, n._delta), this.compute(e), n._delayed && n.intentional) {
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
      const [s, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [b, p] = r.swipe.distance, v = r.swipe.duration;
      if (n.elapsedTime < v) {
        const y = Math.abs(s / n.timeDelta), g = Math.abs(c / n.timeDelta);
        y > d && Math.abs(u) > b && (n.swipe[0] = Math.sign(s)), g > m && Math.abs(f) > p && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, _y(e);
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
    const n = Eu[e.key];
    if (n) {
      const r = this.state, i = e.shiftKey ? 10 : e.altKey ? 0.1 : 1;
      this.start(e), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Fe.addTo(r._movement, r._delta), this.compute(e), this.emit();
    }
  }
  keyUp(e) {
    e.key in Eu && (this.state._keyboardActive = !1, this.setActive(), this.compute(e), this.emit());
  }
  bind(e) {
    const n = this.config.device;
    e(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (e(n, "change", this.pointerMove.bind(this)), e(n, "end", this.pointerUp.bind(this)), e(n, "cancel", this.pointerUp.bind(this)), e("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (e("key", "down", this.keyDown.bind(this)), e("key", "up", this.keyUp.bind(this))), this.config.filterTaps && e("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function _y(t) {
  "persist" in t && typeof t.persist == "function" && t.persist();
}
const Oi = typeof window < "u" && window.document && window.document.createElement;
function r1() {
  return Oi && "ontouchstart" in window;
}
function ky() {
  return r1() || Oi && window.navigator.maxTouchPoints > 1;
}
function Oy() {
  return Oi && "onpointerdown" in window;
}
function Sy() {
  return Oi && "exitPointerLock" in window.document;
}
function Fy() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const it = {
  isBrowser: Oi,
  gesture: Fy(),
  touch: r1(),
  touchscreen: ky(),
  pointer: Oy(),
  pointerLock: Sy()
}, Ny = 250, Py = 180, Ay = 0.5, Ty = 50, Ry = 250, My = 10, Cu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Iy = Ce(Ce({}, Sr), {}, {
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
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && t ? Ny : void 0, !(!it.touchscreen || n === !1))
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
    const a = Fe.toVector(t, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: t = Ay,
    distance: e = Ty,
    duration: n = Ry
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
        return Py;
      case !1:
        return 0;
      default:
        return t;
    }
  },
  axisThreshold(t) {
    return t ? Ce(Ce({}, Cu), t) : Cu;
  },
  keyboardDisplacement(t = My) {
    return t;
  }
});
function i1(t) {
  const [e, n] = t.overflow, [r, i] = t._delta, [a, o] = t._direction;
  (e < 0 && r > 0 && a < 0 || e > 0 && r < 0 && a > 0) && (t._movement[0] = t._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (t._movement[1] = t._movementBound[1]);
}
const Ly = 30, Dy = 100;
class Vy extends e1 {
  constructor(...e) {
    super(...e), Ie(this, "ingKey", "pinching"), Ie(this, "aliasKey", "da");
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
      const i = Math.abs(n) * Ly - Math.abs(r);
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
    const i = vu(e, n._touchIds);
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
    const a = vs(...Array.from(r.values()));
    a && this.pinchStart(e, a);
  }
  pinchStart(e, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(e), this.emit();
  }
  touchMove(e) {
    if (!this.state._active)
      return;
    const n = vu(e, this.state._touchIds);
    n && this.pinchMove(e, n);
  }
  pointerMove(e) {
    const n = this.state._pointerEvents;
    if (n.has(e.pointerId) && n.set(e.pointerId, e), !this.state._active)
      return;
    const r = vs(...Array.from(n.values()));
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
    r._delta = [-Jd(e)[1] / Dy * r.offset[0], 0], Fe.addTo(r._movement, r._delta), i1(r), this.state.origin = [e.clientX, e.clientY], this.compute(e), this.emit();
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
const jy = Ce(Ce({}, n1), {}, {
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
    const i = (o) => {
      const s = bu($a(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    }, a = (o) => {
      const s = bu($a(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
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
Ce(Ce({}, Sr), {}, {
  mouseOnly: (t = !0) => t
});
class By extends t1 {
  constructor(...e) {
    super(...e), Ie(this, "ingKey", "wheeling");
  }
  wheel(e) {
    this.state._active || this.start(e), this.wheelChange(e), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(e) {
    const n = this.state;
    n._delta = Jd(e), Fe.addTo(n._movement, n._delta), i1(n), this.compute(e), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(e) {
    e("wheel", "", this.wheel.bind(this));
  }
}
const Wy = Sr;
Ce(Ce({}, Sr), {}, {
  mouseOnly: (t = !0) => t
});
const El = /* @__PURE__ */ new Map(), ps = /* @__PURE__ */ new Map();
function Cl(t) {
  El.set(t.key, t.engine), ps.set(t.key, t.resolver);
}
const a1 = {
  key: "drag",
  engine: $y,
  resolver: Iy
}, Zy = {
  key: "pinch",
  engine: Vy,
  resolver: jy
}, Hy = {
  key: "wheel",
  engine: By,
  resolver: Wy
};
function zy(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Uy(t, e) {
  if (t == null)
    return {};
  var n = zy(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
const qy = {
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
}, Ky = ["target", "eventOptions", "window", "enabled", "transform"];
function oa(t = {}, e) {
  const n = {};
  for (const [r, i] of Object.entries(e))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, t[r], r, t);
        break;
      case "object":
        n[r] = oa(t[r], i);
        break;
      case "boolean":
        i && (n[r] = t[r]);
        break;
    }
  return n;
}
function Gy(t, e, n = {}) {
  const r = t, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = Uy(r, Ky);
  if (n.shared = oa({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, qy), e) {
    const f = ps.get(e);
    n[e] = oa(Ce({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = ps.get(f);
      d && (n[f] = oa(Ce({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class o1 {
  constructor(e, n) {
    Ie(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = e, this._gestureKey = n;
  }
  add(e, n, r, i, a) {
    const o = this._listeners, s = my(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = Ce(Ce({}, c), a);
    e.addEventListener(s, i, u);
    const f = () => {
      e.removeEventListener(s, i, u), o.delete(f);
    };
    return o.add(f), f;
  }
  clean() {
    this._listeners.forEach((e) => e()), this._listeners.clear();
  }
}
class Yy {
  constructor() {
    Ie(this, "_timeouts", /* @__PURE__ */ new Map());
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
class Xy {
  constructor(e) {
    Ie(this, "gestures", /* @__PURE__ */ new Set()), Ie(this, "_targetEventStore", new o1(this)), Ie(this, "gestureEventStores", {}), Ie(this, "gestureTimeoutStores", {}), Ie(this, "handlers", {}), Ie(this, "config", {}), Ie(this, "pointerIds", /* @__PURE__ */ new Set()), Ie(this, "touchIds", /* @__PURE__ */ new Set()), Ie(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), Qy(this, e);
  }
  setEventIds(e) {
    if (ro(e))
      return this.touchIds = new Set(py(e)), this.touchIds;
    if ("pointerId" in e)
      return e.type === "pointerup" || e.type === "pointercancel" ? this.pointerIds.delete(e.pointerId) : e.type === "pointerdown" && this.pointerIds.add(e.pointerId), this.pointerIds;
  }
  applyHandlers(e, n) {
    this.handlers = e, this.nativeHandlers = n;
  }
  applyConfig(e, n) {
    this.config = Gy(e, n, this.config);
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
          const s = this.config[o], c = xu(r, s.eventOptions, !!i);
          if (s.enabled) {
            const u = El.get(o);
            new u(this, e, o).bind(c);
          }
        }
        const a = xu(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](Ce(Ce({}, this.state.shared), {}, {
            event: s,
            args: e
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = by(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = dy(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Zn(t, e) {
  t.gestures.add(e), t.gestureEventStores[e] = new o1(t, e), t.gestureTimeoutStores[e] = new Yy();
}
function Qy(t, e) {
  e.drag && Zn(t, "drag"), e.wheel && Zn(t, "wheel"), e.scroll && Zn(t, "scroll"), e.move && Zn(t, "move"), e.pinch && Zn(t, "pinch"), e.hover && Zn(t, "hover");
}
const xu = (t, e, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : e.capture, d = (u = o.passive) !== null && u !== void 0 ? u : e.passive;
  let m = s ? r : uy(r, i, f);
  n && d && (m += "Passive"), t[m] = t[m] || [], t[m].push(a);
}, Jy = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function e8(t) {
  const e = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in t)
    Jy.test(i) ? (r.add(RegExp.lastMatch), n[i] = t[i]) : e[i] = t[i];
  return [n, e, r];
}
function Hn(t, e, n, r, i, a) {
  if (!t.has(n) || !El.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let f;
    return u.first && o in e && e[o](u), n in e && (f = e[n](u)), u.last && s in e && e[s](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function t8(t, e) {
  const [n, r, i] = e8(t), a = {};
  return Hn(i, n, "onDrag", "drag", a, e), Hn(i, n, "onWheel", "wheel", a, e), Hn(i, n, "onScroll", "scroll", a, e), Hn(i, n, "onPinch", "pinch", a, e), Hn(i, n, "onMove", "move", a, e), Hn(i, n, "onHover", "hover", a, e), {
    handlers: a,
    config: e,
    nativeHandlers: r
  };
}
function xl(t, e = {}, n, r) {
  const i = l.useMemo(() => new Xy(t), []);
  if (i.applyHandlers(t, r), i.applyConfig(e, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), e.target === void 0)
    return i.bind.bind(i);
}
function Ft(t, e) {
  return Cl(a1), xl({
    drag: t
  }, e || {}, "drag");
}
function n8(t, e) {
  return Cl(Hy), xl({
    wheel: t
  }, e || {}, "wheel");
}
function r8(t) {
  return t.forEach(Cl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = t8(n, r || {});
    return xl(i, o, void 0, a);
  };
}
const Zi = "adm-popup", i8 = Object.assign(Object.assign({}, wl), {
  closeOnSwipe: !1,
  position: "bottom"
}), Fr = (t) => {
  const e = U(i8, t), n = B(`${Zi}-body`, e.bodyClassName, `${Zi}-body-position-${e.position}`), {
    locale: r
  } = ye(), [i, a] = K(e.visible), o = V(null);
  Ua(o, e.disableBodyScroll && i ? "strict" : !1), Ne(() => {
    e.visible && a(!0);
  }, [e.visible]);
  const s = rl(), {
    percent: c
  } = Te({
    percent: e.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var m, b;
      s.current || (a(e.visible), e.visible ? (m = e.afterShow) === null || m === void 0 || m.call(e) : (b = e.afterClose) === null || b === void 0 || b.call(e));
    }
  }), u = Ft(({
    swipe: [, m]
  }) => {
    var b;
    e.closeOnSwipe && (m === 1 && e.position === "bottom" || m === -1 && e.position === "top") && ((b = e.onClose) === null || b === void 0 || b.call(e));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(e.position)
  }), f = Gd(i && e.visible), d = on(e.stopPropagation, W(e, l.createElement("div", Object.assign({
    className: Zi,
    onClick: e.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(e.position) ? "none" : "auto"
    }
  }, u()), e.mask && l.createElement(_i, {
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
  }), l.createElement(ge.div, {
    className: n,
    style: Object.assign(Object.assign({}, e.bodyStyle), {
      pointerEvents: c.to((m) => m === 0 ? "unset" : "none"),
      transform: c.to((m) => e.position === "bottom" ? `translate(0, ${m}%)` : e.position === "top" ? `translate(0, -${m}%)` : e.position === "left" ? `translate(-${m}%, 0)` : e.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: o
  }, e.showCloseButton && l.createElement("a", {
    className: B(`${Zi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = e.onClose) === null || m === void 0 || m.call(e);
    },
    role: "button",
    "aria-label": r.common.close
  }, l.createElement(ki, null)), e.children))));
  return l.createElement(Or, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, kr(e.getContainer, d));
}, $u = "adm-safe-area", Nr = (t) => W(t, l.createElement("div", {
  className: B($u, `${$u}-position-${t.position}`)
})), _a = Object.assign({}, em), {
  version: a8,
  render: o8,
  unmountComponentAtNode: s8
} = _a;
let io;
try {
  Number((a8 || "").split(".")[0]) >= 18 && _a.createRoot && (io = _a.createRoot);
} catch {
}
function _u(t) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: e
  } = _a;
  e && typeof e == "object" && (e.usingClientEntryPoint = t);
}
const ka = "__antd_mobile_root__";
function l8(t, e) {
  o8(t, e);
}
function c8(t, e) {
  _u(!0);
  const n = e[ka] || io(e);
  _u(!1), n.render(t), e[ka] = n;
}
function u8(t, e) {
  if (io) {
    c8(t, e);
    return;
  }
  l8(t, e);
}
function f8(t) {
  return s8(t);
}
function d8(t) {
  return Se(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var e;
      (e = t[ka]) === null || e === void 0 || e.unmount(), delete t[ka];
    });
  });
}
function m8(t) {
  return io ? d8(t) : f8(t);
}
function Si(t) {
  const e = document.createElement("div");
  document.body.appendChild(e);
  function n() {
    m8(e) && e.parentNode && e.parentNode.removeChild(e);
  }
  return u8(t, e), n;
}
function Pr(t) {
  const e = l.forwardRef((i, a) => {
    const [o, s] = K(!1), c = V(!1), [u, f] = K(t), d = V(0);
    X(() => {
      c.current ? b() : s(!0);
    }, []);
    function m() {
      var p, v;
      c.current = !0, s(!1), (v = (p = u.props).onClose) === null || v === void 0 || v.call(p);
    }
    function b() {
      var p, v;
      r(), (v = (p = u.props).afterClose) === null || v === void 0 || v.call(p);
    }
    return we(a, () => ({
      close: m,
      replace: (p) => {
        var v, y;
        d.current++, (y = (v = u.props).afterClose) === null || y === void 0 || y.call(v), f(p);
      }
    })), l.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: b
    }));
  }), n = l.createRef(), r = Si(l.createElement(e, {
    ref: n
  }));
  return {
    close: () => Se(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const Ve = "adm-action-sheet", h8 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, s1 = (t) => {
  const e = U(h8, t), {
    styles: n
  } = e;
  return l.createElement(Fr, {
    visible: e.visible,
    onMaskClick: () => {
      var r, i;
      (r = e.onMaskClick) === null || r === void 0 || r.call(e), e.closeOnMaskClick && ((i = e.onClose) === null || i === void 0 || i.call(e));
    },
    afterClose: e.afterClose,
    className: B(`${Ve}-popup`, e.popupClassName),
    style: e.popupStyle,
    getContainer: e.getContainer,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, W(e, l.createElement("div", {
    className: Ve
  }, e.extra && l.createElement("div", {
    className: `${Ve}-extra`
  }, e.extra), l.createElement("div", {
    className: `${Ve}-button-list`
  }, e.actions.map((r, i) => l.createElement("div", {
    key: r.key,
    className: `${Ve}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${Ve}-button-item`, {
      [`${Ve}-button-item-danger`]: r.danger,
      [`${Ve}-button-item-disabled`]: r.disabled,
      [`${Ve}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var a, o, s;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = e.onAction) === null || o === void 0 || o.call(e, r, i), e.closeOnAction && ((s = e.onClose) === null || s === void 0 || s.call(e));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, l.createElement("div", {
    className: `${Ve}-button-item-name`
  }, r.text), r.description && l.createElement("div", {
    className: `${Ve}-button-item-description`
  }, r.description))))), e.cancelText && l.createElement("div", {
    className: `${Ve}-cancel`,
    role: "option",
    "aria-label": e.cancelText
  }, l.createElement("div", {
    className: `${Ve}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${Ve}-button-item`),
    onClick: e.onClose
  }, l.createElement("div", {
    className: `${Ve}-button-item-name`
  }, e.cancelText)))), e.safeArea && l.createElement(Nr, {
    position: "bottom"
  }))));
};
function v8(t) {
  return Pr(l.createElement(s1, Object.assign({}, t)));
}
const g_ = le(s1, {
  show: v8
}), ku = "adm-auto-center", mi = (t) => W(t, l.createElement("div", {
  className: ku
}, l.createElement("div", {
  className: `${ku}-content`
}, t.children))), p8 = Be(() => l.createElement("svg", {
  className: "adm-avatar-fallback",
  width: "88px",
  height: "88px",
  viewBox: "0 0 88 88",
  version: "1.1"
}, l.createElement("title", null, "编组 3"), l.createElement("defs", null, l.createElement("polygon", {
  id: "path-1",
  points: "0 0 88 0 88 88 0 88"
})), l.createElement("g", {
  id: "页面-1",
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("g", {
  id: "语雀",
  transform: "translate(-495.000000, -71.000000)"
}, l.createElement("g", {
  id: "编组-3",
  transform: "translate(495.000000, 71.000000)"
}, l.createElement("mask", {
  id: "mask-2",
  fill: "white"
}, l.createElement("use", {
  xlinkHref: "#path-1"
})), l.createElement("use", {
  id: "Mask",
  fill: "#EEEEEE",
  fillRule: "nonzero",
  xlinkHref: "#path-1"
}), l.createElement("path", {
  d: "M44.5707528,16 L43.4292117,16 L42.9575197,16.0086403 L42.9575195,16.0086403 C36.5215787,16.2615464 31.4341803,21.5678078 31.4344832,28.0273864 L31.4344832,34.7776551 L31.4495601,35.3716788 L31.4495593,35.3716628 C31.599687,38.5368723 32.9422041,41.5269327 35.2058513,43.7376716 L38.2147759,46.6775505 L38.4086219,46.8913989 C38.7747759,47.3385365 38.9750835,47.9001589 38.9750835,48.4833848 L38.9750835,48.8938006 L38.9556989,49.1897326 L38.9556989,49.1897325 C38.8577746,49.9812662 38.3754713,50.67284 37.667703,51.036605 L18.7375269,60.7440265 L18.4101421,60.9276334 L18.4101423,60.9276333 C16.9141658,61.8418636 16.0009389,63.4714674 16,65.2283758 L16,66.070809 L16.0129231,66.3948217 C16.1766149,68.4123376 17.860922,70 19.91569,70 L68.0843101,70 L68.08431,70 C70.2460467,70 71.9988087,68.243122 72,66.0751224 L72,65.2326893 C72,63.3382982 70.9446194,61.6037466 69.2624598,60.7440295 L50.3322837,51.036608 L50.3322835,51.0366079 C49.5291218,50.6249082 49.0240448,49.7962466 49.024903,48.8916436 L49.024903,48.4812278 C49.024903,47.8029608 49.3005955,47.1527756 49.7852106,46.6775603 L52.7941352,43.7376813 L52.7941354,43.7376811 C55.204308,41.3832325 56.5636029,38.151975 56.5633606,34.7776456 L56.5633606,28.0273769 L56.5633606,28.0273774 C56.5633606,21.3848531 51.1940878,16 44.5707524,16 L44.5707528,16 Z",
  id: "形状",
  fill: "#CCCCCC",
  fillRule: "nonzero",
  mask: "url(#mask-2)"
}))))));
var $l = {}, g8 = ht && ht.__importDefault || function(t) {
  return t && t.__esModule ? t : { default: t };
};
Object.defineProperty($l, "__esModule", { value: !0 });
var _l = $l.staged = void 0;
const y8 = g8(l);
function l1(t) {
  return typeof t == "function" ? y8.default.createElement(b8, { stage: t }) : t;
}
function b8(t) {
  const e = t.stage();
  return l1(e);
}
function w8(t) {
  return function(n, r) {
    const i = t(n, r);
    return l1(i);
  };
}
_l = $l.staged = w8;
function On(t) {
  return typeof t == "number" ? `${t}px` : t;
}
const E8 = (t) => {
  const e = V(null), [n] = O5(e);
  return X(() => {
    n && t.onActive();
  }, [n]), l.createElement("div", {
    ref: e
  });
}, Fi = Uf(Ne), C8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), x8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Oa = "adm-image", $8 = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Oa}-tip`
  }, l.createElement(C8, null)),
  fallback: l.createElement("div", {
    className: `${Oa}-tip`
  }, l.createElement(x8, null)),
  lazy: !1,
  draggable: !1
}, ao = _l((t) => {
  const e = U($8, t), [n, r] = K(!1), [i, a] = K(!1), o = V(null), s = V(null);
  let c = e.src, u = e.srcSet;
  const [f, d] = K(!e.lazy);
  c = f ? e.src : void 0, u = f ? e.srcSet : void 0, Fi(() => {
    r(!1), a(!1);
  }, [c]), X(() => {
    var p;
    !((p = s.current) === null || p === void 0) && p.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, e.fallback);
    const p = l.createElement("img", {
      ref: s,
      id: e.id,
      className: `${Oa}-img`,
      src: c,
      alt: e.alt,
      onClick: e.onClick,
      onLoad: (v) => {
        var y;
        r(!0), (y = e.onLoad) === null || y === void 0 || y.call(e, v);
      },
      onError: (v) => {
        var y;
        a(!0), (y = e.onError) === null || y === void 0 || y.call(e, v);
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
    return l.createElement(l.Fragment, null, !n && e.placeholder, p);
  }
  const b = {};
  return e.width && (b["--width"] = On(e.width), b.width = On(e.width)), e.height && (b["--height"] = On(e.height), b.height = On(e.height)), W(e, l.createElement("div", {
    ref: o,
    className: Oa,
    style: b,
    onClick: e.onContainerClick
  }, e.lazy && !f && l.createElement(E8, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), _8 = "adm-avatar", k8 = {
  fallback: l.createElement(p8, null),
  fit: "cover"
}, y_ = (t) => {
  const e = U(k8, t);
  return W(e, l.createElement(ao, {
    className: _8,
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
}, zn = "adm-badge", c1 = l.createElement(l.Fragment, null), O8 = (t) => {
  const {
    content: e,
    color: n,
    children: r
  } = t, i = e === c1, a = B(zn, {
    [`${zn}-fixed`]: !!r,
    [`${zn}-dot`]: i,
    [`${zn}-bordered`]: t.bordered
  }), o = e || e === 0 ? W(t, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${zn}-content`
  }, e))) : null;
  return r ? l.createElement("div", {
    className: B(`${zn}-wrapper`, t.wrapperClassName),
    style: t.wrapperStyle
  }, r, o) : o;
}, gs = le(O8, {
  dot: c1
}), S8 = "adm-dot-loading", F8 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, N8 = {
  color: "default"
}, u1 = Be((t) => {
  var e;
  const n = U(N8, t);
  return W(n, l.createElement("div", {
    style: {
      color: (e = F8[n.color]) !== null && e !== void 0 ? e : n.color
    },
    className: B("adm-loading", S8)
  }, l.createElement("svg", {
    height: "1em",
    viewBox: "0 0 100 40",
    style: {
      verticalAlign: "-0.125em"
    }
  }, l.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, l.createElement("g", {
    transform: "translate(-100.000000, -71.000000)"
  }, l.createElement("g", {
    transform: "translate(95.000000, 71.000000)"
  }, l.createElement("g", {
    transform: "translate(5.000000, 0.000000)"
  }, [0, 1, 2].map((r) => l.createElement("rect", {
    key: r,
    fill: "currentColor",
    x: 20 + r * 26,
    y: "16",
    width: "8",
    height: "8",
    rx: "2"
  }, l.createElement("animate", {
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
function f1(t) {
  return !!t && typeof t == "object" && typeof t.then == "function";
}
function P8() {
  return vr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const et = "adm-button", A8 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(u1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, jt = me((t, e) => {
  const n = U(A8, t), [r, i] = K(!1), a = V(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  we(e, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Se(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (f1(f))
      try {
        i(!0), yield f, i(!1);
      } catch (d) {
        throw i(!1), d;
      }
  });
  return W(n, l.createElement("button", {
    ref: a,
    type: n.type,
    onClick: c,
    className: B(et, {
      [`${et}-${n.color}`]: n.color,
      [`${et}-block`]: n.block,
      [`${et}-disabled`]: s,
      [`${et}-fill-outline`]: n.fill === "outline",
      [`${et}-fill-none`]: n.fill === "none",
      [`${et}-mini`]: n.size === "mini",
      [`${et}-small`]: n.size === "small",
      [`${et}-large`]: n.size === "large",
      [`${et}-loading`]: o
    }, `${et}-shape-${n.shape}`),
    disabled: s,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? l.createElement("div", {
    className: `${et}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : l.createElement("span", null, n.children)));
}), Ou = () => l.createElement("svg", {
  height: "1em",
  viewBox: "0 0 44 44"
}, l.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("g", {
  transform: "translate(-100.000000, -22.000000)"
}, l.createElement("g", {
  transform: "translate(100.000000, 22.000000)"
}, l.createElement("rect", {
  x: "0",
  y: "0",
  width: "44",
  height: "44"
}), l.createElement("g", {
  transform: "translate(12.000000, 4.000000)",
  fill: "currentColor",
  fillRule: "nonzero"
}, l.createElement("path", {
  d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
})))))), Su = () => l.createElement("svg", {
  height: "1em",
  viewBox: "0 0 44 44"
}, l.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("g", {
  transform: "translate(-24.000000, -22.000000)"
}, l.createElement("g", {
  transform: "translate(24.000000, 22.000000)"
}, l.createElement("rect", {
  x: "0",
  y: "0",
  width: "44",
  height: "44"
}), l.createElement("g", {
  transform: "translate(7.000000, 4.000000)",
  fill: "currentColor",
  fillRule: "nonzero"
}, l.createElement("path", {
  d: "M19.4833058,2.71985611 L3.53051139,17.0699744 C3.0173831,17.5315665 2.97522952,18.3220903 3.43630803,18.8357433 L3.43630796,18.8357432 C3.46601289,18.8688164 3.49745845,18.9002801 3.53051133,18.9300007 L19.4833057,33.2801611 C20.1234001,33.8559077 20.1759552,34.8420707 19.6007967,35.4827774 C19.0256382,36.1235263 18.0404824,36.1761351 17.400388,35.6003885 L1.44759367,21.2502703 L1.4475933,21.25027 C1.33208743,21.1463692 1.22220259,21.036372 1.11840792,20.920748 C-0.49302969,19.1256817 -0.345639536,16.3628317 1.4475933,14.7497465 L17.4003877,0.399628282 C18.0404821,-0.176160428 19.0256378,-0.123509422 19.6007963,0.517239417 C20.1759548,1.1579461 20.1233997,2.14410915 19.4833053,2.7198557 L19.4833058,2.71985611 Z"
}), l.createElement("path", {
  d: "M19.5305114,17.0699744 C19.0173831,17.5315665 18.9752295,18.3220903 19.436308,18.8357433 C19.4660129,18.8688164 19.4974585,18.9002801 19.5305113,18.9300007 L29.4833057,27.2801611 C30.1234001,27.8559077 30.1759552,28.8420707 29.6007967,29.4827774 C29.0256382,30.1235263 28.0404824,30.1761351 27.400388,29.6003885 L17.4475937,21.2502703 C17.3320874,21.1463692 17.2222026,21.036372 17.1184079,20.920748 C15.5069703,19.1256817 15.6543605,16.3628317 17.4475933,14.7497465 L27.4003877,6.39962828 C28.0404821,5.82383957 29.0256378,5.87649058 29.6007963,6.51723942 C30.1759548,7.1579461 30.1233997,8.14410915 29.4833053,8.7198557 L19.5305114,17.0699744 Z"
}))))));
var d1 = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ht, function() {
    var n = "day";
    return function(r, i, a) {
      var o = function(u) {
        return u.add(4 - u.isoWeekday(), n);
      }, s = i.prototype;
      s.isoWeekYear = function() {
        return o(this).year();
      }, s.isoWeek = function(u) {
        if (!this.$utils().u(u))
          return this.add(7 * (u - this.isoWeek()), n);
        var f, d, m, b, p = o(this), v = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), b = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (b += 7), m.add(b, n));
        return p.diff(v, "week") + 1;
      }, s.isoWeekday = function(u) {
        return this.$utils().u(u) ? this.day() || 7 : this.day(this.day() % 7 ? u : u - 7);
      };
      var c = s.startOf;
      s.startOf = function(u, f) {
        var d = this.$utils(), m = !!d.u(f) || f;
        return d.p(u) === "isoweek" ? m ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : c.bind(this)(u, f);
      };
    };
  });
})(d1);
var T8 = d1.exports;
const oo = /* @__PURE__ */ ct(T8);
function ae(t) {
  const {
    value: e,
    defaultValue: n,
    onChange: r
  } = t, i = Kf(), a = V(e !== void 0 ? e : n);
  e !== void 0 && (a.current = e);
  const o = Zt((s, c = !1) => {
    const u = typeof s == "function" ? s(a.current) : s;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function R8(t, e) {
  return t.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return e[r];
  });
}
function Fu(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function Mo(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(oo);
const pe = "adm-calendar", M8 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Ou, null),
  prevYearButton: l.createElement(Su, null),
  nextMonthButton: l.createElement(Ou, null),
  nextYearButton: l.createElement(Su, null)
}, b_ = me((t, e) => {
  const n = ve(), r = U(M8, t), {
    locale: i
  } = ye(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const h = a.pop();
    h && a.unshift(h);
  }
  const [o, s] = ae({
    value: r.value === void 0 ? void 0 : Fu(r.selectionMode, r.value),
    defaultValue: Fu(r.selectionMode, r.defaultValue),
    onChange: (h) => {
      var w, E;
      r.selectionMode === "single" ? (w = r.onChange) === null || w === void 0 || w.call(r, h ? h[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, h));
    }
  }), [c, u] = K(!1), [f, d] = K(() => ve(o ? o[0] : n).date(1));
  Qs(() => {
    var h;
    (h = r.onPageChange) === null || h === void 0 || h.call(r, f.year(), f.month() + 1);
  }, [f]), we(e, () => ({
    jumpTo: (h) => {
      let w;
      typeof h == "function" ? w = h({
        year: f.year(),
        month: f.month() + 1
      }) : w = h, d(Mo(w));
    },
    jumpToToday: () => {
      d(ve().date(1));
    }
  }));
  const m = (h, w, E) => {
    const x = f[h](w, E);
    if (h === "subtract" && r.minPage) {
      const $ = Mo(r.minPage);
      if (x.isBefore($, E))
        return;
    }
    if (h === "add" && r.maxPage) {
      const $ = Mo(r.maxPage);
      if (x.isAfter($, E))
        return;
    }
    d(x);
  }, b = l.createElement("div", {
    className: `${pe}-header`
  }, l.createElement("a", {
    className: `${pe}-arrow-button ${pe}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), l.createElement("a", {
    className: `${pe}-arrow-button ${pe}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), l.createElement("div", {
    className: `${pe}-title`
  }, R8(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), l.createElement("a", {
    className: B(`${pe}-arrow-button`, `${pe}-arrow-button-right`, `${pe}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), l.createElement("a", {
    className: B(`${pe}-arrow-button`, `${pe}-arrow-button-right`, `${pe}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), p = ie(() => r.max && ve(r.max), [r.max]), v = ie(() => r.min && ve(r.min), [r.min]);
  function y() {
    var h;
    const w = [];
    let E = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); w.length < 6 * 7; ) {
      const x = E;
      let $ = !1, N = !1, F = !1, k = !1, D = !1;
      if (o) {
        const [_, T] = o;
        N = x.isSame(_, "day"), F = x.isSame(T, "day"), $ = N || F || x.isAfter(_, "day") && x.isBefore(T, "day"), $ && (k = (w.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !N, D = (w.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !F);
      }
      const I = x.month() === f.month(), A = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : p && x.isAfter(p, "day") || v && x.isBefore(v, "day");
      w.push(l.createElement("div", {
        key: x.valueOf(),
        className: B(`${pe}-cell`, (A || !I) && `${pe}-cell-disabled`, I && {
          [`${pe}-cell-today`]: x.isSame(n, "day"),
          [`${pe}-cell-selected`]: $,
          [`${pe}-cell-selected-begin`]: N,
          [`${pe}-cell-selected-end`]: F,
          [`${pe}-cell-selected-row-begin`]: k,
          [`${pe}-cell-selected-row-end`]: D
        }),
        onClick: () => {
          if (!r.selectionMode || A)
            return;
          const _ = x.toDate();
          I || d(x.clone().date(1));
          function T() {
            if (!r.allowClear || !o)
              return !1;
            const [S, O] = o;
            return x.isSame(S, "date") && x.isSame(O, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && T()) {
              s(null);
              return;
            }
            s([_, _]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              s([_, _]), u(!0);
              return;
            }
            if (T()) {
              s(null), u(!1);
              return;
            }
            if (c) {
              const S = o[0];
              s(S > _ ? [_, S] : [S, _]), u(!1);
            } else
              s([_, _]), u(!0);
          }
        }
      }, l.createElement("div", {
        className: `${pe}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), l.createElement("div", {
        className: `${pe}-cell-bottom`
      }, (h = r.renderLabel) === null || h === void 0 ? void 0 : h.call(r, x.toDate())))), E = E.add(1, "day");
    }
    return w;
  }
  const g = l.createElement("div", {
    className: `${pe}-cells`
  }, y()), C = l.createElement("div", {
    className: `${pe}-mark`
  }, a.map((h, w) => l.createElement("div", {
    key: w,
    className: `${pe}-mark-cell`
  }, h)));
  return W(r, l.createElement("div", {
    className: pe
  }, b, C, g));
}), Hi = "adm-divider", I8 = {
  contentPosition: "center",
  direction: "horizontal"
}, ys = (t) => {
  const e = U(I8, t);
  return W(e, l.createElement("div", {
    className: B(Hi, `${Hi}-${e.direction}`, `${Hi}-${e.contentPosition}`)
  }, e.children && l.createElement("div", {
    className: `${Hi}-content`
  }, e.children)));
};
var m1 = { exports: {} };
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
})(m1);
var L8 = m1.exports;
const D8 = /* @__PURE__ */ ct(L8);
function Nu(t, e) {
  return t === void 0 || e === null ? null : Array.isArray(e) ? e : [e, e];
}
function V8(t) {
  return ve().year(t.year).month(t.month - 1).date(1);
}
ve.extend(oo);
ve.extend(D8);
const Oe = "adm-calendar-picker-view", j8 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, B8 = me((t, e) => {
  var n;
  const r = ve(), i = U(j8, t), {
    locale: a
  } = ye(), o = [...a.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const h = o.pop();
    h && o.unshift(h);
  }
  const [s, c] = ae({
    value: i.value === void 0 ? void 0 : Nu(i.selectionMode, i.value),
    defaultValue: Nu(i.selectionMode, i.defaultValue),
    onChange: (h) => {
      var w, E;
      i.selectionMode === "single" ? (w = i.onChange) === null || w === void 0 || w.call(i, h ? h[0] : null) : i.selectionMode === "range" && ((E = i.onChange) === null || E === void 0 || E.call(i, h));
    }
  }), [u, f] = K(!1), [d, m] = K(() => ve(s ? s[0] : r).date(1));
  we(e, () => ({
    jumpTo: (h) => {
      let w;
      typeof h == "function" ? w = h({
        year: d.year(),
        month: d.month() + 1
      }) : w = h, m(V8(w));
    },
    jumpToToday: () => {
      m(ve().date(1));
    },
    getDateRange: () => s
  }));
  const b = l.createElement("div", {
    className: `${Oe}-header`
  }, l.createElement("div", {
    className: `${Oe}-title`
  }, (n = i.title) !== null && n !== void 0 ? n : a.Calendar.title)), p = ie(() => i.max ? ve(i.max) : d.add(6, "month"), [i.max, d]), v = ie(() => i.min ? ve(i.min) : d, [i.min, d]);
  function y() {
    var h;
    const w = [];
    let E = v;
    for (; E.isSameOrBefore(p, "month"); ) {
      const x = E.year(), $ = E.month(), N = {
        year: x,
        month: $ + 1
      };
      w.push(l.createElement("div", {
        key: `${x}-${$}`
      }, l.createElement("div", {
        className: `${Oe}-title`
      }, (h = a.Calendar.yearAndMonth) === null || h === void 0 ? void 0 : h.replace(/\${(.*?)}/g, (F, k) => {
        var D;
        return (D = N[k]) === null || D === void 0 ? void 0 : D.toString();
      })), l.createElement("div", {
        className: `${Oe}-cells`
      }, Array(i.weekStartsOn === "Monday" ? E.date(1).isoWeekday() - 1 : E.date(1).isoWeekday()).fill(null).map((F, k) => l.createElement("div", {
        key: k,
        className: `${Oe}-cell`
      })), Array(E.daysInMonth()).fill(null).map((F, k) => {
        var D;
        const I = E.date(k + 1);
        let A = !1, _ = !1, T = !1, S = !1, O = !1;
        if (s) {
          const [M, j] = s;
          _ = I.isSame(M, "day"), T = I.isSame(j, "day"), A = _ || T || I.isAfter(M, "day") && I.isBefore(j, "day"), A && (S = (w.length % 7 === 0 || I.isSame(I.startOf("month"), "day")) && !_, O = (w.length % 7 === 6 || I.isSame(I.endOf("month"), "day")) && !T);
        }
        const R = i.shouldDisableDate ? i.shouldDisableDate(I.toDate()) : p && I.isAfter(p, "day") || v && I.isBefore(v, "day"), P = () => {
          var M;
          const j = (M = i.renderTop) === null || M === void 0 ? void 0 : M.call(i, I.toDate());
          if (j)
            return j;
          if (i.selectionMode === "range") {
            if (_)
              return a.Calendar.start;
            if (T)
              return a.Calendar.end;
          }
          if (I.isSame(r, "day") && !A)
            return a.Calendar.today;
        };
        return l.createElement("div", {
          key: I.valueOf(),
          className: B(`${Oe}-cell`, {
            [`${Oe}-cell-today`]: I.isSame(r, "day"),
            [`${Oe}-cell-selected`]: A,
            [`${Oe}-cell-selected-begin`]: _,
            [`${Oe}-cell-selected-end`]: T,
            [`${Oe}-cell-selected-row-begin`]: S,
            [`${Oe}-cell-selected-row-end`]: O,
            [`${Oe}-cell-disabled`]: !!R
          }),
          onClick: () => {
            if (!i.selectionMode || R)
              return;
            const M = I.toDate();
            function j() {
              if (!i.allowClear || !s)
                return !1;
              const [Z, q] = s;
              return I.isSame(Z, "date") && I.isSame(q, "day");
            }
            if (i.selectionMode === "single") {
              if (i.allowClear && j()) {
                c(null);
                return;
              }
              c([M, M]);
            } else if (i.selectionMode === "range") {
              if (!s) {
                c([M, M]), f(!0);
                return;
              }
              if (j()) {
                c(null), f(!1);
                return;
              }
              if (u) {
                const Z = s[0];
                c(Z > M ? [M, Z] : [Z, M]), f(!1);
              } else
                c([M, M]), f(!0);
            }
          }
        }, l.createElement("div", {
          className: `${Oe}-cell-top`
        }, P()), l.createElement("div", {
          className: `${Oe}-cell-date`
        }, i.renderDate ? i.renderDate(I.toDate()) : I.date()), l.createElement("div", {
          className: `${Oe}-cell-bottom`
        }, (D = i.renderBottom) === null || D === void 0 ? void 0 : D.call(i, I.toDate())));
      })))), E = E.add(1, "month");
    }
    return w;
  }
  const g = l.createElement("div", {
    className: `${Oe}-body`
  }, y()), C = l.createElement("div", {
    className: `${Oe}-mark`
  }, o.map((h, w) => l.createElement("div", {
    key: w,
    className: `${Oe}-mark-cell`
  }, h)));
  return W(i, l.createElement("div", {
    className: Oe
  }, b, C, g));
}), zi = "adm-calendar-picker", W8 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, w_ = me((t, e) => {
  const n = U(W8, t), {
    locale: r
  } = ye(), i = e ?? V(null), {
    visible: a,
    confirmText: o,
    popupClassName: s,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: b,
    onMaskClick: p,
    getContainer: v
  } = n, y = pr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), g = l.createElement("div", {
    className: `${zi}-footer`
  }, l.createElement(ys, null), l.createElement("div", {
    className: `${zi}-footer-bottom`
  }, l.createElement(jt, {
    color: "primary",
    onClick: () => {
      var C, h, w, E;
      const x = (h = (C = i.current) === null || C === void 0 ? void 0 : C.getDateRange()) !== null && h !== void 0 ? h : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, x ? x[0] : null) : n.selectionMode === "range" && ((E = n.onConfirm) === null || E === void 0 || E.call(n, x)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return W(n, l.createElement("div", {
    className: zi
  }, l.createElement(Fr, {
    visible: a,
    className: B(`${zi}-popup`, s),
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
  }, l.createElement(B8, Object.assign({
    ref: i
  }, y)), g)));
});
function Ni(t, e) {
  const n = Zt(t);
  Ne(() => {
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
function kl(t, e, n) {
  const r = Zt(t);
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
function ke(t, e, n) {
  let r = t;
  return e !== void 0 && (r = Math.max(t, e)), n !== void 0 && (r = Math.min(r, n)), r;
}
const h1 = (t, e) => {
  const [{
    scrollLeft: n
  }, r] = Te(() => ({
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
    const v = ke(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: v,
      from: {
        scrollLeft: b
      },
      immediate: a && !n.isAnimating
    });
  }
  return Ne(() => {
    i(!0);
  }, []), Fi(() => {
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
}, Ui = "adm-scroll-mask", v1 = (t) => {
  const e = V(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Te(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: a
  } = za((o = !1) => {
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
  }, []), l.createElement(l.Fragment, null, l.createElement(ge.div, {
    ref: e,
    className: B(Ui, `${Ui}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(ge.div, {
    className: B(Ui, `${Ui}-right`),
    style: {
      opacity: r
    }
  }));
};
var p1 = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ol = Symbol.for("react.element"), Sl = Symbol.for("react.portal"), so = Symbol.for("react.fragment"), lo = Symbol.for("react.strict_mode"), co = Symbol.for("react.profiler"), uo = Symbol.for("react.provider"), fo = Symbol.for("react.context"), Z8 = Symbol.for("react.server_context"), mo = Symbol.for("react.forward_ref"), ho = Symbol.for("react.suspense"), vo = Symbol.for("react.suspense_list"), po = Symbol.for("react.memo"), go = Symbol.for("react.lazy"), H8 = Symbol.for("react.offscreen"), g1;
g1 = Symbol.for("react.module.reference");
function ut(t) {
  if (typeof t == "object" && t !== null) {
    var e = t.$$typeof;
    switch (e) {
      case Ol:
        switch (t = t.type, t) {
          case so:
          case co:
          case lo:
          case ho:
          case vo:
            return t;
          default:
            switch (t = t && t.$$typeof, t) {
              case Z8:
              case fo:
              case mo:
              case go:
              case po:
              case uo:
                return t;
              default:
                return e;
            }
        }
      case Sl:
        return e;
    }
  }
}
ue.ContextConsumer = fo;
ue.ContextProvider = uo;
ue.Element = Ol;
ue.ForwardRef = mo;
ue.Fragment = so;
ue.Lazy = go;
ue.Memo = po;
ue.Portal = Sl;
ue.Profiler = co;
ue.StrictMode = lo;
ue.Suspense = ho;
ue.SuspenseList = vo;
ue.isAsyncMode = function() {
  return !1;
};
ue.isConcurrentMode = function() {
  return !1;
};
ue.isContextConsumer = function(t) {
  return ut(t) === fo;
};
ue.isContextProvider = function(t) {
  return ut(t) === uo;
};
ue.isElement = function(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ol;
};
ue.isForwardRef = function(t) {
  return ut(t) === mo;
};
ue.isFragment = function(t) {
  return ut(t) === so;
};
ue.isLazy = function(t) {
  return ut(t) === go;
};
ue.isMemo = function(t) {
  return ut(t) === po;
};
ue.isPortal = function(t) {
  return ut(t) === Sl;
};
ue.isProfiler = function(t) {
  return ut(t) === co;
};
ue.isStrictMode = function(t) {
  return ut(t) === lo;
};
ue.isSuspense = function(t) {
  return ut(t) === ho;
};
ue.isSuspenseList = function(t) {
  return ut(t) === vo;
};
ue.isValidElementType = function(t) {
  return typeof t == "string" || typeof t == "function" || t === so || t === co || t === lo || t === ho || t === vo || t === H8 || typeof t == "object" && t !== null && (t.$$typeof === go || t.$$typeof === po || t.$$typeof === uo || t.$$typeof === fo || t.$$typeof === mo || t.$$typeof === g1 || t.getModuleId !== void 0);
};
ue.typeOf = ut;
p1.exports = ue;
var Sa = p1.exports;
function dn(t, e) {
  let n = 0;
  function r(i) {
    l.Children.forEach(i, (a) => {
      Sa.isFragment(a) ? r(a.props.children) : (e(a, n), n += 1);
    });
  }
  r(t);
}
const Ut = "adm-capsule-tabs", z8 = () => null, U8 = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  dn(t.children, (d, m) => {
    if (!Dn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const p = o.push(d);
    i[b] = p - 1;
  });
  const [s, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = h1(n, i[s]);
  return Ni(() => {
    f(!0);
  }, r), W(t, l.createElement("div", {
    className: Ut,
    ref: r
  }, l.createElement("div", {
    className: `${Ut}-header`
  }, l.createElement(v1, {
    scrollTrackRef: n
  }), l.createElement(ge.div, {
    className: `${Ut}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, l.createElement("div", {
    key: d.key,
    className: `${Ut}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${Ut}-tab`, {
      [`${Ut}-tab-active`]: d.key === s,
      [`${Ut}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === s;
    return l.createElement(Or, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Ut}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, E_ = le(U8, {
  Tab: z8
}), qi = "adm-card", C_ = (t) => {
  const e = () => t.title || t.extra ? l.createElement("div", {
    className: B(`${qi}-header`, t.headerClassName),
    style: t.headerStyle,
    onClick: t.onHeaderClick
  }, l.createElement("div", {
    className: `${qi}-header-title`
  }, t.title), t.extra) : null, n = () => t.children ? l.createElement("div", {
    className: B(`${qi}-body`, t.bodyClassName),
    style: t.bodyStyle,
    onClick: t.onBodyClick
  }, t.children) : null;
  return W(t, l.createElement("div", {
    className: qi,
    onClick: t.onClick
  }, e(), n()));
};
function Pu(t, e, n) {
  return t * e * n / (e + n * t);
}
function hi(t, e, n, r, i = 0.15) {
  return i === 0 ? ke(t, e, n) : t < e ? -Pu(e - t, r, i) + e : t > n ? +Pu(t - n, r, i) + n : t;
}
function y1(t) {
  if (t == null || t === "")
    return 0;
  const e = t.trim();
  return e.endsWith("px") ? parseFloat(e) : e.endsWith("rem") ? parseFloat(e) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : e.endsWith("vw") ? parseFloat(e) * window.innerWidth / 100 : 0;
}
const Nt = "adm-picker-view", b1 = Be((t) => {
  const {
    value: e,
    column: n,
    renderLabel: r
  } = t;
  function i(g) {
    t.onSelect(g, t.index);
  }
  const [{
    y: a
  }, o] = Te(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), s = V(!1), c = V(null), u = V(null), f = V(34);
  Ne(() => {
    const g = u.current;
    g && (f.current = y1(window.getComputedStyle(g).getPropertyValue("height")));
  }), Ne(() => {
    if (s.current || e === null)
      return;
    const g = n.findIndex((h) => h.value === e);
    if (g < 0)
      return;
    const C = g * -f.current;
    o.start({
      y: C,
      immediate: a.goal !== C
    });
  }, [e, n]), Ne(() => {
    if (n.length === 0)
      e !== null && i(null);
    else if (!n.some((g) => g.value === e)) {
      const g = n[0];
      i(g.value);
    }
  }, [n, e]);
  function d(g) {
    const C = g * -f.current;
    o.start({
      y: C
    });
    const h = n[g];
    h && i(h.value);
  }
  const m = (g) => {
    const {
      direction: [, C],
      distance: [, h],
      velocity: [, w],
      offset: [, E],
      last: x
    } = g;
    return {
      direction: C,
      distance: h,
      velocity: w,
      offset: E,
      last: x
    };
  }, b = (g) => {
    s.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: w,
      last: E,
      velocity: x,
      offset: $
    } = m(g);
    if (E) {
      s.current = !1;
      const N = $ + x * w * 50, F = ke(N, C, h), k = -Math.round(F / f.current);
      d(k);
    } else {
      const N = $;
      o.start({
        y: hi(N, C, h, f.current * 50, 0.2)
      });
    }
  }, p = (g) => {
    s.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: w,
      last: E,
      velocity: x,
      distance: $
    } = m(g), N = -w, F = a.get();
    if (E) {
      s.current = !1;
      const k = x * N * 50, D = F + $ * N + k, I = ke(D, C, h), A = -Math.round(I / f.current);
      d(A);
    } else {
      const k = F + $ * N;
      o.start({
        y: hi(k, C, h, f.current * 50, 0.2)
      });
    }
  };
  Ft((g) => {
    g.event.stopPropagation(), b(g);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), n8((g) => {
    g.event.stopPropagation(), p(g);
  }, {
    target: t.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Tn ? {
      passive: !1
    } : void 0
  });
  let v = null;
  function y() {
    if (v === null)
      return null;
    const g = n[v], C = v - 1, h = v + 1, w = n[C], E = n[h];
    return l.createElement("div", {
      className: `${Nt}-column-accessible`
    }, l.createElement("div", {
      className: `${Nt}-column-accessible-current`,
      role: "button",
      "aria-label": g ? `当前选择的是：${g.label}` : "当前未选择"
    }, "-"), l.createElement("div", {
      className: `${Nt}-column-accessible-button`,
      onClick: () => {
        w && d(C);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择上一项：${w.label}` : "没有上一项"
    }, "-"), l.createElement("div", {
      className: `${Nt}-column-accessible-button`,
      onClick: () => {
        E && d(h);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择下一项：${E.label}` : "没有下一项"
    }, "-"));
  }
  return l.createElement("div", {
    className: `${Nt}-column`
  }, l.createElement("div", {
    className: `${Nt}-item-height-measure`,
    ref: u
  }), l.createElement(ge.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${Nt}-column-wheel`,
    "aria-hidden": !0
  }, n.map((g, C) => {
    var h;
    const w = t.value === g.value;
    w && (v = C);
    function E() {
      s.current = !1, d(C);
    }
    return l.createElement("div", {
      key: (h = g.key) !== null && h !== void 0 ? h : g.value,
      "data-selected": g.value === e,
      className: `${Nt}-column-item`,
      onClick: E,
      "aria-hidden": !w,
      "aria-label": w ? "active" : ""
    }, l.createElement("div", {
      className: `${Nt}-column-item-label`
    }, r(g)));
  })), y());
}, (t, e) => !(t.index !== e.index || t.value !== e.value || t.onSelect !== e.onSelect || t.renderLabel !== e.renderLabel || t.mouseWheel !== e.mouseWheel || !_5(t.column, e.column)));
b1.displayName = "Wheel";
function Au(t) {
  let e = null;
  return () => (e === null && (e = t()), e);
}
function w1(t, e) {
  const n = Au(() => (typeof t == "function" ? t(e) : t).map((o) => o.map((s) => typeof s == "string" ? {
    label: s,
    value: s
  } : s))), r = Au(() => e.map((a, o) => {
    var s;
    const c = n()[o];
    return c && (s = c.find((u) => u.value === a)) !== null && s !== void 0 ? s : null;
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
function E1(t, e) {
  return ie(() => w1(t, e), [t, e]);
}
const C1 = (t) => t.label;
var x1 = { exports: {} }, $1 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ur = l;
function q8(t, e) {
  return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
}
var K8 = typeof Object.is == "function" ? Object.is : q8, G8 = ur.useState, Y8 = ur.useEffect, X8 = ur.useLayoutEffect, Q8 = ur.useDebugValue;
function J8(t, e) {
  var n = e(), r = G8({ inst: { value: n, getSnapshot: e } }), i = r[0].inst, a = r[1];
  return X8(function() {
    i.value = n, i.getSnapshot = e, Io(i) && a({ inst: i });
  }, [t, n, e]), Y8(function() {
    return Io(i) && a({ inst: i }), t(function() {
      Io(i) && a({ inst: i });
    });
  }, [t]), Q8(n), n;
}
function Io(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !K8(t, n);
  } catch {
    return !0;
  }
}
function e9(t, e) {
  return e();
}
var t9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? e9 : J8;
$1.useSyncExternalStore = ur.useSyncExternalStore !== void 0 ? ur.useSyncExternalStore : t9;
x1.exports = $1;
var n9 = x1.exports;
let Fl = !1;
const bs = /* @__PURE__ */ new Set();
function _1() {
  bs.forEach((t) => {
    t();
  });
}
function x_() {
  Fl = !0, _1(), st.assign({
    skipAnimation: !0
  });
}
function $_() {
  Fl = !1, _1(), st.assign({
    skipAnimation: !1
  });
}
function Tu() {
  return Fl;
}
function r9(t) {
  return bs.add(t), () => {
    bs.delete(t);
  };
}
function i9() {
  return n9.useSyncExternalStore(r9, Tu, Tu);
}
const Lo = "adm-spin-loading", a9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, o9 = {
  color: "default"
}, s9 = 15 * 3.14159265358979 * 2, Nl = Be((t) => {
  var e;
  const n = U(o9, t), r = i9(), {
    percent: i
  } = Te({
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
  return W(n, l.createElement(ge.div, {
    className: Lo,
    style: {
      "--color": (e = a9[n.color]) !== null && e !== void 0 ? e : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${Lo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(ge.circle, {
    className: `${Lo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: s9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), tr = "adm-picker-view", l9 = {
  defaultValue: [],
  renderLabel: C1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${tr}-loading-content`
  }, l.createElement(Nl, null))
}, yo = Be((t) => {
  const e = U(l9, t), [n, r] = K(e.value === void 0 ? e.defaultValue : e.value);
  X(() => {
    e.value !== void 0 && e.value !== n && r(e.value);
  }, [e.value]), X(() => {
    if (e.value === n)
      return;
    const s = window.setTimeout(() => {
      e.value !== void 0 && e.value !== n && r(e.value);
    }, 1e3);
    return () => {
      window.clearTimeout(s);
    };
  }, [e.value, n]);
  const i = E1(e.columns, n), a = i.columns;
  M3(() => {
    var s;
    e.value !== n && ((s = e.onChange) === null || s === void 0 || s.call(e, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = Ue((s, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = s, f;
    });
  }, []);
  return W(e, l.createElement("div", {
    className: `${tr}`
  }, e.loading ? e.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(b1, {
    key: c,
    index: c,
    column: s,
    value: n[c],
    onSelect: o,
    renderLabel: e.renderLabel,
    mouseWheel: e.mouseWheel
  })), l.createElement("div", {
    className: `${tr}-mask`
  }, l.createElement("div", {
    className: `${tr}-mask-top`
  }), l.createElement("div", {
    className: `${tr}-mask-middle`
  }), l.createElement("div", {
    className: `${tr}-mask-bottom`
  })))));
});
yo.displayName = "PickerView";
const qt = "adm-picker", c9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: C1,
  destroyOnClose: !1,
  forceRender: !1
}, Pl = Be(me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U(c9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, t), [a, o] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (y) => {
      var g;
      y === !1 && ((g = i.onClose) === null || g === void 0 || g.call(i));
    }
  }), s = {
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
  we(e, () => s);
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (y) => {
      var g;
      const C = w1(i.columns, y);
      (g = i.onConfirm) === null || g === void 0 || g.call(i, y, C);
    }
  })), f = E1(i.columns, c), [d, m] = K(c);
  X(() => {
    d !== c && m(c);
  }, [a]), X(() => {
    a || m(c);
  }, [c]);
  const b = Zt((y, g) => {
    var C;
    m(y), a && ((C = i.onSelect) === null || C === void 0 || C.call(i, y, g));
  }), p = W(i, l.createElement("div", {
    className: qt
  }, l.createElement("div", {
    className: `${qt}-header`
  }, l.createElement("a", {
    role: "button",
    className: `${qt}-header-button`,
    onClick: () => {
      var y;
      (y = i.onCancel) === null || y === void 0 || y.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${qt}-header-title`
  }, i.title), l.createElement("a", {
    role: "button",
    className: B(`${qt}-header-button`, i.loading && `${qt}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), l.createElement("div", {
    className: `${qt}-body`
  }, l.createElement(yo, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: b
  })))), v = l.createElement(Fr, {
    style: i.popupStyle,
    className: B(`${qt}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var y;
      i.closeOnMaskClick && ((y = i.onCancel) === null || y === void 0 || y.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, p, l.createElement(Nr, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, s));
}));
Pl.displayName = "Picker";
function u9(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), l.createElement(Pl, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, s), e(o);
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
    }, r = Si(l.createElement(n, null));
  });
}
const k1 = le(Pl, {
  prompt: u9
});
function O1(t) {
  const e = ie(() => {
    let n = 0;
    function r(i, a) {
      a > n && (n = a);
      const o = a + 1;
      i.forEach((s) => {
        s.children && r(s.children, o);
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
      const o = n[a], s = i.find((c) => c.value === o);
      if (!s || !s.children)
        break;
      i = s.children, a++;
    }
    for (; a < e - 1; )
      r.push([]), a++;
    return r;
  };
}
const S1 = me((t, e) => {
  const {
    options: n
  } = t, r = pr(t, ["options"]), i = O1(n);
  return l.createElement(k1, Object.assign({}, r, {
    ref: e,
    columns: i
  }));
});
function f9(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), l.createElement(S1, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, s), e(o);
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
    }, r = Si(l.createElement(n, null));
  });
}
const __ = le(S1, {
  prompt: f9
}), k_ = (t) => {
  const {
    options: e
  } = t, n = pr(t, ["options"]), r = O1(e);
  return l.createElement(yo, Object.assign({}, n, {
    columns: r
  }));
}, We = "adm-tabs", d9 = () => null, m9 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, h9 = (t) => {
  var e;
  const n = U(m9, t), r = V(null), i = V(null), a = {};
  let o = null;
  const s = [], c = n.direction === "rtl";
  dn(n.children, (E, x) => {
    if (!Dn(E))
      return;
    const $ = E.key;
    if (typeof $ != "string")
      return;
    x === 0 && (o = $);
    const N = s.push(E);
    a[$] = N - 1;
  });
  const [u, f] = ae({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : o,
    onChange: (E) => {
      var x;
      E !== null && ((x = n.onChange) === null || x === void 0 || x.call(n, E));
    }
  }), [{
    x: d,
    width: m
  }, b] = Te(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: p
  }, v] = Te(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: y,
    rightMaskOpacity: g
  }, C] = Te(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function h(E = !1, x = !1) {
    const $ = r.current;
    if (!$)
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
    const k = $.children.item(N + 1), D = k.children.item(0), I = D.offsetLeft, A = D.offsetWidth, _ = k.offsetLeft, T = k.offsetWidth, S = $.offsetWidth, O = $.scrollWidth, R = $.scrollLeft, P = F.offsetWidth;
    let M = 0, j = 0;
    if (n.activeLineMode === "auto" ? (M = I, j = A) : n.activeLineMode === "full" ? (M = _, j = T) : M = I + (A - P) / 2, c) {
      const G = ["auto", "full"].includes(n.activeLineMode) ? j : P;
      M = -(S - M - G);
    }
    b.start({
      x: M,
      width: j,
      immediate: E
    });
    const Z = O - S;
    if (Z <= 0)
      return;
    let q = 0;
    c ? q = -ke(S / 2 - I + A / 2 - P, 0, Z) : q = ke(I - (S - A) / 2, 0, Z), (!x || n.autoScroll !== !1) && v.start({
      scrollLeft: q,
      from: {
        scrollLeft: R
      },
      immediate: E
    });
  }
  Ne(() => {
    h(!d.isAnimating);
  }, []), Fi(() => {
    h();
  }, [u]), Ni(() => {
    h(!d.isAnimating);
  }, r), kl(() => {
    h(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: w
  } = za((E = !1) => {
    const x = r.current;
    if (!x)
      return;
    const $ = x.scrollLeft;
    let N = !1, F = !1;
    c ? (N = Math.round(-$) + x.offsetWidth < x.scrollWidth, F = $ < 0) : (N = $ > 0, F = $ + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: N ? 1 : 0,
      rightMaskOpacity: F ? 1 : 0,
      immediate: E
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Ne(() => {
    w(!0);
  }, []), W(n, l.createElement("div", {
    className: We,
    style: {
      direction: n.direction
    }
  }, l.createElement("div", {
    className: `${We}-header`
  }, l.createElement(ge.div, {
    className: B(`${We}-header-mask`, `${We}-header-mask-left`),
    style: {
      opacity: y
    }
  }), l.createElement(ge.div, {
    className: B(`${We}-header-mask`, `${We}-header-mask-right`),
    style: {
      opacity: g
    }
  }), l.createElement(ge.div, {
    className: `${We}-tab-list`,
    ref: r,
    scrollLeft: p,
    onScroll: w,
    role: "tablist"
  }, l.createElement(ge.div, {
    ref: i,
    className: `${We}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), s.map((E) => W(E.props, l.createElement("div", {
    key: E.key,
    className: B(`${We}-tab-wrapper`, {
      [`${We}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: x
      } = E;
      E.props.disabled || x != null && f(x.toString());
    },
    className: B(`${We}-tab`, {
      [`${We}-tab-active`]: E.key === u,
      [`${We}-tab-disabled`]: E.props.disabled
    }),
    role: "tab",
    "aria-selected": E.key === u
  }, E.props.title)))))), s.map((E) => {
    if (E.props.children === void 0)
      return null;
    const x = E.key === u;
    return l.createElement(Or, {
      key: E.key,
      active: x,
      forceRender: E.props.forceRender,
      destroyOnClose: E.props.destroyOnClose
    }, l.createElement("div", {
      className: `${We}-content`,
      style: {
        display: x ? "block" : "none"
      }
    }, E.props.children));
  })));
}, Ru = le(h9, {
  Tab: d9
}), Dr = "adm-list", v9 = {
  mode: "default"
}, p9 = me((t, e) => {
  const n = U(v9, t), r = V(null);
  return we(e, () => ({
    get nativeElement() {
      return r.current;
    }
  })), W(n, l.createElement("div", {
    className: B(Dr, `${Dr}-${n.mode}`),
    ref: r
  }, n.header && l.createElement("div", {
    className: `${Dr}-header`
  }, n.header), l.createElement("div", {
    className: `${Dr}-body`
  }, l.createElement("div", {
    className: `${Dr}-body-inner`
  }, n.children))));
});
function Dt(t) {
  return t != null && t !== !1;
}
const Pt = "adm-list-item", g9 = (t) => {
  var e;
  const n = (e = t.clickable) !== null && e !== void 0 ? e : !!t.onClick, r = t.arrow === void 0 ? n : t.arrow, i = l.createElement("div", {
    className: `${Pt}-content`
  }, Dt(t.prefix) && l.createElement("div", {
    className: `${Pt}-content-prefix`
  }, t.prefix), l.createElement("div", {
    className: `${Pt}-content-main`
  }, Dt(t.title) && l.createElement("div", {
    className: `${Pt}-title`
  }, t.title), t.children, Dt(t.description) && l.createElement("div", {
    className: `${Pt}-description`
  }, t.description)), Dt(t.extra) && l.createElement("div", {
    className: `${Pt}-content-extra`
  }, t.extra), Dt(r) && l.createElement("div", {
    className: `${Pt}-content-arrow`
  }, r === !0 ? l.createElement(ty, null) : r));
  return W(t, l.createElement(n ? "a" : "div", {
    className: B(`${Pt}`, n ? ["adm-plain-anchor"] : [], t.disabled && `${Pt}-disabled`),
    onClick: t.disabled ? void 0 : t.onClick
  }, i));
}, $t = le(p9, {
  Item: g9
}), F1 = Hs(null), y9 = "adm-check-list", b9 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(Hd, null)
}, w9 = (t) => {
  const e = U(b9, t), [n, r] = ae(e);
  function i(f) {
    e.multiple ? r([...n, f]) : r([f]);
  }
  function a(f) {
    r(n.filter((d) => d !== f));
  }
  const {
    activeIcon: o,
    extra: s,
    disabled: c,
    readOnly: u
  } = e;
  return l.createElement(F1.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: a,
      activeIcon: o,
      extra: s,
      disabled: c,
      readOnly: u
    }
  }, W(e, l.createElement($t, {
    mode: e.mode,
    className: y9
  }, e.children)));
}, Ki = "adm-check-list-item", E9 = (t) => {
  const e = ot(F1);
  if (e === null)
    return null;
  const n = e.value.includes(t.value), r = t.readOnly || e.readOnly, i = n ? e.activeIcon : null, a = e.extra ? e.extra(n) : i, o = l.createElement("div", {
    className: `${Ki}-extra`
  }, a);
  return W(t, l.createElement($t.Item, {
    title: t.title,
    className: B(Ki, r && `${Ki}-readonly`, n && `${Ki}-active`),
    description: t.description,
    prefix: t.prefix,
    onClick: (s) => {
      var c;
      r || (n ? e.uncheck(t.value) : e.check(t.value), (c = t.onClick) === null || c === void 0 || c.call(t, s));
    },
    arrow: !1,
    clickable: !r,
    extra: o,
    disabled: t.disabled || e.disabled
  }, t.children));
}, Mu = le(w9, {
  Item: E9
});
var N1 = nl, C9 = "Expected a function";
function Al(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(C9);
  var n = function() {
    var r = arguments, i = e ? e.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = t.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Al.Cache || N1)(), n;
}
Al.Cache = N1;
var x9 = Al;
const Iu = /* @__PURE__ */ ct(x9);
function P1(t, e) {
  const {
    valueName: n,
    childrenName: r
  } = e, i = ie(() => Iu((s) => {
    const c = [];
    let u = t;
    for (const f of s) {
      const d = u.find((m) => m[n] === f);
      if (!d || (c.push(d), !d[r]))
        break;
      u = d[r];
    }
    return c;
  }, (s) => JSON.stringify(s)), [t]), a = ie(() => Iu((s) => s.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, t).length === 0, (s) => JSON.stringify(s)), [t]);
  function o(s) {
    return {
      get items() {
        return i(s);
      },
      get isLeaf() {
        return a(s);
      }
    };
  }
  return o;
}
const Tl = [];
function $9(t, e) {
  const n = [];
  for (let r = t; r <= e; r++)
    n.push(r);
  return n;
}
const vi = "adm-skeleton", Rl = (t) => W(t, l.createElement("div", {
  className: B(vi, {
    [`${vi}-animated`]: t.animated
  })
})), _9 = (t) => W(t, l.createElement(Rl, {
  animated: t.animated,
  className: `${vi}-title`
})), k9 = {
  lineCount: 3
}, O9 = (t) => {
  const e = U(k9, t), n = $9(1, e.lineCount), r = l.createElement("div", {
    className: `${vi}-paragraph`
  }, n.map((i) => l.createElement(Rl, {
    key: i,
    animated: e.animated,
    className: `${vi}-paragraph-line`
  })));
  return W(e, r);
}, Gi = le(Rl, {
  Title: _9,
  Paragraph: O9
}), Pi = (t = {}) => ie(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = t;
  return [n, r, a, i];
}, [JSON.stringify(t)]), dt = "adm-cascader-view", S9 = {
  defaultValue: []
}, F9 = (t) => {
  const e = U(S9, t), {
    locale: n
  } = ye(), [r, i, a, o] = Pi(e.fieldNames), s = P1(e.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = ae(Object.assign(Object.assign({}, e), {
    onChange: (y) => {
      var g;
      (g = e.onChange) === null || g === void 0 || g.call(e, y, s(y));
    }
  })), [f, d] = K(0), m = ie(() => {
    const y = [];
    let g = e.options, C = !1;
    for (const h of c) {
      const w = g.find((E) => E[i] === h);
      if (y.push({
        selected: w,
        options: g
      }), !w || !w[a]) {
        C = !0;
        break;
      }
      g = w[a];
    }
    return C || y.push({
      selected: void 0,
      options: g
    }), y;
  }, [c, e.options]);
  Qs(() => {
    var y;
    (y = e.onTabsChange) === null || y === void 0 || y.call(e, f);
  }, [f]), X(() => {
    d(m.length - 1);
  }, [c]), X(() => {
    const y = m.length - 1;
    f > y && d(y);
  }, [f, m]);
  const b = (y, g) => {
    const C = c.slice(0, g);
    y !== void 0 && (C[g] = y), u(C);
  }, p = (y) => e.loading || y === Tl, v = e.placeholder || n.Cascader.placeholder;
  return W(e, l.createElement("div", {
    className: dt
  }, l.createElement(Ru, {
    activeKey: f.toString(),
    onChange: (y) => {
      const g = parseInt(y);
      d(g);
    },
    stretch: !1,
    className: `${dt}-tabs`
  }, m.map((y, g) => {
    const C = y.selected;
    return l.createElement(Ru.Tab, {
      key: g.toString(),
      title: l.createElement("div", {
        className: `${dt}-header-title`
      }, C ? C[r] : typeof v == "function" ? v(g) : v),
      forceRender: !0
    }, l.createElement("div", {
      className: `${dt}-content`
    }, p(y.options) ? l.createElement("div", {
      className: `${dt}-skeleton`
    }, l.createElement(Gi, {
      className: `${dt}-skeleton-line-1`,
      animated: !0
    }), l.createElement(Gi, {
      className: `${dt}-skeleton-line-2`,
      animated: !0
    }), l.createElement(Gi, {
      className: `${dt}-skeleton-line-3`,
      animated: !0
    }), l.createElement(Gi, {
      className: `${dt}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(Mu, {
      value: [c[g]],
      onChange: (h) => b(h[0], g),
      activeIcon: e.activeIcon
    }, y.options.map((h) => {
      const w = c[g] === h[i];
      return l.createElement(Mu.Item, {
        value: h[i],
        key: h[i],
        disabled: h[o],
        className: B(`${dt}-item`, {
          [`${dt}-item-active`]: w
        })
      }, h[r]);
    }))));
  }))));
}, N9 = le(F9, {
  optionSkeleton: Tl
}), Un = "adm-cascader", P9 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, A1 = me((t, e) => {
  var n;
  const {
    locale: r
  } = ye(), i = U(P9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, t), [a, o] = ae({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var C;
      g === !1 && ((C = i.onClose) === null || C === void 0 || C.call(i));
    }
  }), s = {
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
  we(e, () => s);
  const [c, u] = ae(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, g, m(g));
    }
  })), [, f, d] = Pi(i.fieldNames), m = P1(i.options, {
    valueName: f,
    childrenName: d
  }), [b, p] = K(c);
  X(() => {
    a || p(c);
  }, [a, c]);
  const v = W(i, l.createElement("div", {
    className: Un
  }, l.createElement("div", {
    className: `${Un}-header`
  }, l.createElement("a", {
    className: `${Un}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${Un}-header-title`
  }, i.title), l.createElement("a", {
    className: `${Un}-header-button`,
    onClick: () => {
      u(b, !0), o(!1);
    }
  }, i.confirmText)), l.createElement("div", {
    className: `${Un}-body`
  }, l.createElement(N9, Object.assign({}, i, {
    value: b,
    onChange: (g, C) => {
      var h;
      p(g), a && ((h = i.onSelect) === null || h === void 0 || h.call(i, g, C));
    }
  }))))), y = l.createElement(Fr, {
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    forceRender: i.forceRender,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    stopPropagation: i.stopPropagation
  }, v);
  return l.createElement(l.Fragment, null, y, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, s));
});
function A9(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), l.createElement(A1, Object.assign({}, t, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = t.onConfirm) === null || c === void 0 || c.call(t, o, s), e(o);
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
    }, r = Si(l.createElement(n, null));
  });
}
const O_ = le(A1, {
  prompt: A9,
  optionSkeleton: Tl
}), Vr = "adm-center-popup", T9 = Object.assign(Object.assign({}, wl), {
  getContainer: null
}), T1 = (t) => {
  const e = U(T9, t), n = rl(), r = Te({
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
  Ne(() => {
    e.visible && a(!0);
  }, [e.visible]);
  const o = V(null);
  Ua(o, e.disableBodyScroll && i);
  const s = Gd(i && e.visible), c = l.createElement("div", {
    className: B(`${Vr}-body`, e.bodyClassName),
    style: e.bodyStyle
  }, e.children), u = on(e.stopPropagation, W(e, l.createElement("div", {
    className: Vr,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, e.mask && l.createElement(_i, {
    visible: s,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose,
    onMaskClick: (f) => {
      var d, m;
      (d = e.onMaskClick) === null || d === void 0 || d.call(e, f), e.closeOnMaskClick && ((m = e.onClose) === null || m === void 0 || m.call(e));
    },
    style: e.maskStyle,
    className: B(`${Vr}-mask`, e.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: e.stopPropagation
  }), l.createElement("div", {
    className: `${Vr}-wrap`,
    role: e.role,
    "aria-label": e["aria-label"]
  }, l.createElement(ge.div, {
    style: Object.assign(Object.assign({}, r), {
      pointerEvents: r.opacity.to((f) => f === 1 ? "unset" : "none")
    }),
    ref: o
  }, e.showCloseButton && l.createElement("a", {
    className: B(`${Vr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var f;
      (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, l.createElement(ki, null)), c)))));
  return l.createElement(Or, {
    active: i,
    forceRender: e.forceRender,
    destroyOnClose: e.destroyOnClose
  }, kr(e.getContainer, u));
}, R1 = Hs(null), R9 = {
  disabled: !1,
  defaultValue: []
}, M9 = (t) => {
  const e = U(R9, t), [n, r] = ae(e);
  return l.createElement(
    R1.Provider,
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
}, M1 = Be((t) => W(t, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), I9 = Be((t) => W(t, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), I1 = (t) => {
  const e = V(null), n = Zt((r) => {
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
  }, [t.disabled, t.onChange]), l.createElement("input", {
    ref: e,
    type: t.type,
    checked: t.checked,
    onChange: () => {
    },
    disabled: t.disabled,
    id: t.id
  });
}, Kt = "adm-checkbox", L9 = {
  defaultChecked: !1,
  indeterminate: !1
}, D9 = me((t, e) => {
  const n = ot(R1), r = U(L9, t);
  let [i, a] = ae({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), o = r.disabled;
  const {
    value: s
  } = r;
  n && s !== void 0 && (i = n.value.includes(s), a = (u) => {
    var f;
    u ? n.check(s) : n.uncheck(s), (f = r.onChange) === null || f === void 0 || f.call(r, u);
  }, o = o || n.disabled), we(e, () => ({
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
  const c = () => r.icon ? l.createElement("div", {
    className: `${Kt}-custom-icon`
  }, r.icon(i, r.indeterminate)) : l.createElement("div", {
    className: `${Kt}-icon`
  }, r.indeterminate ? l.createElement(I9, null) : i && l.createElement(M1, null));
  return W(r, l.createElement("label", {
    onClick: r.onClick,
    className: B(Kt, {
      [`${Kt}-checked`]: i && !r.indeterminate,
      [`${Kt}-indeterminate`]: r.indeterminate,
      [`${Kt}-disabled`]: o,
      [`${Kt}-block`]: r.block
    })
  }, l.createElement(I1, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${Kt}-content`
  }, r.children)));
}), Lu = le(D9, {
  Group: M9
}), Sn = "adm-collapse", V9 = () => null, j9 = (t) => {
  const {
    visible: e
  } = t, n = V(null), r = to(e, t.forceRender, t.destroyOnClose), [{
    height: i
  }, a] = Te(() => ({
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
  return _3(() => {
    if (!e)
      return;
    const o = n.current;
    o && a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Fi(() => {
    const o = n.current;
    o && (e ? a.start({
      height: o.offsetHeight
    }) : (a.start({
      height: o.offsetHeight,
      immediate: !0
    }), a.start({
      height: 0
    })));
  }, [e]), l.createElement(ge.div, {
    className: B(`${Sn}-panel-content`, {
      [`${Sn}-panel-content-active`]: e
    }),
    style: {
      height: i.to((o) => i.idle && e ? "auto" : o)
    }
  }, l.createElement("div", {
    className: `${Sn}-panel-content-inner`,
    ref: n
  }, l.createElement($t.Item, null, r && t.children)));
}, B9 = (t) => {
  const e = [];
  dn(t.children, (o) => {
    !Dn(o) || typeof o.key != "string" || e.push(o);
  });
  const n = () => {
    var o;
    if (!t.accordion)
      return {
        value: t.activeKey,
        defaultValue: (o = t.defaultActiveKey) !== null && o !== void 0 ? o : [],
        onChange: t.onChange
      };
    const s = {
      value: [],
      defaultValue: [],
      onChange: (c) => {
        var u, f;
        (u = t.onChange) === null || u === void 0 || u.call(t, (f = c[0]) !== null && f !== void 0 ? f : null);
      }
    };
    return t.activeKey === void 0 ? s.value = void 0 : t.activeKey !== null && (s.value = [t.activeKey]), [null, void 0].includes(t.defaultActiveKey) || (s.defaultValue = [t.defaultActiveKey]), s;
  }, [r, i] = ae(n()), a = r === null ? [] : Array.isArray(r) ? r : [r];
  return W(t, l.createElement("div", {
    className: Sn
  }, l.createElement($t, null, e.map((o) => {
    const s = o.key, c = a.includes(s);
    function u(d) {
      var m, b;
      t.accordion ? i(c ? [] : [s]) : i(c ? a.filter((p) => p !== s) : [...a, s]), (b = (m = o.props).onClick) === null || b === void 0 || b.call(m, d);
    }
    const f = () => {
      let d = l.createElement(Ud, null);
      return t.arrow !== void 0 && (d = t.arrow), o.props.arrow !== void 0 && (d = o.props.arrow), typeof d == "function" ? d(c) : l.createElement("div", {
        className: B(`${Sn}-arrow`, {
          [`${Sn}-arrow-active`]: c
        })
      }, d);
    };
    return l.createElement(l.Fragment, {
      key: s
    }, W(o.props, l.createElement($t.Item, {
      className: `${Sn}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: f()
    }, o.props.title)), l.createElement(j9, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, S_ = le(B9, {
  Panel: V9
});
var L1 = { exports: {} };
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
})(L1);
var W9 = L1.exports;
const D1 = /* @__PURE__ */ ct(W9);
var V1 = { exports: {} };
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
})(V1);
var Z9 = V1.exports;
const j1 = /* @__PURE__ */ ct(Z9), fr = "TILL_NOW";
ve.extend(oo);
ve.extend(D1);
ve.extend(j1);
const Gt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function H9(t, e, n, r, i, a, o) {
  const s = [], c = e.getFullYear(), u = e.getMonth() + 1, f = e.getDate(), d = e.getHours(), m = e.getMinutes(), b = e.getSeconds(), p = n.getFullYear(), v = n.getMonth() + 1, y = n.getDate(), g = n.getHours(), C = n.getMinutes(), h = n.getSeconds(), w = Gt[r], E = parseInt(t[0]), x = ve(ws([t[0], t[1], "1"])), $ = parseInt(t[1]), N = parseInt(t[2]), F = parseInt(t[3]), k = parseInt(t[4]), D = E === c, I = E === p, A = D && $ === u, _ = I && $ === v, T = A && N === f, S = _ && N === y, O = T && F === d, R = S && F === g, P = O && k === m, M = R && k === C, j = (Z, q, G) => {
    let Y = [];
    for (let Ee = Z; Ee <= q; Ee++)
      Y.push(Ee);
    const ce = t.slice(0, Gt[G]), he = a == null ? void 0 : a[G];
    return he && typeof he == "function" && (Y = Y.filter((Ee) => he(Ee, {
      get date() {
        const z = [...ce, Ee.toString()];
        return ws(z);
      }
    }))), Y;
  };
  if (w >= Gt.year) {
    const G = j(c, p, "year");
    s.push(G.map((Y) => ({
      label: i("year", Y),
      value: Y.toString()
    })));
  }
  if (w >= Gt.month) {
    const G = j(D ? u : 1, I ? v : 12, "month");
    s.push(G.map((Y) => ({
      label: i("month", Y),
      value: Y.toString()
    })));
  }
  if (w >= Gt.day) {
    const Z = A ? f : 1, q = _ ? y : x.daysInMonth(), G = j(Z, q, "day");
    s.push(G.map((Y) => ({
      label: i("day", Y),
      value: Y.toString()
    })));
  }
  if (w >= Gt.hour) {
    const G = j(T ? d : 0, S ? g : 23, "hour");
    s.push(G.map((Y) => ({
      label: i("hour", Y),
      value: Y.toString()
    })));
  }
  if (w >= Gt.minute) {
    const G = j(O ? m : 0, R ? C : 59, "minute");
    s.push(G.map((Y) => ({
      label: i("minute", Y),
      value: Y.toString()
    })));
  }
  if (w >= Gt.second) {
    const G = j(P ? b : 0, M ? h : 59, "second");
    s.push(G.map((Y) => ({
      label: i("second", Y),
      value: Y.toString()
    })));
  }
  if (o && (s[0].push({
    label: i("now", null),
    value: fr
  }), fr === (t == null ? void 0 : t[0])))
    for (let Z = 1; Z < s.length; Z += 1)
      s[Z] = [];
  return s;
}
function z9(t) {
  return t ? [t.getFullYear().toString(), (t.getMonth() + 1).toString(), t.getDate().toString(), t.getHours().toString(), t.getMinutes().toString(), t.getSeconds().toString()] : [];
}
function ws(t) {
  var e, n, r, i, a, o;
  const s = (e = t[0]) !== null && e !== void 0 ? e : "1900", c = (n = t[1]) !== null && n !== void 0 ? n : "1", u = (r = t[2]) !== null && r !== void 0 ? r : "1", f = (i = t[3]) !== null && i !== void 0 ? i : "0", d = (a = t[4]) !== null && a !== void 0 ? a : "0", m = (o = t[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
ve.extend(oo);
ve.extend(D1);
ve.extend(j1);
const jr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function U9(t, e, n, r, i, a) {
  const o = [], s = e.getFullYear(), c = n.getFullYear(), u = jr[r], f = parseInt(t[0]), d = f === s, m = f === c, b = ve(e), p = ve(n), v = b.isoWeek(), y = p.isoWeek(), g = b.isoWeekday(), C = p.isoWeekday(), h = parseInt(t[1]), w = d && h === v, E = m && h === y, x = ve(`${f}-01-01`).isoWeeksInYear(), $ = (N, F, k) => {
    let D = [];
    for (let _ = N; _ <= F; _++)
      D.push(_);
    const I = t.slice(0, jr[k]), A = a == null ? void 0 : a[k];
    return A && typeof A == "function" && (D = D.filter((_) => A(_, {
      get date() {
        const T = [...I, _.toString()];
        return B1(T);
      }
    }))), D;
  };
  if (u >= jr.year) {
    const k = $(s, c, "year");
    o.push(k.map((D) => ({
      label: i("year", D),
      value: D.toString()
    })));
  }
  if (u >= jr.week) {
    const k = $(d ? v : 1, m ? y : x, "week");
    o.push(k.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= jr["week-day"]) {
    const k = $(w ? g : 1, E ? C : 7, "week-day");
    o.push(k.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return o;
}
function q9(t) {
  if (!t)
    return [];
  const e = ve(t);
  return [e.isoWeekYear().toString(), e.isoWeek().toString(), e.isoWeekday().toString()];
}
function B1(t) {
  var e, n, r;
  const i = (e = t[0]) !== null && e !== void 0 ? e : "1900", a = (n = t[1]) !== null && n !== void 0 ? n : "1", o = (r = t[2]) !== null && r !== void 0 ? r : "1";
  return ve().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const K9 = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, W1 = (t, e) => {
  if (e.includes("week"))
    return q9(t);
  {
    const n = e;
    return z9(t).slice(0, K9[n]);
  }
}, Es = (t, e) => {
  if ((t == null ? void 0 : t[0]) === fr) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return e.includes("week") ? B1(t) : ws(t);
}, Z1 = (t, e, n, r, i, a, o) => r.startsWith("week") ? U9(t, e, n, r, i, a) : H9(t, e, n, r, i, a, o);
function H1(t) {
  const {
    locale: e
  } = ye();
  return Ue((n, r) => {
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
const Du = (/* @__PURE__ */ new Date()).getFullYear(), G9 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Du - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Du + 10)),
  precision: "day",
  defaultValue: null
}, z1 = me((t, e) => {
  const n = U(G9, t), {
    renderLabel: r
  } = n, [i, a] = ae({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var b;
      m !== null && ((b = n.onConfirm) === null || b === void 0 || b.call(n, m));
    }
  }), o = ie(() => /* @__PURE__ */ new Date(), []), s = H1(r), c = ie(() => {
    let m = i ?? o;
    return m.tillNow ? [fr] : (m = new Date(ke(m.getTime(), n.min.getTime(), n.max.getTime())), W1(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Ue((m) => {
    const b = Es(m, n.precision);
    a(b, !0);
  }, [a, n.precision]), f = Zt((m) => {
    var b;
    const p = Es(m, n.precision);
    (b = n.onSelect) === null || b === void 0 || b.call(n, p);
  }), d = Ue((m) => Z1(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return W(n, l.createElement(k1, {
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
function Y9(t) {
  return new Promise((e) => {
    const n = () => {
      const [i, a] = K(!1);
      return X(() => {
        a(!0);
      }, []), l.createElement(z1, Object.assign({}, t, {
        visible: i,
        onConfirm: (o) => {
          var s;
          (s = t.onConfirm) === null || s === void 0 || s.call(t, o), e(o);
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
    }, r = Si(l.createElement(n, null));
  });
}
const F_ = le(z1, {
  prompt: Y9,
  DATE_NOW: fr
}), Vu = (/* @__PURE__ */ new Date()).getFullYear(), X9 = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(Vu - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(Vu + 10)),
  precision: "day"
}, N_ = (t) => {
  var e;
  const n = U(X9, t), {
    renderLabel: r
  } = n, [i, a] = ae({
    value: n.value,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : null
  }), o = H1(r), s = ie(() => i != null && i.tillNow ? [fr, null, null] : W1(i, n.precision), [i, n.precision]), c = Ue((u) => {
    var f;
    const d = Es(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return W(n, l.createElement(yo, {
    columns: (u) => Z1(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Q9 = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, l.createElement(jt, {
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
}, J9 = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, U1 = (t) => {
  const e = U(J9, t), n = l.createElement(l.Fragment, null, !!e.image && l.createElement("div", {
    className: yt("image-container")
  }, l.createElement(ao, {
    src: e.image,
    alt: "dialog header image",
    width: "100%"
  })), !!e.header && l.createElement("div", {
    className: yt("header")
  }, l.createElement(mi, null, e.header)), !!e.title && l.createElement("div", {
    className: yt("title")
  }, e.title), l.createElement("div", {
    className: B(yt("content"), !e.content && yt("content-empty"))
  }, typeof e.content == "string" ? l.createElement(mi, null, e.content) : e.content), l.createElement("div", {
    className: yt("footer")
  }, e.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: yt("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(Q9, {
      key: o.key,
      action: o,
      onAction: () => Se(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = e.onAction) === null || u === void 0 ? void 0 : u.call(e, o, s)]), e.closeOnAction && ((f = e.onClose) === null || f === void 0 || f.call(e));
      })
    })));
  })));
  return l.createElement(T1, {
    className: B(yt(), e.className),
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
    bodyClassName: B(yt("body"), e.image && yt("with-image"), e.bodyClassName),
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
function yt(t = "") {
  return "adm-dialog" + (t && "-") + t;
}
const Cs = /* @__PURE__ */ new Set();
function Ml(t) {
  const e = Pr(l.createElement(U1, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Cs.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Cs.add(e.close), e;
}
function eb(t) {
  const e = {
    confirmText: bi().locale.Dialog.ok
  }, n = U(e, t);
  return new Promise((r) => {
    Ml(Object.assign(Object.assign({}, n), {
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
const tb = {
  confirmText: "确认",
  cancelText: "取消"
};
function nb(t) {
  const {
    locale: e
  } = bi(), n = U(tb, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    Ml(Object.assign(Object.assign({}, n), {
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
function rb() {
  Cs.forEach((t) => {
    t();
  });
}
const P_ = le(U1, {
  show: Ml,
  alert: eb,
  confirm: nb,
  clear: rb
}), Lt = "adm-dropdown-item", ib = (t) => {
  var e;
  const n = B(Lt, {
    [`${Lt}-active`]: t.active,
    [`${Lt}-highlight`]: (e = t.highlight) !== null && e !== void 0 ? e : t.active
  });
  return W(t, l.createElement("div", {
    className: n,
    onClick: t.onClick
  }, l.createElement("div", {
    className: `${Lt}-title`
  }, l.createElement("span", {
    className: `${Lt}-title-text`
  }, t.title), l.createElement("span", {
    className: B(`${Lt}-title-arrow`, {
      [`${Lt}-title-arrow-active`]: t.active
    })
  }, t.arrow === void 0 ? l.createElement(X7, null) : t.arrow))));
}, ab = ib, ob = (t) => {
  const {
    active: e = !1
  } = t, n = to(e, t.forceRender, t.destroyOnClose), r = B(`${Lt}-content`, {
    [`${Lt}-content-hidden`]: !e
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: t.onClick
  }, t.children) : null;
}, qn = "adm-dropdown", sb = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: wl.getContainer
}, lb = me((t, e) => {
  const n = U(sb, t), [r, i] = ae({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = V(null), o = V(null);
  Yf(() => {
    n.closeOnClickAway && i(null);
  }, [a, o]);
  const [s, c] = K(), u = V(null);
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
  const m = [], b = l.Children.map(n.children, (p) => {
    if (Dn(p)) {
      const v = Object.assign(Object.assign({}, p.props), {
        onClick: (y) => {
          var g, C;
          f(p.key), (C = (g = p.props).onClick) === null || C === void 0 || C.call(g, y);
        },
        active: p.key === r,
        arrow: p.props.arrow === void 0 ? n.arrow : p.props.arrow
      });
      return m.push(p), p.props.forceRender && (d = !0), J0(p, v);
    } else
      return p;
  });
  return we(e, () => ({
    close: () => {
      i(null);
    }
  }), [i]), W(n, l.createElement("div", {
    className: B(qn, {
      [`${qn}-open`]: !!r
    }),
    ref: u
  }, l.createElement("div", {
    className: `${qn}-nav`,
    ref: a
  }, b), l.createElement(Fr, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${qn}-popup`,
    maskClassName: `${qn}-popup-mask`,
    bodyClassName: `${qn}-popup-body`,
    style: {
      top: s
    },
    forceRender: d,
    onMaskClick: n.closeOnMaskClick ? () => {
      f(null);
    } : void 0
  }, l.createElement("div", {
    ref: o
  }, m.map((p) => {
    const v = p.key === r;
    return l.createElement(ob, {
      key: p.key,
      active: v,
      forceRender: p.props.forceRender,
      destroyOnClose: p.props.destroyOnClose
    }, p.props.children);
  })))));
}), cb = lb, A_ = le(cb, {
  Item: ab
});
var ju;
(function(t) {
  t[t.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", t[t.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", t[t.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", t[t.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", t[t.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", t[t.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", t[t.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", t[t.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", t[t.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", t[t.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", t[t.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", t[t.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", t[t.TAGS_START = 917504] = "TAGS_START", t[t.TAGS_END = 917631] = "TAGS_END", t[t.ZWJ = 8205] = "ZWJ";
})(ju || (ju = {}));
const ub = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var Bu;
function sa(t) {
  if (typeof t != "string")
    throw new TypeError("string cannot be undefined or null");
  const e = [];
  let n = 0, r = 0;
  for (; n < t.length; )
    r += fb(n + r, t), yb(t[n + r]) && r++, vb(t[n + r]) && r++, pb(t[n + r]) && r++, bb(t[n + r]) ? r++ : (e.push(t.substring(n, n + r)), n += r, r = 0);
  return e;
}
function fb(t, e) {
  const n = e[t];
  if (!db(n) || t === e.length - 1)
    return 1;
  const r = n + e[t + 1];
  let i = e.substring(t + 2, t + 5);
  return Wu(r) && Wu(i) ? 4 : mb(r) && gb(i) ? e.slice(t).indexOf(String.fromCodePoint(917631)) + 2 : hb(i) ? 4 : 2;
}
function db(t) {
  return t && Bn(t[0].charCodeAt(0), 55296, 56319);
}
function Wu(t) {
  return Bn(Il(t), 127462, 127487);
}
function mb(t) {
  return Bn(Il(t), 127988, 127988);
}
function hb(t) {
  return Bn(Il(t), 127995, 127999);
}
function vb(t) {
  return typeof t == "string" && Bn(t.charCodeAt(0), 65024, 65039);
}
function pb(t) {
  return typeof t == "string" && Bn(t.charCodeAt(0), 8400, 8447);
}
function gb(t) {
  const e = t.codePointAt(0);
  return typeof t == "string" && typeof e == "number" && Bn(e, 917504, 917631);
}
function yb(t) {
  return typeof t == "string" && ub.includes(t.charCodeAt(0));
}
function bb(t) {
  return typeof t == "string" && t.charCodeAt(0) === 8205;
}
function Il(t) {
  return (t.charCodeAt(0) - 55296 << 10) + (t.charCodeAt(1) - 56320) + 65536;
}
function Bn(t, e, n) {
  return t >= e && t <= n;
}
(function(t) {
  t[t.unit_1 = 1] = "unit_1", t[t.unit_2 = 2] = "unit_2", t[t.unit_4 = 4] = "unit_4";
})(Bu || (Bu = {}));
const wb = "adm-ellipsis", Eb = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, T_ = (t) => {
  const e = U(Eb, t), n = V(null), r = V(null), i = V(null), [a, o] = K({}), [s, c] = K(e.defaultExpanded), [u, f] = K(!1), d = ie(() => sa(e.content), [e.content]);
  function m(g, C) {
    return d.slice(g, C).join("");
  }
  function b() {
    var g, C;
    const h = n.current;
    if (!h)
      return;
    const w = h.style.display;
    h.style.display = "block";
    const E = window.getComputedStyle(h), x = document.createElement("div");
    Array.prototype.slice.apply(E).forEach((k) => {
      x.style.setProperty(k, E.getPropertyValue(k));
    }), h.style.display = w, x.style.height = "auto", x.style.minHeight = "auto", x.style.maxHeight = "auto", x.style.textOverflow = "clip", x.style.webkitLineClamp = "unset", x.style.display = "block";
    const N = Do(E.lineHeight), F = Math.floor(N * (e.rows + 0.5) + Do(E.paddingTop) + Do(E.paddingBottom));
    if (x.innerText = e.content, document.body.appendChild(x), x.offsetHeight <= F)
      f(!1);
    else {
      let _ = function(R, P) {
        if (P - R <= 1)
          return e.direction === "end" ? {
            leading: m(0, R) + "..."
          } : {
            tailing: "..." + m(P, k)
          };
        const M = Math.round((R + P) / 2);
        return e.direction === "end" ? x.innerHTML = m(0, M) + "..." + A : x.innerHTML = A + "..." + m(M, k), x.offsetHeight <= F ? e.direction === "end" ? _(M, P) : _(R, M) : e.direction === "end" ? _(R, M) : _(M, P);
      }, T = function(R, P) {
        if (R[1] - R[0] <= 1 && P[1] - P[0] <= 1)
          return {
            leading: m(0, R[0]) + "...",
            tailing: "..." + m(P[1], k)
          };
        const M = Math.floor((R[0] + R[1]) / 2), j = Math.ceil((P[0] + P[1]) / 2);
        return x.innerHTML = m(0, M) + "..." + A + "..." + m(j, k), x.offsetHeight <= F ? T([M, R[1]], [P[0], j]) : T([R[0], M], [j, P[1]]);
      };
      f(!0);
      const k = e.content.length, D = typeof e.collapseText == "string" ? e.collapseText : (g = i.current) === null || g === void 0 ? void 0 : g.innerHTML, I = typeof e.expandText == "string" ? e.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, A = s ? D : I, S = Math.floor((0 + k) / 2), O = e.direction === "middle" ? T([0, S], [S, k]) : _(0, k);
      o(O);
    }
    document.body.removeChild(x);
  }
  Ni(b, n), Ne(() => {
    b();
  }, [e.content, e.direction, e.rows, e.expandText, e.collapseText]);
  const p = !!e.expandText && on(e.stopPropagationForActionButtons, l.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, e.expandText)), v = !!e.collapseText && on(e.stopPropagationForActionButtons, l.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, e.collapseText)), y = () => u ? s ? l.createElement(l.Fragment, null, e.content, v) : l.createElement(l.Fragment, null, a.leading, p, a.tailing) : e.content;
  return W(e, l.createElement("div", {
    ref: n,
    className: wb,
    onClick: (g) => {
      g.target === g.currentTarget && e.onContentClick(g);
    }
  }, y()));
};
function Do(t) {
  if (!t)
    return 0;
  const e = t.match(/^\d*(\.\d*)?/);
  return e ? Number(e[0]) : 0;
}
const Cb = (t) => W(t, l.createElement("svg", {
  viewBox: "0 0 64 41"
}, l.createElement("g", {
  transform: "translate(0 1)",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("ellipse", {
  fill: "#f5f5f5",
  cx: "32",
  cy: "33",
  rx: "32",
  ry: "7"
}), l.createElement("g", {
  stroke: "#d9d9d9"
}, l.createElement("path", {
  d: "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
}), l.createElement("path", {
  d: "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
  fill: "#fafafa"
}))))), Br = "adm-empty", R_ = (t) => {
  function e() {
    const {
      image: n
    } = t;
    return n === void 0 ? l.createElement(Cb, {
      className: `${Br}-image`,
      style: t.imageStyle
    }) : typeof n == "string" ? l.createElement("img", {
      className: `${Br}-image`,
      style: t.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return W(t, l.createElement("div", {
    className: Br
  }, l.createElement("div", {
    className: `${Br}-image-container`
  }, e()), t.description && l.createElement("div", {
    className: B(`${Br}-description`)
  }, t.description)));
}, hn = "adm-error-block", xb = {
  status: "default"
};
function $b(t) {
  return (n) => {
    var r;
    const i = U(xb, n), {
      locale: a
    } = ye(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : t[i.status], f = typeof u == "string" ? l.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return W(i, l.createElement("div", {
      className: B(hn, {
        [`${hn}-full-page`]: i.fullPage
      })
    }, l.createElement("div", {
      className: `${hn}-image`
    }, f), l.createElement("div", {
      className: `${hn}-description`
    }, ![void 0, null].includes(c) && l.createElement("div", {
      className: `${hn}-description-title`
    }, c), ![void 0, null].includes(s) && l.createElement("div", {
      className: `${hn}-description-subtitle`
    }, s)), i.children && l.createElement("div", {
      className: `${hn}-content`
    }, i.children)));
  };
}
const _b = l.createElement("svg", {
  viewBox: "0 0 200 200",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, l.createElement("defs", null, l.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-default-a"
}, l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), l.createElement("circle", {
  id: "error-block-image-default-d",
  cx: 18.823,
  cy: 18.823,
  r: 18.823
}), l.createElement("rect", {
  id: "error-block-image-default-b",
  x: 3.5,
  y: 9,
  width: 51.429,
  height: 88,
  rx: 4.571
})), l.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("path", {
  d: "M73.557.004c19.435-.311 38.696 17.016 51.523 35.287 8.708-10.822 17.127-16.233 25.255-16.233 13.333 0 28.35 14.274 45.053 42.822 1.769 3.024-3.582 7.435-16.054 13.231l-41.322 1.37c-7.343 5.872-31.225.626-69.152 1.234-27.79.445-45.759-1.234-53.908-5.037C3.2 71.143-1.625 68.686.48 65.308 27.371 22.12 51.73.353 73.557.003Zm93.098 49.53a1.125 1.125 0 0 0-.401.072l-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.283 1.719 4.153 3.898 4.314l.026.001v3.805c0 .39.25.705.56.705.31 0 .56-.316.56-.705l.001-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734Zm-100-5a1.125 1.125 0 0 0-.331.05l-.035.01-.035.012-.058.023-.07.03-.028.014-.02.01c-.03.015-.059.032-.088.049a2.543 2.543 0 0 0-.568.477l-.067.074c-1.686 1.931-2.904 7.062-2.904 8.985 0 2.212 1.613 4.036 3.695 4.294l.203.02.026.001v3.805c0 .39.25.705.56.705.282 0 .515-.26.555-.6l.006-.105v-3.88c1.92-.402 3.363-2.148 3.363-4.24 0-2.39-1.882-9.734-4.204-9.734ZM52.64 38.348l-.15.008-.149.023-.032.007-.032.008-.078.022-.045.015-.045.016-.06.023-.038.017-.038.017-.058.028-.022.011a2.201 2.201 0 0 0-.323.204l-.05.038-.05.04-.025.02-.025.021a3.742 3.742 0 0 0-.31.294l-.036.04c-.035.037-.07.076-.105.116-.01.012-.02.025-.031.036a3.275 3.275 0 0 0-.081.098l-.063.078c-2.031 2.583-3.48 8.692-3.48 11.027 0 2.636 1.846 4.832 4.292 5.323l.224.04-.064-.012.105.018.103.014v4.618c0 .47.299.85.667.85.337 0 .615-.32.659-.735l.006-.115v-4.618c.18-.023.355-.054.527-.094l.256-.067.196-.06c2.136-.706 3.68-2.75 3.68-5.162 0-2.996-2.383-12.207-5.325-12.207Z",
  transform: "translate(2.286 22.286)",
  fill: "url(#error-block-image-default-a)"
}), l.createElement("g", {
  transform: "rotate(-90 102.429 55.357)"
}, l.createElement("path", {
  d: "M6.857 0H52a6.857 6.857 0 0 1 6.857 6.857v92A6.857 6.857 0 0 1 52 105.714H6.857A6.857 6.857 0 0 1 0 98.857v-92A6.857 6.857 0 0 1 6.857 0Z",
  fill: "#7EACFF"
}), l.createElement("mask", {
  id: "error-block-image-default-c",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-default-b"
})), l.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-default-b"
}), l.createElement("path", {
  d: "M11.838 91.8a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-2.858 0a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.16-2.305a.64.64 0 0 1 .628.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-2.982-.04a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm5.268-.531a.64.64 0 0 1 .628.651.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.651.627-.651Zm2.858-1.143a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.651.628-.651Zm-6.37-.917c.209 0 .377.175.377.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm3.512-.798.093.007a.644.644 0 0 1 .535.645.64.64 0 0 1-.628.652.64.64 0 0 1-.627-.652c0-.36.281-.652.627-.652Zm5.715 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-11.429 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.261.241c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm11.833-.812a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.628-.651c0-.36.281-.652.628-.652Zm-4.851.399c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm10.313-2.056a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-2.354-.128a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.628-.652c0-.36.281-.652.628-.652Zm-13.798.311c.207 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.377-.39c0-.217.169-.392.377-.392Zm11.832-.812a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-6.285 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm3.428 0a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.651.64.64 0 0 1-.627-.651c0-.36.28-.652.627-.652Zm-6.118.24c.208 0 .376.176.376.392a.384.384 0 0 1-.376.39.384.384 0 0 1-.377-.39c0-.216.169-.391.377-.391Zm11.261-2.525a.64.64 0 0 1 .627.651.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.651.627-.651Zm-3.557.484c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.478-.555a.64.64 0 0 1 .627.652.64.64 0 0 1-.627.652.64.64 0 0 1-.627-.652c0-.36.28-.652.627-.652Zm-3.512-.26c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-2.857 0c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-4.571 0c.207 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.377-.391c0-.216.169-.391.377-.391Zm14.898-1.835a.64.64 0 0 1 .628.652.64.64 0 0 1-.628.651.64.64 0 0 1-.627-.651c0-.36.281-.652.627-.652Zm-8.027-.245c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.169-.391.376-.391Zm6.271-1.349c.208 0 .377.175.377.391a.384.384 0 0 1-.377.391.384.384 0 0 1-.376-.39c0-.217.169-.392.376-.392Zm-11.484-.481c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm15.103-.972c.208 0 .376.175.376.391a.384.384 0 0 1-.376.391.384.384 0 0 1-.376-.39c0-.217.168-.392.376-.392Zm-9.333-1.404c.208 0 .376.175.376.39a.384.384 0 0 1-.376.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Zm-6.819-.405c.208 0 .377.175.377.39a.384.384 0 0 1-.377.392.384.384 0 0 1-.376-.391c0-.216.168-.391.376-.391Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-c)",
  transform: "rotate(116 12.367 83.503)"
}), l.createElement("path", {
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "M36.774 5.474H21.523"
}), l.createElement("path", {
  d: "m67.818 94.025-4.996 3.913m4.996 11.91-4.996-3.912m-1.142 9.145-1.143-6.288m10.71-6.768h-7.262",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
})), l.createElement("circle", {
  cx: 8.571,
  cy: 8.571,
  r: 8.571,
  transform: "translate(22.857 142)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), l.createElement("g", {
  transform: "translate(132.857 124)"
}, l.createElement("mask", {
  id: "error-block-image-default-e",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-default-d"
})), l.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-default-d"
}), l.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 13.886,
  cy: 15.12,
  r: 18.823
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 23.4,
  cy: 29.057,
  r: 1
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.343,
  cy: 29.829,
  r: 1
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 18.771,
  cy: 32.657,
  r: 1.286
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 29.571,
  cy: 25.971,
  r: 1.286
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 19.286,
  cy: 7.971,
  r: 1.286
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 26.486,
  cy: 5.914,
  r: 1.286
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 11.057,
  cy: 6.943,
  r: 1
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 30.086,
  cy: 15.686,
  r: 1.286
}), l.createElement("circle", {
  fill: "#FFB400",
  fillRule: "nonzero",
  mask: "url(#error-block-image-default-e)",
  cx: 22.886,
  cy: 14.657,
  r: 1
})), l.createElement("path", {
  d: "m87.429 135.123 6.591-9.378v-.08h-5.99v-2.559h10.038v1.787l-6.44 9.254v.082h6.56v2.557h-10.76v-1.663Zm12.185-5.889 4.948-7.047v-.056h-4.498v-1.917h7.536v1.34l-4.849 6.942v.059h4.923v1.92h-8.06v-1.24Zm10.345.702 3.708-5.274v-.045h-3.372v-1.437h5.648v1.003l-3.628 5.206v.045H116v1.438h-6.041v-.936Z",
  fill: "#FFF",
  fillRule: "nonzero"
}))), kb = l.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, l.createElement("title", null, "@反馈/异常/网络服务异常"), l.createElement("defs", null, l.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-disconnected-c"
}, l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), l.createElement("circle", {
  id: "error-block-image-disconnected-d",
  cx: 22.309,
  cy: 22.309,
  r: 22.309
}), l.createElement("path", {
  id: "error-block-image-disconnected-a",
  d: "M0 0h400v400H0z"
})), l.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("mask", {
  id: "error-block-image-disconnected-b",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-a"
})), l.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "url(#error-block-image-disconnected-c)"
}, l.createElement("path", {
  d: "M151.686 45.58c38.869-.623 77.391 34.03 103.046 70.573 17.416-21.644 34.253-32.465 50.51-32.465 26.666 0 56.701 28.548 90.105 85.643 3.539 6.05-7.164 14.87-32.107 26.462l-82.643 2.741c-14.686 11.745-62.45 1.252-138.305 2.467-55.58.89-91.518-2.468-107.816-10.074-23.505-3.07-33.154-7.983-28.946-14.74C59.313 89.813 108.03 46.278 151.686 45.58Zm186.195 99.06-.127.003-.126.01a2.32 2.32 0 0 0-.465.103l-.032.01-.031.01a2.364 2.364 0 0 0-.181.071 2.52 2.52 0 0 0-.116.054l-.133.067-.042.024-.036.02a2.946 2.946 0 0 0-.133.08l-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024a4.906 4.906 0 0 0-.31.27l-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.108.008v7.608c0 .779.502 1.41 1.121 1.41.62 0 1.121-.632 1.121-1.41v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-200-10-.127.003-.126.01a2.32 2.32 0 0 0-.368.073l-.049.014-.048.016-.032.01-.031.01a2.364 2.364 0 0 0-.181.071l-.058.026-.058.028-.133.067-.042.024-.036.02-.066.039-.067.041-.048.03a3.052 3.052 0 0 0-.126.087l-.047.033a3.274 3.274 0 0 0-.128.097c-.01.008-.02.017-.031.024l-.156.13-.154.14-.036.032a6.654 6.654 0 0 0-.46.484l-.045.05c-3.344 3.91-5.755 14.083-5.755 17.908 0 4.547 3.409 8.275 7.74 8.625l.054.004.054.004v7.608c0 .779.502 1.41 1.121 1.41.58 0 1.058-.556 1.115-1.266l.006-.144v-7.762c3.838-.802 6.727-4.293 6.727-8.48 0-4.778-3.765-19.467-8.409-19.467Zm-28.029-12.373-.107.002-.106.006a2.978 2.978 0 0 0-.551.095 3.444 3.444 0 0 0-.323.104 3.962 3.962 0 0 0-.61.297c-.076.045-.15.092-.226.141-4.964 3.312-8.728 18.445-8.728 23.77 0 5.434 3.922 9.935 9.04 10.726l.28.04v9.236c0 .886.532 1.614 1.21 1.692l.121.007.122-.007c.638-.074 1.147-.723 1.204-1.538l.006-.155v-9.235c5.254-.668 9.32-5.234 9.32-10.767 0-5.993-4.77-24.414-10.652-24.414Z"
})), l.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, l.createElement("g", {
  transform: "translate(85.858 150.644)"
}, l.createElement("path", {
  d: "M116.26 28.467c1.352 0 2.703.018 4.054.054 3.923.385 10.188 4.248 9.267 11.061-.878 6.496-5.836 9.089-8.962 9.529a130.762 130.762 0 0 0-4.36-.072c-28.567 0-60.654 10.149-96.22 30.676l-2.227 1.297c-.744.437-1.49.878-2.236 1.323-4.878 2.911-11.193 1.316-14.103-3.562C-1.438 73.894.157 67.58 5.035 64.67 45.34 40.62 82.4 28.467 116.26 28.467Zm22 11.63c1.03-5.942 6.376-8.618 11.084-8.08C172.14 36.91 194.83 46.86 217.37 61.794c4.735 3.138 6.03 9.52 2.893 14.255-3.138 4.736-9.52 6.031-14.256 2.893-20.111-13.325-40.075-22.165-59.935-26.584a9.974 9.974 0 0 0-.325-.088c-3.987-1.015-8.602-5.738-7.487-12.175ZM116.26 77.418c22.777 0 45.4 7.057 67.73 20.988 4.82 3.007 6.289 9.351 3.282 14.17-3.007 4.82-9.351 6.29-14.17 3.283-19.194-11.974-38.095-17.87-56.842-17.87s-37.648 5.896-56.842 17.87c-4.82 3.007-11.164 1.537-14.17-3.282-3.007-4.82-1.538-11.164 3.282-14.171 22.33-13.931 44.953-20.988 67.73-20.988ZM117.974 124.67c9.85 0 17.303 1.69 25.687 5.082l.82.337 2.9 1.231 3.008 1.252.77.305.107.04c5.326 1.976 8.042 7.895 6.066 13.221-1.976 5.326-7.895 8.042-13.221 6.067l-.713-.27-.726-.285-.763-.31-1.263-.527-2.944-1.26-1.125-.473c-6.393-2.648-11.433-3.838-18.603-3.838-8.223 0-16.532 2.126-25.028 6.475-5.056 2.588-11.254.587-13.842-4.47-2.589-5.056-.588-11.253 4.47-13.842 11.313-5.791 22.814-8.735 34.4-8.735ZM118.235 197.047c7.15 0 13.77-.897 19.841-2.721 5.44-1.635 8.526-7.37 6.892-12.81-1.635-5.44-7.37-8.526-12.81-6.892-4.072 1.224-8.707 1.851-13.923 1.851-4.36 0-8.79-1.045-13.373-3.21l-.626-.301c-5.095-2.512-11.262-.418-13.773 4.678-2.512 5.095-.418 11.261 4.678 13.773 7.559 3.727 15.288 5.632 23.094 5.632Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), l.createElement("path", {
  d: "M198.35 62.413c2.755-4.967 9.016-6.76 13.984-4.004 13.068 7.25 19.124 18.535 17.615 30.952-1.157 9.515-6.83 18.757-14.096 24.352-13.364 10.29-34.915 9.401-49.363-1.91-4.472-3.502-5.26-9.967-1.758-14.44 3.436-4.388 9.724-5.229 14.185-1.952l.255.194c7.283 5.702 18.475 6.164 24.13 1.809 3.072-2.366 5.766-6.754 6.226-10.536.467-3.844-1.21-7.07-6.796-10.267l-.378-.213c-4.967-2.756-6.76-9.017-4.004-13.985ZM61.35 103.092c-2.84-4.92-9.13-6.607-14.05-3.768-20.662 11.922-21.772 35.751-6.018 51.69 13.752 13.914 33.192 13.447 50.507 1.158 4.633-3.288 5.723-9.708 2.436-14.34-3.288-4.633-9.709-5.724-14.341-2.436-9.763 6.928-18.07 7.128-23.97 1.158-6.761-6.84-6.498-14.501 1.35-19.225l.317-.187c4.92-2.84 6.608-9.13 3.769-14.05ZM129.103 135.702c1.688-5.424 7.454-8.453 12.878-6.764 14.776 4.599 23.437 13.727 25.259 25.58 1.316 8.561-1.228 17.533-5.58 24.052-3.132 4.688-7.388 8.287-12.504 11.112-3.03 1.673-5.75 2.811-9.37 4.066l-1.4.477c-5.387 1.806-11.217-1.097-13.022-6.484-1.805-5.386 1.098-11.216 6.484-13.02l1.09-.374c6.032-2.112 9.602-4.19 11.613-7.201 1.693-2.535 2.818-6.502 2.356-9.503-.564-3.673-3.432-6.696-11.04-9.063-5.424-1.689-8.452-7.454-6.764-12.878Z",
  fill: "#377EFF",
  fillRule: "nonzero"
}), l.createElement("path", {
  d: "M148.072 181.58c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.236-9.096-10.275-9.707",
  stroke: "#FFF",
  strokeWidth: 0.571,
  strokeLinecap: "round"
}), l.createElement("ellipse", {
  fill: "#7EACFF",
  transform: "rotate(10 147 41.933)",
  cx: 147,
  cy: 41.933,
  rx: 9.143,
  ry: 10.286
}), l.createElement("path", {
  d: "M210.422 107.472c3.718-7.98 4.172-14.9 1.36-20.76-2.81-5.86-6.668-9.883-11.572-12.067M51.604 131.769c-3.15-6.8-3.537-12.694-1.161-17.685 2.376-4.99 5.57-8.136 9.583-9.438",
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), l.createElement("path", {
  d: "M21.53 64.408c4.946-3.389 9.817-6.026 14.612-7.912",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), l.createElement("path", {
  d: "m113.243 15.444 9.588 8.314M144.31 9.405l-5.775 11.3m18.389-1.246-11.907 4.643M127.64 5.66l2.77 14.255",
  stroke: "#4486FE",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}))), l.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)"
}, l.createElement("g", {
  transform: "translate(275.143 302.571)"
}, l.createElement("mask", {
  id: "error-block-image-disconnected-e",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-disconnected-d"
})), l.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-disconnected-d"
}), l.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 16.457,
  cy: 17.92,
  r: 22.309
}), l.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-disconnected-e)",
  cx: 14.263,
  cy: 12.069,
  r: 2.194
}))), l.createElement("g", {
  mask: "url(#error-block-image-disconnected-b)",
  fill: "#FBBE47",
  fillRule: "nonzero"
}, l.createElement("circle", {
  cx: 12,
  cy: 12,
  r: 12,
  transform: "translate(84 297.714)"
})))), Ob = l.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, l.createElement("defs", null, l.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-empty-a"
}, l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), l.createElement("path", {
  d: "M146.183 18.461c31.705 23.336 33.349 71.85 4.93 96.614-.252.22 6.172 5.602 13.577 11.414l.686.537.69.54.695.54.348.27.698.54a341.27 341.27 0 0 0 8.806 6.596c1.114.802 4.643-.853 10.587-4.965l-.532 12.218a1.2 1.2 0 0 1-.481.91l-10.868 8.111c-1.405 1.048-3.32 1.185-4.854.072l-35.578-25.834c-33.414 17.333-79.913 15-109.804-7-33.444-24.616-33.444-75.95 0-100.563 33.443-24.615 87.657-24.615 121.1 0Zm-60.469 7.653C51.63 26.114 24 44.534 24 67.257S51.63 108.4 85.714 108.4s61.715-18.42 61.715-41.143c0-22.722-27.63-41.143-61.715-41.143Z",
  id: "error-block-image-empty-b"
})), l.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("path", {
  d: "M157.964 244.661H0L3.806 100.13a4.572 4.572 0 0 1 4.353-4.446l.217-.006h45.588V68.2a4.572 4.572 0 0 1 4.356-4.567l.216-.005h65.498l2.554-58.689a4.571 4.571 0 0 1 4.779-4.367l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.212 3.146 69.652L301.634 64.9a4.571 4.571 0 0 1 5.628 4.231l.005.215v43.955l56.162.001v130.264h-56.163v.001h-82.383v-.004h-66.919v1.098ZM89.503 160.03h-9.968v8.436h9.968v-8.436Zm0-14.507h-9.968v8.435h9.968v-8.435Zm197.985-5.15h-9.967v8.432h9.967v-8.431Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.436h9.967v-8.436Zm-84.643-3.29h-30.8v8.436h30.8v-8.436Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 50.286)",
  fill: "url(#error-block-image-empty-a)"
}), l.createElement("g", {
  transform: "translate(108.571 189.886)"
}, l.createElement("mask", {
  id: "error-block-image-empty-c",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-empty-b"
})), l.createElement("use", {
  fill: "#377EFF",
  xlinkHref: "#error-block-image-empty-b"
}), l.createElement("path", {
  d: "M131.429 134.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM128 133.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM120 128.971a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.142.125.006a1.143 1.143 0 1 1-.125-.006Zm11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-22.857 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm17.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285ZM136 125.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-13.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm18.857-2.286a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-37.143 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm13.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm18.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-28 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm17.715-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-4.571a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.428 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.143 1.142a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-9.143 0a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm30.286-3.429a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM124 109.543a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.858-1.142a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm-11.428-3.429a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM124 99.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM49.143 55.829a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-9.143-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-5.714 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm21.143-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM52 52.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm12-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-19.429-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm5.715 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm16-1.143.124.007a1.143 1.143 0 1 1-.124-.007Zm11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm17.143-1.142a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429-1.143a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-13.143 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm4.572-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM64 44.4a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-16-1.143.125.007a1.143 1.143 0 1 1-.125-.007Zm11.429 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-22.858 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm36.572 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM30.286 44.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM44 43.257a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm9.714-1.143a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM72 38.686a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-11.429 0a1.143 1.143 0 1 1 0 2.285 1.143 1.143 0 0 1 0-2.285Zm-28 1.143a.571.571 0 1 1 0 1.142.571.571 0 0 1 0-1.142Zm5.715-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM56 37.543a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-5.714 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-6.857 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM60.57 32.97a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-11.428 0a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286ZM44 34.114a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-8-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-9.143 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm30.286-3.428a1.143 1.143 0 1 1 0 2.286 1.143 1.143 0 0 1 0-2.286Zm-15.429 1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.715 0a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm5.714-4.572a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-22.857-1.143a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Zm-11.429-3.428a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143ZM41.714 20.4a.571.571 0 1 1 0 1.143.571.571 0 0 1 0-1.143Z",
  fill: "#003CFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-empty-c)"
})), l.createElement("path", {
  d: "M295.213 319.24c.744.546.745 1.433.002 1.98l-11.806 8.81c-1.069.799-3.326.474-4.853-.609l-35.622-25.241c-33.375 17.037-79.545 14.615-109.28-7.271-33.443-24.615-33.443-64.521 0-89.133 33.443-24.616 87.657-24.616 121.1 0 31.706 23.336 33.35 60.42 4.931 85.185-.543.473 35.528 26.278 35.528 26.278ZM148.06 220.015c-25.44 17.853-25.44 46.8 0 64.652 25.44 17.85 66.689 17.85 92.129 0 25.436-17.853 25.436-46.799 0-64.652-25.44-17.853-66.688-17.853-92.129 0Z",
  fill: "#5D96FE"
}), l.createElement("path", {
  d: "M123.514 233.021c2.185-5.241 5.67-9.735 10.453-13.482M264.967 271.54c-2.185 5.24-5.67 9.734-10.453 13.481",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), l.createElement("path", {
  d: "M81.143 252.571c7.574 0 13.714 23.88 13.714 31.649 0 6.97-4.942 12.755-11.429 13.871v11.672c0 1.235-.767 2.237-1.713 2.237-.904 0-1.644-.912-1.71-2.07l-.005-.167v-11.526c-7.04-.595-12.571-6.644-12.571-14.017 0-7.024 5.02-27.222 11.581-31.027l.096-.053c.027-.016.055-.03.082-.045l.067-.035.066-.033.1-.05.094-.041a3.34 3.34 0 0 1 .224-.093l.11-.042.097-.032c.038-.013.077-.025.115-.036l.053-.016.053-.014a3.351 3.351 0 0 1 .23-.055l.085-.016a3.95 3.95 0 0 1 .441-.054l.11-.005.11-.002Z",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), l.createElement("g", {
  transform: "translate(283.429 177.143)",
  fillRule: "nonzero"
}, l.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.49 0-2.707-1.46-2.79-3.301l-.004-.2-.001-19.018C8.659 71.92.13 62.518.13 51.123.13 40.071 8.154 8.49 18.694 2.015l.054-.031a5.94 5.94 0 0 1 .214-.128l.088-.048c.213-.12.427-.228.642-.326l.135-.06.18-.075.135-.053a5.796 5.796 0 0 1 .464-.16 4.44 4.44 0 0 1 .33-.092l.124-.03a7.122 7.122 0 0 1 .31-.065l.018-.003a6.305 6.305 0 0 1 .756-.088l.165-.007.166-.002Z",
  fill: "#FFCD6B"
}), l.createElement("path", {
  d: "M22.475.847c12.34 0 22.345 37.935 22.345 50.276 0 11.395-8.53 20.798-19.552 22.172v19.019c0 1.932-1.25 3.5-2.792 3.5-1.543 0-2.794-1.566-2.794-3.5V73.295C8.659 71.921.13 62.518.13 51.123.13 38.783 10.134.847 22.475.847Z",
  fill: "#FFCD6B"
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 26.4,
  cy: 56.869,
  r: 1.45
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 39.453,
  cy: 58.319,
  r: 1
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 17.698,
  cy: 63.637,
  r: 2.417
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 38.002,
  cy: 51.068,
  r: 2.417
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 18.665,
  cy: 17.228,
  r: 2.417
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 32.201,
  cy: 13.36,
  r: 2.417
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 26.83,
  cy: 20.666,
  r: 1.45
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 38.969,
  cy: 31.731,
  r: 2.417
}), l.createElement("circle", {
  fill: "#FFB400",
  cx: 25.433,
  cy: 29.797,
  r: 1.45
}), l.createElement("path", {
  d: "M34.197 53.033c0 9.825-6.934 18.017-16.172 19.987a22.44 22.44 0 0 0 4.45.448c12.34 0 22.344-10.004 22.344-22.345C44.82 38.783 34.815.847 22.475.847c8.947 14.03 11.722 40.891 11.722 52.186Z",
  fill: "#FBBE47"
})))), Sb = l.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, l.createElement("defs", null, l.createElement("linearGradient", {
  x1: "50%",
  y1: "-116.862%",
  x2: "50%",
  y2: "90.764%",
  id: "error-block-image-busy-a"
}, l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.207,
  offset: "0%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0.115,
  offset: "80.072%"
}), l.createElement("stop", {
  stopColor: "#72A7FD",
  stopOpacity: 0,
  offset: "100%"
})), l.createElement("circle", {
  id: "error-block-image-busy-b",
  cx: 34.857,
  cy: 34.857,
  r: 34.857
})), l.createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("path", {
  d: "M157.964 243.667H0L3.806 99.134a4.572 4.572 0 0 1 4.353-4.446l.217-.005h45.588V67.205a4.572 4.572 0 0 1 4.356-4.566l.216-.005 65.498-.001 2.554-58.688a4.571 4.571 0 0 1 4.779-4.368l.214.015 87.79 8.222a4.572 4.572 0 0 1 4.126 4.133l.015.213 3.146 69.652 74.976-17.906a4.571 4.571 0 0 1 5.628 4.23l.005.216v43.955h56.162v130.265l-56.163-.001v.002h-82.383v-.004h-66.919v1.098Zm-68.461-84.631h-9.968v8.435h9.968v-8.435Zm0-14.508h-9.968v8.436h9.968v-8.436Zm197.985-5.149h-9.967v8.432h9.967v-8.432Zm-197.985-8.806h-9.968v8.436h9.968v-8.436Zm197.985-5.153h-9.967v8.432h9.967v-8.432Zm0-14.503h-9.967v8.432h9.967v-8.432Zm-84.643-.777h-30.8v8.436h30.8v-8.436Zm84.643-13.186h-9.967v8.435h9.967v-8.435Zm-84.643-3.29h-30.8v8.435h30.8v-8.435Zm0-15.912h-30.8v8.436h30.8v-8.436Z",
  transform: "translate(18.286 51.286)",
  fill: "url(#error-block-image-busy-a)"
}), l.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l.958-.01c-.376 7.363 3.679 59.93 34.894 62.659 4.203.367 7.432.39 7.475 4.609.042 4.218-3.176 4.307-7.37 4.76-34.593 3.737-34.136 56.004-33.61 63.357l-.957.01c-5.276.053-9.51 4.373-9.455 9.649.053 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.054 9.508-4.374 9.455-9.648-.055-5.276-4.374-9.51-9.65-9.455l-.958.01c.377-7.363-.729-59.672-34.894-62.66-4.202-.367-7.432-.39-7.474-4.608-.043-4.219 3.175-4.308 7.369-4.76 31.276-3.377 34.136-56.004 33.61-63.357l.958-.01c5.276-.053 9.508-4.373 9.455-9.649-.055-5.276-4.374-9.509-9.65-9.454Z",
  fill: "#377EFF"
}), l.createElement("path", {
  d: "M233.524 314.422c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.894-5.644c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-.149 17.865c.108.684.773 1.147 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm-2.144-8.182c.109.684.773 1.148 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-1.586-4.694c.108.684.772 1.148 1.483 1.035.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.013-5.88c.109.685.773 1.148 1.484 1.036.71-.113 1.2-.759 1.09-1.443-.107-.684-.772-1.148-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm.236 15.575c.108.685.772 1.148 1.483 1.035.71-.112 1.2-.758 1.09-1.442-.107-.685-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.442Zm-.4 4.494c.108.684.772 1.147 1.483 1.035.71-.113 1.2-.759 1.091-1.443-.108-.684-.773-1.148-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-3.88-8.601c.108.684.772 1.147 1.483 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.113-1.2.759-1.09 1.443Zm-.524-7.186c.065.41.463.688.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-2.265-4.102c.109.684.773 1.148 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.147-1.483-1.035-.71.113-1.199.759-1.09 1.443Zm-.545-6.518c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm2.098 23.629c.109.684.773 1.147 1.484 1.035.71-.113 1.2-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.199.758-1.09 1.443Zm-.756-9.65c.043.274.309.46.593.414a.512.512 0 0 0 .437-.577.512.512 0 0 0-.594-.414.512.512 0 0 0-.436.577Zm-.808 20.96c.109.684.773 1.147 1.484 1.034.71-.112 1.2-.758 1.09-1.442-.108-.685-.772-1.148-1.483-1.036-.71.113-1.199.759-1.09 1.443Zm-4.691-31.966c.065.41.463.689.89.621.426-.068.72-.455.654-.866-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm2.098 23.628c.108.684.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.443-.108-.684-.772-1.147-1.483-1.035-.711.113-1.2.759-1.091 1.443Zm-1.967-12.416c.109.684.773 1.147 1.484 1.035.71-.113 1.199-.759 1.09-1.443-.108-.684-.772-1.148-1.483-1.035-.71.112-1.2.758-1.09 1.443Zm1.073 6.772c.108.685.772 1.148 1.483 1.035.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.036-.711.113-1.2.759-1.091 1.443Zm-.009-3.131c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.43-9.03c.065.41.463.688.89.62.426-.067.72-.454.655-.865-.065-.41-.464-.689-.89-.62-.427.067-.72.454-.655.865ZM214.5 333.38c.108.685.772 1.148 1.483 1.036.711-.113 1.2-.759 1.091-1.443-.108-.684-.772-1.148-1.483-1.035-.711.112-1.2.758-1.091 1.442Zm-.156-7.178c.065.41.464.689.89.621.427-.067.72-.455.655-.865-.065-.41-.464-.689-.89-.621-.427.067-.72.455-.655.865Zm-1.871-4.72c.108.684.773 1.147 1.483 1.034.711-.112 1.2-.758 1.091-1.442-.108-.685-.772-1.148-1.483-1.035-.71.112-1.2.758-1.091 1.442Zm-1.614-6.857c.065.41.464.689.89.621.427-.068.72-.455.655-.866-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-.894-5.644c.065.41.464.689.89.621.427-.067.72-.455.655-.866-.065-.41-.463-.688-.89-.62-.427.067-.72.455-.655.865Zm-1.43-9.03c.065.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.464-.688-.89-.62-.427.067-.72.454-.655.865Zm-1.958 14.225c.065.41.463.689.89.62.426-.067.72-.454.654-.865-.065-.41-.463-.688-.89-.62-.426.067-.72.454-.654.865Zm-.703 12.81c.065.41.464.688.89.62.427-.067.72-.455.655-.865-.065-.41-.463-.689-.89-.621-.427.067-.72.455-.655.866Zm-4.543-22.536c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm2.806 30.138c.065.41.463.689.89.621.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.865Zm-5.694-17.996c.065.41.463.688.89.62.426-.067.72-.455.654-.865-.065-.41-.463-.689-.89-.621-.426.067-.72.455-.654.866Zm-2.935-13.343c.066.41.464.688.89.62.427-.067.72-.454.655-.865-.065-.41-.463-.689-.89-.621-.426.068-.72.455-.655.866Z",
  fill: "#003CFF",
  fillRule: "nonzero"
}), l.createElement("path", {
  d: "m250.934 176.555-101.963 1.038c-5.276.054-9.51 4.374-9.455 9.65.054 5.274 4.374 9.507 9.649 9.454l101.963-1.04c5.276-.052 9.508-4.372 9.455-9.648-.055-5.276-4.374-9.509-9.65-9.454ZM252.64 331.241l-101.964 1.038c-5.275.054-9.508 4.374-9.454 9.65.054 5.275 4.374 9.508 9.649 9.454l101.963-1.039c5.275-.053 9.507-4.373 9.454-9.649-.054-5.275-4.374-9.508-9.649-9.454Z",
  fill: "#7EACFF"
}), l.createElement("path", {
  stroke: "#003CFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  d: "m196.824 197.298 52.216-.506M193.329 330.5h52.215"
}), l.createElement("path", {
  d: "M167.367 228.041c-4.091-10.787-6.086-20.934-5.985-30.44",
  stroke: "#FFF",
  strokeWidth: 0.75,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}), l.createElement("circle", {
  cx: 14.857,
  cy: 14.857,
  r: 14.857,
  transform: "translate(106.857 248.571)",
  fill: "#FFCD6B",
  fillRule: "nonzero"
}), l.createElement("g", {
  transform: "translate(236.571 284.571)"
}, l.createElement("mask", {
  id: "error-block-image-busy-c",
  fill: "#fff"
}, l.createElement("use", {
  xlinkHref: "#error-block-image-busy-b"
})), l.createElement("use", {
  fill: "#FBBE47",
  fillRule: "nonzero",
  xlinkHref: "#error-block-image-busy-b"
}), l.createElement("circle", {
  fill: "#FFCD6B",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 25.714,
  cy: 28,
  r: 34.857
}), l.createElement("circle", {
  fill: "#FFF",
  fillRule: "nonzero",
  mask: "url(#error-block-image-busy-c)",
  cx: 22.286,
  cy: 18.857,
  r: 3.429
})))), Fb = {
  default: _b,
  disconnected: kb,
  empty: Ob,
  busy: Sb
}, M_ = $b(Fb), Yi = "adm-floating-bubble", Nb = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, I_ = (t) => {
  const e = U(Nb, t), n = V(null), r = V(null), [i, a] = K(e.offset === void 0 ? e.defaultOffset : e.offset);
  X(() => {
    e.offset !== void 0 && u.start({
      x: e.offset.x,
      y: e.offset.y
    });
  }, [e.offset]);
  const [{
    x: o,
    y: s,
    opacity: c
  }, u] = Te(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = Ft((d) => {
    var m;
    let b = d.offset[0], p = d.offset[1];
    if (d.last && e.magnetic) {
      const y = n.current, g = r.current;
      if (!y || !g)
        return;
      const C = y.getBoundingClientRect(), h = g.getBoundingClientRect();
      if (e.magnetic === "x") {
        const w = o.goal - o.get(), E = h.left + w - C.left, x = C.right - (h.right + w);
        x <= E ? b += x : b -= E;
      } else if (e.magnetic === "y") {
        const w = s.goal - s.get(), E = h.top + w - C.top, x = C.bottom - (h.bottom + w);
        x <= E ? p += x : p -= E;
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
    from: () => [o.get(), s.get()]
  });
  return W(e, l.createElement("div", {
    className: Yi
  }, l.createElement("div", {
    className: `${Yi}-boundary-outer`
  }, l.createElement("div", {
    className: `${Yi}-boundary`,
    ref: n
  })), l.createElement(ge.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: N7([o, s], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: e.onClick,
    className: `${Yi}-button`,
    ref: r
  }), e.children)));
};
function Ll(t, e) {
  return t.reduce((n, r) => Math.abs(n - e) < Math.abs(r - e) ? n : r);
}
const Wr = "adm-floating-panel", Pb = {
  handleDraggingOfContent: !0
}, L_ = me((t, e) => {
  var n, r;
  const i = U(Pb, t), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map((C) => -C), c = V(null), u = V(null), f = V(null), [d, m] = K(!1), b = V(!1), p = {
    top: s[s.length - 1],
    bottom: s[0]
  }, v = Zt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y
  }, g] = Te(() => ({
    y: p.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      v(-C.value.y, y.isAnimating);
    }
  }));
  return Ft((C) => {
    const [, h] = C.offset;
    if (C.first) {
      const x = C.event.target, $ = u.current;
      if ($ === x || $ != null && $.contains(x))
        b.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = y.goal <= p.top, F = f.current;
        if (!F)
          return;
        N ? F.scrollTop <= 0 && C.direction[1] > 0 && (b.current = !0) : b.current = !0;
      }
    }
    if (m(b.current), !b.current)
      return;
    const {
      event: w
    } = C;
    w.cancelable && Tn && w.preventDefault(), w.stopPropagation();
    let E = h;
    C.last && (b.current = !1, m(!1), E = Ll(s, h)), g.start({
      y: E
    });
  }, {
    axis: "y",
    bounds: p,
    rubberband: !0,
    from: () => [0, y.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Tn ? {
      passive: !1
    } : void 0
  }), we(e, () => ({
    setHeight: (C, h) => {
      g.start({
        y: -C,
        immediate: h == null ? void 0 : h.immediate
      });
    }
  }), [g]), Ua(c, !0), W(i, l.createElement(ge.div, {
    ref: c,
    className: Wr,
    style: {
      height: Math.round(o),
      translateY: y.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, l.createElement("div", {
    className: `${Wr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), l.createElement("div", {
    className: `${Wr}-header`,
    ref: u
  }, l.createElement("div", {
    className: `${Wr}-bar`
  })), l.createElement("div", {
    className: `${Wr}-content`,
    ref: f
  }, i.children)));
});
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
function Ab(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(e.indexOf(i) >= 0) && (n[i] = t[i]);
  return n;
}
function Dl(t, e) {
  if (t == null)
    return {};
  var n = Ab(t, e), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(t);
    for (i = 0; i < a.length; i++)
      r = a[i], !(e.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(t, r) && (n[r] = t[r]);
  }
  return n;
}
function qe(t) {
  "@babel/helpers - typeof";
  return qe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, qe(t);
}
function Tb(t, e) {
  if (qe(t) !== "object" || t === null)
    return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e || "default");
    if (qe(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function q1(t) {
  var e = Tb(t, "string");
  return qe(e) === "symbol" ? e : String(e);
}
function je(t, e, n) {
  return e = q1(e), e in t ? Object.defineProperty(t, e, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = n, t;
}
function Zu(t, e) {
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
    e % 2 ? Zu(Object(n), !0).forEach(function(r) {
      je(t, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : Zu(Object(n)).forEach(function(r) {
      Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return t;
}
function xs(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var n = 0, r = new Array(e); n < e; n++)
    r[n] = t[n];
  return r;
}
function Rb(t) {
  if (Array.isArray(t))
    return xs(t);
}
function K1(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function Vl(t, e) {
  if (t) {
    if (typeof t == "string")
      return xs(t, e);
    var n = Object.prototype.toString.call(t).slice(8, -1);
    if (n === "Object" && t.constructor && (n = t.constructor.name), n === "Map" || n === "Set")
      return Array.from(t);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return xs(t, e);
  }
}
function Mb() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function se(t) {
  return Rb(t) || K1(t) || Vl(t) || Mb();
}
function Ai(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Hu(t, e) {
  for (var n = 0; n < e.length; n++) {
    var r = e[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, q1(r.key), r);
  }
}
function Ti(t, e, n) {
  return e && Hu(t.prototype, e), n && Hu(t, n), Object.defineProperty(t, "prototype", {
    writable: !1
  }), t;
}
function G1(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function $s(t, e) {
  return $s = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, $s(t, e);
}
function Ib(t, e) {
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
  }), e && $s(t, e);
}
function Na(t) {
  return Na = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Na(t);
}
function Lb() {
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
function Db(t, e) {
  if (e && (qe(e) === "object" || typeof e == "function"))
    return e;
  if (e !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return G1(t);
}
function Vb(t) {
  var e = Lb();
  return function() {
    var r = Na(t), i;
    if (e) {
      var a = Na(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return Db(this, i);
  };
}
function _s(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(t, function(r) {
    r == null && !e.keepEmpty || (Array.isArray(r) ? n = n.concat(_s(r)) : Sa.isFragment(r) && r.props ? n = n.concat(_s(r.props.children, e)) : n.push(r));
  }), n;
}
var ks = {}, jb = function(e) {
};
function Bb(t, e) {
}
function Wb(t, e) {
}
function Zb() {
  ks = {};
}
function Y1(t, e, n) {
  !e && !ks[n] && (t(!1, n), ks[n] = !0);
}
function pt(t, e) {
  Y1(Bb, t, e);
}
function Hb(t, e) {
  Y1(Wb, t, e);
}
pt.preMessage = jb;
pt.resetWarned = Zb;
pt.noteOnce = Hb;
var Fn = "RC_FORM_INTERNAL_HOOKS", fe = function() {
  pt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, In = /* @__PURE__ */ L.createContext({
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
function Os(t) {
  return t == null ? [] : Array.isArray(t) ? t : [t];
}
function Bt() {
  Bt = function() {
    return e;
  };
  var t, e = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(S, O, R) {
    S[O] = R.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(S, O, R) {
    return Object.defineProperty(S, O, {
      value: R,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), S[O];
  }
  try {
    u({}, "");
  } catch {
    u = function(R, P, M) {
      return R[P] = M;
    };
  }
  function f(S, O, R, P) {
    var M = O && O.prototype instanceof g ? O : g, j = Object.create(M.prototype), Z = new _(P || []);
    return i(j, "_invoke", {
      value: k(S, R, Z)
    }), j;
  }
  function d(S, O, R) {
    try {
      return {
        type: "normal",
        arg: S.call(O, R)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  e.wrap = f;
  var m = "suspendedStart", b = "suspendedYield", p = "executing", v = "completed", y = {};
  function g() {
  }
  function C() {
  }
  function h() {
  }
  var w = {};
  u(w, o, function() {
    return this;
  });
  var E = Object.getPrototypeOf, x = E && E(E(T([])));
  x && x !== n && r.call(x, o) && (w = x);
  var $ = h.prototype = g.prototype = Object.create(w);
  function N(S) {
    ["next", "throw", "return"].forEach(function(O) {
      u(S, O, function(R) {
        return this._invoke(O, R);
      });
    });
  }
  function F(S, O) {
    function R(M, j, Z, q) {
      var G = d(S[M], S, j);
      if (G.type !== "throw") {
        var Y = G.arg, ce = Y.value;
        return ce && qe(ce) == "object" && r.call(ce, "__await") ? O.resolve(ce.__await).then(function(he) {
          R("next", he, Z, q);
        }, function(he) {
          R("throw", he, Z, q);
        }) : O.resolve(ce).then(function(he) {
          Y.value = he, Z(Y);
        }, function(he) {
          return R("throw", he, Z, q);
        });
      }
      q(G.arg);
    }
    var P;
    i(this, "_invoke", {
      value: function(j, Z) {
        function q() {
          return new O(function(G, Y) {
            R(j, Z, G, Y);
          });
        }
        return P = P ? P.then(q, q) : q();
      }
    });
  }
  function k(S, O, R) {
    var P = m;
    return function(M, j) {
      if (P === p)
        throw new Error("Generator is already running");
      if (P === v) {
        if (M === "throw")
          throw j;
        return {
          value: t,
          done: !0
        };
      }
      for (R.method = M, R.arg = j; ; ) {
        var Z = R.delegate;
        if (Z) {
          var q = D(Z, R);
          if (q) {
            if (q === y)
              continue;
            return q;
          }
        }
        if (R.method === "next")
          R.sent = R._sent = R.arg;
        else if (R.method === "throw") {
          if (P === m)
            throw P = v, R.arg;
          R.dispatchException(R.arg);
        } else
          R.method === "return" && R.abrupt("return", R.arg);
        P = p;
        var G = d(S, O, R);
        if (G.type === "normal") {
          if (P = R.done ? v : b, G.arg === y)
            continue;
          return {
            value: G.arg,
            done: R.done
          };
        }
        G.type === "throw" && (P = v, R.method = "throw", R.arg = G.arg);
      }
    };
  }
  function D(S, O) {
    var R = O.method, P = S.iterator[R];
    if (P === t)
      return O.delegate = null, R === "throw" && S.iterator.return && (O.method = "return", O.arg = t, D(S, O), O.method === "throw") || R !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + R + "' method")), y;
    var M = d(P, S.iterator, O.arg);
    if (M.type === "throw")
      return O.method = "throw", O.arg = M.arg, O.delegate = null, y;
    var j = M.arg;
    return j ? j.done ? (O[S.resultName] = j.value, O.next = S.nextLoc, O.method !== "return" && (O.method = "next", O.arg = t), O.delegate = null, y) : j : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, y);
  }
  function I(S) {
    var O = {
      tryLoc: S[0]
    };
    1 in S && (O.catchLoc = S[1]), 2 in S && (O.finallyLoc = S[2], O.afterLoc = S[3]), this.tryEntries.push(O);
  }
  function A(S) {
    var O = S.completion || {};
    O.type = "normal", delete O.arg, S.completion = O;
  }
  function _(S) {
    this.tryEntries = [{
      tryLoc: "root"
    }], S.forEach(I, this), this.reset(!0);
  }
  function T(S) {
    if (S || S === "") {
      var O = S[o];
      if (O)
        return O.call(S);
      if (typeof S.next == "function")
        return S;
      if (!isNaN(S.length)) {
        var R = -1, P = function M() {
          for (; ++R < S.length; )
            if (r.call(S, R))
              return M.value = S[R], M.done = !1, M;
          return M.value = t, M.done = !0, M;
        };
        return P.next = P;
      }
    }
    throw new TypeError(qe(S) + " is not iterable");
  }
  return C.prototype = h, i($, "constructor", {
    value: h,
    configurable: !0
  }), i(h, "constructor", {
    value: C,
    configurable: !0
  }), C.displayName = u(h, c, "GeneratorFunction"), e.isGeneratorFunction = function(S) {
    var O = typeof S == "function" && S.constructor;
    return !!O && (O === C || (O.displayName || O.name) === "GeneratorFunction");
  }, e.mark = function(S) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(S, h) : (S.__proto__ = h, u(S, c, "GeneratorFunction")), S.prototype = Object.create($), S;
  }, e.awrap = function(S) {
    return {
      __await: S
    };
  }, N(F.prototype), u(F.prototype, s, function() {
    return this;
  }), e.AsyncIterator = F, e.async = function(S, O, R, P, M) {
    M === void 0 && (M = Promise);
    var j = new F(f(S, O, R, P), M);
    return e.isGeneratorFunction(O) ? j : j.next().then(function(Z) {
      return Z.done ? Z.value : j.next();
    });
  }, N($), u($, c, "Generator"), u($, o, function() {
    return this;
  }), u($, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(S) {
    var O = Object(S), R = [];
    for (var P in O)
      R.push(P);
    return R.reverse(), function M() {
      for (; R.length; ) {
        var j = R.pop();
        if (j in O)
          return M.value = j, M.done = !1, M;
      }
      return M.done = !0, M;
    };
  }, e.values = T, _.prototype = {
    constructor: _,
    reset: function(O) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(A), !O)
        for (var R in this)
          R.charAt(0) === "t" && r.call(this, R) && !isNaN(+R.slice(1)) && (this[R] = t);
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
      var R = this;
      function P(Y, ce) {
        return Z.type = "throw", Z.arg = O, R.next = Y, ce && (R.method = "next", R.arg = t), !!ce;
      }
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var j = this.tryEntries[M], Z = j.completion;
        if (j.tryLoc === "root")
          return P("end");
        if (j.tryLoc <= this.prev) {
          var q = r.call(j, "catchLoc"), G = r.call(j, "finallyLoc");
          if (q && G) {
            if (this.prev < j.catchLoc)
              return P(j.catchLoc, !0);
            if (this.prev < j.finallyLoc)
              return P(j.finallyLoc);
          } else if (q) {
            if (this.prev < j.catchLoc)
              return P(j.catchLoc, !0);
          } else {
            if (!G)
              throw new Error("try statement without catch or finally");
            if (this.prev < j.finallyLoc)
              return P(j.finallyLoc);
          }
        }
      }
    },
    abrupt: function(O, R) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var M = this.tryEntries[P];
        if (M.tryLoc <= this.prev && r.call(M, "finallyLoc") && this.prev < M.finallyLoc) {
          var j = M;
          break;
        }
      }
      j && (O === "break" || O === "continue") && j.tryLoc <= R && R <= j.finallyLoc && (j = null);
      var Z = j ? j.completion : {};
      return Z.type = O, Z.arg = R, j ? (this.method = "next", this.next = j.finallyLoc, y) : this.complete(Z);
    },
    complete: function(O, R) {
      if (O.type === "throw")
        throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && R && (this.next = R), y;
    },
    finish: function(O) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var P = this.tryEntries[R];
        if (P.finallyLoc === O)
          return this.complete(P.completion, P.afterLoc), A(P), y;
      }
    },
    catch: function(O) {
      for (var R = this.tryEntries.length - 1; R >= 0; --R) {
        var P = this.tryEntries[R];
        if (P.tryLoc === O) {
          var M = P.completion;
          if (M.type === "throw") {
            var j = M.arg;
            A(P);
          }
          return j;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(O, R, P) {
      return this.delegate = {
        iterator: T(O),
        resultName: R,
        nextLoc: P
      }, this.method === "next" && (this.arg = t), y;
    }
  }, e;
}
function zu(t, e, n, r, i, a, o) {
  try {
    var s = t[a](o), c = s.value;
  } catch (u) {
    n(u);
    return;
  }
  s.done ? e(c) : Promise.resolve(c).then(r, i);
}
function bo(t) {
  return function() {
    var e = this, n = arguments;
    return new Promise(function(r, i) {
      var a = t.apply(e, n);
      function o(c) {
        zu(a, r, i, o, s, "next", c);
      }
      function s(c) {
        zu(a, r, i, o, s, "throw", c);
      }
      o(void 0);
    });
  };
}
function Nn() {
  return Nn = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Nn.apply(this, arguments);
}
function zb(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, pi(t, e);
}
function Ss(t) {
  return Ss = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ss(t);
}
function pi(t, e) {
  return pi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, pi(t, e);
}
function Ub() {
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
function la(t, e, n) {
  return Ub() ? la = Reflect.construct.bind() : la = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && pi(u, o.prototype), u;
  }, la.apply(null, arguments);
}
function qb(t) {
  return Function.toString.call(t).indexOf("[native code]") !== -1;
}
function Fs(t) {
  var e = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Fs = function(r) {
    if (r === null || !qb(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof e < "u") {
      if (e.has(r))
        return e.get(r);
      e.set(r, i);
    }
    function i() {
      return la(r, arguments, Ss(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), pi(i, r);
  }, Fs(t);
}
var Kb = /%[sdj%]/g, Gb = function() {
};
typeof process < "u" && process.env;
function Ns(t) {
  if (!t || !t.length)
    return null;
  var e = {};
  return t.forEach(function(n) {
    var r = n.field;
    e[r] = e[r] || [], e[r].push(n);
  }), e;
}
function Qe(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof t == "function")
    return t.apply(null, n);
  if (typeof t == "string") {
    var o = t.replace(Kb, function(s) {
      if (s === "%%")
        return "%";
      if (i >= a)
        return s;
      switch (s) {
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
          return s;
      }
    });
    return o;
  }
  return t;
}
function Yb(t) {
  return t === "string" || t === "url" || t === "hex" || t === "email" || t === "date" || t === "pattern";
}
function Pe(t, e) {
  return !!(t == null || e === "array" && Array.isArray(t) && !t.length || Yb(e) && typeof t == "string" && !t);
}
function Xb(t, e, n) {
  var r = [], i = 0, a = t.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  t.forEach(function(s) {
    e(s, o);
  });
}
function Uu(t, e, n) {
  var r = 0, i = t.length;
  function a(o) {
    if (o && o.length) {
      n(o);
      return;
    }
    var s = r;
    r = r + 1, s < i ? e(t[s], a) : n([]);
  }
  a([]);
}
function Qb(t) {
  var e = [];
  return Object.keys(t).forEach(function(n) {
    e.push.apply(e, t[n] || []);
  }), e;
}
var qu = /* @__PURE__ */ function(t) {
  zb(e, t);
  function e(n, r) {
    var i;
    return i = t.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return e;
}(/* @__PURE__ */ Fs(Error));
function Jb(t, e, n, r, i) {
  if (e.first) {
    var a = new Promise(function(m, b) {
      var p = function(g) {
        return r(g), g.length ? b(new qu(g, Ns(g))) : m(i);
      }, v = Qb(t);
      Uu(v, n, p);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = e.firstFields === !0 ? Object.keys(t) : e.firstFields || [], s = Object.keys(t), c = s.length, u = 0, f = [], d = new Promise(function(m, b) {
    var p = function(y) {
      if (f.push.apply(f, y), u++, u === c)
        return r(f), f.length ? b(new qu(f, Ns(f))) : m(i);
    };
    s.length || (r(f), m(i)), s.forEach(function(v) {
      var y = t[v];
      o.indexOf(v) !== -1 ? Uu(y, n, p) : Xb(y, n, p);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function ew(t) {
  return !!(t && t.message !== void 0);
}
function tw(t, e) {
  for (var n = t, r = 0; r < e.length; r++) {
    if (n == null)
      return n;
    n = n[e[r]];
  }
  return n;
}
function Ku(t, e) {
  return function(n) {
    var r;
    return t.fullFields ? r = tw(e, t.fullFields) : r = e[n.field || t.fullField], ew(n) ? (n.field = n.field || t.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || t.fullField
    };
  };
}
function Gu(t, e) {
  if (e) {
    for (var n in e)
      if (e.hasOwnProperty(n)) {
        var r = e[n];
        typeof r == "object" && typeof t[n] == "object" ? t[n] = Nn({}, t[n], r) : t[n] = r;
      }
  }
  return t;
}
var X1 = function(e, n, r, i, a, o) {
  e.required && (!r.hasOwnProperty(e.field) || Pe(n, o || e.type)) && i.push(Qe(a.messages.required, e.fullField));
}, nw = function(e, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Qe(a.messages.whitespace, e.fullField));
}, Xi, rw = function() {
  if (Xi)
    return Xi;
  var t = "[a-fA-F\\d:]", e = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=" + t + ")|(?<=" + t + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), o = new RegExp("^" + n + "$"), s = new RegExp("^" + i + "$"), c = function(w) {
    return w && w.exact ? a : new RegExp("(?:" + e(w) + n + e(w) + ")|(?:" + e(w) + i + e(w) + ")", "g");
  };
  c.v4 = function(h) {
    return h && h.exact ? o : new RegExp("" + e(h) + n + e(h), "g");
  }, c.v6 = function(h) {
    return h && h.exact ? s : new RegExp("" + e(h) + i + e(h), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, b = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", v = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", y = "(?::\\d{2,5})?", g = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + b + p + v + ")" + y + g;
  return Xi = new RegExp("(?:^" + C + "$)", "i"), Xi;
}, Yu = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Xr = {
  integer: function(e) {
    return Xr.number(e) && parseInt(e, 10) === e;
  },
  float: function(e) {
    return Xr.number(e) && !Xr.integer(e);
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
    return typeof e == "object" && !Xr.array(e);
  },
  method: function(e) {
    return typeof e == "function";
  },
  email: function(e) {
    return typeof e == "string" && e.length <= 320 && !!e.match(Yu.email);
  },
  url: function(e) {
    return typeof e == "string" && e.length <= 2048 && !!e.match(rw());
  },
  hex: function(e) {
    return typeof e == "string" && !!e.match(Yu.hex);
  }
}, iw = function(e, n, r, i, a) {
  if (e.required && n === void 0) {
    X1(e, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = e.type;
  o.indexOf(s) > -1 ? Xr[s](n) || i.push(Qe(a.messages.types[s], e.fullField, e.type)) : s && typeof n !== e.type && i.push(Qe(a.messages.types[s], e.fullField, e.type));
}, aw = function(e, n, r, i, a) {
  var o = typeof e.len == "number", s = typeof e.min == "number", c = typeof e.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", b = typeof n == "string", p = Array.isArray(n);
  if (m ? d = "number" : b ? d = "string" : p && (d = "array"), !d)
    return !1;
  p && (f = n.length), b && (f = n.replace(u, "_").length), o ? f !== e.len && i.push(Qe(a.messages[d].len, e.fullField, e.len)) : s && !c && f < e.min ? i.push(Qe(a.messages[d].min, e.fullField, e.min)) : c && !s && f > e.max ? i.push(Qe(a.messages[d].max, e.fullField, e.max)) : s && c && (f < e.min || f > e.max) && i.push(Qe(a.messages[d].range, e.fullField, e.min, e.max));
}, Kn = "enum", ow = function(e, n, r, i, a) {
  e[Kn] = Array.isArray(e[Kn]) ? e[Kn] : [], e[Kn].indexOf(n) === -1 && i.push(Qe(a.messages[Kn], e.fullField, e[Kn].join(", ")));
}, sw = function(e, n, r, i, a) {
  if (e.pattern) {
    if (e.pattern instanceof RegExp)
      e.pattern.lastIndex = 0, e.pattern.test(n) || i.push(Qe(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    else if (typeof e.pattern == "string") {
      var o = new RegExp(e.pattern);
      o.test(n) || i.push(Qe(a.messages.pattern.mismatch, e.fullField, n, e.pattern));
    }
  }
}, ne = {
  required: X1,
  whitespace: nw,
  type: iw,
  range: aw,
  enum: ow,
  pattern: sw
}, lw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, o, a, "string"), Pe(n, "string") || (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a), ne.pattern(e, n, i, o, a), e.whitespace === !0 && ne.whitespace(e, n, i, o, a));
  }
  r(o);
}, cw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, uw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (n === "" && (n = void 0), Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, fw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, dw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), Pe(n) || ne.type(e, n, i, o, a);
  }
  r(o);
}, mw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, hw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, vw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (n == null && !e.required)
      return r();
    ne.required(e, n, i, o, a, "array"), n != null && (ne.type(e, n, i, o, a), ne.range(e, n, i, o, a));
  }
  r(o);
}, pw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne.type(e, n, i, o, a);
  }
  r(o);
}, gw = "enum", yw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a), n !== void 0 && ne[gw](e, n, i, o, a);
  }
  r(o);
}, bw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n, "string") && !e.required)
      return r();
    ne.required(e, n, i, o, a), Pe(n, "string") || ne.pattern(e, n, i, o, a);
  }
  r(o);
}, ww = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n, "date") && !e.required)
      return r();
    if (ne.required(e, n, i, o, a), !Pe(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), ne.type(e, c, i, o, a), c && ne.range(e, c.getTime(), i, o, a);
    }
  }
  r(o);
}, Ew = function(e, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  ne.required(e, n, i, o, a, s), r(o);
}, Vo = function(e, n, r, i, a) {
  var o = e.type, s = [], c = e.required || !e.required && i.hasOwnProperty(e.field);
  if (c) {
    if (Pe(n, o) && !e.required)
      return r();
    ne.required(e, n, i, s, a, o), Pe(n, o) || ne.type(e, n, i, s, a);
  }
  r(s);
}, Cw = function(e, n, r, i, a) {
  var o = [], s = e.required || !e.required && i.hasOwnProperty(e.field);
  if (s) {
    if (Pe(n) && !e.required)
      return r();
    ne.required(e, n, i, o, a);
  }
  r(o);
}, ri = {
  string: lw,
  method: cw,
  number: uw,
  boolean: fw,
  regexp: dw,
  integer: mw,
  float: hw,
  array: vw,
  object: pw,
  enum: yw,
  pattern: bw,
  date: ww,
  url: Vo,
  hex: Vo,
  email: Vo,
  required: Ew,
  any: Cw
};
function Ps() {
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
var As = Ps(), Ri = /* @__PURE__ */ function() {
  function t(n) {
    this.rules = null, this._messages = As, this.define(n);
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
    return r && (this._messages = Gu(Ps(), r)), this._messages;
  }, e.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function f(v) {
      var y = [], g = {};
      function C(w) {
        if (Array.isArray(w)) {
          var E;
          y = (E = y).concat.apply(E, w);
        } else
          y.push(w);
      }
      for (var h = 0; h < v.length; h++)
        C(v[h]);
      y.length ? (g = Ns(y), u(y, g)) : u(null, s);
    }
    if (c.messages) {
      var d = this.messages();
      d === As && (d = Ps()), Gu(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, b = c.keys || Object.keys(this.rules);
    b.forEach(function(v) {
      var y = o.rules[v], g = s[v];
      y.forEach(function(C) {
        var h = C;
        typeof h.transform == "function" && (s === r && (s = Nn({}, s)), g = s[v] = h.transform(g)), typeof h == "function" ? h = {
          validator: h
        } : h = Nn({}, h), h.validator = o.getValidationMethod(h), h.validator && (h.field = v, h.fullField = h.fullField || v, h.type = o.getType(h), m[v] = m[v] || [], m[v].push({
          rule: h,
          value: g,
          source: s,
          field: v
        }));
      });
    });
    var p = {};
    return Jb(m, c, function(v, y) {
      var g = v.rule, C = (g.type === "object" || g.type === "array") && (typeof g.fields == "object" || typeof g.defaultField == "object");
      C = C && (g.required || !g.required && v.value), g.field = v.field;
      function h(x, $) {
        return Nn({}, $, {
          fullField: g.fullField + "." + x,
          fullFields: g.fullFields ? [].concat(g.fullFields, [x]) : [x]
        });
      }
      function w(x) {
        x === void 0 && (x = []);
        var $ = Array.isArray(x) ? x : [x];
        !c.suppressWarning && $.length && t.warning("async-validator:", $), $.length && g.message !== void 0 && ($ = [].concat(g.message));
        var N = $.map(Ku(g, s));
        if (c.first && N.length)
          return p[g.field] = 1, y(N);
        if (!C)
          y(N);
        else {
          if (g.required && !v.value)
            return g.message !== void 0 ? N = [].concat(g.message).map(Ku(g, s)) : c.error && (N = [c.error(g, Qe(c.messages.required, g.field))]), y(N);
          var F = {};
          g.defaultField && Object.keys(v.value).map(function(I) {
            F[I] = g.defaultField;
          }), F = Nn({}, F, v.rule.fields);
          var k = {};
          Object.keys(F).forEach(function(I) {
            var A = F[I], _ = Array.isArray(A) ? A : [A];
            k[I] = _.map(h.bind(null, I));
          });
          var D = new t(k);
          D.messages(c.messages), v.rule.options && (v.rule.options.messages = c.messages, v.rule.options.error = c.error), D.validate(v.value, v.rule.options || c, function(I) {
            var A = [];
            N && N.length && A.push.apply(A, N), I && I.length && A.push.apply(A, I), y(A.length ? A : null);
          });
        }
      }
      var E;
      if (g.asyncValidator)
        E = g.asyncValidator(g, v.value, w, v.source, c);
      else if (g.validator) {
        try {
          E = g.validator(g, v.value, w, v.source, c);
        } catch (x) {
          console.error == null || console.error(x), c.suppressValidatorError || setTimeout(function() {
            throw x;
          }, 0), w(x.message);
        }
        E === !0 ? w() : E === !1 ? w(typeof g.message == "function" ? g.message(g.fullField || g.field) : g.message || (g.fullField || g.field) + " fails") : E instanceof Array ? w(E) : E instanceof Error && w(E.message);
      }
      E && E.then && E.then(function() {
        return w();
      }, function(x) {
        return w(x);
      });
    }, function(v) {
      f(v);
    }, s);
  }, e.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !ri.hasOwnProperty(r.type))
      throw new Error(Qe("Unknown rule type %s", r.type));
    return r.type || "string";
  }, e.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? ri.required : ri[this.getType(r)] || void 0;
  }, t;
}();
Ri.register = function(e, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  ri[e] = n;
};
Ri.warning = Gb;
Ri.messages = As;
Ri.validators = ri;
var Ye = "'${name}' is not a valid ${type}", Q1 = {
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
function J1(t, e) {
  for (var n = t, r = 0; r < e.length; r += 1) {
    if (n == null)
      return;
    n = n[e[r]];
  }
  return n;
}
function e0(t) {
  if (Array.isArray(t))
    return t;
}
function t0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function xw(t) {
  return e0(t) || K1(t) || Vl(t) || t0();
}
function n0(t, e, n, r) {
  if (!e.length)
    return n;
  var i = xw(e), a = i[0], o = i.slice(1), s;
  return !t && typeof a == "number" ? s = [] : Array.isArray(t) ? s = se(t) : s = oe({}, t), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = n0(s[a], o, n, r), s;
}
function $w(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return e.length && r && n === void 0 && !J1(t, e.slice(0, -1)) ? t : n0(t, e, n, r);
}
function wo(t) {
  return Array.isArray(t) ? kw(t) : qe(t) === "object" && t !== null ? _w(t) : t;
}
function _w(t) {
  if (Object.getPrototypeOf(t) === Object.prototype) {
    var e = {};
    for (var n in t)
      e[n] = wo(t[n]);
    return e;
  }
  return t;
}
function kw(t) {
  return t.map(function(e) {
    return wo(e);
  });
}
function _e(t) {
  return Os(t);
}
function nn(t, e) {
  var n = J1(t, e);
  return n;
}
function Jt(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = $w(t, e, n, r);
  return i;
}
function Xu(t, e) {
  var n = {};
  return e.forEach(function(r) {
    var i = nn(t, r);
    n = Jt(n, r, i);
  }), n;
}
function ii(t, e) {
  return t && t.some(function(n) {
    return i0(n, e);
  });
}
function Qu(t) {
  return qe(t) === "object" && t !== null && Object.getPrototypeOf(t) === Object.prototype;
}
function r0(t, e) {
  var n = Array.isArray(t) ? se(t) : oe({}, t);
  return e && Object.keys(e).forEach(function(r) {
    var i = n[r], a = e[r], o = Qu(i) && Qu(a);
    n[r] = o ? r0(i, a || {}) : wo(a);
  }), n;
}
function ca(t) {
  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return r0(i, a);
  }, t);
}
function i0(t, e) {
  return !t || !e || t.length !== e.length ? !1 : t.every(function(n, r) {
    return e[r] === n;
  });
}
function Ow(t, e) {
  if (t === e)
    return !0;
  if (!t && e || t && !e || !t || !e || qe(t) !== "object" || qe(e) !== "object")
    return !1;
  var n = Object.keys(t), r = Object.keys(e), i = new Set([].concat(n, r));
  return se(i).every(function(a) {
    var o = t[a], s = e[a];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function Sw(t) {
  var e = arguments.length <= 1 ? void 0 : arguments[1];
  return e && e.target && qe(e.target) === "object" && t in e.target ? e.target[t] : e;
}
function Ju(t, e, n) {
  var r = t.length;
  if (e < 0 || e >= r || n < 0 || n >= r)
    return t;
  var i = t[e], a = e - n;
  return a > 0 ? [].concat(se(t.slice(0, n)), [i], se(t.slice(n, e)), se(t.slice(e + 1, r))) : a < 0 ? [].concat(se(t.slice(0, e)), se(t.slice(e + 1, n + 1)), [i], se(t.slice(n + 1, r))) : t;
}
var Fw = Ri;
function Nw(t, e) {
  return t.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return e[r];
  });
}
var ef = "CODE_LOGIC_ERROR";
function Ts(t, e, n, r, i) {
  return Rs.apply(this, arguments);
}
function Rs() {
  return Rs = bo(/* @__PURE__ */ Bt().mark(function t(e, n, r, i, a) {
    var o, s, c, u, f, d, m, b, p;
    return Bt().wrap(function(y) {
      for (; ; )
        switch (y.prev = y.next) {
          case 0:
            return o = oe({}, r), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (g) {
                return console.error(g), Promise.reject(ef);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new Fw(je({}, e, [o])), f = ca({}, Q1, i.validateMessages), u.messages(f), d = [], y.prev = 9, y.next = 12, Promise.resolve(u.validate(je({}, e, n), oe({}, i)));
          case 12:
            y.next = 17;
            break;
          case 14:
            y.prev = 14, y.t0 = y.catch(9), y.t0.errors && (d = y.t0.errors.map(function(g, C) {
              var h = g.message, w = h === ef ? f.default : h;
              return /* @__PURE__ */ L.isValidElement(w) ? (
                // Wrap ReactNode with `key`
                L.cloneElement(w, {
                  key: "error_".concat(C)
                })
              ) : w;
            }));
          case 17:
            if (!(!d.length && c)) {
              y.next = 22;
              break;
            }
            return y.next = 20, Promise.all(n.map(function(g, C) {
              return Ts("".concat(e, ".").concat(C), g, c, i, a);
            }));
          case 20:
            return m = y.sent, y.abrupt("return", m.reduce(function(g, C) {
              return [].concat(se(g), se(C));
            }, []));
          case 22:
            return b = oe(oe({}, r), {}, {
              name: e,
              enum: (r.enum || []).join(", ")
            }, a), p = d.map(function(g) {
              return typeof g == "string" ? Nw(g, b) : g;
            }), y.abrupt("return", p);
          case 25:
          case "end":
            return y.stop();
        }
    }, t, null, [[9, 14]]);
  })), Rs.apply(this, arguments);
}
function Pw(t, e, n, r, i, a) {
  var o = t.join("."), s = n.map(function(f, d) {
    var m = f.validator, b = oe(oe({}, f), {}, {
      ruleIndex: d
    });
    return m && (b.validator = function(p, v, y) {
      var g = !1, C = function() {
        for (var E = arguments.length, x = new Array(E), $ = 0; $ < E; $++)
          x[$] = arguments[$];
        Promise.resolve().then(function() {
          pt(!g, "Your validator function has already return a promise. `callback` will be ignored."), g || y.apply(void 0, x);
        });
      }, h = m(p, v, C);
      g = h && typeof h.then == "function" && typeof h.catch == "function", pt(g, "`callback` is deprecated. Please return a promise instead."), g && h.then(function() {
        y();
      }).catch(function(w) {
        y(w || " ");
      });
    }), b;
  }).sort(function(f, d) {
    var m = f.warningOnly, b = f.ruleIndex, p = d.warningOnly, v = d.ruleIndex;
    return !!m == !!p ? b - v : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = bo(/* @__PURE__ */ Bt().mark(function d(m, b) {
        var p, v, y;
        return Bt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                p = 0;
              case 1:
                if (!(p < s.length)) {
                  C.next = 12;
                  break;
                }
                return v = s[p], C.next = 5, Ts(o, e, v, r, a);
              case 5:
                if (y = C.sent, !y.length) {
                  C.next = 9;
                  break;
                }
                return b([{
                  errors: y,
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
    var u = s.map(function(f) {
      return Ts(o, e, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? Tw(u) : Aw(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function Aw(t) {
  return Ms.apply(this, arguments);
}
function Ms() {
  return Ms = bo(/* @__PURE__ */ Bt().mark(function t(e) {
    return Bt().wrap(function(r) {
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
  })), Ms.apply(this, arguments);
}
function Tw(t) {
  return Is.apply(this, arguments);
}
function Is() {
  return Is = bo(/* @__PURE__ */ Bt().mark(function t(e) {
    var n;
    return Bt().wrap(function(i) {
      for (; ; )
        switch (i.prev = i.next) {
          case 0:
            return n = 0, i.abrupt("return", new Promise(function(a) {
              e.forEach(function(o) {
                o.then(function(s) {
                  s.errors.length && a([s]), n += 1, n === e.length && a([]);
                });
              });
            }));
          case 2:
          case "end":
            return i.stop();
        }
    }, t);
  })), Is.apply(this, arguments);
}
var Rw = ["name"], tt = [];
function tf(t, e, n, r, i, a) {
  return typeof t == "function" ? t(e, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var jl = /* @__PURE__ */ function(t) {
  Ib(n, t);
  var e = Vb(n);
  function n(r) {
    var i;
    if (Ai(this, n), i = e.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = tt, i.warnings = tt, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, _e(d)), i.cancelRegisterFunc = null;
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
      var d = i.props, m = d.shouldUpdate, b = d.dependencies, p = b === void 0 ? [] : b, v = d.onReset, y = f.store, g = i.getNamePath(), C = i.getValue(c), h = i.getValue(y), w = u && ii(u, g);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== h && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || w) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), v == null || v(), i.refresh();
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
          if (w) {
            var E = f.data;
            "touched" in E && (i.touched = E.touched), "validating" in E && !("originRCField" in E) && (i.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (i.errors = E.errors || tt), "warnings" in E && (i.warnings = E.warnings || tt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !g.length && tf(m, c, y, C, h, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = p.map(_e);
          if (x.some(function($) {
            return ii(f.relatedFields, $);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (w || (!p.length || g.length || m) && tf(m, c, y, C, h, f)) {
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
        var m = i.props, b = m.validateFirst, p = b === void 0 ? !1 : b, v = m.messageVariables, y = c || {}, g = y.triggerName, C = i.getRules();
        g && (C = C.filter(function(w) {
          return w;
        }).filter(function(w) {
          var E = w.validateTrigger;
          if (!E)
            return !0;
          var x = Os(E);
          return x.includes(g);
        }));
        var h = Pw(u, f, C, c, p, v);
        return h.catch(function(w) {
          return w;
        }).then(function() {
          var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tt;
          if (i.validatePromise === d) {
            var E;
            i.validatePromise = null;
            var x = [], $ = [];
            (E = w.forEach) === null || E === void 0 || E.call(w, function(N) {
              var F = N.rule.warningOnly, k = N.errors, D = k === void 0 ? tt : k;
              F ? $.push.apply($, se(D)) : x.push.apply(x, se(D));
            }), i.errors = x, i.warnings = $, i.triggerMetaEvent(), i.reRender();
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
      var c = i.props.fieldContext, u = c.getInternalHooks(Fn), f = u.getInitialValue;
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
      var f = _s(c);
      return f.length !== 1 || !/* @__PURE__ */ L.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return nn(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, b = u.normalize, p = u.valuePropName, v = u.getValueProps, y = u.fieldContext, g = d !== void 0 ? d : y.validateTrigger, C = i.getNamePath(), h = y.getInternalHooks, w = y.getFieldsValue, E = h(Fn), x = E.dispatch, $ = i.getValue(), N = v || function(I) {
        return je({}, p, I);
      }, F = c[f], k = oe(oe({}, c), N($));
      k[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, A = arguments.length, _ = new Array(A), T = 0; T < A; T++)
          _[T] = arguments[T];
        m ? I = m.apply(void 0, _) : I = Sw.apply(void 0, [p].concat(_)), b && (I = b(I, $, w(!0))), x({
          type: "updateValue",
          namePath: C,
          value: I
        }), F && F.apply(void 0, _);
      };
      var D = Os(g || []);
      return D.forEach(function(I) {
        var A = k[I];
        k[I] = function() {
          A && A.apply(void 0, arguments);
          var _ = i.props.rules;
          _ && _.length && x({
            type: "validateField",
            namePath: C,
            triggerName: I
          });
        };
      }), k;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(Fn), s = o.initEntityValue;
      s(G1(i));
    }
    return i;
  }
  return Ti(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, c = s(Fn), u = c.registerField;
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
      var i = this.state.resetCount, a = this.props.children, o = this.getOnlyChild(a), s = o.child, c = o.isFunction, u;
      return c ? u = s : /* @__PURE__ */ L.isValidElement(s) ? u = /* @__PURE__ */ L.cloneElement(s, this.getControlled(s.props)) : (pt(!s, "`children` of Field is not validate ReactElement."), u = s), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
jl.contextType = In;
jl.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function Bl(t) {
  var e = t.name, n = Dl(t, Rw), r = L.useContext(In), i = e !== void 0 ? _e(e) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(jl, Fa({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var Mw = /* @__PURE__ */ L.createContext(null), a0 = function(e) {
  var n = e.name, r = e.initialValue, i = e.children, a = e.rules, o = e.validateTrigger, s = L.useContext(In), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = L.useMemo(function() {
    var p = _e(s.prefixName) || [];
    return [].concat(se(p), se(_e(n)));
  }, [s.prefixName, n]), d = L.useMemo(function() {
    return oe(oe({}, s), {}, {
      prefixName: f
    });
  }, [s, f]), m = L.useMemo(function() {
    return {
      getKey: function(v) {
        var y = f.length, g = v[y];
        return [u.keys[g], v.slice(y + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return pt(!1, "Form.List only accepts function as children."), null;
  var b = function(v, y, g) {
    var C = g.source;
    return C === "internal" ? !1 : v !== y;
  };
  return /* @__PURE__ */ L.createElement(Mw.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(In.Provider, {
    value: d
  }, /* @__PURE__ */ L.createElement(Bl, {
    name: [],
    shouldUpdate: b,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(p, v) {
    var y = p.value, g = y === void 0 ? [] : y, C = p.onChange, h = s.getFieldValue, w = function() {
      var N = h(f || []);
      return N || [];
    }, E = {
      add: function(N, F) {
        var k = w();
        F >= 0 && F <= k.length ? (u.keys = [].concat(se(u.keys.slice(0, F)), [u.id], se(u.keys.slice(F))), C([].concat(se(k.slice(0, F)), [N], se(k.slice(F))))) : (u.keys = [].concat(se(u.keys), [u.id]), C([].concat(se(k), [N]))), u.id += 1;
      },
      remove: function(N) {
        var F = w(), k = new Set(Array.isArray(N) ? N : [N]);
        k.size <= 0 || (u.keys = u.keys.filter(function(D, I) {
          return !k.has(I);
        }), C(F.filter(function(D, I) {
          return !k.has(I);
        })));
      },
      move: function(N, F) {
        if (N !== F) {
          var k = w();
          N < 0 || N >= k.length || F < 0 || F >= k.length || (u.keys = Ju(u.keys, N, F), C(Ju(k, N, F)));
        }
      }
    }, x = g || [];
    return Array.isArray(x) || (x = []), i(x.map(function($, N) {
      var F = u.keys[N];
      return F === void 0 && (u.keys[N] = u.id, F = u.keys[N], u.id += 1), {
        name: N,
        key: F,
        isListField: !0
      };
    }), E, v);
  })));
};
function Iw(t, e) {
  var n = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (n != null) {
    var r, i, a, o, s = [], c = !0, u = !1;
    try {
      if (a = (n = n.call(t)).next, e === 0) {
        if (Object(n) !== n)
          return;
        c = !1;
      } else
        for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== e); c = !0)
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
    return s;
  }
}
function sn(t, e) {
  return e0(t) || Iw(t, e) || Vl(t, e) || t0();
}
function Lw(t) {
  var e = !1, n = t.length, r = [];
  return t.length ? new Promise(function(i, a) {
    t.forEach(function(o, s) {
      o.catch(function(c) {
        return e = !0, c;
      }).then(function(c) {
        n -= 1, r[s] = c, !(n > 0) && (e && a(r), i(r));
      });
    });
  }) : Promise.resolve([]);
}
var o0 = "__@field_split__";
function jo(t) {
  return t.map(function(e) {
    return "".concat(qe(e), ":").concat(e);
  }).join(o0);
}
var Gn = /* @__PURE__ */ function() {
  function t() {
    Ai(this, t), this.kvs = /* @__PURE__ */ new Map();
  }
  return Ti(t, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(jo(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(jo(n));
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
      this.kvs.delete(jo(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return se(this.kvs.entries()).map(function(r) {
        var i = sn(r, 2), a = i[0], o = i[1], s = a.split(o0);
        return n({
          key: s.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = sn(u, 3), d = f[1], m = f[2];
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
}(), Dw = ["name", "errors"], Vw = /* @__PURE__ */ Ti(function t(e) {
  var n = this;
  Ai(this, t), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === Fn ? (n.formHooked = !0, {
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
    }) : (pt(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(r) {
    n.subscribable = r;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(r, i) {
    if (n.initialValues = r || {}, i) {
      var a, o = ca({}, r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(s) {
        var c = s.key;
        o = Jt(o, c, nn(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new Gn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = nn(n.initialValues, r);
    return r.length ? wo(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Gn();
    return n.getFieldEntities(r).forEach(function(a) {
      var o = a.getNamePath();
      i.set(o, a);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(a) {
      var o = _e(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: _e(a)
      };
    });
  }, this.getFieldsValue = function(r, i) {
    if (n.warningUnhooked(), r === !0 && !i)
      return n.store;
    var a = n.getFieldEntitiesForNamePathList(Array.isArray(r) ? r : null), o = [];
    return a.forEach(function(s) {
      var c, u = "INVALIDATE_NAME_PATH" in s ? s.INVALIDATE_NAME_PATH : s.getNamePath();
      if (!(!r && (!((c = s.isListField) === null || c === void 0) && c.call(s))))
        if (!i)
          o.push(u);
        else {
          var f = "getMeta" in s ? s.getMeta() : null;
          i(f) && o.push(u);
        }
    }), Xu(n.store, o.map(_e));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = _e(r);
    return nn(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: _e(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = _e(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = _e(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], s = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(_e), u = !1) : (c = null, u = o) : (c = o.map(_e), u = s);
    var f = n.getFieldEntities(!0), d = function(y) {
      return y.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Gn();
    c.forEach(function(v) {
      m.set(v, []);
    }), f.forEach(function(v) {
      var y = v.getNamePath();
      c.forEach(function(g) {
        g.every(function(C, h) {
          return y[h] === C;
        }) && m.update(g, function(C) {
          return [].concat(se(C), [v]);
        });
      });
    });
    var b = function(y) {
      return y.some(d);
    }, p = m.map(function(v) {
      var y = v.value;
      return y;
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
    var a = r.map(_e);
    return i.some(function(o) {
      var s = o.getNamePath();
      return ii(a, s) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Gn(), a = n.getFieldEntities(!0);
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
            pt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var p = i.get(m);
            if (p && p.size > 1)
              pt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (p) {
              var v = n.getFieldValue(m);
              (!r.skipExist || v === void 0) && n.updateStore(Jt(n.store, m, se(p)[0].value));
            }
          }
        }
      });
    }, s;
    r.entities ? s = r.entities : r.namePathList ? (s = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = s).push.apply(f, se(se(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = a, o(s);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(ca({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(_e);
    a.forEach(function(o) {
      var s = n.getInitialValue(o);
      n.updateStore(Jt(n.store, o, s));
    }), n.resetWithFieldInitialValue({
      namePathList: a
    }), n.notifyObservers(i, a, {
      type: "reset"
    }), n.notifyWatch(a);
  }, this.setFields = function(r) {
    n.warningUnhooked();
    var i = n.store, a = [];
    r.forEach(function(o) {
      var s = o.name;
      o.errors;
      var c = Dl(o, Dw), u = _e(s);
      a.push(u), "value" in c && n.updateStore(Jt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), s = a.getMeta(), c = oe(oe({}, s), {}, {
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
      var a = r.getNamePath(), o = nn(n.store, a);
      o === void 0 && n.updateStore(Jt(n.store, a, i));
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
    return function(o, s) {
      var c = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      if (n.fieldEntities = n.fieldEntities.filter(function(d) {
        return d !== r;
      }), !n.isMergedPreserve(s) && (!o || c.length > 1)) {
        var u = o ? void 0 : n.getInitialValue(i);
        if (i.length && n.getFieldValue(i) !== u && n.fieldEntities.every(function(d) {
          return (
            // Only reset when no namePath exist
            !i0(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(Jt(f, i, u, !0)), n.notifyObservers(f, [i], {
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
        var o = r.namePath, s = r.triggerName;
        n.validateFields([o], {
          triggerName: s
        });
        break;
      }
    }
  }, this.notifyObservers = function(r, i, a) {
    if (n.subscribable) {
      var o = oe(oe({}, a), {}, {
        store: n.getFieldsValue(!0)
      });
      n.getFieldEntities().forEach(function(s) {
        var c = s.onStoreChange;
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
    var a = _e(r), o = n.store;
    n.updateStore(Jt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var s = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Xu(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(se(s)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = ca(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new Gn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = _e(f);
        o.update(d, function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return m.add(c), m;
        });
      });
    });
    var s = function c(u) {
      var f = o.get(u) || /* @__PURE__ */ new Set();
      f.forEach(function(d) {
        if (!i.has(d)) {
          i.add(d);
          var m = d.getNamePath();
          d.isFieldDirty() && m.length && (a.push(m), c(m));
        }
      });
    };
    return s(r), a;
  }, this.triggerOnFieldsChange = function(r, i) {
    var a = n.callbacks.onFieldsChange;
    if (a) {
      var o = n.getFields();
      if (i) {
        var s = new Gn();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          s.set(f, d);
        }), o.forEach(function(u) {
          u.errors = s.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var f = u.name;
        return ii(r, f);
      });
      a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a = !!r, o = a ? r.map(_e) : [], s = [];
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
        if (!a || ii(o, m)) {
          var b = f.validateRules(oe({
            validateMessages: oe(oe({}, Q1), n.validateMessages)
          }, i));
          s.push(b.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(p) {
            var v, y = [], g = [];
            return (v = p.forEach) === null || v === void 0 || v.call(p, function(C) {
              var h = C.rule.warningOnly, w = C.errors;
              h ? g.push.apply(g, se(w)) : y.push.apply(y, se(w));
            }), y.length ? Promise.reject({
              name: m,
              errors: y,
              warnings: g
            }) : {
              name: m,
              errors: y,
              warnings: g
            };
          }));
        }
      }
    });
    var c = Lw(s);
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
function Wl(t) {
  var e = L.useRef(), n = L.useState({}), r = sn(n, 2), i = r[1];
  if (!e.current)
    if (t)
      e.current = t;
    else {
      var a = function() {
        i({});
      }, o = new Vw(a);
      e.current = o.getForm();
    }
  return [e.current];
}
var Ls = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), jw = function(e) {
  var n = e.validateMessages, r = e.onFormChange, i = e.onFormFinish, a = e.children, o = L.useContext(Ls), s = L.useRef({});
  return /* @__PURE__ */ L.createElement(Ls.Provider, {
    value: oe(oe({}, o), {}, {
      validateMessages: oe(oe({}, o.validateMessages), n),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function(u, f) {
        r && r(u, {
          changedFields: f,
          forms: s.current
        }), o.triggerFormChange(u, f);
      },
      triggerFormFinish: function(u, f) {
        i && i(u, {
          values: f,
          forms: s.current
        }), o.triggerFormFinish(u, f);
      },
      registerForm: function(u, f) {
        u && (s.current = oe(oe({}, s.current), {}, je({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = oe({}, s.current);
        delete f[u], s.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, Bw = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], Ww = function(e, n) {
  var r = e.name, i = e.initialValues, a = e.fields, o = e.form, s = e.preserve, c = e.children, u = e.component, f = u === void 0 ? "form" : u, d = e.validateMessages, m = e.validateTrigger, b = m === void 0 ? "onChange" : m, p = e.onValuesChange, v = e.onFieldsChange, y = e.onFinish, g = e.onFinishFailed, C = Dl(e, Bw), h = L.useContext(Ls), w = Wl(o), E = sn(w, 1), x = E[0], $ = x.getInternalHooks(Fn), N = $.useSubscribe, F = $.setInitialValues, k = $.setCallbacks, D = $.setValidateMessages, I = $.setPreserve, A = $.destroyForm;
  L.useImperativeHandle(n, function() {
    return x;
  }), L.useEffect(function() {
    return h.registerForm(r, x), function() {
      h.unregisterForm(r);
    };
  }, [h, x, r]), D(oe(oe({}, h.validateMessages), d)), k({
    onValuesChange: p,
    onFieldsChange: function(Z) {
      if (h.triggerFormChange(r, Z), v) {
        for (var q = arguments.length, G = new Array(q > 1 ? q - 1 : 0), Y = 1; Y < q; Y++)
          G[Y - 1] = arguments[Y];
        v.apply(void 0, [Z].concat(G));
      }
    },
    onFinish: function(Z) {
      h.triggerFormFinish(r, Z), y && y(Z);
    },
    onFinishFailed: g
  }), I(s);
  var _ = L.useRef(null);
  F(i, !_.current), _.current || (_.current = !0), L.useEffect(
    function() {
      return A;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var T, S = typeof c == "function";
  if (S) {
    var O = x.getFieldsValue(!0);
    T = c(O, x);
  } else
    T = c;
  N(!S);
  var R = L.useRef();
  L.useEffect(function() {
    Ow(R.current || [], a || []) || x.setFields(a || []), R.current = a;
  }, [a, x]);
  var P = L.useMemo(function() {
    return oe(oe({}, x), {}, {
      validateTrigger: b
    });
  }, [x, b]), M = /* @__PURE__ */ L.createElement(In.Provider, {
    value: P
  }, T);
  return f === !1 ? M : /* @__PURE__ */ L.createElement(f, Fa({}, C, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), x.submit();
    },
    onReset: function(Z) {
      var q;
      Z.preventDefault(), x.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, Z);
    }
  }), M);
};
function nf(t) {
  try {
    return JSON.stringify(t);
  } catch {
    return Math.random();
  }
}
function Zl() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  var r = e[0], i = r === void 0 ? [] : r, a = e[1], o = K(), s = sn(o, 2), c = s[0], u = s[1], f = ie(function() {
    return nf(c);
  }, [c]), d = V(f);
  d.current = f;
  var m = ot(In), b = a || m, p = b && b._init, v = _e(i), y = V(v);
  return y.current = v, X(
    function() {
      if (p) {
        var g = b.getFieldsValue, C = b.getInternalHooks, h = C(Fn), w = h.registerWatch, E = w(function($) {
          var N = nn($, y.current), F = nf(N);
          d.current !== F && (d.current = F, u(N));
        }), x = nn(g(), y.current);
        return u(x), E;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [p]
  ), c;
}
var Zw = /* @__PURE__ */ L.forwardRef(Ww), Ar = Zw;
Ar.FormProvider = jw;
Ar.Field = Bl;
Ar.List = a0;
Ar.useForm = Wl;
Ar.useWatch = Zl;
const s0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, Hl = l.createContext(s0), rf = l.createContext(null), l0 = () => null;
var Hw = Ks, zw = wi;
function Uw(t, e, n) {
  (n !== void 0 && !zw(t[e], n) || n === void 0 && !(e in t)) && Hw(t, e, n);
}
var c0 = Uw;
function qw(t) {
  return function(e, n, r) {
    for (var i = -1, a = Object(e), o = r(e), s = o.length; s--; ) {
      var c = o[t ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return e;
  };
}
var Kw = qw, Gw = Kw, Yw = Gw(), Xw = Yw, Pa = { exports: {} };
Pa.exports;
(function(t, e) {
  var n = gt, r = e && !e.nodeType && e, i = r && !0 && t && !t.nodeType && t, a = i && i.exports === r, o = a ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var d = u.length, m = s ? s(d) : new u.constructor(d);
    return u.copy(m), m;
  }
  t.exports = c;
})(Pa, Pa.exports);
var Qw = Pa.exports, af = ed;
function Jw(t) {
  var e = new t.constructor(t.byteLength);
  return new af(e).set(new af(t)), e;
}
var eE = Jw, tE = eE;
function nE(t, e) {
  var n = e ? tE(t.buffer) : t.buffer;
  return new t.constructor(n, t.byteOffset, t.length);
}
var rE = nE;
function iE(t, e) {
  var n = -1, r = t.length;
  for (e || (e = Array(r)); ++n < r; )
    e[n] = t[n];
  return e;
}
var aE = iE, oE = St, of = Object.create, sE = /* @__PURE__ */ function() {
  function t() {
  }
  return function(e) {
    if (!oE(e))
      return {};
    if (of)
      return of(e);
    t.prototype = e;
    var n = new t();
    return t.prototype = void 0, n;
  };
}(), lE = sE, cE = lE, uE = rd, fE = Xs;
function dE(t) {
  return typeof t.constructor == "function" && !fE(t) ? cE(uE(t)) : {};
}
var mE = dE, hE = La, vE = jn;
function pE(t) {
  return vE(t) && hE(t);
}
var gE = pE;
function yE(t, e) {
  if (!(e === "constructor" && typeof t[e] == "function") && e != "__proto__")
    return t[e];
}
var u0 = yE;
function bE(t) {
  var e = [];
  if (t != null)
    for (var n in Object(t))
      e.push(n);
  return e;
}
var wE = bE, EE = St, CE = Xs, xE = wE, $E = Object.prototype, _E = $E.hasOwnProperty;
function kE(t) {
  if (!EE(t))
    return xE(t);
  var e = CE(t), n = [];
  for (var r in t)
    r == "constructor" && (e || !_E.call(t, r)) || n.push(r);
  return n;
}
var OE = kE, SE = Zf, FE = OE, NE = La;
function PE(t) {
  return NE(t) ? SE(t, !0) : FE(t);
}
var f0 = PE, AE = If, TE = f0;
function RE(t) {
  return AE(t, TE(t));
}
var ME = RE, sf = c0, IE = Qw, LE = rE, DE = aE, VE = mE, lf = Wf, cf = Da, jE = gE, BE = Gs, WE = qs, ZE = St, HE = W5, zE = Ys, uf = u0, UE = ME;
function qE(t, e, n, r, i, a, o) {
  var s = uf(t, n), c = uf(e, n), u = o.get(c);
  if (u) {
    sf(t, n, u);
    return;
  }
  var f = a ? a(s, c, n + "", t, e, o) : void 0, d = f === void 0;
  if (d) {
    var m = cf(c), b = !m && BE(c), p = !m && !b && zE(c);
    f = c, m || b || p ? cf(s) ? f = s : jE(s) ? f = DE(s) : b ? (d = !1, f = IE(c, !0)) : p ? (d = !1, f = LE(c, !0)) : f = [] : HE(c) || lf(c) ? (f = s, lf(s) ? f = UE(s) : (!ZE(s) || WE(s)) && (f = VE(c))) : d = !1;
  }
  d && (o.set(c, f), i(f, c, r, a, o), o.delete(c)), sf(t, n, f);
}
var KE = qE, GE = Qf, YE = c0, XE = Xw, QE = KE, JE = St, eC = f0, tC = u0;
function d0(t, e, n, r, i) {
  t !== e && XE(e, function(a, o) {
    if (i || (i = new GE()), JE(a))
      QE(t, e, o, n, d0, r, i);
    else {
      var s = r ? r(tC(t, o), a, o + "", t, e, i) : void 0;
      s === void 0 && (s = a), YE(t, o, s);
    }
  }, eC);
}
var nC = d0, rC = nC, iC = jf, aC = iC(function(t, e, n) {
  rC(t, e, n);
}), oC = aC;
const sC = /* @__PURE__ */ ct(oC), m0 = (t) => l.createElement(a0, {
  name: t.name,
  initialValue: t.initialValue
}, (e, n) => {
  const r = e.map((a) => ({
    index: a.name,
    key: a.key
  })), i = t.children(r, n).map((a, o) => {
    var s;
    return l.createElement($t, {
      key: r[o].key,
      mode: "card",
      header: (s = t.renderHeader) === null || s === void 0 ? void 0 : s.call(t, r[o], n)
    }, a);
  });
  return t.renderAdd && i.push(l.createElement($t, {
    key: "add",
    mode: "card"
  }, l.createElement($t.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      t.onAdd ? t.onAdd(n) : n.add();
    },
    arrow: !1
  }, t.renderAdd()))), l.createElement(l.Fragment, null, i);
}), ff = "adm-form", lC = s0, cC = me((t, e) => {
  const n = U(lC, t), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: s,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = pr(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: b
  } = ye(), p = ie(() => sC({}, b.Form.defaultValidateMessages, m.validateMessages), [b.Form.defaultValidateMessages, m.validateMessages]), v = [];
  let y = null, g = [], C = 0;
  function h() {
    g.length !== 0 && (C += 1, v.push(l.createElement($t, {
      header: y,
      key: C,
      mode: u
    }, g)), g = []);
  }
  return dn(n.children, (w) => {
    if (l.isValidElement(w)) {
      if (w.type === l0) {
        h(), y = w.props.children;
        return;
      }
      if (w.type === m0) {
        h(), v.push(w);
        return;
      }
    }
    g.push(w);
  }), h(), l.createElement(Ar, Object.assign({
    className: B(ff, r),
    style: i,
    ref: e
  }, m, {
    validateMessages: p
  }), l.createElement(Hl.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: d,
      disabled: f
    }
  }, v), c && l.createElement("div", {
    className: `${ff}-footer`
  }, c));
});
var gi = {}, h0 = { exports: {} }, v0 = { exports: {} };
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
})(v0);
var uC = v0.exports;
(function(t) {
  var e = uC.default;
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
    var s = {}, c = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in i)
      if (u !== "default" && Object.prototype.hasOwnProperty.call(i, u)) {
        var f = c ? Object.getOwnPropertyDescriptor(i, u) : null;
        f && (f.get || f.set) ? Object.defineProperty(s, u, f) : s[u] = i[u];
      }
    return s.default = i, o && o.set(i, s), s;
  }
  t.exports = r, t.exports.__esModule = !0, t.exports.default = t.exports;
})(h0);
var fC = h0.exports, p0 = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(p0);
var dC = p0.exports, ft = {};
Object.defineProperty(ft, "__esModule", {
  value: !0
});
ft.call = zl;
ft.default = void 0;
ft.note = y0;
ft.noteOnce = w0;
ft.preMessage = void 0;
ft.resetWarned = b0;
ft.warning = g0;
ft.warningOnce = Mi;
var Ds = {}, mC = ft.preMessage = function(e) {
};
function g0(t, e) {
}
function y0(t, e) {
}
function b0() {
  Ds = {};
}
function zl(t, e, n) {
  !e && !Ds[n] && (t(!1, n), Ds[n] = !0);
}
function Mi(t, e) {
  zl(g0, t, e);
}
function w0(t, e) {
  zl(y0, t, e);
}
Mi.preMessage = mC;
Mi.resetWarned = b0;
Mi.noteOnce = w0;
ft.default = Mi;
var hC = fC.default, vC = dC.default;
Object.defineProperty(gi, "__esModule", {
  value: !0
});
var E0 = gi.default = gi.HOOK_MARK = void 0, pC = vC(ft), gC = hC(l), yC = "RC_FORM_INTERNAL_HOOKS";
gi.HOOK_MARK = yC;
var de = function() {
  (0, pC.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, bC = /* @__PURE__ */ gC.createContext({
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
}), wC = bC;
E0 = gi.default = wC;
function Bo(t) {
  return t === void 0 || t === !1 ? [] : Array.isArray(t) ? t : [t];
}
function EC(t) {
  const e = t.prototype;
  return !!(e && e.isReactComponent);
}
function CC(t) {
  return typeof t == "function" && !EC(t) && t.defaultProps === void 0;
}
function C0(t) {
  return Sa.isFragment(t) ? !1 : Sa.isMemo(t) ? C0(t.type) : !CC(t.type);
}
const xC = Be((t) => W(t, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), $C = ["top", "right", "bottom", "left"], dr = Math.min, Pn = Math.max, Aa = Math.round, Qi = Math.floor, ln = (t) => ({
  x: t,
  y: t
}), _C = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, kC = {
  start: "end",
  end: "start"
};
function Vs(t, e, n) {
  return Pn(t, dr(e, n));
}
function cn(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function un(t) {
  return t.split("-")[0];
}
function Ii(t) {
  return t.split("-")[1];
}
function Ul(t) {
  return t === "x" ? "y" : "x";
}
function ql(t) {
  return t === "y" ? "height" : "width";
}
function Li(t) {
  return ["top", "bottom"].includes(un(t)) ? "y" : "x";
}
function Kl(t) {
  return Ul(Li(t));
}
function OC(t, e, n) {
  n === void 0 && (n = !1);
  const r = Ii(t), i = Kl(t), a = ql(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return e.reference[a] > e.floating[a] && (o = Ta(o)), [o, Ta(o)];
}
function SC(t) {
  const e = Ta(t);
  return [js(t), e, js(e)];
}
function js(t) {
  return t.replace(/start|end/g, (e) => kC[e]);
}
function FC(t, e, n) {
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
function NC(t, e, n, r) {
  const i = Ii(t);
  let a = FC(un(t), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), e && (a = a.concat(a.map(js)))), a;
}
function Ta(t) {
  return t.replace(/left|right|bottom|top/g, (e) => _C[e]);
}
function PC(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function x0(t) {
  return typeof t != "number" ? PC(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function Ra(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
function df(t, e, n) {
  let {
    reference: r,
    floating: i
  } = t;
  const a = Li(e), o = Kl(e), s = ql(o), c = un(e), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[s] / 2 - i[s] / 2;
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
  switch (Ii(e)) {
    case "start":
      b[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      b[o] += m * (n && u ? -1 : 1);
      break;
  }
  return b;
}
const AC = async (t, e, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: o
  } = n, s = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(e));
  let u = await o.getElementRects({
    reference: t,
    floating: e,
    strategy: i
  }), {
    x: f,
    y: d
  } = df(u, r, c), m = r, b = {}, p = 0;
  for (let v = 0; v < s.length; v++) {
    const {
      name: y,
      fn: g
    } = s[v], {
      x: C,
      y: h,
      data: w,
      reset: E
    } = await g({
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
      [y]: {
        ...b[y],
        ...w
      }
    }, E && p <= 50) {
      p++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: t,
        floating: e,
        strategy: i
      }) : E.rects), {
        x: f,
        y: d
      } = df(u, m, c)), v = -1;
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
async function Ma(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: r,
    y: i,
    platform: a,
    rects: o,
    elements: s,
    strategy: c
  } = t, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: b = 0
  } = cn(e, t), p = x0(b), y = s[m ? d === "floating" ? "reference" : "floating" : d], g = Ra(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(y))) == null || n ? y : y.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), C = d === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, h = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), w = await (a.isElement == null ? void 0 : a.isElement(h)) ? await (a.getScale == null ? void 0 : a.getScale(h)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Ra(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: h,
    strategy: c
  }) : C);
  return {
    top: (g.top - E.top + p.top) / w.y,
    bottom: (E.bottom - g.bottom + p.bottom) / w.y,
    left: (g.left - E.left + p.left) / w.x,
    right: (E.right - g.right + p.right) / w.x
  };
}
const TC = (t) => ({
  name: "arrow",
  options: t,
  async fn(e) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: a,
      platform: o,
      elements: s,
      middlewareData: c
    } = e, {
      element: u,
      padding: f = 0
    } = cn(t, e) || {};
    if (u == null)
      return {};
    const d = x0(f), m = {
      x: n,
      y: r
    }, b = Kl(i), p = ql(b), v = await o.getDimensions(u), y = b === "y", g = y ? "top" : "left", C = y ? "bottom" : "right", h = y ? "clientHeight" : "clientWidth", w = a.reference[p] + a.reference[b] - m[b] - a.floating[p], E = m[b] - a.reference[b], x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let $ = x ? x[h] : 0;
    (!$ || !await (o.isElement == null ? void 0 : o.isElement(x))) && ($ = s.floating[h] || a.floating[p]);
    const N = w / 2 - E / 2, F = $ / 2 - v[p] / 2 - 1, k = dr(d[g], F), D = dr(d[C], F), I = k, A = $ - v[p] - D, _ = $ / 2 - v[p] / 2 + N, T = Vs(I, _, A), S = !c.arrow && Ii(i) != null && _ != T && a.reference[p] / 2 - (_ < I ? k : D) - v[p] / 2 < 0, O = S ? _ < I ? _ - I : _ - A : 0;
    return {
      [b]: m[b] + O,
      data: {
        [b]: T,
        centerOffset: _ - T - O,
        ...S && {
          alignmentOffset: O
        }
      },
      reset: S
    };
  }
}), RC = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n, r;
      const {
        placement: i,
        middlewareData: a,
        rects: o,
        initialPlacement: s,
        platform: c,
        elements: u
      } = e, {
        mainAxis: f = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: b = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: v = !0,
        ...y
      } = cn(t, e);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const g = un(i), C = un(s) === s, h = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), w = m || (C || !v ? [Ta(s)] : SC(s));
      !m && p !== "none" && w.push(...NC(s, v, p, h));
      const E = [s, ...w], x = await Ma(e, y), $ = [];
      let N = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && $.push(x[g]), d) {
        const I = OC(i, o, h);
        $.push(x[I[0]], x[I[1]]);
      }
      if (N = [...N, {
        placement: i,
        overflows: $
      }], !$.every((I) => I <= 0)) {
        var F, k;
        const I = (((F = a.flip) == null ? void 0 : F.index) || 0) + 1, A = E[I];
        if (A)
          return {
            data: {
              index: I,
              overflows: N
            },
            reset: {
              placement: A
            }
          };
        let _ = (k = N.filter((T) => T.overflows[0] <= 0).sort((T, S) => T.overflows[1] - S.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!_)
          switch (b) {
            case "bestFit": {
              var D;
              const T = (D = N.map((S) => [S.placement, S.overflows.filter((O) => O > 0).reduce((O, R) => O + R, 0)]).sort((S, O) => S[1] - O[1])[0]) == null ? void 0 : D[0];
              T && (_ = T);
              break;
            }
            case "initialPlacement":
              _ = s;
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
function mf(t, e) {
  return {
    top: t.top - e.height,
    right: t.right - e.width,
    bottom: t.bottom - e.height,
    left: t.left - e.width
  };
}
function hf(t) {
  return $C.some((e) => t[e] >= 0);
}
const MC = function(t) {
  return t === void 0 && (t = {}), {
    name: "hide",
    options: t,
    async fn(e) {
      const {
        rects: n
      } = e, {
        strategy: r = "referenceHidden",
        ...i
      } = cn(t, e);
      switch (r) {
        case "referenceHidden": {
          const a = await Ma(e, {
            ...i,
            elementContext: "reference"
          }), o = mf(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: hf(o)
            }
          };
        }
        case "escaped": {
          const a = await Ma(e, {
            ...i,
            altBoundary: !0
          }), o = mf(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: hf(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function IC(t, e) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = t, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = un(n), s = Ii(n), c = Li(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = cn(e, t);
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
  return s && typeof p == "number" && (b = s === "end" ? p * -1 : p), c ? {
    x: b * f,
    y: m * u
  } : {
    x: m * u,
    y: b * f
  };
}
const LC = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: r
      } = e, i = await IC(e, t);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, DC = function(t) {
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
        limiter: s = {
          fn: (y) => {
            let {
              x: g,
              y: C
            } = y;
            return {
              x: g,
              y: C
            };
          }
        },
        ...c
      } = cn(t, e), u = {
        x: n,
        y: r
      }, f = await Ma(e, c), d = Li(un(i)), m = Ul(d);
      let b = u[m], p = u[d];
      if (a) {
        const y = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", C = b + f[y], h = b - f[g];
        b = Vs(C, b, h);
      }
      if (o) {
        const y = d === "y" ? "top" : "left", g = d === "y" ? "bottom" : "right", C = p + f[y], h = p - f[g];
        p = Vs(C, p, h);
      }
      const v = s.fn({
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
}, VC = function(t) {
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
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = cn(t, e), f = {
        x: n,
        y: r
      }, d = Li(i), m = Ul(d);
      let b = f[m], p = f[d];
      const v = cn(s, e), y = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (c) {
        const h = m === "y" ? "height" : "width", w = a.reference[m] - a.floating[h] + y.mainAxis, E = a.reference[m] + a.reference[h] - y.mainAxis;
        b < w ? b = w : b > E && (b = E);
      }
      if (u) {
        var g, C;
        const h = m === "y" ? "width" : "height", w = ["top", "left"].includes(un(i)), E = a.reference[d] - a.floating[h] + (w && ((g = o.offset) == null ? void 0 : g[d]) || 0) + (w ? 0 : y.crossAxis), x = a.reference[d] + a.reference[h] + (w ? 0 : ((C = o.offset) == null ? void 0 : C[d]) || 0) - (w ? y.crossAxis : 0);
        p < E ? p = E : p > x && (p = x);
      }
      return {
        [m]: b,
        [d]: p
      };
    }
  };
};
function fn(t) {
  return $0(t) ? (t.nodeName || "").toLowerCase() : "#document";
}
function Je(t) {
  var e;
  return (t == null || (e = t.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Ht(t) {
  var e;
  return (e = ($0(t) ? t.ownerDocument : t.document) || window.document) == null ? void 0 : e.documentElement;
}
function $0(t) {
  return t instanceof Node || t instanceof Je(t).Node;
}
function Wt(t) {
  return t instanceof Element || t instanceof Je(t).Element;
}
function Ot(t) {
  return t instanceof HTMLElement || t instanceof Je(t).HTMLElement;
}
function vf(t) {
  return typeof ShadowRoot > "u" ? !1 : t instanceof ShadowRoot || t instanceof Je(t).ShadowRoot;
}
function Di(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: r,
    display: i
  } = lt(t);
  return /auto|scroll|overlay|hidden|clip/.test(e + r + n) && !["inline", "contents"].includes(i);
}
function jC(t) {
  return ["table", "td", "th"].includes(fn(t));
}
function Gl(t) {
  const e = Yl(), n = lt(t);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !e && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !e && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function BC(t) {
  let e = mr(t);
  for (; Ot(e) && !Eo(e); ) {
    if (Gl(e))
      return e;
    e = mr(e);
  }
  return null;
}
function Yl() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Eo(t) {
  return ["html", "body", "#document"].includes(fn(t));
}
function lt(t) {
  return Je(t).getComputedStyle(t);
}
function Co(t) {
  return Wt(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function mr(t) {
  if (fn(t) === "html")
    return t;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    t.assignedSlot || // DOM Element detected.
    t.parentNode || // ShadowRoot detected.
    vf(t) && t.host || // Fallback.
    Ht(t)
  );
  return vf(e) ? e.host : e;
}
function _0(t) {
  const e = mr(t);
  return Eo(e) ? t.ownerDocument ? t.ownerDocument.body : t.body : Ot(e) && Di(e) ? e : _0(e);
}
function yi(t, e, n) {
  var r;
  e === void 0 && (e = []), n === void 0 && (n = !0);
  const i = _0(t), a = i === ((r = t.ownerDocument) == null ? void 0 : r.body), o = Je(i);
  return a ? e.concat(o, o.visualViewport || [], Di(i) ? i : [], o.frameElement && n ? yi(o.frameElement) : []) : e.concat(i, yi(i, [], n));
}
function k0(t) {
  const e = lt(t);
  let n = parseFloat(e.width) || 0, r = parseFloat(e.height) || 0;
  const i = Ot(t), a = i ? t.offsetWidth : n, o = i ? t.offsetHeight : r, s = Aa(n) !== a || Aa(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    $: s
  };
}
function Xl(t) {
  return Wt(t) ? t : t.contextElement;
}
function ar(t) {
  const e = Xl(t);
  if (!Ot(e))
    return ln(1);
  const n = e.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = k0(e);
  let o = (a ? Aa(n.width) : n.width) / r, s = (a ? Aa(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
const WC = /* @__PURE__ */ ln(0);
function O0(t) {
  const e = Je(t);
  return !Yl() || !e.visualViewport ? WC : {
    x: e.visualViewport.offsetLeft,
    y: e.visualViewport.offsetTop
  };
}
function ZC(t, e, n) {
  return e === void 0 && (e = !1), !n || e && n !== Je(t) ? !1 : e;
}
function Ln(t, e, n, r) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const i = t.getBoundingClientRect(), a = Xl(t);
  let o = ln(1);
  e && (r ? Wt(r) && (o = ar(r)) : o = ar(t));
  const s = ZC(a, n, r) ? O0(a) : ln(0);
  let c = (i.left + s.x) / o.x, u = (i.top + s.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = Je(a), b = r && Wt(r) ? Je(r) : r;
    let p = m.frameElement;
    for (; p && r && b !== m; ) {
      const v = ar(p), y = p.getBoundingClientRect(), g = lt(p), C = y.left + (p.clientLeft + parseFloat(g.paddingLeft)) * v.x, h = y.top + (p.clientTop + parseFloat(g.paddingTop)) * v.y;
      c *= v.x, u *= v.y, f *= v.x, d *= v.y, c += C, u += h, p = Je(p).frameElement;
    }
  }
  return Ra({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function HC(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: r
  } = t;
  const i = Ot(n), a = Ht(n);
  if (n === a)
    return e;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = ln(1);
  const c = ln(0);
  if ((i || !i && r !== "fixed") && ((fn(n) !== "body" || Di(a)) && (o = Co(n)), Ot(n))) {
    const u = Ln(n);
    s = ar(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: e.width * s.x,
    height: e.height * s.y,
    x: e.x * s.x - o.scrollLeft * s.x + c.x,
    y: e.y * s.y - o.scrollTop * s.y + c.y
  };
}
function zC(t) {
  return Array.from(t.getClientRects());
}
function S0(t) {
  return Ln(Ht(t)).left + Co(t).scrollLeft;
}
function UC(t) {
  const e = Ht(t), n = Co(t), r = t.ownerDocument.body, i = Pn(e.scrollWidth, e.clientWidth, r.scrollWidth, r.clientWidth), a = Pn(e.scrollHeight, e.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + S0(t);
  const s = -n.scrollTop;
  return lt(r).direction === "rtl" && (o += Pn(e.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function qC(t, e) {
  const n = Je(t), r = Ht(t), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = Yl();
    (!u || u && e === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: s,
    y: c
  };
}
function KC(t, e) {
  const n = Ln(t, !0, e === "fixed"), r = n.top + t.clientTop, i = n.left + t.clientLeft, a = Ot(t) ? ar(t) : ln(1), o = t.clientWidth * a.x, s = t.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: s,
    x: c,
    y: u
  };
}
function pf(t, e, n) {
  let r;
  if (e === "viewport")
    r = qC(t, n);
  else if (e === "document")
    r = UC(Ht(t));
  else if (Wt(e))
    r = KC(e, n);
  else {
    const i = O0(t);
    r = {
      ...e,
      x: e.x - i.x,
      y: e.y - i.y
    };
  }
  return Ra(r);
}
function F0(t, e) {
  const n = mr(t);
  return n === e || !Wt(n) || Eo(n) ? !1 : lt(n).position === "fixed" || F0(n, e);
}
function GC(t, e) {
  const n = e.get(t);
  if (n)
    return n;
  let r = yi(t, [], !1).filter((s) => Wt(s) && fn(s) !== "body"), i = null;
  const a = lt(t).position === "fixed";
  let o = a ? mr(t) : t;
  for (; Wt(o) && !Eo(o); ) {
    const s = lt(o), c = Gl(o);
    !c && s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Di(o) && !c && F0(t, o)) ? r = r.filter((f) => f !== o) : i = s, o = mr(o);
  }
  return e.set(t, r), r;
}
function YC(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = t;
  const o = [...n === "clippingAncestors" ? GC(e, this._c) : [].concat(n), r], s = o[0], c = o.reduce((u, f) => {
    const d = pf(e, f, i);
    return u.top = Pn(d.top, u.top), u.right = dr(d.right, u.right), u.bottom = dr(d.bottom, u.bottom), u.left = Pn(d.left, u.left), u;
  }, pf(e, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function XC(t) {
  return k0(t);
}
function QC(t, e, n) {
  const r = Ot(e), i = Ht(e), a = n === "fixed", o = Ln(t, !0, a, e);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ln(0);
  if (r || !r && !a)
    if ((fn(e) !== "body" || Di(i)) && (s = Co(e)), r) {
      const u = Ln(e, !0, a, e);
      c.x = u.x + e.clientLeft, c.y = u.y + e.clientTop;
    } else
      i && (c.x = S0(i));
  return {
    x: o.left + s.scrollLeft - c.x,
    y: o.top + s.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function gf(t, e) {
  return !Ot(t) || lt(t).position === "fixed" ? null : e ? e(t) : t.offsetParent;
}
function N0(t, e) {
  const n = Je(t);
  if (!Ot(t))
    return n;
  let r = gf(t, e);
  for (; r && jC(r) && lt(r).position === "static"; )
    r = gf(r, e);
  return r && (fn(r) === "html" || fn(r) === "body" && lt(r).position === "static" && !Gl(r)) ? n : r || BC(t) || n;
}
const JC = async function(t) {
  let {
    reference: e,
    floating: n,
    strategy: r
  } = t;
  const i = this.getOffsetParent || N0, a = this.getDimensions;
  return {
    reference: QC(e, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function ex(t) {
  return lt(t).direction === "rtl";
}
const tx = {
  convertOffsetParentRelativeRectToViewportRelativeRect: HC,
  getDocumentElement: Ht,
  getClippingRect: YC,
  getOffsetParent: N0,
  getElementRects: JC,
  getClientRects: zC,
  getDimensions: XC,
  getScale: ar,
  isElement: Wt,
  isRTL: ex
};
function nx(t, e) {
  let n = null, r;
  const i = Ht(t);
  function a() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function o(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), a();
    const {
      left: u,
      top: f,
      width: d,
      height: m
    } = t.getBoundingClientRect();
    if (s || e(), !d || !m)
      return;
    const b = Qi(f), p = Qi(i.clientWidth - (u + d)), v = Qi(i.clientHeight - (f + m)), y = Qi(u), C = {
      rootMargin: -b + "px " + -p + "px " + -v + "px " + -y + "px",
      threshold: Pn(0, dr(1, c)) || 1
    };
    let h = !0;
    function w(E) {
      const x = E[0].intersectionRatio;
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
      n = new IntersectionObserver(w, {
        ...C,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(w, C);
    }
    n.observe(t);
  }
  return o(!0), a;
}
function rx(t, e, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = Xl(t), f = i || a ? [...u ? yi(u) : [], ...yi(e)] : [];
  f.forEach((g) => {
    i && g.addEventListener("scroll", n, {
      passive: !0
    }), a && g.addEventListener("resize", n);
  });
  const d = u && s ? nx(u, n) : null;
  let m = -1, b = null;
  o && (b = new ResizeObserver((g) => {
    let [C] = g;
    C && C.target === u && b && (b.unobserve(e), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      b && b.observe(e);
    })), n();
  }), u && !c && b.observe(u), b.observe(e));
  let p, v = c ? Ln(t) : null;
  c && y();
  function y() {
    const g = Ln(t);
    v && (g.x !== v.x || g.y !== v.y || g.width !== v.width || g.height !== v.height) && n(), v = g, p = requestAnimationFrame(y);
  }
  return n(), () => {
    f.forEach((g) => {
      i && g.removeEventListener("scroll", n), a && g.removeEventListener("resize", n);
    }), d && d(), b && b.disconnect(), b = null, c && cancelAnimationFrame(p);
  };
}
const ix = (t, e, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: tx,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return AC(t, e, {
    ...i,
    platform: a
  });
};
class ax extends l.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const e = rm(this);
    e instanceof Element ? this.element = e : this.element = null;
  }
  render() {
    return l.Children.only(this.props.children);
  }
}
const ox = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function sx(t) {
  var e;
  return (e = ox[t]) !== null && e !== void 0 ? e : t;
}
let nr = null, or = null;
vr && (nr = document.createElement("div"), nr.className = "adm-px-tester", nr.style.setProperty("--size", "10"), document.body.appendChild(nr), or = document.createElement("div"), or.className = "adm-px-tester", document.body.appendChild(or));
function An(t) {
  return nr === null || or === null || nr.getBoundingClientRect().height === 10 ? t : (or.style.setProperty("--size", t.toString()), or.getBoundingClientRect().height);
}
const vn = "adm-popover", lx = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, P0 = me((t, e) => {
  const n = U(lx, t), r = sx(n.placement), [i, a] = ae({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  we(e, () => ({
    show: () => a(!0),
    hide: () => a(!1),
    visible: i
  }), [i]);
  const o = V(null), s = V(null), c = V(null), u = on(n.stopPropagation, W(n, l.createElement("div", {
    className: B(vn, `${vn}-${n.mode}`, {
      [`${vn}-hidden`]: !i
    }),
    ref: s
  }, l.createElement("div", {
    className: `${vn}-arrow`,
    ref: c
  }, l.createElement(xC, {
    className: `${vn}-arrow-icon`
  })), l.createElement("div", {
    className: `${vn}-inner`
  }, l.createElement("div", {
    className: `${vn}-inner-content`
  }, n.content))))), [f, d] = K(null);
  function m() {
    var p, v, y;
    return Se(this, void 0, void 0, function* () {
      const g = (v = (p = o.current) === null || p === void 0 ? void 0 : p.element) !== null && v !== void 0 ? v : null, C = s.current, h = c.current;
      if (d(g), !g || !C || !h)
        return;
      const {
        x: w,
        y: E,
        placement: x,
        middlewareData: $
      } = yield ix(g, C, {
        placement: r,
        middleware: [LC(An(12)), DC({
          padding: An(4),
          crossAxis: !1,
          limiter: VC()
        }), RC(), MC(), TC({
          element: h,
          padding: An(12)
        })]
      });
      Object.assign(C.style, {
        left: `${w}px`,
        top: `${E}px`
      });
      const N = x.split("-")[0], F = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[N], {
        x: k,
        y: D
      } = (y = $.arrow) !== null && y !== void 0 ? y : {};
      Object.assign(h.style, {
        left: k != null ? `${k}px` : "",
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
  Ne(() => {
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
    const p = s.current;
    if (!(!f || !p))
      return rx(f, p, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), Yf(() => {
    n.trigger && a(!1);
  }, [() => {
    var p;
    return (p = o.current) === null || p === void 0 ? void 0 : p.element;
  }, s], ["click", "touchmove"]);
  const b = to(i, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(ax, {
    ref: o
  }, n.children), b && kr(n.getContainer, u));
}), Yt = "adm-popover-menu", cx = me((t, e) => {
  const n = V(null);
  we(e, () => n.current, []);
  const r = Ue((a) => {
    var o;
    const {
      onAction: s
    } = t;
    s && s(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [t.onAction]), i = ie(() => {
    const a = (t == null ? void 0 : t.maxCount) && t.actions.length > (t == null ? void 0 : t.maxCount), o = (t == null ? void 0 : t.maxCount) && (t == null ? void 0 : t.maxCount) * 48;
    return l.createElement("div", {
      className: `${Yt}-list`
    }, l.createElement("div", {
      className: B(`${Yt}-list-inner`, {
        [`${Yt}-list-scroll`]: a
      }),
      style: {
        height: o
      }
    }, t.actions.map((s, c) => {
      var u;
      return l.createElement("a", {
        key: (u = s.key) !== null && u !== void 0 ? u : c,
        className: B(`${Yt}-item`, "adm-plain-anchor", {
          [`${Yt}-item-disabled`]: s.disabled
        }),
        onClick: () => {
          var f;
          s.disabled || (r(s), (f = s.onClick) === null || f === void 0 || f.call(s));
        }
      }, s.icon && l.createElement("div", {
        className: `${Yt}-item-icon`
      }, s.icon), l.createElement("div", {
        className: `${Yt}-item-text`
      }, s.text));
    })));
  }, [t.actions, r]);
  return l.createElement(P0, Object.assign({
    ref: n
  }, t, {
    className: B(Yt, t.className),
    content: i
  }), t.children);
}), A0 = le(P0, {
  Menu: cx
});
function ux(...t) {
  let e;
  for (e = 0; e < t.length && t[e] === void 0; e++)
    ;
  return t[e];
}
const fx = "__SPLIT__", Ze = "adm-form-item", dx = l.memo(({
  children: t
}) => t, (t, e) => t.value === e.value && t.update === e.update), mx = (t) => {
  var e;
  const {
    style: n,
    extra: r,
    label: i,
    help: a,
    required: o,
    children: s,
    htmlFor: c,
    hidden: u,
    arrow: f,
    childElementPosition: d = "normal"
  } = t, m = ot(Hl), {
    locale: b
  } = ye(), p = t.hasFeedback !== void 0 ? t.hasFeedback : m.hasFeedback, v = t.layout || m.layout, y = (e = t.disabled) !== null && e !== void 0 ? e : m.disabled, g = (() => {
    const {
      requiredMarkStyle: w
    } = m;
    switch (w) {
      case "asterisk":
        return o && l.createElement("span", {
          className: `${Ze}-required-asterisk`
        }, "*");
      case "text-required":
        return o && l.createElement("span", {
          className: `${Ze}-required-text`
        }, "(", b.Form.required, ")");
      case "text-optional":
        return !o && l.createElement("span", {
          className: `${Ze}-required-text`
        }, "(", b.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), C = !!i && l.createElement("label", {
    className: `${Ze}-label`,
    htmlFor: c
  }, i, g, a && l.createElement(A0, {
    content: a,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${Ze}-label-help`,
    onClick: (w) => {
      w.preventDefault();
    }
  }, l.createElement(ey, null)))), h = (!!t.description || p) && l.createElement(l.Fragment, null, t.description, p && l.createElement(l.Fragment, null, t.errors.map((w, E) => l.createElement("div", {
    key: `error-${E}`,
    className: `${Ze}-feedback-error`
  }, w)), t.warnings.map((w, E) => l.createElement("div", {
    key: `warning-${E}`,
    className: `${Ze}-feedback-warning`
  }, w))));
  return W(t, l.createElement($t.Item, {
    style: n,
    title: v === "vertical" && C,
    prefix: v === "horizontal" && C,
    extra: r,
    description: h,
    className: B(Ze, `${Ze}-${v}`, {
      [`${Ze}-hidden`]: u,
      [`${Ze}-has-error`]: t.errors.length
    }),
    disabled: y,
    onClick: t.onClick,
    clickable: t.clickable,
    arrow: f
  }, l.createElement("div", {
    className: B(`${Ze}-child`, `${Ze}-child-position-${d}`)
  }, l.createElement("div", {
    className: B(`${Ze}-child-inner`)
  }, s))));
}, hx = (t) => {
  const {
    // 样式相关
    style: e,
    // FormItem 相关
    label: n,
    help: r,
    extra: i,
    hasFeedback: a,
    name: o,
    required: s,
    noStyle: c,
    hidden: u,
    layout: f,
    childElementPosition: d,
    description: m,
    // Field 相关
    disabled: b,
    rules: p,
    children: v,
    messageVariables: y,
    trigger: g = "onChange",
    validateTrigger: C = g,
    onClick: h,
    shouldUpdate: w,
    dependencies: E,
    clickable: x,
    arrow: $
  } = t, N = pr(t, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: F
  } = ot(Hl), {
    validateTrigger: k
  } = ot(E0), D = ux(C, k, g), I = V(null), A = V(0);
  A.current += 1;
  const [_, T] = K({}), S = Ue((Z, q) => {
    T((G) => {
      const Y = Object.assign({}, G), ce = q.join(fx);
      return Z.destroy ? delete Y[ce] : Y[ce] = Z, Y;
    });
  }, [T]);
  function O(Z, q, G, Y) {
    var ce, he;
    if (c && !u)
      return Z;
    const Ee = (ce = G == null ? void 0 : G.errors) !== null && ce !== void 0 ? ce : [], z = Object.keys(_).reduce((te, xe) => {
      var De, Re;
      const mn = (Re = (De = _[xe]) === null || De === void 0 ? void 0 : De.errors) !== null && Re !== void 0 ? Re : [];
      return mn.length && (te = [...te, ...mn]), te;
    }, Ee), ee = (he = G == null ? void 0 : G.warnings) !== null && he !== void 0 ? he : [], J = Object.keys(_).reduce((te, xe) => {
      var De, Re;
      const mn = (Re = (De = _[xe]) === null || De === void 0 ? void 0 : De.warnings) !== null && Re !== void 0 ? Re : [];
      return mn.length && (te = [...te, ...mn]), te;
    }, ee);
    return W(t, l.createElement(mx, {
      style: e,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: Y,
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
      arrow: $
    }, l.createElement(rf.Provider, {
      value: S
    }, Z)));
  }
  const R = typeof v == "function";
  if (!o && !R && !t.dependencies)
    return O(v);
  let P = {};
  P.label = typeof n == "string" ? n : "", y && (P = Object.assign(Object.assign({}, P), y));
  const M = ot(rf), j = (Z) => {
    if (c && M) {
      const q = Z.name;
      M(Z, q);
    }
  };
  return l.createElement(Bl, Object.assign({}, N, {
    name: o,
    shouldUpdate: w,
    dependencies: E,
    rules: p,
    trigger: g,
    validateTrigger: D,
    onMetaChange: j,
    messageVariables: P
  }), (Z, q, G) => {
    let Y = null;
    const ce = s !== void 0 ? s : p && p.some((z) => !!(z && typeof z == "object" && z.required)), he = Bo(o).length && q ? q.name : [], Ee = (he.length > 0 && F ? [F, ...he] : he).join("_");
    if (R)
      (w || E) && !o && (Y = v(G));
    else if (!(E && !o))
      if (l.isValidElement(v)) {
        v.props.defaultValue;
        const z = Object.assign(Object.assign({}, v.props), Z);
        C0(v) && (z.ref = (J) => {
          const te = v.ref;
          te && (typeof te == "function" && te(J), "current" in te && (te.current = J)), I.current = J;
        }), z.id || (z.id = Ee), (/* @__PURE__ */ new Set([...Bo(g), ...Bo(D)])).forEach((J) => {
          z[J] = (...te) => {
            var xe, De, Re;
            (xe = Z[J]) === null || xe === void 0 || xe.call(Z, ...te), (Re = (De = v.props)[J]) === null || Re === void 0 || Re.call(De, ...te);
          };
        }), Y = l.createElement(dx, {
          value: Z[t.valuePropName || "value"],
          update: A.current
        }, l.cloneElement(v, z));
      } else
        Y = v;
    return O(Y, Ee, q, ce);
  });
}, vx = (t) => {
  const e = Kf(), n = ot(In), r = n.getFieldsValue(t.to), i = l.useMemo(() => t.children(r, n), [JSON.stringify(r), t.children]);
  return l.createElement(l.Fragment, null, i, t.to.map((a) => l.createElement(px, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: e
  })));
}, px = Be((t) => {
  const e = Zl(t.namePath, t.form);
  return Fi(() => {
    t.onChange();
  }, [e]), null;
}), D_ = le(cC, {
  Item: hx,
  Subscribe: vx,
  Header: l0,
  Array: m0,
  useForm: Wl,
  useWatch: Zl
}), T0 = "adm-grid", gx = (t) => {
  const e = {
    "--columns": t.columns.toString()
  }, {
    gap: n
  } = t;
  return n !== void 0 && (Array.isArray(n) ? (e["--gap-horizontal"] = On(n[0]), e["--gap-vertical"] = On(n[1])) : e["--gap"] = On(n)), W(t, l.createElement("div", {
    className: T0,
    style: e
  }, t.children));
}, yx = (t) => {
  const e = U({
    span: 1
  }, t), n = {
    "--item-span": e.span
  };
  return W(e, l.createElement("div", {
    className: `${T0}-item`,
    style: n,
    onClick: e.onClick
  }, e.children));
}, R0 = le(gx, {
  Item: yx
}), bx = r8([a1, Zy]), Ji = () => [1, 0, 0, 1, 0, 0], yf = (t) => t[4], bf = (t) => t[5], Zr = (t) => t[0], Hr = (t, e, n) => M0([1, 0, 0, 1, e, n], t), wx = (t, e, n = e) => M0([e, 0, 0, n, 0, 0], t), Ex = (t, [e, n]) => [t[0] * e + t[2] * n + t[4], t[1] * e + t[3] * n + t[5]], M0 = (t, e) => [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], t[0] * e[4] + t[2] * e[5] + t[4], t[1] * e[4] + t[3] * e[5] + t[5]], Wo = "adm-image-viewer", I0 = (t) => {
  const {
    dragLockRef: e,
    maxZoom: n
  } = t, r = V([]), i = V(null), a = V(null), [{
    matrix: o
  }, s] = Te(() => ({
    matrix: Ji(),
    config: {
      tension: 200
    }
  })), c = rs(i), u = rs(a), f = V(!1), d = (p) => {
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
    const v = -c.width / 2, y = -c.height / 2, g = -u.width / 2, C = -u.height / 2, h = Zr(p), w = h * u.width, E = h * u.height, x = v - (w - c.width), $ = v, N = y - (E - c.height), F = y, [k, D] = Ex(p, [g, C]);
    return {
      x: {
        position: k,
        minX: x,
        maxX: $
      },
      y: {
        position: D,
        minY: N,
        maxY: F
      }
    };
  }, m = (p, v, y, g = 0) => [p <= v - g, p >= y + g], b = (p, v, y = !1) => {
    if (!c || !u)
      return p;
    const g = Zr(p), C = g * u.width, h = g * u.height, {
      x: {
        position: w,
        minX: E,
        maxX: x
      },
      y: {
        position: $,
        minY: N,
        maxY: F
      }
    } = d(p);
    if (v === "translate") {
      let k = w, D = $;
      return C > c.width ? k = y ? ke(w, E, x) : hi(w, E, x, g * 50) : k = -C / 2, h > c.height ? D = y ? ke($, N, F) : hi($, N, F, g * 50) : D = -h / 2, Hr(p, k - w, D - $);
    }
    if (v === "scale" && y) {
      const [k, D] = [C > c.width ? ke(w, E, x) : -C / 2, h > c.height ? ke($, N, F) : -h / 2];
      return Hr(p, k - w, D - $);
    }
    return p;
  };
  return bx({
    onDrag: (p) => {
      var v;
      if (p.first) {
        const {
          x: {
            position: g,
            minX: C,
            maxX: h
          }
        } = d(o.get());
        r.current = m(g, C, h);
        return;
      }
      if (p.pinching)
        return p.cancel();
      if (p.tap && p.elapsedTime > 0 && p.elapsedTime < 1e3) {
        (v = t.onTap) === null || v === void 0 || v.call(t);
        return;
      }
      const y = Zr(o.get());
      if (e && (e.current = y !== 1), !f.current && y <= 1)
        s.start({
          matrix: Ji()
        });
      else {
        const g = o.get(), C = [p.offset[0] - yf(g), p.offset[1] - bf(g)], h = Hr(g, ...p.last ? [C[0] + p.velocity[0] * p.direction[0] * 200, C[1] + p.velocity[1] * p.direction[1] * 200] : C);
        s.start({
          matrix: b(h, "translate", p.last),
          immediate: !p.last
        });
        const {
          x: {
            position: w,
            minX: E,
            maxX: x
          }
        } = d(h);
        p.last && r.current.some(($) => $) && m(w, E, x).some(($) => $) && (e && (e.current = !1), s.start({
          matrix: Ji()
        }));
      }
    },
    onPinch: (p) => {
      var v;
      f.current = !p.last;
      const [y] = p.offset;
      if (y < 0)
        return;
      let g;
      n === "auto" ? g = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : g = n;
      const C = p.last ? ke(y, 1, g) : y;
      if ((v = t.onZoomChange) === null || v === void 0 || v.call(t, C), p.last && C <= 1)
        s.start({
          matrix: Ji()
        }), e && (e.current = !1);
      else {
        if (!c)
          return;
        const h = o.get(), w = Zr(h), E = p.origin[0] - c.width / 2, x = p.origin[1] - c.height / 2;
        let $ = Hr(h, -E, -x);
        $ = wx($, C / w), $ = Hr($, E, x), s.start({
          matrix: b($, "scale", p.last),
          immediate: !p.last
        }), e && (e.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [yf(o.get()), bf(o.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Zr(o.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), l.createElement("div", {
    className: `${Wo}-slide`
  }, l.createElement("div", {
    className: `${Wo}-control`,
    ref: i
  }, l.createElement(ge.div, {
    className: `${Wo}-image-wrapper`,
    style: {
      matrix: o
    }
  }, l.createElement("img", {
    ref: a,
    src: t.image,
    draggable: !1,
    alt: t.image
  }))));
}, Zo = "adm-image-viewer", Cx = me((t, e) => {
  const n = window.innerWidth + An(16), [{
    x: r
  }, i] = Te(() => ({
    x: t.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = t.images.length;
  function o(u, f = !1) {
    var d;
    const m = ke(u, 0, a - 1);
    (d = t.onIndexChange) === null || d === void 0 || d.call(t, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  we(e, () => ({
    swipeTo: o
  }));
  const s = V(!1), c = Ft((u) => {
    if (s.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, b = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(ke(Math.round((f + b) / n), d, m));
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
  return l.createElement("div", Object.assign({
    className: `${Zo}-slides`
  }, c()), l.createElement(ge.div, {
    className: `${Zo}-indicator`
  }, r.to((u) => `${ke(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(ge.div, {
    className: `${Zo}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, t.images.map((u, f) => l.createElement(I0, {
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
    dragLockRef: s
  }))));
}), Ia = "adm-image-viewer", L0 = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, D0 = (t) => {
  var e, n, r;
  const i = U(L0, t), a = l.createElement(_i, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (e = i == null ? void 0 : i.classNames) === null || e === void 0 ? void 0 : e.mask
  }, l.createElement("div", {
    className: B(`${Ia}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && l.createElement(I0, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && l.createElement("div", {
    className: `${Ia}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), l.createElement(Nr, {
    position: "bottom"
  })));
  return kr(i.getContainer, a);
}, xx = Object.assign(Object.assign({}, L0), {
  defaultIndex: 0
}), V0 = me((t, e) => {
  var n, r, i;
  const a = U(xx, t), [o, s] = K(a.defaultIndex), c = V(null);
  we(e, () => ({
    swipeTo: (d, m) => {
      var b;
      s(d), (b = c.current) === null || b === void 0 || b.swipeTo(d, m);
    }
  }));
  const u = Ue((d) => {
    var m;
    d !== o && (s(d), (m = a.onIndexChange) === null || m === void 0 || m.call(a, d));
  }, [a.onIndexChange, o]), f = l.createElement(_i, {
    visible: a.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: a.afterClose,
    destroyOnClose: !0,
    className: (n = a == null ? void 0 : a.classNames) === null || n === void 0 ? void 0 : n.mask
  }, l.createElement("div", {
    className: B(`${Ia}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && l.createElement(Cx, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom
  })), a.images && l.createElement("div", {
    className: `${Ia}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), l.createElement(Nr, {
    position: "bottom"
  })));
  return kr(a.getContainer, f);
}), hr = /* @__PURE__ */ new Set();
function $x(t) {
  Ql();
  const e = Pr(l.createElement(D0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      hr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return hr.add(e), e;
}
function _x(t) {
  Ql();
  const e = Pr(l.createElement(V0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      hr.delete(e), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return hr.add(e), e;
}
function Ql() {
  hr.forEach((t) => {
    t.close();
  }), hr.clear();
}
const kx = le(V0, {
  show: _x
}), Ox = le(D0, {
  Multi: kx,
  show: $x,
  clear: Ql
}), pn = "adm-image-uploader", Sx = (t) => {
  const {
    locale: e
  } = ye(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: s
  } = t, c = ie(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  X(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return t.status === "pending" && l.createElement("div", {
      className: `${pn}-cell-mask`
    }, l.createElement("span", {
      className: `${pn}-cell-loading`
    }, l.createElement(Nl, {
      color: "white"
    }), l.createElement("span", {
      className: `${pn}-cell-mask-message`
    }, e.ImageUploader.uploading)));
  }
  function f() {
    return i && l.createElement("span", {
      className: `${pn}-cell-delete`,
      onClick: o
    }, a);
  }
  return l.createElement("div", {
    className: B(`${pn}-cell`, t.status === "fail" && `${pn}-cell-fail`)
  }, l.createElement(ao, {
    className: `${pn}-cell-image`,
    src: c,
    fit: s,
    onClick: t.onClick
  }), u(), f());
}, wf = Sx, gn = "adm-space", Fx = {
  direction: "horizontal"
}, Jl = (t) => {
  const e = U(Fx, t), {
    direction: n,
    onClick: r
  } = e;
  return W(e, l.createElement("div", {
    className: B(gn, {
      [`${gn}-wrap`]: e.wrap,
      [`${gn}-block`]: e.block,
      [`${gn}-${n}`]: !0,
      [`${gn}-align-${e.align}`]: !!e.align,
      [`${gn}-justify-${e.justify}`]: !!e.justify
    }),
    onClick: r
  }, l.Children.map(e.children, (i) => i != null && l.createElement("div", {
    className: `${gn}-item`
  }, i))));
}, Ct = "adm-image-uploader", Nx = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: l.createElement(ki, {
    className: `${Ct}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, V_ = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(Nx, t), {
    columns: i
  } = r, [a, o] = ae(r), [s, c] = K([]), u = V(null), f = rs(u), d = V(null), [m, b] = K(80), p = V(null);
  Ne(() => {
    const A = d.current;
    if (i && f && A) {
      const _ = f.width, T = y1(window.getComputedStyle(A).getPropertyValue("height"));
      b((_ - T * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const v = {
    "--cell-size": m + "px"
  };
  Ne(() => {
    c((A) => A.filter((_) => _.url === void 0 ? !0 : !a.some((T) => T.url === _.url)));
  }, [a]), Ne(() => {
    var A;
    (A = r.onUploadQueueChange) === null || A === void 0 || A.call(r, s.map((_) => ({
      id: _.id,
      status: _.status
    })));
  }, [s]);
  const y = V(0), {
    maxCount: g,
    onPreview: C,
    renderItem: h
  } = r;
  function w(A, _) {
    return Se(this, void 0, void 0, function* () {
      const {
        beforeUpload: T
      } = r;
      let S = A;
      return S = yield T == null ? void 0 : T(A, _), S;
    });
  }
  function E(A) {
    return r.showFailed ? A : A.filter((_) => _.status !== "fail");
  }
  function x(A) {
    var _;
    return Se(this, void 0, void 0, function* () {
      A.persist();
      const {
        files: T
      } = A.target;
      if (!T)
        return;
      let S = [].slice.call(T);
      if (A.target.value = "", r.beforeUpload) {
        const P = S.map((M) => w(M, S));
        yield Promise.all(P).then((M) => {
          S = M.filter(Boolean);
        });
      }
      if (S.length === 0)
        return;
      if (g > 0) {
        const P = a.length + S.length - g;
        P > 0 && (S = S.slice(0, S.length - P), (_ = r.onCountExceed) === null || _ === void 0 || _.call(r, P));
      }
      const O = S.map((P) => ({
        id: y.current++,
        status: "pending",
        file: P
      }));
      c((P) => [...E(P), ...O]);
      const R = [];
      yield Promise.all(O.map((P, M) => Se(this, void 0, void 0, function* () {
        try {
          const j = yield r.upload(P.file);
          R[M] = j, c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "success",
            url: j.url
          }) : q));
        } catch (j) {
          throw c((Z) => Z.map((q) => q.id === P.id ? Object.assign(Object.assign({}, q), {
            status: "fail"
          }) : q)), j;
        }
      }))).catch((P) => console.error(P)), o((P) => P.concat(R));
    });
  }
  const $ = V(null);
  function N(A) {
    $.current = Ox.Multi.show({
      images: a.map((_) => _.url),
      defaultIndex: A,
      onClose: () => {
        $.current = null;
      }
    });
  }
  Ci(() => {
    var A;
    (A = $.current) === null || A === void 0 || A.close();
  });
  const F = E(s), k = r.showUpload && (g === 0 || a.length + F.length < g), D = () => a.map((A, _) => {
    var T, S;
    const O = l.createElement(wf, {
      key: (T = A.key) !== null && T !== void 0 ? T : _,
      url: (S = A.thumbnailUrl) !== null && S !== void 0 ? S : A.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && N(_), C && C(_, A);
      },
      onDelete: () => Se(void 0, void 0, void 0, function* () {
        var R;
        (yield (R = r.onDelete) === null || R === void 0 ? void 0 : R.call(r, A)) !== !1 && o(a.filter((M, j) => j !== _));
      })
    });
    return h ? h(O, A, a) : O;
  }), I = l.createElement(l.Fragment, null, D(), s.map((A) => !r.showFailed && A.status === "fail" ? null : l.createElement(wf, {
    key: A.id,
    file: A.file,
    deletable: A.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: A.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(s.filter((_) => _.id !== A.id));
    }
  })), l.createElement("div", {
    className: `${Ct}-upload-button-wrap`,
    style: k ? void 0 : {
      display: "none"
    }
  }, r.children || l.createElement("span", {
    className: `${Ct}-cell ${Ct}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, l.createElement("span", {
    className: `${Ct}-upload-button-icon`
  }, l.createElement(Wd, null))), !r.disableUpload && l.createElement("input", {
    ref: p,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${Ct}-input`,
    onChange: x,
    "aria-hidden": !0
  })));
  return we(e, () => ({
    get nativeElement() {
      return p.current;
    }
  })), W(r, l.createElement("div", {
    className: Ct,
    ref: u
  }, i ? l.createElement(R0, {
    className: `${Ct}-grid`,
    columns: i,
    style: v
  }, l.createElement("div", {
    className: `${Ct}-gap-measure`,
    ref: d
  }), I.props.children) : l.createElement(Jl, {
    className: `${Ct}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
}), j0 = () => null, Yn = "adm-index-bar", Px = (t) => {
  const [e, n] = K(!1);
  return l.createElement("div", {
    className: B(`${Yn}-sidebar`, {
      [`${Yn}-sidebar-interacting`]: e
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
      const s = o.dataset.index;
      s && t.onActive(s);
    }
  }, t.indexItems.map(({
    index: r,
    brief: i
  }) => {
    const a = r === t.activeIndex;
    return l.createElement("div", {
      className: `${Yn}-sidebar-row`,
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
    }, e && a && l.createElement("div", {
      className: `${Yn}-sidebar-bubble`
    }, i), l.createElement("div", {
      className: B(`${Yn}-sidebar-item`, {
        [`${Yn}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, l.createElement("div", null, i)));
  }));
}, Xn = "adm-index-bar", Ax = {
  sticky: !0
}, Tx = me((t, e) => {
  const n = U(Ax, t), r = An(35), i = V(null), a = [], o = [];
  dn(n.children, (d) => {
    var m;
    l.isValidElement(d) && d.type === j0 && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(W(d.props, l.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${Xn}-anchor`
    }, l.createElement("div", {
      className: `${Xn}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [s, c] = K(() => {
    const d = a[0];
    return d ? d.index : null;
  });
  we(e, () => ({
    scrollTo: u
  }));
  function u(d) {
    var m;
    const b = i.current;
    if (!b)
      return;
    const p = b.children;
    for (let v = 0; v < p.length; v++) {
      const y = p.item(v);
      if (!y)
        continue;
      if (y.dataset.index === d) {
        b.scrollTop = y.offsetTop, c(d), s !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
        return;
      }
    }
  }
  const {
    run: f
  } = za(() => {
    var d;
    const m = i.current;
    if (!m)
      return;
    const b = m.scrollTop, p = m.getElementsByClassName(`${Xn}-anchor`);
    for (let v = 0; v < p.length; v++) {
      const y = p.item(v);
      if (!y)
        continue;
      const g = y.dataset.index;
      if (g && y.offsetTop + y.clientHeight - r > b) {
        c(g), s !== g && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, g));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return W(n, l.createElement("div", {
    className: B(`${Xn}`, {
      [`${Xn}-sticky`]: n.sticky
    })
  }, l.createElement(Px, {
    indexItems: a,
    activeIndex: s,
    onActive: (d) => {
      u(d);
    }
  }), l.createElement("div", {
    className: `${Xn}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), j_ = le(Tx, {
  Panel: j0
});
function Rx(t) {
  return t === window;
}
const B0 = "adm-infinite-scroll", Mx = {
  threshold: 250,
  children: (t, e, n) => l.createElement(Ix, {
    hasMore: t,
    failed: e,
    retry: n
  })
}, B_ = (t) => {
  const e = U(Mx, t), [n, r] = K(!1), i = F5((b) => Se(void 0, void 0, void 0, function* () {
    try {
      yield e.loadMore(b);
    } catch (p) {
      throw r(!0), p;
    }
  })), a = V(null), [o, s] = K({}), c = V(o), [u, f] = K(), {
    run: d
  } = za(() => Se(void 0, void 0, void 0, function* () {
    if (c.current !== o || !e.hasMore)
      return;
    const b = a.current;
    if (!b || !b.offsetParent)
      return;
    const p = ga(b);
    if (f(p), !p)
      return;
    const y = b.getBoundingClientRect().top;
    if ((Rx(p) ? window.innerHeight : p.getBoundingClientRect().bottom) >= y - e.threshold) {
      const C = {};
      c.current = C, yield i(!1), s(C);
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
    return Se(this, void 0, void 0, function* () {
      r(!1), yield i(!0), s(c.current);
    });
  }
  return W(e, l.createElement("div", {
    className: B0,
    ref: a
  }, typeof e.children == "function" ? e.children(e.hasMore, n, m) : e.children));
}, Ix = (t) => {
  const {
    locale: e
  } = ye();
  return t.hasMore ? t.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${B0}-failed-text`
  }, e.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      t.retry();
    }
  }, e.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, e.common.loading), l.createElement(u1, null)) : l.createElement("span", null, e.InfiniteScroll.noMore);
}, ea = "adm-input", Lx = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, W0 = me((t, e) => {
  const n = U(Lx, t), [r, i] = ae(n), [a, o] = K(!1), s = V(!1), c = V(null), {
    locale: u
  } = ye();
  we(e, () => ({
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
  Ne(() => {
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
      const p = b && ke(parseFloat(b), n.min, n.max).toString();
      Number(b) !== Number(p) && (b = p);
    }
    b !== r && i(b);
  }
  const m = !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0;
  return W(n, l.createElement("div", {
    className: B(`${ea}`, n.disabled && `${ea}-disabled`)
  }, l.createElement("input", {
    ref: c,
    className: `${ea}-element`,
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
      s.current = !0, (p = n.onCompositionStart) === null || p === void 0 || p.call(n, b);
    },
    onCompositionEnd: (b) => {
      var p;
      s.current = !1, (p = n.onCompositionEnd) === null || p === void 0 || p.call(n, b);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && l.createElement("div", {
    className: `${ea}-clear`,
    onMouseDown: (b) => {
      b.preventDefault();
    },
    onClick: () => {
      var b, p;
      i(""), (b = n.onClear) === null || b === void 0 || b.call(n), P8() && s.current && (s.current = !1, (p = c.current) === null || p === void 0 || p.blur());
    },
    "aria-label": u.Input.clear
  }, l.createElement(no, null))));
}), bt = "adm-jumbo-tabs", Dx = () => null, Vx = (t) => {
  var e;
  const n = V(null), r = V(null), i = {};
  let a = null;
  const o = [];
  dn(t.children, (d, m) => {
    if (!Dn(d))
      return;
    const b = d.key;
    if (typeof b != "string")
      return;
    m === 0 && (a = b);
    const p = o.push(d);
    i[b] = p - 1;
  });
  const [s, c] = ae({
    value: t.activeKey,
    defaultValue: (e = t.defaultActiveKey) !== null && e !== void 0 ? e : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = t.onChange) === null || m === void 0 || m.call(t, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = h1(n, i[s]);
  return Ni(() => {
    f(!0);
  }, r), W(t, l.createElement("div", {
    className: bt,
    ref: r
  }, l.createElement("div", {
    className: `${bt}-header`
  }, l.createElement(v1, {
    scrollTrackRef: n
  }), l.createElement(ge.div, {
    className: `${bt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => W(d.props, l.createElement("div", {
    key: d.key,
    className: `${bt}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${bt}-tab`, {
      [`${bt}-tab-active`]: d.key === s,
      [`${bt}-tab-disabled`]: d.props.disabled
    })
  }, l.createElement("div", {
    className: `${bt}-tab-title`
  }, d.props.title), l.createElement("div", {
    className: `${bt}-tab-description`
  }, d.props.description))))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === s;
    return l.createElement(Or, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, l.createElement("div", {
      className: `${bt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, W_ = le(Vx, {
  Tab: Dx
}), jx = (t) => {
  const {
    action: e
  } = t;
  return W(t.action, l.createElement(jt, {
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
}, Bx = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, Z0 = (t) => {
  const e = U(Bx, t), n = l.createElement(l.Fragment, null, !!e.image && l.createElement("div", {
    className: At("image-container")
  }, l.createElement(ao, {
    src: e.image,
    alt: "modal header image",
    width: "100%"
  })), !!e.header && l.createElement("div", {
    className: At("header")
  }, l.createElement(mi, null, e.header)), !!e.title && l.createElement("div", {
    className: At("title")
  }, e.title), l.createElement("div", {
    className: At("content")
  }, typeof e.content == "string" ? l.createElement(mi, null, e.content) : e.content), l.createElement(Jl, {
    direction: "vertical",
    block: !0,
    className: B(At("footer"), e.actions.length === 0 && At("footer-empty"))
  }, e.actions.map((r, i) => l.createElement(jx, {
    key: r.key,
    action: r,
    onAction: () => Se(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = e.onAction) === null || o === void 0 ? void 0 : o.call(e, r, i)]), e.closeOnAction && ((s = e.onClose) === null || s === void 0 || s.call(e));
    })
  }))));
  return l.createElement(T1, {
    className: B(At(), e.className),
    style: e.style,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    showCloseButton: e.showCloseButton,
    closeOnMaskClick: e.closeOnMaskClick,
    onClose: e.onClose,
    visible: e.visible,
    getContainer: e.getContainer,
    bodyStyle: e.bodyStyle,
    bodyClassName: B(At("body"), e.image && At("with-image"), e.bodyClassName),
    maskStyle: e.maskStyle,
    maskClassName: e.maskClassName,
    stopPropagation: e.stopPropagation,
    disableBodyScroll: e.disableBodyScroll,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, n);
};
function At(t = "") {
  return "adm-modal" + (t && "-") + t;
}
const Bs = /* @__PURE__ */ new Set();
function ec(t) {
  const e = Pr(l.createElement(Z0, Object.assign({}, t, {
    afterClose: () => {
      var n;
      Bs.delete(e.close), (n = t.afterClose) === null || n === void 0 || n.call(t);
    }
  })));
  return Bs.add(e.close), e;
}
function Wx(t) {
  const e = {
    confirmText: bi().locale.Modal.ok
  }, n = U(e, t);
  return new Promise((r) => {
    ec(Object.assign(Object.assign({}, n), {
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
const Zx = {
  confirmText: "确认",
  cancelText: "取消"
};
function Hx(t) {
  const {
    locale: e
  } = bi(), n = U(Zx, {
    confirmText: e.common.confirm,
    cancelText: e.common.cancel
  }, t);
  return new Promise((r) => {
    ec(Object.assign(Object.assign({}, n), {
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
function zx() {
  Bs.forEach((t) => {
    t();
  });
}
const Z_ = le(Z0, {
  show: ec,
  alert: Wx,
  confirm: Hx,
  clear: zx
}), Qn = "adm-nav-bar", Ux = {
  backArrow: !0
}, H_ = (t) => {
  const e = U(Ux, t), {
    back: n,
    backArrow: r
  } = e;
  return W(e, l.createElement("div", {
    className: B(Qn)
  }, l.createElement("div", {
    className: `${Qn}-left`,
    role: "button"
  }, n !== null && l.createElement("div", {
    className: `${Qn}-back`,
    onClick: e.onBack
  }, r && l.createElement("span", {
    className: `${Qn}-back-arrow`
  }, r === !0 ? l.createElement(Q7, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), e.left), l.createElement("div", {
    className: `${Qn}-title`
  }, e.children), l.createElement("div", {
    className: `${Qn}-right`
  }, e.right)));
}, Tt = "adm-notice-bar", qx = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement(ry, null)
}, z_ = Be((t) => {
  const e = U(qx, t), n = V(null), r = V(null), [i, a] = K(!0), o = e.speed, s = V(!0), c = V(!1);
  function u() {
    if (s.current || e.wrap)
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
  return m6(() => {
    s.current = !1, u();
  }, e.delay), Ni(() => {
    u();
  }, n), kl(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? W(e, l.createElement("div", {
    className: B(Tt, `${Tt}-${e.color}`, {
      [`${Tt}-wrap`]: e.wrap
    }),
    onClick: e.onClick
  }, e.icon && l.createElement("span", {
    className: `${Tt}-left`
  }, e.icon), l.createElement("span", {
    ref: n,
    className: `${Tt}-content`
  }, l.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Tt}-content-inner`
  }, e.content)), (e.closeable || e.extra) && l.createElement("span", {
    className: `${Tt}-right`
  }, e.extra, e.closeable && l.createElement("div", {
    className: `${Tt}-close`,
    onClick: () => {
      var f;
      a(!1), (f = e.onClose) === null || f === void 0 || f.call(e);
    }
  }, l.createElement(ki, {
    className: `${Tt}-close-icon`
  }))))) : null;
});
function Kx(t) {
  const e = [...t];
  for (let n = e.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [e[n - 1], e[r]] = [e[r], e[n - 1]];
  }
  return e;
}
const $e = "adm-number-keyboard", Gx = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, U_ = (t) => {
  const e = U(Gx, t), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = e, {
    locale: f
  } = ye(), d = V(null), m = ie(() => {
    const E = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = s ? Kx(E) : E, $ = Array.isArray(o) ? o : [o];
    return x.push("0"), a ? ($.length === 2 && x.splice(9, 0, $.pop()), x.push($[0] || "")) : (x.splice(9, 0, $[0] || ""), x.push($[1] || "BACKSPACE")), x;
  }, [o, a, s, s && n]), b = V(-1), p = V(-1), v = Zt(() => {
    var E;
    (E = e.onDelete) === null || E === void 0 || E.call(e);
  }), y = () => {
    b.current = window.setTimeout(() => {
      v(), p.current = window.setInterval(v, 150);
    }, 700);
  }, g = () => {
    clearTimeout(b.current), clearInterval(p.current);
  }, C = (E, x) => {
    var $, N;
    switch (E.preventDefault(), x) {
      case "BACKSPACE":
        v == null || v();
        break;
      case "OK":
        ($ = e.onConfirm) === null || $ === void 0 || $.call(e), e.closeOnConfirm && ((N = e.onClose) === null || N === void 0 || N.call(e));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, h = () => !c && !r ? null : l.createElement("div", {
    className: B(`${$e}-header`, {
      [`${$e}-header-with-title`]: !!r
    })
  }, !!r && l.createElement("div", {
    className: `${$e}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${$e}-header-close-button`,
    onClick: () => {
      var E;
      (E = e.onClose) === null || E === void 0 || E.call(e);
    },
    role: "button",
    title: f.common.close,
    tabIndex: -1
  }, l.createElement(Ud, null))), w = (E, x) => {
    const $ = /^\d$/.test(E), N = B(`${$e}-key`, {
      [`${$e}-key-number`]: $,
      [`${$e}-key-sign`]: !$ && E,
      [`${$e}-key-mid`]: x === 9 && !!a && m.length < 12
    }), F = E ? {
      role: "button",
      title: E,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: E,
      className: N,
      onTouchStart: () => {
        E === "BACKSPACE" && y();
      },
      onTouchEnd: (k) => {
        C(k, E), E === "BACKSPACE" && g();
      }
    }, F), E === "BACKSPACE" ? l.createElement(uu, null) : E);
  };
  return l.createElement(Fr, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: e.afterClose,
    afterShow: e.afterShow,
    className: `${$e}-popup`,
    stopPropagation: e.stopPropagation,
    destroyOnClose: e.destroyOnClose,
    forceRender: e.forceRender
  }, W(e, l.createElement("div", {
    ref: d,
    className: $e,
    onMouseDown: (E) => {
      E.preventDefault();
    }
  }, h(), l.createElement("div", {
    className: `${$e}-wrapper`
  }, l.createElement("div", {
    className: B(`${$e}-main`, {
      [`${$e}-main-confirmed-style`]: !!a
    })
  }, m.map(w)), !!a && l.createElement("div", {
    className: `${$e}-confirm`
  }, l.createElement("div", {
    className: `${$e}-key ${$e}-key-extra ${$e}-key-bs`,
    onTouchStart: () => {
      y();
    },
    onTouchEnd: (E) => {
      C(E, "BACKSPACE"), g();
    },
    onContextMenu: (E) => {
      E.preventDefault();
    },
    title: f.Input.clear,
    role: "button",
    tabIndex: -1
  }, l.createElement(uu, null)), l.createElement("div", {
    className: `${$e}-key ${$e}-key-extra ${$e}-key-ok`,
    onTouchEnd: (E) => C(E, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), e.safeArea && l.createElement("div", {
    className: `${$e}-footer`
  }, l.createElement(Nr, {
    position: "bottom"
  })))));
}, zr = "adm-page-indicator", Yx = {
  color: "primary",
  direction: "horizontal"
}, Xx = Be((t) => {
  const e = U(Yx, t), n = [];
  for (let r = 0; r < e.total; r++)
    n.push(l.createElement("div", {
      key: r,
      className: B(`${zr}-dot`, {
        [`${zr}-dot-active`]: e.current === r
      })
    }));
  return W(e, l.createElement("div", {
    className: B(zr, `${zr}-${e.direction}`, `${zr}-color-${e.color}`)
  }, n));
}), wt = "adm-passcode-input", Ef = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, q_ = me((t, e) => {
  const n = U(Ef, t), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Ef.length, {
    locale: i
  } = ye(), [a, o] = K(!1), [s, c] = ae(n), u = V(null), f = V(null);
  X(() => {
    var v;
    s.length >= r && ((v = n.onFill) === null || v === void 0 || v.call(n, s));
  }, [s, r]);
  const d = () => {
    var v, y;
    n.keyboard || (v = f.current) === null || v === void 0 || v.focus(), o(!0), (y = n.onFocus) === null || y === void 0 || y.call(n);
  };
  X(() => {
    if (!a)
      return;
    const v = window.setTimeout(() => {
      var y;
      (y = u.current) === null || y === void 0 || y.scrollIntoView({
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
  we(e, () => ({
    focus: () => {
      var v;
      return (v = u.current) === null || v === void 0 ? void 0 : v.focus();
    },
    blur: () => {
      var v, y;
      (v = u.current) === null || v === void 0 || v.blur(), (y = f.current) === null || y === void 0 || y.blur();
    }
  }));
  const b = () => {
    const v = [], y = s.split(""), g = y.length, C = ke(y.length, 0, r - 1);
    for (let h = 0; h < r; h++)
      v.push(l.createElement("div", {
        className: B(`${wt}-cell`, {
          [`${wt}-cell-caret`]: n.caret && g === h && a,
          [`${wt}-cell-focused`]: C === h && a,
          [`${wt}-cell-dot`]: !n.plain && y[h]
        }),
        key: h
      }, y[h] && n.plain ? y[h] : ""));
    return v;
  }, p = B(wt, {
    [`${wt}-focused`]: a,
    [`${wt}-error`]: n.error,
    [`${wt}-seperated`]: n.seperated
  });
  return l.createElement(l.Fragment, null, W(n, l.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: p,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, l.createElement("div", {
    className: `${wt}-cell-container`
  }, b()), l.createElement("input", {
    ref: f,
    className: `${wt}-native-input`,
    value: s,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (v) => {
      c(v.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && l.cloneElement(n.keyboard, {
    visible: a,
    onInput: (v) => {
      s.length < r && c((s + v).slice(0, n.length));
    },
    onDelete: () => {
      c(s.slice(0, -1));
    },
    onClose: () => {
      var v;
      (v = u.current) === null || v === void 0 || v.blur();
    }
  }));
}), Ur = "adm-progress-bar", Qx = {
  percent: 0,
  rounded: !0,
  text: !1
}, K_ = (t) => {
  const e = U(Qx, t), n = {
    width: `${e.percent}%`
  }, r = function() {
    return e.text === !0 ? `${e.percent}%` : typeof e.text == "function" ? e.text(e.percent) : e.text;
  }();
  return W(e, l.createElement("div", {
    className: B(Ur, e.rounded && `${Ur}-rounded`)
  }, l.createElement("div", {
    className: `${Ur}-trail`
  }, l.createElement("div", {
    className: `${Ur}-fill`,
    style: n
  })), Dt(r) && l.createElement("div", {
    className: `${Ur}-text`
  }, r)));
}, Jn = "adm-progress-circle", G_ = (t) => {
  const e = U({
    percent: 0
  }, t), n = {
    "--percent": e.percent.toString()
  };
  return W(e, l.createElement("div", {
    className: `${Jn}`,
    style: n
  }, l.createElement("div", {
    className: `${Jn}-content`
  }, l.createElement("svg", {
    className: `${Jn}-svg`
  }, l.createElement("circle", {
    className: `${Jn}-track`,
    fill: "transparent"
  }), l.createElement("circle", {
    className: `${Jn}-fill`,
    fill: "transparent"
  })), l.createElement("div", {
    className: `${Jn}-info`
  }, e.children))));
}, Jx = (t) => new Promise((e) => setTimeout(e, t)), ta = "adm-pull-to-refresh", e$ = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, Y_ = (t) => {
  var e, n;
  const {
    locale: r
  } = ye(), i = U(e$, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, t), a = (e = i.headHeight) !== null && e !== void 0 ? e : An(40), o = (n = i.threshold) !== null && n !== void 0 ? n : An(60), [s, c] = K("pulling"), [u, f] = Te(() => ({
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
    var y;
    (y = d.current) === null || y === void 0 || y.addEventListener("touchmove", () => {
    });
  }, []);
  const b = () => new Promise((y) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), y();
      }
    });
  });
  function p() {
    return Se(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (y) {
        throw b(), y;
      }
      i.completeDelay > 0 && (yield Jx(i.completeDelay)), b();
    });
  }
  Ft((y) => {
    if (s === "refreshing" || s === "complete")
      return;
    const {
      event: g
    } = y;
    if (y.last) {
      m.current = !1, s === "canRelease" ? p() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = y.movement, h = Math.ceil(C);
    if (y.first && h > 0) {
      let $ = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const E = y.event.target;
      if (!E || !(E instanceof Element))
        return;
      let x = ga(E);
      for (; ; ) {
        if (!x || $(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = ga(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    g.cancelable && g.preventDefault(), g.stopPropagation();
    const w = Math.max(hi(h, 0, 0, a * 5, 0.5), 0);
    f.start({
      height: w
    }), c(w > o ? "canRelease" : "pulling");
  }, {
    pointer: {
      touch: !0
    },
    axis: "y",
    target: d,
    enabled: !i.disabled,
    eventOptions: Tn ? {
      passive: !1
    } : void 0
  });
  const v = () => {
    var y;
    if (i.renderText)
      return (y = i.renderText) === null || y === void 0 ? void 0 : y.call(i, s);
    if (s === "pulling")
      return i.pullingText;
    if (s === "canRelease")
      return i.canReleaseText;
    if (s === "refreshing")
      return i.refreshingText;
    if (s === "complete")
      return i.completeText;
  };
  return l.createElement(ge.div, {
    ref: d,
    className: ta
  }, l.createElement(ge.div, {
    style: u,
    className: `${ta}-head`
  }, l.createElement("div", {
    className: `${ta}-head-content`,
    style: {
      height: a
    }
  }, v())), l.createElement("div", {
    className: `${ta}-content`
  }, i.children));
}, H0 = Hs(null), t$ = {
  disabled: !1,
  defaultValue: null
}, n$ = (t) => {
  const e = U(t$, t), [n, r] = ae({
    value: e.value,
    defaultValue: e.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = e.onChange) === null || a === void 0 || a.call(e, i));
    }
  });
  return l.createElement(
    H0.Provider,
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
}, yn = "adm-radio", r$ = {
  defaultChecked: !1
}, i$ = (t) => {
  const e = U(r$, t), n = ot(H0);
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
  const s = () => e.icon ? l.createElement("div", {
    className: `${yn}-custom-icon`
  }, e.icon(r)) : l.createElement("div", {
    className: `${yn}-icon`
  }, r && l.createElement(M1, null));
  return W(e, l.createElement("label", {
    onClick: e.onClick,
    className: B(yn, {
      [`${yn}-checked`]: r,
      [`${yn}-disabled`]: a,
      [`${yn}-block`]: e.block
    })
  }, l.createElement(I1, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: e.id
  }), s(), e.children && l.createElement("div", {
    className: `${yn}-content`
  }, e.children)));
}, X_ = le(i$, {
  Group: n$
}), a$ = () => l.createElement("svg", {
  viewBox: "0 0 42 40",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
  style: {
    verticalAlign: "-0.125em"
  }
}, l.createElement("path", {
  d: "m21 34-10.52 5.53a2 2 0 0 1-2.902-2.108l2.01-11.714-8.511-8.296a2 2 0 0 1 1.108-3.411l11.762-1.71 5.26-10.657a2 2 0 0 1 3.586 0l5.26 10.658L39.815 14a2 2 0 0 1 1.108 3.411l-8.51 8.296 2.009 11.714a2 2 0 0 1-2.902 2.109L21 34Z",
  fill: "currentColor",
  fillRule: "evenodd"
})), bn = "adm-rate", o$ = {
  count: 5,
  allowHalf: !1,
  character: l.createElement(a$, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, Q_ = (t) => {
  const e = U(o$, t), [n, r] = ae(e), i = V(null), a = Array(e.count).fill(null);
  function o(c, u) {
    return l.createElement("div", {
      className: B(`${bn}-star`, {
        [`${bn}-star-active`]: n >= c,
        [`${bn}-star-half`]: u,
        [`${bn}-star-readonly`]: e.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, e.character);
  }
  const s = Ft((c) => {
    if (e.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), b = (u - m.left) / m.width * e.count, p = e.allowHalf ? Math.ceil(b * 2) / 2 : Math.ceil(b), v = ke(p, 0, e.count);
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
  return W(e, l.createElement("div", Object.assign({
    className: B(bn, {
      [`${bn}-half`]: e.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": e.readOnly,
    ref: i
  }, s()), a.map((c, u) => l.createElement("div", {
    key: u,
    className: B(`${bn}-box`)
  }, e.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, qr = "adm-result", s$ = {
  success: Zd,
  error: no,
  info: Kd,
  waiting: zd,
  warning: qd
}, l$ = {
  status: "info"
}, J_ = (t) => {
  const e = U(l$, t), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = e;
  if (!n)
    return null;
  const o = a || l.createElement(s$[n]);
  return W(e, l.createElement("div", {
    className: B(qr, `${qr}-${n}`)
  }, l.createElement("div", {
    className: `${qr}-icon`
  }, o), l.createElement("div", {
    className: `${qr}-title`
  }, r), !!i && l.createElement("div", {
    className: `${qr}-description`
  }, i)));
}, Me = "adm-result-page", c$ = {
  success: Zd,
  error: no,
  info: Kd,
  waiting: zd,
  warning: qd
}, u$ = {
  status: "info",
  details: []
}, f$ = (t) => {
  const e = U(u$, t), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = e, d = o || l.createElement(c$[n]), [m, b] = K(!0), p = Dt(c), v = Dt(s);
  return W(e, l.createElement("div", {
    className: Me
  }, l.createElement("div", {
    className: `${Me}-header`
  }, l.createElement("div", {
    className: `${Me}-icon`
  }, d), l.createElement("div", {
    className: `${Me}-title`
  }, r), Dt(i) ? l.createElement("div", {
    className: `${Me}-description`
  }, i) : null, a != null && a.length ? l.createElement("div", {
    className: `${Me}-details`
  }, (m ? a.slice(0, 3) : a).map((y, g) => l.createElement("div", {
    className: B(`${Me}-detail`, y.bold && `${Me}-detail-bold`),
    key: g
  }, l.createElement("span", null, y.label), l.createElement("span", null, y.value))), a.length > 3 && l.createElement("div", {
    onClick: () => b((y) => !y)
  }, l.createElement("div", {
    className: B(`${Me}-collapse`, !m && `${Me}-collapse-active`)
  }))) : null, l.createElement("div", {
    className: `${Me}-bgWrapper`
  }, l.createElement("div", {
    className: `${Me}-bg`
  }))), l.createElement("div", {
    className: `${Me}-content`
  }, e.children), (v || p) && l.createElement("div", {
    className: `${Me}-footer`
  }, p && l.createElement(jt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Me}-footer-btn`
  }, c), v && p && l.createElement("div", {
    className: `${Me}-footer-space`
  }), v && l.createElement(jt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Me}-footer-btn`
  }, s))));
}, d$ = "adm-result-page-card", m$ = (t) => W(t, l.createElement("div", {
  className: B(`${d$}`)
}, t.children)), ek = le(f$, {
  Card: m$
}), Xt = "adm-search-bar", h$ = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(ny, null)
}, tk = me((t, e) => {
  const {
    locale: n
  } = ye(), r = U(h$, {
    cancelText: n.common.cancel
  }, t), [i, a] = ae(r), [o, s] = K(!1), c = V(null), u = V(!1);
  we(e, () => ({
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
    return typeof r.showCancelButton == "function" ? d = r.showCancelButton(o, i) : d = r.showCancelButton && o, d && l.createElement("div", {
      className: `${Xt}-suffix`
    }, l.createElement(jt, {
      fill: "none",
      className: `${Xt}-cancel-button`,
      onClick: () => {
        var m, b, p;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (b = c.current) === null || b === void 0 || b.blur(), (p = r.onCancel) === null || p === void 0 || p.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return W(r, l.createElement("div", {
    className: B(Xt, {
      [`${Xt}-active`]: o
    })
  }, l.createElement("div", {
    className: `${Xt}-input-box`
  }, r.icon && l.createElement("div", {
    className: `${Xt}-input-box-icon`
  }, r.icon), l.createElement(W0, {
    ref: c,
    className: B(`${Xt}-input`, {
      [`${Xt}-input-without-icon`]: !r.icon
    }),
    value: i,
    onChange: a,
    maxLength: r.maxLength,
    placeholder: r.placeholder,
    clearable: r.clearable,
    onlyShowClearWhenFocus: r.onlyShowClearWhenFocus,
    onFocus: (d) => {
      var m;
      s(!0), (m = r.onFocus) === null || m === void 0 || m.call(r, d);
    },
    onBlur: (d) => {
      var m;
      s(!1), (m = r.onBlur) === null || m === void 0 || m.call(r, d);
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
}), v$ = Be(() => l.createElement("svg", {
  width: "17px",
  height: "13px",
  viewBox: "0 0 17 13",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, l.createElement("g", {
  transform: "translate(-2832.000000, -1103.000000)",
  stroke: "#FFFFFF",
  strokeWidth: "3"
}, l.createElement("g", {
  transform: "translate(2610.000000, 955.000000)"
}, l.createElement("g", {
  transform: "translate(24.000000, 91.000000)"
}, l.createElement("g", {
  transform: "translate(179.177408, 36.687816)"
}, l.createElement("polyline", {
  points: "34.2767388 22 24.797043 31.4796958 21 27.6826527"
})))))))), wn = "adm-selector", p$ = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, nk = (t) => {
  const e = U(p$, t), [n, r, , i] = Pi(e.fieldNames), [a, o] = ae({
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
    locale: s
  } = ye(), c = e.options.map((u) => {
    const f = (a || []).includes(u[r]), d = u[i] || e.disabled, m = B(`${wn}-item`, {
      [`${wn}-item-active`]: f && !e.multiple,
      [`${wn}-item-multiple-active`]: f && e.multiple,
      [`${wn}-item-disabled`]: d
    });
    return l.createElement("div", {
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
    }, u[n], u.description && l.createElement("div", {
      className: `${wn}-item-description`
    }, u.description), f && e.showCheckMark && l.createElement("div", {
      className: `${wn}-check-mark-wrapper`
    }, l.createElement(v$, null)));
  });
  return W(e, l.createElement("div", {
    className: wn,
    role: "listbox",
    "aria-label": s.Selector.name
  }, e.columns ? l.createElement(R0, {
    columns: e.columns
  }, c) : l.createElement(Jl, {
    wrap: !0
  }, c)));
}, Ho = Be((t) => W(t, l.createElement("svg", {
  viewBox: "0 0 30 30"
}, l.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("path", {
  d: "M30,0 C13.4314575,3.04359188e-15 -2.02906125e-15,13.4314575 0,30 L0,30 L0,0 Z",
  fill: "var(--adm-color-background)",
  transform: "translate(15.000000, 15.000000) scale(-1, -1) translate(-15.000000, -15.000000) "
}))))), Le = "adm-side-bar", g$ = () => null, y$ = (t) => {
  var e;
  let n = null;
  const r = [];
  dn(t.children, (c, u) => {
    if (!Dn(c))
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
  }), o = r[r.length - 1], s = o && o.key === i;
  return W(t, l.createElement("div", {
    className: Le
  }, l.createElement("div", {
    className: `${Le}-items`
  }, r.map((c, u) => {
    const f = c.key === i, d = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return W(c.props, l.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: b
        } = c;
        b == null || c.props.disabled || a(b.toString());
      },
      className: B(`${Le}-item`, {
        [`${Le}-item-active`]: f,
        [`${Le}-item-disabled`]: c.props.disabled
      })
    }, l.createElement(l.Fragment, null, d && l.createElement(Ho, {
      className: `${Le}-item-corner ${Le}-item-corner-top`
    }), m && l.createElement(Ho, {
      className: `${Le}-item-corner ${Le}-item-corner-bottom`
    })), l.createElement(gs, {
      content: c.props.badge,
      className: `${Le}-badge`
    }, l.createElement("div", {
      className: `${Le}-item-title`
    }, f && l.createElement("div", {
      className: `${Le}-item-highlight`
    }), c.props.title))));
  })), l.createElement("div", {
    className: B(`${Le}-extra-space`, s && `${Le}-item-active-next-sibling`)
  }, s && l.createElement(Ho, {
    className: `${Le}-item-corner ${Le}-item-corner-top`
  }))));
}, rk = le(y$, {
  Item: g$
}), zo = "adm-slider", b$ = ({
  points: t,
  max: e,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = e - n, o = t.map((s) => {
    const c = `${Math.abs(s - n) / a * 100}%`, u = s <= r && s >= i, f = {
      left: c
    }, d = B({
      [`${zo}-tick`]: !0,
      [`${zo}-tick-active`]: u
    });
    return l.createElement("span", {
      className: d,
      style: f,
      key: s
    });
  });
  return l.createElement("div", {
    className: `${zo}-ticks`
  }, o);
}, w$ = b$, Uo = "adm-slider-mark", E$ = ({
  marks: t,
  upperBound: e,
  lowerBound: n,
  max: r,
  min: i
}) => {
  const a = Object.keys(t), o = r - i, s = a.map(parseFloat).sort((c, u) => c - u).filter((c) => c >= i && c <= r).map((c) => {
    const u = t[c];
    if (!u && u !== 0)
      return null;
    const f = c <= e && c >= n, d = B({
      [`${Uo}-text`]: !0,
      [`${Uo}-text-active`]: f
    }), m = {
      left: `${(c - i) / o * 100}%`
    };
    return l.createElement("span", {
      className: d,
      style: m,
      key: c
    }, u);
  });
  return l.createElement("div", {
    className: Uo
  }, s);
}, C$ = E$;
function Ws() {
  return typeof BigInt == "function";
}
function z0(t) {
  return !t && t !== 0 && !Number.isNaN(t) || !String(t).trim();
}
function ai(t) {
  var e = t.trim(), n = e.startsWith("-");
  n && (e = e.slice(1)), e = e.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, ""), e.startsWith(".") && (e = "0".concat(e));
  var r = e || "0", i = r.split("."), a = i[0] || "0", o = i[1] || "0";
  a === "0" && o === "0" && (n = !1);
  var s = n ? "-" : "";
  return {
    negative: n,
    negativeStr: s,
    trimStr: r,
    integerStr: a,
    decimalStr: o,
    fullStr: "".concat(s).concat(r)
  };
}
function tc(t) {
  var e = String(t);
  return !Number.isNaN(Number(e)) && e.includes("e");
}
function Qr(t) {
  var e = String(t);
  if (tc(t)) {
    var n = Number(e.slice(e.indexOf("e-") + 2)), r = e.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return e.includes(".") && q0(e) ? e.length - e.indexOf(".") - 1 : 0;
}
function U0(t) {
  var e = String(t);
  if (tc(t)) {
    if (t > Number.MAX_SAFE_INTEGER)
      return String(Ws() ? BigInt(t).toString() : Number.MAX_SAFE_INTEGER);
    if (t < Number.MIN_SAFE_INTEGER)
      return String(Ws() ? BigInt(t).toString() : Number.MIN_SAFE_INTEGER);
    e = t.toFixed(Qr(e));
  }
  return ai(e).fullStr;
}
function q0(t) {
  return typeof t == "number" ? !Number.isNaN(t) : t ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(t) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(t) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(t)
  ) : !1;
}
var x$ = /* @__PURE__ */ function() {
  function t(e) {
    if (Ai(this, t), je(this, "origin", ""), je(this, "negative", void 0), je(this, "integer", void 0), je(this, "decimal", void 0), je(this, "decimalLen", void 0), je(this, "empty", void 0), je(this, "nan", void 0), z0(e)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(e), e === "-" || Number.isNaN(e)) {
      this.nan = !0;
      return;
    }
    var n = e;
    if (tc(n) && (n = Number(n)), n = typeof n == "string" ? n : U0(n), q0(n)) {
      var r = ai(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Ti(t, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), s = n.alignDecimal(a), c = r(o, s).toString(), u = i(a), f = ai(c), d = f.negativeStr, m = f.trimStr, b = "".concat(d).concat(m.padStart(u + 1, "0"));
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
      return n ? this.isInvalidate() ? "" : ai("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), t;
}(), $$ = /* @__PURE__ */ function() {
  function t(e) {
    if (Ai(this, t), je(this, "origin", ""), je(this, "number", void 0), je(this, "empty", void 0), z0(e)) {
      this.empty = !0;
      return;
    }
    this.origin = String(e), this.number = Number(e);
  }
  return Ti(t, [{
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
      var a = Math.max(Qr(this.number), Qr(r));
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
      var a = Math.max(Qr(this.number), Qr(r));
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
      return n ? this.isInvalidate() ? "" : U0(this.number) : this.origin;
    }
  }]), t;
}();
function ze(t) {
  return Ws() ? new x$(t) : new $$(t);
}
function nc(t, e, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (t === "")
    return "";
  var i = ai(t), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(e).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(s[n]);
    if (f >= 5 && !r) {
      var d = ze(t).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return nc(d.toString(), e, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(e).concat(s.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const _$ = (t) => W(t, l.createElement("svg", {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("g", {
  fill: "currentColor",
  fillRule: "evenodd"
}, l.createElement("rect", {
  x: 10,
  width: 4,
  height: 24,
  rx: 2
}), l.createElement("rect", {
  y: 4,
  width: 4,
  height: 16,
  rx: 2
}), l.createElement("rect", {
  x: 20,
  y: 4,
  width: 4,
  height: 16,
  rx: 2
})))), qo = "adm-slider", k$ = (t) => {
  const {
    value: e,
    min: n,
    max: r,
    disabled: i,
    icon: a,
    residentPopover: o,
    onDrag: s
  } = t, c = V(e), {
    locale: u
  } = ye(), f = () => ({
    left: `${(e - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = K(!1), b = Ft((y) => {
    var g;
    if (i)
      return;
    y.first && (c.current = e);
    const C = y.xy[0] - y.initial[0], h = (g = t.trackRef.current) === null || g === void 0 ? void 0 : g.offsetWidth;
    if (!h)
      return;
    const w = C / Math.ceil(h) * (r - n);
    s(c.current + w, y.first, y.last), m(!y.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), p = typeof t.popover == "function" ? t.popover : t.popover ? (y) => y.toString() : null, v = l.createElement("div", {
    className: `${qo}-thumb`
  }, a || l.createElement(_$, {
    className: `${qo}-thumb-icon`
  }));
  return l.createElement("div", Object.assign({
    className: `${qo}-thumb-container`,
    style: f()
  }, b(), {
    role: "slider",
    "aria-label": t["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": e,
    "aria-disabled": i
  }), p ? l.createElement(A0, {
    content: p(e),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, v) : v);
}, O$ = k$, Kr = "adm-slider", S$ = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, ik = (t) => {
  var e;
  const n = U(S$, t), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: s,
    step: c,
    icon: u
  } = n;
  function f(_) {
    return _.sort((T, S) => T - S);
  }
  function d(_) {
    return n.range ? _ : [n.min, _];
  }
  function m(_, T) {
    const S = ze(_), O = nc(S.toString(), ".", T);
    return ze(O).toNumber();
  }
  function b(_) {
    const T = Math.max(p(c), p(_[0]), p(_[1]));
    return n.range ? _.map((S) => m(S, T)) : m(_[1], T);
  }
  function p(_) {
    return (`${_}`.split(".")[1] || "").length;
  }
  function v(_) {
    var T;
    (T = n.onAfterChange) === null || T === void 0 || T.call(n, b(_));
  }
  let y = n.value;
  n.range && typeof n.value == "number" && (y = [0, n.value]);
  const [g, C] = ae({
    value: y,
    defaultValue: (e = n.defaultValue) !== null && e !== void 0 ? e : n.range ? [r, r] : r,
    onChange: n.onChange
  }), h = f(d(g));
  function w(_) {
    const T = f(_), S = h;
    T[0] === S[0] && T[1] === S[1] || C(b(T));
  }
  const E = V(null), x = `${100 * (h[1] - h[0]) / (i - r)}%`, $ = `${100 * (h[0] - r) / (i - r)}%`, N = ie(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((_, T) => _ - T);
    if (s) {
      const _ = [];
      for (let T = ze(r); T.lessEquals(ze(i)); T = T.add(c))
        _.push(T.toNumber());
      return _;
    }
    return [];
  }, [o, s, c, r, i]);
  function F(_) {
    const T = _ < r ? r : _ > i ? i : _;
    let S = r;
    if (N.length)
      S = Ll(N, T);
    else {
      const O = Math.round((T - r) / c), R = ze(O).multi(c);
      S = ze(r).add(R.toString()).toNumber();
    }
    return S;
  }
  const k = V(0), D = (_) => {
    if (k.current > 0 || (_.stopPropagation(), a))
      return;
    const T = E.current;
    if (!T)
      return;
    const S = T.getBoundingClientRect().left, O = (_.clientX - S) / Math.ceil(T.offsetWidth) * (i - r) + r, R = F(O);
    let P;
    n.range ? Math.abs(R - h[0]) > Math.abs(R - h[1]) ? P = [h[0], R] : P = [R, h[1]] : P = [n.min, R], w(P), v(P);
  }, I = V(), A = (_) => l.createElement(O$, {
    key: _,
    value: h[_],
    min: r,
    max: i,
    disabled: a,
    trackRef: E,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (T, S, O) => {
      S && (k.current += 1, I.current = h);
      const R = F(T), P = I.current;
      if (!P)
        return;
      const M = [...P];
      M[_] = R, w(M), O && (v(M), window.setTimeout(() => {
        k.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return W(n, l.createElement("div", {
    className: B(Kr, {
      [`${Kr}-disabled`]: a
    })
  }, l.createElement("div", {
    className: `${Kr}-track-container`,
    onClick: D
  }, l.createElement("div", {
    className: `${Kr}-track`,
    onClick: D,
    ref: E
  }, l.createElement("div", {
    className: `${Kr}-fill`,
    style: {
      width: x,
      left: $
    }
  }), n.ticks && l.createElement(w$, {
    points: N,
    min: r,
    max: i,
    lowerBound: h[0],
    upperBound: h[1]
  }), n.range && A(0), A(1))), o && l.createElement(C$, {
    min: r,
    max: i,
    marks: o,
    lowerBound: h[0],
    upperBound: h[1]
  })));
};
function Cf(t) {
  var e = L.useRef();
  e.current = t;
  var n = L.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = e.current) === null || r === void 0 ? void 0 : r.call.apply(r, [e].concat(a));
  }, []);
  return n;
}
function F$() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var xf = F$() ? L.useLayoutEffect : L.useEffect, N$ = function(e, n) {
  var r = L.useRef(!0);
  xf(function() {
    return e(r.current);
  }, n), xf(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, $f = function(e, n) {
  N$(function(r) {
    if (!r)
      return e();
  }, n);
};
function _f(t) {
  var e = L.useRef(!1), n = L.useState(t), r = sn(n, 2), i = r[0], a = r[1];
  L.useEffect(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []);
  function o(s, c) {
    c && e.current || a(s);
  }
  return [i, o];
}
function Ko(t) {
  return t !== void 0;
}
function P$(t, e) {
  var n = e || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = _f(function() {
    return Ko(i) ? i : Ko(r) ? typeof r == "function" ? r() : r : typeof t == "function" ? t() : t;
  }), c = sn(s, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, b = Cf(a), p = _f([d]), v = sn(p, 2), y = v[0], g = v[1];
  $f(function() {
    var h = y[0];
    u !== h && b(u, h);
  }, [y]), $f(function() {
    Ko(i) || f(i);
  }, [i]);
  var C = Cf(function(h, w) {
    f(h, w), g([d], w);
  });
  return [m, C];
}
const er = "adm-stepper", A$ = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function T$(t, e) {
  const n = U(A$, t), {
    defaultValue: r = 0,
    value: i,
    onChange: a,
    disabled: o,
    step: s,
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
  we(e, () => ({
    focus: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.focus();
    },
    blur: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.blur();
    },
    get nativeElement() {
      var P, M;
      return (M = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) !== null && M !== void 0 ? M : null;
    }
  }));
  const y = (P) => (d !== void 0 ? nc(P.toString(), ".", d) : P).toString(), g = (P) => m ? P.toString() : P.toNumber(), C = (P) => {
    if (P === "")
      return null;
    if (p)
      return String(p(P));
    const M = ze(P);
    return M.isInvalidate() ? null : M.toString();
  }, h = (P) => P === null ? "" : b ? b(P) : y(P), [w, E] = P$(r, {
    value: i,
    onChange: (P) => {
      a == null || a(P);
    }
  }), [x, $] = K(() => h(w));
  function N(P) {
    if (P.isNaN())
      return;
    let M = P;
    if (u !== void 0) {
      const j = ze(u);
      M.lessEquals(j) && (M = j);
    }
    if (c !== void 0) {
      const j = ze(c);
      j.lessEquals(M) && (M = j);
    }
    d !== void 0 && (M = ze(y(g(M)))), E(g(M));
  }
  const F = (P) => {
    $(P);
    const M = C(P);
    M === null ? n.allowEmpty ? E(null) : E(r) : N(ze(M));
  }, [k, D] = K(!1), I = l.useRef(null);
  function A(P) {
    D(P), P && $(w != null ? String(w) : "");
  }
  X(() => {
    var P, M, j;
    k && ((j = (M = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) === null || M === void 0 ? void 0 : M.select) === null || j === void 0 || j.call(M));
  }, [k]), X(() => {
    k || $(h(w));
  }, [k, w, d]);
  const _ = (P) => {
    let M = ze(s);
    P || (M = M.negate()), N(ze(w ?? 0).add(M.toString()));
  }, T = () => {
    _(!1);
  }, S = () => {
    _(!0);
  }, O = () => o ? !0 : w === null ? !1 : u !== void 0 ? w <= u : !1, R = () => o ? !0 : w === null ? !1 : c !== void 0 ? w >= c : !1;
  return W(n, l.createElement("div", {
    className: B(er, {
      [`${er}-active`]: k
    })
  }, l.createElement(jt, {
    className: `${er}-minus`,
    onClick: T,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.decrease
  }, l.createElement(J7, null)), l.createElement("div", {
    className: `${er}-middle`
  }, l.createElement(W0, {
    ref: I,
    className: `${er}-input`,
    onFocus: (P) => {
      var M;
      A(!0), (M = n.onFocus) === null || M === void 0 || M.call(n, P);
    },
    value: x,
    onChange: (P) => {
      o || F(P);
    },
    disabled: o,
    onBlur: (P) => {
      var M;
      A(!1), (M = n.onBlur) === null || M === void 0 || M.call(n, P);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), l.createElement(jt, {
    className: `${er}-plus`,
    onClick: S,
    disabled: R(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": v.Stepper.increase
  }, l.createElement(Wd, null))));
}
const ak = me(T$), En = "adm-step", R$ = (t) => {
  const {
    title: e,
    description: n,
    icon: r,
    status: i = "wait"
  } = t;
  return W(t, l.createElement("div", {
    className: B(`${En}`, `${En}-status-${i}`)
  }, l.createElement("div", {
    className: `${En}-indicator`
  }, l.createElement("div", {
    className: `${En}-icon-container`
  }, r)), l.createElement("div", {
    className: `${En}-content`
  }, l.createElement("div", {
    className: `${En}-title`
  }, e), !!n && l.createElement("div", {
    className: `${En}-description`
  }, n))));
}, kf = "adm-steps", M$ = "adm-step", I$ = l.createElement("span", {
  className: `${M$}-icon-dot`
}), L$ = {
  current: 0,
  direction: "horizontal"
}, D$ = (t) => {
  const e = U(L$, t), {
    direction: n,
    current: r
  } = e, i = B(kf, `${kf}-${n}`);
  return W(e, l.createElement("div", {
    className: i
  }, l.Children.map(e.children, (a, o) => {
    var s;
    if (!l.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (s = c.icon) !== null && s !== void 0 ? s : I$;
    return l.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, ok = le(D$, {
  Step: R$
}), Qt = "adm-swipe-action", V$ = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, sk = me((t, e) => {
  const n = U(V$, t), r = V(null), i = V(null), a = V(null);
  function o(g) {
    const C = g.current;
    return C ? C.offsetWidth : 0;
  }
  function s() {
    return o(i);
  }
  function c() {
    return o(a);
  }
  const [{
    x: u
  }, f] = Te(() => ({
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
  const p = Ft((g) => {
    var C;
    if (m.current = g.cancel, !g.intentional || (g.down && (d.current = !0), !d.current))
      return;
    const [h] = g.offset;
    if (g.last) {
      const w = s(), E = c();
      let x = h + g.velocity[0] * g.direction[0] * 50;
      h > 0 ? x = Math.max(0, x) : h < 0 ? x = Math.min(0, x) : x = 0;
      const $ = Ll([-E, 0, w], x);
      f.start({
        x: $
      }), $ !== 0 && ((C = t.onActionsReveal) === null || C === void 0 || C.call(t, $ > 0 ? "left" : "right")), window.setTimeout(() => {
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
      const g = s();
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
  we(e, () => ({
    show: (g = "right") => {
      var C;
      g === "right" ? f.start({
        x: -c()
      }) : g === "left" && f.start({
        x: s()
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
  function y(g) {
    var C, h;
    const w = (C = g.color) !== null && C !== void 0 ? C : "light";
    return l.createElement(jt, {
      key: g.key,
      className: `${Qt}-action-button`,
      style: {
        "--background-color": (h = j$[w]) !== null && h !== void 0 ? h : w
      },
      onClick: (E) => {
        var x, $;
        n.closeOnAction && v(), (x = g.onClick) === null || x === void 0 || x.call(g, E), ($ = n.onAction) === null || $ === void 0 || $.call(n, g, E);
      }
    }, g.text);
  }
  return W(n, l.createElement("div", Object.assign({
    className: Qt
  }, p(), {
    ref: r,
    onClickCapture: (g) => {
      d.current && (g.stopPropagation(), g.preventDefault());
    }
  }), l.createElement(ge.div, {
    className: `${Qt}-track`,
    style: {
      x: u
    }
  }, on(n.stopPropagation, l.createElement("div", {
    className: `${Qt}-actions ${Qt}-actions-left`,
    ref: i
  }, n.leftActions.map(y))), l.createElement("div", {
    className: `${Qt}-content`,
    onClickCapture: (g) => {
      u.goal !== 0 && (g.preventDefault(), g.stopPropagation(), v());
    }
  }, l.createElement(ge.div, {
    style: {
      pointerEvents: u.to((g) => g !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), on(n.stopPropagation, l.createElement("div", {
    className: `${Qt}-actions ${Qt}-actions-right`,
    ref: a
  }, n.rightActions.map(y))))));
}), j$ = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, K0 = (t) => W(t, l.createElement("div", {
  className: "adm-swiper-item",
  onClick: t.onClick
}, t.children));
function B$(t) {
  const [e, n] = K(t), r = V(e);
  return X(() => {
    r.current = e;
  }, [e]), [e, n, r];
}
function W$(t, e) {
  const n = Object.keys(t), r = Object.keys(e), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const s = t[o], c = e[o];
    typeof s == "function" && typeof c == "function" ? a[o] = function(...u) {
      s(...u), c(...u);
    } : a[o] = s || c;
  }), a;
}
const Et = "adm-swiper", Z$ = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, H$ = {
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
let na;
const z$ = me(_l((t, e) => {
  const n = U(H$, t), {
    direction: r,
    total: i,
    children: a,
    indicator: o
  } = n, [s] = K({}), c = V(null), u = r === "vertical", f = n.slideSize / 100, d = n.trackOffset / 100, {
    validChildren: m,
    count: b,
    renderChildren: p
  } = ie(() => {
    let y = 0, g, C;
    return typeof a == "function" ? g = a : C = l.Children.map(a, (h) => !l.isValidElement(h) || h.type !== K0 ? null : (y++, h)), {
      renderChildren: g,
      validChildren: C,
      count: y
    };
  }, [a]), v = i ?? b;
  return v === 0 || !m && !p ? null : () => {
    let y = n.loop;
    f * (v - 1) < 1 && (y = !1);
    const g = V(null);
    function C() {
      const z = g.current;
      return z ? (u ? z.offsetHeight : z.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [h, w, E] = k5(n.defaultIndex), [x, $, N] = B$(!1);
    function F(z) {
      let ee = 0, J = v - 1;
      return n.stuckAtBoundary && (ee += d / f, J -= (1 - f - d) / f), ke(z, ee, J);
    }
    const [{
      position: k
    }, D] = Te(() => ({
      position: F(h) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (N.current || !y)
          return;
        const z = k.get(), ee = 100 * v, J = Go(z, ee);
        J !== z && D.start({
          position: J,
          immediate: !0
        });
      }
    }), [v]), I = V(null);
    function A() {
      var z;
      (z = I.current) === null || z === void 0 || z.call(I), N.current = !1;
    }
    const _ = Ft((z) => {
      if (I.current = z.cancel, !z.intentional || (z.first && !na && (na = s), na !== s))
        return;
      na = z.last ? void 0 : s;
      const ee = C();
      if (!ee)
        return;
      const J = u ? 1 : 0, te = z.offset[J], xe = z.direction[J], De = z.velocity[J];
      if ($(!0), !z.last)
        D.start({
          position: te * 100 / ee,
          immediate: !0
        });
      else {
        const Re = Math.floor(te / ee), mn = Re + 1, Q0 = Math.round((te + De * 2e3 * xe) / ee);
        T(ke(Q0, Re, mn)), window.setTimeout(() => {
          $(!1);
        });
      }
    }, {
      transform: ([z, ee]) => [-z, -ee],
      from: () => {
        const z = C();
        return [k.get() / 100 * z, k.get() / 100 * z];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (y)
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
    function T(z, ee = !1) {
      var J;
      const te = Math.round(z), xe = y ? Go(te, v) : ke(te, 0, v - 1);
      xe !== E() && ((J = n.onIndexChange) === null || J === void 0 || J.call(n, xe)), w(xe), D.start({
        position: (y ? te : F(te)) * 100,
        immediate: ee
      });
    }
    function S() {
      T(Math.round(k.get() / 100) + 1);
    }
    function O() {
      T(Math.round(k.get() / 100) - 1);
    }
    we(e, () => ({
      swipeTo: T,
      swipeNext: S,
      swipePrev: O
    })), Ne(() => {
      const z = v - 1;
      h > z && T(z, !0);
    });
    const {
      autoplay: R,
      autoplayInterval: P
    } = n, M = () => {
      c.current = window.setTimeout(() => {
        S(), M();
      }, P);
    };
    X(() => {
      if (!(!R || x))
        return M(), () => {
          c.current && window.clearTimeout(c.current);
        };
    }, [R, P, x, v]);
    function j(z, ee) {
      let J = {};
      return y && (J = {
        [u ? "y" : "x"]: k.to((te) => {
          let xe = -te + z * 100;
          const De = v * 100, Re = De / 2;
          return xe = Go(xe + Re, De) - Re, `${xe}%`;
        }),
        [u ? "top" : "left"]: `-${z * 100}%`
      }), l.createElement(ge.div, {
        className: B(`${Et}-slide`, {
          [`${Et}-slide-active`]: h === z
        }),
        style: J,
        key: z
      }, ee);
    }
    function Z() {
      if (p && i) {
        const ee = Math.max(h - 2, 0), J = Math.min(h + 2, i - 1), te = [];
        for (let xe = ee; xe <= J; xe += 1)
          te.push(j(xe, p(xe)));
        return l.createElement(l.Fragment, null, l.createElement("div", {
          className: `${Et}-slide-placeholder`,
          style: {
            width: `${ee * 100}%`
          }
        }), te);
      }
      return l.Children.map(m, (z, ee) => j(ee, z));
    }
    function q() {
      return y ? l.createElement("div", {
        className: `${Et}-track-inner`
      }, Z()) : l.createElement(ge.div, {
        className: `${Et}-track-inner`,
        style: {
          [u ? "y" : "x"]: k.to((z) => `${-z}%`)
        }
      }, Z());
    }
    const G = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, Y = Object.assign({}, n.allowTouchMove ? _() : {}), ce = {};
    for (const z of n.stopPropagation) {
      const ee = Z$[z];
      ce[ee] = function(J) {
        J.stopPropagation();
      };
    }
    const he = W$(Y, ce);
    let Ee = null;
    return typeof o == "function" ? Ee = o(v, h) : o !== !1 && (Ee = l.createElement("div", {
      className: `${Et}-indicator`
    }, l.createElement(Xx, Object.assign({}, n.indicatorProps, {
      total: v,
      current: h,
      direction: r
    })))), W(n, l.createElement("div", {
      className: B(Et, `${Et}-${r}`),
      style: G
    }, l.createElement("div", Object.assign({
      ref: g,
      className: B(`${Et}-track`, {
        [`${Et}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (z) => {
        N.current && z.stopPropagation(), A();
      }
    }, he), q()), Ee));
  };
}));
function Go(t, e) {
  const n = t % e;
  return n < 0 ? n + e : n;
}
const lk = le(z$, {
  Item: K0
}), U$ = Be((t) => W(t, l.createElement("svg", {
  width: "28px",
  height: "28px",
  viewBox: "0 0 28 28"
}, l.createElement("g", {
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("g", {
  transform: "translate(-137.000000, -840.000000)",
  fill: "#1576FE"
}, l.createElement("g", {
  transform: "translate(80.000000, 823.000000)"
}, l.createElement("g", {
  transform: "translate(53.000000, 13.000000)"
}, l.createElement("path", {
  d: "M17.9996753,31.5 C10.5556724,31.5 4.5,25.4443275 4.5,18.0003247 C4.5,10.5563219 10.5556724,4.5 17.9996753,4.5 C18.5355492,4.5 18.9702974,4.93474816 18.9702974,5.47062208 C18.9702974,6.006496 18.5355492,6.44124416 17.9996753,6.44124416 C11.6261524,6.44124416 6.44124416,11.6267709 6.44124416,18.0002938 C6.44124416,24.3738167 11.6261524,29.5587249 17.9996753,29.5587249 C24.3731982,29.5587249 29.5587249,24.3738167 29.5587249,18.0002938 C29.5587249,14.7964616 28.2778291,11.8169616 25.9523687,9.61220279 C25.5637302,9.24317094 25.5473089,8.62893223 25.9157222,8.23967523 C26.2841356,7.84976878 26.8989928,7.83461537 27.2882498,8.20302872 C30.0042351,10.7787368 31.5,14.2580826 31.5,18.0002938 C31.5,25.4443275 25.4436781,31.5 17.9996753,31.5 Z"
})))))))), Cn = "adm-switch", q$ = {
  defaultChecked: !1
}, ck = (t) => {
  const e = U(q$, t), n = e.disabled || e.loading || !1, [r, i] = K(!1), {
    locale: a
  } = ye(), [o, s] = ae({
    value: e.checked,
    defaultValue: e.defaultChecked,
    onChange: e.onChange
  });
  function c() {
    return Se(this, void 0, void 0, function* () {
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
      const f = s(u);
      if (f1(f)) {
        i(!0);
        try {
          yield f, i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
    });
  }
  return W(e, l.createElement("div", {
    onClick: c,
    className: B(Cn, {
      [`${Cn}-checked`]: o,
      [`${Cn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, l.createElement("div", {
    className: `${Cn}-checkbox`
  }, l.createElement("div", {
    className: `${Cn}-handle`
  }, (e.loading || r) && l.createElement(U$, {
    className: `${Cn}-spin-icon`
  })), l.createElement("div", {
    className: `${Cn}-inner`
  }, o ? e.checkedText : e.uncheckedText))));
}, K$ = () => null, Rt = "adm-tab-bar", G$ = {
  safeArea: !1
}, Y$ = (t) => {
  var e;
  const n = U(G$, t);
  let r = null;
  const i = [];
  dn(n.children, (s, c) => {
    if (!Dn(s))
      return;
    const u = s.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(s));
  });
  const [a, o] = ae({
    value: n.activeKey,
    defaultValue: (e = n.defaultActiveKey) !== null && e !== void 0 ? e : r,
    onChange: (s) => {
      var c;
      s !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, s));
    }
  });
  return W(n, l.createElement("div", {
    className: Rt
  }, l.createElement("div", {
    className: `${Rt}-wrap`
  }, i.map((s) => {
    const c = s.key === a;
    function u() {
      const f = s.props.icon && l.createElement("div", {
        className: `${Rt}-item-icon`
      }, typeof s.props.icon == "function" ? s.props.icon(c) : s.props.icon), d = s.props.title && l.createElement("div", {
        className: B(`${Rt}-item-title`, !!f && `${Rt}-item-title-with-icon`)
      }, typeof s.props.title == "function" ? s.props.title(c) : s.props.title);
      return f ? l.createElement(l.Fragment, null, l.createElement(gs, {
        content: s.props.badge,
        className: `${Rt}-icon-badge`
      }, f), d) : d ? l.createElement(gs, {
        content: s.props.badge,
        className: `${Rt}-title-badge`
      }, d) : null;
    }
    return W(s.props, l.createElement("div", {
      key: s.key,
      onClick: () => {
        const {
          key: f
        } = s;
        f != null && o(f.toString());
      },
      className: B(`${Rt}-item`, {
        [`${Rt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && l.createElement(Nr, {
    position: "bottom"
  })));
}, uk = le(Y$, {
  Item: K$
}), Of = "adm-tag", X$ = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, Q$ = {
  color: "default",
  fill: "solid",
  round: !1
}, fk = (t) => {
  var e;
  const n = U(Q$, t), r = (e = X$[n.color]) !== null && e !== void 0 ? e : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return W(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: B(Of, {
      [`${Of}-round`]: n.round
    })
  }, n.children));
}, Gr = "adm-text-area", G0 = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, J$ = me((t, e) => {
  const n = U(G0, t), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = ae(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = V(null), u = V("auto"), f = V(null);
  we(e, () => ({
    clear: () => {
      s("");
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
    const v = c.current, y = f.current;
    if (!v || (v.style.height = u.current, !y))
      return;
    let g = y.scrollHeight;
    if (typeof r == "object") {
      const C = window.getComputedStyle(v), h = parseFloat(C.lineHeight);
      r.minRows && (g = Math.max(g, r.minRows * h)), r.maxRows && (g = Math.min(g, r.maxRows * h));
    }
    u.current = `${g}px`, v.style.height = `${g}px`;
  }, [o, r]);
  const d = V(!1);
  let m;
  const b = sa(o).length;
  typeof i == "function" ? m = i(b, a) : i && (m = l.createElement("div", {
    className: `${Gr}-count`
  }, a === void 0 ? b : b + "/" + a));
  let p = n.rows;
  return typeof r == "object" && (r.maxRows && p > r.maxRows && (p = r.maxRows), r.minRows && p < r.minRows && (p = r.minRows)), W(n, l.createElement("div", {
    className: Gr
  }, l.createElement("textarea", {
    ref: c,
    className: `${Gr}-element`,
    rows: p,
    value: o,
    placeholder: n.placeholder,
    onChange: (v) => {
      let y = v.target.value;
      a && !d.current && (y = sa(y).slice(0, a).join("")), s(y);
    },
    id: n.id,
    onCompositionStart: (v) => {
      var y;
      d.current = !0, (y = n.onCompositionStart) === null || y === void 0 || y.call(n, v);
    },
    onCompositionEnd: (v) => {
      var y;
      if (d.current = !1, a) {
        const g = v.target.value;
        s(sa(g).slice(0, a).join(""));
      }
      (y = n.onCompositionEnd) === null || y === void 0 || y.call(n, v);
    },
    autoComplete: n.autoComplete,
    autoFocus: n.autoFocus,
    disabled: n.disabled,
    readOnly: n.readOnly,
    name: n.name,
    onFocus: n.onFocus,
    onBlur: n.onBlur,
    onClick: n.onClick
  }), m, r && l.createElement("textarea", {
    ref: f,
    className: `${Gr}-element ${Gr}-element-hidden`,
    value: o,
    rows: p,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
J$.defaultProps = G0;
const Mt = "adm-toast", e_ = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, t_ = (t) => {
  const e = U(e_, t), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = e, o = ie(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(Hd, {
          className: `${Mt}-icon-success`
        });
      case "fail":
        return l.createElement(ki, {
          className: `${Mt}-icon-fail`
        });
      case "loading":
        return l.createElement(Nl, {
          color: "white",
          className: `${Mt}-loading`
        });
      default:
        return i;
    }
  }, [i]), s = ie(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return l.createElement(_i, {
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
  }, l.createElement("div", {
    className: B(`${Mt}-wrap`)
  }, l.createElement("div", {
    style: {
      top: s
    },
    className: B(`${Mt}-main`, i ? `${Mt}-main-icon` : `${Mt}-main-text`)
  }, o && l.createElement("div", {
    className: `${Mt}-icon`
  }, o), l.createElement(mi, null, r))));
};
let Vt = null, Yo = null;
const ua = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, n_ = (t) => l.createElement(t_, Object.assign({}, t));
function r_(t) {
  const e = U(ua, typeof t == "string" ? {
    content: t
  } : t), n = l.createElement(n_, Object.assign({}, e, {
    onClose: () => {
      Vt = null;
    }
  }));
  return Vt ? Vt.replace(n) : Vt = Pr(n), Yo && window.clearTimeout(Yo), e.duration !== 0 && (Yo = window.setTimeout(() => {
    Y0();
  }, e.duration)), Vt;
}
function Y0() {
  Vt == null || Vt.close(), Vt = null;
}
function i_(t) {
  t.duration !== void 0 && (ua.duration = t.duration), t.position !== void 0 && (ua.position = t.position), t.maskClickable !== void 0 && (ua.maskClickable = t.maskClickable);
}
const a_ = {
  show: r_,
  clear: Y0,
  config: i_
}, dk = a_;
function X0(t, e = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[e] ? i = Math.max(i, n(a[e]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(t);
}
const ra = "adm-tree-select", o_ = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, s_ = (t) => {
  const e = U(o_, t), [n, r, i] = Pi(e.fieldNames), [a, o] = ae({
    value: e.value,
    defaultValue: e.defaultValue
  }), [s, c, u] = ie(() => {
    const b = X0(e.options, i), p = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
    function y(g, C) {
      C.forEach((h) => {
        v.set(h[r], g), p.set(h[r], h), h[i] && y(h, h[i]);
      });
    }
    return y(void 0, e.options), [b, p, v];
  }, [e.options]), f = (b) => {
    var p;
    const v = [];
    let y = b;
    for (; y; )
      v.push(y), y = u.get(y[r]);
    const g = v.reverse().map((C) => C[r]);
    o(g), (p = e.onChange) === null || p === void 0 || p.call(e, g, {
      options: v
    });
  }, d = (b = [], p) => b.map((v) => {
    const y = v[r] === a[p];
    return l.createElement("div", {
      key: v[r],
      className: B(`${ra}-item`, {
        [`${ra}-item-active`]: y
      }),
      onClick: () => {
        y || f(v);
      }
    }, v[n]);
  }), m = () => {
    var b;
    const p = [];
    for (let v = 0; v < s; v++) {
      let y = `${100 / s}%`;
      s === 2 && v === 0 && (y = "33.33%"), s === 2 && v === 1 && (y = "66.67%");
      const g = l.createElement("div", {
        key: v,
        className: B(`${ra}-column`),
        style: {
          width: y
        }
      }, d(v === 0 ? e.options : (b = c.get(a[v - 1])) === null || b === void 0 ? void 0 : b[i], v));
      p.push(g);
    }
    return p;
  };
  return W(e, l.createElement("div", {
    className: ra
  }, m()));
}, nt = "adm-tree-select-multiple", l_ = (t) => {
  const e = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, t);
  X(() => {
  }, []);
  const [n, r, i] = Pi(e.fieldNames), [a, o] = ae({
    value: e.expandKeys,
    defaultValue: e.defaultExpandKeys
  }), [s, c] = ae({
    value: e.value,
    defaultValue: e.defaultValue
  }), u = ($) => {
    const N = [], F = (k) => {
      var D;
      k && (!((D = k[i]) === null || D === void 0) && D.length ? k[i].forEach((I) => F(I)) : N.push(k[r]));
    };
    return F($), N;
  }, [f, d, m] = ie(() => {
    const $ = X0(e.options, i), N = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
    function k(D, I) {
      I.forEach((A) => {
        F.set(A[r], D), N.set(A[r], A), A[i] && k(A, A[i]);
      });
    }
    return k(void 0, e.options), [$, N, F];
  }, [e.options]), b = ie(() => {
    let $ = [];
    return s.forEach((N) => {
      const F = d.get(N);
      $ = $.concat(u(F));
    }), $;
  }, [s, d]), p = ie(() => {
    const $ = /* @__PURE__ */ new Map(), N = (F) => {
      const k = m.get(F);
      k && ($.set(k[r], !0), N(k[r]));
    };
    return b.forEach((F) => {
      $.set(F, !0), N(F);
    }), $;
  }, [m, s]), v = ($) => {
    var N;
    let F = [...$], k = [];
    const D = (A) => {
      A.forEach((_) => {
        var T;
        if (k.includes(_))
          return;
        const S = m.get(_);
        if (!S)
          return;
        const O = ((T = S[i]) === null || T === void 0 ? void 0 : T.map((R) => R[r])) || [];
        O.every((R) => F.includes(R)) && (F.push(S[r]), k = k.concat(O));
      });
    };
    for (let A = 0; A < f; A++)
      D(F);
    F = F.filter((A) => !k.includes(A));
    const I = F.map((A) => d.get(A));
    c(F), (N = e.onChange) === null || N === void 0 || N.call(e, F, I);
  }, y = ($) => {
    var N;
    const F = [];
    let k = $;
    for (; k; )
      F.unshift(k), k = m.get(k[r]);
    const D = F.map((I) => I[r]);
    o(D), (N = e.onExpand) === null || N === void 0 || N.call(e, D, F);
  }, g = ($, N) => {
    var F;
    const k = (F = e.selectAllText) === null || F === void 0 ? void 0 : F[N];
    if (!k)
      return;
    let D = [];
    $.forEach((A) => {
      D = D.concat(u(A));
    });
    const I = D.every((A) => b.includes(A));
    return l.createElement("div", {
      onClick: () => {
        v(I ? b.filter((A) => !D.includes(A)) : b.concat(D));
      },
      className: `${nt}-item`
    }, k);
  }, C = ($, N) => {
    var F;
    const k = (F = e.selectAllText) === null || F === void 0 ? void 0 : F[N];
    if (!k)
      return;
    const D = $.map((_) => _[r]), I = D.every((_) => b.includes(_)), A = I ? !1 : D.some((_) => b.includes(_));
    return l.createElement("div", {
      onClick: () => {
        v(I ? b.filter((_) => !D.includes(_)) : b.concat(D));
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Lu, {
      className: `${nt}-item-checkbox`,
      checked: I,
      indeterminate: A
    }), k);
  }, h = ($) => {
    const N = a.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        N || y($);
      },
      className: B(`${nt}-item`, {
        [`${nt}-item-expand`]: N
      })
    }, $[n], !!p.get($[r]) && l.createElement("div", {
      className: `${nt}-dot`
    }));
  }, w = ($) => {
    const N = b.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        v(N ? b.filter((F) => F !== $[r]) : [...b, $[r]]);
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Lu, {
      className: `${nt}-item-checkbox`,
      checked: N
    }), $[n]);
  }, E = ($ = [], N) => $.length === 0 ? void 0 : f === N + 1 ? l.createElement(l.Fragment, null, C($, N), $.map((k) => w(k))) : l.createElement(l.Fragment, null, g($, N), $.map((k) => h(k))), x = () => {
    var $;
    const N = [];
    for (let F = 0; F < f; F++) {
      let k = `${100 / f}%`;
      f === 2 && F === 0 && (k = "33.33%"), f === 2 && F === 1 && (k = "66.67%");
      const D = l.createElement("div", {
        key: F,
        className: B(`${nt}-column`),
        style: {
          width: k
        }
      }, E(F === 0 ? e.options : ($ = d.get(a[F - 1])) === null || $ === void 0 ? void 0 : $[i], F));
      N.push(D);
    }
    return N;
  };
  return W(e, l.createElement("div", {
    className: nt
  }, x()));
}, mk = le(s_, {
  Multiple: l_
}), xn = "adm-virtual-input", c_ = {
  defaultValue: ""
}, hk = me((t, e) => {
  const n = U(c_, t), [r, i] = ae(n), a = V(null), o = V(null), [s, c] = K(!1), {
    locale: u
  } = ye();
  function f() {
    const v = a.current;
    if (!v || document.activeElement !== v)
      return;
    const y = o.current;
    y && (y.scrollLeft = y.clientWidth);
  }
  Ne(() => {
    f();
  }, [r]), X(() => {
    s && f();
  }, [s]), we(e, () => ({
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
  const b = n.keyboard, p = b && l.cloneElement(b, {
    onInput: (v) => {
      var y, g;
      i(r + v), (g = (y = b.props).onInput) === null || g === void 0 || g.call(y, v);
    },
    onDelete: () => {
      var v, y;
      i(r.slice(0, -1)), (y = (v = b.props).onDelete) === null || y === void 0 || y.call(v);
    },
    visible: s,
    onClose: () => {
      var v, y, g, C;
      const h = document.activeElement;
      h && (!((v = a.current) === null || v === void 0) && v.contains(h)) ? h.blur() : (y = a.current) === null || y === void 0 || y.blur(), (C = (g = b.props).onClose) === null || C === void 0 || C.call(g);
    },
    getContainer: null
  });
  return W(n, l.createElement("div", {
    ref: a,
    className: B(xn, {
      [`${xn}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: d,
    onBlur: m,
    onClick: n.onClick
  }, l.createElement("div", {
    className: `${xn}-content`,
    ref: o,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, l.createElement("div", {
    className: `${xn}-caret-container`
  }, s && l.createElement("div", {
    className: `${xn}-caret`
  }))), n.clearable && !!r && s && l.createElement("div", {
    className: `${xn}-clear`,
    onClick: (v) => {
      var y;
      v.stopPropagation(), i(""), (y = n.onClear) === null || y === void 0 || y.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, l.createElement(no, null)), [void 0, null, ""].includes(r) && l.createElement("div", {
    className: `${xn}-placeholder`
  }, n.placeholder), p));
}), Sf = "adm-water-mark", u_ = {
  fullPage: !0
}, vk = (t) => {
  const e = U(u_, t), {
    zIndex: n,
    gapX: r = 24,
    gapY: i = 48,
    width: a = 120,
    height: o = 64,
    rotate: s = -22,
    image: c,
    imageWidth: u = 120,
    imageHeight: f = 64,
    content: d,
    fontStyle: m = "normal",
    fontWeight: b = "normal",
    fontColor: p = "rgba(0,0,0,.15)",
    fontSize: v = 14,
    fontFamily: y = "sans-serif"
  } = e, [g, C] = K("");
  return X(() => {
    const h = document.createElement("canvas"), w = window.devicePixelRatio, E = h.getContext("2d"), x = `${(r + a) * w}px`, $ = `${(i + o) * w}px`, N = a * w, F = o * w;
    if (h.setAttribute("width", x), h.setAttribute("height", $), E) {
      if (c) {
        E.translate(N / 2, F / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = new Image();
        k.crossOrigin = "anonymous", k.referrerPolicy = "no-referrer", k.onload = () => {
          E.drawImage(k, -u * w / 2, -f * w / 2, u * w, f * w), E.restore(), C(h.toDataURL());
        }, k.src = c;
      } else if (d) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(N / 2, F / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = Number(v) * w;
        E.font = `${m} normal ${b} ${k}px/${F}px ${y}`, E.fillStyle = p, Array.isArray(d) ? d.forEach((D, I) => E.fillText(D, 0, I * k)) : E.fillText(d, 0, 0), E.restore(), C(h.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, b, a, o, y, p, c, d, v]), W(e, l.createElement("div", {
    className: B(Sf, {
      [`${Sf}-full-page`]: e.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: g === "" ? void 0 : `url('${g}')`
    }
  }));
}, $n = "adm-footer", f_ = {
  label: "",
  links: [],
  content: "",
  chips: []
}, pk = (t) => {
  const e = U(f_, t), {
    label: n,
    links: r,
    content: i,
    chips: a,
    onChipClick: o,
    onLinkClick: s
  } = e, c = (f, d) => {
    a != null && a.length && f.type === "link" && (o == null || o(f, d));
  }, u = (f, d, m) => {
    s && (m.preventDefault(), s(f, d));
  };
  return W(e, l.createElement("div", {
    className: B($n)
  }, n && l.createElement("div", {
    className: `${$n}-label`
  }, l.createElement(ys, null, n)), !!(r != null && r.length) && l.createElement("div", {
    className: `${$n}-links`
  }, r.map((f, d) => l.createElement(l.Fragment, {
    key: d
  }, l.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && l.createElement(ys, {
    direction: "vertical"
  })))), i && l.createElement("div", {
    className: `${$n}-content`
  }, i), a && a.length > 0 && l.createElement("div", {
    className: `${$n}-chips`
  }, a.map((f, d) => l.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: B(`${$n}-chip`, {
      [`${$n}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  g_ as ActionSheet,
  mi as AutoCenter,
  y_ as Avatar,
  gs as Badge,
  jt as Button,
  b_ as Calendar,
  w_ as CalendarPicker,
  B8 as CalendarPickerView,
  E_ as CapsuleTabs,
  C_ as Card,
  __ as CascadePicker,
  k_ as CascadePickerView,
  O_ as Cascader,
  N9 as CascaderView,
  T1 as CenterPopup,
  Mu as CheckList,
  Lu as Checkbox,
  S_ as Collapse,
  v_ as ConfigProvider,
  F_ as DatePicker,
  N_ as DatePickerView,
  P_ as Dialog,
  ys as Divider,
  u1 as DotLoading,
  A_ as Dropdown,
  T_ as Ellipsis,
  R_ as Empty,
  M_ as ErrorBlock,
  I_ as FloatingBubble,
  L_ as FloatingPanel,
  pk as Footer,
  D_ as Form,
  R0 as Grid,
  ao as Image,
  V_ as ImageUploader,
  Ox as ImageViewer,
  j_ as IndexBar,
  B_ as InfiniteScroll,
  W0 as Input,
  W_ as JumboTabs,
  $t as List,
  u1 as Loading,
  _i as Mask,
  Z_ as Modal,
  H_ as NavBar,
  z_ as NoticeBar,
  U_ as NumberKeyboard,
  Xx as PageIndicator,
  q_ as PasscodeInput,
  k1 as Picker,
  yo as PickerView,
  A0 as Popover,
  Fr as Popup,
  K_ as ProgressBar,
  G_ as ProgressCircle,
  Y_ as PullToRefresh,
  X_ as Radio,
  Q_ as Rate,
  J_ as Result,
  ek as ResultPage,
  Nr as SafeArea,
  v1 as ScrollMask,
  tk as SearchBar,
  nk as Selector,
  rk as SideBar,
  Gi as Skeleton,
  ik as Slider,
  Jl as Space,
  Nl as SpinLoading,
  ak as Stepper,
  ok as Steps,
  sk as SwipeAction,
  lk as Swiper,
  ck as Switch,
  uk as TabBar,
  Ru as Tabs,
  fk as Tag,
  J$ as TextArea,
  dk as Toast,
  mk as TreeSelect,
  hk as VirtualInput,
  vk as WaterMark,
  $b as createErrorBlock,
  x_ as reduceMotion,
  $_ as restoreMotion,
  h_ as setDefaultConfig
};
