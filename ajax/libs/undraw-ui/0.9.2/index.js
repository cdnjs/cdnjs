import { h, render, defineComponent, ref, reactive, inject, withDirectives, openBlock, createElementBlock, createVNode, unref, normalizeClass, Transition, withCtx, createElementVNode, createCommentVNode, createTextVNode, toDisplayString, nextTick, pushScopeId, popScopeId, computed, renderSlot, createBlock, resolveComponent, watch, createSlots, useCssVars, normalizeStyle, onMounted, vShow, toRefs, withKeys, Fragment, renderList, onUnmounted, toRef, withModifiers, vModelText, provide, useSlots } from "vue";
import { ElButton, ClickOutside, ElLink, ElInfiniteScroll, ElDialog, ElForm, ElFormItem, ElInput, ElScrollbar, ElCarousel, ElTag, ElAvatar, ElPopover, ElImage, ElPagination } from "element-plus";
import { ElAvatar as z, ElButton as L, ElCarousel as T, ElDialog as M, ElImage as D, ElInput as U, ElLink as O, ElPagination as H, ElPopover as R, ElScrollbar as P, ElTag as q, ElInfiniteScroll as G } from "element-plus";
function isArray(e) {
  return typeof Array.isArray == "function" ? Array.isArray(e) : Object.prototype.toString.call(e) === "[object Array]";
}
function isObject$2(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function isNumber(e) {
  return !isNaN(Number(e));
}
function isFunction$2(e) {
  return typeof e == "function";
}
function isString(e) {
  return typeof e == "string";
}
function isBoolean(e) {
  return typeof e == "boolean";
}
function isEmpty(e) {
  return isArray(e) ? e.length === 0 : isObject$2(e) ? Object.keys(e).length === 0 : e === "" || e === void 0 || e === null;
}
const isNull = (e, n) => isEmpty(e) ? n : e;
function cloneDeep(e) {
  if (!e || typeof e != "object")
    return e;
  if (e.constructor === Date)
    return new Date(e);
  if (e.constructor === RegExp)
    return new RegExp(e);
  const n = Array.isArray(e) ? [] : {};
  for (let t in e)
    e.hasOwnProperty(t) && (typeof e[t] == "object" ? n[t] = cloneDeep(e[t]) : n[t] = e[t]);
  return n;
}
function deepTree(e, { parentId: n = "parentId", children: t = "children" }) {
  e = cloneDeep(e);
  const o = [], a = {};
  return e.forEach((l) => a[l.id] = l), e.forEach((l) => {
    const c = a[l[n]];
    c ? (c[t] || (c[t] = [])).push(l) : o.push(l);
  }), o;
}
function revDeepTree(e = [], { parentId: n = "parentId", children: t = "children" }) {
  const o = [], a = (l, c) => {
    l.forEach((r) => {
      r.id || (r.id = c++), r[n] = c, o.push(r), r[t] && isArray(r[t]) && a(r[t], r.id);
    });
  };
  return a(e || [], null), o;
}
const flattenDeep = (e, n = 1 / 0) => e.flat(n), withInstall = (e, n) => {
  if (e.install = (t) => {
    for (const o of [e, ...Object.values(n != null ? n : {})])
      t.component(o.name, o);
  }, n)
    for (const [t, o] of Object.entries(n))
      e[t] = o;
  return e;
};
function useBrowser() {
  const { clientWidth: e } = document.documentElement, n = navigator.userAgent.toLowerCase();
  let t = (n.match(/firefox|chrome|safari|opera/g) || "other")[0];
  (n.match(/msie|trident/g) || [])[0] && (t = "msie");
  let o = "";
  "ontouchstart" in window || n.indexOf("touch") !== -1 || n.indexOf("mobile") !== -1 ? n.indexOf("ipad") !== -1 ? o = "pad" : n.indexOf("mobile") !== -1 ? o = "mobile" : n.indexOf("android") !== -1 ? o = "androidPad" : o = "pc" : o = "pc";
  let l = "";
  switch (t) {
    case "chrome":
    case "safari":
    case "mobile":
      l = "webkit";
      break;
    case "msie":
      l = "ms";
      break;
    case "firefox":
      l = "Moz";
      break;
    case "opera":
      l = "O";
      break;
    default:
      l = "webkit";
      break;
  }
  const c = n.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let r = "full";
  e < 768 ? r = "xs" : e < 992 ? r = "sm" : e < 1200 ? r = "md" : e < 1920 ? r = "xl" : r = "full";
  const s = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), p = (n.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], i = o === "pc", d = !i, u = r === "xs" || d, m = window.innerHeight + "px";
  return {
    version: p,
    type: t,
    plat: c,
    tag: o,
    prefix: l,
    isMobile: d,
    isIOS: s,
    isPC: i,
    isMini: u,
    screen: r,
    innerHeight: m
  };
}
function createGlobalNode(e, n) {
  const t = h(e, n), o = document.createElement("div");
  return document.body.append(o), render(t, o), { vnode: t, div: o };
}
function removeGlobalNode(e) {
  try {
    e && e.remove();
  } catch {
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, assign = make_assign(), create$1 = make_create(), trim$1 = make_trim(), Global$5 = typeof window < "u" ? window : commonjsGlobal, util$6 = {
  assign,
  create: create$1,
  trim: trim$1,
  bind: bind$1,
  slice: slice$1,
  each: each$7,
  map,
  pluck: pluck$1,
  isList: isList$1,
  isFunction: isFunction$1,
  isObject: isObject$1,
  Global: Global$5
};
function make_assign() {
  return Object.assign ? Object.assign : function(n, t, o, a) {
    for (var l = 1; l < arguments.length; l++)
      each$7(Object(arguments[l]), function(c, r) {
        n[r] = c;
      });
    return n;
  };
}
function make_create() {
  if (Object.create)
    return function(n, t, o, a) {
      var l = slice$1(arguments, 1);
      return assign.apply(this, [Object.create(n)].concat(l));
    };
  {
    let e = function() {
    };
    return function(t, o, a, l) {
      var c = slice$1(arguments, 1);
      return e.prototype = t, assign.apply(this, [new e()].concat(c));
    };
  }
}
function make_trim() {
  return String.prototype.trim ? function(n) {
    return String.prototype.trim.call(n);
  } : function(n) {
    return n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
function bind$1(e, n) {
  return function() {
    return n.apply(e, Array.prototype.slice.call(arguments, 0));
  };
}
function slice$1(e, n) {
  return Array.prototype.slice.call(e, n || 0);
}
function each$7(e, n) {
  pluck$1(e, function(t, o) {
    return n(t, o), !1;
  });
}
function map(e, n) {
  var t = isList$1(e) ? [] : {};
  return pluck$1(e, function(o, a) {
    return t[a] = n(o, a), !1;
  }), t;
}
function pluck$1(e, n) {
  if (isList$1(e)) {
    for (var t = 0; t < e.length; t++)
      if (n(e[t], t))
        return e[t];
  } else
    for (var o in e)
      if (e.hasOwnProperty(o) && n(e[o], o))
        return e[o];
}
function isList$1(e) {
  return e != null && typeof e != "function" && typeof e.length == "number";
}
function isFunction$1(e) {
  return e && {}.toString.call(e) === "[object Function]";
}
function isObject$1(e) {
  return e && {}.toString.call(e) === "[object Object]";
}
var util$5 = util$6, slice = util$5.slice, pluck = util$5.pluck, each$6 = util$5.each, bind = util$5.bind, create = util$5.create, isList = util$5.isList, isFunction = util$5.isFunction, isObject = util$5.isObject, storeEngine = {
  createStore
}, storeAPI = {
  version: "2.0.12",
  enabled: !1,
  get: function(e, n) {
    var t = this.storage.read(this._namespacePrefix + e);
    return this._deserialize(t, n);
  },
  set: function(e, n) {
    return n === void 0 ? this.remove(e) : (this.storage.write(this._namespacePrefix + e, this._serialize(n)), n);
  },
  remove: function(e) {
    this.storage.remove(this._namespacePrefix + e);
  },
  each: function(e) {
    var n = this;
    this.storage.each(function(t, o) {
      e.call(n, n._deserialize(t), (o || "").replace(n._namespaceRegexp, ""));
    });
  },
  clearAll: function() {
    this.storage.clearAll();
  },
  hasNamespace: function(e) {
    return this._namespacePrefix == "__storejs_" + e + "_";
  },
  createStore: function() {
    return createStore.apply(this, arguments);
  },
  addPlugin: function(e) {
    this._addPlugin(e);
  },
  namespace: function(e) {
    return createStore(this.storage, this.plugins, e);
  }
};
function _warn() {
  var e = typeof console > "u" ? null : console;
  if (!!e) {
    var n = e.warn ? e.warn : e.log;
    n.apply(e, arguments);
  }
}
function createStore(e, n, t) {
  t || (t = ""), e && !isList(e) && (e = [e]), n && !isList(n) && (n = [n]);
  var o = t ? "__storejs_" + t + "_" : "", a = t ? new RegExp("^" + o) : null, l = /^[a-zA-Z0-9_\-]*$/;
  if (!l.test(t))
    throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
  var c = {
    _namespacePrefix: o,
    _namespaceRegexp: a,
    _testStorage: function(s) {
      try {
        var p = "__storejs__test__";
        s.write(p, p);
        var i = s.read(p) === p;
        return s.remove(p), i;
      } catch {
        return !1;
      }
    },
    _assignPluginFnProp: function(s, p) {
      var i = this[p];
      this[p] = function() {
        var u = slice(arguments, 0), m = this;
        function _() {
          if (!!i)
            return each$6(arguments, function($, g) {
              u[g] = $;
            }), i.apply(m, u);
        }
        var v = [_].concat(u);
        return s.apply(m, v);
      };
    },
    _serialize: function(s) {
      return JSON.stringify(s);
    },
    _deserialize: function(s, p) {
      if (!s)
        return p;
      var i = "";
      try {
        i = JSON.parse(s);
      } catch {
        i = s;
      }
      return i !== void 0 ? i : p;
    },
    _addStorage: function(s) {
      this.enabled || this._testStorage(s) && (this.storage = s, this.enabled = !0);
    },
    _addPlugin: function(s) {
      var p = this;
      if (isList(s)) {
        each$6(s, function(u) {
          p._addPlugin(u);
        });
        return;
      }
      var i = pluck(this.plugins, function(u) {
        return s === u;
      });
      if (!i) {
        if (this.plugins.push(s), !isFunction(s))
          throw new Error("Plugins must be function values that return objects");
        var d = s.call(this);
        if (!isObject(d))
          throw new Error("Plugins must return an object of function properties");
        each$6(d, function(u, m) {
          if (!isFunction(u))
            throw new Error("Bad plugin property: " + m + " from plugin " + s.name + ". Plugins should only return functions.");
          p._assignPluginFnProp(u, m);
        });
      }
    },
    addStorage: function(s) {
      _warn("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(s);
    }
  }, r = create(c, storeAPI, {
    plugins: []
  });
  return r.raw = {}, each$6(r, function(s, p) {
    isFunction(s) && (r.raw[p] = bind(r, s));
  }), each$6(e, function(s) {
    r._addStorage(s);
  }), each$6(n, function(s) {
    r._addPlugin(s);
  }), r;
}
var util$4 = util$6, Global$4 = util$4.Global, localStorage_1 = {
  name: "localStorage",
  read: read$5,
  write: write$5,
  each: each$5,
  remove: remove$5,
  clearAll: clearAll$5
};
function localStorage() {
  return Global$4.localStorage;
}
function read$5(e) {
  return localStorage().getItem(e);
}
function write$5(e, n) {
  return localStorage().setItem(e, n);
}
function each$5(e) {
  for (var n = localStorage().length - 1; n >= 0; n--) {
    var t = localStorage().key(n);
    e(read$5(t), t);
  }
}
function remove$5(e) {
  return localStorage().removeItem(e);
}
function clearAll$5() {
  return localStorage().clear();
}
var util$3 = util$6, Global$3 = util$3.Global, oldFFGlobalStorage = {
  name: "oldFF-globalStorage",
  read: read$4,
  write: write$4,
  each: each$4,
  remove: remove$4,
  clearAll: clearAll$4
}, globalStorage = Global$3.globalStorage;
function read$4(e) {
  return globalStorage[e];
}
function write$4(e, n) {
  globalStorage[e] = n;
}
function each$4(e) {
  for (var n = globalStorage.length - 1; n >= 0; n--) {
    var t = globalStorage.key(n);
    e(globalStorage[t], t);
  }
}
function remove$4(e) {
  return globalStorage.removeItem(e);
}
function clearAll$4() {
  each$4(function(e, n) {
    delete globalStorage[e];
  });
}
var util$2 = util$6, Global$2 = util$2.Global, oldIEUserDataStorage = {
  name: "oldIE-userDataStorage",
  write: write$3,
  read: read$3,
  each: each$3,
  remove: remove$3,
  clearAll: clearAll$3
}, storageName = "storejs", doc$1 = Global$2.document, _withStorageEl = _makeIEStorageElFunction(), disable = (Global$2.navigator ? Global$2.navigator.userAgent : "").match(/ (MSIE 8|MSIE 9|MSIE 10)\./);
function write$3(e, n) {
  if (!disable) {
    var t = fixKey(e);
    _withStorageEl(function(o) {
      o.setAttribute(t, n), o.save(storageName);
    });
  }
}
function read$3(e) {
  if (!disable) {
    var n = fixKey(e), t = null;
    return _withStorageEl(function(o) {
      t = o.getAttribute(n);
    }), t;
  }
}
function each$3(e) {
  _withStorageEl(function(n) {
    for (var t = n.XMLDocument.documentElement.attributes, o = t.length - 1; o >= 0; o--) {
      var a = t[o];
      e(n.getAttribute(a.name), a.name);
    }
  });
}
function remove$3(e) {
  var n = fixKey(e);
  _withStorageEl(function(t) {
    t.removeAttribute(n), t.save(storageName);
  });
}
function clearAll$3() {
  _withStorageEl(function(e) {
    var n = e.XMLDocument.documentElement.attributes;
    e.load(storageName);
    for (var t = n.length - 1; t >= 0; t--)
      e.removeAttribute(n[t].name);
    e.save(storageName);
  });
}
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
function fixKey(e) {
  return e.replace(/^\d/, "___$&").replace(forbiddenCharsRegex, "___");
}
function _makeIEStorageElFunction() {
  if (!doc$1 || !doc$1.documentElement || !doc$1.documentElement.addBehavior)
    return null;
  var e = "script", n, t, o;
  try {
    t = new ActiveXObject("htmlfile"), t.open(), t.write("<" + e + ">document.w=window</" + e + '><iframe src="/favicon.ico"></iframe>'), t.close(), n = t.w.frames[0].document, o = n.createElement("div");
  } catch {
    o = doc$1.createElement("div"), n = doc$1.body;
  }
  return function(a) {
    var l = [].slice.call(arguments, 0);
    l.unshift(o), n.appendChild(o), o.addBehavior("#default#userData"), o.load(storageName), a.apply(this, l), n.removeChild(o);
  };
}
var util$1 = util$6, Global$1 = util$1.Global, trim = util$1.trim, cookieStorage = {
  name: "cookieStorage",
  read: read$2,
  write: write$2,
  each: each$2,
  remove: remove$2,
  clearAll: clearAll$2
}, doc = Global$1.document;
function read$2(e) {
  if (!e || !_has(e))
    return null;
  var n = "(?:^|.*;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
  return unescape(doc.cookie.replace(new RegExp(n), "$1"));
}
function each$2(e) {
  for (var n = doc.cookie.split(/; ?/g), t = n.length - 1; t >= 0; t--)
    if (!!trim(n[t])) {
      var o = n[t].split("="), a = unescape(o[0]), l = unescape(o[1]);
      e(l, a);
    }
}
function write$2(e, n) {
  !e || (doc.cookie = escape(e) + "=" + escape(n) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/");
}
function remove$2(e) {
  !e || !_has(e) || (doc.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/");
}
function clearAll$2() {
  each$2(function(e, n) {
    remove$2(n);
  });
}
function _has(e) {
  return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(doc.cookie);
}
var util = util$6, Global = util.Global, sessionStorage_1 = {
  name: "sessionStorage",
  read: read$1,
  write: write$1,
  each: each$1,
  remove: remove$1,
  clearAll: clearAll$1
};
function sessionStorage() {
  return Global.sessionStorage;
}
function read$1(e) {
  return sessionStorage().getItem(e);
}
function write$1(e, n) {
  return sessionStorage().setItem(e, n);
}
function each$1(e) {
  for (var n = sessionStorage().length - 1; n >= 0; n--) {
    var t = sessionStorage().key(n);
    e(read$1(t), t);
  }
}
function remove$1(e) {
  return sessionStorage().removeItem(e);
}
function clearAll$1() {
  return sessionStorage().clear();
}
var memoryStorage_1 = {
  name: "memoryStorage",
  read,
  write,
  each,
  remove,
  clearAll
}, memoryStorage = {};
function read(e) {
  return memoryStorage[e];
}
function write(e, n) {
  memoryStorage[e] = n;
}
function each(e) {
  for (var n in memoryStorage)
    memoryStorage.hasOwnProperty(n) && e(memoryStorage[n], n);
}
function remove(e) {
  delete memoryStorage[e];
}
function clearAll(e) {
  memoryStorage = {};
}
var all = [
  localStorage_1,
  oldFFGlobalStorage,
  oldIEUserDataStorage,
  cookieStorage,
  sessionStorage_1,
  memoryStorage_1
], json2$1 = {}, hasRequiredJson2;
function requireJson2() {
  return hasRequiredJson2 || (hasRequiredJson2 = 1, typeof JSON != "object" && (JSON = {}), function() {
    var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    function f(e) {
      return e < 10 ? "0" + e : e;
    }
    function this_value() {
      return this.valueOf();
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
    }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
    var gap, indent, meta, rep;
    function quote(e) {
      return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function(n) {
        var t = meta[n];
        return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + e + '"';
    }
    function str(e, n) {
      var t, o, a, l, c = gap, r, s = n[e];
      switch (s && typeof s == "object" && typeof s.toJSON == "function" && (s = s.toJSON(e)), typeof rep == "function" && (s = rep.call(n, e, s)), typeof s) {
        case "string":
          return quote(s);
        case "number":
          return isFinite(s) ? String(s) : "null";
        case "boolean":
        case "null":
          return String(s);
        case "object":
          if (!s)
            return "null";
          if (gap += indent, r = [], Object.prototype.toString.apply(s) === "[object Array]") {
            for (l = s.length, t = 0; t < l; t += 1)
              r[t] = str(t, s) || "null";
            return a = r.length === 0 ? "[]" : gap ? `[
` + gap + r.join(`,
` + gap) + `
` + c + "]" : "[" + r.join(",") + "]", gap = c, a;
          }
          if (rep && typeof rep == "object")
            for (l = rep.length, t = 0; t < l; t += 1)
              typeof rep[t] == "string" && (o = rep[t], a = str(o, s), a && r.push(quote(o) + (gap ? ": " : ":") + a));
          else
            for (o in s)
              Object.prototype.hasOwnProperty.call(s, o) && (a = str(o, s), a && r.push(quote(o) + (gap ? ": " : ":") + a));
          return a = r.length === 0 ? "{}" : gap ? `{
` + gap + r.join(`,
` + gap) + `
` + c + "}" : "{" + r.join(",") + "}", gap = c, a;
      }
    }
    typeof JSON.stringify != "function" && (meta = {
      "\b": "\\b",
      "	": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\"
    }, JSON.stringify = function(e, n, t) {
      var o;
      if (gap = "", indent = "", typeof t == "number")
        for (o = 0; o < t; o += 1)
          indent += " ";
      else
        typeof t == "string" && (indent = t);
      if (rep = n, n && typeof n != "function" && (typeof n != "object" || typeof n.length != "number"))
        throw new Error("JSON.stringify");
      return str("", { "": e });
    }), typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
      var j;
      function walk(e, n) {
        var t, o, a = e[n];
        if (a && typeof a == "object")
          for (t in a)
            Object.prototype.hasOwnProperty.call(a, t) && (o = walk(a, t), o !== void 0 ? a[t] = o : delete a[t]);
        return reviver.call(e, n, a);
      }
      if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
      })), rx_one.test(
        text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")
      ))
        return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({ "": j }, "") : j;
      throw new SyntaxError("JSON.parse");
    });
  }()), json2$1;
}
var json2 = json2Plugin;
function json2Plugin() {
  return requireJson2(), {};
}
var engine = storeEngine, storages = all, plugins = [json2], store_legacy = engine.createStore(storages, plugins);
const storage = store_legacy, debounce = (e, n = 200, t = !1) => {
  let o = !1, a = null;
  const l = (...c) => new Promise((r, s) => {
    if (a && clearTimeout(a), t && !o) {
      const p = e.apply(void 0, c);
      r(p), o = !0;
    } else
      a = setTimeout(() => {
        const p = e.apply(void 0, c);
        r(p), o = !1, a = null;
      }, n);
  });
  return l.cancel = () => {
    a && clearTimeout(a), o = !1;
  }, l;
}, throttle = (e, n = 500) => {
  let t = 0;
  const o = (...a) => new Promise((l, c) => {
    const r = new Date().getTime();
    if (r - t >= n) {
      const s = e.apply(void 0, a);
      l(s), t = r;
    }
  });
  return o.cancel = () => {
    t = new Date().getTime();
  }, o;
}, str = (e) => e == null ? "" : String(e);
function isImage(e) {
  let n = ["png", "jpg", "jpeg", "gif", "webp", "svg"], t = e.lastIndexOf("."), o = e.substring(t + 1);
  return n.indexOf(o.toLowerCase()) != -1;
}
function createObjectURL(e) {
  return window.URL ? window.URL.createObjectURL(e) : window.webkitURL ? window.webkitURL.createObjectURL(e) : "";
}
function toFormData(e) {
  const n = new FormData();
  return Object.keys(e).forEach((t) => {
    const o = e[t];
    Array.isArray(o) ? o.forEach((a, l) => n.append(t + `[${l}]`, a)) : n.append(t, e[t]);
  }), n;
}
function removeEmptyField(e) {
  return Object.keys(e).filter((n) => e[n] !== null && e[n] !== void 0).reduce((n, t) => ({ ...n, [t]: e[t] }), {});
}
const base = "", elAvatar = "", elButton = "", elImage = "", elImageViewer = "", elPopover = "", elPopper = "", elDialog = "", elOverlay = "", elTag = "", elCarousel = "", elScrollbar = "", elInput = "", elPagination = "", elOption = "", elOptionGroup = "", elSelect = "", elLink = "", InjectSlots = Symbol(), InjectInputBox = Symbol(), InjectContentBox = Symbol(), InjectReplyBox = Symbol(), InjectOperation = Symbol(), _withScopeId$f = (e) => (pushScopeId("data-v-51c5f1bc"), e = e(), popScopeId(), e), _hoisted_1$n = { class: "comment-box" }, _hoisted_2$k = {
  key: 0,
  class: "action-box"
}, _hoisted_3$i = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "data-v-48a7e3c5": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M14 1.3335C14.3514 1.3335 14.6394 1.60546 14.6648 1.95041L14.6666 2.00016V14.0002C14.6666 14.3516 14.3947 14.6396 14.0497 14.665L14 14.6668H1.99998C1.64853 14.6668 1.36059 14.3949 1.33514 14.0499L1.33331 14.0002V2.00016C1.33331 1.64871 1.60527 1.36077 1.95023 1.33532L1.99998 1.3335H14ZM13.3333 2.66618H2.66664V13.3328H13.3333V2.66618ZM11.9219 6.7879C11.9719 6.83791 12 6.90574 12 6.97647V11.7993C12 11.9098 11.9104 11.9993 11.8 11.9993H6.81615C6.7975 11.9993 6.77945 11.9968 6.76232 11.992L3.91042 11.9847C3.79996 11.9844 3.71063 11.8947 3.7109 11.7842C3.71102 11.7313 3.73209 11.6807 3.76948 11.6433L6.52468 8.88807C6.62882 8.78393 6.79766 8.78393 6.9018 8.88807L8.17297 10.1593L11.5447 6.7879C11.6489 6.68376 11.8177 6.68376 11.9219 6.7879ZM5.99997 3.99951V5.99951H3.99997V3.99951H5.99997Z"
  })
], -1)), _hoisted_4$g = /* @__PURE__ */ _withScopeId$f(() => /* @__PURE__ */ createElementVNode("span", null, "\u56FE\u7247", -1)), _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "input-box",
  props: {
    placeholder: null,
    contentBtn: null,
    parentId: null,
    replay: null
  },
  emits: ["hide", "close"],
  setup(e, { expose: n, emit: t }) {
    const o = e, a = ref(""), l = ref(!1), c = ref(!0), r = ref(), s = ref(), p = ref(), i = ref([]), d = ref([]), u = reactive({
      imgLength: 0
    }), m = (w) => {
      isEmpty(a.value.replace(/&nbsp;|<br>| /g, "")) ? c.value = !0 : c.value = !1;
    }, { upload: _, submit: v } = inject(InjectInputBox), $ = inject(InjectionEmojiApi), g = () => {
      v({
        content: o.replay ? `\u56DE\u590D <span style="color: var(--u-color-success-dark-2);">@${o.replay}:</span> ${a.value}` : a.value,
        parentId: isNull(o.parentId, null),
        files: d.value,
        clear: () => {
          k(), t("close");
        }
      });
    }, k = () => {
      r.value.clear(), i.value.length = 0, d.value = [], c.value = !0;
    };
    function x(w) {
      isEmpty(a.value) && !u.imgLength && (l.value = !1, t("hide", w));
    }
    function C() {
      l.value = !0, nextTick(() => {
        s.value = document.querySelector("div[id^='el-popper-container']");
      });
    }
    n({
      focus: () => {
        var w;
        return (w = r.value) == null ? void 0 : w.focus();
      }
    });
    const y = (w) => {
      var B;
      i.value.length = 0, d.value.length = 0, console.log(w);
      const E = (B = p.value) == null ? void 0 : B.files;
      if (u.imgLength = isNull(E == null ? void 0 : E.length, 0), E)
        for (let b = 0; b < E.length; b++) {
          let V = E[b].name, S = createObjectURL(E[b]);
          d.value.push(E[b]), isImage(V) ? i.value.push(S) : UToast({ type: "warn", message: "\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B\u6587\u4EF6!", duration: 2500 });
        }
    };
    return (w, E) => withDirectives((openBlock(), createElementBlock("div", _hoisted_1$n, [
      createVNode(unref(UEditor), {
        ref_key: "editorRef",
        ref: r,
        modelValue: a.value,
        "onUpdate:modelValue": E[0] || (E[0] = (B) => a.value = B),
        class: normalizeClass({ "input-active": l.value }),
        placeholder: o.placeholder,
        "min-height": 64,
        "img-list": i.value,
        onFocus: C,
        onInput: m,
        onSubmit: g
      }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
      createVNode(Transition, { name: "fade" }, {
        default: withCtx(() => [
          l.value ? (openBlock(), createElementBlock("div", _hoisted_2$k, [
            createVNode(unref(UEmoji), {
              emoji: unref($),
              onAddEmoji: E[1] || (E[1] = (B) => {
                var b;
                return (b = r.value) == null ? void 0 : b.addText(B);
              })
            }, null, 8, ["emoji"]),
            unref(_) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "picture",
              onClick: E[2] || (E[2] = (...B) => {
                var b, V;
                return ((b = p.value) == null ? void 0 : b.click) && ((V = p.value) == null ? void 0 : V.click(...B));
              })
            }, [
              _hoisted_3$i,
              _hoisted_4$g,
              createElementVNode("input", {
                id: "comment-upload",
                ref_key: "inputRef",
                ref: p,
                type: "file",
                multiple: "",
                onChange: y
              }, null, 544)
            ])) : createCommentVNode("", !0),
            createVNode(unref(ElButton), {
              type: "primary",
              disabled: c.value,
              onClick: g
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(o.contentBtn), 1)
              ]),
              _: 1
            }, 8, ["disabled"])
          ])) : createCommentVNode("", !0)
        ]),
        _: 1
      })
    ])), [
      [unref(ClickOutside), x, s.value]
    ]);
  }
}), inputBox_vue_vue_type_style_index_0_scoped_51c5f1bc_lang = "", _export_sfc = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, a] of n)
    t[o] = a;
  return t;
}, InputBox = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-51c5f1bc"]]), _hoisted_1$m = { class: "u-comment-scroll" }, _hoisted_2$j = ["infinite-scroll-disabled"], _hoisted_3$h = { class: "scroll-btn" }, _hoisted_4$f = /* @__PURE__ */ createTextVNode("\u52A0\u8F7D\u66F4\u591A"), _hoisted_5$e = { key: 1 }, _hoisted_6$b = { key: 2 }, __default__$h = {
  name: "UCommentScroll"
}, _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...__default__$h,
  props: {
    disable: { type: Boolean }
  },
  emits: ["more"],
  setup(e, { emit: n }) {
    const t = e, o = ref(!1), a = ref(!1), l = computed(() => a.value && t.disable), c = computed(() => !a.value || o.value || l.value), r = debounce(() => {
      n("more"), o.value = !1;
    }, 500), s = () => {
      o.value = !0, r();
    };
    return (p, i) => (openBlock(), createElementBlock("div", _hoisted_1$m, [
      withDirectives((openBlock(), createElementBlock("div", {
        "infinite-scroll-disabled": unref(c),
        "infinite-scroll-distance": "2"
      }, [
        renderSlot(p.$slots, "default", {}, void 0, !0),
        createElementVNode("div", _hoisted_3$h, [
          a.value ? createCommentVNode("", !0) : (openBlock(), createBlock(unref(ElLink), {
            key: 0,
            type: "primary",
            underline: !1,
            onClick: i[0] || (i[0] = (d) => a.value = !a.value)
          }, {
            default: withCtx(() => [
              _hoisted_4$f
            ]),
            _: 1
          })),
          o.value ? (openBlock(), createElementBlock("p", _hoisted_5$e, "\u52A0\u8F7D\u4E2D...")) : createCommentVNode("", !0),
          unref(l) ? (openBlock(), createElementBlock("p", _hoisted_6$b, "\u6CA1\u6709\u66F4\u591A\u4E86")) : createCommentVNode("", !0)
        ])
      ], 8, _hoisted_2$j)), [
        [unref(ElInfiniteScroll), s]
      ])
    ]));
  }
}), commentScroll_vue_vue_type_style_index_0_scoped_a3a46d25_lang = "", commentScroll = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-a3a46d25"]]), UCommentScroll = withInstall(commentScroll), _withScopeId$e = (e) => (pushScopeId("data-v-ef5dff1f"), e = e(), popScopeId(), e), _hoisted_1$l = { class: "nav" }, _hoisted_2$i = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", { class: "nav__title" }, "\u5168\u90E8\u8BC4\u8BBA", -1)), _hoisted_3$g = { class: "nav__sort" }, _hoisted_4$e = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99951 0.5C9.03708 0.5 11.4995 2.96243 11.4995 6C11.4995 9.03757 9.03708 11.5 5.99951 11.5C2.96195 11.5 0.499512 9.03757 0.499512 6C0.499512 2.96243 2.96195 0.5 5.99951 0.5ZM6.25 3.49988C6.38807 3.49988 6.5 3.61181 6.5 3.74988V5.49988H8.25C8.38807 5.49988 8.5 5.61181 8.5 5.74988V6.24988C8.5 6.38795 8.38807 6.49988 8.25 6.49988H5.75C5.61193 6.49988 5.5 6.38795 5.5 6.24988V3.74988C5.5 3.61181 5.61193 3.49988 5.75 3.49988H6.25Z"
  })
], -1)), _hoisted_5$d = /* @__PURE__ */ createTextVNode(" \u6700\u65B0 "), _hoisted_6$a = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ createElementVNode("path", { d: "M4.88933 0.613974C4.92947 0.616946 4.96831 0.629568 5.00253 0.650767C6.67348 1.68589 7.55141 3.13884 7.63632 5.00962C7.947 5.00962 8.2245 4.65999 8.46882 3.96072L8.49487 3.88447C8.53862 3.75351 8.68025 3.68282 8.8112 3.72656C8.83398 3.73417 8.85554 3.74502 8.87522 3.75878C9.96316 4.5193 10.5048 5.50231 10.5 6.70782C10.4999 6.73762 10.4982 6.76675 10.495 6.7952C10.4985 6.86294 10.5 6.93131 10.5 7.00005C10.5 9.48533 8.48528 11.5 6 11.5C3.51472 11.5 1.5 9.48533 1.5 7.00005C1.5 6.90255 1.5031 6.80578 1.50921 6.70983C1.5062 6.70917 1.5031 6.70849 1.5 6.70782C1.50864 6.60849 1.52139 6.50994 1.53824 6.41219C1.54515 6.35775 1.55321 6.30373 1.56222 6.25003L1.57017 6.24983C1.7622 5.3813 2.28426 4.57601 3.13635 3.83394C4.00892 3.07405 4.50079 2.11523 4.61198 0.957499L4.62156 0.844839C4.63175 0.707146 4.75163 0.603784 4.88933 0.613974Z" })
], -1)), _hoisted_7$9 = /* @__PURE__ */ createTextVNode(" \u6700\u70ED "), __default__$g = {
  name: "uCommentNav"
}, _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...__default__$g,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue", "sorted"],
  setup(e, { emit: n }) {
    const t = e, o = computed({
      get() {
        return t.modelValue;
      },
      set(a) {
        n("update:modelValue", a), n("sorted", a);
      }
    });
    return (a, l) => {
      const c = resolveComponent("u-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$l, [
        _hoisted_2$i,
        createElementVNode("div", _hoisted_3$g, [
          createElementVNode("div", {
            class: normalizeClass(["item select-none", { active: unref(o) }]),
            onClick: l[0] || (l[0] = (r) => o.value = !0)
          }, [
            createVNode(c, null, {
              default: withCtx(() => [
                _hoisted_4$e
              ]),
              _: 1
            }),
            _hoisted_5$d
          ], 2),
          createElementVNode("div", {
            class: normalizeClass(["item select-none", { active: !unref(o) }]),
            onClick: l[1] || (l[1] = (r) => o.value = !1)
          }, [
            createVNode(c, null, {
              default: withCtx(() => [
                _hoisted_6$a
              ]),
              _: 1
            }),
            _hoisted_7$9
          ], 2)
        ])
      ]);
    };
  }
}), commentNav_vue_vue_type_style_index_0_scoped_ef5dff1f_lang = "", CommentNav = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-ef5dff1f"]]), UCommentNav = withInstall(CommentNav), _withScopeId$d = (e) => (pushScopeId("data-v-6a8f6c09"), e = e(), popScopeId(), e), _hoisted_1$k = {
  key: 0,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_2$h = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
}, null, -1)), _hoisted_3$f = [
  _hoisted_2$h
], _hoisted_4$d = {
  key: 1,
  width: "16",
  height: "16",
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, _hoisted_5$c = /* @__PURE__ */ _withScopeId$d(() => /* @__PURE__ */ createElementVNode("path", {
  fill: "currentColor",
  d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
}, null, -1)), _hoisted_6$9 = [
  _hoisted_5$c
], __default__$f = {
  name: "UDialog"
}, _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: {
    title: null,
    modelValue: { type: Boolean },
    width: null,
    center: { type: Boolean },
    top: null,
    beforeClose: null,
    closeOnClickModal: { type: Boolean, default: !0 }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: n }) {
    const t = e, o = ref(!1), a = ref(!1);
    return watch(
      () => t.modelValue,
      (l) => {
        o.value = l;
      },
      {
        immediate: !0
      }
    ), watch(
      () => o.value,
      (l) => {
        n("update:modelValue", l);
      }
    ), (l, c) => (openBlock(), createBlock(unref(ElDialog), {
      modelValue: o.value,
      "onUpdate:modelValue": c[1] || (c[1] = (r) => o.value = r),
      "close-on-click-modal": e.closeOnClickModal,
      title: e.title,
      width: e.width,
      top: e.top,
      fullscreen: a.value,
      center: e.center,
      "before-close": e.beforeClose,
      draggable: ""
    }, createSlots({
      default: withCtx(() => [
        createElementVNode("div", {
          class: "full-screen",
          onClick: c[0] || (c[0] = (r) => a.value = !a.value)
        }, [
          a.value ? (openBlock(), createElementBlock("svg", _hoisted_1$k, _hoisted_3$f)) : (openBlock(), createElementBlock("svg", _hoisted_4$d, _hoisted_6$9))
        ]),
        renderSlot(l.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      l.$slots.footer ? {
        name: "footer",
        fn: withCtx(() => [
          renderSlot(l.$slots, "footer", {}, void 0, !0)
        ]),
        key: "0"
      } : void 0
    ]), 1032, ["modelValue", "close-on-click-modal", "title", "width", "top", "fullscreen", "center", "before-close"]));
  }
}), dialog_vue_vue_type_style_index_0_lang = "", dialog_vue_vue_type_style_index_1_scoped_6a8f6c09_lang = "", dialogVue = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-6a8f6c09"]]), UDialog = withInstall(dialogVue), _hoisted_1$j = { class: "field" }, __default__$e = {
  name: "UDivider"
}, _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$e,
  props: {
    borderStyle: { default: "solid" },
    vertical: { type: Boolean },
    position: { default: "center" }
  },
  setup(e) {
    const n = e;
    useCssVars((o) => ({
      "5610a1a0": n.borderStyle
    }));
    const t = ref();
    return watch(
      () => n.position,
      (o) => {
        switch (o) {
          case "left":
            t.value = "is-left";
            break;
          case "right":
            t.value = "is-right";
            break;
        }
      },
      { immediate: !0 }
    ), (o, a) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["u-divider", { vertical: e.vertical }])
    }, [
      createElementVNode("fieldset", _hoisted_1$j, [
        o.$slots.default || e.vertical ? (openBlock(), createElementBlock("legend", {
          key: 0,
          class: normalizeClass(["inner", t.value])
        }, [
          renderSlot(o.$slots, "default", {}, void 0, !0)
        ], 2)) : createCommentVNode("", !0)
      ])
    ], 2));
  }
}), divider_vue_vue_type_style_index_0_scoped_a319f041_lang = "", dividerVue = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-a319f041"]]), UDivider = withInstall(dividerVue), toastTypes = [
  {
    type: "success",
    options: {
      color: "#67c23a",
      bgColor: "#f0f9eb",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2040"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" p-id="2041"></path></svg>'
    }
  },
  {
    type: "info",
    options: {
      color: "#909399",
      bgColor: "#f4f4f5",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1950"><path d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64z m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68 0.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z" p-id="1951"></path></svg>'
    }
  },
  {
    type: "warn",
    options: {
      color: "#fdf6ec",
      bgColor: "#e6a23c",
      icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1980"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256z m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z" p-id="1981"></path></svg>'
    }
  },
  {
    type: "error",
    options: {
      color: "#f56c6c",
      bgColor: "#fef0f0",
      icon: '<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8851"><path d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896z m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" p-id="8852"></path></svg>'
    }
  }
], defaultToastType = {
  type: "normal",
  options: { color: "#fff", bgColor: "rgba(0, 0, 0, .5)", icon: "" }
};
function getToastType(e) {
  return toastTypes.find((n) => n.type === e);
}
function getDefaultToastType() {
  return defaultToastType;
}
const _hoisted_1$i = {
  key: 1,
  "aria-hidden": "true"
}, _hoisted_2$g = ["xlink:href"], __default__$d = {
  name: "UIcon"
}, _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$d,
  props: {
    name: null,
    size: null,
    color: null
  },
  setup(e) {
    const n = e, t = computed(() => "#" + n.name), o = computed(() => ({
      fontSize: isNumber(n.size) ? n.size + "px" : n.size,
      color: n.color
    }));
    return (a, l) => (openBlock(), createElementBlock("i", {
      class: "u-icon",
      style: normalizeStyle(unref(o))
    }, [
      a.$slots.default ? renderSlot(a.$slots, "default", { key: 0 }, void 0, !0) : (openBlock(), createElementBlock("svg", _hoisted_1$i, [
        createElementVNode("use", { "xlink:href": unref(t) }, null, 8, _hoisted_2$g)
      ]))
    ], 4));
  }
}), icon_vue_vue_type_style_index_0_scoped_da87b5f5_lang = "", iconVue = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-da87b5f5"]]), UIcon = withInstall(iconVue), _hoisted_1$h = { class: "v-toast" }, _hoisted_2$f = { class: "inner" }, _hoisted_3$e = { class: "message" }, __default__$c = {
  name: "UToast"
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: {
    message: { default: "" },
    duration: { default: 2e3 },
    type: { default: "normal" }
  },
  setup(e) {
    const n = e;
    useCssVars((a) => ({
      b967f812: t.color,
      "88e7d49c": t.bgColor
    }));
    const t = reactive(getDefaultToastType().options), o = ref(!1);
    return watch(
      () => n.type,
      (a) => {
        const l = getToastType(a);
        l && (t.color = l.options.color, t.bgColor = l.options.bgColor, t.icon = l.options.icon);
      },
      { immediate: !0 }
    ), onMounted(() => {
      o.value = !0, setTimeout(() => {
        o.value = !1;
      }, n.duration);
    }), (a, l) => (openBlock(), createElementBlock("div", _hoisted_1$h, [
      createVNode(Transition, { name: "v-toast" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", _hoisted_2$f, [
            createElementVNode("div", _hoisted_3$e, [
              t.icon ? (openBlock(), createBlock(unref(UIcon), {
                key: 0,
                innerHTML: t.icon
              }, null, 8, ["innerHTML"])) : createCommentVNode("", !0),
              createElementVNode("span", {
                class: normalizeClass({ normal: e.type != "normal" })
              }, toDisplayString(e.message), 3)
            ])
          ], 512), [
            [vShow, o.value]
          ])
        ]),
        _: 1
      })
    ]));
  }
}), index_vue_vue_type_style_index_0_scoped_3590569c_lang = "", toast = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-3590569c"]]);
function UToast(e) {
  let n = e.duration;
  if (!e.message)
    return;
  e.duration = n || 1e3;
  const { vnode: t, div: o } = createGlobalNode(toast, e);
  return setTimeout(() => {
    removeGlobalNode(o);
  }, e.duration + 300), t;
}
const _withScopeId$c = (e) => (pushScopeId("data-v-f23dcd5a"), e = e(), popScopeId(), e), _hoisted_1$g = ["placeholder", "onKeydown", "innerHTML"], _hoisted_2$e = ["src"], _hoisted_3$d = ["onClick"], _hoisted_4$c = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
  "data-v-48a7e3c5": "",
  "data-v-7c7c7498": "",
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("rect", {
    width: "12",
    height: "12",
    rx: "2",
    fill: "#86909C"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    "data-v-48a7e3c5": "",
    "data-v-7c7c7498": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.98095 5.49307L8.22012 3.25389C8.28521 3.18881 8.39074 3.18881 8.45582 3.25389L8.69153 3.4896C8.75661 3.55468 8.75661 3.66021 8.69153 3.7253L6.45235 5.96447L8.69153 8.20364C8.75661 8.26873 8.75661 8.37426 8.69153 8.43934L8.45582 8.67505C8.39074 8.74013 8.28521 8.74013 8.22012 8.67505L5.98095 6.43587L3.74178 8.67505C3.67669 8.74013 3.57116 8.74013 3.50608 8.67505L3.27037 8.43934C3.20529 8.37426 3.20529 8.26873 3.27037 8.20364L5.50954 5.96447L3.27037 3.7253C3.20529 3.66021 3.20529 3.55468 3.27037 3.4896L3.50608 3.25389C3.57116 3.18881 3.67669 3.18881 3.74178 3.25389L5.98095 5.49307Z",
    fill: "white"
  })
], -1)), _hoisted_5$b = [
  _hoisted_4$c
], __default__$b = {
  name: "UEditor"
}, _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  props: {
    placeholder: null,
    modelValue: null,
    minHeight: { default: 30 },
    imgList: null
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit"],
  setup(e, { expose: n, emit: t }) {
    const o = e;
    useCssVars((y) => ({
      "4bdb6f99": unref(d),
      "09086d91": unref(u)
    }));
    const a = ref(), l = ref(), c = ref(), r = ref(!1), s = ref(!1), p = ref(), { imgList: i } = toRefs(o), d = computed(() => o.minHeight + "px"), u = computed(() => o.minHeight == 30 ? "4px 10px" : "8px 12px");
    watch(
      () => o.modelValue,
      (y) => {
        r.value || (c.value = y);
      }
    );
    function m(y) {
      t("focus", y), r.value = !0, s.value = !0;
    }
    function _(y) {
      var w, E;
      a.value = (w = window.getSelection()) == null ? void 0 : w.getRangeAt(0), t("blur", y), (E = l.value) != null && E.innerHTML || (s.value = !1), r.value = !1;
    }
    function v(y) {
      const { innerHTML: w } = y.target;
      t("update:modelValue", w), t("input", y);
    }
    function $(y) {
      var E, B;
      let w = window.getSelection();
      if (w) {
        w.removeAllRanges(), a.value || ((E = l.value) == null || E.focus(), a.value = w.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(y)), a.value.collapse(!1), w.addRange(a.value), t("update:modelValue", ((B = l.value) == null ? void 0 : B.innerHTML) || "");
        const b = l.value;
        t("input", b);
      }
    }
    function g() {
      l.value && (l.value.innerHTML = "", t("update:modelValue", l.value.innerHTML), s.value = !1);
    }
    function k() {
      nextTick(() => {
        var y;
        (y = l.value) == null || y.focus();
      });
    }
    const x = (y) => {
      y.ctrlKey && y.key == "Enter" && (isEmpty(o.modelValue.replace(/&nbsp;|<br>| /g, "")) ? UToast({ message: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A", type: "info" }) : t("submit"));
    }, C = (y) => {
      var w;
      (w = i == null ? void 0 : i.value) == null || w.splice(y, 1);
    };
    return onMounted(() => {
      var y;
      (y = l.value) == null || y.addEventListener("keyup", (w) => {
        const E = w.target;
        E.innerHTML == "<br>" && (E.innerHTML = "");
      });
    }), n({
      addText: $,
      clear: g,
      focus: k,
      imageRef: p
    }), (y, w) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["u-editor", { active: s.value }])
    }, [
      createElementVNode("div", {
        ref_key: "editorRef",
        ref: l,
        class: "rich-input",
        contenteditable: "true",
        placeholder: e.placeholder,
        onFocus: m,
        onInput: v,
        onBlur: _,
        onKeydown: withKeys(x, ["enter"]),
        innerHTML: c.value
      }, null, 40, _hoisted_1$g),
      createElementVNode("div", {
        ref_key: "imageRef",
        ref: p,
        class: "image-preview-box"
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(i), (E, B) => (openBlock(), createElementBlock("div", {
          key: B,
          class: "image-preview"
        }, [
          createElementVNode("img", {
            src: E,
            alt: ""
          }, null, 8, _hoisted_2$e),
          createElementVNode("div", {
            class: "clean-btn",
            onClick: (b) => C(B)
          }, _hoisted_5$b, 8, _hoisted_3$d)
        ]))), 128))
      ], 512)
    ], 2));
  }
}), editor_vue_vue_type_style_index_0_scoped_f23dcd5a_lang = "", editorVue = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-f23dcd5a"]]), UEditor = withInstall(editorVue), index$2 = "", _hoisted_1$f = { class: "u-fold" }, _hoisted_2$d = { class: "action-box select-none" }, __default__$a = {
  name: "UFold"
}, _sfc_main$j = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const n = e;
    useCssVars((r) => ({
      "6c257a97": unref(t)
    }));
    const t = computed(() => {
      let r = Math.trunc(Number(n.line));
      return r > 0 ? r : 1;
    }), o = ref(!0), a = ref(!1), l = ref();
    let c;
    return onMounted(() => {
      c = new ResizeObserver((r) => {
        o.value && l.value && (a.value = l.value.offsetHeight < l.value.scrollHeight);
      }), c.observe(l.value);
    }), onUnmounted(() => {
      c.disconnect();
    }), (r, s) => (openBlock(), createElementBlock("div", _hoisted_1$f, [
      createElementVNode("div", {
        class: normalizeClass(["txt-box", { "over-hidden": o.value }])
      }, [
        createElementVNode("div", {
          ref_key: "divBox",
          ref: l
        }, [
          renderSlot(r.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      createElementVNode("div", _hoisted_2$d, [
        a.value && e.unfold ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "expand-btn",
          onClick: s[0] || (s[0] = (p) => o.value = !o.value)
        }, toDisplayString(o.value ? "\u5C55\u5F00" : "\u6536\u8D77"), 1)) : createCommentVNode("", !0)
      ])
    ]));
  }
}), fold_vue_vue_type_style_index_0_scoped_9df778e5_lang = "", foldVue = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-9df778e5"]]), UFold = withInstall(foldVue), _imports_0 = "/static/img/normal.webp", _imports_1 = "/static/img/greeting.webp", _imports_2 = "/static/img/blindfold.webp", _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "form",
  props: {
    modelValue: null
  },
  emits: ["submit", "update:modelValue", "toggle"],
  setup(e, { expose: n, emit: t }) {
    const o = e, a = reactive({
      type: "",
      email: "",
      password: ""
    }), l = (_, v, $) => {
      const g = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!v)
        return $("\u8BF7\u8F93\u5165\u90AE\u7BB1!");
      g.test(v) || $("\u90AE\u7BB1\u5730\u5740\u4E0D\u5408\u6CD5"), $();
    }, c = (_, v, $) => {
      v ? v != a.password ? $("\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4") : $() : $("\u8BF7\u786E\u8BA4\u5BC6\u7801");
    }, r = ref(), s = ref(), p = reactive({
      email: {
        required: !0,
        validator: l,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      }
    }), i = reactive({
      email: {
        required: !0,
        validator: l,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      },
      checkPass: {
        required: !0,
        validator: c,
        trigger: "blur"
      }
    }), d = reactive({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    watch(
      () => o.modelValue,
      (_) => {
        switch (nextTick(() => m()), _) {
          case "login":
            s.value = p, d.type = "\u767B\u5F55", d.one = { key: "register", value: "\u90AE\u7BB1\u6CE8\u518C" }, d.two = { key: "forget", value: "\u5FD8\u8BB0\u5BC6\u7801" };
            break;
          case "register":
            s.value = p, d.type = "\u6CE8\u518C", d.one = { key: "login", value: "\u90AE\u7BB1\u767B\u5F55" }, d.two = { key: "", value: "" };
            break;
          case "forget":
            s.value = i, d.type = "\u4FEE\u6539\u5BC6\u7801", d.one = { key: "login", value: "\u90AE\u7BB1\u767B\u5F55" }, d.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function u() {
      a.type = o.modelValue, r.value.validate((_) => {
        _ && t("submit", a);
      });
    }
    function m() {
      r.value.resetFields();
    }
    return n({
      reset: m
    }), (_, v) => {
      const $ = resolveComponent("el-button");
      return openBlock(), createBlock(unref(ElForm), {
        ref_key: "ruleFormRef",
        ref: r,
        model: a,
        rules: s.value,
        class: "select-none"
      }, {
        default: withCtx(() => [
          createVNode(unref(ElFormItem), { prop: "email" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.email,
                "onUpdate:modelValue": v[0] || (v[0] = (g) => a.email = g),
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                onFocus: v[1] || (v[1] = (g) => _.$emit("toggle", 1)),
                onBlur: v[2] || (v[2] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(unref(ElFormItem), { prop: "password" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.password,
                "onUpdate:modelValue": v[3] || (v[3] = (g) => a.password = g),
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                onFocus: v[4] || (v[4] = (g) => _.$emit("toggle", 2)),
                onBlur: v[5] || (v[5] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          withDirectives(createVNode(unref(ElFormItem), { prop: "checkPass" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": v[6] || (v[6] = (g) => a.checkPass = g),
                placeholder: "\u8BF7\u786E\u8BA4\u5BC6\u7801",
                onFocus: v[7] || (v[7] = (g) => _.$emit("toggle", 2)),
                onBlur: v[8] || (v[8] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [vShow, e.modelValue == "forget"]
          ]),
          createVNode(unref(ElFormItem), null, {
            default: withCtx(() => [
              createVNode($, {
                style: { width: "100%" },
                type: "primary",
                onClick: u
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(d.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(unref(ElFormItem), null, {
            default: withCtx(() => [
              createElementVNode("div", {
                onClick: v[9] || (v[9] = (g) => _.$emit("update:modelValue", d.one.key))
              }, toDisplayString(d.one.value), 1),
              createElementVNode("div", {
                onClick: v[10] || (v[10] = (g) => _.$emit("update:modelValue", d.two.key))
              }, toDisplayString(d.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
}), form_vue_vue_type_style_index_0_scoped_5fdfc51d_lang = "", formVue = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-5fdfc51d"]]), _hoisted_1$e = { class: "u-sign" }, _hoisted_2$c = /* @__PURE__ */ createTextVNode("\u767B\u5F55/\u6CE8\u518C"), _hoisted_3$c = {
  key: 0,
  class: "sign-img normal",
  src: _imports_0,
  alt: ""
}, _hoisted_4$b = {
  key: 1,
  class: "sign-img greeting",
  src: _imports_1,
  alt: ""
}, _hoisted_5$a = {
  key: 2,
  class: "sign-img blindfold",
  src: _imports_2,
  alt: ""
}, _hoisted_6$8 = /* @__PURE__ */ createTextVNode("\u5176\u4ED6\u65B9\u5F0F\u767B\u5F55"), _hoisted_7$8 = { class: "sign-oauth" }, __default__$9 = {
  name: "USign"
}, _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  emits: ["submit"],
  setup(e, { emit: n }) {
    const t = ref(!1), o = ref("login"), a = ref(0), l = computed(() => {
      switch (o.value) {
        case "login":
          return "\u767B\u5F55";
        case "register":
          return "\u6CE8\u518C";
        case "forget":
          return "\u4FEE\u6539\u5BC6\u7801";
        default:
          return "";
      }
    });
    return (c, r) => {
      const s = resolveComponent("u-divider"), p = resolveComponent("u-icon"), i = resolveComponent("u-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1$e, [
        createVNode(unref(ElButton), {
          link: "",
          onClick: r[0] || (r[0] = (d) => t.value = !0)
        }, {
          default: withCtx(() => [
            _hoisted_2$c
          ]),
          _: 1
        }),
        createVNode(i, {
          modelValue: t.value,
          "onUpdate:modelValue": r[4] || (r[4] = (d) => t.value = d),
          title: unref(l),
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: withCtx(() => [
            a.value == 0 ? (openBlock(), createElementBlock("img", _hoisted_3$c)) : a.value == 1 ? (openBlock(), createElementBlock("img", _hoisted_4$b)) : (openBlock(), createElementBlock("img", _hoisted_5$a)),
            createVNode(formVue, {
              modelValue: o.value,
              "onUpdate:modelValue": r[1] || (r[1] = (d) => o.value = d),
              onToggle: r[2] || (r[2] = (d) => a.value = d),
              onSubmit: r[3] || (r[3] = (d) => c.$emit("submit", d))
            }, null, 8, ["modelValue"]),
            createVNode(s, null, {
              default: withCtx(() => [
                _hoisted_6$8
              ]),
              _: 1
            }),
            createElementVNode("div", _hoisted_7$8, [
              createVNode(p, { name: "QQ" }),
              createVNode(p, { name: "weixin" }),
              createVNode(p, { name: "gitee" }),
              createVNode(p, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}), sign_vue_vue_type_style_index_0_scoped_88f8558e_lang = "", signVue = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-88f8558e"]]), USign = withInstall(signVue), _withScopeId$b = (e) => (pushScopeId("data-v-9b5cb42f"), e = e(), popScopeId(), e), _hoisted_1$d = { class: "custom-contextmenu__menu" }, _hoisted_2$b = ["onClick"], _hoisted_3$b = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("div", { class: "arrow" }, null, -1)), _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "context-menu",
  props: {
    dropdown: null
  },
  emits: ["submit"],
  setup(e, { expose: n, emit: t }) {
    const o = reactive({
      tag: {},
      isShow: !1,
      dropdownList: [
        {
          title: "\u5237\u65B0",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1671"><path d="M894.481158 505.727133c0 49.589418-9.711176 97.705276-28.867468 143.007041-18.501376 43.74634-44.98454 83.031065-78.712713 116.759237-33.728172 33.728172-73.012897 60.211337-116.759237 78.712713-45.311998 19.156292-93.417623 28.877701-143.007041 28.877701s-97.695043-9.721409-142.996808-28.877701c-43.756573-18.501376-83.031065-44.98454-116.76947-78.712713-33.728172-33.728172-60.211337-73.012897-78.712713-116.759237-19.156292-45.301765-28.867468-93.417623-28.867468-143.007041 0-49.579185 9.711176-97.695043 28.867468-142.996808 18.501376-43.74634 44.98454-83.031065 78.712713-116.759237 33.738405-33.728172 73.012897-60.211337 116.76947-78.712713 45.301765-19.166525 93.40739-28.877701 142.996808-28.877701 52.925397 0 104.008842 11.010775 151.827941 32.745798 46.192042 20.977777 86.909395 50.79692 121.016191 88.608084 4.389984 4.860704 8.646937 9.854439 12.781094 14.97097l0-136.263453c0-11.307533 9.168824-20.466124 20.466124-20.466124 11.307533 0 20.466124 9.15859 20.466124 20.466124l0 183.64253c0 5.433756-2.148943 10.632151-5.986341 14.46955-3.847631 3.837398-9.046027 5.996574-14.479783 5.996574l-183.64253-0.020466c-11.307533 0-20.466124-9.168824-20.466124-20.466124 0-11.307533 9.168824-20.466124 20.466124-20.466124l132.293025 0.020466c-3.960195-4.952802-8.063653-9.782807-12.289907-14.479783-30.320563-33.605376-66.514903-60.098773-107.549481-78.753645-42.467207-19.289322-87.850837-29.072129-134.902456-29.072129-87.195921 0-169.172981 33.9533-230.816946 95.597265-61.654198 61.654198-95.597265 143.621025-95.597265 230.816946s33.943067 169.172981 95.597265 230.816946c61.643965 61.654198 143.621025 95.607498 230.816946 95.607498s169.172981-33.9533 230.816946-95.607498c61.654198-61.643965 95.597265-143.621025 95.597265-230.816946 0-11.2973 9.168824-20.466124 20.466124-20.466124C885.322567 485.261009 894.481158 494.429833 894.481158 505.727133z"></path></svg>'
        },
        {
          title: "\u5173\u95ED",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1701"><path d="M504.4084931 451.09198277L833.25648384 122.26912946a25.13744005 25.13744005 0 0 1 35.54434023 0l17.77217012 17.77217011a25.13744005 25.13744005 0 0 1 0 35.54434025L557.7501409 504.4084931 886.54785674 833.25648384a25.13744005 25.13744005 0 0 1 0 35.54434023l-17.77217012 17.77217012a25.13744005 25.13744005 0 0 1-35.54434023 0L504.4084931 557.7501409 175.58563982 886.54785674a25.13744005 25.13744005 0 0 1-35.54434025 0l-17.77217011-17.77217012a25.13744005 25.13744005 0 0 1 0-35.54434023l328.82285331-328.84799073-328.82285331-328.82285329a25.13744005 25.13744005 0 0 1 0-35.54434023l17.77217011-17.77217011a25.13744005 25.13744005 0 0 1 35.54434025 0l328.82285328 328.8228533z"></path></svg>'
        },
        {
          title: "\u5173\u95ED\u5176\u4ED6",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="829"><path d="M508.93637449 458.92857969l109.04150167-109.04150165a23.56635005 23.56635005 0 0 1 33.32281895 0l16.6614095 16.66140948a23.56635005 23.56635005 0 0 1 0 33.3463853L558.8970366 508.93637449l109.04150166 109.04150167a23.56635005 23.56635005 0 0 1 0 33.32281895l-16.66140948 16.6614095a23.56635005 23.56635005 0 0 1-33.32281898 0L508.93637449 558.8970366l-109.04150167 109.04150166a23.56635005 23.56635005 0 0 1-33.3463853 0l-16.66140948-16.66140948a23.56635005 23.56635005 0 0 1 0-33.32281898l109.04150165-109.04150165-109.04150165-109.04150169a23.56635005 23.56635005 0 0 1 0-33.34638529l16.66140948-16.66140949a23.56635005 23.56635005 0 0 1 33.3463853 0l109.04150167 109.04150166z m0 471.11490379c232.5763086 0 421.13067533-188.53080036 421.13067534-421.13067533C930.06704983 276.33649952 741.48911675 87.80569917 508.93637449 87.80569917 276.33649952 87.80569917 87.80569917 276.33649952 87.80569917 508.93637449c0 232.5763086 188.53080036 421.13067533 421.13067532 421.13067534z m0 70.69905013C237.31062386 1000.76609997 17.10664903 780.56212513 17.10664903 508.93637449 17.10664903 237.33419021 237.31062386 17.10664903 508.93637449 17.10664903c271.62575065 0 491.82972547 220.20397484 491.82972548 491.82972546 0 271.62575065-220.20397484 491.82972547-491.82972548 491.82972548z"></path></svg>'
        },
        {
          title: "\u5168\u90E8\u5173\u95ED",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="889"><path d="M192 640v32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V128H128v512h64z m128 128v32H256a32 32 0 0 1-32-32V256a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v64h-32V256H256v512h64z m288 128v32h-224a32 32 0 0 1-32-32V384a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v224h-32v-224H384v512h224z m96-224h224a32 32 0 0 1 32 32v224a32 32 0 0 1-32 32h-224a32 32 0 0 1-32-32v-224a32 32 0 0 1 32-32z m162.272 149.024l67.872-67.872-45.248-45.28-67.872 67.904-67.872-67.904-45.28 45.28 67.904 67.84-67.904 67.904 45.28 45.248 67.84-67.84 67.904 67.84 45.248-45.248-67.84-67.872z"></path></svg>'
        },
        {
          title: "\u5F53\u524D\u9875\u5168\u5C4F",
          show: !0,
          icon: '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="859"><path d="M160 96h192q14.016 0.992 23.008 10.016t8.992 22.496-8.992 22.496T352 160H160v192q0 14.016-8.992 23.008T128 384t-23.008-8.992T96 352V96h64z m0 832H96v-256q0-14.016 8.992-23.008T128 640t23.008 8.992T160 672v192h192q14.016 0 23.008 8.992t8.992 22.496-8.992 22.496T352 928H160zM864 96h64v256q0 14.016-8.992 23.008T896 384t-23.008-8.992T864 352V160h-192q-14.016 0-23.008-8.992T640 128.512t8.992-22.496T672 96h192z m0 832h-192q-14.016-0.992-23.008-10.016T640 895.488t8.992-22.496T672 864h192v-192q0-14.016 8.992-23.008T896 640t23.008 8.992T928 672v256h-64z"></path></svg>'
        }
      ]
    }), a = (p) => {
      o.tag = p, o.dropdownList[1].show = !p.meta.isAffix, l(), setTimeout(() => {
        o.isShow = !0;
      }, 100);
    }, l = () => {
      o.isShow = !1;
    };
    onMounted(() => {
      window.addEventListener("click", l);
    }), onUnmounted(() => {
      window.removeEventListener("click", l);
    });
    const { isShow: c, dropdownList: r, tag: s } = toRefs(o);
    return n({
      openContextmenu: a
    }), (p, i) => {
      const d = resolveComponent("u-icon");
      return openBlock(), createBlock(Transition, { name: "el-zoom-in-center" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            style: normalizeStyle(`top: ${e.dropdown.y + 5}px; left: ${e.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            createElementVNode("ul", _hoisted_1$d, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r), (u, m) => (openBlock(), createElementBlock(Fragment, { key: m }, [
                u.show ? (openBlock(), createElementBlock("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (_) => p.$emit("submit", m, unref(s))
                }, [
                  createVNode(d, {
                    innerHTML: u.icon
                  }, null, 8, ["innerHTML"]),
                  createElementVNode("span", null, toDisplayString(u.title), 1)
                ], 8, _hoisted_2$b)) : createCommentVNode("", !0)
              ], 64))), 128))
            ]),
            _hoisted_3$b
          ], 4), [
            [vShow, unref(c)]
          ])
        ]),
        _: 1
      });
    };
  }
}), contextMenu_vue_vue_type_style_index_0_scoped_9b5cb42f_lang = "", ContextMenu = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-9b5cb42f"]]), _withScopeId$a = (e) => (pushScopeId("data-v-6428f2e0"), e = e(), popScopeId(), e), _hoisted_1$c = { class: "u-tabs" }, _hoisted_2$a = ["onClick", "onContextmenu"], _hoisted_3$a = { class: "select-none" }, _hoisted_4$a = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  })
], -1)), __default__$8 = {
  name: "UTags"
}, _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  props: {
    classic: { type: Boolean },
    modelValue: null
  },
  emits: ["select", "refresh", "close", "closeOther", "closeAll", "fullScreen"],
  setup(e, { emit: n }) {
    const t = e, o = ref(), a = ref(), l = toRef(t, "modelValue"), c = ref(0), r = reactive({
      x: 0,
      y: 0
    });
    watch(
      () => [...l.value],
      (u, m) => {
        if (m) {
          if (u.length > m.length) {
            let _ = u.find((v) => !(m != null && m.includes(v)));
            l.value.forEach((v, $, g) => {
              g.findIndex((k) => k.meta.title == v.meta.title) != $ && g.splice($, 1);
            }), c.value = l.value.findIndex((v) => v.meta.title == (_ == null ? void 0 : _.meta.title));
          }
        } else {
          let _ = 1;
          l.value.forEach((v, $, g) => {
            g.findIndex((k) => k.meta.title == v.meta.title) != $ && (g.splice($, 1), c.value = g.findIndex((k) => k.meta.title == v.meta.title), _ = 0);
          }), _ && (c.value = l.value.length - 1);
        }
        nextTick(() => {
          o.value.update();
        });
      },
      {
        immediate: !0
      }
    ), watch(
      () => c.value,
      (u) => {
        n(
          "select",
          l.value.find((m, _) => _ == u)
        );
      }
    );
    const s = (u) => {
      l.value.map((m, _) => {
        if (!m.meta.isAffix && u == _)
          if (l.value.splice(_, 1), _ == c.value) {
            let $ = [_, _ - 1].filter((g) => g >= 0 && g < l.value.length);
            c.value = $[0], c.value == _ && n(
              "select",
              l.value.find((g, k) => k == u)
            );
          } else
            u < c.value && (c.value -= 1);
      });
    }, p = (u) => {
      let m = l.value.filter((v) => v.meta.isAffix);
      u && !u.meta.isAffix && m.push(u), l.value.length = 0, l.value.push(...m);
      let _ = l.value.length - 1;
      c.value = _ >= 0 ? _ : 0;
    }, i = (u, m) => {
      switch (u) {
        case 0:
          n("refresh", m);
          break;
        case 1:
          let _ = l.value.findIndex((v) => v.path == m.path);
          s(_), n("close", m);
          break;
        case 2:
          p(m), n("closeOther", m);
          break;
        case 3:
          p(), n("closeAll");
          break;
        case 4:
          n("fullScreen", m);
          break;
      }
    }, d = (u, m) => {
      const { clientX: _, clientY: v } = m;
      r.x = _, r.y = v, a.value.openContextmenu(u);
    };
    return (u, m) => {
      const _ = resolveComponent("u-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$c, [
        createVNode(unref(ElScrollbar), {
          ref_key: "scrollbarRef",
          ref: o
        }, {
          default: withCtx(() => [
            createElementVNode("ul", {
              class: normalizeClass([{ "classic-style": e.classic }, "u-tabs-ul"])
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(e.modelValue, (v, $) => (openBlock(), createElementBlock("li", {
                key: $,
                class: normalizeClass([{ "is-active": c.value == $ }, "u-tabs-ul-li"]),
                onClick: (g) => c.value = $,
                onContextmenu: withModifiers((g) => d(v, g), ["prevent"])
              }, [
                createElementVNode("span", _hoisted_3$a, toDisplayString(v.meta.title), 1),
                v.meta.isAffix ? createCommentVNode("", !0) : (openBlock(), createBlock(_, {
                  key: 0,
                  onClick: withModifiers((g) => i(1, v), ["stop"])
                }, {
                  default: withCtx(() => [
                    _hoisted_4$a
                  ]),
                  _: 2
                }, 1032, ["onClick"]))
              ], 42, _hoisted_2$a))), 128))
            ], 2)
          ]),
          _: 1
        }, 512),
        createVNode(ContextMenu, {
          ref_key: "contextmenuRef",
          ref: a,
          dropdown: r,
          onSubmit: i
        }, null, 8, ["dropdown"])
      ]);
    };
  }
}), tags_vue_vue_type_style_index_0_scoped_6428f2e0_lang = "", tagsVue = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-6428f2e0"]]), UTags = withInstall(tagsVue), _hoisted_1$b = { key: 0 }, __default__$7 = {
  name: "UNoticeBar"
}, _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: {
    data: null,
    size: { default: 14 },
    vertical: { type: Boolean },
    height: { default: 40 },
    delay: { default: 1e3 },
    spped: { default: 100 },
    suffixIcon: null,
    prefixIcon: null,
    color: { default: "--color-warning" },
    background: { default: "var(--color-warning-light-9)" }
  },
  setup(e) {
    const n = e, t = reactive({
      boxWidth: 0,
      textWidth: 0,
      oneTime: 0,
      twoTime: 0,
      order: 1
    }), o = ref({}), a = ref({}), l = computed(() => n.delay > 2e3 ? n.delay : 2e3), c = () => {
      nextTick(() => {
        t.boxWidth = o.value.offsetWidth, t.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${t.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${t.boxWidth}px;} 100% {left: -${t.textWidth}px;}}`
        ), r(), setTimeout(() => {
          s();
        }, n.delay);
      });
    }, r = () => {
      t.oneTime = t.textWidth / n.spped, t.twoTime = (t.textWidth + t.boxWidth) / n.spped;
    }, s = () => {
      t.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${t.oneTime}s linear; opactity: 1;}`, t.order = 2) : a.value.style.cssText = `animation: twoAnimation ${t.twoTime}s linear infinite; opacity: 1;`;
    }, p = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          s();
        },
        !1
      );
    };
    return onMounted(() => {
      n.vertical || (c(), p());
    }), (i, d) => {
      const u = resolveComponent("el-carousel-item"), m = resolveComponent("u-icon");
      return openBlock(), createElementBlock("div", {
        class: "u-notice-bar",
        style: normalizeStyle({ background: e.background, height: `${e.height}px` })
      }, [
        e.vertical ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
          createVNode(unref(ElCarousel), {
            height: "40px",
            direction: "vertical",
            autoplay: !0,
            "indicator-position": "none",
            interval: unref(l)
          }, {
            default: withCtx(() => [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (_) => (openBlock(), createBlock(u, { key: _ }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_), 1)
                ]),
                _: 2
              }, 1024))), 128))
            ]),
            _: 1
          }, 8, ["interval"])
        ])) : (openBlock(), createElementBlock("div", {
          key: 1,
          style: normalizeStyle({ color: e.color, fontSize: `${e.size}px` }),
          class: "u-notice-bar-wrap"
        }, [
          e.prefixIcon ? (openBlock(), createBlock(m, {
            key: 0,
            name: e.prefixIcon
          }, null, 8, ["name"])) : createCommentVNode("", !0),
          createElementVNode("div", {
            ref_key: "boxRef",
            ref: o,
            class: "text-box"
          }, [
            createElementVNode("div", {
              ref_key: "textRef",
              ref: a,
              class: "text"
            }, toDisplayString(e.data), 513)
          ], 512),
          e.suffixIcon ? (openBlock(), createBlock(m, {
            key: 1,
            name: e.suffixIcon
          }, null, 8, ["name"])) : createCommentVNode("", !0)
        ], 4))
      ], 4);
    };
  }
}), noticeBar_vue_vue_type_style_index_0_scoped_bd038534_lang = "", noticeBarVue = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-bd038534"]]), UNoticeBar = withInstall(noticeBarVue), _withScopeId$9 = (e) => (pushScopeId("data-v-7dae6166"), e = e(), popScopeId(), e), _hoisted_1$a = { class: "u-anchor" }, _hoisted_2$9 = { class: "toc-content" }, _hoisted_3$9 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("h3", { class: "toc-content-heading" }, "\u76EE\u5F55", -1)), _hoisted_4$9 = { class: "toc-items" }, _hoisted_5$9 = ["onClick"], __default__$6 = {
  name: "UAnchor"
}, _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: {
    container: null,
    scroll: null,
    targetOffset: { default: 0 }
  },
  setup(e) {
    const n = e, t = ref(0), o = ref({}), a = ref({}), l = (p) => {
      switch (p) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, c = () => {
      const p = [];
      o.value.forEach((u) => {
        p.push(u.offsetTop);
      });
      const d = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      p.forEach((u, m) => {
        d >= u - 10 - n.targetOffset && (t.value = m);
      });
    }, r = (p) => {
      const i = o.value.item(p);
      console.log(i), n.scroll ? a.value.scrollTo({
        top: i.offsetTop - n.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: i.offsetTop - n.targetOffset,
        behavior: "smooth"
      });
    };
    onMounted(() => {
    }), onUnmounted(() => {
      a.value.removeEventListener("scroll", c);
    });
    let s;
    return onMounted(() => {
      let p = document.querySelector(n.container);
      s = new ResizeObserver((i) => {
        n.scroll ? a.value = document.querySelector(n.scroll) : a.value = window, o.value = p.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", c);
      }), s.observe(p);
    }), onUnmounted(() => {
      a.value.removeEventListener("scroll", c), s.disconnect();
    }), (p, i) => {
      const d = resolveComponent("u-divider");
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createElementVNode("nav", _hoisted_2$9, [
          _hoisted_3$9,
          createVNode(d),
          createElementVNode("ul", _hoisted_4$9, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(o.value, (u, m) => (openBlock(), createElementBlock("li", {
              key: m,
              class: normalizeClass([{ active: t.value == m }, l(u.nodeName)]),
              onClick: (_) => r(m)
            }, toDisplayString(u.innerText), 11, _hoisted_5$9))), 128))
          ])
        ])
      ]);
    };
  }
}), anchor_vue_vue_type_style_index_0_scoped_7dae6166_lang = "", anchorVue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-7dae6166"]]), UAnchor = withInstall(anchorVue), _withScopeId$8 = (e) => (pushScopeId("data-v-71545b29"), e = e(), popScopeId(), e), _hoisted_1$9 = { class: "card-box u-scrollbar" }, _hoisted_2$8 = {
  key: 0,
  class: "history"
}, _hoisted_3$8 = { class: "header" }, _hoisted_4$8 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("div", { class: "title" }, "\u5386\u53F2\u641C\u7D22", -1)), _hoisted_5$8 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  })
], -1)), _hoisted_6$7 = /* @__PURE__ */ createTextVNode(" \u6E05\u7A7A "), _hoisted_7$7 = { class: "trending" }, _hoisted_8$6 = { class: "title" }, _hoisted_9$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("span", null, "\u70ED\u641C", -1)), _hoisted_10$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("svg", {
  "data-v-5fe91717": "",
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "data-v-5fe91717": "",
    d: "M12.8 5.2C13.9532 6.46 14.8 8.2 14.8 10C14.7039 12.8937 12.6843 15.1706 9.97973 15.8159C10.359 12.3442 7.77588 9.35406 7.77588 9.35406C7.77588 9.35406 7.99512 13.7064 6.79514 15.8104C4.03715 15.1428 2 12.7806 2 9.8C2 7.776 2.9336 5.9728 4.4 4.8C5.8608 3.7056 6.8 1.9656 6.8 0C9.684 0.4368 11.894 2.9264 11.894 5.932C11.894 6.5012 11.746 7.0652 11.6 7.6C12.1264 6.9024 12.6184 6.0876 12.8 5.2Z",
    fill: "#F53F3F"
  })
], -1)), _hoisted_11$2 = { class: "hot-list" }, _hoisted_12$2 = ["onClick"], _hoisted_13$1 = { class: "trending-text u-ellipsis" }, _hoisted_14$1 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("div", { class: "trending-mark" }, null, -1)), _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "card-box",
  props: {
    data: null
  },
  emits: ["onClose", "submit", "onClear"],
  setup(e, { emit: n }) {
    return (t, o) => {
      const a = resolveComponent("u-icon");
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$9, [
        e.data.historySearchList.length != 0 ? (openBlock(), createElementBlock("div", _hoisted_2$8, [
          createElementVNode("div", _hoisted_3$8, [
            _hoisted_4$8,
            createVNode(unref(ElButton), {
              class: "clear",
              link: "",
              type: "primary",
              onClick: o[0] || (o[0] = (l) => t.$emit("onClear"))
            }, {
              default: withCtx(() => [
                createVNode(a, null, {
                  default: withCtx(() => [
                    _hoisted_5$8
                  ]),
                  _: 1
                }),
                _hoisted_6$7
              ]),
              _: 1
            })
          ]),
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data.historySearchList, (l, c) => (openBlock(), createBlock(unref(ElTag), {
            key: c,
            type: l.type,
            closable: "",
            onClose: (r) => t.$emit("onClose", l.name),
            onClick: (r) => t.$emit("submit", l.name)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(l.name), 1)
            ]),
            _: 2
          }, 1032, ["type", "onClose", "onClick"]))), 128))
        ])) : createCommentVNode("", !0),
        createElementVNode("div", _hoisted_7$7, [
          createElementVNode("div", _hoisted_8$6, [
            _hoisted_9$3,
            createVNode(a, { style: { margin: "0 6px" } }, {
              default: withCtx(() => [
                _hoisted_10$3
              ]),
              _: 1
            })
          ]),
          createElementVNode("div", _hoisted_11$2, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data.hotSearchList, (l, c) => (openBlock(), createElementBlock("div", {
              key: c,
              class: "hot-item",
              onClick: (r) => t.$emit("submit", l)
            }, [
              createElementVNode("div", {
                class: normalizeClass(["trending-rank", { "trending-rank-top": c < 3 }])
              }, toDisplayString(c + 1), 3),
              createElementVNode("div", _hoisted_13$1, toDisplayString(l), 1),
              _hoisted_14$1
            ], 8, _hoisted_12$2))), 128))
          ])
        ])
      ], 512)), [
        [vShow, e.data.cardVisible]
      ]);
    };
  }
}), cardBox_vue_vue_type_style_index_0_scoped_71545b29_lang = "", CardBox = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-71545b29"]]), _withScopeId$7 = (e) => (pushScopeId("data-v-e8ce8d26"), e = e(), popScopeId(), e), _hoisted_1$8 = { class: "u-search" }, _hoisted_2$7 = { style: { display: "flex", "align-items": "center", "padding-left": "8px" } }, _hoisted_3$7 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7187"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M344.16 960c-58.976-124.256-27.552-195.456 17.76-262.528 49.632-73.472 62.432-146.176 62.432-146.176s39.008 51.36 23.424 131.68c68.928-77.696 81.888-201.472 71.52-248.896 155.776 110.272 222.336 348.992 132.64 525.92C1129.024 686.528 770.56 277.376 708.16 231.264c20.8 46.08 24.736 124.128-17.28 161.984C619.744 120 443.84 64 443.84 64c20.8 140.928-75.392 295.008-168.16 410.144-3.264-56.192-6.72-94.976-35.872-148.736-6.56 102.08-83.552 185.28-104.416 287.552-28.256 138.496 21.152 239.904 208.832 347.008L344.16 960zM344.16 960",
    "p-id": "7188",
    fill: "#F53F3F"
  })
], -1)), _hoisted_4$7 = ["data-before", "data-after"], _hoisted_5$7 = ["placeholder"], _hoisted_6$6 = { class: "btn" }, _hoisted_7$6 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg",
  "data-v-78e17ca8": ""
}, [
  /* @__PURE__ */ createElementVNode("path", {
    fill: "currentColor",
    d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    fill: "currentColor",
    d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"
  })
], -1)), _hoisted_8$5 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "738"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z",
    "p-id": "739"
  })
], -1)), __default__$5 = {
  name: "USearch"
}, _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: {
    config: null
  },
  emits: ["submit"],
  setup(e, { emit: n }) {
    const t = e, o = ref({}), a = toRef(t.config, "keywords"), l = ref(!1), c = ref(0), r = ref(!0), s = ref(), p = reactive({
      types: ["success", "info", "warning", "danger"]
    }), i = reactive({
      search: "",
      cardVisible: !1,
      historySearchList: storage.get("searchHistory") || [],
      hotSearchList: t.config.hotSearchList
    });
    watch(
      () => t.config.hotSearchList,
      (x) => {
        i.hotSearchList = x;
      }
    );
    const d = computed(() => {
      let x = a.value[c.value];
      return l.value || i.search ? "" : x;
    }), u = computed(() => {
      let x = typeof a.value[c.value + 1] > "u" ? a.value[0] : a.value[c.value + 1];
      return l.value || i.search ? "" : x;
    }), m = computed(() => {
      let x = a.value[c.value];
      return l.value ? x : "";
    }), _ = computed(() => !l.value && !i.search && r.value), v = (x) => {
      let C = (w, E) => Math.round(Math.random() * (E - w)) + w, y = (w) => i.historySearchList.filter((E) => E.name == w).length != 0;
      if (x && i.historySearchList)
        y(x) || i.historySearchList.push({ name: x, type: p.types[C(0, 3)] });
      else {
        let w = l.value ? m : d;
        x = w.value, y(w.value) || i.historySearchList.push({ name: w.value, type: p.types[C(0, 3)] });
      }
      storage.set("searchHistory", i.historySearchList), i.search = x, o.value.focus(), n("submit", x);
    }, $ = (x) => {
      i.historySearchList.findIndex((C) => C.name == x), i.historySearchList.splice(
        i.historySearchList.findIndex((C) => C.name == x),
        1
      ), storage.set("searchHistory", i.historySearchList);
    }, g = () => {
      i.historySearchList.length = 0, storage.remove("searchHistory");
    }, k = (x) => {
      if (x.pseudoElement == "::after") {
        r.value = !1;
        let C = typeof a.value[c.value + 1] > "u" ? 0 : c.value + 1;
        c.value = C, setTimeout(() => {
          r.value = !0;
        }, 3e3);
      }
    };
    return (x, C) => {
      const y = resolveComponent("u-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", {
          class: normalizeClass(["search", { active: l.value }])
        }, [
          createElementVNode("div", _hoisted_2$7, [
            createVNode(y, null, {
              default: withCtx(() => [
                _hoisted_3$7
              ]),
              _: 1
            })
          ]),
          createElementVNode("label", {
            ref_key: "labelRef",
            ref: s,
            "data-before": unref(d),
            "data-after": unref(u),
            class: normalizeClass({ animate: unref(_) }),
            onAnimationend: k
          }, [
            withDirectives(createElementVNode("input", {
              ref_key: "inputRef",
              ref: o,
              "onUpdate:modelValue": C[0] || (C[0] = (w) => i.search = w),
              type: "text",
              placeholder: unref(m),
              onFocus: C[1] || (C[1] = () => {
                l.value = !0, i.cardVisible = !0;
              }),
              onBlur: C[2] || (C[2] = (w) => l.value = !1),
              onKeyup: C[3] || (C[3] = withKeys((w) => v(i.search), ["enter"]))
            }, null, 40, _hoisted_5$7), [
              [vModelText, i.search]
            ])
          ], 42, _hoisted_4$7),
          createElementVNode("div", _hoisted_6$6, [
            withDirectives(createVNode(y, {
              class: "close",
              onClick: C[4] || (C[4] = (w) => i.search = "")
            }, {
              default: withCtx(() => [
                _hoisted_7$6
              ]),
              _: 1
            }, 512), [
              [vShow, i.search]
            ]),
            createElementVNode("div", {
              class: "search-btn",
              onClick: C[5] || (C[5] = (w) => v(i.search))
            }, [
              createVNode(y, null, {
                default: withCtx(() => [
                  _hoisted_8$5
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        withDirectives(createVNode(CardBox, {
          data: i,
          onOnClose: $,
          onOnClear: g,
          onSubmit: v
        }, null, 8, ["data"]), [
          [unref(ClickOutside), () => i.cardVisible = !1, s.value]
        ])
      ]);
    };
  }
}), search_vue_vue_type_style_index_0_scoped_e8ce8d26_lang = "", searchVue = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-e8ce8d26"]]), USearch = withInstall(searchVue), useEmojiParse = (e, n) => {
  const t = /\[.+?\]/g;
  return n = n.replace(t, (o) => {
    const a = e[o];
    return a ? [
      '<img src="',
      a,
      '" width="20" height="20" alt="',
      o,
      '" title="',
      o,
      '" style="margin: 0 1px; vertical-align: text-bottom"',
      "/>"
    ].join("") : o;
  }), n;
}, useLevel = (e) => {
  switch (e) {
    case 1:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="831"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#8CDBF4" p-id="832"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="833"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m950.857143-365.714285l73.142857-73.142858v146.285715h-73.142857z m73.142857-73.142858h146.285715v146.285715h-146.285715z m0 146.285715h146.285715v438.857143h-146.285715z" fill="#FFFFFF"></path></svg>';
    case 2:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="765"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#6ECEFF" p-id="766"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="767"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v146.285714h-146.285714z m-219.428572 292.571428V512h146.285714v146.285714z" fill="#FFFFFF" p-id="768"></path><path d="M1097.142857 585.142857V438.857143h365.714286v146.285714z m0 73.142857h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 3:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="799"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#599DFF" p-id="800"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="801"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m877.714286-438.857143h365.714286v146.285715h-365.714286z m219.428572 146.285715h146.285714v73.142857h-146.285714z m0 219.428571h146.285714v73.142857h-146.285714z m-146.285715-146.285714h292.571429v146.285714h-292.571429z m-73.142857 219.428571h365.714286v146.285715h-365.714286z" fill="#FFFFFF"></path></svg>';
    case 4:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="815"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#34D19B" p-id="816"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="817"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m975.213715-365.714285L1243.428571 219.428571v219.428572h-146.285714zM1097.142857 438.857143h146.285714v292.571428h-146.285714z m146.285714 146.285714h73.142858v146.285714h-73.142858z m0-365.714286h73.142858v146.285715h-73.142858z m73.142858 0h146.285714v585.142858h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 5:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="782"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#FFA000" p-id="783"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="784"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-73.142857h146.285714v219.428572h-146.285714z m-219.428572-365.714286h365.714286v146.285715h-365.714286z m0 438.857143h219.428572v146.285715h-219.428572z m73.142857-219.428571h219.428572v146.285714h-219.428572z" fill="#FFFFFF" p-id="785"></path><path d="M1316.571429 438.857143h146.285714v146.285714h-146.285714z m-219.428572-73.142857h146.285714v219.428571h-146.285714z" fill="#FFFFFF"></path></svg>';
    case 6:
      return '<svg viewBox="0 0 1682 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="748"><path d="M219.428571 73.142857h1243.428572a146.285714 146.285714 0 0 1 146.285714 146.285714v585.142858a146.285714 146.285714 0 0 1-146.285714 146.285714H219.428571a146.285714 146.285714 0 0 1-146.285714-146.285714V219.428571a146.285714 146.285714 0 0 1 146.285714-146.285714z" fill="#F36262" p-id="749"></path><path d="M219.428571 292.571429h146.285715v512H219.428571z m365.714286 146.285714h146.285714l146.285715 365.714286h-146.285715z" fill="#FFFFFF" p-id="750"></path><path d="M1024 438.857143h-146.285714l-146.285715 365.714286h146.285715zM219.428571 658.285714h365.714286v146.285715H219.428571z m1097.142858-146.285714h146.285714v292.571429h-146.285714z m-73.142858-292.571429h146.285715v146.285715h-146.285715z m-146.285714 146.285715h146.285714v438.857143h-146.285714z" fill="#FFFFFF" p-id="751"></path><path d="M1243.428571 438.857143h219.428572v146.285714h-219.428572z m-48.786285-170.642286L1243.428571 219.428571v146.285715h-146.285714zM1243.428571 658.285714h146.285715v146.285715h-146.285715z" fill="#FFFFFF"></path></svg>';
    default:
      return "";
  }
}, usePage = (e, n, t) => {
  let o = (e - 1) * n;
  return o + n >= t.length ? t.slice(o, t.length) : t.slice(o, o + n);
}, _withScopeId$6 = (e) => (pushScopeId("data-v-0a41305e"), e = e(), popScopeId(), e), _hoisted_1$7 = { class: "message" }, _hoisted_2$6 = { class: "chat-list" }, _hoisted_3$6 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_4$6 = { class: "content" }, _hoisted_5$6 = {
  key: 0,
  class: "username"
}, _hoisted_6$5 = ["innerHTML"], _hoisted_7$5 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("div", { class: "date" }, null, -1)), _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "message",
  props: {
    data: null,
    userId: null
  },
  setup(e, { expose: n }) {
    const { allEmoji: t } = inject(InjectionEmojiApi), o = ref();
    return n({
      scroll: () => {
        nextTick(() => {
          const l = document.querySelector(".chat-item:last-child");
          o.value.setScrollTop(l.offsetTop);
        });
      }
    }), (l, c) => (openBlock(), createElementBlock("div", _hoisted_1$7, [
      createVNode(unref(ElScrollbar), {
        ref_key: "scrollbarRef",
        ref: o
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$6, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (r, s) => (openBlock(), createElementBlock("div", {
              key: s,
              class: normalizeClass([{ self: e.userId == r.id }, "chat-item"])
            }, [
              createElementVNode("div", null, [
                createVNode(unref(ElAvatar), null, {
                  default: withCtx(() => [
                    _hoisted_3$6
                  ]),
                  _: 1
                })
              ]),
              createElementVNode("div", _hoisted_4$6, [
                e.userId != r.id ? (openBlock(), createElementBlock("div", _hoisted_5$6, toDisplayString(r.username), 1)) : createCommentVNode("", !0),
                createElementVNode("div", {
                  class: "card-box",
                  innerHTML: unref(useEmojiParse)(unref(t), r.content)
                }, null, 8, _hoisted_6$5)
              ]),
              _hoisted_7$5
            ], 2))), 128))
          ])
        ]),
        _: 1
      }, 512)
    ]));
  }
}), message_vue_vue_type_style_index_0_scoped_0a41305e_lang = "", Message = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-0a41305e"]]), _withScopeId$5 = (e) => (pushScopeId("data-v-86dc96f5"), e = e(), popScopeId(), e), _hoisted_1$6 = { class: "u-chat" }, _hoisted_2$5 = { class: "header" }, _hoisted_3$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1318 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M1318.502489 432.779052c0-231.790522-209.29842-419.704826-467.458992-419.704826s-467.56979 188.357498-467.56979 419.704826 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319412-19.168145L1165.822116 742.350141C1259.336074 665.56676 1318.502489 555.433023 1318.502489 432.779052z",
    fill: "#612273",
    "p-id": "10993"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    d: "M1034.304263 745.784895a509.673231 509.673231 0 0 1-183.482363 33.239559c-244.532352 0-445.077689-168.524562-465.353819-383.25211-1.107985 12.07704-1.883575 24.264878-1.883575 36.563514 0 231.790522 209.409219 419.704826 467.56979 419.704826a512.110799 512.110799 0 0 0 183.482363-33.239559l93.292361 93.292361a25.816057 25.816057 0 0 0 44.319411-19.168145 25.262064 25.262064 0 0 0-7.5343-17.284571zM1165.822116 669.223112l2.769964 70.689461C1260.44406 663.239991 1318.502489 553.992642 1318.502489 432.779052a366.632331 366.632331 0 0 0-1.883575-36.785111 403.971435 403.971435 0 0 1-150.796798 273.229171z",
    fill: "#612273",
    opacity: ".2",
    "p-id": "10994"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    d: "M383.25211 432.779052a383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978C173.510496 258.160571 0 413.943302 0 606.178749c0 101.713049 48.97295 193.011037 126.421121 256.609392l-5.761524 148.470028a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696c-177.831638-59.388011-304.91755-212.733175-304.91755-393.113179z",
    fill: "#EB3D72",
    "p-id": "10995"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    d: "M342.256654 391.672798c0 117.557239 53.958883 223.59143 140.714132 299.71002a391.008007 391.008007 0 0 1-99.718676-258.603766 383.141311 383.141311 0 0 1 41.881844-172.956503c-12.298637-0.997187-24.81887-1.661978-37.449903-1.661978-7.091106 0-14.071413 0-21.05172 0.553993a375.939407 375.939407 0 0 0-24.375677 132.958234zM630.111231 802.181346a407.627786 407.627786 0 0 1-283.533434 110.798528 424.136767 424.136767 0 0 1-152.12638-27.699632l-71.686647 71.686648-2.105173 54.291279a12.187838 12.187838 0 0 0 20.830124 9.08548l94.06795-93.957153A425.577148 425.577148 0 0 0 387.79485 954.196927a404.636226 404.636226 0 0 0 300.37481-128.304696 486.294741 486.294741 0 0 1-58.058429-23.710885zM85.425665 821.792686l-5.761523-4.985934c1.883575 2.215971 3.656351 4.431941 5.650725 6.647911z",
    fill: "#EB3D72",
    opacity: ".5",
    "p-id": "10996"
  }),
  /* @__PURE__ */ createElementVNode("path", {
    d: "M833.426531 332.395585c64.263147-10.193465 64.041549-66.479117 62.601169-75.342999s-15.400995-54.291279-59.942004-47.200173S799.078987 254.836615 799.078987 254.836615a28.475222 28.475222 0 1 0 56.174854-8.97468s6.315516 3.323956 8.30989 20.27613-11.966241 29.029214-35.455529 33.239559-88.638823-19.943735-104.039819-115.452067C709.110582 96.39472 781.57282 28.253625 838.966457 13.185025a55.399264 55.399264 0 0 0-64.041549-5.318329c-56.064055 35.123134-97.170309 109.579745-85.536464 182.817571 14.957801 93.846354 79.664142 151.904783 144.038087 141.711318zM203.980091 573.825579a53.072495 53.072495 0 0 0 33.90435-67.919498c-2.659165-6.537113-21.162519-38.225492-53.51569-25.040467a30.026401 30.026401 0 0 0-19.832936 40.773858 22.159706 22.159706 0 1 0 40.773858-16.619779s5.318329 1.329582 9.861069 13.739017-3.988747 24.043281-21.05172 31.023588-70.02467 0.553993-98.832288-68.695087C68.916685 417.599654 110.798528 353.558104 151.904783 332.395585a42.879031 42.879031 0 0 0-48.97295 7.423502 146.918849 146.918849 0 0 0-32.574767 152.458775c27.810431 68.141095 86.866046 100.605064 133.623025 81.547717z",
    fill: "#FED150",
    "p-id": "10997"
  })
], -1)), _hoisted_4$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("div", { style: { "margin-left": "12px" } }, [
  /* @__PURE__ */ createElementVNode("div", null, "\u804A\u5929\u5BA4"),
  /* @__PURE__ */ createElementVNode("div", { style: { "font-size": "12px" } }, "\u5F53\u524D2\u4EBA\u5728\u7EBF")
], -1)), _hoisted_5$5 = {
  id: "chat-footer",
  class: "footer"
}, _hoisted_6$4 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "22",
  height: "22",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "7186"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448c247.008 0 448 200.96 448 448S757.984 960 510.944 960zM510.944 128c-211.744 0-384 172.256-384 384 0 211.744 172.256 384 384 384 211.744 0 384-172.256 384-384C894.944 300.256 722.688 128 510.944 128zM512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48l0-64c0-26.528 21.472-48 48-48s48 21.472 48 48l0 64C416 493.696 394.496 515.2 368 515.2zM656 515.2c-26.496 0-48-21.472-48-48l0-64c0-26.528 21.504-48 48-48s48 21.472 48 48l0 64C704 493.696 682.496 515.2 656 515.2z",
    "p-id": "7187"
  })
], -1)), _hoisted_7$4 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1025 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "15072"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M1008.00076 6.285714q18.857143 13.714286 15.428571 36.571429l-146.285714 877.714286q-2.857143 16.571429-18.285714 25.714286-8 4.571429-17.714286 4.571429-6.285714 0-13.714286-2.857143l-258.857143-105.714286-138.285714 168.571429q-10.285714 13.142857-28 13.142857-7.428571 0-12.571429-2.285714-10.857143-4-17.428571-13.428571t-6.571429-20.857143l0-199.428571 493.714286-605.142857-610.857143 528.571429-225.714286-92.571429q-21.142857-8-22.857143-31.428571-1.142857-22.857143 18.285714-33.714286l950.857143-548.571429q8.571429-5.142857 18.285714-5.142857 11.428571 0 20.571429 6.285714z",
    "p-id": "15073"
  })
], -1)), _hoisted_8$4 = /* @__PURE__ */ createTextVNode("chat"), __default__$4 = {
  name: "UChat"
}, _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: {
    data: null,
    userId: null,
    emoji: null
  },
  emits: ["submit"],
  setup(e, { emit: n }) {
    const t = e, o = ref(!1), a = ref(""), l = ref(), c = (i) => {
      const { ctrlKey: d, key: u } = i;
      d && u == "Enter" && s();
    }, r = () => {
      a.value = "", l.value.scroll();
    }, s = () => {
      let i = a.value;
      i.trim() ? (i = i.replace(/\n/g, "<br/>"), n("submit", { clear: r, content: i })) : UToast({ type: "error", message: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A" });
    }, p = (i) => {
      let d = document.getElementById("emojiInput"), u = d.selectionStart, m = d.selectionEnd, _ = d.value;
      if (u === null || m === null)
        return;
      let v = _.substring(0, u) + i + _.substring(m);
      d.value = v, d.focus(), d.selectionStart = u + i.length, d.selectionEnd = u + i.length, a.value = v;
    };
    return provide(InjectionEmojiApi, t.emoji), (i, d) => {
      const u = resolveComponent("u-icon"), m = resolveComponent("u-emoji");
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createElementVNode("div", {
          class: normalizeClass([{ active: o.value }, "chat-container translate"])
        }, [
          createElementVNode("div", _hoisted_2$5, [
            createVNode(u, { size: "32" }, {
              default: withCtx(() => [
                _hoisted_3$5
              ]),
              _: 1
            }),
            _hoisted_4$5
          ]),
          createVNode(Message, {
            ref_key: "messageRef",
            ref: l,
            data: e.data,
            "user-id": e.userId
          }, null, 8, ["data", "user-id"]),
          createElementVNode("div", _hoisted_5$5, [
            createVNode(unref(ElInput), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": d[0] || (d[0] = (_) => a.value = _),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
              onKeydown: withKeys(c, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            createVNode(m, {
              style: { margin: "0 8px 0" },
              emoji: e.emoji,
              placement: "top-end",
              onAddEmoji: p
            }, {
              default: withCtx(() => [
                _hoisted_6$4
              ]),
              _: 1
            }, 8, ["emoji"]),
            createVNode(u, {
              size: "18",
              class: normalizeClass([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: s
            }, {
              default: withCtx(() => [
                _hoisted_7$4
              ]),
              _: 1
            }, 8, ["class"])
          ])
        ], 2),
        createVNode(unref(ElButton), {
          class: "chat-btn",
          onClick: d[1] || (d[1] = (_) => o.value = !o.value)
        }, {
          default: withCtx(() => [
            _hoisted_8$4
          ]),
          _: 1
        })
      ]);
    };
  }
}), chat_vue_vue_type_style_index_0_scoped_86dc96f5_lang = "", chatVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-86dc96f5"]]), UChat = withInstall(chatVue), _withScopeId$4 = (e) => (pushScopeId("data-v-54bea938"), e = e(), popScopeId(), e), _hoisted_1$5 = { class: "u-emoji" }, _hoisted_2$4 = { class: "face-tooltip-head select-none" }, _hoisted_3$4 = ["onClick"], _hoisted_4$4 = ["src"], _hoisted_5$4 = { class: "emoji-body select-none" }, _hoisted_6$3 = { style: { padding: "0 5px" } }, _hoisted_7$3 = ["onClick"], _hoisted_8$3 = { class: "emoji-btn select-none" }, _hoisted_9$2 = { key: 0 }, _hoisted_10$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "icon"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "data-v-9fe533ba": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M8.00002 0.666504C12.0501 0.666504 15.3334 3.94975 15.3334 7.99984C15.3334 12.0499 12.0501 15.3332 8.00002 15.3332C3.94993 15.3332 0.666687 12.0499 0.666687 7.99984C0.666687 3.94975 3.94993 0.666504 8.00002 0.666504ZM8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2ZM10.6667 5.66667V7.66667H9.33333V5.66667H10.6667ZM6.66667 5.66667V7.66667H5.33333V5.66667H6.66667ZM10.0767 9.33333H11.0495C11.1804 9.33333 11.2866 9.43951 11.2866 9.57048C11.2866 9.60754 11.2779 9.64409 11.2612 9.67718L11.244 9.71053C10.6294 10.8739 9.40726 11.6667 7.99998 11.6667C6.61523 11.6667 5.40977 10.8991 4.7859 9.76612L4.73786 9.67593C4.67845 9.56052 4.72385 9.4188 4.83926 9.35939C4.87253 9.34226 4.90941 9.33333 4.94683 9.33333H5.92347C6.02396 9.33332 6.11908 9.37865 6.18238 9.4567C6.26207 9.55496 6.32833 9.62955 6.38117 9.68046C6.80074 10.0847 7.37133 10.3333 7.99998 10.3333C8.63289 10.3333 9.20694 10.0814 9.62728 9.67224C9.67791 9.62296 9.74135 9.55121 9.8176 9.45698C9.88089 9.37877 9.97611 9.33333 10.0767 9.33333Z"
  })
], -1)), _hoisted_11$1 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("span", null, "\u8868\u60C5", -1)), _hoisted_12$1 = [
  _hoisted_10$2,
  _hoisted_11$1
], __default__$3 = {
  name: "UEmoji"
}, _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: {
    emoji: null,
    placement: { default: "bottom" }
  },
  emits: ["addEmoji"],
  setup(e, { emit: n }) {
    const t = e, o = ref(0), a = ref(0), l = ref(new Array(2)), { emojiList: c, faceList: r } = t.emoji;
    function s(i) {
      switch (o.value = i, i) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, l.value[1] = c[1];
          break;
      }
    }
    function p() {
      l.value[0] = c[0];
    }
    return (i, d) => (openBlock(), createElementBlock("div", _hoisted_1$5, [
      createVNode(unref(ElPopover), {
        placement: e.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: p
      }, {
        reference: withCtx(() => [
          createElementVNode("div", _hoisted_8$3, [
            i.$slots.default ? renderSlot(i.$slots, "default", { key: 1 }, void 0, !0) : (openBlock(), createElementBlock("div", _hoisted_9$2, _hoisted_12$1))
          ])
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$4, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r), (u, m) => (openBlock(), createElementBlock("label", {
              key: m,
              class: normalizeClass(o.value == m ? "active" : ""),
              onClick: (_) => s(m)
            }, [
              createElementVNode("img", {
                src: u,
                alt: ""
              }, null, 8, _hoisted_4$4)
            ], 10, _hoisted_3$4))), 128))
          ]),
          createElementVNode("div", _hoisted_5$4, [
            createElementVNode("div", {
              class: "emjio-container",
              style: normalizeStyle({ transform: `translateX(${a.value}%)` })
            }, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(l.value, (u, m) => (openBlock(), createElementBlock("div", {
                key: m,
                class: "emoji-wrapper"
              }, [
                createVNode(unref(ElScrollbar), null, {
                  default: withCtx(() => [
                    createElementVNode("div", _hoisted_6$3, [
                      (openBlock(!0), createElementBlock(Fragment, null, renderList(u, (_, v) => (openBlock(), createElementBlock("span", {
                        key: v,
                        class: "emoji-item",
                        onClick: ($) => i.$emit("addEmoji", v)
                      }, [
                        createVNode(unref(ElImage), {
                          src: _,
                          title: String(v),
                          class: "emoji",
                          style: { width: "24px", height: "24px", margin: "5px" },
                          lazy: ""
                        }, null, 8, ["src", "title"])
                      ], 8, _hoisted_7$3))), 128))
                    ])
                  ]),
                  _: 2
                }, 1024)
              ]))), 128))
            ], 4)
          ])
        ]),
        _: 3
      }, 8, ["placement"])
    ]));
  }
}), emoji_vue_vue_type_style_index_0_lang = "", emoji_vue_vue_type_style_index_1_scoped_54bea938_lang = "", emojiVue = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-54bea938"]]), InjectionEmojiApi = Symbol(), UEmoji = withInstall(emojiVue), __default__$2 = {
  name: "UCounter"
}, _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: {
    startAmount: { default: 0 },
    endAmount: { default: 0 },
    duration: { default: 3 },
    autoinit: { type: Boolean, default: !0 },
    prefix: { default: "" },
    suffix: { default: "" },
    separator: { default: "," },
    decimalSeparator: { default: "." },
    decimals: { default: 0 }
  },
  emits: ["finished"],
  setup(e, { emit: n }) {
    const t = e, o = reactive({
      timestamp: 0,
      startTimestamp: 0,
      currentAmount: 0,
      currentStartAmount: 0,
      currentDuration: 0,
      paused: !1,
      remaining: 0,
      animationFrame: 0
    }), a = () => t.endAmount > t.startAmount, l = computed(() => {
      const i = /(\d+)(\d{3})/;
      let d = o.currentAmount.toFixed(t.decimals);
      d += "";
      let u = d.split("."), m = u[0], _ = u.length > 1 ? t.decimalSeparator + u[1] : "", v = !isNaN(parseFloat(t.separator));
      if (t.separator && !v)
        for (; i.test(m); )
          m = m.replace(i, "$1" + t.separator + "$2");
      return m + _;
    }), c = computed(() => `${t.prefix}${l.value}${t.suffix}`);
    onMounted(() => {
      o.currentAmount = t.startAmount, o.currentStartAmount = t.startAmount, o.currentDuration = t.duration * 1e3, o.remaining = t.duration * 1e3, t.autoinit ? r() : o.paused = !0;
    });
    const r = () => {
      s(), o.currentStartAmount = t.startAmount, o.startTimestamp = 0, o.currentDuration = t.duration * 1e3, o.paused = !1, o.animationFrame = window.requestAnimationFrame(p);
    }, s = () => {
      o.animationFrame && window.cancelAnimationFrame(o.animationFrame);
    }, p = (i) => {
      o.timestamp = i, o.startTimestamp || (o.startTimestamp = i);
      let d = i - o.startTimestamp;
      o.remaining = o.currentDuration - d, a ? (o.currentAmount = o.currentStartAmount + (t.endAmount - o.currentStartAmount) * (d / o.currentDuration), o.currentAmount = o.currentAmount > t.endAmount ? t.endAmount : o.currentAmount) : (o.currentAmount = o.currentStartAmount - (o.currentStartAmount - t.endAmount) * (d / o.currentDuration), o.currentAmount = o.currentAmount < t.endAmount ? t.endAmount : o.currentAmount), d < o.currentDuration ? o.animationFrame = window.requestAnimationFrame(p) : n("finished");
    };
    return (i, d) => (openBlock(), createElementBlock("span", null, toDisplayString(unref(c)), 1));
  }
}), UCounter$1 = withInstall(_sfc_main$7), _withScopeId$3 = (e) => (pushScopeId("data-v-2849eb94"), e = e(), popScopeId(), e), _hoisted_1$4 = { class: "operation-list select-none" }, _hoisted_2$3 = ["onClick"], _hoisted_3$3 = ["onClick"], _hoisted_4$3 = { class: "operation-warp" }, _hoisted_5$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z",
    fill: "currentColor"
  })
], -1)), _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "operation",
  props: {
    comment: null
  },
  setup(e) {
    const n = e, t = ref(!1), o = ref(), { user: a, tools: l, operate: c } = inject(InjectOperation), r = (p) => {
      s(), c(p, n.comment, () => {
      });
    }, s = () => {
      var p;
      (p = o.value) == null || p.hide();
    };
    return (p, i) => {
      const d = resolveComponent("u-icon");
      return unref(l) ? (openBlock(), createBlock(unref(ElPopover), {
        key: 0,
        ref_key: "popoverRef",
        ref: o,
        placement: "bottom-end",
        "popper-class": "operatoin-popover",
        trigger: "click"
      }, {
        reference: withCtx(() => [
          createElementVNode("div", _hoisted_4$3, [
            createVNode(d, null, {
              default: withCtx(() => [
                _hoisted_5$3
              ]),
              _: 1
            })
          ])
        ]),
        default: withCtx(() => [
          createElementVNode("ul", _hoisted_1$4, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(l), (u, m) => (openBlock(), createElementBlock(Fragment, { key: m }, [
              u.split("#")[1] ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                e.comment.uid == unref(a).id && u.split("#")[1] == "1" || u.split("#")[1] == "2" && e.comment.uid != unref(a).id ? (openBlock(), createElementBlock("li", {
                  key: 0,
                  class: normalizeClass([{ active: t.value }, "operation-option"]),
                  onClick: (_) => r(u.split("#")[0])
                }, [
                  createElementVNode("span", null, toDisplayString(u.split("#")[0]), 1)
                ], 10, _hoisted_2$3)) : createCommentVNode("", !0)
              ], 64)) : (openBlock(), createElementBlock("li", {
                key: 1,
                class: normalizeClass([{ active: t.value }, "operation-option"]),
                onClick: (_) => r(u.split("#")[0])
              }, [
                createElementVNode("span", null, toDisplayString(u), 1)
              ], 10, _hoisted_3$3))
            ], 64))), 128))
          ])
        ]),
        _: 1
      }, 512)) : createCommentVNode("", !0);
    };
  }
}), operation_vue_vue_type_style_index_0_lang = "", operation_vue_vue_type_style_index_1_scoped_2849eb94_lang = "", Operation = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-2849eb94"]]), _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "user-card",
  props: {
    uid: null
  },
  setup(e) {
    const n = ref({}), { showInfo: t } = inject(InjectContentBox), o = inject(InjectSlots), a = () => h("div", o.card(n.value));
    return (l, c) => unref(o).card ? (openBlock(), createBlock(unref(ElPopover), {
      key: 0,
      placement: "top",
      width: 300,
      "show-after": 300,
      onBeforeEnter: c[0] || (c[0] = () => unref(t)(e.uid, (r) => n.value = r))
    }, {
      reference: withCtx(() => [
        renderSlot(l.$slots, "default")
      ]),
      default: withCtx(() => [
        createVNode(a)
      ]),
      _: 3
    })) : renderSlot(l.$slots, "default", { key: 1 });
  }
}), _withScopeId$2 = (e) => (pushScopeId("data-v-aed07c5b"), e = e(), popScopeId(), e), _hoisted_1$3 = { class: "comment-sub" }, _hoisted_2$2 = ["href"], _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_4$2 = { class: "comment-primary" }, _hoisted_5$2 = { class: "comment-main" }, _hoisted_6$2 = {
  key: 1,
  class: "user-info"
}, _hoisted_7$2 = ["href"], _hoisted_8$2 = { class: "username" }, _hoisted_9$1 = {
  class: "name",
  style: { "max-width": "10em" }
}, _hoisted_10$1 = {
  blank: "true",
  class: "rank"
}, _hoisted_11 = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, _hoisted_12 = { class: "time" }, _hoisted_13 = { class: "content" }, _hoisted_14 = ["innerHTML"], _hoisted_15 = {
  class: "imgbox",
  style: { display: "flex" }
}, _hoisted_16 = { class: "action-box select-none" }, _hoisted_17 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  t: "1650360973068",
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1168",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M547.968 138.88c6.656-4.672 14.08-6.976 20.48-5.056 6.08 1.792 22.848 10.752 40.192 56.128 8.576 22.4 27.264 81.536-5.632 197.504a45.44 45.44 0 0 0 42.88 57.984l217.6 3.008h0.448a53.12 53.12 0 0 1 20.096 3.328 16.256 16.256 0 0 1 5.568 3.648 14.464 14.464 0 0 1 3.264 6.4c2.176 7.808 4.608 33.984-0.256 77.248-4.672 41.984-15.936 97.408-38.784 162.368-19.136 54.336-43.52 100.48-81.472 161.792a56.384 56.384 0 0 0-1.664 2.496l-0.128 0.128-1.408 2.112a7.872 7.872 0 0 1-1.28 1.472 3.84 3.84 0 0 1-1.28 0.64 20.48 20.48 0 0 1-6.848 0.96H356.032V421.44c19.712-10.624 40.704-24.576 62.592-47.616 25.472-26.88 51.008-64.768 78.208-121.6 5.568-11.584 9.856-24.384 13.632-36.032l3.072-9.856c2.688-8.448 5.184-16.384 8.064-24.32 8.064-22.4 16.128-36.032 26.368-43.136z m120.96 27.968c-20.48-53.44-48-84.736-81.984-94.912-33.6-9.984-61.952 4.16-76.032 14.08-27.584 19.264-41.28 49.6-50.048 74.048-3.392 9.344-6.464 19.2-9.216 27.968l-2.688 8.448a227.84 227.84 0 0 1-10.432 27.904c-25.28 52.928-47.36 84.544-66.752 104.96-18.944 19.968-36.48 30.464-55.168 39.808a45.376 45.376 0 0 0-25.088 40.576l-0.064 480.64c0 24.96 20.224 45.248 45.184 45.248h423.04c21.76 0 38.144-6.912 50.048-16.96a71.808 71.808 0 0 0 14.528-16.896l0.128-0.256 0.128-0.128 0.832-0.96 1.152-1.92c39.424-63.872 66.816-114.688 88.256-175.68a810.24 810.24 0 0 0 42.048-176.64c5.12-45.632 3.776-81.664-1.6-101.376a77.952 77.952 0 0 0-45.568-52.288 116.544 116.544 0 0 0-45.44-8.64l-192.768-2.688c28.096-115.072 10.048-181.568-2.496-214.336z m-604.864 247.04a45.184 45.184 0 0 1 45.12-47.296h67.008c24.96 0 45.184 20.288 45.184 45.248v480.64c0 24.96-20.224 45.12-45.184 45.12H131.84a45.184 45.184 0 0 1-45.12-43.072l-22.656-480.64z",
    "p-id": "1169"
  })
], -1)), _hoisted_18 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), _hoisted_19 = { key: 2 }, _hoisted_20 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1320",
  width: "200",
  height: "200"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M147.264 647.296V220.928c0-49.536 40.128-89.728 89.6-89.728H793.6c49.536 0 89.728 40.192 89.728 89.728v426.368c0 49.536-40.128 89.728-89.6 89.728h-145.216a47.04 47.04 0 0 0-28.16 9.408l-194.56 145.792a3.392 3.392 0 0 1-5.12-1.984l-26.752-116.672a47.04 47.04 0 0 0-45.824-36.544H236.992a89.728 89.728 0 0 1-89.728-89.728zM236.864 64A156.928 156.928 0 0 0 80 220.928l0.064 426.368a156.928 156.928 0 0 0 156.928 156.928h94.976l23.232 101.312 0.064 0.448a70.592 70.592 0 0 0 109.696 40.832l190.208-142.592H793.6a156.928 156.928 0 0 0 156.928-156.928l-0.064-426.368A156.928 156.928 0 0 0 793.536 64H236.928z m69.44 442.496a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z m268.8-65.344a65.344 65.344 0 1 1-130.752 0 65.344 65.344 0 0 1 130.752 0z m138.368 65.344a65.344 65.344 0 1 0 0-130.752 65.344 65.344 0 0 0 0 130.752z",
    "p-id": "1321"
  })
], -1)), _hoisted_21 = { key: 2 }, _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "content-box",
  props: {
    reply: { type: Boolean },
    data: null,
    id: null
  },
  setup(e) {
    const n = e, t = reactive({
      active: !1
    }), o = ref(), a = ref(), l = computed(() => {
      let _ = n.data.contentImg;
      return isEmpty(_) ? [] : _ == null ? void 0 : _.split("||");
    }), { allEmoji: c } = inject(InjectionEmojiApi), { like: r, user: s } = inject(InjectContentBox);
    function p() {
      t.active = !t.active, t.active && nextTick(() => {
        var _;
        (_ = o.value) == null || _.focus();
      });
    }
    function i(_) {
      var $;
      const v = _.target;
      ($ = a.value) != null && $.contains(v) || (t.active = !1);
    }
    const d = inject(InjectSlots), u = () => h("div", d.info(n.data)), m = computed(() => useEmojiParse(c, n.data.content));
    return (_, v) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["comment", { reply: n.reply }])
    }, [
      createElementVNode("div", _hoisted_1$3, [
        createVNode(_sfc_main$5, {
          uid: unref(str)(e.data.uid)
        }, {
          default: withCtx(() => [
            createElementVNode("a", {
              href: e.data.user.homeLink,
              target: "_blank",
              class: "no-underline",
              style: { display: "block" }
            }, [
              createVNode(unref(ElAvatar), {
                style: { "margin-top": "5px" },
                size: 40,
                fit: "cover",
                src: e.data.user.avatar
              }, {
                default: withCtx(() => [
                  _hoisted_3$2
                ]),
                _: 1
              }, 8, ["src"])
            ], 8, _hoisted_2$2)
          ]),
          _: 1
        }, 8, ["uid"])
      ]),
      createElementVNode("div", _hoisted_4$2, [
        createElementVNode("div", _hoisted_5$2, [
          unref(d).info ? (openBlock(), createBlock(u, { key: 0 })) : (openBlock(), createElementBlock("div", _hoisted_6$2, [
            createVNode(_sfc_main$5, {
              uid: unref(str)(e.data.uid)
            }, {
              default: withCtx(() => [
                createElementVNode("a", {
                  href: e.data.user.homeLink,
                  target: "_blank",
                  class: "no-underline",
                  style: { display: "block" }
                }, [
                  createElementVNode("div", _hoisted_8$2, [
                    createElementVNode("span", _hoisted_9$1, toDisplayString(e.data.user.username), 1),
                    createElementVNode("span", _hoisted_10$1, [
                      createVNode(unref(UIcon), {
                        size: "24",
                        innerHTML: unref(useLevel)(e.data.user.level)
                      }, null, 8, ["innerHTML"])
                    ])
                  ])
                ], 8, _hoisted_7$2)
              ]),
              _: 1
            }, 8, ["uid"]),
            createElementVNode("span", _hoisted_11, "\xA0\xA0" + toDisplayString(e.data.address), 1),
            createElementVNode("time", _hoisted_12, toDisplayString(e.data.createTime), 1)
          ])),
          createElementVNode("div", _hoisted_13, [
            createVNode(unref(UFold), { unfold: "" }, {
              default: withCtx(() => [
                createElementVNode("div", { innerHTML: unref(m) }, null, 8, _hoisted_14),
                createElementVNode("div", _hoisted_15, [
                  (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(l), ($, g) => (openBlock(), createBlock(unref(ElImage), {
                    key: g,
                    src: $,
                    style: { height: "72px", padding: "8px 4px" },
                    lazy: "",
                    "preview-src-list": unref(l),
                    "initial-index": g
                  }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
                ])
              ]),
              _: 1
            })
          ]),
          createElementVNode("div", _hoisted_16, [
            createElementVNode("div", {
              class: "item",
              onClick: v[0] || (v[0] = ($) => unref(r)(unref(str)(e.data.id)))
            }, [
              unref(s).likeIds.map(String).indexOf(unref(str)(e.data.id)) == -1 ? (openBlock(), createBlock(unref(UIcon), { key: 0 }, {
                default: withCtx(() => [
                  _hoisted_17
                ]),
                _: 1
              })) : (openBlock(), createBlock(unref(UIcon), {
                key: 1,
                color: "#1e80ff"
              }, {
                default: withCtx(() => [
                  _hoisted_18
                ]),
                _: 1
              })),
              e.data.likes != 0 ? (openBlock(), createElementBlock("span", _hoisted_19, toDisplayString(e.data.likes), 1)) : createCommentVNode("", !0)
            ]),
            createElementVNode("div", {
              ref_key: "btnRef",
              ref: a,
              class: normalizeClass(["item", { active: t.active }]),
              onClick: p
            }, [
              createVNode(unref(UIcon), null, {
                default: withCtx(() => [
                  _hoisted_20
                ]),
                _: 1
              }),
              createElementVNode("span", null, toDisplayString(t.active ? "\u53D6\u6D88\u56DE\u590D" : "\u56DE\u590D"), 1)
            ], 2),
            createVNode(Operation, { comment: e.data }, null, 8, ["comment"])
          ]),
          t.active ? (openBlock(), createElementBlock("div", _hoisted_21, [
            createVNode(InputBox, {
              ref_key: "commentRef",
              ref: o,
              "parent-id": unref(str)(e.id),
              placeholder: `\u56DE\u590D @${e.data.user.username}...`,
              replay: e.data.parentId ? e.data.user.username : void 0,
              "content-btn": "\u53D1\u5E03",
              style: { "margin-top": "12px" },
              onHide: i,
              onClose: v[1] || (v[1] = ($) => t.active = !1)
            }, null, 8, ["parent-id", "placeholder", "replay"])
          ])) : createCommentVNode("", !0)
        ]),
        renderSlot(_.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
}), contentBox_vue_vue_type_style_index_0_scoped_aed07c5b_lang = "", ContentBox = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-aed07c5b"]]), _withScopeId$1 = (e) => (pushScopeId("data-v-190e77c9"), e = e(), popScopeId(), e), _hoisted_1$2 = {
  key: 0,
  class: "reply-box"
}, _hoisted_2$1 = { class: "reply-list" }, _hoisted_3$1 = {
  key: 0,
  class: "fetch-more"
}, _hoisted_4$1 = { key: 0 }, _hoisted_5$1 = { key: 1 }, _hoisted_6$1 = { key: 0 }, _hoisted_7$1 = /* @__PURE__ */ createTextVNode(" \u70B9\u51FB\u67E5\u770B "), _hoisted_8$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createElementVNode("svg", {
  width: "12",
  height: "12",
  viewBox: "0 0 12 12",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: ""
}, [
  /* @__PURE__ */ createElementVNode("path", {
    "data-v-d6f79dbc": "",
    "fill-rule": "evenodd",
    "clip-rule": "evenodd",
    d: "M5.99976 7.93206L10.0656 3.86619C10.1633 3.76856 10.3215 3.76856 10.4192 3.86619L10.7727 4.21975C10.8704 4.31738 10.8704 4.47567 10.7727 4.5733L6.35331 8.99272C6.15805 9.18798 5.84147 9.18798 5.6462 8.99272L1.22679 4.5733C1.12916 4.47567 1.12916 4.31738 1.22679 4.21975L1.58034 3.86619C1.67797 3.76856 1.83626 3.76856 1.93389 3.86619L5.99976 7.93206Z"
  })
], -1)), _hoisted_9 = [
  _hoisted_7$1,
  _hoisted_8$1
], _hoisted_10 = {
  key: 1,
  class: "fetch-more"
}, _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "reply-box",
  props: {
    data: null,
    id: null
  },
  setup(e) {
    const n = e, t = reactive({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: o, replyShowSize: a, comments: l } = inject(InjectReplyBox), { page: c } = inject(InjectReplyBox), r = computed(() => {
      let u = {
        total: 0,
        length: 0,
        list: []
      };
      if (n.data) {
        let m = n.data.list.length;
        u = {
          total: n.data.total,
          length: m,
          list: n.data.list
        };
      }
      if (!t.over) {
        let m = u.list.slice(0, a);
        u.list = m;
      }
      return u;
    }), s = () => {
      t.over = !0;
    }, p = (u) => {
      l.value.forEach((m) => {
        m.id == n.id && m.reply && (m.reply = u);
      });
    }, i = (u) => {
      t.pageNum = u, o(n.id, u, t.pageSize, (m) => p(m));
    }, d = (u) => {
      t.pageSize = u, o(n.id, t.pageNum, u, (m) => p(m));
    };
    return (u, m) => unref(r).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
      createElementVNode("div", _hoisted_2$1, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r).list, (_, v) => (openBlock(), createBlock(ContentBox, {
          id: e.id,
          key: v,
          data: _,
          reply: ""
        }, null, 8, ["id", "data"]))), 128)),
        unref(r).length > unref(a) ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          t.loading ? (openBlock(), createElementBlock("span", _hoisted_4$1, "\u52A0\u8F7D\u4E2D...")) : (openBlock(), createElementBlock("div", _hoisted_5$1, [
            t.over ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createTextVNode(" \u5171" + toDisplayString(unref(r).total) + "\u6761\u56DE\u590D, ", 1),
              createElementVNode("span", {
                class: "fetch-more-comment select-none",
                onClick: s
              }, _hoisted_9)
            ]))
          ]))
        ])) : createCommentVNode("", !0),
        t.over && unref(c) ? (openBlock(), createElementBlock("div", _hoisted_10, [
          createVNode(unref(ElPagination), {
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: unref(r).total,
            "page-size": t.pageSize,
            onCurrentChange: i,
            onSizeChange: d
          }, null, 8, ["total", "page-size"])
        ])) : createCommentVNode("", !0)
      ])
    ])) : createCommentVNode("", !0);
  }
}), replyBox_vue_vue_type_style_index_0_scoped_190e77c9_lang = "", ReplyBox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-190e77c9"]]), _hoisted_1$1 = {
  key: 0,
  class: "comment-list"
}, _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "comment-list",
  props: {
    data: null,
    total: null,
    showSize: null
  },
  setup(e) {
    return (n, t) => e.data ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (o, a) => (openBlock(), createBlock(ContentBox, {
        id: unref(str)(o.id),
        key: a,
        data: o
      }, {
        default: withCtx(() => [
          createVNode(ReplyBox, {
            id: unref(str)(o.id),
            data: o.reply
          }, null, 8, ["id", "data"])
        ]),
        _: 2
      }, 1032, ["id", "data"]))), 128))
    ])) : createCommentVNode("", !0);
  }
}), commentList_vue_vue_type_style_index_0_lang = "", _withScopeId = (e) => (pushScopeId("data-v-5ae6a746"), e = e(), popScopeId(), e), _hoisted_1 = { class: "u-comment" }, _hoisted_2 = { class: "comment-form" }, _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "header" }, [
  /* @__PURE__ */ createElementVNode("span", { class: "header-title" }, "\u8BC4\u8BBA")
], -1)), _hoisted_4 = { class: "content" }, _hoisted_5 = { class: "avatar-box" }, _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_7 = { class: "comment-list-wrapper" }, _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "title" }, "\u5168\u90E8\u8BC4\u8BBA", -1)), __default__$1 = {
  name: "UComment"
}, _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: {
    config: null,
    page: { type: Boolean, default: !1 },
    upload: { type: Boolean, default: !1 }
  },
  emits: ["submit", "like", "replyPage", "showInfo", "operate"],
  setup(e, { emit: n }) {
    const t = e, { user: o, comments: a, showSize: l, replyShowSize: c, total: r, tools: s } = toRefs(t.config), p = ({ content: $, parentId: g, files: k, clear: x }) => {
      n("submit", { content: $, parentId: g, files: k, finish: (y) => {
        if (x(), g) {
          let w = a.value.find((E) => E.id == g);
          if (w) {
            let E = w.reply;
            E ? (E.list.unshift(y), E.total++) : w.reply = {
              total: 1,
              list: [y]
            };
          }
        } else
          a.value.unshift(y);
      } });
    }, i = {
      upload: t.upload,
      submit: p
    };
    provide(InjectInputBox, i), provide(InjectContentBox, {
      user: o,
      like: ($) => {
        const g = (C, y) => {
          let w = null;
          a.value.forEach((E) => {
            var B;
            E.id != C ? w = (B = E.reply) == null ? void 0 : B.list.find((b) => b.id == C) : w = E, w && (w.likes += y);
          });
        }, k = t.config.user.likeIds;
        let x = k.map(String);
        n("like", $, () => {
          if (x.indexOf($) == -1)
            k.push($), g($, 1);
          else {
            let C = x.findIndex((y) => y == $);
            C != -1 && k.splice(C, 1), g($, -1);
          }
        });
      },
      showInfo: ($, g) => n("showInfo", $, g)
    });
    const m = {
      page: t.page,
      replyPage: ($, g, k, x) => {
        n("replyPage", { parentId: $, pageNum: g, pageSize: k, finish: x });
      },
      replyShowSize: isNull(c, 3),
      comments: a
    };
    provide(InjectReplyBox, m);
    const _ = ($) => {
      const { parentId: g, id: k } = $;
      if (g) {
        let x = a.value.find((y) => y.id == g), C = x == null ? void 0 : x.reply;
        if (C) {
          let y = C.list.findIndex((w) => w.id == k);
          y != -1 && (C.list.splice(y, 1), C.total--);
        }
      } else {
        let x = a.value.findIndex((C) => C.id == k);
        x != -1 && a.value.splice(x, 1);
      }
    }, v = {
      user: o,
      tools: s == null ? void 0 : s.value,
      operate: ($, g, k) => {
        if (isEmpty($))
          return;
        let x = $.split("#")[0];
        x == "\u5220\u9664" || x == "delete" || x == "remove" ? n("operate", $, g, () => {
          k(), _(g);
        }) : n("operate", $, g, k);
      }
    };
    return provide(InjectOperation, v), provide(InjectionEmojiApi, t.config.emoji), provide(InjectSlots, useSlots()), ($, g) => (openBlock(), createElementBlock("div", _hoisted_1, [
      createElementVNode("div", _hoisted_2, [
        _hoisted_3,
        createElementVNode("div", _hoisted_4, [
          createElementVNode("div", _hoisted_5, [
            createVNode(unref(ElAvatar), {
              size: 40,
              src: e.config.user.avatar
            }, {
              default: withCtx(() => [
                _hoisted_6
              ]),
              _: 1
            }, 8, ["src"])
          ]),
          createVNode(InputBox, {
            placeholder: "\u8F93\u5165\u8BC4\u8BBA\uFF08Enter\u6362\u884C\uFF0CCtrl + Enter\u53D1\u9001\uFF09",
            "content-btn": "\u53D1\u8868\u8BC4\u8BBA"
          })
        ])
      ]),
      createElementVNode("div", _hoisted_7, [
        renderSlot($.$slots, "default", {}, () => [
          _hoisted_8
        ], !0),
        createVNode(_sfc_main$2, {
          data: unref(a),
          total: unref(r),
          "show-size": unref(isNull)(unref(l), 5)
        }, null, 8, ["data", "total", "show-size"])
      ])
    ]));
  }
}), comment_vue_vue_type_style_index_0_scoped_5ae6a746_lang = "", commentVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5ae6a746"]]), UComment = withInstall(commentVue), __default__ = {
  name: "UCounter"
}, _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {
    startAmount: { default: 0 },
    endAmount: { default: 0 },
    duration: { default: 3 },
    autoinit: { type: Boolean, default: !0 },
    prefix: { default: "" },
    suffix: { default: "" },
    separator: { default: "," },
    decimalSeparator: { default: "." },
    decimals: { default: 0 }
  },
  emits: ["finished"],
  setup(e, { emit: n }) {
    const t = e, o = reactive({
      timestamp: 0,
      startTimestamp: 0,
      currentAmount: 0,
      currentStartAmount: 0,
      currentDuration: 0,
      paused: !1,
      remaining: 0,
      animationFrame: 0
    }), a = () => t.endAmount > t.startAmount, l = computed(() => {
      const i = /(\d+)(\d{3})/;
      let d = o.currentAmount.toFixed(t.decimals);
      d += "";
      let u = d.split("."), m = u[0], _ = u.length > 1 ? t.decimalSeparator + u[1] : "", v = !isNaN(parseFloat(t.separator));
      if (t.separator && !v)
        for (; i.test(m); )
          m = m.replace(i, "$1" + t.separator + "$2");
      return m + _;
    }), c = computed(() => `${t.prefix}${l.value}${t.suffix}`);
    onMounted(() => {
      o.currentAmount = t.startAmount, o.currentStartAmount = t.startAmount, o.currentDuration = t.duration * 1e3, o.remaining = t.duration * 1e3, t.autoinit ? r() : o.paused = !0;
    });
    const r = () => {
      s(), o.currentStartAmount = t.startAmount, o.startTimestamp = 0, o.currentDuration = t.duration * 1e3, o.paused = !1, o.animationFrame = window.requestAnimationFrame(p);
    }, s = () => {
      o.animationFrame && window.cancelAnimationFrame(o.animationFrame);
    }, p = (i) => {
      o.timestamp = i, o.startTimestamp || (o.startTimestamp = i);
      let d = i - o.startTimestamp;
      o.remaining = o.currentDuration - d, a ? (o.currentAmount = o.currentStartAmount + (t.endAmount - o.currentStartAmount) * (d / o.currentDuration), o.currentAmount = o.currentAmount > t.endAmount ? t.endAmount : o.currentAmount) : (o.currentAmount = o.currentStartAmount - (o.currentStartAmount - t.endAmount) * (d / o.currentDuration), o.currentAmount = o.currentAmount < t.endAmount ? t.endAmount : o.currentAmount), d < o.currentDuration ? o.animationFrame = window.requestAnimationFrame(p) : n("finished");
    };
    return (i, d) => (openBlock(), createElementBlock("span", null, toDisplayString(unref(c)), 1));
  }
}), UCounter = withInstall(_sfc_main), components = [
  UComment,
  UCommentScroll,
  UCommentNav,
  UDialog,
  UDivider,
  UEditor,
  UFold,
  UIcon,
  USign,
  UTags,
  UNoticeBar,
  UAnchor,
  USearch,
  UChat,
  UEmoji,
  UCounter
], index$1 = "", index = {
  install: (e) => {
    components.forEach((n) => {
      e.use(n);
    });
  }
};
export {
  z as ElAvatar,
  L as ElButton,
  T as ElCarousel,
  M as ElDialog,
  D as ElImage,
  U as ElInput,
  O as ElLink,
  H as ElPagination,
  R as ElPopover,
  P as ElScrollbar,
  q as ElTag,
  InjectionEmojiApi,
  UAnchor,
  UChat,
  UComment,
  UCommentNav,
  UCommentScroll,
  UCounter$1 as UCounter,
  UDialog,
  UDivider,
  UEditor,
  UEmoji,
  UFold,
  UIcon,
  UNoticeBar,
  USearch,
  USign,
  UTags,
  UToast,
  cloneDeep,
  createGlobalNode,
  createObjectURL,
  debounce,
  deepTree,
  index as default,
  flattenDeep,
  isArray,
  isBoolean,
  isEmpty,
  isFunction$2 as isFunction,
  isImage,
  isNull,
  isNumber,
  isObject$2 as isObject,
  isString,
  removeEmptyField,
  removeGlobalNode,
  revDeepTree,
  storage,
  str,
  throttle,
  toFormData,
  useBrowser,
  useEmojiParse,
  useLevel,
  usePage,
  G as vInfiniteScroll,
  withInstall
};
