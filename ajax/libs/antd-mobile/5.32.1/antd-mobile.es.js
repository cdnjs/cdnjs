import * as L from "react";
import l, { useContext as it, useRef as D, useMemo as re, useEffect as G, useState as q, useCallback as Ze, useLayoutEffect as al, forwardRef as me, useImperativeHandle as ge, memo as De, isValidElement as Ln, createContext as ol, cloneElement as Nm } from "react";
import * as Am from "react-dom";
import { unstable_batchedUpdates as Tm, createPortal as Rm, findDOMNode as Mm } from "react-dom";
const vr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
vr && document.addEventListener("touchstart", () => {
}, !0);
var ma = function() {
  return ma = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, ma.apply(this, arguments);
};
function wi(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function Ce(e, t, n, r) {
  function i(a) {
    return a instanceof n ? a : new n(function(o) {
      o(a);
    });
  }
  return new (n || (n = Promise))(function(a, o) {
    function s(d) {
      try {
        u(r.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(r.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? a(d.value) : i(d.value).then(s, c);
    }
    u((r = r.apply(e, t || [])).next());
  });
}
function Im(e, t) {
  var n = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, r, i, a, o;
  return o = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function s(u) {
    return function(d) {
      return c([u, d]);
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
      } catch (d) {
        u = [6, d], i = 0;
      } finally {
        r = a = 0;
      }
    if (u[0] & 5)
      throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
function Lm(e) {
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
function sl(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Dm(e, t) {
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
const Ue = "${label} is not a valid ${type}", Vm = {
  locale: "en",
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    loading: "Loading",
    close: "Close"
  },
  Calendar: {
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
}, ze = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}", jm = Dm(Vm, {
  locale: "zh-CH",
  common: {
    confirm: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    loading: "\u52A0\u8F7D\u4E2D",
    close: "\u5173\u95ED"
  },
  Calendar: {
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
        string: ze,
        method: ze,
        array: ze,
        object: ze,
        number: ze,
        date: ze,
        boolean: ze,
        integer: ze,
        float: ze,
        regexp: ze,
        email: ze,
        url: ze,
        hex: ze
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
}), Bm = jm, nd = {
  current: {
    locale: Bm
  }
};
function $k(e) {
  nd.current = e;
}
function Ei() {
  return nd.current;
}
const rd = l.createContext(null), Wm = (e) => {
  const {
    children: t
  } = e, n = wi(e, ["children"]), r = pe();
  return l.createElement(rd.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, t);
};
function pe() {
  var e;
  return (e = it(rd)) !== null && e !== void 0 ? e : Ei();
}
const xk = Wm;
function ie(e, t) {
  const n = e;
  for (const r in t)
    t.hasOwnProperty(r) && (n[r] = t[r]);
  return n;
}
var _t = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, id = { exports: {} };
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
})(id);
const j = id.exports;
function B(e, t) {
  const n = Object.assign({}, t.props);
  e.className && (n.className = j(t.props.className, e.className)), e.style && (n.style = Object.assign(Object.assign({}, n.style), e.style)), e.tabIndex !== void 0 && (n.tabIndex = e.tabIndex);
  for (const r in e)
    !e.hasOwnProperty(r) || (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = e[r]);
  return l.cloneElement(t, n);
}
var Zm = typeof _t == "object" && _t && _t.Object === Object && _t, ad = Zm, Hm = ad, Um = typeof self == "object" && self && self.Object === Object && self, zm = Hm || Um || Function("return this")(), yt = zm, qm = yt, Km = qm.Symbol, ll = Km, kc = ll, od = Object.prototype, Gm = od.hasOwnProperty, Ym = od.toString, Tr = kc ? kc.toStringTag : void 0;
function Xm(e) {
  var t = Gm.call(e, Tr), n = e[Tr];
  try {
    e[Tr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Ym.call(e);
  return r && (t ? e[Tr] = n : delete e[Tr]), i;
}
var Qm = Xm, Jm = Object.prototype, eh = Jm.toString;
function th(e) {
  return eh.call(e);
}
var nh = th, Sc = ll, rh = Qm, ih = nh, ah = "[object Null]", oh = "[object Undefined]", Oc = Sc ? Sc.toStringTag : void 0;
function sh(e) {
  return e == null ? e === void 0 ? oh : ah : Oc && Oc in Object(e) ? rh(e) : ih(e);
}
var pr = sh;
function lh(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ft = lh, ch = pr, uh = Ft, fh = "[object AsyncFunction]", dh = "[object Function]", mh = "[object GeneratorFunction]", hh = "[object Proxy]";
function vh(e) {
  if (!uh(e))
    return !1;
  var t = ch(e);
  return t == dh || t == mh || t == fh || t == hh;
}
var cl = vh, ph = yt, gh = ph["__core-js_shared__"], yh = gh, Ao = yh, Fc = function() {
  var e = /[^.]+$/.exec(Ao && Ao.keys && Ao.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function bh(e) {
  return !!Fc && Fc in e;
}
var wh = bh, Eh = Function.prototype, Ch = Eh.toString;
function $h(e) {
  if (e != null) {
    try {
      return Ch.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var sd = $h, xh = cl, _h = wh, kh = Ft, Sh = sd, Oh = /[\\^$.*+?()[\]{}|]/g, Fh = /^\[object .+?Constructor\]$/, Ph = Function.prototype, Nh = Object.prototype, Ah = Ph.toString, Th = Nh.hasOwnProperty, Rh = RegExp(
  "^" + Ah.call(Th).replace(Oh, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Mh(e) {
  if (!kh(e) || _h(e))
    return !1;
  var t = xh(e) ? Rh : Fh;
  return t.test(Sh(e));
}
var Ih = Mh;
function Lh(e, t) {
  return e == null ? void 0 : e[t];
}
var Dh = Lh, Vh = Ih, jh = Dh;
function Bh(e, t) {
  var n = jh(e, t);
  return Vh(n) ? n : void 0;
}
var Dn = Bh, Wh = Dn, Zh = function() {
  try {
    var e = Wh(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ld = Zh, Pc = ld;
function Hh(e, t, n) {
  t == "__proto__" && Pc ? Pc(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var ul = Hh;
function Uh(e, t) {
  return e === t || e !== e && t !== t;
}
var Ci = Uh, zh = ul, qh = Ci, Kh = Object.prototype, Gh = Kh.hasOwnProperty;
function Yh(e, t, n) {
  var r = e[t];
  (!(Gh.call(e, t) && qh(r, n)) || n === void 0 && !(t in e)) && zh(e, t, n);
}
var Xh = Yh, Qh = Xh, Jh = ul;
function e2(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), i ? Jh(n, s, c) : Qh(n, s, c);
  }
  return n;
}
var cd = e2;
function t2(e) {
  return e;
}
var ud = t2;
function n2(e, t, n) {
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
var r2 = n2, i2 = r2, Nc = Math.max;
function a2(e, t, n) {
  return t = Nc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, i = -1, a = Nc(r.length - t, 0), o = Array(a); ++i < a; )
      o[i] = r[t + i];
    i = -1;
    for (var s = Array(t + 1); ++i < t; )
      s[i] = r[i];
    return s[t] = n(o), i2(e, this, s);
  };
}
var o2 = a2;
function s2(e) {
  return function() {
    return e;
  };
}
var l2 = s2, c2 = l2, Ac = ld, u2 = ud, f2 = Ac ? function(e, t) {
  return Ac(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: c2(t),
    writable: !0
  });
} : u2, d2 = f2, m2 = 800, h2 = 16, v2 = Date.now;
function p2(e) {
  var t = 0, n = 0;
  return function() {
    var r = v2(), i = h2 - (r - n);
    if (n = r, i > 0) {
      if (++t >= m2)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var g2 = p2, y2 = d2, b2 = g2, w2 = b2(y2), E2 = w2, C2 = ud, $2 = o2, x2 = E2;
function _2(e, t) {
  return x2($2(e, t, C2), e + "");
}
var k2 = _2, S2 = 9007199254740991;
function O2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= S2;
}
var fd = O2, F2 = cl, P2 = fd;
function N2(e) {
  return e != null && P2(e.length) && !F2(e);
}
var La = N2, A2 = 9007199254740991, T2 = /^(?:0|[1-9]\d*)$/;
function R2(e, t) {
  var n = typeof e;
  return t = t == null ? A2 : t, !!t && (n == "number" || n != "symbol" && T2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var dd = R2, M2 = Ci, I2 = La, L2 = dd, D2 = Ft;
function V2(e, t, n) {
  if (!D2(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? I2(n) && L2(t, n.length) : r == "string" && t in n) ? M2(n[t], e) : !1;
}
var j2 = V2, B2 = k2, W2 = j2;
function Z2(e) {
  return B2(function(t, n) {
    var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && W2(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i; ) {
      var s = n[r];
      s && e(t, s, r, a);
    }
    return t;
  });
}
var md = Z2;
function H2(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var U2 = H2;
function z2(e) {
  return e != null && typeof e == "object";
}
var Vn = z2, q2 = pr, K2 = Vn, G2 = "[object Arguments]";
function Y2(e) {
  return K2(e) && q2(e) == G2;
}
var X2 = Y2, Tc = X2, Q2 = Vn, hd = Object.prototype, J2 = hd.hasOwnProperty, ev = hd.propertyIsEnumerable, tv = Tc(function() {
  return arguments;
}()) ? Tc : function(e) {
  return Q2(e) && J2.call(e, "callee") && !ev.call(e, "callee");
}, vd = tv, nv = Array.isArray, Da = nv, oi = { exports: {} };
function rv() {
  return !1;
}
var iv = rv;
(function(e, t) {
  var n = yt, r = iv, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  e.exports = u;
})(oi, oi.exports);
var av = pr, ov = fd, sv = Vn, lv = "[object Arguments]", cv = "[object Array]", uv = "[object Boolean]", fv = "[object Date]", dv = "[object Error]", mv = "[object Function]", hv = "[object Map]", vv = "[object Number]", pv = "[object Object]", gv = "[object RegExp]", yv = "[object Set]", bv = "[object String]", wv = "[object WeakMap]", Ev = "[object ArrayBuffer]", Cv = "[object DataView]", $v = "[object Float32Array]", xv = "[object Float64Array]", _v = "[object Int8Array]", kv = "[object Int16Array]", Sv = "[object Int32Array]", Ov = "[object Uint8Array]", Fv = "[object Uint8ClampedArray]", Pv = "[object Uint16Array]", Nv = "[object Uint32Array]", de = {};
de[$v] = de[xv] = de[_v] = de[kv] = de[Sv] = de[Ov] = de[Fv] = de[Pv] = de[Nv] = !0;
de[lv] = de[cv] = de[Ev] = de[uv] = de[Cv] = de[fv] = de[dv] = de[mv] = de[hv] = de[vv] = de[pv] = de[gv] = de[yv] = de[bv] = de[wv] = !1;
function Av(e) {
  return sv(e) && ov(e.length) && !!de[av(e)];
}
var Tv = Av;
function Rv(e) {
  return function(t) {
    return e(t);
  };
}
var Mv = Rv, ls = { exports: {} };
(function(e, t) {
  var n = ad, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(ls, ls.exports);
var Iv = Tv, Lv = Mv, Rc = ls.exports, Mc = Rc && Rc.isTypedArray, Dv = Mc ? Lv(Mc) : Iv, fl = Dv, Vv = U2, jv = vd, Bv = Da, Wv = oi.exports, Zv = dd, Hv = fl, Uv = Object.prototype, zv = Uv.hasOwnProperty;
function qv(e, t) {
  var n = Bv(e), r = !n && jv(e), i = !n && !r && Wv(e), a = !n && !r && !i && Hv(e), o = n || r || i || a, s = o ? Vv(e.length, String) : [], c = s.length;
  for (var u in e)
    (t || zv.call(e, u)) && !(o && (u == "length" || i && (u == "offset" || u == "parent") || a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Zv(u, c))) && s.push(u);
  return s;
}
var pd = qv, Kv = Object.prototype;
function Gv(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Kv;
  return e === n;
}
var dl = Gv;
function Yv(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var gd = Yv, Xv = gd, Qv = Xv(Object.keys, Object), Jv = Qv, ep = dl, tp = Jv, np = Object.prototype, rp = np.hasOwnProperty;
function ip(e) {
  if (!ep(e))
    return tp(e);
  var t = [];
  for (var n in Object(e))
    rp.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var ap = ip, op = pd, sp = ap, lp = La;
function cp(e) {
  return lp(e) ? op(e) : sp(e);
}
var yd = cp, up = cd, fp = md, dp = yd, mp = fp(function(e, t, n, r) {
  up(t, dp(t), e, r);
}), hp = mp;
function U(...e) {
  function t(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, e[0]);
  for (let r = 1; r < e.length; r++)
    n = hp(n, e[r], t);
  return n;
}
var bd = function(e) {
  return function(t, n) {
    var r = D(!1);
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
}, gr = function(e) {
  return typeof e == "function";
}, vp = function(e) {
  return typeof e == "number";
}, pp = !1;
const $i = pp;
function Zt(e) {
  $i && (gr(e) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));
  var t = D(e);
  t.current = re(function() {
    return e;
  }, [e]);
  var n = D();
  return n.current || (n.current = function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return t.current.apply(this, r);
  }), n.current;
}
const ml = bd(G);
function Ic(e, t) {
  if (e === t)
    return !0;
  for (var n = 0; n < e.length; n++)
    if (!Object.is(e[n], t[n]))
      return !1;
  return !0;
}
function Va(e) {
  var t = D(e);
  return t.current = e, t;
}
var gp = function(e) {
  $i && (gr(e) || console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));
  var t = Va(e);
  G(function() {
    return function() {
      t.current();
    };
  }, []);
};
const xi = gp;
var yp = yt, bp = function() {
  return yp.Date.now();
}, wp = bp, Ep = /\s/;
function Cp(e) {
  for (var t = e.length; t-- && Ep.test(e.charAt(t)); )
    ;
  return t;
}
var $p = Cp, xp = $p, _p = /^\s+/;
function kp(e) {
  return e && e.slice(0, xp(e) + 1).replace(_p, "");
}
var Sp = kp, Op = pr, Fp = Vn, Pp = "[object Symbol]";
function Np(e) {
  return typeof e == "symbol" || Fp(e) && Op(e) == Pp;
}
var Ap = Np, Tp = Sp, Lc = Ft, Rp = Ap, Dc = 0 / 0, Mp = /^[-+]0x[0-9a-f]+$/i, Ip = /^0b[01]+$/i, Lp = /^0o[0-7]+$/i, Dp = parseInt;
function Vp(e) {
  if (typeof e == "number")
    return e;
  if (Rp(e))
    return Dc;
  if (Lc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Lc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Tp(e);
  var n = Ip.test(e);
  return n || Lp.test(e) ? Dp(e.slice(2), n ? 2 : 8) : Mp.test(e) ? Dc : +e;
}
var jp = Vp, Bp = Ft, To = wp, Vc = jp, Wp = "Expected a function", Zp = Math.max, Hp = Math.min;
function Up(e, t, n) {
  var r, i, a, o, s, c, u = 0, d = !1, f = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(Wp);
  t = Vc(t) || 0, Bp(n) && (d = !!n.leading, f = "maxWait" in n, a = f ? Zp(Vc(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function v(C) {
    var k = r, N = i;
    return r = i = void 0, u = C, o = e.apply(N, k), o;
  }
  function g(C) {
    return u = C, s = setTimeout(w, t), d ? v(C) : o;
  }
  function h(C) {
    var k = C - c, N = C - u, P = t - k;
    return f ? Hp(P, a - N) : P;
  }
  function b(C) {
    var k = C - c, N = C - u;
    return c === void 0 || k >= t || k < 0 || f && N >= a;
  }
  function w() {
    var C = To();
    if (b(C))
      return $(C);
    s = setTimeout(w, h(C));
  }
  function $(C) {
    return s = void 0, m && r ? v(C) : (r = i = void 0, o);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function p() {
    return s === void 0 ? o : $(To());
  }
  function E() {
    var C = To(), k = b(C);
    if (r = arguments, i = this, c = C, k) {
      if (s === void 0)
        return g(c);
      if (f)
        return clearTimeout(s), s = setTimeout(w, t), v(c);
    }
    return s === void 0 && (s = setTimeout(w, t)), o;
  }
  return E.cancel = y, E.flush = p, E;
}
var wd = Up, zp = !!(typeof window < "u" && window.document && window.document.createElement);
const hl = zp;
var qp = wd, Kp = Ft, Gp = "Expected a function";
function Yp(e, t, n) {
  var r = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(Gp);
  return Kp(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), qp(e, t, {
    leading: r,
    maxWait: t,
    trailing: i
  });
}
var Xp = Yp, Qp = function(e) {
  $i && (gr(e) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e, '".'))), G(function() {
    e == null || e();
  }, []);
};
const Jp = Qp;
var e3 = function() {
  var e = St(q({}), 2), t = e[1];
  return Ze(function() {
    return t({});
  }, []);
};
const Ed = e3;
function rn(e, t) {
  if (!!hl) {
    if (!e)
      return t;
    var n;
    return gr(e) ? n = e() : "current" in e ? n = e.current : n = e, n;
  }
}
var t3 = function(e) {
  return e.every(function(t) {
    var n = rn(t);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, n3 = function(e) {
  return e ? e.getRootNode() : document;
}, r3 = function(e) {
  if (!e || !document.getRootNode)
    return document;
  var t = Array.isArray(e) ? e : [e];
  return t3(t) ? n3(rn(t[0])) : document;
};
const i3 = r3;
var a3 = function(e) {
  var t = function(n, r, i) {
    var a = D(!1), o = D([]), s = D([]), c = D();
    e(function() {
      var u, d = Array.isArray(i) ? i : [i], f = d.map(function(m) {
        return rn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = f, s.current = r, c.current = n();
        return;
      }
      (f.length !== o.current.length || !Ic(f, o.current) || !Ic(r, s.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = f, s.current = r, c.current = n());
    }), xi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return t;
};
const Cd = a3;
var o3 = Cd(G);
const vl = o3;
function $d(e, t, n) {
  n === void 0 && (n = "click");
  var r = Va(e);
  vl(function() {
    var i = function(s) {
      var c = Array.isArray(t) ? t : [t];
      c.some(function(u) {
        var d = rn(u);
        return !d || d.contains(s.target);
      }) || r.current(s);
    }, a = i3(t), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(s) {
      return a.addEventListener(s, i);
    }), function() {
      o.forEach(function(s) {
        return a.removeEventListener(s, i);
      });
    };
  }, Array.isArray(n) ? n : [n], t);
}
var xd = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(_t, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", d = "week", f = "month", m = "quarter", v = "year", g = "date", h = "Invalid Date", b = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, $ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(_) {
      var x = ["th", "st", "nd", "rd"], S = _ % 100;
      return "[" + _ + (x[(S - 20) % 10] || x[S] || x[0]) + "]";
    } }, y = function(_, x, S) {
      var I = String(_);
      return !I || I.length >= x ? _ : "" + Array(x + 1 - I.length).join(S) + _;
    }, p = { s: y, z: function(_) {
      var x = -_.utcOffset(), S = Math.abs(x), I = Math.floor(S / 60), A = S % 60;
      return (x <= 0 ? "+" : "-") + y(I, 2, "0") + ":" + y(A, 2, "0");
    }, m: function _(x, S) {
      if (x.date() < S.date())
        return -_(S, x);
      var I = 12 * (S.year() - x.year()) + (S.month() - x.month()), A = x.clone().add(I, f), V = S - A < 0, M = x.clone().add(I + (V ? -1 : 1), f);
      return +(-(I + (S - A) / (V ? A - M : M - A)) || 0);
    }, a: function(_) {
      return _ < 0 ? Math.ceil(_) || 0 : Math.floor(_);
    }, p: function(_) {
      return { M: f, y: v, w: d, d: u, D: g, h: c, m: s, s: o, ms: a, Q: m }[_] || String(_ || "").toLowerCase().replace(/s$/, "");
    }, u: function(_) {
      return _ === void 0;
    } }, E = "en", C = {};
    C[E] = $;
    var k = function(_) {
      return _ instanceof T;
    }, N = function _(x, S, I) {
      var A;
      if (!x)
        return E;
      if (typeof x == "string") {
        var V = x.toLowerCase();
        C[V] && (A = V), S && (C[V] = S, A = V);
        var M = x.split("-");
        if (!A && M.length > 1)
          return _(M[0]);
      } else {
        var R = x.name;
        C[R] = x, A = R;
      }
      return !I && A && (E = A), A || !I && E;
    }, P = function(_, x) {
      if (k(_))
        return _.clone();
      var S = typeof x == "object" ? x : {};
      return S.date = _, S.args = arguments, new T(S);
    }, F = p;
    F.l = N, F.i = k, F.w = function(_, x) {
      return P(_, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
    };
    var T = function() {
      function _(S) {
        this.$L = N(S.locale, null, !0), this.parse(S);
      }
      var x = _.prototype;
      return x.parse = function(S) {
        this.$d = function(I) {
          var A = I.date, V = I.utc;
          if (A === null)
            return new Date(NaN);
          if (F.u(A))
            return new Date();
          if (A instanceof Date)
            return new Date(A);
          if (typeof A == "string" && !/Z$/i.test(A)) {
            var M = A.match(b);
            if (M) {
              var R = M[2] - 1 || 0, W = (M[7] || "0").substring(0, 3);
              return V ? new Date(Date.UTC(M[1], R, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W)) : new Date(M[1], R, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W);
            }
          }
          return new Date(A);
        }(S), this.$x = S.x || {}, this.init();
      }, x.init = function() {
        var S = this.$d;
        this.$y = S.getFullYear(), this.$M = S.getMonth(), this.$D = S.getDate(), this.$W = S.getDay(), this.$H = S.getHours(), this.$m = S.getMinutes(), this.$s = S.getSeconds(), this.$ms = S.getMilliseconds();
      }, x.$utils = function() {
        return F;
      }, x.isValid = function() {
        return this.$d.toString() !== h;
      }, x.isSame = function(S, I) {
        var A = P(S);
        return this.startOf(I) <= A && A <= this.endOf(I);
      }, x.isAfter = function(S, I) {
        return P(S) < this.startOf(I);
      }, x.isBefore = function(S, I) {
        return this.endOf(I) < P(S);
      }, x.$g = function(S, I, A) {
        return F.u(S) ? this[I] : this.set(A, S);
      }, x.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, x.valueOf = function() {
        return this.$d.getTime();
      }, x.startOf = function(S, I) {
        var A = this, V = !!F.u(I) || I, M = F.p(S), R = function(we, se) {
          var ct = F.w(A.$u ? Date.UTC(A.$y, se, we) : new Date(A.$y, se, we), A);
          return V ? ct : ct.endOf(u);
        }, W = function(we, se) {
          return F.w(A.toDate()[we].apply(A.toDate("s"), (V ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(se)), A);
        }, Z = this.$W, z = this.$M, Y = this.$D, K = "set" + (this.$u ? "UTC" : "");
        switch (M) {
          case v:
            return V ? R(1, 0) : R(31, 11);
          case f:
            return V ? R(1, z) : R(0, z + 1);
          case d:
            var _e = this.$locale().weekStart || 0, ke = (Z < _e ? Z + 7 : Z) - _e;
            return R(V ? Y - ke : Y + (6 - ke), z);
          case u:
          case g:
            return W(K + "Hours", 0);
          case c:
            return W(K + "Minutes", 1);
          case s:
            return W(K + "Seconds", 2);
          case o:
            return W(K + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, x.endOf = function(S) {
        return this.startOf(S, !1);
      }, x.$set = function(S, I) {
        var A, V = F.p(S), M = "set" + (this.$u ? "UTC" : ""), R = (A = {}, A[u] = M + "Date", A[g] = M + "Date", A[f] = M + "Month", A[v] = M + "FullYear", A[c] = M + "Hours", A[s] = M + "Minutes", A[o] = M + "Seconds", A[a] = M + "Milliseconds", A)[V], W = V === u ? this.$D + (I - this.$W) : I;
        if (V === f || V === v) {
          var Z = this.clone().set(g, 1);
          Z.$d[R](W), Z.init(), this.$d = Z.set(g, Math.min(this.$D, Z.daysInMonth())).$d;
        } else
          R && this.$d[R](W);
        return this.init(), this;
      }, x.set = function(S, I) {
        return this.clone().$set(S, I);
      }, x.get = function(S) {
        return this[F.p(S)]();
      }, x.add = function(S, I) {
        var A, V = this;
        S = Number(S);
        var M = F.p(I), R = function(z) {
          var Y = P(V);
          return F.w(Y.date(Y.date() + Math.round(z * S)), V);
        };
        if (M === f)
          return this.set(f, this.$M + S);
        if (M === v)
          return this.set(v, this.$y + S);
        if (M === u)
          return R(1);
        if (M === d)
          return R(7);
        var W = (A = {}, A[s] = r, A[c] = i, A[o] = n, A)[M] || 1, Z = this.$d.getTime() + S * W;
        return F.w(Z, this);
      }, x.subtract = function(S, I) {
        return this.add(-1 * S, I);
      }, x.format = function(S) {
        var I = this, A = this.$locale();
        if (!this.isValid())
          return A.invalidDate || h;
        var V = S || "YYYY-MM-DDTHH:mm:ssZ", M = F.z(this), R = this.$H, W = this.$m, Z = this.$M, z = A.weekdays, Y = A.months, K = function(se, ct, He, he) {
          return se && (se[ct] || se(I, V)) || He[ct].slice(0, he);
        }, _e = function(se) {
          return F.s(R % 12 || 12, se, "0");
        }, ke = A.meridiem || function(se, ct, He) {
          var he = se < 12 ? "AM" : "PM";
          return He ? he.toLowerCase() : he;
        }, we = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: Z + 1, MM: F.s(Z + 1, 2, "0"), MMM: K(A.monthsShort, Z, Y, 3), MMMM: K(Y, Z), D: this.$D, DD: F.s(this.$D, 2, "0"), d: String(this.$W), dd: K(A.weekdaysMin, this.$W, z, 2), ddd: K(A.weekdaysShort, this.$W, z, 3), dddd: z[this.$W], H: String(R), HH: F.s(R, 2, "0"), h: _e(1), hh: _e(2), a: ke(R, W, !0), A: ke(R, W, !1), m: String(W), mm: F.s(W, 2, "0"), s: String(this.$s), ss: F.s(this.$s, 2, "0"), SSS: F.s(this.$ms, 3, "0"), Z: M };
        return V.replace(w, function(se, ct) {
          return ct || we[se] || M.replace(":", "");
        });
      }, x.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, x.diff = function(S, I, A) {
        var V, M = F.p(I), R = P(S), W = (R.utcOffset() - this.utcOffset()) * r, Z = this - R, z = F.m(this, R);
        return z = (V = {}, V[v] = z / 12, V[f] = z, V[m] = z / 3, V[d] = (Z - W) / 6048e5, V[u] = (Z - W) / 864e5, V[c] = Z / i, V[s] = Z / r, V[o] = Z / n, V)[M] || Z, A ? z : F.a(z);
      }, x.daysInMonth = function() {
        return this.endOf(f).$D;
      }, x.$locale = function() {
        return C[this.$L];
      }, x.locale = function(S, I) {
        if (!S)
          return this.$L;
        var A = this.clone(), V = N(S, I, !0);
        return V && (A.$L = V), A;
      }, x.clone = function() {
        return F.w(this.$d, this);
      }, x.toDate = function() {
        return new Date(this.valueOf());
      }, x.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, x.toISOString = function() {
        return this.$d.toISOString();
      }, x.toString = function() {
        return this.$d.toUTCString();
      }, _;
    }(), O = T.prototype;
    return P.prototype = O, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", f], ["$y", v], ["$D", g]].forEach(function(_) {
      O[_[1]] = function(x) {
        return this.$g(x, _[0], _[1]);
      };
    }), P.extend = function(_, x) {
      return _.$i || (_(x, T, P), _.$i = !0), P;
    }, P.locale = N, P.isDayjs = k, P.unix = function(_) {
      return P(1e3 * _);
    }, P.en = C[E], P.Ls = C, P.p = {}, P;
  });
})(xd);
const Se = xd.exports;
function s3(e, t) {
  var n;
  $i && (gr(e) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));
  var r = Va(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return wd(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, sl([], St(o), !1));
    }, i, t);
  }, []);
  return xi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function l3(e, t, n) {
  var r = St(q({}), 2), i = r[0], a = r[1], o = s3(function() {
    a({});
  }, n).run;
  G(function() {
    return o();
  }, t), ml(e, [i]);
}
function c3() {
  this.__data__ = [], this.size = 0;
}
var u3 = c3, f3 = Ci;
function d3(e, t) {
  for (var n = e.length; n--; )
    if (f3(e[n][0], t))
      return n;
  return -1;
}
var ja = d3, m3 = ja, h3 = Array.prototype, v3 = h3.splice;
function p3(e) {
  var t = this.__data__, n = m3(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : v3.call(t, n, 1), --this.size, !0;
}
var g3 = p3, y3 = ja;
function b3(e) {
  var t = this.__data__, n = y3(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var w3 = b3, E3 = ja;
function C3(e) {
  return E3(this.__data__, e) > -1;
}
var $3 = C3, x3 = ja;
function _3(e, t) {
  var n = this.__data__, r = x3(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var k3 = _3, S3 = u3, O3 = g3, F3 = w3, P3 = $3, N3 = k3;
function yr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
yr.prototype.clear = S3;
yr.prototype.delete = O3;
yr.prototype.get = F3;
yr.prototype.has = P3;
yr.prototype.set = N3;
var Ba = yr, A3 = Ba;
function T3() {
  this.__data__ = new A3(), this.size = 0;
}
var R3 = T3;
function M3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var I3 = M3;
function L3(e) {
  return this.__data__.get(e);
}
var D3 = L3;
function V3(e) {
  return this.__data__.has(e);
}
var j3 = V3, B3 = Dn, W3 = yt, Z3 = B3(W3, "Map"), pl = Z3, H3 = Dn, U3 = H3(Object, "create"), Wa = U3, jc = Wa;
function z3() {
  this.__data__ = jc ? jc(null) : {}, this.size = 0;
}
var q3 = z3;
function K3(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var G3 = K3, Y3 = Wa, X3 = "__lodash_hash_undefined__", Q3 = Object.prototype, J3 = Q3.hasOwnProperty;
function eg(e) {
  var t = this.__data__;
  if (Y3) {
    var n = t[e];
    return n === X3 ? void 0 : n;
  }
  return J3.call(t, e) ? t[e] : void 0;
}
var tg = eg, ng = Wa, rg = Object.prototype, ig = rg.hasOwnProperty;
function ag(e) {
  var t = this.__data__;
  return ng ? t[e] !== void 0 : ig.call(t, e);
}
var og = ag, sg = Wa, lg = "__lodash_hash_undefined__";
function cg(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = sg && t === void 0 ? lg : t, this;
}
var ug = cg, fg = q3, dg = G3, mg = tg, hg = og, vg = ug;
function br(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
br.prototype.clear = fg;
br.prototype.delete = dg;
br.prototype.get = mg;
br.prototype.has = hg;
br.prototype.set = vg;
var pg = br, Bc = pg, gg = Ba, yg = pl;
function bg() {
  this.size = 0, this.__data__ = {
    hash: new Bc(),
    map: new (yg || gg)(),
    string: new Bc()
  };
}
var wg = bg;
function Eg(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var Cg = Eg, $g = Cg;
function xg(e, t) {
  var n = e.__data__;
  return $g(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Za = xg, _g = Za;
function kg(e) {
  var t = _g(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var Sg = kg, Og = Za;
function Fg(e) {
  return Og(this, e).get(e);
}
var Pg = Fg, Ng = Za;
function Ag(e) {
  return Ng(this, e).has(e);
}
var Tg = Ag, Rg = Za;
function Mg(e, t) {
  var n = Rg(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var Ig = Mg, Lg = wg, Dg = Sg, Vg = Pg, jg = Tg, Bg = Ig;
function wr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
wr.prototype.clear = Lg;
wr.prototype.delete = Dg;
wr.prototype.get = Vg;
wr.prototype.has = jg;
wr.prototype.set = Bg;
var gl = wr, Wg = Ba, Zg = pl, Hg = gl, Ug = 200;
function zg(e, t) {
  var n = this.__data__;
  if (n instanceof Wg) {
    var r = n.__data__;
    if (!Zg || r.length < Ug - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new Hg(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var qg = zg, Kg = Ba, Gg = R3, Yg = I3, Xg = D3, Qg = j3, Jg = qg;
function Er(e) {
  var t = this.__data__ = new Kg(e);
  this.size = t.size;
}
Er.prototype.clear = Gg;
Er.prototype.delete = Yg;
Er.prototype.get = Xg;
Er.prototype.has = Qg;
Er.prototype.set = Jg;
var _d = Er, e4 = "__lodash_hash_undefined__";
function t4(e) {
  return this.__data__.set(e, e4), this;
}
var n4 = t4;
function r4(e) {
  return this.__data__.has(e);
}
var i4 = r4, a4 = gl, o4 = n4, s4 = i4;
function ha(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new a4(); ++t < n; )
    this.add(e[t]);
}
ha.prototype.add = ha.prototype.push = o4;
ha.prototype.has = s4;
var l4 = ha;
function c4(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var u4 = c4;
function f4(e, t) {
  return e.has(t);
}
var d4 = f4, m4 = l4, h4 = u4, v4 = d4, p4 = 1, g4 = 2;
function y4(e, t, n, r, i, a) {
  var o = n & p4, s = e.length, c = t.length;
  if (s != c && !(o && c > s))
    return !1;
  var u = a.get(e), d = a.get(t);
  if (u && d)
    return u == t && d == e;
  var f = -1, m = !0, v = n & g4 ? new m4() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < s; ) {
    var g = e[f], h = t[f];
    if (r)
      var b = o ? r(h, g, f, t, e, a) : r(g, h, f, e, t, a);
    if (b !== void 0) {
      if (b)
        continue;
      m = !1;
      break;
    }
    if (v) {
      if (!h4(t, function(w, $) {
        if (!v4(v, $) && (g === w || i(g, w, n, r, a)))
          return v.push($);
      })) {
        m = !1;
        break;
      }
    } else if (!(g === h || i(g, h, n, r, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var kd = y4, b4 = yt, w4 = b4.Uint8Array, Sd = w4;
function E4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, i) {
    n[++t] = [i, r];
  }), n;
}
var C4 = E4;
function $4(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var x4 = $4, Wc = ll, Zc = Sd, _4 = Ci, k4 = kd, S4 = C4, O4 = x4, F4 = 1, P4 = 2, N4 = "[object Boolean]", A4 = "[object Date]", T4 = "[object Error]", R4 = "[object Map]", M4 = "[object Number]", I4 = "[object RegExp]", L4 = "[object Set]", D4 = "[object String]", V4 = "[object Symbol]", j4 = "[object ArrayBuffer]", B4 = "[object DataView]", Hc = Wc ? Wc.prototype : void 0, Ro = Hc ? Hc.valueOf : void 0;
function W4(e, t, n, r, i, a, o) {
  switch (n) {
    case B4:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case j4:
      return !(e.byteLength != t.byteLength || !a(new Zc(e), new Zc(t)));
    case N4:
    case A4:
    case M4:
      return _4(+e, +t);
    case T4:
      return e.name == t.name && e.message == t.message;
    case I4:
    case D4:
      return e == t + "";
    case R4:
      var s = S4;
    case L4:
      var c = r & F4;
      if (s || (s = O4), e.size != t.size && !c)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      r |= P4, o.set(e, t);
      var d = k4(s(e), s(t), r, i, a, o);
      return o.delete(e), d;
    case V4:
      if (Ro)
        return Ro.call(e) == Ro.call(t);
  }
  return !1;
}
var Z4 = W4;
function H4(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var U4 = H4, z4 = U4, q4 = Da;
function K4(e, t, n) {
  var r = t(e);
  return q4(e) ? r : z4(r, n(e));
}
var G4 = K4;
function Y4(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
var X4 = Y4;
function Q4() {
  return [];
}
var J4 = Q4, e5 = X4, t5 = J4, n5 = Object.prototype, r5 = n5.propertyIsEnumerable, Uc = Object.getOwnPropertySymbols, i5 = Uc ? function(e) {
  return e == null ? [] : (e = Object(e), e5(Uc(e), function(t) {
    return r5.call(e, t);
  }));
} : t5, a5 = i5, o5 = G4, s5 = a5, l5 = yd;
function c5(e) {
  return o5(e, l5, s5);
}
var u5 = c5, zc = u5, f5 = 1, d5 = Object.prototype, m5 = d5.hasOwnProperty;
function h5(e, t, n, r, i, a) {
  var o = n & f5, s = zc(e), c = s.length, u = zc(t), d = u.length;
  if (c != d && !o)
    return !1;
  for (var f = c; f--; ) {
    var m = s[f];
    if (!(o ? m in t : m5.call(t, m)))
      return !1;
  }
  var v = a.get(e), g = a.get(t);
  if (v && g)
    return v == t && g == e;
  var h = !0;
  a.set(e, t), a.set(t, e);
  for (var b = o; ++f < c; ) {
    m = s[f];
    var w = e[m], $ = t[m];
    if (r)
      var y = o ? r($, w, m, t, e, a) : r(w, $, m, e, t, a);
    if (!(y === void 0 ? w === $ || i(w, $, n, r, a) : y)) {
      h = !1;
      break;
    }
    b || (b = m == "constructor");
  }
  if (h && !b) {
    var p = e.constructor, E = t.constructor;
    p != E && "constructor" in e && "constructor" in t && !(typeof p == "function" && p instanceof p && typeof E == "function" && E instanceof E) && (h = !1);
  }
  return a.delete(e), a.delete(t), h;
}
var v5 = h5, p5 = Dn, g5 = yt, y5 = p5(g5, "DataView"), b5 = y5, w5 = Dn, E5 = yt, C5 = w5(E5, "Promise"), $5 = C5, x5 = Dn, _5 = yt, k5 = x5(_5, "Set"), S5 = k5, O5 = Dn, F5 = yt, P5 = O5(F5, "WeakMap"), N5 = P5, cs = b5, us = pl, fs = $5, ds = S5, ms = N5, Od = pr, Cr = sd, qc = "[object Map]", A5 = "[object Object]", Kc = "[object Promise]", Gc = "[object Set]", Yc = "[object WeakMap]", Xc = "[object DataView]", T5 = Cr(cs), R5 = Cr(us), M5 = Cr(fs), I5 = Cr(ds), L5 = Cr(ms), xn = Od;
(cs && xn(new cs(new ArrayBuffer(1))) != Xc || us && xn(new us()) != qc || fs && xn(fs.resolve()) != Kc || ds && xn(new ds()) != Gc || ms && xn(new ms()) != Yc) && (xn = function(e) {
  var t = Od(e), n = t == A5 ? e.constructor : void 0, r = n ? Cr(n) : "";
  if (r)
    switch (r) {
      case T5:
        return Xc;
      case R5:
        return qc;
      case M5:
        return Kc;
      case I5:
        return Gc;
      case L5:
        return Yc;
    }
  return t;
});
var D5 = xn, Mo = _d, V5 = kd, j5 = Z4, B5 = v5, Qc = D5, Jc = Da, eu = oi.exports, W5 = fl, Z5 = 1, tu = "[object Arguments]", nu = "[object Array]", Wi = "[object Object]", H5 = Object.prototype, ru = H5.hasOwnProperty;
function U5(e, t, n, r, i, a) {
  var o = Jc(e), s = Jc(t), c = o ? nu : Qc(e), u = s ? nu : Qc(t);
  c = c == tu ? Wi : c, u = u == tu ? Wi : u;
  var d = c == Wi, f = u == Wi, m = c == u;
  if (m && eu(e)) {
    if (!eu(t))
      return !1;
    o = !0, d = !1;
  }
  if (m && !d)
    return a || (a = new Mo()), o || W5(e) ? V5(e, t, n, r, i, a) : j5(e, t, c, n, r, i, a);
  if (!(n & Z5)) {
    var v = d && ru.call(e, "__wrapped__"), g = f && ru.call(t, "__wrapped__");
    if (v || g) {
      var h = v ? e.value() : e, b = g ? t.value() : t;
      return a || (a = new Mo()), i(h, b, n, r, a);
    }
  }
  return m ? (a || (a = new Mo()), B5(e, t, n, r, i, a)) : !1;
}
var z5 = U5, q5 = z5, iu = Vn;
function Fd(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !iu(e) && !iu(t) ? e !== e && t !== t : q5(e, t, n, r, Fd, i);
}
var K5 = Fd, G5 = K5;
function Y5(e, t) {
  return G5(e, t);
}
var X5 = Y5;
function Q5(e) {
  var t = St(q(e), 2), n = t[0], r = t[1], i = D(n);
  i.current = n;
  var a = Ze(function() {
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
  function e(y) {
    try {
      return y.defaultView && y.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var t = function(y) {
    for (var p = y, E = e(p); E; )
      p = E.ownerDocument, E = e(p);
    return p;
  }(window.document), n = [], r = null, i = null;
  function a(y) {
    this.time = y.time, this.target = y.target, this.rootBounds = g(y.rootBounds), this.boundingClientRect = g(y.boundingClientRect), this.intersectionRect = g(y.intersectionRect || v()), this.isIntersecting = !!y.intersectionRect;
    var p = this.boundingClientRect, E = p.width * p.height, C = this.intersectionRect, k = C.width * C.height;
    E ? this.intersectionRatio = Number((k / E).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(y, p) {
    var E = p || {};
    if (typeof y != "function")
      throw new Error("callback must be a function");
    if (E.root && E.root.nodeType != 1 && E.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = y, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(E.rootMargin), this.thresholds = this._initThresholds(E.threshold), this.root = E.root || null, this.rootMargin = this._rootMarginValues.map(function(C) {
      return C.value + C.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(y, p) {
      !y || !p ? i = v() : i = h(y, p), n.forEach(function(E) {
        E._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(y) {
    var p = this._observationTargets.some(function(E) {
      return E.element == y;
    });
    if (!p) {
      if (!(y && y.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: y, entry: null }), this._monitorIntersections(y.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(y) {
    this._observationTargets = this._observationTargets.filter(function(p) {
      return p.element != y;
    }), this._unmonitorIntersections(y.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var y = this._queuedEntries.slice();
    return this._queuedEntries = [], y;
  }, o.prototype._initThresholds = function(y) {
    var p = y || [0];
    return Array.isArray(p) || (p = [p]), p.sort().filter(function(E, C, k) {
      if (typeof E != "number" || isNaN(E) || E < 0 || E > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return E !== k[C - 1];
    });
  }, o.prototype._parseRootMargin = function(y) {
    var p = y || "0px", E = p.split(/\s+/).map(function(C) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(C);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return E[1] = E[1] || E[0], E[2] = E[2] || E[0], E[3] = E[3] || E[1], E;
  }, o.prototype._monitorIntersections = function(y) {
    var p = y.defaultView;
    if (!!p && this._monitoringDocuments.indexOf(y) == -1) {
      var E = this._checkForIntersections, C = null, k = null;
      this.POLL_INTERVAL ? C = p.setInterval(E, this.POLL_INTERVAL) : (u(p, "resize", E, !0), u(y, "scroll", E, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in p && (k = new p.MutationObserver(E), k.observe(y, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(y), this._monitoringUnsubscribes.push(function() {
        var F = y.defaultView;
        F && (C && F.clearInterval(C), d(F, "resize", E, !0)), d(y, "scroll", E, !0), k && k.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || t;
      if (y != N) {
        var P = e(y);
        P && this._monitorIntersections(P.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(y) {
    var p = this._monitoringDocuments.indexOf(y);
    if (p != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || t, C = this._observationTargets.some(function(P) {
        var F = P.element.ownerDocument;
        if (F == y)
          return !0;
        for (; F && F != E; ) {
          var T = e(F);
          if (F = T && T.ownerDocument, F == y)
            return !0;
        }
        return !1;
      });
      if (!C) {
        var k = this._monitoringUnsubscribes[p];
        if (this._monitoringDocuments.splice(p, 1), this._monitoringUnsubscribes.splice(p, 1), k(), y != E) {
          var N = e(y);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var y = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var p = 0; p < y.length; p++)
      y[p]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var y = this._rootIsInDom(), p = y ? this._getRootRect() : v();
      this._observationTargets.forEach(function(E) {
        var C = E.element, k = m(C), N = this._rootContainsTarget(C), P = E.entry, F = y && N && this._computeTargetAndRootIntersection(C, k, p), T = null;
        this._rootContainsTarget(C) ? (!r || this.root) && (T = p) : T = v();
        var O = E.entry = new a({
          time: s(),
          target: C,
          boundingClientRect: k,
          rootBounds: T,
          intersectionRect: F
        });
        P ? y && N ? this._hasCrossedThreshold(P, O) && this._queuedEntries.push(O) : P && P.isIntersecting && this._queuedEntries.push(O) : this._queuedEntries.push(O);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(y, p, E) {
    if (window.getComputedStyle(y).display != "none") {
      for (var C = p, k = w(y), N = !1; !N && k; ) {
        var P = null, F = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (F.display == "none")
          return null;
        if (k == this.root || k.nodeType == 9)
          if (N = !0, k == this.root || k == t)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, P = null, C = null) : P = i : P = E;
          else {
            var T = w(k), O = T && m(T), _ = T && this._computeTargetAndRootIntersection(T, O, E);
            O && _ ? (k = T, P = h(O, _)) : (k = null, C = null);
          }
        else {
          var x = k.ownerDocument;
          k != x.body && k != x.documentElement && F.overflow != "visible" && (P = m(k));
        }
        if (P && (C = f(P, C)), !C)
          break;
        k = k && w(k);
      }
      return C;
    }
  }, o.prototype._getRootRect = function() {
    var y;
    if (this.root && !$(this.root))
      y = m(this.root);
    else {
      var p = $(this.root) ? this.root : t, E = p.documentElement, C = p.body;
      y = {
        top: 0,
        left: 0,
        right: E.clientWidth || C.clientWidth,
        width: E.clientWidth || C.clientWidth,
        bottom: E.clientHeight || C.clientHeight,
        height: E.clientHeight || C.clientHeight
      };
    }
    return this._expandRectByRootMargin(y);
  }, o.prototype._expandRectByRootMargin = function(y) {
    var p = this._rootMarginValues.map(function(C, k) {
      return C.unit == "px" ? C.value : C.value * (k % 2 ? y.width : y.height) / 100;
    }), E = {
      top: y.top - p[0],
      right: y.right + p[1],
      bottom: y.bottom + p[2],
      left: y.left - p[3]
    };
    return E.width = E.right - E.left, E.height = E.bottom - E.top, E;
  }, o.prototype._hasCrossedThreshold = function(y, p) {
    var E = y && y.isIntersecting ? y.intersectionRatio || 0 : -1, C = p.isIntersecting ? p.intersectionRatio || 0 : -1;
    if (E !== C)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == E || N == C || N < E != N < C)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || b(t, this.root);
  }, o.prototype._rootContainsTarget = function(y) {
    var p = this.root && (this.root.ownerDocument || this.root) || t;
    return b(p, y) && (!this.root || p == y.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var y = n.indexOf(this);
    y != -1 && n.splice(y, 1);
  };
  function s() {
    return window.performance && performance.now && performance.now();
  }
  function c(y, p) {
    var E = null;
    return function() {
      E || (E = setTimeout(function() {
        y(), E = null;
      }, p));
    };
  }
  function u(y, p, E, C) {
    typeof y.addEventListener == "function" ? y.addEventListener(p, E, C || !1) : typeof y.attachEvent == "function" && y.attachEvent("on" + p, E);
  }
  function d(y, p, E, C) {
    typeof y.removeEventListener == "function" ? y.removeEventListener(p, E, C || !1) : typeof y.detachEvent == "function" && y.detachEvent("on" + p, E);
  }
  function f(y, p) {
    var E = Math.max(y.top, p.top), C = Math.min(y.bottom, p.bottom), k = Math.max(y.left, p.left), N = Math.min(y.right, p.right), P = N - k, F = C - E;
    return P >= 0 && F >= 0 && {
      top: E,
      bottom: C,
      left: k,
      right: N,
      width: P,
      height: F
    } || null;
  }
  function m(y) {
    var p;
    try {
      p = y.getBoundingClientRect();
    } catch {
    }
    return p ? (p.width && p.height || (p = {
      top: p.top,
      right: p.right,
      bottom: p.bottom,
      left: p.left,
      width: p.right - p.left,
      height: p.bottom - p.top
    }), p) : v();
  }
  function v() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  function g(y) {
    return !y || "x" in y ? y : {
      top: y.top,
      y: y.top,
      bottom: y.bottom,
      left: y.left,
      x: y.left,
      right: y.right,
      width: y.width,
      height: y.height
    };
  }
  function h(y, p) {
    var E = p.top - y.top, C = p.left - y.left;
    return {
      top: E,
      left: C,
      height: p.height,
      width: p.width,
      bottom: E + p.height,
      right: C + p.width
    };
  }
  function b(y, p) {
    for (var E = p; E; ) {
      if (E == y)
        return !0;
      E = w(E);
    }
    return !1;
  }
  function w(y) {
    var p = y.parentNode;
    return y.nodeType == 9 && y != t ? e(y) : (p && p.assignedSlot && (p = p.assignedSlot.parentNode), p && p.nodeType == 11 && p.host ? p.host : p);
  }
  function $(y) {
    return y && y.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function J5(e, t) {
  var n = St(q(), 2), r = n[0], i = n[1], a = St(q(), 2), o = a[0], s = a[1];
  return vl(function() {
    var c = rn(e);
    if (!!c) {
      var u = new IntersectionObserver(function(d) {
        var f, m;
        try {
          for (var v = Lm(d), g = v.next(); !g.done; g = v.next()) {
            var h = g.value;
            s(h.intersectionRatio), i(h.isIntersecting);
          }
        } catch (b) {
          f = {
            error: b
          };
        } finally {
          try {
            g && !g.done && (m = v.return) && m.call(v);
          } finally {
            if (f)
              throw f.error;
          }
        }
      }, ma(ma({}, t), {
        root: rn(t == null ? void 0 : t.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [t == null ? void 0 : t.rootMargin, t == null ? void 0 : t.threshold], e), [r, o];
}
var e6 = hl ? al : G;
const xe = e6;
function t6(e) {
  var t = this, n = D(!1);
  return Ze(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Ce(t, void 0, void 0, function() {
      var a, o;
      return Im(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [2];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, e.apply(void 0, sl([], St(r), !1))];
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
function n6(e) {
  var t = D(0), n = St(q(e), 2), r = n[0], i = n[1], a = Ze(function(o) {
    cancelAnimationFrame(t.current), t.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return xi(function() {
    cancelAnimationFrame(t.current);
  }), [r, a];
}
var r6 = function() {
  var e = D(!1);
  return G(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e;
};
const yl = r6;
var Pd = function() {
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
}(), hs = typeof window < "u" && typeof document < "u" && window.document === document, va = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), i6 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(va) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), a6 = 2;
function o6(e, t) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, e()), r && s();
  }
  function o() {
    i6(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < a6)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, t);
    i = c;
  }
  return s;
}
var s6 = 20, l6 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], c6 = typeof MutationObserver < "u", u6 = function() {
  function e() {
    this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = o6(this.refresh.bind(this), s6);
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
    !hs || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), c6 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
      attributes: !0,
      childList: !0,
      characterData: !0,
      subtree: !0
    })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
  }, e.prototype.disconnect_ = function() {
    !hs || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
  }, e.prototype.onTransitionEnd_ = function(t) {
    var n = t.propertyName, r = n === void 0 ? "" : n, i = l6.some(function(a) {
      return !!~r.indexOf(a);
    });
    i && this.refresh();
  }, e.getInstance = function() {
    return this.instance_ || (this.instance_ = new e()), this.instance_;
  }, e.instance_ = null, e;
}(), Nd = function(e, t) {
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
}, sr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || va;
}, Ad = Ha(0, 0, 0, 0);
function pa(e) {
  return parseFloat(e) || 0;
}
function au(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var a = e["border-" + i + "-width"];
    return r + pa(a);
  }, 0);
}
function f6(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], o = e["padding-" + a];
    n[a] = pa(o);
  }
  return n;
}
function d6(e) {
  var t = e.getBBox();
  return Ha(0, 0, t.width, t.height);
}
function m6(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return Ad;
  var r = sr(e).getComputedStyle(e), i = f6(r), a = i.left + i.right, o = i.top + i.bottom, s = pa(r.width), c = pa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= au(r, "left", "right") + a), Math.round(c + o) !== n && (c -= au(r, "top", "bottom") + o)), !v6(e)) {
    var u = Math.round(s + a) - t, d = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(d) !== 1 && (c -= d);
  }
  return Ha(i.left, i.top, s, c);
}
var h6 = function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof sr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof sr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function v6(e) {
  return e === sr(e).document.documentElement;
}
function p6(e) {
  return hs ? h6(e) ? d6(e) : m6(e) : Ad;
}
function g6(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return Nd(o, {
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
function Ha(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var y6 = function() {
  function e(t) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Ha(0, 0, 0, 0), this.target = t;
  }
  return e.prototype.isActive = function() {
    var t = p6(this.target);
    return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
  }, e.prototype.broadcastRect = function() {
    var t = this.contentRect_;
    return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
  }, e;
}(), b6 = function() {
  function e(t, n) {
    var r = g6(n);
    Nd(this, { target: t, contentRect: r });
  }
  return e;
}(), w6 = function() {
  function e(t, n, r) {
    if (this.activeObservations_ = [], this.observations_ = new Pd(), typeof t != "function")
      throw new TypeError("The callback provided as parameter 1 is not a function.");
    this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
  }
  return e.prototype.observe = function(t) {
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(t instanceof sr(t).Element))
        throw new TypeError('parameter 1 is not of type "Element".');
      var n = this.observations_;
      n.has(t) || (n.set(t, new y6(t)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, e.prototype.unobserve = function(t) {
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(t instanceof sr(t).Element))
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
        return new b6(r.target, r.broadcastRect());
      });
      this.callback_.call(t, n, t), this.clearActive();
    }
  }, e.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e;
}(), Td = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new Pd(), Rd = function() {
  function e(t) {
    if (!(this instanceof e))
      throw new TypeError("Cannot call a class as a function.");
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    var n = u6.getInstance(), r = new w6(t, n, this);
    Td.set(this, r);
  }
  return e;
}();
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Rd.prototype[e] = function() {
    var t;
    return (t = Td.get(this))[e].apply(t, arguments);
  };
});
var E6 = function() {
  return typeof va.ResizeObserver < "u" ? va.ResizeObserver : Rd;
}(), C6 = Cd(al);
const $6 = C6;
var x6 = hl ? $6 : vl;
const _6 = x6;
function vs(e) {
  var t = St(n6(function() {
    var i = rn(e);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = t[0], r = t[1];
  return _6(function() {
    var i = rn(e);
    if (!!i) {
      var a = new E6(function(o) {
        o.forEach(function(s) {
          var c = s.target, u = c.clientWidth, d = c.clientHeight;
          r({
            width: u,
            height: d
          });
        });
      });
      return a.observe(i), function() {
        a.disconnect();
      };
    }
  }, [], e), n;
}
function Ua(e, t) {
  var n;
  $i && (gr(e) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof e)));
  var r = Va(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return Xp(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, sl([], St(o), !1));
    }, i, t);
  }, []);
  return xi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var k6 = function(e, t) {
  var n = Zt(e), r = D(null), i = Ze(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return G(function() {
    if (!(!vp(t) || t < 0))
      return r.current = setTimeout(n, t), i;
  }, [t]), i;
};
const S6 = k6;
const ou = 10;
function O6(e, t) {
  return e > t && e > ou ? "horizontal" : t > e && t > ou ? "vertical" : "";
}
function F6() {
  const e = D(0), t = D(0), n = D(0), r = D(0), i = D(0), a = D(0), o = D(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const v = m.touches[0];
      n.current = v.clientX < 0 ? 0 : v.clientX - e.current, r.current = v.clientY - t.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = O6(i.current, a.current));
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
const P6 = vr ? window : void 0, N6 = ["scroll", "auto", "overlay"];
function A6(e) {
  return e.nodeType === 1;
}
function ga(e, t = P6) {
  let n = e;
  for (; n && n !== t && A6(n); ) {
    if (n === document.body)
      return t;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (N6.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return t;
}
let Nn = !1;
if (vr)
  try {
    const e = {};
    Object.defineProperty(e, "passive", {
      get() {
        Nn = !0;
      }
    }), window.addEventListener("test-passive", null, e);
  } catch {
  }
let Rr = 0;
const su = "adm-overflow-hidden";
function T6(e) {
  let t = e == null ? void 0 : e.parentElement;
  for (; t; ) {
    if (t.clientHeight < t.scrollHeight)
      return t;
    t = t.parentElement;
  }
  return null;
}
function za(e, t) {
  const n = F6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = ga(o.target, e.current);
    if (!c)
      return;
    if (t === "strict") {
      const g = T6(o.target);
      if (g === document.body || g === document.documentElement) {
        o.preventDefault();
        return;
      }
    }
    const {
      scrollHeight: u,
      offsetHeight: d,
      scrollTop: f
    } = c, {
      height: m
    } = c.getBoundingClientRect();
    let v = "11";
    f === 0 ? v = d >= u ? "00" : "01" : u <= Math.round(m + f) && (v = "10"), v !== "11" && n.isVertical() && !(parseInt(v, 2) & parseInt(s, 2)) && o.cancelable && Nn && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, Nn ? {
      passive: !1
    } : !1), Rr || document.body.classList.add(su), Rr++;
  }, a = () => {
    Rr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Rr--, Rr || document.body.classList.remove(su));
  };
  G(() => {
    if (t)
      return i(), () => {
        a();
      };
  }, [t]);
}
let bl = ki();
const X = (e) => _i(e, bl);
let wl = ki();
X.write = (e) => _i(e, wl);
let qa = ki();
X.onStart = (e) => _i(e, qa);
let El = ki();
X.onFrame = (e) => _i(e, El);
let Cl = ki();
X.onFinish = (e) => _i(e, Cl);
let nr = [];
X.setTimeout = (e, t) => {
  let n = X.now() + t, r = () => {
    let a = nr.findIndex((o) => o.cancel == r);
    ~a && nr.splice(a, 1), en -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: e,
    cancel: r
  };
  return nr.splice(Md(n), 0, i), en += 1, Id(), i;
};
let Md = (e) => ~(~nr.findIndex((t) => t.time > e) || ~nr.length);
X.cancel = (e) => {
  qa.delete(e), El.delete(e), Cl.delete(e), bl.delete(e), wl.delete(e);
};
X.sync = (e) => {
  ps = !0, X.batchedUpdates(e), ps = !1;
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
    qa.delete(n), t = null;
  }, r;
};
let $l = typeof window < "u" ? window.requestAnimationFrame : () => {
};
X.use = (e) => $l = e;
X.now = typeof performance < "u" ? () => performance.now() : Date.now;
X.batchedUpdates = (e) => e();
X.catch = console.error;
X.frameLoop = "always";
X.advance = () => {
  X.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Dd();
};
let Jt = -1, en = 0, ps = !1;
function _i(e, t) {
  ps ? (t.delete(e), e(0)) : (t.add(e), Id());
}
function Id() {
  Jt < 0 && (Jt = 0, X.frameLoop !== "demand" && $l(Ld));
}
function R6() {
  Jt = -1;
}
function Ld() {
  ~Jt && ($l(Ld), X.batchedUpdates(Dd));
}
function Dd() {
  let e = Jt;
  Jt = X.now();
  let t = Md(Jt);
  if (t && (Vd(nr.splice(0, t), (n) => n.handler()), en -= t), !en) {
    R6();
    return;
  }
  qa.flush(), bl.flush(e ? Math.min(64, Jt - e) : 16.667), El.flush(), wl.flush(), Cl.flush();
}
function ki() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(n) {
      en += t == e && !e.has(n) ? 1 : 0, e.add(n);
    },
    delete(n) {
      return en -= t == e && e.has(n) ? 1 : 0, e.delete(n);
    },
    flush(n) {
      t.size && (e = /* @__PURE__ */ new Set(), en -= t.size, Vd(t, (r) => r(n) && e.add(r)), en += e.size, t = e);
    }
  };
}
function Vd(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      X.catch(r);
    }
  });
}
function gs() {
}
const M6 = (e, t, n) => Object.defineProperty(e, t, {
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
function Lt(e, t) {
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
const Ke = (e) => H.und(e) ? [] : H.arr(e) ? e : [e];
function Jr(e, t) {
  if (e.size) {
    const n = Array.from(e);
    e.clear(), J(n, t);
  }
}
const Yr = (e, ...t) => Jr(e, (n) => n(...t)), xl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let _l, jd, nn = null, Bd = !1, kl = gs;
const I6 = (e) => {
  e.to && (jd = e.to), e.now && (X.now = e.now), e.colors !== void 0 && (nn = e.colors), e.skipAnimation != null && (Bd = e.skipAnimation), e.createStringInterpolator && (_l = e.createStringInterpolator), e.requestAnimationFrame && X.use(e.requestAnimationFrame), e.batchedUpdates && (X.batchedUpdates = e.batchedUpdates), e.willAdvance && (kl = e.willAdvance), e.frameLoop && (X.frameLoop = e.frameLoop);
};
var ot = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return _l;
  },
  get to() {
    return jd;
  },
  get colors() {
    return nn;
  },
  get skipAnimation() {
    return Bd;
  },
  get willAdvance() {
    return kl;
  },
  assign: I6
});
const ei = /* @__PURE__ */ new Set();
let rt = [], Io = [], ya = 0;
const Ka = {
  get idle() {
    return !ei.size && !rt.length;
  },
  start(e) {
    ya > e.priority ? (ei.add(e), X.onStart(L6)) : (Wd(e), X(ys));
  },
  advance: ys,
  sort(e) {
    if (ya)
      X.onFrame(() => Ka.sort(e));
    else {
      const t = rt.indexOf(e);
      ~t && (rt.splice(t, 1), Zd(e));
    }
  },
  clear() {
    rt = [], ei.clear();
  }
};
function L6() {
  ei.forEach(Wd), ei.clear(), X(ys);
}
function Wd(e) {
  rt.includes(e) || Zd(e);
}
function Zd(e) {
  rt.splice(D6(rt, (t) => t.priority > e.priority), 0, e);
}
function ys(e) {
  const t = Io;
  for (let n = 0; n < rt.length; n++) {
    const r = rt[n];
    ya = r.priority, r.idle || (kl(r), r.advance(e), r.idle || t.push(r));
  }
  return ya = 0, Io = rt, Io.length = 0, rt = t, rt.length > 0;
}
function D6(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
const V6 = (e, t, n) => Math.min(Math.max(n, e), t), j6 = {
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
}, ht = "[-+]?\\d*\\.?\\d+", ba = ht + "%";
function Ga(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const B6 = new RegExp("rgb" + Ga(ht, ht, ht)), W6 = new RegExp("rgba" + Ga(ht, ht, ht, ht)), Z6 = new RegExp("hsl" + Ga(ht, ba, ba)), H6 = new RegExp("hsla" + Ga(ht, ba, ba, ht)), U6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, z6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, q6 = /^#([0-9a-fA-F]{6})$/, K6 = /^#([0-9a-fA-F]{8})$/;
function G6(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = q6.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : nn && nn[e] !== void 0 ? nn[e] : (t = B6.exec(e)) ? (Bn(t[1]) << 24 | Bn(t[2]) << 16 | Bn(t[3]) << 8 | 255) >>> 0 : (t = W6.exec(e)) ? (Bn(t[1]) << 24 | Bn(t[2]) << 16 | Bn(t[3]) << 8 | uu(t[4])) >>> 0 : (t = U6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = K6.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = z6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = Z6.exec(e)) ? (lu(cu(t[1]), Zi(t[2]), Zi(t[3])) | 255) >>> 0 : (t = H6.exec(e)) ? (lu(cu(t[1]), Zi(t[2]), Zi(t[3])) | uu(t[4])) >>> 0 : null;
}
function Lo(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function lu(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = Lo(i, r, e + 1 / 3), o = Lo(i, r, e), s = Lo(i, r, e - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(s * 255) << 8;
}
function Bn(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function cu(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function uu(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function Zi(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function fu(e) {
  let t = G6(e);
  if (t === null)
    return e;
  t = t || 0;
  let n = (t & 4278190080) >>> 24, r = (t & 16711680) >>> 16, i = (t & 65280) >>> 8, a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const si = (e, t, n) => {
  if (H.fun(e))
    return e;
  if (H.arr(e))
    return si({
      range: e,
      output: t,
      extrapolate: n
    });
  if (H.str(e.output[0]))
    return _l(e);
  const r = e, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const d = X6(u, a);
    return Y6(u, a[d], a[d + 1], i[d], i[d + 1], c, o, s, r.map);
  };
};
function Y6(e, t, n, r, i, a, o, s, c) {
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
function X6(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
    ;
  return n - 1;
}
const Q6 = (e, t = "end") => (n) => {
  n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * e, i = t === "end" ? Math.floor(r) : Math.ceil(r);
  return V6(0, 1, i / e);
}, wa = 1.70158, Hi = wa * 1.525, du = wa + 1, mu = 2 * Math.PI / 3, hu = 2 * Math.PI / 4.5, Ui = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, J6 = {
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
  easeInBack: (e) => du * e * e * e - wa * e * e,
  easeOutBack: (e) => 1 + du * Math.pow(e - 1, 3) + wa * Math.pow(e - 1, 2),
  easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((Hi + 1) * 2 * e - Hi) / 2 : (Math.pow(2 * e - 2, 2) * ((Hi + 1) * (e * 2 - 2) + Hi) + 2) / 2,
  easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * mu),
  easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * mu) + 1,
  easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * hu)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * hu) / 2 + 1,
  easeInBounce: (e) => 1 - Ui(1 - e),
  easeOutBounce: Ui,
  easeInOutBounce: (e) => e < 0.5 ? (1 - Ui(1 - 2 * e)) / 2 : (1 + Ui(2 * e - 1)) / 2,
  steps: Q6
};
function bs() {
  return bs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, bs.apply(this, arguments);
}
const lr = Symbol.for("FluidValue.get"), An = Symbol.for("FluidValue.observers"), tt = (e) => Boolean(e && e[lr]), Be = (e) => e && e[lr] ? e[lr]() : e, vu = (e) => e[An] || null;
function e7(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function li(e, t) {
  let n = e[An];
  n && n.forEach((r) => {
    e7(r, t);
  });
}
class Hd {
  constructor(t) {
    if (this[lr] = void 0, this[An] = void 0, !t && !(t = this.get))
      throw Error("Unknown getter");
    t7(this, t);
  }
}
const t7 = (e, t) => Ud(e, lr, t);
function $r(e, t) {
  if (e[lr]) {
    let n = e[An];
    n || Ud(e, An, n = /* @__PURE__ */ new Set()), n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
  }
  return t;
}
function ci(e, t) {
  let n = e[An];
  if (n && n.has(t)) {
    const r = n.size - 1;
    r ? n.delete(t) : e[An] = null, e.observerRemoved && e.observerRemoved(r, t);
  }
}
const Ud = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), oa = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, n7 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, pu = new RegExp(`(${oa.source})(%|[a-z]+)`, "i"), r7 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ya = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, zd = (e) => {
  const [t, n] = i7(e);
  if (!t || xl())
    return e;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || e;
  } else {
    if (n && Ya.test(n))
      return zd(n);
    if (n)
      return n;
  }
  return e;
}, i7 = (e) => {
  const t = Ya.exec(e);
  if (!t)
    return [,];
  const [, n, r] = t;
  return [n, r];
};
let Do;
const a7 = (e, t, n, r, i) => `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, qd = (e) => {
  Do || (Do = nn ? new RegExp(`(${Object.keys(nn).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((a) => Be(a).replace(Ya, zd).replace(n7, fu).replace(Do, fu)), n = t.map((a) => a.match(oa).map(Number)), i = n[0].map((a, o) => n.map((s) => {
    if (!(o in s))
      throw Error('The arity of each "output" value must be equal');
    return s[o];
  })).map((a) => si(bs({}, e, {
    output: a
  })));
  return (a) => {
    var o;
    const s = !pu.test(t[0]) && ((o = t.find((u) => pu.test(u))) == null ? void 0 : o.replace(oa, ""));
    let c = 0;
    return t[0].replace(oa, () => `${i[c++](a)}${s || ""}`).replace(r7, a7);
  };
}, Sl = "react-spring: ", Kd = (e) => {
  const t = e;
  let n = !1;
  if (typeof t != "function")
    throw new TypeError(`${Sl}once requires a function parameter`);
  return (...r) => {
    n || (t(...r), n = !0);
  };
}, o7 = Kd(console.warn);
function s7() {
  o7(`${Sl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const l7 = Kd(console.warn);
function c7() {
  l7(`${Sl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function Xa(e) {
  return H.str(e) && (e[0] == "#" || /\d/.test(e) || !xl() && Ya.test(e) || e in (nn || {}));
}
const Ol = xl() ? G : al, u7 = () => {
  const e = D(!1);
  return Ol(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function Gd() {
  const e = q()[1], t = u7();
  return () => {
    t.current && e(Math.random());
  };
}
function f7(e, t) {
  const [n] = q(() => ({
    inputs: t,
    result: e()
  })), r = D(), i = r.current;
  let a = i;
  return a ? Boolean(t && a.inputs && d7(t, a.inputs)) || (a = {
    inputs: t,
    result: e()
  }) : a = n, G(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function d7(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Yd = (e) => G(e, m7), m7 = [];
function gu(e) {
  const t = D();
  return G(() => {
    t.current = e;
  }), t.current;
}
const ui = Symbol.for("Animated:node"), h7 = (e) => !!e && e[ui] === e, xt = (e) => e && e[ui], Fl = (e, t) => M6(e, ui, t), Qa = (e) => e && e[ui] && e[ui].getPayload();
class Xd {
  constructor() {
    this.payload = void 0, Fl(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class xr extends Xd {
  constructor(t) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = t, H.num(this._value) && (this.lastPosition = this._value);
  }
  static create(t) {
    return new xr(t);
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
class cr extends xr {
  constructor(t) {
    super(0), this._string = null, this._toString = void 0, this._toString = si({
      output: [t, t]
    });
  }
  static create(t) {
    return new cr(t);
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
    t && (this._toString = si({
      output: [this.getValue(), t]
    })), this._value = 0, super.reset();
  }
}
const Ea = {
  dependencies: null
};
class Ja extends Xd {
  constructor(t) {
    super(), this.source = t, this.setValue(t);
  }
  getValue(t) {
    const n = {};
    return Ot(this.source, (r, i) => {
      h7(r) ? n[i] = r.getValue(t) : tt(r) ? n[i] = Be(r) : t || (n[i] = r);
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
    Ea.dependencies && tt(t) && Ea.dependencies.add(t);
    const n = Qa(t);
    n && J(n, (r) => this.add(r));
  }
}
class Pl extends Ja {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new Pl(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const n = this.getPayload();
    return t.length == n.length ? n.map((r, i) => r.setValue(t[i])).some(Boolean) : (super.setValue(t.map(v7)), !0);
  }
}
function v7(e) {
  return (Xa(e) ? cr : xr).create(e);
}
function ws(e) {
  const t = xt(e);
  return t ? t.constructor : H.arr(e) ? Pl : Xa(e) ? cr : xr;
}
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ca.apply(this, arguments);
}
const yu = (e, t) => {
  const n = !H.fun(e) || e.prototype && e.prototype.isReactComponent;
  return me((r, i) => {
    const a = D(null), o = n && Ze((g) => {
      a.current = y7(i, g);
    }, [i]), [s, c] = g7(r, t), u = Gd(), d = () => {
      const g = a.current;
      if (n && !g)
        return;
      (g ? t.applyAnimatedValues(g, s.getValue(!0)) : !1) === !1 && u();
    }, f = new p7(d, c), m = D();
    Ol(() => (m.current = f, J(c, (g) => $r(g, f)), () => {
      m.current && (J(m.current.deps, (g) => ci(g, m.current)), X.cancel(m.current.update));
    })), G(d, []), Yd(() => () => {
      const g = m.current;
      J(g.deps, (h) => ci(h, g));
    });
    const v = t.getComponentProps(s.getValue());
    return L.createElement(e, Ca({}, v, {
      ref: o
    }));
  });
};
class p7 {
  constructor(t, n) {
    this.update = t, this.deps = n;
  }
  eventObserved(t) {
    t.type == "change" && X.write(this.update);
  }
}
function g7(e, t) {
  const n = /* @__PURE__ */ new Set();
  return Ea.dependencies = n, e.style && (e = Ca({}, e, {
    style: t.createAnimatedStyle(e.style)
  })), e = new Ja(e), Ea.dependencies = null, [e, n];
}
function y7(e, t) {
  return e && (H.fun(e) ? e(t) : e.current = t), t;
}
const bu = Symbol.for("AnimatedComponent"), b7 = (e, {
  applyAnimatedValues: t = () => !1,
  createAnimatedStyle: n = (i) => new Ja(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: t,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const s = wu(o) || "Anonymous";
    return H.str(o) ? o = a[o] || (a[o] = yu(o, i)) : o = o[bu] || (o[bu] = yu(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return Ot(e, (o, s) => {
    H.arr(e) && (s = wu(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, wu = (e) => H.str(e) ? e : e && H.str(e.displayName) ? e.displayName : H.fun(e) && e.name || null;
function Fe() {
  return Fe = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fe.apply(this, arguments);
}
function _n(e, ...t) {
  return H.fun(e) ? e(...t) : e;
}
const ti = (e, t) => e === !0 || !!(t && e && (H.fun(e) ? e(t) : Ke(e).includes(t))), Qd = (e, t) => H.obj(e) ? t && e[t] : e, Jd = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, w7 = (e) => e, Nl = (e, t = w7) => {
  let n = E7;
  e.default && e.default !== !0 && (e = e.default, n = Object.keys(e));
  const r = {};
  for (const i of n) {
    const a = t(e[i], i);
    H.und(a) || (r[i] = a);
  }
  return r;
}, E7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], C7 = {
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
function $7(e) {
  const t = {};
  let n = 0;
  if (Ot(e, (r, i) => {
    C7[i] || (t[i] = r, n++);
  }), n)
    return t;
}
function e1(e) {
  const t = $7(e);
  if (t) {
    const n = {
      to: t
    };
    return Ot(e, (r, i) => i in t || (n[i] = r)), n;
  }
  return Fe({}, e);
}
function fi(e) {
  return e = Be(e), H.arr(e) ? e.map(fi) : Xa(e) ? ot.createStringInterpolator({
    range: [0, 1],
    output: [e, e]
  })(1) : e;
}
function x7(e) {
  for (const t in e)
    return !0;
  return !1;
}
function Es(e) {
  return H.fun(e) || H.arr(e) && H.obj(e[0]);
}
function _7(e, t) {
  var n;
  (n = e.ref) == null || n.delete(e), t == null || t.delete(e);
}
function k7(e, t) {
  if (t && e.ref !== t) {
    var n;
    (n = e.ref) == null || n.delete(e), t.add(e), e.ref = t;
  }
}
const S7 = {
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
}, Cs = Fe({}, S7.default, {
  mass: 1,
  damping: 1,
  easing: J6.linear,
  clamp: !1
});
class O7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, Cs);
  }
}
function F7(e, t, n) {
  n && (n = Fe({}, n), Eu(n, t), t = Fe({}, n, t)), Eu(e, t), Object.assign(e, t);
  for (const o in Cs)
    e[o] == null && (e[o] = Cs[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = e;
  return H.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), e.tension = Math.pow(2 * Math.PI / i, 2) * r, e.friction = 4 * Math.PI * a * r / i), e;
}
function Eu(e, t) {
  if (!H.und(t.decay))
    e.duration = void 0;
  else {
    const n = !H.und(t.tension) || !H.und(t.friction);
    (n || !H.und(t.frequency) || !H.und(t.damping) || !H.und(t.mass)) && (e.duration = void 0, e.decay = void 0), n && (e.frequency = void 0);
  }
}
const Cu = [];
class P7 {
  constructor() {
    this.changed = !1, this.values = Cu, this.toValues = null, this.fromValues = Cu, this.to = void 0, this.from = void 0, this.config = new O7(), this.immediate = !1;
  }
}
function t1(e, {
  key: t,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, s) => {
    var c;
    let u, d, f = ti((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, t);
    if (f)
      g();
    else {
      H.und(n.pause) || (i.paused = ti(n.pause, t));
      let h = r == null ? void 0 : r.pause;
      h !== !0 && (h = i.paused || ti(h, t)), u = _n(n.delay || 0, t), h ? (i.resumeQueue.add(v), a.pause()) : (a.resume(), v());
    }
    function m() {
      i.resumeQueue.add(v), i.timeouts.delete(d), d.cancel(), u = d.time - X.now();
    }
    function v() {
      u > 0 && !ot.skipAnimation ? (i.delayed = !0, d = X.setTimeout(g, u), i.pauseQueue.add(m), i.timeouts.add(d)) : g();
    }
    function g() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(d), e <= (i.cancelId || 0) && (f = !0);
      try {
        a.start(Fe({}, n, {
          callId: e,
          cancel: f
        }), o);
      } catch (h) {
        s(h);
      }
    }
  });
}
const Al = (e, t) => t.length == 1 ? t[0] : t.some((n) => n.cancelled) ? rr(e.get()) : t.every((n) => n.noop) ? n1(e.get()) : mt(e.get(), t.every((n) => n.finished)), n1 = (e) => ({
  value: e,
  noop: !0,
  finished: !0,
  cancelled: !1
}), mt = (e, t, n = !1) => ({
  value: e,
  finished: t,
  cancelled: n
}), rr = (e) => ({
  value: e,
  cancelled: !0,
  finished: !1
});
function r1(e, t, n, r) {
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
    const u = Nl(t, (b, w) => w === "onRest" ? void 0 : b);
    let d, f;
    const m = new Promise((b, w) => (d = b, f = w)), v = (b) => {
      const w = i <= (n.cancelId || 0) && rr(r) || i !== n.asyncId && mt(r, !1);
      if (w)
        throw b.result = w, f(b), b;
    }, g = (b, w) => {
      const $ = new $u(), y = new xu();
      return (async () => {
        if (ot.skipAnimation)
          throw di(n), y.result = mt(r, !1), f(y), y;
        v($);
        const p = H.obj(b) ? Fe({}, b) : Fe({}, w, {
          to: b
        });
        p.parentId = i, Ot(u, (C, k) => {
          H.und(p[k]) && (p[k] = C);
        });
        const E = await r.start(p);
        return v($), n.paused && await new Promise((C) => {
          n.resumeQueue.add(C);
        }), E;
      })();
    };
    let h;
    if (ot.skipAnimation)
      return di(n), mt(r, !1);
    try {
      let b;
      H.arr(e) ? b = (async (w) => {
        for (const $ of w)
          await g($);
      })(e) : b = Promise.resolve(e(g, r.stop.bind(r))), await Promise.all([b.then(d), m]), h = mt(r.get(), !0, !1);
    } catch (b) {
      if (b instanceof $u)
        h = b.result;
      else if (b instanceof xu)
        h = b.result;
      else
        throw b;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? s : void 0, n.promise = a ? c : void 0);
    }
    return H.fun(o) && X.batchedUpdates(() => {
      o(h, r, r.item);
    }), h;
  })();
}
function di(e, t) {
  Jr(e.timeouts, (n) => n.cancel()), e.pauseQueue.clear(), e.resumeQueue.clear(), e.asyncId = e.asyncTo = e.promise = void 0, t && (e.cancelId = t);
}
class $u extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class xu extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const $s = (e) => e instanceof Tl;
let N7 = 1;
class Tl extends Hd {
  constructor(...t) {
    super(...t), this.id = N7++, this.key = void 0, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(t) {
    this._priority != t && (this._priority = t, this._onPriorityChange(t));
  }
  get() {
    const t = xt(this);
    return t && t.getValue();
  }
  to(...t) {
    return ot.to(this, t);
  }
  interpolate(...t) {
    return s7(), ot.to(this, t);
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
    li(this, {
      type: "change",
      parent: this,
      value: t,
      idle: n
    });
  }
  _onPriorityChange(t) {
    this.idle || Ka.sort(this), li(this, {
      type: "priority",
      parent: this,
      priority: t
    });
  }
}
const Tn = Symbol.for("SpringPhase"), i1 = 1, xs = 2, _s = 4, Vo = (e) => (e[Tn] & i1) > 0, Ut = (e) => (e[Tn] & xs) > 0, Mr = (e) => (e[Tn] & _s) > 0, _u = (e, t) => t ? e[Tn] |= xs | i1 : e[Tn] &= ~xs, ku = (e, t) => t ? e[Tn] |= _s : e[Tn] &= ~_s;
class A7 extends Tl {
  constructor(t, n) {
    if (super(), this.key = void 0, this.animation = new P7(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !H.und(t) || !H.und(n)) {
      const r = H.obj(t) ? Fe({}, t) : Fe({}, n, {
        from: t
      });
      H.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Ut(this) || this._state.asyncTo) || Mr(this);
  }
  get goal() {
    return Be(this.animation.to);
  }
  get velocity() {
    const t = xt(this);
    return t instanceof xr ? t.lastVelocity || 0 : t.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Vo(this);
  }
  get isAnimating() {
    return Ut(this);
  }
  get isPaused() {
    return Mr(this);
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
    const s = Qa(i.to);
    !s && tt(i.to) && (o = Ke(Be(i.to))), i.values.forEach((d, f) => {
      if (d.done)
        return;
      const m = d.constructor == cr ? 1 : s ? s[f].lastPosition : o[f];
      let v = i.immediate, g = m;
      if (!v) {
        if (g = d.lastPosition, a.tension <= 0) {
          d.done = !0;
          return;
        }
        let h = d.elapsedTime += t;
        const b = i.fromValues[f], w = d.v0 != null ? d.v0 : d.v0 = H.arr(a.velocity) ? a.velocity[f] : a.velocity;
        let $;
        const y = a.precision || (b == m ? 5e-3 : Math.min(1, Math.abs(m - b) * 1e-3));
        if (H.und(a.duration))
          if (a.decay) {
            const p = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - p) * h);
            g = b + w / (1 - p) * (1 - E), v = Math.abs(d.lastPosition - g) <= y, $ = w * E;
          } else {
            $ = d.lastVelocity == null ? w : d.lastVelocity;
            const p = a.restVelocity || y / 10, E = a.clamp ? 0 : a.bounce, C = !H.und(E), k = b == m ? d.v0 > 0 : b < m;
            let N, P = !1;
            const F = 1, T = Math.ceil(t / F);
            for (let O = 0; O < T && (N = Math.abs($) > p, !(!N && (v = Math.abs(m - g) <= y, v))); ++O) {
              C && (P = g == m || g > m == k, P && ($ = -$ * E, g = m));
              const _ = -a.tension * 1e-6 * (g - m), x = -a.friction * 1e-3 * $, S = (_ + x) / a.mass;
              $ = $ + S * F, g = g + $ * F;
            }
          }
        else {
          let p = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, d.durationProgress > 0 && (d.elapsedTime = a.duration * d.durationProgress, h = d.elapsedTime += t)), p = (a.progress || 0) + h / this._memoizedDuration, p = p > 1 ? 1 : p < 0 ? 0 : p, d.durationProgress = p), g = b + a.easing(p) * (m - b), $ = (g - d.lastPosition) / t, v = p == 1;
        }
        d.lastVelocity = $, Number.isNaN(g) && (console.warn("Got NaN while animating:", this), v = !0);
      }
      s && !s[f].done && (v = !1), v ? d.done = !0 : n = !1, d.setValue(g, a.round) && (r = !0);
    });
    const c = xt(this), u = c.getValue();
    if (n) {
      const d = Be(i.to);
      (u !== d || r) && !a.decay ? (c.setValue(d), this._onChange(d)) : r && a.decay && this._onChange(u), this._stop();
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
    if (Ut(this)) {
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
    return H.und(t) ? (r = this.queue || [], this.queue = []) : r = [H.obj(t) ? t : Fe({}, n, {
      to: t
    })], Promise.all(r.map((i) => this._update(i))).then((i) => Al(this, i));
  }
  stop(t) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), di(this._state, t && this._lastCallId), X.batchedUpdates(() => this._stop(n, t)), this;
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
    r = H.obj(r) ? r[n] : r, (r == null || Es(r)) && (r = void 0), i = H.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Vo(this) || (t.reverse && ([r, i] = [i, r]), i = Be(i), H.und(i) ? xt(this) || this._set(r) : this._set(i)), a;
  }
  _update(t, n) {
    let r = Fe({}, t);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, Nl(r, (c, u) => /^on/.test(u) ? Qd(c, i) : c)), Ou(this, r, "onProps"), Lr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return t1(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Mr(this) || (ku(this, !0), Yr(s.pauseQueue), Lr(this, "onPause", mt(this, Ir(this, this.animation.to)), this));
        },
        resume: () => {
          Mr(this) && (ku(this, !1), Ut(this) && this._resume(), Yr(s.resumeQueue), Lr(this, "onResume", mt(this, Ir(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = a1(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(t, n, r) {
    if (n.cancel)
      return this.stop(!0), r(rr(this));
    const i = !H.und(t.to), a = !H.und(t.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(rr(this));
    const {
      key: o,
      defaultProps: s,
      animation: c
    } = this, {
      to: u,
      from: d
    } = c;
    let {
      to: f = u,
      from: m = d
    } = t;
    a && !i && (!n.default || H.und(f)) && (f = m), n.reverse && ([f, m] = [m, f]);
    const v = !Lt(m, d);
    v && (c.from = m), m = Be(m);
    const g = !Lt(f, u);
    g && this._focus(f);
    const h = Es(n.to), {
      config: b
    } = c, {
      decay: w,
      velocity: $
    } = b;
    (i || a) && (b.velocity = 0), n.config && !h && F7(b, _n(n.config, o), n.config !== s.config ? _n(s.config, o) : void 0);
    let y = xt(this);
    if (!y || H.und(f))
      return r(mt(this, !0));
    const p = H.und(n.reset) ? a && !n.default : !H.und(m) && ti(n.reset, o), E = p ? m : this.get(), C = fi(f), k = H.num(C) || H.arr(C) || Xa(C), N = !h && (!k || ti(s.immediate || n.immediate, o));
    if (g) {
      const O = ws(f);
      if (O !== y.constructor)
        if (N)
          y = this._set(C);
        else
          throw Error(`Cannot animate between ${y.constructor.name} and ${O.name}, as the "to" prop suggests`);
    }
    const P = y.constructor;
    let F = tt(f), T = !1;
    if (!F) {
      const O = p || !Vo(this) && v;
      (g || O) && (T = Lt(fi(E), C), F = !T), (!Lt(c.immediate, N) && !N || !Lt(b.decay, w) || !Lt(b.velocity, $)) && (F = !0);
    }
    if (T && Ut(this) && (c.changed && !p ? F = !0 : F || this._stop(u)), !h && ((F || tt(u)) && (c.values = y.getPayload(), c.toValues = tt(f) ? null : P == cr ? [1] : Ke(C)), c.immediate != N && (c.immediate = N, !N && !p && this._set(u)), F)) {
      const {
        onRest: O
      } = c;
      J(R7, (x) => Ou(this, n, x));
      const _ = mt(this, Ir(this, u));
      Yr(this._pendingCalls, _), this._pendingCalls.add(r), c.changed && X.batchedUpdates(() => {
        c.changed = !p, O == null || O(_, this), p ? _n(s.onRest, _) : c.onStart == null || c.onStart(_, this);
      });
    }
    p && this._set(E), h ? r(r1(n.to, n, this._state, this)) : F ? this._start() : Ut(this) && !g ? this._pendingCalls.add(r) : r(n1(E));
  }
  _focus(t) {
    const n = this.animation;
    t !== n.to && (vu(this) && this._detach(), n.to = t, vu(this) && this._attach());
  }
  _attach() {
    let t = 0;
    const {
      to: n
    } = this.animation;
    tt(n) && ($r(n, this), $s(n) && (t = n.priority + 1)), this.priority = t;
  }
  _detach() {
    const {
      to: t
    } = this.animation;
    tt(t) && ci(t, this);
  }
  _set(t, n = !0) {
    const r = Be(t);
    if (!H.und(r)) {
      const i = xt(this);
      if (!i || !Lt(r, i.getValue())) {
        const a = ws(r);
        !i || i.constructor != a ? Fl(this, a.create(r)) : i.setValue(r), i && X.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return xt(this);
  }
  _onStart() {
    const t = this.animation;
    t.changed || (t.changed = !0, Lr(this, "onStart", mt(this, Ir(this, t.to)), this));
  }
  _onChange(t, n) {
    n || (this._onStart(), _n(this.animation.onChange, t, this)), _n(this.defaultProps.onChange, t, this), super._onChange(t, n);
  }
  _start() {
    const t = this.animation;
    xt(this).reset(Be(t.to)), t.immediate || (t.fromValues = t.values.map((n) => n.lastPosition)), Ut(this) || (_u(this, !0), Mr(this) || this._resume());
  }
  _resume() {
    ot.skipAnimation ? this.finish() : Ka.start(this);
  }
  _stop(t, n) {
    if (Ut(this)) {
      _u(this, !1);
      const r = this.animation;
      J(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), li(this, {
        type: "idle",
        parent: this
      });
      const i = n ? rr(this.get()) : mt(this.get(), Ir(this, t != null ? t : r.to));
      Yr(this._pendingCalls, i), r.changed && (r.changed = !1, Lr(this, "onRest", i, this));
    }
  }
}
function Ir(e, t) {
  const n = fi(t), r = fi(e.get());
  return Lt(r, n);
}
function a1(e, t = e.loop, n = e.to) {
  let r = _n(t);
  if (r) {
    const i = r !== !0 && e1(r), a = (i || e).reverse, o = !i || i.reset;
    return mi(Fe({}, e, {
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || Es(n) ? n : void 0,
      from: o ? e.from : void 0,
      reset: o
    }, i));
  }
}
function mi(e) {
  const {
    to: t,
    from: n
  } = e = e1(e), r = /* @__PURE__ */ new Set();
  return H.obj(t) && Su(t, r), H.obj(n) && Su(n, r), e.keys = r.size ? Array.from(r) : null, e;
}
function T7(e) {
  const t = mi(e);
  return H.und(t.default) && (t.default = Nl(t)), t;
}
function Su(e, t) {
  Ot(e, (n, r) => n != null && t.add(r));
}
const R7 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Ou(e, t, n) {
  e.animation[n] = t[n] !== Jd(t, n) ? Qd(t[n], e.key) : void 0;
}
function Lr(e, t, ...n) {
  var r, i, a, o;
  (r = (i = e.animation)[t]) == null || r.call(i, ...n), (a = (o = e.defaultProps)[t]) == null || a.call(o, ...n);
}
const M7 = ["onStart", "onChange", "onRest"];
let I7 = 1;
class L7 {
  constructor(t, n) {
    this.id = I7++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), n && (this._flush = n), t && this.start(Fe({
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
    return t && this.queue.push(mi(t)), this;
  }
  start(t) {
    let {
      queue: n
    } = this;
    return t ? n = Ke(t).map(mi) : this.queue = [], this._flush ? this._flush(this, n) : (u1(this, n), ks(this, n));
  }
  stop(t, n) {
    if (t !== !!t && (n = t), n) {
      const r = this.springs;
      J(Ke(n), (i) => r[i].stop(!!t));
    } else
      di(this._state, this._lastAsyncId), this.each((r) => r.stop(!!t));
    return this;
  }
  pause(t) {
    if (H.und(t))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      J(Ke(t), (r) => n[r].pause());
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
      J(Ke(t), (r) => n[r].resume());
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
    (i && !this._started || a && !this._started) && (this._started = !0, Jr(t, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, s = a || o && r.size ? this.get() : null;
    a && n.size && Jr(n, ([c, u]) => {
      u.value = s, c(u, this, this._item);
    }), o && (this._started = !1, Jr(r, ([c, u]) => {
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
function ks(e, t) {
  return Promise.all(t.map((n) => o1(e, n))).then((n) => Al(e, n));
}
async function o1(e, t, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = t, u = H.obj(t.default) && t.default;
  o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null);
  const d = H.arr(i) || H.fun(i) ? i : void 0;
  d ? (t.to = void 0, t.onRest = void 0, u && (u.onRest = void 0)) : J(M7, (h) => {
    const b = t[h];
    if (H.fun(b)) {
      const w = e._events[h];
      t[h] = ({
        finished: $,
        cancelled: y
      }) => {
        const p = w.get(b);
        p ? ($ || (p.finished = !1), y && (p.cancelled = !0)) : w.set(b, {
          value: null,
          finished: $ || !1,
          cancelled: y || !1
        });
      }, u && (u[h] = t[h]);
    }
  });
  const f = e._state;
  t.pause === !f.paused ? (f.paused = t.pause, Yr(t.pause ? f.pauseQueue : f.resumeQueue)) : f.paused && (t.pause = !0);
  const m = (r || Object.keys(e.springs)).map((h) => e.springs[h].start(t)), v = t.cancel === !0 || Jd(t, "cancel") === !0;
  (d || v && f.asyncId) && m.push(t1(++e._lastAsyncId, {
    props: t,
    state: f,
    actions: {
      pause: gs,
      resume: gs,
      start(h, b) {
        v ? (di(f, e._lastAsyncId), b(rr(e))) : (h.onRest = s, b(r1(d, h, f, e)));
      }
    }
  })), f.paused && await new Promise((h) => {
    f.resumeQueue.add(h);
  });
  const g = Al(e, await Promise.all(m));
  if (o && g.finished && !(n && g.noop)) {
    const h = a1(t, o, i);
    if (h)
      return u1(e, [h]), o1(e, h, !0);
  }
  return c && X.batchedUpdates(() => c(g, e, e.item)), g;
}
function Fu(e, t) {
  const n = Fe({}, e.springs);
  return t && J(Ke(t), (r) => {
    H.und(r.keys) && (r = mi(r)), H.obj(r.to) || (r = Fe({}, r, {
      to: void 0
    })), c1(n, r, (i) => l1(i));
  }), s1(e, n), n;
}
function s1(e, t) {
  Ot(t, (n, r) => {
    e.springs[r] || (e.springs[r] = n, $r(n, e));
  });
}
function l1(e, t) {
  const n = new A7();
  return n.key = e, t && $r(n, t), n;
}
function c1(e, t, n) {
  t.keys && J(t.keys, (r) => {
    (e[r] || (e[r] = n(r)))._prepareNode(t);
  });
}
function u1(e, t) {
  J(t, (n) => {
    c1(e.springs, n, (r) => l1(r, e));
  });
}
function D7(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const V7 = ["children"], eo = (e) => {
  let {
    children: t
  } = e, n = D7(e, V7);
  const r = it($a), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = f7(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = $a;
  return L.createElement(o, {
    value: n
  }, t);
}, $a = j7(eo, {});
eo.Provider = $a.Provider;
eo.Consumer = $a.Consumer;
function j7(e, t) {
  return Object.assign(e, L.createContext(t)), e.Provider._context = e, e.Consumer._context = e, e;
}
const B7 = () => {
  const e = [], t = function(i) {
    c7();
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
function W7(e, t, n) {
  const r = H.fun(t) && t;
  r && !n && (n = []);
  const i = re(() => r || arguments.length == 3 ? B7() : void 0, []), a = D(0), o = Gd(), s = re(() => ({
    ctrls: [],
    queue: [],
    flush(w, $) {
      const y = Fu(w, $);
      return a.current > 0 && !s.queue.length && !Object.keys(y).some((E) => !w.springs[E]) ? ks(w, $) : new Promise((E) => {
        s1(w, y), s.queue.push(() => {
          E(ks(w, $));
        }), o();
      });
    }
  }), []), c = D([...s.ctrls]), u = [], d = gu(e) || 0;
  re(() => {
    J(c.current.slice(e, d), (w) => {
      _7(w, i), w.stop(!0);
    }), c.current.length = e, f(d, e);
  }, [e]), re(() => {
    f(0, Math.min(d, e));
  }, n);
  function f(w, $) {
    for (let y = w; y < $; y++) {
      const p = c.current[y] || (c.current[y] = new L7(null, s.flush)), E = r ? r(y, p) : t[y];
      E && (u[y] = T7(E));
    }
  }
  const m = c.current.map((w, $) => Fu(w, u[$])), v = it(eo), g = gu(v), h = v !== g && x7(v);
  Ol(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: w
    } = s;
    w.length && (s.queue = [], J(w, ($) => $())), J(c.current, ($, y) => {
      i == null || i.add($), h && $.start({
        default: v
      });
      const p = u[y];
      p && (k7($, p.ref), $.ref ? $.queue.push(p) : $.start(p));
    });
  }), Yd(() => () => {
    J(s.ctrls, (w) => w.stop(!0));
  });
  const b = m.map((w) => Fe({}, w));
  return i ? [b, i] : b;
}
function Pe(e, t) {
  const n = H.fun(e), [[r], i] = W7(1, n ? e : [e], n ? t || [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
let Pu;
(function(e) {
  e.MOUNT = "mount", e.ENTER = "enter", e.UPDATE = "update", e.LEAVE = "leave";
})(Pu || (Pu = {}));
class f1 extends Tl {
  constructor(t, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = t, this.calc = si(...n);
    const r = this._get(), i = ws(r);
    Fl(this, i.create(r));
  }
  advance(t) {
    const n = this._get(), r = this.get();
    Lt(n, r) || (xt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && Nu(this._active) && jo(this);
  }
  _get() {
    const t = H.arr(this.source) ? this.source.map(Be) : Ke(Be(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle && !Nu(this._active) && (this.idle = !1, J(Qa(this), (t) => {
      t.done = !1;
    }), ot.skipAnimation ? (X.batchedUpdates(() => this.advance()), jo(this)) : Ka.start(this));
  }
  _attach() {
    let t = 1;
    J(Ke(this.source), (n) => {
      tt(n) && $r(n, this), $s(n) && (n.idle || this._active.add(n), t = Math.max(t, n.priority + 1));
    }), this.priority = t, this._start();
  }
  _detach() {
    J(Ke(this.source), (t) => {
      tt(t) && ci(t, this);
    }), this._active.clear(), jo(this);
  }
  eventObserved(t) {
    t.type == "change" ? t.idle ? this.advance() : (this._active.add(t.parent), this._start()) : t.type == "idle" ? this._active.delete(t.parent) : t.type == "priority" && (this.priority = Ke(this.source).reduce((n, r) => Math.max(n, ($s(r) ? r.priority : 0) + 1), 0));
  }
}
function Z7(e) {
  return e.idle !== !1;
}
function Nu(e) {
  return !e.size || Array.from(e).every(Z7);
}
function jo(e) {
  e.idle || (e.idle = !0, J(Qa(e), (t) => {
    t.done = !0;
  }), li(e, {
    type: "idle",
    parent: e
  }));
}
const H7 = (e, ...t) => new f1(e, t);
ot.assign({
  createStringInterpolator: qd,
  to: (e, t) => new f1(e, t)
});
function Rl(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const U7 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], d1 = /^--/;
function z7(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !d1.test(e) && !(ni.hasOwnProperty(e) && ni[e]) ? t + "px" : ("" + t).trim();
}
const Au = {};
function q7(e, t) {
  if (!e.nodeType || !e.setAttribute)
    return !1;
  const n = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", r = t, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = Rl(r, U7), d = Object.values(u), f = Object.keys(u).map((m) => n || e.hasAttribute(m) ? m : Au[m] || (Au[m] = m.replace(/([A-Z])/g, (v) => "-" + v.toLowerCase())));
  a !== void 0 && (e.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const v = z7(m, i[m]);
      d1.test(m) ? e.style.setProperty(m, v) : e.style[m] = v;
    }
  f.forEach((m, v) => {
    e.setAttribute(m, d[v]);
  }), o !== void 0 && (e.scrollTop = o), s !== void 0 && (e.scrollLeft = s), c !== void 0 && e.setAttribute("viewBox", c);
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
const K7 = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), G7 = ["Webkit", "Ms", "Moz", "O"];
ni = Object.keys(ni).reduce((e, t) => (G7.forEach((n) => e[K7(n, t)] = e[t]), e), ni);
const Y7 = ["x", "y", "z"], X7 = /^(matrix|translate|scale|rotate|skew)/, Q7 = /^(translate)/, J7 = /^(rotate|skew)/, Bo = (e, t) => H.num(e) && e !== 0 ? e + t : e, sa = (e, t) => H.arr(e) ? e.every((n) => sa(n, t)) : H.num(e) ? e === t : parseFloat(e) === t;
class ey extends Ja {
  constructor(t) {
    let {
      x: n,
      y: r,
      z: i
    } = t, a = Rl(t, Y7);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => Bo(u, "px")).join(",")})`, sa(c, 0)])), Ot(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((d) => [d, d === ""]);
      else if (X7.test(u)) {
        if (delete a[u], H.und(c))
          return;
        const d = Q7.test(u) ? "px" : J7.test(u) ? "deg" : "";
        o.push(Ke(c)), s.push(u === "rotate3d" ? ([f, m, v, g]) => [`rotate3d(${f},${m},${v},${Bo(g, d)})`, sa(g, 0)] : (f) => [`${u}(${f.map((m) => Bo(m, d)).join(",")})`, sa(f, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new ty(o, s)), super(a);
  }
}
class ty extends Hd {
  constructor(t, n) {
    super(), this._value = null, this.inputs = t, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", n = !0;
    return J(this.inputs, (r, i) => {
      const a = Be(r[0]), [o, s] = this.transforms[i](H.arr(a) ? a : r.map(Be));
      t += " " + o, n = n && s;
    }), n ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && J(this.inputs, (n) => J(n, (r) => tt(r) && $r(r, this)));
  }
  observerRemoved(t) {
    t == 0 && J(this.inputs, (n) => J(n, (r) => tt(r) && ci(r, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), li(this, t);
  }
}
const ny = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], ry = ["scrollTop", "scrollLeft"];
ot.assign({
  batchedUpdates: Tm,
  createStringInterpolator: qd,
  colors: j6
});
const iy = b7(ny, {
  applyAnimatedValues: q7,
  createAnimatedStyle: (e) => new ey(e),
  getComponentProps: (e) => Rl(e, ry)
}), fe = iy.animated;
function ay(e) {
  return (typeof e == "function" ? e() : e) || document.body;
}
function _r(e, t) {
  if (vr && e) {
    const n = ay(e);
    return Rm(t, n);
  }
  return t;
}
function oy(e) {
  const t = D(e);
  return e && (t.current = !0), !!t.current;
}
const kr = (e) => to(e.active, e.forceRender, e.destroyOnClose) ? e.children : null;
function to(e, t, n) {
  const r = oy(e);
  return t || e ? !0 : r ? !n : !1;
}
const sy = {
  click: "onClick"
};
function an(e, t) {
  const n = Object.assign({}, t.props);
  for (const r of e) {
    const i = sy[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = t.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(t, n);
}
const Wo = "adm-mask", ly = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, cy = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, uy = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, fy = (e) => {
  const t = U(uy, e), {
    locale: n
  } = pe(), r = D(null);
  za(r, t.visible && t.disableBodyScroll);
  const i = re(() => {
    var d;
    const f = (d = ly[t.opacity]) !== null && d !== void 0 ? d : t.opacity, m = cy[t.color];
    return m ? `rgba(${m}, ${f})` : t.color;
  }, [t.color, t.opacity]), [a, o] = q(t.visible), s = yl(), {
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
      var d, f;
      s.current || (o(t.visible), t.visible ? (d = t.afterShow) === null || d === void 0 || d.call(t) : (f = t.afterClose) === null || f === void 0 || f.call(t));
    }
  }), u = an(t.stopPropagation, B(t, l.createElement(fe.div, {
    className: Wo,
    ref: r,
    style: Object.assign(Object.assign({}, t.style), {
      background: i,
      opacity: c,
      display: a ? void 0 : "none"
    }),
    onClick: (d) => {
      var f;
      d.target === d.currentTarget && ((f = t.onMaskClick) === null || f === void 0 || f.call(t, d));
    }
  }, t.onMaskClick && l.createElement("div", {
    className: `${Wo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: t.onMaskClick
  }), l.createElement("div", {
    className: `${Wo}-content`
  }, t.children))));
  return l.createElement(kr, {
    active: a,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, _r(t.getContainer, u));
}, Si = fy;
function m1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "AddOutline-AddOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "AddOutline-add"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "AddOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M25.1,6.5 C25.3209139,6.5 25.5,6.6790861 25.5,6.9 L25.5,22.5 L41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L25.5,25.5 L25.5,41.1 C25.5,41.3209139 25.3209139,41.5 25.1,41.5 L22.9,41.5 C22.6790861,41.5 22.5,41.3209139 22.5,41.1 L22.5,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L22.5,22.5 L22.5,6.9 C22.5,6.6790861 22.6790861,6.5 22.9,6.5 L25.1,6.5 Z",
    id: "AddOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function h1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CheckCircleFill-CheckCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CheckCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CheckCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M35.8202936,17 L32.7086692,17 C32.6025922,17 32.500859,17.0421352 32.4258461,17.1171378 L32.4258461,17.1171378 L21.3922352,28.1492247 L16.3591562,23.1163755 C16.2841422,23.0413649 16.1824034,22.9992247 16.0763199,22.9992247 L16.0763199,22.9992247 L12.9653996,22.9992247 C12.859342,22.9992247 12.7576259,23.0413445 12.6826161,23.1163228 C12.5263737,23.2724998 12.5263207,23.5257658 12.6824977,23.6820082 C12.8583452,23.8579294 13.0341927,24.0338505 13.2100402,24.2097716 C13.2577488,24.2575002 13.3065097,24.3063074 13.3562592,24.3561283 L13.6661084,24.6666997 C14.3074913,25.3100963 15.0728595,26.0807873 15.8520136,26.8666654 L16.4372421,27.4571699 C18.2552812,29.2922548 19.9983838,31.0574343 20.2666114,31.3285298 L20.301004,31.3632341 C20.8867904,31.9490205 21.8365379,31.9490205 22.4223243,31.3632341 L22.4223243,31.3632341 L36.1031319,17.6828471 C36.1781492,17.6078322 36.2202936,17.5060887 36.2202936,17.4 C36.2202936,17.1790861 36.0412075,17 35.8202936,17 L35.8202936,17 Z",
    id: "CheckCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function v1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CheckOutline-CheckOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CheckOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CheckOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M44.309608,12.6841286 L21.2180499,35.5661955 L21.2180499,35.5661955 C20.6343343,36.1446015 19.6879443,36.1446015 19.1042286,35.5661955 C19.0538201,35.5162456 19.0077648,35.4636155 18.9660627,35.4087682 C18.9113105,35.368106 18.8584669,35.3226694 18.808302,35.2729607 L3.6903839,20.2920499 C3.53346476,20.1365529 3.53231192,19.8832895 3.68780898,19.7263704 C3.7629255,19.6505669 3.86521855,19.6079227 3.97193622,19.6079227 L7.06238923,19.6079227 C7.16784214,19.6079227 7.26902895,19.6495648 7.34393561,19.7237896 L20.160443,32.4236157 L20.160443,32.4236157 L40.656066,12.115858 C40.7309719,12.0416387 40.8321549,12 40.9376034,12 L44.0280571,12 C44.248971,12 44.4280571,12.1790861 44.4280571,12.4 C44.4280571,12.5067183 44.3854124,12.609012 44.309608,12.6841286 Z",
    id: "CheckOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function p1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "ClockCircleFill-ClockCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "ClockCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "ClockCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24.6,14 L22.4,14 C22.1790861,14 22,14.1790861 22,14.4 L22,14.4 L22,23.1715729 L22.0065089,23.3850222 C22.0584325,24.2354066 22.4192395,25.0405598 23.0251263,25.6464466 L23.0251263,25.6464466 L31.1564971,33.7778175 C31.3127068,33.9340272 31.5659728,33.9340272 31.7221825,33.7778175 L31.7221825,33.7778175 L33.2778175,32.2221825 C33.4340272,32.0659728 33.4340272,31.8127068 33.2778175,31.6564971 L33.2778175,31.6564971 L25.1464466,23.5251263 L25.0952092,23.4650801 C25.0337142,23.38027 25,23.2776595 25,23.1715729 L25,23.1715729 L25,14.4 C25,14.1790861 24.8209139,14 24.6,14 L24.6,14 Z",
    id: "ClockCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function no(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CloseCircleFill-CloseCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CloseCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CloseCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M18.6753876,16 L15.5637812,16 C15.4576916,16 15.3559474,16.0421451 15.2809323,16.1171635 C15.124726,16.2733766 15.1247316,16.5266426 15.2809447,16.6828489 L15.2809447,16.6828489 L22.299066,23.7006641 L14.6828159,31.3171619 C14.6078042,31.3921761 14.5656632,31.4939157 14.5656632,31.6 C14.5656632,31.8209139 14.7447493,32 14.9656632,32 L14.9656632,32 L18.0753284,32 C18.1814068,32 18.2831412,31.9578638 18.3581544,31.8828594 L18.3581544,31.8828594 L24.420066,25.8216641 L30.4818451,31.8828564 C30.5568585,31.9578626 30.6585942,32 30.7646741,32 L30.7646741,32 L33.8763476,32 C33.9824309,32 34.0841695,31.9578599 34.1591835,31.8828496 C34.315397,31.7266436 34.3154031,31.4733776 34.1591972,31.3171641 L34.1591972,31.3171641 L26.542066,23.6996641 L33.5591874,16.6828489 C33.6342057,16.6078338 33.6763508,16.5060896 33.6763508,16.4 C33.6763508,16.1790861 33.4972647,16 33.2763508,16 L33.2763508,16 L30.1637654,16 C30.0576705,16 29.9559218,16.0421493 29.8809058,16.1171741 L29.8809058,16.1171741 L24.420066,21.5786641 L18.9582218,16.1171488 C18.883208,16.0421394 18.7814701,16 18.6753876,16 L18.6753876,16 Z",
    id: "CloseCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Oi(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "CloseOutline-CloseOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "CloseOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "CloseOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M10.6085104,8.11754663 L24.1768397,21.8195031 L24.1768397,21.8195031 L37.7443031,8.1175556 C37.8194278,8.04168616 37.9217669,7.999 38.0285372,7.999 L41.1040268,7.999 C41.3249407,7.999 41.5040268,8.1780861 41.5040268,8.399 C41.5040268,8.50440471 41.4624226,8.60554929 41.3882578,8.68044752 L26.2773302,23.9408235 L26.2773302,23.9408235 L41.5021975,39.3175645 C41.65763,39.4745475 41.6563731,39.7278104 41.4993901,39.8832429 C41.4244929,39.9574004 41.3233534,39.999 41.2179546,39.999 L38.1434012,39.999 C38.0366291,39.999 37.9342885,39.9563124 37.8591634,39.8804408 L24.1768397,26.0621438 L24.1768397,26.0621438 L10.4936501,39.8804497 C10.4185257,39.9563159 10.3161889,39.999 10.2094212,39.999 L7.13584526,39.999 C6.91493136,39.999 6.73584526,39.8199139 6.73584526,39.599 C6.73584526,39.4936017 6.77744443,39.3924627 6.85160121,39.3175656 L22.0763492,23.9408235 L22.0763492,23.9408235 L6.96554081,8.68044639 C6.81010226,8.52346929 6.81134951,8.27020637 6.9683266,8.11476782 C7.04322474,8.04060377 7.14436883,7.999 7.24977299,7.999 L10.3242852,7.999 C10.4310511,7.999 10.5333863,8.04168267 10.6085104,8.11754663 Z",
    id: "CloseOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function dy(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "DownFill-DownFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "DownFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "DownFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M40.6640052,13 L7.34128264,13 C6.57572302,13 5.83336217,13.2619065 5.23947349,13.7351762 C3.80578911,14.8838891 3.58308085,16.9699517 4.74301968,18.3897608 L21.404381,38.7725222 C21.5528531,38.9517214 21.7152446,39.1171361 21.9008348,39.2641713 C23.3345192,40.4128842 25.4363283,40.1923313 26.6009069,38.7725222 L43.2576284,18.3897608 C43.740163,17.8016198 44,17.0664436 44,16.3082931 C44.004629,14.4795422 42.505988,13 40.6640052,13 Z",
    id: "DownFill-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function g1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "DownOutline-DownOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", null, /* @__PURE__ */ L.createElement("rect", {
    id: "DownOutline-\u77E9\u5F62",
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
function y1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "ExclamationCircleFill-ExclamationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", null, /* @__PURE__ */ L.createElement("rect", {
    id: "ExclamationCircleFill-\u77E9\u5F62",
    fill: "#D76060",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.1,31 L22.9,31 C22.6790861,31 22.5,31.1790861 22.5,31.4 L22.5,31.4 L22.5,33.6 C22.5,33.8209139 22.6790861,34 22.9,34 L22.9,34 L25.1,34 C25.3209139,34 25.5,33.8209139 25.5,33.6 L25.5,33.6 L25.5,31.4 C25.5,31.1790861 25.3209139,31 25.1,31 L25.1,31 Z M25.1,14 L22.9,14 C22.6790861,14 22.5,14.1790861 22.5,14.4 L22.5,14.4 L22.5,27.6 C22.5,27.8209139 22.6790861,28 22.9,28 L22.9,28 L25.1,28 C25.3209139,28 25.5,27.8209139 25.5,27.6 L25.5,27.6 L25.5,14.4 C25.5,14.1790861 25.3209139,14 25.1,14 L25.1,14 Z",
    id: "ExclamationCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function b1(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "InformationCircleFill-InformationCircleFill",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "InformationCircleFill-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "InformationCircleFill-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M25.6,20 L21.4,20 C21.1790861,20 21,20.1790861 21,20.4 L21,20.4 L21,22.6 C21,22.8209139 21.1790861,23 21.4,23 L21.4,23 L22.6,23 C22.8209139,23 23,23.1790861 23,23.4 L23,23.4 L23,34.6 C23,34.8209139 23.1790861,35 23.4,35 L23.4,35 L25.6,35 C25.8209139,35 26,34.8209139 26,34.6 L26,34.6 L26,20.4 C26,20.1790861 25.8209139,20 25.6,20 L25.6,20 Z M25.6,14 L23.4,14 C23.1790861,14 23,14.1790861 23,14.4 L23,14.4 L23,16.6 C23,16.8209139 23.1790861,17 23.4,17 L23.4,17 L25.6,17 C25.8209139,17 26,16.8209139 26,16.6 L26,16.6 L26,14.4 C26,14.1790861 25.8209139,14 25.6,14 L25.6,14 Z",
    id: "InformationCircleFill-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function my(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "LeftOutline-LeftOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "LeftOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "LeftOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M31.7053818,5.11219264 L13.5234393,22.6612572 L13.5234393,22.6612572 C12.969699,23.2125856 12.9371261,24.0863155 13.4257204,24.6755735 L13.5234393,24.7825775 L31.7045714,42.8834676 C31.7795345,42.9580998 31.8810078,43 31.9867879,43 L35.1135102,43 C35.3344241,43 35.5135102,42.8209139 35.5135102,42.6 C35.5135102,42.4936115 35.4711279,42.391606 35.3957362,42.316542 L16.7799842,23.7816937 L16.7799842,23.7816937 L35.3764658,5.6866816 C35.5347957,5.53262122 35.5382568,5.27937888 35.3841964,5.121049 C35.3088921,5.04365775 35.205497,5 35.0975148,5 L31.9831711,5 C31.8795372,5 31.7799483,5.04022164 31.7053818,5.11219264 Z",
    id: "LeftOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function hy(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "MinusOutline-MinusOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "MinusOutline-add"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "MinusOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M41.1,22.5 C41.3209139,22.5 41.5,22.6790861 41.5,22.9 L41.5,25.1 C41.5,25.3209139 41.3209139,25.5 41.1,25.5 L6.9,25.5 C6.6790861,25.5 6.5,25.3209139 6.5,25.1 L6.5,22.9 C6.5,22.6790861 6.6790861,22.5 6.9,22.5 L41.1,22.5 Z",
    id: "MinusOutline-\u8DEF\u5F84",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function vy(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "QuestionCircleOutline-QuestionCircleOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "QuestionCircleOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "QuestionCircleOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M24,2 C36.1502645,2 46,11.8497355 46,24 C46,36.1502645 36.1502645,46 24,46 C11.8497355,46 2,36.1502645 2,24 C2,11.8497355 11.8497355,2 24,2 Z M24,5 C13.5065898,5 5,13.5065898 5,24 C5,34.4934102 13.5065898,43 24,43 C34.4934102,43 43,34.4934102 43,24 C43,13.5065898 34.4934102,5 24,5 Z M26,32.4 L26,34.6 C26,34.8209139 25.8209139,35 25.6,35 L23.4,35 C23.1790861,35 23,34.8209139 23,34.6 L23,32.4 C23,32.1790861 23.1790861,32 23.4,32 L25.6,32 C25.8209139,32 26,32.1790861 26,32.4 Z M24,12 C27.8659932,12 31,15.1340068 31,19 C31,22.1706393 28.8919961,24.8489278 26.0010432,25.7098107 L26.0001268,28.6 C25.9999299,28.8208643 25.8208644,28.9998731 25.6,29 L23.4,29 C23.1790861,29 23,28.8209139 23,28.6 L23,23.4 C23,23.1790861 23.1790861,23 23.4,23 L24,23 L24,23 C26.209139,23 28,21.209139 28,19 C28,16.790861 26.209139,15 24,15 C21.790861,15 20,16.790861 20,19 L17,19 C17,15.1340068 20.1340068,12 24,12 Z",
    id: "QuestionCircleOutline-\u5F62\u72B6",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function py(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "RightOutline-RightOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "RightOutline-RightOutlined"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "RightOutline-\u77E9\u5F62",
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
function gy(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "SearchOutline-SearchOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "SearchOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "SearchOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M10.2434135,10.1505371 C17.2346315,3.28315429 28.5696354,3.28315429 35.5608534,10.1505371 C42.3159331,16.7859644 42.5440954,27.4048667 36.2453405,34.3093889 L43.7095294,41.6422249 C43.8671196,41.7970419 43.8693677,42.0502979 43.7145508,42.2078881 C43.7128864,42.2095822 43.7112069,42.2112616 43.7095126,42.2129259 L42.1705322,43.7246464 C42.014915,43.8775072 41.7655181,43.8775006 41.6099089,43.7246316 L34.0775268,36.3248916 L34.0775268,36.3248916 C27.0485579,41.8551751 16.7593545,41.4200547 10.2434135,35.0195303 C3.25219551,28.1521474 3.25219551,17.0179199 10.2434135,10.1505371 Z M12.3532001,12.2229532 C6.52718516,17.9457722 6.52718516,27.2242951 12.3532001,32.9471142 C18.1792151,38.6699332 27.6250517,38.6699332 33.4510667,32.9471142 C39.2770817,27.2242951 39.2770817,17.9457722 33.4510667,12.2229532 C27.6250517,6.50013419 18.1792151,6.50013419 12.3532001,12.2229532 Z",
    id: "SearchOutline-\u5F62\u72B6",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function yy(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "SoundOutline-SoundOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "SoundOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "SoundOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M28.267333,7.42364522 C28.6217345,7.94869119 28.8108515,8.56559899 28.8108515,9.19662571 L28.8108515,38.803714 C28.8108515,40.568974 27.3619563,42 25.5746535,42 C24.9357472,42 24.311136,41.8132153 23.7795338,41.4631847 L13.5176584,34.7058449 L8.3149307,34.706256 C5.93186028,34.706256 4,32.7982213 4,30.4445413 L4,17.6593971 C4,15.3057171 5.93186028,13.3976824 8.3149307,13.3976824 L13.3601634,13.3972713 L23.7795338,6.53715498 C25.2666597,5.55796489 27.2759158,5.95486009 28.267333,7.42364522 Z M40.4649231,8.99868666 C40.5511218,9.17742383 40.619996,9.32223121 40.6715457,9.43310881 C42.8085201,14.0295034 44,19.1437027 44,24.532755 C44,29.7837404 42.8687892,34.7737758 40.8339269,39.2781083 C40.7469512,39.4706362 40.6237802,39.7330988 40.4644141,40.0654961 C40.3689469,40.2647533 40.1300031,40.3488277 39.9307715,40.2533072 C39.9306414,40.2532448 39.9305113,40.2531824 39.9303812,40.2531198 C39.6706542,40.1282492 39.4751102,40.0342363 39.3437492,39.9710811 C38.9410401,39.777468 38.6130663,39.619786 38.3598279,39.498035 C38.2070716,39.4245934 38.0007263,39.3253875 37.740792,39.2004172 C37.5419104,39.104853 37.4580092,38.8662856 37.5532468,38.6672473 C37.7034937,38.3532445 37.8197479,38.104744 37.9020095,37.9217457 C39.7416376,33.8293278 40.763802,29.2989389 40.763802,24.532755 C40.763802,19.6931433 39.7099001,15.0966478 37.8164042,10.9549334 C37.7526807,10.8155487 37.6652043,10.6300308 37.5539748,10.3983796 C37.4585265,10.1993116 37.5423279,9.96050973 37.7412949,9.8648511 C37.9298799,9.7741839 38.0818373,9.70112639 38.1971671,9.64567856 C38.5403397,9.48068928 39.0100918,9.2548436 39.6064234,8.9681415 C39.6867211,8.9295363 39.7949893,8.87748349 39.9312282,8.81198307 C40.1301627,8.71623553 40.3690201,8.79982709 40.4649231,8.99868666 Z M24.954689,9.60481048 L14.4401642,16.5275765 C14.3748695,16.5705665 14.2984086,16.5934809 14.2202323,16.5934873 L8.3149307,16.5939685 L8.3149307,16.5939685 C7.76171792,16.5939685 7.30576856,17.0052668 7.24345545,17.5351457 L7.23619803,17.6593971 L7.23619803,30.4445413 C7.23619803,30.9909313 7.65263219,31.4412574 8.18892037,31.502802 L8.31467178,31.50997 L14.3775506,31.5094909 C14.4557573,31.5094847 14.5322502,31.5324045 14.5975676,31.5754153 L24.9546682,38.39546 C25.139173,38.5169545 25.3872345,38.4658746 25.508729,38.2813698 C25.5517339,38.2160614 25.5746535,38.1395804 25.5746535,38.0613845 L25.5746535,9.93889975 C25.5746535,9.71798585 25.3955674,9.53889975 25.1746535,9.53889975 C25.0964661,9.53889975 25.019993,9.56181436 24.954689,9.60481048 Z M34.6436115,11.798648 C34.7547335,12.030794 34.8419854,12.2167889 34.9053671,12.3566328 C36.590502,16.0746763 37.5276039,20.1956294 37.5276039,24.532755 C37.5276039,28.7641394 36.635639,32.7897635 35.0272837,36.4362183 C34.9380427,36.6385449 34.8101552,36.9146706 34.6436211,37.2645952 C34.5486602,37.4640326 34.3100191,37.5487723 34.1105639,37.4538487 C34.1101091,37.4536323 34.1096547,37.453415 34.1092007,37.4531968 C33.9190573,37.3618222 33.7721424,37.2912213 33.6684561,37.2413942 C33.186467,37.0097713 32.80073,36.824403 32.5112451,36.6852892 C32.3647538,36.6148919 32.1675294,36.5201144 31.9195719,36.4009569 C31.7210538,36.3055358 31.6370188,36.067582 31.7316042,35.8686644 C31.8690322,35.5796464 31.9753727,35.3500122 32.0506255,35.1797617 C33.4919206,31.9190071 34.2914059,28.3180945 34.2914059,24.532755 C34.2914059,20.6930477 33.46879,17.0431031 31.9881259,13.7454591 C31.9261905,13.6075203 31.840749,13.424362 31.7318014,13.1959842 C31.636885,12.9969991 31.7208632,12.7587263 31.919573,12.6632348 C32.0929373,12.5799233 32.2332164,12.5125112 32.3404102,12.4609985 C32.6888449,12.2935556 33.1655706,12.0644616 33.7705875,11.7737163 C33.8540198,11.7336223 33.9670458,11.6793068 34.1096655,11.6107699 C34.3087736,11.5152168 34.5476881,11.5990382 34.6433466,11.7980956 C34.643435,11.7982797 34.6435233,11.7984638 34.6436115,11.798648 Z",
    id: "SoundOutline-\u5F62\u72B6",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
function Tu(e) {
  return /* @__PURE__ */ L.createElement("svg", Object.assign({
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
  }), /* @__PURE__ */ L.createElement("g", {
    id: "TextDeletionOutline-TextDeletionOutline",
    stroke: "none",
    strokeWidth: 1,
    fill: "none",
    fillRule: "evenodd"
  }, /* @__PURE__ */ L.createElement("g", {
    id: "TextDeletionOutline-\u7F16\u7EC4"
  }, /* @__PURE__ */ L.createElement("rect", {
    id: "TextDeletionOutline-\u77E9\u5F62",
    fill: "#FFFFFF",
    opacity: 0,
    x: 0,
    y: 0,
    width: 48,
    height: 48
  }), /* @__PURE__ */ L.createElement("path", {
    d: "M38.5492302,6 C41.5596051,6 44,8.46240906 44,11.499981 L44,35.5 C44,38.5375742 41.5596051,41.000013 38.54923,41.000013 L17.3058462,41.000013 C14.6665152,41.000013 12.2347138,39.555982 10.9529738,37.2279238 L4.91451284,27.0612608 C3.6951623,24.8464932 3.6951623,22.1535354 4.91451335,19.9387516 L10.9529743,9.77208856 C12.234697,7.44403098 14.6665154,6 17.3058464,6 L38.5492302,6 Z M38.5492273,8.74994707 L17.3058465,8.74994707 C15.7329163,8.74994707 14.2719651,9.57120176 13.4439762,10.9206455 L13.3349608,11.1076457 L7.29739408,21.2743087 C6.57566975,22.5850072 6.53495505,24.1690434 7.18837846,25.5157286 L7.29739386,25.7265623 L13.3349605,35.8932253 C14.0992225,37.2803788 15.5202936,38.1698544 17.0914483,38.2444783 L17.3058454,38.2499783 L38.5492292,38.2499783 C39.9923716,38.2499783 41.1854088,37.114979 41.2700704,35.6613101 L41.2746127,35.4999769 L41.2746127,11.4999513 C41.2746127,10.0436198 40.1496291,8.83987037 38.7089651,8.75452144 L38.5492273,8.74994707 Z M22.3492842,17 C22.4547968,17 22.556036,17.0416892 22.6309531,17.1159883 L26.757,21.208 L30.8830469,17.1159883 C30.957964,17.0416892 31.0592032,17 31.1647158,17 L34.2719196,17 C34.4928335,17 34.6719196,17.1790861 34.6719196,17.4 C34.6719196,17.5067321 34.6292639,17.6090378 34.5534423,17.6841566 L28.879,23.306 L34.8245071,29.1968543 C34.9814364,29.3523411 34.9826059,29.6056044 34.8271191,29.7625337 C34.7520011,29.8383486 34.6497001,29.881 34.5429734,29.881 L31.4366959,29.881 C31.331195,29.881 31.2299662,29.8393201 31.1550512,29.7650357 L26.758,25.405 L22.3599432,29.7650669 C22.2850309,29.8393322 22.1838155,29.881 22.07833,29.881 L18.9720266,29.881 C18.7511127,29.881 18.5720266,29.7019139 18.5720266,29.481 C18.5720266,29.3742733 18.614678,29.2719723 18.6904929,29.1968543 L24.636,23.306 L18.9624269,17.6841345 C18.8055037,17.5286415 18.8043444,17.2753782 18.9598374,17.118455 C19.0349545,17.042647 19.1372506,17 19.2439719,17 L22.3492842,17 Z",
    id: "TextDeletionOutline-\u5F62\u72B6\u7ED3\u5408",
    fill: "currentColor",
    fillRule: "nonzero"
  }))));
}
const Ml = {
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
function w1(e) {
  const [t, n] = q(e);
  return xe(() => {
    n(e);
  }, [e]), t;
}
function by(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const $e = {
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
function Ru(e, t, n) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(e, n * 5) : e * t * n / (t + n * e);
}
function Mu(e, t, n, r = 0.15) {
  return r === 0 ? by(e, t, n) : e < t ? -Ru(t - e, n - t, r) + t : e > n ? +Ru(e - n, n - t, r) + n : e;
}
function wy(e, [t, n], [r, i]) {
  const [[a, o], [s, c]] = e;
  return [Mu(t, a, o, r), Mu(n, s, c, i)];
}
function Te(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Iu(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ve(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Iu(Object(n), !0).forEach(function(r) {
      Te(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Iu(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const E1 = {
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
function Lu(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}
const Ey = ["enter", "leave"];
function Cy(e = !1, t) {
  return e && !Ey.includes(t);
}
function $y(e, t = "", n = !1) {
  const r = E1[e], i = r && r[t] || t;
  return "on" + Lu(e) + Lu(i) + (Cy(n, i) ? "Capture" : "");
}
const xy = ["gotpointercapture", "lostpointercapture"];
function _y(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = xy.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function ky(e, t = "") {
  const n = E1[e], r = n && n[t] || t;
  return e + r;
}
function ro(e) {
  return "touches" in e;
}
function C1(e) {
  return ro(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function Sy(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function Oy(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function $1(e) {
  return ro(e) ? Oy(e)[0] : e;
}
function Ss(e, t) {
  const n = t.clientX - e.clientX, r = t.clientY - e.clientY, i = (t.clientX + e.clientX) / 2, a = (t.clientY + e.clientY) / 2, o = Math.hypot(n, r);
  return {
    angle: -(Math.atan2(n, r) * 180) / Math.PI,
    distance: o,
    origin: [i, a]
  };
}
function Fy(e) {
  return Sy(e).map((t) => t.identifier);
}
function Du(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Ss(n, r);
}
function Zo(e) {
  const t = $1(e);
  return ro(e) ? t.identifier : t.pointerId;
}
function Vu(e) {
  const t = $1(e);
  return [t.clientX, t.clientY];
}
const ju = 40, Bu = 800;
function x1(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= ju, n *= ju) : r === 2 && (t *= Bu, n *= Bu), [t, n];
}
function Py(e) {
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
function xa(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
function Ny() {
}
function Ay(...e) {
  return e.length === 0 ? Ny : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function Wu(e, t) {
  return Object.assign({}, t, e || {});
}
const Ty = 32;
class _1 {
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
    n[r] = t._active = t.active = t._blocked = t._force = !1, t._step = [!1, !1], t.intentional = !1, t._movement = [0, 0], t._distance = [0, 0], t._direction = [0, 0], t._delta = [0, 0], t._bounds = [[-1 / 0, 1 / 0], [-1 / 0, 1 / 0]], t.args = i, t.axis = void 0, t.memo = void 0, t.elapsedTime = 0, t.direction = [0, 0], t.distance = [0, 0], t.overflow = [0, 0], t._movementBound = [!1, !1], t.velocity = [0, 0], t.movement = [0, 0], t.delta = [0, 0], t.timeStamp = 0;
  }
  start(t) {
    const n = this.state, r = this.config;
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = t.target, n.currentTarget = t.currentTarget, n.lastOffset = r.from ? xa(r.from, n) : n.offset, n.offset = n.lastOffset), n.startTime = n.timeStamp = t.timeStamp;
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
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, Py(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const C = n._delta.map(Math.abs);
      $e.addTo(n._distance, C);
    }
    this.axisIntent && this.axisIntent(t);
    const [o, s] = n._movement, [c, u] = r.threshold, {
      _step: d,
      values: f
    } = n;
    if (r.hasCustomTransform ? (d[0] === !1 && (d[0] = Math.abs(o) >= c && f[0]), d[1] === !1 && (d[1] = Math.abs(s) >= u && f[1])) : (d[0] === !1 && (d[0] = Math.abs(o) >= c && Math.sign(o) * c), d[1] === !1 && (d[1] = Math.abs(s) >= u && Math.sign(s) * u)), n.intentional = d[0] !== !1 || d[1] !== !1, !n.intentional)
      return;
    const m = [0, 0];
    if (r.hasCustomTransform) {
      const [C, k] = f;
      m[0] = d[0] !== !1 ? C - d[0] : 0, m[1] = d[1] !== !1 ? k - d[1] : 0;
    } else
      m[0] = d[0] !== !1 ? o - d[0] : 0, m[1] = d[1] !== !1 ? s - d[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const v = n.offset, g = n._active && !n._blocked || n.active;
    g && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = xa(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [h, b] = n.offset, [[w, $], [y, p]] = n._bounds;
    n.overflow = [h < w ? -1 : h > $ ? 1 : 0, b < y ? -1 : b > p ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = wy(n._bounds, n.offset, E), n.delta = $e.sub(n.offset, v), this.computeMovement(), g && (!n.last || a > Ty)) {
      n.delta = $e.sub(n.offset, v);
      const C = n.delta.map(Math.abs);
      $e.addTo(n.distance, C), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [C[0] / a, C[1] / a]);
    }
  }
  emit() {
    const t = this.state, n = this.shared, r = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !r.triggerAllEvents)
      return;
    const i = this.handler(ve(ve(ve({}, n), t), {}, {
      [this.aliasKey]: t.values
    }));
    i !== void 0 && (t.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Ry([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class k1 extends _1 {
  constructor(...t) {
    super(...t), Te(this, "aliasKey", "xy");
  }
  reset() {
    super.reset(), this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0], this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = $e.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = $e.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[C1(t)] : r.axisThreshold;
      n.axis = Ry(n._movement, i);
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
const My = (e) => e, Zu = 0.15, S1 = {
  enabled(e = !0) {
    return e;
  },
  eventOptions(e, t, n) {
    return ve(ve({}, n.shared.eventOptions), e);
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
        return [Zu, Zu];
      case !1:
        return [0, 0];
      default:
        return $e.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function")
      return e;
    if (e != null)
      return $e.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || My;
  },
  threshold(e) {
    return $e.toVector(e, 0);
  }
}, Iy = 0, Sr = ve(ve({}, S1), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(e = Iy) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (a) => Sr.bounds(e(a));
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
}), zi = 10, Hu = {
  ArrowRight: (e = 1) => [zi * e, 0],
  ArrowLeft: (e = 1) => [-zi * e, 0],
  ArrowUp: (e = 1) => [0, -zi * e],
  ArrowDown: (e = 1) => [0, zi * e]
};
class Ly extends k1 {
  constructor(...t) {
    super(...t), Te(this, "ingKey", "dragging");
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
      t._bounds = Sr.bounds(i);
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
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = Zo(t), r._pointerActive = !0, this.computeValues(Vu(t)), this.computeInitial(), n.preventScrollAxis && C1(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const n = this.state, r = this.config;
    if (!n._pointerActive || n.type === t.type && t.timeStamp === n.timeStamp)
      return;
    const i = Zo(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = Vu(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = $e.sub(a, n._values), this.computeValues(a)), $e.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
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
    const i = Zo(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [s, c] = n.direction, [u, d] = n.velocity, [f, m] = n.movement, [v, g] = r.swipe.velocity, [h, b] = r.swipe.distance, w = r.swipe.duration;
      n.elapsedTime < w && (Math.abs(u) > v && Math.abs(f) > h && (n.swipe[0] = s), Math.abs(d) > g && Math.abs(m) > b && (n.swipe[1] = c));
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
    this.state._preventScroll = !1, Dy(t);
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
    const n = Hu[t.key];
    if (n) {
      const r = this.state, i = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), r._delta = n(i), r._keyboardActive = !0, $e.addTo(r._movement, r._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Hu && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    t(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(n, "change", this.pointerMove.bind(this)), t(n, "end", this.pointerUp.bind(this)), t(n, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Dy(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const Fi = typeof window < "u" && window.document && window.document.createElement;
function Vy() {
  return Fi && "ontouchstart" in window;
}
function Uu() {
  return Vy() || Fi && window.navigator.maxTouchPoints > 1;
}
function jy() {
  return Fi && "onpointerdown" in window;
}
function By() {
  return Fi && "exitPointerLock" in window.document;
}
function Wy() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const nt = {
  isBrowser: Fi,
  gesture: Wy(),
  touch: Uu(),
  touchscreen: Uu(),
  pointer: jy(),
  pointerLock: By()
}, Zy = 250, Hy = 180, Uy = 0.5, zy = 50, qy = 250, zu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Ky = ve(ve({}, Sr), {}, {
  device(e, t, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && nt.pointerLock, nt.touch && n ? "touch" : this.pointerLock ? "mouse" : nt.pointer && !i ? "pointer" : nt.touch ? "touch" : "mouse";
  },
  preventScrollAxis(e, t, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? Zy : void 0, !(!nt.touchscreen || n === !1))
      return e || (n !== void 0 ? "y" : void 0);
  },
  pointerCapture(e, t, {
    pointer: {
      capture: n = !0,
      buttons: r = 1
    } = {}
  }) {
    return this.pointerButtons = r, !this.pointerLock && this.device === "pointer" && n;
  },
  keys(e = !0) {
    return e;
  },
  threshold(e, t, {
    filterTaps: n = !1,
    tapsThreshold: r = 3,
    axis: i = void 0
  }) {
    const a = $e.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: e = Uy,
    distance: t = zy,
    duration: n = qy
  } = {}) {
    return {
      velocity: this.transform($e.toVector(e)),
      distance: this.transform($e.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return Hy;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? ve(ve({}, zu), e) : zu;
  }
}), Gy = 30, Yy = 100;
class Xy extends _1 {
  constructor(...t) {
    super(...t), Te(this, "ingKey", "pinching"), Te(this, "aliasKey", "da");
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
    t === "wheel" ? this.state.offset = $e.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * Gy - Math.abs(r);
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
    const i = Du(t, n._touchIds);
    this.pinchStart(t, i);
  }
  pointerStart(t) {
    if (t.buttons != null && t.buttons % 2 !== 1)
      return;
    this.ctrl.setEventIds(t), t.target.setPointerCapture(t.pointerId);
    const n = this.state, r = n._pointerEvents, i = this.ctrl.pointerIds;
    if (n._active && Array.from(r.keys()).every((o) => i.has(o)) || (r.size < 2 && r.set(t.pointerId, t), n._pointerEvents.size < 2))
      return;
    this.start(t);
    const a = Ss(...Array.from(r.values()));
    this.pinchStart(t, a);
  }
  pinchStart(t, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const n = Du(t, this.state._touchIds);
    this.pinchMove(t, n);
  }
  pointerMove(t) {
    const n = this.state._pointerEvents;
    if (n.has(t.pointerId) && n.set(t.pointerId, t), !this.state._active)
      return;
    const r = Ss(...Array.from(n.values()));
    this.pinchMove(t, r);
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
    n._movement = [t.scale - 1, t.rotation], n._delta = $e.sub(n._movement, r), this.compute(t), this.emit();
  }
  gestureEnd(t) {
    !this.state._active || (this.state._active = !1, this.compute(t), this.emit());
  }
  wheel(t) {
    const n = this.config.modifierKey;
    n && !t[n] || (this.state._active ? this.wheelChange(t) : this.wheelStart(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this)));
  }
  wheelStart(t) {
    this.start(t), this.wheelChange(t);
  }
  wheelChange(t) {
    "uv" in t || t.cancelable && t.preventDefault();
    const r = this.state;
    r._delta = [-x1(t)[1] / Yy * r.offset[0], 0], $e.addTo(r._movement, r._delta), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    n && (t(n, "start", this[n + "Start"].bind(this)), t(n, "change", this[n + "Move"].bind(this)), t(n, "end", this[n + "End"].bind(this)), t(n, "cancel", this[n + "End"].bind(this))), t("wheel", "", this.wheel.bind(this), {
      passive: !1
    });
  }
}
const Qy = ve(ve({}, S1), {}, {
  device(e, t, {
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
  bounds(e, t, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const s = Wu(xa(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    }, a = (o) => {
      const s = Wu(xa(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(e, t, n) {
    return this.lockDirection = n.axis === "lock", $e.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  }
});
ve(ve({}, Sr), {}, {
  mouseOnly: (e = !0) => e
});
class Jy extends k1 {
  constructor(...t) {
    super(...t), Te(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = x1(t), $e.addTo(n._movement, n._delta);
    const [r, i] = n.overflow, [a, o] = n._delta, [s, c] = n._direction;
    (r < 0 && a > 0 && s < 0 || r > 0 && a < 0 && s > 0) && (n._movement[0] = n._movementBound[0]), (i < 0 && o > 0 && c < 0 || i > 0 && o < 0 && c > 0) && (n._movement[1] = n._movementBound[1]), this.compute(t), this.emit();
  }
  wheelEnd() {
    !this.state._active || (this.state._active = !1, this.compute(), this.emit());
  }
  bind(t) {
    t("wheel", "", this.wheel.bind(this));
  }
}
const e8 = Sr;
ve(ve({}, Sr), {}, {
  mouseOnly: (e = !0) => e
});
const Il = /* @__PURE__ */ new Map(), Os = /* @__PURE__ */ new Map();
function Ll(e) {
  Il.set(e.key, e.engine), Os.set(e.key, e.resolver);
}
const O1 = {
  key: "drag",
  engine: Ly,
  resolver: Ky
}, t8 = {
  key: "pinch",
  engine: Xy,
  resolver: Qy
}, n8 = {
  key: "wheel",
  engine: Jy,
  resolver: e8
};
function r8(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function i8(e, t) {
  if (e == null)
    return {};
  var n = r8(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
const a8 = {
  target(e) {
    if (e)
      return () => "current" in e ? e.current : e;
  },
  enabled(e = !0) {
    return e;
  },
  window(e = nt.isBrowser ? window : void 0) {
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
}, o8 = ["target", "eventOptions", "window", "enabled", "transform"];
function la(e = {}, t) {
  const n = {};
  for (const [r, i] of Object.entries(t))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, e[r], r, e);
        break;
      case "object":
        n[r] = la(e[r], i);
        break;
      case "boolean":
        i && (n[r] = e[r]);
        break;
    }
  return n;
}
function s8(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = i8(r, o8);
  if (n.shared = la({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, a8), t) {
    const d = Os.get(t);
    n[t] = la(ve({
      shared: n.shared
    }, u), d);
  } else
    for (const d in u) {
      const f = Os.get(d);
      f && (n[d] = la(ve({
        shared: n.shared
      }, u[d]), f));
    }
  return n;
}
class F1 {
  constructor(t, n) {
    Te(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, a) {
    const o = this._listeners, s = ky(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = ve(ve({}, c), a);
    t.addEventListener(s, i, u);
    const d = () => {
      t.removeEventListener(s, i, u), o.delete(d);
    };
    return o.add(d), d;
  }
  clean() {
    this._listeners.forEach((t) => t()), this._listeners.clear();
  }
}
class l8 {
  constructor() {
    Te(this, "_timeouts", /* @__PURE__ */ new Map());
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
class c8 {
  constructor(t) {
    Te(this, "gestures", /* @__PURE__ */ new Set()), Te(this, "_targetEventStore", new F1(this)), Te(this, "gestureEventStores", {}), Te(this, "gestureTimeoutStores", {}), Te(this, "handlers", {}), Te(this, "config", {}), Te(this, "pointerIds", /* @__PURE__ */ new Set()), Te(this, "touchIds", /* @__PURE__ */ new Set()), Te(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), u8(this, t);
  }
  setEventIds(t) {
    if (ro(t))
      return this.touchIds = new Set(Fy(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = s8(t, n, this.config);
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
          const s = this.config[o], c = qu(r, s.eventOptions, !!i);
          if (s.enabled) {
            const u = Il.get(o);
            new u(this, t, o).bind(c);
          }
        }
        const a = qu(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](ve(ve({}, this.state.shared), {}, {
            event: s,
            args: t
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = Ay(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = _y(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Wn(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new F1(e, t), e.gestureTimeoutStores[t] = new l8();
}
function u8(e, t) {
  t.drag && Wn(e, "drag"), t.wheel && Wn(e, "wheel"), t.scroll && Wn(e, "scroll"), t.move && Wn(e, "move"), t.pinch && Wn(e, "pinch"), t.hover && Wn(e, "hover");
}
const qu = (e, t, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const d = (c = o.capture) !== null && c !== void 0 ? c : t.capture, f = (u = o.passive) !== null && u !== void 0 ? u : t.passive;
  let m = s ? r : $y(r, i, d);
  n && f && (m += "Passive"), e[m] = e[m] || [], e[m].push(a);
}, f8 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function d8(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    f8.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function Zn(e, t, n, r, i, a) {
  if (!e.has(n) || !Il.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let d;
    return u.first && o in t && t[o](u), n in t && (d = t[n](u)), u.last && s in t && t[s](u), d;
  };
  i[r] = c, a[r] = a[r] || {};
}
function m8(e, t) {
  const [n, r, i] = d8(e), a = {};
  return Zn(i, n, "onDrag", "drag", a, t), Zn(i, n, "onWheel", "wheel", a, t), Zn(i, n, "onScroll", "scroll", a, t), Zn(i, n, "onPinch", "pinch", a, t), Zn(i, n, "onMove", "move", a, t), Zn(i, n, "onHover", "hover", a, t), {
    handlers: a,
    config: t,
    nativeHandlers: r
  };
}
function Dl(e, t = {}, n, r) {
  const i = l.useMemo(() => new c8(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function Pt(e, t) {
  return Ll(O1), Dl({
    drag: e
  }, t || {}, "drag");
}
function h8(e, t) {
  return Ll(n8), Dl({
    wheel: e
  }, t || {}, "wheel");
}
function v8(e) {
  return e.forEach(Ll), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = m8(n, r || {});
    return Dl(i, o, void 0, a);
  };
}
const qi = "adm-popup", p8 = Object.assign(Object.assign({}, Ml), {
  closeOnSwipe: !1,
  position: "bottom"
}), g8 = (e) => {
  const t = U(p8, e), n = j(`${qi}-body`, t.bodyClassName, `${qi}-body-position-${t.position}`), {
    locale: r
  } = pe(), [i, a] = q(t.visible), o = D(null);
  za(o, t.disableBodyScroll && i ? "strict" : !1), xe(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const s = yl(), {
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
      var m, v;
      s.current || (a(t.visible), t.visible ? (m = t.afterShow) === null || m === void 0 || m.call(t) : (v = t.afterClose) === null || v === void 0 || v.call(t));
    }
  }), u = Pt(({
    swipe: [, m]
  }) => {
    var v;
    !t.closeOnSwipe || (m === 1 && t.position === "bottom" || m === -1 && t.position === "top") && ((v = t.onClose) === null || v === void 0 || v.call(t));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(t.position)
  }), d = w1(i && t.visible), f = an(t.stopPropagation, B(t, l.createElement("div", Object.assign({
    className: qi,
    onClick: t.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(t.position) ? "none" : "auto"
    }
  }, u()), t.mask && l.createElement(Si, {
    visible: d,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (m) => {
      var v, g;
      (v = t.onMaskClick) === null || v === void 0 || v.call(t, m), t.closeOnMaskClick && ((g = t.onClose) === null || g === void 0 || g.call(t));
    },
    className: t.maskClassName,
    style: t.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement(fe.div, {
    className: n,
    style: Object.assign(Object.assign({}, t.bodyStyle), {
      transform: c.to((m) => t.position === "bottom" ? `translate(0, ${m}%)` : t.position === "top" ? `translate(0, -${m}%)` : t.position === "left" ? `translate(-${m}%, 0)` : t.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: j(`${qi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = t.onClose) === null || m === void 0 || m.call(t);
    },
    role: "button",
    "aria-label": r.common.close
  }, l.createElement(Oi, null)), t.children))));
  return l.createElement(kr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, _r(t.getContainer, f));
}, Pi = g8;
const Ku = "adm-safe-area", y8 = (e) => B(e, l.createElement("div", {
  className: j(Ku, `${Ku}-position-${e.position}`)
})), Or = y8, _a = Object.assign({}, Am), {
  version: b8,
  render: w8,
  unmountComponentAtNode: E8
} = _a;
let io;
try {
  Number((b8 || "").split(".")[0]) >= 18 && _a.createRoot && (io = _a.createRoot);
} catch {
}
function Gu(e) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: t
  } = _a;
  t && typeof t == "object" && (t.usingClientEntryPoint = e);
}
const ka = "__antd_mobile_root__";
function C8(e, t) {
  w8(e, t);
}
function $8(e, t) {
  Gu(!0);
  const n = t[ka] || io(t);
  Gu(!1), n.render(e), t[ka] = n;
}
function x8(e, t) {
  if (io) {
    $8(e, t);
    return;
  }
  C8(e, t);
}
function _8(e) {
  return E8(e);
}
function k8(e) {
  return Ce(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var t;
      (t = e[ka]) === null || t === void 0 || t.unmount(), delete e[ka];
    });
  });
}
function S8(e) {
  return io ? k8(e) : _8(e);
}
function Ni(e) {
  const t = document.createElement("div");
  document.body.appendChild(t);
  function n() {
    S8(t) && t.parentNode && t.parentNode.removeChild(t);
  }
  return x8(e, t), n;
}
function Fr(e) {
  const t = l.forwardRef((i, a) => {
    const [o, s] = q(!1), c = D(!1), [u, d] = q(e), f = D(0);
    G(() => {
      c.current ? v() : s(!0);
    }, []);
    function m() {
      var g, h;
      c.current = !0, s(!1), (h = (g = u.props).onClose) === null || h === void 0 || h.call(g);
    }
    function v() {
      var g, h;
      r(), (h = (g = u.props).afterClose) === null || h === void 0 || h.call(g);
    }
    return ge(a, () => ({
      close: m,
      replace: (g) => {
        var h, b;
        f.current++, (b = (h = u.props).afterClose) === null || b === void 0 || b.call(h), d(g);
      }
    })), l.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: f.current,
      visible: o,
      onClose: m,
      afterClose: v
    }));
  }), n = l.createRef(), r = Ni(l.createElement(t, {
    ref: n
  }));
  return {
    close: () => Ce(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const Ie = "adm-action-sheet", O8 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, P1 = (e) => {
  const t = U(O8, e);
  return l.createElement(Pi, {
    visible: t.visible,
    onMaskClick: () => {
      var n, r;
      (n = t.onMaskClick) === null || n === void 0 || n.call(t), t.closeOnMaskClick && ((r = t.onClose) === null || r === void 0 || r.call(t));
    },
    afterClose: t.afterClose,
    className: j(`${Ie}-popup`, t.popupClassName),
    style: t.popupStyle,
    getContainer: t.getContainer,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, B(t, l.createElement("div", {
    className: Ie
  }, t.extra && l.createElement("div", {
    className: `${Ie}-extra`
  }, t.extra), l.createElement("div", {
    className: `${Ie}-button-list`
  }, t.actions.map((n, r) => l.createElement("div", {
    key: n.key,
    className: `${Ie}-button-item-wrapper`
  }, l.createElement("a", {
    className: j("adm-plain-anchor", `${Ie}-button-item`, {
      [`${Ie}-button-item-danger`]: n.danger,
      [`${Ie}-button-item-disabled`]: n.disabled,
      [`${Ie}-button-item-bold`]: n.bold
    }),
    onClick: () => {
      var i, a, o;
      (i = n.onClick) === null || i === void 0 || i.call(n), (a = t.onAction) === null || a === void 0 || a.call(t, n, r), t.closeOnAction && ((o = t.onClose) === null || o === void 0 || o.call(t));
    },
    role: "option",
    "aria-disabled": n.disabled
  }, l.createElement("div", {
    className: `${Ie}-button-item-name`
  }, n.text), n.description && l.createElement("div", {
    className: `${Ie}-button-item-description`
  }, n.description))))), t.cancelText && l.createElement("div", {
    className: `${Ie}-cancel`,
    role: "option",
    "aria-label": t.cancelText
  }, l.createElement("div", {
    className: `${Ie}-button-item-wrapper`
  }, l.createElement("a", {
    className: j("adm-plain-anchor", `${Ie}-button-item`),
    onClick: () => {
      var n;
      (n = t.onClose) === null || n === void 0 || n.call(t);
    }
  }, l.createElement("div", {
    className: `${Ie}-button-item-name`
  }, t.cancelText)))), t.safeArea && l.createElement(Or, {
    position: "bottom"
  }))));
};
function F8(e) {
  return Fr(l.createElement(P1, Object.assign({}, e)));
}
const _k = ie(P1, {
  show: F8
});
const Yu = "adm-auto-center", P8 = (e) => B(e, l.createElement("div", {
  className: Yu
}, l.createElement("div", {
  className: `${Yu}-content`
}, e.children))), hi = P8;
const N8 = De(() => l.createElement("svg", {
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
var Vl = {}, A8 = _t && _t.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Vl, "__esModule", { value: !0 });
var jl = Vl.staged = void 0;
const T8 = A8(l);
function N1(e) {
  return typeof e == "function" ? T8.default.createElement(R8, { stage: e }) : e;
}
function R8(e) {
  const t = e.stage();
  return N1(t);
}
function M8(e) {
  return function(n, r) {
    const i = e(n, r);
    return N1(i);
  };
}
jl = Vl.staged = M8;
function kn(e) {
  return typeof e == "number" ? `${e}px` : e;
}
const I8 = (e) => {
  const t = D(null), [n] = J5(t);
  return G(() => {
    n && e.onActive();
  }, [n]), l.createElement("div", {
    ref: t
  });
}, Ai = bd(xe), L8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), D8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Sa = "adm-image", V8 = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Sa}-tip`
  }, l.createElement(L8, null)),
  fallback: l.createElement("div", {
    className: `${Sa}-tip`
  }, l.createElement(D8, null)),
  lazy: !1,
  draggable: !1
}, j8 = jl((e) => {
  const t = U(V8, e), [n, r] = q(!1), [i, a] = q(!1), o = D(null), s = D(null);
  let c = t.src, u = t.srcSet;
  const [d, f] = q(!t.lazy);
  c = d ? t.src : void 0, u = d ? t.srcSet : void 0, Ai(() => {
    r(!1), a(!1);
  }, [c]), G(() => {
    var g;
    !((g = s.current) === null || g === void 0) && g.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, t.fallback);
    const g = l.createElement("img", {
      ref: s,
      id: t.id,
      className: `${Sa}-img`,
      src: c,
      alt: t.alt,
      onClick: t.onClick,
      onLoad: (h) => {
        var b;
        r(!0), (b = t.onLoad) === null || b === void 0 || b.call(t, h);
      },
      onError: (h) => {
        var b;
        a(!0), (b = t.onError) === null || b === void 0 || b.call(t, h);
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
    return l.createElement(l.Fragment, null, !n && t.placeholder, g);
  }
  const v = {};
  return t.width && (v["--width"] = kn(t.width), v.width = kn(t.width)), t.height && (v["--height"] = kn(t.height), v.height = kn(t.height)), B(t, l.createElement("div", {
    ref: o,
    className: Sa,
    style: v,
    onClick: t.onContainerClick
  }, t.lazy && !d && l.createElement(I8, {
    onActive: () => {
      f(!0);
    }
  }), m()));
}), ao = j8, B8 = "adm-avatar", W8 = {
  fallback: l.createElement(N8, null),
  fit: "cover"
}, Z8 = (e) => {
  const t = U(W8, e);
  return B(t, l.createElement(ao, {
    className: B8,
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
}, kk = Z8;
const Hn = "adm-badge", A1 = l.createElement(l.Fragment, null), H8 = (e) => {
  const {
    content: t,
    color: n,
    children: r
  } = e, i = t === A1, a = j(Hn, !!r && `${Hn}-fixed`, i && `${Hn}-dot`, e.bordered && `${Hn}-bordered`), o = t || t === 0 ? B(e, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${Hn}-content`
  }, t))) : null;
  return r ? l.createElement("div", {
    className: j(`${Hn}-wrapper`, e.wrapperClassName),
    style: e.wrapperStyle
  }, r, o) : o;
}, Fs = ie(H8, {
  dot: A1
});
const U8 = "adm-dot-loading", z8 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, q8 = {
  color: "default"
}, T1 = De((e) => {
  var t;
  const n = U(q8, e);
  return B(n, l.createElement("div", {
    style: {
      color: (t = z8[n.color]) !== null && t !== void 0 ? t : n.color
    },
    className: j("adm-loading", U8)
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
}), R1 = T1;
function M1(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
function K8() {
  return vr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const Qe = "adm-button", G8 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(R1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, Y8 = me((e, t) => {
  const n = U(G8, e), [r, i] = q(!1), a = D(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  ge(t, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Ce(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const d = n.onClick(u);
    if (M1(d))
      try {
        i(!0), yield d, i(!1);
      } catch (f) {
        throw i(!1), f;
      }
  });
  return B(n, l.createElement("button", {
    ref: a,
    type: n.type,
    onClick: c,
    className: j(Qe, n.color ? `${Qe}-${n.color}` : null, {
      [`${Qe}-block`]: n.block,
      [`${Qe}-disabled`]: s,
      [`${Qe}-fill-outline`]: n.fill === "outline",
      [`${Qe}-fill-none`]: n.fill === "none",
      [`${Qe}-mini`]: n.size === "mini",
      [`${Qe}-small`]: n.size === "small",
      [`${Qe}-large`]: n.size === "large",
      [`${Qe}-loading`]: o
    }, `${Qe}-shape-${n.shape}`),
    disabled: s,
    onMouseDown: n.onMouseDown,
    onMouseUp: n.onMouseUp,
    onTouchStart: n.onTouchStart,
    onTouchEnd: n.onTouchEnd
  }, o ? l.createElement("div", {
    className: `${Qe}-loading-wrapper`
  }, n.loadingIcon, n.loadingText) : l.createElement("span", null, n.children)));
}), on = Y8;
const Xu = () => l.createElement("svg", {
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
})))))), Qu = () => l.createElement("svg", {
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
var I1 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(_t, function() {
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
        var d, f, m, v, g = o(this), h = (d = this.isoWeekYear(), f = this.$u, m = (f ? a.utc : a)().year(d).startOf("year"), v = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (v += 7), m.add(v, n));
        return g.diff(h, "week") + 1;
      }, s.isoWeekday = function(u) {
        return this.$utils().u(u) ? this.day() || 7 : this.day(this.day() % 7 ? u : u - 7);
      };
      var c = s.startOf;
      s.startOf = function(u, d) {
        var f = this.$utils(), m = !!f.u(d) || d;
        return f.p(u) === "isoweek" ? m ? this.date(this.date() - (this.isoWeekday() - 1)).startOf("day") : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf("day") : c.bind(this)(u, d);
      };
    };
  });
})(I1);
const Bl = I1.exports;
function te(e) {
  const {
    value: t,
    defaultValue: n,
    onChange: r
  } = e, i = Ed(), a = D(t !== void 0 ? t : n);
  t !== void 0 && (a.current = t);
  const o = Zt((s, c = !1) => {
    const u = typeof s == "function" ? s(a.current) : s;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function X8(e, t) {
  return e.replace(/\$\{\w+\}/g, (n) => {
    const r = n.slice(2, -1);
    return t[r];
  });
}
function Ju(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function Ho(e) {
  return Se().year(e.year).month(e.month - 1).date(1);
}
Se.extend(Bl);
const ue = "adm-calendar", Q8 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Xu, null),
  prevYearButton: l.createElement(Qu, null),
  nextMonthButton: l.createElement(Xu, null),
  nextYearButton: l.createElement(Qu, null)
}, J8 = me((e, t) => {
  const n = Se(), r = U(Q8, e), {
    locale: i
  } = pe(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const y = a.pop();
    y && a.unshift(y);
  }
  const [o, s] = te({
    value: r.value === void 0 ? void 0 : Ju(r.selectionMode, r.value),
    defaultValue: Ju(r.selectionMode, r.defaultValue),
    onChange: (y) => {
      var p, E;
      r.selectionMode === "single" ? (p = r.onChange) === null || p === void 0 || p.call(r, y ? y[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, y));
    }
  }), [c, u] = q(!1), [d, f] = q(() => Se(o ? o[0] : n).date(1));
  ml(() => {
    var y;
    (y = r.onPageChange) === null || y === void 0 || y.call(r, d.year(), d.month() + 1);
  }, [d]), ge(t, () => ({
    jumpTo: (y) => {
      let p;
      typeof y == "function" ? p = y({
        year: d.year(),
        month: d.month() + 1
      }) : p = y, f(Ho(p));
    },
    jumpToToday: () => {
      f(Se().date(1));
    }
  }));
  const m = (y, p, E) => {
    const C = d[y](p, E);
    if (y === "subtract" && r.minPage) {
      const k = Ho(r.minPage);
      if (C.isBefore(k, E))
        return;
    }
    if (y === "add" && r.maxPage) {
      const k = Ho(r.maxPage);
      if (C.isAfter(k, E))
        return;
    }
    f(C);
  }, v = l.createElement("div", {
    className: `${ue}-header`
  }, l.createElement("a", {
    className: `${ue}-arrow-button ${ue}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), l.createElement("a", {
    className: `${ue}-arrow-button ${ue}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), l.createElement("div", {
    className: `${ue}-title`
  }, X8(i.Calendar.yearAndMonth, {
    year: d.year().toString(),
    month: (d.month() + 1).toString()
  })), l.createElement("a", {
    className: j(`${ue}-arrow-button`, `${ue}-arrow-button-right`, `${ue}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), l.createElement("a", {
    className: j(`${ue}-arrow-button`, `${ue}-arrow-button-right`, `${ue}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), g = re(() => r.max && Se(r.max), [r.max]), h = re(() => r.min && Se(r.min), [r.min]);
  function b() {
    var y;
    const p = [];
    let E = d.subtract(d.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); p.length < 6 * 7; ) {
      const C = E;
      let k = !1, N = !1, P = !1, F = !1, T = !1;
      if (o) {
        const [x, S] = o;
        N = C.isSame(x, "day"), P = C.isSame(S, "day"), k = N || P || C.isAfter(x, "day") && C.isBefore(S, "day"), k && (F = (p.length % 7 === 0 || C.isSame(C.startOf("month"), "day")) && !N, T = (p.length % 7 === 6 || C.isSame(C.endOf("month"), "day")) && !P);
      }
      const O = C.month() === d.month(), _ = r.shouldDisableDate ? r.shouldDisableDate(C.toDate()) : g && C.isAfter(g, "day") || h && C.isBefore(h, "day");
      p.push(l.createElement("div", {
        key: C.valueOf(),
        className: j(`${ue}-cell`, (_ || !O) && `${ue}-cell-disabled`, O && {
          [`${ue}-cell-today`]: C.isSame(n, "day"),
          [`${ue}-cell-selected`]: k,
          [`${ue}-cell-selected-begin`]: N,
          [`${ue}-cell-selected-end`]: P,
          [`${ue}-cell-selected-row-begin`]: F,
          [`${ue}-cell-selected-row-end`]: T
        }),
        onClick: () => {
          if (!r.selectionMode || _)
            return;
          const x = C.toDate();
          O || f(C.clone().date(1));
          function S() {
            if (!r.allowClear || !o)
              return !1;
            const [I, A] = o;
            return C.isSame(I, "date") && C.isSame(A, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && S()) {
              s(null);
              return;
            }
            s([x, x]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              s([x, x]), u(!0);
              return;
            }
            if (S()) {
              s(null), u(!1);
              return;
            }
            if (c) {
              const I = o[0];
              s(I > x ? [x, I] : [I, x]), u(!1);
            } else
              s([x, x]), u(!0);
          }
        }
      }, l.createElement("div", {
        className: `${ue}-cell-top`
      }, r.renderDate ? r.renderDate(C.toDate()) : C.date()), l.createElement("div", {
        className: `${ue}-cell-bottom`
      }, (y = r.renderLabel) === null || y === void 0 ? void 0 : y.call(r, C.toDate())))), E = E.add(1, "day");
    }
    return p;
  }
  const w = l.createElement("div", {
    className: `${ue}-cells`
  }, b()), $ = l.createElement("div", {
    className: `${ue}-mark`
  }, a.map((y, p) => l.createElement("div", {
    key: p,
    className: `${ue}-mark-cell`
  }, y)));
  return B(r, l.createElement("div", {
    className: ue
  }, v, $, w));
}), Sk = J8;
function Ti(e, t) {
  const n = Zt(e);
  xe(() => {
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
function Wl(e, t, n) {
  const r = Zt(e);
  G(() => {
    const i = new MutationObserver(() => {
      r();
    });
    if (!!t.current)
      return i.observe(t.current, n), () => {
        i.disconnect();
      };
  }, [t]);
}
function Ee(e, t, n) {
  let r = e;
  return t !== void 0 && (r = Math.max(e, t)), n !== void 0 && (r = Math.min(r, n)), r;
}
const L1 = (e, t) => {
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
    const c = o.children.item(t).children.item(0), u = c.offsetLeft, d = c.offsetWidth, f = o.offsetWidth, m = o.scrollWidth, v = o.scrollLeft;
    if (m - f <= 0)
      return;
    const h = Ee(u - (f - d) / 2, 0, m - f);
    r.start({
      scrollLeft: h,
      from: {
        scrollLeft: v
      },
      immediate: a && !n.isAnimating
    });
  }
  return xe(() => {
    i(!0);
  }, []), Ai(() => {
    i();
  }, [t]), Wl(() => {
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
const Ki = "adm-scroll-mask", e9 = (e) => {
  const t = D(null), [{
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
  } = Ua((o = !1) => {
    if (!t.current)
      return;
    const c = e.scrollTrackRef.current;
    if (!c)
      return;
    const u = c.scrollLeft, d = u > 0, f = u + c.offsetWidth < c.scrollWidth;
    i.start({
      leftMaskOpacity: d ? 1 : 0,
      rightMaskOpacity: f ? 1 : 0,
      immediate: o
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return G(() => {
    a(!0);
  }, []), G(() => {
    const o = e.scrollTrackRef.current;
    if (!!o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), l.createElement(l.Fragment, null, l.createElement(fe.div, {
    ref: t,
    className: j(Ki, `${Ki}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(fe.div, {
    className: j(Ki, `${Ki}-right`),
    style: {
      opacity: r
    }
  }));
}, D1 = e9;
var Oa = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zl = Symbol.for("react.element"), Hl = Symbol.for("react.portal"), oo = Symbol.for("react.fragment"), so = Symbol.for("react.strict_mode"), lo = Symbol.for("react.profiler"), co = Symbol.for("react.provider"), uo = Symbol.for("react.context"), t9 = Symbol.for("react.server_context"), fo = Symbol.for("react.forward_ref"), mo = Symbol.for("react.suspense"), ho = Symbol.for("react.suspense_list"), vo = Symbol.for("react.memo"), po = Symbol.for("react.lazy"), n9 = Symbol.for("react.offscreen"), V1;
V1 = Symbol.for("react.module.reference");
function st(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Zl:
        switch (e = e.type, e) {
          case oo:
          case lo:
          case so:
          case mo:
          case ho:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case t9:
              case uo:
              case fo:
              case po:
              case vo:
              case co:
                return e;
              default:
                return t;
            }
        }
      case Hl:
        return t;
    }
  }
}
ae.ContextConsumer = uo;
ae.ContextProvider = co;
ae.Element = Zl;
ae.ForwardRef = fo;
ae.Fragment = oo;
ae.Lazy = po;
ae.Memo = vo;
ae.Portal = Hl;
ae.Profiler = lo;
ae.StrictMode = so;
ae.Suspense = mo;
ae.SuspenseList = ho;
ae.isAsyncMode = function() {
  return !1;
};
ae.isConcurrentMode = function() {
  return !1;
};
ae.isContextConsumer = function(e) {
  return st(e) === uo;
};
ae.isContextProvider = function(e) {
  return st(e) === co;
};
ae.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Zl;
};
ae.isForwardRef = function(e) {
  return st(e) === fo;
};
ae.isFragment = function(e) {
  return st(e) === oo;
};
ae.isLazy = function(e) {
  return st(e) === po;
};
ae.isMemo = function(e) {
  return st(e) === vo;
};
ae.isPortal = function(e) {
  return st(e) === Hl;
};
ae.isProfiler = function(e) {
  return st(e) === lo;
};
ae.isStrictMode = function(e) {
  return st(e) === so;
};
ae.isSuspense = function(e) {
  return st(e) === mo;
};
ae.isSuspenseList = function(e) {
  return st(e) === ho;
};
ae.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === oo || e === lo || e === so || e === mo || e === ho || e === n9 || typeof e == "object" && e !== null && (e.$$typeof === po || e.$$typeof === vo || e.$$typeof === co || e.$$typeof === uo || e.$$typeof === fo || e.$$typeof === V1 || e.getModuleId !== void 0);
};
ae.typeOf = st;
(function(e) {
  e.exports = ae;
})(Oa);
function un(e, t) {
  let n = 0;
  function r(i) {
    l.Children.forEach(i, (a) => {
      Oa.exports.isFragment(a) ? r(a.props.children) : (t(a, n), n += 1);
    });
  }
  r(e);
}
const zt = "adm-capsule-tabs", r9 = () => null, i9 = (e) => {
  var t;
  const n = D(null), r = D(null), i = {};
  let a = null;
  const o = [];
  un(e.children, (f, m) => {
    if (!Ln(f))
      return;
    const v = f.key;
    if (typeof v != "string")
      return;
    m === 0 && (a = v);
    const g = o.push(f);
    i[v] = g - 1;
  });
  const [s, c] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : a,
    onChange: (f) => {
      var m;
      f !== null && ((m = e.onChange) === null || m === void 0 || m.call(e, f));
    }
  }), {
    scrollLeft: u,
    animate: d
  } = L1(n, i[s]);
  return Ti(() => {
    d(!0);
  }, r), B(e, l.createElement("div", {
    className: zt,
    ref: r
  }, l.createElement("div", {
    className: `${zt}-header`
  }, l.createElement(D1, {
    scrollTrackRef: n
  }), l.createElement(fe.div, {
    className: `${zt}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((f) => B(f.props, l.createElement("div", {
    key: f.key,
    className: `${zt}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = f;
      f.props.disabled || m != null && c(m.toString());
    },
    className: j(`${zt}-tab`, {
      [`${zt}-tab-active`]: f.key === s,
      [`${zt}-tab-disabled`]: f.props.disabled
    })
  }, f.props.title)))))), o.map((f) => {
    if (f.props.children === void 0)
      return null;
    const m = f.key === s;
    return l.createElement(kr, {
      key: f.key,
      active: m,
      forceRender: f.props.forceRender,
      destroyOnClose: f.props.destroyOnClose
    }, l.createElement("div", {
      className: `${zt}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, f.props.children));
  })));
}, Ok = ie(i9, {
  Tab: r9
});
const Gi = "adm-card", a9 = (e) => {
  const t = () => e.title || e.extra ? l.createElement("div", {
    className: j(`${Gi}-header`, e.headerClassName),
    style: e.headerStyle,
    onClick: e.onHeaderClick
  }, l.createElement("div", {
    className: `${Gi}-header-title`
  }, e.title), e.extra) : null, n = () => e.children ? l.createElement("div", {
    className: j(`${Gi}-body`, e.bodyClassName),
    style: e.bodyStyle,
    onClick: e.onBodyClick
  }, e.children) : null;
  return B(e, l.createElement("div", {
    className: Gi,
    onClick: e.onClick
  }, t(), n()));
}, Fk = a9;
function ef(e, t, n) {
  return e * t * n / (t + n * e);
}
function vi(e, t, n, r, i = 0.15) {
  return i === 0 ? Ee(e, t, n) : e < t ? -ef(t - e, r, i) + t : e > n ? +ef(e - n, r, i) + n : e;
}
const go = !1;
function Me(e, t) {
  go && console.warn(`[antd-mobile: ${e}] ${t}`);
}
function o9(e, t) {
  go && console.error(`[antd-mobile: ${e}] ${t}`);
}
function j1(e) {
  if (e == null || e === "")
    return 0;
  const t = e.trim();
  return t.endsWith("px") ? parseFloat(t) : t.endsWith("rem") ? parseFloat(t) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : t.endsWith("vw") ? parseFloat(t) * window.innerWidth / 100 : 0;
}
const Nt = "adm-picker-view", B1 = De((e) => {
  const {
    value: t,
    column: n,
    renderLabel: r
  } = e;
  function i(w) {
    e.onSelect(w, e.index);
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
  })), s = D(!1), c = D(null), u = D(null), d = D(34);
  xe(() => {
    const w = u.current;
    !w || (d.current = j1(window.getComputedStyle(w).getPropertyValue("height")));
  }), xe(() => {
    if (s.current || t === null)
      return;
    const w = n.findIndex((y) => y.value === t);
    if (w < 0)
      return;
    const $ = w * -d.current;
    o.start({
      y: $,
      immediate: a.goal !== $
    });
  }, [t, n]), xe(() => {
    if (n.length === 0)
      t !== null && i(null);
    else if (!n.some((w) => w.value === t)) {
      const w = n[0];
      i(w.value);
    }
  }, [n, t]);
  function f(w) {
    const $ = w * -d.current;
    o.start({
      y: $
    });
    const y = n[w];
    !y || i(y.value);
  }
  const m = (w) => {
    const {
      direction: [, $],
      distance: [, y],
      velocity: [, p],
      offset: [, E],
      last: C
    } = w;
    return {
      direction: $,
      distance: y,
      velocity: p,
      offset: E,
      last: C
    };
  }, v = (w) => {
    s.current = !0;
    const $ = -((n.length - 1) * d.current), y = 0, {
      direction: p,
      last: E,
      velocity: C,
      offset: k
    } = m(w);
    if (E) {
      s.current = !1;
      const N = k + C * p * 50, P = Ee(N, $, y), F = -Math.round(P / d.current);
      f(F);
    } else {
      const N = k;
      o.start({
        y: vi(N, $, y, d.current * 50, 0.2)
      });
    }
  }, g = (w) => {
    s.current = !0;
    const $ = -((n.length - 1) * d.current), y = 0, {
      direction: p,
      last: E,
      velocity: C,
      distance: k
    } = m(w), N = -p, P = a.get();
    if (E) {
      s.current = !1;
      const F = C * N * 50, T = P + k * N + F, O = Ee(T, $, y), _ = -Math.round(O / d.current);
      f(_);
    } else {
      const F = P + k * N;
      o.start({
        y: vi(F, $, y, d.current * 50, 0.2)
      });
    }
  };
  Pt((w) => {
    w.event.stopPropagation(), v(w);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), h8((w) => {
    w.event.stopPropagation(), g(w);
  }, {
    target: e.mouseWheel ? c : void 0,
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  });
  let h = null;
  function b() {
    if (h === null)
      return null;
    const w = n[h], $ = h - 1, y = h + 1, p = n[$], E = n[y];
    return l.createElement("div", {
      className: `${Nt}-column-accessible`
    }, l.createElement("div", {
      className: `${Nt}-column-accessible-current`,
      role: "button",
      "aria-label": w ? `\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A${w.label}` : "\u5F53\u524D\u672A\u9009\u62E9"
    }, "-"), l.createElement("div", {
      className: `${Nt}-column-accessible-button`,
      onClick: () => {
        !p || f($);
      },
      role: p ? "button" : "text",
      "aria-label": p ? `\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A${p.label}` : "\u6CA1\u6709\u4E0A\u4E00\u9879"
    }, "-"), l.createElement("div", {
      className: `${Nt}-column-accessible-button`,
      onClick: () => {
        !E || f(y);
      },
      role: E ? "button" : "text",
      "aria-label": E ? `\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A${E.label}` : "\u6CA1\u6709\u4E0B\u4E00\u9879"
    }, "-"));
  }
  return l.createElement("div", {
    className: `${Nt}-column`
  }, l.createElement("div", {
    className: `${Nt}-item-height-measure`,
    ref: u
  }), l.createElement(fe.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${Nt}-column-wheel`,
    "aria-hidden": !0
  }, n.map((w, $) => {
    var y;
    const p = e.value === w.value;
    p && (h = $);
    function E() {
      s.current = !1, f($);
    }
    return l.createElement("div", {
      key: (y = w.key) !== null && y !== void 0 ? y : w.value,
      "data-selected": w.value === t,
      className: `${Nt}-column-item`,
      onClick: E,
      "aria-hidden": !p,
      "aria-label": p ? "active" : ""
    }, l.createElement("div", {
      className: `${Nt}-column-item-label`
    }, r(w)));
  })), b());
}, (e, t) => !(e.index !== t.index || e.value !== t.value || e.onSelect !== t.onSelect || e.renderLabel !== t.renderLabel || e.mouseWheel !== t.mouseWheel || !X5(e.column, t.column)));
B1.displayName = "Wheel";
function tf(e) {
  let t = null;
  return () => (t === null && (t = e()), t);
}
function W1(e, t) {
  const n = tf(() => (typeof e == "function" ? e(t) : e).map((o) => o.map((s) => typeof s == "string" ? {
    label: s,
    value: s
  } : s))), r = tf(() => t.map((a, o) => {
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
function Z1(e, t) {
  return re(() => W1(e, t), [e, t]);
}
const H1 = (e) => e.label;
var U1 = { exports: {} }, z1 = {};
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
function s9(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var l9 = typeof Object.is == "function" ? Object.is : s9, c9 = ur.useState, u9 = ur.useEffect, f9 = ur.useLayoutEffect, d9 = ur.useDebugValue;
function m9(e, t) {
  var n = t(), r = c9({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, a = r[1];
  return f9(function() {
    i.value = n, i.getSnapshot = t, Uo(i) && a({ inst: i });
  }, [e, n, t]), u9(function() {
    return Uo(i) && a({ inst: i }), e(function() {
      Uo(i) && a({ inst: i });
    });
  }, [e]), d9(n), n;
}
function Uo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !l9(e, n);
  } catch {
    return !0;
  }
}
function h9(e, t) {
  return t();
}
var v9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h9 : m9;
z1.useSyncExternalStore = ur.useSyncExternalStore !== void 0 ? ur.useSyncExternalStore : v9;
(function(e) {
  e.exports = z1;
})(U1);
let Ul = !1;
const Ps = /* @__PURE__ */ new Set();
function q1() {
  Ps.forEach((e) => {
    e();
  });
}
function Pk() {
  Ul = !0, q1(), ot.assign({
    skipAnimation: !0
  });
}
function Nk() {
  Ul = !1, q1(), ot.assign({
    skipAnimation: !1
  });
}
function nf() {
  return Ul;
}
function p9(e) {
  return Ps.add(e), () => {
    Ps.delete(e);
  };
}
function g9() {
  return U1.exports.useSyncExternalStore(p9, nf, nf);
}
const zo = "adm-spin-loading", y9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, b9 = {
  color: "default"
}, w9 = 15 * 3.14159265358979 * 2, E9 = De((e) => {
  var t;
  const n = U(b9, e), r = g9(), {
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
  return B(n, l.createElement(fe.div, {
    className: zo,
    style: {
      "--color": (t = y9[n.color]) !== null && t !== void 0 ? t : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${zo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(fe.circle, {
    className: `${zo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: w9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), zl = E9, er = "adm-picker-view", C9 = {
  defaultValue: [],
  renderLabel: H1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${er}-loading-content`
  }, l.createElement(zl, null))
}, K1 = De((e) => {
  const t = U(C9, e), [n, r] = q(t.value === void 0 ? t.defaultValue : t.value);
  G(() => {
    t.value !== void 0 && t.value !== n && r(t.value);
  }, [t.value]), G(() => {
    if (t.value === n)
      return;
    const s = window.setTimeout(() => {
      t.value !== void 0 && t.value !== n && r(t.value);
    }, 1e3);
    return () => {
      window.clearTimeout(s);
    };
  }, [t.value, n]);
  const i = Z1(t.columns, n), a = i.columns;
  l3(() => {
    var s;
    t.value !== n && ((s = t.onChange) === null || s === void 0 || s.call(t, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = Ze((s, c) => {
    r((u) => {
      const d = [...u];
      return d[c] = s, d;
    });
  }, []);
  return B(t, l.createElement("div", {
    className: `${er}`
  }, t.loading ? t.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(B1, {
    key: c,
    index: c,
    column: s,
    value: n[c],
    onSelect: o,
    renderLabel: t.renderLabel,
    mouseWheel: t.mouseWheel
  })), l.createElement("div", {
    className: `${er}-mask`
  }, l.createElement("div", {
    className: `${er}-mask-top`
  }), l.createElement("div", {
    className: `${er}-mask-middle`
  }), l.createElement("div", {
    className: `${er}-mask-bottom`
  })))));
});
K1.displayName = "PickerView";
const ql = K1, qt = "adm-picker", $9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: H1,
  destroyOnClose: !1,
  forceRender: !1
}, Kl = De(me((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U($9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (b) => {
      var w;
      b === !1 && ((w = i.onClose) === null || w === void 0 || w.call(i));
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
  ge(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (b) => {
      var w;
      const $ = W1(i.columns, b);
      (w = i.onConfirm) === null || w === void 0 || w.call(i, b, $);
    }
  })), d = Z1(i.columns, c), [f, m] = q(c);
  G(() => {
    f !== c && m(c);
  }, [a]), G(() => {
    a || m(c);
  }, [c]);
  const v = Zt((b, w) => {
    var $;
    m(b), a && (($ = i.onSelect) === null || $ === void 0 || $.call(i, b, w));
  }), g = B(i, l.createElement("div", {
    className: qt
  }, l.createElement("div", {
    className: `${qt}-header`
  }, l.createElement("a", {
    role: "button",
    className: `${qt}-header-button`,
    onClick: () => {
      var b;
      (b = i.onCancel) === null || b === void 0 || b.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${qt}-header-title`
  }, i.title), l.createElement("a", {
    role: "button",
    className: j(`${qt}-header-button`, i.loading && `${qt}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(f, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), l.createElement("div", {
    className: `${qt}-body`
  }, l.createElement(ql, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: f,
    mouseWheel: i.mouseWheel,
    onChange: v
  })))), h = l.createElement(Pi, {
    style: i.popupStyle,
    className: j(`${qt}-popup`, i.popupClassName),
    visible: a,
    position: "bottom",
    onMaskClick: () => {
      var b;
      !i.closeOnMaskClick || ((b = i.onCancel) === null || b === void 0 || b.call(i), o(!1));
    },
    getContainer: i.getContainer,
    destroyOnClose: i.destroyOnClose,
    afterShow: i.afterShow,
    afterClose: i.afterClose,
    onClick: i.onClick,
    forceRender: i.forceRender,
    stopPropagation: i.stopPropagation
  }, g, l.createElement(Or, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, h, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, d.items, s));
}));
Kl.displayName = "Picker";
function x9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(Kl, Object.assign({}, e, {
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
    }, r = Ni(l.createElement(n, null));
  });
}
const G1 = ie(Kl, {
  prompt: x9
});
function Y1(e) {
  const t = re(() => {
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
const X1 = me((e, t) => {
  const {
    options: n
  } = e, r = wi(e, ["options"]), i = Y1(n);
  return l.createElement(G1, Object.assign({}, r, {
    ref: t,
    columns: i
  }));
});
function _9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(X1, Object.assign({}, e, {
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
    }, r = Ni(l.createElement(n, null));
  });
}
const Ak = ie(X1, {
  prompt: _9
}), k9 = (e) => {
  const {
    options: t
  } = e, n = wi(e, ["options"]), r = Y1(t);
  return l.createElement(ql, Object.assign({}, n, {
    columns: r
  }));
}, Tk = k9;
const Ve = "adm-tabs", S9 = () => null, O9 = {
  activeLineMode: "auto",
  stretch: !0
}, F9 = (e) => {
  var t;
  const n = U(O9, e), r = D(null), i = D(null), a = {};
  let o = null;
  const s = [];
  un(n.children, (p, E) => {
    if (!Ln(p))
      return;
    const C = p.key;
    if (typeof C != "string")
      return;
    E === 0 && (o = C);
    const k = s.push(p);
    a[C] = k - 1;
  });
  const [c, u] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : o,
    onChange: (p) => {
      var E;
      p !== null && ((E = n.onChange) === null || E === void 0 || E.call(n, p));
    }
  }), [{
    x: d,
    width: f
  }, m] = Pe(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: v
  }, g] = Pe(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: h,
    rightMaskOpacity: b
  }, w] = Pe(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function $(p = !1) {
    const E = r.current;
    if (!E)
      return;
    const C = a[c];
    if (C === void 0) {
      m.start({
        x: 0,
        width: 0,
        immediate: !0
      });
      return;
    }
    const k = i.current;
    if (!k)
      return;
    const N = E.children.item(C + 1), P = N.children.item(0), F = P.offsetLeft, T = P.offsetWidth, O = N.offsetLeft, _ = N.offsetWidth, x = E.offsetWidth, S = E.scrollWidth, I = E.scrollLeft, A = k.offsetWidth;
    let V = 0, M = 0;
    if (n.activeLineMode === "auto" ? (V = F, M = T) : n.activeLineMode === "full" ? (V = O, M = _) : V = F + (T - A) / 2, m.start({
      x: V,
      width: M,
      immediate: p
    }), S - x <= 0)
      return;
    const W = Ee(F - (x - T) / 2, 0, S - x);
    g.start({
      scrollLeft: W,
      from: {
        scrollLeft: I
      },
      immediate: p
    });
  }
  xe(() => {
    $(!d.isAnimating);
  }, []), Ai(() => {
    $();
  }, [c]), Ti(() => {
    $(!d.isAnimating);
  }, r), Wl(() => {
    $(!d.isAnimating);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: y
  } = Ua((p = !1) => {
    const E = r.current;
    if (!E)
      return;
    const C = E.scrollLeft, k = C > 0, N = C + E.offsetWidth < E.scrollWidth;
    w.start({
      leftMaskOpacity: k ? 1 : 0,
      rightMaskOpacity: N ? 1 : 0,
      immediate: p
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return xe(() => {
    y(!0);
  }, []), B(n, l.createElement("div", {
    className: Ve
  }, l.createElement("div", {
    className: `${Ve}-header`
  }, l.createElement(fe.div, {
    className: j(`${Ve}-header-mask`, `${Ve}-header-mask-left`),
    style: {
      opacity: h
    }
  }), l.createElement(fe.div, {
    className: j(`${Ve}-header-mask`, `${Ve}-header-mask-right`),
    style: {
      opacity: b
    }
  }), l.createElement(fe.div, {
    className: `${Ve}-tab-list`,
    ref: r,
    scrollLeft: v,
    onScroll: y,
    role: "tablist"
  }, l.createElement(fe.div, {
    ref: i,
    className: `${Ve}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : f,
      x: d
    }
  }), s.map((p) => B(p.props, l.createElement("div", {
    key: p.key,
    className: j(`${Ve}-tab-wrapper`, {
      [`${Ve}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: E
      } = p;
      p.props.disabled || E != null && u(E.toString());
    },
    className: j(`${Ve}-tab`, {
      [`${Ve}-tab-active`]: p.key === c,
      [`${Ve}-tab-disabled`]: p.props.disabled
    }),
    role: "tab",
    "aria-selected": p.key === c
  }, p.props.title)))))), s.map((p) => {
    if (p.props.children === void 0)
      return null;
    const E = p.key === c;
    return l.createElement(kr, {
      key: p.key,
      active: E,
      forceRender: p.props.forceRender,
      destroyOnClose: p.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Ve}-content`,
      style: {
        display: E ? "block" : "none"
      }
    }, p.props.children));
  })));
}, rf = ie(F9, {
  Tab: S9
});
const Dr = "adm-list", P9 = {
  mode: "default"
}, N9 = me((e, t) => {
  const n = U(P9, e), r = D(null);
  return ge(t, () => ({
    get nativeElement() {
      return r.current;
    }
  })), B(n, l.createElement("div", {
    className: j(Dr, `${Dr}-${n.mode}`),
    ref: r
  }, n.header && l.createElement("div", {
    className: `${Dr}-header`
  }, n.header), l.createElement("div", {
    className: `${Dr}-body`
  }, l.createElement("div", {
    className: `${Dr}-body-inner`
  }, n.children))));
});
function Vt(e) {
  return e != null && e !== !1;
}
const At = "adm-list-item", A9 = (e) => {
  var t;
  const n = (t = e.clickable) !== null && t !== void 0 ? t : !!e.onClick, r = e.arrow === void 0 ? n : e.arrow, i = l.createElement("div", {
    className: `${At}-content`
  }, Vt(e.prefix) && l.createElement("div", {
    className: `${At}-content-prefix`
  }, e.prefix), l.createElement("div", {
    className: `${At}-content-main`
  }, Vt(e.title) && l.createElement("div", {
    className: `${At}-title`
  }, e.title), e.children, Vt(e.description) && l.createElement("div", {
    className: `${At}-description`
  }, e.description)), Vt(e.extra) && l.createElement("div", {
    className: `${At}-content-extra`
  }, e.extra), Vt(r) && l.createElement("div", {
    className: `${At}-content-arrow`
  }, r === !0 ? l.createElement(py, null) : r));
  return B(e, l.createElement(n ? "a" : "div", {
    className: j(`${At}`, n ? ["adm-plain-anchor"] : [], e.disabled && `${At}-disabled`),
    onClick: e.disabled ? void 0 : e.onClick
  }, i));
}, kt = ie(N9, {
  Item: A9
}), Q1 = ol(null), T9 = "adm-check-list", R9 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(v1, null)
}, M9 = (e) => {
  const t = U(R9, e), [n, r] = te(t);
  function i(d) {
    t.multiple ? r([...n, d]) : r([d]);
  }
  function a(d) {
    r(n.filter((f) => f !== d));
  }
  const {
    activeIcon: o,
    extra: s,
    disabled: c,
    readOnly: u
  } = t;
  return l.createElement(Q1.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: a,
      activeIcon: o,
      extra: s,
      disabled: c,
      readOnly: u
    }
  }, B(t, l.createElement(kt, {
    mode: t.mode,
    className: T9
  }, t.children)));
}, Yi = "adm-check-list-item", I9 = (e) => {
  const t = it(Q1);
  if (t === null)
    return Me("CheckList.Item", "CheckList.Item can only be used inside CheckList."), null;
  const n = t.value.includes(e.value), r = e.readOnly || t.readOnly, i = n ? t.activeIcon : null, a = t.extra ? t.extra(n) : i, o = l.createElement("div", {
    className: `${Yi}-extra`
  }, a);
  return B(e, l.createElement(kt.Item, {
    title: e.title,
    className: j(Yi, r && `${Yi}-readonly`, n && `${Yi}-active`),
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
}, af = ie(M9, {
  Item: I9
});
var J1 = gl, L9 = "Expected a function";
function Gl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(L9);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = e.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Gl.Cache || J1)(), n;
}
Gl.Cache = J1;
var of = Gl;
function e0(e) {
  const t = re(() => of((i) => {
    const a = [];
    let o = e;
    for (const s of i) {
      const c = o.find((u) => u.value === s);
      if (!c || (a.push(c), !c.children))
        break;
      o = c.children;
    }
    return a;
  }, (i) => JSON.stringify(i)), [e]), n = re(() => of((i) => i.reduce((o, s) => {
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
const Yl = [];
function D9(e, t) {
  const n = [];
  for (let r = e; r <= t; r++)
    n.push(r);
  return n;
}
const pi = "adm-skeleton", Xl = (e) => B(e, l.createElement("div", {
  className: j(pi, {
    [`${pi}-animated`]: e.animated
  })
})), V9 = (e) => B(e, l.createElement(Xl, {
  animated: e.animated,
  className: `${pi}-title`
})), j9 = {
  lineCount: 3
}, B9 = (e) => {
  const t = U(j9, e), n = D9(1, t.lineCount), r = l.createElement("div", {
    className: `${pi}-paragraph`
  }, n.map((i) => l.createElement(Xl, {
    key: i,
    animated: t.animated,
    className: `${pi}-paragraph-line`
  })));
  return B(t, r);
}, Xi = ie(Xl, {
  Title: V9,
  Paragraph: B9
}), ft = "adm-cascader-view", W9 = {
  defaultValue: []
}, Z9 = (e) => {
  const {
    locale: t
  } = pe(), n = U(W9, e), r = n.placeholder || t.Cascader.placeholder, [i, a] = te(Object.assign(Object.assign({}, n), {
    onChange: (m) => {
      var v;
      (v = n.onChange) === null || v === void 0 || v.call(n, m, c(m));
    }
  })), [o, s] = q(0);
  ml(() => {
    var m;
    (m = n.onTabsChange) === null || m === void 0 || m.call(n, o);
  }, [o]);
  const c = e0(n.options), u = re(() => {
    const m = [];
    let v = n.options, g = !1;
    for (const h of i) {
      const b = v.find((w) => w.value === h);
      if (m.push({
        selected: b,
        options: v
      }), !b || !b.children) {
        g = !0;
        break;
      }
      v = b.children;
    }
    return g || m.push({
      selected: void 0,
      options: v
    }), m;
  }, [i, n.options]);
  G(() => {
    s(u.length - 1);
  }, [i]), G(() => {
    const m = u.length - 1;
    o > m && s(m);
  }, [o, u]);
  const d = (m, v) => {
    const g = i.slice(0, v);
    m !== void 0 && (g[v] = m), a(g);
  }, f = (m) => n.loading || m === Yl;
  return B(n, l.createElement("div", {
    className: ft
  }, l.createElement(rf, {
    activeKey: o.toString(),
    onChange: (m) => {
      const v = parseInt(m);
      s(v);
    },
    stretch: !1,
    className: `${ft}-tabs`
  }, u.map((m, v) => {
    const g = m.selected;
    return l.createElement(rf.Tab, {
      key: v.toString(),
      title: l.createElement("div", {
        className: `${ft}-header-title`
      }, g ? g.label : typeof r == "function" ? r(v) : r),
      forceRender: !0
    }, l.createElement("div", {
      className: `${ft}-content`
    }, f(m.options) ? l.createElement("div", {
      className: `${ft}-skeleton`
    }, l.createElement(Xi, {
      className: `${ft}-skeleton-line-1`,
      animated: !0
    }), l.createElement(Xi, {
      className: `${ft}-skeleton-line-2`,
      animated: !0
    }), l.createElement(Xi, {
      className: `${ft}-skeleton-line-3`,
      animated: !0
    }), l.createElement(Xi, {
      className: `${ft}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(af, {
      value: [i[v]],
      onChange: (h) => d(h[0], v),
      activeIcon: n.activeIcon
    }, m.options.map((h) => {
      const b = i[v] === h.value;
      return l.createElement(af.Item, {
        value: h.value,
        key: h.value,
        disabled: h.disabled,
        className: j(`${ft}-item`, {
          [`${ft}-item-active`]: b
        })
      }, h.label);
    }))));
  }))));
}, H9 = ie(Z9, {
  optionSkeleton: Yl
}), Un = "adm-cascader", U9 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, t0 = me((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U(U9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel,
    placeholder: r.Cascader.placeholder
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (h) => {
      var b;
      h === !1 && ((b = i.onClose) === null || b === void 0 || b.call(i));
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
  ge(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var b;
      (b = i.onConfirm) === null || b === void 0 || b.call(i, h, d(h));
    }
  })), d = e0(i.options), [f, m] = q(c);
  G(() => {
    a || m(c);
  }, [a, c]);
  const v = B(i, l.createElement("div", {
    className: Un
  }, l.createElement("div", {
    className: `${Un}-header`
  }, l.createElement("a", {
    className: `${Un}-header-button`,
    onClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${Un}-header-title`
  }, i.title), l.createElement("a", {
    className: `${Un}-header-button`,
    onClick: () => {
      u(f, !0), o(!1);
    }
  }, i.confirmText)), l.createElement("div", {
    className: `${Un}-body`
  }, l.createElement(H9, Object.assign({}, i, {
    value: f,
    onChange: (h, b) => {
      var w;
      m(h), a && ((w = i.onSelect) === null || w === void 0 || w.call(i, h, b));
    }
  }))))), g = l.createElement(Pi, {
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
  }, v);
  return l.createElement(l.Fragment, null, g, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, d(c).items, s));
});
function z9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
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
    }, r = Ni(l.createElement(n, null));
  });
}
const Rk = ie(t0, {
  prompt: z9,
  optionSkeleton: Yl
});
const Vr = "adm-center-popup", q9 = Object.assign(Object.assign({}, Ml), {
  getContainer: null
}), K9 = (e) => {
  const t = U(q9, e), n = yl(), r = Pe({
    scale: t.visible ? 1 : 0.8,
    opacity: t.visible ? 1 : 0,
    config: {
      mass: 1.2,
      tension: 200,
      friction: 25,
      clamp: !0
    },
    onRest: () => {
      var d, f;
      n.current || (a(t.visible), t.visible ? (d = t.afterShow) === null || d === void 0 || d.call(t) : (f = t.afterClose) === null || f === void 0 || f.call(t));
    }
  }), [i, a] = q(t.visible);
  xe(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = D(null);
  za(o, t.disableBodyScroll && i);
  const s = w1(i && t.visible), c = l.createElement("div", {
    className: j(`${Vr}-body`, t.bodyClassName),
    style: t.bodyStyle
  }, t.children), u = an(t.stopPropagation, B(t, l.createElement("div", {
    className: Vr,
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, t.mask && l.createElement(Si, {
    visible: s,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (d) => {
      var f, m;
      (f = t.onMaskClick) === null || f === void 0 || f.call(t, d), t.closeOnMaskClick && ((m = t.onClose) === null || m === void 0 || m.call(t));
    },
    style: t.maskStyle,
    className: j(`${Vr}-mask`, t.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement("div", {
    className: `${Vr}-wrap`,
    role: t.role,
    "aria-label": t["aria-label"]
  }, l.createElement(fe.div, {
    style: r,
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: j(`${Vr}-close`, "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = t.onClose) === null || d === void 0 || d.call(t);
    }
  }, l.createElement(Oi, null)), c)))));
  return l.createElement(kr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, _r(t.getContainer, u));
}, n0 = K9;
const r0 = ol(null), G9 = {
  disabled: !1,
  defaultValue: []
}, Y9 = (e) => {
  const t = U(G9, e), [n, r] = te(t);
  return l.createElement(
    r0.Provider,
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
}, i0 = De((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), X9 = De((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), a0 = (e) => {
  const t = D(null), n = Zt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== e.checked && e.onChange(i);
  });
  return G(() => {
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
}, Kt = "adm-checkbox", Q9 = {
  defaultChecked: !1,
  indeterminate: !1
}, J9 = me((e, t) => {
  const n = it(r0), r = U(Q9, e);
  let [i, a] = te({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), o = r.disabled;
  const {
    value: s
  } = r;
  n && s !== void 0 && (go && (e.checked !== void 0 && Me("Checkbox", "When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work."), e.defaultChecked !== void 0 && Me("Checkbox", "When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.")), i = n.value.includes(s), a = (u) => {
    var d;
    u ? n.check(s) : n.uncheck(s), (d = r.onChange) === null || d === void 0 || d.call(r, u);
  }, o = o || n.disabled), ge(t, () => ({
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
  }, r.indeterminate ? l.createElement(X9, null) : i && l.createElement(i0, null));
  return B(r, l.createElement("label", {
    onClick: r.onClick,
    className: j(Kt, {
      [`${Kt}-checked`]: i && !r.indeterminate,
      [`${Kt}-indeterminate`]: r.indeterminate,
      [`${Kt}-disabled`]: o,
      [`${Kt}-block`]: r.block
    })
  }, l.createElement(a0, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${Kt}-content`
  }, r.children)));
}), sf = ie(J9, {
  Group: Y9
});
const Sn = "adm-collapse", eb = () => null, tb = (e) => {
  const {
    visible: t
  } = e, n = D(null), r = to(t, e.forceRender, e.destroyOnClose), [{
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
  return Jp(() => {
    if (!t)
      return;
    const o = n.current;
    !o || a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Ai(() => {
    const o = n.current;
    !o || (t ? a.start({
      height: o.offsetHeight
    }) : (a.start({
      height: o.offsetHeight,
      immediate: !0
    }), a.start({
      height: 0
    })));
  }, [t]), l.createElement(fe.div, {
    className: j(`${Sn}-panel-content`, {
      [`${Sn}-panel-content-active`]: t
    }),
    style: {
      height: i.to((o) => i.idle && t ? "auto" : o)
    }
  }, l.createElement("div", {
    className: `${Sn}-panel-content-inner`,
    ref: n
  }, l.createElement(kt.Item, null, r && e.children)));
}, nb = (e) => {
  const t = [];
  un(e.children, (o) => {
    !Ln(o) || typeof o.key != "string" || t.push(o);
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
        var u, d;
        (u = e.onChange) === null || u === void 0 || u.call(e, (d = c[0]) !== null && d !== void 0 ? d : null);
      }
    };
    return e.activeKey === void 0 ? s.value = void 0 : e.activeKey !== null && (s.value = [e.activeKey]), [null, void 0].includes(e.defaultActiveKey) || (s.defaultValue = [e.defaultActiveKey]), s;
  }, [r, i] = te(n()), a = r === null ? [] : Array.isArray(r) ? r : [r];
  return B(e, l.createElement("div", {
    className: Sn
  }, l.createElement(kt, null, t.map((o) => {
    const s = o.key, c = a.includes(s);
    function u(f) {
      var m, v;
      e.accordion ? i(c ? [] : [s]) : i(c ? a.filter((g) => g !== s) : [...a, s]), (v = (m = o.props).onClick) === null || v === void 0 || v.call(m, f);
    }
    const d = () => {
      let f = l.createElement(g1, null);
      return e.arrow !== void 0 && (f = e.arrow), o.props.arrow !== void 0 && (f = o.props.arrow), typeof f == "function" ? f(c) : l.createElement("div", {
        className: j(`${Sn}-arrow`, {
          [`${Sn}-arrow-active`]: c
        })
      }, f);
    };
    return l.createElement(l.Fragment, {
      key: s
    }, B(o.props, l.createElement(kt.Item, {
      className: `${Sn}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: d()
    }, o.props.title)), l.createElement(tb, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, Mk = ie(nb, {
  Panel: eb
});
var o0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(_t, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(o0);
const s0 = o0.exports;
var l0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(_t, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(l0);
const c0 = l0.exports, fr = "TILL_NOW";
Se.extend(Bl);
Se.extend(s0);
Se.extend(c0);
const Gt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function rb(e, t, n, r, i, a, o) {
  const s = [], c = t.getFullYear(), u = t.getMonth() + 1, d = t.getDate(), f = t.getHours(), m = t.getMinutes(), v = t.getSeconds(), g = n.getFullYear(), h = n.getMonth() + 1, b = n.getDate(), w = n.getHours(), $ = n.getMinutes(), y = n.getSeconds(), p = Gt[r], E = parseInt(e[0]), C = Se(Ns([e[0], e[1], "1"])), k = parseInt(e[1]), N = parseInt(e[2]), P = parseInt(e[3]), F = parseInt(e[4]), T = E === c, O = E === g, _ = T && k === u, x = O && k === h, S = _ && N === d, I = x && N === b, A = S && P === f, V = I && P === w, M = A && F === m, R = V && F === $, W = (Z, z, Y) => {
    let K = [];
    for (let we = Z; we <= z; we++)
      K.push(we);
    const _e = e.slice(0, Gt[Y]), ke = a == null ? void 0 : a[Y];
    return ke && typeof ke == "function" && (K = K.filter((we) => ke(we, {
      get date() {
        const se = [..._e, we.toString()];
        return Ns(se);
      }
    }))), K;
  };
  if (p >= Gt.year) {
    const Y = W(c, g, "year");
    s.push(Y.map((K) => ({
      label: i("year", K),
      value: K.toString()
    })));
  }
  if (p >= Gt.month) {
    const Y = W(T ? u : 1, O ? h : 12, "month");
    s.push(Y.map((K) => ({
      label: i("month", K),
      value: K.toString()
    })));
  }
  if (p >= Gt.day) {
    const Z = _ ? d : 1, z = x ? b : C.daysInMonth(), Y = W(Z, z, "day");
    s.push(Y.map((K) => ({
      label: i("day", K),
      value: K.toString()
    })));
  }
  if (p >= Gt.hour) {
    const Y = W(S ? f : 0, I ? w : 23, "hour");
    s.push(Y.map((K) => ({
      label: i("hour", K),
      value: K.toString()
    })));
  }
  if (p >= Gt.minute) {
    const Y = W(A ? m : 0, V ? $ : 59, "minute");
    s.push(Y.map((K) => ({
      label: i("minute", K),
      value: K.toString()
    })));
  }
  if (p >= Gt.second) {
    const Y = W(M ? v : 0, R ? y : 59, "second");
    s.push(Y.map((K) => ({
      label: i("second", K),
      value: K.toString()
    })));
  }
  if (o && (s[0].push({
    label: i("now", null),
    value: fr
  }), fr === (e == null ? void 0 : e[0])))
    for (let Z = 1; Z < s.length; Z += 1)
      s[Z] = [];
  return s;
}
function ib(e) {
  return e ? [e.getFullYear().toString(), (e.getMonth() + 1).toString(), e.getDate().toString(), e.getHours().toString(), e.getMinutes().toString(), e.getSeconds().toString()] : [];
}
function Ns(e) {
  var t, n, r, i, a, o;
  const s = (t = e[0]) !== null && t !== void 0 ? t : "1900", c = (n = e[1]) !== null && n !== void 0 ? n : "1", u = (r = e[2]) !== null && r !== void 0 ? r : "1", d = (i = e[3]) !== null && i !== void 0 ? i : "0", f = (a = e[4]) !== null && a !== void 0 ? a : "0", m = (o = e[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(d), parseInt(f), parseInt(m));
}
Se.extend(Bl);
Se.extend(s0);
Se.extend(c0);
const jr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function ab(e, t, n, r, i, a) {
  const o = [], s = t.getFullYear(), c = n.getFullYear(), u = jr[r], d = parseInt(e[0]), f = d === s, m = d === c, v = Se(t), g = Se(n), h = v.isoWeek(), b = g.isoWeek(), w = v.isoWeekday(), $ = g.isoWeekday(), y = parseInt(e[1]), p = f && y === h, E = m && y === b, C = Se(`${d}-01-01`).isoWeeksInYear(), k = (N, P, F) => {
    let T = [];
    for (let x = N; x <= P; x++)
      T.push(x);
    const O = e.slice(0, jr[F]), _ = a == null ? void 0 : a[F];
    return _ && typeof _ == "function" && (T = T.filter((x) => _(x, {
      get date() {
        const S = [...O, x.toString()];
        return u0(S);
      }
    }))), T;
  };
  if (u >= jr.year) {
    const F = k(s, c, "year");
    o.push(F.map((T) => ({
      label: i("year", T),
      value: T.toString()
    })));
  }
  if (u >= jr.week) {
    const F = k(f ? h : 1, m ? b : C, "week");
    o.push(F.map((T) => ({
      label: i("week", T),
      value: T.toString()
    })));
  }
  if (u >= jr["week-day"]) {
    const F = k(p ? w : 1, E ? $ : 7, "week-day");
    o.push(F.map((T) => ({
      label: i("week-day", T),
      value: T.toString()
    })));
  }
  return o;
}
function ob(e) {
  if (!e)
    return [];
  const t = Se(e);
  return [t.isoWeekYear().toString(), t.isoWeek().toString(), t.isoWeekday().toString()];
}
function u0(e) {
  var t, n, r;
  const i = (t = e[0]) !== null && t !== void 0 ? t : "1900", a = (n = e[1]) !== null && n !== void 0 ? n : "1", o = (r = e[2]) !== null && r !== void 0 ? r : "1";
  return Se().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const sb = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, f0 = (e, t) => {
  if (t.includes("week"))
    return ob(e);
  {
    const n = t;
    return ib(e).slice(0, sb[n]);
  }
}, As = (e, t) => {
  if ((e == null ? void 0 : e[0]) === fr) {
    const n = new Date();
    return n.tillNow = !0, n;
  }
  return t.includes("week") ? u0(e) : Ns(e);
}, d0 = (e, t, n, r, i, a, o) => r.startsWith("week") ? ab(e, t, n, r, i, a) : rb(e, t, n, r, i, a, o);
function m0(e) {
  const {
    locale: t
  } = pe();
  return Ze((n, r) => {
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
const lf = new Date().getFullYear(), lb = {
  min: new Date(new Date().setFullYear(lf - 10)),
  max: new Date(new Date().setFullYear(lf + 10)),
  precision: "day",
  defaultValue: null
}, h0 = me((e, t) => {
  const n = U(lb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var v;
      m !== null && ((v = n.onConfirm) === null || v === void 0 || v.call(n, m));
    }
  }), o = re(() => new Date(), []), s = m0(r), c = re(() => {
    let m = i != null ? i : o;
    return m.tillNow ? [fr] : (m = new Date(Ee(m.getTime(), n.min.getTime(), n.max.getTime())), f0(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Ze((m) => {
    const v = As(m, n.precision);
    a(v, !0);
  }, [a, n.precision]), d = Zt((m) => {
    var v;
    const g = As(m, n.precision);
    (v = n.onSelect) === null || v === void 0 || v.call(n, g);
  }), f = Ze((m) => d0(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return B(n, l.createElement(G1, {
    ref: t,
    columns: f,
    value: c,
    onCancel: n.onCancel,
    onClose: n.onClose,
    closeOnMaskClick: n.closeOnMaskClick,
    visible: n.visible,
    confirmText: n.confirmText,
    cancelText: n.cancelText,
    onConfirm: u,
    onSelect: d,
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
  }, (m, v) => {
    var g;
    return (g = n.children) === null || g === void 0 ? void 0 : g.call(n, i, v);
  }));
});
function cb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(h0, Object.assign({}, e, {
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
    }, r = Ni(l.createElement(n, null));
  });
}
const Ik = ie(h0, {
  prompt: cb,
  DATE_NOW: fr
}), cf = new Date().getFullYear(), ub = {
  min: new Date(new Date().setFullYear(cf - 10)),
  max: new Date(new Date().setFullYear(cf + 10)),
  precision: "day"
}, fb = (e) => {
  var t;
  const n = U(ub, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : null
  }), o = m0(r), s = re(() => i != null && i.tillNow ? [fr, null, null] : f0(i, n.precision), [i, n.precision]), c = Ze((u) => {
    var d;
    const f = As(u, n.precision);
    f && (a(f), (d = n.onChange) === null || d === void 0 || d.call(n, f));
  }, [n.onChange, n.precision]);
  return B(n, l.createElement(ql, {
    columns: (u) => d0(u, n.min, n.max, n.precision, o, n.filter, n.tillNow),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Lk = fb;
const db = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(on, {
    key: t.key,
    onClick: e.onAction,
    className: j("adm-dialog-button", {
      "adm-dialog-button-bold": t.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, mb = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, v0 = (e) => {
  const t = U(mb, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: wt("image-container")
  }, l.createElement(ao, {
    src: t.image,
    alt: "dialog header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: wt("header")
  }, l.createElement(hi, null, t.header)), !!t.title && l.createElement("div", {
    className: wt("title")
  }, t.title), l.createElement("div", {
    className: j(wt("content"), !t.content && wt("content-empty"))
  }, typeof t.content == "string" ? l.createElement(hi, null, t.content) : t.content), l.createElement("div", {
    className: wt("footer")
  }, t.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: wt("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(db, {
      key: o.key,
      action: o,
      onAction: () => Ce(void 0, void 0, void 0, function* () {
        var c, u, d;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = t.onAction) === null || u === void 0 ? void 0 : u.call(t, o, s)]), t.closeOnAction && ((d = t.onClose) === null || d === void 0 || d.call(t));
      })
    })));
  })));
  return l.createElement(n0, {
    className: j(wt(), t.className),
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
    bodyClassName: j(wt("body"), t.image && wt("with-image"), t.bodyClassName),
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
function wt(e = "") {
  return "adm-dialog" + (e && "-") + e;
}
const Ts = /* @__PURE__ */ new Set();
function Ql(e) {
  const t = Fr(l.createElement(v0, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Ts.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Ts.add(t.close), t;
}
function hb(e) {
  const t = {
    confirmText: Ei().locale.Dialog.ok
  }, n = U(t, e);
  return new Promise((r) => {
    Ql(Object.assign(Object.assign({}, n), {
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
const vb = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function pb(e) {
  const {
    locale: t
  } = Ei(), n = U(vb, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    Ql(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Ce(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Ce(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function gb() {
  Ts.forEach((e) => {
    e();
  });
}
const Dk = ie(v0, {
  show: Ql,
  alert: hb,
  confirm: pb,
  clear: gb
});
const Qi = "adm-divider", yb = {
  contentPosition: "center",
  direction: "horizontal"
}, bb = (e) => {
  const t = U(yb, e);
  return B(t, l.createElement("div", {
    className: j(Qi, `${Qi}-${t.direction}`, `${Qi}-${t.contentPosition}`)
  }, t.children && l.createElement("div", {
    className: `${Qi}-content`
  }, t.children)));
}, uf = bb;
const Dt = "adm-dropdown-item", wb = (e) => {
  var t;
  const n = j(Dt, {
    [`${Dt}-active`]: e.active,
    [`${Dt}-highlight`]: (t = e.highlight) !== null && t !== void 0 ? t : e.active
  });
  return B(e, l.createElement("div", {
    className: n,
    onClick: e.onClick
  }, l.createElement("div", {
    className: `${Dt}-title`
  }, l.createElement("span", {
    className: `${Dt}-title-text`
  }, e.title), l.createElement("span", {
    className: j(`${Dt}-title-arrow`, {
      [`${Dt}-title-arrow-active`]: e.active
    })
  }, e.arrow === void 0 ? l.createElement(dy, null) : e.arrow))));
}, Eb = wb, Cb = (e) => {
  const {
    active: t = !1
  } = e, n = to(t, e.forceRender, e.destroyOnClose), r = j(`${Dt}-content`, {
    [`${Dt}-content-hidden`]: !t
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: e.onClick
  }, e.children) : null;
}, zn = "adm-dropdown", $b = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Ml.getContainer
}, xb = me((e, t) => {
  const n = U($b, e), [r, i] = te({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = D(null), o = D(null);
  $d(() => {
    !n.closeOnClickAway || i(null);
  }, [a, o]);
  const [s, c] = q(), u = D(null);
  G(() => {
    const g = u.current;
    if (!!g && r) {
      const h = g.getBoundingClientRect();
      c(h.bottom);
    }
  }, [r]);
  const d = (g) => {
    i(r === g ? null : g);
  };
  let f = !1;
  const m = [], v = l.Children.map(n.children, (g) => {
    if (Ln(g)) {
      const h = Object.assign(Object.assign({}, g.props), {
        onClick: () => {
          d(g.key);
        },
        active: g.key === r,
        arrow: g.props.arrow === void 0 ? n.arrow : g.props.arrow
      });
      return m.push(g), g.props.forceRender && (f = !0), Nm(g, h);
    } else
      return g;
  });
  return ge(t, () => ({
    close: () => {
      i(null);
    }
  }), [i]), B(n, l.createElement("div", {
    className: j(zn, {
      [`${zn}-open`]: !!r
    }),
    ref: u
  }, l.createElement("div", {
    className: `${zn}-nav`,
    ref: a
  }, v), l.createElement(Pi, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${zn}-popup`,
    maskClassName: `${zn}-popup-mask`,
    bodyClassName: `${zn}-popup-body`,
    style: {
      top: s
    },
    forceRender: f,
    onMaskClick: n.closeOnMaskClick ? () => {
      d(null);
    } : void 0
  }, l.createElement("div", {
    ref: o
  }, m.map((g) => {
    const h = g.key === r;
    return l.createElement(Cb, {
      key: g.key,
      active: h,
      forceRender: g.props.forceRender,
      destroyOnClose: g.props.destroyOnClose
    }, g.props.children);
  })))));
}), _b = xb, Vk = ie(_b, {
  Item: Eb
});
var ff;
(function(e) {
  e[e.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", e[e.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", e[e.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", e[e.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", e[e.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", e[e.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", e[e.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", e[e.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", e[e.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", e[e.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", e[e.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", e[e.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", e[e.TAGS_START = 917504] = "TAGS_START", e[e.TAGS_END = 917631] = "TAGS_END", e[e.ZWJ = 8205] = "ZWJ";
})(ff || (ff = {}));
const kb = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var df;
function ca(e) {
  if (typeof e != "string")
    throw new TypeError("string cannot be undefined or null");
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; )
    r += Sb(n + r, e), Rb(e[n + r]) && r++, Nb(e[n + r]) && r++, Ab(e[n + r]) && r++, Mb(e[n + r]) ? r++ : (t.push(e.substring(n, n + r)), n += r, r = 0);
  return t;
}
function Sb(e, t) {
  const n = t[e];
  if (!Ob(n) || e === t.length - 1)
    return 1;
  const r = n + t[e + 1];
  let i = t.substring(e + 2, e + 5);
  return mf(r) && mf(i) ? 4 : Fb(r) && Tb(i) ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2 : Pb(i) ? 4 : 2;
}
function Ob(e) {
  return e && jn(e[0].charCodeAt(0), 55296, 56319);
}
function mf(e) {
  return jn(Jl(e), 127462, 127487);
}
function Fb(e) {
  return jn(Jl(e), 127988, 127988);
}
function Pb(e) {
  return jn(Jl(e), 127995, 127999);
}
function Nb(e) {
  return typeof e == "string" && jn(e.charCodeAt(0), 65024, 65039);
}
function Ab(e) {
  return typeof e == "string" && jn(e.charCodeAt(0), 8400, 8447);
}
function Tb(e) {
  const t = e.codePointAt(0);
  return typeof e == "string" && typeof t == "number" && jn(t, 917504, 917631);
}
function Rb(e) {
  return typeof e == "string" && kb.includes(e.charCodeAt(0));
}
function Mb(e) {
  return typeof e == "string" && e.charCodeAt(0) === 8205;
}
function Jl(e) {
  return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536;
}
function jn(e, t, n) {
  return e >= t && e <= n;
}
(function(e) {
  e[e.unit_1 = 1] = "unit_1", e[e.unit_2 = 2] = "unit_2", e[e.unit_4 = 4] = "unit_4";
})(df || (df = {}));
const Ib = "adm-ellipsis", Lb = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, Db = (e) => {
  const t = U(Lb, e), n = D(null), r = D(null), i = D(null), [a, o] = q({}), [s, c] = q(t.defaultExpanded), [u, d] = q(!1), f = re(() => ca(t.content), [t.content]);
  function m(w, $) {
    return f.slice(w, $).join("");
  }
  function v() {
    var w, $;
    const y = n.current;
    if (!y)
      return;
    const p = y.style.display;
    y.style.display = "block";
    const E = window.getComputedStyle(y), C = document.createElement("div");
    Array.prototype.slice.apply(E).forEach((F) => {
      C.style.setProperty(F, E.getPropertyValue(F));
    }), y.style.display = p, C.style.height = "auto", C.style.minHeight = "auto", C.style.maxHeight = "auto", C.style.textOverflow = "clip", C.style.whiteSpace = "normal", C.style.webkitLineClamp = "unset", C.style.display = "block";
    const N = qo(E.lineHeight), P = Math.floor(N * (t.rows + 0.5) + qo(E.paddingTop) + qo(E.paddingBottom));
    if (C.innerText = t.content, document.body.appendChild(C), C.offsetHeight <= P)
      d(!1);
    else {
      let x = function(V, M) {
        if (M - V <= 1)
          return t.direction === "end" ? {
            leading: m(0, V) + "..."
          } : {
            tailing: "..." + m(M, F)
          };
        const R = Math.round((V + M) / 2);
        return t.direction === "end" ? C.innerHTML = m(0, R) + "..." + _ : C.innerHTML = _ + "..." + m(R, F), C.offsetHeight <= P ? t.direction === "end" ? x(R, M) : x(V, R) : t.direction === "end" ? x(V, R) : x(R, M);
      }, S = function(V, M) {
        if (V[1] - V[0] <= 1 && M[1] - M[0] <= 1)
          return {
            leading: m(0, V[0]) + "...",
            tailing: "..." + m(M[1], F)
          };
        const R = Math.floor((V[0] + V[1]) / 2), W = Math.ceil((M[0] + M[1]) / 2);
        return C.innerHTML = m(0, R) + "..." + _ + "..." + m(W, F), C.offsetHeight <= P ? S([R, V[1]], [M[0], W]) : S([V[0], R], [W, M[1]]);
      };
      d(!0);
      const F = t.content.length, T = typeof t.collapseText == "string" ? t.collapseText : (w = i.current) === null || w === void 0 ? void 0 : w.innerHTML, O = typeof t.expandText == "string" ? t.expandText : ($ = r.current) === null || $ === void 0 ? void 0 : $.innerHTML, _ = s ? T : O, I = Math.floor((0 + F) / 2), A = t.direction === "middle" ? S([0, I], [I, F]) : x(0, F);
      o(A);
    }
    document.body.removeChild(C);
  }
  Ti(v, n), xe(() => {
    v();
  }, [t.content, t.direction, t.rows, t.expandText, t.collapseText]);
  const g = !!t.expandText && an(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, t.expandText)), h = !!t.collapseText && an(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, t.collapseText)), b = () => u ? s ? l.createElement(l.Fragment, null, t.content, h) : l.createElement(l.Fragment, null, a.leading, g, a.tailing) : t.content;
  return B(t, l.createElement("div", {
    ref: n,
    className: Ib,
    onClick: (w) => {
      w.target === w.currentTarget && t.onContentClick(w);
    }
  }, b()));
};
function qo(e) {
  if (!e)
    return 0;
  const t = e.match(/^\d*(\.\d*)?/);
  return t ? Number(t[0]) : 0;
}
const jk = Db;
const Vb = (e) => B(e, l.createElement("svg", {
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
}))))), Br = "adm-empty", jb = (e) => {
  function t() {
    const {
      image: n
    } = e;
    return n === void 0 ? l.createElement(Vb, {
      className: `${Br}-image`,
      style: e.imageStyle
    }) : typeof n == "string" ? l.createElement("img", {
      className: `${Br}-image`,
      style: e.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return B(e, l.createElement("div", {
    className: Br
  }, l.createElement("div", {
    className: `${Br}-image-container`
  }, t()), e.description && l.createElement("div", {
    className: j(`${Br}-description`)
  }, e.description)));
}, Bk = jb;
const dn = "adm-error-block", Bb = {
  status: "default"
};
function Wb(e) {
  return (n) => {
    var r;
    const i = U(Bb, n), {
      locale: a
    } = pe(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : e[i.status], d = typeof u == "string" ? l.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return B(i, l.createElement("div", {
      className: j(dn, {
        [`${dn}-full-page`]: i.fullPage
      })
    }, l.createElement("div", {
      className: `${dn}-image`
    }, d), l.createElement("div", {
      className: `${dn}-description`
    }, ![void 0, null].includes(c) && l.createElement("div", {
      className: `${dn}-description-title`
    }, c), ![void 0, null].includes(s) && l.createElement("div", {
      className: `${dn}-description-subtitle`
    }, s)), i.children && l.createElement("div", {
      className: `${dn}-content`
    }, i.children)));
  };
}
const Zb = l.createElement("svg", {
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
}))), Hb = l.createElement("svg", {
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
})))), Ub = l.createElement("svg", {
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
})))), zb = l.createElement("svg", {
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
})))), qb = {
  default: Zb,
  disconnected: Hb,
  empty: Ub,
  busy: zb
}, Kb = Wb(qb), Wk = Kb;
const Ji = "adm-floating-bubble", Gb = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, Yb = (e) => {
  const t = U(Gb, e), n = D(null), r = D(null), [i, a] = q(t.offset === void 0 ? t.defaultOffset : t.offset);
  G(() => {
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
  })), d = Pt((f) => {
    var m;
    let v = f.offset[0], g = f.offset[1];
    if (f.last && t.magnetic) {
      const b = n.current, w = r.current;
      if (!b || !w)
        return;
      const $ = b.getBoundingClientRect(), y = w.getBoundingClientRect();
      if (t.magnetic === "x") {
        const p = o.goal - o.get(), E = y.left + p - $.left, C = $.right - (y.right + p);
        C <= E ? v += C : v -= E;
      } else if (t.magnetic === "y") {
        const p = s.goal - s.get(), E = y.top + p - $.top, C = $.bottom - (y.bottom + p);
        C <= E ? g += C : g -= E;
      }
    }
    const h = {
      x: v,
      y: g
    };
    t.offset === void 0 ? u.start(h) : a(h), (m = t.onOffsetChange) === null || m === void 0 || m.call(t, h), u.start({
      opacity: f.active ? 0.8 : 1
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
  return B(t, l.createElement("div", {
    className: Ji
  }, l.createElement("div", {
    className: `${Ji}-boundary-outer`
  }, l.createElement("div", {
    className: `${Ji}-boundary`,
    ref: n
  })), l.createElement(fe.div, Object.assign({}, d(), {
    style: {
      opacity: c,
      transform: H7([o, s], (f, m) => `translate(${f}px, ${m}px)`)
    },
    onClick: t.onClick,
    className: `${Ji}-button`,
    ref: r
  }), t.children)));
}, Zk = Yb;
function ec(e, t) {
  return e.reduce((n, r) => Math.abs(n - t) < Math.abs(r - t) ? n : r);
}
const Wr = "adm-floating-panel", Xb = {
  handleDraggingOfContent: !0
}, Qb = me((e, t) => {
  var n, r;
  const i = U(Xb, e), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map(($) => -$), c = D(null), u = D(null), d = D(null), [f, m] = q(!1), v = D(!1), g = {
    top: s[s.length - 1],
    bottom: s[0]
  }, h = Zt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: b
  }, w] = Pe(() => ({
    y: g.bottom,
    config: {
      tension: 300
    },
    onChange: ($) => {
      h(-$.value.y, b.isAnimating);
    }
  }));
  return Pt(($) => {
    const [, y] = $.offset;
    if ($.first) {
      const C = $.event.target, k = u.current;
      if (k === C || (k == null ? void 0 : k.contains(C)))
        v.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = b.goal <= g.top, P = d.current;
        if (!P)
          return;
        N ? P.scrollTop <= 0 && $.direction[1] > 0 && (v.current = !0) : v.current = !0;
      }
    }
    if (m(v.current), !v.current)
      return;
    const {
      event: p
    } = $;
    p.cancelable && Nn && p.preventDefault(), p.stopPropagation();
    let E = y;
    $.last && (v.current = !1, m(!1), E = ec(s, y)), w.start({
      y: E
    });
  }, {
    axis: "y",
    bounds: g,
    rubberband: !0,
    from: () => [0, b.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  }), ge(t, () => ({
    setHeight: ($, y) => {
      w.start({
        y: -$,
        immediate: y == null ? void 0 : y.immediate
      });
    }
  }), [w]), za(c, !0), B(i, l.createElement(fe.div, {
    ref: c,
    className: Wr,
    style: {
      height: Math.round(o),
      translateY: b.to(($) => `calc(100% + (${Math.round($)}px))`)
    }
  }, l.createElement("div", {
    className: `${Wr}-mask`,
    style: {
      display: f ? "block" : "none"
    }
  }), l.createElement("div", {
    className: `${Wr}-header`,
    ref: u
  }, l.createElement("div", {
    className: `${Wr}-bar`
  })), l.createElement("div", {
    className: `${Wr}-content`,
    ref: d
  }, i.children)));
}), Hk = Qb;
function Fa() {
  return Fa = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fa.apply(this, arguments);
}
function Jb(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function tc(e, t) {
  if (e == null)
    return {};
  var n = Jb(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function Ye(e) {
  return Ye = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ye(e);
}
function ew(e, t) {
  if (Ye(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Ye(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function p0(e) {
  var t = ew(e, "string");
  return Ye(t) === "symbol" ? t : String(t);
}
function Le(e, t, n) {
  return t = p0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function hf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ee(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hf(Object(n), !0).forEach(function(r) {
      Le(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : hf(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Rs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function tw(e) {
  if (Array.isArray(e))
    return Rs(e);
}
function g0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function nc(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return Rs(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Rs(e, t);
  }
}
function nw() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ne(e) {
  return tw(e) || g0(e) || nc(e) || nw();
}
function Ri(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function vf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, p0(r.key), r);
  }
}
function Mi(e, t, n) {
  return t && vf(e.prototype, t), n && vf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function y0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ms(e, t) {
  return Ms = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ms(e, t);
}
function rw(e, t) {
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
  }), t && Ms(e, t);
}
function Pa(e) {
  return Pa = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Pa(e);
}
function iw() {
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
function aw(e, t) {
  if (t && (Ye(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return y0(e);
}
function ow(e) {
  var t = iw();
  return function() {
    var r = Pa(e), i;
    if (t) {
      var a = Pa(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return aw(this, i);
  };
}
var b0 = { exports: {} }, oe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne = typeof Symbol == "function" && Symbol.for, rc = Ne ? Symbol.for("react.element") : 60103, ic = Ne ? Symbol.for("react.portal") : 60106, yo = Ne ? Symbol.for("react.fragment") : 60107, bo = Ne ? Symbol.for("react.strict_mode") : 60108, wo = Ne ? Symbol.for("react.profiler") : 60114, Eo = Ne ? Symbol.for("react.provider") : 60109, Co = Ne ? Symbol.for("react.context") : 60110, ac = Ne ? Symbol.for("react.async_mode") : 60111, $o = Ne ? Symbol.for("react.concurrent_mode") : 60111, xo = Ne ? Symbol.for("react.forward_ref") : 60112, _o = Ne ? Symbol.for("react.suspense") : 60113, sw = Ne ? Symbol.for("react.suspense_list") : 60120, ko = Ne ? Symbol.for("react.memo") : 60115, So = Ne ? Symbol.for("react.lazy") : 60116, lw = Ne ? Symbol.for("react.block") : 60121, cw = Ne ? Symbol.for("react.fundamental") : 60117, uw = Ne ? Symbol.for("react.responder") : 60118, fw = Ne ? Symbol.for("react.scope") : 60119;
function Xe(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case rc:
        switch (e = e.type, e) {
          case ac:
          case $o:
          case yo:
          case wo:
          case bo:
          case _o:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case Co:
              case xo:
              case So:
              case ko:
              case Eo:
                return e;
              default:
                return t;
            }
        }
      case ic:
        return t;
    }
  }
}
function w0(e) {
  return Xe(e) === $o;
}
oe.AsyncMode = ac;
oe.ConcurrentMode = $o;
oe.ContextConsumer = Co;
oe.ContextProvider = Eo;
oe.Element = rc;
oe.ForwardRef = xo;
oe.Fragment = yo;
oe.Lazy = So;
oe.Memo = ko;
oe.Portal = ic;
oe.Profiler = wo;
oe.StrictMode = bo;
oe.Suspense = _o;
oe.isAsyncMode = function(e) {
  return w0(e) || Xe(e) === ac;
};
oe.isConcurrentMode = w0;
oe.isContextConsumer = function(e) {
  return Xe(e) === Co;
};
oe.isContextProvider = function(e) {
  return Xe(e) === Eo;
};
oe.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === rc;
};
oe.isForwardRef = function(e) {
  return Xe(e) === xo;
};
oe.isFragment = function(e) {
  return Xe(e) === yo;
};
oe.isLazy = function(e) {
  return Xe(e) === So;
};
oe.isMemo = function(e) {
  return Xe(e) === ko;
};
oe.isPortal = function(e) {
  return Xe(e) === ic;
};
oe.isProfiler = function(e) {
  return Xe(e) === wo;
};
oe.isStrictMode = function(e) {
  return Xe(e) === bo;
};
oe.isSuspense = function(e) {
  return Xe(e) === _o;
};
oe.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === yo || e === $o || e === wo || e === bo || e === _o || e === sw || typeof e == "object" && e !== null && (e.$$typeof === So || e.$$typeof === ko || e.$$typeof === Eo || e.$$typeof === Co || e.$$typeof === xo || e.$$typeof === cw || e.$$typeof === uw || e.$$typeof === fw || e.$$typeof === lw);
};
oe.typeOf = Xe;
(function(e) {
  e.exports = oe;
})(b0);
function Is(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(e, function(r) {
    r == null && !t.keepEmpty || (Array.isArray(r) ? n = n.concat(Is(r)) : b0.exports.isFragment(r) && r.props ? n = n.concat(Is(r.props.children, t)) : n.push(r));
  }), n;
}
var Ls = {}, dw = function(t) {
};
function mw(e, t) {
}
function hw(e, t) {
}
function vw() {
  Ls = {};
}
function E0(e, t, n) {
  !t && !Ls[n] && (e(!1, n), Ls[n] = !0);
}
function vt(e, t) {
  E0(mw, e, t);
}
function pw(e, t) {
  E0(hw, e, t);
}
vt.preMessage = dw;
vt.resetWarned = vw;
vt.noteOnce = pw;
var On = "RC_FORM_INTERNAL_HOOKS", le = function() {
  vt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Rn = /* @__PURE__ */ L.createContext({
  getFieldValue: le,
  getFieldsValue: le,
  getFieldError: le,
  getFieldWarning: le,
  getFieldsError: le,
  isFieldsTouched: le,
  isFieldTouched: le,
  isFieldValidating: le,
  isFieldsValidating: le,
  resetFields: le,
  setFields: le,
  setFieldValue: le,
  setFieldsValue: le,
  validateFields: le,
  submit: le,
  getInternalHooks: function() {
    return le(), {
      dispatch: le,
      initEntityValue: le,
      registerField: le,
      useSubscribe: le,
      setInitialValues: le,
      destroyForm: le,
      setCallbacks: le,
      registerWatch: le,
      getFields: le,
      setValidateMessages: le,
      setPreserve: le,
      getInitialValue: le
    };
  }
});
function Ds(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Bt() {
  Bt = function() {
    return e;
  };
  var e = {}, t = Object.prototype, n = t.hasOwnProperty, r = Object.defineProperty || function(O, _, x) {
    O[_] = x.value;
  }, i = typeof Symbol == "function" ? Symbol : {}, a = i.iterator || "@@iterator", o = i.asyncIterator || "@@asyncIterator", s = i.toStringTag || "@@toStringTag";
  function c(O, _, x) {
    return Object.defineProperty(O, _, {
      value: x,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), O[_];
  }
  try {
    c({}, "");
  } catch {
    c = function(x, S, I) {
      return x[S] = I;
    };
  }
  function u(O, _, x, S) {
    var I = _ && _.prototype instanceof m ? _ : m, A = Object.create(I.prototype), V = new P(S || []);
    return r(A, "_invoke", {
      value: E(O, x, V)
    }), A;
  }
  function d(O, _, x) {
    try {
      return {
        type: "normal",
        arg: O.call(_, x)
      };
    } catch (S) {
      return {
        type: "throw",
        arg: S
      };
    }
  }
  e.wrap = u;
  var f = {};
  function m() {
  }
  function v() {
  }
  function g() {
  }
  var h = {};
  c(h, a, function() {
    return this;
  });
  var b = Object.getPrototypeOf, w = b && b(b(F([])));
  w && w !== t && n.call(w, a) && (h = w);
  var $ = g.prototype = m.prototype = Object.create(h);
  function y(O) {
    ["next", "throw", "return"].forEach(function(_) {
      c(O, _, function(x) {
        return this._invoke(_, x);
      });
    });
  }
  function p(O, _) {
    function x(I, A, V, M) {
      var R = d(O[I], O, A);
      if (R.type !== "throw") {
        var W = R.arg, Z = W.value;
        return Z && Ye(Z) == "object" && n.call(Z, "__await") ? _.resolve(Z.__await).then(function(z) {
          x("next", z, V, M);
        }, function(z) {
          x("throw", z, V, M);
        }) : _.resolve(Z).then(function(z) {
          W.value = z, V(W);
        }, function(z) {
          return x("throw", z, V, M);
        });
      }
      M(R.arg);
    }
    var S;
    r(this, "_invoke", {
      value: function(A, V) {
        function M() {
          return new _(function(R, W) {
            x(A, V, R, W);
          });
        }
        return S = S ? S.then(M, M) : M();
      }
    });
  }
  function E(O, _, x) {
    var S = "suspendedStart";
    return function(I, A) {
      if (S === "executing")
        throw new Error("Generator is already running");
      if (S === "completed") {
        if (I === "throw")
          throw A;
        return T();
      }
      for (x.method = I, x.arg = A; ; ) {
        var V = x.delegate;
        if (V) {
          var M = C(V, x);
          if (M) {
            if (M === f)
              continue;
            return M;
          }
        }
        if (x.method === "next")
          x.sent = x._sent = x.arg;
        else if (x.method === "throw") {
          if (S === "suspendedStart")
            throw S = "completed", x.arg;
          x.dispatchException(x.arg);
        } else
          x.method === "return" && x.abrupt("return", x.arg);
        S = "executing";
        var R = d(O, _, x);
        if (R.type === "normal") {
          if (S = x.done ? "completed" : "suspendedYield", R.arg === f)
            continue;
          return {
            value: R.arg,
            done: x.done
          };
        }
        R.type === "throw" && (S = "completed", x.method = "throw", x.arg = R.arg);
      }
    };
  }
  function C(O, _) {
    var x = _.method, S = O.iterator[x];
    if (S === void 0)
      return _.delegate = null, x === "throw" && O.iterator.return && (_.method = "return", _.arg = void 0, C(O, _), _.method === "throw") || x !== "return" && (_.method = "throw", _.arg = new TypeError("The iterator does not provide a '" + x + "' method")), f;
    var I = d(S, O.iterator, _.arg);
    if (I.type === "throw")
      return _.method = "throw", _.arg = I.arg, _.delegate = null, f;
    var A = I.arg;
    return A ? A.done ? (_[O.resultName] = A.value, _.next = O.nextLoc, _.method !== "return" && (_.method = "next", _.arg = void 0), _.delegate = null, f) : A : (_.method = "throw", _.arg = new TypeError("iterator result is not an object"), _.delegate = null, f);
  }
  function k(O) {
    var _ = {
      tryLoc: O[0]
    };
    1 in O && (_.catchLoc = O[1]), 2 in O && (_.finallyLoc = O[2], _.afterLoc = O[3]), this.tryEntries.push(_);
  }
  function N(O) {
    var _ = O.completion || {};
    _.type = "normal", delete _.arg, O.completion = _;
  }
  function P(O) {
    this.tryEntries = [{
      tryLoc: "root"
    }], O.forEach(k, this), this.reset(!0);
  }
  function F(O) {
    if (O) {
      var _ = O[a];
      if (_)
        return _.call(O);
      if (typeof O.next == "function")
        return O;
      if (!isNaN(O.length)) {
        var x = -1, S = function I() {
          for (; ++x < O.length; )
            if (n.call(O, x))
              return I.value = O[x], I.done = !1, I;
          return I.value = void 0, I.done = !0, I;
        };
        return S.next = S;
      }
    }
    return {
      next: T
    };
  }
  function T() {
    return {
      value: void 0,
      done: !0
    };
  }
  return v.prototype = g, r($, "constructor", {
    value: g,
    configurable: !0
  }), r(g, "constructor", {
    value: v,
    configurable: !0
  }), v.displayName = c(g, s, "GeneratorFunction"), e.isGeneratorFunction = function(O) {
    var _ = typeof O == "function" && O.constructor;
    return !!_ && (_ === v || (_.displayName || _.name) === "GeneratorFunction");
  }, e.mark = function(O) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(O, g) : (O.__proto__ = g, c(O, s, "GeneratorFunction")), O.prototype = Object.create($), O;
  }, e.awrap = function(O) {
    return {
      __await: O
    };
  }, y(p.prototype), c(p.prototype, o, function() {
    return this;
  }), e.AsyncIterator = p, e.async = function(O, _, x, S, I) {
    I === void 0 && (I = Promise);
    var A = new p(u(O, _, x, S), I);
    return e.isGeneratorFunction(_) ? A : A.next().then(function(V) {
      return V.done ? V.value : A.next();
    });
  }, y($), c($, s, "Generator"), c($, a, function() {
    return this;
  }), c($, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(O) {
    var _ = Object(O), x = [];
    for (var S in _)
      x.push(S);
    return x.reverse(), function I() {
      for (; x.length; ) {
        var A = x.pop();
        if (A in _)
          return I.value = A, I.done = !1, I;
      }
      return I.done = !0, I;
    };
  }, e.values = F, P.prototype = {
    constructor: P,
    reset: function(_) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(N), !_)
        for (var x in this)
          x.charAt(0) === "t" && n.call(this, x) && !isNaN(+x.slice(1)) && (this[x] = void 0);
    },
    stop: function() {
      this.done = !0;
      var _ = this.tryEntries[0].completion;
      if (_.type === "throw")
        throw _.arg;
      return this.rval;
    },
    dispatchException: function(_) {
      if (this.done)
        throw _;
      var x = this;
      function S(W, Z) {
        return V.type = "throw", V.arg = _, x.next = W, Z && (x.method = "next", x.arg = void 0), !!Z;
      }
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var A = this.tryEntries[I], V = A.completion;
        if (A.tryLoc === "root")
          return S("end");
        if (A.tryLoc <= this.prev) {
          var M = n.call(A, "catchLoc"), R = n.call(A, "finallyLoc");
          if (M && R) {
            if (this.prev < A.catchLoc)
              return S(A.catchLoc, !0);
            if (this.prev < A.finallyLoc)
              return S(A.finallyLoc);
          } else if (M) {
            if (this.prev < A.catchLoc)
              return S(A.catchLoc, !0);
          } else {
            if (!R)
              throw new Error("try statement without catch or finally");
            if (this.prev < A.finallyLoc)
              return S(A.finallyLoc);
          }
        }
      }
    },
    abrupt: function(_, x) {
      for (var S = this.tryEntries.length - 1; S >= 0; --S) {
        var I = this.tryEntries[S];
        if (I.tryLoc <= this.prev && n.call(I, "finallyLoc") && this.prev < I.finallyLoc) {
          var A = I;
          break;
        }
      }
      A && (_ === "break" || _ === "continue") && A.tryLoc <= x && x <= A.finallyLoc && (A = null);
      var V = A ? A.completion : {};
      return V.type = _, V.arg = x, A ? (this.method = "next", this.next = A.finallyLoc, f) : this.complete(V);
    },
    complete: function(_, x) {
      if (_.type === "throw")
        throw _.arg;
      return _.type === "break" || _.type === "continue" ? this.next = _.arg : _.type === "return" ? (this.rval = this.arg = _.arg, this.method = "return", this.next = "end") : _.type === "normal" && x && (this.next = x), f;
    },
    finish: function(_) {
      for (var x = this.tryEntries.length - 1; x >= 0; --x) {
        var S = this.tryEntries[x];
        if (S.finallyLoc === _)
          return this.complete(S.completion, S.afterLoc), N(S), f;
      }
    },
    catch: function(_) {
      for (var x = this.tryEntries.length - 1; x >= 0; --x) {
        var S = this.tryEntries[x];
        if (S.tryLoc === _) {
          var I = S.completion;
          if (I.type === "throw") {
            var A = I.arg;
            N(S);
          }
          return A;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(_, x, S) {
      return this.delegate = {
        iterator: F(_),
        resultName: x,
        nextLoc: S
      }, this.method === "next" && (this.arg = void 0), f;
    }
  }, e;
}
function pf(e, t, n, r, i, a, o) {
  try {
    var s = e[a](o), c = s.value;
  } catch (u) {
    n(u);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function Oo(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, i) {
      var a = e.apply(t, n);
      function o(c) {
        pf(a, r, i, o, s, "next", c);
      }
      function s(c) {
        pf(a, r, i, o, s, "throw", c);
      }
      o(void 0);
    });
  };
}
function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Fn.apply(this, arguments);
}
function gw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, gi(e, t);
}
function Vs(e) {
  return Vs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Vs(e);
}
function gi(e, t) {
  return gi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, gi(e, t);
}
function yw() {
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
function ua(e, t, n) {
  return yw() ? ua = Reflect.construct.bind() : ua = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && gi(u, o.prototype), u;
  }, ua.apply(null, arguments);
}
function bw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function js(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return js = function(r) {
    if (r === null || !bw(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, i);
    }
    function i() {
      return ua(r, arguments, Vs(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), gi(i, r);
  }, js(e);
}
var ww = /%[sdj%]/g, Ew = function() {
};
typeof process < "u" && process.env;
function Bs(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var r = n.field;
    t[r] = t[r] || [], t[r].push(n);
  }), t;
}
function Ge(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var o = e.replace(ww, function(s) {
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
function Cw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Oe(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Cw(t) && typeof e == "string" && !e);
}
function $w(e, t, n) {
  var r = [], i = 0, a = e.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function gf(e, t, n) {
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
function xw(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var yf = /* @__PURE__ */ function(e) {
  gw(t, e);
  function t(n, r) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return t;
}(/* @__PURE__ */ js(Error));
function _w(e, t, n, r, i) {
  if (t.first) {
    var a = new Promise(function(m, v) {
      var g = function(w) {
        return r(w), w.length ? v(new yf(w, Bs(w))) : m(i);
      }, h = xw(e);
      gf(h, n, g);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), c = s.length, u = 0, d = [], f = new Promise(function(m, v) {
    var g = function(b) {
      if (d.push.apply(d, b), u++, u === c)
        return r(d), d.length ? v(new yf(d, Bs(d))) : m(i);
    };
    s.length || (r(d), m(i)), s.forEach(function(h) {
      var b = e[h];
      o.indexOf(h) !== -1 ? gf(b, n, g) : $w(b, n, g);
    });
  });
  return f.catch(function(m) {
    return m;
  }), f;
}
function kw(e) {
  return !!(e && e.message !== void 0);
}
function Sw(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function bf(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = Sw(t, e.fullFields) : r = t[n.field || e.fullField], kw(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function wf(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = Fn({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var C0 = function(t, n, r, i, a, o) {
  t.required && (!r.hasOwnProperty(t.field) || Oe(n, o || t.type)) && i.push(Ge(a.messages.required, t.fullField));
}, Ow = function(t, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Ge(a.messages.whitespace, t.fullField));
}, ea, Fw = function() {
  if (ea)
    return ea;
  var e = "[a-fA-F\\d:]", t = function(p) {
    return p && p.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), o = new RegExp("^" + n + "$"), s = new RegExp("^" + i + "$"), c = function(p) {
    return p && p.exact ? a : new RegExp("(?:" + t(p) + n + t(p) + ")|(?:" + t(p) + i + t(p) + ")", "g");
  };
  c.v4 = function(y) {
    return y && y.exact ? o : new RegExp("" + t(y) + n + t(y), "g");
  }, c.v6 = function(y) {
    return y && y.exact ? s : new RegExp("" + t(y) + i + t(y), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", d = "(?:\\S+(?::\\S*)?@)?", f = c.v4().source, m = c.v6().source, v = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", g = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", h = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", b = "(?::\\d{2,5})?", w = '(?:[/?#][^\\s"]*)?', $ = "(?:" + u + "|www\\.)" + d + "(?:localhost|" + f + "|" + m + "|" + v + g + h + ")" + b + w;
  return ea = new RegExp("(?:^" + $ + "$)", "i"), ea;
}, Ef = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Xr = {
  integer: function(t) {
    return Xr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Xr.number(t) && !Xr.integer(t);
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
    return typeof t == "object" && !Xr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(Ef.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Fw());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(Ef.hex);
  }
}, Pw = function(t, n, r, i, a) {
  if (t.required && n === void 0) {
    C0(t, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Xr[s](n) || i.push(Ge(a.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && i.push(Ge(a.messages.types[s], t.fullField, t.type));
}, Nw = function(t, n, r, i, a) {
  var o = typeof t.len == "number", s = typeof t.min == "number", c = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, d = n, f = null, m = typeof n == "number", v = typeof n == "string", g = Array.isArray(n);
  if (m ? f = "number" : v ? f = "string" : g && (f = "array"), !f)
    return !1;
  g && (d = n.length), v && (d = n.replace(u, "_").length), o ? d !== t.len && i.push(Ge(a.messages[f].len, t.fullField, t.len)) : s && !c && d < t.min ? i.push(Ge(a.messages[f].min, t.fullField, t.min)) : c && !s && d > t.max ? i.push(Ge(a.messages[f].max, t.fullField, t.max)) : s && c && (d < t.min || d > t.max) && i.push(Ge(a.messages[f].range, t.fullField, t.min, t.max));
}, qn = "enum", Aw = function(t, n, r, i, a) {
  t[qn] = Array.isArray(t[qn]) ? t[qn] : [], t[qn].indexOf(n) === -1 && i.push(Ge(a.messages[qn], t.fullField, t[qn].join(", ")));
}, Tw = function(t, n, r, i, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(Ge(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(n) || i.push(Ge(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Q = {
  required: C0,
  whitespace: Ow,
  type: Pw,
  range: Nw,
  enum: Aw,
  pattern: Tw
}, Rw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a, "string"), Oe(n, "string") || (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a), Q.pattern(t, n, i, o, a), t.whitespace === !0 && Q.whitespace(t, n, i, o, a));
  }
  r(o);
}, Mw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Iw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Lw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Dw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), Oe(n) || Q.type(t, n, i, o, a);
  }
  r(o);
}, Vw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, jw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Bw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    Q.required(t, n, i, o, a, "array"), n != null && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Ww = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Zw = "enum", Hw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q[Zw](t, n, i, o, a);
  }
  r(o);
}, Uw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a), Oe(n, "string") || Q.pattern(t, n, i, o, a);
  }
  r(o);
}, zw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n, "date") && !t.required)
      return r();
    if (Q.required(t, n, i, o, a), !Oe(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), Q.type(t, c, i, o, a), c && Q.range(t, c.getTime(), i, o, a);
    }
  }
  r(o);
}, qw = function(t, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  Q.required(t, n, i, o, a, s), r(o);
}, Ko = function(t, n, r, i, a) {
  var o = t.type, s = [], c = t.required || !t.required && i.hasOwnProperty(t.field);
  if (c) {
    if (Oe(n, o) && !t.required)
      return r();
    Q.required(t, n, i, s, a, o), Oe(n, o) || Q.type(t, n, i, s, a);
  }
  r(s);
}, Kw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a);
  }
  r(o);
}, ri = {
  string: Rw,
  method: Mw,
  number: Iw,
  boolean: Lw,
  regexp: Dw,
  integer: Vw,
  float: jw,
  array: Bw,
  object: Ww,
  enum: Hw,
  pattern: Uw,
  date: zw,
  url: Ko,
  hex: Ko,
  email: Ko,
  required: qw,
  any: Kw
};
function Ws() {
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
var Zs = Ws(), Ii = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Zs, this.define(n);
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
    return r && (this._messages = wf(Ws(), r)), this._messages;
  }, t.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function d(h) {
      var b = [], w = {};
      function $(p) {
        if (Array.isArray(p)) {
          var E;
          b = (E = b).concat.apply(E, p);
        } else
          b.push(p);
      }
      for (var y = 0; y < h.length; y++)
        $(h[y]);
      b.length ? (w = Bs(b), u(b, w)) : u(null, s);
    }
    if (c.messages) {
      var f = this.messages();
      f === Zs && (f = Ws()), wf(f, c.messages), c.messages = f;
    } else
      c.messages = this.messages();
    var m = {}, v = c.keys || Object.keys(this.rules);
    v.forEach(function(h) {
      var b = o.rules[h], w = s[h];
      b.forEach(function($) {
        var y = $;
        typeof y.transform == "function" && (s === r && (s = Fn({}, s)), w = s[h] = y.transform(w)), typeof y == "function" ? y = {
          validator: y
        } : y = Fn({}, y), y.validator = o.getValidationMethod(y), y.validator && (y.field = h, y.fullField = y.fullField || h, y.type = o.getType(y), m[h] = m[h] || [], m[h].push({
          rule: y,
          value: w,
          source: s,
          field: h
        }));
      });
    });
    var g = {};
    return _w(m, c, function(h, b) {
      var w = h.rule, $ = (w.type === "object" || w.type === "array") && (typeof w.fields == "object" || typeof w.defaultField == "object");
      $ = $ && (w.required || !w.required && h.value), w.field = h.field;
      function y(C, k) {
        return Fn({}, k, {
          fullField: w.fullField + "." + C,
          fullFields: w.fullFields ? [].concat(w.fullFields, [C]) : [C]
        });
      }
      function p(C) {
        C === void 0 && (C = []);
        var k = Array.isArray(C) ? C : [C];
        !c.suppressWarning && k.length && e.warning("async-validator:", k), k.length && w.message !== void 0 && (k = [].concat(w.message));
        var N = k.map(bf(w, s));
        if (c.first && N.length)
          return g[w.field] = 1, b(N);
        if (!$)
          b(N);
        else {
          if (w.required && !h.value)
            return w.message !== void 0 ? N = [].concat(w.message).map(bf(w, s)) : c.error && (N = [c.error(w, Ge(c.messages.required, w.field))]), b(N);
          var P = {};
          w.defaultField && Object.keys(h.value).map(function(O) {
            P[O] = w.defaultField;
          }), P = Fn({}, P, h.rule.fields);
          var F = {};
          Object.keys(P).forEach(function(O) {
            var _ = P[O], x = Array.isArray(_) ? _ : [_];
            F[O] = x.map(y.bind(null, O));
          });
          var T = new e(F);
          T.messages(c.messages), h.rule.options && (h.rule.options.messages = c.messages, h.rule.options.error = c.error), T.validate(h.value, h.rule.options || c, function(O) {
            var _ = [];
            N && N.length && _.push.apply(_, N), O && O.length && _.push.apply(_, O), b(_.length ? _ : null);
          });
        }
      }
      var E;
      if (w.asyncValidator)
        E = w.asyncValidator(w, h.value, p, h.source, c);
      else if (w.validator) {
        try {
          E = w.validator(w, h.value, p, h.source, c);
        } catch (C) {
          console.error == null || console.error(C), c.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), p(C.message);
        }
        E === !0 ? p() : E === !1 ? p(typeof w.message == "function" ? w.message(w.fullField || w.field) : w.message || (w.fullField || w.field) + " fails") : E instanceof Array ? p(E) : E instanceof Error && p(E.message);
      }
      E && E.then && E.then(function() {
        return p();
      }, function(C) {
        return p(C);
      });
    }, function(h) {
      d(h);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !ri.hasOwnProperty(r.type))
      throw new Error(Ge("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? ri.required : ri[this.getType(r)] || void 0;
  }, e;
}();
Ii.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  ri[t] = n;
};
Ii.warning = Ew;
Ii.messages = Zs;
Ii.validators = ri;
var qe = "'${name}' is not a valid ${type}", $0 = {
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
function x0(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null)
      return;
    n = n[t[r]];
  }
  return n;
}
function _0(e) {
  if (Array.isArray(e))
    return e;
}
function k0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Gw(e) {
  return _0(e) || g0(e) || nc(e) || k0();
}
function S0(e, t, n, r) {
  if (!t.length)
    return n;
  var i = Gw(t), a = i[0], o = i.slice(1), s;
  return !e && typeof a == "number" ? s = [] : Array.isArray(e) ? s = ne(e) : s = ee({}, e), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = S0(s[a], o, n, r), s;
}
function Yw(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !x0(e, t.slice(0, -1)) ? e : S0(e, t, n, r);
}
function Fo(e) {
  return Array.isArray(e) ? Qw(e) : Ye(e) === "object" && e !== null ? Xw(e) : e;
}
function Xw(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var n in e)
      t[n] = Fo(e[n]);
    return t;
  }
  return e;
}
function Qw(e) {
  return e.map(function(t) {
    return Fo(t);
  });
}
function be(e) {
  return Ds(e);
}
function tn(e, t) {
  var n = x0(e, t);
  return n;
}
function Qt(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = Yw(e, t, n, r);
  return i;
}
function Cf(e, t) {
  var n = {};
  return t.forEach(function(r) {
    var i = tn(e, r);
    n = Qt(n, r, i);
  }), n;
}
function ii(e, t) {
  return e && e.some(function(n) {
    return F0(n, t);
  });
}
function $f(e) {
  return Ye(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function O0(e, t) {
  var n = Array.isArray(e) ? ne(e) : ee({}, e);
  return t && Object.keys(t).forEach(function(r) {
    var i = n[r], a = t[r], o = $f(i) && $f(a);
    n[r] = o ? O0(i, a || {}) : Fo(a);
  }), n;
}
function fa(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return O0(i, a);
  }, e);
}
function F0(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(n, r) {
    return t[r] === n;
  });
}
function Jw(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || Ye(e) !== "object" || Ye(t) !== "object")
    return !1;
  var n = Object.keys(e), r = Object.keys(t), i = new Set([].concat(n, r));
  return ne(i).every(function(a) {
    var o = e[a], s = t[a];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function eE(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && Ye(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function xf(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r)
    return e;
  var i = e[t], a = t - n;
  return a > 0 ? [].concat(ne(e.slice(0, n)), [i], ne(e.slice(n, t)), ne(e.slice(t + 1, r))) : a < 0 ? [].concat(ne(e.slice(0, t)), ne(e.slice(t + 1, n + 1)), [i], ne(e.slice(n + 1, r))) : e;
}
var tE = Ii;
function nE(e, t) {
  return e.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return t[r];
  });
}
var _f = "CODE_LOGIC_ERROR";
function Hs(e, t, n, r, i) {
  return Us.apply(this, arguments);
}
function Us() {
  return Us = Oo(/* @__PURE__ */ Bt().mark(function e(t, n, r, i, a) {
    var o, s, c, u, d, f, m, v, g;
    return Bt().wrap(function(b) {
      for (; ; )
        switch (b.prev = b.next) {
          case 0:
            return o = ee({}, r), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (w) {
                return console.error(w), Promise.reject(_f);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new tE(Le({}, t, [o])), d = fa({}, $0, i.validateMessages), u.messages(d), f = [], b.prev = 9, b.next = 12, Promise.resolve(u.validate(Le({}, t, n), ee({}, i)));
          case 12:
            b.next = 17;
            break;
          case 14:
            b.prev = 14, b.t0 = b.catch(9), b.t0.errors && (f = b.t0.errors.map(function(w, $) {
              var y = w.message, p = y === _f ? d.default : y;
              return /* @__PURE__ */ L.isValidElement(p) ? /* @__PURE__ */ L.cloneElement(p, {
                key: "error_".concat($)
              }) : p;
            }));
          case 17:
            if (!(!f.length && c)) {
              b.next = 22;
              break;
            }
            return b.next = 20, Promise.all(n.map(function(w, $) {
              return Hs("".concat(t, ".").concat($), w, c, i, a);
            }));
          case 20:
            return m = b.sent, b.abrupt("return", m.reduce(function(w, $) {
              return [].concat(ne(w), ne($));
            }, []));
          case 22:
            return v = ee(ee({}, r), {}, {
              name: t,
              enum: (r.enum || []).join(", ")
            }, a), g = f.map(function(w) {
              return typeof w == "string" ? nE(w, v) : w;
            }), b.abrupt("return", g);
          case 25:
          case "end":
            return b.stop();
        }
    }, e, null, [[9, 14]]);
  })), Us.apply(this, arguments);
}
function rE(e, t, n, r, i, a) {
  var o = e.join("."), s = n.map(function(d, f) {
    var m = d.validator, v = ee(ee({}, d), {}, {
      ruleIndex: f
    });
    return m && (v.validator = function(g, h, b) {
      var w = !1, $ = function() {
        for (var E = arguments.length, C = new Array(E), k = 0; k < E; k++)
          C[k] = arguments[k];
        Promise.resolve().then(function() {
          vt(!w, "Your validator function has already return a promise. `callback` will be ignored."), w || b.apply(void 0, C);
        });
      }, y = m(g, h, $);
      w = y && typeof y.then == "function" && typeof y.catch == "function", vt(w, "`callback` is deprecated. Please return a promise instead."), w && y.then(function() {
        b();
      }).catch(function(p) {
        b(p || " ");
      });
    }), v;
  }).sort(function(d, f) {
    var m = d.warningOnly, v = d.ruleIndex, g = f.warningOnly, h = f.ruleIndex;
    return !!m == !!g ? v - h : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var d = Oo(/* @__PURE__ */ Bt().mark(function f(m, v) {
        var g, h, b;
        return Bt().wrap(function($) {
          for (; ; )
            switch ($.prev = $.next) {
              case 0:
                g = 0;
              case 1:
                if (!(g < s.length)) {
                  $.next = 12;
                  break;
                }
                return h = s[g], $.next = 5, Hs(o, t, h, r, a);
              case 5:
                if (b = $.sent, !b.length) {
                  $.next = 9;
                  break;
                }
                return v([{
                  errors: b,
                  rule: h
                }]), $.abrupt("return");
              case 9:
                g += 1, $.next = 1;
                break;
              case 12:
                m([]);
              case 13:
              case "end":
                return $.stop();
            }
        }, f);
      }));
      return function(f, m) {
        return d.apply(this, arguments);
      };
    }());
  else {
    var u = s.map(function(d) {
      return Hs(o, t, d, r, a).then(function(f) {
        return {
          errors: f,
          rule: d
        };
      });
    });
    c = (i ? aE(u) : iE(u)).then(function(d) {
      return Promise.reject(d);
    });
  }
  return c.catch(function(d) {
    return d;
  }), c;
}
function iE(e) {
  return zs.apply(this, arguments);
}
function zs() {
  return zs = Oo(/* @__PURE__ */ Bt().mark(function e(t) {
    return Bt().wrap(function(r) {
      for (; ; )
        switch (r.prev = r.next) {
          case 0:
            return r.abrupt("return", Promise.all(t).then(function(i) {
              var a, o = (a = []).concat.apply(a, ne(i));
              return o;
            }));
          case 1:
          case "end":
            return r.stop();
        }
    }, e);
  })), zs.apply(this, arguments);
}
function aE(e) {
  return qs.apply(this, arguments);
}
function qs() {
  return qs = Oo(/* @__PURE__ */ Bt().mark(function e(t) {
    var n;
    return Bt().wrap(function(i) {
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
  })), qs.apply(this, arguments);
}
var oE = ["name"], Je = [];
function kf(e, t, n, r, i, a) {
  return typeof e == "function" ? e(t, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var oc = /* @__PURE__ */ function(e) {
  rw(n, e);
  var t = ow(n);
  function n(r) {
    var i;
    if (Ri(this, n), i = t.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = Je, i.warnings = Je, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, d = c.isListField, f = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(d, u, be(f)), i.cancelRegisterFunc = null;
    }, i.getNamePath = function() {
      var c = i.props, u = c.name, d = c.fieldContext, f = d.prefixName, m = f === void 0 ? [] : f;
      return u !== void 0 ? [].concat(ne(m), ne(u)) : [];
    }, i.getRules = function() {
      var c = i.props, u = c.rules, d = u === void 0 ? [] : u, f = c.fieldContext;
      return d.map(function(m) {
        return typeof m == "function" ? m(f) : m;
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
      u == null || u(ee(ee({}, i.getMeta()), {}, {
        destroy: c
      }));
    }, i.onStoreChange = function(c, u, d) {
      var f = i.props, m = f.shouldUpdate, v = f.dependencies, g = v === void 0 ? [] : v, h = f.onReset, b = d.store, w = i.getNamePath(), $ = i.getValue(c), y = i.getValue(b), p = u && ii(u, w);
      switch (d.type === "valueUpdate" && d.source === "external" && $ !== y && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = Je, i.warnings = Je, i.triggerMetaEvent()), d.type) {
        case "reset":
          if (!u || p) {
            i.touched = !1, i.dirty = !1, i.validatePromise = null, i.errors = Je, i.warnings = Je, i.triggerMetaEvent(), h == null || h(), i.refresh();
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
          if (p) {
            var E = d.data;
            "touched" in E && (i.touched = E.touched), "validating" in E && !("originRCField" in E) && (i.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (i.errors = E.errors || Je), "warnings" in E && (i.warnings = E.warnings || Je), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !w.length && kf(m, c, b, $, y, d)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var C = g.map(be);
          if (C.some(function(k) {
            return ii(d.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (p || (!g.length || w.length || m) && kf(m, c, b, $, y, d)) {
            i.reRender();
            return;
          }
          break;
      }
      m === !0 && i.reRender();
    }, i.validateRules = function(c) {
      var u = i.getNamePath(), d = i.getValue(), f = Promise.resolve().then(function() {
        if (!i.mounted)
          return [];
        var m = i.props, v = m.validateFirst, g = v === void 0 ? !1 : v, h = m.messageVariables, b = c || {}, w = b.triggerName, $ = i.getRules();
        w && ($ = $.filter(function(p) {
          return p;
        }).filter(function(p) {
          var E = p.validateTrigger;
          if (!E)
            return !0;
          var C = Ds(E);
          return C.includes(w);
        }));
        var y = rE(u, d, $, c, g, h);
        return y.catch(function(p) {
          return p;
        }).then(function() {
          var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Je;
          if (i.validatePromise === f) {
            var E;
            i.validatePromise = null;
            var C = [], k = [];
            (E = p.forEach) === null || E === void 0 || E.call(p, function(N) {
              var P = N.rule.warningOnly, F = N.errors, T = F === void 0 ? Je : F;
              P ? k.push.apply(k, ne(T)) : C.push.apply(C, ne(T));
            }), i.errors = C, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), y;
      });
      return i.validatePromise = f, i.dirty = !0, i.errors = Je, i.warnings = Je, i.triggerMetaEvent(), i.reRender(), f;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(On), d = u.getInitialValue;
      return d(i.getNamePath()) !== void 0;
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
        return ee(ee({}, i.getOnlyChild(c(i.getControlled(), u, i.props.fieldContext))), {}, {
          isFunction: !0
        });
      }
      var d = Is(c);
      return d.length !== 1 || !/* @__PURE__ */ L.isValidElement(d[0]) ? {
        child: d,
        isFunction: !1
      } : {
        child: d[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, d = i.getNamePath();
      return tn(c || u(!0), d);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, d = u.trigger, f = u.validateTrigger, m = u.getValueFromEvent, v = u.normalize, g = u.valuePropName, h = u.getValueProps, b = u.fieldContext, w = f !== void 0 ? f : b.validateTrigger, $ = i.getNamePath(), y = b.getInternalHooks, p = b.getFieldsValue, E = y(On), C = E.dispatch, k = i.getValue(), N = h || function(O) {
        return Le({}, g, O);
      }, P = c[d], F = ee(ee({}, c), N(k));
      F[d] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var O, _ = arguments.length, x = new Array(_), S = 0; S < _; S++)
          x[S] = arguments[S];
        m ? O = m.apply(void 0, x) : O = eE.apply(void 0, [g].concat(x)), v && (O = v(O, k, p(!0))), C({
          type: "updateValue",
          namePath: $,
          value: O
        }), P && P.apply(void 0, x);
      };
      var T = Ds(w || []);
      return T.forEach(function(O) {
        var _ = F[O];
        F[O] = function() {
          _ && _.apply(void 0, arguments);
          var x = i.props.rules;
          x && x.length && C({
            type: "validateField",
            namePath: $,
            triggerName: O
          });
        };
      }), F;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(On), s = o.initEntityValue;
      s(y0(i));
    }
    return i;
  }
  return Mi(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, c = s(On), u = c.registerField;
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
      return c ? u = s : /* @__PURE__ */ L.isValidElement(s) ? u = /* @__PURE__ */ L.cloneElement(s, this.getControlled(s.props)) : (vt(!s, "`children` of Field is not validate ReactElement."), u = s), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
oc.contextType = Rn;
oc.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function sc(e) {
  var t = e.name, n = tc(e, oE), r = L.useContext(Rn), i = t !== void 0 ? be(t) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(oc, Fa({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var sE = /* @__PURE__ */ L.createContext(null), P0 = function(t) {
  var n = t.name, r = t.initialValue, i = t.children, a = t.rules, o = t.validateTrigger, s = L.useContext(Rn), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = L.useMemo(function() {
    var g = be(s.prefixName) || [];
    return [].concat(ne(g), ne(be(n)));
  }, [s.prefixName, n]), f = L.useMemo(function() {
    return ee(ee({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), m = L.useMemo(function() {
    return {
      getKey: function(h) {
        var b = d.length, w = h[b];
        return [u.keys[w], h.slice(b + 1)];
      }
    };
  }, [d]);
  if (typeof i != "function")
    return vt(!1, "Form.List only accepts function as children."), null;
  var v = function(h, b, w) {
    var $ = w.source;
    return $ === "internal" ? !1 : h !== b;
  };
  return /* @__PURE__ */ L.createElement(sE.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: f
  }, /* @__PURE__ */ L.createElement(sc, {
    name: [],
    shouldUpdate: v,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(g, h) {
    var b = g.value, w = b === void 0 ? [] : b, $ = g.onChange, y = s.getFieldValue, p = function() {
      var N = y(d || []);
      return N || [];
    }, E = {
      add: function(N, P) {
        var F = p();
        P >= 0 && P <= F.length ? (u.keys = [].concat(ne(u.keys.slice(0, P)), [u.id], ne(u.keys.slice(P))), $([].concat(ne(F.slice(0, P)), [N], ne(F.slice(P))))) : (u.keys = [].concat(ne(u.keys), [u.id]), $([].concat(ne(F), [N]))), u.id += 1;
      },
      remove: function(N) {
        var P = p(), F = new Set(Array.isArray(N) ? N : [N]);
        F.size <= 0 || (u.keys = u.keys.filter(function(T, O) {
          return !F.has(O);
        }), $(P.filter(function(T, O) {
          return !F.has(O);
        })));
      },
      move: function(N, P) {
        if (N !== P) {
          var F = p();
          N < 0 || N >= F.length || P < 0 || P >= F.length || (u.keys = xf(u.keys, N, P), $(xf(F, N, P)));
        }
      }
    }, C = w || [];
    return Array.isArray(C) || (C = []), i(C.map(function(k, N) {
      var P = u.keys[N];
      return P === void 0 && (u.keys[N] = u.id, P = u.keys[N], u.id += 1), {
        name: N,
        key: P,
        isListField: !0
      };
    }), E, h);
  })));
};
function lE(e, t) {
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
    } catch (d) {
      u = !0, i = d;
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
function yi(e, t) {
  return _0(e) || lE(e, t) || nc(e, t) || k0();
}
function cE(e) {
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
var N0 = "__@field_split__";
function Go(e) {
  return e.map(function(t) {
    return "".concat(Ye(t), ":").concat(t);
  }).join(N0);
}
var Kn = /* @__PURE__ */ function() {
  function e() {
    Ri(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return Mi(e, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(Go(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(Go(n));
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
      this.kvs.delete(Go(n));
    }
  }, {
    key: "map",
    value: function(n) {
      return ne(this.kvs.entries()).map(function(r) {
        var i = yi(r, 2), a = i[0], o = i[1], s = a.split(N0);
        return n({
          key: s.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), d = yi(u, 3), f = d[1], m = d[2];
            return f === "number" ? Number(m) : m;
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
}(), uE = ["name", "errors"], fE = /* @__PURE__ */ Mi(function e(t) {
  var n = this;
  Ri(this, e), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === On ? (n.formHooked = !0, {
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
      var a, o = fa({}, r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(s) {
        var c = s.key;
        o = Qt(o, c, tn(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new Kn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = tn(n.initialValues, r);
    return r.length ? Fo(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Kn();
    return n.getFieldEntities(r).forEach(function(a) {
      var o = a.getNamePath();
      i.set(o, a);
    }), i;
  }, this.getFieldEntitiesForNamePathList = function(r) {
    if (!r)
      return n.getFieldEntities(!0);
    var i = n.getFieldsMap(!0);
    return r.map(function(a) {
      var o = be(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: be(a)
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
          var d = "getMeta" in s ? s.getMeta() : null;
          i(d) && o.push(u);
        }
    }), Cf(n.store, o.map(be));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = be(r);
    return tn(n.store, i);
  }, this.getFieldsError = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntitiesForNamePathList(r);
    return i.map(function(a, o) {
      return a && !("INVALIDATE_NAME_PATH" in a) ? {
        name: a.getNamePath(),
        errors: a.getErrors(),
        warnings: a.getWarnings()
      } : {
        name: be(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = be(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = be(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], s = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(be), u = !1) : (c = null, u = o) : (c = o.map(be), u = s);
    var d = n.getFieldEntities(!0), f = function(b) {
      return b.isFieldTouched();
    };
    if (!c)
      return u ? d.every(f) : d.some(f);
    var m = new Kn();
    c.forEach(function(h) {
      m.set(h, []);
    }), d.forEach(function(h) {
      var b = h.getNamePath();
      c.forEach(function(w) {
        w.every(function($, y) {
          return b[y] === $;
        }) && m.update(w, function($) {
          return [].concat(ne($), [h]);
        });
      });
    });
    var v = function(b) {
      return b.some(f);
    }, g = m.map(function(h) {
      var b = h.value;
      return b;
    });
    return u ? g.every(v) : g.some(v);
  }, this.isFieldTouched = function(r) {
    return n.warningUnhooked(), n.isFieldsTouched([r]);
  }, this.isFieldsValidating = function(r) {
    n.warningUnhooked();
    var i = n.getFieldEntities();
    if (!r)
      return i.some(function(o) {
        return o.isFieldValidating();
      });
    var a = r.map(be);
    return i.some(function(o) {
      var s = o.getNamePath();
      return ii(a, s) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Kn(), a = n.getFieldEntities(!0);
    a.forEach(function(c) {
      var u = c.props.initialValue, d = c.getNamePath();
      if (u !== void 0) {
        var f = i.get(d) || /* @__PURE__ */ new Set();
        f.add({
          entity: c,
          value: u
        }), i.set(d, f);
      }
    });
    var o = function(u) {
      u.forEach(function(d) {
        var f = d.props.initialValue;
        if (f !== void 0) {
          var m = d.getNamePath(), v = n.getInitialValue(m);
          if (v !== void 0)
            vt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var g = i.get(m);
            if (g && g.size > 1)
              vt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (g) {
              var h = n.getFieldValue(m);
              (!r.skipExist || h === void 0) && n.updateStore(Qt(n.store, m, ne(g)[0].value));
            }
          }
        }
      });
    }, s;
    r.entities ? s = r.entities : r.namePathList ? (s = [], r.namePathList.forEach(function(c) {
      var u = i.get(c);
      if (u) {
        var d;
        (d = s).push.apply(d, ne(ne(u).map(function(f) {
          return f.entity;
        })));
      }
    })) : s = a, o(s);
  }, this.resetFields = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (!r) {
      n.updateStore(fa({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(be);
    a.forEach(function(o) {
      var s = n.getInitialValue(o);
      n.updateStore(Qt(n.store, o, s));
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
      var c = tc(o, uE), u = be(s);
      a.push(u), "value" in c && n.updateStore(Qt(n.store, u, c.value)), n.notifyObservers(i, [u], {
        type: "setField",
        data: o
      });
    }), n.notifyWatch(a);
  }, this.getFields = function() {
    var r = n.getFieldEntities(!0), i = r.map(function(a) {
      var o = a.getNamePath(), s = a.getMeta(), c = ee(ee({}, s), {}, {
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
      var a = r.getNamePath(), o = tn(n.store, a);
      o === void 0 && n.updateStore(Qt(n.store, a, i));
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
      if (n.fieldEntities = n.fieldEntities.filter(function(f) {
        return f !== r;
      }), !n.isMergedPreserve(s) && (!o || c.length > 1)) {
        var u = o ? void 0 : n.getInitialValue(i);
        if (i.length && n.getFieldValue(i) !== u && n.fieldEntities.every(function(f) {
          return !F0(f.getNamePath(), i);
        })) {
          var d = n.store;
          n.updateStore(Qt(d, i, u, !0)), n.notifyObservers(d, [i], {
            type: "remove"
          }), n.triggerDependenciesUpdate(d, i);
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
      var o = ee(ee({}, a), {}, {
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
      relatedFields: [i].concat(ne(a))
    }), a;
  }, this.updateValue = function(r, i) {
    var a = be(r), o = n.store;
    n.updateStore(Qt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var s = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = Cf(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(ne(s)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = fa(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new Kn();
    n.getFieldEntities().forEach(function(c) {
      var u = c.props.dependencies;
      (u || []).forEach(function(d) {
        var f = be(d);
        o.update(f, function() {
          var m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          return m.add(c), m;
        });
      });
    });
    var s = function c(u) {
      var d = o.get(u) || /* @__PURE__ */ new Set();
      d.forEach(function(f) {
        if (!i.has(f)) {
          i.add(f);
          var m = f.getNamePath();
          f.isFieldDirty() && m.length && (a.push(m), c(m));
        }
      });
    };
    return s(r), a;
  }, this.triggerOnFieldsChange = function(r, i) {
    var a = n.callbacks.onFieldsChange;
    if (a) {
      var o = n.getFields();
      if (i) {
        var s = new Kn();
        i.forEach(function(u) {
          var d = u.name, f = u.errors;
          s.set(d, f);
        }), o.forEach(function(u) {
          u.errors = s.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var d = u.name;
        return ii(r, d);
      });
      a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a = !!r, o = a ? r.map(be) : [], s = [];
    n.getFieldEntities(!0).forEach(function(d) {
      if (a || o.push(d.getNamePath()), (i == null ? void 0 : i.recursive) && a) {
        var f = d.getNamePath();
        f.every(function(g, h) {
          return r[h] === g || r[h] === void 0;
        }) && o.push(f);
      }
      if (!(!d.props.rules || !d.props.rules.length)) {
        var m = d.getNamePath();
        if (!a || ii(o, m)) {
          var v = d.validateRules(ee({
            validateMessages: ee(ee({}, $0), n.validateMessages)
          }, i));
          s.push(v.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(g) {
            var h, b = [], w = [];
            return (h = g.forEach) === null || h === void 0 || h.call(g, function($) {
              var y = $.rule.warningOnly, p = $.errors;
              y ? w.push.apply(w, ne(p)) : b.push.apply(b, ne(p));
            }), b.length ? Promise.reject({
              name: m,
              errors: b,
              warnings: w
            }) : {
              name: m,
              errors: b,
              warnings: w
            };
          }));
        }
      }
    });
    var c = cE(s);
    n.lastValidatePromise = c, c.catch(function(d) {
      return d;
    }).then(function(d) {
      var f = d.map(function(m) {
        var v = m.name;
        return v;
      });
      n.notifyObservers(n.store, f, {
        type: "validateFinish"
      }), n.triggerOnFieldsChange(f, d);
    });
    var u = c.then(function() {
      return n.lastValidatePromise === c ? Promise.resolve(n.getFieldsValue(o)) : Promise.reject([]);
    }).catch(function(d) {
      var f = d.filter(function(m) {
        return m && m.errors.length;
      });
      return Promise.reject({
        values: n.getFieldsValue(o),
        errorFields: f,
        outOfDate: n.lastValidatePromise !== c
      });
    });
    return u.catch(function(d) {
      return d;
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
function lc(e) {
  var t = L.useRef(), n = L.useState({}), r = yi(n, 2), i = r[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        i({});
      }, o = new fE(a);
      t.current = o.getForm();
    }
  return [t.current];
}
var Ks = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), dE = function(t) {
  var n = t.validateMessages, r = t.onFormChange, i = t.onFormFinish, a = t.children, o = L.useContext(Ks), s = L.useRef({});
  return /* @__PURE__ */ L.createElement(Ks.Provider, {
    value: ee(ee({}, o), {}, {
      validateMessages: ee(ee({}, o.validateMessages), n),
      triggerFormChange: function(u, d) {
        r && r(u, {
          changedFields: d,
          forms: s.current
        }), o.triggerFormChange(u, d);
      },
      triggerFormFinish: function(u, d) {
        i && i(u, {
          values: d,
          forms: s.current
        }), o.triggerFormFinish(u, d);
      },
      registerForm: function(u, d) {
        u && (s.current = ee(ee({}, s.current), {}, Le({}, u, d))), o.registerForm(u, d);
      },
      unregisterForm: function(u) {
        var d = ee({}, s.current);
        delete d[u], s.current = d, o.unregisterForm(u);
      }
    })
  }, a);
}, mE = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], hE = function(t, n) {
  var r = t.name, i = t.initialValues, a = t.fields, o = t.form, s = t.preserve, c = t.children, u = t.component, d = u === void 0 ? "form" : u, f = t.validateMessages, m = t.validateTrigger, v = m === void 0 ? "onChange" : m, g = t.onValuesChange, h = t.onFieldsChange, b = t.onFinish, w = t.onFinishFailed, $ = tc(t, mE), y = L.useContext(Ks), p = lc(o), E = yi(p, 1), C = E[0], k = C.getInternalHooks(On), N = k.useSubscribe, P = k.setInitialValues, F = k.setCallbacks, T = k.setValidateMessages, O = k.setPreserve, _ = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return C;
  }), L.useEffect(function() {
    return y.registerForm(r, C), function() {
      y.unregisterForm(r);
    };
  }, [y, C, r]), T(ee(ee({}, y.validateMessages), f)), F({
    onValuesChange: g,
    onFieldsChange: function(Z) {
      if (y.triggerFormChange(r, Z), h) {
        for (var z = arguments.length, Y = new Array(z > 1 ? z - 1 : 0), K = 1; K < z; K++)
          Y[K - 1] = arguments[K];
        h.apply(void 0, [Z].concat(Y));
      }
    },
    onFinish: function(Z) {
      y.triggerFormFinish(r, Z), b && b(Z);
    },
    onFinishFailed: w
  }), O(s);
  var x = L.useRef(null);
  P(i, !x.current), x.current || (x.current = !0), L.useEffect(
    function() {
      return _;
    },
    []
  );
  var S, I = typeof c == "function";
  if (I) {
    var A = C.getFieldsValue(!0);
    S = c(A, C);
  } else
    S = c;
  N(!I);
  var V = L.useRef();
  L.useEffect(function() {
    Jw(V.current || [], a || []) || C.setFields(a || []), V.current = a;
  }, [a, C]);
  var M = L.useMemo(function() {
    return ee(ee({}, C), {}, {
      validateTrigger: v
    });
  }, [C, v]), R = /* @__PURE__ */ L.createElement(Rn.Provider, {
    value: M
  }, S);
  return d === !1 ? R : /* @__PURE__ */ L.createElement(d, Fa({}, $, {
    onSubmit: function(Z) {
      Z.preventDefault(), Z.stopPropagation(), C.submit();
    },
    onReset: function(Z) {
      var z;
      Z.preventDefault(), C.resetFields(), (z = $.onReset) === null || z === void 0 || z.call($, Z);
    }
  }), R);
};
function Sf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function cc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = r === void 0 ? [] : r, a = t[1], o = q(), s = yi(o, 2), c = s[0], u = s[1], d = re(function() {
    return Sf(c);
  }, [c]), f = D(d);
  f.current = d;
  var m = it(Rn), v = a || m, g = v && v._init, h = be(i), b = D(h);
  return b.current = h, G(
    function() {
      if (!!g) {
        var w = v.getFieldsValue, $ = v.getInternalHooks, y = $(On), p = y.registerWatch, E = p(function(k) {
          var N = tn(k, b.current), P = Sf(N);
          f.current !== P && (f.current = P, u(N));
        }), C = tn(w(), b.current);
        return u(C), E;
      }
    },
    [g]
  ), c;
}
var vE = /* @__PURE__ */ L.forwardRef(hE), Pr = vE;
Pr.FormProvider = dE;
Pr.Field = sc;
Pr.List = P0;
Pr.useForm = lc;
Pr.useWatch = cc;
const A0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, uc = l.createContext(A0), Of = l.createContext(null), T0 = () => null;
var pE = ul, gE = Ci;
function yE(e, t, n) {
  (n !== void 0 && !gE(e[t], n) || n === void 0 && !(t in e)) && pE(e, t, n);
}
var R0 = yE;
function bE(e) {
  return function(t, n, r) {
    for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var wE = bE, EE = wE, CE = EE(), $E = CE, Gs = { exports: {} };
(function(e, t) {
  var n = yt, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(u, d) {
    if (d)
      return u.slice();
    var f = u.length, m = s ? s(f) : new u.constructor(f);
    return u.copy(m), m;
  }
  e.exports = c;
})(Gs, Gs.exports);
var Ff = Sd;
function xE(e) {
  var t = new e.constructor(e.byteLength);
  return new Ff(t).set(new Ff(e)), t;
}
var _E = xE, kE = _E;
function SE(e, t) {
  var n = t ? kE(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var OE = SE;
function FE(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var PE = FE, NE = Ft, Pf = Object.create, AE = function() {
  function e() {
  }
  return function(t) {
    if (!NE(t))
      return {};
    if (Pf)
      return Pf(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), TE = AE, RE = gd, ME = RE(Object.getPrototypeOf, Object), M0 = ME, IE = TE, LE = M0, DE = dl;
function VE(e) {
  return typeof e.constructor == "function" && !DE(e) ? IE(LE(e)) : {};
}
var jE = VE, BE = La, WE = Vn;
function ZE(e) {
  return WE(e) && BE(e);
}
var HE = ZE, UE = pr, zE = M0, qE = Vn, KE = "[object Object]", GE = Function.prototype, YE = Object.prototype, I0 = GE.toString, XE = YE.hasOwnProperty, QE = I0.call(Object);
function JE(e) {
  if (!qE(e) || UE(e) != KE)
    return !1;
  var t = zE(e);
  if (t === null)
    return !0;
  var n = XE.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && I0.call(n) == QE;
}
var eC = JE;
function tC(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var L0 = tC;
function nC(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var rC = nC, iC = Ft, aC = dl, oC = rC, sC = Object.prototype, lC = sC.hasOwnProperty;
function cC(e) {
  if (!iC(e))
    return oC(e);
  var t = aC(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !lC.call(e, r)) || n.push(r);
  return n;
}
var uC = cC, fC = pd, dC = uC, mC = La;
function hC(e) {
  return mC(e) ? fC(e, !0) : dC(e);
}
var D0 = hC, vC = cd, pC = D0;
function gC(e) {
  return vC(e, pC(e));
}
var yC = gC, Nf = R0, bC = Gs.exports, wC = OE, EC = PE, CC = jE, Af = vd, Tf = Da, $C = HE, xC = oi.exports, _C = cl, kC = Ft, SC = eC, OC = fl, Rf = L0, FC = yC;
function PC(e, t, n, r, i, a, o) {
  var s = Rf(e, n), c = Rf(t, n), u = o.get(c);
  if (u) {
    Nf(e, n, u);
    return;
  }
  var d = a ? a(s, c, n + "", e, t, o) : void 0, f = d === void 0;
  if (f) {
    var m = Tf(c), v = !m && xC(c), g = !m && !v && OC(c);
    d = c, m || v || g ? Tf(s) ? d = s : $C(s) ? d = EC(s) : v ? (f = !1, d = bC(c, !0)) : g ? (f = !1, d = wC(c, !0)) : d = [] : SC(c) || Af(c) ? (d = s, Af(s) ? d = FC(s) : (!kC(s) || _C(s)) && (d = CC(c))) : f = !1;
  }
  f && (o.set(c, d), i(d, c, r, a, o), o.delete(c)), Nf(e, n, d);
}
var NC = PC, AC = _d, TC = R0, RC = $E, MC = NC, IC = Ft, LC = D0, DC = L0;
function V0(e, t, n, r, i) {
  e !== t && RC(t, function(a, o) {
    if (i || (i = new AC()), IC(a))
      MC(e, t, o, n, V0, r, i);
    else {
      var s = r ? r(DC(e, o), a, o + "", e, t, i) : void 0;
      s === void 0 && (s = a), TC(e, o, s);
    }
  }, LC);
}
var VC = V0, jC = VC, BC = md, WC = BC(function(e, t, n) {
  jC(e, t, n);
}), ZC = WC;
const j0 = (e) => l.createElement(P0, {
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
}), Mf = "adm-form", HC = A0, UC = me((e, t) => {
  const n = U(HC, e), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: s,
    footer: c,
    mode: u,
    disabled: d,
    requiredMarkStyle: f
  } = n, m = wi(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: v
  } = pe(), g = re(() => ZC({}, v.Form.defaultValidateMessages, m.validateMessages), [v.Form.defaultValidateMessages, m.validateMessages]), h = [];
  let b = null, w = [], $ = 0;
  function y() {
    w.length !== 0 && ($ += 1, h.push(l.createElement(kt, {
      header: b,
      key: $,
      mode: u
    }, w)), w = []);
  }
  return un(n.children, (p) => {
    if (l.isValidElement(p)) {
      if (p.type === T0) {
        y(), b = p.props.children;
        return;
      }
      if (p.type === j0) {
        y(), h.push(p);
        return;
      }
    }
    w.push(p);
  }), y(), l.createElement(Pr, Object.assign({
    className: j(Mf, r),
    style: i,
    ref: t
  }, m, {
    validateMessages: g
  }), l.createElement(uc.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: f,
      disabled: d
    }
  }, h), c && l.createElement("div", {
    className: `${Mf}-footer`
  }, c));
});
var bi = {}, Li = { exports: {} }, B0 = { exports: {} };
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(B0);
(function(e) {
  var t = B0.exports.default;
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
        var d = c ? Object.getOwnPropertyDescriptor(i, u) : null;
        d && (d.get || d.set) ? Object.defineProperty(s, u, d) : s[u] = i[u];
      }
    return s.default = i, o && o.set(i, s), s;
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Li);
var Di = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Di);
var lt = {};
Object.defineProperty(lt, "__esModule", {
  value: !0
});
lt.call = fc;
lt.default = void 0;
lt.note = H0;
lt.noteOnce = z0;
lt.preMessage = void 0;
lt.resetWarned = U0;
lt.warning = Z0;
lt.warningOnce = Vi;
var Ys = {}, W0 = function(t) {
};
lt.preMessage = W0;
function Z0(e, t) {
}
function H0(e, t) {
}
function U0() {
  Ys = {};
}
function fc(e, t, n) {
  !t && !Ys[n] && (e(!1, n), Ys[n] = !0);
}
function Vi(e, t) {
  fc(Z0, e, t);
}
function z0(e, t) {
  fc(H0, e, t);
}
Vi.preMessage = W0;
Vi.resetWarned = U0;
Vi.noteOnce = z0;
var zC = Vi;
lt.default = zC;
var qC = Li.exports.default, KC = Di.exports.default;
Object.defineProperty(bi, "__esModule", {
  value: !0
});
var q0 = bi.default = bi.HOOK_MARK = void 0, GC = KC(lt), YC = qC(l), XC = "RC_FORM_INTERNAL_HOOKS";
bi.HOOK_MARK = XC;
var ce = function() {
  (0, GC.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, QC = /* @__PURE__ */ YC.createContext({
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
}), JC = QC;
q0 = bi.default = JC;
function Yo(e) {
  return e === void 0 || e === !1 ? [] : Array.isArray(e) ? e : [e];
}
function e$(e) {
  const t = e.prototype;
  return !!(t && t.isReactComponent);
}
function t$(e) {
  return typeof e == "function" && !e$(e) && e.defaultProps === void 0;
}
function K0(e) {
  return Oa.exports.isFragment(e) ? !1 : Oa.exports.isMemo(e) ? K0(e.type) : !t$(e.type);
}
const n$ = De((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
})))));
function ji(e) {
  return e.split("-")[1];
}
function dc(e) {
  return e === "y" ? "height" : "width";
}
function sn(e) {
  return e.split("-")[0];
}
function Nr(e) {
  return ["top", "bottom"].includes(sn(e)) ? "x" : "y";
}
function If(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const a = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, s = Nr(t), c = dc(s), u = r[c] / 2 - i[c] / 2, d = sn(t), f = s === "x";
  let m;
  switch (d) {
    case "top":
      m = {
        x: a,
        y: r.y - i.height
      };
      break;
    case "bottom":
      m = {
        x: a,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: o
      };
      break;
    case "left":
      m = {
        x: r.x - i.width,
        y: o
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (ji(t)) {
    case "start":
      m[s] -= u * (n && f ? -1 : 1);
      break;
    case "end":
      m[s] += u * (n && f ? -1 : 1);
      break;
  }
  return m;
}
const r$ = async (e, t, n) => {
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
    x: d,
    y: f
  } = If(u, r, c), m = r, v = {}, g = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: b,
      fn: w
    } = s[h], {
      x: $,
      y,
      data: p,
      reset: E
    } = await w({
      x: d,
      y: f,
      initialPlacement: r,
      placement: m,
      strategy: i,
      middlewareData: v,
      rects: u,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (d = $ != null ? $ : d, f = y != null ? y : f, v = {
      ...v,
      [b]: {
        ...v[b],
        ...p
      }
    }, E && g <= 50) {
      g++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : E.rects), {
        x: d,
        y: f
      } = If(u, m, c)), h = -1;
      continue;
    }
  }
  return {
    x: d,
    y: f,
    placement: m,
    strategy: i,
    middlewareData: v
  };
};
function ln(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function i$(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function G0(e) {
  return typeof e != "number" ? i$(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Na(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
async function Aa(e, t) {
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
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: m = !1,
    padding: v = 0
  } = ln(t, e), g = G0(v), b = s[m ? f === "floating" ? "reference" : "floating" : f], w = Na(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: c
  })), $ = f === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), p = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Na(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: $,
    offsetParent: y,
    strategy: c
  }) : $);
  return {
    top: (w.top - E.top + g.top) / p.y,
    bottom: (E.bottom - w.bottom + g.bottom) / p.y,
    left: (w.left - E.left + g.left) / p.x,
    right: (E.right - w.right + g.right) / p.x
  };
}
const Xs = Math.min, a$ = Math.max;
function Qs(e, t, n) {
  return a$(e, Xs(t, n));
}
const o$ = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: i,
      rects: a,
      platform: o,
      elements: s
    } = t, {
      element: c,
      padding: u = 0
    } = ln(e, t) || {};
    if (c == null)
      return {};
    const d = G0(u), f = {
      x: n,
      y: r
    }, m = Nr(i), v = dc(m), g = await o.getDimensions(c), h = m === "y", b = h ? "top" : "left", w = h ? "bottom" : "right", $ = h ? "clientHeight" : "clientWidth", y = a.reference[v] + a.reference[m] - f[m] - a.floating[v], p = f[m] - a.reference[m], E = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c));
    let C = E ? E[$] : 0;
    (!C || !await (o.isElement == null ? void 0 : o.isElement(E))) && (C = s.floating[$] || a.floating[v]);
    const k = y / 2 - p / 2, N = C / 2 - g[v] / 2 - 1, P = Xs(d[b], N), F = Xs(d[w], N), T = P, O = C - g[v] - F, _ = C / 2 - g[v] / 2 + k, x = Qs(T, _, O), I = ji(i) != null && _ != x && a.reference[v] / 2 - (_ < T ? P : F) - g[v] / 2 < 0 ? _ < T ? T - _ : O - _ : 0;
    return {
      [m]: f[m] - I,
      data: {
        [m]: x,
        centerOffset: _ - x + I
      }
    };
  }
}), s$ = ["top", "right", "bottom", "left"], l$ = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Ta(e) {
  return e.replace(/left|right|bottom|top/g, (t) => l$[t]);
}
function c$(e, t, n) {
  n === void 0 && (n = !1);
  const r = ji(e), i = Nr(e), a = dc(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (o = Ta(o)), {
    main: o,
    cross: Ta(o)
  };
}
const u$ = {
  start: "end",
  end: "start"
};
function Js(e) {
  return e.replace(/start|end/g, (t) => u$[t]);
}
function f$(e) {
  const t = Ta(e);
  return [Js(e), t, Js(t)];
}
function d$(e, t, n) {
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
function m$(e, t, n, r) {
  const i = ji(e);
  let a = d$(sn(e), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), t && (a = a.concat(a.map(Js)))), a;
}
const h$ = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n;
      const {
        placement: r,
        middlewareData: i,
        rects: a,
        initialPlacement: o,
        platform: s,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: g = !0,
        ...h
      } = ln(e, t), b = sn(r), w = sn(o) === o, $ = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), y = f || (w || !g ? [Ta(o)] : f$(o));
      !f && v !== "none" && y.push(...m$(o, g, v, $));
      const p = [o, ...y], E = await Aa(t, h), C = [];
      let k = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (u && C.push(E[b]), d) {
        const {
          main: T,
          cross: O
        } = c$(r, a, $);
        C.push(E[T], E[O]);
      }
      if (k = [...k, {
        placement: r,
        overflows: C
      }], !C.every((T) => T <= 0)) {
        var N, P;
        const T = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, O = p[T];
        if (O)
          return {
            data: {
              index: T,
              overflows: k
            },
            reset: {
              placement: O
            }
          };
        let _ = (P = k.filter((x) => x.overflows[0] <= 0).sort((x, S) => x.overflows[1] - S.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!_)
          switch (m) {
            case "bestFit": {
              var F;
              const x = (F = k.map((S) => [S.placement, S.overflows.filter((I) => I > 0).reduce((I, A) => I + A, 0)]).sort((S, I) => S[1] - I[1])[0]) == null ? void 0 : F[0];
              x && (_ = x);
              break;
            }
            case "initialPlacement":
              _ = o;
              break;
          }
        if (r !== _)
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
function Lf(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Df(e) {
  return s$.some((t) => e[t] >= 0);
}
const v$ = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...i
      } = ln(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Aa(t, {
            ...i,
            elementContext: "reference"
          }), o = Lf(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Df(o)
            }
          };
        }
        case "escaped": {
          const a = await Aa(t, {
            ...i,
            altBoundary: !0
          }), o = Lf(a, n.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Df(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function p$(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = sn(n), s = ji(n), c = Nr(n) === "x", u = ["left", "top"].includes(o) ? -1 : 1, d = a && c ? -1 : 1, f = ln(t, e);
  let {
    mainAxis: m,
    crossAxis: v,
    alignmentAxis: g
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return s && typeof g == "number" && (v = s === "end" ? g * -1 : g), c ? {
    x: v * d,
    y: m * u
  } : {
    x: m * u,
    y: v * d
  };
}
const g$ = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await p$(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function Y0(e) {
  return e === "x" ? "y" : "x";
}
const y$ = function(e) {
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
              x: w,
              y: $
            } = b;
            return {
              x: w,
              y: $
            };
          }
        },
        ...c
      } = ln(e, t), u = {
        x: n,
        y: r
      }, d = await Aa(t, c), f = Nr(sn(i)), m = Y0(f);
      let v = u[f], g = u[m];
      if (a) {
        const b = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", $ = v + d[b], y = v - d[w];
        v = Qs($, v, y);
      }
      if (o) {
        const b = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", $ = g + d[b], y = g - d[w];
        g = Qs($, g, y);
      }
      const h = s.fn({
        ...t,
        [f]: v,
        [m]: g
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
}, b$ = function(e) {
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
      } = ln(e, t), d = {
        x: n,
        y: r
      }, f = Nr(i), m = Y0(f);
      let v = d[f], g = d[m];
      const h = ln(s, t), b = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const y = f === "y" ? "height" : "width", p = a.reference[f] - a.floating[y] + b.mainAxis, E = a.reference[f] + a.reference[y] - b.mainAxis;
        v < p ? v = p : v > E && (v = E);
      }
      if (u) {
        var w, $;
        const y = f === "y" ? "width" : "height", p = ["top", "left"].includes(sn(i)), E = a.reference[m] - a.floating[y] + (p && ((w = o.offset) == null ? void 0 : w[m]) || 0) + (p ? 0 : b.crossAxis), C = a.reference[m] + a.reference[y] + (p ? 0 : (($ = o.offset) == null ? void 0 : $[m]) || 0) - (p ? b.crossAxis : 0);
        g < E ? g = E : g > C && (g = C);
      }
      return {
        [f]: v,
        [m]: g
      };
    }
  };
};
function at(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function pt(e) {
  return at(e).getComputedStyle(e);
}
function X0(e) {
  return e instanceof at(e).Node;
}
function cn(e) {
  return X0(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function gt(e) {
  return e instanceof at(e).HTMLElement;
}
function Wt(e) {
  return e instanceof at(e).Element;
}
function Vf(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof at(e).ShadowRoot || e instanceof ShadowRoot;
}
function Bi(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = pt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function w$(e) {
  return ["table", "td", "th"].includes(cn(e));
}
function mc(e) {
  const t = hc(), n = pt(e);
  return n.transform !== "none" || n.perspective !== "none" || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function hc() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Po(e) {
  return ["html", "body", "#document"].includes(cn(e));
}
const el = Math.min, ir = Math.max, Ra = Math.round, ta = Math.floor, Mn = (e) => ({
  x: e,
  y: e
});
function Q0(e) {
  const t = pt(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const i = gt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Ra(n) !== a || Ra(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    $: s
  };
}
function vc(e) {
  return Wt(e) ? e : e.contextElement;
}
function ar(e) {
  const t = vc(e);
  if (!gt(t))
    return Mn(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    $: a
  } = Q0(t);
  let o = (a ? Ra(n.width) : n.width) / r, s = (a ? Ra(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
const jf = /* @__PURE__ */ Mn(0);
function J0(e, t, n) {
  var r, i;
  if (t === void 0 && (t = !0), !hc())
    return jf;
  const a = e ? at(e) : window;
  return !n || t && n !== a ? jf : {
    x: ((r = a.visualViewport) == null ? void 0 : r.offsetLeft) || 0,
    y: ((i = a.visualViewport) == null ? void 0 : i.offsetTop) || 0
  };
}
function In(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const i = e.getBoundingClientRect(), a = vc(e);
  let o = Mn(1);
  t && (r ? Wt(r) && (o = ar(r)) : o = ar(e));
  const s = J0(a, n, r);
  let c = (i.left + s.x) / o.x, u = (i.top + s.y) / o.y, d = i.width / o.x, f = i.height / o.y;
  if (a) {
    const m = at(a), v = r && Wt(r) ? at(r) : r;
    let g = m.frameElement;
    for (; g && r && v !== m; ) {
      const h = ar(g), b = g.getBoundingClientRect(), w = getComputedStyle(g), $ = b.left + (g.clientLeft + parseFloat(w.paddingLeft)) * h.x, y = b.top + (g.clientTop + parseFloat(w.paddingTop)) * h.y;
      c *= h.x, u *= h.y, d *= h.x, f *= h.y, c += $, u += y, g = at(g).frameElement;
    }
  }
  return Na({
    width: d,
    height: f,
    x: c,
    y: u
  });
}
function Ht(e) {
  return ((X0(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function No(e) {
  return Wt(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function E$(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = gt(n), a = Ht(n);
  if (n === a)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = Mn(1);
  const c = Mn(0);
  if ((i || !i && r !== "fixed") && ((cn(n) !== "body" || Bi(a)) && (o = No(n)), gt(n))) {
    const u = In(n);
    s = ar(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - o.scrollLeft * s.x + c.x,
    y: t.y * s.y - o.scrollTop * s.y + c.y
  };
}
function em(e) {
  return In(Ht(e)).left + No(e).scrollLeft;
}
function C$(e) {
  const t = Ht(e), n = No(e), r = e.ownerDocument.body, i = ir(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = ir(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + em(e);
  const s = -n.scrollTop;
  return pt(r).direction === "rtl" && (o += ir(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function dr(e) {
  if (cn(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || Vf(e) && e.host || Ht(e);
  return Vf(t) ? t.host : t;
}
function tm(e) {
  const t = dr(e);
  return Po(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : gt(t) && Bi(t) ? t : tm(t);
}
function Ma(e, t) {
  var n;
  t === void 0 && (t = []);
  const r = tm(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = at(r);
  return i ? t.concat(a, a.visualViewport || [], Bi(r) ? r : []) : t.concat(r, Ma(r));
}
function $$(e, t) {
  const n = at(e), r = Ht(e), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = hc();
    (!u || u && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: s,
    y: c
  };
}
function x$(e, t) {
  const n = In(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = gt(e) ? ar(e) : Mn(1), o = e.clientWidth * a.x, s = e.clientHeight * a.y, c = i * a.x, u = r * a.y;
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
    r = $$(e, n);
  else if (t === "document")
    r = C$(Ht(e));
  else if (Wt(t))
    r = x$(t, n);
  else {
    const i = J0(e);
    r = {
      ...t,
      x: t.x - i.x,
      y: t.y - i.y
    };
  }
  return Na(r);
}
function nm(e, t) {
  const n = dr(e);
  return n === t || !Wt(n) || Po(n) ? !1 : pt(n).position === "fixed" || nm(n, t);
}
function _$(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Ma(e).filter((s) => Wt(s) && cn(s) !== "body"), i = null;
  const a = pt(e).position === "fixed";
  let o = a ? dr(e) : e;
  for (; Wt(o) && !Po(o); ) {
    const s = pt(o), c = mc(o);
    !c && s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Bi(o) && !c && nm(e, o)) ? r = r.filter((d) => d !== o) : i = s, o = dr(o);
  }
  return t.set(e, r), r;
}
function k$(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const o = [...n === "clippingAncestors" ? _$(t, this._c) : [].concat(n), r], s = o[0], c = o.reduce((u, d) => {
    const f = Bf(t, d, i);
    return u.top = ir(f.top, u.top), u.right = el(f.right, u.right), u.bottom = el(f.bottom, u.bottom), u.left = ir(f.left, u.left), u;
  }, Bf(t, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function S$(e) {
  return Q0(e);
}
function Wf(e, t) {
  return !gt(e) || pt(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function O$(e) {
  let t = dr(e);
  for (; gt(t) && !Po(t); ) {
    if (mc(t))
      return t;
    t = dr(t);
  }
  return null;
}
function Zf(e, t) {
  const n = at(e);
  if (!gt(e))
    return n;
  let r = Wf(e, t);
  for (; r && w$(r) && pt(r).position === "static"; )
    r = Wf(r, t);
  return r && (cn(r) === "html" || cn(r) === "body" && pt(r).position === "static" && !mc(r)) ? n : r || O$(e) || n;
}
function F$(e, t, n) {
  const r = gt(t), i = Ht(t), a = n === "fixed", o = In(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Mn(0);
  if (r || !r && !a)
    if ((cn(t) !== "body" || Bi(i)) && (s = No(t)), gt(t)) {
      const u = In(t, !0, a, t);
      c.x = u.x + t.clientLeft, c.y = u.y + t.clientTop;
    } else
      i && (c.x = em(i));
  return {
    x: o.left + s.scrollLeft - c.x,
    y: o.top + s.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
const P$ = {
  getClippingRect: k$,
  convertOffsetParentRelativeRectToViewportRelativeRect: E$,
  isElement: Wt,
  getDimensions: S$,
  getOffsetParent: Zf,
  getDocumentElement: Ht,
  getScale: ar,
  async getElementRects(e) {
    let {
      reference: t,
      floating: n,
      strategy: r
    } = e;
    const i = this.getOffsetParent || Zf, a = this.getDimensions;
    return {
      reference: F$(t, await i(n), r),
      floating: {
        x: 0,
        y: 0,
        ...await a(n)
      }
    };
  },
  getClientRects: (e) => Array.from(e.getClientRects()),
  isRTL: (e) => pt(e).direction === "rtl"
};
function N$(e, t) {
  let n = null, r;
  const i = Ht(e);
  function a() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function o(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), a();
    const {
      left: u,
      top: d,
      width: f,
      height: m
    } = e.getBoundingClientRect();
    if (s || t(), !f || !m)
      return;
    const v = ta(d), g = ta(i.clientWidth - (u + f)), h = ta(i.clientHeight - (d + m)), b = ta(u), w = -v + "px " + -g + "px " + -h + "px " + -b + "px";
    let $ = !0;
    n = new IntersectionObserver((y) => {
      const p = y[0].intersectionRatio;
      if (p !== c) {
        if (!$)
          return o();
        p ? o(!1, p) : r = setTimeout(() => {
          o(!1, 1e-7);
        }, 100);
      }
      $ = !1;
    }, {
      rootMargin: w,
      threshold: ir(0, el(1, c)) || 1
    }), n.observe(e);
  }
  return o(!0), a;
}
function A$(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = !0,
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = vc(e), d = i || a ? [...u ? Ma(u) : [], ...Ma(t)] : [];
  d.forEach((b) => {
    i && b.addEventListener("scroll", n, {
      passive: !0
    }), a && b.addEventListener("resize", n);
  });
  const f = u && s ? N$(u, n) : null;
  let m = null;
  o && (m = new ResizeObserver(n), u && !c && m.observe(u), m.observe(t));
  let v, g = c ? In(e) : null;
  c && h();
  function h() {
    const b = In(e);
    g && (b.x !== g.x || b.y !== g.y || b.width !== g.width || b.height !== g.height) && n(), g = b, v = requestAnimationFrame(h);
  }
  return n(), () => {
    d.forEach((b) => {
      i && b.removeEventListener("scroll", n), a && b.removeEventListener("resize", n);
    }), f && f(), m && m.disconnect(), m = null, c && cancelAnimationFrame(v);
  };
}
const T$ = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: P$,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return r$(e, t, {
    ...i,
    platform: a
  });
};
class R$ extends l.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const t = Mm(this);
    t instanceof Element ? this.element = t : this.element = null;
  }
  render() {
    return l.Children.only(this.props.children);
  }
}
const M$ = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function I$(e) {
  var t;
  return (t = M$[e]) !== null && t !== void 0 ? t : e;
}
let tr = null, or = null;
vr && (tr = document.createElement("div"), tr.className = "adm-px-tester", tr.style.setProperty("--size", "10"), document.body.appendChild(tr), or = document.createElement("div"), or.className = "adm-px-tester", document.body.appendChild(or));
function Pn(e) {
  return tr === null || or === null || tr.getBoundingClientRect().height === 10 ? e : (or.style.setProperty("--size", e.toString()), or.getBoundingClientRect().height);
}
const mn = "adm-popover", L$ = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body
}, rm = me((e, t) => {
  const n = U(L$, e), {
    mode: r = "light"
  } = n, i = I$(n.placement), [a, o] = te({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  ge(t, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: a
  }), [a]);
  const s = D(null), c = D(null), u = D(null), d = an(n.stopPropagation, B(n, l.createElement("div", {
    className: j(mn, `${mn}-${r}`, !a && `${mn}-hidden`),
    ref: c
  }, l.createElement("div", {
    className: `${mn}-arrow`,
    ref: u
  }, l.createElement(n$, {
    className: `${mn}-arrow-icon`
  })), l.createElement("div", {
    className: `${mn}-inner`
  }, l.createElement("div", {
    className: `${mn}-inner-content`
  }, n.content))))), [f, m] = q(null);
  function v() {
    var h, b, w;
    return Ce(this, void 0, void 0, function* () {
      const $ = (b = (h = s.current) === null || h === void 0 ? void 0 : h.element) !== null && b !== void 0 ? b : null, y = c.current, p = u.current;
      if (m($), !$ || !y || !p)
        return;
      const {
        x: E,
        y: C,
        placement: k,
        middlewareData: N
      } = yield T$($, y, {
        placement: i,
        middleware: [g$(Pn(12)), y$({
          padding: Pn(4),
          crossAxis: !1,
          limiter: b$()
        }), h$(), v$(), o$({
          element: p,
          padding: Pn(12)
        })]
      });
      Object.assign(y.style, {
        left: `${E}px`,
        top: `${C}px`
      });
      const P = k.split("-")[0], F = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[P], {
        x: T,
        y: O
      } = (w = N.arrow) !== null && w !== void 0 ? w : {};
      Object.assign(p.style, {
        left: T != null ? `${T}px` : "",
        top: O != null ? `${O}px` : "",
        right: "",
        bottom: "",
        [F]: "calc(var(--arrow-size) * -1)"
      });
      const _ = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[P];
      p.style.setProperty("--arrow-icon-rotate", _);
    });
  }
  xe(() => {
    v();
  }), G(() => {
    if (!f || !n.trigger)
      return;
    function h() {
      o((b) => !b);
    }
    return f.addEventListener("click", h), () => {
      f.removeEventListener("click", h);
    };
  }, [f, n.trigger]), G(() => {
    const h = c.current;
    if (!(!f || !h))
      return A$(f, h, v, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), $d(() => {
    !n.trigger || o(!1);
  }, [() => {
    var h;
    return (h = s.current) === null || h === void 0 ? void 0 : h.element;
  }, c], ["click", "touchmove"]);
  const g = to(a, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(R$, {
    ref: s
  }, n.children), g && _r(n.getContainer, d));
}), hn = "adm-popover-menu", D$ = me((e, t) => {
  const n = D(null);
  ge(t, () => n.current, []);
  const r = Ze((a) => {
    var o;
    const {
      onAction: s
    } = e;
    s && s(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [e.onAction]), i = re(() => l.createElement("div", {
    className: `${hn}-list`
  }, l.createElement("div", {
    className: `${hn}-list-inner`
  }, e.actions.map((a, o) => {
    var s;
    return l.createElement("a", {
      key: (s = a.key) !== null && s !== void 0 ? s : o,
      className: j(`${hn}-item`, "adm-plain-anchor", a.disabled && `${hn}-item-disabled`),
      onClick: () => {
        var c;
        a.disabled || (r(a), (c = a.onClick) === null || c === void 0 || c.call(a));
      }
    }, a.icon && l.createElement("div", {
      className: `${hn}-item-icon`
    }, a.icon), l.createElement("div", {
      className: `${hn}-item-text`
    }, a.text));
  }))), [e.actions, r]);
  return l.createElement(rm, Object.assign({
    ref: n
  }, e, {
    className: j(hn, e.className),
    content: i
  }), e.children);
}), im = ie(rm, {
  Menu: D$
});
function V$(...e) {
  let t;
  for (t = 0; t < e.length && e[t] === void 0; t++)
    ;
  return e[t];
}
const j$ = "__SPLIT__", je = "adm-form-item", B$ = l.memo(({
  children: e
}) => e, (e, t) => e.value === t.value && e.update === t.update), W$ = (e) => {
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
    arrow: d,
    childElementPosition: f = "normal"
  } = e, m = it(uc), {
    locale: v
  } = pe(), g = e.hasFeedback !== void 0 ? e.hasFeedback : m.hasFeedback, h = e.layout || m.layout, b = (t = e.disabled) !== null && t !== void 0 ? t : m.disabled, w = (() => {
    const {
      requiredMarkStyle: p
    } = m;
    switch (p) {
      case "asterisk":
        return o && l.createElement("span", {
          className: `${je}-required-asterisk`
        }, "*");
      case "text-required":
        return o && l.createElement("span", {
          className: `${je}-required-text`
        }, "(", v.Form.required, ")");
      case "text-optional":
        return !o && l.createElement("span", {
          className: `${je}-required-text`
        }, "(", v.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), $ = !!i && l.createElement("label", {
    className: `${je}-label`,
    htmlFor: c
  }, i, w, a && l.createElement(im, {
    content: a,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${je}-label-help`,
    onClick: (p) => {
      p.preventDefault();
    }
  }, l.createElement(vy, null)))), y = (!!e.description || g) && l.createElement(l.Fragment, null, e.description, g && l.createElement(l.Fragment, null, e.errors.map((p, E) => l.createElement("div", {
    key: `error-${E}`,
    className: `${je}-feedback-error`
  }, p)), e.warnings.map((p, E) => l.createElement("div", {
    key: `warning-${E}`,
    className: `${je}-feedback-warning`
  }, p))));
  return B(e, l.createElement(kt.Item, {
    style: n,
    title: h === "vertical" && $,
    prefix: h === "horizontal" && $,
    extra: r,
    description: y,
    className: j(je, `${je}-${h}`, {
      [`${je}-hidden`]: u,
      [`${je}-has-error`]: e.errors.length
    }),
    disabled: b,
    onClick: e.onClick,
    clickable: e.clickable,
    arrow: d
  }, l.createElement("div", {
    className: j(`${je}-child`, `${je}-child-position-${f}`)
  }, l.createElement("div", {
    className: j(`${je}-child-inner`)
  }, s))));
}, Z$ = (e) => {
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
    layout: d,
    childElementPosition: f,
    description: m,
    disabled: v,
    rules: g,
    children: h,
    messageVariables: b,
    trigger: w = "onChange",
    validateTrigger: $ = w,
    onClick: y,
    shouldUpdate: p,
    dependencies: E,
    clickable: C,
    arrow: k
  } = e, N = wi(e, ["style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: P
  } = it(uc), {
    validateTrigger: F
  } = it(q0), T = V$($, F, w), O = D(null), _ = D(0);
  _.current += 1;
  const [x, S] = q({}), I = Ze((Z, z) => {
    S((Y) => {
      const K = Object.assign({}, Y), _e = z.join(j$);
      return Z.destroy ? delete K[_e] : K[_e] = Z, K;
    });
  }, [S]);
  function A(Z, z, Y, K) {
    var _e, ke;
    if (c && !u)
      return Z;
    const we = (_e = Y == null ? void 0 : Y.errors) !== null && _e !== void 0 ? _e : [], se = Object.keys(x).reduce((he, fn) => {
      var bt, ut;
      const Ar = (ut = (bt = x[fn]) === null || bt === void 0 ? void 0 : bt.errors) !== null && ut !== void 0 ? ut : [];
      return Ar.length && (he = [...he, ...Ar]), he;
    }, we), ct = (ke = Y == null ? void 0 : Y.warnings) !== null && ke !== void 0 ? ke : [], He = Object.keys(x).reduce((he, fn) => {
      var bt, ut;
      const Ar = (ut = (bt = x[fn]) === null || bt === void 0 ? void 0 : bt.warnings) !== null && ut !== void 0 ? ut : [];
      return Ar.length && (he = [...he, ...Ar]), he;
    }, ct);
    return B(e, l.createElement(W$, {
      style: t,
      label: n,
      extra: i,
      help: r,
      description: m,
      required: K,
      disabled: v,
      hasFeedback: a,
      htmlFor: z,
      errors: se,
      warnings: He,
      onClick: y && ((he) => y(he, O)),
      hidden: u,
      layout: d,
      childElementPosition: f,
      clickable: C,
      arrow: k
    }, l.createElement(Of.Provider, {
      value: I
    }, Z)));
  }
  const V = typeof h == "function";
  if (!o && !V && !e.dependencies)
    return A(h);
  let M = {};
  M.label = typeof n == "string" ? n : "", b && (M = Object.assign(Object.assign({}, M), b));
  const R = it(Of), W = (Z) => {
    if (c && R) {
      const z = Z.name;
      R(Z, z);
    }
  };
  return l.createElement(sc, Object.assign({}, N, {
    name: o,
    shouldUpdate: p,
    dependencies: E,
    rules: g,
    trigger: w,
    validateTrigger: T,
    onMetaChange: W,
    messageVariables: M
  }), (Z, z, Y) => {
    let K = null;
    const _e = s !== void 0 ? s : g && g.some((se) => !!(se && typeof se == "object" && se.required)), ke = Yo(o).length && z ? z.name : [], we = (ke.length > 0 && P ? [P, ...ke] : ke).join("_");
    if (p && E && Me("Form.Item", "`shouldUpdate` and `dependencies` shouldn't be used together."), V)
      (p || E) && !o ? K = h(Y) : (p || E || Me("Form.Item", "`children` of render props only work with `shouldUpdate` or `dependencies`."), o && Me("Form.Item", "Do not use `name` with `children` of render props since it's not a field."));
    else if (E && !o)
      Me("Form.Item", "Must set `name` or use render props when `dependencies` is set.");
    else if (l.isValidElement(h)) {
      h.props.defaultValue && Me("Form.Item", "`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.");
      const se = Object.assign(Object.assign({}, h.props), Z);
      K0(h) && (se.ref = (He) => {
        const he = h.ref;
        he && (typeof he == "function" && he(He), "current" in he && (he.current = He)), O.current = He;
      }), se.id || (se.id = we), (/* @__PURE__ */ new Set([...Yo(w), ...Yo(T)])).forEach((He) => {
        se[He] = (...he) => {
          var fn, bt, ut;
          (fn = Z[He]) === null || fn === void 0 || fn.call(Z, ...he), (ut = (bt = h.props)[He]) === null || ut === void 0 || ut.call(bt, ...he);
        };
      }), K = l.createElement(B$, {
        value: Z[e.valuePropName || "value"],
        update: _.current
      }, l.cloneElement(h, se));
    } else
      o && Me("Form.Item", "`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead."), K = h;
    return A(K, we, z, _e);
  });
}, H$ = (e) => {
  const t = Ed(), n = it(Rn), r = n.getFieldsValue(e.to), i = l.useMemo(() => e.children(r, n), [JSON.stringify(r), e.children]);
  return l.createElement(l.Fragment, null, i, e.to.map((a) => l.createElement(U$, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: t
  })));
}, U$ = De((e) => {
  const t = cc(e.namePath, e.form);
  return Ai(() => {
    e.onChange();
  }, [t]), null;
}), Uk = ie(UC, {
  Item: Z$,
  Subscribe: H$,
  Header: T0,
  Array: j0,
  useForm: lc,
  useWatch: cc
});
const am = "adm-grid", z$ = (e) => {
  const t = {
    "--columns": e.columns.toString()
  }, {
    gap: n
  } = e;
  return n !== void 0 && (Array.isArray(n) ? (t["--gap-horizontal"] = kn(n[0]), t["--gap-vertical"] = kn(n[1])) : t["--gap"] = kn(n)), B(e, l.createElement("div", {
    className: am,
    style: t
  }, e.children));
}, q$ = (e) => {
  const t = U({
    span: 1
  }, e), n = {
    "--item-span": t.span
  };
  return B(t, l.createElement("div", {
    className: `${am}-item`,
    style: n,
    onClick: t.onClick
  }, t.children));
}, om = ie(z$, {
  Item: q$
});
const K$ = v8([O1, t8]), Xo = () => [1, 0, 0, 1, 0, 0], Hf = (e) => e[4], Uf = (e) => e[5], Zr = (e) => e[0], Hr = (e, t, n) => sm([1, 0, 0, 1, t, n], e), G$ = (e, t, n = t) => sm([t, 0, 0, n, 0, 0], e), Y$ = (e, [t, n]) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], sm = (e, t) => [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]], Qo = "adm-image-viewer", lm = (e) => {
  const {
    dragLockRef: t,
    maxZoom: n
  } = e, r = D(null), i = D(null), [{
    matrix: a
  }, o] = Pe(() => ({
    matrix: Xo(),
    config: {
      tension: 200
    }
  })), s = vs(r), c = vs(i), u = D(!1), d = (f, m, v = !1) => {
    if (!s || !c)
      return f;
    const g = -s.width / 2, h = -s.height / 2, b = -c.width / 2, w = -c.height / 2, $ = Zr(f), y = $ * c.width, p = $ * c.height, [E, C] = Y$(f, [b, w]);
    if (m === "translate") {
      let k = E, N = C;
      if (y > s.width) {
        const P = g - (y - s.width), F = g;
        k = v ? Ee(E, P, F) : vi(E, P, F, $ * 50);
      } else
        k = -y / 2;
      if (p > s.height) {
        const P = h - (p - s.height), F = h;
        N = v ? Ee(C, P, F) : vi(C, P, F, $ * 50);
      } else
        N = -p / 2;
      return Hr(f, k - E, N - C);
    }
    if (m === "scale" && v) {
      const [k, N] = [y > s.width ? Ee(E, g - (y - s.width), g) : -y / 2, p > s.height ? Ee(C, h - (p - s.height), h) : -p / 2];
      return Hr(f, k - E, N - C);
    }
    return f;
  };
  return K$({
    onDrag: (f) => {
      if (f.first)
        return;
      if (f.pinching)
        return f.cancel();
      if (f.tap && f.elapsedTime > 0 && f.elapsedTime < 1e3) {
        e.onTap();
        return;
      }
      const m = Zr(a.get());
      if (t && (t.current = m !== 1), !u.current && m <= 1)
        o.start({
          matrix: Xo()
        });
      else {
        const v = a.get(), g = [f.offset[0] - Hf(v), f.offset[1] - Uf(v)], h = Hr(v, ...f.last ? [g[0] + f.velocity[0] * f.direction[0] * 200, g[1] + f.velocity[1] * f.direction[1] * 200] : g);
        o.start({
          matrix: d(h, "translate", f.last),
          immediate: !f.last
        });
      }
    },
    onPinch: (f) => {
      var m;
      u.current = !f.last;
      const [v] = f.offset;
      if (v < 0)
        return;
      let g;
      n === "auto" ? g = s && c ? Math.max(s.height / c.height, s.width / c.width) : 1 : g = n;
      const h = f.last ? Ee(v, 1, g) : v;
      if ((m = e.onZoomChange) === null || m === void 0 || m.call(e, h), f.last && h <= 1)
        o.start({
          matrix: Xo()
        }), t && (t.current = !1);
      else {
        if (!s)
          return;
        const b = a.get(), w = Zr(b), $ = f.origin[0] - s.width / 2, y = f.origin[1] - s.height / 2;
        let p = Hr(b, -$, -y);
        p = G$(p, h / w), p = Hr(p, $, y), o.start({
          matrix: d(p, "scale", f.last),
          immediate: !f.last
        }), t && (t.current = !0);
      }
    }
  }, {
    target: r,
    drag: {
      from: () => [Hf(a.get()), Uf(a.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Zr(a.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), l.createElement("div", {
    className: `${Qo}-slide`,
    onPointerMove: (f) => {
      Zr(a.get()) !== 1 && f.stopPropagation();
    }
  }, l.createElement("div", {
    className: `${Qo}-control`,
    ref: r
  }, l.createElement(fe.div, {
    className: `${Qo}-image-wrapper`,
    style: {
      matrix: a
    }
  }, l.createElement("img", {
    ref: i,
    src: e.image,
    draggable: !1,
    alt: e.image
  }))));
}, Jo = "adm-image-viewer", X$ = me((e, t) => {
  const n = window.innerWidth + Pn(16), [{
    x: r
  }, i] = Pe(() => ({
    x: e.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = e.images.length;
  function o(u, d = !1) {
    var f;
    const m = Ee(u, 0, a - 1);
    (f = e.onIndexChange) === null || f === void 0 || f.call(e, m), i.start({
      x: m * n,
      immediate: d
    });
  }
  ge(t, () => ({
    swipeTo: o
  }));
  const s = D(!1), c = Pt((u) => {
    if (s.current)
      return;
    const [d] = u.offset;
    if (u.last) {
      const f = Math.floor(d / n), m = f + 1, v = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(Ee(Math.round((d + v) / n), f, m));
    } else
      i.start({
        x: d,
        immediate: !0
      });
  }, {
    transform: ([u, d]) => [-u, d],
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
    className: `${Jo}-slides`
  }, c()), l.createElement(fe.div, {
    className: `${Jo}-indicator`
  }, r.to((u) => `${Ee(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(fe.div, {
    className: `${Jo}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, e.images.map((u, d) => l.createElement(lm, {
    key: d,
    image: u,
    onTap: e.onTap,
    maxZoom: e.maxZoom,
    onZoomChange: (f) => {
      if (f !== 1) {
        const m = Math.round(r.get() / n);
        i.start({
          x: m * n
        });
      }
    },
    dragLockRef: s
  }))));
}), Ia = "adm-image-viewer", cm = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, um = (e) => {
  var t;
  const n = U(cm, e), r = l.createElement(Si, {
    visible: n.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: n.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Ia}-content`
  }, n.image && l.createElement(lm, {
    image: n.image,
    onTap: () => {
      var i;
      (i = n.onClose) === null || i === void 0 || i.call(n);
    },
    maxZoom: n.maxZoom
  })), n.image && l.createElement("div", {
    className: `${Ia}-footer`
  }, (t = n.renderFooter) === null || t === void 0 ? void 0 : t.call(n, n.image), l.createElement(Or, {
    position: "bottom"
  })));
  return _r(n.getContainer, r);
}, Q$ = Object.assign(Object.assign({}, cm), {
  defaultIndex: 0
}), fm = me((e, t) => {
  var n;
  const r = U(Q$, e), [i, a] = q(r.defaultIndex), o = D(null);
  ge(t, () => ({
    swipeTo: (u, d) => {
      var f;
      a(u), (f = o.current) === null || f === void 0 || f.swipeTo(u, d);
    }
  }));
  const s = Ze((u) => {
    var d;
    a(u), (d = r.onIndexChange) === null || d === void 0 || d.call(r, u);
  }, [r.onIndexChange]), c = l.createElement(Si, {
    visible: r.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: r.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Ia}-content`
  }, r.images && l.createElement(X$, {
    ref: o,
    defaultIndex: i,
    onIndexChange: s,
    images: r.images,
    onTap: () => {
      var u;
      (u = r.onClose) === null || u === void 0 || u.call(r);
    },
    maxZoom: r.maxZoom
  })), r.images && l.createElement("div", {
    className: `${Ia}-footer`
  }, (n = r.renderFooter) === null || n === void 0 ? void 0 : n.call(r, r.images[i], i), l.createElement(Or, {
    position: "bottom"
  })));
  return _r(r.getContainer, c);
}), mr = /* @__PURE__ */ new Set();
function J$(e) {
  pc();
  const t = Fr(l.createElement(um, Object.assign({}, e, {
    afterClose: () => {
      var n;
      mr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return mr.add(t), t;
}
function ex(e) {
  pc();
  const t = Fr(l.createElement(fm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      mr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return mr.add(t), t;
}
function pc() {
  mr.forEach((e) => {
    e.close();
  }), mr.clear();
}
const tx = ie(fm, {
  show: ex
}), nx = ie(um, {
  Multi: tx,
  show: J$,
  clear: pc
}), vn = "adm-image-uploader", rx = (e) => {
  const {
    locale: t
  } = pe(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: s
  } = e, c = re(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  G(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return e.status === "pending" && l.createElement("div", {
      className: `${vn}-cell-mask`
    }, l.createElement("span", {
      className: `${vn}-cell-loading`
    }, l.createElement(zl, {
      color: "white"
    }), l.createElement("span", {
      className: `${vn}-cell-mask-message`
    }, t.ImageUploader.uploading)));
  }
  function d() {
    return i && l.createElement("span", {
      className: `${vn}-cell-delete`,
      onClick: o
    }, a);
  }
  return l.createElement("div", {
    className: j(`${vn}-cell`, e.status === "fail" && `${vn}-cell-fail`)
  }, l.createElement(ao, {
    className: `${vn}-cell-image`,
    src: c,
    fit: s,
    onClick: e.onClick
  }), u(), d());
}, zf = rx;
const pn = "adm-space", ix = {
  direction: "horizontal"
}, ax = (e) => {
  const t = U(ix, e), {
    direction: n,
    onClick: r
  } = t;
  return B(t, l.createElement("div", {
    className: j(pn, {
      [`${pn}-wrap`]: t.wrap,
      [`${pn}-block`]: t.block,
      [`${pn}-${n}`]: !0,
      [`${pn}-align-${t.align}`]: !!t.align,
      [`${pn}-justify-${t.justify}`]: !!t.justify
    }),
    onClick: r
  }, l.Children.map(t.children, (i) => i != null && l.createElement("div", {
    className: `${pn}-item`
  }, i))));
}, gc = ax, $t = "adm-image-uploader", ox = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: l.createElement(Oi, {
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
}, sx = (e) => {
  const {
    locale: t
  } = pe(), n = U(ox, e), {
    columns: r
  } = n, [i, a] = te(n), [o, s] = q([]), c = D(null), u = vs(c), d = D(null), [f, m] = q(80);
  xe(() => {
    const T = d.current;
    if (r && u && T) {
      const O = u.width, _ = j1(window.getComputedStyle(T).getPropertyValue("height"));
      m((O - _ * (r - 1)) / r);
    }
  }, [u == null ? void 0 : u.width]);
  const v = {
    "--cell-size": f + "px"
  };
  xe(() => {
    s((T) => T.filter((O) => O.url === void 0 ? !0 : !i.some((_) => _.url === O.url)));
  }, [i]), xe(() => {
    var T;
    (T = n.onUploadQueueChange) === null || T === void 0 || T.call(n, o.map((O) => ({
      id: O.id,
      status: O.status
    })));
  }, [o]);
  const g = D(0), {
    maxCount: h,
    onPreview: b,
    renderItem: w
  } = n;
  function $(T, O) {
    return Ce(this, void 0, void 0, function* () {
      const {
        beforeUpload: _
      } = n;
      let x = T;
      return x = yield _ == null ? void 0 : _(T, O), x;
    });
  }
  function y(T) {
    return n.showFailed ? T : T.filter((O) => O.status !== "fail");
  }
  function p(T) {
    var O;
    return Ce(this, void 0, void 0, function* () {
      T.persist();
      const {
        files: _
      } = T.target;
      if (!_)
        return;
      let x = [].slice.call(_);
      if (T.target.value = "", n.beforeUpload) {
        const A = x.map((V) => $(V, x));
        yield Promise.all(A).then((V) => {
          x = V.filter(Boolean);
        });
      }
      if (x.length === 0)
        return;
      if (h > 0) {
        const A = i.length + x.length - h;
        A > 0 && (x = x.slice(0, x.length - A), (O = n.onCountExceed) === null || O === void 0 || O.call(n, A));
      }
      const S = x.map((A) => ({
        id: g.current++,
        status: "pending",
        file: A
      }));
      s((A) => [...y(A), ...S]);
      const I = [];
      yield Promise.all(S.map((A, V) => Ce(this, void 0, void 0, function* () {
        try {
          const M = yield n.upload(A.file);
          I[V] = M, s((R) => R.map((W) => W.id === A.id ? Object.assign(Object.assign({}, W), {
            status: "success",
            url: M.url
          }) : W));
        } catch (M) {
          throw s((R) => R.map((W) => W.id === A.id ? Object.assign(Object.assign({}, W), {
            status: "fail"
          }) : W)), M;
        }
      }))).catch((A) => console.error(A)), a((A) => A.concat(I));
    });
  }
  const E = D(null);
  function C(T) {
    E.current = nx.Multi.show({
      images: i.map((O) => O.url),
      defaultIndex: T,
      onClose: () => {
        E.current = null;
      }
    });
  }
  xi(() => {
    var T;
    (T = E.current) === null || T === void 0 || T.close();
  });
  const k = y(o), N = n.showUpload && (h === 0 || i.length + k.length < h), P = () => i.map((T, O) => {
    var _, x;
    const S = l.createElement(zf, {
      key: (_ = T.key) !== null && _ !== void 0 ? _ : O,
      url: (x = T.thumbnailUrl) !== null && x !== void 0 ? x : T.url,
      deletable: n.deletable,
      deleteIcon: n.deleteIcon,
      imageFit: n.imageFit,
      onClick: () => {
        n.preview && C(O), b && b(O, T);
      },
      onDelete: () => Ce(void 0, void 0, void 0, function* () {
        var I;
        (yield (I = n.onDelete) === null || I === void 0 ? void 0 : I.call(n, T)) !== !1 && a(i.filter((V, M) => M !== O));
      })
    });
    return w ? w(S, T, i) : S;
  }), F = l.createElement(l.Fragment, null, P(), o.map((T) => !n.showFailed && T.status === "fail" ? null : l.createElement(zf, {
    key: T.id,
    file: T.file,
    deletable: T.status !== "pending",
    deleteIcon: n.deleteIcon,
    status: T.status,
    imageFit: n.imageFit,
    onDelete: () => {
      s(o.filter((O) => O.id !== T.id));
    }
  })), l.createElement("div", {
    className: `${$t}-upload-button-wrap`,
    style: N ? void 0 : {
      display: "none"
    }
  }, n.children || l.createElement("span", {
    className: `${$t}-cell ${$t}-upload-button`,
    role: "button",
    "aria-label": t.ImageUploader.upload
  }, l.createElement("span", {
    className: `${$t}-upload-button-icon`
  }, l.createElement(m1, null))), !n.disableUpload && l.createElement("input", {
    capture: n.capture,
    accept: n.accept,
    multiple: n.multiple,
    type: "file",
    className: `${$t}-input`,
    onChange: p,
    "aria-hidden": !0
  })));
  return B(n, l.createElement("div", {
    className: $t,
    ref: c
  }, r ? l.createElement(om, {
    className: `${$t}-grid`,
    columns: r,
    style: v
  }, l.createElement("div", {
    className: `${$t}-gap-measure`,
    ref: d
  }), F.props.children) : l.createElement(gc, {
    className: `${$t}-space`,
    wrap: !0,
    block: !0
  }, F.props.children)));
};
const zk = sx;
const dm = () => null, Gn = "adm-index-bar", lx = (e) => {
  const [t, n] = q(!1);
  return l.createElement("div", {
    className: j(`${Gn}-sidebar`, {
      [`${Gn}-sidebar-interacting`]: t
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
      className: `${Gn}-sidebar-row`,
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
      className: `${Gn}-sidebar-bubble`
    }, i), l.createElement("div", {
      className: j(`${Gn}-sidebar-item`, {
        [`${Gn}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, l.createElement("div", null, i)));
  }));
}, Yn = "adm-index-bar", cx = {
  sticky: !0
}, ux = me((e, t) => {
  const n = U(cx, e), r = Pn(35), i = D(null), a = [], o = [];
  un(n.children, (f) => {
    var m;
    if (!!l.isValidElement(f)) {
      if (f.type !== dm) {
        Me("IndexBar", "The children of `IndexBar` must be `IndexBar.Panel` components.");
        return;
      }
      a.push({
        index: f.props.index,
        brief: (m = f.props.brief) !== null && m !== void 0 ? m : f.props.index.charAt(0)
      }), o.push(B(f.props, l.createElement("div", {
        key: f.props.index,
        "data-index": f.props.index,
        className: `${Yn}-anchor`
      }, l.createElement("div", {
        className: `${Yn}-anchor-title`
      }, f.props.title || f.props.index), f.props.children)));
    }
  });
  const [s, c] = q(() => {
    const f = a[0];
    return f ? f.index : null;
  });
  ge(t, () => ({
    scrollTo: u
  }));
  function u(f) {
    var m;
    const v = i.current;
    if (!v)
      return;
    const g = v.children;
    for (let h = 0; h < g.length; h++) {
      const b = g.item(h);
      if (!b)
        continue;
      if (b.dataset.index === f) {
        v.scrollTop = b.offsetTop, c(f), s !== f && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, f));
        return;
      }
    }
  }
  const {
    run: d
  } = Ua(() => {
    var f;
    const m = i.current;
    if (!m)
      return;
    const v = m.scrollTop, g = m.getElementsByClassName(`${Yn}-anchor`);
    for (let h = 0; h < g.length; h++) {
      const b = g.item(h);
      if (!b)
        continue;
      const w = b.dataset.index;
      if (!!w && b.offsetTop + b.clientHeight - r > v) {
        c(w), s !== w && ((f = n.onIndexChange) === null || f === void 0 || f.call(n, w));
        return;
      }
    }
  }, {
    wait: 50,
    trailing: !0,
    leading: !0
  });
  return B(n, l.createElement("div", {
    className: j(`${Yn}`, {
      [`${Yn}-sticky`]: n.sticky
    })
  }, l.createElement(lx, {
    indexItems: a,
    activeIndex: s,
    onActive: (f) => {
      u(f);
    }
  }), l.createElement("div", {
    className: `${Yn}-body`,
    ref: i,
    onScroll: d
  }, o)));
}), qk = ie(ux, {
  Panel: dm
});
function fx(e) {
  return e === window;
}
const mm = "adm-infinite-scroll", dx = {
  threshold: 250,
  children: (e, t, n) => l.createElement(hx, {
    hasMore: e,
    failed: t,
    retry: n
  })
}, mx = (e) => {
  const t = U(dx, e), [n, r] = q(!1), i = t6((v) => Ce(void 0, void 0, void 0, function* () {
    try {
      yield t.loadMore(v);
    } catch (g) {
      throw r(!0), g;
    }
  })), a = D(null), [o, s] = q({}), c = D(o), [u, d] = q(), {
    run: f
  } = Ua(() => Ce(void 0, void 0, void 0, function* () {
    if (c.current !== o || !t.hasMore)
      return;
    const v = a.current;
    if (!v || !v.offsetParent)
      return;
    const g = ga(v);
    if (d(g), !g)
      return;
    const b = v.getBoundingClientRect().top;
    if ((fx(g) ? window.innerHeight : g.getBoundingClientRect().bottom) >= b - t.threshold) {
      const $ = {};
      c.current = $, yield i(!1), s($);
    }
  }), {
    wait: 100,
    leading: !0,
    trailing: !0
  });
  G(() => {
    f();
  }), G(() => {
    if (!a.current || !u)
      return;
    function g() {
      f();
    }
    return u.addEventListener("scroll", g), () => {
      u.removeEventListener("scroll", g);
    };
  }, [u]);
  function m() {
    return Ce(this, void 0, void 0, function* () {
      r(!1), yield i(!0), s(c.current);
    });
  }
  return B(t, l.createElement("div", {
    className: mm,
    ref: a
  }, typeof t.children == "function" ? t.children(t.hasMore, n, m) : t.children));
}, hx = (e) => {
  const {
    locale: t
  } = pe();
  return e.hasMore ? e.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${mm}-failed-text`
  }, t.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      e.retry();
    }
  }, t.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, t.common.loading), l.createElement(R1, null)) : l.createElement("span", null, t.InfiniteScroll.noMore);
}, Kk = mx;
const na = "adm-input", vx = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, px = me((e, t) => {
  const n = U(vx, e), [r, i] = te(n), [a, o] = q(!1), s = D(!1), c = D(null), {
    locale: u
  } = pe();
  ge(t, () => ({
    clear: () => {
      i("");
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
  }));
  const d = (v) => {
    var g;
    n.onEnterPress && (v.code === "Enter" || v.keyCode === 13) && n.onEnterPress(v), (g = n.onKeyDown) === null || g === void 0 || g.call(n, v);
  };
  xe(() => {
    var v;
    if (!!n.enterKeyHint)
      return (v = c.current) === null || v === void 0 || v.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var g;
        (g = c.current) === null || g === void 0 || g.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function f() {
    let v = r;
    if (n.type === "number") {
      const g = v && Ee(parseFloat(v), n.min, n.max).toString();
      Number(v) !== Number(g) && (v = g);
    }
    v !== r && i(v);
  }
  const m = (() => !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0)();
  return B(n, l.createElement("div", {
    className: j(`${na}`, n.disabled && `${na}-disabled`)
  }, l.createElement("input", {
    ref: c,
    className: `${na}-element`,
    value: r,
    onChange: (v) => {
      i(v.target.value);
    },
    onFocus: (v) => {
      var g;
      o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n, v);
    },
    onBlur: (v) => {
      var g;
      o(!1), f(), (g = n.onBlur) === null || g === void 0 || g.call(n, v);
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
    onKeyDown: d,
    onKeyUp: n.onKeyUp,
    onCompositionStart: (v) => {
      var g;
      s.current = !0, (g = n.onCompositionStart) === null || g === void 0 || g.call(n, v);
    },
    onCompositionEnd: (v) => {
      var g;
      s.current = !1, (g = n.onCompositionEnd) === null || g === void 0 || g.call(n, v);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && l.createElement("div", {
    className: `${na}-clear`,
    onMouseDown: (v) => {
      v.preventDefault();
    },
    onClick: () => {
      var v, g;
      i(""), (v = n.onClear) === null || v === void 0 || v.call(n), K8() && s.current && (s.current = !1, (g = c.current) === null || g === void 0 || g.blur());
    },
    "aria-label": u.Input.clear
  }, l.createElement(no, null))));
}), hm = px;
const Et = "adm-jumbo-tabs", gx = () => null, yx = (e) => {
  var t;
  const n = D(null), r = D(null), i = {};
  let a = null;
  const o = [];
  un(e.children, (f, m) => {
    if (!Ln(f))
      return;
    const v = f.key;
    if (typeof v != "string")
      return;
    m === 0 && (a = v);
    const g = o.push(f);
    i[v] = g - 1;
  });
  const [s, c] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : a,
    onChange: (f) => {
      var m;
      f !== null && ((m = e.onChange) === null || m === void 0 || m.call(e, f));
    }
  }), {
    scrollLeft: u,
    animate: d
  } = L1(n, i[s]);
  return Ti(() => {
    d(!0);
  }, r), B(e, l.createElement("div", {
    className: Et,
    ref: r
  }, l.createElement("div", {
    className: `${Et}-header`
  }, l.createElement(D1, {
    scrollTrackRef: n
  }), l.createElement(fe.div, {
    className: `${Et}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((f) => B(f.props, l.createElement("div", {
    key: f.key,
    className: `${Et}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = f;
      f.props.disabled || m != null && c(m.toString());
    },
    className: j(`${Et}-tab`, {
      [`${Et}-tab-active`]: f.key === s,
      [`${Et}-tab-disabled`]: f.props.disabled
    })
  }, l.createElement("div", {
    className: `${Et}-tab-title`
  }, f.props.title), l.createElement("div", {
    className: `${Et}-tab-description`
  }, f.props.description))))))), o.map((f) => {
    if (f.props.children === void 0)
      return null;
    const m = f.key === s;
    return l.createElement(kr, {
      key: f.key,
      active: m,
      forceRender: f.props.forceRender,
      destroyOnClose: f.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Et}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, f.props.children));
  })));
}, Gk = ie(yx, {
  Tab: gx
}), Yk = T1;
const bx = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(on, {
    key: t.key,
    onClick: e.onAction,
    className: j("adm-modal-button", {
      "adm-modal-button-primary": e.action.primary
    }),
    fill: e.action.primary ? "solid" : "none",
    size: e.action.primary ? "large" : "middle",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, wx = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, vm = (e) => {
  const t = U(wx, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Tt("image-container")
  }, l.createElement(ao, {
    src: t.image,
    alt: "modal header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Tt("header")
  }, l.createElement(hi, null, t.header)), !!t.title && l.createElement("div", {
    className: Tt("title")
  }, t.title), l.createElement("div", {
    className: Tt("content")
  }, typeof t.content == "string" ? l.createElement(hi, null, t.content) : t.content), l.createElement(gc, {
    direction: "vertical",
    block: !0,
    className: j(Tt("footer"), t.actions.length === 0 && Tt("footer-empty"))
  }, t.actions.map((r, i) => l.createElement(bx, {
    key: r.key,
    action: r,
    onAction: () => Ce(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = t.onAction) === null || o === void 0 ? void 0 : o.call(t, r, i)]), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    })
  }))));
  return l.createElement(n0, {
    className: j(Tt(), t.className),
    style: t.style,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    showCloseButton: t.showCloseButton,
    closeOnMaskClick: t.closeOnMaskClick,
    onClose: t.onClose,
    visible: t.visible,
    getContainer: t.getContainer,
    bodyStyle: t.bodyStyle,
    bodyClassName: j(Tt("body"), t.image && Tt("with-image"), t.bodyClassName),
    maskStyle: t.maskStyle,
    maskClassName: t.maskClassName,
    stopPropagation: t.stopPropagation,
    disableBodyScroll: t.disableBodyScroll,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, n);
};
function Tt(e = "") {
  return "adm-modal" + (e && "-") + e;
}
const tl = /* @__PURE__ */ new Set();
function yc(e) {
  const t = Fr(l.createElement(vm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      tl.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return tl.add(t.close), t;
}
function Ex(e) {
  const t = {
    confirmText: Ei().locale.Modal.ok
  }, n = U(t, e);
  return new Promise((r) => {
    yc(Object.assign(Object.assign({}, n), {
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
const Cx = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function $x(e) {
  const {
    locale: t
  } = Ei(), n = U(Cx, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    yc(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Ce(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Ce(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function xx() {
  tl.forEach((e) => {
    e();
  });
}
const Xk = ie(vm, {
  show: yc,
  alert: Ex,
  confirm: $x,
  clear: xx
});
const Xn = "adm-nav-bar", _x = {
  backArrow: !0
}, kx = (e) => {
  const t = U(_x, e), {
    back: n,
    backArrow: r
  } = t;
  return B(t, l.createElement("div", {
    className: j(Xn)
  }, l.createElement("div", {
    className: `${Xn}-left`,
    role: "button"
  }, n !== null && l.createElement("div", {
    className: `${Xn}-back`,
    onClick: t.onBack
  }, r && l.createElement("span", {
    className: `${Xn}-back-arrow`
  }, r === !0 ? l.createElement(my, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), t.left), l.createElement("div", {
    className: `${Xn}-title`
  }, t.children), l.createElement("div", {
    className: `${Xn}-right`
  }, t.right)));
}, Qk = kx;
const Rt = "adm-notice-bar", Sx = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement(yy, null)
}, Ox = De((e) => {
  const t = U(Sx, e), n = D(null), r = D(null), [i, a] = q(!0), o = t.speed, s = D(!0), c = D(!1);
  function u() {
    if (s.current || t.wrap)
      return;
    const d = n.current, f = r.current;
    if (!d || !f)
      return;
    if (d.offsetWidth >= f.offsetWidth) {
      c.current = !1, f.style.removeProperty("transition-duration"), f.style.removeProperty("transform");
      return;
    }
    if (c.current)
      return;
    const m = !f.style.transform;
    f.style.transitionDuration = "0s", m ? f.style.transform = "translateX(0)" : f.style.transform = `translateX(${d.offsetWidth}px)`;
    const v = m ? f.offsetWidth : d.offsetWidth + f.offsetWidth;
    c.current = !0, f.style.transitionDuration = `${Math.round(v / o)}s`, f.style.transform = `translateX(-${f.offsetWidth}px)`;
  }
  return S6(() => {
    s.current = !1, u();
  }, t.delay), Ti(() => {
    u();
  }, n), Wl(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? B(t, l.createElement("div", {
    className: j(Rt, `${Rt}-${t.color}`, {
      [`${Rt}-wrap`]: t.wrap
    }),
    onClick: t.onClick
  }, t.icon && l.createElement("span", {
    className: `${Rt}-left`
  }, t.icon), l.createElement("span", {
    ref: n,
    className: `${Rt}-content`
  }, l.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Rt}-content-inner`
  }, t.content)), (t.closeable || t.extra) && l.createElement("span", {
    className: `${Rt}-right`
  }, t.extra, t.closeable && l.createElement("div", {
    className: `${Rt}-close`,
    onClick: () => {
      var d;
      a(!1), (d = t.onClose) === null || d === void 0 || d.call(t);
    }
  }, l.createElement(Oi, {
    className: `${Rt}-close-icon`
  }))))) : null;
}), Jk = Ox;
function Fx(e) {
  const t = [...e];
  for (let n = t.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [t[n - 1], t[r]] = [t[r], t[n - 1]];
  }
  return t;
}
const ye = "adm-number-keyboard", Px = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, Nx = (e) => {
  const t = U(Px, e), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = t, d = D(null), f = re(() => {
    const p = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], E = s ? Fx(p) : p, C = Array.isArray(o) ? o : [o];
    return E.push("0"), a ? (C.length === 2 && E.splice(9, 0, C.pop()), E.push(C[0] || "")) : (E.splice(9, 0, C[0] || ""), E.push(C[1] || "BACKSPACE")), E;
  }, [o, a, s, s && n]), m = D(-1), v = D(-1), g = Zt(() => {
    var p;
    (p = t.onDelete) === null || p === void 0 || p.call(t);
  }), h = () => {
    m.current = window.setTimeout(() => {
      g(), v.current = window.setInterval(g, 150);
    }, 700);
  }, b = () => {
    clearTimeout(m.current), clearInterval(v.current);
  }, w = (p, E) => {
    var C, k;
    switch (p.preventDefault(), E) {
      case "BACKSPACE":
        g == null || g();
        break;
      case "OK":
        (C = t.onConfirm) === null || C === void 0 || C.call(t), t.closeOnConfirm && ((k = t.onClose) === null || k === void 0 || k.call(t));
        break;
      default:
        E !== "" && (u == null || u(E));
        break;
    }
  }, $ = () => !c && !r ? null : l.createElement("div", {
    className: j(`${ye}-header`, {
      [`${ye}-header-with-title`]: !!r
    })
  }, l.createElement("div", {
    className: `${ye}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${ye}-header-close-button`,
    onClick: () => {
      var p;
      (p = t.onClose) === null || p === void 0 || p.call(t);
    },
    role: "grid",
    title: "CLOSE",
    tabIndex: -1
  }, l.createElement(g1, null))), y = (p, E) => {
    const C = /^\d$/.test(p), k = j(`${ye}-key`, {
      [`${ye}-key-number`]: C,
      [`${ye}-key-sign`]: !C && p,
      [`${ye}-key-mid`]: E === 9 && !!a && f.length < 12
    }), N = p ? {
      role: "grid",
      title: p,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: p,
      className: k,
      onTouchStart: () => {
        p === "BACKSPACE" && h();
      },
      onTouchEnd: (P) => {
        w(P, p), p === "BACKSPACE" && b();
      }
    }, N), p === "BACKSPACE" ? l.createElement(Tu, null) : p);
  };
  return l.createElement(Pi, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    className: `${ye}-popup`,
    stopPropagation: t.stopPropagation,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, B(t, l.createElement("div", {
    ref: d,
    className: ye,
    onMouseDown: (p) => {
      p.preventDefault();
    }
  }, $(), l.createElement("div", {
    className: `${ye}-wrapper`
  }, l.createElement("div", {
    className: j(`${ye}-main`, {
      [`${ye}-main-confirmed-style`]: !!a
    })
  }, f.map(y)), !!a && l.createElement("div", {
    className: `${ye}-confirm`
  }, l.createElement("div", {
    className: `${ye}-key ${ye}-key-extra ${ye}-key-bs`,
    onTouchStart: () => {
      h();
    },
    onTouchEnd: (p) => {
      w(p, "BACKSPACE"), b();
    },
    title: "BACKSPACE",
    role: "grid",
    tabIndex: -1
  }, l.createElement(Tu, null)), l.createElement("div", {
    className: `${ye}-key ${ye}-key-extra ${ye}-key-ok`,
    onTouchEnd: (p) => w(p, "OK"),
    role: "grid",
    tabIndex: -1,
    "aria-label": a
  }, a))), t.safeArea && l.createElement("div", {
    className: `${ye}-footer`
  }, l.createElement(Or, {
    position: "bottom"
  })))));
}, eS = Nx;
const Ur = "adm-page-indicator", Ax = {
  color: "primary",
  direction: "horizontal"
}, Tx = De((e) => {
  const t = U(Ax, e), n = [];
  for (let r = 0; r < t.total; r++)
    n.push(l.createElement("div", {
      key: r,
      className: j(`${Ur}-dot`, {
        [`${Ur}-dot-active`]: t.current === r
      })
    }));
  return B(t, l.createElement("div", {
    className: j(Ur, `${Ur}-${t.direction}`, `${Ur}-color-${t.color}`)
  }, n));
}), Rx = Tx;
const Ct = "adm-passcode-input", qf = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, Mx = me((e, t) => {
  const n = U(qf, e), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : qf.length, {
    locale: i
  } = pe(), [a, o] = q(!1), [s, c] = te(n), u = D(null), d = D(null);
  G(() => {
    var h;
    s.length >= r && ((h = n.onFill) === null || h === void 0 || h.call(n, s));
  }, [s, r]);
  const f = () => {
    var h, b;
    n.keyboard || (h = d.current) === null || h === void 0 || h.focus(), o(!0), (b = n.onFocus) === null || b === void 0 || b.call(n);
  };
  G(() => {
    if (!a)
      return;
    const h = window.setTimeout(() => {
      var b;
      (b = u.current) === null || b === void 0 || b.scrollIntoView({
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
  ge(t, () => ({
    focus: () => {
      var h;
      return (h = u.current) === null || h === void 0 ? void 0 : h.focus();
    },
    blur: () => {
      var h, b;
      (h = u.current) === null || h === void 0 || h.blur(), (b = d.current) === null || b === void 0 || b.blur();
    }
  }));
  const v = () => {
    const h = [], b = s.split(""), w = b.length, $ = Ee(b.length, 0, r - 1);
    for (let y = 0; y < r; y++)
      h.push(l.createElement("div", {
        className: j(`${Ct}-cell`, {
          [`${Ct}-cell-caret`]: n.caret && w === y && a,
          [`${Ct}-cell-focused`]: $ === y && a,
          [`${Ct}-cell-dot`]: !n.plain && b[y]
        }),
        key: y
      }, b[y] && n.plain ? b[y] : ""));
    return h;
  }, g = j(Ct, {
    [`${Ct}-focused`]: a,
    [`${Ct}-error`]: n.error,
    [`${Ct}-seperated`]: n.seperated
  });
  return l.createElement(l.Fragment, null, B(n, l.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: g,
    onFocus: f,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, l.createElement("div", {
    className: `${Ct}-cell-container`
  }, v()), l.createElement("input", {
    ref: d,
    className: `${Ct}-native-input`,
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
}), tS = Mx;
const zr = "adm-progress-bar", Ix = {
  percent: 0,
  rounded: !0,
  text: !1
}, Lx = (e) => {
  const t = U(Ix, e), n = {
    width: `${t.percent}%`
  }, r = function() {
    return t.text === !0 ? `${t.percent}%` : typeof t.text == "function" ? t.text(t.percent) : t.text;
  }();
  return B(t, l.createElement("div", {
    className: j(zr, t.rounded && `${zr}-rounded`)
  }, l.createElement("div", {
    className: `${zr}-trail`
  }, l.createElement("div", {
    className: `${zr}-fill`,
    style: n
  })), Vt(r) && l.createElement("div", {
    className: `${zr}-text`
  }, r)));
}, nS = Lx;
const Qn = "adm-progress-circle", Dx = (e) => {
  const t = U({
    percent: 0
  }, e), n = {
    "--percent": t.percent.toString()
  };
  return B(t, l.createElement("div", {
    className: `${Qn}`,
    style: n
  }, l.createElement("div", {
    className: `${Qn}-content`
  }, l.createElement("svg", {
    className: `${Qn}-svg`
  }, l.createElement("circle", {
    className: `${Qn}-track`,
    fill: "transparent"
  }), l.createElement("circle", {
    className: `${Qn}-fill`,
    fill: "transparent"
  })), l.createElement("div", {
    className: `${Qn}-info`
  }, t.children))));
}, rS = Dx;
const Vx = (e) => new Promise((t) => setTimeout(t, e)), ra = "adm-pull-to-refresh", jx = {
  pullingText: "\u4E0B\u62C9\u5237\u65B0",
  canReleaseText: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
  refreshingText: "\u52A0\u8F7D\u4E2D...",
  completeText: "\u5237\u65B0\u6210\u529F",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, Bx = (e) => {
  var t, n;
  const {
    locale: r
  } = pe(), i = U(jx, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, e), a = (t = i.headHeight) !== null && t !== void 0 ? t : Pn(40), o = (n = i.threshold) !== null && n !== void 0 ? n : Pn(60), [s, c] = q("pulling"), [u, d] = Pe(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      round: !0,
      clamp: !0
    }
  })), f = D(null), m = D(!1);
  G(() => {
    var b;
    (b = f.current) === null || b === void 0 || b.addEventListener("touchmove", () => {
    });
  }, []);
  const v = () => new Promise((b) => {
    d.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), b();
      }
    });
  });
  function g() {
    return Ce(this, void 0, void 0, function* () {
      d.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (b) {
        throw v(), b;
      }
      i.completeDelay > 0 && (yield Vx(i.completeDelay)), v();
    });
  }
  Pt((b) => {
    if (s === "refreshing" || s === "complete")
      return;
    const {
      event: w
    } = b;
    if (b.last) {
      m.current = !1, s === "canRelease" ? g() : d.start({
        height: 0
      });
      return;
    }
    const [, $] = b.movement, y = Math.ceil($);
    if (b.first && y > 0) {
      let k = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const E = b.event.target;
      if (!E || !(E instanceof Element))
        return;
      let C = ga(E);
      for (; ; ) {
        if (!C || k(C) > 0)
          return;
        if (C instanceof Window)
          break;
        C = ga(C.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    w.cancelable && w.preventDefault(), w.stopPropagation();
    const p = Math.max(vi(y, 0, 0, a * 5, 0.5), 0);
    d.start({
      height: p
    }), c(p > o ? "canRelease" : "pulling");
  }, {
    pointer: {
      touch: !0
    },
    axis: "y",
    target: f,
    enabled: !i.disabled,
    eventOptions: Nn ? {
      passive: !1
    } : void 0
  });
  const h = () => {
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
  return l.createElement(fe.div, {
    ref: f,
    className: ra
  }, l.createElement(fe.div, {
    style: u,
    className: `${ra}-head`
  }, l.createElement("div", {
    className: `${ra}-head-content`,
    style: {
      height: a
    }
  }, h())), l.createElement("div", {
    className: `${ra}-content`
  }, i.children));
}, iS = Bx;
const pm = ol(null), Wx = {
  disabled: !1,
  defaultValue: null
}, Zx = (e) => {
  const t = U(Wx, e), [n, r] = te({
    value: t.value,
    defaultValue: t.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = t.onChange) === null || a === void 0 || a.call(t, i));
    }
  });
  return l.createElement(
    pm.Provider,
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
}, gn = "adm-radio", Hx = {
  defaultChecked: !1
}, Ux = (e) => {
  const t = U(Hx, e), n = it(pm);
  let [r, i] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  }), a = t.disabled;
  const {
    value: o
  } = t;
  n && o !== void 0 && (go && (e.checked !== void 0 && Me("Radio", "When used within `Radio.Group`, the `checked` prop of `Radio` will not work."), e.defaultChecked !== void 0 && Me("Radio", "When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.")), r = n.value.includes(o), i = (c) => {
    var u;
    c ? n.check(o) : n.uncheck(o), (u = t.onChange) === null || u === void 0 || u.call(t, c);
  }, a = a || n.disabled);
  const s = () => t.icon ? l.createElement("div", {
    className: `${gn}-custom-icon`
  }, t.icon(r)) : l.createElement("div", {
    className: `${gn}-icon`
  }, r && l.createElement(i0, null));
  return B(t, l.createElement("label", {
    onClick: t.onClick,
    className: j(gn, {
      [`${gn}-checked`]: r,
      [`${gn}-disabled`]: a,
      [`${gn}-block`]: t.block
    })
  }, l.createElement(a0, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: t.id
  }), s(), t.children && l.createElement("div", {
    className: `${gn}-content`
  }, t.children)));
}, aS = ie(Ux, {
  Group: Zx
});
const zx = () => l.createElement("svg", {
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
})), yn = "adm-rate", qx = {
  count: 5,
  allowHalf: !1,
  character: l.createElement(zx, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, Kx = (e) => {
  const t = U(qx, e), [n, r] = te(t), i = D(null), a = Array(t.count).fill(null);
  function o(c, u) {
    return l.createElement("div", {
      className: j(`${yn}-star`, {
        [`${yn}-star-active`]: n >= c,
        [`${yn}-star-half`]: u,
        [`${yn}-star-readonly`]: t.readOnly
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
      tap: d
    } = c, f = i.current;
    if (!f)
      return;
    const m = f.getBoundingClientRect(), v = (u - m.left) / m.width * t.count, g = t.allowHalf ? Math.ceil(v * 2) / 2 : Math.ceil(v), h = Ee(g, 0, t.count);
    if (d && t.allowClear && h === n) {
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
  return B(t, l.createElement("div", Object.assign({
    className: j(yn, {
      [`${yn}-half`]: t.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": t.readOnly,
    ref: i
  }, s()), a.map((c, u) => l.createElement("div", {
    key: u,
    className: j(`${yn}-box`)
  }, t.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, oS = Kx;
const qr = "adm-result", Gx = {
  success: h1,
  error: no,
  info: b1,
  waiting: p1,
  warning: y1
}, Yx = {
  status: "info"
}, Xx = (e) => {
  const t = U(Yx, e), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = t;
  if (!n)
    return null;
  const o = a || l.createElement(Gx[n]);
  return B(t, l.createElement("div", {
    className: j(qr, `${qr}-${n}`)
  }, l.createElement("div", {
    className: `${qr}-icon`
  }, o), l.createElement("div", {
    className: `${qr}-title`
  }, r), !!i && l.createElement("div", {
    className: `${qr}-description`
  }, i)));
}, sS = Xx;
const Ae = "adm-result-page", Qx = {
  success: h1,
  error: no,
  info: b1,
  waiting: p1,
  warning: y1
}, Jx = {
  status: "info",
  details: []
}, e_ = (e) => {
  const t = U(Jx, e), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: d
  } = t, f = o || l.createElement(Qx[n]), [m, v] = q(!0), g = Vt(c), h = Vt(s);
  return B(t, l.createElement("div", {
    className: Ae
  }, l.createElement("div", {
    className: `${Ae}-header`
  }, l.createElement("div", {
    className: `${Ae}-icon`
  }, f), l.createElement("div", {
    className: `${Ae}-title`
  }, r), Vt(i) ? l.createElement("div", {
    className: `${Ae}-description`
  }, i) : null, a.length ? l.createElement("div", {
    className: `${Ae}-details`
  }, (m ? a.slice(0, 3) : a).map((b, w) => l.createElement("div", {
    className: j(`${Ae}-detail`, b.bold && `${Ae}-detail-bold`),
    key: w
  }, l.createElement("span", null, b.label), l.createElement("span", null, b.value))), a.length > 3 && l.createElement("div", {
    onClick: () => v((b) => !b)
  }, l.createElement("div", {
    className: j(`${Ae}-collapse`, !m && `${Ae}-collapse-active`)
  }))) : null, l.createElement("div", {
    className: `${Ae}-bgWrapper`
  }, l.createElement("div", {
    className: `${Ae}-bg`
  }))), l.createElement("div", {
    className: `${Ae}-content`
  }, t.children), l.createElement("div", {
    className: `${Ae}-footer`
  }, g && l.createElement(on, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: d,
    className: `${Ae}-footer-btn`
  }, c), h && g && l.createElement("div", {
    className: `${Ae}-footer-space`
  }), h && l.createElement(on, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Ae}-footer-btn`
  }, s))));
}, t_ = "adm-result-page-card", n_ = (e) => B(e, l.createElement("div", {
  className: j(`${t_}`)
}, e.children)), lS = ie(e_, {
  Card: n_
});
const Yt = "adm-search-bar", r_ = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(gy, null)
}, i_ = me((e, t) => {
  const {
    locale: n
  } = pe(), r = U(r_, {
    cancelText: n.common.cancel
  }, e), [i, a] = te(r), [o, s] = q(!1), c = D(null), u = D(!1);
  ge(t, () => ({
    clear: () => {
      var f;
      return (f = c.current) === null || f === void 0 ? void 0 : f.clear();
    },
    focus: () => {
      var f;
      return (f = c.current) === null || f === void 0 ? void 0 : f.focus();
    },
    blur: () => {
      var f;
      return (f = c.current) === null || f === void 0 ? void 0 : f.blur();
    },
    get nativeElement() {
      var f, m;
      return (m = (f = c.current) === null || f === void 0 ? void 0 : f.nativeElement) !== null && m !== void 0 ? m : null;
    }
  }));
  const d = () => {
    let f;
    return typeof r.showCancelButton == "function" ? f = r.showCancelButton(o, i) : f = r.showCancelButton && o, f && l.createElement("div", {
      className: `${Yt}-suffix`
    }, l.createElement(on, {
      fill: "none",
      className: `${Yt}-cancel-button`,
      onClick: () => {
        var m, v, g;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (v = c.current) === null || v === void 0 || v.blur(), (g = r.onCancel) === null || g === void 0 || g.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return B(r, l.createElement("div", {
    className: j(Yt, {
      [`${Yt}-active`]: o
    })
  }, l.createElement("div", {
    className: `${Yt}-input-box`
  }, r.icon && l.createElement("div", {
    className: `${Yt}-input-box-icon`
  }, r.icon), l.createElement(hm, {
    ref: c,
    className: j(`${Yt}-input`, {
      [`${Yt}-input-without-icon`]: !r.icon
    }),
    value: i,
    onChange: a,
    maxLength: r.maxLength,
    placeholder: r.placeholder,
    clearable: r.clearable,
    onlyShowClearWhenFocus: r.onlyShowClearWhenFocus,
    onFocus: (f) => {
      var m;
      s(!0), (m = r.onFocus) === null || m === void 0 || m.call(r, f);
    },
    onBlur: (f) => {
      var m;
      s(!1), (m = r.onBlur) === null || m === void 0 || m.call(r, f);
    },
    onClear: r.onClear,
    type: "search",
    enterKeyHint: "search",
    onEnterPress: () => {
      var f, m;
      u.current || ((f = c.current) === null || f === void 0 || f.blur(), (m = r.onSearch) === null || m === void 0 || m.call(r, i));
    },
    "aria-label": n.SearchBar.name,
    onCompositionStart: (f) => {
      var m;
      u.current = !0, (m = r.onCompositionStart) === null || m === void 0 || m.call(r, f);
    },
    onCompositionEnd: (f) => {
      var m;
      u.current = !1, (m = r.onCompositionEnd) === null || m === void 0 || m.call(r, f);
    }
  })), d()));
}), cS = i_;
const a_ = De(() => l.createElement("svg", {
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
})))))))), bn = "adm-selector", o_ = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, s_ = (e) => {
  const t = U(o_, e), [n, r] = te({
    value: t.value,
    defaultValue: t.defaultValue,
    onChange: (o) => {
      var s;
      const c = {
        get items() {
          return t.options.filter((u) => o.includes(u.value));
        }
      };
      (s = t.onChange) === null || s === void 0 || s.call(t, o, c);
    }
  }), {
    locale: i
  } = pe(), a = t.options.map((o) => {
    const s = (n || []).includes(o.value), c = o.disabled || t.disabled, u = j(`${bn}-item`, {
      [`${bn}-item-active`]: s && !t.multiple,
      [`${bn}-item-multiple-active`]: s && t.multiple,
      [`${bn}-item-disabled`]: c
    });
    return l.createElement("div", {
      key: o.value,
      className: u,
      onClick: () => {
        if (!c)
          if (t.multiple) {
            const d = s ? n.filter((f) => f !== o.value) : [...n, o.value];
            r(d);
          } else {
            const d = s ? [] : [o.value];
            r(d);
          }
      },
      role: "option",
      "aria-selected": s && !t.multiple || s && t.multiple
    }, o.label, o.description && l.createElement("div", {
      className: `${bn}-item-description`
    }, o.description), s && t.showCheckMark && l.createElement("div", {
      className: `${bn}-check-mark-wrapper`
    }, l.createElement(a_, null)));
  });
  return B(t, l.createElement("div", {
    className: bn,
    role: "listbox",
    "aria-label": i.Selector.name
  }, !t.columns && l.createElement(gc, {
    wrap: !0
  }, a), t.columns && l.createElement(om, {
    columns: t.columns
  }, a)));
}, uS = s_;
const es = De((e) => B(e, l.createElement("svg", {
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
}))))), Re = "adm-side-bar", l_ = () => null, c_ = (e) => {
  var t;
  let n = null;
  const r = [];
  un(e.children, (c, u) => {
    if (!Ln(c))
      return;
    const d = c.key;
    typeof d == "string" && (u === 0 && (n = d), r.push(c));
  });
  const [i, a] = te({
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : n,
    onChange: (c) => {
      var u;
      c !== null && ((u = e.onChange) === null || u === void 0 || u.call(e, c));
    }
  }), o = r[r.length - 1], s = o && o.key === i;
  return B(e, l.createElement("div", {
    className: Re
  }, l.createElement("div", {
    className: `${Re}-items`
  }, r.map((c, u) => {
    const d = c.key === i, f = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return B(c.props, l.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: v
        } = c;
        v == null || c.props.disabled || a(v.toString());
      },
      className: j(`${Re}-item`, {
        [`${Re}-item-active`]: d,
        [`${Re}-item-disabled`]: c.props.disabled
      })
    }, l.createElement(l.Fragment, null, f && l.createElement(es, {
      className: `${Re}-item-corner ${Re}-item-corner-top`
    }), m && l.createElement(es, {
      className: `${Re}-item-corner ${Re}-item-corner-bottom`
    })), l.createElement(Fs, {
      content: c.props.badge,
      className: `${Re}-badge`
    }, l.createElement("div", {
      className: `${Re}-item-title`
    }, d && l.createElement("div", {
      className: `${Re}-item-highlight`
    }), c.props.title))));
  })), l.createElement("div", {
    className: j(`${Re}-extra-space`, s && `${Re}-item-active-next-sibling`)
  }, s && l.createElement(es, {
    className: `${Re}-item-corner ${Re}-item-corner-top`
  }))));
}, fS = ie(c_, {
  Item: l_
});
const ts = "adm-slider", u_ = ({
  points: e,
  max: t,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = t - n, o = e.map((s) => {
    const c = `${Math.abs(s - n) / a * 100}%`, u = s <= r && s >= i, d = {
      left: c
    }, f = j({
      [`${ts}-tick`]: !0,
      [`${ts}-tick-active`]: u
    });
    return l.createElement("span", {
      className: f,
      style: d,
      key: s
    });
  });
  return l.createElement("div", {
    className: `${ts}-ticks`
  }, o);
}, f_ = u_, ns = "adm-slider-mark", d_ = ({
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
    const d = c <= t && c >= n, f = j({
      [`${ns}-text`]: !0,
      [`${ns}-text-active`]: d
    }), m = {
      left: `${(c - i) / o * 100}%`
    };
    return l.createElement("span", {
      className: f,
      style: m,
      key: c
    }, u);
  });
  return l.createElement("div", {
    className: ns
  }, s);
}, m_ = d_;
function nl() {
  return typeof BigInt == "function";
}
function gm(e) {
  return !e && e !== 0 && !Number.isNaN(e) || !String(e).trim();
}
function ai(e) {
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
function bc(e) {
  var t = String(e);
  return !Number.isNaN(Number(t)) && t.includes("e");
}
function Qr(e) {
  var t = String(e);
  if (bc(e)) {
    var n = Number(t.slice(t.indexOf("e-") + 2)), r = t.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return t.includes(".") && bm(t) ? t.length - t.indexOf(".") - 1 : 0;
}
function ym(e) {
  var t = String(e);
  if (bc(e)) {
    if (e > Number.MAX_SAFE_INTEGER)
      return String(nl() ? BigInt(e).toString() : Number.MAX_SAFE_INTEGER);
    if (e < Number.MIN_SAFE_INTEGER)
      return String(nl() ? BigInt(e).toString() : Number.MIN_SAFE_INTEGER);
    t = e.toFixed(Qr(t));
  }
  return ai(t).fullStr;
}
function bm(e) {
  return typeof e == "number" ? !Number.isNaN(e) : e ? /^\s*-?\d+(\.\d+)?\s*$/.test(e) || /^\s*-?\d+\.\s*$/.test(e) || /^\s*-?\.\d+\s*$/.test(e) : !1;
}
var h_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ri(this, e), Le(this, "origin", ""), Le(this, "negative", void 0), Le(this, "integer", void 0), Le(this, "decimal", void 0), Le(this, "decimalLen", void 0), Le(this, "empty", void 0), Le(this, "nan", void 0), gm(t)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(t), t === "-" || Number.isNaN(t)) {
      this.nan = !0;
      return;
    }
    var n = t;
    if (bc(n) && (n = Number(n)), n = typeof n == "string" ? n : ym(n), bm(n)) {
      var r = ai(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Mi(e, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), s = n.alignDecimal(a), c = r(o, s).toString(), u = i(a), d = ai(c), f = d.negativeStr, m = d.trimStr, v = "".concat(f).concat(m.padStart(u + 1, "0"));
      return new e("".concat(v.slice(0, -u), ".").concat(v.slice(-u)));
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
      return n ? this.isInvalidate() ? "" : ai("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), e;
}(), v_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Ri(this, e), Le(this, "origin", ""), Le(this, "number", void 0), Le(this, "empty", void 0), gm(t)) {
      this.empty = !0;
      return;
    }
    this.origin = String(t), this.number = Number(t);
  }
  return Mi(e, [{
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
      var a = Math.max(Qr(this.number), Qr(r));
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
      var a = Math.max(Qr(this.number), Qr(r));
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
      return n ? this.isInvalidate() ? "" : ym(this.number) : this.origin;
    }
  }]), e;
}();
function We(e) {
  return nl() ? new h_(e) : new v_(e);
}
function wc(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === "")
    return "";
  var i = ai(e), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(t).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var d = Number(s[n]);
    if (d >= 5 && !r) {
      var f = We(e).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - d));
      return wc(f.toString(), t, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(t).concat(s.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const p_ = (e) => B(e, l.createElement("svg", {
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
})))), rs = "adm-slider", g_ = (e) => {
  const {
    value: t,
    min: n,
    max: r,
    disabled: i,
    icon: a,
    residentPopover: o,
    onDrag: s
  } = e, c = D(t), {
    locale: u
  } = pe(), d = () => ({
    left: `${(t - n) / (r - n) * 100}%`,
    right: "auto"
  }), [f, m] = q(!1), v = Pt((b) => {
    var w;
    if (i)
      return;
    b.first && (c.current = t);
    const $ = b.xy[0] - b.initial[0], y = (w = e.trackRef.current) === null || w === void 0 ? void 0 : w.offsetWidth;
    if (!y)
      return;
    const p = $ / Math.ceil(y) * (r - n);
    s(c.current + p, b.first, b.last), m(!b.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), g = typeof e.popover == "function" ? e.popover : e.popover ? (b) => b.toString() : null, h = l.createElement("div", {
    className: `${rs}-thumb`
  }, a || l.createElement(p_, {
    className: `${rs}-thumb-icon`
  }));
  return l.createElement("div", Object.assign({
    className: `${rs}-thumb-container`,
    style: d()
  }, v(), {
    role: "slider",
    "aria-label": e["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": t,
    "aria-disabled": i
  }), g ? l.createElement(im, {
    content: g(t),
    placement: "top",
    visible: o || f,
    getContainer: null,
    mode: "dark"
  }, h) : h);
}, y_ = g_, Kr = "adm-slider", b_ = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, w_ = (e) => {
  var t;
  const n = U(b_, e), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: s,
    step: c,
    icon: u
  } = n;
  function d(x) {
    return x.sort((S, I) => S - I);
  }
  function f(x) {
    return n.range ? x : [n.min, x];
  }
  function m(x, S) {
    const I = We(x), A = wc(I.toString(), ".", S);
    return We(A).toNumber();
  }
  function v(x) {
    const S = Math.max(g(c), g(x[0]), g(x[1]));
    return n.range ? x.map((I) => m(I, S)) : m(x[1], S);
  }
  function g(x) {
    return (`${x}`.split(".")[1] || "").length;
  }
  function h(x) {
    var S;
    (S = n.onAfterChange) === null || S === void 0 || S.call(n, v(x));
  }
  let b = n.value;
  n.range && typeof n.value == "number" && (Me("Slider", "When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]"), b = [0, n.value]);
  const [w, $] = te({
    value: b,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : n.range ? [r, r] : r,
    onChange: n.onChange
  }), y = d(f(w));
  function p(x) {
    const S = d(x), I = y;
    S[0] === I[0] && S[1] === I[1] || $(v(S));
  }
  const E = D(null), C = `${100 * (y[1] - y[0]) / (i - r)}%`, k = `${100 * (y[0] - r) / (i - r)}%`, N = re(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((x, S) => x - S);
    if (s) {
      const x = [];
      for (let S = We(r); S.lessEquals(We(i)); S = S.add(c))
        x.push(S.toNumber());
      return x;
    }
    return [];
  }, [o, s, c, r, i]);
  function P(x) {
    const S = x < r ? r : x > i ? i : x;
    let I = r;
    if (N.length)
      I = ec(N, S);
    else {
      const A = Math.round((S - r) / c), V = We(A).multi(c);
      I = We(r).add(V.toString()).toNumber();
    }
    return I;
  }
  const F = D(0), T = (x) => {
    if (F.current > 0 || (x.stopPropagation(), a))
      return;
    const S = E.current;
    if (!S)
      return;
    const I = S.getBoundingClientRect().left, A = (x.clientX - I) / Math.ceil(S.offsetWidth) * (i - r) + r, V = P(A);
    let M;
    n.range ? Math.abs(V - y[0]) > Math.abs(V - y[1]) ? M = [y[0], V] : M = [V, y[1]] : M = [n.min, V], p(M), h(M);
  }, O = D(), _ = (x) => l.createElement(y_, {
    key: x,
    value: y[x],
    min: r,
    max: i,
    disabled: a,
    trackRef: E,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (S, I, A) => {
      I && (F.current += 1, O.current = y);
      const V = P(S), M = O.current;
      if (!M)
        return;
      const R = [...M];
      R[x] = V, p(R), A && (h(R), window.setTimeout(() => {
        F.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return B(n, l.createElement("div", {
    className: j(Kr, {
      [`${Kr}-disabled`]: a
    })
  }, l.createElement("div", {
    className: `${Kr}-track-container`,
    onClick: T
  }, l.createElement("div", {
    className: `${Kr}-track`,
    onClick: T,
    ref: E
  }, l.createElement("div", {
    className: `${Kr}-fill`,
    style: {
      width: C,
      left: k
    }
  }), n.ticks && l.createElement(f_, {
    points: N,
    min: r,
    max: i,
    lowerBound: y[0],
    upperBound: y[1]
  }), n.range && _(0), _(1))), o && l.createElement(m_, {
    min: r,
    max: i,
    marks: o,
    lowerBound: y[0],
    upperBound: y[1]
  })));
}, dS = w_;
var wm = {}, Ec = { exports: {} }, Em = { exports: {} };
(function(e) {
  function t(n) {
    if (Array.isArray(n))
      return n;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Em);
var Cm = { exports: {} };
(function(e) {
  function t(n, r) {
    var i = n == null ? null : typeof Symbol < "u" && n[Symbol.iterator] || n["@@iterator"];
    if (i != null) {
      var a, o, s, c, u = [], d = !0, f = !1;
      try {
        if (s = (i = i.call(n)).next, r === 0) {
          if (Object(i) !== i)
            return;
          d = !1;
        } else
          for (; !(d = (a = s.call(i)).done) && (u.push(a.value), u.length !== r); d = !0)
            ;
      } catch (m) {
        f = !0, o = m;
      } finally {
        try {
          if (!d && i.return != null && (c = i.return(), Object(c) !== c))
            return;
        } finally {
          if (f)
            throw o;
        }
      }
      return u;
    }
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Cm);
var $m = { exports: {} }, xm = { exports: {} };
(function(e) {
  function t(n, r) {
    (r == null || r > n.length) && (r = n.length);
    for (var i = 0, a = new Array(r); i < r; i++)
      a[i] = n[i];
    return a;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(xm);
(function(e) {
  var t = xm.exports;
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
})($m);
var _m = { exports: {} };
(function(e) {
  function t() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(_m);
(function(e) {
  var t = Em.exports, n = Cm.exports, r = $m.exports, i = _m.exports;
  function a(o, s) {
    return t(o) || n(o, s) || r(o, s) || i();
  }
  e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ec);
var Cc = {}, E_ = Li.exports.default;
Object.defineProperty(Cc, "__esModule", {
  value: !0
});
Cc.default = C_;
var Kf = E_(l);
function C_(e) {
  var t = Kf.useRef();
  t.current = e;
  var n = Kf.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(a));
  }, []);
  return n;
}
var hr = {}, $c = {};
Object.defineProperty($c, "__esModule", {
  value: !0
});
$c.default = $_;
function $_() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var x_ = Di.exports.default, __ = Li.exports.default;
Object.defineProperty(hr, "__esModule", {
  value: !0
});
hr.useLayoutUpdateEffect = hr.default = void 0;
var rl = __(l), k_ = x_($c), il = (0, k_.default)() ? rl.useLayoutEffect : rl.useEffect, S_ = il;
hr.default = S_;
var O_ = function(t, n) {
  var r = rl.useRef(!0);
  il(function() {
    if (!r.current)
      return t();
  }, n), il(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
};
hr.useLayoutUpdateEffect = O_;
var xc = {}, F_ = Li.exports.default, P_ = Di.exports.default;
Object.defineProperty(xc, "__esModule", {
  value: !0
});
xc.default = A_;
var N_ = P_(Ec.exports), is = F_(l);
function A_(e) {
  var t = is.useRef(!1), n = is.useState(e), r = (0, N_.default)(n, 2), i = r[0], a = r[1];
  is.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, c) {
    c && t.current || a(s);
  }
  return [i, o];
}
var _c = Di.exports.default;
Object.defineProperty(wm, "__esModule", {
  value: !0
});
var T_ = wm.default = R_, Gf = _c(Ec.exports), Yf = _c(Cc), Xf = hr, Qf = _c(xc);
function as(e) {
  return e !== void 0;
}
function R_(e, t) {
  var n = t || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = (0, Qf.default)(function() {
    return as(i) ? i : as(r) ? typeof r == "function" ? r() : r : typeof e == "function" ? e() : e;
  }), c = (0, Gf.default)(s, 2), u = c[0], d = c[1], f = i !== void 0 ? i : u, m = o ? o(f) : f, v = (0, Yf.default)(a), g = (0, Qf.default)([f]), h = (0, Gf.default)(g, 2), b = h[0], w = h[1];
  (0, Xf.useLayoutUpdateEffect)(function() {
    var y = b[0];
    u !== y && v(u, y);
  }, [b]), (0, Xf.useLayoutUpdateEffect)(function() {
    as(i) || d(i);
  }, [i]);
  var $ = (0, Yf.default)(function(y, p) {
    d(y, p), w([f], p);
  });
  return [m, $];
}
const Jn = "adm-stepper", M_ = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function I_(e, t) {
  const n = U(M_, e), {
    defaultValue: r = 0,
    value: i,
    onChange: a,
    disabled: o,
    step: s,
    max: c,
    min: u,
    inputReadOnly: d,
    digits: f,
    stringMode: m,
    formatter: v,
    parser: g
  } = n, {
    locale: h
  } = pe();
  ge(t, () => ({
    focus: () => {
      var M;
      (M = O.current) === null || M === void 0 || M.focus();
    },
    blur: () => {
      var M;
      (M = O.current) === null || M === void 0 || M.blur();
    },
    get nativeElement() {
      var M, R;
      return (R = (M = O.current) === null || M === void 0 ? void 0 : M.nativeElement) !== null && R !== void 0 ? R : null;
    }
  }));
  const b = (M) => (f !== void 0 ? wc(M.toString(), ".", f) : M).toString(), w = (M) => m ? M.toString() : M.toNumber(), $ = (M) => {
    if (M === "")
      return null;
    if (g)
      return String(g(M));
    const R = We(M);
    return R.isInvalidate() ? null : R.toString();
  }, y = (M) => M === null ? "" : v ? v(M) : b(M), [p, E] = T_(r, {
    value: i,
    onChange: (M) => {
      a == null || a(M);
    }
  }), [C, k] = q(() => y(p));
  function N(M) {
    if (M.isNaN())
      return;
    let R = M;
    if (u !== void 0) {
      const W = We(u);
      R.lessEquals(W) && (R = W);
    }
    if (c !== void 0) {
      const W = We(c);
      W.lessEquals(R) && (R = W);
    }
    f !== void 0 && (R = We(b(w(R)))), E(w(R));
  }
  const P = (M) => {
    k(M);
    const R = $(M);
    R === null ? n.allowEmpty ? E(null) : E(r) : N(We(R));
  }, [F, T] = q(!1), O = l.useRef(null);
  function _(M) {
    T(M), M && k(p != null ? String(p) : "");
  }
  G(() => {
    var M, R, W;
    F && ((W = (R = (M = O.current) === null || M === void 0 ? void 0 : M.nativeElement) === null || R === void 0 ? void 0 : R.select) === null || W === void 0 || W.call(R));
  }, [F]), G(() => {
    F || k(y(p));
  }, [F, p, f]);
  const x = (M) => {
    let R = We(s);
    M || (R = R.negate()), N(We(p != null ? p : 0).add(R.toString()));
  }, S = () => {
    x(!1);
  }, I = () => {
    x(!0);
  }, A = () => o ? !0 : p === null ? !1 : u !== void 0 ? p <= u : !1, V = () => o ? !0 : p === null ? !1 : c !== void 0 ? p >= c : !1;
  return B(n, l.createElement("div", {
    className: j(Jn, {
      [`${Jn}-active`]: F
    })
  }, l.createElement(on, {
    className: `${Jn}-minus`,
    onClick: S,
    disabled: A(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.decrease
  }, l.createElement(hy, null)), l.createElement("div", {
    className: `${Jn}-middle`
  }, l.createElement(hm, {
    ref: O,
    className: `${Jn}-input`,
    onFocus: (M) => {
      var R;
      _(!0), (R = n.onFocus) === null || R === void 0 || R.call(n, M);
    },
    value: C,
    onChange: (M) => {
      o || P(M);
    },
    disabled: o,
    onBlur: (M) => {
      var R;
      _(!1), (R = n.onBlur) === null || R === void 0 || R.call(n, M);
    },
    readOnly: d,
    role: "spinbutton",
    "aria-valuenow": Number(C),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), l.createElement(on, {
    className: `${Jn}-plus`,
    onClick: I,
    disabled: V(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.increase
  }, l.createElement(m1, null))));
}
const L_ = me(I_), mS = L_;
const wn = "adm-step", D_ = (e) => {
  const {
    title: t,
    description: n,
    icon: r,
    status: i = "wait"
  } = e;
  return B(e, l.createElement("div", {
    className: j(`${wn}`, `${wn}-status-${i}`)
  }, l.createElement("div", {
    className: `${wn}-indicator`
  }, l.createElement("div", {
    className: `${wn}-icon-container`
  }, r)), l.createElement("div", {
    className: `${wn}-content`
  }, l.createElement("div", {
    className: `${wn}-title`
  }, t), !!n && l.createElement("div", {
    className: `${wn}-description`
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
  } = t, i = j(Jf, `${Jf}-${n}`);
  return B(t, l.createElement("div", {
    className: i
  }, l.Children.map(t.children, (a, o) => {
    var s;
    if (!l.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const d = (s = c.icon) !== null && s !== void 0 ? s : j_;
    return l.cloneElement(a, {
      status: u,
      icon: d
    });
  })));
}, hS = ie(W_, {
  Step: D_
});
const Xt = "adm-swipe-action", Z_ = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, H_ = me((e, t) => {
  const n = U(Z_, e), r = D(null), i = D(null), a = D(null);
  function o(w) {
    const $ = w.current;
    return $ ? $.offsetWidth : 0;
  }
  function s() {
    return o(i);
  }
  function c() {
    return o(a);
  }
  const [{
    x: u
  }, d] = Pe(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), f = D(!1), m = D(null);
  function v() {
    var w;
    (w = m.current) === null || w === void 0 || w.call(m), f.current = !1;
  }
  const g = Pt((w) => {
    var $;
    if (m.current = w.cancel, !w.intentional || (w.down && (f.current = !0), !f.current))
      return;
    const [y] = w.offset;
    if (w.last) {
      const p = s(), E = c();
      let C = y + w.velocity[0] * w.direction[0] * 50;
      y > 0 ? C = Math.max(0, C) : y < 0 ? C = Math.min(0, C) : C = 0;
      const k = ec([-E, 0, p], C);
      d.start({
        x: k
      }), k !== 0 && (($ = e.onActionsReveal) === null || $ === void 0 || $.call(e, k > 0 ? "left" : "right")), window.setTimeout(() => {
        f.current = !1;
      });
    } else
      d.start({
        x: y,
        immediate: !0
      });
  }, {
    from: () => [u.get(), 0],
    bounds: () => {
      const w = s();
      return {
        left: -c(),
        right: w
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
    d.start({
      x: 0
    }), v();
  }
  ge(t, () => ({
    show: (w = "right") => {
      var $;
      w === "right" ? d.start({
        x: -c()
      }) : w === "left" && d.start({
        x: s()
      }), ($ = e.onActionsReveal) === null || $ === void 0 || $.call(e, w);
    },
    close: h
  })), G(() => {
    if (!n.closeOnTouchOutside)
      return;
    function w($) {
      if (u.get() === 0)
        return;
      const y = r.current;
      y && !y.contains($.target) && h();
    }
    return document.addEventListener("touchstart", w), () => {
      document.removeEventListener("touchstart", w);
    };
  }, [n.closeOnTouchOutside]);
  function b(w) {
    var $, y;
    const p = ($ = w.color) !== null && $ !== void 0 ? $ : "light";
    return l.createElement(on, {
      key: w.key,
      className: `${Xt}-action-button`,
      style: {
        "--background-color": (y = U_[p]) !== null && y !== void 0 ? y : p
      },
      onClick: (E) => {
        var C, k;
        n.closeOnAction && h(), (C = w.onClick) === null || C === void 0 || C.call(w, E), (k = n.onAction) === null || k === void 0 || k.call(n, w, E);
      }
    }, w.text);
  }
  return B(n, l.createElement("div", Object.assign({
    className: Xt
  }, g(), {
    ref: r,
    onClickCapture: (w) => {
      f.current && (w.stopPropagation(), w.preventDefault());
    }
  }), l.createElement(fe.div, {
    className: `${Xt}-track`,
    style: {
      x: u
    }
  }, an(n.stopPropagation, l.createElement("div", {
    className: `${Xt}-actions ${Xt}-actions-left`,
    ref: i
  }, n.leftActions.map(b))), l.createElement("div", {
    className: `${Xt}-content`,
    onClickCapture: (w) => {
      u.goal !== 0 && (w.preventDefault(), w.stopPropagation(), h());
    }
  }, l.createElement(fe.div, {
    style: {
      pointerEvents: u.to((w) => w !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), an(n.stopPropagation, l.createElement("div", {
    className: `${Xt}-actions ${Xt}-actions-right`,
    ref: a
  }, n.rightActions.map(b))))));
}), U_ = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, vS = H_;
const km = (e) => B(e, l.createElement("div", {
  className: "adm-swiper-item",
  onClick: e.onClick
}, e.children));
function z_(e) {
  const [t, n] = q(e), r = D(t);
  return G(() => {
    r.current = t;
  }, [t]), [t, n, r];
}
function q_(e, t) {
  const n = Object.keys(e), r = Object.keys(t), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const s = e[o], c = t[o];
    typeof s == "function" && typeof c == "function" ? a[o] = function(...u) {
      s(...u), c(...u);
    } : a[o] = s || c;
  }), a;
}
const dt = "adm-swiper", K_ = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, G_ = {
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
let ia;
const Y_ = me(jl((e, t) => {
  const n = U(G_, e), [r] = q({}), i = D(null), a = n.direction === "vertical", o = n.slideSize / 100, s = n.trackOffset / 100, {
    validChildren: c,
    count: u
  } = re(() => {
    let d = 0;
    return {
      validChildren: l.Children.map(n.children, (m) => l.isValidElement(m) ? m.type !== km ? (Me("Swiper", "The children of `Swiper` must be `Swiper.Item` components."), null) : (d++, m) : null),
      count: d
    };
  }, [n.children]);
  return u === 0 || !c ? (Me("Swiper", "`Swiper` needs at least one child."), null) : () => {
    let d = n.loop;
    o * (u - 1) < 1 && (d = !1);
    const f = D(null);
    function m() {
      const R = f.current;
      return R ? (a ? R.offsetHeight : R.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [v, g, h] = Q5(n.defaultIndex), [b, w, $] = z_(!1);
    function y(R) {
      let W = 0, Z = u - 1;
      return n.stuckAtBoundary && (W += s / o, Z -= (1 - o - s) / o), Ee(R, W, Z);
    }
    const [{
      position: p
    }, E] = Pe(() => ({
      position: y(v) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if ($.current || !d)
          return;
        const R = p.get(), W = 100 * u, Z = os(R, W);
        Z !== R && E.start({
          position: Z,
          immediate: !0
        });
      }
    }), [u]), C = D(null);
    function k() {
      var R;
      (R = C.current) === null || R === void 0 || R.call(C), $.current = !1;
    }
    const N = Pt((R) => {
      if (C.current = R.cancel, !R.intentional || (R.first && !ia && (ia = r), ia !== r))
        return;
      ia = R.last ? void 0 : r;
      const W = m();
      if (!W)
        return;
      const Z = a ? 1 : 0, z = R.offset[Z], Y = R.direction[Z], K = R.velocity[Z];
      if (w(!0), !R.last)
        E.start({
          position: z * 100 / W,
          immediate: !0
        });
      else {
        const _e = Math.floor(z / W), ke = _e + 1, we = Math.round((z + K * 2e3 * Y) / W);
        P(Ee(we, _e, ke)), window.setTimeout(() => {
          w(!1);
        });
      }
    }, {
      transform: ([R, W]) => [-R, -W],
      from: () => {
        const R = m();
        return [p.get() / 100 * R, p.get() / 100 * R];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (d)
          return {};
        const R = m(), W = y(0) * R, Z = y(u - 1) * R;
        return a ? {
          top: W,
          bottom: Z
        } : {
          left: W,
          right: Z
        };
      },
      rubberband: n.rubberband,
      axis: a ? "y" : "x",
      preventScroll: !a,
      pointer: {
        touch: !0
      }
    });
    function P(R, W = !1) {
      var Z;
      const z = Math.round(R), Y = d ? os(z, u) : Ee(z, 0, u - 1);
      Y !== h() && ((Z = n.onIndexChange) === null || Z === void 0 || Z.call(n, Y)), g(Y), E.start({
        position: (d ? z : y(z)) * 100,
        immediate: W
      });
    }
    function F() {
      P(Math.round(p.get() / 100) + 1);
    }
    function T() {
      P(Math.round(p.get() / 100) - 1);
    }
    ge(t, () => ({
      swipeTo: P,
      swipeNext: F,
      swipePrev: T
    })), xe(() => {
      const R = c.length - 1;
      v > R && P(R, !0);
    });
    const {
      autoplay: O,
      autoplayInterval: _
    } = n, x = () => {
      i.current = window.setTimeout(() => {
        F(), x();
      }, _);
    };
    G(() => {
      if (!(!O || b))
        return x(), () => {
          i.current && window.clearTimeout(i.current);
        };
    }, [O, _, b, u]);
    function S() {
      return d ? l.createElement("div", {
        className: `${dt}-track-inner`
      }, l.Children.map(c, (R, W) => l.createElement(fe.div, {
        className: j(`${dt}-slide`, {
          [`${dt}-slide-active`]: v === W
        }),
        style: {
          [a ? "y" : "x"]: p.to((Z) => {
            let z = -Z + W * 100;
            const Y = u * 100, K = Y / 2;
            return z = os(z + K, Y) - K, `${z}%`;
          }),
          [a ? "top" : "left"]: `-${W * 100}%`
        }
      }, R))) : l.createElement(fe.div, {
        className: `${dt}-track-inner`,
        style: {
          [a ? "y" : "x"]: p.to((R) => `${-R}%`)
        }
      }, l.Children.map(c, (R, W) => l.createElement("div", {
        className: j(`${dt}-slide`, {
          [`${dt}-slide-active`]: v === W
        })
      }, R)));
    }
    const I = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, A = Object.assign({}, n.allowTouchMove ? N() : {}), V = {};
    for (const R of n.stopPropagation) {
      const W = K_[R];
      V[W] = function(Z) {
        Z.stopPropagation();
      };
    }
    const M = q_(A, V);
    return B(n, l.createElement("div", {
      className: j(dt, `${dt}-${n.direction}`),
      style: I
    }, l.createElement("div", Object.assign({
      ref: f,
      className: j(`${dt}-track`, {
        [`${dt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (R) => {
        $.current && R.stopPropagation(), k();
      }
    }, M), S()), n.indicator === void 0 ? l.createElement("div", {
      className: `${dt}-indicator`
    }, l.createElement(Rx, Object.assign({}, n.indicatorProps, {
      total: u,
      current: v,
      direction: n.direction
    }))) : n.indicator(u, v)));
  };
}));
function os(e, t) {
  const n = e % t;
  return n < 0 ? n + t : n;
}
const pS = ie(Y_, {
  Item: km
});
const X_ = De((e) => B(e, l.createElement("svg", {
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
})))))))), En = "adm-switch", Q_ = {
  defaultChecked: !1
}, J_ = (e) => {
  const t = U(Q_, e), n = t.disabled || t.loading || !1, [r, i] = q(!1), {
    locale: a
  } = pe(), [o, s] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  });
  function c() {
    return Ce(this, void 0, void 0, function* () {
      if (n || t.loading || r)
        return;
      const u = !o;
      if (t.beforeChange) {
        i(!0);
        try {
          yield t.beforeChange(u), i(!1);
        } catch (f) {
          throw i(!1), f;
        }
      }
      const d = s(u);
      if (M1(d)) {
        i(!0);
        try {
          yield d, i(!1);
        } catch (f) {
          throw i(!1), f;
        }
      }
    });
  }
  return B(t, l.createElement("div", {
    onClick: c,
    className: j(En, {
      [`${En}-checked`]: o,
      [`${En}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, l.createElement("div", {
    className: `${En}-checkbox`
  }, l.createElement("div", {
    className: `${En}-handle`
  }, (t.loading || r) && l.createElement(X_, {
    className: `${En}-spin-icon`
  })), l.createElement("div", {
    className: `${En}-inner`
  }, o ? t.checkedText : t.uncheckedText))));
}, gS = J_;
const ek = () => null, Mt = "adm-tab-bar", tk = {
  safeArea: !1
}, nk = (e) => {
  var t;
  const n = U(tk, e);
  let r = null;
  const i = [];
  un(n.children, (s, c) => {
    if (!Ln(s))
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
  return B(n, l.createElement("div", {
    className: Mt
  }, l.createElement("div", {
    className: `${Mt}-wrap`
  }, i.map((s) => {
    const c = s.key === a;
    function u() {
      const d = s.props.icon && l.createElement("div", {
        className: `${Mt}-item-icon`
      }, typeof s.props.icon == "function" ? s.props.icon(c) : s.props.icon), f = s.props.title && l.createElement("div", {
        className: j(`${Mt}-item-title`, Boolean(d) && `${Mt}-item-title-with-icon`)
      }, typeof s.props.title == "function" ? s.props.title(c) : s.props.title);
      return d ? l.createElement(l.Fragment, null, l.createElement(Fs, {
        content: s.props.badge,
        className: `${Mt}-icon-badge`
      }, d), f) : f ? l.createElement(Fs, {
        content: s.props.badge,
        className: `${Mt}-title-badge`
      }, f) : null;
    }
    return B(s.props, l.createElement("div", {
      key: s.key,
      onClick: () => {
        const {
          key: d
        } = s;
        d != null && o(d.toString());
      },
      className: j(`${Mt}-item`, {
        [`${Mt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && l.createElement(Or, {
    position: "bottom"
  })));
}, yS = ie(nk, {
  Item: ek
});
const ed = "adm-tag", rk = {
  default: "var(--adm-color-text-secondary, #666666)",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, ik = {
  color: "default",
  fill: "solid",
  round: !1
}, ak = (e) => {
  var t;
  const n = U(ik, e), r = (t = rk[n.color]) !== null && t !== void 0 ? t : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return B(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(ed, {
      [`${ed}-round`]: n.round
    })
  }, n.children));
}, bS = ak;
const Gr = "adm-text-area", Sm = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, Om = me((e, t) => {
  const n = U(Sm, e), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = te(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value === null && o9("TextArea", "`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.");
  const c = D(null), u = D("auto"), d = D(null);
  ge(t, () => ({
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
  })), xe(() => {
    if (!r)
      return;
    const h = c.current, b = d.current;
    if (!h || (h.style.height = u.current, !b))
      return;
    let w = b.scrollHeight;
    if (typeof r == "object") {
      const $ = window.getComputedStyle(h), y = parseFloat($.lineHeight);
      r.minRows && (w = Math.max(w, r.minRows * y)), r.maxRows && (w = Math.min(w, r.maxRows * y));
    }
    u.current = `${w}px`, h.style.height = `${w}px`;
  }, [o, r]);
  const f = D(!1);
  let m;
  const v = ca(o).length;
  typeof i == "function" ? m = i(v, a) : i && (m = l.createElement("div", {
    className: `${Gr}-count`
  }, a === void 0 ? v : v + "/" + a));
  let g = n.rows;
  return typeof r == "object" && (r.maxRows && g > r.maxRows && (g = r.maxRows), r.minRows && g < r.minRows && (g = r.minRows)), B(n, l.createElement("div", {
    className: Gr
  }, l.createElement("textarea", {
    ref: c,
    className: `${Gr}-element`,
    rows: g,
    value: o,
    placeholder: n.placeholder,
    onChange: (h) => {
      let b = h.target.value;
      a && !f.current && (b = ca(b).slice(0, a).join("")), s(b);
    },
    id: n.id,
    onCompositionStart: (h) => {
      var b;
      f.current = !0, (b = n.onCompositionStart) === null || b === void 0 || b.call(n, h);
    },
    onCompositionEnd: (h) => {
      var b;
      if (f.current = !1, a) {
        const w = h.target.value;
        s(ca(w).slice(0, a).join(""));
      }
      (b = n.onCompositionEnd) === null || b === void 0 || b.call(n, h);
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
    ref: d,
    className: `${Gr}-element ${Gr}-element-hidden`,
    value: o,
    rows: g,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
Om.defaultProps = Sm;
const wS = Om;
const It = "adm-toast", ok = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, sk = (e) => {
  const t = U(ok, e), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = t, o = re(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(v1, {
          className: `${It}-icon-success`
        });
      case "fail":
        return l.createElement(Oi, {
          className: `${It}-icon-fail`
        });
      case "loading":
        return l.createElement(zl, {
          color: "white",
          className: `${It}-loading`
        });
      default:
        return i;
    }
  }, [i]), s = re(() => {
    switch (a) {
      case "top":
        return "20%";
      case "bottom":
        return "80%";
      default:
        return "50%";
    }
  }, [a]);
  return l.createElement(Si, {
    visible: t.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: t.getContainer,
    afterClose: t.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, t.maskStyle),
    className: j(`${It}-mask`, t.maskClassName),
    stopPropagation: t.stopPropagation
  }, l.createElement("div", {
    className: j(`${It}-wrap`)
  }, l.createElement("div", {
    style: {
      top: s
    },
    className: j(`${It}-main`, i ? `${It}-main-icon` : `${It}-main-text`)
  }, o && l.createElement("div", {
    className: `${It}-icon`
  }, o), l.createElement(hi, null, r))));
};
let jt = null, ss = null;
const da = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, lk = (e) => l.createElement(sk, Object.assign({}, e));
function ck(e) {
  const t = U(da, typeof e == "string" ? {
    content: e
  } : e), n = l.createElement(lk, Object.assign({}, t, {
    onClose: () => {
      jt = null;
    }
  }));
  return jt ? jt.replace(n) : jt = Fr(n), ss && window.clearTimeout(ss), t.duration !== 0 && (ss = window.setTimeout(() => {
    Fm();
  }, t.duration)), jt;
}
function Fm() {
  jt == null || jt.close(), jt = null;
}
function uk(e) {
  e.duration !== void 0 && (da.duration = e.duration), e.position !== void 0 && (da.position = e.position), e.maskClickable !== void 0 && (da.maskClickable = e.maskClickable);
}
const fk = {
  show: ck,
  clear: Fm,
  config: uk
}, ES = fk;
function Pm(e, t = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[t] ? i = Math.max(i, n(a[t]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(e);
}
const aa = "adm-tree-select", dk = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, mk = (e) => {
  const t = U(dk, e), n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), [s, c, u] = re(() => {
    const v = Pm(t.options, i), g = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    function b(w, $) {
      $.forEach((y) => {
        h.set(y[r], w), g.set(y[r], y), y[i] && b(y, y[i]);
      });
    }
    return b(void 0, t.options), [v, g, h];
  }, [t.options]), d = (v) => {
    var g;
    const h = [];
    let b = v;
    for (; b; )
      h.push(b), b = u.get(b[r]);
    const w = h.reverse().map(($) => $[r]);
    o(w), (g = t.onChange) === null || g === void 0 || g.call(t, w, {
      options: h
    });
  }, f = (v = [], g) => v.map((h) => {
    const b = h[r] === a[g];
    return l.createElement("div", {
      key: h[r],
      className: j(`${aa}-item`, {
        [`${aa}-item-active`]: b
      }),
      onClick: () => {
        b || d(h);
      }
    }, h[n]);
  }), m = () => {
    var v;
    const g = [];
    for (let h = 0; h < s; h++) {
      let b = `${100 / s}%`;
      s === 2 && h === 0 && (b = "33.33%"), s === 2 && h === 1 && (b = "66.67%");
      const w = l.createElement("div", {
        key: h,
        className: j(`${aa}-column`),
        style: {
          width: b
        }
      }, f(h === 0 ? t.options : (v = c.get(a[h - 1])) === null || v === void 0 ? void 0 : v[i], h));
      g.push(w);
    }
    return g;
  };
  return B(t, l.createElement("div", {
    className: aa
  }, m()));
}, et = "adm-tree-select-multiple", hk = (e) => {
  const t = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, e);
  G(() => {
    Me("TreeSelect", "TreeSelect.Multiple has been deprecated.");
  }, []);
  const n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.expandKeys,
    defaultValue: t.defaultExpandKeys
  }), [s, c] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), u = (k) => {
    const N = [], P = (F) => {
      var T;
      !F || (!((T = F[i]) === null || T === void 0) && T.length ? F[i].forEach((O) => P(O)) : N.push(F[r]));
    };
    return P(k), N;
  }, [d, f, m] = re(() => {
    const k = Pm(t.options, i), N = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map();
    function F(T, O) {
      O.forEach((_) => {
        P.set(_[r], T), N.set(_[r], _), _[i] && F(_, _[i]);
      });
    }
    return F(void 0, t.options), [k, N, P];
  }, [t.options]), v = re(() => {
    let k = [];
    return s.forEach((N) => {
      const P = f.get(N);
      k = k.concat(u(P));
    }), k;
  }, [s, f]), g = re(() => {
    const k = /* @__PURE__ */ new Map(), N = (P) => {
      const F = m.get(P);
      !F || (k.set(F[r], !0), N(F[r]));
    };
    return v.forEach((P) => {
      k.set(P, !0), N(P);
    }), k;
  }, [m, s]), h = (k) => {
    var N;
    let P = [...k], F = [];
    const T = (_) => {
      _.forEach((x) => {
        var S;
        if (F.includes(x))
          return;
        const I = m.get(x);
        if (!I)
          return;
        const A = ((S = I[i]) === null || S === void 0 ? void 0 : S.map((V) => V[r])) || [];
        A.every((V) => P.includes(V)) && (P.push(I[r]), F = F.concat(A));
      });
    };
    for (let _ = 0; _ < d; _++)
      T(P);
    P = P.filter((_) => !F.includes(_));
    const O = P.map((_) => f.get(_));
    c(P), (N = t.onChange) === null || N === void 0 || N.call(t, P, O);
  }, b = (k) => {
    var N;
    const P = [];
    let F = k;
    for (; F; )
      P.unshift(F), F = m.get(F[r]);
    const T = P.map((O) => O[r]);
    o(T), (N = t.onExpand) === null || N === void 0 || N.call(t, T, P);
  }, w = (k, N) => {
    var P;
    const F = (P = t.selectAllText) === null || P === void 0 ? void 0 : P[N];
    if (!F)
      return;
    let T = [];
    k.forEach((_) => {
      T = T.concat(u(_));
    });
    const O = T.every((_) => v.includes(_));
    return l.createElement("div", {
      onClick: () => {
        h(O ? v.filter((_) => !T.includes(_)) : v.concat(T));
      },
      className: `${et}-item`
    }, F);
  }, $ = (k, N) => {
    var P;
    const F = (P = t.selectAllText) === null || P === void 0 ? void 0 : P[N];
    if (!F)
      return;
    const T = k.map((x) => x[r]), O = T.every((x) => v.includes(x)), _ = O ? !1 : T.some((x) => v.includes(x));
    return l.createElement("div", {
      onClick: () => {
        h(O ? v.filter((x) => !T.includes(x)) : v.concat(T));
      },
      className: j(`${et}-item`, `${et}-item-leaf`)
    }, l.createElement(sf, {
      className: `${et}-item-checkbox`,
      checked: O,
      indeterminate: _
    }), F);
  }, y = (k) => {
    const N = a.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        N || b(k);
      },
      className: j(`${et}-item`, {
        [`${et}-item-expand`]: N
      })
    }, k[n], !!g.get(k[r]) && l.createElement("div", {
      className: `${et}-dot`
    }));
  }, p = (k) => {
    const N = v.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        h(N ? v.filter((P) => P !== k[r]) : [...v, k[r]]);
      },
      className: j(`${et}-item`, `${et}-item-leaf`)
    }, l.createElement(sf, {
      className: `${et}-item-checkbox`,
      checked: N
    }), k[n]);
  }, E = (k = [], N) => k.length === 0 ? void 0 : d === N + 1 ? l.createElement(l.Fragment, null, $(k, N), k.map((F) => p(F))) : l.createElement(l.Fragment, null, w(k, N), k.map((F) => y(F))), C = () => {
    var k;
    const N = [];
    for (let P = 0; P < d; P++) {
      let F = `${100 / d}%`;
      d === 2 && P === 0 && (F = "33.33%"), d === 2 && P === 1 && (F = "66.67%");
      const T = l.createElement("div", {
        key: P,
        className: j(`${et}-column`),
        style: {
          width: F
        }
      }, E(P === 0 ? t.options : (k = f.get(a[P - 1])) === null || k === void 0 ? void 0 : k[i], P));
      N.push(T);
    }
    return N;
  };
  return B(t, l.createElement("div", {
    className: et
  }, C()));
}, CS = ie(mk, {
  Multiple: hk
});
const Cn = "adm-virtual-input", vk = {
  defaultValue: ""
}, pk = me((e, t) => {
  const n = U(vk, e), [r, i] = te(n), a = D(null), o = D(null), [s, c] = q(!1), {
    locale: u
  } = pe();
  function d() {
    const h = a.current;
    if (!h || document.activeElement !== h)
      return;
    const b = o.current;
    !b || (b.scrollLeft = b.clientWidth);
  }
  xe(() => {
    d();
  }, [r]), G(() => {
    s && d();
  }, [s]), ge(t, () => ({
    focus: () => {
      var h;
      (h = a.current) === null || h === void 0 || h.focus();
    },
    blur: () => {
      var h;
      (h = a.current) === null || h === void 0 || h.blur();
    }
  }));
  function f() {
    var h;
    c(!0), (h = n.onFocus) === null || h === void 0 || h.call(n);
  }
  function m() {
    var h;
    c(!1), (h = n.onBlur) === null || h === void 0 || h.call(n);
  }
  const v = n.keyboard, g = v && l.cloneElement(v, {
    onInput: (h) => {
      var b, w;
      i(r + h), (w = (b = v.props).onInput) === null || w === void 0 || w.call(b, h);
    },
    onDelete: () => {
      var h, b;
      i(r.slice(0, -1)), (b = (h = v.props).onDelete) === null || b === void 0 || b.call(h);
    },
    visible: s,
    onClose: () => {
      var h, b, w;
      (h = a.current) === null || h === void 0 || h.blur(), (w = (b = v.props).onClose) === null || w === void 0 || w.call(b);
    },
    getContainer: null
  });
  return B(n, l.createElement("div", {
    ref: a,
    className: j(Cn, {
      [`${Cn}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "option",
    onFocus: f,
    onBlur: m,
    onClick: n.onClick
  }, l.createElement("div", {
    className: `${Cn}-content`,
    ref: o,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, l.createElement("div", {
    className: `${Cn}-caret-container`
  }, s && l.createElement("div", {
    className: `${Cn}-caret`
  }))), n.clearable && !!r && s && l.createElement("div", {
    className: `${Cn}-clear`,
    onClick: (h) => {
      var b;
      h.stopPropagation(), i(""), (b = n.onClear) === null || b === void 0 || b.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, l.createElement(no, null)), [void 0, null, ""].includes(r) && l.createElement("div", {
    className: `${Cn}-placeholder`
  }, n.placeholder), g));
}), $S = pk;
const td = "adm-water-mark", gk = {
  fullPage: !0
}, yk = (e) => {
  const t = U(gk, e), {
    zIndex: n,
    gapX: r = 24,
    gapY: i = 48,
    width: a = 120,
    height: o = 64,
    rotate: s = -22,
    image: c,
    imageWidth: u = 120,
    imageHeight: d = 64,
    content: f,
    fontStyle: m = "normal",
    fontWeight: v = "normal",
    fontColor: g = "rgba(0,0,0,.15)",
    fontSize: h = 14,
    fontFamily: b = "sans-serif"
  } = t, [w, $] = q("");
  return G(() => {
    const y = document.createElement("canvas"), p = window.devicePixelRatio, E = y.getContext("2d"), C = `${(r + a) * p}px`, k = `${(i + o) * p}px`, N = a * p, P = o * p;
    if (y.setAttribute("width", C), y.setAttribute("height", k), E) {
      if (c) {
        E.translate(N / 2, P / 2), E.rotate(Math.PI / 180 * Number(s));
        const F = new Image();
        F.crossOrigin = "anonymous", F.referrerPolicy = "no-referrer", F.onload = () => {
          E.drawImage(F, -u * p / 2, -d * p / 2, u * p, d * p), E.restore(), $(y.toDataURL());
        }, F.src = c;
      } else if (f) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(N / 2, P / 2), E.rotate(Math.PI / 180 * Number(s));
        const F = Number(h) * p;
        E.font = `${m} normal ${v} ${F}px/${P}px ${b}`, E.fillStyle = g, Array.isArray(f) ? f.forEach((T, O) => E.fillText(T, 0, O * F)) : E.fillText(f, 0, 0), E.restore(), $(y.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, v, a, o, b, g, c, f, h]), B(t, l.createElement("div", {
    className: j(td, {
      [`${td}-full-page`]: t.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      backgroundImage: `url('${w}')`
    }
  }));
}, xS = yk;
const $n = "adm-footer", bk = {
  label: "",
  links: [],
  content: "",
  chips: []
}, wk = (e) => {
  const t = U(bk, e), {
    label: n,
    links: r,
    content: i,
    chips: a,
    onChipClick: o,
    onLinkClick: s
  } = t, c = (d, f) => {
    (a == null ? void 0 : a.length) && d.type === "link" && (o == null || o(d, f));
  }, u = (d, f, m) => {
    s && (m.preventDefault(), s(d, f));
  };
  return B(t, l.createElement("div", {
    className: j($n)
  }, n && l.createElement("div", {
    className: `${$n}-label`
  }, l.createElement(uf, null, n)), !!(r != null && r.length) && l.createElement("div", {
    className: `${$n}-links`
  }, r.map((d, f) => l.createElement(l.Fragment, {
    key: f
  }, l.createElement("a", {
    href: d.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(d, f, m)
  }, d.text), f !== r.length - 1 && l.createElement(uf, {
    direction: "vertical"
  })))), i && l.createElement("div", {
    className: `${$n}-content`
  }, i), a && a.length > 0 && l.createElement("div", {
    className: `${$n}-chips`
  }, a.map((d, f) => l.createElement("div", {
    key: f,
    onClick: () => c(d, f),
    className: j(`${$n}-chip`, {
      [`${$n}-chip-link`]: d.type === "link"
    })
  }, d.text)))));
}, _S = wk;
export {
  _k as ActionSheet,
  hi as AutoCenter,
  kk as Avatar,
  Fs as Badge,
  on as Button,
  Sk as Calendar,
  Ok as CapsuleTabs,
  Fk as Card,
  Ak as CascadePicker,
  Tk as CascadePickerView,
  Rk as Cascader,
  H9 as CascaderView,
  n0 as CenterPopup,
  af as CheckList,
  sf as Checkbox,
  Mk as Collapse,
  xk as ConfigProvider,
  Ik as DatePicker,
  Lk as DatePickerView,
  Dk as Dialog,
  uf as Divider,
  R1 as DotLoading,
  Vk as Dropdown,
  jk as Ellipsis,
  Bk as Empty,
  Wk as ErrorBlock,
  Zk as FloatingBubble,
  Hk as FloatingPanel,
  _S as Footer,
  Uk as Form,
  om as Grid,
  ao as Image,
  zk as ImageUploader,
  nx as ImageViewer,
  qk as IndexBar,
  Kk as InfiniteScroll,
  hm as Input,
  Gk as JumboTabs,
  kt as List,
  Yk as Loading,
  Si as Mask,
  Xk as Modal,
  Qk as NavBar,
  Jk as NoticeBar,
  eS as NumberKeyboard,
  Rx as PageIndicator,
  tS as PasscodeInput,
  G1 as Picker,
  ql as PickerView,
  im as Popover,
  Pi as Popup,
  nS as ProgressBar,
  rS as ProgressCircle,
  iS as PullToRefresh,
  aS as Radio,
  oS as Rate,
  sS as Result,
  lS as ResultPage,
  Or as SafeArea,
  D1 as ScrollMask,
  cS as SearchBar,
  uS as Selector,
  fS as SideBar,
  Xi as Skeleton,
  dS as Slider,
  gc as Space,
  zl as SpinLoading,
  mS as Stepper,
  hS as Steps,
  vS as SwipeAction,
  pS as Swiper,
  gS as Switch,
  yS as TabBar,
  rf as Tabs,
  bS as Tag,
  wS as TextArea,
  ES as Toast,
  CS as TreeSelect,
  $S as VirtualInput,
  xS as WaterMark,
  Wb as createErrorBlock,
  Pk as reduceMotion,
  Nk as restoreMotion,
  $k as setDefaultConfig
};
