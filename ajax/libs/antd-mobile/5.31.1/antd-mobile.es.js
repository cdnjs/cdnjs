import * as L from "react";
import l, { useContext as ot, useRef as D, useMemo as re, useEffect as G, useState as q, useCallback as Ue, useLayoutEffect as Qs, forwardRef as de, useImperativeHandle as ve, memo as Ve, createContext as Js, cloneElement as _m } from "react";
import * as km from "react-dom";
import { unstable_batchedUpdates as Sm, createPortal as Om, findDOMNode as Fm } from "react-dom";
const lr = !!(typeof window < "u" && typeof document < "u" && window.document && window.document.createElement);
lr && document.addEventListener("touchstart", () => {
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
function pi(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
}
function $e(e, t, n, r) {
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
function Nm(e) {
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
function el(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Am(e, t) {
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
const ze = "${label} is not a valid ${type}", Tm = {
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
}, qe = "${label}\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684${type}", Rm = Am(Tm, {
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
}), Mm = Rm, Gf = {
  current: {
    locale: Mm
  }
};
function vk(e) {
  Gf.current = e;
}
function vi() {
  return Gf.current;
}
const Yf = l.createContext(null), Im = (e) => {
  const {
    children: t
  } = e, n = pi(e, ["children"]), r = pe();
  return l.createElement(Yf.Provider, {
    value: Object.assign(Object.assign({}, r), n)
  }, t);
};
function pe() {
  var e;
  return (e = ot(Yf)) !== null && e !== void 0 ? e : vi();
}
const gk = Im;
function ie(e, t) {
  const n = e;
  for (const r in t)
    t.hasOwnProperty(r) && (n[r] = t[r]);
  return n;
}
var _t = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Xf = { exports: {} };
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
})(Xf);
const j = Xf.exports;
function B(e, t) {
  const n = Object.assign({}, t.props);
  e.className && (n.className = j(t.props.className, e.className)), e.style && (n.style = Object.assign(Object.assign({}, n.style), e.style)), e.tabIndex !== void 0 && (n.tabIndex = e.tabIndex);
  for (const r in e)
    !e.hasOwnProperty(r) || (r.startsWith("data-") || r.startsWith("aria-")) && (n[r] = e[r]);
  return l.cloneElement(t, n);
}
var Lm = typeof _t == "object" && _t && _t.Object === Object && _t, Qf = Lm, Dm = Qf, Vm = typeof self == "object" && self && self.Object === Object && self, jm = Dm || Vm || Function("return this")(), yt = jm, Bm = yt, Wm = Bm.Symbol, tl = Wm, bc = tl, Jf = Object.prototype, Zm = Jf.hasOwnProperty, Hm = Jf.toString, kr = bc ? bc.toStringTag : void 0;
function Um(e) {
  var t = Zm.call(e, kr), n = e[kr];
  try {
    e[kr] = void 0;
    var r = !0;
  } catch {
  }
  var i = Hm.call(e);
  return r && (t ? e[kr] = n : delete e[kr]), i;
}
var zm = Um, qm = Object.prototype, Km = qm.toString;
function Gm(e) {
  return Km.call(e);
}
var Ym = Gm, wc = tl, Xm = zm, Qm = Ym, Jm = "[object Null]", eh = "[object Undefined]", Ec = wc ? wc.toStringTag : void 0;
function th(e) {
  return e == null ? e === void 0 ? eh : Jm : Ec && Ec in Object(e) ? Xm(e) : Qm(e);
}
var cr = th;
function nh(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Pt = nh, rh = cr, ih = Pt, ah = "[object AsyncFunction]", oh = "[object Function]", sh = "[object GeneratorFunction]", lh = "[object Proxy]";
function ch(e) {
  if (!ih(e))
    return !1;
  var t = rh(e);
  return t == oh || t == sh || t == ah || t == lh;
}
var nl = ch, uh = yt, fh = uh["__core-js_shared__"], dh = fh, So = dh, Cc = function() {
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
var ed = gh, yh = nl, bh = hh, wh = Pt, Eh = ed, Ch = /[\\^$.*+?()[\]{}|]/g, $h = /^\[object .+?Constructor\]$/, xh = Function.prototype, _h = Object.prototype, kh = xh.toString, Sh = _h.hasOwnProperty, Oh = RegExp(
  "^" + kh.call(Sh).replace(Ch, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fh(e) {
  if (!wh(e) || bh(e))
    return !1;
  var t = yh(e) ? Oh : $h;
  return t.test(Eh(e));
}
var Ph = Fh;
function Nh(e, t) {
  return e == null ? void 0 : e[t];
}
var Ah = Nh, Th = Ph, Rh = Ah;
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
}(), td = Lh, $c = td;
function Dh(e, t, n) {
  t == "__proto__" && $c ? $c(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
var rl = Dh;
function Vh(e, t) {
  return e === t || e !== e && t !== t;
}
var gi = Vh, jh = rl, Bh = gi, Wh = Object.prototype, Zh = Wh.hasOwnProperty;
function Hh(e, t, n) {
  var r = e[t];
  (!(Zh.call(e, t) && Bh(r, n)) || n === void 0 && !(t in e)) && jh(e, t, n);
}
var Uh = Hh, zh = Uh, qh = rl;
function Kh(e, t, n, r) {
  var i = !n;
  n || (n = {});
  for (var a = -1, o = t.length; ++a < o; ) {
    var s = t[a], c = r ? r(n[s], e[s], s, n, e) : void 0;
    c === void 0 && (c = e[s]), i ? qh(n, s, c) : zh(n, s, c);
  }
  return n;
}
var nd = Kh;
function Gh(e) {
  return e;
}
var rd = Gh;
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
var n2 = t2, r2 = n2, _c = td, i2 = rd, a2 = _c ? function(e, t) {
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
var f2 = u2, d2 = o2, m2 = f2, h2 = m2(d2), p2 = h2, v2 = rd, g2 = e2, y2 = p2;
function b2(e, t) {
  return y2(g2(e, t, v2), e + "");
}
var w2 = b2, E2 = 9007199254740991;
function C2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= E2;
}
var id = C2, $2 = nl, x2 = id;
function _2(e) {
  return e != null && x2(e.length) && !$2(e);
}
var Aa = _2, k2 = 9007199254740991, S2 = /^(?:0|[1-9]\d*)$/;
function O2(e, t) {
  var n = typeof e;
  return t = t == null ? k2 : t, !!t && (n == "number" || n != "symbol" && S2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ad = O2, F2 = gi, P2 = Aa, N2 = ad, A2 = Pt;
function T2(e, t, n) {
  if (!A2(n))
    return !1;
  var r = typeof t;
  return (r == "number" ? P2(n) && N2(t, n.length) : r == "string" && t in n) ? F2(n[t], e) : !1;
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
var od = L2;
function D2(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var V2 = D2;
function j2(e) {
  return e != null && typeof e == "object";
}
var Rn = j2, B2 = cr, W2 = Rn, Z2 = "[object Arguments]";
function H2(e) {
  return W2(e) && B2(e) == Z2;
}
var U2 = H2, kc = U2, z2 = Rn, sd = Object.prototype, q2 = sd.hasOwnProperty, K2 = sd.propertyIsEnumerable, G2 = kc(function() {
  return arguments;
}()) ? kc : function(e) {
  return z2(e) && q2.call(e, "callee") && !K2.call(e, "callee");
}, ld = G2, Y2 = Array.isArray, Ta = Y2, ei = { exports: {} };
function X2() {
  return !1;
}
var Q2 = X2;
(function(e, t) {
  var n = yt, r = Q2, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? n.Buffer : void 0, c = s ? s.isBuffer : void 0, u = c || r;
  e.exports = u;
})(ei, ei.exports);
var J2 = cr, ep = id, tp = Rn, np = "[object Arguments]", rp = "[object Array]", ip = "[object Boolean]", ap = "[object Date]", op = "[object Error]", sp = "[object Function]", lp = "[object Map]", cp = "[object Number]", up = "[object Object]", fp = "[object RegExp]", dp = "[object Set]", mp = "[object String]", hp = "[object WeakMap]", pp = "[object ArrayBuffer]", vp = "[object DataView]", gp = "[object Float32Array]", yp = "[object Float64Array]", bp = "[object Int8Array]", wp = "[object Int16Array]", Ep = "[object Int32Array]", Cp = "[object Uint8Array]", $p = "[object Uint8ClampedArray]", xp = "[object Uint16Array]", _p = "[object Uint32Array]", fe = {};
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
  var n = Qf, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, s = function() {
    try {
      var c = i && i.require && i.require("util").types;
      return c || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(rs, rs.exports);
var Pp = Sp, Np = Fp, Sc = rs.exports, Oc = Sc && Sc.isTypedArray, Ap = Oc ? Np(Oc) : Pp, il = Ap, Tp = V2, Rp = ld, Mp = Ta, Ip = ei.exports, Lp = ad, Dp = il, Vp = Object.prototype, jp = Vp.hasOwnProperty;
function Bp(e, t) {
  var n = Mp(e), r = !n && Rp(e), i = !n && !r && Ip(e), a = !n && !r && !i && Dp(e), o = n || r || i || a, s = o ? Tp(e.length, String) : [], c = s.length;
  for (var u in e)
    (t || jp.call(e, u)) && !(o && (u == "length" || i && (u == "offset" || u == "parent") || a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Lp(u, c))) && s.push(u);
  return s;
}
var cd = Bp, Wp = Object.prototype;
function Zp(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Wp;
  return e === n;
}
var al = Zp;
function Hp(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var ud = Hp, Up = ud, zp = Up(Object.keys, Object), qp = zp, Kp = al, Gp = qp, Yp = Object.prototype, Xp = Yp.hasOwnProperty;
function Qp(e) {
  if (!Kp(e))
    return Gp(e);
  var t = [];
  for (var n in Object(e))
    Xp.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var Jp = Qp, ev = cd, tv = Jp, nv = Aa;
function rv(e) {
  return nv(e) ? ev(e) : tv(e);
}
var fd = rv, iv = nd, av = od, ov = fd, sv = av(function(e, t, n, r) {
  iv(t, ov(t), e, r);
}), lv = sv;
function U(...e) {
  function t(r, i) {
    return i === void 0 ? r : i;
  }
  let n = Object.assign({}, e[0]);
  for (let r = 1; r < e.length; r++)
    n = lv(n, e[r], t);
  return n;
}
var dd = function(e) {
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
}, ur = function(e) {
  return typeof e == "function";
}, cv = function(e) {
  return typeof e == "number";
}, uv = !1;
const yi = uv;
function Wt(e) {
  yi && (ur(e) || console.error("useMemoizedFn expected parameter is a function, got ".concat(typeof e)));
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
const ol = dd(G);
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
  yi && (ur(e) || console.error("useUnmount expected parameter is a function, got ".concat(typeof e)));
  var t = Ra(e);
  G(function() {
    return function() {
      t.current();
    };
  }, []);
};
const bi = fv;
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
var Ev = wv, Cv = cr, $v = Rn, xv = "[object Symbol]";
function _v(e) {
  return typeof e == "symbol" || $v(e) && Cv(e) == xv;
}
var kv = _v, Sv = Ev, Pc = Pt, Ov = kv, Nc = 0 / 0, Fv = /^[-+]0x[0-9a-f]+$/i, Pv = /^0b[01]+$/i, Nv = /^0o[0-7]+$/i, Av = parseInt;
function Tv(e) {
  if (typeof e == "number")
    return e;
  if (Ov(e))
    return Nc;
  if (Pc(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Pc(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Sv(e);
  var n = Pv.test(e);
  return n || Nv.test(e) ? Av(e.slice(2), n ? 2 : 8) : Fv.test(e) ? Nc : +e;
}
var Rv = Tv, Mv = Pt, Oo = hv, Ac = Rv, Iv = "Expected a function", Lv = Math.max, Dv = Math.min;
function Vv(e, t, n) {
  var r, i, a, o, s, c, u = 0, d = !1, f = !1, m = !0;
  if (typeof e != "function")
    throw new TypeError(Iv);
  t = Ac(t) || 0, Mv(n) && (d = !!n.leading, f = "maxWait" in n, a = f ? Lv(Ac(n.maxWait) || 0, t) : a, m = "trailing" in n ? !!n.trailing : m);
  function p(C) {
    var k = r, N = i;
    return r = i = void 0, u = C, o = e.apply(N, k), o;
  }
  function v(C) {
    return u = C, s = setTimeout(w, t), d ? p(C) : o;
  }
  function h(C) {
    var k = C - c, N = C - u, P = t - k;
    return f ? Dv(P, a - N) : P;
  }
  function g(C) {
    var k = C - c, N = C - u;
    return c === void 0 || k >= t || k < 0 || f && N >= a;
  }
  function w() {
    var C = Oo();
    if (g(C))
      return $(C);
    s = setTimeout(w, h(C));
  }
  function $(C) {
    return s = void 0, m && r ? p(C) : (r = i = void 0, o);
  }
  function y() {
    s !== void 0 && clearTimeout(s), u = 0, r = c = i = s = void 0;
  }
  function b() {
    return s === void 0 ? o : $(Oo());
  }
  function E() {
    var C = Oo(), k = g(C);
    if (r = arguments, i = this, c = C, k) {
      if (s === void 0)
        return v(c);
      if (f)
        return clearTimeout(s), s = setTimeout(w, t), p(c);
    }
    return s === void 0 && (s = setTimeout(w, t)), o;
  }
  return E.cancel = y, E.flush = b, E;
}
var md = Vv, jv = !!(typeof window < "u" && window.document && window.document.createElement);
const sl = jv;
var Bv = md, Wv = Pt, Zv = "Expected a function";
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
  yi && (ur(e) || console.error('useMount: parameter `fn` expected to be a function, but got "'.concat(typeof e, '".'))), G(function() {
    e == null || e();
  }, []);
};
const qv = zv;
var Kv = function() {
  var e = St(q({}), 2), t = e[1];
  return Ue(function() {
    return t({});
  }, []);
};
const hd = Kv;
function tn(e, t) {
  if (!!sl) {
    if (!e)
      return t;
    var n;
    return ur(e) ? n = e() : "current" in e ? n = e.current : n = e, n;
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
    }), bi(function() {
      var u;
      (u = c.current) === null || u === void 0 || u.call(c), a.current = !1;
    });
  };
  return t;
};
const pd = Jv;
var e3 = pd(G);
const ll = e3;
function vd(e, t, n) {
  n === void 0 && (n = "click");
  var r = Ra(e);
  ll(function() {
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
var gd = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r();
  })(_t, function() {
    var n = 1e3, r = 6e4, i = 36e5, a = "millisecond", o = "second", s = "minute", c = "hour", u = "day", d = "week", f = "month", m = "quarter", p = "year", v = "date", h = "Invalid Date", g = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, $ = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(_) {
      var x = ["th", "st", "nd", "rd"], S = _ % 100;
      return "[" + _ + (x[(S - 20) % 10] || x[S] || x[0]) + "]";
    } }, y = function(_, x, S) {
      var I = String(_);
      return !I || I.length >= x ? _ : "" + Array(x + 1 - I.length).join(S) + _;
    }, b = { s: y, z: function(_) {
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
      return { M: f, y: p, w: d, d: u, D: v, h: c, m: s, s: o, ms: a, Q: m }[_] || String(_ || "").toLowerCase().replace(/s$/, "");
    }, u: function(_) {
      return _ === void 0;
    } }, E = "en", C = {};
    C[E] = $;
    var k = function(_) {
      return _ instanceof R;
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
        var T = x.name;
        C[T] = x, A = T;
      }
      return !I && A && (E = A), A || !I && E;
    }, P = function(_, x) {
      if (k(_))
        return _.clone();
      var S = typeof x == "object" ? x : {};
      return S.date = _, S.args = arguments, new R(S);
    }, O = b;
    O.l = N, O.i = k, O.w = function(_, x) {
      return P(_, { locale: x.$L, utc: x.$u, x: x.$x, $offset: x.$offset });
    };
    var R = function() {
      function _(S) {
        this.$L = N(S.locale, null, !0), this.parse(S);
      }
      var x = _.prototype;
      return x.parse = function(S) {
        this.$d = function(I) {
          var A = I.date, V = I.utc;
          if (A === null)
            return new Date(NaN);
          if (O.u(A))
            return new Date();
          if (A instanceof Date)
            return new Date(A);
          if (typeof A == "string" && !/Z$/i.test(A)) {
            var M = A.match(g);
            if (M) {
              var T = M[2] - 1 || 0, W = (M[7] || "0").substring(0, 3);
              return V ? new Date(Date.UTC(M[1], T, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W)) : new Date(M[1], T, M[3] || 1, M[4] || 0, M[5] || 0, M[6] || 0, W);
            }
          }
          return new Date(A);
        }(S), this.$x = S.x || {}, this.init();
      }, x.init = function() {
        var S = this.$d;
        this.$y = S.getFullYear(), this.$M = S.getMonth(), this.$D = S.getDate(), this.$W = S.getDay(), this.$H = S.getHours(), this.$m = S.getMinutes(), this.$s = S.getSeconds(), this.$ms = S.getMilliseconds();
      }, x.$utils = function() {
        return O;
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
        return O.u(S) ? this[I] : this.set(A, S);
      }, x.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, x.valueOf = function() {
        return this.$d.getTime();
      }, x.startOf = function(S, I) {
        var A = this, V = !!O.u(I) || I, M = O.p(S), T = function(me, ye) {
          var Ce = O.w(A.$u ? Date.UTC(A.$y, ye, me) : new Date(A.$y, ye, me), A);
          return V ? Ce : Ce.endOf(u);
        }, W = function(me, ye) {
          return O.w(A.toDate()[me].apply(A.toDate("s"), (V ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(ye)), A);
        }, H = this.$W, z = this.$M, Y = this.$D, K = "set" + (this.$u ? "UTC" : "");
        switch (M) {
          case p:
            return V ? T(1, 0) : T(31, 11);
          case f:
            return V ? T(1, z) : T(0, z + 1);
          case d:
            var ge = this.$locale().weekStart || 0, Ee = (H < ge ? H + 7 : H) - ge;
            return T(V ? Y - Ee : Y + (6 - Ee), z);
          case u:
          case v:
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
        var A, V = O.p(S), M = "set" + (this.$u ? "UTC" : ""), T = (A = {}, A[u] = M + "Date", A[v] = M + "Date", A[f] = M + "Month", A[p] = M + "FullYear", A[c] = M + "Hours", A[s] = M + "Minutes", A[o] = M + "Seconds", A[a] = M + "Milliseconds", A)[V], W = V === u ? this.$D + (I - this.$W) : I;
        if (V === f || V === p) {
          var H = this.clone().set(v, 1);
          H.$d[T](W), H.init(), this.$d = H.set(v, Math.min(this.$D, H.daysInMonth())).$d;
        } else
          T && this.$d[T](W);
        return this.init(), this;
      }, x.set = function(S, I) {
        return this.clone().$set(S, I);
      }, x.get = function(S) {
        return this[O.p(S)]();
      }, x.add = function(S, I) {
        var A, V = this;
        S = Number(S);
        var M = O.p(I), T = function(z) {
          var Y = P(V);
          return O.w(Y.date(Y.date() + Math.round(z * S)), V);
        };
        if (M === f)
          return this.set(f, this.$M + S);
        if (M === p)
          return this.set(p, this.$y + S);
        if (M === u)
          return T(1);
        if (M === d)
          return T(7);
        var W = (A = {}, A[s] = r, A[c] = i, A[o] = n, A)[M] || 1, H = this.$d.getTime() + S * W;
        return O.w(H, this);
      }, x.subtract = function(S, I) {
        return this.add(-1 * S, I);
      }, x.format = function(S) {
        var I = this, A = this.$locale();
        if (!this.isValid())
          return A.invalidDate || h;
        var V = S || "YYYY-MM-DDTHH:mm:ssZ", M = O.z(this), T = this.$H, W = this.$m, H = this.$M, z = A.weekdays, Y = A.months, K = function(ye, Ce, In, je) {
          return ye && (ye[Ce] || ye(I, V)) || In[Ce].slice(0, je);
        }, ge = function(ye) {
          return O.s(T % 12 || 12, ye, "0");
        }, Ee = A.meridiem || function(ye, Ce, In) {
          var je = ye < 12 ? "AM" : "PM";
          return In ? je.toLowerCase() : je;
        }, me = { YY: String(this.$y).slice(-2), YYYY: this.$y, M: H + 1, MM: O.s(H + 1, 2, "0"), MMM: K(A.monthsShort, H, Y, 3), MMMM: K(Y, H), D: this.$D, DD: O.s(this.$D, 2, "0"), d: String(this.$W), dd: K(A.weekdaysMin, this.$W, z, 2), ddd: K(A.weekdaysShort, this.$W, z, 3), dddd: z[this.$W], H: String(T), HH: O.s(T, 2, "0"), h: ge(1), hh: ge(2), a: Ee(T, W, !0), A: Ee(T, W, !1), m: String(W), mm: O.s(W, 2, "0"), s: String(this.$s), ss: O.s(this.$s, 2, "0"), SSS: O.s(this.$ms, 3, "0"), Z: M };
        return V.replace(w, function(ye, Ce) {
          return Ce || me[ye] || M.replace(":", "");
        });
      }, x.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, x.diff = function(S, I, A) {
        var V, M = O.p(I), T = P(S), W = (T.utcOffset() - this.utcOffset()) * r, H = this - T, z = O.m(this, T);
        return z = (V = {}, V[p] = z / 12, V[f] = z, V[m] = z / 3, V[d] = (H - W) / 6048e5, V[u] = (H - W) / 864e5, V[c] = H / i, V[s] = H / r, V[o] = H / n, V)[M] || H, A ? z : O.a(z);
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
        return O.w(this.$d, this);
      }, x.toDate = function() {
        return new Date(this.valueOf());
      }, x.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, x.toISOString = function() {
        return this.$d.toISOString();
      }, x.toString = function() {
        return this.$d.toUTCString();
      }, _;
    }(), F = R.prototype;
    return P.prototype = F, [["$ms", a], ["$s", o], ["$m", s], ["$H", c], ["$W", u], ["$M", f], ["$y", p], ["$D", v]].forEach(function(_) {
      F[_[1]] = function(x) {
        return this.$g(x, _[0], _[1]);
      };
    }), P.extend = function(_, x) {
      return _.$i || (_(x, R, P), _.$i = !0), P;
    }, P.locale = N, P.isDayjs = k, P.unix = function(_) {
      return P(1e3 * _);
    }, P.en = C[E], P.Ls = C, P.p = {}, P;
  });
})(gd);
const ke = gd.exports;
function t3(e, t) {
  var n;
  yi && (ur(e) || console.error("useDebounceFn expected parameter is a function, got ".concat(typeof e)));
  var r = Ra(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return md(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, el([], St(o), !1));
    }, i, t);
  }, []);
  return bi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
function n3(e, t, n) {
  var r = St(q({}), 2), i = r[0], a = r[1], o = t3(function() {
    a({});
  }, n).run;
  G(function() {
    return o();
  }, t), ol(e, [i]);
}
function r3() {
  this.__data__ = [], this.size = 0;
}
var i3 = r3, a3 = gi;
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
function fr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
fr.prototype.clear = E3;
fr.prototype.delete = C3;
fr.prototype.get = $3;
fr.prototype.has = x3;
fr.prototype.set = _3;
var Ia = fr, k3 = Ia;
function S3() {
  this.__data__ = new k3(), this.size = 0;
}
var O3 = S3;
function F3(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var P3 = F3;
function N3(e) {
  return this.__data__.get(e);
}
var A3 = N3;
function T3(e) {
  return this.__data__.has(e);
}
var R3 = T3, M3 = Tn, I3 = yt, L3 = M3(I3, "Map"), cl = L3, D3 = Tn, V3 = D3(Object, "create"), La = V3, Tc = La;
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
function dr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
dr.prototype.clear = a4;
dr.prototype.delete = o4;
dr.prototype.get = s4;
dr.prototype.has = l4;
dr.prototype.set = c4;
var u4 = dr, Rc = u4, f4 = Ia, d4 = cl;
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
var P4 = F4, N4 = h4, A4 = E4, T4 = x4, R4 = S4, M4 = P4;
function mr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
mr.prototype.clear = N4;
mr.prototype.delete = A4;
mr.prototype.get = T4;
mr.prototype.has = R4;
mr.prototype.set = M4;
var ul = mr, I4 = Ia, L4 = cl, D4 = ul, V4 = 200;
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
var B4 = j4, W4 = Ia, Z4 = O3, H4 = P3, U4 = A3, z4 = R3, q4 = B4;
function hr(e) {
  var t = this.__data__ = new W4(e);
  this.size = t.size;
}
hr.prototype.clear = Z4;
hr.prototype.delete = H4;
hr.prototype.get = U4;
hr.prototype.has = z4;
hr.prototype.set = q4;
var yd = hr, K4 = "__lodash_hash_undefined__";
function G4(e) {
  return this.__data__.set(e, K4), this;
}
var Y4 = G4;
function X4(e) {
  return this.__data__.has(e);
}
var Q4 = X4, J4 = ul, eg = Y4, tg = Q4;
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
      if (!lg(t, function(w, $) {
        if (!cg(p, $) && (v === w || i(v, w, n, r, a)))
          return p.push($);
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
var bd = dg, mg = yt, hg = mg.Uint8Array, wd = hg;
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
var yg = gg, Mc = tl, Ic = wd, bg = gi, wg = bd, Eg = vg, Cg = yg, $g = 1, xg = 2, _g = "[object Boolean]", kg = "[object Date]", Sg = "[object Error]", Og = "[object Map]", Fg = "[object Number]", Pg = "[object RegExp]", Ng = "[object Set]", Ag = "[object String]", Tg = "[object Symbol]", Rg = "[object ArrayBuffer]", Mg = "[object DataView]", Lc = Mc ? Mc.prototype : void 0, Fo = Lc ? Lc.valueOf : void 0;
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
    case Ag:
      return e == t + "";
    case Og:
      var s = Eg;
    case Ng:
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
} : Gg, Jg = Qg, e5 = Zg, t5 = Jg, n5 = fd;
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
    var w = e[m], $ = t[m];
    if (r)
      var y = o ? r($, w, m, t, e, a) : r(w, $, m, e, t, a);
    if (!(y === void 0 ? w === $ || i(w, $, n, r, a) : y)) {
      h = !1;
      break;
    }
    g || (g = m == "constructor");
  }
  if (h && !g) {
    var b = e.constructor, E = t.constructor;
    b != E && "constructor" in e && "constructor" in t && !(typeof b == "function" && b instanceof b && typeof E == "function" && E instanceof E) && (h = !1);
  }
  return a.delete(e), a.delete(t), h;
}
var c5 = l5, u5 = Tn, f5 = yt, d5 = u5(f5, "DataView"), m5 = d5, h5 = Tn, p5 = yt, v5 = h5(p5, "Promise"), g5 = v5, y5 = Tn, b5 = yt, w5 = y5(b5, "Set"), E5 = w5, C5 = Tn, $5 = yt, x5 = C5($5, "WeakMap"), _5 = x5, is = m5, as = cl, os = g5, ss = E5, ls = _5, Ed = cr, pr = ed, jc = "[object Map]", k5 = "[object Object]", Bc = "[object Promise]", Wc = "[object Set]", Zc = "[object WeakMap]", Hc = "[object DataView]", S5 = pr(is), O5 = pr(as), F5 = pr(os), P5 = pr(ss), N5 = pr(ls), Cn = Ed;
(is && Cn(new is(new ArrayBuffer(1))) != Hc || as && Cn(new as()) != jc || os && Cn(os.resolve()) != Bc || ss && Cn(new ss()) != Wc || ls && Cn(new ls()) != Zc) && (Cn = function(e) {
  var t = Ed(e), n = t == k5 ? e.constructor : void 0, r = n ? pr(n) : "";
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
      case N5:
        return Zc;
    }
  return t;
});
var A5 = Cn, Po = yd, T5 = bd, R5 = Lg, M5 = c5, Uc = A5, zc = Ta, qc = ei.exports, I5 = il, L5 = 1, Kc = "[object Arguments]", Gc = "[object Array]", Li = "[object Object]", D5 = Object.prototype, Yc = D5.hasOwnProperty;
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
function Cd(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !Xc(e) && !Xc(t) ? e !== e && t !== t : B5(e, t, n, r, Cd, i);
}
var W5 = Cd, Z5 = W5;
function H5(e, t) {
  return Z5(e, t);
}
var U5 = H5;
function z5(e) {
  var t = St(q(e), 2), n = t[0], r = t[1], i = D(n);
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
  function e(y) {
    try {
      return y.defaultView && y.defaultView.frameElement || null;
    } catch {
      return null;
    }
  }
  var t = function(y) {
    for (var b = y, E = e(b); E; )
      b = E.ownerDocument, E = e(b);
    return b;
  }(window.document), n = [], r = null, i = null;
  function a(y) {
    this.time = y.time, this.target = y.target, this.rootBounds = v(y.rootBounds), this.boundingClientRect = v(y.boundingClientRect), this.intersectionRect = v(y.intersectionRect || p()), this.isIntersecting = !!y.intersectionRect;
    var b = this.boundingClientRect, E = b.width * b.height, C = this.intersectionRect, k = C.width * C.height;
    E ? this.intersectionRatio = Number((k / E).toFixed(4)) : this.intersectionRatio = this.isIntersecting ? 1 : 0;
  }
  function o(y, b) {
    var E = b || {};
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
    return r || (r = function(y, b) {
      !y || !b ? i = p() : i = h(y, b), n.forEach(function(E) {
        E._checkForIntersections();
      });
    }), r;
  }, o._resetCrossOriginUpdater = function() {
    r = null, i = null;
  }, o.prototype.observe = function(y) {
    var b = this._observationTargets.some(function(E) {
      return E.element == y;
    });
    if (!b) {
      if (!(y && y.nodeType == 1))
        throw new Error("target must be an Element");
      this._registerInstance(), this._observationTargets.push({ element: y, entry: null }), this._monitorIntersections(y.ownerDocument), this._checkForIntersections();
    }
  }, o.prototype.unobserve = function(y) {
    this._observationTargets = this._observationTargets.filter(function(b) {
      return b.element != y;
    }), this._unmonitorIntersections(y.ownerDocument), this._observationTargets.length == 0 && this._unregisterInstance();
  }, o.prototype.disconnect = function() {
    this._observationTargets = [], this._unmonitorAllIntersections(), this._unregisterInstance();
  }, o.prototype.takeRecords = function() {
    var y = this._queuedEntries.slice();
    return this._queuedEntries = [], y;
  }, o.prototype._initThresholds = function(y) {
    var b = y || [0];
    return Array.isArray(b) || (b = [b]), b.sort().filter(function(E, C, k) {
      if (typeof E != "number" || isNaN(E) || E < 0 || E > 1)
        throw new Error("threshold must be a number between 0 and 1 inclusively");
      return E !== k[C - 1];
    });
  }, o.prototype._parseRootMargin = function(y) {
    var b = y || "0px", E = b.split(/\s+/).map(function(C) {
      var k = /^(-?\d*\.?\d+)(px|%)$/.exec(C);
      if (!k)
        throw new Error("rootMargin must be specified in pixels or percent");
      return { value: parseFloat(k[1]), unit: k[2] };
    });
    return E[1] = E[1] || E[0], E[2] = E[2] || E[0], E[3] = E[3] || E[1], E;
  }, o.prototype._monitorIntersections = function(y) {
    var b = y.defaultView;
    if (!!b && this._monitoringDocuments.indexOf(y) == -1) {
      var E = this._checkForIntersections, C = null, k = null;
      this.POLL_INTERVAL ? C = b.setInterval(E, this.POLL_INTERVAL) : (u(b, "resize", E, !0), u(y, "scroll", E, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in b && (k = new b.MutationObserver(E), k.observe(y, {
        attributes: !0,
        childList: !0,
        characterData: !0,
        subtree: !0
      }))), this._monitoringDocuments.push(y), this._monitoringUnsubscribes.push(function() {
        var O = y.defaultView;
        O && (C && O.clearInterval(C), d(O, "resize", E, !0)), d(y, "scroll", E, !0), k && k.disconnect();
      });
      var N = this.root && (this.root.ownerDocument || this.root) || t;
      if (y != N) {
        var P = e(y);
        P && this._monitorIntersections(P.ownerDocument);
      }
    }
  }, o.prototype._unmonitorIntersections = function(y) {
    var b = this._monitoringDocuments.indexOf(y);
    if (b != -1) {
      var E = this.root && (this.root.ownerDocument || this.root) || t, C = this._observationTargets.some(function(P) {
        var O = P.element.ownerDocument;
        if (O == y)
          return !0;
        for (; O && O != E; ) {
          var R = e(O);
          if (O = R && R.ownerDocument, O == y)
            return !0;
        }
        return !1;
      });
      if (!C) {
        var k = this._monitoringUnsubscribes[b];
        if (this._monitoringDocuments.splice(b, 1), this._monitoringUnsubscribes.splice(b, 1), k(), y != E) {
          var N = e(y);
          N && this._unmonitorIntersections(N.ownerDocument);
        }
      }
    }
  }, o.prototype._unmonitorAllIntersections = function() {
    var y = this._monitoringUnsubscribes.slice(0);
    this._monitoringDocuments.length = 0, this._monitoringUnsubscribes.length = 0;
    for (var b = 0; b < y.length; b++)
      y[b]();
  }, o.prototype._checkForIntersections = function() {
    if (!(!this.root && r && !i)) {
      var y = this._rootIsInDom(), b = y ? this._getRootRect() : p();
      this._observationTargets.forEach(function(E) {
        var C = E.element, k = m(C), N = this._rootContainsTarget(C), P = E.entry, O = y && N && this._computeTargetAndRootIntersection(C, k, b), R = null;
        this._rootContainsTarget(C) ? (!r || this.root) && (R = b) : R = p();
        var F = E.entry = new a({
          time: s(),
          target: C,
          boundingClientRect: k,
          rootBounds: R,
          intersectionRect: O
        });
        P ? y && N ? this._hasCrossedThreshold(P, F) && this._queuedEntries.push(F) : P && P.isIntersecting && this._queuedEntries.push(F) : this._queuedEntries.push(F);
      }, this), this._queuedEntries.length && this._callback(this.takeRecords(), this);
    }
  }, o.prototype._computeTargetAndRootIntersection = function(y, b, E) {
    if (window.getComputedStyle(y).display != "none") {
      for (var C = b, k = w(y), N = !1; !N && k; ) {
        var P = null, O = k.nodeType == 1 ? window.getComputedStyle(k) : {};
        if (O.display == "none")
          return null;
        if (k == this.root || k.nodeType == 9)
          if (N = !0, k == this.root || k == t)
            r && !this.root ? !i || i.width == 0 && i.height == 0 ? (k = null, P = null, C = null) : P = i : P = E;
          else {
            var R = w(k), F = R && m(R), _ = R && this._computeTargetAndRootIntersection(R, F, E);
            F && _ ? (k = R, P = h(F, _)) : (k = null, C = null);
          }
        else {
          var x = k.ownerDocument;
          k != x.body && k != x.documentElement && O.overflow != "visible" && (P = m(k));
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
      var b = $(this.root) ? this.root : t, E = b.documentElement, C = b.body;
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
    var b = this._rootMarginValues.map(function(C, k) {
      return C.unit == "px" ? C.value : C.value * (k % 2 ? y.width : y.height) / 100;
    }), E = {
      top: y.top - b[0],
      right: y.right + b[1],
      bottom: y.bottom + b[2],
      left: y.left - b[3]
    };
    return E.width = E.right - E.left, E.height = E.bottom - E.top, E;
  }, o.prototype._hasCrossedThreshold = function(y, b) {
    var E = y && y.isIntersecting ? y.intersectionRatio || 0 : -1, C = b.isIntersecting ? b.intersectionRatio || 0 : -1;
    if (E !== C)
      for (var k = 0; k < this.thresholds.length; k++) {
        var N = this.thresholds[k];
        if (N == E || N == C || N < E != N < C)
          return !0;
      }
  }, o.prototype._rootIsInDom = function() {
    return !this.root || g(t, this.root);
  }, o.prototype._rootContainsTarget = function(y) {
    var b = this.root && (this.root.ownerDocument || this.root) || t;
    return g(b, y) && (!this.root || b == y.ownerDocument);
  }, o.prototype._registerInstance = function() {
    n.indexOf(this) < 0 && n.push(this);
  }, o.prototype._unregisterInstance = function() {
    var y = n.indexOf(this);
    y != -1 && n.splice(y, 1);
  };
  function s() {
    return window.performance && performance.now && performance.now();
  }
  function c(y, b) {
    var E = null;
    return function() {
      E || (E = setTimeout(function() {
        y(), E = null;
      }, b));
    };
  }
  function u(y, b, E, C) {
    typeof y.addEventListener == "function" ? y.addEventListener(b, E, C || !1) : typeof y.attachEvent == "function" && y.attachEvent("on" + b, E);
  }
  function d(y, b, E, C) {
    typeof y.removeEventListener == "function" ? y.removeEventListener(b, E, C || !1) : typeof y.detachEvent == "function" && y.detachEvent("on" + b, E);
  }
  function f(y, b) {
    var E = Math.max(y.top, b.top), C = Math.min(y.bottom, b.bottom), k = Math.max(y.left, b.left), N = Math.min(y.right, b.right), P = N - k, O = C - E;
    return P >= 0 && O >= 0 && {
      top: E,
      bottom: C,
      left: k,
      right: N,
      width: P,
      height: O
    } || null;
  }
  function m(y) {
    var b;
    try {
      b = y.getBoundingClientRect();
    } catch {
    }
    return b ? (b.width && b.height || (b = {
      top: b.top,
      right: b.right,
      bottom: b.bottom,
      left: b.left,
      width: b.right - b.left,
      height: b.bottom - b.top
    }), b) : p();
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
  function v(y) {
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
  function h(y, b) {
    var E = b.top - y.top, C = b.left - y.left;
    return {
      top: E,
      left: C,
      height: b.height,
      width: b.width,
      bottom: E + b.height,
      right: C + b.width
    };
  }
  function g(y, b) {
    for (var E = b; E; ) {
      if (E == y)
        return !0;
      E = w(E);
    }
    return !1;
  }
  function w(y) {
    var b = y.parentNode;
    return y.nodeType == 9 && y != t ? e(y) : (b && b.assignedSlot && (b = b.assignedSlot.parentNode), b && b.nodeType == 11 && b.host ? b.host : b);
  }
  function $(y) {
    return y && y.nodeType === 9;
  }
  window.IntersectionObserver = o, window.IntersectionObserverEntry = a;
})();
function q5(e, t) {
  var n = St(q(), 2), r = n[0], i = n[1], a = St(q(), 2), o = a[0], s = a[1];
  return ll(function() {
    var c = tn(e);
    if (!!c) {
      var u = new IntersectionObserver(function(d) {
        var f, m;
        try {
          for (var p = Nm(d), v = p.next(); !v.done; v = p.next()) {
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
var K5 = sl ? Qs : G;
const _e = K5;
function G5(e) {
  var t = this, n = D(!1);
  return Ue(function() {
    for (var r = [], i = 0; i < arguments.length; i++)
      r[i] = arguments[i];
    return $e(t, void 0, void 0, function() {
      var a, o;
      return Pm(this, function(s) {
        switch (s.label) {
          case 0:
            if (n.current)
              return [2];
            n.current = !0, s.label = 1;
          case 1:
            return s.trys.push([1, 3, , 4]), [4, e.apply(void 0, el([], St(r), !1))];
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
function Y5(e) {
  var t = D(0), n = St(q(e), 2), r = n[0], i = n[1], a = Ue(function(o) {
    cancelAnimationFrame(t.current), t.current = requestAnimationFrame(function() {
      i(o);
    });
  }, []);
  return bi(function() {
    cancelAnimationFrame(t.current);
  }), [r, a];
}
var X5 = function() {
  var e = D(!1);
  return G(function() {
    return e.current = !1, function() {
      e.current = !0;
    };
  }, []), e;
};
const fl = X5;
var $d = function() {
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
}(), Q5 = function() {
  return typeof requestAnimationFrame == "function" ? requestAnimationFrame.bind(ua) : function(e) {
    return setTimeout(function() {
      return e(Date.now());
    }, 1e3 / 60);
  };
}(), J5 = 2;
function e6(e, t) {
  var n = !1, r = !1, i = 0;
  function a() {
    n && (n = !1, e()), r && s();
  }
  function o() {
    Q5(a);
  }
  function s() {
    var c = Date.now();
    if (n) {
      if (c - i < J5)
        return;
      r = !0;
    } else
      n = !0, r = !1, setTimeout(o, t);
    i = c;
  }
  return s;
}
var t6 = 20, n6 = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], r6 = typeof MutationObserver < "u", i6 = function() {
  function e() {
    this.connected_ = !1, this.mutationEventsAdded_ = !1, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = e6(this.refresh.bind(this), t6);
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
    !cs || this.connected_ || (document.addEventListener("transitionend", this.onTransitionEnd_), window.addEventListener("resize", this.refresh), r6 ? (this.mutationsObserver_ = new MutationObserver(this.refresh), this.mutationsObserver_.observe(document, {
      attributes: !0,
      childList: !0,
      characterData: !0,
      subtree: !0
    })) : (document.addEventListener("DOMSubtreeModified", this.refresh), this.mutationEventsAdded_ = !0), this.connected_ = !0);
  }, e.prototype.disconnect_ = function() {
    !cs || !this.connected_ || (document.removeEventListener("transitionend", this.onTransitionEnd_), window.removeEventListener("resize", this.refresh), this.mutationsObserver_ && this.mutationsObserver_.disconnect(), this.mutationEventsAdded_ && document.removeEventListener("DOMSubtreeModified", this.refresh), this.mutationsObserver_ = null, this.mutationEventsAdded_ = !1, this.connected_ = !1);
  }, e.prototype.onTransitionEnd_ = function(t) {
    var n = t.propertyName, r = n === void 0 ? "" : n, i = n6.some(function(a) {
      return !!~r.indexOf(a);
    });
    i && this.refresh();
  }, e.getInstance = function() {
    return this.instance_ || (this.instance_ = new e()), this.instance_;
  }, e.instance_ = null, e;
}(), xd = function(e, t) {
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
}, _d = Va(0, 0, 0, 0);
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
function a6(e) {
  for (var t = ["top", "right", "bottom", "left"], n = {}, r = 0, i = t; r < i.length; r++) {
    var a = i[r], o = e["padding-" + a];
    n[a] = fa(o);
  }
  return n;
}
function o6(e) {
  var t = e.getBBox();
  return Va(0, 0, t.width, t.height);
}
function s6(e) {
  var t = e.clientWidth, n = e.clientHeight;
  if (!t && !n)
    return _d;
  var r = nr(e).getComputedStyle(e), i = a6(r), a = i.left + i.right, o = i.top + i.bottom, s = fa(r.width), c = fa(r.height);
  if (r.boxSizing === "border-box" && (Math.round(s + a) !== t && (s -= Qc(r, "left", "right") + a), Math.round(c + o) !== n && (c -= Qc(r, "top", "bottom") + o)), !c6(e)) {
    var u = Math.round(s + a) - t, d = Math.round(c + o) - n;
    Math.abs(u) !== 1 && (s -= u), Math.abs(d) !== 1 && (c -= d);
  }
  return Va(i.left, i.top, s, c);
}
var l6 = function() {
  return typeof SVGGraphicsElement < "u" ? function(e) {
    return e instanceof nr(e).SVGGraphicsElement;
  } : function(e) {
    return e instanceof nr(e).SVGElement && typeof e.getBBox == "function";
  };
}();
function c6(e) {
  return e === nr(e).document.documentElement;
}
function u6(e) {
  return cs ? l6(e) ? o6(e) : s6(e) : _d;
}
function f6(e) {
  var t = e.x, n = e.y, r = e.width, i = e.height, a = typeof DOMRectReadOnly < "u" ? DOMRectReadOnly : Object, o = Object.create(a.prototype);
  return xd(o, {
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
var d6 = function() {
  function e(t) {
    this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = Va(0, 0, 0, 0), this.target = t;
  }
  return e.prototype.isActive = function() {
    var t = u6(this.target);
    return this.contentRect_ = t, t.width !== this.broadcastWidth || t.height !== this.broadcastHeight;
  }, e.prototype.broadcastRect = function() {
    var t = this.contentRect_;
    return this.broadcastWidth = t.width, this.broadcastHeight = t.height, t;
  }, e;
}(), m6 = function() {
  function e(t, n) {
    var r = f6(n);
    xd(this, { target: t, contentRect: r });
  }
  return e;
}(), h6 = function() {
  function e(t, n, r) {
    if (this.activeObservations_ = [], this.observations_ = new $d(), typeof t != "function")
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
      n.has(t) || (n.set(t, new d6(t)), this.controller_.addObserver(this), this.controller_.refresh());
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
        return new m6(r.target, r.broadcastRect());
      });
      this.callback_.call(t, n, t), this.clearActive();
    }
  }, e.prototype.clearActive = function() {
    this.activeObservations_.splice(0);
  }, e.prototype.hasActive = function() {
    return this.activeObservations_.length > 0;
  }, e;
}(), kd = typeof WeakMap < "u" ? /* @__PURE__ */ new WeakMap() : new $d(), Sd = function() {
  function e(t) {
    if (!(this instanceof e))
      throw new TypeError("Cannot call a class as a function.");
    if (!arguments.length)
      throw new TypeError("1 argument required, but only 0 present.");
    var n = i6.getInstance(), r = new h6(t, n, this);
    kd.set(this, r);
  }
  return e;
}();
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(e) {
  Sd.prototype[e] = function() {
    var t;
    return (t = kd.get(this))[e].apply(t, arguments);
  };
});
var p6 = function() {
  return typeof ua.ResizeObserver < "u" ? ua.ResizeObserver : Sd;
}(), v6 = pd(Qs);
const g6 = v6;
var y6 = sl ? g6 : ll;
const b6 = y6;
function us(e) {
  var t = St(Y5(function() {
    var i = tn(e);
    return i ? {
      width: i.clientWidth,
      height: i.clientHeight
    } : void 0;
  }), 2), n = t[0], r = t[1];
  return b6(function() {
    var i = tn(e);
    if (!!i) {
      var a = new p6(function(o) {
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
  yi && (ur(e) || console.error("useThrottleFn expected parameter is a function, got ".concat(typeof e)));
  var r = Ra(e), i = (n = t == null ? void 0 : t.wait) !== null && n !== void 0 ? n : 1e3, a = re(function() {
    return Uv(function() {
      for (var o = [], s = 0; s < arguments.length; s++)
        o[s] = arguments[s];
      return r.current.apply(r, el([], St(o), !1));
    }, i, t);
  }, []);
  return bi(function() {
    a.cancel();
  }), {
    run: a,
    cancel: a.cancel,
    flush: a.flush
  };
}
var w6 = function(e, t) {
  var n = Wt(e), r = D(null), i = Ue(function() {
    r.current && clearTimeout(r.current);
  }, []);
  return G(function() {
    if (!(!cv(t) || t < 0))
      return r.current = setTimeout(n, t), i;
  }, [t]), i;
};
const E6 = w6;
const Jc = 10;
function C6(e, t) {
  return e > t && e > Jc ? "horizontal" : t > e && t > Jc ? "vertical" : "";
}
function $6() {
  const e = D(0), t = D(0), n = D(0), r = D(0), i = D(0), a = D(0), o = D(""), s = () => o.current === "vertical", c = () => o.current === "horizontal", u = () => {
    n.current = 0, r.current = 0, i.current = 0, a.current = 0, o.current = "";
  };
  return {
    move: (m) => {
      const p = m.touches[0];
      n.current = p.clientX < 0 ? 0 : p.clientX - e.current, r.current = p.clientY - t.current, i.current = Math.abs(n.current), a.current = Math.abs(r.current), o.current || (o.current = C6(i.current, a.current));
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
const x6 = lr ? window : void 0, _6 = ["scroll", "auto", "overlay"];
function k6(e) {
  return e.nodeType === 1;
}
function da(e, t = x6) {
  let n = e;
  for (; n && n !== t && k6(n); ) {
    if (n === document.body)
      return t;
    const {
      overflowY: r
    } = window.getComputedStyle(n);
    if (_6.includes(r) && n.scrollHeight > n.clientHeight)
      return n;
    n = n.parentNode;
  }
  return t;
}
let wi = !1;
if (lr)
  try {
    const e = {};
    Object.defineProperty(e, "passive", {
      get() {
        wi = !0;
      }
    }), window.addEventListener("test-passive", null, e);
  } catch {
  }
let Sr = 0;
const eu = "adm-overflow-hidden";
function S6(e) {
  let t = e == null ? void 0 : e.parentElement;
  for (; t; ) {
    if (t.clientHeight < t.scrollHeight)
      return t;
    t = t.parentElement;
  }
  return null;
}
function Ba(e, t) {
  const n = $6(), r = (o) => {
    n.move(o);
    const s = n.deltaY.current > 0 ? "10" : "01", c = da(o.target, e.current);
    if (!c)
      return;
    if (t === "strict") {
      const p = S6(o.target);
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
    document.addEventListener("touchstart", n.start), document.addEventListener("touchmove", r, wi ? {
      passive: !1
    } : !1), Sr || document.body.classList.add(eu), Sr++;
  }, a = () => {
    Sr && (document.removeEventListener("touchstart", n.start), document.removeEventListener("touchmove", r), Sr--, Sr || document.body.classList.remove(eu));
  };
  G(() => {
    if (t)
      return i(), () => {
        a();
      };
  }, [t]);
}
let dl = Ci();
const X = (e) => Ei(e, dl);
let ml = Ci();
X.write = (e) => Ei(e, ml);
let Wa = Ci();
X.onStart = (e) => Ei(e, Wa);
let hl = Ci();
X.onFrame = (e) => Ei(e, hl);
let pl = Ci();
X.onFinish = (e) => Ei(e, pl);
let Qn = [];
X.setTimeout = (e, t) => {
  let n = X.now() + t, r = () => {
    let a = Qn.findIndex((o) => o.cancel == r);
    ~a && Qn.splice(a, 1), Qt -= ~a ? 1 : 0;
  }, i = {
    time: n,
    handler: e,
    cancel: r
  };
  return Qn.splice(Od(n), 0, i), Qt += 1, Fd(), i;
};
let Od = (e) => ~(~Qn.findIndex((t) => t.time > e) || ~Qn.length);
X.cancel = (e) => {
  Wa.delete(e), hl.delete(e), pl.delete(e), dl.delete(e), ml.delete(e);
};
X.sync = (e) => {
  fs = !0, X.batchedUpdates(e), fs = !1;
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
    Wa.delete(n), t = null;
  }, r;
};
let vl = typeof window < "u" ? window.requestAnimationFrame : () => {
};
X.use = (e) => vl = e;
X.now = typeof performance < "u" ? () => performance.now() : Date.now;
X.batchedUpdates = (e) => e();
X.catch = console.error;
X.frameLoop = "always";
X.advance = () => {
  X.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : Nd();
};
let Xt = -1, Qt = 0, fs = !1;
function Ei(e, t) {
  fs ? (t.delete(e), e(0)) : (t.add(e), Fd());
}
function Fd() {
  Xt < 0 && (Xt = 0, X.frameLoop !== "demand" && vl(Pd));
}
function O6() {
  Xt = -1;
}
function Pd() {
  ~Xt && (vl(Pd), X.batchedUpdates(Nd));
}
function Nd() {
  let e = Xt;
  Xt = X.now();
  let t = Od(Xt);
  if (t && (Ad(Qn.splice(0, t), (n) => n.handler()), Qt -= t), !Qt) {
    O6();
    return;
  }
  Wa.flush(), dl.flush(e ? Math.min(64, Xt - e) : 16.667), hl.flush(), ml.flush(), pl.flush();
}
function Ci() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(n) {
      Qt += t == e && !e.has(n) ? 1 : 0, e.add(n);
    },
    delete(n) {
      return Qt -= t == e && e.has(n) ? 1 : 0, e.delete(n);
    },
    flush(n) {
      t.size && (e = /* @__PURE__ */ new Set(), Qt -= t.size, Ad(t, (r) => r(n) && e.add(r)), Qt += e.size, t = e);
    }
  };
}
function Ad(e, t) {
  e.forEach((n) => {
    try {
      t(n);
    } catch (r) {
      X.catch(r);
    }
  });
}
function ds() {
}
const F6 = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), Z = {
  arr: Array.isArray,
  obj: (e) => !!e && e.constructor.name === "Object",
  fun: (e) => typeof e == "function",
  str: (e) => typeof e == "string",
  num: (e) => typeof e == "number",
  und: (e) => e === void 0
};
function Lt(e, t) {
  if (Z.arr(e)) {
    if (!Z.arr(t) || e.length !== t.length)
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
  if (Z.arr(e)) {
    for (let r = 0; r < e.length; r++)
      t.call(n, e[r], `${r}`);
    return;
  }
  for (const r in e)
    e.hasOwnProperty(r) && t.call(n, e[r], r);
}
const Ge = (e) => Z.und(e) ? [] : Z.arr(e) ? e : [e];
function Ur(e, t) {
  if (e.size) {
    const n = Array.from(e);
    e.clear(), J(n, t);
  }
}
const Wr = (e, ...t) => Ur(e, (n) => n(...t)), gl = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
let yl, Td, en = null, Rd = !1, bl = ds;
const P6 = (e) => {
  e.to && (Td = e.to), e.now && (X.now = e.now), e.colors !== void 0 && (en = e.colors), e.skipAnimation != null && (Rd = e.skipAnimation), e.createStringInterpolator && (yl = e.createStringInterpolator), e.requestAnimationFrame && X.use(e.requestAnimationFrame), e.batchedUpdates && (X.batchedUpdates = e.batchedUpdates), e.willAdvance && (bl = e.willAdvance), e.frameLoop && (X.frameLoop = e.frameLoop);
};
var st = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get createStringInterpolator() {
    return yl;
  },
  get to() {
    return Td;
  },
  get colors() {
    return en;
  },
  get skipAnimation() {
    return Rd;
  },
  get willAdvance() {
    return bl;
  },
  assign: P6
});
const zr = /* @__PURE__ */ new Set();
let at = [], No = [], ma = 0;
const Za = {
  get idle() {
    return !zr.size && !at.length;
  },
  start(e) {
    ma > e.priority ? (zr.add(e), X.onStart(N6)) : (Md(e), X(ms));
  },
  advance: ms,
  sort(e) {
    if (ma)
      X.onFrame(() => Za.sort(e));
    else {
      const t = at.indexOf(e);
      ~t && (at.splice(t, 1), Id(e));
    }
  },
  clear() {
    at = [], zr.clear();
  }
};
function N6() {
  zr.forEach(Md), zr.clear(), X(ms);
}
function Md(e) {
  at.includes(e) || Id(e);
}
function Id(e) {
  at.splice(A6(at, (t) => t.priority > e.priority), 0, e);
}
function ms(e) {
  const t = No;
  for (let n = 0; n < at.length; n++) {
    const r = at[n];
    ma = r.priority, r.idle || (bl(r), r.advance(e), r.idle || t.push(r));
  }
  return ma = 0, No = at, No.length = 0, at = t, at.length > 0;
}
function A6(e, t) {
  const n = e.findIndex(t);
  return n < 0 ? e.length : n;
}
const T6 = (e, t, n) => Math.min(Math.max(n, e), t), R6 = {
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
const M6 = new RegExp("rgb" + Ha(ht, ht, ht)), I6 = new RegExp("rgba" + Ha(ht, ht, ht, ht)), L6 = new RegExp("hsl" + Ha(ht, ha, ha)), D6 = new RegExp("hsla" + Ha(ht, ha, ha, ht)), V6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, j6 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, B6 = /^#([0-9a-fA-F]{6})$/, W6 = /^#([0-9a-fA-F]{8})$/;
function Z6(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = B6.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : en && en[e] !== void 0 ? en[e] : (t = M6.exec(e)) ? (Ln(t[1]) << 24 | Ln(t[2]) << 16 | Ln(t[3]) << 8 | 255) >>> 0 : (t = I6.exec(e)) ? (Ln(t[1]) << 24 | Ln(t[2]) << 16 | Ln(t[3]) << 8 | ru(t[4])) >>> 0 : (t = V6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = W6.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = j6.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = L6.exec(e)) ? (tu(nu(t[1]), Di(t[2]), Di(t[3])) | 255) >>> 0 : (t = D6.exec(e)) ? (tu(nu(t[1]), Di(t[2]), Di(t[3])) | ru(t[4])) >>> 0 : null;
}
function Ao(e, t, n) {
  return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function tu(e, t, n) {
  const r = n < 0.5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r, a = Ao(i, r, e + 1 / 3), o = Ao(i, r, e), s = Ao(i, r, e - 1 / 3);
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
  let t = Z6(e);
  if (t === null)
    return e;
  t = t || 0;
  let n = (t & 4278190080) >>> 24, r = (t & 16711680) >>> 16, i = (t & 65280) >>> 8, a = (t & 255) / 255;
  return `rgba(${n}, ${r}, ${i}, ${a})`;
}
const ti = (e, t, n) => {
  if (Z.fun(e))
    return e;
  if (Z.arr(e))
    return ti({
      range: e,
      output: t,
      extrapolate: n
    });
  if (Z.str(e.output[0]))
    return yl(e);
  const r = e, i = r.output, a = r.range || [0, 1], o = r.extrapolateLeft || r.extrapolate || "extend", s = r.extrapolateRight || r.extrapolate || "extend", c = r.easing || ((u) => u);
  return (u) => {
    const d = U6(u, a);
    return H6(u, a[d], a[d + 1], i[d], i[d + 1], c, o, s, r.map);
  };
};
function H6(e, t, n, r, i, a, o, s, c) {
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
function U6(e, t) {
  for (var n = 1; n < t.length - 1 && !(t[n] >= e); ++n)
    ;
  return n - 1;
}
const z6 = (e, t = "end") => (n) => {
  n = t === "end" ? Math.min(n, 0.999) : Math.max(n, 1e-3);
  const r = n * e, i = t === "end" ? Math.floor(r) : Math.ceil(r);
  return T6(0, 1, i / e);
}, pa = 1.70158, Vi = pa * 1.525, au = pa + 1, ou = 2 * Math.PI / 3, su = 2 * Math.PI / 4.5, ji = (e) => e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375 : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375, q6 = {
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
  steps: z6
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
const rr = Symbol.for("FluidValue.get"), Fn = Symbol.for("FluidValue.observers"), rt = (e) => Boolean(e && e[rr]), Ze = (e) => e && e[rr] ? e[rr]() : e, lu = (e) => e[Fn] || null;
function K6(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function ni(e, t) {
  let n = e[Fn];
  n && n.forEach((r) => {
    K6(r, t);
  });
}
class Ld {
  constructor(t) {
    if (this[rr] = void 0, this[Fn] = void 0, !t && !(t = this.get))
      throw Error("Unknown getter");
    G6(this, t);
  }
}
const G6 = (e, t) => Dd(e, rr, t);
function vr(e, t) {
  if (e[rr]) {
    let n = e[Fn];
    n || Dd(e, Fn, n = /* @__PURE__ */ new Set()), n.has(t) || (n.add(t), e.observerAdded && e.observerAdded(n.size, t));
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
const Dd = (e, t, n) => Object.defineProperty(e, t, {
  value: n,
  writable: !0,
  configurable: !0
}), ta = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, Y6 = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, cu = new RegExp(`(${ta.source})(%|[a-z]+)`, "i"), X6 = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, Ua = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, Vd = (e) => {
  const [t, n] = Q6(e);
  if (!t || gl())
    return e;
  const r = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (r)
    return r.trim();
  if (n && n.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(n);
    return i || e;
  } else {
    if (n && Ua.test(n))
      return Vd(n);
    if (n)
      return n;
  }
  return e;
}, Q6 = (e) => {
  const t = Ua.exec(e);
  if (!t)
    return [,];
  const [, n, r] = t;
  return [n, r];
};
let To;
const J6 = (e, t, n, r, i) => `rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(r)}, ${i})`, jd = (e) => {
  To || (To = en ? new RegExp(`(${Object.keys(en).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((a) => Ze(a).replace(Ua, Vd).replace(Y6, iu).replace(To, iu)), n = t.map((a) => a.match(ta).map(Number)), i = n[0].map((a, o) => n.map((s) => {
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
    return t[0].replace(ta, () => `${i[c++](a)}${s || ""}`).replace(X6, J6);
  };
}, wl = "react-spring: ", Bd = (e) => {
  const t = e;
  let n = !1;
  if (typeof t != "function")
    throw new TypeError(`${wl}once requires a function parameter`);
  return (...r) => {
    n || (t(...r), n = !0);
  };
}, e7 = Bd(console.warn);
function t7() {
  e7(`${wl}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const n7 = Bd(console.warn);
function r7() {
  n7(`${wl}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function za(e) {
  return Z.str(e) && (e[0] == "#" || /\d/.test(e) || !gl() && Ua.test(e) || e in (en || {}));
}
const El = gl() ? G : Qs, i7 = () => {
  const e = D(!1);
  return El(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function Wd() {
  const e = q()[1], t = i7();
  return () => {
    t.current && e(Math.random());
  };
}
function a7(e, t) {
  const [n] = q(() => ({
    inputs: t,
    result: e()
  })), r = D(), i = r.current;
  let a = i;
  return a ? Boolean(t && a.inputs && o7(t, a.inputs)) || (a = {
    inputs: t,
    result: e()
  }) : a = n, G(() => {
    r.current = a, i == n && (n.inputs = n.result = void 0);
  }, [a]), a.result;
}
function o7(e, t) {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
const Zd = (e) => G(e, s7), s7 = [];
function uu(e) {
  const t = D();
  return G(() => {
    t.current = e;
  }), t.current;
}
const ii = Symbol.for("Animated:node"), l7 = (e) => !!e && e[ii] === e, xt = (e) => e && e[ii], Cl = (e, t) => F6(e, ii, t), qa = (e) => e && e[ii] && e[ii].getPayload();
class Hd {
  constructor() {
    this.payload = void 0, Cl(this, this);
  }
  getPayload() {
    return this.payload || [];
  }
}
class gr extends Hd {
  constructor(t) {
    super(), this.done = !0, this.elapsedTime = void 0, this.lastPosition = void 0, this.lastVelocity = void 0, this.v0 = void 0, this.durationProgress = 0, this._value = t, Z.num(this._value) && (this.lastPosition = this._value);
  }
  static create(t) {
    return new gr(t);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(t, n) {
    return Z.num(t) && (this.lastPosition = t, n && (t = Math.round(t / n) * n, this.done && (this.lastPosition = t))), this._value === t ? !1 : (this._value = t, !0);
  }
  reset() {
    const {
      done: t
    } = this;
    this.done = !1, Z.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, t && (this.lastVelocity = null), this.v0 = null);
  }
}
class ir extends gr {
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
    if (Z.str(t)) {
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
class Ka extends Hd {
  constructor(t) {
    super(), this.source = t, this.setValue(t);
  }
  getValue(t) {
    const n = {};
    return Ot(this.source, (r, i) => {
      l7(r) ? n[i] = r.getValue(t) : rt(r) ? n[i] = Ze(r) : t || (n[i] = r);
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
    va.dependencies && rt(t) && va.dependencies.add(t);
    const n = qa(t);
    n && J(n, (r) => this.add(r));
  }
}
class $l extends Ka {
  constructor(t) {
    super(t);
  }
  static create(t) {
    return new $l(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const n = this.getPayload();
    return t.length == n.length ? n.map((r, i) => r.setValue(t[i])).some(Boolean) : (super.setValue(t.map(c7)), !0);
  }
}
function c7(e) {
  return (za(e) ? ir : gr).create(e);
}
function ps(e) {
  const t = xt(e);
  return t ? t.constructor : Z.arr(e) ? $l : za(e) ? ir : gr;
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
  const n = !Z.fun(e) || e.prototype && e.prototype.isReactComponent;
  return de((r, i) => {
    const a = D(null), o = n && Ue((v) => {
      a.current = d7(i, v);
    }, [i]), [s, c] = f7(r, t), u = Wd(), d = () => {
      const v = a.current;
      if (n && !v)
        return;
      (v ? t.applyAnimatedValues(v, s.getValue(!0)) : !1) === !1 && u();
    }, f = new u7(d, c), m = D();
    El(() => (m.current = f, J(c, (v) => vr(v, f)), () => {
      m.current && (J(m.current.deps, (v) => ri(v, m.current)), X.cancel(m.current.update));
    })), G(d, []), Zd(() => () => {
      const v = m.current;
      J(v.deps, (h) => ri(h, v));
    });
    const p = t.getComponentProps(s.getValue());
    return L.createElement(e, ga({}, p, {
      ref: o
    }));
  });
};
class u7 {
  constructor(t, n) {
    this.update = t, this.deps = n;
  }
  eventObserved(t) {
    t.type == "change" && X.write(this.update);
  }
}
function f7(e, t) {
  const n = /* @__PURE__ */ new Set();
  return va.dependencies = n, e.style && (e = ga({}, e, {
    style: t.createAnimatedStyle(e.style)
  })), e = new Ka(e), va.dependencies = null, [e, n];
}
function d7(e, t) {
  return e && (Z.fun(e) ? e(t) : e.current = t), t;
}
const du = Symbol.for("AnimatedComponent"), m7 = (e, {
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
    return Z.str(o) ? o = a[o] || (a[o] = fu(o, i)) : o = o[du] || (o[du] = fu(o, i)), o.displayName = `Animated(${s})`, o;
  };
  return Ot(e, (o, s) => {
    Z.arr(e) && (s = mu(o)), a[s] = a(o);
  }), {
    animated: a
  };
}, mu = (e) => Z.str(e) ? e : e && Z.str(e.displayName) ? e.displayName : Z.fun(e) && e.name || null;
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
  return Z.fun(e) ? e(...t) : e;
}
const qr = (e, t) => e === !0 || !!(t && e && (Z.fun(e) ? e(t) : Ge(e).includes(t))), Ud = (e, t) => Z.obj(e) ? t && e[t] : e, zd = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, h7 = (e) => e, xl = (e, t = h7) => {
  let n = p7;
  e.default && e.default !== !0 && (e = e.default, n = Object.keys(e));
  const r = {};
  for (const i of n) {
    const a = t(e[i], i);
    Z.und(a) || (r[i] = a);
  }
  return r;
}, p7 = ["config", "onProps", "onStart", "onChange", "onPause", "onResume", "onRest"], v7 = {
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
function g7(e) {
  const t = {};
  let n = 0;
  if (Ot(e, (r, i) => {
    v7[i] || (t[i] = r, n++);
  }), n)
    return t;
}
function qd(e) {
  const t = g7(e);
  if (t) {
    const n = {
      to: t
    };
    return Ot(e, (r, i) => i in t || (n[i] = r)), n;
  }
  return Pe({}, e);
}
function ai(e) {
  return e = Ze(e), Z.arr(e) ? e.map(ai) : za(e) ? st.createStringInterpolator({
    range: [0, 1],
    output: [e, e]
  })(1) : e;
}
function y7(e) {
  for (const t in e)
    return !0;
  return !1;
}
function vs(e) {
  return Z.fun(e) || Z.arr(e) && Z.obj(e[0]);
}
function b7(e, t) {
  var n;
  (n = e.ref) == null || n.delete(e), t == null || t.delete(e);
}
function w7(e, t) {
  if (t && e.ref !== t) {
    var n;
    (n = e.ref) == null || n.delete(e), t.add(e), e.ref = t;
  }
}
const E7 = {
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
}, gs = Pe({}, E7.default, {
  mass: 1,
  damping: 1,
  easing: q6.linear,
  clamp: !1
});
class C7 {
  constructor() {
    this.tension = void 0, this.friction = void 0, this.frequency = void 0, this.damping = void 0, this.mass = void 0, this.velocity = 0, this.restVelocity = void 0, this.precision = void 0, this.progress = void 0, this.duration = void 0, this.easing = void 0, this.clamp = void 0, this.bounce = void 0, this.decay = void 0, this.round = void 0, Object.assign(this, gs);
  }
}
function $7(e, t, n) {
  n && (n = Pe({}, n), hu(n, t), t = Pe({}, n, t)), hu(e, t), Object.assign(e, t);
  for (const o in gs)
    e[o] == null && (e[o] = gs[o]);
  let {
    mass: r,
    frequency: i,
    damping: a
  } = e;
  return Z.und(i) || (i < 0.01 && (i = 0.01), a < 0 && (a = 0), e.tension = Math.pow(2 * Math.PI / i, 2) * r, e.friction = 4 * Math.PI * a * r / i), e;
}
function hu(e, t) {
  if (!Z.und(t.decay))
    e.duration = void 0;
  else {
    const n = !Z.und(t.tension) || !Z.und(t.friction);
    (n || !Z.und(t.frequency) || !Z.und(t.damping) || !Z.und(t.mass)) && (e.duration = void 0, e.decay = void 0), n && (e.frequency = void 0);
  }
}
const pu = [];
class x7 {
  constructor() {
    this.changed = !1, this.values = pu, this.toValues = null, this.fromValues = pu, this.to = void 0, this.from = void 0, this.config = new C7(), this.immediate = !1;
  }
}
function Kd(e, {
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
      Z.und(n.pause) || (i.paused = qr(n.pause, t));
      let h = r == null ? void 0 : r.pause;
      h !== !0 && (h = i.paused || qr(h, t)), u = $n(n.delay || 0, t), h ? (i.resumeQueue.add(p), a.pause()) : (a.resume(), p());
    }
    function m() {
      i.resumeQueue.add(p), i.timeouts.delete(d), d.cancel(), u = d.time - X.now();
    }
    function p() {
      u > 0 && !st.skipAnimation ? (i.delayed = !0, d = X.setTimeout(v, u), i.pauseQueue.add(m), i.timeouts.add(d)) : v();
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
const _l = (e, t) => t.length == 1 ? t[0] : t.some((n) => n.cancelled) ? Jn(e.get()) : t.every((n) => n.noop) ? Gd(e.get()) : mt(e.get(), t.every((n) => n.finished)), Gd = (e) => ({
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
function Yd(e, t, n, r) {
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
    const u = xl(t, (g, w) => w === "onRest" ? void 0 : g);
    let d, f;
    const m = new Promise((g, w) => (d = g, f = w)), p = (g) => {
      const w = i <= (n.cancelId || 0) && Jn(r) || i !== n.asyncId && mt(r, !1);
      if (w)
        throw g.result = w, f(g), g;
    }, v = (g, w) => {
      const $ = new vu(), y = new gu();
      return (async () => {
        if (st.skipAnimation)
          throw oi(n), y.result = mt(r, !1), f(y), y;
        p($);
        const b = Z.obj(g) ? Pe({}, g) : Pe({}, w, {
          to: g
        });
        b.parentId = i, Ot(u, (C, k) => {
          Z.und(b[k]) && (b[k] = C);
        });
        const E = await r.start(b);
        return p($), n.paused && await new Promise((C) => {
          n.resumeQueue.add(C);
        }), E;
      })();
    };
    let h;
    if (st.skipAnimation)
      return oi(n), mt(r, !1);
    try {
      let g;
      Z.arr(e) ? g = (async (w) => {
        for (const $ of w)
          await v($);
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
    return Z.fun(o) && X.batchedUpdates(() => {
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
const ys = (e) => e instanceof kl;
let _7 = 1;
class kl extends Ld {
  constructor(...t) {
    super(...t), this.id = _7++, this.key = void 0, this._priority = 0;
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
    return st.to(this, t);
  }
  interpolate(...t) {
    return t7(), st.to(this, t);
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
const Pn = Symbol.for("SpringPhase"), Xd = 1, bs = 2, ws = 4, Ro = (e) => (e[Pn] & Xd) > 0, Zt = (e) => (e[Pn] & bs) > 0, Or = (e) => (e[Pn] & ws) > 0, yu = (e, t) => t ? e[Pn] |= bs | Xd : e[Pn] &= ~bs, bu = (e, t) => t ? e[Pn] |= ws : e[Pn] &= ~ws;
class k7 extends kl {
  constructor(t, n) {
    if (super(), this.key = void 0, this.animation = new x7(), this.queue = void 0, this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !Z.und(t) || !Z.und(n)) {
      const r = Z.obj(t) ? Pe({}, t) : Pe({}, n, {
        from: t
      });
      Z.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  get idle() {
    return !(Zt(this) || this._state.asyncTo) || Or(this);
  }
  get goal() {
    return Ze(this.animation.to);
  }
  get velocity() {
    const t = xt(this);
    return t instanceof gr ? t.lastVelocity || 0 : t.getPayload().map((n) => n.lastVelocity || 0);
  }
  get hasAnimated() {
    return Ro(this);
  }
  get isAnimating() {
    return Zt(this);
  }
  get isPaused() {
    return Or(this);
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
    !s && rt(i.to) && (o = Ge(Ze(i.to))), i.values.forEach((d, f) => {
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
        const g = i.fromValues[f], w = d.v0 != null ? d.v0 : d.v0 = Z.arr(a.velocity) ? a.velocity[f] : a.velocity;
        let $;
        const y = a.precision || (g == m ? 5e-3 : Math.min(1, Math.abs(m - g) * 1e-3));
        if (Z.und(a.duration))
          if (a.decay) {
            const b = a.decay === !0 ? 0.998 : a.decay, E = Math.exp(-(1 - b) * h);
            v = g + w / (1 - b) * (1 - E), p = Math.abs(d.lastPosition - v) <= y, $ = w * E;
          } else {
            $ = d.lastVelocity == null ? w : d.lastVelocity;
            const b = a.restVelocity || y / 10, E = a.clamp ? 0 : a.bounce, C = !Z.und(E), k = g == m ? d.v0 > 0 : g < m;
            let N, P = !1;
            const O = 1, R = Math.ceil(t / O);
            for (let F = 0; F < R && (N = Math.abs($) > b, !(!N && (p = Math.abs(m - v) <= y, p))); ++F) {
              C && (P = v == m || v > m == k, P && ($ = -$ * E, v = m));
              const _ = -a.tension * 1e-6 * (v - m), x = -a.friction * 1e-3 * $, S = (_ + x) / a.mass;
              $ = $ + S * O, v = v + $ * O;
            }
          }
        else {
          let b = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, d.durationProgress > 0 && (d.elapsedTime = a.duration * d.durationProgress, h = d.elapsedTime += t)), b = (a.progress || 0) + h / this._memoizedDuration, b = b > 1 ? 1 : b < 0 ? 0 : b, d.durationProgress = b), v = g + a.easing(b) * (m - g), $ = (v - d.lastPosition) / t, p = b == 1;
        }
        d.lastVelocity = $, Number.isNaN(v) && (console.warn("Got NaN while animating:", this), p = !0);
      }
      s && !s[f].done && (p = !1), p ? d.done = !0 : n = !1, d.setValue(v, a.round) && (r = !0);
    });
    const c = xt(this), u = c.getValue();
    if (n) {
      const d = Ze(i.to);
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
    if (Zt(this)) {
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
    return Z.und(t) ? (r = this.queue || [], this.queue = []) : r = [Z.obj(t) ? t : Pe({}, n, {
      to: t
    })], Promise.all(r.map((i) => this._update(i))).then((i) => _l(this, i));
  }
  stop(t) {
    const {
      to: n
    } = this.animation;
    return this._focus(this.get()), oi(this._state, t && this._lastCallId), X.batchedUpdates(() => this._stop(n, t)), this;
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
    r = Z.obj(r) ? r[n] : r, (r == null || vs(r)) && (r = void 0), i = Z.obj(i) ? i[n] : i, i == null && (i = void 0);
    const a = {
      to: r,
      from: i
    };
    return Ro(this) || (t.reverse && ([r, i] = [i, r]), i = Ze(i), Z.und(i) ? xt(this) || this._set(r) : this._set(i)), a;
  }
  _update(t, n) {
    let r = Pe({}, t);
    const {
      key: i,
      defaultProps: a
    } = this;
    r.default && Object.assign(a, xl(r, (c, u) => /^on/.test(u) ? Ud(c, i) : c)), Eu(this, r, "onProps"), Pr(this, "onProps", r, this);
    const o = this._prepareNode(r);
    if (Object.isFrozen(this))
      throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const s = this._state;
    return Kd(++this._lastCallId, {
      key: i,
      props: r,
      defaultProps: a,
      state: s,
      actions: {
        pause: () => {
          Or(this) || (bu(this, !0), Wr(s.pauseQueue), Pr(this, "onPause", mt(this, Fr(this, this.animation.to)), this));
        },
        resume: () => {
          Or(this) && (bu(this, !1), Zt(this) && this._resume(), Wr(s.resumeQueue), Pr(this, "onResume", mt(this, Fr(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, o)
      }
    }).then((c) => {
      if (r.loop && c.finished && !(n && c.noop)) {
        const u = Qd(r);
        if (u)
          return this._update(u, !0);
      }
      return c;
    });
  }
  _merge(t, n, r) {
    if (n.cancel)
      return this.stop(!0), r(Jn(this));
    const i = !Z.und(t.to), a = !Z.und(t.from);
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
    a && !i && (!n.default || Z.und(f)) && (f = m), n.reverse && ([f, m] = [m, f]);
    const p = !Lt(m, d);
    p && (c.from = m), m = Ze(m);
    const v = !Lt(f, u);
    v && this._focus(f);
    const h = vs(n.to), {
      config: g
    } = c, {
      decay: w,
      velocity: $
    } = g;
    (i || a) && (g.velocity = 0), n.config && !h && $7(g, $n(n.config, o), n.config !== s.config ? $n(s.config, o) : void 0);
    let y = xt(this);
    if (!y || Z.und(f))
      return r(mt(this, !0));
    const b = Z.und(n.reset) ? a && !n.default : !Z.und(m) && qr(n.reset, o), E = b ? m : this.get(), C = ai(f), k = Z.num(C) || Z.arr(C) || za(C), N = !h && (!k || qr(s.immediate || n.immediate, o));
    if (v) {
      const F = ps(f);
      if (F !== y.constructor)
        if (N)
          y = this._set(C);
        else
          throw Error(`Cannot animate between ${y.constructor.name} and ${F.name}, as the "to" prop suggests`);
    }
    const P = y.constructor;
    let O = rt(f), R = !1;
    if (!O) {
      const F = b || !Ro(this) && p;
      (v || F) && (R = Lt(ai(E), C), O = !R), (!Lt(c.immediate, N) && !N || !Lt(g.decay, w) || !Lt(g.velocity, $)) && (O = !0);
    }
    if (R && Zt(this) && (c.changed && !b ? O = !0 : O || this._stop(u)), !h && ((O || rt(u)) && (c.values = y.getPayload(), c.toValues = rt(f) ? null : P == ir ? [1] : Ge(C)), c.immediate != N && (c.immediate = N, !N && !b && this._set(u)), O)) {
      const {
        onRest: F
      } = c;
      J(O7, (x) => Eu(this, n, x));
      const _ = mt(this, Fr(this, u));
      Wr(this._pendingCalls, _), this._pendingCalls.add(r), c.changed && X.batchedUpdates(() => {
        c.changed = !b, F == null || F(_, this), b ? $n(s.onRest, _) : c.onStart == null || c.onStart(_, this);
      });
    }
    b && this._set(E), h ? r(Yd(n.to, n, this._state, this)) : O ? this._start() : Zt(this) && !v ? this._pendingCalls.add(r) : r(Gd(E));
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
    rt(n) && (vr(n, this), ys(n) && (t = n.priority + 1)), this.priority = t;
  }
  _detach() {
    const {
      to: t
    } = this.animation;
    rt(t) && ri(t, this);
  }
  _set(t, n = !0) {
    const r = Ze(t);
    if (!Z.und(r)) {
      const i = xt(this);
      if (!i || !Lt(r, i.getValue())) {
        const a = ps(r);
        !i || i.constructor != a ? Cl(this, a.create(r)) : i.setValue(r), i && X.batchedUpdates(() => {
          this._onChange(r, n);
        });
      }
    }
    return xt(this);
  }
  _onStart() {
    const t = this.animation;
    t.changed || (t.changed = !0, Pr(this, "onStart", mt(this, Fr(this, t.to)), this));
  }
  _onChange(t, n) {
    n || (this._onStart(), $n(this.animation.onChange, t, this)), $n(this.defaultProps.onChange, t, this), super._onChange(t, n);
  }
  _start() {
    const t = this.animation;
    xt(this).reset(Ze(t.to)), t.immediate || (t.fromValues = t.values.map((n) => n.lastPosition)), Zt(this) || (yu(this, !0), Or(this) || this._resume());
  }
  _resume() {
    st.skipAnimation ? this.finish() : Za.start(this);
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
      const i = n ? Jn(this.get()) : mt(this.get(), Fr(this, t != null ? t : r.to));
      Wr(this._pendingCalls, i), r.changed && (r.changed = !1, Pr(this, "onRest", i, this));
    }
  }
}
function Fr(e, t) {
  const n = ai(t), r = ai(e.get());
  return Lt(r, n);
}
function Qd(e, t = e.loop, n = e.to) {
  let r = $n(t);
  if (r) {
    const i = r !== !0 && qd(r), a = (i || e).reverse, o = !i || i.reset;
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
  } = e = qd(e), r = /* @__PURE__ */ new Set();
  return Z.obj(t) && wu(t, r), Z.obj(n) && wu(n, r), e.keys = r.size ? Array.from(r) : null, e;
}
function S7(e) {
  const t = si(e);
  return Z.und(t.default) && (t.default = xl(t)), t;
}
function wu(e, t) {
  Ot(e, (n, r) => n != null && t.add(r));
}
const O7 = ["onStart", "onRest", "onChange", "onPause", "onResume"];
function Eu(e, t, n) {
  e.animation[n] = t[n] !== zd(t, n) ? Ud(t[n], e.key) : void 0;
}
function Pr(e, t, ...n) {
  var r, i, a, o;
  (r = (i = e.animation)[t]) == null || r.call(i, ...n), (a = (o = e.defaultProps)[t]) == null || a.call(o, ...n);
}
const F7 = ["onStart", "onChange", "onRest"];
let P7 = 1;
class N7 {
  constructor(t, n) {
    this.id = P7++, this.springs = {}, this.queue = [], this.ref = void 0, this._flush = void 0, this._initialProps = void 0, this._lastAsyncId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._item = void 0, this._state = {
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
      Z.und(r) || this.springs[n].set(r);
    }
  }
  update(t) {
    return t && this.queue.push(si(t)), this;
  }
  start(t) {
    let {
      queue: n
    } = this;
    return t ? n = Ge(t).map(si) : this.queue = [], this._flush ? this._flush(this, n) : (r1(this, n), Es(this, n));
  }
  stop(t, n) {
    if (t !== !!t && (n = t), n) {
      const r = this.springs;
      J(Ge(n), (i) => r[i].stop(!!t));
    } else
      oi(this._state, this._lastAsyncId), this.each((r) => r.stop(!!t));
    return this;
  }
  pause(t) {
    if (Z.und(t))
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
    if (Z.und(t))
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
    X.onFrame(this._onFrame);
  }
}
function Es(e, t) {
  return Promise.all(t.map((n) => Jd(e, n))).then((n) => _l(e, n));
}
async function Jd(e, t, n) {
  const {
    keys: r,
    to: i,
    from: a,
    loop: o,
    onRest: s,
    onResolve: c
  } = t, u = Z.obj(t.default) && t.default;
  o && (t.loop = !1), i === !1 && (t.to = null), a === !1 && (t.from = null);
  const d = Z.arr(i) || Z.fun(i) ? i : void 0;
  d ? (t.to = void 0, t.onRest = void 0, u && (u.onRest = void 0)) : J(F7, (h) => {
    const g = t[h];
    if (Z.fun(g)) {
      const w = e._events[h];
      t[h] = ({
        finished: $,
        cancelled: y
      }) => {
        const b = w.get(g);
        b ? ($ || (b.finished = !1), y && (b.cancelled = !0)) : w.set(g, {
          value: null,
          finished: $ || !1,
          cancelled: y || !1
        });
      }, u && (u[h] = t[h]);
    }
  });
  const f = e._state;
  t.pause === !f.paused ? (f.paused = t.pause, Wr(t.pause ? f.pauseQueue : f.resumeQueue)) : f.paused && (t.pause = !0);
  const m = (r || Object.keys(e.springs)).map((h) => e.springs[h].start(t)), p = t.cancel === !0 || zd(t, "cancel") === !0;
  (d || p && f.asyncId) && m.push(Kd(++e._lastAsyncId, {
    props: t,
    state: f,
    actions: {
      pause: ds,
      resume: ds,
      start(h, g) {
        p ? (oi(f, e._lastAsyncId), g(Jn(e))) : (h.onRest = s, g(Yd(d, h, f, e)));
      }
    }
  })), f.paused && await new Promise((h) => {
    f.resumeQueue.add(h);
  });
  const v = _l(e, await Promise.all(m));
  if (o && v.finished && !(n && v.noop)) {
    const h = Qd(t, o, i);
    if (h)
      return r1(e, [h]), Jd(e, h, !0);
  }
  return c && X.batchedUpdates(() => c(v, e, e.item)), v;
}
function Cu(e, t) {
  const n = Pe({}, e.springs);
  return t && J(Ge(t), (r) => {
    Z.und(r.keys) && (r = si(r)), Z.obj(r.to) || (r = Pe({}, r, {
      to: void 0
    })), n1(n, r, (i) => t1(i));
  }), e1(e, n), n;
}
function e1(e, t) {
  Ot(t, (n, r) => {
    e.springs[r] || (e.springs[r] = n, vr(n, e));
  });
}
function t1(e, t) {
  const n = new k7();
  return n.key = e, t && vr(n, t), n;
}
function n1(e, t, n) {
  t.keys && J(t.keys, (r) => {
    (e[r] || (e[r] = n(r)))._prepareNode(t);
  });
}
function r1(e, t) {
  J(t, (n) => {
    n1(e.springs, n, (r) => t1(r, e));
  });
}
function A7(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const T7 = ["children"], Ga = (e) => {
  let {
    children: t
  } = e, n = A7(e, T7);
  const r = ot(ya), i = n.pause || !!r.pause, a = n.immediate || !!r.immediate;
  n = a7(() => ({
    pause: i,
    immediate: a
  }), [i, a]);
  const {
    Provider: o
  } = ya;
  return L.createElement(o, {
    value: n
  }, t);
}, ya = R7(Ga, {});
Ga.Provider = ya.Provider;
Ga.Consumer = ya.Consumer;
function R7(e, t) {
  return Object.assign(e, L.createContext(t)), e.Provider._context = e, e.Consumer._context = e, e;
}
const M7 = () => {
  const e = [], t = function(i) {
    r7();
    const a = [];
    return J(e, (o, s) => {
      if (Z.und(i))
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
      if (Z.und(r))
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
    return Z.fun(i) ? i(o, a) : i;
  };
  return t._getProps = n, t;
};
function I7(e, t, n) {
  const r = Z.fun(t) && t;
  r && !n && (n = []);
  const i = re(() => r || arguments.length == 3 ? M7() : void 0, []), a = D(0), o = Wd(), s = re(() => ({
    ctrls: [],
    queue: [],
    flush(w, $) {
      const y = Cu(w, $);
      return a.current > 0 && !s.queue.length && !Object.keys(y).some((E) => !w.springs[E]) ? Es(w, $) : new Promise((E) => {
        e1(w, y), s.queue.push(() => {
          E(Es(w, $));
        }), o();
      });
    }
  }), []), c = D([...s.ctrls]), u = [], d = uu(e) || 0;
  re(() => {
    J(c.current.slice(e, d), (w) => {
      b7(w, i), w.stop(!0);
    }), c.current.length = e, f(d, e);
  }, [e]), re(() => {
    f(0, Math.min(d, e));
  }, n);
  function f(w, $) {
    for (let y = w; y < $; y++) {
      const b = c.current[y] || (c.current[y] = new N7(null, s.flush)), E = r ? r(y, b) : t[y];
      E && (u[y] = S7(E));
    }
  }
  const m = c.current.map((w, $) => Cu(w, u[$])), p = ot(Ga), v = uu(p), h = p !== v && y7(p);
  El(() => {
    a.current++, s.ctrls = c.current;
    const {
      queue: w
    } = s;
    w.length && (s.queue = [], J(w, ($) => $())), J(c.current, ($, y) => {
      i == null || i.add($), h && $.start({
        default: p
      });
      const b = u[y];
      b && (w7($, b.ref), $.ref ? $.queue.push(b) : $.start(b));
    });
  }), Zd(() => () => {
    J(s.ctrls, (w) => w.stop(!0));
  });
  const g = m.map((w) => Pe({}, w));
  return i ? [g, i] : g;
}
function Ne(e, t) {
  const n = Z.fun(e), [[r], i] = I7(1, n ? e : [e], n ? t || [] : t);
  return n || arguments.length == 2 ? [r, i] : r;
}
let $u;
(function(e) {
  e.MOUNT = "mount", e.ENTER = "enter", e.UPDATE = "update", e.LEAVE = "leave";
})($u || ($u = {}));
class i1 extends kl {
  constructor(t, n) {
    super(), this.key = void 0, this.idle = !0, this.calc = void 0, this._active = /* @__PURE__ */ new Set(), this.source = t, this.calc = ti(...n);
    const r = this._get(), i = ps(r);
    Cl(this, i.create(r));
  }
  advance(t) {
    const n = this._get(), r = this.get();
    Lt(n, r) || (xt(this).setValue(n), this._onChange(n, this.idle)), !this.idle && xu(this._active) && Mo(this);
  }
  _get() {
    const t = Z.arr(this.source) ? this.source.map(Ze) : Ge(Ze(this.source));
    return this.calc(...t);
  }
  _start() {
    this.idle && !xu(this._active) && (this.idle = !1, J(qa(this), (t) => {
      t.done = !1;
    }), st.skipAnimation ? (X.batchedUpdates(() => this.advance()), Mo(this)) : Za.start(this));
  }
  _attach() {
    let t = 1;
    J(Ge(this.source), (n) => {
      rt(n) && vr(n, this), ys(n) && (n.idle || this._active.add(n), t = Math.max(t, n.priority + 1));
    }), this.priority = t, this._start();
  }
  _detach() {
    J(Ge(this.source), (t) => {
      rt(t) && ri(t, this);
    }), this._active.clear(), Mo(this);
  }
  eventObserved(t) {
    t.type == "change" ? t.idle ? this.advance() : (this._active.add(t.parent), this._start()) : t.type == "idle" ? this._active.delete(t.parent) : t.type == "priority" && (this.priority = Ge(this.source).reduce((n, r) => Math.max(n, (ys(r) ? r.priority : 0) + 1), 0));
  }
}
function L7(e) {
  return e.idle !== !1;
}
function xu(e) {
  return !e.size || Array.from(e).every(L7);
}
function Mo(e) {
  e.idle || (e.idle = !0, J(qa(e), (t) => {
    t.done = !0;
  }), ni(e, {
    type: "idle",
    parent: e
  }));
}
const D7 = (e, ...t) => new i1(e, t);
st.assign({
  createStringInterpolator: jd,
  to: (e, t) => new i1(e, t)
});
function Sl(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const V7 = ["style", "children", "scrollTop", "scrollLeft", "viewBox"], a1 = /^--/;
function j7(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !a1.test(e) && !(Kr.hasOwnProperty(e) && Kr[e]) ? t + "px" : ("" + t).trim();
}
const _u = {};
function B7(e, t) {
  if (!e.nodeType || !e.setAttribute)
    return !1;
  const n = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", r = t, {
    style: i,
    children: a,
    scrollTop: o,
    scrollLeft: s,
    viewBox: c
  } = r, u = Sl(r, V7), d = Object.values(u), f = Object.keys(u).map((m) => n || e.hasAttribute(m) ? m : _u[m] || (_u[m] = m.replace(/([A-Z])/g, (p) => "-" + p.toLowerCase())));
  a !== void 0 && (e.textContent = a);
  for (let m in i)
    if (i.hasOwnProperty(m)) {
      const p = j7(m, i[m]);
      a1.test(m) ? e.style.setProperty(m, p) : e.style[m] = p;
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
const W7 = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), Z7 = ["Webkit", "Ms", "Moz", "O"];
Kr = Object.keys(Kr).reduce((e, t) => (Z7.forEach((n) => e[W7(n, t)] = e[t]), e), Kr);
const H7 = ["x", "y", "z"], U7 = /^(matrix|translate|scale|rotate|skew)/, z7 = /^(translate)/, q7 = /^(rotate|skew)/, Io = (e, t) => Z.num(e) && e !== 0 ? e + t : e, na = (e, t) => Z.arr(e) ? e.every((n) => na(n, t)) : Z.num(e) ? e === t : parseFloat(e) === t;
class K7 extends Ka {
  constructor(t) {
    let {
      x: n,
      y: r,
      z: i
    } = t, a = Sl(t, H7);
    const o = [], s = [];
    (n || r || i) && (o.push([n || 0, r || 0, i || 0]), s.push((c) => [`translate3d(${c.map((u) => Io(u, "px")).join(",")})`, na(c, 0)])), Ot(a, (c, u) => {
      if (u === "transform")
        o.push([c || ""]), s.push((d) => [d, d === ""]);
      else if (U7.test(u)) {
        if (delete a[u], Z.und(c))
          return;
        const d = z7.test(u) ? "px" : q7.test(u) ? "deg" : "";
        o.push(Ge(c)), s.push(u === "rotate3d" ? ([f, m, p, v]) => [`rotate3d(${f},${m},${p},${Io(v, d)})`, na(v, 0)] : (f) => [`${u}(${f.map((m) => Io(m, d)).join(",")})`, na(f, u.startsWith("scale") ? 1 : 0)]);
      }
    }), o.length && (a.transform = new G7(o, s)), super(a);
  }
}
class G7 extends Ld {
  constructor(t, n) {
    super(), this._value = null, this.inputs = t, this.transforms = n;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", n = !0;
    return J(this.inputs, (r, i) => {
      const a = Ze(r[0]), [o, s] = this.transforms[i](Z.arr(a) ? a : r.map(Ze));
      t += " " + o, n = n && s;
    }), n ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && J(this.inputs, (n) => J(n, (r) => rt(r) && vr(r, this)));
  }
  observerRemoved(t) {
    t == 0 && J(this.inputs, (n) => J(n, (r) => rt(r) && ri(r, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), ni(this, t);
  }
}
const Y7 = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"], X7 = ["scrollTop", "scrollLeft"];
st.assign({
  batchedUpdates: Sm,
  createStringInterpolator: jd,
  colors: R6
});
const Q7 = m7(Y7, {
  applyAnimatedValues: B7,
  createAnimatedStyle: (e) => new K7(e),
  getComponentProps: (e) => Sl(e, X7)
}), ue = Q7.animated;
function J7(e) {
  return (typeof e == "function" ? e() : e) || document.body;
}
function yr(e, t) {
  if (lr && e) {
    const n = J7(e);
    return Om(t, n);
  }
  return t;
}
function ey(e) {
  const t = D(e);
  return e && (t.current = !0), !!t.current;
}
const br = (e) => Ya(e.active, e.forceRender, e.destroyOnClose) ? e.children : null;
function Ya(e, t, n) {
  const r = ey(e);
  return t || e ? !0 : r ? !n : !1;
}
const ty = {
  click: "onClick"
};
function nn(e, t) {
  const n = Object.assign({}, t.props);
  for (const r of e) {
    const i = ty[r];
    n[i] = function(a) {
      var o, s;
      a.stopPropagation(), (s = (o = t.props)[i]) === null || s === void 0 || s.call(o, a);
    };
  }
  return l.cloneElement(t, n);
}
const Lo = "adm-mask", ny = {
  default: 0.55,
  thin: 0.35,
  thick: 0.75
}, ry = {
  black: "0, 0, 0",
  white: "255, 255, 255"
}, iy = {
  visible: !0,
  destroyOnClose: !1,
  forceRender: !1,
  color: "black",
  opacity: "default",
  disableBodyScroll: !0,
  getContainer: null,
  stopPropagation: ["click"]
}, ay = (e) => {
  const t = U(iy, e), {
    locale: n
  } = pe(), r = D(null);
  Ba(r, t.visible && t.disableBodyScroll);
  const i = re(() => {
    var d;
    const f = (d = ny[t.opacity]) !== null && d !== void 0 ? d : t.opacity, m = ry[t.color];
    return m ? `rgba(${m}, ${f})` : t.color;
  }, [t.color, t.opacity]), [a, o] = q(t.visible), s = fl(), {
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
  return l.createElement(br, {
    active: a,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, yr(t.getContainer, u));
}, $i = ay;
function o1(e) {
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
function xi(e) {
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
function oy(e) {
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
function sy(e) {
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
function ly(e) {
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
function cy(e) {
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
function uy(e) {
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
function fy(e) {
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
const Ol = {
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
function m1(e) {
  const [t, n] = q(e);
  return _e(() => {
    n(e);
  }, [e]), t;
}
function my(e, t, n) {
  return Math.max(t, Math.min(e, n));
}
const xe = {
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
  return r === 0 ? my(e, t, n) : e < t ? -Su(t - e, n - t, r) + t : e > n ? +Su(e - n, n - t, r) + n : e;
}
function hy(e, [t, n], [r, i]) {
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
function he(e) {
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
const h1 = {
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
const py = ["enter", "leave"];
function vy(e = !1, t) {
  return e && !py.includes(t);
}
function gy(e, t = "", n = !1) {
  const r = h1[e], i = r && r[t] || t;
  return "on" + Pu(e) + Pu(i) + (vy(n, i) ? "Capture" : "");
}
const yy = ["gotpointercapture", "lostpointercapture"];
function by(e) {
  let t = e.substring(2).toLowerCase();
  const n = !!~t.indexOf("passive");
  n && (t = t.replace("passive", ""));
  const r = yy.includes(t) ? "capturecapture" : "capture", i = !!~t.indexOf(r);
  return i && (t = t.replace("capture", "")), {
    device: t,
    capture: i,
    passive: n
  };
}
function wy(e, t = "") {
  const n = h1[e], r = n && n[t] || t;
  return e + r;
}
function Qa(e) {
  return "touches" in e;
}
function p1(e) {
  return Qa(e) ? "touch" : "pointerType" in e ? e.pointerType : "mouse";
}
function Ey(e) {
  return Array.from(e.touches).filter((t) => {
    var n, r;
    return t.target === e.currentTarget || ((n = e.currentTarget) === null || n === void 0 || (r = n.contains) === null || r === void 0 ? void 0 : r.call(n, t.target));
  });
}
function Cy(e) {
  return e.type === "touchend" || e.type === "touchcancel" ? e.changedTouches : e.targetTouches;
}
function v1(e) {
  return Qa(e) ? Cy(e)[0] : e;
}
function Cs(e, t) {
  const n = t.clientX - e.clientX, r = t.clientY - e.clientY, i = (t.clientX + e.clientX) / 2, a = (t.clientY + e.clientY) / 2, o = Math.hypot(n, r);
  return {
    angle: -(Math.atan2(n, r) * 180) / Math.PI,
    distance: o,
    origin: [i, a]
  };
}
function $y(e) {
  return Ey(e).map((t) => t.identifier);
}
function Nu(e, t) {
  const [n, r] = Array.from(e.touches).filter((i) => t.includes(i.identifier));
  return Cs(n, r);
}
function Do(e) {
  const t = v1(e);
  return Qa(e) ? t.identifier : t.pointerId;
}
function Au(e) {
  const t = v1(e);
  return [t.clientX, t.clientY];
}
const Tu = 40, Ru = 800;
function g1(e) {
  let {
    deltaX: t,
    deltaY: n,
    deltaMode: r
  } = e;
  return r === 1 ? (t *= Tu, n *= Tu) : r === 2 && (t *= Ru, n *= Ru), [t, n];
}
function xy(e) {
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
function _y() {
}
function ky(...e) {
  return e.length === 0 ? _y : e.length === 1 ? e[0] : function() {
    let t;
    for (const n of e)
      t = n.apply(this, arguments) || t;
    return t;
  };
}
function Mu(e, t) {
  return Object.assign({}, t, e || {});
}
const Sy = 32;
class y1 {
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
    if (t && (n.event = t, r.preventDefault && t.cancelable && n.event.preventDefault(), n.type = t.type, i.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size, i.locked = !!document.pointerLockElement, Object.assign(i, xy(t)), i.down = i.pressed = i.buttons % 2 === 1 || i.touches > 0, a = t.timeStamp - n.timeStamp, n.timeStamp = t.timeStamp, n.elapsedTime = n.timeStamp - n.startTime), n._active) {
      const C = n._delta.map(Math.abs);
      xe.addTo(n._distance, C);
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
    const p = n.offset, v = n._active && !n._blocked || n.active;
    v && (n.first = n._active && !n.active, n.last = !n._active && n.active, n.active = i[this.ingKey] = n._active, t && (n.first && ("bounds" in r && (n._bounds = ba(r.bounds, n)), this.setup && this.setup()), n.movement = m, this.computeOffset()));
    const [h, g] = n.offset, [[w, $], [y, b]] = n._bounds;
    n.overflow = [h < w ? -1 : h > $ ? 1 : 0, g < y ? -1 : g > b ? 1 : 0], n._movementBound[0] = n.overflow[0] ? n._movementBound[0] === !1 ? n._movement[0] : n._movementBound[0] : !1, n._movementBound[1] = n.overflow[1] ? n._movementBound[1] === !1 ? n._movement[1] : n._movementBound[1] : !1;
    const E = n._active ? r.rubberband || [0, 0] : [0, 0];
    if (n.offset = hy(n._bounds, n.offset, E), n.delta = xe.sub(n.offset, p), this.computeMovement(), v && (!n.last || a > Sy)) {
      n.delta = xe.sub(n.offset, p);
      const C = n.delta.map(Math.abs);
      xe.addTo(n.distance, C), n.direction = n.delta.map(Math.sign), n._direction = n._delta.map(Math.sign), !n.first && a > 0 && (n.velocity = [C[0] / a, C[1] / a]);
    }
  }
  emit() {
    const t = this.state, n = this.shared, r = this.config;
    if (t._active || this.clean(), (t._blocked || !t.intentional) && !t._force && !r.triggerAllEvents)
      return;
    const i = this.handler(he(he(he({}, n), t), {}, {
      [this.aliasKey]: t.values
    }));
    i !== void 0 && (t.memo = i);
  }
  clean() {
    this.eventStore.clean(), this.timeoutStore.clean();
  }
}
function Oy([e, t], n) {
  const r = Math.abs(e), i = Math.abs(t);
  if (r > i && r > n)
    return "x";
  if (i > r && i > n)
    return "y";
}
class b1 extends y1 {
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
    this.state.offset = xe.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = xe.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(t) {
    const n = this.state, r = this.config;
    if (!n.axis && t) {
      const i = typeof r.axisThreshold == "object" ? r.axisThreshold[p1(t)] : r.axisThreshold;
      n.axis = Oy(n._movement, i);
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
const Fy = (e) => e, Iu = 0.15, w1 = {
  enabled(e = !0) {
    return e;
  },
  eventOptions(e, t, n) {
    return he(he({}, n.shared.eventOptions), e);
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
        return xe.toVector(e);
    }
  },
  from(e) {
    if (typeof e == "function")
      return e;
    if (e != null)
      return xe.toVector(e);
  },
  transform(e, t, n) {
    const r = e || n.shared.transform;
    return this.hasCustomTransform = !!r, r || Fy;
  },
  threshold(e) {
    return xe.toVector(e, 0);
  }
}, Py = 0, wr = he(he({}, w1), {}, {
  axis(e, t, {
    axis: n
  }) {
    if (this.lockDirection = n === "lock", !this.lockDirection)
      return n;
  },
  axisThreshold(e = Py) {
    return e;
  },
  bounds(e = {}) {
    if (typeof e == "function")
      return (a) => wr.bounds(e(a));
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
class Ny extends b1 {
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
      t._bounds = wr.bounds(i);
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
    n.pointerCapture && t.target.setPointerCapture(t.pointerId), !(i && i.size > 1 && r._pointerActive) && (this.start(t), this.setupPointer(t), r._pointerId = Do(t), r._pointerActive = !0, this.computeValues(Au(t)), this.computeInitial(), n.preventScrollAxis && p1(t) !== "mouse" ? (r._active = !1, this.setupScrollPrevention(t)) : n.delay > 0 ? (this.setupDelayTrigger(t), n.triggerAllEvents && (this.compute(t), this.emit())) : this.startPointerDrag(t));
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
    const a = Au(t);
    if (document.pointerLockElement === t.target ? n._delta = [t.movementX, t.movementY] : (n._delta = xe.sub(a, n._values), this.computeValues(a)), xe.addTo(n._movement, n._delta), this.compute(t), n._delayed && n.intentional) {
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
    this.state._preventScroll = !1, Ay(t);
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
      this.start(t), r._delta = n(i), r._keyboardActive = !0, xe.addTo(r._movement, r._delta), this.compute(t), this.emit();
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
function Ay(e) {
  "persist" in e && typeof e.persist == "function" && e.persist();
}
const _i = typeof window < "u" && window.document && window.document.createElement;
function Ty() {
  return _i && "ontouchstart" in window;
}
function Du() {
  return Ty() || _i && window.navigator.maxTouchPoints > 1;
}
function Ry() {
  return _i && "onpointerdown" in window;
}
function My() {
  return _i && "exitPointerLock" in window.document;
}
function Iy() {
  try {
    return "constructor" in GestureEvent;
  } catch {
    return !1;
  }
}
const it = {
  isBrowser: _i,
  gesture: Iy(),
  touch: Du(),
  touchscreen: Du(),
  pointer: Ry(),
  pointerLock: My()
}, Ly = 250, Dy = 180, Vy = 0.5, jy = 50, By = 250, Vu = {
  mouse: 0,
  touch: 0,
  pen: 8
}, Wy = he(he({}, wr), {}, {
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
    if (this.preventScrollDelay = typeof n == "number" ? n : n || n === void 0 && e ? Ly : void 0, !(!it.touchscreen || n === !1))
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
    const a = xe.toVector(e, n ? r : i ? 1 : 0);
    return this.filterTaps = n, this.tapsThreshold = r, a;
  },
  swipe({
    velocity: e = Vy,
    distance: t = jy,
    duration: n = By
  } = {}) {
    return {
      velocity: this.transform(xe.toVector(e)),
      distance: this.transform(xe.toVector(t)),
      duration: n
    };
  },
  delay(e = 0) {
    switch (e) {
      case !0:
        return Dy;
      case !1:
        return 0;
      default:
        return e;
    }
  },
  axisThreshold(e) {
    return e ? he(he({}, Vu), e) : Vu;
  }
}), Zy = 30, Hy = 100;
class Uy extends y1 {
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
    t === "wheel" ? this.state.offset = xe.add(n, r) : this.state.offset = [(1 + n[0]) * r[0], n[1] + r[1]];
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
      const i = Math.abs(n) * Zy - Math.abs(r);
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
    const i = Nu(t, n._touchIds);
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
    const n = Nu(t, this.state._touchIds);
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
    n._movement = [t.scale - 1, t.rotation], n._delta = xe.sub(n._movement, r), this.compute(t), this.emit();
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
    r._delta = [-g1(t)[1] / Hy * r.offset[0], 0], xe.addTo(r._movement, r._delta), this.state.origin = [t.clientX, t.clientY], this.compute(t), this.emit();
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
const zy = he(he({}, w1), {}, {
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
    return this.lockDirection = n.axis === "lock", xe.toVector(e, this.lockDirection ? [0.1, 3] : 0);
  },
  modifierKey(e) {
    return e === void 0 ? "ctrlKey" : e;
  }
});
he(he({}, wr), {}, {
  mouseOnly: (e = !0) => e
});
class qy extends b1 {
  constructor(...t) {
    super(...t), Re(this, "ingKey", "wheeling");
  }
  wheel(t) {
    this.state._active || this.start(t), this.wheelChange(t), this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(t) {
    const n = this.state;
    n._delta = g1(t), xe.addTo(n._movement, n._delta);
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
const Ky = wr;
he(he({}, wr), {}, {
  mouseOnly: (e = !0) => e
});
const Fl = /* @__PURE__ */ new Map(), $s = /* @__PURE__ */ new Map();
function Pl(e) {
  Fl.set(e.key, e.engine), $s.set(e.key, e.resolver);
}
const E1 = {
  key: "drag",
  engine: Ny,
  resolver: Wy
}, Gy = {
  key: "pinch",
  engine: Uy,
  resolver: zy
}, Yy = {
  key: "wheel",
  engine: qy,
  resolver: Ky
};
function Xy(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Qy(e, t) {
  if (e == null)
    return {};
  var n = Xy(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && (!Object.prototype.propertyIsEnumerable.call(e, r) || (n[r] = e[r]));
  }
  return n;
}
const Jy = {
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
}, e8 = ["target", "eventOptions", "window", "enabled", "transform"];
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
function t8(e, t, n = {}) {
  const r = e, {
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  } = r, u = Qy(r, e8);
  if (n.shared = ra({
    target: i,
    eventOptions: a,
    window: o,
    enabled: s,
    transform: c
  }, Jy), t) {
    const d = $s.get(t);
    n[t] = ra(he({
      shared: n.shared
    }, u), d);
  } else
    for (const d in u) {
      const f = $s.get(d);
      f && (n[d] = ra(he({
        shared: n.shared
      }, u[d]), f));
    }
  return n;
}
class C1 {
  constructor(t, n) {
    Re(this, "_listeners", /* @__PURE__ */ new Set()), this._ctrl = t, this._gestureKey = n;
  }
  add(t, n, r, i, a) {
    const o = this._listeners, s = wy(n, r), c = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}, u = he(he({}, c), a);
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
class n8 {
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
class r8 {
  constructor(t) {
    Re(this, "gestures", /* @__PURE__ */ new Set()), Re(this, "_targetEventStore", new C1(this)), Re(this, "gestureEventStores", {}), Re(this, "gestureTimeoutStores", {}), Re(this, "handlers", {}), Re(this, "config", {}), Re(this, "pointerIds", /* @__PURE__ */ new Set()), Re(this, "touchIds", /* @__PURE__ */ new Set()), Re(this, "state", {
      shared: {
        shiftKey: !1,
        metaKey: !1,
        ctrlKey: !1,
        altKey: !1
      }
    }), i8(this, t);
  }
  setEventIds(t) {
    if (Qa(t))
      return this.touchIds = new Set($y(t)), this.touchIds;
    if ("pointerId" in t)
      return t.type === "pointerup" || t.type === "pointercancel" ? this.pointerIds.delete(t.pointerId) : t.type === "pointerdown" && this.pointerIds.add(t.pointerId), this.pointerIds;
  }
  applyHandlers(t, n) {
    this.handlers = t, this.nativeHandlers = n;
  }
  applyConfig(t, n) {
    this.config = t8(t, n, this.config);
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
            const u = Fl.get(o);
            new u(this, t, o).bind(c);
          }
        }
        const a = ju(r, n.eventOptions, !!i);
        for (const o in this.nativeHandlers)
          a(o, "", (s) => this.nativeHandlers[o](he(he({}, this.state.shared), {}, {
            event: s,
            args: t
          })), void 0, !0);
      }
      for (const a in r)
        r[a] = ky(...r[a]);
      if (!i)
        return r;
      for (const a in r) {
        const {
          device: o,
          capture: s,
          passive: c
        } = by(a);
        this._targetEventStore.add(i, o, "", r[a], {
          capture: s,
          passive: c
        });
      }
    }
  }
}
function Dn(e, t) {
  e.gestures.add(t), e.gestureEventStores[t] = new C1(e, t), e.gestureTimeoutStores[t] = new n8();
}
function i8(e, t) {
  t.drag && Dn(e, "drag"), t.wheel && Dn(e, "wheel"), t.scroll && Dn(e, "scroll"), t.move && Dn(e, "move"), t.pinch && Dn(e, "pinch"), t.hover && Dn(e, "hover");
}
const ju = (e, t, n) => (r, i, a, o = {}, s = !1) => {
  var c, u;
  const d = (c = o.capture) !== null && c !== void 0 ? c : t.capture, f = (u = o.passive) !== null && u !== void 0 ? u : t.passive;
  let m = s ? r : gy(r, i, d);
  n && f && (m += "Passive"), e[m] = e[m] || [], e[m].push(a);
}, a8 = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function o8(e) {
  const t = {}, n = {}, r = /* @__PURE__ */ new Set();
  for (let i in e)
    a8.test(i) ? (r.add(RegExp.lastMatch), n[i] = e[i]) : t[i] = e[i];
  return [n, t, r];
}
function Vn(e, t, n, r, i, a) {
  if (!e.has(n) || !Fl.has(r))
    return;
  const o = n + "Start", s = n + "End", c = (u) => {
    let d;
    return u.first && o in t && t[o](u), n in t && (d = t[n](u)), u.last && s in t && t[s](u), d;
  };
  i[r] = c, a[r] = a[r] || {};
}
function s8(e, t) {
  const [n, r, i] = o8(e), a = {};
  return Vn(i, n, "onDrag", "drag", a, t), Vn(i, n, "onWheel", "wheel", a, t), Vn(i, n, "onScroll", "scroll", a, t), Vn(i, n, "onPinch", "pinch", a, t), Vn(i, n, "onMove", "move", a, t), Vn(i, n, "onHover", "hover", a, t), {
    handlers: a,
    config: t,
    nativeHandlers: r
  };
}
function Nl(e, t = {}, n, r) {
  const i = l.useMemo(() => new r8(e), []);
  if (i.applyHandlers(e, r), i.applyConfig(t, n), l.useEffect(i.effect.bind(i)), l.useEffect(() => i.clean.bind(i), []), t.target === void 0)
    return i.bind.bind(i);
}
function Nt(e, t) {
  return Pl(E1), Nl({
    drag: e
  }, t || {}, "drag");
}
function l8(e, t) {
  return Pl(Yy), Nl({
    wheel: e
  }, t || {}, "wheel");
}
function c8(e) {
  return e.forEach(Pl), function(n, r) {
    const {
      handlers: i,
      nativeHandlers: a,
      config: o
    } = s8(n, r || {});
    return Nl(i, o, void 0, a);
  };
}
const Wi = "adm-popup", u8 = Object.assign(Object.assign({}, Ol), {
  closeOnSwipe: !1,
  position: "bottom"
}), f8 = (e) => {
  const t = U(u8, e), {
    locale: n
  } = pe(), r = j(`${Wi}-body`, t.bodyClassName, `${Wi}-body-position-${t.position}`), [i, a] = q(t.visible);
  _e(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = D(null);
  Ba(o, t.disableBodyScroll && i ? "strict" : !1);
  const s = fl(), {
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
      var m, p;
      s.current || (a(t.visible), t.visible ? (m = t.afterShow) === null || m === void 0 || m.call(t) : (p = t.afterClose) === null || p === void 0 || p.call(t));
    }
  }), u = Nt(({
    swipe: [, m]
  }) => {
    var p;
    !t.closeOnSwipe || (m === 1 && t.position === "bottom" || m === -1 && t.position === "top") && ((p = t.onClose) === null || p === void 0 || p.call(t));
  }, {
    axis: "y",
    enabled: ["top", "bottom"].includes(t.position)
  }), d = m1(i && t.visible), f = nn(t.stopPropagation, B(t, l.createElement("div", Object.assign({
    className: Wi,
    onClick: t.onClick,
    style: {
      display: i ? void 0 : "none",
      touchAction: ["top", "bottom"].includes(t.position) ? "none" : "auto"
    }
  }, u()), t.mask && l.createElement($i, {
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
    className: j(`${Wi}-close-icon`, "adm-plain-anchor"),
    onClick: () => {
      var m;
      (m = t.onClose) === null || m === void 0 || m.call(t);
    },
    role: "button",
    "aria-label": n.common.close
  }, l.createElement(xi, null)), t.children))));
  return l.createElement(br, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, yr(t.getContainer, f));
}, ki = f8;
const Bu = "adm-safe-area", d8 = (e) => B(e, l.createElement("div", {
  className: j(Bu, `${Bu}-position-${e.position}`)
})), Er = d8, wa = Object.assign({}, km), {
  version: m8,
  render: h8,
  unmountComponentAtNode: p8
} = wa;
let Ja;
try {
  Number((m8 || "").split(".")[0]) >= 18 && wa.createRoot && (Ja = wa.createRoot);
} catch {
}
function Wu(e) {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: t
  } = wa;
  t && typeof t == "object" && (t.usingClientEntryPoint = e);
}
const Ea = "__antd_mobile_root__";
function v8(e, t) {
  h8(e, t);
}
function g8(e, t) {
  Wu(!0);
  const n = t[Ea] || Ja(t);
  Wu(!1), n.render(e), t[Ea] = n;
}
function y8(e, t) {
  if (Ja) {
    g8(e, t);
    return;
  }
  v8(e, t);
}
function b8(e) {
  return p8(e);
}
function w8(e) {
  return $e(this, void 0, void 0, function* () {
    return Promise.resolve().then(() => {
      var t;
      (t = e[Ea]) === null || t === void 0 || t.unmount(), delete e[Ea];
    });
  });
}
function E8(e) {
  return Ja ? w8(e) : b8(e);
}
function Si(e) {
  const t = document.createElement("div");
  document.body.appendChild(t);
  function n() {
    E8(t) && t.parentNode && t.parentNode.removeChild(t);
  }
  return y8(e, t), n;
}
function Cr(e) {
  const t = l.forwardRef((i, a) => {
    const [o, s] = q(!1), c = D(!1), [u, d] = q(e), f = D(0);
    G(() => {
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
    return ve(a, () => ({
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
  }), n = l.createRef(), r = Si(l.createElement(t, {
    ref: n
  }));
  return {
    close: () => $e(this, void 0, void 0, function* () {
      var i;
      n.current ? (i = n.current) === null || i === void 0 || i.close() : r();
    }),
    replace: (i) => {
      var a;
      (a = n.current) === null || a === void 0 || a.replace(i);
    }
  };
}
const Le = "adm-action-sheet", C8 = {
  visible: !1,
  actions: [],
  cancelText: "",
  closeOnAction: !1,
  closeOnMaskClick: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, $1 = (e) => {
  const t = U(C8, e);
  return l.createElement(ki, {
    visible: t.visible,
    onMaskClick: () => {
      var n, r;
      (n = t.onMaskClick) === null || n === void 0 || n.call(t), t.closeOnMaskClick && ((r = t.onClose) === null || r === void 0 || r.call(t));
    },
    afterClose: t.afterClose,
    className: j(`${Le}-popup`, t.popupClassName),
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
    className: j("adm-plain-anchor", `${Le}-button-item`, {
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
    className: j("adm-plain-anchor", `${Le}-button-item`),
    onClick: () => {
      var n;
      (n = t.onClose) === null || n === void 0 || n.call(t);
    }
  }, l.createElement("div", {
    className: `${Le}-button-item-name`
  }, t.cancelText)))), t.safeArea && l.createElement(Er, {
    position: "bottom"
  }))));
};
function $8(e) {
  return Cr(l.createElement($1, Object.assign({}, e)));
}
const yk = ie($1, {
  show: $8
});
const Zu = "adm-auto-center", x8 = (e) => B(e, l.createElement("div", {
  className: Zu
}, l.createElement("div", {
  className: `${Zu}-content`
}, e.children))), li = x8;
const _8 = Ve(() => l.createElement("svg", {
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
var Al = {}, k8 = _t && _t.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Al, "__esModule", { value: !0 });
var Tl = Al.staged = void 0;
const S8 = k8(l);
function x1(e) {
  return typeof e == "function" ? S8.default.createElement(O8, { stage: e }) : e;
}
function O8(e) {
  const t = e.stage();
  return x1(t);
}
function F8(e) {
  return function(n, r) {
    const i = e(n, r);
    return x1(i);
  };
}
Tl = Al.staged = F8;
function xn(e) {
  return typeof e == "number" ? `${e}px` : e;
}
const P8 = (e) => {
  const t = D(null), [n] = q5(t);
  return G(() => {
    n && e.onActive();
  }, [n]), l.createElement("div", {
    ref: t
  });
}, Oi = dd(_e), N8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M41.396 6.234c1.923 0 3.487 1.574 3.487 3.505v29.14c0 1.937-1.568 3.51-3.491 3.51H6.604c-1.923 0-3.487-1.573-3.487-3.51V9.745c0-1.936 1.564-3.51 3.487-3.51Zm0 2.847H6.604c-.355 0-.654.3-.654.658V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.405 2.405 0 0 1 1.933.752l4.182 4.525 7.58-11.005a2.374 2.374 0 0 1 1.96-1.01c.79 0 1.532.38 1.966 1.01L42.05 34.89V9.74a.664.664 0 0 0-.654-.658Zm-28.305 2.763a3.119 3.119 0 0 1 3.117 3.117 3.119 3.119 0 0 1-3.117 3.117 3.122 3.122 0 0 1-3.117-3.117 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), A8 = () => l.createElement("svg", {
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg"
}, l.createElement("path", {
  d: "M19.233 6.233 17.42 9.08l-10.817.001a.665.665 0 0 0-.647.562l-.007.096V34.9l5.989-8.707a2.373 2.373 0 0 1 1.801-1.005 2.415 2.415 0 0 1 1.807.625l.126.127 4.182 4.525 2.267-3.292 5.461 7.841-4.065 7.375H6.604c-1.86 0-3.382-1.47-3.482-3.317l-.005-.192V9.744c0-1.872 1.461-3.405 3.296-3.505l.19-.005h12.63Zm22.163 0c1.86 0 3.382 1.472 3.482 3.314l.005.192v29.14a3.507 3.507 0 0 1-3.3 3.505l-.191.006H27.789l3.63-6.587.06-.119a1.87 1.87 0 0 0-.163-1.853l-6.928-9.949 3.047-4.422a2.374 2.374 0 0 1 1.96-1.01 2.4 2.4 0 0 1 1.86.87l.106.14L42.05 34.89V9.74a.664.664 0 0 0-.654-.658H21.855l1.812-2.848h17.73Zm-28.305 5.611c.794 0 1.52.298 2.07.788l-.843 1.325-.067.114a1.87 1.87 0 0 0 .11 1.959l.848 1.217c-.556.515-1.3.83-2.118.83a3.122 3.122 0 0 1-3.117-3.116 3.119 3.119 0 0 1 3.117-3.117Z",
  fill: "#DBDBDB",
  fillRule: "nonzero"
})), Ca = "adm-image", T8 = {
  fit: "fill",
  placeholder: l.createElement("div", {
    className: `${Ca}-tip`
  }, l.createElement(N8, null)),
  fallback: l.createElement("div", {
    className: `${Ca}-tip`
  }, l.createElement(A8, null)),
  lazy: !1,
  draggable: !1
}, R8 = Tl((e) => {
  const t = U(T8, e), [n, r] = q(!1), [i, a] = q(!1), o = D(null), s = D(null);
  let c = t.src, u = t.srcSet;
  const [d, f] = q(!t.lazy);
  c = d ? t.src : void 0, u = d ? t.srcSet : void 0, Oi(() => {
    r(!1), a(!1);
  }, [c]), G(() => {
    var v;
    !((v = s.current) === null || v === void 0) && v.complete && r(!0);
  }, []);
  function m() {
    if (i)
      return l.createElement(l.Fragment, null, t.fallback);
    const v = l.createElement("img", {
      ref: s,
      id: t.id,
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
  }, t.lazy && !d && l.createElement(P8, {
    onActive: () => {
      f(!0);
    }
  }), m()));
}), eo = R8, M8 = "adm-avatar", I8 = {
  fallback: l.createElement(_8, null),
  fit: "cover"
}, L8 = (e) => {
  const t = U(I8, e);
  return B(t, l.createElement(eo, {
    className: M8,
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
}, bk = L8;
const jn = "adm-badge", _1 = l.createElement(l.Fragment, null), D8 = (e) => {
  const {
    content: t,
    color: n,
    children: r
  } = e, i = t === _1, a = j(jn, !!r && `${jn}-fixed`, i && `${jn}-dot`, e.bordered && `${jn}-bordered`), o = t || t === 0 ? B(e, l.createElement("div", {
    className: a,
    style: {
      "--color": n
    }
  }, !i && l.createElement("div", {
    className: `${jn}-content`
  }, t))) : null;
  return r ? l.createElement("div", {
    className: j(`${jn}-wrapper`, e.wrapperClassName),
    style: e.wrapperStyle
  }, r, o) : o;
}, xs = ie(D8, {
  dot: _1
});
const V8 = "adm-dot-loading", j8 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, B8 = {
  color: "default"
}, k1 = Ve((e) => {
  var t;
  const n = U(B8, e);
  return B(n, l.createElement("div", {
    style: {
      color: (t = j8[n.color]) !== null && t !== void 0 ? t : n.color
    },
    className: j("adm-loading", V8)
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
}), S1 = k1;
function O1(e) {
  return !!e && typeof e == "object" && typeof e.then == "function";
}
function W8() {
  return lr ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : !1;
}
const et = "adm-button", Z8 = {
  color: "default",
  fill: "solid",
  block: !1,
  loading: !1,
  loadingIcon: l.createElement(S1, {
    color: "currentColor"
  }),
  type: "button",
  shape: "default",
  size: "middle"
}, H8 = de((e, t) => {
  const n = U(Z8, e), [r, i] = q(!1), a = D(null), o = n.loading === "auto" ? r : n.loading, s = n.disabled || o;
  ve(t, () => ({
    get nativeElement() {
      return a.current;
    }
  }));
  const c = (u) => $e(void 0, void 0, void 0, function* () {
    if (!n.onClick)
      return;
    const d = n.onClick(u);
    if (O1(d))
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
    className: j(et, n.color ? `${et}-${n.color}` : null, {
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
}), rn = H8;
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
var F1 = { exports: {} };
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
})(F1);
const Rl = F1.exports;
function te(e) {
  const {
    value: t,
    defaultValue: n,
    onChange: r
  } = e, i = hd(), a = D(t !== void 0 ? t : n);
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
  return ke().year(e.year).month(e.month - 1).date(1);
}
ke.extend(Rl);
const ce = "adm-calendar", U8 = {
  weekStartsOn: "Sunday",
  defaultValue: null,
  allowClear: !0,
  prevMonthButton: l.createElement(Hu, null),
  prevYearButton: l.createElement(Uu, null),
  nextMonthButton: l.createElement(Hu, null),
  nextYearButton: l.createElement(Uu, null)
}, z8 = de((e, t) => {
  const n = ke(), r = U(U8, e), {
    locale: i
  } = pe(), a = [...i.Calendar.markItems];
  if (r.weekStartsOn === "Sunday") {
    const y = a.pop();
    y && a.unshift(y);
  }
  const [o, s] = te({
    value: r.value === void 0 ? void 0 : zu(r.selectionMode, r.value),
    defaultValue: zu(r.selectionMode, r.defaultValue),
    onChange: (y) => {
      var b, E;
      r.selectionMode === "single" ? (b = r.onChange) === null || b === void 0 || b.call(r, y ? y[0] : null) : r.selectionMode === "range" && ((E = r.onChange) === null || E === void 0 || E.call(r, y));
    }
  }), [c, u] = q(!1), [d, f] = q(() => ke(o ? o[0] : n).date(1));
  ol(() => {
    var y;
    (y = r.onPageChange) === null || y === void 0 || y.call(r, d.year(), d.month() + 1);
  }, [d]), ve(t, () => ({
    jumpTo: (y) => {
      let b;
      typeof y == "function" ? b = y({
        year: d.year(),
        month: d.month() + 1
      }) : b = y, f(Vo(b));
    },
    jumpToToday: () => {
      f(ke().date(1));
    }
  }));
  const m = (y, b, E) => {
    const C = d[y](b, E);
    if (y === "subtract" && r.minPage) {
      const k = Vo(r.minPage);
      if (C.isBefore(k, E))
        return;
    }
    if (y === "add" && r.maxPage) {
      const k = Vo(r.maxPage);
      if (C.isAfter(k, E))
        return;
    }
    f(C);
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
    className: j(`${ce}-arrow-button`, `${ce}-arrow-button-right`, `${ce}-arrow-button-right-month`),
    onClick: () => {
      m("add", 1, "month");
    }
  }, r.nextMonthButton), l.createElement("a", {
    className: j(`${ce}-arrow-button`, `${ce}-arrow-button-right`, `${ce}-arrow-button-right-year`),
    onClick: () => {
      m("add", 1, "year");
    }
  }, r.nextYearButton)), v = re(() => r.max && ke(r.max), [r.max]), h = re(() => r.min && ke(r.min), [r.min]);
  function g() {
    var y;
    const b = [];
    let E = d.subtract(d.isoWeekday(), "day");
    for (r.weekStartsOn === "Monday" && (E = E.add(1, "day")); b.length < 6 * 7; ) {
      const C = E;
      let k = !1, N = !1, P = !1, O = !1, R = !1;
      if (o) {
        const [x, S] = o;
        N = C.isSame(x, "day"), P = C.isSame(S, "day"), k = N || P || C.isAfter(x, "day") && C.isBefore(S, "day"), k && (O = (b.length % 7 === 0 || C.isSame(C.startOf("month"), "day")) && !N, R = (b.length % 7 === 6 || C.isSame(C.endOf("month"), "day")) && !P);
      }
      const F = C.month() === d.month(), _ = r.shouldDisableDate ? r.shouldDisableDate(C.toDate()) : v && C.isAfter(v, "day") || h && C.isBefore(h, "day");
      b.push(l.createElement("div", {
        key: C.valueOf(),
        className: j(`${ce}-cell`, (_ || !F) && `${ce}-cell-disabled`, F && {
          [`${ce}-cell-today`]: C.isSame(n, "day"),
          [`${ce}-cell-selected`]: k,
          [`${ce}-cell-selected-begin`]: N,
          [`${ce}-cell-selected-end`]: P,
          [`${ce}-cell-selected-row-begin`]: O,
          [`${ce}-cell-selected-row-end`]: R
        }),
        onClick: () => {
          if (!r.selectionMode || _)
            return;
          const x = C.toDate();
          F || f(C.clone().date(1));
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
        className: `${ce}-cell-top`
      }, r.renderDate ? r.renderDate(C.toDate()) : C.date()), l.createElement("div", {
        className: `${ce}-cell-bottom`
      }, (y = r.renderLabel) === null || y === void 0 ? void 0 : y.call(r, C.toDate())))), E = E.add(1, "day");
    }
    return b;
  }
  const w = l.createElement("div", {
    className: `${ce}-cells`
  }, g()), $ = l.createElement("div", {
    className: `${ce}-mark`
  }, a.map((y, b) => l.createElement("div", {
    key: b,
    className: `${ce}-mark-cell`
  }, y)));
  return B(r, l.createElement("div", {
    className: ce
  }, p, $, w));
}), wk = z8;
function Fi(e, t) {
  const n = Wt(e);
  _e(() => {
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
function Ml(e, t, n) {
  const r = Wt(e);
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
function Se(e, t, n) {
  let r = e;
  return t !== void 0 && (r = Math.max(e, t)), n !== void 0 && (r = Math.min(r, n)), r;
}
const P1 = (e, t) => {
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
    const c = o.children.item(t).children.item(0), u = c.offsetLeft, d = c.offsetWidth, f = o.offsetWidth, m = o.scrollWidth, p = o.scrollLeft;
    if (m - f <= 0)
      return;
    const h = Se(u - (f - d) / 2, 0, m - f);
    r.start({
      scrollLeft: h,
      from: {
        scrollLeft: p
      },
      immediate: a && !n.isAnimating
    });
  }
  return _e(() => {
    i(!0);
  }, []), Oi(() => {
    i();
  }, [t]), Ml(() => {
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
const Zi = "adm-scroll-mask", q8 = (e) => {
  const t = D(null), [{
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
  return G(() => {
    a(!0);
  }, []), G(() => {
    const o = e.scrollTrackRef.current;
    if (!!o)
      return o.addEventListener("scroll", a), () => o.removeEventListener("scroll", a);
  }, []), l.createElement(l.Fragment, null, l.createElement(ue.div, {
    ref: t,
    className: j(Zi, `${Zi}-left`),
    style: {
      opacity: n
    }
  }), l.createElement(ue.div, {
    className: j(Zi, `${Zi}-right`),
    style: {
      opacity: r
    }
  }));
}, N1 = q8;
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
var Il = Symbol.for("react.element"), Ll = Symbol.for("react.portal"), to = Symbol.for("react.fragment"), no = Symbol.for("react.strict_mode"), ro = Symbol.for("react.profiler"), io = Symbol.for("react.provider"), ao = Symbol.for("react.context"), K8 = Symbol.for("react.server_context"), oo = Symbol.for("react.forward_ref"), so = Symbol.for("react.suspense"), lo = Symbol.for("react.suspense_list"), co = Symbol.for("react.memo"), uo = Symbol.for("react.lazy"), G8 = Symbol.for("react.offscreen"), A1;
A1 = Symbol.for("react.module.reference");
function lt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Il:
        switch (e = e.type, e) {
          case to:
          case ro:
          case no:
          case so:
          case lo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case K8:
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
      case Ll:
        return t;
    }
  }
}
ae.ContextConsumer = ao;
ae.ContextProvider = io;
ae.Element = Il;
ae.ForwardRef = oo;
ae.Fragment = to;
ae.Lazy = uo;
ae.Memo = co;
ae.Portal = Ll;
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
  return lt(e) === ao;
};
ae.isContextProvider = function(e) {
  return lt(e) === io;
};
ae.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Il;
};
ae.isForwardRef = function(e) {
  return lt(e) === oo;
};
ae.isFragment = function(e) {
  return lt(e) === to;
};
ae.isLazy = function(e) {
  return lt(e) === uo;
};
ae.isMemo = function(e) {
  return lt(e) === co;
};
ae.isPortal = function(e) {
  return lt(e) === Ll;
};
ae.isProfiler = function(e) {
  return lt(e) === ro;
};
ae.isStrictMode = function(e) {
  return lt(e) === no;
};
ae.isSuspense = function(e) {
  return lt(e) === so;
};
ae.isSuspenseList = function(e) {
  return lt(e) === lo;
};
ae.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === to || e === ro || e === no || e === so || e === lo || e === G8 || typeof e == "object" && e !== null && (e.$$typeof === uo || e.$$typeof === co || e.$$typeof === io || e.$$typeof === ao || e.$$typeof === oo || e.$$typeof === A1 || e.getModuleId !== void 0);
};
ae.typeOf = lt;
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
const Ht = "adm-capsule-tabs", Y8 = () => null, X8 = (e) => {
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
  } = P1(n, i[s]);
  return Fi(() => {
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
    className: j(`${Ht}-tab`, {
      [`${Ht}-tab-active`]: f.key === s,
      [`${Ht}-tab-disabled`]: f.props.disabled
    })
  }, f.props.title)))))), o.map((f) => {
    if (f.props.children === void 0)
      return null;
    const m = f.key === s;
    return l.createElement(br, {
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
}, Ek = ie(X8, {
  Tab: Y8
});
const Hi = "adm-card", Q8 = (e) => {
  const t = () => e.title || e.extra ? l.createElement("div", {
    className: j(`${Hi}-header`, e.headerClassName),
    style: e.headerStyle,
    onClick: e.onHeaderClick
  }, l.createElement("div", {
    className: `${Hi}-header-title`
  }, e.title), e.extra) : null, n = () => e.children ? l.createElement("div", {
    className: j(`${Hi}-body`, e.bodyClassName),
    style: e.bodyStyle,
    onClick: e.onBodyClick
  }, e.children) : null;
  return B(e, l.createElement("div", {
    className: Hi,
    onClick: e.onClick
  }, t(), n()));
}, Ck = Q8;
function qu(e, t, n) {
  return e * t * n / (t + n * e);
}
function xa(e, t, n, r, i = 0.15) {
  return i === 0 ? Se(e, t, n) : e < t ? -qu(t - e, r, i) + t : e > n ? +qu(e - n, r, i) + n : e;
}
const fo = !1;
function Ie(e, t) {
  fo && console.warn(`[antd-mobile: ${e}] ${t}`);
}
function J8(e, t) {
  fo && console.error(`[antd-mobile: ${e}] ${t}`);
}
function T1(e) {
  if (e == null || e === "")
    return 0;
  const t = e.trim();
  return t.endsWith("px") ? parseFloat(t) : t.endsWith("rem") ? parseFloat(t) * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : t.endsWith("vw") ? parseFloat(t) * window.innerWidth / 100 : 0;
}
const Nr = "adm-picker-view", R1 = Ve((e) => {
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
  }, o] = Ne(() => ({
    from: {
      y: 0
    },
    config: {
      tension: 400,
      mass: 0.8
    }
  })), s = D(!1), c = D(null), u = D(null), d = D(34);
  _e(() => {
    const h = u.current;
    !h || (d.current = T1(window.getComputedStyle(h).getPropertyValue("height")));
  }), _e(() => {
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
  }, [t, n]), _e(() => {
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
      const $ = h.offset[1] + h.velocity[1] * h.direction[1] * 50, y = g < w ? -Math.round(Se($, g, w) / d.current) : 0;
      f(y);
    } else {
      const $ = h.offset[1];
      o.start({
        y: xa($, g, w, d.current * 50, 0.2)
      });
    }
  };
  Nt((h) => {
    h.event.stopPropagation(), m(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    filterTaps: !0,
    pointer: {
      touch: !0
    },
    target: c
  }), l8((h) => {
    h.event.stopPropagation(), m(h);
  }, {
    axis: "y",
    from: () => [0, a.get()],
    preventDefault: !0,
    target: e.mouseWheel ? c : void 0,
    eventOptions: wi ? {
      passive: !1
    } : !1
  });
  let p = null;
  function v() {
    if (p === null)
      return null;
    const h = n[p], g = p - 1, w = p + 1, $ = n[g], y = n[w];
    return l.createElement("div", {
      className: "adm-picker-view-column-accessible"
    }, l.createElement("div", {
      className: "adm-picker-view-column-accessible-current",
      role: "button",
      "aria-label": h ? `\u5F53\u524D\u9009\u62E9\u7684\u662F\uFF1A${h.label}` : "\u5F53\u524D\u672A\u9009\u62E9"
    }, "-"), l.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        !$ || f(g);
      },
      role: $ ? "button" : "text",
      "aria-label": $ ? `\u9009\u62E9\u4E0A\u4E00\u9879\uFF1A${$.label}` : "\u6CA1\u6709\u4E0A\u4E00\u9879"
    }, "-"), l.createElement("div", {
      className: "adm-picker-view-column-accessible-button",
      onClick: () => {
        !y || f(w);
      },
      role: y ? "button" : "text",
      "aria-label": y ? `\u9009\u62E9\u4E0B\u4E00\u9879\uFF1A${y.label}` : "\u6CA1\u6709\u4E0B\u4E00\u9879"
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
    const $ = e.value === h.value;
    $ && (p = g);
    function y() {
      s.current = !1, f(g);
    }
    return l.createElement("div", {
      key: (w = h.key) !== null && w !== void 0 ? w : h.value,
      "data-selected": h.value === t,
      className: `${Nr}-column-item`,
      onClick: y,
      "aria-hidden": !$,
      "aria-label": $ ? "active" : ""
    }, l.createElement("div", {
      className: `${Nr}-column-item-label`
    }, r(h)));
  })), v());
}, (e, t) => !(e.index !== t.index || e.value !== t.value || e.onSelect !== t.onSelect || e.renderLabel !== t.renderLabel || e.mouseWheel !== t.mouseWheel || !U5(e.column, t.column)));
R1.displayName = "Wheel";
function Ku(e) {
  let t = null;
  return () => (t === null && (t = e()), t);
}
function M1(e, t) {
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
function I1(e, t) {
  return re(() => M1(e, t), [e, t]);
}
const L1 = (e) => e.label;
var D1 = { exports: {} }, V1 = {};
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
function e9(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var t9 = typeof Object.is == "function" ? Object.is : e9, n9 = ar.useState, r9 = ar.useEffect, i9 = ar.useLayoutEffect, a9 = ar.useDebugValue;
function o9(e, t) {
  var n = t(), r = n9({ inst: { value: n, getSnapshot: t } }), i = r[0].inst, a = r[1];
  return i9(function() {
    i.value = n, i.getSnapshot = t, jo(i) && a({ inst: i });
  }, [e, n, t]), r9(function() {
    return jo(i) && a({ inst: i }), e(function() {
      jo(i) && a({ inst: i });
    });
  }, [e]), a9(n), n;
}
function jo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !t9(e, n);
  } catch {
    return !0;
  }
}
function s9(e, t) {
  return t();
}
var l9 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? s9 : o9;
V1.useSyncExternalStore = ar.useSyncExternalStore !== void 0 ? ar.useSyncExternalStore : l9;
(function(e) {
  e.exports = V1;
})(D1);
let Dl = !1;
const _s = /* @__PURE__ */ new Set();
function j1() {
  _s.forEach((e) => {
    e();
  });
}
function $k() {
  Dl = !0, j1(), st.assign({
    skipAnimation: !0
  });
}
function xk() {
  Dl = !1, j1(), st.assign({
    skipAnimation: !1
  });
}
function Gu() {
  return Dl;
}
function c9(e) {
  return _s.add(e), () => {
    _s.delete(e);
  };
}
function u9() {
  return D1.exports.useSyncExternalStore(c9, Gu, Gu);
}
const Bo = "adm-spin-loading", f9 = {
  default: "var(--adm-color-weak)",
  primary: "var(--adm-color-primary)",
  white: "var(--adm-color-white)"
}, d9 = {
  color: "default"
}, m9 = 15 * 3.14159265358979 * 2, h9 = Ve((e) => {
  var t;
  const n = U(d9, e), r = u9(), {
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
  return B(n, l.createElement(ue.div, {
    className: Bo,
    style: {
      "--color": (t = f9[n.color]) !== null && t !== void 0 ? t : n.color,
      "--percent": i
    }
  }, l.createElement("svg", {
    className: `${Bo}-svg`,
    viewBox: "0 0 32 32"
  }, l.createElement(ue.circle, {
    className: `${Bo}-fill`,
    fill: "transparent",
    strokeWidth: "2",
    strokeDasharray: m9,
    strokeDashoffset: i,
    strokeLinecap: "square",
    r: 15,
    cx: 16,
    cy: 16
  }))));
}), Vl = h9, Yn = "adm-picker-view", p9 = {
  defaultValue: [],
  renderLabel: L1,
  mouseWheel: !1,
  loadingContent: l.createElement("div", {
    className: `${Yn}-loading-content`
  }, l.createElement(Vl, null))
}, B1 = Ve((e) => {
  const t = U(p9, e), [n, r] = q(t.value === void 0 ? t.defaultValue : t.value);
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
  const i = I1(t.columns, n), a = i.columns;
  n3(() => {
    var s;
    t.value !== n && ((s = t.onChange) === null || s === void 0 || s.call(t, n, i));
  }, [n], {
    wait: 0,
    leading: !1,
    trailing: !0
  });
  const o = Ue((s, c) => {
    r((u) => {
      const d = [...u];
      return d[c] = s, d;
    });
  }, []);
  return B(t, l.createElement("div", {
    className: `${Yn}`
  }, t.loading ? t.loadingContent : l.createElement(l.Fragment, null, a.map((s, c) => l.createElement(R1, {
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
B1.displayName = "PickerView";
const jl = B1, Ut = "adm-picker", v9 = {
  defaultValue: [],
  closeOnMaskClick: !0,
  renderLabel: L1,
  destroyOnClose: !1,
  forceRender: !1
}, Bl = Ve(de((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U(v9, {
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
  ve(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (g) => {
      var w;
      const $ = M1(i.columns, g);
      (w = i.onConfirm) === null || w === void 0 || w.call(i, g, $);
    }
  })), d = I1(i.columns, c), [f, m] = q(c);
  G(() => {
    f !== c && m(c);
  }, [a]), G(() => {
    a || m(c);
  }, [c]);
  const p = Wt((g, w) => {
    var $;
    m(g), a && (($ = i.onSelect) === null || $ === void 0 || $.call(i, g, w));
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
    className: j(`${Ut}-header-button`, i.loading && `${Ut}-header-button-disabled`),
    onClick: () => {
      i.loading || (u(f, !0), o(!1));
    },
    "aria-disabled": i.loading
  }, i.confirmText)), l.createElement("div", {
    className: `${Ut}-body`
  }, l.createElement(jl, {
    loading: i.loading,
    loadingContent: i.loadingContent,
    columns: i.columns,
    renderLabel: i.renderLabel,
    value: f,
    mouseWheel: i.mouseWheel,
    onChange: p
  })))), h = l.createElement(ki, {
    style: i.popupStyle,
    className: j(`${Ut}-popup`, i.popupClassName),
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
  }, v, l.createElement(Er, {
    position: "bottom"
  }));
  return l.createElement(l.Fragment, null, h, (n = i.children) === null || n === void 0 ? void 0 : n.call(i, d.items, s));
}));
Bl.displayName = "Picker";
function g9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(Bl, Object.assign({}, e, {
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
    }, r = Si(l.createElement(n, null));
  });
}
const W1 = ie(Bl, {
  prompt: g9
});
function Z1(e) {
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
const H1 = de((e, t) => {
  const {
    options: n
  } = e, r = pi(e, ["options"]), i = Z1(n);
  return l.createElement(W1, Object.assign({}, r, {
    ref: t,
    columns: i
  }));
});
function y9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(H1, Object.assign({}, e, {
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
    }, r = Si(l.createElement(n, null));
  });
}
const _k = ie(H1, {
  prompt: y9
}), b9 = (e) => {
  const {
    options: t
  } = e, n = pi(e, ["options"]), r = Z1(t);
  return l.createElement(jl, Object.assign({}, n, {
    columns: r
  }));
}, kk = b9;
const Be = "adm-tabs", w9 = () => null, E9 = {
  activeLineMode: "auto",
  stretch: !0
}, C9 = (e) => {
  var t;
  const n = U(E9, e), r = D(null), i = D(null), a = {};
  let o = null;
  const s = [];
  sn(n.children, (b, E) => {
    if (!l.isValidElement(b))
      return;
    const C = b.key;
    if (typeof C != "string")
      return;
    E === 0 && (o = C);
    const k = s.push(b);
    a[C] = k - 1;
  });
  const [c, u] = te({
    value: n.activeKey,
    defaultValue: (t = n.defaultActiveKey) !== null && t !== void 0 ? t : o,
    onChange: (b) => {
      var E;
      b !== null && ((E = n.onChange) === null || E === void 0 || E.call(n, b));
    }
  }), [{
    x: d,
    width: f
  }, m] = Ne(() => ({
    x: 0,
    width: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    scrollLeft: p
  }, v] = Ne(() => ({
    scrollLeft: 0,
    config: {
      tension: 300,
      clamp: !0
    }
  })), [{
    leftMaskOpacity: h,
    rightMaskOpacity: g
  }, w] = Ne(() => ({
    leftMaskOpacity: 0,
    rightMaskOpacity: 0,
    config: {
      clamp: !0
    }
  }));
  function $(b = !1) {
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
    const N = E.children.item(C + 1), P = N.children.item(0), O = P.offsetLeft, R = P.offsetWidth, F = N.offsetLeft, _ = N.offsetWidth, x = E.offsetWidth, S = E.scrollWidth, I = E.scrollLeft, A = k.offsetWidth;
    let V = 0, M = 0;
    if (n.activeLineMode === "auto" ? (V = O, M = R) : n.activeLineMode === "full" ? (V = F, M = _) : V = O + (R - A) / 2, m.start({
      x: V,
      width: M,
      immediate: b
    }), S - x <= 0)
      return;
    const W = Se(O - (x - R) / 2, 0, S - x);
    v.start({
      scrollLeft: W,
      from: {
        scrollLeft: I
      },
      immediate: b
    });
  }
  _e(() => {
    $(!d.isAnimating);
  }, []), Oi(() => {
    $();
  }, [c]), Fi(() => {
    $(!d.isAnimating);
  }, r), Ml(() => {
    $(!d.isAnimating);
  }, r, {
    subtree: !0,
    childList: !0,
    characterData: !0
  });
  const {
    run: y
  } = ja((b = !1) => {
    const E = r.current;
    if (!E)
      return;
    const C = E.scrollLeft, k = C > 0, N = C + E.offsetWidth < E.scrollWidth;
    w.start({
      leftMaskOpacity: k ? 1 : 0,
      rightMaskOpacity: N ? 1 : 0,
      immediate: b
    });
  }, {
    wait: 100,
    trailing: !0,
    leading: !0
  });
  return _e(() => {
    y(!0);
  }, []), B(n, l.createElement("div", {
    className: Be
  }, l.createElement("div", {
    className: `${Be}-header`
  }, l.createElement(ue.div, {
    className: j(`${Be}-header-mask`, `${Be}-header-mask-left`),
    style: {
      opacity: h
    }
  }), l.createElement(ue.div, {
    className: j(`${Be}-header-mask`, `${Be}-header-mask-right`),
    style: {
      opacity: g
    }
  }), l.createElement(ue.div, {
    className: `${Be}-tab-list`,
    ref: r,
    scrollLeft: p,
    onScroll: y,
    role: "tablist"
  }, l.createElement(ue.div, {
    ref: i,
    className: `${Be}-tab-line`,
    style: {
      width: n.activeLineMode === "fixed" ? "var(--fixed-active-line-width, 30px)" : f,
      x: d
    }
  }), s.map((b) => B(b.props, l.createElement("div", {
    key: b.key,
    className: j(`${Be}-tab-wrapper`, {
      [`${Be}-tab-wrapper-stretch`]: n.stretch
    })
  }, l.createElement("div", {
    onClick: () => {
      const {
        key: E
      } = b;
      b.props.disabled || E != null && u(E.toString());
    },
    className: j(`${Be}-tab`, {
      [`${Be}-tab-active`]: b.key === c,
      [`${Be}-tab-disabled`]: b.props.disabled
    }),
    role: "tab",
    "aria-selected": b.key === c
  }, b.props.title)))))), s.map((b) => {
    if (b.props.children === void 0)
      return null;
    const E = b.key === c;
    return l.createElement(br, {
      key: b.key,
      active: E,
      forceRender: b.props.forceRender,
      destroyOnClose: b.props.destroyOnClose
    }, l.createElement("div", {
      className: `${Be}-content`,
      style: {
        display: E ? "block" : "none"
      }
    }, b.props.children));
  })));
}, Yu = ie(C9, {
  Tab: w9
});
const Ar = "adm-list", $9 = {
  mode: "default"
}, x9 = de((e, t) => {
  const n = U($9, e), r = D(null);
  return ve(t, () => ({
    get nativeElement() {
      return r.current;
    }
  })), B(n, l.createElement("div", {
    className: j(Ar, `${Ar}-${n.mode}`),
    ref: r
  }, n.header && l.createElement("div", {
    className: `${Ar}-header`
  }, n.header), l.createElement("div", {
    className: `${Ar}-body`
  }, l.createElement("div", {
    className: `${Ar}-body-inner`
  }, n.children))));
});
function Vt(e) {
  return e != null && e !== !1;
}
const At = "adm-list-item", _9 = (e) => {
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
  }, r === !0 ? l.createElement(uy, null) : r));
  return B(e, l.createElement(n ? "a" : "div", {
    className: j(`${At}`, n ? ["adm-plain-anchor"] : [], e.disabled && `${At}-disabled`),
    onClick: e.disabled ? void 0 : e.onClick
  }, i));
}, kt = ie(x9, {
  Item: _9
}), U1 = Js(null), k9 = "adm-check-list", S9 = {
  multiple: !1,
  defaultValue: [],
  activeIcon: l.createElement(l1, null)
}, O9 = (e) => {
  const t = U(S9, e), [n, r] = te(t);
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
  return l.createElement(U1.Provider, {
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
    className: k9
  }, t.children)));
}, Ui = "adm-check-list-item", F9 = (e) => {
  const t = ot(U1);
  if (t === null)
    return Ie("CheckList.Item", "CheckList.Item can only be used inside CheckList."), null;
  const n = t.value.includes(e.value), r = e.readOnly || t.readOnly, i = n ? t.activeIcon : null, a = t.extra ? t.extra(n) : i, o = l.createElement("div", {
    className: `${Ui}-extra`
  }, a);
  return B(e, l.createElement(kt.Item, {
    title: e.title,
    className: j(Ui, r && `${Ui}-readonly`, n && `${Ui}-active`),
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
}, Xu = ie(O9, {
  Item: F9
});
var z1 = ul, P9 = "Expected a function";
function Wl(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(P9);
  var n = function() {
    var r = arguments, i = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(i))
      return a.get(i);
    var o = e.apply(this, r);
    return n.cache = a.set(i, o) || a, o;
  };
  return n.cache = new (Wl.Cache || z1)(), n;
}
Wl.Cache = z1;
var Qu = Wl;
function q1(e) {
  const t = re(() => Qu((i) => {
    const a = [];
    let o = e;
    for (const s of i) {
      const c = o.find((u) => u.value === s);
      if (!c || (a.push(c), !c.children))
        break;
      o = c.children;
    }
    return a;
  }, (i) => JSON.stringify(i)), [e]), n = re(() => Qu((i) => i.reduce((o, s) => {
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
const Zl = [];
function N9(e, t) {
  const n = [];
  for (let r = e; r <= t; r++)
    n.push(r);
  return n;
}
const ci = "adm-skeleton", Hl = (e) => B(e, l.createElement("div", {
  className: j(ci, {
    [`${ci}-animated`]: e.animated
  })
})), A9 = (e) => B(e, l.createElement(Hl, {
  animated: e.animated,
  className: `${ci}-title`
})), T9 = {
  lineCount: 3
}, R9 = (e) => {
  const t = U(T9, e), n = N9(1, t.lineCount), r = l.createElement("div", {
    className: `${ci}-paragraph`
  }, n.map((i) => l.createElement(Hl, {
    key: i,
    animated: t.animated,
    className: `${ci}-paragraph-line`
  })));
  return B(t, r);
}, zi = ie(Hl, {
  Title: A9,
  Paragraph: R9
}), ft = "adm-cascader-view", M9 = {
  defaultValue: []
}, I9 = (e) => {
  const {
    locale: t
  } = pe(), n = U(M9, e), r = n.placeholder || t.Cascader.placeholder, [i, a] = te(Object.assign(Object.assign({}, n), {
    onChange: (m) => {
      var p;
      (p = n.onChange) === null || p === void 0 || p.call(n, m, c(m));
    }
  })), [o, s] = q(0);
  ol(() => {
    var m;
    (m = n.onTabsChange) === null || m === void 0 || m.call(n, o);
  }, [o]);
  const c = q1(n.options), u = re(() => {
    const m = [];
    let p = n.options, v = !1;
    for (const h of i) {
      const g = p.find((w) => w.value === h);
      if (m.push({
        selected: g,
        options: p
      }), !g || !g.children) {
        v = !0;
        break;
      }
      p = g.children;
    }
    return v || m.push({
      selected: void 0,
      options: p
    }), m;
  }, [i, n.options]);
  G(() => {
    s(u.length - 1);
  }, [i]), G(() => {
    const m = u.length - 1;
    o > m && s(m);
  }, [o, u]);
  const d = (m, p) => {
    const v = i.slice(0, p);
    m !== void 0 && (v[p] = m), a(v);
  }, f = (m) => n.loading || m === Zl;
  return B(n, l.createElement("div", {
    className: ft
  }, l.createElement(Yu, {
    activeKey: o.toString(),
    onChange: (m) => {
      const p = parseInt(m);
      s(p);
    },
    stretch: !1,
    className: `${ft}-tabs`
  }, u.map((m, p) => {
    const v = m.selected;
    return l.createElement(Yu.Tab, {
      key: p.toString(),
      title: l.createElement("div", {
        className: `${ft}-header-title`
      }, v ? v.label : typeof r == "function" ? r(p) : r),
      forceRender: !0
    }, l.createElement("div", {
      className: `${ft}-content`
    }, f(m.options) ? l.createElement("div", {
      className: `${ft}-skeleton`
    }, l.createElement(zi, {
      className: `${ft}-skeleton-line-1`,
      animated: !0
    }), l.createElement(zi, {
      className: `${ft}-skeleton-line-2`,
      animated: !0
    }), l.createElement(zi, {
      className: `${ft}-skeleton-line-3`,
      animated: !0
    }), l.createElement(zi, {
      className: `${ft}-skeleton-line-4`,
      animated: !0
    })) : l.createElement(Xu, {
      value: [i[p]],
      onChange: (h) => d(h[0], p),
      activeIcon: n.activeIcon
    }, m.options.map((h) => {
      const g = i[p] === h.value;
      return l.createElement(Xu.Item, {
        value: h.value,
        key: h.value,
        disabled: h.disabled,
        className: j(`${ft}-item`, {
          [`${ft}-item-active`]: g
        })
      }, h.label);
    }))));
  }))));
}, L9 = ie(I9, {
  optionSkeleton: Zl
}), Bn = "adm-cascader", D9 = {
  defaultValue: [],
  destroyOnClose: !0,
  forceRender: !1
}, K1 = de((e, t) => {
  var n;
  const {
    locale: r
  } = pe(), i = U(D9, {
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
  ve(t, () => s);
  const [c, u] = te(Object.assign(Object.assign({}, i), {
    onChange: (h) => {
      var g;
      (g = i.onConfirm) === null || g === void 0 || g.call(i, h, d(h));
    }
  })), d = q1(i.options), [f, m] = q(c);
  G(() => {
    a || m(c);
  }, [a, c]);
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
  }, l.createElement(L9, Object.assign({}, i, {
    value: f,
    onChange: (h, g) => {
      var w;
      m(h), a && ((w = i.onSelect) === null || w === void 0 || w.call(i, h, g));
    }
  }))))), v = l.createElement(ki, {
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
function V9(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(K1, Object.assign({}, e, {
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
    }, r = Si(l.createElement(n, null));
  });
}
const Sk = ie(K1, {
  prompt: V9,
  optionSkeleton: Zl
});
const j9 = Object.assign(Object.assign({}, Ol), {
  getContainer: null
}), B9 = (e) => {
  const t = U(j9, e), n = fl(), r = Ne({
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
  _e(() => {
    t.visible && a(!0);
  }, [t.visible]);
  const o = D(null);
  Ba(o, t.disableBodyScroll && i);
  const s = m1(i && t.visible), c = l.createElement("div", {
    className: j("adm-center-popup-body", t.bodyClassName),
    style: t.bodyStyle
  }, t.children), u = nn(t.stopPropagation, B(t, l.createElement("div", {
    className: "adm-center-popup",
    style: {
      display: i ? void 0 : "none",
      pointerEvents: i ? void 0 : "none"
    }
  }, t.mask && l.createElement($i, {
    visible: s,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose,
    onMaskClick: (d) => {
      var f, m;
      (f = t.onMaskClick) === null || f === void 0 || f.call(t, d), t.closeOnMaskClick && ((m = t.onClose) === null || m === void 0 || m.call(t));
    },
    style: t.maskStyle,
    className: j("adm-center-popup-mask", t.maskClassName),
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
    className: j("adm-center-popup-close", "adm-plain-anchor"),
    onClick: () => {
      var d;
      (d = t.onClose) === null || d === void 0 || d.call(t);
    }
  }, l.createElement(xi, null)), c)))));
  return l.createElement(br, {
    active: i,
    forceRender: t.forceRender,
    destroyOnClose: t.destroyOnClose
  }, yr(t.getContainer, u));
}, G1 = B9;
const Y1 = Js(null), W9 = {
  disabled: !1,
  defaultValue: []
}, Z9 = (e) => {
  const t = U(W9, e), [n, r] = te(t);
  return l.createElement(
    Y1.Provider,
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
}, X1 = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M31.5541766,15 L28.0892433,15 L28.0892434,15 C27.971052,15 27.8576674,15.044522 27.7740471,15.1239792 L18.2724722,24.1625319 L13.2248725,19.3630279 L13.2248725,19.3630279 C13.1417074,19.2834412 13.0287551,19.2384807 12.9107898,19.2380079 L9.44474455,19.2380079 L9.44474454,19.2380079 C9.19869815,19.2384085 8.99957935,19.4284738 9,19.66253 C9,19.7747587 9.04719253,19.8823283 9.13066188,19.9616418 L17.0907466,27.5338228 C17.4170809,27.8442545 17.8447695,28 18.2713393,28 L18.2980697,28 C18.7168464,27.993643 19.133396,27.8378975 19.4530492,27.5338228 L31.8693384,15.7236361 L31.8693384,15.7236361 C32.0434167,15.5582251 32.0435739,15.2898919 31.8696892,15.1242941 C31.7860402,15.0446329 31.6725052,15 31.5541421,15 L31.5541766,15 Z",
  fill: "currentColor"
})))), H9 = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 40 40"
}, l.createElement("path", {
  d: "M20,9 C26.0752953,9 31,13.9247047 31,20 C31,26.0752953 26.0752953,31 20,31 C13.9247047,31 9,26.0752953 9,20 C9,13.9247047 13.9247047,9 20,9 Z",
  fill: "currentColor"
})))), Q1 = (e) => {
  const t = D(null), n = Wt((r) => {
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
}, zt = "adm-checkbox", U9 = {
  defaultChecked: !1,
  indeterminate: !1
}, z9 = de((e, t) => {
  const n = ot(Y1), r = U(U9, e);
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
  }, o = o || n.disabled), ve(t, () => ({
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
  }, r.indeterminate ? l.createElement(H9, null) : i && l.createElement(X1, null));
  return B(r, l.createElement("label", {
    className: j(zt, {
      [`${zt}-checked`]: i && !r.indeterminate,
      [`${zt}-indeterminate`]: r.indeterminate,
      [`${zt}-disabled`]: o,
      [`${zt}-block`]: r.block
    })
  }, l.createElement(Q1, {
    type: "checkbox",
    checked: i,
    onChange: a,
    disabled: o,
    id: r.id
  }), c(), r.children && l.createElement("div", {
    className: `${zt}-content`
  }, r.children)));
}), Ju = ie(z9, {
  Group: Z9
});
const _n = "adm-collapse", q9 = () => null, K9 = (e) => {
  const {
    visible: t
  } = e, n = D(null), r = Ya(t, e.forceRender, e.destroyOnClose), [{
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
  return qv(() => {
    if (!t)
      return;
    const o = n.current;
    !o || a.start({
      height: o.offsetHeight,
      immediate: !0
    });
  }), Oi(() => {
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
    className: j(`${_n}-panel-content`, {
      [`${_n}-panel-content-active`]: t
    }),
    style: {
      height: i.to((o) => i.idle && t ? "auto" : o)
    }
  }, l.createElement("div", {
    className: `${_n}-panel-content-inner`,
    ref: n
  }, l.createElement(kt.Item, null, r && e.children)));
}, G9 = (e) => {
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
  }, l.createElement(kt, null, n.map((o) => {
    const s = o.key, c = a.includes(s);
    function u(f) {
      var m, p;
      e.accordion ? i(c ? [] : [s]) : i(c ? a.filter((v) => v !== s) : [...a, s]), (p = (m = o.props).onClick) === null || p === void 0 || p.call(m, f);
    }
    const d = () => {
      let f = l.createElement(u1, null);
      return e.arrow !== void 0 && (f = e.arrow), o.props.arrow !== void 0 && (f = o.props.arrow), typeof f == "function" ? f(c) : l.createElement("div", {
        className: j(`${_n}-arrow`, {
          [`${_n}-arrow-active`]: c
        })
      }, f);
    };
    return l.createElement(l.Fragment, {
      key: s
    }, B(o.props, l.createElement(kt.Item, {
      className: `${_n}-panel-header`,
      onClick: u,
      disabled: o.props.disabled,
      arrow: d()
    }, o.props.title)), l.createElement(K9, {
      visible: c,
      forceRender: !!o.props.forceRender,
      destroyOnClose: !!o.props.destroyOnClose
    }, o.props.children));
  }))));
}, Ok = ie(G9, {
  Panel: q9
});
var J1 = { exports: {} };
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
})(J1);
const e0 = J1.exports;
var t0 = { exports: {} };
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
})(t0);
const n0 = t0.exports, ui = "TILL_NOW";
ke.extend(Rl);
ke.extend(e0);
ke.extend(n0);
const qt = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function Y9(e, t, n, r, i, a, o) {
  const s = [], c = t.getFullYear(), u = t.getMonth() + 1, d = t.getDate(), f = t.getHours(), m = t.getMinutes(), p = t.getSeconds(), v = n.getFullYear(), h = n.getMonth() + 1, g = n.getDate(), w = n.getHours(), $ = n.getMinutes(), y = n.getSeconds(), b = qt[r], E = parseInt(e[0]), C = ke(ks([e[0], e[1], "1"])), k = parseInt(e[1]), N = parseInt(e[2]), P = parseInt(e[3]), O = parseInt(e[4]), R = E === c, F = E === v, _ = R && k === u, x = F && k === h, S = _ && N === d, I = x && N === g, A = S && P === f, V = I && P === w, M = A && O === m, T = V && O === $, W = (H, z, Y) => {
    let K = [];
    for (let me = H; me <= z; me++)
      K.push(me);
    const ge = e.slice(0, qt[Y]), Ee = a == null ? void 0 : a[Y];
    return Ee && typeof Ee == "function" && (K = K.filter((me) => Ee(me, {
      get date() {
        const ye = [...ge, me.toString()];
        return ks(ye);
      }
    }))), K;
  };
  if (b >= qt.year) {
    const Y = W(c, v, "year");
    s.push(Y.map((K) => ({
      label: i("year", K),
      value: K.toString()
    })));
  }
  if (b >= qt.month) {
    const Y = W(R ? u : 1, F ? h : 12, "month");
    s.push(Y.map((K) => ({
      label: i("month", K),
      value: K.toString()
    })));
  }
  if (b >= qt.day) {
    const H = _ ? d : 1, z = x ? g : C.daysInMonth(), Y = W(H, z, "day");
    s.push(Y.map((K) => ({
      label: i("day", K),
      value: K.toString()
    })));
  }
  if (b >= qt.hour) {
    const Y = W(S ? f : 0, I ? w : 23, "hour");
    s.push(Y.map((K) => ({
      label: i("hour", K),
      value: K.toString()
    })));
  }
  if (b >= qt.minute) {
    const Y = W(A ? m : 0, V ? $ : 59, "minute");
    s.push(Y.map((K) => ({
      label: i("minute", K),
      value: K.toString()
    })));
  }
  if (b >= qt.second) {
    const Y = W(M ? p : 0, T ? y : 59, "second");
    s.push(Y.map((K) => ({
      label: i("second", K),
      value: K.toString()
    })));
  }
  if (o && (s[0].push({
    label: i("now", null),
    value: ui
  }), ui === (e == null ? void 0 : e[0])))
    for (let H = 1; H < s.length; H += 1)
      s[H] = [];
  return s;
}
function X9(e) {
  return e ? [e.getFullYear().toString(), (e.getMonth() + 1).toString(), e.getDate().toString(), e.getHours().toString(), e.getMinutes().toString(), e.getSeconds().toString()] : [];
}
function ks(e) {
  var t, n, r, i, a, o;
  const s = (t = e[0]) !== null && t !== void 0 ? t : "1900", c = (n = e[1]) !== null && n !== void 0 ? n : "1", u = (r = e[2]) !== null && r !== void 0 ? r : "1", d = (i = e[3]) !== null && i !== void 0 ? i : "0", f = (a = e[4]) !== null && a !== void 0 ? a : "0", m = (o = e[5]) !== null && o !== void 0 ? o : "0";
  return new Date(parseInt(s), parseInt(c) - 1, parseInt(u), parseInt(d), parseInt(f), parseInt(m));
}
ke.extend(Rl);
ke.extend(e0);
ke.extend(n0);
const Tr = {
  year: 0,
  week: 1,
  "week-day": 2
};
function Q9(e, t, n, r, i, a) {
  const o = [], s = t.getFullYear(), c = n.getFullYear(), u = Tr[r], d = parseInt(e[0]), f = d === s, m = d === c, p = ke(t), v = ke(n), h = p.isoWeek(), g = v.isoWeek(), w = p.isoWeekday(), $ = v.isoWeekday(), y = parseInt(e[1]), b = f && y === h, E = m && y === g, C = ke(`${d}-01-01`).isoWeeksInYear(), k = (N, P, O) => {
    let R = [];
    for (let x = N; x <= P; x++)
      R.push(x);
    const F = e.slice(0, Tr[O]), _ = a == null ? void 0 : a[O];
    return _ && typeof _ == "function" && (R = R.filter((x) => _(x, {
      get date() {
        const S = [...F, x.toString()];
        return r0(S);
      }
    }))), R;
  };
  if (u >= Tr.year) {
    const O = k(s, c, "year");
    o.push(O.map((R) => ({
      label: i("year", R),
      value: R.toString()
    })));
  }
  if (u >= Tr.week) {
    const O = k(f ? h : 1, m ? g : C, "week");
    o.push(O.map((R) => ({
      label: i("week", R),
      value: R.toString()
    })));
  }
  if (u >= Tr["week-day"]) {
    const O = k(b ? w : 1, E ? $ : 7, "week-day");
    o.push(O.map((R) => ({
      label: i("week-day", R),
      value: R.toString()
    })));
  }
  return o;
}
function J9(e) {
  if (!e)
    return [];
  const t = ke(e);
  return [t.isoWeekYear().toString(), t.isoWeek().toString(), t.isoWeekday().toString()];
}
function r0(e) {
  var t, n, r;
  const i = (t = e[0]) !== null && t !== void 0 ? t : "1900", a = (n = e[1]) !== null && n !== void 0 ? n : "1", o = (r = e[2]) !== null && r !== void 0 ? r : "1";
  return ke().year(parseInt(i)).isoWeek(parseInt(a)).isoWeekday(parseInt(o)).hour(0).minute(0).second(0).toDate();
}
const eb = {
  year: 1,
  month: 2,
  day: 3,
  hour: 4,
  minute: 5,
  second: 6
}, i0 = (e, t) => {
  if (t.includes("week"))
    return J9(e);
  {
    const n = t;
    return X9(e).slice(0, eb[n]);
  }
}, Ss = (e, t) => {
  if ((e == null ? void 0 : e[0]) === ui) {
    const n = new Date();
    return n.tillNow = !0, n;
  }
  return t.includes("week") ? r0(e) : ks(e);
}, a0 = (e, t, n, r, i, a, o) => r.startsWith("week") ? Q9(e, t, n, r, i, a) : Y9(e, t, n, r, i, a, o);
function o0(e) {
  const {
    locale: t
  } = pe();
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
const ef = new Date().getFullYear(), tb = {
  min: new Date(new Date().setFullYear(ef - 10)),
  max: new Date(new Date().setFullYear(ef + 10)),
  precision: "day",
  defaultValue: null
}, s0 = de((e, t) => {
  const n = U(tb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: n.defaultValue,
    onChange: (m) => {
      var p;
      m !== null && ((p = n.onConfirm) === null || p === void 0 || p.call(n, m));
    }
  }), o = re(() => new Date(), []), s = o0(r), c = re(() => {
    let m = i != null ? i : o;
    return m.tillNow ? [ui] : (m = new Date(Se(m.getTime(), n.min.getTime(), n.max.getTime())), i0(m, n.precision));
  }, [i, n.precision, n.min, n.max]), u = Ue((m) => {
    const p = Ss(m, n.precision);
    a(p, !0);
  }, [a, n.precision]), d = Wt((m) => {
    var p;
    const v = Ss(m, n.precision);
    (p = n.onSelect) === null || p === void 0 || p.call(n, v);
  }), f = Ue((m) => a0(m, n.min, n.max, n.precision, s, n.filter, n.tillNow), [n.min, n.max, n.precision, s, n.tillNow]);
  return B(n, l.createElement(W1, {
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
function nb(e) {
  return new Promise((t) => {
    const n = () => {
      const [i, a] = q(!1);
      return G(() => {
        a(!0);
      }, []), l.createElement(s0, Object.assign({}, e, {
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
    }, r = Si(l.createElement(n, null));
  });
}
const Fk = ie(s0, {
  prompt: nb,
  DATE_NOW: ui
}), tf = new Date().getFullYear(), rb = {
  min: new Date(new Date().setFullYear(tf - 10)),
  max: new Date(new Date().setFullYear(tf + 10)),
  precision: "day"
}, ib = (e) => {
  var t;
  const n = U(rb, e), {
    renderLabel: r
  } = n, [i, a] = te({
    value: n.value,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : null
  }), o = o0(r), s = re(() => i0(i, n.precision), [i, n.precision]), c = Ue((u) => {
    var d;
    const f = Ss(u, n.precision);
    f && (a(f), (d = n.onChange) === null || d === void 0 || d.call(n, f));
  }, [n.onChange, n.precision]);
  return B(n, l.createElement(jl, {
    columns: (u) => a0(u, n.min, n.max, n.precision, o, n.filter),
    loading: n.loading,
    loadingContent: n.loadingContent,
    value: s,
    mouseWheel: n.mouseWheel,
    onChange: c
  }));
}, Pk = ib;
const ab = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(rn, {
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
}, ob = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, l0 = (e) => {
  const t = U(ob, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
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
    className: j(wt("content"), !t.content && wt("content-empty"))
  }, typeof t.content == "string" ? l.createElement(li, null, t.content) : t.content), l.createElement("div", {
    className: wt("footer")
  }, t.actions.map((r, i) => {
    const a = Array.isArray(r) ? r : [r];
    return l.createElement("div", {
      className: wt("action-row"),
      key: i
    }, a.map((o, s) => l.createElement(ab, {
      key: o.key,
      action: o,
      onAction: () => $e(void 0, void 0, void 0, function* () {
        var c, u, d;
        yield Promise.all([(c = o.onClick) === null || c === void 0 ? void 0 : c.call(o), (u = t.onAction) === null || u === void 0 ? void 0 : u.call(t, o, s)]), t.closeOnAction && ((d = t.onClose) === null || d === void 0 || d.call(t));
      })
    })));
  })));
  return l.createElement(G1, {
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
const Os = /* @__PURE__ */ new Set();
function Ul(e) {
  const t = Cr(l.createElement(l0, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Os.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Os.add(t.close), t;
}
function sb(e) {
  const t = {
    confirmText: vi().locale.Dialog.ok
  }, n = U(t, e);
  return new Promise((r) => {
    Ul(Object.assign(Object.assign({}, n), {
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
const lb = {
  confirmText: "\u786E\u8BA4",
  cancelText: "\u53D6\u6D88"
};
function cb(e) {
  const {
    locale: t
  } = vi(), n = U(lb, {
    confirmText: t.common.confirm,
    cancelText: t.common.cancel
  }, e);
  return new Promise((r) => {
    Ul(Object.assign(Object.assign({}, n), {
      closeOnAction: !0,
      onClose: () => {
        var i;
        (i = n.onClose) === null || i === void 0 || i.call(n), r(!1);
      },
      actions: [[{
        key: "cancel",
        text: n.cancelText,
        onClick: () => $e(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onCancel) === null || i === void 0 ? void 0 : i.call(n), r(!1);
        })
      }, {
        key: "confirm",
        text: n.confirmText,
        bold: !0,
        onClick: () => $e(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }]]
    }));
  });
}
function ub() {
  Os.forEach((e) => {
    e();
  });
}
const Nk = ie(l0, {
  show: Ul,
  alert: sb,
  confirm: cb,
  clear: ub
});
const qi = "adm-divider", fb = {
  contentPosition: "center",
  direction: "horizontal"
}, db = (e) => {
  const t = U(fb, e);
  return B(t, l.createElement("div", {
    className: j(qi, `${qi}-${t.direction}`, `${qi}-${t.contentPosition}`)
  }, t.children && l.createElement("div", {
    className: `${qi}-content`
  }, t.children)));
}, nf = db;
const Dt = "adm-dropdown-item", mb = (e) => {
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
  }, e.arrow === void 0 ? l.createElement(oy, null) : e.arrow))));
}, hb = mb, pb = (e) => {
  const {
    active: t = !1
  } = e, n = Ya(t, e.forceRender, e.destroyOnClose), r = j(`${Dt}-content`, {
    [`${Dt}-content-hidden`]: !t
  });
  return n ? l.createElement("div", {
    className: r,
    onClick: e.onClick
  }, e.children) : null;
}, Wn = "adm-dropdown", vb = {
  defaultActiveKey: null,
  closeOnMaskClick: !0,
  closeOnClickAway: !1,
  getContainer: Ol.getContainer
}, gb = de((e, t) => {
  const n = U(vb, e), [r, i] = te({
    value: n.activeKey,
    defaultValue: n.defaultActiveKey,
    onChange: n.onChange
  }), a = D(null), o = D(null);
  vd(() => {
    !n.closeOnClickAway || i(null);
  }, [a, o]);
  const [s, c] = q(), u = D(null);
  G(() => {
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
  return ve(t, () => ({
    close: () => {
      i(null);
    }
  }), [i]), B(n, l.createElement("div", {
    className: j(Wn, {
      [`${Wn}-open`]: !!r
    }),
    ref: u
  }, l.createElement("div", {
    className: `${Wn}-nav`,
    ref: a
  }, p), l.createElement(ki, {
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
    return l.createElement(pb, {
      key: v.key,
      active: h,
      forceRender: v.props.forceRender,
      destroyOnClose: v.props.destroyOnClose
    }, v.props.children);
  })))));
}), yb = gb, Ak = ie(yb, {
  Item: hb
});
var rf;
(function(e) {
  e[e.HIGH_SURROGATE_START = 55296] = "HIGH_SURROGATE_START", e[e.HIGH_SURROGATE_END = 56319] = "HIGH_SURROGATE_END", e[e.LOW_SURROGATE_START = 56320] = "LOW_SURROGATE_START", e[e.REGIONAL_INDICATOR_START = 127462] = "REGIONAL_INDICATOR_START", e[e.REGIONAL_INDICATOR_END = 127487] = "REGIONAL_INDICATOR_END", e[e.FITZPATRICK_MODIFIER_START = 127995] = "FITZPATRICK_MODIFIER_START", e[e.FITZPATRICK_MODIFIER_END = 127999] = "FITZPATRICK_MODIFIER_END", e[e.VARIATION_MODIFIER_START = 65024] = "VARIATION_MODIFIER_START", e[e.VARIATION_MODIFIER_END = 65039] = "VARIATION_MODIFIER_END", e[e.DIACRITICAL_MARKS_START = 8400] = "DIACRITICAL_MARKS_START", e[e.DIACRITICAL_MARKS_END = 8447] = "DIACRITICAL_MARKS_END", e[e.SUBDIVISION_INDICATOR_START = 127988] = "SUBDIVISION_INDICATOR_START", e[e.TAGS_START = 917504] = "TAGS_START", e[e.TAGS_END = 917631] = "TAGS_END", e[e.ZWJ = 8205] = "ZWJ";
})(rf || (rf = {}));
const bb = Object.freeze([776, 2359, 2367, 2984, 3007, 3021, 3633, 3635, 3648, 3657, 4352, 4449, 4520]);
var af;
function ia(e) {
  if (typeof e != "string")
    throw new TypeError("string cannot be undefined or null");
  const t = [];
  let n = 0, r = 0;
  for (; n < e.length; )
    r += wb(n + r, e), Sb(e[n + r]) && r++, xb(e[n + r]) && r++, _b(e[n + r]) && r++, Ob(e[n + r]) ? r++ : (t.push(e.substring(n, n + r)), n += r, r = 0);
  return t;
}
function wb(e, t) {
  const n = t[e];
  if (!Eb(n) || e === t.length - 1)
    return 1;
  const r = n + t[e + 1];
  let i = t.substring(e + 2, e + 5);
  return of(r) && of(i) ? 4 : Cb(r) && kb(i) ? t.slice(e).indexOf(String.fromCodePoint(917631)) + 2 : $b(i) ? 4 : 2;
}
function Eb(e) {
  return e && Mn(e[0].charCodeAt(0), 55296, 56319);
}
function of(e) {
  return Mn(zl(e), 127462, 127487);
}
function Cb(e) {
  return Mn(zl(e), 127988, 127988);
}
function $b(e) {
  return Mn(zl(e), 127995, 127999);
}
function xb(e) {
  return typeof e == "string" && Mn(e.charCodeAt(0), 65024, 65039);
}
function _b(e) {
  return typeof e == "string" && Mn(e.charCodeAt(0), 8400, 8447);
}
function kb(e) {
  const t = e.codePointAt(0);
  return typeof e == "string" && typeof t == "number" && Mn(t, 917504, 917631);
}
function Sb(e) {
  return typeof e == "string" && bb.includes(e.charCodeAt(0));
}
function Ob(e) {
  return typeof e == "string" && e.charCodeAt(0) === 8205;
}
function zl(e) {
  return (e.charCodeAt(0) - 55296 << 10) + (e.charCodeAt(1) - 56320) + 65536;
}
function Mn(e, t, n) {
  return e >= t && e <= n;
}
(function(e) {
  e[e.unit_1 = 1] = "unit_1", e[e.unit_2 = 2] = "unit_2", e[e.unit_4 = 4] = "unit_4";
})(af || (af = {}));
const Fb = "adm-ellipsis", Pb = {
  direction: "end",
  rows: 1,
  expandText: "",
  content: "",
  collapseText: "",
  stopPropagationForActionButtons: [],
  onContentClick: () => {
  },
  defaultExpanded: !1
}, Nb = (e) => {
  const t = U(Pb, e), n = D(null), r = D(null), i = D(null), [a, o] = q({}), [s, c] = q(t.defaultExpanded), [u, d] = q(!1), f = re(() => ia(t.content), [t.content]);
  function m(w, $) {
    return f.slice(w, $).join("");
  }
  function p() {
    var w, $;
    const y = n.current;
    if (!y)
      return;
    const b = y.style.display;
    y.style.display = "block";
    const E = window.getComputedStyle(y), C = document.createElement("div");
    Array.prototype.slice.apply(E).forEach((O) => {
      C.style.setProperty(O, E.getPropertyValue(O));
    }), y.style.display = b, C.style.height = "auto", C.style.minHeight = "auto", C.style.maxHeight = "auto", C.style.textOverflow = "clip", C.style.whiteSpace = "normal", C.style.webkitLineClamp = "unset", C.style.display = "block";
    const N = Wo(E.lineHeight), P = Math.floor(N * (t.rows + 0.5) + Wo(E.paddingTop) + Wo(E.paddingBottom));
    if (C.innerText = t.content, document.body.appendChild(C), C.offsetHeight <= P)
      d(!1);
    else {
      let x = function(V, M) {
        if (M - V <= 1)
          return t.direction === "end" ? {
            leading: m(0, V) + "..."
          } : {
            tailing: "..." + m(M, O)
          };
        const T = Math.round((V + M) / 2);
        return t.direction === "end" ? C.innerHTML = m(0, T) + "..." + _ : C.innerHTML = _ + "..." + m(T, O), C.offsetHeight <= P ? t.direction === "end" ? x(T, M) : x(V, T) : t.direction === "end" ? x(V, T) : x(T, M);
      }, S = function(V, M) {
        if (V[1] - V[0] <= 1 && M[1] - M[0] <= 1)
          return {
            leading: m(0, V[0]) + "...",
            tailing: "..." + m(M[1], O)
          };
        const T = Math.floor((V[0] + V[1]) / 2), W = Math.ceil((M[0] + M[1]) / 2);
        return C.innerHTML = m(0, T) + "..." + _ + "..." + m(W, O), C.offsetHeight <= P ? S([T, V[1]], [M[0], W]) : S([V[0], T], [W, M[1]]);
      };
      d(!0);
      const O = t.content.length, R = typeof t.collapseText == "string" ? t.collapseText : (w = i.current) === null || w === void 0 ? void 0 : w.innerHTML, F = typeof t.expandText == "string" ? t.expandText : ($ = r.current) === null || $ === void 0 ? void 0 : $.innerHTML, _ = s ? R : F, I = Math.floor((0 + O) / 2), A = t.direction === "middle" ? S([0, I], [I, O]) : x(0, O);
      o(A);
    }
    document.body.removeChild(C);
  }
  Fi(p, n), _e(() => {
    p();
  }, [t.content, t.direction, t.rows, t.expandText, t.collapseText]);
  const v = u && t.expandText ? nn(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: r,
    onClick: () => {
      c(!0);
    }
  }, t.expandText)) : null, h = u && t.collapseText ? nn(t.stopPropagationForActionButtons, l.createElement("a", {
    ref: i,
    onClick: () => {
      c(!1);
    }
  }, t.collapseText)) : null, g = () => u ? s ? l.createElement(l.Fragment, null, t.content, h) : l.createElement(l.Fragment, null, a.leading, v, a.tailing) : t.content;
  return B(t, l.createElement("div", {
    ref: n,
    className: Fb,
    onClick: (w) => {
      w.target === w.currentTarget && t.onContentClick(w);
    }
  }, g()));
};
function Wo(e) {
  if (!e)
    return 0;
  const t = e.match(/^\d*(\.\d*)?/);
  return t ? Number(t[0]) : 0;
}
const Tk = Nb;
const Ab = (e) => B(e, l.createElement("svg", {
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
}))))), Rr = "adm-empty", Tb = (e) => {
  function t() {
    const {
      image: n
    } = e;
    return n === void 0 ? l.createElement(Ab, {
      className: `${Rr}-image`,
      style: e.imageStyle
    }) : typeof n == "string" ? l.createElement("img", {
      className: `${Rr}-image`,
      style: e.imageStyle,
      src: n,
      alt: "empty"
    }) : n;
  }
  return B(e, l.createElement("div", {
    className: Rr
  }, l.createElement("div", {
    className: `${Rr}-image-container`
  }, t()), e.description && l.createElement("div", {
    className: j(`${Rr}-description`)
  }, e.description)));
}, Rk = Tb;
const un = "adm-error-block", Rb = {
  status: "default"
};
function Mb(e) {
  return (n) => {
    var r;
    const i = U(Rb, n), {
      locale: a
    } = pe(), o = a.ErrorBlock[i.status], s = "description" in i ? i.description : o.description, c = "title" in i ? i.title : o.title, u = (r = i.image) !== null && r !== void 0 ? r : e[i.status], d = typeof u == "string" ? l.createElement("img", {
      src: u,
      alt: "error block image"
    }) : u;
    return B(i, l.createElement("div", {
      className: j(un, {
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
const Ib = l.createElement("svg", {
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
}))), Lb = l.createElement("svg", {
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
})))), Db = l.createElement("svg", {
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
})))), Vb = l.createElement("svg", {
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
})))), jb = {
  default: Ib,
  disconnected: Lb,
  empty: Db,
  busy: Vb
}, Bb = Mb(jb), Mk = Bb;
const Ki = "adm-floating-bubble", Wb = {
  axis: "y",
  defaultOffset: {
    x: 0,
    y: 0
  }
}, Zb = (e) => {
  const t = U(Wb, e), n = D(null), r = D(null), [i, a] = q(t.offset === void 0 ? t.defaultOffset : t.offset);
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
  }, u] = Ne(() => ({
    x: i.x,
    y: i.y,
    opacity: 1
  })), d = Nt((f) => {
    var m;
    let p = f.offset[0], v = f.offset[1];
    if (f.last && t.magnetic) {
      const g = n.current, w = r.current;
      if (!g || !w)
        return;
      const $ = g.getBoundingClientRect(), y = w.getBoundingClientRect();
      if (t.magnetic === "x") {
        const b = o.goal - o.get(), E = y.left + b - $.left, C = $.right - (y.right + b);
        C <= E ? p += C : p -= E;
      } else if (t.magnetic === "y") {
        const b = s.goal - s.get(), E = y.top + b - $.top, C = $.bottom - (y.bottom + b);
        C <= E ? v += C : v -= E;
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
      transform: D7([o, s], (f, m) => `translate(${f}px, ${m}px)`)
    },
    onClick: t.onClick,
    className: `${Ki}-button`,
    ref: r
  }), t.children)));
}, Ik = Zb;
function ql(e, t) {
  return e.reduce((n, r) => Math.abs(n - t) < Math.abs(r - t) ? n : r);
}
const Hb = {
  handleDraggingOfContent: !0
}, Ub = de((e, t) => {
  var n, r;
  const i = U(Hb, e), {
    anchors: a
  } = i, o = (n = a[a.length - 1]) !== null && n !== void 0 ? n : window.innerHeight, s = a.map(($) => -$), c = D(null), u = D(null), d = D(null), [f, m] = q(!1), p = D(!1), v = {
    top: s[s.length - 1],
    bottom: s[0]
  }, h = Wt((r = i.onHeightChange) !== null && r !== void 0 ? r : () => {
  }), [{
    y: g
  }, w] = Ne(() => ({
    y: v.bottom,
    config: {
      tension: 300
    },
    onChange: ($) => {
      h(-$.value.y, g.isAnimating);
    }
  }));
  return Nt(($) => {
    const [, y] = $.offset;
    if ($.first) {
      const C = $.event.target, k = u.current;
      if (k === C || (k == null ? void 0 : k.contains(C)))
        p.current = !0;
      else {
        if (!i.handleDraggingOfContent)
          return;
        const N = g.goal <= v.top, P = d.current;
        if (!P)
          return;
        N ? P.scrollTop <= 0 && $.direction[1] > 0 && (p.current = !0) : p.current = !0;
      }
    }
    if (m(p.current), !p.current)
      return;
    const {
      event: b
    } = $;
    b.cancelable && b.preventDefault(), b.stopPropagation();
    let E = y;
    $.last && (p.current = !1, m(!1), E = ql(s, y)), w.start({
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
    eventOptions: wi ? {
      passive: !1
    } : !1
  }), ve(t, () => ({
    setHeight: ($, y) => {
      w.start({
        y: -$,
        immediate: y == null ? void 0 : y.immediate
      });
    }
  }), [w]), Ba(c, !0), B(i, l.createElement(ue.div, {
    ref: c,
    className: "adm-floating-panel",
    style: {
      height: Math.round(o),
      translateY: g.to(($) => `calc(100% + (${Math.round($)}px))`)
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
}), Lk = Ub;
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
function zb(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Kl(e, t) {
  if (e == null)
    return {};
  var n = zb(e, t), r, i;
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
function qb(e, t) {
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
function c0(e) {
  var t = qb(e, "string");
  return Qe(t) === "symbol" ? t : String(t);
}
function De(e, t, n) {
  return t = c0(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function sf(e, t) {
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
    t % 2 ? sf(Object(n), !0).forEach(function(r) {
      De(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : sf(Object(n)).forEach(function(r) {
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
function Kb(e) {
  if (Array.isArray(e))
    return Fs(e);
}
function u0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Gl(e, t) {
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
function Gb() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ne(e) {
  return Kb(e) || u0(e) || Gl(e) || Gb();
}
function Pi(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lf(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, c0(r.key), r);
  }
}
function Ni(e, t, n) {
  return t && lf(e.prototype, t), n && lf(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function f0(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function Ps(e, t) {
  return Ps = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, i) {
    return r.__proto__ = i, r;
  }, Ps(e, t);
}
function Yb(e, t) {
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
function Xb() {
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
function Qb(e, t) {
  if (t && (Qe(t) === "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return f0(e);
}
function Jb(e) {
  var t = Xb();
  return function() {
    var r = ka(e), i;
    if (t) {
      var a = ka(this).constructor;
      i = Reflect.construct(r, arguments, a);
    } else
      i = r.apply(this, arguments);
    return Qb(this, i);
  };
}
var d0 = { exports: {} }, oe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae = typeof Symbol == "function" && Symbol.for, Yl = Ae ? Symbol.for("react.element") : 60103, Xl = Ae ? Symbol.for("react.portal") : 60106, mo = Ae ? Symbol.for("react.fragment") : 60107, ho = Ae ? Symbol.for("react.strict_mode") : 60108, po = Ae ? Symbol.for("react.profiler") : 60114, vo = Ae ? Symbol.for("react.provider") : 60109, go = Ae ? Symbol.for("react.context") : 60110, Ql = Ae ? Symbol.for("react.async_mode") : 60111, yo = Ae ? Symbol.for("react.concurrent_mode") : 60111, bo = Ae ? Symbol.for("react.forward_ref") : 60112, wo = Ae ? Symbol.for("react.suspense") : 60113, ew = Ae ? Symbol.for("react.suspense_list") : 60120, Eo = Ae ? Symbol.for("react.memo") : 60115, Co = Ae ? Symbol.for("react.lazy") : 60116, tw = Ae ? Symbol.for("react.block") : 60121, nw = Ae ? Symbol.for("react.fundamental") : 60117, rw = Ae ? Symbol.for("react.responder") : 60118, iw = Ae ? Symbol.for("react.scope") : 60119;
function Je(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Yl:
        switch (e = e.type, e) {
          case Ql:
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
      case Xl:
        return t;
    }
  }
}
function m0(e) {
  return Je(e) === yo;
}
oe.AsyncMode = Ql;
oe.ConcurrentMode = yo;
oe.ContextConsumer = go;
oe.ContextProvider = vo;
oe.Element = Yl;
oe.ForwardRef = bo;
oe.Fragment = mo;
oe.Lazy = Co;
oe.Memo = Eo;
oe.Portal = Xl;
oe.Profiler = po;
oe.StrictMode = ho;
oe.Suspense = wo;
oe.isAsyncMode = function(e) {
  return m0(e) || Je(e) === Ql;
};
oe.isConcurrentMode = m0;
oe.isContextConsumer = function(e) {
  return Je(e) === go;
};
oe.isContextProvider = function(e) {
  return Je(e) === vo;
};
oe.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Yl;
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
  return Je(e) === Xl;
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
  return typeof e == "string" || typeof e == "function" || e === mo || e === yo || e === po || e === ho || e === wo || e === ew || typeof e == "object" && e !== null && (e.$$typeof === Co || e.$$typeof === Eo || e.$$typeof === vo || e.$$typeof === go || e.$$typeof === bo || e.$$typeof === nw || e.$$typeof === rw || e.$$typeof === iw || e.$$typeof === tw);
};
oe.typeOf = Je;
(function(e) {
  e.exports = oe;
})(d0);
function Ns(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = [];
  return l.Children.forEach(e, function(r) {
    r == null && !t.keepEmpty || (Array.isArray(r) ? n = n.concat(Ns(r)) : d0.exports.isFragment(r) && r.props ? n = n.concat(Ns(r.props.children, t)) : n.push(r));
  }), n;
}
var As = {}, aw = function(t) {
};
function ow(e, t) {
}
function sw(e, t) {
}
function lw() {
  As = {};
}
function h0(e, t, n) {
  !t && !As[n] && (e(!1, n), As[n] = !0);
}
function pt(e, t) {
  h0(ow, e, t);
}
function cw(e, t) {
  h0(sw, e, t);
}
pt.preMessage = aw;
pt.resetWarned = lw;
pt.noteOnce = cw;
var kn = "RC_FORM_INTERNAL_HOOKS", se = function() {
  pt(!1, "Can not find FormContext. Please make sure you wrap Field under Form.");
}, Nn = /* @__PURE__ */ L.createContext({
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
  var e = {}, t = Object.prototype, n = t.hasOwnProperty, r = Object.defineProperty || function(F, _, x) {
    F[_] = x.value;
  }, i = typeof Symbol == "function" ? Symbol : {}, a = i.iterator || "@@iterator", o = i.asyncIterator || "@@asyncIterator", s = i.toStringTag || "@@toStringTag";
  function c(F, _, x) {
    return Object.defineProperty(F, _, {
      value: x,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), F[_];
  }
  try {
    c({}, "");
  } catch {
    c = function(x, S, I) {
      return x[S] = I;
    };
  }
  function u(F, _, x, S) {
    var I = _ && _.prototype instanceof m ? _ : m, A = Object.create(I.prototype), V = new P(S || []);
    return r(A, "_invoke", {
      value: E(F, x, V)
    }), A;
  }
  function d(F, _, x) {
    try {
      return {
        type: "normal",
        arg: F.call(_, x)
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
  function p() {
  }
  function v() {
  }
  var h = {};
  c(h, a, function() {
    return this;
  });
  var g = Object.getPrototypeOf, w = g && g(g(O([])));
  w && w !== t && n.call(w, a) && (h = w);
  var $ = v.prototype = m.prototype = Object.create(h);
  function y(F) {
    ["next", "throw", "return"].forEach(function(_) {
      c(F, _, function(x) {
        return this._invoke(_, x);
      });
    });
  }
  function b(F, _) {
    function x(I, A, V, M) {
      var T = d(F[I], F, A);
      if (T.type !== "throw") {
        var W = T.arg, H = W.value;
        return H && Qe(H) == "object" && n.call(H, "__await") ? _.resolve(H.__await).then(function(z) {
          x("next", z, V, M);
        }, function(z) {
          x("throw", z, V, M);
        }) : _.resolve(H).then(function(z) {
          W.value = z, V(W);
        }, function(z) {
          return x("throw", z, V, M);
        });
      }
      M(T.arg);
    }
    var S;
    r(this, "_invoke", {
      value: function(A, V) {
        function M() {
          return new _(function(T, W) {
            x(A, V, T, W);
          });
        }
        return S = S ? S.then(M, M) : M();
      }
    });
  }
  function E(F, _, x) {
    var S = "suspendedStart";
    return function(I, A) {
      if (S === "executing")
        throw new Error("Generator is already running");
      if (S === "completed") {
        if (I === "throw")
          throw A;
        return R();
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
        var T = d(F, _, x);
        if (T.type === "normal") {
          if (S = x.done ? "completed" : "suspendedYield", T.arg === f)
            continue;
          return {
            value: T.arg,
            done: x.done
          };
        }
        T.type === "throw" && (S = "completed", x.method = "throw", x.arg = T.arg);
      }
    };
  }
  function C(F, _) {
    var x = _.method, S = F.iterator[x];
    if (S === void 0)
      return _.delegate = null, x === "throw" && F.iterator.return && (_.method = "return", _.arg = void 0, C(F, _), _.method === "throw") || x !== "return" && (_.method = "throw", _.arg = new TypeError("The iterator does not provide a '" + x + "' method")), f;
    var I = d(S, F.iterator, _.arg);
    if (I.type === "throw")
      return _.method = "throw", _.arg = I.arg, _.delegate = null, f;
    var A = I.arg;
    return A ? A.done ? (_[F.resultName] = A.value, _.next = F.nextLoc, _.method !== "return" && (_.method = "next", _.arg = void 0), _.delegate = null, f) : A : (_.method = "throw", _.arg = new TypeError("iterator result is not an object"), _.delegate = null, f);
  }
  function k(F) {
    var _ = {
      tryLoc: F[0]
    };
    1 in F && (_.catchLoc = F[1]), 2 in F && (_.finallyLoc = F[2], _.afterLoc = F[3]), this.tryEntries.push(_);
  }
  function N(F) {
    var _ = F.completion || {};
    _.type = "normal", delete _.arg, F.completion = _;
  }
  function P(F) {
    this.tryEntries = [{
      tryLoc: "root"
    }], F.forEach(k, this), this.reset(!0);
  }
  function O(F) {
    if (F) {
      var _ = F[a];
      if (_)
        return _.call(F);
      if (typeof F.next == "function")
        return F;
      if (!isNaN(F.length)) {
        var x = -1, S = function I() {
          for (; ++x < F.length; )
            if (n.call(F, x))
              return I.value = F[x], I.done = !1, I;
          return I.value = void 0, I.done = !0, I;
        };
        return S.next = S;
      }
    }
    return {
      next: R
    };
  }
  function R() {
    return {
      value: void 0,
      done: !0
    };
  }
  return p.prototype = v, r($, "constructor", {
    value: v,
    configurable: !0
  }), r(v, "constructor", {
    value: p,
    configurable: !0
  }), p.displayName = c(v, s, "GeneratorFunction"), e.isGeneratorFunction = function(F) {
    var _ = typeof F == "function" && F.constructor;
    return !!_ && (_ === p || (_.displayName || _.name) === "GeneratorFunction");
  }, e.mark = function(F) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(F, v) : (F.__proto__ = v, c(F, s, "GeneratorFunction")), F.prototype = Object.create($), F;
  }, e.awrap = function(F) {
    return {
      __await: F
    };
  }, y(b.prototype), c(b.prototype, o, function() {
    return this;
  }), e.AsyncIterator = b, e.async = function(F, _, x, S, I) {
    I === void 0 && (I = Promise);
    var A = new b(u(F, _, x, S), I);
    return e.isGeneratorFunction(_) ? A : A.next().then(function(V) {
      return V.done ? V.value : A.next();
    });
  }, y($), c($, s, "Generator"), c($, a, function() {
    return this;
  }), c($, "toString", function() {
    return "[object Generator]";
  }), e.keys = function(F) {
    var _ = Object(F), x = [];
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
  }, e.values = O, P.prototype = {
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
      function S(W, H) {
        return V.type = "throw", V.arg = _, x.next = W, H && (x.method = "next", x.arg = void 0), !!H;
      }
      for (var I = this.tryEntries.length - 1; I >= 0; --I) {
        var A = this.tryEntries[I], V = A.completion;
        if (A.tryLoc === "root")
          return S("end");
        if (A.tryLoc <= this.prev) {
          var M = n.call(A, "catchLoc"), T = n.call(A, "finallyLoc");
          if (M && T) {
            if (this.prev < A.catchLoc)
              return S(A.catchLoc, !0);
            if (this.prev < A.finallyLoc)
              return S(A.finallyLoc);
          } else if (M) {
            if (this.prev < A.catchLoc)
              return S(A.catchLoc, !0);
          } else {
            if (!T)
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
        iterator: O(_),
        resultName: x,
        nextLoc: S
      }, this.method === "next" && (this.arg = void 0), f;
    }
  }, e;
}
function cf(e, t, n, r, i, a, o) {
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
        cf(a, r, i, o, s, "next", c);
      }
      function s(c) {
        cf(a, r, i, o, s, "throw", c);
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
function uw(e, t) {
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
function fw() {
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
  return fw() ? aa = Reflect.construct.bind() : aa = function(i, a, o) {
    var s = [null];
    s.push.apply(s, a);
    var c = Function.bind.apply(i, s), u = new c();
    return o && fi(u, o.prototype), u;
  }, aa.apply(null, arguments);
}
function dw(e) {
  return Function.toString.call(e).indexOf("[native code]") !== -1;
}
function Ms(e) {
  var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
  return Ms = function(r) {
    if (r === null || !dw(r))
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
var mw = /%[sdj%]/g, hw = function() {
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
function Ye(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = 0, a = n.length;
  if (typeof e == "function")
    return e.apply(null, n);
  if (typeof e == "string") {
    var o = e.replace(mw, function(s) {
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
function pw(e) {
  return e === "string" || e === "url" || e === "hex" || e === "email" || e === "date" || e === "pattern";
}
function Oe(e, t) {
  return !!(e == null || t === "array" && Array.isArray(e) && !e.length || pw(t) && typeof e == "string" && !e);
}
function vw(e, t, n) {
  var r = [], i = 0, a = e.length;
  function o(s) {
    r.push.apply(r, s || []), i++, i === a && n(r);
  }
  e.forEach(function(s) {
    t(s, o);
  });
}
function uf(e, t, n) {
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
function gw(e) {
  var t = [];
  return Object.keys(e).forEach(function(n) {
    t.push.apply(t, e[n] || []);
  }), t;
}
var ff = /* @__PURE__ */ function(e) {
  uw(t, e);
  function t(n, r) {
    var i;
    return i = e.call(this, "Async Validation Error") || this, i.errors = n, i.fields = r, i;
  }
  return t;
}(/* @__PURE__ */ Ms(Error));
function yw(e, t, n, r, i) {
  if (t.first) {
    var a = new Promise(function(m, p) {
      var v = function(w) {
        return r(w), w.length ? p(new ff(w, Is(w))) : m(i);
      }, h = gw(e);
      uf(h, n, v);
    });
    return a.catch(function(m) {
      return m;
    }), a;
  }
  var o = t.firstFields === !0 ? Object.keys(e) : t.firstFields || [], s = Object.keys(e), c = s.length, u = 0, d = [], f = new Promise(function(m, p) {
    var v = function(g) {
      if (d.push.apply(d, g), u++, u === c)
        return r(d), d.length ? p(new ff(d, Is(d))) : m(i);
    };
    s.length || (r(d), m(i)), s.forEach(function(h) {
      var g = e[h];
      o.indexOf(h) !== -1 ? uf(g, n, v) : vw(g, n, v);
    });
  });
  return f.catch(function(m) {
    return m;
  }), f;
}
function bw(e) {
  return !!(e && e.message !== void 0);
}
function ww(e, t) {
  for (var n = e, r = 0; r < t.length; r++) {
    if (n == null)
      return n;
    n = n[t[r]];
  }
  return n;
}
function df(e, t) {
  return function(n) {
    var r;
    return e.fullFields ? r = ww(t, e.fullFields) : r = t[n.field || e.fullField], bw(n) ? (n.field = n.field || e.fullField, n.fieldValue = r, n) : {
      message: typeof n == "function" ? n() : n,
      fieldValue: r,
      field: n.field || e.fullField
    };
  };
}
function mf(e, t) {
  if (t) {
    for (var n in t)
      if (t.hasOwnProperty(n)) {
        var r = t[n];
        typeof r == "object" && typeof e[n] == "object" ? e[n] = Sn({}, e[n], r) : e[n] = r;
      }
  }
  return e;
}
var p0 = function(t, n, r, i, a, o) {
  t.required && (!r.hasOwnProperty(t.field) || Oe(n, o || t.type)) && i.push(Ye(a.messages.required, t.fullField));
}, Ew = function(t, n, r, i, a) {
  (/^\s+$/.test(n) || n === "") && i.push(Ye(a.messages.whitespace, t.fullField));
}, Gi, Cw = function() {
  if (Gi)
    return Gi;
  var e = "[a-fA-F\\d:]", t = function(b) {
    return b && b.includeBoundaries ? "(?:(?<=\\s|^)(?=" + e + ")|(?<=" + e + ")(?=\\s|$))" : "";
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
`).replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(), a = new RegExp("(?:^" + n + "$)|(?:^" + i + "$)"), o = new RegExp("^" + n + "$"), s = new RegExp("^" + i + "$"), c = function(b) {
    return b && b.exact ? a : new RegExp("(?:" + t(b) + n + t(b) + ")|(?:" + t(b) + i + t(b) + ")", "g");
  };
  c.v4 = function(y) {
    return y && y.exact ? o : new RegExp("" + t(y) + n + t(y), "g");
  }, c.v6 = function(y) {
    return y && y.exact ? s : new RegExp("" + t(y) + i + t(y), "g");
  };
  var u = "(?:(?:[a-z]+:)?//)", d = "(?:\\S+(?::\\S*)?@)?", f = c.v4().source, m = c.v6().source, p = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)", v = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*", h = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))", g = "(?::\\d{2,5})?", w = '(?:[/?#][^\\s"]*)?', $ = "(?:" + u + "|www\\.)" + d + "(?:localhost|" + f + "|" + m + "|" + p + v + h + ")" + g + w;
  return Gi = new RegExp("(?:^" + $ + "$)", "i"), Gi;
}, hf = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
}, Zr = {
  integer: function(t) {
    return Zr.number(t) && parseInt(t, 10) === t;
  },
  float: function(t) {
    return Zr.number(t) && !Zr.integer(t);
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
    return typeof t == "object" && !Zr.array(t);
  },
  method: function(t) {
    return typeof t == "function";
  },
  email: function(t) {
    return typeof t == "string" && t.length <= 320 && !!t.match(hf.email);
  },
  url: function(t) {
    return typeof t == "string" && t.length <= 2048 && !!t.match(Cw());
  },
  hex: function(t) {
    return typeof t == "string" && !!t.match(hf.hex);
  }
}, $w = function(t, n, r, i, a) {
  if (t.required && n === void 0) {
    p0(t, n, r, i, a);
    return;
  }
  var o = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"], s = t.type;
  o.indexOf(s) > -1 ? Zr[s](n) || i.push(Ye(a.messages.types[s], t.fullField, t.type)) : s && typeof n !== t.type && i.push(Ye(a.messages.types[s], t.fullField, t.type));
}, xw = function(t, n, r, i, a) {
  var o = typeof t.len == "number", s = typeof t.min == "number", c = typeof t.max == "number", u = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, d = n, f = null, m = typeof n == "number", p = typeof n == "string", v = Array.isArray(n);
  if (m ? f = "number" : p ? f = "string" : v && (f = "array"), !f)
    return !1;
  v && (d = n.length), p && (d = n.replace(u, "_").length), o ? d !== t.len && i.push(Ye(a.messages[f].len, t.fullField, t.len)) : s && !c && d < t.min ? i.push(Ye(a.messages[f].min, t.fullField, t.min)) : c && !s && d > t.max ? i.push(Ye(a.messages[f].max, t.fullField, t.max)) : s && c && (d < t.min || d > t.max) && i.push(Ye(a.messages[f].range, t.fullField, t.min, t.max));
}, Zn = "enum", _w = function(t, n, r, i, a) {
  t[Zn] = Array.isArray(t[Zn]) ? t[Zn] : [], t[Zn].indexOf(n) === -1 && i.push(Ye(a.messages[Zn], t.fullField, t[Zn].join(", ")));
}, kw = function(t, n, r, i, a) {
  if (t.pattern) {
    if (t.pattern instanceof RegExp)
      t.pattern.lastIndex = 0, t.pattern.test(n) || i.push(Ye(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    else if (typeof t.pattern == "string") {
      var o = new RegExp(t.pattern);
      o.test(n) || i.push(Ye(a.messages.pattern.mismatch, t.fullField, n, t.pattern));
    }
  }
}, Q = {
  required: p0,
  whitespace: Ew,
  type: $w,
  range: xw,
  enum: _w,
  pattern: kw
}, Sw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a, "string"), Oe(n, "string") || (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a), Q.pattern(t, n, i, o, a), t.whitespace === !0 && Q.whitespace(t, n, i, o, a));
  }
  r(o);
}, Ow = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Fw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n === "" && (n = void 0), Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Pw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q.type(t, n, i, o, a);
  }
  r(o);
}, Nw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), Oe(n) || Q.type(t, n, i, o, a);
  }
  r(o);
}, Aw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Tw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
  }
  r(o);
}, Rw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (n == null && !t.required)
      return r();
    Q.required(t, n, i, o, a, "array"), n != null && (Q.type(t, n, i, o, a), Q.range(t, n, i, o, a));
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
}, Iw = "enum", Lw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a), n !== void 0 && Q[Iw](t, n, i, o, a);
  }
  r(o);
}, Dw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n, "string") && !t.required)
      return r();
    Q.required(t, n, i, o, a), Oe(n, "string") || Q.pattern(t, n, i, o, a);
  }
  r(o);
}, Vw = function(t, n, r, i, a) {
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
}, jw = function(t, n, r, i, a) {
  var o = [], s = Array.isArray(n) ? "array" : typeof n;
  Q.required(t, n, i, o, a, s), r(o);
}, Zo = function(t, n, r, i, a) {
  var o = t.type, s = [], c = t.required || !t.required && i.hasOwnProperty(t.field);
  if (c) {
    if (Oe(n, o) && !t.required)
      return r();
    Q.required(t, n, i, s, a, o), Oe(n, o) || Q.type(t, n, i, s, a);
  }
  r(s);
}, Bw = function(t, n, r, i, a) {
  var o = [], s = t.required || !t.required && i.hasOwnProperty(t.field);
  if (s) {
    if (Oe(n) && !t.required)
      return r();
    Q.required(t, n, i, o, a);
  }
  r(o);
}, Gr = {
  string: Sw,
  method: Ow,
  number: Fw,
  boolean: Pw,
  regexp: Nw,
  integer: Aw,
  float: Tw,
  array: Rw,
  object: Mw,
  enum: Lw,
  pattern: Dw,
  date: Vw,
  url: Zo,
  hex: Zo,
  email: Zo,
  required: jw,
  any: Bw
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
    return r && (this._messages = mf(Ls(), r)), this._messages;
  }, t.validate = function(r, i, a) {
    var o = this;
    i === void 0 && (i = {}), a === void 0 && (a = function() {
    });
    var s = r, c = i, u = a;
    if (typeof c == "function" && (u = c, c = {}), !this.rules || Object.keys(this.rules).length === 0)
      return u && u(null, s), Promise.resolve(s);
    function d(h) {
      var g = [], w = {};
      function $(b) {
        if (Array.isArray(b)) {
          var E;
          g = (E = g).concat.apply(E, b);
        } else
          g.push(b);
      }
      for (var y = 0; y < h.length; y++)
        $(h[y]);
      g.length ? (w = Is(g), u(g, w)) : u(null, s);
    }
    if (c.messages) {
      var f = this.messages();
      f === Ds && (f = Ls()), mf(f, c.messages), c.messages = f;
    } else
      c.messages = this.messages();
    var m = {}, p = c.keys || Object.keys(this.rules);
    p.forEach(function(h) {
      var g = o.rules[h], w = s[h];
      g.forEach(function($) {
        var y = $;
        typeof y.transform == "function" && (s === r && (s = Sn({}, s)), w = s[h] = y.transform(w)), typeof y == "function" ? y = {
          validator: y
        } : y = Sn({}, y), y.validator = o.getValidationMethod(y), y.validator && (y.field = h, y.fullField = y.fullField || h, y.type = o.getType(y), m[h] = m[h] || [], m[h].push({
          rule: y,
          value: w,
          source: s,
          field: h
        }));
      });
    });
    var v = {};
    return yw(m, c, function(h, g) {
      var w = h.rule, $ = (w.type === "object" || w.type === "array") && (typeof w.fields == "object" || typeof w.defaultField == "object");
      $ = $ && (w.required || !w.required && h.value), w.field = h.field;
      function y(C, k) {
        return Sn({}, k, {
          fullField: w.fullField + "." + C,
          fullFields: w.fullFields ? [].concat(w.fullFields, [C]) : [C]
        });
      }
      function b(C) {
        C === void 0 && (C = []);
        var k = Array.isArray(C) ? C : [C];
        !c.suppressWarning && k.length && e.warning("async-validator:", k), k.length && w.message !== void 0 && (k = [].concat(w.message));
        var N = k.map(df(w, s));
        if (c.first && N.length)
          return v[w.field] = 1, g(N);
        if (!$)
          g(N);
        else {
          if (w.required && !h.value)
            return w.message !== void 0 ? N = [].concat(w.message).map(df(w, s)) : c.error && (N = [c.error(w, Ye(c.messages.required, w.field))]), g(N);
          var P = {};
          w.defaultField && Object.keys(h.value).map(function(F) {
            P[F] = w.defaultField;
          }), P = Sn({}, P, h.rule.fields);
          var O = {};
          Object.keys(P).forEach(function(F) {
            var _ = P[F], x = Array.isArray(_) ? _ : [_];
            O[F] = x.map(y.bind(null, F));
          });
          var R = new e(O);
          R.messages(c.messages), h.rule.options && (h.rule.options.messages = c.messages, h.rule.options.error = c.error), R.validate(h.value, h.rule.options || c, function(F) {
            var _ = [];
            N && N.length && _.push.apply(_, N), F && F.length && _.push.apply(_, F), g(_.length ? _ : null);
          });
        }
      }
      var E;
      if (w.asyncValidator)
        E = w.asyncValidator(w, h.value, b, h.source, c);
      else if (w.validator) {
        try {
          E = w.validator(w, h.value, b, h.source, c);
        } catch (C) {
          console.error == null || console.error(C), c.suppressValidatorError || setTimeout(function() {
            throw C;
          }, 0), b(C.message);
        }
        E === !0 ? b() : E === !1 ? b(typeof w.message == "function" ? w.message(w.fullField || w.field) : w.message || (w.fullField || w.field) + " fails") : E instanceof Array ? b(E) : E instanceof Error && b(E.message);
      }
      E && E.then && E.then(function() {
        return b();
      }, function(C) {
        return b(C);
      });
    }, function(h) {
      d(h);
    }, s);
  }, t.getType = function(r) {
    if (r.type === void 0 && r.pattern instanceof RegExp && (r.type = "pattern"), typeof r.validator != "function" && r.type && !Gr.hasOwnProperty(r.type))
      throw new Error(Ye("Unknown rule type %s", r.type));
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
Ai.warning = hw;
Ai.messages = Ds;
Ai.validators = Gr;
var Ke = "'${name}' is not a valid ${type}", v0 = {
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
function g0(e, t) {
  for (var n = e, r = 0; r < t.length; r += 1) {
    if (n == null)
      return;
    n = n[t[r]];
  }
  return n;
}
function y0(e) {
  if (Array.isArray(e))
    return e;
}
function b0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ww(e) {
  return y0(e) || u0(e) || Gl(e) || b0();
}
function w0(e, t, n, r) {
  if (!t.length)
    return n;
  var i = Ww(t), a = i[0], o = i.slice(1), s;
  return !e && typeof a == "number" ? s = [] : Array.isArray(e) ? s = ne(e) : s = ee({}, e), r && n === void 0 && o.length === 1 ? delete s[a][o[0]] : s[a] = w0(s[a], o, n, r), s;
}
function Zw(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  return t.length && r && n === void 0 && !g0(e, t.slice(0, -1)) ? e : w0(e, t, n, r);
}
function xo(e) {
  return Array.isArray(e) ? Uw(e) : Qe(e) === "object" && e !== null ? Hw(e) : e;
}
function Hw(e) {
  if (Object.getPrototypeOf(e) === Object.prototype) {
    var t = {};
    for (var n in e)
      t[n] = xo(e[n]);
    return t;
  }
  return e;
}
function Uw(e) {
  return e.map(function(t) {
    return xo(t);
  });
}
function we(e) {
  return Ts(e);
}
function Jt(e, t) {
  var n = g0(e, t);
  return n;
}
function Yt(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i = Zw(e, t, n, r);
  return i;
}
function pf(e, t) {
  var n = {};
  return t.forEach(function(r) {
    var i = Jt(e, r);
    n = Yt(n, r, i);
  }), n;
}
function Yr(e, t) {
  return e && e.some(function(n) {
    return C0(n, t);
  });
}
function vf(e) {
  return Qe(e) === "object" && e !== null && Object.getPrototypeOf(e) === Object.prototype;
}
function E0(e, t) {
  var n = Array.isArray(e) ? ne(e) : ee({}, e);
  return t && Object.keys(t).forEach(function(r) {
    var i = n[r], a = t[r], o = vf(i) && vf(a);
    n[r] = o ? E0(i, a || {}) : xo(a);
  }), n;
}
function oa(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  return n.reduce(function(i, a) {
    return E0(i, a);
  }, e);
}
function C0(e, t) {
  return !e || !t || e.length !== t.length ? !1 : e.every(function(n, r) {
    return t[r] === n;
  });
}
function zw(e, t) {
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
function qw(e) {
  var t = arguments.length <= 1 ? void 0 : arguments[1];
  return t && t.target && Qe(t.target) === "object" && e in t.target ? t.target[e] : t;
}
function gf(e, t, n) {
  var r = e.length;
  if (t < 0 || t >= r || n < 0 || n >= r)
    return e;
  var i = e[t], a = t - n;
  return a > 0 ? [].concat(ne(e.slice(0, n)), [i], ne(e.slice(n, t)), ne(e.slice(t + 1, r))) : a < 0 ? [].concat(ne(e.slice(0, t)), ne(e.slice(t + 1, n + 1)), [i], ne(e.slice(n + 1, r))) : e;
}
var Kw = Ai;
function Gw(e, t) {
  return e.replace(/\$\{\w+\}/g, function(n) {
    var r = n.slice(2, -1);
    return t[r];
  });
}
var yf = "CODE_LOGIC_ERROR";
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
                return console.error(w), Promise.reject(yf);
              }
            }), c = null, o && o.type === "array" && o.defaultField && (c = o.defaultField, delete o.defaultField), u = new Kw(De({}, t, [o])), d = oa({}, v0, i.validateMessages), u.messages(d), f = [], g.prev = 9, g.next = 12, Promise.resolve(u.validate(De({}, t, n), ee({}, i)));
          case 12:
            g.next = 17;
            break;
          case 14:
            g.prev = 14, g.t0 = g.catch(9), g.t0.errors && (f = g.t0.errors.map(function(w, $) {
              var y = w.message, b = y === yf ? d.default : y;
              return /* @__PURE__ */ L.isValidElement(b) ? /* @__PURE__ */ L.cloneElement(b, {
                key: "error_".concat($)
              }) : b;
            }));
          case 17:
            if (!(!f.length && c)) {
              g.next = 22;
              break;
            }
            return g.next = 20, Promise.all(n.map(function(w, $) {
              return Vs("".concat(t, ".").concat($), w, c, i, a);
            }));
          case 20:
            return m = g.sent, g.abrupt("return", m.reduce(function(w, $) {
              return [].concat(ne(w), ne($));
            }, []));
          case 22:
            return p = ee(ee({}, r), {}, {
              name: t,
              enum: (r.enum || []).join(", ")
            }, a), v = f.map(function(w) {
              return typeof w == "string" ? Gw(w, p) : w;
            }), g.abrupt("return", v);
          case 25:
          case "end":
            return g.stop();
        }
    }, e, null, [[9, 14]]);
  })), js.apply(this, arguments);
}
function Yw(e, t, n, r, i, a) {
  var o = e.join("."), s = n.map(function(d, f) {
    var m = d.validator, p = ee(ee({}, d), {}, {
      ruleIndex: f
    });
    return m && (p.validator = function(v, h, g) {
      var w = !1, $ = function() {
        for (var E = arguments.length, C = new Array(E), k = 0; k < E; k++)
          C[k] = arguments[k];
        Promise.resolve().then(function() {
          pt(!w, "Your validator function has already return a promise. `callback` will be ignored."), w || g.apply(void 0, C);
        });
      }, y = m(v, h, $);
      w = y && typeof y.then == "function" && typeof y.catch == "function", pt(w, "`callback` is deprecated. Please return a promise instead."), w && y.then(function() {
        g();
      }).catch(function(b) {
        g(b || " ");
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
        return Bt().wrap(function($) {
          for (; ; )
            switch ($.prev = $.next) {
              case 0:
                v = 0;
              case 1:
                if (!(v < s.length)) {
                  $.next = 12;
                  break;
                }
                return h = s[v], $.next = 5, Vs(o, t, h, r, a);
              case 5:
                if (g = $.sent, !g.length) {
                  $.next = 9;
                  break;
                }
                return p([{
                  errors: g,
                  rule: h
                }]), $.abrupt("return");
              case 9:
                v += 1, $.next = 1;
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
      return Vs(o, t, d, r, a).then(function(f) {
        return {
          errors: f,
          rule: d
        };
      });
    });
    c = (i ? Qw(u) : Xw(u)).then(function(d) {
      return Promise.reject(d);
    });
  }
  return c.catch(function(d) {
    return d;
  }), c;
}
function Xw(e) {
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
function Qw(e) {
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
var Jw = ["name"], tt = [];
function bf(e, t, n, r, i, a) {
  return typeof e == "function" ? e(t, n, "source" in a ? {
    source: a.source
  } : {}) : r !== i;
}
var Jl = /* @__PURE__ */ function(e) {
  Yb(n, e);
  var t = Jb(n);
  function n(r) {
    var i;
    if (Pi(this, n), i = t.call(this, r), i.state = {
      resetCount: 0
    }, i.cancelRegisterFunc = null, i.mounted = !1, i.touched = !1, i.dirty = !1, i.validatePromise = null, i.prevValidating = void 0, i.errors = tt, i.warnings = tt, i.cancelRegister = function() {
      var c = i.props, u = c.preserve, d = c.isListField, f = c.name;
      i.cancelRegisterFunc && i.cancelRegisterFunc(d, u, we(f)), i.cancelRegisterFunc = null;
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
      var f = i.props, m = f.shouldUpdate, p = f.dependencies, v = p === void 0 ? [] : p, h = f.onReset, g = d.store, w = i.getNamePath(), $ = i.getValue(c), y = i.getValue(g), b = u && Yr(u, w);
      switch (d.type === "valueUpdate" && d.source === "external" && $ !== y && (i.touched = !0, i.dirty = !0, i.validatePromise = null, i.errors = tt, i.warnings = tt, i.triggerMetaEvent()), d.type) {
        case "reset":
          if (!u || b) {
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
          if (b) {
            var E = d.data;
            "touched" in E && (i.touched = E.touched), "validating" in E && !("originRCField" in E) && (i.validatePromise = E.validating ? Promise.resolve([]) : null), "errors" in E && (i.errors = E.errors || tt), "warnings" in E && (i.warnings = E.warnings || tt), i.dirty = !0, i.triggerMetaEvent(), i.reRender();
            return;
          }
          if (m && !w.length && bf(m, c, g, $, y, d)) {
            i.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var C = v.map(we);
          if (C.some(function(k) {
            return Yr(d.relatedFields, k);
          })) {
            i.reRender();
            return;
          }
          break;
        }
        default:
          if (b || (!v.length || w.length || m) && bf(m, c, g, $, y, d)) {
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
        var m = i.props, p = m.validateFirst, v = p === void 0 ? !1 : p, h = m.messageVariables, g = c || {}, w = g.triggerName, $ = i.getRules();
        w && ($ = $.filter(function(b) {
          return b;
        }).filter(function(b) {
          var E = b.validateTrigger;
          if (!E)
            return !0;
          var C = Ts(E);
          return C.includes(w);
        }));
        var y = Yw(u, d, $, c, v, h);
        return y.catch(function(b) {
          return b;
        }).then(function() {
          var b = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : tt;
          if (i.validatePromise === f) {
            var E;
            i.validatePromise = null;
            var C = [], k = [];
            (E = b.forEach) === null || E === void 0 || E.call(b, function(N) {
              var P = N.rule.warningOnly, O = N.errors, R = O === void 0 ? tt : O;
              P ? k.push.apply(k, ne(R)) : C.push.apply(C, ne(R));
            }), i.errors = C, i.warnings = k, i.triggerMetaEvent(), i.reRender();
          }
        }), y;
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
      var d = Ns(c);
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
      var c = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, u = i.props, d = u.trigger, f = u.validateTrigger, m = u.getValueFromEvent, p = u.normalize, v = u.valuePropName, h = u.getValueProps, g = u.fieldContext, w = f !== void 0 ? f : g.validateTrigger, $ = i.getNamePath(), y = g.getInternalHooks, b = g.getFieldsValue, E = y(kn), C = E.dispatch, k = i.getValue(), N = h || function(F) {
        return De({}, v, F);
      }, P = c[d], O = ee(ee({}, c), N(k));
      O[d] = function() {
        i.touched = !0, i.dirty = !0, i.triggerMetaEvent();
        for (var F, _ = arguments.length, x = new Array(_), S = 0; S < _; S++)
          x[S] = arguments[S];
        m ? F = m.apply(void 0, x) : F = qw.apply(void 0, [v].concat(x)), p && (F = p(F, k, b(!0))), C({
          type: "updateValue",
          namePath: $,
          value: F
        }), P && P.apply(void 0, x);
      };
      var R = Ts(w || []);
      return R.forEach(function(F) {
        var _ = O[F];
        O[F] = function() {
          _ && _.apply(void 0, arguments);
          var x = i.props.rules;
          x && x.length && C({
            type: "validateField",
            namePath: $,
            triggerName: F
          });
        };
      }), O;
    }, r.fieldContext) {
      var a = r.fieldContext.getInternalHooks, o = a(kn), s = o.initEntityValue;
      s(f0(i));
    }
    return i;
  }
  return Ni(n, [{
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
Jl.contextType = Nn;
Jl.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function ec(e) {
  var t = e.name, n = Kl(e, Jw), r = L.useContext(Nn), i = t !== void 0 ? we(t) : void 0, a = "keep";
  return n.isListField || (a = "_".concat((i || []).join("_"))), /* @__PURE__ */ L.createElement(Jl, _a({
    key: a,
    name: i
  }, n, {
    fieldContext: r
  }));
}
var eE = /* @__PURE__ */ L.createContext(null), $0 = function(t) {
  var n = t.name, r = t.initialValue, i = t.children, a = t.rules, o = t.validateTrigger, s = L.useContext(Nn), c = L.useRef({
    keys: [],
    id: 0
  }), u = c.current, d = L.useMemo(function() {
    var v = we(s.prefixName) || [];
    return [].concat(ne(v), ne(we(n)));
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
    var $ = w.source;
    return $ === "internal" ? !1 : h !== g;
  };
  return /* @__PURE__ */ L.createElement(eE.Provider, {
    value: m
  }, /* @__PURE__ */ L.createElement(Nn.Provider, {
    value: f
  }, /* @__PURE__ */ L.createElement(ec, {
    name: [],
    shouldUpdate: p,
    rules: a,
    validateTrigger: o,
    initialValue: r,
    isList: !0
  }, function(v, h) {
    var g = v.value, w = g === void 0 ? [] : g, $ = v.onChange, y = s.getFieldValue, b = function() {
      var N = y(d || []);
      return N || [];
    }, E = {
      add: function(N, P) {
        var O = b();
        P >= 0 && P <= O.length ? (u.keys = [].concat(ne(u.keys.slice(0, P)), [u.id], ne(u.keys.slice(P))), $([].concat(ne(O.slice(0, P)), [N], ne(O.slice(P))))) : (u.keys = [].concat(ne(u.keys), [u.id]), $([].concat(ne(O), [N]))), u.id += 1;
      },
      remove: function(N) {
        var P = b(), O = new Set(Array.isArray(N) ? N : [N]);
        O.size <= 0 || (u.keys = u.keys.filter(function(R, F) {
          return !O.has(F);
        }), $(P.filter(function(R, F) {
          return !O.has(F);
        })));
      },
      move: function(N, P) {
        if (N !== P) {
          var O = b();
          N < 0 || N >= O.length || P < 0 || P >= O.length || (u.keys = gf(u.keys, N, P), $(gf(O, N, P)));
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
function tE(e, t) {
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
  return y0(e) || tE(e, t) || Gl(e, t) || b0();
}
function nE(e) {
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
var x0 = "__@field_split__";
function Ho(e) {
  return e.map(function(t) {
    return "".concat(Qe(t), ":").concat(t);
  }).join(x0);
}
var Hn = /* @__PURE__ */ function() {
  function e() {
    Pi(this, e), this.kvs = /* @__PURE__ */ new Map();
  }
  return Ni(e, [{
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
        var i = di(r, 2), a = i[0], o = i[1], s = a.split(x0);
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
}(), rE = ["name", "errors"], iE = /* @__PURE__ */ Ni(function e(t) {
  var n = this;
  Pi(this, e), this.formHooked = !1, this.forceRootUpdate = void 0, this.subscribable = !0, this.store = {}, this.fieldEntities = [], this.initialValues = {}, this.callbacks = {}, this.validateMessages = null, this.preserve = null, this.lastValidatePromise = null, this.getForm = function() {
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
      var o = we(a);
      return i.get(o) || {
        INVALIDATE_NAME_PATH: we(a)
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
    }), pf(n.store, o.map(we));
  }, this.getFieldValue = function(r) {
    n.warningUnhooked();
    var i = we(r);
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
        name: we(r[o]),
        errors: [],
        warnings: []
      };
    });
  }, this.getFieldError = function(r) {
    n.warningUnhooked();
    var i = we(r), a = n.getFieldsError([i])[0];
    return a.errors;
  }, this.getFieldWarning = function(r) {
    n.warningUnhooked();
    var i = we(r), a = n.getFieldsError([i])[0];
    return a.warnings;
  }, this.isFieldsTouched = function() {
    n.warningUnhooked();
    for (var r = arguments.length, i = new Array(r), a = 0; a < r; a++)
      i[a] = arguments[a];
    var o = i[0], s = i[1], c, u = !1;
    i.length === 0 ? c = null : i.length === 1 ? Array.isArray(o) ? (c = o.map(we), u = !1) : (c = null, u = o) : (c = o.map(we), u = s);
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
        w.every(function($, y) {
          return g[y] === $;
        }) && m.update(w, function($) {
          return [].concat(ne($), [h]);
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
    var a = r.map(we);
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
    var a = r.map(we);
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
      var c = Kl(o, rE), u = we(s);
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
          return !C0(f.getNamePath(), i);
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
    var a = we(r), o = n.store;
    n.updateStore(Yt(n.store, a, i)), n.notifyObservers(o, [a], {
      type: "valueUpdate",
      source: "internal"
    }), n.notifyWatch([a]);
    var s = n.triggerDependenciesUpdate(o, a), c = n.callbacks.onValuesChange;
    if (c) {
      var u = pf(n.store, [a]);
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
        var f = we(d);
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
    var a = !!r, o = a ? r.map(we) : [], s = [];
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
            validateMessages: ee(ee({}, v0), n.validateMessages)
          }, i));
          s.push(p.then(function() {
            return {
              name: m,
              errors: [],
              warnings: []
            };
          }).catch(function(v) {
            var h, g = [], w = [];
            return (h = v.forEach) === null || h === void 0 || h.call(v, function($) {
              var y = $.rule.warningOnly, b = $.errors;
              y ? w.push.apply(w, ne(b)) : g.push.apply(g, ne(b));
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
    var c = nE(s);
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
function tc(e) {
  var t = L.useRef(), n = L.useState({}), r = di(n, 2), i = r[1];
  if (!t.current)
    if (e)
      t.current = e;
    else {
      var a = function() {
        i({});
      }, o = new iE(a);
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
}), aE = function(t) {
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
}, oE = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"], sE = function(t, n) {
  var r = t.name, i = t.initialValues, a = t.fields, o = t.form, s = t.preserve, c = t.children, u = t.component, d = u === void 0 ? "form" : u, f = t.validateMessages, m = t.validateTrigger, p = m === void 0 ? "onChange" : m, v = t.onValuesChange, h = t.onFieldsChange, g = t.onFinish, w = t.onFinishFailed, $ = Kl(t, oE), y = L.useContext(Zs), b = tc(o), E = di(b, 1), C = E[0], k = C.getInternalHooks(kn), N = k.useSubscribe, P = k.setInitialValues, O = k.setCallbacks, R = k.setValidateMessages, F = k.setPreserve, _ = k.destroyForm;
  L.useImperativeHandle(n, function() {
    return C;
  }), L.useEffect(function() {
    return y.registerForm(r, C), function() {
      y.unregisterForm(r);
    };
  }, [y, C, r]), R(ee(ee({}, y.validateMessages), f)), O({
    onValuesChange: v,
    onFieldsChange: function(H) {
      if (y.triggerFormChange(r, H), h) {
        for (var z = arguments.length, Y = new Array(z > 1 ? z - 1 : 0), K = 1; K < z; K++)
          Y[K - 1] = arguments[K];
        h.apply(void 0, [H].concat(Y));
      }
    },
    onFinish: function(H) {
      y.triggerFormFinish(r, H), g && g(H);
    },
    onFinishFailed: w
  }), F(s);
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
    zw(V.current || [], a || []) || C.setFields(a || []), V.current = a;
  }, [a, C]);
  var M = L.useMemo(function() {
    return ee(ee({}, C), {}, {
      validateTrigger: p
    });
  }, [C, p]), T = /* @__PURE__ */ L.createElement(Nn.Provider, {
    value: M
  }, S);
  return d === !1 ? T : /* @__PURE__ */ L.createElement(d, _a({}, $, {
    onSubmit: function(H) {
      H.preventDefault(), H.stopPropagation(), C.submit();
    },
    onReset: function(H) {
      var z;
      H.preventDefault(), C.resetFields(), (z = $.onReset) === null || z === void 0 || z.call($, H);
    }
  }), T);
};
function wf(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return Math.random();
  }
}
function nc() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var r = t[0], i = r === void 0 ? [] : r, a = t[1], o = q(), s = di(o, 2), c = s[0], u = s[1], d = re(function() {
    return wf(c);
  }, [c]), f = D(d);
  f.current = d;
  var m = ot(Nn), p = a || m, v = p && p._init, h = we(i), g = D(h);
  return g.current = h, G(
    function() {
      if (!!v) {
        var w = p.getFieldsValue, $ = p.getInternalHooks, y = $(kn), b = y.registerWatch, E = b(function(k) {
          var N = Jt(k, g.current), P = wf(N);
          f.current !== P && (f.current = P, u(N));
        }), C = Jt(w(), g.current);
        return u(C), E;
      }
    },
    [v]
  ), c;
}
var lE = /* @__PURE__ */ L.forwardRef(sE), $r = lE;
$r.FormProvider = aE;
$r.Field = ec;
$r.List = $0;
$r.useForm = tc;
$r.useWatch = nc;
const _0 = {
  name: void 0,
  hasFeedback: !0,
  layout: "vertical",
  requiredMarkStyle: "asterisk",
  disabled: !1
}, rc = l.createContext(_0), Ef = l.createContext(null), k0 = () => null;
var cE = rl, uE = gi;
function fE(e, t, n) {
  (n !== void 0 && !uE(e[t], n) || n === void 0 && !(t in e)) && cE(e, t, n);
}
var S0 = fE;
function dE(e) {
  return function(t, n, r) {
    for (var i = -1, a = Object(t), o = r(t), s = o.length; s--; ) {
      var c = o[e ? s : ++i];
      if (n(a[c], c, a) === !1)
        break;
    }
    return t;
  };
}
var mE = dE, hE = mE, pE = hE(), vE = pE, Hs = { exports: {} };
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
var Cf = wd;
function gE(e) {
  var t = new e.constructor(e.byteLength);
  return new Cf(t).set(new Cf(e)), t;
}
var yE = gE, bE = yE;
function wE(e, t) {
  var n = t ? bE(e.buffer) : e.buffer;
  return new e.constructor(n, e.byteOffset, e.length);
}
var EE = wE;
function CE(e, t) {
  var n = -1, r = e.length;
  for (t || (t = Array(r)); ++n < r; )
    t[n] = e[n];
  return t;
}
var $E = CE, xE = Pt, $f = Object.create, _E = function() {
  function e() {
  }
  return function(t) {
    if (!xE(t))
      return {};
    if ($f)
      return $f(t);
    e.prototype = t;
    var n = new e();
    return e.prototype = void 0, n;
  };
}(), kE = _E, SE = ud, OE = SE(Object.getPrototypeOf, Object), O0 = OE, FE = kE, PE = O0, NE = al;
function AE(e) {
  return typeof e.constructor == "function" && !NE(e) ? FE(PE(e)) : {};
}
var TE = AE, RE = Aa, ME = Rn;
function IE(e) {
  return ME(e) && RE(e);
}
var LE = IE, DE = cr, VE = O0, jE = Rn, BE = "[object Object]", WE = Function.prototype, ZE = Object.prototype, F0 = WE.toString, HE = ZE.hasOwnProperty, UE = F0.call(Object);
function zE(e) {
  if (!jE(e) || DE(e) != BE)
    return !1;
  var t = VE(e);
  if (t === null)
    return !0;
  var n = HE.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n instanceof n && F0.call(n) == UE;
}
var qE = zE;
function KE(e, t) {
  if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
    return e[t];
}
var P0 = KE;
function GE(e) {
  var t = [];
  if (e != null)
    for (var n in Object(e))
      t.push(n);
  return t;
}
var YE = GE, XE = Pt, QE = al, JE = YE, eC = Object.prototype, tC = eC.hasOwnProperty;
function nC(e) {
  if (!XE(e))
    return JE(e);
  var t = QE(e), n = [];
  for (var r in e)
    r == "constructor" && (t || !tC.call(e, r)) || n.push(r);
  return n;
}
var rC = nC, iC = cd, aC = rC, oC = Aa;
function sC(e) {
  return oC(e) ? iC(e, !0) : aC(e);
}
var N0 = sC, lC = nd, cC = N0;
function uC(e) {
  return lC(e, cC(e));
}
var fC = uC, xf = S0, dC = Hs.exports, mC = EE, hC = $E, pC = TE, _f = ld, kf = Ta, vC = LE, gC = ei.exports, yC = nl, bC = Pt, wC = qE, EC = il, Sf = P0, CC = fC;
function $C(e, t, n, r, i, a, o) {
  var s = Sf(e, n), c = Sf(t, n), u = o.get(c);
  if (u) {
    xf(e, n, u);
    return;
  }
  var d = a ? a(s, c, n + "", e, t, o) : void 0, f = d === void 0;
  if (f) {
    var m = kf(c), p = !m && gC(c), v = !m && !p && EC(c);
    d = c, m || p || v ? kf(s) ? d = s : vC(s) ? d = hC(s) : p ? (f = !1, d = dC(c, !0)) : v ? (f = !1, d = mC(c, !0)) : d = [] : wC(c) || _f(c) ? (d = s, _f(s) ? d = CC(s) : (!bC(s) || yC(s)) && (d = pC(c))) : f = !1;
  }
  f && (o.set(c, d), i(d, c, r, a, o), o.delete(c)), xf(e, n, d);
}
var xC = $C, _C = yd, kC = S0, SC = vE, OC = xC, FC = Pt, PC = N0, NC = P0;
function A0(e, t, n, r, i) {
  e !== t && SC(t, function(a, o) {
    if (i || (i = new _C()), FC(a))
      OC(e, t, o, n, A0, r, i);
    else {
      var s = r ? r(NC(e, o), a, o + "", e, t, i) : void 0;
      s === void 0 && (s = a), kC(e, o, s);
    }
  }, PC);
}
var AC = A0, TC = AC, RC = od, MC = RC(function(e, t, n) {
  TC(e, t, n);
}), IC = MC;
const T0 = (e) => l.createElement($0, {
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
}), Of = "adm-form", LC = _0, DC = de((e, t) => {
  const n = U(LC, e), {
    className: r,
    style: i,
    hasFeedback: a,
    children: o,
    layout: s,
    footer: c,
    mode: u,
    disabled: d,
    requiredMarkStyle: f
  } = n, m = pi(n, ["className", "style", "hasFeedback", "children", "layout", "footer", "mode", "disabled", "requiredMarkStyle"]), {
    locale: p
  } = pe(), v = re(() => IC({}, p.Form.defaultValidateMessages, m.validateMessages), [p.Form.defaultValidateMessages, m.validateMessages]), h = [];
  let g = null, w = [], $ = 0;
  function y() {
    w.length !== 0 && ($ += 1, h.push(l.createElement(kt, {
      header: g,
      key: $,
      mode: u
    }, w)), w = []);
  }
  return sn(n.children, (b) => {
    if (l.isValidElement(b)) {
      if (b.type === k0) {
        y(), g = b.props.children;
        return;
      }
      if (b.type === T0) {
        y(), h.push(b);
        return;
      }
    }
    w.push(b);
  }), y(), l.createElement($r, Object.assign({
    className: j(Of, r),
    style: i,
    ref: t
  }, m, {
    validateMessages: v
  }), l.createElement(rc.Provider, {
    value: {
      name: m.name,
      hasFeedback: a,
      layout: s,
      requiredMarkStyle: f,
      disabled: d
    }
  }, h), c && l.createElement("div", {
    className: `${Of}-footer`
  }, c));
});
var mi = {}, Ti = { exports: {} }, R0 = { exports: {} };
(function(e) {
  function t(n) {
    return e.exports = t = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(r) {
      return typeof r;
    } : function(r) {
      return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
    }, e.exports.__esModule = !0, e.exports.default = e.exports, t(n);
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(R0);
(function(e) {
  var t = R0.exports.default;
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
})(Ti);
var Ri = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ri);
var ct = {};
Object.defineProperty(ct, "__esModule", {
  value: !0
});
ct.call = ic;
ct.default = void 0;
ct.note = L0;
ct.noteOnce = V0;
ct.preMessage = void 0;
ct.resetWarned = D0;
ct.warning = I0;
ct.warningOnce = Mi;
var Us = {}, M0 = function(t) {
};
ct.preMessage = M0;
function I0(e, t) {
}
function L0(e, t) {
}
function D0() {
  Us = {};
}
function ic(e, t, n) {
  !t && !Us[n] && (e(!1, n), Us[n] = !0);
}
function Mi(e, t) {
  ic(I0, e, t);
}
function V0(e, t) {
  ic(L0, e, t);
}
Mi.preMessage = M0;
Mi.resetWarned = D0;
Mi.noteOnce = V0;
var VC = Mi;
ct.default = VC;
var jC = Ti.exports.default, BC = Ri.exports.default;
Object.defineProperty(mi, "__esModule", {
  value: !0
});
var j0 = mi.default = mi.HOOK_MARK = void 0, WC = BC(ct), ZC = jC(l), HC = "RC_FORM_INTERNAL_HOOKS";
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
j0 = mi.default = zC;
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
function B0(e) {
  return $a.exports.isFragment(e) ? !1 : $a.exports.isMemo(e) ? B0(e.type) : !KC(e.type);
}
const GC = Ve((e) => B(e, l.createElement("svg", {
  viewBox: "0 0 30 16"
}, l.createElement("g", {
  fill: "currentColor"
}, l.createElement("path", {
  d: "M0,0 L30,0 L18.07289,14.312538 C16.65863,16.009645 14.13637,16.238942 12.43926,14.824685 C12.25341,14.669808 12.08199,14.49839 11.92711,14.312538 L0,0 L0,0 Z"
})))));
function Ii(e) {
  return e.split("-")[1];
}
function ac(e) {
  return e === "y" ? "height" : "width";
}
function an(e) {
  return e.split("-")[0];
}
function xr(e) {
  return ["top", "bottom"].includes(an(e)) ? "x" : "y";
}
function Ff(e, t, n) {
  let {
    reference: r,
    floating: i
  } = e;
  const a = r.x + r.width / 2 - i.width / 2, o = r.y + r.height / 2 - i.height / 2, s = xr(t), c = ac(s), u = r[c] / 2 - i[c] / 2, d = an(t), f = s === "x";
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
  switch (Ii(t)) {
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
  } = Ff(u, r, c), m = r, p = {}, v = 0;
  for (let h = 0; h < s.length; h++) {
    const {
      name: g,
      fn: w
    } = s[h], {
      x: $,
      y,
      data: b,
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
    if (d = $ != null ? $ : d, f = y != null ? y : f, p = {
      ...p,
      [g]: {
        ...p[g],
        ...b
      }
    }, E && v <= 50) {
      v++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await o.getElementRects({
        reference: e,
        floating: t,
        strategy: i
      }) : E.rects), {
        x: d,
        y: f
      } = Ff(u, m, c)), h = -1;
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
function W0(e) {
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
  } = t, v = W0(p), g = s[m ? f === "floating" ? "reference" : "floating" : f], w = Sa(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(g))) == null || n ? g : g.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: d,
    strategy: c
  })), $ = f === "floating" ? {
    ...o.floating,
    x: r,
    y: i
  } : o.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), b = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = Sa(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: $,
    offsetParent: y,
    strategy: c
  }) : $);
  return {
    top: (w.top - E.top + v.top) / b.y,
    bottom: (E.bottom - w.bottom + v.bottom) / b.y,
    left: (w.left - E.left + v.left) / b.x,
    right: (E.right - w.right + v.right) / b.x
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
    const d = W0(r), f = {
      x: i,
      y: a
    }, m = xr(o), p = ac(m), v = await c.getDimensions(n), h = m === "y", g = h ? "top" : "left", w = h ? "bottom" : "right", $ = h ? "clientHeight" : "clientWidth", y = s.reference[p] + s.reference[m] - f[m] - s.floating[p], b = f[m] - s.reference[m], E = await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(n));
    let C = E ? E[$] : 0;
    (!C || !await (c.isElement == null ? void 0 : c.isElement(E))) && (C = u.floating[$] || s.floating[p]);
    const k = y / 2 - b / 2, N = d[g], P = C - v[p] - d[w], O = C / 2 - v[p] / 2 + k, R = zs(N, O, P), _ = Ii(o) != null && O != R && s.reference[p] / 2 - (O < N ? d[g] : d[w]) - v[p] / 2 < 0 ? O < N ? N - O : P - O : 0;
    return {
      [m]: f[m] - _,
      data: {
        [m]: R,
        centerOffset: O - R
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
  const r = Ii(e), i = xr(e), a = ac(i);
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
  const i = Ii(e);
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
      } = e, g = an(r), w = an(o) === o, $ = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), y = f || (w || !v ? [Fa(o)] : a$(o));
      !f && p !== "none" && y.push(...s$(o, v, p, $));
      const b = [o, ...y], E = await Oa(t, h), C = [];
      let k = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (u && C.push(E[g]), d) {
        const {
          main: R,
          cross: F
        } = r$(r, a, $);
        C.push(E[R], E[F]);
      }
      if (k = [...k, {
        placement: r,
        overflows: C
      }], !C.every((R) => R <= 0)) {
        var N, P;
        const R = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, F = b[R];
        if (F)
          return {
            data: {
              index: R,
              overflows: k
            },
            reset: {
              placement: F
            }
          };
        let _ = (P = k.filter((x) => x.overflows[0] <= 0).sort((x, S) => x.overflows[1] - S.overflows[1])[0]) == null ? void 0 : P.placement;
        if (!_)
          switch (m) {
            case "bestFit": {
              var O;
              const x = (O = k.map((S) => [S.placement, S.overflows.filter((I) => I > 0).reduce((I, A) => I + A, 0)]).sort((S, I) => S[1] - I[1])[0]) == null ? void 0 : O[0];
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
function Pf(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Nf(e) {
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
          }), o = Pf(a, i.reference);
          return {
            data: {
              referenceHiddenOffsets: o,
              referenceHidden: Nf(o)
            }
          };
        }
        case "escaped": {
          const a = await Oa(t, {
            ...r,
            altBoundary: !0
          }), o = Pf(a, i.floating);
          return {
            data: {
              escapedOffsets: o,
              escaped: Nf(o)
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
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = an(n), s = Ii(n), c = xr(n) === "x", u = ["left", "top"].includes(o) ? -1 : 1, d = a && c ? -1 : 1, f = typeof t == "function" ? t(e) : t;
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
function Z0(e) {
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
              y: $
            } = g;
            return {
              x: w,
              y: $
            };
          }
        },
        ...c
      } = e, u = {
        x: n,
        y: r
      }, d = await Oa(t, c), f = xr(an(i)), m = Z0(f);
      let p = u[f], v = u[m];
      if (a) {
        const g = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", $ = p + d[g], y = p - d[w];
        p = zs($, p, y);
      }
      if (o) {
        const g = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", $ = v + d[g], y = v - d[w];
        v = zs($, v, y);
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
      }, f = xr(i), m = Z0(f);
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
        const y = f === "y" ? "height" : "width", b = a.reference[f] - a.floating[y] + g.mainAxis, E = a.reference[f] + a.reference[y] - g.mainAxis;
        p < b ? p = b : p > E && (p = E);
      }
      if (u) {
        var w, $;
        const y = f === "y" ? "width" : "height", b = ["top", "left"].includes(an(i)), E = a.reference[m] - a.floating[y] + (b && ((w = o.offset) == null ? void 0 : w[m]) || 0) + (b ? 0 : g.crossAxis), C = a.reference[m] + a.reference[y] + (b ? 0 : (($ = o.offset) == null ? void 0 : $[m]) || 0) - (b ? g.crossAxis : 0);
        v < E ? v = E : v > C && (v = C);
      }
      return {
        [f]: p,
        [m]: v
      };
    }
  };
};
function Xe(e) {
  var t;
  return ((t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ft(e) {
  return Xe(e).getComputedStyle(e);
}
function H0(e) {
  return e instanceof Xe(e).Node;
}
function on(e) {
  return H0(e) ? (e.nodeName || "").toLowerCase() : "";
}
let Yi;
function U0() {
  if (Yi)
    return Yi;
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? (Yi = e.brands.map((t) => t.brand + "/" + t.version).join(" "), Yi) : navigator.userAgent;
}
function gt(e) {
  return e instanceof Xe(e).HTMLElement;
}
function vt(e) {
  return e instanceof Xe(e).Element;
}
function Af(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = Xe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function _o(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: i
  } = Ft(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(i);
}
function h$(e) {
  return ["table", "td", "th"].includes(on(e));
}
function oc(e) {
  const t = /firefox/i.test(U0()), n = Ft(e), r = n.backdropFilter || n.WebkitBackdropFilter;
  return n.transform !== "none" || n.perspective !== "none" || (r ? r !== "none" : !1) || t && n.willChange === "filter" || t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective"].some((i) => n.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const a = n.contain;
    return a != null ? a.includes(i) : !1;
  });
}
function sc() {
  return /^((?!chrome|android).)*safari/i.test(U0());
}
function lc(e) {
  return ["html", "body", "#document"].includes(on(e));
}
const Tf = Math.min, Xr = Math.max, Pa = Math.round;
function z0(e) {
  const t = Ft(e);
  let n = parseFloat(t.width), r = parseFloat(t.height);
  const i = gt(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = Pa(n) !== a || Pa(r) !== o;
  return s && (n = a, r = o), {
    width: n,
    height: r,
    fallback: s
  };
}
function q0(e) {
  return vt(e) ? e : e.contextElement;
}
const K0 = {
  x: 1,
  y: 1
};
function er(e) {
  const t = q0(e);
  if (!gt(t))
    return K0;
  const n = t.getBoundingClientRect(), {
    width: r,
    height: i,
    fallback: a
  } = z0(t);
  let o = (a ? Pa(n.width) : n.width) / r, s = (a ? Pa(n.height) : n.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: o,
    y: s
  };
}
function An(e, t, n, r) {
  var i, a;
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = q0(e);
  let c = K0;
  t && (r ? vt(r) && (c = er(r)) : c = er(e));
  const u = s ? Xe(s) : window, d = sc() && n;
  let f = (o.left + (d && ((i = u.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / c.x, m = (o.top + (d && ((a = u.visualViewport) == null ? void 0 : a.offsetTop) || 0)) / c.y, p = o.width / c.x, v = o.height / c.y;
  if (s) {
    const h = Xe(s), g = r && vt(r) ? Xe(r) : r;
    let w = h.frameElement;
    for (; w && r && g !== h; ) {
      const $ = er(w), y = w.getBoundingClientRect(), b = getComputedStyle(w);
      y.x += (w.clientLeft + parseFloat(b.paddingLeft)) * $.x, y.y += (w.clientTop + parseFloat(b.paddingTop)) * $.y, f *= $.x, m *= $.y, p *= $.x, v *= $.y, f += y.x, m += y.y, w = Xe(w).frameElement;
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
  return ((H0(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function ko(e) {
  return vt(e) ? {
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
  if ((i || !i && r !== "fixed") && ((on(n) !== "body" || _o(a)) && (o = ko(n)), gt(n))) {
    const u = An(n);
    s = er(n), c.x = u.x + n.clientLeft, c.y = u.y + n.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - o.scrollLeft * s.x + c.x,
    y: t.y * s.y - o.scrollTop * s.y + c.y
  };
}
function G0(e) {
  return An(ln(e)).left + ko(e).scrollLeft;
}
function v$(e) {
  const t = ln(e), n = ko(e), r = e.ownerDocument.body, i = Xr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Xr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let o = -n.scrollLeft + G0(e);
  const s = -n.scrollTop;
  return Ft(r).direction === "rtl" && (o += Xr(t.clientWidth, r.clientWidth) - i), {
    width: i,
    height: a,
    x: o,
    y: s
  };
}
function hi(e) {
  if (on(e) === "html")
    return e;
  const t = e.assignedSlot || e.parentNode || Af(e) && e.host || ln(e);
  return Af(t) ? t.host : t;
}
function Y0(e) {
  const t = hi(e);
  return lc(t) ? t.ownerDocument.body : gt(t) && _o(t) ? t : Y0(t);
}
function Qr(e, t) {
  var n;
  t === void 0 && (t = []);
  const r = Y0(e), i = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Xe(r);
  return i ? t.concat(a, a.visualViewport || [], _o(r) ? r : []) : t.concat(r, Qr(r));
}
function g$(e, t) {
  const n = Xe(e), r = ln(e), i = n.visualViewport;
  let a = r.clientWidth, o = r.clientHeight, s = 0, c = 0;
  if (i) {
    a = i.width, o = i.height;
    const u = sc();
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
  const n = An(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = gt(e) ? er(e) : {
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
function Rf(e, t, n) {
  let r;
  if (t === "viewport")
    r = g$(e, n);
  else if (t === "document")
    r = v$(ln(e));
  else if (vt(t))
    r = y$(t, n);
  else {
    const o = {
      ...t
    };
    if (sc()) {
      var i, a;
      const s = Xe(e);
      o.x -= ((i = s.visualViewport) == null ? void 0 : i.offsetLeft) || 0, o.y -= ((a = s.visualViewport) == null ? void 0 : a.offsetTop) || 0;
    }
    r = o;
  }
  return Sa(r);
}
function b$(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Qr(e).filter((s) => vt(s) && on(s) !== "body"), i = null;
  const a = Ft(e).position === "fixed";
  let o = a ? hi(e) : e;
  for (; vt(o) && !lc(o); ) {
    const s = Ft(o), c = oc(o);
    s.position === "fixed" && (i = null), (a ? !c && !i : !c && s.position === "static" && !!i && ["absolute", "fixed"].includes(i.position)) ? r = r.filter((d) => d !== o) : i = s, o = hi(o);
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
    const f = Rf(t, d, i);
    return u.top = Xr(f.top, u.top), u.right = Tf(f.right, u.right), u.bottom = Tf(f.bottom, u.bottom), u.left = Xr(f.left, u.left), u;
  }, Rf(t, s, i));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function E$(e) {
  return z0(e);
}
function Mf(e, t) {
  return !gt(e) || Ft(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function C$(e) {
  let t = hi(e);
  for (; gt(t) && !lc(t); ) {
    if (oc(t))
      return t;
    t = hi(t);
  }
  return null;
}
function If(e, t) {
  const n = Xe(e);
  if (!gt(e))
    return n;
  let r = Mf(e, t);
  for (; r && h$(r) && Ft(r).position === "static"; )
    r = Mf(r, t);
  return r && (on(r) === "html" || on(r) === "body" && Ft(r).position === "static" && !oc(r)) ? n : r || C$(e) || n;
}
function $$(e, t, n) {
  const r = gt(t), i = ln(t), a = An(e, !0, n === "fixed", t);
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (r || !r && n !== "fixed")
    if ((on(t) !== "body" || _o(i)) && (o = ko(t)), gt(t)) {
      const c = An(t, !0);
      s.x = c.x + t.clientLeft, s.y = c.y + t.clientTop;
    } else
      i && (s.x = G0(i));
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
  isElement: vt,
  getDimensions: E$,
  getOffsetParent: If,
  getDocumentElement: ln,
  getScale: er,
  async getElementRects(e) {
    let {
      reference: t,
      floating: n,
      strategy: r
    } = e;
    const i = this.getOffsetParent || If, a = this.getDimensions;
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
  isRTL: (e) => Ft(e).direction === "rtl"
};
function _$(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: a = !0,
    elementResize: o = !0,
    animationFrame: s = !1
  } = r, c = i && !s, u = c || a ? [...vt(e) ? Qr(e) : e.contextElement ? Qr(e.contextElement) : [], ...Qr(t)] : [];
  u.forEach((v) => {
    c && v.addEventListener("scroll", n, {
      passive: !0
    }), a && v.addEventListener("resize", n);
  });
  let d = null;
  o && (d = new ResizeObserver(() => {
    n();
  }), vt(e) && !s && d.observe(e), !vt(e) && e.contextElement && !s && d.observe(e.contextElement), d.observe(t));
  let f, m = s ? An(e) : null;
  s && p();
  function p() {
    const v = An(e);
    m && (v.x !== m.x || v.y !== m.y || v.width !== m.width || v.height !== m.height) && n(), m = v, f = requestAnimationFrame(p);
  }
  return n(), () => {
    var v;
    u.forEach((h) => {
      c && h.removeEventListener("scroll", n), a && h.removeEventListener("resize", n);
    }), (v = d) == null || v.disconnect(), d = null, s && cancelAnimationFrame(f);
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
lr && (Xn = document.createElement("div"), Xn.className = "adm-px-tester", Xn.style.setProperty("--size", "10"), document.body.appendChild(Xn), tr = document.createElement("div"), tr.className = "adm-px-tester", document.body.appendChild(tr));
function On(e) {
  return Xn === null || tr === null || Xn.getBoundingClientRect().height === 10 ? e : (tr.style.setProperty("--size", e.toString()), tr.getBoundingClientRect().height);
}
const fn = "adm-popover", P$ = {
  placement: "top",
  defaultVisible: !1,
  stopPropagation: ["click"],
  getContainer: () => document.body
}, X0 = de((e, t) => {
  const n = U(P$, e), {
    mode: r = "light"
  } = n, i = F$(n.placement), [a, o] = te({
    value: n.visible,
    defaultValue: n.defaultVisible,
    onChange: n.onVisibleChange
  });
  ve(t, () => ({
    show: () => o(!0),
    hide: () => o(!1),
    visible: a
  }), [a]);
  const s = D(null), c = D(null), u = D(null), d = nn(n.stopPropagation, B(n, l.createElement("div", {
    className: j(fn, `${fn}-${r}`, !a && `${fn}-hidden`),
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
  }, n.content))))), [f, m] = q(null);
  function p() {
    var h, g, w;
    return $e(this, void 0, void 0, function* () {
      const $ = (g = (h = s.current) === null || h === void 0 ? void 0 : h.element) !== null && g !== void 0 ? g : null, y = c.current, b = u.current;
      if (m($), !$ || !y || !b)
        return;
      const {
        x: E,
        y: C,
        placement: k,
        middlewareData: N
      } = yield k$($, y, {
        placement: i,
        middleware: [f$(On(12)), d$({
          padding: On(4),
          crossAxis: !1,
          limiter: m$()
        }), l$(), c$(), e$({
          element: b,
          padding: On(12)
        })]
      });
      Object.assign(y.style, {
        left: `${E}px`,
        top: `${C}px`
      });
      const P = k.split("-")[0], O = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
      }[P], {
        x: R,
        y: F
      } = (w = N.arrow) !== null && w !== void 0 ? w : {};
      Object.assign(b.style, {
        left: R != null ? `${R}px` : "",
        top: F != null ? `${F}px` : "",
        right: "",
        bottom: "",
        [O]: "calc(var(--arrow-size) * -1)"
      });
      const _ = {
        top: "0deg",
        bottom: "180deg",
        left: "270deg",
        right: "90deg"
      }[P];
      b.style.setProperty("--arrow-icon-rotate", _);
    });
  }
  _e(() => {
    p();
  }), G(() => {
    if (!f || !n.trigger)
      return;
    function h() {
      o((g) => !g);
    }
    return f.addEventListener("click", h), () => {
      f.removeEventListener("click", h);
    };
  }, [f, n.trigger]), G(() => {
    const h = c.current;
    if (!(!f || !h))
      return _$(f, h, p, {
        elementResize: typeof ResizeObserver < "u"
      });
  }, [f]), vd(() => {
    !n.trigger || o(!1);
  }, [() => {
    var h;
    return (h = s.current) === null || h === void 0 ? void 0 : h.element;
  }, c], ["click", "touchmove"]);
  const v = Ya(a, !1, n.destroyOnHide);
  return l.createElement(l.Fragment, null, l.createElement(S$, {
    ref: s
  }, n.children), v && yr(n.getContainer, d));
}), dn = "adm-popover-menu", N$ = de((e, t) => {
  const n = D(null);
  ve(t, () => n.current, []);
  const r = Ue((a) => {
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
      className: j(`${dn}-item`, "adm-plain-anchor", a.disabled && `${dn}-item-disabled`),
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
    className: j(dn, e.className),
    content: i
  }), e.children);
}), Q0 = ie(X0, {
  Menu: N$
});
function A$(...e) {
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
  } = e, p = ot(rc), {
    locale: v
  } = pe(), h = e.hasFeedback !== void 0 ? e.hasFeedback : p.hasFeedback, g = e.layout || p.layout, w = (t = e.disabled) !== null && t !== void 0 ? t : p.disabled, $ = (() => {
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
  })(), y = a ? l.createElement("label", {
    className: `${We}-label`,
    htmlFor: u
  }, a, $, o && l.createElement(Q0, {
    content: o,
    mode: "dark",
    trigger: "click"
  }, l.createElement("span", {
    className: `${We}-label-help`,
    onClick: (E) => {
      E.preventDefault();
    }
  }, l.createElement(cy, null)))) : null, b = e.description || h ? l.createElement(l.Fragment, null, e.description, h && l.createElement(l.Fragment, null, e.errors.map((E, C) => l.createElement("div", {
    key: `error-${C}`,
    className: `${We}-feedback-error`
  }, E)), e.warnings.map((E, C) => l.createElement("div", {
    key: `warning-${C}`,
    className: `${We}-feedback-warning`
  }, E)))) : null;
  return B(e, l.createElement(kt.Item, {
    style: r,
    title: g === "vertical" && y,
    prefix: g === "horizontal" && y,
    extra: i,
    description: b,
    className: j(We, n, `${We}-${g}`, {
      [`${We}-hidden`]: d,
      [`${We}-has-error`]: e.errors.length
    }),
    disabled: w,
    onClick: e.onClick,
    clickable: e.clickable,
    arrow: f
  }, l.createElement("div", {
    className: j(`${We}-child`, `${We}-child-position-${m}`)
  }, l.createElement("div", {
    className: j(`${We}-child-inner`)
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
    trigger: $ = "onChange",
    validateTrigger: y = $,
    onClick: b,
    shouldUpdate: E,
    dependencies: C,
    clickable: k,
    arrow: N
  } = e, P = pi(e, ["className", "style", "label", "help", "extra", "hasFeedback", "name", "required", "noStyle", "hidden", "layout", "childElementPosition", "description", "disabled", "rules", "children", "messageVariables", "trigger", "validateTrigger", "onClick", "shouldUpdate", "dependencies", "clickable", "arrow"]), {
    name: O
  } = ot(rc), {
    validateTrigger: R
  } = ot(j0), F = A$(y, R, $), _ = D(null), x = D(0);
  x.current += 1;
  const [S, I] = q({}), A = Ue((z, Y) => {
    I((K) => {
      const ge = Object.assign({}, K), Ee = Y.join(T$);
      return z.destroy ? delete ge[Ee] : ge[Ee] = z, ge;
    });
  }, [I]);
  function V(z, Y, K, ge) {
    var Ee, me;
    if (u && !d)
      return z;
    const ye = (Ee = K == null ? void 0 : K.errors) !== null && Ee !== void 0 ? Ee : [], Ce = Object.keys(S).reduce((Fe, cn) => {
      var bt, ut;
      const _r = (ut = (bt = S[cn]) === null || bt === void 0 ? void 0 : bt.errors) !== null && ut !== void 0 ? ut : [];
      return _r.length && (Fe = [...Fe, ..._r]), Fe;
    }, ye), In = (me = K == null ? void 0 : K.warnings) !== null && me !== void 0 ? me : [], je = Object.keys(S).reduce((Fe, cn) => {
      var bt, ut;
      const _r = (ut = (bt = S[cn]) === null || bt === void 0 ? void 0 : bt.warnings) !== null && ut !== void 0 ? ut : [];
      return _r.length && (Fe = [...Fe, ..._r]), Fe;
    }, In);
    return B(e, l.createElement(M$, {
      className: t,
      style: n,
      label: r,
      extra: a,
      help: i,
      description: p,
      required: ge,
      disabled: v,
      hasFeedback: o,
      htmlFor: Y,
      errors: Ce,
      warnings: je,
      onClick: b && ((Fe) => b(Fe, _)),
      hidden: d,
      layout: f,
      childElementPosition: m,
      clickable: k,
      arrow: N
    }, l.createElement(Ef.Provider, {
      value: A
    }, z)));
  }
  const M = typeof g == "function";
  if (!s && !M && !e.dependencies)
    return V(g);
  let T = {};
  T.label = typeof r == "string" ? r : "", w && (T = Object.assign(Object.assign({}, T), w));
  const W = ot(Ef), H = (z) => {
    if (u && W) {
      const Y = z.name;
      W(z, Y);
    }
  };
  return l.createElement(ec, Object.assign({}, P, {
    name: s,
    shouldUpdate: E,
    dependencies: C,
    rules: h,
    trigger: $,
    validateTrigger: F,
    onMetaChange: H,
    messageVariables: T
  }), (z, Y, K) => {
    let ge = null;
    const Ee = c !== void 0 ? c : h && h.some((Ce) => !!(Ce && typeof Ce == "object" && Ce.required)), me = Uo(s).length && Y ? Y.name : [], ye = (me.length > 0 && O ? [O, ...me] : me).join("_");
    if (E && C && Ie("Form.Item", "`shouldUpdate` and `dependencies` shouldn't be used together."), M)
      (E || C) && !s ? ge = g(K) : (E || C || Ie("Form.Item", "`children` of render props only work with `shouldUpdate` or `dependencies`."), s && Ie("Form.Item", "Do not use `name` with `children` of render props since it's not a field."));
    else if (C && !s)
      Ie("Form.Item", "Must set `name` or use render props when `dependencies` is set.");
    else if (l.isValidElement(g)) {
      g.props.defaultValue && Ie("Form.Item", "`defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.");
      const Ce = Object.assign(Object.assign({}, g.props), z);
      B0(g) && (Ce.ref = (je) => {
        const Fe = g.ref;
        Fe && (typeof Fe == "function" && Fe(je), "current" in Fe && (Fe.current = je)), _.current = je;
      }), Ce.id || (Ce.id = ye), (/* @__PURE__ */ new Set([...Uo($), ...Uo(F)])).forEach((je) => {
        Ce[je] = (...Fe) => {
          var cn, bt, ut;
          (cn = z[je]) === null || cn === void 0 || cn.call(z, ...Fe), (ut = (bt = g.props)[je]) === null || ut === void 0 || ut.call(bt, ...Fe);
        };
      }), ge = l.createElement(R$, {
        value: z[e.valuePropName || "value"],
        update: x.current
      }, l.cloneElement(g, Ce));
    } else
      s && Ie("Form.Item", "`name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead."), ge = g;
    return V(ge, ye, Y, Ee);
  });
}, L$ = (e) => {
  const t = hd(), n = ot(Nn), r = n.getFieldsValue(e.to), i = l.useMemo(() => e.children(r, n), [JSON.stringify(r), e.children]);
  return l.createElement(l.Fragment, null, i, e.to.map((a) => l.createElement(D$, {
    key: a.toString(),
    form: n,
    namePath: a,
    onChange: t
  })));
}, D$ = Ve((e) => {
  const t = nc(e.namePath, e.form);
  return Oi(() => {
    e.onChange();
  }, [t]), null;
}), Dk = ie(DC, {
  Item: I$,
  Subscribe: L$,
  Header: k0,
  Array: T0,
  useForm: tc,
  useWatch: nc
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
  const t = U({
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
const B$ = c8([E1, Gy]), zo = () => [1, 0, 0, 1, 0, 0], Lf = (e) => e[4], Df = (e) => e[5], Mr = (e) => e[0], Ir = (e, t, n) => tm([1, 0, 0, 1, t, n], e), W$ = (e, t, n = t) => tm([t, 0, 0, n, 0, 0], e), Z$ = (e, [t, n]) => [e[0] * t + e[2] * n + e[4], e[1] * t + e[3] * n + e[5]], tm = (e, t) => [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]], qo = "adm-image-viewer", nm = (e) => {
  const {
    dragLockRef: t,
    maxZoom: n
  } = e, r = D(null), i = D(null), [{
    matrix: a
  }, o] = Ne(() => ({
    matrix: zo(),
    config: {
      tension: 200
    }
  })), s = us(r), c = us(i), u = D(!1), d = (f, m, p = !1) => {
    if (!s || !c)
      return f;
    const v = -s.width / 2, h = -s.height / 2, g = -c.width / 2, w = -c.height / 2, $ = Mr(f), y = $ * c.width, b = $ * c.height, [E, C] = Z$(f, [g, w]);
    if (m === "translate") {
      let k = E, N = C;
      if (y > s.width) {
        const P = v - (y - s.width), O = v;
        k = p ? Se(E, P, O) : xa(E, P, O, $ * 50);
      } else
        k = -y / 2;
      if (b > s.height) {
        const P = h - (b - s.height), O = h;
        N = p ? Se(C, P, O) : xa(C, P, O, $ * 50);
      } else
        N = -b / 2;
      return Ir(f, k - E, N - C);
    }
    if (m === "scale" && p) {
      const [k, N] = [y > s.width ? Se(E, v - (y - s.width), v) : -y / 2, b > s.height ? Se(C, h - (b - s.height), h) : -b / 2];
      return Ir(f, k - E, N - C);
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
      const m = Mr(a.get());
      if (t && (t.current = m !== 1), !u.current && m <= 1)
        o.start({
          matrix: zo()
        });
      else {
        const p = a.get(), v = [f.offset[0] - Lf(p), f.offset[1] - Df(p)], h = Ir(p, ...f.last ? [v[0] + f.velocity[0] * f.direction[0] * 200, v[1] + f.velocity[1] * f.direction[1] * 200] : v);
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
      const h = f.last ? Se(p, 1, v) : p;
      if ((m = e.onZoomChange) === null || m === void 0 || m.call(e, h), f.last && h <= 1)
        o.start({
          matrix: zo()
        }), t && (t.current = !1);
      else {
        if (!s)
          return;
        const g = a.get(), w = Mr(g), $ = f.origin[0] - s.width / 2, y = f.origin[1] - s.height / 2;
        let b = Ir(g, -$, -y);
        b = W$(b, h / w), b = Ir(b, $, y), o.start({
          matrix: d(b, "scale", f.last),
          immediate: !f.last
        }), t && (t.current = !0);
      }
    }
  }, {
    target: r,
    drag: {
      from: () => [Lf(a.get()), Df(a.get())],
      pointer: {
        touch: !0
      }
    },
    pinch: {
      from: () => [Mr(a.get()), 0],
      pointer: {
        touch: !0
      }
    }
  }), l.createElement("div", {
    className: `${qo}-slide`,
    onPointerMove: (f) => {
      Mr(a.get()) !== 1 && f.stopPropagation();
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
  }, i] = Ne(() => ({
    x: e.defaultIndex * n,
    config: {
      tension: 250,
      clamp: !0
    }
  })), a = e.images.length;
  function o(u, d = !1) {
    var f;
    const m = Se(u, 0, a - 1);
    (f = e.onIndexChange) === null || f === void 0 || f.call(e, m), i.start({
      x: m * n,
      immediate: d
    });
  }
  ve(t, () => ({
    swipeTo: o
  }));
  const s = D(!1), c = Nt((u) => {
    if (s.current)
      return;
    const [d] = u.offset;
    if (u.last) {
      const f = Math.floor(d / n), m = f + 1, p = Math.min(u.velocity[0] * 2e3, n) * u.direction[0];
      o(Se(Math.round((d + p) / n), f, m));
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
  }, r.to((u) => `${Se(Math.round(u / n), 0, a - 1) + 1} / ${a}`)), l.createElement(ue.div, {
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
}), Na = "adm-image-viewer", rm = {
  maxZoom: 3,
  getContainer: null,
  visible: !1
}, im = (e) => {
  var t;
  const n = U(rm, e), r = l.createElement($i, {
    visible: n.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: n.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Na}-content`
  }, n.image && l.createElement(nm, {
    image: n.image,
    onTap: () => {
      var i;
      (i = n.onClose) === null || i === void 0 || i.call(n);
    },
    maxZoom: n.maxZoom
  })), n.image && l.createElement("div", {
    className: `${Na}-footer`
  }, (t = n.renderFooter) === null || t === void 0 ? void 0 : t.call(n, n.image), l.createElement(Er, {
    position: "bottom"
  })));
  return yr(n.getContainer, r);
}, U$ = Object.assign(Object.assign({}, rm), {
  defaultIndex: 0
}), am = de((e, t) => {
  var n;
  const r = U(U$, e), [i, a] = q(r.defaultIndex), o = D(null);
  ve(t, () => ({
    swipeTo: (u, d) => {
      var f;
      a(u), (f = o.current) === null || f === void 0 || f.swipeTo(u, d);
    }
  }));
  const s = Ue((u) => {
    var d;
    a(u), (d = r.onIndexChange) === null || d === void 0 || d.call(r, u);
  }, [r.onIndexChange]), c = l.createElement($i, {
    visible: r.visible,
    disableBodyScroll: !1,
    opacity: "thick",
    afterClose: r.afterClose,
    destroyOnClose: !0
  }, l.createElement("div", {
    className: `${Na}-content`
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
    className: `${Na}-footer`
  }, (n = r.renderFooter) === null || n === void 0 ? void 0 : n.call(r, r.images[i], i), l.createElement(Er, {
    position: "bottom"
  })));
  return yr(r.getContainer, c);
}), or = /* @__PURE__ */ new Set();
function z$(e) {
  cc();
  const t = Cr(l.createElement(im, Object.assign({}, e, {
    afterClose: () => {
      var n;
      or.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return or.add(t), t;
}
function q$(e) {
  cc();
  const t = Cr(l.createElement(am, Object.assign({}, e, {
    afterClose: () => {
      var n;
      or.delete(t), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return or.add(t), t;
}
function cc() {
  or.forEach((e) => {
    e.close();
  }), or.clear();
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
      className: `${mn}-cell-mask`
    }, l.createElement("span", {
      className: `${mn}-cell-loading`
    }, l.createElement(Vl, {
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
    className: j(`${mn}-cell`, e.status === "fail" && `${mn}-cell-fail`)
  }, l.createElement(eo, {
    className: `${mn}-cell-image`,
    src: c,
    fit: s,
    onClick: e.onClick
  }), u(), d());
}, Vf = Y$;
const hn = "adm-space", X$ = {
  direction: "horizontal"
}, Q$ = (e) => {
  const t = U(X$, e), {
    direction: n,
    onClick: r
  } = t;
  return B(t, l.createElement("div", {
    className: j(hn, {
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
}, uc = Q$, $t = "adm-image-uploader", J$ = {
  disableUpload: !1,
  deletable: !0,
  deleteIcon: l.createElement(xi, {
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
}, ex = (e) => {
  const {
    locale: t
  } = pe(), n = U(J$, e), {
    columns: r
  } = n, [i, a] = te(n), [o, s] = q([]), c = D(null), u = us(c), d = D(null), [f, m] = q(80);
  _e(() => {
    const R = d.current;
    if (r && u && R) {
      const F = u.width, _ = T1(window.getComputedStyle(R).getPropertyValue("height"));
      m((F - _ * (r - 1)) / r);
    }
  }, [u == null ? void 0 : u.width]);
  const p = {
    "--cell-size": f + "px"
  };
  _e(() => {
    s((R) => R.filter((F) => F.url === void 0 ? !0 : !i.some((_) => _.url === F.url)));
  }, [i]), _e(() => {
    var R;
    (R = n.onUploadQueueChange) === null || R === void 0 || R.call(n, o.map((F) => ({
      id: F.id,
      status: F.status
    })));
  }, [o]);
  const v = D(0), {
    maxCount: h,
    onPreview: g,
    renderItem: w
  } = n;
  function $(R, F) {
    return $e(this, void 0, void 0, function* () {
      const {
        beforeUpload: _
      } = n;
      let x = R;
      return x = yield _ == null ? void 0 : _(R, F), x;
    });
  }
  function y(R) {
    return n.showFailed ? R : R.filter((F) => F.status !== "fail");
  }
  function b(R) {
    var F;
    return $e(this, void 0, void 0, function* () {
      R.persist();
      const {
        files: _
      } = R.target;
      if (!_)
        return;
      let x = [].slice.call(_);
      if (R.target.value = "", n.beforeUpload) {
        const A = x.map((V) => $(V, x));
        yield Promise.all(A).then((V) => {
          x = V.filter(Boolean);
        });
      }
      if (x.length === 0)
        return;
      if (h > 0) {
        const A = i.length + x.length - h;
        A > 0 && (x = x.slice(0, x.length - A), (F = n.onCountExceed) === null || F === void 0 || F.call(n, A));
      }
      const S = x.map((A) => ({
        id: v.current++,
        status: "pending",
        file: A
      }));
      s((A) => [...y(A), ...S]);
      const I = [];
      yield Promise.all(S.map((A, V) => $e(this, void 0, void 0, function* () {
        try {
          const M = yield n.upload(A.file);
          I[V] = M, s((T) => T.map((W) => W.id === A.id ? Object.assign(Object.assign({}, W), {
            status: "success",
            url: M.url
          }) : W));
        } catch (M) {
          throw s((T) => T.map((W) => W.id === A.id ? Object.assign(Object.assign({}, W), {
            status: "fail"
          }) : W)), M;
        }
      }))).catch((A) => console.error(A)), a((A) => A.concat(I));
    });
  }
  const E = D(null);
  function C(R) {
    E.current = G$.Multi.show({
      images: i.map((F) => F.url),
      defaultIndex: R,
      onClose: () => {
        E.current = null;
      }
    });
  }
  bi(() => {
    var R;
    (R = E.current) === null || R === void 0 || R.close();
  });
  const k = y(o), N = n.showUpload && (h === 0 || i.length + k.length < h), P = () => i.map((R, F) => {
    var _, x;
    const S = l.createElement(Vf, {
      key: (_ = R.key) !== null && _ !== void 0 ? _ : F,
      url: (x = R.thumbnailUrl) !== null && x !== void 0 ? x : R.url,
      deletable: n.deletable,
      deleteIcon: n.deleteIcon,
      imageFit: n.imageFit,
      onClick: () => {
        n.preview && C(F), g && g(F, R);
      },
      onDelete: () => $e(void 0, void 0, void 0, function* () {
        var I;
        (yield (I = n.onDelete) === null || I === void 0 ? void 0 : I.call(n, R)) !== !1 && a(i.filter((V, M) => M !== F));
      })
    });
    return w ? w(S, R, i) : S;
  }), O = l.createElement(l.Fragment, null, P(), o.map((R) => !n.showFailed && R.status === "fail" ? null : l.createElement(Vf, {
    key: R.id,
    file: R.file,
    deletable: R.status !== "pending",
    deleteIcon: n.deleteIcon,
    status: R.status,
    imageFit: n.imageFit,
    onDelete: () => {
      s(o.filter((F) => F.id !== R.id));
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
  }, l.createElement(o1, null))), !n.disableUpload && l.createElement("input", {
    capture: n.capture,
    accept: n.accept,
    multiple: n.multiple,
    type: "file",
    className: `${$t}-input`,
    onChange: b,
    "aria-hidden": !0
  })));
  return B(n, l.createElement("div", {
    className: $t,
    ref: c
  }, r ? l.createElement(em, {
    className: `${$t}-grid`,
    columns: r,
    style: p
  }, l.createElement("div", {
    className: `${$t}-gap-measure`,
    ref: d
  }), O.props.children) : l.createElement(uc, {
    className: `${$t}-space`,
    wrap: !0,
    block: !0
  }, O.props.children)));
};
const Vk = ex;
const om = () => null, Un = "adm-index-bar", tx = (e) => {
  const [t, n] = q(!1);
  return l.createElement("div", {
    className: j(`${Un}-sidebar`, {
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
      className: j(`${Un}-sidebar-item`, {
        [`${Un}-sidebar-item-active`]: a
      }),
      "data-index": r
    }, l.createElement("div", null, i)));
  }));
}, zn = "adm-index-bar", nx = {
  sticky: !0
}, rx = de((e, t) => {
  const n = U(nx, e), r = On(35), i = D(null), a = [], o = [];
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
  const [s, c] = q(() => {
    const f = a[0];
    return f ? f.index : null;
  });
  ve(t, () => ({
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
    className: j(`${zn}`, {
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
  const t = U(ax, e), [n, r] = q(!1), i = G5((p) => $e(void 0, void 0, void 0, function* () {
    try {
      yield t.loadMore(p);
    } catch (v) {
      throw r(!0), v;
    }
  })), a = D(null), [o, s] = q({}), c = D(o), [u, d] = q(), {
    run: f
  } = ja(() => $e(void 0, void 0, void 0, function* () {
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
    function v() {
      f();
    }
    return u.addEventListener("scroll", v), () => {
      u.removeEventListener("scroll", v);
    };
  }, [u]);
  function m() {
    return $e(this, void 0, void 0, function* () {
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
  } = pe();
  return e.hasMore ? e.failed ? l.createElement("span", null, l.createElement("span", {
    className: `${sm}-failed-text`
  }, t.InfiniteScroll.failedToLoad), l.createElement("a", {
    onClick: () => {
      e.retry();
    }
  }, t.InfiniteScroll.retry)) : l.createElement(l.Fragment, null, l.createElement("span", null, t.common.loading), l.createElement(S1, null)) : l.createElement("span", null, t.InfiniteScroll.noMore);
}, Bk = ox;
const Xi = "adm-input", lx = {
  defaultValue: "",
  onlyShowClearWhenFocus: !0
}, cx = de((e, t) => {
  const n = U(lx, e), [r, i] = te(n), [a, o] = q(!1), s = D(!1), c = D(null), {
    locale: u
  } = pe();
  ve(t, () => ({
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
  _e(() => {
    var p;
    if (!!n.enterKeyHint)
      return (p = c.current) === null || p === void 0 || p.setAttribute("enterkeyhint", n.enterKeyHint), () => {
        var v;
        (v = c.current) === null || v === void 0 || v.removeAttribute("enterkeyhint");
      };
  }, [n.enterKeyHint]);
  function f() {
    let p = r;
    n.type === "number" && (p = p && Se(parseFloat(p), n.min, n.max).toString()), p !== r && i(p);
  }
  const m = (() => !n.clearable || !r || n.readOnly ? !1 : n.onlyShowClearWhenFocus ? a : !0)();
  return B(n, l.createElement("div", {
    className: j(`${Xi}`, n.disabled && `${Xi}-disabled`)
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
      i(""), (p = n.onClear) === null || p === void 0 || p.call(n), W8() && s.current && (s.current = !1, (v = c.current) === null || v === void 0 || v.blur());
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
  } = P1(n, i[s]);
  return Fi(() => {
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
    return l.createElement(br, {
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
}), Zk = k1;
const dx = (e) => {
  const {
    action: t
  } = e;
  return B(e.action, l.createElement(rn, {
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
}, mx = {
  actions: [],
  closeOnAction: !1,
  closeOnMaskClick: !1,
  getContainer: null
}, cm = (e) => {
  const t = U(mx, e), n = l.createElement(l.Fragment, null, !!t.image && l.createElement("div", {
    className: Tt("image-container")
  }, l.createElement(eo, {
    src: t.image,
    alt: "modal header image",
    width: "100%"
  })), !!t.header && l.createElement("div", {
    className: Tt("header")
  }, l.createElement(li, null, t.header)), !!t.title && l.createElement("div", {
    className: Tt("title")
  }, t.title), l.createElement("div", {
    className: Tt("content")
  }, typeof t.content == "string" ? l.createElement(li, null, t.content) : t.content), l.createElement(uc, {
    direction: "vertical",
    block: !0,
    className: j(Tt("footer"), t.actions.length === 0 && Tt("footer-empty"))
  }, t.actions.map((r, i) => l.createElement(dx, {
    key: r.key,
    action: r,
    onAction: () => $e(void 0, void 0, void 0, function* () {
      var a, o, s;
      yield Promise.all([(a = r.onClick) === null || a === void 0 ? void 0 : a.call(r), (o = t.onAction) === null || o === void 0 ? void 0 : o.call(t, r, i)]), t.closeOnAction && ((s = t.onClose) === null || s === void 0 || s.call(t));
    })
  }))));
  return l.createElement(G1, {
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
const Ks = /* @__PURE__ */ new Set();
function fc(e) {
  const t = Cr(l.createElement(cm, Object.assign({}, e, {
    afterClose: () => {
      var n;
      Ks.delete(t.close), (n = e.afterClose) === null || n === void 0 || n.call(e);
    }
  })));
  return Ks.add(t.close), t;
}
function hx(e) {
  const t = {
    confirmText: vi().locale.Modal.ok
  }, n = U(t, e);
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
  } = vi(), n = U(px, {
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
        onClick: () => $e(this, void 0, void 0, function* () {
          var i;
          yield (i = n.onConfirm) === null || i === void 0 ? void 0 : i.call(n), r(!0);
        })
      }, {
        key: "cancel",
        text: n.cancelText,
        onClick: () => $e(this, void 0, void 0, function* () {
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
  const t = U(yx, e), {
    back: n,
    backArrow: r
  } = t;
  return B(t, l.createElement("div", {
    className: j(qn)
  }, l.createElement("div", {
    className: `${qn}-left`,
    role: "button"
  }, n !== null && l.createElement("div", {
    className: `${qn}-back`,
    onClick: t.onBack
  }, r && l.createElement("span", {
    className: `${qn}-back-arrow`
  }, r === !0 ? l.createElement(sy, null) : r), l.createElement("span", {
    "aria-hidden": "true"
  }, n)), t.left), l.createElement("div", {
    className: `${qn}-title`
  }, t.children), l.createElement("div", {
    className: `${qn}-right`
  }, t.right)));
}, Uk = bx;
const Rt = "adm-notice-bar", wx = {
  color: "default",
  delay: 2e3,
  speed: 50,
  wrap: !1,
  icon: l.createElement(dy, null)
}, Ex = Ve((e) => {
  const t = U(wx, e), n = D(null), r = D(null), [i, a] = q(!0), o = t.speed, s = D(!0), c = D(!1);
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
  return E6(() => {
    s.current = !1, u();
  }, t.delay), Fi(() => {
    u();
  }, n), Ml(() => {
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
  }, l.createElement(xi, {
    className: `${Rt}-close-icon`
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
const be = "adm-number-keyboard", $x = {
  defaultVisible: !1,
  randomOrder: !1,
  showCloseButton: !0,
  confirmText: null,
  closeOnConfirm: !0,
  safeArea: !0,
  destroyOnClose: !1,
  forceRender: !1
}, xx = (e) => {
  const t = U($x, e), {
    visible: n,
    title: r,
    getContainer: i,
    confirmText: a,
    customKey: o,
    randomOrder: s,
    showCloseButton: c,
    onInput: u
  } = t, d = D(null), f = re(() => {
    const b = ["1", "2", "3", "4", "5", "6", "7", "8", "9"], E = s ? Cx(b) : b, C = Array.isArray(o) ? o : [o];
    return E.push("0"), a ? (C.length === 2 && E.splice(9, 0, C.pop()), E.push(C[0] || "")) : (E.splice(9, 0, C[0] || ""), E.push(C[1] || "BACKSPACE")), E;
  }, [o, a, s, s && n]), m = D(-1), p = D(-1), v = Wt(() => {
    var b;
    (b = t.onDelete) === null || b === void 0 || b.call(t);
  }), h = () => {
    m.current = window.setTimeout(() => {
      v(), p.current = window.setInterval(v, 150);
    }, 700);
  }, g = () => {
    clearTimeout(m.current), clearInterval(p.current);
  }, w = (b, E) => {
    var C, k;
    switch (b.preventDefault(), E) {
      case "BACKSPACE":
        v == null || v();
        break;
      case "OK":
        (C = t.onConfirm) === null || C === void 0 || C.call(t), t.closeOnConfirm && ((k = t.onClose) === null || k === void 0 || k.call(t));
        break;
      default:
        E !== "" && (u == null || u(E));
        break;
    }
  }, $ = () => !c && !r ? null : l.createElement("div", {
    className: j(`${be}-header`, {
      [`${be}-header-with-title`]: !!r
    })
  }, l.createElement("div", {
    className: `${be}-title`,
    "aria-label": r
  }, r), c && l.createElement("span", {
    className: `${be}-header-close-button`,
    onClick: () => {
      var b;
      (b = t.onClose) === null || b === void 0 || b.call(t);
    },
    role: "grid",
    title: "CLOSE",
    tabIndex: -1
  }, l.createElement(u1, null))), y = (b, E) => {
    const C = /^\d$/.test(b), k = j(`${be}-key`, {
      [`${be}-key-number`]: C,
      [`${be}-key-sign`]: !C && b,
      [`${be}-key-mid`]: E === 9 && !!a && f.length < 12
    }), N = b ? {
      role: "grid",
      title: b,
      tabIndex: -1
    } : void 0;
    return l.createElement("div", Object.assign({
      key: b,
      className: k,
      onTouchStart: () => {
        b === "BACKSPACE" && h();
      },
      onTouchEnd: (P) => {
        w(P, b), b === "BACKSPACE" && g();
      }
    }, N), b === "BACKSPACE" ? l.createElement(ku, null) : b);
  };
  return l.createElement(ki, {
    visible: n,
    getContainer: i,
    mask: !1,
    afterClose: t.afterClose,
    afterShow: t.afterShow,
    className: `${be}-popup`,
    stopPropagation: t.stopPropagation,
    destroyOnClose: t.destroyOnClose,
    forceRender: t.forceRender
  }, B(t, l.createElement("div", {
    ref: d,
    className: be,
    onMouseDown: (b) => {
      b.preventDefault();
    }
  }, $(), l.createElement("div", {
    className: `${be}-wrapper`
  }, l.createElement("div", {
    className: j(`${be}-main`, {
      [`${be}-main-confirmed-style`]: !!a
    })
  }, f.map(y)), !!a && l.createElement("div", {
    className: `${be}-confirm`
  }, l.createElement("div", {
    className: `${be}-key ${be}-key-extra ${be}-key-bs`,
    onTouchStart: () => {
      h();
    },
    onTouchEnd: (b) => {
      w(b, "BACKSPACE"), g();
    },
    title: "BACKSPACE",
    role: "grid",
    tabIndex: -1
  }, l.createElement(ku, null)), l.createElement("div", {
    className: `${be}-key ${be}-key-extra ${be}-key-ok`,
    onTouchEnd: (b) => w(b, "OK"),
    role: "grid",
    tabIndex: -1,
    "aria-label": a
  }, a))), t.safeArea && l.createElement("div", {
    className: `${be}-footer`
  }, l.createElement(Er, {
    position: "bottom"
  })))));
}, qk = xx;
const Lr = "adm-page-indicator", _x = {
  color: "primary",
  direction: "horizontal"
}, kx = Ve((e) => {
  const t = U(_x, e), n = [];
  for (let r = 0; r < t.total; r++)
    n.push(l.createElement("div", {
      key: r,
      className: j(`${Lr}-dot`, {
        [`${Lr}-dot-active`]: t.current === r
      })
    }));
  return B(t, l.createElement("div", {
    className: j(Lr, `${Lr}-${t.direction}`, `${Lr}-color-${t.color}`)
  }, n));
}), Sx = kx;
const Ct = "adm-passcode-input", jf = {
  defaultValue: "",
  length: 6,
  plain: !1,
  error: !1,
  seperated: !1,
  caret: !0
}, Ox = de((e, t) => {
  const n = U(jf, e), r = n.length > 0 && n.length < 1 / 0 ? Math.floor(n.length) : jf.length, {
    locale: i
  } = pe(), [a, o] = q(!1), [s, c] = te(n), u = D(null), d = D(null);
  G(() => {
    var h;
    s.length >= r && ((h = n.onFill) === null || h === void 0 || h.call(n, s));
  }, [s, r]);
  const f = () => {
    var h, g;
    n.keyboard || (h = d.current) === null || h === void 0 || h.focus(), o(!0), (g = n.onFocus) === null || g === void 0 || g.call(n);
  };
  G(() => {
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
  ve(t, () => ({
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
    const h = [], g = s.split(""), w = g.length, $ = Se(g.length, 0, r - 1);
    for (let y = 0; y < r; y++)
      h.push(l.createElement("div", {
        className: j(`${Ct}-cell`, {
          [`${Ct}-cell-caret`]: n.caret && w === y && a,
          [`${Ct}-cell-focused`]: $ === y && a,
          [`${Ct}-cell-dot`]: !n.plain && g[y]
        }),
        key: y
      }, g[y] && n.plain ? g[y] : ""));
    return h;
  }, v = j(Ct, {
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
const Dr = "adm-progress-bar", Fx = {
  percent: 0,
  rounded: !0,
  text: !1
}, Px = (e) => {
  const t = U(Fx, e), n = {
    width: `${t.percent}%`
  }, r = function() {
    return t.text === !0 ? `${t.percent}%` : typeof t.text == "function" ? t.text(t.percent) : t.text;
  }();
  return B(t, l.createElement("div", {
    className: j(Dr, t.rounded && `${Dr}-rounded`)
  }, l.createElement("div", {
    className: `${Dr}-trail`
  }, l.createElement("div", {
    className: `${Dr}-fill`,
    style: n
  })), Vt(r) && l.createElement("div", {
    className: `${Dr}-text`
  }, r)));
}, Gk = Px;
const Kn = "adm-progress-circle", Nx = (e) => {
  const t = U({
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
}, Yk = Nx;
const Ax = (e) => new Promise((t) => setTimeout(t, e)), Qi = "adm-pull-to-refresh", Tx = {
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
  } = pe(), i = U(Tx, {
    refreshingText: `${r.common.loading}...`,
    pullingText: r.PullToRefresh.pulling,
    canReleaseText: r.PullToRefresh.canRelease,
    completeText: r.PullToRefresh.complete
  }, e), a = (t = i.headHeight) !== null && t !== void 0 ? t : On(40), o = (n = i.threshold) !== null && n !== void 0 ? n : On(60), [s, c] = q("pulling"), [u, d] = Ne(() => ({
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
    return $e(this, void 0, void 0, function* () {
      d.start({
        height: a
      }), c("refreshing");
      try {
        yield i.onRefresh(), c("complete");
      } catch (g) {
        throw p(), g;
      }
      i.completeDelay > 0 && (yield Ax(i.completeDelay)), p();
    });
  }
  Nt((g) => {
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
    const [, $] = g.movement, y = Math.ceil($);
    if (g.first && y > 0) {
      let k = function(N) {
        return "scrollTop" in N ? N.scrollTop : N.scrollY;
      };
      const E = g.event.target;
      if (!E || !(E instanceof Element))
        return;
      let C = da(E);
      for (; ; ) {
        if (!C || k(C) > 0)
          return;
        if (C instanceof Window)
          break;
        C = da(C.parentNode);
      }
      m.current = !0;
    }
    if (!m.current)
      return;
    w.cancelable && w.preventDefault(), w.stopPropagation();
    const b = Math.max(xa(y, 0, 0, a * 5, 0.5), 0);
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
    eventOptions: wi ? {
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
const um = Js(null), Mx = {
  disabled: !1,
  defaultValue: null
}, Ix = (e) => {
  const t = U(Mx, e), [n, r] = te({
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
  const t = U(Lx, e), n = ot(um);
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
  }, r && l.createElement(X1, null));
  return B(t, l.createElement("label", {
    className: j(pn, {
      [`${pn}-checked`]: r,
      [`${pn}-disabled`]: a,
      [`${pn}-block`]: t.block
    })
  }, l.createElement(Q1, {
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
  const t = U(jx, e), [n, r] = te(t), i = D(null), a = Array(t.count).fill(null);
  function o(c, u) {
    return l.createElement("div", {
      className: j(`${vn}-star`, {
        [`${vn}-star-active`]: n >= c,
        [`${vn}-star-half`]: u,
        [`${vn}-star-readonly`]: t.readOnly
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
      tap: d
    } = c, f = i.current;
    if (!f)
      return;
    const m = f.getBoundingClientRect(), p = (u - m.left) / m.width * t.count, v = t.allowHalf ? Math.ceil(p * 2) / 2 : Math.ceil(p), h = Se(v, 0, t.count);
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
    className: j(vn, {
      [`${vn}-half`]: t.allowHalf
    }),
    role: "radiogroup",
    "aria-readonly": t.readOnly,
    ref: i
  }, s()), a.map((c, u) => l.createElement("div", {
    key: u,
    className: j(`${vn}-box`)
  }, t.allowHalf && o(u + 0.5, !0), o(u + 1, !1)))));
}, Jk = Bx;
const Vr = "adm-result", Wx = {
  success: s1,
  error: Xa,
  info: d1,
  waiting: c1,
  warning: f1
}, Zx = {
  status: "info"
}, Hx = (e) => {
  const t = U(Zx, e), {
    status: n,
    title: r,
    description: i,
    icon: a
  } = t;
  if (!n)
    return null;
  const o = a || l.createElement(Wx[n]);
  return B(t, l.createElement("div", {
    className: j(Vr, `${Vr}-${n}`)
  }, l.createElement("div", {
    className: `${Vr}-icon`
  }, o), l.createElement("div", {
    className: `${Vr}-title`
  }, r), i ? l.createElement("div", {
    className: `${Vr}-description`
  }, i) : null));
}, eS = Hx;
const Te = "adm-result-page", Ux = {
  success: s1,
  error: Xa,
  info: d1,
  waiting: c1,
  warning: f1
}, zx = {
  status: "info",
  details: []
}, qx = (e) => {
  const t = U(zx, e), {
    status: n,
    title: r,
    description: i,
    details: a,
    icon: o,
    primaryButtonText: s,
    secondaryButtonText: c,
    onPrimaryButtonClick: u,
    onSecondaryButtonClick: d
  } = t, f = o || l.createElement(Ux[n]), [m, p] = q(!0), v = Vt(c), h = Vt(s);
  return B(t, l.createElement("div", {
    className: Te
  }, l.createElement("div", {
    className: `${Te}-header`
  }, l.createElement("div", {
    className: `${Te}-icon`
  }, f), l.createElement("div", {
    className: `${Te}-title`
  }, r), Vt(i) ? l.createElement("div", {
    className: `${Te}-description`
  }, i) : null, a.length ? l.createElement("div", {
    className: `${Te}-details`
  }, (m ? a.slice(0, 3) : a).map((g, w) => l.createElement("div", {
    className: j(`${Te}-detail`, g.bold && `${Te}-detail-bold`),
    key: w
  }, l.createElement("span", null, g.label), l.createElement("span", null, g.value))), a.length > 3 && l.createElement("div", {
    onClick: () => p((g) => !g)
  }, l.createElement("div", {
    className: j(`${Te}-collapse`, !m && `${Te}-collapse-active`)
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
  className: j(`${Kx}`)
}, e.children)), tS = ie(qx, {
  Card: Gx
});
const Kt = "adm-search-bar", Yx = {
  clearable: !0,
  onlyShowClearWhenFocus: !1,
  showCancelButton: !1,
  defaultValue: "",
  clearOnCancel: !0,
  icon: l.createElement(fy, null)
}, Xx = de((e, t) => {
  const {
    locale: n
  } = pe(), r = U(Yx, {
    cancelText: n.common.cancel
  }, e), [i, a] = te(r), [o, s] = q(!1), c = D(null), u = D(!1);
  ve(t, () => ({
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
    className: j(Kt, {
      [`${Kt}-active`]: o
    })
  }, l.createElement("div", {
    className: `${Kt}-input-box`
  }, r.icon && l.createElement("div", {
    className: `${Kt}-input-box-icon`
  }, r.icon), l.createElement(lm, {
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
  const t = U(Jx, e), [n, r] = te({
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
    const s = (n || []).includes(o.value), c = o.disabled || t.disabled, u = j(`${gn}-item`, {
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
      className: j(`${Me}-item`, {
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
    className: j(`${Me}-extra-space`, s && `${Me}-item-active-next-sibling`)
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
    }, f = j({
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
    const d = c <= t && c >= n, f = j({
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
function fm(e) {
  return !e && e !== 0 && !Number.isNaN(e) || !String(e).trim();
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
function Hr(e) {
  var t = String(e);
  if (dc(e)) {
    var n = Number(t.slice(t.indexOf("e-") + 2)), r = t.match(/\.(\d+)/);
    return r != null && r[1] && (n += r[1].length), n;
  }
  return t.includes(".") && mm(t) ? t.length - t.indexOf(".") - 1 : 0;
}
function dm(e) {
  var t = String(e);
  if (dc(e)) {
    if (e > Number.MAX_SAFE_INTEGER)
      return String(Gs() ? BigInt(e).toString() : Number.MAX_SAFE_INTEGER);
    if (e < Number.MIN_SAFE_INTEGER)
      return String(Gs() ? BigInt(e).toString() : Number.MIN_SAFE_INTEGER);
    t = e.toFixed(Hr(t));
  }
  return Jr(t).fullStr;
}
function mm(e) {
  return typeof e == "number" ? !Number.isNaN(e) : e ? /^\s*-?\d+(\.\d+)?\s*$/.test(e) || /^\s*-?\d+\.\s*$/.test(e) || /^\s*-?\.\d+\s*$/.test(e) : !1;
}
var s_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Pi(this, e), De(this, "origin", ""), De(this, "negative", void 0), De(this, "integer", void 0), De(this, "decimal", void 0), De(this, "decimalLen", void 0), De(this, "empty", void 0), De(this, "nan", void 0), fm(t)) {
      this.empty = !0;
      return;
    }
    if (this.origin = String(t), t === "-" || Number.isNaN(t)) {
      this.nan = !0;
      return;
    }
    var n = t;
    if (dc(n) && (n = Number(n)), n = typeof n == "string" ? n : dm(n), mm(n)) {
      var r = Jr(n);
      this.negative = r.negative;
      var i = r.trimStr.split(".");
      this.integer = BigInt(i[0]);
      var a = i[1] || "0";
      this.decimal = BigInt(a), this.decimalLen = a.length;
    } else
      this.nan = !0;
  }
  return Ni(e, [{
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
      var a = Math.max(this.getDecimalStr().length, n.getDecimalStr().length), o = this.alignDecimal(a), s = n.alignDecimal(a), c = r(o, s).toString(), u = i(a), d = Jr(c), f = d.negativeStr, m = d.trimStr, p = "".concat(f).concat(m.padStart(u + 1, "0"));
      return new e("".concat(p.slice(0, -u), ".").concat(p.slice(-u)));
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
      return n ? this.isInvalidate() ? "" : Jr("".concat(this.getMark()).concat(this.getIntegerStr(), ".").concat(this.getDecimalStr())).fullStr : this.origin;
    }
  }]), e;
}(), l_ = /* @__PURE__ */ function() {
  function e(t) {
    if (Pi(this, e), De(this, "origin", ""), De(this, "number", void 0), De(this, "empty", void 0), fm(t)) {
      this.empty = !0;
      return;
    }
    this.origin = String(t), this.number = Number(t);
  }
  return Ni(e, [{
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
      var a = Math.max(Hr(this.number), Hr(r));
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
      var a = Math.max(Hr(this.number), Hr(r));
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
      return n ? this.isInvalidate() ? "" : dm(this.number) : this.origin;
    }
  }]), e;
}();
function He(e) {
  return Gs() ? new s_(e) : new l_(e);
}
function mc(e, t, n) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (e === "")
    return "";
  var i = Jr(e), a = i.negativeStr, o = i.integerStr, s = i.decimalStr, c = "".concat(t).concat(s), u = "".concat(a).concat(o);
  if (n >= 0) {
    var d = Number(s[n]);
    if (d >= 5 && !r) {
      var f = He(e).add("".concat(a, "0.").concat("0".repeat(n)).concat(10 - d));
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
  } = pe(), d = () => ({
    left: `${(t - n) / (r - n) * 100}%`,
    right: "auto"
  }), [f, m] = q(!1), p = Nt((g) => {
    var w;
    if (i)
      return;
    g.first && (c.current = t);
    const $ = g.xy[0] - g.initial[0], y = (w = e.trackRef.current) === null || w === void 0 ? void 0 : w.offsetWidth;
    if (!y)
      return;
    const b = $ / Math.ceil(y) * (r - n);
    s(c.current + b, g.first, g.last), m(!g.last);
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
}, f_ = u_, jr = "adm-slider", d_ = {
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
  const n = U(d_, e), {
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
    const I = He(x), A = mc(I.toString(), ".", S);
    return He(A).toNumber();
  }
  function p(x) {
    const S = Math.max(v(c), v(x[0]), v(x[1]));
    return n.range ? x.map((I) => m(I, S)) : m(x[1], S);
  }
  function v(x) {
    return (`${x}`.split(".")[1] || "").length;
  }
  function h(x) {
    var S;
    (S = n.onAfterChange) === null || S === void 0 || S.call(n, p(x));
  }
  let g = n.value;
  n.range && typeof n.value == "number" && (Ie("Slider", "When `range` prop is enabled, the `value` prop should be an array, like: [0, 0]"), g = [0, n.value]);
  const [w, $] = te({
    value: g,
    defaultValue: (t = n.defaultValue) !== null && t !== void 0 ? t : n.range ? [r, r] : r,
    onChange: n.onChange
  }), y = d(f(w));
  function b(x) {
    const S = d(x), I = y;
    S[0] === I[0] && S[1] === I[1] || $(p(S));
  }
  const E = D(null), C = `${100 * (y[1] - y[0]) / (i - r)}%`, k = `${100 * (y[0] - r) / (i - r)}%`, N = re(() => {
    if (o)
      return Object.keys(o).map(parseFloat).sort((x, S) => x - S);
    if (s) {
      const x = [];
      for (let S = He(r); S.lessEquals(He(i)); S = S.add(c))
        x.push(S.toNumber());
      return x;
    }
    return [];
  }, [o, s, c, r, i]);
  function P(x) {
    const S = x < r ? r : x > i ? i : x;
    let I = r;
    if (N.length)
      I = ql(N, S);
    else {
      const A = Math.round((S - r) / c), V = He(A).multi(c);
      I = He(r).add(V.toString()).toNumber();
    }
    return I;
  }
  const O = D(0), R = (x) => {
    if (O.current > 0 || (x.stopPropagation(), a))
      return;
    const S = E.current;
    if (!S)
      return;
    const I = S.getBoundingClientRect().left, A = (x.clientX - I) / Math.ceil(S.offsetWidth) * (i - r) + r, V = P(A);
    let M;
    n.range ? Math.abs(V - y[0]) > Math.abs(V - y[1]) ? M = [y[0], V] : M = [V, y[1]] : M = [n.min, V], b(M), h(M);
  }, F = D(), _ = (x) => l.createElement(f_, {
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
      I && (O.current += 1, F.current = y);
      const V = P(S), M = F.current;
      if (!M)
        return;
      const T = [...M];
      T[x] = V, b(T), A && (h(T), window.setTimeout(() => {
        O.current -= 1;
      }, 100));
    },
    "aria-label": n["aria-label"]
  });
  return B(n, l.createElement("div", {
    className: j(jr, {
      [`${jr}-disabled`]: a
    })
  }, l.createElement("div", {
    className: `${jr}-track-container`,
    onClick: R
  }, l.createElement("div", {
    className: `${jr}-track`,
    onClick: R,
    ref: E
  }, l.createElement("div", {
    className: `${jr}-fill`,
    style: {
      width: C,
      left: k
    }
  }), n.ticks && l.createElement(i_, {
    points: N,
    min: r,
    max: i,
    lowerBound: y[0],
    upperBound: y[1]
  }), n.range && _(0), _(1))), o && l.createElement(o_, {
    min: r,
    max: i,
    marks: o,
    lowerBound: y[0],
    upperBound: y[1]
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
var pc = {}, h_ = Ti.exports.default;
Object.defineProperty(pc, "__esModule", {
  value: !0
});
pc.default = p_;
var Bf = h_(l);
function p_(e) {
  var t = Bf.useRef();
  t.current = e;
  var n = Bf.useCallback(function() {
    for (var r, i = arguments.length, a = new Array(i), o = 0; o < i; o++)
      a[o] = arguments[o];
    return (r = t.current) === null || r === void 0 ? void 0 : r.call.apply(r, [t].concat(a));
  }, []);
  return n;
}
var sr = {}, vc = {};
Object.defineProperty(vc, "__esModule", {
  value: !0
});
vc.default = v_;
function v_() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
var g_ = Ri.exports.default, y_ = Ti.exports.default;
Object.defineProperty(sr, "__esModule", {
  value: !0
});
sr.useLayoutUpdateEffect = sr.default = void 0;
var Ys = y_(l), b_ = g_(vc), Xs = (0, b_.default)() ? Ys.useLayoutEffect : Ys.useEffect, w_ = Xs;
sr.default = w_;
var E_ = function(t, n) {
  var r = Ys.useRef(!0);
  Xs(function() {
    if (!r.current)
      return t();
  }, n), Xs(function() {
    return r.current = !1, function() {
      r.current = !0;
    };
  }, []);
};
sr.useLayoutUpdateEffect = E_;
var gc = {}, C_ = Ti.exports.default, $_ = Ri.exports.default;
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
var yc = Ri.exports.default;
Object.defineProperty(hm, "__esModule", {
  value: !0
});
var k_ = hm.default = S_, Wf = yc(hc.exports), Zf = yc(pc), Hf = sr, Uf = yc(gc);
function es(e) {
  return e !== void 0;
}
function S_(e, t) {
  var n = t || {}, r = n.defaultValue, i = n.value, a = n.onChange, o = n.postState, s = (0, Uf.default)(function() {
    return es(i) ? i : es(r) ? typeof r == "function" ? r() : r : typeof e == "function" ? e() : e;
  }), c = (0, Wf.default)(s, 2), u = c[0], d = c[1], f = i !== void 0 ? i : u, m = o ? o(f) : f, p = (0, Zf.default)(a), v = (0, Uf.default)([f]), h = (0, Wf.default)(v, 2), g = h[0], w = h[1];
  (0, Hf.useLayoutUpdateEffect)(function() {
    var y = g[0];
    u !== y && p(u, y);
  }, [g]), (0, Hf.useLayoutUpdateEffect)(function() {
    es(i) || d(i);
  }, [i]);
  var $ = (0, Zf.default)(function(y, b) {
    d(y, b), w([f], b);
  });
  return [m, $];
}
const Gn = "adm-stepper", O_ = {
  step: 1,
  disabled: !1,
  allowEmpty: !1
};
function F_(e, t) {
  const n = U(O_, e), {
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
  } = pe();
  ve(t, () => ({
    focus: () => {
      var M;
      (M = F.current) === null || M === void 0 || M.focus();
    },
    blur: () => {
      var M;
      (M = F.current) === null || M === void 0 || M.blur();
    },
    get nativeElement() {
      var M, T;
      return (T = (M = F.current) === null || M === void 0 ? void 0 : M.nativeElement) !== null && T !== void 0 ? T : null;
    }
  }));
  const g = (M) => (f !== void 0 ? mc(M.toString(), ".", f) : M).toString(), w = (M) => m ? M.toString() : M.toNumber(), $ = (M) => {
    if (M === "")
      return null;
    if (v)
      return String(v(M));
    const T = He(M);
    return T.isInvalidate() ? null : T.toString();
  }, y = (M) => M === null ? "" : p ? p(M) : g(M), [b, E] = k_(r, {
    value: i,
    onChange: (M) => {
      a == null || a(M);
    }
  }), [C, k] = q(() => y(b));
  function N(M) {
    if (M.isNaN())
      return;
    let T = M;
    if (u !== void 0) {
      const W = He(u);
      T.lessEquals(W) && (T = W);
    }
    if (c !== void 0) {
      const W = He(c);
      W.lessEquals(T) && (T = W);
    }
    f !== void 0 && (T = He(g(w(T)))), E(w(T));
  }
  const P = (M) => {
    k(M);
    const T = $(M);
    T === null ? n.allowEmpty ? E(null) : E(r) : N(He(T));
  }, [O, R] = q(!1), F = l.useRef(null);
  function _(M) {
    R(M), M && k(b != null ? String(b) : "");
  }
  G(() => {
    var M, T, W;
    O && ((W = (T = (M = F.current) === null || M === void 0 ? void 0 : M.nativeElement) === null || T === void 0 ? void 0 : T.select) === null || W === void 0 || W.call(T));
  }, [O]), G(() => {
    O || k(y(b));
  }, [O, b, f]);
  const x = (M) => {
    let T = He(s);
    M || (T = T.negate()), N(He(b != null ? b : 0).add(T.toString()));
  }, S = () => {
    x(!1);
  }, I = () => {
    x(!0);
  }, A = () => o ? !0 : b === null ? !1 : u !== void 0 ? b <= u : !1, V = () => o ? !0 : b === null ? !1 : c !== void 0 ? b >= c : !1;
  return B(n, l.createElement("div", {
    className: j(Gn, {
      [`${Gn}-active`]: O
    })
  }, l.createElement(rn, {
    className: `${Gn}-minus`,
    onClick: S,
    disabled: A(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.decrease
  }, l.createElement(ly, null)), l.createElement("div", {
    className: `${Gn}-middle`
  }, l.createElement(lm, {
    ref: F,
    className: `${Gn}-input`,
    onFocus: (M) => {
      var T;
      _(!0), (T = n.onFocus) === null || T === void 0 || T.call(n, M);
    },
    value: C,
    onChange: (M) => {
      o || P(M);
    },
    disabled: o,
    onBlur: (M) => {
      var T;
      _(!1), (T = n.onBlur) === null || T === void 0 || T.call(n, M);
    },
    readOnly: d,
    role: "spinbutton",
    "aria-valuenow": Number(C),
    "aria-valuemax": Number(c),
    "aria-valuemin": Number(u),
    inputMode: "decimal"
  })), l.createElement(rn, {
    className: `${Gn}-plus`,
    onClick: I,
    disabled: V(),
    fill: "none",
    shape: "rectangular",
    color: "primary",
    "aria-label": h.Stepper.increase
  }, l.createElement(o1, null))));
}
const P_ = de(F_), oS = P_;
const yn = "adm-step", N_ = (e) => {
  const {
    title: t,
    description: n,
    icon: r,
    status: i = "wait"
  } = e;
  return B(e, l.createElement("div", {
    className: j(`${yn}`, `${yn}-status-${i}`)
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
}, zf = "adm-steps", A_ = "adm-step", T_ = l.createElement("span", {
  className: `${A_}-icon-dot`
}), R_ = {
  current: 0,
  direction: "horizontal"
}, M_ = (e) => {
  const t = U(R_, e), {
    direction: n,
    current: r
  } = t, i = j(zf, `${zf}-${n}`);
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
  Step: N_
});
const Gt = "adm-swipe-action", I_ = {
  rightActions: [],
  leftActions: [],
  closeOnTouchOutside: !0,
  closeOnAction: !0,
  stopPropagation: []
}, L_ = de((e, t) => {
  const n = U(I_, e), r = D(null), i = D(null), a = D(null);
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
  }, d] = Ne(() => ({
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
  const v = Nt((w) => {
    var $;
    if (m.current = w.cancel, !w.intentional || (w.down && (f.current = !0), !f.current))
      return;
    const [y] = w.offset;
    if (w.last) {
      const b = s(), E = c();
      let C = y + w.velocity[0] * w.direction[0] * 50;
      y > 0 ? C = Math.max(0, C) : y < 0 ? C = Math.min(0, C) : C = 0;
      const k = ql([-E, 0, b], C);
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
    }), p();
  }
  ve(t, () => ({
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
  function g(w) {
    var $, y;
    const b = ($ = w.color) !== null && $ !== void 0 ? $ : "light";
    return l.createElement(rn, {
      key: w.key,
      className: `${Gt}-action-button`,
      style: {
        "--background-color": (y = D_[b]) !== null && y !== void 0 ? y : b
      },
      onClick: (E) => {
        var C, k;
        n.closeOnAction && h(), (C = w.onClick) === null || C === void 0 || C.call(w, E), (k = n.onAction) === null || k === void 0 || k.call(n, w, E);
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
  const [t, n] = q(e), r = D(t);
  return G(() => {
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
const dt = "adm-swiper", B_ = {
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
const Z_ = de(Tl((e, t) => {
  const n = U(W_, e), [r] = q({}), i = D(null), a = n.direction === "vertical", o = n.slideSize / 100, s = n.trackOffset / 100, {
    validChildren: c,
    count: u
  } = re(() => {
    let d = 0;
    return {
      validChildren: l.Children.map(n.children, (m) => l.isValidElement(m) ? m.type !== wm ? (Ie("Swiper", "The children of `Swiper` must be `Swiper.Item` components."), null) : (d++, m) : null),
      count: d
    };
  }, [n.children]);
  return u === 0 || !c ? (Ie("Swiper", "`Swiper` needs at least one child."), null) : () => {
    let d = n.loop;
    o * (u - 1) < 1 && (d = !1);
    const f = D(null);
    function m() {
      const T = f.current;
      return T ? (a ? T.offsetHeight : T.offsetWidth) * n.slideSize / 100 : 0;
    }
    const [p, v, h] = z5(n.defaultIndex), [g, w, $] = V_(!1);
    function y(T) {
      let W = 0, H = u - 1;
      return n.stuckAtBoundary && (W += s / o, H -= (1 - o - s) / o), Se(T, W, H);
    }
    const [{
      position: b
    }, E] = Ne(() => ({
      position: y(p) * 100,
      config: {
        tension: 200,
        friction: 30
      },
      onRest: () => {
        if ($.current || !d)
          return;
        const T = b.get(), W = 100 * u, H = ts(T, W);
        H !== T && E.start({
          position: H,
          immediate: !0
        });
      }
    }), [u]), C = D(null);
    function k() {
      var T;
      (T = C.current) === null || T === void 0 || T.call(C), $.current = !1;
    }
    const N = Nt((T) => {
      if (C.current = T.cancel, !T.intentional || (T.first && !Ji && (Ji = r), Ji !== r))
        return;
      Ji = T.last ? void 0 : r;
      const W = m();
      if (!W)
        return;
      const H = a ? 1 : 0, z = T.offset[H], Y = T.direction[H], K = T.velocity[H];
      if (w(!0), !T.last)
        E.start({
          position: z * 100 / W,
          immediate: !0
        });
      else {
        const ge = Math.floor(z / W), Ee = ge + 1, me = Math.round((z + K * 2e3 * Y) / W);
        P(Se(me, ge, Ee)), window.setTimeout(() => {
          w(!1);
        });
      }
    }, {
      transform: ([T, W]) => [-T, -W],
      from: () => {
        const T = m();
        return [b.get() / 100 * T, b.get() / 100 * T];
      },
      triggerAllEvents: !0,
      bounds: () => {
        if (d)
          return {};
        const T = m(), W = y(0) * T, H = y(u - 1) * T;
        return a ? {
          top: W,
          bottom: H
        } : {
          left: W,
          right: H
        };
      },
      rubberband: n.rubberband,
      axis: a ? "y" : "x",
      preventScroll: !a,
      pointer: {
        touch: !0
      }
    });
    function P(T, W = !1) {
      var H;
      const z = Math.round(T), Y = d ? ts(z, u) : Se(z, 0, u - 1);
      Y !== h() && ((H = n.onIndexChange) === null || H === void 0 || H.call(n, Y)), v(Y), E.start({
        position: (d ? z : y(z)) * 100,
        immediate: W
      });
    }
    function O() {
      P(Math.round(b.get() / 100) + 1);
    }
    function R() {
      P(Math.round(b.get() / 100) - 1);
    }
    ve(t, () => ({
      swipeTo: P,
      swipeNext: O,
      swipePrev: R
    })), _e(() => {
      const T = c.length - 1;
      p > T && P(T, !0);
    });
    const {
      autoplay: F,
      autoplayInterval: _
    } = n, x = () => {
      i.current = window.setTimeout(() => {
        O(), x();
      }, _);
    };
    G(() => {
      if (!(!F || g))
        return x(), () => {
          i.current && window.clearTimeout(i.current);
        };
    }, [F, _, g, u]);
    function S() {
      return d ? l.createElement("div", {
        className: `${dt}-track-inner`
      }, l.Children.map(c, (T, W) => l.createElement(ue.div, {
        className: j(`${dt}-slide`, {
          [`${dt}-slide-active`]: p === W
        }),
        style: {
          [a ? "y" : "x"]: b.to((H) => {
            let z = -H + W * 100;
            const Y = u * 100, K = Y / 2;
            return z = ts(z + K, Y) - K, `${z}%`;
          }),
          [a ? "top" : "left"]: `-${W * 100}%`
        }
      }, T))) : l.createElement(ue.div, {
        className: `${dt}-track-inner`,
        style: {
          [a ? "y" : "x"]: b.to((T) => `${-T}%`)
        }
      }, l.Children.map(c, (T, W) => l.createElement("div", {
        className: j(`${dt}-slide`, {
          [`${dt}-slide-active`]: p === W
        })
      }, T)));
    }
    const I = {
      "--slide-size": `${n.slideSize}%`,
      "--track-offset": `${n.trackOffset}%`
    }, A = Object.assign({}, n.allowTouchMove ? N() : {}), V = {};
    for (const T of n.stopPropagation) {
      const W = B_[T];
      V[W] = function(H) {
        H.stopPropagation();
      };
    }
    const M = j_(A, V);
    return B(n, l.createElement("div", {
      className: j(dt, `${dt}-${n.direction}`),
      style: I
    }, l.createElement("div", Object.assign({
      ref: f,
      className: j(`${dt}-track`, {
        [`${dt}-track-allow-touch-move`]: n.allowTouchMove
      }),
      onClickCapture: (T) => {
        $.current && T.stopPropagation(), k();
      }
    }, M), S()), n.indicator === void 0 ? l.createElement("div", {
      className: `${dt}-indicator`
    }, l.createElement(Sx, Object.assign({}, n.indicatorProps, {
      total: u,
      current: p,
      direction: n.direction
    }))) : n.indicator(u, p)));
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
  const t = U(U_, e), n = t.disabled || t.loading || !1, [r, i] = q(!1), {
    locale: a
  } = pe(), [o, s] = te({
    value: t.checked,
    defaultValue: t.defaultChecked,
    onChange: t.onChange
  });
  function c() {
    return $e(this, void 0, void 0, function* () {
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
      if (O1(d)) {
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
    className: j(bn, {
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
const q_ = () => null, Mt = "adm-tab-bar", K_ = {
  safeArea: !1
}, G_ = (e) => {
  var t;
  const n = U(K_, e);
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
      return d ? l.createElement(l.Fragment, null, l.createElement(xs, {
        content: s.props.badge,
        className: `${Mt}-icon-badge`
      }, d), f) : f ? l.createElement(xs, {
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
  })), n.safeArea && l.createElement(Er, {
    position: "bottom"
  })));
}, fS = ie(G_, {
  Item: q_
});
const qf = "adm-tag", Y_ = {
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
  const n = U(X_, e), r = (t = Y_[n.color]) !== null && t !== void 0 ? t : n.color, i = {
    "--border-color": r,
    "--text-color": n.fill === "outline" ? r : "#ffffff",
    "--background-color": n.fill === "outline" ? "transparent" : r
  };
  return B(n, l.createElement("span", {
    style: i,
    onClick: n.onClick,
    className: j(qf, {
      [`${qf}-round`]: n.round
    })
  }, n.children));
}, dS = Q_;
const Br = "adm-text-area", Em = {
  rows: 2,
  showCount: !1,
  autoSize: !1,
  defaultValue: ""
}, Cm = de((e, t) => {
  const n = U(Em, e), {
    autoSize: r,
    showCount: i,
    maxLength: a
  } = n, [o, s] = te(Object.assign(Object.assign({}, n), {
    value: n.value === null ? "" : n.value
  }));
  n.value === null && J8("TextArea", "`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.");
  const c = D(null), u = D("auto"), d = D(null);
  ve(t, () => ({
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
  })), _e(() => {
    if (!r)
      return;
    const v = c.current, h = d.current;
    if (!v || (v.style.height = u.current, !h))
      return;
    let g = h.scrollHeight;
    if (typeof r == "object") {
      const w = window.getComputedStyle(v), $ = parseFloat(w.lineHeight);
      r.minRows && (g = Math.max(g, r.minRows * $)), r.maxRows && (g = Math.min(g, r.maxRows * $));
    }
    u.current = `${g}px`, v.style.height = `${g}px`;
  }, [o, r]);
  const f = D(!1);
  let m;
  const p = ia(o).length;
  return typeof i == "function" ? m = i(p, a) : i && (m = l.createElement("div", {
    className: `${Br}-count`
  }, a === void 0 ? p : p + "/" + a)), B(n, l.createElement("div", {
    className: Br
  }, l.createElement("textarea", {
    ref: c,
    className: `${Br}-element`,
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
    className: `${Br}-element ${Br}-element-hidden`,
    value: o,
    rows: n.rows,
    "aria-hidden": !0,
    readOnly: !0
  })));
});
Cm.defaultProps = Em;
const mS = Cm;
const It = "adm-toast", J_ = {
  maskClickable: !0,
  stopPropagation: ["click"]
}, ek = (e) => {
  const t = U(J_, e), {
    maskClickable: n,
    content: r,
    icon: i,
    position: a
  } = t, o = re(() => {
    if (i == null)
      return null;
    switch (i) {
      case "success":
        return l.createElement(l1, {
          className: `${It}-icon-success`
        });
      case "fail":
        return l.createElement(xi, {
          className: `${It}-icon-fail`
        });
      case "loading":
        return l.createElement(Vl, {
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
  return l.createElement($i, {
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
  }, o), l.createElement(li, null, r))));
};
let jt = null, ns = null;
const sa = {
  duration: 2e3,
  position: "center",
  maskClickable: !0
}, tk = (e) => l.createElement(ek, Object.assign({}, e));
function nk(e) {
  const t = U(sa, typeof e == "string" ? {
    content: e
  } : e), n = l.createElement(tk, Object.assign({}, t, {
    onClose: () => {
      jt = null;
    }
  }));
  return jt ? jt.replace(n) : jt = Cr(n), ns && window.clearTimeout(ns), t.duration !== 0 && (ns = window.setTimeout(() => {
    $m();
  }, t.duration)), jt;
}
function $m() {
  jt == null || jt.close(), jt = null;
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
  const t = U(ak, e), n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), [s, c, u] = re(() => {
    const p = xm(t.options, i), v = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map();
    function g(w, $) {
      $.forEach((y) => {
        h.set(y[r], w), v.set(y[r], y), y[i] && g(y, y[i]);
      });
    }
    return g(void 0, t.options), [p, v, h];
  }, [t.options]), d = (p) => {
    var v;
    const h = [];
    let g = p;
    for (; g; )
      h.push(g), g = u.get(g[r]);
    const w = h.reverse().map(($) => $[r]);
    o(w), (v = t.onChange) === null || v === void 0 || v.call(t, w, {
      options: h
    });
  }, f = (p = [], v) => p.map((h) => {
    const g = h[r] === a[v];
    return l.createElement("div", {
      key: h[r],
      className: j(`${ea}-item`, {
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
        className: j(`${ea}-column`),
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
  const t = U({
    options: [],
    fieldNames: {},
    allSelectText: [],
    defaultExpandKeys: [],
    defaultValue: []
  }, e);
  G(() => {
    Ie("TreeSelect", "TreeSelect.Multiple has been deprecated.");
  }, []);
  const n = t.fieldNames.label || "label", r = t.fieldNames.value || "value", i = t.fieldNames.children || "children", [a, o] = te({
    value: t.expandKeys,
    defaultValue: t.defaultExpandKeys
  }), [s, c] = te({
    value: t.value,
    defaultValue: t.defaultValue
  }), u = (k) => {
    const N = [], P = (O) => {
      var R;
      !O || (!((R = O[i]) === null || R === void 0) && R.length ? O[i].forEach((F) => P(F)) : N.push(O[r]));
    };
    return P(k), N;
  }, [d, f, m] = re(() => {
    const k = xm(t.options, i), N = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map();
    function O(R, F) {
      F.forEach((_) => {
        P.set(_[r], R), N.set(_[r], _), _[i] && O(_, _[i]);
      });
    }
    return O(void 0, t.options), [k, N, P];
  }, [t.options]), p = re(() => {
    let k = [];
    return s.forEach((N) => {
      const P = f.get(N);
      k = k.concat(u(P));
    }), k;
  }, [s, f]), v = re(() => {
    const k = /* @__PURE__ */ new Map(), N = (P) => {
      const O = m.get(P);
      !O || (k.set(O[r], !0), N(O[r]));
    };
    return p.forEach((P) => {
      k.set(P, !0), N(P);
    }), k;
  }, [m, s]), h = (k) => {
    var N;
    let P = [...k], O = [];
    const R = (_) => {
      _.forEach((x) => {
        var S;
        if (O.includes(x))
          return;
        const I = m.get(x);
        if (!I)
          return;
        const A = ((S = I[i]) === null || S === void 0 ? void 0 : S.map((V) => V[r])) || [];
        A.every((V) => P.includes(V)) && (P.push(I[r]), O = O.concat(A));
      });
    };
    for (let _ = 0; _ < d; _++)
      R(P);
    P = P.filter((_) => !O.includes(_));
    const F = P.map((_) => f.get(_));
    c(P), (N = t.onChange) === null || N === void 0 || N.call(t, P, F);
  }, g = (k) => {
    var N;
    const P = [];
    let O = k;
    for (; O; )
      P.unshift(O), O = m.get(O[r]);
    const R = P.map((F) => F[r]);
    o(R), (N = t.onExpand) === null || N === void 0 || N.call(t, R, P);
  }, w = (k, N) => {
    var P;
    const O = (P = t.selectAllText) === null || P === void 0 ? void 0 : P[N];
    if (!O)
      return;
    let R = [];
    k.forEach((_) => {
      R = R.concat(u(_));
    });
    const F = R.every((_) => p.includes(_));
    return l.createElement("div", {
      onClick: () => {
        h(F ? p.filter((_) => !R.includes(_)) : p.concat(R));
      },
      className: `${nt}-item`
    }, O);
  }, $ = (k, N) => {
    var P;
    const O = (P = t.selectAllText) === null || P === void 0 ? void 0 : P[N];
    if (!O)
      return;
    const R = k.map((x) => x[r]), F = R.every((x) => p.includes(x)), _ = F ? !1 : R.some((x) => p.includes(x));
    return l.createElement("div", {
      onClick: () => {
        h(F ? p.filter((x) => !R.includes(x)) : p.concat(R));
      },
      className: j(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Ju, {
      className: `${nt}-item-checkbox`,
      checked: F,
      indeterminate: _
    }), O);
  }, y = (k) => {
    const N = a.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        N || g(k);
      },
      className: j(`${nt}-item`, {
        [`${nt}-item-expand`]: N
      })
    }, k[n], !!v.get(k[r]) && l.createElement("div", {
      className: `${nt}-dot`
    }));
  }, b = (k) => {
    const N = p.includes(k[r]);
    return l.createElement("div", {
      key: k[r],
      onClick: () => {
        h(N ? p.filter((P) => P !== k[r]) : [...p, k[r]]);
      },
      className: j(`${nt}-item`, `${nt}-item-leaf`)
    }, l.createElement(Ju, {
      className: `${nt}-item-checkbox`,
      checked: N
    }), k[n]);
  }, E = (k = [], N) => k.length === 0 ? void 0 : d === N + 1 ? l.createElement(l.Fragment, null, $(k, N), k.map((O) => b(O))) : l.createElement(l.Fragment, null, w(k, N), k.map((O) => y(O))), C = () => {
    var k;
    const N = [];
    for (let P = 0; P < d; P++) {
      let O = `${100 / d}%`;
      d === 2 && P === 0 && (O = "33.33%"), d === 2 && P === 1 && (O = "66.67%");
      const R = l.createElement("div", {
        key: P,
        className: j(`${nt}-column`),
        style: {
          width: O
        }
      }, E(P === 0 ? t.options : (k = f.get(a[P - 1])) === null || k === void 0 ? void 0 : k[i], P));
      N.push(R);
    }
    return N;
  };
  return B(t, l.createElement("div", {
    className: nt
  }, C()));
}, pS = ie(ok, {
  Multiple: sk
});
const wn = "adm-virtual-input", lk = {
  defaultValue: ""
}, ck = de((e, t) => {
  const n = U(lk, e), [r, i] = te(n), a = D(null), o = D(null), [s, c] = q(!1), {
    locale: u
  } = pe();
  function d() {
    const h = a.current;
    if (!h || document.activeElement !== h)
      return;
    const g = o.current;
    !g || (g.scrollLeft = g.clientWidth);
  }
  _e(() => {
    d();
  }, [r]), G(() => {
    s && d();
  }, [s]), ve(t, () => ({
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
    className: j(wn, {
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
const Kf = "adm-water-mark", uk = {
  fullPage: !0
}, fk = (e) => {
  const t = U(uk, e), {
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
  } = t, [w, $] = q("");
  return G(() => {
    const y = document.createElement("canvas"), b = window.devicePixelRatio, E = y.getContext("2d"), C = `${(r + a) * b}px`, k = `${(i + o) * b}px`, N = a * b, P = o * b;
    if (y.setAttribute("width", C), y.setAttribute("height", k), E) {
      if (c) {
        E.translate(N / 2, P / 2), E.rotate(Math.PI / 180 * Number(s));
        const O = new Image();
        O.crossOrigin = "anonymous", O.referrerPolicy = "no-referrer", O.onload = () => {
          E.drawImage(O, -u * b / 2, -d * b / 2, u * b, d * b), E.restore(), $(y.toDataURL());
        }, O.src = c;
      } else if (f) {
        E.textBaseline = "middle", E.textAlign = "center", E.translate(N / 2, P / 2), E.rotate(Math.PI / 180 * Number(s));
        const O = Number(h) * b;
        E.font = `${m} normal ${p} ${O}px/${P}px ${g}`, E.fillStyle = v, Array.isArray(f) ? f.forEach((R, F) => E.fillText(R, 0, F * O)) : E.fillText(f, 0, 0), E.restore(), $(y.toDataURL());
      }
    } else
      throw new Error("Canvas is not supported in the current environment");
  }, [r, i, s, m, p, a, o, g, v, c, f, h]), B(t, l.createElement("div", {
    className: j(Kf, {
      [`${Kf}-full-page`]: t.fullPage
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
  const t = U(dk, e), {
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
    className: j(En)
  }, n && l.createElement("div", {
    className: `${En}-label`
  }, l.createElement(nf, null, n)), r && r.length > 0 && l.createElement("div", {
    className: `${En}-links`
  }, r.map((d, f) => l.createElement(l.Fragment, {
    key: f
  }, l.createElement("a", {
    href: d.href,
    rel: "noopener noreferrer",
    onClick: (m) => u(d, f, m)
  }, d.text), f !== r.length - 1 && l.createElement(nf, {
    direction: "vertical"
  })))), i && l.createElement("div", {
    className: `${En}-content`
  }, i), a && a.length > 0 && l.createElement("div", {
    className: `${En}-chips`
  }, a.map((d, f) => l.createElement("div", {
    key: f,
    onClick: () => c(d, f),
    className: j(`${En}-chip`, {
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
  L9 as CascaderView,
  G1 as CenterPopup,
  Xu as CheckList,
  Ju as Checkbox,
  Ok as Collapse,
  gk as ConfigProvider,
  Fk as DatePicker,
  Pk as DatePickerView,
  Nk as Dialog,
  nf as Divider,
  S1 as DotLoading,
  Ak as Dropdown,
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
  kt as List,
  Zk as Loading,
  $i as Mask,
  Hk as Modal,
  Uk as NavBar,
  zk as NoticeBar,
  qk as NumberKeyboard,
  Sx as PageIndicator,
  Kk as PasscodeInput,
  W1 as Picker,
  jl as PickerView,
  Q0 as Popover,
  ki as Popup,
  Gk as ProgressBar,
  Yk as ProgressCircle,
  Xk as PullToRefresh,
  Qk as Radio,
  Jk as Rate,
  eS as Result,
  tS as ResultPage,
  Er as SafeArea,
  N1 as ScrollMask,
  nS as SearchBar,
  rS as Selector,
  iS as SideBar,
  zi as Skeleton,
  aS as Slider,
  uc as Space,
  Vl as SpinLoading,
  oS as Stepper,
  sS as Steps,
  lS as SwipeAction,
  cS as Swiper,
  uS as Switch,
  fS as TabBar,
  Yu as Tabs,
  dS as Tag,
  mS as TextArea,
  hS as Toast,
  pS as TreeSelect,
  vS as VirtualInput,
  gS as WaterMark,
  Mb as createErrorBlock,
  $k as reduceMotion,
  xk as restoreMotion,
  vk as setDefaultConfig
};
