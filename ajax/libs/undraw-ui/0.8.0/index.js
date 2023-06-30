import { h, render, defineComponent, ref, reactive, inject, resolveComponent, withDirectives, openBlock, createElementBlock, createVNode, normalizeClass, Transition, withCtx, unref, createElementVNode, createTextVNode, toDisplayString, createCommentVNode, nextTick, pushScopeId, popScopeId, watch, createBlock, createSlots, renderSlot, useCssVars, toRefs, computed, onMounted, withKeys, Fragment, renderList, onUnmounted, normalizeStyle, vShow, toRef, withModifiers, vModelText, provide, useSlots } from "vue";
import { ElButton, ClickOutside, ElDialog, ElForm, ElFormItem, ElInput, ElScrollbar, ElCarousel, ElTag, ElAvatar, ElPopover, ElImage, ElPagination } from "element-plus";
import { ElAvatar as A, ElButton as M, ElCarousel as L, ElDialog as T, ElImage as D, ElInput as U, ElPagination as H, ElPopover as O, ElScrollbar as R, ElTag as P } from "element-plus";
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
  return e.forEach((r) => a[r.id] = r), e.forEach((r) => {
    const m = a[r[n]];
    m ? (m[t] || (m[t] = [])).push(r) : o.push(r);
  }), o;
}
function revDeepTree(e = [], { parentId: n = "parentId", children: t = "children" }) {
  const o = [], a = (r, m) => {
    r.forEach((s) => {
      s.id || (s.id = m++), s[n] = m, o.push(s), s[t] && isArray(s[t]) && a(s[t], s.id);
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
  let r = "";
  switch (t) {
    case "chrome":
    case "safari":
    case "mobile":
      r = "webkit";
      break;
    case "msie":
      r = "ms";
      break;
    case "firefox":
      r = "Moz";
      break;
    case "opera":
      r = "O";
      break;
    default:
      r = "webkit";
      break;
  }
  const m = n.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();
  let s = "full";
  e < 768 ? s = "xs" : e < 992 ? s = "sm" : e < 1200 ? s = "md" : e < 1920 ? s = "xl" : s = "full";
  const i = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), v = (n.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], l = o === "pc", c = !l, u = s === "xs" || c, d = window.innerHeight + "px";
  return {
    version: v,
    type: t,
    plat: m,
    tag: o,
    prefix: r,
    isMobile: c,
    isIOS: i,
    isPC: l,
    isMini: u,
    screen: s,
    innerHeight: d
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
    for (var r = 1; r < arguments.length; r++)
      each$7(Object(arguments[r]), function(m, s) {
        n[s] = m;
      });
    return n;
  };
}
function make_create() {
  if (Object.create)
    return function(n, t, o, a) {
      var r = slice$1(arguments, 1);
      return assign.apply(this, [Object.create(n)].concat(r));
    };
  {
    let e = function() {
    };
    return function(t, o, a, r) {
      var m = slice$1(arguments, 1);
      return e.prototype = t, assign.apply(this, [new e()].concat(m));
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
  var o = t ? "__storejs_" + t + "_" : "", a = t ? new RegExp("^" + o) : null, r = /^[a-zA-Z0-9_\-]*$/;
  if (!r.test(t))
    throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");
  var m = {
    _namespacePrefix: o,
    _namespaceRegexp: a,
    _testStorage: function(i) {
      try {
        var v = "__storejs__test__";
        i.write(v, v);
        var l = i.read(v) === v;
        return i.remove(v), l;
      } catch {
        return !1;
      }
    },
    _assignPluginFnProp: function(i, v) {
      var l = this[v];
      this[v] = function() {
        var u = slice(arguments, 0), d = this;
        function _() {
          if (!!l)
            return each$6(arguments, function(y, g) {
              u[g] = y;
            }), l.apply(d, u);
        }
        var p = [_].concat(u);
        return i.apply(d, p);
      };
    },
    _serialize: function(i) {
      return JSON.stringify(i);
    },
    _deserialize: function(i, v) {
      if (!i)
        return v;
      var l = "";
      try {
        l = JSON.parse(i);
      } catch {
        l = i;
      }
      return l !== void 0 ? l : v;
    },
    _addStorage: function(i) {
      this.enabled || this._testStorage(i) && (this.storage = i, this.enabled = !0);
    },
    _addPlugin: function(i) {
      var v = this;
      if (isList(i)) {
        each$6(i, function(u) {
          v._addPlugin(u);
        });
        return;
      }
      var l = pluck(this.plugins, function(u) {
        return i === u;
      });
      if (!l) {
        if (this.plugins.push(i), !isFunction(i))
          throw new Error("Plugins must be function values that return objects");
        var c = i.call(this);
        if (!isObject(c))
          throw new Error("Plugins must return an object of function properties");
        each$6(c, function(u, d) {
          if (!isFunction(u))
            throw new Error("Bad plugin property: " + d + " from plugin " + i.name + ". Plugins should only return functions.");
          v._assignPluginFnProp(u, d);
        });
      }
    },
    addStorage: function(i) {
      _warn("store.addStorage(storage) is deprecated. Use createStore([storages])"), this._addStorage(i);
    }
  }, s = create(m, storeAPI, {
    plugins: []
  });
  return s.raw = {}, each$6(s, function(i, v) {
    isFunction(i) && (s.raw[v] = bind(s, i));
  }), each$6(e, function(i) {
    s._addStorage(i);
  }), each$6(n, function(i) {
    s._addPlugin(i);
  }), s;
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
    var r = [].slice.call(arguments, 0);
    r.unshift(o), n.appendChild(o), o.addBehavior("#default#userData"), o.load(storageName), a.apply(this, r), n.removeChild(o);
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
      var o = n[t].split("="), a = unescape(o[0]), r = unescape(o[1]);
      e(r, a);
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
      var t, o, a, r, m = gap, s, i = n[e];
      switch (i && typeof i == "object" && typeof i.toJSON == "function" && (i = i.toJSON(e)), typeof rep == "function" && (i = rep.call(n, e, i)), typeof i) {
        case "string":
          return quote(i);
        case "number":
          return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
          return String(i);
        case "object":
          if (!i)
            return "null";
          if (gap += indent, s = [], Object.prototype.toString.apply(i) === "[object Array]") {
            for (r = i.length, t = 0; t < r; t += 1)
              s[t] = str(t, i) || "null";
            return a = s.length === 0 ? "[]" : gap ? `[
` + gap + s.join(`,
` + gap) + `
` + m + "]" : "[" + s.join(",") + "]", gap = m, a;
          }
          if (rep && typeof rep == "object")
            for (r = rep.length, t = 0; t < r; t += 1)
              typeof rep[t] == "string" && (o = rep[t], a = str(o, i), a && s.push(quote(o) + (gap ? ": " : ":") + a));
          else
            for (o in i)
              Object.prototype.hasOwnProperty.call(i, o) && (a = str(o, i), a && s.push(quote(o) + (gap ? ": " : ":") + a));
          return a = s.length === 0 ? "{}" : gap ? `{
` + gap + s.join(`,
` + gap) + `
` + m + "}" : "{" + s.join(",") + "}", gap = m, a;
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
const storage = store_legacy, debounce = (e, n = 200) => {
  let t = null;
  return (...o) => {
    t && clearTimeout(t), t = setTimeout(() => {
      e.apply(void 0, o);
    }, n);
  };
}, throttle = (e, n = 500) => {
  let t = null;
  return (...o) => {
    t || (t = setTimeout(() => {
      e.apply(void 0, o), t = null;
    }, n));
  };
}, str = (e) => e == null ? "" : String(e);
function isImage(e) {
  let n = ["png", "jpg", "jpeg", "gif", "webp", "svg"], t = e.lastIndexOf("."), o = e.substring(t + 1);
  return n.indexOf(o.toLowerCase()) != -1;
}
const base = "", elAvatar = "", elButton = "", elImage = "", elImageViewer = "", elPopover = "", elPopper = "", elDialog = "", elOverlay = "", elTag = "", elCarousel = "", elScrollbar = "", elInput = "", elPagination = "", elOption = "", elOptionGroup = "", elSelect = "", _withScopeId$e = (e) => (pushScopeId("data-v-8d75907e"), e = e(), popScopeId(), e), _hoisted_1$l = { class: "comment-box" }, _hoisted_2$i = {
  key: 0,
  class: "action-box"
}, _hoisted_3$g = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("svg", {
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
], -1)), _hoisted_4$e = /* @__PURE__ */ _withScopeId$e(() => /* @__PURE__ */ createElementVNode("span", null, "\u56FE\u7247", -1)), _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "comment-box",
  props: {
    placeholder: null,
    contentBtn: null,
    parentId: null,
    replay: null
  },
  emits: ["hide", "close"],
  setup(e, { expose: n, emit: t }) {
    const o = e, a = ref(""), r = ref(!1), m = ref(!0), s = ref(), i = ref(), v = ref(), l = ref([]), c = ref([]), u = reactive({
      imgLength: 0
    }), d = (w) => {
      isEmpty(a.value.replace(/&nbsp;|<br>| /g, "")) ? m.value = !0 : m.value = !1;
    }, _ = inject(InjectionCommentFun), p = inject(InjectionEmojiApi), y = () => {
      _({
        content: o.replay ? `\u56DE\u590D <span style="color: var(--u-color-success-dark-2);">@${o.replay}:</span> ${a.value}` : a.value,
        parentId: isNull(o.parentId, null),
        files: c.value,
        finish: () => {
          s.value.clear(), l.value.length = 0, t("close");
        }
      });
    };
    function g(w) {
      isEmpty(a.value) && !u.imgLength && (r.value = !1, t("hide", w));
    }
    function b() {
      r.value = !0, nextTick(() => {
        i.value = document.querySelector("div[id^='el-popper-container']");
      });
    }
    n({
      focus: () => {
        var w;
        return (w = s.value) == null ? void 0 : w.focus();
      }
    });
    function x(w) {
      return window.URL ? window.URL.createObjectURL(w) : window.webkitURL ? window.webkitURL.createObjectURL(w) : "";
    }
    const E = (w) => {
      var C;
      l.value.length = 0, c.value.length = 0, console.log(w);
      const $ = (C = v.value) == null ? void 0 : C.files;
      if (u.imgLength = isNull($ == null ? void 0 : $.length, 0), $)
        for (let k = 0; k < $.length; k++) {
          let B = $[k].name, V = x($[k]);
          c.value.push($[k]), isImage(B) ? l.value.push(V) : UToast({ type: "warning", message: "\u8BF7\u9009\u62E9\u56FE\u7247\u7C7B\u578B\u6587\u4EF6!", duration: 2500 });
        }
    };
    return (w, $) => {
      const C = resolveComponent("u-editor"), k = resolveComponent("u-emoji");
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$l, [
        createVNode(C, {
          ref_key: "editorRef",
          ref: s,
          modelValue: a.value,
          "onUpdate:modelValue": $[0] || ($[0] = (B) => a.value = B),
          class: normalizeClass({ "input-active": r.value }),
          placeholder: o.placeholder,
          "min-height": 64,
          "img-list": l.value,
          onFocus: b,
          onInput: d,
          onSubmit: y
        }, null, 8, ["modelValue", "class", "placeholder", "img-list"]),
        createVNode(Transition, { name: "fade" }, {
          default: withCtx(() => [
            r.value ? (openBlock(), createElementBlock("div", _hoisted_2$i, [
              createVNode(k, {
                emoji: unref(p),
                onAddEmoji: $[1] || ($[1] = (B) => {
                  var V;
                  return (V = s.value) == null ? void 0 : V.addText(B);
                })
              }, null, 8, ["emoji"]),
              createElementVNode("div", {
                class: "picture",
                onClick: $[2] || ($[2] = (...B) => {
                  var V, S;
                  return ((V = v.value) == null ? void 0 : V.click) && ((S = v.value) == null ? void 0 : S.click(...B));
                })
              }, [
                _hoisted_3$g,
                _hoisted_4$e,
                createElementVNode("input", {
                  id: "comment-upload",
                  ref_key: "inputRef",
                  ref: v,
                  type: "file",
                  multiple: "",
                  onChange: E
                }, null, 544)
              ]),
              createVNode(unref(ElButton), {
                type: "primary",
                disabled: m.value,
                onClick: y
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
        [unref(ClickOutside), g, i.value]
      ]);
    };
  }
}), commentBox_vue_vue_type_style_index_0_scoped_8d75907e_lang = "", _export_sfc = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [o, a] of n)
    t[o] = a;
  return t;
}, CommentBox = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-8d75907e"]]), _withScopeId$d = (e) => (pushScopeId("data-v-6a8f6c09"), e = e(), popScopeId(), e), _hoisted_1$k = {
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
}, null, -1)), _hoisted_6$a = [
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
      (r) => {
        o.value = r;
      },
      {
        immediate: !0
      }
    ), watch(
      () => o.value,
      (r) => {
        n("update:modelValue", r);
      }
    ), (r, m) => (openBlock(), createBlock(unref(ElDialog), {
      modelValue: o.value,
      "onUpdate:modelValue": m[1] || (m[1] = (s) => o.value = s),
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
          onClick: m[0] || (m[0] = (s) => a.value = !a.value)
        }, [
          a.value ? (openBlock(), createElementBlock("svg", _hoisted_1$k, _hoisted_3$f)) : (openBlock(), createElementBlock("svg", _hoisted_4$d, _hoisted_6$a))
        ]),
        renderSlot(r.$slots, "default", {}, void 0, !0)
      ]),
      _: 2
    }, [
      r.$slots.footer ? {
        name: "footer",
        fn: withCtx(() => [
          renderSlot(r.$slots, "footer", {}, void 0, !0)
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
}), divider_vue_vue_type_style_index_0_scoped_a319f041_lang = "", dividerVue = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-a319f041"]]), UDivider = withInstall(dividerVue), _withScopeId$c = (e) => (pushScopeId("data-v-613d0eb5"), e = e(), popScopeId(), e), _hoisted_1$i = ["placeholder", "onKeydown", "innerHTML"], _hoisted_2$g = ["src"], _hoisted_3$e = ["onClick"], _hoisted_4$c = /* @__PURE__ */ _withScopeId$c(() => /* @__PURE__ */ createElementVNode("svg", {
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
], __default__$d = {
  name: "UEditor"
}, _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$d,
  props: {
    placeholder: null,
    modelValue: null,
    minHeight: { default: 30 },
    imgList: null
  },
  emits: ["update:modelValue", "input", "focus", "blur", "submit"],
  setup(e, { expose: n, emit: t }) {
    const o = e;
    useCssVars((w) => ({
      "04c97462": unref(c),
      "63d74d72": unref(u)
    }));
    const a = ref(), r = ref(), m = ref(), s = ref(!1), i = ref(!1), v = ref(), { imgList: l } = toRefs(o), c = computed(() => o.minHeight + "px"), u = computed(() => o.minHeight == 30 ? "4px 10px" : "8px 12px");
    watch(
      () => o.modelValue,
      (w) => {
        s.value || (m.value = w);
      }
    );
    function d(w) {
      t("focus", w), s.value = !0, i.value = !0;
    }
    function _(w) {
      var $, C;
      a.value = ($ = window.getSelection()) == null ? void 0 : $.getRangeAt(0), t("blur", w), (C = r.value) != null && C.innerHTML || (i.value = !1), s.value = !1;
    }
    function p(w) {
      const { innerHTML: $ } = w.target;
      t("update:modelValue", $), t("input", w);
    }
    function y(w) {
      var C, k;
      let $ = window.getSelection();
      if ($) {
        $.removeAllRanges(), a.value || ((C = r.value) == null || C.focus(), a.value = $.getRangeAt(0)), a.value.deleteContents(), a.value.insertNode(a.value.createContextualFragment(w)), a.value.collapse(!1), $.addRange(a.value), t("update:modelValue", ((k = r.value) == null ? void 0 : k.innerHTML) || "");
        const B = r.value;
        t("input", B);
      }
    }
    function g() {
      r.value && (r.value.innerHTML = "", t("update:modelValue", r.value.innerHTML), i.value = !1);
    }
    function b() {
      nextTick(() => {
        var w;
        (w = r.value) == null || w.focus();
      });
    }
    const x = (w) => {
      w.ctrlKey && w.key == "Enter" && t("submit");
    }, E = (w) => {
      var $;
      ($ = l == null ? void 0 : l.value) == null || $.splice(w, 1);
    };
    return onMounted(() => {
      var w;
      (w = r.value) == null || w.addEventListener("keyup", ($) => {
        const C = $.target;
        C.innerHTML == "<br>" && (C.innerHTML = "");
      });
    }), n({
      addText: y,
      clear: g,
      focus: b,
      imageRef: v
    }), (w, $) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["u-editor", { active: i.value }])
    }, [
      createElementVNode("div", {
        ref_key: "editorRef",
        ref: r,
        class: "rich-input",
        contenteditable: "true",
        placeholder: e.placeholder,
        onFocus: d,
        onInput: p,
        onBlur: _,
        onKeydown: withKeys(x, ["enter"]),
        innerHTML: m.value
      }, null, 40, _hoisted_1$i),
      createElementVNode("div", {
        ref_key: "imageRef",
        ref: v,
        class: "image-preview-box"
      }, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(l), (C, k) => (openBlock(), createElementBlock("div", {
          key: k,
          class: "image-preview"
        }, [
          createElementVNode("img", {
            src: C,
            alt: ""
          }, null, 8, _hoisted_2$g),
          createElementVNode("div", {
            class: "clean-btn",
            onClick: (B) => E(k)
          }, _hoisted_5$b, 8, _hoisted_3$e)
        ]))), 128))
      ], 512)
    ], 2));
  }
}), editor_vue_vue_type_style_index_0_scoped_613d0eb5_lang = "", editorVue = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-613d0eb5"]]), UEditor = withInstall(editorVue), index$2 = "", _hoisted_1$h = { class: "u-fold" }, _hoisted_2$f = { class: "action-box select-none" }, __default__$c = {
  name: "UFold"
}, _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: {
    line: { default: 5 },
    unfold: { type: Boolean }
  },
  setup(e) {
    const n = e;
    useCssVars((s) => ({
      "6c257a97": unref(t)
    }));
    const t = computed(() => {
      let s = Math.trunc(Number(n.line));
      return s > 0 ? s : 1;
    }), o = ref(!0), a = ref(!1), r = ref();
    let m;
    return onMounted(() => {
      m = new ResizeObserver((s) => {
        o.value && r.value && (a.value = r.value.offsetHeight < r.value.scrollHeight);
      }), m.observe(r.value);
    }), onUnmounted(() => {
      m.disconnect();
    }), (s, i) => (openBlock(), createElementBlock("div", _hoisted_1$h, [
      createElementVNode("div", {
        class: normalizeClass(["txt-box", { "over-hidden": o.value }])
      }, [
        createElementVNode("div", {
          ref_key: "divBox",
          ref: r
        }, [
          renderSlot(s.$slots, "default", {}, void 0, !0)
        ], 512)
      ], 2),
      createElementVNode("div", _hoisted_2$f, [
        a.value && e.unfold ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "expand-btn",
          onClick: i[0] || (i[0] = (v) => o.value = !o.value)
        }, toDisplayString(o.value ? "\u5C55\u5F00" : "\u6536\u8D77"), 1)) : createCommentVNode("", !0)
      ])
    ]));
  }
}), fold_vue_vue_type_style_index_0_scoped_9df778e5_lang = "", foldVue = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-9df778e5"]]), UFold = withInstall(foldVue), _hoisted_1$g = {
  key: 1,
  "aria-hidden": "true"
}, _hoisted_2$e = ["xlink:href"], __default__$b = {
  name: "UIcon"
}, _sfc_main$k = /* @__PURE__ */ defineComponent({
  ...__default__$b,
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
    return (a, r) => (openBlock(), createElementBlock("i", {
      class: "u-icon",
      style: normalizeStyle(unref(o))
    }, [
      a.$slots.default ? renderSlot(a.$slots, "default", { key: 0 }, void 0, !0) : (openBlock(), createElementBlock("svg", _hoisted_1$g, [
        createElementVNode("use", { "xlink:href": unref(t) }, null, 8, _hoisted_2$e)
      ]))
    ], 4));
  }
}), icon_vue_vue_type_style_index_0_scoped_b823a48c_lang = "", iconVue = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-b823a48c"]]), UIcon = withInstall(iconVue), _imports_0 = "/static/img/normal.webp", _imports_1 = "/static/img/greeting.webp", _imports_2 = "/static/img/blindfold.webp", _sfc_main$j = /* @__PURE__ */ defineComponent({
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
    }), r = (_, p, y) => {
      const g = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!p)
        return y("\u8BF7\u8F93\u5165\u90AE\u7BB1!");
      g.test(p) || y("\u90AE\u7BB1\u5730\u5740\u4E0D\u5408\u6CD5"), y();
    }, m = (_, p, y) => {
      p ? p != a.password ? y("\u8F93\u5165\u5BC6\u7801\u4E0D\u4E00\u81F4") : y() : y("\u8BF7\u786E\u8BA4\u5BC6\u7801");
    }, s = ref(), i = ref(), v = reactive({
      email: {
        required: !0,
        validator: r,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      }
    }), l = reactive({
      email: {
        required: !0,
        validator: r,
        trigger: "blur"
      },
      password: {
        required: !0,
        message: "\u8BF7\u8F93\u5165\u5BC6\u7801"
      },
      checkPass: {
        required: !0,
        validator: m,
        trigger: "blur"
      }
    }), c = reactive({
      type: "",
      one: { key: "", value: "" },
      two: { key: "", value: "" }
    });
    watch(
      () => o.modelValue,
      (_) => {
        switch (nextTick(() => d()), _) {
          case "login":
            i.value = v, c.type = "\u767B\u5F55", c.one = { key: "register", value: "\u90AE\u7BB1\u6CE8\u518C" }, c.two = { key: "forget", value: "\u5FD8\u8BB0\u5BC6\u7801" };
            break;
          case "register":
            i.value = v, c.type = "\u6CE8\u518C", c.one = { key: "login", value: "\u90AE\u7BB1\u767B\u5F55" }, c.two = { key: "", value: "" };
            break;
          case "forget":
            i.value = l, c.type = "\u4FEE\u6539\u5BC6\u7801", c.one = { key: "login", value: "\u90AE\u7BB1\u767B\u5F55" }, c.two = { key: "", value: "" };
            break;
        }
      },
      { immediate: !0 }
    );
    function u() {
      a.type = o.modelValue, s.value.validate((_) => {
        _ && t("submit", a);
      });
    }
    function d() {
      s.value.resetFields();
    }
    return n({
      reset: d
    }), (_, p) => {
      const y = resolveComponent("el-button");
      return openBlock(), createBlock(unref(ElForm), {
        ref_key: "ruleFormRef",
        ref: s,
        model: a,
        rules: i.value,
        class: "select-none"
      }, {
        default: withCtx(() => [
          createVNode(unref(ElFormItem), { prop: "email" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.email,
                "onUpdate:modelValue": p[0] || (p[0] = (g) => a.email = g),
                placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
                onFocus: p[1] || (p[1] = (g) => _.$emit("toggle", 1)),
                onBlur: p[2] || (p[2] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          createVNode(unref(ElFormItem), { prop: "password" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.password,
                "onUpdate:modelValue": p[3] || (p[3] = (g) => a.password = g),
                placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
                onFocus: p[4] || (p[4] = (g) => _.$emit("toggle", 2)),
                onBlur: p[5] || (p[5] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }),
          withDirectives(createVNode(unref(ElFormItem), { prop: "checkPass" }, {
            default: withCtx(() => [
              createVNode(unref(ElInput), {
                modelValue: a.checkPass,
                "onUpdate:modelValue": p[6] || (p[6] = (g) => a.checkPass = g),
                placeholder: "\u8BF7\u786E\u8BA4\u5BC6\u7801",
                onFocus: p[7] || (p[7] = (g) => _.$emit("toggle", 2)),
                onBlur: p[8] || (p[8] = (g) => _.$emit("toggle", 0))
              }, null, 8, ["modelValue"])
            ]),
            _: 1
          }, 512), [
            [vShow, e.modelValue == "forget"]
          ]),
          createVNode(unref(ElFormItem), null, {
            default: withCtx(() => [
              createVNode(y, {
                style: { width: "100%" },
                type: "primary",
                onClick: u
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(c.type), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(unref(ElFormItem), null, {
            default: withCtx(() => [
              createElementVNode("div", {
                onClick: p[9] || (p[9] = (g) => _.$emit("update:modelValue", c.one.key))
              }, toDisplayString(c.one.value), 1),
              createElementVNode("div", {
                onClick: p[10] || (p[10] = (g) => _.$emit("update:modelValue", c.two.key))
              }, toDisplayString(c.two.value), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["model", "rules"]);
    };
  }
}), form_vue_vue_type_style_index_0_scoped_5fdfc51d_lang = "", formVue = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-5fdfc51d"]]), _hoisted_1$f = { class: "u-sign" }, _hoisted_2$d = /* @__PURE__ */ createTextVNode("\u767B\u5F55/\u6CE8\u518C"), _hoisted_3$d = {
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
}, _hoisted_6$9 = /* @__PURE__ */ createTextVNode("\u5176\u4ED6\u65B9\u5F0F\u767B\u5F55"), _hoisted_7$8 = { class: "sign-oauth" }, __default__$a = {
  name: "USign"
}, _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  emits: ["submit"],
  setup(e, { emit: n }) {
    const t = ref(!1), o = ref("login"), a = ref(0), r = computed(() => {
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
    return (m, s) => {
      const i = resolveComponent("u-divider"), v = resolveComponent("u-icon"), l = resolveComponent("u-dialog");
      return openBlock(), createElementBlock("div", _hoisted_1$f, [
        createVNode(unref(ElButton), {
          link: "",
          onClick: s[0] || (s[0] = (c) => t.value = !0)
        }, {
          default: withCtx(() => [
            _hoisted_2$d
          ]),
          _: 1
        }),
        createVNode(l, {
          modelValue: t.value,
          "onUpdate:modelValue": s[4] || (s[4] = (c) => t.value = c),
          title: unref(r),
          width: "320px",
          top: "30vh",
          "close-on-click-modal": !1
        }, {
          default: withCtx(() => [
            a.value == 0 ? (openBlock(), createElementBlock("img", _hoisted_3$d)) : a.value == 1 ? (openBlock(), createElementBlock("img", _hoisted_4$b)) : (openBlock(), createElementBlock("img", _hoisted_5$a)),
            createVNode(formVue, {
              modelValue: o.value,
              "onUpdate:modelValue": s[1] || (s[1] = (c) => o.value = c),
              onToggle: s[2] || (s[2] = (c) => a.value = c),
              onSubmit: s[3] || (s[3] = (c) => m.$emit("submit", c))
            }, null, 8, ["modelValue"]),
            createVNode(i, null, {
              default: withCtx(() => [
                _hoisted_6$9
              ]),
              _: 1
            }),
            createElementVNode("div", _hoisted_7$8, [
              createVNode(v, { name: "QQ" }),
              createVNode(v, { name: "weixin" }),
              createVNode(v, { name: "gitee" }),
              createVNode(v, { name: "github" })
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "title"])
      ]);
    };
  }
}), sign_vue_vue_type_style_index_0_scoped_88f8558e_lang = "", signVue = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-88f8558e"]]), USign = withInstall(signVue), toastTypes = [
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
    type: "warning",
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
const _hoisted_1$e = { class: "v-toast" }, _hoisted_2$c = { class: "inner" }, _hoisted_3$c = { class: "message" }, __default__$9 = {
  name: "UToast"
}, _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...__default__$9,
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
        const r = getToastType(a);
        r && (t.color = r.options.color, t.bgColor = r.options.bgColor, t.icon = r.options.icon);
      },
      { immediate: !0 }
    ), onMounted(() => {
      o.value = !0, setTimeout(() => {
        o.value = !1;
      }, n.duration);
    }), (a, r) => (openBlock(), createElementBlock("div", _hoisted_1$e, [
      createVNode(Transition, { name: "v-toast" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", _hoisted_2$c, [
            createElementVNode("div", _hoisted_3$c, [
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
}), index_vue_vue_type_style_index_0_scoped_3590569c_lang = "", toast = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-3590569c"]]);
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
const _withScopeId$b = (e) => (pushScopeId("data-v-9b5cb42f"), e = e(), popScopeId(), e), _hoisted_1$d = { class: "custom-contextmenu__menu" }, _hoisted_2$b = ["onClick"], _hoisted_3$b = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ createElementVNode("div", { class: "arrow" }, null, -1)), _sfc_main$g = /* @__PURE__ */ defineComponent({
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
    }), a = (v) => {
      o.tag = v, o.dropdownList[1].show = !v.meta.isAffix, r(), setTimeout(() => {
        o.isShow = !0;
      }, 100);
    }, r = () => {
      o.isShow = !1;
    };
    onMounted(() => {
      window.addEventListener("click", r);
    }), onUnmounted(() => {
      window.removeEventListener("click", r);
    });
    const { isShow: m, dropdownList: s, tag: i } = toRefs(o);
    return n({
      openContextmenu: a
    }), (v, l) => {
      const c = resolveComponent("u-icon");
      return openBlock(), createBlock(Transition, { name: "el-zoom-in-center" }, {
        default: withCtx(() => [
          withDirectives(createElementVNode("div", {
            style: normalizeStyle(`top: ${e.dropdown.y + 5}px; left: ${e.dropdown.x}px;`),
            class: "custom-contextmenu"
          }, [
            createElementVNode("ul", _hoisted_1$d, [
              (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(s), (u, d) => (openBlock(), createElementBlock(Fragment, { key: d }, [
                u.show ? (openBlock(), createElementBlock("li", {
                  key: 0,
                  class: "item select-none",
                  onClick: (_) => v.$emit("submit", d, unref(i))
                }, [
                  createVNode(c, {
                    innerHTML: u.icon
                  }, null, 8, ["innerHTML"]),
                  createElementVNode("span", null, toDisplayString(u.title), 1)
                ], 8, _hoisted_2$b)) : createCommentVNode("", !0)
              ], 64))), 128))
            ]),
            _hoisted_3$b
          ], 4), [
            [vShow, unref(m)]
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
    const t = e, o = ref(), a = ref(), r = toRef(t, "modelValue"), m = ref(0), s = reactive({
      x: 0,
      y: 0
    });
    watch(
      () => [...r.value],
      (u, d) => {
        if (d) {
          if (u.length > d.length) {
            let _ = u.find((p) => !(d != null && d.includes(p)));
            r.value.forEach((p, y, g) => {
              g.findIndex((b) => b.meta.title == p.meta.title) != y && g.splice(y, 1);
            }), m.value = r.value.findIndex((p) => p.meta.title == (_ == null ? void 0 : _.meta.title));
          }
        } else {
          let _ = 1;
          r.value.forEach((p, y, g) => {
            g.findIndex((b) => b.meta.title == p.meta.title) != y && (g.splice(y, 1), m.value = g.findIndex((b) => b.meta.title == p.meta.title), _ = 0);
          }), _ && (m.value = r.value.length - 1);
        }
        nextTick(() => {
          o.value.update();
        });
      },
      {
        immediate: !0
      }
    ), watch(
      () => m.value,
      (u) => {
        n(
          "select",
          r.value.find((d, _) => _ == u)
        );
      }
    );
    const i = (u) => {
      r.value.map((d, _) => {
        if (!d.meta.isAffix && u == _)
          if (r.value.splice(_, 1), _ == m.value) {
            let y = [_, _ - 1].filter((g) => g >= 0 && g < r.value.length);
            m.value = y[0], m.value == _ && n(
              "select",
              r.value.find((g, b) => b == u)
            );
          } else
            u < m.value && (m.value -= 1);
      });
    }, v = (u) => {
      let d = r.value.filter((p) => p.meta.isAffix);
      u && !u.meta.isAffix && d.push(u), r.value.length = 0, r.value.push(...d);
      let _ = r.value.length - 1;
      m.value = _ >= 0 ? _ : 0;
    }, l = (u, d) => {
      switch (u) {
        case 0:
          n("refresh", d);
          break;
        case 1:
          let _ = r.value.findIndex((p) => p.path == d.path);
          i(_), n("close", d);
          break;
        case 2:
          v(d), n("closeOther", d);
          break;
        case 3:
          v(), n("closeAll");
          break;
        case 4:
          n("fullScreen", d);
          break;
      }
    }, c = (u, d) => {
      const { clientX: _, clientY: p } = d;
      s.x = _, s.y = p, a.value.openContextmenu(u);
    };
    return (u, d) => {
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
              (openBlock(!0), createElementBlock(Fragment, null, renderList(e.modelValue, (p, y) => (openBlock(), createElementBlock("li", {
                key: y,
                class: normalizeClass([{ "is-active": m.value == y }, "u-tabs-ul-li"]),
                onClick: (g) => m.value = y,
                onContextmenu: withModifiers((g) => c(p, g), ["prevent"])
              }, [
                createElementVNode("span", _hoisted_3$a, toDisplayString(p.meta.title), 1),
                p.meta.isAffix ? createCommentVNode("", !0) : (openBlock(), createBlock(_, {
                  key: 0,
                  onClick: withModifiers((g) => l(1, p), ["stop"])
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
          dropdown: s,
          onSubmit: l
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
    }), o = ref({}), a = ref({}), r = computed(() => n.delay > 2e3 ? n.delay : 2e3), m = () => {
      nextTick(() => {
        t.boxWidth = o.value.offsetWidth, t.textWidth = a.value.offsetWidth, document.styleSheets[0].insertRule(`@keyframes oneAnimation {0% {left: 0px;} 100% {left: -${t.textWidth}px;}}`), document.styleSheets[0].insertRule(
          `@keyframes twoAnimation {0% {left: ${t.boxWidth}px;} 100% {left: -${t.textWidth}px;}}`
        ), s(), setTimeout(() => {
          i();
        }, n.delay);
      });
    }, s = () => {
      t.oneTime = t.textWidth / n.spped, t.twoTime = (t.textWidth + t.boxWidth) / n.spped;
    }, i = () => {
      t.order === 1 ? (a.value.style.cssText = `animation: oneAnimation ${t.oneTime}s linear; opactity: 1;}`, t.order = 2) : a.value.style.cssText = `animation: twoAnimation ${t.twoTime}s linear infinite; opacity: 1;`;
    }, v = () => {
      a.value.addEventListener(
        "animationend",
        () => {
          i();
        },
        !1
      );
    };
    return onMounted(() => {
      n.vertical || (m(), v());
    }), (l, c) => {
      const u = resolveComponent("el-carousel-item"), d = resolveComponent("u-icon");
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
            interval: unref(r)
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
          e.prefixIcon ? (openBlock(), createBlock(d, {
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
          e.suffixIcon ? (openBlock(), createBlock(d, {
            key: 1,
            name: e.suffixIcon
          }, null, 8, ["name"])) : createCommentVNode("", !0)
        ], 4))
      ], 4);
    };
  }
}), noticeBar_vue_vue_type_style_index_0_scoped_bd038534_lang = "", noticeBarVue = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-bd038534"]]), UNoticeBar = withInstall(noticeBarVue), _withScopeId$9 = (e) => (pushScopeId("data-v-d9c547cb"), e = e(), popScopeId(), e), _hoisted_1$a = { class: "u-anchor" }, _hoisted_2$9 = { class: "toc-content" }, _hoisted_3$9 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ createElementVNode("h3", { class: "toc-content-heading" }, "\u76EE\u5F55", -1)), _hoisted_4$9 = { class: "toc-items" }, _hoisted_5$9 = ["onClick"], __default__$6 = {
  name: "UAnchor"
}, _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: {
    container: null,
    target: null,
    targetOffset: { default: 0 }
  },
  setup(e) {
    const n = e, t = ref(0), o = ref({}), a = ref({}), r = (i) => {
      switch (i) {
        case "H1":
        case "H2":
          return "d2";
        case "H3":
          return "d3";
        default:
          return "d4";
      }
    }, m = () => {
      const i = [];
      o.value.forEach((c) => {
        i.push(c.offsetTop);
      });
      const l = (a.value instanceof Element ? a.value.scrollTop : void 0) || document.documentElement.scrollTop || document.body.scrollTop;
      i.forEach((c, u) => {
        l >= c - 10 - n.targetOffset && (t.value = u);
      });
    }, s = (i) => {
      const v = o.value.item(i);
      n.target ? a.value.scrollTo({
        top: v.offsetTop - n.targetOffset,
        behavior: "smooth"
      }) : document.documentElement.scrollTo({
        top: v.offsetTop - n.targetOffset,
        behavior: "smooth"
      });
    };
    return onMounted(() => {
      var i;
      n.target ? a.value = document.querySelector(n.target) : a.value = window, o.value = (i = document.querySelector(n.container)) == null ? void 0 : i.querySelectorAll("h1, h2, h3, h4, h5, h6"), a.value.addEventListener("scroll", m);
    }), onUnmounted(() => {
      a.value.removeEventListener("scroll", m);
    }), (i, v) => {
      const l = resolveComponent("u-divider");
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        createElementVNode("nav", _hoisted_2$9, [
          _hoisted_3$9,
          createVNode(l),
          createElementVNode("ul", _hoisted_4$9, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(o.value, (c, u) => (openBlock(), createElementBlock("li", {
              key: u,
              class: normalizeClass([{ active: t.value == u }, r(c.nodeName)]),
              onClick: (d) => s(u)
            }, toDisplayString(c.innerText), 11, _hoisted_5$9))), 128))
          ])
        ])
      ]);
    };
  }
}), anchor_vue_vue_type_style_index_0_scoped_d9c547cb_lang = "", anchorVue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-d9c547cb"]]), UAnchor = withInstall(anchorVue), _withScopeId$8 = (e) => (pushScopeId("data-v-71545b29"), e = e(), popScopeId(), e), _hoisted_1$9 = { class: "card-box u-scrollbar" }, _hoisted_2$8 = {
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
], -1)), _hoisted_6$8 = /* @__PURE__ */ createTextVNode(" \u6E05\u7A7A "), _hoisted_7$7 = { class: "trending" }, _hoisted_8$6 = { class: "title" }, _hoisted_9$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("span", null, "\u70ED\u641C", -1)), _hoisted_10$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ createElementVNode("svg", {
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
              onClick: o[0] || (o[0] = (r) => t.$emit("onClear"))
            }, {
              default: withCtx(() => [
                createVNode(a, null, {
                  default: withCtx(() => [
                    _hoisted_5$8
                  ]),
                  _: 1
                }),
                _hoisted_6$8
              ]),
              _: 1
            })
          ]),
          (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data.historySearchList, (r, m) => (openBlock(), createBlock(unref(ElTag), {
            key: m,
            type: r.type,
            closable: "",
            onClose: (s) => t.$emit("onClose", r.name),
            onClick: (s) => t.$emit("submit", r.name)
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(r.name), 1)
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
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data.hotSearchList, (r, m) => (openBlock(), createElementBlock("div", {
              key: m,
              class: "hot-item",
              onClick: (s) => t.$emit("submit", r)
            }, [
              createElementVNode("div", {
                class: normalizeClass(["trending-rank", { "trending-rank-top": m < 3 }])
              }, toDisplayString(m + 1), 3),
              createElementVNode("div", _hoisted_13$1, toDisplayString(r), 1),
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
], -1)), _hoisted_4$7 = ["data-before", "data-after"], _hoisted_5$7 = ["placeholder"], _hoisted_6$7 = { class: "btn" }, _hoisted_7$6 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ createElementVNode("svg", {
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
    const t = e, o = ref({}), a = toRef(t.config, "keywords"), r = ref(!1), m = ref(0), s = ref(!0), i = ref(), v = reactive({
      types: ["success", "info", "warning", "danger"]
    }), l = reactive({
      search: "",
      cardVisible: !1,
      historySearchList: storage.get("searchHistory") || [],
      hotSearchList: t.config.hotSearchList
    });
    watch(
      () => t.config.hotSearchList,
      (x) => {
        l.hotSearchList = x;
      }
    );
    const c = computed(() => {
      let x = a.value[m.value];
      return r.value || l.search ? "" : x;
    }), u = computed(() => {
      let x = typeof a.value[m.value + 1] > "u" ? a.value[0] : a.value[m.value + 1];
      return r.value || l.search ? "" : x;
    }), d = computed(() => {
      let x = a.value[m.value];
      return r.value ? x : "";
    }), _ = computed(() => !r.value && !l.search && s.value), p = (x) => {
      let E = ($, C) => Math.round(Math.random() * (C - $)) + $, w = ($) => l.historySearchList.filter((C) => C.name == $).length != 0;
      if (x && l.historySearchList)
        w(x) || l.historySearchList.push({ name: x, type: v.types[E(0, 3)] });
      else {
        let $ = r.value ? d : c;
        x = $.value, w($.value) || l.historySearchList.push({ name: $.value, type: v.types[E(0, 3)] });
      }
      storage.set("searchHistory", l.historySearchList), l.search = x, o.value.focus(), n("submit", x);
    }, y = (x) => {
      l.historySearchList.findIndex((E) => E.name == x), l.historySearchList.splice(
        l.historySearchList.findIndex((E) => E.name == x),
        1
      ), storage.set("searchHistory", l.historySearchList);
    }, g = () => {
      l.historySearchList.length = 0, storage.remove("searchHistory");
    }, b = (x) => {
      if (x.pseudoElement == "::after") {
        s.value = !1;
        let E = typeof a.value[m.value + 1] > "u" ? 0 : m.value + 1;
        m.value = E, setTimeout(() => {
          s.value = !0;
        }, 3e3);
      }
    };
    return (x, E) => {
      const w = resolveComponent("u-icon");
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", {
          class: normalizeClass(["search", { active: r.value }])
        }, [
          createElementVNode("div", _hoisted_2$7, [
            createVNode(w, null, {
              default: withCtx(() => [
                _hoisted_3$7
              ]),
              _: 1
            })
          ]),
          createElementVNode("label", {
            ref_key: "labelRef",
            ref: i,
            "data-before": unref(c),
            "data-after": unref(u),
            class: normalizeClass({ animate: unref(_) }),
            onAnimationend: b
          }, [
            withDirectives(createElementVNode("input", {
              ref_key: "inputRef",
              ref: o,
              "onUpdate:modelValue": E[0] || (E[0] = ($) => l.search = $),
              type: "text",
              placeholder: unref(d),
              onFocus: E[1] || (E[1] = () => {
                r.value = !0, l.cardVisible = !0;
              }),
              onBlur: E[2] || (E[2] = ($) => r.value = !1),
              onKeyup: E[3] || (E[3] = withKeys(($) => p(l.search), ["enter"]))
            }, null, 40, _hoisted_5$7), [
              [vModelText, l.search]
            ])
          ], 42, _hoisted_4$7),
          createElementVNode("div", _hoisted_6$7, [
            withDirectives(createVNode(w, {
              class: "close",
              onClick: E[4] || (E[4] = ($) => l.search = "")
            }, {
              default: withCtx(() => [
                _hoisted_7$6
              ]),
              _: 1
            }, 512), [
              [vShow, l.search]
            ]),
            createElementVNode("div", {
              class: "search-btn",
              onClick: E[5] || (E[5] = ($) => p(l.search))
            }, [
              createVNode(w, null, {
                default: withCtx(() => [
                  _hoisted_8$5
                ]),
                _: 1
              })
            ])
          ])
        ], 2),
        withDirectives(createVNode(CardBox, {
          data: l,
          onOnClose: y,
          onOnClear: g,
          onSubmit: p
        }, null, 8, ["data"]), [
          [unref(ClickOutside), () => l.cardVisible = !1, i.value]
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
}, _withScopeId$6 = (e) => (pushScopeId("data-v-0a41305e"), e = e(), popScopeId(), e), _hoisted_1$7 = { class: "message" }, _hoisted_2$6 = { class: "chat-list" }, _hoisted_3$6 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_4$6 = { class: "content" }, _hoisted_5$6 = {
  key: 0,
  class: "username"
}, _hoisted_6$6 = ["innerHTML"], _hoisted_7$5 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ createElementVNode("div", { class: "date" }, null, -1)), _sfc_main$a = /* @__PURE__ */ defineComponent({
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
          const r = document.querySelector(".chat-item:last-child");
          o.value.setScrollTop(r.offsetTop);
        });
      }
    }), (r, m) => (openBlock(), createElementBlock("div", _hoisted_1$7, [
      createVNode(unref(ElScrollbar), {
        ref_key: "scrollbarRef",
        ref: o
      }, {
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$6, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (s, i) => (openBlock(), createElementBlock("div", {
              key: i,
              class: normalizeClass([{ self: e.userId == s.id }, "chat-item"])
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
                e.userId != s.id ? (openBlock(), createElementBlock("div", _hoisted_5$6, toDisplayString(s.username), 1)) : createCommentVNode("", !0),
                createElementVNode("div", {
                  class: "card-box",
                  innerHTML: unref(useEmojiParse)(unref(t), s.content)
                }, null, 8, _hoisted_6$6)
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
}, _hoisted_6$5 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ createElementVNode("svg", {
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
    const t = e, o = ref(!1), a = ref(""), r = ref(), m = (l) => {
      const { ctrlKey: c, key: u } = l;
      c && u == "Enter" && i();
    }, s = () => {
      a.value = "", r.value.scroll();
    }, i = () => {
      let l = a.value;
      l.trim() ? (l = l.replace(/\n/g, "<br/>"), n("submit", { clear: s, content: l })) : UToast({ type: "error", message: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A" });
    }, v = (l) => {
      let c = document.getElementById("emojiInput"), u = c.selectionStart, d = c.selectionEnd, _ = c.value;
      if (u === null || d === null)
        return;
      let p = _.substring(0, u) + l + _.substring(d);
      c.value = p, c.focus(), c.selectionStart = u + l.length, c.selectionEnd = u + l.length, a.value = p;
    };
    return provide(InjectionEmojiApi, t.emoji), (l, c) => {
      const u = resolveComponent("u-icon"), d = resolveComponent("u-emoji");
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
            ref: r,
            data: e.data,
            "user-id": e.userId
          }, null, 8, ["data", "user-id"]),
          createElementVNode("div", _hoisted_5$5, [
            createVNode(unref(ElInput), {
              id: "emojiInput",
              modelValue: a.value,
              "onUpdate:modelValue": c[0] || (c[0] = (_) => a.value = _),
              type: "textarea",
              autosize: { minRows: 1, maxRows: 4 },
              placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
              onKeydown: withKeys(m, ["enter"])
            }, null, 8, ["modelValue", "onKeydown"]),
            createVNode(d, {
              style: { margin: "0 8px 0" },
              emoji: e.emoji,
              placement: "top-end",
              onAddEmoji: v
            }, {
              default: withCtx(() => [
                _hoisted_6$5
              ]),
              _: 1
            }, 8, ["emoji"]),
            createVNode(u, {
              size: "18",
              class: normalizeClass([{ "submit-btn": a.value.trim() != "" }, "select-none cursor-pointer"]),
              style: { "padding-bottom": "5px" },
              onClick: i
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
          onClick: c[1] || (c[1] = (_) => o.value = !o.value)
        }, {
          default: withCtx(() => [
            _hoisted_8$4
          ]),
          _: 1
        })
      ]);
    };
  }
}), chat_vue_vue_type_style_index_0_scoped_86dc96f5_lang = "", chatVue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-86dc96f5"]]), UChat = withInstall(chatVue), _withScopeId$4 = (e) => (pushScopeId("data-v-54bea938"), e = e(), popScopeId(), e), _hoisted_1$5 = { class: "u-emoji" }, _hoisted_2$4 = { class: "face-tooltip-head select-none" }, _hoisted_3$4 = ["onClick"], _hoisted_4$4 = ["src"], _hoisted_5$4 = { class: "emoji-body select-none" }, _hoisted_6$4 = { style: { padding: "0 5px" } }, _hoisted_7$3 = ["onClick"], _hoisted_8$3 = { class: "emoji-btn select-none" }, _hoisted_9$2 = { key: 0 }, _hoisted_10$2 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ createElementVNode("svg", {
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
    const t = e, o = ref(0), a = ref(0), r = ref(new Array(2)), { emojiList: m, faceList: s } = t.emoji;
    function i(l) {
      switch (o.value = l, l) {
        case 0:
          a.value = 0;
          break;
        case 1:
          a.value = -50, r.value[1] = m[1];
          break;
      }
    }
    function v() {
      r.value[0] = m[0];
    }
    return (l, c) => (openBlock(), createElementBlock("div", _hoisted_1$5, [
      createVNode(unref(ElPopover), {
        placement: e.placement,
        "popper-class": "emoji-popover",
        width: 250,
        trigger: "click",
        onBeforeEnter: v
      }, {
        reference: withCtx(() => [
          createElementVNode("div", _hoisted_8$3, [
            l.$slots.default ? renderSlot(l.$slots, "default", { key: 1 }, void 0, !0) : (openBlock(), createElementBlock("div", _hoisted_9$2, _hoisted_12$1))
          ])
        ]),
        default: withCtx(() => [
          createElementVNode("div", _hoisted_2$4, [
            (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(s), (u, d) => (openBlock(), createElementBlock("label", {
              key: d,
              class: normalizeClass(o.value == d ? "active" : ""),
              onClick: (_) => i(d)
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
              (openBlock(!0), createElementBlock(Fragment, null, renderList(r.value, (u, d) => (openBlock(), createElementBlock("div", {
                key: d,
                class: "emoji-wrapper"
              }, [
                createVNode(unref(ElScrollbar), null, {
                  default: withCtx(() => [
                    createElementVNode("div", _hoisted_6$4, [
                      (openBlock(!0), createElementBlock(Fragment, null, renderList(u, (_, p) => (openBlock(), createElementBlock("span", {
                        key: p,
                        class: "emoji-item",
                        onClick: (y) => l.$emit("addEmoji", p)
                      }, [
                        createVNode(unref(ElImage), {
                          src: _,
                          title: String(p),
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
    }), a = () => t.endAmount > t.startAmount, r = computed(() => {
      const l = /(\d+)(\d{3})/;
      let c = o.currentAmount.toFixed(t.decimals);
      c += "";
      let u = c.split("."), d = u[0], _ = u.length > 1 ? t.decimalSeparator + u[1] : "", p = !isNaN(parseFloat(t.separator));
      if (t.separator && !p)
        for (; l.test(d); )
          d = d.replace(l, "$1" + t.separator + "$2");
      return d + _;
    }), m = computed(() => `${t.prefix}${r.value}${t.suffix}`);
    onMounted(() => {
      o.currentAmount = t.startAmount, o.currentStartAmount = t.startAmount, o.currentDuration = t.duration * 1e3, o.remaining = t.duration * 1e3, t.autoinit ? s() : o.paused = !0;
    });
    const s = () => {
      i(), o.currentStartAmount = t.startAmount, o.startTimestamp = 0, o.currentDuration = t.duration * 1e3, o.paused = !1, o.animationFrame = window.requestAnimationFrame(v);
    }, i = () => {
      o.animationFrame && window.cancelAnimationFrame(o.animationFrame);
    }, v = (l) => {
      o.timestamp = l, o.startTimestamp || (o.startTimestamp = l);
      let c = l - o.startTimestamp;
      o.remaining = o.currentDuration - c, a ? (o.currentAmount = o.currentStartAmount + (t.endAmount - o.currentStartAmount) * (c / o.currentDuration), o.currentAmount = o.currentAmount > t.endAmount ? t.endAmount : o.currentAmount) : (o.currentAmount = o.currentStartAmount - (o.currentStartAmount - t.endAmount) * (c / o.currentDuration), o.currentAmount = o.currentAmount < t.endAmount ? t.endAmount : o.currentAmount), c < o.currentDuration ? o.animationFrame = window.requestAnimationFrame(v) : n("finished");
    };
    return (l, c) => (openBlock(), createElementBlock("span", null, toDisplayString(unref(m)), 1));
  }
}), UCounter$1 = withInstall(_sfc_main$7), _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "user-info",
  props: {
    isUserInfo: { type: Boolean },
    visible: { type: Boolean }
  },
  setup(e) {
    return (n, t) => (openBlock(), createElementBlock("div", null, [
      e.isUserInfo ? (openBlock(), createBlock(unref(ElPopover), {
        key: 0,
        visible: e.visible,
        placement: "top",
        width: 300
      }, {
        reference: withCtx(() => [
          renderSlot(n.$slots, "default")
        ]),
        default: withCtx(() => [
          renderSlot(n.$slots, "userInfo")
        ]),
        _: 3
      }, 8, ["visible"])) : renderSlot(n.$slots, "default", { key: 1 })
    ]));
  }
}), _withScopeId$3 = (e) => (pushScopeId("data-v-24364064"), e = e(), popScopeId(), e), _hoisted_1$4 = { class: "operation-list select-none" }, _hoisted_2$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1127 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1612"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M1108.468296 824.890547C1159.055032 910.219597 1097.227863 1024 990.429373 1024L130.432879 1024C29.258031 1024-32.574625 910.219597 18.012112 824.890547L450.825613 68.266574C473.306472 22.754136 518.276424 0 563.240888 0 608.209469 0 653.173934 22.754136 675.660283 68.266574L1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547 1108.468296 824.890547ZM1020.384123 877.110641 1019.583053 875.735153 586.77504 119.111177 583.854223 113.62523C580.333998 106.500274 573.244216 102.4 563.240888 102.4 553.240806 102.4 546.151071 106.500212 542.636068 113.61633L539.710577 119.111663 106.096287 877.110641C95.301134 895.319767 109.937021 921.6 130.432879 921.6L990.429373 921.6C1016.30634 921.6 1031.298263 895.520476 1020.384123 877.110641L1020.384123 877.110641 1020.384123 877.110641 1020.384123 877.110641ZM558.08319 307.2C532.482248 307.2 512 322.819385 512 342.344809L512 579.251379C512 598.776801 532.482248 614.4 558.08319 614.4L568.321812 614.4C593.922749 614.4 614.4 598.776801 614.4 579.251379L614.4 342.344809C614.4 322.819385 593.922749 307.2 568.321812 307.2L558.08319 307.2 558.08319 307.2 558.08319 307.2 558.08319 307.2ZM512 766.885176C512 780.001705 517.522432 793.032632 526.999818 802.305669 536.477199 811.577487 549.797038 816.975247 563.200625 816.975247 576.602962 816.975247 589.927798 811.577487 599.405184 802.305669 608.882565 793.032632 614.4 780.001705 614.4 766.885176 614.4 753.772319 608.882565 740.741391 599.405184 731.469573 589.927798 722.19776 576.602962 716.8 563.200625 716.8 549.797038 716.8 536.477199 722.19776 526.999818 731.469573 517.522432 740.741391 512 753.772319 512 766.885176L512 766.885176 512 766.885176 512 766.885176Z",
    "p-id": "1613"
  })
], -1)), _hoisted_3$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", null, "\u4E3E\u62A5", -1)), _hoisted_4$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1750"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M607.897867 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L575.903242 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 351.94087C639.892491 753.593818 625.61532 768.043004 607.897867 768.043004zM415.930119 768.043004c-17.717453 0-31.994625-14.277171-31.994625-31.994625L383.935495 383.935495c0-17.717453 14.277171-31.994625 31.994625-31.994625 17.717453 0 31.994625 14.277171 31.994625 31.994625l0 351.94087C447.924744 753.593818 433.647573 768.043004 415.930119 768.043004zM928.016126 223.962372l-159.973123 0L768.043004 159.973123c0-52.980346-42.659499-95.983874-95.295817-95.983874L351.94087 63.989249c-52.980346 0-95.983874 43.003528-95.983874 95.983874l0 63.989249-159.973123 0c-17.717453 0-31.994625 14.277171-31.994625 31.994625s14.277171 31.994625 31.994625 31.994625l832.032253 0c17.717453 0 31.994625-14.277171 31.994625-31.994625S945.73358 223.962372 928.016126 223.962372zM319.946246 159.973123c0-17.545439 14.449185-31.994625 31.994625-31.994625l320.806316 0c17.545439 0 31.306568 14.105157 31.306568 31.994625l0 63.989249L319.946246 223.962372 319.946246 159.973123 319.946246 159.973123zM736.048379 960.010751 288.123635 960.010751c-52.980346 0-95.983874-43.003528-95.983874-95.983874L192.139761 383.591466c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 480.435411c0 17.717453 14.449185 31.994625 31.994625 31.994625l448.096758 0c17.717453 0 31.994625-14.277171 31.994625-31.994625L768.215018 384.795565c0-17.717453 14.277171-31.994625 31.994625-31.994625s31.994625 14.277171 31.994625 31.994625l0 479.231312C832.032253 916.835209 789.028725 960.010751 736.048379 960.010751z",
    "p-id": "1751"
  })
], -1)), _hoisted_5$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("span", null, "\u5220\u9664", -1)), _hoisted_6$3 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M586.624 234.624a74.624 74.624 0 1 1-149.184 0 74.624 74.624 0 0 1 149.12 0z m0 554.624a74.624 74.624 0 1 1-149.248 0 74.624 74.624 0 0 1 149.248 0zM512 586.624a74.624 74.624 0 1 0 0-149.248 74.624 74.624 0 0 0 0 149.248z",
    fill: "currentColor"
  })
], -1)), _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "operation",
  props: {
    id: null,
    parentId: null,
    uid: null
  },
  setup(e) {
    const n = e, t = ref(!1), o = ref(), { user: a, report: r, remove: m } = inject(InjectionContentBox), s = () => {
      var l;
      (l = o.value) == null || l.hide();
    }, i = () => {
      t.value = !0, s(), r(n.id, () => {
        t.value = !1;
      });
    }, v = () => {
      t.value = !0, s(), m(
        n.id,
        n.parentId,
        () => {
          t.value = !1;
        }
      );
    };
    return (l, c) => {
      const u = resolveComponent("u-icon");
      return openBlock(), createBlock(unref(ElPopover), {
        ref_key: "popoverRef",
        ref: o,
        placement: "bottom-end",
        "popper-class": "operatoin-popover",
        trigger: "click"
      }, {
        reference: withCtx(() => [
          createElementVNode("div", {
            class: normalizeClass(["operation-warp", { "operation-parent": e.parentId == null }])
          }, [
            createVNode(u, null, {
              default: withCtx(() => [
                _hoisted_6$3
              ]),
              _: 1
            })
          ], 2)
        ]),
        default: withCtx(() => [
          createElementVNode("ul", _hoisted_1$4, [
            unref(str)(unref(a).id) != e.uid ? (openBlock(), createElementBlock("li", {
              key: 0,
              class: normalizeClass([{ active: t.value }, "operation-option"]),
              onClick: i
            }, [
              createVNode(u, null, {
                default: withCtx(() => [
                  _hoisted_2$3
                ]),
                _: 1
              }),
              _hoisted_3$3
            ], 2)) : (openBlock(), createElementBlock("li", {
              key: 1,
              class: normalizeClass(["operation-option", { active: t.value }]),
              onClick: v
            }, [
              createVNode(u, null, {
                default: withCtx(() => [
                  _hoisted_4$3
                ]),
                _: 1
              }),
              _hoisted_5$3
            ], 2))
          ])
        ]),
        _: 1
      }, 512);
    };
  }
}), operation_vue_vue_type_style_index_0_lang = "", operation_vue_vue_type_style_index_1_scoped_24364064_lang = "", Operation = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-24364064"]]), _withScopeId$2 = (e) => (pushScopeId("data-v-92608e0a"), e = e(), popScopeId(), e), _hoisted_1$3 = ["href"], _hoisted_2$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_3$2 = { class: "comment-main" }, _hoisted_4$2 = { class: "user-box" }, _hoisted_5$2 = ["href"], _hoisted_6$2 = { class: "username" }, _hoisted_7$2 = {
  class: "name",
  style: { "max-width": "10em" }
}, _hoisted_8$2 = {
  blank: "true",
  class: "rank"
}, _hoisted_9$1 = {
  class: "address",
  style: { color: "#939393", "font-size": "12px" }
}, _hoisted_10$1 = { class: "time" }, _hoisted_11 = { class: "content" }, _hoisted_12 = ["innerHTML"], _hoisted_13 = {
  class: "imgbox",
  style: { display: "flex" }
}, _hoisted_14 = { class: "action-box select-none" }, _hoisted_15 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
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
], -1)), _hoisted_16 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
  viewBox: "0 0 1024 1024",
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  "p-id": "1534"
}, [
  /* @__PURE__ */ createElementVNode("path", {
    d: "M668.928 166.912c-20.48-53.504-47.9744-84.7872-82.0224-94.9248-33.5872-10.0352-61.952 4.096-76.032 13.9776-27.5456 19.3536-41.216 49.664-50.0224 74.1376-3.3792 9.3184-6.4512 19.0976-9.216 27.9552l-2.6624 8.3968a227.8912 227.8912 0 0 1-10.3936 27.9552c-25.344 52.9408-47.4112 84.5312-66.7648 104.96-18.944 19.968-36.4544 30.464-55.1936 39.7824a45.3632 45.3632 0 0 0-25.088 40.5504l-0.1024 480.7168c0 24.9344 20.2752 45.2096 45.2096 45.2096h423.0656c21.7088 0 38.144-6.912 50.0224-16.9984a72.192 72.192 0 0 0 14.4896-16.896l0.2048-0.2048 0.0512-0.1536 0.8192-1.024 1.2288-1.8944c39.424-63.7952 66.7648-114.688 88.2176-175.616 24.4224-69.4784 36.8128-129.6896 42.0352-176.64 5.12-45.6704 3.7888-81.664-1.5872-101.376a77.9776 77.9776 0 0 0-45.568-52.3264 116.5824 116.5824 0 0 0-45.4144-8.6016l-192.8192-2.6624c28.1088-115.0976 10.0864-181.6064-2.4576-214.3744zM64.0512 413.9008a45.2096 45.2096 0 0 1 45.1584-47.36H176.128c24.9344 0 45.2096 20.2752 45.2096 45.2096v480.6144a45.2096 45.2096 0 0 1-45.2096 45.2096h-44.288a45.2096 45.2096 0 0 1-45.1584-43.0592L64 413.952z",
    "p-id": "1535"
  })
], -1)), _hoisted_17 = { key: 2 }, _hoisted_18 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ createElementVNode("svg", {
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
], -1)), _hoisted_19 = { key: 0 }, _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "content-box",
  props: {
    small: { type: Boolean },
    data: null,
    parentId: null
  },
  setup(e) {
    const n = e, t = reactive({
      active: !1,
      visible: !1,
      visible2: !1
    }), o = ref(), a = ref(), r = computed(() => {
      let x = n.data.contentImg;
      return isEmpty(x) ? [] : x == null ? void 0 : x.split(", ");
    }), { allEmoji: m } = inject(InjectionEmojiApi), { like: s, user: i, isUserInfo: v, getUser: l } = inject(InjectionContentBox), c = (x) => {
      switch (x) {
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
    };
    function u() {
      t.active = !t.active, t.active && nextTick(() => {
        var x;
        (x = o.value) == null || x.focus();
      });
    }
    function d(x) {
      var w;
      const E = x.target;
      (w = a.value) != null && w.contains(E) || (t.active = !1);
    }
    let _ = 300, p = null;
    const y = (x) => {
      clearTimeout(p), p = setTimeout(() => {
        l(str(n.data.uid), () => {
          p != null && (x == 1 ? t.visible = !0 : t.visible2 = !0);
        });
      }, _);
    }, g = () => {
      clearTimeout(p), p = null, t.visible = !1, t.visible2 = !1;
    }, b = computed(() => useEmojiParse(m, n.data.content));
    return (x, E) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["comment", { small: e.small }])
    }, [
      createVNode(_sfc_main$6, {
        "is-user-info": unref(v),
        visible: t.visible
      }, {
        userInfo: withCtx(() => [
          renderSlot(x.$slots, "userInfo", {}, void 0, !0)
        ]),
        default: withCtx(() => [
          createElementVNode("a", {
            href: e.data.link,
            target: "_blank",
            style: { display: "block" },
            onMouseenter: E[0] || (E[0] = (w) => y(1)),
            onMouseleave: g
          }, [
            createVNode(unref(ElAvatar), {
              style: { "margin-top": "5px" },
              size: 40,
              fit: "cover",
              src: e.data.avatar
            }, {
              default: withCtx(() => [
                _hoisted_2$2
              ]),
              _: 1
            }, 8, ["src"])
          ], 40, _hoisted_1$3)
        ]),
        _: 3
      }, 8, ["is-user-info", "visible"]),
      createElementVNode("div", _hoisted_3$2, [
        createElementVNode("div", _hoisted_4$2, [
          createVNode(_sfc_main$6, {
            "is-user-info": unref(v),
            visible: t.visible2
          }, {
            userInfo: withCtx(() => [
              renderSlot(x.$slots, "userInfo", {}, void 0, !0)
            ]),
            default: withCtx(() => [
              createElementVNode("a", {
                href: e.data.link,
                target: "_blank",
                style: { display: "block" },
                onMouseenter: E[1] || (E[1] = (w) => y()),
                onMouseleave: g
              }, [
                createElementVNode("div", _hoisted_6$2, [
                  createElementVNode("span", _hoisted_7$2, toDisplayString(e.data.username), 1),
                  createElementVNode("span", _hoisted_8$2, [
                    createVNode(unref(UIcon), {
                      size: "24",
                      innerHTML: c(e.data.level)
                    }, null, 8, ["innerHTML"])
                  ])
                ])
              ], 40, _hoisted_5$2)
            ]),
            _: 3
          }, 8, ["is-user-info", "visible"]),
          createElementVNode("span", _hoisted_9$1, "\xA0\xA0" + toDisplayString(e.data.address), 1),
          createElementVNode("time", _hoisted_10$1, toDisplayString(e.data.createTime), 1)
        ]),
        createElementVNode("div", _hoisted_11, [
          createVNode(unref(UFold), { unfold: "" }, {
            default: withCtx(() => [
              createElementVNode("div", { innerHTML: unref(b) }, null, 8, _hoisted_12),
              createElementVNode("div", _hoisted_13, [
                (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(r), (w, $) => (openBlock(), createBlock(unref(ElImage), {
                  key: $,
                  src: w,
                  style: { height: "72px", padding: "8px 4px" },
                  lazy: "",
                  "preview-src-list": unref(r),
                  "initial-index": $
                }, null, 8, ["src", "preview-src-list", "initial-index"]))), 128))
              ])
            ]),
            _: 1
          })
        ]),
        createElementVNode("div", _hoisted_14, [
          createElementVNode("div", {
            class: "item",
            onClick: E[2] || (E[2] = (w) => unref(s)(unref(str)(e.data.id)))
          }, [
            unref(i).likeIds.map(String).indexOf(unref(str)(e.data.id)) == -1 ? (openBlock(), createBlock(unref(UIcon), { key: 0 }, {
              default: withCtx(() => [
                _hoisted_15
              ]),
              _: 1
            })) : (openBlock(), createBlock(unref(UIcon), {
              key: 1,
              color: "#1e80ff"
            }, {
              default: withCtx(() => [
                _hoisted_16
              ]),
              _: 1
            })),
            e.data.likes != 0 ? (openBlock(), createElementBlock("span", _hoisted_17, toDisplayString(e.data.likes), 1)) : createCommentVNode("", !0)
          ]),
          createElementVNode("div", {
            ref_key: "btnRef",
            ref: a,
            class: normalizeClass(["item", { active: t.active }]),
            onClick: u
          }, [
            createVNode(unref(UIcon), null, {
              default: withCtx(() => [
                _hoisted_18
              ]),
              _: 1
            }),
            createElementVNode("span", null, toDisplayString(t.active ? "\u53D6\u6D88\u56DE\u590D" : "\u56DE\u590D"), 1)
          ], 2),
          createVNode(Operation, {
            id: unref(str)(e.data.id),
            "parent-id": unref(str)(e.data.parentId),
            uid: unref(str)(e.data.uid)
          }, null, 8, ["id", "parent-id", "uid"])
        ]),
        t.active ? (openBlock(), createElementBlock("div", _hoisted_19, [
          createVNode(CommentBox, {
            ref_key: "commentRef",
            ref: o,
            "parent-id": e.parentId,
            placeholder: `\u56DE\u590D @${e.data.username}...`,
            replay: e.data.parentId ? e.data.username : void 0,
            "content-btn": "\u53D1\u5E03",
            style: { "margin-top": "12px" },
            onHide: d,
            onClose: E[3] || (E[3] = (w) => t.active = !1)
          }, null, 8, ["parent-id", "placeholder", "replay"])
        ])) : createCommentVNode("", !0),
        renderSlot(x.$slots, "default", {}, void 0, !0)
      ])
    ], 2));
  }
}), contentBox_vue_vue_type_style_index_0_scoped_92608e0a_lang = "", ContentBox = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-92608e0a"]]), _withScopeId$1 = (e) => (pushScopeId("data-v-8b5ba87b"), e = e(), popScopeId(), e), _hoisted_1$2 = {
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
    parentId: null
  },
  setup(e) {
    const n = e, t = reactive({
      loading: !1,
      over: !1,
      pageNum: 1,
      pageSize: 5
    }), { replyPage: o, showSize: a, page: r, comments: m } = inject(InjectionReply), s = computed(() => {
      let u = {
        total: 0,
        length: 0,
        list: []
      };
      if (n.data) {
        let d = n.data.list.length;
        u = {
          total: n.data.total,
          length: d,
          list: n.data.list
        };
      }
      if (r && (u.list = u.list.slice(0, t.pageSize)), !t.over) {
        let d = u.list.slice(0, a);
        u.list = d;
      }
      return u;
    }), i = () => {
      t.over = !0;
    }, v = (u) => {
      m.value.forEach((d) => {
        d.id == n.parentId && d.reply && (d.reply = u);
      });
    }, l = (u) => {
      t.pageNum = u, o(n.parentId, u, t.pageSize, (d) => v(d));
    }, c = (u) => {
      t.pageSize = u, o(n.parentId, t.pageNum, u, (d) => v(d));
    };
    return (u, d) => unref(s).length > 0 ? (openBlock(), createElementBlock("div", _hoisted_1$2, [
      createElementVNode("div", _hoisted_2$1, [
        (openBlock(!0), createElementBlock(Fragment, null, renderList(unref(s).list, (_, p) => (openBlock(), createBlock(ContentBox, {
          key: p,
          "parent-id": e.parentId,
          data: _,
          small: ""
        }, {
          userInfo: withCtx(() => [
            renderSlot(u.$slots, "userInfo", {}, void 0, !0)
          ]),
          _: 2
        }, 1032, ["parent-id", "data"]))), 128)),
        unref(s).length > unref(a) ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          t.loading ? (openBlock(), createElementBlock("span", _hoisted_4$1, "\u52A0\u8F7D\u4E2D...")) : (openBlock(), createElementBlock("div", _hoisted_5$1, [
            t.over ? createCommentVNode("", !0) : (openBlock(), createElementBlock("div", _hoisted_6$1, [
              createTextVNode(" \u5171" + toDisplayString(unref(s).total) + "\u6761\u56DE\u590D, ", 1),
              createElementVNode("span", {
                class: "fetch-more-comment select-none",
                onClick: i
              }, _hoisted_9)
            ]))
          ]))
        ])) : createCommentVNode("", !0),
        t.over ? (openBlock(), createElementBlock("div", _hoisted_10, [
          unref(r) ? (openBlock(), createBlock(unref(ElPagination), {
            key: 0,
            small: "",
            "hide-on-single-page": "",
            layout: "total, prev, pager, next",
            total: unref(s).total,
            "page-size": t.pageSize,
            onCurrentChange: l,
            onSizeChange: c
          }, null, 8, ["total", "page-size"])) : createCommentVNode("", !0)
        ])) : createCommentVNode("", !0)
      ])
    ])) : createCommentVNode("", !0);
  }
}), replyBox_vue_vue_type_style_index_0_scoped_8b5ba87b_lang = "", ReplyBox = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-8b5ba87b"]]), _hoisted_1$1 = {
  key: 0,
  class: "comment-list"
}, _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "comment-list",
  props: {
    data: null
  },
  setup(e) {
    return (n, t) => e.data ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
      (openBlock(!0), createElementBlock(Fragment, null, renderList(e.data, (o, a) => (openBlock(), createBlock(ContentBox, {
        key: a,
        "parent-id": unref(str)(o.id),
        data: o
      }, {
        userInfo: withCtx(() => [
          renderSlot(n.$slots, "userInfo")
        ]),
        default: withCtx(() => [
          createVNode(ReplyBox, {
            "parent-id": unref(str)(o.id),
            data: o.reply
          }, {
            userInfo: withCtx(() => [
              renderSlot(n.$slots, "userInfo")
            ]),
            _: 2
          }, 1032, ["parent-id", "data"])
        ]),
        _: 2
      }, 1032, ["parent-id", "data"]))), 128))
    ])) : createCommentVNode("", !0);
  }
}), _withScopeId = (e) => (pushScopeId("data-v-645ae488"), e = e(), popScopeId(), e), _hoisted_1 = { class: "u-comment" }, _hoisted_2 = { class: "comment-form" }, _hoisted_3 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "header" }, [
  /* @__PURE__ */ createElementVNode("span", { class: "header-title" }, "\u8BC4\u8BBA")
], -1)), _hoisted_4 = { class: "content" }, _hoisted_5 = { class: "avatar-box" }, _hoisted_6 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("img", { src: "https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" }, null, -1)), _hoisted_7 = { class: "comment-list-wrapper" }, _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "title" }, "\u5168\u90E8\u8BC4\u8BBA", -1)), __default__$1 = {
  name: "UComment"
}, _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: {
    config: null,
    showSize: { default: 3 },
    page: { type: Boolean, default: !1 }
  },
  emits: ["submit", "like", "replyPage", "getUser", "report", "remove"],
  setup(e, { emit: n }) {
    const t = e, o = useSlots(), { user: a, comments: r } = toRefs(t.config), m = (l) => {
      let { content: c, parentId: u, files: d } = l;
      n("submit", { content: c, parentId: u, files: d, finish: (p) => {
        if (l.finish(), l.parentId) {
          let y = r.value.find((g) => g.id == l.parentId);
          if (y) {
            let g = y.reply;
            g ? (g.list.unshift(p), g.total++) : y.reply = {
              total: 1,
              list: [p]
            };
          }
        } else
          r.value.unshift(p);
      } });
    }, s = (l) => {
      const c = (_, p) => {
        let y = null;
        r.value.forEach((g) => {
          var b;
          g.id != _ ? y = (b = g.reply) == null ? void 0 : b.list.find((x) => x.id == _) : y = g, y && (y.likes += p);
        });
      }, u = t.config.user.likeIds;
      let d = u.map(String);
      n("like", l, () => {
        if (d.indexOf(l) == -1)
          u.push(l), c(l, 1);
        else {
          let _ = d.findIndex((p) => p == l);
          _ != -1 && u.splice(_, 1), c(l, -1);
        }
      });
    }, i = {
      replyPage: (l, c, u, d) => {
        n("replyPage", { parentId: l, pageNum: c, pageSize: u, finish: d });
      },
      showSize: t.showSize,
      page: t.page,
      comments: r
    }, v = {
      user: a,
      like: s,
      isUserInfo: o.userInfo != null,
      getUser: (l, c) => n("getUser", l, c),
      report: (l, c) => n("report", l, c),
      remove: (l, c, u) => n("remove", l, () => {
        if (u(), c) {
          let d = r.value.find((p) => p.id == c), _ = d == null ? void 0 : d.reply;
          if (_) {
            let p = _.list.findIndex((y) => y.id == l);
            p != -1 && (_.list.splice(p, 1), _.total--);
          }
        } else {
          let d = r.value.findIndex((_) => _.id == l);
          d != -1 && r.value.splice(d, 1);
        }
      })
    };
    return provide(InjectionCommentFun, m), provide(InjectionEmojiApi, t.config.emoji), provide(InjectionReply, i), provide(InjectionContentBox, v), (l, c) => (openBlock(), createElementBlock("div", _hoisted_1, [
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
          createVNode(CommentBox, {
            placeholder: "\u8F93\u5165\u8BC4\u8BBA\uFF08Enter\u6362\u884C\uFF0CCtrl + Enter\u53D1\u9001\uFF09",
            "content-btn": "\u53D1\u8868\u8BC4\u8BBA"
          })
        ])
      ]),
      createElementVNode("div", _hoisted_7, [
        renderSlot(l.$slots, "list-title", {}, () => [
          _hoisted_8
        ], !0),
        createVNode(_sfc_main$2, { data: unref(r) }, {
          userInfo: withCtx(() => [
            renderSlot(l.$slots, "userInfo", {}, void 0, !0)
          ]),
          _: 3
        }, 8, ["data"])
      ])
    ]));
  }
}), comment_vue_vue_type_style_index_0_scoped_645ae488_lang = "", commentVue = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-645ae488"]]), InjectionCommentFun = Symbol(), InjectionReply = Symbol(), InjectionContentBox = Symbol(), UComment = withInstall(commentVue), __default__ = {
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
    }), a = () => t.endAmount > t.startAmount, r = computed(() => {
      const l = /(\d+)(\d{3})/;
      let c = o.currentAmount.toFixed(t.decimals);
      c += "";
      let u = c.split("."), d = u[0], _ = u.length > 1 ? t.decimalSeparator + u[1] : "", p = !isNaN(parseFloat(t.separator));
      if (t.separator && !p)
        for (; l.test(d); )
          d = d.replace(l, "$1" + t.separator + "$2");
      return d + _;
    }), m = computed(() => `${t.prefix}${r.value}${t.suffix}`);
    onMounted(() => {
      o.currentAmount = t.startAmount, o.currentStartAmount = t.startAmount, o.currentDuration = t.duration * 1e3, o.remaining = t.duration * 1e3, t.autoinit ? s() : o.paused = !0;
    });
    const s = () => {
      i(), o.currentStartAmount = t.startAmount, o.startTimestamp = 0, o.currentDuration = t.duration * 1e3, o.paused = !1, o.animationFrame = window.requestAnimationFrame(v);
    }, i = () => {
      o.animationFrame && window.cancelAnimationFrame(o.animationFrame);
    }, v = (l) => {
      o.timestamp = l, o.startTimestamp || (o.startTimestamp = l);
      let c = l - o.startTimestamp;
      o.remaining = o.currentDuration - c, a ? (o.currentAmount = o.currentStartAmount + (t.endAmount - o.currentStartAmount) * (c / o.currentDuration), o.currentAmount = o.currentAmount > t.endAmount ? t.endAmount : o.currentAmount) : (o.currentAmount = o.currentStartAmount - (o.currentStartAmount - t.endAmount) * (c / o.currentDuration), o.currentAmount = o.currentAmount < t.endAmount ? t.endAmount : o.currentAmount), c < o.currentDuration ? o.animationFrame = window.requestAnimationFrame(v) : n("finished");
    };
    return (l, c) => (openBlock(), createElementBlock("span", null, toDisplayString(unref(m)), 1));
  }
}), UCounter = withInstall(_sfc_main), components = [
  UComment,
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
  A as ElAvatar,
  M as ElButton,
  L as ElCarousel,
  T as ElDialog,
  D as ElImage,
  U as ElInput,
  H as ElPagination,
  O as ElPopover,
  R as ElScrollbar,
  P as ElTag,
  InjectionCommentFun,
  InjectionContentBox,
  InjectionEmojiApi,
  InjectionReply,
  UAnchor,
  UChat,
  UComment,
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
  removeGlobalNode,
  revDeepTree,
  storage,
  str,
  throttle,
  useBrowser,
  useEmojiParse,
  useLevel,
  withInstall
};
