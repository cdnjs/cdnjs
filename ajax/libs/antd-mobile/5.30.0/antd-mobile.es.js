import * as L from "react";
import l, { useContext as st, useRef as D, useMemo as re, useEffect as K, useState as z, useCallback as Xe, useLayoutEffect as Js, forwardRef as de, useImperativeHandle as pe, memo as Ve, createContext as el, cloneElement as _m } from "react";
import * as km from "react-dom";
import { unstable_batchedUpdates as Sm, createPortal as Om, findDOMNode as Fm } from "react-dom";
const cr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
cr && document.addEventListener("touchstart", () => {
}, !0);
var la = function() {
  return la = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, la.apply(this, arguments);
};
function hi(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function Ee(e, t, n, r) {
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
function Pm(e, t) {
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
function Am(e) {
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
function jt(e, t) {
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
function tl(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Nm(e, t) {
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
const He = "${label} is not a valid ${type}", Tm = {
  locale: "en",
  common: {
    confirm: "Confirm",
    cancel: "Cancel",
    loading: "Loading",
    close: "Close"
  },
  Calendar: {
    markItems: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    renderYearAndMonth: (e, t) => `${e}/${t}`
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
        string: He,
        method: He,
        array: He,
        object: He,
        number: He,
        date: He,
        boolean: He,
        integer: He,
        float: He,
        regexp: He,
        email: He,
        url: He,
        hex: He
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
}, Ue = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}", Rm = Nm(Tm, {
  locale: "zh-CH",
  common: {
    confirm: "\u786E\u5B9A",
    cancel: "\u53D6\u6D88",
    loading: "\u52A0\u8F7D\u4E2D",
    close: "\u5173\u95ED"
  },
  Calendar: {
    markItems: ["\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u65E5"],
    renderYearAndMonth: (e, t) => `${e}\u5E74${t}\u6708`
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
}), Mm = Rm, Kf = {
  current: {
    locale: Mm
  }
};
function vk(e) {
  Kf.current = e;
}
function pi() {
  return Kf.current;
}
const Gf = l.createContext(null), Im = (e) => {
  const {
    children: t
  } = e, n = hi(e, ["children"]), r = he();
  return l.createElement(Gf.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, t);
};
function he() {
  var e;
  return (e = st(Gf)) !== null && e !== void 0 ? e : pi();
}
const gk = Im;
function ie(e, t) {
  const n = e;
  for (const r in t)
    t.hasOwnProperty(r) && (n[r] = t[r]);
  return n;
}
var kt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Yf = { exports: {} };
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
})(Yf);
const V = Yf.exports;
function B(e, t) {
  const n = Object.assign({}, t.props);
  e.className && (n.className = V(t.props.className, e.className)), e.style && (n.style = Object.assign(Object.assign({}, n.style), e.style)), e.tabIndex !== void 0 && (n.tabIndex = e.tabIndex);
  for (const r in e)
    !e.hasOwnProperty(r) || (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = e[r]);
  return l.cloneElement(t, n);
}
var Lm = typeof kt == "object" && kt && kt.Object === Object && kt, Xf = Lm, Dm = Xf, Vm = typeof self == "object" && self && self.Object === Object && self, jm = Dm || Vm || Function("return this")(), yt = jm, Bm = yt, Wm = Bm.Symbol, nl = Wm, bc = nl, Qf = Object.prototype, Zm = Qf.hasOwnProperty, Hm = Qf.toString, Sr = bc ? bc.toStringTag : void 0;
function Um(e) {
  var t = Zm.call(e, Sr), n = e[Sr];
  try {
    e[Sr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Hm.call(e);
  return r && (t ? e[Sr] = n : delete e[Sr]), i;
}
var zm = Um, qm = Object.prototype, Km = qm.toString;
function Gm(e) {
  return Km.call(e);
}
var Ym = Gm, wc = nl, Xm = zm, Qm = Ym, Jm = "[object Null]", eh = "[object Undefined]", Ec = wc ? wc.toStringTag : void 0;
function th(e) {
  return e == null ? e === void 0 ? eh : Jm : Ec && Ec in Object(e) ? Xm(e) : Qm(e);
}
var ur = th;
function nh(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ft = nh, rh = ur, ih = Ft, ah = "[object AsyncFunction]", oh = "[object Function]", sh = "[object GeneratorFunction]", lh = "[object Proxy]";
function ch(e) {
  if (!ih(e))
    return !1;
  var t = rh(e);
  return t == oh || t == sh || t == ah || t == lh;
}
var rl = ch, uh = yt, fh = uh["__core-js_shared__"], dh = fh, So = dh, Cc = function() {
  var e = /[^.]+$/.exec(So && So.keys && So.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function mh(e) {
  return !!Cc && Cc in e;
}
var hh = mh, ph = Function.prototype, vh = ph.toString;
function gh(e) {
  if (e != null) {
    try {
      return vh.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Jf = gh, yh = rl, bh = hh, wh = Ft, Eh = Jf, Ch = /[\\^$.*+?()[\]{}|]/g, $h = /^\[object .+?Constructor\]$/, xh = Function.prototype, _h = Object.prototype, kh = xh.toString, Sh = _h.hasOwnProperty, Oh = RegExp(
  "^" + kh.call(Sh).replace(Ch, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fh(e) {
  if (!wh(e) || bh(e))
    return !1;
  var t = yh(e) ? Oh : $h;
  return t.test(Eh(e));
}
var Ph = Fh;
function Ah(e, t) {
  return e == null ? void 0 : e[t];
}
var Nh = Ah, Th = Ph, Rh = Nh;
function Mh(e, t) {
  var n = Rh(e, t);
  return Th(n) ? n : void 0;
}
var Tn = Mh, Ih = Tn, Lh = function() {
  try {
    var e = Ih(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), ed = Lh, $c = ed;
function Dh(e, t, n) {
  t == "__proto__" && $c ? $c(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var il = Dh;
function Vh(e, t) {
  return e === t || e !== e && t !== t;
}
var vi = Vh, jh = il, Bh = vi, Wh = Object.prototype, Zh = Wh.hasOwnProperty;
function Hh(e, t, n) {
  var r = e[t];
  (!(Zh.call(e, t) && Bh(r, n)) || n === void 0 && !(t in e)) && jh(e, t, n);
}
var Uh = Hh, zh = Uh, qh = il;
function Kh(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), i ? qh(n, s, c) : zh(n, s, c);
  }
  return n;
}
var td = Kh;
function Gh(e) {
  return e;
}
var nd = Gh;
function Yh(e, t, n) {
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
var Xh = Yh, Qh = Xh, xc = Math.max;
function Jh(e, t, n) {
  return t = xc(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, i = -1, a = xc(r.length - t, 0), o = Array(a); ++i < a; )
      o[i] = r[t + i];
    i = -1;
    for (var s = Array(t + 1); ++i < t; )
      s[i] = r[i];
    return s[t] = n(o), Qh(e, this, s);
  };
}
var e2 = Jh;
function t2(e) {
  return function() {
    return e;
  };
}
var n2 = t2, r2 = n2, _c = ed, i2 = nd, a2 = _c ? function(e, t) {
  return _c(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: r2(t),
    writable: !0
  });
} : i2, o2 = a2, s2 = 800, l2 = 16, c2 = Date.now;
function u2(e) {
  var t = 0, n = 0;
  return function() {
    var r = c2(), i = l2 - (r - n);
    if (n = r, i > 0) {
      if (++t >= s2)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
var f2 = u2, d2 = o2, m2 = f2, h2 = m2(d2), p2 = h2, v2 = nd, g2 = e2, y2 = p2;
function b2(e, t) {
  return y2(g2(e, t, v2), e + "");
}
var w2 = b2, E2 = 9007199254740991;
function C2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= E2;
}
var rd = C2, $2 = rl, x2 = rd;
function _2(e) {
  return e != null && x2(e.length) && !$2(e);
}
var Na = _2, k2 = 9007199254740991, S2 = /^(?:0|[1-9]\d*)$/;
function O2(e, t) {
  var n = typeof e;
  return t = t == null ? k2 : t, !!t && (n == "number" || n != "symbol" && S2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var id = O2, F2 = vi, P2 = Na, A2 = id, N2 = Ft;
function T2(e, t, n) {
  if (!N2(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? P2(n) && A2(t, n.length) : r == "string" && t in n) ? F2(n[t], e) : !1;
}
var R2 = T2, M2 = w2, I2 = R2;
function L2(e) {
  return M2(function(t, n) {
    var r = -1, i = n.length, a = i > 1 ? n[i - 1] : void 0, o = i > 2 ? n[2] : void 0;
    for (a = e.length > 3 && typeof a == "function" ? (i--, a) : void 0, o && I2(n[0], n[1], o) && (a = i < 3 ? void 0 : a, i = 1), t = Object(t); ++r < i; ) {
      var s = n[r];
      s && e(t, s, r, a);
    }
    return t;
  });
}
var ad = L2;
function D2(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var V2 = D2;
function j2(e) {
  return e != null && typeof e == "object";
}
var Rn = j2, B2 = ur, W2 = Rn, Z2 = "[object Arguments]";
function H2(e) {
  return W2(e) && B2(e) == Z2;
}
var U2 = H2, kc = U2, z2 = Rn, od = Object.prototype, q2 = od.hasOwnProperty, K2 = od.propertyIsEnumerable, G2 = kc(function() {
  return arguments;
}()) ? kc : function(e) {
  return z2(e) && q2.call(e, "callee") && !K2.call(e, "callee");
}, sd = G2, Y2 = Array.isArray, Ta = Y2, ei = { exports: {} };
function X2() {
  return !1;
}
var Q2 = X2;
(function(e, t) {
  var n = yt, r = Q2, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  e.exports = u;
})(ei, ei.exports);
var J2 = ur, ep = rd, tp = Rn, np = "[object Arguments]", rp = "[object Array]", ip = "[object Boolean]", ap = "[object Date]", op = "[object Error]", sp = "[object Function]", lp = "[object Map]", cp = "[object Number]", up = "[object Object]", fp = "[object RegExp]", dp = "[object Set]", mp = "[object String]", hp = "[object WeakMap]", pp = "[object ArrayBuffer]", vp = "[object DataView]", gp = "[object Float32Array]", yp = "[object Float64Array]", bp = "[object Int8Array]", wp = "[object Int16Array]", Ep = "[object Int32Array]", Cp = "[object Uint8Array]", $p = "[object Uint8ClampedArray]", xp = "[object Uint16Array]", _p = "[object Uint32Array]", fe = {};
fe[gp] = fe[yp] = fe[bp] = fe[wp] = fe[Ep] = fe[Cp] = fe[$p] = fe[xp] = fe[_p] = !0;
fe[np] = fe[rp] = fe[pp] = fe[ip] = fe[vp] = fe[ap] = fe[op] = fe[sp] = fe[lp] = fe[cp] = fe[up] = fe[fp] = fe[dp] = fe[mp] = fe[hp] = !1;
function kp(e) {
  return tp(e) && ep(e.length) && !!fe[J2(e)];
}
var Sp = kp;
function Op(e) {
  return function(t) {
    return e(t);
  };
}
var Fp = Op, rs = { exports: {} };
(function(e, t) {
  var n = Xf, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(rs, rs.exports);
var Pp = Sp, Ap = Fp, Sc = rs.exports, Oc = Sc && Sc.isTypedArray, Np = Oc ? Ap(Oc) : Pp, al = Np, Tp = V2, Rp = sd, Mp = Ta, Ip = ei.exports, Lp = id, Dp = al, Vp = Object.prototype, jp = Vp.hasOwnProperty;
function Bp(e, t) {
  var n = Mp(e), r = !n && Rp(e), i = !n && !r && Ip(e), a = !n && !r && !i && Dp(e), o = n || r || i || a, s = o ? Tp(e.length, String) : [], c = s.length;
  for (var u in e)
    (t || jp.call(e, u)) && !(o && (u == "length" || i && (u == "offset" || u == "parent") || a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Lp(u, c))) && s.push(u);
  return s;
}
var ld = Bp, Wp = Object.prototype;
function Zp(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Wp;
  return e === n;
}
var ol = Zp;
function Hp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var cd = Hp, Up = cd, zp = Up(Object.keys, Object), qp = zp, Kp = ol, Gp = qp, Yp = Object.prototype, Xp = Yp.hasOwnProperty;
function Qp(e) {
  if (!Kp(e))
    return Gp(e);
  var t = [];
  for (var n in Object(e))
    Xp.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var Jp = Qp, ev = ld, tv = Jp, nv = Na;
function rv(e) {
  return nv(e) ? ev(e) : tv(e);
}
var ud = rv, iv = td, av = ad, ov = ud, sv = av(function(e, t, n, r) {
  iv(t, ov(t), e, r);
}), lv = sv;
function Z(...e) {
  function t(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, e[0]);
  for (let r = 1; r < e.length; r++)
    n = lv(n, e[r], t);
  return n;
}
var fd = function(e) {
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
}, fr = function(e) {
  return typeof e == "function";
}, cv = function(e) {
  return typeof e == "number";
}, uv = !1;
const gi = uv;
function Wt(e) {
  gi && (fr(e) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));
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
const sl = fd(K);
function Fc(e, t) {
  if (e === t)
    return !0;
  for (var n = 0; n < e.length; n++)
    if (!Object.is(e[n], t[n]))
      return !1;
  return !0;
}
function Ra(e) {
  var t = D(e);
  return t.current = e, t;
}
var fv = function(e) {
  gi && (fr(e) || console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));
  var t = Ra(e);
  K(function() {
    return function() {
      t.current();
    };
  }, []);
};
const yi = fv;
var dv = yt, mv = function() {
  return dv.Date.now();
}, hv = mv, pv = /\s/;
function vv(e) {
  for (var t = e.length; t-- && pv.test(e.charAt(t)); )
    ;
  return t;
}
var gv = vv, yv = gv, bv = /^\s+/;
function wv(e) {
  return e && e.slice(0, yv(e) + 1).replace(bv, "");
}
var Ev = wv, Cv = ur, $v = Rn, xv = "[object Symbol]";
function _v(e) {
  return typeof e == "symbol" || $v(e) && Cv(e) == xv;
}
var kv = _v, Sv = Ev, Pc = Ft, Ov = kv, Ac = 0 / 0, Fv = /^[-+]0x[0-9a-f]+$/i, Pv = /^0b[01]+$/i, Av = /^0o[0-7]+$/i, Nv = parseInt;
function Tv(e) {
  if (typeof e == "number")
    return e;
  if (Ov(e))
    return Ac;
  if (Pc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Pc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Sv(e);
  var n = Pv.test(e);
  return n || Av.test(e) ? Nv(e.slice(2), n ? 2 : 8) : Fv.test(e) ? Ac : +e;
}
var Rv = Tv, Mv = Ft, Oo = hv, Nc = Rv, Iv = "Expected a function", Lv = Math.max, Dv = Math.min;
function Vv(e, t, n) {
  var r, i, a, o, s, c, u = 0, d = !1, f = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(Iv);
  t = Nc(t) || 0, Mv(n) && (d = !!n.leading, f = "maxWait" in n, a = f ? Lv(Nc(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function p($) {
    var k = r, N = i;
    return r = i = void 0, u = $, o = e.apply(N, k), o;
  }
  function v($) {
    return u = $, s = setTimeout(w, t), d ? p($) : o;
  }
  function h($) {
    var k = $ - c, N = $ - u, A = t - k;
    return f ? Dv(A, a - N) : A;
  }
  function g($) {
    var k = $ - c, N = $ - u;
    return c === void 0 || k >= t || k < 0 || f && N >= a;
  }
  function w() {
    var $ = Oo();
    if (g($))
      return C($);
    s = setTimeout(w, h($));
  }
  function C($) {
    return s = void 0, m && r ? p($) : (r = i = void 0, o);
  }
  function b() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function y() {
    return s === void 0 ? o : C(Oo());
  }
  function E() {
    var $ = Oo(), k = g($);
    if (r = arguments, i = this, c = $, k) {
      if (s === void 0)
        return v(c);
      if (f)
        return clearTimeout(s), s = setTimeout(w, t), p(c);
    }
    return s === void 0 && (s = setTimeout(w, t)), o;
  }
  return E.cancel = b, E.flush = y, E;
}
var dd = Vv, jv = !!(typeof window < "u" && window.document && window.document.createElement);
const ll = jv;
var Bv = dd, Wv = Ft, Zv = "Expected a function";
function Hv(e, t, n) {
  var r = !0, i = !0;
  if (typeof e != "function")
    throw new TypeError(Zv);
  return Wv(n) && (r = "leading" in n ? !!n.leading : r, i = "trailing" in n ? !!n.trailing : i), Bv(e, t, {
    leading: r,
    maxWait: t,
    trailing: i
  });
}
var Uv = Hv, zv = function(e) {
  gi && (fr(e) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e, '".'))), K(function() {
    e == null || e();
  }, []);
};
const qv = zv;
var Kv = function() {
  var e = jt(z({}), 2), t = e[1];
  return Xe(function() {
    return t({});
  }, []);
};
const md = Kv;
function tn(e, t) {
  if (!!ll) {
    if (!e)
      return t;
    var n;
    return fr(e) ? n = e() : "current" in e ? n = e.current : n = e, n;
  }
}
var Gv = function(e) {
  return e.every(function(t) {
    var n = tn(t);
    if (!n)
      return !1;
    if (n.getRootNode() instanceof ShadowRoot)
      return !0;
  });
}, Yv = function(e) {
  return e ? e.getRootNode() : document;
}, Xv = function(e) {
  if (!e || !document.getRootNode)
    return document;
  var t = Array.isArray(e) ? e : [e];
  return Gv(t) ? Yv(tn(t[0])) : document;
};
const Qv = Xv;
var Jv = function(e) {
  var t = function(n, r, i) {
    var a = D(!1), o = D([]), s = D([]), c = D();
    e(function() {
      var u, d = Array.isArray(i) ? i : [i], f = d.map(function(m) {
        return tn(m);
      });
      if (!a.current) {
        a.current = !0, o.current = f, s.current = r, c.current = n();
        return;
      }
      (f.length !== o.current.length || !Fc(f, o.current) || !Fc(r, s.current)) && ((u = c.current) === null || u === void 0 || u.call(c), o.current = f, s.current = r, c.current = n());
    }), yi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return t;
};
const hd = Jv;
var e3 = hd(K);
const cl = e3;
function pd(e, t, n) {
  n === void 0 && (n = "click");
  var r = Ra(e);
  cl(function() {
    var i = function(s) {
      var c = Array.isArray(t) ? t : [t];
      c.some(function(u) {
        var d = tn(u);
        return !d || d.contains(s.target);
      }) || r.current(s);
    }, a = Qv(t), o = Array.isArray(n) ? n : [n];
    return o.forEach(function(s) {
      return a.addEventListener(s, i);
    }), function() {
      o.forEach(function(s) {
        return a.removeEventListener(s, i);
      });
    };
  }, Array.isArray(n) ? n : [n], t);
}
var vd = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(kt, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", d = "week", f = "month", m = "quarter", p = "year", v = "date", h = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, C = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(_) {
      var x = ["th", "st", "nd", "rd"], F = _ % 100;
      return "[" + _ + (x[(F - 20) % 10] || x[F] || x[0]) + "]";
    } }, b = function(_, x, F) {
      var M = String(_);
      return !M || M.length >= x ? _ : "" + Array(x + 1 - M.length).join(F) + _;
    }, y = { s: b, z: function(_) {
      var x = -_.utcOffset(), F = Math.abs(x), M = Math.floor(F / 60), O = F % 60;
      return (x <= 0 ? "+" : "-") + b(M, 2, "0") + ":" + b(O, 2, "0");
    }, m: function _(x, F) {
      if (x.date() < F.date())
        return -_(F, x);
      var M = 12 * (F.year() - x.year()) + (F.month() - x.month()), O = x.clone().add(M, f), I = F - O < 0, R = x.clone().add(M + (I ? -1 : 1), f);
      return +(-(M + (F - O) / (I ? O - R : R - O)) || 0);
    }, a: function(_) {
      return _ < 0 ? Math.ceil(_) || 0 : Math.floor(_);
    }, p: function(_) {
      return { M: f, y: p, w: d, d: u, D: v, h: c, m: s, s: o, ms: a, Q: m }[_] || String(_ || "").toLowerCase().replace(/s$/, "");
    }, u: function(_) {
      return _ === void 0;
    } }, E = "en", $ = {};
    $[E] = C;
    var k = function(_) {
      return _ instanceof T;
    }, N = function _(x, F, M) {
      var O;
      if (!x)
        return E;
      if (typeof x == "string") {
        var I = x.toLowerCase();
        $[I] && (O = I), F && ($[I] = F, O = I);
        var R = x.split("-");
        if (!O && R.length > 1)
          return _(R[0]);
      } else {
        var j = x.name;
        $[j] = x, O = j;
      }
      return !M && O && (E = O), O || !M && E;
    }, A = function(_, x) {
      if (k(_))
        return _.clone();
      var F = typeof x == "object" ? x : {};
      return F.date = _, F.args = arguments, new T(F);
    }, P = y;
    P.l = N, P.i = k, P.w = function(_, x) {
      return A(_, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
    };
    var T = function() {
      function _(F) {
        this.$L = N(F.locale, null, !0), this.parse(F);
      }
      var x = _.prototype;
      return x.parse = function(F) {
        this.$d = function(M) {
          var O = M.date, I = M.utc;
          if (O === null)
            return new Date(NaN);
          if (P.u(O))
            return new Date();
          if (O instanceof Date)
            return new Date(O);
          if (typeof O == "string" && !/Z$/i.test(O)) {
            var R = O.match(g);
            if (R) {
              var j = R[2] - 1 || 0, H = (R[7] || "0").substring(0, 3);
              return I ? new Date(Date.UTC(R[1], j, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, H)) : new Date(R[1], j, R[3] || 1, R[4] || 0, R[5] || 0, R[6] || 0, H);
            }
          }
          return new Date(O);
        }(F), this.$x = F.x || {}, this.init();
      }, x.init = function() {
        var F = this.$d;
        this.$y = F.getFullYear(), this.$M = F.getMonth(), this.$D = F.getDate(), this.$W = F.getDay(), this.$H = F.getHours(), this.$m = F.getMinutes(), this.$s = F.getSeconds(), this.$ms = F.getMilliseconds();
      }, x.$utils = function() {
        return P;
      }, x.isValid = function() {
        return this.$d.toString() !== h;
      }, x.isSame = function(F, M) {
        var O = A(F);
        return this.startOf(M) <= O && O <= this.endOf(M);
      }, x.isAfter = function(F, M) {
        return A(F) < this.startOf(M);
      }, x.isBefore = function(F, M) {
        return this.endOf(M) < A(F);
      }, x.$g = function(F, M, O) {
        return P.u(F) ? this[M] : this.set(O, F);
      }, x.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, x.valueOf = function() {
        return this.$d.getTime();
      }, x.startOf = function(F, M) {
        var O = this, I = !!P.u(M) || M, R = P.p(F), j = function(ve, ge) {
          var we = P.w(O.$u ? Date.UTC(O.$y, ge, ve) : new Date(O.$y, ge, ve), O);
          return I ? we : we.endOf(u);
        }, H = function(ve, ge) {
          return P.w(O.toDate()[ve].apply(O.toDate("s"), (I ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ge)), O);
        }, U = this.$W, q = this.$M, X = this.$D, G = "set" + (this.$u ? "UTC" : "");
        switch (R) {
          case p:
            return I ? j(1, 0) : j(31, 11);
          case f:
            return I ? j(1, q) : j(0, q + 1);
          case d:
            var Se = this.$locale().weekStart || 0, Oe = (U < Se ? U + 7 : U) - Se;
            return j(I ? X - Oe : X + (6 - Oe), q);
          case u:
          case v:
            return H(G + "Hours", 0);
          case c:
            return H(G + "Minutes", 1);
          case s:
            return H(G + "Seconds", 2);
          case o:
            return H(G + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, x.endOf = function(F) {
        return this.startOf(F, !1);
      }, x.$set = function(F, M) {
        var O, I = P.p(F), R = "set" + (this.$u ? "UTC" : ""), j = (O = {}, O[u] = R + "Date", O[v] = R + "Date", O[f] = R + "Month", O[p] = R + "FullYear", O[c] = R + "Hours", O[s] = R + "Minutes", O[o] = R + "Seconds", O[a] = R + "Milliseconds", O)[I], H = I === u ? this.$D + (M - this.$W) : M;
        if (I === f || I === p) {
          var U = this.clone().set(v, 1);
          U.$d[j](H), U.init(), this.$d = U.set(v, Math.min(this.$D, U.daysInMonth())).$d;
        } else
          j && this.$d[j](H);
        return this.init(), this;
      }, x.set = function(F, M) {
        return this.clone().$set(F, M);
      }, x.get = function(F) {
        return this[P.p(F)]();
      }, x.add = function(F, M) {
        var O, I = this;
        F = Number(F);
        var R = P.p(M), j = function(q) {
          var X = A(I);
          return P.w(X.date(X.date() + Math.round(q * F)), I);
        };
        if (R === f)
          return this.set(f, this.$M + F);
        if (R === p)
          return this.set(p, this.$y + F);
        if (R === u)
          return j(1);
        if (R === d)
          return j(7);
        var H = (O = {}, O[s] = r, O[c] = i, O[o] = n, O)[R] || 1, U = this.$d.getTime() + F * H;
        return P.w(U, this);
      }, x.subtract = function(F, M) {
        return this.add(-1 * F, M);
      }, x.format = function(F) {
        var M = this, O = this.$locale();
        if (!this.isValid())
          return O.invalidDate || h;
        var I = F || "YYYY-MM-DDTHH:mm:ssZ", R = P.z(this), j = this.$H, H = this.$m, U = this.$M, q = O.weekdays, X = O.months, G = function(ge, we, In, je) {
          return ge && (ge[we] || ge(M, I)) || In[we].slice(0, je);
        }, Se = function(ge) {
          return P.s(j % 12 || 12, ge, "0");
        }, Oe = O.meridiem || function(ge, we, In) {
          var je = ge < 12 ? "AM" : "PM";
          return In ? je.toLowerCase() : je;
        }, ve = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: U + 1, MM: P.s(U + 1, 2, "0"), MMM: G(O.monthsShort, U, X, 3), MMMM: G(X, U), D: this.$D, DD: P.s(this.$D, 2, "0"), d: String(this.$W), dd: G(O.weekdaysMin, this.$W, q, 2), ddd: G(O.weekdaysShort, this.$W, q, 3), dddd: q[this.$W], H: String(j), HH: P.s(j, 2, "0"), h: Se(1), hh: Se(2), a: Oe(j, H, !0), A: Oe(j, H, !1), m: String(H), mm: P.s(H, 2, "0"), s: String(this.$s), ss: P.s(this.$s, 2, "0"), SSS: P.s(this.$ms, 3, "0"), Z: R };
        return I.replace(w, function(ge, we) {
          return we || ve[ge] || R.replace(":", "");
        });
      }, x.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, x.diff = function(F, M, O) {
        var I, R = P.p(M), j = A(F), H = (j.utcOffset() - this.utcOffset()) * r, U = this - j, q = P.m(this, j);
        return q = (I = {}, I[p] = q / 12, I[f] = q, I[m] = q / 3, I[d] = (U - H) / 6048e5, I[u] = (U - H) / 864e5, I[c] = U / i, I[s] = U / r, I[o] = U / n, I)[R] || U, O ? q : P.a(q);
      }, x.daysInMonth = function() {
        return this.endOf(f).$D;
      }, x.$locale = function() {
        return $[this.$L];
      }, x.locale = function(F, M) {
        if (!F)
          return this.$L;
        var O = this.clone(), I = N(F, M, !0);
        return I && (O.$L = I), O;
      }, x.clone = function() {
        return P.w(this.$d, this);
      }, x.toDate = function() {
        return new Date(this.valueOf());
      }, x.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, x.toISOString = function() {
        return this.$d.toISOString();
      }, x.toString = function() {
        return this.$d.toUTCString();
      }, _;
    }(), S = T.prototype;
    return A.prototype = S, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", f], ["$y", p], ["$D", v]].forEach(function(_) {
      S[_[1]] = function(x) {
        return this.$g(x, _[0], _[1]);
      };
    }), A.extend = function(_, x) {
      return _.$i || (_(x, T, A), _.$i = !0), A;
    }, A.locale = N, A.isDayjs = k, A.unix = function(_) {
      return A(1e3 * _);
    }, A.en = $[E], A.Ls = $, A.p = {}, A;
  });
})(vd);
const xe = vd.exports;
function t3(e, t) {
  var n;
  gi && (fr(e) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));
  var r = Ra(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return dd(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, tl([], jt(o), !1));
    }, i, t);
  }, []);
  return yi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function n3(e, t, n) {
  var r = jt(z({}), 2), i = r[0], a = r[1], o = t3(function() {
    a({});
  }, n).run;
  K(function() {
    return o();
  }, t), sl(e, [i]);
}
function r3() {
  this.__data__ = [], this.size = 0;
}
var i3 = r3, a3 = vi;
function o3(e, t) {
  for (var n = e.length; n--; )
    if (a3(e[n][0], t))
      return n;
  return -1;
}
var Ma = o3, s3 = Ma, l3 = Array.prototype, c3 = l3.splice;
function u3(e) {
  var t = this.__data__, n = s3(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : c3.call(t, n, 1), --this.size, !0;
}
var f3 = u3, d3 = Ma;
function m3(e) {
  var t = this.__data__, n = d3(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var h3 = m3, p3 = Ma;
function v3(e) {
  return p3(this.__data__, e) > -1;
}
var g3 = v3, y3 = Ma;
function b3(e, t) {
  var n = this.__data__, r = y3(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var w3 = b3, E3 = i3, C3 = f3, $3 = h3, x3 = g3, _3 = w3;
function dr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
dr.prototype.clear = E3;
dr.prototype.delete = C3;
dr.prototype.get = $3;
dr.prototype.has = x3;
dr.prototype.set = _3;
var Ia = dr, k3 = Ia;
function S3() {
  this.__data__ = new k3(), this.size = 0;
}
var O3 = S3;
function F3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var P3 = F3;
function A3(e) {
  return this.__data__.get(e);
}
var N3 = A3;
function T3(e) {
  return this.__data__.has(e);
}
var R3 = T3, M3 = Tn, I3 = yt, L3 = M3(I3, "Map"), ul = L3, D3 = Tn, V3 = D3(Object, "create"), La = V3, Tc = La;
function j3() {
  this.__data__ = Tc ? Tc(null) : {}, this.size = 0;
}
var B3 = j3;
function W3(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Z3 = W3, H3 = La, U3 = "__lodash_hash_undefined__", z3 = Object.prototype, q3 = z3.hasOwnProperty;
function K3(e) {
  var t = this.__data__;
  if (H3) {
    var n = t[e];
    return n === U3 ? void 0 : n;
  }
  return q3.call(t, e) ? t[e] : void 0;
}
var G3 = K3, Y3 = La, X3 = Object.prototype, Q3 = X3.hasOwnProperty;
function J3(e) {
  var t = this.__data__;
  return Y3 ? t[e] !== void 0 : Q3.call(t, e);
}
var e4 = J3, t4 = La, n4 = "__lodash_hash_undefined__";
function r4(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = t4 && t === void 0 ? n4 : t, this;
}
var i4 = r4, a4 = B3, o4 = Z3, s4 = G3, l4 = e4, c4 = i4;
function mr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
mr.prototype.clear = a4;
mr.prototype.delete = o4;
mr.prototype.get = s4;
mr.prototype.has = l4;
mr.prototype.set = c4;
var u4 = mr, Rc = u4, f4 = Ia, d4 = ul;
function m4() {
  this.size = 0, this.__data__ = {
    hash: new Rc(),
    map: new (d4 || f4)(),
    string: new Rc()
  };
}
var h4 = m4;
function p4(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var v4 = p4, g4 = v4;
function y4(e, t) {
  var n = e.__data__;
  return g4(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var Da = y4, b4 = Da;
function w4(e) {
  var t = b4(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var E4 = w4, C4 = Da;
function $4(e) {
  return C4(this, e).get(e);
}
var x4 = $4, _4 = Da;
function k4(e) {
  return _4(this, e).has(e);
}
var S4 = k4, O4 = Da;
function F4(e, t) {
  var n = O4(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var P4 = F4, A4 = h4, N4 = E4, T4 = x4, R4 = S4, M4 = P4;
function hr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
hr.prototype.clear = A4;
hr.prototype.delete = N4;
hr.prototype.get = T4;
hr.prototype.has = R4;
hr.prototype.set = M4;
var fl = hr, I4 = Ia, L4 = ul, D4 = fl, V4 = 200;
function j4(e, t) {
  var n = this.__data__;
  if (n instanceof I4) {
    var r = n.__data__;
    if (!L4 || r.length < V4 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new D4(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var B4 = j4, W4 = Ia, Z4 = O3, H4 = P3, U4 = N3, z4 = R3, q4 = B4;
function pr(e) {
  var t = this.__data__ = new W4(e);
  this.size = t.size;
}
pr.prototype.clear = Z4;
pr.prototype.delete = H4;
pr.prototype.get = U4;
pr.prototype.has = z4;
pr.prototype.set = q4;
var gd = pr, K4 = "__lodash_hash_undefined__";
function G4(e) {
  return this.__data__.set(e, K4), this;
}
var Y4 = G4;
function X4(e) {
  return this.__data__.has(e);
}
var Q4 = X4, J4 = fl, eg = Y4, tg = Q4;
function ca(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new J4(); ++t < n; )
    this.add(e[t]);
}
ca.prototype.add = ca.prototype.push = eg;
ca.prototype.has = tg;
var ng = ca;
function rg(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var ig = rg;
function ag(e, t) {
  return e.has(t);
}
var og = ag, sg = ng, lg = ig, cg = og, ug = 1, fg = 2;
function dg(e, t, n, r, i, a) {
  var o = n & ug, s = e.length, c = t.length;
  if (s != c && !(o && c > s))
    return !1;
  var u = a.get(e), d = a.get(t);
  if (u && d)
    return u == t && d == e;
  var f = -1, m = !0, p = n & fg ? new sg() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < s; ) {
    var v = e[f], h = t[f];
    if (r)
      var g = o ? r(h, v, f, t, e, a) : r(v, h, f, e, t, a);
    if (g !== void 0) {
      if (g)
        continue;
      m = !1;
      break;
    }
    if (p) {
      if (!lg(t, function(w, C) {
        if (!cg(p, C) && (v === w || i(v, w, n, r, a)))
          return p.push(C);
      })) {
        m = !1;
        break;
      }
    } else if (!(v === h || i(v, h, n, r, a))) {
      m = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), m;
}
var yd = dg, mg = yt, hg = mg.Uint8Array, bd = hg;
function pg(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, i) {
    n[++t] = [i, r];
  }), n;
}
var vg = pg;
function gg(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var yg = gg, Mc = nl, Ic = bd, bg = vi, wg = yd, Eg = vg, Cg = yg, $g = 1, xg = 2, _g = "[object Boolean]", kg = "[object Date]", Sg = "[object Error]", Og = "[object Map]", Fg = "[object Number]", Pg = "[object RegExp]", Ag = "[object Set]", Ng = "[object String]", Tg = "[object Symbol]", Rg = "[object ArrayBuffer]", Mg = "[object DataView]", Lc = Mc ? Mc.prototype : void 0, Fo = Lc ? Lc.valueOf : void 0;
function Ig(e, t, n, r, i, a, o) {
  switch (n) {
    case Mg:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Rg:
      return !(e.byteLength != t.byteLength || !a(new Ic(e), new Ic(t)));
    case _g:
    case kg:
    case Fg:
      return bg(+e, +t);
    case Sg:
      return e.name == t.name && e.message == t.message;
    case Pg:
    case Ng:
      return e == t + "";
    case Og:
      var s = Eg;
    case Ag:
      var c = r & $g;
      if (s || (s = Cg), e.size != t.size && !c)
        return !1;
      var u = o.get(e);
      if (u)
        return u == t;
      r |= xg, o.set(e, t);
      var d = wg(s(e), s(t), r, i, a, o);
      return o.delete(e), d;
    case Tg:
      if (Fo)
        return Fo.call(e) == Fo.call(t);
  }
  return !1;
}
var Lg = Ig;
function Dg(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var Vg = Dg, jg = Vg, Bg = Ta;
function Wg(e, t, n) {
  var r = t(e);
  return Bg(e) ? r : jg(r, n(e));
}
var Zg = Wg;
function Hg(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
var Ug = Hg;
function zg() {
  return [];
}
var qg = zg, Kg = Ug, Gg = qg, Yg = Object.prototype, Xg = Yg.propertyIsEnumerable, Dc = Object.getOwnPropertySymbols, Qg = Dc ? function(e) {
  return e == null ? [] : (e = Object(e), Kg(Dc(e), function(t) {
    return Xg.call(e, t);
  }));
} : Gg, Jg = Qg, e5 = Zg, t5 = Jg, n5 = ud;
function r5(e) {
  return e5(e, n5, t5);
}
var i5 = r5, Vc = i5, a5 = 1, o5 = Object.prototype, s5 = o5.hasOwnProperty;
function l5(e, t, n, r, i, a) {
  var o = n & a5, s = Vc(e), c = s.length, u = Vc(t), d = u.length;
  if (c != d && !o)
    return !1;
  for (var f = c; f--; ) {
    var m = s[f];
    if (!(o ? m in t : s5.call(t, m)))
      return !1;
  }
  var p = a.get(e), v = a.get(t);
  if (p && v)
    return p == t && v == e;
  var h = !0;
  a.set(e, t), a.set(t, e);
  for (var g = o; ++f < c; ) {
    m = s[f];
    var w = e[m], C = t[m];
    if (r)
      var b = o ? r(C, w, m, t, e, a) : r(w, C, m, e, t, a);
    if (!(b === void 0 ? w === C || i(w, C, n, r, a) : b)) {
      h = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (h && !g) {
    var y = e.constructor, E = t.constructor;
    y != E && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof E == "function" && E instanceof E) && (h = !1);
  }
  return a.delete(e), a.delete(t), h;
}
var c5 = l5, u5 = Tn, f5 = yt, d5 = u5(f5, "DataView"), m5 = d5, h5 = Tn, p5 = yt, v5 = h5(p5, "Promise"), g5 = v5, y5 = Tn, b5 = yt, w5 = y5(b5, "Set"), E5 = w5, C5 = Tn, $5 = yt, x5 = C5($5, "WeakMap"), _5 = x5, is = m5, as = ul, os = g5, ss = E5, ls = _5, wd = ur, vr = Jf, jc = "[object Map]", k5 = "[object Object]", Bc = "[object Promise]", Wc = "[object Set]", Zc = "[object WeakMap]", Hc = "[object DataView]", S5 = vr(is), O5 = vr(as), F5 = vr(os), P5 = vr(ss), A5 = vr(ls), Cn = wd;
(is && Cn(new is(new ArrayBuffer(1))) != Hc || as && Cn(new as()) != jc || os && Cn(os.resolve()) != Bc || ss && Cn(new ss()) != Wc || ls && Cn(new ls()) != Zc) && (Cn = function(e) {
  var t = wd(e), n = t == k5 ? e.constructor : void 0, r = n ? vr(n) : "";
  if (r)
    switch (r) {
      case S5:
        return Hc;
      case O5:
        return jc;
      case F5:
        return Bc;
      case P5:
        return Wc;
      case A5:
        return Zc;
    }
  return t;
});
var N5 = Cn, Po = gd, T5 = yd, R5 = Lg, M5 = c5, Uc = N5, zc = Ta, qc = ei.exports, I5 = al, L5 = 1, Kc = "[object Arguments]", Gc = "[object Array]", Li = "[object Object]", D5 = Object.prototype, Yc = D5.hasOwnProperty;
function V5(e, t, n, r, i, a) {
  var o = zc(e), s = zc(t), c = o ? Gc : Uc(e), u = s ? Gc : Uc(t);
  c = c == Kc ? Li : c, u = u == Kc ? Li : u;
  var d = c == Li, f = u == Li, m = c == u;
  if (m && qc(e)) {
    if (!qc(t))
      return !1;
    o = !0, d = !1;
  }
  if (m && !d)
    return a || (a = new Po()), o || I5(e) ? T5(e, t, n, r, i, a) : R5(e, t, c, n, r, i, a);
  if (!(n & L5)) {
    var p = d && Yc.call(e, "__wrapped__"), v = f && Yc.call(t, "__wrapped__");
    if (p || v) {
      var h = p ? e.value() : e, g = v ? t.value() : t;
      return a || (a = new Po()), i(h, g, n, r, a);
    }
  }
  return m ? (a || (a = new Po()), M5(e, t, n, r, i, a)) : !1;
}
var j5 = V5, B5 = j5, Xc = Rn;
function Ed(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !Xc(e) && !Xc(t) ? e !== e && t !== t : B5(e, t, n, r, Ed, i);
}
var W5 = Ed, Z5 = W5;
function H5(e, t) {
  return Z5(e, t);
}
var U5 = H5;
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
  function e(b) {
    try {
      return b.defaultView && b.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var t = function(b) {
    for (var y = b, E = e(y); E; )
      y = E.ownerDocument, E = e(y);
    return y;
  }(window.document), n = [], r = null, i = null;
  function a(b) {
    this.time = b.time, this.target = b.target, this.rootBounds = v(b.rootBounds), this.boundingClientRect = v(b.boundingClientRect), this.intersectionRect = v(b.intersectionRect || p()), this.isIntersecting = !!b.intersectionRect;
    var y = this.boundingClientRect, E = y.width * y.height, $ = this.intersectionRect, k = $.width * $.height;
    E ? this.intersectionRatio = Number((k / E).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(b, y) {
    var E = y || {};
    if (typeof b != "function")
      throw new Error("callback must be a function");
    if (E.root && E.root.nodeType != 1 && E.root.nodeType != 9)
      throw new Error("root must be a Document or Element");
    this._checkForIntersections = c(
      this._checkForIntersections.bind(this),
      this.THROTTLE_TIMEOUT
    ), this._callback = b, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(E.rootMargin), this.thresholds = this._initThresholds(E.threshold), this.root = E.root || null, this.rootMargin = this._rootMarginValues.map(function($) {
      return $.value + $.unit;
    }).join(" "), this._monitoringDocuments = [], this._monitoringUnsubscribes = [];
  }
  o.prototype.THROTTLE_TIMEOUT = 100, o.prototype.POLL_INTERVAL = null, o.prototype.USE_MUTATION_OBSERVER = !0, o._setupCrossOriginUpdater = function() {
    return r || (r = function(b, y) {
      !b || !y ? i = p() : i = h(b, y), n.forEach(function(E) {
        E._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(b) {
    var y = this._observationTargets.some(function(E) {
      return E.element == b;
    });
    if (!y) {
      if (!(b && b.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: b, entry: null }), this._monitorIntersections(b.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(b) {
    this._observationTargets = this._observationTargets.filter(function(y) {
      return y.element != b;
    }), this._unmonitorIntersections(b.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var b = this._queuedEntries.slice();
    return this._queuedEntries = [], b;
  }, o.prototype._initThresholds = function(b) {
    var y = b || [0];
    return Array.isArray(y) || (y = [y]), y.sort().filter(function(E, $, k) {
      if (typeof E != "number" || isNaN(E) || E < 0 || E > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return E !== k[$ - 1];
    });
  }, o.prototype._parseRootMargin = function(b) {
    var y = b || "0px", E = y.split(/\s+/).map(function($) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec($);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return E[1] = E[1] || E[0], E[2] = E[2] || E[0], E[3] = E[3] || E[1], E;
  }, o.prototype._monitorIntersections = function(b) {
    var y = b.defaultView;
    if (!!y && this._monitoringDocuments.indexOf(b) == -1) {
      var E = this._checkForIntersections, $ = null, k = null;
      this.POLL_INTERVAL ? $ = y.setInterval(E, this.POLL_INTERVAL) : (u(y, "resize", E, !0), u(b, "scroll", E, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in y && (k = new y.MutationObserver(E), k.observe(b, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(b), this._monitoringUnsubscribes.push(function() {
        var P = b.defaultView;
        P && ($ && P.clearInterval($), d(P, "resize", E, !0)), d(b, "scroll", E, !0), k && k.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || t;
      if (b != N) {
        var A = e(b);
        A && this._monitorIntersections(A.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(b) {
    var y = this._monitoringDocuments.indexOf(b);
    if (y != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || t, $ = this._observationTargets.some(function(A) {
        var P = A.element.ownerDocument;
        if (P == b)
          return !0;
        for (; P && P != E; ) {
          var T = e(P);
          if (P = T && T.ownerDocument, P == b)
            return !0;
        }
        return !1;
      });
      if (!$) {
        var k = this._monitoringUnsubscribes[y];
        if (this._monitoringDocuments.splice(y, 1), this._monitoringUnsubscribes.splice(y, 1), k(), b != E) {
          var N = e(b);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var b = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var y = 0; y < b.length; y++)
      b[y]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var b = this._rootIsInDom(), y = b ? this._getRootRect() : p();
      this._observationTargets.forEach(function(E) {
        var $ = E.element, k = m($), N = this._rootContainsTarget($), A = E.entry, P = b && N && this._computeTargetAndRootIntersection($, k, y), T = null;
        this._rootContainsTarget($) ? (!r || this.root) && (T = y) : T = p();
        var S = E.entry = new a({
          time: s(),
          target: $,
          boundingClientRect: k,
          rootBounds: T,
          intersectionRect: P
        });
        A ? b && N ? this._hasCrossedThreshold(A, S) && this._queuedEntries.push(S) : A && A.isIntersecting && this._queuedEntries.push(S) : this._queuedEntries.push(S);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(b, y, E) {
    if (window.getComputedStyle(b).display != "none") {
      for (var $ = y, k = w(b), N = !1; !N && k; ) {
        var A = null, P = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (P.display == "none")
          return null;
        if (k == this.root || k.nodeType == 9)
          if (N = !0, k == this.root || k == t)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, A = null, $ = null) : A = i : A = E;
          else {
            var T = w(k), S = T && m(T), _ = T && this._computeTargetAndRootIntersection(T, S, E);
            S && _ ? (k = T, A = h(S, _)) : (k = null, $ = null);
          }
        else {
          var x = k.ownerDocument;
          k != x.body && k != x.documentElement && P.overflow != "visible" && (A = m(k));
        }
        if (A && ($ = f(A, $)), !$)
          break;
        k = k && w(k);
      }
      return $;
    }
  }, o.prototype._getRootRect = function() {
    var b;
    if (this.root && !C(this.root))
      b = m(this.root);
    else {
      var y = C(this.root) ? this.root : t, E = y.documentElement, $ = y.body;
      b = {
        top: 0,
        left: 0,
        right: E.clientWidth || $.clientWidth,
        width: E.clientWidth || $.clientWidth,
        bottom: E.clientHeight || $.clientHeight,
        height: E.clientHeight || $.clientHeight
      };
    }
    return this._expandRectByRootMargin(b);
  }, o.prototype._expandRectByRootMargin = function(b) {
    var y = this._rootMarginValues.map(function($, k) {
      return $.unit == "px" ? $.value : $.value * (k % 2 ? b.width : b.height) / 100;
    }), E = {
      top: b.top - y[0],
      right: b.right + y[1],
      bottom: b.bottom + y[2],
      left: b.left - y[3]
    };
    return E.width = E.right - E.left, E.height = E.bottom - E.top, E;
  }, o.prototype._hasCrossedThreshold = function(b, y) {
    var E = b && b.isIntersecting ? b.intersectionRatio || 0 : -1, $ = y.isIntersecting ? y.intersectionRatio || 0 : -1;
    if (E !== $)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == E || N == $ || N < E != N < $)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || g(t, this.root);
  }, o.prototype._rootContainsTarget = function(b) {
    var y = this.root && (this.root.ownerDocument || this.root) || t;
    return g(y, b) && (!this.root || y == b.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var b = n.indexOf(this);
    b != -1 && n.splice(b, 1);
  };
  function s() {
    return window.performance && performance.now && performance.now();
  }
  function c(b, y) {
    var E = null;
    return function() {
      E || (E = setTimeout(function() {
        b(), E = null;
      }, y));
    };
  }
  function u(b, y, E, $) {
    typeof b.addEventListener == "function" ? b.addEventListener(y, E, $ || !1) : typeof b.attachEvent == "function" && b.attachEvent("on" + y, E);
  }
  function d(b, y, E, $) {
    typeof b.removeEventListener == "function" ? b.removeEventListener(y, E, $ || !1) : typeof b.detachEvent == "function" && b.detachEvent("on" + y, E);
  }
  function f(b, y) {
    var E = Math.max(b.top, y.top), $ = Math.min(b.bottom, y.bottom), k = Math.max(b.left, y.left), N = Math.min(b.right, y.right), A = N - k, P = $ - E;
    return A >= 0 && P >= 0 && {
      top: E,
      bottom: $,
      left: k,
      right: N,
      width: A,
      height: P
    } || null;
  }
  function m(b) {
    var y;
    try {
      y = b.getBoundingClientRect();
    } catch {
    }
    return y ? (y.width && y.height || (y = {
      top: y.top,
      right: y.right,
      bottom: y.bottom,
      left: y.left,
      width: y.right - y.left,
      height: y.bottom - y.top
    }), y) : p();
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
  function v(b) {
    return !b || "x" in b ? b : {
      top: b.top,
      y: b.top,
      bottom: b.bottom,
      left: b.left,
      x: b.left,
      right: b.right,
      width: b.width,
      height: b.height
    };
  }
  function h(b, y) {
    var E = y.top - b.top, $ = y.left - b.left;
    return {
      top: E,
      left: $,
      height: y.height,
      width: y.width,
      bottom: E + y.height,
      right: $ + y.width
    };
  }
  function g(b, y) {
    for (var E = y; E; ) {
      if (E == b)
        return !0;
      E = w(E);
    }
    return !1;
  }
  function w(b) {
    var y = b.parentNode;
    return b.nodeType == 9 && b != t ? e(b) : (y && y.assignedSlot && (y = y.assignedSlot.parentNode), y && y.nodeType == 11 && y.host ? y.host : y);
  }
  function C(b) {
    return b && b.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function z5(e, t) {
  var n = jt(z(), 2), r = n[0], i = n[1], a = jt(z(), 2), o = a[0], s = a[1];
  return cl(function() {
    var c = tn(e);
    if (!!c) {
      var u = new IntersectionObserver(function(d) {
        var f, m;
        try {
          for (var p = Am(d), v = p.next(); !v.done; v = p.next()) {
            var h = v.value;
            s(h.intersectionRatio), i(h.isIntersecting);
          }
        } catch (g) {
          f = {
            error: g
          };
        } finally {
          try {
            v && !v.done && (m = p.return) && m.call(p);
          } finally {
            if (f)
              throw f.error;
          }
        }
      }, la(la({}, t), {
        root: tn(t == null ? void 0 : t.root)
      }));
      return u.observe(c), function() {
        u.disconnect();
      };
    }
  }, [t == null ? void 0 : t.rootMargin, t == null ? void 0 : t.threshold], e), [r, o];
}
var q5 = ll ? Js : K;
const $e = q5;
function K5(e) {
  var t = this, n = D(!1);
  return Xe(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return Ee(t, void 0, void 0, function() {
      var a, o;
      return Pm(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [2];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, e.apply(void 0, tl([], jt(r), !1))];
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
function G5(e) {
  var t = D(0), n = jt(z(e), 2), r = n[0], i = n[1], a = Xe(function(o) {
    cancelAnimationFrame(t.current), t.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return yi(function() {
    cancelAnimationFrame(t.current);
  }), [r, a];
}
var Y5 = cd, X5 = Y5(Object.getPrototypeOf, Object), Cd = X5, Q5 = ur, J5 = Cd, e6 = Rn, t6 = "[object Object]", n6 = Function.prototype, r6 = Object.prototype, $d = n6.toString, i6 = r6.hasOwnProperty, a6 = $d.call(Object);
function o6(e) {
  if (!e6(e) || Q5(e) != t6)
    return !1;
  var t = J5(e);
  if (t === null)
    return !0;
  var n = i6.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && $d.call(n) == a6;
}
var s6 = o6, l6 = function() {
  var e = D(!1);
  return K(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e;
};
const dl = l6;
var xd = function() {
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
}(), cs = typeof window < "u" && typeof document < "u" && window.document === document, ua = function() {
  return typeof global < "u" && global.Math === Math ? global : typeof self < "u" && self.Math === Math ? self : typeof window < "u" && window.Math === Math ? window : Function("return this")();
}(), c6 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ua) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), u6 = 2;
function f6(e, t) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, e()), r && s();
  }
  function o() {
    c6(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < u6)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, t);
    i = c;
  }
  return s;
}
var d6 = 20, m6 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], h6 = typeof MutationObserver < "u", p6 = function() {
  function e() {
    this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = f6(this.refresh.bind(this), d6);
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
    !cs || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), h6 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
      attributes: !0,
      childList: !0,
      characterData: !0,
      subtree: !0
    })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
  }, e.prototype.disconnect_ = function() {
    !cs || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
  }, e.prototype.onTransitionEnd_ = function(t) {
    var n = t.propertyName, r = n === void 0 ? "" : n, i = m6.some(function(a) {
      return !!~r.indexOf(a);
    });
    i && this.refresh();
  }, e.getInstance = function() {
    return this.instance_ || (this.instance_ = new e()), this.instance_;
  }, e.instance_ = null, e;
}(), _d = function(e, t) {
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
}, nr = function(e) {
  var t = e && e.ownerDocument && e.ownerDocument.defaultView;
  return t || ua;
}, kd = Va(0, 0, 0, 0);
function fa(e) {
  return parseFloat(e) || 0;
}
function Qc(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return t.reduce(function(r, i) {
    var a = e["border-" + i + "-width"];
    return r + fa(a);
  }, 0);
}
function v6(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], o = e["padding-" + a];
    n[a] = fa(o);
  }
  return n;
}
function g6(e) {
  var t = e.getBBox();
  return Va(0, 0, t.width, t.height);
}
function y6(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return kd;
  var r = nr(e).getComputedStyle(e), i = v6(r), a = i.left + i.right, o = i.top + i.bottom, s = fa(r.width), c = fa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= Qc(r, "left", "right") + a), Math.round(c + o) !== n && (c -= Qc(r, "top", "bottom") + o)), !w6(e)) {
    var u = Math.round(s + a) - t, d = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(d) !== 1 && (c -= d);
  }
  return Va(i.left, i.top, s, c);
}
var b6 = function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof nr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof nr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function w6(e) {
  return e === nr(e).document.documentElement;
}
function E6(e) {
  return cs ? b6(e) ? g6(e) : y6(e) : kd;
}
function C6(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return _d(o, {
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
function Va(e, t, n, r) {
  return { x: e, y: t, width: n, height: r };
}
var $6 = function() {
  function e(t) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Va(0, 0, 0, 0), this.target = t;
  }
  return e.prototype.isActive = function() {
    var t = E6(this.target);
    return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
  }, e.prototype.broadcastRect = function() {
    var t = this.contentRect_;
    return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
  }, e;
}(), x6 = function() {
  function e(t, n) {
    var r = C6(n);
    _d(this, { target: t, contentRect: r });
  }
  return e;
}(), _6 = function() {
  function e(t, n, r) {
    if (this.activeObservations_ = [], this.observations_ = new xd(), typeof t != "function")
      throw new TypeError("The callback provided as parameter 1 is not a function.");
    this.callback_ = t, this.controller_ = n, this.callbackCtx_ = r;
  }
  return e.prototype.observe = function(t) {
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(t instanceof nr(t).Element))
        throw new TypeError('parameter 1 is not of type "Element".');
      var n = this.observations_;
      n.has(t) || (n.set(t, new $6(t)), this.controller_.addObserver(this), this.controller_.refresh());
    }
  }, e.prototype.unobserve = function(t) {
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    if (!(typeof Element > "u" || !(Element instanceof Object))) {
      if (!(t instanceof nr(t).Element))
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
        return new x6(r.target, r.broadcastRect());
      });
      this.callback_.call(t, n, t), this.clearActive();
    }
  }, e.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e;
}(), Sd = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new xd(), Od = function() {
  function e(t) {
    if (!(this instanceof e))
      throw new TypeError("Cannot call a class as a function.");
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    var n = p6.getInstance(), r = new _6(t, n, this);
    Sd.set(this, r);
  }
  return e;
}();
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Od.prototype[e] = function() {
    var t;
    return (t = Sd.get(this))[e].apply(t, arguments);
  };
});
var k6 = function() {
  return typeof ua.ResizeObserver < "u" ? ua.ResizeObserver : Od;
}(), S6 = hd(Js);
const O6 = S6;
var F6 = ll ? O6 : cl;
const P6 = F6;
function us(e) {
  var t = jt(G5(function() {
    var i = tn(e);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = t[0], r = t[1];
  return P6(function() {
    var i = tn(e);
    if (!!i) {
      var a = new k6(function(o) {
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
function ja(e, t) {
  var n;
  gi && (fr(e) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof e)));
  var r = Ra(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return Uv(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, tl([], jt(o), !1));
    }, i, t);
  }, []);
  return yi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var A6 = function(e, t) {
  var n = Wt(e), r = D(null), i = Xe(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return K(function() {
    if (!(!cv(t) || t < 0))
      return r.current = setTimeout(n, t), i;
  }, [t]), i;
};
const N6 = A6;
const Jc = 10;
function T6(e, t) {
  return e > t && e > Jc ? "horizontal" : t > e && t > Jc ? "vertical" : "";
}
function R6() {
  const e = D(0), t = D(0), n = D(0), r = D(0), i = D(0), a = D(0), o = D(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const p = m.touches[0];
      n.current = p.clientX < 0 ? 0 : p.clientX - e.current, r.current = p.clientY - t.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = T6(i.current, a.current));
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
const M6 = cr ? window : void 0, I6 = ["scroll", "auto", "overlay"];
function L6(e) {
  return e.nodeType === 1;
}
function da(e, t = M6) {
  let n = e;
  for (; n && n !== t && L6(n); ) {
    if (n === document.body)
      return t;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (I6.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return t;
}
let bi = !1;
if (cr)
  try {
    const e = {};
    Object.defineProperty(e, "passive", {
      get() {
        bi = !0;
      }
    }), window.addEventListener("test-passive", null, e);
  } catch {
  }
let Or = 0;
const eu = "adm-overflow-hidden";
function D6(e) {
  let t = e == null ? void 0 : e.parentElement;
  for (; t; ) {
    if (t.clientHeight < t.scrollHeight)
      return t;
    t = t.parentElement;
  }
  return null;
}
function Ba(e, t) {
  const n = R6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = da(o.target, e.current);
    if (!c)
      return;
    if (t === "strict") {
      const p = D6(o.target);
      if (p === document.body || p === document.documentElement) {
        o.preventDefault();
        return;
      }
    }
    const {
      scrollHeight: u,
      offsetHeight: d,
      scrollTop: f
    } = c;
    let m = "11";
    f === 0 ? m = d >= u ? "00" : "01" : f + d >= u && (m = "10"), m !== "11" && n.isVertical() && !(parseInt(m, 2) & parseInt(s, 2)) && o.cancelable && o.preventDefault();
  }, i = () => {
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, bi ? {
      passive: !1
    } : !1), Or || document.body.classList.add(eu), Or++;
  }, a = () => {
    Or && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Or--, Or || document.body.classList.remove(eu));
  };
  K(() => {
    if (t)
      return i(), () => {
        a();
      };
  }, [t]);
}
let ml = Ei();
const Y = (e) => wi(e, ml);
let hl = Ei();
Y.write = (e) => wi(e, hl);
let Wa = Ei();
Y.onStart = (e) => wi(e, Wa);
let pl = Ei();
Y.onFrame = (e) => wi(e, pl);
let vl = Ei();
Y.onFinish = (e) => wi(e, vl);
let Qn = [];
Y.setTimeout = (e, t) => {
  let n = Y.now() + t, r = () => {
    let a = Qn.findIndex((o) => o.cancel == r);
    ~a && Qn.splice(a, 1), Qt -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: e,
    cancel: r
  };
  return Qn.splice(Fd(n), 0, i), Qt += 1, Pd(), i;
};
let Fd = (e) => ~(~Qn.findIndex((t) => t.time > e) || ~Qn.length);
Y.cancel = (e) => {
  Wa.delete(e), pl.delete(e), vl.delete(e), ml.delete(e), hl.delete(e);
};
Y.sync = (e) => {
  fs = !0, Y.batchedUpdates(e), fs = !1;
};
Y.throttle = (e) => {
  let t;
  function n() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function r(...i) {
    t = i, Y.onStart(n);
  }
  return r.handler = e, r.cancel = () => {
    Wa.delete(n), t = null;
  }, r;
};
let gl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
Y.use = (e) => gl = e;
Y.now = typeof performance < "u" ? () => performance.now() : Date.now;
Y.batchedUpdates = (e) => e();
Y.catch = console.error;
Y.frameLoop = "always";
Y.advance = () => {
  Y.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Nd();
};
let Xt = -1, Qt = 0, fs = !1;
function wi(e, t) {
  fs ? (t.delete(e), e(0)) : (t.add(e), Pd());
}
function Pd() {
  Xt < 0 && (Xt = 0, Y.frameLoop !== "demand" && gl(Ad));
}
function V6() {
  Xt = -1;
}
function Ad() {
  ~Xt && (gl(Ad), Y.batchedUpdates(Nd));
}
function Nd() {
  let e = Xt;
  Xt = Y.now();
  let t = Fd(Xt);
  if (t && (Td(Qn.splice(0, t), (n) => n.handler()), Qt -= t), !Qt) {
    V6();
    return;
  }
  Wa.flush(), ml.flush(e ? Math.min(64, Xt - e) : 16.667), pl.flush(), hl.flush(), vl.flush();
}
function Ei() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(n) {
      Qt += t == e && !e.has(n) ? 1 : 0, e.add(n);
    },
    delete(n) {
      return Qt -= t == e && e.has(n) ? 1 : 0, e.delete(n);
    },
    flush(n) {
      t.size && (e = /* @__PURE__ */ new Set(), Qt -= t.size, Td(t, (r) => r(n) && e.add(r)), Qt += e.size, t = e);
    }
  };
}
function Td(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      Y.catch(r);
    }
  });
}
function ds() {
}
const j6 = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), W = {
  arr: Array.isArray,
  obj: (e) => !!e && e.constructor.name === "Object",
  fun: (e) => typeof e == "function",
  str: (e) => typeof e == "string",
  num: (e) => typeof e == "number",
  und: (e) => e === void 0
};
function It(e, t) {
  if (W.arr(e)) {
    if (!W.arr(t) || e.length !== t.length)
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
  if (W.arr(e)) {
    for (let r = 0; r < e.length; r++)
      t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e)
    e.hasOwnProperty(r) && t.call(n, e[r], r);
}
const qe = (e) => W.und(e) ? [] : W.arr(e) ? e : [e];
function Ur(e, t) {
  if (e.size) {
    const n = Array.from(e);
    e.clear(), J(n, t);
  }
}
const Zr = (e, ...t) => Ur(e, (n) => n(...t)), yl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let bl, Rd, en = null, Md = !1, wl = ds;
const B6 = (e) => {
  e.to && (Rd = e.to), e.now && (Y.now = e.now), e.colors !== void 0 && (en = e.colors), e.skipAnimation != null && (Md = e.skipAnimation), e.createStringInterpolator && (bl = e.createStringInterpolator), e.requestAnimationFrame && Y.use(e.requestAnimationFrame), e.batchedUpdates && (Y.batchedUpdates = e.batchedUpdates), e.willAdvance && (wl = e.willAdvance), e.frameLoop && (Y.frameLoop = e.frameLoop);
};
var lt = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return bl;
  },
  get to() {
    return Rd;
  },
  get colors() {
    return en;
  },
  get skipAnimation() {
    return Md;
  },
  get willAdvance() {
    return wl;
  },
  assign: B6
});
const zr = /* @__PURE__ */ new Set();
let ot = [], Ao = [], ma = 0;
const Za = {
  get idle() {
    return !zr.size && !ot.length;
  },
  start(e) {
    ma > e.priority ? (zr.add(e), Y.onStart(W6)) : (Id(e), Y(ms));
  },
  advance: ms,
  sort(e) {
    if (ma)
      Y.onFrame(() => Za.sort(e));
    else {
      const t = ot.indexOf(e);
      ~t && (ot.splice(t, 1), Ld(e));
    }
  },
  clear() {
    ot = [], zr.clear();
  }
};
function W6() {
  zr.forEach(Id), zr.clear(), Y(ms);
}
function Id(e) {
  ot.includes(e) || Ld(e);
}
function Ld(e) {
  ot.splice(Z6(ot, (t) => t.priority > e.priority), 0, e);
}
function ms(e) {
  const t = Ao;
  for (let n = 0; n < ot.length; n++) {
    const r = ot[n];
    ma = r.priority, r.idle || (wl(r), r.advance(e), r.idle || t.push(r));
  }
  return ma = 0, Ao = ot, Ao.length = 0, ot = t, ot.length > 0;
}
function Z6(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
const H6 = (e, t, n) => Math.min(Math.max(n, e), t), U6 = {
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
}, ht = "[-+]?\\d*\\.?\\d+", ha = ht + "%";
function Ha(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const z6 = new RegExp("rgb" + Ha(ht, ht, ht)), q6 = new RegExp("rgba" + Ha(ht, ht, ht, ht)), K6 = new RegExp("hsl" + Ha(ht, ha, ha)), G6 = new RegExp("hsla" + Ha(ht, ha, ha, ht)), Y6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, X6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, Q6 = /^#([0-9a-fA-F]{6})$/, J6 = /^#([0-9a-fA-F]{8})$/;
function e7(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = Q6.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : en && en[e] !== void 0 ? en[e] : (t = z6.exec(e)) ? (Ln(t[1]) << 24 | Ln(t[2]) << 16 | Ln(t[3]) << 8 | 255) >>> 0 : (t = q6.exec(e)) ? (Ln(t[1]) << 24 | Ln(t[2]) << 16 | Ln(t[3]) << 8 | ru(t[4])) >>> 0 : (t = Y6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = J6.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = X6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = K6.exec(e)) ? (tu(nu(t[1]), Di(t[2]), Di(t[3])) | 255) >>> 0 : (t = G6.exec(e)) ? (tu(nu(t[1]), Di(t[2]), Di(t[3])) | ru(t[4])) >>> 0 : null;
}
function No(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function tu(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = No(i, r, e + 1 / 3), o = No(i, r, e), s = No(i, r, e - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(s * 255) << 8;
}
function Ln(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function nu(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function ru(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function Di(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function iu(e) {
  let t = e7(e);
  if (t === null)
    return e;
  t = t || 0;
  let n = (t & 4278190080) >>> 24, r = (t & 16711680) >>> 16, i = (t & 65280) >>> 8, a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const ti = (e, t, n) => {
  if (W.fun(e))
    return e;
  if (W.arr(e))
    return ti({
      range: e,
      output: t,
      extrapolate: n
    });
  if (W.str(e.output[0]))
    return bl(e);
  const r = e, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const d = n7(u, a);
    return t7(u, a[d], a[d + 1], i[d], i[d + 1], c, o, s, r.map);
  };
};
function t7(e, t, n, r, i, a, o, s, c) {
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
function n7(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
    ;
  return n - 1;
}
const r7 = (e, t = "end") => (n) => {
  n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * e, i = t === "end" ? Math.floor(r) : Math.ceil(r);
  return H6(0, 1, i / e);
}, pa = 1.70158, Vi = pa * 1.525, au = pa + 1, ou = 2 * Math.PI / 3, su = 2 * Math.PI / 4.5, ji = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, i7 = {
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
  easeInBack: (e) => au * e * e * e - pa * e * e,
  easeOutBack: (e) => 1 + au * Math.pow(e - 1, 3) + pa * Math.pow(e - 1, 2),
  easeInOutBack: (e) => e < 0.5 ? Math.pow(2 * e, 2) * ((Vi + 1) * 2 * e - Vi) / 2 : (Math.pow(2 * e - 2, 2) * ((Vi + 1) * (e * 2 - 2) + Vi) + 2) / 2,
  easeInElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : -Math.pow(2, 10 * e - 10) * Math.sin((e * 10 - 10.75) * ou),
  easeOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : Math.pow(2, -10 * e) * Math.sin((e * 10 - 0.75) * ou) + 1,
  easeInOutElastic: (e) => e === 0 ? 0 : e === 1 ? 1 : e < 0.5 ? -(Math.pow(2, 20 * e - 10) * Math.sin((20 * e - 11.125) * su)) / 2 : Math.pow(2, -20 * e + 10) * Math.sin((20 * e - 11.125) * su) / 2 + 1,
  easeInBounce: (e) => 1 - ji(1 - e),
  easeOutBounce: ji,
  easeInOutBounce: (e) => e < 0.5 ? (1 - ji(1 - 2 * e)) / 2 : (1 + ji(2 * e - 1)) / 2,
  steps: r7
};
function hs() {
  return hs = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, hs.apply(this, arguments);
}
const rr = Symbol.for("FluidValue.get"), Fn = Symbol.for("FluidValue.observers"), it = (e) => Boolean(e && e[rr]), Ze = (e) => e && e[rr] ? e[rr]() : e, lu = (e) => e[Fn] || null;
function a7(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function ni(e, t) {
  let n = e[Fn];
  n && n.forEach((r) => {
    a7(r, t);
  });
}
class Dd {
  constructor(t) {
    if (this[rr] = void 0, this[Fn] = void 0, !t && !(t = this.get))
      throw Error("Unknown getter");
    o7(this, t);
  }
}
const o7 = (e, t) => Vd(e, rr, t);
function gr(e, t) {
  if (e[rr]) {
    let n = e[Fn];
    n || Vd(e, Fn, n = /* @__PURE__ */ new Set()), n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
  }
  return t;
}
function ri(e, t) {
  let n = e[Fn];
  if (n && n.has(t)) {
    const r = n.size - 1;
    r ? n.delete(t) : e[Fn] = null, e.observerRemoved && e.observerRemoved(r, t);
  }
}
const Vd = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), ta = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, s7 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, cu = new RegExp(`(${ta.source})(%|[a-z]+)`, "i"), l7 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ua = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, jd = (e) => {
  const [t, n] = c7(e);
  if (!t || yl())
    return e;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || e;
  } else {
    if (n && Ua.test(n))
      return jd(n);
    if (n)
      return n;
  }
  return e;
}, c7 = (e) => {
  const t = Ua.exec(e);
  if (!t)
    return [,];
  const [, n, r] = t;
  return [n, r];
};
let To;
const u7 = (e, t, n, r, i) => `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, Bd = (e) => {
  To || (To = en ? new RegExp(`(${Object.keys(en).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((a) => Ze(a).replace(Ua, jd).replace(s7, iu).replace(To, iu)), n = t.map((a) => a.match(ta).map(Number)), i = n[0].map((a, o) => n.map((s) => {
    if (!(o in s))
      throw Error('The arity of each "output" value must be equal');
    return s[o];
  })).map((a) => ti(hs({}, e, {
    output: a
  })));
  return (a) => {
    var o;
    const s = !cu.test(t[0]) && ((o = t.find((u) => cu.test(u))) == null ? void 0 : o.replace(ta, ""));
    let c = 0;
    return t[0].replace(ta, () => `${i[c++](a)}${s || ""}`).replace(l7, u7);
  };
}, El = "react-spring: ", Wd = (e) => {
  const t = e;
  let n = !1;
  if (typeof t != "function")
    throw new TypeError(`${El}once requires a function parameter`);
  return (...r) => {
    n || (t(...r), n = !0);
  };
}, f7 = Wd(console.warn);
function d7() {
  f7(`${El}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const m7 = Wd(console.warn);
function h7() {
  m7(`${El}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function za(e) {
  return W.str(e) && (e[0] == "#" || /\d/.test(e) || !yl() && Ua.test(e) || e in (en || {}));
}
const Cl = yl() ? K : Js, p7 = () => {
  const e = D(!1);
  return Cl(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function Zd() {
  const e = z()[1], t = p7();
  return () => {
    t.current && e(Math.random());
  };
}
function v7(e, t) {
  const [n] = z(() => ({
    inputs: t,
    result: e()
  })), r = D(), i = r.current;
  let a = i;
  return a ? Boolean(t && a.inputs && g7(t, a.inputs)) || (a = {
    inputs: t,
    result: e()
  }) : a = n, K(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function g7(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Hd = (e) => K(e, y7), y7 = [];
function uu(e) {
  const t = D();
  return K(() => {
    t.current = e;
  }), t.current;
}
const ii = Symbol.for("Animated:node"), b7 = (e) => !!e && e[ii] === e, _t = (e) => e && e[ii], $l = (e, t) => j6(e, ii, t), qa = (e) => e && e[ii] && e[ii].getPayload();
class Ud {
  constructor() {
    this.payload = void 0, $l(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class yr extends Ud {
  constructor(t) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = t, W.num(this._value) && (this.lastPosition = this._value);
  }
  static create(t) {
    return new yr(t);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(t, n) {
    return W.num(t) && (this.lastPosition = t, n && (t = Math.round(t / n) * n, this.done && (this.lastPosition = t))), this._value === t ? !1 : (this._value = t, !0);
  }
  reset() {
    const {
      done: t
    } = this;
    this.done = !1, W.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, t && (this.lastVelocity = null), this.v0 = null);
  }
}
class ir extends yr {
  constructor(t) {
    super(0), this._string = null, this._toString = void 0, this._toString = ti({
      output: [t, t]
    });
  }
  static create(t) {
    return new ir(t);
  }
  getValue() {
    let t = this._string;
    return t == null ? this._string = this._toString(this._value) : t;
  }
  setValue(t) {
    if (W.str(t)) {
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
    t && (this._toString = ti({
      output: [this.getValue(), t]
    })), this._value = 0, super.reset();
  }
}
const va = {
  dependencies: null
};
class Ka extends Ud {
  constructor(t) {
    super(), this.source = t, this.setValue(t);
  }
  getValue(t) {
    const n = {};
    return Ot(this.source, (r, i) => {
      b7(r) ? n[i] = r.getValue(t) : it(r) ? n[i] = Ze(r) : t || (n[i] = r);
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
    va.dependencies && it(t) && va.dependencies.add(t);
    const n = qa(t);
    n && J(n, (r) => this.add(r));
  }
}
class xl extends Ka {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new xl(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const n = this.getPayload();
    return t.length == n.length ? n.map((r, i) => r.setValue(t[i])).some(Boolean) : (super.setValue(t.map(w7)), !0);
  }
}
function w7(e) {
  return (za(e) ? ir : yr).create(e);
}
function ps(e) {
  const t = _t(e);
  return t ? t.constructor : W.arr(e) ? xl : za(e) ? ir : yr;
}
function ga() {
  return ga = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ga.apply(this, arguments);
}
const fu = (e, t) => {
  const n = !W.fun(e) || e.prototype && e.prototype.isReactComponent;
  return de((r, i) => {
    const a = D(null), o = n && Xe((v) => {
      a.current = $7(i, v);
    }, [i]), [s, c] = C7(r, t), u = Zd(), d = () => {
      const v = a.current;
      if (n && !v)
        return;
      (v ? t.applyAnimatedValues(v, s.getValue(!0)) : !1) === !1 && u();
    }, f = new E7(d, c), m = D();
    Cl(() => (m.current = f, J(c, (v) => gr(v, f)), () => {
      m.current && (J(m.current.deps, (v) => ri(v, m.current)), Y.cancel(m.current.update));
    })), K(d, []), Hd(() => () => {
      const v = m.current;
      J(v.deps, (h) => ri(h, v));
    });
    const p = t.getComponentProps(s.getValue());
    return L.createElement(e, ga({}, p, {
      ref: o
    }));
  });
};
class E7 {
  constructor(t, n) {
    this.update = t, this.deps = n;
  }
  eventObserved(t) {
    t.type == "change" && Y.write(this.update);
  }
}
function C7(e, t) {
  const n = /* @__PURE__ */ new Set();
  return va.dependencies = n, e.style && (e = ga({}, e, {
    style: t.createAnimatedStyle(e.style)
  })), e = new Ka(e), va.dependencies = null, [e, n];
}
function $7(e, t) {
  return e && (W.fun(e) ? e(t) : e.current = t), t;
}
const du = Symbol.for("AnimatedComponent"), x7 = (e, {
  applyAnimatedValues: t = () => !1,
  createAnimatedStyle: n = (i) => new Ka(i),
  getComponentProps: r = (i) => i
} = {}) => {
  const i = {
    applyAnimatedValues: t,
    createAnimatedStyle: n,
    getComponentProps: r
  }, a = (o) => {
    const s = mu(o) || "Anonymous";
    return W.str(o) ? o = a[o] || (a[o] = fu(o, i)) : o = o[du] || (o[du] = fu(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return Ot(e, (o, s) => {
    W.arr(e) && (s = mu(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, mu = (e) => W.str(e) ? e : e && W.str(e.displayName) ? e.displayName : W.fun(e) && e.name || null;
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
function $n(e, ...t) {
  return W.fun(e) ? e(...t) : e;
}
const qr = (e, t) => e === !0 || !!(t && e && (W.fun(e) ? e(t) : qe(e).includes(t))), zd = (e, t) => W.obj(e) ? t && e[t] : e, qd = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, _7 = (e) => e, _l = (e, t = _7) => {
  let n = k7;
  e.default && e.default !== !0 && (e = e.default, n = Object.keys(e));
  const r = {};
  for (const i of n) {
    const a = t(e[i], i);
    W.und(a) || (r[i] = a);
  }
  return r;
}, k7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], S7 = {
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
function O7(e) {
  const t = {};
  let n = 0;
  if (Ot(e, (r, i) => {
    S7[i] || (t[i] = r, n++);
  }), n)
    return t;
}
function Kd(e) {
  const t = O7(e);
  if (t) {
    const n = {
      to: t
    };
    return Ot(e, (r, i) => i in t || (n[i] = r)), n;
  }
  return Pe({}, e);
}
function ai(e) {
  return e = Ze(e), W.arr(e) ? e.map(ai) : za(e) ? lt.createStringInterpolator({
    range: [0, 1],
    output: [e, e]
  })(1) : e;
}
function F7(e) {
  for (const t in e)
    return !0;
  return !1;
}
function vs(e) {
  return W.fun(e) || W.arr(e) && W.obj(e[0]);
}
function P7(e, t) {
  var n;
  (n = e.ref) == null || n.delete(e), t == null || t.delete(e);
}
function A7(e, t) {
  if (t && e.ref !== t) {
    var n;
    (n = e.ref) == null || n.delete(e), t.add(e), e.ref = t;
  }
}
const N7 = {
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
}, gs = Pe({}, N7.default, {
  mass: 1,
  damping: 1,
  easing: i7.linear,
  clamp: !1
});
class T7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, gs);
  }
}
function R7(e, t, n) {
  n && (n = Pe({}, n), hu(n, t), t = Pe({}, n, t)), hu(e, t), Object.assign(e, t);
  for (const o in gs)
    e[o] == null && (e[o] = gs[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = e;
  return W.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), e.tension = Math.pow(2 * Math.PI / i, 2) * r, e.friction = 4 * Math.PI * a * r / i), e;
}
function hu(e, t) {
  if (!W.und(t.decay))
    e.duration = void 0;
  else {
    const n = !W.und(t.tension) || !W.und(t.friction);
    (n || !W.und(t.frequency) || !W.und(t.damping) || !W.und(t.mass)) && (e.duration = void 0, e.decay = void 0), n && (e.frequency = void 0);
  }
}
const pu = [];
class M7 {
  constructor() {
    this.changed = !1, this.values = pu, this.toValues = null, this.fromValues = pu, this.to = void 0, this.from = void 0, this.config = new T7(), this.immediate = !1;
  }
}
function Gd(e, {
  key: t,
  props: n,
  defaultProps: r,
  state: i,
  actions: a
}) {
  return new Promise((o, s) => {
    var c;
    let u, d, f = qr((c = n.cancel) != null ? c : r == null ? void 0 : r.cancel, t);
    if (f)
      v();
    else {
      W.und(n.pause) || (i.paused = qr(n.pause, t));
      let h = r == null ? void 0 : r.pause;
      h !== !0 && (h = i.paused || qr(h, t)), u = $n(n.delay || 0, t), h ? (i.resumeQueue.add(p), a.pause()) : (a.resume(), p());
    }
    function m() {
      i.resumeQueue.add(p), i.timeouts.delete(d), d.cancel(), u = d.time - Y.now();
    }
    function p() {
      u > 0 && !lt.skipAnimation ? (i.delayed = !0, d = Y.setTimeout(v, u), i.pauseQueue.add(m), i.timeouts.add(d)) : v();
    }
    function v() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(m), i.timeouts.delete(d), e <= (i.cancelId || 0) && (f = !0);
      try {
        a.start(Pe({}, n, {
          callId: e,
          cancel: f
        }), o);
      } catch (h) {
        s(h);
      }
    }
  });
}
const kl = (e, t) => t.length == 1 ? t[0] : t.some((n) => n.cancelled) ? Jn(e.get()) : t.every((n) => n.noop) ? Yd(e.get()) : mt(e.get(), t.every((n) => n.finished)), Yd = (e) => ({
  value: e,
  noop: !0,
  finished: !0,
  cancelled: !1
}), mt = (e, t, n = !1) => ({
  value: e,
  finished: t,
  cancelled: n
}), Jn = (e) => ({
  value: e,
  cancelled: !0,
  finished: !1
});
function Xd(e, t, n, r) {
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
    const u = _l(t, (g, w) => w === "onRest" ? void 0 : g);
    let d, f;
    const m = new Promise((g, w) => (d = g, f = w)), p = (g) => {
      const w = i <= (n.cancelId || 0) && Jn(r) || i !== n.asyncId && mt(r, !1);
      if (w)
        throw g.result = w, f(g), g;
    }, v = (g, w) => {
      const C = new vu(), b = new gu();
      return (async () => {
        if (lt.skipAnimation)
          throw oi(n), b.result = mt(r, !1), f(b), b;
        p(C);
        const y = W.obj(g) ? Pe({}, g) : Pe({}, w, {
          to: g
        });
        y.parentId = i, Ot(u, ($, k) => {
          W.und(y[k]) && (y[k] = $);
        });
        const E = await r.start(y);
        return p(C), n.paused && await new Promise(($) => {
          n.resumeQueue.add($);
        }), E;
      })();
    };
    let h;
    if (lt.skipAnimation)
      return oi(n), mt(r, !1);
    try {
      let g;
      W.arr(e) ? g = (async (w) => {
        for (const C of w)
          await v(C);
      })(e) : g = Promise.resolve(e(v, r.stop.bind(r))), await Promise.all([g.then(d), m]), h = mt(r.get(), !0, !1);
    } catch (g) {
      if (g instanceof vu)
        h = g.result;
      else if (g instanceof gu)
        h = g.result;
      else
        throw g;
    } finally {
      i == n.asyncId && (n.asyncId = a, n.asyncTo = a ? s : void 0, n.promise = a ? c : void 0);
    }
    return W.fun(o) && Y.batchedUpdates(() => {
      o(h, r, r.item);
    }), h;
  })();
}
function oi(e, t) {
  Ur(e.timeouts, (n) => n.cancel()), e.pauseQueue.clear(), e.resumeQueue.clear(), e.asyncId = e.asyncTo = e.promise = void 0, t && (e.cancelId = t);
}
class vu extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise."), this.result = void 0;
  }
}
class gu extends Error {
  constructor() {
    super("SkipAnimationSignal"), this.result = void 0;
  }
}
const ys = (e) => e instanceof Sl;
let I7 = 1;
class Sl extends Dd {
  constructor(...t) {
    super(...t), this.id = I7++, this.key = void 0, this._priority = 0;
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
    return lt.to(this, t);
  }
  interpolate(...t) {
    return d7(), lt.to(this, t);
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
    ni(this, {
      type: "change",
      parent: this,
      value: t,
      idle: n
    });
  }
  _onPriorityChange(t) {
    this.idle || Za.sort(this), ni(this, {
      type: "priority",
      parent: this,
      priority: t
    });
  }
}
const Pn = Symbol.for("SpringPhase"), Qd = 1, bs = 2, ws = 4, Ro = (e) => (e[Pn] & Qd) > 0, Zt = (e) => (e[Pn] & bs) > 0, Fr = (e) => (e[Pn] & ws) > 0, yu = (e, t) => t ? e[Pn] |= bs | Qd : e[Pn] &= ~bs, bu = (e, t) => t ? e[Pn] |= ws : e[Pn] &= ~ws;
class L7 extends Sl {
  constructor(t, n) {
    if (super(), this.key = void 0, this.animation = new M7(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !W.und(t) || !W.und(n)) {
      const r = W.obj(t) ? Pe({}, t) : Pe({}, n, {
        from: t
      });
      W.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Zt(this) || this._state.asyncTo) || Fr(this);
  }
  get goal() {
    return Ze(this.animation.to);
  }
  get velocity() {
    const t = _t(this);
    return t instanceof yr ? t.lastVelocity || 0 : t.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Ro(this);
  }
  get isAnimating() {
    return Zt(this);
  }
  get isPaused() {
    return Fr(this);
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
    const s = qa(i.to);
    !s && it(i.to) && (o = qe(Ze(i.to))), i.values.forEach((d, f) => {
      if (d.done)
        return;
      const m = d.constructor == ir ? 1 : s ? s[f].lastPosition : o[f];
      let p = i.immediate, v = m;
      if (!p) {
        if (v = d.lastPosition, a.tension <= 0) {
          d.done = !0;
          return;
        }
        let h = d.elapsedTime += t;
        const g = i.fromValues[f], w = d.v0 != null ? d.v0 : d.v0 = W.arr(a.velocity) ? a.velocity[f] : a.velocity;
        let C;
        const b = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (W.und(a.duration))
          if (a.decay) {
            const y = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - y) * h);
            v = g + w / (1 - y) * (1 - E), p = Math.abs(d.lastPosition - v) <= b, C = w * E;
          } else {
            C = d.lastVelocity == null ? w : d.lastVelocity;
            const y = a.restVelocity || b / 10, E = a.clamp ? 0 : a.bounce, $ = !W.und(E), k = g == m ? d.v0 > 0 : g < m;
            let N, A = !1;
            const P = 1, T = Math.ceil(t / P);
            for (let S = 0; S < T && (N = Math.abs(C) > y, !(!N && (p = Math.abs(m - v) <= b, p))); ++S) {
              $ && (A = v == m || v > m == k, A && (C = -C * E, v = m));
              const _ = -a.tension * 1e-6 * (v - m), x = -a.friction * 1e-3 * C, F = (_ + x) / a.mass;
              C = C + F * P, v = v + C * P;
            }
          }
        else {
          let y = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, d.durationProgress > 0 && (d.elapsedTime = a.duration * d.durationProgress, h = d.elapsedTime += t)), y = (a.progress || 0) + h / this._memoizedDuration, y = y > 1 ? 1 : y < 0 ? 0 : y, d.durationProgress = y), v = g + a.easing(y) * (m - g), C = (v - d.lastPosition) / t, p = y == 1;
        }
        d.lastVelocity = C, Number.isNaN(v) && (console.warn("Got NaN while animating:", this), p = !0);
      }
      s && !s[f].done && (p = !1), p ? d.done = !0 : n = !1, d.setValue(v, a.round) && (r = !0);
    });
    const c = _t(this), u = c.getValue();
    if (n) {
      const d = Ze(i.to);
      (u !== d || r) && !a.decay ? (c.setValue(d), this._onChange(d)) : r && a.decay && this._onChange(u), this._stop();
    } else
      r && this._onChange(u);
  }
  set(t) {
    return Y.batchedUpdates(() => {
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
    if (Zt(this)) {
      const {
        to: t,
        config: n
      } = this.animation;
      Y.batchedUpdates(() => {
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
    return W.und(t) ? (r = this.queue || [], this.queue = []) : r = [W.obj(t) ? t : Pe({}, n, {
      to: t
    })], Promise.all(r.map((i) => this._update(i))).then((i) => kl(this, i));
  }
  stop(t) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), oi(this._state, t && this._lastCallId), Y.batchedUpdates(() => this._stop(n, t)), this;
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
    r = W.obj(r) ? r[n] : r, (r == null || vs(r)) && (r = void 0), i = W.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Ro(this) || (t.reverse && ([r, i] = [i, r]), i = Ze(i), W.und(i) ? _t(this) || this._set(r) : this._set(i)), a;
  }
  _update(t, n) {
    let r = Pe({}, t);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, _l(r, (c, u) => /^on/.test(u) ? zd(c, i) : c)), Eu(this, r, "onProps"), Ar(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return Gd(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Fr(this) || (bu(this, !0), Zr(s.pauseQueue), Ar(this, "onPause", mt(this, Pr(this, this.animation.to)), this));
        },
        resume: () => {
          Fr(this) && (bu(this, !1), Zt(this) && this._resume(), Zr(s.resumeQueue), Ar(this, "onResume", mt(this, Pr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Jd(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(t, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Jn(this));
    const i = !W.und(t.to), a = !W.und(t.from);
    if (i || a)
      if (n.callId > this._lastToId)
        this._lastToId = n.callId;
      else
        return r(Jn(this));
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
    a && !i && (!n.default || W.und(f)) && (f = m), n.reverse && ([f, m] = [m, f]);
    const p = !It(m, d);
    p && (c.from = m), m = Ze(m);
    const v = !It(f, u);
    v && this._focus(f);
    const h = vs(n.to), {
      config: g
    } = c, {
      decay: w,
      velocity: C
    } = g;
    (i || a) && (g.velocity = 0), n.config && !h && R7(g, $n(n.config, o), n.config !== s.config ? $n(s.config, o) : void 0);
    let b = _t(this);
    if (!b || W.und(f))
      return r(mt(this, !0));
    const y = W.und(n.reset) ? a && !n.default : !W.und(m) && qr(n.reset, o), E = y ? m : this.get(), $ = ai(f), k = W.num($) || W.arr($) || za($), N = !h && (!k || qr(s.immediate || n.immediate, o));
    if (v) {
      const S = ps(f);
      if (S !== b.constructor)
        if (N)
          b = this._set($);
        else
          throw Error(`Cannot animate between ${b.constructor.name} and ${S.name}, as the "to" prop suggests`);
    }
    const A = b.constructor;
    let P = it(f), T = !1;
    if (!P) {
      const S = y || !Ro(this) && p;
      (v || S) && (T = It(ai(E), $), P = !T), (!It(c.immediate, N) && !N || !It(g.decay, w) || !It(g.velocity, C)) && (P = !0);
    }
    if (T && Zt(this) && (c.changed && !y ? P = !0 : P || this._stop(u)), !h && ((P || it(u)) && (c.values = b.getPayload(), c.toValues = it(f) ? null : A == ir ? [1] : qe($)), c.immediate != N && (c.immediate = N, !N && !y && this._set(u)), P)) {
      const {
        onRest: S
      } = c;
      J(V7, (x) => Eu(this, n, x));
      const _ = mt(this, Pr(this, u));
      Zr(this._pendingCalls, _), this._pendingCalls.add(r), c.changed && Y.batchedUpdates(() => {
        c.changed = !y, S == null || S(_, this), y ? $n(s.onRest, _) : c.onStart == null || c.onStart(_, this);
      });
    }
    y && this._set(E), h ? r(Xd(n.to, n, this._state, this)) : P ? this._start() : Zt(this) && !v ? this._pendingCalls.add(r) : r(Yd(E));
  }
  _focus(t) {
    const n = this.animation;
    t !== n.to && (lu(this) && this._detach(), n.to = t, lu(this) && this._attach());
  }
  _attach() {
    let t = 0;
    const {
      to: n
    } = this.animation;
    it(n) && (gr(n, this), ys(n) && (t = n.priority + 1)), this.priority = t;
  }
  _detach() {
    const {
      to: t
    } = this.animation;
    it(t) && ri(t, this);
  }
  _set(t, n = !0) {
    const r = Ze(t);
    if (!W.und(r)) {
      const i = _t(this);
      if (!i || !It(r, i.getValue())) {
        const a = ps(r);
        !i || i.constructor != a ? $l(this, a.create(r)) : i.setValue(r), i && Y.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return _t(this);
  }
  _onStart() {
    const t = this.animation;
    t.changed || (t.changed = !0, Ar(this, "onStart", mt(this, Pr(this, t.to)), this));
  }
  _onChange(t, n) {
    n || (this._onStart(), $n(this.animation.onChange, t, this)), $n(this.defaultProps.onChange, t, this), super._onChange(t, n);
  }
  _start() {
    const t = this.animation;
    _t(this).reset(Ze(t.to)), t.immediate || (t.fromValues = t.values.map((n) => n.lastPosition)), Zt(this) || (yu(this, !0), Fr(this) || this._resume());
  }
  _resume() {
    lt.skipAnimation ? this.finish() : Za.start(this);
  }
  _stop(t, n) {
    if (Zt(this)) {
      yu(this, !1);
      const r = this.animation;
      J(r.values, (a) => {
        a.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), ni(this, {
        type: "idle",
        parent: this
      });
      const i = n ? Jn(this.get()) : mt(this.get(), Pr(this, t != null ? t : r.to));
      Zr(this._pendingCalls, i), r.changed && (r.changed = !1, Ar(this, "onRest", i, this));
    }
  }
}
function Pr(e, t) {
  const n = ai(t), r = ai(e.get());
  return It(r, n);
}
function Jd(e, t = e.loop, n = e.to) {
  let r = $n(t);
  if (r) {
    const i = r !== !0 && Kd(r), a = (i || e).reverse, o = !i || i.reset;
    return si(Pe({}, e, {
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || vs(n) ? n : void 0,
      from: o ? e.from : void 0,
      reset: o
    }, i));
  }
}
function si(e) {
  const {
    to: t,
    from: n
  } = e = Kd(e), r = /* @__PURE__ */ new Set();
  return W.obj(t) && wu(t, r), W.obj(n) && wu(n, r), e.keys = r.size ? Array.from(r) : null, e;
}
function D7(e) {
  const t = si(e);
  return W.und(t.default) && (t.default = _l(t)), t;
}
function wu(e, t) {
  Ot(e, (n, r) => n != null && t.add(r));
}
const V7 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Eu(e, t, n) {
  e.animation[n] = t[n] !== qd(t, n) ? zd(t[n], e.key) : void 0;
}
function Ar(e, t, ...n) {
  var r, i, a, o;
  (r = (i = e.animation)[t]) == null || r.call(i, ...n), (a = (o = e.defaultProps)[t]) == null || a.call(o, ...n);
}
const j7 = ["onStart", "onChange", "onRest"];
let B7 = 1;
class W7 {
  constructor(t, n) {
    this.id = B7++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
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
      W.und(r) || this.springs[n].set(r);
    }
  }
  update(t) {
    return t && this.queue.push(si(t)), this;
  }
  start(t) {
    let {
      queue: n
    } = this;
    return t ? n = qe(t).map(si) : this.queue = [], this._flush ? this._flush(this, n) : (i1(this, n), Es(this, n));
  }
  stop(t, n) {
    if (t !== !!t && (n = t), n) {
      const r = this.springs;
      J(qe(n), (i) => r[i].stop(!!t));
    } else
      oi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!t));
    return this;
  }
  pause(t) {
    if (W.und(t))
      this.start({
        pause: !0
      });
    else {
      const n = this.springs;
      J(qe(t), (r) => n[r].pause());
    }
    return this;
  }
  resume(t) {
    if (W.und(t))
      this.start({
        pause: !1
      });
    else {
      const n = this.springs;
      J(qe(t), (r) => n[r].resume());
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
    (i && !this._started || a && !this._started) && (this._started = !0, Ur(t, ([c, u]) => {
      u.value = this.get(), c(u, this, this._item);
    }));
    const o = !i && this._started, s = a || o && r.size ? this.get() : null;
    a && n.size && Ur(n, ([c, u]) => {
      u.value = s, c(u, this, this._item);
    }), o && (this._started = !1, Ur(r, ([c, u]) => {
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
    Y.onFrame(this._onFrame);
  }
}
function Es(e, t) {
  return Promise.all(t.map((n) => e1(e, n))).then((n) => kl(e, n));
}
async function e1(e, t, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = t, u = W.obj(t.default) && t.default;
  o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null);
  const d = W.arr(i) || W.fun(i) ? i : void 0;
  d ? (t.to = void 0, t.onRest = void 0, u && (u.onRest = void 0)) : J(j7, (h) => {
    const g = t[h];
    if (W.fun(g)) {
      const w = e._events[h];
      t[h] = ({
        finished: C,
        cancelled: b
      }) => {
        const y = w.get(g);
        y ? (C || (y.finished = !1), b && (y.cancelled = !0)) : w.set(g, {
          value: null,
          finished: C || !1,
          cancelled: b || !1
        });
      }, u && (u[h] = t[h]);
    }
  });
  const f = e._state;
  t.pause === !f.paused ? (f.paused = t.pause, Zr(t.pause ? f.pauseQueue : f.resumeQueue)) : f.paused && (t.pause = !0);
  const m = (r || Object.keys(e.springs)).map((h) => e.springs[h].start(t)), p = t.cancel === !0 || qd(t, "cancel") === !0;
  (d || p && f.asyncId) && m.push(Gd(++e._lastAsyncId, {
    props: t,
    state: f,
    actions: {
      pause: ds,
      resume: ds,
      start(h, g) {
        p ? (oi(f, e._lastAsyncId), g(Jn(e))) : (h.onRest = s, g(Xd(d, h, f, e)));
      }
    }
  })), f.paused && await new Promise((h) => {
    f.resumeQueue.add(h);
  });
  const v = kl(e, await Promise.all(m));
  if (o && v.finished && !(n && v.noop)) {
    const h = Jd(t, o, i);
    if (h)
      return i1(e, [h]), e1(e, h, !0);
  }
  return c && Y.batchedUpdates(() => c(v, e, e.item)), v;
}
function Cu(e, t) {
  const n = Pe({}, e.springs);
  return t && J(qe(t), (r) => {
    W.und(r.keys) && (r = si(r)), W.obj(r.to) || (r = Pe({}, r, {
      to: void 0
    })), r1(n, r, (i) => n1(i));
  }), t1(e, n), n;
}
function t1(e, t) {
  Ot(t, (n, r) => {
    e.springs[r] || (e.springs[r] = n, gr(n, e));
  });
}
function n1(e, t) {
  const n = new L7();
  return n.key = e, t && gr(n, t), n;
}
function r1(e, t, n) {
  t.keys && J(t.keys, (r) => {
    (e[r] || (e[r] = n(r)))._prepareNode(t);
  });
}
function i1(e, t) {
  J(t, (n) => {
    r1(e.springs, n, (r) => n1(r, e));
  });
}
function Z7(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const H7 = ["children"], Ga = (e) => {
  let {
    children: t
  } = e, n = Z7(e, H7);
  const r = st(ya), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = v7(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = ya;
  return L.createElement(o, {
    value: n
  }, t);
}, ya = U7(Ga, {});
Ga.Provider = ya.Provider;
Ga.Consumer = ya.Consumer;
function U7(e, t) {
  return Object.assign(e, L.createContext(t)), e.Provider._context = e, e.Consumer._context = e, e;
}
const z7 = () => {
  const e = [], t = function(i) {
    h7();
    const a = [];
    return J(e, (o, s) => {
      if (W.und(i))
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
      if (W.und(r))
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
    return W.fun(i) ? i(o, a) : i;
  };
  return t._getProps = n, t;
};
function q7(e, t, n) {
  const r = W.fun(t) && t;
  r && !n && (n = []);
  const i = re(() => r || arguments.length == 3 ? z7() : void 0, []), a = D(0), o = Zd(), s = re(() => ({
    ctrls: [],
    queue: [],
    flush(w, C) {
      const b = Cu(w, C);
      return a.current > 0 && !s.queue.length && !Object.keys(b).some((E) => !w.springs[E]) ? Es(w, C) : new Promise((E) => {
        t1(w, b), s.queue.push(() => {
          E(Es(w, C));
        }), o();
      });
    }
  }), []), c = D([...s.ctrls]), u = [], d = uu(e) || 0;
  re(() => {
    J(c.current.slice(e, d), (w) => {
      P7(w, i), w.stop(!0);
    }), c.current.length = e, f(d, e);
  }, [e]), re(() => {
    f(0, Math.min(d, e));
  }, n);
  function f(w, C) {
    for (let b = w; b < C; b++) {
      const y = c.current[b] || (c.current[b] = new W7(null, s.flush)), E = r ? r(b, y) : t[b];
      E && (u[b] = D7(E));
    }
  }
  const m = c.current.map((w, C) => Cu(w, u[C])), p = st(Ga), v = uu(p), h = p !== v && F7(p);
  Cl(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: w
    } = s;
    w.length && (s.queue = [], J(w, (C) => C())), J(c.current, (C, b) => {
      i == null || i.add(C), h && C.start({
        default: p
      });
      const y = u[b];
      y && (A7(C, y.ref), C.ref ? C.queue.push(y) : C.start(y));
    });
  }), Hd(() => () => {
    J(s.ctrls, (w) => w.stop(!0));
  });
  const g = m.map((w) => Pe({}, w));
  return i ? [g, i] : g;
}
function Ae(e, t) {
  const n = W.fun(e), [[r], i] = q7(1, n ? e : [e], n ? t || [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
let $u;
(function(e) {
  e.MOUNT = "mount", e.ENTER = "enter", e.UPDATE = "update", e.LEAVE = "leave";
})($u || ($u = {}));
class a1 extends Sl {
  constructor(t, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = t, this.calc = ti(...n);
    const r = this._get(), i = ps(r);
    $l(this, i.create(r));
  }
  advance(t) {
    const n = this._get(), r = this.get();
    It(n, r) || (_t(this).setValue(n), this._onChange(n, this.idle)), !this.idle && xu(this._active) && Mo(this);
  }
  _get() {
    const t = W.arr(this.source) ? this.source.map(Ze) : qe(Ze(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle && !xu(this._active) && (this.idle = !1, J(qa(this), (t) => {
      t.done = !1;
    }), lt.skipAnimation ? (Y.batchedUpdates(() => this.advance()), Mo(this)) : Za.start(this));
  }
  _attach() {
    let t = 1;
    J(qe(this.source), (n) => {
      it(n) && gr(n, this), ys(n) && (n.idle || this._active.add(n), t = Math.max(t, n.priority + 1));
    }), this.priority = t, this._start();
  }
  _detach() {
    J(qe(this.source), (t) => {
      it(t) && ri(t, this);
    }), this._active.clear(), Mo(this);
  }
  eventObserved(t) {
    t.type == "change" ? t.idle ? this.advance() : (this._active.add(t.parent), this._start()) : t.type == "idle" ? this._active.delete(t.parent) : t.type == "priority" && (this.priority = qe(this.source).reduce((n, r) => Math.max(n, (ys(r) ? r.priority : 0) + 1), 0));
  }
}
function K7(e) {
  return e.idle !== !1;
}
function xu(e) {
  return !e.size || Array.from(e).every(K7);
}
function Mo(e) {
  e.idle || (e.idle = !0, J(qa(e), (t) => {
    t.done = !0;
  }), ni(e, {
    type: "idle",
    parent: e
  }));
}
const G7 = (e, ...t) => new a1(e, t);
lt.assign({
  createStringInterpolator: Bd,
  to: (e, t) => new a1(e, t)
});
function Ol(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const Y7 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], o1 = /^--/;
function X7(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !o1.test(e) && !(Kr.hasOwnProperty(e) && Kr[e]) ? t + "px" : ("" + t).trim();
}
const _u = {};
function Q7(e, t) {
  if (!e.nodeType || !e.setAttribute)
    return !1;
  const n = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", r = t, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = Ol(r, Y7), d = Object.values(u), f = Object.keys(u).map((m) => n || e.hasAttribute(m) ? m : _u[m] || (_u[m] = m.replace(/([A-Z])/g, (p) => "-" + p.toLowerCase())));
  a !== void 0 && (e.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const p = X7(m, i[m]);
      o1.test(m) ? e.style.setProperty(m, p) : e.style[m] = p;
    }
  f.forEach((m, p) => {
    e.setAttribute(m, d[p]);
  }), o !== void 0 && (e.scrollTop = o), s !== void 0 && (e.scrollLeft = s), c !== void 0 && e.setAttribute("viewBox", c);
}
let Kr = {
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
const J7 = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), e8 = ["Webkit", "Ms", "Moz", "O"];
Kr = Object.keys(Kr).reduce((e, t) => (e8.forEach((n) => e[J7(n, t)] = e[t]), e), Kr);
const t8 = ["x", "y", "z"], n8 = /^(matrix|translate|scale|rotate|skew)/, r8 = /^(translate)/, i8 = /^(rotate|skew)/, Io = (e, t) => W.num(e) && e !== 0 ? e + t : e, na = (e, t) => W.arr(e) ? e.every((n) => na(n, t)) : W.num(e) ? e === t : parseFloat(e) === t;
class a8 extends Ka {
  constructor(t) {
    let {
      x: n,
      y: r,
      z: i
    } = t, a = Ol(t, t8);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => Io(u, "px")).join(",")})`, na(c, 0)])), Ot(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((d) => [d, d === ""]);
      else if (n8.test(u)) {
        if (delete a[u], W.und(c))
          return;
        const d = r8.test(u) ? "px" : i8.test(u) ? "deg" : "";
        o.push(qe(c)), s.push(u === "rotate3d" ? ([f, m, p, v]) => [`rotate3d(${f},${m},${p},${Io(v, d)})`, na(v, 0)] : (f) => [`${u}(${f.map((m) => Io(m, d)).join(",")})`, na(f, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new o8(o, s)), super(a);
  }
}
class o8 extends Dd {
  constructor(t, n) {
    super(), this._value = null, this.inputs = t, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", n = !0;
    return J(this.inputs, (r, i) => {
      const a = Ze(r[0]), [o, s] = this.transforms[i](W.arr(a) ? a : r.map(Ze));
      t += " " + o, n = n && s;
    }), n ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && J(this.inputs, (n) => J(n, (r) => it(r) && gr(r, this)));
  }
  observerRemoved(t) {
    t == 0 && J(this.inputs, (n) => J(n, (r) => it(r) && ri(r, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), ni(this, t);
  }
}
const s8 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], l8 = ["scrollTop", "scrollLeft"];
lt.assign({
  batchedUpdates: Sm,
  createStringInterpolator: Bd,
  colors: U6
});
const c8 = x7(s8, {
  applyAnimatedValues: Q7,
  createAnimatedStyle: (e) => new a8(e),
  getComponentProps: (e) => Ol(e, l8)
}), ue = c8.animated;
function u8(e) {
  return (typeof e == "function" ? e() : e) || document.body;
}
function br(e, t) {
  if (cr && e) {
    const n = u8(e);
    return Om(t, n);
  }
  return t;
}
function f8(e) {
  const t = D(e);
  return e && (t.current = !0), !!t.current;
}
const wr = (e) => Ya(e.active, e.forceRender, e.destroyOnClose) ? e.children : null;
function Ya(e, t, n) {
  const r = f8(e);
  return t || e ? !0 : r ? !n : !1;
}
const d8 = {
  click: "onClick"
};
function nn(e, t) {
  const n = Object.assign({}, t.props);
  for (const r of e) {
    const i = d8[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = t.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(t, n);
}
const Lo = "adm-mask", m8 = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, h8 = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, p8 = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, v8 = (e) => {
  const t = Z(p8, e), {
    locale: n
  } = he(), r = D(null);
  Ba(r, t.visible && t.disableBodyScroll);
  const i = re(() => {
    var d;
    const f = (d = m8[t.opacity]) !== null && d !== void 0 ? d : t.opacity, m = h8[t.color];
    return m ? `rgba(${m}, ${f})` : t.color;
  }, [t.color, t.opacity]), [a, o] = z(t.visible), s = dl(), {
    opacity: c
  } = Ae({
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
  }), u = nn(t.stopPropagation, B(t, l.createElement(ue.div, {
    className: Lo,
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
    className: `${Lo}-aria-button`,
    role: "button",
    "aria-label": n.Mask.name,
    onClick: t.onMaskClick
  }), l.createElement("div", {
    className: `${Lo}-content`
  }, t.children))));
  return l.createElement(wr, {
    active: a,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, br(t.getContainer, u));
}, Ci = v8;
function s1(e) {
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
function l1(e) {
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
function c1(e) {
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
function u1(e) {
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
function Xa(e) {
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
function $i(e) {
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
function g8(e) {
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
function f1(e) {
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
function d1(e) {
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
function y8(e) {
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
function b8(e) {
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
function w8(e) {
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
function E8(e) {
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
function C8(e) {
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
function $8(e) {
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
function ku(e) {
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
const Fl = {
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
function h1(e) {
  const [t, n] = z(e);
  return $e(() => {
    n(e);
  }, [e]), t;
}
function x8(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const Ce = {
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
function Su(e, t, n) {
  return t === 0 || Math.abs(t) === 1 / 0 ? Math.pow(e, n * 5) : e * t * n / (t + n * e);
}
function Ou(e, t, n, r = 0.15) {
  return r === 0 ? x8(e, t, n) : e < t ? -Su(t - e, n - t, r) + t : e > n ? +Su(e - n, n - t, r) + n : e;
}
function _8(e, [t, n], [r, i]) {
  const [[a, o], [s, c]] = e;
  return [Ou(t, a, o, r), Ou(n, s, c, i)];
}
function Re(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Fu(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Fu(Object(n), !0).forEach(function(r) {
      Re(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Fu(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
const p1 = {
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
function Pu(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : "";
}
const k8 = ["enter", "leave"];
function S8(e = !1, t) {
  return e && !k8.includes(t);
}
function O8(e, t = "", n = !1) {
  const r = p1[e], i = r && r[t] || t;
  return "on" + Pu(e) + Pu(i) + (S8(n, i) ? "Capture" : "");
}
const F8 = ["gotpointercapture", "lostpointercapture"];
function P8(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = F8.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function A8(e, t = "") {
  const n = p1[e], r = n && n[t] || t;
  return e + r;
}
function Qa(e) {
  return "touches" in e;
}
function v1(e) {
  return Qa(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function N8(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function T8(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function g1(e) {
  return Qa(e) ? T8(e)[0] : e;
}
function Cs(e, t) {
  const n = t.clientX - e.clientX, r = t.clientY - e.clientY, i = (t.clientX + e.clientX) / 2, a = (t.clientY + e.clientY) / 2, o = Math.hypot(n, r);
  return {
    angle: -(Math.atan2(n, r) * 180) / Math.PI,
    distance: o,
    origin: [i, a]
  };
}
function R8(e) {
  return N8(e).map((t) => t.identifier);
}
function Au(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Cs(n, r);
}
function Do(e) {
  const t = g1(e);
  return Qa(e) ? t.identifier : t.pointerId;
}
function Nu(e) {
  const t = g1(e);
  return [t.clientX, t.clientY];
}
const Tu = 40, Ru = 800;
function y1(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= Tu, n *= Tu) : r === 2 && (t *= Ru, n *= Ru), [t, n];
}
function M8(e) {
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
function ba(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
function I8() {
}
function L8(...e) {
  return e.length === 0 ? I8 : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function Mu(e, t) {
  return Object.assign({}, t, e || {});
}
const D8 = 32;
class b1 {
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
    n._active || (this.reset(), this.computeInitial(), n._active = !0, n.target = t.target, n.currentTarget = t.currentTarget, n.lastOffset = r.from ? ba(r.from, n) : n.offset, n.offset = n.lastOffset), n.startTime = n.timeStamp = t.timeStamp;
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
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, M8(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const $ = n._delta.map(Math.abs);
      Ce.addTo(n._distance, $);
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
      const [$, k] = f;
      m[0] = d[0] !== !1 ? $ - d[0] : 0, m[1] = d[1] !== !1 ? k - d[1] : 0;
    } else
      m[0] = d[0] !== !1 ? o - d[0] : 0, m[1] = d[1] !== !1 ? s - d[1] : 0;
    this.restrictToAxis && !n._blocked && this.restrictToAxis(m);
    const p = n.offset, v = n._active && !n._blocked || n.active;
    v && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = ba(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [h, g] = n.offset, [[w, C], [b, y]] = n._bounds;
    n.overflow = [h < w ? -1 : h > C ? 1 : 0, g < b ? -1 : g > y ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = _8(n._bounds, n.offset, E), n.delta = Ce.sub(n.offset, p), this.computeMovement(), v && (!n.last || a > D8)) {
      n.delta = Ce.sub(n.offset, p);
      const $ = n.delta.map(Math.abs);
      Ce.addTo(n.distance, $), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [$[0] / a, $[1] / a]);
    }
  }
  emit() {
    const t = this.state, n = this.shared, r = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !r.triggerAllEvents)
      return;
    const i = this.handler(me(me(me({}, n), t), {}, {
      [this.aliasKey]: t.values
    }));
    i !== void 0 && (t.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function V8([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class w1 extends b1 {
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
    this.state.offset = Ce.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = Ce.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[v1(t)] : r.axisThreshold;
      n.axis = V8(n._movement, i);
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
const j8 = (e) => e, Iu = 0.15, E1 = {
  enabled(e = !0) {
    return e;
  },
  eventOptions(e, t, n) {
    return me(me({}, n.shared.eventOptions), e);
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
        return [Iu, Iu];
      case !1:
        return [0, 0];
      default:
        return Ce.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function")
      return e;
    if (e != null)
      return Ce.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || j8;
  },
  threshold(e) {
    return Ce.toVector(e, 0);
  }
}, B8 = 0, Er = me(me({}, E1), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(e = B8) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (a) => Er.bounds(e(a));
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
}), Bi = 10, Lu = {
  ArrowRight: (e = 1) => [Bi * e, 0],
  ArrowLeft: (e = 1) => [-Bi * e, 0],
  ArrowUp: (e = 1) => [0, -Bi * e],
  ArrowDown: (e = 1) => [0, Bi * e]
};
class W8 extends w1 {
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
      t._bounds = Er.bounds(i);
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
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = Do(t), r._pointerActive = !0, this.computeValues(Nu(t)), this.computeInitial(), n.preventScrollAxis && v1(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
  }
  startPointerDrag(t) {
    const n = this.state;
    n._active = !0, n._preventScroll = !0, n._delayed = !1, this.compute(t), this.emit();
  }
  pointerMove(t) {
    const n = this.state, r = this.config;
    if (!n._pointerActive || n.type === t.type && t.timeStamp === n.timeStamp)
      return;
    const i = Do(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    const a = Nu(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = Ce.sub(a, n._values), this.computeValues(a)), Ce.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
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
    const i = Do(t);
    if (n._pointerId !== void 0 && i !== n._pointerId)
      return;
    this.state._pointerActive = !1, this.setActive(), this.compute(t);
    const [a, o] = n._distance;
    if (n.tap = a <= r.tapsThreshold && o <= r.tapsThreshold, n.tap && r.filterTaps)
      n._force = !0;
    else {
      const [s, c] = n.direction, [u, d] = n.velocity, [f, m] = n.movement, [p, v] = r.swipe.velocity, [h, g] = r.swipe.distance, w = r.swipe.duration;
      n.elapsedTime < w && (Math.abs(u) > p && Math.abs(f) > h && (n.swipe[0] = s), Math.abs(d) > v && Math.abs(m) > g && (n.swipe[1] = c));
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
    this.state._preventScroll = !1, Z8(t);
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
    const n = Lu[t.key];
    if (n) {
      const r = this.state, i = t.shiftKey ? 10 : t.altKey ? 0.1 : 1;
      this.start(t), r._delta = n(i), r._keyboardActive = !0, Ce.addTo(r._movement, r._delta), this.compute(t), this.emit();
    }
  }
  keyUp(t) {
    t.key in Lu && (this.state._keyboardActive = !1, this.setActive(), this.compute(t), this.emit());
  }
  bind(t) {
    const n = this.config.device;
    t(n, "start", this.pointerDown.bind(this)), this.config.pointerCapture && (t(n, "change", this.pointerMove.bind(this)), t(n, "end", this.pointerUp.bind(this)), t(n, "cancel", this.pointerUp.bind(this)), t("lostPointerCapture", "", this.pointerUp.bind(this))), this.config.keys && (t("key", "down", this.keyDown.bind(this)), t("key", "up", this.keyUp.bind(this))), this.config.filterTaps && t("click", "", this.pointerClick.bind(this), {
      capture: !0,
      passive: !1
    });
  }
}
function Z8(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const xi = typeof window < "u" && window.document && window.document.createElement;
function H8() {
  return xi && "ontouchstart" in window;
}
function Du() {
  return H8() || xi && window.navigator.maxTouchPoints > 1;
}
function U8() {
  return xi && "onpointerdown" in window;
}
function z8() {
  return xi && "exitPointerLock" in window.document;
}
function q8() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const at = {
  isBrowser: xi,
  gesture: q8(),
  touch: Du(),
  touchscreen: Du(),
  pointer: U8(),
  pointerLock: z8()
}, K8 = 250, G8 = 180, Y8 = 0.5, X8 = 50, Q8 = 250, Vu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, J8 = me(me({}, Er), {}, {
  device(e, t, {
    pointer: {
      touch: n = !1,
      lock: r = !1,
      mouse: i = !1
    } = {}
  }) {
    return this.pointerLock = r && at.pointerLock, at.touch && n ? "touch" : this.pointerLock ? "mouse" : at.pointer && !i ? "pointer" : at.touch ? "touch" : "mouse";
  },
  preventScrollAxis(e, t, {
    preventScroll: n
  }) {
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? K8 : void 0, !(!at.touchscreen || n === !1))
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
    const a = Ce.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: e = Y8,
    distance: t = X8,
    duration: n = Q8
  } = {}) {
    return {
      velocity: this.transform(Ce.toVector(e)),
      distance: this.transform(Ce.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return G8;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? me(me({}, Vu), e) : Vu;
  }
}), ey = 30, ty = 100;
class ny extends b1 {
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
    t === "wheel" ? this.state.offset = Ce.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * ey - Math.abs(r);
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
    const i = Au(t, n._touchIds);
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
    const a = Cs(...Array.from(r.values()));
    this.pinchStart(t, a);
  }
  pinchStart(t, n) {
    const r = this.state;
    r.origin = n.origin, this.computeValues([n.distance, n.angle]), this.computeInitial(), this.compute(t), this.emit();
  }
  touchMove(t) {
    if (!this.state._active)
      return;
    const n = Au(t, this.state._touchIds);
    this.pinchMove(t, n);
  }
  pointerMove(t) {
    const n = this.state._pointerEvents;
    if (n.has(t.pointerId) && n.set(t.pointerId, t), !this.state._active)
      return;
    const r = Cs(...Array.from(n.values()));
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
    n._movement = [t.scale - 1, t.rotation], n._delta = Ce.sub(n._movement, r), this.compute(t), this.emit();
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
    r._delta = [-y1(t)[1] / ty * r.offset[0], 0], Ce.addTo(r._movement, r._delta), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
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
const ry = me(me({}, E1), {}, {
  device(e, t, {
    shared: n,
    pointer: {
      touch: r = !1
    } = {}
  }) {
    if (n.target && !at.touch && at.gesture)
      return "gesture";
    if (at.touch && r)
      return "touch";
    if (at.touchscreen) {
      if (at.pointer)
        return "pointer";
      if (at.touch)
        return "touch";
    }
  },
  bounds(e, t, {
    scaleBounds: n = {},
    angleBounds: r = {}
  }) {
    const i = (o) => {
      const s = Mu(ba(n, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    }, a = (o) => {
      const s = Mu(ba(r, o), {
        min: -1 / 0,
        max: 1 / 0
      });
      return [s.min, s.max];
    };
    return typeof n != "function" && typeof r != "function" ? [i(), a()] : (o) => [i(o), a(o)];
  },
  threshold(e, t, n) {
    return this.lockDirection = n.axis === "lock", Ce.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  }
});
me(me({}, Er), {}, {
  mouseOnly: (e = !0) => e
});
class iy extends w1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = y1(t), Ce.addTo(n._movement, n._delta);
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
const ay = Er;
me(me({}, Er), {}, {
  mouseOnly: (e = !0) => e
});
const Pl = /* @__PURE__ */ new Map(), $s = /* @__PURE__ */ new Map();
function Al(e) {
  Pl.set(e.key, e.engine), $s.set(e.key, e.resolver);
}
const C1 = {
  key: "drag",
  engine: W8,
  resolver: J8
}, oy = {
  key: "pinch",
  engine: ny,
  resolver: ry
}, sy = {
  key: "wheel",
  engine: iy,
  resolver: ay
};
function ly(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function cy(e, t) {
  if (e == null)
    return {};
  var n = ly(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
const uy = {
  target(e) {
    if (e)
      return () => "current" in e ? e.current : e;
  },
  enabled(e = !0) {
    return e;
  },
  window(e = at.isBrowser ? window : void 0) {
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
}, fy = ["target", "eventOptions", "window", "enabled", "transform"];
function ra(e = {}, t) {
  const n = {};
  for (const [r, i] of Object.entries(t))
    switch (typeof i) {
      case "function":
        n[r] = i.call(n, e[r], r, e);
        break;
      case "object":
        n[r] = ra(e[r], i);
        break;
      case "boolean":
        i && (n[r] = e[r]);
        break;
    }
  return n;
}
function dy(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = cy(r, fy);
  if (n.shared = ra({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, uy), t) {
    const d = $s.get(t);
    n[t] = ra(me({
      shared: n.shared
    }, u), d);
  } else
    for (const d in u) {
      const f = $s.get(d);
      f && (n[d] = ra(me({
        shared: n.shared
      }, u[d]), f));
    }
  return n;
}
class $1 {
  constructor(t, n) {
    Re(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, a) {
    const o = this._listeners, s = A8(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = me(me({}, c), a);
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
class my {
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
class hy {
  constructor(t) {
    Re(this, "gestures", /* @__PURE__ */ new Set()), Re(this, "_targetEventStore", new $1(this)), Re(this, "gestureEventStores", {}), Re(this, "gestureTimeoutStores", {}), Re(this, "handlers", {}), Re(this, "config", {}), Re(this, "pointerIds", /* @__PURE__ */ new Set()), Re(this, "touchIds", /* @__PURE__ */ new Set()), Re(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), py(this, t);
  }
  setEventIds(t) {
    if (Qa(t))
      return this.touchIds = new Set(R8(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = dy(t, n, this.config);
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
          const s = this.config[o], c = ju(r, s.eventOptions, !!i);
          if (s.enabled) {
            const u = Pl.get(o);
            new u(this, t, o).bind(c);
          }
        }
        const a = ju(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](me(me({}, this.state.shared), {}, {
            event: s,
            args: t
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = L8(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = P8(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Dn(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new $1(e, t), e.gestureTimeoutStores[t] = new my();
}
function py(e, t) {
  t.drag && Dn(e, "drag"), t.wheel && Dn(e, "wheel"), t.scroll && Dn(e, "scroll"), t.move && Dn(e, "move"), t.pinch && Dn(e, "pinch"), t.hover && Dn(e, "hover");
}
const ju = (e, t, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const d = (c = o.capture) !== null && c !== void 0 ? c : t.capture, f = (u = o.passive) !== null && u !== void 0 ? u : t.passive;
  let m = s ? r : O8(r, i, d);
  n && f && (m += "Passive"), e[m] = e[m] || [], e[m].push(a);
}, vy = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function gy(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    vy.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function Vn(e, t, n, r, i, a) {
  if (!e.has(n) || !Pl.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let d;
    return u.first && o in t && t[o](u), n in t && (d = t[n](u)), u.last && s in t && t[s](u), d;
  };
  i[r] = c, a[r] = a[r] || {};
}
function yy(e, t) {
  const [n, r, i] = gy(e), a = {};
  return Vn(i, n, "onDrag", "drag", a, t), Vn(i, n, "onWheel", "wheel", a, t), Vn(i, n, "onScroll", "scroll", a, t), Vn(i, n, "onPinch", "pinch", a, t), Vn(i, n, "onMove", "move", a, t), Vn(i, n, "onHover", "hover", a, t), {
    handlers: a,
    config: t,
    nativeHandlers: r
  };
}
function Nl(e, t = {}, n, r) {
  const i = l.useMemo(() => new hy(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function Pt(e, t) {
  return Al(C1), Nl({
    drag: e
  }, t || {}, "drag");
}
function by(e, t) {
  return Al(sy), Nl({
    wheel: e
  }, t || {}, "wheel");
}
function wy(e) {
  return e.forEach(Al), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = yy(n, r || {});
    return Nl(i, o, void 0, a);
  };
}
const Wi = "adm-popup", Ey = Object.assign(Object.assign({}, Fl), {
  position: "bottom"
}), Cy = (e) => {
  const t = Z(Ey, e), {
    locale: n
  } = he(), r = V(`${Wi}-body`, t.bodyClassName, `${Wi}-body-position-${t.position}`), [i, a] = z(t.visible);
  $e(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = D(null);
  Ba(o, t.disableBodyScroll && i ? "strict" : !1);
  const s = dl(), {
    percent: c
  } = Ae({
    percent: t.visible ? 0 : 100,
    config: {
      precision: 0.1,
      mass: 0.4,
      tension: 300,
      friction: 30
    },
    onRest: () => {
      var m, p;
      s.current || (a(t.visible), t.visible ? (m = t.afterShow) === null || m === void 0 || m.call(t) : (p = t.afterClose) === null || p === void 0 || p.call(t));
    }
  }), u = Pt(({
    swipe: [, m]
  }) => {
    var p;
    (m === 1 && t.position === "bottom" || m === -1 && t.position === "top") && ((p = t.onClose) === null || p === void 0 || p.call(t));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(t.position)
  }), d = h1(i && t.visible), f = nn(t.stopPropagation, B(t, l.createElement("div", Object.assign({
    className: Wi,
    onClick: t.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(t.position) ? "none" : "auto"
    }
  }, u()), t.mask && l.createElement(Ci, {
    visible: d,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (m) => {
      var p, v;
      (p = t.onMaskClick) === null || p === void 0 || p.call(t, m), t.closeOnMaskClick && ((v = t.onClose) === null || v === void 0 || v.call(t));
    },
    className: t.maskClassName,
    style: t.maskStyle,
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement(ue.div, {
    className: r,
    style: Object.assign(Object.assign({}, t.bodyStyle), {
      transform: c.to((m) => t.position === "bottom" ? `translate(0, ${m}%)` : t.position === "top" ? `translate(0, -${m}%)` : t.position === "left" ? `translate(-${m}%, 0)` : t.position === "right" ? `translate(${m}%, 0)` : "none")
    }),
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: V(`${Wi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = t.onClose) === null || m === void 0 || m.call(t);
    },
    role: "button",
    "aria-label": n.common.close
  }, l.createElement($i, null)), t.children))));
  return l.createElement(wr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, br(t.getContainer, f));
}, _i = Cy;
const Bu = "adm-safe-area", $y = (e) => B(e, l.createElement("div", {
  className: V(Bu, `${Bu}-position-${e.position}`)
})), Cr = $y, wa = Object.assign({}, km), {
  version: xy,
  render: _y,
  unmountComponentAtNode: ky
} = wa;
let Ja;
try {
  Number((xy || "").split(".")[0]) >= 18 && wa.createRoot && (Ja = wa.createRoot);
} catch {
}
function Wu(e) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: t
  } = wa;
  t && typeof t == "object" && (t.usingClientEntryPoint = e);
}
const Ea = "__antd_mobile_root__";
function Sy(e, t) {
  _y(e, t);
}
function Oy(e, t) {
  Wu(!0);
  const n = t[Ea] || Ja(t);
  Wu(!1), n.render(e), t[Ea] = n;
}
function Fy(e, t) {
  if (Ja) {
    Oy(e, t);
    return;
  }
  Sy(e, t);
}
function Py(e) {
  return ky(e);
}
function Ay(e) {
  return Ee(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var t;
      (t = e[Ea]) === null || t === void 0 || t.unmount(), delete e[Ea];
    });
  });
}
function Ny(e) {
  return Ja ? Ay(e) : Py(e);
}
function ki(e) {
  const t = document.createElement("div");
  document.body.appendChild(t);
  function n() {
    Ny(t) && t.parentNode && t.parentNode.removeChild(t);
  }
  return Fy(e, t), n;
}
function $r(e) {
  const t = l.forwardRef((i, a) => {
    const [o, s] = z(!1), c = D(!1), [u, d] = z(e), f = D(0);
    K(() => {
      c.current ? p() : s(!0);
    }, []);
    function m() {
      var v, h;
      c.current = !0, s(!1), (h = (v = u.props).onClose) === null || h === void 0 || h.call(v);
    }
    function p() {
      var v, h;
      r(), (h = (v = u.props).afterClose) === null || h === void 0 || h.call(v);
    }
    return pe(a, () => ({
      close: m,
      replace: (v) => {
        var h, g;
        f.current++, (g = (h = u.props).afterClose) === null || g === void 0 || g.call(h), d(v);
      }
    })), l.cloneElement(u, Object.assign(Object.assign({}, u.props), {
      key: f.current,
      visible: o,
      onClose: m,
      afterClose: p
    }));
  }), n = l.createRef(), r = ki(l.createElement(t, {
    ref: n
  }));
  return {
    close: () => Ee(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const Le = "adm-action-sheet", Ty = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, x1 = (e) => {
  const t = Z(Ty, e);
  return l.createElement(_i, {
    visible: t.visible,
    onMaskClick: () => {
      var n, r;
      (n = t.onMaskClick) === null || n === void 0 || n.call(t), t.closeOnMaskClick && ((r = t.onClose) === null || r === void 0 || r.call(t));
    },
    afterClose: t.afterClose,
    className: V(`${Le}-popup`, t.popupClassName),
    style: t.popupStyle,
    getContainer: t.getContainer,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, B(t, l.createElement("div", {
    className: Le
  }, t.extra && l.createElement("div", {
    className: `${Le}-extra`
  }, t.extra), l.createElement("div", {
    className: `${Le}-button-list`
  }, t.actions.map((n, r) => l.createElement("div", {
    key: n.key,
    className: `${Le}-button-item-wrapper`
  }, l.createElement("a", {
    className: V("adm-plain-anchor", `${Le}-button-item`, {
      [`${Le}-button-item-danger`]: n.danger,
      [`${Le}-button-item-disabled`]: n.disabled,
      [`${Le}-button-item-bold`]: n.bold
    }),
    onClick: () => {
      var i, a, o;
      (i = n.onClick) === null || i === void 0 || i.call(n), (a = t.onAction) === null || a === void 0 || a.call(t, n, r), t.closeOnAction && ((o = t.onClose) === null || o === void 0 || o.call(t));
    },
    role: "option",
    "aria-disabled": n.disabled
  }, l.createElement("div", {
    className: `${Le}-button-item-name`
  }, n.text), n.description && l.createElement("div", {
    className: `${Le}-button-item-description`
  }, n.description))))), t.cancelText && l.createElement("div", {
    className: `${Le}-cancel`,
    role: "option",
    "aria-label": t.cancelText
  }, l.createElement("div", {
    className: `${Le}-button-item-wrapper`
  }, l.createElement("a", {
    className: V("adm-plain-anchor", `${Le}-button-item`),
    onClick: () => {
      var n;
      (n = t.onClose) === null || n === void 0 || n.call(t);
    }
  }, l.createElement("div", {
    className: `${Le}-button-item-name`
  }, t.cancelText)))), t.safeArea && l.createElement(Cr, {
    position: "bottom"
  }))));
};
function Ry(e) {
  return $r(l.createElement(x1, Object.assign({}, e)));
}
const yk = ie(x1, {
  show: Ry
});
const Zu = "adm-auto-center", My = (e) => B(e, l.createElement("div", {
  className: Zu
}, l.createElement("div", {
  className: `${Zu}-content`
}, e.children))), li = My;
var Tl = {}, Iy = kt && kt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Tl, "__esModule", { value: !0 });
var Rl = Tl.staged = void 0;
const Ly = Iy(l);
function _1(e) {
  return typeof e == "function" ? Ly.default.createElement(Dy, { stage: e }) : e;
}
function Dy(e) {
  const t = e.stage();
  return _1(t);
}
function Vy(e) {
  return function(n, r) {
    const i = e(n, r);
    return _1(i);
  };
}
Rl = Tl.staged = Vy;
function xn(e) {
  return typeof e == "number" ? `${e}px` : e;
}
const jy = (e) => {
  const t = D(null), [n] = z5(t);
  return K(() => {
    n && e.onActive();
  }, [n]), l.createElement("div", {
    ref: t
  });
}, Si = fd($e), By = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Wy = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Ca = "adm-image", Zy = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Ca}-tip`
  }, l.createElement(By, null)),
  fallback: l.createElement("div", {
    className: `${Ca}-tip`
  }, l.createElement(Wy, null)),
  lazy: !1,
  draggable: !1
}, Hy = Rl((e) => {
  const t = Z(Zy, e), [n, r] = z(!1), [i, a] = z(!1), o = D(null), s = D(null);
  let c = t.src, u = t.srcSet;
  const [d, f] = z(!t.lazy);
  c = d ? t.src : void 0, u = d ? t.srcSet : void 0, Si(() => {
    r(!1), a(!1);
  }, [c]), K(() => {
    var v;
    !((v = s.current) === null || v === void 0) && v.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, t.fallback);
    const v = l.createElement("img", {
      ref: s,
      className: `${Ca}-img`,
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
    return l.createElement(l.Fragment, null, !n && t.placeholder, v);
  }
  const p = {};
  return t.width && (p["--width"] = xn(t.width), p.width = xn(t.width)), t.height && (p["--height"] = xn(t.height), p.height = xn(t.height)), B(t, l.createElement("div", {
    ref: o,
    className: Ca,
    style: p,
    onClick: t.onContainerClick
  }, t.lazy && !d && l.createElement(jy, {
    onActive: () => {
      f(!0);
    }
  }), m()));
}), eo = Hy, Uy = Ve(() => l.createElement("svg", {
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
})))))), zy = "adm-avatar", qy = {
  fallback: l.createElement(Uy, null),
  fit: "cover"
}, Ky = (e) => {
  const t = Z(qy, e);
  return B(t, l.createElement(eo, {
    className: zy,
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
}, bk = Ky;
const jn = "adm-badge", k1 = l.createElement(l.Fragment, null), Gy = (e) => {
  const {
    content: t,
    color: n,
    children: r
  } = e, i = t === k1, a = V(jn, !!r && `${jn}-fixed`, i && `${jn}-dot`, e.bordered && `${jn}-bordered`), o = t || t === 0 ? B(e, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${jn}-content`
  }, t))) : null;
  return r ? l.createElement("div", {
    className: V(`${jn}-wrapper`, e.wrapperClassName),
    style: e.wrapperStyle
  }, r, o) : o;
}, xs = ie(Gy, {
  dot: k1
});
const Yy = "adm-dot-loading", Xy = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, Qy = {
  color: "default"
}, S1 = Ve((e) => {
  var t;
  const n = Z(Qy, e);
  return B(n, l.createElement("div", {
    style: {
      color: (t = Xy[n.color]) !== null && t !== void 0 ? t : n.color
    },
    className: V("adm-loading", Yy)
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
}), O1 = S1;
function F1(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
function Jy() {
  return cr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const et = "adm-button", e9 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(O1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, t9 = de((e, t) => {
  const n = Z(e9, e), [r, i] = z(!1), a = D(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  pe(t, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => Ee(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const d = n.onClick(u);
    if (F1(d))
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
    className: V(et, n.color ? `${et}-${n.color}` : null, {
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
}), rn = t9;
const Hu = () => l.createElement("svg", {
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
})))))), Uu = () => l.createElement("svg", {
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
var P1 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(kt, function() {
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
        var d, f, m, p, v = o(this), h = (d = this.isoWeekYear(), f = this.$u, m = (f ? a.utc : a)().year(d).startOf("year"), p = 4 - m.isoWeekday(), m.isoWeekday() > 4 && (p += 7), m.add(p, n));
        return v.diff(h, "week") + 1;
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
})(P1);
const Ml = P1.exports;
function te(e) {
  const {
    value: t,
    defaultValue: n,
    onChange: r
  } = e, i = md(), a = D(t !== void 0 ? t : n);
  t !== void 0 && (a.current = t);
  const o = Wt((s, c = !1) => {
    const u = typeof s == "function" ? s(a.current) : s;
    if (!(!c && u === a.current))
      return a.current = u, i(), r == null ? void 0 : r(u);
  });
  return [a.current, o];
}
function zu(e, t) {
  return e === void 0 || t === null ? null : Array.isArray(t) ? t : [t, t];
}
function Vo(e) {
  return xe().year(e.year).month(e.month - 1).date(1);
}
xe.extend(Ml);
const ce = "adm-calendar", n9 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Hu, null),
  prevYearButton: l.createElement(Uu, null),
  nextMonthButton: l.createElement(Hu, null),
  nextYearButton: l.createElement(Uu, null)
}, r9 = de((e, t) => {
  const n = xe(), r = Z(n9, e), {
    locale: i
  } = he(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const b = a.pop();
    b && a.unshift(b);
  }
  const [o, s] = te({
    value: r.value === void 0 ? void 0 : zu(r.selectionMode, r.value),
    defaultValue: zu(r.selectionMode, r.defaultValue),
    onChange: (b) => {
      var y, E;
      r.selectionMode === "single" ? (y = r.onChange) === null || y === void 0 || y.call(r, b ? b[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, b));
    }
  }), [c, u] = z(!1), [d, f] = z(() => xe(o ? o[0] : n).date(1));
  sl(() => {
    var b;
    (b = r.onPageChange) === null || b === void 0 || b.call(r, d.year(), d.month() + 1);
  }, [d]), pe(t, () => ({
    jumpTo: (b) => {
      let y;
      typeof b == "function" ? y = b({
        year: d.year(),
        month: d.month() + 1
      }) : y = b, f(Vo(y));
    },
    jumpToToday: () => {
      f(xe().date(1));
    }
  }));
  const m = (b, y, E) => {
    const $ = d[b](y, E);
    if (b === "subtract" && r.minPage) {
      const k = Vo(r.minPage);
      if ($.isBefore(k, E))
        return;
    }
    if (b === "add" && r.maxPage) {
      const k = Vo(r.maxPage);
      if ($.isAfter(k, E))
        return;
    }
    f($);
  }, p = l.createElement("div", {
    className: `${ce}-header`
  }, l.createElement("a", {
    className: `${ce}-arrow-button ${ce}-arrow-button-year`,
    onClick: () => {
      m("subtract", 1, "year");
    }
  }, r.prevYearButton), l.createElement("a", {
    className: `${ce}-arrow-button ${ce}-arrow-button-month`,
    onClick: () => {
      m("subtract", 1, "month");
    }
  }, r.prevMonthButton), l.createElement("div", {
    className: `${ce}-title`
  }, i.Calendar.renderYearAndMonth(d.year(), d.month() + 1)), l.createElement("a", {
    className: V(`${ce}-arrow-button`, `${ce}-arrow-button-right`, `${ce}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), l.createElement("a", {
    className: V(`${ce}-arrow-button`, `${ce}-arrow-button-right`, `${ce}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), v = re(() => r.max && xe(r.max), [r.max]), h = re(() => r.min && xe(r.min), [r.min]);
  function g() {
    var b;
    const y = [];
    let E = d.subtract(d.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); y.length < 6 * 7; ) {
      const $ = E;
      let k = !1, N = !1, A = !1, P = !1, T = !1;
      if (o) {
        const [x, F] = o;
        N = $.isSame(x, "day"), A = $.isSame(F, "day"), k = N || A || $.isAfter(x, "day") && $.isBefore(F, "day"), k && (P = (y.length % 7 === 0 || $.isSame($.startOf("month"), "day")) && !N, T = (y.length % 7 === 6 || $.isSame($.endOf("month"), "day")) && !A);
      }
      const S = $.month() === d.month(), _ = r.shouldDisableDate ? r.shouldDisableDate($.toDate()) : v && $.isAfter(v, "day") || h && $.isBefore(h, "day");
      y.push(l.createElement("div", {
        key: $.valueOf(),
        className: V(`${ce}-cell`, (_ || !S) && `${ce}-cell-disabled`, S && {
          [`${ce}-cell-today`]: $.isSame(n, "day"),
          [`${ce}-cell-selected`]: k,
          [`${ce}-cell-selected-begin`]: N,
          [`${ce}-cell-selected-end`]: A,
          [`${ce}-cell-selected-row-begin`]: P,
          [`${ce}-cell-selected-row-end`]: T
        }),
        onClick: () => {
          if (!r.selectionMode || _)
            return;
          const x = $.toDate();
          S || f($.clone().date(1));
          function F() {
            if (!r.allowClear || !o)
              return !1;
            const [M, O] = o;
            return $.isSame(M, "date") && $.isSame(O, "day");
          }
          if (r.selectionMode === "single") {
            if (r.allowClear && F()) {
              s(null);
              return;
            }
            s([x, x]);
          } else if (r.selectionMode === "range") {
            if (!o) {
              s([x, x]), u(!0);
              return;
            }
            if (F()) {
              s(null), u(!1);
              return;
            }
            if (c) {
              const M = o[0];
              s(M > x ? [x, M] : [M, x]), u(!1);
            } else
              s([x, x]), u(!0);
          }
        }
      }, l.createElement("div", {
        className: `${ce}-cell-top`
      }, r.renderDate ? r.renderDate($.toDate()) : $.date()), l.createElement("div", {
        className: `${ce}-cell-bottom`
      }, (b = r.renderLabel) === null || b === void 0 ? void 0 : b.call(r, $.toDate())))), E = E.add(1, "day");
    }
    return y;
  }
  const w = l.createElement("div", {
    className: `${ce}-cells`
  }, g()), C = l.createElement("div", {
    className: `${ce}-mark`
  }, a.map((b, y) => l.createElement("div", {
    key: y,
    className: `${ce}-mark-cell`
  }, b)));
  return B(r, l.createElement("div", {
    className: ce
  }, p, C, w));
}), wk = r9;
function Oi(e, t) {
  const n = Wt(e);
  $e(() => {
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
function Il(e, t, n) {
  const r = Wt(e);
  K(() => {
    const i = new MutationObserver(() => {
      r();
    });
    if (!!t.current)
      return i.observe(t.current, n), () => {
        i.disconnect();
      };
  }, [t]);
}
function _e(e, t, n) {
  let r = e;
  return t !== void 0 && (r = Math.max(e, t)), n !== void 0 && (r = Math.min(r, n)), r;
}
const A1 = (e, t) => {
  const [{
    scrollLeft: n
  }, r] = Ae(() => ({
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
    const c = o.children.item(t).children.item(0), u = c.offsetLeft, d = c.offsetWidth, f = o.offsetWidth, m = o.scrollWidth, p = o.scrollLeft;
    if (m - f <= 0)
      return;
    const h = _e(u - (f - d) / 2, 0, m - f);
    r.start({
      scrollLeft: h,
      from: {
        scrollLeft: p
      },
      immediate: a && !n.isAnimating
    });
  }
  return $e(() => {
    i(!0);
  }, []), Si(() => {
    i();
  }, [t]), Il(() => {
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
const Zi = "adm-scroll-mask", i9 = (e) => {
  const t = D(null), [{
    leftMaskOpacity: n,
    rightMaskOpacity: r
  }, i] = Ae(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  })), {
    run: a
  } = ja((o = !1) => {
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
  return K(() => {
    a(!0);
  }, []), K(() => {
    const o = e.scrollTrackRef.current;
    if (!!o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), l.createElement(l.Fragment, null, l.createElement(ue.div, {
    ref: t,
    className: V(Zi, `${Zi}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(ue.div, {
    className: V(Zi, `${Zi}-right`),
    style: {
      opacity: r
    }
  }));
}, N1 = i9;
var $a = { exports: {} }, ae = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ll = Symbol.for("react.element"), Dl = Symbol.for("react.portal"), to = Symbol.for("react.fragment"), no = Symbol.for("react.strict_mode"), ro = Symbol.for("react.profiler"), io = Symbol.for("react.provider"), ao = Symbol.for("react.context"), a9 = Symbol.for("react.server_context"), oo = Symbol.for("react.forward_ref"), so = Symbol.for("react.suspense"), lo = Symbol.for("react.suspense_list"), co = Symbol.for("react.memo"), uo = Symbol.for("react.lazy"), o9 = Symbol.for("react.offscreen"), T1;
T1 = Symbol.for("react.module.reference");
function ct(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ll:
        switch (e = e.type, e) {
          case to:
          case ro:
          case no:
          case so:
          case lo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case a9:
              case ao:
              case oo:
              case uo:
              case co:
              case io:
                return e;
              default:
                return t;
            }
        }
      case Dl:
        return t;
    }
  }
}
ae.ContextConsumer = ao;
ae.ContextProvider = io;
ae.Element = Ll;
ae.ForwardRef = oo;
ae.Fragment = to;
ae.Lazy = uo;
ae.Memo = co;
ae.Portal = Dl;
ae.Profiler = ro;
ae.StrictMode = no;
ae.Suspense = so;
ae.SuspenseList = lo;
ae.isAsyncMode = function() {
  return !1;
};
ae.isConcurrentMode = function() {
  return !1;
};
ae.isContextConsumer = function(e) {
  return ct(e) === ao;
};
ae.isContextProvider = function(e) {
  return ct(e) === io;
};
ae.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ll;
};
ae.isForwardRef = function(e) {
  return ct(e) === oo;
};
ae.isFragment = function(e) {
  return ct(e) === to;
};
ae.isLazy = function(e) {
  return ct(e) === uo;
};
ae.isMemo = function(e) {
  return ct(e) === co;
};
ae.isPortal = function(e) {
  return ct(e) === Dl;
};
ae.isProfiler = function(e) {
  return ct(e) === ro;
};
ae.isStrictMode = function(e) {
  return ct(e) === no;
};
ae.isSuspense = function(e) {
  return ct(e) === so;
};
ae.isSuspenseList = function(e) {
  return ct(e) === lo;
};
ae.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === to || e === ro || e === no || e === so || e === lo || e === o9 || typeof e == "object" && e !== null && (e.$$typeof === uo || e.$$typeof === co || e.$$typeof === io || e.$$typeof === ao || e.$$typeof === oo || e.$$typeof === T1 || e.getModuleId !== void 0);
};
ae.typeOf = ct;
(function(e) {
  e.exports = ae;
})($a);
function sn(e, t) {
  let n = 0;
  function r(i) {
    l.Children.forEach(i, (a) => {
      $a.exports.isFragment(a) ? r(a.props.children) : (t(a, n), n += 1);
    });
  }
  r(e);
}
const Ht = "adm-capsule-tabs", s9 = () => null, l9 = (e) => {
  var t;
  const n = D(null), r = D(null), i = {};
  let a = null;
  const o = [];
  sn(e.children, (f, m) => {
    if (!l.isValidElement(f))
      return;
    const p = f.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const v = o.push(f);
    i[p] = v - 1;
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
  } = A1(n, i[s]);
  return Oi(() => {
    d(!0);
  }, r), B(e, l.createElement("div", {
    className: Ht,
    ref: r
  }, l.createElement("div", {
    className: `${Ht}-header`
  }, l.createElement(N1, {
    scrollTrackRef: n
  }), l.createElement(ue.div, {
    className: `${Ht}-tab-list`,
    ref: n,
    scrollLeft: u
  }, o.map((f) => B(f.props, l.createElement("div", {
    key: f.key,
    className: `${Ht}-tab-wrapper`
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: m
      } = f;
      f.props.disabled || m != null && c(m.toString());
    },
    className: V(`${Ht}-tab`, {
      [`${Ht}-tab-active`]: f.key === s,
      [`${Ht}-tab-disabled`]: f.props.disabled
    })
  }, f.props.title)))))), o.map((f) => {
    if (f.props.children === void 0)
      return null;
    const m = f.key === s;
    return l.createElement(wr, {
      key: f.key,
      active: m,
      forceRender: f.props.forceRender,
      destroyOnClose: f.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Ht}-content`,
      style: {
        display: m ? "block" : "none"
      }
    }, f.props.children));
  })));
}, Ek = ie(l9, {
  Tab: s9
});
const Hi = "adm-card", c9 = (e) => {
  const t = () => e.title || e.extra ? l.createElement("div", {
    className: V(`${Hi}-header`, e.headerClassName),
    style: e.headerStyle,
    onClick: e.onHeaderClick
  }, l.createElement("div", {
    className: `${Hi}-header-title`
  }, e.title), e.extra) : null, n = () => e.children ? l.createElement("div", {
    className: V(`${Hi}-body`, e.bodyClassName),
    style: e.bodyStyle,
    onClick: e.onBodyClick
  }, e.children) : null;
  return B(e, l.createElement("div", {
    className: Hi,
    onClick: e.onClick
  }, t(), n()));
}, Ck = c9;
function qu(e, t, n) {
  return e * t * n / (t + n * e);
}
function xa(e, t, n, r, i = 0.15) {
  return i === 0 ? _e(e, t, n) : e < t ? -qu(t - e, r, i) + t : e > n ? +qu(e - n, r, i) + n : e;
}
const fo = !1;
function Ie(e, t) {
  fo && console.warn(`[antd-mobile: ${e}] ${t}`);
}
function u9(e, t) {
  fo && console.error(`[antd-mobile: ${e}] ${t}`);
}
function R1(e) {
  if (e == null || e === "")
    return 0;
  const t = e.trim();
  return t.endsWith("px") ? parseFloat(t) : t.endsWith("rem") ? parseFloat(t) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : t.endsWith("vw") ? parseFloat(t) * window.innerWidth / 100 : 0;
}
const Nr = "adm-picker-view", M1 = Ve((e) => {
  const {
    value: t,
    column: n,
    renderLabel: r
  } = e;
  function i(h) {
    e.onSelect(h, e.index);
  }
  const [{
    y: a
  }, o] = Ae(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), s = D(!1), c = D(null), u = D(null), d = D(34);
  $e(() => {
    const h = u.current;
    !h || (d.current = R1(window.getComputedStyle(h).getPropertyValue("height")));
  }), $e(() => {
    if (s.current || t === null)
      return;
    const h = n.findIndex((w) => w.value === t);
    if (h < 0)
      return;
    const g = h * -d.current;
    o.start({
      y: g,
      immediate: a.goal !== g
    });
  }, [t, n]), $e(() => {
    if (n.length === 0)
      t !== null && i(null);
    else if (!n.some((h) => h.value === t)) {
      const h = n[0];
      i(h.value);
    }
  }, [n, t]);
  function f(h) {
    const g = h * -d.current;
    o.start({
      y: g
    });
    const w = n[h];
    !w || i(w.value);
  }
  const m = (h) => {
    s.current = !0;
    const g = -((n.length - 1) * d.current), w = 0;
    if (h.last) {
      s.current = !1;
      const C = h.offset[1] + h.velocity[1] * h.direction[1] * 50, b = g < w ? -Math.round(_e(C, g, w) / d.current) : 0;
      f(b);
    } else {
      const C = h.offset[1];
      o.start({
        y: xa(C, g, w, d.current * 50, 0.2)
      });
    }
  };
  Pt((h) => {
    h.event.stopPropagation(), m(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), by((h) => {
    h.event.stopPropagation(), m(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    target: e.mouseWheel ? c : void 0,
    eventOptions: bi ? {
      passive: !1
    } : !1
  });
  let p = null;
  function v() {
    if (p === null)
      return null;
    const h = n[p], g = p - 1, w = p + 1, C = n[g], b = n[w];
    return l.createElement("div", {
      className: "adm-picker-view-column-accessible"
    }, l.createElement("div", {
      className: "adm-picker-view-column-accessible-current",
      role: "button",
      "aria-label": h ? `\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A${h.label}` : "\u5F53\u524D\u672A\u9009\u62E9"
    }, "-"), l.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        !C || f(g);
      },
      role: C ? "button" : "text",
      "aria-label": C ? `\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A${C.label}` : "\u6CA1\u6709\u4E0A\u4E00\u9879"
    }, "-"), l.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        !b || f(w);
      },
      role: b ? "button" : "text",
      "aria-label": b ? `\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A${b.label}` : "\u6CA1\u6709\u4E0B\u4E00\u9879"
    }, "-"));
  }
  return l.createElement("div", {
    className: `${Nr}-column`
  }, l.createElement("div", {
    className: `${Nr}-item-height-measure`,
    ref: u
  }), l.createElement(ue.div, {
    ref: c,
    style: {
      translateY: a
    },
    className: `${Nr}-column-wheel`,
    "aria-hidden": !0
  }, n.map((h, g) => {
    var w;
    const C = e.value === h.value;
    C && (p = g);
    function b() {
      s.current = !1, f(g);
    }
    return l.createElement("div", {
      key: (w = h.key) !== null && w !== void 0 ? w : h.value,
      "data-selected": h.value === t,
      className: `${Nr}-column-item`,
      onClick: b,
      "aria-hidden": !C,
      "aria-label": C ? "active" : ""
    }, l.createElement("div", {
      className: `${Nr}-column-item-label`
    }, r(h)));
  })), v());
}, (e, t) => !(e.index !== t.index || e.value !== t.value || e.onSelect !== t.onSelect || e.renderLabel !== t.renderLabel || e.mouseWheel !== t.mouseWheel || !U5(e.column, t.column)));
M1.displayName = "Wheel";
function Ku(e) {
  let t = null;
  return () => (t === null && (t = e()), t);
}
function I1(e, t) {
  const n = Ku(() => (typeof e == "function" ? e(t) : e).map((o) => o.map((s) => typeof s == "string" ? {
    label: s,
    value: s
  } : s))), r = Ku(() => t.map((a, o) => {
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
function L1(e, t) {
  return re(() => I1(e, t), [e, t]);
}
const D1 = (e) => e.label;
var V1 = { exports: {} }, j1 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ar = l;
function f9(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var d9 = typeof Object.is == "function" ? Object.is : f9, m9 = ar.useState, h9 = ar.useEffect, p9 = ar.useLayoutEffect, v9 = ar.useDebugValue;
function g9(e, t) {
  var n = t(), r = m9({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, a = r[1];
  return p9(function() {
    i.value = n, i.getSnapshot = t, jo(i) && a({ inst: i });
  }, [e, n, t]), h9(function() {
    return jo(i) && a({ inst: i }), e(function() {
      jo(i) && a({ inst: i });
    });
  }, [e]), v9(n), n;
}
function jo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !d9(e, n);
  } catch {
    return !0;
  }
}
function y9(e, t) {
  return t();
}
var b9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? y9 : g9;
j1.useSyncExternalStore = ar.useSyncExternalStore !== void 0 ? ar.useSyncExternalStore : b9;
(function(e) {
  e.exports = j1;
})(V1);
let Vl = !1;
const _s = /* @__PURE__ */ new Set();
function B1() {
  _s.forEach((e) => {
    e();
  });
}
function $k() {
  Vl = !0, B1(), lt.assign({
    skipAnimation: !0
  });
}
function xk() {
  Vl = !1, B1(), lt.assign({
    skipAnimation: !1
  });
}
function w9() {
  return Vl;
}
function E9(e) {
  return _s.add(e), () => {
    _s.delete(e);
  };
}
function C9() {
  return V1.exports.useSyncExternalStore(E9, w9);
}
const Bo = "adm-spin-loading", $9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, x9 = {
  color: "default"
}, _9 = 15 * 3.14159265358979 * 2, k9 = Ve((e) => {
  var t;
  const n = Z(x9, e), r = C9(), {
    percent: i
  } = Ae({
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
  return B(n, l.createElement(ue.div, {
    className: Bo,
    style: {
      "--color": (t = $9[n.color]) !== null && t !== void 0 ? t : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${Bo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(ue.circle, {
    className: `${Bo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: _9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), jl = k9, Yn = "adm-picker-view", S9 = {
  defaultValue: [],
  renderLabel: D1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${Yn}-loading-content`
  }, l.createElement(jl, null))
}, W1 = Ve((e) => {
  const t = Z(S9, e), [n, r] = z(t.value === void 0 ? t.defaultValue : t.value);
  K(() => {
    t.value !== void 0 && t.value !== n && r(t.value);
  }, [t.value]), K(() => {
    if (t.value === n)
      return;
    const s = window.setTimeout(() => {
      t.value !== void 0 && t.value !== n && r(t.value);
    }, 1e3);
    return () => {
      window.clearTimeout(s);
    };
  }, [t.value, n]);
  const i = L1(t.columns, n), a = i.columns;
  n3(() => {
    var s;
    t.value !== n && ((s = t.onChange) === null || s === void 0 || s.call(t, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = Xe((s, c) => {
    r((u) => {
      const d = [...u];
      return d[c] = s, d;
    });
  }, []);
  return B(t, l.createElement("div", {
    className: `${Yn}`
  }, t.loading ? t.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(M1, {
    key: c,
    index: c,
    column: s,
    value: n[c],
    onSelect: o,
    renderLabel: t.renderLabel,
    mouseWheel: t.mouseWheel
  })), l.createElement("div", {
    className: `${Yn}-mask`
  }, l.createElement("div", {
    className: `${Yn}-mask-top`
  }), l.createElement("div", {
    className: `${Yn}-mask-middle`
  }), l.createElement("div", {
    className: `${Yn}-mask-bottom`
  })))));
});
W1.displayName = "PickerView";
const Bl = W1, Ut = "adm-picker", O9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: D1,
  destroyOnClose: !1,
  forceRender: !1
}, Wl = Ve(de((e, t) => {
  var n;
  const {
    locale: r
  } = he(), i = Z(O9, {
    confirmText: r.common.confirm,
    cancelText: r.common.cancel
  }, e), [a, o] = te({
    value: i.visible,
    defaultValue: !1,
    onChange: (g) => {
      var w;
      g === !1 && ((w = i.onClose) === null || w === void 0 || w.call(i));
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
  pe(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var w;
      const C = I1(i.columns, g);
      (w = i.onConfirm) === null || w === void 0 || w.call(i, g, C);
    }
  })), d = L1(i.columns, c), [f, m] = z(c);
  K(() => {
    f !== c && m(c);
  }, [a]), K(() => {
    a || m(c);
  }, [c]);
  const p = Wt((g, w) => {
    var C;
    m(g), a && ((C = i.onSelect) === null || C === void 0 || C.call(i, g, w));
  }), v = B(i, l.createElement("div", {
    className: Ut
  }, l.createElement("div", {
    className: `${Ut}-header`
  }, l.createElement("a", {
    role: "button",
    className: `${Ut}-header-button`,
    onClick: () => {
      var g;
      (g = i.onCancel) === null || g === void 0 || g.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${Ut}-header-title`
  }, i.title), l.createElement("a", {
    role: "button",
    className: V(`${Ut}-header-button`, i.loading && `${Ut}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(f, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), l.createElement("div", {
    className: `${Ut}-body`
  }, l.createElement(Bl, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: f,
    mouseWheel: i.mouseWheel,
    onChange: p
  })))), h = l.createElement(_i, {
    style: i.popupStyle,
    className: V(`${Ut}-popup`, i.popupClassName),
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
  }, v, l.createElement(Cr, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, h, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, d.items, s));
}));
Wl.displayName = "Picker";
function F9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = z(!1);
      return K(() => {
        a(!0);
      }, []), l.createElement(Wl, Object.assign({}, e, {
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
    }, r = ki(l.createElement(n, null));
  });
}
const Z1 = ie(Wl, {
  prompt: F9
});
function H1(e) {
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
const U1 = de((e, t) => {
  const {
    options: n
  } = e, r = hi(e, ["options"]), i = H1(n);
  return l.createElement(Z1, Object.assign({}, r, {
    ref: t,
    columns: i
  }));
});
function P9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = z(!1);
      return K(() => {
        a(!0);
      }, []), l.createElement(U1, Object.assign({}, e, {
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
    }, r = ki(l.createElement(n, null));
  });
}
const _k = ie(U1, {
  prompt: P9
}), A9 = (e) => {
  const {
    options: t
  } = e, n = hi(e, ["options"]), r = H1(t);
  return l.createElement(Bl, Object.assign({}, n, {
    columns: r
  }));
}, kk = A9;
const Be = "adm-tabs", N9 = () => null, T9 = {
  activeLineMode: "auto",
  stretch: !0
}, R9 = (e) => {
  var t;
  const n = Z(T9, e), r = D(null), i = D(null), a = {};
  let o = null;
  const s = [];
  sn(n.children, (y, E) => {
    if (!l.isValidElement(y))
      return;
    const $ = y.key;
    if (typeof $ != "string")
      return;
    E === 0 && (o = $);
    const k = s.push(y);
    a[$] = k - 1;
  });
  const [c, u] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : o,
    onChange: (y) => {
      var E;
      y !== null && ((E = n.onChange) === null || E === void 0 || E.call(n, y));
    }
  }), [{
    x: d,
    width: f
  }, m] = Ae(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: p
  }, v] = Ae(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: h,
    rightMaskOpacity: g
  }, w] = Ae(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function C(y = !1) {
    const E = r.current;
    if (!E)
      return;
    const $ = a[c];
    if ($ === void 0) {
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
    const N = E.children.item($ + 1), A = N.children.item(0), P = A.offsetLeft, T = A.offsetWidth, S = N.offsetLeft, _ = N.offsetWidth, x = E.offsetWidth, F = E.scrollWidth, M = E.scrollLeft, O = k.offsetWidth;
    let I = 0, R = 0;
    if (n.activeLineMode === "auto" ? (I = P, R = T) : n.activeLineMode === "full" ? (I = S, R = _) : I = P + (T - O) / 2, m.start({
      x: I,
      width: R,
      immediate: y
    }), F - x <= 0)
      return;
    const H = _e(P - (x - T) / 2, 0, F - x);
    v.start({
      scrollLeft: H,
      from: {
        scrollLeft: M
      },
      immediate: y
    });
  }
  $e(() => {
    C(!d.isAnimating);
  }, []), Si(() => {
    C();
  }, [c]), Oi(() => {
    C(!d.isAnimating);
  }, r), Il(() => {
    C(!d.isAnimating);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: b
  } = ja((y = !1) => {
    const E = r.current;
    if (!E)
      return;
    const $ = E.scrollLeft, k = $ > 0, N = $ + E.offsetWidth < E.scrollWidth;
    w.start({
      leftMaskOpacity: k ? 1 : 0,
      rightMaskOpacity: N ? 1 : 0,
      immediate: y
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return $e(() => {
    b(!0);
  }, []), B(n, l.createElement("div", {
    className: Be
  }, l.createElement("div", {
    className: `${Be}-header`
  }, l.createElement(ue.div, {
    className: V(`${Be}-header-mask`, `${Be}-header-mask-left`),
    style: {
      opacity: h
    }
  }), l.createElement(ue.div, {
    className: V(`${Be}-header-mask`, `${Be}-header-mask-right`),
    style: {
      opacity: g
    }
  }), l.createElement(ue.div, {
    className: `${Be}-tab-list`,
    ref: r,
    scrollLeft: p,
    onScroll: b,
    role: "tablist"
  }, l.createElement(ue.div, {
    ref: i,
    className: `${Be}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : f,
      x: d
    }
  }), s.map((y) => B(y.props, l.createElement("div", {
    key: y.key,
    className: V(`${Be}-tab-wrapper`, {
      [`${Be}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: E
      } = y;
      y.props.disabled || E != null && u(E.toString());
    },
    className: V(`${Be}-tab`, {
      [`${Be}-tab-active`]: y.key === c,
      [`${Be}-tab-disabled`]: y.props.disabled
    }),
    role: "tab",
    "aria-selected": y.key === c
  }, y.props.title)))))), s.map((y) => {
    if (y.props.children === void 0)
      return null;
    const E = y.key === c;
    return l.createElement(wr, {
      key: y.key,
      active: E,
      forceRender: y.props.forceRender,
      destroyOnClose: y.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Be}-content`,
      style: {
        display: E ? "block" : "none"
      }
    }, y.props.children));
  })));
}, Gu = ie(R9, {
  Tab: N9
});
const Tr = "adm-list", M9 = {
  mode: "default"
}, I9 = de((e, t) => {
  const n = Z(M9, e), r = D(null);
  return pe(t, () => ({
    get nativeElement() {
      return r.current;
    }
  })), B(n, l.createElement("div", {
    className: V(Tr, `${Tr}-${n.mode}`),
    ref: r
  }, n.header && l.createElement("div", {
    className: `${Tr}-header`
  }, n.header), l.createElement("div", {
    className: `${Tr}-body`
  }, l.createElement("div", {
    className: `${Tr}-body-inner`
  }, n.children))));
});
function Dt(e) {
  return e != null && e !== !1;
}
const At = "adm-list-item", L9 = (e) => {
  var t;
  const n = (t = e.clickable) !== null && t !== void 0 ? t : !!e.onClick, r = e.arrow === void 0 ? n : e.arrow, i = l.createElement("div", {
    className: `${At}-content`
  }, Dt(e.prefix) && l.createElement("div", {
    className: `${At}-content-prefix`
  }, e.prefix), l.createElement("div", {
    className: `${At}-content-main`
  }, Dt(e.title) && l.createElement("div", {
    className: `${At}-title`
  }, e.title), e.children, Dt(e.description) && l.createElement("div", {
    className: `${At}-description`
  }, e.description)), Dt(e.extra) && l.createElement("div", {
    className: `${At}-content-extra`
  }, e.extra), Dt(r) && l.createElement("div", {
    className: `${At}-content-arrow`
  }, r === !0 ? l.createElement(E8, null) : r));
  return B(e, l.createElement(n ? "a" : "div", {
    className: V(`${At}`, n ? ["adm-plain-anchor"] : [], e.disabled && `${At}-disabled`),
    onClick: e.disabled ? void 0 : e.onClick
  }, i));
}, St = ie(I9, {
  Item: L9
}), z1 = el(null), D9 = "adm-check-list", V9 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(c1, null)
}, j9 = (e) => {
  const t = Z(V9, e), [n, r] = te(t);
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
  return l.createElement(z1.Provider, {
    value: {
      value: n,
      check: i,
      uncheck: a,
      activeIcon: o,
      extra: s,
      disabled: c,
      readOnly: u
    }
  }, B(t, l.createElement(St, {
    mode: t.mode,
    className: D9
  }, t.children)));
}, Ui = "adm-check-list-item", B9 = (e) => {
  const t = st(z1);
  if (t === null)
    return Ie("CheckList.Item", "CheckList.Item can only be used inside CheckList."), null;
  const n = t.value.includes(e.value), r = e.readOnly || t.readOnly, i = n ? t.activeIcon : null, a = t.extra ? t.extra(n) : i, o = l.createElement("div", {
    className: `${Ui}-extra`
  }, a);
  return B(e, l.createElement(St.Item, {
    title: e.title,
    className: V(Ui, r && `${Ui}-readonly`, n && `${Ui}-active`),
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
}, Yu = ie(j9, {
  Item: B9
});
var q1 = fl, W9 = "Expected a function";
function Zl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(W9);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = e.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Zl.Cache || q1)(), n;
}
Zl.Cache = q1;
var Xu = Zl;
function K1(e) {
  const t = re(() => Xu((i) => {
    const a = [];
    let o = e;
    for (const s of i) {
      const c = o.find((u) => u.value === s);
      if (!c || (a.push(c), !c.children))
        break;
      o = c.children;
    }
    return a;
  }, (i) => JSON.stringify(i)), [e]), n = re(() => Xu((i) => i.reduce((o, s) => {
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
const Hl = [];
function Z9(e, t) {
  const n = [];
  for (let r = e; r <= t; r++)
    n.push(r);
  return n;
}
const ci = "adm-skeleton", Ul = (e) => B(e, l.createElement("div", {
  className: V(ci, {
    [`${ci}-animated`]: e.animated
  })
})), H9 = (e) => B(e, l.createElement(Ul, {
  animated: e.animated,
  className: `${ci}-title`
})), U9 = {
  lineCount: 3
}, z9 = (e) => {
  const t = Z(U9, e), n = Z9(1, t.lineCount), r = l.createElement("div", {
    className: `${ci}-paragraph`
  }, n.map((i) => l.createElement(Ul, {
    key: i,
    animated: t.animated,
    className: `${ci}-paragraph-line`
  })));
  return B(t, r);
}, zi = ie(Ul, {
  Title: H9,
  Paragraph: z9
}), dt = "adm-cascader-view", q9 = {
  defaultValue: []
}, K9 = (e) => {
  const {
    locale: t
  } = he(), n = Z(q9, e), r = n.placeholder || t.Cascader.placeholder, [i, a] = te(Object.assign(Object.assign({}, n), {
    onChange: (f) => {
      var m;
      (m = n.onChange) === null || m === void 0 || m.call(n, f, c(f));
    }
  })), [o, s] = z(0);
  sl(() => {
    var f;
    (f = n.onTabsChange) === null || f === void 0 || f.call(n, o);
  }, [o]);
  const c = K1(n.options), u = re(() => {
    const f = [];
    let m = n.options, p = !1;
    for (const v of i) {
      const h = m.find((g) => g.value === v);
      if (f.push({
        selected: h,
        options: m
      }), !h || !h.children) {
        p = !0;
        break;
      }
      m = h.children;
    }
    return p || f.push({
      selected: void 0,
      options: m
    }), f;
  }, [i, n.options]);
  K(() => {
    s(u.length - 1);
  }, [i]), K(() => {
    const f = u.length - 1;
    o > f && s(f);
  }, [o, u]);
  const d = (f, m) => {
    const p = i.slice(0, m);
    f !== void 0 && (p[m] = f), a(p);
  };
  return B(n, l.createElement("div", {
    className: dt
  }, l.createElement(Gu, {
    activeKey: o.toString(),
    onChange: (f) => {
      const m = parseInt(f);
      s(m);
    },
    stretch: !1,
    className: `${dt}-tabs`
  }, u.map((f, m) => {
    const p = f.selected;
    return l.createElement(Gu.Tab, {
      key: m.toString(),
      title: l.createElement("div", {
        className: `${dt}-header-title`
      }, p ? p.label : typeof r == "function" ? r(m) : r),
      forceRender: !0
    }, l.createElement("div", {
      className: `${dt}-content`
    }, f.options === Hl ? l.createElement("div", {
      className: `${dt}-skeleton`
    }, l.createElement(zi, {
      className: `${dt}-skeleton-line-1`,
      animated: !0
    }), l.createElement(zi, {
      className: `${dt}-skeleton-line-2`,
      animated: !0
    }), l.createElement(zi, {
      className: `${dt}-skeleton-line-3`,
      animated: !0
    }), l.createElement(zi, {
      className: `${dt}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(Yu, {
      value: [i[m]],
      onChange: (v) => d(v[0], m),
      activeIcon: n.activeIcon
    }, f.options.map((v) => {
      const h = i[m] === v.value;
      return l.createElement(Yu.Item, {
        value: v.value,
        key: v.value,
        disabled: v.disabled,
        className: V(`${dt}-item`, {
          [`${dt}-item-active`]: h
        })
      }, v.label);
    }))));
  }))));
}, G9 = ie(K9, {
  optionSkeleton: Hl
}), Bn = "adm-cascader", Y9 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, G1 = de((e, t) => {
  var n;
  const {
    locale: r
  } = he(), i = Z(Y9, {
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
  pe(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var g;
      (g = i.onConfirm) === null || g === void 0 || g.call(i, h, d(h));
    }
  })), d = K1(i.options), [f, m] = z(c);
  K(() => {
    a || m(c);
  }, [a]), K(() => {
    a || m(c);
  }, [c]);
  const p = B(i, l.createElement("div", {
    className: Bn
  }, l.createElement("div", {
    className: `${Bn}-header`
  }, l.createElement("a", {
    className: `${Bn}-header-button`,
    onClick: () => {
      var h;
      (h = i.onCancel) === null || h === void 0 || h.call(i), o(!1);
    }
  }, i.cancelText), l.createElement("div", {
    className: `${Bn}-header-title`
  }, i.title), l.createElement("a", {
    className: `${Bn}-header-button`,
    onClick: () => {
      u(f, !0), o(!1);
    }
  }, i.confirmText)), l.createElement("div", {
    className: `${Bn}-body`
  }, l.createElement(G9, Object.assign({}, i, {
    value: f,
    onChange: (h, g) => {
      var w;
      m(h), a && ((w = i.onSelect) === null || w === void 0 || w.call(i, h, g));
    }
  }))))), v = l.createElement(_i, {
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
  }, p);
  return l.createElement(l.Fragment, null, v, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, d(c).items, s));
});
function X9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = z(!1);
      return K(() => {
        a(!0);
      }, []), l.createElement(G1, Object.assign({}, e, {
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
    }, r = ki(l.createElement(n, null));
  });
}
const Sk = ie(G1, {
  prompt: X9,
  optionSkeleton: Hl
});
const Q9 = Object.assign(Object.assign({}, Fl), {
  getContainer: null
}), J9 = (e) => {
  const t = Z(Q9, e), n = dl(), r = Ae({
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
  }), [i, a] = z(t.visible);
  $e(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = D(null);
  Ba(o, t.disableBodyScroll && i);
  const s = h1(i && t.visible), c = l.createElement("div", {
    className: V("adm-center-popup-body", t.bodyClassName),
    style: t.bodyStyle
  }, t.children), u = nn(t.stopPropagation, B(t, l.createElement("div", {
    className: "adm-center-popup",
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, t.mask && l.createElement(Ci, {
    visible: s,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (d) => {
      var f, m;
      (f = t.onMaskClick) === null || f === void 0 || f.call(t, d), t.closeOnMaskClick && ((m = t.onClose) === null || m === void 0 || m.call(t));
    },
    style: t.maskStyle,
    className: V("adm-center-popup-mask", t.maskClassName),
    disableBodyScroll: !1,
    stopPropagation: t.stopPropagation
  }), l.createElement("div", {
    className: "adm-center-popup-wrap",
    role: t.role,
    "aria-label": t["aria-label"]
  }, l.createElement(ue.div, {
    style: r,
    ref: o
  }, t.showCloseButton && l.createElement("a", {
    className: V("adm-center-popup-close", "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = t.onClose) === null || d === void 0 || d.call(t);
    }
  }, l.createElement($i, null)), c)))));
  return l.createElement(wr, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, br(t.getContainer, u));
}, Y1 = J9;
const X1 = el(null), eb = {
  disabled: !1,
  defaultValue: []
}, tb = (e) => {
  const t = Z(eb, e), [n, r] = te(t);
  return l.createElement(
    X1.Provider,
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
}, Q1 = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), nb = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), J1 = (e) => {
  const t = D(null), n = Wt((r) => {
    r.stopPropagation(), r.stopImmediatePropagation();
    const i = r.target.checked;
    i !== e.checked && e.onChange(i);
  });
  return K(() => {
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
}, zt = "adm-checkbox", rb = {
  defaultChecked: !1,
  indeterminate: !1
}, ib = de((e, t) => {
  const n = st(X1), r = Z(rb, e);
  let [i, a] = te({
    value: r.checked,
    defaultValue: r.defaultChecked,
    onChange: r.onChange
  }), o = r.disabled;
  const {
    value: s
  } = r;
  n && s !== void 0 && (fo && (e.checked !== void 0 && Ie("Checkbox", "When used within `Checkbox.Group`, the `checked` prop of `Checkbox` will not work."), e.defaultChecked !== void 0 && Ie("Checkbox", "When used within `Checkbox.Group`, the `defaultChecked` prop of `Checkbox` will not work.")), i = n.value.includes(s), a = (u) => {
    var d;
    u ? n.check(s) : n.uncheck(s), (d = r.onChange) === null || d === void 0 || d.call(r, u);
  }, o = o || n.disabled), pe(t, () => ({
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
    className: `${zt}-custom-icon`
  }, r.icon(i, r.indeterminate)) : l.createElement("div", {
    className: `${zt}-icon`
  }, r.indeterminate ? l.createElement(nb, null) : i && l.createElement(Q1, null));
  return B(r, l.createElement("label", {
    className: V(zt, {
      [`${zt}-checked`]: i && !r.indeterminate,
      [`${zt}-indeterminate`]: r.indeterminate,
      [`${zt}-disabled`]: o,
      [`${zt}-block`]: r.block
    })
  }, l.createElement(J1, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${zt}-content`
  }, r.children)));
}), Qu = ie(ib, {
  Group: tb
});
const _n = "adm-collapse", ab = () => null, ob = (e) => {
  const {
    visible: t
  } = e, n = D(null), r = Ya(t, e.forceRender, e.destroyOnClose), [{
    height: i
  }, a] = Ae(() => ({
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
  return qv(() => {
    if (!t)
      return;
    const o = n.current;
    !o || a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Si(() => {
    const o = n.current;
    !o || (t ? a.start({
      height: o.offsetHeight
    }) : (a.start({
      height: o.offsetHeight,
      immediate: !0
    }), a.start({
      height: 0
    })));
  }, [t]), l.createElement(ue.div, {
    className: V(`${_n}-panel-content`, {
      [`${_n}-panel-content-active`]: t
    }),
    style: {
      height: i.to((o) => i.idle && t ? "auto" : o)
    }
  }, l.createElement("div", {
    className: `${_n}-panel-content-inner`,
    ref: n
  }, l.createElement(St.Item, null, r && e.children)));
}, sb = (e) => {
  var t;
  const n = [];
  sn(e.children, (o) => {
    !l.isValidElement(o) || typeof o.key != "string" || n.push(o);
  });
  const [r, i] = te(e.accordion ? {
    value: e.activeKey === void 0 ? void 0 : e.activeKey === null ? [] : [e.activeKey],
    defaultValue: e.defaultActiveKey === void 0 || e.defaultActiveKey === null ? [] : [e.defaultActiveKey],
    onChange: (o) => {
      var s, c;
      (s = e.onChange) === null || s === void 0 || s.call(e, (c = o[0]) !== null && c !== void 0 ? c : null);
    }
  } : {
    value: e.activeKey,
    defaultValue: (t = e.defaultActiveKey) !== null && t !== void 0 ? t : [],
    onChange: e.onChange
  }), a = r === null ? [] : Array.isArray(r) ? r : [r];
  return B(e, l.createElement("div", {
    className: _n
  }, l.createElement(St, null, n.map((o) => {
    const s = o.key, c = a.includes(s);
    function u(f) {
      var m, p;
      e.accordion ? i(c ? [] : [s]) : i(c ? a.filter((v) => v !== s) : [...a, s]), (p = (m = o.props).onClick) === null || p === void 0 || p.call(m, f);
    }
    const d = () => {
      let f = l.createElement(f1, null);
      return e.arrow !== void 0 && (f = e.arrow), o.props.arrow !== void 0 && (f = o.props.arrow), typeof f == "function" ? f(c) : l.createElement("div", {
        className: V(`${_n}-arrow`, {
          [`${_n}-arrow-active`]: c
        })
      }, f);
    };
    return l.createElement(l.Fragment, {
      key: s
    }, B(o.props, l.createElement(St.Item, {
      className: `${_n}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: d()
    }, o.props.title)), l.createElement(ob, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, Ok = ie(sb, {
  Panel: ab
});
var e0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(kt, function() {
    return function(n, r) {
      r.prototype.isoWeeksInYear = function() {
        var i = this.isLeapYear(), a = this.endOf("y").day();
        return a === 4 || i && a === 5 ? 53 : 52;
      };
    };
  });
})(e0);
const t0 = e0.exports;
var n0 = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(kt, function() {
    return function(n, r) {
      r.prototype.isLeapYear = function() {
        return this.$y % 4 == 0 && this.$y % 100 != 0 || this.$y % 400 == 0;
      };
    };
  });
})(n0);
const r0 = n0.exports, ui = "TILL_NOW";
xe.extend(Ml);
xe.extend(t0);
xe.extend(r0);
const qt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function lb(e, t, n, r, i, a, o) {
  const s = [], c = t.getFullYear(), u = t.getMonth() + 1, d = t.getDate(), f = t.getHours(), m = t.getMinutes(), p = t.getSeconds(), v = n.getFullYear(), h = n.getMonth() + 1, g = n.getDate(), w = n.getHours(), C = n.getMinutes(), b = n.getSeconds(), y = qt[r], E = parseInt(e[0]), $ = xe(ks([e[0], e[1], "1"])), k = parseInt(e[1]), N = parseInt(e[2]), A = parseInt(e[3]), P = parseInt(e[4]), T = E === c, S = E === v, _ = T && k === u, x = S && k === h, F = _ && N === d, M = x && N === g, O = F && A === f, I = M && A === w, R = O && P === m, j = I && P === C, H = (U, q, X) => {
    let G = [];
    for (let ve = U; ve <= q; ve++)
      G.push(ve);
    const Se = e.slice(0, qt[X]), Oe = a == null ? void 0 : a[X];
    return Oe && typeof Oe == "function" && (G = G.filter((ve) => Oe(ve, {
      get date() {
        const ge = [...Se, ve.toString()];
        return ks(ge);
      }
    }))), G;
  };
  if (y >= qt.year) {
    const X = H(c, v, "year");
    s.push(X.map((G) => ({
      label: i("year", G),
      value: G.toString()
    })));
  }
  if (y >= qt.month) {
    const X = H(T ? u : 1, S ? h : 12, "month");
    s.push(X.map((G) => ({
      label: i("month", G),
      value: G.toString()
    })));
  }
  if (y >= qt.day) {
    const U = _ ? d : 1, q = x ? g : $.daysInMonth(), X = H(U, q, "day");
    s.push(X.map((G) => ({
      label: i("day", G),
      value: G.toString()
    })));
  }
  if (y >= qt.hour) {
    const X = H(F ? f : 0, M ? w : 23, "hour");
    s.push(X.map((G) => ({
      label: i("hour", G),
      value: G.toString()
    })));
  }
  if (y >= qt.minute) {
    const X = H(O ? m : 0, I ? C : 59, "minute");
    s.push(X.map((G) => ({
      label: i("minute", G),
      value: G.toString()
    })));
  }
  if (y >= qt.second) {
    const X = H(R ? p : 0, j ? b : 59, "second");
    s.push(X.map((G) => ({
      label: i("second", G),
      value: G.toString()
    })));
  }
  if (o && (s[0].push({
    label: i("now", null),
    value: ui
  }), ui === (e == null ? void 0 : e[0])))
    for (let U = 1; U < s.length; U += 1)
      s[U] = [];
  return s;
}
function cb(e) {
  return e ? [e.getFullYear().toString(), (e.getMonth() + 1).toString(), e.getDate().toString(), e.getHours().toString(), e.getMinutes().toString(), e.getSeconds().toString()] : [];
}
function ks(e) {
  var t, n, r, i, a, o;
  const s = (t = e[0]) !== null && t !== void 0 ? t : "1900", c = (n = e[1]) !== null && n !== void 0 ? n : "1", u = (r = e[2]) !== null && r !== void 0 ? r : "1", d = (i = e[3]) !== null && i !== void 0 ? i : "0", f = (a = e[4]) !== null && a !== void 0 ? a : "0", m = (o = e[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(d), parseInt(f), parseInt(m));
}
xe.extend(Ml);
xe.extend(t0);
xe.extend(r0);
const Rr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function ub(e, t, n, r, i, a) {
  const o = [], s = t.getFullYear(), c = n.getFullYear(), u = Rr[r], d = parseInt(e[0]), f = d === s, m = d === c, p = xe(t), v = xe(n), h = p.isoWeek(), g = v.isoWeek(), w = p.isoWeekday(), C = v.isoWeekday(), b = parseInt(e[1]), y = f && b === h, E = m && b === g, $ = xe(`${d}-01-01`).isoWeeksInYear(), k = (N, A, P) => {
    let T = [];
    for (let x = N; x <= A; x++)
      T.push(x);
    const S = e.slice(0, Rr[P]), _ = a == null ? void 0 : a[P];
    return _ && typeof _ == "function" && (T = T.filter((x) => _(x, {
      get date() {
        const F = [...S, x.toString()];
        return i0(F);
      }
    }))), T;
  };
  if (u >= Rr.year) {
    const P = k(s, c, "year");
    o.push(P.map((T) => ({
      label: i("year", T),
      value: T.toString()
    })));
  }
  if (u >= Rr.week) {
    const P = k(f ? h : 1, m ? g : $, "week");
    o.push(P.map((T) => ({
      label: i("week", T),
      value: T.toString()
    })));
  }
  if (u >= Rr["week-day"]) {
    const P = k(y ? w : 1, E ? C : 7, "week-day");
    o.push(P.map((T) => ({
      label: i("week-day", T),
      value: T.toString()
    })));
  }
  return o;
}
function fb(e) {
  if (!e)
    return [];
  const t = xe(e);
  return [t.isoWeekYear().toString(), t.isoWeek().toString(), t.isoWeekday().toString()];
}
function i0(e) {
  var t, n, r;
  const i = (t = e[0]) !== null && t !== void 0 ? t : "1900", a = (n = e[1]) !== null && n !== void 0 ? n : "1", o = (r = e[2]) !== null && r !== void 0 ? r : "1";
  return xe().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const db = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, a0 = (e, t) => {
  if (t.includes("week"))
    return fb(e);
  {
    const n = t;
    return cb(e).slice(0, db[n]);
  }
}, Ss = (e, t) => {
  if ((e == null ? void 0 : e[0]) === ui) {
    const n = new Date();
    return n.tillNow = !0, n;
  }
  return t.includes("week") ? i0(e) : ks(e);
}, o0 = (e, t, n, r, i, a, o) => r.startsWith("week") ? ub(e, t, n, r, i, a) : lb(e, t, n, r, i, a, o);
function s0(e) {
  const {
    locale: t
  } = he();
  return Xe((n, r) => {
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
const Ju = new Date().getFullYear(), mb = {
  min: new Date(new Date().setFullYear(Ju - 10)),
  max: new Date(new Date().setFullYear(Ju + 10)),
  precision: "day",
  defaultValue: null
}, l0 = de((e, t) => {
  const n = Z(mb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var p;
      m !== null && ((p = n.onConfirm) === null || p === void 0 || p.call(n, m));
    }
  }), o = re(() => new Date(), []), s = s0(r), c = re(() => {
    let m = i != null ? i : o;
    return m.tillNow ? [ui] : (m = new Date(_e(m.getTime(), n.min.getTime(), n.max.getTime())), a0(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Xe((m) => {
    const p = Ss(m, n.precision);
    a(p, !0);
  }, [a, n.precision]), d = Wt((m) => {
    var p;
    const v = Ss(m, n.precision);
    (p = n.onSelect) === null || p === void 0 || p.call(n, v);
  }), f = Xe((m) => o0(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return B(n, l.createElement(Z1, {
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
  }, (m, p) => {
    var v;
    return (v = n.children) === null || v === void 0 ? void 0 : v.call(n, i, p);
  }));
});
function hb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = z(!1);
      return K(() => {
        a(!0);
      }, []), l.createElement(l0, Object.assign({}, e, {
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
    }, r = ki(l.createElement(n, null));
  });
}
const Fk = ie(l0, {
  prompt: hb,
  DATE_NOW: ui
}), ef = new Date().getFullYear(), pb = {
  min: new Date(new Date().setFullYear(ef - 10)),
  max: new Date(new Date().setFullYear(ef + 10)),
  precision: "day"
}, vb = (e) => {
  var t;
  const n = Z(pb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : null
  }), o = s0(r), s = re(() => a0(i, n.precision), [i, n.precision]), c = Xe((u) => {
    var d;
    const f = Ss(u, n.precision);
    f && (a(f), (d = n.onChange) === null || d === void 0 || d.call(n, f));
  }, [n.onChange, n.precision]);
  return B(n, l.createElement(Bl, {
    columns: (u) => o0(u, n.min, n.max, n.precision, o, n.filter),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Pk = vb;
const gb = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(rn, {
    key: t.key,
    onClick: e.onAction,
    className: V("adm-dialog-button", {
      "adm-dialog-button-bold": t.bold
    }),
    fill: "none",
    shape: "rectangular",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, yb = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, c0 = (e) => {
  const t = Z(yb, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: wt("image-container")
  }, l.createElement(eo, {
    src: t.image,
    alt: "dialog header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: wt("header")
  }, l.createElement(li, null, t.header)), !!t.title && l.createElement("div", {
    className: wt("title")
  }, t.title), l.createElement("div", {
    className: V(wt("content"), !t.content && wt("content-empty"))
  }, typeof t.content == "string" ? l.createElement(li, null, t.content) : t.content), l.createElement("div", {
    className: wt("footer")
  }, t.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: wt("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(gb, {
      key: o.key,
      action: o,
      onAction: () => Ee(void 0, void 0, void 0, function* () {
        var c, u, d;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = t.onAction) === null || u === void 0 ? void 0 : u.call(t, o, s)]), t.closeOnAction && ((d = t.onClose) === null || d === void 0 || d.call(t));
      })
    })));
  })));
  return l.createElement(Y1, {
    className: V(wt(), t.className),
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
    bodyClassName: V(wt("body"), t.image && wt("with-image"), t.bodyClassName),
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
const Os = /* @__PURE__ */ new Set();
function zl(e) {
  const t = $r(l.createElement(c0, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Os.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Os.add(t.close), t;
}
function bb(e) {
  const t = {
    confirmText: pi().locale.Dialog.ok
  }, n = Z(t, e);
  return new Promise((r) => {
    zl(Object.assign(Object.assign({}, n), {
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
const wb = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function Eb(e) {
  const {
    locale: t
  } = pi(), n = Z(wb, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    zl(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => Ee(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => Ee(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function Cb() {
  Os.forEach((e) => {
    e();
  });
}
const Ak = ie(c0, {
  show: zl,
  alert: bb,
  confirm: Eb,
  clear: Cb
});
const qi = "adm-divider", $b = {
  contentPosition: "center",
  direction: "horizontal"
}, xb = (e) => {
  const t = Z($b, e);
  return B(t, l.createElement("div", {
    className: V(qi, `${qi}-${t.direction}`, `${qi}-${t.contentPosition}`)
  }, t.children && l.createElement("div", {
    className: `${qi}-content`
  }, t.children)));
}, tf = xb;
const Lt = "adm-dropdown-item", _b = (e) => {
  var t;
  const n = V(Lt, {
    [`${Lt}-active`]: e.active,
    [`${Lt}-highlight`]: (t = e.highlight) !== null && t !== void 0 ? t : e.active
  });
  return B(e, l.createElement("div", {
    className: n,
    onClick: e.onClick
  }, l.createElement("div", {
    className: `${Lt}-title`
  }, l.createElement("span", {
    className: `${Lt}-title-text`
  }, e.title), l.createElement("span", {
    className: V(`${Lt}-title-arrow`, {
      [`${Lt}-title-arrow-active`]: e.active
    })
  }, e.arrow === void 0 ? l.createElement(g8, null) : e.arrow))));
}, kb = _b, Sb = (e) => {
  const {
    active: t = !1
  } = e, n = Ya(t, e.forceRender, e.destroyOnClose), r = V(`${Lt}-content`, {
    [`${Lt}-content-hidden`]: !t
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: e.onClick
  }, e.children) : null;
}, Wn = "adm-dropdown", Ob = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Fl.getContainer
}, Fb = de((e, t) => {
  const n = Z(Ob, e), [r, i] = te({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = D(null), o = D(null);
  pd(() => {
    !n.closeOnClickAway || i(null);
  }, [a, o]);
  const [s, c] = z(), u = D(null);
  K(() => {
    const v = u.current;
    if (!!v && r) {
      const h = v.getBoundingClientRect();
      c(h.bottom);
    }
  }, [r]);
  const d = (v) => {
    i(r === v ? null : v);
  };
  let f = !1;
  const m = [], p = l.Children.map(n.children, (v) => {
    if (l.isValidElement(v)) {
      const h = Object.assign(Object.assign({}, v.props), {
        onClick: () => {
          d(v.key);
        },
        active: v.key === r,
        arrow: v.props.arrow === void 0 ? n.arrow : v.props.arrow
      });
      return m.push(v), v.props.forceRender && (f = !0), _m(v, h);
    } else
      return v;
  });
  return pe(t, () => ({
    close: () => {
      i(null);
    }
  }), [i]), B(n, l.createElement("div", {
    className: V(Wn, {
      [`${Wn}-open`]: !!r
    }),
    ref: u
  }, l.createElement("div", {
    className: `${Wn}-nav`,
    ref: a
  }, p), l.createElement(_i, {
    visible: !!r,
    position: "top",
    getContainer: n.getContainer,
    className: `${Wn}-popup`,
    maskClassName: `${Wn}-popup-mask`,
    bodyClassName: `${Wn}-popup-body`,
    style: {
      top: s
    },
    forceRender: f,
    onMaskClick: n.closeOnMaskClick ? () => {
      d(null);
    } : void 0
  }, l.createElement("div", {
    ref: o
  }, m.map((v) => {
    const h = v.key === r;
    return l.createElement(Sb, {
      key: v.key,
      active: h,
      forceRender: v.props.forceRender,
      destroyOnClose: v.props.destroyOnClose
    }, v.props.children);
  })))));
}), Pb = Fb, Nk = ie(Pb, {
  Item: kb
});
var nf;
(function(e) {
  e[e.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", e[e.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", e[e.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", e[e.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", e[e.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", e[e.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", e[e.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", e[e.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", e[e.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", e[e.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", e[e.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", e[e.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", e[e.TAGS_START = 917504] = "TAGS_START", e[e.TAGS_END = 917631] = "TAGS_END", e[e.ZWJ = 8205] = "ZWJ";
})(nf || (nf = {}));
const Ab = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var rf;
function ia(e) {
  if (typeof e != "string")
    throw new TypeError("string cannot be undefined or null");
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; )
    r += Nb(n + r, e), Vb(e[n + r]) && r++, Ib(e[n + r]) && r++, Lb(e[n + r]) && r++, jb(e[n + r]) ? r++ : (t.push(e.substring(n, n + r)), n += r, r = 0);
  return t;
}
function Nb(e, t) {
  const n = t[e];
  if (!Tb(n) || e === t.length - 1)
    return 1;
  const r = n + t[e + 1];
  let i = t.substring(e + 2, e + 5);
  return af(r) && af(i) ? 4 : Rb(r) && Db(i) ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2 : Mb(i) ? 4 : 2;
}
function Tb(e) {
  return e && Mn(e[0].charCodeAt(0), 55296, 56319);
}
function af(e) {
  return Mn(ql(e), 127462, 127487);
}
function Rb(e) {
  return Mn(ql(e), 127988, 127988);
}
function Mb(e) {
  return Mn(ql(e), 127995, 127999);
}
function Ib(e) {
  return typeof e == "string" && Mn(e.charCodeAt(0), 65024, 65039);
}
function Lb(e) {
  return typeof e == "string" && Mn(e.charCodeAt(0), 8400, 8447);
}
function Db(e) {
  const t = e.codePointAt(0);
  return typeof e == "string" && typeof t == "number" && Mn(t, 917504, 917631);
}
function Vb(e) {
  return typeof e == "string" && Ab.includes(e.charCodeAt(0));
}
function jb(e) {
  return typeof e == "string" && e.charCodeAt(0) === 8205;
}
function ql(e) {
  return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536;
}
function Mn(e, t, n) {
  return e >= t && e <= n;
}
(function(e) {
  e[e.unit_1 = 1] = "unit_1", e[e.unit_2 = 2] = "unit_2", e[e.unit_4 = 4] = "unit_4";
})(rf || (rf = {}));
const Bb = "adm-ellipsis", Wb = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, Zb = (e) => {
  const t = Z(Wb, e), n = D(null), [r, i] = z({}), [a, o] = z(t.defaultExpanded), [s, c] = z(!1), u = re(() => ia(t.content), [t.content]);
  function d(h, g) {
    return u.slice(h, g).join("");
  }
  function f() {
    const h = n.current;
    if (!h || !h.offsetParent)
      return;
    const g = window.getComputedStyle(h), w = document.createElement("div");
    Array.prototype.slice.apply(g).forEach((E) => {
      w.style.setProperty(E, g.getPropertyValue(E));
    }), w.style.position = "fixed", w.style.left = "999999px", w.style.top = "999999px", w.style.zIndex = "-1000", w.style.height = "auto", w.style.minHeight = "auto", w.style.maxHeight = "auto", w.style.textOverflow = "clip", w.style.whiteSpace = "normal", w.style.webkitLineClamp = "unset", w.style.display = "block";
    const b = Wo(g.lineHeight), y = Math.floor(b * (t.rows + 0.5) + Wo(g.paddingTop) + Wo(g.paddingBottom));
    if (w.innerText = t.content, document.body.appendChild(w), w.offsetHeight <= y)
      c(!1);
    else {
      let k = function(T, S) {
        if (S - T <= 1)
          return t.direction === "end" ? {
            leading: d(0, T) + "..."
          } : {
            tailing: "..." + d(S, E)
          };
        const _ = Math.round((T + S) / 2);
        return t.direction === "end" ? w.innerText = d(0, _) + "..." + $ : w.innerText = $ + "..." + d(_, E), w.offsetHeight <= y ? t.direction === "end" ? k(_, S) : k(T, _) : t.direction === "end" ? k(T, _) : k(_, S);
      }, N = function(T, S) {
        if (T[1] - T[0] <= 1 && S[1] - S[0] <= 1)
          return {
            leading: d(0, T[0]) + "...",
            tailing: "..." + d(S[1], E)
          };
        const _ = Math.floor((T[0] + T[1]) / 2), x = Math.ceil((S[0] + S[1]) / 2);
        return w.innerText = d(0, _) + "..." + $ + "..." + d(x, E), w.offsetHeight <= y ? N([_, T[1]], [S[0], x]) : N([T[0], _], [x, S[1]]);
      };
      c(!0);
      const E = t.content.length, $ = a ? t.collapseText : t.expandText, A = Math.floor((0 + E) / 2), P = t.direction === "middle" ? N([0, A], [A, E]) : k(0, E);
      i(P);
    }
    document.body.removeChild(w);
  }
  Oi(f, n), $e(() => {
    f();
  }, [t.content, t.direction, t.rows, t.expandText, t.collapseText]);
  const m = s && t.expandText ? nn(t.stopPropagationForActionButtons, l.createElement("a", {
    onClick: () => {
      o(!0);
    }
  }, t.expandText)) : null, p = s && t.collapseText ? nn(t.stopPropagationForActionButtons, l.createElement("a", {
    onClick: () => {
      o(!1);
    }
  }, t.collapseText)) : null, v = () => s ? a ? l.createElement(l.Fragment, null, t.content, p) : l.createElement(l.Fragment, null, r.leading, m, r.tailing) : t.content;
  return B(t, l.createElement("div", {
    ref: n,
    className: Bb,
    onClick: (h) => {
      h.target === h.currentTarget && t.onContentClick(h);
    }
  }, v()));
};
function Wo(e) {
  if (!e)
    return 0;
  const t = e.match(/^\d*(\.\d*)?/);
  return t ? Number(t[0]) : 0;
}
const Tk = Zb;
const Hb = (e) => B(e, l.createElement("svg", {
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
}))))), Mr = "adm-empty", Ub = (e) => {
  function t() {
    const {
      image: n
    } = e;
    return n === void 0 ? l.createElement(Hb, {
      className: `${Mr}-image`,
      style: e.imageStyle
    }) : typeof n == "string" ? l.createElement("img", {
      className: `${Mr}-image`,
      style: e.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return B(e, l.createElement("div", {
    className: Mr
  }, l.createElement("div", {
    className: `${Mr}-image-container`
  }, t()), e.description && l.createElement("div", {
    className: V(`${Mr}-description`)
  }, e.description)));
}, Rk = Ub;
const un = "adm-error-block", zb = {
  status: "default"
};
function qb(e) {
  return (n) => {
    var r;
    const i = Z(zb, n), {
      locale: a
    } = he(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : e[i.status], d = typeof u == "string" ? l.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return B(i, l.createElement("div", {
      className: V(un, {
        [`${un}-full-page`]: i.fullPage
      })
    }, l.createElement("div", {
      className: `${un}-image`
    }, d), l.createElement("div", {
      className: `${un}-description`
    }, c && l.createElement("div", {
      className: `${un}-description-title`
    }, c), s && l.createElement("div", {
      className: `${un}-description-subtitle`
    }, s)), i.children && l.createElement("div", {
      className: `${un}-content`
    }, i.children)));
  };
}
const Kb = l.createElement("svg", {
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
}))), Gb = l.createElement("svg", {
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
})))), Yb = l.createElement("svg", {
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
})))), Xb = l.createElement("svg", {
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
})))), Qb = {
  default: Kb,
  disconnected: Gb,
  empty: Yb,
  busy: Xb
}, Jb = qb(Qb), Mk = Jb;
const Ki = "adm-floating-bubble", ew = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, tw = (e) => {
  const t = Z(ew, e), n = D(null), r = D(null), [i, a] = z(t.offset === void 0 ? t.defaultOffset : t.offset);
  K(() => {
    t.offset !== void 0 && u.start({
      x: t.offset.x,
      y: t.offset.y
    });
  }, [t.offset]);
  const [{
    x: o,
    y: s,
    opacity: c
  }, u] = Ae(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), d = Pt((f) => {
    var m;
    let p = f.offset[0], v = f.offset[1];
    if (f.last && t.magnetic) {
      const g = n.current, w = r.current;
      if (!g || !w)
        return;
      const C = g.getBoundingClientRect(), b = w.getBoundingClientRect();
      if (t.magnetic === "x") {
        const y = o.goal - o.get(), E = b.left + y - C.left, $ = C.right - (b.right + y);
        $ <= E ? p += $ : p -= E;
      } else if (t.magnetic === "y") {
        const y = s.goal - s.get(), E = b.top + y - C.top, $ = C.bottom - (b.bottom + y);
        $ <= E ? v += $ : v -= E;
      }
    }
    const h = {
      x: p,
      y: v
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
    className: Ki
  }, l.createElement("div", {
    className: `${Ki}-boundary-outer`
  }, l.createElement("div", {
    className: `${Ki}-boundary`,
    ref: n
  })), l.createElement(ue.div, Object.assign({}, d(), {
    style: {
      opacity: c,
      transform: G7([o, s], (f, m) => `translate(${f}px, ${m}px)`)
    },
    onClick: t.onClick,
    className: `${Ki}-button`,
    ref: r
  }), t.children)));
}, Ik = tw;
function Kl(e, t) {
  return e.reduce((n, r) => Math.abs(n - t) < Math.abs(r - t) ? n : r);
}
const nw = {
  handleDraggingOfContent: !0
}, rw = de((e, t) => {
  var n, r;
  const i = Z(nw, e), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map((C) => -C), c = D(null), u = D(null), d = D(null), [f, m] = z(!1), p = D(!1), v = {
    top: s[s.length - 1],
    bottom: s[0]
  }, h = Wt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: g
  }, w] = Ae(() => ({
    y: v.bottom,
    config: {
      tension: 300
    },
    onChange: (C) => {
      h(-C.value.y, g.isAnimating);
    }
  }));
  return Pt((C) => {
    const [, b] = C.offset;
    if (C.first) {
      const $ = C.event.target, k = u.current;
      if (k === $ || (k == null ? void 0 : k.contains($)))
        p.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = g.goal <= v.top, A = d.current;
        if (!A)
          return;
        N ? A.scrollTop <= 0 && C.direction[1] > 0 && (p.current = !0) : p.current = !0;
      }
    }
    if (m(p.current), !p.current)
      return;
    const {
      event: y
    } = C;
    y.cancelable && y.preventDefault(), y.stopPropagation();
    let E = b;
    C.last && (p.current = !1, m(!1), E = Kl(s, b)), w.start({
      y: E
    });
  }, {
    axis: "y",
    bounds: v,
    rubberband: !0,
    from: () => [0, g.get()],
    pointer: {
      touch: !0
    },
    target: c,
    eventOptions: bi ? {
      passive: !1
    } : !1
  }), pe(t, () => ({
    setHeight: (C, b) => {
      w.start({
        y: -C,
        immediate: b == null ? void 0 : b.immediate
      });
    }
  }), [w]), Ba(c, !0), B(i, l.createElement(ue.div, {
    ref: c,
    className: "adm-floating-panel",
    style: {
      height: Math.round(o),
      translateY: g.to((C) => `calc(100% + (${Math.round(C)}px))`)
    }
  }, l.createElement("div", {
    className: "adm-floating-panel-mask",
    style: {
      display: f ? "block" : "none"
    }
  }), l.createElement("div", {
    className: "adm-floating-panel-header",
    ref: u
  }, l.createElement("div", {
    className: "adm-floating-panel-bar"
  })), l.createElement("div", {
    className: "adm-floating-panel-content",
    ref: d
  }, i.children)));
}), Lk = rw;
function _a() {
  return _a = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _a.apply(this, arguments);
}
function iw(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Gl(e, t) {
  if (e == null)
    return {};
  var n = iw(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
function Qe(e) {
  return Qe = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Qe(e);
}
function aw(e, t) {
  if (Qe(e) !== "object" || e === null)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Qe(r) !== "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function u0(e) {
  var t = aw(e, "string");
  return Qe(t) === "symbol" ? t : String(t);
}
function De(e, t, n) {
  return t = u0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function of(e, t) {
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
    t % 2 ? of(Object(n), !0).forEach(function(r) {
      De(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : of(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Fs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function ow(e) {
  if (Array.isArray(e))
    return Fs(e);
}
function f0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Yl(e, t) {
  if (!!e) {
    if (typeof e == "string")
      return Fs(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Fs(e, t);
  }
}
function sw() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ne(e) {
  return ow(e) || f0(e) || Yl(e) || sw();
}
function Fi(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function sf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, u0(r.key), r);
  }
}
function Pi(e, t, n) {
  return t && sf(e.prototype, t), n && sf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function d0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ps(e, t) {
  return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ps(e, t);
}
function lw(e, t) {
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
  }), t && Ps(e, t);
}
function ka(e) {
  return ka = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, ka(e);
}
function cw() {
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
function uw(e, t) {
  if (t && (Qe(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return d0(e);
}
function fw(e) {
  var t = cw();
  return function() {
    var r = ka(e), i;
    if (t) {
      var a = ka(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return uw(this, i);
  };
}
var m0 = { exports: {} }, oe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ne = typeof Symbol == "function" && Symbol.for, Xl = Ne ? Symbol.for("react.element") : 60103, Ql = Ne ? Symbol.for("react.portal") : 60106, mo = Ne ? Symbol.for("react.fragment") : 60107, ho = Ne ? Symbol.for("react.strict_mode") : 60108, po = Ne ? Symbol.for("react.profiler") : 60114, vo = Ne ? Symbol.for("react.provider") : 60109, go = Ne ? Symbol.for("react.context") : 60110, Jl = Ne ? Symbol.for("react.async_mode") : 60111, yo = Ne ? Symbol.for("react.concurrent_mode") : 60111, bo = Ne ? Symbol.for("react.forward_ref") : 60112, wo = Ne ? Symbol.for("react.suspense") : 60113, dw = Ne ? Symbol.for("react.suspense_list") : 60120, Eo = Ne ? Symbol.for("react.memo") : 60115, Co = Ne ? Symbol.for("react.lazy") : 60116, mw = Ne ? Symbol.for("react.block") : 60121, hw = Ne ? Symbol.for("react.fundamental") : 60117, pw = Ne ? Symbol.for("react.responder") : 60118, vw = Ne ? Symbol.for("react.scope") : 60119;
function Je(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Xl:
        switch (e = e.type, e) {
          case Jl:
          case yo:
          case mo:
          case po:
          case ho:
          case wo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case go:
              case bo:
              case Co:
              case Eo:
              case vo:
                return e;
              default:
                return t;
            }
        }
      case Ql:
        return t;
    }
  }
}
function h0(e) {
  return Je(e) === yo;
}
oe.AsyncMode = Jl;
oe.ConcurrentMode = yo;
oe.ContextConsumer = go;
oe.ContextProvider = vo;
oe.Element = Xl;
oe.ForwardRef = bo;
oe.Fragment = mo;
oe.Lazy = Co;
oe.Memo = Eo;
oe.Portal = Ql;
oe.Profiler = po;
oe.StrictMode = ho;
oe.Suspense = wo;
oe.isAsyncMode = function(e) {
  return h0(e) || Je(e) === Jl;
};
oe.isConcurrentMode = h0;
oe.isContextConsumer = function(e) {
  return Je(e) === go;
};
oe.isContextProvider = function(e) {
  return Je(e) === vo;
};
oe.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xl;
};
oe.isForwardRef = function(e) {
  return Je(e) === bo;
};
oe.isFragment = function(e) {
  return Je(e) === mo;
};
oe.isLazy = function(e) {
  return Je(e) === Co;
};
oe.isMemo = function(e) {
  return Je(e) === Eo;
};
oe.isPortal = function(e) {
  return Je(e) === Ql;
};
oe.isProfiler = function(e) {
  return Je(e) === po;
};
oe.isStrictMode = function(e) {
  return Je(e) === ho;
};
oe.isSuspense = function(e) {
  return Je(e) === wo;
};
oe.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === mo || e === yo || e === po || e === ho || e === wo || e === dw || typeof e == "object" && e !== null && (e.$$typeof === Co || e.$$typeof === Eo || e.$$typeof === vo || e.$$typeof === go || e.$$typeof === bo || e.$$typeof === hw || e.$$typeof === pw || e.$$typeof === vw || e.$$typeof === mw);
};
oe.typeOf = Je;
(function(e) {
  e.exports = oe;
})(m0);
function As(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(e, function(r) {
    r == null && !t.keepEmpty || (Array.isArray(r) ? n = n.concat(As(r)) : m0.exports.isFragment(r) && r.props ? n = n.concat(As(r.props.children, t)) : n.push(r));
  }), n;
}
var Ns = {}, gw = function(t) {
};
function yw(e, t) {
}
function bw(e, t) {
}
function ww() {
  Ns = {};
}
function p0(e, t, n) {
  !t && !Ns[n] && (e(!1, n), Ns[n] = !0);
}
function pt(e, t) {
  p0(yw, e, t);
}
function Ew(e, t) {
  p0(bw, e, t);
}
pt.preMessage = gw;
pt.resetWarned = ww;
pt.noteOnce = Ew;
var kn = "RC_FORM_INTERNAL_HOOKS", se = function() {
  pt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, An = /* @__PURE__ */ L.createContext({
  getFieldValue: se,
  getFieldsValue: se,
  getFieldError: se,
  getFieldWarning: se,
  getFieldsError: se,
  isFieldsTouched: se,
  isFieldTouched: se,
  isFieldValidating: se,
  isFieldsValidating: se,
  resetFields: se,
  setFields: se,
  setFieldValue: se,
  setFieldsValue: se,
  validateFields: se,
  submit: se,
  getInternalHooks: function() {
    return se(), {
      dispatch: se,
      initEntityValue: se,
      registerField: se,
      useSubscribe: se,
      setInitialValues: se,
      destroyForm: se,
      setCallbacks: se,
      registerWatch: se,
      getFields: se,
      setValidateMessages: se,
      setPreserve: se,
      getInitialValue: se
    };
  }
});
function Ts(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Bt() {
  Bt = function() {
    return e;
  };
  var e = {}, t = Object.prototype, n = t.hasOwnProperty, r = Object.defineProperty || function(S, _, x) {
    S[_] = x.value;
  }, i = typeof Symbol == "function" ? Symbol : {}, a = i.iterator || "@@iterator", o = i.asyncIterator || "@@asyncIterator", s = i.toStringTag || "@@toStringTag";
  function c(S, _, x) {
    return Object.defineProperty(S, _, {
      value: x,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), S[_];
  }
  try {
    c({}, "");
  } catch {
    c = function(x, F, M) {
      return x[F] = M;
    };
  }
  function u(S, _, x, F) {
    var M = _ && _.prototype instanceof m ? _ : m, O = Object.create(M.prototype), I = new A(F || []);
    return r(O, "_invoke", {
      value: E(S, x, I)
    }), O;
  }
  function d(S, _, x) {
    try {
      return {
        type: "normal",
        arg: S.call(_, x)
      };
    } catch (F) {
      return {
        type: "throw",
        arg: F
      };
    }
  }
  e.wrap = u;
  var f = {};
  function m() {
  }
  function p() {
  }
  function v() {
  }
  var h = {};
  c(h, a, function() {
    return this;
  });
  var g = Object.getPrototypeOf, w = g && g(g(P([])));
  w && w !== t && n.call(w, a) && (h = w);
  var C = v.prototype = m.prototype = Object.create(h);
  function b(S) {
    ["next", "throw", "return"].forEach(function(_) {
      c(S, _, function(x) {
        return this._invoke(_, x);
      });
    });
  }
  function y(S, _) {
    function x(M, O, I, R) {
      var j = d(S[M], S, O);
      if (j.type !== "throw") {
        var H = j.arg, U = H.value;
        return U && Qe(U) == "object" && n.call(U, "__await") ? _.resolve(U.__await).then(function(q) {
          x("next", q, I, R);
        }, function(q) {
          x("throw", q, I, R);
        }) : _.resolve(U).then(function(q) {
          H.value = q, I(H);
        }, function(q) {
          return x("throw", q, I, R);
        });
      }
      R(j.arg);
    }
    var F;
    r(this, "_invoke", {
      value: function(O, I) {
        function R() {
          return new _(function(j, H) {
            x(O, I, j, H);
          });
        }
        return F = F ? F.then(R, R) : R();
      }
    });
  }
  function E(S, _, x) {
    var F = "suspendedStart";
    return function(M, O) {
      if (F === "executing")
        throw new Error("Generator is already running");
      if (F === "completed") {
        if (M === "throw")
          throw O;
        return T();
      }
      for (x.method = M, x.arg = O; ; ) {
        var I = x.delegate;
        if (I) {
          var R = $(I, x);
          if (R) {
            if (R === f)
              continue;
            return R;
          }
        }
        if (x.method === "next")
          x.sent = x._sent = x.arg;
        else if (x.method === "throw") {
          if (F === "suspendedStart")
            throw F = "completed", x.arg;
          x.dispatchException(x.arg);
        } else
          x.method === "return" && x.abrupt("return", x.arg);
        F = "executing";
        var j = d(S, _, x);
        if (j.type === "normal") {
          if (F = x.done ? "completed" : "suspendedYield", j.arg === f)
            continue;
          return {
            value: j.arg,
            done: x.done
          };
        }
        j.type === "throw" && (F = "completed", x.method = "throw", x.arg = j.arg);
      }
    };
  }
  function $(S, _) {
    var x = _.method, F = S.iterator[x];
    if (F === void 0)
      return _.delegate = null, x === "throw" && S.iterator.return && (_.method = "return", _.arg = void 0, $(S, _), _.method === "throw") || x !== "return" && (_.method = "throw", _.arg = new TypeError("The iterator does not provide a '" + x + "' method")), f;
    var M = d(F, S.iterator, _.arg);
    if (M.type === "throw")
      return _.method = "throw", _.arg = M.arg, _.delegate = null, f;
    var O = M.arg;
    return O ? O.done ? (_[S.resultName] = O.value, _.next = S.nextLoc, _.method !== "return" && (_.method = "next", _.arg = void 0), _.delegate = null, f) : O : (_.method = "throw", _.arg = new TypeError("iterator result is not an object"), _.delegate = null, f);
  }
  function k(S) {
    var _ = {
      tryLoc: S[0]
    };
    1 in S && (_.catchLoc = S[1]), 2 in S && (_.finallyLoc = S[2], _.afterLoc = S[3]), this.tryEntries.push(_);
  }
  function N(S) {
    var _ = S.completion || {};
    _.type = "normal", delete _.arg, S.completion = _;
  }
  function A(S) {
    this.tryEntries = [{
      tryLoc: "root"
    }], S.forEach(k, this), this.reset(!0);
  }
  function P(S) {
    if (S) {
      var _ = S[a];
      if (_)
        return _.call(S);
      if (typeof S.next == "function")
        return S;
      if (!isNaN(S.length)) {
        var x = -1, F = function M() {
          for (; ++x < S.length; )
            if (n.call(S, x))
              return M.value = S[x], M.done = !1, M;
          return M.value = void 0, M.done = !0, M;
        };
        return F.next = F;
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
  return p.prototype = v, r(C, "constructor", {
    value: v,
    configurable: !0
  }), r(v, "constructor", {
    value: p,
    configurable: !0
  }), p.displayName = c(v, s, "GeneratorFunction"), e.isGeneratorFunction = function(S) {
    var _ = typeof S == "function" && S.constructor;
    return !!_ && (_ === p || (_.displayName || _.name) === "GeneratorFunction");
  }, e.mark = function(S) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(S, v) : (S.__proto__ = v, c(S, s, "GeneratorFunction")), S.prototype = Object.create(C), S;
  }, e.awrap = function(S) {
    return {
      __await: S
    };
  }, b(y.prototype), c(y.prototype, o, function() {
    return this;
  }), e.AsyncIterator = y, e.async = function(S, _, x, F, M) {
    M === void 0 && (M = Promise);
    var O = new y(u(S, _, x, F), M);
    return e.isGeneratorFunction(_) ? O : O.next().then(function(I) {
      return I.done ? I.value : O.next();
    });
  }, b(C), c(C, s, "Generator"), c(C, a, function() {
    return this;
  }), c(C, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(S) {
    var _ = Object(S), x = [];
    for (var F in _)
      x.push(F);
    return x.reverse(), function M() {
      for (; x.length; ) {
        var O = x.pop();
        if (O in _)
          return M.value = O, M.done = !1, M;
      }
      return M.done = !0, M;
    };
  }, e.values = P, A.prototype = {
    constructor: A,
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
      function F(H, U) {
        return I.type = "throw", I.arg = _, x.next = H, U && (x.method = "next", x.arg = void 0), !!U;
      }
      for (var M = this.tryEntries.length - 1; M >= 0; --M) {
        var O = this.tryEntries[M], I = O.completion;
        if (O.tryLoc === "root")
          return F("end");
        if (O.tryLoc <= this.prev) {
          var R = n.call(O, "catchLoc"), j = n.call(O, "finallyLoc");
          if (R && j) {
            if (this.prev < O.catchLoc)
              return F(O.catchLoc, !0);
            if (this.prev < O.finallyLoc)
              return F(O.finallyLoc);
          } else if (R) {
            if (this.prev < O.catchLoc)
              return F(O.catchLoc, !0);
          } else {
            if (!j)
              throw new Error("try statement without catch or finally");
            if (this.prev < O.finallyLoc)
              return F(O.finallyLoc);
          }
        }
      }
    },
    abrupt: function(_, x) {
      for (var F = this.tryEntries.length - 1; F >= 0; --F) {
        var M = this.tryEntries[F];
        if (M.tryLoc <= this.prev && n.call(M, "finallyLoc") && this.prev < M.finallyLoc) {
          var O = M;
          break;
        }
      }
      O && (_ === "break" || _ === "continue") && O.tryLoc <= x && x <= O.finallyLoc && (O = null);
      var I = O ? O.completion : {};
      return I.type = _, I.arg = x, O ? (this.method = "next", this.next = O.finallyLoc, f) : this.complete(I);
    },
    complete: function(_, x) {
      if (_.type === "throw")
        throw _.arg;
      return _.type === "break" || _.type === "continue" ? this.next = _.arg : _.type === "return" ? (this.rval = this.arg = _.arg, this.method = "return", this.next = "end") : _.type === "normal" && x && (this.next = x), f;
    },
    finish: function(_) {
      for (var x = this.tryEntries.length - 1; x >= 0; --x) {
        var F = this.tryEntries[x];
        if (F.finallyLoc === _)
          return this.complete(F.completion, F.afterLoc), N(F), f;
      }
    },
    catch: function(_) {
      for (var x = this.tryEntries.length - 1; x >= 0; --x) {
        var F = this.tryEntries[x];
        if (F.tryLoc === _) {
          var M = F.completion;
          if (M.type === "throw") {
            var O = M.arg;
            N(F);
          }
          return O;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function(_, x, F) {
      return this.delegate = {
        iterator: P(_),
        resultName: x,
        nextLoc: F
      }, this.method === "next" && (this.arg = void 0), f;
    }
  }, e;
}
function lf(e, t, n, r, i, a, o) {
  try {
    var s = e[a](o), c = s.value;
  } catch (u) {
    n(u);
    return;
  }
  s.done ? t(c) : Promise.resolve(c).then(r, i);
}
function $o(e) {
  return function() {
    var t = this, n = arguments;
    return new Promise(function(r, i) {
      var a = e.apply(t, n);
      function o(c) {
        lf(a, r, i, o, s, "next", c);
      }
      function s(c) {
        lf(a, r, i, o, s, "throw", c);
      }
      o(void 0);
    });
  };
}
function Sn() {
  return Sn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Sn.apply(this, arguments);
}
function Cw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, fi(e, t);
}
function Rs(e) {
  return Rs = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(n) {
    return n.__proto__ || Object.getPrototypeOf(n);
  }, Rs(e);
}
function fi(e, t) {
  return fi = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, fi(e, t);
}
function $w() {
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
function aa(e, t, n) {
  return $w() ? aa = Reflect.construct.bind() : aa = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && fi(u, o.prototype), u;
  }, aa.apply(null, arguments);
}
function xw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Ms(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Ms = function(r) {
    if (r === null || !xw(r))
      return r;
    if (typeof r != "function")
      throw new TypeError("Super expression must either be null or a function");
    if (typeof t < "u") {
      if (t.has(r))
        return t.get(r);
      t.set(r, i);
    }
    function i() {
      return aa(r, arguments, Rs(this).constructor);
    }
    return i.prototype = Object.create(r.prototype, {
      constructor: {
        value: i,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), fi(i, r);
  }, Ms(e);
}
var _w = /%[sdj%]/g, kw = function() {
};
typeof process < "u" && process.env;
function Is(e) {
  if (!e || !e.length)
    return null;
  var t = {};
  return e.forEach(function(n) {
    var r = n.field;
    t[r] = t[r] || [], t[r].push(n);
  }), t;
}
function Ke(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var o = e.replace(_w, function(s) {
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
function Sw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function ke(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || Sw(t) && typeof e == "string" && !e);
}
function Ow(e, t, n) {
  var r = [], i = 0, a = e.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function cf(e, t, n) {
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
function Fw(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var uf = /* @__PURE__ */ function(e) {
  Cw(t, e);
  function t(n, r) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return t;
}(/* @__PURE__ */ Ms(Error));
function Pw(e, t, n, r, i) {
  if (t.first) {
    var a = new Promise(function(m, p) {
      var v = function(w) {
        return r(w), w.length ? p(new uf(w, Is(w))) : m(i);
      }, h = Fw(e);
      cf(h, n, v);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), c = s.length, u = 0, d = [], f = new Promise(function(m, p) {
    var v = function(g) {
      if (d.push.apply(d, g), u++, u === c)
        return r(d), d.length ? p(new uf(d, Is(d))) : m(i);
    };
    s.length || (r(d), m(i)), s.forEach(function(h) {
      var g = e[h];
      o.indexOf(h) !== -1 ? cf(g, n, v) : Ow(g, n, v);
    });
  });
  return f.catch(function(m) {
    return m;
  }), f;
}
function Aw(e) {
  return !!(e && e.message !== void 0);
}
function Nw(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function ff(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = Nw(t, e.fullFields) : r = t[n.field || e.fullField], Aw(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function df(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = Sn({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var v0 = function(t, n, r, i, a, o) {
  t.required && (!r.hasOwnProperty(t.field) || ke(n, o || t.type)) && i.push(Ke(a.messages.required, t.fullField));
}, Tw = function(t, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Ke(a.messages.whitespace, t.fullField));
}, Gi, Rw = function() {
  if (Gi)
    return Gi;
  var e = "[a-fA-F\\d:]", t = function(y) {
    return y && y.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), o = new RegExp("^" + n + "$"), s = new RegExp("^" + i + "$"), c = function(y) {
    return y && y.exact ? a : new RegExp("(?:" + t(y) + n + t(y) + ")|(?:" + t(y) + i + t(y) + ")", "g");
  };
  c.v4 = function(b) {
    return b && b.exact ? o : new RegExp("" + t(b) + n + t(b), "g");
  }, c.v6 = function(b) {
    return b && b.exact ? s : new RegExp("" + t(b) + i + t(b), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", d = "(?:\\S+(?::\\S*)?@)?", f = c.v4().source, m = c.v6().source, p = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", v = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", h = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", w = '(?:[/?#][^\\s"]*)?', C = "(?:" + u + "|www\\.)" + d + "(?:localhost|" + f + "|" + m + "|" + p + v + h + ")" + g + w;
  return Gi = new RegExp("(?:^" + C + "$)", "i"), Gi;
}, mf = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Hr = {
  integer: function(t) {
    return Hr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Hr.number(t) && !Hr.integer(t);
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
    return typeof t == "object" && !Hr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(mf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Rw());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(mf.hex);
  }
}, Mw = function(t, n, r, i, a) {
  if (t.required && n === void 0) {
    v0(t, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Hr[s](n) || i.push(Ke(a.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && i.push(Ke(a.messages.types[s], t.fullField, t.type));
}, Iw = function(t, n, r, i, a) {
  var o = typeof t.len == "number", s = typeof t.min == "number", c = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, d = n, f = null, m = typeof n == "number", p = typeof n == "string", v = Array.isArray(n);
  if (m ? f = "number" : p ? f = "string" : v && (f = "array"), !f)
    return !1;
  v && (d = n.length), p && (d = n.replace(u, "_").length), o ? d !== t.len && i.push(Ke(a.messages[f].len, t.fullField, t.len)) : s && !c && d < t.min ? i.push(Ke(a.messages[f].min, t.fullField, t.min)) : c && !s && d > t.max ? i.push(Ke(a.messages[f].max, t.fullField, t.max)) : s && c && (d < t.min || d > t.max) && i.push(Ke(a.messages[f].range, t.fullField, t.min, t.max));
}, Zn = "enum", Lw = function(t, n, r, i, a) {
  t[Zn] = Array.isArray(t[Zn]) ? t[Zn] : [], t[Zn].indexOf(n) === -1 && i.push(Ke(a.messages[Zn], t.fullField, t[Zn].join(", ")));
}, Dw = function(t, n, r, i, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(Ke(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(n) || i.push(Ke(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Q = {
  required: v0,
  whitespace: Tw,
  type: Mw,
  range: Iw,
  enum: Lw,
  pattern: Dw
}, Vw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a, "string"), ke(n, "string") || (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a), Q.pattern(t, n, i, o, a), t.whitespace === !0 && Q.whitespace(t, n, i, o, a));
  }
  r(o);
}, jw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Bw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Ww = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Zw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), ke(n) || Q.type(t, n, i, o, a);
  }
  r(o);
}, Hw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Uw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, zw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    Q.required(t, n, i, o, a, "array"), n != null && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, qw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Kw = "enum", Gw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q[Kw](t, n, i, o, a);
  }
  r(o);
}, Yw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a), ke(n, "string") || Q.pattern(t, n, i, o, a);
  }
  r(o);
}, Xw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n, "date") && !t.required)
      return r();
    if (Q.required(t, n, i, o, a), !ke(n, "date")) {
      var c;
      n instanceof Date ? c = n : c = new Date(n), Q.type(t, c, i, o, a), c && Q.range(t, c.getTime(), i, o, a);
    }
  }
  r(o);
}, Qw = function(t, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  Q.required(t, n, i, o, a, s), r(o);
}, Zo = function(t, n, r, i, a) {
  var o = t.type, s = [], c = t.required || !t.required && i.hasOwnProperty(t.field);
  if (c) {
    if (ke(n, o) && !t.required)
      return r();
    Q.required(t, n, i, s, a, o), ke(n, o) || Q.type(t, n, i, s, a);
  }
  r(s);
}, Jw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (ke(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a);
  }
  r(o);
}, Gr = {
  string: Vw,
  method: jw,
  number: Bw,
  boolean: Ww,
  regexp: Zw,
  integer: Hw,
  float: Uw,
  array: zw,
  object: qw,
  enum: Gw,
  pattern: Yw,
  date: Xw,
  url: Zo,
  hex: Zo,
  email: Zo,
  required: Qw,
  any: Jw
};
function Ls() {
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
var Ds = Ls(), Ai = /* @__PURE__ */ function() {
  function e(n) {
    this.rules = null, this._messages = Ds, this.define(n);
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
    return r && (this._messages = df(Ls(), r)), this._messages;
  }, t.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function d(h) {
      var g = [], w = {};
      function C(y) {
        if (Array.isArray(y)) {
          var E;
          g = (E = g).concat.apply(E, y);
        } else
          g.push(y);
      }
      for (var b = 0; b < h.length; b++)
        C(h[b]);
      g.length ? (w = Is(g), u(g, w)) : u(null, s);
    }
    if (c.messages) {
      var f = this.messages();
      f === Ds && (f = Ls()), df(f, c.messages), c.messages = f;
    } else
      c.messages = this.messages();
    var m = {}, p = c.keys || Object.keys(this.rules);
    p.forEach(function(h) {
      var g = o.rules[h], w = s[h];
      g.forEach(function(C) {
        var b = C;
        typeof b.transform == "function" && (s === r && (s = Sn({}, s)), w = s[h] = b.transform(w)), typeof b == "function" ? b = {
          validator: b
        } : b = Sn({}, b), b.validator = o.getValidationMethod(b), b.validator && (b.field = h, b.fullField = b.fullField || h, b.type = o.getType(b), m[h] = m[h] || [], m[h].push({
          rule: b,
          value: w,
          source: s,
          field: h
        }));
      });
    });
    var v = {};
    return Pw(m, c, function(h, g) {
      var w = h.rule, C = (w.type === "object" || w.type === "array") && (typeof w.fields == "object" || typeof w.defaultField == "object");
      C = C && (w.required || !w.required && h.value), w.field = h.field;
      function b($, k) {
        return Sn({}, k, {
          fullField: w.fullField + "." + $,
          fullFields: w.fullFields ? [].concat(w.fullFields, [$]) : [$]
        });
      }
      function y($) {
        $ === void 0 && ($ = []);
        var k = Array.isArray($) ? $ : [$];
        !c.suppressWarning && k.length && e.warning("async-validator:", k), k.length && w.message !== void 0 && (k = [].concat(w.message));
        var N = k.map(ff(w, s));
        if (c.first && N.length)
          return v[w.field] = 1, g(N);
        if (!C)
          g(N);
        else {
          if (w.required && !h.value)
            return w.message !== void 0 ? N = [].concat(w.message).map(ff(w, s)) : c.error && (N = [c.error(w, Ke(c.messages.required, w.field))]), g(N);
          var A = {};
          w.defaultField && Object.keys(h.value).map(function(S) {
            A[S] = w.defaultField;
          }), A = Sn({}, A, h.rule.fields);
          var P = {};
          Object.keys(A).forEach(function(S) {
            var _ = A[S], x = Array.isArray(_) ? _ : [_];
            P[S] = x.map(b.bind(null, S));
          });
          var T = new e(P);
          T.messages(c.messages), h.rule.options && (h.rule.options.messages = c.messages, h.rule.options.error = c.error), T.validate(h.value, h.rule.options || c, function(S) {
            var _ = [];
            N && N.length && _.push.apply(_, N), S && S.length && _.push.apply(_, S), g(_.length ? _ : null);
          });
        }
      }
      var E;
      if (w.asyncValidator)
        E = w.asyncValidator(w, h.value, y, h.source, c);
      else if (w.validator) {
        try {
          E = w.validator(w, h.value, y, h.source, c);
        } catch ($) {
          console.error == null || console.error($), c.suppressValidatorError || setTimeout(function() {
            throw $;
          }, 0), y($.message);
        }
        E === !0 ? y() : E === !1 ? y(typeof w.message == "function" ? w.message(w.fullField || w.field) : w.message || (w.fullField || w.field) + " fails") : E instanceof Array ? y(E) : E instanceof Error && y(E.message);
      }
      E && E.then && E.then(function() {
        return y();
      }, function($) {
        return y($);
      });
    }, function(h) {
      d(h);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Gr.hasOwnProperty(r.type))
      throw new Error(Ke("Unknown rule type %s", r.type));
    return r.type || "string";
  }, t.getValidationMethod = function(r) {
    if (typeof r.validator == "function")
      return r.validator;
    var i = Object.keys(r), a = i.indexOf("message");
    return a !== -1 && i.splice(a, 1), i.length === 1 && i[0] === "required" ? Gr.required : Gr[this.getType(r)] || void 0;
  }, e;
}();
Ai.register = function(t, n) {
  if (typeof n != "function")
    throw new Error("Cannot register a validator by type, validator is not a function");
  Gr[t] = n;
};
Ai.warning = kw;
Ai.messages = Ds;
Ai.validators = Gr;
var ze = "'${name}' is not a valid ${type}", g0 = {
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
function y0(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null)
      return;
    n = n[t[r]];
  }
  return n;
}
function b0(e) {
  if (Array.isArray(e))
    return e;
}
function w0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function eE(e) {
  return b0(e) || f0(e) || Yl(e) || w0();
}
function E0(e, t, n, r) {
  if (!t.length)
    return n;
  var i = eE(t), a = i[0], o = i.slice(1), s;
  return !e && typeof a == "number" ? s = [] : Array.isArray(e) ? s = ne(e) : s = ee({}, e), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = E0(s[a], o, n, r), s;
}
function tE(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !y0(e, t.slice(0, -1)) ? e : E0(e, t, n, r);
}
function xo(e) {
  return Array.isArray(e) ? rE(e) : Qe(e) === "object" && e !== null ? nE(e) : e;
}
function nE(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var n in e)
      t[n] = xo(e[n]);
    return t;
  }
  return e;
}
function rE(e) {
  return e.map(function(t) {
    return xo(t);
  });
}
function be(e) {
  return Ts(e);
}
function Jt(e, t) {
  var n = y0(e, t);
  return n;
}
function Yt(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = tE(e, t, n, r);
  return i;
}
function hf(e, t) {
  var n = {};
  return t.forEach(function(r) {
    var i = Jt(e, r);
    n = Yt(n, r, i);
  }), n;
}
function Yr(e, t) {
  return e && e.some(function(n) {
    return $0(n, t);
  });
}
function pf(e) {
  return Qe(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function C0(e, t) {
  var n = Array.isArray(e) ? ne(e) : ee({}, e);
  return t && Object.keys(t).forEach(function(r) {
    var i = n[r], a = t[r], o = pf(i) && pf(a);
    n[r] = o ? C0(i, a || {}) : xo(a);
  }), n;
}
function oa(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return C0(i, a);
  }, e);
}
function $0(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(n, r) {
    return t[r] === n;
  });
}
function iE(e, t) {
  if (e === t)
    return !0;
  if (!e && t || e && !t || !e || !t || Qe(e) !== "object" || Qe(t) !== "object")
    return !1;
  var n = Object.keys(e), r = Object.keys(t), i = new Set([].concat(n, r));
  return ne(i).every(function(a) {
    var o = e[a], s = t[a];
    return typeof o == "function" && typeof s == "function" ? !0 : o === s;
  });
}
function aE(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && Qe(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function vf(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r)
    return e;
  var i = e[t], a = t - n;
  return a > 0 ? [].concat(ne(e.slice(0, n)), [i], ne(e.slice(n, t)), ne(e.slice(t + 1, r))) : a < 0 ? [].concat(ne(e.slice(0, t)), ne(e.slice(t + 1, n + 1)), [i], ne(e.slice(n + 1, r))) : e;
}
var oE = Ai;
function sE(e, t) {
  return e.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return t[r];
  });
}
var gf = "CODE_LOGIC_ERROR";
function Vs(e, t, n, r, i) {
  return js.apply(this, arguments);
}
function js() {
  return js = $o(/* @__PURE__ */ Bt().mark(function e(t, n, r, i, a) {
    var o, s, c, u, d, f, m, p, v;
    return Bt().wrap(function(g) {
      for (; ; )
        switch (g.prev = g.next) {
          case 0:
            return o = ee({}, r), delete o.ruleIndex, o.validator && (s = o.validator, o.validator = function() {
              try {
                return s.apply(void 0, arguments);
              } catch (w) {
                return console.error(w), Promise.reject(gf);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new oE(De({}, t, [o])), d = oa({}, g0, i.validateMessages), u.messages(d), f = [], g.prev = 9, g.next = 12, Promise.resolve(u.validate(De({}, t, n), ee({}, i)));
          case 12:
            g.next = 17;
            break;
          case 14:
            g.prev = 14, g.t0 = g.catch(9), g.t0.errors && (f = g.t0.errors.map(function(w, C) {
              var b = w.message, y = b === gf ? d.default : b;
              return /* @__PURE__ */ L.isValidElement(y) ? /* @__PURE__ */ L.cloneElement(y, {
                key: "error_".concat(C)
              }) : y;
            }));
          case 17:
            if (!(!f.length && c)) {
              g.next = 22;
              break;
            }
            return g.next = 20, Promise.all(n.map(function(w, C) {
              return Vs("".concat(t, ".").concat(C), w, c, i, a);
            }));
          case 20:
            return m = g.sent, g.abrupt("return", m.reduce(function(w, C) {
              return [].concat(ne(w), ne(C));
            }, []));
          case 22:
            return p = ee(ee({}, r), {}, {
              name: t,
              enum: (r.enum || []).join(", ")
            }, a), v = f.map(function(w) {
              return typeof w == "string" ? sE(w, p) : w;
            }), g.abrupt("return", v);
          case 25:
          case "end":
            return g.stop();
        }
    }, e, null, [[9, 14]]);
  })), js.apply(this, arguments);
}
function lE(e, t, n, r, i, a) {
  var o = e.join("."), s = n.map(function(d, f) {
    var m = d.validator, p = ee(ee({}, d), {}, {
      ruleIndex: f
    });
    return m && (p.validator = function(v, h, g) {
      var w = !1, C = function() {
        for (var E = arguments.length, $ = new Array(E), k = 0; k < E; k++)
          $[k] = arguments[k];
        Promise.resolve().then(function() {
          pt(!w, "Your validator function has already return a promise. `callback` will be ignored."), w || g.apply(void 0, $);
        });
      }, b = m(v, h, C);
      w = b && typeof b.then == "function" && typeof b.catch == "function", pt(w, "`callback` is deprecated. Please return a promise instead."), w && b.then(function() {
        g();
      }).catch(function(y) {
        g(y || " ");
      });
    }), p;
  }).sort(function(d, f) {
    var m = d.warningOnly, p = d.ruleIndex, v = f.warningOnly, h = f.ruleIndex;
    return !!m == !!v ? p - h : m ? 1 : -1;
  }), c;
  if (i === !0)
    c = new Promise(/* @__PURE__ */ function() {
      var d = $o(/* @__PURE__ */ Bt().mark(function f(m, p) {
        var v, h, g;
        return Bt().wrap(function(C) {
          for (; ; )
            switch (C.prev = C.next) {
              case 0:
                v = 0;
              case 1:
                if (!(v < s.length)) {
                  C.next = 12;
                  break;
                }
                return h = s[v], C.next = 5, Vs(o, t, h, r, a);
              case 5:
                if (g = C.sent, !g.length) {
                  C.next = 9;
                  break;
                }
                return p([{
                  errors: g,
                  rule: h
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
        }, f);
      }));
      return function(f, m) {
        return d.apply(this, arguments);
      };
    }());
  else {
    var u = s.map(function(d) {
      return Vs(o, t, d, r, a).then(function(f) {
        return {
          errors: f,
          rule: d
        };
      });
    });
    c = (i ? uE(u) : cE(u)).then(function(d) {
      return Promise.reject(d);
    });
  }
  return c.catch(function(d) {
    return d;
  }), c;
}
function cE(e) {
  return Bs.apply(this, arguments);
}
function Bs() {
  return Bs = $o(/* @__PURE__ */ Bt().mark(function e(t) {
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
  })), Bs.apply(this, arguments);
}
function uE(e) {
  return Ws.apply(this, arguments);
}
function Ws() {
  return Ws = $o(/* @__PURE__ */ Bt().mark(function e(t) {
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
  })), Ws.apply(this, arguments);
}
var fE = ["name"], tt = [];
function yf(e, t, n, r, i, a) {
  return typeof e == "function" ? e(t, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var ec = /* @__PURE__ */ function(e) {
  lw(n, e);
  var t = fw(n);
  function n(r) {
    var i;
    if (Fi(this, n), i = t.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = tt, i.warnings = tt, i.cancelRegister = function() {
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
      var f = i.props, m = f.shouldUpdate, p = f.dependencies, v = p === void 0 ? [] : p, h = f.onReset, g = d.store, w = i.getNamePath(), C = i.getValue(c), b = i.getValue(g), y = u && Yr(u, w);
      switch (d.type === "valueUpdate" && d.source === "external" && C !== b && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent()), d.type) {
        case "reset":
          if (!u || y) {
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
          if (y) {
            var E = d.data;
            "touched" in E && (i.touched = E.touched), "validating" in E && !("originRCField" in E) && (i.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (i.errors = E.errors || tt), "warnings" in E && (i.warnings = E.warnings || tt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !w.length && yf(m, c, g, C, b, d)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var $ = v.map(be);
          if ($.some(function(k) {
            return Yr(d.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (y || (!v.length || w.length || m) && yf(m, c, g, C, b, d)) {
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
        var m = i.props, p = m.validateFirst, v = p === void 0 ? !1 : p, h = m.messageVariables, g = c || {}, w = g.triggerName, C = i.getRules();
        w && (C = C.filter(function(y) {
          return y;
        }).filter(function(y) {
          var E = y.validateTrigger;
          if (!E)
            return !0;
          var $ = Ts(E);
          return $.includes(w);
        }));
        var b = lE(u, d, C, c, v, h);
        return b.catch(function(y) {
          return y;
        }).then(function() {
          var y = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tt;
          if (i.validatePromise === f) {
            var E;
            i.validatePromise = null;
            var $ = [], k = [];
            (E = y.forEach) === null || E === void 0 || E.call(y, function(N) {
              var A = N.rule.warningOnly, P = N.errors, T = P === void 0 ? tt : P;
              A ? k.push.apply(k, ne(T)) : $.push.apply($, ne(T));
            }), i.errors = $, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), b;
      });
      return i.validatePromise = f, i.dirty = !0, i.errors = tt, i.warnings = tt, i.triggerMetaEvent(), i.reRender(), f;
    }, i.isFieldValidating = function() {
      return !!i.validatePromise;
    }, i.isFieldTouched = function() {
      return i.touched;
    }, i.isFieldDirty = function() {
      if (i.dirty || i.props.initialValue !== void 0)
        return !0;
      var c = i.props.fieldContext, u = c.getInternalHooks(kn), d = u.getInitialValue;
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
      var d = As(c);
      return d.length !== 1 || !/* @__PURE__ */ L.isValidElement(d[0]) ? {
        child: d,
        isFunction: !1
      } : {
        child: d[0],
        isFunction: !1
      };
    }, i.getValue = function(c) {
      var u = i.props.fieldContext.getFieldsValue, d = i.getNamePath();
      return Jt(c || u(!0), d);
    }, i.getControlled = function() {
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, d = u.trigger, f = u.validateTrigger, m = u.getValueFromEvent, p = u.normalize, v = u.valuePropName, h = u.getValueProps, g = u.fieldContext, w = f !== void 0 ? f : g.validateTrigger, C = i.getNamePath(), b = g.getInternalHooks, y = g.getFieldsValue, E = b(kn), $ = E.dispatch, k = i.getValue(), N = h || function(S) {
        return De({}, v, S);
      }, A = c[d], P = ee(ee({}, c), N(k));
      P[d] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var S, _ = arguments.length, x = new Array(_), F = 0; F < _; F++)
          x[F] = arguments[F];
        m ? S = m.apply(void 0, x) : S = aE.apply(void 0, [v].concat(x)), p && (S = p(S, k, y(!0))), $({
          type: "updateValue",
          namePath: C,
          value: S
        }), A && A.apply(void 0, x);
      };
      var T = Ts(w || []);
      return T.forEach(function(S) {
        var _ = P[S];
        P[S] = function() {
          _ && _.apply(void 0, arguments);
          var x = i.props.rules;
          x && x.length && $({
            type: "validateField",
            namePath: C,
            triggerName: S
          });
        };
      }), P;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(kn), s = o.initEntityValue;
      s(d0(i));
    }
    return i;
  }
  return Pi(n, [{
    key: "componentDidMount",
    value: function() {
      var i = this.props, a = i.shouldUpdate, o = i.fieldContext;
      if (this.mounted = !0, o) {
        var s = o.getInternalHooks, c = s(kn), u = c.registerField;
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
      return c ? u = s : /* @__PURE__ */ L.isValidElement(s) ? u = /* @__PURE__ */ L.cloneElement(s, this.getControlled(s.props)) : (pt(!s, "`children` of Field is not validate ReactElement."), u = s), /* @__PURE__ */ L.createElement(L.Fragment, {
        key: i
      }, u);
    }
  }]), n;
}(L.Component);
ec.contextType = An;
ec.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function tc(e) {
  var t = e.name, n = Gl(e, fE), r = L.useContext(An), i = t !== void 0 ? be(t) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(ec, _a({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var dE = /* @__PURE__ */ L.createContext(null), x0 = function(t) {
  var n = t.name, r = t.initialValue, i = t.children, a = t.rules, o = t.validateTrigger, s = L.useContext(An), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = L.useMemo(function() {
    var v = be(s.prefixName) || [];
    return [].concat(ne(v), ne(be(n)));
  }, [s.prefixName, n]), f = L.useMemo(function() {
    return ee(ee({}, s), {}, {
      prefixName: d
    });
  }, [s, d]), m = L.useMemo(function() {
    return {
      getKey: function(h) {
        var g = d.length, w = h[g];
        return [u.keys[w], h.slice(g + 1)];
      }
    };
  }, [d]);
  if (typeof i != "function")
    return pt(!1, "Form.List only accepts function as children."), null;
  var p = function(h, g, w) {
    var C = w.source;
    return C === "internal" ? !1 : h !== g;
  };
  return /* @__PURE__ */ L.createElement(dE.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(An.Provider, {
    value: f
  }, /* @__PURE__ */ L.createElement(tc, {
    name: [],
    shouldUpdate: p,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(v, h) {
    var g = v.value, w = g === void 0 ? [] : g, C = v.onChange, b = s.getFieldValue, y = function() {
      var N = b(d || []);
      return N || [];
    }, E = {
      add: function(N, A) {
        var P = y();
        A >= 0 && A <= P.length ? (u.keys = [].concat(ne(u.keys.slice(0, A)), [u.id], ne(u.keys.slice(A))), C([].concat(ne(P.slice(0, A)), [N], ne(P.slice(A))))) : (u.keys = [].concat(ne(u.keys), [u.id]), C([].concat(ne(P), [N]))), u.id += 1;
      },
      remove: function(N) {
        var A = y(), P = new Set(Array.isArray(N) ? N : [N]);
        P.size <= 0 || (u.keys = u.keys.filter(function(T, S) {
          return !P.has(S);
        }), C(A.filter(function(T, S) {
          return !P.has(S);
        })));
      },
      move: function(N, A) {
        if (N !== A) {
          var P = y();
          N < 0 || N >= P.length || A < 0 || A >= P.length || (u.keys = vf(u.keys, N, A), C(vf(P, N, A)));
        }
      }
    }, $ = w || [];
    return Array.isArray($) || ($ = []), i($.map(function(k, N) {
      var A = u.keys[N];
      return A === void 0 && (u.keys[N] = u.id, A = u.keys[N], u.id += 1), {
        name: N,
        key: A,
        isListField: !0
      };
    }), E, h);
  })));
};
function mE(e, t) {
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
function di(e, t) {
  return b0(e) || mE(e, t) || Yl(e, t) || w0();
}
function hE(e) {
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
var _0 = "__@field_split__";
function Ho(e) {
  return e.map(function(t) {
    return "".concat(Qe(t), ":").concat(t);
  }).join(_0);
}
var Hn = /* @__PURE__ */ function() {
  function e() {
    Fi(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return Pi(e, [{
    key: "set",
    value: function(n, r) {
      this.kvs.set(Ho(n), r);
    }
  }, {
    key: "get",
    value: function(n) {
      return this.kvs.get(Ho(n));
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
      this.kvs.delete(Ho(n));
    }
  }, {
    key: "map",
    value: function(n) {
      return ne(this.kvs.entries()).map(function(r) {
        var i = di(r, 2), a = i[0], o = i[1], s = a.split(_0);
        return n({
          key: s.map(function(c) {
            var u = c.match(/^([^:]*):(.*)$/), d = di(u, 3), f = d[1], m = d[2];
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
}(), pE = ["name", "errors"], vE = /* @__PURE__ */ Pi(function e(t) {
  var n = this;
  Fi(this, e), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
    return r === kn ? (n.formHooked = !0, {
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
      var a, o = oa({}, r, n.store);
      (a = n.prevWithoutPreserves) === null || a === void 0 || a.map(function(s) {
        var c = s.key;
        o = Yt(o, c, Jt(r, c));
      }), n.prevWithoutPreserves = null, n.updateStore(o);
    }
  }, this.destroyForm = function() {
    var r = new Hn();
    n.getFieldEntities(!0).forEach(function(i) {
      n.isMergedPreserve(i.isPreserve()) || r.set(i.getNamePath(), !0);
    }), n.prevWithoutPreserves = r;
  }, this.getInitialValue = function(r) {
    var i = Jt(n.initialValues, r);
    return r.length ? xo(i) : i;
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
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, i = new Hn();
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
    }), hf(n.store, o.map(be));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = be(r);
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
    var d = n.getFieldEntities(!0), f = function(g) {
      return g.isFieldTouched();
    };
    if (!c)
      return u ? d.every(f) : d.some(f);
    var m = new Hn();
    c.forEach(function(h) {
      m.set(h, []);
    }), d.forEach(function(h) {
      var g = h.getNamePath();
      c.forEach(function(w) {
        w.every(function(C, b) {
          return g[b] === C;
        }) && m.update(w, function(C) {
          return [].concat(ne(C), [h]);
        });
      });
    });
    var p = function(g) {
      return g.some(f);
    }, v = m.map(function(h) {
      var g = h.value;
      return g;
    });
    return u ? v.every(p) : v.some(p);
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
      return Yr(a, s) && o.isFieldValidating();
    });
  }, this.isFieldValidating = function(r) {
    return n.warningUnhooked(), n.isFieldsValidating([r]);
  }, this.resetWithFieldInitialValue = function() {
    var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, i = new Hn(), a = n.getFieldEntities(!0);
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
          var m = d.getNamePath(), p = n.getInitialValue(m);
          if (p !== void 0)
            pt(!1, "Form already set 'initialValues' with path '".concat(m.join("."), "'. Field can not overwrite it."));
          else {
            var v = i.get(m);
            if (v && v.size > 1)
              pt(!1, "Multiple Field with path '".concat(m.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            else if (v) {
              var h = n.getFieldValue(m);
              (!r.skipExist || h === void 0) && n.updateStore(Yt(n.store, m, ne(v)[0].value));
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
      n.updateStore(oa({}, n.initialValues)), n.resetWithFieldInitialValue(), n.notifyObservers(i, null, {
        type: "reset"
      }), n.notifyWatch();
      return;
    }
    var a = r.map(be);
    a.forEach(function(o) {
      var s = n.getInitialValue(o);
      n.updateStore(Yt(n.store, o, s));
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
      var c = Gl(o, pE), u = be(s);
      a.push(u), "value" in c && n.updateStore(Yt(n.store, u, c.value)), n.notifyObservers(i, [u], {
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
      var a = r.getNamePath(), o = Jt(n.store, a);
      o === void 0 && n.updateStore(Yt(n.store, a, i));
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
          return !$0(f.getNamePath(), i);
        })) {
          var d = n.store;
          n.updateStore(Yt(d, i, u, !0)), n.notifyObservers(d, [i], {
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
    n.updateStore(Yt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var s = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = hf(n.store, [a]);
      c(u, n.getFieldsValue());
    }
    n.triggerOnFieldsChange([a].concat(ne(s)));
  }, this.setFieldsValue = function(r) {
    n.warningUnhooked();
    var i = n.store;
    if (r) {
      var a = oa(n.store, r);
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
    var i = /* @__PURE__ */ new Set(), a = [], o = new Hn();
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
        var s = new Hn();
        i.forEach(function(u) {
          var d = u.name, f = u.errors;
          s.set(d, f);
        }), o.forEach(function(u) {
          u.errors = s.get(u.name) || u.errors;
        });
      }
      var c = o.filter(function(u) {
        var d = u.name;
        return Yr(r, d);
      });
      a(c, o);
    }
  }, this.validateFields = function(r, i) {
    n.warningUnhooked();
    var a = !!r, o = a ? r.map(be) : [], s = [];
    n.getFieldEntities(!0).forEach(function(d) {
      if (a || o.push(d.getNamePath()), (i == null ? void 0 : i.recursive) && a) {
        var f = d.getNamePath();
        f.every(function(v, h) {
          return r[h] === v || r[h] === void 0;
        }) && o.push(f);
      }
      if (!(!d.props.rules || !d.props.rules.length)) {
        var m = d.getNamePath();
        if (!a || Yr(o, m)) {
          var p = d.validateRules(ee({
            validateMessages: ee(ee({}, g0), n.validateMessages)
          }, i));
          s.push(p.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(v) {
            var h, g = [], w = [];
            return (h = v.forEach) === null || h === void 0 || h.call(v, function(C) {
              var b = C.rule.warningOnly, y = C.errors;
              b ? w.push.apply(w, ne(y)) : g.push.apply(g, ne(y));
            }), g.length ? Promise.reject({
              name: m,
              errors: g,
              warnings: w
            }) : {
              name: m,
              errors: g,
              warnings: w
            };
          }));
        }
      }
    });
    var c = hE(s);
    n.lastValidatePromise = c, c.catch(function(d) {
      return d;
    }).then(function(d) {
      var f = d.map(function(m) {
        var p = m.name;
        return p;
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
function nc(e) {
  var t = L.useRef(), n = L.useState({}), r = di(n, 2), i = r[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        i({});
      }, o = new vE(a);
      t.current = o.getForm();
    }
  return [t.current];
}
var Zs = /* @__PURE__ */ L.createContext({
  triggerFormChange: function() {
  },
  triggerFormFinish: function() {
  },
  registerForm: function() {
  },
  unregisterForm: function() {
  }
}), gE = function(t) {
  var n = t.validateMessages, r = t.onFormChange, i = t.onFormFinish, a = t.children, o = L.useContext(Zs), s = L.useRef({});
  return /* @__PURE__ */ L.createElement(Zs.Provider, {
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
        u && (s.current = ee(ee({}, s.current), {}, De({}, u, d))), o.registerForm(u, d);
      },
      unregisterForm: function(u) {
        var d = ee({}, s.current);
        delete d[u], s.current = d, o.unregisterForm(u);
      }
    })
  }, a);
}, yE = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], bE = function(t, n) {
  var r = t.name, i = t.initialValues, a = t.fields, o = t.form, s = t.preserve, c = t.children, u = t.component, d = u === void 0 ? "form" : u, f = t.validateMessages, m = t.validateTrigger, p = m === void 0 ? "onChange" : m, v = t.onValuesChange, h = t.onFieldsChange, g = t.onFinish, w = t.onFinishFailed, C = Gl(t, yE), b = L.useContext(Zs), y = nc(o), E = di(y, 1), $ = E[0], k = $.getInternalHooks(kn), N = k.useSubscribe, A = k.setInitialValues, P = k.setCallbacks, T = k.setValidateMessages, S = k.setPreserve, _ = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return $;
  }), L.useEffect(function() {
    return b.registerForm(r, $), function() {
      b.unregisterForm(r);
    };
  }, [b, $, r]), T(ee(ee({}, b.validateMessages), f)), P({
    onValuesChange: v,
    onFieldsChange: function(U) {
      if (b.triggerFormChange(r, U), h) {
        for (var q = arguments.length, X = new Array(q > 1 ? q - 1 : 0), G = 1; G < q; G++)
          X[G - 1] = arguments[G];
        h.apply(void 0, [U].concat(X));
      }
    },
    onFinish: function(U) {
      b.triggerFormFinish(r, U), g && g(U);
    },
    onFinishFailed: w
  }), S(s);
  var x = L.useRef(null);
  A(i, !x.current), x.current || (x.current = !0), L.useEffect(
    function() {
      return _;
    },
    []
  );
  var F, M = typeof c == "function";
  if (M) {
    var O = $.getFieldsValue(!0);
    F = c(O, $);
  } else
    F = c;
  N(!M);
  var I = L.useRef();
  L.useEffect(function() {
    iE(I.current || [], a || []) || $.setFields(a || []), I.current = a;
  }, [a, $]);
  var R = L.useMemo(function() {
    return ee(ee({}, $), {}, {
      validateTrigger: p
    });
  }, [$, p]), j = /* @__PURE__ */ L.createElement(An.Provider, {
    value: R
  }, F);
  return d === !1 ? j : /* @__PURE__ */ L.createElement(d, _a({}, C, {
    onSubmit: function(U) {
      U.preventDefault(), U.stopPropagation(), $.submit();
    },
    onReset: function(U) {
      var q;
      U.preventDefault(), $.resetFields(), (q = C.onReset) === null || q === void 0 || q.call(C, U);
    }
  }), j);
};
function bf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function rc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = r === void 0 ? [] : r, a = t[1], o = z(), s = di(o, 2), c = s[0], u = s[1], d = re(function() {
    return bf(c);
  }, [c]), f = D(d);
  f.current = d;
  var m = st(An), p = a || m, v = p && p._init, h = be(i), g = D(h);
  return g.current = h, K(
    function() {
      if (!!v) {
        var w = p.getFieldsValue, C = p.getInternalHooks, b = C(kn), y = b.registerWatch, E = y(function(k) {
          var N = Jt(k, g.current), A = bf(N);
          f.current !== A && (f.current = A, u(N));
        }), $ = Jt(w(), g.current);
        return u($), E;
      }
    },
    [v]
  ), c;
}
var wE = /* @__PURE__ */ L.forwardRef(bE), xr = wE;
xr.FormProvider = gE;
xr.Field = tc;
xr.List = x0;
xr.useForm = nc;
xr.useWatch = rc;
const k0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, ic = l.createContext(k0), wf = l.createContext(null), S0 = () => null;
var EE = il, CE = vi;
function $E(e, t, n) {
  (n !== void 0 && !CE(e[t], n) || n === void 0 && !(t in e)) && EE(e, t, n);
}
var O0 = $E;
function xE(e) {
  return function(t, n, r) {
    for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var _E = xE, kE = _E, SE = kE(), OE = SE, Hs = { exports: {} };
(function(e, t) {
  var n = yt, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a ? n.Buffer : void 0, s = o ? o.allocUnsafe : void 0;
  function c(u, d) {
    if (d)
      return u.slice();
    var f = u.length, m = s ? s(f) : new u.constructor(f);
    return u.copy(m), m;
  }
  e.exports = c;
})(Hs, Hs.exports);
var Ef = bd;
function FE(e) {
  var t = new e.constructor(e.byteLength);
  return new Ef(t).set(new Ef(e)), t;
}
var PE = FE, AE = PE;
function NE(e, t) {
  var n = t ? AE(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var TE = NE;
function RE(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var ME = RE, IE = Ft, Cf = Object.create, LE = function() {
  function e() {
  }
  return function(t) {
    if (!IE(t))
      return {};
    if (Cf)
      return Cf(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), DE = LE, VE = DE, jE = Cd, BE = ol;
function WE(e) {
  return typeof e.constructor == "function" && !BE(e) ? VE(jE(e)) : {};
}
var ZE = WE, HE = Na, UE = Rn;
function zE(e) {
  return UE(e) && HE(e);
}
var qE = zE;
function KE(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var F0 = KE;
function GE(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var YE = GE, XE = Ft, QE = ol, JE = YE, eC = Object.prototype, tC = eC.hasOwnProperty;
function nC(e) {
  if (!XE(e))
    return JE(e);
  var t = QE(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !tC.call(e, r)) || n.push(r);
  return n;
}
var rC = nC, iC = ld, aC = rC, oC = Na;
function sC(e) {
  return oC(e) ? iC(e, !0) : aC(e);
}
var P0 = sC, lC = td, cC = P0;
function uC(e) {
  return lC(e, cC(e));
}
var fC = uC, $f = O0, dC = Hs.exports, mC = TE, hC = ME, pC = ZE, xf = sd, _f = Ta, vC = qE, gC = ei.exports, yC = rl, bC = Ft, wC = s6, EC = al, kf = F0, CC = fC;
function $C(e, t, n, r, i, a, o) {
  var s = kf(e, n), c = kf(t, n), u = o.get(c);
  if (u) {
    $f(e, n, u);
    return;
  }
  var d = a ? a(s, c, n + "", e, t, o) : void 0, f = d === void 0;
  if (f) {
    var m = _f(c), p = !m && gC(c), v = !m && !p && EC(c);
    d = c, m || p || v ? _f(s) ? d = s : vC(s) ? d = hC(s) : p ? (f = !1, d = dC(c, !0)) : v ? (f = !1, d = mC(c, !0)) : d = [] : wC(c) || xf(c) ? (d = s, xf(s) ? d = CC(s) : (!bC(s) || yC(s)) && (d = pC(c))) : f = !1;
  }
  f && (o.set(c, d), i(d, c, r, a, o), o.delete(c)), $f(e, n, d);
}
var xC = $C, _C = gd, kC = O0, SC = OE, OC = xC, FC = Ft, PC = P0, AC = F0;
function A0(e, t, n, r, i) {
  e !== t && SC(t, function(a, o) {
    if (i || (i = new _C()), FC(a))
      OC(e, t, o, n, A0, r, i);
    else {
      var s = r ? r(AC(e, o), a, o + "", e, t, i) : void 0;
      s === void 0 && (s = a), kC(e, o, s);
    }
  }, PC);
}
var NC = A0, TC = NC, RC = ad, MC = RC(function(e, t, n) {
  TC(e, t, n);
}), IC = MC;
const N0 = (e) => l.createElement(x0, {
  name: e.name,
  initialValue: e.initialValue
}, (t, n) => {
  const r = t.map((a) => ({
    index: a.name,
    key: a.key
  })), i = e.children(r, n).map((a, o) => {
    var s;
    return l.createElement(St, {
      key: r[o].key,
      mode: "card",
      header: (s = e.renderHeader) === null || s === void 0 ? void 0 : s.call(e, r[o], n)
    }, a);
  });
  return e.renderAdd && i.push(l.createElement(St, {
    key: "add",
    mode: "card"
  }, l.createElement(St.Item, {
    className: "adm-form-list-operation",
    onClick: () => {
      e.onAdd ? e.onAdd(n) : n.add();
    },
    arrow: !1
  }, e.renderAdd()))), l.createElement(l.Fragment, null, i);
}), Sf = "adm-form", LC = k0, DC = de((e, t) => {
  const n = Z(LC, e), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: s,
    footer: c,
    mode: u,
    disabled: d,
    requiredMarkStyle: f
  } = n, m = hi(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: p
  } = he(), v = re(() => IC({}, p.Form.defaultValidateMessages, m.validateMessages), [p.Form.defaultValidateMessages, m.validateMessages]), h = [];
  let g = null, w = [], C = 0;
  function b() {
    w.length !== 0 && (C += 1, h.push(l.createElement(St, {
      header: g,
      key: C,
      mode: u
    }, w)), w = []);
  }
  return sn(n.children, (y) => {
    if (l.isValidElement(y)) {
      if (y.type === S0) {
        b(), g = y.props.children;
        return;
      }
      if (y.type === N0) {
        b(), h.push(y);
        return;
      }
    }
    w.push(y);
  }), b(), l.createElement(xr, Object.assign({
    className: V(Sf, r),
    style: i,
    ref: t
  }, m, {
    validateMessages: v
  }), l.createElement(ic.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: f,
      disabled: d
    }
  }, h), c && l.createElement("div", {
    className: `${Sf}-footer`
  }, c));
});
var mi = {}, Ni = { exports: {} }, T0 = { exports: {} };
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(T0);
(function(e) {
  var t = T0.exports.default;
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
})(Ni);
var Ti = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ti);
var ut = {};
Object.defineProperty(ut, "__esModule", {
  value: !0
});
ut.call = ac;
ut.default = void 0;
ut.note = I0;
ut.noteOnce = D0;
ut.preMessage = void 0;
ut.resetWarned = L0;
ut.warning = M0;
ut.warningOnce = Ri;
var Us = {}, R0 = function(t) {
};
ut.preMessage = R0;
function M0(e, t) {
}
function I0(e, t) {
}
function L0() {
  Us = {};
}
function ac(e, t, n) {
  !t && !Us[n] && (e(!1, n), Us[n] = !0);
}
function Ri(e, t) {
  ac(M0, e, t);
}
function D0(e, t) {
  ac(I0, e, t);
}
Ri.preMessage = R0;
Ri.resetWarned = L0;
Ri.noteOnce = D0;
var VC = Ri;
ut.default = VC;
var jC = Ni.exports.default, BC = Ti.exports.default;
Object.defineProperty(mi, "__esModule", {
  value: !0
});
var V0 = mi.default = mi.HOOK_MARK = void 0, WC = BC(ut), ZC = jC(l), HC = "RC_FORM_INTERNAL_HOOKS";
mi.HOOK_MARK = HC;
var le = function() {
  (0, WC.default)(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, UC = /* @__PURE__ */ ZC.createContext({
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
}), zC = UC;
V0 = mi.default = zC;
function Uo(e) {
  return e === void 0 || e === !1 ? [] : Array.isArray(e) ? e : [e];
}
function qC(e) {
  const t = e.prototype;
  return !!(t && t.isReactComponent);
}
function KC(e) {
  return typeof e == "function" && !qC(e) && e.defaultProps === void 0;
}
function j0(e) {
  return $a.exports.isFragment(e) ? !1 : $a.exports.isMemo(e) ? j0(e.type) : !KC(e.type);
}
const GC = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
})))));
function Mi(e) {
  return e.split("-")[1];
}
function oc(e) {
  return e === "y" ? "height" : "width";
}
function an(e) {
  return e.split("-")[0];
}
function _r(e) {
  return ["top", "bottom"].includes(an(e)) ? "x" : "y";
}
function Of(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const a = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, s = _r(t), c = oc(s), u = r[c] / 2 - i[c] / 2, d = an(t), f = s === "x";
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
  switch (Mi(t)) {
    case "start":
      m[s] -= u * (n && f ? -1 : 1);
      break;
    case "end":
      m[s] += u * (n && f ? -1 : 1);
      break;
  }
  return m;
}
const YC = async (e, t, n) => {
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
  } = Of(u, r, c), m = r, p = {}, v = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: g,
      fn: w
    } = s[h], {
      x: C,
      y: b,
      data: y,
      reset: E
    } = await w({
      x: d,
      y: f,
      initialPlacement: r,
      placement: m,
      strategy: i,
      middlewareData: p,
      rects: u,
      platform: o,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (d = C != null ? C : d, f = b != null ? b : f, p = {
      ...p,
      [g]: {
        ...p[g],
        ...y
      }
    }, E && v <= 50) {
      v++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : E.rects), {
        x: d,
        y: f
      } = Of(u, m, c)), h = -1;
      continue;
    }
  }
  return {
    x: d,
    y: f,
    placement: m,
    strategy: i,
    middlewareData: p
  };
};
function XC(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function B0(e) {
  return typeof e != "number" ? XC(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Sa(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
async function Oa(e, t) {
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
    padding: p = 0
  } = t, v = B0(p), g = s[m ? f === "floating" ? "reference" : "floating" : f], w = Sa(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: c
  })), C = f === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, b = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), y = await (a.isElement == null ? void 0 : a.isElement(b)) ? await (a.getScale == null ? void 0 : a.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Sa(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: C,
    offsetParent: b,
    strategy: c
  }) : C);
  return {
    top: (w.top - E.top + v.top) / y.y,
    bottom: (E.bottom - w.bottom + v.bottom) / y.y,
    left: (w.left - E.left + v.left) / y.x,
    right: (E.right - w.right + v.right) / y.x
  };
}
const QC = Math.min, JC = Math.max;
function zs(e, t, n) {
  return JC(e, QC(t, n));
}
const e$ = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      element: n,
      padding: r = 0
    } = e || {}, {
      x: i,
      y: a,
      placement: o,
      rects: s,
      platform: c,
      elements: u
    } = t;
    if (n == null)
      return {};
    const d = B0(r), f = {
      x: i,
      y: a
    }, m = _r(o), p = oc(m), v = await c.getDimensions(n), h = m === "y", g = h ? "top" : "left", w = h ? "bottom" : "right", C = h ? "clientHeight" : "clientWidth", b = s.reference[p] + s.reference[m] - f[m] - s.floating[p], y = f[m] - s.reference[m], E = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(n));
    let $ = E ? E[C] : 0;
    (!$ || !await (c.isElement == null ? void 0 : c.isElement(E))) && ($ = u.floating[C] || s.floating[p]);
    const k = b / 2 - y / 2, N = d[g], A = $ - v[p] - d[w], P = $ / 2 - v[p] / 2 + k, T = zs(N, P, A), _ = Mi(o) != null && P != T && s.reference[p] / 2 - (P < N ? d[g] : d[w]) - v[p] / 2 < 0 ? P < N ? N - P : A - P : 0;
    return {
      [m]: f[m] - _,
      data: {
        [m]: T,
        centerOffset: P - T
      }
    };
  }
}), t$ = ["top", "right", "bottom", "left"], n$ = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Fa(e) {
  return e.replace(/left|right|bottom|top/g, (t) => n$[t]);
}
function r$(e, t, n) {
  n === void 0 && (n = !1);
  const r = Mi(e), i = _r(e), a = oc(i);
  let o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (o = Fa(o)), {
    main: o,
    cross: Fa(o)
  };
}
const i$ = {
  start: "end",
  end: "start"
};
function qs(e) {
  return e.replace(/start|end/g, (t) => i$[t]);
}
function a$(e) {
  const t = Fa(e);
  return [qs(e), t, qs(t)];
}
function o$(e, t, n) {
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
function s$(e, t, n, r) {
  const i = Mi(e);
  let a = o$(an(e), n === "start", r);
  return i && (a = a.map((o) => o + "-" + i), t && (a = a.concat(a.map(qs)))), a;
}
const l$ = function(e) {
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
        fallbackAxisSideDirection: p = "none",
        flipAlignment: v = !0,
        ...h
      } = e, g = an(r), w = an(o) === o, C = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = f || (w || !v ? [Fa(o)] : a$(o));
      !f && p !== "none" && b.push(...s$(o, v, p, C));
      const y = [o, ...b], E = await Oa(t, h), $ = [];
      let k = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (u && $.push(E[g]), d) {
        const {
          main: T,
          cross: S
        } = r$(r, a, C);
        $.push(E[T], E[S]);
      }
      if (k = [...k, {
        placement: r,
        overflows: $
      }], !$.every((T) => T <= 0)) {
        var N, A;
        const T = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, S = y[T];
        if (S)
          return {
            data: {
              index: T,
              overflows: k
            },
            reset: {
              placement: S
            }
          };
        let _ = (A = k.filter((x) => x.overflows[0] <= 0).sort((x, F) => x.overflows[1] - F.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!_)
          switch (m) {
            case "bestFit": {
              var P;
              const x = (P = k.map((F) => [F.placement, F.overflows.filter((M) => M > 0).reduce((M, O) => M + O, 0)]).sort((F, M) => F[1] - M[1])[0]) == null ? void 0 : P[0];
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
function Ff(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Pf(e) {
  return t$.some((t) => e[t] >= 0);
}
const c$ = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        strategy: n = "referenceHidden",
        ...r
      } = e, {
        rects: i
      } = t;
      switch (n) {
        case "referenceHidden": {
          const a = await Oa(t, {
            ...r,
            elementContext: "reference"
          }), o = Ff(a, i.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Pf(o)
            }
          };
        }
        case "escaped": {
          const a = await Oa(t, {
            ...r,
            altBoundary: !0
          }), o = Ff(a, i.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Pf(o)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function u$(e, t) {
  const {
    placement: n,
    platform: r,
    elements: i
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = an(n), s = Mi(n), c = _r(n) === "x", u = ["left", "top"].includes(o) ? -1 : 1, d = a && c ? -1 : 1, f = typeof t == "function" ? t(e) : t;
  let {
    mainAxis: m,
    crossAxis: p,
    alignmentAxis: v
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
  return s && typeof v == "number" && (p = s === "end" ? v * -1 : v), c ? {
    x: p * d,
    y: m * u
  } : {
    x: m * u,
    y: p * d
  };
}
const f$ = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r
      } = t, i = await u$(t, e);
      return {
        x: n + i.x,
        y: r + i.y,
        data: i
      };
    }
  };
};
function W0(e) {
  return e === "x" ? "y" : "x";
}
const d$ = function(e) {
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
              x: w,
              y: C
            } = g;
            return {
              x: w,
              y: C
            };
          }
        },
        ...c
      } = e, u = {
        x: n,
        y: r
      }, d = await Oa(t, c), f = _r(an(i)), m = W0(f);
      let p = u[f], v = u[m];
      if (a) {
        const g = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", C = p + d[g], b = p - d[w];
        p = zs(C, p, b);
      }
      if (o) {
        const g = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", C = v + d[g], b = v - d[w];
        v = zs(C, v, b);
      }
      const h = s.fn({
        ...t,
        [f]: p,
        [m]: v
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
}, m$ = function(e) {
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
      } = e, d = {
        x: n,
        y: r
      }, f = _r(i), m = W0(f);
      let p = d[f], v = d[m];
      const h = typeof s == "function" ? s(t) : s, g = typeof h == "number" ? {
        mainAxis: h,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...h
      };
      if (c) {
        const b = f === "y" ? "height" : "width", y = a.reference[f] - a.floating[b] + g.mainAxis, E = a.reference[f] + a.reference[b] - g.mainAxis;
        p < y ? p = y : p > E && (p = E);
      }
      if (u) {
        var w, C;
        const b = f === "y" ? "width" : "height", y = ["top", "left"].includes(an(i)), E = a.reference[m] - a.floating[b] + (y && ((w = o.offset) == null ? void 0 : w[m]) || 0) + (y ? 0 : g.crossAxis), $ = a.reference[m] + a.reference[b] + (y ? 0 : ((C = o.offset) == null ? void 0 : C[m]) || 0) - (y ? g.crossAxis : 0);
        v < E ? v = E : v > $ && (v = $);
      }
      return {
        [f]: p,
        [m]: v
      };
    }
  };
};
function Ge(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function vt(e) {
  return Ge(e).getComputedStyle(e);
}
function Z0(e) {
  return e instanceof Ge(e).Node;
}
function on(e) {
  return Z0(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Yi;
function H0() {
  if (Yi)
    return Yi;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Yi = e.brands.map((t) => t.brand + "/" + t.version).join(" "), Yi) : navigator.userAgent;
}
function gt(e) {
  return e instanceof Ge(e).HTMLElement;
}
function Ye(e) {
  return e instanceof Ge(e).Element;
}
function Af(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = Ge(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ii(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = vt(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function h$(e) {
  return ["table", "td", "th"].includes(on(e));
}
function sc(e) {
  const t = /firefox/i.test(H0()), n = vt(e), r = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || (r ? r !== "none" : !1) || t && n.willChange === "filter" || t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective"].some((i) => n.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const a = n.contain;
    return a != null ? a.includes(i) : !1;
  });
}
function lc() {
  return /^((?!chrome|android).)*safari/i.test(H0());
}
function _o(e) {
  return ["html", "body", "#document"].includes(on(e));
}
const Nf = Math.min, Xr = Math.max, Pa = Math.round;
function U0(e) {
  const t = vt(e);
  let n = parseFloat(t.width), r = parseFloat(t.height);
  const i = gt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Pa(n) !== a || Pa(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    fallback: s
  };
}
function z0(e) {
  return Ye(e) ? e : e.contextElement;
}
const q0 = {
  x: 1,
  y: 1
};
function er(e) {
  const t = z0(e);
  if (!gt(t))
    return q0;
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    fallback: a
  } = U0(t);
  let o = (a ? Pa(n.width) : n.width) / r, s = (a ? Pa(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
function Nn(e, t, n, r) {
  var i, a;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = z0(e);
  let c = q0;
  t && (r ? Ye(r) && (c = er(r)) : c = er(e));
  const u = s ? Ge(s) : window, d = lc() && n;
  let f = (o.left + (d && ((i = u.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / c.x, m = (o.top + (d && ((a = u.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / c.y, p = o.width / c.x, v = o.height / c.y;
  if (s) {
    const h = Ge(s), g = r && Ye(r) ? Ge(r) : r;
    let w = h.frameElement;
    for (; w && r && g !== h; ) {
      const C = er(w), b = w.getBoundingClientRect(), y = getComputedStyle(w);
      b.x += (w.clientLeft + parseFloat(y.paddingLeft)) * C.x, b.y += (w.clientTop + parseFloat(y.paddingTop)) * C.y, f *= C.x, m *= C.y, p *= C.x, v *= C.y, f += b.x, m += b.y, w = Ge(w).frameElement;
    }
  }
  return Sa({
    width: p,
    height: v,
    x: f,
    y: m
  });
}
function ln(e) {
  return ((Z0(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function ko(e) {
  return Ye(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function p$(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const i = gt(n), a = ln(n);
  if (n === a)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = {
    x: 1,
    y: 1
  };
  const c = {
    x: 0,
    y: 0
  };
  if ((i || !i && r !== "fixed") && ((on(n) !== "body" || Ii(a)) && (o = ko(n)), gt(n))) {
    const u = Nn(n);
    s = er(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - o.scrollLeft * s.x + c.x,
    y: t.y * s.y - o.scrollTop * s.y + c.y
  };
}
function K0(e) {
  return Nn(ln(e)).left + ko(e).scrollLeft;
}
function v$(e) {
  const t = ln(e), n = ko(e), r = e.ownerDocument.body, i = Xr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Xr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + K0(e);
  const s = -n.scrollTop;
  return vt(r).direction === "rtl" && (o += Xr(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function or(e) {
  if (on(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || Af(e) && e.host || ln(e);
  return Af(t) ? t.host : t;
}
function G0(e) {
  const t = or(e);
  return _o(t) ? t.ownerDocument.body : gt(t) && Ii(t) ? t : G0(t);
}
function Qr(e, t) {
  var n;
  t === void 0 && (t = []);
  const r = G0(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Ge(r);
  return i ? t.concat(a, a.visualViewport || [], Ii(r) ? r : []) : t.concat(r, Qr(r));
}
function g$(e, t) {
  const n = Ge(e), r = ln(e), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = lc();
    (!u || u && t === "fixed") && (s = i.offsetLeft, c = i.offsetTop);
  }
  return {
    width: a,
    height: o,
    x: s,
    y: c
  };
}
function y$(e, t) {
  const n = Nn(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = gt(e) ? er(e) : {
    x: 1,
    y: 1
  }, o = e.clientWidth * a.x, s = e.clientHeight * a.y, c = i * a.x, u = r * a.y;
  return {
    width: o,
    height: s,
    x: c,
    y: u
  };
}
function Tf(e, t, n) {
  let r;
  if (t === "viewport")
    r = g$(e, n);
  else if (t === "document")
    r = v$(ln(e));
  else if (Ye(t))
    r = y$(t, n);
  else {
    const o = {
      ...t
    };
    if (lc()) {
      var i, a;
      const s = Ge(e);
      o.x -= ((i = s.visualViewport) == null ? void 0 : i.offsetLeft) || 0, o.y -= ((a = s.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    }
    r = o;
  }
  return Sa(r);
}
function Y0(e, t) {
  const n = or(e);
  return n === t || !Ye(n) || _o(n) ? !1 : vt(n).position === "fixed" || Y0(n, t);
}
function b$(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Qr(e).filter((s) => Ye(s) && on(s) !== "body"), i = null;
  const a = vt(e).position === "fixed";
  let o = a ? or(e) : e;
  for (; Ye(o) && !_o(o); ) {
    const s = vt(o), c = sc(o);
    !c && s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || Ii(o) && !c && Y0(e, o)) ? r = r.filter((d) => d !== o) : i = s, o = or(o);
  }
  return t.set(e, r), r;
}
function w$(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: i
  } = e;
  const o = [...n === "clippingAncestors" ? b$(t, this._c) : [].concat(n), r], s = o[0], c = o.reduce((u, d) => {
    const f = Tf(t, d, i);
    return u.top = Xr(f.top, u.top), u.right = Nf(f.right, u.right), u.bottom = Nf(f.bottom, u.bottom), u.left = Xr(f.left, u.left), u;
  }, Tf(t, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function E$(e) {
  return U0(e);
}
function Rf(e, t) {
  return !gt(e) || vt(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function C$(e) {
  let t = or(e);
  for (; gt(t) && !_o(t); ) {
    if (sc(t))
      return t;
    t = or(t);
  }
  return null;
}
function Mf(e, t) {
  const n = Ge(e);
  if (!gt(e))
    return n;
  let r = Rf(e, t);
  for (; r && h$(r) && vt(r).position === "static"; )
    r = Rf(r, t);
  return r && (on(r) === "html" || on(r) === "body" && vt(r).position === "static" && !sc(r)) ? n : r || C$(e) || n;
}
function $$(e, t, n) {
  const r = gt(t), i = ln(t), a = Nn(e, !0, n === "fixed", t);
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((on(t) !== "body" || Ii(i)) && (o = ko(t)), gt(t)) {
      const c = Nn(t, !0);
      s.x = c.x + t.clientLeft, s.y = c.y + t.clientTop;
    } else
      i && (s.x = K0(i));
  return {
    x: a.left + o.scrollLeft - s.x,
    y: a.top + o.scrollTop - s.y,
    width: a.width,
    height: a.height
  };
}
const x$ = {
  getClippingRect: w$,
  convertOffsetParentRelativeRectToViewportRelativeRect: p$,
  isElement: Ye,
  getDimensions: E$,
  getOffsetParent: Mf,
  getDocumentElement: ln,
  getScale: er,
  async getElementRects(e) {
    let {
      reference: t,
      floating: n,
      strategy: r
    } = e;
    const i = this.getOffsetParent || Mf, a = this.getDimensions;
    return {
      reference: $$(t, await i(n), r),
      floating: {
        x: 0,
        y: 0,
        ...await a(n)
      }
    };
  },
  getClientRects: (e) => Array.from(e.getClientRects()),
  isRTL: (e) => vt(e).direction === "rtl"
};
function _$(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = !0,
    animationFrame: s = !1
  } = r, c = i || a ? [...Ye(e) ? Qr(e) : e.contextElement ? Qr(e.contextElement) : [], ...Qr(t)] : [];
  c.forEach((p) => {
    const v = !Ye(p) && p.toString().includes("V");
    i && (s ? v : !0) && p.addEventListener("scroll", n, {
      passive: !0
    }), a && p.addEventListener("resize", n);
  });
  let u = null;
  o && (u = new ResizeObserver(() => {
    n();
  }), Ye(e) && !s && u.observe(e), !Ye(e) && e.contextElement && !s && u.observe(e.contextElement), u.observe(t));
  let d, f = s ? Nn(e) : null;
  s && m();
  function m() {
    const p = Nn(e);
    f && (p.x !== f.x || p.y !== f.y || p.width !== f.width || p.height !== f.height) && n(), f = p, d = requestAnimationFrame(m);
  }
  return n(), () => {
    var p;
    c.forEach((v) => {
      i && v.removeEventListener("scroll", n), a && v.removeEventListener("resize", n);
    }), (p = u) == null || p.disconnect(), u = null, s && cancelAnimationFrame(d);
  };
}
const k$ = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), i = {
    platform: x$,
    ...n
  }, a = {
    ...i.platform,
    _c: r
  };
  return YC(e, t, {
    ...i,
    platform: a
  });
};
class S$ extends l.Component {
  constructor() {
    super(...arguments), this.element = null;
  }
  componentDidMount() {
    this.componentDidUpdate();
  }
  componentDidUpdate() {
    const t = Fm(this);
    t instanceof Element ? this.element = t : this.element = null;
  }
  render() {
    return l.Children.only(this.props.children);
  }
}
const O$ = {
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
  leftTop: "left-start",
  leftBottom: "left-end",
  rightTop: "right-start",
  rightBottom: "right-end"
};
function F$(e) {
  var t;
  return (t = O$[e]) !== null && t !== void 0 ? t : e;
}
let Xn = null, tr = null;
cr && (Xn = document.createElement("div"), Xn.className = "adm-px-tester", Xn.style.setProperty("--size", "10"), document.body.appendChild(Xn), tr = document.createElement("div"), tr.className = "adm-px-tester", document.body.appendChild(tr));
function On(e) {
  return Xn === null || tr === null || Xn.getBoundingClientRect().height === 10 ? e : (tr.style.setProperty("--size", e.toString()), tr.getBoundingClientRect().height);
}
const fn = "adm-popover", P$ = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body
}, X0 = de((e, t) => {
  const n = Z(P$, e), {
    mode: r = "light"
  } = n, i = F$(n.placement), [a, o] = te({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  pe(t, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: a
  }), [a]);
  const s = D(null), c = D(null), u = D(null), d = nn(n.stopPropagation, B(n, l.createElement("div", {
    className: V(fn, `${fn}-${r}`, !a && `${fn}-hidden`),
    ref: c
  }, l.createElement("div", {
    className: `${fn}-arrow`,
    ref: u
  }, l.createElement(GC, {
    className: `${fn}-arrow-icon`
  })), l.createElement("div", {
    className: `${fn}-inner`
  }, l.createElement("div", {
    className: `${fn}-inner-content`
  }, n.content))))), [f, m] = z(null);
  function p() {
    var h, g, w;
    return Ee(this, void 0, void 0, function* () {
      const C = (g = (h = s.current) === null || h === void 0 ? void 0 : h.element) !== null && g !== void 0 ? g : null, b = c.current, y = u.current;
      if (m(C), !C || !b || !y)
        return;
      const {
        x: E,
        y: $,
        placement: k,
        middlewareData: N
      } = yield k$(C, b, {
        placement: i,
        middleware: [f$(On(12)), d$({
          padding: On(4),
          crossAxis: !1,
          limiter: m$()
        }), l$(), c$(), e$({
          element: y,
          padding: On(12)
        })]
      });
      Object.assign(b.style, {
        left: `${E}px`,
        top: `${$}px`
      });
      const A = k.split("-")[0], P = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[A], {
        x: T,
        y: S
      } = (w = N.arrow) !== null && w !== void 0 ? w : {};
      Object.assign(y.style, {
        left: T != null ? `${T}px` : "",
        top: S != null ? `${S}px` : "",
        right: "",
        bottom: "",
        [P]: "calc(var(--arrow-size) * -1)"
      });
      const _ = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[A];
      y.style.setProperty("--arrow-icon-rotate", _);
    });
  }
  $e(() => {
    p();
  }), K(() => {
    if (!f || !n.trigger)
      return;
    function h() {
      o((g) => !g);
    }
    return f.addEventListener("click", h), () => {
      f.removeEventListener("click", h);
    };
  }, [f, n.trigger]), K(() => {
    const h = c.current;
    if (!(!f || !h))
      return _$(f, h, p, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), pd(() => {
    !n.trigger || o(!1);
  }, [() => {
    var h;
    return (h = s.current) === null || h === void 0 ? void 0 : h.element;
  }, c], ["click", "touchmove"]);
  const v = Ya(a, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(S$, {
    ref: s
  }, n.children), v && br(n.getContainer, d));
}), dn = "adm-popover-menu", A$ = de((e, t) => {
  const n = D(null);
  pe(t, () => n.current, []);
  const r = Xe((a) => {
    var o;
    const {
      onAction: s
    } = e;
    s && s(a), (o = n.current) === null || o === void 0 || o.hide();
  }, [e.onAction]), i = re(() => l.createElement("div", {
    className: `${dn}-list`
  }, l.createElement("div", {
    className: `${dn}-list-inner`
  }, e.actions.map((a, o) => {
    var s;
    return l.createElement("a", {
      key: (s = a.key) !== null && s !== void 0 ? s : o,
      className: V(`${dn}-item`, "adm-plain-anchor", a.disabled && `${dn}-item-disabled`),
      onClick: () => {
        var c;
        a.disabled || (r(a), (c = a.onClick) === null || c === void 0 || c.call(a));
      }
    }, a.icon && l.createElement("div", {
      className: `${dn}-item-icon`
    }, a.icon), l.createElement("div", {
      className: `${dn}-item-text`
    }, a.text));
  }))), [e.actions, r]);
  return l.createElement(X0, Object.assign({
    ref: n
  }, e, {
    className: V(dn, e.className),
    content: i
  }), e.children);
}), Q0 = ie(X0, {
  Menu: A$
});
function N$(...e) {
  let t;
  for (t = 0; t < e.length && e[t] === void 0; t++)
    ;
  return e[t];
}
const T$ = "__SPLIT__", We = "adm-form-item", R$ = l.memo(({
  children: e
}) => e, (e, t) => e.value === t.value && e.update === t.update), M$ = (e) => {
  var t;
  const {
    className: n,
    style: r,
    extra: i,
    label: a,
    help: o,
    required: s,
    children: c,
    htmlFor: u,
    hidden: d,
    arrow: f,
    childElementPosition: m = "normal"
  } = e, p = st(ic), {
    locale: v
  } = he(), h = e.hasFeedback !== void 0 ? e.hasFeedback : p.hasFeedback, g = e.layout || p.layout, w = (t = e.disabled) !== null && t !== void 0 ? t : p.disabled, C = (() => {
    const {
      requiredMarkStyle: E
    } = p;
    switch (E) {
      case "asterisk":
        return s && l.createElement("span", {
          className: `${We}-required-asterisk`
        }, "*");
      case "text-required":
        return s && l.createElement("span", {
          className: `${We}-required-text`
        }, "(", v.Form.required, ")");
      case "text-optional":
        return !s && l.createElement("span", {
          className: `${We}-required-text`
        }, "(", v.Form.optional, ")");
      case "none":
        return null;
      default:
        return null;
    }
  })(), b = a ? l.createElement("label", {
    className: `${We}-label`,
    htmlFor: u
  }, a, C, o && l.createElement(Q0, {
    content: o,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${We}-label-help`,
    onClick: (E) => {
      E.preventDefault();
    }
  }, l.createElement(w8, null)))) : null, y = e.description || h ? l.createElement(l.Fragment, null, e.description, h && l.createElement(l.Fragment, null, e.errors.map((E, $) => l.createElement("div", {
    key: `error-${$}`,
    className: `${We}-feedback-error`
  }, E)), e.warnings.map((E, $) => l.createElement("div", {
    key: `warning-${$}`,
    className: `${We}-feedback-warning`
  }, E)))) : null;
  return B(e, l.createElement(St.Item, {
    style: r,
    title: g === "vertical" && b,
    prefix: g === "horizontal" && b,
    extra: i,
    description: y,
    className: V(We, n, `${We}-${g}`, {
      [`${We}-hidden`]: d,
      [`${We}-has-error`]: e.errors.length
    }),
    disabled: w,
    onClick: e.onClick,
    clickable: e.clickable,
    arrow: f
  }, l.createElement("div", {
    className: V(`${We}-child`, `${We}-child-position-${m}`)
  }, l.createElement("div", {
    className: V(`${We}-child-inner`)
  }, c))));
}, I$ = (e) => {
  const {
    className: t,
    style: n,
    label: r,
    help: i,
    extra: a,
    hasFeedback: o,
    name: s,
    required: c,
    noStyle: u,
    hidden: d,
    layout: f,
    childElementPosition: m,
    description: p,
    disabled: v,
    rules: h,
    children: g,
    messageVariables: w,
    trigger: C = "onChange",
    validateTrigger: b = C,
    onClick: y,
    shouldUpdate: E,
    dependencies: $,
    clickable: k,
    arrow: N
  } = e, A = hi(e, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: P
  } = st(ic), {
    validateTrigger: T
  } = st(V0), S = N$(b, T, C), _ = D(null), x = D(0);
  x.current += 1;
  const [F, M] = z({}), O = Xe((q, X) => {
    M((G) => {
      const Se = Object.assign({}, G), Oe = X.join(T$);
      return q.destroy ? delete Se[Oe] : Se[Oe] = q, Se;
    });
  }, [M]);
  function I(q, X, G, Se) {
    var Oe, ve;
    if (u && !d)
      return q;
    const ge = (Oe = G == null ? void 0 : G.errors) !== null && Oe !== void 0 ? Oe : [], we = Object.keys(F).reduce((Fe, cn) => {
      var bt, ft;
      const kr = (ft = (bt = F[cn]) === null || bt === void 0 ? void 0 : bt.errors) !== null && ft !== void 0 ? ft : [];
      return kr.length && (Fe = [...Fe, ...kr]), Fe;
    }, ge), In = (ve = G == null ? void 0 : G.warnings) !== null && ve !== void 0 ? ve : [], je = Object.keys(F).reduce((Fe, cn) => {
      var bt, ft;
      const kr = (ft = (bt = F[cn]) === null || bt === void 0 ? void 0 : bt.warnings) !== null && ft !== void 0 ? ft : [];
      return kr.length && (Fe = [...Fe, ...kr]), Fe;
    }, In);
    return B(e, l.createElement(M$, {
      className: t,
      style: n,
      label: r,
      extra: a,
      help: i,
      description: p,
      required: Se,
      disabled: v,
      hasFeedback: o,
      htmlFor: X,
      errors: we,
      warnings: je,
      onClick: y && ((Fe) => y(Fe, _)),
      hidden: d,
      layout: f,
      childElementPosition: m,
      clickable: k,
      arrow: N
    }, l.createElement(wf.Provider, {
      value: O
    }, q)));
  }
  const R = typeof g == "function";
  if (!s && !R && !e.dependencies)
    return I(g);
  let j = {};
  j.label = typeof r == "string" ? r : "", w && (j = Object.assign(Object.assign({}, j), w));
  const H = st(wf), U = (q) => {
    if (u && H) {
      const X = q.name;
      H(q, X);
    }
  };
  return l.createElement(tc, Object.assign({}, A, {
    name: s,
    shouldUpdate: E,
    dependencies: $,
    rules: h,
    trigger: C,
    validateTrigger: S,
    onMetaChange: U,
    messageVariables: j
  }), (q, X, G) => {
    let Se = null;
    const Oe = c !== void 0 ? c : h && h.some((we) => !!(we && typeof we == "object" && we.required)), ve = Uo(s).length && X ? X.name : [], ge = (ve.length > 0 && P ? [P, ...ve] : ve).join("_");
    if (E && $ && Ie("Form.Item", "`shouldUpdate` and `dependencies` shouldn't be used together."), R)
      (E || $) && !s ? Se = g(G) : (E || $ || Ie("Form.Item", "`children` of render props only work with `shouldUpdate` or `dependencies`."), s && Ie("Form.Item", "Do not use `name` with `children` of render props since it's not a field."));
    else if ($ && !s)
      Ie("Form.Item", "Must set `name` or use render props when `dependencies` is set.");
    else if (l.isValidElement(g)) {
      g.props.defaultValue && Ie("Form.Item", "`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.");
      const we = Object.assign(Object.assign({}, g.props), q);
      j0(g) && (we.ref = (je) => {
        const Fe = g.ref;
        Fe && (typeof Fe == "function" && Fe(je), "current" in Fe && (Fe.current = je)), _.current = je;
      }), we.id || (we.id = ge), (/* @__PURE__ */ new Set([...Uo(C), ...Uo(S)])).forEach((je) => {
        we[je] = (...Fe) => {
          var cn, bt, ft;
          (cn = q[je]) === null || cn === void 0 || cn.call(q, ...Fe), (ft = (bt = g.props)[je]) === null || ft === void 0 || ft.call(bt, ...Fe);
        };
      }), Se = l.createElement(R$, {
        value: q[e.valuePropName || "value"],
        update: x.current
      }, l.cloneElement(g, we));
    } else
      s && Ie("Form.Item", "`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead."), Se = g;
    return I(Se, ge, X, Oe);
  });
}, L$ = (e) => {
  const t = md(), n = st(An), r = n.getFieldsValue(e.to), i = l.useMemo(() => e.children(r, n), [JSON.stringify(r)]);
  return l.createElement(l.Fragment, null, i, e.to.map((a) => l.createElement(D$, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: t
  })));
}, D$ = Ve((e) => {
  const t = rc(e.namePath, e.form);
  return Si(() => {
    e.onChange();
  }, [t]), null;
}), Dk = ie(DC, {
  Item: I$,
  Subscribe: L$,
  Header: S0,
  Array: N0,
  useForm: nc,
  useWatch: rc
});
const J0 = "adm-grid", V$ = (e) => {
  const t = {
    "--columns": e.columns.toString()
  }, {
    gap: n
  } = e;
  return n !== void 0 && (Array.isArray(n) ? (t["--gap-horizontal"] = xn(n[0]), t["--gap-vertical"] = xn(n[1])) : t["--gap"] = xn(n)), B(e, l.createElement("div", {
    className: J0,
    style: t
  }, e.children));
}, j$ = (e) => {
  const t = Z({
    span: 1
  }, e), n = {
    "--item-span": t.span
  };
  return B(t, l.createElement("div", {
    className: `${J0}-item`,
    style: n,
    onClick: t.onClick
  }, t.children));
}, em = ie(V$, {
  Item: j$
});
const B$ = wy([C1, oy]), zo = () => [1, 0, 0, 1, 0, 0], If = (e) => e[4], Lf = (e) => e[5], Ir = (e) => e[0], Lr = (e, t, n) => tm([1, 0, 0, 1, t, n], e), W$ = (e, t, n = t) => tm([t, 0, 0, n, 0, 0], e), Z$ = (e, [t, n]) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], tm = (e, t) => [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]], qo = "adm-image-viewer", nm = (e) => {
  const {
    dragLockRef: t,
    maxZoom: n
  } = e, r = D(null), i = D(null), [{
    matrix: a
  }, o] = Ae(() => ({
    matrix: zo(),
    config: {
      tension: 200
    }
  })), s = us(r), c = us(i), u = D(!1), d = (f, m, p = !1) => {
    if (!s || !c)
      return f;
    const v = -s.width / 2, h = -s.height / 2, g = -c.width / 2, w = -c.height / 2, C = Ir(f), b = C * c.width, y = C * c.height, [E, $] = Z$(f, [g, w]);
    if (m === "translate") {
      let k = E, N = $;
      if (b > s.width) {
        const A = v - (b - s.width), P = v;
        k = p ? _e(E, A, P) : xa(E, A, P, C * 50);
      } else
        k = -b / 2;
      if (y > s.height) {
        const A = h - (y - s.height), P = h;
        N = p ? _e($, A, P) : xa($, A, P, C * 50);
      } else
        N = -y / 2;
      return Lr(f, k - E, N - $);
    }
    if (m === "scale" && p) {
      const [k, N] = [b > s.width ? _e(E, v - (b - s.width), v) : -b / 2, y > s.height ? _e($, h - (y - s.height), h) : -y / 2];
      return Lr(f, k - E, N - $);
    }
    return f;
  };
  return B$({
    onDrag: (f) => {
      if (f.first)
        return;
      if (f.pinching)
        return f.cancel();
      if (f.tap && f.elapsedTime > 0 && f.elapsedTime < 1e3) {
        e.onTap();
        return;
      }
      const m = Ir(a.get());
      if (t && (t.current = m !== 1), !u.current && m <= 1)
        o.start({
          matrix: zo()
        });
      else {
        const p = a.get(), v = [f.offset[0] - If(p), f.offset[1] - Lf(p)], h = Lr(p, ...f.last ? [v[0] + f.velocity[0] * f.direction[0] * 200, v[1] + f.velocity[1] * f.direction[1] * 200] : v);
        o.start({
          matrix: d(h, "translate", f.last),
          immediate: !f.last
        });
      }
    },
    onPinch: (f) => {
      var m;
      u.current = !f.last;
      const [p] = f.offset;
      if (p < 0)
        return;
      let v;
      n === "auto" ? v = s && c ? Math.max(s.height / c.height, s.width / c.width) : 1 : v = n;
      const h = f.last ? _e(p, 1, v) : p;
      if ((m = e.onZoomChange) === null || m === void 0 || m.call(e, h), f.last && h <= 1)
        o.start({
          matrix: zo()
        }), t && (t.current = !1);
      else {
        if (!s)
          return;
        const g = a.get(), w = Ir(g), C = f.origin[0] - s.width / 2, b = f.origin[1] - s.height / 2;
        let y = Lr(g, -C, -b);
        y = W$(y, h / w), y = Lr(y, C, b), o.start({
          matrix: d(y, "scale", f.last),
          immediate: !f.last
        }), t && (t.current = !0);
      }
    }
  }, {
    target: r,
    drag: {
      from: () => [If(a.get()), Lf(a.get())],
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
  }), l.createElement("div", {
    className: `${qo}-slide`,
    onPointerMove: (f) => {
      Ir(a.get()) !== 1 && f.stopPropagation();
    }
  }, l.createElement("div", {
    className: `${qo}-control`,
    ref: r
  }, l.createElement(ue.div, {
    className: `${qo}-image-wrapper`,
    style: {
      matrix: a
    }
  }, l.createElement("img", {
    ref: i,
    src: e.image,
    draggable: !1,
    alt: e.image
  }))));
}, Ko = "adm-image-viewer", H$ = de((e, t) => {
  const n = window.innerWidth + On(16), [{
    x: r
  }, i] = Ae(() => ({
    x: e.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = e.images.length;
  function o(u, d = !1) {
    var f;
    const m = _e(u, 0, a - 1);
    (f = e.onIndexChange) === null || f === void 0 || f.call(e, m), i.start({
      x: m * n,
      immediate: d
    });
  }
  pe(t, () => ({
    swipeTo: o
  }));
  const s = D(!1), c = Pt((u) => {
    if (s.current)
      return;
    const [d] = u.offset;
    if (u.last) {
      const f = Math.floor(d / n), m = f + 1, p = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(_e(Math.round((d + p) / n), f, m));
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
    className: `${Ko}-slides`
  }, c()), l.createElement(ue.div, {
    className: `${Ko}-indicator`
  }, r.to((u) => `${_e(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(ue.div, {
    className: `${Ko}-slides-inner`,
    style: {
      x: r.to((u) => -u)
    }
  }, e.images.map((u, d) => l.createElement(nm, {
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
}), Aa = "adm-image-viewer", rm = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, im = (e) => {
  var t;
  const n = Z(rm, e), r = l.createElement(Ci, {
    visible: n.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: n.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Aa}-content`
  }, n.image && l.createElement(nm, {
    image: n.image,
    onTap: () => {
      var i;
      (i = n.onClose) === null || i === void 0 || i.call(n);
    },
    maxZoom: n.maxZoom
  })), n.image && l.createElement("div", {
    className: `${Aa}-footer`
  }, (t = n.renderFooter) === null || t === void 0 ? void 0 : t.call(n, n.image), l.createElement(Cr, {
    position: "bottom"
  })));
  return br(n.getContainer, r);
}, U$ = Object.assign(Object.assign({}, rm), {
  defaultIndex: 0
}), am = de((e, t) => {
  var n;
  const r = Z(U$, e), [i, a] = z(r.defaultIndex), o = D(null);
  pe(t, () => ({
    swipeTo: (u, d) => {
      var f;
      a(u), (f = o.current) === null || f === void 0 || f.swipeTo(u, d);
    }
  }));
  const s = Xe((u) => {
    var d;
    a(u), (d = r.onIndexChange) === null || d === void 0 || d.call(r, u);
  }, [r.onIndexChange]), c = l.createElement(Ci, {
    visible: r.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: r.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Aa}-content`
  }, r.images && l.createElement(H$, {
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
    className: `${Aa}-footer`
  }, (n = r.renderFooter) === null || n === void 0 ? void 0 : n.call(r, r.images[i], i), l.createElement(Cr, {
    position: "bottom"
  })));
  return br(r.getContainer, c);
}), sr = /* @__PURE__ */ new Set();
function z$(e) {
  cc();
  const t = $r(l.createElement(im, Object.assign({}, e, {
    afterClose: () => {
      var n;
      sr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return sr.add(t), t;
}
function q$(e) {
  cc();
  const t = $r(l.createElement(am, Object.assign({}, e, {
    afterClose: () => {
      var n;
      sr.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return sr.add(t), t;
}
function cc() {
  sr.forEach((e) => {
    e.close();
  }), sr.clear();
}
const K$ = ie(am, {
  show: q$
}), G$ = ie(im, {
  Multi: K$,
  show: z$,
  clear: cc
}), mn = "adm-image-uploader", Y$ = (e) => {
  const {
    locale: t
  } = he(), {
    url: n,
    file: r,
    deletable: i,
    deleteIcon: a,
    onDelete: o,
    imageFit: s
  } = e, c = re(() => n || (r ? URL.createObjectURL(r) : ""), [n, r]);
  K(() => () => {
    r && URL.revokeObjectURL(c);
  }, [c, r]);
  function u() {
    return e.status === "pending" && l.createElement("div", {
      className: `${mn}-cell-mask`
    }, l.createElement("span", {
      className: `${mn}-cell-loading`
    }, l.createElement(jl, {
      color: "white"
    }), l.createElement("span", {
      className: `${mn}-cell-mask-message`
    }, t.ImageUploader.uploading)));
  }
  function d() {
    return i && l.createElement("span", {
      className: `${mn}-cell-delete`,
      onClick: o
    }, a);
  }
  return l.createElement("div", {
    className: V(`${mn}-cell`, e.status === "fail" && `${mn}-cell-fail`)
  }, l.createElement(eo, {
    className: `${mn}-cell-image`,
    src: c,
    fit: s,
    onClick: e.onClick
  }), u(), d());
}, Df = Y$;
const hn = "adm-space", X$ = {
  direction: "horizontal"
}, Q$ = (e) => {
  const t = Z(X$, e), {
    direction: n,
    onClick: r
  } = t;
  return B(t, l.createElement("div", {
    className: V(hn, {
      [`${hn}-wrap`]: t.wrap,
      [`${hn}-block`]: t.block,
      [`${hn}-${n}`]: !0,
      [`${hn}-align-${t.align}`]: !!t.align,
      [`${hn}-justify-${t.justify}`]: !!t.justify
    }),
    onClick: r
  }, l.Children.map(t.children, (i) => i != null && l.createElement("div", {
    className: `${hn}-item`
  }, i))));
}, uc = Q$, xt = "adm-image-uploader", J$ = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: l.createElement($i, {
    className: `${xt}-cell-delete-icon`
  }),
  showUpload: !0,
  multiple: !1,
  maxCount: 0,
  defaultValue: [],
  accept: "image/*",
  preview: !0,
  showFailed: !0,
  imageFit: "cover"
}, ex = (e) => {
  const {
    locale: t
  } = he(), n = Z(J$, e), {
    columns: r
  } = n, [i, a] = te(n), [o, s] = z([]), c = D(null), u = us(c), d = D(null), [f, m] = z(80);
  $e(() => {
    const T = d.current;
    if (r && u && T) {
      const S = u.width, _ = R1(window.getComputedStyle(T).getPropertyValue("height"));
      m((S - _ * (r - 1)) / r);
    }
  }, [u == null ? void 0 : u.width]);
  const p = {
    "--cell-size": f + "px"
  };
  $e(() => {
    s((T) => T.filter((S) => S.url === void 0 ? !0 : !i.some((_) => _.url === S.url)));
  }, [i]), $e(() => {
    var T;
    (T = n.onUploadQueueChange) === null || T === void 0 || T.call(n, o.map((S) => ({
      id: S.id,
      status: S.status
    })));
  }, [o]);
  const v = D(0), {
    maxCount: h,
    onPreview: g,
    renderItem: w
  } = n;
  function C(T, S) {
    return Ee(this, void 0, void 0, function* () {
      const {
        beforeUpload: _
      } = n;
      let x = T;
      return x = yield _ == null ? void 0 : _(T, S), x;
    });
  }
  function b(T) {
    return n.showFailed ? T : T.filter((S) => S.status !== "fail");
  }
  function y(T) {
    var S;
    return Ee(this, void 0, void 0, function* () {
      T.persist();
      const {
        files: _
      } = T.target;
      if (!_)
        return;
      let x = [].slice.call(_);
      if (T.target.value = "", n.beforeUpload) {
        const O = x.map((I) => C(I, x));
        yield Promise.all(O).then((I) => {
          x = I.filter(Boolean);
        });
      }
      if (x.length === 0)
        return;
      if (h > 0) {
        const O = i.length + x.length - h;
        O > 0 && (x = x.slice(0, x.length - O), (S = n.onCountExceed) === null || S === void 0 || S.call(n, O));
      }
      const F = x.map((O) => ({
        id: v.current++,
        status: "pending",
        file: O
      }));
      s((O) => [...b(O), ...F]);
      const M = [];
      yield Promise.all(F.map((O, I) => Ee(this, void 0, void 0, function* () {
        try {
          const R = yield n.upload(O.file);
          M[I] = R, s((j) => j.map((H) => H.id === O.id ? Object.assign(Object.assign({}, H), {
            status: "success",
            url: R.url
          }) : H));
        } catch (R) {
          throw s((j) => j.map((H) => H.id === O.id ? Object.assign(Object.assign({}, H), {
            status: "fail"
          }) : H)), R;
        }
      }))).catch((O) => console.error(O)), a((O) => O.concat(M));
    });
  }
  const E = D(null);
  function $(T) {
    E.current = G$.Multi.show({
      images: i.map((S) => S.url),
      defaultIndex: T,
      onClose: () => {
        E.current = null;
      }
    });
  }
  yi(() => {
    var T;
    (T = E.current) === null || T === void 0 || T.close();
  });
  const k = b(o), N = n.showUpload && (h === 0 || i.length + k.length < h), A = () => i.map((T, S) => {
    var _, x;
    const F = l.createElement(Df, {
      key: (_ = T.key) !== null && _ !== void 0 ? _ : S,
      url: (x = T.thumbnailUrl) !== null && x !== void 0 ? x : T.url,
      deletable: n.deletable,
      deleteIcon: n.deleteIcon,
      imageFit: n.imageFit,
      onClick: () => {
        n.preview && $(S), g && g(S, T);
      },
      onDelete: () => Ee(void 0, void 0, void 0, function* () {
        var M;
        (yield (M = n.onDelete) === null || M === void 0 ? void 0 : M.call(n, T)) !== !1 && a(i.filter((I, R) => R !== S));
      })
    });
    return w ? w(F, T, i) : F;
  }), P = l.createElement(l.Fragment, null, A(), o.map((T) => !n.showFailed && T.status === "fail" ? null : l.createElement(Df, {
    key: T.id,
    file: T.file,
    deletable: T.status !== "pending",
    deleteIcon: n.deleteIcon,
    status: T.status,
    imageFit: n.imageFit,
    onDelete: () => {
      s(o.filter((S) => S.id !== T.id));
    }
  })), l.createElement("div", {
    className: `${xt}-upload-button-wrap`,
    style: N ? void 0 : {
      display: "none"
    }
  }, n.children || l.createElement("span", {
    className: `${xt}-cell ${xt}-upload-button`,
    role: "button",
    "aria-label": t.ImageUploader.upload
  }, l.createElement("span", {
    className: `${xt}-upload-button-icon`
  }, l.createElement(s1, null))), !n.disableUpload && l.createElement("input", {
    capture: n.capture,
    accept: n.accept,
    multiple: n.multiple,
    type: "file",
    className: `${xt}-input`,
    onChange: y,
    "aria-hidden": !0
  })));
  return B(n, l.createElement("div", {
    className: xt,
    ref: c
  }, r ? l.createElement(em, {
    className: `${xt}-grid`,
    columns: r,
    style: p
  }, l.createElement("div", {
    className: `${xt}-gap-measure`,
    ref: d
  }), P.props.children) : l.createElement(uc, {
    className: `${xt}-space`,
    wrap: !0,
    block: !0
  }, P.props.children)));
};
const Vk = ex;
const om = () => null, Un = "adm-index-bar", tx = (e) => {
  const [t, n] = z(!1);
  return l.createElement("div", {
    className: V(`${Un}-sidebar`, {
      [`${Un}-sidebar-interacting`]: t
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
      className: `${Un}-sidebar-row`,
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
      className: `${Un}-sidebar-bubble`
    }, i), l.createElement("div", {
      className: V(`${Un}-sidebar-item`, {
        [`${Un}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, l.createElement("div", null, i)));
  }));
}, zn = "adm-index-bar", nx = {
  sticky: !0
}, rx = de((e, t) => {
  const n = Z(nx, e), r = On(35), i = D(null), a = [], o = [];
  sn(n.children, (f) => {
    var m;
    if (!!l.isValidElement(f)) {
      if (f.type !== om) {
        Ie("IndexBar", "The children of `IndexBar` must be `IndexBar.Panel` components.");
        return;
      }
      a.push({
        index: f.props.index,
        brief: (m = f.props.brief) !== null && m !== void 0 ? m : f.props.index.charAt(0)
      }), o.push(B(f.props, l.createElement("div", {
        key: f.props.index,
        "data-index": f.props.index,
        className: `${zn}-anchor`
      }, l.createElement("div", {
        className: `${zn}-anchor-title`
      }, f.props.title || f.props.index), f.props.children)));
    }
  });
  const [s, c] = z(() => {
    const f = a[0];
    return f ? f.index : null;
  });
  pe(t, () => ({
    scrollTo: u
  }));
  function u(f) {
    var m;
    const p = i.current;
    if (!p)
      return;
    const v = p.children;
    for (let h = 0; h < v.length; h++) {
      const g = v.item(h);
      if (!g)
        continue;
      if (g.dataset.index === f) {
        p.scrollTop = g.offsetTop, c(f), s !== f && ((m = n.onIndexChange) === null || m === void 0 || m.call(n, f));
        return;
      }
    }
  }
  const {
    run: d
  } = ja(() => {
    var f;
    const m = i.current;
    if (!m)
      return;
    const p = m.scrollTop, v = m.getElementsByClassName(`${zn}-anchor`);
    for (let h = 0; h < v.length; h++) {
      const g = v.item(h);
      if (!g)
        continue;
      const w = g.dataset.index;
      if (!!w && g.offsetTop + g.clientHeight - r > p) {
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
    className: V(`${zn}`, {
      [`${zn}-sticky`]: n.sticky
    })
  }, l.createElement(tx, {
    indexItems: a,
    activeIndex: s,
    onActive: (f) => {
      u(f);
    }
  }), l.createElement("div", {
    className: `${zn}-body`,
    ref: i,
    onScroll: d
  }, o)));
}), jk = ie(rx, {
  Panel: om
});
function ix(e) {
  return e === window;
}
const sm = "adm-infinite-scroll", ax = {
  threshold: 250,
  children: (e, t, n) => l.createElement(sx, {
    hasMore: e,
    failed: t,
    retry: n
  })
}, ox = (e) => {
  const t = Z(ax, e), [n, r] = z(!1), i = K5((p) => Ee(void 0, void 0, void 0, function* () {
    try {
      yield t.loadMore(p);
    } catch (v) {
      throw r(!0), v;
    }
  })), a = D(null), [o, s] = z({}), c = D(o), [u, d] = z(), {
    run: f
  } = ja(() => Ee(void 0, void 0, void 0, function* () {
    if (c.current !== o || !t.hasMore)
      return;
    const p = a.current;
    if (!p || !p.offsetParent)
      return;
    const v = da(p);
    if (d(v), !v)
      return;
    const g = p.getBoundingClientRect().top;
    if ((ix(v) ? window.innerHeight : v.getBoundingClientRect().bottom) >= g - t.threshold) {
      const C = {};
      c.current = C, yield i(!1), s(C);
    }
  }), {
    wait: 100,
    leading: !0,
    trailing: !0
  });
  K(() => {
    f();
  }), K(() => {
    if (!a.current || !u)
      return;
    function v() {
      f();
    }
    return u.addEventListener("scroll", v), () => {
      u.removeEventListener("scroll", v);
    };
  }, [u]);
  function m() {
    return Ee(this, void 0, void 0, function* () {
      r(!1), yield i(!0), s(c.current);
    });
  }
  return B(t, l.createElement("div", {
    className: sm,
    ref: a
  }, typeof t.children == "function" ? t.children(t.hasMore, n, m) : t.children));
}, sx = (e) => {
  const {
    locale: t
  } = he();
  return e.hasMore ? e.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${sm}-failed-text`
  }, t.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      e.retry();
    }
  }, t.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, t.common.loading), l.createElement(O1, null)) : l.createElement("span", null, t.InfiniteScroll.noMore);
}, Bk = ox;
const Xi = "adm-input", lx = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, cx = de((e, t) => {
  const n = Z(lx, e), [r, i] = te(n), [a, o] = z(!1), s = D(!1), c = D(null), {
    locale: u
  } = he();
  pe(t, () => ({
    clear: () => {
      i("");
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
  }));
  const d = (p) => {
    var v;
    n.onEnterPress && (p.code === "Enter" || p.keyCode === 13) && n.onEnterPress(p), (v = n.onKeyDown) === null || v === void 0 || v.call(n, p);
  };
  $e(() => {
    var p;
    if (!!n.enterKeyHint)
      return (p = c.current) === null || p === void 0 || p.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var v;
        (v = c.current) === null || v === void 0 || v.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function f() {
    let p = r;
    n.type === "number" && (p = p && _e(parseFloat(p), n.min, n.max).toString()), p !== r && i(p);
  }
  const m = (() => !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0)();
  return B(n, l.createElement("div", {
    className: V(`${Xi}`, n.disabled && `${Xi}-disabled`)
  }, l.createElement("input", {
    ref: c,
    className: `${Xi}-element`,
    value: r,
    onChange: (p) => {
      i(p.target.value);
    },
    onFocus: (p) => {
      var v;
      o(!0), (v = n.onFocus) === null || v === void 0 || v.call(n, p);
    },
    onBlur: (p) => {
      var v;
      o(!1), f(), (v = n.onBlur) === null || v === void 0 || v.call(n, p);
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
    onCompositionStart: (p) => {
      var v;
      s.current = !0, (v = n.onCompositionStart) === null || v === void 0 || v.call(n, p);
    },
    onCompositionEnd: (p) => {
      var v;
      s.current = !1, (v = n.onCompositionEnd) === null || v === void 0 || v.call(n, p);
    },
    onClick: n.onClick,
    step: n.step,
    role: n.role,
    "aria-valuenow": n["aria-valuenow"],
    "aria-valuemax": n["aria-valuemax"],
    "aria-valuemin": n["aria-valuemin"],
    "aria-label": n["aria-label"]
  }), m && l.createElement("div", {
    className: `${Xi}-clear`,
    onMouseDown: (p) => {
      p.preventDefault();
    },
    onClick: () => {
      var p, v;
      i(""), (p = n.onClear) === null || p === void 0 || p.call(n), Jy() && s.current && (s.current = !1, (v = c.current) === null || v === void 0 || v.blur());
    },
    "aria-label": u.Input.clear
  }, l.createElement(Xa, null))));
}), lm = cx;
const Et = "adm-jumbo-tabs", ux = () => null, fx = (e) => {
  var t;
  const n = D(null), r = D(null), i = {};
  let a = null;
  const o = [];
  sn(e.children, (f, m) => {
    if (!l.isValidElement(f))
      return;
    const p = f.key;
    if (typeof p != "string")
      return;
    m === 0 && (a = p);
    const v = o.push(f);
    i[p] = v - 1;
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
  } = A1(n, i[s]);
  return Oi(() => {
    d(!0);
  }, r), B(e, l.createElement("div", {
    className: Et,
    ref: r
  }, l.createElement("div", {
    className: `${Et}-header`
  }, l.createElement(N1, {
    scrollTrackRef: n
  }), l.createElement(ue.div, {
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
    className: V(`${Et}-tab`, {
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
    return l.createElement(wr, {
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
}, Wk = ie(fx, {
  Tab: ux
}), Zk = S1;
const dx = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(rn, {
    key: t.key,
    onClick: e.onAction,
    className: V("adm-modal-button", {
      "adm-modal-button-primary": e.action.primary
    }),
    fill: e.action.primary ? "solid" : "none",
    size: e.action.primary ? "large" : "middle",
    block: !0,
    color: t.danger ? "danger" : "primary",
    loading: "auto",
    disabled: t.disabled
  }, t.text));
}, mx = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, cm = (e) => {
  const t = Z(mx, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Nt("image-container")
  }, l.createElement(eo, {
    src: t.image,
    alt: "modal header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Nt("header")
  }, l.createElement(li, null, t.header)), !!t.title && l.createElement("div", {
    className: Nt("title")
  }, t.title), l.createElement("div", {
    className: Nt("content")
  }, typeof t.content == "string" ? l.createElement(li, null, t.content) : t.content), l.createElement(uc, {
    direction: "vertical",
    block: !0,
    className: V(Nt("footer"), t.actions.length === 0 && Nt("footer-empty"))
  }, t.actions.map((r, i) => l.createElement(dx, {
    key: r.key,
    action: r,
    onAction: () => Ee(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = t.onAction) === null || o === void 0 ? void 0 : o.call(t, r, i)]), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    })
  }))));
  return l.createElement(Y1, {
    className: V(Nt(), t.className),
    style: t.style,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    showCloseButton: t.showCloseButton,
    closeOnMaskClick: t.closeOnMaskClick,
    onClose: t.onClose,
    visible: t.visible,
    getContainer: t.getContainer,
    bodyStyle: t.bodyStyle,
    bodyClassName: V(Nt("body"), t.image && Nt("with-image"), t.bodyClassName),
    maskStyle: t.maskStyle,
    maskClassName: t.maskClassName,
    stopPropagation: t.stopPropagation,
    disableBodyScroll: t.disableBodyScroll,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, n);
};
function Nt(e = "") {
  return "adm-modal" + (e && "-") + e;
}
const Ks = /* @__PURE__ */ new Set();
function fc(e) {
  const t = $r(l.createElement(cm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Ks.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Ks.add(t.close), t;
}
function hx(e) {
  const t = {
    confirmText: pi().locale.Modal.ok
  }, n = Z(t, e);
  return new Promise((r) => {
    fc(Object.assign(Object.assign({}, n), {
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
const px = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function vx(e) {
  const {
    locale: t
  } = pi(), n = Z(px, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    fc(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [{
        key: "confirm",
        text: n.confirmText,
        primary: !0,
        onClick: () => Ee(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => Ee(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }]
    }));
  });
}
function gx() {
  Ks.forEach((e) => {
    e();
  });
}
const Hk = ie(cm, {
  show: fc,
  alert: hx,
  confirm: vx,
  clear: gx
});
const qn = "adm-nav-bar", yx = {
  backArrow: !0
}, bx = (e) => {
  const t = Z(yx, e), {
    back: n,
    backArrow: r
  } = t;
  return B(t, l.createElement("div", {
    className: V(qn)
  }, l.createElement("div", {
    className: `${qn}-left`,
    role: "button"
  }, n !== null && l.createElement("div", {
    className: `${qn}-back`,
    onClick: t.onBack
  }, r && l.createElement("span", {
    className: `${qn}-back-arrow`
  }, r === !0 ? l.createElement(y8, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), t.left), l.createElement("div", {
    className: `${qn}-title`
  }, t.children), l.createElement("div", {
    className: `${qn}-right`
  }, t.right)));
}, Uk = bx;
const Tt = "adm-notice-bar", wx = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement($8, null)
}, Ex = Ve((e) => {
  const t = Z(wx, e), n = D(null), r = D(null), [i, a] = z(!0), o = t.speed, s = D(!0), c = D(!1);
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
    const p = m ? f.offsetWidth : d.offsetWidth + f.offsetWidth;
    c.current = !0, f.style.transitionDuration = `${Math.round(p / o)}s`, f.style.transform = `translateX(-${f.offsetWidth}px)`;
  }
  return N6(() => {
    s.current = !1, u();
  }, t.delay), Oi(() => {
    u();
  }, n), Il(() => {
    u();
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  }), i ? B(t, l.createElement("div", {
    className: V(Tt, `${Tt}-${t.color}`, {
      [`${Tt}-wrap`]: t.wrap
    })
  }, t.icon && l.createElement("span", {
    className: `${Tt}-left`
  }, t.icon), l.createElement("span", {
    ref: n,
    className: `${Tt}-content`
  }, l.createElement("span", {
    onTransitionEnd: () => {
      c.current = !1, u();
    },
    ref: r,
    className: `${Tt}-content-inner`
  }, t.content)), (t.closeable || t.extra) && l.createElement("span", {
    className: `${Tt}-right`
  }, t.extra, t.closeable && l.createElement("div", {
    className: `${Tt}-close`,
    onClick: () => {
      var d;
      a(!1), (d = t.onClose) === null || d === void 0 || d.call(t);
    }
  }, l.createElement($i, {
    className: `${Tt}-close-icon`
  }))))) : null;
}), zk = Ex;
function Cx(e) {
  const t = [...e];
  for (let n = t.length; n > 0; n--) {
    const r = Math.floor(Math.random() * n);
    [t[n - 1], t[r]] = [t[r], t[n - 1]];
  }
  return t;
}
const ye = "adm-number-keyboard", $x = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, xx = (e) => {
  const t = Z($x, e), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = t, d = D(null), f = re(() => {
    const y = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], E = s ? Cx(y) : y, $ = Array.isArray(o) ? o : [o];
    return E.push("0"), a ? ($.length === 2 && E.splice(9, 0, $.pop()), E.push($[0] || "")) : (E.splice(9, 0, $[0] || ""), E.push($[1] || "BACKSPACE")), E;
  }, [o, a, s, s && n]), m = D(-1), p = D(-1), v = Wt(() => {
    var y;
    (y = t.onDelete) === null || y === void 0 || y.call(t);
  }), h = () => {
    m.current = window.setTimeout(() => {
      v(), p.current = window.setInterval(v, 150);
    }, 700);
  }, g = () => {
    clearTimeout(m.current), clearInterval(p.current);
  }, w = (y, E) => {
    var $, k;
    switch (y.preventDefault(), E) {
      case "BACKSPACE":
        v == null || v();
        break;
      case "OK":
        ($ = t.onConfirm) === null || $ === void 0 || $.call(t), t.closeOnConfirm && ((k = t.onClose) === null || k === void 0 || k.call(t));
        break;
      default:
        E !== "" && (u == null || u(E));
        break;
    }
  }, C = () => !c && !r ? null : l.createElement("div", {
    className: V(`${ye}-header`, {
      [`${ye}-header-with-title`]: !!r
    })
  }, l.createElement("div", {
    className: `${ye}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${ye}-header-close-button`,
    onClick: () => {
      var y;
      (y = t.onClose) === null || y === void 0 || y.call(t);
    },
    role: "grid",
    title: "CLOSE",
    tabIndex: -1
  }, l.createElement(f1, null))), b = (y, E) => {
    const $ = /^\d$/.test(y), k = V(`${ye}-key`, {
      [`${ye}-key-number`]: $,
      [`${ye}-key-sign`]: !$ && y,
      [`${ye}-key-mid`]: E === 9 && !!a && f.length < 12
    }), N = y ? {
      role: "grid",
      title: y,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: y,
      className: k,
      onTouchStart: () => {
        y === "BACKSPACE" && h();
      },
      onTouchEnd: (A) => {
        w(A, y), y === "BACKSPACE" && g();
      }
    }, N), y === "BACKSPACE" ? l.createElement(ku, null) : y);
  };
  return l.createElement(_i, {
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
    onMouseDown: (y) => {
      y.preventDefault();
    }
  }, C(), l.createElement("div", {
    className: `${ye}-wrapper`
  }, l.createElement("div", {
    className: V(`${ye}-main`, {
      [`${ye}-main-confirmed-style`]: !!a
    })
  }, f.map(b)), !!a && l.createElement("div", {
    className: `${ye}-confirm`
  }, l.createElement("div", {
    className: `${ye}-key ${ye}-key-extra ${ye}-key-bs`,
    onTouchStart: () => {
      h();
    },
    onTouchEnd: (y) => {
      w(y, "BACKSPACE"), g();
    },
    title: "BACKSPACE",
    role: "grid",
    tabIndex: -1
  }, l.createElement(ku, null)), l.createElement("div", {
    className: `${ye}-key ${ye}-key-extra ${ye}-key-ok`,
    onTouchEnd: (y) => w(y, "OK"),
    role: "grid",
    tabIndex: -1,
    "aria-label": a
  }, a))), t.safeArea && l.createElement("div", {
    className: `${ye}-footer`
  }, l.createElement(Cr, {
    position: "bottom"
  })))));
}, qk = xx;
const Dr = "adm-page-indicator", _x = {
  color: "primary",
  direction: "horizontal"
}, kx = Ve((e) => {
  const t = Z(_x, e), n = [];
  for (let r = 0; r < t.total; r++)
    n.push(l.createElement("div", {
      key: r,
      className: V(`${Dr}-dot`, {
        [`${Dr}-dot-active`]: t.current === r
      })
    }));
  return B(t, l.createElement("div", {
    className: V(Dr, `${Dr}-${t.direction}`, `${Dr}-color-${t.color}`)
  }, n));
}), Sx = kx;
const Ct = "adm-passcode-input", Vf = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, Ox = de((e, t) => {
  const n = Z(Vf, e), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : Vf.length, {
    locale: i
  } = he(), [a, o] = z(!1), [s, c] = te(n), u = D(null), d = D(null);
  K(() => {
    var h;
    s.length >= r && ((h = n.onFill) === null || h === void 0 || h.call(n, s));
  }, [s, r]);
  const f = () => {
    var h, g;
    n.keyboard || (h = d.current) === null || h === void 0 || h.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  K(() => {
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
  pe(t, () => ({
    focus: () => {
      var h;
      return (h = u.current) === null || h === void 0 ? void 0 : h.focus();
    },
    blur: () => {
      var h, g;
      (h = u.current) === null || h === void 0 || h.blur(), (g = d.current) === null || g === void 0 || g.blur();
    }
  }));
  const p = () => {
    const h = [], g = s.split(""), w = g.length, C = _e(g.length, 0, r - 1);
    for (let b = 0; b < r; b++)
      h.push(l.createElement("div", {
        className: V(`${Ct}-cell`, {
          [`${Ct}-cell-caret`]: n.caret && w === b && a,
          [`${Ct}-cell-focused`]: C === b && a,
          [`${Ct}-cell-dot`]: !n.plain && g[b]
        }),
        key: b
      }, g[b] && n.plain ? g[b] : ""));
    return h;
  }, v = V(Ct, {
    [`${Ct}-focused`]: a,
    [`${Ct}-error`]: n.error,
    [`${Ct}-seperated`]: n.seperated
  });
  return l.createElement(l.Fragment, null, B(n, l.createElement("div", {
    ref: u,
    tabIndex: 0,
    className: v,
    onFocus: f,
    onBlur: m,
    role: "button",
    "aria-label": i.PasscodeInput.name
  }, l.createElement("div", {
    className: `${Ct}-cell-container`
  }, p()), l.createElement("input", {
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
}), Kk = Ox;
const Vr = "adm-progress-bar", Fx = {
  percent: 0,
  rounded: !0,
  text: !1
}, Px = (e) => {
  const t = Z(Fx, e), n = {
    width: `${t.percent}%`
  }, r = function() {
    return t.text === !0 ? `${t.percent}%` : typeof t.text == "function" ? t.text(t.percent) : t.text;
  }();
  return B(t, l.createElement("div", {
    className: V(Vr, t.rounded && `${Vr}-rounded`)
  }, l.createElement("div", {
    className: `${Vr}-trail`
  }, l.createElement("div", {
    className: `${Vr}-fill`,
    style: n
  })), Dt(r) && l.createElement("div", {
    className: `${Vr}-text`
  }, r)));
}, Gk = Px;
const Kn = "adm-progress-circle", Ax = (e) => {
  const t = Z({
    percent: 0
  }, e), n = {
    "--percent": t.percent.toString()
  };
  return B(t, l.createElement("div", {
    className: `${Kn}`,
    style: n
  }, l.createElement("div", {
    className: `${Kn}-content`
  }, l.createElement("svg", {
    className: `${Kn}-svg`
  }, l.createElement("circle", {
    className: `${Kn}-track`,
    fill: "transparent"
  }), l.createElement("circle", {
    className: `${Kn}-fill`,
    fill: "transparent"
  })), l.createElement("div", {
    className: `${Kn}-info`
  }, t.children))));
}, Yk = Ax;
const Nx = (e) => new Promise((t) => setTimeout(t, e)), Qi = "adm-pull-to-refresh", Tx = {
  pullingText: "\u4E0B\u62C9\u5237\u65B0",
  canReleaseText: "\u91CA\u653E\u7ACB\u5373\u5237\u65B0",
  refreshingText: "\u52A0\u8F7D\u4E2D...",
  completeText: "\u5237\u65B0\u6210\u529F",
  completeDelay: 500,
  disabled: !1,
  onRefresh: () => {
  }
}, Rx = (e) => {
  var t, n;
  const {
    locale: r
  } = he(), i = Z(Tx, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, e), a = (t = i.headHeight) !== null && t !== void 0 ? t : On(40), o = (n = i.threshold) !== null && n !== void 0 ? n : On(60), [s, c] = z("pulling"), [u, d] = Ae(() => ({
    from: {
      height: 0
    },
    config: {
      tension: 300,
      friction: 30,
      clamp: !0
    }
  })), f = D(null), m = D(!1);
  K(() => {
    var g;
    (g = f.current) === null || g === void 0 || g.addEventListener("touchmove", () => {
    });
  }, []);
  const p = () => new Promise((g) => {
    d.start({
      to: {
        height: 0
      },
      onResolve() {
        c("pulling"), g();
      }
    });
  });
  function v() {
    return Ee(this, void 0, void 0, function* () {
      d.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw p(), g;
      }
      i.completeDelay > 0 && (yield Nx(i.completeDelay)), p();
    });
  }
  Pt((g) => {
    if (s === "refreshing" || s === "complete")
      return;
    const {
      event: w
    } = g;
    if (g.last) {
      m.current = !1, s === "canRelease" ? v() : d.start({
        height: 0
      });
      return;
    }
    const [, C] = g.movement;
    if (g.first && C > 0) {
      let $ = function(k) {
        return "scrollTop" in k ? k.scrollTop : k.scrollY;
      };
      const y = g.event.target;
      if (!y || !(y instanceof Element))
        return;
      let E = da(y);
      for (; ; ) {
        if (!E || $(E) > 0)
          return;
        if (E instanceof Window)
          break;
        E = da(E.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    w.cancelable && w.preventDefault(), w.stopPropagation();
    const b = Math.max(xa(C, 0, 0, a * 5, 0.5), 0);
    d.start({
      height: b
    }), c(b > o ? "canRelease" : "pulling");
  }, {
    pointer: {
      touch: !0
    },
    axis: "y",
    target: f,
    enabled: !i.disabled,
    eventOptions: bi ? {
      passive: !1
    } : !1
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
  return l.createElement(ue.div, {
    ref: f,
    className: Qi
  }, l.createElement(ue.div, {
    style: u,
    className: `${Qi}-head`
  }, l.createElement("div", {
    className: `${Qi}-head-content`,
    style: {
      height: a
    }
  }, h())), l.createElement("div", {
    className: `${Qi}-content`
  }, i.children));
}, Xk = Rx;
const um = el(null), Mx = {
  disabled: !1,
  defaultValue: null
}, Ix = (e) => {
  const t = Z(Mx, e), [n, r] = te({
    value: t.value,
    defaultValue: t.defaultValue,
    onChange: (i) => {
      var a;
      i !== null && ((a = t.onChange) === null || a === void 0 || a.call(t, i));
    }
  });
  return l.createElement(
    um.Provider,
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
}, pn = "adm-radio", Lx = {
  defaultChecked: !1
}, Dx = (e) => {
  const t = Z(Lx, e), n = st(um);
  let [r, i] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  }), a = t.disabled;
  const {
    value: o
  } = t;
  n && o !== void 0 && (fo && (e.checked !== void 0 && Ie("Radio", "When used within `Radio.Group`, the `checked` prop of `Radio` will not work."), e.defaultChecked !== void 0 && Ie("Radio", "When used within `Radio.Group`, the `defaultChecked` prop of `Radio` will not work.")), r = n.value.includes(o), i = (c) => {
    var u;
    c ? n.check(o) : n.uncheck(o), (u = t.onChange) === null || u === void 0 || u.call(t, c);
  }, a = a || n.disabled);
  const s = () => t.icon ? l.createElement("div", {
    className: `${pn}-custom-icon`
  }, t.icon(r)) : l.createElement("div", {
    className: `${pn}-icon`
  }, r && l.createElement(Q1, null));
  return B(t, l.createElement("label", {
    className: V(pn, {
      [`${pn}-checked`]: r,
      [`${pn}-disabled`]: a,
      [`${pn}-block`]: t.block
    })
  }, l.createElement(J1, {
    type: "radio",
    checked: r,
    onChange: i,
    disabled: a,
    id: t.id
  }), s(), t.children && l.createElement("div", {
    className: `${pn}-content`
  }, t.children)));
}, Qk = ie(Dx, {
  Group: Ix
});
const Vx = () => l.createElement("svg", {
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
})), vn = "adm-rate", jx = {
  count: 5,
  allowHalf: !1,
  character: l.createElement(Vx, null),
  defaultValue: 0,
  readOnly: !1,
  allowClear: !0
}, Bx = (e) => {
  const t = Z(jx, e), [n, r] = te(t), i = D(null), a = Array(t.count).fill(null);
  function o(c, u) {
    return l.createElement("div", {
      className: V(`${vn}-star`, {
        [`${vn}-star-active`]: n >= c,
        [`${vn}-star-half`]: u,
        [`${vn}-star-readonly`]: t.readOnly
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
    const m = f.getBoundingClientRect(), p = (u - m.left) / m.width * t.count, v = t.allowHalf ? Math.ceil(p * 2) / 2 : Math.ceil(p), h = _e(v, 0, t.count);
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
    className: V(vn, {
      [`${vn}-half`]: t.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": t.readOnly,
    ref: i
  }, s()), a.map((c, u) => l.createElement("div", {
    key: u,
    className: V(`${vn}-box`)
  }, t.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, Jk = Bx;
const jr = "adm-result", Wx = {
  success: l1,
  error: Xa,
  info: m1,
  waiting: u1,
  warning: d1
}, Zx = {
  status: "info"
}, Hx = (e) => {
  const t = Z(Zx, e), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = t;
  if (!n)
    return null;
  const o = a || l.createElement(Wx[n]);
  return B(t, l.createElement("div", {
    className: V(jr, `${jr}-${n}`)
  }, l.createElement("div", {
    className: `${jr}-icon`
  }, o), l.createElement("div", {
    className: `${jr}-title`
  }, r), i ? l.createElement("div", {
    className: `${jr}-description`
  }, i) : null));
}, eS = Hx;
const Te = "adm-result-page", Ux = {
  success: l1,
  error: Xa,
  info: m1,
  waiting: u1,
  warning: d1
}, zx = {
  status: "info",
  details: []
}, qx = (e) => {
  const t = Z(zx, e), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: d
  } = t, f = o || l.createElement(Ux[n]), [m, p] = z(!0), v = Dt(c), h = Dt(s);
  return B(t, l.createElement("div", {
    className: Te
  }, l.createElement("div", {
    className: `${Te}-header`
  }, l.createElement("div", {
    className: `${Te}-icon`
  }, f), l.createElement("div", {
    className: `${Te}-title`
  }, r), Dt(i) ? l.createElement("div", {
    className: `${Te}-description`
  }, i) : null, a.length ? l.createElement("div", {
    className: `${Te}-details`
  }, (m ? a.slice(0, 3) : a).map((g, w) => l.createElement("div", {
    className: V(`${Te}-detail`, g.bold && `${Te}-detail-bold`),
    key: w
  }, l.createElement("span", null, g.label), l.createElement("span", null, g.value))), a.length > 3 && l.createElement("div", {
    onClick: () => p((g) => !g)
  }, l.createElement("div", {
    className: V(`${Te}-collapse`, !m && `${Te}-collapse-active`)
  }))) : null, l.createElement("div", {
    className: `${Te}-bgWrapper`
  }, l.createElement("div", {
    className: `${Te}-bg`
  }))), l.createElement("div", {
    className: `${Te}-content`
  }, t.children), l.createElement("div", {
    className: `${Te}-footer`
  }, v && l.createElement(rn, {
    block: !0,
    color: "default",
    fill: "solid",
    size: "large",
    onClick: d,
    className: `${Te}-footer-btn`
  }, c), h && v && l.createElement("div", {
    className: `${Te}-footer-space`
  }), h && l.createElement(rn, {
    block: !0,
    color: "primary",
    fill: "solid",
    size: "large",
    onClick: u,
    className: `${Te}-footer-btn`
  }, s))));
}, Kx = "adm-result-page-card", Gx = (e) => B(e, l.createElement("div", {
  className: V(`${Kx}`)
}, e.children)), tS = ie(qx, {
  Card: Gx
});
const Kt = "adm-search-bar", Yx = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(C8, null)
}, Xx = de((e, t) => {
  const {
    locale: n
  } = he(), r = Z(Yx, {
    cancelText: n.common.cancel
  }, e), [i, a] = te(r), [o, s] = z(!1), c = D(null), u = D(!1);
  pe(t, () => ({
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
      className: `${Kt}-suffix`
    }, l.createElement(rn, {
      fill: "none",
      className: `${Kt}-cancel-button`,
      onClick: () => {
        var m, p, v;
        r.clearOnCancel && ((m = c.current) === null || m === void 0 || m.clear()), (p = c.current) === null || p === void 0 || p.blur(), (v = r.onCancel) === null || v === void 0 || v.call(r);
      },
      onMouseDown: (m) => {
        m.preventDefault();
      }
    }, r.cancelText));
  };
  return B(r, l.createElement("div", {
    className: V(Kt, {
      [`${Kt}-active`]: o
    })
  }, l.createElement("div", {
    className: `${Kt}-input-box`
  }, r.icon && l.createElement("div", {
    className: `${Kt}-input-box-icon`
  }, r.icon), l.createElement(lm, {
    ref: c,
    className: V(`${Kt}-input`, {
      [`${Kt}-input-without-icon`]: !r.icon
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
}), nS = Xx;
const Qx = Ve(() => l.createElement("svg", {
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
})))))))), gn = "adm-selector", Jx = {
  multiple: !1,
  defaultValue: [],
  showCheckMark: !0
}, e_ = (e) => {
  const t = Z(Jx, e), [n, r] = te({
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
  } = he(), a = t.options.map((o) => {
    const s = (n || []).includes(o.value), c = o.disabled || t.disabled, u = V(`${gn}-item`, {
      [`${gn}-item-active`]: s && !t.multiple,
      [`${gn}-item-multiple-active`]: s && t.multiple,
      [`${gn}-item-disabled`]: c
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
      className: `${gn}-item-description`
    }, o.description), s && t.showCheckMark && l.createElement("div", {
      className: `${gn}-check-mark-wrapper`
    }, l.createElement(Qx, null)));
  });
  return B(t, l.createElement("div", {
    className: gn,
    role: "listbox",
    "aria-label": i.Selector.name
  }, !t.columns && l.createElement(uc, {
    wrap: !0
  }, a), t.columns && l.createElement(em, {
    columns: t.columns
  }, a)));
}, rS = e_;
const Go = Ve((e) => B(e, l.createElement("svg", {
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
}))))), Me = "adm-side-bar", t_ = () => null, n_ = (e) => {
  var t;
  let n = null;
  const r = [];
  sn(e.children, (c, u) => {
    if (!l.isValidElement(c))
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
    className: Me
  }, l.createElement("div", {
    className: `${Me}-items`
  }, r.map((c, u) => {
    const d = c.key === i, f = r[u - 1] && r[u - 1].key === i, m = r[u + 1] && r[u + 1].key === i;
    return B(c.props, l.createElement("div", {
      key: c.key,
      onClick: () => {
        const {
          key: p
        } = c;
        p == null || c.props.disabled || a(p.toString());
      },
      className: V(`${Me}-item`, {
        [`${Me}-item-active`]: d,
        [`${Me}-item-disabled`]: c.props.disabled
      })
    }, l.createElement(l.Fragment, null, f && l.createElement(Go, {
      className: `${Me}-item-corner ${Me}-item-corner-top`
    }), m && l.createElement(Go, {
      className: `${Me}-item-corner ${Me}-item-corner-bottom`
    })), l.createElement(xs, {
      content: c.props.badge,
      className: `${Me}-badge`
    }, l.createElement("div", {
      className: `${Me}-item-title`
    }, d && l.createElement("div", {
      className: `${Me}-item-highlight`
    }), c.props.title))));
  })), l.createElement("div", {
    className: V(`${Me}-extra-space`, s && `${Me}-item-active-next-sibling`)
  }, s && l.createElement(Go, {
    className: `${Me}-item-corner ${Me}-item-corner-top`
  }))));
}, iS = ie(n_, {
  Item: t_
});
const Yo = "adm-slider", r_ = ({
  points: e,
  max: t,
  min: n,
  upperBound: r,
  lowerBound: i
}) => {
  const a = t - n, o = e.map((s) => {
    const c = `${Math.abs(s - n) / a * 100}%`, u = s <= r && s >= i, d = {
      left: c
    }, f = V({
      [`${Yo}-tick`]: !0,
      [`${Yo}-tick-active`]: u
    });
    return l.createElement("span", {
      className: f,
      style: d,
      key: s
    });
  });
  return l.createElement("div", {
    className: `${Yo}-ticks`
  }, o);
}, i_ = r_, Xo = "adm-slider-mark", a_ = ({
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
    const d = c <= t && c >= n, f = V({
      [`${Xo}-text`]: !0,
      [`${Xo}-text-active`]: d
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
    className: Xo
  }, s);
}, o_ = a_;
function Gs() {
  return typeof BigInt == "function";
}
function Jr(e) {
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
function dc(e) {
  var t = String(e);
  return !Number.isNaN(Number(t)) && t.includes("e");
}
function Ys(e) {
  var t = String(e);
  if (dc(e)) {
    var n = Number(t.slice(t.indexOf("e-") + 2)), r = t.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return t.includes(".") && dm(t) ? t.length - t.indexOf(".") - 1 : 0;
}
function fm(e) {
  var t = String(e);
  if (dc(e)) {
    if (e > Number.MAX_SAFE_INTEGER)
      return String(Gs() ? BigInt(e).toString() : Number.MAX_SAFE_INTEGER);
    if (e < Number.MIN_SAFE_INTEGER)
      return String(Gs() ? BigInt(e).toString() : Number.MIN_SAFE_INTEGER);
    t = e.toFixed(Ys(t));
  }
  return Jr(t).fullStr;
}
function dm(e) {
  return typeof e == "number" ? !Number.isNaN(e) : e ? /^\s*-?\d+(\.\d+)?\s*$/.test(e) || /^\s*-?\d+\.\s*$/.test(e) || /^\s*-?\.\d+\s*$/.test(e) : !1;
}
function mm(e) {
  return !e && e !== 0 && !Number.isNaN(e) || !String(e).trim();
}
var s_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Fi(this, e), De(this, "origin", ""), De(this, "number", void 0), De(this, "empty", void 0), mm(t)) {
      this.empty = !0;
      return;
    }
    this.origin = String(t), this.number = Number(t);
  }
  return Pi(e, [{
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
      var a = Math.max(Ys(this.number), Ys(r));
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
      return n ? this.isInvalidate() ? "" : fm(this.number) : this.origin;
    }
  }]), e;
}(), l_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Fi(this, e), De(this, "origin", ""), De(this, "negative", void 0), De(this, "integer", void 0), De(this, "decimal", void 0), De(this, "decimalLen", void 0), De(this, "empty", void 0), De(this, "nan", void 0), mm(t)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(t), t === "-" || Number.isNaN(t)) {
      this.nan = !0;
      return;
    }
    var n = t;
    if (dc(n) && (n = Number(n)), n = typeof n == "string" ? n : fm(n), dm(n)) {
      var r = Jr(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Pi(e, [{
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
    key: "add",
    value: function(n) {
      if (this.isInvalidate())
        return new e(n);
      var r = new e(n);
      if (r.isInvalidate())
        return this;
      var i = Math.max(this.getDecimalStr().length, r.getDecimalStr().length), a = this.alignDecimal(i), o = r.alignDecimal(i), s = (a + o).toString(), c = Jr(s), u = c.negativeStr, d = c.trimStr, f = "".concat(u).concat(d.padStart(i + 1, "0"));
      return new e("".concat(f.slice(0, -i), ".").concat(f.slice(-i)));
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
      return n ? this.isInvalidate() ? "" : Jr("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), e;
}();
function rt(e) {
  return Gs() ? new l_(e) : new s_(e);
}
function mc(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === "")
    return "";
  var i = Jr(e), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(t).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var d = Number(s[n]);
    if (d >= 5 && !r) {
      var f = rt(e).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - d));
      return mc(f.toString(), t, n, r);
    }
    return n === 0 ? u : "".concat(u).concat(t).concat(s.padEnd(n, "0").slice(0, n));
  }
  return c === ".0" ? u : "".concat(u).concat(c);
}
const c_ = (e) => B(e, l.createElement("svg", {
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
})))), Qo = "adm-slider", u_ = (e) => {
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
  } = he(), d = () => ({
    left: `${(t - n) / (r - n) * 100}%`,
    right: "auto"
  }), [f, m] = z(!1), p = Pt((g) => {
    var w;
    if (i)
      return;
    g.first && (c.current = t);
    const C = g.xy[0] - g.initial[0], b = (w = e.trackRef.current) === null || w === void 0 ? void 0 : w.offsetWidth;
    if (!b)
      return;
    const y = C / Math.ceil(b) * (r - n);
    s(c.current + y, g.first, g.last), m(!g.last);
  }, {
    axis: "x",
    pointer: {
      touch: !0
    }
  }), v = typeof e.popover == "function" ? e.popover : e.popover ? (g) => g.toString() : null, h = l.createElement("div", {
    className: `${Qo}-thumb`
  }, a || l.createElement(c_, {
    className: `${Qo}-thumb-icon`
  }));
  return l.createElement("div", Object.assign({
    className: `${Qo}-thumb-container`,
    style: d()
  }, p(), {
    role: "slider",
    "aria-label": e["aria-label"] || u.Slider.name,
    "aria-valuemax": r,
    "aria-valuemin": n,
    "aria-valuenow": t,
    "aria-disabled": i
  }), v ? l.createElement(Q0, {
    content: v(t),
    placement: "top",
    visible: o || f,
    getContainer: null,
    mode: "dark"
  }, h) : h);
}, f_ = u_, Br = "adm-slider", d_ = {
  min: 0,
  max: 100,
  step: 1,
  ticks: !1,
  range: !1,
  disabled: !1,
  popover: !1,
  residentPopover: !1
}, m_ = (e) => {
  var t;
  const n = Z(d_, e), {
    min: r,
    max: i,
    disabled: a,
    marks: o,
    ticks: s,
    step: c,
    icon: u
  } = n;
  function d(x) {
    return x.sort((F, M) => F - M);
  }
  function f(x) {
    return n.range ? x : [n.min, x];
  }
  function m(x, F) {
    const M = rt(x), O = mc(M.toString(), ".", F);
    return rt(O).toNumber();
  }
  function p(x) {
    const F = Math.max(v(c), v(x[0]), v(x[1]));
    return n.range ? x.map((M) => m(M, F)) : m(x[1], F);
  }
  function v(x) {
    return (`${x}`.split(".")[1] || "").length;
  }
  function h(x) {
    var F;
    (F = n.onAfterChange) === null || F === void 0 || F.call(n, p(x));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (Ie("Slider", "When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]"), g = [0, n.value]);
  const [w, C] = te({
    value: g,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : n.range ? [r, r] : r,
    onChange: n.onChange
  }), b = d(f(w));
  function y(x) {
    const F = d(x), M = b;
    F[0] === M[0] && F[1] === M[1] || C(p(F));
  }
  const E = D(null), $ = `${100 * (b[1] - b[0]) / (i - r)}%`, k = `${100 * (b[0] - r) / (i - r)}%`, N = re(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((x, F) => x - F);
    {
      const x = [];
      for (let F = rt(r); F.lessEquals(rt(i)); F = F.add(c))
        x.push(F.toNumber());
      return x;
    }
  }, [o, s, c, r, i]);
  function A(x) {
    const F = x < r ? r : x > i ? i : x;
    let M = r;
    if (N.length)
      M = Kl(N, F);
    else {
      const O = 100 / ((i - r) / c);
      M = Math.round(F / O) * O * (i - r) * 0.01 + r;
    }
    return M;
  }
  const P = D(0), T = (x) => {
    if (P.current > 0 || (x.stopPropagation(), a))
      return;
    const F = E.current;
    if (!F)
      return;
    const M = F.getBoundingClientRect().left, O = (x.clientX - M) / Math.ceil(F.offsetWidth) * (i - r) + r, I = A(O);
    let R;
    n.range ? Math.abs(I - b[0]) > Math.abs(I - b[1]) ? R = [b[0], I] : R = [I, b[1]] : R = [n.min, I], y(R), h(R);
  }, S = D(), _ = (x) => l.createElement(f_, {
    key: x,
    value: b[x],
    min: r,
    max: i,
    disabled: a,
    trackRef: E,
    icon: u,
    popover: n.popover,
    residentPopover: n.residentPopover,
    onDrag: (F, M, O) => {
      M && (P.current += 1, S.current = b);
      const I = A(F), R = S.current;
      if (!R)
        return;
      const j = [...R];
      j[x] = I, y(j), O && (h(j), window.setTimeout(() => {
        P.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return B(n, l.createElement("div", {
    className: V(Br, {
      [`${Br}-disabled`]: a
    })
  }, l.createElement("div", {
    className: `${Br}-track-container`,
    onClick: T
  }, l.createElement("div", {
    className: `${Br}-track`,
    onClick: T,
    ref: E
  }, l.createElement("div", {
    className: `${Br}-fill`,
    style: {
      width: $,
      left: k
    }
  }), n.ticks && l.createElement(i_, {
    points: N,
    min: r,
    max: i,
    lowerBound: b[0],
    upperBound: b[1]
  }), n.range && _(0), _(1))), o && l.createElement(o_, {
    min: r,
    max: i,
    marks: o,
    lowerBound: b[0],
    upperBound: b[1]
  })));
}, aS = m_;
var hm = {}, hc = { exports: {} }, pm = { exports: {} };
(function(e) {
  function t(n) {
    if (Array.isArray(n))
      return n;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(pm);
var vm = { exports: {} };
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
})(vm);
var gm = { exports: {} }, ym = { exports: {} };
(function(e) {
  function t(n, r) {
    (r == null || r > n.length) && (r = n.length);
    for (var i = 0, a = new Array(r); i < r; i++)
      a[i] = n[i];
    return a;
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ym);
(function(e) {
  var t = ym.exports;
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
})(gm);
var bm = { exports: {} };
(function(e) {
  function t() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(bm);
(function(e) {
  var t = pm.exports, n = vm.exports, r = gm.exports, i = bm.exports;
  function a(o, s) {
    return t(o) || n(o, s) || r(o, s) || i();
  }
  e.exports = a, e.exports.__esModule = !0, e.exports.default = e.exports;
})(hc);
var pc = {}, h_ = Ni.exports.default;
Object.defineProperty(pc, "__esModule", {
  value: !0
});
pc.default = p_;
var jf = h_(l);
function p_(e) {
  var t = jf.useRef();
  t.current = e;
  var n = jf.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(a));
  }, []);
  return n;
}
var lr = {}, vc = {};
Object.defineProperty(vc, "__esModule", {
  value: !0
});
vc.default = v_;
function v_() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var g_ = Ti.exports.default, y_ = Ni.exports.default;
Object.defineProperty(lr, "__esModule", {
  value: !0
});
lr.useLayoutUpdateEffect = lr.default = void 0;
var Xs = y_(l), b_ = g_(vc), Qs = (0, b_.default)() ? Xs.useLayoutEffect : Xs.useEffect, w_ = Qs;
lr.default = w_;
var E_ = function(t, n) {
  var r = Xs.useRef(!0);
  Qs(function() {
    if (!r.current)
      return t();
  }, n), Qs(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
};
lr.useLayoutUpdateEffect = E_;
var gc = {}, C_ = Ni.exports.default, $_ = Ti.exports.default;
Object.defineProperty(gc, "__esModule", {
  value: !0
});
gc.default = __;
var x_ = $_(hc.exports), Jo = C_(l);
function __(e) {
  var t = Jo.useRef(!1), n = Jo.useState(e), r = (0, x_.default)(n, 2), i = r[0], a = r[1];
  Jo.useEffect(function() {
    return t.current = !1, function() {
      t.current = !0;
    };
  }, []);
  function o(s, c) {
    c && t.current || a(s);
  }
  return [i, o];
}
var yc = Ti.exports.default;
Object.defineProperty(hm, "__esModule", {
  value: !0
});
var k_ = hm.default = S_, Bf = yc(hc.exports), Wf = yc(pc), Zf = lr, Hf = yc(gc);
function es(e) {
  return e !== void 0;
}
function S_(e, t) {
  var n = t || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = (0, Hf.default)(function() {
    return es(i) ? i : es(r) ? typeof r == "function" ? r() : r : typeof e == "function" ? e() : e;
  }), c = (0, Bf.default)(s, 2), u = c[0], d = c[1], f = i !== void 0 ? i : u, m = o ? o(f) : f, p = (0, Wf.default)(a), v = (0, Hf.default)([f]), h = (0, Bf.default)(v, 2), g = h[0], w = h[1];
  (0, Zf.useLayoutUpdateEffect)(function() {
    var b = g[0];
    u !== b && p(u, b);
  }, [g]), (0, Zf.useLayoutUpdateEffect)(function() {
    es(i) || d(i);
  }, [i]);
  var C = (0, Wf.default)(function(b, y) {
    d(b, y), w([f], y);
  });
  return [m, C];
}
const Gn = "adm-stepper", O_ = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function F_(e, t) {
  const n = Z(O_, e), {
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
    formatter: p,
    parser: v
  } = n, {
    locale: h
  } = he();
  pe(t, () => ({
    focus: () => {
      var R;
      (R = S.current) === null || R === void 0 || R.focus();
    },
    blur: () => {
      var R;
      (R = S.current) === null || R === void 0 || R.blur();
    },
    get nativeElement() {
      var R, j;
      return (j = (R = S.current) === null || R === void 0 ? void 0 : R.nativeElement) !== null && j !== void 0 ? j : null;
    }
  }));
  const g = (R) => (f !== void 0 ? mc(R.toString(), ".", f) : R).toString(), w = (R) => m ? R.toString() : R.toNumber(), C = (R) => {
    if (R === "")
      return null;
    if (v)
      return String(v(R));
    const j = rt(R);
    return j.isInvalidate() ? null : j.toString();
  }, b = (R) => R === null ? "" : p ? p(R) : g(R), [y, E] = k_(r, {
    value: i,
    onChange: (R) => {
      a == null || a(R);
    }
  }), [$, k] = z(() => b(y));
  function N(R) {
    if (R.isNaN())
      return;
    let j = R;
    if (u !== void 0) {
      const H = rt(u);
      j.lessEquals(H) && (j = H);
    }
    if (c !== void 0) {
      const H = rt(c);
      H.lessEquals(j) && (j = H);
    }
    f !== void 0 && (j = rt(g(w(j)))), E(w(j));
  }
  const A = (R) => {
    k(R);
    const j = C(R);
    j === null ? n.allowEmpty ? E(null) : E(r) : N(rt(j));
  }, [P, T] = z(!1), S = l.useRef(null);
  function _(R) {
    T(R), R && k(y != null ? String(y) : "");
  }
  K(() => {
    var R, j, H;
    P && ((H = (j = (R = S.current) === null || R === void 0 ? void 0 : R.nativeElement) === null || j === void 0 ? void 0 : j.select) === null || H === void 0 || H.call(j));
  }, [P]), K(() => {
    P || k(b(y));
  }, [P, y, f]);
  const x = (R) => {
    let j = rt(s);
    R || (j = j.negate()), N(rt(y != null ? y : 0).add(j.toString()));
  }, F = () => {
    x(!1);
  }, M = () => {
    x(!0);
  }, O = () => o ? !0 : y === null ? !1 : u !== void 0 ? y <= u : !1, I = () => o ? !0 : y === null ? !1 : c !== void 0 ? y >= c : !1;
  return B(n, l.createElement("div", {
    className: V(Gn, {
      [`${Gn}-active`]: P
    })
  }, l.createElement(rn, {
    className: `${Gn}-minus`,
    onClick: F,
    disabled: O(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.decrease
  }, l.createElement(b8, null)), l.createElement("div", {
    className: `${Gn}-middle`
  }, l.createElement(lm, {
    ref: S,
    className: `${Gn}-input`,
    onFocus: (R) => {
      var j;
      _(!0), (j = n.onFocus) === null || j === void 0 || j.call(n, R);
    },
    value: $,
    onChange: (R) => {
      o || A(R);
    },
    disabled: o,
    onBlur: (R) => {
      var j;
      _(!1), (j = n.onBlur) === null || j === void 0 || j.call(n, R);
    },
    readOnly: d,
    role: "spinbutton",
    "aria-valuenow": Number($),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), l.createElement(rn, {
    className: `${Gn}-plus`,
    onClick: M,
    disabled: I(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.increase
  }, l.createElement(s1, null))));
}
const P_ = de(F_), oS = P_;
const yn = "adm-step", A_ = (e) => {
  const {
    title: t,
    description: n,
    icon: r,
    status: i = "wait"
  } = e;
  return B(e, l.createElement("div", {
    className: V(`${yn}`, `${yn}-status-${i}`)
  }, l.createElement("div", {
    className: `${yn}-indicator`
  }, l.createElement("div", {
    className: `${yn}-icon-container`
  }, r)), l.createElement("div", {
    className: `${yn}-content`
  }, l.createElement("div", {
    className: `${yn}-title`
  }, t), !!n && l.createElement("div", {
    className: `${yn}-description`
  }, n))));
}, Uf = "adm-steps", N_ = "adm-step", T_ = l.createElement("span", {
  className: `${N_}-icon-dot`
}), R_ = {
  current: 0,
  direction: "horizontal"
}, M_ = (e) => {
  const t = Z(R_, e), {
    direction: n,
    current: r
  } = t, i = V(Uf, `${Uf}-${n}`);
  return B(t, l.createElement("div", {
    className: i
  }, l.Children.map(t.children, (a, o) => {
    var s;
    if (!l.isValidElement(a))
      return a;
    const c = a.props;
    let u = c.status || "wait";
    o < r ? u = c.status || "finish" : o === r && (u = c.status || "process");
    const d = (s = c.icon) !== null && s !== void 0 ? s : T_;
    return l.cloneElement(a, {
      status: u,
      icon: d
    });
  })));
}, sS = ie(M_, {
  Step: A_
});
const Gt = "adm-swipe-action", I_ = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, L_ = de((e, t) => {
  const n = Z(I_, e), r = D(null), i = D(null), a = D(null);
  function o(w) {
    const C = w.current;
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
  }, d] = Ae(() => ({
    x: 0,
    config: {
      tension: 200,
      friction: 30
    }
  }), []), f = D(!1), m = D(null);
  function p() {
    var w;
    (w = m.current) === null || w === void 0 || w.call(m), f.current = !1;
  }
  const v = Pt((w) => {
    var C;
    if (m.current = w.cancel, !w.intentional || (w.down && (f.current = !0), !f.current))
      return;
    const [b] = w.offset;
    if (w.last) {
      const y = s(), E = c();
      let $ = b + w.velocity[0] * w.direction[0] * 50;
      b > 0 ? $ = Math.max(0, $) : b < 0 ? $ = Math.min(0, $) : $ = 0;
      const k = Kl([-E, 0, y], $);
      d.start({
        x: k
      }), k !== 0 && ((C = e.onActionsReveal) === null || C === void 0 || C.call(e, k > 0 ? "left" : "right")), window.setTimeout(() => {
        f.current = !1;
      });
    } else
      d.start({
        x: b,
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
    }), p();
  }
  pe(t, () => ({
    show: (w = "right") => {
      var C;
      w === "right" ? d.start({
        x: -c()
      }) : w === "left" && d.start({
        x: s()
      }), (C = e.onActionsReveal) === null || C === void 0 || C.call(e, w);
    },
    close: h
  })), K(() => {
    if (!n.closeOnTouchOutside)
      return;
    function w(C) {
      if (u.get() === 0)
        return;
      const b = r.current;
      b && !b.contains(C.target) && h();
    }
    return document.addEventListener("touchstart", w), () => {
      document.removeEventListener("touchstart", w);
    };
  }, [n.closeOnTouchOutside]);
  function g(w) {
    var C, b;
    const y = (C = w.color) !== null && C !== void 0 ? C : "light";
    return l.createElement(rn, {
      key: w.key,
      className: `${Gt}-action-button`,
      style: {
        "--background-color": (b = D_[y]) !== null && b !== void 0 ? b : y
      },
      onClick: (E) => {
        var $, k;
        n.closeOnAction && h(), ($ = w.onClick) === null || $ === void 0 || $.call(w, E), (k = n.onAction) === null || k === void 0 || k.call(n, w, E);
      }
    }, w.text);
  }
  return B(n, l.createElement("div", Object.assign({
    className: Gt
  }, v(), {
    ref: r,
    onClickCapture: (w) => {
      f.current && (w.stopPropagation(), w.preventDefault());
    }
  }), l.createElement(ue.div, {
    className: `${Gt}-track`,
    style: {
      x: u
    }
  }, nn(n.stopPropagation, l.createElement("div", {
    className: `${Gt}-actions ${Gt}-actions-left`,
    ref: i
  }, n.leftActions.map(g))), l.createElement("div", {
    className: `${Gt}-content`,
    onClickCapture: (w) => {
      u.goal !== 0 && (w.preventDefault(), w.stopPropagation(), h());
    }
  }, l.createElement(ue.div, {
    style: {
      pointerEvents: u.to((w) => w !== 0 && u.goal !== 0 ? "none" : "auto")
    }
  }, n.children)), nn(n.stopPropagation, l.createElement("div", {
    className: `${Gt}-actions ${Gt}-actions-right`,
    ref: a
  }, n.rightActions.map(g))))));
}), D_ = {
  light: "var(--adm-color-light)",
  weak: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  success: "var(--adm-color-success)",
  warning: "var(--adm-color-warning)",
  danger: "var(--adm-color-danger)"
}, lS = L_;
const wm = (e) => B(e, l.createElement("div", {
  className: "adm-swiper-item",
  onClick: e.onClick
}, e.children));
function V_(e) {
  const [t, n] = z(e), r = D(t);
  return K(() => {
    r.current = t;
  }, [t]), [t, n, r];
}
function j_(e, t) {
  const n = Object.keys(e), r = Object.keys(t), i = /* @__PURE__ */ new Set([...n, ...r]), a = {};
  return i.forEach((o) => {
    const s = e[o], c = t[o];
    typeof s == "function" && typeof c == "function" ? a[o] = function(...u) {
      s(...u), c(...u);
    } : a[o] = s || c;
  }), a;
}
const $t = "adm-swiper", B_ = {
  mousedown: "onMouseDown",
  mousemove: "onMouseMove",
  mouseup: "onMouseUp"
}, W_ = {
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
let Ji;
const Z_ = de(Rl((e, t) => {
  const n = Z(W_, e), [r] = z({}), i = n.direction === "vertical", a = n.slideSize / 100, o = n.trackOffset / 100, {
    validChildren: s,
    count: c
  } = re(() => {
    let u = 0;
    return {
      validChildren: l.Children.map(n.children, (f) => l.isValidElement(f) ? f.type !== wm ? (Ie("Swiper", "The children of `Swiper` must be `Swiper.Item` components."), null) : (u++, f) : null),
      count: u
    };
  }, [n.children]);
  return c === 0 || !s ? (Ie("Swiper", "`Swiper` needs at least one child."), null) : () => {
    let u = n.loop;
    a * (c - 1) < 1 && (u = !1);
    const d = D(null);
    function f() {
      const O = d.current;
      return O ? (i ? O.offsetHeight : O.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [m, p] = z(n.defaultIndex), [v, h, g] = V_(!1);
    function w(O) {
      let I = 0, R = c - 1;
      return n.stuckAtBoundary && (I += o / a, R -= (1 - a - o) / a), _e(O, I, R);
    }
    const [{
      position: C
    }, b] = Ae(() => ({
      position: w(m) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if (g.current || !u)
          return;
        const O = C.get(), I = 100 * c, R = ts(O, I);
        R !== O && b.start({
          position: R,
          immediate: !0
        });
      }
    }), [c]), y = D(null);
    function E() {
      var O;
      (O = y.current) === null || O === void 0 || O.call(y), g.current = !1;
    }
    const $ = Pt((O) => {
      if (y.current = O.cancel, !O.intentional || (O.first && !Ji && (Ji = r), Ji !== r))
        return;
      Ji = O.last ? void 0 : r;
      const I = f();
      if (!I)
        return;
      const R = i ? 1 : 0, j = O.offset[R], H = O.direction[R], U = O.velocity[R];
      if (h(!0), !O.last)
        b.start({
          position: j * 100 / I,
          immediate: !0
        });
      else {
        const q = Math.floor(j / I), X = q + 1, G = Math.round((j + U * 2e3 * H) / I);
        k(_e(G, q, X)), window.setTimeout(() => {
          h(!1);
        });
      }
    }, {
      transform: ([O, I]) => [-O, -I],
      from: () => {
        const O = f();
        return [C.get() / 100 * O, C.get() / 100 * O];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (u)
          return {};
        const O = f(), I = w(0) * O, R = w(c - 1) * O;
        return i ? {
          top: I,
          bottom: R
        } : {
          left: I,
          right: R
        };
      },
      rubberband: n.rubberband,
      axis: i ? "y" : "x",
      preventScroll: !i,
      pointer: {
        touch: !0
      }
    });
    function k(O, I = !1) {
      var R;
      const j = Math.round(O), H = u ? ts(j, c) : _e(j, 0, c - 1);
      p(H), H !== m && ((R = n.onIndexChange) === null || R === void 0 || R.call(n, H)), b.start({
        position: (u ? j : w(j)) * 100,
        immediate: I
      });
    }
    function N() {
      k(Math.round(C.get() / 100) + 1);
    }
    function A() {
      k(Math.round(C.get() / 100) - 1);
    }
    pe(t, () => ({
      swipeTo: k,
      swipeNext: N,
      swipePrev: A
    })), $e(() => {
      const O = s.length - 1;
      m > O && k(O, !0);
    });
    const {
      autoplay: P,
      autoplayInterval: T
    } = n;
    K(() => {
      if (!P || v)
        return;
      let O;
      function I() {
        O = window.setTimeout(I, T), N();
      }
      return O = window.setTimeout(I, T), () => {
        O && window.clearTimeout(O);
      };
    }, [P, T, v, c]);
    function S() {
      return u ? l.createElement("div", {
        className: `${$t}-track-inner`
      }, l.Children.map(s, (O, I) => l.createElement(ue.div, {
        className: V(`${$t}-slide`, {
          [`${$t}-slide-active`]: m === I
        }),
        style: {
          [i ? "y" : "x"]: C.to((R) => {
            let j = -R + I * 100;
            const H = c * 100, U = H / 2;
            return j = ts(j + U, H) - U, `${j}%`;
          }),
          [i ? "top" : "left"]: `-${I * 100}%`
        }
      }, O))) : l.createElement(ue.div, {
        className: `${$t}-track-inner`,
        style: {
          [i ? "y" : "x"]: C.to((O) => `${-O}%`)
        }
      }, l.Children.map(s, (O) => l.createElement("div", {
        className: `${$t}-slide`
      }, O)));
    }
    const _ = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, x = Object.assign({}, n.allowTouchMove ? $() : {}), F = {};
    for (const O of n.stopPropagation) {
      const I = B_[O];
      F[I] = function(R) {
        R.stopPropagation();
      };
    }
    const M = j_(x, F);
    return B(n, l.createElement("div", {
      className: V($t, `${$t}-${n.direction}`),
      style: _
    }, l.createElement("div", Object.assign({
      ref: d,
      className: V(`${$t}-track`, {
        [`${$t}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (O) => {
        g.current && O.stopPropagation(), E();
      }
    }, M), S()), n.indicator === void 0 ? l.createElement("div", {
      className: `${$t}-indicator`
    }, l.createElement(Sx, Object.assign({}, n.indicatorProps, {
      total: c,
      current: m,
      direction: n.direction
    }))) : n.indicator(c, m)));
  };
}));
function ts(e, t) {
  const n = e % t;
  return n < 0 ? n + t : n;
}
const cS = ie(Z_, {
  Item: wm
});
const H_ = Ve((e) => B(e, l.createElement("svg", {
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
})))))))), bn = "adm-switch", U_ = {
  defaultChecked: !1
}, z_ = (e) => {
  const t = Z(U_, e), n = t.disabled || t.loading || !1, [r, i] = z(!1), {
    locale: a
  } = he(), [o, s] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  });
  function c() {
    return Ee(this, void 0, void 0, function* () {
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
      if (F1(d)) {
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
    className: V(bn, {
      [`${bn}-checked`]: o,
      [`${bn}-disabled`]: n || r
    }),
    role: "switch",
    "aria-label": a.Switch.name,
    "aria-checked": o,
    "aria-disabled": n
  }, l.createElement("div", {
    className: `${bn}-checkbox`
  }, l.createElement("div", {
    className: `${bn}-handle`
  }, (t.loading || r) && l.createElement(H_, {
    className: `${bn}-spin-icon`
  })), l.createElement("div", {
    className: `${bn}-inner`
  }, o ? t.checkedText : t.uncheckedText))));
}, uS = z_;
const q_ = () => null, Rt = "adm-tab-bar", K_ = {
  safeArea: !1
}, G_ = (e) => {
  var t;
  const n = Z(K_, e);
  let r = null;
  const i = [];
  sn(n.children, (s, c) => {
    if (!l.isValidElement(s))
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
    className: Rt
  }, l.createElement("div", {
    className: `${Rt}-wrap`
  }, i.map((s) => {
    const c = s.key === a;
    function u() {
      const d = s.props.icon && l.createElement("div", {
        className: `${Rt}-item-icon`
      }, typeof s.props.icon == "function" ? s.props.icon(c) : s.props.icon), f = s.props.title && l.createElement("div", {
        className: V(`${Rt}-item-title`, Boolean(d) && `${Rt}-item-title-with-icon`)
      }, typeof s.props.title == "function" ? s.props.title(c) : s.props.title);
      return d ? l.createElement(l.Fragment, null, l.createElement(xs, {
        content: s.props.badge,
        className: `${Rt}-icon-badge`
      }, d), f) : f ? l.createElement(xs, {
        content: s.props.badge,
        className: `${Rt}-title-badge`
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
      className: V(`${Rt}-item`, {
        [`${Rt}-item-active`]: c
      })
    }, u()));
  })), n.safeArea && l.createElement(Cr, {
    position: "bottom"
  })));
}, fS = ie(G_, {
  Item: q_
});
const zf = "adm-tag", Y_ = {
  default: "#666666",
  primary: "var(--adm-color-primary, #1677ff)",
  success: "var(--adm-color-success, #00b578)",
  warning: "var(--adm-color-warning, #ff8f1f)",
  danger: "var(--adm-color-danger, #ff3141)"
}, X_ = {
  color: "default",
  fill: "solid",
  round: !1
}, Q_ = (e) => {
  var t;
  const n = Z(X_, e), r = (t = Y_[n.color]) !== null && t !== void 0 ? t : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return B(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: V(zf, {
      [`${zf}-round`]: n.round
    })
  }, n.children));
}, dS = Q_;
const Wr = "adm-text-area", Em = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, Cm = de((e, t) => {
  const n = Z(Em, e), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = te(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value === null && u9("TextArea", "`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.");
  const c = D(null), u = D("auto"), d = D(null);
  pe(t, () => ({
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
  })), $e(() => {
    if (!r)
      return;
    const v = c.current, h = d.current;
    if (!v || (v.style.height = u.current, !h))
      return;
    let g = h.scrollHeight;
    if (typeof r == "object") {
      const w = window.getComputedStyle(v), C = parseFloat(w.lineHeight);
      r.minRows && (g = Math.max(g, r.minRows * C)), r.maxRows && (g = Math.min(g, r.maxRows * C));
    }
    u.current = `${g}px`, v.style.height = `${g}px`;
  }, [o, r]);
  const f = D(!1);
  let m;
  const p = ia(o).length;
  return typeof i == "function" ? m = i(p, a) : i && (m = l.createElement("div", {
    className: `${Wr}-count`
  }, a === void 0 ? p : p + "/" + a)), B(n, l.createElement("div", {
    className: Wr
  }, l.createElement("textarea", {
    ref: c,
    className: `${Wr}-element`,
    rows: n.rows,
    value: o,
    placeholder: n.placeholder,
    onChange: (v) => {
      let h = v.target.value;
      a && !f.current && (h = ia(h).slice(0, a).join("")), s(h);
    },
    id: n.id,
    onCompositionStart: (v) => {
      var h;
      f.current = !0, (h = n.onCompositionStart) === null || h === void 0 || h.call(n, v);
    },
    onCompositionEnd: (v) => {
      var h;
      if (f.current = !1, a) {
        const g = v.target.value;
        s(ia(g).slice(0, a).join(""));
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
    onClick: n.onClick
  }), m, r && l.createElement("textarea", {
    ref: d,
    className: `${Wr}-element ${Wr}-element-hidden`,
    value: o,
    rows: n.rows,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
Cm.defaultProps = Em;
const mS = Cm;
const Mt = "adm-toast", J_ = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, ek = (e) => {
  const t = Z(J_, e), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = t, o = re(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(c1, {
          className: `${Mt}-icon-success`
        });
      case "fail":
        return l.createElement($i, {
          className: `${Mt}-icon-fail`
        });
      case "loading":
        return l.createElement(jl, {
          color: "white",
          className: `${Mt}-loading`
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
  return l.createElement(Ci, {
    visible: t.visible,
    destroyOnClose: !0,
    opacity: 0,
    disableBodyScroll: !n,
    getContainer: t.getContainer,
    afterClose: t.afterClose,
    style: Object.assign({
      pointerEvents: n ? "none" : "auto"
    }, t.maskStyle),
    className: V(`${Mt}-mask`, t.maskClassName),
    stopPropagation: t.stopPropagation
  }, l.createElement("div", {
    className: V(`${Mt}-wrap`)
  }, l.createElement("div", {
    style: {
      top: s
    },
    className: V(`${Mt}-main`, i ? `${Mt}-main-icon` : `${Mt}-main-text`)
  }, o && l.createElement("div", {
    className: `${Mt}-icon`
  }, o), l.createElement(li, null, r))));
};
let Vt = null, ns = null;
const sa = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, tk = (e) => l.createElement(ek, Object.assign({}, e));
function nk(e) {
  const t = Z(sa, typeof e == "string" ? {
    content: e
  } : e), n = l.createElement(tk, Object.assign({}, t, {
    onClose: () => {
      Vt = null;
    }
  }));
  return Vt ? Vt.replace(n) : Vt = $r(n), ns && window.clearTimeout(ns), t.duration !== 0 && (ns = window.setTimeout(() => {
    $m();
  }, t.duration)), Vt;
}
function $m() {
  Vt == null || Vt.close(), Vt = null;
}
function rk(e) {
  e.duration !== void 0 && (sa.duration = e.duration), e.position !== void 0 && (sa.position = e.position), e.maskClickable !== void 0 && (sa.maskClickable = e.maskClickable);
}
const ik = {
  show: nk,
  clear: $m,
  config: rk
}, hS = ik;
function xm(e, t = "children") {
  const n = (r) => {
    let i = 0;
    return r.forEach((a) => {
      a[t] ? i = Math.max(i, n(a[t]) + 1) : i = Math.max(i, 1);
    }), i;
  };
  return n(e);
}
const ea = "adm-tree-select", ak = {
  options: [],
  fieldNames: {},
  defaultValue: []
}, ok = (e) => {
  const t = Z(ak, e), n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), [s, c, u] = re(() => {
    const p = xm(t.options, i), v = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    function g(w, C) {
      C.forEach((b) => {
        h.set(b[r], w), v.set(b[r], b), b[i] && g(b, b[i]);
      });
    }
    return g(void 0, t.options), [p, v, h];
  }, [t.options]), d = (p) => {
    var v;
    const h = [];
    let g = p;
    for (; g; )
      h.push(g), g = u.get(g[r]);
    const w = h.reverse().map((C) => C[r]);
    o(w), (v = t.onChange) === null || v === void 0 || v.call(t, w, {
      options: h
    });
  }, f = (p = [], v) => p.map((h) => {
    const g = h[r] === a[v];
    return l.createElement("div", {
      key: h[r],
      className: V(`${ea}-item`, {
        [`${ea}-item-active`]: g
      }),
      onClick: () => {
        g || d(h);
      }
    }, h[n]);
  }), m = () => {
    var p;
    const v = [];
    for (let h = 0; h < s; h++) {
      let g = `${100 / s}%`;
      s === 2 && h === 0 && (g = "33.33%"), s === 2 && h === 1 && (g = "66.67%");
      const w = l.createElement("div", {
        key: h,
        className: V(`${ea}-column`),
        style: {
          width: g
        }
      }, f(h === 0 ? t.options : (p = c.get(a[h - 1])) === null || p === void 0 ? void 0 : p[i], h));
      v.push(w);
    }
    return v;
  };
  return B(t, l.createElement("div", {
    className: ea
  }, m()));
}, nt = "adm-tree-select-multiple", sk = (e) => {
  const t = Z({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, e);
  K(() => {
    Ie("TreeSelect", "TreeSelect.Multiple has been deprecated.");
  }, []);
  const n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.expandKeys,
    defaultValue: t.defaultExpandKeys
  }), [s, c] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), u = (k) => {
    const N = [], A = (P) => {
      var T;
      !P || (!((T = P[i]) === null || T === void 0) && T.length ? P[i].forEach((S) => A(S)) : N.push(P[r]));
    };
    return A(k), N;
  }, [d, f, m] = re(() => {
    const k = xm(t.options, i), N = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map();
    function P(T, S) {
      S.forEach((_) => {
        A.set(_[r], T), N.set(_[r], _), _[i] && P(_, _[i]);
      });
    }
    return P(void 0, t.options), [k, N, A];
  }, [t.options]), p = re(() => {
    let k = [];
    return s.forEach((N) => {
      const A = f.get(N);
      k = k.concat(u(A));
    }), k;
  }, [s, f]), v = re(() => {
    const k = /* @__PURE__ */ new Map(), N = (A) => {
      const P = m.get(A);
      !P || (k.set(P[r], !0), N(P[r]));
    };
    return p.forEach((A) => {
      k.set(A, !0), N(A);
    }), k;
  }, [m, s]), h = (k) => {
    var N;
    let A = [...k], P = [];
    const T = (_) => {
      _.forEach((x) => {
        var F;
        if (P.includes(x))
          return;
        const M = m.get(x);
        if (!M)
          return;
        const O = ((F = M[i]) === null || F === void 0 ? void 0 : F.map((I) => I[r])) || [];
        O.every((I) => A.includes(I)) && (A.push(M[r]), P = P.concat(O));
      });
    };
    for (let _ = 0; _ < d; _++)
      T(A);
    A = A.filter((_) => !P.includes(_));
    const S = A.map((_) => f.get(_));
    c(A), (N = t.onChange) === null || N === void 0 || N.call(t, A, S);
  }, g = (k) => {
    var N;
    const A = [];
    let P = k;
    for (; P; )
      A.unshift(P), P = m.get(P[r]);
    const T = A.map((S) => S[r]);
    o(T), (N = t.onExpand) === null || N === void 0 || N.call(t, T, A);
  }, w = (k, N) => {
    var A;
    const P = (A = t.selectAllText) === null || A === void 0 ? void 0 : A[N];
    if (!P)
      return;
    let T = [];
    k.forEach((_) => {
      T = T.concat(u(_));
    });
    const S = T.every((_) => p.includes(_));
    return l.createElement("div", {
      onClick: () => {
        h(S ? p.filter((_) => !T.includes(_)) : p.concat(T));
      },
      className: `${nt}-item`
    }, P);
  }, C = (k, N) => {
    var A;
    const P = (A = t.selectAllText) === null || A === void 0 ? void 0 : A[N];
    if (!P)
      return;
    const T = k.map((x) => x[r]), S = T.every((x) => p.includes(x)), _ = S ? !1 : T.some((x) => p.includes(x));
    return l.createElement("div", {
      onClick: () => {
        h(S ? p.filter((x) => !T.includes(x)) : p.concat(T));
      },
      className: V(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Qu, {
      className: `${nt}-item-checkbox`,
      checked: S,
      indeterminate: _
    }), P);
  }, b = (k) => {
    const N = a.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        N || g(k);
      },
      className: V(`${nt}-item`, {
        [`${nt}-item-expand`]: N
      })
    }, k[n], !!v.get(k[r]) && l.createElement("div", {
      className: `${nt}-dot`
    }));
  }, y = (k) => {
    const N = p.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        h(N ? p.filter((A) => A !== k[r]) : [...p, k[r]]);
      },
      className: V(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Qu, {
      className: `${nt}-item-checkbox`,
      checked: N
    }), k[n]);
  }, E = (k = [], N) => k.length === 0 ? void 0 : d === N + 1 ? l.createElement(l.Fragment, null, C(k, N), k.map((P) => y(P))) : l.createElement(l.Fragment, null, w(k, N), k.map((P) => b(P))), $ = () => {
    var k;
    const N = [];
    for (let A = 0; A < d; A++) {
      let P = `${100 / d}%`;
      d === 2 && A === 0 && (P = "33.33%"), d === 2 && A === 1 && (P = "66.67%");
      const T = l.createElement("div", {
        key: A,
        className: V(`${nt}-column`),
        style: {
          width: P
        }
      }, E(A === 0 ? t.options : (k = f.get(a[A - 1])) === null || k === void 0 ? void 0 : k[i], A));
      N.push(T);
    }
    return N;
  };
  return B(t, l.createElement("div", {
    className: nt
  }, $()));
}, pS = ie(ok, {
  Multiple: sk
});
const wn = "adm-virtual-input", lk = {
  defaultValue: ""
}, ck = de((e, t) => {
  const n = Z(lk, e), [r, i] = te(n), a = D(null), o = D(null), [s, c] = z(!1), {
    locale: u
  } = he();
  function d() {
    const h = a.current;
    if (!h || document.activeElement !== h)
      return;
    const g = o.current;
    !g || (g.scrollLeft = g.clientWidth);
  }
  $e(() => {
    d();
  }, [r]), K(() => {
    s && d();
  }, [s]), pe(t, () => ({
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
  const p = n.keyboard, v = p && l.cloneElement(p, {
    onInput: (h) => {
      var g, w;
      i(r + h), (w = (g = p.props).onInput) === null || w === void 0 || w.call(g, h);
    },
    onDelete: () => {
      var h, g;
      i(r.slice(0, -1)), (g = (h = p.props).onDelete) === null || g === void 0 || g.call(h);
    },
    visible: s,
    onClose: () => {
      var h, g, w;
      (h = a.current) === null || h === void 0 || h.blur(), (w = (g = p.props).onClose) === null || w === void 0 || w.call(g);
    },
    getContainer: null
  });
  return B(n, l.createElement("div", {
    ref: a,
    className: V(wn, {
      [`${wn}-disabled`]: n.disabled
    }),
    tabIndex: n.disabled ? void 0 : 0,
    role: "option",
    onFocus: f,
    onBlur: m,
    onClick: n.onClick
  }, l.createElement("div", {
    className: `${wn}-content`,
    ref: o,
    "aria-disabled": n.disabled,
    "aria-label": n.placeholder
  }, r, l.createElement("div", {
    className: `${wn}-caret-container`
  }, s && l.createElement("div", {
    className: `${wn}-caret`
  }))), n.clearable && !!r && s && l.createElement("div", {
    className: `${wn}-clear`,
    onClick: (h) => {
      var g;
      h.stopPropagation(), i(""), (g = n.onClear) === null || g === void 0 || g.call(n);
    },
    role: "button",
    "aria-label": u.Input.clear
  }, l.createElement(Xa, null)), !r && l.createElement("div", {
    className: `${wn}-placeholder`
  }, n.placeholder), v));
}), vS = ck;
const qf = "adm-water-mark", uk = {
  fullPage: !0
}, fk = (e) => {
  const t = Z(uk, e), {
    zIndex: n = 2e3,
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
    fontWeight: p = "normal",
    fontColor: v = "rgba(0,0,0,.15)",
    fontSize: h = 14,
    fontFamily: g = "sans-serif"
  } = t, [w, C] = z("");
  return K(() => {
    const b = document.createElement("canvas"), y = window.devicePixelRatio, E = b.getContext("2d"), $ = `${(r + a) * y}px`, k = `${(i + o) * y}px`, N = a * y, A = o * y;
    if (b.setAttribute("width", $), b.setAttribute("height", k), E) {
      if (c) {
        E.translate(N / 2, A / 2), E.rotate(Math.PI / 180 * Number(s));
        const P = new Image();
        P.crossOrigin = "anonymous", P.referrerPolicy = "no-referrer", P.onload = () => {
          E.drawImage(P, -u * y / 2, -d * y / 2, u * y, d * y), E.restore(), C(b.toDataURL());
        }, P.src = c;
      } else if (f) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(N / 2, A / 2), E.rotate(Math.PI / 180 * Number(s));
        const P = Number(h) * y;
        E.font = `${m} normal ${p} ${P}px/${A}px ${g}`, E.fillStyle = v, Array.isArray(f) ? f.forEach((T, S) => E.fillText(T, 0, S * P)) : E.fillText(f, 0, 0), E.restore(), C(b.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, p, a, o, g, v, c, f, h]), B(t, l.createElement("div", {
    className: V(qf, {
      [`${qf}-full-page`]: t.fullPage
    }),
    style: {
      zIndex: n,
      backgroundSize: `${r + a}px`,
      backgroundImage: `url('${w}')`
    }
  }));
}, gS = fk;
const En = "adm-footer", dk = {
  label: "",
  links: [],
  content: "",
  chips: []
}, mk = (e) => {
  const t = Z(dk, e), {
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
    className: V(En)
  }, n && l.createElement("div", {
    className: `${En}-label`
  }, l.createElement(tf, null, n)), r && r.length > 0 && l.createElement("div", {
    className: `${En}-links`
  }, r.map((d, f) => l.createElement(l.Fragment, {
    key: f
  }, l.createElement("a", {
    href: d.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(d, f, m)
  }, d.text), f !== r.length - 1 && l.createElement(tf, {
    direction: "vertical"
  })))), i && l.createElement("div", {
    className: `${En}-content`
  }, i), a && a.length > 0 && l.createElement("div", {
    className: `${En}-chips`
  }, a.map((d, f) => l.createElement("div", {
    key: f,
    onClick: () => c(d, f),
    className: V(`${En}-chip`, {
      [`${En}-chip-link`]: d.type === "link"
    })
  }, d.text)))));
}, yS = mk;
export {
  yk as ActionSheet,
  li as AutoCenter,
  bk as Avatar,
  xs as Badge,
  rn as Button,
  wk as Calendar,
  Ek as CapsuleTabs,
  Ck as Card,
  _k as CascadePicker,
  kk as CascadePickerView,
  Sk as Cascader,
  G9 as CascaderView,
  Y1 as CenterPopup,
  Yu as CheckList,
  Qu as Checkbox,
  Ok as Collapse,
  gk as ConfigProvider,
  Fk as DatePicker,
  Pk as DatePickerView,
  Ak as Dialog,
  tf as Divider,
  O1 as DotLoading,
  Nk as Dropdown,
  Tk as Ellipsis,
  Rk as Empty,
  Mk as ErrorBlock,
  Ik as FloatingBubble,
  Lk as FloatingPanel,
  yS as Footer,
  Dk as Form,
  em as Grid,
  eo as Image,
  Vk as ImageUploader,
  G$ as ImageViewer,
  jk as IndexBar,
  Bk as InfiniteScroll,
  lm as Input,
  Wk as JumboTabs,
  St as List,
  Zk as Loading,
  Ci as Mask,
  Hk as Modal,
  Uk as NavBar,
  zk as NoticeBar,
  qk as NumberKeyboard,
  Sx as PageIndicator,
  Kk as PasscodeInput,
  Z1 as Picker,
  Bl as PickerView,
  Q0 as Popover,
  _i as Popup,
  Gk as ProgressBar,
  Yk as ProgressCircle,
  Xk as PullToRefresh,
  Qk as Radio,
  Jk as Rate,
  eS as Result,
  tS as ResultPage,
  Cr as SafeArea,
  N1 as ScrollMask,
  nS as SearchBar,
  rS as Selector,
  iS as SideBar,
  zi as Skeleton,
  aS as Slider,
  uc as Space,
  jl as SpinLoading,
  oS as Stepper,
  sS as Steps,
  lS as SwipeAction,
  cS as Swiper,
  uS as Switch,
  fS as TabBar,
  Gu as Tabs,
  dS as Tag,
  mS as TextArea,
  hS as Toast,
  pS as TreeSelect,
  vS as VirtualInput,
  gS as WaterMark,
  qb as createErrorBlock,
  $k as reduceMotion,
  xk as restoreMotion,
  vk as setDefaultConfig
};
