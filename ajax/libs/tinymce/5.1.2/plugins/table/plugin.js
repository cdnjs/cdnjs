/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.1.2 (2019-11-19)
 */
(function (domGlobals) {
    'use strict';

    var Cell = function (initial) {
      var value = initial;
      var get = function () {
        return value;
      };
      var set = function (v) {
        value = v;
      };
      var clone = function () {
        return Cell(get());
      };
      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    var noop = function () {
    };
    var compose = function (fa, fb) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return fa(fb.apply(null, args));
      };
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    function curry(fn) {
      var initialArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        initialArgs[_i - 1] = arguments[_i];
      }
      return function () {
        var restArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          restArgs[_i] = arguments[_i];
        }
        var all = initialArgs.concat(restArgs);
        return fn.apply(null, all);
      };
    }
    var not = function (f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return !f.apply(null, args);
      };
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: constant(null),
        getOrUndefined: constant(undefined),
        or: id,
        orThunk: call,
        map: none,
        each: noop,
        bind: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze) {
        Object.freeze(me);
      }
      return me;
    }();
    var some = function (a) {
      var constant_a = constant(a);
      var self = function () {
        return me;
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: function (f) {
          return some(f(a));
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never, function (b) {
            return elementEq(a, b);
          });
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var typeOf = function (x) {
      if (x === null) {
        return 'null';
      }
      var t = typeof x;
      if (t === 'object' && (Array.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'Array')) {
        return 'array';
      }
      if (t === 'object' && (String.prototype.isPrototypeOf(x) || x.constructor && x.constructor.name === 'String')) {
        return 'string';
      }
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isArray = isType('array');
    var isBoolean = isType('boolean');
    var isFunction = isType('function');
    var isNumber = isType('number');

    var nativeSlice = Array.prototype.slice;
    var nativeIndexOf = Array.prototype.indexOf;
    var nativePush = Array.prototype.push;
    var rawIndexOf = function (ts, t) {
      return nativeIndexOf.call(ts, t);
    };
    var contains = function (xs, x) {
      return rawIndexOf(xs, x) > -1;
    };
    var exists = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return true;
        }
      }
      return false;
    };
    var map = function (xs, f) {
      var len = xs.length;
      var r = new Array(len);
      for (var i = 0; i < len; i++) {
        var x = xs[i];
        r[i] = f(x, i);
      }
      return r;
    };
    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i);
      }
    };
    var eachr = function (xs, f) {
      for (var i = xs.length - 1; i >= 0; i--) {
        var x = xs[i];
        f(x, i);
      }
    };
    var filter = function (xs, pred) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          r.push(x);
        }
      }
      return r;
    };
    var foldr = function (xs, f, acc) {
      eachr(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var foldl = function (xs, f, acc) {
      each(xs, function (x) {
        acc = f(acc, x);
      });
      return acc;
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var findIndex = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i)) {
          return Option.some(i);
        }
      }
      return Option.none();
    };
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!isArray(xs[i])) {
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        }
        nativePush.apply(r, xs[i]);
      }
      return r;
    };
    var bind = function (xs, f) {
      var output = map(xs, f);
      return flatten(output);
    };
    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i) !== true) {
          return false;
        }
      }
      return true;
    };
    var reverse = function (xs) {
      var r = nativeSlice.call(xs, 0);
      r.reverse();
      return r;
    };
    var last = function (xs) {
      return xs.length === 0 ? Option.none() : Option.some(xs[xs.length - 1]);
    };
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return nativeSlice.call(x);
    };

    var keys = Object.keys;
    var hasOwnProperty = Object.hasOwnProperty;
    var each$1 = function (obj, f) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        f(x, i);
      }
    };
    var map$1 = function (obj, f) {
      return tupleMap(obj, function (x, i) {
        return {
          k: i,
          v: f(x, i)
        };
      });
    };
    var tupleMap = function (obj, f) {
      var r = {};
      each$1(obj, function (x, i) {
        var tuple = f(x, i);
        r[tuple.k] = tuple.v;
      });
      return r;
    };
    var get = function (obj, key) {
      return has(obj, key) ? Option.from(obj[key]) : Option.none();
    };
    var has = function (obj, key) {
      return hasOwnProperty.call(obj, key);
    };

    var Immutable = function () {
      var fields = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
      }
      return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        if (fields.length !== values.length) {
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
        }
        var struct = {};
        each(fields, function (name, i) {
          struct[name] = constant(values[i]);
        });
        return struct;
      };
    };

    var sort = function (arr) {
      return arr.slice(0).sort();
    };
    var reqMessage = function (required, keys) {
      throw new Error('All required keys (' + sort(required).join(', ') + ') were not specified. Specified keys were: ' + sort(keys).join(', ') + '.');
    };
    var unsuppMessage = function (unsupported) {
      throw new Error('Unsupported keys for object: ' + sort(unsupported).join(', '));
    };
    var validateStrArr = function (label, array) {
      if (!isArray(array)) {
        throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
      }
      each(array, function (a) {
        if (!isString(a)) {
          throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
        }
      });
    };
    var invalidTypeMessage = function (incorrect, type) {
      throw new Error('All values need to be of type: ' + type + '. Keys (' + sort(incorrect).join(', ') + ') were not.');
    };
    var checkDupes = function (everything) {
      var sorted = sort(everything);
      var dupe = find(sorted, function (s, i) {
        return i < sorted.length - 1 && s === sorted[i + 1];
      });
      dupe.each(function (d) {
        throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
      });
    };

    var MixedBag = function (required, optional) {
      var everything = required.concat(optional);
      if (everything.length === 0) {
        throw new Error('You must specify at least one required or optional field.');
      }
      validateStrArr('required', required);
      validateStrArr('optional', optional);
      checkDupes(everything);
      return function (obj) {
        var keys$1 = keys(obj);
        var allReqd = forall(required, function (req) {
          return contains(keys$1, req);
        });
        if (!allReqd) {
          reqMessage(required, keys$1);
        }
        var unsupported = filter(keys$1, function (key) {
          return !contains(everything, key);
        });
        if (unsupported.length > 0) {
          unsuppMessage(unsupported);
        }
        var r = {};
        each(required, function (req) {
          r[req] = constant(obj[req]);
        });
        each(optional, function (opt) {
          r[opt] = constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]) : Option.none());
        });
        return r;
      };
    };

    var ATTRIBUTE = domGlobals.Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = domGlobals.Node.CDATA_SECTION_NODE;
    var COMMENT = domGlobals.Node.COMMENT_NODE;
    var DOCUMENT = domGlobals.Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = domGlobals.Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = domGlobals.Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = domGlobals.Node.ELEMENT_NODE;
    var TEXT = domGlobals.Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = domGlobals.Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = domGlobals.Node.ENTITY_REFERENCE_NODE;
    var ENTITY = domGlobals.Node.ENTITY_NODE;
    var NOTATION = domGlobals.Node.NOTATION_NODE;

    var Global = typeof domGlobals.window !== 'undefined' ? domGlobals.window : Function('return this;')();

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };
    var type = function (element) {
      return element.dom().nodeType;
    };
    var isType$1 = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };
    var isComment = function (element) {
      return type(element) === COMMENT || name(element) === '#comment';
    };
    var isElement = isType$1(ELEMENT);
    var isText = isType$1(TEXT);

    var rawSet = function (dom, key, value) {
      if (isString(value) || isBoolean(value) || isNumber(value)) {
        dom.setAttribute(key, value + '');
      } else {
        domGlobals.console.error('Invalid call to Attr.set. Key ', key, ':: Value ', value, ':: Element ', dom);
        throw new Error('Attribute value was not simple');
      }
    };
    var set = function (element, key, value) {
      rawSet(element.dom(), key, value);
    };
    var setAll = function (element, attrs) {
      var dom = element.dom();
      each$1(attrs, function (v, k) {
        rawSet(dom, k, v);
      });
    };
    var get$1 = function (element, key) {
      var v = element.dom().getAttribute(key);
      return v === null ? undefined : v;
    };
    var has$1 = function (element, key) {
      var dom = element.dom();
      return dom && dom.hasAttribute ? dom.hasAttribute(key) : false;
    };
    var remove = function (element, key) {
      element.dom().removeAttribute(key);
    };
    var clone = function (element) {
      return foldl(element.dom().attributes, function (acc, attr) {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
    };

    var checkRange = function (str, substr, start) {
      if (substr === '') {
        return true;
      }
      if (str.length < substr.length) {
        return false;
      }
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };
    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };
    var startsWith = function (str, prefix) {
      return checkRange(str, prefix, 0);
    };
    var endsWith = function (str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };
    var trim = function (str) {
      return str.replace(/^\s+|\s+$/g, '');
    };

    var isSupported = function (dom) {
      return dom.style !== undefined && isFunction(dom.style.getPropertyValue);
    };

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var fromHtml = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        domGlobals.console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || domGlobals.document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var inBody = function (element) {
      var dom = isText(element) ? element.dom().parentNode : element.dom();
      return dom !== undefined && dom !== null && dom.ownerDocument.body.contains(dom);
    };
    var body = cached(function () {
      return getBody(Element.fromDom(domGlobals.document));
    });
    var getBody = function (doc) {
      var b = doc.dom().body;
      if (b === null || b === undefined) {
        throw new Error('Body is not available yet');
      }
      return Element.fromDom(b);
    };

    var internalSet = function (dom, property, value) {
      if (!isString(value)) {
        domGlobals.console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
        throw new Error('CSS value must be a string: ' + value);
      }
      if (isSupported(dom)) {
        dom.style.setProperty(property, value);
      }
    };
    var internalRemove = function (dom, property) {
      if (isSupported(dom)) {
        dom.style.removeProperty(property);
      }
    };
    var set$1 = function (element, property, value) {
      var dom = element.dom();
      internalSet(dom, property, value);
    };
    var setAll$1 = function (element, css) {
      var dom = element.dom();
      each$1(css, function (v, k) {
        internalSet(dom, k, v);
      });
    };
    var get$2 = function (element, property) {
      var dom = element.dom();
      var styles = domGlobals.window.getComputedStyle(dom);
      var r = styles.getPropertyValue(property);
      var v = r === '' && !inBody(element) ? getUnsafeProperty(dom, property) : r;
      return v === null ? undefined : v;
    };
    var getUnsafeProperty = function (dom, property) {
      return isSupported(dom) ? dom.style.getPropertyValue(property) : '';
    };
    var getRaw = function (element, property) {
      var dom = element.dom();
      var raw = getUnsafeProperty(dom, property);
      return Option.from(raw).filter(function (r) {
        return r.length > 0;
      });
    };
    var remove$1 = function (element, property) {
      var dom = element.dom();
      internalRemove(dom, property);
      if (has$1(element, 'style') && trim(get$1(element, 'style')) === '') {
        remove(element, 'style');
      }
    };
    var copy = function (source, target) {
      var sourceDom = source.dom();
      var targetDom = target.dom();
      if (isSupported(sourceDom) && isSupported(targetDom)) {
        targetDom.style.cssText = sourceDom.style.cssText;
      }
    };

    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_PRECEDING);
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, domGlobals.Node.DOCUMENT_POSITION_CONTAINED_BY);
    };
    var Node = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s)) {
          return x;
        }
      }
      return undefined;
    };
    var find$1 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r) {
        return {
          major: 0,
          minor: 0
        };
      }
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0) {
        return unknown();
      }
      return find$1(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu(0, 0);
    };
    var nu = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var isBrowser = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$1 = function () {
      return nu$1({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$1 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$1,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$2 = function () {
      return nu$2({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$2 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isWindows: isOS(windows, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$2,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd)
    };

    var DeviceType = function (os, browser, userAgent, mediaMatch) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isMobile = os.isiOS() || os.isAndroid();
      var isTouch = isMobile || mediaMatch('(pointer:coarse)');
      var isTablet = isiPad || !isiPhone && isMobile && mediaMatch('(min-device-width:768px)');
      var isPhone = isiPhone || isMobile && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      var isDesktop = !isPhone && !isTablet && !iOSwebview;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview),
        isDesktop: constant(isDesktop)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          return contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent, mediaMatch) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent, mediaMatch);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var mediaMatch = function (query) {
      return domGlobals.window.matchMedia(query).matches;
    };
    var platform = Cell(PlatformDetection.detect(domGlobals.navigator.userAgent, mediaMatch));
    var detect$3 = function () {
      return platform.get();
    };

    var ELEMENT$1 = ELEMENT;
    var DOCUMENT$1 = DOCUMENT;
    var is = function (element, selector) {
      var dom = element.dom();
      if (dom.nodeType !== ELEMENT$1) {
        return false;
      } else {
        var elem = dom;
        if (elem.matches !== undefined) {
          return elem.matches(selector);
        } else if (elem.msMatchesSelector !== undefined) {
          return elem.msMatchesSelector(selector);
        } else if (elem.webkitMatchesSelector !== undefined) {
          return elem.webkitMatchesSelector(selector);
        } else if (elem.mozMatchesSelector !== undefined) {
          return elem.mozMatchesSelector(selector);
        } else {
          throw new Error('Browser lacks native selectors');
        }
      }
    };
    var bypassSelector = function (dom) {
      return dom.nodeType !== ELEMENT$1 && dom.nodeType !== DOCUMENT$1 || dom.childElementCount === 0;
    };
    var all = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? [] : map(base.querySelectorAll(selector), Element.fromDom);
    };
    var one = function (selector, scope) {
      var base = scope === undefined ? domGlobals.document : scope.dom();
      return bypassSelector(base) ? Option.none() : Option.from(base.querySelector(selector)).map(Element.fromDom);
    };

    var eq = function (e1, e2) {
      return e1.dom() === e2.dom();
    };
    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return Node.documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var browser = detect$3().browser;
    var contains$2 = browser.isIE() ? ieContains : regularContains;
    var is$1 = is;

    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };
    var defaultView = function (element) {
      return Element.fromDom(element.dom().ownerDocument.defaultView);
    };
    var parent = function (element) {
      return Option.from(element.dom().parentNode).map(Element.fromDom);
    };
    var parents = function (element, isRoot) {
      var stop = isFunction(isRoot) ? isRoot : never;
      var dom = element.dom();
      var ret = [];
      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var p = Element.fromDom(rawParent);
        ret.push(p);
        if (stop(p) === true) {
          break;
        } else {
          dom = rawParent;
        }
      }
      return ret;
    };
    var prevSibling = function (element) {
      return Option.from(element.dom().previousSibling).map(Element.fromDom);
    };
    var nextSibling = function (element) {
      return Option.from(element.dom().nextSibling).map(Element.fromDom);
    };
    var children = function (element) {
      return map(element.dom().childNodes, Element.fromDom);
    };
    var child = function (element, index) {
      var cs = element.dom().childNodes;
      return Option.from(cs[index]).map(Element.fromDom);
    };
    var firstChild = function (element) {
      return child(element, 0);
    };
    var spot = Immutable('element', 'offset');

    var before = function (marker, element) {
      var parent$1 = parent(marker);
      parent$1.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };
    var after = function (marker, element) {
      var sibling = nextSibling(marker);
      sibling.fold(function () {
        var parent$1 = parent(marker);
        parent$1.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };
    var prepend = function (parent, element) {
      var firstChild$1 = firstChild(parent);
      firstChild$1.fold(function () {
        append(parent, element);
      }, function (v) {
        parent.dom().insertBefore(element.dom(), v.dom());
      });
    };
    var append = function (parent, element) {
      parent.dom().appendChild(element.dom());
    };
    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

    var before$1 = function (marker, elements) {
      each(elements, function (x) {
        before(marker, x);
      });
    };
    var after$1 = function (marker, elements) {
      each(elements, function (x, i) {
        var e = i === 0 ? marker : elements[i - 1];
        after(e, x);
      });
    };
    var append$1 = function (parent, elements) {
      each(elements, function (x) {
        append(parent, x);
      });
    };

    var empty = function (element) {
      element.dom().textContent = '';
      each(children(element), function (rogue) {
        remove$2(rogue);
      });
    };
    var remove$2 = function (element) {
      var dom = element.dom();
      if (dom.parentNode !== null) {
        dom.parentNode.removeChild(dom);
      }
    };
    var unwrap = function (wrapper) {
      var children$1 = children(wrapper);
      if (children$1.length > 0) {
        before$1(wrapper, children$1);
      }
      remove$2(wrapper);
    };

    var dimension = Immutable('width', 'height');
    var dimensions = Immutable('width', 'height');
    var grid = Immutable('rows', 'columns');
    var address = Immutable('row', 'column');
    var coords = Immutable('x', 'y');
    var detail = Immutable('element', 'rowspan', 'colspan');
    var detailnew = Immutable('element', 'rowspan', 'colspan', 'isNew');
    var extended = Immutable('element', 'rowspan', 'colspan', 'row', 'column');
    var rowdata = Immutable('element', 'cells', 'section');
    var elementnew = Immutable('element', 'isNew');
    var rowdatanew = Immutable('element', 'cells', 'section', 'isNew');
    var rowcells = Immutable('cells', 'section');
    var rowdetails = Immutable('details', 'section');
    var bounds = Immutable('startRow', 'startCol', 'finishRow', 'finishCol');

    var ancestors = function (scope, predicate, isRoot) {
      return filter(parents(scope, isRoot), predicate);
    };
    var children$1 = function (scope, predicate) {
      return filter(children(scope), predicate);
    };
    var descendants = function (scope, predicate) {
      var result = [];
      each(children(scope), function (x) {
        if (predicate(x)) {
          result = result.concat([x]);
        }
        result = result.concat(descendants(x, predicate));
      });
      return result;
    };

    var ancestors$1 = function (scope, selector, isRoot) {
      return ancestors(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var children$2 = function (scope, selector) {
      return children$1(scope, function (e) {
        return is(e, selector);
      });
    };
    var descendants$1 = function (scope, selector) {
      return all(selector, scope);
    };

    function ClosestOrAncestor (is, ancestor, scope, a, isRoot) {
      return is(scope, a) ? Option.some(scope) : isFunction(isRoot) && isRoot(scope) ? Option.none() : ancestor(scope, a, isRoot);
    }

    var ancestor = function (scope, predicate, isRoot) {
      var element = scope.dom();
      var stop = isFunction(isRoot) ? isRoot : constant(false);
      while (element.parentNode) {
        element = element.parentNode;
        var el = Element.fromDom(element);
        if (predicate(el)) {
          return Option.some(el);
        } else if (stop(el)) {
          break;
        }
      }
      return Option.none();
    };
    var closest = function (scope, predicate, isRoot) {
      var is = function (s, test) {
        return test(s);
      };
      return ClosestOrAncestor(is, ancestor, scope, predicate, isRoot);
    };
    var child$1 = function (scope, predicate) {
      var pred = function (node) {
        return predicate(Element.fromDom(node));
      };
      var result = find(scope.dom().childNodes, pred);
      return result.map(Element.fromDom);
    };
    var descendant = function (scope, predicate) {
      var descend = function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
          var child_1 = Element.fromDom(node.childNodes[i]);
          if (predicate(child_1)) {
            return Option.some(child_1);
          }
          var res = descend(node.childNodes[i]);
          if (res.isSome()) {
            return res;
          }
        }
        return Option.none();
      };
      return descend(scope.dom());
    };

    var ancestor$1 = function (scope, selector, isRoot) {
      return ancestor(scope, function (e) {
        return is(e, selector);
      }, isRoot);
    };
    var child$2 = function (scope, selector) {
      return child$1(scope, function (e) {
        return is(e, selector);
      });
    };
    var descendant$1 = function (scope, selector) {
      return one(selector, scope);
    };
    var closest$1 = function (scope, selector, isRoot) {
      return ClosestOrAncestor(is, ancestor$1, scope, selector, isRoot);
    };

    var firstLayer = function (scope, selector) {
      return filterFirstLayer(scope, selector, constant(true));
    };
    var filterFirstLayer = function (scope, selector, predicate) {
      return bind(children(scope), function (x) {
        return is(x, selector) ? predicate(x) ? [x] : [] : filterFirstLayer(x, selector, predicate);
      });
    };
    var LayerSelector = {
      firstLayer: firstLayer,
      filterFirstLayer: filterFirstLayer
    };

    var lookup = function (tags, element, isRoot) {
      if (isRoot === void 0) {
        isRoot = never;
      }
      if (isRoot(element)) {
        return Option.none();
      }
      if (contains(tags, name(element))) {
        return Option.some(element);
      }
      var isRootOrUpperTable = function (elm) {
        return is(elm, 'table') || isRoot(elm);
      };
      return ancestor$1(element, tags.join(','), isRootOrUpperTable);
    };
    var cell = function (element, isRoot) {
      return lookup([
        'td',
        'th'
      ], element, isRoot);
    };
    var cells = function (ancestor) {
      return LayerSelector.firstLayer(ancestor, 'th,td');
    };
    var notCell = function (element, isRoot) {
      return lookup([
        'caption',
        'tr',
        'tbody',
        'tfoot',
        'thead'
      ], element, isRoot);
    };
    var neighbours = function (selector, element) {
      return parent(element).map(function (parent) {
        return children$2(parent, selector);
      });
    };
    var neighbourCells = curry(neighbours, 'th,td');
    var neighbourRows = curry(neighbours, 'tr');
    var firstCell = function (ancestor) {
      return descendant$1(ancestor, 'th,td');
    };
    var table = function (element, isRoot) {
      return closest$1(element, 'table', isRoot);
    };
    var row = function (element, isRoot) {
      return lookup(['tr'], element, isRoot);
    };
    var rows = function (ancestor) {
      return LayerSelector.firstLayer(ancestor, 'tr');
    };
    var attr = function (element, property) {
      return parseInt(get$1(element, property), 10);
    };
    var grid$1 = function (element, rowProp, colProp) {
      var rowsCount = attr(element, rowProp);
      var cols = attr(element, colProp);
      return grid(rowsCount, cols);
    };
    var TableLookup = {
      cell: cell,
      firstCell: firstCell,
      cells: cells,
      neighbourCells: neighbourCells,
      table: table,
      row: row,
      rows: rows,
      notCell: notCell,
      neighbourRows: neighbourRows,
      attr: attr,
      grid: grid$1
    };

    var fromTable = function (table) {
      var rows = TableLookup.rows(table);
      return map(rows, function (row) {
        var element = row;
        var parent$1 = parent(element);
        var parentSection = parent$1.map(function (p) {
          var parentName = name(p);
          return parentName === 'tfoot' || parentName === 'thead' || parentName === 'tbody' ? parentName : 'tbody';
        }).getOr('tbody');
        var cells = map(TableLookup.cells(row), function (cell) {
          var rowspan = has$1(cell, 'rowspan') ? parseInt(get$1(cell, 'rowspan'), 10) : 1;
          var colspan = has$1(cell, 'colspan') ? parseInt(get$1(cell, 'colspan'), 10) : 1;
          return detail(cell, rowspan, colspan);
        });
        return rowdata(element, cells, parentSection);
      });
    };
    var fromPastedRows = function (rows, example) {
      return map(rows, function (row) {
        var cells = map(TableLookup.cells(row), function (cell) {
          var rowspan = has$1(cell, 'rowspan') ? parseInt(get$1(cell, 'rowspan'), 10) : 1;
          var colspan = has$1(cell, 'colspan') ? parseInt(get$1(cell, 'colspan'), 10) : 1;
          return detail(cell, rowspan, colspan);
        });
        return rowdata(row, cells, example.section());
      });
    };
    var DetailsList = {
      fromTable: fromTable,
      fromPastedRows: fromPastedRows
    };

    var key = function (row, column) {
      return row + ',' + column;
    };
    var getAt = function (warehouse, row, column) {
      var raw = warehouse.access()[key(row, column)];
      return raw !== undefined ? Option.some(raw) : Option.none();
    };
    var findItem = function (warehouse, item, comparator) {
      var filtered = filterItems(warehouse, function (detail) {
        return comparator(item, detail.element());
      });
      return filtered.length > 0 ? Option.some(filtered[0]) : Option.none();
    };
    var filterItems = function (warehouse, predicate) {
      var all = bind(warehouse.all(), function (r) {
        return r.cells();
      });
      return filter(all, predicate);
    };
    var generate = function (list) {
      var access = {};
      var cells = [];
      var maxRows = list.length;
      var maxColumns = 0;
      each(list, function (details, r) {
        var currentRow = [];
        each(details.cells(), function (detail) {
          var start = 0;
          while (access[key(r, start)] !== undefined) {
            start++;
          }
          var current = extended(detail.element(), detail.rowspan(), detail.colspan(), r, start);
          for (var i = 0; i < detail.colspan(); i++) {
            for (var j = 0; j < detail.rowspan(); j++) {
              var cr = r + j;
              var cc = start + i;
              var newpos = key(cr, cc);
              access[newpos] = current;
              maxColumns = Math.max(maxColumns, cc + 1);
            }
          }
          currentRow.push(current);
        });
        cells.push(rowdata(details.element(), currentRow, details.section()));
      });
      var grid$1 = grid(maxRows, maxColumns);
      return {
        grid: constant(grid$1),
        access: constant(access),
        all: constant(cells)
      };
    };
    var justCells = function (warehouse) {
      var rows = map(warehouse.all(), function (w) {
        return w.cells();
      });
      return flatten(rows);
    };
    var Warehouse = {
      generate: generate,
      getAt: getAt,
      findItem: findItem,
      filterItems: filterItems,
      justCells: justCells
    };

    var statsStruct = Immutable('minRow', 'minCol', 'maxRow', 'maxCol');
    var findSelectedStats = function (house, isSelected) {
      var totalColumns = house.grid().columns();
      var totalRows = house.grid().rows();
      var minRow = totalRows;
      var minCol = totalColumns;
      var maxRow = 0;
      var maxCol = 0;
      each$1(house.access(), function (detail) {
        if (isSelected(detail)) {
          var startRow = detail.row();
          var endRow = startRow + detail.rowspan() - 1;
          var startCol = detail.column();
          var endCol = startCol + detail.colspan() - 1;
          if (startRow < minRow) {
            minRow = startRow;
          } else if (endRow > maxRow) {
            maxRow = endRow;
          }
          if (startCol < minCol) {
            minCol = startCol;
          } else if (endCol > maxCol) {
            maxCol = endCol;
          }
        }
      });
      return statsStruct(minRow, minCol, maxRow, maxCol);
    };
    var makeCell = function (list, seenSelected, rowIndex) {
      var row = list[rowIndex].element();
      var td = Element.fromTag('td');
      append(td, Element.fromTag('br'));
      var f = seenSelected ? append : prepend;
      f(row, td);
    };
    var fillInGaps = function (list, house, stats, isSelected) {
      var totalColumns = house.grid().columns();
      var totalRows = house.grid().rows();
      for (var i = 0; i < totalRows; i++) {
        var seenSelected = false;
        for (var j = 0; j < totalColumns; j++) {
          if (!(i < stats.minRow() || i > stats.maxRow() || j < stats.minCol() || j > stats.maxCol())) {
            var needCell = Warehouse.getAt(house, i, j).filter(isSelected).isNone();
            if (needCell) {
              makeCell(list, seenSelected, i);
            } else {
              seenSelected = true;
            }
          }
        }
      }
    };
    var clean = function (table, stats) {
      var emptyRows = filter(LayerSelector.firstLayer(table, 'tr'), function (row) {
        return row.dom().childElementCount === 0;
      });
      each(emptyRows, remove$2);
      if (stats.minCol() === stats.maxCol() || stats.minRow() === stats.maxRow()) {
        each(LayerSelector.firstLayer(table, 'th,td'), function (cell) {
          remove(cell, 'rowspan');
          remove(cell, 'colspan');
        });
      }
      remove(table, 'width');
      remove(table, 'height');
      remove$1(table, 'width');
      remove$1(table, 'height');
    };
    var extract = function (table, selectedSelector) {
      var isSelected = function (detail) {
        return is(detail.element(), selectedSelector);
      };
      var list = DetailsList.fromTable(table);
      var house = Warehouse.generate(list);
      var stats = findSelectedStats(house, isSelected);
      var selector = 'th:not(' + selectedSelector + ')' + ',td:not(' + selectedSelector + ')';
      var unselectedCells = LayerSelector.filterFirstLayer(table, 'th,td', function (cell) {
        return is(cell, selector);
      });
      each(unselectedCells, remove$2);
      fillInGaps(list, house, stats, isSelected);
      clean(table, stats);
      return table;
    };
    var CopySelected = { extract: extract };

    function NodeValue (is, name) {
      var get = function (element) {
        if (!is(element)) {
          throw new Error('Can only get ' + name + ' value of a ' + name + ' node');
        }
        return getOption(element).getOr('');
      };
      var getOption = function (element) {
        return is(element) ? Option.from(element.dom().nodeValue) : Option.none();
      };
      var set = function (element, value) {
        if (!is(element)) {
          throw new Error('Can only set raw ' + name + ' value of a ' + name + ' node');
        }
        element.dom().nodeValue = value;
      };
      return {
        get: get,
        getOption: getOption,
        set: set
      };
    }

    var api = NodeValue(isText, 'text');
    var get$3 = function (element) {
      return api.get(element);
    };
    var getOption = function (element) {
      return api.getOption(element);
    };
    var set$2 = function (element, value) {
      api.set(element, value);
    };

    var getEnd = function (element) {
      return name(element) === 'img' ? 1 : getOption(element).fold(function () {
        return children(element).length;
      }, function (v) {
        return v.length;
      });
    };
    var NBSP = '\xA0';
    var isTextNodeWithCursorPosition = function (el) {
      return getOption(el).filter(function (text) {
        return text.trim().length !== 0 || text.indexOf(NBSP) > -1;
      }).isSome();
    };
    var elementsWithCursorPosition = [
      'img',
      'br'
    ];
    var isCursorPosition = function (elem) {
      var hasCursorPosition = isTextNodeWithCursorPosition(elem);
      return hasCursorPosition || contains(elementsWithCursorPosition, name(elem));
    };

    var first = function (element) {
      return descendant(element, isCursorPosition);
    };
    var last$1 = function (element) {
      return descendantRtl(element, isCursorPosition);
    };
    var descendantRtl = function (scope, predicate) {
      var descend = function (element) {
        var children$1 = children(element);
        for (var i = children$1.length - 1; i >= 0; i--) {
          var child = children$1[i];
          if (predicate(child)) {
            return Option.some(child);
          }
          var res = descend(child);
          if (res.isSome()) {
            return res;
          }
        }
        return Option.none();
      };
      return descend(scope);
    };

    var clone$1 = function (original, isDeep) {
      return Element.fromDom(original.dom().cloneNode(isDeep));
    };
    var shallow = function (original) {
      return clone$1(original, false);
    };
    var deep = function (original) {
      return clone$1(original, true);
    };
    var shallowAs = function (original, tag) {
      var nu = Element.fromTag(tag);
      var attributes = clone(original);
      setAll(nu, attributes);
      return nu;
    };
    var copy$1 = function (original, tag) {
      var nu = shallowAs(original, tag);
      var cloneChildren = children(deep(original));
      append$1(nu, cloneChildren);
      return nu;
    };

    var createCell = function () {
      var td = Element.fromTag('td');
      append(td, Element.fromTag('br'));
      return td;
    };
    var replace = function (cell, tag, attrs) {
      var replica = copy$1(cell, tag);
      each$1(attrs, function (v, k) {
        if (v === null) {
          remove(replica, k);
        } else {
          set(replica, k, v);
        }
      });
      return replica;
    };
    var pasteReplace = function (cell) {
      return cell;
    };
    var newRow = function (doc) {
      return function () {
        return Element.fromTag('tr', doc.dom());
      };
    };
    var cloneFormats = function (oldCell, newCell, formats) {
      var first$1 = first(oldCell);
      return first$1.map(function (firstText) {
        var formatSelector = formats.join(',');
        var parents = ancestors$1(firstText, formatSelector, function (element) {
          return eq(element, oldCell);
        });
        return foldr(parents, function (last, parent) {
          var clonedFormat = shallow(parent);
          remove(clonedFormat, 'contenteditable');
          append(last, clonedFormat);
          return clonedFormat;
        }, newCell);
      }).getOr(newCell);
    };
    var cellOperations = function (mutate, doc, formatsToClone) {
      var newCell = function (prev) {
        var docu = owner(prev.element());
        var td = Element.fromTag(name(prev.element()), docu.dom());
        var formats = formatsToClone.getOr([
          'strong',
          'em',
          'b',
          'i',
          'span',
          'font',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'p',
          'div'
        ]);
        var lastNode = formats.length > 0 ? cloneFormats(prev.element(), td, formats) : td;
        append(lastNode, Element.fromTag('br'));
        copy(prev.element(), td);
        remove$1(td, 'height');
        if (prev.colspan() !== 1) {
          remove$1(prev.element(), 'width');
        }
        mutate(prev.element(), td);
        return td;
      };
      return {
        row: newRow(doc),
        cell: newCell,
        replace: replace,
        gap: createCell
      };
    };
    var paste = function (doc) {
      return {
        row: newRow(doc),
        cell: createCell,
        replace: pasteReplace,
        gap: createCell
      };
    };
    var TableFill = {
      cellOperations: cellOperations,
      paste: paste
    };

    var fromHtml$1 = function (html, scope) {
      var doc = scope || domGlobals.document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      return children(Element.fromDom(div));
    };

    var inSelection = function (bounds, detail) {
      var leftEdge = detail.column();
      var rightEdge = detail.column() + detail.colspan() - 1;
      var topEdge = detail.row();
      var bottomEdge = detail.row() + detail.rowspan() - 1;
      return leftEdge <= bounds.finishCol() && rightEdge >= bounds.startCol() && (topEdge <= bounds.finishRow() && bottomEdge >= bounds.startRow());
    };
    var isWithin = function (bounds, detail) {
      return detail.column() >= bounds.startCol() && detail.column() + detail.colspan() - 1 <= bounds.finishCol() && detail.row() >= bounds.startRow() && detail.row() + detail.rowspan() - 1 <= bounds.finishRow();
    };
    var isRectangular = function (warehouse, bounds) {
      var isRect = true;
      var detailIsWithin = curry(isWithin, bounds);
      for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
          isRect = isRect && Warehouse.getAt(warehouse, i, j).exists(detailIsWithin);
        }
      }
      return isRect ? Option.some(bounds) : Option.none();
    };
    var CellBounds = {
      inSelection: inSelection,
      isWithin: isWithin,
      isRectangular: isRectangular
    };

    var getBounds = function (detailA, detailB) {
      return bounds(Math.min(detailA.row(), detailB.row()), Math.min(detailA.column(), detailB.column()), Math.max(detailA.row() + detailA.rowspan() - 1, detailB.row() + detailB.rowspan() - 1), Math.max(detailA.column() + detailA.colspan() - 1, detailB.column() + detailB.colspan() - 1));
    };
    var getAnyBox = function (warehouse, startCell, finishCell) {
      var startCoords = Warehouse.findItem(warehouse, startCell, eq);
      var finishCoords = Warehouse.findItem(warehouse, finishCell, eq);
      return startCoords.bind(function (sc) {
        return finishCoords.map(function (fc) {
          return getBounds(sc, fc);
        });
      });
    };
    var getBox = function (warehouse, startCell, finishCell) {
      return getAnyBox(warehouse, startCell, finishCell).bind(function (bounds) {
        return CellBounds.isRectangular(warehouse, bounds);
      });
    };
    var CellGroup = {
      getAnyBox: getAnyBox,
      getBox: getBox
    };

    var moveBy = function (warehouse, cell, row, column) {
      return Warehouse.findItem(warehouse, cell, eq).bind(function (detail) {
        var startRow = row > 0 ? detail.row() + detail.rowspan() - 1 : detail.row();
        var startCol = column > 0 ? detail.column() + detail.colspan() - 1 : detail.column();
        var dest = Warehouse.getAt(warehouse, startRow + row, startCol + column);
        return dest.map(function (d) {
          return d.element();
        });
      });
    };
    var intercepts = function (warehouse, start, finish) {
      return CellGroup.getAnyBox(warehouse, start, finish).map(function (bounds) {
        var inside = Warehouse.filterItems(warehouse, curry(CellBounds.inSelection, bounds));
        return map(inside, function (detail) {
          return detail.element();
        });
      });
    };
    var parentCell = function (warehouse, innerCell) {
      var isContainedBy = function (c1, c2) {
        return contains$2(c2, c1);
      };
      return Warehouse.findItem(warehouse, innerCell, isContainedBy).map(function (detail) {
        return detail.element();
      });
    };
    var CellFinder = {
      moveBy: moveBy,
      intercepts: intercepts,
      parentCell: parentCell
    };

    var moveBy$1 = function (cell, deltaRow, deltaColumn) {
      return TableLookup.table(cell).bind(function (table) {
        var warehouse = getWarehouse(table);
        return CellFinder.moveBy(warehouse, cell, deltaRow, deltaColumn);
      });
    };
    var intercepts$1 = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return CellFinder.intercepts(warehouse, first, last);
    };
    var nestedIntercepts = function (table, first, firstTable, last, lastTable) {
      var warehouse = getWarehouse(table);
      var optStartCell = eq(table, firstTable) ? Option.some(first) : CellFinder.parentCell(warehouse, first);
      var optLastCell = eq(table, lastTable) ? Option.some(last) : CellFinder.parentCell(warehouse, last);
      return optStartCell.bind(function (startCell) {
        return optLastCell.bind(function (lastCell) {
          return CellFinder.intercepts(warehouse, startCell, lastCell);
        });
      });
    };
    var getBox$1 = function (table, first, last) {
      var warehouse = getWarehouse(table);
      return CellGroup.getBox(warehouse, first, last);
    };
    var getWarehouse = function (table) {
      var list = DetailsList.fromTable(table);
      return Warehouse.generate(list);
    };
    var TablePositions = {
      moveBy: moveBy$1,
      intercepts: intercepts$1,
      nestedIntercepts: nestedIntercepts,
      getBox: getBox$1
    };

    var TagBoundaries = [
      'body',
      'p',
      'div',
      'article',
      'aside',
      'figcaption',
      'figure',
      'footer',
      'header',
      'nav',
      'section',
      'ol',
      'ul',
      'li',
      'table',
      'thead',
      'tbody',
      'tfoot',
      'caption',
      'tr',
      'td',
      'th',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'address'
    ];

    function DomUniverse () {
      var clone$1 = function (element) {
        return Element.fromDom(element.dom().cloneNode(false));
      };
      var document = function (element) {
        return element.dom().ownerDocument;
      };
      var isBoundary = function (element) {
        if (!isElement(element)) {
          return false;
        }
        if (name(element) === 'body') {
          return true;
        }
        return contains(TagBoundaries, name(element));
      };
      var isEmptyTag = function (element) {
        if (!isElement(element)) {
          return false;
        }
        return contains([
          'br',
          'img',
          'hr',
          'input'
        ], name(element));
      };
      var comparePosition = function (element, other) {
        return element.dom().compareDocumentPosition(other.dom());
      };
      var copyAttributesTo = function (source, destination) {
        var as = clone(source);
        setAll(destination, as);
      };
      return {
        up: constant({
          selector: ancestor$1,
          closest: closest$1,
          predicate: ancestor,
          all: parents
        }),
        down: constant({
          selector: descendants$1,
          predicate: descendants
        }),
        styles: constant({
          get: get$2,
          getRaw: getRaw,
          set: set$1,
          remove: remove$1
        }),
        attrs: constant({
          get: get$1,
          set: set,
          remove: remove,
          copyTo: copyAttributesTo
        }),
        insert: constant({
          before: before,
          after: after,
          afterAll: after$1,
          append: append,
          appendAll: append$1,
          prepend: prepend,
          wrap: wrap
        }),
        remove: constant({
          unwrap: unwrap,
          remove: remove$2
        }),
        create: constant({
          nu: Element.fromTag,
          clone: clone$1,
          text: Element.fromText
        }),
        query: constant({
          comparePosition: comparePosition,
          prevSibling: prevSibling,
          nextSibling: nextSibling
        }),
        property: constant({
          children: children,
          name: name,
          parent: parent,
          document: document,
          isText: isText,
          isComment: isComment,
          isElement: isElement,
          getText: get$3,
          setText: set$2,
          isBoundary: isBoundary,
          isEmptyTag: isEmptyTag
        }),
        eq: eq,
        is: is$1
      };
    }

    var leftRight = Immutable('left', 'right');
    var brokenPath = Immutable('first', 'second', 'splits');
    var bisect = function (universe, parent, child) {
      var children = universe.property().children(parent);
      var index = findIndex(children, curry(universe.eq, child));
      return index.map(function (ind) {
        return {
          before: constant(children.slice(0, ind)),
          after: constant(children.slice(ind + 1))
        };
      });
    };
    var breakToRight = function (universe, parent, child) {
      return bisect(universe, parent, child).map(function (parts) {
        var second = universe.create().clone(parent);
        universe.insert().appendAll(second, parts.after());
        universe.insert().after(parent, second);
        return leftRight(parent, second);
      });
    };
    var breakToLeft = function (universe, parent, child) {
      return bisect(universe, parent, child).map(function (parts) {
        var prior = universe.create().clone(parent);
        universe.insert().appendAll(prior, parts.before().concat([child]));
        universe.insert().appendAll(parent, parts.after());
        universe.insert().before(parent, prior);
        return leftRight(prior, parent);
      });
    };
    var breakPath = function (universe, item, isTop, breaker) {
      var next = function (child, group, splits) {
        var fallback = brokenPath(child, Option.none(), splits);
        if (isTop(child)) {
          return brokenPath(child, group, splits);
        } else {
          return universe.property().parent(child).bind(function (parent) {
            return breaker(universe, parent, child).map(function (breakage) {
              var extra = [{
                  first: breakage.left,
                  second: breakage.right
                }];
              var nextChild = isTop(parent) ? parent : breakage.left();
              return next(nextChild, Option.some(breakage.right()), splits.concat(extra));
            });
          }).getOr(fallback);
        }
      };
      return next(item, Option.none(), []);
    };

    var all$1 = function (universe, look, elements, f) {
      var head = elements[0];
      var tail = elements.slice(1);
      return f(universe, look, head, tail);
    };
    var oneAll = function (universe, look, elements) {
      return elements.length > 0 ? all$1(universe, look, elements, unsafeOne) : Option.none();
    };
    var unsafeOne = function (universe, look, head, tail) {
      var start = look(universe, head);
      return foldr(tail, function (b, a) {
        var current = look(universe, a);
        return commonElement(universe, b, current);
      }, start);
    };
    var commonElement = function (universe, start, end) {
      return start.bind(function (s) {
        return end.filter(curry(universe.eq, s));
      });
    };

    var eq$1 = function (universe, item) {
      return curry(universe.eq, item);
    };
    var unsafeSubset = function (universe, common, ps1, ps2) {
      var children = universe.property().children(common);
      if (universe.eq(common, ps1[0])) {
        return Option.some([ps1[0]]);
      }
      if (universe.eq(common, ps2[0])) {
        return Option.some([ps2[0]]);
      }
      var finder = function (ps) {
        var topDown = reverse(ps);
        var index = findIndex(topDown, eq$1(universe, common)).getOr(-1);
        var item = index < topDown.length - 1 ? topDown[index + 1] : topDown[index];
        return findIndex(children, eq$1(universe, item));
      };
      var startIndex = finder(ps1);
      var endIndex = finder(ps2);
      return startIndex.bind(function (sIndex) {
        return endIndex.map(function (eIndex) {
          var first = Math.min(sIndex, eIndex);
          var last = Math.max(sIndex, eIndex);
          return children.slice(first, last + 1);
        });
      });
    };
    var ancestors$2 = function (universe, start, end, isRoot) {
      if (isRoot === void 0) {
        isRoot = never;
      }
      var ps1 = [start].concat(universe.up().all(start));
      var ps2 = [end].concat(universe.up().all(end));
      var prune = function (path) {
        var index = findIndex(path, isRoot);
        return index.fold(function () {
          return path;
        }, function (ind) {
          return path.slice(0, ind + 1);
        });
      };
      var pruned1 = prune(ps1);
      var pruned2 = prune(ps2);
      var shared = find(pruned1, function (x) {
        return exists(pruned2, eq$1(universe, x));
      });
      return {
        firstpath: constant(pruned1),
        secondpath: constant(pruned2),
        shared: constant(shared)
      };
    };
    var subset = function (universe, start, end) {
      var ancs = ancestors$2(universe, start, end);
      return ancs.shared().bind(function (shared) {
        return unsafeSubset(universe, shared, ancs.firstpath(), ancs.secondpath());
      });
    };
    var SubsetFn = {
      subset: subset,
      ancestors: ancestors$2
    };

    var sharedOne = oneAll;
    var subset$1 = SubsetFn.subset;
    var ancestors$3 = SubsetFn.ancestors;
    var breakToLeft$1 = breakToLeft;
    var breakToRight$1 = breakToRight;
    var breakPath$1 = breakPath;
    var Parent = {
      sharedOne: sharedOne,
      subset: subset$1,
      ancestors: ancestors$3,
      breakToLeft: breakToLeft$1,
      breakToRight: breakToRight$1,
      breakPath: breakPath$1
    };

    var universe = DomUniverse();
    var sharedOne$1 = function (look, elements) {
      return Parent.sharedOne(universe, function (_universe, element) {
        return look(element);
      }, elements);
    };
    var subset$2 = function (start, finish) {
      return Parent.subset(universe, start, finish);
    };
    var ancestors$4 = function (start, finish, isRoot) {
      return Parent.ancestors(universe, start, finish, isRoot);
    };
    var breakToLeft$2 = function (parent, child) {
      return Parent.breakToLeft(universe, parent, child);
    };
    var breakToRight$2 = function (parent, child) {
      return Parent.breakToRight(universe, parent, child);
    };
    var breakPath$2 = function (child, isTop, breaker) {
      return Parent.breakPath(universe, child, isTop, function (u, p, c) {
        return breaker(p, c);
      });
    };
    var DomParent = {
      sharedOne: sharedOne$1,
      subset: subset$2,
      ancestors: ancestors$4,
      breakToLeft: breakToLeft$2,
      breakToRight: breakToRight$2,
      breakPath: breakPath$2
    };

    var create = MixedBag([
      'boxes',
      'start',
      'finish'
    ], []);
    var Identified = { create: create };

    var lookupTable = function (container) {
      return ancestor$1(container, 'table');
    };
    var identify = function (start, finish, isRoot) {
      var getIsRoot = function (rootTable) {
        return function (element) {
          return isRoot !== undefined && isRoot(element) || eq(element, rootTable);
        };
      };
      if (eq(start, finish)) {
        return Option.some(Identified.create({
          boxes: Option.some([start]),
          start: start,
          finish: finish
        }));
      } else {
        return lookupTable(start).bind(function (startTable) {
          return lookupTable(finish).bind(function (finishTable) {
            if (eq(startTable, finishTable)) {
              return Option.some(Identified.create({
                boxes: TablePositions.intercepts(startTable, start, finish),
                start: start,
                finish: finish
              }));
            } else if (contains$2(startTable, finishTable)) {
              var ancestorCells = ancestors$1(finish, 'td,th', getIsRoot(startTable));
              var finishCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : finish;
              return Option.some(Identified.create({
                boxes: TablePositions.nestedIntercepts(startTable, start, startTable, finish, finishTable),
                start: start,
                finish: finishCell
              }));
            } else if (contains$2(finishTable, startTable)) {
              var ancestorCells = ancestors$1(start, 'td,th', getIsRoot(finishTable));
              var startCell = ancestorCells.length > 0 ? ancestorCells[ancestorCells.length - 1] : start;
              return Option.some(Identified.create({
                boxes: TablePositions.nestedIntercepts(finishTable, start, startTable, finish, finishTable),
                start: start,
                finish: startCell
              }));
            } else {
              return DomParent.ancestors(start, finish).shared().bind(function (lca) {
                return closest$1(lca, 'table', isRoot).bind(function (lcaTable) {
                  var finishAncestorCells = ancestors$1(finish, 'td,th', getIsRoot(lcaTable));
                  var finishCell = finishAncestorCells.length > 0 ? finishAncestorCells[finishAncestorCells.length - 1] : finish;
                  var startAncestorCells = ancestors$1(start, 'td,th', getIsRoot(lcaTable));
                  var startCell = startAncestorCells.length > 0 ? startAncestorCells[startAncestorCells.length - 1] : start;
                  return Option.some(Identified.create({
                    boxes: TablePositions.nestedIntercepts(lcaTable, start, startTable, finish, finishTable),
                    start: startCell,
                    finish: finishCell
                  }));
                });
              });
            }
          });
        });
      }
    };
    var retrieve = function (container, selector) {
      var sels = descendants$1(container, selector);
      return sels.length > 0 ? Option.some(sels) : Option.none();
    };
    var getLast = function (boxes, lastSelectedSelector) {
      return find(boxes, function (box) {
        return is(box, lastSelectedSelector);
      });
    };
    var getEdges = function (container, firstSelectedSelector, lastSelectedSelector) {
      return descendant$1(container, firstSelectedSelector).bind(function (first) {
        return descendant$1(container, lastSelectedSelector).bind(function (last) {
          return DomParent.sharedOne(lookupTable, [
            first,
            last
          ]).map(function (tbl) {
            return {
              first: constant(first),
              last: constant(last),
              table: constant(tbl)
            };
          });
        });
      });
    };
    var expandTo = function (finish, firstSelectedSelector) {
      return ancestor$1(finish, 'table').bind(function (table) {
        return descendant$1(table, firstSelectedSelector).bind(function (start) {
          return identify(start, finish).bind(function (identified) {
            return identified.boxes().map(function (boxes) {
              return {
                boxes: constant(boxes),
                start: constant(identified.start()),
                finish: constant(identified.finish())
              };
            });
          });
        });
      });
    };
    var shiftSelection = function (boxes, deltaRow, deltaColumn, firstSelectedSelector, lastSelectedSelector) {
      return getLast(boxes, lastSelectedSelector).bind(function (last) {
        return TablePositions.moveBy(last, deltaRow, deltaColumn).bind(function (finish) {
          return expandTo(finish, firstSelectedSelector);
        });
      });
    };
    var CellSelection = {
      identify: identify,
      retrieve: retrieve,
      shiftSelection: shiftSelection,
      getEdges: getEdges
    };

    var retrieve$1 = function (container, selector) {
      return CellSelection.retrieve(container, selector);
    };
    var retrieveBox = function (container, firstSelectedSelector, lastSelectedSelector) {
      return CellSelection.getEdges(container, firstSelectedSelector, lastSelectedSelector).bind(function (edges) {
        var isRoot = function (ancestor) {
          return eq(container, ancestor);
        };
        var firstAncestor = ancestor$1(edges.first(), 'thead,tfoot,tbody,table', isRoot);
        var lastAncestor = ancestor$1(edges.last(), 'thead,tfoot,tbody,table', isRoot);
        return firstAncestor.bind(function (fA) {
          return lastAncestor.bind(function (lA) {
            return eq(fA, lA) ? TablePositions.getBox(edges.table(), edges.first(), edges.last()) : Option.none();
          });
        });
      });
    };
    var TableSelection = {
      retrieve: retrieve$1,
      retrieveBox: retrieveBox
    };

    var selected = 'data-mce-selected';
    var selectedSelector = 'td[' + selected + '],th[' + selected + ']';
    var attributeSelector = '[' + selected + ']';
    var firstSelected = 'data-mce-first-selected';
    var firstSelectedSelector = 'td[' + firstSelected + '],th[' + firstSelected + ']';
    var lastSelected = 'data-mce-last-selected';
    var lastSelectedSelector = 'td[' + lastSelected + '],th[' + lastSelected + ']';
    var Ephemera = {
      selected: constant(selected),
      selectedSelector: constant(selectedSelector),
      attributeSelector: constant(attributeSelector),
      firstSelected: constant(firstSelected),
      firstSelectedSelector: constant(firstSelectedSelector),
      lastSelected: constant(lastSelected),
      lastSelectedSelector: constant(lastSelectedSelector)
    };

    var generate$1 = function (cases) {
      if (!isArray(cases)) {
        throw new Error('cases must be an array');
      }
      if (cases.length === 0) {
        throw new Error('there must be at least one case');
      }
      var constructors = [];
      var adt = {};
      each(cases, function (acase, count) {
        var keys$1 = keys(acase);
        if (keys$1.length !== 1) {
          throw new Error('one and only one name per case');
        }
        var key = keys$1[0];
        var value = acase[key];
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!isArray(value)) {
          throw new Error('case arguments must be an array');
        }
        constructors.push(key);
        adt[key] = function () {
          var argLength = arguments.length;
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }
          var args = new Array(argLength);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var match = function (branches) {
            var branchKeys = keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }
            var allReqd = forall(constructors, function (reqKey) {
              return contains(branchKeys, reqKey);
            });
            if (!allReqd) {
              throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));
            }
            return branches[key].apply(null, args);
          };
          return {
            fold: function () {
              if (arguments.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
              }
              var target = arguments[count];
              return target.apply(null, args);
            },
            match: match,
            log: function (label) {
              domGlobals.console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });
      return adt;
    };
    var Adt = { generate: generate$1 };

    var type$1 = Adt.generate([
      { none: [] },
      { multiple: ['elements'] },
      { single: ['selection'] }
    ]);
    var cata = function (subject, onNone, onMultiple, onSingle) {
      return subject.fold(onNone, onMultiple, onSingle);
    };
    var SelectionTypes = {
      cata: cata,
      none: type$1.none,
      multiple: type$1.multiple,
      single: type$1.single
    };

    var selection = function (cell, selections) {
      return SelectionTypes.cata(selections.get(), constant([]), identity, constant([cell]));
    };
    var unmergable = function (cell, selections) {
      var hasSpan = function (elem) {
        return has$1(elem, 'rowspan') && parseInt(get$1(elem, 'rowspan'), 10) > 1 || has$1(elem, 'colspan') && parseInt(get$1(elem, 'colspan'), 10) > 1;
      };
      var candidates = selection(cell, selections);
      return candidates.length > 0 && forall(candidates, hasSpan) ? Option.some(candidates) : Option.none();
    };
    var mergable = function (table, selections) {
      return SelectionTypes.cata(selections.get(), Option.none, function (cells, _env) {
        if (cells.length === 0) {
          return Option.none();
        }
        return TableSelection.retrieveBox(table, Ephemera.firstSelectedSelector(), Ephemera.lastSelectedSelector()).bind(function (bounds) {
          return cells.length > 1 ? Option.some({
            bounds: constant(bounds),
            cells: constant(cells)
          }) : Option.none();
        });
      }, Option.none);
    };
    var CellOperations = {
      mergable: mergable,
      unmergable: unmergable,
      selection: selection
    };

    var noMenu = function (cell) {
      return {
        element: constant(cell),
        mergable: Option.none,
        unmergable: Option.none,
        selection: constant([cell])
      };
    };
    var forMenu = function (selections, table, cell) {
      return {
        element: constant(cell),
        mergable: constant(CellOperations.mergable(table, selections)),
        unmergable: constant(CellOperations.unmergable(cell, selections)),
        selection: constant(CellOperations.selection(cell, selections))
      };
    };
    var notCell$1 = function (element) {
      return noMenu(element);
    };
    var paste$1 = Immutable('element', 'clipboard', 'generators');
    var pasteRows = function (selections, table, cell, clipboard, generators) {
      return {
        element: constant(cell),
        mergable: Option.none,
        unmergable: Option.none,
        selection: constant(CellOperations.selection(cell, selections)),
        clipboard: constant(clipboard),
        generators: constant(generators)
      };
    };
    var TableTargets = {
      noMenu: noMenu,
      forMenu: forMenu,
      notCell: notCell$1,
      paste: paste$1,
      pasteRows: pasteRows
    };

    var extractSelected = function (cells) {
      return TableLookup.table(cells[0]).map(deep).map(function (replica) {
        return [CopySelected.extract(replica, Ephemera.attributeSelector())];
      });
    };
    var serializeElements = function (editor, elements) {
      return map(elements, function (elm) {
        return editor.selection.serializer.serialize(elm.dom(), {});
      }).join('');
    };
    var getTextContent = function (elements) {
      return map(elements, function (element) {
        return element.dom().innerText;
      }).join('');
    };
    var registerEvents = function (editor, selections, actions, cellSelection) {
      editor.on('BeforeGetContent', function (e) {
        var multiCellContext = function (cells) {
          e.preventDefault();
          extractSelected(cells).each(function (elements) {
            e.content = e.format === 'text' ? getTextContent(elements) : serializeElements(editor, elements);
          });
        };
        if (e.selection === true) {
          SelectionTypes.cata(selections.get(), noop, multiCellContext, noop);
        }
      });
      editor.on('BeforeSetContent', function (e) {
        if (e.selection === true && e.paste === true) {
          var cellOpt = Option.from(editor.dom.getParent(editor.selection.getStart(), 'th,td'));
          cellOpt.each(function (domCell) {
            var cell = Element.fromDom(domCell);
            TableLookup.table(cell).each(function (table) {
              var elements = filter(fromHtml$1(e.content), function (content) {
                return name(content) !== 'meta';
              });
              if (elements.length === 1 && name(elements[0]) === 'table') {
                e.preventDefault();
                var doc = Element.fromDom(editor.getDoc());
                var generators = TableFill.paste(doc);
                var targets = TableTargets.paste(cell, elements[0], generators);
                actions.pasteCells(table, targets).each(function (rng) {
                  editor.selection.setRng(rng);
                  editor.focus();
                  cellSelection.clear(table);
                });
              }
            });
          });
        }
      });
    };
    var Clipboard = { registerEvents: registerEvents };

    function Dimension (name, getOffset) {
      var set = function (element, h) {
        if (!isNumber(h) && !h.match(/^[0-9]+$/)) {
          throw new Error(name + '.set accepts only positive integer values. Value was ' + h);
        }
        var dom = element.dom();
        if (isSupported(dom)) {
          dom.style[name] = h + 'px';
        }
      };
      var get = function (element) {
        var r = getOffset(element);
        if (r <= 0 || r === null) {
          var css = get$2(element, name);
          return parseFloat(css) || 0;
        }
        return r;
      };
      var getOuter = get;
      var aggregate = function (element, properties) {
        return foldl(properties, function (acc, property) {
          var val = get$2(element, property);
          var value = val === undefined ? 0 : parseInt(val, 10);
          return isNaN(value) ? acc : acc + value;
        }, 0);
      };
      var max = function (element, value, properties) {
        var cumulativeInclusions = aggregate(element, properties);
        var absoluteMax = value > cumulativeInclusions ? value - cumulativeInclusions : 0;
        return absoluteMax;
      };
      return {
        set: set,
        get: get,
        getOuter: getOuter,
        aggregate: aggregate,
        max: max
      };
    }

    var api$1 = Dimension('height', function (element) {
      var dom = element.dom();
      return inBody(element) ? dom.getBoundingClientRect().height : dom.offsetHeight;
    });
    var get$4 = function (element) {
      return api$1.get(element);
    };
    var getOuter = function (element) {
      return api$1.getOuter(element);
    };

    var api$2 = Dimension('width', function (element) {
      return element.dom().offsetWidth;
    });
    var get$5 = function (element) {
      return api$2.get(element);
    };
    var getOuter$1 = function (element) {
      return api$2.getOuter(element);
    };

    var platform$1 = detect$3();
    var needManualCalc = function () {
      return platform$1.browser.isIE() || platform$1.browser.isEdge();
    };
    var toNumber = function (px, fallback) {
      var num = parseFloat(px);
      return isNaN(num) ? fallback : num;
    };
    var getProp = function (elm, name, fallback) {
      return toNumber(get$2(elm, name), fallback);
    };
    var getCalculatedHeight = function (cell) {
      var paddingTop = getProp(cell, 'padding-top', 0);
      var paddingBottom = getProp(cell, 'padding-bottom', 0);
      var borderTop = getProp(cell, 'border-top-width', 0);
      var borderBottom = getProp(cell, 'border-bottom-width', 0);
      var height = cell.dom().getBoundingClientRect().height;
      var boxSizing = get$2(cell, 'box-sizing');
      var borders = borderTop + borderBottom;
      return boxSizing === 'border-box' ? height : height - paddingTop - paddingBottom - borders;
    };
    var getWidth = function (cell) {
      return getProp(cell, 'width', get$5(cell));
    };
    var getHeight = function (cell) {
      return needManualCalc() ? getCalculatedHeight(cell) : getProp(cell, 'height', get$4(cell));
    };
    var RuntimeSize = {
      getWidth: getWidth,
      getHeight: getHeight
    };

    var genericSizeRegex = /(\d+(\.\d+)?)(\w|%)*/;
    var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
    var pixelBasedSizeRegex = /(\d+(\.\d+)?)px|em/;
    var setPixelWidth = function (cell, amount) {
      set$1(cell, 'width', amount + 'px');
    };
    var setPercentageWidth = function (cell, amount) {
      set$1(cell, 'width', amount + '%');
    };
    var setHeight = function (cell, amount) {
      set$1(cell, 'height', amount + 'px');
    };
    var getHeightValue = function (cell) {
      return getRaw(cell, 'height').getOrThunk(function () {
        return RuntimeSize.getHeight(cell) + 'px';
      });
    };
    var convert = function (cell, number, getter, setter) {
      var newSize = TableLookup.table(cell).map(function (table) {
        var total = getter(table);
        return Math.floor(number / 100 * total);
      }).getOr(number);
      setter(cell, newSize);
      return newSize;
    };
    var normalizePixelSize = function (value, cell, getter, setter) {
      var number = parseInt(value, 10);
      return endsWith(value, '%') && name(cell) !== 'table' ? convert(cell, number, getter, setter) : number;
    };
    var getTotalHeight = function (cell) {
      var value = getHeightValue(cell);
      if (!value) {
        return get$4(cell);
      }
      return normalizePixelSize(value, cell, get$4, setHeight);
    };
    var get$6 = function (cell, type, f) {
      var v = f(cell);
      var span = getSpan(cell, type);
      return v / span;
    };
    var getSpan = function (cell, type) {
      return has$1(cell, type) ? parseInt(get$1(cell, type), 10) : 1;
    };
    var getRawWidth = function (element) {
      var cssWidth = getRaw(element, 'width');
      return cssWidth.fold(function () {
        return Option.from(get$1(element, 'width'));
      }, function (width) {
        return Option.some(width);
      });
    };
    var normalizePercentageWidth = function (cellWidth, tableSize) {
      return cellWidth / tableSize.pixelWidth() * 100;
    };
    var choosePercentageSize = function (element, width, tableSize) {
      var percentMatch = percentageBasedSizeRegex.exec(width);
      if (percentMatch !== null) {
        return parseFloat(percentMatch[1]);
      } else {
        var intWidth = get$5(element);
        return normalizePercentageWidth(intWidth, tableSize);
      }
    };
    var getPercentageWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        var intWidth = get$5(cell);
        return normalizePercentageWidth(intWidth, tableSize);
      }, function (w) {
        return choosePercentageSize(cell, w, tableSize);
      });
    };
    var normalizePixelWidth = function (cellWidth, tableSize) {
      return cellWidth / 100 * tableSize.pixelWidth();
    };
    var choosePixelSize = function (element, width, tableSize) {
      var pixelMatch = pixelBasedSizeRegex.exec(width);
      if (pixelMatch !== null) {
        return parseInt(pixelMatch[1], 10);
      }
      var percentMatch = percentageBasedSizeRegex.exec(width);
      if (percentMatch !== null) {
        var floatWidth = parseFloat(percentMatch[1]);
        return normalizePixelWidth(floatWidth, tableSize);
      }
      return get$5(element);
    };
    var getPixelWidth = function (cell, tableSize) {
      var width = getRawWidth(cell);
      return width.fold(function () {
        return get$5(cell);
      }, function (w) {
        return choosePixelSize(cell, w, tableSize);
      });
    };
    var getHeight$1 = function (cell) {
      return get$6(cell, 'rowspan', getTotalHeight);
    };
    var getGenericWidth = function (cell) {
      var width = getRawWidth(cell);
      return width.bind(function (w) {
        var match = genericSizeRegex.exec(w);
        if (match !== null) {
          return Option.some({
            width: constant(parseFloat(match[1])),
            unit: constant(match[3])
          });
        } else {
          return Option.none();
        }
      });
    };
    var setGenericWidth = function (cell, amount, unit) {
      set$1(cell, 'width', amount + unit);
    };
    var Sizes = {
      percentageBasedSizeRegex: constant(percentageBasedSizeRegex),
      pixelBasedSizeRegex: constant(pixelBasedSizeRegex),
      setPixelWidth: setPixelWidth,
      setPercentageWidth: setPercentageWidth,
      setHeight: setHeight,
      getPixelWidth: getPixelWidth,
      getPercentageWidth: getPercentageWidth,
      getGenericWidth: getGenericWidth,
      setGenericWidth: setGenericWidth,
      getHeight: getHeight$1,
      getRawWidth: getRawWidth
    };

    var halve = function (main, other) {
      var width = Sizes.getGenericWidth(main);
      width.each(function (w) {
        var newWidth = w.width() / 2;
        Sizes.setGenericWidth(main, newWidth, w.unit());
        Sizes.setGenericWidth(other, newWidth, w.unit());
      });
    };
    var CellMutations = { halve: halve };

    var r = function (left, top) {
      var translate = function (x, y) {
        return r(left + x, top + y);
      };
      return {
        left: constant(left),
        top: constant(top),
        translate: translate
      };
    };
    var Position = r;

    var boxPosition = function (dom) {
      var box = dom.getBoundingClientRect();
      return Position(box.left, box.top);
    };
    var firstDefinedOrZero = function (a, b) {
      return a !== undefined ? a : b !== undefined ? b : 0;
    };
    var absolute = function (element) {
      var doc = element.dom().ownerDocument;
      var body = doc.body;
      var win = doc.defaultView;
      var html = doc.documentElement;
      if (body === element.dom()) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      var scrollTop = firstDefinedOrZero(win.pageYOffset, html.scrollTop);
      var scrollLeft = firstDefinedOrZero(win.pageXOffset, html.scrollLeft);
      var clientTop = firstDefinedOrZero(html.clientTop, body.clientTop);
      var clientLeft = firstDefinedOrZero(html.clientLeft, body.clientLeft);
      return viewport(element).translate(scrollLeft - clientLeft, scrollTop - clientTop);
    };
    var viewport = function (element) {
      var dom = element.dom();
      var doc = dom.ownerDocument;
      var body = doc.body;
      if (body === dom) {
        return Position(body.offsetLeft, body.offsetTop);
      }
      if (!inBody(element)) {
        return Position(0, 0);
      }
      return boxPosition(dom);
    };

    var rowInfo = Immutable('row', 'y');
    var colInfo = Immutable('col', 'x');
    var rtlEdge = function (cell) {
      var pos = absolute(cell);
      return pos.left() + getOuter$1(cell);
    };
    var ltrEdge = function (cell) {
      return absolute(cell).left();
    };
    var getLeftEdge = function (index, cell) {
      return colInfo(index, ltrEdge(cell));
    };
    var getRightEdge = function (index, cell) {
      return colInfo(index, rtlEdge(cell));
    };
    var getTop = function (cell) {
      return absolute(cell).top();
    };
    var getTopEdge = function (index, cell) {
      return rowInfo(index, getTop(cell));
    };
    var getBottomEdge = function (index, cell) {
      return rowInfo(index, getTop(cell) + getOuter(cell));
    };
    var findPositions = function (getInnerEdge, getOuterEdge, array) {
      if (array.length === 0) {
        return [];
      }
      var lines = map(array.slice(1), function (cellOption, index) {
        return cellOption.map(function (cell) {
          return getInnerEdge(index, cell);
        });
      });
      var lastLine = array[array.length - 1].map(function (cell) {
        return getOuterEdge(array.length - 1, cell);
      });
      return lines.concat([lastLine]);
    };
    var negate = function (step) {
      return -step;
    };
    var height = {
      delta: identity,
      positions: function (optElements) {
        return findPositions(getTopEdge, getBottomEdge, optElements);
      },
      edge: getTop
    };
    var ltr = {
      delta: identity,
      edge: ltrEdge,
      positions: function (optElements) {
        return findPositions(getLeftEdge, getRightEdge, optElements);
      }
    };
    var rtl = {
      delta: negate,
      edge: rtlEdge,
      positions: function (optElements) {
        return findPositions(getRightEdge, getLeftEdge, optElements);
      }
    };
    var BarPositions = {
      height: height,
      rtl: rtl,
      ltr: ltr
    };

    var ResizeDirection = {
      ltr: BarPositions.ltr,
      rtl: BarPositions.rtl
    };

    function TableDirection (directionAt) {
      var auto = function (table) {
        return directionAt(table).isRtl() ? ResizeDirection.rtl : ResizeDirection.ltr;
      };
      var delta = function (amount, table) {
        return auto(table).delta(amount, table);
      };
      var positions = function (cols, table) {
        return auto(table).positions(cols, table);
      };
      var edge = function (cell) {
        return auto(cell).edge(cell);
      };
      return {
        delta: delta,
        edge: edge,
        positions: positions
      };
    }

    var getGridSize = function (table) {
      var input = DetailsList.fromTable(table);
      var warehouse = Warehouse.generate(input);
      return warehouse.grid();
    };
    var TableGridSize = { getGridSize: getGridSize };

    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    var setIfNot = function (element, property, value, ignore) {
      if (value === ignore) {
        remove(element, property);
      } else {
        set(element, property, value);
      }
    };
    var render = function (table, grid) {
      var newRows = [];
      var newCells = [];
      var renderSection = function (gridSection, sectionName) {
        var section = child$2(table, sectionName).getOrThunk(function () {
          var tb = Element.fromTag(sectionName, owner(table).dom());
          append(table, tb);
          return tb;
        });
        empty(section);
        var rows = map(gridSection, function (row) {
          if (row.isNew()) {
            newRows.push(row.element());
          }
          var tr = row.element();
          empty(tr);
          each(row.cells(), function (cell) {
            if (cell.isNew()) {
              newCells.push(cell.element());
            }
            setIfNot(cell.element(), 'colspan', cell.colspan(), 1);
            setIfNot(cell.element(), 'rowspan', cell.rowspan(), 1);
            append(tr, cell.element());
          });
          return tr;
        });
        append$1(section, rows);
      };
      var removeSection = function (sectionName) {
        child$2(table, sectionName).each(remove$2);
      };
      var renderOrRemoveSection = function (gridSection, sectionName) {
        if (gridSection.length > 0) {
          renderSection(gridSection, sectionName);
        } else {
          removeSection(sectionName);
        }
      };
      var headSection = [];
      var bodySection = [];
      var footSection = [];
      each(grid, function (row) {
        switch (row.section()) {
        case 'thead':
          headSection.push(row);
          break;
        case 'tbody':
          bodySection.push(row);
          break;
        case 'tfoot':
          footSection.push(row);
          break;
        }
      });
      renderOrRemoveSection(headSection, 'thead');
      renderOrRemoveSection(bodySection, 'tbody');
      renderOrRemoveSection(footSection, 'tfoot');
      return {
        newRows: constant(newRows),
        newCells: constant(newCells)
      };
    };
    var copy$2 = function (grid) {
      var rows = map(grid, function (row) {
        var tr = shallow(row.element());
        each(row.cells(), function (cell) {
          var clonedCell = deep(cell.element());
          setIfNot(clonedCell, 'colspan', cell.colspan(), 1);
          setIfNot(clonedCell, 'rowspan', cell.rowspan(), 1);
          append(tr, clonedCell);
        });
        return tr;
      });
      return rows;
    };
    var Redraw = {
      render: render,
      copy: copy$2
    };

    var read = function (element, attr) {
      var value = get$1(element, attr);
      return value === undefined || value === '' ? [] : value.split(' ');
    };
    var add = function (element, attr, id) {
      var old = read(element, attr);
      var nu = old.concat([id]);
      set(element, attr, nu.join(' '));
      return true;
    };
    var remove$3 = function (element, attr, id) {
      var nu = filter(read(element, attr), function (v) {
        return v !== id;
      });
      if (nu.length > 0) {
        set(element, attr, nu.join(' '));
      } else {
        remove(element, attr);
      }
      return false;
    };

    var supports = function (element) {
      return element.dom().classList !== undefined;
    };
    var get$7 = function (element) {
      return read(element, 'class');
    };
    var add$1 = function (element, clazz) {
      return add(element, 'class', clazz);
    };
    var remove$4 = function (element, clazz) {
      return remove$3(element, 'class', clazz);
    };

    var add$2 = function (element, clazz) {
      if (supports(element)) {
        element.dom().classList.add(clazz);
      } else {
        add$1(element, clazz);
      }
    };
    var cleanClass = function (element) {
      var classList = supports(element) ? element.dom().classList : get$7(element);
      if (classList.length === 0) {
        remove(element, 'class');
      }
    };
    var remove$5 = function (element, clazz) {
      if (supports(element)) {
        var classList = element.dom().classList;
        classList.remove(clazz);
      } else {
        remove$4(element, clazz);
      }
      cleanClass(element);
    };
    var has$2 = function (element, clazz) {
      return supports(element) && element.dom().classList.contains(clazz);
    };

    var repeat = function (repititions, f) {
      var r = [];
      for (var i = 0; i < repititions; i++) {
        r.push(f(i));
      }
      return r;
    };
    var range = function (start, end) {
      var r = [];
      for (var i = start; i < end; i++) {
        r.push(i);
      }
      return r;
    };
    var deduce = function (xs, index) {
      if (index < 0 || index >= xs.length - 1) {
        return Option.none();
      }
      var current = xs[index].fold(function () {
        var rest = reverse(xs.slice(0, index));
        return findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return {
              value: aa,
              delta: i + 1
            };
          });
        });
      }, function (c) {
        return Option.some({
          value: c,
          delta: 0
        });
      });
      var next = xs[index + 1].fold(function () {
        var rest = xs.slice(index + 1);
        return findMap(rest, function (a, i) {
          return a.map(function (aa) {
            return {
              value: aa,
              delta: i + 1
            };
          });
        });
      }, function (n) {
        return Option.some({
          value: n,
          delta: 1
        });
      });
      return current.bind(function (c) {
        return next.map(function (n) {
          var extras = n.delta + c.delta;
          return Math.abs(n.value - c.value) / extras;
        });
      });
    };

    var columns = function (warehouse) {
      var grid = warehouse.grid();
      var cols = range(0, grid.columns());
      var rowsArr = range(0, grid.rows());
      return map(cols, function (col) {
        var getBlock = function () {
          return bind(rowsArr, function (r) {
            return Warehouse.getAt(warehouse, r, col).filter(function (detail) {
              return detail.column() === col;
            }).fold(constant([]), function (detail) {
              return [detail];
            });
          });
        };
        var isSingle = function (detail) {
          return detail.colspan() === 1;
        };
        var getFallback = function () {
          return Warehouse.getAt(warehouse, 0, col);
        };
        return decide(getBlock, isSingle, getFallback);
      });
    };
    var decide = function (getBlock, isSingle, getFallback) {
      var inBlock = getBlock();
      var singleInBlock = find(inBlock, isSingle);
      var detailOption = singleInBlock.orThunk(function () {
        return Option.from(inBlock[0]).orThunk(getFallback);
      });
      return detailOption.map(function (detail) {
        return detail.element();
      });
    };
    var rows$1 = function (warehouse) {
      var grid = warehouse.grid();
      var rowsArr = range(0, grid.rows());
      var cols = range(0, grid.columns());
      return map(rowsArr, function (row) {
        var getBlock = function () {
          return bind(cols, function (c) {
            return Warehouse.getAt(warehouse, row, c).filter(function (detail) {
              return detail.row() === row;
            }).fold(constant([]), function (detail) {
              return [detail];
            });
          });
        };
        var isSingle = function (detail) {
          return detail.rowspan() === 1;
        };
        var getFallback = function () {
          return Warehouse.getAt(warehouse, row, 0);
        };
        return decide(getBlock, isSingle, getFallback);
      });
    };
    var Blocks = {
      columns: columns,
      rows: rows$1
    };

    var css = function (namespace) {
      var dashNamespace = namespace.replace(/\./g, '-');
      var resolve = function (str) {
        return dashNamespace + '-' + str;
      };
      return { resolve: resolve };
    };

    var styles = css('ephox-snooker');
    var Styles = { resolve: styles.resolve };

    var col = function (column, x, y, w, h) {
      var blocker = Element.fromTag('div');
      setAll$1(blocker, {
        position: 'absolute',
        left: x - w / 2 + 'px',
        top: y + 'px',
        height: h + 'px',
        width: w + 'px'
      });
      setAll(blocker, {
        'data-column': column,
        'role': 'presentation'
      });
      return blocker;
    };
    var row$1 = function (r, x, y, w, h) {
      var blocker = Element.fromTag('div');
      setAll$1(blocker, {
        position: 'absolute',
        left: x + 'px',
        top: y - h / 2 + 'px',
        height: h + 'px',
        width: w + 'px'
      });
      setAll(blocker, {
        'data-row': r,
        'role': 'presentation'
      });
      return blocker;
    };
    var Bar = {
      col: col,
      row: row$1
    };

    var resizeBar = Styles.resolve('resizer-bar');
    var resizeRowBar = Styles.resolve('resizer-rows');
    var resizeColBar = Styles.resolve('resizer-cols');
    var BAR_THICKNESS = 7;
    var destroy = function (wire) {
      var previous = descendants$1(wire.parent(), '.' + resizeBar);
      each(previous, remove$2);
    };
    var drawBar = function (wire, positions, create) {
      var origin = wire.origin();
      each(positions, function (cpOption, i) {
        cpOption.each(function (cp) {
          var bar = create(origin, cp);
          add$2(bar, resizeBar);
          append(wire.parent(), bar);
        });
      });
    };
    var refreshCol = function (wire, colPositions, position, tableHeight) {
      drawBar(wire, colPositions, function (origin, cp) {
        var colBar = Bar.col(cp.col(), cp.x() - origin.left(), position.top() - origin.top(), BAR_THICKNESS, tableHeight);
        add$2(colBar, resizeColBar);
        return colBar;
      });
    };
    var refreshRow = function (wire, rowPositions, position, tableWidth) {
      drawBar(wire, rowPositions, function (origin, cp) {
        var rowBar = Bar.row(cp.row(), position.left() - origin.left(), cp.y() - origin.top(), tableWidth, BAR_THICKNESS);
        add$2(rowBar, resizeRowBar);
        return rowBar;
      });
    };
    var refreshGrid = function (wire, table, rows, cols, hdirection, vdirection) {
      var position = absolute(table);
      var rowPositions = rows.length > 0 ? hdirection.positions(rows, table) : [];
      refreshRow(wire, rowPositions, position, getOuter$1(table));
      var colPositions = cols.length > 0 ? vdirection.positions(cols, table) : [];
      refreshCol(wire, colPositions, position, getOuter(table));
    };
    var refresh = function (wire, table, hdirection, vdirection) {
      destroy(wire);
      var list = DetailsList.fromTable(table);
      var warehouse = Warehouse.generate(list);
      var rows = Blocks.rows(warehouse);
      var cols = Blocks.columns(warehouse);
      refreshGrid(wire, table, rows, cols, hdirection, vdirection);
    };
    var each$2 = function (wire, f) {
      var bars = descendants$1(wire.parent(), '.' + resizeBar);
      each(bars, f);
    };
    var hide = function (wire) {
      each$2(wire, function (bar) {
        set$1(bar, 'display', 'none');
      });
    };
    var show = function (wire) {
      each$2(wire, function (bar) {
        set$1(bar, 'display', 'block');
      });
    };
    var isRowBar = function (element) {
      return has$2(element, resizeRowBar);
    };
    var isColBar = function (element) {
      return has$2(element, resizeColBar);
    };
    var Bars = {
      refresh: refresh,
      hide: hide,
      show: show,
      destroy: destroy,
      isRowBar: isRowBar,
      isColBar: isColBar
    };

    var addCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      var before = cells.slice(0, index);
      var after = cells.slice(index);
      var newCells = before.concat([cell]).concat(after);
      return setCells(gridRow, newCells);
    };
    var mutateCell = function (gridRow, index, cell) {
      var cells = gridRow.cells();
      cells[index] = cell;
    };
    var setCells = function (gridRow, cells) {
      return rowcells(cells, gridRow.section());
    };
    var mapCells = function (gridRow, f) {
      var cells = gridRow.cells();
      var r = map(cells, f);
      return rowcells(r, gridRow.section());
    };
    var getCell = function (gridRow, index) {
      return gridRow.cells()[index];
    };
    var getCellElement = function (gridRow, index) {
      return getCell(gridRow, index).element();
    };
    var cellLength = function (gridRow) {
      return gridRow.cells().length;
    };
    var GridRow = {
      addCell: addCell,
      setCells: setCells,
      mutateCell: mutateCell,
      getCell: getCell,
      getCellElement: getCellElement,
      mapCells: mapCells,
      cellLength: cellLength
    };

    var getColumn = function (grid, index) {
      return map(grid, function (row) {
        return GridRow.getCell(row, index);
      });
    };
    var getRow = function (grid, index) {
      return grid[index];
    };
    var findDiff = function (xs, comp) {
      if (xs.length === 0) {
        return 0;
      }
      var first = xs[0];
      var index = findIndex(xs, function (x) {
        return !comp(first.element(), x.element());
      });
      return index.fold(function () {
        return xs.length;
      }, function (ind) {
        return ind;
      });
    };
    var subgrid = function (grid, row, column, comparator) {
      var restOfRow = getRow(grid, row).cells().slice(column);
      var endColIndex = findDiff(restOfRow, comparator);
      var restOfColumn = getColumn(grid, column).slice(row);
      var endRowIndex = findDiff(restOfColumn, comparator);
      return {
        colspan: constant(endColIndex),
        rowspan: constant(endRowIndex)
      };
    };
    var TableGrid = { subgrid: subgrid };

    var toDetails = function (grid, comparator) {
      var seen = map(grid, function (row, ri) {
        return map(row.cells(), function (col, ci) {
          return false;
        });
      });
      var updateSeen = function (ri, ci, rowspan, colspan) {
        for (var r = ri; r < ri + rowspan; r++) {
          for (var c = ci; c < ci + colspan; c++) {
            seen[r][c] = true;
          }
        }
      };
      return map(grid, function (row, ri) {
        var details = bind(row.cells(), function (cell, ci) {
          if (seen[ri][ci] === false) {
            var result = TableGrid.subgrid(grid, ri, ci, comparator);
            updateSeen(ri, ci, result.rowspan(), result.colspan());
            return [detailnew(cell.element(), result.rowspan(), result.colspan(), cell.isNew())];
          } else {
            return [];
          }
        });
        return rowdetails(details, row.section());
      });
    };
    var toGrid = function (warehouse, generators, isNew) {
      var grid = [];
      for (var i = 0; i < warehouse.grid().rows(); i++) {
        var rowCells = [];
        for (var j = 0; j < warehouse.grid().columns(); j++) {
          var element = Warehouse.getAt(warehouse, i, j).map(function (item) {
            return elementnew(item.element(), isNew);
          }).getOrThunk(function () {
            return elementnew(generators.gap(), true);
          });
          rowCells.push(element);
        }
        var row = rowcells(rowCells, warehouse.all()[i].section());
        grid.push(row);
      }
      return grid;
    };
    var Transitions = {
      toDetails: toDetails,
      toGrid: toGrid
    };

    var fromWarehouse = function (warehouse, generators) {
      return Transitions.toGrid(warehouse, generators, false);
    };
    var deriveRows = function (rendered, generators) {
      var findRow = function (details) {
        var rowOfCells = findMap(details, function (detail) {
          return parent(detail.element()).map(function (row) {
            var isNew = parent(row).isNone();
            return elementnew(row, isNew);
          });
        });
        return rowOfCells.getOrThunk(function () {
          return elementnew(generators.row(), true);
        });
      };
      return map(rendered, function (details) {
        var row = findRow(details.details());
        return rowdatanew(row.element(), details.details(), details.section(), row.isNew());
      });
    };
    var toDetailList = function (grid, generators) {
      var rendered = Transitions.toDetails(grid, eq);
      return deriveRows(rendered, generators);
    };
    var findInWarehouse = function (warehouse, element) {
      var all = flatten(map(warehouse.all(), function (r) {
        return r.cells();
      }));
      return find(all, function (e) {
        return eq(element, e.element());
      });
    };
    var run = function (operation, extract, adjustment, postAction, genWrappers) {
      return function (wire, table, target, generators, direction) {
        var input = DetailsList.fromTable(table);
        var warehouse = Warehouse.generate(input);
        var output = extract(warehouse, target).map(function (info) {
          var model = fromWarehouse(warehouse, generators);
          var result = operation(model, info, eq, genWrappers(generators));
          var grid = toDetailList(result.grid(), generators);
          return {
            grid: constant(grid),
            cursor: result.cursor
          };
        });
        return output.fold(function () {
          return Option.none();
        }, function (out) {
          var newElements = Redraw.render(table, out.grid());
          adjustment(table, out.grid(), direction);
          postAction(table);
          Bars.refresh(wire, table, BarPositions.height, direction);
          return Option.some({
            cursor: out.cursor,
            newRows: newElements.newRows,
            newCells: newElements.newCells
          });
        });
      };
    };
    var onCell = function (warehouse, target) {
      return TableLookup.cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell);
      });
    };
    var onPaste = function (warehouse, target) {
      return TableLookup.cell(target.element()).bind(function (cell) {
        return findInWarehouse(warehouse, cell).map(function (details) {
          var value = __assign(__assign({}, details), {
            generators: target.generators,
            clipboard: target.clipboard
          });
          return value;
        });
      });
    };
    var onPasteRows = function (warehouse, target) {
      var details = map(target.selection(), function (cell) {
        return TableLookup.cell(cell).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = cat(details);
      return cells.length > 0 ? Option.some({
        cells: cells,
        generators: target.generators,
        clipboard: target.clipboard
      }) : Option.none();
    };
    var onMergable = function (_warehouse, target) {
      return target.mergable();
    };
    var onUnmergable = function (_warehouse, target) {
      return target.unmergable();
    };
    var onCells = function (warehouse, target) {
      var details = map(target.selection(), function (cell) {
        return TableLookup.cell(cell).bind(function (lc) {
          return findInWarehouse(warehouse, lc);
        });
      });
      var cells = cat(details);
      return cells.length > 0 ? Option.some(cells) : Option.none();
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (opt) {
        return value(o);
      };
      var orThunk = function (f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var fromOption = function (opt, err) {
      return opt.fold(function () {
        return error(err);
      }, value);
    };
    var Result = {
      value: value,
      error: error,
      fromOption: fromOption
    };

    var measure = function (startAddress, gridA, gridB) {
      if (startAddress.row() >= gridA.length || startAddress.column() > GridRow.cellLength(gridA[0])) {
        return Result.error('invalid start address out of table bounds, row: ' + startAddress.row() + ', column: ' + startAddress.column());
      }
      var rowRemainder = gridA.slice(startAddress.row());
      var colRemainder = rowRemainder[0].cells().slice(startAddress.column());
      var colRequired = GridRow.cellLength(gridB[0]);
      var rowRequired = gridB.length;
      return Result.value({
        rowDelta: constant(rowRemainder.length - rowRequired),
        colDelta: constant(colRemainder.length - colRequired)
      });
    };
    var measureWidth = function (gridA, gridB) {
      var colLengthA = GridRow.cellLength(gridA[0]);
      var colLengthB = GridRow.cellLength(gridB[0]);
      return {
        rowDelta: constant(0),
        colDelta: constant(colLengthA - colLengthB)
      };
    };
    var fill = function (cells, generator) {
      return map(cells, function () {
        return elementnew(generator.cell(), true);
      });
    };
    var rowFill = function (grid, amount, generator) {
      return grid.concat(repeat(amount, function (_row) {
        return GridRow.setCells(grid[grid.length - 1], fill(grid[grid.length - 1].cells(), generator));
      }));
    };
    var colFill = function (grid, amount, generator) {
      return map(grid, function (row) {
        return GridRow.setCells(row, row.cells().concat(fill(range(0, amount), generator)));
      });
    };
    var tailor = function (gridA, delta, generator) {
      var fillCols = delta.colDelta() < 0 ? colFill : identity;
      var fillRows = delta.rowDelta() < 0 ? rowFill : identity;
      var modifiedCols = fillCols(gridA, Math.abs(delta.colDelta()), generator);
      var tailoredGrid = fillRows(modifiedCols, Math.abs(delta.rowDelta()), generator);
      return tailoredGrid;
    };
    var Fitment = {
      measure: measure,
      measureWidth: measureWidth,
      tailor: tailor
    };

    var merge = function (grid, bounds, comparator, substitution) {
      if (grid.length === 0) {
        return grid;
      }
      for (var i = bounds.startRow(); i <= bounds.finishRow(); i++) {
        for (var j = bounds.startCol(); j <= bounds.finishCol(); j++) {
          GridRow.mutateCell(grid[i], j, elementnew(substitution(), false));
        }
      }
      return grid;
    };
    var unmerge = function (grid, target, comparator, substitution) {
      var first = true;
      for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < GridRow.cellLength(grid[0]); j++) {
          var current = GridRow.getCellElement(grid[i], j);
          var isToReplace = comparator(current, target);
          if (isToReplace === true && first === false) {
            GridRow.mutateCell(grid[i], j, elementnew(substitution(), true));
          } else if (isToReplace === true) {
            first = false;
          }
        }
      }
      return grid;
    };
    var uniqueCells = function (row, comparator) {
      return foldl(row, function (rest, cell) {
        return exists(rest, function (currentCell) {
          return comparator(currentCell.element(), cell.element());
        }) ? rest : rest.concat([cell]);
      }, []);
    };
    var splitRows = function (grid, index, comparator, substitution) {
      if (index > 0 && index < grid.length) {
        var rowPrevCells = grid[index - 1].cells();
        var cells = uniqueCells(rowPrevCells, comparator);
        each(cells, function (cell) {
          var replacement = Option.none();
          var _loop_1 = function (i) {
            var _loop_2 = function (j) {
              var current = grid[i].cells()[j];
              var isToReplace = comparator(current.element(), cell.element());
              if (isToReplace) {
                if (replacement.isNone()) {
                  replacement = Option.some(substitution());
                }
                replacement.each(function (sub) {
                  GridRow.mutateCell(grid[i], j, elementnew(sub, true));
                });
              }
            };
            for (var j = 0; j < GridRow.cellLength(grid[0]); j++) {
              _loop_2(j);
            }
          };
          for (var i = index; i < grid.length; i++) {
            _loop_1(i);
          }
        });
      }
      return grid;
    };
    var MergingOperations = {
      merge: merge,
      unmerge: unmerge,
      splitRows: splitRows
    };

    var isSpanning = function (grid, row, col, comparator) {
      var candidate = GridRow.getCell(grid[row], col);
      var matching = curry(comparator, candidate.element());
      var currentRow = grid[row];
      return grid.length > 1 && GridRow.cellLength(currentRow) > 1 && (col > 0 && matching(GridRow.getCellElement(currentRow, col - 1)) || col < currentRow.cells().length - 1 && matching(GridRow.getCellElement(currentRow, col + 1)) || row > 0 && matching(GridRow.getCellElement(grid[row - 1], col)) || row < grid.length - 1 && matching(GridRow.getCellElement(grid[row + 1], col)));
    };
    var mergeTables = function (startAddress, gridA, gridB, generator, comparator) {
      var startRow = startAddress.row();
      var startCol = startAddress.column();
      var mergeHeight = gridB.length;
      var mergeWidth = GridRow.cellLength(gridB[0]);
      var endRow = startRow + mergeHeight;
      var endCol = startCol + mergeWidth;
      for (var r = startRow; r < endRow; r++) {
        for (var c = startCol; c < endCol; c++) {
          if (isSpanning(gridA, r, c, comparator)) {
            MergingOperations.unmerge(gridA, GridRow.getCellElement(gridA[r], c), comparator, generator.cell);
          }
          var newCell = GridRow.getCellElement(gridB[r - startRow], c - startCol);
          var replacement = generator.replace(newCell);
          GridRow.mutateCell(gridA[r], c, elementnew(replacement, true));
        }
      }
      return gridA;
    };
    var merge$1 = function (startAddress, gridA, gridB, generator, comparator) {
      var result = Fitment.measure(startAddress, gridA, gridB);
      return result.map(function (delta) {
        var fittedGrid = Fitment.tailor(gridA, delta, generator);
        return mergeTables(startAddress, fittedGrid, gridB, generator, comparator);
      });
    };
    var insert = function (index, gridA, gridB, generator, comparator) {
      MergingOperations.splitRows(gridA, index, comparator, generator.cell);
      var delta = Fitment.measureWidth(gridB, gridA);
      var fittedNewGrid = Fitment.tailor(gridB, delta, generator);
      var secondDelta = Fitment.measureWidth(gridA, fittedNewGrid);
      var fittedOldGrid = Fitment.tailor(gridA, secondDelta, generator);
      return fittedOldGrid.slice(0, index).concat(fittedNewGrid).concat(fittedOldGrid.slice(index, fittedOldGrid.length));
    };
    var TableMerge = {
      merge: merge$1,
      insert: insert
    };

    var insertRowAt = function (grid, index, example, comparator, substitution) {
      var before = grid.slice(0, index);
      var after = grid.slice(index);
      var between = GridRow.mapCells(grid[example], function (ex, c) {
        var withinSpan = index > 0 && index < grid.length && comparator(GridRow.getCellElement(grid[index - 1], c), GridRow.getCellElement(grid[index], c));
        var ret = withinSpan ? GridRow.getCell(grid[index], c) : elementnew(substitution(ex.element(), comparator), true);
        return ret;
      });
      return before.concat([between]).concat(after);
    };
    var insertColumnAt = function (grid, index, example, comparator, substitution) {
      return map(grid, function (row) {
        var withinSpan = index > 0 && index < GridRow.cellLength(row) && comparator(GridRow.getCellElement(row, index - 1), GridRow.getCellElement(row, index));
        var sub = withinSpan ? GridRow.getCell(row, index) : elementnew(substitution(GridRow.getCellElement(row, example), comparator), true);
        return GridRow.addCell(row, index, sub);
      });
    };
    var splitCellIntoColumns = function (grid, exampleRow, exampleCol, comparator, substitution) {
      var index = exampleCol + 1;
      return map(grid, function (row, i) {
        var isTargetCell = i === exampleRow;
        var sub = isTargetCell ? elementnew(substitution(GridRow.getCellElement(row, exampleCol), comparator), true) : GridRow.getCell(row, exampleCol);
        return GridRow.addCell(row, index, sub);
      });
    };
    var splitCellIntoRows = function (grid, exampleRow, exampleCol, comparator, substitution) {
      var index = exampleRow + 1;
      var before = grid.slice(0, index);
      var after = grid.slice(index);
      var between = GridRow.mapCells(grid[exampleRow], function (ex, i) {
        var isTargetCell = i === exampleCol;
        return isTargetCell ? elementnew(substitution(ex.element(), comparator), true) : ex;
      });
      return before.concat([between]).concat(after);
    };
    var deleteColumnsAt = function (grid, start, finish) {
      var rows = map(grid, function (row) {
        var cells = row.cells().slice(0, start).concat(row.cells().slice(finish + 1));
        return rowcells(cells, row.section());
      });
      return filter(rows, function (row) {
        return row.cells().length > 0;
      });
    };
    var deleteRowsAt = function (grid, start, finish) {
      return grid.slice(0, start).concat(grid.slice(finish + 1));
    };
    var ModificationOperations = {
      insertRowAt: insertRowAt,
      insertColumnAt: insertColumnAt,
      splitCellIntoColumns: splitCellIntoColumns,
      splitCellIntoRows: splitCellIntoRows,
      deleteRowsAt: deleteRowsAt,
      deleteColumnsAt: deleteColumnsAt
    };

    var replaceIn = function (grid, targets, comparator, substitution) {
      var isTarget = function (cell) {
        return exists(targets, function (target) {
          return comparator(cell.element(), target.element());
        });
      };
      return map(grid, function (row) {
        return GridRow.mapCells(row, function (cell) {
          return isTarget(cell) ? elementnew(substitution(cell.element(), comparator), true) : cell;
        });
      });
    };
    var notStartRow = function (grid, rowIndex, colIndex, comparator) {
      return GridRow.getCellElement(grid[rowIndex], colIndex) !== undefined && (rowIndex > 0 && comparator(GridRow.getCellElement(grid[rowIndex - 1], colIndex), GridRow.getCellElement(grid[rowIndex], colIndex)));
    };
    var notStartColumn = function (row, index, comparator) {
      return index > 0 && comparator(GridRow.getCellElement(row, index - 1), GridRow.getCellElement(row, index));
    };
    var replaceColumn = function (grid, index, comparator, substitution) {
      var targets = bind(grid, function (row, i) {
        var alreadyAdded = notStartRow(grid, i, index, comparator) || notStartColumn(row, index, comparator);
        return alreadyAdded ? [] : [GridRow.getCell(row, index)];
      });
      return replaceIn(grid, targets, comparator, substitution);
    };
    var replaceRow = function (grid, index, comparator, substitution) {
      var targetRow = grid[index];
      var targets = bind(targetRow.cells(), function (item, i) {
        var alreadyAdded = notStartRow(grid, index, i, comparator) || notStartColumn(targetRow, i, comparator);
        return alreadyAdded ? [] : [item];
      });
      return replaceIn(grid, targets, comparator, substitution);
    };
    var TransformOperations = {
      replaceColumn: replaceColumn,
      replaceRow: replaceRow
    };

    var adt = Adt.generate([
      { none: [] },
      { only: ['index'] },
      {
        left: [
          'index',
          'next'
        ]
      },
      {
        middle: [
          'prev',
          'index',
          'next'
        ]
      },
      {
        right: [
          'prev',
          'index'
        ]
      }
    ]);
    var ColumnContext = __assign({}, adt);

    var neighbours$1 = function (input, index) {
      if (input.length === 0) {
        return ColumnContext.none();
      }
      if (input.length === 1) {
        return ColumnContext.only(0);
      }
      if (index === 0) {
        return ColumnContext.left(0, 1);
      }
      if (index === input.length - 1) {
        return ColumnContext.right(index - 1, index);
      }
      if (index > 0 && index < input.length - 1) {
        return ColumnContext.middle(index - 1, index, index + 1);
      }
      return ColumnContext.none();
    };
    var determine = function (input, column, step, tableSize) {
      var result = input.slice(0);
      var context = neighbours$1(input, column);
      var zero = function (array) {
        return map(array, constant(0));
      };
      var onNone = constant(zero(result));
      var onOnly = function (index) {
        return tableSize.singleColumnWidth(result[index], step);
      };
      var onChange = function (index, next) {
        if (step >= 0) {
          var newNext = Math.max(tableSize.minCellWidth(), result[next] - step);
          return zero(result.slice(0, index)).concat([
            step,
            newNext - result[next]
          ]).concat(zero(result.slice(next + 1)));
        } else {
          var newThis = Math.max(tableSize.minCellWidth(), result[index] + step);
          var diffx = result[index] - newThis;
          return zero(result.slice(0, index)).concat([
            newThis - result[index],
            diffx
          ]).concat(zero(result.slice(next + 1)));
        }
      };
      var onLeft = onChange;
      var onMiddle = function (_prev, index, next) {
        return onChange(index, next);
      };
      var onRight = function (_prev, index) {
        if (step >= 0) {
          return zero(result.slice(0, index)).concat([step]);
        } else {
          var size = Math.max(tableSize.minCellWidth(), result[index] + step);
          return zero(result.slice(0, index)).concat([size - result[index]]);
        }
      };
      return context.fold(onNone, onOnly, onLeft, onMiddle, onRight);
    };
    var Deltas = { determine: determine };

    var getSpan$1 = function (cell, type) {
      return has$1(cell, type) && parseInt(get$1(cell, type), 10) > 1;
    };
    var hasColspan = function (cell) {
      return getSpan$1(cell, 'colspan');
    };
    var hasRowspan = function (cell) {
      return getSpan$1(cell, 'rowspan');
    };
    var getInt = function (element, property) {
      return parseInt(get$2(element, property), 10);
    };
    var CellUtils = {
      hasColspan: hasColspan,
      hasRowspan: hasRowspan,
      minWidth: constant(10),
      minHeight: constant(10),
      getInt: getInt
    };

    var getRaw$1 = function (cell, property, getter) {
      return getRaw(cell, property).fold(function () {
        return getter(cell) + 'px';
      }, function (raw) {
        return raw;
      });
    };
    var getRawW = function (cell, tableSize) {
      return getRaw$1(cell, 'width', function (e) {
        return Sizes.getPixelWidth(e, tableSize);
      });
    };
    var getRawH = function (cell) {
      return getRaw$1(cell, 'height', Sizes.getHeight);
    };
    var getWidthFrom = function (warehouse, direction, getWidth, fallback, tableSize) {
      var columns = Blocks.columns(warehouse);
      var backups = map(columns, function (cellOption) {
        return cellOption.map(direction.edge);
      });
      return map(columns, function (cellOption, c) {
        var columnCell = cellOption.filter(not(CellUtils.hasColspan));
        return columnCell.fold(function () {
          var deduced = deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getWidth(cell, tableSize);
        });
      });
    };
    var getDeduced = function (deduced) {
      return deduced.map(function (d) {
        return d + 'px';
      }).getOr('');
    };
    var getRawWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, getRawW, getDeduced, tableSize);
    };
    var getPercentageWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, Sizes.getPercentageWidth, function (deduced) {
        return deduced.fold(function () {
          return tableSize.minCellWidth();
        }, function (cellWidth) {
          return cellWidth / tableSize.pixelWidth() * 100;
        });
      }, tableSize);
    };
    var getPixelWidths = function (warehouse, direction, tableSize) {
      return getWidthFrom(warehouse, direction, Sizes.getPixelWidth, function (deduced) {
        return deduced.getOrThunk(tableSize.minCellWidth);
      }, tableSize);
    };
    var getHeightFrom = function (warehouse, direction, getHeight, fallback) {
      var rows = Blocks.rows(warehouse);
      var backups = map(rows, function (cellOption) {
        return cellOption.map(direction.edge);
      });
      return map(rows, function (cellOption, c) {
        var rowCell = cellOption.filter(not(CellUtils.hasRowspan));
        return rowCell.fold(function () {
          var deduced = deduce(backups, c);
          return fallback(deduced);
        }, function (cell) {
          return getHeight(cell);
        });
      });
    };
    var getPixelHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, Sizes.getHeight, function (deduced) {
        return deduced.getOrThunk(CellUtils.minHeight);
      });
    };
    var getRawHeights = function (warehouse, direction) {
      return getHeightFrom(warehouse, direction, getRawH, getDeduced);
    };
    var ColumnSizes = {
      getRawWidths: getRawWidths,
      getPixelWidths: getPixelWidths,
      getPercentageWidths: getPercentageWidths,
      getPixelHeights: getPixelHeights,
      getRawHeights: getRawHeights
    };

    var total = function (start, end, measures) {
      var r = 0;
      for (var i = start; i < end; i++) {
        r += measures[i] !== undefined ? measures[i] : 0;
      }
      return r;
    };
    var recalculateWidth = function (warehouse, widths) {
      var all = Warehouse.justCells(warehouse);
      return map(all, function (cell) {
        var width = total(cell.column(), cell.column() + cell.colspan(), widths);
        return {
          element: cell.element,
          width: constant(width),
          colspan: cell.colspan
        };
      });
    };
    var recalculateHeight = function (warehouse, heights) {
      var all = Warehouse.justCells(warehouse);
      return map(all, function (cell) {
        var height = total(cell.row(), cell.row() + cell.rowspan(), heights);
        return {
          element: cell.element,
          height: constant(height),
          rowspan: cell.rowspan
        };
      });
    };
    var matchRowHeight = function (warehouse, heights) {
      return map(warehouse.all(), function (row, i) {
        return {
          element: row.element,
          height: constant(heights[i])
        };
      });
    };
    var Recalculations = {
      recalculateWidth: recalculateWidth,
      recalculateHeight: recalculateHeight,
      matchRowHeight: matchRowHeight
    };

    var percentageSize = function (width, element) {
      var floatWidth = parseFloat(width);
      var pixelWidth = get$5(element);
      var getCellDelta = function (delta) {
        return delta / pixelWidth * 100;
      };
      var singleColumnWidth = function (w, _delta) {
        return [100 - w];
      };
      var minCellWidth = function () {
        return CellUtils.minWidth() / pixelWidth * 100;
      };
      var setTableWidth = function (table, _newWidths, delta) {
        var ratio = delta / 100;
        var change = ratio * floatWidth;
        Sizes.setPercentageWidth(table, floatWidth + change);
      };
      return {
        width: constant(floatWidth),
        pixelWidth: constant(pixelWidth),
        getWidths: ColumnSizes.getPercentageWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: minCellWidth,
        setElementWidth: Sizes.setPercentageWidth,
        setTableWidth: setTableWidth
      };
    };
    var pixelSize = function (width) {
      var getCellDelta = identity;
      var singleColumnWidth = function (w, delta) {
        var newNext = Math.max(CellUtils.minWidth(), w + delta);
        return [newNext - w];
      };
      var setTableWidth = function (table, newWidths, _delta) {
        var total = foldr(newWidths, function (b, a) {
          return b + a;
        }, 0);
        Sizes.setPixelWidth(table, total);
      };
      return {
        width: constant(width),
        pixelWidth: constant(width),
        getWidths: ColumnSizes.getPixelWidths,
        getCellDelta: getCellDelta,
        singleColumnWidth: singleColumnWidth,
        minCellWidth: CellUtils.minWidth,
        setElementWidth: Sizes.setPixelWidth,
        setTableWidth: setTableWidth
      };
    };
    var chooseSize = function (element, width) {
      var percentMatch = Sizes.percentageBasedSizeRegex().exec(width);
      if (percentMatch !== null) {
        return percentageSize(percentMatch[1], element);
      }
      var pixelMatch = Sizes.pixelBasedSizeRegex().exec(width);
      if (pixelMatch !== null) {
        var intWidth = parseInt(pixelMatch[1], 10);
        return pixelSize(intWidth);
      }
      var fallbackWidth = get$5(element);
      return pixelSize(fallbackWidth);
    };
    var getTableSize = function (element) {
      var width = Sizes.getRawWidth(element);
      return width.fold(function () {
        var fallbackWidth = get$5(element);
        return pixelSize(fallbackWidth);
      }, function (w) {
        return chooseSize(element, w);
      });
    };
    var TableSize = { getTableSize: getTableSize };

    var getWarehouse$1 = function (list) {
      return Warehouse.generate(list);
    };
    var sumUp = function (newSize) {
      return foldr(newSize, function (b, a) {
        return b + a;
      }, 0);
    };
    var getTableWarehouse = function (table) {
      var list = DetailsList.fromTable(table);
      return getWarehouse$1(list);
    };
    var adjustWidth = function (table, delta, index, direction) {
      var tableSize = TableSize.getTableSize(table);
      var step = tableSize.getCellDelta(delta);
      var warehouse = getTableWarehouse(table);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);
      var deltas = Deltas.determine(widths, index, step, tableSize);
      var newWidths = map(deltas, function (dx, i) {
        return dx + widths[i];
      });
      var newSizes = Recalculations.recalculateWidth(warehouse, newWidths);
      each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element(), cell.width());
      });
      if (index === warehouse.grid().columns() - 1) {
        tableSize.setTableWidth(table, newWidths, step);
      }
    };
    var adjustHeight = function (table, delta, index, direction) {
      var warehouse = getTableWarehouse(table);
      var heights = ColumnSizes.getPixelHeights(warehouse, direction);
      var newHeights = map(heights, function (dy, i) {
        return index === i ? Math.max(delta + dy, CellUtils.minHeight()) : dy;
      });
      var newCellSizes = Recalculations.recalculateHeight(warehouse, newHeights);
      var newRowSizes = Recalculations.matchRowHeight(warehouse, newHeights);
      each(newRowSizes, function (row) {
        Sizes.setHeight(row.element(), row.height());
      });
      each(newCellSizes, function (cell) {
        Sizes.setHeight(cell.element(), cell.height());
      });
      var total = sumUp(newHeights);
      Sizes.setHeight(table, total);
    };
    var adjustWidthTo = function (table, list, direction) {
      var tableSize = TableSize.getTableSize(table);
      var warehouse = getWarehouse$1(list);
      var widths = tableSize.getWidths(warehouse, direction, tableSize);
      var newSizes = Recalculations.recalculateWidth(warehouse, widths);
      each(newSizes, function (cell) {
        tableSize.setElementWidth(cell.element(), cell.width());
      });
      if (newSizes.length > 0) {
        tableSize.setTableWidth(table, widths, tableSize.getCellDelta(0));
      }
    };
    var Adjustments = {
      adjustWidth: adjustWidth,
      adjustHeight: adjustHeight,
      adjustWidthTo: adjustWidthTo
    };

    var base = function (handleUnsupported, required) {
      return baseWith(handleUnsupported, required, {
        validate: isFunction,
        label: 'function'
      });
    };
    var baseWith = function (handleUnsupported, required, pred) {
      if (required.length === 0) {
        throw new Error('You must specify at least one required field.');
      }
      validateStrArr('required', required);
      checkDupes(required);
      return function (obj) {
        var keys$1 = keys(obj);
        var allReqd = forall(required, function (req) {
          return contains(keys$1, req);
        });
        if (!allReqd) {
          reqMessage(required, keys$1);
        }
        handleUnsupported(required, keys$1);
        var invalidKeys = filter(required, function (key) {
          return !pred.validate(obj[key], key);
        });
        if (invalidKeys.length > 0) {
          invalidTypeMessage(invalidKeys, pred.label);
        }
        return obj;
      };
    };
    var handleExact = function (required, keys) {
      var unsupported = filter(keys, function (key) {
        return !contains(required, key);
      });
      if (unsupported.length > 0) {
        unsuppMessage(unsupported);
      }
    };
    var exactly = function (required) {
      return base(handleExact, required);
    };

    var verifyGenerators = exactly([
      'cell',
      'row',
      'replace',
      'gap'
    ]);
    var elementToData = function (element) {
      var colspan = has$1(element, 'colspan') ? parseInt(get$1(element, 'colspan'), 10) : 1;
      var rowspan = has$1(element, 'rowspan') ? parseInt(get$1(element, 'rowspan'), 10) : 1;
      return {
        element: constant(element),
        colspan: constant(colspan),
        rowspan: constant(rowspan)
      };
    };
    var modification = function (generators, toData) {
      if (toData === void 0) {
        toData = elementToData;
      }
      verifyGenerators(generators);
      var position = Cell(Option.none());
      var nu = function (data) {
        return generators.cell(data);
      };
      var nuFrom = function (element) {
        var data = toData(element);
        return nu(data);
      };
      var add = function (element) {
        var replacement = nuFrom(element);
        if (position.get().isNone()) {
          position.set(Option.some(replacement));
        }
        recent = Option.some({
          item: element,
          replacement: replacement
        });
        return replacement;
      };
      var recent = Option.none();
      var getOrInit = function (element, comparator) {
        return recent.fold(function () {
          return add(element);
        }, function (p) {
          return comparator(element, p.item) ? p.replacement : add(element);
        });
      };
      return {
        getOrInit: getOrInit,
        cursor: position.get
      };
    };
    var transform = function (scope, tag) {
      return function (generators) {
        var position = Cell(Option.none());
        verifyGenerators(generators);
        var list = [];
        var find$1 = function (element, comparator) {
          return find(list, function (x) {
            return comparator(x.item, element);
          });
        };
        var makeNew = function (element) {
          var attrs = { scope: scope };
          var cell = generators.replace(element, tag, attrs);
          list.push({
            item: element,
            sub: cell
          });
          if (position.get().isNone()) {
            position.set(Option.some(cell));
          }
          return cell;
        };
        var replaceOrInit = function (element, comparator) {
          return find$1(element, comparator).fold(function () {
            return makeNew(element);
          }, function (p) {
            return comparator(element, p.item) ? p.sub : makeNew(element);
          });
        };
        return {
          replaceOrInit: replaceOrInit,
          cursor: position.get
        };
      };
    };
    var merging = function (generators) {
      verifyGenerators(generators);
      var position = Cell(Option.none());
      var combine = function (cell) {
        if (position.get().isNone()) {
          position.set(Option.some(cell));
        }
        return function () {
          var raw = generators.cell({
            element: constant(cell),
            colspan: constant(1),
            rowspan: constant(1)
          });
          remove$1(raw, 'width');
          remove$1(cell, 'width');
          return raw;
        };
      };
      return {
        combine: combine,
        cursor: position.get
      };
    };
    var Generators = {
      modification: modification,
      transform: transform,
      merging: merging
    };

    var blockList = [
      'body',
      'p',
      'div',
      'article',
      'aside',
      'figcaption',
      'figure',
      'footer',
      'header',
      'nav',
      'section',
      'ol',
      'ul',
      'table',
      'thead',
      'tfoot',
      'tbody',
      'caption',
      'tr',
      'td',
      'th',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'pre',
      'address'
    ];
    var isList = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains([
        'ol',
        'ul'
      ], tagName);
    };
    var isBlock = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains(blockList, tagName);
    };
    var isFormatting = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains([
        'address',
        'pre',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ], tagName);
    };
    var isHeading = function (universe, item) {
      var tagName = universe.property().name(item);
      return contains([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ], tagName);
    };
    var isContainer = function (universe, item) {
      return contains([
        'div',
        'li',
        'td',
        'th',
        'blockquote',
        'body',
        'caption'
      ], universe.property().name(item));
    };
    var isEmptyTag = function (universe, item) {
      return contains([
        'br',
        'img',
        'hr',
        'input'
      ], universe.property().name(item));
    };
    var isFrame = function (universe, item) {
      return universe.property().name(item) === 'iframe';
    };
    var isInline = function (universe, item) {
      return !(isBlock(universe, item) || isEmptyTag(universe, item)) && universe.property().name(item) !== 'li';
    };
    var Structure = {
      isBlock: isBlock,
      isList: isList,
      isFormatting: isFormatting,
      isHeading: isHeading,
      isContainer: isContainer,
      isEmptyTag: isEmptyTag,
      isFrame: isFrame,
      isInline: isInline
    };

    var universe$1 = DomUniverse();
    var isBlock$1 = function (element) {
      return Structure.isBlock(universe$1, element);
    };
    var isList$1 = function (element) {
      return Structure.isList(universe$1, element);
    };
    var isFormatting$1 = function (element) {
      return Structure.isFormatting(universe$1, element);
    };
    var isHeading$1 = function (element) {
      return Structure.isHeading(universe$1, element);
    };
    var isContainer$1 = function (element) {
      return Structure.isContainer(universe$1, element);
    };
    var isEmptyTag$1 = function (element) {
      return Structure.isEmptyTag(universe$1, element);
    };
    var isFrame$1 = function (element) {
      return Structure.isFrame(universe$1, element);
    };
    var isInline$1 = function (element) {
      return Structure.isInline(universe$1, element);
    };
    var DomStructure = {
      isBlock: isBlock$1,
      isList: isList$1,
      isFormatting: isFormatting$1,
      isHeading: isHeading$1,
      isContainer: isContainer$1,
      isEmptyTag: isEmptyTag$1,
      isFrame: isFrame$1,
      isInline: isInline$1
    };

    var merge$2 = function (cells) {
      var isBr = function (el) {
        return name(el) === 'br';
      };
      var advancedBr = function (children) {
        return forall(children, function (c) {
          return isBr(c) || isText(c) && get$3(c).trim().length === 0;
        });
      };
      var isListItem = function (el) {
        return name(el) === 'li' || ancestor(el, DomStructure.isList).isSome();
      };
      var siblingIsBlock = function (el) {
        return nextSibling(el).map(function (rightSibling) {
          if (DomStructure.isBlock(rightSibling)) {
            return true;
          }
          if (DomStructure.isEmptyTag(rightSibling)) {
            return name(rightSibling) === 'img' ? false : true;
          }
          return false;
        }).getOr(false);
      };
      var markCell = function (cell) {
        return last$1(cell).bind(function (rightEdge) {
          var rightSiblingIsBlock = siblingIsBlock(rightEdge);
          return parent(rightEdge).map(function (parent) {
            return rightSiblingIsBlock === true || isListItem(parent) || isBr(rightEdge) || DomStructure.isBlock(parent) && !eq(cell, parent) ? [] : [Element.fromTag('br')];
          });
        }).getOr([]);
      };
      var markContent = function () {
        var content = bind(cells, function (cell) {
          var children$1 = children(cell);
          return advancedBr(children$1) ? [] : children$1.concat(markCell(cell));
        });
        return content.length === 0 ? [Element.fromTag('br')] : content;
      };
      var contents = markContent();
      empty(cells[0]);
      append$1(cells[0], contents);
    };
    var TableContent = { merge: merge$2 };

    var prune = function (table) {
      var cells = TableLookup.cells(table);
      if (cells.length === 0) {
        remove$2(table);
      }
    };
    var outcome = Immutable('grid', 'cursor');
    var elementFromGrid = function (grid, row, column) {
      return findIn(grid, row, column).orThunk(function () {
        return findIn(grid, 0, 0);
      });
    };
    var findIn = function (grid, row, column) {
      return Option.from(grid[row]).bind(function (r) {
        return Option.from(r.cells()[column]).bind(function (c) {
          return Option.from(c.element());
        });
      });
    };
    var bundle = function (grid, row, column) {
      return outcome(grid, findIn(grid, row, column));
    };
    var uniqueRows = function (details) {
      return foldl(details, function (rest, detail) {
        return exists(rest, function (currentDetail) {
          return currentDetail.row() === detail.row();
        }) ? rest : rest.concat([detail]);
      }, []).sort(function (detailA, detailB) {
        return detailA.row() - detailB.row();
      });
    };
    var uniqueColumns = function (details) {
      return foldl(details, function (rest, detail) {
        return exists(rest, function (currentDetail) {
          return currentDetail.column() === detail.column();
        }) ? rest : rest.concat([detail]);
      }, []).sort(function (detailA, detailB) {
        return detailA.column() - detailB.column();
      });
    };
    var insertRowBefore = function (grid, detail, comparator, genWrappers) {
      var example = detail.row();
      var targetIndex = detail.row();
      var newGrid = ModificationOperations.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, targetIndex, detail.column());
    };
    var insertRowsBefore = function (grid, details, comparator, genWrappers) {
      var example = details[0].row();
      var targetIndex = details[0].row();
      var rows = uniqueRows(details);
      var newGrid = foldl(rows, function (newG, _row) {
        return ModificationOperations.insertRowAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };
    var insertRowAfter = function (grid, detail, comparator, genWrappers) {
      var example = detail.row();
      var targetIndex = detail.row() + detail.rowspan();
      var newGrid = ModificationOperations.insertRowAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, targetIndex, detail.column());
    };
    var insertRowsAfter = function (grid, details, comparator, genWrappers) {
      var rows = uniqueRows(details);
      var example = rows[rows.length - 1].row();
      var targetIndex = rows[rows.length - 1].row() + rows[rows.length - 1].rowspan();
      var newGrid = foldl(rows, function (newG, _row) {
        return ModificationOperations.insertRowAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, targetIndex, details[0].column());
    };
    var insertColumnBefore = function (grid, detail, comparator, genWrappers) {
      var example = detail.column();
      var targetIndex = detail.column();
      var newGrid = ModificationOperations.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), targetIndex);
    };
    var insertColumnsBefore = function (grid, details, comparator, genWrappers) {
      var columns = uniqueColumns(details);
      var example = columns[0].column();
      var targetIndex = columns[0].column();
      var newGrid = foldl(columns, function (newG, _row) {
        return ModificationOperations.insertColumnAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };
    var insertColumnAfter = function (grid, detail, comparator, genWrappers) {
      var example = detail.column();
      var targetIndex = detail.column() + detail.colspan();
      var newGrid = ModificationOperations.insertColumnAt(grid, targetIndex, example, comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), targetIndex);
    };
    var insertColumnsAfter = function (grid, details, comparator, genWrappers) {
      var example = details[details.length - 1].column();
      var targetIndex = details[details.length - 1].column() + details[details.length - 1].colspan();
      var columns = uniqueColumns(details);
      var newGrid = foldl(columns, function (newG, _row) {
        return ModificationOperations.insertColumnAt(newG, targetIndex, example, comparator, genWrappers.getOrInit);
      }, grid);
      return bundle(newGrid, details[0].row(), targetIndex);
    };
    var makeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var makeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var unmakeRowHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceRow(grid, detail.row(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var unmakeColumnHeader = function (grid, detail, comparator, genWrappers) {
      var newGrid = TransformOperations.replaceColumn(grid, detail.column(), comparator, genWrappers.replaceOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var splitCellIntoColumns$1 = function (grid, detail, comparator, genWrappers) {
      var newGrid = ModificationOperations.splitCellIntoColumns(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var splitCellIntoRows$1 = function (grid, detail, comparator, genWrappers) {
      var newGrid = ModificationOperations.splitCellIntoRows(grid, detail.row(), detail.column(), comparator, genWrappers.getOrInit);
      return bundle(newGrid, detail.row(), detail.column());
    };
    var eraseColumns = function (grid, details, _comparator, _genWrappers) {
      var columns = uniqueColumns(details);
      var newGrid = ModificationOperations.deleteColumnsAt(grid, columns[0].column(), columns[columns.length - 1].column());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };
    var eraseRows = function (grid, details, _comparator, _genWrappers) {
      var rows = uniqueRows(details);
      var newGrid = ModificationOperations.deleteRowsAt(grid, rows[0].row(), rows[rows.length - 1].row());
      var cursor = elementFromGrid(newGrid, details[0].row(), details[0].column());
      return outcome(newGrid, cursor);
    };
    var mergeCells = function (grid, mergable, comparator, _genWrappers) {
      var cells = mergable.cells();
      TableContent.merge(cells);
      var newGrid = MergingOperations.merge(grid, mergable.bounds(), comparator, constant(cells[0]));
      return outcome(newGrid, Option.from(cells[0]));
    };
    var unmergeCells = function (grid, unmergable, comparator, genWrappers) {
      var newGrid = foldr(unmergable, function (b, cell) {
        return MergingOperations.unmerge(b, cell, comparator, genWrappers.combine(cell));
      }, grid);
      return outcome(newGrid, Option.from(unmergable[0]));
    };
    var pasteCells = function (grid, pasteDetails, comparator, _genWrappers) {
      var gridify = function (table, generators) {
        var list = DetailsList.fromTable(table);
        var wh = Warehouse.generate(list);
        return Transitions.toGrid(wh, generators, true);
      };
      var gridB = gridify(pasteDetails.clipboard(), pasteDetails.generators());
      var startAddress = address(pasteDetails.row(), pasteDetails.column());
      var mergedGrid = TableMerge.merge(startAddress, grid, gridB, pasteDetails.generators(), comparator);
      return mergedGrid.fold(function () {
        return outcome(grid, Option.some(pasteDetails.element()));
      }, function (nuGrid) {
        var cursor = elementFromGrid(nuGrid, pasteDetails.row(), pasteDetails.column());
        return outcome(nuGrid, cursor);
      });
    };
    var gridifyRows = function (rows, generators, example) {
      var pasteDetails = DetailsList.fromPastedRows(rows, example);
      var wh = Warehouse.generate(pasteDetails);
      return Transitions.toGrid(wh, generators, true);
    };
    var pasteRowsBefore = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[0].row();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = TableMerge.insert(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var pasteRowsAfter = function (grid, pasteDetails, comparator, _genWrappers) {
      var example = grid[pasteDetails.cells[0].row()];
      var index = pasteDetails.cells[pasteDetails.cells.length - 1].row() + pasteDetails.cells[pasteDetails.cells.length - 1].rowspan();
      var gridB = gridifyRows(pasteDetails.clipboard(), pasteDetails.generators(), example);
      var mergedGrid = TableMerge.insert(index, grid, gridB, pasteDetails.generators(), comparator);
      var cursor = elementFromGrid(mergedGrid, pasteDetails.cells[0].row(), pasteDetails.cells[0].column());
      return outcome(mergedGrid, cursor);
    };
    var resize = Adjustments.adjustWidthTo;
    var TableOperations = {
      insertRowBefore: run(insertRowBefore, onCell, noop, noop, Generators.modification),
      insertRowsBefore: run(insertRowsBefore, onCells, noop, noop, Generators.modification),
      insertRowAfter: run(insertRowAfter, onCell, noop, noop, Generators.modification),
      insertRowsAfter: run(insertRowsAfter, onCells, noop, noop, Generators.modification),
      insertColumnBefore: run(insertColumnBefore, onCell, resize, noop, Generators.modification),
      insertColumnsBefore: run(insertColumnsBefore, onCells, resize, noop, Generators.modification),
      insertColumnAfter: run(insertColumnAfter, onCell, resize, noop, Generators.modification),
      insertColumnsAfter: run(insertColumnsAfter, onCells, resize, noop, Generators.modification),
      splitCellIntoColumns: run(splitCellIntoColumns$1, onCell, resize, noop, Generators.modification),
      splitCellIntoRows: run(splitCellIntoRows$1, onCell, noop, noop, Generators.modification),
      eraseColumns: run(eraseColumns, onCells, resize, prune, Generators.modification),
      eraseRows: run(eraseRows, onCells, noop, prune, Generators.modification),
      makeColumnHeader: run(makeColumnHeader, onCell, noop, noop, Generators.transform('row', 'th')),
      unmakeColumnHeader: run(unmakeColumnHeader, onCell, noop, noop, Generators.transform(null, 'td')),
      makeRowHeader: run(makeRowHeader, onCell, noop, noop, Generators.transform('col', 'th')),
      unmakeRowHeader: run(unmakeRowHeader, onCell, noop, noop, Generators.transform(null, 'td')),
      mergeCells: run(mergeCells, onMergable, noop, noop, Generators.merging),
      unmergeCells: run(unmergeCells, onUnmergable, resize, noop, Generators.merging),
      pasteCells: run(pasteCells, onPaste, resize, noop, Generators.modification),
      pasteRowsBefore: run(pasteRowsBefore, onPasteRows, noop, noop, Generators.modification),
      pasteRowsAfter: run(pasteRowsAfter, onPasteRows, noop, noop, Generators.modification)
    };

    var getBody$1 = function (editor) {
      return Element.fromDom(editor.getBody());
    };
    var getPixelWidth$1 = function (elm) {
      return elm.getBoundingClientRect().width;
    };
    var getPixelHeight = function (elm) {
      return elm.getBoundingClientRect().height;
    };
    var getIsRoot = function (editor) {
      return function (element) {
        return eq(element, getBody$1(editor));
      };
    };
    var removePxSuffix = function (size) {
      return size ? size.replace(/px$/, '') : '';
    };
    var addSizeSuffix = function (size) {
      if (/^[0-9]+$/.test(size)) {
        size += 'px';
      }
      return size;
    };
    var removeDataStyle = function (table) {
      var dataStyleCells = descendants$1(table, 'td[data-mce-style],th[data-mce-style]');
      remove(table, 'data-mce-style');
      each(dataStyleCells, function (cell) {
        remove(cell, 'data-mce-style');
      });
    };

    var getDirection = function (element) {
      return get$2(element, 'direction') === 'rtl' ? 'rtl' : 'ltr';
    };

    var ltr$1 = { isRtl: constant(false) };
    var rtl$1 = { isRtl: constant(true) };
    var directionAt = function (element) {
      var dir = getDirection(element);
      return dir === 'rtl' ? rtl$1 : ltr$1;
    };
    var Direction = { directionAt: directionAt };

    var defaultTableToolbar = 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol';
    var defaultStyles = {
      'border-collapse': 'collapse',
      'width': '100%'
    };
    var defaultAttributes = { border: '1' };
    var getDefaultAttributes = function (editor) {
      return editor.getParam('table_default_attributes', defaultAttributes, 'object');
    };
    var getDefaultStyles = function (editor) {
      return editor.getParam('table_default_styles', defaultStyles, 'object');
    };
    var hasTableResizeBars = function (editor) {
      return editor.getParam('table_resize_bars', true, 'boolean');
    };
    var hasTabNavigation = function (editor) {
      return editor.getParam('table_tab_navigation', true, 'boolean');
    };
    var hasAdvancedCellTab = function (editor) {
      return editor.getParam('table_cell_advtab', true, 'boolean');
    };
    var hasAdvancedRowTab = function (editor) {
      return editor.getParam('table_row_advtab', true, 'boolean');
    };
    var hasAdvancedTableTab = function (editor) {
      return editor.getParam('table_advtab', true, 'boolean');
    };
    var hasAppearanceOptions = function (editor) {
      return editor.getParam('table_appearance_options', true, 'boolean');
    };
    var hasTableGrid = function (editor) {
      return editor.getParam('table_grid', true, 'boolean');
    };
    var shouldStyleWithCss = function (editor) {
      return editor.getParam('table_style_by_css', false, 'boolean');
    };
    var getCellClassList = function (editor) {
      return editor.getParam('table_cell_class_list', [], 'array');
    };
    var getRowClassList = function (editor) {
      return editor.getParam('table_row_class_list', [], 'array');
    };
    var getTableClassList = function (editor) {
      return editor.getParam('table_class_list', [], 'array');
    };
    var isPercentagesForced = function (editor) {
      return editor.getParam('table_responsive_width') === true;
    };
    var isPixelsForced = function (editor) {
      return editor.getParam('table_responsive_width') === false;
    };
    var getToolbar = function (editor) {
      return editor.getParam('table_toolbar', defaultTableToolbar);
    };
    var getCloneElements = function (editor) {
      var cloneElements = editor.getParam('table_clone_elements');
      if (isString(cloneElements)) {
        return Option.some(cloneElements.split(/[ ,]/));
      } else if (Array.isArray(cloneElements)) {
        return Option.some(cloneElements);
      } else {
        return Option.none();
      }
    };
    var hasObjectResizing = function (editor) {
      var objectResizing = editor.getParam('object_resizing', true);
      return isString(objectResizing) ? objectResizing === 'table' : objectResizing;
    };

    var fireNewRow = function (editor, row) {
      return editor.fire('newrow', { node: row });
    };
    var fireNewCell = function (editor, cell) {
      return editor.fire('newcell', { node: cell });
    };
    var fireObjectResizeStart = function (editor, target, width, height) {
      editor.fire('ObjectResizeStart', {
        target: target,
        width: width,
        height: height
      });
    };
    var fireObjectResized = function (editor, target, width, height) {
      editor.fire('ObjectResized', {
        target: target,
        width: width,
        height: height
      });
    };
    var fireTableSelectionChange = function (editor, cells, start, finish, otherCells) {
      editor.fire('TableSelectionChange', {
        cells: cells,
        start: start,
        finish: finish,
        otherCells: otherCells
      });
    };
    var fireTableSelectionClear = function (editor) {
      editor.fire('TableSelectionClear');
    };

    var TableActions = function (editor, lazyWire) {
      var isTableBody = function (editor) {
        return name(getBody$1(editor)) === 'table';
      };
      var lastRowGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.rows() > 1;
      };
      var lastColumnGuard = function (table) {
        var size = TableGridSize.getGridSize(table);
        return isTableBody(editor) === false || size.columns() > 1;
      };
      var cloneFormats = getCloneElements(editor);
      var execute = function (operation, guard, mutate, lazyWire) {
        return function (table, target) {
          removeDataStyle(table);
          var wire = lazyWire();
          var doc = Element.fromDom(editor.getDoc());
          var direction = TableDirection(Direction.directionAt);
          var generators = TableFill.cellOperations(mutate, doc, cloneFormats);
          return guard(table) ? operation(wire, table, target, generators, direction).bind(function (result) {
            each(result.newRows(), function (row) {
              fireNewRow(editor, row.dom());
            });
            each(result.newCells(), function (cell) {
              fireNewCell(editor, cell.dom());
            });
            return result.cursor().map(function (cell) {
              var rng = editor.dom.createRng();
              rng.setStart(cell.dom(), 0);
              rng.setEnd(cell.dom(), 0);
              return rng;
            });
          }) : Option.none();
        };
      };
      var deleteRow = execute(TableOperations.eraseRows, lastRowGuard, noop, lazyWire);
      var deleteColumn = execute(TableOperations.eraseColumns, lastColumnGuard, noop, lazyWire);
      var insertRowsBefore = execute(TableOperations.insertRowsBefore, always, noop, lazyWire);
      var insertRowsAfter = execute(TableOperations.insertRowsAfter, always, noop, lazyWire);
      var insertColumnsBefore = execute(TableOperations.insertColumnsBefore, always, CellMutations.halve, lazyWire);
      var insertColumnsAfter = execute(TableOperations.insertColumnsAfter, always, CellMutations.halve, lazyWire);
      var mergeCells = execute(TableOperations.mergeCells, always, noop, lazyWire);
      var unmergeCells = execute(TableOperations.unmergeCells, always, noop, lazyWire);
      var pasteRowsBefore = execute(TableOperations.pasteRowsBefore, always, noop, lazyWire);
      var pasteRowsAfter = execute(TableOperations.pasteRowsAfter, always, noop, lazyWire);
      var pasteCells = execute(TableOperations.pasteCells, always, noop, lazyWire);
      return {
        deleteRow: deleteRow,
        deleteColumn: deleteColumn,
        insertRowsBefore: insertRowsBefore,
        insertRowsAfter: insertRowsAfter,
        insertColumnsBefore: insertColumnsBefore,
        insertColumnsAfter: insertColumnsAfter,
        mergeCells: mergeCells,
        unmergeCells: unmergeCells,
        pasteRowsBefore: pasteRowsBefore,
        pasteRowsAfter: pasteRowsAfter,
        pasteCells: pasteCells
      };
    };

    var copyRows = function (table, target, generators) {
      var list = DetailsList.fromTable(table);
      var house = Warehouse.generate(list);
      var details = onCells(house, target);
      return details.map(function (selectedCells) {
        var grid = Transitions.toGrid(house, generators, false);
        var slicedGrid = grid.slice(selectedCells[0].row(), selectedCells[selectedCells.length - 1].row() + selectedCells[selectedCells.length - 1].rowspan());
        var slicedDetails = toDetailList(slicedGrid, generators);
        return Redraw.copy(slicedDetails);
      });
    };
    var CopyRows = { copyRows: copyRows };

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var getTDTHOverallStyle = function (dom, elm, name) {
      var cells = dom.select('td,th', elm);
      var firstChildStyle;
      var checkChildren = function (firstChildStyle, elms) {
        for (var i = 0; i < elms.length; i++) {
          var currentStyle = dom.getStyle(elms[i], name);
          if (typeof firstChildStyle === 'undefined') {
            firstChildStyle = currentStyle;
          }
          if (firstChildStyle !== currentStyle) {
            return '';
          }
        }
        return firstChildStyle;
      };
      firstChildStyle = checkChildren(firstChildStyle, cells);
      return firstChildStyle;
    };
    var applyAlign = function (editor, elm, name) {
      if (name) {
        editor.formatter.apply('align' + name, {}, elm);
      }
    };
    var applyVAlign = function (editor, elm, name) {
      if (name) {
        editor.formatter.apply('valign' + name, {}, elm);
      }
    };
    var unApplyAlign = function (editor, elm) {
      global$1.each('left center right'.split(' '), function (name) {
        editor.formatter.remove('align' + name, {}, elm);
      });
    };
    var unApplyVAlign = function (editor, elm) {
      global$1.each('top middle bottom'.split(' '), function (name) {
        editor.formatter.remove('valign' + name, {}, elm);
      });
    };
    var Styles$1 = {
      applyAlign: applyAlign,
      applyVAlign: applyVAlign,
      unApplyAlign: unApplyAlign,
      unApplyVAlign: unApplyVAlign,
      getTDTHOverallStyle: getTDTHOverallStyle
    };

    var buildListItems = function (inputList, itemCallback, startItems) {
      var appendItems = function (values, output) {
        output = output || [];
        global$1.each(values, function (item) {
          var menuItem = { text: item.text || item.title };
          if (item.menu) {
            menuItem.menu = appendItems(item.menu);
          } else {
            menuItem.value = item.value;
            if (itemCallback) {
              itemCallback(menuItem);
            }
          }
          output.push(menuItem);
        });
        return output;
      };
      return appendItems(inputList, startItems || []);
    };
    var extractAdvancedStyles = function (dom, elm) {
      var rgbToHex = function (value) {
        return startsWith(value, 'rgb') ? dom.toHex(value) : value;
      };
      var borderWidth = getRaw(Element.fromDom(elm), 'border-width').getOr('');
      var borderStyle = getRaw(Element.fromDom(elm), 'border-style').getOr('');
      var borderColor = getRaw(Element.fromDom(elm), 'border-color').map(rgbToHex).getOr('');
      var bgColor = getRaw(Element.fromDom(elm), 'background-color').map(rgbToHex).getOr('');
      return {
        borderwidth: borderWidth,
        borderstyle: borderStyle,
        bordercolor: borderColor,
        backgroundcolor: bgColor
      };
    };
    var getSharedValues = function (data) {
      var baseData = data[0];
      var comparisonData = data.slice(1);
      var keys$1 = keys(baseData);
      each(comparisonData, function (items) {
        each(keys$1, function (key) {
          each$1(items, function (itemValue, itemKey) {
            var comparisonValue = baseData[key];
            if (comparisonValue !== '' && key === itemKey) {
              if (comparisonValue !== itemValue) {
                baseData[key] = '';
              }
            }
          });
        });
      });
      return baseData;
    };
    var getAdvancedTab = function (dialogName) {
      var advTabItems = [
        {
          name: 'borderstyle',
          type: 'selectbox',
          label: 'Border style',
          items: [
            {
              text: 'Select...',
              value: ''
            },
            {
              text: 'Solid',
              value: 'solid'
            },
            {
              text: 'Dotted',
              value: 'dotted'
            },
            {
              text: 'Dashed',
              value: 'dashed'
            },
            {
              text: 'Double',
              value: 'double'
            },
            {
              text: 'Groove',
              value: 'groove'
            },
            {
              text: 'Ridge',
              value: 'ridge'
            },
            {
              text: 'Inset',
              value: 'inset'
            },
            {
              text: 'Outset',
              value: 'outset'
            },
            {
              text: 'None',
              value: 'none'
            },
            {
              text: 'Hidden',
              value: 'hidden'
            }
          ]
        },
        {
          name: 'bordercolor',
          type: 'colorinput',
          label: 'Border color'
        },
        {
          name: 'backgroundcolor',
          type: 'colorinput',
          label: 'Background color'
        }
      ];
      var borderWidth = {
        name: 'borderwidth',
        type: 'input',
        label: 'Border width'
      };
      var items = dialogName === 'cell' ? [borderWidth].concat(advTabItems) : advTabItems;
      return {
        title: 'Advanced',
        name: 'advanced',
        items: items
      };
    };
    var getAlignment = function (alignments, formatName, dataName, editor, elm) {
      var alignmentData = {};
      global$1.each(alignments.split(' '), function (name) {
        if (editor.formatter.matchNode(elm, formatName + name)) {
          alignmentData[dataName] = name;
        }
      });
      if (!alignmentData[dataName]) {
        alignmentData[dataName] = '';
      }
      return alignmentData;
    };
    var getHAlignment = curry(getAlignment, 'left center right');
    var getVAlignment = curry(getAlignment, 'top middle bottom');
    var extractDataFromSettings = function (editor, hasAdvTableTab) {
      var style = getDefaultStyles(editor);
      var attrs = getDefaultAttributes(editor);
      var extractAdvancedStyleData = function (dom) {
        var rgbToHex = function (value) {
          return startsWith(value, 'rgb') ? dom.toHex(value) : value;
        };
        var borderStyle = get(style, 'border-style').getOr('');
        var borderColor = get(style, 'border-color').getOr('');
        var bgColor = get(style, 'background-color').getOr('');
        return {
          borderstyle: borderStyle,
          bordercolor: rgbToHex(borderColor),
          backgroundcolor: rgbToHex(bgColor)
        };
      };
      var defaultData = {
        height: '',
        width: '100%',
        cellspacing: '',
        cellpadding: '',
        caption: false,
        class: '',
        align: '',
        border: ''
      };
      var getBorder = function () {
        var borderWidth = style['border-width'];
        if (shouldStyleWithCss(editor) && borderWidth) {
          return { border: borderWidth };
        }
        return get(attrs, 'border').fold(function () {
          return {};
        }, function (border) {
          return { border: border };
        });
      };
      var dom = editor.dom;
      var advStyle = hasAdvTableTab ? extractAdvancedStyleData(dom) : {};
      var getCellPaddingCellSpacing = function () {
        var spacing = get(style, 'border-spacing').or(get(attrs, 'cellspacing')).fold(function () {
          return {};
        }, function (cellspacing) {
          return { cellspacing: cellspacing };
        });
        var padding = get(style, 'border-padding').or(get(attrs, 'cellpadding')).fold(function () {
          return {};
        }, function (cellpadding) {
          return { cellpadding: cellpadding };
        });
        return __assign(__assign({}, spacing), padding);
      };
      var data = __assign(__assign(__assign(__assign(__assign(__assign({}, defaultData), style), attrs), advStyle), getBorder()), getCellPaddingCellSpacing());
      return data;
    };
    var extractDataFromTableElement = function (editor, elm, hasAdvTableTab) {
      var getBorder = function (dom, elm) {
        var optBorderWidth = getRaw(Element.fromDom(elm), 'border-width');
        if (shouldStyleWithCss(editor) && optBorderWidth.isSome()) {
          return optBorderWidth.getOr('');
        }
        return dom.getAttrib(elm, 'border') || Styles$1.getTDTHOverallStyle(editor.dom, elm, 'border-width') || Styles$1.getTDTHOverallStyle(editor.dom, elm, 'border');
      };
      var dom = editor.dom;
      var data = __assign(__assign({
        width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        cellspacing: dom.getStyle(elm, 'border-spacing') || dom.getAttrib(elm, 'cellspacing'),
        cellpadding: dom.getAttrib(elm, 'cellpadding') || Styles$1.getTDTHOverallStyle(editor.dom, elm, 'padding'),
        border: getBorder(dom, elm),
        caption: !!dom.select('caption', elm)[0],
        class: dom.getAttrib(elm, 'class', '')
      }, getHAlignment('align', 'align', editor, elm)), hasAdvTableTab ? extractAdvancedStyles(dom, elm) : {});
      return data;
    };
    var extractDataFromRowElement = function (editor, elm, hasAdvancedRowTab) {
      var dom = editor.dom;
      var data = __assign(__assign({
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        class: dom.getAttrib(elm, 'class', ''),
        align: '',
        type: elm.parentNode.nodeName.toLowerCase()
      }, getHAlignment('align', 'align', editor, elm)), hasAdvancedRowTab ? extractAdvancedStyles(dom, elm) : {});
      return data;
    };
    var extractDataFromCellElement = function (editor, elm, hasAdvancedCellTab) {
      var dom = editor.dom;
      var data = __assign(__assign(__assign({
        width: dom.getStyle(elm, 'width') || dom.getAttrib(elm, 'width'),
        height: dom.getStyle(elm, 'height') || dom.getAttrib(elm, 'height'),
        scope: dom.getAttrib(elm, 'scope'),
        celltype: elm.nodeName.toLowerCase(),
        class: dom.getAttrib(elm, 'class', '')
      }, getHAlignment('align', 'halign', editor, elm)), getVAlignment('valign', 'valign', editor, elm)), hasAdvancedCellTab ? extractAdvancedStyles(dom, elm) : {});
      return data;
    };
    var Helpers = {
      buildListItems: buildListItems,
      extractAdvancedStyles: extractAdvancedStyles,
      getSharedValues: getSharedValues,
      getAdvancedTab: getAdvancedTab,
      extractDataFromTableElement: extractDataFromTableElement,
      extractDataFromRowElement: extractDataFromRowElement,
      extractDataFromCellElement: extractDataFromCellElement,
      extractDataFromSettings: extractDataFromSettings
    };

    var getClassList = function (editor) {
      var rowClassList = getCellClassList(editor);
      var classes = Helpers.buildListItems(rowClassList, function (item) {
        if (item.value) {
          item.textStyle = function () {
            return editor.formatter.getCssText({
              block: 'tr',
              classes: [item.value]
            });
          };
        }
      });
      if (rowClassList.length > 0) {
        return Option.some({
          name: 'class',
          type: 'selectbox',
          label: 'Class',
          items: classes
        });
      }
      return Option.none();
    };
    var children$3 = [
      {
        name: 'width',
        type: 'input',
        label: 'Width'
      },
      {
        name: 'height',
        type: 'input',
        label: 'Height'
      },
      {
        name: 'celltype',
        type: 'selectbox',
        label: 'Cell type',
        items: [
          {
            text: 'Cell',
            value: 'td'
          },
          {
            text: 'Header cell',
            value: 'th'
          }
        ]
      },
      {
        name: 'scope',
        type: 'selectbox',
        label: 'Scope',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Row',
            value: 'row'
          },
          {
            text: 'Column',
            value: 'col'
          },
          {
            text: 'Row group',
            value: 'rowgroup'
          },
          {
            text: 'Column group',
            value: 'colgroup'
          }
        ]
      },
      {
        name: 'halign',
        type: 'selectbox',
        label: 'H Align',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Left',
            value: 'left'
          },
          {
            text: 'Center',
            value: 'center'
          },
          {
            text: 'Right',
            value: 'right'
          }
        ]
      },
      {
        name: 'valign',
        type: 'selectbox',
        label: 'V Align',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Top',
            value: 'top'
          },
          {
            text: 'Middle',
            value: 'middle'
          },
          {
            text: 'Bottom',
            value: 'bottom'
          }
        ]
      }
    ];
    var getItems = function (editor) {
      return getClassList(editor).fold(function () {
        return children$3;
      }, function (classlist) {
        return children$3.concat(classlist);
      });
    };
    var CellDialogGeneralTab = { getItems: getItems };

    var normal = function (dom, node) {
      var setAttrib = function (attr, value) {
        dom.setAttrib(node, attr, value);
      };
      var setStyle = function (prop, value) {
        dom.setStyle(node, prop, value);
      };
      return {
        setAttrib: setAttrib,
        setStyle: setStyle
      };
    };
    var ifTruthy = function (dom, node) {
      var setAttrib = function (attr, value) {
        if (value) {
          dom.setAttrib(node, attr, value);
        }
      };
      var setStyle = function (prop, value) {
        if (value) {
          dom.setStyle(node, prop, value);
        }
      };
      return {
        setAttrib: setAttrib,
        setStyle: setStyle
      };
    };
    var DomModifier = {
      normal: normal,
      ifTruthy: ifTruthy
    };

    var updateSimpleProps = function (modifiers, data) {
      modifiers.setAttrib('scope', data.scope);
      modifiers.setAttrib('class', data.class);
      modifiers.setStyle('width', addSizeSuffix(data.width));
      modifiers.setStyle('height', addSizeSuffix(data.height));
    };
    var updateAdvancedProps = function (modifiers, data) {
      modifiers.setStyle('background-color', data.backgroundcolor);
      modifiers.setStyle('border-color', data.bordercolor);
      modifiers.setStyle('border-style', data.borderstyle);
      modifiers.setStyle('border-width', addSizeSuffix(data.borderwidth));
    };
    var applyToSingle = function (editor, cells, data) {
      var dom = editor.dom;
      var cellElm = data.celltype && cells[0].nodeName.toLowerCase() !== data.celltype ? dom.rename(cells[0], data.celltype) : cells[0];
      var modifiers = DomModifier.normal(dom, cellElm);
      updateSimpleProps(modifiers, data);
      if (hasAdvancedCellTab(editor)) {
        updateAdvancedProps(modifiers, data);
      }
      Styles$1.unApplyAlign(editor, cellElm);
      Styles$1.unApplyVAlign(editor, cellElm);
      if (data.halign) {
        Styles$1.applyAlign(editor, cellElm, data.halign);
      }
      if (data.valign) {
        Styles$1.applyVAlign(editor, cellElm, data.valign);
      }
    };
    var applyToMultiple = function (editor, cells, data) {
      var dom = editor.dom;
      global$1.each(cells, function (cellElm) {
        if (data.celltype && cellElm.nodeName.toLowerCase() !== data.celltype) {
          cellElm = dom.rename(cellElm, data.celltype);
        }
        var modifiers = DomModifier.ifTruthy(dom, cellElm);
        updateSimpleProps(modifiers, data);
        if (hasAdvancedCellTab(editor)) {
          updateAdvancedProps(modifiers, data);
        }
        if (data.halign) {
          Styles$1.applyAlign(editor, cellElm, data.halign);
        }
        if (data.valign) {
          Styles$1.applyVAlign(editor, cellElm, data.valign);
        }
      });
    };
    var onSubmitCellForm = function (editor, cells, api) {
      var data = api.getData();
      api.close();
      editor.undoManager.transact(function () {
        var applicator = cells.length === 1 ? applyToSingle : applyToMultiple;
        applicator(editor, cells, data);
        editor.focus();
      });
    };
    var open = function (editor) {
      var cellElm, cells = [];
      cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
      cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
      if (!cells.length && cellElm) {
        cells.push(cellElm);
      }
      cellElm = cellElm || cells[0];
      if (!cellElm) {
        return;
      }
      var cellsData = global$1.map(cells, function (cellElm) {
        return Helpers.extractDataFromCellElement(editor, cellElm, hasAdvancedCellTab(editor));
      });
      var data = Helpers.getSharedValues(cellsData);
      var dialogTabPanel = {
        type: 'tabpanel',
        tabs: [
          {
            title: 'General',
            name: 'general',
            items: CellDialogGeneralTab.getItems(editor)
          },
          Helpers.getAdvancedTab('cell')
        ]
      };
      var dialogPanel = {
        type: 'panel',
        items: [{
            type: 'grid',
            columns: 2,
            items: CellDialogGeneralTab.getItems(editor)
          }]
      };
      editor.windowManager.open({
        title: 'Cell Properties',
        size: 'normal',
        body: hasAdvancedCellTab(editor) ? dialogTabPanel : dialogPanel,
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data,
        onSubmit: curry(onSubmitCellForm, editor, cells)
      });
    };
    var CellDialog = { open: open };

    var getClassList$1 = function (editor) {
      var rowClassList = getRowClassList(editor);
      var classes = Helpers.buildListItems(rowClassList, function (item) {
        if (item.value) {
          item.textStyle = function () {
            return editor.formatter.getCssText({
              block: 'tr',
              classes: [item.value]
            });
          };
        }
      });
      if (rowClassList.length > 0) {
        return Option.some({
          name: 'class',
          type: 'selectbox',
          label: 'Class',
          items: classes
        });
      }
      return Option.none();
    };
    var formChildren = [
      {
        type: 'selectbox',
        name: 'type',
        label: 'Row type',
        items: [
          {
            text: 'Header',
            value: 'thead'
          },
          {
            text: 'Body',
            value: 'tbody'
          },
          {
            text: 'Footer',
            value: 'tfoot'
          }
        ]
      },
      {
        type: 'selectbox',
        name: 'align',
        label: 'Alignment',
        items: [
          {
            text: 'None',
            value: ''
          },
          {
            text: 'Left',
            value: 'left'
          },
          {
            text: 'Center',
            value: 'center'
          },
          {
            text: 'Right',
            value: 'right'
          }
        ]
      },
      {
        label: 'Height',
        name: 'height',
        type: 'input'
      }
    ];
    var getItems$1 = function (editor) {
      return getClassList$1(editor).fold(function () {
        return formChildren;
      }, function (classes) {
        return formChildren.concat(classes);
      });
    };
    var RowDialogGeneralTab = { getItems: getItems$1 };

    var switchRowType = function (dom, rowElm, toType) {
      var tableElm = dom.getParent(rowElm, 'table');
      var oldParentElm = rowElm.parentNode;
      var parentElm = dom.select(toType, tableElm)[0];
      if (!parentElm) {
        parentElm = dom.create(toType);
        if (tableElm.firstChild) {
          if (tableElm.firstChild.nodeName === 'CAPTION') {
            dom.insertAfter(parentElm, tableElm.firstChild);
          } else {
            tableElm.insertBefore(parentElm, tableElm.firstChild);
          }
        } else {
          tableElm.appendChild(parentElm);
        }
      }
      parentElm.appendChild(rowElm);
      if (!oldParentElm.hasChildNodes()) {
        dom.remove(oldParentElm);
      }
    };
    var updateAdvancedProps$1 = function (modifier, data) {
      modifier.setStyle('background-color', data.backgroundcolor);
      modifier.setStyle('border-color', data.bordercolor);
      modifier.setStyle('border-style', data.borderstyle);
    };
    var onSubmitRowForm = function (editor, rows, oldData, api) {
      var dom = editor.dom;
      var data = api.getData();
      api.close();
      var createModifier = rows.length === 1 ? DomModifier.normal : DomModifier.ifTruthy;
      editor.undoManager.transact(function () {
        global$1.each(rows, function (rowElm) {
          if (data.type !== rowElm.parentNode.nodeName.toLowerCase()) {
            switchRowType(editor.dom, rowElm, data.type);
          }
          var modifier = createModifier(dom, rowElm);
          modifier.setAttrib('scope', data.scope);
          modifier.setAttrib('class', data.class);
          modifier.setStyle('height', addSizeSuffix(data.height));
          if (hasAdvancedRowTab(editor)) {
            updateAdvancedProps$1(modifier, data);
          }
          if (data.align !== oldData.align) {
            Styles$1.unApplyAlign(editor, rowElm);
            Styles$1.applyAlign(editor, rowElm, data.align);
          }
        });
        editor.focus();
      });
    };
    var open$1 = function (editor) {
      var dom = editor.dom;
      var tableElm, cellElm, rowElm;
      var rows = [];
      tableElm = dom.getParent(editor.selection.getStart(), 'table');
      if (!tableElm) {
        return;
      }
      cellElm = dom.getParent(editor.selection.getStart(), 'td,th');
      global$1.each(tableElm.rows, function (row) {
        global$1.each(row.cells, function (cell) {
          if ((dom.getAttrib(cell, 'data-mce-selected') || cell === cellElm) && rows.indexOf(row) < 0) {
            rows.push(row);
            return false;
          }
        });
      });
      rowElm = rows[0];
      if (!rowElm) {
        return;
      }
      var rowsData = global$1.map(rows, function (rowElm) {
        return Helpers.extractDataFromRowElement(editor, rowElm, hasAdvancedRowTab(editor));
      });
      var data = Helpers.getSharedValues(rowsData);
      var dialogTabPanel = {
        type: 'tabpanel',
        tabs: [
          {
            title: 'General',
            name: 'general',
            items: RowDialogGeneralTab.getItems(editor)
          },
          Helpers.getAdvancedTab('row')
        ]
      };
      var dialogPanel = {
        type: 'panel',
        items: [{
            type: 'grid',
            columns: 2,
            items: RowDialogGeneralTab.getItems(editor)
          }]
      };
      editor.windowManager.open({
        title: 'Row Properties',
        size: 'normal',
        body: hasAdvancedRowTab(editor) ? dialogTabPanel : dialogPanel,
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data,
        onSubmit: curry(onSubmitRowForm, editor, rows, data)
      });
    };
    var RowDialog = { open: open$1 };

    var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
    var shallow$1 = function (old, nu) {
      return nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++) {
          objects[i] = arguments[i];
        }
        if (objects.length === 0) {
          throw new Error('Can\'t merge zero objects');
        }
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject) {
            if (hasOwnProperty$1.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
          }
        }
        return ret;
      };
    };
    var merge$3 = baseMerge(shallow$1);

    var global$2 = tinymce.util.Tools.resolve('tinymce.Env');

    var DefaultRenderOptions = {
      styles: {
        'border-collapse': 'collapse',
        'width': '100%'
      },
      attributes: { border: '1' },
      percentages: true
    };
    var makeTable = function () {
      return Element.fromTag('table');
    };
    var tableBody = function () {
      return Element.fromTag('tbody');
    };
    var tableRow = function () {
      return Element.fromTag('tr');
    };
    var tableHeaderCell = function () {
      return Element.fromTag('th');
    };
    var tableCell = function () {
      return Element.fromTag('td');
    };
    var render$1 = function (rows, columns, rowHeaders, columnHeaders, renderOpts) {
      if (renderOpts === void 0) {
        renderOpts = DefaultRenderOptions;
      }
      var table = makeTable();
      setAll$1(table, renderOpts.styles);
      setAll(table, renderOpts.attributes);
      var tbody = tableBody();
      append(table, tbody);
      var trs = [];
      for (var i = 0; i < rows; i++) {
        var tr = tableRow();
        for (var j = 0; j < columns; j++) {
          var td = i < rowHeaders || j < columnHeaders ? tableHeaderCell() : tableCell();
          if (j < columnHeaders) {
            set(td, 'scope', 'row');
          }
          if (i < rowHeaders) {
            set(td, 'scope', 'col');
          }
          append(td, Element.fromTag('br'));
          if (renderOpts.percentages) {
            set$1(td, 'width', 100 / columns + '%');
          }
          append(tr, td);
        }
        trs.push(tr);
      }
      append$1(tbody, trs);
      return table;
    };

    var get$8 = function (element) {
      return element.dom().innerHTML;
    };
    var getOuter$2 = function (element) {
      var container = Element.fromTag('div');
      var clone = Element.fromDom(element.dom().cloneNode(true));
      append(container, clone);
      return get$8(container);
    };

    var placeCaretInCell = function (editor, cell) {
      editor.selection.select(cell.dom(), true);
      editor.selection.collapse(true);
    };
    var selectFirstCellInTable = function (editor, tableElm) {
      descendant$1(tableElm, 'td,th').each(curry(placeCaretInCell, editor));
    };
    var fireEvents = function (editor, table) {
      each(descendants$1(table, 'tr'), function (row) {
        fireNewRow(editor, row.dom());
        each(descendants$1(row, 'th,td'), function (cell) {
          fireNewCell(editor, cell.dom());
        });
      });
    };
    var isPercentage = function (width) {
      return isString(width) && width.indexOf('%') !== -1;
    };
    var insert$1 = function (editor, columns, rows) {
      var defaultStyles = getDefaultStyles(editor);
      var options = {
        styles: defaultStyles,
        attributes: getDefaultAttributes(editor),
        percentages: isPercentage(defaultStyles.width) && !isPixelsForced(editor)
      };
      var table = render$1(rows, columns, 0, 0, options);
      set(table, 'data-mce-id', '__mce');
      var html = getOuter$2(table);
      editor.insertContent(html);
      return descendant$1(getBody$1(editor), 'table[data-mce-id="__mce"]').map(function (table) {
        if (isPixelsForced(editor)) {
          set$1(table, 'width', get$2(table, 'width'));
        }
        remove(table, 'data-mce-id');
        fireEvents(editor, table);
        selectFirstCellInTable(editor, table);
        return table.dom();
      }).getOr(null);
    };
    var InsertTable = { insert: insert$1 };

    var getItems$2 = function (editor, hasClasses, insertNewTable) {
      var rowColCountItems = !insertNewTable ? [] : [
        {
          type: 'input',
          name: 'cols',
          label: 'Cols',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'rows',
          label: 'Rows',
          inputMode: 'numeric'
        }
      ];
      var alwaysItems = [
        {
          type: 'input',
          name: 'width',
          label: 'Width'
        },
        {
          type: 'input',
          name: 'height',
          label: 'Height'
        }
      ];
      var appearanceItems = hasAppearanceOptions(editor) ? [
        {
          type: 'input',
          name: 'cellspacing',
          label: 'Cell spacing',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'cellpadding',
          label: 'Cell padding',
          inputMode: 'numeric'
        },
        {
          type: 'input',
          name: 'border',
          label: 'Border width'
        },
        {
          type: 'label',
          label: 'Caption',
          items: [{
              type: 'checkbox',
              name: 'caption',
              label: 'Show caption'
            }]
        }
      ] : [];
      var alignmentItem = [{
          type: 'selectbox',
          name: 'align',
          label: 'Alignment',
          items: [
            {
              text: 'None',
              value: ''
            },
            {
              text: 'Left',
              value: 'left'
            },
            {
              text: 'Center',
              value: 'center'
            },
            {
              text: 'Right',
              value: 'right'
            }
          ]
        }];
      var classListItem = hasClasses ? [{
          type: 'selectbox',
          name: 'class',
          label: 'Class',
          items: Helpers.buildListItems(getTableClassList(editor), function (item) {
            if (item.value) {
              item.textStyle = function () {
                return editor.formatter.getCssText({
                  block: 'table',
                  classes: [item.value]
                });
              };
            }
          })
        }] : [];
      return rowColCountItems.concat(alwaysItems).concat(appearanceItems).concat(alignmentItem).concat(classListItem);
    };
    var TableDialogGeneralTab = { getItems: getItems$2 };

    var styleTDTH = function (dom, elm, name, value) {
      if (elm.tagName === 'TD' || elm.tagName === 'TH') {
        if (isString(name)) {
          dom.setStyle(elm, name, value);
        } else {
          dom.setStyle(elm, name);
        }
      } else {
        if (elm.children) {
          for (var i = 0; i < elm.children.length; i++) {
            styleTDTH(dom, elm.children[i], name, value);
          }
        }
      }
    };
    var applyDataToElement = function (editor, tableElm, data) {
      var dom = editor.dom;
      var attrs = {};
      var styles = {};
      attrs.class = data.class;
      styles.height = addSizeSuffix(data.height);
      if (dom.getAttrib(tableElm, 'width') && !shouldStyleWithCss(editor)) {
        attrs.width = removePxSuffix(data.width);
      } else {
        styles.width = addSizeSuffix(data.width);
      }
      if (shouldStyleWithCss(editor)) {
        styles['border-width'] = addSizeSuffix(data.border);
        styles['border-spacing'] = addSizeSuffix(data.cellspacing);
      } else {
        attrs.border = data.border;
        attrs.cellpadding = data.cellpadding;
        attrs.cellspacing = data.cellspacing;
      }
      if (shouldStyleWithCss(editor) && tableElm.children) {
        for (var i = 0; i < tableElm.children.length; i++) {
          styleTDTH(dom, tableElm.children[i], {
            'border-width': addSizeSuffix(data.border),
            'padding': addSizeSuffix(data.cellpadding)
          });
          if (hasAdvancedTableTab(editor)) {
            styleTDTH(dom, tableElm.children[i], { 'border-color': data.bordercolor });
          }
        }
      }
      if (hasAdvancedTableTab(editor)) {
        styles['background-color'] = data.backgroundcolor;
        styles['border-color'] = data.bordercolor;
        styles['border-style'] = data.borderstyle;
      }
      attrs.style = dom.serializeStyle(merge$3(getDefaultStyles(editor), styles));
      dom.setAttribs(tableElm, merge$3(getDefaultAttributes(editor), attrs));
    };
    var onSubmitTableForm = function (editor, tableElm, api) {
      var dom = editor.dom;
      var captionElm;
      var data = api.getData();
      api.close();
      if (data.class === '') {
        delete data.class;
      }
      editor.undoManager.transact(function () {
        if (!tableElm) {
          var cols = parseInt(data.cols, 10) || 1;
          var rows = parseInt(data.rows, 10) || 1;
          tableElm = InsertTable.insert(editor, cols, rows);
        }
        applyDataToElement(editor, tableElm, data);
        captionElm = dom.select('caption', tableElm)[0];
        if (captionElm && !data.caption) {
          dom.remove(captionElm);
        }
        if (!captionElm && data.caption) {
          captionElm = dom.create('caption');
          captionElm.innerHTML = !global$2.ie ? '<br data-mce-bogus="1"/>' : '\xA0';
          tableElm.insertBefore(captionElm, tableElm.firstChild);
        }
        if (data.align === '') {
          Styles$1.unApplyAlign(editor, tableElm);
        } else {
          Styles$1.applyAlign(editor, tableElm, data.align);
        }
        editor.focus();
        editor.addVisual();
      });
    };
    var open$2 = function (editor, insertNewTable) {
      var dom = editor.dom;
      var tableElm;
      var data = Helpers.extractDataFromSettings(editor, hasAdvancedTableTab(editor));
      if (insertNewTable === false) {
        tableElm = dom.getParent(editor.selection.getStart(), 'table');
        if (tableElm) {
          data = Helpers.extractDataFromTableElement(editor, tableElm, hasAdvancedTableTab(editor));
        } else {
          if (hasAdvancedTableTab(editor)) {
            data.borderstyle = '';
            data.bordercolor = '';
            data.backgroundcolor = '';
          }
        }
      } else {
        data.cols = '1';
        data.rows = '1';
        if (hasAdvancedTableTab(editor)) {
          data.borderstyle = '';
          data.bordercolor = '';
          data.backgroundcolor = '';
        }
      }
      var hasClasses = getTableClassList(editor).length > 0;
      if (hasClasses) {
        if (data.class) {
          data.class = data.class.replace(/\s*mce\-item\-table\s*/g, '');
        }
      }
      var generalPanel = {
        type: 'grid',
        columns: 2,
        items: TableDialogGeneralTab.getItems(editor, hasClasses, insertNewTable)
      };
      var nonAdvancedForm = function () {
        return {
          type: 'panel',
          items: [generalPanel]
        };
      };
      var advancedForm = function () {
        return {
          type: 'tabpanel',
          tabs: [
            {
              title: 'General',
              name: 'general',
              items: [generalPanel]
            },
            Helpers.getAdvancedTab('table')
          ]
        };
      };
      var dialogBody = hasAdvancedTableTab(editor) ? advancedForm() : nonAdvancedForm();
      editor.windowManager.open({
        title: 'Table Properties',
        size: 'normal',
        body: dialogBody,
        onSubmit: curry(onSubmitTableForm, editor, tableElm),
        buttons: [
          {
            type: 'cancel',
            name: 'cancel',
            text: 'Cancel'
          },
          {
            type: 'submit',
            name: 'save',
            text: 'Save',
            primary: true
          }
        ],
        initialData: data
      });
    };
    var TableDialog = { open: open$2 };

    var getSelectionStartFromSelector = function (selector) {
      return function (editor) {
        return Option.from(editor.dom.getParent(editor.selection.getStart(), selector)).map(Element.fromDom);
      };
    };
    var getSelectionStartCell = getSelectionStartFromSelector('th,td');
    var getSelectionStartCellOrCaption = getSelectionStartFromSelector('th,td,caption');

    var each$3 = global$1.each;
    var registerCommands = function (editor, actions, cellSelection, selections, clipboardRows) {
      var isRoot = getIsRoot(editor);
      var eraseTable = function () {
        getSelectionStartCellOrCaption(editor).each(function (cellOrCaption) {
          var tableOpt = TableLookup.table(cellOrCaption, isRoot);
          tableOpt.filter(not(isRoot)).each(function (table) {
            var cursor = Element.fromText('');
            after(table, cursor);
            remove$2(table);
            if (editor.dom.isEmpty(editor.getBody())) {
              editor.setContent('');
              editor.selection.setCursorLocation();
            } else {
              var rng = editor.dom.createRng();
              rng.setStart(cursor.dom(), 0);
              rng.setEnd(cursor.dom(), 0);
              editor.selection.setRng(rng);
              editor.nodeChanged();
            }
          });
        });
      };
      var getTableFromCell = function (cell) {
        return TableLookup.table(cell, isRoot);
      };
      var getSize = function (table) {
        return {
          width: getPixelWidth$1(table.dom()),
          height: getPixelWidth$1(table.dom())
        };
      };
      var resizeChange = function (editor, oldSize, table) {
        var newSize = getSize(table);
        if (oldSize.width !== newSize.width || oldSize.height !== newSize.height) {
          fireObjectResizeStart(editor, table.dom(), oldSize.width, oldSize.height);
          fireObjectResized(editor, table.dom(), newSize.width, newSize.height);
        }
      };
      var actOnSelection = function (execute) {
        getSelectionStartCell(editor).each(function (cell) {
          getTableFromCell(cell).each(function (table) {
            var targets = TableTargets.forMenu(selections, table, cell);
            var beforeSize = getSize(table);
            execute(table, targets).each(function (rng) {
              resizeChange(editor, beforeSize, table);
              editor.selection.setRng(rng);
              editor.focus();
              cellSelection.clear(table);
              removeDataStyle(table);
            });
          });
        });
      };
      var copyRowSelection = function (execute) {
        return getSelectionStartCell(editor).map(function (cell) {
          return getTableFromCell(cell).bind(function (table) {
            var doc = Element.fromDom(editor.getDoc());
            var targets = TableTargets.forMenu(selections, table, cell);
            var generators = TableFill.cellOperations(noop, doc, Option.none());
            return CopyRows.copyRows(table, targets, generators);
          });
        });
      };
      var pasteOnSelection = function (execute) {
        clipboardRows.get().each(function (rows) {
          var clonedRows = map(rows, function (row) {
            return deep(row);
          });
          getSelectionStartCell(editor).each(function (cell) {
            getTableFromCell(cell).each(function (table) {
              var doc = Element.fromDom(editor.getDoc());
              var generators = TableFill.paste(doc);
              var targets = TableTargets.pasteRows(selections, table, cell, clonedRows, generators);
              execute(table, targets).each(function (rng) {
                editor.selection.setRng(rng);
                editor.focus();
                cellSelection.clear(table);
              });
            });
          });
        });
      };
      each$3({
        mceTableSplitCells: function () {
          actOnSelection(actions.unmergeCells);
        },
        mceTableMergeCells: function () {
          actOnSelection(actions.mergeCells);
        },
        mceTableInsertRowBefore: function () {
          actOnSelection(actions.insertRowsBefore);
        },
        mceTableInsertRowAfter: function () {
          actOnSelection(actions.insertRowsAfter);
        },
        mceTableInsertColBefore: function () {
          actOnSelection(actions.insertColumnsBefore);
        },
        mceTableInsertColAfter: function () {
          actOnSelection(actions.insertColumnsAfter);
        },
        mceTableDeleteCol: function () {
          actOnSelection(actions.deleteColumn);
        },
        mceTableDeleteRow: function () {
          actOnSelection(actions.deleteRow);
        },
        mceTableCutRow: function (grid) {
          copyRowSelection().each(function (selection) {
            clipboardRows.set(selection);
            actOnSelection(actions.deleteRow);
          });
        },
        mceTableCopyRow: function (grid) {
          copyRowSelection().each(function (selection) {
            clipboardRows.set(selection);
          });
        },
        mceTablePasteRowBefore: function (grid) {
          pasteOnSelection(actions.pasteRowsBefore);
        },
        mceTablePasteRowAfter: function (grid) {
          pasteOnSelection(actions.pasteRowsAfter);
        },
        mceTableDelete: eraseTable
      }, function (func, name) {
        editor.addCommand(name, func);
      });
      each$3({
        mceInsertTable: curry(TableDialog.open, editor, true),
        mceTableProps: curry(TableDialog.open, editor, false),
        mceTableRowProps: curry(RowDialog.open, editor),
        mceTableCellProps: curry(CellDialog.open, editor)
      }, function (func, name) {
        editor.addCommand(name, function () {
          func();
        });
      });
    };
    var Commands = { registerCommands: registerCommands };

    var only = function (element) {
      var parent = Option.from(element.dom().documentElement).map(Element.fromDom).getOr(element);
      return {
        parent: constant(parent),
        view: constant(element),
        origin: constant(Position(0, 0))
      };
    };
    var detached = function (editable, chrome) {
      var origin = function () {
        return absolute(chrome);
      };
      return {
        parent: constant(chrome),
        view: constant(editable),
        origin: origin
      };
    };
    var body$1 = function (editable, chrome) {
      return {
        parent: constant(chrome),
        view: constant(editable),
        origin: constant(Position(0, 0))
      };
    };
    var ResizeWire = {
      only: only,
      detached: detached,
      body: body$1
    };

    var Event = function (fields) {
      var struct = Immutable.apply(null, fields);
      var handlers = [];
      var bind = function (handler) {
        if (handler === undefined) {
          throw new Error('Event bind error: undefined handler');
        }
        handlers.push(handler);
      };
      var unbind = function (handler) {
        handlers = filter(handlers, function (h) {
          return h !== handler;
        });
      };
      var trigger = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var event = struct.apply(null, args);
        each(handlers, function (handler) {
          handler(event);
        });
      };
      return {
        bind: bind,
        unbind: unbind,
        trigger: trigger
      };
    };

    var create$1 = function (typeDefs) {
      var registry = map$1(typeDefs, function (event) {
        return {
          bind: event.bind,
          unbind: event.unbind
        };
      });
      var trigger = map$1(typeDefs, function (event) {
        return event.trigger;
      });
      return {
        registry: registry,
        trigger: trigger
      };
    };
    var Events = { create: create$1 };

    var mkEvent = function (target, x, y, stop, prevent, kill, raw) {
      return {
        target: constant(target),
        x: constant(x),
        y: constant(y),
        stop: stop,
        prevent: prevent,
        kill: kill,
        raw: constant(raw)
      };
    };
    var fromRawEvent = function (rawEvent) {
      var target = Element.fromDom(rawEvent.target);
      var stop = function () {
        rawEvent.stopPropagation();
      };
      var prevent = function () {
        rawEvent.preventDefault();
      };
      var kill = compose(prevent, stop);
      return mkEvent(target, rawEvent.clientX, rawEvent.clientY, stop, prevent, kill, rawEvent);
    };
    var handle = function (filter, handler) {
      return function (rawEvent) {
        if (!filter(rawEvent)) {
          return;
        }
        handler(fromRawEvent(rawEvent));
      };
    };
    var binder = function (element, event, filter, handler, useCapture) {
      var wrapped = handle(filter, handler);
      element.dom().addEventListener(event, wrapped, useCapture);
      return { unbind: curry(unbind, element, event, wrapped, useCapture) };
    };
    var bind$1 = function (element, event, filter, handler) {
      return binder(element, event, filter, handler, false);
    };
    var unbind = function (element, event, handler, useCapture) {
      element.dom().removeEventListener(event, handler, useCapture);
    };

    var filter$1 = constant(true);
    var bind$2 = function (element, event, handler) {
      return bind$1(element, event, filter$1, handler);
    };

    var styles$1 = css('ephox-dragster');
    var Styles$2 = { resolve: styles$1.resolve };

    var Blocker = function (options) {
      var settings = merge$3({ layerClass: Styles$2.resolve('blocker') }, options);
      var div = Element.fromTag('div');
      set(div, 'role', 'presentation');
      setAll$1(div, {
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%'
      });
      add$2(div, Styles$2.resolve('blocker'));
      add$2(div, settings.layerClass);
      var element = function () {
        return div;
      };
      var destroy = function () {
        remove$2(div);
      };
      return {
        element: element,
        destroy: destroy
      };
    };

    var DragMode = exactly([
      'compare',
      'extract',
      'mutate',
      'sink'
    ]);
    var DragSink = exactly([
      'element',
      'start',
      'stop',
      'destroy'
    ]);
    var DragApi = exactly([
      'forceDrop',
      'drop',
      'move',
      'delayDrop'
    ]);

    var compare = function (old, nu) {
      return Position(nu.left() - old.left(), nu.top() - old.top());
    };
    var extract$1 = function (event) {
      return Option.some(Position(event.x(), event.y()));
    };
    var mutate = function (mutation, info) {
      mutation.mutate(info.left(), info.top());
    };
    var sink = function (dragApi, settings) {
      var blocker = Blocker(settings);
      var mdown = bind$2(blocker.element(), 'mousedown', dragApi.forceDrop);
      var mup = bind$2(blocker.element(), 'mouseup', dragApi.drop);
      var mmove = bind$2(blocker.element(), 'mousemove', dragApi.move);
      var mout = bind$2(blocker.element(), 'mouseout', dragApi.delayDrop);
      var destroy = function () {
        blocker.destroy();
        mup.unbind();
        mmove.unbind();
        mout.unbind();
        mdown.unbind();
      };
      var start = function (parent) {
        append(parent, blocker.element());
      };
      var stop = function () {
        remove$2(blocker.element());
      };
      return DragSink({
        element: blocker.element,
        start: start,
        stop: stop,
        destroy: destroy
      });
    };
    var MouseDrag = DragMode({
      compare: compare,
      extract: extract$1,
      sink: sink,
      mutate: mutate
    });

    var last$2 = function (fn, rate) {
      var timer = null;
      var cancel = function () {
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
          timer = null;
        }
      };
      var throttle = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (timer !== null) {
          domGlobals.clearTimeout(timer);
        }
        timer = domGlobals.setTimeout(function () {
          fn.apply(null, args);
          timer = null;
        }, rate);
      };
      return {
        cancel: cancel,
        throttle: throttle
      };
    };

    function InDrag () {
      var previous = Option.none();
      var reset = function () {
        previous = Option.none();
      };
      var update = function (mode, nu) {
        var result = previous.map(function (old) {
          return mode.compare(old, nu);
        });
        previous = Option.some(nu);
        return result;
      };
      var onEvent = function (event, mode) {
        var dataOption = mode.extract(event);
        dataOption.each(function (data) {
          var offset = update(mode, data);
          offset.each(function (d) {
            events.trigger.move(d);
          });
        });
      };
      var events = Events.create({ move: Event(['info']) });
      return {
        onEvent: onEvent,
        reset: reset,
        events: events.registry
      };
    }

    function NoDrag () {
      return {
        onEvent: noop,
        reset: noop
      };
    }

    function Movement () {
      var noDragState = NoDrag();
      var inDragState = InDrag();
      var dragState = noDragState;
      var on = function () {
        dragState.reset();
        dragState = inDragState;
      };
      var off = function () {
        dragState.reset();
        dragState = noDragState;
      };
      var onEvent = function (event, mode) {
        dragState.onEvent(event, mode);
      };
      var isOn = function () {
        return dragState === inDragState;
      };
      return {
        on: on,
        off: off,
        isOn: isOn,
        onEvent: onEvent,
        events: inDragState.events
      };
    }

    var setup = function (mutation, mode, settings) {
      var active = false;
      var events = Events.create({
        start: Event([]),
        stop: Event([])
      });
      var movement = Movement();
      var drop = function () {
        sink.stop();
        if (movement.isOn()) {
          movement.off();
          events.trigger.stop();
        }
      };
      var throttledDrop = last$2(drop, 200);
      var go = function (parent) {
        sink.start(parent);
        movement.on();
        events.trigger.start();
      };
      var mousemove = function (event) {
        throttledDrop.cancel();
        movement.onEvent(event, mode);
      };
      movement.events.move.bind(function (event) {
        mode.mutate(mutation, event.info());
      });
      var on = function () {
        active = true;
      };
      var off = function () {
        active = false;
      };
      var runIfActive = function (f) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (active) {
            f.apply(null, args);
          }
        };
      };
      var sink = mode.sink(DragApi({
        forceDrop: drop,
        drop: runIfActive(drop),
        move: runIfActive(mousemove),
        delayDrop: runIfActive(throttledDrop.throttle)
      }), settings);
      var destroy = function () {
        sink.destroy();
      };
      return {
        element: sink.element,
        go: go,
        on: on,
        off: off,
        destroy: destroy,
        events: events.registry
      };
    };
    var Dragging = { setup: setup };

    var transform$1 = function (mutation, settings) {
      if (settings === void 0) {
        settings = {};
      }
      var mode = settings.mode !== undefined ? settings.mode : MouseDrag;
      return Dragging.setup(mutation, mode, settings);
    };
    var Dragger = { transform: transform$1 };

    var Mutation = function () {
      var events = Events.create({
        drag: Event([
          'xDelta',
          'yDelta'
        ])
      });
      var mutate = function (x, y) {
        events.trigger.drag(x, y);
      };
      return {
        mutate: mutate,
        events: events.registry
      };
    };

    var BarMutation = function () {
      var events = Events.create({
        drag: Event([
          'xDelta',
          'yDelta',
          'target'
        ])
      });
      var target = Option.none();
      var delegate = Mutation();
      delegate.events.drag.bind(function (event) {
        target.each(function (t) {
          events.trigger.drag(event.xDelta(), event.yDelta(), t);
        });
      });
      var assign = function (t) {
        target = Option.some(t);
      };
      var get = function () {
        return target;
      };
      return {
        assign: assign,
        get: get,
        mutate: delegate.mutate,
        events: events.registry
      };
    };

    var isContentEditableTrue = function (elm) {
      return get$1(elm, 'contenteditable') === 'true';
    };
    var findClosestContentEditable = function (target, isRoot) {
      return closest$1(target, '[contenteditable]', isRoot);
    };

    var resizeBarDragging = Styles.resolve('resizer-bar-dragging');
    var BarManager = function (wire, direction, hdirection) {
      var mutation = BarMutation();
      var resizing = Dragger.transform(mutation, {});
      var hoverTable = Option.none();
      var getResizer = function (element, type) {
        return Option.from(get$1(element, type));
      };
      mutation.events.drag.bind(function (event) {
        getResizer(event.target(), 'data-row').each(function (_dataRow) {
          var currentRow = CellUtils.getInt(event.target(), 'top');
          set$1(event.target(), 'top', currentRow + event.yDelta() + 'px');
        });
        getResizer(event.target(), 'data-column').each(function (_dataCol) {
          var currentCol = CellUtils.getInt(event.target(), 'left');
          set$1(event.target(), 'left', currentCol + event.xDelta() + 'px');
        });
      });
      var getDelta = function (target, dir) {
        var newX = CellUtils.getInt(target, dir);
        var oldX = parseInt(get$1(target, 'data-initial-' + dir), 10);
        return newX - oldX;
      };
      resizing.events.stop.bind(function () {
        mutation.get().each(function (target) {
          hoverTable.each(function (table) {
            getResizer(target, 'data-row').each(function (row) {
              var delta = getDelta(target, 'top');
              remove(target, 'data-initial-top');
              events.trigger.adjustHeight(table, delta, parseInt(row, 10));
            });
            getResizer(target, 'data-column').each(function (column) {
              var delta = getDelta(target, 'left');
              remove(target, 'data-initial-left');
              events.trigger.adjustWidth(table, delta, parseInt(column, 10));
            });
            Bars.refresh(wire, table, hdirection, direction);
          });
        });
      });
      var handler = function (target, dir) {
        events.trigger.startAdjust();
        mutation.assign(target);
        set(target, 'data-initial-' + dir, parseInt(get$2(target, dir), 10));
        add$2(target, resizeBarDragging);
        set$1(target, 'opacity', '0.2');
        resizing.go(wire.parent());
      };
      var mousedown = bind$2(wire.parent(), 'mousedown', function (event) {
        if (Bars.isRowBar(event.target())) {
          handler(event.target(), 'top');
        }
        if (Bars.isColBar(event.target())) {
          handler(event.target(), 'left');
        }
      });
      var isRoot = function (e) {
        return eq(e, wire.view());
      };
      var findClosestEditableTable = function (target) {
        return closest$1(target, 'table', isRoot).filter(function (table) {
          return findClosestContentEditable(table, isRoot).exists(isContentEditableTrue);
        });
      };
      var mouseover = bind$2(wire.view(), 'mouseover', function (event) {
        findClosestEditableTable(event.target()).fold(function () {
          if (inBody(event.target())) {
            Bars.destroy(wire);
          }
        }, function (table) {
          hoverTable = Option.some(table);
          Bars.refresh(wire, table, hdirection, direction);
        });
      });
      var destroy = function () {
        mousedown.unbind();
        mouseover.unbind();
        resizing.destroy();
        Bars.destroy(wire);
      };
      var refresh = function (tbl) {
        Bars.refresh(wire, tbl, hdirection, direction);
      };
      var events = Events.create({
        adjustHeight: Event([
          'table',
          'delta',
          'row'
        ]),
        adjustWidth: Event([
          'table',
          'delta',
          'column'
        ]),
        startAdjust: Event([])
      });
      return {
        destroy: destroy,
        refresh: refresh,
        on: resizing.on,
        off: resizing.off,
        hideBars: curry(Bars.hide, wire),
        showBars: curry(Bars.show, wire),
        events: events.registry
      };
    };

    var create$2 = function (wire, vdirection) {
      var hdirection = BarPositions.height;
      var manager = BarManager(wire, vdirection, hdirection);
      var events = Events.create({
        beforeResize: Event(['table']),
        afterResize: Event(['table']),
        startDrag: Event([])
      });
      manager.events.adjustHeight.bind(function (event) {
        events.trigger.beforeResize(event.table());
        var delta = hdirection.delta(event.delta(), event.table());
        Adjustments.adjustHeight(event.table(), delta, event.row(), hdirection);
        events.trigger.afterResize(event.table());
      });
      manager.events.startAdjust.bind(function (event) {
        events.trigger.startDrag();
      });
      manager.events.adjustWidth.bind(function (event) {
        events.trigger.beforeResize(event.table());
        var delta = vdirection.delta(event.delta(), event.table());
        Adjustments.adjustWidth(event.table(), delta, event.column(), vdirection);
        events.trigger.afterResize(event.table());
      });
      return {
        on: manager.on,
        off: manager.off,
        hideBars: manager.hideBars,
        showBars: manager.showBars,
        destroy: manager.destroy,
        events: events.registry
      };
    };
    var TableResize = { create: create$2 };

    var createContainer = function () {
      var container = Element.fromTag('div');
      setAll$1(container, {
        position: 'static',
        height: '0',
        width: '0',
        padding: '0',
        margin: '0',
        border: '0'
      });
      append(body(), container);
      return container;
    };
    var get$9 = function (editor, container) {
      return editor.inline ? ResizeWire.body(getBody$1(editor), createContainer()) : ResizeWire.only(Element.fromDom(editor.getDoc()));
    };
    var remove$6 = function (editor, wire) {
      if (editor.inline) {
        remove$2(wire.parent());
      }
    };
    var TableWire = {
      get: get$9,
      remove: remove$6
    };

    var calculatePercentageWidth = function (element, parent) {
      return getPixelWidth$1(element.dom()) / getPixelWidth$1(parent.dom()) * 100 + '%';
    };
    var enforcePercentage = function (rawTable) {
      var table = Element.fromDom(rawTable);
      parent(table).map(function (parent) {
        return calculatePercentageWidth(table, parent);
      }).each(function (tablePercentage) {
        set$1(table, 'width', tablePercentage);
        each(descendants$1(table, 'tr'), function (tr) {
          each(children(tr), function (td) {
            set$1(td, 'width', calculatePercentageWidth(td, tr));
          });
        });
      });
    };
    var enforcePixels = function (table) {
      set$1(Element.fromDom(table), 'width', getPixelWidth$1(table).toString() + 'px');
    };

    var getResizeHandler = function (editor) {
      var selectionRng = Option.none();
      var resize = Option.none();
      var wire = Option.none();
      var percentageBasedSizeRegex = /(\d+(\.\d+)?)%/;
      var startW;
      var startRawW;
      var isTable = function (elm) {
        return elm.nodeName === 'TABLE';
      };
      var getRawWidth = function (elm) {
        var raw = editor.dom.getStyle(elm, 'width') || editor.dom.getAttrib(elm, 'width');
        return Option.from(raw).filter(function (s) {
          return s.length > 0;
        });
      };
      var lazyResize = function () {
        return resize;
      };
      var lazyWire = function () {
        return wire.getOr(ResizeWire.only(Element.fromDom(editor.getBody())));
      };
      var destroy = function () {
        resize.each(function (sz) {
          sz.destroy();
        });
        wire.each(function (w) {
          TableWire.remove(editor, w);
        });
      };
      editor.on('init', function () {
        var direction = TableDirection(Direction.directionAt);
        var rawWire = TableWire.get(editor);
        wire = Option.some(rawWire);
        if (hasObjectResizing(editor) && hasTableResizeBars(editor)) {
          var sz = TableResize.create(rawWire, direction);
          sz.on();
          sz.events.startDrag.bind(function (event) {
            selectionRng = Option.some(editor.selection.getRng());
          });
          sz.events.beforeResize.bind(function (event) {
            var rawTable = event.table().dom();
            fireObjectResizeStart(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
          });
          sz.events.afterResize.bind(function (event) {
            var table = event.table();
            var rawTable = table.dom();
            removeDataStyle(table);
            selectionRng.each(function (rng) {
              editor.selection.setRng(rng);
              editor.focus();
            });
            fireObjectResized(editor, rawTable, getPixelWidth$1(rawTable), getPixelHeight(rawTable));
            editor.undoManager.add();
          });
          resize = Option.some(sz);
        }
      });
      editor.on('ObjectResizeStart', function (e) {
        var targetElm = e.target;
        if (isTable(targetElm)) {
          var tableHasPercentage = getRawWidth(targetElm).map(function (w) {
            return percentageBasedSizeRegex.test(w);
          }).getOr(false);
          if (tableHasPercentage && isPixelsForced(editor)) {
            enforcePixels(targetElm);
          } else if (!tableHasPercentage && isPercentagesForced(editor)) {
            enforcePercentage(targetElm);
          }
          startW = e.width;
          startRawW = getRawWidth(targetElm).getOr('');
        }
      });
      editor.on('ObjectResized', function (e) {
        var targetElm = e.target;
        if (isTable(targetElm)) {
          var table = targetElm;
          if (percentageBasedSizeRegex.test(startRawW)) {
            var percentW = parseFloat(percentageBasedSizeRegex.exec(startRawW)[1]);
            var targetPercentW = e.width * percentW / startW;
            editor.dom.setStyle(table, 'width', targetPercentW + '%');
          } else {
            var newCellSizes_1 = [];
            global$1.each(table.rows, function (row) {
              global$1.each(row.cells, function (cell) {
                var width = editor.dom.getStyle(cell, 'width', true);
                newCellSizes_1.push({
                  cell: cell,
                  width: width
                });
              });
            });
            global$1.each(newCellSizes_1, function (newCellSize) {
              editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
              editor.dom.setAttrib(newCellSize.cell, 'width', null);
            });
          }
        }
      });
      editor.on('SwitchMode', function () {
        lazyResize().each(function (resize) {
          if (editor.readonly) {
            resize.hideBars();
          } else {
            resize.showBars();
          }
        });
      });
      return {
        lazyResize: lazyResize,
        lazyWire: lazyWire,
        destroy: destroy
      };
    };

    var adt$1 = Adt.generate([
      { none: ['current'] },
      { first: ['current'] },
      {
        middle: [
          'current',
          'target'
        ]
      },
      { last: ['current'] }
    ]);
    var none$1 = function (current) {
      if (current === void 0) {
        current = undefined;
      }
      return adt$1.none(current);
    };
    var CellLocation = __assign(__assign({}, adt$1), { none: none$1 });

    var detect$4 = function (current, isRoot) {
      return TableLookup.table(current, isRoot).bind(function (table) {
        var all = TableLookup.cells(table);
        var index = findIndex(all, function (x) {
          return eq(current, x);
        });
        return index.map(function (ind) {
          return {
            index: constant(ind),
            all: constant(all)
          };
        });
      });
    };
    var next = function (current, isRoot) {
      var detection = detect$4(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none(current);
      }, function (info) {
        return info.index() + 1 < info.all().length ? CellLocation.middle(current, info.all()[info.index() + 1]) : CellLocation.last(current);
      });
    };
    var prev = function (current, isRoot) {
      var detection = detect$4(current, isRoot);
      return detection.fold(function () {
        return CellLocation.none();
      }, function (info) {
        return info.index() - 1 >= 0 ? CellLocation.middle(current, info.all()[info.index() - 1]) : CellLocation.first(current);
      });
    };
    var CellNavigation = {
      next: next,
      prev: prev
    };

    var create$3 = Immutable('start', 'soffset', 'finish', 'foffset');
    var SimRange = { create: create$3 };

    var adt$2 = Adt.generate([
      { before: ['element'] },
      {
        on: [
          'element',
          'offset'
        ]
      },
      { after: ['element'] }
    ]);
    var cata$1 = function (subject, onBefore, onOn, onAfter) {
      return subject.fold(onBefore, onOn, onAfter);
    };
    var getStart = function (situ) {
      return situ.fold(identity, identity, identity);
    };
    var before$2 = adt$2.before;
    var on = adt$2.on;
    var after$2 = adt$2.after;
    var Situ = {
      before: before$2,
      on: on,
      after: after$2,
      cata: cata$1,
      getStart: getStart
    };

    var adt$3 = Adt.generate([
      { domRange: ['rng'] },
      {
        relative: [
          'startSitu',
          'finishSitu'
        ]
      },
      {
        exact: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var exactFromRange = function (simRange) {
      return adt$3.exact(simRange.start(), simRange.soffset(), simRange.finish(), simRange.foffset());
    };
    var getStart$1 = function (selection) {
      return selection.match({
        domRange: function (rng) {
          return Element.fromDom(rng.startContainer);
        },
        relative: function (startSitu, finishSitu) {
          return Situ.getStart(startSitu);
        },
        exact: function (start, soffset, finish, foffset) {
          return start;
        }
      });
    };
    var domRange = adt$3.domRange;
    var relative = adt$3.relative;
    var exact = adt$3.exact;
    var getWin = function (selection) {
      var start = getStart$1(selection);
      return defaultView(start);
    };
    var range$1 = SimRange.create;
    var Selection = {
      domRange: domRange,
      relative: relative,
      exact: exact,
      exactFromRange: exactFromRange,
      getWin: getWin,
      range: range$1
    };

    var selectNodeContents = function (win, element) {
      var rng = win.document.createRange();
      selectNodeContentsUsing(rng, element);
      return rng;
    };
    var selectNodeContentsUsing = function (rng, element) {
      rng.selectNodeContents(element.dom());
    };
    var setStart = function (rng, situ) {
      situ.fold(function (e) {
        rng.setStartBefore(e.dom());
      }, function (e, o) {
        rng.setStart(e.dom(), o);
      }, function (e) {
        rng.setStartAfter(e.dom());
      });
    };
    var setFinish = function (rng, situ) {
      situ.fold(function (e) {
        rng.setEndBefore(e.dom());
      }, function (e, o) {
        rng.setEnd(e.dom(), o);
      }, function (e) {
        rng.setEndAfter(e.dom());
      });
    };
    var relativeToNative = function (win, startSitu, finishSitu) {
      var range = win.document.createRange();
      setStart(range, startSitu);
      setFinish(range, finishSitu);
      return range;
    };
    var exactToNative = function (win, start, soffset, finish, foffset) {
      var rng = win.document.createRange();
      rng.setStart(start.dom(), soffset);
      rng.setEnd(finish.dom(), foffset);
      return rng;
    };
    var toRect = function (rect) {
      return {
        left: constant(rect.left),
        top: constant(rect.top),
        right: constant(rect.right),
        bottom: constant(rect.bottom),
        width: constant(rect.width),
        height: constant(rect.height)
      };
    };
    var getFirstRect = function (rng) {
      var rects = rng.getClientRects();
      var rect = rects.length > 0 ? rects[0] : rng.getBoundingClientRect();
      return rect.width > 0 || rect.height > 0 ? Option.some(rect).map(toRect) : Option.none();
    };

    var adt$4 = Adt.generate([
      {
        ltr: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      },
      {
        rtl: [
          'start',
          'soffset',
          'finish',
          'foffset'
        ]
      }
    ]);
    var fromRange = function (win, type, range) {
      return type(Element.fromDom(range.startContainer), range.startOffset, Element.fromDom(range.endContainer), range.endOffset);
    };
    var getRanges = function (win, selection) {
      return selection.match({
        domRange: function (rng) {
          return {
            ltr: constant(rng),
            rtl: Option.none
          };
        },
        relative: function (startSitu, finishSitu) {
          return {
            ltr: cached(function () {
              return relativeToNative(win, startSitu, finishSitu);
            }),
            rtl: cached(function () {
              return Option.some(relativeToNative(win, finishSitu, startSitu));
            })
          };
        },
        exact: function (start, soffset, finish, foffset) {
          return {
            ltr: cached(function () {
              return exactToNative(win, start, soffset, finish, foffset);
            }),
            rtl: cached(function () {
              return Option.some(exactToNative(win, finish, foffset, start, soffset));
            })
          };
        }
      });
    };
    var doDiagnose = function (win, ranges) {
      var rng = ranges.ltr();
      if (rng.collapsed) {
        var reversed = ranges.rtl().filter(function (rev) {
          return rev.collapsed === false;
        });
        return reversed.map(function (rev) {
          return adt$4.rtl(Element.fromDom(rev.endContainer), rev.endOffset, Element.fromDom(rev.startContainer), rev.startOffset);
        }).getOrThunk(function () {
          return fromRange(win, adt$4.ltr, rng);
        });
      } else {
        return fromRange(win, adt$4.ltr, rng);
      }
    };
    var diagnose = function (win, selection) {
      var ranges = getRanges(win, selection);
      return doDiagnose(win, ranges);
    };
    var asLtrRange = function (win, selection) {
      var diagnosis = diagnose(win, selection);
      return diagnosis.match({
        ltr: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(start.dom(), soffset);
          rng.setEnd(finish.dom(), foffset);
          return rng;
        },
        rtl: function (start, soffset, finish, foffset) {
          var rng = win.document.createRange();
          rng.setStart(finish.dom(), foffset);
          rng.setEnd(start.dom(), soffset);
          return rng;
        }
      });
    };

    var searchForPoint = function (rectForOffset, x, y, maxX, length) {
      if (length === 0) {
        return 0;
      } else if (x === maxX) {
        return length - 1;
      }
      var xDelta = maxX;
      for (var i = 1; i < length; i++) {
        var rect = rectForOffset(i);
        var curDeltaX = Math.abs(x - rect.left);
        if (y <= rect.bottom) {
          if (y < rect.top || curDeltaX > xDelta) {
            return i - 1;
          } else {
            xDelta = curDeltaX;
          }
        }
      }
      return 0;
    };
    var inRect = function (rect, x, y) {
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    };

    var locateOffset = function (doc, textnode, x, y, rect) {
      var rangeForOffset = function (o) {
        var r = doc.dom().createRange();
        r.setStart(textnode.dom(), o);
        r.collapse(true);
        return r;
      };
      var rectForOffset = function (o) {
        var r = rangeForOffset(o);
        return r.getBoundingClientRect();
      };
      var length = get$3(textnode).length;
      var offset = searchForPoint(rectForOffset, x, y, rect.right, length);
      return rangeForOffset(offset);
    };
    var locate = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rects = r.getClientRects();
      var foundRect = findMap(rects, function (rect) {
        return inRect(rect, x, y) ? Option.some(rect) : Option.none();
      });
      return foundRect.map(function (rect) {
        return locateOffset(doc, node, x, y, rect);
      });
    };

    var searchInChildren = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      var nodes = children(node);
      return findMap(nodes, function (n) {
        r.selectNode(n.dom());
        return inRect(r.getBoundingClientRect(), x, y) ? locateNode(doc, n, x, y) : Option.none();
      });
    };
    var locateNode = function (doc, node, x, y) {
      return isText(node) ? locate(doc, node, x, y) : searchInChildren(doc, node, x, y);
    };
    var locate$1 = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rect = r.getBoundingClientRect();
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
      return locateNode(doc, node, boundedX, boundedY);
    };

    var COLLAPSE_TO_LEFT = true;
    var COLLAPSE_TO_RIGHT = false;
    var getCollapseDirection = function (rect, x) {
      return x - rect.left < rect.right - x ? COLLAPSE_TO_LEFT : COLLAPSE_TO_RIGHT;
    };
    var createCollapsedNode = function (doc, target, collapseDirection) {
      var r = doc.dom().createRange();
      r.selectNode(target.dom());
      r.collapse(collapseDirection);
      return r;
    };
    var locateInElement = function (doc, node, x) {
      var cursorRange = doc.dom().createRange();
      cursorRange.selectNode(node.dom());
      var rect = cursorRange.getBoundingClientRect();
      var collapseDirection = getCollapseDirection(rect, x);
      var f = collapseDirection === COLLAPSE_TO_LEFT ? first : last$1;
      return f(node).map(function (target) {
        return createCollapsedNode(doc, target, collapseDirection);
      });
    };
    var locateInEmpty = function (doc, node, x) {
      var rect = node.dom().getBoundingClientRect();
      var collapseDirection = getCollapseDirection(rect, x);
      return Option.some(createCollapsedNode(doc, node, collapseDirection));
    };
    var search = function (doc, node, x) {
      var f = children(node).length === 0 ? locateInEmpty : locateInElement;
      return f(doc, node, x);
    };

    var caretPositionFromPoint = function (doc, x, y) {
      return Option.from(doc.dom().caretPositionFromPoint(x, y)).bind(function (pos) {
        if (pos.offsetNode === null) {
          return Option.none();
        }
        var r = doc.dom().createRange();
        r.setStart(pos.offsetNode, pos.offset);
        r.collapse();
        return Option.some(r);
      });
    };
    var caretRangeFromPoint = function (doc, x, y) {
      return Option.from(doc.dom().caretRangeFromPoint(x, y));
    };
    var searchTextNodes = function (doc, node, x, y) {
      var r = doc.dom().createRange();
      r.selectNode(node.dom());
      var rect = r.getBoundingClientRect();
      var boundedX = Math.max(rect.left, Math.min(rect.right, x));
      var boundedY = Math.max(rect.top, Math.min(rect.bottom, y));
      return locate$1(doc, node, boundedX, boundedY);
    };
    var searchFromPoint = function (doc, x, y) {
      return Element.fromPoint(doc, x, y).bind(function (elem) {
        var fallback = function () {
          return search(doc, elem, x);
        };
        return children(elem).length === 0 ? fallback() : searchTextNodes(doc, elem, x, y).orThunk(fallback);
      });
    };
    var availableSearch = document.caretPositionFromPoint ? caretPositionFromPoint : document.caretRangeFromPoint ? caretRangeFromPoint : searchFromPoint;
    var fromPoint$1 = function (win, x, y) {
      var doc = Element.fromDom(win.document);
      return availableSearch(doc, x, y).map(function (rng) {
        return SimRange.create(Element.fromDom(rng.startContainer), rng.startOffset, Element.fromDom(rng.endContainer), rng.endOffset);
      });
    };

    var beforeSpecial = function (element, offset) {
      var name$1 = name(element);
      if ('input' === name$1) {
        return Situ.after(element);
      } else if (!contains([
          'br',
          'img'
        ], name$1)) {
        return Situ.on(element, offset);
      } else {
        return offset === 0 ? Situ.before(element) : Situ.after(element);
      }
    };
    var preprocessRelative = function (startSitu, finishSitu) {
      var start = startSitu.fold(Situ.before, beforeSpecial, Situ.after);
      var finish = finishSitu.fold(Situ.before, beforeSpecial, Situ.after);
      return Selection.relative(start, finish);
    };
    var preprocessExact = function (start, soffset, finish, foffset) {
      var startSitu = beforeSpecial(start, soffset);
      var finishSitu = beforeSpecial(finish, foffset);
      return Selection.relative(startSitu, finishSitu);
    };
    var preprocess = function (selection) {
      return selection.match({
        domRange: function (rng) {
          var start = Element.fromDom(rng.startContainer);
          var finish = Element.fromDom(rng.endContainer);
          return preprocessExact(start, rng.startOffset, finish, rng.endOffset);
        },
        relative: preprocessRelative,
        exact: preprocessExact
      });
    };

    var makeRange = function (start, soffset, finish, foffset) {
      var doc = owner(start);
      var rng = doc.dom().createRange();
      rng.setStart(start.dom(), soffset);
      rng.setEnd(finish.dom(), foffset);
      return rng;
    };
    var after$3 = function (start, soffset, finish, foffset) {
      var r = makeRange(start, soffset, finish, foffset);
      var same = eq(start, finish) && soffset === foffset;
      return r.collapsed && !same;
    };

    var doSetNativeRange = function (win, rng) {
      Option.from(win.getSelection()).each(function (selection) {
        selection.removeAllRanges();
        selection.addRange(rng);
      });
    };
    var doSetRange = function (win, start, soffset, finish, foffset) {
      var rng = exactToNative(win, start, soffset, finish, foffset);
      doSetNativeRange(win, rng);
    };
    var setLegacyRtlRange = function (win, selection, start, soffset, finish, foffset) {
      selection.collapse(start.dom(), soffset);
      selection.extend(finish.dom(), foffset);
    };
    var setRangeFromRelative = function (win, relative) {
      return diagnose(win, relative).match({
        ltr: function (start, soffset, finish, foffset) {
          doSetRange(win, start, soffset, finish, foffset);
        },
        rtl: function (start, soffset, finish, foffset) {
          var selection = win.getSelection();
          if (selection.setBaseAndExtent) {
            selection.setBaseAndExtent(start.dom(), soffset, finish.dom(), foffset);
          } else if (selection.extend) {
            try {
              setLegacyRtlRange(win, selection, start, soffset, finish, foffset);
            } catch (e) {
              doSetRange(win, finish, foffset, start, soffset);
            }
          } else {
            doSetRange(win, finish, foffset, start, soffset);
          }
        }
      });
    };
    var setExact = function (win, start, soffset, finish, foffset) {
      var relative = preprocessExact(start, soffset, finish, foffset);
      setRangeFromRelative(win, relative);
    };
    var setRelative = function (win, startSitu, finishSitu) {
      var relative = preprocessRelative(startSitu, finishSitu);
      setRangeFromRelative(win, relative);
    };
    var toNative = function (selection) {
      var win = Selection.getWin(selection).dom();
      var getDomRange = function (start, soffset, finish, foffset) {
        return exactToNative(win, start, soffset, finish, foffset);
      };
      var filtered = preprocess(selection);
      return diagnose(win, filtered).match({
        ltr: getDomRange,
        rtl: getDomRange
      });
    };
    var readRange = function (selection) {
      if (selection.rangeCount > 0) {
        var firstRng = selection.getRangeAt(0);
        var lastRng = selection.getRangeAt(selection.rangeCount - 1);
        return Option.some(SimRange.create(Element.fromDom(firstRng.startContainer), firstRng.startOffset, Element.fromDom(lastRng.endContainer), lastRng.endOffset));
      } else {
        return Option.none();
      }
    };
    var doGetExact = function (selection) {
      var anchor = Element.fromDom(selection.anchorNode);
      var focus = Element.fromDom(selection.focusNode);
      return after$3(anchor, selection.anchorOffset, focus, selection.focusOffset) ? Option.some(SimRange.create(anchor, selection.anchorOffset, focus, selection.focusOffset)) : readRange(selection);
    };
    var setToElement = function (win, element) {
      var rng = selectNodeContents(win, element);
      doSetNativeRange(win, rng);
    };
    var getExact = function (win) {
      return Option.from(win.getSelection()).filter(function (sel) {
        return sel.rangeCount > 0;
      }).bind(doGetExact);
    };
    var get$a = function (win) {
      return getExact(win).map(function (range) {
        return Selection.exact(range.start(), range.soffset(), range.finish(), range.foffset());
      });
    };
    var getFirstRect$1 = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return getFirstRect(rng);
    };
    var getAtPoint = function (win, x, y) {
      return fromPoint$1(win, x, y);
    };
    var clear = function (win) {
      var selection = win.getSelection();
      selection.removeAllRanges();
    };

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var forward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, CellNavigation.next(cell), lazyWire);
    };
    var backward = function (editor, isRoot, cell, lazyWire) {
      return go(editor, isRoot, CellNavigation.prev(cell), lazyWire);
    };
    var getCellFirstCursorPosition = function (editor, cell) {
      var selection = Selection.exact(cell, 0, cell, 0);
      return toNative(selection);
    };
    var getNewRowCursorPosition = function (editor, table) {
      var rows = descendants$1(table, 'tr');
      return last(rows).bind(function (last) {
        return descendant$1(last, 'td,th').map(function (first) {
          return getCellFirstCursorPosition(editor, first);
        });
      });
    };
    var go = function (editor, isRoot, cell, actions, lazyWire) {
      return cell.fold(Option.none, Option.none, function (current, next) {
        return first(next).map(function (cell) {
          return getCellFirstCursorPosition(editor, cell);
        });
      }, function (current) {
        return TableLookup.table(current, isRoot).bind(function (table) {
          var targets = TableTargets.noMenu(current);
          editor.undoManager.transact(function () {
            actions.insertRowsAfter(table, targets);
          });
          return getNewRowCursorPosition(editor, table);
        });
      });
    };
    var rootElements = [
      'table',
      'li',
      'dl'
    ];
    var handle$1 = function (event, editor, actions, lazyWire) {
      if (event.keyCode === global$3.TAB) {
        var body_1 = getBody$1(editor);
        var isRoot_1 = function (element) {
          var name$1 = name(element);
          return eq(element, body_1) || contains(rootElements, name$1);
        };
        var rng = editor.selection.getRng();
        if (rng.collapsed) {
          var start = Element.fromDom(rng.startContainer);
          TableLookup.cell(start, isRoot_1).each(function (cell) {
            event.preventDefault();
            var navigation = event.shiftKey ? backward : forward;
            var rng = navigation(editor, isRoot_1, cell, actions, lazyWire);
            rng.each(function (range) {
              editor.selection.setRng(range);
            });
          });
        }
      }
    };
    var TabContext = { handle: handle$1 };

    var create$4 = Immutable('selection', 'kill');
    var Response = { create: create$4 };

    var create$5 = function (start, soffset, finish, foffset) {
      return {
        start: constant(Situ.on(start, soffset)),
        finish: constant(Situ.on(finish, foffset))
      };
    };
    var Situs = { create: create$5 };

    var convertToRange = function (win, selection) {
      var rng = asLtrRange(win, selection);
      return SimRange.create(Element.fromDom(rng.startContainer), rng.startOffset, Element.fromDom(rng.endContainer), rng.endOffset);
    };
    var makeSitus = Situs.create;
    var Util = {
      convertToRange: convertToRange,
      makeSitus: makeSitus
    };

    var sync = function (container, isRoot, start, soffset, finish, foffset, selectRange) {
      if (!(eq(start, finish) && soffset === foffset)) {
        return closest$1(start, 'td,th', isRoot).bind(function (s) {
          return closest$1(finish, 'td,th', isRoot).bind(function (f) {
            return detect$5(container, isRoot, s, f, selectRange);
          });
        });
      } else {
        return Option.none();
      }
    };
    var detect$5 = function (container, isRoot, start, finish, selectRange) {
      if (!eq(start, finish)) {
        return CellSelection.identify(start, finish, isRoot).bind(function (cellSel) {
          var boxes = cellSel.boxes().getOr([]);
          if (boxes.length > 0) {
            selectRange(container, boxes, cellSel.start(), cellSel.finish());
            return Option.some(Response.create(Option.some(Util.makeSitus(start, 0, start, getEnd(start))), true));
          } else {
            return Option.none();
          }
        });
      } else {
        return Option.none();
      }
    };
    var update = function (rows, columns, container, selected, annotations) {
      var updateSelection = function (newSels) {
        annotations.clearBeforeUpdate(container);
        annotations.selectRange(container, newSels.boxes(), newSels.start(), newSels.finish());
        return newSels.boxes();
      };
      return CellSelection.shiftSelection(selected, rows, columns, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(updateSelection);
    };
    var KeySelection = {
      sync: sync,
      detect: detect$5,
      update: update
    };

    var traverse = Immutable('item', 'mode');
    var backtrack = function (universe, item, _direction, transition) {
      if (transition === void 0) {
        transition = sidestep;
      }
      return universe.property().parent(item).map(function (p) {
        return traverse(p, transition);
      });
    };
    var sidestep = function (universe, item, direction, transition) {
      if (transition === void 0) {
        transition = advance;
      }
      return direction.sibling(universe, item).map(function (p) {
        return traverse(p, transition);
      });
    };
    var advance = function (universe, item, direction, transition) {
      if (transition === void 0) {
        transition = advance;
      }
      var children = universe.property().children(item);
      var result = direction.first(children);
      return result.map(function (r) {
        return traverse(r, transition);
      });
    };
    var successors = [
      {
        current: backtrack,
        next: sidestep,
        fallback: Option.none()
      },
      {
        current: sidestep,
        next: advance,
        fallback: Option.some(backtrack)
      },
      {
        current: advance,
        next: advance,
        fallback: Option.some(sidestep)
      }
    ];
    var go$1 = function (universe, item, mode, direction, rules) {
      if (rules === void 0) {
        rules = successors;
      }
      var ruleOpt = find(rules, function (succ) {
        return succ.current === mode;
      });
      return ruleOpt.bind(function (rule) {
        return rule.current(universe, item, direction, rule.next).orThunk(function () {
          return rule.fallback.bind(function (fb) {
            return go$1(universe, item, fb, direction);
          });
        });
      });
    };

    var left = function () {
      var sibling = function (universe, item) {
        return universe.query().prevSibling(item);
      };
      var first = function (children) {
        return children.length > 0 ? Option.some(children[children.length - 1]) : Option.none();
      };
      return {
        sibling: sibling,
        first: first
      };
    };
    var right = function () {
      var sibling = function (universe, item) {
        return universe.query().nextSibling(item);
      };
      var first = function (children) {
        return children.length > 0 ? Option.some(children[0]) : Option.none();
      };
      return {
        sibling: sibling,
        first: first
      };
    };
    var Walkers = {
      left: left,
      right: right
    };

    var hone = function (universe, item, predicate, mode, direction, isRoot) {
      var next = go$1(universe, item, mode, direction);
      return next.bind(function (n) {
        if (isRoot(n.item())) {
          return Option.none();
        } else {
          return predicate(n.item()) ? Option.some(n.item()) : hone(universe, n.item(), predicate, n.mode(), direction, isRoot);
        }
      });
    };
    var left$1 = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, sidestep, Walkers.left(), isRoot);
    };
    var right$1 = function (universe, item, predicate, isRoot) {
      return hone(universe, item, predicate, sidestep, Walkers.right(), isRoot);
    };

    var isLeaf = function (universe) {
      return function (element) {
        return universe.property().children(element).length === 0;
      };
    };
    var before$3 = function (universe, item, isRoot) {
      return seekLeft(universe, item, isLeaf(universe), isRoot);
    };
    var after$4 = function (universe, item, isRoot) {
      return seekRight(universe, item, isLeaf(universe), isRoot);
    };
    var seekLeft = left$1;
    var seekRight = right$1;

    var universe$2 = DomUniverse();
    var before$4 = function (element, isRoot) {
      return before$3(universe$2, element, isRoot);
    };
    var after$5 = function (element, isRoot) {
      return after$4(universe$2, element, isRoot);
    };
    var seekLeft$1 = function (element, predicate, isRoot) {
      return seekLeft(universe$2, element, predicate, isRoot);
    };
    var seekRight$1 = function (element, predicate, isRoot) {
      return seekRight(universe$2, element, predicate, isRoot);
    };

    var ancestor$2 = function (scope, predicate, isRoot) {
      return ancestor(scope, predicate, isRoot).isSome();
    };

    var point = Immutable('element', 'offset');
    var delta = Immutable('element', 'deltaOffset');
    var range$2 = Immutable('element', 'start', 'finish');
    var points = Immutable('begin', 'end');
    var text = Immutable('element', 'text');

    var adt$5 = Adt.generate([
      { none: ['message'] },
      { success: [] },
      { failedUp: ['cell'] },
      { failedDown: ['cell'] }
    ]);
    var isOverlapping = function (bridge, before, after) {
      var beforeBounds = bridge.getRect(before);
      var afterBounds = bridge.getRect(after);
      return afterBounds.right > beforeBounds.left && afterBounds.left < beforeBounds.right;
    };
    var isRow = function (elem) {
      return closest$1(elem, 'tr');
    };
    var verify = function (bridge, before, beforeOffset, after, afterOffset, failure, isRoot) {
      return closest$1(after, 'td,th', isRoot).bind(function (afterCell) {
        return closest$1(before, 'td,th', isRoot).map(function (beforeCell) {
          if (!eq(afterCell, beforeCell)) {
            return DomParent.sharedOne(isRow, [
              afterCell,
              beforeCell
            ]).fold(function () {
              return isOverlapping(bridge, beforeCell, afterCell) ? adt$5.success() : failure(beforeCell);
            }, function (_sharedRow) {
              return failure(beforeCell);
            });
          } else {
            return eq(after, afterCell) && getEnd(afterCell) === afterOffset ? failure(beforeCell) : adt$5.none('in same cell');
          }
        });
      }).getOr(adt$5.none('default'));
    };
    var cata$2 = function (subject, onNone, onSuccess, onFailedUp, onFailedDown) {
      return subject.fold(onNone, onSuccess, onFailedUp, onFailedDown);
    };
    var BeforeAfter = __assign(__assign({}, adt$5), {
      verify: verify,
      cata: cata$2
    });

    var inAncestor = Immutable('ancestor', 'descendants', 'element', 'index');
    var inParent = Immutable('parent', 'children', 'element', 'index');
    var indexInParent = function (element) {
      return parent(element).bind(function (parent) {
        var children$1 = children(parent);
        return indexOf(children$1, element).map(function (index) {
          return inParent(parent, children$1, element, index);
        });
      });
    };
    var indexOf = function (elements, element) {
      return findIndex(elements, curry(eq, element));
    };

    var isBr = function (elem) {
      return name(elem) === 'br';
    };
    var gatherer = function (cand, gather, isRoot) {
      return gather(cand, isRoot).bind(function (target) {
        return isText(target) && get$3(target).trim().length === 0 ? gatherer(target, gather, isRoot) : Option.some(target);
      });
    };
    var handleBr = function (isRoot, element, direction) {
      return direction.traverse(element).orThunk(function () {
        return gatherer(element, direction.gather, isRoot);
      }).map(direction.relative);
    };
    var findBr = function (element, offset) {
      return child(element, offset).filter(isBr).orThunk(function () {
        return child(element, offset - 1).filter(isBr);
      });
    };
    var handleParent = function (isRoot, element, offset, direction) {
      return findBr(element, offset).bind(function (br) {
        return direction.traverse(br).fold(function () {
          return gatherer(br, direction.gather, isRoot).map(direction.relative);
        }, function (adjacent) {
          return indexInParent(adjacent).map(function (info) {
            return Situ.on(info.parent(), info.index());
          });
        });
      });
    };
    var tryBr = function (isRoot, element, offset, direction) {
      var target = isBr(element) ? handleBr(isRoot, element, direction) : handleParent(isRoot, element, offset, direction);
      return target.map(function (tgt) {
        return {
          start: constant(tgt),
          finish: constant(tgt)
        };
      });
    };
    var process = function (analysis) {
      return BeforeAfter.cata(analysis, function (message) {
        return Option.none();
      }, function () {
        return Option.none();
      }, function (cell) {
        return Option.some(point(cell, 0));
      }, function (cell) {
        return Option.some(point(cell, getEnd(cell)));
      });
    };
    var BrTags = {
      tryBr: tryBr,
      process: process
    };

    var nu$3 = MixedBag([
      'left',
      'top',
      'right',
      'bottom'
    ], []);
    var moveDown = function (caret, amount) {
      return nu$3({
        left: caret.left(),
        top: caret.top() + amount,
        right: caret.right(),
        bottom: caret.bottom() + amount
      });
    };
    var moveUp = function (caret, amount) {
      return nu$3({
        left: caret.left(),
        top: caret.top() - amount,
        right: caret.right(),
        bottom: caret.bottom() - amount
      });
    };
    var moveBottomTo = function (caret, bottom) {
      var height = caret.bottom() - caret.top();
      return nu$3({
        left: caret.left(),
        top: bottom - height,
        right: caret.right(),
        bottom: bottom
      });
    };
    var moveTopTo = function (caret, top) {
      var height = caret.bottom() - caret.top();
      return nu$3({
        left: caret.left(),
        top: top,
        right: caret.right(),
        bottom: top + height
      });
    };
    var translate = function (caret, xDelta, yDelta) {
      return nu$3({
        left: caret.left() + xDelta,
        top: caret.top() + yDelta,
        right: caret.right() + xDelta,
        bottom: caret.bottom() + yDelta
      });
    };
    var getTop$1 = function (caret) {
      return caret.top();
    };
    var getBottom = function (caret) {
      return caret.bottom();
    };
    var toString = function (caret) {
      return '(' + caret.left() + ', ' + caret.top() + ') -> (' + caret.right() + ', ' + caret.bottom() + ')';
    };
    var Carets = {
      nu: nu$3,
      moveUp: moveUp,
      moveDown: moveDown,
      moveBottomTo: moveBottomTo,
      moveTopTo: moveTopTo,
      getTop: getTop$1,
      getBottom: getBottom,
      translate: translate,
      toString: toString
    };

    var getPartialBox = function (bridge, element, offset) {
      if (offset >= 0 && offset < getEnd(element)) {
        return bridge.getRangedRect(element, offset, element, offset + 1);
      } else if (offset > 0) {
        return bridge.getRangedRect(element, offset - 1, element, offset);
      }
      return Option.none();
    };
    var toCaret = function (rect) {
      return Carets.nu({
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom
      });
    };
    var getElemBox = function (bridge, element) {
      return Option.some(bridge.getRect(element));
    };
    var getBoxAt = function (bridge, element, offset) {
      if (isElement(element)) {
        return getElemBox(bridge, element).map(toCaret);
      } else if (isText(element)) {
        return getPartialBox(bridge, element, offset).map(toCaret);
      } else {
        return Option.none();
      }
    };
    var getEntireBox = function (bridge, element) {
      if (isElement(element)) {
        return getElemBox(bridge, element).map(toCaret);
      } else if (isText(element)) {
        return bridge.getRangedRect(element, 0, element, getEnd(element)).map(toCaret);
      } else {
        return Option.none();
      }
    };
    var Rectangles = {
      getBoxAt: getBoxAt,
      getEntireBox: getEntireBox
    };

    var JUMP_SIZE = 5;
    var NUM_RETRIES = 100;
    var adt$6 = Adt.generate([
      { none: [] },
      { retry: ['caret'] }
    ]);
    var isOutside = function (caret, box) {
      return caret.left() < box.left() || Math.abs(box.right() - caret.left()) < 1 || caret.left() > box.right();
    };
    var inOutsideBlock = function (bridge, element, caret) {
      return closest(element, DomStructure.isBlock).fold(constant(false), function (cell) {
        return Rectangles.getEntireBox(bridge, cell).exists(function (box) {
          return isOutside(caret, box);
        });
      });
    };
    var adjustDown = function (bridge, element, guessBox, original, caret) {
      var lowerCaret = Carets.moveDown(caret, JUMP_SIZE);
      if (Math.abs(guessBox.bottom() - original.bottom()) < 1) {
        return adt$6.retry(lowerCaret);
      } else if (guessBox.top() > caret.bottom()) {
        return adt$6.retry(lowerCaret);
      } else if (guessBox.top() === caret.bottom()) {
        return adt$6.retry(Carets.moveDown(caret, 1));
      } else {
        return inOutsideBlock(bridge, element, caret) ? adt$6.retry(Carets.translate(lowerCaret, JUMP_SIZE, 0)) : adt$6.none();
      }
    };
    var adjustUp = function (bridge, element, guessBox, original, caret) {
      var higherCaret = Carets.moveUp(caret, JUMP_SIZE);
      if (Math.abs(guessBox.top() - original.top()) < 1) {
        return adt$6.retry(higherCaret);
      } else if (guessBox.bottom() < caret.top()) {
        return adt$6.retry(higherCaret);
      } else if (guessBox.bottom() === caret.top()) {
        return adt$6.retry(Carets.moveUp(caret, 1));
      } else {
        return inOutsideBlock(bridge, element, caret) ? adt$6.retry(Carets.translate(higherCaret, JUMP_SIZE, 0)) : adt$6.none();
      }
    };
    var upMovement = {
      point: Carets.getTop,
      adjuster: adjustUp,
      move: Carets.moveUp,
      gather: before$4
    };
    var downMovement = {
      point: Carets.getBottom,
      adjuster: adjustDown,
      move: Carets.moveDown,
      gather: after$5
    };
    var isAtTable = function (bridge, x, y) {
      return bridge.elementFromPoint(x, y).filter(function (elm) {
        return name(elm) === 'table';
      }).isSome();
    };
    var adjustForTable = function (bridge, movement, original, caret, numRetries) {
      return adjustTil(bridge, movement, original, movement.move(caret, JUMP_SIZE), numRetries);
    };
    var adjustTil = function (bridge, movement, original, caret, numRetries) {
      if (numRetries === 0) {
        return Option.some(caret);
      }
      if (isAtTable(bridge, caret.left(), movement.point(caret))) {
        return adjustForTable(bridge, movement, original, caret, numRetries - 1);
      }
      return bridge.situsFromPoint(caret.left(), movement.point(caret)).bind(function (guess) {
        return guess.start().fold(Option.none, function (element) {
          return Rectangles.getEntireBox(bridge, element).bind(function (guessBox) {
            return movement.adjuster(bridge, element, guessBox, original, caret).fold(Option.none, function (newCaret) {
              return adjustTil(bridge, movement, original, newCaret, numRetries - 1);
            });
          }).orThunk(function () {
            return Option.some(caret);
          });
        }, Option.none);
      });
    };
    var ieTryDown = function (bridge, caret) {
      return bridge.situsFromPoint(caret.left(), caret.bottom() + JUMP_SIZE);
    };
    var ieTryUp = function (bridge, caret) {
      return bridge.situsFromPoint(caret.left(), caret.top() - JUMP_SIZE);
    };
    var checkScroll = function (movement, adjusted, bridge) {
      if (movement.point(adjusted) > bridge.getInnerHeight()) {
        return Option.some(movement.point(adjusted) - bridge.getInnerHeight());
      } else if (movement.point(adjusted) < 0) {
        return Option.some(-movement.point(adjusted));
      } else {
        return Option.none();
      }
    };
    var retry = function (movement, bridge, caret) {
      var moved = movement.move(caret, JUMP_SIZE);
      var adjusted = adjustTil(bridge, movement, caret, moved, NUM_RETRIES).getOr(moved);
      return checkScroll(movement, adjusted, bridge).fold(function () {
        return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted));
      }, function (delta) {
        bridge.scrollBy(0, delta);
        return bridge.situsFromPoint(adjusted.left(), movement.point(adjusted) - delta);
      });
    };
    var Retries = {
      tryUp: curry(retry, upMovement),
      tryDown: curry(retry, downMovement),
      ieTryUp: ieTryUp,
      ieTryDown: ieTryDown,
      getJumpSize: constant(JUMP_SIZE)
    };

    var MAX_RETRIES = 20;
    var platform$2 = detect$3();
    var findSpot = function (bridge, isRoot, direction) {
      return bridge.getSelection().bind(function (sel) {
        return BrTags.tryBr(isRoot, sel.finish(), sel.foffset(), direction).fold(function () {
          return Option.some(point(sel.finish(), sel.foffset()));
        }, function (brNeighbour) {
          var range = bridge.fromSitus(brNeighbour);
          var analysis = BeforeAfter.verify(bridge, sel.finish(), sel.foffset(), range.finish(), range.foffset(), direction.failure, isRoot);
          return BrTags.process(analysis);
        });
      });
    };
    var scan = function (bridge, isRoot, element, offset, direction, numRetries) {
      if (numRetries === 0) {
        return Option.none();
      }
      return tryCursor(bridge, isRoot, element, offset, direction).bind(function (situs) {
        var range = bridge.fromSitus(situs);
        var analysis = BeforeAfter.verify(bridge, element, offset, range.finish(), range.foffset(), direction.failure, isRoot);
        return BeforeAfter.cata(analysis, function () {
          return Option.none();
        }, function () {
          return Option.some(situs);
        }, function (cell) {
          if (eq(element, cell) && offset === 0) {
            return tryAgain(bridge, element, offset, Carets.moveUp, direction);
          } else {
            return scan(bridge, isRoot, cell, 0, direction, numRetries - 1);
          }
        }, function (cell) {
          if (eq(element, cell) && offset === getEnd(cell)) {
            return tryAgain(bridge, element, offset, Carets.moveDown, direction);
          } else {
            return scan(bridge, isRoot, cell, getEnd(cell), direction, numRetries - 1);
          }
        });
      });
    };
    var tryAgain = function (bridge, element, offset, move, direction) {
      return Rectangles.getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, move(box, Retries.getJumpSize()));
      });
    };
    var tryAt = function (bridge, direction, box) {
      if (platform$2.browser.isChrome() || platform$2.browser.isSafari() || platform$2.browser.isFirefox() || platform$2.browser.isEdge()) {
        return direction.otherRetry(bridge, box);
      } else if (platform$2.browser.isIE()) {
        return direction.ieRetry(bridge, box);
      } else {
        return Option.none();
      }
    };
    var tryCursor = function (bridge, isRoot, element, offset, direction) {
      return Rectangles.getBoxAt(bridge, element, offset).bind(function (box) {
        return tryAt(bridge, direction, box);
      });
    };
    var handle$2 = function (bridge, isRoot, direction) {
      return findSpot(bridge, isRoot, direction).bind(function (spot) {
        return scan(bridge, isRoot, spot.element(), spot.offset(), direction, MAX_RETRIES).map(bridge.fromSitus);
      });
    };
    var TableKeys = { handle: handle$2 };

    var detection = detect$3();
    var inSameTable = function (elem, table) {
      return ancestor$2(elem, function (e) {
        return parent(e).exists(function (p) {
          return eq(p, table);
        });
      });
    };
    var simulate = function (bridge, isRoot, direction, initial, anchor) {
      return closest$1(initial, 'td,th', isRoot).bind(function (start) {
        return closest$1(start, 'table', isRoot).bind(function (table) {
          if (!inSameTable(anchor, table)) {
            return Option.none();
          }
          return TableKeys.handle(bridge, isRoot, direction).bind(function (range) {
            return closest$1(range.finish(), 'td,th', isRoot).map(function (finish) {
              return {
                start: constant(start),
                finish: constant(finish),
                range: constant(range)
              };
            });
          });
        });
      });
    };
    var navigate = function (bridge, isRoot, direction, initial, anchor, precheck) {
      if (detection.browser.isIE()) {
        return Option.none();
      } else {
        return precheck(initial, isRoot).orThunk(function () {
          return simulate(bridge, isRoot, direction, initial, anchor).map(function (info) {
            var range = info.range();
            return Response.create(Option.some(Util.makeSitus(range.start(), range.soffset(), range.finish(), range.foffset())), true);
          });
        });
      }
    };
    var firstUpCheck = function (initial, isRoot) {
      return closest$1(initial, 'tr', isRoot).bind(function (startRow) {
        return closest$1(startRow, 'table', isRoot).bind(function (table) {
          var rows = descendants$1(table, 'tr');
          if (eq(startRow, rows[0])) {
            return seekLeft$1(table, function (element) {
              return last$1(element).isSome();
            }, isRoot).map(function (last) {
              var lastOffset = getEnd(last);
              return Response.create(Option.some(Util.makeSitus(last, lastOffset, last, lastOffset)), true);
            });
          } else {
            return Option.none();
          }
        });
      });
    };
    var lastDownCheck = function (initial, isRoot) {
      return closest$1(initial, 'tr', isRoot).bind(function (startRow) {
        return closest$1(startRow, 'table', isRoot).bind(function (table) {
          var rows = descendants$1(table, 'tr');
          if (eq(startRow, rows[rows.length - 1])) {
            return seekRight$1(table, function (element) {
              return first(element).isSome();
            }, isRoot).map(function (first) {
              return Response.create(Option.some(Util.makeSitus(first, 0, first, 0)), true);
            });
          } else {
            return Option.none();
          }
        });
      });
    };
    var select = function (bridge, container, isRoot, direction, initial, anchor, selectRange) {
      return simulate(bridge, isRoot, direction, initial, anchor).bind(function (info) {
        return KeySelection.detect(container, isRoot, info.start(), info.finish(), selectRange);
      });
    };
    var VerticalMovement = {
      navigate: navigate,
      select: select,
      firstUpCheck: firstUpCheck,
      lastDownCheck: lastDownCheck
    };

    var findCell = function (target, isRoot) {
      return closest$1(target, 'td,th', isRoot);
    };
    function MouseSelection (bridge, container, isRoot, annotations) {
      var cursor = Option.none();
      var clearState = function () {
        cursor = Option.none();
      };
      var mousedown = function (event) {
        annotations.clear(container);
        cursor = findCell(event.target(), isRoot);
      };
      var mouseover = function (event) {
        cursor.each(function (start) {
          annotations.clearBeforeUpdate(container);
          findCell(event.target(), isRoot).each(function (finish) {
            CellSelection.identify(start, finish, isRoot).each(function (cellSel) {
              var boxes = cellSel.boxes().getOr([]);
              if (boxes.length > 1 || boxes.length === 1 && !eq(start, finish)) {
                annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
                bridge.selectContents(finish);
              }
            });
          });
        });
      };
      var mouseup = function (_event) {
        cursor.each(clearState);
      };
      return {
        mousedown: mousedown,
        mouseover: mouseover,
        mouseup: mouseup
      };
    }

    var down = {
      traverse: nextSibling,
      gather: after$5,
      relative: Situ.before,
      otherRetry: Retries.tryDown,
      ieRetry: Retries.ieTryDown,
      failure: BeforeAfter.failedDown
    };
    var up = {
      traverse: prevSibling,
      gather: before$4,
      relative: Situ.before,
      otherRetry: Retries.tryUp,
      ieRetry: Retries.ieTryUp,
      failure: BeforeAfter.failedUp
    };
    var KeyDirection = {
      down: down,
      up: up
    };

    var isKey = function (key) {
      return function (keycode) {
        return keycode === key;
      };
    };
    var isUp = isKey(38);
    var isDown = isKey(40);
    var isNavigation = function (keycode) {
      return keycode >= 37 && keycode <= 40;
    };
    var SelectionKeys = {
      ltr: {
        isBackward: isKey(37),
        isForward: isKey(39)
      },
      rtl: {
        isBackward: isKey(39),
        isForward: isKey(37)
      },
      isUp: isUp,
      isDown: isDown,
      isNavigation: isNavigation
    };

    var toRaw = function (sr) {
      return {
        left: sr.left(),
        top: sr.top(),
        right: sr.right(),
        bottom: sr.bottom(),
        width: sr.width(),
        height: sr.height()
      };
    };
    var Rect = { toRaw: toRaw };

    var isSafari = detect$3().browser.isSafari();
    var get$b = function (_DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var x = doc.body.scrollLeft || doc.documentElement.scrollLeft;
      var y = doc.body.scrollTop || doc.documentElement.scrollTop;
      return Position(x, y);
    };
    var by = function (x, y, _DOC) {
      var doc = _DOC !== undefined ? _DOC.dom() : domGlobals.document;
      var win = doc.defaultView;
      win.scrollBy(x, y);
    };

    var WindowBridge = function (win) {
      var elementFromPoint = function (x, y) {
        return Element.fromPoint(Element.fromDom(win.document), x, y);
      };
      var getRect = function (element) {
        return element.dom().getBoundingClientRect();
      };
      var getRangedRect = function (start, soffset, finish, foffset) {
        var sel = Selection.exact(start, soffset, finish, foffset);
        return getFirstRect$1(win, sel).map(Rect.toRaw);
      };
      var getSelection = function () {
        return get$a(win).map(function (exactAdt) {
          return Util.convertToRange(win, exactAdt);
        });
      };
      var fromSitus = function (situs) {
        var relative = Selection.relative(situs.start(), situs.finish());
        return Util.convertToRange(win, relative);
      };
      var situsFromPoint = function (x, y) {
        return getAtPoint(win, x, y).map(function (exact) {
          return Situs.create(exact.start(), exact.soffset(), exact.finish(), exact.foffset());
        });
      };
      var clearSelection = function () {
        clear(win);
      };
      var collapseSelection = function (toStart) {
        if (toStart === void 0) {
          toStart = false;
        }
        get$a(win).each(function (sel) {
          return sel.fold(function (rng) {
            return rng.collapse(toStart);
          }, function (startSitu, finishSitu) {
            var situ = toStart ? startSitu : finishSitu;
            setRelative(win, situ, situ);
          }, function (start, soffset, finish, foffset) {
            var node = toStart ? start : finish;
            var offset = toStart ? soffset : foffset;
            setExact(win, node, offset, node, offset);
          });
        });
      };
      var selectContents = function (element) {
        setToElement(win, element);
      };
      var setSelection = function (sel) {
        setExact(win, sel.start(), sel.soffset(), sel.finish(), sel.foffset());
      };
      var setRelativeSelection = function (start, finish) {
        setRelative(win, start, finish);
      };
      var getInnerHeight = function () {
        return win.innerHeight;
      };
      var getScrollY = function () {
        var pos = get$b(Element.fromDom(win.document));
        return pos.top();
      };
      var scrollBy = function (x, y) {
        by(x, y, Element.fromDom(win.document));
      };
      return {
        elementFromPoint: elementFromPoint,
        getRect: getRect,
        getRangedRect: getRangedRect,
        getSelection: getSelection,
        fromSitus: fromSitus,
        situsFromPoint: situsFromPoint,
        clearSelection: clearSelection,
        collapseSelection: collapseSelection,
        setSelection: setSelection,
        setRelativeSelection: setRelativeSelection,
        selectContents: selectContents,
        getInnerHeight: getInnerHeight,
        getScrollY: getScrollY,
        scrollBy: scrollBy
      };
    };

    var rc = Immutable('rows', 'cols');
    var mouse = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      var handlers = MouseSelection(bridge, container, isRoot, annotations);
      return {
        mousedown: handlers.mousedown,
        mouseover: handlers.mouseover,
        mouseup: handlers.mouseup
      };
    };
    var keyboard = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      var clearToNavigate = function () {
        annotations.clear(container);
        return Option.none();
      };
      var keydown = function (event, start, soffset, finish, foffset, direction) {
        var realEvent = event.raw();
        var keycode = realEvent.which;
        var shiftKey = realEvent.shiftKey === true;
        var handler = CellSelection.retrieve(container, annotations.selectedSelector()).fold(function () {
          if (SelectionKeys.isDown(keycode) && shiftKey) {
            return curry(VerticalMovement.select, bridge, container, isRoot, KeyDirection.down, finish, start, annotations.selectRange);
          } else if (SelectionKeys.isUp(keycode) && shiftKey) {
            return curry(VerticalMovement.select, bridge, container, isRoot, KeyDirection.up, finish, start, annotations.selectRange);
          } else if (SelectionKeys.isDown(keycode)) {
            return curry(VerticalMovement.navigate, bridge, isRoot, KeyDirection.down, finish, start, VerticalMovement.lastDownCheck);
          } else if (SelectionKeys.isUp(keycode)) {
            return curry(VerticalMovement.navigate, bridge, isRoot, KeyDirection.up, finish, start, VerticalMovement.firstUpCheck);
          } else {
            return Option.none;
          }
        }, function (selected) {
          var update = function (attempts) {
            return function () {
              var navigation = findMap(attempts, function (delta) {
                return KeySelection.update(delta.rows(), delta.cols(), container, selected, annotations);
              });
              return navigation.fold(function () {
                return CellSelection.getEdges(container, annotations.firstSelectedSelector(), annotations.lastSelectedSelector()).map(function (edges) {
                  var relative = SelectionKeys.isDown(keycode) || direction.isForward(keycode) ? Situ.after : Situ.before;
                  bridge.setRelativeSelection(Situ.on(edges.first(), 0), relative(edges.table()));
                  annotations.clear(container);
                  return Response.create(Option.none(), true);
                });
              }, function (_) {
                return Option.some(Response.create(Option.none(), true));
              });
            };
          };
          if (SelectionKeys.isDown(keycode) && shiftKey) {
            return update([rc(+1, 0)]);
          } else if (SelectionKeys.isUp(keycode) && shiftKey) {
            return update([rc(-1, 0)]);
          } else if (direction.isBackward(keycode) && shiftKey) {
            return update([
              rc(0, -1),
              rc(-1, 0)
            ]);
          } else if (direction.isForward(keycode) && shiftKey) {
            return update([
              rc(0, +1),
              rc(+1, 0)
            ]);
          } else if (SelectionKeys.isNavigation(keycode) && shiftKey === false) {
            return clearToNavigate;
          } else {
            return Option.none;
          }
        });
        return handler();
      };
      var keyup = function (event, start, soffset, finish, foffset) {
        return CellSelection.retrieve(container, annotations.selectedSelector()).fold(function () {
          var realEvent = event.raw();
          var keycode = realEvent.which;
          var shiftKey = realEvent.shiftKey === true;
          if (shiftKey === false) {
            return Option.none();
          }
          if (SelectionKeys.isNavigation(keycode)) {
            return KeySelection.sync(container, isRoot, start, soffset, finish, foffset, annotations.selectRange);
          } else {
            return Option.none();
          }
        }, Option.none);
      };
      return {
        keydown: keydown,
        keyup: keyup
      };
    };
    var external = function (win, container, isRoot, annotations) {
      var bridge = WindowBridge(win);
      return function (start, finish) {
        annotations.clearBeforeUpdate(container);
        CellSelection.identify(start, finish, isRoot).each(function (cellSel) {
          var boxes = cellSel.boxes().getOr([]);
          annotations.selectRange(container, boxes, cellSel.start(), cellSel.finish());
          bridge.selectContents(finish);
          bridge.collapseSelection();
        });
      };
    };
    var InputHandlers = {
      mouse: mouse,
      keyboard: keyboard,
      external: external
    };

    var remove$7 = function (element, classes) {
      each(classes, function (x) {
        remove$5(element, x);
      });
    };

    var addClass = function (clazz) {
      return function (element) {
        add$2(element, clazz);
      };
    };
    var removeClasses = function (classes) {
      return function (element) {
        remove$7(element, classes);
      };
    };

    var byClass = function (ephemera) {
      var addSelectionClass = addClass(ephemera.selected());
      var removeSelectionClasses = removeClasses([
        ephemera.selected(),
        ephemera.lastSelected(),
        ephemera.firstSelected()
      ]);
      var clear = function (container) {
        var sels = descendants$1(container, ephemera.selectedSelector());
        each(sels, removeSelectionClasses);
      };
      var selectRange = function (container, cells, start, finish) {
        clear(container);
        each(cells, addSelectionClass);
        add$2(start, ephemera.firstSelected());
        add$2(finish, ephemera.lastSelected());
      };
      return {
        clearBeforeUpdate: clear,
        clear: clear,
        selectRange: selectRange,
        selectedSelector: ephemera.selectedSelector,
        firstSelectedSelector: ephemera.firstSelectedSelector,
        lastSelectedSelector: ephemera.lastSelectedSelector
      };
    };
    var byAttr = function (ephemera, onSelection, onClear) {
      var removeSelectionAttributes = function (element) {
        remove(element, ephemera.selected());
        remove(element, ephemera.firstSelected());
        remove(element, ephemera.lastSelected());
      };
      var addSelectionAttribute = function (element) {
        set(element, ephemera.selected(), '1');
      };
      var clear = function (container) {
        clearBeforeUpdate(container);
        onClear();
      };
      var clearBeforeUpdate = function (container) {
        var sels = descendants$1(container, ephemera.selectedSelector());
        each(sels, removeSelectionAttributes);
      };
      var selectRange = function (container, cells, start, finish) {
        clear(container);
        each(cells, addSelectionAttribute);
        set(start, ephemera.firstSelected(), '1');
        set(finish, ephemera.lastSelected(), '1');
        onSelection(cells, start, finish);
      };
      return {
        clearBeforeUpdate: clearBeforeUpdate,
        clear: clear,
        selectRange: selectRange,
        selectedSelector: ephemera.selectedSelector,
        firstSelectedSelector: ephemera.firstSelectedSelector,
        lastSelectedSelector: ephemera.lastSelectedSelector
      };
    };
    var SelectionAnnotation = {
      byClass: byClass,
      byAttr: byAttr
    };

    var getUpOrLeftCells = function (grid, selectedCells, generators) {
      var upGrid = grid.slice(0, selectedCells[selectedCells.length - 1].row() + 1);
      var upDetails = toDetailList(upGrid, generators);
      return bind(upDetails, function (detail) {
        var slicedCells = detail.cells().slice(0, selectedCells[selectedCells.length - 1].column() + 1);
        return map(slicedCells, function (cell) {
          return cell.element();
        });
      });
    };
    var getDownOrRightCells = function (grid, selectedCells, generators) {
      var downGrid = grid.slice(selectedCells[0].row() + selectedCells[0].rowspan() - 1, grid.length);
      var downDetails = toDetailList(downGrid, generators);
      return bind(downDetails, function (detail) {
        var slicedCells = detail.cells().slice(selectedCells[0].column() + selectedCells[0].colspan() - 1, +detail.cells().length);
        return map(slicedCells, function (cell) {
          return cell.element();
        });
      });
    };
    var getOtherCells = function (table, target, generators) {
      var list = DetailsList.fromTable(table);
      var house = Warehouse.generate(list);
      var details = onCells(house, target);
      return details.map(function (selectedCells) {
        var grid = Transitions.toGrid(house, generators, false);
        var upOrLeftCells = getUpOrLeftCells(grid, selectedCells, generators);
        var downOrRightCells = getDownOrRightCells(grid, selectedCells, generators);
        return {
          upOrLeftCells: upOrLeftCells,
          downOrRightCells: downOrRightCells
        };
      });
    };
    var OtherCells = { getOtherCells: getOtherCells };

    var hasInternalTarget = function (e) {
      return has$2(Element.fromDom(e.target), 'ephox-snooker-resizer-bar') === false;
    };
    function CellSelection$1 (editor, lazyResize, selectionTargets) {
      var handlerStruct = MixedBag([
        'mousedown',
        'mouseover',
        'mouseup',
        'keyup',
        'keydown'
      ], []);
      var handlers = Option.none();
      var cloneFormats = getCloneElements(editor);
      var onSelection = function (cells, start, finish) {
        selectionTargets.targets().each(function (targets) {
          var tableOpt = TableLookup.table(start);
          tableOpt.each(function (table) {
            var doc = Element.fromDom(editor.getDoc());
            var generators = TableFill.cellOperations(noop, doc, cloneFormats);
            var otherCells = OtherCells.getOtherCells(table, targets, generators);
            fireTableSelectionChange(editor, cells, start, finish, otherCells);
          });
        });
      };
      var onClear = function () {
        fireTableSelectionClear(editor);
      };
      var annotations = SelectionAnnotation.byAttr(Ephemera, onSelection, onClear);
      editor.on('init', function (e) {
        var win = editor.getWin();
        var body = getBody$1(editor);
        var isRoot = getIsRoot(editor);
        var syncSelection = function () {
          var sel = editor.selection;
          var start = Element.fromDom(sel.getStart());
          var end = Element.fromDom(sel.getEnd());
          var shared = DomParent.sharedOne(TableLookup.table, [
            start,
            end
          ]);
          shared.fold(function () {
            annotations.clear(body);
          }, noop);
        };
        var mouseHandlers = InputHandlers.mouse(win, body, isRoot, annotations);
        var keyHandlers = InputHandlers.keyboard(win, body, isRoot, annotations);
        var external = InputHandlers.external(win, body, isRoot, annotations);
        var hasShiftKey = function (event) {
          return event.raw().shiftKey === true;
        };
        editor.on('TableSelectorChange', function (e) {
          external(e.start, e.finish);
        });
        var handleResponse = function (event, response) {
          if (!hasShiftKey(event)) {
            return;
          }
          if (response.kill()) {
            event.kill();
          }
          response.selection().each(function (ns) {
            var relative = Selection.relative(ns.start(), ns.finish());
            var rng = asLtrRange(win, relative);
            editor.selection.setRng(rng);
          });
        };
        var keyup = function (event) {
          var wrappedEvent = wrapEvent(event);
          if (wrappedEvent.raw().shiftKey && SelectionKeys.isNavigation(wrappedEvent.raw().which)) {
            var rng = editor.selection.getRng();
            var start = Element.fromDom(rng.startContainer);
            var end = Element.fromDom(rng.endContainer);
            keyHandlers.keyup(wrappedEvent, start, rng.startOffset, end, rng.endOffset).each(function (response) {
              handleResponse(wrappedEvent, response);
            });
          }
        };
        var keydown = function (event) {
          var wrappedEvent = wrapEvent(event);
          lazyResize().each(function (resize) {
            resize.hideBars();
          });
          var rng = editor.selection.getRng();
          var startContainer = Element.fromDom(editor.selection.getStart());
          var start = Element.fromDom(rng.startContainer);
          var end = Element.fromDom(rng.endContainer);
          var direction = Direction.directionAt(startContainer).isRtl() ? SelectionKeys.rtl : SelectionKeys.ltr;
          keyHandlers.keydown(wrappedEvent, start, rng.startOffset, end, rng.endOffset, direction).each(function (response) {
            handleResponse(wrappedEvent, response);
          });
          lazyResize().each(function (resize) {
            resize.showBars();
          });
        };
        var isMouseEvent = function (event) {
          return event.hasOwnProperty('x') && event.hasOwnProperty('y');
        };
        var wrapEvent = function (event) {
          var target = Element.fromDom(event.target);
          var stop = function () {
            event.stopPropagation();
          };
          var prevent = function () {
            event.preventDefault();
          };
          var kill = compose(prevent, stop);
          return {
            target: constant(target),
            x: constant(isMouseEvent(event) ? event.x : null),
            y: constant(isMouseEvent(event) ? event.y : null),
            stop: stop,
            prevent: prevent,
            kill: kill,
            raw: constant(event)
          };
        };
        var isLeftMouse = function (raw) {
          return raw.button === 0;
        };
        var isLeftButtonPressed = function (raw) {
          if (raw.buttons === undefined) {
            return true;
          }
          return (raw.buttons & 1) !== 0;
        };
        var mouseDown = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mousedown(wrapEvent(e));
          }
        };
        var mouseOver = function (e) {
          if (isLeftButtonPressed(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseover(wrapEvent(e));
          }
        };
        var mouseUp = function (e) {
          if (isLeftMouse(e) && hasInternalTarget(e)) {
            mouseHandlers.mouseup(wrapEvent(e));
          }
        };
        var getDoubleTap = function () {
          var lastTarget = Cell(Element.fromDom(body));
          var lastTimeStamp = Cell(0);
          var touchEnd = function (t) {
            var target = Element.fromDom(t.target);
            if (name(target) === 'td' || name(target) === 'th') {
              var lT = lastTarget.get();
              var lTS = lastTimeStamp.get();
              if (eq(lT, target) && t.timeStamp - lTS < 300) {
                t.preventDefault();
                external(target, target);
              }
            }
            lastTarget.set(target);
            lastTimeStamp.set(t.timeStamp);
          };
          return { touchEnd: touchEnd };
        };
        var doubleTap = getDoubleTap();
        editor.on('mousedown', mouseDown);
        editor.on('mouseover', mouseOver);
        editor.on('mouseup', mouseUp);
        editor.on('touchend', doubleTap.touchEnd);
        editor.on('keyup', keyup);
        editor.on('keydown', keydown);
        editor.on('NodeChange', syncSelection);
        handlers = Option.some(handlerStruct({
          mousedown: mouseDown,
          mouseover: mouseOver,
          mouseup: mouseUp,
          keyup: keyup,
          keydown: keydown
        }));
      });
      var destroy = function () {
        handlers.each(function (handlers) {
        });
      };
      return {
        clear: annotations.clear,
        destroy: destroy
      };
    }

    var Selections = function (editor) {
      var get = function () {
        var body = getBody$1(editor);
        return TableSelection.retrieve(body, Ephemera.selectedSelector()).fold(function () {
          if (editor.selection.getStart() === undefined) {
            return SelectionTypes.none();
          } else {
            return SelectionTypes.single(editor.selection);
          }
        }, function (cells) {
          return SelectionTypes.multiple(cells);
        });
      };
      return { get: get };
    };

    var getSelectionTargets = function (editor, selections) {
      var targets = Cell(Option.none());
      var changeHandlers = Cell([]);
      var findTargets = function () {
        return getSelectionStartCellOrCaption(editor).bind(function (cellOrCaption) {
          var table = TableLookup.table(cellOrCaption);
          return table.map(function (table) {
            if (name(cellOrCaption) === 'caption') {
              return TableTargets.notCell(cellOrCaption);
            } else {
              return TableTargets.forMenu(selections, table, cellOrCaption);
            }
          });
        });
      };
      var resetTargets = function () {
        targets.set(cached(findTargets)());
        each(changeHandlers.get(), function (handler) {
          return handler();
        });
      };
      var onSetup = function (api, isDisabled) {
        var handler = function () {
          return targets.get().fold(function () {
            api.setDisabled(true);
          }, function (targets) {
            api.setDisabled(isDisabled(targets));
          });
        };
        handler();
        changeHandlers.set(changeHandlers.get().concat([handler]));
        return function () {
          changeHandlers.set(filter(changeHandlers.get(), function (h) {
            return h !== handler;
          }));
        };
      };
      var onSetupTable = function (api) {
        return onSetup(api, function (_) {
          return false;
        });
      };
      var onSetupCellOrRow = function (api) {
        return onSetup(api, function (targets) {
          return name(targets.element()) === 'caption';
        });
      };
      var onSetupMergeable = function (api) {
        return onSetup(api, function (targets) {
          return targets.mergable().isNone();
        });
      };
      var onSetupUnmergeable = function (api) {
        return onSetup(api, function (targets) {
          return targets.unmergable().isNone();
        });
      };
      editor.on('NodeChange TableSelectorChange', resetTargets);
      return {
        onSetupTable: onSetupTable,
        onSetupCellOrRow: onSetupCellOrRow,
        onSetupMergeable: onSetupMergeable,
        onSetupUnmergeable: onSetupUnmergeable,
        resetTargets: resetTargets,
        targets: function () {
          return targets.get();
        }
      };
    };

    var addButtons = function (editor, selectionTargets) {
      editor.ui.registry.addMenuButton('table', {
        tooltip: 'Table',
        icon: 'table',
        fetch: function (callback) {
          return callback('inserttable | cell row column | advtablesort | tableprops deletetable');
        }
      });
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      editor.ui.registry.addButton('tableprops', {
        tooltip: 'Table properties',
        onAction: cmd('mceTableProps'),
        icon: 'table',
        onSetup: selectionTargets.onSetupTable
      });
      editor.ui.registry.addButton('tabledelete', {
        tooltip: 'Delete table',
        onAction: cmd('mceTableDelete'),
        icon: 'table-delete-table',
        onSetup: selectionTargets.onSetupTable
      });
      editor.ui.registry.addButton('tablecellprops', {
        tooltip: 'Cell properties',
        onAction: cmd('mceTableCellProps'),
        icon: 'table-cell-properties',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablemergecells', {
        tooltip: 'Merge cells',
        onAction: cmd('mceTableMergeCells'),
        icon: 'table-merge-cells',
        onSetup: selectionTargets.onSetupMergeable
      });
      editor.ui.registry.addButton('tablesplitcells', {
        tooltip: 'Split cell',
        onAction: cmd('mceTableSplitCells'),
        icon: 'table-split-cells',
        onSetup: selectionTargets.onSetupUnmergeable
      });
      editor.ui.registry.addButton('tableinsertrowbefore', {
        tooltip: 'Insert row before',
        onAction: cmd('mceTableInsertRowBefore'),
        icon: 'table-insert-row-above',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertrowafter', {
        tooltip: 'Insert row after',
        onAction: cmd('mceTableInsertRowAfter'),
        icon: 'table-insert-row-after',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tabledeleterow', {
        tooltip: 'Delete row',
        onAction: cmd('mceTableDeleteRow'),
        icon: 'table-delete-row',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablerowprops', {
        tooltip: 'Row properties',
        onAction: cmd('mceTableRowProps'),
        icon: 'table-row-properties',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertcolbefore', {
        tooltip: 'Insert column before',
        onAction: cmd('mceTableInsertColBefore'),
        icon: 'table-insert-column-before',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertcolafter', {
        tooltip: 'Insert column after',
        onAction: cmd('mceTableInsertColAfter'),
        icon: 'table-insert-column-after',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tabledeletecol', {
        tooltip: 'Delete column',
        onAction: cmd('mceTableDeleteCol'),
        icon: 'table-delete-column',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablecutrow', {
        tooltip: 'Cut row',
        onAction: cmd('mceTableCutRow'),
        icon: 'temporary-placeholder',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablecopyrow', {
        tooltip: 'Copy row',
        onAction: cmd('mceTableCopyRow'),
        icon: 'temporary-placeholder',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablepasterowbefore', {
        tooltip: 'Paste row before',
        onAction: cmd('mceTablePasteRowBefore'),
        icon: 'temporary-placeholder',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tablepasterowafter', {
        tooltip: 'Paste row after',
        onAction: cmd('mceTablePasteRowAfter'),
        icon: 'temporary-placeholder',
        onSetup: selectionTargets.onSetupCellOrRow
      });
      editor.ui.registry.addButton('tableinsertdialog', {
        tooltip: 'Insert table',
        onAction: cmd('mceInsertTable'),
        icon: 'table'
      });
    };
    var addToolbars = function (editor) {
      var isTable = function (table) {
        return editor.dom.is(table, 'table') && editor.getBody().contains(table);
      };
      var toolbar = getToolbar(editor);
      if (toolbar.length > 0) {
        editor.ui.registry.addContextToolbar('table', {
          predicate: isTable,
          items: toolbar,
          scope: 'node',
          position: 'node'
        });
      }
    };
    var Buttons = {
      addButtons: addButtons,
      addToolbars: addToolbars
    };

    var addMenuItems = function (editor, selectionTargets) {
      var cmd = function (command) {
        return function () {
          return editor.execCommand(command);
        };
      };
      var insertTableAction = function (_a) {
        var numRows = _a.numRows, numColumns = _a.numColumns;
        editor.undoManager.transact(function () {
          InsertTable.insert(editor, numColumns, numRows);
        });
        editor.addVisual();
      };
      var tableProperties = {
        text: 'Table properties',
        onSetup: selectionTargets.onSetupTable,
        onAction: cmd('mceTableProps')
      };
      var deleteTable = {
        text: 'Delete table',
        icon: 'table-delete-table',
        onSetup: selectionTargets.onSetupTable,
        onAction: cmd('mceTableDelete')
      };
      var rowItems = [
        {
          type: 'menuitem',
          text: 'Insert row before',
          icon: 'table-insert-row-above',
          onAction: cmd('mceTableInsertRowBefore'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Insert row after',
          icon: 'table-insert-row-after',
          onAction: cmd('mceTableInsertRowAfter'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Delete row',
          icon: 'table-delete-row',
          onAction: cmd('mceTableDeleteRow'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Row properties',
          icon: 'table-row-properties',
          onAction: cmd('mceTableRowProps'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        { type: 'separator' },
        {
          type: 'menuitem',
          text: 'Cut row',
          onAction: cmd('mceTableCutRow'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Copy row',
          onAction: cmd('mceTableCopyRow'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Paste row before',
          onAction: cmd('mceTablePasteRowBefore'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Paste row after',
          onAction: cmd('mceTablePasteRowAfter'),
          onSetup: selectionTargets.onSetupCellOrRow
        }
      ];
      var row = {
        type: 'nestedmenuitem',
        text: 'Row',
        getSubmenuItems: function () {
          return rowItems;
        }
      };
      var columnItems = [
        {
          type: 'menuitem',
          text: 'Insert column before',
          icon: 'table-insert-column-before',
          onAction: cmd('mceTableInsertColBefore'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Insert column after',
          icon: 'table-insert-column-after',
          onAction: cmd('mceTableInsertColAfter'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Delete column',
          icon: 'table-delete-column',
          onAction: cmd('mceTableDeleteCol'),
          onSetup: selectionTargets.onSetupCellOrRow
        }
      ];
      var column = {
        type: 'nestedmenuitem',
        text: 'Column',
        getSubmenuItems: function () {
          return columnItems;
        }
      };
      var cellItems = [
        {
          type: 'menuitem',
          text: 'Cell properties',
          icon: 'table-cell-properties',
          onAction: cmd('mceTableCellProps'),
          onSetup: selectionTargets.onSetupCellOrRow
        },
        {
          type: 'menuitem',
          text: 'Merge cells',
          icon: 'table-merge-cells',
          onAction: cmd('mceTableMergeCells'),
          onSetup: selectionTargets.onSetupMergeable
        },
        {
          type: 'menuitem',
          text: 'Split cell',
          icon: 'table-split-cells',
          onAction: cmd('mceTableSplitCells'),
          onSetup: selectionTargets.onSetupUnmergeable
        }
      ];
      var cell = {
        type: 'nestedmenuitem',
        text: 'Cell',
        getSubmenuItems: function () {
          return cellItems;
        }
      };
      if (hasTableGrid(editor) === false) {
        editor.ui.registry.addMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          onAction: cmd('mceInsertTable')
        });
      } else {
        editor.ui.registry.addNestedMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          getSubmenuItems: function () {
            return [{
                type: 'fancymenuitem',
                fancytype: 'inserttable',
                onAction: insertTableAction
              }];
          }
        });
      }
      editor.ui.registry.addMenuItem('inserttabledialog', {
        text: 'Insert table',
        icon: 'table',
        onAction: cmd('mceInsertTable')
      });
      editor.ui.registry.addMenuItem('tableprops', tableProperties);
      editor.ui.registry.addMenuItem('deletetable', deleteTable);
      editor.ui.registry.addNestedMenuItem('row', row);
      editor.ui.registry.addNestedMenuItem('column', column);
      editor.ui.registry.addNestedMenuItem('cell', cell);
      editor.ui.registry.addContextMenu('table', {
        update: function () {
          selectionTargets.resetTargets();
          return selectionTargets.targets().fold(function () {
            return '';
          }, function (targets) {
            if (name(targets.element()) === 'caption') {
              return 'tableprops deletetable';
            } else {
              return 'cell row column | advtablesort | tableprops deletetable';
            }
          });
        }
      });
    };
    var MenuItems = { addMenuItems: addMenuItems };

    var getClipboardRows = function (clipboardRows) {
      return clipboardRows.get().fold(function () {
        return;
      }, function (rows) {
        return map(rows, function (row) {
          return row.dom();
        });
      });
    };
    var setClipboardRows = function (rows, clipboardRows) {
      var sugarRows = map(rows, Element.fromDom);
      clipboardRows.set(Option.from(sugarRows));
    };
    var getApi = function (editor, clipboardRows, resizeHandler, selectionTargets) {
      return {
        insertTable: function (columns, rows) {
          return InsertTable.insert(editor, columns, rows);
        },
        setClipboardRows: function (rows) {
          return setClipboardRows(rows, clipboardRows);
        },
        getClipboardRows: function () {
          return getClipboardRows(clipboardRows);
        },
        resizeHandler: resizeHandler,
        selectionTargets: selectionTargets
      };
    };

    function Plugin(editor) {
      var selections = Selections(editor);
      var selectionTargets = getSelectionTargets(editor, selections);
      var resizeHandler = getResizeHandler(editor);
      var cellSelection = CellSelection$1(editor, resizeHandler.lazyResize, selectionTargets);
      var actions = TableActions(editor, resizeHandler.lazyWire);
      var clipboardRows = Cell(Option.none());
      Commands.registerCommands(editor, actions, cellSelection, selections, clipboardRows);
      Clipboard.registerEvents(editor, selections, actions, cellSelection);
      MenuItems.addMenuItems(editor, selectionTargets);
      Buttons.addButtons(editor, selectionTargets);
      Buttons.addToolbars(editor);
      editor.on('PreInit', function () {
        editor.serializer.addTempAttr(Ephemera.firstSelected());
        editor.serializer.addTempAttr(Ephemera.lastSelected());
      });
      if (hasTabNavigation(editor)) {
        editor.on('keydown', function (e) {
          TabContext.handle(e, editor, actions, resizeHandler.lazyWire);
        });
      }
      editor.on('remove', function () {
        resizeHandler.destroy();
        cellSelection.destroy();
      });
      return getApi(editor, clipboardRows, resizeHandler, selectionTargets);
    }
    function Plugin$1 () {
      global.add('table', Plugin);
    }

    Plugin$1();

}(window));
