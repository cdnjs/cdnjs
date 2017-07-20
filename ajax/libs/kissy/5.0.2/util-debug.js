/*
Copyright 2014, modulex-util@1.1.4
MIT Licensed
build time: Mon, 01 Dec 2014 04:23:46 GMT
*/
modulex.add("util", [], function(require, exports, module) {

/*
combined modules:
util
util/array
util/base
util/escape
util/function
util/object
util/string
util/type
util/json
util/web
*/
var utilBase, utilEscape, utilFunction, utilObject, utilString, utilType, utilJson, utilWeb, utilArray, _util_;
utilBase = function (exports) {
  var guid = 0, EMPTY = '';
  /**
   * utilities.
   * Provides Dom helper methods.
   * @class util
   * @singleton
   */
  exports = {
    version: '1.1.4',
    _debug: '@DEBUG@',
    mix: function (to, from) {
      for (var i in from) {
        to[i] = from[i];
      }
      return to;
    },
    guid: function (pre) {
      return (pre || EMPTY) + guid++;
    }
  };
  return exports;
}();
utilEscape = function (exports) {
  var util = utilBase;
  var EMPTY = '', htmlEntities = {
      '&amp;': '&',
      '&gt;': '>',
      '&lt;': '<',
      '&#x60;': '`',
      '&#x2F;': '/',
      '&quot;': '"',
      '&#x27;': '\''
    }, reverseEntities = {}, escapeHtmlReg, unEscapeHtmlReg, possibleEscapeHtmlReg = /[&<>"'`]/, escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
  (function () {
    for (var k in htmlEntities) {
      reverseEntities[htmlEntities[k]] = k;
    }
  }());
  escapeHtmlReg = getEscapeReg();
  unEscapeHtmlReg = getUnEscapeReg();
  function getEscapeReg() {
    var str = EMPTY;
    for (var e in htmlEntities) {
      var entity = htmlEntities[e];
      str += entity + '|';
    }
    str = str.slice(0, -1);
    escapeHtmlReg = new RegExp(str, 'g');
    return escapeHtmlReg;
  }
  function getUnEscapeReg() {
    var str = EMPTY;
    for (var e in reverseEntities) {
      var entity = reverseEntities[e];
      str += entity + '|';
    }
    str += '&#(\\d{1,5});';
    unEscapeHtmlReg = new RegExp(str, 'g');
    return unEscapeHtmlReg;
  }
  util.mix(util, {
    escapeHtml: function (str) {
      if (!str && str !== 0) {
        return '';
      }
      str = '' + str;
      if (!possibleEscapeHtmlReg.test(str)) {
        return str;
      }
      return (str + '').replace(escapeHtmlReg, function (m) {
        return reverseEntities[m];
      });
    },
    escapeRegExp: function (str) {
      return str.replace(escapeRegExp, '\\$&');
    },
    unEscapeHtml: function (str) {
      return str.replace(unEscapeHtmlReg, function (m, n) {
        return htmlEntities[m] || String.fromCharCode(+n);
      });
    }
  });
  util.escapeHTML = util.escapeHtml;
  util.unEscapeHTML = util.unEscapeHtml;
  return exports;
}();
utilFunction = function (exports) {
  var util = utilBase;
  function bindFn(r, fn, obj) {
    function FNOP() {
    }
    var slice = [].slice, args = slice.call(arguments, 3), bound = function () {
        var inArgs = slice.call(arguments);
        return fn.apply(this instanceof FNOP ? this : obj || this, r ? inArgs.concat(args) : args.concat(inArgs));
      };
    FNOP.prototype = fn.prototype;
    bound.prototype = new FNOP();
    return bound;
  }
  util.mix(util, {
    noop: function () {
    },
    bind: bindFn(0, bindFn, null, 0),
    rbind: bindFn(0, bindFn, null, 1),
    later: function (fn, when, periodic, context, data) {
      when = when || 0;
      var m = fn, d = util.makeArray(data), f, r;
      if (typeof fn === 'string') {
        m = context[fn];
      }
      f = function () {
        m.apply(context, d);
      };
      r = periodic ? setInterval(f, when) : setTimeout(f, when);
      return {
        id: r,
        interval: periodic,
        cancel: function () {
          if (this.interval) {
            clearInterval(r);
          } else {
            clearTimeout(r);
          }
        }
      };
    },
    throttle: function (fn, ms, context) {
      ms = ms || 150;
      if (ms === -1) {
        return function () {
          fn.apply(context || this, arguments);
        };
      }
      var last = util.now();
      return function () {
        var now = util.now();
        if (now - last > ms) {
          last = now;
          fn.apply(context || this, arguments);
        }
      };
    },
    buffer: function (fn, ms, context) {
      ms = ms || 150;
      if (ms === -1) {
        return function () {
          fn.apply(context || this, arguments);
        };
      }
      var bufferTimer = null;
      function f() {
        f.stop();
        bufferTimer = util.later(fn, ms, 0, context || this, arguments);
      }
      f.stop = function () {
        if (bufferTimer) {
          bufferTimer.cancel();
          bufferTimer = 0;
        }
      };
      return f;
    }
  });
  return exports;
}();
utilObject = function (exports) {
  var util = utilBase;
  var undef;
  var MIX_CIRCULAR_DETECTION = '__MIX_CIRCULAR';
  var STAMP_MARKER = '__~ks_stamped';
  var host = typeof window === 'undefined' ? global : window;
  var CLONE_MARKER = '__~ks_cloned';
  var toString = {}.toString;
  var COMPARE_MARKER = '__~ks_compared';
  var Obj = Object;
  var objectCreate = Obj.create;
  var hasEnumBug = !{ toString: 1 }.propertyIsEnumerable('toString');
  var enumProperties = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toString',
    'toLocaleString',
    'valueOf'
  ];
  function hasKey(obj, keyName) {
    return obj !== null && obj !== undef && obj[keyName] !== undef;
  }
  function cleanAndReturn(a, b, ret) {
    delete a[COMPARE_MARKER];
    delete b[COMPARE_MARKER];
    return ret;
  }
  function compareObjects(a, b) {
    if (a[COMPARE_MARKER] === b && b[COMPARE_MARKER] === a) {
      return true;
    }
    a[COMPARE_MARKER] = b;
    b[COMPARE_MARKER] = a;
    for (var property in b) {
      if (!hasKey(a, property) && hasKey(b, property)) {
        return cleanAndReturn(a, b, false);
      }
    }
    for (property in a) {
      if (!hasKey(b, property) && hasKey(a, property)) {
        return cleanAndReturn(a, b, false);
      }
    }
    for (property in b) {
      if (property === COMPARE_MARKER) {
        continue;
      }
      if (!util.equals(a[property], b[property])) {
        return cleanAndReturn(a, b, false);
      }
    }
    if (util.isArray(a) && util.isArray(b) && a.length !== b.length) {
      return cleanAndReturn(a, b, false);
    }
    return cleanAndReturn(a, b, true);
  }
  mix(util, {
    equals: function (a, b) {
      if (a === b) {
        return true;
      }
      if (a === undef || a === null || b === undef || b === null) {
        return a == null && b == null;
      }
      if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      }
      if (typeof a === 'string' && typeof b === 'string') {
        return a === b;
      }
      if (typeof a === 'number' && typeof b === 'number') {
        return a === b;
      }
      if (typeof a === 'object' && typeof b === 'object') {
        return compareObjects(a, b);
      }
      return a === b;
    },
    keys: Object.keys || function (o) {
      var result = [], p, i;
      for (p in o) {
        if (o.hasOwnProperty(p)) {
          result.push(p);
        }
      }
      if (hasEnumBug) {
        for (i = enumProperties.length - 1; i >= 0; i--) {
          p = enumProperties[i];
          if (o.hasOwnProperty(p)) {
            result.push(p);
          }
        }
      }
      return result;
    },
    each: function (object, fn, context) {
      if (object) {
        var key, val, keys, i = 0, length = object && object.length, isObj = length === undef || toString.call(object) === '[object Function]';
        context = context || null;
        if (isObj) {
          keys = util.keys(object);
          for (; i < keys.length; i++) {
            key = keys[i];
            if (fn.call(context, object[key], key, object) === false) {
              break;
            }
          }
        } else {
          for (val = object[0]; i < length; val = object[++i]) {
            if (fn.call(context, val, i, object) === false) {
              break;
            }
          }
        }
      }
      return object;
    },
    now: Date.now || function () {
      return +new Date();
    },
    isEmptyObject: function (o) {
      for (var p in o) {
        if (p !== undef) {
          return false;
        }
      }
      return true;
    },
    stamp: function (o, readOnly, marker) {
      marker = marker || STAMP_MARKER;
      var guid = o[marker];
      if (guid) {
        return guid;
      } else if (!readOnly) {
        try {
          guid = o[marker] = util.guid(marker);
        } catch (e) {
          guid = undef;
        }
      }
      return guid;
    },
    mix: function (r, s, ov, wl, deep) {
      var structured;
      if (typeof ov === 'object') {
        wl = ov.whitelist;
        deep = ov.deep;
        structured = ov.structured;
        ov = ov.overwrite;
      }
      if (wl && typeof wl !== 'function') {
        var originalWl = wl;
        wl = function (name, val) {
          return util.inArray(name, originalWl) ? val : undef;
        };
      }
      if (ov === undef) {
        ov = true;
      }
      if (structured === undef) {
        structured = true;
      }
      var cache = [];
      var i = 0;
      var c;
      mixInternal(r, s, ov, wl, deep, cache, structured);
      while (c = cache[i++]) {
        delete c[MIX_CIRCULAR_DETECTION];
      }
      return r;
    },
    merge: function (varArgs) {
      varArgs = util.makeArray(arguments);
      var o = {}, i, l = varArgs.length;
      for (i = 0; i < l; i++) {
        util.mix(o, varArgs[i]);
      }
      return o;
    },
    augment: function (r, varArgs) {
      var args = util.makeArray(arguments), len = args.length - 2, i = 1, proto, arg, ov = args[len], wl = args[len + 1];
      args[1] = varArgs;
      if (!util.isArray(wl)) {
        ov = wl;
        wl = undef;
        len++;
      }
      if (typeof ov !== 'boolean') {
        ov = undef;
        len++;
      }
      for (; i < len; i++) {
        arg = args[i];
        if (proto = arg.prototype) {
          arg = util.mix({}, proto, true, removeConstructor);
        }
        util.mix(r.prototype, arg, ov, wl);
      }
      return r;
    },
    extend: function (r, s, px, sx) {
      var sp = s.prototype, rp;
      sp.constructor = s;
      rp = createObject(sp, r);
      r.prototype = util.mix(rp, r.prototype);
      r.superclass = sp;
      if (px) {
        util.mix(rp, px);
      }
      if (sx) {
        util.mix(r, sx);
      }
      return r;
    },
    namespace: function (name, holder) {
      var o, j, p;
      p = name.split('.');
      o = holder || host;
      for (j = 0; j < p.length; ++j) {
        o = o[p[j]] = o[p[j]] || {};
      }
      return o;
    },
    clone: function (input, filter) {
      var structured;
      if (typeof filter === 'object') {
        structured = filter.structured;
        filter = filter.filter;
      }
      if (structured === undef) {
        structured = true;
      }
      var memory;
      if (structured) {
        memory = {};
      }
      var ret = cloneInternal(input, filter, memory, structured);
      if (structured) {
        util.each(memory, function (v) {
          v = v.input;
          if (v[CLONE_MARKER]) {
            try {
              delete v[CLONE_MARKER];
            } catch (e) {
              v[CLONE_MARKER] = undef;
            }
          }
        });
      }
      memory = null;
      return ret;
    }
  });
  function Empty() {
  }
  function createObject(proto, constructor) {
    var newProto;
    if (objectCreate) {
      newProto = objectCreate(proto);
    } else {
      Empty.prototype = proto;
      newProto = new Empty();
    }
    newProto.constructor = constructor;
    return newProto;
  }
  function mix(r, s) {
    for (var i in s) {
      r[i] = s[i];
    }
  }
  function mixInternal(r, s, ov, wl, deep, cache, structured) {
    if (!s || !r) {
      return r;
    }
    var i, p, keys, len;
    s[MIX_CIRCULAR_DETECTION] = r;
    cache.push(s);
    keys = util.keys(s);
    len = keys.length;
    for (i = 0; i < len; i++) {
      p = keys[i];
      if (p !== MIX_CIRCULAR_DETECTION) {
        _mix(p, r, s, ov, wl, deep, cache, structured);
      }
    }
    return r;
  }
  function removeConstructor(k, v) {
    return k === 'constructor' ? undef : v;
  }
  function _mix(p, r, s, ov, wl, deep, cache, structured) {
    if (ov || !(p in r) || deep) {
      var target = r[p], src = s[p];
      if (target === src) {
        if (target === undef) {
          r[p] = target;
        }
        return;
      }
      if (wl) {
        src = wl.call(s, p, src);
      }
      if (deep && src && (util.isArray(src) || util.isPlainObject(src))) {
        if (structured && src[MIX_CIRCULAR_DETECTION]) {
          r[p] = src[MIX_CIRCULAR_DETECTION];
        } else {
          var clone = target && (util.isArray(target) || util.isPlainObject(target)) ? target : util.isArray(src) ? [] : {};
          r[p] = clone;
          mixInternal(clone, src, ov, wl, true, cache, structured);
        }
      } else if (src !== undef && (ov || !(p in r))) {
        r[p] = src;
      }
    }
  }
  function cloneInternal(input, f, memory, structured) {
    var destination = input;
    var isArray, isPlainObject, k, stamp;
    if (!input) {
      return destination;
    }
    if (structured && input[CLONE_MARKER]) {
      return memory[input[CLONE_MARKER]].destination;
    } else if (typeof input === 'object') {
      var Constructor = input.constructor;
      if (util.inArray(Constructor, [
          Boolean,
          String,
          Number,
          Date,
          RegExp
        ])) {
        destination = new Constructor(input.valueOf());
      } else if (isArray = util.isArray(input)) {
        destination = f ? util.filter(input, f) : input.concat();
      } else if (isPlainObject = util.isPlainObject(input)) {
        destination = {};
      }
      if (structured) {
        input[CLONE_MARKER] = stamp = util.guid('c');
        memory[stamp] = {
          destination: destination,
          input: input
        };
      }
    }
    if (isArray) {
      for (var i = 0; i < destination.length; i++) {
        destination[i] = cloneInternal(destination[i], f, memory, structured);
      }
    } else if (isPlainObject) {
      for (k in input) {
        if (k !== CLONE_MARKER && (!f || f.call(input, input[k], k, input) !== false)) {
          destination[k] = cloneInternal(input[k], f, memory, structured);
        }
      }
    }
    return destination;
  }
  return exports;
}();
utilString = function (exports) {
  var util = utilBase;
  var undef;
  var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g, EMPTY = '';
  var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g, trim = String.prototype.trim;
  var RE_DASH = /-([a-z])/gi;
  function upperCase() {
    return arguments[1].toUpperCase();
  }
  util.mix(util, {
    startsWith: function (str, prefix) {
      return str.lastIndexOf(prefix, 0) === 0;
    },
    endsWith: function (str, suffix) {
      var ind = str.length - suffix.length;
      return ind >= 0 && str.indexOf(suffix, ind) === ind;
    },
    trim: trim ? function (str) {
      return str == null ? EMPTY : trim.call(str);
    } : function (str) {
      return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY);
    },
    urlEncode: function (s) {
      return encodeURIComponent(String(s));
    },
    urlDecode: function (s) {
      return decodeURIComponent(s.replace(/\+/g, ' '));
    },
    camelCase: function (name) {
      if (name.indexOf('-') === -1) {
        return name;
      }
      return name.replace(RE_DASH, upperCase);
    },
    substitute: function (str, o, regexp) {
      if (typeof str !== 'string' || !o) {
        return str;
      }
      return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
        if (match.charAt(0) === '\\') {
          return match.slice(1);
        }
        return o[name] === undef ? EMPTY : o[name];
      });
    },
    ucfirst: function (s) {
      s += '';
      return s.charAt(0).toUpperCase() + s.substring(1);
    }
  });
  return exports;
}();
utilType = function (exports) {
  var util = utilBase;
  var class2type = {}, FALSE = false, undef, noop = util.noop, OP = Object.prototype, toString = OP.toString;
  function hasOwnProperty(o, p) {
    return OP.hasOwnProperty.call(o, p);
  }
  util.mix(util, {
    type: function (o) {
      return o == null ? String(o) : class2type[toString.call(o)] || 'object';
    },
    isPlainObject: function (obj) {
      if (!obj || util.type(obj) !== 'object' || obj.nodeType || obj.window == obj) {
        return FALSE;
      }
      var key, objConstructor;
      try {
        if ((objConstructor = obj.constructor) && !hasOwnProperty(obj, 'constructor') && !hasOwnProperty(objConstructor.prototype, 'isPrototypeOf')) {
          return FALSE;
        }
      } catch (e) {
        return FALSE;
      }
      for (key in obj) {
      }
      return key === undef || hasOwnProperty(obj, key);
    }
  });
  if ('@DEBUG@') {
    util.mix(util, {
      isBoolean: noop,
      isNumber: noop,
      isString: noop,
      isFunction: noop,
      isArray: noop,
      isDate: noop,
      isRegExp: noop,
      isObject: noop
    });
  }
  var types = 'Boolean Number String Function Date RegExp Object Array'.split(' ');
  for (var i = 0; i < types.length; i++) {
    (function (name, lc) {
      class2type['[object ' + name + ']'] = lc = name.toLowerCase();
      util['is' + name] = function (o) {
        return util.type(o) === lc;
      };
    }(types[i], i));
  }
  util.isArray = Array.isArray || util.isArray;
  return exports;
}();
utilJson = function (exports) {
  var util = utilBase;
  var INVALID_CHARS_REG = /^[\],:{}\s]*$/, INVALID_BRACES_REG = /(?:^|:|,)(?:\s*\[)+/g, INVALID_ESCAPES_REG = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, INVALID_TOKENS_REG = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
  util.parseJson = function (data) {
    if (data === null) {
      return data;
    }
    if (typeof data === 'string') {
      data = util.trim(data);
      if (data) {
        if (INVALID_CHARS_REG.test(data.replace(INVALID_ESCAPES_REG, '@').replace(INVALID_TOKENS_REG, ']').replace(INVALID_BRACES_REG, ''))) {
          return new Function('return ' + data)();
        }
      }
    }
    throw new Error('Invalid Json: ' + data);
  };
  return exports;
}();
utilWeb = function (exports) {
  var util = utilBase;
  var win = typeof window !== 'undefined' ? window : {}, doc = win.document || {}, docElem = doc.documentElement, EMPTY = '', domReady = 0, callbacks = [], POLL_RETIRES = 500, POLL_INTERVAL = 40, RE_ID_STR = /^#?([\w-]+)$/, RE_NOT_WHITESPACE = /\S/, standardEventModel = doc.addEventListener, supportEvent = doc.attachEvent || standardEventModel, DOM_READY_EVENT = 'DOMContentLoaded', READY_STATE_CHANGE_EVENT = 'readystatechange', LOAD_EVENT = 'load', COMPLETE = 'complete', addEventListener = standardEventModel ? function (el, type, fn) {
      el.addEventListener(type, fn, false);
    } : function (el, type, fn) {
      el.attachEvent('on' + type, fn);
    }, removeEventListener = standardEventModel ? function (el, type, fn) {
      el.removeEventListener(type, fn, false);
    } : function (el, type, fn) {
      el.detachEvent('on' + type, fn);
    };
  util.mix(util, {
    isWindow: function (obj) {
      return obj != null && obj == obj.window;
    },
    parseXml: function (data) {
      if (data.documentElement) {
        return data;
      }
      var xml;
      if (win.DOMParser) {
        xml = new DOMParser().parseFromString(data, 'text/xml');
      } else {
        xml = new ActiveXObject('Microsoft.XMLDOM');
        xml.async = false;
        xml.loadXML(data);
      }
      if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
        throw new Error('Invalid XML: ' + data);
      }
      return xml;
    },
    globalEval: function (data) {
      if (data && RE_NOT_WHITESPACE.test(data)) {
        if (win.execScript) {
          win.execScript(data);
        } else {
          (function (data) {
            win['eval'].call(win, data);
          }(data));
        }
      }
    },
    ready: function (fn) {
      if (domReady) {
        if ('@DEBUG@') {
          fn();
        } else {
          try {
            fn();
          } catch (e) {
            setTimeout(function () {
              throw e;
            }, 0);
          }
        }
      } else {
        callbacks.push(fn);
      }
      return this;
    },
    available: function (id, fn) {
      id = (id + EMPTY).match(RE_ID_STR)[1];
      var retryCount = 1;
      var timer = util.later(function () {
        if (++retryCount > POLL_RETIRES) {
          timer.cancel();
          return;
        }
        var node = doc.getElementById(id);
        if (node) {
          fn(node);
          timer.cancel();
        }
      }, POLL_INTERVAL, true);
    }
  });
  util.parseXML = util.parseXml;
  function fireReady() {
    if (domReady) {
      return;
    }
    if (win && win.setTimeout) {
      removeEventListener(win, LOAD_EVENT, fireReady);
    }
    domReady = 1;
    for (var i = 0; i < callbacks.length; i++) {
      if ('@DEBUG@') {
        callbacks[i]();
      } else {
        try {
          callbacks[i]();
        } catch (e) {
          setTimeout(function () {
            throw e;
          }, 0);
        }
      }
    }
  }
  function bindReady() {
    if (!doc || doc.readyState === COMPLETE) {
      fireReady();
      return;
    }
    addEventListener(win, LOAD_EVENT, fireReady);
    if (standardEventModel) {
      var domReady = function () {
        removeEventListener(doc, DOM_READY_EVENT, domReady);
        fireReady();
      };
      addEventListener(doc, DOM_READY_EVENT, domReady);
    } else {
      var stateChange = function () {
        if (doc.readyState === COMPLETE) {
          removeEventListener(doc, READY_STATE_CHANGE_EVENT, stateChange);
          fireReady();
        }
      };
      addEventListener(doc, READY_STATE_CHANGE_EVENT, stateChange);
      var notframe, doScroll = docElem && docElem.doScroll;
      try {
        notframe = win.frameElement === null;
      } catch (e) {
        notframe = false;
      }
      if (doScroll && notframe) {
        var readyScroll = function () {
          try {
            doScroll('left');
            fireReady();
          } catch (ex) {
            setTimeout(readyScroll, POLL_INTERVAL);
          }
        };
        readyScroll();
      }
    }
  }
  if (supportEvent) {
    bindReady();
  }
  try {
    if (doc.execCommand) {
      doc.execCommand('BackgroundImageCache', false, true);
    }
  } catch (e) {
  }
  return exports;
}();
utilArray = function (exports) {
  var TRUE = true, undef, AP = Array.prototype, indexOf = AP.indexOf, lastIndexOf = AP.lastIndexOf, filter = AP.filter, every = AP.every, some = AP.some, util = utilBase, map = AP.map, FALSE = false;
  util.mix(util, {
    indexOf: indexOf ? function (item, arr, fromIndex) {
      return fromIndex === undef ? indexOf.call(arr, item) : indexOf.call(arr, item, fromIndex);
    } : function (item, arr, fromIndex) {
      for (var i = fromIndex || 0, len = arr.length; i < len; ++i) {
        if (arr[i] === item) {
          return i;
        }
      }
      return -1;
    },
    lastIndexOf: lastIndexOf ? function (item, arr, fromIndex) {
      return fromIndex === undef ? lastIndexOf.call(arr, item) : lastIndexOf.call(arr, item, fromIndex);
    } : function (item, arr, fromIndex) {
      if (fromIndex === undef) {
        fromIndex = arr.length - 1;
      }
      for (var i = fromIndex; i >= 0; i--) {
        if (arr[i] === item) {
          break;
        }
      }
      return i;
    },
    unique: function (a, override) {
      var b = a.slice();
      if (override) {
        b.reverse();
      }
      var i = 0, n, item;
      while (i < b.length) {
        item = b[i];
        while ((n = util.lastIndexOf(item, b)) !== i) {
          b.splice(n, 1);
        }
        i += 1;
      }
      if (override) {
        b.reverse();
      }
      return b;
    },
    inArray: function (item, arr) {
      return util.indexOf(item, arr) > -1;
    },
    filter: filter ? function (arr, fn, context) {
      return filter.call(arr, fn, context || this);
    } : function (arr, fn, context) {
      var ret = [];
      util.each(arr, function (item, i, arr) {
        if (fn.call(context || this, item, i, arr)) {
          ret.push(item);
        }
      });
      return ret;
    },
    map: map ? function (arr, fn, context) {
      return map.call(arr, fn, context || this);
    } : function (arr, fn, context) {
      var len = arr.length, res = new Array(len);
      for (var i = 0; i < len; i++) {
        var el = typeof arr === 'string' ? arr.charAt(i) : arr[i];
        if (el || i in arr) {
          res[i] = fn.call(context || this, el, i, arr);
        }
      }
      return res;
    },
    reduce: function (arr, callback, initialValue) {
      var len = arr.length;
      if (typeof callback !== 'function') {
        throw new TypeError('callback is not function!');
      }
      if (len === 0 && arguments.length === 2) {
        throw new TypeError('arguments invalid');
      }
      var k = 0;
      var accumulator;
      if (arguments.length >= 3) {
        accumulator = initialValue;
      } else {
        do {
          if (k in arr) {
            accumulator = arr[k++];
            break;
          }
          k += 1;
          if (k >= len) {
            throw new TypeError();
          }
        } while (TRUE);
      }
      while (k < len) {
        if (k in arr) {
          accumulator = callback.call(undef, accumulator, arr[k], k, arr);
        }
        k++;
      }
      return accumulator;
    },
    every: every ? function (arr, fn, context) {
      return every.call(arr, fn, context || this);
    } : function (arr, fn, context) {
      var len = arr && arr.length || 0;
      for (var i = 0; i < len; i++) {
        if (i in arr && !fn.call(context, arr[i], i, arr)) {
          return FALSE;
        }
      }
      return TRUE;
    },
    some: some ? function (arr, fn, context) {
      return some.call(arr, fn, context || this);
    } : function (arr, fn, context) {
      var len = arr && arr.length || 0;
      for (var i = 0; i < len; i++) {
        if (i in arr && fn.call(context, arr[i], i, arr)) {
          return TRUE;
        }
      }
      return FALSE;
    },
    makeArray: function (o) {
      if (o == null) {
        return [];
      }
      if (util.isArray(o)) {
        return o;
      }
      var lengthType = typeof o.length, oType = typeof o;
      if (lengthType !== 'number' || typeof o.nodeName === 'string' || o != null && o == o.window || oType === 'string' || oType === 'function' && !('item' in o && lengthType === 'number')) {
        return [o];
      }
      var ret = [];
      for (var i = 0, l = o.length; i < l; i++) {
        ret[i] = o[i];
      }
      return ret;
    }
  });
  return exports;
}();
_util_ = function (exports) {
  utilArray;
  utilEscape;
  utilFunction;
  utilObject;
  utilString;
  utilType;
  utilJson;
  utilWeb;
  exports = utilBase;
  module.exports.version = '1.1.4';
  return exports;
}();
module.exports = _util_;
});