import * as V from "react";
import l, { useContext as at, useRef as j, useMemo as ee, useEffect as Y, useState as K, useCallback as He, useLayoutEffect as sl, forwardRef as fe, useImperativeHandle as ye, memo as Ve, isValidElement as Vn, createContext as ll, cloneElement as Lm } from "react";
import * as Dm from "react-dom";
import { unstable_batchedUpdates as Vm, createPortal as jm, findDOMNode as Bm } from "react-dom";
const gr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
gr && document.addEventListener("touchstart", () => {
}, !0);
var va = function() {
  return va = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, va.apply(this, arguments);
};
function yr(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function ke(e, t, n, r) {
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
    u((r = r.apply(e, t || [])).next());
  });
}
function Wm(e, t) {
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
        u = t.call(e, n);
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
function Zm(e) {
  var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
  if (n)
    return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function() {
        return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e };
      }
    };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function Ot(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n)
    return e;
  var r = n.call(e), i, a = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; )
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
function cl(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Hm(e, t) {
  function n(r, i) {
    if (typeof r != "object" || typeof i != "object" || Array.isArray(r) || Array.isArray(i))
      return i !== void 0 ? i : r;
    const a = {};
    for (const o in r)
      r.hasOwnProperty(o) && (a[o] = n(r[o], i[o]));
    return a;
  }
  return n(e, t);
}
const Ue = "${label} is not a valid ${type}", zm = {
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
        string: Ue,
        method: Ue,
        array: Ue,
        object: Ue,
        number: Ue,
        date: Ue,
        boolean: Ue,
        integer: Ue,
        float: Ue,
        regexp: Ue,
        email: Ue,
        url: Ue,
        hex: Ue
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
}, qe = "${label}不是一个有效的${type}", Um = Hm(zm, {
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
}), qm = Um, nd = {
  current: {
    locale: qm
  }
};
function yk(e) {
  nd.current = e;
}
function xi() {
  return nd.current;
}
const rd = l.createContext(null), bk = (e) => {
  const {
    children: t
  } = e, n = yr(e, ["children"]), r = pe();
  return l.createElement(rd.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, t);
};
function pe() {
  var e;
  return (e = at(rd)) !== null && e !== void 0 ? e : xi();
}
function ie(e, t) {
  const n = e;
  for (const r in t)
    t.hasOwnProperty(r) && (n[r] = t[r]);
  return n;
}
var pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function lt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var id = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(e) {
  (function() {
    var t = {}.hasOwnProperty;
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
              t.call(a, c) && a[c] && r.push(c);
          }
        }
      }
      return r.join(" ");
    }
    e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
  })();
})(id);
var Km = id.exports;
const B = /* @__PURE__ */ lt(Km);
function Z(e, t) {
  const n = Object.assign({}, t.props);
  e.className && (n.className = B(t.props.className, e.className)), e.style && (n.style = Object.assign(Object.assign({}, n.style), e.style)), e.tabIndex !== void 0 && (n.tabIndex = e.tabIndex);
  for (const r in e)
    e.hasOwnProperty(r) && (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = e[r]);
  return l.cloneElement(t, n);
}
var Gm = typeof pt == "object" && pt && pt.Object === Object && pt, ad = Gm, Ym = ad, Xm = typeof self == "object" && self && self.Object === Object && self, Qm = Ym || Xm || Function("return this")(), bt = Qm, Jm = bt, eh = Jm.Symbol, ul = eh, Sc = ul, od = Object.prototype, th = od.hasOwnProperty, nh = od.toString, Ir = Sc ? Sc.toStringTag : void 0;
function rh(e) {
  var t = th.call(e, Ir), n = e[Ir];
  try {
    e[Ir] = void 0;
    var r = !0;
  } catch {
  }
  var i = nh.call(e);
  return r && (t ? e[Ir] = n : delete e[Ir]), i;
}
var ih = rh, ah = Object.prototype, oh = ah.toString;
function sh(e) {
  return oh.call(e);
}
var lh = sh, Fc = ul, ch = ih, uh = lh, fh = "[object Null]", dh = "[object Undefined]", Nc = Fc ? Fc.toStringTag : void 0;
function mh(e) {
  return e == null ? e === void 0 ? dh : fh : Nc && Nc in Object(e) ? ch(e) : uh(e);
}
var br = mh;
function hh(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Nt = hh, vh = br, ph = Nt, gh = "[object AsyncFunction]", yh = "[object Function]", bh = "[object GeneratorFunction]", wh = "[object Proxy]";
function Eh(e) {
  if (!ph(e))
    return !1;
  var t = vh(e);
  return t == yh || t == bh || t == gh || t == wh;
}
var fl = Eh, Ch = bt, xh = Ch["__core-js_shared__"], $h = xh, Do = $h, Pc = function() {
  var e = /[^.]+$/.exec(Do && Do.keys && Do.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function _h(e) {
  return !!Pc && Pc in e;
}
var kh = _h, Oh = Function.prototype, Sh = Oh.toString;
function Fh(e) {
  if (e != null) {
    try {
      return Sh.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var sd = Fh, Nh = fl, Ph = kh, Ah = Nt, Th = sd, Rh = /[\\^$.*+?()[\]{}|]/g, Mh = /^\[object .+?Constructor\]$/, Ih = Function.prototype, Lh = Object.prototype, Dh = Ih.toString, Vh = Lh.hasOwnProperty, jh = RegExp(
  "^" + Dh.call(Vh).replace(Rh, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bh(e) {
  if (!Ah(e) || Ph(e))
    return !1;
  var t = Nh(e) ? jh : Mh;
  return t.test(Th(e));
}
var Wh = Bh;
function Zh(e, t) {
  return e == null ? void 0 : e[t];
}
var Hh = Zh, zh = Wh, Uh = Hh;
function qh(e, t) {
  var n = Uh(e, t);
  return zh(n) ? n : void 0;
}
var jn = qh, Kh = jn, Gh = function() {
  try {
    var e = Kh(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ld = Gh, Ac = ld;
function Yh(e, t, n) {
  t == "__proto__" && Ac ? Ac(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var dl = Yh;
function Xh(e, t) {
  return e === t || e !== e && t !== t;
}
var $i = Xh, Qh = dl, Jh = $i, e2 = Object.prototype, t2 = e2.hasOwnProperty;
function n2(e, t, n) {
  var r = e[t];
  (!(t2.call(e, t) && Jh(r, n)) || n === void 0 && !(t in e)) && Qh(e, t, n);
}
var r2 = n2, i2 = r2, a2 = dl;
function o2(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), i ? a2(n, s, c) : i2(n, s, c);
  }
  return n;
}
var cd = o2;
function s2(e) {
  return e;
}
var ud = s2;
function l2(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var c2 = l2, u2 = c2, Tc = Math.max;
function f2(e, t, n) {
  return t = Tc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, i = -1, a = Tc(r.length - t, 0), o = Array(a); ++i < a; )
      o[i] = r[t + i];
    i = -1;
    for (var s = Array(t + 1); ++i < t; )
      s[i] = r[i];
    return s[t] = n(o), u2(e, this, s);
  };
}
var d2 = f2;
function m2(e) {
  return function() {
    return e;
  };
}
var h2 = m2, v2 = h2, Rc = ld, p2 = ud, g2 = Rc ? function(e, t) {
  return Rc(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: v2(t),
    writable: !0
  });
} : p2, y2 = g2, b2 = 800, w2 = 16, E2 = Date.now;
function C2(e) {
  var t = 0, n = 0;
  return function() {
    var r = E2(), i = w2 - (r - n);
    if (n = r, i > 0) {
      if (++t >= b2)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var x2 = C2, $2 = y2, _2 = x2, k2 = _2($2), O2 = k2, S2 = ud, F2 = d2, N2 = O2;
function P2(e, t) {
  return N2(F2(e, t, S2), e + "");
}
var A2 = P2, T2 = 9007199254740991;
function R2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= T2;
}
var fd = R2, M2 = fl, I2 = fd;
function L2(e) {
  return e != null && I2(e.length) && !M2(e);
}
var ja = L2, D2 = 9007199254740991, V2 = /^(?:0|[1-9]\d*)$/;
function j2(e, t) {
  var n = typeof e;
  return t = t ?? D2, !!t && (n == "number" || n != "symbol" && V2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var dd = j2, B2 = $i, W2 = ja, Z2 = dd, H2 = Nt;
function z2(e, t, n) {
  if (!H2(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? W2(n) && Z2(t, n.length) : r == "string" && t in n) ? B2(n[t], e) : !1;
}
var U2 = z2, q2 = A2, K2 = U2;
function G2(e) {
  return q2(function(t, n) {
    var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && K2(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i; ) {
      var s = n[r];
      s && e(t, s, r, a);
    }
    return t;
  });
}
var md = G2;
function Y2(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var X2 = Y2;
function Q2(e) {
  return e != null && typeof e == "object";
}
var Bn = Q2, J2 = br, ev = Bn, tv = "[object Arguments]";
function nv(e) {
  return ev(e) && J2(e) == tv;
}
var rv = nv, Mc = rv, iv = Bn, hd = Object.prototype, av = hd.hasOwnProperty, ov = hd.propertyIsEnumerable, sv = Mc(/* @__PURE__ */ function() {
  return arguments;
}()) ? Mc : function(e) {
  return iv(e) && av.call(e, "callee") && !ov.call(e, "callee");
}, vd = sv, lv = Array.isArray, Ba = lv, pa = { exports: {} };
function cv() {
  return !1;
}
var uv = cv;
pa.exports;
(function(e, t) {
  var n = bt, r = uv, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  e.exports = u;
})(pa, pa.exports);
var ml = pa.exports, fv = br, dv = fd, mv = Bn, hv = "[object Arguments]", vv = "[object Array]", pv = "[object Boolean]", gv = "[object Date]", yv = "[object Error]", bv = "[object Function]", wv = "[object Map]", Ev = "[object Number]", Cv = "[object Object]", xv = "[object RegExp]", $v = "[object Set]", _v = "[object String]", kv = "[object WeakMap]", Ov = "[object ArrayBuffer]", Sv = "[object DataView]", Fv = "[object Float32Array]", Nv = "[object Float64Array]", Pv = "[object Int8Array]", Av = "[object Int16Array]", Tv = "[object Int32Array]", Rv = "[object Uint8Array]", Mv = "[object Uint8ClampedArray]", Iv = "[object Uint16Array]", Lv = "[object Uint32Array]", ge = {};
ge[Fv] = ge[Nv] = ge[Pv] = ge[Av] = ge[Tv] = ge[Rv] = ge[Mv] = ge[Iv] = ge[Lv] = !0;
ge[hv] = ge[vv] = ge[Ov] = ge[pv] = ge[Sv] = ge[gv] = ge[yv] = ge[bv] = ge[wv] = ge[Ev] = ge[Cv] = ge[xv] = ge[$v] = ge[_v] = ge[kv] = !1;
function Dv(e) {
  return mv(e) && dv(e.length) && !!ge[fv(e)];
}
var Vv = Dv;
function jv(e) {
  return function(t) {
    return e(t);
  };
}
var Bv = jv, ga = { exports: {} };
ga.exports;
(function(e, t) {
  var n = ad, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(ga, ga.exports);
var Wv = ga.exports, Zv = Vv, Hv = Bv, Ic = Wv, Lc = Ic && Ic.isTypedArray, zv = Lc ? Hv(Lc) : Zv, hl = zv, Uv = X2, qv = vd, Kv = Ba, Gv = ml, Yv = dd, Xv = hl, Qv = Object.prototype, Jv = Qv.hasOwnProperty;
function ep(e, t) {
  var n = Kv(e), r = !n && qv(e), i = !n && !r && Gv(e), a = !n && !r && !i && Xv(e), o = n || r || i || a, s = o ? Uv(e.length, String) : [], c = s.length;
  for (var u in e)
    (t || Jv.call(e, u)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (u == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (u == "offset" || u == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || // Skip index properties.
    Yv(u, c))) && s.push(u);
  return s;
}
var pd = ep, tp = Object.prototype;
function np(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || tp;
  return e === n;
}
var vl = np;
function rp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var gd = rp, ip = gd, ap = ip(Object.keys, Object), op = ap, sp = vl, lp = op, cp = Object.prototype, up = cp.hasOwnProperty;
function fp(e) {
  if (!sp(e))
    return lp(e);
  var t = [];
  for (var n in Object(e))
    up.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var dp = fp, mp = pd, hp = dp, vp = ja;
function pp(e) {
  return vp(e) ? mp(e) : hp(e);
}
var yd = pp, gp = cd, yp = md, bp = yd, wp = yp(function(e, t, n, r) {
  gp(t, bp(t), e, r);
}), Ep = wp;
const Cp = /* @__PURE__ */ lt(Ep);
function U(...e) {
  function t(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, e[0]);
  for (let r = 1; r < e.length; r++)
    n = Cp(n, e[r], t);
  return n;
}
var bd = function(e) {
  return function(t, n) {
    var r = j(!1);
    e(function() {
      return function() {
        r.current = !1;
      };
    }, []), e(function() {
      if (!r.current)
        r.current = !0;
      else
        return t();
    }, n);
  };
}, wr = function(e) {
  return typeof e == "function";
}, xp = function(e) {
  return typeof e == "number";
}, $p = !1;
const _i = $p;
function zt(e) {
  _i && (wr(e) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));
  var t = j(e);
  t.current = ee(function() {
    return e;
  }, [e]);
  var n = j();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return t.current.apply(this, r);
  }), n.current;
}
const pl = bd(Y);
function Dc(e, t) {
  if (e === t)
    return !0;
  for (var n = 0; n < e.length; n++)
    if (!Object.is(e[n], t[n]))
      return !1;
  return !0;
}
function Wa(e) {
  var t = j(e);
  return t.current = e, t;
}
var _p = function(e) {
  _i && (wr(e) || console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));
  var t = Wa(e);
  Y(function() {
    return function() {
      t.current();
    };
  }, []);
};
const ki = _p;
var kp = bt, Op = function() {
  return kp.Date.now();
}, Sp = Op, Fp = /\s/;
function Np(e) {
  for (var t = e.length; t-- && Fp.test(e.charAt(t)); )
    ;
  return t;
}
var Pp = Np, Ap = Pp, Tp = /^\s+/;
function Rp(e) {
  return e && e.slice(0, Ap(e) + 1).replace(Tp, "");
}
var Mp = Rp, Ip = br, Lp = Bn, Dp = "[object Symbol]";
function Vp(e) {
  return typeof e == "symbol" || Lp(e) && Ip(e) == Dp;
}
var jp = Vp, Bp = Mp, Vc = Nt, Wp = jp, jc = NaN, Zp = /^[-+]0x[0-9a-f]+$/i, Hp = /^0b[01]+$/i, zp = /^0o[0-7]+$/i, Up = parseInt;
function qp(e) {
  if (typeof e == "number")
    return e;
  if (Wp(e))
    return jc;
  if (Vc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Vc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Bp(e);
  var n = Hp.test(e);
  return n || zp.test(e) ? Up(e.slice(2), n ? 2 : 8) : Zp.test(e) ? jc : +e;
}
var Kp = qp, Gp = Nt, Vo = Sp, Bc = Kp, Yp = "Expected a function", Xp = Math.max, Qp = Math.min;
function Jp(e, t, n) {
  var r, i, a, o, s, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(Yp);
  t = Bc(t) || 0, Gp(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? Xp(Bc(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function y(x) {
    var $ = r, P = i;
    return r = i = void 0, u = x, o = e.apply(P, $), o;
  }
  function v(x) {
    return u = x, s = setTimeout(g, t), f ? y(x) : o;
  }
  function p(x) {
    var $ = x - c, P = x - u, S = t - $;
    return d ? Qp(S, a - P) : S;
  }
  function b(x) {
    var $ = x - c, P = x - u;
    return c === void 0 || $ >= t || $ < 0 || d && P >= a;
  }
  function g() {
    var x = Vo();
    if (b(x))
      return C(x);
    s = setTimeout(g, p(x));
  }
  function C(x) {
    return s = void 0, m && r ? y(x) : (r = i = void 0, o);
  }
  function h() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function w() {
    return s === void 0 ? o : C(Vo());
  }
  function E() {
    var x = Vo(), $ = b(x);
    if (r = arguments, i = this, c = x, $) {
      if (s === void 0)
        return v(c);
      if (d)
        return clearTimeout(s), s = setTimeout(g, t), y(c);
    }
    return s === void 0 && (s = setTimeout(g, t)), o;
  }
  return E.cancel = h, E.flush = w, E;
}
var wd = Jp;
const e3 = /* @__PURE__ */ lt(wd);
var t3 = !!(typeof window < "u" && window.document && window.document.createElement);
const gl = t3;
var n3 = wd, r3 = Nt, i3 = "Expected a function";
function a3(e, t, n) {
  var r = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(i3);
  return r3(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), n3(e, t, {
    leading: r,
    maxWait: t,
    trailing: i
  });
}
var o3 = a3;
const s3 = /* @__PURE__ */ lt(o3);
var l3 = function(e) {
  _i && (wr(e) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e, '".'))), Y(function() {
    e == null || e();
  }, []);
};
const c3 = l3;
var u3 = function() {
  var e = Ot(K({}), 2), t = e[1];
  return He(function() {
    return t({});
  }, []);
};
const Ed = u3;
function sn(e, t) {
  if (gl) {
    if (!e)
      return t;
    var n;
    return wr(e) ? n = e() : "current" in e ? n = e.current : n = e, n;
  }
}
var f3 = function(e) {
  return e.every(function(t) {
    var n = sn(t);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, d3 = function(e) {
  return e ? e.getRootNode() : document;
}, m3 = function(e) {
  if (!e || !document.getRootNode)
    return document;
  var t = Array.isArray(e) ? e : [e];
  return f3(t) ? d3(sn(t[0])) : document;
};
const h3 = m3;
var v3 = function(e) {
  var t = function(n, r, i) {
    var a = j(!1), o = j([]), s = j([]), c = j();
    e(function() {
      var u, f = Array.isArray(i) ? i : [i], d = f.map(function(m) {
        return sn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = d, s.current = r, c.current = n();
        return;
      }
      (d.length !== o.current.length || !Dc(d, o.current) || !Dc(r, s.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, s.current = r, c.current = n());
    }), ki(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return t;
};
const Cd = v3;
var p3 = Cd(Y);
const yl = p3;
function xd(e, t, n) {
  n === void 0 && (n = "click");
  var r = Wa(e);
  yl(function() {
    var i = function(s) {
      var c = Array.isArray(t) ? t : [t];
      c.some(function(u) {
        var f = sn(u);
        return !f || f.contains(s.target);
      }) || r.current(s);
    }, a = h3(t), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(s) {
      return a.addEventListener(s, i);
    }), function() {
      o.forEach(function(s) {
        return a.removeEventListener(s, i);
      });
    };
  }, Array.isArray(n) ? n : [n], t);
}
var $d = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", y = "year", v = "date", p = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, g = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(T) {
      var _ = ["th", "st", "nd", "rd"], R = T % 100;
      return "[" + T + (_[(R - 20) % 10] || _[R] || _[0]) + "]";
    } }, h = function(T, _, R) {
      var N = String(T);
      return !N || N.length >= _ ? T : "" + Array(_ + 1 - N.length).join(R) + T;
    }, w = { s: h, z: function(T) {
      var _ = -T.utcOffset(), R = Math.abs(_), N = Math.floor(R / 60), O = R % 60;
      return (_ <= 0 ? "+" : "-") + h(N, 2, "0") + ":" + h(O, 2, "0");
    }, m: function T(_, R) {
      if (_.date() < R.date())
        return -T(R, _);
      var N = 12 * (R.year() - _.year()) + (R.month() - _.month()), O = _.clone().add(N, d), M = R - O < 0, A = _.clone().add(N + (M ? -1 : 1), d);
      return +(-(N + (R - O) / (M ? O - A : A - O)) || 0);
    }, a: function(T) {
      return T < 0 ? Math.ceil(T) || 0 : Math.floor(T);
    }, p: function(T) {
      return { M: d, y, w: f, d: u, D: v, h: c, m: s, s: o, ms: a, Q: m }[T] || String(T || "").toLowerCase().replace(/s$/, "");
    }, u: function(T) {
      return T === void 0;
    } }, E = "en", x = {};
    x[E] = C;
    var $ = function(T) {
      return T instanceof D;
    }, P = function T(_, R, N) {
      var O;
      if (!_)
        return E;
      if (typeof _ == "string") {
        var M = _.toLowerCase();
        x[M] && (O = M), R && (x[M] = R, O = M);
        var A = _.split("-");
        if (!O && A.length > 1)
          return T(A[0]);
      } else {
        var F = _.name;
        x[F] = _, O = F;
      }
      return !N && O && (E = O), O || !N && E;
    }, S = function(T, _) {
      if ($(T))
        return T.clone();
      var R = typeof _ == "object" ? _ : {};
      return R.date = T, R.args = arguments, new D(R);
    }, k = w;
    k.l = P, k.i = $, k.w = function(T, _) {
      return S(T, { locale: _.$L, utc: _.$u, x: _.$x, $offset: _.$offset });
    };
    var D = function() {
      function T(R) {
        this.$L = P(R.locale, null, !0), this.parse(R);
      }
      var _ = T.prototype;
      return _.parse = function(R) {
        this.$d = function(N) {
          var O = N.date, M = N.utc;
          if (O === null)
            return /* @__PURE__ */ new Date(NaN);
          if (k.u(O))
            return /* @__PURE__ */ new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var A = O.match(b);
            if (A) {
              var F = A[2] - 1 || 0, L = (A[7] || "0").substring(0, 3);
              return M ? new Date(Date.UTC(A[1], F, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, L)) : new Date(A[1], F, A[3] || 1, A[4] || 0, A[5] || 0, A[6] || 0, L);
            }
          }
          return new Date(O);
        }(R), this.$x = R.x || {}, this.init();
      }, _.init = function() {
        var R = this.$d;
        this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
      }, _.$utils = function() {
        return k;
      }, _.isValid = function() {
        return this.$d.toString() !== p;
      }, _.isSame = function(R, N) {
        var O = S(R);
        return this.startOf(N) <= O && O <= this.endOf(N);
      }, _.isAfter = function(R, N) {
        return S(R) < this.startOf(N);
      }, _.isBefore = function(R, N) {
        return this.endOf(N) < S(R);
      }, _.$g = function(R, N, O) {
        return k.u(R) ? this[N] : this.set(O, R);
      }, _.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, _.valueOf = function() {
        return this.$d.getTime();
      }, _.startOf = function(R, N) {
        var O = this, M = !!k.u(N) || N, A = k.p(R), F = function(Ee, le) {
          var ft = k.w(O.$u ? Date.UTC(O.$y, le, Ee) : new Date(O.$y, le, Ee), O);
          return M ? ft : ft.endOf(u);
        }, L = function(Ee, le) {
          return k.w(O.toDate()[Ee].apply(O.toDate("s"), (M ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(le)), O);
        }, W = this.$W, H = this.$M, q = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (A) {
          case y:
            return M ? F(1, 0) : F(31, 11);
          case d:
            return M ? F(1, H) : F(0, H + 1);
          case f:
            var ae = this.$locale().weekStart || 0, de = (W < ae ? W + 7 : W) - ae;
            return F(M ? q - de : q + (6 - de), H);
          case u:
          case v:
            return L(G + "Hours", 0);
          case c:
            return L(G + "Minutes", 1);
          case s:
            return L(G + "Seconds", 2);
          case o:
            return L(G + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, _.endOf = function(R) {
        return this.startOf(R, !1);
      }, _.$set = function(R, N) {
        var O, M = k.p(R), A = "set" + (this.$u ? "UTC" : ""), F = (O = {}, O[u] = A + "Date", O[v] = A + "Date", O[d] = A + "Month", O[y] = A + "FullYear", O[c] = A + "Hours", O[s] = A + "Minutes", O[o] = A + "Seconds", O[a] = A + "Milliseconds", O)[M], L = M === u ? this.$D + (N - this.$W) : N;
        if (M === d || M === y) {
          var W = this.clone().set(v, 1);
          W.$d[F](L), W.init(), this.$d = W.set(v, Math.min(this.$D, W.daysInMonth())).$d;
        } else
          F && this.$d[F](L);
        return this.init(), this;
      }, _.set = function(R, N) {
        return this.clone().$set(R, N);
      }, _.get = function(R) {
        return this[k.p(R)]();
      }, _.add = function(R, N) {
        var O, M = this;
        R = Number(R);
        var A = k.p(N), F = function(H) {
          var q = S(M);
          return k.w(q.date(q.date() + Math.round(H * R)), M);
        };
        if (A === d)
          return this.set(d, this.$M + R);
        if (A === y)
          return this.set(y, this.$y + R);
        if (A === u)
          return F(1);
        if (A === f)
          return F(7);
        var L = (O = {}, O[s] = r, O[c] = i, O[o] = n, O)[A] || 1, W = this.$d.getTime() + R * L;
        return k.w(W, this);
      }, _.subtract = function(R, N) {
        return this.add(-1 * R, N);
      }, _.format = function(R) {
        var N = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || p;
        var M = R || "YYYY-MM-DDTHH:mm:ssZ", A = k.z(this), F = this.$H, L = this.$m, W = this.$M, H = O.weekdays, q = O.months, G = O.meridiem, ae = function(le, ft, Ie, be) {
          return le && (le[ft] || le(N, M)) || Ie[ft].slice(0, be);
        }, de = function(le) {
          return k.s(F % 12 || 12, le, "0");
        }, Ee = G || function(le, ft, Ie) {
          var be = le < 12 ? "AM" : "PM";
          return Ie ? be.toLowerCase() : be;
        };
        return M.replace(g, function(le, ft) {
          return ft || function(Ie) {
            switch (Ie) {
              case "YY":
                return String(N.$y).slice(-2);
              case "YYYY":
                return k.s(N.$y, 4, "0");
              case "M":
                return W + 1;
              case "MM":
                return k.s(W + 1, 2, "0");
              case "MMM":
                return ae(O.monthsShort, W, q, 3);
              case "MMMM":
                return ae(q, W);
              case "D":
                return N.$D;
              case "DD":
                return k.s(N.$D, 2, "0");
              case "d":
                return String(N.$W);
              case "dd":
                return ae(O.weekdaysMin, N.$W, H, 2);
              case "ddd":
                return ae(O.weekdaysShort, N.$W, H, 3);
              case "dddd":
                return H[N.$W];
              case "H":
                return String(F);
              case "HH":
                return k.s(F, 2, "0");
              case "h":
                return de(1);
              case "hh":
                return de(2);
              case "a":
                return Ee(F, L, !0);
              case "A":
                return Ee(F, L, !1);
              case "m":
                return String(L);
              case "mm":
                return k.s(L, 2, "0");
              case "s":
                return String(N.$s);
              case "ss":
                return k.s(N.$s, 2, "0");
              case "SSS":
                return k.s(N.$ms, 3, "0");
              case "Z":
                return A;
            }
            return null;
          }(le) || A.replace(":", "");
        });
      }, _.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, _.diff = function(R, N, O) {
        var M, A = this, F = k.p(N), L = S(R), W = (L.utcOffset() - this.utcOffset()) * r, H = this - L, q = function() {
          return k.m(A, L);
        };
        switch (F) {
          case y:
            M = q() / 12;
            break;
          case d:
            M = q();
            break;
          case m:
            M = q() / 3;
            break;
          case f:
            M = (H - W) / 6048e5;
            break;
          case u:
            M = (H - W) / 864e5;
            break;
          case c:
            M = H / i;
            break;
          case s:
            M = H / r;
            break;
          case o:
            M = H / n;
            break;
          default:
            M = H;
        }
        return O ? M : k.a(M);
      }, _.daysInMonth = function() {
        return this.endOf(d).$D;
      }, _.$locale = function() {
        return x[this.$L];
      }, _.locale = function(R, N) {
        if (!R)
          return this.$L;
        var O = this.clone(), M = P(R, N, !0);
        return M && (O.$L = M), O;
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
      }, T;
    }(), I = D.prototype;
    return S.prototype = I, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", d], ["$y", y], ["$D", v]].forEach(function(T) {
      I[T[1]] = function(_) {
        return this.$g(_, T[0], T[1]);
      };
    }), S.extend = function(T, _) {
      return T.$i || (T(_, D, S), T.$i = !0), S;
    }, S.locale = P, S.isDayjs = $, S.unix = function(T) {
      return S(1e3 * T);
    }, S.en = x[E], S.Ls = x, S.p = {}, S;
  });
})($d);
var g3 = $d.exports;
const me = /* @__PURE__ */ lt(g3);
function y3(e, t) {
  var n;
  _i && (wr(e) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));
  var r = Wa(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = ee(function() {
    return e3(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, cl([], Ot(o), !1));
    }, i, t);
  }, []);
  return ki(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function b3(e, t, n) {
  var r = Ot(K({}), 2), i = r[0], a = r[1], o = y3(function() {
    a({});
  }, n).run;
  Y(function() {
    return o();
  }, t), pl(e, [i]);
}
function w3() {
  this.__data__ = [], this.size = 0;
}
var E3 = w3, C3 = $i;
function x3(e, t) {
  for (var n = e.length; n--; )
    if (C3(e[n][0], t))
      return n;
  return -1;
}
var Za = x3, $3 = Za, _3 = Array.prototype, k3 = _3.splice;
function O3(e) {
  var t = this.__data__, n = $3(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : k3.call(t, n, 1), --this.size, !0;
}
var S3 = O3, F3 = Za;
function N3(e) {
  var t = this.__data__, n = F3(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var P3 = N3, A3 = Za;
function T3(e) {
  return A3(this.__data__, e) > -1;
}
var R3 = T3, M3 = Za;
function I3(e, t) {
  var n = this.__data__, r = M3(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var L3 = I3, D3 = E3, V3 = S3, j3 = P3, B3 = R3, W3 = L3;
function Er(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Er.prototype.clear = D3;
Er.prototype.delete = V3;
Er.prototype.get = j3;
Er.prototype.has = B3;
Er.prototype.set = W3;
var Ha = Er, Z3 = Ha;
function H3() {
  this.__data__ = new Z3(), this.size = 0;
}
var z3 = H3;
function U3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var q3 = U3;
function K3(e) {
  return this.__data__.get(e);
}
var G3 = K3;
function Y3(e) {
  return this.__data__.has(e);
}
var X3 = Y3, Q3 = jn, J3 = bt, eg = Q3(J3, "Map"), bl = eg, tg = jn, ng = tg(Object, "create"), za = ng, Wc = za;
function rg() {
  this.__data__ = Wc ? Wc(null) : {}, this.size = 0;
}
var ig = rg;
function ag(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var og = ag, sg = za, lg = "__lodash_hash_undefined__", cg = Object.prototype, ug = cg.hasOwnProperty;
function fg(e) {
  var t = this.__data__;
  if (sg) {
    var n = t[e];
    return n === lg ? void 0 : n;
  }
  return ug.call(t, e) ? t[e] : void 0;
}
var dg = fg, mg = za, hg = Object.prototype, vg = hg.hasOwnProperty;
function pg(e) {
  var t = this.__data__;
  return mg ? t[e] !== void 0 : vg.call(t, e);
}
var gg = pg, yg = za, bg = "__lodash_hash_undefined__";
function wg(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = yg && t === void 0 ? bg : t, this;
}
var Eg = wg, Cg = ig, xg = og, $g = dg, _g = gg, kg = Eg;
function Cr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Cr.prototype.clear = Cg;
Cr.prototype.delete = xg;
Cr.prototype.get = $g;
Cr.prototype.has = _g;
Cr.prototype.set = kg;
var Og = Cr, Zc = Og, Sg = Ha, Fg = bl;
function Ng() {
  this.size = 0, this.__data__ = {
    hash: new Zc(),
    map: new (Fg || Sg)(),
    string: new Zc()
  };
}
var Pg = Ng;
function Ag(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Tg = Ag, Rg = Tg;
function Mg(e, t) {
  var n = e.__data__;
  return Rg(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Ua = Mg, Ig = Ua;
function Lg(e) {
  var t = Ig(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Dg = Lg, Vg = Ua;
function jg(e) {
  return Vg(this, e).get(e);
}
var Bg = jg, Wg = Ua;
function Zg(e) {
  return Wg(this, e).has(e);
}
var Hg = Zg, zg = Ua;
function Ug(e, t) {
  var n = zg(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var qg = Ug, Kg = Pg, Gg = Dg, Yg = Bg, Xg = Hg, Qg = qg;
function xr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xr.prototype.clear = Kg;
xr.prototype.delete = Gg;
xr.prototype.get = Yg;
xr.prototype.has = Xg;
xr.prototype.set = Qg;
var wl = xr, Jg = Ha, e4 = bl, t4 = wl, n4 = 200;
function r4(e, t) {
  var n = this.__data__;
  if (n instanceof Jg) {
    var r = n.__data__;
    if (!e4 || r.length < n4 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new t4(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var i4 = r4, a4 = Ha, o4 = z3, s4 = q3, l4 = G3, c4 = X3, u4 = i4;
function $r(e) {
  var t = this.__data__ = new a4(e);
  this.size = t.size;
}
$r.prototype.clear = o4;
$r.prototype.delete = s4;
$r.prototype.get = l4;
$r.prototype.has = c4;
$r.prototype.set = u4;
var _d = $r, f4 = "__lodash_hash_undefined__";
function d4(e) {
  return this.__data__.set(e, f4), this;
}
var m4 = d4;
function h4(e) {
  return this.__data__.has(e);
}
var v4 = h4, p4 = wl, g4 = m4, y4 = v4;
function ya(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new p4(); ++t < n; )
    this.add(e[t]);
}
ya.prototype.add = ya.prototype.push = g4;
ya.prototype.has = y4;
var b4 = ya;
function w4(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var E4 = w4;
function C4(e, t) {
  return e.has(t);
}
var x4 = C4, $4 = b4, _4 = E4, k4 = x4, O4 = 1, S4 = 2;
function F4(e, t, n, r, i, a) {
  var o = n & O4, s = e.length, c = t.length;
  if (s != c && !(o && c > s))
    return !1;
  var u = a.get(e), f = a.get(t);
  if (u && f)
    return u == t && f == e;
  var d = -1, m = !0, y = n & S4 ? new $4() : void 0;
  for (a.set(e, t), a.set(t, e); ++d < s; ) {
    var v = e[d], p = t[d];
    if (r)
      var b = o ? r(p, v, d, t, e, a) : r(v, p, d, e, t, a);
    if (b !== void 0) {
      if (b)
        continue;
      m = !1;
      break;
    }
    if (y) {
      if (!_4(t, function(g, C) {
        if (!k4(y, C) && (v === g || i(v, g, n, r, a)))
          return y.push(C);
      })) {
        m = !1;
        break;
      }
    } else if (!(v === p || i(v, p, n, r, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var kd = F4, N4 = bt, P4 = N4.Uint8Array, Od = P4;
function A4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, i) {
    n[++t] = [i, r];
  }), n;
}
var T4 = A4;
function R4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var M4 = R4, Hc = ul, zc = Od, I4 = $i, L4 = kd, D4 = T4, V4 = M4, j4 = 1, B4 = 2, W4 = "[object Boolean]", Z4 = "[object Date]", H4 = "[object Error]", z4 = "[object Map]", U4 = "[object Number]", q4 = "[object RegExp]", K4 = "[object Set]", G4 = "[object String]", Y4 = "[object Symbol]", X4 = "[object ArrayBuffer]", Q4 = "[object DataView]", Uc = Hc ? Hc.prototype : void 0, jo = Uc ? Uc.valueOf : void 0;
function J4(e, t, n, r, i, a, o) {
  switch (n) {
    case Q4:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case X4:
      return !(e.byteLength != t.byteLength || !a(new zc(e), new zc(t)));
    case W4:
    case Z4:
    case U4:
      return I4(+e, +t);
    case H4:
      return e.name == t.name && e.message == t.message;
    case q4:
    case G4:
      return e == t + "";
    case z4:
      var s = D4;
    case K4:
      var c = r & j4;
      if (s || (s = V4), e.size != t.size && !c)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      r |= B4, o.set(e, t);
      var f = L4(s(e), s(t), r, i, a, o);
      return o.delete(e), f;
    case Y4:
      if (jo)
        return jo.call(e) == jo.call(t);
  }
  return !1;
}
var e5 = J4;
function t5(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var n5 = t5, r5 = n5, i5 = Ba;
function a5(e, t, n) {
  var r = t(e);
  return i5(e) ? r : r5(r, n(e));
}
var o5 = a5;
function s5(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
var l5 = s5;
function c5() {
  return [];
}
var u5 = c5, f5 = l5, d5 = u5, m5 = Object.prototype, h5 = m5.propertyIsEnumerable, qc = Object.getOwnPropertySymbols, v5 = qc ? function(e) {
  return e == null ? [] : (e = Object(e), f5(qc(e), function(t) {
    return h5.call(e, t);
  }));
} : d5, p5 = v5, g5 = o5, y5 = p5, b5 = yd;
function w5(e) {
  return g5(e, b5, y5);
}
var E5 = w5, Kc = E5, C5 = 1, x5 = Object.prototype, $5 = x5.hasOwnProperty;
function _5(e, t, n, r, i, a) {
  var o = n & C5, s = Kc(e), c = s.length, u = Kc(t), f = u.length;
  if (c != f && !o)
    return !1;
  for (var d = c; d--; ) {
    var m = s[d];
    if (!(o ? m in t : $5.call(t, m)))
      return !1;
  }
  var y = a.get(e), v = a.get(t);
  if (y && v)
    return y == t && v == e;
  var p = !0;
  a.set(e, t), a.set(t, e);
  for (var b = o; ++d < c; ) {
    m = s[d];
    var g = e[m], C = t[m];
    if (r)
      var h = o ? r(C, g, m, t, e, a) : r(g, C, m, e, t, a);
    if (!(h === void 0 ? g === C || i(g, C, n, r, a) : h)) {
      p = !1;
      break;
    }
    b || (b = m == "constructor");
  }
  if (p && !b) {
    var w = e.constructor, E = t.constructor;
    w != E && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof E == "function" && E instanceof E) && (p = !1);
  }
  return a.delete(e), a.delete(t), p;
}
var k5 = _5, O5 = jn, S5 = bt, F5 = O5(S5, "DataView"), N5 = F5, P5 = jn, A5 = bt, T5 = P5(A5, "Promise"), R5 = T5, M5 = jn, I5 = bt, L5 = M5(I5, "Set"), D5 = L5, V5 = jn, j5 = bt, B5 = V5(j5, "WeakMap"), W5 = B5, ms = N5, hs = bl, vs = R5, ps = D5, gs = W5, Sd = br, _r = sd, Gc = "[object Map]", Z5 = "[object Object]", Yc = "[object Promise]", Xc = "[object Set]", Qc = "[object WeakMap]", Jc = "[object DataView]", H5 = _r(ms), z5 = _r(hs), U5 = _r(vs), q5 = _r(ps), K5 = _r(gs), kn = Sd;
(ms && kn(new ms(new ArrayBuffer(1))) != Jc || hs && kn(new hs()) != Gc || vs && kn(vs.resolve()) != Yc || ps && kn(new ps()) != Xc || gs && kn(new gs()) != Qc) && (kn = function(e) {
  var t = Sd(e), n = t == Z5 ? e.constructor : void 0, r = n ? _r(n) : "";
  if (r)
    switch (r) {
      case H5:
        return Jc;
      case z5:
        return Gc;
      case U5:
        return Yc;
      case q5:
        return Xc;
      case K5:
        return Qc;
    }
  return t;
});
var G5 = kn, Bo = _d, Y5 = kd, X5 = e5, Q5 = k5, eu = G5, tu = Ba, nu = ml, J5 = hl, e6 = 1, ru = "[object Arguments]", iu = "[object Array]", Zi = "[object Object]", t6 = Object.prototype, au = t6.hasOwnProperty;
function n6(e, t, n, r, i, a) {
  var o = tu(e), s = tu(t), c = o ? iu : eu(e), u = s ? iu : eu(t);
  c = c == ru ? Zi : c, u = u == ru ? Zi : u;
  var f = c == Zi, d = u == Zi, m = c == u;
  if (m && nu(e)) {
    if (!nu(t))
      return !1;
    o = !0, f = !1;
  }
  if (m && !f)
    return a || (a = new Bo()), o || J5(e) ? Y5(e, t, n, r, i, a) : X5(e, t, c, n, r, i, a);
  if (!(n & e6)) {
    var y = f && au.call(e, "__wrapped__"), v = d && au.call(t, "__wrapped__");
    if (y || v) {
      var p = y ? e.value() : e, b = v ? t.value() : t;
      return a || (a = new Bo()), i(p, b, n, r, a);
    }
  }
  return m ? (a || (a = new Bo()), Q5(e, t, n, r, i, a)) : !1;
}
var r6 = n6, i6 = r6, ou = Bn;
function Fd(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !ou(e) && !ou(t) ? e !== e && t !== t : i6(e, t, n, r, Fd, i);
}
var a6 = Fd, o6 = a6;
function s6(e, t) {
  return o6(e, t);
}
var l6 = s6;
const c6 = /* @__PURE__ */ lt(l6);
function u6(e) {
  var t = Ot(K(e), 2), n = t[0], r = t[1], i = j(n);
  i.current = n;
  var a = He(function() {
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
  function e(h) {
    try {
      return h.defaultView && h.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var t = function(h) {
    for (var w = h, E = e(w); E; )
      w = E.ownerDocument, E = e(w);
    return w;
  }(window.document), n = [], r = null, i = null;
  function a(h) {
    this.time = h.time, this.target = h.target, this.rootBounds = v(h.rootBounds), this.boundingClientRect = v(h.boundingClientRect), this.intersectionRect = v(h.intersectionRect || y()), this.isIntersecting = !!h.intersectionRect;
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
      !h || !w ? i = y() : i = p(h, w), n.forEach(function(E) {
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
      var P = this.root && (this.root.ownerDocument || this.root) || t;
      if (h != P) {
        var S = e(h);
        S && this._monitorIntersections(S.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(h) {
    var w = this._monitoringDocuments.indexOf(h);
    if (w != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || t, x = this._observationTargets.some(function(S) {
        var k = S.element.ownerDocument;
        if (k == h)
          return !0;
        for (; k && k != E; ) {
          var D = e(k);
          if (k = D && D.ownerDocument, k == h)
            return !0;
        }
        return !1;
      });
      if (!x) {
        var $ = this._monitoringUnsubscribes[w];
        if (this._monitoringDocuments.splice(w, 1), this._monitoringUnsubscribes.splice(w, 1), $(), h != E) {
          var P = e(h);
          P && this._unmonitorIntersections(P.ownerDocument);
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
      var h = this._rootIsInDom(), w = h ? this._getRootRect() : y();
      this._observationTargets.forEach(function(E) {
        var x = E.element, $ = m(x), P = this._rootContainsTarget(x), S = E.entry, k = h && P && this._computeTargetAndRootIntersection(x, $, w), D = null;
        this._rootContainsTarget(x) ? (!r || this.root) && (D = w) : D = y();
        var I = E.entry = new a({
          time: s(),
          target: x,
          boundingClientRect: $,
          rootBounds: D,
          intersectionRect: k
        });
        S ? h && P ? this._hasCrossedThreshold(S, I) && this._queuedEntries.push(I) : S && S.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(h, w, E) {
    if (window.getComputedStyle(h).display != "none") {
      for (var x = w, $ = g(h), P = !1; !P && $; ) {
        var S = null, k = $.nodeType == 1 ? window.getComputedStyle($) : {};
        if (k.display == "none")
          return null;
        if ($ == this.root || $.nodeType == /* DOCUMENT */
        9)
          if (P = !0, $ == this.root || $ == t)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? ($ = null, S = null, x = null) : S = i : S = E;
          else {
            var D = g($), I = D && m(D), T = D && this._computeTargetAndRootIntersection(D, I, E);
            I && T ? ($ = D, S = p(I, T)) : ($ = null, x = null);
          }
        else {
          var _ = $.ownerDocument;
          $ != _.body && $ != _.documentElement && k.overflow != "visible" && (S = m($));
        }
        if (S && (x = d(S, x)), !x)
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
      var w = C(this.root) ? this.root : t, E = w.documentElement, x = w.body;
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
        var P = this.thresholds[$];
        if (P == E || P == x || P < E != P < x)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || b(t, this.root);
  }, o.prototype._rootContainsTarget = function(h) {
    var w = this.root && (this.root.ownerDocument || this.root) || t;
    return b(w, h) && (!this.root || w == h.ownerDocument);
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
    var E = Math.max(h.top, w.top), x = Math.min(h.bottom, w.bottom), $ = Math.max(h.left, w.left), P = Math.min(h.right, w.right), S = P - $, k = x - E;
    return S >= 0 && k >= 0 && {
      top: E,
      bottom: x,
      left: $,
      right: P,
      width: S,
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
    }), w) : y();
  }
  function y() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  function v(h) {
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
  function p(h, w) {
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
  function b(h, w) {
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
    9 && h != t ? e(h) : (w && w.assignedSlot && (w = w.assignedSlot.parentNode), w && w.nodeType == 11 && w.host ? w.host : w);
  }
  function C(h) {
    return h && h.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function f6(e, t) {
  var n = Ot(K(), 2), r = n[0], i = n[1], a = Ot(K(), 2), o = a[0], s = a[1];
  return yl(function() {
    var c = sn(e);
    if (c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var y = Zm(f), v = y.next(); !v.done; v = y.next()) {
            var p = v.value;
            s(p.intersectionRatio), i(p.isIntersecting);
          }
        } catch (b) {
          d = {
            error: b
          };
        } finally {
          try {
            v && !v.done && (m = y.return) && m.call(y);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, va(va({}, t), {
        root: sn(t == null ? void 0 : t.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [t == null ? void 0 : t.rootMargin, t == null ? void 0 : t.threshold], e), [r, o];
}
var d6 = gl ? sl : Y;
const Se = d6;
function m6(e) {
  var t = this, n = j(!1);
  return He(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return ke(t, void 0, void 0, function() {
      var a, o;
      return Wm(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [
                2
                /*return*/
              ];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, e.apply(void 0, cl([], Ot(r), !1))];
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
  }, [e]);
}
function h6(e) {
  var t = j(0), n = Ot(K(e), 2), r = n[0], i = n[1], a = He(function(o) {
    cancelAnimationFrame(t.current), t.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return ki(function() {
    cancelAnimationFrame(t.current);
  }), [r, a];
}
var v6 = gd, p6 = v6(Object.getPrototypeOf, Object), Nd = p6, g6 = br, y6 = Nd, b6 = Bn, w6 = "[object Object]", E6 = Function.prototype, C6 = Object.prototype, Pd = E6.toString, x6 = C6.hasOwnProperty, $6 = Pd.call(Object);
function _6(e) {
  if (!b6(e) || g6(e) != w6)
    return !1;
  var t = y6(e);
  if (t === null)
    return !0;
  var n = x6.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Pd.call(n) == $6;
}
var k6 = _6, O6 = function() {
  var e = j(!1);
  return Y(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e;
};
const El = O6;
var Ad = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(i, a) {
      return i[0] === n ? (r = a, !0) : !1;
    }), r;
  }
  return (
    /** @class */
    function() {
      function t() {
        this.__entries__ = [];
      }
      return Object.defineProperty(t.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: !0,
        configurable: !0
      }), t.prototype.get = function(n) {
        var r = e(this.__entries__, n), i = this.__entries__[r];
        return i && i[1];
      }, t.prototype.set = function(n, r) {
        var i = e(this.__entries__, n);
        ~i ? this.__entries__[i][1] = r : this.__entries__.push([n, r]);
      }, t.prototype.delete = function(n) {
        var r = this.__entries__, i = e(r, n);
        ~i && r.splice(i, 1);
      }, t.prototype.has = function(n) {
        return !!~e(this.__entries__, n);
      }, t.prototype.clear = function() {
        this.__entries__.splice(0);
      }, t.prototype.forEach = function(n, r) {
        r === void 0 && (r = null);
        for (var i = 0, a = this.__entries__; i < a.length; i++) {
          var o = a[i];
          n.call(r, o[1], o[0]);
        }
      }, t;
    }()
  );
}(), ys = typeof window < "u" && typeof document < "u" && window.document === document, ba = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), S6 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ba) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), F6 = 2;
function N6(e, t) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, e()), r && s();
  }
  function o() {
    S6(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < F6)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, t);
    i = c;
  }
  return s;
}
var P6 = 20, A6 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], T6 = typeof MutationObserver < "u", R6 = (
  /** @class */
  function() {
    function e() {
      this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = N6(this.refresh.bind(this), P6);
    }
    return e.prototype.addObserver = function(t) {
      ~this.observers_.indexOf(t) || this.observers_.push(t), this.connected_ || this.connect_();
    }, e.prototype.removeObserver = function(t) {
      var n = this.observers_, r = n.indexOf(t);
      ~r && n.splice(r, 1), !n.length && this.connected_ && this.disconnect_();
    }, e.prototype.refresh = function() {
      var t = this.updateObservers_();
      t && this.refresh();
    }, e.prototype.updateObservers_ = function() {
      var t = this.observers_.filter(function(n) {
        return n.gatherActive(), n.hasActive();
      });
      return t.forEach(function(n) {
        return n.broadcastActive();
      }), t.length > 0;
    }, e.prototype.connect_ = function() {
      !ys || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), T6 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
    }, e.prototype.disconnect_ = function() {
      !ys || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
    }, e.prototype.onTransitionEnd_ = function(t) {
      var n = t.propertyName, r = n === void 0 ? "" : n, i = A6.some(function(a) {
        return !!~r.indexOf(a);
      });
      i && this.refresh();
    }, e.getInstance = function() {
      return this.instance_ || (this.instance_ = new e()), this.instance_;
    }, e.instance_ = null, e;
  }()
), Td = function(e, t) {
  for (var n = 0, r = Object.keys(t); n < r.length; n++) {
    var i = r[n];
    Object.defineProperty(e, i, {
      value: t[i],
      enumerable: !1,
      writable: !1,
      configurable: !0
    });
  }
  return e;
}, lr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || ba;
}, Rd = qa(0, 0, 0, 0);
function wa(e) {
  return parseFloat(e) || 0;
}
function su(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var a = e["border-" + i + "-width"];
    return r + wa(a);
  }, 0);
}
function M6(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], o = e["padding-" + a];
    n[a] = wa(o);
  }
  return n;
}
function I6(e) {
  var t = e.getBBox();
  return qa(0, 0, t.width, t.height);
}
function L6(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return Rd;
  var r = lr(e).getComputedStyle(e), i = M6(r), a = i.left + i.right, o = i.top + i.bottom, s = wa(r.width), c = wa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= su(r, "left", "right") + a), Math.round(c + o) !== n && (c -= su(r, "top", "bottom") + o)), !V6(e)) {
    var u = Math.round(s + a) - t, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return qa(i.left, i.top, s, c);
}
var D6 = /* @__PURE__ */ function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof lr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof lr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function V6(e) {
  return e === lr(e).document.documentElement;
}
function j6(e) {
  return ys ? D6(e) ? I6(e) : L6(e) : Rd;
}
function B6(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return Td(o, {
    x: t,
    y: n,
    width: r,
    height: i,
    top: n,
    right: t + r,
    bottom: i + n,
    left: t
  }), o;
}
function qa(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var W6 = (
  /** @class */
  function() {
    function e(t) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = qa(0, 0, 0, 0), this.target = t;
    }
    return e.prototype.isActive = function() {
      var t = j6(this.target);
      return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
    }, e.prototype.broadcastRect = function() {
      var t = this.contentRect_;
      return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
    }, e;
  }()
), Z6 = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t, n) {
      var r = B6(n);
      Td(this, { target: t, contentRect: r });
    }
    return e;
  }()
), H6 = (
  /** @class */
  function() {
    function e(t, n, r) {
      if (this.activeObservations_ = [], this.observations_ = new Ad(), typeof t != "function")
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
    }
    return e.prototype.observe = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof lr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) || (n.set(t, new W6(t)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, e.prototype.unobserve = function(t) {
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      if (!(typeof Element > "u" || !(Element instanceof Object))) {
        if (!(t instanceof lr(t).Element))
          throw new TypeError('parameter 1 is not of type "Element".');
        var n = this.observations_;
        n.has(t) && (n.delete(t), n.size || this.controller_.removeObserver(this));
      }
    }, e.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, e.prototype.gatherActive = function() {
      var t = this;
      this.clearActive(), this.observations_.forEach(function(n) {
        n.isActive() && t.activeObservations_.push(n);
      });
    }, e.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var t = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
          return new Z6(r.target, r.broadcastRect());
        });
        this.callback_.call(t, n, t), this.clearActive();
      }
    }, e.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, e.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, e;
  }()
), Md = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Ad(), Id = (
  /** @class */
  /* @__PURE__ */ function() {
    function e(t) {
      if (!(this instanceof e))
        throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length)
        throw new TypeError("1 argument required, but only 0 present.");
      var n = R6.getInstance(), r = new H6(t, n, this);
      Md.set(this, r);
    }
    return e;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Id.prototype[e] = function() {
    var t;
    return (t = Md.get(this))[e].apply(t, arguments);
  };
});
var z6 = function() {
  return typeof ba.ResizeObserver < "u" ? ba.ResizeObserver : Id;
}(), U6 = Cd(sl);
const q6 = U6;
var K6 = gl ? q6 : yl;
const G6 = K6;
function bs(e) {
  var t = Ot(h6(function() {
    var i = sn(e);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = t[0], r = t[1];
  return G6(function() {
    var i = sn(e);
    if (i) {
      var a = new z6(function(o) {
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
  }, [], e), n;
}
function Ka(e, t) {
  var n;
  _i && (wr(e) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof e)));
  var r = Wa(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = ee(function() {
    return s3(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, cl([], Ot(o), !1));
    }, i, t);
  }, []);
  return ki(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var Y6 = function(e, t) {
  var n = zt(e), r = j(null), i = He(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return Y(function() {
    if (!(!xp(t) || t < 0))
      return r.current = setTimeout(n, t), i;
  }, [t]), i;
};
const X6 = Y6, lu = 10;
function Q6(e, t) {
  return e > t && e > lu ? "horizontal" : t > e && t > lu ? "vertical" : "";
}
function J6() {
  const e = j(0), t = j(0), n = j(0), r = j(0), i = j(0), a = j(0), o = j(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const y = m.touches[0];
      n.current = y.clientX < 0 ? 0 : y.clientX - e.current, r.current = y.clientY - t.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = Q6(i.current, a.current));
    },
    start: (m) => {
      u(), e.current = m.touches[0].clientX, t.current = m.touches[0].clientY;
    },
    reset: u,
    startX: e,
    startY: t,
    deltaX: n,
    deltaY: r,
    offsetX: i,
    offsetY: a,
    direction: o,
    isVertical: s,
    isHorizontal: c
  };
}
const e7 = gr ? window : void 0, t7 = ["scroll", "auto", "overlay"];
function n7(e) {
  return e.nodeType === 1;
}
function Ea(e, t = e7) {
  let n = e;
  for (; n && n !== t && n7(n); ) {
    if (n === document.body)
      return t;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (t7.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return t;
}
let Rn = !1;
if (gr)
  try {
    const e = {};
    Object.defineProperty(e, "passive", {
      get() {
        Rn = !0;
      }
    }), window.addEventListener("test-passive", null, e);
  } catch {
  }
let Lr = 0;
const cu = "adm-overflow-hidden";
function r7(e) {
  let t = e == null ? void 0 : e.parentElement;
  for (; t; ) {
    if (t.clientHeight < t.scrollHeight)
      return t;
    t = t.parentElement;
  }
  return null;
}
function Ga(e, t) {
  const n = J6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = Ea(o.target, e.current);
    if (!c)
      return;
    if (t === "strict") {
      const v = r7(o.target);
      if (v === document.body || v === document.documentElement) {
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
    let y = "11";
    d === 0 ? y = f >= u ? "00" : "01" : u <= Math.round(m + d) && (y = "10"), y !== "11" && n.isVertical() && !(parseInt(y, 2) & parseInt(s, 2)) && o.cancelable && Rn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Rn ? {
      passive: !1
    } : !1), Lr || document.body.classList.add(cu), Lr++;
  }, a = () => {
    Lr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Lr--, Lr || document.body.classList.remove(cu));
  };
  Y(() => {
    if (t)
      return i(), () => {
        a();
      };
  }, [t]);
}
let Cl = Si();
const X = (e) => Oi(e, Cl);
let xl = Si();
X.write = (e) => Oi(e, xl);
let Ya = Si();
X.onStart = (e) => Oi(e, Ya);
let $l = Si();
X.onFrame = (e) => Oi(e, $l);
let _l = Si();
X.onFinish = (e) => Oi(e, _l);
let ir = [];
X.setTimeout = (e, t) => {
  let n = X.now() + t, r = () => {
    let a = ir.findIndex((o) => o.cancel == r);
    ~a && ir.splice(a, 1), rn -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: e,
    cancel: r
  };
  return ir.splice(Ld(n), 0, i), rn += 1, Dd(), i;
};
let Ld = (e) => ~(~ir.findIndex((t) => t.time > e) || ~ir.length);
X.cancel = (e) => {
  Ya.delete(e), $l.delete(e), _l.delete(e), Cl.delete(e), xl.delete(e);
};
X.sync = (e) => {
  ws = !0, X.batchedUpdates(e), ws = !1;
};
X.throttle = (e) => {
  let t;
  function n() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function r(...i) {
    t = i, X.onStart(n);
  }
  return r.handler = e, r.cancel = () => {
    Ya.delete(n), t = null;
  }, r;
};
let kl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
X.use = (e) => kl = e;
X.now = typeof performance < "u" ? () => performance.now() : Date.now;
X.batchedUpdates = (e) => e();
X.catch = console.error;
X.frameLoop = "always";
X.advance = () => {
  X.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : jd();
};
let nn = -1, rn = 0, ws = !1;
function Oi(e, t) {
  ws ? (t.delete(e), e(0)) : (t.add(e), Dd());
}
function Dd() {
  nn < 0 && (nn = 0, X.frameLoop !== "demand" && kl(Vd));
}
function i7() {
  nn = -1;
}
function Vd() {
  ~nn && (kl(Vd), X.batchedUpdates(jd));
}
function jd() {
  let e = nn;
  nn = X.now();
  let t = Ld(nn);
  if (t && (Bd(ir.splice(0, t), (n) => n.handler()), rn -= t), !rn) {
    i7();
    return;
  }
  Ya.flush(), Cl.flush(e ? Math.min(64, nn - e) : 16.667), $l.flush(), xl.flush(), _l.flush();
}
function Si() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(n) {
      rn += t == e && !e.has(n) ? 1 : 0, e.add(n);
    },
    delete(n) {
      return rn -= t == e && e.has(n) ? 1 : 0, e.delete(n);
    },
    flush(n) {
      t.size && (e = /* @__PURE__ */ new Set(), rn -= t.size, Bd(t, (r) => r(n) && e.add(r)), rn += e.size, t = e);
    }
  };
}
function Bd(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      X.catch(r);
    }
  });
}
function Es() {
}
const a7 = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), z = {
  arr: Array.isArray,
  obj: (e) => !!e && e.constructor.name === "Object",
  fun: (e) => typeof e == "function",
  str: (e) => typeof e == "string",
  num: (e) => typeof e == "number",
  und: (e) => e === void 0
};
function Dt(e, t) {
  if (z.arr(e)) {
    if (!z.arr(t) || e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }
  return e === t;
}
const J = (e, t) => e.forEach(t);
function St(e, t, n) {
  if (z.arr(e)) {
    for (let r = 0; r < e.length; r++)
      t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e)
    e.hasOwnProperty(r) && t.call(n, e[r], r);
}
const Ge = (e) => z.und(e) ? [] : z.arr(e) ? e : [e];
function ni(e, t) {
  if (e.size) {
    const n = Array.from(e);
    e.clear(), J(n, t);
  }
}
const Jr = (e, ...t) => ni(e, (n) => n(...t)), Ol = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Sl, Wd, on = null, Zd = !1, Fl = Es;
const o7 = (e) => {
  e.to && (Wd = e.to), e.now && (X.now = e.now), e.colors !== void 0 && (on = e.colors), e.skipAnimation != null && (Zd = e.skipAnimation), e.createStringInterpolator && (Sl = e.createStringInterpolator), e.requestAnimationFrame && X.use(e.requestAnimationFrame), e.batchedUpdates && (X.batchedUpdates = e.batchedUpdates), e.willAdvance && (Fl = e.willAdvance), e.frameLoop && (X.frameLoop = e.frameLoop);
};
var ot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Sl;
  },
  get to() {
    return Wd;
  },
  get colors() {
    return on;
  },
  get skipAnimation() {
    return Zd;
  },
  get willAdvance() {
    return Fl;
  },
  assign: o7
});
const ri = /* @__PURE__ */ new Set();
let it = [], Wo = [], Ca = 0;
const Xa = {
  get idle() {
    return !ri.size && !it.length;
  },
  start(e) {
    Ca > e.priority ? (ri.add(e), X.onStart(s7)) : (Hd(e), X(Cs));
  },
  advance: Cs,
  sort(e) {
    if (Ca)
      X.onFrame(() => Xa.sort(e));
    else {
      const t = it.indexOf(e);
      ~t && (it.splice(t, 1), zd(e));
    }
  },
  clear() {
    it = [], ri.clear();
  }
};
function s7() {
  ri.forEach(Hd), ri.clear(), X(Cs);
}
function Hd(e) {
  it.includes(e) || zd(e);
}
function zd(e) {
  it.splice(l7(it, (t) => t.priority > e.priority), 0, e);
}
function Cs(e) {
  const t = Wo;
  for (let n = 0; n < it.length; n++) {
    const r = it[n];
    Ca = r.priority, r.idle || (Fl(r), r.advance(e), r.idle || t.push(r));
  }
  return Ca = 0, Wo = it, Wo.length = 0, it = t, it.length > 0;
}
function l7(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
const c7 = (e, t, n) => Math.min(Math.max(n, e), t), u7 = {
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
}, gt = "[-+]?\\d*\\.?\\d+", xa = gt + "%";
function Qa(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const f7 = new RegExp("rgb" + Qa(gt, gt, gt)), d7 = new RegExp("rgba" + Qa(gt, gt, gt, gt)), m7 = new RegExp("hsl" + Qa(gt, xa, xa)), h7 = new RegExp("hsla" + Qa(gt, xa, xa, gt)), v7 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, p7 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, g7 = /^#([0-9a-fA-F]{6})$/, y7 = /^#([0-9a-fA-F]{8})$/;
function b7(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = g7.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : on && on[e] !== void 0 ? on[e] : (t = f7.exec(e)) ? (Zn(t[1]) << 24 | Zn(t[2]) << 16 | Zn(t[3]) << 8 | 255) >>> 0 : (t = d7.exec(e)) ? (Zn(t[1]) << 24 | Zn(t[2]) << 16 | Zn(t[3]) << 8 | du(t[4])) >>> 0 : (t = v7.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = y7.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = p7.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = m7.exec(e)) ? (uu(fu(t[1]), Hi(t[2]), Hi(t[3])) | 255) >>> 0 : (t = h7.exec(e)) ? (uu(fu(t[1]), Hi(t[2]), Hi(t[3])) | du(t[4])) >>> 0 : null;
}
function Zo(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function uu(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = Zo(i, r, e + 1 / 3), o = Zo(i, r, e), s = Zo(i, r, e - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(s * 255) << 8;
}
function Zn(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function fu(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function du(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function Hi(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function mu(e) {
  let t = b7(e);
  if (t === null)
    return e;
  t = t || 0;
  let n = (t & 4278190080) >>> 24, r = (t & 16711680) >>> 16, i = (t & 65280) >>> 8, a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const ci = (e, t, n) => {
  if (z.fun(e))
    return e;
  if (z.arr(e))
    return ci({
      range: e,
      output: t,
      extrapolate: n
    });
  if (z.str(e.output[0]))
    return Sl(e);
  const r = e, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = E7(u, a);
    return w7(u, a[f], a[f + 1], i[f], i[f + 1], c, o, s, r.map);
  };
};
function w7(e, t, n, r, i, a, o, s, c) {
  let u = c ? c(e) : e;
  if (u < t) {
    if (o === "identity")
      return u;
    o === "clamp" && (u = t);
  }
  if (u > n) {
    if (s === "identity")
      return u;
    s === "clamp" && (u = n);
  }
  return r === i ? r : t === n ? e <= t ? r : i : (t === -1 / 0 ? u = -u : n === 1 / 0 ? u = u - t : u = (u - t) / (n - t), u = a(u), r === -1 / 0 ? u = -u : i === 1 / 0 ? u = u + r : u = u * (i - r) + r, u);
}
function E7(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
    ;
  return n - 1;
}
const C7 = (e, t = "end") => (n) => {
  n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * e, i = t === "end" ? Math.floor(r) : Math.ceil(r);
  return c7(0, 1, i / e);
}, $a = 1.70158, zi = $a * 1.525, hu = $a + 1, vu = 2 * Math.PI / 3, pu = 2 * Math.PI / 4.5, Ui = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, x7 = {
  linear: (e) => e,
  easeInQuad: (e) => e * e,
  easeOutQuad: (e) => 1 - (1 - e) * (1 - e),
  easeInOutQuad: (e) => e < 0.5 ? 2 * e * e : 1 - Math.pow(-2 * e + 2, 2) / 2,
  easeInCubic: (e) => e * e * e,
  easeOutCubic: (e) => 1 - Math.pow(1 - e, 3),
  easeInOutCubic: (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2,
  easeInQuart: (e) => e * e * e * e,
  easeOutQuart: (e) => 1 - Math.pow(1 - e, 4),
  easeInOutQuart: (e) => e < 0.5 ? 8 * e * e * e * e : 1 - Math.pow(-2 * e + 2, 4) / 2,
  easeInQuint: (e) => e * e * e * e * e,
  easeOutQuint: (e) => 1 - Math.pow(1 - e, 5),
  easeInOutQuint: (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 - Math.pow(-2 * e + 2, 5) / 2,
  easeInSine: (e) => 1 - Math.cos(e * Math.PI / 2),
  easeOutSine: (e) => Math.sin(e * Math.PI / 2),
  easeInOutSine: (e) => -(Math.cos(Math.PI * e) - 1) / 2,
  easeInExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * e - 10),
  easeOutExpo: (e) => e === 1 ? 1 : 1 - Math.pow(2, -10 * e),
  easeInOutExpo: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? Math.pow(2, 20 * e - 10) / 2 : (2 - Math.pow(2, -20 * e + 10)) / 2,
  easeInCirc: (e) => 1 - Math.sqrt(1 - Math.pow(e, 2)),
  easeOutCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)),
  easeInOutCirc: (e) => e < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * e, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * e + 2, 2)) + 1) / 2,
  easeInBack: (e) => hu * e * e * e - $a * e * e,
  easeOutBack: (e) => 1 + hu * Math.pow(e - 1, 3) + $a * Math.pow(e - 1, 2),
  easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((zi + 1) * 2 * e - zi) / 2 : (Math.pow(2 * e - 2, 2) * ((zi + 1) * (e * 2 - 2) + zi) + 2) / 2,
  easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * vu),
  easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * vu) + 1,
  easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * pu)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * pu) / 2 + 1,
  easeInBounce: (e) => 1 - Ui(1 - e),
  easeOutBounce: Ui,
  easeInOutBounce: (e) => e < 0.5 ? (1 - Ui(1 - 2 * e)) / 2 : (1 + Ui(2 * e - 1)) / 2,
  steps: C7
};
function xs() {
  return xs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, xs.apply(this, arguments);
}
const cr = Symbol.for("FluidValue.get"), Mn = Symbol.for("FluidValue.observers"), nt = (e) => !!(e && e[cr]), We = (e) => e && e[cr] ? e[cr]() : e, gu = (e) => e[Mn] || null;
function $7(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function ui(e, t) {
  let n = e[Mn];
  n && n.forEach((r) => {
    $7(r, t);
  });
}
class Ud {
  constructor(t) {
    if (this[cr] = void 0, this[Mn] = void 0, !t && !(t = this.get))
      throw Error("Unknown getter");
    _7(this, t);
  }
}
const _7 = (e, t) => qd(e, cr, t);
function kr(e, t) {
  if (e[cr]) {
    let n = e[Mn];
    n || qd(e, Mn, n = /* @__PURE__ */ new Set()), n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
  }
  return t;
}
function fi(e, t) {
  let n = e[Mn];
  if (n && n.has(t)) {
    const r = n.size - 1;
    r ? n.delete(t) : e[Mn] = null, e.observerRemoved && e.observerRemoved(r, t);
  }
}
const qd = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), la = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, k7 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, yu = new RegExp(`(${la.source})(%|[a-z]+)`, "i"), O7 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ja = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Kd = (e) => {
  const [t, n] = S7(e);
  if (!t || Ol())
    return e;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || e;
  } else {
    if (n && Ja.test(n))
      return Kd(n);
    if (n)
      return n;
  }
  return e;
}, S7 = (e) => {
  const t = Ja.exec(e);
  if (!t)
    return [,];
  const [, n, r] = t;
  return [n, r];
};
let Ho;
const F7 = (e, t, n, r, i) => `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Gd = (e) => {
  Ho || (Ho = on ? new RegExp(`(${Object.keys(on).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((a) => We(a).replace(Ja, Kd).replace(k7, mu).replace(Ho, mu)), n = t.map((a) => a.match(la).map(Number)), i = n[0].map((a, o) => n.map((s) => {
    if (!(o in s))
      throw Error('The arity of each "output" value must be equal');
    return s[o];
  })).map((a) => ci(xs({}, e, {
    output: a
  })));
  return (a) => {
    var o;
    const s = !yu.test(t[0]) && ((o = t.find((u) => yu.test(u))) == null ? void 0 : o.replace(la, ""));
    let c = 0;
    return t[0].replace(la, () => `${i[c++](a)}${s || ""}`).replace(O7, F7);
  };
}, Nl = "react-spring: ", Yd = (e) => {
  const t = e;
  let n = !1;
  if (typeof t != "function")
    throw new TypeError(`${Nl}once requires a function parameter`);
  return (...r) => {
    n || (t(...r), n = !0);
  };
}, N7 = Yd(console.warn);
function P7() {
  N7(`${Nl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const A7 = Yd(console.warn);
function T7() {
  A7(`${Nl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function eo(e) {
  return z.str(e) && (e[0] == "#" || /\d/.test(e) || !Ol() && Ja.test(e) || e in (on || {}));
}
const Pl = Ol() ? Y : sl, R7 = () => {
  const e = j(!1);
  return Pl(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function Xd() {
  const e = K()[1], t = R7();
  return () => {
    t.current && e(Math.random());
  };
}
function M7(e, t) {
  const [n] = K(() => ({
    inputs: t,
    result: e()
  })), r = j(), i = r.current;
  let a = i;
  return a ? t && a.inputs && I7(t, a.inputs) || (a = {
    inputs: t,
    result: e()
  }) : a = n, Y(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function I7(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Qd = (e) => Y(e, L7), L7 = [];
function bu(e) {
  const t = j();
  return Y(() => {
    t.current = e;
  }), t.current;
}
const di = Symbol.for("Animated:node"), D7 = (e) => !!e && e[di] === e, _t = (e) => e && e[di], Al = (e, t) => a7(e, di, t), to = (e) => e && e[di] && e[di].getPayload();
class Jd {
  constructor() {
    this.payload = void 0, Al(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class Or extends Jd {
  constructor(t) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = t, z.num(this._value) && (this.lastPosition = this._value);
  }
  static create(t) {
    return new Or(t);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(t, n) {
    return z.num(t) && (this.lastPosition = t, n && (t = Math.round(t / n) * n, this.done && (this.lastPosition = t))), this._value === t ? !1 : (this._value = t, !0);
  }
  reset() {
    const {
      done: t
    } = this;
    this.done = !1, z.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, t && (this.lastVelocity = null), this.v0 = null);
  }
}
class ur extends Or {
  constructor(t) {
    super(0), this._string = null, this._toString = void 0, this._toString = ci({
      output: [t, t]
    });
  }
  static create(t) {
    return new ur(t);
  }
  getValue() {
    let t = this._string;
    return t ?? (this._string = this._toString(this._value));
  }
  setValue(t) {
    if (z.str(t)) {
      if (t == this._string)
        return !1;
      this._string = t, this._value = 1;
    } else if (super.setValue(t))
      this._string = null;
    else
      return !1;
    return !0;
  }
  reset(t) {
    t && (this._toString = ci({
      output: [this.getValue(), t]
    })), this._value = 0, super.reset();
  }
}
const _a = {
  dependencies: null
};
class no extends Jd {
  constructor(t) {
    super(), this.source = t, this.setValue(t);
  }
  getValue(t) {
    const n = {};
    return St(this.source, (r, i) => {
      D7(r) ? n[i] = r.getValue(t) : nt(r) ? n[i] = We(r) : t || (n[i] = r);
    }), n;
  }
  setValue(t) {
    this.source = t, this.payload = this._makePayload(t);
  }
  reset() {
    this.payload && J(this.payload, (t) => t.reset());
  }
  _makePayload(t) {
    if (t) {
      const n = /* @__PURE__ */ new Set();
      return St(t, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(t) {
    _a.dependencies && nt(t) && _a.dependencies.add(t);
    const n = to(t);
    n && J(n, (r) => this.add(r));
  }
}
class Tl extends no {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new Tl(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const n = this.getPayload();
    return t.length == n.length ? n.map((r, i) => r.setValue(t[i])).some(Boolean) : (super.setValue(t.map(V7)), !0);
  }
}
function V7(e) {
  return (eo(e) ? ur : Or).create(e);
}
function $s(e) {
  const t = _t(e);
  return t ? t.constructor : z.arr(e) ? Tl : eo(e) ? ur : Or;
}
function ka() {
  return ka = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ka.apply(this, arguments);
}
const wu = (e, t) => {
  const n = !z.fun(e) || e.prototype && e.prototype.isReactComponent;
  return fe((r, i) => {
    const a = j(null), o = n && He((v) => {
      a.current = W7(i, v);
    }, [i]), [s, c] = B7(r, t), u = Xd(), f = () => {
      const v = a.current;
      if (n && !v)
        return;
      (v ? t.applyAnimatedValues(v, s.getValue(!0)) : !1) === !1 && u();
    }, d = new j7(f, c), m = j();
    Pl(() => (m.current = d, J(c, (v) => kr(v, d)), () => {
      m.current && (J(m.current.deps, (v) => fi(v, m.current)), X.cancel(m.current.update));
    })), Y(f, []), Qd(() => () => {
      const v = m.current;
      J(v.deps, (p) => fi(p, v));
    });
    const y = t.getComponentProps(s.getValue());
    return V.createElement(e, ka({}, y, {
      ref: o
    }));
  });
};
class j7 {
  constructor(t, n) {
    this.update = t, this.deps = n;
  }
  eventObserved(t) {
    t.type == "change" && X.write(this.update);
  }
}
function B7(e, t) {
  const n = /* @__PURE__ */ new Set();
  return _a.dependencies = n, e.style && (e = ka({}, e, {
    style: t.createAnimatedStyle(e.style)
  })), e = new no(e), _a.dependencies = null, [e, n];
}
function W7(e, t) {
  return e && (z.fun(e) ? e(t) : e.current = t), t;
}
const Eu = Symbol.for("AnimatedComponent"), Z7 = (e, {
  applyAnimatedValues: t = () => !1,
  createAnimatedStyle: n = (i) => new no(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: t,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const s = Cu(o) || "Anonymous";
    return z.str(o) ? o = a[o] || (a[o] = wu(o, i)) : o = o[Eu] || (o[Eu] = wu(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return St(e, (o, s) => {
    z.arr(e) && (s = Cu(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, Cu = (e) => z.str(e) ? e : e && z.str(e.displayName) ? e.displayName : z.fun(e) && e.name || null;
function Ne() {
  return Ne = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ne.apply(this, arguments);
}
function On(e, ...t) {
  return z.fun(e) ? e(...t) : e;
}
const ii = (e, t) => e === !0 || !!(t && e && (z.fun(e) ? e(t) : Ge(e).includes(t))), e1 = (e, t) => z.obj(e) ? t && e[t] : e, t1 = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, H7 = (e) => e, Rl = (e, t = H7) => {
  let n = z7;
  e.default && e.default !== !0 && (e = e.default, n = Object.keys(e));
  const r = {};
  for (const i of n) {
    const a = t(e[i], i);
    z.und(a) || (r[i] = a);
  }
  return r;
}, z7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], U7 = {
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
function q7(e) {
  const t = {};
  let n = 0;
  if (St(e, (r, i) => {
    U7[i] || (t[i] = r, n++);
  }), n)
    return t;
}
function n1(e) {
  const t = q7(e);
  if (t) {
    const n = {
      to: t
    };
    return St(e, (r, i) => i in t || (n[i] = r)), n;
  }
  return Ne({}, e);
}
function mi(e) {
  return e = We(e), z.arr(e) ? e.map(mi) : eo(e) ? ot.createStringInterpolator({
    range: [0, 1],
    output: [e, e]
  })(1) : e;
}
function K7(e) {
  for (const t in e)
    return !0;
  return !1;
}
function _s(e) {
  return z.fun(e) || z.arr(e) && z.obj(e[0]);
}
function G7(e, t) {
  var n;
  (n = e.ref) == null || n.delete(e), t == null || t.delete(e);
}
function Y7(e, t) {
  if (t && e.ref !== t) {
    var n;
    (n = e.ref) == null || n.delete(e), t.add(e), e.ref = t;
  }
}
const X7 = {
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
}, ks = Ne({}, X7.default, {
  mass: 1,
  damping: 1,
  easing: x7.linear,
  clamp: !1
});
class Q7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, ks);
  }
}
function J7(e, t, n) {
  n && (n = Ne({}, n), xu(n, t), t = Ne({}, n, t)), xu(e, t), Object.assign(e, t);
  for (const o in ks)
    e[o] == null && (e[o] = ks[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = e;
  return z.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), e.tension = Math.pow(2 * Math.PI / i, 2) * r, e.friction = 4 * Math.PI * a * r / i), e;
}
function xu(e, t) {
  if (!z.und(t.decay))
    e.duration = void 0;
  else {
    const n = !z.und(t.tension) || !z.und(t.friction);
    (n || !z.und(t.frequency) || !z.und(t.damping) || !z.und(t.mass)) && (e.duration = void 0, e.decay = void 0), n && (e.frequency = void 0);
  }
}
const $u = [];
class ey {
  constructor() {
    this.changed = !1, this.values = $u, this.toValues = null, this.fromValues = $u, this.to = void 0, this.from = void 0, this.config = new Q7(), this.immediate = !1;
  }
}
function r1(e, {
  key: t,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, s) => {
    var c;
    let u, f, d = ii((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, t);
    if (d)
      v();
    else {
      z.und(n.pause) || (i.paused = ii(n.pause, t));
      let p = r == null ? void 0 : r.pause;
      p !== !0 && (p = i.paused || ii(p, t)), u = On(n.delay || 0, t), p ? (i.resumeQueue.add(y), a.pause()) : (a.resume(), y());
    }
    function m() {
      i.resumeQueue.add(y), i.timeouts.delete(f), f.cancel(), u = f.time - X.now();
    }
    function y() {
      u > 0 && !ot.skipAnimation ? (i.delayed = !0, f = X.setTimeout(v, u), i.pauseQueue.add(m), i.timeouts.add(f)) : v();
    }
    function v() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), e <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Ne({}, n, {
          callId: e,
          cancel: d
        }), o);
      } catch (p) {
        s(p);
      }
    }
  });
}
const Ml = (e, t) => t.length == 1 ? t[0] : t.some((n) => n.cancelled) ? ar(e.get()) : t.every((n) => n.noop) ? i1(e.get()) : vt(e.get(), t.every((n) => n.finished)), i1 = (e) => ({
  value: e,
  noop: !0,
  finished: !0,
  cancelled: !1
}), vt = (e, t, n = !1) => ({
  value: e,
  finished: t,
  cancelled: n
}), ar = (e) => ({
  value: e,
  cancelled: !0,
  finished: !1
});
function a1(e, t, n, r) {
  const {
    callId: i,
    parentId: a,
    onRest: o
  } = t, {
    asyncTo: s,
    promise: c
  } = n;
  return !a && e === s && !t.reset ? c : n.promise = (async () => {
    n.asyncId = i, n.asyncTo = e;
    const u = Rl(t, (b, g) => g === "onRest" ? void 0 : b);
    let f, d;
    const m = new Promise((b, g) => (f = b, d = g)), y = (b) => {
      const g = i <= (n.cancelId || 0) && ar(r) || i !== n.asyncId && vt(r, !1);
      if (g)
        throw b.result = g, d(b), b;
    }, v = (b, g) => {
      const C = new _u(), h = new ku();
      return (async () => {
        if (ot.skipAnimation)
          throw hi(n), h.result = vt(r, !1), d(h), h;
        y(C);
        const w = z.obj(b) ? Ne({}, b) : Ne({}, g, {
          to: b
        });
        w.parentId = i, St(u, (x, $) => {
          z.und(w[$]) && (w[$] = x);
        });
        const E = await r.start(w);
        return y(C), n.paused && await new Promise((x) => {
          n.resumeQueue.add(x);
        }), E;
      })();
    };
    let p;
    if (ot.skipAnimation)
      return hi(n), vt(r, !1);
    try {
      let b;
      z.arr(e) ? b = (async (g) => {
        for (const C of g)
          await v(C);
      })(e) : b = Promise.resolve(e(v, r.stop.bind(r))), await Promise.all([b.then(f), m]), p = vt(r.get(), !0, !1);
    } catch (b) {
      if (b instanceof _u)
        p = b.result;
      else if (b instanceof ku)
        p = b.result;
      else
        throw b;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? s : void 0, n.promise = a ? c : void 0);
    }
    return z.fun(o) && X.batchedUpdates(() => {
      o(p, r, r.item);
    }), p;
  })();
}
function hi(e, t) {
  ni(e.timeouts, (n) => n.cancel()), e.pauseQueue.clear(), e.resumeQueue.clear(), e.asyncId = e.asyncTo = e.promise = void 0, t && (e.cancelId = t);
}
class _u extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class ku extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const Os = (e) => e instanceof Il;
let ty = 1;
class Il extends Ud {
  constructor(...t) {
    super(...t), this.id = ty++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(t) {
    this._priority != t && (this._priority = t, this._onPriorityChange(t));
  }
  get() {
    const t = _t(this);
    return t && t.getValue();
  }
  to(...t) {
    return ot.to(this, t);
  }
  interpolate(...t) {
    return P7(), ot.to(this, t);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(t) {
    t == 1 && this._attach();
  }
  observerRemoved(t) {
    t == 0 && this._detach();
  }
  _attach() {
  }
  _detach() {
  }
  _onChange(t, n = !1) {
    ui(this, {
      type: "change",
      parent: this,
      value: t,
      idle: n
    });
  }
  _onPriorityChange(t) {
    this.idle || Xa.sort(this), ui(this, {
      type: "priority",
      parent: this,
      priority: t
    });
  }
}
const In = Symbol.for("SpringPhase"), o1 = 1, Ss = 2, Fs = 4, zo = (e) => (e[In] & o1) > 0, qt = (e) => (e[In] & Ss) > 0, Dr = (e) => (e[In] & Fs) > 0, Ou = (e, t) => t ? e[In] |= Ss | o1 : e[In] &= ~Ss, Su = (e, t) => t ? e[In] |= Fs : e[In] &= ~Fs;
class ny extends Il {
  constructor(t, n) {
    if (super(), this.key = void 0, this.animation = new ey(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !z.und(t) || !z.und(n)) {
      const r = z.obj(t) ? Ne({}, t) : Ne({}, n, {
        from: t
      });
      z.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(qt(this) || this._state.asyncTo) || Dr(this);
  }
  get goal() {
    return We(this.animation.to);
  }
  get velocity() {
    const t = _t(this);
    return t instanceof Or ? t.lastVelocity || 0 : t.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return zo(this);
  }
  get isAnimating() {
    return qt(this);
  }
  get isPaused() {
    return Dr(this);
  }
  get isDelayed() {
    return this._state.delayed;
  }
  advance(t) {
    let n = !0, r = !1;
    const i = this.animation;
    let {
      config: a,
      toValues: o
    } = i;
    const s = to(i.to);
    !s && nt(i.to) && (o = Ge(We(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == ur ? 1 : s ? s[d].lastPosition : o[d];
      let y = i.immediate, v = m;
      if (!y) {
        if (v = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let p = f.elapsedTime += t;
        const b = i.fromValues[d], g = f.v0 != null ? f.v0 : f.v0 = z.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let C;
        const h = a.precision || (b == m ? 5e-3 : Math.min(1, Math.abs(m - b) * 1e-3));
        if (z.und(a.duration))
          if (a.decay) {
            const w = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - w) * p);
            v = b + g / (1 - w) * (1 - E), y = Math.abs(f.lastPosition - v) <= h, C = g * E;
          } else {
            C = f.lastVelocity == null ? g : f.lastVelocity;
            const w = a.restVelocity || h / 10, E = a.clamp ? 0 : a.bounce, x = !z.und(E), $ = b == m ? f.v0 > 0 : b < m;
            let P, S = !1;
            const k = 1, D = Math.ceil(t / k);
            for (let I = 0; I < D && (P = Math.abs(C) > w, !(!P && (y = Math.abs(m - v) <= h, y))); ++I) {
              x && (S = v == m || v > m == $, S && (C = -C * E, v = m));
              const T = -a.tension * 1e-6 * (v - m), _ = -a.friction * 1e-3 * C, R = (T + _) / a.mass;
              C = C + R * k, v = v + C * k;
            }
          }
        else {
          let w = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, p = f.elapsedTime += t)), w = (a.progress || 0) + p / this._memoizedDuration, w = w > 1 ? 1 : w < 0 ? 0 : w, f.durationProgress = w), v = b + a.easing(w) * (m - b), C = (v - f.lastPosition) / t, y = w == 1;
        }
        f.lastVelocity = C, Number.isNaN(v) && (console.warn("Got NaN while animating:", this), y = !0);
      }
      s && !s[d].done && (y = !1), y ? f.done = !0 : n = !1, f.setValue(v, a.round) && (r = !0);
    });
    const c = _t(this), u = c.getValue();
    if (n) {
      const f = We(i.to);
      (u !== f || r) && !a.decay ? (c.setValue(f), this._onChange(f)) : r && a.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(t) {
    return X.batchedUpdates(() => {
      this._stop(), this._focus(t), this._set(t);
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
    if (qt(this)) {
      const {
        to: t,
        config: n
      } = this.animation;
      X.batchedUpdates(() => {
        this._onStart(), n.decay || this._set(t, !1), this._stop();
      });
    }
    return this;
  }
  update(t) {
    return (this.queue || (this.queue = [])).push(t), this;
  }
  start(t, n) {
    let r;
    return z.und(t) ? (r = this.queue || [], this.queue = []) : r = [z.obj(t) ? t : Ne({}, n, {
      to: t
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Ml(this, i));
  }
  stop(t) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), hi(this._state, t && this._lastCallId), X.batchedUpdates(() => this._stop(n, t)), this;
  }
  reset() {
    this._update({
      reset: !0
    });
  }
  eventObserved(t) {
    t.type == "change" ? this._start() : t.type == "priority" && (this.priority = t.priority + 1);
  }
  _prepareNode(t) {
    const n = this.key || "";
    let {
      to: r,
      from: i
    } = t;
    r = z.obj(r) ? r[n] : r, (r == null || _s(r)) && (r = void 0), i = z.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return zo(this) || (t.reverse && ([r, i] = [i, r]), i = We(i), z.und(i) ? _t(this) || this._set(r) : this._set(i)), a;
  }
  _update(t, n) {
    let r = Ne({}, t);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, Rl(r, (c, u) => /^on/.test(u) ? e1(c, i) : c)), Nu(this, r, "onProps"), jr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return r1(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Dr(this) || (Su(this, !0), Jr(s.pauseQueue), jr(this, "onPause", vt(this, Vr(this, this.animation.to)), this));
        },
        resume: () => {
          Dr(this) && (Su(this, !1), qt(this) && this._resume(), Jr(s.resumeQueue), jr(this, "onResume", vt(this, Vr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = s1(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(t, n, r) {
    if (n.cancel)
      return this.stop(!0), r(ar(this));
    const i = !z.und(t.to), a = !z.und(t.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(ar(this));
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
    } = t;
    a && !i && (!n.default || z.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const y = !Dt(m, f);
    y && (c.from = m), m = We(m);
    const v = !Dt(d, u);
    v && this._focus(d);
    const p = _s(n.to), {
      config: b
    } = c, {
      decay: g,
      velocity: C
    } = b;
    (i || a) && (b.velocity = 0), n.config && !p && J7(b, On(n.config, o), n.config !== s.config ? On(s.config, o) : void 0);
    let h = _t(this);
    if (!h || z.und(d))
      return r(vt(this, !0));
    const w = z.und(n.reset) ? a && !n.default : !z.und(m) && ii(n.reset, o), E = w ? m : this.get(), x = mi(d), $ = z.num(x) || z.arr(x) || eo(x), P = !p && (!$ || ii(s.immediate || n.immediate, o));
    if (v) {
      const I = $s(d);
      if (I !== h.constructor)
        if (P)
          h = this._set(x);
        else
          throw Error(`Cannot animate between ${h.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const S = h.constructor;
    let k = nt(d), D = !1;
    if (!k) {
      const I = w || !zo(this) && y;
      (v || I) && (D = Dt(mi(E), x), k = !D), (!Dt(c.immediate, P) && !P || !Dt(b.decay, g) || !Dt(b.velocity, C)) && (k = !0);
    }
    if (D && qt(this) && (c.changed && !w ? k = !0 : k || this._stop(u)), !p && ((k || nt(u)) && (c.values = h.getPayload(), c.toValues = nt(d) ? null : S == ur ? [1] : Ge(x)), c.immediate != P && (c.immediate = P, !P && !w && this._set(u)), k)) {
      const {
        onRest: I
      } = c;
      J(iy, (_) => Nu(this, n, _));
      const T = vt(this, Vr(this, u));
      Jr(this._pendingCalls, T), this._pendingCalls.add(r), c.changed && X.batchedUpdates(() => {
        c.changed = !w, I == null || I(T, this), w ? On(s.onRest, T) : c.onStart == null || c.onStart(T, this);
      });
    }
    w && this._set(E), p ? r(a1(n.to, n, this._state, this)) : k ? this._start() : qt(this) && !v ? this._pendingCalls.add(r) : r(i1(E));
  }
  _focus(t) {
    const n = this.animation;
    t !== n.to && (gu(this) && this._detach(), n.to = t, gu(this) && this._attach());
  }
  _attach() {
    let t = 0;
    const {
      to: n
    } = this.animation;
    nt(n) && (kr(n, this), Os(n) && (t = n.priority + 1)), this.priority = t;
  }
  _detach() {
    const {
      to: t
    } = this.animation;
    nt(t) && fi(t, this);
  }
  _set(t, n = !0) {
    const r = We(t);
    if (!z.und(r)) {
      const i = _t(this);
      if (!i || !Dt(r, i.getValue())) {
        const a = $s(r);
        !i || i.constructor != a ? Al(this, a.create(r)) : i.setValue(r), i && X.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return _t(this);
  }
  _onStart() {
    const t = this.animation;
    t.changed || (t.changed = !0, jr(this, "onStart", vt(this, Vr(this, t.to)), this));
  }
  _onChange(t, n) {
    n || (this._onStart(), On(this.animation.onChange, t, this)), On(this.defaultProps.onChange, t, this), super._onChange(t, n);
  }
  _start() {
    const t = this.animation;
    _t(this).reset(We(t.to)), t.immediate || (t.fromValues = t.values.map((n) => n.lastPosition)), qt(this) || (Ou(this, !0), Dr(this) || this._resume());
  }
  _resume() {
    ot.skipAnimation ? this.finish() : Xa.start(this);
  }
  _stop(t, n) {
    if (qt(this)) {
      Ou(this, !1);
      const r = this.animation;
      J(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), ui(this, {
        type: "idle",
        parent: this
      });
      const i = n ? ar(this.get()) : vt(this.get(), Vr(this, t ?? r.to));
      Jr(this._pendingCalls, i), r.changed && (r.changed = !1, jr(this, "onRest", i, this));
    }
  }
}
function Vr(e, t) {
  const n = mi(t), r = mi(e.get());
  return Dt(r, n);
}
function s1(e, t = e.loop, n = e.to) {
  let r = On(t);
  if (r) {
    const i = r !== !0 && n1(r), a = (i || e).reverse, o = !i || i.reset;
    return vi(Ne({}, e, {
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || _s(n) ? n : void 0,
      from: o ? e.from : void 0,
      reset: o
    }, i));
  }
}
function vi(e) {
  const {
    to: t,
    from: n
  } = e = n1(e), r = /* @__PURE__ */ new Set();
  return z.obj(t) && Fu(t, r), z.obj(n) && Fu(n, r), e.keys = r.size ? Array.from(r) : null, e;
}
function ry(e) {
  const t = vi(e);
  return z.und(t.default) && (t.default = Rl(t)), t;
}
function Fu(e, t) {
  St(e, (n, r) => n != null && t.add(r));
}
const iy = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Nu(e, t, n) {
  e.animation[n] = t[n] !== t1(t, n) ? e1(t[n], e.key) : void 0;
}
function jr(e, t, ...n) {
  var r, i, a, o;
  (r = (i = e.animation)[t]) == null || r.call(i, ...n), (a = (o = e.defaultProps)[t]) == null || a.call(o, ...n);
}
const ay = ["onStart", "onChange", "onRest"];
let oy = 1, sy = class {
  constructor(t, n) {
    this.id = oy++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), t && this.start(Ne({
      default: !0
    }, t));
  }
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((t) => t.idle && !t.isDelayed && !t.isPaused);
  }
  get item() {
    return this._item;
  }
  set item(t) {
    this._item = t;
  }
  get() {
    const t = {};
    return this.each((n, r) => t[r] = n.get()), t;
  }
  set(t) {
    for (const n in t) {
      const r = t[n];
      z.und(r) || this.springs[n].set(r);
    }
  }
  update(t) {
    return t && this.queue.push(vi(t)), this;
  }
  start(t) {
    let {
      queue: n
    } = this;
    return t ? n = Ge(t).map(vi) : this.queue = [], this._flush ? this._flush(this, n) : (d1(this, n), Ns(this, n));
  }
  stop(t, n) {
    if (t !== !!t && (n = t), n) {
      const r = this.springs;
      J(Ge(n), (i) => r[i].stop(!!t));
    } else
      hi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!t));
    return this;
  }
  pause(t) {
    if (z.und(t))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      J(Ge(t), (r) => n[r].pause());
    }
    return this;
  }
  resume(t) {
    if (z.und(t))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      J(Ge(t), (r) => n[r].resume());
    }
    return this;
  }
  each(t) {
    St(this.springs, t);
  }
  _onFrame() {
    const {
      onStart: t,
      onChange: n,
      onRest: r
    } = this._events, i = this._active.size > 0, a = this._changed.size > 0;
    (i && !this._started || a && !this._started) && (this._started = !0, ni(t, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, s = a || o && r.size ? this.get() : null;
    a && n.size && ni(n, ([c, u]) => {
      u.value = s, c(u, this, this._item);
    }), o && (this._started = !1, ni(r, ([c, u]) => {
      u.value = s, c(u, this, this._item);
    }));
  }
  eventObserved(t) {
    if (t.type == "change")
      this._changed.add(t.parent), t.idle || this._active.add(t.parent);
    else if (t.type == "idle")
      this._active.delete(t.parent);
    else
      return;
    X.onFrame(this._onFrame);
  }
};
function Ns(e, t) {
  return Promise.all(t.map((n) => l1(e, n))).then((n) => Ml(e, n));
}
async function l1(e, t, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = t, u = z.obj(t.default) && t.default;
  o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null);
  const f = z.arr(i) || z.fun(i) ? i : void 0;
  f ? (t.to = void 0, t.onRest = void 0, u && (u.onRest = void 0)) : J(ay, (p) => {
    const b = t[p];
    if (z.fun(b)) {
      const g = e._events[p];
      t[p] = ({
        finished: C,
        cancelled: h
      }) => {
        const w = g.get(b);
        w ? (C || (w.finished = !1), h && (w.cancelled = !0)) : g.set(b, {
          value: null,
          finished: C || !1,
          cancelled: h || !1
        });
      }, u && (u[p] = t[p]);
    }
  });
  const d = e._state;
  t.pause === !d.paused ? (d.paused = t.pause, Jr(t.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (t.pause = !0);
  const m = (r || Object.keys(e.springs)).map((p) => e.springs[p].start(t)), y = t.cancel === !0 || t1(t, "cancel") === !0;
  (f || y && d.asyncId) && m.push(r1(++e._lastAsyncId, {
    props: t,
    state: d,
    actions: {
      pause: Es,
      resume: Es,
      start(p, b) {
        y ? (hi(d, e._lastAsyncId), b(ar(e))) : (p.onRest = s, b(a1(f, p, d, e)));
      }
    }
  })), d.paused && await new Promise((p) => {
    d.resumeQueue.add(p);
  });
  const v = Ml(e, await Promise.all(m));
  if (o && v.finished && !(n && v.noop)) {
    const p = s1(t, o, i);
    if (p)
      return d1(e, [p]), l1(e, p, !0);
  }
  return c && X.batchedUpdates(() => c(v, e, e.item)), v;
}
function Pu(e, t) {
  const n = Ne({}, e.springs);
  return t && J(Ge(t), (r) => {
    z.und(r.keys) && (r = vi(r)), z.obj(r.to) || (r = Ne({}, r, {
      to: void 0
    })), f1(n, r, (i) => u1(i));
  }), c1(e, n), n;
}
function c1(e, t) {
  St(t, (n, r) => {
    e.springs[r] || (e.springs[r] = n, kr(n, e));
  });
}
function u1(e, t) {
  const n = new ny();
  return n.key = e, t && kr(n, t), n;
}
function f1(e, t, n) {
  t.keys && J(t.keys, (r) => {
    (e[r] || (e[r] = n(r)))._prepareNode(t);
  });
}
function d1(e, t) {
  J(t, (n) => {
    f1(e.springs, n, (r) => u1(r, e));
  });
}
function ly(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const cy = ["children"], ro = (e) => {
  let {
    children: t
  } = e, n = ly(e, cy);
  const r = at(Oa), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = M7(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = Oa;
  return V.createElement(o, {
    value: n
  }, t);
}, Oa = uy(ro, {});
ro.Provider = Oa.Provider;
ro.Consumer = Oa.Consumer;
function uy(e, t) {
  return Object.assign(e, V.createContext(t)), e.Provider._context = e, e.Consumer._context = e, e;
}
const fy = () => {
  const e = [], t = function(i) {
    T7();
    const a = [];
    return J(e, (o, s) => {
      if (z.und(i))
        a.push(o.start());
      else {
        const c = n(i, o, s);
        c && a.push(o.start(c));
      }
    }), a;
  };
  t.current = e, t.add = function(r) {
    e.includes(r) || e.push(r);
  }, t.delete = function(r) {
    const i = e.indexOf(r);
    ~i && e.splice(i, 1);
  }, t.pause = function() {
    return J(e, (r) => r.pause(...arguments)), this;
  }, t.resume = function() {
    return J(e, (r) => r.resume(...arguments)), this;
  }, t.set = function(r) {
    J(e, (i) => i.set(r));
  }, t.start = function(r) {
    const i = [];
    return J(e, (a, o) => {
      if (z.und(r))
        i.push(a.start());
      else {
        const s = this._getProps(r, a, o);
        s && i.push(a.start(s));
      }
    }), i;
  }, t.stop = function() {
    return J(e, (r) => r.stop(...arguments)), this;
  }, t.update = function(r) {
    return J(e, (i, a) => i.update(this._getProps(r, i, a))), this;
  };
  const n = function(i, a, o) {
    return z.fun(i) ? i(o, a) : i;
  };
  return t._getProps = n, t;
};
function dy(e, t, n) {
  const r = z.fun(t) && t;
  r && !n && (n = []);
  const i = ee(() => r || arguments.length == 3 ? fy() : void 0, []), a = j(0), o = Xd(), s = ee(() => ({
    ctrls: [],
    queue: [],
    flush(g, C) {
      const h = Pu(g, C);
      return a.current > 0 && !s.queue.length && !Object.keys(h).some((E) => !g.springs[E]) ? Ns(g, C) : new Promise((E) => {
        c1(g, h), s.queue.push(() => {
          E(Ns(g, C));
        }), o();
      });
    }
  }), []), c = j([...s.ctrls]), u = [], f = bu(e) || 0;
  ee(() => {
    J(c.current.slice(e, f), (g) => {
      G7(g, i), g.stop(!0);
    }), c.current.length = e, d(f, e);
  }, [e]), ee(() => {
    d(0, Math.min(f, e));
  }, n);
  function d(g, C) {
    for (let h = g; h < C; h++) {
      const w = c.current[h] || (c.current[h] = new sy(null, s.flush)), E = r ? r(h, w) : t[h];
      E && (u[h] = ry(E));
    }
  }
  const m = c.current.map((g, C) => Pu(g, u[C])), y = at(ro), v = bu(y), p = y !== v && K7(y);
  Pl(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: g
    } = s;
    g.length && (s.queue = [], J(g, (C) => C())), J(c.current, (C, h) => {
      i == null || i.add(C), p && C.start({
        default: y
      });
      const w = u[h];
      w && (Y7(C, w.ref), C.ref ? C.queue.push(w) : C.start(w));
    });
  }), Qd(() => () => {
    J(s.ctrls, (g) => g.stop(!0));
  });
  const b = m.map((g) => Ne({}, g));
  return i ? [b, i] : b;
}
function Pe(e, t) {
  const n = z.fun(e), [[r], i] = dy(1, n ? e : [e], n ? t || [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Au;
(function(e) {
  e.MOUNT = "mount", e.ENTER = "enter", e.UPDATE = "update", e.LEAVE = "leave";
})(Au || (Au = {}));
class m1 extends Il {
  constructor(t, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = t, this.calc = ci(...n);
    const r = this._get(), i = $s(r);
    Al(this, i.create(r));
  }
  advance(t) {
    const n = this._get(), r = this.get();
    Dt(n, r) || (_t(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Tu(this._active) && Uo(this);
  }
  _get() {
    const t = z.arr(this.source) ? this.source.map(We) : Ge(We(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle && !Tu(this._active) && (this.idle = !1, J(to(this), (t) => {
      t.done = !1;
    }), ot.skipAnimation ? (X.batchedUpdates(() => this.advance()), Uo(this)) : Xa.start(this));
  }
  _attach() {
    let t = 1;
    J(Ge(this.source), (n) => {
      nt(n) && kr(n, this), Os(n) && (n.idle || this._active.add(n), t = Math.max(t, n.priority + 1));
    }), this.priority = t, this._start();
  }
  _detach() {
    J(Ge(this.source), (t) => {
      nt(t) && fi(t, this);
    }), this._active.clear(), Uo(this);
  }
  eventObserved(t) {
    t.type == "change" ? t.idle ? this.advance() : (this._active.add(t.parent), this._start()) : t.type == "idle" ? this._active.delete(t.parent) : t.type == "priority" && (this.priority = Ge(this.source).reduce((n, r) => Math.max(n, (Os(r) ? r.priority : 0) + 1), 0));
  }
}
function my(e) {
  return e.idle !== !1;
}
function Tu(e) {
  return !e.size || Array.from(e).every(my);
}
function Uo(e) {
  e.idle || (e.idle = !0, J(to(e), (t) => {
    t.done = !0;
  }), ui(e, {
    type: "idle",
    parent: e
  }));
}
const hy = (e, ...t) => new m1(e, t);
ot.assign({
  createStringInterpolator: Gd,
  to: (e, t) => new m1(e, t)
});
function Ll(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const vy = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], h1 = /^--/;
function py(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !h1.test(e) && !(ai.hasOwnProperty(e) && ai[e]) ? t + "px" : ("" + t).trim();
}
const Ru = {};
function gy(e, t) {
  if (!e.nodeType || !e.setAttribute)
    return !1;
  const n = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", r = t, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = Ll(r, vy), f = Object.values(u), d = Object.keys(u).map((m) => n || e.hasAttribute(m) ? m : Ru[m] || (Ru[m] = m.replace(/([A-Z])/g, (y) => "-" + y.toLowerCase())));
  a !== void 0 && (e.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const y = py(m, i[m]);
      h1.test(m) ? e.style.setProperty(m, y) : e.style[m] = y;
    }
  d.forEach((m, y) => {
    e.setAttribute(m, f[y]);
  }), o !== void 0 && (e.scrollTop = o), s !== void 0 && (e.scrollLeft = s), c !== void 0 && e.setAttribute("viewBox", c);
}
let ai = {
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
const yy = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), by = ["Webkit", "Ms", "Moz", "O"];
ai = Object.keys(ai).reduce((e, t) => (by.forEach((n) => e[yy(n, t)] = e[t]), e), ai);
const wy = ["x", "y", "z"], Ey = /^(matrix|translate|scale|rotate|skew)/, Cy = /^(translate)/, xy = /^(rotate|skew)/, qo = (e, t) => z.num(e) && e !== 0 ? e + t : e, ca = (e, t) => z.arr(e) ? e.every((n) => ca(n, t)) : z.num(e) ? e === t : parseFloat(e) === t;
class $y extends no {
  constructor(t) {
    let {
      x: n,
      y: r,
      z: i
    } = t, a = Ll(t, wy);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => qo(u, "px")).join(",")})`, ca(c, 0)])), St(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((f) => [f, f === ""]);
      else if (Ey.test(u)) {
        if (delete a[u], z.und(c))
          return;
        const f = Cy.test(u) ? "px" : xy.test(u) ? "deg" : "";
        o.push(Ge(c)), s.push(u === "rotate3d" ? ([d, m, y, v]) => [`rotate3d(${d},${m},${y},${qo(v, f)})`, ca(v, 0)] : (d) => [`${u}(${d.map((m) => qo(m, f)).join(",")})`, ca(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new _y(o, s)), super(a);
  }
}
class _y extends Ud {
  constructor(t, n) {
    super(), this._value = null, this.inputs = t, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", n = !0;
    return J(this.inputs, (r, i) => {
      const a = We(r[0]), [o, s] = this.transforms[i](z.arr(a) ? a : r.map(We));
      t += " " + o, n = n && s;
    }), n ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && J(this.inputs, (n) => J(n, (r) => nt(r) && kr(r, this)));
  }
  observerRemoved(t) {
    t == 0 && J(this.inputs, (n) => J(n, (r) => nt(r) && fi(r, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), ui(this, t);
  }
}
const ky = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], Oy = ["scrollTop", "scrollLeft"];
ot.assign({
  batchedUpdates: Vm,
  createStringInterpolator: Gd,
  colors: u7
});
const Sy = Z7(ky, {
  applyAnimatedValues: gy,
  createAnimatedStyle: (e) => new $y(e),
  getComponentProps: (e) => Ll(e, Oy)
}), ve = Sy.animated;
function Fy(e) {
  return (typeof e == "function" ? e() : e) || document.body;
}
function Sr(e, t) {
  if (gr && e) {
    const n = Fy(e);
    return jm(t, n);
  }
  return t;
}
function Ny(e) {
  const t = j(e);
  return e && (t.current = !0), !!t.current;
}
const Fr = (e) => io(e.active, e.forceRender, e.destroyOnClose) ? e.children : null;
function io(e, t, n) {
  const r = Ny(e);
  return t || e ? !0 : r ? !n : !1;
}
const Py = {
  click: "onClick"
};
function ln(e, t) {
  const n = Object.assign({}, t.props);
  for (const r of e) {
    const i = Py[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = t.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(t, n);
}
const Ko = "adm-mask", Ay = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, Ty = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, Ry = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, Fi = (e) => {
  const t = U(Ry, e), {
    locale: n
  } = pe(), r = j(null);
  Ga(r, t.visible && t.disableBodyScroll);
  const i = ee(() => {
    var f;
    const d = (f = Ay[t.opacity]) !== null && f !== void 0 ? f : t.opacity, m = Ty[t.color];
    return m ? `rgba(${m}, ${d})` : t.color;
  }, [t.color, t.opacity]), [a, o] = K(t.visible), s = El(), {
    opacity: c
  } = Pe({
    opacity: t.visible ? 1 : 0,
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
      s.current || (o(t.visible), t.visible ? (f = t.afterShow) === null || f === void 0 || f.call(t) : (d = t.afterClose) === null || d === void 0 || d.call(t));
    }
  }), u = ln(t.stopPropagation, Z(t, l.createElement(ve.div, {
    className: Ko,
    ref: r,
    "aria-hidden": !0,
    style: Object.assign(Object.assign({}, t.style), {
      background: i,
      opacity: c,
      display: a ? void 0 : "none"
    }),
    onClick: (f) => {
      var d;
      f.target === f.currentTarget && ((d = t.onMaskClick) === null || d === void 0 || d.call(t, f));
    }
  }, t.onMaskClick && l.createElement("div", {
    className: `${Ko}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: t.onMaskClick
  }), l.createElement("div", {
    className: `${Ko}-content`
  }, t.children))));
  return l.createElement(Fr, {
    active: a,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, Sr(t.getContainer, u));
};
function v1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "AddOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function p1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CheckCircleFill-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CheckCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function g1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CheckOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CheckOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function y1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "ClockCircleFill-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "ClockCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function ao(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CloseCircleFill-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CloseCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ni(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CloseOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CloseOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function My(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "DownFill-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "DownFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function b1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", null, /* @__PURE__ */ V.createElement("rect", {
    id: "DownOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M5.11219264,16.3947957 L22.6612572,34.5767382 L22.6612572,34.5767382 C23.2125856,35.1304785 24.0863155,35.1630514 24.6755735,34.6744571 L24.7825775,34.5767382 L42.8834676,16.3956061 C42.9580998,16.320643 43,16.2191697 43,16.1133896 L43,12.9866673 C43,12.7657534 42.8209139,12.5866673 42.6,12.5866673 C42.4936115,12.5866673 42.391606,12.6290496 42.316542,12.7044413 L23.7816937,31.3201933 L23.7816937,31.3201933 L5.6866816,12.7237117 C5.53262122,12.5653818 5.27937888,12.5619207 5.121049,12.7159811 C5.04365775,12.7912854 5,12.8946805 5,13.0026627 L5,16.1170064 C5,16.2206403 5.04022164,16.3202292 5.11219264,16.3947957 Z",
    id: "DownOutline-down",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function w1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", null, /* @__PURE__ */ V.createElement("rect", {
    id: "ExclamationCircleFill-矩形",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function E1(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "InformationCircleFill-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "InformationCircleFill-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Iy(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "LeftOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "LeftOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ly(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "MinusOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-路径",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Dy(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "QuestionCircleOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "QuestionCircleOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Vy(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "RightOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M17.3947957,5.11219264 L35.5767382,22.6612572 L35.5767382,22.6612572 C36.1304785,23.2125856 36.1630514,24.0863155 35.6744571,24.6755735 L35.5767382,24.7825775 L17.3956061,42.8834676 C17.320643,42.9580998 17.2191697,43 17.1133896,43 L13.9866673,43 C13.7657534,43 13.5866673,42.8209139 13.5866673,42.6 C13.5866673,42.4936115 13.6290496,42.391606 13.7044413,42.316542 L32.3201933,23.7816937 L32.3201933,23.7816937 L13.7237117,5.6866816 C13.5653818,5.53262122 13.5619207,5.27937888 13.7159811,5.121049 C13.7912854,5.04365775 13.8946805,5 14.0026627,5 L17.1170064,5 C17.2206403,5 17.3202292,5.04022164 17.3947957,5.11219264 Z",
    id: "RightOutline-right",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function jy(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "SearchOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "SearchOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function By(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "SoundOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "SoundOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-形状",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Mu(e) {
  return /* @__PURE__ */ V.createElement("svg", Object.assign({
    width: "1em",
    height: "1em",
    viewBox: "0 0 48 48",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink"
  }, e, {
    style: Object.assign({
      verticalAlign: "-0.125em"
    }, e.style),
    className: ["antd-mobile-icon", e.className].filter(Boolean).join(" ")
  }), /* @__PURE__ */ V.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "TextDeletionOutline-编组"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "TextDeletionOutline-矩形",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-形状结合",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Dl = {
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
function C1(e) {
  const [t, n] = K(e);
  return Se(() => {
    n(e);
  }, [e]), t;
}
function Wy(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const Oe = {
  toVector(e, t) {
    return e === void 0 && (e = t), Array.isArray(e) ? e : [e, e];
  },
  add(e, t) {
    return [e[0] + t[0], e[1] + t[1]];
  },
  sub(e, t) {
    return [e[0] - t[0], e[1] - t[1]];
  },
  addTo(e, t) {
    e[0] += t[0], e[1] += t[1];
  },
  subTo(e, t) {
    e[0] -= t[0], e[1] -= t[1];
  }
};
function Iu(e, t, n) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(e, n * 5) : e * t * n / (t + n * e);
}
function Lu(e, t, n, r = 0.15) {
  return r === 0 ? Wy(e, t, n) : e < t ? -Iu(t - e, n - t, r) + t : e > n ? +Iu(e - n, n - t, r) + n : e;
}
function Zy(e, [t, n], [r, i]) {
  const [[a, o], [s, c]] = e;
  return [Lu(t, a, o, r), Lu(n, s, c, i)];
}
function Hy(e, t) {
  if (typeof e != "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function zy(e) {
  var t = Hy(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Re(e, t, n) {
  return t = zy(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Du(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function we(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Du(Object(n), !0).forEach(function(r) {
      Re(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Du(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const x1 = {
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
function Vu(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}
const Uy = ["enter", "leave"];
function qy(e = !1, t) {
  return e && !Uy.includes(t);
}
function Ky(e, t = "", n = !1) {
  const r = x1[e], i = r && r[t] || t;
  return "on" + Vu(e) + Vu(i) + (qy(n, i) ? "Capture" : "");
}
const Gy = ["gotpointercapture", "lostpointercapture"];
function Yy(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = Gy.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function Xy(e, t = "") {
  const n = x1[e], r = n && n[t] || t;
  return e + r;
}
function oo(e) {
  return "touches" in e;
}
function $1(e) {
  return oo(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function Qy(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function Jy(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function _1(e) {
  return oo(e) ? Jy(e)[0] : e;
}
function Ps(e, t) {
  try {
    const n = t.clientX - e.clientX, r = t.clientY - e.clientY, i = (t.clientX + e.clientX) / 2, a = (t.clientY + e.clientY) / 2, o = Math.hypot(n, r);
    return {
      angle: -(Math.atan2(n, r) * 180) / Math.PI,
      distance: o,
      origin: [i, a]
    };
  } catch {
  }
  return null;
}
function e8(e) {
  return Qy(e).map((t) => t.identifier);
}
function ju(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Ps(n, r);
}
function Go(e) {
  const t = _1(e);
  return oo(e) ? t.identifier : t.pointerId;
}
function Bu(e) {
  const t = _1(e);
  return [t.clientX, t.clientY];
}
const Wu = 40, Zu = 800;
function k1(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= Wu, n *= Wu) : r === 2 && (t *= Zu, n *= Zu), [t, n];
}
function t8(e) {
  const t = {};
  if ("buttons" in e && (t.buttons = e.buttons), "shiftKey" in e) {
    const {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: a
    } = e;
    Object.assign(t, {
      shiftKey: n,
      altKey: r,
      metaKey: i,
      ctrlKey: a
    });
  }
  return t;
}
function Sa(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
function n8() {
}
function r8(...e) {
  return e.length === 0 ? n8 : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function Hu(e, t) {
  return Object.assign({}, t, e || {});
}
const i8 = 32;
class O1 {
  constructor(t, n, r) {
    this.ctrl = t, this.args = n, this.key = r, this.state || (this.state = {}, this.computeValues([0, 0]), this.computeInitial(), this.init && this.init(), this.reset());
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(t) {
    this.ctrl.state[this.key] = t;
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
      state: t,
      shared: n,
      ingKey: r,
      args: i
    } = this;
    n[r] = t._active = t.active = t._blocked = t._force = !1, t._step = [!1, !1], t.intentional = !1, t._movement = [0, 0], t._distance = [0, 0], t._direction = [0, 0], t._delta = [0, 0], t._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], t.args = i, t.axis = void 0, t.memo = void 0, t.elapsedTime = t.timeDelta = 0, t.direction = [0, 0], t.distance = [0, 0], t.overflow = [0, 0], t._movementBound = [!1, !1], t.velocity = [0, 0], t.movement = [0, 0], t.delta = [0, 0], t.timeStamp = 0;
  }
  start(t) {
    const n = this.state, r = this.config;
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = t.target, n.currentTarget = t.currentTarget, n.lastOffset = r.from ? Sa(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = t.timeStamp);
  }
  computeValues(t) {
    const n = this.state;
    n._values = t, n.values = this.config.transform(t);
  }
  computeInitial() {
    const t = this.state;
    t._initial = t._values, t.initial = t.values;
  }
  compute(t) {
    const {
      state: n,
      config: r,
      shared: i
    } = this;
    n.args = this.args;
    let a = 0;
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, t8(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const x = n._delta.map(Math.abs);
      Oe.addTo(n._distance, x);
    }
    this.axisIntent && this.axisIntent(t);
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
    const y = n.offset, v = n._active && !n._blocked || n.active;
    v && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = Sa(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [p, b] = n.offset, [[g, C], [h, w]] = n._bounds;
    n.overflow = [p < g ? -1 : p > C ? 1 : 0, b < h ? -1 : b > w ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = Zy(n._bounds, n.offset, E), n.delta = Oe.sub(n.offset, y), this.computeMovement(), v && (!n.last || a > i8)) {
      n.delta = Oe.sub(n.offset, y);
      const x = n.delta.map(Math.abs);
      Oe.addTo(n.distance, x), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [x[0] / a, x[1] / a], n.timeDelta = a);
    }
  }
  emit() {
    const t = this.state, n = this.shared, r = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !r.triggerAllEvents)
      return;
    const i = this.handler(we(we(we({}, n), t), {}, {
      [this.aliasKey]: t.values
    }));
    i !== void 0 && (t.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function a8([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class S1 extends O1 {
  constructor(...t) {
    super(...t), Re(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = Oe.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Oe.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[$1(t)] : r.axisThreshold;
      n.axis = a8(n._movement, i);
    }
    n._blocked = (r.lockDirection || !!r.axis) && !n.axis || !!r.axis && r.axis !== n.axis;
  }
  restrictToAxis(t) {
    if (this.config.axis || this.config.lockDirection)
      switch (this.state.axis) {
        case "x":
          t[1] = 0;
          break;
        case "y":
          t[0] = 0;
          break;
      }
  }
}
const o8 = (e) => e, zu = 0.15, F1 = {
  enabled(e = !0) {
    return e;
  },
  eventOptions(e, t, n) {
    return we(we({}, n.shared.eventOptions), e);
  },
  preventDefault(e = !1) {
    return e;
  },
  triggerAllEvents(e = !1) {
    return e;
  },
  rubberband(e = 0) {
    switch (e) {
      case !0:
        return [zu, zu];
      case !1:
        return [0, 0];
      default:
        return Oe.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function")
      return e;
    if (e != null)
      return Oe.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || o8;
  },
  threshold(e) {
    return Oe.toVector(e, 0);
  }
}, s8 = 0, Nr = we(we({}, F1), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(e = s8) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (a) => Nr.bounds(e(a));
    if ("current" in e)
      return () => e.current;
    if (typeof HTMLElement == "function" && e instanceof HTMLElement)
      return e;
    const {
      left: t = -1 / 0,
      right: n = 1 / 0,
      top: r = -1 / 0,
      bottom: i = 1 / 0
    } = e;
    return [[t, n], [r, i]];
  }
}), Uu = {
  ArrowRight: (e, t = 1) => [e * t, 0],
  ArrowLeft: (e, t = 1) => [-1 * e * t, 0],
  ArrowUp: (e, t = 1) => [0, -1 * e * t],
  ArrowDown: (e, t = 1) => [0, e * t]
};
class l8 extends S1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const t = this.state;
    t._pointerId = void 0, t._pointerActive = !1, t._keyboardActive = !1, t._preventScroll = !1, t._delayed = !1, t.swipe = [0, 0], t.tap = !1, t.canceled = !1, t.cancel = this.cancel.bind(this);
  }
  setup() {
    const t = this.state;
    if (t._bounds instanceof HTMLElement) {
      const n = t._bounds.getBoundingClientRect(), r = t.currentTarget.getBoundingClientRect(), i = {
        left: n.left - r.left + t.offset[0],
        right: n.right - r.right + t.offset[0],
        top: n.top - r.top + t.offset[1],
        bottom: n.bottom - r.bottom + t.offset[1]
      };
      t._bounds = Nr.bounds(i);
    }
  }
  cancel() {
    const t = this.state;
    t.canceled || (t.canceled = !0, t._active = !1, setTimeout(() => {
      this.compute(), this.emit();
    }, 0));
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean(), this.state._pointerActive = !1, this.state._keyboardActive = !1, super.clean();
  }
  pointerDown(t) {
    const n = this.config, r = this.state;
    if (t.buttons != null && (Array.isArray(n.pointerButtons) ? !n.pointerButtons.includes(t.buttons) : n.pointerButtons !== -1 && n.pointerButtons !== t.buttons))
      return;
    const i = this.ctrl.setEventIds(t);
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = Go(t), r._pointerActive = !0, this.computeValues(Bu(t)), this.computeInitial(), n.preventScrollAxis && $1(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = Go(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = Bu(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = Oe.sub(a, n._values), this.computeValues(a)), Oe.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
      this.timeoutStore.remove("dragDelay"), n.active = !1, this.startPointerDrag(t);
      return;
    }
    if (r.preventScrollAxis && !n._preventScroll)
      if (n.axis)
        if (n.axis === r.preventScrollAxis || r.preventScrollAxis === "xy") {
          n._active = !1, this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag"), this.startPointerDrag(t);
          return;
        }
      else
        return;
    this.emit();
  }
  pointerUp(t) {
    this.ctrl.setEventIds(t);
    try {
      this.config.pointerCapture && t.target.hasPointerCapture(t.pointerId) && t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    const n = this.state, r = this.config;
    if (!n._active || !n._pointerActive)
      return;
    const i = Go(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [s, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [y, v] = r.swipe.distance, p = r.swipe.duration;
      if (n.elapsedTime < p) {
        const b = Math.abs(s / n.timeDelta), g = Math.abs(c / n.timeDelta);
        b > d && Math.abs(u) > y && (n.swipe[0] = Math.sign(s)), g > m && Math.abs(f) > v && (n.swipe[1] = Math.sign(c));
      }
    }
    this.emit();
  }
  pointerClick(t) {
    !this.state.tap && t.detail > 0 && (t.preventDefault(), t.stopPropagation());
  }
  setupPointer(t) {
    const n = this.config, r = n.device;
    n.pointerLock && t.currentTarget.requestPointerLock(), n.pointerCapture || (this.eventStore.add(this.sharedConfig.window, r, "change", this.pointerMove.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "end", this.pointerUp.bind(this)), this.eventStore.add(this.sharedConfig.window, r, "cancel", this.pointerUp.bind(this)));
  }
  pointerClean() {
    this.config.pointerLock && document.pointerLockElement === this.state.currentTarget && document.exitPointerLock();
  }
  preventScroll(t) {
    this.state._preventScroll && t.cancelable && t.preventDefault();
  }
  setupScrollPrevention(t) {
    this.state._preventScroll = !1, c8(t);
    const n = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: !1
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", n), this.eventStore.add(this.sharedConfig.window, "touch", "cancel", n), this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, t);
  }
  setupDelayTrigger(t) {
    this.state._delayed = !0, this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0], this.startPointerDrag(t);
    }, this.config.delay);
  }
  keyDown(t) {
    const n = Uu[t.key];
    if (n) {
      const r = this.state, i = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Oe.addTo(r._movement, r._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Uu && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    t(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(n, "change", this.pointerMove.bind(this)), t(n, "end", this.pointerUp.bind(this)), t(n, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function c8(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const Pi = typeof window < "u" && window.document && window.document.createElement;
function N1() {
  return Pi && "ontouchstart" in window;
}
function u8() {
  return N1() || Pi && window.navigator.maxTouchPoints > 1;
}
function f8() {
  return Pi && "onpointerdown" in window;
}
function d8() {
  return Pi && "exitPointerLock" in window.document;
}
function m8() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const rt = {
  isBrowser: Pi,
  gesture: m8(),
  touch: N1(),
  touchscreen: u8(),
  pointer: f8(),
  pointerLock: d8()
}, h8 = 250, v8 = 180, p8 = 0.5, g8 = 50, y8 = 250, b8 = 10, qu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, w8 = we(we({}, Nr), {}, {
  device(e, t, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && rt.pointerLock, rt.touch && n ? "touch" : this.pointerLock ? "mouse" : rt.pointer && !i ? "pointer" : rt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(e, t, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? h8 : void 0, !(!rt.touchscreen || n === !1))
      return e || (n !== void 0 ? "y" : void 0);
  },
  pointerCapture(e, t, {
    pointer: {
      capture: n = !0,
      buttons: r = 1,
      keys: i = !0
    } = {}
  }) {
    return this.pointerButtons = r, this.keys = i, !this.pointerLock && this.device === "pointer" && n;
  },
  threshold(e, t, {
    filterTaps: n = !1,
    tapsThreshold: r = 3,
    axis: i = void 0
  }) {
    const a = Oe.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: e = p8,
    distance: t = g8,
    duration: n = y8
  } = {}) {
    return {
      velocity: this.transform(Oe.toVector(e)),
      distance: this.transform(Oe.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return v8;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? we(we({}, qu), e) : qu;
  },
  keyboardDisplacement(e = b8) {
    return e;
  }
});
function P1(e) {
  const [t, n] = e.overflow, [r, i] = e._delta, [a, o] = e._direction;
  (t < 0 && r > 0 && a < 0 || t > 0 && r < 0 && a > 0) && (e._movement[0] = e._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (e._movement[1] = e._movementBound[1]);
}
const E8 = 30, C8 = 100;
class x8 extends O1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "pinching"), Re(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0], this.state.lastOffset = [1, 0], this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const t = this.state;
    t._touchIds = [], t.canceled = !1, t.cancel = this.cancel.bind(this), t.turns = 0;
  }
  computeOffset() {
    const {
      type: t,
      movement: n,
      lastOffset: r
    } = this.state;
    t === "wheel" ? this.state.offset = Oe.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
  }
  computeMovement() {
    const {
      offset: t,
      lastOffset: n
    } = this.state;
    this.state.movement = [t[0] / n[0], t[1] - n[1]];
  }
  axisIntent() {
    const t = this.state, [n, r] = t._movement;
    if (!t.axis) {
      const i = Math.abs(n) * E8 - Math.abs(r);
      i < 0 ? t.axis = "angle" : i > 0 && (t.axis = "scale");
    }
  }
  restrictToAxis(t) {
    this.config.lockDirection && (this.state.axis === "scale" ? t[1] = 0 : this.state.axis === "angle" && (t[0] = 0));
  }
  cancel() {
    const t = this.state;
    t.canceled || setTimeout(() => {
      t.canceled = !0, t._active = !1, this.compute(), this.emit();
    }, 0);
  }
  touchStart(t) {
    this.ctrl.setEventIds(t);
    const n = this.state, r = this.ctrl.touchIds;
    if (n._active && n._touchIds.every((a) => r.has(a)) || r.size < 2)
      return;
    this.start(t), n._touchIds = Array.from(r).slice(0, 2);
    const i = ju(t, n._touchIds);
    i && this.pinchStart(t, i);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((o) => i.has(o)) || (r.size < 2 && r.set(t.pointerId, t), n._pointerEvents.size < 2))
      return;
    this.start(t);
    const a = Ps(...Array.from(r.values()));
    a && this.pinchStart(t, a);
  }
  pinchStart(t, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const n = ju(t, this.state._touchIds);
    n && this.pinchMove(t, n);
  }
  pointerMove(t) {
    const n = this.state._pointerEvents;
    if (n.has(t.pointerId) && n.set(t.pointerId, t), !this.state._active)
      return;
    const r = Ps(...Array.from(n.values()));
    r && this.pinchMove(t, r);
  }
  pinchMove(t, n) {
    const r = this.state, i = r._values[1], a = n.angle - i;
    let o = 0;
    Math.abs(a) > 270 && (o += Math.sign(a)), this.computeValues([n.distance, n.angle - 360 * o]), r.origin = n.origin, r.turns = o, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(t), this.emit();
  }
  touchEnd(t) {
    this.ctrl.setEventIds(t), this.state._active && this.state._touchIds.some((n) => !this.ctrl.touchIds.has(n)) && (this.state._active = !1, this.compute(t), this.emit());
  }
  pointerEnd(t) {
    const n = this.state;
    this.ctrl.setEventIds(t);
    try {
      t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    n._pointerEvents.has(t.pointerId) && n._pointerEvents.delete(t.pointerId), n._active && n._pointerEvents.size < 2 && (n._active = !1, this.compute(t), this.emit());
  }
  gestureStart(t) {
    t.cancelable && t.preventDefault();
    const n = this.state;
    n._active || (this.start(t), this.computeValues([t.scale, t.rotation]), n.origin = [t.clientX, t.clientY], this.compute(t), this.emit());
  }
  gestureMove(t) {
    if (t.cancelable && t.preventDefault(), !this.state._active)
      return;
    const n = this.state;
    this.computeValues([t.scale, t.rotation]), n.origin = [t.clientX, t.clientY];
    const r = n._movement;
    n._movement = [t.scale - 1, t.rotation], n._delta = Oe.sub(n._movement, r), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    this.state._active && (this.state._active = !1, this.compute(t), this.emit());
  }
  wheel(t) {
    const n = this.config.modifierKey;
    n && (Array.isArray(n) ? !n.find((r) => t[r]) : !t[n]) || (this.state._active ? this.wheelChange(t) : this.wheelStart(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(t) {
    this.start(t), this.wheelChange(t);
  }
  wheelChange(t) {
    "uv" in t || t.cancelable && t.preventDefault();
    const r = this.state;
    r._delta = [-k1(t)[1] / C8 * r.offset[0], 0], Oe.addTo(r._movement, r._delta), P1(r), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    n && (t(n, "start", this[n + "Start"].bind(this)), t(n, "change", this[n + "Move"].bind(this)), t(n, "end", this[n + "End"].bind(this)), t(n, "cancel", this[n + "End"].bind(this)), t("lostPointerCapture", "", this[n + "End"].bind(this))), this.config.pinchOnWheel && t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const $8 = we(we({}, F1), {}, {
  device(e, t, {
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
  bounds(e, t, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const s = Hu(Sa(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    }, a = (o) => {
      const s = Hu(Sa(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(e, t, n) {
    return this.lockDirection = n.axis === "lock", Oe.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  },
  pinchOnWheel(e = !0) {
    return e;
  }
});
we(we({}, Nr), {}, {
  mouseOnly: (e = !0) => e
});
class _8 extends S1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = k1(t), Oe.addTo(n._movement, n._delta), P1(n), this.compute(t), this.emit();
  }
  wheelEnd() {
    this.state._active && (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const k8 = Nr;
we(we({}, Nr), {}, {
  mouseOnly: (e = !0) => e
});
const Vl = /* @__PURE__ */ new Map(), As = /* @__PURE__ */ new Map();
function jl(e) {
  Vl.set(e.key, e.engine), As.set(e.key, e.resolver);
}
const A1 = {
  key: "drag",
  engine: l8,
  resolver: w8
}, O8 = {
  key: "pinch",
  engine: x8,
  resolver: $8
}, S8 = {
  key: "wheel",
  engine: _8,
  resolver: k8
};
function F8(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function N8(e, t) {
  if (e == null)
    return {};
  var n = F8(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
const P8 = {
  target(e) {
    if (e)
      return () => "current" in e ? e.current : e;
  },
  enabled(e = !0) {
    return e;
  },
  window(e = rt.isBrowser ? window : void 0) {
    return e;
  },
  eventOptions({
    passive: e = !0,
    capture: t = !1
  } = {}) {
    return {
      passive: e,
      capture: t
    };
  },
  transform(e) {
    return e;
  }
}, A8 = ["target", "eventOptions", "window", "enabled", "transform"];
function ua(e = {}, t) {
  const n = {};
  for (const [r, i] of Object.entries(t))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, e[r], r, e);
        break;
      case "object":
        n[r] = ua(e[r], i);
        break;
      case "boolean":
        i && (n[r] = e[r]);
        break;
    }
  return n;
}
function T8(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = N8(r, A8);
  if (n.shared = ua({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, P8), t) {
    const f = As.get(t);
    n[t] = ua(we({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = As.get(f);
      d && (n[f] = ua(we({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class T1 {
  constructor(t, n) {
    Re(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, a) {
    const o = this._listeners, s = Xy(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = we(we({}, c), a);
    t.addEventListener(s, i, u);
    const f = () => {
      t.removeEventListener(s, i, u), o.delete(f);
    };
    return o.add(f), f;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class R8 {
  constructor() {
    Re(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(t, n, r = 140, ...i) {
    this.remove(t), this._timeouts.set(t, window.setTimeout(n, r, ...i));
  }
  remove(t) {
    const n = this._timeouts.get(t);
    n && window.clearTimeout(n);
  }
  clean() {
    this._timeouts.forEach((t) => void window.clearTimeout(t)), this._timeouts.clear();
  }
}
class M8 {
  constructor(t) {
    Re(this, "gestures", /* @__PURE__ */ new Set()), Re(this, "_targetEventStore", new T1(this)), Re(this, "gestureEventStores", {}), Re(this, "gestureTimeoutStores", {}), Re(this, "handlers", {}), Re(this, "config", {}), Re(this, "pointerIds", /* @__PURE__ */ new Set()), Re(this, "touchIds", /* @__PURE__ */ new Set()), Re(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), I8(this, t);
  }
  setEventIds(t) {
    if (oo(t))
      return this.touchIds = new Set(e8(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = T8(t, n, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const t of this.gestures)
      this.gestureEventStores[t].clean(), this.gestureTimeoutStores[t].clean();
  }
  effect() {
    return this.config.shared.target && this.bind(), () => this._targetEventStore.clean();
  }
  bind(...t) {
    const n = this.config.shared, r = {};
    let i;
    if (!(n.target && (i = n.target(), !i))) {
      if (n.enabled) {
        for (const o of this.gestures) {
          const s = this.config[o], c = Ku(r, s.eventOptions, !!i);
          if (s.enabled) {
            const u = Vl.get(o);
            new u(this, t, o).bind(c);
          }
        }
        const a = Ku(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](we(we({}, this.state.shared), {}, {
            event: s,
            args: t
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = r8(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = Yy(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Hn(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new T1(e, t), e.gestureTimeoutStores[t] = new R8();
}
function I8(e, t) {
  t.drag && Hn(e, "drag"), t.wheel && Hn(e, "wheel"), t.scroll && Hn(e, "scroll"), t.move && Hn(e, "move"), t.pinch && Hn(e, "pinch"), t.hover && Hn(e, "hover");
}
const Ku = (e, t, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : t.capture, d = (u = o.passive) !== null && u !== void 0 ? u : t.passive;
  let m = s ? r : Ky(r, i, f);
  n && d && (m += "Passive"), e[m] = e[m] || [], e[m].push(a);
}, L8 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function D8(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    L8.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function zn(e, t, n, r, i, a) {
  if (!e.has(n) || !Vl.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let f;
    return u.first && o in t && t[o](u), n in t && (f = t[n](u)), u.last && s in t && t[s](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function V8(e, t) {
  const [n, r, i] = D8(e), a = {};
  return zn(i, n, "onDrag", "drag", a, t), zn(i, n, "onWheel", "wheel", a, t), zn(i, n, "onScroll", "scroll", a, t), zn(i, n, "onPinch", "pinch", a, t), zn(i, n, "onMove", "move", a, t), zn(i, n, "onHover", "hover", a, t), {
    handlers: a,
    config: t,
    nativeHandlers: r
  };
}
function Bl(e, t = {}, n, r) {
  const i = l.useMemo(() => new M8(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function Pt(e, t) {
  return jl(A1), Bl({
    drag: e
  }, t || {}, "drag");
}
function j8(e, t) {
  return jl(S8), Bl({
    wheel: e
  }, t || {}, "wheel");
}
function B8(e) {
  return e.forEach(jl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = V8(n, r || {});
    return Bl(i, o, void 0, a);
  };
}
const qi = "adm-popup", W8 = Object.assign(Object.assign({}, Dl), {
  closeOnSwipe: !1,
  position: "bottom"
}), Pr = (e) => {
  const t = U(W8, e), n = B(`${qi}-body`, t.bodyClassName, `${qi}-body-position-${t.position}`), {
    locale: r
  } = pe(), [i, a] = K(t.visible), o = j(null);
  Ga(o, t.disableBodyScroll && i ? "strict" : !1), Se(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const s = El(), {
    percent: c
  } = Pe({
    percent: t.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var m, y;
      s.current || (a(t.visible), t.visible ? (m = t.afterShow) === null || m === void 0 || m.call(t) : (y = t.afterClose) === null || y === void 0 || y.call(t));
    }
  }), u = Pt(({
    swipe: [, m]
  }) => {
    var y;
    t.closeOnSwipe && (m === 1 && t.position === "bottom" || m === -1 && t.position === "top") && ((y = t.onClose) === null || y === void 0 || y.call(t));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(t.position)
  }), f = C1(i && t.visible), d = ln(t.stopPropagation, Z(t, l.createElement("div", Object.assign({
    className: qi,
    onClick: t.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(t.position) ? "none" : "auto"
    }
  }, u()), t.mask && l.createElement(Fi, {
    visible: f,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (m) => {
      var y, v;
      (y = t.onMaskClick) === null || y === void 0 || y.call(t, m), t.closeOnMaskClick && ((v = t.onClose) === null || v === void 0 || v.call(t));
    },
    className: t.maskClassName,
    style: t.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement(ve.div, {
    className: n,
    style: Object.assign(Object.assign({}, t.bodyStyle), {
      pointerEvents: c.to((m) => m === 0 ? "unset" : "none"),
      transform: c.to((m) => t.position === "bottom" ? `translate(0, ${m}%)` : t.position === "top" ? `translate(0, -${m}%)` : t.position === "left" ? `translate(-${m}%, 0)` : t.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: B(`${qi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = t.onClose) === null || m === void 0 || m.call(t);
    },
    role: "button",
    "aria-label": r.common.close
  }, l.createElement(Ni, null)), t.children))));
  return l.createElement(Fr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, Sr(t.getContainer, d));
}, Gu = "adm-safe-area", Ar = (e) => Z(e, l.createElement("div", {
  className: B(Gu, `${Gu}-position-${e.position}`)
})), Fa = Object.assign({}, Dm), {
  version: Z8,
  render: H8,
  unmountComponentAtNode: z8
} = Fa;
let so;
try {
  Number((Z8 || "").split(".")[0]) >= 18 && Fa.createRoot && (so = Fa.createRoot);
} catch {
}
function Yu(e) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: t
  } = Fa;
  t && typeof t == "object" && (t.usingClientEntryPoint = e);
}
const Na = "__antd_mobile_root__";
function U8(e, t) {
  H8(e, t);
}
function q8(e, t) {
  Yu(!0);
  const n = t[Na] || so(t);
  Yu(!1), n.render(e), t[Na] = n;
}
function K8(e, t) {
  if (so) {
    q8(e, t);
    return;
  }
  U8(e, t);
}
function G8(e) {
  return z8(e);
}
function Y8(e) {
  return ke(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var t;
      (t = e[Na]) === null || t === void 0 || t.unmount(), delete e[Na];
    });
  });
}
function X8(e) {
  return so ? Y8(e) : G8(e);
}
function Ai(e) {
  const t = document.createElement("div");
  document.body.appendChild(t);
  function n() {
    X8(t) && t.parentNode && t.parentNode.removeChild(t);
  }
  return K8(e, t), n;
}
function Tr(e) {
  const t = l.forwardRef((i, a) => {
    const [o, s] = K(!1), c = j(!1), [u, f] = K(e), d = j(0);
    Y(() => {
      c.current ? y() : s(!0);
    }, []);
    function m() {
      var v, p;
      c.current = !0, s(!1), (p = (v = u.props).onClose) === null || p === void 0 || p.call(v);
    }
    function y() {
      var v, p;
      r(), (p = (v = u.props).afterClose) === null || p === void 0 || p.call(v);
    }
    return ye(a, () => ({
      close: m,
      replace: (v) => {
        var p, b;
        d.current++, (b = (p = u.props).afterClose) === null || b === void 0 || b.call(p), f(v);
      }
    })), l.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: y
    }));
  }), n = l.createRef(), r = Ai(l.createElement(t, {
    ref: n
  }));
  return {
    close: () => ke(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const Le = "adm-action-sheet", Q8 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, R1 = (e) => {
  const t = U(Q8, e), {
    styles: n
  } = t;
  return l.createElement(Pr, {
    visible: t.visible,
    onMaskClick: () => {
      var r, i;
      (r = t.onMaskClick) === null || r === void 0 || r.call(t), t.closeOnMaskClick && ((i = t.onClose) === null || i === void 0 || i.call(t));
    },
    afterClose: t.afterClose,
    className: B(`${Le}-popup`, t.popupClassName),
    style: t.popupStyle,
    getContainer: t.getContainer,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, Z(t, l.createElement("div", {
    className: Le
  }, t.extra && l.createElement("div", {
    className: `${Le}-extra`
  }, t.extra), l.createElement("div", {
    className: `${Le}-button-list`
  }, t.actions.map((r, i) => l.createElement("div", {
    key: r.key,
    className: `${Le}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${Le}-button-item`, {
      [`${Le}-button-item-danger`]: r.danger,
      [`${Le}-button-item-disabled`]: r.disabled,
      [`${Le}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var a, o, s;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = t.onAction) === null || o === void 0 || o.call(t, r, i), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, l.createElement("div", {
    className: `${Le}-button-item-name`
  }, r.text), r.description && l.createElement("div", {
    className: `${Le}-button-item-description`
  }, r.description))))), t.cancelText && l.createElement("div", {
    className: `${Le}-cancel`,
    role: "option",
    "aria-label": t.cancelText
  }, l.createElement("div", {
    className: `${Le}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${Le}-button-item`),
    onClick: t.onClose
  }, l.createElement("div", {
    className: `${Le}-button-item-name`
  }, t.cancelText)))), t.safeArea && l.createElement(Ar, {
    position: "bottom"
  }))));
};
function J8(e) {
  return Tr(l.createElement(R1, Object.assign({}, e)));
}
const Ek = ie(R1, {
  show: J8
}), Xu = "adm-auto-center", pi = (e) => Z(e, l.createElement("div", {
  className: Xu
}, l.createElement("div", {
  className: `${Xu}-content`
}, e.children))), e9 = Ve(() => l.createElement("svg", {
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
var Wl = {}, t9 = pt && pt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Wl, "__esModule", { value: !0 });
var Zl = Wl.staged = void 0;
const n9 = t9(l);
function M1(e) {
  return typeof e == "function" ? n9.default.createElement(r9, { stage: e }) : e;
}
function r9(e) {
  const t = e.stage();
  return M1(t);
}
function i9(e) {
  return function(n, r) {
    const i = e(n, r);
    return M1(i);
  };
}
Zl = Wl.staged = i9;
function Sn(e) {
  return typeof e == "number" ? `${e}px` : e;
}
const a9 = (e) => {
  const t = j(null), [n] = f6(t);
  return Y(() => {
    n && e.onActive();
  }, [n]), l.createElement("div", {
    ref: t
  });
}, Ti = bd(Se), o9 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), s9 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Pa = "adm-image", l9 = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Pa}-tip`
  }, l.createElement(o9, null)),
  fallback: l.createElement("div", {
    className: `${Pa}-tip`
  }, l.createElement(s9, null)),
  lazy: !1,
  draggable: !1
}, lo = Zl((e) => {
  const t = U(l9, e), [n, r] = K(!1), [i, a] = K(!1), o = j(null), s = j(null);
  let c = t.src, u = t.srcSet;
  const [f, d] = K(!t.lazy);
  c = f ? t.src : void 0, u = f ? t.srcSet : void 0, Ti(() => {
    r(!1), a(!1);
  }, [c]), Y(() => {
    var v;
    !((v = s.current) === null || v === void 0) && v.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, t.fallback);
    const v = l.createElement("img", {
      ref: s,
      id: t.id,
      className: `${Pa}-img`,
      src: c,
      alt: t.alt,
      onClick: t.onClick,
      onLoad: (p) => {
        var b;
        r(!0), (b = t.onLoad) === null || b === void 0 || b.call(t, p);
      },
      onError: (p) => {
        var b;
        a(!0), (b = t.onError) === null || b === void 0 || b.call(t, p);
      },
      style: {
        objectFit: t.fit,
        display: n ? "block" : "none"
      },
      crossOrigin: t.crossOrigin,
      decoding: t.decoding,
      loading: t.loading,
      referrerPolicy: t.referrerPolicy,
      sizes: t.sizes,
      srcSet: u,
      useMap: t.useMap,
      draggable: t.draggable
    });
    return l.createElement(l.Fragment, null, !n && t.placeholder, v);
  }
  const y = {};
  return t.width && (y["--width"] = Sn(t.width), y.width = Sn(t.width)), t.height && (y["--height"] = Sn(t.height), y.height = Sn(t.height)), Z(t, l.createElement("div", {
    ref: o,
    className: Pa,
    style: y,
    onClick: t.onContainerClick
  }, t.lazy && !f && l.createElement(a9, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), c9 = "adm-avatar", u9 = {
  fallback: l.createElement(e9, null),
  fit: "cover"
}, Ck = (e) => {
  const t = U(u9, e);
  return Z(t, l.createElement(lo, {
    className: c9,
    src: t.src,
    fallback: t.fallback,
    placeholder: t.fallback,
    alt: t.alt,
    lazy: t.lazy,
    fit: t.fit,
    onClick: t.onClick,
    onError: t.onError,
    onLoad: t.onLoad
  }));
}, Un = "adm-badge", I1 = l.createElement(l.Fragment, null), f9 = (e) => {
  const {
    content: t,
    color: n,
    children: r
  } = e, i = t === I1, a = B(Un, {
    [`${Un}-fixed`]: !!r,
    [`${Un}-dot`]: i,
    [`${Un}-bordered`]: e.bordered
  }), o = t || t === 0 ? Z(e, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${Un}-content`
  }, t))) : null;
  return r ? l.createElement("div", {
    className: B(`${Un}-wrapper`, e.wrapperClassName),
    style: e.wrapperStyle
  }, r, o) : o;
}, Ts = ie(f9, {
  dot: I1
}), d9 = "adm-dot-loading", m9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, h9 = {
  color: "default"
}, L1 = Ve((e) => {
  var t;
  const n = U(h9, e);
  return Z(n, l.createElement("div", {
    style: {
      color: (t = m9[n.color]) !== null && t !== void 0 ? t : n.color
    },
    className: B("adm-loading", d9)
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
function D1(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
function v9() {
  return gr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const Je = "adm-button", p9 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(L1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, Wt = fe((e, t) => {
  const n = U(p9, e), [r, i] = K(!1), a = j(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  ye(t, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => ke(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (D1(f))
      try {
        i(!0), yield f, i(!1);
      } catch (d) {
        throw i(!1), d;
      }
  });
  return Z(n, l.createElement("button", {
    ref: a,
    type: n.type,
    onClick: c,
    className: B(Je, {
      [`${Je}-${n.color}`]: n.color,
      [`${Je}-block`]: n.block,
      [`${Je}-disabled`]: s,
      [`${Je}-fill-outline`]: n.fill === "outline",
      [`${Je}-fill-none`]: n.fill === "none",
      [`${Je}-mini`]: n.size === "mini",
      [`${Je}-small`]: n.size === "small",
      [`${Je}-large`]: n.size === "large",
      [`${Je}-loading`]: o
    }, `${Je}-shape-${n.shape}`),
    disabled: s,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? l.createElement("div", {
    className: `${Je}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : l.createElement("span", null, n.children)));
}), Qu = () => l.createElement("svg", {
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
})))))), Ju = () => l.createElement("svg", {
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
var V1 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
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
        var f, d, m, y, v = o(this), p = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), y = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (y += 7), m.add(y, n));
        return v.diff(p, "week") + 1;
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
})(V1);
var g9 = V1.exports;
const co = /* @__PURE__ */ lt(g9);
function te(e) {
  const {
    value: t,
    defaultValue: n,
    onChange: r
  } = e, i = Ed(), a = j(t !== void 0 ? t : n);
  t !== void 0 && (a.current = t);
  const o = zt((s, c = !1) => {
    const u = typeof s == "function" ? s(a.current) : s;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function y9(e, t) {
  return e.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return t[r];
  });
}
function ef(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function Yo(e) {
  return me().year(e.year).month(e.month - 1).date(1);
}
me.extend(co);
const he = "adm-calendar", b9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Qu, null),
  prevYearButton: l.createElement(Ju, null),
  nextMonthButton: l.createElement(Qu, null),
  nextYearButton: l.createElement(Ju, null)
}, xk = fe((e, t) => {
  const n = me(), r = U(b9, e), {
    locale: i
  } = pe(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const h = a.pop();
    h && a.unshift(h);
  }
  const [o, s] = te({
    value: r.value === void 0 ? void 0 : ef(r.selectionMode, r.value),
    defaultValue: ef(r.selectionMode, r.defaultValue),
    onChange: (h) => {
      var w, E;
      r.selectionMode === "single" ? (w = r.onChange) === null || w === void 0 || w.call(r, h ? h[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, h));
    }
  }), [c, u] = K(!1), [f, d] = K(() => me(o ? o[0] : n).date(1));
  pl(() => {
    var h;
    (h = r.onPageChange) === null || h === void 0 || h.call(r, f.year(), f.month() + 1);
  }, [f]), ye(t, () => ({
    jumpTo: (h) => {
      let w;
      typeof h == "function" ? w = h({
        year: f.year(),
        month: f.month() + 1
      }) : w = h, d(Yo(w));
    },
    jumpToToday: () => {
      d(me().date(1));
    }
  }));
  const m = (h, w, E) => {
    const x = f[h](w, E);
    if (h === "subtract" && r.minPage) {
      const $ = Yo(r.minPage);
      if (x.isBefore($, E))
        return;
    }
    if (h === "add" && r.maxPage) {
      const $ = Yo(r.maxPage);
      if (x.isAfter($, E))
        return;
    }
    d(x);
  }, y = l.createElement("div", {
    className: `${he}-header`
  }, l.createElement("a", {
    className: `${he}-arrow-button ${he}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), l.createElement("a", {
    className: `${he}-arrow-button ${he}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), l.createElement("div", {
    className: `${he}-title`
  }, y9(i.Calendar.yearAndMonth, {
    year: f.year().toString(),
    month: (f.month() + 1).toString()
  })), l.createElement("a", {
    className: B(`${he}-arrow-button`, `${he}-arrow-button-right`, `${he}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), l.createElement("a", {
    className: B(`${he}-arrow-button`, `${he}-arrow-button-right`, `${he}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), v = ee(() => r.max && me(r.max), [r.max]), p = ee(() => r.min && me(r.min), [r.min]);
  function b() {
    var h;
    const w = [];
    let E = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); w.length < 6 * 7; ) {
      const x = E;
      let $ = !1, P = !1, S = !1, k = !1, D = !1;
      if (o) {
        const [_, R] = o;
        P = x.isSame(_, "day"), S = x.isSame(R, "day"), $ = P || S || x.isAfter(_, "day") && x.isBefore(R, "day"), $ && (k = (w.length % 7 === 0 || x.isSame(x.startOf("month"), "day")) && !P, D = (w.length % 7 === 6 || x.isSame(x.endOf("month"), "day")) && !S);
      }
      const I = x.month() === f.month(), T = r.shouldDisableDate ? r.shouldDisableDate(x.toDate()) : v && x.isAfter(v, "day") || p && x.isBefore(p, "day");
      w.push(l.createElement("div", {
        key: x.valueOf(),
        className: B(`${he}-cell`, (T || !I) && `${he}-cell-disabled`, I && {
          [`${he}-cell-today`]: x.isSame(n, "day"),
          [`${he}-cell-selected`]: $,
          [`${he}-cell-selected-begin`]: P,
          [`${he}-cell-selected-end`]: S,
          [`${he}-cell-selected-row-begin`]: k,
          [`${he}-cell-selected-row-end`]: D
        }),
        onClick: () => {
          if (!r.selectionMode || T)
            return;
          const _ = x.toDate();
          I || d(x.clone().date(1));
          function R() {
            if (!r.allowClear || !o)
              return !1;
            const [N, O] = o;
            return x.isSame(N, "date") && x.isSame(O, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && R()) {
              s(null);
              return;
            }
            s([_, _]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              s([_, _]), u(!0);
              return;
            }
            if (R()) {
              s(null), u(!1);
              return;
            }
            if (c) {
              const N = o[0];
              s(N > _ ? [_, N] : [N, _]), u(!1);
            } else
              s([_, _]), u(!0);
          }
        }
      }, l.createElement("div", {
        className: `${he}-cell-top`
      }, r.renderDate ? r.renderDate(x.toDate()) : x.date()), l.createElement("div", {
        className: `${he}-cell-bottom`
      }, (h = r.renderLabel) === null || h === void 0 ? void 0 : h.call(r, x.toDate())))), E = E.add(1, "day");
    }
    return w;
  }
  const g = l.createElement("div", {
    className: `${he}-cells`
  }, b()), C = l.createElement("div", {
    className: `${he}-mark`
  }, a.map((h, w) => l.createElement("div", {
    key: w,
    className: `${he}-mark-cell`
  }, h)));
  return Z(r, l.createElement("div", {
    className: he
  }, y, C, g));
}), Ki = "adm-divider", w9 = {
  contentPosition: "center",
  direction: "horizontal"
}, Rs = (e) => {
  const t = U(w9, e);
  return Z(t, l.createElement("div", {
    className: B(Ki, `${Ki}-${t.direction}`, `${Ki}-${t.contentPosition}`)
  }, t.children && l.createElement("div", {
    className: `${Ki}-content`
  }, t.children)));
};
var j1 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
    return function(n, r) {
      r.prototype.isSameOrBefore = function(i, a) {
        return this.isSame(i, a) || this.isBefore(i, a);
      };
    };
  });
})(j1);
var E9 = j1.exports;
const C9 = /* @__PURE__ */ lt(E9);
function tf(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function x9(e) {
  return me().year(e.year).month(e.month - 1).date(1);
}
me.extend(co);
me.extend(C9);
const _e = "adm-calendar-picker-view", $9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, _9 = fe((e, t) => {
  var n;
  const r = me(), i = U($9, e), {
    locale: a
  } = pe(), o = [...a.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const h = o.pop();
    h && o.unshift(h);
  }
  const [s, c] = te({
    value: i.value === void 0 ? void 0 : tf(i.selectionMode, i.value),
    defaultValue: tf(i.selectionMode, i.defaultValue),
    onChange: (h) => {
      var w, E;
      i.selectionMode === "single" ? (w = i.onChange) === null || w === void 0 || w.call(i, h ? h[0] : null) : i.selectionMode === "range" && ((E = i.onChange) === null || E === void 0 || E.call(i, h));
    }
  }), [u, f] = K(!1), [d, m] = K(() => me(s ? s[0] : r).date(1));
  ye(t, () => ({
    jumpTo: (h) => {
      let w;
      typeof h == "function" ? w = h({
        year: d.year(),
        month: d.month() + 1
      }) : w = h, m(x9(w));
    },
    jumpToToday: () => {
      m(me().date(1));
    },
    getDateRange: () => s
  }));
  const y = l.createElement("div", {
    className: `${_e}-header`
  }, l.createElement("div", {
    className: `${_e}-title`
  }, (n = i.title) !== null && n !== void 0 ? n : a.Calendar.title)), v = ee(() => i.max ? me(i.max) : d.add(6, "month"), [i.max, d]), p = ee(() => i.min ? me(i.min) : d, [i.min, d]);
  function b() {
    var h;
    const w = [];
    let E = p;
    for (; E.isSameOrBefore(v, "month"); ) {
      const x = E.year(), $ = E.month(), P = {
        year: x,
        month: $ + 1
      };
      w.push(l.createElement("div", {
        key: `${x}-${$}`
      }, l.createElement("div", {
        className: `${_e}-title`
      }, (h = a.Calendar.yearAndMonth) === null || h === void 0 ? void 0 : h.replace(/\${(.*?)}/g, (S, k) => {
        var D;
        return (D = P[k]) === null || D === void 0 ? void 0 : D.toString();
      })), l.createElement("div", {
        className: `${_e}-cells`
      }, Array(i.weekStartsOn === "Monday" ? E.date(1).isoWeekday() - 1 : E.date(1).isoWeekday()).fill(null).map((S, k) => l.createElement("div", {
        key: k,
        className: `${_e}-cell`
      })), Array(E.daysInMonth()).fill(null).map((S, k) => {
        var D;
        const I = E.date(k + 1);
        let T = !1, _ = !1, R = !1, N = !1, O = !1;
        if (s) {
          const [F, L] = s;
          _ = I.isSame(F, "day"), R = I.isSame(L, "day"), T = _ || R || I.isAfter(F, "day") && I.isBefore(L, "day"), T && (N = (w.length % 7 === 0 || I.isSame(I.startOf("month"), "day")) && !_, O = (w.length % 7 === 6 || I.isSame(I.endOf("month"), "day")) && !R);
        }
        const M = i.shouldDisableDate ? i.shouldDisableDate(I.toDate()) : v && I.isAfter(v, "day") || p && I.isBefore(p, "day"), A = () => {
          var F;
          const L = (F = i.renderTop) === null || F === void 0 ? void 0 : F.call(i, I.toDate());
          if (L)
            return L;
          if (i.selectionMode === "range") {
            if (_)
              return a.Calendar.start;
            if (R)
              return a.Calendar.end;
          }
          if (I.isSame(r, "day") && !T)
            return a.Calendar.today;
        };
        return l.createElement("div", {
          key: I.valueOf(),
          className: B(`${_e}-cell`, {
            [`${_e}-cell-today`]: I.isSame(r, "day"),
            [`${_e}-cell-selected`]: T,
            [`${_e}-cell-selected-begin`]: _,
            [`${_e}-cell-selected-end`]: R,
            [`${_e}-cell-selected-row-begin`]: N,
            [`${_e}-cell-selected-row-end`]: O,
            [`${_e}-cell-disabled`]: !!M
          }),
          onClick: () => {
            if (!i.selectionMode || M)
              return;
            const F = I.toDate();
            function L() {
              if (!i.allowClear || !s)
                return !1;
              const [W, H] = s;
              return I.isSame(W, "date") && I.isSame(H, "day");
            }
            if (i.selectionMode === "single") {
              if (i.allowClear && L()) {
                c(null);
                return;
              }
              c([F, F]);
            } else if (i.selectionMode === "range") {
              if (!s) {
                c([F, F]), f(!0);
                return;
              }
              if (L()) {
                c(null), f(!1);
                return;
              }
              if (u) {
                const W = s[0];
                c(W > F ? [F, W] : [W, F]), f(!1);
              } else
                c([F, F]), f(!0);
            }
          }
        }, l.createElement("div", {
          className: `${_e}-cell-top`
        }, A()), l.createElement("div", {
          className: `${_e}-cell-date`
        }, i.renderDate ? i.renderDate(I.toDate()) : I.date()), l.createElement("div", {
          className: `${_e}-cell-bottom`
        }, (D = i.renderBottom) === null || D === void 0 ? void 0 : D.call(i, I.toDate())));
      })))), E = E.add(1, "month");
    }
    return w;
  }
  const g = l.createElement("div", {
    className: `${_e}-body`
  }, b()), C = l.createElement("div", {
    className: `${_e}-mark`
  }, o.map((h, w) => l.createElement("div", {
    key: w,
    className: `${_e}-mark-cell`
  }, h)));
  return Z(i, l.createElement("div", {
    className: _e
  }, y, C, g));
}), Gi = "adm-calendar-picker", k9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, $k = fe((e, t) => {
  const n = U(k9, e), {
    locale: r
  } = pe(), i = t ?? j(null), {
    visible: a,
    confirmText: o,
    popupClassName: s,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: y,
    onMaskClick: v,
    getContainer: p
  } = n, b = yr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick", "getContainer"]), g = l.createElement("div", {
    className: `${Gi}-footer`
  }, l.createElement(Rs, null), l.createElement("div", {
    className: `${Gi}-footer-bottom`
  }, l.createElement(Wt, {
    color: "primary",
    onClick: () => {
      var C, h, w, E;
      const x = (h = (C = i.current) === null || C === void 0 ? void 0 : C.getDateRange()) !== null && h !== void 0 ? h : null;
      n.selectionMode === "single" ? (w = n.onConfirm) === null || w === void 0 || w.call(n, x ? x[0] : null) : n.selectionMode === "range" && ((E = n.onConfirm) === null || E === void 0 || E.call(n, x)), m == null || m();
    }
  }, o ?? r.Calendar.confirm)));
  return Z(n, l.createElement("div", {
    className: Gi
  }, l.createElement(Pr, {
    visible: a,
    className: B(`${Gi}-popup`, s),
    showCloseButton: !0,
    forceRender: t ? !0 : f,
    style: c,
    bodyStyle: Object.assign({
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      minHeight: "80vh",
      overflow: "auto"
    }, u),
    onClose: m,
    onMaskClick: () => {
      v == null || v(), d && (m == null || m());
    },
    getContainer: p
  }, l.createElement(_9, Object.assign({
    ref: i
  }, b)), g)));
});
function Ri(e, t) {
  const n = zt(e);
  Se(() => {
    const r = t.current;
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
  }, [t]);
}
function Hl(e, t, n) {
  const r = zt(e);
  Y(() => {
    const i = new MutationObserver(() => {
      r();
    });
    if (t.current)
      return i.observe(t.current, n), () => {
        i.disconnect();
      };
  }, [t]);
}
function $e(e, t, n) {
  let r = e;
  return t !== void 0 && (r = Math.max(e, t)), n !== void 0 && (r = Math.min(r, n)), r;
}
const B1 = (e, t) => {
  const [{
    scrollLeft: n
  }, r] = Pe(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  }));
  function i(a = !1) {
    const o = e.current;
    if (!o || t === void 0)
      return;
    const c = o.children.item(t).children.item(0), u = c.offsetLeft, f = c.offsetWidth, d = o.offsetWidth, m = o.scrollWidth, y = o.scrollLeft;
    if (m - d <= 0)
      return;
    const p = $e(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: p,
      from: {
        scrollLeft: y
      },
      immediate: a && !n.isAnimating
    });
  }
  return Se(() => {
    i(!0);
  }, []), Ti(() => {
    i();
  }, [t]), Hl(() => {
    i(!0);
  }, e, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
}, Yi = "adm-scroll-mask", W1 = (e) => {
  const t = j(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Pe(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: a
  } = Ka((o = !1) => {
    if (!t.current)
      return;
    const c = e.scrollTrackRef.current;
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
  return Y(() => {
    a(!0);
  }, []), Y(() => {
    const o = e.scrollTrackRef.current;
    if (o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), l.createElement(l.Fragment, null, l.createElement(ve.div, {
    ref: t,
    className: B(Yi, `${Yi}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(ve.div, {
    className: B(Yi, `${Yi}-right`),
    style: {
      opacity: r
    }
  }));
};
var Z1 = { exports: {} }, oe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zl = Symbol.for("react.element"), Ul = Symbol.for("react.portal"), uo = Symbol.for("react.fragment"), fo = Symbol.for("react.strict_mode"), mo = Symbol.for("react.profiler"), ho = Symbol.for("react.provider"), vo = Symbol.for("react.context"), O9 = Symbol.for("react.server_context"), po = Symbol.for("react.forward_ref"), go = Symbol.for("react.suspense"), yo = Symbol.for("react.suspense_list"), bo = Symbol.for("react.memo"), wo = Symbol.for("react.lazy"), S9 = Symbol.for("react.offscreen"), H1;
H1 = Symbol.for("react.module.reference");
function ct(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case zl:
        switch (e = e.type, e) {
          case uo:
          case mo:
          case fo:
          case go:
          case yo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case O9:
              case vo:
              case po:
              case wo:
              case bo:
              case ho:
                return e;
              default:
                return t;
            }
        }
      case Ul:
        return t;
    }
  }
}
oe.ContextConsumer = vo;
oe.ContextProvider = ho;
oe.Element = zl;
oe.ForwardRef = po;
oe.Fragment = uo;
oe.Lazy = wo;
oe.Memo = bo;
oe.Portal = Ul;
oe.Profiler = mo;
oe.StrictMode = fo;
oe.Suspense = go;
oe.SuspenseList = yo;
oe.isAsyncMode = function() {
  return !1;
};
oe.isConcurrentMode = function() {
  return !1;
};
oe.isContextConsumer = function(e) {
  return ct(e) === vo;
};
oe.isContextProvider = function(e) {
  return ct(e) === ho;
};
oe.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === zl;
};
oe.isForwardRef = function(e) {
  return ct(e) === po;
};
oe.isFragment = function(e) {
  return ct(e) === uo;
};
oe.isLazy = function(e) {
  return ct(e) === wo;
};
oe.isMemo = function(e) {
  return ct(e) === bo;
};
oe.isPortal = function(e) {
  return ct(e) === Ul;
};
oe.isProfiler = function(e) {
  return ct(e) === mo;
};
oe.isStrictMode = function(e) {
  return ct(e) === fo;
};
oe.isSuspense = function(e) {
  return ct(e) === go;
};
oe.isSuspenseList = function(e) {
  return ct(e) === yo;
};
oe.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === uo || e === mo || e === fo || e === go || e === yo || e === S9 || typeof e == "object" && e !== null && (e.$$typeof === wo || e.$$typeof === bo || e.$$typeof === ho || e.$$typeof === vo || e.$$typeof === po || e.$$typeof === H1 || e.getModuleId !== void 0);
};
oe.typeOf = ct;
Z1.exports = oe;
var Ms = Z1.exports;
function mn(e, t) {
  let n = 0;
  function r(i) {
    l.Children.forEach(i, (a) => {
      Ms.isFragment(a) ? r(a.props.children) : (t(a, n), n += 1);
    });
  }
  r(e);
}
const Kt = "adm-capsule-tabs", F9 = () => null, N9 = (e) => {
  var t;
  const n = j(null), r = j(null), i = {};
  let a = null;
  const o = [];
  mn(e.children, (d, m) => {
    if (!Vn(d))
      return;
    const y = d.key;
    if (typeof y != "string")
      return;
    m === 0 && (a = y);
    const v = o.push(d);
    i[y] = v - 1;
  });
  const [s, c] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = e.onChange) === null || m === void 0 || m.call(e, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = B1(n, i[s]);
  return Ri(() => {
    f(!0);
  }, r), Z(e, l.createElement("div", {
    className: Kt,
    ref: r
  }, l.createElement("div", {
    className: `${Kt}-header`
  }, l.createElement(W1, {
    scrollTrackRef: n
  }), l.createElement(ve.div, {
    className: `${Kt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => Z(d.props, l.createElement("div", {
    key: d.key,
    className: `${Kt}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${Kt}-tab`, {
      [`${Kt}-tab-active`]: d.key === s,
      [`${Kt}-tab-disabled`]: d.props.disabled
    })
  }, d.props.title)))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === s;
    return l.createElement(Fr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Kt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, _k = ie(N9, {
  Tab: F9
}), Xi = "adm-card", kk = (e) => {
  const t = () => e.title || e.extra ? l.createElement("div", {
    className: B(`${Xi}-header`, e.headerClassName),
    style: e.headerStyle,
    onClick: e.onHeaderClick
  }, l.createElement("div", {
    className: `${Xi}-header-title`
  }, e.title), e.extra) : null, n = () => e.children ? l.createElement("div", {
    className: B(`${Xi}-body`, e.bodyClassName),
    style: e.bodyStyle,
    onClick: e.onBodyClick
  }, e.children) : null;
  return Z(e, l.createElement("div", {
    className: Xi,
    onClick: e.onClick
  }, t(), n()));
};
function nf(e, t, n) {
  return e * t * n / (t + n * e);
}
function gi(e, t, n, r, i = 0.15) {
  return i === 0 ? $e(e, t, n) : e < t ? -nf(t - e, r, i) + t : e > n ? +nf(e - n, r, i) + n : e;
}
function z1(e) {
  if (e == null || e === "")
    return 0;
  const t = e.trim();
  return t.endsWith("px") ? parseFloat(t) : t.endsWith("rem") ? parseFloat(t) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : t.endsWith("vw") ? parseFloat(t) * window.innerWidth / 100 : 0;
}
const At = "adm-picker-view", U1 = Ve((e) => {
  const {
    value: t,
    column: n,
    renderLabel: r
  } = e;
  function i(g) {
    e.onSelect(g, e.index);
  }
  const [{
    y: a
  }, o] = Pe(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), s = j(!1), c = j(null), u = j(null), f = j(34);
  Se(() => {
    const g = u.current;
    g && (f.current = z1(window.getComputedStyle(g).getPropertyValue("height")));
  }), Se(() => {
    if (s.current || t === null)
      return;
    const g = n.findIndex((h) => h.value === t);
    if (g < 0)
      return;
    const C = g * -f.current;
    o.start({
      y: C,
      immediate: a.goal !== C
    });
  }, [t, n]), Se(() => {
    if (n.length === 0)
      t !== null && i(null);
    else if (!n.some((g) => g.value === t)) {
      const g = n[0];
      i(g.value);
    }
  }, [n, t]);
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
  }, y = (g) => {
    s.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: w,
      last: E,
      velocity: x,
      offset: $
    } = m(g);
    if (E) {
      s.current = !1;
      const P = $ + x * w * 50, S = $e(P, C, h), k = -Math.round(S / f.current);
      d(k);
    } else {
      const P = $;
      o.start({
        y: gi(P, C, h, f.current * 50, 0.2)
      });
    }
  }, v = (g) => {
    s.current = !0;
    const C = -((n.length - 1) * f.current), h = 0, {
      direction: w,
      last: E,
      velocity: x,
      distance: $
    } = m(g), P = -w, S = a.get();
    if (E) {
      s.current = !1;
      const k = x * P * 50, D = S + $ * P + k, I = $e(D, C, h), T = -Math.round(I / f.current);
      d(T);
    } else {
      const k = S + $ * P;
      o.start({
        y: gi(k, C, h, f.current * 50, 0.2)
      });
    }
  };
  Pt((g) => {
    g.event.stopPropagation(), y(g);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), j8((g) => {
    g.event.stopPropagation(), v(g);
  }, {
    target: e.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Rn ? {
      passive: !1
    } : void 0
  });
  let p = null;
  function b() {
    if (p === null)
      return null;
    const g = n[p], C = p - 1, h = p + 1, w = n[C], E = n[h];
    return l.createElement("div", {
      className: `${At}-column-accessible`
    }, l.createElement("div", {
      className: `${At}-column-accessible-current`,
      role: "button",
      "aria-label": g ? `当前选择的是：${g.label}` : "当前未选择"
    }, "-"), l.createElement("div", {
      className: `${At}-column-accessible-button`,
      onClick: () => {
        w && d(C);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `选择上一项：${w.label}` : "没有上一项"
    }, "-"), l.createElement("div", {
      className: `${At}-column-accessible-button`,
      onClick: () => {
        E && d(h);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `选择下一项：${E.label}` : "没有下一项"
    }, "-"));
  }
  return l.createElement("div", {
    className: `${At}-column`
  }, l.createElement("div", {
    className: `${At}-item-height-measure`,
    ref: u
  }), l.createElement(ve.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${At}-column-wheel`,
    "aria-hidden": !0
  }, n.map((g, C) => {
    var h;
    const w = e.value === g.value;
    w && (p = C);
    function E() {
      s.current = !1, d(C);
    }
    return l.createElement("div", {
      key: (h = g.key) !== null && h !== void 0 ? h : g.value,
      "data-selected": g.value === t,
      className: `${At}-column-item`,
      onClick: E,
      "aria-hidden": !w,
      "aria-label": w ? "active" : ""
    }, l.createElement("div", {
      className: `${At}-column-item-label`
    }, r(g)));
  })), b());
}, (e, t) => !(e.index !== t.index || e.value !== t.value || e.onSelect !== t.onSelect || e.renderLabel !== t.renderLabel || e.mouseWheel !== t.mouseWheel || !c6(e.column, t.column)));
U1.displayName = "Wheel";
function rf(e) {
  let t = null;
  return () => (t === null && (t = e()), t);
}
function q1(e, t) {
  const n = rf(() => (typeof e == "function" ? e(t) : e).map((o) => o.map((s) => typeof s == "string" ? {
    label: s,
    value: s
  } : s))), r = rf(() => t.map((a, o) => {
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
function K1(e, t) {
  return ee(() => q1(e, t), [e, t]);
}
const G1 = (e) => e.label;
var Y1 = { exports: {} }, X1 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fr = l;
function P9(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var A9 = typeof Object.is == "function" ? Object.is : P9, T9 = fr.useState, R9 = fr.useEffect, M9 = fr.useLayoutEffect, I9 = fr.useDebugValue;
function L9(e, t) {
  var n = t(), r = T9({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, a = r[1];
  return M9(function() {
    i.value = n, i.getSnapshot = t, Xo(i) && a({ inst: i });
  }, [e, n, t]), R9(function() {
    return Xo(i) && a({ inst: i }), e(function() {
      Xo(i) && a({ inst: i });
    });
  }, [e]), I9(n), n;
}
function Xo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !A9(e, n);
  } catch {
    return !0;
  }
}
function D9(e, t) {
  return t();
}
var V9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? D9 : L9;
X1.useSyncExternalStore = fr.useSyncExternalStore !== void 0 ? fr.useSyncExternalStore : V9;
Y1.exports = X1;
var j9 = Y1.exports;
let ql = !1;
const Is = /* @__PURE__ */ new Set();
function Q1() {
  Is.forEach((e) => {
    e();
  });
}
function Ok() {
  ql = !0, Q1(), ot.assign({
    skipAnimation: !0
  });
}
function Sk() {
  ql = !1, Q1(), ot.assign({
    skipAnimation: !1
  });
}
function af() {
  return ql;
}
function B9(e) {
  return Is.add(e), () => {
    Is.delete(e);
  };
}
function W9() {
  return j9.useSyncExternalStore(B9, af, af);
}
const Qo = "adm-spin-loading", Z9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, H9 = {
  color: "default"
}, z9 = 15 * 3.14159265358979 * 2, Kl = Ve((e) => {
  var t;
  const n = U(H9, e), r = W9(), {
    percent: i
  } = Pe({
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
  return Z(n, l.createElement(ve.div, {
    className: Qo,
    style: {
      "--color": (t = Z9[n.color]) !== null && t !== void 0 ? t : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${Qo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(ve.circle, {
    className: `${Qo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: z9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), nr = "adm-picker-view", U9 = {
  defaultValue: [],
  renderLabel: G1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${nr}-loading-content`
  }, l.createElement(Kl, null))
}, Eo = Ve((e) => {
  const t = U(U9, e), [n, r] = K(t.value === void 0 ? t.defaultValue : t.value);
  Y(() => {
    t.value !== void 0 && t.value !== n && r(t.value);
  }, [t.value]), Y(() => {
    if (t.value === n)
      return;
    const s = window.setTimeout(() => {
      t.value !== void 0 && t.value !== n && r(t.value);
    }, 1e3);
    return () => {
      window.clearTimeout(s);
    };
  }, [t.value, n]);
  const i = K1(t.columns, n), a = i.columns;
  b3(() => {
    var s;
    t.value !== n && ((s = t.onChange) === null || s === void 0 || s.call(t, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = He((s, c) => {
    r((u) => {
      const f = [...u];
      return f[c] = s, f;
    });
  }, []);
  return Z(t, l.createElement("div", {
    className: `${nr}`
  }, t.loading ? t.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(U1, {
    key: c,
    index: c,
    column: s,
    value: n[c],
    onSelect: o,
    renderLabel: t.renderLabel,
    mouseWheel: t.mouseWheel
  })), l.createElement("div", {
    className: `${nr}-mask`
  }, l.createElement("div", {
    className: `${nr}-mask-top`
  }), l.createElement("div", {
    className: `${nr}-mask-middle`
  }), l.createElement("div", {
    className: `${nr}-mask-bottom`
  })))));
});
Eo.displayName = "PickerView";
const Gt = "adm-picker", q9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: G1,
  destroyOnClose: !1,
  forceRender: !1
}, Gl = Ve(fe((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U(q9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (b) => {
      var g;
      b === !1 && ((g = i.onClose) === null || g === void 0 || g.call(i));
    }
  }), s = {
    toggle: () => {
      o((b) => !b);
    },
    open: () => {
      o(!0);
    },
    close: () => {
      o(!1);
    }
  };
  ye(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (b) => {
      var g;
      const C = q1(i.columns, b);
      (g = i.onConfirm) === null || g === void 0 || g.call(i, b, C);
    }
  })), f = K1(i.columns, c), [d, m] = K(c);
  Y(() => {
    d !== c && m(c);
  }, [a]), Y(() => {
    a || m(c);
  }, [c]);
  const y = zt((b, g) => {
    var C;
    m(b), a && ((C = i.onSelect) === null || C === void 0 || C.call(i, b, g));
  }), v = Z(i, l.createElement("div", {
    className: Gt
  }, l.createElement("div", {
    className: `${Gt}-header`
  }, l.createElement("a", {
    role: "button",
    className: `${Gt}-header-button`,
    onClick: () => {
      var b;
      (b = i.onCancel) === null || b === void 0 || b.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${Gt}-header-title`
  }, i.title), l.createElement("a", {
    role: "button",
    className: B(`${Gt}-header-button`, i.loading && `${Gt}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(d, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), l.createElement("div", {
    className: `${Gt}-body`
  }, l.createElement(Eo, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: y
  })))), p = l.createElement(Pr, {
    style: i.popupStyle,
    className: B(`${Gt}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var b;
      i.closeOnMaskClick && ((b = i.onCancel) === null || b === void 0 || b.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, v, l.createElement(Ar, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, p, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, s));
}));
Gl.displayName = "Picker";
function K9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(Gl, Object.assign({}, e, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = e.onConfirm) === null || c === void 0 || c.call(e, o, s), t(o);
        },
        onClose: () => {
          var o;
          (o = e.onClose) === null || o === void 0 || o.call(e), a(!1), t(null);
        },
        afterClose: () => {
          var o;
          (o = e.afterClose) === null || o === void 0 || o.call(e), r();
        }
      }));
    }, r = Ai(l.createElement(n, null));
  });
}
const J1 = ie(Gl, {
  prompt: K9
});
function e0(e) {
  const t = ee(() => {
    let n = 0;
    function r(i, a) {
      a > n && (n = a);
      const o = a + 1;
      i.forEach((s) => {
        s.children && r(s.children, o);
      });
    }
    return r(e, 1), n;
  }, [e]);
  return (n) => {
    const r = [];
    let i = e, a = 0;
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
    for (; a < t - 1; )
      r.push([]), a++;
    return r;
  };
}
const t0 = fe((e, t) => {
  const {
    options: n
  } = e, r = yr(e, ["options"]), i = e0(n);
  return l.createElement(J1, Object.assign({}, r, {
    ref: t,
    columns: i
  }));
});
function G9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(t0, Object.assign({}, e, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = e.onConfirm) === null || c === void 0 || c.call(e, o, s), t(o);
        },
        onClose: () => {
          var o;
          (o = e.onClose) === null || o === void 0 || o.call(e), a(!1), t(null);
        },
        afterClose: () => {
          var o;
          (o = e.afterClose) === null || o === void 0 || o.call(e), r();
        }
      }));
    }, r = Ai(l.createElement(n, null));
  });
}
const Fk = ie(t0, {
  prompt: G9
}), Nk = (e) => {
  const {
    options: t
  } = e, n = yr(e, ["options"]), r = e0(t);
  return l.createElement(Eo, Object.assign({}, n, {
    columns: r
  }));
}, je = "adm-tabs", Y9 = () => null, X9 = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, Q9 = (e) => {
  var t;
  const n = U(X9, e), r = j(null), i = j(null), a = {};
  let o = null;
  const s = [], c = n.direction === "rtl";
  mn(n.children, (E, x) => {
    if (!Vn(E))
      return;
    const $ = E.key;
    if (typeof $ != "string")
      return;
    x === 0 && (o = $);
    const P = s.push(E);
    a[$] = P - 1;
  });
  const [u, f] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : o,
    onChange: (E) => {
      var x;
      E !== null && ((x = n.onChange) === null || x === void 0 || x.call(n, E));
    }
  }), [{
    x: d,
    width: m
  }, y] = Pe(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: v
  }, p] = Pe(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: b,
    rightMaskOpacity: g
  }, C] = Pe(() => ({
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
    const P = a[u];
    if (P === void 0) {
      y.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const S = i.current;
    if (!S)
      return;
    const k = $.children.item(P + 1), D = k.children.item(0), I = D.offsetLeft, T = D.offsetWidth, _ = k.offsetLeft, R = k.offsetWidth, N = $.offsetWidth, O = $.scrollWidth, M = $.scrollLeft, A = S.offsetWidth;
    let F = 0, L = 0;
    if (n.activeLineMode === "auto" ? (F = I, L = T) : n.activeLineMode === "full" ? (F = _, L = R) : F = I + (T - A) / 2, c) {
      const q = ["auto", "full"].includes(n.activeLineMode) ? L : A;
      F = -(N - F - q);
    }
    y.start({
      x: F,
      width: L,
      immediate: E
    });
    const W = O - N;
    if (W <= 0)
      return;
    let H = 0;
    c ? H = -$e(N / 2 - I + T / 2 - A, 0, W) : H = $e(I - (N - T) / 2, 0, W), (!x || n.autoScroll !== !1) && p.start({
      scrollLeft: H,
      from: {
        scrollLeft: M
      },
      immediate: E
    });
  }
  Se(() => {
    h(!d.isAnimating);
  }, []), Ti(() => {
    h();
  }, [u]), Ri(() => {
    h(!d.isAnimating);
  }, r), Hl(() => {
    h(!d.isAnimating, !0);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: w
  } = Ka((E = !1) => {
    const x = r.current;
    if (!x)
      return;
    const $ = x.scrollLeft;
    let P = !1, S = !1;
    c ? (P = Math.round(-$) + x.offsetWidth < x.scrollWidth, S = $ < 0) : (P = $ > 0, S = $ + x.offsetWidth < x.scrollWidth), C.start({
      leftMaskOpacity: P ? 1 : 0,
      rightMaskOpacity: S ? 1 : 0,
      immediate: E
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Se(() => {
    w(!0);
  }, []), Z(n, l.createElement("div", {
    className: je,
    style: {
      direction: n.direction
    }
  }, l.createElement("div", {
    className: `${je}-header`
  }, l.createElement(ve.div, {
    className: B(`${je}-header-mask`, `${je}-header-mask-left`),
    style: {
      opacity: b
    }
  }), l.createElement(ve.div, {
    className: B(`${je}-header-mask`, `${je}-header-mask-right`),
    style: {
      opacity: g
    }
  }), l.createElement(ve.div, {
    className: `${je}-tab-list`,
    ref: r,
    scrollLeft: v,
    onScroll: w,
    role: "tablist"
  }, l.createElement(ve.div, {
    ref: i,
    className: `${je}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), s.map((E) => Z(E.props, l.createElement("div", {
    key: E.key,
    className: B(`${je}-tab-wrapper`, {
      [`${je}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: x
      } = E;
      E.props.disabled || x != null && f(x.toString());
    },
    className: B(`${je}-tab`, {
      [`${je}-tab-active`]: E.key === u,
      [`${je}-tab-disabled`]: E.props.disabled
    }),
    role: "tab",
    "aria-selected": E.key === u
  }, E.props.title)))))), s.map((E) => {
    if (E.props.children === void 0)
      return null;
    const x = E.key === u;
    return l.createElement(Fr, {
      key: E.key,
      active: x,
      forceRender: E.props.forceRender,
      destroyOnClose: E.props.destroyOnClose
    }, l.createElement("div", {
      className: `${je}-content`,
      style: {
        display: x ? "block" : "none"
      }
    }, E.props.children));
  })));
}, of = ie(Q9, {
  Tab: Y9
}), Br = "adm-list", J9 = {
  mode: "default"
}, eb = fe((e, t) => {
  const n = U(J9, e), r = j(null);
  return ye(t, () => ({
    get nativeElement() {
      return r.current;
    }
  })), Z(n, l.createElement("div", {
    className: B(Br, `${Br}-${n.mode}`),
    ref: r
  }, n.header && l.createElement("div", {
    className: `${Br}-header`
  }, n.header), l.createElement("div", {
    className: `${Br}-body`
  }, l.createElement("div", {
    className: `${Br}-body-inner`
  }, n.children))));
});
function jt(e) {
  return e != null && e !== !1;
}
const Tt = "adm-list-item", tb = (e) => {
  var t;
  const n = (t = e.clickable) !== null && t !== void 0 ? t : !!e.onClick, r = e.arrow === void 0 ? n : e.arrow, i = l.createElement("div", {
    className: `${Tt}-content`
  }, jt(e.prefix) && l.createElement("div", {
    className: `${Tt}-content-prefix`
  }, e.prefix), l.createElement("div", {
    className: `${Tt}-content-main`
  }, jt(e.title) && l.createElement("div", {
    className: `${Tt}-title`
  }, e.title), e.children, jt(e.description) && l.createElement("div", {
    className: `${Tt}-description`
  }, e.description)), jt(e.extra) && l.createElement("div", {
    className: `${Tt}-content-extra`
  }, e.extra), jt(r) && l.createElement("div", {
    className: `${Tt}-content-arrow`
  }, r === !0 ? l.createElement(Vy, null) : r));
  return Z(e, l.createElement(n ? "a" : "div", {
    className: B(`${Tt}`, n ? ["adm-plain-anchor"] : [], e.disabled && `${Tt}-disabled`),
    onClick: e.disabled ? void 0 : e.onClick
  }, i));
}, kt = ie(eb, {
  Item: tb
}), n0 = ll(null), nb = "adm-check-list", rb = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(g1, null)
}, ib = (e) => {
  const t = U(rb, e), [n, r] = te(t);
  function i(f) {
    t.multiple ? r([...n, f]) : r([f]);
  }
  function a(f) {
    r(n.filter((d) => d !== f));
  }
  const {
    activeIcon: o,
    extra: s,
    disabled: c,
    readOnly: u
  } = t;
  return l.createElement(n0.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: a,
      activeIcon: o,
      extra: s,
      disabled: c,
      readOnly: u
    }
  }, Z(t, l.createElement(kt, {
    mode: t.mode,
    className: nb
  }, t.children)));
}, Qi = "adm-check-list-item", ab = (e) => {
  const t = at(n0);
  if (t === null)
    return null;
  const n = t.value.includes(e.value), r = e.readOnly || t.readOnly, i = n ? t.activeIcon : null, a = t.extra ? t.extra(n) : i, o = l.createElement("div", {
    className: `${Qi}-extra`
  }, a);
  return Z(e, l.createElement(kt.Item, {
    title: e.title,
    className: B(Qi, r && `${Qi}-readonly`, n && `${Qi}-active`),
    description: e.description,
    prefix: e.prefix,
    onClick: (s) => {
      var c;
      r || (n ? t.uncheck(e.value) : t.check(e.value), (c = e.onClick) === null || c === void 0 || c.call(e, s));
    },
    arrow: !1,
    clickable: !r,
    extra: o,
    disabled: e.disabled || t.disabled
  }, e.children));
}, sf = ie(ib, {
  Item: ab
});
var r0 = wl, ob = "Expected a function";
function Yl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(ob);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = e.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Yl.Cache || r0)(), n;
}
Yl.Cache = r0;
var sb = Yl;
const lf = /* @__PURE__ */ lt(sb);
function i0(e, t) {
  const {
    valueName: n,
    childrenName: r
  } = t, i = ee(() => lf((s) => {
    const c = [];
    let u = e;
    for (const f of s) {
      const d = u.find((m) => m[n] === f);
      if (!d || (c.push(d), !d[r]))
        break;
      u = d[r];
    }
    return c;
  }, (s) => JSON.stringify(s)), [e]), a = ee(() => lf((s) => s.reduce((u, f) => {
    var d;
    return ((d = u.find((m) => m[n] === f)) === null || d === void 0 ? void 0 : d[r]) || [];
  }, e).length === 0, (s) => JSON.stringify(s)), [e]);
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
const Xl = [];
function lb(e, t) {
  const n = [];
  for (let r = e; r <= t; r++)
    n.push(r);
  return n;
}
const yi = "adm-skeleton", Ql = (e) => Z(e, l.createElement("div", {
  className: B(yi, {
    [`${yi}-animated`]: e.animated
  })
})), cb = (e) => Z(e, l.createElement(Ql, {
  animated: e.animated,
  className: `${yi}-title`
})), ub = {
  lineCount: 3
}, fb = (e) => {
  const t = U(ub, e), n = lb(1, t.lineCount), r = l.createElement("div", {
    className: `${yi}-paragraph`
  }, n.map((i) => l.createElement(Ql, {
    key: i,
    animated: t.animated,
    className: `${yi}-paragraph-line`
  })));
  return Z(t, r);
}, Ji = ie(Ql, {
  Title: cb,
  Paragraph: fb
}), Mi = (e = {}) => ee(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = e;
  return [n, r, a, i];
}, [JSON.stringify(e)]), mt = "adm-cascader-view", db = {
  defaultValue: []
}, mb = (e) => {
  const t = U(db, e), {
    locale: n
  } = pe(), [r, i, a, o] = Mi(t.fieldNames), s = i0(t.options, {
    valueName: i,
    childrenName: a
  }), [c, u] = te(Object.assign(Object.assign({}, t), {
    onChange: (b) => {
      var g;
      (g = t.onChange) === null || g === void 0 || g.call(t, b, s(b));
    }
  })), [f, d] = K(0), m = ee(() => {
    const b = [];
    let g = t.options, C = !1;
    for (const h of c) {
      const w = g.find((E) => E[i] === h);
      if (b.push({
        selected: w,
        options: g
      }), !w || !w[a]) {
        C = !0;
        break;
      }
      g = w[a];
    }
    return C || b.push({
      selected: void 0,
      options: g
    }), b;
  }, [c, t.options]);
  pl(() => {
    var b;
    (b = t.onTabsChange) === null || b === void 0 || b.call(t, f);
  }, [f]), Y(() => {
    d(m.length - 1);
  }, [c]), Y(() => {
    const b = m.length - 1;
    f > b && d(b);
  }, [f, m]);
  const y = (b, g) => {
    const C = c.slice(0, g);
    b !== void 0 && (C[g] = b), u(C);
  }, v = (b) => t.loading || b === Xl, p = t.placeholder || n.Cascader.placeholder;
  return Z(t, l.createElement("div", {
    className: mt
  }, l.createElement(of, {
    activeKey: f.toString(),
    onChange: (b) => {
      const g = parseInt(b);
      d(g);
    },
    stretch: !1,
    className: `${mt}-tabs`
  }, m.map((b, g) => {
    const C = b.selected;
    return l.createElement(of.Tab, {
      key: g.toString(),
      title: l.createElement("div", {
        className: `${mt}-header-title`
      }, C ? C[r] : typeof p == "function" ? p(g) : p),
      forceRender: !0
    }, l.createElement("div", {
      className: `${mt}-content`
    }, v(b.options) ? l.createElement("div", {
      className: `${mt}-skeleton`
    }, l.createElement(Ji, {
      className: `${mt}-skeleton-line-1`,
      animated: !0
    }), l.createElement(Ji, {
      className: `${mt}-skeleton-line-2`,
      animated: !0
    }), l.createElement(Ji, {
      className: `${mt}-skeleton-line-3`,
      animated: !0
    }), l.createElement(Ji, {
      className: `${mt}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(sf, {
      value: [c[g]],
      onChange: (h) => y(h[0], g),
      activeIcon: t.activeIcon
    }, b.options.map((h) => {
      const w = c[g] === h[i];
      return l.createElement(sf.Item, {
        value: h[i],
        key: h[i],
        disabled: h[o],
        className: B(`${mt}-item`, {
          [`${mt}-item-active`]: w
        })
      }, h[r]);
    }))));
  }))));
}, hb = ie(mb, {
  optionSkeleton: Xl
}), qn = "adm-cascader", vb = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, a0 = fe((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U(vb, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, e), [a, o] = te({
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
  ye(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var C;
      (C = i.onConfirm) === null || C === void 0 || C.call(i, g, m(g));
    }
  })), [, f, d] = Mi(i.fieldNames), m = i0(i.options, {
    valueName: f,
    childrenName: d
  }), [y, v] = K(c);
  Y(() => {
    a || v(c);
  }, [a, c]);
  const p = Z(i, l.createElement("div", {
    className: qn
  }, l.createElement("div", {
    className: `${qn}-header`
  }, l.createElement("a", {
    className: `${qn}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${qn}-header-title`
  }, i.title), l.createElement("a", {
    className: `${qn}-header-button`,
    onClick: () => {
      u(y, !0), o(!1);
    }
  }, i.confirmText)), l.createElement("div", {
    className: `${qn}-body`
  }, l.createElement(hb, Object.assign({}, i, {
    value: y,
    onChange: (g, C) => {
      var h;
      v(g), a && ((h = i.onSelect) === null || h === void 0 || h.call(i, g, C));
    }
  }))))), b = l.createElement(Pr, {
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
  }, p);
  return l.createElement(l.Fragment, null, b, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, m(c).items, s));
});
function pb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(a0, Object.assign({}, e, {
        visible: i,
        onConfirm: (o, s) => {
          var c;
          (c = e.onConfirm) === null || c === void 0 || c.call(e, o, s), t(o);
        },
        onClose: () => {
          var o;
          (o = e.onClose) === null || o === void 0 || o.call(e), a(!1), t(null);
        },
        afterClose: () => {
          var o;
          (o = e.afterClose) === null || o === void 0 || o.call(e), r();
        }
      }));
    }, r = Ai(l.createElement(n, null));
  });
}
const Pk = ie(a0, {
  prompt: pb,
  optionSkeleton: Xl
}), Wr = "adm-center-popup", gb = Object.assign(Object.assign({}, Dl), {
  getContainer: null
}), o0 = (e) => {
  const t = U(gb, e), n = El(), r = Pe({
    scale: t.visible ? 1 : 0.8,
    opacity: t.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: !0
    },
    onRest: () => {
      var f, d;
      n.current || (a(t.visible), t.visible ? (f = t.afterShow) === null || f === void 0 || f.call(t) : (d = t.afterClose) === null || d === void 0 || d.call(t));
    }
  }), [i, a] = K(t.visible);
  Se(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = j(null);
  Ga(o, t.disableBodyScroll && i);
  const s = C1(i && t.visible), c = l.createElement("div", {
    className: B(`${Wr}-body`, t.bodyClassName),
    style: t.bodyStyle
  }, t.children), u = ln(t.stopPropagation, Z(t, l.createElement("div", {
    className: Wr,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, t.mask && l.createElement(Fi, {
    visible: s,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (f) => {
      var d, m;
      (d = t.onMaskClick) === null || d === void 0 || d.call(t, f), t.closeOnMaskClick && ((m = t.onClose) === null || m === void 0 || m.call(t));
    },
    style: t.maskStyle,
    className: B(`${Wr}-mask`, t.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement("div", {
    className: `${Wr}-wrap`,
    role: t.role,
    "aria-label": t["aria-label"]
  }, l.createElement(ve.div, {
    style: Object.assign(Object.assign({}, r), {
      pointerEvents: r.opacity.to((f) => f === 1 ? "unset" : "none")
    }),
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: B(`${Wr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var f;
      (f = t.onClose) === null || f === void 0 || f.call(t);
    }
  }, l.createElement(Ni, null)), c)))));
  return l.createElement(Fr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, Sr(t.getContainer, u));
}, s0 = ll(null), yb = {
  disabled: !1,
  defaultValue: []
}, bb = (e) => {
  const t = U(yb, e), [n, r] = te(t);
  return l.createElement(
    s0.Provider,
    {
      // TODO: 性能优化
      value: {
        value: n,
        disabled: t.disabled,
        check: (i) => {
          r([...n, i]);
        },
        uncheck: (i) => {
          r(n.filter((a) => a !== i));
        }
      }
    },
    t.children
  );
}, l0 = Ve((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), wb = Ve((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), c0 = (e) => {
  const t = j(null), n = zt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== e.checked && e.onChange(i);
  });
  return Y(() => {
    if (e.disabled || !t.current)
      return;
    const r = t.current;
    return r.addEventListener("click", n), () => {
      r.removeEventListener("click", n);
    };
  }, [e.disabled, e.onChange]), l.createElement("input", {
    ref: t,
    type: e.type,
    checked: e.checked,
    onChange: () => {
    },
    disabled: e.disabled,
    id: e.id
  });
}, Yt = "adm-checkbox", Eb = {
  defaultChecked: !1,
  indeterminate: !1
}, Cb = fe((e, t) => {
  const n = at(s0), r = U(Eb, e);
  let [i, a] = te({
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
  }, o = o || n.disabled), ye(t, () => ({
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
    className: `${Yt}-custom-icon`
  }, r.icon(i, r.indeterminate)) : l.createElement("div", {
    className: `${Yt}-icon`
  }, r.indeterminate ? l.createElement(wb, null) : i && l.createElement(l0, null));
  return Z(r, l.createElement("label", {
    onClick: r.onClick,
    className: B(Yt, {
      [`${Yt}-checked`]: i && !r.indeterminate,
      [`${Yt}-indeterminate`]: r.indeterminate,
      [`${Yt}-disabled`]: o,
      [`${Yt}-block`]: r.block
    })
  }, l.createElement(c0, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${Yt}-content`
  }, r.children)));
}), cf = ie(Cb, {
  Group: bb
}), Fn = "adm-collapse", xb = () => null, $b = (e) => {
  const {
    visible: t
  } = e, n = j(null), r = io(t, e.forceRender, e.destroyOnClose), [{
    height: i
  }, a] = Pe(() => ({
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
  return c3(() => {
    if (!t)
      return;
    const o = n.current;
    o && a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Ti(() => {
    const o = n.current;
    o && (t ? a.start({
      height: o.offsetHeight
    }) : (a.start({
      height: o.offsetHeight,
      immediate: !0
    }), a.start({
      height: 0
    })));
  }, [t]), l.createElement(ve.div, {
    className: B(`${Fn}-panel-content`, {
      [`${Fn}-panel-content-active`]: t
    }),
    style: {
      height: i.to((o) => i.idle && t ? "auto" : o)
    }
  }, l.createElement("div", {
    className: `${Fn}-panel-content-inner`,
    ref: n
  }, l.createElement(kt.Item, null, r && e.children)));
}, _b = (e) => {
  const t = [];
  mn(e.children, (o) => {
    !Vn(o) || typeof o.key != "string" || t.push(o);
  });
  const n = () => {
    var o;
    if (!e.accordion)
      return {
        value: e.activeKey,
        defaultValue: (o = e.defaultActiveKey) !== null && o !== void 0 ? o : [],
        onChange: e.onChange
      };
    const s = {
      value: [],
      defaultValue: [],
      onChange: (c) => {
        var u, f;
        (u = e.onChange) === null || u === void 0 || u.call(e, (f = c[0]) !== null && f !== void 0 ? f : null);
      }
    };
    return e.activeKey === void 0 ? s.value = void 0 : e.activeKey !== null && (s.value = [e.activeKey]), [null, void 0].includes(e.defaultActiveKey) || (s.defaultValue = [e.defaultActiveKey]), s;
  }, [r, i] = te(n()), a = r === null ? [] : Array.isArray(r) ? r : [r];
  return Z(e, l.createElement("div", {
    className: Fn
  }, l.createElement(kt, null, t.map((o) => {
    const s = o.key, c = a.includes(s);
    function u(d) {
      var m, y;
      e.accordion ? i(c ? [] : [s]) : i(c ? a.filter((v) => v !== s) : [...a, s]), (y = (m = o.props).onClick) === null || y === void 0 || y.call(m, d);
    }
    const f = () => {
      let d = l.createElement(b1, null);
      return e.arrow !== void 0 && (d = e.arrow), o.props.arrow !== void 0 && (d = o.props.arrow), typeof d == "function" ? d(c) : l.createElement("div", {
        className: B(`${Fn}-arrow`, {
          [`${Fn}-arrow-active`]: c
        })
      }, d);
    };
    return l.createElement(l.Fragment, {
      key: s
    }, Z(o.props, l.createElement(kt.Item, {
      className: `${Fn}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: f()
    }, o.props.title)), l.createElement($b, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, Ak = ie(_b, {
  Panel: xb
});
var u0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(u0);
var kb = u0.exports;
const f0 = /* @__PURE__ */ lt(kb);
var d0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(d0);
var Ob = d0.exports;
const m0 = /* @__PURE__ */ lt(Ob), dr = "TILL_NOW";
me.extend(co);
me.extend(f0);
me.extend(m0);
const Xt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Sb(e, t, n, r, i, a, o) {
  const s = [], c = t.getFullYear(), u = t.getMonth() + 1, f = t.getDate(), d = t.getHours(), m = t.getMinutes(), y = t.getSeconds(), v = n.getFullYear(), p = n.getMonth() + 1, b = n.getDate(), g = n.getHours(), C = n.getMinutes(), h = n.getSeconds(), w = Xt[r], E = parseInt(e[0]), x = me(Ls([e[0], e[1], "1"])), $ = parseInt(e[1]), P = parseInt(e[2]), S = parseInt(e[3]), k = parseInt(e[4]), D = E === c, I = E === v, T = D && $ === u, _ = I && $ === p, R = T && P === f, N = _ && P === b, O = R && S === d, M = N && S === g, A = O && k === m, F = M && k === C, L = (W, H, q) => {
    let G = [];
    for (let Ee = W; Ee <= H; Ee++)
      G.push(Ee);
    const ae = e.slice(0, Xt[q]), de = a == null ? void 0 : a[q];
    return de && typeof de == "function" && (G = G.filter((Ee) => de(Ee, {
      get date() {
        const le = [...ae, Ee.toString()];
        return Ls(le);
      }
    }))), G;
  };
  if (w >= Xt.year) {
    const q = L(c, v, "year");
    s.push(q.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.month) {
    const q = L(D ? u : 1, I ? p : 12, "month");
    s.push(q.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.day) {
    const W = T ? f : 1, H = _ ? b : x.daysInMonth(), q = L(W, H, "day");
    s.push(q.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.hour) {
    const q = L(R ? d : 0, N ? g : 23, "hour");
    s.push(q.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.minute) {
    const q = L(O ? m : 0, M ? C : 59, "minute");
    s.push(q.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.second) {
    const q = L(A ? y : 0, F ? h : 59, "second");
    s.push(q.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (o && (s[0].push({
    label: i("now", null),
    value: dr
  }), dr === (e == null ? void 0 : e[0])))
    for (let W = 1; W < s.length; W += 1)
      s[W] = [];
  return s;
}
function Fb(e) {
  return e ? [e.getFullYear().toString(), (e.getMonth() + 1).toString(), e.getDate().toString(), e.getHours().toString(), e.getMinutes().toString(), e.getSeconds().toString()] : [];
}
function Ls(e) {
  var t, n, r, i, a, o;
  const s = (t = e[0]) !== null && t !== void 0 ? t : "1900", c = (n = e[1]) !== null && n !== void 0 ? n : "1", u = (r = e[2]) !== null && r !== void 0 ? r : "1", f = (i = e[3]) !== null && i !== void 0 ? i : "0", d = (a = e[4]) !== null && a !== void 0 ? a : "0", m = (o = e[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
me.extend(co);
me.extend(f0);
me.extend(m0);
const Zr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function Nb(e, t, n, r, i, a) {
  const o = [], s = t.getFullYear(), c = n.getFullYear(), u = Zr[r], f = parseInt(e[0]), d = f === s, m = f === c, y = me(t), v = me(n), p = y.isoWeek(), b = v.isoWeek(), g = y.isoWeekday(), C = v.isoWeekday(), h = parseInt(e[1]), w = d && h === p, E = m && h === b, x = me(`${f}-01-01`).isoWeeksInYear(), $ = (P, S, k) => {
    let D = [];
    for (let _ = P; _ <= S; _++)
      D.push(_);
    const I = e.slice(0, Zr[k]), T = a == null ? void 0 : a[k];
    return T && typeof T == "function" && (D = D.filter((_) => T(_, {
      get date() {
        const R = [...I, _.toString()];
        return h0(R);
      }
    }))), D;
  };
  if (u >= Zr.year) {
    const k = $(s, c, "year");
    o.push(k.map((D) => ({
      label: i("year", D),
      value: D.toString()
    })));
  }
  if (u >= Zr.week) {
    const k = $(d ? p : 1, m ? b : x, "week");
    o.push(k.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= Zr["week-day"]) {
    const k = $(w ? g : 1, E ? C : 7, "week-day");
    o.push(k.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return o;
}
function Pb(e) {
  if (!e)
    return [];
  const t = me(e);
  return [t.isoWeekYear().toString(), t.isoWeek().toString(), t.isoWeekday().toString()];
}
function h0(e) {
  var t, n, r;
  const i = (t = e[0]) !== null && t !== void 0 ? t : "1900", a = (n = e[1]) !== null && n !== void 0 ? n : "1", o = (r = e[2]) !== null && r !== void 0 ? r : "1";
  return me().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const Ab = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, v0 = (e, t) => {
  if (t.includes("week"))
    return Pb(e);
  {
    const n = t;
    return Fb(e).slice(0, Ab[n]);
  }
}, Ds = (e, t) => {
  if ((e == null ? void 0 : e[0]) === dr) {
    const n = /* @__PURE__ */ new Date();
    return n.tillNow = !0, n;
  }
  return t.includes("week") ? h0(e) : Ls(e);
}, p0 = (e, t, n, r, i, a, o) => r.startsWith("week") ? Nb(e, t, n, r, i, a) : Sb(e, t, n, r, i, a, o);
function g0(e) {
  const {
    locale: t
  } = pe();
  return He((n, r) => {
    if (e)
      return e(n, r);
    switch (n) {
      case "minute":
      case "second":
      case "hour":
        return ("0" + r.toString()).slice(-2);
      case "now":
        return t.DatePicker.tillNow;
      default:
        return r.toString();
    }
  }, [e]);
}
const uf = (/* @__PURE__ */ new Date()).getFullYear(), Tb = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(uf - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(uf + 10)),
  precision: "day",
  defaultValue: null
}, y0 = fe((e, t) => {
  const n = U(Tb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var y;
      m !== null && ((y = n.onConfirm) === null || y === void 0 || y.call(n, m));
    }
  }), o = ee(() => /* @__PURE__ */ new Date(), []), s = g0(r), c = ee(() => {
    let m = i ?? o;
    return m.tillNow ? [dr] : (m = new Date($e(m.getTime(), n.min.getTime(), n.max.getTime())), v0(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = He((m) => {
    const y = Ds(m, n.precision);
    a(y, !0);
  }, [a, n.precision]), f = zt((m) => {
    var y;
    const v = Ds(m, n.precision);
    (y = n.onSelect) === null || y === void 0 || y.call(n, v);
  }), d = He((m) => p0(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return Z(n, l.createElement(J1, {
    ref: t,
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
  }, (m, y) => {
    var v;
    return (v = n.children) === null || v === void 0 ? void 0 : v.call(n, i, y);
  }));
});
function Rb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(y0, Object.assign({}, e, {
        visible: i,
        onConfirm: (o) => {
          var s;
          (s = e.onConfirm) === null || s === void 0 || s.call(e, o), t(o);
        },
        onClose: () => {
          var o;
          (o = e.onClose) === null || o === void 0 || o.call(e), a(!1), t(null);
        },
        afterClose: () => {
          var o;
          (o = e.afterClose) === null || o === void 0 || o.call(e), r();
        }
      }));
    }, r = Ai(l.createElement(n, null));
  });
}
const Tk = ie(y0, {
  prompt: Rb,
  DATE_NOW: dr
}), ff = (/* @__PURE__ */ new Date()).getFullYear(), Mb = {
  min: new Date((/* @__PURE__ */ new Date()).setFullYear(ff - 10)),
  max: new Date((/* @__PURE__ */ new Date()).setFullYear(ff + 10)),
  precision: "day"
}, Rk = (e) => {
  var t;
  const n = U(Mb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : null
  }), o = g0(r), s = ee(() => i != null && i.tillNow ? [dr, null, null] : v0(i, n.precision), [i, n.precision]), c = He((u) => {
    var f;
    const d = Ds(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return Z(n, l.createElement(Eo, {
    columns: (u) => p0(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Ib = (e) => {
  const {
    action: t
  } = e;
  return Z(e.action, l.createElement(Wt, {
    key: t.key,
    onClick: e.onAction,
    className: B("adm-dialog-button", {
      "adm-dialog-button-bold": t.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, Lb = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, b0 = (e) => {
  const t = U(Lb, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Et("image-container")
  }, l.createElement(lo, {
    src: t.image,
    alt: "dialog header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Et("header")
  }, l.createElement(pi, null, t.header)), !!t.title && l.createElement("div", {
    className: Et("title")
  }, t.title), l.createElement("div", {
    className: B(Et("content"), !t.content && Et("content-empty"))
  }, typeof t.content == "string" ? l.createElement(pi, null, t.content) : t.content), l.createElement("div", {
    className: Et("footer")
  }, t.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: Et("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(Ib, {
      key: o.key,
      action: o,
      onAction: () => ke(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = t.onAction) === null || u === void 0 ? void 0 : u.call(t, o, s)]), t.closeOnAction && ((f = t.onClose) === null || f === void 0 || f.call(t));
      })
    })));
  })));
  return l.createElement(o0, {
    className: B(Et(), t.className),
    style: t.style,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    onMaskClick: t.closeOnMaskClick ? () => {
      var r;
      (r = t.onClose) === null || r === void 0 || r.call(t);
    } : void 0,
    visible: t.visible,
    getContainer: t.getContainer,
    bodyStyle: t.bodyStyle,
    bodyClassName: B(Et("body"), t.image && Et("with-image"), t.bodyClassName),
    maskStyle: t.maskStyle,
    maskClassName: t.maskClassName,
    stopPropagation: t.stopPropagation,
    disableBodyScroll: t.disableBodyScroll,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender,
    role: "dialog",
    "aria-label": t["aria-label"]
  }, n);
};
function Et(e = "") {
  return "adm-dialog" + (e && "-") + e;
}
const Vs = /* @__PURE__ */ new Set();
function Jl(e) {
  const t = Tr(l.createElement(b0, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Vs.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Vs.add(t.close), t;
}
function Db(e) {
  const t = {
    confirmText: xi().locale.Dialog.ok
  }, n = U(t, e);
  return new Promise((r) => {
    Jl(Object.assign(Object.assign({}, n), {
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
const Vb = {
  confirmText: "确认",
  cancelText: "取消"
};
function jb(e) {
  const {
    locale: t
  } = xi(), n = U(Vb, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    Jl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => ke(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => ke(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function Bb() {
  Vs.forEach((e) => {
    e();
  });
}
const Mk = ie(b0, {
  show: Jl,
  alert: Db,
  confirm: jb,
  clear: Bb
}), Vt = "adm-dropdown-item", Wb = (e) => {
  var t;
  const n = B(Vt, {
    [`${Vt}-active`]: e.active,
    [`${Vt}-highlight`]: (t = e.highlight) !== null && t !== void 0 ? t : e.active
  });
  return Z(e, l.createElement("div", {
    className: n,
    onClick: e.onClick
  }, l.createElement("div", {
    className: `${Vt}-title`
  }, l.createElement("span", {
    className: `${Vt}-title-text`
  }, e.title), l.createElement("span", {
    className: B(`${Vt}-title-arrow`, {
      [`${Vt}-title-arrow-active`]: e.active
    })
  }, e.arrow === void 0 ? l.createElement(My, null) : e.arrow))));
}, Zb = Wb, Hb = (e) => {
  const {
    active: t = !1
  } = e, n = io(t, e.forceRender, e.destroyOnClose), r = B(`${Vt}-content`, {
    [`${Vt}-content-hidden`]: !t
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: e.onClick
  }, e.children) : null;
}, Kn = "adm-dropdown", zb = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Dl.getContainer
}, Ub = fe((e, t) => {
  const n = U(zb, e), [r, i] = te({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = j(null), o = j(null);
  xd(() => {
    n.closeOnClickAway && i(null);
  }, [a, o]);
  const [s, c] = K(), u = j(null);
  Y(() => {
    const v = u.current;
    if (v && r) {
      const p = v.getBoundingClientRect();
      c(p.bottom);
    }
  }, [r]);
  const f = (v) => {
    i(r === v ? null : v);
  };
  let d = !1;
  const m = [], y = l.Children.map(n.children, (v) => {
    if (Vn(v)) {
      const p = Object.assign(Object.assign({}, v.props), {
        onClick: (b) => {
          var g, C;
          f(v.key), (C = (g = v.props).onClick) === null || C === void 0 || C.call(g, b);
        },
        active: v.key === r,
        arrow: v.props.arrow === void 0 ? n.arrow : v.props.arrow
      });
      return m.push(v), v.props.forceRender && (d = !0), Lm(v, p);
    } else
      return v;
  });
  return ye(t, () => ({
    close: () => {
      i(null);
    }
  }), [i]), Z(n, l.createElement("div", {
    className: B(Kn, {
      [`${Kn}-open`]: !!r
    }),
    ref: u
  }, l.createElement("div", {
    className: `${Kn}-nav`,
    ref: a
  }, y), l.createElement(Pr, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${Kn}-popup`,
    maskClassName: `${Kn}-popup-mask`,
    bodyClassName: `${Kn}-popup-body`,
    style: {
      top: s
    },
    forceRender: d,
    onMaskClick: n.closeOnMaskClick ? () => {
      f(null);
    } : void 0
  }, l.createElement("div", {
    ref: o
  }, m.map((v) => {
    const p = v.key === r;
    return l.createElement(Hb, {
      key: v.key,
      active: p,
      forceRender: v.props.forceRender,
      destroyOnClose: v.props.destroyOnClose
    }, v.props.children);
  })))));
}), qb = Ub, Ik = ie(qb, {
  Item: Zb
});
var df;
(function(e) {
  e[e.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", e[e.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", e[e.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", e[e.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", e[e.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", e[e.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", e[e.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", e[e.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", e[e.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", e[e.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", e[e.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", e[e.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", e[e.TAGS_START = 917504] = "TAGS_START", e[e.TAGS_END = 917631] = "TAGS_END", e[e.ZWJ = 8205] = "ZWJ";
})(df || (df = {}));
const Kb = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var mf;
function fa(e) {
  if (typeof e != "string")
    throw new TypeError("string cannot be undefined or null");
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; )
    r += Gb(n + r, e), nw(e[n + r]) && r++, Jb(e[n + r]) && r++, ew(e[n + r]) && r++, rw(e[n + r]) ? r++ : (t.push(e.substring(n, n + r)), n += r, r = 0);
  return t;
}
function Gb(e, t) {
  const n = t[e];
  if (!Yb(n) || e === t.length - 1)
    return 1;
  const r = n + t[e + 1];
  let i = t.substring(e + 2, e + 5);
  return hf(r) && hf(i) ? 4 : Xb(r) && tw(i) ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2 : Qb(i) ? 4 : 2;
}
function Yb(e) {
  return e && Wn(e[0].charCodeAt(0), 55296, 56319);
}
function hf(e) {
  return Wn(ec(e), 127462, 127487);
}
function Xb(e) {
  return Wn(ec(e), 127988, 127988);
}
function Qb(e) {
  return Wn(ec(e), 127995, 127999);
}
function Jb(e) {
  return typeof e == "string" && Wn(e.charCodeAt(0), 65024, 65039);
}
function ew(e) {
  return typeof e == "string" && Wn(e.charCodeAt(0), 8400, 8447);
}
function tw(e) {
  const t = e.codePointAt(0);
  return typeof e == "string" && typeof t == "number" && Wn(t, 917504, 917631);
}
function nw(e) {
  return typeof e == "string" && Kb.includes(e.charCodeAt(0));
}
function rw(e) {
  return typeof e == "string" && e.charCodeAt(0) === 8205;
}
function ec(e) {
  return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536;
}
function Wn(e, t, n) {
  return e >= t && e <= n;
}
(function(e) {
  e[e.unit_1 = 1] = "unit_1", e[e.unit_2 = 2] = "unit_2", e[e.unit_4 = 4] = "unit_4";
})(mf || (mf = {}));
const iw = "adm-ellipsis", aw = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, Lk = (e) => {
  const t = U(aw, e), n = j(null), r = j(null), i = j(null), [a, o] = K({}), [s, c] = K(t.defaultExpanded), [u, f] = K(!1), d = ee(() => fa(t.content), [t.content]);
  function m(g, C) {
    return d.slice(g, C).join("");
  }
  function y() {
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
    const P = Jo(E.lineHeight), S = Math.floor(P * (t.rows + 0.5) + Jo(E.paddingTop) + Jo(E.paddingBottom));
    if (x.innerText = t.content, document.body.appendChild(x), x.offsetHeight <= S)
      f(!1);
    else {
      let _ = function(M, A) {
        if (A - M <= 1)
          return t.direction === "end" ? {
            leading: m(0, M) + "..."
          } : {
            tailing: "..." + m(A, k)
          };
        const F = Math.round((M + A) / 2);
        return t.direction === "end" ? x.innerHTML = m(0, F) + "..." + T : x.innerHTML = T + "..." + m(F, k), x.offsetHeight <= S ? t.direction === "end" ? _(F, A) : _(M, F) : t.direction === "end" ? _(M, F) : _(F, A);
      }, R = function(M, A) {
        if (M[1] - M[0] <= 1 && A[1] - A[0] <= 1)
          return {
            leading: m(0, M[0]) + "...",
            tailing: "..." + m(A[1], k)
          };
        const F = Math.floor((M[0] + M[1]) / 2), L = Math.ceil((A[0] + A[1]) / 2);
        return x.innerHTML = m(0, F) + "..." + T + "..." + m(L, k), x.offsetHeight <= S ? R([F, M[1]], [A[0], L]) : R([M[0], F], [L, A[1]]);
      };
      f(!0);
      const k = t.content.length, D = typeof t.collapseText == "string" ? t.collapseText : (g = i.current) === null || g === void 0 ? void 0 : g.innerHTML, I = typeof t.expandText == "string" ? t.expandText : (C = r.current) === null || C === void 0 ? void 0 : C.innerHTML, T = s ? D : I, N = Math.floor((0 + k) / 2), O = t.direction === "middle" ? R([0, N], [N, k]) : _(0, k);
      o(O);
    }
    document.body.removeChild(x);
  }
  Ri(y, n), Se(() => {
    y();
  }, [t.content, t.direction, t.rows, t.expandText, t.collapseText]);
  const v = !!t.expandText && ln(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, t.expandText)), p = !!t.collapseText && ln(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, t.collapseText)), b = () => u ? s ? l.createElement(l.Fragment, null, t.content, p) : l.createElement(l.Fragment, null, a.leading, v, a.tailing) : t.content;
  return Z(t, l.createElement("div", {
    ref: n,
    className: iw,
    onClick: (g) => {
      g.target === g.currentTarget && t.onContentClick(g);
    }
  }, b()));
};
function Jo(e) {
  if (!e)
    return 0;
  const t = e.match(/^\d*(\.\d*)?/);
  return t ? Number(t[0]) : 0;
}
const ow = (e) => Z(e, l.createElement("svg", {
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
}))))), Hr = "adm-empty", Dk = (e) => {
  function t() {
    const {
      image: n
    } = e;
    return n === void 0 ? l.createElement(ow, {
      className: `${Hr}-image`,
      style: e.imageStyle
    }) : typeof n == "string" ? l.createElement("img", {
      className: `${Hr}-image`,
      style: e.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return Z(e, l.createElement("div", {
    className: Hr
  }, l.createElement("div", {
    className: `${Hr}-image-container`
  }, t()), e.description && l.createElement("div", {
    className: B(`${Hr}-description`)
  }, e.description)));
}, vn = "adm-error-block", sw = {
  status: "default"
};
function lw(e) {
  return (n) => {
    var r;
    const i = U(sw, n), {
      locale: a
    } = pe(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : e[i.status], f = typeof u == "string" ? l.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return Z(i, l.createElement("div", {
      className: B(vn, {
        [`${vn}-full-page`]: i.fullPage
      })
    }, l.createElement("div", {
      className: `${vn}-image`
    }, f), l.createElement("div", {
      className: `${vn}-description`
    }, ![void 0, null].includes(c) && l.createElement("div", {
      className: `${vn}-description-title`
    }, c), ![void 0, null].includes(s) && l.createElement("div", {
      className: `${vn}-description-subtitle`
    }, s)), i.children && l.createElement("div", {
      className: `${vn}-content`
    }, i.children)));
  };
}
const cw = l.createElement("svg", {
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
}))), uw = l.createElement("svg", {
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
})))), fw = l.createElement("svg", {
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
})))), dw = l.createElement("svg", {
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
})))), mw = {
  default: cw,
  disconnected: uw,
  empty: fw,
  busy: dw
}, Vk = lw(mw), ea = "adm-floating-bubble", hw = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, jk = (e) => {
  const t = U(hw, e), n = j(null), r = j(null), [i, a] = K(t.offset === void 0 ? t.defaultOffset : t.offset);
  Y(() => {
    t.offset !== void 0 && u.start({
      x: t.offset.x,
      y: t.offset.y
    });
  }, [t.offset]);
  const [{
    x: o,
    y: s,
    opacity: c
  }, u] = Pe(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = Pt((d) => {
    var m;
    let y = d.offset[0], v = d.offset[1];
    if (d.last && t.magnetic) {
      const b = n.current, g = r.current;
      if (!b || !g)
        return;
      const C = b.getBoundingClientRect(), h = g.getBoundingClientRect();
      if (t.magnetic === "x") {
        const w = o.goal - o.get(), E = h.left + w - C.left, x = C.right - (h.right + w);
        x <= E ? y += x : y -= E;
      } else if (t.magnetic === "y") {
        const w = s.goal - s.get(), E = h.top + w - C.top, x = C.bottom - (h.bottom + w);
        x <= E ? v += x : v -= E;
      }
    }
    const p = {
      x: y,
      y: v
    };
    t.offset === void 0 ? u.start(p) : a(p), (m = t.onOffsetChange) === null || m === void 0 || m.call(t, p), u.start({
      opacity: d.active ? 0.8 : 1
    });
  }, {
    axis: t.axis === "xy" ? void 0 : t.axis,
    pointer: {
      touch: !0
    },
    // the component won't trigger drag logic if the user just clicked on the component.
    filterTaps: !0,
    // set constraints to the user gesture
    bounds: n,
    from: () => [o.get(), s.get()]
  });
  return Z(t, l.createElement("div", {
    className: ea
  }, l.createElement("div", {
    className: `${ea}-boundary-outer`
  }, l.createElement("div", {
    className: `${ea}-boundary`,
    ref: n
  })), l.createElement(ve.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: hy([o, s], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: t.onClick,
    className: `${ea}-button`,
    ref: r
  }), t.children)));
};
function tc(e, t) {
  return e.reduce((n, r) => Math.abs(n - t) < Math.abs(r - t) ? n : r);
}
const zr = "adm-floating-panel", vw = {
  handleDraggingOfContent: !0
}, Bk = fe((e, t) => {
  var n, r;
  const i = U(vw, e), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map((C) => -C), c = j(null), u = j(null), f = j(null), [d, m] = K(!1), y = j(!1), v = {
    top: s[s.length - 1],
    bottom: s[0]
  }, p = zt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: b
  }, g] = Pe(() => ({
    y: v.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      p(-C.value.y, b.isAnimating);
    }
  }));
  return Pt((C) => {
    const [, h] = C.offset;
    if (C.first) {
      const x = C.event.target, $ = u.current;
      if ($ === x || $ != null && $.contains(x))
        y.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const P = b.goal <= v.top, S = f.current;
        if (!S)
          return;
        P ? S.scrollTop <= 0 && C.direction[1] > 0 && (y.current = !0) : y.current = !0;
      }
    }
    if (m(y.current), !y.current)
      return;
    const {
      event: w
    } = C;
    w.cancelable && Rn && w.preventDefault(), w.stopPropagation();
    let E = h;
    C.last && (y.current = !1, m(!1), E = tc(s, h)), g.start({
      y: E
    });
  }, {
    axis: "y",
    bounds: v,
    rubberband: !0,
    from: () => [0, b.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Rn ? {
      passive: !1
    } : void 0
  }), ye(t, () => ({
    setHeight: (C, h) => {
      g.start({
        y: -C,
        immediate: h == null ? void 0 : h.immediate
      });
    }
  }), [g]), Ga(c, !0), Z(i, l.createElement(ve.div, {
    ref: c,
    className: zr,
    style: {
      height: Math.round(o),
      translateY: b.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, l.createElement("div", {
    className: `${zr}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), l.createElement("div", {
    className: `${zr}-header`,
    ref: u
  }, l.createElement("div", {
    className: `${zr}-bar`
  })), l.createElement("div", {
    className: `${zr}-content`,
    ref: f
  }, i.children)));
});
function Aa() {
  return Aa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Aa.apply(this, arguments);
}
function pw(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function nc(e, t) {
  if (e == null)
    return {};
  var n = pw(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function ze(e) {
  "@babel/helpers - typeof";
  return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ze(e);
}
function gw(e, t) {
  if (ze(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (ze(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function w0(e) {
  var t = gw(e, "string");
  return ze(t) === "symbol" ? t : String(t);
}
function De(e, t, n) {
  return t = w0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function vf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ne(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vf(Object(n), !0).forEach(function(r) {
      De(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : vf(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function js(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function yw(e) {
  if (Array.isArray(e))
    return js(e);
}
function E0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function rc(e, t) {
  if (e) {
    if (typeof e == "string")
      return js(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return js(e, t);
  }
}
function bw() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function re(e) {
  return yw(e) || E0(e) || rc(e) || bw();
}
function Ii(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function pf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, w0(r.key), r);
  }
}
function Li(e, t, n) {
  return t && pf(e.prototype, t), n && pf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function C0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Bs(e, t) {
  return Bs = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Bs(e, t);
}
function ww(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Bs(e, t);
}
function Ta(e) {
  return Ta = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ta(e);
}
function Ew() {
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
function Cw(e, t) {
  if (t && (ze(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return C0(e);
}
function xw(e) {
  var t = Ew();
  return function() {
    var r = Ta(e), i;
    if (t) {
      var a = Ta(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return Cw(this, i);
  };
}
var x0 = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae = typeof Symbol == "function" && Symbol.for, ic = Ae ? Symbol.for("react.element") : 60103, ac = Ae ? Symbol.for("react.portal") : 60106, Co = Ae ? Symbol.for("react.fragment") : 60107, xo = Ae ? Symbol.for("react.strict_mode") : 60108, $o = Ae ? Symbol.for("react.profiler") : 60114, _o = Ae ? Symbol.for("react.provider") : 60109, ko = Ae ? Symbol.for("react.context") : 60110, oc = Ae ? Symbol.for("react.async_mode") : 60111, Oo = Ae ? Symbol.for("react.concurrent_mode") : 60111, So = Ae ? Symbol.for("react.forward_ref") : 60112, Fo = Ae ? Symbol.for("react.suspense") : 60113, $w = Ae ? Symbol.for("react.suspense_list") : 60120, No = Ae ? Symbol.for("react.memo") : 60115, Po = Ae ? Symbol.for("react.lazy") : 60116, _w = Ae ? Symbol.for("react.block") : 60121, kw = Ae ? Symbol.for("react.fundamental") : 60117, Ow = Ae ? Symbol.for("react.responder") : 60118, Sw = Ae ? Symbol.for("react.scope") : 60119;
function Qe(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ic:
        switch (e = e.type, e) {
          case oc:
          case Oo:
          case Co:
          case $o:
          case xo:
          case Fo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case ko:
              case So:
              case Po:
              case No:
              case _o:
                return e;
              default:
                return t;
            }
        }
      case ac:
        return t;
    }
  }
}
function $0(e) {
  return Qe(e) === Oo;
}
se.AsyncMode = oc;
se.ConcurrentMode = Oo;
se.ContextConsumer = ko;
se.ContextProvider = _o;
se.Element = ic;
se.ForwardRef = So;
se.Fragment = Co;
se.Lazy = Po;
se.Memo = No;
se.Portal = ac;
se.Profiler = $o;
se.StrictMode = xo;
se.Suspense = Fo;
se.isAsyncMode = function(e) {
  return $0(e) || Qe(e) === oc;
};
se.isConcurrentMode = $0;
se.isContextConsumer = function(e) {
  return Qe(e) === ko;
};
se.isContextProvider = function(e) {
  return Qe(e) === _o;
};
se.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ic;
};
se.isForwardRef = function(e) {
  return Qe(e) === So;
};
se.isFragment = function(e) {
  return Qe(e) === Co;
};
se.isLazy = function(e) {
  return Qe(e) === Po;
};
se.isMemo = function(e) {
  return Qe(e) === No;
};
se.isPortal = function(e) {
  return Qe(e) === ac;
};
se.isProfiler = function(e) {
  return Qe(e) === $o;
};
se.isStrictMode = function(e) {
  return Qe(e) === xo;
};
se.isSuspense = function(e) {
  return Qe(e) === Fo;
};
se.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Co || e === Oo || e === $o || e === xo || e === Fo || e === $w || typeof e == "object" && e !== null && (e.$$typeof === Po || e.$$typeof === No || e.$$typeof === _o || e.$$typeof === ko || e.$$typeof === So || e.$$typeof === kw || e.$$typeof === Ow || e.$$typeof === Sw || e.$$typeof === _w);
};
se.typeOf = Qe;
x0.exports = se;
var Fw = x0.exports;
function Ws(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(e, function(r) {
    r == null && !t.keepEmpty || (Array.isArray(r) ? n = n.concat(Ws(r)) : Fw.isFragment(r) && r.props ? n = n.concat(Ws(r.props.children, t)) : n.push(r));
  }), n;
}
var Zs = {}, Nw = function(t) {
};
function Pw(e, t) {
}
function Aw(e, t) {
}
function Tw() {
  Zs = {};
}
function _0(e, t, n) {
  !t && !Zs[n] && (e(!1, n), Zs[n] = !0);
}
function yt(e, t) {
  _0(Pw, e, t);
}
function Rw(e, t) {
  _0(Aw, e, t);
}
yt.preMessage = Nw;
yt.resetWarned = Tw;
yt.noteOnce = Rw;
var Nn = "RC_FORM_INTERNAL_HOOKS", ce = function() {
  yt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Ln = /* @__PURE__ */ V.createContext({
  getFieldValue: ce,
  getFieldsValue: ce,
  getFieldError: ce,
  getFieldWarning: ce,
  getFieldsError: ce,
  isFieldsTouched: ce,
  isFieldTouched: ce,
  isFieldValidating: ce,
  isFieldsValidating: ce,
  resetFields: ce,
  setFields: ce,
  setFieldValue: ce,
  setFieldsValue: ce,
  validateFields: ce,
  submit: ce,
  getInternalHooks: function() {
    return ce(), {
      dispatch: ce,
      initEntityValue: ce,
      registerField: ce,
      useSubscribe: ce,
      setInitialValues: ce,
      destroyForm: ce,
      setCallbacks: ce,
      registerWatch: ce,
      getFields: ce,
      setValidateMessages: ce,
      setPreserve: ce,
      getInitialValue: ce
    };
  }
});
function Hs(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Zt() {
  Zt = function() {
    return t;
  };
  var e, t = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(N, O, M) {
    N[O] = M.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(N, O, M) {
    return Object.defineProperty(N, O, {
      value: M,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), N[O];
  }
  try {
    u({}, "");
  } catch {
    u = function(M, A, F) {
      return M[A] = F;
    };
  }
  function f(N, O, M, A) {
    var F = O && O.prototype instanceof g ? O : g, L = Object.create(F.prototype), W = new _(A || []);
    return i(L, "_invoke", {
      value: k(N, M, W)
    }), L;
  }
  function d(N, O, M) {
    try {
      return {
        type: "normal",
        arg: N.call(O, M)
      };
    } catch (A) {
      return {
        type: "throw",
        arg: A
      };
    }
  }
  t.wrap = f;
  var m = "suspendedStart", y = "suspendedYield", v = "executing", p = "completed", b = {};
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
  var E = Object.getPrototypeOf, x = E && E(E(R([])));
  x && x !== n && r.call(x, o) && (w = x);
  var $ = h.prototype = g.prototype = Object.create(w);
  function P(N) {
    ["next", "throw", "return"].forEach(function(O) {
      u(N, O, function(M) {
        return this._invoke(O, M);
      });
    });
  }
  function S(N, O) {
    function M(F, L, W, H) {
      var q = d(N[F], N, L);
      if (q.type !== "throw") {
        var G = q.arg, ae = G.value;
        return ae && ze(ae) == "object" && r.call(ae, "__await") ? O.resolve(ae.__await).then(function(de) {
          M("next", de, W, H);
        }, function(de) {
          M("throw", de, W, H);
        }) : O.resolve(ae).then(function(de) {
          G.value = de, W(G);
        }, function(de) {
          return M("throw", de, W, H);
        });
      }
      H(q.arg);
    }
    var A;
    i(this, "_invoke", {
      value: function(L, W) {
        function H() {
          return new O(function(q, G) {
            M(L, W, q, G);
          });
        }
        return A = A ? A.then(H, H) : H();
      }
    });
  }
  function k(N, O, M) {
    var A = m;
    return function(F, L) {
      if (A === v)
        throw new Error("Generator is already running");
      if (A === p) {
        if (F === "throw")
          throw L;
        return {
          value: e,
          done: !0
        };
      }
      for (M.method = F, M.arg = L; ; ) {
        var W = M.delegate;
        if (W) {
          var H = D(W, M);
          if (H) {
            if (H === b)
              continue;
            return H;
          }
        }
        if (M.method === "next")
          M.sent = M._sent = M.arg;
        else if (M.method === "throw") {
          if (A === m)
            throw A = p, M.arg;
          M.dispatchException(M.arg);
        } else
          M.method === "return" && M.abrupt("return", M.arg);
        A = v;
        var q = d(N, O, M);
        if (q.type === "normal") {
          if (A = M.done ? p : y, q.arg === b)
            continue;
          return {
            value: q.arg,
            done: M.done
          };
        }
        q.type === "throw" && (A = p, M.method = "throw", M.arg = q.arg);
      }
    };
  }
  function D(N, O) {
    var M = O.method, A = N.iterator[M];
    if (A === e)
      return O.delegate = null, M === "throw" && N.iterator.return && (O.method = "return", O.arg = e, D(N, O), O.method === "throw") || M !== "return" && (O.method = "throw", O.arg = new TypeError("The iterator does not provide a '" + M + "' method")), b;
    var F = d(A, N.iterator, O.arg);
    if (F.type === "throw")
      return O.method = "throw", O.arg = F.arg, O.delegate = null, b;
    var L = F.arg;
    return L ? L.done ? (O[N.resultName] = L.value, O.next = N.nextLoc, O.method !== "return" && (O.method = "next", O.arg = e), O.delegate = null, b) : L : (O.method = "throw", O.arg = new TypeError("iterator result is not an object"), O.delegate = null, b);
  }
  function I(N) {
    var O = {
      tryLoc: N[0]
    };
    1 in N && (O.catchLoc = N[1]), 2 in N && (O.finallyLoc = N[2], O.afterLoc = N[3]), this.tryEntries.push(O);
  }
  function T(N) {
    var O = N.completion || {};
    O.type = "normal", delete O.arg, N.completion = O;
  }
  function _(N) {
    this.tryEntries = [{
      tryLoc: "root"
    }], N.forEach(I, this), this.reset(!0);
  }
  function R(N) {
    if (N || N === "") {
      var O = N[o];
      if (O)
        return O.call(N);
      if (typeof N.next == "function")
        return N;
      if (!isNaN(N.length)) {
        var M = -1, A = function F() {
          for (; ++M < N.length; )
            if (r.call(N, M))
              return F.value = N[M], F.done = !1, F;
          return F.value = e, F.done = !0, F;
        };
        return A.next = A;
      }
    }
    throw new TypeError(ze(N) + " is not iterable");
  }
  return C.prototype = h, i($, "constructor", {
    value: h,
    configurable: !0
  }), i(h, "constructor", {
    value: C,
    configurable: !0
  }), C.displayName = u(h, c, "GeneratorFunction"), t.isGeneratorFunction = function(N) {
    var O = typeof N == "function" && N.constructor;
    return !!O && (O === C || (O.displayName || O.name) === "GeneratorFunction");
  }, t.mark = function(N) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(N, h) : (N.__proto__ = h, u(N, c, "GeneratorFunction")), N.prototype = Object.create($), N;
  }, t.awrap = function(N) {
    return {
      __await: N
    };
  }, P(S.prototype), u(S.prototype, s, function() {
    return this;
  }), t.AsyncIterator = S, t.async = function(N, O, M, A, F) {
    F === void 0 && (F = Promise);
    var L = new S(f(N, O, M, A), F);
    return t.isGeneratorFunction(O) ? L : L.next().then(function(W) {
      return W.done ? W.value : L.next();
    });
  }, P($), u($, c, "Generator"), u($, o, function() {
    return this;
  }), u($, "toString", function() {
    return "[object Generator]";
  }), t.keys = function(N) {
    var O = Object(N), M = [];
    for (var A in O)
      M.push(A);
    return M.reverse(), function F() {
      for (; M.length; ) {
        var L = M.pop();
        if (L in O)
          return F.value = L, F.done = !1, F;
      }
      return F.done = !0, F;
    };
  }, t.values = R, _.prototype = {
    constructor: _,
    reset: function(O) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(T), !O)
        for (var M in this)
          M.charAt(0) === "t" && r.call(this, M) && !isNaN(+M.slice(1)) && (this[M] = e);
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
      var M = this;
      function A(G, ae) {
        return W.type = "throw", W.arg = O, M.next = G, ae && (M.method = "next", M.arg = e), !!ae;
      }
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var L = this.tryEntries[F], W = L.completion;
        if (L.tryLoc === "root")
          return A("end");
        if (L.tryLoc <= this.prev) {
          var H = r.call(L, "catchLoc"), q = r.call(L, "finallyLoc");
          if (H && q) {
            if (this.prev < L.catchLoc)
              return A(L.catchLoc, !0);
            if (this.prev < L.finallyLoc)
              return A(L.finallyLoc);
          } else if (H) {
            if (this.prev < L.catchLoc)
              return A(L.catchLoc, !0);
          } else {
            if (!q)
              throw new Error("try statement without catch or finally");
            if (this.prev < L.finallyLoc)
              return A(L.finallyLoc);
          }
        }
      }
    },
    abrupt: function(O, M) {
      for (var A = this.tryEntries.length - 1; A >= 0; --A) {
        var F = this.tryEntries[A];
        if (F.tryLoc <= this.prev && r.call(F, "finallyLoc") && this.prev < F.finallyLoc) {
          var L = F;
          break;
        }
      }
      L && (O === "break" || O === "continue") && L.tryLoc <= M && M <= L.finallyLoc && (L = null);
      var W = L ? L.completion : {};
      return W.type = O, W.arg = M, L ? (this.method = "next", this.next = L.finallyLoc, b) : this.complete(W);
    },
    complete: function(O, M) {
      if (O.type === "throw")
        throw O.arg;
      return O.type === "break" || O.type === "continue" ? this.next = O.arg : O.type === "return" ? (this.rval = this.arg = O.arg, this.method = "return", this.next = "end") : O.type === "normal" && M && (this.next = M), b;
    },
    finish: function(O) {
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var A = this.tryEntries[M];
        if (A.finallyLoc === O)
          return this.complete(A.completion, A.afterLoc), T(A), b;
      }
    },
    catch: function(O) {
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var A = this.tryEntries[M];
        if (A.tryLoc === O) {
          var F = A.completion;
          if (F.type === "throw") {
            var L = F.arg;
            T(A);
          }
          return L;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(O, M, A) {
      return this.delegate = {
        iterator: R(O),
        resultName: M,
        nextLoc: A
      }, this.method === "next" && (this.arg = e), b;
    }
  }, t;
}
function gf(e, t, n, r, i, a, o) {
  try {
    var s = e[a](o), c = s.value;
  } catch (u) {
    n(u);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function Ao(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, i) {
      var a = e.apply(t, n);
      function o(c) {
        gf(a, r, i, o, s, "next", c);
      }
      function s(c) {
        gf(a, r, i, o, s, "throw", c);
      }
      o(void 0);
    });
  };
}
function Pn() {
  return Pn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Pn.apply(this, arguments);
}
function Mw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, bi(e, t);
}
function zs(e) {
  return zs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, zs(e);
}
function bi(e, t) {
  return bi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, bi(e, t);
}
function Iw() {
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
function da(e, t, n) {
  return Iw() ? da = Reflect.construct.bind() : da = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && bi(u, o.prototype), u;
  }, da.apply(null, arguments);
}
function Lw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Us(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Us = function(r) {
    if (r === null || !Lw(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, i);
    }
    function i() {
      return da(r, arguments, zs(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), bi(i, r);
  }, Us(e);
}
var Dw = /%[sdj%]/g, Vw = function() {
};
typeof process < "u" && process.env;
function qs(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var r = n.field;
    t[r] = t[r] || [], t[r].push(n);
  }), t;
}
function Ye(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var o = e.replace(Dw, function(s) {
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
  return e;
}
function jw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Fe(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || jw(t) && typeof e == "string" && !e);
}
function Bw(e, t, n) {
  var r = [], i = 0, a = e.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function yf(e, t, n) {
  var r = 0, i = e.length;
  function a(o) {
    if (o && o.length) {
      n(o);
      return;
    }
    var s = r;
    r = r + 1, s < i ? t(e[s], a) : n([]);
  }
  a([]);
}
function Ww(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var bf = /* @__PURE__ */ function(e) {
  Mw(t, e);
  function t(n, r) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return t;
}(/* @__PURE__ */ Us(Error));
function Zw(e, t, n, r, i) {
  if (t.first) {
    var a = new Promise(function(m, y) {
      var v = function(g) {
        return r(g), g.length ? y(new bf(g, qs(g))) : m(i);
      }, p = Ww(e);
      yf(p, n, v);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), c = s.length, u = 0, f = [], d = new Promise(function(m, y) {
    var v = function(b) {
      if (f.push.apply(f, b), u++, u === c)
        return r(f), f.length ? y(new bf(f, qs(f))) : m(i);
    };
    s.length || (r(f), m(i)), s.forEach(function(p) {
      var b = e[p];
      o.indexOf(p) !== -1 ? yf(b, n, v) : Bw(b, n, v);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Hw(e) {
  return !!(e && e.message !== void 0);
}
function zw(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function wf(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = zw(t, e.fullFields) : r = t[n.field || e.fullField], Hw(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function Ef(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = Pn({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var k0 = function(t, n, r, i, a, o) {
  t.required && (!r.hasOwnProperty(t.field) || Fe(n, o || t.type)) && i.push(Ye(a.messages.required, t.fullField));
}, Uw = function(t, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Ye(a.messages.whitespace, t.fullField));
}, ta, qw = function() {
  if (ta)
    return ta;
  var e = "[a-fA-F\\d:]", t = function(w) {
    return w && w.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
    return w && w.exact ? a : new RegExp("(?:" + t(w) + n + t(w) + ")|(?:" + t(w) + i + t(w) + ")", "g");
  };
  c.v4 = function(h) {
    return h && h.exact ? o : new RegExp("" + t(h) + n + t(h), "g");
  }, c.v6 = function(h) {
    return h && h.exact ? s : new RegExp("" + t(h) + i + t(h), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, y = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", v = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", p = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", b = "(?::\\d{2,5})?", g = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + y + v + p + ")" + b + g;
  return ta = new RegExp("(?:^" + C + "$)", "i"), ta;
}, Cf = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, ei = {
  integer: function(t) {
    return ei.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return ei.number(t) && !ei.integer(t);
  },
  array: function(t) {
    return Array.isArray(t);
  },
  regexp: function(t) {
    if (t instanceof RegExp)
      return !0;
    try {
      return !!new RegExp(t);
    } catch {
      return !1;
    }
  },
  date: function(t) {
    return typeof t.getTime == "function" && typeof t.getMonth == "function" && typeof t.getYear == "function" && !isNaN(t.getTime());
  },
  number: function(t) {
    return isNaN(t) ? !1 : typeof t == "number";
  },
  object: function(t) {
    return typeof t == "object" && !ei.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Cf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(qw());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Cf.hex);
  }
}, Kw = function(t, n, r, i, a) {
  if (t.required && n === void 0) {
    k0(t, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? ei[s](n) || i.push(Ye(a.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && i.push(Ye(a.messages.types[s], t.fullField, t.type));
}, Gw = function(t, n, r, i, a) {
  var o = typeof t.len == "number", s = typeof t.min == "number", c = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", y = typeof n == "string", v = Array.isArray(n);
  if (m ? d = "number" : y ? d = "string" : v && (d = "array"), !d)
    return !1;
  v && (f = n.length), y && (f = n.replace(u, "_").length), o ? f !== t.len && i.push(Ye(a.messages[d].len, t.fullField, t.len)) : s && !c && f < t.min ? i.push(Ye(a.messages[d].min, t.fullField, t.min)) : c && !s && f > t.max ? i.push(Ye(a.messages[d].max, t.fullField, t.max)) : s && c && (f < t.min || f > t.max) && i.push(Ye(a.messages[d].range, t.fullField, t.min, t.max));
}, Gn = "enum", Yw = function(t, n, r, i, a) {
  t[Gn] = Array.isArray(t[Gn]) ? t[Gn] : [], t[Gn].indexOf(n) === -1 && i.push(Ye(a.messages[Gn], t.fullField, t[Gn].join(", ")));
}, Xw = function(t, n, r, i, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(Ye(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(n) || i.push(Ye(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Q = {
  required: k0,
  whitespace: Uw,
  type: Kw,
  range: Gw,
  enum: Yw,
  pattern: Xw
}, Qw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a, "string"), Fe(n, "string") || (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a), Q.pattern(t, n, i, o, a), t.whitespace === !0 && Q.whitespace(t, n, i, o, a));
  }
  r(o);
}, Jw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, eE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, tE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, nE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), Fe(n) || Q.type(t, n, i, o, a);
  }
  r(o);
}, rE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, iE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, aE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    Q.required(t, n, i, o, a, "array"), n != null && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, oE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, sE = "enum", lE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q[sE](t, n, i, o, a);
  }
  r(o);
}, cE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a), Fe(n, "string") || Q.pattern(t, n, i, o, a);
  }
  r(o);
}, uE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n, "date") && !t.required)
      return r();
    if (Q.required(t, n, i, o, a), !Fe(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), Q.type(t, c, i, o, a), c && Q.range(t, c.getTime(), i, o, a);
    }
  }
  r(o);
}, fE = function(t, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  Q.required(t, n, i, o, a, s), r(o);
}, es = function(t, n, r, i, a) {
  var o = t.type, s = [], c = t.required || !t.required && i.hasOwnProperty(t.field);
  if (c) {
    if (Fe(n, o) && !t.required)
      return r();
    Q.required(t, n, i, s, a, o), Fe(n, o) || Q.type(t, n, i, s, a);
  }
  r(s);
}, dE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a);
  }
  r(o);
}, oi = {
  string: Qw,
  method: Jw,
  number: eE,
  boolean: tE,
  regexp: nE,
  integer: rE,
  float: iE,
  array: aE,
  object: oE,
  enum: lE,
  pattern: cE,
  date: uE,
  url: es,
  hex: es,
  email: es,
  required: fE,
  any: dE
};
function Ks() {
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
      var t = JSON.parse(JSON.stringify(this));
      return t.clone = this.clone, t;
    }
  };
}
var Gs = Ks(), Di = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Gs, this.define(n);
  }
  var t = e.prototype;
  return t.define = function(r) {
    var i = this;
    if (!r)
      throw new Error("Cannot configure a schema with no rules");
    if (typeof r != "object" || Array.isArray(r))
      throw new Error("Rules must be an object");
    this.rules = {}, Object.keys(r).forEach(function(a) {
      var o = r[a];
      i.rules[a] = Array.isArray(o) ? o : [o];
    });
  }, t.messages = function(r) {
    return r && (this._messages = Ef(Ks(), r)), this._messages;
  }, t.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function f(p) {
      var b = [], g = {};
      function C(w) {
        if (Array.isArray(w)) {
          var E;
          b = (E = b).concat.apply(E, w);
        } else
          b.push(w);
      }
      for (var h = 0; h < p.length; h++)
        C(p[h]);
      b.length ? (g = qs(b), u(b, g)) : u(null, s);
    }
    if (c.messages) {
      var d = this.messages();
      d === Gs && (d = Ks()), Ef(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, y = c.keys || Object.keys(this.rules);
    y.forEach(function(p) {
      var b = o.rules[p], g = s[p];
      b.forEach(function(C) {
        var h = C;
        typeof h.transform == "function" && (s === r && (s = Pn({}, s)), g = s[p] = h.transform(g)), typeof h == "function" ? h = {
          validator: h
        } : h = Pn({}, h), h.validator = o.getValidationMethod(h), h.validator && (h.field = p, h.fullField = h.fullField || p, h.type = o.getType(h), m[p] = m[p] || [], m[p].push({
          rule: h,
          value: g,
          source: s,
          field: p
        }));
      });
    });
    var v = {};
    return Zw(m, c, function(p, b) {
      var g = p.rule, C = (g.type === "object" || g.type === "array") && (typeof g.fields == "object" || typeof g.defaultField == "object");
      C = C && (g.required || !g.required && p.value), g.field = p.field;
      function h(x, $) {
        return Pn({}, $, {
          fullField: g.fullField + "." + x,
          fullFields: g.fullFields ? [].concat(g.fullFields, [x]) : [x]
        });
      }
      function w(x) {
        x === void 0 && (x = []);
        var $ = Array.isArray(x) ? x : [x];
        !c.suppressWarning && $.length && e.warning("async-validator:", $), $.length && g.message !== void 0 && ($ = [].concat(g.message));
        var P = $.map(wf(g, s));
        if (c.first && P.length)
          return v[g.field] = 1, b(P);
        if (!C)
          b(P);
        else {
          if (g.required && !p.value)
            return g.message !== void 0 ? P = [].concat(g.message).map(wf(g, s)) : c.error && (P = [c.error(g, Ye(c.messages.required, g.field))]), b(P);
          var S = {};
          g.defaultField && Object.keys(p.value).map(function(I) {
            S[I] = g.defaultField;
          }), S = Pn({}, S, p.rule.fields);
          var k = {};
          Object.keys(S).forEach(function(I) {
            var T = S[I], _ = Array.isArray(T) ? T : [T];
            k[I] = _.map(h.bind(null, I));
          });
          var D = new e(k);
          D.messages(c.messages), p.rule.options && (p.rule.options.messages = c.messages, p.rule.options.error = c.error), D.validate(p.value, p.rule.options || c, function(I) {
            var T = [];
            P && P.length && T.push.apply(T, P), I && I.length && T.push.apply(T, I), b(T.length ? T : null);
          });
        }
      }
      var E;
      if (g.asyncValidator)
        E = g.asyncValidator(g, p.value, w, p.source, c);
      else if (g.validator) {
        try {
          E = g.validator(g, p.value, w, p.source, c);
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
    }, function(p) {
      f(p);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !oi.hasOwnProperty(r.type))
      throw new Error(Ye("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? oi.required : oi[this.getType(r)] || void 0;
  }, e;
}();
Di.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  oi[t] = n;
};
Di.warning = Vw;
Di.messages = Gs;
Di.validators = oi;
var Ke = "'${name}' is not a valid ${type}", O0 = {
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
function S0(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null)
      return;
    n = n[t[r]];
  }
  return n;
}
function F0(e) {
  if (Array.isArray(e))
    return e;
}
function N0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mE(e) {
  return F0(e) || E0(e) || rc(e) || N0();
}
function P0(e, t, n, r) {
  if (!t.length)
    return n;
  var i = mE(t), a = i[0], o = i.slice(1), s;
  return !e && typeof a == "number" ? s = [] : Array.isArray(e) ? s = re(e) : s = ne({}, e), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = P0(s[a], o, n, r), s;
}
function hE(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !S0(e, t.slice(0, -1)) ? e : P0(e, t, n, r);
}
function To(e) {
  return Array.isArray(e) ? pE(e) : ze(e) === "object" && e !== null ? vE(e) : e;
}
function vE(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var n in e)
      t[n] = To(e[n]);
    return t;
  }
  return e;
}
function pE(e) {
  return e.map(function(t) {
    return To(t);
  });
}
function xe(e) {
  return Hs(e);
}
function an(e, t) {
  var n = S0(e, t);
  return n;
}
function tn(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = hE(e, t, n, r);
  return i;
}
function xf(e, t) {
  var n = {};
  return t.forEach(function(r) {
    var i = an(e, r);
    n = tn(n, r, i);
  }), n;
}
function si(e, t) {
  return e && e.some(function(n) {
    return T0(n, t);
  });
}
function $f(e) {
  return ze(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function A0(e, t) {
  var n = Array.isArray(e) ? re(e) : ne({}, e);
  return t && Object.keys(t).forEach(function(r) {
    var i = n[r], a = t[r], o = $f(i) && $f(a);
    n[r] = o ? A0(i, a || {}) : To(a);
  }), n;
}
function ma(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return A0(i, a);
  }, e);
}
function T0(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(n, r) {
    return t[r] === n;
  });
}
function gE(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || ze(e) !== "object" || ze(t) !== "object")
    return !1;
  var n = Object.keys(e), r = Object.keys(t), i = new Set([].concat(n, r));
  return re(i).every(function(a) {
    var o = e[a], s = t[a];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function yE(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && ze(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function _f(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r)
    return e;
  var i = e[t], a = t - n;
  return a > 0 ? [].concat(re(e.slice(0, n)), [i], re(e.slice(n, t)), re(e.slice(t + 1, r))) : a < 0 ? [].concat(re(e.slice(0, t)), re(e.slice(t + 1, n + 1)), [i], re(e.slice(n + 1, r))) : e;
}
var bE = Di;
function wE(e, t) {
  return e.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return t[r];
  });
}
var kf = "CODE_LOGIC_ERROR";
function Ys(e, t, n, r, i) {
  return Xs.apply(this, arguments);
}
function Xs() {
  return Xs = Ao(/* @__PURE__ */ Zt().mark(function e(t, n, r, i, a) {
    var o, s, c, u, f, d, m, y, v;
    return Zt().wrap(function(b) {
      for (; ; )
        switch (b.prev = b.next) {
          case 0:
            return o = ne({}, r), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (g) {
                return console.error(g), Promise.reject(kf);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new bE(De({}, t, [o])), f = ma({}, O0, i.validateMessages), u.messages(f), d = [], b.prev = 9, b.next = 12, Promise.resolve(u.validate(De({}, t, n), ne({}, i)));
          case 12:
            b.next = 17;
            break;
          case 14:
            b.prev = 14, b.t0 = b.catch(9), b.t0.errors && (d = b.t0.errors.map(function(g, C) {
              var h = g.message, w = h === kf ? f.default : h;
              return /* @__PURE__ */ V.isValidElement(w) ? (
                // Wrap ReactNode with `key`
                V.cloneElement(w, {
                  key: "error_".concat(C)
                })
              ) : w;
            }));
          case 17:
            if (!(!d.length && c)) {
              b.next = 22;
              break;
            }
            return b.next = 20, Promise.all(n.map(function(g, C) {
              return Ys("".concat(t, ".").concat(C), g, c, i, a);
            }));
          case 20:
            return m = b.sent, b.abrupt("return", m.reduce(function(g, C) {
              return [].concat(re(g), re(C));
            }, []));
          case 22:
            return y = ne(ne({}, r), {}, {
              name: t,
              enum: (r.enum || []).join(", ")
            }, a), v = d.map(function(g) {
              return typeof g == "string" ? wE(g, y) : g;
            }), b.abrupt("return", v);
          case 25:
          case "end":
            return b.stop();
        }
    }, e, null, [[9, 14]]);
  })), Xs.apply(this, arguments);
}
function EE(e, t, n, r, i, a) {
  var o = e.join("."), s = n.map(function(f, d) {
    var m = f.validator, y = ne(ne({}, f), {}, {
      ruleIndex: d
    });
    return m && (y.validator = function(v, p, b) {
      var g = !1, C = function() {
        for (var E = arguments.length, x = new Array(E), $ = 0; $ < E; $++)
          x[$] = arguments[$];
        Promise.resolve().then(function() {
          yt(!g, "Your validator function has already return a promise. `callback` will be ignored."), g || b.apply(void 0, x);
        });
      }, h = m(v, p, C);
      g = h && typeof h.then == "function" && typeof h.catch == "function", yt(g, "`callback` is deprecated. Please return a promise instead."), g && h.then(function() {
        b();
      }).catch(function(w) {
        b(w || " ");
      });
    }), y;
  }).sort(function(f, d) {
    var m = f.warningOnly, y = f.ruleIndex, v = d.warningOnly, p = d.ruleIndex;
    return !!m == !!v ? y - p : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = Ao(/* @__PURE__ */ Zt().mark(function d(m, y) {
        var v, p, b;
        return Zt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                v = 0;
              case 1:
                if (!(v < s.length)) {
                  C.next = 12;
                  break;
                }
                return p = s[v], C.next = 5, Ys(o, t, p, r, a);
              case 5:
                if (b = C.sent, !b.length) {
                  C.next = 9;
                  break;
                }
                return y([{
                  errors: b,
                  rule: p
                }]), C.abrupt("return");
              case 9:
                v += 1, C.next = 1;
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
      return Ys(o, t, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? xE(u) : CE(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function CE(e) {
  return Qs.apply(this, arguments);
}
function Qs() {
  return Qs = Ao(/* @__PURE__ */ Zt().mark(function e(t) {
    return Zt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(t).then(function(i) {
              var a, o = (a = []).concat.apply(a, re(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, e);
  })), Qs.apply(this, arguments);
}
function xE(e) {
  return Js.apply(this, arguments);
}
function Js() {
  return Js = Ao(/* @__PURE__ */ Zt().mark(function e(t) {
    var n;
    return Zt().wrap(function(i) {
      for (; ; )
        switch (i.prev = i.next) {
          case 0:
            return n = 0, i.abrupt("return", new Promise(function(a) {
              t.forEach(function(o) {
                o.then(function(s) {
                  s.errors.length && a([s]), n += 1, n === t.length && a([]);
                });
              });
            }));
          case 2:
          case "end":
            return i.stop();
        }
    }, e);
  })), Js.apply(this, arguments);
}
var $E = ["name"], et = [];
function Of(e, t, n, r, i, a) {
  return typeof e == "function" ? e(t, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var sc = /* @__PURE__ */ function(e) {
  ww(n, e);
  var t = xw(n);
  function n(r) {
    var i;
    if (Ii(this, n), i = t.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = et, i.warnings = et, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, f = c.isListField, d = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(f, u, xe(d)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, f = c.fieldContext, d = f.prefixName, m = d === void 0 ? [] : d;
      return u !== void 0 ? [].concat(re(m), re(u)) : [];
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
      u == null || u(ne(ne({}, i.getMeta()), {}, {
        destroy: c
      }));
    }, i.onStoreChange = function(c, u, f) {
      var d = i.props, m = d.shouldUpdate, y = d.dependencies, v = y === void 0 ? [] : y, p = d.onReset, b = f.store, g = i.getNamePath(), C = i.getValue(c), h = i.getValue(b), w = u && si(u, g);
      switch (f.type === "valueUpdate" && f.source === "external" && C !== h && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = et, i.warnings = et, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || w) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = et, i.warnings = et, i.triggerMetaEvent(), p == null || p(), i.refresh();
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
            "touched" in E && (i.touched = E.touched), "validating" in E && !("originRCField" in E) && (i.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (i.errors = E.errors || et), "warnings" in E && (i.warnings = E.warnings || et), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !g.length && Of(m, c, b, C, h, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var x = v.map(xe);
          if (x.some(function($) {
            return si(f.relatedFields, $);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (w || (!v.length || g.length || m) && Of(m, c, b, C, h, f)) {
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
        var m = i.props, y = m.validateFirst, v = y === void 0 ? !1 : y, p = m.messageVariables, b = c || {}, g = b.triggerName, C = i.getRules();
        g && (C = C.filter(function(w) {
          return w;
        }).filter(function(w) {
          var E = w.validateTrigger;
          if (!E)
            return !0;
          var x = Hs(E);
          return x.includes(g);
        }));
        var h = EE(u, f, C, c, v, p);
        return h.catch(function(w) {
          return w;
        }).then(function() {
          var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : et;
          if (i.validatePromise === d) {
            var E;
            i.validatePromise = null;
            var x = [], $ = [];
            (E = w.forEach) === null || E === void 0 || E.call(w, function(P) {
              var S = P.rule.warningOnly, k = P.errors, D = k === void 0 ? et : k;
              S ? $.push.apply($, re(D)) : x.push.apply(x, re(D));
            }), i.errors = x, i.warnings = $, i.triggerMetaEvent(), i.reRender();
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
      var c = i.props.fieldContext, u = c.getInternalHooks(Nn), f = u.getInitialValue;
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
        return ne(ne({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var f = Ws(c);
      return f.length !== 1 || !/* @__PURE__ */ V.isValidElement(f[0]) ? {
        child: f,
        isFunction: !1
      } : {
        child: f[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, f = i.getNamePath();
      return an(c || u(!0), f);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, y = u.normalize, v = u.valuePropName, p = u.getValueProps, b = u.fieldContext, g = d !== void 0 ? d : b.validateTrigger, C = i.getNamePath(), h = b.getInternalHooks, w = b.getFieldsValue, E = h(Nn), x = E.dispatch, $ = i.getValue(), P = p || function(I) {
        return De({}, v, I);
      }, S = c[f], k = ne(ne({}, c), P($));
      k[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, T = arguments.length, _ = new Array(T), R = 0; R < T; R++)
          _[R] = arguments[R];
        m ? I = m.apply(void 0, _) : I = yE.apply(void 0, [v].concat(_)), y && (I = y(I, $, w(!0))), x({
          type: "updateValue",
          namePath: C,
          value: I
        }), S && S.apply(void 0, _);
      };
      var D = Hs(g || []);
      return D.forEach(function(I) {
        var T = k[I];
        k[I] = function() {
          T && T.apply(void 0, arguments);
          var _ = i.props.rules;
          _ && _.length && x({
            type: "validateField",
            namePath: C,
            triggerName: I
          });
        };
      }), k;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(Nn), s = o.initEntityValue;
      s(C0(i));
    }
    return i;
  }
  return Li(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, c = s(Nn), u = c.registerField;
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
      return c ? u = s : /* @__PURE__ */ V.isValidElement(s) ? u = /* @__PURE__ */ V.cloneElement(s, this.getControlled(s.props)) : (yt(!s, "`children` of Field is not validate ReactElement."), u = s), /* @__PURE__ */ V.createElement(V.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(V.Component);
sc.contextType = Ln;
sc.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function lc(e) {
  var t = e.name, n = nc(e, $E), r = V.useContext(Ln), i = t !== void 0 ? xe(t) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ V.createElement(sc, Aa({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var _E = /* @__PURE__ */ V.createContext(null), R0 = function(t) {
  var n = t.name, r = t.initialValue, i = t.children, a = t.rules, o = t.validateTrigger, s = V.useContext(Ln), c = V.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = V.useMemo(function() {
    var v = xe(s.prefixName) || [];
    return [].concat(re(v), re(xe(n)));
  }, [s.prefixName, n]), d = V.useMemo(function() {
    return ne(ne({}, s), {}, {
      prefixName: f
    });
  }, [s, f]), m = V.useMemo(function() {
    return {
      getKey: function(p) {
        var b = f.length, g = p[b];
        return [u.keys[g], p.slice(b + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return yt(!1, "Form.List only accepts function as children."), null;
  var y = function(p, b, g) {
    var C = g.source;
    return C === "internal" ? !1 : p !== b;
  };
  return /* @__PURE__ */ V.createElement(_E.Provider, {
    value: m
  }, /* @__PURE__ */ V.createElement(Ln.Provider, {
    value: d
  }, /* @__PURE__ */ V.createElement(lc, {
    name: [],
    shouldUpdate: y,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(v, p) {
    var b = v.value, g = b === void 0 ? [] : b, C = v.onChange, h = s.getFieldValue, w = function() {
      var P = h(f || []);
      return P || [];
    }, E = {
      add: function(P, S) {
        var k = w();
        S >= 0 && S <= k.length ? (u.keys = [].concat(re(u.keys.slice(0, S)), [u.id], re(u.keys.slice(S))), C([].concat(re(k.slice(0, S)), [P], re(k.slice(S))))) : (u.keys = [].concat(re(u.keys), [u.id]), C([].concat(re(k), [P]))), u.id += 1;
      },
      remove: function(P) {
        var S = w(), k = new Set(Array.isArray(P) ? P : [P]);
        k.size <= 0 || (u.keys = u.keys.filter(function(D, I) {
          return !k.has(I);
        }), C(S.filter(function(D, I) {
          return !k.has(I);
        })));
      },
      move: function(P, S) {
        if (P !== S) {
          var k = w();
          P < 0 || P >= k.length || S < 0 || S >= k.length || (u.keys = _f(u.keys, P, S), C(_f(k, P, S)));
        }
      }
    }, x = g || [];
    return Array.isArray(x) || (x = []), i(x.map(function($, P) {
      var S = u.keys[P];
      return S === void 0 && (u.keys[P] = u.id, S = u.keys[P], u.id += 1), {
        name: P,
        key: S,
        isListField: !0
      };
    }), E, p);
  })));
};
function kE(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r, i, a, o, s = [], c = !0, u = !1;
    try {
      if (a = (n = n.call(e)).next, t === 0) {
        if (Object(n) !== n)
          return;
        c = !1;
      } else
        for (; !(c = (r = a.call(n)).done) && (s.push(r.value), s.length !== t); c = !0)
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
function wi(e, t) {
  return F0(e) || kE(e, t) || rc(e, t) || N0();
}
function OE(e) {
  var t = !1, n = e.length, r = [];
  return e.length ? new Promise(function(i, a) {
    e.forEach(function(o, s) {
      o.catch(function(c) {
        return t = !0, c;
      }).then(function(c) {
        n -= 1, r[s] = c, !(n > 0) && (t && a(r), i(r));
      });
    });
  }) : Promise.resolve([]);
}
var M0 = "__@field_split__";
function ts(e) {
  return e.map(function(t) {
    return "".concat(ze(t), ":").concat(t);
  }).join(M0);
}
var Yn = /* @__PURE__ */ function() {
  function e() {
    Ii(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return Li(e, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(ts(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(ts(n));
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
      this.kvs.delete(ts(n));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function(n) {
      return re(this.kvs.entries()).map(function(r) {
        var i = wi(r, 2), a = i[0], o = i[1], s = a.split(M0);
        return n({
          key: s.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = wi(u, 3), d = f[1], m = f[2];
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
  }]), e;
}(), SE = ["name", "errors"], FE = /* @__PURE__ */ Li(function e(t) {
  var n = this;
  Ii(this, e), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === Nn ? (n.formHooked = !0, {
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
    }) : (yt(!1, "`getInternalHooks` is internal usage. Should not call directly."), null);
  }, this.useSubscribe = function(r) {
    n.subscribable = r;
  }, this.prevWithoutPreserves = null, this.setInitialValues = function(r, i) {
    if (n.initialValues = r || {}, i) {
      var a, o = ma({}, r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(s) {
        var c = s.key;
        o = tn(o, c, an(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new Yn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = an(n.initialValues, r);
    return r.length ? To(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Yn();
    return n.getFieldEntities(r).forEach(function(a) {
      var o = a.getNamePath();
      i.set(o, a);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(a) {
      var o = xe(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: xe(a)
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
    }), xf(n.store, o.map(xe));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = xe(r);
    return an(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: xe(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = xe(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = xe(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], s = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(xe), u = !1) : (c = null, u = o) : (c = o.map(xe), u = s);
    var f = n.getFieldEntities(!0), d = function(b) {
      return b.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Yn();
    c.forEach(function(p) {
      m.set(p, []);
    }), f.forEach(function(p) {
      var b = p.getNamePath();
      c.forEach(function(g) {
        g.every(function(C, h) {
          return b[h] === C;
        }) && m.update(g, function(C) {
          return [].concat(re(C), [p]);
        });
      });
    });
    var y = function(b) {
      return b.some(d);
    }, v = m.map(function(p) {
      var b = p.value;
      return b;
    });
    return u ? v.every(y) : v.some(y);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(o) {
        return o.isFieldValidating();
      });
    var a = r.map(xe);
    return i.some(function(o) {
      var s = o.getNamePath();
      return si(a, s) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Yn(), a = n.getFieldEntities(!0);
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
          var m = f.getNamePath(), y = n.getInitialValue(m);
          if (y !== void 0)
            yt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var v = i.get(m);
            if (v && v.size > 1)
              yt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (v) {
              var p = n.getFieldValue(m);
              (!r.skipExist || p === void 0) && n.updateStore(tn(n.store, m, re(v)[0].value));
            }
          }
        }
      });
    }, s;
    r.entities ? s = r.entities : r.namePathList ? (s = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var f;
        (f = s).push.apply(f, re(re(u).map(function(d) {
          return d.entity;
        })));
      }
    })) : s = a, o(s);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(ma({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(xe);
    a.forEach(function(o) {
      var s = n.getInitialValue(o);
      n.updateStore(tn(n.store, o, s));
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
      var c = nc(o, SE), u = xe(s);
      a.push(u), "value" in c && n.updateStore(tn(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), s = a.getMeta(), c = ne(ne({}, s), {}, {
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
      var a = r.getNamePath(), o = an(n.store, a);
      o === void 0 && n.updateStore(tn(n.store, a, i));
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
            !T0(d.getNamePath(), i)
          );
        })) {
          var f = n.store;
          n.updateStore(tn(f, i, u, !0)), n.notifyObservers(f, [i], {
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
      var o = ne(ne({}, a), {}, {
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
      relatedFields: [i].concat(re(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = xe(r), o = n.store;
    n.updateStore(tn(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var s = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = xf(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(re(s)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = ma(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new Yn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(f) {
        var d = xe(f);
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
        var s = new Yn();
        i.forEach(function(u) {
          var f = u.name, d = u.errors;
          s.set(f, d);
        }), o.forEach(function(u) {
          u.errors = s.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var f = u.name;
        return si(r, f);
      });
      a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a = !!r, o = a ? r.map(xe) : [], s = [];
    n.getFieldEntities(!0).forEach(function(f) {
      if (a || o.push(f.getNamePath()), i != null && i.recursive && a) {
        var d = f.getNamePath();
        // nameList[i] === undefined 说明是以 nameList 开头的
        // ['name'] -> ['name','list']
        d.every(function(v, p) {
          return r[p] === v || r[p] === void 0;
        }) && o.push(d);
      }
      if (!(!f.props.rules || !f.props.rules.length)) {
        var m = f.getNamePath();
        if (!a || si(o, m)) {
          var y = f.validateRules(ne({
            validateMessages: ne(ne({}, O0), n.validateMessages)
          }, i));
          s.push(y.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(v) {
            var p, b = [], g = [];
            return (p = v.forEach) === null || p === void 0 || p.call(v, function(C) {
              var h = C.rule.warningOnly, w = C.errors;
              h ? g.push.apply(g, re(w)) : b.push.apply(b, re(w));
            }), b.length ? Promise.reject({
              name: m,
              errors: b,
              warnings: g
            }) : {
              name: m,
              errors: b,
              warnings: g
            };
          }));
        }
      }
    });
    var c = OE(s);
    n.lastValidatePromise = c, c.catch(function(f) {
      return f;
    }).then(function(f) {
      var d = f.map(function(m) {
        var y = m.name;
        return y;
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
  }, this.forceRootUpdate = t;
});
function cc(e) {
  var t = V.useRef(), n = V.useState({}), r = wi(n, 2), i = r[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        i({});
      }, o = new FE(a);
      t.current = o.getForm();
    }
  return [t.current];
}
var el = /* @__PURE__ */ V.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), NE = function(t) {
  var n = t.validateMessages, r = t.onFormChange, i = t.onFormFinish, a = t.children, o = V.useContext(el), s = V.useRef({});
  return /* @__PURE__ */ V.createElement(el.Provider, {
    value: ne(ne({}, o), {}, {
      validateMessages: ne(ne({}, o.validateMessages), n),
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
        u && (s.current = ne(ne({}, s.current), {}, De({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = ne({}, s.current);
        delete f[u], s.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, PE = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], AE = function(t, n) {
  var r = t.name, i = t.initialValues, a = t.fields, o = t.form, s = t.preserve, c = t.children, u = t.component, f = u === void 0 ? "form" : u, d = t.validateMessages, m = t.validateTrigger, y = m === void 0 ? "onChange" : m, v = t.onValuesChange, p = t.onFieldsChange, b = t.onFinish, g = t.onFinishFailed, C = nc(t, PE), h = V.useContext(el), w = cc(o), E = wi(w, 1), x = E[0], $ = x.getInternalHooks(Nn), P = $.useSubscribe, S = $.setInitialValues, k = $.setCallbacks, D = $.setValidateMessages, I = $.setPreserve, T = $.destroyForm;
  V.useImperativeHandle(n, function() {
    return x;
  }), V.useEffect(function() {
    return h.registerForm(r, x), function() {
      h.unregisterForm(r);
    };
  }, [h, x, r]), D(ne(ne({}, h.validateMessages), d)), k({
    onValuesChange: v,
    onFieldsChange: function(W) {
      if (h.triggerFormChange(r, W), p) {
        for (var H = arguments.length, q = new Array(H > 1 ? H - 1 : 0), G = 1; G < H; G++)
          q[G - 1] = arguments[G];
        p.apply(void 0, [W].concat(q));
      }
    },
    onFinish: function(W) {
      h.triggerFormFinish(r, W), b && b(W);
    },
    onFinishFailed: g
  }), I(s);
  var _ = V.useRef(null);
  S(i, !_.current), _.current || (_.current = !0), V.useEffect(
    function() {
      return T;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var R, N = typeof c == "function";
  if (N) {
    var O = x.getFieldsValue(!0);
    R = c(O, x);
  } else
    R = c;
  P(!N);
  var M = V.useRef();
  V.useEffect(function() {
    gE(M.current || [], a || []) || x.setFields(a || []), M.current = a;
  }, [a, x]);
  var A = V.useMemo(function() {
    return ne(ne({}, x), {}, {
      validateTrigger: y
    });
  }, [x, y]), F = /* @__PURE__ */ V.createElement(Ln.Provider, {
    value: A
  }, R);
  return f === !1 ? F : /* @__PURE__ */ V.createElement(f, Aa({}, C, {
    onSubmit: function(W) {
      W.preventDefault(), W.stopPropagation(), x.submit();
    },
    onReset: function(W) {
      var H;
      W.preventDefault(), x.resetFields(), (H = C.onReset) === null || H === void 0 || H.call(C, W);
    }
  }), F);
};
function Sf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function uc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = r === void 0 ? [] : r, a = t[1], o = K(), s = wi(o, 2), c = s[0], u = s[1], f = ee(function() {
    return Sf(c);
  }, [c]), d = j(f);
  d.current = f;
  var m = at(Ln), y = a || m, v = y && y._init, p = xe(i), b = j(p);
  return b.current = p, Y(
    function() {
      if (v) {
        var g = y.getFieldsValue, C = y.getInternalHooks, h = C(Nn), w = h.registerWatch, E = w(function($) {
          var P = an($, b.current), S = Sf(P);
          d.current !== S && (d.current = S, u(P));
        }), x = an(g(), b.current);
        return u(x), E;
      }
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [v]
  ), c;
}
var TE = /* @__PURE__ */ V.forwardRef(AE), Rr = TE;
Rr.FormProvider = NE;
Rr.Field = lc;
Rr.List = R0;
Rr.useForm = cc;
Rr.useWatch = uc;
const I0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, fc = l.createContext(I0), Ff = l.createContext(null), L0 = () => null;
var RE = dl, ME = $i;
function IE(e, t, n) {
  (n !== void 0 && !ME(e[t], n) || n === void 0 && !(t in e)) && RE(e, t, n);
}
var D0 = IE;
function LE(e) {
  return function(t, n, r) {
    for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var DE = LE, VE = DE, jE = VE(), BE = jE, Ra = { exports: {} };
Ra.exports;
(function(e, t) {
  var n = bt, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var d = u.length, m = s ? s(d) : new u.constructor(d);
    return u.copy(m), m;
  }
  e.exports = c;
})(Ra, Ra.exports);
var WE = Ra.exports, Nf = Od;
function ZE(e) {
  var t = new e.constructor(e.byteLength);
  return new Nf(t).set(new Nf(e)), t;
}
var HE = ZE, zE = HE;
function UE(e, t) {
  var n = t ? zE(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var qE = UE;
function KE(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var GE = KE, YE = Nt, Pf = Object.create, XE = /* @__PURE__ */ function() {
  function e() {
  }
  return function(t) {
    if (!YE(t))
      return {};
    if (Pf)
      return Pf(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), QE = XE, JE = QE, eC = Nd, tC = vl;
function nC(e) {
  return typeof e.constructor == "function" && !tC(e) ? JE(eC(e)) : {};
}
var rC = nC, iC = ja, aC = Bn;
function oC(e) {
  return aC(e) && iC(e);
}
var sC = oC;
function lC(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var V0 = lC;
function cC(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var uC = cC, fC = Nt, dC = vl, mC = uC, hC = Object.prototype, vC = hC.hasOwnProperty;
function pC(e) {
  if (!fC(e))
    return mC(e);
  var t = dC(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !vC.call(e, r)) || n.push(r);
  return n;
}
var gC = pC, yC = pd, bC = gC, wC = ja;
function EC(e) {
  return wC(e) ? yC(e, !0) : bC(e);
}
var j0 = EC, CC = cd, xC = j0;
function $C(e) {
  return CC(e, xC(e));
}
var _C = $C, Af = D0, kC = WE, OC = qE, SC = GE, FC = rC, Tf = vd, Rf = Ba, NC = sC, PC = ml, AC = fl, TC = Nt, RC = k6, MC = hl, Mf = V0, IC = _C;
function LC(e, t, n, r, i, a, o) {
  var s = Mf(e, n), c = Mf(t, n), u = o.get(c);
  if (u) {
    Af(e, n, u);
    return;
  }
  var f = a ? a(s, c, n + "", e, t, o) : void 0, d = f === void 0;
  if (d) {
    var m = Rf(c), y = !m && PC(c), v = !m && !y && MC(c);
    f = c, m || y || v ? Rf(s) ? f = s : NC(s) ? f = SC(s) : y ? (d = !1, f = kC(c, !0)) : v ? (d = !1, f = OC(c, !0)) : f = [] : RC(c) || Tf(c) ? (f = s, Tf(s) ? f = IC(s) : (!TC(s) || AC(s)) && (f = FC(c))) : d = !1;
  }
  d && (o.set(c, f), i(f, c, r, a, o), o.delete(c)), Af(e, n, f);
}
var DC = LC, VC = _d, jC = D0, BC = BE, WC = DC, ZC = Nt, HC = j0, zC = V0;
function B0(e, t, n, r, i) {
  e !== t && BC(t, function(a, o) {
    if (i || (i = new VC()), ZC(a))
      WC(e, t, o, n, B0, r, i);
    else {
      var s = r ? r(zC(e, o), a, o + "", e, t, i) : void 0;
      s === void 0 && (s = a), jC(e, o, s);
    }
  }, HC);
}
var UC = B0, qC = UC, KC = md, GC = KC(function(e, t, n) {
  qC(e, t, n);
}), YC = GC;
const XC = /* @__PURE__ */ lt(YC), W0 = (e) => l.createElement(R0, {
  name: e.name,
  initialValue: e.initialValue
}, (t, n) => {
  const r = t.map((a) => ({
    index: a.name,
    key: a.key
  })), i = e.children(r, n).map((a, o) => {
    var s;
    return l.createElement(kt, {
      key: r[o].key,
      mode: "card",
      header: (s = e.renderHeader) === null || s === void 0 ? void 0 : s.call(e, r[o], n)
    }, a);
  });
  return e.renderAdd && i.push(l.createElement(kt, {
    key: "add",
    mode: "card"
  }, l.createElement(kt.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      e.onAdd ? e.onAdd(n) : n.add();
    },
    arrow: !1
  }, e.renderAdd()))), l.createElement(l.Fragment, null, i);
}), If = "adm-form", QC = I0, JC = fe((e, t) => {
  const n = U(QC, e), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: s,
    footer: c,
    mode: u,
    disabled: f,
    requiredMarkStyle: d
  } = n, m = yr(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: y
  } = pe(), v = ee(() => XC({}, y.Form.defaultValidateMessages, m.validateMessages), [y.Form.defaultValidateMessages, m.validateMessages]), p = [];
  let b = null, g = [], C = 0;
  function h() {
    g.length !== 0 && (C += 1, p.push(l.createElement(kt, {
      header: b,
      key: C,
      mode: u
    }, g)), g = []);
  }
  return mn(n.children, (w) => {
    if (l.isValidElement(w)) {
      if (w.type === L0) {
        h(), b = w.props.children;
        return;
      }
      if (w.type === W0) {
        h(), p.push(w);
        return;
      }
    }
    g.push(w);
  }), h(), l.createElement(Rr, Object.assign({
    className: B(If, r),
    style: i,
    ref: t
  }, m, {
    validateMessages: v
  }), l.createElement(fc.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: d,
      disabled: f
    }
  }, p), c && l.createElement("div", {
    className: `${If}-footer`
  }, c));
});
var Ei = {}, Z0 = { exports: {} }, H0 = { exports: {} };
(function(e) {
  function t(n) {
    "@babel/helpers - typeof";
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(H0);
var ex = H0.exports;
(function(e) {
  var t = ex.default;
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
    if (i === null || t(i) !== "object" && typeof i != "function")
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
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Z0);
var Ro = Z0.exports, z0 = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(z0);
var Mo = z0.exports, ut = {};
Object.defineProperty(ut, "__esModule", {
  value: !0
});
ut.call = dc;
ut.default = void 0;
ut.note = K0;
ut.noteOnce = Y0;
ut.preMessage = void 0;
ut.resetWarned = G0;
ut.warning = q0;
ut.warningOnce = Vi;
var tl = {}, U0 = function(t) {
};
ut.preMessage = U0;
function q0(e, t) {
}
function K0(e, t) {
}
function G0() {
  tl = {};
}
function dc(e, t, n) {
  !t && !tl[n] && (e(!1, n), tl[n] = !0);
}
function Vi(e, t) {
  dc(q0, e, t);
}
function Y0(e, t) {
  dc(K0, e, t);
}
Vi.preMessage = U0;
Vi.resetWarned = G0;
Vi.noteOnce = Y0;
var tx = Vi;
ut.default = tx;
var nx = Ro.default, rx = Mo.default;
Object.defineProperty(Ei, "__esModule", {
  value: !0
});
var X0 = Ei.default = Ei.HOOK_MARK = void 0, ix = rx(ut), ax = nx(l), ox = "RC_FORM_INTERNAL_HOOKS";
Ei.HOOK_MARK = ox;
var ue = function() {
  (0, ix.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, sx = /* @__PURE__ */ ax.createContext({
  getFieldValue: ue,
  getFieldsValue: ue,
  getFieldError: ue,
  getFieldWarning: ue,
  getFieldsError: ue,
  isFieldsTouched: ue,
  isFieldTouched: ue,
  isFieldValidating: ue,
  isFieldsValidating: ue,
  resetFields: ue,
  setFields: ue,
  setFieldValue: ue,
  setFieldsValue: ue,
  validateFields: ue,
  submit: ue,
  getInternalHooks: function() {
    return ue(), {
      dispatch: ue,
      initEntityValue: ue,
      registerField: ue,
      useSubscribe: ue,
      setInitialValues: ue,
      destroyForm: ue,
      setCallbacks: ue,
      registerWatch: ue,
      getFields: ue,
      setValidateMessages: ue,
      setPreserve: ue,
      getInitialValue: ue
    };
  }
}), lx = sx;
X0 = Ei.default = lx;
function ns(e) {
  return e === void 0 || e === !1 ? [] : Array.isArray(e) ? e : [e];
}
function cx(e) {
  const t = e.prototype;
  return !!(t && t.isReactComponent);
}
function ux(e) {
  return typeof e == "function" && !cx(e) && e.defaultProps === void 0;
}
function Q0(e) {
  return Ms.isFragment(e) ? !1 : Ms.isMemo(e) ? Q0(e.type) : !ux(e.type);
}
const fx = Ve((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), dx = ["top", "right", "bottom", "left"], mr = Math.min, An = Math.max, Ma = Math.round, na = Math.floor, cn = (e) => ({
  x: e,
  y: e
}), mx = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, hx = {
  start: "end",
  end: "start"
};
function nl(e, t, n) {
  return An(e, mr(t, n));
}
function un(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function fn(e) {
  return e.split("-")[0];
}
function ji(e) {
  return e.split("-")[1];
}
function mc(e) {
  return e === "x" ? "y" : "x";
}
function hc(e) {
  return e === "y" ? "height" : "width";
}
function Bi(e) {
  return ["top", "bottom"].includes(fn(e)) ? "y" : "x";
}
function vc(e) {
  return mc(Bi(e));
}
function vx(e, t, n) {
  n === void 0 && (n = !1);
  const r = ji(e), i = vc(e), a = hc(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (o = Ia(o)), [o, Ia(o)];
}
function px(e) {
  const t = Ia(e);
  return [rl(e), t, rl(t)];
}
function rl(e) {
  return e.replace(/start|end/g, (t) => hx[t]);
}
function gx(e, t, n) {
  const r = ["left", "right"], i = ["right", "left"], a = ["top", "bottom"], o = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? i : r : t ? r : i;
    case "left":
    case "right":
      return t ? a : o;
    default:
      return [];
  }
}
function yx(e, t, n, r) {
  const i = ji(e);
  let a = gx(fn(e), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), t && (a = a.concat(a.map(rl)))), a;
}
function Ia(e) {
  return e.replace(/left|right|bottom|top/g, (t) => mx[t]);
}
function bx(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function J0(e) {
  return typeof e != "number" ? bx(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function La(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Lf(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const a = Bi(t), o = vc(t), s = hc(o), c = fn(t), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[s] / 2 - i[s] / 2;
  let y;
  switch (c) {
    case "top":
      y = {
        x: f,
        y: r.y - i.height
      };
      break;
    case "bottom":
      y = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      y = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      y = {
        x: r.x - i.width,
        y: d
      };
      break;
    default:
      y = {
        x: r.x,
        y: r.y
      };
  }
  switch (ji(t)) {
    case "start":
      y[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      y[o] += m * (n && u ? -1 : 1);
      break;
  }
  return y;
}
const wx = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: i = "absolute",
    middleware: a = [],
    platform: o
  } = n, s = a.filter(Boolean), c = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let u = await o.getElementRects({
    reference: e,
    floating: t,
    strategy: i
  }), {
    x: f,
    y: d
  } = Lf(u, r, c), m = r, y = {}, v = 0;
  for (let p = 0; p < s.length; p++) {
    const {
      name: b,
      fn: g
    } = s[p], {
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
      middlewareData: y,
      rects: u,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (f = C ?? f, d = h ?? d, y = {
      ...y,
      [b]: {
        ...y[b],
        ...w
      }
    }, E && v <= 50) {
      v++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : E.rects), {
        x: f,
        y: d
      } = Lf(u, m, c)), p = -1;
      continue;
    }
  }
  return {
    x: f,
    y: d,
    placement: m,
    strategy: i,
    middlewareData: y
  };
};
async function Da(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: i,
    platform: a,
    rects: o,
    elements: s,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: y = 0
  } = un(t, e), v = J0(y), b = s[m ? d === "floating" ? "reference" : "floating" : d], g = La(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
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
  }, E = La(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: h,
    strategy: c
  }) : C);
  return {
    top: (g.top - E.top + v.top) / w.y,
    bottom: (E.bottom - g.bottom + v.bottom) / w.y,
    left: (g.left - E.left + v.left) / w.x,
    right: (E.right - g.right + v.right) / w.x
  };
}
const Ex = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: a,
      platform: o,
      elements: s,
      middlewareData: c
    } = t, {
      element: u,
      padding: f = 0
    } = un(e, t) || {};
    if (u == null)
      return {};
    const d = J0(f), m = {
      x: n,
      y: r
    }, y = vc(i), v = hc(y), p = await o.getDimensions(u), b = y === "y", g = b ? "top" : "left", C = b ? "bottom" : "right", h = b ? "clientHeight" : "clientWidth", w = a.reference[v] + a.reference[y] - m[y] - a.floating[v], E = m[y] - a.reference[y], x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let $ = x ? x[h] : 0;
    (!$ || !await (o.isElement == null ? void 0 : o.isElement(x))) && ($ = s.floating[h] || a.floating[v]);
    const P = w / 2 - E / 2, S = $ / 2 - p[v] / 2 - 1, k = mr(d[g], S), D = mr(d[C], S), I = k, T = $ - p[v] - D, _ = $ / 2 - p[v] / 2 + P, R = nl(I, _, T), N = !c.arrow && ji(i) != null && _ != R && a.reference[v] / 2 - (_ < I ? k : D) - p[v] / 2 < 0, O = N ? _ < I ? _ - I : _ - T : 0;
    return {
      [y]: m[y] + O,
      data: {
        [y]: R,
        centerOffset: _ - R - O,
        ...N && {
          alignmentOffset: O
        }
      },
      reset: N
    };
  }
}), Cx = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: i,
        middlewareData: a,
        rects: o,
        initialPlacement: s,
        platform: c,
        elements: u
      } = t, {
        mainAxis: f = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: y = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: p = !0,
        ...b
      } = un(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const g = fn(i), C = fn(s) === s, h = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), w = m || (C || !p ? [Ia(s)] : px(s));
      !m && v !== "none" && w.push(...yx(s, p, v, h));
      const E = [s, ...w], x = await Da(t, b), $ = [];
      let P = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && $.push(x[g]), d) {
        const I = vx(i, o, h);
        $.push(x[I[0]], x[I[1]]);
      }
      if (P = [...P, {
        placement: i,
        overflows: $
      }], !$.every((I) => I <= 0)) {
        var S, k;
        const I = (((S = a.flip) == null ? void 0 : S.index) || 0) + 1, T = E[I];
        if (T)
          return {
            data: {
              index: I,
              overflows: P
            },
            reset: {
              placement: T
            }
          };
        let _ = (k = P.filter((R) => R.overflows[0] <= 0).sort((R, N) => R.overflows[1] - N.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!_)
          switch (y) {
            case "bestFit": {
              var D;
              const R = (D = P.map((N) => [N.placement, N.overflows.filter((O) => O > 0).reduce((O, M) => O + M, 0)]).sort((N, O) => N[1] - O[1])[0]) == null ? void 0 : D[0];
              R && (_ = R);
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
function Df(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Vf(e) {
  return dx.some((t) => e[t] >= 0);
}
const xx = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...i
      } = un(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Da(t, {
            ...i,
            elementContext: "reference"
          }), o = Df(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Vf(o)
            }
          };
        }
        case "escaped": {
          const a = await Da(t, {
            ...i,
            altBoundary: !0
          }), o = Df(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Vf(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function $x(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = fn(n), s = ji(n), c = Bi(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = un(t, e);
  let {
    mainAxis: m,
    crossAxis: y,
    alignmentAxis: v
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
  return s && typeof v == "number" && (y = s === "end" ? v * -1 : v), c ? {
    x: y * f,
    y: m * u
  } : {
    x: m * u,
    y: y * f
  };
}
const _x = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await $x(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, kx = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: i
      } = t, {
        mainAxis: a = !0,
        crossAxis: o = !1,
        limiter: s = {
          fn: (b) => {
            let {
              x: g,
              y: C
            } = b;
            return {
              x: g,
              y: C
            };
          }
        },
        ...c
      } = un(e, t), u = {
        x: n,
        y: r
      }, f = await Da(t, c), d = Bi(fn(i)), m = mc(d);
      let y = u[m], v = u[d];
      if (a) {
        const b = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", C = y + f[b], h = y - f[g];
        y = nl(C, y, h);
      }
      if (o) {
        const b = d === "y" ? "top" : "left", g = d === "y" ? "bottom" : "right", C = v + f[b], h = v - f[g];
        v = nl(C, v, h);
      }
      const p = s.fn({
        ...t,
        [m]: y,
        [d]: v
      });
      return {
        ...p,
        data: {
          x: p.x - n,
          y: p.y - r
        }
      };
    }
  };
}, Ox = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: i,
        rects: a,
        middlewareData: o
      } = t, {
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = un(e, t), f = {
        x: n,
        y: r
      }, d = Bi(i), m = mc(d);
      let y = f[m], v = f[d];
      const p = un(s, t), b = typeof p == "number" ? {
        mainAxis: p,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...p
      };
      if (c) {
        const h = m === "y" ? "height" : "width", w = a.reference[m] - a.floating[h] + b.mainAxis, E = a.reference[m] + a.reference[h] - b.mainAxis;
        y < w ? y = w : y > E && (y = E);
      }
      if (u) {
        var g, C;
        const h = m === "y" ? "width" : "height", w = ["top", "left"].includes(fn(i)), E = a.reference[d] - a.floating[h] + (w && ((g = o.offset) == null ? void 0 : g[d]) || 0) + (w ? 0 : b.crossAxis), x = a.reference[d] + a.reference[h] + (w ? 0 : ((C = o.offset) == null ? void 0 : C[d]) || 0) - (w ? b.crossAxis : 0);
        v < E ? v = E : v > x && (v = x);
      }
      return {
        [m]: y,
        [d]: v
      };
    }
  };
};
function dn(e) {
  return em(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Xe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ut(e) {
  var t;
  return (t = (em(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function em(e) {
  return e instanceof Node || e instanceof Xe(e).Node;
}
function Ht(e) {
  return e instanceof Element || e instanceof Xe(e).Element;
}
function Ft(e) {
  return e instanceof HTMLElement || e instanceof Xe(e).HTMLElement;
}
function jf(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Xe(e).ShadowRoot;
}
function Wi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = st(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function Sx(e) {
  return ["table", "td", "th"].includes(dn(e));
}
function pc(e) {
  const t = gc(), n = st(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Fx(e) {
  let t = hr(e);
  for (; Ft(t) && !Io(t); ) {
    if (pc(t))
      return t;
    t = hr(t);
  }
  return null;
}
function gc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Io(e) {
  return ["html", "body", "#document"].includes(dn(e));
}
function st(e) {
  return Xe(e).getComputedStyle(e);
}
function Lo(e) {
  return Ht(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function hr(e) {
  if (dn(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    jf(e) && e.host || // Fallback.
    Ut(e)
  );
  return jf(t) ? t.host : t;
}
function tm(e) {
  const t = hr(e);
  return Io(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ft(t) && Wi(t) ? t : tm(t);
}
function Ci(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = tm(e), a = i === ((r = e.ownerDocument) == null ? void 0 : r.body), o = Xe(i);
  return a ? t.concat(o, o.visualViewport || [], Wi(i) ? i : [], o.frameElement && n ? Ci(o.frameElement) : []) : t.concat(i, Ci(i, [], n));
}
function nm(e) {
  const t = st(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = Ft(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Ma(n) !== a || Ma(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    $: s
  };
}
function yc(e) {
  return Ht(e) ? e : e.contextElement;
}
function or(e) {
  const t = yc(e);
  if (!Ft(t))
    return cn(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = nm(t);
  let o = (a ? Ma(n.width) : n.width) / r, s = (a ? Ma(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
const Nx = /* @__PURE__ */ cn(0);
function rm(e) {
  const t = Xe(e);
  return !gc() || !t.visualViewport ? Nx : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Px(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Xe(e) ? !1 : t;
}
function Dn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), a = yc(e);
  let o = cn(1);
  t && (r ? Ht(r) && (o = or(r)) : o = or(e));
  const s = Px(a, n, r) ? rm(a) : cn(0);
  let c = (i.left + s.x) / o.x, u = (i.top + s.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = Xe(a), y = r && Ht(r) ? Xe(r) : r;
    let v = m.frameElement;
    for (; v && r && y !== m; ) {
      const p = or(v), b = v.getBoundingClientRect(), g = st(v), C = b.left + (v.clientLeft + parseFloat(g.paddingLeft)) * p.x, h = b.top + (v.clientTop + parseFloat(g.paddingTop)) * p.y;
      c *= p.x, u *= p.y, f *= p.x, d *= p.y, c += C, u += h, v = Xe(v).frameElement;
    }
  }
  return La({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function Ax(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = Ft(n), a = Ut(n);
  if (n === a)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = cn(1);
  const c = cn(0);
  if ((i || !i && r !== "fixed") && ((dn(n) !== "body" || Wi(a)) && (o = Lo(n)), Ft(n))) {
    const u = Dn(n);
    s = or(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - o.scrollLeft * s.x + c.x,
    y: t.y * s.y - o.scrollTop * s.y + c.y
  };
}
function Tx(e) {
  return Array.from(e.getClientRects());
}
function im(e) {
  return Dn(Ut(e)).left + Lo(e).scrollLeft;
}
function Rx(e) {
  const t = Ut(e), n = Lo(e), r = e.ownerDocument.body, i = An(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = An(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + im(e);
  const s = -n.scrollTop;
  return st(r).direction === "rtl" && (o += An(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function Mx(e, t) {
  const n = Xe(e), r = Ut(e), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = gc();
    (!u || u && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: s,
    y: c
  };
}
function Ix(e, t) {
  const n = Dn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ft(e) ? or(e) : cn(1), o = e.clientWidth * a.x, s = e.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: s,
    x: c,
    y: u
  };
}
function Bf(e, t, n) {
  let r;
  if (t === "viewport")
    r = Mx(e, n);
  else if (t === "document")
    r = Rx(Ut(e));
  else if (Ht(t))
    r = Ix(t, n);
  else {
    const i = rm(e);
    r = {
      ...t,
      x: t.x - i.x,
      y: t.y - i.y
    };
  }
  return La(r);
}
function am(e, t) {
  const n = hr(e);
  return n === t || !Ht(n) || Io(n) ? !1 : st(n).position === "fixed" || am(n, t);
}
function Lx(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ci(e, [], !1).filter((s) => Ht(s) && dn(s) !== "body"), i = null;
  const a = st(e).position === "fixed";
  let o = a ? hr(e) : e;
  for (; Ht(o) && !Io(o); ) {
    const s = st(o), c = pc(o);
    !c && s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Wi(o) && !c && am(e, o)) ? r = r.filter((f) => f !== o) : i = s, o = hr(o);
  }
  return t.set(e, r), r;
}
function Dx(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const o = [...n === "clippingAncestors" ? Lx(t, this._c) : [].concat(n), r], s = o[0], c = o.reduce((u, f) => {
    const d = Bf(t, f, i);
    return u.top = An(d.top, u.top), u.right = mr(d.right, u.right), u.bottom = mr(d.bottom, u.bottom), u.left = An(d.left, u.left), u;
  }, Bf(t, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Vx(e) {
  return nm(e);
}
function jx(e, t, n) {
  const r = Ft(t), i = Ut(t), a = n === "fixed", o = Dn(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = cn(0);
  if (r || !r && !a)
    if ((dn(t) !== "body" || Wi(i)) && (s = Lo(t)), r) {
      const u = Dn(t, !0, a, t);
      c.x = u.x + t.clientLeft, c.y = u.y + t.clientTop;
    } else
      i && (c.x = im(i));
  return {
    x: o.left + s.scrollLeft - c.x,
    y: o.top + s.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function Wf(e, t) {
  return !Ft(e) || st(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function om(e, t) {
  const n = Xe(e);
  if (!Ft(e))
    return n;
  let r = Wf(e, t);
  for (; r && Sx(r) && st(r).position === "static"; )
    r = Wf(r, t);
  return r && (dn(r) === "html" || dn(r) === "body" && st(r).position === "static" && !pc(r)) ? n : r || Fx(e) || n;
}
const Bx = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const i = this.getOffsetParent || om, a = this.getDimensions;
  return {
    reference: jx(t, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function Wx(e) {
  return st(e).direction === "rtl";
}
const Zx = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ax,
  getDocumentElement: Ut,
  getClippingRect: Dx,
  getOffsetParent: om,
  getElementRects: Bx,
  getClientRects: Tx,
  getDimensions: Vx,
  getScale: or,
  isElement: Ht,
  isRTL: Wx
};
function Hx(e, t) {
  let n = null, r;
  const i = Ut(e);
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
    } = e.getBoundingClientRect();
    if (s || t(), !d || !m)
      return;
    const y = na(f), v = na(i.clientWidth - (u + d)), p = na(i.clientHeight - (f + m)), b = na(u), C = {
      rootMargin: -y + "px " + -v + "px " + -p + "px " + -b + "px",
      threshold: An(0, mr(1, c)) || 1
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
    n.observe(e);
  }
  return o(!0), a;
}
function zx(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = yc(e), f = i || a ? [...u ? Ci(u) : [], ...Ci(t)] : [];
  f.forEach((g) => {
    i && g.addEventListener("scroll", n, {
      passive: !0
    }), a && g.addEventListener("resize", n);
  });
  const d = u && s ? Hx(u, n) : null;
  let m = -1, y = null;
  o && (y = new ResizeObserver((g) => {
    let [C] = g;
    C && C.target === u && y && (y.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      y && y.observe(t);
    })), n();
  }), u && !c && y.observe(u), y.observe(t));
  let v, p = c ? Dn(e) : null;
  c && b();
  function b() {
    const g = Dn(e);
    p && (g.x !== p.x || g.y !== p.y || g.width !== p.width || g.height !== p.height) && n(), p = g, v = requestAnimationFrame(b);
  }
  return n(), () => {
    f.forEach((g) => {
      i && g.removeEventListener("scroll", n), a && g.removeEventListener("resize", n);
    }), d && d(), y && y.disconnect(), y = null, c && cancelAnimationFrame(v);
  };
}
const Ux = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: Zx,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return wx(e, t, {
    ...i,
    platform: a
  });
};
class qx extends l.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const t = Bm(this);
    t instanceof Element ? this.element = t : this.element = null;
  }
  render() {
    return l.Children.only(this.props.children);
  }
}
const Kx = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function Gx(e) {
  var t;
  return (t = Kx[e]) !== null && t !== void 0 ? t : e;
}
let rr = null, sr = null;
gr && (rr = document.createElement("div"), rr.className = "adm-px-tester", rr.style.setProperty("--size", "10"), document.body.appendChild(rr), sr = document.createElement("div"), sr.className = "adm-px-tester", document.body.appendChild(sr));
function Tn(e) {
  return rr === null || sr === null || rr.getBoundingClientRect().height === 10 ? e : (sr.style.setProperty("--size", e.toString()), sr.getBoundingClientRect().height);
}
const pn = "adm-popover", Yx = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body,
  mode: "light"
}, sm = fe((e, t) => {
  const n = U(Yx, e), r = Gx(n.placement), [i, a] = te({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  ye(t, () => ({
    show: () => a(!0),
    hide: () => a(!1),
    visible: i
  }), [i]);
  const o = j(null), s = j(null), c = j(null), u = ln(n.stopPropagation, Z(n, l.createElement("div", {
    className: B(pn, `${pn}-${n.mode}`, {
      [`${pn}-hidden`]: !i
    }),
    ref: s
  }, l.createElement("div", {
    className: `${pn}-arrow`,
    ref: c
  }, l.createElement(fx, {
    className: `${pn}-arrow-icon`
  })), l.createElement("div", {
    className: `${pn}-inner`
  }, l.createElement("div", {
    className: `${pn}-inner-content`
  }, n.content))))), [f, d] = K(null);
  function m() {
    var v, p, b;
    return ke(this, void 0, void 0, function* () {
      const g = (p = (v = o.current) === null || v === void 0 ? void 0 : v.element) !== null && p !== void 0 ? p : null, C = s.current, h = c.current;
      if (d(g), !g || !C || !h)
        return;
      const {
        x: w,
        y: E,
        placement: x,
        middlewareData: $
      } = yield Ux(g, C, {
        placement: r,
        middleware: [_x(Tn(12)), kx({
          padding: Tn(4),
          crossAxis: !1,
          limiter: Ox()
        }), Cx(), xx(), Ex({
          element: h,
          padding: Tn(12)
        })]
      });
      Object.assign(C.style, {
        left: `${w}px`,
        top: `${E}px`
      });
      const P = x.split("-")[0], S = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[P], {
        x: k,
        y: D
      } = (b = $.arrow) !== null && b !== void 0 ? b : {};
      Object.assign(h.style, {
        left: k != null ? `${k}px` : "",
        top: D != null ? `${D}px` : "",
        right: "",
        bottom: "",
        [S]: "calc(var(--arrow-size) * -1)"
      });
      const I = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[P];
      h.style.setProperty("--arrow-icon-rotate", I);
    });
  }
  Se(() => {
    m();
  }), Y(() => {
    if (!f || !n.trigger)
      return;
    function v() {
      a((p) => !p);
    }
    return f.addEventListener("click", v), () => {
      f.removeEventListener("click", v);
    };
  }, [f, n.trigger]), Y(() => {
    const v = s.current;
    if (!(!f || !v))
      return zx(f, v, m, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), xd(() => {
    n.trigger && a(!1);
  }, [() => {
    var v;
    return (v = o.current) === null || v === void 0 ? void 0 : v.element;
  }, s], ["click", "touchmove"]);
  const y = io(i, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(qx, {
    ref: o
  }, n.children), y && Sr(n.getContainer, u));
}), Qt = "adm-popover-menu", Xx = fe((e, t) => {
  const n = j(null);
  ye(t, () => n.current, []);
  const r = He((a) => {
    var o;
    const {
      onAction: s
    } = e;
    s && s(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [e.onAction]), i = ee(() => {
    const a = (e == null ? void 0 : e.maxCount) && e.actions.length > (e == null ? void 0 : e.maxCount), o = (e == null ? void 0 : e.maxCount) && (e == null ? void 0 : e.maxCount) * 48;
    return l.createElement("div", {
      className: `${Qt}-list`
    }, l.createElement("div", {
      className: B(`${Qt}-list-inner`, {
        [`${Qt}-list-scroll`]: a
      }),
      style: {
        height: o
      }
    }, e.actions.map((s, c) => {
      var u;
      return l.createElement("a", {
        key: (u = s.key) !== null && u !== void 0 ? u : c,
        className: B(`${Qt}-item`, "adm-plain-anchor", {
          [`${Qt}-item-disabled`]: s.disabled
        }),
        onClick: () => {
          var f;
          s.disabled || (r(s), (f = s.onClick) === null || f === void 0 || f.call(s));
        }
      }, s.icon && l.createElement("div", {
        className: `${Qt}-item-icon`
      }, s.icon), l.createElement("div", {
        className: `${Qt}-item-text`
      }, s.text));
    })));
  }, [e.actions, r]);
  return l.createElement(sm, Object.assign({
    ref: n
  }, e, {
    className: B(Qt, e.className),
    content: i
  }), e.children);
}), lm = ie(sm, {
  Menu: Xx
});
function Qx(...e) {
  let t;
  for (t = 0; t < e.length && e[t] === void 0; t++)
    ;
  return e[t];
}
const Jx = "__SPLIT__", Be = "adm-form-item", e$ = l.memo(({
  children: e
}) => e, (e, t) => e.value === t.value && e.update === t.update), t$ = (e) => {
  var t;
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
  } = e, m = at(fc), {
    locale: y
  } = pe(), v = e.hasFeedback !== void 0 ? e.hasFeedback : m.hasFeedback, p = e.layout || m.layout, b = (t = e.disabled) !== null && t !== void 0 ? t : m.disabled, g = (() => {
    const {
      requiredMarkStyle: w
    } = m;
    switch (w) {
      case "asterisk":
        return o && l.createElement("span", {
          className: `${Be}-required-asterisk`
        }, "*");
      case "text-required":
        return o && l.createElement("span", {
          className: `${Be}-required-text`
        }, "(", y.Form.required, ")");
      case "text-optional":
        return !o && l.createElement("span", {
          className: `${Be}-required-text`
        }, "(", y.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), C = !!i && l.createElement("label", {
    className: `${Be}-label`,
    htmlFor: c
  }, i, g, a && l.createElement(lm, {
    content: a,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${Be}-label-help`,
    onClick: (w) => {
      w.preventDefault();
    }
  }, l.createElement(Dy, null)))), h = (!!e.description || v) && l.createElement(l.Fragment, null, e.description, v && l.createElement(l.Fragment, null, e.errors.map((w, E) => l.createElement("div", {
    key: `error-${E}`,
    className: `${Be}-feedback-error`
  }, w)), e.warnings.map((w, E) => l.createElement("div", {
    key: `warning-${E}`,
    className: `${Be}-feedback-warning`
  }, w))));
  return Z(e, l.createElement(kt.Item, {
    style: n,
    title: p === "vertical" && C,
    prefix: p === "horizontal" && C,
    extra: r,
    description: h,
    className: B(Be, `${Be}-${p}`, {
      [`${Be}-hidden`]: u,
      [`${Be}-has-error`]: e.errors.length
    }),
    disabled: b,
    onClick: e.onClick,
    clickable: e.clickable,
    arrow: f
  }, l.createElement("div", {
    className: B(`${Be}-child`, `${Be}-child-position-${d}`)
  }, l.createElement("div", {
    className: B(`${Be}-child-inner`)
  }, s))));
}, n$ = (e) => {
  const {
    // 样式相关
    style: t,
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
    disabled: y,
    rules: v,
    children: p,
    messageVariables: b,
    trigger: g = "onChange",
    validateTrigger: C = g,
    onClick: h,
    shouldUpdate: w,
    dependencies: E,
    clickable: x,
    arrow: $
  } = e, P = yr(e, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: S
  } = at(fc), {
    validateTrigger: k
  } = at(X0), D = Qx(C, k, g), I = j(null), T = j(0);
  T.current += 1;
  const [_, R] = K({}), N = He((W, H) => {
    R((q) => {
      const G = Object.assign({}, q), ae = H.join(Jx);
      return W.destroy ? delete G[ae] : G[ae] = W, G;
    });
  }, [R]);
  function O(W, H, q, G) {
    var ae, de;
    if (c && !u)
      return W;
    const Ee = (ae = q == null ? void 0 : q.errors) !== null && ae !== void 0 ? ae : [], le = Object.keys(_).reduce((be, hn) => {
      var wt, dt;
      const Mr = (dt = (wt = _[hn]) === null || wt === void 0 ? void 0 : wt.errors) !== null && dt !== void 0 ? dt : [];
      return Mr.length && (be = [...be, ...Mr]), be;
    }, Ee), ft = (de = q == null ? void 0 : q.warnings) !== null && de !== void 0 ? de : [], Ie = Object.keys(_).reduce((be, hn) => {
      var wt, dt;
      const Mr = (dt = (wt = _[hn]) === null || wt === void 0 ? void 0 : wt.warnings) !== null && dt !== void 0 ? dt : [];
      return Mr.length && (be = [...be, ...Mr]), be;
    }, ft);
    return Z(e, l.createElement(t$, {
      style: t,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: G,
      disabled: y,
      hasFeedback: a,
      htmlFor: H,
      errors: le,
      warnings: Ie,
      onClick: h && ((be) => h(be, I)),
      hidden: u,
      layout: f,
      childElementPosition: d,
      clickable: x,
      arrow: $
    }, l.createElement(Ff.Provider, {
      value: N
    }, W)));
  }
  const M = typeof p == "function";
  if (!o && !M && !e.dependencies)
    return O(p);
  let A = {};
  A.label = typeof n == "string" ? n : "", b && (A = Object.assign(Object.assign({}, A), b));
  const F = at(Ff), L = (W) => {
    if (c && F) {
      const H = W.name;
      F(W, H);
    }
  };
  return l.createElement(lc, Object.assign({}, P, {
    name: o,
    shouldUpdate: w,
    dependencies: E,
    rules: v,
    trigger: g,
    validateTrigger: D,
    onMetaChange: L,
    messageVariables: A
  }), (W, H, q) => {
    let G = null;
    const ae = s !== void 0 ? s : v && v.some((le) => !!(le && typeof le == "object" && le.required)), de = ns(o).length && H ? H.name : [], Ee = (de.length > 0 && S ? [S, ...de] : de).join("_");
    if (M)
      (w || E) && !o && (G = p(q));
    else if (!(E && !o))
      if (l.isValidElement(p)) {
        p.props.defaultValue;
        const le = Object.assign(Object.assign({}, p.props), W);
        Q0(p) && (le.ref = (Ie) => {
          const be = p.ref;
          be && (typeof be == "function" && be(Ie), "current" in be && (be.current = Ie)), I.current = Ie;
        }), le.id || (le.id = Ee), (/* @__PURE__ */ new Set([...ns(g), ...ns(D)])).forEach((Ie) => {
          le[Ie] = (...be) => {
            var hn, wt, dt;
            (hn = W[Ie]) === null || hn === void 0 || hn.call(W, ...be), (dt = (wt = p.props)[Ie]) === null || dt === void 0 || dt.call(wt, ...be);
          };
        }), G = l.createElement(e$, {
          value: W[e.valuePropName || "value"],
          update: T.current
        }, l.cloneElement(p, le));
      } else
        G = p;
    return O(G, Ee, H, ae);
  });
}, r$ = (e) => {
  const t = Ed(), n = at(Ln), r = n.getFieldsValue(e.to), i = l.useMemo(() => e.children(r, n), [JSON.stringify(r), e.children]);
  return l.createElement(l.Fragment, null, i, e.to.map((a) => l.createElement(i$, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: t
  })));
}, i$ = Ve((e) => {
  const t = uc(e.namePath, e.form);
  return Ti(() => {
    e.onChange();
  }, [t]), null;
}), Wk = ie(JC, {
  Item: n$,
  Subscribe: r$,
  Header: L0,
  Array: W0,
  useForm: cc,
  useWatch: uc
}), cm = "adm-grid", a$ = (e) => {
  const t = {
    "--columns": e.columns.toString()
  }, {
    gap: n
  } = e;
  return n !== void 0 && (Array.isArray(n) ? (t["--gap-horizontal"] = Sn(n[0]), t["--gap-vertical"] = Sn(n[1])) : t["--gap"] = Sn(n)), Z(e, l.createElement("div", {
    className: cm,
    style: t
  }, e.children));
}, o$ = (e) => {
  const t = U({
    span: 1
  }, e), n = {
    "--item-span": t.span
  };
  return Z(t, l.createElement("div", {
    className: `${cm}-item`,
    style: n,
    onClick: t.onClick
  }, t.children));
}, um = ie(a$, {
  Item: o$
}), s$ = B8([A1, O8]), ra = () => [1, 0, 0, 1, 0, 0], Zf = (e) => e[4], Hf = (e) => e[5], Ur = (e) => e[0], qr = (e, t, n) => fm([1, 0, 0, 1, t, n], e), l$ = (e, t, n = t) => fm([t, 0, 0, n, 0, 0], e), c$ = (e, [t, n]) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], fm = (e, t) => [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]], rs = "adm-image-viewer", dm = (e) => {
  const {
    dragLockRef: t,
    maxZoom: n
  } = e, r = j([]), i = j(null), a = j(null), [{
    matrix: o
  }, s] = Pe(() => ({
    matrix: ra(),
    config: {
      tension: 200
    }
  })), c = bs(i), u = bs(a), f = j(!1), d = (v) => {
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
    const p = -c.width / 2, b = -c.height / 2, g = -u.width / 2, C = -u.height / 2, h = Ur(v), w = h * u.width, E = h * u.height, x = p - (w - c.width), $ = p, P = b - (E - c.height), S = b, [k, D] = c$(v, [g, C]);
    return {
      x: {
        position: k,
        minX: x,
        maxX: $
      },
      y: {
        position: D,
        minY: P,
        maxY: S
      }
    };
  }, m = (v, p, b, g = 0) => [v <= p - g, v >= b + g], y = (v, p, b = !1) => {
    if (!c || !u)
      return v;
    const g = Ur(v), C = g * u.width, h = g * u.height, {
      x: {
        position: w,
        minX: E,
        maxX: x
      },
      y: {
        position: $,
        minY: P,
        maxY: S
      }
    } = d(v);
    if (p === "translate") {
      let k = w, D = $;
      return C > c.width ? k = b ? $e(w, E, x) : gi(w, E, x, g * 50) : k = -C / 2, h > c.height ? D = b ? $e($, P, S) : gi($, P, S, g * 50) : D = -h / 2, qr(v, k - w, D - $);
    }
    if (p === "scale" && b) {
      const [k, D] = [C > c.width ? $e(w, E, x) : -C / 2, h > c.height ? $e($, P, S) : -h / 2];
      return qr(v, k - w, D - $);
    }
    return v;
  };
  return s$({
    onDrag: (v) => {
      var p;
      if (v.first) {
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
      if (v.pinching)
        return v.cancel();
      if (v.tap && v.elapsedTime > 0 && v.elapsedTime < 1e3) {
        (p = e.onTap) === null || p === void 0 || p.call(e);
        return;
      }
      const b = Ur(o.get());
      if (t && (t.current = b !== 1), !f.current && b <= 1)
        s.start({
          matrix: ra()
        });
      else {
        const g = o.get(), C = [v.offset[0] - Zf(g), v.offset[1] - Hf(g)], h = qr(g, ...v.last ? [C[0] + v.velocity[0] * v.direction[0] * 200, C[1] + v.velocity[1] * v.direction[1] * 200] : C);
        s.start({
          matrix: y(h, "translate", v.last),
          immediate: !v.last
        });
        const {
          x: {
            position: w,
            minX: E,
            maxX: x
          }
        } = d(h);
        v.last && r.current.some(($) => $) && m(w, E, x).some(($) => $) && (t && (t.current = !1), s.start({
          matrix: ra()
        }));
      }
    },
    onPinch: (v) => {
      var p;
      f.current = !v.last;
      const [b] = v.offset;
      if (b < 0)
        return;
      let g;
      n === "auto" ? g = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : g = n;
      const C = v.last ? $e(b, 1, g) : b;
      if ((p = e.onZoomChange) === null || p === void 0 || p.call(e, C), v.last && C <= 1)
        s.start({
          matrix: ra()
        }), t && (t.current = !1);
      else {
        if (!c)
          return;
        const h = o.get(), w = Ur(h), E = v.origin[0] - c.width / 2, x = v.origin[1] - c.height / 2;
        let $ = qr(h, -E, -x);
        $ = l$($, C / w), $ = qr($, E, x), s.start({
          matrix: y($, "scale", v.last),
          immediate: !v.last
        }), t && (t.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [Zf(o.get()), Hf(o.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Ur(o.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), l.createElement("div", {
    className: `${rs}-slide`
  }, l.createElement("div", {
    className: `${rs}-control`,
    ref: i
  }, l.createElement(ve.div, {
    className: `${rs}-image-wrapper`,
    style: {
      matrix: o
    }
  }, l.createElement("img", {
    ref: a,
    src: e.image,
    draggable: !1,
    alt: e.image
  }))));
}, is = "adm-image-viewer", u$ = fe((e, t) => {
  const n = window.innerWidth + Tn(16), [{
    x: r
  }, i] = Pe(() => ({
    x: e.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = e.images.length;
  function o(u, f = !1) {
    var d;
    const m = $e(u, 0, a - 1);
    (d = e.onIndexChange) === null || d === void 0 || d.call(e, m), i.start({
      x: m * n,
      immediate: f
    });
  }
  ye(t, () => ({
    swipeTo: o
  }));
  const s = j(!1), c = Pt((u) => {
    if (s.current)
      return;
    const [f] = u.offset;
    if (u.last) {
      const d = Math.floor(f / n), m = d + 1, y = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o($e(Math.round((f + y) / n), d, m));
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
    className: `${is}-slides`
  }, c()), l.createElement(ve.div, {
    className: `${is}-indicator`
  }, r.to((u) => `${$e(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(ve.div, {
    className: `${is}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, e.images.map((u, f) => l.createElement(dm, {
    key: f,
    image: u,
    onTap: e.onTap,
    maxZoom: e.maxZoom,
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
}), Va = "adm-image-viewer", mm = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, hm = (e) => {
  var t, n, r;
  const i = U(mm, e), a = l.createElement(Fi, {
    visible: i.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: i.afterClose,
    destroyOnClose: !0,
    className: (t = i == null ? void 0 : i.classNames) === null || t === void 0 ? void 0 : t.mask
  }, l.createElement("div", {
    className: B(`${Va}-content`, (n = i == null ? void 0 : i.classNames) === null || n === void 0 ? void 0 : n.body)
  }, i.image && l.createElement(dm, {
    image: i.image,
    onTap: i.onClose,
    maxZoom: i.maxZoom
  })), i.image && l.createElement("div", {
    className: `${Va}-footer`
  }, (r = i.renderFooter) === null || r === void 0 ? void 0 : r.call(i, i.image), l.createElement(Ar, {
    position: "bottom"
  })));
  return Sr(i.getContainer, a);
}, f$ = Object.assign(Object.assign({}, mm), {
  defaultIndex: 0
}), vm = fe((e, t) => {
  var n, r, i;
  const a = U(f$, e), [o, s] = K(a.defaultIndex), c = j(null);
  ye(t, () => ({
    swipeTo: (d, m) => {
      var y;
      s(d), (y = c.current) === null || y === void 0 || y.swipeTo(d, m);
    }
  }));
  const u = He((d) => {
    var m;
    d !== o && (s(d), (m = a.onIndexChange) === null || m === void 0 || m.call(a, d));
  }, [a.onIndexChange, o]), f = l.createElement(Fi, {
    visible: a.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: a.afterClose,
    destroyOnClose: !0,
    className: (n = a == null ? void 0 : a.classNames) === null || n === void 0 ? void 0 : n.mask
  }, l.createElement("div", {
    className: B(`${Va}-content`, (r = a == null ? void 0 : a.classNames) === null || r === void 0 ? void 0 : r.body)
  }, a.images && l.createElement(u$, {
    ref: c,
    defaultIndex: o,
    onIndexChange: u,
    images: a.images,
    onTap: a.onClose,
    maxZoom: a.maxZoom
  })), a.images && l.createElement("div", {
    className: `${Va}-footer`
  }, (i = a.renderFooter) === null || i === void 0 ? void 0 : i.call(a, a.images[o], o), l.createElement(Ar, {
    position: "bottom"
  })));
  return Sr(a.getContainer, f);
}), vr = /* @__PURE__ */ new Set();
function d$(e) {
  bc();
  const t = Tr(l.createElement(hm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      vr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return vr.add(t), t;
}
function m$(e) {
  bc();
  const t = Tr(l.createElement(vm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      vr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return vr.add(t), t;
}
function bc() {
  vr.forEach((e) => {
    e.close();
  }), vr.clear();
}
const h$ = ie(vm, {
  show: m$
}), v$ = ie(hm, {
  Multi: h$,
  show: d$,
  clear: bc
}), gn = "adm-image-uploader", p$ = (e) => {
  const {
    locale: t
  } = pe(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: s
  } = e, c = ee(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  Y(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return e.status === "pending" && l.createElement("div", {
      className: `${gn}-cell-mask`
    }, l.createElement("span", {
      className: `${gn}-cell-loading`
    }, l.createElement(Kl, {
      color: "white"
    }), l.createElement("span", {
      className: `${gn}-cell-mask-message`
    }, t.ImageUploader.uploading)));
  }
  function f() {
    return i && l.createElement("span", {
      className: `${gn}-cell-delete`,
      onClick: o
    }, a);
  }
  return l.createElement("div", {
    className: B(`${gn}-cell`, e.status === "fail" && `${gn}-cell-fail`)
  }, l.createElement(lo, {
    className: `${gn}-cell-image`,
    src: c,
    fit: s,
    onClick: e.onClick
  }), u(), f());
}, zf = p$, yn = "adm-space", g$ = {
  direction: "horizontal"
}, wc = (e) => {
  const t = U(g$, e), {
    direction: n,
    onClick: r
  } = t;
  return Z(t, l.createElement("div", {
    className: B(yn, {
      [`${yn}-wrap`]: t.wrap,
      [`${yn}-block`]: t.block,
      [`${yn}-${n}`]: !0,
      [`${yn}-align-${t.align}`]: !!t.align,
      [`${yn}-justify-${t.justify}`]: !!t.justify
    }),
    onClick: r
  }, l.Children.map(t.children, (i) => i != null && l.createElement("div", {
    className: `${yn}-item`
  }, i))));
}, $t = "adm-image-uploader", y$ = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: l.createElement(Ni, {
    className: `${$t}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, Zk = fe((e, t) => {
  const {
    locale: n
  } = pe(), r = U(y$, e), {
    columns: i
  } = r, [a, o] = te(r), [s, c] = K([]), u = j(null), f = bs(u), d = j(null), [m, y] = K(80), v = j(null);
  Se(() => {
    const T = d.current;
    if (i && f && T) {
      const _ = f.width, R = z1(window.getComputedStyle(T).getPropertyValue("height"));
      y((_ - R * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const p = {
    "--cell-size": m + "px"
  };
  Se(() => {
    c((T) => T.filter((_) => _.url === void 0 ? !0 : !a.some((R) => R.url === _.url)));
  }, [a]), Se(() => {
    var T;
    (T = r.onUploadQueueChange) === null || T === void 0 || T.call(r, s.map((_) => ({
      id: _.id,
      status: _.status
    })));
  }, [s]);
  const b = j(0), {
    maxCount: g,
    onPreview: C,
    renderItem: h
  } = r;
  function w(T, _) {
    return ke(this, void 0, void 0, function* () {
      const {
        beforeUpload: R
      } = r;
      let N = T;
      return N = yield R == null ? void 0 : R(T, _), N;
    });
  }
  function E(T) {
    return r.showFailed ? T : T.filter((_) => _.status !== "fail");
  }
  function x(T) {
    var _;
    return ke(this, void 0, void 0, function* () {
      T.persist();
      const {
        files: R
      } = T.target;
      if (!R)
        return;
      let N = [].slice.call(R);
      if (T.target.value = "", r.beforeUpload) {
        const A = N.map((F) => w(F, N));
        yield Promise.all(A).then((F) => {
          N = F.filter(Boolean);
        });
      }
      if (N.length === 0)
        return;
      if (g > 0) {
        const A = a.length + N.length - g;
        A > 0 && (N = N.slice(0, N.length - A), (_ = r.onCountExceed) === null || _ === void 0 || _.call(r, A));
      }
      const O = N.map((A) => ({
        id: b.current++,
        status: "pending",
        file: A
      }));
      c((A) => [...E(A), ...O]);
      const M = [];
      yield Promise.all(O.map((A, F) => ke(this, void 0, void 0, function* () {
        try {
          const L = yield r.upload(A.file);
          M[F] = L, c((W) => W.map((H) => H.id === A.id ? Object.assign(Object.assign({}, H), {
            status: "success",
            url: L.url
          }) : H));
        } catch (L) {
          throw c((W) => W.map((H) => H.id === A.id ? Object.assign(Object.assign({}, H), {
            status: "fail"
          }) : H)), L;
        }
      }))).catch((A) => console.error(A)), o((A) => A.concat(M));
    });
  }
  const $ = j(null);
  function P(T) {
    $.current = v$.Multi.show({
      images: a.map((_) => _.url),
      defaultIndex: T,
      onClose: () => {
        $.current = null;
      }
    });
  }
  ki(() => {
    var T;
    (T = $.current) === null || T === void 0 || T.close();
  });
  const S = E(s), k = r.showUpload && (g === 0 || a.length + S.length < g), D = () => a.map((T, _) => {
    var R, N;
    const O = l.createElement(zf, {
      key: (R = T.key) !== null && R !== void 0 ? R : _,
      url: (N = T.thumbnailUrl) !== null && N !== void 0 ? N : T.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && P(_), C && C(_, T);
      },
      onDelete: () => ke(void 0, void 0, void 0, function* () {
        var M;
        (yield (M = r.onDelete) === null || M === void 0 ? void 0 : M.call(r, T)) !== !1 && o(a.filter((F, L) => L !== _));
      })
    });
    return h ? h(O, T, a) : O;
  }), I = l.createElement(l.Fragment, null, D(), s.map((T) => !r.showFailed && T.status === "fail" ? null : l.createElement(zf, {
    key: T.id,
    file: T.file,
    deletable: T.status !== "pending",
    deleteIcon: r.deleteIcon,
    status: T.status,
    imageFit: r.imageFit,
    onDelete: () => {
      c(s.filter((_) => _.id !== T.id));
    }
  })), l.createElement("div", {
    className: `${$t}-upload-button-wrap`,
    style: k ? void 0 : {
      display: "none"
    }
  }, r.children || l.createElement("span", {
    className: `${$t}-cell ${$t}-upload-button`,
    role: "button",
    "aria-label": n.ImageUploader.upload
  }, l.createElement("span", {
    className: `${$t}-upload-button-icon`
  }, l.createElement(v1, null))), !r.disableUpload && l.createElement("input", {
    ref: v,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${$t}-input`,
    onChange: x,
    "aria-hidden": !0
  })));
  return ye(t, () => ({
    get nativeElement() {
      return v.current;
    }
  })), Z(r, l.createElement("div", {
    className: $t,
    ref: u
  }, i ? l.createElement(um, {
    className: `${$t}-grid`,
    columns: i,
    style: p
  }, l.createElement("div", {
    className: `${$t}-gap-measure`,
    ref: d
  }), I.props.children) : l.createElement(wc, {
    className: `${$t}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
}), pm = () => null, Xn = "adm-index-bar", b$ = (e) => {
  const [t, n] = K(!1);
  return l.createElement("div", {
    className: B(`${Xn}-sidebar`, {
      [`${Xn}-sidebar-interacting`]: t
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
      if (!t)
        return;
      const {
        clientX: i,
        clientY: a
      } = r.touches[0], o = document.elementFromPoint(i, a);
      if (!o)
        return;
      const s = o.dataset.index;
      s && e.onActive(s);
    }
  }, e.indexItems.map(({
    index: r,
    brief: i
  }) => {
    const a = r === e.activeIndex;
    return l.createElement("div", {
      className: `${Xn}-sidebar-row`,
      onMouseDown: () => {
        e.onActive(r);
      },
      onTouchStart: () => {
        e.onActive(r);
      },
      onMouseEnter: () => {
        t && e.onActive(r);
      },
      "data-index": r,
      key: r
    }, t && a && l.createElement("div", {
      className: `${Xn}-sidebar-bubble`
    }, i), l.createElement("div", {
      className: B(`${Xn}-sidebar-item`, {
        [`${Xn}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, l.createElement("div", null, i)));
  }));
}, Qn = "adm-index-bar", w$ = {
  sticky: !0
}, E$ = fe((e, t) => {
  const n = U(w$, e), r = Tn(35), i = j(null), a = [], o = [];
  mn(n.children, (d) => {
    var m;
    l.isValidElement(d) && d.type === pm && (a.push({
      index: d.props.index,
      brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
    }), o.push(Z(d.props, l.createElement("div", {
      key: d.props.index,
      "data-index": d.props.index,
      className: `${Qn}-anchor`
    }, l.createElement("div", {
      className: `${Qn}-anchor-title`
    }, d.props.title || d.props.index), d.props.children))));
  });
  const [s, c] = K(() => {
    const d = a[0];
    return d ? d.index : null;
  });
  ye(t, () => ({
    scrollTo: u
  }));
  function u(d) {
    var m;
    const y = i.current;
    if (!y)
      return;
    const v = y.children;
    for (let p = 0; p < v.length; p++) {
      const b = v.item(p);
      if (!b)
        continue;
      if (b.dataset.index === d) {
        y.scrollTop = b.offsetTop, c(d), s !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
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
    const y = m.scrollTop, v = m.getElementsByClassName(`${Qn}-anchor`);
    for (let p = 0; p < v.length; p++) {
      const b = v.item(p);
      if (!b)
        continue;
      const g = b.dataset.index;
      if (g && b.offsetTop + b.clientHeight - r > y) {
        c(g), s !== g && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, g));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return Z(n, l.createElement("div", {
    className: B(`${Qn}`, {
      [`${Qn}-sticky`]: n.sticky
    })
  }, l.createElement(b$, {
    indexItems: a,
    activeIndex: s,
    onActive: (d) => {
      u(d);
    }
  }), l.createElement("div", {
    className: `${Qn}-body`,
    ref: i,
    onScroll: f
  }, o)));
}), Hk = ie(E$, {
  Panel: pm
});
function C$(e) {
  return e === window;
}
const gm = "adm-infinite-scroll", x$ = {
  threshold: 250,
  children: (e, t, n) => l.createElement($$, {
    hasMore: e,
    failed: t,
    retry: n
  })
}, zk = (e) => {
  const t = U(x$, e), [n, r] = K(!1), i = m6((y) => ke(void 0, void 0, void 0, function* () {
    try {
      yield t.loadMore(y);
    } catch (v) {
      throw r(!0), v;
    }
  })), a = j(null), [o, s] = K({}), c = j(o), [u, f] = K(), {
    run: d
  } = Ka(() => ke(void 0, void 0, void 0, function* () {
    if (c.current !== o || !t.hasMore)
      return;
    const y = a.current;
    if (!y || !y.offsetParent)
      return;
    const v = Ea(y);
    if (f(v), !v)
      return;
    const b = y.getBoundingClientRect().top;
    if ((C$(v) ? window.innerHeight : v.getBoundingClientRect().bottom) >= b - t.threshold) {
      const C = {};
      c.current = C, yield i(!1), s(C);
    }
  }), {
    wait: 100,
    leading: !0,
    trailing: !0
  });
  Y(() => {
    d();
  }), Y(() => {
    if (!a.current || !u)
      return;
    function v() {
      d();
    }
    return u.addEventListener("scroll", v), () => {
      u.removeEventListener("scroll", v);
    };
  }, [u]);
  function m() {
    return ke(this, void 0, void 0, function* () {
      r(!1), yield i(!0), s(c.current);
    });
  }
  return Z(t, l.createElement("div", {
    className: gm,
    ref: a
  }, typeof t.children == "function" ? t.children(t.hasMore, n, m) : t.children));
}, $$ = (e) => {
  const {
    locale: t
  } = pe();
  return e.hasMore ? e.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${gm}-failed-text`
  }, t.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      e.retry();
    }
  }, t.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, t.common.loading), l.createElement(L1, null)) : l.createElement("span", null, t.InfiniteScroll.noMore);
}, ia = "adm-input", _$ = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, ym = fe((e, t) => {
  const n = U(_$, e), [r, i] = te(n), [a, o] = K(!1), s = j(!1), c = j(null), {
    locale: u
  } = pe();
  ye(t, () => ({
    clear: () => {
      i("");
    },
    focus: () => {
      var y;
      (y = c.current) === null || y === void 0 || y.focus();
    },
    blur: () => {
      var y;
      (y = c.current) === null || y === void 0 || y.blur();
    },
    get nativeElement() {
      return c.current;
    }
  }));
  const f = (y) => {
    var v;
    n.onEnterPress && (y.code === "Enter" || y.keyCode === 13) && n.onEnterPress(y), (v = n.onKeyDown) === null || v === void 0 || v.call(n, y);
  };
  Se(() => {
    var y;
    if (n.enterKeyHint)
      return (y = c.current) === null || y === void 0 || y.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var v;
        (v = c.current) === null || v === void 0 || v.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function d() {
    let y = r;
    if (n.type === "number") {
      const v = y && $e(parseFloat(y), n.min, n.max).toString();
      Number(y) !== Number(v) && (y = v);
    }
    y !== r && i(y);
  }
  const m = !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0;
  return Z(n, l.createElement("div", {
    className: B(`${ia}`, n.disabled && `${ia}-disabled`)
  }, l.createElement("input", {
    ref: c,
    className: `${ia}-element`,
    value: r,
    onChange: (y) => {
      i(y.target.value);
    },
    onFocus: (y) => {
      var v;
      o(!0), (v = n.onFocus) === null || v === void 0 || v.call(n, y);
    },
    onBlur: (y) => {
      var v;
      o(!1), d(), (v = n.onBlur) === null || v === void 0 || v.call(n, y);
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
    onCompositionStart: (y) => {
      var v;
      s.current = !0, (v = n.onCompositionStart) === null || v === void 0 || v.call(n, y);
    },
    onCompositionEnd: (y) => {
      var v;
      s.current = !1, (v = n.onCompositionEnd) === null || v === void 0 || v.call(n, y);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && l.createElement("div", {
    className: `${ia}-clear`,
    onMouseDown: (y) => {
      y.preventDefault();
    },
    onClick: () => {
      var y, v;
      i(""), (y = n.onClear) === null || y === void 0 || y.call(n), v9() && s.current && (s.current = !1, (v = c.current) === null || v === void 0 || v.blur());
    },
    "aria-label": u.Input.clear
  }, l.createElement(ao, null))));
}), Ct = "adm-jumbo-tabs", k$ = () => null, O$ = (e) => {
  var t;
  const n = j(null), r = j(null), i = {};
  let a = null;
  const o = [];
  mn(e.children, (d, m) => {
    if (!Vn(d))
      return;
    const y = d.key;
    if (typeof y != "string")
      return;
    m === 0 && (a = y);
    const v = o.push(d);
    i[y] = v - 1;
  });
  const [s, c] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : a,
    onChange: (d) => {
      var m;
      d !== null && ((m = e.onChange) === null || m === void 0 || m.call(e, d));
    }
  }), {
    scrollLeft: u,
    animate: f
  } = B1(n, i[s]);
  return Ri(() => {
    f(!0);
  }, r), Z(e, l.createElement("div", {
    className: Ct,
    ref: r
  }, l.createElement("div", {
    className: `${Ct}-header`
  }, l.createElement(W1, {
    scrollTrackRef: n
  }), l.createElement(ve.div, {
    className: `${Ct}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((d) => Z(d.props, l.createElement("div", {
    key: d.key,
    className: `${Ct}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = d;
      d.props.disabled || m != null && c(m.toString());
    },
    className: B(`${Ct}-tab`, {
      [`${Ct}-tab-active`]: d.key === s,
      [`${Ct}-tab-disabled`]: d.props.disabled
    })
  }, l.createElement("div", {
    className: `${Ct}-tab-title`
  }, d.props.title), l.createElement("div", {
    className: `${Ct}-tab-description`
  }, d.props.description))))))), o.map((d) => {
    if (d.props.children === void 0)
      return null;
    const m = d.key === s;
    return l.createElement(Fr, {
      key: d.key,
      active: m,
      forceRender: d.props.forceRender,
      destroyOnClose: d.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Ct}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, d.props.children));
  })));
}, Uk = ie(O$, {
  Tab: k$
}), S$ = (e) => {
  const {
    action: t
  } = e;
  return Z(e.action, l.createElement(Wt, {
    key: t.key,
    onClick: e.onAction,
    className: B("adm-modal-button", {
      "adm-modal-button-primary": e.action.primary
    }),
    fill: e.action.primary ? "solid" : "none",
    size: e.action.primary ? "large" : "middle",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, F$ = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, bm = (e) => {
  const t = U(F$, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Rt("image-container")
  }, l.createElement(lo, {
    src: t.image,
    alt: "modal header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Rt("header")
  }, l.createElement(pi, null, t.header)), !!t.title && l.createElement("div", {
    className: Rt("title")
  }, t.title), l.createElement("div", {
    className: Rt("content")
  }, typeof t.content == "string" ? l.createElement(pi, null, t.content) : t.content), l.createElement(wc, {
    direction: "vertical",
    block: !0,
    className: B(Rt("footer"), t.actions.length === 0 && Rt("footer-empty"))
  }, t.actions.map((r, i) => l.createElement(S$, {
    key: r.key,
    action: r,
    onAction: () => ke(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = t.onAction) === null || o === void 0 ? void 0 : o.call(t, r, i)]), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    })
  }))));
  return l.createElement(o0, {
    className: B(Rt(), t.className),
    style: t.style,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    showCloseButton: t.showCloseButton,
    closeOnMaskClick: t.closeOnMaskClick,
    onClose: t.onClose,
    visible: t.visible,
    getContainer: t.getContainer,
    bodyStyle: t.bodyStyle,
    bodyClassName: B(Rt("body"), t.image && Rt("with-image"), t.bodyClassName),
    maskStyle: t.maskStyle,
    maskClassName: t.maskClassName,
    stopPropagation: t.stopPropagation,
    disableBodyScroll: t.disableBodyScroll,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, n);
};
function Rt(e = "") {
  return "adm-modal" + (e && "-") + e;
}
const il = /* @__PURE__ */ new Set();
function Ec(e) {
  const t = Tr(l.createElement(bm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      il.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return il.add(t.close), t;
}
function N$(e) {
  const t = {
    confirmText: xi().locale.Modal.ok
  }, n = U(t, e);
  return new Promise((r) => {
    Ec(Object.assign(Object.assign({}, n), {
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
const P$ = {
  confirmText: "确认",
  cancelText: "取消"
};
function A$(e) {
  const {
    locale: t
  } = xi(), n = U(P$, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    Ec(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => ke(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => ke(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function T$() {
  il.forEach((e) => {
    e();
  });
}
const qk = ie(bm, {
  show: Ec,
  alert: N$,
  confirm: A$,
  clear: T$
}), Jn = "adm-nav-bar", R$ = {
  backArrow: !0
}, Kk = (e) => {
  const t = U(R$, e), {
    back: n,
    backArrow: r
  } = t;
  return Z(t, l.createElement("div", {
    className: B(Jn)
  }, l.createElement("div", {
    className: `${Jn}-left`,
    role: "button"
  }, n !== null && l.createElement("div", {
    className: `${Jn}-back`,
    onClick: t.onBack
  }, r && l.createElement("span", {
    className: `${Jn}-back-arrow`
  }, r === !0 ? l.createElement(Iy, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), t.left), l.createElement("div", {
    className: `${Jn}-title`
  }, t.children), l.createElement("div", {
    className: `${Jn}-right`
  }, t.right)));
}, Mt = "adm-notice-bar", M$ = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement(By, null)
}, Gk = Ve((e) => {
  const t = U(M$, e), n = j(null), r = j(null), [i, a] = K(!0), o = t.speed, s = j(!0), c = j(!1);
  function u() {
    if (s.current || t.wrap)
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
    const y = m ? d.offsetWidth : f.offsetWidth + d.offsetWidth;
    c.current = !0, d.style.transitionDuration = `${Math.round(y / o)}s`, d.style.transform = `translateX(-${d.offsetWidth}px)`;
  }
  return X6(() => {
    s.current = !1, u();
  }, t.delay), Ri(() => {
    u();
  }, n), Hl(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? Z(t, l.createElement("div", {
    className: B(Mt, `${Mt}-${t.color}`, {
      [`${Mt}-wrap`]: t.wrap
    }),
    onClick: t.onClick
  }, t.icon && l.createElement("span", {
    className: `${Mt}-left`
  }, t.icon), l.createElement("span", {
    ref: n,
    className: `${Mt}-content`
  }, l.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Mt}-content-inner`
  }, t.content)), (t.closeable || t.extra) && l.createElement("span", {
    className: `${Mt}-right`
  }, t.extra, t.closeable && l.createElement("div", {
    className: `${Mt}-close`,
    onClick: () => {
      var f;
      a(!1), (f = t.onClose) === null || f === void 0 || f.call(t);
    }
  }, l.createElement(Ni, {
    className: `${Mt}-close-icon`
  }))))) : null;
});
function I$(e) {
  const t = [...e];
  for (let n = t.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [t[n - 1], t[r]] = [t[r], t[n - 1]];
  }
  return t;
}
const Ce = "adm-number-keyboard", L$ = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Yk = (e) => {
  const t = U(L$, e), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = t, {
    locale: f
  } = pe(), d = j(null), m = ee(() => {
    const E = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], x = s ? I$(E) : E, $ = Array.isArray(o) ? o : [o];
    return x.push("0"), a ? ($.length === 2 && x.splice(9, 0, $.pop()), x.push($[0] || "")) : (x.splice(9, 0, $[0] || ""), x.push($[1] || "BACKSPACE")), x;
  }, [o, a, s, s && n]), y = j(-1), v = j(-1), p = zt(() => {
    var E;
    (E = t.onDelete) === null || E === void 0 || E.call(t);
  }), b = () => {
    y.current = window.setTimeout(() => {
      p(), v.current = window.setInterval(p, 150);
    }, 700);
  }, g = () => {
    clearTimeout(y.current), clearInterval(v.current);
  }, C = (E, x) => {
    var $, P;
    switch (E.preventDefault(), x) {
      case "BACKSPACE":
        p == null || p();
        break;
      case "OK":
        ($ = t.onConfirm) === null || $ === void 0 || $.call(t), t.closeOnConfirm && ((P = t.onClose) === null || P === void 0 || P.call(t));
        break;
      default:
        x !== "" && (u == null || u(x));
        break;
    }
  }, h = () => !c && !r ? null : l.createElement("div", {
    className: B(`${Ce}-header`, {
      [`${Ce}-header-with-title`]: !!r
    })
  }, !!r && l.createElement("div", {
    className: `${Ce}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${Ce}-header-close-button`,
    onClick: () => {
      var E;
      (E = t.onClose) === null || E === void 0 || E.call(t);
    },
    role: "button",
    title: f.common.close,
    tabIndex: -1
  }, l.createElement(b1, null))), w = (E, x) => {
    const $ = /^\d$/.test(E), P = B(`${Ce}-key`, {
      [`${Ce}-key-number`]: $,
      [`${Ce}-key-sign`]: !$ && E,
      [`${Ce}-key-mid`]: x === 9 && !!a && m.length < 12
    }), S = E ? {
      role: "button",
      title: E,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: E,
      className: P,
      onTouchStart: () => {
        E === "BACKSPACE" && b();
      },
      onTouchEnd: (k) => {
        C(k, E), E === "BACKSPACE" && g();
      }
    }, S), E === "BACKSPACE" ? l.createElement(Mu, null) : E);
  };
  return l.createElement(Pr, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    className: `${Ce}-popup`,
    stopPropagation: t.stopPropagation,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, Z(t, l.createElement("div", {
    ref: d,
    className: Ce,
    onMouseDown: (E) => {
      E.preventDefault();
    }
  }, h(), l.createElement("div", {
    className: `${Ce}-wrapper`
  }, l.createElement("div", {
    className: B(`${Ce}-main`, {
      [`${Ce}-main-confirmed-style`]: !!a
    })
  }, m.map(w)), !!a && l.createElement("div", {
    className: `${Ce}-confirm`
  }, l.createElement("div", {
    className: `${Ce}-key ${Ce}-key-extra ${Ce}-key-bs`,
    onTouchStart: () => {
      b();
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
  }, l.createElement(Mu, null)), l.createElement("div", {
    className: `${Ce}-key ${Ce}-key-extra ${Ce}-key-ok`,
    onTouchEnd: (E) => C(E, "OK"),
    role: "button",
    tabIndex: -1,
    "aria-label": a
  }, a))), t.safeArea && l.createElement("div", {
    className: `${Ce}-footer`
  }, l.createElement(Ar, {
    position: "bottom"
  })))));
}, Kr = "adm-page-indicator", D$ = {
  color: "primary",
  direction: "horizontal"
}, V$ = Ve((e) => {
  const t = U(D$, e), n = [];
  for (let r = 0; r < t.total; r++)
    n.push(l.createElement("div", {
      key: r,
      className: B(`${Kr}-dot`, {
        [`${Kr}-dot-active`]: t.current === r
      })
    }));
  return Z(t, l.createElement("div", {
    className: B(Kr, `${Kr}-${t.direction}`, `${Kr}-color-${t.color}`)
  }, n));
}), xt = "adm-passcode-input", Uf = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, Xk = fe((e, t) => {
  const n = U(Uf, e), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Uf.length, {
    locale: i
  } = pe(), [a, o] = K(!1), [s, c] = te(n), u = j(null), f = j(null);
  Y(() => {
    var p;
    s.length >= r && ((p = n.onFill) === null || p === void 0 || p.call(n, s));
  }, [s, r]);
  const d = () => {
    var p, b;
    n.keyboard || (p = f.current) === null || p === void 0 || p.focus(), o(!0), (b = n.onFocus) === null || b === void 0 || b.call(n);
  };
  Y(() => {
    if (!a)
      return;
    const p = window.setTimeout(() => {
      var b;
      (b = u.current) === null || b === void 0 || b.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(p);
    };
  }, [a]);
  const m = () => {
    var p;
    o(!1), (p = n.onBlur) === null || p === void 0 || p.call(n);
  };
  ye(t, () => ({
    focus: () => {
      var p;
      return (p = u.current) === null || p === void 0 ? void 0 : p.focus();
    },
    blur: () => {
      var p, b;
      (p = u.current) === null || p === void 0 || p.blur(), (b = f.current) === null || b === void 0 || b.blur();
    }
  }));
  const y = () => {
    const p = [], b = s.split(""), g = b.length, C = $e(b.length, 0, r - 1);
    for (let h = 0; h < r; h++)
      p.push(l.createElement("div", {
        className: B(`${xt}-cell`, {
          [`${xt}-cell-caret`]: n.caret && g === h && a,
          [`${xt}-cell-focused`]: C === h && a,
          [`${xt}-cell-dot`]: !n.plain && b[h]
        }),
        key: h
      }, b[h] && n.plain ? b[h] : ""));
    return p;
  }, v = B(xt, {
    [`${xt}-focused`]: a,
    [`${xt}-error`]: n.error,
    [`${xt}-seperated`]: n.seperated
  });
  return l.createElement(l.Fragment, null, Z(n, l.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: v,
    onFocus: d,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, l.createElement("div", {
    className: `${xt}-cell-container`
  }, y()), l.createElement("input", {
    ref: f,
    className: `${xt}-native-input`,
    value: s,
    type: "text",
    pattern: "[0-9]*",
    inputMode: "numeric",
    onChange: (p) => {
      c(p.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && l.cloneElement(n.keyboard, {
    visible: a,
    onInput: (p) => {
      s.length < r && c((s + p).slice(0, n.length));
    },
    onDelete: () => {
      c(s.slice(0, -1));
    },
    onClose: () => {
      var p;
      (p = u.current) === null || p === void 0 || p.blur();
    }
  }));
}), Gr = "adm-progress-bar", j$ = {
  percent: 0,
  rounded: !0,
  text: !1
}, Qk = (e) => {
  const t = U(j$, e), n = {
    width: `${t.percent}%`
  }, r = function() {
    return t.text === !0 ? `${t.percent}%` : typeof t.text == "function" ? t.text(t.percent) : t.text;
  }();
  return Z(t, l.createElement("div", {
    className: B(Gr, t.rounded && `${Gr}-rounded`)
  }, l.createElement("div", {
    className: `${Gr}-trail`
  }, l.createElement("div", {
    className: `${Gr}-fill`,
    style: n
  })), jt(r) && l.createElement("div", {
    className: `${Gr}-text`
  }, r)));
}, er = "adm-progress-circle", Jk = (e) => {
  const t = U({
    percent: 0
  }, e), n = {
    "--percent": t.percent.toString()
  };
  return Z(t, l.createElement("div", {
    className: `${er}`,
    style: n
  }, l.createElement("div", {
    className: `${er}-content`
  }, l.createElement("svg", {
    className: `${er}-svg`
  }, l.createElement("circle", {
    className: `${er}-track`,
    fill: "transparent"
  }), l.createElement("circle", {
    className: `${er}-fill`,
    fill: "transparent"
  })), l.createElement("div", {
    className: `${er}-info`
  }, t.children))));
}, B$ = (e) => new Promise((t) => setTimeout(t, e)), aa = "adm-pull-to-refresh", W$ = {
  pullingText: "下拉刷新",
  canReleaseText: "释放立即刷新",
  refreshingText: "加载中...",
  completeText: "刷新成功",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, eO = (e) => {
  var t, n;
  const {
    locale: r
  } = pe(), i = U(W$, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, e), a = (t = i.headHeight) !== null && t !== void 0 ? t : Tn(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Tn(60), [s, c] = K("pulling"), [u, f] = Pe(() => ({
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
  Y(() => {
    var b;
    (b = d.current) === null || b === void 0 || b.addEventListener("touchmove", () => {
    });
  }, []);
  const y = () => new Promise((b) => {
    f.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), b();
      }
    });
  });
  function v() {
    return ke(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (b) {
        throw y(), b;
      }
      i.completeDelay > 0 && (yield B$(i.completeDelay)), y();
    });
  }
  Pt((b) => {
    if (s === "refreshing" || s === "complete")
      return;
    const {
      event: g
    } = b;
    if (b.last) {
      m.current = !1, s === "canRelease" ? v() : f.start({
        height: 0
      });
      return;
    }
    const [, C] = b.movement, h = Math.ceil(C);
    if (b.first && h > 0) {
      let $ = function(P) {
        return "scrollTop" in P ? P.scrollTop : P.scrollY;
      };
      const E = b.event.target;
      if (!E || !(E instanceof Element))
        return;
      let x = Ea(E);
      for (; ; ) {
        if (!x || $(x) > 0)
          return;
        if (x instanceof Window)
          break;
        x = Ea(x.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    g.cancelable && g.preventDefault(), g.stopPropagation();
    const w = Math.max(gi(h, 0, 0, a * 5, 0.5), 0);
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
    eventOptions: Rn ? {
      passive: !1
    } : void 0
  });
  const p = () => {
    var b;
    if (i.renderText)
      return (b = i.renderText) === null || b === void 0 ? void 0 : b.call(i, s);
    if (s === "pulling")
      return i.pullingText;
    if (s === "canRelease")
      return i.canReleaseText;
    if (s === "refreshing")
      return i.refreshingText;
    if (s === "complete")
      return i.completeText;
  };
  return l.createElement(ve.div, {
    ref: d,
    className: aa
  }, l.createElement(ve.div, {
    style: u,
    className: `${aa}-head`
  }, l.createElement("div", {
    className: `${aa}-head-content`,
    style: {
      height: a
    }
  }, p())), l.createElement("div", {
    className: `${aa}-content`
  }, i.children));
}, wm = ll(null), Z$ = {
  disabled: !1,
  defaultValue: null
}, H$ = (e) => {
  const t = U(Z$, e), [n, r] = te({
    value: t.value,
    defaultValue: t.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = t.onChange) === null || a === void 0 || a.call(t, i));
    }
  });
  return l.createElement(
    wm.Provider,
    {
      // TODO: 性能优化
      value: {
        value: n === null ? [] : [n],
        check: (i) => {
          r(i);
        },
        uncheck: () => {
        },
        disabled: t.disabled
      }
    },
    t.children
  );
}, bn = "adm-radio", z$ = {
  defaultChecked: !1
}, U$ = (e) => {
  const t = U(z$, e), n = at(wm);
  let [r, i] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  }), a = t.disabled;
  const {
    value: o
  } = t;
  n && o !== void 0 && (r = n.value.includes(o), i = (c) => {
    var u;
    c ? n.check(o) : n.uncheck(o), (u = t.onChange) === null || u === void 0 || u.call(t, c);
  }, a = a || n.disabled);
  const s = () => t.icon ? l.createElement("div", {
    className: `${bn}-custom-icon`
  }, t.icon(r)) : l.createElement("div", {
    className: `${bn}-icon`
  }, r && l.createElement(l0, null));
  return Z(t, l.createElement("label", {
    onClick: t.onClick,
    className: B(bn, {
      [`${bn}-checked`]: r,
      [`${bn}-disabled`]: a,
      [`${bn}-block`]: t.block
    })
  }, l.createElement(c0, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: t.id
  }), s(), t.children && l.createElement("div", {
    className: `${bn}-content`
  }, t.children)));
}, tO = ie(U$, {
  Group: H$
}), q$ = () => l.createElement("svg", {
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
})), wn = "adm-rate", K$ = {
  count: 5,
  allowHalf: !1,
  character: l.createElement(q$, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, nO = (e) => {
  const t = U(K$, e), [n, r] = te(t), i = j(null), a = Array(t.count).fill(null);
  function o(c, u) {
    return l.createElement("div", {
      className: B(`${wn}-star`, {
        [`${wn}-star-active`]: n >= c,
        [`${wn}-star-half`]: u,
        [`${wn}-star-readonly`]: t.readOnly
      }),
      role: "radio",
      "aria-checked": n >= c,
      "aria-label": "" + c
    }, t.character);
  }
  const s = Pt((c) => {
    if (t.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), y = (u - m.left) / m.width * t.count, v = t.allowHalf ? Math.ceil(y * 2) / 2 : Math.ceil(y), p = $e(v, 0, t.count);
    if (f && t.allowClear && p === n) {
      r(0);
      return;
    }
    r(p);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    },
    filterTaps: !0
  });
  return Z(t, l.createElement("div", Object.assign({
    className: B(wn, {
      [`${wn}-half`]: t.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": t.readOnly,
    ref: i
  }, s()), a.map((c, u) => l.createElement("div", {
    key: u,
    className: B(`${wn}-box`)
  }, t.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, Yr = "adm-result", G$ = {
  success: p1,
  error: ao,
  info: E1,
  waiting: y1,
  warning: w1
}, Y$ = {
  status: "info"
}, rO = (e) => {
  const t = U(Y$, e), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = t;
  if (!n)
    return null;
  const o = a || l.createElement(G$[n]);
  return Z(t, l.createElement("div", {
    className: B(Yr, `${Yr}-${n}`)
  }, l.createElement("div", {
    className: `${Yr}-icon`
  }, o), l.createElement("div", {
    className: `${Yr}-title`
  }, r), !!i && l.createElement("div", {
    className: `${Yr}-description`
  }, i)));
}, Te = "adm-result-page", X$ = {
  success: p1,
  error: ao,
  info: E1,
  waiting: y1,
  warning: w1
}, Q$ = {
  status: "info",
  details: []
}, J$ = (e) => {
  const t = U(Q$, e), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = t, d = o || l.createElement(X$[n]), [m, y] = K(!0), v = jt(c), p = jt(s);
  return Z(t, l.createElement("div", {
    className: Te
  }, l.createElement("div", {
    className: `${Te}-header`
  }, l.createElement("div", {
    className: `${Te}-icon`
  }, d), l.createElement("div", {
    className: `${Te}-title`
  }, r), jt(i) ? l.createElement("div", {
    className: `${Te}-description`
  }, i) : null, a != null && a.length ? l.createElement("div", {
    className: `${Te}-details`
  }, (m ? a.slice(0, 3) : a).map((b, g) => l.createElement("div", {
    className: B(`${Te}-detail`, b.bold && `${Te}-detail-bold`),
    key: g
  }, l.createElement("span", null, b.label), l.createElement("span", null, b.value))), a.length > 3 && l.createElement("div", {
    onClick: () => y((b) => !b)
  }, l.createElement("div", {
    className: B(`${Te}-collapse`, !m && `${Te}-collapse-active`)
  }))) : null, l.createElement("div", {
    className: `${Te}-bgWrapper`
  }, l.createElement("div", {
    className: `${Te}-bg`
  }))), l.createElement("div", {
    className: `${Te}-content`
  }, t.children), (p || v) && l.createElement("div", {
    className: `${Te}-footer`
  }, v && l.createElement(Wt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Te}-footer-btn`
  }, c), p && v && l.createElement("div", {
    className: `${Te}-footer-space`
  }), p && l.createElement(Wt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Te}-footer-btn`
  }, s))));
}, e_ = "adm-result-page-card", t_ = (e) => Z(e, l.createElement("div", {
  className: B(`${e_}`)
}, e.children)), iO = ie(J$, {
  Card: t_
}), Jt = "adm-search-bar", n_ = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(jy, null)
}, aO = fe((e, t) => {
  const {
    locale: n
  } = pe(), r = U(n_, {
    cancelText: n.common.cancel
  }, e), [i, a] = te(r), [o, s] = K(!1), c = j(null), u = j(!1);
  ye(t, () => ({
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
      className: `${Jt}-suffix`
    }, l.createElement(Wt, {
      fill: "none",
      className: `${Jt}-cancel-button`,
      onClick: () => {
        var m, y, v;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (y = c.current) === null || y === void 0 || y.blur(), (v = r.onCancel) === null || v === void 0 || v.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return Z(r, l.createElement("div", {
    className: B(Jt, {
      [`${Jt}-active`]: o
    })
  }, l.createElement("div", {
    className: `${Jt}-input-box`
  }, r.icon && l.createElement("div", {
    className: `${Jt}-input-box-icon`
  }, r.icon), l.createElement(ym, {
    ref: c,
    className: B(`${Jt}-input`, {
      [`${Jt}-input-without-icon`]: !r.icon
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
}), r_ = Ve(() => l.createElement("svg", {
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
})))))))), En = "adm-selector", i_ = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, oO = (e) => {
  const t = U(i_, e), [n, r, , i] = Mi(t.fieldNames), [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue,
    onChange: (u) => {
      var f;
      const d = {
        get items() {
          return t.options.filter((m) => u.includes(m[r]));
        }
      };
      (f = t.onChange) === null || f === void 0 || f.call(t, u, d);
    }
  }), {
    locale: s
  } = pe(), c = t.options.map((u) => {
    const f = (a || []).includes(u[r]), d = u[i] || t.disabled, m = B(`${En}-item`, {
      [`${En}-item-active`]: f && !t.multiple,
      [`${En}-item-multiple-active`]: f && t.multiple,
      [`${En}-item-disabled`]: d
    });
    return l.createElement("div", {
      key: u[r],
      className: m,
      onClick: () => {
        if (!d)
          if (t.multiple) {
            const y = f ? a.filter((v) => v !== u[r]) : [...a, u[r]];
            o(y);
          } else {
            const y = f ? [] : [u[r]];
            o(y);
          }
      },
      role: "option",
      "aria-selected": f && !t.multiple || f && t.multiple
    }, u[n], u.description && l.createElement("div", {
      className: `${En}-item-description`
    }, u.description), f && t.showCheckMark && l.createElement("div", {
      className: `${En}-check-mark-wrapper`
    }, l.createElement(r_, null)));
  });
  return Z(t, l.createElement("div", {
    className: En,
    role: "listbox",
    "aria-label": s.Selector.name
  }, t.columns ? l.createElement(um, {
    columns: t.columns
  }, c) : l.createElement(wc, {
    wrap: !0
  }, c)));
}, as = Ve((e) => Z(e, l.createElement("svg", {
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
}))))), Me = "adm-side-bar", a_ = () => null, o_ = (e) => {
  var t;
  let n = null;
  const r = [];
  mn(e.children, (c, u) => {
    if (!Vn(c))
      return;
    const f = c.key;
    typeof f == "string" && (u === 0 && (n = f), r.push(c));
  });
  const [i, a] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = e.onChange) === null || u === void 0 || u.call(e, c));
    }
  }), o = r[r.length - 1], s = o && o.key === i;
  return Z(e, l.createElement("div", {
    className: Me
  }, l.createElement("div", {
    className: `${Me}-items`
  }, r.map((c, u) => {
    const f = c.key === i, d = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return Z(c.props, l.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: y
        } = c;
        y == null || c.props.disabled || a(y.toString());
      },
      className: B(`${Me}-item`, {
        [`${Me}-item-active`]: f,
        [`${Me}-item-disabled`]: c.props.disabled
      })
    }, l.createElement(l.Fragment, null, d && l.createElement(as, {
      className: `${Me}-item-corner ${Me}-item-corner-top`
    }), m && l.createElement(as, {
      className: `${Me}-item-corner ${Me}-item-corner-bottom`
    })), l.createElement(Ts, {
      content: c.props.badge,
      className: `${Me}-badge`
    }, l.createElement("div", {
      className: `${Me}-item-title`
    }, f && l.createElement("div", {
      className: `${Me}-item-highlight`
    }), c.props.title))));
  })), l.createElement("div", {
    className: B(`${Me}-extra-space`, s && `${Me}-item-active-next-sibling`)
  }, s && l.createElement(as, {
    className: `${Me}-item-corner ${Me}-item-corner-top`
  }))));
}, sO = ie(o_, {
  Item: a_
}), os = "adm-slider", s_ = ({
  points: e,
  max: t,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = t - n, o = e.map((s) => {
    const c = `${Math.abs(s - n) / a * 100}%`, u = s <= r && s >= i, f = {
      left: c
    }, d = B({
      [`${os}-tick`]: !0,
      [`${os}-tick-active`]: u
    });
    return l.createElement("span", {
      className: d,
      style: f,
      key: s
    });
  });
  return l.createElement("div", {
    className: `${os}-ticks`
  }, o);
}, l_ = s_, ss = "adm-slider-mark", c_ = ({
  marks: e,
  upperBound: t,
  lowerBound: n,
  max: r,
  min: i
}) => {
  const a = Object.keys(e), o = r - i, s = a.map(parseFloat).sort((c, u) => c - u).filter((c) => c >= i && c <= r).map((c) => {
    const u = e[c];
    if (!u && u !== 0)
      return null;
    const f = c <= t && c >= n, d = B({
      [`${ss}-text`]: !0,
      [`${ss}-text-active`]: f
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
    className: ss
  }, s);
}, u_ = c_;
function al() {
  return typeof BigInt == "function";
}
function Em(e) {
  return !e && e !== 0 && !Number.isNaN(e) || !String(e).trim();
}
function li(e) {
  var t = e.trim(), n = t.startsWith("-");
  n && (t = t.slice(1)), t = t.replace(/(\.\d*[^0])0*$/, "$1").replace(/\.0*$/, "").replace(/^0+/, ""), t.startsWith(".") && (t = "0".concat(t));
  var r = t || "0", i = r.split("."), a = i[0] || "0", o = i[1] || "0";
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
function Cc(e) {
  var t = String(e);
  return !Number.isNaN(Number(t)) && t.includes("e");
}
function ti(e) {
  var t = String(e);
  if (Cc(e)) {
    var n = Number(t.slice(t.indexOf("e-") + 2)), r = t.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return t.includes(".") && xm(t) ? t.length - t.indexOf(".") - 1 : 0;
}
function Cm(e) {
  var t = String(e);
  if (Cc(e)) {
    if (e > Number.MAX_SAFE_INTEGER)
      return String(al() ? BigInt(e).toString() : Number.MAX_SAFE_INTEGER);
    if (e < Number.MIN_SAFE_INTEGER)
      return String(al() ? BigInt(e).toString() : Number.MIN_SAFE_INTEGER);
    t = e.toFixed(ti(t));
  }
  return li(t).fullStr;
}
function xm(e) {
  return typeof e == "number" ? !Number.isNaN(e) : e ? (
    // Normal type: 11.28
    /^\s*-?\d+(\.\d+)?\s*$/.test(e) || // Pre-number: 1.
    /^\s*-?\d+\.\s*$/.test(e) || // Post-number: .1
    /^\s*-?\.\d+\s*$/.test(e)
  ) : !1;
}
var f_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ii(this, e), De(this, "origin", ""), De(this, "negative", void 0), De(this, "integer", void 0), De(this, "decimal", void 0), De(this, "decimalLen", void 0), De(this, "empty", void 0), De(this, "nan", void 0), Em(t)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(t), t === "-" || Number.isNaN(t)) {
      this.nan = !0;
      return;
    }
    var n = t;
    if (Cc(n) && (n = Number(n)), n = typeof n == "string" ? n : Cm(n), xm(n)) {
      var r = li(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Li(e, [{
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
      var n = new e(this.toString());
      return n.negative = !n.negative, n;
    }
  }, {
    key: "cal",
    value: function(n, r, i) {
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), s = n.alignDecimal(a), c = r(o, s).toString(), u = i(a), f = li(c), d = f.negativeStr, m = f.trimStr, y = "".concat(d).concat(m.padStart(u + 1, "0"));
      return new e("".concat(y.slice(0, -u), ".").concat(y.slice(-u)));
    }
  }, {
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new e(n);
      var r = new e(n);
      return r.isInvalidate() ? this : this.cal(r, function(i, a) {
        return i + a;
      }, function(i) {
        return i;
      });
    }
  }, {
    key: "multi",
    value: function(n) {
      var r = new e(n);
      return this.isInvalidate() || r.isInvalidate() ? new e(NaN) : this.cal(r, function(i, a) {
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
      return n ? this.isInvalidate() ? "" : li("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), e;
}(), d_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ii(this, e), De(this, "origin", ""), De(this, "number", void 0), De(this, "empty", void 0), Em(t)) {
      this.empty = !0;
      return;
    }
    this.origin = String(t), this.number = Number(t);
  }
  return Li(e, [{
    key: "negate",
    value: function() {
      return new e(-this.toNumber());
    }
  }, {
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new e(n);
      var r = Number(n);
      if (Number.isNaN(r))
        return this;
      var i = this.number + r;
      if (i > Number.MAX_SAFE_INTEGER)
        return new e(Number.MAX_SAFE_INTEGER);
      if (i < Number.MIN_SAFE_INTEGER)
        return new e(Number.MIN_SAFE_INTEGER);
      var a = Math.max(ti(this.number), ti(r));
      return new e(i.toFixed(a));
    }
  }, {
    key: "multi",
    value: function(n) {
      var r = Number(n);
      if (this.isInvalidate() || Number.isNaN(r))
        return new e(NaN);
      var i = this.number * r;
      if (i > Number.MAX_SAFE_INTEGER)
        return new e(Number.MAX_SAFE_INTEGER);
      if (i < Number.MIN_SAFE_INTEGER)
        return new e(Number.MIN_SAFE_INTEGER);
      var a = Math.max(ti(this.number), ti(r));
      return new e(i.toFixed(a));
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
      return n ? this.isInvalidate() ? "" : Cm(this.number) : this.origin;
    }
  }]), e;
}();
function Ze(e) {
  return al() ? new f_(e) : new d_(e);
}
function xc(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === "")
    return "";
  var i = li(e), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(t).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(s[n]);
    if (f >= 5 && !r) {
      var d = Ze(e).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return xc(d.toString(), t, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(t).concat(s.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const m_ = (e) => Z(e, l.createElement("svg", {
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
})))), ls = "adm-slider", h_ = (e) => {
  const {
    value: t,
    min: n,
    max: r,
    disabled: i,
    icon: a,
    residentPopover: o,
    onDrag: s
  } = e, c = j(t), {
    locale: u
  } = pe(), f = () => ({
    left: `${(t - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = K(!1), y = Pt((b) => {
    var g;
    if (i)
      return;
    b.first && (c.current = t);
    const C = b.xy[0] - b.initial[0], h = (g = e.trackRef.current) === null || g === void 0 ? void 0 : g.offsetWidth;
    if (!h)
      return;
    const w = C / Math.ceil(h) * (r - n);
    s(c.current + w, b.first, b.last), m(!b.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), v = typeof e.popover == "function" ? e.popover : e.popover ? (b) => b.toString() : null, p = l.createElement("div", {
    className: `${ls}-thumb`
  }, a || l.createElement(m_, {
    className: `${ls}-thumb-icon`
  }));
  return l.createElement("div", Object.assign({
    className: `${ls}-thumb-container`,
    style: f()
  }, y(), {
    role: "slider",
    "aria-label": e["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": t,
    "aria-disabled": i
  }), v ? l.createElement(lm, {
    content: v(t),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, p) : p);
}, v_ = h_, Xr = "adm-slider", p_ = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, lO = (e) => {
  var t;
  const n = U(p_, e), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: s,
    step: c,
    icon: u
  } = n;
  function f(_) {
    return _.sort((R, N) => R - N);
  }
  function d(_) {
    return n.range ? _ : [n.min, _];
  }
  function m(_, R) {
    const N = Ze(_), O = xc(N.toString(), ".", R);
    return Ze(O).toNumber();
  }
  function y(_) {
    const R = Math.max(v(c), v(_[0]), v(_[1]));
    return n.range ? _.map((N) => m(N, R)) : m(_[1], R);
  }
  function v(_) {
    return (`${_}`.split(".")[1] || "").length;
  }
  function p(_) {
    var R;
    (R = n.onAfterChange) === null || R === void 0 || R.call(n, y(_));
  }
  let b = n.value;
  n.range && typeof n.value == "number" && (b = [0, n.value]);
  const [g, C] = te({
    value: b,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : n.range ? [r, r] : r,
    onChange: n.onChange
  }), h = f(d(g));
  function w(_) {
    const R = f(_), N = h;
    R[0] === N[0] && R[1] === N[1] || C(y(R));
  }
  const E = j(null), x = `${100 * (h[1] - h[0]) / (i - r)}%`, $ = `${100 * (h[0] - r) / (i - r)}%`, P = ee(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((_, R) => _ - R);
    if (s) {
      const _ = [];
      for (let R = Ze(r); R.lessEquals(Ze(i)); R = R.add(c))
        _.push(R.toNumber());
      return _;
    }
    return [];
  }, [o, s, c, r, i]);
  function S(_) {
    const R = _ < r ? r : _ > i ? i : _;
    let N = r;
    if (P.length)
      N = tc(P, R);
    else {
      const O = Math.round((R - r) / c), M = Ze(O).multi(c);
      N = Ze(r).add(M.toString()).toNumber();
    }
    return N;
  }
  const k = j(0), D = (_) => {
    if (k.current > 0 || (_.stopPropagation(), a))
      return;
    const R = E.current;
    if (!R)
      return;
    const N = R.getBoundingClientRect().left, O = (_.clientX - N) / Math.ceil(R.offsetWidth) * (i - r) + r, M = S(O);
    let A;
    n.range ? Math.abs(M - h[0]) > Math.abs(M - h[1]) ? A = [h[0], M] : A = [M, h[1]] : A = [n.min, M], w(A), p(A);
  }, I = j(), T = (_) => l.createElement(v_, {
    key: _,
    value: h[_],
    min: r,
    max: i,
    disabled: a,
    trackRef: E,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (R, N, O) => {
      N && (k.current += 1, I.current = h);
      const M = S(R), A = I.current;
      if (!A)
        return;
      const F = [...A];
      F[_] = M, w(F), O && (p(F), window.setTimeout(() => {
        k.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return Z(n, l.createElement("div", {
    className: B(Xr, {
      [`${Xr}-disabled`]: a
    })
  }, l.createElement("div", {
    className: `${Xr}-track-container`,
    onClick: D
  }, l.createElement("div", {
    className: `${Xr}-track`,
    onClick: D,
    ref: E
  }, l.createElement("div", {
    className: `${Xr}-fill`,
    style: {
      width: x,
      left: $
    }
  }), n.ticks && l.createElement(l_, {
    points: P,
    min: r,
    max: i,
    lowerBound: h[0],
    upperBound: h[1]
  }), n.range && T(0), T(1))), o && l.createElement(u_, {
    min: r,
    max: i,
    marks: o,
    lowerBound: h[0],
    upperBound: h[1]
  })));
};
var $m = {}, _m = { exports: {} }, km = { exports: {} };
(function(e) {
  function t(n) {
    if (Array.isArray(n))
      return n;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(km);
var g_ = km.exports, Om = { exports: {} };
(function(e) {
  function t(n, r) {
    var i = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
    if (i != null) {
      var a, o, s, c, u = [], f = !0, d = !1;
      try {
        if (s = (i = i.call(n)).next, r === 0) {
          if (Object(i) !== i)
            return;
          f = !1;
        } else
          for (; !(f = (a = s.call(i)).done) && (u.push(a.value), u.length !== r); f = !0)
            ;
      } catch (m) {
        d = !0, o = m;
      } finally {
        try {
          if (!f && i.return != null && (c = i.return(), Object(c) !== c))
            return;
        } finally {
          if (d)
            throw o;
        }
      }
      return u;
    }
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Om);
var y_ = Om.exports, Sm = { exports: {} }, Fm = { exports: {} };
(function(e) {
  function t(n, r) {
    (r == null || r > n.length) && (r = n.length);
    for (var i = 0, a = new Array(r); i < r; i++)
      a[i] = n[i];
    return a;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Fm);
var b_ = Fm.exports;
(function(e) {
  var t = b_;
  function n(r, i) {
    if (r) {
      if (typeof r == "string")
        return t(r, i);
      var a = Object.prototype.toString.call(r).slice(8, -1);
      if (a === "Object" && r.constructor && (a = r.constructor.name), a === "Map" || a === "Set")
        return Array.from(r);
      if (a === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))
        return t(r, i);
    }
  }
  e.exports = n, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Sm);
var w_ = Sm.exports, Nm = { exports: {} };
(function(e) {
  function t() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Nm);
var E_ = Nm.exports;
(function(e) {
  var t = g_, n = y_, r = w_, i = E_;
  function a(o, s) {
    return t(o) || n(o, s) || r(o, s) || i();
  }
  e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
})(_m);
var Pm = _m.exports, $c = {}, C_ = Ro.default;
Object.defineProperty($c, "__esModule", {
  value: !0
});
$c.default = x_;
var qf = C_(l);
function x_(e) {
  var t = qf.useRef();
  t.current = e;
  var n = qf.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(a));
  }, []);
  return n;
}
var pr = {}, _c = {};
Object.defineProperty(_c, "__esModule", {
  value: !0
});
_c.default = $_;
function $_() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var __ = Mo.default, k_ = Ro.default;
Object.defineProperty(pr, "__esModule", {
  value: !0
});
pr.useLayoutUpdateEffect = pr.default = void 0;
var ol = k_(l), O_ = __(_c), Kf = (0, O_.default)() ? ol.useLayoutEffect : ol.useEffect, Am = function(t, n) {
  var r = ol.useRef(!0);
  Kf(function() {
    return t(r.current);
  }, n), Kf(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, S_ = function(t, n) {
  Am(function(r) {
    if (!r)
      return t();
  }, n);
};
pr.useLayoutUpdateEffect = S_;
var F_ = Am;
pr.default = F_;
var kc = {}, N_ = Ro.default, P_ = Mo.default;
Object.defineProperty(kc, "__esModule", {
  value: !0
});
kc.default = T_;
var A_ = P_(Pm), cs = N_(l);
function T_(e) {
  var t = cs.useRef(!1), n = cs.useState(e), r = (0, A_.default)(n, 2), i = r[0], a = r[1];
  cs.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, c) {
    c && t.current || a(s);
  }
  return [i, o];
}
var Oc = Mo.default;
Object.defineProperty($m, "__esModule", {
  value: !0
});
var R_ = $m.default = M_, Gf = Oc(Pm), Yf = Oc($c), Xf = pr, Qf = Oc(kc);
function us(e) {
  return e !== void 0;
}
function M_(e, t) {
  var n = t || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = (0, Qf.default)(function() {
    return us(i) ? i : us(r) ? typeof r == "function" ? r() : r : typeof e == "function" ? e() : e;
  }), c = (0, Gf.default)(s, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, y = (0, Yf.default)(a), v = (0, Qf.default)([d]), p = (0, Gf.default)(v, 2), b = p[0], g = p[1];
  (0, Xf.useLayoutUpdateEffect)(function() {
    var h = b[0];
    u !== h && y(u, h);
  }, [b]), (0, Xf.useLayoutUpdateEffect)(function() {
    us(i) || f(i);
  }, [i]);
  var C = (0, Yf.default)(function(h, w) {
    f(h, w), g([d], w);
  });
  return [m, C];
}
const tr = "adm-stepper", I_ = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function L_(e, t) {
  const n = U(I_, e), {
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
    formatter: y,
    parser: v
  } = n, {
    locale: p
  } = pe();
  ye(t, () => ({
    focus: () => {
      var A;
      (A = I.current) === null || A === void 0 || A.focus();
    },
    blur: () => {
      var A;
      (A = I.current) === null || A === void 0 || A.blur();
    },
    get nativeElement() {
      var A, F;
      return (F = (A = I.current) === null || A === void 0 ? void 0 : A.nativeElement) !== null && F !== void 0 ? F : null;
    }
  }));
  const b = (A) => (d !== void 0 ? xc(A.toString(), ".", d) : A).toString(), g = (A) => m ? A.toString() : A.toNumber(), C = (A) => {
    if (A === "")
      return null;
    if (v)
      return String(v(A));
    const F = Ze(A);
    return F.isInvalidate() ? null : F.toString();
  }, h = (A) => A === null ? "" : y ? y(A) : b(A), [w, E] = R_(r, {
    value: i,
    onChange: (A) => {
      a == null || a(A);
    }
  }), [x, $] = K(() => h(w));
  function P(A) {
    if (A.isNaN())
      return;
    let F = A;
    if (u !== void 0) {
      const L = Ze(u);
      F.lessEquals(L) && (F = L);
    }
    if (c !== void 0) {
      const L = Ze(c);
      L.lessEquals(F) && (F = L);
    }
    d !== void 0 && (F = Ze(b(g(F)))), E(g(F));
  }
  const S = (A) => {
    $(A);
    const F = C(A);
    F === null ? n.allowEmpty ? E(null) : E(r) : P(Ze(F));
  }, [k, D] = K(!1), I = l.useRef(null);
  function T(A) {
    D(A), A && $(w != null ? String(w) : "");
  }
  Y(() => {
    var A, F, L;
    k && ((L = (F = (A = I.current) === null || A === void 0 ? void 0 : A.nativeElement) === null || F === void 0 ? void 0 : F.select) === null || L === void 0 || L.call(F));
  }, [k]), Y(() => {
    k || $(h(w));
  }, [k, w, d]);
  const _ = (A) => {
    let F = Ze(s);
    A || (F = F.negate()), P(Ze(w ?? 0).add(F.toString()));
  }, R = () => {
    _(!1);
  }, N = () => {
    _(!0);
  }, O = () => o ? !0 : w === null ? !1 : u !== void 0 ? w <= u : !1, M = () => o ? !0 : w === null ? !1 : c !== void 0 ? w >= c : !1;
  return Z(n, l.createElement("div", {
    className: B(tr, {
      [`${tr}-active`]: k
    })
  }, l.createElement(Wt, {
    className: `${tr}-minus`,
    onClick: R,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": p.Stepper.decrease
  }, l.createElement(Ly, null)), l.createElement("div", {
    className: `${tr}-middle`
  }, l.createElement(ym, {
    ref: I,
    className: `${tr}-input`,
    onFocus: (A) => {
      var F;
      T(!0), (F = n.onFocus) === null || F === void 0 || F.call(n, A);
    },
    value: x,
    onChange: (A) => {
      o || S(A);
    },
    disabled: o,
    onBlur: (A) => {
      var F;
      T(!1), (F = n.onBlur) === null || F === void 0 || F.call(n, A);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(x),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), l.createElement(Wt, {
    className: `${tr}-plus`,
    onClick: N,
    disabled: M(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": p.Stepper.increase
  }, l.createElement(v1, null))));
}
const cO = fe(L_), Cn = "adm-step", D_ = (e) => {
  const {
    title: t,
    description: n,
    icon: r,
    status: i = "wait"
  } = e;
  return Z(e, l.createElement("div", {
    className: B(`${Cn}`, `${Cn}-status-${i}`)
  }, l.createElement("div", {
    className: `${Cn}-indicator`
  }, l.createElement("div", {
    className: `${Cn}-icon-container`
  }, r)), l.createElement("div", {
    className: `${Cn}-content`
  }, l.createElement("div", {
    className: `${Cn}-title`
  }, t), !!n && l.createElement("div", {
    className: `${Cn}-description`
  }, n))));
}, Jf = "adm-steps", V_ = "adm-step", j_ = l.createElement("span", {
  className: `${V_}-icon-dot`
}), B_ = {
  current: 0,
  direction: "horizontal"
}, W_ = (e) => {
  const t = U(B_, e), {
    direction: n,
    current: r
  } = t, i = B(Jf, `${Jf}-${n}`);
  return Z(t, l.createElement("div", {
    className: i
  }, l.Children.map(t.children, (a, o) => {
    var s;
    if (!l.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (s = c.icon) !== null && s !== void 0 ? s : j_;
    return l.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, uO = ie(W_, {
  Step: D_
}), en = "adm-swipe-action", Z_ = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, fO = fe((e, t) => {
  const n = U(Z_, e), r = j(null), i = j(null), a = j(null);
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
  }, f] = Pe(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = j(!1), m = j(null);
  function y() {
    var g;
    (g = m.current) === null || g === void 0 || g.call(m), d.current = !1;
  }
  const v = Pt((g) => {
    var C;
    if (m.current = g.cancel, !g.intentional || (g.down && (d.current = !0), !d.current))
      return;
    const [h] = g.offset;
    if (g.last) {
      const w = s(), E = c();
      let x = h + g.velocity[0] * g.direction[0] * 50;
      h > 0 ? x = Math.max(0, x) : h < 0 ? x = Math.min(0, x) : x = 0;
      const $ = tc([-E, 0, w], x);
      f.start({
        x: $
      }), $ !== 0 && ((C = e.onActionsReveal) === null || C === void 0 || C.call(e, $ > 0 ? "left" : "right")), window.setTimeout(() => {
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
  function p() {
    f.start({
      x: 0
    }), y();
  }
  ye(t, () => ({
    show: (g = "right") => {
      var C;
      g === "right" ? f.start({
        x: -c()
      }) : g === "left" && f.start({
        x: s()
      }), (C = e.onActionsReveal) === null || C === void 0 || C.call(e, g);
    },
    close: p
  })), Y(() => {
    if (!n.closeOnTouchOutside)
      return;
    function g(C) {
      if (u.get() === 0)
        return;
      const h = r.current;
      h && !h.contains(C.target) && p();
    }
    return document.addEventListener("touchstart", g), () => {
      document.removeEventListener("touchstart", g);
    };
  }, [n.closeOnTouchOutside]);
  function b(g) {
    var C, h;
    const w = (C = g.color) !== null && C !== void 0 ? C : "light";
    return l.createElement(Wt, {
      key: g.key,
      className: `${en}-action-button`,
      style: {
        "--background-color": (h = H_[w]) !== null && h !== void 0 ? h : w
      },
      onClick: (E) => {
        var x, $;
        n.closeOnAction && p(), (x = g.onClick) === null || x === void 0 || x.call(g, E), ($ = n.onAction) === null || $ === void 0 || $.call(n, g, E);
      }
    }, g.text);
  }
  return Z(n, l.createElement("div", Object.assign({
    className: en
  }, v(), {
    ref: r,
    onClickCapture: (g) => {
      d.current && (g.stopPropagation(), g.preventDefault());
    }
  }), l.createElement(ve.div, {
    className: `${en}-track`,
    style: {
      x: u
    }
  }, ln(n.stopPropagation, l.createElement("div", {
    className: `${en}-actions ${en}-actions-left`,
    ref: i
  }, n.leftActions.map(b))), l.createElement("div", {
    className: `${en}-content`,
    onClickCapture: (g) => {
      u.goal !== 0 && (g.preventDefault(), g.stopPropagation(), p());
    }
  }, l.createElement(ve.div, {
    style: {
      pointerEvents: u.to((g) => g !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), ln(n.stopPropagation, l.createElement("div", {
    className: `${en}-actions ${en}-actions-right`,
    ref: a
  }, n.rightActions.map(b))))));
}), H_ = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, Tm = (e) => Z(e, l.createElement("div", {
  className: "adm-swiper-item",
  onClick: e.onClick
}, e.children));
function z_(e) {
  const [t, n] = K(e), r = j(t);
  return Y(() => {
    r.current = t;
  }, [t]), [t, n, r];
}
function U_(e, t) {
  const n = Object.keys(e), r = Object.keys(t), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const s = e[o], c = t[o];
    typeof s == "function" && typeof c == "function" ? a[o] = function(...u) {
      s(...u), c(...u);
    } : a[o] = s || c;
  }), a;
}
const ht = "adm-swiper", q_ = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, K_ = {
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
let oa;
const G_ = fe(Zl((e, t) => {
  const n = U(K_, e), [r] = K({}), i = j(null), a = n.direction === "vertical", o = n.slideSize / 100, s = n.trackOffset / 100, {
    validChildren: c,
    count: u
  } = ee(() => {
    let f = 0;
    return {
      validChildren: l.Children.map(n.children, (m) => !l.isValidElement(m) || m.type !== Tm ? null : (f++, m)),
      count: f
    };
  }, [n.children]);
  return u === 0 || !c ? null : () => {
    let f = n.loop;
    o * (u - 1) < 1 && (f = !1);
    const d = j(null);
    function m() {
      const F = d.current;
      return F ? (a ? F.offsetHeight : F.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [y, v, p] = u6(n.defaultIndex), [b, g, C] = z_(!1);
    function h(F) {
      let L = 0, W = u - 1;
      return n.stuckAtBoundary && (L += s / o, W -= (1 - o - s) / o), $e(F, L, W);
    }
    const [{
      position: w
    }, E] = Pe(() => ({
      position: h(y) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (C.current || !f)
          return;
        const F = w.get(), L = 100 * u, W = fs(F, L);
        W !== F && E.start({
          position: W,
          immediate: !0
        });
      }
    }), [u]), x = j(null);
    function $() {
      var F;
      (F = x.current) === null || F === void 0 || F.call(x), C.current = !1;
    }
    const P = Pt((F) => {
      if (x.current = F.cancel, !F.intentional || (F.first && !oa && (oa = r), oa !== r))
        return;
      oa = F.last ? void 0 : r;
      const L = m();
      if (!L)
        return;
      const W = a ? 1 : 0, H = F.offset[W], q = F.direction[W], G = F.velocity[W];
      if (g(!0), !F.last)
        E.start({
          position: H * 100 / L,
          immediate: !0
        });
      else {
        const ae = Math.floor(H / L), de = ae + 1, Ee = Math.round((H + G * 2e3 * q) / L);
        S($e(Ee, ae, de)), window.setTimeout(() => {
          g(!1);
        });
      }
    }, {
      transform: ([F, L]) => [-F, -L],
      from: () => {
        const F = m();
        return [w.get() / 100 * F, w.get() / 100 * F];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (f)
          return {};
        const F = m(), L = h(0) * F, W = h(u - 1) * F;
        return a ? {
          top: L,
          bottom: W
        } : {
          left: L,
          right: W
        };
      },
      rubberband: n.rubberband,
      axis: a ? "y" : "x",
      preventScroll: !a,
      pointer: {
        touch: !0
      }
    });
    function S(F, L = !1) {
      var W;
      const H = Math.round(F), q = f ? fs(H, u) : $e(H, 0, u - 1);
      q !== p() && ((W = n.onIndexChange) === null || W === void 0 || W.call(n, q)), v(q), E.start({
        position: (f ? H : h(H)) * 100,
        immediate: L
      });
    }
    function k() {
      S(Math.round(w.get() / 100) + 1);
    }
    function D() {
      S(Math.round(w.get() / 100) - 1);
    }
    ye(t, () => ({
      swipeTo: S,
      swipeNext: k,
      swipePrev: D
    })), Se(() => {
      const F = c.length - 1;
      y > F && S(F, !0);
    });
    const {
      autoplay: I,
      autoplayInterval: T
    } = n, _ = () => {
      i.current = window.setTimeout(() => {
        k(), _();
      }, T);
    };
    Y(() => {
      if (!(!I || b))
        return _(), () => {
          i.current && window.clearTimeout(i.current);
        };
    }, [I, T, b, u]);
    function R() {
      return f ? l.createElement("div", {
        className: `${ht}-track-inner`
      }, l.Children.map(c, (F, L) => l.createElement(ve.div, {
        className: B(`${ht}-slide`, {
          [`${ht}-slide-active`]: y === L
        }),
        style: {
          [a ? "y" : "x"]: w.to((W) => {
            let H = -W + L * 100;
            const q = u * 100, G = q / 2;
            return H = fs(H + G, q) - G, `${H}%`;
          }),
          [a ? "top" : "left"]: `-${L * 100}%`
        }
      }, F))) : l.createElement(ve.div, {
        className: `${ht}-track-inner`,
        style: {
          [a ? "y" : "x"]: w.to((F) => `${-F}%`)
        }
      }, l.Children.map(c, (F, L) => l.createElement("div", {
        className: B(`${ht}-slide`, {
          [`${ht}-slide-active`]: y === L
        })
      }, F)));
    }
    const N = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, O = Object.assign({}, n.allowTouchMove ? P() : {}), M = {};
    for (const F of n.stopPropagation) {
      const L = q_[F];
      M[L] = function(W) {
        W.stopPropagation();
      };
    }
    const A = U_(O, M);
    return Z(n, l.createElement("div", {
      className: B(ht, `${ht}-${n.direction}`),
      style: N
    }, l.createElement("div", Object.assign({
      ref: d,
      className: B(`${ht}-track`, {
        [`${ht}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (F) => {
        C.current && F.stopPropagation(), $();
      }
    }, A), R()), n.indicator === void 0 ? l.createElement("div", {
      className: `${ht}-indicator`
    }, l.createElement(V$, Object.assign({}, n.indicatorProps, {
      total: u,
      current: y,
      direction: n.direction
    }))) : n.indicator(u, y)));
  };
}));
function fs(e, t) {
  const n = e % t;
  return n < 0 ? n + t : n;
}
const dO = ie(G_, {
  Item: Tm
}), Y_ = Ve((e) => Z(e, l.createElement("svg", {
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
})))))))), xn = "adm-switch", X_ = {
  defaultChecked: !1
}, mO = (e) => {
  const t = U(X_, e), n = t.disabled || t.loading || !1, [r, i] = K(!1), {
    locale: a
  } = pe(), [o, s] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  });
  function c() {
    return ke(this, void 0, void 0, function* () {
      if (n || t.loading || r)
        return;
      const u = !o;
      if (t.beforeChange) {
        i(!0);
        try {
          yield t.beforeChange(u), i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
      const f = s(u);
      if (D1(f)) {
        i(!0);
        try {
          yield f, i(!1);
        } catch (d) {
          throw i(!1), d;
        }
      }
    });
  }
  return Z(t, l.createElement("div", {
    onClick: c,
    className: B(xn, {
      [`${xn}-checked`]: o,
      [`${xn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, l.createElement("div", {
    className: `${xn}-checkbox`
  }, l.createElement("div", {
    className: `${xn}-handle`
  }, (t.loading || r) && l.createElement(Y_, {
    className: `${xn}-spin-icon`
  })), l.createElement("div", {
    className: `${xn}-inner`
  }, o ? t.checkedText : t.uncheckedText))));
}, Q_ = () => null, It = "adm-tab-bar", J_ = {
  safeArea: !1
}, ek = (e) => {
  var t;
  const n = U(J_, e);
  let r = null;
  const i = [];
  mn(n.children, (s, c) => {
    if (!Vn(s))
      return;
    const u = s.key;
    typeof u == "string" && (c === 0 && (r = u), i.push(s));
  });
  const [a, o] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : r,
    onChange: (s) => {
      var c;
      s !== null && ((c = n.onChange) === null || c === void 0 || c.call(n, s));
    }
  });
  return Z(n, l.createElement("div", {
    className: It
  }, l.createElement("div", {
    className: `${It}-wrap`
  }, i.map((s) => {
    const c = s.key === a;
    function u() {
      const f = s.props.icon && l.createElement("div", {
        className: `${It}-item-icon`
      }, typeof s.props.icon == "function" ? s.props.icon(c) : s.props.icon), d = s.props.title && l.createElement("div", {
        className: B(`${It}-item-title`, !!f && `${It}-item-title-with-icon`)
      }, typeof s.props.title == "function" ? s.props.title(c) : s.props.title);
      return f ? l.createElement(l.Fragment, null, l.createElement(Ts, {
        content: s.props.badge,
        className: `${It}-icon-badge`
      }, f), d) : d ? l.createElement(Ts, {
        content: s.props.badge,
        className: `${It}-title-badge`
      }, d) : null;
    }
    return Z(s.props, l.createElement("div", {
      key: s.key,
      onClick: () => {
        const {
          key: f
        } = s;
        f != null && o(f.toString());
      },
      className: B(`${It}-item`, {
        [`${It}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && l.createElement(Ar, {
    position: "bottom"
  })));
}, hO = ie(ek, {
  Item: Q_
}), ed = "adm-tag", tk = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, nk = {
  color: "default",
  fill: "solid",
  round: !1
}, vO = (e) => {
  var t;
  const n = U(nk, e), r = (t = tk[n.color]) !== null && t !== void 0 ? t : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return Z(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: B(ed, {
      [`${ed}-round`]: n.round
    })
  }, n.children));
}, Qr = "adm-text-area", Rm = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, rk = fe((e, t) => {
  const n = U(Rm, e), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = te(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value;
  const c = j(null), u = j("auto"), f = j(null);
  ye(t, () => ({
    clear: () => {
      s("");
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
  })), Se(() => {
    if (!r)
      return;
    const p = c.current, b = f.current;
    if (!p || (p.style.height = u.current, !b))
      return;
    let g = b.scrollHeight;
    if (typeof r == "object") {
      const C = window.getComputedStyle(p), h = parseFloat(C.lineHeight);
      r.minRows && (g = Math.max(g, r.minRows * h)), r.maxRows && (g = Math.min(g, r.maxRows * h));
    }
    u.current = `${g}px`, p.style.height = `${g}px`;
  }, [o, r]);
  const d = j(!1);
  let m;
  const y = fa(o).length;
  typeof i == "function" ? m = i(y, a) : i && (m = l.createElement("div", {
    className: `${Qr}-count`
  }, a === void 0 ? y : y + "/" + a));
  let v = n.rows;
  return typeof r == "object" && (r.maxRows && v > r.maxRows && (v = r.maxRows), r.minRows && v < r.minRows && (v = r.minRows)), Z(n, l.createElement("div", {
    className: Qr
  }, l.createElement("textarea", {
    ref: c,
    className: `${Qr}-element`,
    rows: v,
    value: o,
    placeholder: n.placeholder,
    onChange: (p) => {
      let b = p.target.value;
      a && !d.current && (b = fa(b).slice(0, a).join("")), s(b);
    },
    id: n.id,
    onCompositionStart: (p) => {
      var b;
      d.current = !0, (b = n.onCompositionStart) === null || b === void 0 || b.call(n, p);
    },
    onCompositionEnd: (p) => {
      var b;
      if (d.current = !1, a) {
        const g = p.target.value;
        s(fa(g).slice(0, a).join(""));
      }
      (b = n.onCompositionEnd) === null || b === void 0 || b.call(n, p);
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
    className: `${Qr}-element ${Qr}-element-hidden`,
    value: o,
    rows: v,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
rk.defaultProps = Rm;
const Lt = "adm-toast", ik = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, ak = (e) => {
  const t = U(ik, e), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = t, o = ee(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(g1, {
          className: `${Lt}-icon-success`
        });
      case "fail":
        return l.createElement(Ni, {
          className: `${Lt}-icon-fail`
        });
      case "loading":
        return l.createElement(Kl, {
          color: "white",
          className: `${Lt}-loading`
        });
      default:
        return i;
    }
  }, [i]), s = ee(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return l.createElement(Fi, {
    visible: t.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: t.getContainer,
    afterClose: t.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, t.maskStyle),
    className: B(`${Lt}-mask`, t.maskClassName),
    stopPropagation: t.stopPropagation
  }, l.createElement("div", {
    className: B(`${Lt}-wrap`)
  }, l.createElement("div", {
    style: {
      top: s
    },
    className: B(`${Lt}-main`, i ? `${Lt}-main-icon` : `${Lt}-main-text`)
  }, o && l.createElement("div", {
    className: `${Lt}-icon`
  }, o), l.createElement(pi, null, r))));
};
let Bt = null, ds = null;
const ha = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, ok = (e) => l.createElement(ak, Object.assign({}, e));
function sk(e) {
  const t = U(ha, typeof e == "string" ? {
    content: e
  } : e), n = l.createElement(ok, Object.assign({}, t, {
    onClose: () => {
      Bt = null;
    }
  }));
  return Bt ? Bt.replace(n) : Bt = Tr(n), ds && window.clearTimeout(ds), t.duration !== 0 && (ds = window.setTimeout(() => {
    Mm();
  }, t.duration)), Bt;
}
function Mm() {
  Bt == null || Bt.close(), Bt = null;
}
function lk(e) {
  e.duration !== void 0 && (ha.duration = e.duration), e.position !== void 0 && (ha.position = e.position), e.maskClickable !== void 0 && (ha.maskClickable = e.maskClickable);
}
const ck = {
  show: sk,
  clear: Mm,
  config: lk
}, pO = ck;
function Im(e, t = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[t] ? i = Math.max(i, n(a[t]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(e);
}
const sa = "adm-tree-select", uk = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, fk = (e) => {
  const t = U(uk, e), [n, r, i] = Mi(t.fieldNames), [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), [s, c, u] = ee(() => {
    const y = Im(t.options, i), v = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
    function b(g, C) {
      C.forEach((h) => {
        p.set(h[r], g), v.set(h[r], h), h[i] && b(h, h[i]);
      });
    }
    return b(void 0, t.options), [y, v, p];
  }, [t.options]), f = (y) => {
    var v;
    const p = [];
    let b = y;
    for (; b; )
      p.push(b), b = u.get(b[r]);
    const g = p.reverse().map((C) => C[r]);
    o(g), (v = t.onChange) === null || v === void 0 || v.call(t, g, {
      options: p
    });
  }, d = (y = [], v) => y.map((p) => {
    const b = p[r] === a[v];
    return l.createElement("div", {
      key: p[r],
      className: B(`${sa}-item`, {
        [`${sa}-item-active`]: b
      }),
      onClick: () => {
        b || f(p);
      }
    }, p[n]);
  }), m = () => {
    var y;
    const v = [];
    for (let p = 0; p < s; p++) {
      let b = `${100 / s}%`;
      s === 2 && p === 0 && (b = "33.33%"), s === 2 && p === 1 && (b = "66.67%");
      const g = l.createElement("div", {
        key: p,
        className: B(`${sa}-column`),
        style: {
          width: b
        }
      }, d(p === 0 ? t.options : (y = c.get(a[p - 1])) === null || y === void 0 ? void 0 : y[i], p));
      v.push(g);
    }
    return v;
  };
  return Z(t, l.createElement("div", {
    className: sa
  }, m()));
}, tt = "adm-tree-select-multiple", dk = (e) => {
  const t = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, e);
  Y(() => {
  }, []);
  const [n, r, i] = Mi(t.fieldNames), [a, o] = te({
    value: t.expandKeys,
    defaultValue: t.defaultExpandKeys
  }), [s, c] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), u = ($) => {
    const P = [], S = (k) => {
      var D;
      k && (!((D = k[i]) === null || D === void 0) && D.length ? k[i].forEach((I) => S(I)) : P.push(k[r]));
    };
    return S($), P;
  }, [f, d, m] = ee(() => {
    const $ = Im(t.options, i), P = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map();
    function k(D, I) {
      I.forEach((T) => {
        S.set(T[r], D), P.set(T[r], T), T[i] && k(T, T[i]);
      });
    }
    return k(void 0, t.options), [$, P, S];
  }, [t.options]), y = ee(() => {
    let $ = [];
    return s.forEach((P) => {
      const S = d.get(P);
      $ = $.concat(u(S));
    }), $;
  }, [s, d]), v = ee(() => {
    const $ = /* @__PURE__ */ new Map(), P = (S) => {
      const k = m.get(S);
      k && ($.set(k[r], !0), P(k[r]));
    };
    return y.forEach((S) => {
      $.set(S, !0), P(S);
    }), $;
  }, [m, s]), p = ($) => {
    var P;
    let S = [...$], k = [];
    const D = (T) => {
      T.forEach((_) => {
        var R;
        if (k.includes(_))
          return;
        const N = m.get(_);
        if (!N)
          return;
        const O = ((R = N[i]) === null || R === void 0 ? void 0 : R.map((M) => M[r])) || [];
        O.every((M) => S.includes(M)) && (S.push(N[r]), k = k.concat(O));
      });
    };
    for (let T = 0; T < f; T++)
      D(S);
    S = S.filter((T) => !k.includes(T));
    const I = S.map((T) => d.get(T));
    c(S), (P = t.onChange) === null || P === void 0 || P.call(t, S, I);
  }, b = ($) => {
    var P;
    const S = [];
    let k = $;
    for (; k; )
      S.unshift(k), k = m.get(k[r]);
    const D = S.map((I) => I[r]);
    o(D), (P = t.onExpand) === null || P === void 0 || P.call(t, D, S);
  }, g = ($, P) => {
    var S;
    const k = (S = t.selectAllText) === null || S === void 0 ? void 0 : S[P];
    if (!k)
      return;
    let D = [];
    $.forEach((T) => {
      D = D.concat(u(T));
    });
    const I = D.every((T) => y.includes(T));
    return l.createElement("div", {
      onClick: () => {
        p(I ? y.filter((T) => !D.includes(T)) : y.concat(D));
      },
      className: `${tt}-item`
    }, k);
  }, C = ($, P) => {
    var S;
    const k = (S = t.selectAllText) === null || S === void 0 ? void 0 : S[P];
    if (!k)
      return;
    const D = $.map((_) => _[r]), I = D.every((_) => y.includes(_)), T = I ? !1 : D.some((_) => y.includes(_));
    return l.createElement("div", {
      onClick: () => {
        p(I ? y.filter((_) => !D.includes(_)) : y.concat(D));
      },
      className: B(`${tt}-item`, `${tt}-item-leaf`)
    }, l.createElement(cf, {
      className: `${tt}-item-checkbox`,
      checked: I,
      indeterminate: T
    }), k);
  }, h = ($) => {
    const P = a.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        P || b($);
      },
      className: B(`${tt}-item`, {
        [`${tt}-item-expand`]: P
      })
    }, $[n], !!v.get($[r]) && l.createElement("div", {
      className: `${tt}-dot`
    }));
  }, w = ($) => {
    const P = y.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        p(P ? y.filter((S) => S !== $[r]) : [...y, $[r]]);
      },
      className: B(`${tt}-item`, `${tt}-item-leaf`)
    }, l.createElement(cf, {
      className: `${tt}-item-checkbox`,
      checked: P
    }), $[n]);
  }, E = ($ = [], P) => $.length === 0 ? void 0 : f === P + 1 ? l.createElement(l.Fragment, null, C($, P), $.map((k) => w(k))) : l.createElement(l.Fragment, null, g($, P), $.map((k) => h(k))), x = () => {
    var $;
    const P = [];
    for (let S = 0; S < f; S++) {
      let k = `${100 / f}%`;
      f === 2 && S === 0 && (k = "33.33%"), f === 2 && S === 1 && (k = "66.67%");
      const D = l.createElement("div", {
        key: S,
        className: B(`${tt}-column`),
        style: {
          width: k
        }
      }, E(S === 0 ? t.options : ($ = d.get(a[S - 1])) === null || $ === void 0 ? void 0 : $[i], S));
      P.push(D);
    }
    return P;
  };
  return Z(t, l.createElement("div", {
    className: tt
  }, x()));
}, gO = ie(fk, {
  Multiple: dk
}), $n = "adm-virtual-input", mk = {
  defaultValue: ""
}, yO = fe((e, t) => {
  const n = U(mk, e), [r, i] = te(n), a = j(null), o = j(null), [s, c] = K(!1), {
    locale: u
  } = pe();
  function f() {
    const p = a.current;
    if (!p || document.activeElement !== p)
      return;
    const b = o.current;
    b && (b.scrollLeft = b.clientWidth);
  }
  Se(() => {
    f();
  }, [r]), Y(() => {
    s && f();
  }, [s]), ye(t, () => ({
    focus: () => {
      var p;
      (p = a.current) === null || p === void 0 || p.focus();
    },
    blur: () => {
      var p;
      (p = a.current) === null || p === void 0 || p.blur();
    }
  }));
  function d() {
    var p;
    c(!0), (p = n.onFocus) === null || p === void 0 || p.call(n);
  }
  function m() {
    var p;
    c(!1), (p = n.onBlur) === null || p === void 0 || p.call(n);
  }
  const y = n.keyboard, v = y && l.cloneElement(y, {
    onInput: (p) => {
      var b, g;
      i(r + p), (g = (b = y.props).onInput) === null || g === void 0 || g.call(b, p);
    },
    onDelete: () => {
      var p, b;
      i(r.slice(0, -1)), (b = (p = y.props).onDelete) === null || b === void 0 || b.call(p);
    },
    visible: s,
    onClose: () => {
      var p, b, g, C;
      const h = document.activeElement;
      h && (!((p = a.current) === null || p === void 0) && p.contains(h)) ? h.blur() : (b = a.current) === null || b === void 0 || b.blur(), (C = (g = y.props).onClose) === null || C === void 0 || C.call(g);
    },
    getContainer: null
  });
  return Z(n, l.createElement("div", {
    ref: a,
    className: B($n, {
      [`${$n}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "textbox",
    onFocus: d,
    onBlur: m,
    onClick: n.onClick
  }, l.createElement("div", {
    className: `${$n}-content`,
    ref: o,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, l.createElement("div", {
    className: `${$n}-caret-container`
  }, s && l.createElement("div", {
    className: `${$n}-caret`
  }))), n.clearable && !!r && s && l.createElement("div", {
    className: `${$n}-clear`,
    onClick: (p) => {
      var b;
      p.stopPropagation(), i(""), (b = n.onClear) === null || b === void 0 || b.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, l.createElement(ao, null)), [void 0, null, ""].includes(r) && l.createElement("div", {
    className: `${$n}-placeholder`
  }, n.placeholder), v));
}), td = "adm-water-mark", hk = {
  fullPage: !0
}, bO = (e) => {
  const t = U(hk, e), {
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
    fontWeight: y = "normal",
    fontColor: v = "rgba(0,0,0,.15)",
    fontSize: p = 14,
    fontFamily: b = "sans-serif"
  } = t, [g, C] = K("");
  return Y(() => {
    const h = document.createElement("canvas"), w = window.devicePixelRatio, E = h.getContext("2d"), x = `${(r + a) * w}px`, $ = `${(i + o) * w}px`, P = a * w, S = o * w;
    if (h.setAttribute("width", x), h.setAttribute("height", $), E) {
      if (c) {
        E.translate(P / 2, S / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = new Image();
        k.crossOrigin = "anonymous", k.referrerPolicy = "no-referrer", k.onload = () => {
          E.drawImage(k, -u * w / 2, -f * w / 2, u * w, f * w), E.restore(), C(h.toDataURL());
        }, k.src = c;
      } else if (d) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(P / 2, S / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = Number(p) * w;
        E.font = `${m} normal ${y} ${k}px/${S}px ${b}`, E.fillStyle = v, Array.isArray(d) ? d.forEach((D, I) => E.fillText(D, 0, I * k)) : E.fillText(d, 0, 0), E.restore(), C(h.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, y, a, o, b, v, c, d, p]), Z(t, l.createElement("div", {
    className: B(td, {
      [`${td}-full-page`]: t.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      // Not give `url` if its empty. Which will cause 404 error.
      backgroundImage: g === "" ? void 0 : `url('${g}')`
    }
  }));
}, _n = "adm-footer", vk = {
  label: "",
  links: [],
  content: "",
  chips: []
}, wO = (e) => {
  const t = U(vk, e), {
    label: n,
    links: r,
    content: i,
    chips: a,
    onChipClick: o,
    onLinkClick: s
  } = t, c = (f, d) => {
    a != null && a.length && f.type === "link" && (o == null || o(f, d));
  }, u = (f, d, m) => {
    s && (m.preventDefault(), s(f, d));
  };
  return Z(t, l.createElement("div", {
    className: B(_n)
  }, n && l.createElement("div", {
    className: `${_n}-label`
  }, l.createElement(Rs, null, n)), !!(r != null && r.length) && l.createElement("div", {
    className: `${_n}-links`
  }, r.map((f, d) => l.createElement(l.Fragment, {
    key: d
  }, l.createElement("a", {
    href: f.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(f, d, m)
  }, f.text), d !== r.length - 1 && l.createElement(Rs, {
    direction: "vertical"
  })))), i && l.createElement("div", {
    className: `${_n}-content`
  }, i), a && a.length > 0 && l.createElement("div", {
    className: `${_n}-chips`
  }, a.map((f, d) => l.createElement("div", {
    key: d,
    onClick: () => c(f, d),
    className: B(`${_n}-chip`, {
      [`${_n}-chip-link`]: f.type === "link"
    })
  }, f.text)))));
};
export {
  Ek as ActionSheet,
  pi as AutoCenter,
  Ck as Avatar,
  Ts as Badge,
  Wt as Button,
  xk as Calendar,
  $k as CalendarPicker,
  _9 as CalendarPickerView,
  _k as CapsuleTabs,
  kk as Card,
  Fk as CascadePicker,
  Nk as CascadePickerView,
  Pk as Cascader,
  hb as CascaderView,
  o0 as CenterPopup,
  sf as CheckList,
  cf as Checkbox,
  Ak as Collapse,
  bk as ConfigProvider,
  Tk as DatePicker,
  Rk as DatePickerView,
  Mk as Dialog,
  Rs as Divider,
  L1 as DotLoading,
  Ik as Dropdown,
  Lk as Ellipsis,
  Dk as Empty,
  Vk as ErrorBlock,
  jk as FloatingBubble,
  Bk as FloatingPanel,
  wO as Footer,
  Wk as Form,
  um as Grid,
  lo as Image,
  Zk as ImageUploader,
  v$ as ImageViewer,
  Hk as IndexBar,
  zk as InfiniteScroll,
  ym as Input,
  Uk as JumboTabs,
  kt as List,
  L1 as Loading,
  Fi as Mask,
  qk as Modal,
  Kk as NavBar,
  Gk as NoticeBar,
  Yk as NumberKeyboard,
  V$ as PageIndicator,
  Xk as PasscodeInput,
  J1 as Picker,
  Eo as PickerView,
  lm as Popover,
  Pr as Popup,
  Qk as ProgressBar,
  Jk as ProgressCircle,
  eO as PullToRefresh,
  tO as Radio,
  nO as Rate,
  rO as Result,
  iO as ResultPage,
  Ar as SafeArea,
  W1 as ScrollMask,
  aO as SearchBar,
  oO as Selector,
  sO as SideBar,
  Ji as Skeleton,
  lO as Slider,
  wc as Space,
  Kl as SpinLoading,
  cO as Stepper,
  uO as Steps,
  fO as SwipeAction,
  dO as Swiper,
  mO as Switch,
  hO as TabBar,
  of as Tabs,
  vO as Tag,
  rk as TextArea,
  pO as Toast,
  gO as TreeSelect,
  yO as VirtualInput,
  bO as WaterMark,
  lw as createErrorBlock,
  Ok as reduceMotion,
  Sk as restoreMotion,
  yk as setDefaultConfig
};
