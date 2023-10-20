import * as V from "react";
import l, { useContext as ot, useRef as j, useMemo as ee, useEffect as Y, useState as K, useCallback as Ue, useLayoutEffect as sl, forwardRef as fe, useImperativeHandle as ye, memo as je, isValidElement as Vn, createContext as ll, cloneElement as Im } from "react";
import * as Lm from "react-dom";
import { unstable_batchedUpdates as Dm, createPortal as Vm, findDOMNode as jm } from "react-dom";
const gr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
gr && document.addEventListener("touchstart", () => {
}, !0);
var ga = function() {
  return ga = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, ga.apply(this, arguments);
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
function Bm(e, t) {
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
function Wm(e) {
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
function St(e, t) {
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
function Zm(e, t) {
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
const qe = "${label} is not a valid ${type}", Hm = {
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
}, Ke = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}", Um = Zm(Hm, {
  locale: "zh-CH",
  common: {
    confirm: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    loading: "\u52A0\u8F7D\u4E2D",
    close: "\u5173\u95ED"
  },
  Calendar: {
    title: "\u65E5\u671F\u9009\u62E9",
    confirm: "\u786E\u8BA4",
    start: "\u5F00\u59CB",
    end: "\u7ED3\u675F",
    today: "\u4ECA\u65E5",
    markItems: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"],
    yearAndMonth: "${year}\u5E74${month}\u6708"
  },
  Cascader: {
    placeholder: "\u8BF7\u9009\u62E9"
  },
  Dialog: {
    ok: "\u6211\u77E5\u9053\u4E86"
  },
  DatePicker: {
    tillNow: "\u81F3\u4ECA"
  },
  ErrorBlock: {
    default: {
      title: "\u9875\u9762\u9047\u5230\u4E00\u4E9B\u5C0F\u95EE\u9898",
      description: "\u5F85\u4F1A\u6765\u8BD5\u8BD5"
    },
    busy: {
      title: "\u524D\u65B9\u62E5\u5835",
      description: "\u5237\u65B0\u8BD5\u8BD5"
    },
    disconnected: {
      title: "\u7F51\u7EDC\u6709\u70B9\u5FD9",
      description: "\u52A8\u52A8\u624B\u6307\u5E2E\u5FD9\u4FEE\u590D"
    },
    empty: {
      title: "\u6CA1\u6709\u627E\u5230\u4F60\u9700\u8981\u7684\u4E1C\u897F",
      description: "\u627E\u627E\u5176\u4ED6\u7684\u5427"
    }
  },
  Form: {
    required: "\u5FC5\u586B",
    optional: "\u9009\u586B",
    defaultValidateMessages: {
      default: "\u5B57\u6BB5\u9A8C\u8BC1\u9519\u8BEF${label}",
      required: "\u8BF7\u8F93\u5165${label}",
      enum: "${label}\u5FC5\u987B\u662F\u5176\u4E2D\u4E00\u4E2A[${enum}]",
      whitespace: "${label}\u4E0D\u80FD\u4E3A\u7A7A\u5B57\u7B26",
      date: {
        format: "${label}\u65E5\u671F\u683C\u5F0F\u65E0\u6548",
        parse: "${label}\u4E0D\u80FD\u8F6C\u6362\u4E3A\u65E5\u671F",
        invalid: "${label}\u662F\u4E00\u4E2A\u65E0\u6548\u65E5\u671F"
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
        len: "${label}\u987B\u4E3A${len}\u4E2A\u5B57\u7B26",
        min: "${label}\u6700\u5C11${min}\u4E2A\u5B57\u7B26",
        max: "${label}\u6700\u591A${max}\u4E2A\u5B57\u7B26",
        range: "${label}\u987B\u5728${min}-${max}\u5B57\u7B26\u4E4B\u95F4"
      },
      number: {
        len: "${label}\u5FC5\u987B\u7B49\u4E8E${len}",
        min: "${label}\u6700\u5C0F\u503C\u4E3A${min}",
        max: "${label}\u6700\u5927\u503C\u4E3A${max}",
        range: "${label}\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      array: {
        len: "\u987B\u4E3A${len}\u4E2A${label}",
        min: "\u6700\u5C11${min}\u4E2A${label}",
        max: "\u6700\u591A${max}\u4E2A${label}",
        range: "${label}\u6570\u91CF\u987B\u5728${min}-${max}\u4E4B\u95F4"
      },
      pattern: {
        mismatch: "${label}\u4E0E\u6A21\u5F0F\u4E0D\u5339\u914D${pattern}"
      }
    }
  },
  ImageUploader: {
    uploading: "\u4E0A\u4F20\u4E2D...",
    upload: "\u4E0A\u4F20"
  },
  InfiniteScroll: {
    noMore: "\u6CA1\u6709\u66F4\u591A\u4E86",
    failedToLoad: "\u52A0\u8F7D\u5931\u8D25",
    retry: "\u91CD\u65B0\u52A0\u8F7D"
  },
  Input: {
    clear: "\u6E05\u9664"
  },
  Mask: {
    name: "\u80CC\u666F\u8499\u5C42"
  },
  Modal: {
    ok: "\u6211\u77E5\u9053\u4E86"
  },
  PasscodeInput: {
    name: "\u5BC6\u7801\u8F93\u5165\u6846"
  },
  PullToRefresh: {
    pulling: "\u4E0B\u62C9\u5237\u65B0",
    canRelease: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
    complete: "\u5237\u65B0\u6210\u529F"
  },
  SearchBar: {
    name: "\u641C\u7D22\u6846"
  },
  Slider: {
    name: "\u6ED1\u52A8\u8F93\u5165\u6761"
  },
  Stepper: {
    decrease: "\u51CF\u5C11",
    increase: "\u589E\u52A0"
  },
  Switch: {
    name: "\u5F00\u5173"
  },
  Selector: {
    name: "\u9009\u62E9\u7EC4"
  }
}), zm = Um, rd = {
  current: {
    locale: zm
  }
};
function Wk(e) {
  rd.current = e;
}
function $i() {
  return rd.current;
}
const id = l.createContext(null), qm = (e) => {
  const {
    children: t
  } = e, n = yr(e, ["children"]), r = ge();
  return l.createElement(id.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, t);
};
function ge() {
  var e;
  return (e = ot(id)) !== null && e !== void 0 ? e : $i();
}
const Zk = qm;
function ie(e, t) {
  const n = e;
  for (const r in t)
    t.hasOwnProperty(r) && (n[r] = t[r]);
  return n;
}
var pt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ad = { exports: {} };
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
        if (!!a) {
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
})(ad);
const B = ad.exports;
function Z(e, t) {
  const n = Object.assign({}, t.props);
  e.className && (n.className = B(t.props.className, e.className)), e.style && (n.style = Object.assign(Object.assign({}, n.style), e.style)), e.tabIndex !== void 0 && (n.tabIndex = e.tabIndex);
  for (const r in e)
    !e.hasOwnProperty(r) || (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = e[r]);
  return l.cloneElement(t, n);
}
var Km = typeof pt == "object" && pt && pt.Object === Object && pt, od = Km, Gm = od, Ym = typeof self == "object" && self && self.Object === Object && self, Xm = Gm || Ym || Function("return this")(), bt = Xm, Qm = bt, Jm = Qm.Symbol, ul = Jm, Fc = ul, sd = Object.prototype, eh = sd.hasOwnProperty, th = sd.toString, Ir = Fc ? Fc.toStringTag : void 0;
function nh(e) {
  var t = eh.call(e, Ir), n = e[Ir];
  try {
    e[Ir] = void 0;
    var r = !0;
  } catch {
  }
  var i = th.call(e);
  return r && (t ? e[Ir] = n : delete e[Ir]), i;
}
var rh = nh, ih = Object.prototype, ah = ih.toString;
function oh(e) {
  return ah.call(e);
}
var sh = oh, Pc = ul, lh = rh, ch = sh, uh = "[object Null]", fh = "[object Undefined]", Nc = Pc ? Pc.toStringTag : void 0;
function dh(e) {
  return e == null ? e === void 0 ? fh : uh : Nc && Nc in Object(e) ? lh(e) : ch(e);
}
var br = dh;
function mh(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Pt = mh, hh = br, vh = Pt, ph = "[object AsyncFunction]", gh = "[object Function]", yh = "[object GeneratorFunction]", bh = "[object Proxy]";
function wh(e) {
  if (!vh(e))
    return !1;
  var t = hh(e);
  return t == gh || t == yh || t == ph || t == bh;
}
var fl = wh, Eh = bt, Ch = Eh["__core-js_shared__"], xh = Ch, Lo = xh, Ac = function() {
  var e = /[^.]+$/.exec(Lo && Lo.keys && Lo.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function $h(e) {
  return !!Ac && Ac in e;
}
var _h = $h, kh = Function.prototype, Sh = kh.toString;
function Oh(e) {
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
var ld = Oh, Fh = fl, Ph = _h, Nh = Pt, Ah = ld, Th = /[\\^$.*+?()[\]{}|]/g, Rh = /^\[object .+?Constructor\]$/, Mh = Function.prototype, Ih = Object.prototype, Lh = Mh.toString, Dh = Ih.hasOwnProperty, Vh = RegExp(
  "^" + Lh.call(Dh).replace(Th, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function jh(e) {
  if (!Nh(e) || Ph(e))
    return !1;
  var t = Fh(e) ? Vh : Rh;
  return t.test(Ah(e));
}
var Bh = jh;
function Wh(e, t) {
  return e == null ? void 0 : e[t];
}
var Zh = Wh, Hh = Bh, Uh = Zh;
function zh(e, t) {
  var n = Uh(e, t);
  return Hh(n) ? n : void 0;
}
var jn = zh, qh = jn, Kh = function() {
  try {
    var e = qh(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), cd = Kh, Tc = cd;
function Gh(e, t, n) {
  t == "__proto__" && Tc ? Tc(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var dl = Gh;
function Yh(e, t) {
  return e === t || e !== e && t !== t;
}
var _i = Yh, Xh = dl, Qh = _i, Jh = Object.prototype, e2 = Jh.hasOwnProperty;
function t2(e, t, n) {
  var r = e[t];
  (!(e2.call(e, t) && Qh(r, n)) || n === void 0 && !(t in e)) && Xh(e, t, n);
}
var n2 = t2, r2 = n2, i2 = dl;
function a2(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), i ? i2(n, s, c) : r2(n, s, c);
  }
  return n;
}
var ud = a2;
function o2(e) {
  return e;
}
var fd = o2;
function s2(e, t, n) {
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
var l2 = s2, c2 = l2, Rc = Math.max;
function u2(e, t, n) {
  return t = Rc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, i = -1, a = Rc(r.length - t, 0), o = Array(a); ++i < a; )
      o[i] = r[t + i];
    i = -1;
    for (var s = Array(t + 1); ++i < t; )
      s[i] = r[i];
    return s[t] = n(o), c2(e, this, s);
  };
}
var f2 = u2;
function d2(e) {
  return function() {
    return e;
  };
}
var m2 = d2, h2 = m2, Mc = cd, v2 = fd, p2 = Mc ? function(e, t) {
  return Mc(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: h2(t),
    writable: !0
  });
} : v2, g2 = p2, y2 = 800, b2 = 16, w2 = Date.now;
function E2(e) {
  var t = 0, n = 0;
  return function() {
    var r = w2(), i = b2 - (r - n);
    if (n = r, i > 0) {
      if (++t >= y2)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var C2 = E2, x2 = g2, $2 = C2, _2 = $2(x2), k2 = _2, S2 = fd, O2 = f2, F2 = k2;
function P2(e, t) {
  return F2(O2(e, t, S2), e + "");
}
var N2 = P2, A2 = 9007199254740991;
function T2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= A2;
}
var dd = T2, R2 = fl, M2 = dd;
function I2(e) {
  return e != null && M2(e.length) && !R2(e);
}
var ja = I2, L2 = 9007199254740991, D2 = /^(?:0|[1-9]\d*)$/;
function V2(e, t) {
  var n = typeof e;
  return t = t == null ? L2 : t, !!t && (n == "number" || n != "symbol" && D2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var md = V2, j2 = _i, B2 = ja, W2 = md, Z2 = Pt;
function H2(e, t, n) {
  if (!Z2(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? B2(n) && W2(t, n.length) : r == "string" && t in n) ? j2(n[t], e) : !1;
}
var U2 = H2, z2 = N2, q2 = U2;
function K2(e) {
  return z2(function(t, n) {
    var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && q2(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i; ) {
      var s = n[r];
      s && e(t, s, r, a);
    }
    return t;
  });
}
var hd = K2;
function G2(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Y2 = G2;
function X2(e) {
  return e != null && typeof e == "object";
}
var Bn = X2, Q2 = br, J2 = Bn, ev = "[object Arguments]";
function tv(e) {
  return J2(e) && Q2(e) == ev;
}
var nv = tv, Ic = nv, rv = Bn, vd = Object.prototype, iv = vd.hasOwnProperty, av = vd.propertyIsEnumerable, ov = Ic(function() {
  return arguments;
}()) ? Ic : function(e) {
  return rv(e) && iv.call(e, "callee") && !av.call(e, "callee");
}, pd = ov, sv = Array.isArray, Ba = sv, ci = { exports: {} };
function lv() {
  return !1;
}
var cv = lv;
(function(e, t) {
  var n = bt, r = cv, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  e.exports = u;
})(ci, ci.exports);
var uv = br, fv = dd, dv = Bn, mv = "[object Arguments]", hv = "[object Array]", vv = "[object Boolean]", pv = "[object Date]", gv = "[object Error]", yv = "[object Function]", bv = "[object Map]", wv = "[object Number]", Ev = "[object Object]", Cv = "[object RegExp]", xv = "[object Set]", $v = "[object String]", _v = "[object WeakMap]", kv = "[object ArrayBuffer]", Sv = "[object DataView]", Ov = "[object Float32Array]", Fv = "[object Float64Array]", Pv = "[object Int8Array]", Nv = "[object Int16Array]", Av = "[object Int32Array]", Tv = "[object Uint8Array]", Rv = "[object Uint8ClampedArray]", Mv = "[object Uint16Array]", Iv = "[object Uint32Array]", pe = {};
pe[Ov] = pe[Fv] = pe[Pv] = pe[Nv] = pe[Av] = pe[Tv] = pe[Rv] = pe[Mv] = pe[Iv] = !0;
pe[mv] = pe[hv] = pe[kv] = pe[vv] = pe[Sv] = pe[pv] = pe[gv] = pe[yv] = pe[bv] = pe[wv] = pe[Ev] = pe[Cv] = pe[xv] = pe[$v] = pe[_v] = !1;
function Lv(e) {
  return dv(e) && fv(e.length) && !!pe[uv(e)];
}
var Dv = Lv;
function Vv(e) {
  return function(t) {
    return e(t);
  };
}
var jv = Vv, ds = { exports: {} };
(function(e, t) {
  var n = od, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(ds, ds.exports);
var Bv = Dv, Wv = jv, Lc = ds.exports, Dc = Lc && Lc.isTypedArray, Zv = Dc ? Wv(Dc) : Bv, ml = Zv, Hv = Y2, Uv = pd, zv = Ba, qv = ci.exports, Kv = md, Gv = ml, Yv = Object.prototype, Xv = Yv.hasOwnProperty;
function Qv(e, t) {
  var n = zv(e), r = !n && Uv(e), i = !n && !r && qv(e), a = !n && !r && !i && Gv(e), o = n || r || i || a, s = o ? Hv(e.length, String) : [], c = s.length;
  for (var u in e)
    (t || Xv.call(e, u)) && !(o && (u == "length" || i && (u == "offset" || u == "parent") || a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Kv(u, c))) && s.push(u);
  return s;
}
var gd = Qv, Jv = Object.prototype;
function ep(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Jv;
  return e === n;
}
var hl = ep;
function tp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var yd = tp, np = yd, rp = np(Object.keys, Object), ip = rp, ap = hl, op = ip, sp = Object.prototype, lp = sp.hasOwnProperty;
function cp(e) {
  if (!ap(e))
    return op(e);
  var t = [];
  for (var n in Object(e))
    lp.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var up = cp, fp = gd, dp = up, mp = ja;
function hp(e) {
  return mp(e) ? fp(e) : dp(e);
}
var bd = hp, vp = ud, pp = hd, gp = bd, yp = pp(function(e, t, n, r) {
  vp(t, gp(t), e, r);
}), bp = yp;
function z(...e) {
  function t(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, e[0]);
  for (let r = 1; r < e.length; r++)
    n = bp(n, e[r], t);
  return n;
}
var wd = function(e) {
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
}, wp = function(e) {
  return typeof e == "number";
}, Ep = !1;
const ki = Ep;
function Ut(e) {
  ki && (wr(e) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));
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
const vl = wd(Y);
function Vc(e, t) {
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
var Cp = function(e) {
  ki && (wr(e) || console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));
  var t = Wa(e);
  Y(function() {
    return function() {
      t.current();
    };
  }, []);
};
const Si = Cp;
var xp = bt, $p = function() {
  return xp.Date.now();
}, _p = $p, kp = /\s/;
function Sp(e) {
  for (var t = e.length; t-- && kp.test(e.charAt(t)); )
    ;
  return t;
}
var Op = Sp, Fp = Op, Pp = /^\s+/;
function Np(e) {
  return e && e.slice(0, Fp(e) + 1).replace(Pp, "");
}
var Ap = Np, Tp = br, Rp = Bn, Mp = "[object Symbol]";
function Ip(e) {
  return typeof e == "symbol" || Rp(e) && Tp(e) == Mp;
}
var Lp = Ip, Dp = Ap, jc = Pt, Vp = Lp, Bc = 0 / 0, jp = /^[-+]0x[0-9a-f]+$/i, Bp = /^0b[01]+$/i, Wp = /^0o[0-7]+$/i, Zp = parseInt;
function Hp(e) {
  if (typeof e == "number")
    return e;
  if (Vp(e))
    return Bc;
  if (jc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = jc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Dp(e);
  var n = Bp.test(e);
  return n || Wp.test(e) ? Zp(e.slice(2), n ? 2 : 8) : jp.test(e) ? Bc : +e;
}
var Up = Hp, zp = Pt, Do = _p, Wc = Up, qp = "Expected a function", Kp = Math.max, Gp = Math.min;
function Yp(e, t, n) {
  var r, i, a, o, s, c, u = 0, f = !1, d = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(qp);
  t = Wc(t) || 0, zp(n) && (f = !!n.leading, d = "maxWait" in n, a = d ? Kp(Wc(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function y(C) {
    var $ = r, A = i;
    return r = i = void 0, u = C, o = e.apply(A, $), o;
  }
  function p(C) {
    return u = C, s = setTimeout(b, t), f ? y(C) : o;
  }
  function h(C) {
    var $ = C - c, A = C - u, O = t - $;
    return d ? Gp(O, a - A) : O;
  }
  function g(C) {
    var $ = C - c, A = C - u;
    return c === void 0 || $ >= t || $ < 0 || d && A >= a;
  }
  function b() {
    var C = Do();
    if (g(C))
      return x(C);
    s = setTimeout(b, h(C));
  }
  function x(C) {
    return s = void 0, m && r ? y(C) : (r = i = void 0, o);
  }
  function v() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function w() {
    return s === void 0 ? o : x(Do());
  }
  function E() {
    var C = Do(), $ = g(C);
    if (r = arguments, i = this, c = C, $) {
      if (s === void 0)
        return p(c);
      if (d)
        return clearTimeout(s), s = setTimeout(b, t), y(c);
    }
    return s === void 0 && (s = setTimeout(b, t)), o;
  }
  return E.cancel = v, E.flush = w, E;
}
var Ed = Yp, Xp = !!(typeof window < "u" && window.document && window.document.createElement);
const pl = Xp;
var Qp = Ed, Jp = Pt, e3 = "Expected a function";
function t3(e, t, n) {
  var r = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(e3);
  return Jp(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Qp(e, t, {
    leading: r,
    maxWait: t,
    trailing: i
  });
}
var n3 = t3, r3 = function(e) {
  ki && (wr(e) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e, '".'))), Y(function() {
    e == null || e();
  }, []);
};
const i3 = r3;
var a3 = function() {
  var e = St(K({}), 2), t = e[1];
  return Ue(function() {
    return t({});
  }, []);
};
const Cd = a3;
function sn(e, t) {
  if (!!pl) {
    if (!e)
      return t;
    var n;
    return wr(e) ? n = e() : "current" in e ? n = e.current : n = e, n;
  }
}
var o3 = function(e) {
  return e.every(function(t) {
    var n = sn(t);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, s3 = function(e) {
  return e ? e.getRootNode() : document;
}, l3 = function(e) {
  if (!e || !document.getRootNode)
    return document;
  var t = Array.isArray(e) ? e : [e];
  return o3(t) ? s3(sn(t[0])) : document;
};
const c3 = l3;
var u3 = function(e) {
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
      (d.length !== o.current.length || !Vc(d, o.current) || !Vc(r, s.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = d, s.current = r, c.current = n());
    }), Si(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return t;
};
const xd = u3;
var f3 = xd(Y);
const gl = f3;
function $d(e, t, n) {
  n === void 0 && (n = "click");
  var r = Wa(e);
  gl(function() {
    var i = function(s) {
      var c = Array.isArray(t) ? t : [t];
      c.some(function(u) {
        var f = sn(u);
        return !f || f.contains(s.target);
      }) || r.current(s);
    }, a = c3(t), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(s) {
      return a.addEventListener(s, i);
    }), function() {
      o.forEach(function(s) {
        return a.removeEventListener(s, i);
      });
    };
  }, Array.isArray(n) ? n : [n], t);
}
var _d = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(pt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", f = "week", d = "month", m = "quarter", y = "year", p = "date", h = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, b = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, x = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(T) {
      var _ = ["th", "st", "nd", "rd"], R = T % 100;
      return "[" + T + (_[(R - 20) % 10] || _[R] || _[0]) + "]";
    } }, v = function(T, _, R) {
      var N = String(T);
      return !N || N.length >= _ ? T : "" + Array(_ + 1 - N.length).join(R) + T;
    }, w = { s: v, z: function(T) {
      var _ = -T.utcOffset(), R = Math.abs(_), N = Math.floor(R / 60), S = R % 60;
      return (_ <= 0 ? "+" : "-") + v(N, 2, "0") + ":" + v(S, 2, "0");
    }, m: function T(_, R) {
      if (_.date() < R.date())
        return -T(R, _);
      var N = 12 * (R.year() - _.year()) + (R.month() - _.month()), S = _.clone().add(N, d), M = R - S < 0, P = _.clone().add(N + (M ? -1 : 1), d);
      return +(-(N + (R - S) / (M ? S - P : P - S)) || 0);
    }, a: function(T) {
      return T < 0 ? Math.ceil(T) || 0 : Math.floor(T);
    }, p: function(T) {
      return { M: d, y, w: f, d: u, D: p, h: c, m: s, s: o, ms: a, Q: m }[T] || String(T || "").toLowerCase().replace(/s$/, "");
    }, u: function(T) {
      return T === void 0;
    } }, E = "en", C = {};
    C[E] = x;
    var $ = function(T) {
      return T instanceof D;
    }, A = function T(_, R, N) {
      var S;
      if (!_)
        return E;
      if (typeof _ == "string") {
        var M = _.toLowerCase();
        C[M] && (S = M), R && (C[M] = R, S = M);
        var P = _.split("-");
        if (!S && P.length > 1)
          return T(P[0]);
      } else {
        var F = _.name;
        C[F] = _, S = F;
      }
      return !N && S && (E = S), S || !N && E;
    }, O = function(T, _) {
      if ($(T))
        return T.clone();
      var R = typeof _ == "object" ? _ : {};
      return R.date = T, R.args = arguments, new D(R);
    }, k = w;
    k.l = A, k.i = $, k.w = function(T, _) {
      return O(T, { locale: _.$L, utc: _.$u, x: _.$x, $offset: _.$offset });
    };
    var D = function() {
      function T(R) {
        this.$L = A(R.locale, null, !0), this.parse(R);
      }
      var _ = T.prototype;
      return _.parse = function(R) {
        this.$d = function(N) {
          var S = N.date, M = N.utc;
          if (S === null)
            return new Date(NaN);
          if (k.u(S))
            return new Date();
          if (S instanceof Date)
            return new Date(S);
          if (typeof S == "string" && !/Z$/i.test(S)) {
            var P = S.match(g);
            if (P) {
              var F = P[2] - 1 || 0, L = (P[7] || "0").substring(0, 3);
              return M ? new Date(Date.UTC(P[1], F, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, L)) : new Date(P[1], F, P[3] || 1, P[4] || 0, P[5] || 0, P[6] || 0, L);
            }
          }
          return new Date(S);
        }(R), this.$x = R.x || {}, this.init();
      }, _.init = function() {
        var R = this.$d;
        this.$y = R.getFullYear(), this.$M = R.getMonth(), this.$D = R.getDate(), this.$W = R.getDay(), this.$H = R.getHours(), this.$m = R.getMinutes(), this.$s = R.getSeconds(), this.$ms = R.getMilliseconds();
      }, _.$utils = function() {
        return k;
      }, _.isValid = function() {
        return this.$d.toString() !== h;
      }, _.isSame = function(R, N) {
        var S = O(R);
        return this.startOf(N) <= S && S <= this.endOf(N);
      }, _.isAfter = function(R, N) {
        return O(R) < this.startOf(N);
      }, _.isBefore = function(R, N) {
        return this.endOf(N) < O(R);
      }, _.$g = function(R, N, S) {
        return k.u(R) ? this[N] : this.set(S, R);
      }, _.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, _.valueOf = function() {
        return this.$d.getTime();
      }, _.startOf = function(R, N) {
        var S = this, M = !!k.u(N) || N, P = k.p(R), F = function(Ee, le) {
          var ft = k.w(S.$u ? Date.UTC(S.$y, le, Ee) : new Date(S.$y, le, Ee), S);
          return M ? ft : ft.endOf(u);
        }, L = function(Ee, le) {
          return k.w(S.toDate()[Ee].apply(S.toDate("s"), (M ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(le)), S);
        }, W = this.$W, U = this.$M, q = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (P) {
          case y:
            return M ? F(1, 0) : F(31, 11);
          case d:
            return M ? F(1, U) : F(0, U + 1);
          case f:
            var ae = this.$locale().weekStart || 0, de = (W < ae ? W + 7 : W) - ae;
            return F(M ? q - de : q + (6 - de), U);
          case u:
          case p:
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
        var S, M = k.p(R), P = "set" + (this.$u ? "UTC" : ""), F = (S = {}, S[u] = P + "Date", S[p] = P + "Date", S[d] = P + "Month", S[y] = P + "FullYear", S[c] = P + "Hours", S[s] = P + "Minutes", S[o] = P + "Seconds", S[a] = P + "Milliseconds", S)[M], L = M === u ? this.$D + (N - this.$W) : N;
        if (M === d || M === y) {
          var W = this.clone().set(p, 1);
          W.$d[F](L), W.init(), this.$d = W.set(p, Math.min(this.$D, W.daysInMonth())).$d;
        } else
          F && this.$d[F](L);
        return this.init(), this;
      }, _.set = function(R, N) {
        return this.clone().$set(R, N);
      }, _.get = function(R) {
        return this[k.p(R)]();
      }, _.add = function(R, N) {
        var S, M = this;
        R = Number(R);
        var P = k.p(N), F = function(U) {
          var q = O(M);
          return k.w(q.date(q.date() + Math.round(U * R)), M);
        };
        if (P === d)
          return this.set(d, this.$M + R);
        if (P === y)
          return this.set(y, this.$y + R);
        if (P === u)
          return F(1);
        if (P === f)
          return F(7);
        var L = (S = {}, S[s] = r, S[c] = i, S[o] = n, S)[P] || 1, W = this.$d.getTime() + R * L;
        return k.w(W, this);
      }, _.subtract = function(R, N) {
        return this.add(-1 * R, N);
      }, _.format = function(R) {
        var N = this, S = this.$locale();
        if (!this.isValid())
          return S.invalidDate || h;
        var M = R || "YYYY-MM-DDTHH:mm:ssZ", P = k.z(this), F = this.$H, L = this.$m, W = this.$M, U = S.weekdays, q = S.months, G = S.meridiem, ae = function(le, ft, Le, be) {
          return le && (le[ft] || le(N, M)) || Le[ft].slice(0, be);
        }, de = function(le) {
          return k.s(F % 12 || 12, le, "0");
        }, Ee = G || function(le, ft, Le) {
          var be = le < 12 ? "AM" : "PM";
          return Le ? be.toLowerCase() : be;
        };
        return M.replace(b, function(le, ft) {
          return ft || function(Le) {
            switch (Le) {
              case "YY":
                return String(N.$y).slice(-2);
              case "YYYY":
                return k.s(N.$y, 4, "0");
              case "M":
                return W + 1;
              case "MM":
                return k.s(W + 1, 2, "0");
              case "MMM":
                return ae(S.monthsShort, W, q, 3);
              case "MMMM":
                return ae(q, W);
              case "D":
                return N.$D;
              case "DD":
                return k.s(N.$D, 2, "0");
              case "d":
                return String(N.$W);
              case "dd":
                return ae(S.weekdaysMin, N.$W, U, 2);
              case "ddd":
                return ae(S.weekdaysShort, N.$W, U, 3);
              case "dddd":
                return U[N.$W];
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
                return P;
            }
            return null;
          }(le) || P.replace(":", "");
        });
      }, _.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, _.diff = function(R, N, S) {
        var M, P = this, F = k.p(N), L = O(R), W = (L.utcOffset() - this.utcOffset()) * r, U = this - L, q = function() {
          return k.m(P, L);
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
            M = (U - W) / 6048e5;
            break;
          case u:
            M = (U - W) / 864e5;
            break;
          case c:
            M = U / i;
            break;
          case s:
            M = U / r;
            break;
          case o:
            M = U / n;
            break;
          default:
            M = U;
        }
        return S ? M : k.a(M);
      }, _.daysInMonth = function() {
        return this.endOf(d).$D;
      }, _.$locale = function() {
        return C[this.$L];
      }, _.locale = function(R, N) {
        if (!R)
          return this.$L;
        var S = this.clone(), M = A(R, N, !0);
        return M && (S.$L = M), S;
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
    return O.prototype = I, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", d], ["$y", y], ["$D", p]].forEach(function(T) {
      I[T[1]] = function(_) {
        return this.$g(_, T[0], T[1]);
      };
    }), O.extend = function(T, _) {
      return T.$i || (T(_, D, O), T.$i = !0), O;
    }, O.locale = A, O.isDayjs = $, O.unix = function(T) {
      return O(1e3 * T);
    }, O.en = C[E], O.Ls = C, O.p = {}, O;
  });
})(_d);
const me = _d.exports;
function d3(e, t) {
  var n;
  ki && (wr(e) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));
  var r = Wa(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = ee(function() {
    return Ed(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, cl([], St(o), !1));
    }, i, t);
  }, []);
  return Si(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function m3(e, t, n) {
  var r = St(K({}), 2), i = r[0], a = r[1], o = d3(function() {
    a({});
  }, n).run;
  Y(function() {
    return o();
  }, t), vl(e, [i]);
}
function h3() {
  this.__data__ = [], this.size = 0;
}
var v3 = h3, p3 = _i;
function g3(e, t) {
  for (var n = e.length; n--; )
    if (p3(e[n][0], t))
      return n;
  return -1;
}
var Za = g3, y3 = Za, b3 = Array.prototype, w3 = b3.splice;
function E3(e) {
  var t = this.__data__, n = y3(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : w3.call(t, n, 1), --this.size, !0;
}
var C3 = E3, x3 = Za;
function $3(e) {
  var t = this.__data__, n = x3(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var _3 = $3, k3 = Za;
function S3(e) {
  return k3(this.__data__, e) > -1;
}
var O3 = S3, F3 = Za;
function P3(e, t) {
  var n = this.__data__, r = F3(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var N3 = P3, A3 = v3, T3 = C3, R3 = _3, M3 = O3, I3 = N3;
function Er(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Er.prototype.clear = A3;
Er.prototype.delete = T3;
Er.prototype.get = R3;
Er.prototype.has = M3;
Er.prototype.set = I3;
var Ha = Er, L3 = Ha;
function D3() {
  this.__data__ = new L3(), this.size = 0;
}
var V3 = D3;
function j3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var B3 = j3;
function W3(e) {
  return this.__data__.get(e);
}
var Z3 = W3;
function H3(e) {
  return this.__data__.has(e);
}
var U3 = H3, z3 = jn, q3 = bt, K3 = z3(q3, "Map"), yl = K3, G3 = jn, Y3 = G3(Object, "create"), Ua = Y3, Zc = Ua;
function X3() {
  this.__data__ = Zc ? Zc(null) : {}, this.size = 0;
}
var Q3 = X3;
function J3(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var eg = J3, tg = Ua, ng = "__lodash_hash_undefined__", rg = Object.prototype, ig = rg.hasOwnProperty;
function ag(e) {
  var t = this.__data__;
  if (tg) {
    var n = t[e];
    return n === ng ? void 0 : n;
  }
  return ig.call(t, e) ? t[e] : void 0;
}
var og = ag, sg = Ua, lg = Object.prototype, cg = lg.hasOwnProperty;
function ug(e) {
  var t = this.__data__;
  return sg ? t[e] !== void 0 : cg.call(t, e);
}
var fg = ug, dg = Ua, mg = "__lodash_hash_undefined__";
function hg(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = dg && t === void 0 ? mg : t, this;
}
var vg = hg, pg = Q3, gg = eg, yg = og, bg = fg, wg = vg;
function Cr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Cr.prototype.clear = pg;
Cr.prototype.delete = gg;
Cr.prototype.get = yg;
Cr.prototype.has = bg;
Cr.prototype.set = wg;
var Eg = Cr, Hc = Eg, Cg = Ha, xg = yl;
function $g() {
  this.size = 0, this.__data__ = {
    hash: new Hc(),
    map: new (xg || Cg)(),
    string: new Hc()
  };
}
var _g = $g;
function kg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Sg = kg, Og = Sg;
function Fg(e, t) {
  var n = e.__data__;
  return Og(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var za = Fg, Pg = za;
function Ng(e) {
  var t = Pg(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Ag = Ng, Tg = za;
function Rg(e) {
  return Tg(this, e).get(e);
}
var Mg = Rg, Ig = za;
function Lg(e) {
  return Ig(this, e).has(e);
}
var Dg = Lg, Vg = za;
function jg(e, t) {
  var n = Vg(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var Bg = jg, Wg = _g, Zg = Ag, Hg = Mg, Ug = Dg, zg = Bg;
function xr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xr.prototype.clear = Wg;
xr.prototype.delete = Zg;
xr.prototype.get = Hg;
xr.prototype.has = Ug;
xr.prototype.set = zg;
var bl = xr, qg = Ha, Kg = yl, Gg = bl, Yg = 200;
function Xg(e, t) {
  var n = this.__data__;
  if (n instanceof qg) {
    var r = n.__data__;
    if (!Kg || r.length < Yg - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Gg(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var Qg = Xg, Jg = Ha, e4 = V3, t4 = B3, n4 = Z3, r4 = U3, i4 = Qg;
function $r(e) {
  var t = this.__data__ = new Jg(e);
  this.size = t.size;
}
$r.prototype.clear = e4;
$r.prototype.delete = t4;
$r.prototype.get = n4;
$r.prototype.has = r4;
$r.prototype.set = i4;
var kd = $r, a4 = "__lodash_hash_undefined__";
function o4(e) {
  return this.__data__.set(e, a4), this;
}
var s4 = o4;
function l4(e) {
  return this.__data__.has(e);
}
var c4 = l4, u4 = bl, f4 = s4, d4 = c4;
function ya(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new u4(); ++t < n; )
    this.add(e[t]);
}
ya.prototype.add = ya.prototype.push = f4;
ya.prototype.has = d4;
var m4 = ya;
function h4(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var v4 = h4;
function p4(e, t) {
  return e.has(t);
}
var g4 = p4, y4 = m4, b4 = v4, w4 = g4, E4 = 1, C4 = 2;
function x4(e, t, n, r, i, a) {
  var o = n & E4, s = e.length, c = t.length;
  if (s != c && !(o && c > s))
    return !1;
  var u = a.get(e), f = a.get(t);
  if (u && f)
    return u == t && f == e;
  var d = -1, m = !0, y = n & C4 ? new y4() : void 0;
  for (a.set(e, t), a.set(t, e); ++d < s; ) {
    var p = e[d], h = t[d];
    if (r)
      var g = o ? r(h, p, d, t, e, a) : r(p, h, d, e, t, a);
    if (g !== void 0) {
      if (g)
        continue;
      m = !1;
      break;
    }
    if (y) {
      if (!b4(t, function(b, x) {
        if (!w4(y, x) && (p === b || i(p, b, n, r, a)))
          return y.push(x);
      })) {
        m = !1;
        break;
      }
    } else if (!(p === h || i(p, h, n, r, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var Sd = x4, $4 = bt, _4 = $4.Uint8Array, Od = _4;
function k4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, i) {
    n[++t] = [i, r];
  }), n;
}
var S4 = k4;
function O4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var F4 = O4, Uc = ul, zc = Od, P4 = _i, N4 = Sd, A4 = S4, T4 = F4, R4 = 1, M4 = 2, I4 = "[object Boolean]", L4 = "[object Date]", D4 = "[object Error]", V4 = "[object Map]", j4 = "[object Number]", B4 = "[object RegExp]", W4 = "[object Set]", Z4 = "[object String]", H4 = "[object Symbol]", U4 = "[object ArrayBuffer]", z4 = "[object DataView]", qc = Uc ? Uc.prototype : void 0, Vo = qc ? qc.valueOf : void 0;
function q4(e, t, n, r, i, a, o) {
  switch (n) {
    case z4:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case U4:
      return !(e.byteLength != t.byteLength || !a(new zc(e), new zc(t)));
    case I4:
    case L4:
    case j4:
      return P4(+e, +t);
    case D4:
      return e.name == t.name && e.message == t.message;
    case B4:
    case Z4:
      return e == t + "";
    case V4:
      var s = A4;
    case W4:
      var c = r & R4;
      if (s || (s = T4), e.size != t.size && !c)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      r |= M4, o.set(e, t);
      var f = N4(s(e), s(t), r, i, a, o);
      return o.delete(e), f;
    case H4:
      if (Vo)
        return Vo.call(e) == Vo.call(t);
  }
  return !1;
}
var K4 = q4;
function G4(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var Y4 = G4, X4 = Y4, Q4 = Ba;
function J4(e, t, n) {
  var r = t(e);
  return Q4(e) ? r : X4(r, n(e));
}
var e5 = J4;
function t5(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
var n5 = t5;
function r5() {
  return [];
}
var i5 = r5, a5 = n5, o5 = i5, s5 = Object.prototype, l5 = s5.propertyIsEnumerable, Kc = Object.getOwnPropertySymbols, c5 = Kc ? function(e) {
  return e == null ? [] : (e = Object(e), a5(Kc(e), function(t) {
    return l5.call(e, t);
  }));
} : o5, u5 = c5, f5 = e5, d5 = u5, m5 = bd;
function h5(e) {
  return f5(e, m5, d5);
}
var v5 = h5, Gc = v5, p5 = 1, g5 = Object.prototype, y5 = g5.hasOwnProperty;
function b5(e, t, n, r, i, a) {
  var o = n & p5, s = Gc(e), c = s.length, u = Gc(t), f = u.length;
  if (c != f && !o)
    return !1;
  for (var d = c; d--; ) {
    var m = s[d];
    if (!(o ? m in t : y5.call(t, m)))
      return !1;
  }
  var y = a.get(e), p = a.get(t);
  if (y && p)
    return y == t && p == e;
  var h = !0;
  a.set(e, t), a.set(t, e);
  for (var g = o; ++d < c; ) {
    m = s[d];
    var b = e[m], x = t[m];
    if (r)
      var v = o ? r(x, b, m, t, e, a) : r(b, x, m, e, t, a);
    if (!(v === void 0 ? b === x || i(b, x, n, r, a) : v)) {
      h = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (h && !g) {
    var w = e.constructor, E = t.constructor;
    w != E && "constructor" in e && "constructor" in t && !(typeof w == "function" && w instanceof w && typeof E == "function" && E instanceof E) && (h = !1);
  }
  return a.delete(e), a.delete(t), h;
}
var w5 = b5, E5 = jn, C5 = bt, x5 = E5(C5, "DataView"), $5 = x5, _5 = jn, k5 = bt, S5 = _5(k5, "Promise"), O5 = S5, F5 = jn, P5 = bt, N5 = F5(P5, "Set"), A5 = N5, T5 = jn, R5 = bt, M5 = T5(R5, "WeakMap"), I5 = M5, ms = $5, hs = yl, vs = O5, ps = A5, gs = I5, Fd = br, _r = ld, Yc = "[object Map]", L5 = "[object Object]", Xc = "[object Promise]", Qc = "[object Set]", Jc = "[object WeakMap]", eu = "[object DataView]", D5 = _r(ms), V5 = _r(hs), j5 = _r(vs), B5 = _r(ps), W5 = _r(gs), kn = Fd;
(ms && kn(new ms(new ArrayBuffer(1))) != eu || hs && kn(new hs()) != Yc || vs && kn(vs.resolve()) != Xc || ps && kn(new ps()) != Qc || gs && kn(new gs()) != Jc) && (kn = function(e) {
  var t = Fd(e), n = t == L5 ? e.constructor : void 0, r = n ? _r(n) : "";
  if (r)
    switch (r) {
      case D5:
        return eu;
      case V5:
        return Yc;
      case j5:
        return Xc;
      case B5:
        return Qc;
      case W5:
        return Jc;
    }
  return t;
});
var Z5 = kn, jo = kd, H5 = Sd, U5 = K4, z5 = w5, tu = Z5, nu = Ba, ru = ci.exports, q5 = ml, K5 = 1, iu = "[object Arguments]", au = "[object Array]", Ui = "[object Object]", G5 = Object.prototype, ou = G5.hasOwnProperty;
function Y5(e, t, n, r, i, a) {
  var o = nu(e), s = nu(t), c = o ? au : tu(e), u = s ? au : tu(t);
  c = c == iu ? Ui : c, u = u == iu ? Ui : u;
  var f = c == Ui, d = u == Ui, m = c == u;
  if (m && ru(e)) {
    if (!ru(t))
      return !1;
    o = !0, f = !1;
  }
  if (m && !f)
    return a || (a = new jo()), o || q5(e) ? H5(e, t, n, r, i, a) : U5(e, t, c, n, r, i, a);
  if (!(n & K5)) {
    var y = f && ou.call(e, "__wrapped__"), p = d && ou.call(t, "__wrapped__");
    if (y || p) {
      var h = y ? e.value() : e, g = p ? t.value() : t;
      return a || (a = new jo()), i(h, g, n, r, a);
    }
  }
  return m ? (a || (a = new jo()), z5(e, t, n, r, i, a)) : !1;
}
var X5 = Y5, Q5 = X5, su = Bn;
function Pd(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !su(e) && !su(t) ? e !== e && t !== t : Q5(e, t, n, r, Pd, i);
}
var J5 = Pd, e6 = J5;
function t6(e, t) {
  return e6(e, t);
}
var n6 = t6;
function r6(e) {
  var t = St(K(e), 2), n = t[0], r = t[1], i = j(n);
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
  function e(v) {
    try {
      return v.defaultView && v.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var t = function(v) {
    for (var w = v, E = e(w); E; )
      w = E.ownerDocument, E = e(w);
    return w;
  }(window.document), n = [], r = null, i = null;
  function a(v) {
    this.time = v.time, this.target = v.target, this.rootBounds = p(v.rootBounds), this.boundingClientRect = p(v.boundingClientRect), this.intersectionRect = p(v.intersectionRect || y()), this.isIntersecting = !!v.intersectionRect;
    var w = this.boundingClientRect, E = w.width * w.height, C = this.intersectionRect, $ = C.width * C.height;
    E ? this.intersectionRatio = Number(($ / E).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(v, w) {
    var E = w || {};
    if (typeof v != "function")
      throw new Error("callback must be a function");
    if (E.root && E.root.nodeType != 1 && E.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = v, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(E.rootMargin), this.thresholds = this._initThresholds(E.threshold), this.root = E.root || null, this.rootMargin = this._rootMarginValues.map(function(C) {
      return C.value + C.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(v, w) {
      !v || !w ? i = y() : i = h(v, w), n.forEach(function(E) {
        E._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(v) {
    var w = this._observationTargets.some(function(E) {
      return E.element == v;
    });
    if (!w) {
      if (!(v && v.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: v, entry: null }), this._monitorIntersections(v.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(v) {
    this._observationTargets = this._observationTargets.filter(function(w) {
      return w.element != v;
    }), this._unmonitorIntersections(v.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var v = this._queuedEntries.slice();
    return this._queuedEntries = [], v;
  }, o.prototype._initThresholds = function(v) {
    var w = v || [0];
    return Array.isArray(w) || (w = [w]), w.sort().filter(function(E, C, $) {
      if (typeof E != "number" || isNaN(E) || E < 0 || E > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return E !== $[C - 1];
    });
  }, o.prototype._parseRootMargin = function(v) {
    var w = v || "0px", E = w.split(/\s+/).map(function(C) {
      var $ = /^(-?\d*\.?\d+)(px|%)$/.exec(C);
      if (!$)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat($[1]), unit: $[2] };
    });
    return E[1] = E[1] || E[0], E[2] = E[2] || E[0], E[3] = E[3] || E[1], E;
  }, o.prototype._monitorIntersections = function(v) {
    var w = v.defaultView;
    if (!!w && this._monitoringDocuments.indexOf(v) == -1) {
      var E = this._checkForIntersections, C = null, $ = null;
      this.POLL_INTERVAL ? C = w.setInterval(E, this.POLL_INTERVAL) : (u(w, "resize", E, !0), u(v, "scroll", E, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in w && ($ = new w.MutationObserver(E), $.observe(v, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(v), this._monitoringUnsubscribes.push(function() {
        var k = v.defaultView;
        k && (C && k.clearInterval(C), f(k, "resize", E, !0)), f(v, "scroll", E, !0), $ && $.disconnect();
      });
      var A = this.root && (this.root.ownerDocument || this.root) || t;
      if (v != A) {
        var O = e(v);
        O && this._monitorIntersections(O.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(v) {
    var w = this._monitoringDocuments.indexOf(v);
    if (w != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || t, C = this._observationTargets.some(function(O) {
        var k = O.element.ownerDocument;
        if (k == v)
          return !0;
        for (; k && k != E; ) {
          var D = e(k);
          if (k = D && D.ownerDocument, k == v)
            return !0;
        }
        return !1;
      });
      if (!C) {
        var $ = this._monitoringUnsubscribes[w];
        if (this._monitoringDocuments.splice(w, 1), this._monitoringUnsubscribes.splice(w, 1), $(), v != E) {
          var A = e(v);
          A && this._unmonitorIntersections(A.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var v = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var w = 0; w < v.length; w++)
      v[w]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var v = this._rootIsInDom(), w = v ? this._getRootRect() : y();
      this._observationTargets.forEach(function(E) {
        var C = E.element, $ = m(C), A = this._rootContainsTarget(C), O = E.entry, k = v && A && this._computeTargetAndRootIntersection(C, $, w), D = null;
        this._rootContainsTarget(C) ? (!r || this.root) && (D = w) : D = y();
        var I = E.entry = new a({
          time: s(),
          target: C,
          boundingClientRect: $,
          rootBounds: D,
          intersectionRect: k
        });
        O ? v && A ? this._hasCrossedThreshold(O, I) && this._queuedEntries.push(I) : O && O.isIntersecting && this._queuedEntries.push(I) : this._queuedEntries.push(I);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(v, w, E) {
    if (window.getComputedStyle(v).display != "none") {
      for (var C = w, $ = b(v), A = !1; !A && $; ) {
        var O = null, k = $.nodeType == 1 ? window.getComputedStyle($) : {};
        if (k.display == "none")
          return null;
        if ($ == this.root || $.nodeType == 9)
          if (A = !0, $ == this.root || $ == t)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? ($ = null, O = null, C = null) : O = i : O = E;
          else {
            var D = b($), I = D && m(D), T = D && this._computeTargetAndRootIntersection(D, I, E);
            I && T ? ($ = D, O = h(I, T)) : ($ = null, C = null);
          }
        else {
          var _ = $.ownerDocument;
          $ != _.body && $ != _.documentElement && k.overflow != "visible" && (O = m($));
        }
        if (O && (C = d(O, C)), !C)
          break;
        $ = $ && b($);
      }
      return C;
    }
  }, o.prototype._getRootRect = function() {
    var v;
    if (this.root && !x(this.root))
      v = m(this.root);
    else {
      var w = x(this.root) ? this.root : t, E = w.documentElement, C = w.body;
      v = {
        top: 0,
        left: 0,
        right: E.clientWidth || C.clientWidth,
        width: E.clientWidth || C.clientWidth,
        bottom: E.clientHeight || C.clientHeight,
        height: E.clientHeight || C.clientHeight
      };
    }
    return this._expandRectByRootMargin(v);
  }, o.prototype._expandRectByRootMargin = function(v) {
    var w = this._rootMarginValues.map(function(C, $) {
      return C.unit == "px" ? C.value : C.value * ($ % 2 ? v.width : v.height) / 100;
    }), E = {
      top: v.top - w[0],
      right: v.right + w[1],
      bottom: v.bottom + w[2],
      left: v.left - w[3]
    };
    return E.width = E.right - E.left, E.height = E.bottom - E.top, E;
  }, o.prototype._hasCrossedThreshold = function(v, w) {
    var E = v && v.isIntersecting ? v.intersectionRatio || 0 : -1, C = w.isIntersecting ? w.intersectionRatio || 0 : -1;
    if (E !== C)
      for (var $ = 0; $ < this.thresholds.length; $++) {
        var A = this.thresholds[$];
        if (A == E || A == C || A < E != A < C)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || g(t, this.root);
  }, o.prototype._rootContainsTarget = function(v) {
    var w = this.root && (this.root.ownerDocument || this.root) || t;
    return g(w, v) && (!this.root || w == v.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var v = n.indexOf(this);
    v != -1 && n.splice(v, 1);
  };
  function s() {
    return window.performance && performance.now && performance.now();
  }
  function c(v, w) {
    var E = null;
    return function() {
      E || (E = setTimeout(function() {
        v(), E = null;
      }, w));
    };
  }
  function u(v, w, E, C) {
    typeof v.addEventListener == "function" ? v.addEventListener(w, E, C || !1) : typeof v.attachEvent == "function" && v.attachEvent("on" + w, E);
  }
  function f(v, w, E, C) {
    typeof v.removeEventListener == "function" ? v.removeEventListener(w, E, C || !1) : typeof v.detachEvent == "function" && v.detachEvent("on" + w, E);
  }
  function d(v, w) {
    var E = Math.max(v.top, w.top), C = Math.min(v.bottom, w.bottom), $ = Math.max(v.left, w.left), A = Math.min(v.right, w.right), O = A - $, k = C - E;
    return O >= 0 && k >= 0 && {
      top: E,
      bottom: C,
      left: $,
      right: A,
      width: O,
      height: k
    } || null;
  }
  function m(v) {
    var w;
    try {
      w = v.getBoundingClientRect();
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
  function p(v) {
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
  function h(v, w) {
    var E = w.top - v.top, C = w.left - v.left;
    return {
      top: E,
      left: C,
      height: w.height,
      width: w.width,
      bottom: E + w.height,
      right: C + w.width
    };
  }
  function g(v, w) {
    for (var E = w; E; ) {
      if (E == v)
        return !0;
      E = b(E);
    }
    return !1;
  }
  function b(v) {
    var w = v.parentNode;
    return v.nodeType == 9 && v != t ? e(v) : (w && w.assignedSlot && (w = w.assignedSlot.parentNode), w && w.nodeType == 11 && w.host ? w.host : w);
  }
  function x(v) {
    return v && v.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function i6(e, t) {
  var n = St(K(), 2), r = n[0], i = n[1], a = St(K(), 2), o = a[0], s = a[1];
  return gl(function() {
    var c = sn(e);
    if (!!c) {
      var u = new IntersectionObserver(function(f) {
        var d, m;
        try {
          for (var y = Wm(f), p = y.next(); !p.done; p = y.next()) {
            var h = p.value;
            s(h.intersectionRatio), i(h.isIntersecting);
          }
        } catch (g) {
          d = {
            error: g
          };
        } finally {
          try {
            p && !p.done && (m = y.return) && m.call(y);
          } finally {
            if (d)
              throw d.error;
          }
        }
      }, ga(ga({}, t), {
        root: sn(t == null ? void 0 : t.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [t == null ? void 0 : t.rootMargin, t == null ? void 0 : t.threshold], e), [r, o];
}
var a6 = pl ? sl : Y;
const Oe = a6;
function o6(e) {
  var t = this, n = j(!1);
  return Ue(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return ke(t, void 0, void 0, function() {
      var a, o;
      return Bm(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [2];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, e.apply(void 0, cl([], St(r), !1))];
          case 2:
            return a = s.sent(), n.current = !1, [2, a];
          case 3:
            throw o = s.sent(), n.current = !1, o;
          case 4:
            return [2];
        }
      });
    });
  }, [e]);
}
function s6(e) {
  var t = j(0), n = St(K(e), 2), r = n[0], i = n[1], a = Ue(function(o) {
    cancelAnimationFrame(t.current), t.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return Si(function() {
    cancelAnimationFrame(t.current);
  }), [r, a];
}
var l6 = yd, c6 = l6(Object.getPrototypeOf, Object), Nd = c6, u6 = br, f6 = Nd, d6 = Bn, m6 = "[object Object]", h6 = Function.prototype, v6 = Object.prototype, Ad = h6.toString, p6 = v6.hasOwnProperty, g6 = Ad.call(Object);
function y6(e) {
  if (!d6(e) || u6(e) != m6)
    return !1;
  var t = f6(e);
  if (t === null)
    return !0;
  var n = p6.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && Ad.call(n) == g6;
}
var b6 = y6, w6 = function() {
  var e = j(!1);
  return Y(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e;
};
const wl = w6;
var Td = function() {
  if (typeof Map < "u")
    return Map;
  function e(t, n) {
    var r = -1;
    return t.some(function(i, a) {
      return i[0] === n ? (r = a, !0) : !1;
    }), r;
  }
  return function() {
    function t() {
      this.__entries__ = [];
    }
    return Object.defineProperty(t.prototype, "size", {
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
  }();
}(), ys = typeof window < "u" && typeof document < "u" && window.document === document, ba = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), E6 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ba) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), C6 = 2;
function x6(e, t) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, e()), r && s();
  }
  function o() {
    E6(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < C6)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, t);
    i = c;
  }
  return s;
}
var $6 = 20, _6 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], k6 = typeof MutationObserver < "u", S6 = function() {
  function e() {
    this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = x6(this.refresh.bind(this), $6);
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
    !ys || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), k6 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
      attributes: !0,
      childList: !0,
      characterData: !0,
      subtree: !0
    })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
  }, e.prototype.disconnect_ = function() {
    !ys || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
  }, e.prototype.onTransitionEnd_ = function(t) {
    var n = t.propertyName, r = n === void 0 ? "" : n, i = _6.some(function(a) {
      return !!~r.indexOf(a);
    });
    i && this.refresh();
  }, e.getInstance = function() {
    return this.instance_ || (this.instance_ = new e()), this.instance_;
  }, e.instance_ = null, e;
}(), Rd = function(e, t) {
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
}, Md = qa(0, 0, 0, 0);
function wa(e) {
  return parseFloat(e) || 0;
}
function lu(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var a = e["border-" + i + "-width"];
    return r + wa(a);
  }, 0);
}
function O6(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], o = e["padding-" + a];
    n[a] = wa(o);
  }
  return n;
}
function F6(e) {
  var t = e.getBBox();
  return qa(0, 0, t.width, t.height);
}
function P6(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return Md;
  var r = lr(e).getComputedStyle(e), i = O6(r), a = i.left + i.right, o = i.top + i.bottom, s = wa(r.width), c = wa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= lu(r, "left", "right") + a), Math.round(c + o) !== n && (c -= lu(r, "top", "bottom") + o)), !A6(e)) {
    var u = Math.round(s + a) - t, f = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(f) !== 1 && (c -= f);
  }
  return qa(i.left, i.top, s, c);
}
var N6 = function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof lr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof lr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function A6(e) {
  return e === lr(e).document.documentElement;
}
function T6(e) {
  return ys ? N6(e) ? F6(e) : P6(e) : Md;
}
function R6(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return Rd(o, {
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
var M6 = function() {
  function e(t) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = qa(0, 0, 0, 0), this.target = t;
  }
  return e.prototype.isActive = function() {
    var t = T6(this.target);
    return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
  }, e.prototype.broadcastRect = function() {
    var t = this.contentRect_;
    return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
  }, e;
}(), I6 = function() {
  function e(t, n) {
    var r = R6(n);
    Rd(this, { target: t, contentRect: r });
  }
  return e;
}(), L6 = function() {
  function e(t, n, r) {
    if (this.activeObservations_ = [], this.observations_ = new Td(), typeof t != "function")
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
      n.has(t) || (n.set(t, new M6(t)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, e.prototype.unobserve = function(t) {
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(t instanceof lr(t).Element))
        throw new TypeError('parameter 1 is not of type "Element".');
      var n = this.observations_;
      !n.has(t) || (n.delete(t), n.size || this.controller_.removeObserver(this));
    }
  }, e.prototype.disconnect = function() {
    this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
  }, e.prototype.gatherActive = function() {
    var t = this;
    this.clearActive(), this.observations_.forEach(function(n) {
      n.isActive() && t.activeObservations_.push(n);
    });
  }, e.prototype.broadcastActive = function() {
    if (!!this.hasActive()) {
      var t = this.callbackCtx_, n = this.activeObservations_.map(function(r) {
        return new I6(r.target, r.broadcastRect());
      });
      this.callback_.call(t, n, t), this.clearActive();
    }
  }, e.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e;
}(), Id = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Td(), Ld = function() {
  function e(t) {
    if (!(this instanceof e))
      throw new TypeError("Cannot call a class as a function.");
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    var n = S6.getInstance(), r = new L6(t, n, this);
    Id.set(this, r);
  }
  return e;
}();
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Ld.prototype[e] = function() {
    var t;
    return (t = Id.get(this))[e].apply(t, arguments);
  };
});
var D6 = function() {
  return typeof ba.ResizeObserver < "u" ? ba.ResizeObserver : Ld;
}(), V6 = xd(sl);
const j6 = V6;
var B6 = pl ? j6 : gl;
const W6 = B6;
function bs(e) {
  var t = St(s6(function() {
    var i = sn(e);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = t[0], r = t[1];
  return W6(function() {
    var i = sn(e);
    if (!!i) {
      var a = new D6(function(o) {
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
  ki && (wr(e) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof e)));
  var r = Wa(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = ee(function() {
    return n3(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, cl([], St(o), !1));
    }, i, t);
  }, []);
  return Si(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var Z6 = function(e, t) {
  var n = Ut(e), r = j(null), i = Ue(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return Y(function() {
    if (!(!wp(t) || t < 0))
      return r.current = setTimeout(n, t), i;
  }, [t]), i;
};
const H6 = Z6;
const cu = 10;
function U6(e, t) {
  return e > t && e > cu ? "horizontal" : t > e && t > cu ? "vertical" : "";
}
function z6() {
  const e = j(0), t = j(0), n = j(0), r = j(0), i = j(0), a = j(0), o = j(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const y = m.touches[0];
      n.current = y.clientX < 0 ? 0 : y.clientX - e.current, r.current = y.clientY - t.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = U6(i.current, a.current));
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
const q6 = gr ? window : void 0, K6 = ["scroll", "auto", "overlay"];
function G6(e) {
  return e.nodeType === 1;
}
function Ea(e, t = q6) {
  let n = e;
  for (; n && n !== t && G6(n); ) {
    if (n === document.body)
      return t;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (K6.includes(r) && n.scrollHeight > n.clientHeight)
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
const uu = "adm-overflow-hidden";
function Y6(e) {
  let t = e == null ? void 0 : e.parentElement;
  for (; t; ) {
    if (t.clientHeight < t.scrollHeight)
      return t;
    t = t.parentElement;
  }
  return null;
}
function Ga(e, t) {
  const n = z6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = Ea(o.target, e.current);
    if (!c)
      return;
    if (t === "strict") {
      const p = Y6(o.target);
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
    let y = "11";
    d === 0 ? y = f >= u ? "00" : "01" : u <= Math.round(m + d) && (y = "10"), y !== "11" && n.isVertical() && !(parseInt(y, 2) & parseInt(s, 2)) && o.cancelable && Rn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Rn ? {
      passive: !1
    } : !1), Lr || document.body.classList.add(uu), Lr++;
  }, a = () => {
    Lr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Lr--, Lr || document.body.classList.remove(uu));
  };
  Y(() => {
    if (t)
      return i(), () => {
        a();
      };
  }, [t]);
}
let El = Fi();
const X = (e) => Oi(e, El);
let Cl = Fi();
X.write = (e) => Oi(e, Cl);
let Ya = Fi();
X.onStart = (e) => Oi(e, Ya);
let xl = Fi();
X.onFrame = (e) => Oi(e, xl);
let $l = Fi();
X.onFinish = (e) => Oi(e, $l);
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
  return ir.splice(Dd(n), 0, i), rn += 1, Vd(), i;
};
let Dd = (e) => ~(~ir.findIndex((t) => t.time > e) || ~ir.length);
X.cancel = (e) => {
  Ya.delete(e), xl.delete(e), $l.delete(e), El.delete(e), Cl.delete(e);
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
let _l = typeof window < "u" ? window.requestAnimationFrame : () => {
};
X.use = (e) => _l = e;
X.now = typeof performance < "u" ? () => performance.now() : Date.now;
X.batchedUpdates = (e) => e();
X.catch = console.error;
X.frameLoop = "always";
X.advance = () => {
  X.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Bd();
};
let nn = -1, rn = 0, ws = !1;
function Oi(e, t) {
  ws ? (t.delete(e), e(0)) : (t.add(e), Vd());
}
function Vd() {
  nn < 0 && (nn = 0, X.frameLoop !== "demand" && _l(jd));
}
function X6() {
  nn = -1;
}
function jd() {
  ~nn && (_l(jd), X.batchedUpdates(Bd));
}
function Bd() {
  let e = nn;
  nn = X.now();
  let t = Dd(nn);
  if (t && (Wd(ir.splice(0, t), (n) => n.handler()), rn -= t), !rn) {
    X6();
    return;
  }
  Ya.flush(), El.flush(e ? Math.min(64, nn - e) : 16.667), xl.flush(), Cl.flush(), $l.flush();
}
function Fi() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(n) {
      rn += t == e && !e.has(n) ? 1 : 0, e.add(n);
    },
    delete(n) {
      return rn -= t == e && e.has(n) ? 1 : 0, e.delete(n);
    },
    flush(n) {
      t.size && (e = /* @__PURE__ */ new Set(), rn -= t.size, Wd(t, (r) => r(n) && e.add(r)), rn += e.size, t = e);
    }
  };
}
function Wd(e, t) {
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
const Q6 = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), H = {
  arr: Array.isArray,
  obj: (e) => !!e && e.constructor.name === "Object",
  fun: (e) => typeof e == "function",
  str: (e) => typeof e == "string",
  num: (e) => typeof e == "number",
  und: (e) => e === void 0
};
function Dt(e, t) {
  if (H.arr(e)) {
    if (!H.arr(t) || e.length !== t.length)
      return !1;
    for (let n = 0; n < e.length; n++)
      if (e[n] !== t[n])
        return !1;
    return !0;
  }
  return e === t;
}
const J = (e, t) => e.forEach(t);
function Ot(e, t, n) {
  if (H.arr(e)) {
    for (let r = 0; r < e.length; r++)
      t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e)
    e.hasOwnProperty(r) && t.call(n, e[r], r);
}
const Ye = (e) => H.und(e) ? [] : H.arr(e) ? e : [e];
function ni(e, t) {
  if (e.size) {
    const n = Array.from(e);
    e.clear(), J(n, t);
  }
}
const Jr = (e, ...t) => ni(e, (n) => n(...t)), kl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let Sl, Zd, on = null, Hd = !1, Ol = Es;
const J6 = (e) => {
  e.to && (Zd = e.to), e.now && (X.now = e.now), e.colors !== void 0 && (on = e.colors), e.skipAnimation != null && (Hd = e.skipAnimation), e.createStringInterpolator && (Sl = e.createStringInterpolator), e.requestAnimationFrame && X.use(e.requestAnimationFrame), e.batchedUpdates && (X.batchedUpdates = e.batchedUpdates), e.willAdvance && (Ol = e.willAdvance), e.frameLoop && (X.frameLoop = e.frameLoop);
};
var st = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return Sl;
  },
  get to() {
    return Zd;
  },
  get colors() {
    return on;
  },
  get skipAnimation() {
    return Hd;
  },
  get willAdvance() {
    return Ol;
  },
  assign: J6
});
const ri = /* @__PURE__ */ new Set();
let at = [], Bo = [], Ca = 0;
const Xa = {
  get idle() {
    return !ri.size && !at.length;
  },
  start(e) {
    Ca > e.priority ? (ri.add(e), X.onStart(e7)) : (Ud(e), X(Cs));
  },
  advance: Cs,
  sort(e) {
    if (Ca)
      X.onFrame(() => Xa.sort(e));
    else {
      const t = at.indexOf(e);
      ~t && (at.splice(t, 1), zd(e));
    }
  },
  clear() {
    at = [], ri.clear();
  }
};
function e7() {
  ri.forEach(Ud), ri.clear(), X(Cs);
}
function Ud(e) {
  at.includes(e) || zd(e);
}
function zd(e) {
  at.splice(t7(at, (t) => t.priority > e.priority), 0, e);
}
function Cs(e) {
  const t = Bo;
  for (let n = 0; n < at.length; n++) {
    const r = at[n];
    Ca = r.priority, r.idle || (Ol(r), r.advance(e), r.idle || t.push(r));
  }
  return Ca = 0, Bo = at, Bo.length = 0, at = t, at.length > 0;
}
function t7(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
const n7 = (e, t, n) => Math.min(Math.max(n, e), t), r7 = {
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
const i7 = new RegExp("rgb" + Qa(gt, gt, gt)), a7 = new RegExp("rgba" + Qa(gt, gt, gt, gt)), o7 = new RegExp("hsl" + Qa(gt, xa, xa)), s7 = new RegExp("hsla" + Qa(gt, xa, xa, gt)), l7 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, c7 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, u7 = /^#([0-9a-fA-F]{6})$/, f7 = /^#([0-9a-fA-F]{8})$/;
function d7(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = u7.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : on && on[e] !== void 0 ? on[e] : (t = i7.exec(e)) ? (Zn(t[1]) << 24 | Zn(t[2]) << 16 | Zn(t[3]) << 8 | 255) >>> 0 : (t = a7.exec(e)) ? (Zn(t[1]) << 24 | Zn(t[2]) << 16 | Zn(t[3]) << 8 | mu(t[4])) >>> 0 : (t = l7.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = f7.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = c7.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = o7.exec(e)) ? (fu(du(t[1]), zi(t[2]), zi(t[3])) | 255) >>> 0 : (t = s7.exec(e)) ? (fu(du(t[1]), zi(t[2]), zi(t[3])) | mu(t[4])) >>> 0 : null;
}
function Wo(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function fu(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = Wo(i, r, e + 1 / 3), o = Wo(i, r, e), s = Wo(i, r, e - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(s * 255) << 8;
}
function Zn(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function du(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function mu(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function zi(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function hu(e) {
  let t = d7(e);
  if (t === null)
    return e;
  t = t || 0;
  let n = (t & 4278190080) >>> 24, r = (t & 16711680) >>> 16, i = (t & 65280) >>> 8, a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const ui = (e, t, n) => {
  if (H.fun(e))
    return e;
  if (H.arr(e))
    return ui({
      range: e,
      output: t,
      extrapolate: n
    });
  if (H.str(e.output[0]))
    return Sl(e);
  const r = e, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const f = h7(u, a);
    return m7(u, a[f], a[f + 1], i[f], i[f + 1], c, o, s, r.map);
  };
};
function m7(e, t, n, r, i, a, o, s, c) {
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
function h7(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
    ;
  return n - 1;
}
const v7 = (e, t = "end") => (n) => {
  n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * e, i = t === "end" ? Math.floor(r) : Math.ceil(r);
  return n7(0, 1, i / e);
}, $a = 1.70158, qi = $a * 1.525, vu = $a + 1, pu = 2 * Math.PI / 3, gu = 2 * Math.PI / 4.5, Ki = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, p7 = {
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
  easeInBack: (e) => vu * e * e * e - $a * e * e,
  easeOutBack: (e) => 1 + vu * Math.pow(e - 1, 3) + $a * Math.pow(e - 1, 2),
  easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((qi + 1) * 2 * e - qi) / 2 : (Math.pow(2 * e - 2, 2) * ((qi + 1) * (e * 2 - 2) + qi) + 2) / 2,
  easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * pu),
  easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * pu) + 1,
  easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * gu)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * gu) / 2 + 1,
  easeInBounce: (e) => 1 - Ki(1 - e),
  easeOutBounce: Ki,
  easeInOutBounce: (e) => e < 0.5 ? (1 - Ki(1 - 2 * e)) / 2 : (1 + Ki(2 * e - 1)) / 2,
  steps: v7
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
const cr = Symbol.for("FluidValue.get"), Mn = Symbol.for("FluidValue.observers"), rt = (e) => Boolean(e && e[cr]), Ze = (e) => e && e[cr] ? e[cr]() : e, yu = (e) => e[Mn] || null;
function g7(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function fi(e, t) {
  let n = e[Mn];
  n && n.forEach((r) => {
    g7(r, t);
  });
}
class qd {
  constructor(t) {
    if (this[cr] = void 0, this[Mn] = void 0, !t && !(t = this.get))
      throw Error("Unknown getter");
    y7(this, t);
  }
}
const y7 = (e, t) => Kd(e, cr, t);
function kr(e, t) {
  if (e[cr]) {
    let n = e[Mn];
    n || Kd(e, Mn, n = /* @__PURE__ */ new Set()), n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
  }
  return t;
}
function di(e, t) {
  let n = e[Mn];
  if (n && n.has(t)) {
    const r = n.size - 1;
    r ? n.delete(t) : e[Mn] = null, e.observerRemoved && e.observerRemoved(r, t);
  }
}
const Kd = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), ua = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, b7 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, bu = new RegExp(`(${ua.source})(%|[a-z]+)`, "i"), w7 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ja = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Gd = (e) => {
  const [t, n] = E7(e);
  if (!t || kl())
    return e;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || e;
  } else {
    if (n && Ja.test(n))
      return Gd(n);
    if (n)
      return n;
  }
  return e;
}, E7 = (e) => {
  const t = Ja.exec(e);
  if (!t)
    return [,];
  const [, n, r] = t;
  return [n, r];
};
let Zo;
const C7 = (e, t, n, r, i) => `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Yd = (e) => {
  Zo || (Zo = on ? new RegExp(`(${Object.keys(on).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((a) => Ze(a).replace(Ja, Gd).replace(b7, hu).replace(Zo, hu)), n = t.map((a) => a.match(ua).map(Number)), i = n[0].map((a, o) => n.map((s) => {
    if (!(o in s))
      throw Error('The arity of each "output" value must be equal');
    return s[o];
  })).map((a) => ui(xs({}, e, {
    output: a
  })));
  return (a) => {
    var o;
    const s = !bu.test(t[0]) && ((o = t.find((u) => bu.test(u))) == null ? void 0 : o.replace(ua, ""));
    let c = 0;
    return t[0].replace(ua, () => `${i[c++](a)}${s || ""}`).replace(w7, C7);
  };
}, Fl = "react-spring: ", Xd = (e) => {
  const t = e;
  let n = !1;
  if (typeof t != "function")
    throw new TypeError(`${Fl}once requires a function parameter`);
  return (...r) => {
    n || (t(...r), n = !0);
  };
}, x7 = Xd(console.warn);
function $7() {
  x7(`${Fl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const _7 = Xd(console.warn);
function k7() {
  _7(`${Fl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function eo(e) {
  return H.str(e) && (e[0] == "#" || /\d/.test(e) || !kl() && Ja.test(e) || e in (on || {}));
}
const Pl = kl() ? Y : sl, S7 = () => {
  const e = j(!1);
  return Pl(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function Qd() {
  const e = K()[1], t = S7();
  return () => {
    t.current && e(Math.random());
  };
}
function O7(e, t) {
  const [n] = K(() => ({
    inputs: t,
    result: e()
  })), r = j(), i = r.current;
  let a = i;
  return a ? Boolean(t && a.inputs && F7(t, a.inputs)) || (a = {
    inputs: t,
    result: e()
  }) : a = n, Y(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function F7(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Jd = (e) => Y(e, P7), P7 = [];
function wu(e) {
  const t = j();
  return Y(() => {
    t.current = e;
  }), t.current;
}
const mi = Symbol.for("Animated:node"), N7 = (e) => !!e && e[mi] === e, _t = (e) => e && e[mi], Nl = (e, t) => Q6(e, mi, t), to = (e) => e && e[mi] && e[mi].getPayload();
class e1 {
  constructor() {
    this.payload = void 0, Nl(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class Sr extends e1 {
  constructor(t) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = t, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(t) {
    return new Sr(t);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(t, n) {
    return H.num(t) && (this.lastPosition = t, n && (t = Math.round(t / n) * n, this.done && (this.lastPosition = t))), this._value === t ? !1 : (this._value = t, !0);
  }
  reset() {
    const {
      done: t
    } = this;
    this.done = !1, H.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, t && (this.lastVelocity = null), this.v0 = null);
  }
}
class ur extends Sr {
  constructor(t) {
    super(0), this._string = null, this._toString = void 0, this._toString = ui({
      output: [t, t]
    });
  }
  static create(t) {
    return new ur(t);
  }
  getValue() {
    let t = this._string;
    return t == null ? this._string = this._toString(this._value) : t;
  }
  setValue(t) {
    if (H.str(t)) {
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
    t && (this._toString = ui({
      output: [this.getValue(), t]
    })), this._value = 0, super.reset();
  }
}
const _a = {
  dependencies: null
};
class no extends e1 {
  constructor(t) {
    super(), this.source = t, this.setValue(t);
  }
  getValue(t) {
    const n = {};
    return Ot(this.source, (r, i) => {
      N7(r) ? n[i] = r.getValue(t) : rt(r) ? n[i] = Ze(r) : t || (n[i] = r);
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
      return Ot(t, this._addToPayload, n), Array.from(n);
    }
  }
  _addToPayload(t) {
    _a.dependencies && rt(t) && _a.dependencies.add(t);
    const n = to(t);
    n && J(n, (r) => this.add(r));
  }
}
class Al extends no {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new Al(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const n = this.getPayload();
    return t.length == n.length ? n.map((r, i) => r.setValue(t[i])).some(Boolean) : (super.setValue(t.map(A7)), !0);
  }
}
function A7(e) {
  return (eo(e) ? ur : Sr).create(e);
}
function $s(e) {
  const t = _t(e);
  return t ? t.constructor : H.arr(e) ? Al : eo(e) ? ur : Sr;
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
const Eu = (e, t) => {
  const n = !H.fun(e) || e.prototype && e.prototype.isReactComponent;
  return fe((r, i) => {
    const a = j(null), o = n && Ue((p) => {
      a.current = M7(i, p);
    }, [i]), [s, c] = R7(r, t), u = Qd(), f = () => {
      const p = a.current;
      if (n && !p)
        return;
      (p ? t.applyAnimatedValues(p, s.getValue(!0)) : !1) === !1 && u();
    }, d = new T7(f, c), m = j();
    Pl(() => (m.current = d, J(c, (p) => kr(p, d)), () => {
      m.current && (J(m.current.deps, (p) => di(p, m.current)), X.cancel(m.current.update));
    })), Y(f, []), Jd(() => () => {
      const p = m.current;
      J(p.deps, (h) => di(h, p));
    });
    const y = t.getComponentProps(s.getValue());
    return V.createElement(e, ka({}, y, {
      ref: o
    }));
  });
};
class T7 {
  constructor(t, n) {
    this.update = t, this.deps = n;
  }
  eventObserved(t) {
    t.type == "change" && X.write(this.update);
  }
}
function R7(e, t) {
  const n = /* @__PURE__ */ new Set();
  return _a.dependencies = n, e.style && (e = ka({}, e, {
    style: t.createAnimatedStyle(e.style)
  })), e = new no(e), _a.dependencies = null, [e, n];
}
function M7(e, t) {
  return e && (H.fun(e) ? e(t) : e.current = t), t;
}
const Cu = Symbol.for("AnimatedComponent"), I7 = (e, {
  applyAnimatedValues: t = () => !1,
  createAnimatedStyle: n = (i) => new no(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: t,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const s = xu(o) || "Anonymous";
    return H.str(o) ? o = a[o] || (a[o] = Eu(o, i)) : o = o[Cu] || (o[Cu] = Eu(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return Ot(e, (o, s) => {
    H.arr(e) && (s = xu(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, xu = (e) => H.str(e) ? e : e && H.str(e.displayName) ? e.displayName : H.fun(e) && e.name || null;
function Pe() {
  return Pe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Pe.apply(this, arguments);
}
function Sn(e, ...t) {
  return H.fun(e) ? e(...t) : e;
}
const ii = (e, t) => e === !0 || !!(t && e && (H.fun(e) ? e(t) : Ye(e).includes(t))), t1 = (e, t) => H.obj(e) ? t && e[t] : e, n1 = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, L7 = (e) => e, Tl = (e, t = L7) => {
  let n = D7;
  e.default && e.default !== !0 && (e = e.default, n = Object.keys(e));
  const r = {};
  for (const i of n) {
    const a = t(e[i], i);
    H.und(a) || (r[i] = a);
  }
  return r;
}, D7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], V7 = {
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
function j7(e) {
  const t = {};
  let n = 0;
  if (Ot(e, (r, i) => {
    V7[i] || (t[i] = r, n++);
  }), n)
    return t;
}
function r1(e) {
  const t = j7(e);
  if (t) {
    const n = {
      to: t
    };
    return Ot(e, (r, i) => i in t || (n[i] = r)), n;
  }
  return Pe({}, e);
}
function hi(e) {
  return e = Ze(e), H.arr(e) ? e.map(hi) : eo(e) ? st.createStringInterpolator({
    range: [0, 1],
    output: [e, e]
  })(1) : e;
}
function B7(e) {
  for (const t in e)
    return !0;
  return !1;
}
function _s(e) {
  return H.fun(e) || H.arr(e) && H.obj(e[0]);
}
function W7(e, t) {
  var n;
  (n = e.ref) == null || n.delete(e), t == null || t.delete(e);
}
function Z7(e, t) {
  if (t && e.ref !== t) {
    var n;
    (n = e.ref) == null || n.delete(e), t.add(e), e.ref = t;
  }
}
const H7 = {
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
}, ks = Pe({}, H7.default, {
  mass: 1,
  damping: 1,
  easing: p7.linear,
  clamp: !1
});
class U7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, ks);
  }
}
function z7(e, t, n) {
  n && (n = Pe({}, n), $u(n, t), t = Pe({}, n, t)), $u(e, t), Object.assign(e, t);
  for (const o in ks)
    e[o] == null && (e[o] = ks[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = e;
  return H.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), e.tension = Math.pow(2 * Math.PI / i, 2) * r, e.friction = 4 * Math.PI * a * r / i), e;
}
function $u(e, t) {
  if (!H.und(t.decay))
    e.duration = void 0;
  else {
    const n = !H.und(t.tension) || !H.und(t.friction);
    (n || !H.und(t.frequency) || !H.und(t.damping) || !H.und(t.mass)) && (e.duration = void 0, e.decay = void 0), n && (e.frequency = void 0);
  }
}
const _u = [];
class q7 {
  constructor() {
    this.changed = !1, this.values = _u, this.toValues = null, this.fromValues = _u, this.to = void 0, this.from = void 0, this.config = new U7(), this.immediate = !1;
  }
}
function i1(e, {
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
      p();
    else {
      H.und(n.pause) || (i.paused = ii(n.pause, t));
      let h = r == null ? void 0 : r.pause;
      h !== !0 && (h = i.paused || ii(h, t)), u = Sn(n.delay || 0, t), h ? (i.resumeQueue.add(y), a.pause()) : (a.resume(), y());
    }
    function m() {
      i.resumeQueue.add(y), i.timeouts.delete(f), f.cancel(), u = f.time - X.now();
    }
    function y() {
      u > 0 && !st.skipAnimation ? (i.delayed = !0, f = X.setTimeout(p, u), i.pauseQueue.add(m), i.timeouts.add(f)) : p();
    }
    function p() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(f), e <= (i.cancelId || 0) && (d = !0);
      try {
        a.start(Pe({}, n, {
          callId: e,
          cancel: d
        }), o);
      } catch (h) {
        s(h);
      }
    }
  });
}
const Rl = (e, t) => t.length == 1 ? t[0] : t.some((n) => n.cancelled) ? ar(e.get()) : t.every((n) => n.noop) ? a1(e.get()) : vt(e.get(), t.every((n) => n.finished)), a1 = (e) => ({
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
function o1(e, t, n, r) {
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
    const u = Tl(t, (g, b) => b === "onRest" ? void 0 : g);
    let f, d;
    const m = new Promise((g, b) => (f = g, d = b)), y = (g) => {
      const b = i <= (n.cancelId || 0) && ar(r) || i !== n.asyncId && vt(r, !1);
      if (b)
        throw g.result = b, d(g), g;
    }, p = (g, b) => {
      const x = new ku(), v = new Su();
      return (async () => {
        if (st.skipAnimation)
          throw vi(n), v.result = vt(r, !1), d(v), v;
        y(x);
        const w = H.obj(g) ? Pe({}, g) : Pe({}, b, {
          to: g
        });
        w.parentId = i, Ot(u, (C, $) => {
          H.und(w[$]) && (w[$] = C);
        });
        const E = await r.start(w);
        return y(x), n.paused && await new Promise((C) => {
          n.resumeQueue.add(C);
        }), E;
      })();
    };
    let h;
    if (st.skipAnimation)
      return vi(n), vt(r, !1);
    try {
      let g;
      H.arr(e) ? g = (async (b) => {
        for (const x of b)
          await p(x);
      })(e) : g = Promise.resolve(e(p, r.stop.bind(r))), await Promise.all([g.then(f), m]), h = vt(r.get(), !0, !1);
    } catch (g) {
      if (g instanceof ku)
        h = g.result;
      else if (g instanceof Su)
        h = g.result;
      else
        throw g;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? s : void 0, n.promise = a ? c : void 0);
    }
    return H.fun(o) && X.batchedUpdates(() => {
      o(h, r, r.item);
    }), h;
  })();
}
function vi(e, t) {
  ni(e.timeouts, (n) => n.cancel()), e.pauseQueue.clear(), e.resumeQueue.clear(), e.asyncId = e.asyncTo = e.promise = void 0, t && (e.cancelId = t);
}
class ku extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class Su extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const Ss = (e) => e instanceof Ml;
let K7 = 1;
class Ml extends qd {
  constructor(...t) {
    super(...t), this.id = K7++, this.key = void 0, this._priority = 0;
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
    return st.to(this, t);
  }
  interpolate(...t) {
    return $7(), st.to(this, t);
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
    fi(this, {
      type: "change",
      parent: this,
      value: t,
      idle: n
    });
  }
  _onPriorityChange(t) {
    this.idle || Xa.sort(this), fi(this, {
      type: "priority",
      parent: this,
      priority: t
    });
  }
}
const In = Symbol.for("SpringPhase"), s1 = 1, Os = 2, Fs = 4, Ho = (e) => (e[In] & s1) > 0, qt = (e) => (e[In] & Os) > 0, Dr = (e) => (e[In] & Fs) > 0, Ou = (e, t) => t ? e[In] |= Os | s1 : e[In] &= ~Os, Fu = (e, t) => t ? e[In] |= Fs : e[In] &= ~Fs;
class G7 extends Ml {
  constructor(t, n) {
    if (super(), this.key = void 0, this.animation = new q7(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !H.und(t) || !H.und(n)) {
      const r = H.obj(t) ? Pe({}, t) : Pe({}, n, {
        from: t
      });
      H.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(qt(this) || this._state.asyncTo) || Dr(this);
  }
  get goal() {
    return Ze(this.animation.to);
  }
  get velocity() {
    const t = _t(this);
    return t instanceof Sr ? t.lastVelocity || 0 : t.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Ho(this);
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
    !s && rt(i.to) && (o = Ye(Ze(i.to))), i.values.forEach((f, d) => {
      if (f.done)
        return;
      const m = f.constructor == ur ? 1 : s ? s[d].lastPosition : o[d];
      let y = i.immediate, p = m;
      if (!y) {
        if (p = f.lastPosition, a.tension <= 0) {
          f.done = !0;
          return;
        }
        let h = f.elapsedTime += t;
        const g = i.fromValues[d], b = f.v0 != null ? f.v0 : f.v0 = H.arr(a.velocity) ? a.velocity[d] : a.velocity;
        let x;
        const v = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (H.und(a.duration))
          if (a.decay) {
            const w = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - w) * h);
            p = g + b / (1 - w) * (1 - E), y = Math.abs(f.lastPosition - p) <= v, x = b * E;
          } else {
            x = f.lastVelocity == null ? b : f.lastVelocity;
            const w = a.restVelocity || v / 10, E = a.clamp ? 0 : a.bounce, C = !H.und(E), $ = g == m ? f.v0 > 0 : g < m;
            let A, O = !1;
            const k = 1, D = Math.ceil(t / k);
            for (let I = 0; I < D && (A = Math.abs(x) > w, !(!A && (y = Math.abs(m - p) <= v, y))); ++I) {
              C && (O = p == m || p > m == $, O && (x = -x * E, p = m));
              const T = -a.tension * 1e-6 * (p - m), _ = -a.friction * 1e-3 * x, R = (T + _) / a.mass;
              x = x + R * k, p = p + x * k;
            }
          }
        else {
          let w = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, f.durationProgress > 0 && (f.elapsedTime = a.duration * f.durationProgress, h = f.elapsedTime += t)), w = (a.progress || 0) + h / this._memoizedDuration, w = w > 1 ? 1 : w < 0 ? 0 : w, f.durationProgress = w), p = g + a.easing(w) * (m - g), x = (p - f.lastPosition) / t, y = w == 1;
        }
        f.lastVelocity = x, Number.isNaN(p) && (console.warn("Got NaN while animating:", this), y = !0);
      }
      s && !s[d].done && (y = !1), y ? f.done = !0 : n = !1, f.setValue(p, a.round) && (r = !0);
    });
    const c = _t(this), u = c.getValue();
    if (n) {
      const f = Ze(i.to);
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
    return H.und(t) ? (r = this.queue || [], this.queue = []) : r = [H.obj(t) ? t : Pe({}, n, {
      to: t
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Rl(this, i));
  }
  stop(t) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), vi(this._state, t && this._lastCallId), X.batchedUpdates(() => this._stop(n, t)), this;
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
    r = H.obj(r) ? r[n] : r, (r == null || _s(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Ho(this) || (t.reverse && ([r, i] = [i, r]), i = Ze(i), H.und(i) ? _t(this) || this._set(r) : this._set(i)), a;
  }
  _update(t, n) {
    let r = Pe({}, t);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, Tl(r, (c, u) => /^on/.test(u) ? t1(c, i) : c)), Nu(this, r, "onProps"), jr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return i1(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Dr(this) || (Fu(this, !0), Jr(s.pauseQueue), jr(this, "onPause", vt(this, Vr(this, this.animation.to)), this));
        },
        resume: () => {
          Dr(this) && (Fu(this, !1), qt(this) && this._resume(), Jr(s.resumeQueue), jr(this, "onResume", vt(this, Vr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = l1(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(t, n, r) {
    if (n.cancel)
      return this.stop(!0), r(ar(this));
    const i = !H.und(t.to), a = !H.und(t.from);
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
    a && !i && (!n.default || H.und(d)) && (d = m), n.reverse && ([d, m] = [m, d]);
    const y = !Dt(m, f);
    y && (c.from = m), m = Ze(m);
    const p = !Dt(d, u);
    p && this._focus(d);
    const h = _s(n.to), {
      config: g
    } = c, {
      decay: b,
      velocity: x
    } = g;
    (i || a) && (g.velocity = 0), n.config && !h && z7(g, Sn(n.config, o), n.config !== s.config ? Sn(s.config, o) : void 0);
    let v = _t(this);
    if (!v || H.und(d))
      return r(vt(this, !0));
    const w = H.und(n.reset) ? a && !n.default : !H.und(m) && ii(n.reset, o), E = w ? m : this.get(), C = hi(d), $ = H.num(C) || H.arr(C) || eo(C), A = !h && (!$ || ii(s.immediate || n.immediate, o));
    if (p) {
      const I = $s(d);
      if (I !== v.constructor)
        if (A)
          v = this._set(C);
        else
          throw Error(`Cannot animate between ${v.constructor.name} and ${I.name}, as the "to" prop suggests`);
    }
    const O = v.constructor;
    let k = rt(d), D = !1;
    if (!k) {
      const I = w || !Ho(this) && y;
      (p || I) && (D = Dt(hi(E), C), k = !D), (!Dt(c.immediate, A) && !A || !Dt(g.decay, b) || !Dt(g.velocity, x)) && (k = !0);
    }
    if (D && qt(this) && (c.changed && !w ? k = !0 : k || this._stop(u)), !h && ((k || rt(u)) && (c.values = v.getPayload(), c.toValues = rt(d) ? null : O == ur ? [1] : Ye(C)), c.immediate != A && (c.immediate = A, !A && !w && this._set(u)), k)) {
      const {
        onRest: I
      } = c;
      J(X7, (_) => Nu(this, n, _));
      const T = vt(this, Vr(this, u));
      Jr(this._pendingCalls, T), this._pendingCalls.add(r), c.changed && X.batchedUpdates(() => {
        c.changed = !w, I == null || I(T, this), w ? Sn(s.onRest, T) : c.onStart == null || c.onStart(T, this);
      });
    }
    w && this._set(E), h ? r(o1(n.to, n, this._state, this)) : k ? this._start() : qt(this) && !p ? this._pendingCalls.add(r) : r(a1(E));
  }
  _focus(t) {
    const n = this.animation;
    t !== n.to && (yu(this) && this._detach(), n.to = t, yu(this) && this._attach());
  }
  _attach() {
    let t = 0;
    const {
      to: n
    } = this.animation;
    rt(n) && (kr(n, this), Ss(n) && (t = n.priority + 1)), this.priority = t;
  }
  _detach() {
    const {
      to: t
    } = this.animation;
    rt(t) && di(t, this);
  }
  _set(t, n = !0) {
    const r = Ze(t);
    if (!H.und(r)) {
      const i = _t(this);
      if (!i || !Dt(r, i.getValue())) {
        const a = $s(r);
        !i || i.constructor != a ? Nl(this, a.create(r)) : i.setValue(r), i && X.batchedUpdates(() => {
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
    n || (this._onStart(), Sn(this.animation.onChange, t, this)), Sn(this.defaultProps.onChange, t, this), super._onChange(t, n);
  }
  _start() {
    const t = this.animation;
    _t(this).reset(Ze(t.to)), t.immediate || (t.fromValues = t.values.map((n) => n.lastPosition)), qt(this) || (Ou(this, !0), Dr(this) || this._resume());
  }
  _resume() {
    st.skipAnimation ? this.finish() : Xa.start(this);
  }
  _stop(t, n) {
    if (qt(this)) {
      Ou(this, !1);
      const r = this.animation;
      J(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), fi(this, {
        type: "idle",
        parent: this
      });
      const i = n ? ar(this.get()) : vt(this.get(), Vr(this, t != null ? t : r.to));
      Jr(this._pendingCalls, i), r.changed && (r.changed = !1, jr(this, "onRest", i, this));
    }
  }
}
function Vr(e, t) {
  const n = hi(t), r = hi(e.get());
  return Dt(r, n);
}
function l1(e, t = e.loop, n = e.to) {
  let r = Sn(t);
  if (r) {
    const i = r !== !0 && r1(r), a = (i || e).reverse, o = !i || i.reset;
    return pi(Pe({}, e, {
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || _s(n) ? n : void 0,
      from: o ? e.from : void 0,
      reset: o
    }, i));
  }
}
function pi(e) {
  const {
    to: t,
    from: n
  } = e = r1(e), r = /* @__PURE__ */ new Set();
  return H.obj(t) && Pu(t, r), H.obj(n) && Pu(n, r), e.keys = r.size ? Array.from(r) : null, e;
}
function Y7(e) {
  const t = pi(e);
  return H.und(t.default) && (t.default = Tl(t)), t;
}
function Pu(e, t) {
  Ot(e, (n, r) => n != null && t.add(r));
}
const X7 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Nu(e, t, n) {
  e.animation[n] = t[n] !== n1(t, n) ? t1(t[n], e.key) : void 0;
}
function jr(e, t, ...n) {
  var r, i, a, o;
  (r = (i = e.animation)[t]) == null || r.call(i, ...n), (a = (o = e.defaultProps)[t]) == null || a.call(o, ...n);
}
const Q7 = ["onStart", "onChange", "onRest"];
let J7 = 1;
class ey {
  constructor(t, n) {
    this.id = J7++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), t && this.start(Pe({
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
      H.und(r) || this.springs[n].set(r);
    }
  }
  update(t) {
    return t && this.queue.push(pi(t)), this;
  }
  start(t) {
    let {
      queue: n
    } = this;
    return t ? n = Ye(t).map(pi) : this.queue = [], this._flush ? this._flush(this, n) : (m1(this, n), Ps(this, n));
  }
  stop(t, n) {
    if (t !== !!t && (n = t), n) {
      const r = this.springs;
      J(Ye(n), (i) => r[i].stop(!!t));
    } else
      vi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!t));
    return this;
  }
  pause(t) {
    if (H.und(t))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      J(Ye(t), (r) => n[r].pause());
    }
    return this;
  }
  resume(t) {
    if (H.und(t))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      J(Ye(t), (r) => n[r].resume());
    }
    return this;
  }
  each(t) {
    Ot(this.springs, t);
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
}
function Ps(e, t) {
  return Promise.all(t.map((n) => c1(e, n))).then((n) => Rl(e, n));
}
async function c1(e, t, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = t, u = H.obj(t.default) && t.default;
  o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null);
  const f = H.arr(i) || H.fun(i) ? i : void 0;
  f ? (t.to = void 0, t.onRest = void 0, u && (u.onRest = void 0)) : J(Q7, (h) => {
    const g = t[h];
    if (H.fun(g)) {
      const b = e._events[h];
      t[h] = ({
        finished: x,
        cancelled: v
      }) => {
        const w = b.get(g);
        w ? (x || (w.finished = !1), v && (w.cancelled = !0)) : b.set(g, {
          value: null,
          finished: x || !1,
          cancelled: v || !1
        });
      }, u && (u[h] = t[h]);
    }
  });
  const d = e._state;
  t.pause === !d.paused ? (d.paused = t.pause, Jr(t.pause ? d.pauseQueue : d.resumeQueue)) : d.paused && (t.pause = !0);
  const m = (r || Object.keys(e.springs)).map((h) => e.springs[h].start(t)), y = t.cancel === !0 || n1(t, "cancel") === !0;
  (f || y && d.asyncId) && m.push(i1(++e._lastAsyncId, {
    props: t,
    state: d,
    actions: {
      pause: Es,
      resume: Es,
      start(h, g) {
        y ? (vi(d, e._lastAsyncId), g(ar(e))) : (h.onRest = s, g(o1(f, h, d, e)));
      }
    }
  })), d.paused && await new Promise((h) => {
    d.resumeQueue.add(h);
  });
  const p = Rl(e, await Promise.all(m));
  if (o && p.finished && !(n && p.noop)) {
    const h = l1(t, o, i);
    if (h)
      return m1(e, [h]), c1(e, h, !0);
  }
  return c && X.batchedUpdates(() => c(p, e, e.item)), p;
}
function Au(e, t) {
  const n = Pe({}, e.springs);
  return t && J(Ye(t), (r) => {
    H.und(r.keys) && (r = pi(r)), H.obj(r.to) || (r = Pe({}, r, {
      to: void 0
    })), d1(n, r, (i) => f1(i));
  }), u1(e, n), n;
}
function u1(e, t) {
  Ot(t, (n, r) => {
    e.springs[r] || (e.springs[r] = n, kr(n, e));
  });
}
function f1(e, t) {
  const n = new G7();
  return n.key = e, t && kr(n, t), n;
}
function d1(e, t, n) {
  t.keys && J(t.keys, (r) => {
    (e[r] || (e[r] = n(r)))._prepareNode(t);
  });
}
function m1(e, t) {
  J(t, (n) => {
    d1(e.springs, n, (r) => f1(r, e));
  });
}
function ty(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const ny = ["children"], ro = (e) => {
  let {
    children: t
  } = e, n = ty(e, ny);
  const r = ot(Sa), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = O7(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = Sa;
  return V.createElement(o, {
    value: n
  }, t);
}, Sa = ry(ro, {});
ro.Provider = Sa.Provider;
ro.Consumer = Sa.Consumer;
function ry(e, t) {
  return Object.assign(e, V.createContext(t)), e.Provider._context = e, e.Consumer._context = e, e;
}
const iy = () => {
  const e = [], t = function(i) {
    k7();
    const a = [];
    return J(e, (o, s) => {
      if (H.und(i))
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
      if (H.und(r))
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
    return H.fun(i) ? i(o, a) : i;
  };
  return t._getProps = n, t;
};
function ay(e, t, n) {
  const r = H.fun(t) && t;
  r && !n && (n = []);
  const i = ee(() => r || arguments.length == 3 ? iy() : void 0, []), a = j(0), o = Qd(), s = ee(() => ({
    ctrls: [],
    queue: [],
    flush(b, x) {
      const v = Au(b, x);
      return a.current > 0 && !s.queue.length && !Object.keys(v).some((E) => !b.springs[E]) ? Ps(b, x) : new Promise((E) => {
        u1(b, v), s.queue.push(() => {
          E(Ps(b, x));
        }), o();
      });
    }
  }), []), c = j([...s.ctrls]), u = [], f = wu(e) || 0;
  ee(() => {
    J(c.current.slice(e, f), (b) => {
      W7(b, i), b.stop(!0);
    }), c.current.length = e, d(f, e);
  }, [e]), ee(() => {
    d(0, Math.min(f, e));
  }, n);
  function d(b, x) {
    for (let v = b; v < x; v++) {
      const w = c.current[v] || (c.current[v] = new ey(null, s.flush)), E = r ? r(v, w) : t[v];
      E && (u[v] = Y7(E));
    }
  }
  const m = c.current.map((b, x) => Au(b, u[x])), y = ot(ro), p = wu(y), h = y !== p && B7(y);
  Pl(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: b
    } = s;
    b.length && (s.queue = [], J(b, (x) => x())), J(c.current, (x, v) => {
      i == null || i.add(x), h && x.start({
        default: y
      });
      const w = u[v];
      w && (Z7(x, w.ref), x.ref ? x.queue.push(w) : x.start(w));
    });
  }), Jd(() => () => {
    J(s.ctrls, (b) => b.stop(!0));
  });
  const g = m.map((b) => Pe({}, b));
  return i ? [g, i] : g;
}
function Ne(e, t) {
  const n = H.fun(e), [[r], i] = ay(1, n ? e : [e], n ? t || [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Tu;
(function(e) {
  e.MOUNT = "mount", e.ENTER = "enter", e.UPDATE = "update", e.LEAVE = "leave";
})(Tu || (Tu = {}));
class h1 extends Ml {
  constructor(t, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = t, this.calc = ui(...n);
    const r = this._get(), i = $s(r);
    Nl(this, i.create(r));
  }
  advance(t) {
    const n = this._get(), r = this.get();
    Dt(n, r) || (_t(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Ru(this._active) && Uo(this);
  }
  _get() {
    const t = H.arr(this.source) ? this.source.map(Ze) : Ye(Ze(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle && !Ru(this._active) && (this.idle = !1, J(to(this), (t) => {
      t.done = !1;
    }), st.skipAnimation ? (X.batchedUpdates(() => this.advance()), Uo(this)) : Xa.start(this));
  }
  _attach() {
    let t = 1;
    J(Ye(this.source), (n) => {
      rt(n) && kr(n, this), Ss(n) && (n.idle || this._active.add(n), t = Math.max(t, n.priority + 1));
    }), this.priority = t, this._start();
  }
  _detach() {
    J(Ye(this.source), (t) => {
      rt(t) && di(t, this);
    }), this._active.clear(), Uo(this);
  }
  eventObserved(t) {
    t.type == "change" ? t.idle ? this.advance() : (this._active.add(t.parent), this._start()) : t.type == "idle" ? this._active.delete(t.parent) : t.type == "priority" && (this.priority = Ye(this.source).reduce((n, r) => Math.max(n, (Ss(r) ? r.priority : 0) + 1), 0));
  }
}
function oy(e) {
  return e.idle !== !1;
}
function Ru(e) {
  return !e.size || Array.from(e).every(oy);
}
function Uo(e) {
  e.idle || (e.idle = !0, J(to(e), (t) => {
    t.done = !0;
  }), fi(e, {
    type: "idle",
    parent: e
  }));
}
const sy = (e, ...t) => new h1(e, t);
st.assign({
  createStringInterpolator: Yd,
  to: (e, t) => new h1(e, t)
});
function Il(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const ly = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], v1 = /^--/;
function cy(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !v1.test(e) && !(ai.hasOwnProperty(e) && ai[e]) ? t + "px" : ("" + t).trim();
}
const Mu = {};
function uy(e, t) {
  if (!e.nodeType || !e.setAttribute)
    return !1;
  const n = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", r = t, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = Il(r, ly), f = Object.values(u), d = Object.keys(u).map((m) => n || e.hasAttribute(m) ? m : Mu[m] || (Mu[m] = m.replace(/([A-Z])/g, (y) => "-" + y.toLowerCase())));
  a !== void 0 && (e.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const y = cy(m, i[m]);
      v1.test(m) ? e.style.setProperty(m, y) : e.style[m] = y;
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
const fy = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), dy = ["Webkit", "Ms", "Moz", "O"];
ai = Object.keys(ai).reduce((e, t) => (dy.forEach((n) => e[fy(n, t)] = e[t]), e), ai);
const my = ["x", "y", "z"], hy = /^(matrix|translate|scale|rotate|skew)/, vy = /^(translate)/, py = /^(rotate|skew)/, zo = (e, t) => H.num(e) && e !== 0 ? e + t : e, fa = (e, t) => H.arr(e) ? e.every((n) => fa(n, t)) : H.num(e) ? e === t : parseFloat(e) === t;
class gy extends no {
  constructor(t) {
    let {
      x: n,
      y: r,
      z: i
    } = t, a = Il(t, my);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => zo(u, "px")).join(",")})`, fa(c, 0)])), Ot(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((f) => [f, f === ""]);
      else if (hy.test(u)) {
        if (delete a[u], H.und(c))
          return;
        const f = vy.test(u) ? "px" : py.test(u) ? "deg" : "";
        o.push(Ye(c)), s.push(u === "rotate3d" ? ([d, m, y, p]) => [`rotate3d(${d},${m},${y},${zo(p, f)})`, fa(p, 0)] : (d) => [`${u}(${d.map((m) => zo(m, f)).join(",")})`, fa(d, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new yy(o, s)), super(a);
  }
}
class yy extends qd {
  constructor(t, n) {
    super(), this._value = null, this.inputs = t, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", n = !0;
    return J(this.inputs, (r, i) => {
      const a = Ze(r[0]), [o, s] = this.transforms[i](H.arr(a) ? a : r.map(Ze));
      t += " " + o, n = n && s;
    }), n ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && J(this.inputs, (n) => J(n, (r) => rt(r) && kr(r, this)));
  }
  observerRemoved(t) {
    t == 0 && J(this.inputs, (n) => J(n, (r) => rt(r) && di(r, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), fi(this, t);
  }
}
const by = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], wy = ["scrollTop", "scrollLeft"];
st.assign({
  batchedUpdates: Dm,
  createStringInterpolator: Yd,
  colors: r7
});
const Ey = I7(by, {
  applyAnimatedValues: uy,
  createAnimatedStyle: (e) => new gy(e),
  getComponentProps: (e) => Il(e, wy)
}), ve = Ey.animated;
function Cy(e) {
  return (typeof e == "function" ? e() : e) || document.body;
}
function Or(e, t) {
  if (gr && e) {
    const n = Cy(e);
    return Vm(t, n);
  }
  return t;
}
function xy(e) {
  const t = j(e);
  return e && (t.current = !0), !!t.current;
}
const Fr = (e) => io(e.active, e.forceRender, e.destroyOnClose) ? e.children : null;
function io(e, t, n) {
  const r = xy(e);
  return t || e ? !0 : r ? !n : !1;
}
const $y = {
  click: "onClick"
};
function ln(e, t) {
  const n = Object.assign({}, t.props);
  for (const r of e) {
    const i = $y[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = t.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(t, n);
}
const qo = "adm-mask", _y = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, ky = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, Sy = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, Oy = (e) => {
  const t = z(Sy, e), {
    locale: n
  } = ge(), r = j(null);
  Ga(r, t.visible && t.disableBodyScroll);
  const i = ee(() => {
    var f;
    const d = (f = _y[t.opacity]) !== null && f !== void 0 ? f : t.opacity, m = ky[t.color];
    return m ? `rgba(${m}, ${d})` : t.color;
  }, [t.color, t.opacity]), [a, o] = K(t.visible), s = wl(), {
    opacity: c
  } = Ne({
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
    className: qo,
    ref: r,
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
    className: `${qo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: t.onMaskClick
  }), l.createElement("div", {
    className: `${qo}-content`
  }, t.children))));
  return l.createElement(Fr, {
    active: a,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, Or(t.getContainer, u));
}, Pi = Oy;
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
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "AddOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-\u8DEF\u5F84",
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
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CheckCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CheckCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-\u5F62\u72B6\u7ED3\u5408",
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
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "CheckOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CheckOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-\u8DEF\u5F84",
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
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "ClockCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "ClockCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-\u5F62\u72B6\u7ED3\u5408",
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
    id: "CloseCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CloseCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-\u5F62\u72B6\u7ED3\u5408",
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
    id: "CloseOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "CloseOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Fy(e) {
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
    id: "DownFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "DownFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-\u8DEF\u5F84",
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
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", null, /* @__PURE__ */ V.createElement("rect", {
    id: "DownOutline-\u77E9\u5F62",
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
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", null, /* @__PURE__ */ V.createElement("rect", {
    id: "ExclamationCircleFill-\u77E9\u5F62",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function C1(e) {
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
    id: "InformationCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "InformationCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Py(e) {
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
    id: "LeftOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "LeftOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ny(e) {
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
    id: "MinusOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ay(e) {
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
    id: "QuestionCircleOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "QuestionCircleOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-\u5F62\u72B6",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Ty(e) {
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
    id: "RightOutline-\u77E9\u5F62",
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
function Ry(e) {
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
    id: "SearchOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "SearchOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-\u5F62\u72B6",
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
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ V.createElement("g", {
    id: "SoundOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "SoundOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-\u5F62\u72B6",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Iu(e) {
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
    id: "TextDeletionOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ V.createElement("rect", {
    id: "TextDeletionOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ V.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Ll = {
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
function x1(e) {
  const [t, n] = K(e);
  return Oe(() => {
    n(e);
  }, [e]), t;
}
function Iy(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const Se = {
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
function Lu(e, t, n) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(e, n * 5) : e * t * n / (t + n * e);
}
function Du(e, t, n, r = 0.15) {
  return r === 0 ? Iy(e, t, n) : e < t ? -Lu(t - e, n - t, r) + t : e > n ? +Lu(e - n, n - t, r) + n : e;
}
function Ly(e, [t, n], [r, i]) {
  const [[a, o], [s, c]] = e;
  return [Du(t, a, o, r), Du(n, s, c, i)];
}
function Dy(e, t) {
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
function Vy(e) {
  var t = Dy(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Re(e, t, n) {
  return t = Vy(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Vu(e, t) {
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
    t % 2 ? Vu(Object(n), !0).forEach(function(r) {
      Re(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Vu(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const $1 = {
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
function ju(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}
const jy = ["enter", "leave"];
function By(e = !1, t) {
  return e && !jy.includes(t);
}
function Wy(e, t = "", n = !1) {
  const r = $1[e], i = r && r[t] || t;
  return "on" + ju(e) + ju(i) + (By(n, i) ? "Capture" : "");
}
const Zy = ["gotpointercapture", "lostpointercapture"];
function Hy(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = Zy.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function Uy(e, t = "") {
  const n = $1[e], r = n && n[t] || t;
  return e + r;
}
function oo(e) {
  return "touches" in e;
}
function _1(e) {
  return oo(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function zy(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function qy(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function k1(e) {
  return oo(e) ? qy(e)[0] : e;
}
function Ns(e, t) {
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
function Ky(e) {
  return zy(e).map((t) => t.identifier);
}
function Bu(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Ns(n, r);
}
function Ko(e) {
  const t = k1(e);
  return oo(e) ? t.identifier : t.pointerId;
}
function Wu(e) {
  const t = k1(e);
  return [t.clientX, t.clientY];
}
const Zu = 40, Hu = 800;
function S1(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= Zu, n *= Zu) : r === 2 && (t *= Hu, n *= Hu), [t, n];
}
function Gy(e) {
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
function Oa(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
function Yy() {
}
function Xy(...e) {
  return e.length === 0 ? Yy : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function Uu(e, t) {
  return Object.assign({}, t, e || {});
}
const Qy = 32;
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = t.target, n.currentTarget = t.currentTarget, n.lastOffset = r.from ? Oa(r.from, n) : n.offset, n.offset = n.lastOffset, n.startTime = n.timeStamp = t.timeStamp);
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
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, Gy(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const C = n._delta.map(Math.abs);
      Se.addTo(n._distance, C);
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
      const [C, $] = d;
      m[0] = f[0] !== !1 ? C - f[0] : 0, m[1] = f[1] !== !1 ? $ - f[1] : 0;
    } else
      m[0] = f[0] !== !1 ? o - f[0] : 0, m[1] = f[1] !== !1 ? s - f[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const y = n.offset, p = n._active && !n._blocked || n.active;
    p && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = Oa(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [h, g] = n.offset, [[b, x], [v, w]] = n._bounds;
    n.overflow = [h < b ? -1 : h > x ? 1 : 0, g < v ? -1 : g > w ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = Ly(n._bounds, n.offset, E), n.delta = Se.sub(n.offset, y), this.computeMovement(), p && (!n.last || a > Qy)) {
      n.delta = Se.sub(n.offset, y);
      const C = n.delta.map(Math.abs);
      Se.addTo(n.distance, C), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [C[0] / a, C[1] / a], n.timeDelta = a);
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
function Jy([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class F1 extends O1 {
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
    this.state.offset = Se.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Se.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[_1(t)] : r.axisThreshold;
      n.axis = Jy(n._movement, i);
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
const e8 = (e) => e, zu = 0.15, P1 = {
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
        return Se.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function")
      return e;
    if (e != null)
      return Se.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || e8;
  },
  threshold(e) {
    return Se.toVector(e, 0);
  }
}, t8 = 0, Pr = we(we({}, P1), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(e = t8) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (a) => Pr.bounds(e(a));
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
}), qu = {
  ArrowRight: (e, t = 1) => [e * t, 0],
  ArrowLeft: (e, t = 1) => [-1 * e * t, 0],
  ArrowUp: (e, t = 1) => [0, -1 * e * t],
  ArrowDown: (e, t = 1) => [0, e * t]
};
class n8 extends F1 {
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
      t._bounds = Pr.bounds(i);
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
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = Ko(t), r._pointerActive = !0, this.computeValues(Wu(t)), this.computeInitial(), n.preventScrollAxis && _1(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const n = this.state, r = this.config;
    if (!n._pointerActive)
      return;
    const i = Ko(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = Wu(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = Se.sub(a, n._values), this.computeValues(a)), Se.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
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
    const i = Ko(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [s, c] = n._delta, [u, f] = n._movement, [d, m] = r.swipe.velocity, [y, p] = r.swipe.distance, h = r.swipe.duration;
      if (n.elapsedTime < h) {
        const g = Math.abs(s / n.timeDelta), b = Math.abs(c / n.timeDelta);
        g > d && Math.abs(u) > y && (n.swipe[0] = Math.sign(s)), b > m && Math.abs(f) > p && (n.swipe[1] = Math.sign(c));
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
    this.state._preventScroll = !1, r8(t);
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
    const n = qu[t.key];
    if (n) {
      const r = this.state, i = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), r._delta = n(this.config.keyboardDisplacement, i), r._keyboardActive = !0, Se.addTo(r._movement, r._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in qu && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    t(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(n, "change", this.pointerMove.bind(this)), t(n, "end", this.pointerUp.bind(this)), t(n, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function r8(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const Ai = typeof window < "u" && window.document && window.document.createElement;
function N1() {
  return Ai && "ontouchstart" in window;
}
function i8() {
  return N1() || Ai && window.navigator.maxTouchPoints > 1;
}
function a8() {
  return Ai && "onpointerdown" in window;
}
function o8() {
  return Ai && "exitPointerLock" in window.document;
}
function s8() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const it = {
  isBrowser: Ai,
  gesture: s8(),
  touch: N1(),
  touchscreen: i8(),
  pointer: a8(),
  pointerLock: o8()
}, l8 = 250, c8 = 180, u8 = 0.5, f8 = 50, d8 = 250, m8 = 10, Ku = {
  mouse: 0,
  touch: 0,
  pen: 8
}, h8 = we(we({}, Pr), {}, {
  device(e, t, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && it.pointerLock, it.touch && n ? "touch" : this.pointerLock ? "mouse" : it.pointer && !i ? "pointer" : it.touch ? "touch" : "mouse";
  },
  preventScrollAxis(e, t, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? l8 : void 0, !(!it.touchscreen || n === !1))
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
    const a = Se.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: e = u8,
    distance: t = f8,
    duration: n = d8
  } = {}) {
    return {
      velocity: this.transform(Se.toVector(e)),
      distance: this.transform(Se.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return c8;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? we(we({}, Ku), e) : Ku;
  },
  keyboardDisplacement(e = m8) {
    return e;
  }
});
function A1(e) {
  const [t, n] = e.overflow, [r, i] = e._delta, [a, o] = e._direction;
  (t < 0 && r > 0 && a < 0 || t > 0 && r < 0 && a > 0) && (e._movement[0] = e._movementBound[0]), (n < 0 && i > 0 && o < 0 || n > 0 && i < 0 && o > 0) && (e._movement[1] = e._movementBound[1]);
}
const v8 = 30, p8 = 100;
class g8 extends O1 {
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
    t === "wheel" ? this.state.offset = Se.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * v8 - Math.abs(r);
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
    const i = Bu(t, n._touchIds);
    !i || this.pinchStart(t, i);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((o) => i.has(o)) || (r.size < 2 && r.set(t.pointerId, t), n._pointerEvents.size < 2))
      return;
    this.start(t);
    const a = Ns(...Array.from(r.values()));
    !a || this.pinchStart(t, a);
  }
  pinchStart(t, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const n = Bu(t, this.state._touchIds);
    !n || this.pinchMove(t, n);
  }
  pointerMove(t) {
    const n = this.state._pointerEvents;
    if (n.has(t.pointerId) && n.set(t.pointerId, t), !this.state._active)
      return;
    const r = Ns(...Array.from(n.values()));
    !r || this.pinchMove(t, r);
  }
  pinchMove(t, n) {
    const r = this.state, i = r._values[1], a = n.angle - i;
    let o = 0;
    Math.abs(a) > 270 && (o += Math.sign(a)), this.computeValues([n.distance, n.angle - 360 * o]), r.origin = n.origin, r.turns = o, r._movement = [r._values[0] / r._initial[0] - 1, r._values[1] - r._initial[1]], this.compute(t), this.emit();
  }
  touchEnd(t) {
    this.ctrl.setEventIds(t), !!this.state._active && this.state._touchIds.some((n) => !this.ctrl.touchIds.has(n)) && (this.state._active = !1, this.compute(t), this.emit());
  }
  pointerEnd(t) {
    const n = this.state;
    this.ctrl.setEventIds(t);
    try {
      t.target.releasePointerCapture(t.pointerId);
    } catch {
    }
    n._pointerEvents.has(t.pointerId) && n._pointerEvents.delete(t.pointerId), !!n._active && n._pointerEvents.size < 2 && (n._active = !1, this.compute(t), this.emit());
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
    n._movement = [t.scale - 1, t.rotation], n._delta = Se.sub(n._movement, r), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    !this.state._active || (this.state._active = !1, this.compute(t), this.emit());
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
    r._delta = [-S1(t)[1] / p8 * r.offset[0], 0], Se.addTo(r._movement, r._delta), A1(r), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    n && (t(n, "start", this[n + "Start"].bind(this)), t(n, "change", this[n + "Move"].bind(this)), t(n, "end", this[n + "End"].bind(this)), t(n, "cancel", this[n + "End"].bind(this)), t("lostPointerCapture", "", this[n + "End"].bind(this))), this.config.pinchOnWheel && t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const y8 = we(we({}, P1), {}, {
  device(e, t, {
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
  bounds(e, t, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const s = Uu(Oa(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    }, a = (o) => {
      const s = Uu(Oa(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(e, t, n) {
    return this.lockDirection = n.axis === "lock", Se.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  },
  pinchOnWheel(e = !0) {
    return e;
  }
});
we(we({}, Pr), {}, {
  mouseOnly: (e = !0) => e
});
class b8 extends F1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = S1(t), Se.addTo(n._movement, n._delta), A1(n), this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const w8 = Pr;
we(we({}, Pr), {}, {
  mouseOnly: (e = !0) => e
});
const Dl = /* @__PURE__ */ new Map(), As = /* @__PURE__ */ new Map();
function Vl(e) {
  Dl.set(e.key, e.engine), As.set(e.key, e.resolver);
}
const T1 = {
  key: "drag",
  engine: n8,
  resolver: h8
}, E8 = {
  key: "pinch",
  engine: g8,
  resolver: y8
}, C8 = {
  key: "wheel",
  engine: b8,
  resolver: w8
};
function x8(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function $8(e, t) {
  if (e == null)
    return {};
  var n = x8(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
const _8 = {
  target(e) {
    if (e)
      return () => "current" in e ? e.current : e;
  },
  enabled(e = !0) {
    return e;
  },
  window(e = it.isBrowser ? window : void 0) {
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
}, k8 = ["target", "eventOptions", "window", "enabled", "transform"];
function da(e = {}, t) {
  const n = {};
  for (const [r, i] of Object.entries(t))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, e[r], r, e);
        break;
      case "object":
        n[r] = da(e[r], i);
        break;
      case "boolean":
        i && (n[r] = e[r]);
        break;
    }
  return n;
}
function S8(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = $8(r, k8);
  if (n.shared = da({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, _8), t) {
    const f = As.get(t);
    n[t] = da(we({
      shared: n.shared
    }, u), f);
  } else
    for (const f in u) {
      const d = As.get(f);
      d && (n[f] = da(we({
        shared: n.shared
      }, u[f]), d));
    }
  return n;
}
class R1 {
  constructor(t, n) {
    Re(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, a) {
    const o = this._listeners, s = Uy(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = we(we({}, c), a);
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
class O8 {
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
class F8 {
  constructor(t) {
    Re(this, "gestures", /* @__PURE__ */ new Set()), Re(this, "_targetEventStore", new R1(this)), Re(this, "gestureEventStores", {}), Re(this, "gestureTimeoutStores", {}), Re(this, "handlers", {}), Re(this, "config", {}), Re(this, "pointerIds", /* @__PURE__ */ new Set()), Re(this, "touchIds", /* @__PURE__ */ new Set()), Re(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), P8(this, t);
  }
  setEventIds(t) {
    if (oo(t))
      return this.touchIds = new Set(Ky(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = S8(t, n, this.config);
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
          const s = this.config[o], c = Gu(r, s.eventOptions, !!i);
          if (s.enabled) {
            const u = Dl.get(o);
            new u(this, t, o).bind(c);
          }
        }
        const a = Gu(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](we(we({}, this.state.shared), {}, {
            event: s,
            args: t
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = Xy(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = Hy(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Hn(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new R1(e, t), e.gestureTimeoutStores[t] = new O8();
}
function P8(e, t) {
  t.drag && Hn(e, "drag"), t.wheel && Hn(e, "wheel"), t.scroll && Hn(e, "scroll"), t.move && Hn(e, "move"), t.pinch && Hn(e, "pinch"), t.hover && Hn(e, "hover");
}
const Gu = (e, t, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const f = (c = o.capture) !== null && c !== void 0 ? c : t.capture, d = (u = o.passive) !== null && u !== void 0 ? u : t.passive;
  let m = s ? r : Wy(r, i, f);
  n && d && (m += "Passive"), e[m] = e[m] || [], e[m].push(a);
}, N8 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function A8(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    N8.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function Un(e, t, n, r, i, a) {
  if (!e.has(n) || !Dl.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let f;
    return u.first && o in t && t[o](u), n in t && (f = t[n](u)), u.last && s in t && t[s](u), f;
  };
  i[r] = c, a[r] = a[r] || {};
}
function T8(e, t) {
  const [n, r, i] = A8(e), a = {};
  return Un(i, n, "onDrag", "drag", a, t), Un(i, n, "onWheel", "wheel", a, t), Un(i, n, "onScroll", "scroll", a, t), Un(i, n, "onPinch", "pinch", a, t), Un(i, n, "onMove", "move", a, t), Un(i, n, "onHover", "hover", a, t), {
    handlers: a,
    config: t,
    nativeHandlers: r
  };
}
function jl(e, t = {}, n, r) {
  const i = l.useMemo(() => new F8(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function Nt(e, t) {
  return Vl(T1), jl({
    drag: e
  }, t || {}, "drag");
}
function R8(e, t) {
  return Vl(C8), jl({
    wheel: e
  }, t || {}, "wheel");
}
function M8(e) {
  return e.forEach(Vl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = T8(n, r || {});
    return jl(i, o, void 0, a);
  };
}
const Gi = "adm-popup", I8 = Object.assign(Object.assign({}, Ll), {
  closeOnSwipe: !1,
  position: "bottom"
}), L8 = (e) => {
  const t = z(I8, e), n = B(`${Gi}-body`, t.bodyClassName, `${Gi}-body-position-${t.position}`), {
    locale: r
  } = ge(), [i, a] = K(t.visible), o = j(null);
  Ga(o, t.disableBodyScroll && i ? "strict" : !1), Oe(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const s = wl(), {
    percent: c
  } = Ne({
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
  }), u = Nt(({
    swipe: [, m]
  }) => {
    var y;
    !t.closeOnSwipe || (m === 1 && t.position === "bottom" || m === -1 && t.position === "top") && ((y = t.onClose) === null || y === void 0 || y.call(t));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(t.position)
  }), f = x1(i && t.visible), d = ln(t.stopPropagation, Z(t, l.createElement("div", Object.assign({
    className: Gi,
    onClick: t.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(t.position) ? "none" : "auto"
    }
  }, u()), t.mask && l.createElement(Pi, {
    visible: f,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (m) => {
      var y, p;
      (y = t.onMaskClick) === null || y === void 0 || y.call(t, m), t.closeOnMaskClick && ((p = t.onClose) === null || p === void 0 || p.call(t));
    },
    className: t.maskClassName,
    style: t.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement(ve.div, {
    className: n,
    style: Object.assign(Object.assign({}, t.bodyStyle), {
      transform: c.to((m) => t.position === "bottom" ? `translate(0, ${m}%)` : t.position === "top" ? `translate(0, -${m}%)` : t.position === "left" ? `translate(-${m}%, 0)` : t.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: B(`${Gi}-close-icon`, "adm-plain-anchor"),
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
  }, Or(t.getContainer, d));
}, Nr = L8;
const Yu = "adm-safe-area", D8 = (e) => Z(e, l.createElement("div", {
  className: B(Yu, `${Yu}-position-${e.position}`)
})), Ar = D8, Fa = Object.assign({}, Lm), {
  version: V8,
  render: j8,
  unmountComponentAtNode: B8
} = Fa;
let so;
try {
  Number((V8 || "").split(".")[0]) >= 18 && Fa.createRoot && (so = Fa.createRoot);
} catch {
}
function Xu(e) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: t
  } = Fa;
  t && typeof t == "object" && (t.usingClientEntryPoint = e);
}
const Pa = "__antd_mobile_root__";
function W8(e, t) {
  j8(e, t);
}
function Z8(e, t) {
  Xu(!0);
  const n = t[Pa] || so(t);
  Xu(!1), n.render(e), t[Pa] = n;
}
function H8(e, t) {
  if (so) {
    Z8(e, t);
    return;
  }
  W8(e, t);
}
function U8(e) {
  return B8(e);
}
function z8(e) {
  return ke(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var t;
      (t = e[Pa]) === null || t === void 0 || t.unmount(), delete e[Pa];
    });
  });
}
function q8(e) {
  return so ? z8(e) : U8(e);
}
function Ti(e) {
  const t = document.createElement("div");
  document.body.appendChild(t);
  function n() {
    q8(t) && t.parentNode && t.parentNode.removeChild(t);
  }
  return H8(e, t), n;
}
function Tr(e) {
  const t = l.forwardRef((i, a) => {
    const [o, s] = K(!1), c = j(!1), [u, f] = K(e), d = j(0);
    Y(() => {
      c.current ? y() : s(!0);
    }, []);
    function m() {
      var p, h;
      c.current = !0, s(!1), (h = (p = u.props).onClose) === null || h === void 0 || h.call(p);
    }
    function y() {
      var p, h;
      r(), (h = (p = u.props).afterClose) === null || h === void 0 || h.call(p);
    }
    return ye(a, () => ({
      close: m,
      replace: (p) => {
        var h, g;
        d.current++, (g = (h = u.props).afterClose) === null || g === void 0 || g.call(h), f(p);
      }
    })), l.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: d.current,
      visible: o,
      onClose: m,
      afterClose: y
    }));
  }), n = l.createRef(), r = Ti(l.createElement(t, {
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
const De = "adm-action-sheet", K8 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, M1 = (e) => {
  const t = z(K8, e), {
    styles: n
  } = t;
  return l.createElement(Nr, {
    visible: t.visible,
    onMaskClick: () => {
      var r, i;
      (r = t.onMaskClick) === null || r === void 0 || r.call(t), t.closeOnMaskClick && ((i = t.onClose) === null || i === void 0 || i.call(t));
    },
    afterClose: t.afterClose,
    className: B(`${De}-popup`, t.popupClassName),
    style: t.popupStyle,
    getContainer: t.getContainer,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender,
    bodyStyle: n == null ? void 0 : n.body,
    maskStyle: n == null ? void 0 : n.mask
  }, Z(t, l.createElement("div", {
    className: De
  }, t.extra && l.createElement("div", {
    className: `${De}-extra`
  }, t.extra), l.createElement("div", {
    className: `${De}-button-list`
  }, t.actions.map((r, i) => l.createElement("div", {
    key: r.key,
    className: `${De}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${De}-button-item`, {
      [`${De}-button-item-danger`]: r.danger,
      [`${De}-button-item-disabled`]: r.disabled,
      [`${De}-button-item-bold`]: r.bold
    }),
    onClick: () => {
      var a, o, s;
      (a = r.onClick) === null || a === void 0 || a.call(r), (o = t.onAction) === null || o === void 0 || o.call(t, r, i), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    },
    role: "option",
    "aria-disabled": r.disabled
  }, l.createElement("div", {
    className: `${De}-button-item-name`
  }, r.text), r.description && l.createElement("div", {
    className: `${De}-button-item-description`
  }, r.description))))), t.cancelText && l.createElement("div", {
    className: `${De}-cancel`,
    role: "option",
    "aria-label": t.cancelText
  }, l.createElement("div", {
    className: `${De}-button-item-wrapper`
  }, l.createElement("a", {
    className: B("adm-plain-anchor", `${De}-button-item`),
    onClick: t.onClose
  }, l.createElement("div", {
    className: `${De}-button-item-name`
  }, t.cancelText)))), t.safeArea && l.createElement(Ar, {
    position: "bottom"
  }))));
};
function G8(e) {
  return Tr(l.createElement(M1, Object.assign({}, e)));
}
const Hk = ie(M1, {
  show: G8
});
const Qu = "adm-auto-center", Y8 = (e) => Z(e, l.createElement("div", {
  className: Qu
}, l.createElement("div", {
  className: `${Qu}-content`
}, e.children))), gi = Y8;
const X8 = je(() => l.createElement("svg", {
  className: "adm-avatar-fallback",
  width: "88px",
  height: "88px",
  viewBox: "0 0 88 88",
  version: "1.1"
}, l.createElement("title", null, "\u7F16\u7EC4 3"), l.createElement("defs", null, l.createElement("polygon", {
  id: "path-1",
  points: "0 0 88 0 88 88 0 88"
})), l.createElement("g", {
  id: "\u9875\u9762-1",
  stroke: "none",
  strokeWidth: "1",
  fill: "none",
  fillRule: "evenodd"
}, l.createElement("g", {
  id: "\u8BED\u96C0",
  transform: "translate(-495.000000, -71.000000)"
}, l.createElement("g", {
  id: "\u7F16\u7EC4-3",
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
  id: "\u5F62\u72B6",
  fill: "#CCCCCC",
  fillRule: "nonzero",
  mask: "url(#mask-2)"
}))))));
var Bl = {}, Q8 = pt && pt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Bl, "__esModule", { value: !0 });
var Wl = Bl.staged = void 0;
const J8 = Q8(l);
function I1(e) {
  return typeof e == "function" ? J8.default.createElement(e9, { stage: e }) : e;
}
function e9(e) {
  const t = e.stage();
  return I1(t);
}
function t9(e) {
  return function(n, r) {
    const i = e(n, r);
    return I1(i);
  };
}
Wl = Bl.staged = t9;
function On(e) {
  return typeof e == "number" ? `${e}px` : e;
}
const n9 = (e) => {
  const t = j(null), [n] = i6(t);
  return Y(() => {
    n && e.onActive();
  }, [n]), l.createElement("div", {
    ref: t
  });
}, Ri = wd(Oe), r9 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), i9 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Na = "adm-image", a9 = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Na}-tip`
  }, l.createElement(r9, null)),
  fallback: l.createElement("div", {
    className: `${Na}-tip`
  }, l.createElement(i9, null)),
  lazy: !1,
  draggable: !1
}, o9 = Wl((e) => {
  const t = z(a9, e), [n, r] = K(!1), [i, a] = K(!1), o = j(null), s = j(null);
  let c = t.src, u = t.srcSet;
  const [f, d] = K(!t.lazy);
  c = f ? t.src : void 0, u = f ? t.srcSet : void 0, Ri(() => {
    r(!1), a(!1);
  }, [c]), Y(() => {
    var p;
    !((p = s.current) === null || p === void 0) && p.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, t.fallback);
    const p = l.createElement("img", {
      ref: s,
      id: t.id,
      className: `${Na}-img`,
      src: c,
      alt: t.alt,
      onClick: t.onClick,
      onLoad: (h) => {
        var g;
        r(!0), (g = t.onLoad) === null || g === void 0 || g.call(t, h);
      },
      onError: (h) => {
        var g;
        a(!0), (g = t.onError) === null || g === void 0 || g.call(t, h);
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
    return l.createElement(l.Fragment, null, !n && t.placeholder, p);
  }
  const y = {};
  return t.width && (y["--width"] = On(t.width), y.width = On(t.width)), t.height && (y["--height"] = On(t.height), y.height = On(t.height)), Z(t, l.createElement("div", {
    ref: o,
    className: Na,
    style: y,
    onClick: t.onContainerClick
  }, t.lazy && !f && l.createElement(n9, {
    onActive: () => {
      d(!0);
    }
  }), m()));
}), lo = o9, s9 = "adm-avatar", l9 = {
  fallback: l.createElement(X8, null),
  fit: "cover"
}, c9 = (e) => {
  const t = z(l9, e);
  return Z(t, l.createElement(lo, {
    className: s9,
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
}, Uk = c9;
const zn = "adm-badge", L1 = l.createElement(l.Fragment, null), u9 = (e) => {
  const {
    content: t,
    color: n,
    children: r
  } = e, i = t === L1, a = B(zn, {
    [`${zn}-fixed`]: !!r,
    [`${zn}-dot`]: i,
    [`${zn}-bordered`]: e.bordered
  }), o = t || t === 0 ? Z(e, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${zn}-content`
  }, t))) : null;
  return r ? l.createElement("div", {
    className: B(`${zn}-wrapper`, e.wrapperClassName),
    style: e.wrapperStyle
  }, r, o) : o;
}, Ts = ie(u9, {
  dot: L1
});
const f9 = "adm-dot-loading", d9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, m9 = {
  color: "default"
}, D1 = je((e) => {
  var t;
  const n = z(m9, e);
  return Z(n, l.createElement("div", {
    style: {
      color: (t = d9[n.color]) !== null && t !== void 0 ? t : n.color
    },
    className: B("adm-loading", f9)
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
}), V1 = D1;
function j1(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
function h9() {
  return gr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const et = "adm-button", v9 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(V1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, p9 = fe((e, t) => {
  const n = z(v9, e), [r, i] = K(!1), a = j(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  ye(t, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => ke(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const f = n.onClick(u);
    if (j1(f))
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
}), Wt = p9;
const Ju = () => l.createElement("svg", {
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
})))))), ef = () => l.createElement("svg", {
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
var B1 = { exports: {} };
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
        var f, d, m, y, p = o(this), h = (f = this.isoWeekYear(), d = this.$u, m = (d ? a.utc : a)().year(f).startOf("year"), y = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (y += 7), m.add(y, n));
        return p.diff(h, "week") + 1;
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
})(B1);
const co = B1.exports;
function te(e) {
  const {
    value: t,
    defaultValue: n,
    onChange: r
  } = e, i = Cd(), a = j(t !== void 0 ? t : n);
  t !== void 0 && (a.current = t);
  const o = Ut((s, c = !1) => {
    const u = typeof s == "function" ? s(a.current) : s;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function g9(e, t) {
  return e.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return t[r];
  });
}
const uo = !1;
function Ie(e, t) {
  uo && console.warn(`[antd-mobile: ${e}] ${t}`);
}
function y9(e, t) {
  uo && console.error(`[antd-mobile: ${e}] ${t}`);
}
function tf(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function Go(e) {
  return me().year(e.year).month(e.month - 1).date(1);
}
me.extend(co);
const he = "adm-calendar", b9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Ju, null),
  prevYearButton: l.createElement(ef, null),
  nextMonthButton: l.createElement(Ju, null),
  nextYearButton: l.createElement(ef, null)
}, w9 = fe((e, t) => {
  const n = me(), r = z(b9, e), {
    locale: i
  } = ge(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const v = a.pop();
    v && a.unshift(v);
  }
  const [o, s] = te({
    value: r.value === void 0 ? void 0 : tf(r.selectionMode, r.value),
    defaultValue: tf(r.selectionMode, r.defaultValue),
    onChange: (v) => {
      var w, E;
      r.selectionMode === "single" ? (w = r.onChange) === null || w === void 0 || w.call(r, v ? v[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, v));
    }
  }), [c, u] = K(!1), [f, d] = K(() => me(o ? o[0] : n).date(1));
  vl(() => {
    var v;
    (v = r.onPageChange) === null || v === void 0 || v.call(r, f.year(), f.month() + 1);
  }, [f]), ye(t, () => ({
    jumpTo: (v) => {
      let w;
      typeof v == "function" ? w = v({
        year: f.year(),
        month: f.month() + 1
      }) : w = v, d(Go(w));
    },
    jumpToToday: () => {
      d(me().date(1));
    }
  }));
  const m = (v, w, E) => {
    const C = f[v](w, E);
    if (v === "subtract" && r.minPage) {
      const $ = Go(r.minPage);
      if (C.isBefore($, E))
        return;
    }
    if (v === "add" && r.maxPage) {
      const $ = Go(r.maxPage);
      if (C.isAfter($, E))
        return;
    }
    d(C);
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
  }, g9(i.Calendar.yearAndMonth, {
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
  }, r.nextYearButton)), p = ee(() => r.max && me(r.max), [r.max]), h = ee(() => r.min && me(r.min), [r.min]);
  function g() {
    var v;
    const w = [];
    let E = f.subtract(f.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); w.length < 6 * 7; ) {
      const C = E;
      let $ = !1, A = !1, O = !1, k = !1, D = !1;
      if (o) {
        const [_, R] = o;
        A = C.isSame(_, "day"), O = C.isSame(R, "day"), $ = A || O || C.isAfter(_, "day") && C.isBefore(R, "day"), $ && (k = (w.length % 7 === 0 || C.isSame(C.startOf("month"), "day")) && !A, D = (w.length % 7 === 6 || C.isSame(C.endOf("month"), "day")) && !O);
      }
      const I = C.month() === f.month(), T = r.shouldDisableDate ? r.shouldDisableDate(C.toDate()) : p && C.isAfter(p, "day") || h && C.isBefore(h, "day");
      w.push(l.createElement("div", {
        key: C.valueOf(),
        className: B(`${he}-cell`, (T || !I) && `${he}-cell-disabled`, I && {
          [`${he}-cell-today`]: C.isSame(n, "day"),
          [`${he}-cell-selected`]: $,
          [`${he}-cell-selected-begin`]: A,
          [`${he}-cell-selected-end`]: O,
          [`${he}-cell-selected-row-begin`]: k,
          [`${he}-cell-selected-row-end`]: D
        }),
        onClick: () => {
          if (!r.selectionMode || T)
            return;
          const _ = C.toDate();
          I || d(C.clone().date(1));
          function R() {
            if (!r.allowClear || !o)
              return !1;
            const [N, S] = o;
            return C.isSame(N, "date") && C.isSame(S, "day");
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
      }, r.renderDate ? r.renderDate(C.toDate()) : C.date()), l.createElement("div", {
        className: `${he}-cell-bottom`
      }, (v = r.renderLabel) === null || v === void 0 ? void 0 : v.call(r, C.toDate())))), E = E.add(1, "day");
    }
    return w;
  }
  const b = l.createElement("div", {
    className: `${he}-cells`
  }, g()), x = l.createElement("div", {
    className: `${he}-mark`
  }, a.map((v, w) => l.createElement("div", {
    key: w,
    className: `${he}-mark-cell`
  }, v)));
  return Z(r, l.createElement("div", {
    className: he
  }, y, x, b));
}), zk = w9;
const Yi = "adm-divider", E9 = {
  contentPosition: "center",
  direction: "horizontal"
}, C9 = (e) => {
  const t = z(E9, e);
  return Z(t, l.createElement("div", {
    className: B(Yi, `${Yi}-${t.direction}`, `${Yi}-${t.contentPosition}`)
  }, t.children && l.createElement("div", {
    className: `${Yi}-content`
  }, t.children)));
}, Rs = C9;
var W1 = { exports: {} };
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
})(W1);
const x9 = W1.exports;
function nf(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function $9(e) {
  return me().year(e.year).month(e.month - 1).date(1);
}
me.extend(co);
me.extend(x9);
const _e = "adm-calendar-picker-view", _9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, k9 = fe((e, t) => {
  var n;
  const r = me(), i = z(_9, e), {
    locale: a
  } = ge(), o = [...a.Calendar.markItems];
  if (i.weekStartsOn === "Sunday") {
    const v = o.pop();
    v && o.unshift(v);
  }
  const [s, c] = te({
    value: i.value === void 0 ? void 0 : nf(i.selectionMode, i.value),
    defaultValue: nf(i.selectionMode, i.defaultValue),
    onChange: (v) => {
      var w, E;
      i.selectionMode === "single" ? (w = i.onChange) === null || w === void 0 || w.call(i, v ? v[0] : null) : i.selectionMode === "range" && ((E = i.onChange) === null || E === void 0 || E.call(i, v));
    }
  }), [u, f] = K(!1), [d, m] = K(() => me(s ? s[0] : r).date(1));
  ye(t, () => ({
    jumpTo: (v) => {
      let w;
      typeof v == "function" ? w = v({
        year: d.year(),
        month: d.month() + 1
      }) : w = v, m($9(w));
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
  }, (n = i.title) !== null && n !== void 0 ? n : a.Calendar.title)), p = ee(() => i.max ? me(i.max) : d.add(6, "month"), [i.max, d]), h = ee(() => i.min ? me(i.min) : d, [i.min, d]);
  function g() {
    var v;
    const w = [];
    let E = h;
    for (; E.isSameOrBefore(p, "month"); ) {
      const C = E.year(), $ = E.month(), A = {
        year: C,
        month: $ + 1
      };
      w.push(l.createElement("div", {
        key: `${C}-${$}`
      }, l.createElement("div", {
        className: `${_e}-title`
      }, (v = a.Calendar.yearAndMonth) === null || v === void 0 ? void 0 : v.replace(/\${(.*?)}/g, (O, k) => {
        var D;
        return (D = A[k]) === null || D === void 0 ? void 0 : D.toString();
      })), l.createElement("div", {
        className: `${_e}-cells`
      }, Array(i.weekStartsOn === "Monday" ? E.date(1).isoWeekday() - 1 : E.date(1).isoWeekday()).fill(null).map((O, k) => l.createElement("div", {
        key: k,
        className: `${_e}-cell`
      })), Array(E.daysInMonth()).fill(null).map((O, k) => {
        var D;
        const I = E.date(k + 1);
        let T = !1, _ = !1, R = !1, N = !1, S = !1;
        if (s) {
          const [F, L] = s;
          _ = I.isSame(F, "day"), R = I.isSame(L, "day"), T = _ || R || I.isAfter(F, "day") && I.isBefore(L, "day"), T && (N = (w.length % 7 === 0 || I.isSame(I.startOf("month"), "day")) && !_, S = (w.length % 7 === 6 || I.isSame(I.endOf("month"), "day")) && !R);
        }
        const M = i.shouldDisableDate ? i.shouldDisableDate(I.toDate()) : p && I.isAfter(p, "day") || h && I.isBefore(h, "day"), P = () => {
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
            [`${_e}-cell-selected-row-end`]: S,
            [`${_e}-cell-disabled`]: !!M
          }),
          onClick: () => {
            if (!i.selectionMode || M)
              return;
            const F = I.toDate();
            function L() {
              if (!i.allowClear || !s)
                return !1;
              const [W, U] = s;
              return I.isSame(W, "date") && I.isSame(U, "day");
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
        }, P()), l.createElement("div", {
          className: `${_e}-cell-date`
        }, i.renderDate ? i.renderDate(I.toDate()) : I.date()), l.createElement("div", {
          className: `${_e}-cell-bottom`
        }, (D = i.renderBottom) === null || D === void 0 ? void 0 : D.call(i, I.toDate())));
      })))), E = E.add(1, "month");
    }
    return w;
  }
  const b = l.createElement("div", {
    className: `${_e}-body`
  }, g()), x = l.createElement("div", {
    className: `${_e}-mark`
  }, o.map((v, w) => l.createElement("div", {
    key: w,
    className: `${_e}-mark-cell`
  }, v)));
  return Z(i, l.createElement("div", {
    className: _e
  }, y, x, b));
}), S9 = k9, Xi = "adm-calendar-picker", O9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  usePopup: !0,
  selectionMode: "single"
}, F9 = fe((e, t) => {
  const n = z(O9, e), {
    locale: r
  } = ge(), i = t != null ? t : j(null), {
    visible: a,
    confirmText: o,
    popupClassName: s,
    popupStyle: c,
    popupBodyStyle: u,
    forceRender: f,
    closeOnMaskClick: d,
    onClose: m,
    onConfirm: y,
    onMaskClick: p
  } = n, h = yr(n, ["visible", "confirmText", "popupClassName", "popupStyle", "popupBodyStyle", "forceRender", "closeOnMaskClick", "onClose", "onConfirm", "onMaskClick"]), g = l.createElement("div", {
    className: `${Xi}-footer`
  }, l.createElement(Rs, null), l.createElement("div", {
    className: `${Xi}-footer-bottom`
  }, l.createElement(Wt, {
    color: "primary",
    onClick: () => {
      var b, x, v, w;
      const E = (x = (b = i.current) === null || b === void 0 ? void 0 : b.getDateRange()) !== null && x !== void 0 ? x : null;
      n.selectionMode === "single" ? (v = n.onConfirm) === null || v === void 0 || v.call(n, E ? E[0] : null) : n.selectionMode === "range" && ((w = n.onConfirm) === null || w === void 0 || w.call(n, E)), m == null || m();
    }
  }, o != null ? o : r.Calendar.confirm)));
  return Z(n, l.createElement("div", {
    className: Xi
  }, l.createElement(Nr, {
    visible: a,
    className: B(`${Xi}-popup`, s),
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
      p == null || p(), d && (m == null || m());
    }
  }, l.createElement(S9, Object.assign({
    ref: i
  }, h)), g)));
}), qk = F9;
function Mi(e, t) {
  const n = Ut(e);
  Oe(() => {
    const r = t.current;
    if (!!r)
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
function Zl(e, t, n) {
  const r = Ut(e);
  Y(() => {
    const i = new MutationObserver(() => {
      r();
    });
    if (!!t.current)
      return i.observe(t.current, n), () => {
        i.disconnect();
      };
  }, [t]);
}
function $e(e, t, n) {
  let r = e;
  return t !== void 0 && (r = Math.max(e, t)), n !== void 0 && (r = Math.min(r, n)), r;
}
const Z1 = (e, t) => {
  const [{
    scrollLeft: n
  }, r] = Ne(() => ({
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
    const h = $e(u - (d - f) / 2, 0, m - d);
    r.start({
      scrollLeft: h,
      from: {
        scrollLeft: y
      },
      immediate: a && !n.isAnimating
    });
  }
  return Oe(() => {
    i(!0);
  }, []), Ri(() => {
    i();
  }, [t]), Zl(() => {
    i(!0);
  }, e, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), {
    scrollLeft: n,
    animate: i
  };
};
const Qi = "adm-scroll-mask", P9 = (e) => {
  const t = j(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Ne(() => ({
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
    if (!!o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), l.createElement(l.Fragment, null, l.createElement(ve.div, {
    ref: t,
    className: B(Qi, `${Qi}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(ve.div, {
    className: B(Qi, `${Qi}-right`),
    style: {
      opacity: r
    }
  }));
}, H1 = P9;
var Aa = { exports: {} }, oe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hl = Symbol.for("react.element"), Ul = Symbol.for("react.portal"), fo = Symbol.for("react.fragment"), mo = Symbol.for("react.strict_mode"), ho = Symbol.for("react.profiler"), vo = Symbol.for("react.provider"), po = Symbol.for("react.context"), N9 = Symbol.for("react.server_context"), go = Symbol.for("react.forward_ref"), yo = Symbol.for("react.suspense"), bo = Symbol.for("react.suspense_list"), wo = Symbol.for("react.memo"), Eo = Symbol.for("react.lazy"), A9 = Symbol.for("react.offscreen"), U1;
U1 = Symbol.for("react.module.reference");
function ct(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Hl:
        switch (e = e.type, e) {
          case fo:
          case ho:
          case mo:
          case yo:
          case bo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case N9:
              case po:
              case go:
              case Eo:
              case wo:
              case vo:
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
oe.ContextConsumer = po;
oe.ContextProvider = vo;
oe.Element = Hl;
oe.ForwardRef = go;
oe.Fragment = fo;
oe.Lazy = Eo;
oe.Memo = wo;
oe.Portal = Ul;
oe.Profiler = ho;
oe.StrictMode = mo;
oe.Suspense = yo;
oe.SuspenseList = bo;
oe.isAsyncMode = function() {
  return !1;
};
oe.isConcurrentMode = function() {
  return !1;
};
oe.isContextConsumer = function(e) {
  return ct(e) === po;
};
oe.isContextProvider = function(e) {
  return ct(e) === vo;
};
oe.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Hl;
};
oe.isForwardRef = function(e) {
  return ct(e) === go;
};
oe.isFragment = function(e) {
  return ct(e) === fo;
};
oe.isLazy = function(e) {
  return ct(e) === Eo;
};
oe.isMemo = function(e) {
  return ct(e) === wo;
};
oe.isPortal = function(e) {
  return ct(e) === Ul;
};
oe.isProfiler = function(e) {
  return ct(e) === ho;
};
oe.isStrictMode = function(e) {
  return ct(e) === mo;
};
oe.isSuspense = function(e) {
  return ct(e) === yo;
};
oe.isSuspenseList = function(e) {
  return ct(e) === bo;
};
oe.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === fo || e === ho || e === mo || e === yo || e === bo || e === A9 || typeof e == "object" && e !== null && (e.$$typeof === Eo || e.$$typeof === wo || e.$$typeof === vo || e.$$typeof === po || e.$$typeof === go || e.$$typeof === U1 || e.getModuleId !== void 0);
};
oe.typeOf = ct;
(function(e) {
  e.exports = oe;
})(Aa);
function mn(e, t) {
  let n = 0;
  function r(i) {
    l.Children.forEach(i, (a) => {
      Aa.exports.isFragment(a) ? r(a.props.children) : (t(a, n), n += 1);
    });
  }
  r(e);
}
const Kt = "adm-capsule-tabs", T9 = () => null, R9 = (e) => {
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
    const p = o.push(d);
    i[y] = p - 1;
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
  } = Z1(n, i[s]);
  return Mi(() => {
    f(!0);
  }, r), Z(e, l.createElement("div", {
    className: Kt,
    ref: r
  }, l.createElement("div", {
    className: `${Kt}-header`
  }, l.createElement(H1, {
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
}, Kk = ie(R9, {
  Tab: T9
});
const Ji = "adm-card", M9 = (e) => {
  const t = () => e.title || e.extra ? l.createElement("div", {
    className: B(`${Ji}-header`, e.headerClassName),
    style: e.headerStyle,
    onClick: e.onHeaderClick
  }, l.createElement("div", {
    className: `${Ji}-header-title`
  }, e.title), e.extra) : null, n = () => e.children ? l.createElement("div", {
    className: B(`${Ji}-body`, e.bodyClassName),
    style: e.bodyStyle,
    onClick: e.onBodyClick
  }, e.children) : null;
  return Z(e, l.createElement("div", {
    className: Ji,
    onClick: e.onClick
  }, t(), n()));
}, Gk = M9;
function rf(e, t, n) {
  return e * t * n / (t + n * e);
}
function yi(e, t, n, r, i = 0.15) {
  return i === 0 ? $e(e, t, n) : e < t ? -rf(t - e, r, i) + t : e > n ? +rf(e - n, r, i) + n : e;
}
function z1(e) {
  if (e == null || e === "")
    return 0;
  const t = e.trim();
  return t.endsWith("px") ? parseFloat(t) : t.endsWith("rem") ? parseFloat(t) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : t.endsWith("vw") ? parseFloat(t) * window.innerWidth / 100 : 0;
}
const At = "adm-picker-view", q1 = je((e) => {
  const {
    value: t,
    column: n,
    renderLabel: r
  } = e;
  function i(b) {
    e.onSelect(b, e.index);
  }
  const [{
    y: a
  }, o] = Ne(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), s = j(!1), c = j(null), u = j(null), f = j(34);
  Oe(() => {
    const b = u.current;
    !b || (f.current = z1(window.getComputedStyle(b).getPropertyValue("height")));
  }), Oe(() => {
    if (s.current || t === null)
      return;
    const b = n.findIndex((v) => v.value === t);
    if (b < 0)
      return;
    const x = b * -f.current;
    o.start({
      y: x,
      immediate: a.goal !== x
    });
  }, [t, n]), Oe(() => {
    if (n.length === 0)
      t !== null && i(null);
    else if (!n.some((b) => b.value === t)) {
      const b = n[0];
      i(b.value);
    }
  }, [n, t]);
  function d(b) {
    const x = b * -f.current;
    o.start({
      y: x
    });
    const v = n[b];
    !v || i(v.value);
  }
  const m = (b) => {
    const {
      direction: [, x],
      distance: [, v],
      velocity: [, w],
      offset: [, E],
      last: C
    } = b;
    return {
      direction: x,
      distance: v,
      velocity: w,
      offset: E,
      last: C
    };
  }, y = (b) => {
    s.current = !0;
    const x = -((n.length - 1) * f.current), v = 0, {
      direction: w,
      last: E,
      velocity: C,
      offset: $
    } = m(b);
    if (E) {
      s.current = !1;
      const A = $ + C * w * 50, O = $e(A, x, v), k = -Math.round(O / f.current);
      d(k);
    } else {
      const A = $;
      o.start({
        y: yi(A, x, v, f.current * 50, 0.2)
      });
    }
  }, p = (b) => {
    s.current = !0;
    const x = -((n.length - 1) * f.current), v = 0, {
      direction: w,
      last: E,
      velocity: C,
      distance: $
    } = m(b), A = -w, O = a.get();
    if (E) {
      s.current = !1;
      const k = C * A * 50, D = O + $ * A + k, I = $e(D, x, v), T = -Math.round(I / f.current);
      d(T);
    } else {
      const k = O + $ * A;
      o.start({
        y: yi(k, x, v, f.current * 50, 0.2)
      });
    }
  };
  Nt((b) => {
    b.event.stopPropagation(), y(b);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), R8((b) => {
    b.event.stopPropagation(), p(b);
  }, {
    target: e.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Rn ? {
      passive: !1
    } : void 0
  });
  let h = null;
  function g() {
    if (h === null)
      return null;
    const b = n[h], x = h - 1, v = h + 1, w = n[x], E = n[v];
    return l.createElement("div", {
      className: `${At}-column-accessible`
    }, l.createElement("div", {
      className: `${At}-column-accessible-current`,
      role: "button",
      "aria-label": b ? `\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A${b.label}` : "\u5F53\u524D\u672A\u9009\u62E9"
    }, "-"), l.createElement("div", {
      className: `${At}-column-accessible-button`,
      onClick: () => {
        !w || d(x);
      },
      role: w ? "button" : "text",
      "aria-label": w ? `\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A${w.label}` : "\u6CA1\u6709\u4E0A\u4E00\u9879"
    }, "-"), l.createElement("div", {
      className: `${At}-column-accessible-button`,
      onClick: () => {
        !E || d(v);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A${E.label}` : "\u6CA1\u6709\u4E0B\u4E00\u9879"
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
  }, n.map((b, x) => {
    var v;
    const w = e.value === b.value;
    w && (h = x);
    function E() {
      s.current = !1, d(x);
    }
    return l.createElement("div", {
      key: (v = b.key) !== null && v !== void 0 ? v : b.value,
      "data-selected": b.value === t,
      className: `${At}-column-item`,
      onClick: E,
      "aria-hidden": !w,
      "aria-label": w ? "active" : ""
    }, l.createElement("div", {
      className: `${At}-column-item-label`
    }, r(b)));
  })), g());
}, (e, t) => !(e.index !== t.index || e.value !== t.value || e.onSelect !== t.onSelect || e.renderLabel !== t.renderLabel || e.mouseWheel !== t.mouseWheel || !n6(e.column, t.column)));
q1.displayName = "Wheel";
function af(e) {
  let t = null;
  return () => (t === null && (t = e()), t);
}
function K1(e, t) {
  const n = af(() => (typeof e == "function" ? e(t) : e).map((o) => o.map((s) => typeof s == "string" ? {
    label: s,
    value: s
  } : s))), r = af(() => t.map((a, o) => {
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
function G1(e, t) {
  return ee(() => K1(e, t), [e, t]);
}
const Y1 = (e) => e.label;
var X1 = { exports: {} }, Q1 = {};
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
function I9(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var L9 = typeof Object.is == "function" ? Object.is : I9, D9 = fr.useState, V9 = fr.useEffect, j9 = fr.useLayoutEffect, B9 = fr.useDebugValue;
function W9(e, t) {
  var n = t(), r = D9({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, a = r[1];
  return j9(function() {
    i.value = n, i.getSnapshot = t, Yo(i) && a({ inst: i });
  }, [e, n, t]), V9(function() {
    return Yo(i) && a({ inst: i }), e(function() {
      Yo(i) && a({ inst: i });
    });
  }, [e]), B9(n), n;
}
function Yo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !L9(e, n);
  } catch {
    return !0;
  }
}
function Z9(e, t) {
  return t();
}
var H9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Z9 : W9;
Q1.useSyncExternalStore = fr.useSyncExternalStore !== void 0 ? fr.useSyncExternalStore : H9;
(function(e) {
  e.exports = Q1;
})(X1);
let zl = !1;
const Ms = /* @__PURE__ */ new Set();
function J1() {
  Ms.forEach((e) => {
    e();
  });
}
function Yk() {
  zl = !0, J1(), st.assign({
    skipAnimation: !0
  });
}
function Xk() {
  zl = !1, J1(), st.assign({
    skipAnimation: !1
  });
}
function of() {
  return zl;
}
function U9(e) {
  return Ms.add(e), () => {
    Ms.delete(e);
  };
}
function z9() {
  return X1.exports.useSyncExternalStore(U9, of, of);
}
const Xo = "adm-spin-loading", q9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, K9 = {
  color: "default"
}, G9 = 15 * 3.14159265358979 * 2, Y9 = je((e) => {
  var t;
  const n = z(K9, e), r = z9(), {
    percent: i
  } = Ne({
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
    className: Xo,
    style: {
      "--color": (t = q9[n.color]) !== null && t !== void 0 ? t : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${Xo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(ve.circle, {
    className: `${Xo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: G9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), ql = Y9, nr = "adm-picker-view", X9 = {
  defaultValue: [],
  renderLabel: Y1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${nr}-loading-content`
  }, l.createElement(ql, null))
}, e0 = je((e) => {
  const t = z(X9, e), [n, r] = K(t.value === void 0 ? t.defaultValue : t.value);
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
  const i = G1(t.columns, n), a = i.columns;
  m3(() => {
    var s;
    t.value !== n && ((s = t.onChange) === null || s === void 0 || s.call(t, n, i));
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
  return Z(t, l.createElement("div", {
    className: `${nr}`
  }, t.loading ? t.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(q1, {
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
e0.displayName = "PickerView";
const Kl = e0, Gt = "adm-picker", Q9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: Y1,
  destroyOnClose: !1,
  forceRender: !1
}, Gl = je(fe((e, t) => {
  var n;
  const {
    locale: r
  } = ge(), i = z(Q9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var b;
      g === !1 && ((b = i.onClose) === null || b === void 0 || b.call(i));
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
      var b;
      const x = K1(i.columns, g);
      (b = i.onConfirm) === null || b === void 0 || b.call(i, g, x);
    }
  })), f = G1(i.columns, c), [d, m] = K(c);
  Y(() => {
    d !== c && m(c);
  }, [a]), Y(() => {
    a || m(c);
  }, [c]);
  const y = Ut((g, b) => {
    var x;
    m(g), a && ((x = i.onSelect) === null || x === void 0 || x.call(i, g, b));
  }), p = Z(i, l.createElement("div", {
    className: Gt
  }, l.createElement("div", {
    className: `${Gt}-header`
  }, l.createElement("a", {
    role: "button",
    className: `${Gt}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
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
  }, l.createElement(Kl, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: d,
    mouseWheel: i.mouseWheel,
    onChange: y
  })))), h = l.createElement(Nr, {
    style: i.popupStyle,
    className: B(`${Gt}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var g;
      !i.closeOnMaskClick || ((g = i.onCancel) === null || g === void 0 || g.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, p, l.createElement(Ar, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, h, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f.items, s));
}));
Gl.displayName = "Picker";
function J9(e) {
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
    }, r = Ti(l.createElement(n, null));
  });
}
const t0 = ie(Gl, {
  prompt: J9
});
function n0(e) {
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
const r0 = fe((e, t) => {
  const {
    options: n
  } = e, r = yr(e, ["options"]), i = n0(n);
  return l.createElement(t0, Object.assign({}, r, {
    ref: t,
    columns: i
  }));
});
function eb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(r0, Object.assign({}, e, {
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
    }, r = Ti(l.createElement(n, null));
  });
}
const Qk = ie(r0, {
  prompt: eb
}), tb = (e) => {
  const {
    options: t
  } = e, n = yr(e, ["options"]), r = n0(t);
  return l.createElement(Kl, Object.assign({}, n, {
    columns: r
  }));
}, Jk = tb;
const Be = "adm-tabs", nb = () => null, rb = {
  activeLineMode: "auto",
  stretch: !0,
  direction: "ltr"
}, ib = (e) => {
  var t;
  const n = z(rb, e), r = j(null), i = j(null), a = {};
  let o = null;
  const s = [], c = n.direction === "rtl";
  mn(n.children, (E, C) => {
    if (!Vn(E))
      return;
    const $ = E.key;
    if (typeof $ != "string")
      return;
    C === 0 && (o = $);
    const A = s.push(E);
    a[$] = A - 1;
  });
  const [u, f] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : o,
    onChange: (E) => {
      var C;
      E !== null && ((C = n.onChange) === null || C === void 0 || C.call(n, E));
    }
  }), [{
    x: d,
    width: m
  }, y] = Ne(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: p
  }, h] = Ne(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: g,
    rightMaskOpacity: b
  }, x] = Ne(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function v(E = !1) {
    const C = r.current;
    if (!C)
      return;
    const $ = a[u];
    if ($ === void 0) {
      y.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const A = i.current;
    if (!A)
      return;
    const O = C.children.item($ + 1), k = O.children.item(0), D = k.offsetLeft, I = k.offsetWidth, T = O.offsetLeft, _ = O.offsetWidth, R = C.offsetWidth, N = C.scrollWidth, S = C.scrollLeft, M = A.offsetWidth;
    let P = 0, F = 0;
    if (n.activeLineMode === "auto" ? (P = D, F = I) : n.activeLineMode === "full" ? (P = T, F = _) : P = D + (I - M) / 2, c) {
      const U = ["auto", "full"].includes(n.activeLineMode) ? F : M;
      P = -(R - P - U);
    }
    y.start({
      x: P,
      width: F,
      immediate: E
    });
    const L = N - R;
    if (L <= 0)
      return;
    let W = 0;
    c ? W = -$e(R / 2 - D + I / 2 - M, 0, L) : W = $e(D - (R - I) / 2, 0, L), h.start({
      scrollLeft: W,
      from: {
        scrollLeft: S
      },
      immediate: E
    });
  }
  Oe(() => {
    v(!d.isAnimating);
  }, []), Ri(() => {
    v();
  }, [u]), Mi(() => {
    v(!d.isAnimating);
  }, r), Zl(() => {
    v(!d.isAnimating);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: w
  } = Ka((E = !1) => {
    const C = r.current;
    if (!C)
      return;
    const $ = C.scrollLeft;
    let A = !1, O = !1;
    c ? (A = Math.round(-$) + C.offsetWidth < C.scrollWidth, O = $ < 0) : (A = $ > 0, O = $ + C.offsetWidth < C.scrollWidth), x.start({
      leftMaskOpacity: A ? 1 : 0,
      rightMaskOpacity: O ? 1 : 0,
      immediate: E
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return Oe(() => {
    w(!0);
  }, []), Z(n, l.createElement("div", {
    className: Be,
    style: {
      direction: n.direction
    }
  }, l.createElement("div", {
    className: `${Be}-header`
  }, l.createElement(ve.div, {
    className: B(`${Be}-header-mask`, `${Be}-header-mask-left`),
    style: {
      opacity: g
    }
  }), l.createElement(ve.div, {
    className: B(`${Be}-header-mask`, `${Be}-header-mask-right`),
    style: {
      opacity: b
    }
  }), l.createElement(ve.div, {
    className: `${Be}-tab-list`,
    ref: r,
    scrollLeft: p,
    onScroll: w,
    role: "tablist"
  }, l.createElement(ve.div, {
    ref: i,
    className: `${Be}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : m,
      x: d
    }
  }), s.map((E) => Z(E.props, l.createElement("div", {
    key: E.key,
    className: B(`${Be}-tab-wrapper`, {
      [`${Be}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: C
      } = E;
      E.props.disabled || C != null && f(C.toString());
    },
    className: B(`${Be}-tab`, {
      [`${Be}-tab-active`]: E.key === u,
      [`${Be}-tab-disabled`]: E.props.disabled
    }),
    role: "tab",
    "aria-selected": E.key === u
  }, E.props.title)))))), s.map((E) => {
    if (E.props.children === void 0)
      return null;
    const C = E.key === u;
    return l.createElement(Fr, {
      key: E.key,
      active: C,
      forceRender: E.props.forceRender,
      destroyOnClose: E.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Be}-content`,
      style: {
        display: C ? "block" : "none"
      }
    }, E.props.children));
  })));
}, sf = ie(ib, {
  Tab: nb
});
const Br = "adm-list", ab = {
  mode: "default"
}, ob = fe((e, t) => {
  const n = z(ab, e), r = j(null);
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
const Tt = "adm-list-item", sb = (e) => {
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
  }, r === !0 ? l.createElement(Ty, null) : r));
  return Z(e, l.createElement(n ? "a" : "div", {
    className: B(`${Tt}`, n ? ["adm-plain-anchor"] : [], e.disabled && `${Tt}-disabled`),
    onClick: e.disabled ? void 0 : e.onClick
  }, i));
}, kt = ie(ob, {
  Item: sb
}), i0 = ll(null), lb = "adm-check-list", cb = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(y1, null)
}, ub = (e) => {
  const t = z(cb, e), [n, r] = te(t);
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
  return l.createElement(i0.Provider, {
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
    className: lb
  }, t.children)));
}, ea = "adm-check-list-item", fb = (e) => {
  const t = ot(i0);
  if (t === null)
    return Ie("CheckList.Item", "CheckList.Item can only be used inside CheckList."), null;
  const n = t.value.includes(e.value), r = e.readOnly || t.readOnly, i = n ? t.activeIcon : null, a = t.extra ? t.extra(n) : i, o = l.createElement("div", {
    className: `${ea}-extra`
  }, a);
  return Z(e, l.createElement(kt.Item, {
    title: e.title,
    className: B(ea, r && `${ea}-readonly`, n && `${ea}-active`),
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
}, lf = ie(ub, {
  Item: fb
});
var a0 = bl, db = "Expected a function";
function Yl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(db);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = e.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Yl.Cache || a0)(), n;
}
Yl.Cache = a0;
var cf = Yl;
function o0(e) {
  const t = ee(() => cf((i) => {
    const a = [];
    let o = e;
    for (const s of i) {
      const c = o.find((u) => u.value === s);
      if (!c || (a.push(c), !c.children))
        break;
      o = c.children;
    }
    return a;
  }, (i) => JSON.stringify(i)), [e]), n = ee(() => cf((i) => i.reduce((o, s) => {
    var c;
    return ((c = o.find((u) => u.value === s)) === null || c === void 0 ? void 0 : c.children) || [];
  }, e).length === 0, (i) => JSON.stringify(i)), [e]);
  function r(i) {
    return {
      get items() {
        return t(i);
      },
      get isLeaf() {
        return n(i);
      }
    };
  }
  return r;
}
const Xl = [];
function mb(e, t) {
  const n = [];
  for (let r = e; r <= t; r++)
    n.push(r);
  return n;
}
const bi = "adm-skeleton", Ql = (e) => Z(e, l.createElement("div", {
  className: B(bi, {
    [`${bi}-animated`]: e.animated
  })
})), hb = (e) => Z(e, l.createElement(Ql, {
  animated: e.animated,
  className: `${bi}-title`
})), vb = {
  lineCount: 3
}, pb = (e) => {
  const t = z(vb, e), n = mb(1, t.lineCount), r = l.createElement("div", {
    className: `${bi}-paragraph`
  }, n.map((i) => l.createElement(Ql, {
    key: i,
    animated: t.animated,
    className: `${bi}-paragraph-line`
  })));
  return Z(t, r);
}, ta = ie(Ql, {
  Title: hb,
  Paragraph: pb
}), Co = (e = {}) => ee(() => {
  const {
    label: n = "label",
    value: r = "value",
    disabled: i = "disabled",
    children: a = "children"
  } = e;
  return [n, r, a, i];
}, [JSON.stringify(e)]), mt = "adm-cascader-view", gb = {
  defaultValue: []
}, yb = (e) => {
  const t = z(gb, e), {
    locale: n
  } = ge(), r = o0(t.options), [i, a, o, s] = Co(t.fieldNames), [c, u] = te(Object.assign(Object.assign({}, t), {
    onChange: (g) => {
      var b;
      (b = t.onChange) === null || b === void 0 || b.call(t, g, r(g));
    }
  })), [f, d] = K(0), m = ee(() => {
    const g = [];
    let b = t.options, x = !1;
    for (const v of c) {
      const w = b.find((E) => E[a] === v);
      if (g.push({
        selected: w,
        options: b
      }), !w || !w[o]) {
        x = !0;
        break;
      }
      b = w[o];
    }
    return x || g.push({
      selected: void 0,
      options: b
    }), g;
  }, [c, t.options]);
  vl(() => {
    var g;
    (g = t.onTabsChange) === null || g === void 0 || g.call(t, f);
  }, [f]), Y(() => {
    d(m.length - 1);
  }, [c]), Y(() => {
    const g = m.length - 1;
    f > g && d(g);
  }, [f, m]);
  const y = (g, b) => {
    const x = c.slice(0, b);
    g !== void 0 && (x[b] = g), u(x);
  }, p = (g) => t.loading || g === Xl, h = t.placeholder || n.Cascader.placeholder;
  return Z(t, l.createElement("div", {
    className: mt
  }, l.createElement(sf, {
    activeKey: f.toString(),
    onChange: (g) => {
      const b = parseInt(g);
      d(b);
    },
    stretch: !1,
    className: `${mt}-tabs`
  }, m.map((g, b) => {
    const x = g.selected;
    return l.createElement(sf.Tab, {
      key: b.toString(),
      title: l.createElement("div", {
        className: `${mt}-header-title`
      }, x ? x[i] : typeof h == "function" ? h(b) : h),
      forceRender: !0
    }, l.createElement("div", {
      className: `${mt}-content`
    }, p(g.options) ? l.createElement("div", {
      className: `${mt}-skeleton`
    }, l.createElement(ta, {
      className: `${mt}-skeleton-line-1`,
      animated: !0
    }), l.createElement(ta, {
      className: `${mt}-skeleton-line-2`,
      animated: !0
    }), l.createElement(ta, {
      className: `${mt}-skeleton-line-3`,
      animated: !0
    }), l.createElement(ta, {
      className: `${mt}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(lf, {
      value: [c[b]],
      onChange: (v) => y(v[0], b),
      activeIcon: t.activeIcon
    }, g.options.map((v) => {
      const w = c[b] === v[a];
      return l.createElement(lf.Item, {
        value: v[a],
        key: v[a],
        disabled: v[s],
        className: B(`${mt}-item`, {
          [`${mt}-item-active`]: w
        })
      }, v[i]);
    }))));
  }))));
}, bb = ie(yb, {
  optionSkeleton: Xl
}), qn = "adm-cascader", wb = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, s0 = fe((e, t) => {
  var n;
  const {
    locale: r
  } = ge(), i = z(wb, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (h) => {
      var g;
      h === !1 && ((g = i.onClose) === null || g === void 0 || g.call(i));
    }
  }), s = {
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
  ye(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var g;
      (g = i.onConfirm) === null || g === void 0 || g.call(i, h, f(h));
    }
  })), f = o0(i.options), [d, m] = K(c);
  Y(() => {
    a || m(c);
  }, [a, c]);
  const y = Z(i, l.createElement("div", {
    className: qn
  }, l.createElement("div", {
    className: `${qn}-header`
  }, l.createElement("a", {
    className: `${qn}-header-button`,
    onClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${qn}-header-title`
  }, i.title), l.createElement("a", {
    className: `${qn}-header-button`,
    onClick: () => {
      u(d, !0), o(!1);
    }
  }, i.confirmText)), l.createElement("div", {
    className: `${qn}-body`
  }, l.createElement(bb, Object.assign({}, i, {
    value: d,
    onChange: (h, g) => {
      var b;
      m(h), a && ((b = i.onSelect) === null || b === void 0 || b.call(i, h, g));
    }
  }))))), p = l.createElement(Nr, {
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
  return l.createElement(l.Fragment, null, p, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, f(c).items, s));
});
function Eb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(s0, Object.assign({}, e, {
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
    }, r = Ti(l.createElement(n, null));
  });
}
const eS = ie(s0, {
  prompt: Eb,
  optionSkeleton: Xl
});
const Wr = "adm-center-popup", Cb = Object.assign(Object.assign({}, Ll), {
  getContainer: null
}), xb = (e) => {
  const t = z(Cb, e), n = wl(), r = Ne({
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
  Oe(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = j(null);
  Ga(o, t.disableBodyScroll && i);
  const s = x1(i && t.visible), c = l.createElement("div", {
    className: B(`${Wr}-body`, t.bodyClassName),
    style: t.bodyStyle
  }, t.children), u = ln(t.stopPropagation, Z(t, l.createElement("div", {
    className: Wr,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, t.mask && l.createElement(Pi, {
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
  }, Or(t.getContainer, u));
}, l0 = xb;
const c0 = ll(null), $b = {
  disabled: !1,
  defaultValue: []
}, _b = (e) => {
  const t = z($b, e), [n, r] = te(t);
  return l.createElement(
    c0.Provider,
    {
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
}, u0 = je((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), kb = je((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), f0 = (e) => {
  const t = j(null), n = Ut((r) => {
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
}, Yt = "adm-checkbox", Sb = {
  defaultChecked: !1,
  indeterminate: !1
}, Ob = fe((e, t) => {
  const n = ot(c0), r = z(Sb, e);
  let [i, a] = te({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), o = r.disabled;
  const {
    value: s
  } = r;
  n && s !== void 0 && (uo && (e.checked !== void 0 && Ie("Checkbox", "When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work."), e.defaultChecked !== void 0 && Ie("Checkbox", "When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.")), i = n.value.includes(s), a = (u) => {
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
  }, r.indeterminate ? l.createElement(kb, null) : i && l.createElement(u0, null));
  return Z(r, l.createElement("label", {
    onClick: r.onClick,
    className: B(Yt, {
      [`${Yt}-checked`]: i && !r.indeterminate,
      [`${Yt}-indeterminate`]: r.indeterminate,
      [`${Yt}-disabled`]: o,
      [`${Yt}-block`]: r.block
    })
  }, l.createElement(f0, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${Yt}-content`
  }, r.children)));
}), uf = ie(Ob, {
  Group: _b
});
const Fn = "adm-collapse", Fb = () => null, Pb = (e) => {
  const {
    visible: t
  } = e, n = j(null), r = io(t, e.forceRender, e.destroyOnClose), [{
    height: i
  }, a] = Ne(() => ({
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
  return i3(() => {
    if (!t)
      return;
    const o = n.current;
    !o || a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Ri(() => {
    const o = n.current;
    !o || (t ? a.start({
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
}, Nb = (e) => {
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
      e.accordion ? i(c ? [] : [s]) : i(c ? a.filter((p) => p !== s) : [...a, s]), (y = (m = o.props).onClick) === null || y === void 0 || y.call(m, d);
    }
    const f = () => {
      let d = l.createElement(w1, null);
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
    }, o.props.title)), l.createElement(Pb, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, tS = ie(Nb, {
  Panel: Fb
});
var d0 = { exports: {} };
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
})(d0);
const m0 = d0.exports;
var h0 = { exports: {} };
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
})(h0);
const v0 = h0.exports, dr = "TILL_NOW";
me.extend(co);
me.extend(m0);
me.extend(v0);
const Xt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Ab(e, t, n, r, i, a, o) {
  const s = [], c = t.getFullYear(), u = t.getMonth() + 1, f = t.getDate(), d = t.getHours(), m = t.getMinutes(), y = t.getSeconds(), p = n.getFullYear(), h = n.getMonth() + 1, g = n.getDate(), b = n.getHours(), x = n.getMinutes(), v = n.getSeconds(), w = Xt[r], E = parseInt(e[0]), C = me(Is([e[0], e[1], "1"])), $ = parseInt(e[1]), A = parseInt(e[2]), O = parseInt(e[3]), k = parseInt(e[4]), D = E === c, I = E === p, T = D && $ === u, _ = I && $ === h, R = T && A === f, N = _ && A === g, S = R && O === d, M = N && O === b, P = S && k === m, F = M && k === x, L = (W, U, q) => {
    let G = [];
    for (let Ee = W; Ee <= U; Ee++)
      G.push(Ee);
    const ae = e.slice(0, Xt[q]), de = a == null ? void 0 : a[q];
    return de && typeof de == "function" && (G = G.filter((Ee) => de(Ee, {
      get date() {
        const le = [...ae, Ee.toString()];
        return Is(le);
      }
    }))), G;
  };
  if (w >= Xt.year) {
    const q = L(c, p, "year");
    s.push(q.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.month) {
    const q = L(D ? u : 1, I ? h : 12, "month");
    s.push(q.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.day) {
    const W = T ? f : 1, U = _ ? g : C.daysInMonth(), q = L(W, U, "day");
    s.push(q.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.hour) {
    const q = L(R ? d : 0, N ? b : 23, "hour");
    s.push(q.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.minute) {
    const q = L(S ? m : 0, M ? x : 59, "minute");
    s.push(q.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (w >= Xt.second) {
    const q = L(P ? y : 0, F ? v : 59, "second");
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
function Tb(e) {
  return e ? [e.getFullYear().toString(), (e.getMonth() + 1).toString(), e.getDate().toString(), e.getHours().toString(), e.getMinutes().toString(), e.getSeconds().toString()] : [];
}
function Is(e) {
  var t, n, r, i, a, o;
  const s = (t = e[0]) !== null && t !== void 0 ? t : "1900", c = (n = e[1]) !== null && n !== void 0 ? n : "1", u = (r = e[2]) !== null && r !== void 0 ? r : "1", f = (i = e[3]) !== null && i !== void 0 ? i : "0", d = (a = e[4]) !== null && a !== void 0 ? a : "0", m = (o = e[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(f), parseInt(d), parseInt(m));
}
me.extend(co);
me.extend(m0);
me.extend(v0);
const Zr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function Rb(e, t, n, r, i, a) {
  const o = [], s = t.getFullYear(), c = n.getFullYear(), u = Zr[r], f = parseInt(e[0]), d = f === s, m = f === c, y = me(t), p = me(n), h = y.isoWeek(), g = p.isoWeek(), b = y.isoWeekday(), x = p.isoWeekday(), v = parseInt(e[1]), w = d && v === h, E = m && v === g, C = me(`${f}-01-01`).isoWeeksInYear(), $ = (A, O, k) => {
    let D = [];
    for (let _ = A; _ <= O; _++)
      D.push(_);
    const I = e.slice(0, Zr[k]), T = a == null ? void 0 : a[k];
    return T && typeof T == "function" && (D = D.filter((_) => T(_, {
      get date() {
        const R = [...I, _.toString()];
        return p0(R);
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
    const k = $(d ? h : 1, m ? g : C, "week");
    o.push(k.map((D) => ({
      label: i("week", D),
      value: D.toString()
    })));
  }
  if (u >= Zr["week-day"]) {
    const k = $(w ? b : 1, E ? x : 7, "week-day");
    o.push(k.map((D) => ({
      label: i("week-day", D),
      value: D.toString()
    })));
  }
  return o;
}
function Mb(e) {
  if (!e)
    return [];
  const t = me(e);
  return [t.isoWeekYear().toString(), t.isoWeek().toString(), t.isoWeekday().toString()];
}
function p0(e) {
  var t, n, r;
  const i = (t = e[0]) !== null && t !== void 0 ? t : "1900", a = (n = e[1]) !== null && n !== void 0 ? n : "1", o = (r = e[2]) !== null && r !== void 0 ? r : "1";
  return me().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const Ib = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, g0 = (e, t) => {
  if (t.includes("week"))
    return Mb(e);
  {
    const n = t;
    return Tb(e).slice(0, Ib[n]);
  }
}, Ls = (e, t) => {
  if ((e == null ? void 0 : e[0]) === dr) {
    const n = new Date();
    return n.tillNow = !0, n;
  }
  return t.includes("week") ? p0(e) : Is(e);
}, y0 = (e, t, n, r, i, a, o) => r.startsWith("week") ? Rb(e, t, n, r, i, a) : Ab(e, t, n, r, i, a, o);
function b0(e) {
  const {
    locale: t
  } = ge();
  return Ue((n, r) => {
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
const ff = new Date().getFullYear(), Lb = {
  min: new Date(new Date().setFullYear(ff - 10)),
  max: new Date(new Date().setFullYear(ff + 10)),
  precision: "day",
  defaultValue: null
}, w0 = fe((e, t) => {
  const n = z(Lb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var y;
      m !== null && ((y = n.onConfirm) === null || y === void 0 || y.call(n, m));
    }
  }), o = ee(() => new Date(), []), s = b0(r), c = ee(() => {
    let m = i != null ? i : o;
    return m.tillNow ? [dr] : (m = new Date($e(m.getTime(), n.min.getTime(), n.max.getTime())), g0(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Ue((m) => {
    const y = Ls(m, n.precision);
    a(y, !0);
  }, [a, n.precision]), f = Ut((m) => {
    var y;
    const p = Ls(m, n.precision);
    (y = n.onSelect) === null || y === void 0 || y.call(n, p);
  }), d = Ue((m) => y0(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return Z(n, l.createElement(t0, {
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
    var p;
    return (p = n.children) === null || p === void 0 ? void 0 : p.call(n, i, y);
  }));
});
function Db(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = K(!1);
      return Y(() => {
        a(!0);
      }, []), l.createElement(w0, Object.assign({}, e, {
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
    }, r = Ti(l.createElement(n, null));
  });
}
const nS = ie(w0, {
  prompt: Db,
  DATE_NOW: dr
}), df = new Date().getFullYear(), Vb = {
  min: new Date(new Date().setFullYear(df - 10)),
  max: new Date(new Date().setFullYear(df + 10)),
  precision: "day"
}, jb = (e) => {
  var t;
  const n = z(Vb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : null
  }), o = b0(r), s = ee(() => i != null && i.tillNow ? [dr, null, null] : g0(i, n.precision), [i, n.precision]), c = Ue((u) => {
    var f;
    const d = Ls(u, n.precision);
    d && (a(d), (f = n.onChange) === null || f === void 0 || f.call(n, d));
  }, [n.onChange, n.precision]);
  return Z(n, l.createElement(Kl, {
    columns: (u) => y0(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, rS = jb;
const Bb = (e) => {
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
}, Wb = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, E0 = (e) => {
  const t = z(Wb, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Et("image-container")
  }, l.createElement(lo, {
    src: t.image,
    alt: "dialog header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Et("header")
  }, l.createElement(gi, null, t.header)), !!t.title && l.createElement("div", {
    className: Et("title")
  }, t.title), l.createElement("div", {
    className: B(Et("content"), !t.content && Et("content-empty"))
  }, typeof t.content == "string" ? l.createElement(gi, null, t.content) : t.content), l.createElement("div", {
    className: Et("footer")
  }, t.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: Et("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(Bb, {
      key: o.key,
      action: o,
      onAction: () => ke(void 0, void 0, void 0, function* () {
        var c, u, f;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = t.onAction) === null || u === void 0 ? void 0 : u.call(t, o, s)]), t.closeOnAction && ((f = t.onClose) === null || f === void 0 || f.call(t));
      })
    })));
  })));
  return l.createElement(l0, {
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
const Ds = /* @__PURE__ */ new Set();
function Jl(e) {
  const t = Tr(l.createElement(E0, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Ds.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Ds.add(t.close), t;
}
function Zb(e) {
  const t = {
    confirmText: $i().locale.Dialog.ok
  }, n = z(t, e);
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
const Hb = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function Ub(e) {
  const {
    locale: t
  } = $i(), n = z(Hb, {
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
function zb() {
  Ds.forEach((e) => {
    e();
  });
}
const iS = ie(E0, {
  show: Jl,
  alert: Zb,
  confirm: Ub,
  clear: zb
});
const Vt = "adm-dropdown-item", qb = (e) => {
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
  }, e.arrow === void 0 ? l.createElement(Fy, null) : e.arrow))));
}, Kb = qb, Gb = (e) => {
  const {
    active: t = !1
  } = e, n = io(t, e.forceRender, e.destroyOnClose), r = B(`${Vt}-content`, {
    [`${Vt}-content-hidden`]: !t
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: e.onClick
  }, e.children) : null;
}, Kn = "adm-dropdown", Yb = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Ll.getContainer
}, Xb = fe((e, t) => {
  const n = z(Yb, e), [r, i] = te({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = j(null), o = j(null);
  $d(() => {
    !n.closeOnClickAway || i(null);
  }, [a, o]);
  const [s, c] = K(), u = j(null);
  Y(() => {
    const p = u.current;
    if (!!p && r) {
      const h = p.getBoundingClientRect();
      c(h.bottom);
    }
  }, [r]);
  const f = (p) => {
    i(r === p ? null : p);
  };
  let d = !1;
  const m = [], y = l.Children.map(n.children, (p) => {
    if (Vn(p)) {
      const h = Object.assign(Object.assign({}, p.props), {
        onClick: () => {
          f(p.key);
        },
        active: p.key === r,
        arrow: p.props.arrow === void 0 ? n.arrow : p.props.arrow
      });
      return m.push(p), p.props.forceRender && (d = !0), Im(p, h);
    } else
      return p;
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
  }, y), l.createElement(Nr, {
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
  }, m.map((p) => {
    const h = p.key === r;
    return l.createElement(Gb, {
      key: p.key,
      active: h,
      forceRender: p.props.forceRender,
      destroyOnClose: p.props.destroyOnClose
    }, p.props.children);
  })))));
}), Qb = Xb, aS = ie(Qb, {
  Item: Kb
});
var mf;
(function(e) {
  e[e.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", e[e.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", e[e.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", e[e.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", e[e.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", e[e.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", e[e.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", e[e.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", e[e.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", e[e.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", e[e.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", e[e.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", e[e.TAGS_START = 917504] = "TAGS_START", e[e.TAGS_END = 917631] = "TAGS_END", e[e.ZWJ = 8205] = "ZWJ";
})(mf || (mf = {}));
const Jb = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var hf;
function ma(e) {
  if (typeof e != "string")
    throw new TypeError("string cannot be undefined or null");
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; )
    r += ew(n + r, e), sw(e[n + r]) && r++, iw(e[n + r]) && r++, aw(e[n + r]) && r++, lw(e[n + r]) ? r++ : (t.push(e.substring(n, n + r)), n += r, r = 0);
  return t;
}
function ew(e, t) {
  const n = t[e];
  if (!tw(n) || e === t.length - 1)
    return 1;
  const r = n + t[e + 1];
  let i = t.substring(e + 2, e + 5);
  return vf(r) && vf(i) ? 4 : nw(r) && ow(i) ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2 : rw(i) ? 4 : 2;
}
function tw(e) {
  return e && Wn(e[0].charCodeAt(0), 55296, 56319);
}
function vf(e) {
  return Wn(ec(e), 127462, 127487);
}
function nw(e) {
  return Wn(ec(e), 127988, 127988);
}
function rw(e) {
  return Wn(ec(e), 127995, 127999);
}
function iw(e) {
  return typeof e == "string" && Wn(e.charCodeAt(0), 65024, 65039);
}
function aw(e) {
  return typeof e == "string" && Wn(e.charCodeAt(0), 8400, 8447);
}
function ow(e) {
  const t = e.codePointAt(0);
  return typeof e == "string" && typeof t == "number" && Wn(t, 917504, 917631);
}
function sw(e) {
  return typeof e == "string" && Jb.includes(e.charCodeAt(0));
}
function lw(e) {
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
})(hf || (hf = {}));
const cw = "adm-ellipsis", uw = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, fw = (e) => {
  const t = z(uw, e), n = j(null), r = j(null), i = j(null), [a, o] = K({}), [s, c] = K(t.defaultExpanded), [u, f] = K(!1), d = ee(() => ma(t.content), [t.content]);
  function m(b, x) {
    return d.slice(b, x).join("");
  }
  function y() {
    var b, x;
    const v = n.current;
    if (!v)
      return;
    const w = v.style.display;
    v.style.display = "block";
    const E = window.getComputedStyle(v), C = document.createElement("div");
    Array.prototype.slice.apply(E).forEach((k) => {
      C.style.setProperty(k, E.getPropertyValue(k));
    }), v.style.display = w, C.style.height = "auto", C.style.minHeight = "auto", C.style.maxHeight = "auto", C.style.textOverflow = "clip", C.style.webkitLineClamp = "unset", C.style.display = "block";
    const A = Qo(E.lineHeight), O = Math.floor(A * (t.rows + 0.5) + Qo(E.paddingTop) + Qo(E.paddingBottom));
    if (C.innerText = t.content, document.body.appendChild(C), C.offsetHeight <= O)
      f(!1);
    else {
      let _ = function(M, P) {
        if (P - M <= 1)
          return t.direction === "end" ? {
            leading: m(0, M) + "..."
          } : {
            tailing: "..." + m(P, k)
          };
        const F = Math.round((M + P) / 2);
        return t.direction === "end" ? C.innerHTML = m(0, F) + "..." + T : C.innerHTML = T + "..." + m(F, k), C.offsetHeight <= O ? t.direction === "end" ? _(F, P) : _(M, F) : t.direction === "end" ? _(M, F) : _(F, P);
      }, R = function(M, P) {
        if (M[1] - M[0] <= 1 && P[1] - P[0] <= 1)
          return {
            leading: m(0, M[0]) + "...",
            tailing: "..." + m(P[1], k)
          };
        const F = Math.floor((M[0] + M[1]) / 2), L = Math.ceil((P[0] + P[1]) / 2);
        return C.innerHTML = m(0, F) + "..." + T + "..." + m(L, k), C.offsetHeight <= O ? R([F, M[1]], [P[0], L]) : R([M[0], F], [L, P[1]]);
      };
      f(!0);
      const k = t.content.length, D = typeof t.collapseText == "string" ? t.collapseText : (b = i.current) === null || b === void 0 ? void 0 : b.innerHTML, I = typeof t.expandText == "string" ? t.expandText : (x = r.current) === null || x === void 0 ? void 0 : x.innerHTML, T = s ? D : I, N = Math.floor((0 + k) / 2), S = t.direction === "middle" ? R([0, N], [N, k]) : _(0, k);
      o(S);
    }
    document.body.removeChild(C);
  }
  Mi(y, n), Oe(() => {
    y();
  }, [t.content, t.direction, t.rows, t.expandText, t.collapseText]);
  const p = !!t.expandText && ln(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, t.expandText)), h = !!t.collapseText && ln(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, t.collapseText)), g = () => u ? s ? l.createElement(l.Fragment, null, t.content, h) : l.createElement(l.Fragment, null, a.leading, p, a.tailing) : t.content;
  return Z(t, l.createElement("div", {
    ref: n,
    className: cw,
    onClick: (b) => {
      b.target === b.currentTarget && t.onContentClick(b);
    }
  }, g()));
};
function Qo(e) {
  if (!e)
    return 0;
  const t = e.match(/^\d*(\.\d*)?/);
  return t ? Number(t[0]) : 0;
}
const oS = fw;
const dw = (e) => Z(e, l.createElement("svg", {
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
}))))), Hr = "adm-empty", mw = (e) => {
  function t() {
    const {
      image: n
    } = e;
    return n === void 0 ? l.createElement(dw, {
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
}, sS = mw;
const vn = "adm-error-block", hw = {
  status: "default"
};
function vw(e) {
  return (n) => {
    var r;
    const i = z(hw, n), {
      locale: a
    } = ge(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : e[i.status], f = typeof u == "string" ? l.createElement("img", {
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
const pw = l.createElement("svg", {
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
}))), gw = l.createElement("svg", {
  viewBox: "0 0 400 400",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink"
}, l.createElement("title", null, "@\u53CD\u9988/\u5F02\u5E38/\u7F51\u7EDC\u670D\u52A1\u5F02\u5E38"), l.createElement("defs", null, l.createElement("linearGradient", {
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
})))), yw = l.createElement("svg", {
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
})))), bw = l.createElement("svg", {
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
})))), ww = {
  default: pw,
  disconnected: gw,
  empty: yw,
  busy: bw
}, Ew = vw(ww), lS = Ew;
const na = "adm-floating-bubble", Cw = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, xw = (e) => {
  const t = z(Cw, e), n = j(null), r = j(null), [i, a] = K(t.offset === void 0 ? t.defaultOffset : t.offset);
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
  }, u] = Ne(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), f = Nt((d) => {
    var m;
    let y = d.offset[0], p = d.offset[1];
    if (d.last && t.magnetic) {
      const g = n.current, b = r.current;
      if (!g || !b)
        return;
      const x = g.getBoundingClientRect(), v = b.getBoundingClientRect();
      if (t.magnetic === "x") {
        const w = o.goal - o.get(), E = v.left + w - x.left, C = x.right - (v.right + w);
        C <= E ? y += C : y -= E;
      } else if (t.magnetic === "y") {
        const w = s.goal - s.get(), E = v.top + w - x.top, C = x.bottom - (v.bottom + w);
        C <= E ? p += C : p -= E;
      }
    }
    const h = {
      x: y,
      y: p
    };
    t.offset === void 0 ? u.start(h) : a(h), (m = t.onOffsetChange) === null || m === void 0 || m.call(t, h), u.start({
      opacity: d.active ? 0.8 : 1
    });
  }, {
    axis: t.axis === "xy" ? void 0 : t.axis,
    pointer: {
      touch: !0
    },
    filterTaps: !0,
    bounds: n,
    from: () => [o.get(), s.get()]
  });
  return Z(t, l.createElement("div", {
    className: na
  }, l.createElement("div", {
    className: `${na}-boundary-outer`
  }, l.createElement("div", {
    className: `${na}-boundary`,
    ref: n
  })), l.createElement(ve.div, Object.assign({}, f(), {
    style: {
      opacity: c,
      transform: sy([o, s], (d, m) => `translate(${d}px, ${m}px)`)
    },
    onClick: t.onClick,
    className: `${na}-button`,
    ref: r
  }), t.children)));
}, cS = xw;
function tc(e, t) {
  return e.reduce((n, r) => Math.abs(n - t) < Math.abs(r - t) ? n : r);
}
const Ur = "adm-floating-panel", $w = {
  handleDraggingOfContent: !0
}, _w = fe((e, t) => {
  var n, r;
  const i = z($w, e), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map((x) => -x), c = j(null), u = j(null), f = j(null), [d, m] = K(!1), y = j(!1), p = {
    top: s[s.length - 1],
    bottom: s[0]
  }, h = Ut((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: g
  }, b] = Ne(() => ({
    y: p.bottom,
    config: {
      tension: 300
    },
    onChange: (x) => {
      h(-x.value.y, g.isAnimating);
    }
  }));
  return Nt((x) => {
    const [, v] = x.offset;
    if (x.first) {
      const C = x.event.target, $ = u.current;
      if ($ === C || ($ == null ? void 0 : $.contains(C)))
        y.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const A = g.goal <= p.top, O = f.current;
        if (!O)
          return;
        A ? O.scrollTop <= 0 && x.direction[1] > 0 && (y.current = !0) : y.current = !0;
      }
    }
    if (m(y.current), !y.current)
      return;
    const {
      event: w
    } = x;
    w.cancelable && Rn && w.preventDefault(), w.stopPropagation();
    let E = v;
    x.last && (y.current = !1, m(!1), E = tc(s, v)), b.start({
      y: E
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
    eventOptions: Rn ? {
      passive: !1
    } : void 0
  }), ye(t, () => ({
    setHeight: (x, v) => {
      b.start({
        y: -x,
        immediate: v == null ? void 0 : v.immediate
      });
    }
  }), [b]), Ga(c, !0), Z(i, l.createElement(ve.div, {
    ref: c,
    className: Ur,
    style: {
      height: Math.round(o),
      translateY: g.to((x) => `calc(100% + (${Math.round(x)}px))`)
    }
  }, l.createElement("div", {
    className: `${Ur}-mask`,
    style: {
      display: d ? "block" : "none"
    }
  }), l.createElement("div", {
    className: `${Ur}-header`,
    ref: u
  }, l.createElement("div", {
    className: `${Ur}-bar`
  })), l.createElement("div", {
    className: `${Ur}-content`,
    ref: f
  }, i.children)));
}), uS = _w;
function Ta() {
  return Ta = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ta.apply(this, arguments);
}
function kw(e, t) {
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
  var n = kw(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function ze(e) {
  return ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, ze(e);
}
function Sw(e, t) {
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
function C0(e) {
  var t = Sw(e, "string");
  return ze(t) === "symbol" ? t : String(t);
}
function Ve(e, t, n) {
  return t = C0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function pf(e, t) {
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
    t % 2 ? pf(Object(n), !0).forEach(function(r) {
      Ve(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : pf(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Vs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Ow(e) {
  if (Array.isArray(e))
    return Vs(e);
}
function x0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function rc(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return Vs(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Vs(e, t);
  }
}
function Fw() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function re(e) {
  return Ow(e) || x0(e) || rc(e) || Fw();
}
function Ii(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function gf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, C0(r.key), r);
  }
}
function Li(e, t, n) {
  return t && gf(e.prototype, t), n && gf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function $0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function js(e, t) {
  return js = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, js(e, t);
}
function Pw(e, t) {
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
  }), t && js(e, t);
}
function Ra(e) {
  return Ra = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Ra(e);
}
function Nw() {
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
function Aw(e, t) {
  if (t && (ze(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return $0(e);
}
function Tw(e) {
  var t = Nw();
  return function() {
    var r = Ra(e), i;
    if (t) {
      var a = Ra(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return Aw(this, i);
  };
}
var _0 = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae = typeof Symbol == "function" && Symbol.for, ic = Ae ? Symbol.for("react.element") : 60103, ac = Ae ? Symbol.for("react.portal") : 60106, xo = Ae ? Symbol.for("react.fragment") : 60107, $o = Ae ? Symbol.for("react.strict_mode") : 60108, _o = Ae ? Symbol.for("react.profiler") : 60114, ko = Ae ? Symbol.for("react.provider") : 60109, So = Ae ? Symbol.for("react.context") : 60110, oc = Ae ? Symbol.for("react.async_mode") : 60111, Oo = Ae ? Symbol.for("react.concurrent_mode") : 60111, Fo = Ae ? Symbol.for("react.forward_ref") : 60112, Po = Ae ? Symbol.for("react.suspense") : 60113, Rw = Ae ? Symbol.for("react.suspense_list") : 60120, No = Ae ? Symbol.for("react.memo") : 60115, Ao = Ae ? Symbol.for("react.lazy") : 60116, Mw = Ae ? Symbol.for("react.block") : 60121, Iw = Ae ? Symbol.for("react.fundamental") : 60117, Lw = Ae ? Symbol.for("react.responder") : 60118, Dw = Ae ? Symbol.for("react.scope") : 60119;
function Je(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ic:
        switch (e = e.type, e) {
          case oc:
          case Oo:
          case xo:
          case _o:
          case $o:
          case Po:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case So:
              case Fo:
              case Ao:
              case No:
              case ko:
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
function k0(e) {
  return Je(e) === Oo;
}
se.AsyncMode = oc;
se.ConcurrentMode = Oo;
se.ContextConsumer = So;
se.ContextProvider = ko;
se.Element = ic;
se.ForwardRef = Fo;
se.Fragment = xo;
se.Lazy = Ao;
se.Memo = No;
se.Portal = ac;
se.Profiler = _o;
se.StrictMode = $o;
se.Suspense = Po;
se.isAsyncMode = function(e) {
  return k0(e) || Je(e) === oc;
};
se.isConcurrentMode = k0;
se.isContextConsumer = function(e) {
  return Je(e) === So;
};
se.isContextProvider = function(e) {
  return Je(e) === ko;
};
se.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ic;
};
se.isForwardRef = function(e) {
  return Je(e) === Fo;
};
se.isFragment = function(e) {
  return Je(e) === xo;
};
se.isLazy = function(e) {
  return Je(e) === Ao;
};
se.isMemo = function(e) {
  return Je(e) === No;
};
se.isPortal = function(e) {
  return Je(e) === ac;
};
se.isProfiler = function(e) {
  return Je(e) === _o;
};
se.isStrictMode = function(e) {
  return Je(e) === $o;
};
se.isSuspense = function(e) {
  return Je(e) === Po;
};
se.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === xo || e === Oo || e === _o || e === $o || e === Po || e === Rw || typeof e == "object" && e !== null && (e.$$typeof === Ao || e.$$typeof === No || e.$$typeof === ko || e.$$typeof === So || e.$$typeof === Fo || e.$$typeof === Iw || e.$$typeof === Lw || e.$$typeof === Dw || e.$$typeof === Mw);
};
se.typeOf = Je;
(function(e) {
  e.exports = se;
})(_0);
function Bs(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(e, function(r) {
    r == null && !t.keepEmpty || (Array.isArray(r) ? n = n.concat(Bs(r)) : _0.exports.isFragment(r) && r.props ? n = n.concat(Bs(r.props.children, t)) : n.push(r));
  }), n;
}
var Ws = {}, Vw = function(t) {
};
function jw(e, t) {
}
function Bw(e, t) {
}
function Ww() {
  Ws = {};
}
function S0(e, t, n) {
  !t && !Ws[n] && (e(!1, n), Ws[n] = !0);
}
function yt(e, t) {
  S0(jw, e, t);
}
function Zw(e, t) {
  S0(Bw, e, t);
}
yt.preMessage = Vw;
yt.resetWarned = Ww;
yt.noteOnce = Zw;
var Pn = "RC_FORM_INTERNAL_HOOKS", ce = function() {
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
function Zs(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Zt() {
  Zt = function() {
    return t;
  };
  var e, t = {}, n = Object.prototype, r = n.hasOwnProperty, i = Object.defineProperty || function(N, S, M) {
    N[S] = M.value;
  }, a = typeof Symbol == "function" ? Symbol : {}, o = a.iterator || "@@iterator", s = a.asyncIterator || "@@asyncIterator", c = a.toStringTag || "@@toStringTag";
  function u(N, S, M) {
    return Object.defineProperty(N, S, {
      value: M,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), N[S];
  }
  try {
    u({}, "");
  } catch {
    u = function(M, P, F) {
      return M[P] = F;
    };
  }
  function f(N, S, M, P) {
    var F = S && S.prototype instanceof b ? S : b, L = Object.create(F.prototype), W = new _(P || []);
    return i(L, "_invoke", {
      value: k(N, M, W)
    }), L;
  }
  function d(N, S, M) {
    try {
      return {
        type: "normal",
        arg: N.call(S, M)
      };
    } catch (P) {
      return {
        type: "throw",
        arg: P
      };
    }
  }
  t.wrap = f;
  var m = "suspendedStart", y = "suspendedYield", p = "executing", h = "completed", g = {};
  function b() {
  }
  function x() {
  }
  function v() {
  }
  var w = {};
  u(w, o, function() {
    return this;
  });
  var E = Object.getPrototypeOf, C = E && E(E(R([])));
  C && C !== n && r.call(C, o) && (w = C);
  var $ = v.prototype = b.prototype = Object.create(w);
  function A(N) {
    ["next", "throw", "return"].forEach(function(S) {
      u(N, S, function(M) {
        return this._invoke(S, M);
      });
    });
  }
  function O(N, S) {
    function M(F, L, W, U) {
      var q = d(N[F], N, L);
      if (q.type !== "throw") {
        var G = q.arg, ae = G.value;
        return ae && ze(ae) == "object" && r.call(ae, "__await") ? S.resolve(ae.__await).then(function(de) {
          M("next", de, W, U);
        }, function(de) {
          M("throw", de, W, U);
        }) : S.resolve(ae).then(function(de) {
          G.value = de, W(G);
        }, function(de) {
          return M("throw", de, W, U);
        });
      }
      U(q.arg);
    }
    var P;
    i(this, "_invoke", {
      value: function(L, W) {
        function U() {
          return new S(function(q, G) {
            M(L, W, q, G);
          });
        }
        return P = P ? P.then(U, U) : U();
      }
    });
  }
  function k(N, S, M) {
    var P = m;
    return function(F, L) {
      if (P === p)
        throw new Error("Generator is already running");
      if (P === h) {
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
          var U = D(W, M);
          if (U) {
            if (U === g)
              continue;
            return U;
          }
        }
        if (M.method === "next")
          M.sent = M._sent = M.arg;
        else if (M.method === "throw") {
          if (P === m)
            throw P = h, M.arg;
          M.dispatchException(M.arg);
        } else
          M.method === "return" && M.abrupt("return", M.arg);
        P = p;
        var q = d(N, S, M);
        if (q.type === "normal") {
          if (P = M.done ? h : y, q.arg === g)
            continue;
          return {
            value: q.arg,
            done: M.done
          };
        }
        q.type === "throw" && (P = h, M.method = "throw", M.arg = q.arg);
      }
    };
  }
  function D(N, S) {
    var M = S.method, P = N.iterator[M];
    if (P === e)
      return S.delegate = null, M === "throw" && N.iterator.return && (S.method = "return", S.arg = e, D(N, S), S.method === "throw") || M !== "return" && (S.method = "throw", S.arg = new TypeError("The iterator does not provide a '" + M + "' method")), g;
    var F = d(P, N.iterator, S.arg);
    if (F.type === "throw")
      return S.method = "throw", S.arg = F.arg, S.delegate = null, g;
    var L = F.arg;
    return L ? L.done ? (S[N.resultName] = L.value, S.next = N.nextLoc, S.method !== "return" && (S.method = "next", S.arg = e), S.delegate = null, g) : L : (S.method = "throw", S.arg = new TypeError("iterator result is not an object"), S.delegate = null, g);
  }
  function I(N) {
    var S = {
      tryLoc: N[0]
    };
    1 in N && (S.catchLoc = N[1]), 2 in N && (S.finallyLoc = N[2], S.afterLoc = N[3]), this.tryEntries.push(S);
  }
  function T(N) {
    var S = N.completion || {};
    S.type = "normal", delete S.arg, N.completion = S;
  }
  function _(N) {
    this.tryEntries = [{
      tryLoc: "root"
    }], N.forEach(I, this), this.reset(!0);
  }
  function R(N) {
    if (N || N === "") {
      var S = N[o];
      if (S)
        return S.call(N);
      if (typeof N.next == "function")
        return N;
      if (!isNaN(N.length)) {
        var M = -1, P = function F() {
          for (; ++M < N.length; )
            if (r.call(N, M))
              return F.value = N[M], F.done = !1, F;
          return F.value = e, F.done = !0, F;
        };
        return P.next = P;
      }
    }
    throw new TypeError(ze(N) + " is not iterable");
  }
  return x.prototype = v, i($, "constructor", {
    value: v,
    configurable: !0
  }), i(v, "constructor", {
    value: x,
    configurable: !0
  }), x.displayName = u(v, c, "GeneratorFunction"), t.isGeneratorFunction = function(N) {
    var S = typeof N == "function" && N.constructor;
    return !!S && (S === x || (S.displayName || S.name) === "GeneratorFunction");
  }, t.mark = function(N) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(N, v) : (N.__proto__ = v, u(N, c, "GeneratorFunction")), N.prototype = Object.create($), N;
  }, t.awrap = function(N) {
    return {
      __await: N
    };
  }, A(O.prototype), u(O.prototype, s, function() {
    return this;
  }), t.AsyncIterator = O, t.async = function(N, S, M, P, F) {
    F === void 0 && (F = Promise);
    var L = new O(f(N, S, M, P), F);
    return t.isGeneratorFunction(S) ? L : L.next().then(function(W) {
      return W.done ? W.value : L.next();
    });
  }, A($), u($, c, "Generator"), u($, o, function() {
    return this;
  }), u($, "toString", function() {
    return "[object Generator]";
  }), t.keys = function(N) {
    var S = Object(N), M = [];
    for (var P in S)
      M.push(P);
    return M.reverse(), function F() {
      for (; M.length; ) {
        var L = M.pop();
        if (L in S)
          return F.value = L, F.done = !1, F;
      }
      return F.done = !0, F;
    };
  }, t.values = R, _.prototype = {
    constructor: _,
    reset: function(S) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(T), !S)
        for (var M in this)
          M.charAt(0) === "t" && r.call(this, M) && !isNaN(+M.slice(1)) && (this[M] = e);
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
      var M = this;
      function P(G, ae) {
        return W.type = "throw", W.arg = S, M.next = G, ae && (M.method = "next", M.arg = e), !!ae;
      }
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var L = this.tryEntries[F], W = L.completion;
        if (L.tryLoc === "root")
          return P("end");
        if (L.tryLoc <= this.prev) {
          var U = r.call(L, "catchLoc"), q = r.call(L, "finallyLoc");
          if (U && q) {
            if (this.prev < L.catchLoc)
              return P(L.catchLoc, !0);
            if (this.prev < L.finallyLoc)
              return P(L.finallyLoc);
          } else if (U) {
            if (this.prev < L.catchLoc)
              return P(L.catchLoc, !0);
          } else {
            if (!q)
              throw new Error("try statement without catch or finally");
            if (this.prev < L.finallyLoc)
              return P(L.finallyLoc);
          }
        }
      }
    },
    abrupt: function(S, M) {
      for (var P = this.tryEntries.length - 1; P >= 0; --P) {
        var F = this.tryEntries[P];
        if (F.tryLoc <= this.prev && r.call(F, "finallyLoc") && this.prev < F.finallyLoc) {
          var L = F;
          break;
        }
      }
      L && (S === "break" || S === "continue") && L.tryLoc <= M && M <= L.finallyLoc && (L = null);
      var W = L ? L.completion : {};
      return W.type = S, W.arg = M, L ? (this.method = "next", this.next = L.finallyLoc, g) : this.complete(W);
    },
    complete: function(S, M) {
      if (S.type === "throw")
        throw S.arg;
      return S.type === "break" || S.type === "continue" ? this.next = S.arg : S.type === "return" ? (this.rval = this.arg = S.arg, this.method = "return", this.next = "end") : S.type === "normal" && M && (this.next = M), g;
    },
    finish: function(S) {
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var P = this.tryEntries[M];
        if (P.finallyLoc === S)
          return this.complete(P.completion, P.afterLoc), T(P), g;
      }
    },
    catch: function(S) {
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var P = this.tryEntries[M];
        if (P.tryLoc === S) {
          var F = P.completion;
          if (F.type === "throw") {
            var L = F.arg;
            T(P);
          }
          return L;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(S, M, P) {
      return this.delegate = {
        iterator: R(S),
        resultName: M,
        nextLoc: P
      }, this.method === "next" && (this.arg = e), g;
    }
  }, t;
}
function yf(e, t, n, r, i, a, o) {
  try {
    var s = e[a](o), c = s.value;
  } catch (u) {
    n(u);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function To(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, i) {
      var a = e.apply(t, n);
      function o(c) {
        yf(a, r, i, o, s, "next", c);
      }
      function s(c) {
        yf(a, r, i, o, s, "throw", c);
      }
      o(void 0);
    });
  };
}
function Nn() {
  return Nn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Nn.apply(this, arguments);
}
function Hw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, wi(e, t);
}
function Hs(e) {
  return Hs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Hs(e);
}
function wi(e, t) {
  return wi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, wi(e, t);
}
function Uw() {
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
function ha(e, t, n) {
  return Uw() ? ha = Reflect.construct.bind() : ha = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && wi(u, o.prototype), u;
  }, ha.apply(null, arguments);
}
function zw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Us(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Us = function(r) {
    if (r === null || !zw(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, i);
    }
    function i() {
      return ha(r, arguments, Hs(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), wi(i, r);
  }, Us(e);
}
var qw = /%[sdj%]/g, Kw = function() {
};
typeof process < "u" && process.env;
function zs(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var r = n.field;
    t[r] = t[r] || [], t[r].push(n);
  }), t;
}
function Xe(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var o = e.replace(qw, function(s) {
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
function Gw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Fe(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Gw(t) && typeof e == "string" && !e);
}
function Yw(e, t, n) {
  var r = [], i = 0, a = e.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function bf(e, t, n) {
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
function Xw(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var wf = /* @__PURE__ */ function(e) {
  Hw(t, e);
  function t(n, r) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return t;
}(/* @__PURE__ */ Us(Error));
function Qw(e, t, n, r, i) {
  if (t.first) {
    var a = new Promise(function(m, y) {
      var p = function(b) {
        return r(b), b.length ? y(new wf(b, zs(b))) : m(i);
      }, h = Xw(e);
      bf(h, n, p);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), c = s.length, u = 0, f = [], d = new Promise(function(m, y) {
    var p = function(g) {
      if (f.push.apply(f, g), u++, u === c)
        return r(f), f.length ? y(new wf(f, zs(f))) : m(i);
    };
    s.length || (r(f), m(i)), s.forEach(function(h) {
      var g = e[h];
      o.indexOf(h) !== -1 ? bf(g, n, p) : Yw(g, n, p);
    });
  });
  return d.catch(function(m) {
    return m;
  }), d;
}
function Jw(e) {
  return !!(e && e.message !== void 0);
}
function eE(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function Ef(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = eE(t, e.fullFields) : r = t[n.field || e.fullField], Jw(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function Cf(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = Nn({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var O0 = function(t, n, r, i, a, o) {
  t.required && (!r.hasOwnProperty(t.field) || Fe(n, o || t.type)) && i.push(Xe(a.messages.required, t.fullField));
}, tE = function(t, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Xe(a.messages.whitespace, t.fullField));
}, ra, nE = function() {
  if (ra)
    return ra;
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
  c.v4 = function(v) {
    return v && v.exact ? o : new RegExp("" + t(v) + n + t(v), "g");
  }, c.v6 = function(v) {
    return v && v.exact ? s : new RegExp("" + t(v) + i + t(v), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", f = "(?:\\S+(?::\\S*)?@)?", d = c.v4().source, m = c.v6().source, y = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", p = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", h = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", b = '(?:[/?#][^\\s"]*)?', x = "(?:" + u + "|www\\.)" + f + "(?:localhost|" + d + "|" + m + "|" + y + p + h + ")" + g + b;
  return ra = new RegExp("(?:^" + x + "$)", "i"), ra;
}, xf = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
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
    return typeof t == "string" && t.length <= 320 && !!t.match(xf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(nE());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(xf.hex);
  }
}, rE = function(t, n, r, i, a) {
  if (t.required && n === void 0) {
    O0(t, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? ei[s](n) || i.push(Xe(a.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && i.push(Xe(a.messages.types[s], t.fullField, t.type));
}, iE = function(t, n, r, i, a) {
  var o = typeof t.len == "number", s = typeof t.min == "number", c = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, f = n, d = null, m = typeof n == "number", y = typeof n == "string", p = Array.isArray(n);
  if (m ? d = "number" : y ? d = "string" : p && (d = "array"), !d)
    return !1;
  p && (f = n.length), y && (f = n.replace(u, "_").length), o ? f !== t.len && i.push(Xe(a.messages[d].len, t.fullField, t.len)) : s && !c && f < t.min ? i.push(Xe(a.messages[d].min, t.fullField, t.min)) : c && !s && f > t.max ? i.push(Xe(a.messages[d].max, t.fullField, t.max)) : s && c && (f < t.min || f > t.max) && i.push(Xe(a.messages[d].range, t.fullField, t.min, t.max));
}, Gn = "enum", aE = function(t, n, r, i, a) {
  t[Gn] = Array.isArray(t[Gn]) ? t[Gn] : [], t[Gn].indexOf(n) === -1 && i.push(Xe(a.messages[Gn], t.fullField, t[Gn].join(", ")));
}, oE = function(t, n, r, i, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(Xe(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(n) || i.push(Xe(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Q = {
  required: O0,
  whitespace: tE,
  type: rE,
  range: iE,
  enum: aE,
  pattern: oE
}, sE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a, "string"), Fe(n, "string") || (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a), Q.pattern(t, n, i, o, a), t.whitespace === !0 && Q.whitespace(t, n, i, o, a));
  }
  r(o);
}, lE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, cE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, uE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, fE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), Fe(n) || Q.type(t, n, i, o, a);
  }
  r(o);
}, dE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, mE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, hE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    Q.required(t, n, i, o, a, "array"), n != null && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, vE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, pE = "enum", gE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q[pE](t, n, i, o, a);
  }
  r(o);
}, yE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a), Fe(n, "string") || Q.pattern(t, n, i, o, a);
  }
  r(o);
}, bE = function(t, n, r, i, a) {
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
}, wE = function(t, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  Q.required(t, n, i, o, a, s), r(o);
}, Jo = function(t, n, r, i, a) {
  var o = t.type, s = [], c = t.required || !t.required && i.hasOwnProperty(t.field);
  if (c) {
    if (Fe(n, o) && !t.required)
      return r();
    Q.required(t, n, i, s, a, o), Fe(n, o) || Q.type(t, n, i, s, a);
  }
  r(s);
}, EE = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Fe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a);
  }
  r(o);
}, oi = {
  string: sE,
  method: lE,
  number: cE,
  boolean: uE,
  regexp: fE,
  integer: dE,
  float: mE,
  array: hE,
  object: vE,
  enum: gE,
  pattern: yE,
  date: bE,
  url: Jo,
  hex: Jo,
  email: Jo,
  required: wE,
  any: EE
};
function qs() {
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
var Ks = qs(), Di = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Ks, this.define(n);
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
    return r && (this._messages = Cf(qs(), r)), this._messages;
  }, t.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function f(h) {
      var g = [], b = {};
      function x(w) {
        if (Array.isArray(w)) {
          var E;
          g = (E = g).concat.apply(E, w);
        } else
          g.push(w);
      }
      for (var v = 0; v < h.length; v++)
        x(h[v]);
      g.length ? (b = zs(g), u(g, b)) : u(null, s);
    }
    if (c.messages) {
      var d = this.messages();
      d === Ks && (d = qs()), Cf(d, c.messages), c.messages = d;
    } else
      c.messages = this.messages();
    var m = {}, y = c.keys || Object.keys(this.rules);
    y.forEach(function(h) {
      var g = o.rules[h], b = s[h];
      g.forEach(function(x) {
        var v = x;
        typeof v.transform == "function" && (s === r && (s = Nn({}, s)), b = s[h] = v.transform(b)), typeof v == "function" ? v = {
          validator: v
        } : v = Nn({}, v), v.validator = o.getValidationMethod(v), v.validator && (v.field = h, v.fullField = v.fullField || h, v.type = o.getType(v), m[h] = m[h] || [], m[h].push({
          rule: v,
          value: b,
          source: s,
          field: h
        }));
      });
    });
    var p = {};
    return Qw(m, c, function(h, g) {
      var b = h.rule, x = (b.type === "object" || b.type === "array") && (typeof b.fields == "object" || typeof b.defaultField == "object");
      x = x && (b.required || !b.required && h.value), b.field = h.field;
      function v(C, $) {
        return Nn({}, $, {
          fullField: b.fullField + "." + C,
          fullFields: b.fullFields ? [].concat(b.fullFields, [C]) : [C]
        });
      }
      function w(C) {
        C === void 0 && (C = []);
        var $ = Array.isArray(C) ? C : [C];
        !c.suppressWarning && $.length && e.warning("async-validator:", $), $.length && b.message !== void 0 && ($ = [].concat(b.message));
        var A = $.map(Ef(b, s));
        if (c.first && A.length)
          return p[b.field] = 1, g(A);
        if (!x)
          g(A);
        else {
          if (b.required && !h.value)
            return b.message !== void 0 ? A = [].concat(b.message).map(Ef(b, s)) : c.error && (A = [c.error(b, Xe(c.messages.required, b.field))]), g(A);
          var O = {};
          b.defaultField && Object.keys(h.value).map(function(I) {
            O[I] = b.defaultField;
          }), O = Nn({}, O, h.rule.fields);
          var k = {};
          Object.keys(O).forEach(function(I) {
            var T = O[I], _ = Array.isArray(T) ? T : [T];
            k[I] = _.map(v.bind(null, I));
          });
          var D = new e(k);
          D.messages(c.messages), h.rule.options && (h.rule.options.messages = c.messages, h.rule.options.error = c.error), D.validate(h.value, h.rule.options || c, function(I) {
            var T = [];
            A && A.length && T.push.apply(T, A), I && I.length && T.push.apply(T, I), g(T.length ? T : null);
          });
        }
      }
      var E;
      if (b.asyncValidator)
        E = b.asyncValidator(b, h.value, w, h.source, c);
      else if (b.validator) {
        try {
          E = b.validator(b, h.value, w, h.source, c);
        } catch (C) {
          console.error == null || console.error(C), c.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), w(C.message);
        }
        E === !0 ? w() : E === !1 ? w(typeof b.message == "function" ? b.message(b.fullField || b.field) : b.message || (b.fullField || b.field) + " fails") : E instanceof Array ? w(E) : E instanceof Error && w(E.message);
      }
      E && E.then && E.then(function() {
        return w();
      }, function(C) {
        return w(C);
      });
    }, function(h) {
      f(h);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !oi.hasOwnProperty(r.type))
      throw new Error(Xe("Unknown rule type %s", r.type));
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
Di.warning = Kw;
Di.messages = Ks;
Di.validators = oi;
var Ge = "'${name}' is not a valid ${type}", F0 = {
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
function P0(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null)
      return;
    n = n[t[r]];
  }
  return n;
}
function N0(e) {
  if (Array.isArray(e))
    return e;
}
function A0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function CE(e) {
  return N0(e) || x0(e) || rc(e) || A0();
}
function T0(e, t, n, r) {
  if (!t.length)
    return n;
  var i = CE(t), a = i[0], o = i.slice(1), s;
  return !e && typeof a == "number" ? s = [] : Array.isArray(e) ? s = re(e) : s = ne({}, e), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = T0(s[a], o, n, r), s;
}
function xE(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !P0(e, t.slice(0, -1)) ? e : T0(e, t, n, r);
}
function Ro(e) {
  return Array.isArray(e) ? _E(e) : ze(e) === "object" && e !== null ? $E(e) : e;
}
function $E(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var n in e)
      t[n] = Ro(e[n]);
    return t;
  }
  return e;
}
function _E(e) {
  return e.map(function(t) {
    return Ro(t);
  });
}
function xe(e) {
  return Zs(e);
}
function an(e, t) {
  var n = P0(e, t);
  return n;
}
function tn(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = xE(e, t, n, r);
  return i;
}
function $f(e, t) {
  var n = {};
  return t.forEach(function(r) {
    var i = an(e, r);
    n = tn(n, r, i);
  }), n;
}
function si(e, t) {
  return e && e.some(function(n) {
    return M0(n, t);
  });
}
function _f(e) {
  return ze(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function R0(e, t) {
  var n = Array.isArray(e) ? re(e) : ne({}, e);
  return t && Object.keys(t).forEach(function(r) {
    var i = n[r], a = t[r], o = _f(i) && _f(a);
    n[r] = o ? R0(i, a || {}) : Ro(a);
  }), n;
}
function va(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return R0(i, a);
  }, e);
}
function M0(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(n, r) {
    return t[r] === n;
  });
}
function kE(e, t) {
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
function SE(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && ze(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function kf(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r)
    return e;
  var i = e[t], a = t - n;
  return a > 0 ? [].concat(re(e.slice(0, n)), [i], re(e.slice(n, t)), re(e.slice(t + 1, r))) : a < 0 ? [].concat(re(e.slice(0, t)), re(e.slice(t + 1, n + 1)), [i], re(e.slice(n + 1, r))) : e;
}
var OE = Di;
function FE(e, t) {
  return e.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return t[r];
  });
}
var Sf = "CODE_LOGIC_ERROR";
function Gs(e, t, n, r, i) {
  return Ys.apply(this, arguments);
}
function Ys() {
  return Ys = To(/* @__PURE__ */ Zt().mark(function e(t, n, r, i, a) {
    var o, s, c, u, f, d, m, y, p;
    return Zt().wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return o = ne({}, r), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (b) {
                return console.error(b), Promise.reject(Sf);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new OE(Ve({}, t, [o])), f = va({}, F0, i.validateMessages), u.messages(f), d = [], g.prev = 9, g.next = 12, Promise.resolve(u.validate(Ve({}, t, n), ne({}, i)));
          case 12:
            g.next = 17;
            break;
          case 14:
            g.prev = 14, g.t0 = g.catch(9), g.t0.errors && (d = g.t0.errors.map(function(b, x) {
              var v = b.message, w = v === Sf ? f.default : v;
              return /* @__PURE__ */ V.isValidElement(w) ? /* @__PURE__ */ V.cloneElement(w, {
                key: "error_".concat(x)
              }) : w;
            }));
          case 17:
            if (!(!d.length && c)) {
              g.next = 22;
              break;
            }
            return g.next = 20, Promise.all(n.map(function(b, x) {
              return Gs("".concat(t, ".").concat(x), b, c, i, a);
            }));
          case 20:
            return m = g.sent, g.abrupt("return", m.reduce(function(b, x) {
              return [].concat(re(b), re(x));
            }, []));
          case 22:
            return y = ne(ne({}, r), {}, {
              name: t,
              enum: (r.enum || []).join(", ")
            }, a), p = d.map(function(b) {
              return typeof b == "string" ? FE(b, y) : b;
            }), g.abrupt("return", p);
          case 25:
          case "end":
            return g.stop();
        }
    }, e, null, [[9, 14]]);
  })), Ys.apply(this, arguments);
}
function PE(e, t, n, r, i, a) {
  var o = e.join("."), s = n.map(function(f, d) {
    var m = f.validator, y = ne(ne({}, f), {}, {
      ruleIndex: d
    });
    return m && (y.validator = function(p, h, g) {
      var b = !1, x = function() {
        for (var E = arguments.length, C = new Array(E), $ = 0; $ < E; $++)
          C[$] = arguments[$];
        Promise.resolve().then(function() {
          yt(!b, "Your validator function has already return a promise. `callback` will be ignored."), b || g.apply(void 0, C);
        });
      }, v = m(p, h, x);
      b = v && typeof v.then == "function" && typeof v.catch == "function", yt(b, "`callback` is deprecated. Please return a promise instead."), b && v.then(function() {
        g();
      }).catch(function(w) {
        g(w || " ");
      });
    }), y;
  }).sort(function(f, d) {
    var m = f.warningOnly, y = f.ruleIndex, p = d.warningOnly, h = d.ruleIndex;
    return !!m == !!p ? y - h : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var f = To(/* @__PURE__ */ Zt().mark(function d(m, y) {
        var p, h, g;
        return Zt().wrap(function(x) {
          for (; ; )
            switch (x.prev = x.next) {
              case 0:
                p = 0;
              case 1:
                if (!(p < s.length)) {
                  x.next = 12;
                  break;
                }
                return h = s[p], x.next = 5, Gs(o, t, h, r, a);
              case 5:
                if (g = x.sent, !g.length) {
                  x.next = 9;
                  break;
                }
                return y([{
                  errors: g,
                  rule: h
                }]), x.abrupt("return");
              case 9:
                p += 1, x.next = 1;
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
    var u = s.map(function(f) {
      return Gs(o, t, f, r, a).then(function(d) {
        return {
          errors: d,
          rule: f
        };
      });
    });
    c = (i ? AE(u) : NE(u)).then(function(f) {
      return Promise.reject(f);
    });
  }
  return c.catch(function(f) {
    return f;
  }), c;
}
function NE(e) {
  return Xs.apply(this, arguments);
}
function Xs() {
  return Xs = To(/* @__PURE__ */ Zt().mark(function e(t) {
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
  })), Xs.apply(this, arguments);
}
function AE(e) {
  return Qs.apply(this, arguments);
}
function Qs() {
  return Qs = To(/* @__PURE__ */ Zt().mark(function e(t) {
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
  })), Qs.apply(this, arguments);
}
var TE = ["name"], tt = [];
function Of(e, t, n, r, i, a) {
  return typeof e == "function" ? e(t, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var sc = /* @__PURE__ */ function(e) {
  Pw(n, e);
  var t = Tw(n);
  function n(r) {
    var i;
    if (Ii(this, n), i = t.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = tt, i.warnings = tt, i.cancelRegister = function() {
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
      !i.mounted || i.setState(function(c) {
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
      var d = i.props, m = d.shouldUpdate, y = d.dependencies, p = y === void 0 ? [] : y, h = d.onReset, g = f.store, b = i.getNamePath(), x = i.getValue(c), v = i.getValue(g), w = u && si(u, b);
      switch (f.type === "valueUpdate" && f.source === "external" && x !== v && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent()), f.type) {
        case "reset":
          if (!u || w) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), h == null || h(), i.refresh();
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
          if (m && !b.length && Of(m, c, g, x, v, f)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var C = p.map(xe);
          if (C.some(function($) {
            return si(f.relatedFields, $);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (w || (!p.length || b.length || m) && Of(m, c, g, x, v, f)) {
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
        var m = i.props, y = m.validateFirst, p = y === void 0 ? !1 : y, h = m.messageVariables, g = c || {}, b = g.triggerName, x = i.getRules();
        b && (x = x.filter(function(w) {
          return w;
        }).filter(function(w) {
          var E = w.validateTrigger;
          if (!E)
            return !0;
          var C = Zs(E);
          return C.includes(b);
        }));
        var v = PE(u, f, x, c, p, h);
        return v.catch(function(w) {
          return w;
        }).then(function() {
          var w = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tt;
          if (i.validatePromise === d) {
            var E;
            i.validatePromise = null;
            var C = [], $ = [];
            (E = w.forEach) === null || E === void 0 || E.call(w, function(A) {
              var O = A.rule.warningOnly, k = A.errors, D = k === void 0 ? tt : k;
              O ? $.push.apply($, re(D)) : C.push.apply(C, re(D));
            }), i.errors = C, i.warnings = $, i.triggerMetaEvent(), i.reRender();
          }
        }), v;
      });
      return i.validatePromise = d, i.dirty = !0, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), i.reRender(), d;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(Pn), f = u.getInitialValue;
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
      var f = Bs(c);
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
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, f = u.trigger, d = u.validateTrigger, m = u.getValueFromEvent, y = u.normalize, p = u.valuePropName, h = u.getValueProps, g = u.fieldContext, b = d !== void 0 ? d : g.validateTrigger, x = i.getNamePath(), v = g.getInternalHooks, w = g.getFieldsValue, E = v(Pn), C = E.dispatch, $ = i.getValue(), A = h || function(I) {
        return Ve({}, p, I);
      }, O = c[f], k = ne(ne({}, c), A($));
      k[f] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var I, T = arguments.length, _ = new Array(T), R = 0; R < T; R++)
          _[R] = arguments[R];
        m ? I = m.apply(void 0, _) : I = SE.apply(void 0, [p].concat(_)), y && (I = y(I, $, w(!0))), C({
          type: "updateValue",
          namePath: x,
          value: I
        }), O && O.apply(void 0, _);
      };
      var D = Zs(b || []);
      return D.forEach(function(I) {
        var T = k[I];
        k[I] = function() {
          T && T.apply(void 0, arguments);
          var _ = i.props.rules;
          _ && _.length && C({
            type: "validateField",
            namePath: x,
            triggerName: I
          });
        };
      }), k;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(Pn), s = o.initEntityValue;
      s($0(i));
    }
    return i;
  }
  return Li(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, c = s(Pn), u = c.registerField;
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
      !this.mounted || this.forceUpdate();
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
  var t = e.name, n = nc(e, TE), r = V.useContext(Ln), i = t !== void 0 ? xe(t) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ V.createElement(sc, Ta({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var RE = /* @__PURE__ */ V.createContext(null), I0 = function(t) {
  var n = t.name, r = t.initialValue, i = t.children, a = t.rules, o = t.validateTrigger, s = V.useContext(Ln), c = V.useRef({
    keys: [],
    id: 0
  }), u = c.current, f = V.useMemo(function() {
    var p = xe(s.prefixName) || [];
    return [].concat(re(p), re(xe(n)));
  }, [s.prefixName, n]), d = V.useMemo(function() {
    return ne(ne({}, s), {}, {
      prefixName: f
    });
  }, [s, f]), m = V.useMemo(function() {
    return {
      getKey: function(h) {
        var g = f.length, b = h[g];
        return [u.keys[b], h.slice(g + 1)];
      }
    };
  }, [f]);
  if (typeof i != "function")
    return yt(!1, "Form.List only accepts function as children."), null;
  var y = function(h, g, b) {
    var x = b.source;
    return x === "internal" ? !1 : h !== g;
  };
  return /* @__PURE__ */ V.createElement(RE.Provider, {
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
  }, function(p, h) {
    var g = p.value, b = g === void 0 ? [] : g, x = p.onChange, v = s.getFieldValue, w = function() {
      var A = v(f || []);
      return A || [];
    }, E = {
      add: function(A, O) {
        var k = w();
        O >= 0 && O <= k.length ? (u.keys = [].concat(re(u.keys.slice(0, O)), [u.id], re(u.keys.slice(O))), x([].concat(re(k.slice(0, O)), [A], re(k.slice(O))))) : (u.keys = [].concat(re(u.keys), [u.id]), x([].concat(re(k), [A]))), u.id += 1;
      },
      remove: function(A) {
        var O = w(), k = new Set(Array.isArray(A) ? A : [A]);
        k.size <= 0 || (u.keys = u.keys.filter(function(D, I) {
          return !k.has(I);
        }), x(O.filter(function(D, I) {
          return !k.has(I);
        })));
      },
      move: function(A, O) {
        if (A !== O) {
          var k = w();
          A < 0 || A >= k.length || O < 0 || O >= k.length || (u.keys = kf(u.keys, A, O), x(kf(k, A, O)));
        }
      }
    }, C = b || [];
    return Array.isArray(C) || (C = []), i(C.map(function($, A) {
      var O = u.keys[A];
      return O === void 0 && (u.keys[A] = u.id, O = u.keys[A], u.id += 1), {
        name: A,
        key: O,
        isListField: !0
      };
    }), E, h);
  })));
};
function ME(e, t) {
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
function Ei(e, t) {
  return N0(e) || ME(e, t) || rc(e, t) || A0();
}
function IE(e) {
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
var L0 = "__@field_split__";
function es(e) {
  return e.map(function(t) {
    return "".concat(ze(t), ":").concat(t);
  }).join(L0);
}
var Yn = /* @__PURE__ */ function() {
  function e() {
    Ii(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return Li(e, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(es(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(es(n));
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
      this.kvs.delete(es(n));
    }
  }, {
    key: "map",
    value: function(n) {
      return re(this.kvs.entries()).map(function(r) {
        var i = Ei(r, 2), a = i[0], o = i[1], s = a.split(L0);
        return n({
          key: s.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), f = Ei(u, 3), d = f[1], m = f[2];
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
}(), LE = ["name", "errors"], DE = /* @__PURE__ */ Li(function e(t) {
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
    return r === Pn ? (n.formHooked = !0, {
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
      var a, o = va({}, r, n.store);
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
    return r.length ? Ro(i) : i;
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
      if (!(!r && ((c = s.isListField) === null || c === void 0 ? void 0 : c.call(s))))
        if (!i)
          o.push(u);
        else {
          var f = "getMeta" in s ? s.getMeta() : null;
          i(f) && o.push(u);
        }
    }), $f(n.store, o.map(xe));
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
    var f = n.getFieldEntities(!0), d = function(g) {
      return g.isFieldTouched();
    };
    if (!c)
      return u ? f.every(d) : f.some(d);
    var m = new Yn();
    c.forEach(function(h) {
      m.set(h, []);
    }), f.forEach(function(h) {
      var g = h.getNamePath();
      c.forEach(function(b) {
        b.every(function(x, v) {
          return g[v] === x;
        }) && m.update(b, function(x) {
          return [].concat(re(x), [h]);
        });
      });
    });
    var y = function(g) {
      return g.some(d);
    }, p = m.map(function(h) {
      var g = h.value;
      return g;
    });
    return u ? p.every(y) : p.some(y);
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
            var p = i.get(m);
            if (p && p.size > 1)
              yt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (p) {
              var h = n.getFieldValue(m);
              (!r.skipExist || h === void 0) && n.updateStore(tn(n.store, m, re(p)[0].value));
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
      n.updateStore(va({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
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
      var c = nc(o, LE), u = xe(s);
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
    return i != null ? i : !0;
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
          return !M0(d.getNamePath(), i);
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
      var u = $f(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(re(s)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = va(n.store, r);
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
      if (a || o.push(f.getNamePath()), (i == null ? void 0 : i.recursive) && a) {
        var d = f.getNamePath();
        d.every(function(p, h) {
          return r[h] === p || r[h] === void 0;
        }) && o.push(d);
      }
      if (!(!f.props.rules || !f.props.rules.length)) {
        var m = f.getNamePath();
        if (!a || si(o, m)) {
          var y = f.validateRules(ne({
            validateMessages: ne(ne({}, F0), n.validateMessages)
          }, i));
          s.push(y.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(p) {
            var h, g = [], b = [];
            return (h = p.forEach) === null || h === void 0 || h.call(p, function(x) {
              var v = x.rule.warningOnly, w = x.errors;
              v ? b.push.apply(b, re(w)) : g.push.apply(g, re(w));
            }), g.length ? Promise.reject({
              name: m,
              errors: g,
              warnings: b
            }) : {
              name: m,
              errors: g,
              warnings: b
            };
          }));
        }
      }
    });
    var c = IE(s);
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
  var t = V.useRef(), n = V.useState({}), r = Ei(n, 2), i = r[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        i({});
      }, o = new DE(a);
      t.current = o.getForm();
    }
  return [t.current];
}
var Js = /* @__PURE__ */ V.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), VE = function(t) {
  var n = t.validateMessages, r = t.onFormChange, i = t.onFormFinish, a = t.children, o = V.useContext(Js), s = V.useRef({});
  return /* @__PURE__ */ V.createElement(Js.Provider, {
    value: ne(ne({}, o), {}, {
      validateMessages: ne(ne({}, o.validateMessages), n),
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
        u && (s.current = ne(ne({}, s.current), {}, Ve({}, u, f))), o.registerForm(u, f);
      },
      unregisterForm: function(u) {
        var f = ne({}, s.current);
        delete f[u], s.current = f, o.unregisterForm(u);
      }
    })
  }, a);
}, jE = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], BE = function(t, n) {
  var r = t.name, i = t.initialValues, a = t.fields, o = t.form, s = t.preserve, c = t.children, u = t.component, f = u === void 0 ? "form" : u, d = t.validateMessages, m = t.validateTrigger, y = m === void 0 ? "onChange" : m, p = t.onValuesChange, h = t.onFieldsChange, g = t.onFinish, b = t.onFinishFailed, x = nc(t, jE), v = V.useContext(Js), w = cc(o), E = Ei(w, 1), C = E[0], $ = C.getInternalHooks(Pn), A = $.useSubscribe, O = $.setInitialValues, k = $.setCallbacks, D = $.setValidateMessages, I = $.setPreserve, T = $.destroyForm;
  V.useImperativeHandle(n, function() {
    return C;
  }), V.useEffect(function() {
    return v.registerForm(r, C), function() {
      v.unregisterForm(r);
    };
  }, [v, C, r]), D(ne(ne({}, v.validateMessages), d)), k({
    onValuesChange: p,
    onFieldsChange: function(W) {
      if (v.triggerFormChange(r, W), h) {
        for (var U = arguments.length, q = new Array(U > 1 ? U - 1 : 0), G = 1; G < U; G++)
          q[G - 1] = arguments[G];
        h.apply(void 0, [W].concat(q));
      }
    },
    onFinish: function(W) {
      v.triggerFormFinish(r, W), g && g(W);
    },
    onFinishFailed: b
  }), I(s);
  var _ = V.useRef(null);
  O(i, !_.current), _.current || (_.current = !0), V.useEffect(
    function() {
      return T;
    },
    []
  );
  var R, N = typeof c == "function";
  if (N) {
    var S = C.getFieldsValue(!0);
    R = c(S, C);
  } else
    R = c;
  A(!N);
  var M = V.useRef();
  V.useEffect(function() {
    kE(M.current || [], a || []) || C.setFields(a || []), M.current = a;
  }, [a, C]);
  var P = V.useMemo(function() {
    return ne(ne({}, C), {}, {
      validateTrigger: y
    });
  }, [C, y]), F = /* @__PURE__ */ V.createElement(Ln.Provider, {
    value: P
  }, R);
  return f === !1 ? F : /* @__PURE__ */ V.createElement(f, Ta({}, x, {
    onSubmit: function(W) {
      W.preventDefault(), W.stopPropagation(), C.submit();
    },
    onReset: function(W) {
      var U;
      W.preventDefault(), C.resetFields(), (U = x.onReset) === null || U === void 0 || U.call(x, W);
    }
  }), F);
};
function Ff(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function uc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = r === void 0 ? [] : r, a = t[1], o = K(), s = Ei(o, 2), c = s[0], u = s[1], f = ee(function() {
    return Ff(c);
  }, [c]), d = j(f);
  d.current = f;
  var m = ot(Ln), y = a || m, p = y && y._init, h = xe(i), g = j(h);
  return g.current = h, Y(
    function() {
      if (!!p) {
        var b = y.getFieldsValue, x = y.getInternalHooks, v = x(Pn), w = v.registerWatch, E = w(function($) {
          var A = an($, g.current), O = Ff(A);
          d.current !== O && (d.current = O, u(A));
        }), C = an(b(), g.current);
        return u(C), E;
      }
    },
    [p]
  ), c;
}
var WE = /* @__PURE__ */ V.forwardRef(BE), Rr = WE;
Rr.FormProvider = VE;
Rr.Field = lc;
Rr.List = I0;
Rr.useForm = cc;
Rr.useWatch = uc;
const D0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, fc = l.createContext(D0), Pf = l.createContext(null), V0 = () => null;
var ZE = dl, HE = _i;
function UE(e, t, n) {
  (n !== void 0 && !HE(e[t], n) || n === void 0 && !(t in e)) && ZE(e, t, n);
}
var j0 = UE;
function zE(e) {
  return function(t, n, r) {
    for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var qE = zE, KE = qE, GE = KE(), YE = GE, el = { exports: {} };
(function(e, t) {
  var n = bt, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(u, f) {
    if (f)
      return u.slice();
    var d = u.length, m = s ? s(d) : new u.constructor(d);
    return u.copy(m), m;
  }
  e.exports = c;
})(el, el.exports);
var Nf = Od;
function XE(e) {
  var t = new e.constructor(e.byteLength);
  return new Nf(t).set(new Nf(e)), t;
}
var QE = XE, JE = QE;
function eC(e, t) {
  var n = t ? JE(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var tC = eC;
function nC(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var rC = nC, iC = Pt, Af = Object.create, aC = function() {
  function e() {
  }
  return function(t) {
    if (!iC(t))
      return {};
    if (Af)
      return Af(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), oC = aC, sC = oC, lC = Nd, cC = hl;
function uC(e) {
  return typeof e.constructor == "function" && !cC(e) ? sC(lC(e)) : {};
}
var fC = uC, dC = ja, mC = Bn;
function hC(e) {
  return mC(e) && dC(e);
}
var vC = hC;
function pC(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var B0 = pC;
function gC(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var yC = gC, bC = Pt, wC = hl, EC = yC, CC = Object.prototype, xC = CC.hasOwnProperty;
function $C(e) {
  if (!bC(e))
    return EC(e);
  var t = wC(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !xC.call(e, r)) || n.push(r);
  return n;
}
var _C = $C, kC = gd, SC = _C, OC = ja;
function FC(e) {
  return OC(e) ? kC(e, !0) : SC(e);
}
var W0 = FC, PC = ud, NC = W0;
function AC(e) {
  return PC(e, NC(e));
}
var TC = AC, Tf = j0, RC = el.exports, MC = tC, IC = rC, LC = fC, Rf = pd, Mf = Ba, DC = vC, VC = ci.exports, jC = fl, BC = Pt, WC = b6, ZC = ml, If = B0, HC = TC;
function UC(e, t, n, r, i, a, o) {
  var s = If(e, n), c = If(t, n), u = o.get(c);
  if (u) {
    Tf(e, n, u);
    return;
  }
  var f = a ? a(s, c, n + "", e, t, o) : void 0, d = f === void 0;
  if (d) {
    var m = Mf(c), y = !m && VC(c), p = !m && !y && ZC(c);
    f = c, m || y || p ? Mf(s) ? f = s : DC(s) ? f = IC(s) : y ? (d = !1, f = RC(c, !0)) : p ? (d = !1, f = MC(c, !0)) : f = [] : WC(c) || Rf(c) ? (f = s, Rf(s) ? f = HC(s) : (!BC(s) || jC(s)) && (f = LC(c))) : d = !1;
  }
  d && (o.set(c, f), i(f, c, r, a, o), o.delete(c)), Tf(e, n, f);
}
var zC = UC, qC = kd, KC = j0, GC = YE, YC = zC, XC = Pt, QC = W0, JC = B0;
function Z0(e, t, n, r, i) {
  e !== t && GC(t, function(a, o) {
    if (i || (i = new qC()), XC(a))
      YC(e, t, o, n, Z0, r, i);
    else {
      var s = r ? r(JC(e, o), a, o + "", e, t, i) : void 0;
      s === void 0 && (s = a), KC(e, o, s);
    }
  }, QC);
}
var ex = Z0, tx = ex, nx = hd, rx = nx(function(e, t, n) {
  tx(e, t, n);
}), ix = rx;
const H0 = (e) => l.createElement(I0, {
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
}), Lf = "adm-form", ax = D0, ox = fe((e, t) => {
  const n = z(ax, e), {
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
  } = ge(), p = ee(() => ix({}, y.Form.defaultValidateMessages, m.validateMessages), [y.Form.defaultValidateMessages, m.validateMessages]), h = [];
  let g = null, b = [], x = 0;
  function v() {
    b.length !== 0 && (x += 1, h.push(l.createElement(kt, {
      header: g,
      key: x,
      mode: u
    }, b)), b = []);
  }
  return mn(n.children, (w) => {
    if (l.isValidElement(w)) {
      if (w.type === V0) {
        v(), g = w.props.children;
        return;
      }
      if (w.type === H0) {
        v(), h.push(w);
        return;
      }
    }
    b.push(w);
  }), v(), l.createElement(Rr, Object.assign({
    className: B(Lf, r),
    style: i,
    ref: t
  }, m, {
    validateMessages: p
  }), l.createElement(fc.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: d,
      disabled: f
    }
  }, h), c && l.createElement("div", {
    className: `${Lf}-footer`
  }, c));
});
var Ci = {}, Vi = { exports: {} }, U0 = { exports: {} };
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(U0);
(function(e) {
  var t = U0.exports.default;
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
})(Vi);
var ji = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ji);
var ut = {};
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
ut.warningOnce = Bi;
var tl = {}, z0 = function(t) {
};
ut.preMessage = z0;
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
function Bi(e, t) {
  dc(q0, e, t);
}
function Y0(e, t) {
  dc(K0, e, t);
}
Bi.preMessage = z0;
Bi.resetWarned = G0;
Bi.noteOnce = Y0;
var sx = Bi;
ut.default = sx;
var lx = Vi.exports.default, cx = ji.exports.default;
Object.defineProperty(Ci, "__esModule", {
  value: !0
});
var X0 = Ci.default = Ci.HOOK_MARK = void 0, ux = cx(ut), fx = lx(l), dx = "RC_FORM_INTERNAL_HOOKS";
Ci.HOOK_MARK = dx;
var ue = function() {
  (0, ux.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, mx = /* @__PURE__ */ fx.createContext({
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
}), hx = mx;
X0 = Ci.default = hx;
function ts(e) {
  return e === void 0 || e === !1 ? [] : Array.isArray(e) ? e : [e];
}
function vx(e) {
  const t = e.prototype;
  return !!(t && t.isReactComponent);
}
function px(e) {
  return typeof e == "function" && !vx(e) && e.defaultProps === void 0;
}
function Q0(e) {
  return Aa.exports.isFragment(e) ? !1 : Aa.exports.isMemo(e) ? Q0(e.type) : !px(e.type);
}
const gx = je((e) => Z(e, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
}))))), yx = ["top", "right", "bottom", "left"], mr = Math.min, An = Math.max, Ma = Math.round, ia = Math.floor, cn = (e) => ({
  x: e,
  y: e
}), bx = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, wx = {
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
function Wi(e) {
  return e.split("-")[1];
}
function mc(e) {
  return e === "x" ? "y" : "x";
}
function hc(e) {
  return e === "y" ? "height" : "width";
}
function Zi(e) {
  return ["top", "bottom"].includes(fn(e)) ? "y" : "x";
}
function vc(e) {
  return mc(Zi(e));
}
function Ex(e, t, n) {
  n === void 0 && (n = !1);
  const r = Wi(e), i = vc(e), a = hc(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (o = Ia(o)), [o, Ia(o)];
}
function Cx(e) {
  const t = Ia(e);
  return [rl(e), t, rl(t)];
}
function rl(e) {
  return e.replace(/start|end/g, (t) => wx[t]);
}
function xx(e, t, n) {
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
function $x(e, t, n, r) {
  const i = Wi(e);
  let a = xx(fn(e), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), t && (a = a.concat(a.map(rl)))), a;
}
function Ia(e) {
  return e.replace(/left|right|bottom|top/g, (t) => bx[t]);
}
function _x(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function J0(e) {
  return typeof e != "number" ? _x(e) : {
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
function Df(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const a = Zi(t), o = vc(t), s = hc(o), c = fn(t), u = a === "y", f = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, m = r[s] / 2 - i[s] / 2;
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
  switch (Wi(t)) {
    case "start":
      y[o] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      y[o] += m * (n && u ? -1 : 1);
      break;
  }
  return y;
}
const kx = async (e, t, n) => {
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
  } = Df(u, r, c), m = r, y = {}, p = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: g,
      fn: b
    } = s[h], {
      x,
      y: v,
      data: w,
      reset: E
    } = await b({
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
    if (f = x != null ? x : f, d = v != null ? v : d, y = {
      ...y,
      [g]: {
        ...y[g],
        ...w
      }
    }, E && p <= 50) {
      p++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : E.rects), {
        x: f,
        y: d
      } = Df(u, m, c)), h = -1;
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
  } = un(t, e), p = J0(y), g = s[m ? d === "floating" ? "reference" : "floating" : d], b = La(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: c
  })), x = d === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, v = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), w = await (a.isElement == null ? void 0 : a.isElement(v)) ? await (a.getScale == null ? void 0 : a.getScale(v)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = La(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: x,
    offsetParent: v,
    strategy: c
  }) : x);
  return {
    top: (b.top - E.top + p.top) / w.y,
    bottom: (E.bottom - b.bottom + p.bottom) / w.y,
    left: (b.left - E.left + p.left) / w.x,
    right: (E.right - b.right + p.right) / w.x
  };
}
const Sx = (e) => ({
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
    }, y = vc(i), p = hc(y), h = await o.getDimensions(u), g = y === "y", b = g ? "top" : "left", x = g ? "bottom" : "right", v = g ? "clientHeight" : "clientWidth", w = a.reference[p] + a.reference[y] - m[y] - a.floating[p], E = m[y] - a.reference[y], C = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(u));
    let $ = C ? C[v] : 0;
    (!$ || !await (o.isElement == null ? void 0 : o.isElement(C))) && ($ = s.floating[v] || a.floating[p]);
    const A = w / 2 - E / 2, O = $ / 2 - h[p] / 2 - 1, k = mr(d[b], O), D = mr(d[x], O), I = k, T = $ - h[p] - D, _ = $ / 2 - h[p] / 2 + A, R = nl(I, _, T), N = !c.arrow && Wi(i) != null && _ != R && a.reference[p] / 2 - (_ < I ? k : D) - h[p] / 2 < 0, S = N ? _ < I ? _ - I : _ - T : 0;
    return {
      [y]: m[y] + S,
      data: {
        [y]: R,
        centerOffset: _ - R - S,
        ...N && {
          alignmentOffset: S
        }
      },
      reset: N
    };
  }
}), Ox = function(e) {
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
        fallbackAxisSideDirection: p = "none",
        flipAlignment: h = !0,
        ...g
      } = un(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const b = fn(i), x = fn(s) === s, v = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), w = m || (x || !h ? [Ia(s)] : Cx(s));
      !m && p !== "none" && w.push(...$x(s, h, p, v));
      const E = [s, ...w], C = await Da(t, g), $ = [];
      let A = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (f && $.push(C[b]), d) {
        const I = Ex(i, o, v);
        $.push(C[I[0]], C[I[1]]);
      }
      if (A = [...A, {
        placement: i,
        overflows: $
      }], !$.every((I) => I <= 0)) {
        var O, k;
        const I = (((O = a.flip) == null ? void 0 : O.index) || 0) + 1, T = E[I];
        if (T)
          return {
            data: {
              index: I,
              overflows: A
            },
            reset: {
              placement: T
            }
          };
        let _ = (k = A.filter((R) => R.overflows[0] <= 0).sort((R, N) => R.overflows[1] - N.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!_)
          switch (y) {
            case "bestFit": {
              var D;
              const R = (D = A.map((N) => [N.placement, N.overflows.filter((S) => S > 0).reduce((S, M) => S + M, 0)]).sort((N, S) => N[1] - S[1])[0]) == null ? void 0 : D[0];
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
function Vf(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function jf(e) {
  return yx.some((t) => e[t] >= 0);
}
const Fx = function(e) {
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
          }), o = Vf(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: jf(o)
            }
          };
        }
        case "escaped": {
          const a = await Da(t, {
            ...i,
            altBoundary: !0
          }), o = Vf(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: jf(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Px(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = fn(n), s = Wi(n), c = Zi(n) === "y", u = ["left", "top"].includes(o) ? -1 : 1, f = a && c ? -1 : 1, d = un(t, e);
  let {
    mainAxis: m,
    crossAxis: y,
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
  return s && typeof p == "number" && (y = s === "end" ? p * -1 : p), c ? {
    x: y * f,
    y: m * u
  } : {
    x: m * u,
    y: y * f
  };
}
const Nx = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await Px(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
}, Ax = function(e) {
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
          fn: (g) => {
            let {
              x: b,
              y: x
            } = g;
            return {
              x: b,
              y: x
            };
          }
        },
        ...c
      } = un(e, t), u = {
        x: n,
        y: r
      }, f = await Da(t, c), d = Zi(fn(i)), m = mc(d);
      let y = u[m], p = u[d];
      if (a) {
        const g = m === "y" ? "top" : "left", b = m === "y" ? "bottom" : "right", x = y + f[g], v = y - f[b];
        y = nl(x, y, v);
      }
      if (o) {
        const g = d === "y" ? "top" : "left", b = d === "y" ? "bottom" : "right", x = p + f[g], v = p - f[b];
        p = nl(x, p, v);
      }
      const h = s.fn({
        ...t,
        [m]: y,
        [d]: p
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - r
        }
      };
    }
  };
}, Tx = function(e) {
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
      }, d = Zi(i), m = mc(d);
      let y = f[m], p = f[d];
      const h = un(s, t), g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const v = m === "y" ? "height" : "width", w = a.reference[m] - a.floating[v] + g.mainAxis, E = a.reference[m] + a.reference[v] - g.mainAxis;
        y < w ? y = w : y > E && (y = E);
      }
      if (u) {
        var b, x;
        const v = m === "y" ? "width" : "height", w = ["top", "left"].includes(fn(i)), E = a.reference[d] - a.floating[v] + (w && ((b = o.offset) == null ? void 0 : b[d]) || 0) + (w ? 0 : g.crossAxis), C = a.reference[d] + a.reference[v] + (w ? 0 : ((x = o.offset) == null ? void 0 : x[d]) || 0) - (w ? g.crossAxis : 0);
        p < E ? p = E : p > C && (p = C);
      }
      return {
        [m]: y,
        [d]: p
      };
    }
  };
};
function dn(e) {
  return em(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Qe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function zt(e) {
  var t;
  return (t = (em(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function em(e) {
  return e instanceof Node || e instanceof Qe(e).Node;
}
function Ht(e) {
  return e instanceof Element || e instanceof Qe(e).Element;
}
function Ft(e) {
  return e instanceof HTMLElement || e instanceof Qe(e).HTMLElement;
}
function Bf(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Qe(e).ShadowRoot;
}
function Hi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = lt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function Rx(e) {
  return ["table", "td", "th"].includes(dn(e));
}
function pc(e) {
  const t = gc(), n = lt(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Mx(e) {
  let t = hr(e);
  for (; Ft(t) && !Mo(t); ) {
    if (pc(t))
      return t;
    t = hr(t);
  }
  return null;
}
function gc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Mo(e) {
  return ["html", "body", "#document"].includes(dn(e));
}
function lt(e) {
  return Qe(e).getComputedStyle(e);
}
function Io(e) {
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
  const t = e.assignedSlot || e.parentNode || Bf(e) && e.host || zt(e);
  return Bf(t) ? t.host : t;
}
function tm(e) {
  const t = hr(e);
  return Mo(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ft(t) && Hi(t) ? t : tm(t);
}
function xi(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const i = tm(e), a = i === ((r = e.ownerDocument) == null ? void 0 : r.body), o = Qe(i);
  return a ? t.concat(o, o.visualViewport || [], Hi(i) ? i : [], o.frameElement && n ? xi(o.frameElement) : []) : t.concat(i, xi(i, [], n));
}
function nm(e) {
  const t = lt(e);
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
const Ix = /* @__PURE__ */ cn(0);
function rm(e) {
  const t = Qe(e);
  return !gc() || !t.visualViewport ? Ix : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Lx(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Qe(e) ? !1 : t;
}
function Dn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), a = yc(e);
  let o = cn(1);
  t && (r ? Ht(r) && (o = or(r)) : o = or(e));
  const s = Lx(a, n, r) ? rm(a) : cn(0);
  let c = (i.left + s.x) / o.x, u = (i.top + s.y) / o.y, f = i.width / o.x, d = i.height / o.y;
  if (a) {
    const m = Qe(a), y = r && Ht(r) ? Qe(r) : r;
    let p = m.frameElement;
    for (; p && r && y !== m; ) {
      const h = or(p), g = p.getBoundingClientRect(), b = lt(p), x = g.left + (p.clientLeft + parseFloat(b.paddingLeft)) * h.x, v = g.top + (p.clientTop + parseFloat(b.paddingTop)) * h.y;
      c *= h.x, u *= h.y, f *= h.x, d *= h.y, c += x, u += v, p = Qe(p).frameElement;
    }
  }
  return La({
    width: f,
    height: d,
    x: c,
    y: u
  });
}
function Dx(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = Ft(n), a = zt(n);
  if (n === a)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = cn(1);
  const c = cn(0);
  if ((i || !i && r !== "fixed") && ((dn(n) !== "body" || Hi(a)) && (o = Io(n)), Ft(n))) {
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
function Vx(e) {
  return Array.from(e.getClientRects());
}
function im(e) {
  return Dn(zt(e)).left + Io(e).scrollLeft;
}
function jx(e) {
  const t = zt(e), n = Io(e), r = e.ownerDocument.body, i = An(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = An(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + im(e);
  const s = -n.scrollTop;
  return lt(r).direction === "rtl" && (o += An(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function Bx(e, t) {
  const n = Qe(e), r = zt(e), i = n.visualViewport;
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
function Wx(e, t) {
  const n = Dn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Ft(e) ? or(e) : cn(1), o = e.clientWidth * a.x, s = e.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: s,
    x: c,
    y: u
  };
}
function Wf(e, t, n) {
  let r;
  if (t === "viewport")
    r = Bx(e, n);
  else if (t === "document")
    r = jx(zt(e));
  else if (Ht(t))
    r = Wx(t, n);
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
  return n === t || !Ht(n) || Mo(n) ? !1 : lt(n).position === "fixed" || am(n, t);
}
function Zx(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = xi(e, [], !1).filter((s) => Ht(s) && dn(s) !== "body"), i = null;
  const a = lt(e).position === "fixed";
  let o = a ? hr(e) : e;
  for (; Ht(o) && !Mo(o); ) {
    const s = lt(o), c = pc(o);
    !c && s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Hi(o) && !c && am(e, o)) ? r = r.filter((f) => f !== o) : i = s, o = hr(o);
  }
  return t.set(e, r), r;
}
function Hx(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const o = [...n === "clippingAncestors" ? Zx(t, this._c) : [].concat(n), r], s = o[0], c = o.reduce((u, f) => {
    const d = Wf(t, f, i);
    return u.top = An(d.top, u.top), u.right = mr(d.right, u.right), u.bottom = mr(d.bottom, u.bottom), u.left = An(d.left, u.left), u;
  }, Wf(t, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Ux(e) {
  return nm(e);
}
function zx(e, t, n) {
  const r = Ft(t), i = zt(t), a = n === "fixed", o = Dn(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = cn(0);
  if (r || !r && !a)
    if ((dn(t) !== "body" || Hi(i)) && (s = Io(t)), r) {
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
function Zf(e, t) {
  return !Ft(e) || lt(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function om(e, t) {
  const n = Qe(e);
  if (!Ft(e))
    return n;
  let r = Zf(e, t);
  for (; r && Rx(r) && lt(r).position === "static"; )
    r = Zf(r, t);
  return r && (dn(r) === "html" || dn(r) === "body" && lt(r).position === "static" && !pc(r)) ? n : r || Mx(e) || n;
}
const qx = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const i = this.getOffsetParent || om, a = this.getDimensions;
  return {
    reference: zx(t, await i(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await a(n)
    }
  };
};
function Kx(e) {
  return lt(e).direction === "rtl";
}
const Gx = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Dx,
  getDocumentElement: zt,
  getClippingRect: Hx,
  getOffsetParent: om,
  getElementRects: qx,
  getClientRects: Vx,
  getDimensions: Ux,
  getScale: or,
  isElement: Ht,
  isRTL: Kx
};
function Yx(e, t) {
  let n = null, r;
  const i = zt(e);
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
    const y = ia(f), p = ia(i.clientWidth - (u + d)), h = ia(i.clientHeight - (f + m)), g = ia(u), x = {
      rootMargin: -y + "px " + -p + "px " + -h + "px " + -g + "px",
      threshold: An(0, mr(1, c)) || 1
    };
    let v = !0;
    function w(E) {
      const C = E[0].intersectionRatio;
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
      n = new IntersectionObserver(w, {
        ...x,
        root: i.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(w, x);
    }
    n.observe(e);
  }
  return o(!0), a;
}
function Xx(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = yc(e), f = i || a ? [...u ? xi(u) : [], ...xi(t)] : [];
  f.forEach((b) => {
    i && b.addEventListener("scroll", n, {
      passive: !0
    }), a && b.addEventListener("resize", n);
  });
  const d = u && s ? Yx(u, n) : null;
  let m = -1, y = null;
  o && (y = new ResizeObserver((b) => {
    let [x] = b;
    x && x.target === u && y && (y.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      y && y.observe(t);
    })), n();
  }), u && !c && y.observe(u), y.observe(t));
  let p, h = c ? Dn(e) : null;
  c && g();
  function g() {
    const b = Dn(e);
    h && (b.x !== h.x || b.y !== h.y || b.width !== h.width || b.height !== h.height) && n(), h = b, p = requestAnimationFrame(g);
  }
  return n(), () => {
    f.forEach((b) => {
      i && b.removeEventListener("scroll", n), a && b.removeEventListener("resize", n);
    }), d && d(), y && y.disconnect(), y = null, c && cancelAnimationFrame(p);
  };
}
const Qx = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: Gx,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return kx(e, t, {
    ...i,
    platform: a
  });
};
class Jx extends l.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const t = jm(this);
    t instanceof Element ? this.element = t : this.element = null;
  }
  render() {
    return l.Children.only(this.props.children);
  }
}
const e$ = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function t$(e) {
  var t;
  return (t = e$[e]) !== null && t !== void 0 ? t : e;
}
let rr = null, sr = null;
gr && (rr = document.createElement("div"), rr.className = "adm-px-tester", rr.style.setProperty("--size", "10"), document.body.appendChild(rr), sr = document.createElement("div"), sr.className = "adm-px-tester", document.body.appendChild(sr));
function Tn(e) {
  return rr === null || sr === null || rr.getBoundingClientRect().height === 10 ? e : (sr.style.setProperty("--size", e.toString()), sr.getBoundingClientRect().height);
}
const pn = "adm-popover", n$ = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body
}, sm = fe((e, t) => {
  const n = z(n$, e), {
    mode: r = "light"
  } = n, i = t$(n.placement), [a, o] = te({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  ye(t, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: a
  }), [a]);
  const s = j(null), c = j(null), u = j(null), f = ln(n.stopPropagation, Z(n, l.createElement("div", {
    className: B(pn, `${pn}-${r}`, !a && `${pn}-hidden`),
    ref: c
  }, l.createElement("div", {
    className: `${pn}-arrow`,
    ref: u
  }, l.createElement(gx, {
    className: `${pn}-arrow-icon`
  })), l.createElement("div", {
    className: `${pn}-inner`
  }, l.createElement("div", {
    className: `${pn}-inner-content`
  }, n.content))))), [d, m] = K(null);
  function y() {
    var h, g, b;
    return ke(this, void 0, void 0, function* () {
      const x = (g = (h = s.current) === null || h === void 0 ? void 0 : h.element) !== null && g !== void 0 ? g : null, v = c.current, w = u.current;
      if (m(x), !x || !v || !w)
        return;
      const {
        x: E,
        y: C,
        placement: $,
        middlewareData: A
      } = yield Qx(x, v, {
        placement: i,
        middleware: [Nx(Tn(12)), Ax({
          padding: Tn(4),
          crossAxis: !1,
          limiter: Tx()
        }), Ox(), Fx(), Sx({
          element: w,
          padding: Tn(12)
        })]
      });
      Object.assign(v.style, {
        left: `${E}px`,
        top: `${C}px`
      });
      const O = $.split("-")[0], k = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[O], {
        x: D,
        y: I
      } = (b = A.arrow) !== null && b !== void 0 ? b : {};
      Object.assign(w.style, {
        left: D != null ? `${D}px` : "",
        top: I != null ? `${I}px` : "",
        right: "",
        bottom: "",
        [k]: "calc(var(--arrow-size) * -1)"
      });
      const T = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[O];
      w.style.setProperty("--arrow-icon-rotate", T);
    });
  }
  Oe(() => {
    y();
  }), Y(() => {
    if (!d || !n.trigger)
      return;
    function h() {
      o((g) => !g);
    }
    return d.addEventListener("click", h), () => {
      d.removeEventListener("click", h);
    };
  }, [d, n.trigger]), Y(() => {
    const h = c.current;
    if (!(!d || !h))
      return Xx(d, h, y, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [d]), $d(() => {
    !n.trigger || o(!1);
  }, [() => {
    var h;
    return (h = s.current) === null || h === void 0 ? void 0 : h.element;
  }, c], ["click", "touchmove"]);
  const p = io(a, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(Jx, {
    ref: s
  }, n.children), p && Or(n.getContainer, f));
}), Qt = "adm-popover-menu", r$ = fe((e, t) => {
  const n = j(null);
  ye(t, () => n.current, []);
  const r = Ue((a) => {
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
        className: B(`${Qt}-item`, "adm-plain-anchor", s.disabled && `${Qt}-item-disabled`),
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
  Menu: r$
});
function i$(...e) {
  let t;
  for (t = 0; t < e.length && e[t] === void 0; t++)
    ;
  return e[t];
}
const a$ = "__SPLIT__", We = "adm-form-item", o$ = l.memo(({
  children: e
}) => e, (e, t) => e.value === t.value && e.update === t.update), s$ = (e) => {
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
  } = e, m = ot(fc), {
    locale: y
  } = ge(), p = e.hasFeedback !== void 0 ? e.hasFeedback : m.hasFeedback, h = e.layout || m.layout, g = (t = e.disabled) !== null && t !== void 0 ? t : m.disabled, b = (() => {
    const {
      requiredMarkStyle: w
    } = m;
    switch (w) {
      case "asterisk":
        return o && l.createElement("span", {
          className: `${We}-required-asterisk`
        }, "*");
      case "text-required":
        return o && l.createElement("span", {
          className: `${We}-required-text`
        }, "(", y.Form.required, ")");
      case "text-optional":
        return !o && l.createElement("span", {
          className: `${We}-required-text`
        }, "(", y.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), x = !!i && l.createElement("label", {
    className: `${We}-label`,
    htmlFor: c
  }, i, b, a && l.createElement(lm, {
    content: a,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${We}-label-help`,
    onClick: (w) => {
      w.preventDefault();
    }
  }, l.createElement(Ay, null)))), v = (!!e.description || p) && l.createElement(l.Fragment, null, e.description, p && l.createElement(l.Fragment, null, e.errors.map((w, E) => l.createElement("div", {
    key: `error-${E}`,
    className: `${We}-feedback-error`
  }, w)), e.warnings.map((w, E) => l.createElement("div", {
    key: `warning-${E}`,
    className: `${We}-feedback-warning`
  }, w))));
  return Z(e, l.createElement(kt.Item, {
    style: n,
    title: h === "vertical" && x,
    prefix: h === "horizontal" && x,
    extra: r,
    description: v,
    className: B(We, `${We}-${h}`, {
      [`${We}-hidden`]: u,
      [`${We}-has-error`]: e.errors.length
    }),
    disabled: g,
    onClick: e.onClick,
    clickable: e.clickable,
    arrow: f
  }, l.createElement("div", {
    className: B(`${We}-child`, `${We}-child-position-${d}`)
  }, l.createElement("div", {
    className: B(`${We}-child-inner`)
  }, s))));
}, l$ = (e) => {
  const {
    style: t,
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
    disabled: y,
    rules: p,
    children: h,
    messageVariables: g,
    trigger: b = "onChange",
    validateTrigger: x = b,
    onClick: v,
    shouldUpdate: w,
    dependencies: E,
    clickable: C,
    arrow: $
  } = e, A = yr(e, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: O
  } = ot(fc), {
    validateTrigger: k
  } = ot(X0), D = i$(x, k, b), I = j(null), T = j(0);
  T.current += 1;
  const [_, R] = K({}), N = Ue((W, U) => {
    R((q) => {
      const G = Object.assign({}, q), ae = U.join(a$);
      return W.destroy ? delete G[ae] : G[ae] = W, G;
    });
  }, [R]);
  function S(W, U, q, G) {
    var ae, de;
    if (c && !u)
      return W;
    const Ee = (ae = q == null ? void 0 : q.errors) !== null && ae !== void 0 ? ae : [], le = Object.keys(_).reduce((be, hn) => {
      var wt, dt;
      const Mr = (dt = (wt = _[hn]) === null || wt === void 0 ? void 0 : wt.errors) !== null && dt !== void 0 ? dt : [];
      return Mr.length && (be = [...be, ...Mr]), be;
    }, Ee), ft = (de = q == null ? void 0 : q.warnings) !== null && de !== void 0 ? de : [], Le = Object.keys(_).reduce((be, hn) => {
      var wt, dt;
      const Mr = (dt = (wt = _[hn]) === null || wt === void 0 ? void 0 : wt.warnings) !== null && dt !== void 0 ? dt : [];
      return Mr.length && (be = [...be, ...Mr]), be;
    }, ft);
    return Z(e, l.createElement(s$, {
      style: t,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: G,
      disabled: y,
      hasFeedback: a,
      htmlFor: U,
      errors: le,
      warnings: Le,
      onClick: v && ((be) => v(be, I)),
      hidden: u,
      layout: f,
      childElementPosition: d,
      clickable: C,
      arrow: $
    }, l.createElement(Pf.Provider, {
      value: N
    }, W)));
  }
  const M = typeof h == "function";
  if (!o && !M && !e.dependencies)
    return S(h);
  let P = {};
  P.label = typeof n == "string" ? n : "", g && (P = Object.assign(Object.assign({}, P), g));
  const F = ot(Pf), L = (W) => {
    if (c && F) {
      const U = W.name;
      F(W, U);
    }
  };
  return l.createElement(lc, Object.assign({}, A, {
    name: o,
    shouldUpdate: w,
    dependencies: E,
    rules: p,
    trigger: b,
    validateTrigger: D,
    onMetaChange: L,
    messageVariables: P
  }), (W, U, q) => {
    let G = null;
    const ae = s !== void 0 ? s : p && p.some((le) => !!(le && typeof le == "object" && le.required)), de = ts(o).length && U ? U.name : [], Ee = (de.length > 0 && O ? [O, ...de] : de).join("_");
    if (w && E && Ie("Form.Item", "`shouldUpdate` and `dependencies` shouldn't be used together."), M)
      (w || E) && !o ? G = h(q) : (w || E || Ie("Form.Item", "`children` of render props only work with `shouldUpdate` or `dependencies`."), o && Ie("Form.Item", "Do not use `name` with `children` of render props since it's not a field."));
    else if (E && !o)
      Ie("Form.Item", "Must set `name` or use render props when `dependencies` is set.");
    else if (l.isValidElement(h)) {
      h.props.defaultValue && Ie("Form.Item", "`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.");
      const le = Object.assign(Object.assign({}, h.props), W);
      Q0(h) && (le.ref = (Le) => {
        const be = h.ref;
        be && (typeof be == "function" && be(Le), "current" in be && (be.current = Le)), I.current = Le;
      }), le.id || (le.id = Ee), (/* @__PURE__ */ new Set([...ts(b), ...ts(D)])).forEach((Le) => {
        le[Le] = (...be) => {
          var hn, wt, dt;
          (hn = W[Le]) === null || hn === void 0 || hn.call(W, ...be), (dt = (wt = h.props)[Le]) === null || dt === void 0 || dt.call(wt, ...be);
        };
      }), G = l.createElement(o$, {
        value: W[e.valuePropName || "value"],
        update: T.current
      }, l.cloneElement(h, le));
    } else
      o && Ie("Form.Item", "`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead."), G = h;
    return S(G, Ee, U, ae);
  });
}, c$ = (e) => {
  const t = Cd(), n = ot(Ln), r = n.getFieldsValue(e.to), i = l.useMemo(() => e.children(r, n), [JSON.stringify(r), e.children]);
  return l.createElement(l.Fragment, null, i, e.to.map((a) => l.createElement(u$, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: t
  })));
}, u$ = je((e) => {
  const t = uc(e.namePath, e.form);
  return Ri(() => {
    e.onChange();
  }, [t]), null;
}), fS = ie(ox, {
  Item: l$,
  Subscribe: c$,
  Header: V0,
  Array: H0,
  useForm: cc,
  useWatch: uc
});
const cm = "adm-grid", f$ = (e) => {
  const t = {
    "--columns": e.columns.toString()
  }, {
    gap: n
  } = e;
  return n !== void 0 && (Array.isArray(n) ? (t["--gap-horizontal"] = On(n[0]), t["--gap-vertical"] = On(n[1])) : t["--gap"] = On(n)), Z(e, l.createElement("div", {
    className: cm,
    style: t
  }, e.children));
}, d$ = (e) => {
  const t = z({
    span: 1
  }, e), n = {
    "--item-span": t.span
  };
  return Z(t, l.createElement("div", {
    className: `${cm}-item`,
    style: n,
    onClick: t.onClick
  }, t.children));
}, um = ie(f$, {
  Item: d$
});
const m$ = M8([T1, E8]), aa = () => [1, 0, 0, 1, 0, 0], Hf = (e) => e[4], Uf = (e) => e[5], zr = (e) => e[0], qr = (e, t, n) => fm([1, 0, 0, 1, t, n], e), h$ = (e, t, n = t) => fm([t, 0, 0, n, 0, 0], e), v$ = (e, [t, n]) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], fm = (e, t) => [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]], ns = "adm-image-viewer", dm = (e) => {
  const {
    dragLockRef: t,
    maxZoom: n
  } = e, r = j([]), i = j(null), a = j(null), [{
    matrix: o
  }, s] = Ne(() => ({
    matrix: aa(),
    config: {
      tension: 200
    }
  })), c = bs(i), u = bs(a), f = j(!1), d = (p) => {
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
    const h = -c.width / 2, g = -c.height / 2, b = -u.width / 2, x = -u.height / 2, v = zr(p), w = v * u.width, E = v * u.height, C = h - (w - c.width), $ = h, A = g - (E - c.height), O = g, [k, D] = v$(p, [b, x]);
    return {
      x: {
        position: k,
        minX: C,
        maxX: $
      },
      y: {
        position: D,
        minY: A,
        maxY: O
      }
    };
  }, m = (p, h, g, b = 0) => [p <= h - b, p >= g + b], y = (p, h, g = !1) => {
    if (!c || !u)
      return p;
    const b = zr(p), x = b * u.width, v = b * u.height, {
      x: {
        position: w,
        minX: E,
        maxX: C
      },
      y: {
        position: $,
        minY: A,
        maxY: O
      }
    } = d(p);
    if (h === "translate") {
      let k = w, D = $;
      return x > c.width ? k = g ? $e(w, E, C) : yi(w, E, C, b * 50) : k = -x / 2, v > c.height ? D = g ? $e($, A, O) : yi($, A, O, b * 50) : D = -v / 2, qr(p, k - w, D - $);
    }
    if (h === "scale" && g) {
      const [k, D] = [x > c.width ? $e(w, E, C) : -x / 2, v > c.height ? $e($, A, O) : -v / 2];
      return qr(p, k - w, D - $);
    }
    return p;
  };
  return m$({
    onDrag: (p) => {
      var h;
      if (p.first) {
        const {
          x: {
            position: b,
            minX: x,
            maxX: v
          }
        } = d(o.get());
        r.current = m(b, x, v);
        return;
      }
      if (p.pinching)
        return p.cancel();
      if (p.tap && p.elapsedTime > 0 && p.elapsedTime < 1e3) {
        (h = e.onTap) === null || h === void 0 || h.call(e);
        return;
      }
      const g = zr(o.get());
      if (t && (t.current = g !== 1), !f.current && g <= 1)
        s.start({
          matrix: aa()
        });
      else {
        const b = o.get(), x = [p.offset[0] - Hf(b), p.offset[1] - Uf(b)], v = qr(b, ...p.last ? [x[0] + p.velocity[0] * p.direction[0] * 200, x[1] + p.velocity[1] * p.direction[1] * 200] : x);
        s.start({
          matrix: y(v, "translate", p.last),
          immediate: !p.last
        });
        const {
          x: {
            position: w,
            minX: E,
            maxX: C
          }
        } = d(v);
        p.last && r.current.some(($) => $) && m(w, E, C).some(($) => $) && (t && (t.current = !1), s.start({
          matrix: aa()
        }));
      }
    },
    onPinch: (p) => {
      var h;
      f.current = !p.last;
      const [g] = p.offset;
      if (g < 0)
        return;
      let b;
      n === "auto" ? b = c && u ? Math.max(c.height / u.height, c.width / u.width) : 1 : b = n;
      const x = p.last ? $e(g, 1, b) : g;
      if ((h = e.onZoomChange) === null || h === void 0 || h.call(e, x), p.last && x <= 1)
        s.start({
          matrix: aa()
        }), t && (t.current = !1);
      else {
        if (!c)
          return;
        const v = o.get(), w = zr(v), E = p.origin[0] - c.width / 2, C = p.origin[1] - c.height / 2;
        let $ = qr(v, -E, -C);
        $ = h$($, x / w), $ = qr($, E, C), s.start({
          matrix: y($, "scale", p.last),
          immediate: !p.last
        }), t && (t.current = !0);
      }
    }
  }, {
    target: i,
    drag: {
      from: () => [Hf(o.get()), Uf(o.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [zr(o.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), l.createElement("div", {
    className: `${ns}-slide`
  }, l.createElement("div", {
    className: `${ns}-control`,
    ref: i
  }, l.createElement(ve.div, {
    className: `${ns}-image-wrapper`,
    style: {
      matrix: o
    }
  }, l.createElement("img", {
    ref: a,
    src: e.image,
    draggable: !1,
    alt: e.image
  }))));
}, rs = "adm-image-viewer", p$ = fe((e, t) => {
  const n = window.innerWidth + Tn(16), [{
    x: r
  }, i] = Ne(() => ({
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
  const s = j(!1), c = Nt((u) => {
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
    className: `${rs}-slides`
  }, c()), l.createElement(ve.div, {
    className: `${rs}-indicator`
  }, r.to((u) => `${$e(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(ve.div, {
    className: `${rs}-slides-inner`,
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
  var t;
  const n = z(mm, e), r = l.createElement(Pi, {
    visible: n.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: n.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Va}-content`
  }, n.image && l.createElement(dm, {
    image: n.image,
    onTap: n.onClose,
    maxZoom: n.maxZoom
  })), n.image && l.createElement("div", {
    className: `${Va}-footer`
  }, (t = n.renderFooter) === null || t === void 0 ? void 0 : t.call(n, n.image), l.createElement(Ar, {
    position: "bottom"
  })));
  return Or(n.getContainer, r);
}, g$ = Object.assign(Object.assign({}, mm), {
  defaultIndex: 0
}), vm = fe((e, t) => {
  var n;
  const r = z(g$, e), [i, a] = K(r.defaultIndex), o = j(null);
  ye(t, () => ({
    swipeTo: (u, f) => {
      var d;
      a(u), (d = o.current) === null || d === void 0 || d.swipeTo(u, f);
    }
  }));
  const s = Ue((u) => {
    var f;
    u !== i && (a(u), (f = r.onIndexChange) === null || f === void 0 || f.call(r, u));
  }, [r.onIndexChange, i]), c = l.createElement(Pi, {
    visible: r.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: r.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Va}-content`
  }, r.images && l.createElement(p$, {
    ref: o,
    defaultIndex: i,
    onIndexChange: s,
    images: r.images,
    onTap: r.onClose,
    maxZoom: r.maxZoom
  })), r.images && l.createElement("div", {
    className: `${Va}-footer`
  }, (n = r.renderFooter) === null || n === void 0 ? void 0 : n.call(r, r.images[i], i), l.createElement(Ar, {
    position: "bottom"
  })));
  return Or(r.getContainer, c);
}), vr = /* @__PURE__ */ new Set();
function y$(e) {
  bc();
  const t = Tr(l.createElement(hm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      vr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return vr.add(t), t;
}
function b$(e) {
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
const w$ = ie(vm, {
  show: b$
}), E$ = ie(hm, {
  Multi: w$,
  show: y$,
  clear: bc
}), gn = "adm-image-uploader", C$ = (e) => {
  const {
    locale: t
  } = ge(), {
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
    }, l.createElement(ql, {
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
}, zf = C$;
const yn = "adm-space", x$ = {
  direction: "horizontal"
}, $$ = (e) => {
  const t = z(x$, e), {
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
}, wc = $$, $t = "adm-image-uploader", _$ = {
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
}, k$ = fe((e, t) => {
  const {
    locale: n
  } = ge(), r = z(_$, e), {
    columns: i
  } = r, [a, o] = te(r), [s, c] = K([]), u = j(null), f = bs(u), d = j(null), [m, y] = K(80), p = j(null);
  Oe(() => {
    const T = d.current;
    if (i && f && T) {
      const _ = f.width, R = z1(window.getComputedStyle(T).getPropertyValue("height"));
      y((_ - R * (i - 1)) / i);
    }
  }, [f == null ? void 0 : f.width]);
  const h = {
    "--cell-size": m + "px"
  };
  Oe(() => {
    c((T) => T.filter((_) => _.url === void 0 ? !0 : !a.some((R) => R.url === _.url)));
  }, [a]), Oe(() => {
    var T;
    (T = r.onUploadQueueChange) === null || T === void 0 || T.call(r, s.map((_) => ({
      id: _.id,
      status: _.status
    })));
  }, [s]);
  const g = j(0), {
    maxCount: b,
    onPreview: x,
    renderItem: v
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
  function C(T) {
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
        const P = N.map((F) => w(F, N));
        yield Promise.all(P).then((F) => {
          N = F.filter(Boolean);
        });
      }
      if (N.length === 0)
        return;
      if (b > 0) {
        const P = a.length + N.length - b;
        P > 0 && (N = N.slice(0, N.length - P), (_ = r.onCountExceed) === null || _ === void 0 || _.call(r, P));
      }
      const S = N.map((P) => ({
        id: g.current++,
        status: "pending",
        file: P
      }));
      c((P) => [...E(P), ...S]);
      const M = [];
      yield Promise.all(S.map((P, F) => ke(this, void 0, void 0, function* () {
        try {
          const L = yield r.upload(P.file);
          M[F] = L, c((W) => W.map((U) => U.id === P.id ? Object.assign(Object.assign({}, U), {
            status: "success",
            url: L.url
          }) : U));
        } catch (L) {
          throw c((W) => W.map((U) => U.id === P.id ? Object.assign(Object.assign({}, U), {
            status: "fail"
          }) : U)), L;
        }
      }))).catch((P) => console.error(P)), o((P) => P.concat(M));
    });
  }
  const $ = j(null);
  function A(T) {
    $.current = E$.Multi.show({
      images: a.map((_) => _.url),
      defaultIndex: T,
      onClose: () => {
        $.current = null;
      }
    });
  }
  Si(() => {
    var T;
    (T = $.current) === null || T === void 0 || T.close();
  });
  const O = E(s), k = r.showUpload && (b === 0 || a.length + O.length < b), D = () => a.map((T, _) => {
    var R, N;
    const S = l.createElement(zf, {
      key: (R = T.key) !== null && R !== void 0 ? R : _,
      url: (N = T.thumbnailUrl) !== null && N !== void 0 ? N : T.url,
      deletable: r.deletable,
      deleteIcon: r.deleteIcon,
      imageFit: r.imageFit,
      onClick: () => {
        r.preview && A(_), x && x(_, T);
      },
      onDelete: () => ke(void 0, void 0, void 0, function* () {
        var M;
        (yield (M = r.onDelete) === null || M === void 0 ? void 0 : M.call(r, T)) !== !1 && o(a.filter((F, L) => L !== _));
      })
    });
    return v ? v(S, T, a) : S;
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
  }, l.createElement(p1, null))), !r.disableUpload && l.createElement("input", {
    ref: p,
    capture: r.capture,
    accept: r.accept,
    multiple: r.multiple,
    type: "file",
    className: `${$t}-input`,
    onChange: C,
    "aria-hidden": !0
  })));
  return ye(t, () => ({
    get nativeElement() {
      return p.current;
    }
  })), Z(r, l.createElement("div", {
    className: $t,
    ref: u
  }, i ? l.createElement(um, {
    className: `${$t}-grid`,
    columns: i,
    style: h
  }, l.createElement("div", {
    className: `${$t}-gap-measure`,
    ref: d
  }), I.props.children) : l.createElement(wc, {
    className: `${$t}-space`,
    wrap: !0,
    block: !0
  }, I.props.children)));
});
const dS = k$;
const pm = () => null, Xn = "adm-index-bar", S$ = (e) => {
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
}, Qn = "adm-index-bar", O$ = {
  sticky: !0
}, F$ = fe((e, t) => {
  const n = z(O$, e), r = Tn(35), i = j(null), a = [], o = [];
  mn(n.children, (d) => {
    var m;
    if (!!l.isValidElement(d)) {
      if (d.type !== pm) {
        Ie("IndexBar", "The children of `IndexBar` must be `IndexBar.Panel` components.");
        return;
      }
      a.push({
        index: d.props.index,
        brief: (m = d.props.brief) !== null && m !== void 0 ? m : d.props.index.charAt(0)
      }), o.push(Z(d.props, l.createElement("div", {
        key: d.props.index,
        "data-index": d.props.index,
        className: `${Qn}-anchor`
      }, l.createElement("div", {
        className: `${Qn}-anchor-title`
      }, d.props.title || d.props.index), d.props.children)));
    }
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
    const p = y.children;
    for (let h = 0; h < p.length; h++) {
      const g = p.item(h);
      if (!g)
        continue;
      if (g.dataset.index === d) {
        y.scrollTop = g.offsetTop, c(d), s !== d && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, d));
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
    const y = m.scrollTop, p = m.getElementsByClassName(`${Qn}-anchor`);
    for (let h = 0; h < p.length; h++) {
      const g = p.item(h);
      if (!g)
        continue;
      const b = g.dataset.index;
      if (!!b && g.offsetTop + g.clientHeight - r > y) {
        c(b), s !== b && ((d = n.onIndexChange) === null || d === void 0 || d.call(n, b));
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
  }, l.createElement(S$, {
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
}), mS = ie(F$, {
  Panel: pm
});
function P$(e) {
  return e === window;
}
const gm = "adm-infinite-scroll", N$ = {
  threshold: 250,
  children: (e, t, n) => l.createElement(T$, {
    hasMore: e,
    failed: t,
    retry: n
  })
}, A$ = (e) => {
  const t = z(N$, e), [n, r] = K(!1), i = o6((y) => ke(void 0, void 0, void 0, function* () {
    try {
      yield t.loadMore(y);
    } catch (p) {
      throw r(!0), p;
    }
  })), a = j(null), [o, s] = K({}), c = j(o), [u, f] = K(), {
    run: d
  } = Ka(() => ke(void 0, void 0, void 0, function* () {
    if (c.current !== o || !t.hasMore)
      return;
    const y = a.current;
    if (!y || !y.offsetParent)
      return;
    const p = Ea(y);
    if (f(p), !p)
      return;
    const g = y.getBoundingClientRect().top;
    if ((P$(p) ? window.innerHeight : p.getBoundingClientRect().bottom) >= g - t.threshold) {
      const x = {};
      c.current = x, yield i(!1), s(x);
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
    function p() {
      d();
    }
    return u.addEventListener("scroll", p), () => {
      u.removeEventListener("scroll", p);
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
}, T$ = (e) => {
  const {
    locale: t
  } = ge();
  return e.hasMore ? e.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${gm}-failed-text`
  }, t.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      e.retry();
    }
  }, t.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, t.common.loading), l.createElement(V1, null)) : l.createElement("span", null, t.InfiniteScroll.noMore);
}, hS = A$;
const oa = "adm-input", R$ = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, M$ = fe((e, t) => {
  const n = z(R$, e), [r, i] = te(n), [a, o] = K(!1), s = j(!1), c = j(null), {
    locale: u
  } = ge();
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
    var p;
    n.onEnterPress && (y.code === "Enter" || y.keyCode === 13) && n.onEnterPress(y), (p = n.onKeyDown) === null || p === void 0 || p.call(n, y);
  };
  Oe(() => {
    var y;
    if (!!n.enterKeyHint)
      return (y = c.current) === null || y === void 0 || y.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var p;
        (p = c.current) === null || p === void 0 || p.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function d() {
    let y = r;
    if (n.type === "number") {
      const p = y && $e(parseFloat(y), n.min, n.max).toString();
      Number(y) !== Number(p) && (y = p);
    }
    y !== r && i(y);
  }
  const m = (() => !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0)();
  return Z(n, l.createElement("div", {
    className: B(`${oa}`, n.disabled && `${oa}-disabled`)
  }, l.createElement("input", {
    ref: c,
    className: `${oa}-element`,
    value: r,
    onChange: (y) => {
      i(y.target.value);
    },
    onFocus: (y) => {
      var p;
      o(!0), (p = n.onFocus) === null || p === void 0 || p.call(n, y);
    },
    onBlur: (y) => {
      var p;
      o(!1), d(), (p = n.onBlur) === null || p === void 0 || p.call(n, y);
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
      var p;
      s.current = !0, (p = n.onCompositionStart) === null || p === void 0 || p.call(n, y);
    },
    onCompositionEnd: (y) => {
      var p;
      s.current = !1, (p = n.onCompositionEnd) === null || p === void 0 || p.call(n, y);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && l.createElement("div", {
    className: `${oa}-clear`,
    onMouseDown: (y) => {
      y.preventDefault();
    },
    onClick: () => {
      var y, p;
      i(""), (y = n.onClear) === null || y === void 0 || y.call(n), h9() && s.current && (s.current = !1, (p = c.current) === null || p === void 0 || p.blur());
    },
    "aria-label": u.Input.clear
  }, l.createElement(ao, null))));
}), ym = M$;
const Ct = "adm-jumbo-tabs", I$ = () => null, L$ = (e) => {
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
    const p = o.push(d);
    i[y] = p - 1;
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
  } = Z1(n, i[s]);
  return Mi(() => {
    f(!0);
  }, r), Z(e, l.createElement("div", {
    className: Ct,
    ref: r
  }, l.createElement("div", {
    className: `${Ct}-header`
  }, l.createElement(H1, {
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
}, vS = ie(L$, {
  Tab: I$
}), pS = D1;
const D$ = (e) => {
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
}, V$ = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, bm = (e) => {
  const t = z(V$, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Rt("image-container")
  }, l.createElement(lo, {
    src: t.image,
    alt: "modal header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Rt("header")
  }, l.createElement(gi, null, t.header)), !!t.title && l.createElement("div", {
    className: Rt("title")
  }, t.title), l.createElement("div", {
    className: Rt("content")
  }, typeof t.content == "string" ? l.createElement(gi, null, t.content) : t.content), l.createElement(wc, {
    direction: "vertical",
    block: !0,
    className: B(Rt("footer"), t.actions.length === 0 && Rt("footer-empty"))
  }, t.actions.map((r, i) => l.createElement(D$, {
    key: r.key,
    action: r,
    onAction: () => ke(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = t.onAction) === null || o === void 0 ? void 0 : o.call(t, r, i)]), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    })
  }))));
  return l.createElement(l0, {
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
function j$(e) {
  const t = {
    confirmText: $i().locale.Modal.ok
  }, n = z(t, e);
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
const B$ = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function W$(e) {
  const {
    locale: t
  } = $i(), n = z(B$, {
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
function Z$() {
  il.forEach((e) => {
    e();
  });
}
const gS = ie(bm, {
  show: Ec,
  alert: j$,
  confirm: W$,
  clear: Z$
});
const Jn = "adm-nav-bar", H$ = {
  backArrow: !0
}, U$ = (e) => {
  const t = z(H$, e), {
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
  }, r === !0 ? l.createElement(Py, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), t.left), l.createElement("div", {
    className: `${Jn}-title`
  }, t.children), l.createElement("div", {
    className: `${Jn}-right`
  }, t.right)));
}, yS = U$;
const Mt = "adm-notice-bar", z$ = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement(My, null)
}, q$ = je((e) => {
  const t = z(z$, e), n = j(null), r = j(null), [i, a] = K(!0), o = t.speed, s = j(!0), c = j(!1);
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
  return H6(() => {
    s.current = !1, u();
  }, t.delay), Mi(() => {
    u();
  }, n), Zl(() => {
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
}), bS = q$;
function K$(e) {
  const t = [...e];
  for (let n = t.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [t[n - 1], t[r]] = [t[r], t[n - 1]];
  }
  return t;
}
const Ce = "adm-number-keyboard", G$ = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Y$ = (e) => {
  const t = z(G$, e), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = t, f = j(null), d = ee(() => {
    const w = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], E = s ? K$(w) : w, C = Array.isArray(o) ? o : [o];
    return E.push("0"), a ? (C.length === 2 && E.splice(9, 0, C.pop()), E.push(C[0] || "")) : (E.splice(9, 0, C[0] || ""), E.push(C[1] || "BACKSPACE")), E;
  }, [o, a, s, s && n]), m = j(-1), y = j(-1), p = Ut(() => {
    var w;
    (w = t.onDelete) === null || w === void 0 || w.call(t);
  }), h = () => {
    m.current = window.setTimeout(() => {
      p(), y.current = window.setInterval(p, 150);
    }, 700);
  }, g = () => {
    clearTimeout(m.current), clearInterval(y.current);
  }, b = (w, E) => {
    var C, $;
    switch (w.preventDefault(), E) {
      case "BACKSPACE":
        p == null || p();
        break;
      case "OK":
        (C = t.onConfirm) === null || C === void 0 || C.call(t), t.closeOnConfirm && (($ = t.onClose) === null || $ === void 0 || $.call(t));
        break;
      default:
        E !== "" && (u == null || u(E));
        break;
    }
  }, x = () => !c && !r ? null : l.createElement("div", {
    className: B(`${Ce}-header`, {
      [`${Ce}-header-with-title`]: !!r
    })
  }, l.createElement("div", {
    className: `${Ce}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${Ce}-header-close-button`,
    onClick: () => {
      var w;
      (w = t.onClose) === null || w === void 0 || w.call(t);
    },
    role: "grid",
    title: "CLOSE",
    tabIndex: -1
  }, l.createElement(w1, null))), v = (w, E) => {
    const C = /^\d$/.test(w), $ = B(`${Ce}-key`, {
      [`${Ce}-key-number`]: C,
      [`${Ce}-key-sign`]: !C && w,
      [`${Ce}-key-mid`]: E === 9 && !!a && d.length < 12
    }), A = w ? {
      role: "grid",
      title: w,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: w,
      className: $,
      onTouchStart: () => {
        w === "BACKSPACE" && h();
      },
      onTouchEnd: (O) => {
        b(O, w), w === "BACKSPACE" && g();
      }
    }, A), w === "BACKSPACE" ? l.createElement(Iu, null) : w);
  };
  return l.createElement(Nr, {
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
    ref: f,
    className: Ce,
    onMouseDown: (w) => {
      w.preventDefault();
    }
  }, x(), l.createElement("div", {
    className: `${Ce}-wrapper`
  }, l.createElement("div", {
    className: B(`${Ce}-main`, {
      [`${Ce}-main-confirmed-style`]: !!a
    })
  }, d.map(v)), !!a && l.createElement("div", {
    className: `${Ce}-confirm`
  }, l.createElement("div", {
    className: `${Ce}-key ${Ce}-key-extra ${Ce}-key-bs`,
    onTouchStart: () => {
      h();
    },
    onTouchEnd: (w) => {
      b(w, "BACKSPACE"), g();
    },
    title: "BACKSPACE",
    role: "grid",
    tabIndex: -1
  }, l.createElement(Iu, null)), l.createElement("div", {
    className: `${Ce}-key ${Ce}-key-extra ${Ce}-key-ok`,
    onTouchEnd: (w) => b(w, "OK"),
    role: "grid",
    tabIndex: -1,
    "aria-label": a
  }, a))), t.safeArea && l.createElement("div", {
    className: `${Ce}-footer`
  }, l.createElement(Ar, {
    position: "bottom"
  })))));
}, wS = Y$;
const Kr = "adm-page-indicator", X$ = {
  color: "primary",
  direction: "horizontal"
}, Q$ = je((e) => {
  const t = z(X$, e), n = [];
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
}), J$ = Q$;
const xt = "adm-passcode-input", qf = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, e_ = fe((e, t) => {
  const n = z(qf, e), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : qf.length, {
    locale: i
  } = ge(), [a, o] = K(!1), [s, c] = te(n), u = j(null), f = j(null);
  Y(() => {
    var h;
    s.length >= r && ((h = n.onFill) === null || h === void 0 || h.call(n, s));
  }, [s, r]);
  const d = () => {
    var h, g;
    n.keyboard || (h = f.current) === null || h === void 0 || h.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  Y(() => {
    if (!a)
      return;
    const h = window.setTimeout(() => {
      var g;
      (g = u.current) === null || g === void 0 || g.scrollIntoView({
        block: "center",
        inline: "center",
        behavior: "smooth"
      });
    }, 100);
    return () => {
      window.clearTimeout(h);
    };
  }, [a]);
  const m = () => {
    var h;
    o(!1), (h = n.onBlur) === null || h === void 0 || h.call(n);
  };
  ye(t, () => ({
    focus: () => {
      var h;
      return (h = u.current) === null || h === void 0 ? void 0 : h.focus();
    },
    blur: () => {
      var h, g;
      (h = u.current) === null || h === void 0 || h.blur(), (g = f.current) === null || g === void 0 || g.blur();
    }
  }));
  const y = () => {
    const h = [], g = s.split(""), b = g.length, x = $e(g.length, 0, r - 1);
    for (let v = 0; v < r; v++)
      h.push(l.createElement("div", {
        className: B(`${xt}-cell`, {
          [`${xt}-cell-caret`]: n.caret && b === v && a,
          [`${xt}-cell-focused`]: x === v && a,
          [`${xt}-cell-dot`]: !n.plain && g[v]
        }),
        key: v
      }, g[v] && n.plain ? g[v] : ""));
    return h;
  }, p = B(xt, {
    [`${xt}-focused`]: a,
    [`${xt}-error`]: n.error,
    [`${xt}-seperated`]: n.seperated
  });
  return l.createElement(l.Fragment, null, Z(n, l.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: p,
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
    onChange: (h) => {
      c(h.target.value.slice(0, n.length));
    },
    "aria-hidden": !0
  }))), n.keyboard && l.cloneElement(n.keyboard, {
    visible: a,
    onInput: (h) => {
      s.length < r && c((s + h).slice(0, n.length));
    },
    onDelete: () => {
      c(s.slice(0, -1));
    },
    onClose: () => {
      var h;
      (h = u.current) === null || h === void 0 || h.blur();
    }
  }));
}), ES = e_;
const Gr = "adm-progress-bar", t_ = {
  percent: 0,
  rounded: !0,
  text: !1
}, n_ = (e) => {
  const t = z(t_, e), n = {
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
}, CS = n_;
const er = "adm-progress-circle", r_ = (e) => {
  const t = z({
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
}, xS = r_;
const i_ = (e) => new Promise((t) => setTimeout(t, e)), sa = "adm-pull-to-refresh", a_ = {
  pullingText: "\u4E0B\u62C9\u5237\u65B0",
  canReleaseText: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
  refreshingText: "\u52A0\u8F7D\u4E2D...",
  completeText: "\u5237\u65B0\u6210\u529F",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, o_ = (e) => {
  var t, n;
  const {
    locale: r
  } = ge(), i = z(a_, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, e), a = (t = i.headHeight) !== null && t !== void 0 ? t : Tn(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Tn(60), [s, c] = K("pulling"), [u, f] = Ne(() => ({
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
    var g;
    (g = d.current) === null || g === void 0 || g.addEventListener("touchmove", () => {
    });
  }, []);
  const y = () => new Promise((g) => {
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
    return ke(this, void 0, void 0, function* () {
      f.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw y(), g;
      }
      i.completeDelay > 0 && (yield i_(i.completeDelay)), y();
    });
  }
  Nt((g) => {
    if (s === "refreshing" || s === "complete")
      return;
    const {
      event: b
    } = g;
    if (g.last) {
      m.current = !1, s === "canRelease" ? p() : f.start({
        height: 0
      });
      return;
    }
    const [, x] = g.movement, v = Math.ceil(x);
    if (g.first && v > 0) {
      let $ = function(A) {
        return "scrollTop" in A ? A.scrollTop : A.scrollY;
      };
      const E = g.event.target;
      if (!E || !(E instanceof Element))
        return;
      let C = Ea(E);
      for (; ; ) {
        if (!C || $(C) > 0)
          return;
        if (C instanceof Window)
          break;
        C = Ea(C.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    b.cancelable && b.preventDefault(), b.stopPropagation();
    const w = Math.max(yi(v, 0, 0, a * 5, 0.5), 0);
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
  const h = () => {
    var g;
    if (i.renderText)
      return (g = i.renderText) === null || g === void 0 ? void 0 : g.call(i, s);
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
    className: sa
  }, l.createElement(ve.div, {
    style: u,
    className: `${sa}-head`
  }, l.createElement("div", {
    className: `${sa}-head-content`,
    style: {
      height: a
    }
  }, h())), l.createElement("div", {
    className: `${sa}-content`
  }, i.children));
}, $S = o_;
const wm = ll(null), s_ = {
  disabled: !1,
  defaultValue: null
}, l_ = (e) => {
  const t = z(s_, e), [n, r] = te({
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
}, bn = "adm-radio", c_ = {
  defaultChecked: !1
}, u_ = (e) => {
  const t = z(c_, e), n = ot(wm);
  let [r, i] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  }), a = t.disabled;
  const {
    value: o
  } = t;
  n && o !== void 0 && (uo && (e.checked !== void 0 && Ie("Radio", "When used within `Radio.Group`, the `checked` prop of `Radio` will not work."), e.defaultChecked !== void 0 && Ie("Radio", "When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.")), r = n.value.includes(o), i = (c) => {
    var u;
    c ? n.check(o) : n.uncheck(o), (u = t.onChange) === null || u === void 0 || u.call(t, c);
  }, a = a || n.disabled);
  const s = () => t.icon ? l.createElement("div", {
    className: `${bn}-custom-icon`
  }, t.icon(r)) : l.createElement("div", {
    className: `${bn}-icon`
  }, r && l.createElement(u0, null));
  return Z(t, l.createElement("label", {
    onClick: t.onClick,
    className: B(bn, {
      [`${bn}-checked`]: r,
      [`${bn}-disabled`]: a,
      [`${bn}-block`]: t.block
    })
  }, l.createElement(f0, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: t.id
  }), s(), t.children && l.createElement("div", {
    className: `${bn}-content`
  }, t.children)));
}, _S = ie(u_, {
  Group: l_
});
const f_ = () => l.createElement("svg", {
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
})), wn = "adm-rate", d_ = {
  count: 5,
  allowHalf: !1,
  character: l.createElement(f_, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, m_ = (e) => {
  const t = z(d_, e), [n, r] = te(t), i = j(null), a = Array(t.count).fill(null);
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
  const s = Nt((c) => {
    if (t.readOnly)
      return;
    const {
      xy: [u],
      tap: f
    } = c, d = i.current;
    if (!d)
      return;
    const m = d.getBoundingClientRect(), y = (u - m.left) / m.width * t.count, p = t.allowHalf ? Math.ceil(y * 2) / 2 : Math.ceil(y), h = $e(p, 0, t.count);
    if (f && t.allowClear && h === n) {
      r(0);
      return;
    }
    r(h);
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
}, kS = m_;
const Yr = "adm-result", h_ = {
  success: g1,
  error: ao,
  info: C1,
  waiting: b1,
  warning: E1
}, v_ = {
  status: "info"
}, p_ = (e) => {
  const t = z(v_, e), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = t;
  if (!n)
    return null;
  const o = a || l.createElement(h_[n]);
  return Z(t, l.createElement("div", {
    className: B(Yr, `${Yr}-${n}`)
  }, l.createElement("div", {
    className: `${Yr}-icon`
  }, o), l.createElement("div", {
    className: `${Yr}-title`
  }, r), !!i && l.createElement("div", {
    className: `${Yr}-description`
  }, i)));
}, SS = p_;
const Te = "adm-result-page", g_ = {
  success: g1,
  error: ao,
  info: C1,
  waiting: b1,
  warning: E1
}, y_ = {
  status: "info",
  details: []
}, b_ = (e) => {
  const t = z(y_, e), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: f
  } = t, d = o || l.createElement(g_[n]), [m, y] = K(!0), p = jt(c), h = jt(s);
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
  }, (m ? a.slice(0, 3) : a).map((g, b) => l.createElement("div", {
    className: B(`${Te}-detail`, g.bold && `${Te}-detail-bold`),
    key: b
  }, l.createElement("span", null, g.label), l.createElement("span", null, g.value))), a.length > 3 && l.createElement("div", {
    onClick: () => y((g) => !g)
  }, l.createElement("div", {
    className: B(`${Te}-collapse`, !m && `${Te}-collapse-active`)
  }))) : null, l.createElement("div", {
    className: `${Te}-bgWrapper`
  }, l.createElement("div", {
    className: `${Te}-bg`
  }))), l.createElement("div", {
    className: `${Te}-content`
  }, t.children), (h || p) && l.createElement("div", {
    className: `${Te}-footer`
  }, p && l.createElement(Wt, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: f,
    className: `${Te}-footer-btn`
  }, c), h && p && l.createElement("div", {
    className: `${Te}-footer-space`
  }), h && l.createElement(Wt, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Te}-footer-btn`
  }, s))));
}, w_ = "adm-result-page-card", E_ = (e) => Z(e, l.createElement("div", {
  className: B(`${w_}`)
}, e.children)), OS = ie(b_, {
  Card: E_
});
const Jt = "adm-search-bar", C_ = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(Ry, null)
}, x_ = fe((e, t) => {
  const {
    locale: n
  } = ge(), r = z(C_, {
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
        var m, y, p;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (y = c.current) === null || y === void 0 || y.blur(), (p = r.onCancel) === null || p === void 0 || p.call(r);
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
}), FS = x_;
const $_ = je(() => l.createElement("svg", {
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
})))))))), En = "adm-selector", __ = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, k_ = (e) => {
  const t = z(__, e), [n, r, , i] = Co(t.fieldNames), [a, o] = te({
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
  } = ge(), c = t.options.map((u) => {
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
            const y = f ? a.filter((p) => p !== u[r]) : [...a, u[r]];
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
    }, l.createElement($_, null)));
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
}, PS = k_;
const is = je((e) => Z(e, l.createElement("svg", {
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
}))))), Me = "adm-side-bar", S_ = () => null, O_ = (e) => {
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
    }, l.createElement(l.Fragment, null, d && l.createElement(is, {
      className: `${Me}-item-corner ${Me}-item-corner-top`
    }), m && l.createElement(is, {
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
  }, s && l.createElement(is, {
    className: `${Me}-item-corner ${Me}-item-corner-top`
  }))));
}, NS = ie(O_, {
  Item: S_
});
const as = "adm-slider", F_ = ({
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
      [`${as}-tick`]: !0,
      [`${as}-tick-active`]: u
    });
    return l.createElement("span", {
      className: d,
      style: f,
      key: s
    });
  });
  return l.createElement("div", {
    className: `${as}-ticks`
  }, o);
}, P_ = F_, os = "adm-slider-mark", N_ = ({
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
      [`${os}-text`]: !0,
      [`${os}-text-active`]: f
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
    className: os
  }, s);
}, A_ = N_;
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
  return typeof e == "number" ? !Number.isNaN(e) : e ? /^\s*-?\d+(\.\d+)?\s*$/.test(e) || /^\s*-?\d+\.\s*$/.test(e) || /^\s*-?\.\d+\s*$/.test(e) : !1;
}
var T_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ii(this, e), Ve(this, "origin", ""), Ve(this, "negative", void 0), Ve(this, "integer", void 0), Ve(this, "decimal", void 0), Ve(this, "decimalLen", void 0), Ve(this, "empty", void 0), Ve(this, "nan", void 0), Em(t)) {
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
  }, {
    key: "getDecimalStr",
    value: function() {
      return this.decimal.toString().padStart(this.decimalLen, "0");
    }
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
}(), R_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ii(this, e), Ve(this, "origin", ""), Ve(this, "number", void 0), Ve(this, "empty", void 0), Em(t)) {
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
function He(e) {
  return al() ? new T_(e) : new R_(e);
}
function xc(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === "")
    return "";
  var i = li(e), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(t).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var f = Number(s[n]);
    if (f >= 5 && !r) {
      var d = He(e).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - f));
      return xc(d.toString(), t, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(t).concat(s.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const M_ = (e) => Z(e, l.createElement("svg", {
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
})))), ss = "adm-slider", I_ = (e) => {
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
  } = ge(), f = () => ({
    left: `${(t - n) / (r - n) * 100}%`,
    right: "auto"
  }), [d, m] = K(!1), y = Nt((g) => {
    var b;
    if (i)
      return;
    g.first && (c.current = t);
    const x = g.xy[0] - g.initial[0], v = (b = e.trackRef.current) === null || b === void 0 ? void 0 : b.offsetWidth;
    if (!v)
      return;
    const w = x / Math.ceil(v) * (r - n);
    s(c.current + w, g.first, g.last), m(!g.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), p = typeof e.popover == "function" ? e.popover : e.popover ? (g) => g.toString() : null, h = l.createElement("div", {
    className: `${ss}-thumb`
  }, a || l.createElement(M_, {
    className: `${ss}-thumb-icon`
  }));
  return l.createElement("div", Object.assign({
    className: `${ss}-thumb-container`,
    style: f()
  }, y(), {
    role: "slider",
    "aria-label": e["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": t,
    "aria-disabled": i
  }), p ? l.createElement(lm, {
    content: p(t),
    placement: "top",
    visible: o || d,
    getContainer: null,
    mode: "dark"
  }, h) : h);
}, L_ = I_, Xr = "adm-slider", D_ = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, V_ = (e) => {
  var t;
  const n = z(D_, e), {
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
    const N = He(_), S = xc(N.toString(), ".", R);
    return He(S).toNumber();
  }
  function y(_) {
    const R = Math.max(p(c), p(_[0]), p(_[1]));
    return n.range ? _.map((N) => m(N, R)) : m(_[1], R);
  }
  function p(_) {
    return (`${_}`.split(".")[1] || "").length;
  }
  function h(_) {
    var R;
    (R = n.onAfterChange) === null || R === void 0 || R.call(n, y(_));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (Ie("Slider", "When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]"), g = [0, n.value]);
  const [b, x] = te({
    value: g,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : n.range ? [r, r] : r,
    onChange: n.onChange
  }), v = f(d(b));
  function w(_) {
    const R = f(_), N = v;
    R[0] === N[0] && R[1] === N[1] || x(y(R));
  }
  const E = j(null), C = `${100 * (v[1] - v[0]) / (i - r)}%`, $ = `${100 * (v[0] - r) / (i - r)}%`, A = ee(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((_, R) => _ - R);
    if (s) {
      const _ = [];
      for (let R = He(r); R.lessEquals(He(i)); R = R.add(c))
        _.push(R.toNumber());
      return _;
    }
    return [];
  }, [o, s, c, r, i]);
  function O(_) {
    const R = _ < r ? r : _ > i ? i : _;
    let N = r;
    if (A.length)
      N = tc(A, R);
    else {
      const S = Math.round((R - r) / c), M = He(S).multi(c);
      N = He(r).add(M.toString()).toNumber();
    }
    return N;
  }
  const k = j(0), D = (_) => {
    if (k.current > 0 || (_.stopPropagation(), a))
      return;
    const R = E.current;
    if (!R)
      return;
    const N = R.getBoundingClientRect().left, S = (_.clientX - N) / Math.ceil(R.offsetWidth) * (i - r) + r, M = O(S);
    let P;
    n.range ? Math.abs(M - v[0]) > Math.abs(M - v[1]) ? P = [v[0], M] : P = [M, v[1]] : P = [n.min, M], w(P), h(P);
  }, I = j(), T = (_) => l.createElement(L_, {
    key: _,
    value: v[_],
    min: r,
    max: i,
    disabled: a,
    trackRef: E,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (R, N, S) => {
      N && (k.current += 1, I.current = v);
      const M = O(R), P = I.current;
      if (!P)
        return;
      const F = [...P];
      F[_] = M, w(F), S && (h(F), window.setTimeout(() => {
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
      width: C,
      left: $
    }
  }), n.ticks && l.createElement(P_, {
    points: A,
    min: r,
    max: i,
    lowerBound: v[0],
    upperBound: v[1]
  }), n.range && T(0), T(1))), o && l.createElement(A_, {
    min: r,
    max: i,
    marks: o,
    lowerBound: v[0],
    upperBound: v[1]
  })));
}, AS = V_;
var $m = {}, $c = { exports: {} }, _m = { exports: {} };
(function(e) {
  function t(n) {
    if (Array.isArray(n))
      return n;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(_m);
var km = { exports: {} };
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
})(km);
var Sm = { exports: {} }, Om = { exports: {} };
(function(e) {
  function t(n, r) {
    (r == null || r > n.length) && (r = n.length);
    for (var i = 0, a = new Array(r); i < r; i++)
      a[i] = n[i];
    return a;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Om);
(function(e) {
  var t = Om.exports;
  function n(r, i) {
    if (!!r) {
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
var Fm = { exports: {} };
(function(e) {
  function t() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Fm);
(function(e) {
  var t = _m.exports, n = km.exports, r = Sm.exports, i = Fm.exports;
  function a(o, s) {
    return t(o) || n(o, s) || r(o, s) || i();
  }
  e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
})($c);
var _c = {}, j_ = Vi.exports.default;
Object.defineProperty(_c, "__esModule", {
  value: !0
});
_c.default = B_;
var Kf = j_(l);
function B_(e) {
  var t = Kf.useRef();
  t.current = e;
  var n = Kf.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(a));
  }, []);
  return n;
}
var pr = {}, kc = {};
Object.defineProperty(kc, "__esModule", {
  value: !0
});
kc.default = W_;
function W_() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var Z_ = ji.exports.default, H_ = Vi.exports.default;
Object.defineProperty(pr, "__esModule", {
  value: !0
});
pr.useLayoutUpdateEffect = pr.default = void 0;
var ol = H_(l), U_ = Z_(kc), Gf = (0, U_.default)() ? ol.useLayoutEffect : ol.useEffect, Pm = function(t, n) {
  var r = ol.useRef(!0);
  Gf(function() {
    return t(r.current);
  }, n), Gf(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
}, z_ = function(t, n) {
  Pm(function(r) {
    if (!r)
      return t();
  }, n);
};
pr.useLayoutUpdateEffect = z_;
var q_ = Pm;
pr.default = q_;
var Sc = {}, K_ = Vi.exports.default, G_ = ji.exports.default;
Object.defineProperty(Sc, "__esModule", {
  value: !0
});
Sc.default = X_;
var Y_ = G_($c.exports), ls = K_(l);
function X_(e) {
  var t = ls.useRef(!1), n = ls.useState(e), r = (0, Y_.default)(n, 2), i = r[0], a = r[1];
  ls.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, c) {
    c && t.current || a(s);
  }
  return [i, o];
}
var Oc = ji.exports.default;
Object.defineProperty($m, "__esModule", {
  value: !0
});
var Q_ = $m.default = J_, Yf = Oc($c.exports), Xf = Oc(_c), Qf = pr, Jf = Oc(Sc);
function cs(e) {
  return e !== void 0;
}
function J_(e, t) {
  var n = t || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = (0, Jf.default)(function() {
    return cs(i) ? i : cs(r) ? typeof r == "function" ? r() : r : typeof e == "function" ? e() : e;
  }), c = (0, Yf.default)(s, 2), u = c[0], f = c[1], d = i !== void 0 ? i : u, m = o ? o(d) : d, y = (0, Xf.default)(a), p = (0, Jf.default)([d]), h = (0, Yf.default)(p, 2), g = h[0], b = h[1];
  (0, Qf.useLayoutUpdateEffect)(function() {
    var v = g[0];
    u !== v && y(u, v);
  }, [g]), (0, Qf.useLayoutUpdateEffect)(function() {
    cs(i) || f(i);
  }, [i]);
  var x = (0, Xf.default)(function(v, w) {
    f(v, w), b([d], w);
  });
  return [m, x];
}
const tr = "adm-stepper", ek = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function tk(e, t) {
  const n = z(ek, e), {
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
    parser: p
  } = n, {
    locale: h
  } = ge();
  ye(t, () => ({
    focus: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.focus();
    },
    blur: () => {
      var P;
      (P = I.current) === null || P === void 0 || P.blur();
    },
    get nativeElement() {
      var P, F;
      return (F = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) !== null && F !== void 0 ? F : null;
    }
  }));
  const g = (P) => (d !== void 0 ? xc(P.toString(), ".", d) : P).toString(), b = (P) => m ? P.toString() : P.toNumber(), x = (P) => {
    if (P === "")
      return null;
    if (p)
      return String(p(P));
    const F = He(P);
    return F.isInvalidate() ? null : F.toString();
  }, v = (P) => P === null ? "" : y ? y(P) : g(P), [w, E] = Q_(r, {
    value: i,
    onChange: (P) => {
      a == null || a(P);
    }
  }), [C, $] = K(() => v(w));
  function A(P) {
    if (P.isNaN())
      return;
    let F = P;
    if (u !== void 0) {
      const L = He(u);
      F.lessEquals(L) && (F = L);
    }
    if (c !== void 0) {
      const L = He(c);
      L.lessEquals(F) && (F = L);
    }
    d !== void 0 && (F = He(g(b(F)))), E(b(F));
  }
  const O = (P) => {
    $(P);
    const F = x(P);
    F === null ? n.allowEmpty ? E(null) : E(r) : A(He(F));
  }, [k, D] = K(!1), I = l.useRef(null);
  function T(P) {
    D(P), P && $(w != null ? String(w) : "");
  }
  Y(() => {
    var P, F, L;
    k && ((L = (F = (P = I.current) === null || P === void 0 ? void 0 : P.nativeElement) === null || F === void 0 ? void 0 : F.select) === null || L === void 0 || L.call(F));
  }, [k]), Y(() => {
    k || $(v(w));
  }, [k, w, d]);
  const _ = (P) => {
    let F = He(s);
    P || (F = F.negate()), A(He(w != null ? w : 0).add(F.toString()));
  }, R = () => {
    _(!1);
  }, N = () => {
    _(!0);
  }, S = () => o ? !0 : w === null ? !1 : u !== void 0 ? w <= u : !1, M = () => o ? !0 : w === null ? !1 : c !== void 0 ? w >= c : !1;
  return Z(n, l.createElement("div", {
    className: B(tr, {
      [`${tr}-active`]: k
    })
  }, l.createElement(Wt, {
    className: `${tr}-minus`,
    onClick: R,
    disabled: S(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.decrease
  }, l.createElement(Ny, null)), l.createElement("div", {
    className: `${tr}-middle`
  }, l.createElement(ym, {
    ref: I,
    className: `${tr}-input`,
    onFocus: (P) => {
      var F;
      T(!0), (F = n.onFocus) === null || F === void 0 || F.call(n, P);
    },
    value: C,
    onChange: (P) => {
      o || O(P);
    },
    disabled: o,
    onBlur: (P) => {
      var F;
      T(!1), (F = n.onBlur) === null || F === void 0 || F.call(n, P);
    },
    readOnly: f,
    role: "spinbutton",
    "aria-valuenow": Number(C),
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
    "aria-label": h.Stepper.increase
  }, l.createElement(p1, null))));
}
const nk = fe(tk), TS = nk;
const Cn = "adm-step", rk = (e) => {
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
}, ed = "adm-steps", ik = "adm-step", ak = l.createElement("span", {
  className: `${ik}-icon-dot`
}), ok = {
  current: 0,
  direction: "horizontal"
}, sk = (e) => {
  const t = z(ok, e), {
    direction: n,
    current: r
  } = t, i = B(ed, `${ed}-${n}`);
  return Z(t, l.createElement("div", {
    className: i
  }, l.Children.map(t.children, (a, o) => {
    var s;
    if (!l.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const f = (s = c.icon) !== null && s !== void 0 ? s : ak;
    return l.cloneElement(a, {
      status: u,
      icon: f
    });
  })));
}, RS = ie(sk, {
  Step: rk
});
const en = "adm-swipe-action", lk = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, ck = fe((e, t) => {
  const n = z(lk, e), r = j(null), i = j(null), a = j(null);
  function o(b) {
    const x = b.current;
    return x ? x.offsetWidth : 0;
  }
  function s() {
    return o(i);
  }
  function c() {
    return o(a);
  }
  const [{
    x: u
  }, f] = Ne(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), d = j(!1), m = j(null);
  function y() {
    var b;
    (b = m.current) === null || b === void 0 || b.call(m), d.current = !1;
  }
  const p = Nt((b) => {
    var x;
    if (m.current = b.cancel, !b.intentional || (b.down && (d.current = !0), !d.current))
      return;
    const [v] = b.offset;
    if (b.last) {
      const w = s(), E = c();
      let C = v + b.velocity[0] * b.direction[0] * 50;
      v > 0 ? C = Math.max(0, C) : v < 0 ? C = Math.min(0, C) : C = 0;
      const $ = tc([-E, 0, w], C);
      f.start({
        x: $
      }), $ !== 0 && ((x = e.onActionsReveal) === null || x === void 0 || x.call(e, $ > 0 ? "left" : "right")), window.setTimeout(() => {
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
      const b = s();
      return {
        left: -c(),
        right: b
      };
    },
    axis: "x",
    preventScroll: !0,
    pointer: {
      touch: !0
    },
    triggerAllEvents: !0
  });
  function h() {
    f.start({
      x: 0
    }), y();
  }
  ye(t, () => ({
    show: (b = "right") => {
      var x;
      b === "right" ? f.start({
        x: -c()
      }) : b === "left" && f.start({
        x: s()
      }), (x = e.onActionsReveal) === null || x === void 0 || x.call(e, b);
    },
    close: h
  })), Y(() => {
    if (!n.closeOnTouchOutside)
      return;
    function b(x) {
      if (u.get() === 0)
        return;
      const v = r.current;
      v && !v.contains(x.target) && h();
    }
    return document.addEventListener("touchstart", b), () => {
      document.removeEventListener("touchstart", b);
    };
  }, [n.closeOnTouchOutside]);
  function g(b) {
    var x, v;
    const w = (x = b.color) !== null && x !== void 0 ? x : "light";
    return l.createElement(Wt, {
      key: b.key,
      className: `${en}-action-button`,
      style: {
        "--background-color": (v = uk[w]) !== null && v !== void 0 ? v : w
      },
      onClick: (E) => {
        var C, $;
        n.closeOnAction && h(), (C = b.onClick) === null || C === void 0 || C.call(b, E), ($ = n.onAction) === null || $ === void 0 || $.call(n, b, E);
      }
    }, b.text);
  }
  return Z(n, l.createElement("div", Object.assign({
    className: en
  }, p(), {
    ref: r,
    onClickCapture: (b) => {
      d.current && (b.stopPropagation(), b.preventDefault());
    }
  }), l.createElement(ve.div, {
    className: `${en}-track`,
    style: {
      x: u
    }
  }, ln(n.stopPropagation, l.createElement("div", {
    className: `${en}-actions ${en}-actions-left`,
    ref: i
  }, n.leftActions.map(g))), l.createElement("div", {
    className: `${en}-content`,
    onClickCapture: (b) => {
      u.goal !== 0 && (b.preventDefault(), b.stopPropagation(), h());
    }
  }, l.createElement(ve.div, {
    style: {
      pointerEvents: u.to((b) => b !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), ln(n.stopPropagation, l.createElement("div", {
    className: `${en}-actions ${en}-actions-right`,
    ref: a
  }, n.rightActions.map(g))))));
}), uk = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, MS = ck;
const Nm = (e) => Z(e, l.createElement("div", {
  className: "adm-swiper-item",
  onClick: e.onClick
}, e.children));
function fk(e) {
  const [t, n] = K(e), r = j(t);
  return Y(() => {
    r.current = t;
  }, [t]), [t, n, r];
}
function dk(e, t) {
  const n = Object.keys(e), r = Object.keys(t), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const s = e[o], c = t[o];
    typeof s == "function" && typeof c == "function" ? a[o] = function(...u) {
      s(...u), c(...u);
    } : a[o] = s || c;
  }), a;
}
const ht = "adm-swiper", mk = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, hk = {
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
let la;
const vk = fe(Wl((e, t) => {
  const n = z(hk, e), [r] = K({}), i = j(null), a = n.direction === "vertical", o = n.slideSize / 100, s = n.trackOffset / 100, {
    validChildren: c,
    count: u
  } = ee(() => {
    let f = 0;
    return {
      validChildren: l.Children.map(n.children, (m) => l.isValidElement(m) ? m.type !== Nm ? (Ie("Swiper", "The children of `Swiper` must be `Swiper.Item` components."), null) : (f++, m) : null),
      count: f
    };
  }, [n.children]);
  return u === 0 || !c ? (Ie("Swiper", "`Swiper` needs at least one child."), null) : () => {
    let f = n.loop;
    o * (u - 1) < 1 && (f = !1);
    const d = j(null);
    function m() {
      const F = d.current;
      return F ? (a ? F.offsetHeight : F.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [y, p, h] = r6(n.defaultIndex), [g, b, x] = fk(!1);
    function v(F) {
      let L = 0, W = u - 1;
      return n.stuckAtBoundary && (L += s / o, W -= (1 - o - s) / o), $e(F, L, W);
    }
    const [{
      position: w
    }, E] = Ne(() => ({
      position: v(y) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (x.current || !f)
          return;
        const F = w.get(), L = 100 * u, W = us(F, L);
        W !== F && E.start({
          position: W,
          immediate: !0
        });
      }
    }), [u]), C = j(null);
    function $() {
      var F;
      (F = C.current) === null || F === void 0 || F.call(C), x.current = !1;
    }
    const A = Nt((F) => {
      if (C.current = F.cancel, !F.intentional || (F.first && !la && (la = r), la !== r))
        return;
      la = F.last ? void 0 : r;
      const L = m();
      if (!L)
        return;
      const W = a ? 1 : 0, U = F.offset[W], q = F.direction[W], G = F.velocity[W];
      if (b(!0), !F.last)
        E.start({
          position: U * 100 / L,
          immediate: !0
        });
      else {
        const ae = Math.floor(U / L), de = ae + 1, Ee = Math.round((U + G * 2e3 * q) / L);
        O($e(Ee, ae, de)), window.setTimeout(() => {
          b(!1);
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
        const F = m(), L = v(0) * F, W = v(u - 1) * F;
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
    function O(F, L = !1) {
      var W;
      const U = Math.round(F), q = f ? us(U, u) : $e(U, 0, u - 1);
      q !== h() && ((W = n.onIndexChange) === null || W === void 0 || W.call(n, q)), p(q), E.start({
        position: (f ? U : v(U)) * 100,
        immediate: L
      });
    }
    function k() {
      O(Math.round(w.get() / 100) + 1);
    }
    function D() {
      O(Math.round(w.get() / 100) - 1);
    }
    ye(t, () => ({
      swipeTo: O,
      swipeNext: k,
      swipePrev: D
    })), Oe(() => {
      const F = c.length - 1;
      y > F && O(F, !0);
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
      if (!(!I || g))
        return _(), () => {
          i.current && window.clearTimeout(i.current);
        };
    }, [I, T, g, u]);
    function R() {
      return f ? l.createElement("div", {
        className: `${ht}-track-inner`
      }, l.Children.map(c, (F, L) => l.createElement(ve.div, {
        className: B(`${ht}-slide`, {
          [`${ht}-slide-active`]: y === L
        }),
        style: {
          [a ? "y" : "x"]: w.to((W) => {
            let U = -W + L * 100;
            const q = u * 100, G = q / 2;
            return U = us(U + G, q) - G, `${U}%`;
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
    }, S = Object.assign({}, n.allowTouchMove ? A() : {}), M = {};
    for (const F of n.stopPropagation) {
      const L = mk[F];
      M[L] = function(W) {
        W.stopPropagation();
      };
    }
    const P = dk(S, M);
    return Z(n, l.createElement("div", {
      className: B(ht, `${ht}-${n.direction}`),
      style: N
    }, l.createElement("div", Object.assign({
      ref: d,
      className: B(`${ht}-track`, {
        [`${ht}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (F) => {
        x.current && F.stopPropagation(), $();
      }
    }, P), R()), n.indicator === void 0 ? l.createElement("div", {
      className: `${ht}-indicator`
    }, l.createElement(J$, Object.assign({}, n.indicatorProps, {
      total: u,
      current: y,
      direction: n.direction
    }))) : n.indicator(u, y)));
  };
}));
function us(e, t) {
  const n = e % t;
  return n < 0 ? n + t : n;
}
const IS = ie(vk, {
  Item: Nm
});
const pk = je((e) => Z(e, l.createElement("svg", {
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
})))))))), xn = "adm-switch", gk = {
  defaultChecked: !1
}, yk = (e) => {
  const t = z(gk, e), n = t.disabled || t.loading || !1, [r, i] = K(!1), {
    locale: a
  } = ge(), [o, s] = te({
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
      if (j1(f)) {
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
  }, (t.loading || r) && l.createElement(pk, {
    className: `${xn}-spin-icon`
  })), l.createElement("div", {
    className: `${xn}-inner`
  }, o ? t.checkedText : t.uncheckedText))));
}, LS = yk;
const bk = () => null, It = "adm-tab-bar", wk = {
  safeArea: !1
}, Ek = (e) => {
  var t;
  const n = z(wk, e);
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
        className: B(`${It}-item-title`, Boolean(f) && `${It}-item-title-with-icon`)
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
}, DS = ie(Ek, {
  Item: bk
});
const td = "adm-tag", Ck = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, xk = {
  color: "default",
  fill: "solid",
  round: !1
}, $k = (e) => {
  var t;
  const n = z(xk, e), r = (t = Ck[n.color]) !== null && t !== void 0 ? t : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return Z(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: B(td, {
      [`${td}-round`]: n.round
    })
  }, n.children));
}, VS = $k;
const Qr = "adm-text-area", Am = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, Tm = fe((e, t) => {
  const n = z(Am, e), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = te(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value === null && y9("TextArea", "`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.");
  const c = j(null), u = j("auto"), f = j(null);
  ye(t, () => ({
    clear: () => {
      s("");
    },
    focus: () => {
      var h;
      (h = c.current) === null || h === void 0 || h.focus();
    },
    blur: () => {
      var h;
      (h = c.current) === null || h === void 0 || h.blur();
    },
    get nativeElement() {
      return c.current;
    }
  })), Oe(() => {
    if (!r)
      return;
    const h = c.current, g = f.current;
    if (!h || (h.style.height = u.current, !g))
      return;
    let b = g.scrollHeight;
    if (typeof r == "object") {
      const x = window.getComputedStyle(h), v = parseFloat(x.lineHeight);
      r.minRows && (b = Math.max(b, r.minRows * v)), r.maxRows && (b = Math.min(b, r.maxRows * v));
    }
    u.current = `${b}px`, h.style.height = `${b}px`;
  }, [o, r]);
  const d = j(!1);
  let m;
  const y = ma(o).length;
  typeof i == "function" ? m = i(y, a) : i && (m = l.createElement("div", {
    className: `${Qr}-count`
  }, a === void 0 ? y : y + "/" + a));
  let p = n.rows;
  return typeof r == "object" && (r.maxRows && p > r.maxRows && (p = r.maxRows), r.minRows && p < r.minRows && (p = r.minRows)), Z(n, l.createElement("div", {
    className: Qr
  }, l.createElement("textarea", {
    ref: c,
    className: `${Qr}-element`,
    rows: p,
    value: o,
    placeholder: n.placeholder,
    onChange: (h) => {
      let g = h.target.value;
      a && !d.current && (g = ma(g).slice(0, a).join("")), s(g);
    },
    id: n.id,
    onCompositionStart: (h) => {
      var g;
      d.current = !0, (g = n.onCompositionStart) === null || g === void 0 || g.call(n, h);
    },
    onCompositionEnd: (h) => {
      var g;
      if (d.current = !1, a) {
        const b = h.target.value;
        s(ma(b).slice(0, a).join(""));
      }
      (g = n.onCompositionEnd) === null || g === void 0 || g.call(n, h);
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
    rows: p,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
Tm.defaultProps = Am;
const jS = Tm;
const Lt = "adm-toast", _k = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, kk = (e) => {
  const t = z(_k, e), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = t, o = ee(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(y1, {
          className: `${Lt}-icon-success`
        });
      case "fail":
        return l.createElement(Ni, {
          className: `${Lt}-icon-fail`
        });
      case "loading":
        return l.createElement(ql, {
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
  return l.createElement(Pi, {
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
  }, o), l.createElement(gi, null, r))));
};
let Bt = null, fs = null;
const pa = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, Sk = (e) => l.createElement(kk, Object.assign({}, e));
function Ok(e) {
  const t = z(pa, typeof e == "string" ? {
    content: e
  } : e), n = l.createElement(Sk, Object.assign({}, t, {
    onClose: () => {
      Bt = null;
    }
  }));
  return Bt ? Bt.replace(n) : Bt = Tr(n), fs && window.clearTimeout(fs), t.duration !== 0 && (fs = window.setTimeout(() => {
    Rm();
  }, t.duration)), Bt;
}
function Rm() {
  Bt == null || Bt.close(), Bt = null;
}
function Fk(e) {
  e.duration !== void 0 && (pa.duration = e.duration), e.position !== void 0 && (pa.position = e.position), e.maskClickable !== void 0 && (pa.maskClickable = e.maskClickable);
}
const Pk = {
  show: Ok,
  clear: Rm,
  config: Fk
}, BS = Pk;
function Mm(e, t = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[t] ? i = Math.max(i, n(a[t]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(e);
}
const ca = "adm-tree-select", Nk = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, Ak = (e) => {
  const t = z(Nk, e), [n, r, i] = Co(t.fieldNames), [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), [s, c, u] = ee(() => {
    const y = Mm(t.options, i), p = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    function g(b, x) {
      x.forEach((v) => {
        h.set(v[r], b), p.set(v[r], v), v[i] && g(v, v[i]);
      });
    }
    return g(void 0, t.options), [y, p, h];
  }, [t.options]), f = (y) => {
    var p;
    const h = [];
    let g = y;
    for (; g; )
      h.push(g), g = u.get(g[r]);
    const b = h.reverse().map((x) => x[r]);
    o(b), (p = t.onChange) === null || p === void 0 || p.call(t, b, {
      options: h
    });
  }, d = (y = [], p) => y.map((h) => {
    const g = h[r] === a[p];
    return l.createElement("div", {
      key: h[r],
      className: B(`${ca}-item`, {
        [`${ca}-item-active`]: g
      }),
      onClick: () => {
        g || f(h);
      }
    }, h[n]);
  }), m = () => {
    var y;
    const p = [];
    for (let h = 0; h < s; h++) {
      let g = `${100 / s}%`;
      s === 2 && h === 0 && (g = "33.33%"), s === 2 && h === 1 && (g = "66.67%");
      const b = l.createElement("div", {
        key: h,
        className: B(`${ca}-column`),
        style: {
          width: g
        }
      }, d(h === 0 ? t.options : (y = c.get(a[h - 1])) === null || y === void 0 ? void 0 : y[i], h));
      p.push(b);
    }
    return p;
  };
  return Z(t, l.createElement("div", {
    className: ca
  }, m()));
}, nt = "adm-tree-select-multiple", Tk = (e) => {
  const t = z({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, e);
  Y(() => {
    Ie("TreeSelect", "TreeSelect.Multiple has been deprecated.");
  }, []);
  const [n, r, i] = Co(t.fieldNames), [a, o] = te({
    value: t.expandKeys,
    defaultValue: t.defaultExpandKeys
  }), [s, c] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), u = ($) => {
    const A = [], O = (k) => {
      var D;
      !k || (!((D = k[i]) === null || D === void 0) && D.length ? k[i].forEach((I) => O(I)) : A.push(k[r]));
    };
    return O($), A;
  }, [f, d, m] = ee(() => {
    const $ = Mm(t.options, i), A = /* @__PURE__ */ new Map(), O = /* @__PURE__ */ new Map();
    function k(D, I) {
      I.forEach((T) => {
        O.set(T[r], D), A.set(T[r], T), T[i] && k(T, T[i]);
      });
    }
    return k(void 0, t.options), [$, A, O];
  }, [t.options]), y = ee(() => {
    let $ = [];
    return s.forEach((A) => {
      const O = d.get(A);
      $ = $.concat(u(O));
    }), $;
  }, [s, d]), p = ee(() => {
    const $ = /* @__PURE__ */ new Map(), A = (O) => {
      const k = m.get(O);
      !k || ($.set(k[r], !0), A(k[r]));
    };
    return y.forEach((O) => {
      $.set(O, !0), A(O);
    }), $;
  }, [m, s]), h = ($) => {
    var A;
    let O = [...$], k = [];
    const D = (T) => {
      T.forEach((_) => {
        var R;
        if (k.includes(_))
          return;
        const N = m.get(_);
        if (!N)
          return;
        const S = ((R = N[i]) === null || R === void 0 ? void 0 : R.map((M) => M[r])) || [];
        S.every((M) => O.includes(M)) && (O.push(N[r]), k = k.concat(S));
      });
    };
    for (let T = 0; T < f; T++)
      D(O);
    O = O.filter((T) => !k.includes(T));
    const I = O.map((T) => d.get(T));
    c(O), (A = t.onChange) === null || A === void 0 || A.call(t, O, I);
  }, g = ($) => {
    var A;
    const O = [];
    let k = $;
    for (; k; )
      O.unshift(k), k = m.get(k[r]);
    const D = O.map((I) => I[r]);
    o(D), (A = t.onExpand) === null || A === void 0 || A.call(t, D, O);
  }, b = ($, A) => {
    var O;
    const k = (O = t.selectAllText) === null || O === void 0 ? void 0 : O[A];
    if (!k)
      return;
    let D = [];
    $.forEach((T) => {
      D = D.concat(u(T));
    });
    const I = D.every((T) => y.includes(T));
    return l.createElement("div", {
      onClick: () => {
        h(I ? y.filter((T) => !D.includes(T)) : y.concat(D));
      },
      className: `${nt}-item`
    }, k);
  }, x = ($, A) => {
    var O;
    const k = (O = t.selectAllText) === null || O === void 0 ? void 0 : O[A];
    if (!k)
      return;
    const D = $.map((_) => _[r]), I = D.every((_) => y.includes(_)), T = I ? !1 : D.some((_) => y.includes(_));
    return l.createElement("div", {
      onClick: () => {
        h(I ? y.filter((_) => !D.includes(_)) : y.concat(D));
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(uf, {
      className: `${nt}-item-checkbox`,
      checked: I,
      indeterminate: T
    }), k);
  }, v = ($) => {
    const A = a.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        A || g($);
      },
      className: B(`${nt}-item`, {
        [`${nt}-item-expand`]: A
      })
    }, $[n], !!p.get($[r]) && l.createElement("div", {
      className: `${nt}-dot`
    }));
  }, w = ($) => {
    const A = y.includes($[r]);
    return l.createElement("div", {
      key: $[r],
      onClick: () => {
        h(A ? y.filter((O) => O !== $[r]) : [...y, $[r]]);
      },
      className: B(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(uf, {
      className: `${nt}-item-checkbox`,
      checked: A
    }), $[n]);
  }, E = ($ = [], A) => $.length === 0 ? void 0 : f === A + 1 ? l.createElement(l.Fragment, null, x($, A), $.map((k) => w(k))) : l.createElement(l.Fragment, null, b($, A), $.map((k) => v(k))), C = () => {
    var $;
    const A = [];
    for (let O = 0; O < f; O++) {
      let k = `${100 / f}%`;
      f === 2 && O === 0 && (k = "33.33%"), f === 2 && O === 1 && (k = "66.67%");
      const D = l.createElement("div", {
        key: O,
        className: B(`${nt}-column`),
        style: {
          width: k
        }
      }, E(O === 0 ? t.options : ($ = d.get(a[O - 1])) === null || $ === void 0 ? void 0 : $[i], O));
      A.push(D);
    }
    return A;
  };
  return Z(t, l.createElement("div", {
    className: nt
  }, C()));
}, WS = ie(Ak, {
  Multiple: Tk
});
const $n = "adm-virtual-input", Rk = {
  defaultValue: ""
}, Mk = fe((e, t) => {
  const n = z(Rk, e), [r, i] = te(n), a = j(null), o = j(null), [s, c] = K(!1), {
    locale: u
  } = ge();
  function f() {
    const h = a.current;
    if (!h || document.activeElement !== h)
      return;
    const g = o.current;
    !g || (g.scrollLeft = g.clientWidth);
  }
  Oe(() => {
    f();
  }, [r]), Y(() => {
    s && f();
  }, [s]), ye(t, () => ({
    focus: () => {
      var h;
      (h = a.current) === null || h === void 0 || h.focus();
    },
    blur: () => {
      var h;
      (h = a.current) === null || h === void 0 || h.blur();
    }
  }));
  function d() {
    var h;
    c(!0), (h = n.onFocus) === null || h === void 0 || h.call(n);
  }
  function m() {
    var h;
    c(!1), (h = n.onBlur) === null || h === void 0 || h.call(n);
  }
  const y = n.keyboard, p = y && l.cloneElement(y, {
    onInput: (h) => {
      var g, b;
      i(r + h), (b = (g = y.props).onInput) === null || b === void 0 || b.call(g, h);
    },
    onDelete: () => {
      var h, g;
      i(r.slice(0, -1)), (g = (h = y.props).onDelete) === null || g === void 0 || g.call(h);
    },
    visible: s,
    onClose: () => {
      var h, g, b;
      (h = a.current) === null || h === void 0 || h.blur(), (b = (g = y.props).onClose) === null || b === void 0 || b.call(g);
    },
    getContainer: null
  });
  return Z(n, l.createElement("div", {
    ref: a,
    className: B($n, {
      [`${$n}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "option",
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
    onClick: (h) => {
      var g;
      h.stopPropagation(), i(""), (g = n.onClear) === null || g === void 0 || g.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, l.createElement(ao, null)), [void 0, null, ""].includes(r) && l.createElement("div", {
    className: `${$n}-placeholder`
  }, n.placeholder), p));
}), ZS = Mk;
const nd = "adm-water-mark", Ik = {
  fullPage: !0
}, Lk = (e) => {
  const t = z(Ik, e), {
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
    fontColor: p = "rgba(0,0,0,.15)",
    fontSize: h = 14,
    fontFamily: g = "sans-serif"
  } = t, [b, x] = K("");
  return Y(() => {
    const v = document.createElement("canvas"), w = window.devicePixelRatio, E = v.getContext("2d"), C = `${(r + a) * w}px`, $ = `${(i + o) * w}px`, A = a * w, O = o * w;
    if (v.setAttribute("width", C), v.setAttribute("height", $), E) {
      if (c) {
        E.translate(A / 2, O / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = new Image();
        k.crossOrigin = "anonymous", k.referrerPolicy = "no-referrer", k.onload = () => {
          E.drawImage(k, -u * w / 2, -f * w / 2, u * w, f * w), E.restore(), x(v.toDataURL());
        }, k.src = c;
      } else if (d) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(A / 2, O / 2), E.rotate(Math.PI / 180 * Number(s));
        const k = Number(h) * w;
        E.font = `${m} normal ${y} ${k}px/${O}px ${g}`, E.fillStyle = p, Array.isArray(d) ? d.forEach((D, I) => E.fillText(D, 0, I * k)) : E.fillText(d, 0, 0), E.restore(), x(v.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, y, a, o, g, p, c, d, h]), Z(t, l.createElement("div", {
    className: B(nd, {
      [`${nd}-full-page`]: t.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      backgroundImage: b === "" ? void 0 : `url('${b}')`
    }
  }));
}, HS = Lk;
const _n = "adm-footer", Dk = {
  label: "",
  links: [],
  content: "",
  chips: []
}, Vk = (e) => {
  const t = z(Dk, e), {
    label: n,
    links: r,
    content: i,
    chips: a,
    onChipClick: o,
    onLinkClick: s
  } = t, c = (f, d) => {
    (a == null ? void 0 : a.length) && f.type === "link" && (o == null || o(f, d));
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
}, US = Vk;
export {
  Hk as ActionSheet,
  gi as AutoCenter,
  Uk as Avatar,
  Ts as Badge,
  Wt as Button,
  zk as Calendar,
  qk as CalendarPicker,
  S9 as CalendarPickerView,
  Kk as CapsuleTabs,
  Gk as Card,
  Qk as CascadePicker,
  Jk as CascadePickerView,
  eS as Cascader,
  bb as CascaderView,
  l0 as CenterPopup,
  lf as CheckList,
  uf as Checkbox,
  tS as Collapse,
  Zk as ConfigProvider,
  nS as DatePicker,
  rS as DatePickerView,
  iS as Dialog,
  Rs as Divider,
  V1 as DotLoading,
  aS as Dropdown,
  oS as Ellipsis,
  sS as Empty,
  lS as ErrorBlock,
  cS as FloatingBubble,
  uS as FloatingPanel,
  US as Footer,
  fS as Form,
  um as Grid,
  lo as Image,
  dS as ImageUploader,
  E$ as ImageViewer,
  mS as IndexBar,
  hS as InfiniteScroll,
  ym as Input,
  vS as JumboTabs,
  kt as List,
  pS as Loading,
  Pi as Mask,
  gS as Modal,
  yS as NavBar,
  bS as NoticeBar,
  wS as NumberKeyboard,
  J$ as PageIndicator,
  ES as PasscodeInput,
  t0 as Picker,
  Kl as PickerView,
  lm as Popover,
  Nr as Popup,
  CS as ProgressBar,
  xS as ProgressCircle,
  $S as PullToRefresh,
  _S as Radio,
  kS as Rate,
  SS as Result,
  OS as ResultPage,
  Ar as SafeArea,
  H1 as ScrollMask,
  FS as SearchBar,
  PS as Selector,
  NS as SideBar,
  ta as Skeleton,
  AS as Slider,
  wc as Space,
  ql as SpinLoading,
  TS as Stepper,
  RS as Steps,
  MS as SwipeAction,
  IS as Swiper,
  LS as Switch,
  DS as TabBar,
  sf as Tabs,
  VS as Tag,
  jS as TextArea,
  BS as Toast,
  WS as TreeSelect,
  ZS as VirtualInput,
  HS as WaterMark,
  vw as createErrorBlock,
  Yk as reduceMotion,
  Xk as restoreMotion,
  Wk as setDefaultConfig
};
