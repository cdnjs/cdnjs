(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tty'), require('util'), require('os'), require('fs'), require('url'), require('child_process'), require('http'), require('https'), require('events'), require('crypto'), require('net'), require('tls'), require('zlib'), require('bufferutil'), require('stream'), require('utf-8-validate')) :
  typeof define === 'function' && define.amd ? define(['exports', 'tty', 'util', 'os', 'fs', 'url', 'child_process', 'http', 'https', 'events', 'crypto', 'net', 'tls', 'zlib', 'bufferutil', 'stream', 'utf-8-validate'], factory) :
  (global = global || self, factory(global.CreatePlugin = {}, global.tty, global.util, global.os, global.fs, global.url$1, global.child_process, global.http, global.https, global.events, global.crypto, global.net, global.tls, global.zlib, global.bufferutil, global.stream, global.utf8Validate));
}(this, (function (exports, tty, util, os, fs, url$1, child_process, http, https, events, crypto, net, tls, zlib, bufferutil, stream, utf8Validate) { 'use strict';

  tty = tty && Object.prototype.hasOwnProperty.call(tty, 'default') ? tty['default'] : tty;
  util = util && Object.prototype.hasOwnProperty.call(util, 'default') ? util['default'] : util;
  os = os && Object.prototype.hasOwnProperty.call(os, 'default') ? os['default'] : os;
  fs = fs && Object.prototype.hasOwnProperty.call(fs, 'default') ? fs['default'] : fs;
  url$1 = url$1 && Object.prototype.hasOwnProperty.call(url$1, 'default') ? url$1['default'] : url$1;
  child_process = child_process && Object.prototype.hasOwnProperty.call(child_process, 'default') ? child_process['default'] : child_process;
  http = http && Object.prototype.hasOwnProperty.call(http, 'default') ? http['default'] : http;
  https = https && Object.prototype.hasOwnProperty.call(https, 'default') ? https['default'] : https;
  events = events && Object.prototype.hasOwnProperty.call(events, 'default') ? events['default'] : events;
  crypto = crypto && Object.prototype.hasOwnProperty.call(crypto, 'default') ? crypto['default'] : crypto;
  net = net && Object.prototype.hasOwnProperty.call(net, 'default') ? net['default'] : net;
  tls = tls && Object.prototype.hasOwnProperty.call(tls, 'default') ? tls['default'] : tls;
  zlib = zlib && Object.prototype.hasOwnProperty.call(zlib, 'default') ? zlib['default'] : zlib;
  bufferutil = bufferutil && Object.prototype.hasOwnProperty.call(bufferutil, 'default') ? bufferutil['default'] : bufferutil;
  stream = stream && Object.prototype.hasOwnProperty.call(stream, 'default') ? stream['default'] : stream;
  utf8Validate = utf8Validate && Object.prototype.hasOwnProperty.call(utf8Validate, 'default') ? utf8Validate['default'] : utf8Validate;

  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function () {
      return !!t;
    })();
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : String(i);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = [
      'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
  ];

  var parseuri = function parseuri(str) {
      var src = str,
          b = str.indexOf('['),
          e = str.indexOf(']');

      if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
      }

      var m = re.exec(str || ''),
          uri = {},
          i = 14;

      while (i--) {
          uri[parts[i]] = m[i] || '';
      }

      if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
          uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
          uri.ipv6uri = true;
      }

      return uri;
  };

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function (val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }

  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
  	createDebug.debug = createDebug;
  	createDebug.default = createDebug;
  	createDebug.coerce = coerce;
  	createDebug.disable = disable;
  	createDebug.enable = enable;
  	createDebug.enabled = enabled;
  	createDebug.humanize = ms;

  	Object.keys(env).forEach(key => {
  		createDebug[key] = env[key];
  	});

  	/**
  	* Active `debug` instances.
  	*/
  	createDebug.instances = [];

  	/**
  	* The currently active debug mode names, and names to skip.
  	*/

  	createDebug.names = [];
  	createDebug.skips = [];

  	/**
  	* Map of special "%n" handling functions, for the debug "format" argument.
  	*
  	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  	*/
  	createDebug.formatters = {};

  	/**
  	* Selects a color for a debug namespace
  	* @param {String} namespace The namespace string for the for the debug instance to be colored
  	* @return {Number|String} An ANSI color code for the given namespace
  	* @api private
  	*/
  	function selectColor(namespace) {
  		let hash = 0;

  		for (let i = 0; i < namespace.length; i++) {
  			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
  			hash |= 0; // Convert to 32bit integer
  		}

  		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  	}
  	createDebug.selectColor = selectColor;

  	/**
  	* Create a debugger with the given `namespace`.
  	*
  	* @param {String} namespace
  	* @return {Function}
  	* @api public
  	*/
  	function createDebug(namespace) {
  		let prevTime;

  		function debug(...args) {
  			// Disabled?
  			if (!debug.enabled) {
  				return;
  			}

  			const self = debug;

  			// Set `diff` timestamp
  			const curr = Number(new Date());
  			const ms = curr - (prevTime || curr);
  			self.diff = ms;
  			self.prev = prevTime;
  			self.curr = curr;
  			prevTime = curr;

  			args[0] = createDebug.coerce(args[0]);

  			if (typeof args[0] !== 'string') {
  				// Anything else let's inspect with %O
  				args.unshift('%O');
  			}

  			// Apply any `formatters` transformations
  			let index = 0;
  			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
  				// If we encounter an escaped % then don't increase the array index
  				if (match === '%%') {
  					return match;
  				}
  				index++;
  				const formatter = createDebug.formatters[format];
  				if (typeof formatter === 'function') {
  					const val = args[index];
  					match = formatter.call(self, val);

  					// Now we need to remove `args[index]` since it's inlined in the `format`
  					args.splice(index, 1);
  					index--;
  				}
  				return match;
  			});

  			// Apply env-specific formatting (colors, etc.)
  			createDebug.formatArgs.call(self, args);

  			const logFn = self.log || createDebug.log;
  			logFn.apply(self, args);
  		}

  		debug.namespace = namespace;
  		debug.enabled = createDebug.enabled(namespace);
  		debug.useColors = createDebug.useColors();
  		debug.color = selectColor(namespace);
  		debug.destroy = destroy;
  		debug.extend = extend;
  		// Debug.formatArgs = formatArgs;
  		// debug.rawLog = rawLog;

  		// env-specific initialization logic for debug instances
  		if (typeof createDebug.init === 'function') {
  			createDebug.init(debug);
  		}

  		createDebug.instances.push(debug);

  		return debug;
  	}

  	function destroy() {
  		const index = createDebug.instances.indexOf(this);
  		if (index !== -1) {
  			createDebug.instances.splice(index, 1);
  			return true;
  		}
  		return false;
  	}

  	function extend(namespace, delimiter) {
  		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  		newDebug.log = this.log;
  		return newDebug;
  	}

  	/**
  	* Enables a debug mode by namespaces. This can include modes
  	* separated by a colon and wildcards.
  	*
  	* @param {String} namespaces
  	* @api public
  	*/
  	function enable(namespaces) {
  		createDebug.save(namespaces);

  		createDebug.names = [];
  		createDebug.skips = [];

  		let i;
  		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  		const len = split.length;

  		for (i = 0; i < len; i++) {
  			if (!split[i]) {
  				// ignore empty strings
  				continue;
  			}

  			namespaces = split[i].replace(/\*/g, '.*?');

  			if (namespaces[0] === '-') {
  				createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
  			} else {
  				createDebug.names.push(new RegExp('^' + namespaces + '$'));
  			}
  		}

  		for (i = 0; i < createDebug.instances.length; i++) {
  			const instance = createDebug.instances[i];
  			instance.enabled = createDebug.enabled(instance.namespace);
  		}
  	}

  	/**
  	* Disable debug output.
  	*
  	* @return {String} namespaces
  	* @api public
  	*/
  	function disable() {
  		const namespaces = [
  			...createDebug.names.map(toNamespace),
  			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
  		].join(',');
  		createDebug.enable('');
  		return namespaces;
  	}

  	/**
  	* Returns true if the given mode name is enabled, false otherwise.
  	*
  	* @param {String} name
  	* @return {Boolean}
  	* @api public
  	*/
  	function enabled(name) {
  		if (name[name.length - 1] === '*') {
  			return true;
  		}

  		let i;
  		let len;

  		for (i = 0, len = createDebug.skips.length; i < len; i++) {
  			if (createDebug.skips[i].test(name)) {
  				return false;
  			}
  		}

  		for (i = 0, len = createDebug.names.length; i < len; i++) {
  			if (createDebug.names[i].test(name)) {
  				return true;
  			}
  		}

  		return false;
  	}

  	/**
  	* Convert regexp to namespace
  	*
  	* @param {RegExp} regxep
  	* @return {String} namespace
  	* @api private
  	*/
  	function toNamespace(regexp) {
  		return regexp.toString()
  			.substring(2, regexp.toString().length - 2)
  			.replace(/\.\*\?$/, '*');
  	}

  	/**
  	* Coerce `val`.
  	*
  	* @param {Mixed} val
  	* @return {Mixed}
  	* @api private
  	*/
  	function coerce(val) {
  		if (val instanceof Error) {
  			return val.stack || val.message;
  		}
  		return val;
  	}

  	createDebug.enable(createDebug.load());

  	return createDebug;
  }

  var common = setup;

  var browser = createCommonjsModule(function (module, exports) {
  /* eslint-env browser */

  /**
   * This is the web browser implementation of `debug()`.
   */

  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();

  /**
   * Colors.
   */

  exports.colors = [
  	'#0000CC',
  	'#0000FF',
  	'#0033CC',
  	'#0033FF',
  	'#0066CC',
  	'#0066FF',
  	'#0099CC',
  	'#0099FF',
  	'#00CC00',
  	'#00CC33',
  	'#00CC66',
  	'#00CC99',
  	'#00CCCC',
  	'#00CCFF',
  	'#3300CC',
  	'#3300FF',
  	'#3333CC',
  	'#3333FF',
  	'#3366CC',
  	'#3366FF',
  	'#3399CC',
  	'#3399FF',
  	'#33CC00',
  	'#33CC33',
  	'#33CC66',
  	'#33CC99',
  	'#33CCCC',
  	'#33CCFF',
  	'#6600CC',
  	'#6600FF',
  	'#6633CC',
  	'#6633FF',
  	'#66CC00',
  	'#66CC33',
  	'#9900CC',
  	'#9900FF',
  	'#9933CC',
  	'#9933FF',
  	'#99CC00',
  	'#99CC33',
  	'#CC0000',
  	'#CC0033',
  	'#CC0066',
  	'#CC0099',
  	'#CC00CC',
  	'#CC00FF',
  	'#CC3300',
  	'#CC3333',
  	'#CC3366',
  	'#CC3399',
  	'#CC33CC',
  	'#CC33FF',
  	'#CC6600',
  	'#CC6633',
  	'#CC9900',
  	'#CC9933',
  	'#CCCC00',
  	'#CCCC33',
  	'#FF0000',
  	'#FF0033',
  	'#FF0066',
  	'#FF0099',
  	'#FF00CC',
  	'#FF00FF',
  	'#FF3300',
  	'#FF3333',
  	'#FF3366',
  	'#FF3399',
  	'#FF33CC',
  	'#FF33FF',
  	'#FF6600',
  	'#FF6633',
  	'#FF9900',
  	'#FF9933',
  	'#FFCC00',
  	'#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  // eslint-disable-next-line complexity
  function useColors() {
  	// NB: In an Electron preload script, document will be defined but not fully
  	// initialized. Since we know we're in Chrome, we'll just detect this case
  	// explicitly
  	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
  		return true;
  	}

  	// Internet Explorer and Edge do not support colors.
  	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
  		return false;
  	}

  	// Is webkit? http://stackoverflow.com/a/16459606/376773
  	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
  		// Is firebug? http://stackoverflow.com/a/398120/376773
  		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
  		// Is firefox >= v31?
  		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
  		// Double check webkit in userAgent just in case we are in a worker
  		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	args[0] = (this.useColors ? '%c' : '') +
  		this.namespace +
  		(this.useColors ? ' %c' : ' ') +
  		args[0] +
  		(this.useColors ? '%c ' : ' ') +
  		'+' + module.exports.humanize(this.diff);

  	if (!this.useColors) {
  		return;
  	}

  	const c = 'color: ' + this.color;
  	args.splice(1, 0, c, 'color: inherit');

  	// The final "%c" is somewhat tricky, because there could be other
  	// arguments passed either before or after the %c, so we need to
  	// figure out the correct index to insert the CSS into
  	let index = 0;
  	let lastC = 0;
  	args[0].replace(/%[a-zA-Z%]/g, match => {
  		if (match === '%%') {
  			return;
  		}
  		index++;
  		if (match === '%c') {
  			// We only are interested in the *last* %c
  			// (the user may have provided their own)
  			lastC = index;
  		}
  	});

  	args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */
  function log(...args) {
  	// This hackery is required for IE8/9, where
  	// the `console.log` function doesn't have 'apply'
  	return typeof console === 'object' &&
  		console.log &&
  		console.log(...args);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	try {
  		if (namespaces) {
  			exports.storage.setItem('debug', namespaces);
  		} else {
  			exports.storage.removeItem('debug');
  		}
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */
  function load() {
  	let r;
  	try {
  		r = exports.storage.getItem('debug');
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}

  	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  	if (!r && typeof process !== 'undefined' && 'env' in process) {
  		r = process.env.DEBUG;
  	}

  	return r;
  }

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
  	try {
  		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
  		// The Browser also has localStorage in the global context.
  		return localStorage;
  	} catch (error) {
  		// Swallow
  		// XXX (@Qix-) should we be logging these?
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  formatters.j = function (v) {
  	try {
  		return JSON.stringify(v);
  	} catch (error) {
  		return '[UnexpectedJSONParseError]: ' + error.message;
  	}
  };
  });
  var browser_1 = browser.log;
  var browser_2 = browser.formatArgs;
  var browser_3 = browser.save;
  var browser_4 = browser.load;
  var browser_5 = browser.useColors;
  var browser_6 = browser.storage;
  var browser_7 = browser.colors;

  var hasFlag = (flag, argv) => {
  	argv = argv || process.argv;
  	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
  	const pos = argv.indexOf(prefix + flag);
  	const terminatorPos = argv.indexOf('--');
  	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };

  const {env} = process;

  let forceColor;
  if (hasFlag('no-color') ||
  	hasFlag('no-colors') ||
  	hasFlag('color=false') ||
  	hasFlag('color=never')) {
  	forceColor = 0;
  } else if (hasFlag('color') ||
  	hasFlag('colors') ||
  	hasFlag('color=true') ||
  	hasFlag('color=always')) {
  	forceColor = 1;
  }
  if ('FORCE_COLOR' in env) {
  	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
  		forceColor = 1;
  	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
  		forceColor = 0;
  	} else {
  		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
  	}
  }

  function translateLevel(level) {
  	if (level === 0) {
  		return false;
  	}

  	return {
  		level,
  		hasBasic: true,
  		has256: level >= 2,
  		has16m: level >= 3
  	};
  }

  function supportsColor(stream) {
  	if (forceColor === 0) {
  		return 0;
  	}

  	if (hasFlag('color=16m') ||
  		hasFlag('color=full') ||
  		hasFlag('color=truecolor')) {
  		return 3;
  	}

  	if (hasFlag('color=256')) {
  		return 2;
  	}

  	if (stream && !stream.isTTY && forceColor === undefined) {
  		return 0;
  	}

  	const min = forceColor || 0;

  	if (env.TERM === 'dumb') {
  		return min;
  	}

  	if (process.platform === 'win32') {
  		// Node.js 7.5.0 is the first version of Node.js to include a patch to
  		// libuv that enables 256 color output on Windows. Anything earlier and it
  		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
  		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
  		// release that supports 256 colors. Windows 10 build 14931 is the first release
  		// that supports 16m/TrueColor.
  		const osRelease = os.release().split('.');
  		if (
  			Number(process.versions.node.split('.')[0]) >= 8 &&
  			Number(osRelease[0]) >= 10 &&
  			Number(osRelease[2]) >= 10586
  		) {
  			return Number(osRelease[2]) >= 14931 ? 3 : 2;
  		}

  		return 1;
  	}

  	if ('CI' in env) {
  		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
  			return 1;
  		}

  		return min;
  	}

  	if ('TEAMCITY_VERSION' in env) {
  		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  	}

  	if (env.COLORTERM === 'truecolor') {
  		return 3;
  	}

  	if ('TERM_PROGRAM' in env) {
  		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

  		switch (env.TERM_PROGRAM) {
  			case 'iTerm.app':
  				return version >= 3 ? 3 : 2;
  			case 'Apple_Terminal':
  				return 2;
  			// No default
  		}
  	}

  	if (/-256(color)?$/i.test(env.TERM)) {
  		return 2;
  	}

  	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
  		return 1;
  	}

  	if ('COLORTERM' in env) {
  		return 1;
  	}

  	return min;
  }

  function getSupportLevel(stream) {
  	const level = supportsColor(stream);
  	return translateLevel(level);
  }

  var supportsColor_1 = {
  	supportsColor: getSupportLevel,
  	stdout: getSupportLevel(process.stdout),
  	stderr: getSupportLevel(process.stderr)
  };

  var node = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   */

  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [6, 2, 3, 4, 5, 1];

  try {
  	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  	// eslint-disable-next-line import/no-extraneous-dependencies
  	const supportsColor = supportsColor_1;

  	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
  		exports.colors = [
  			20,
  			21,
  			26,
  			27,
  			32,
  			33,
  			38,
  			39,
  			40,
  			41,
  			42,
  			43,
  			44,
  			45,
  			56,
  			57,
  			62,
  			63,
  			68,
  			69,
  			74,
  			75,
  			76,
  			77,
  			78,
  			79,
  			80,
  			81,
  			92,
  			93,
  			98,
  			99,
  			112,
  			113,
  			128,
  			129,
  			134,
  			135,
  			148,
  			149,
  			160,
  			161,
  			162,
  			163,
  			164,
  			165,
  			166,
  			167,
  			168,
  			169,
  			170,
  			171,
  			172,
  			173,
  			178,
  			179,
  			184,
  			185,
  			196,
  			197,
  			198,
  			199,
  			200,
  			201,
  			202,
  			203,
  			204,
  			205,
  			206,
  			207,
  			208,
  			209,
  			214,
  			215,
  			220,
  			221
  		];
  	}
  } catch (error) {
  	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(key => {
  	return /^debug_/i.test(key);
  }).reduce((obj, key) => {
  	// Camel-case
  	const prop = key
  		.substring(6)
  		.toLowerCase()
  		.replace(/_([a-z])/g, (_, k) => {
  			return k.toUpperCase();
  		});

  	// Coerce string value into JS value
  	let val = process.env[key];
  	if (/^(yes|on|true|enabled)$/i.test(val)) {
  		val = true;
  	} else if (/^(no|off|false|disabled)$/i.test(val)) {
  		val = false;
  	} else if (val === 'null') {
  		val = null;
  	} else {
  		val = Number(val);
  	}

  	obj[prop] = val;
  	return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
  	return 'colors' in exports.inspectOpts ?
  		Boolean(exports.inspectOpts.colors) :
  		tty.isatty(process.stderr.fd);
  }

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
  	const {namespace: name, useColors} = this;

  	if (useColors) {
  		const c = this.color;
  		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
  		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

  		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
  		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
  	} else {
  		args[0] = getDate() + name + ' ' + args[0];
  	}
  }

  function getDate() {
  	if (exports.inspectOpts.hideDate) {
  		return '';
  	}
  	return new Date().toISOString() + ' ';
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log(...args) {
  	return process.stderr.write(util.format(...args) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */
  function save(namespaces) {
  	if (namespaces) {
  		process.env.DEBUG = namespaces;
  	} else {
  		// If you set a process.env field to null or undefined, it gets cast to the
  		// string 'null' or 'undefined'. Just delete instead.
  		delete process.env.DEBUG;
  	}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
  	return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init(debug) {
  	debug.inspectOpts = {};

  	const keys = Object.keys(exports.inspectOpts);
  	for (let i = 0; i < keys.length; i++) {
  		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  	}
  }

  module.exports = common(exports);

  const {formatters} = module.exports;

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  formatters.o = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util.inspect(v, this.inspectOpts)
  		.replace(/\s*\n\s*/g, ' ');
  };

  /**
   * Map %O to `util.inspect()`, allowing multiple lines if needed.
   */

  formatters.O = function (v) {
  	this.inspectOpts.colors = this.useColors;
  	return util.inspect(v, this.inspectOpts);
  };
  });
  var node_1 = node.init;
  var node_2 = node.log;
  var node_3 = node.formatArgs;
  var node_4 = node.save;
  var node_5 = node.load;
  var node_6 = node.useColors;
  var node_7 = node.colors;
  var node_8 = node.inspectOpts;

  var src = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer / nwjs process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  	module.exports = browser;
  } else {
  	module.exports = node;
  }
  });

  /**
   * Module dependencies.
   */


  var debug = src('socket.io-client:url');

  /**
   * Module exports.
   */

  var url_1 = url;

  /**
   * URL parser.
   *
   * @param {String} url
   * @param {Object} An object meant to mimic window.location.
   *                 Defaults to window.location.
   * @api public
   */

  function url (uri, loc) {
    var obj = uri;

    // default to window.location
    loc = loc || (typeof location !== 'undefined' && location);
    if (null == uri) uri = loc.protocol + '//' + loc.host;

    // relative path support
    if ('string' === typeof uri) {
      if ('/' === uri.charAt(0)) {
        if ('/' === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }

      if (!/^(https?|wss?):\/\//.test(uri)) {
        debug('protocol-less url %s', uri);
        if ('undefined' !== typeof loc) {
          uri = loc.protocol + '//' + uri;
        } else {
          uri = 'https://' + uri;
        }
      }

      // parse
      debug('parse %s', uri);
      obj = parseuri(uri);
    }

    // make sure we treat `localhost:80` and `localhost` equally
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = '80';
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = '443';
      }
    }

    obj.path = obj.path || '/';

    var ipv6 = obj.host.indexOf(':') !== -1;
    var host = ipv6 ? '[' + obj.host + ']' : obj.host;

    // define unique id
    obj.id = obj.protocol + '://' + host + ':' + obj.port;
    // define href
    obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

    return obj;
  }

  /**
   * Helpers.
   */

  var s$1 = 1000;
  var m$1 = s$1 * 60;
  var h$1 = m$1 * 60;
  var d$1 = h$1 * 24;
  var y$1 = d$1 * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$1 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$1(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$1(val) : fmtShort$1(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$1(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$1;
      case 'days':
      case 'day':
      case 'd':
        return n * d$1;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$1;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$1;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$1;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort$1(ms) {
    if (ms >= d$1) {
      return Math.round(ms / d$1) + 'd';
    }
    if (ms >= h$1) {
      return Math.round(ms / h$1) + 'h';
    }
    if (ms >= m$1) {
      return Math.round(ms / m$1) + 'm';
    }
    if (ms >= s$1) {
      return Math.round(ms / s$1) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong$1(ms) {
    return plural$1(ms, d$1, 'day') ||
      plural$1(ms, h$1, 'hour') ||
      plural$1(ms, m$1, 'minute') ||
      plural$1(ms, s$1, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural$1(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$1;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1 = debug$1.coerce;
  var debug_2 = debug$1.disable;
  var debug_3 = debug$1.enable;
  var debug_4 = debug$1.enabled;
  var debug_5 = debug$1.humanize;
  var debug_6 = debug$1.instances;
  var debug_7 = debug$1.names;
  var debug_8 = debug$1.skips;
  var debug_9 = debug$1.formatters;

  var browser$1 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$1;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1$1 = browser$1.log;
  var browser_2$1 = browser$1.formatArgs;
  var browser_3$1 = browser$1.save;
  var browser_4$1 = browser$1.load;
  var browser_5$1 = browser$1.useColors;
  var browser_6$1 = browser$1.storage;
  var browser_7$1 = browser$1.colors;

  var node$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$1;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util.format.apply(util, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1$1 = node$1.init;
  var node_2$1 = node$1.log;
  var node_3$1 = node$1.formatArgs;
  var node_4$1 = node$1.save;
  var node_5$1 = node$1.load;
  var node_6$1 = node$1.useColors;
  var node_7$1 = node$1.colors;
  var node_8$1 = node$1.inspectOpts;

  var src$1 = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser$1;
  } else {
    module.exports = node$1;
  }
  });

  var componentEmitter = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }

    // Remove event specific arrays for event types that no
    // one is subscribed for to avoid memory leak.
    if (callbacks.length === 0) {
      delete this._callbacks['$' + event];
    }

    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};

    var args = new Array(arguments.length - 1)
      , callbacks = this._callbacks['$' + event];

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  });

  var toString = {}.toString;

  var isarray = Array.isArray || function (arr) {
    return toString.call(arr) == '[object Array]';
  };

  var isBuffer = isBuf;

  var withNativeBuffer = typeof Buffer === 'function' && typeof Buffer.isBuffer === 'function';
  var withNativeArrayBuffer = typeof ArrayBuffer === 'function';

  var isView = function (obj) {
    return typeof ArrayBuffer.isView === 'function' ? ArrayBuffer.isView(obj) : (obj.buffer instanceof ArrayBuffer);
  };

  /**
   * Returns true if obj is a buffer or an arraybuffer.
   *
   * @api private
   */

  function isBuf(obj) {
    return (withNativeBuffer && Buffer.isBuffer(obj)) ||
            (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)));
  }

  /*global Blob,File*/

  /**
   * Module requirements
   */



  var toString$1 = Object.prototype.toString;
  var withNativeBlob = typeof Blob === 'function' || (typeof Blob !== 'undefined' && toString$1.call(Blob) === '[object BlobConstructor]');
  var withNativeFile = typeof File === 'function' || (typeof File !== 'undefined' && toString$1.call(File) === '[object FileConstructor]');

  /**
   * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
   * Anything with blobs or files should be fed through removeBlobs before coming
   * here.
   *
   * @param {Object} packet - socket.io event packet
   * @return {Object} with deconstructed packet and list of buffers
   * @api public
   */

  var deconstructPacket = function(packet) {
    var buffers = [];
    var packetData = packet.data;
    var pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length; // number of binary 'attachments'
    return {packet: pack, buffers: buffers};
  };

  function _deconstructPacket(data, buffers) {
    if (!data) return data;

    if (isBuffer(data)) {
      var placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (isarray(data)) {
      var newData = new Array(data.length);
      for (var i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === 'object' && !(data instanceof Date)) {
      var newData = {};
      for (var key in data) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
      return newData;
    }
    return data;
  }

  /**
   * Reconstructs a binary packet from its placeholder packet and buffers
   *
   * @param {Object} packet - event packet with placeholders
   * @param {Array} buffers - binary buffers to put in placeholder positions
   * @return {Object} reconstructed packet
   * @api public
   */

  var reconstructPacket = function(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    packet.attachments = undefined; // no longer useful
    return packet;
  };

  function _reconstructPacket(data, buffers) {
    if (!data) return data;

    if (data && data._placeholder === true) {
      var isIndexValid =
        typeof data.num === "number" &&
        data.num >= 0 &&
        data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
      } else {
        throw new Error("illegal attachments");
      }
    } else if (isarray(data)) {
      for (var i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === 'object') {
      for (var key in data) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }

    return data;
  }

  /**
   * Asynchronously removes Blobs or Files from data via
   * FileReader's readAsArrayBuffer method. Used before encoding
   * data as msgpack. Calls callback with the blobless data.
   *
   * @param {Object} data
   * @param {Function} callback
   * @api private
   */

  var removeBlobs = function(data, callback) {
    function _removeBlobs(obj, curKey, containingObject) {
      if (!obj) return obj;

      // convert any blob
      if ((withNativeBlob && obj instanceof Blob) ||
          (withNativeFile && obj instanceof File)) {
        pendingBlobs++;

        // async filereader
        var fileReader = new FileReader();
        fileReader.onload = function() { // this.result == arraybuffer
          if (containingObject) {
            containingObject[curKey] = this.result;
          }
          else {
            bloblessData = this.result;
          }

          // if nothing pending its callback time
          if(! --pendingBlobs) {
            callback(bloblessData);
          }
        };

        fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
      } else if (isarray(obj)) { // handle array
        for (var i = 0; i < obj.length; i++) {
          _removeBlobs(obj[i], i, obj);
        }
      } else if (typeof obj === 'object' && !isBuffer(obj)) { // and object
        for (var key in obj) {
          _removeBlobs(obj[key], key, obj);
        }
      }
    }

    var pendingBlobs = 0;
    var bloblessData = data;
    _removeBlobs(bloblessData);
    if (!pendingBlobs) {
      callback(bloblessData);
    }
  };

  var binary = {
  	deconstructPacket: deconstructPacket,
  	reconstructPacket: reconstructPacket,
  	removeBlobs: removeBlobs
  };

  var socket_ioParser = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */

  var debug = src$1('socket.io-parser');





  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = 4;

  /**
   * Packet types.
   *
   * @api public
   */

  exports.types = [
    'CONNECT',
    'DISCONNECT',
    'EVENT',
    'ACK',
    'ERROR',
    'BINARY_EVENT',
    'BINARY_ACK'
  ];

  /**
   * Packet type `connect`.
   *
   * @api public
   */

  exports.CONNECT = 0;

  /**
   * Packet type `disconnect`.
   *
   * @api public
   */

  exports.DISCONNECT = 1;

  /**
   * Packet type `event`.
   *
   * @api public
   */

  exports.EVENT = 2;

  /**
   * Packet type `ack`.
   *
   * @api public
   */

  exports.ACK = 3;

  /**
   * Packet type `error`.
   *
   * @api public
   */

  exports.ERROR = 4;

  /**
   * Packet type 'binary event'
   *
   * @api public
   */

  exports.BINARY_EVENT = 5;

  /**
   * Packet type `binary ack`. For acks with binary arguments.
   *
   * @api public
   */

  exports.BINARY_ACK = 6;

  /**
   * Encoder constructor.
   *
   * @api public
   */

  exports.Encoder = Encoder;

  /**
   * Decoder constructor.
   *
   * @api public
   */

  exports.Decoder = Decoder;

  /**
   * A socket.io Encoder instance
   *
   * @api public
   */

  function Encoder() {}

  var ERROR_PACKET = exports.ERROR + '"encode error"';

  /**
   * Encode a packet as a single string if non-binary, or as a
   * buffer sequence, depending on packet type.
   *
   * @param {Object} obj - packet object
   * @param {Function} callback - function to handle encodings (likely engine.write)
   * @return Calls callback with Array of encodings
   * @api public
   */

  Encoder.prototype.encode = function(obj, callback){
    debug('encoding packet %j', obj);

    if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
      encodeAsBinary(obj, callback);
    } else {
      var encoding = encodeAsString(obj);
      callback([encoding]);
    }
  };

  /**
   * Encode packet as string.
   *
   * @param {Object} packet
   * @return {String} encoded
   * @api private
   */

  function encodeAsString(obj) {

    // first is type
    var str = '' + obj.type;

    // attachments if we have them
    if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
      str += obj.attachments + '-';
    }

    // if we have a namespace other than `/`
    // we append it followed by a comma `,`
    if (obj.nsp && '/' !== obj.nsp) {
      str += obj.nsp + ',';
    }

    // immediately followed by the id
    if (null != obj.id) {
      str += obj.id;
    }

    // json data
    if (null != obj.data) {
      var payload = tryStringify(obj.data);
      if (payload !== false) {
        str += payload;
      } else {
        return ERROR_PACKET;
      }
    }

    debug('encoded %j as %s', obj, str);
    return str;
  }

  function tryStringify(str) {
    try {
      return JSON.stringify(str);
    } catch(e){
      return false;
    }
  }

  /**
   * Encode packet as 'buffer sequence' by removing blobs, and
   * deconstructing packet into object with placeholders and
   * a list of buffers.
   *
   * @param {Object} packet
   * @return {Buffer} encoded
   * @api private
   */

  function encodeAsBinary(obj, callback) {

    function writeEncoding(bloblessData) {
      var deconstruction = binary.deconstructPacket(bloblessData);
      var pack = encodeAsString(deconstruction.packet);
      var buffers = deconstruction.buffers;

      buffers.unshift(pack); // add packet info to beginning of data list
      callback(buffers); // write all the buffers
    }

    binary.removeBlobs(obj, writeEncoding);
  }

  /**
   * A socket.io Decoder instance
   *
   * @return {Object} decoder
   * @api public
   */

  function Decoder() {
    this.reconstructor = null;
  }

  /**
   * Mix in `Emitter` with Decoder.
   */

  componentEmitter(Decoder.prototype);

  /**
   * Decodes an encoded packet string into packet JSON.
   *
   * @param {String} obj - encoded packet
   * @return {Object} packet
   * @api public
   */

  Decoder.prototype.add = function(obj) {
    var packet;
    if (typeof obj === 'string') {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = decodeString(obj);
      if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
        this.reconstructor = new BinaryReconstructor(packet);

        // no attachments, labeled binary but no binary data to follow
        if (this.reconstructor.reconPack.attachments === 0) {
          this.emit('decoded', packet);
        }
      } else { // non-binary full packet
        this.emit('decoded', packet);
      }
    } else if (isBuffer(obj) || obj.base64) { // raw binary data
      if (!this.reconstructor) {
        throw new Error('got binary data when not reconstructing a packet');
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) { // received final buffer
          this.reconstructor = null;
          this.emit('decoded', packet);
        }
      }
    } else {
      throw new Error('Unknown type: ' + obj);
    }
  };

  /**
   * Decode a packet String (JSON data)
   *
   * @param {String} str
   * @return {Object} packet
   * @api private
   */

  function decodeString(str) {
    var i = 0;
    // look up type
    var p = {
      type: Number(str.charAt(0))
    };

    if (null == exports.types[p.type]) {
      return error('unknown packet type ' + p.type);
    }

    // look up attachments if type binary
    if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
      var start = i + 1;
      while (str.charAt(++i) !== '-' && i != str.length) {}
      var buf = str.substring(start, i);
      if (buf != Number(buf) || str.charAt(i) !== '-') {
        throw new Error('Illegal attachments');
      }
      p.attachments = Number(buf);
    }

    // look up namespace (if any)
    if ('/' === str.charAt(i + 1)) {
      var start = i + 1;
      while (++i) {
        var c = str.charAt(i);
        if (',' === c) break;
        if (i === str.length) break;
      }
      p.nsp = str.substring(start, i);
    } else {
      p.nsp = '/';
    }

    // look up id
    var next = str.charAt(i + 1);
    if ('' !== next && Number(next) == next) {
      var start = i + 1;
      while (++i) {
        var c = str.charAt(i);
        if (null == c || Number(c) != c) {
          --i;
          break;
        }
        if (i === str.length) break;
      }
      p.id = Number(str.substring(start, i + 1));
    }

    // look up json data
    if (str.charAt(++i)) {
      var payload = tryParse(str.substr(i));
      var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray(payload));
      if (isPayloadValid) {
        p.data = payload;
      } else {
        return error('invalid payload');
      }
    }

    debug('decoded %s as %j', str, p);
    return p;
  }

  function tryParse(str) {
    try {
      return JSON.parse(str);
    } catch(e){
      return false;
    }
  }

  /**
   * Deallocates a parser's resources
   *
   * @api public
   */

  Decoder.prototype.destroy = function() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  };

  /**
   * A manager of a binary event's 'buffer sequence'. Should
   * be constructed whenever a packet of type BINARY_EVENT is
   * decoded.
   *
   * @param {Object} packet
   * @return {BinaryReconstructor} initialized reconstructor
   * @api private
   */

  function BinaryReconstructor(packet) {
    this.reconPack = packet;
    this.buffers = [];
  }

  /**
   * Method to be called when binary data received from connection
   * after a BINARY_EVENT packet.
   *
   * @param {Buffer | ArrayBuffer} binData - the raw binary data received
   * @return {null | Object} returns null if more binary data is expected or
   *   a reconstructed packet object if all buffers have been received.
   * @api private
   */

  BinaryReconstructor.prototype.takeBinaryData = function(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
      var packet = binary.reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  };

  /**
   * Cleans up binary packet reconstruction variables.
   *
   * @api private
   */

  BinaryReconstructor.prototype.finishedReconstruction = function() {
    this.reconPack = null;
    this.buffers = [];
  };

  function error(msg) {
    return {
      type: exports.ERROR,
      data: 'parser error: ' + msg
    };
  }
  });
  var socket_ioParser_1 = socket_ioParser.protocol;
  var socket_ioParser_2 = socket_ioParser.types;
  var socket_ioParser_3 = socket_ioParser.CONNECT;
  var socket_ioParser_4 = socket_ioParser.DISCONNECT;
  var socket_ioParser_5 = socket_ioParser.EVENT;
  var socket_ioParser_6 = socket_ioParser.ACK;
  var socket_ioParser_7 = socket_ioParser.ERROR;
  var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
  var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
  var socket_ioParser_10 = socket_ioParser.Encoder;
  var socket_ioParser_11 = socket_ioParser.Decoder;

  /**
   * Wrapper for built-in http.js to emulate the browser XMLHttpRequest object.
   *
   * This can be used with JS designed for browsers to improve reuse of code and
   * allow the use of existing libraries.
   *
   * Usage: include("XMLHttpRequest.js") and use XMLHttpRequest per W3C specs.
   *
   * @author Dan DeFelippi <dan@driverdan.com>
   * @contributor David Ellis <d.f.ellis@ieee.org>
   * @license MIT
   */



  var spawn = child_process.spawn;

  /**
   * Module exports.
   */

  var XMLHttpRequest_1 = XMLHttpRequest;

  // backwards-compat
  XMLHttpRequest.XMLHttpRequest = XMLHttpRequest;

  /**
   * `XMLHttpRequest` constructor.
   *
   * Supported options for the `opts` object are:
   *
   *  - `agent`: An http.Agent instance; http.globalAgent may be used; if 'undefined', agent usage is disabled
   *
   * @param {Object} opts optional "options" object
   */

  function XMLHttpRequest(opts) {

    opts = opts || {};

    /**
     * Private variables
     */
    var self = this;
    var http$1 = http;
    var https$1 = https;

    // Holds http.js objects
    var request;
    var response;

    // Request settings
    var settings = {};

    // Disable header blacklist.
    // Not part of XHR specs.
    var disableHeaderCheck = false;

    // Set some default headers
    var defaultHeaders = {
      "User-Agent": "node-XMLHttpRequest",
      "Accept": "*/*"
    };

    var headers = Object.assign({}, defaultHeaders);

    // These headers are not user setable.
    // The following are allowed but banned in the spec:
    // * user-agent
    var forbiddenRequestHeaders = [
      "accept-charset",
      "accept-encoding",
      "access-control-request-headers",
      "access-control-request-method",
      "connection",
      "content-length",
      "content-transfer-encoding",
      "cookie",
      "cookie2",
      "date",
      "expect",
      "host",
      "keep-alive",
      "origin",
      "referer",
      "te",
      "trailer",
      "transfer-encoding",
      "upgrade",
      "via"
    ];

    // These request methods are not allowed
    var forbiddenRequestMethods = [
      "TRACE",
      "TRACK",
      "CONNECT"
    ];

    // Send flag
    var sendFlag = false;
    // Error flag, used when errors occur or abort is called
    var errorFlag = false;

    // Event listeners
    var listeners = {};

    /**
     * Constants
     */

    this.UNSENT = 0;
    this.OPENED = 1;
    this.HEADERS_RECEIVED = 2;
    this.LOADING = 3;
    this.DONE = 4;

    /**
     * Public vars
     */

    // Current state
    this.readyState = this.UNSENT;

    // default ready state change handler in case one is not set or is set late
    this.onreadystatechange = null;

    // Result & response
    this.responseText = "";
    this.responseXML = "";
    this.status = null;
    this.statusText = null;

    /**
     * Private methods
     */

    /**
     * Check if the specified header is allowed.
     *
     * @param string header Header to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpHeader = function(header) {
      return disableHeaderCheck || (header && forbiddenRequestHeaders.indexOf(header.toLowerCase()) === -1);
    };

    /**
     * Check if the specified method is allowed.
     *
     * @param string method Request method to validate
     * @return boolean False if not allowed, otherwise true
     */
    var isAllowedHttpMethod = function(method) {
      return (method && forbiddenRequestMethods.indexOf(method) === -1);
    };

    /**
     * Public methods
     */

    /**
     * Open the connection. Currently supports local server requests.
     *
     * @param string method Connection method (eg GET, POST)
     * @param string url URL for the connection.
     * @param boolean async Asynchronous connection. Default is true.
     * @param string user Username for basic authentication (optional)
     * @param string password Password for basic authentication (optional)
     */
    this.open = function(method, url, async, user, password) {
      this.abort();
      errorFlag = false;

      // Check for valid request method
      if (!isAllowedHttpMethod(method)) {
        throw "SecurityError: Request method not allowed";
      }

      settings = {
        "method": method,
        "url": url.toString(),
        "async": (typeof async !== "boolean" ? true : async),
        "user": user || null,
        "password": password || null
      };

      setState(this.OPENED);
    };

    /**
     * Disables or enables isAllowedHttpHeader() check the request. Enabled by default.
     * This does not conform to the W3C spec.
     *
     * @param boolean state Enable or disable header checking.
     */
    this.setDisableHeaderCheck = function(state) {
      disableHeaderCheck = state;
    };

    /**
     * Sets a header for the request.
     *
     * @param string header Header name
     * @param string value Header value
     * @return boolean Header added
     */
    this.setRequestHeader = function(header, value) {
      if (this.readyState != this.OPENED) {
        throw "INVALID_STATE_ERR: setRequestHeader can only be called when state is OPEN";
      }
      if (!isAllowedHttpHeader(header)) {
        console.warn('Refused to set unsafe header "' + header + '"');
        return false;
      }
      if (sendFlag) {
        throw "INVALID_STATE_ERR: send flag is true";
      }
      headers[header] = value;
      return true;
    };

    /**
     * Gets a header from the server response.
     *
     * @param string header Name of header to get.
     * @return string Text of the header or null if it doesn't exist.
     */
    this.getResponseHeader = function(header) {
      if (typeof header === "string"
        && this.readyState > this.OPENED
        && response.headers[header.toLowerCase()]
        && !errorFlag
      ) {
        return response.headers[header.toLowerCase()];
      }

      return null;
    };

    /**
     * Gets all the response headers.
     *
     * @return string A string with all response headers separated by CR+LF
     */
    this.getAllResponseHeaders = function() {
      if (this.readyState < this.HEADERS_RECEIVED || errorFlag) {
        return "";
      }
      var result = "";

      for (var i in response.headers) {
        // Cookie headers are excluded
        if (i !== "set-cookie" && i !== "set-cookie2") {
          result += i + ": " + response.headers[i] + "\r\n";
        }
      }
      return result.substr(0, result.length - 2);
    };

    /**
     * Gets a request header
     *
     * @param string name Name of header to get
     * @return string Returns the request header or empty string if not set
     */
    this.getRequestHeader = function(name) {
      // @TODO Make this case insensitive
      if (typeof name === "string" && headers[name]) {
        return headers[name];
      }

      return "";
    };

    /**
     * Sends the request to the server.
     *
     * @param string data Optional data to send as request body.
     */
    this.send = function(data) {
      if (this.readyState != this.OPENED) {
        throw "INVALID_STATE_ERR: connection must be opened before send() is called";
      }

      if (sendFlag) {
        throw "INVALID_STATE_ERR: send has already been called";
      }

      var ssl = false, local = false;
      var url = url$1.parse(settings.url);
      var host;
      // Determine the server
      switch (url.protocol) {
        case 'https:':
          ssl = true;
          // SSL & non-SSL both need host, no break here.
        case 'http:':
          host = url.hostname;
          break;

        case 'file:':
          local = true;
          break;

        case undefined:
        case '':
          host = "localhost";
          break;

        default:
          throw "Protocol not supported.";
      }

      // Load files off the local filesystem (file://)
      if (local) {
        if (settings.method !== "GET") {
          throw "XMLHttpRequest: Only GET method is supported";
        }

        if (settings.async) {
          fs.readFile(url.pathname, 'utf8', function(error, data) {
            if (error) {
              self.handleError(error);
            } else {
              self.status = 200;
              self.responseText = data;
              setState(self.DONE);
            }
          });
        } else {
          try {
            this.responseText = fs.readFileSync(url.pathname, 'utf8');
            this.status = 200;
            setState(self.DONE);
          } catch(e) {
            this.handleError(e);
          }
        }

        return;
      }

      // Default to port 80. If accessing localhost on another port be sure
      // to use http://localhost:port/path
      var port = url.port || (ssl ? 443 : 80);
      // Add query string if one is used
      var uri = url.pathname + (url.search ? url.search : '');

      // Set the Host header or the server may reject the request
      headers["Host"] = host;
      if (!((ssl && port === 443) || port === 80)) {
        headers["Host"] += ':' + url.port;
      }

      // Set Basic Auth if necessary
      if (settings.user) {
        if (typeof settings.password == "undefined") {
          settings.password = "";
        }
        var authBuf = new Buffer(settings.user + ":" + settings.password);
        headers["Authorization"] = "Basic " + authBuf.toString("base64");
      }

      // Set content length header
      if (settings.method === "GET" || settings.method === "HEAD") {
        data = null;
      } else if (data) {
        headers["Content-Length"] = Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data);

        if (!headers["Content-Type"]) {
          headers["Content-Type"] = "text/plain;charset=UTF-8";
        }
      } else if (settings.method === "POST") {
        // For a post with no data set Content-Length: 0.
        // This is required by buggy servers that don't meet the specs.
        headers["Content-Length"] = 0;
      }

      var agent = opts.agent || false;
      var options = {
        host: host,
        port: port,
        path: uri,
        method: settings.method,
        headers: headers,
        agent: agent
      };

      if (ssl) {
        options.pfx = opts.pfx;
        options.key = opts.key;
        options.passphrase = opts.passphrase;
        options.cert = opts.cert;
        options.ca = opts.ca;
        options.ciphers = opts.ciphers;
        options.rejectUnauthorized = opts.rejectUnauthorized;
      }

      // Reset error flag
      errorFlag = false;

      // Handle async requests
      if (settings.async) {
        // Use the proper protocol
        var doRequest = ssl ? https$1.request : http$1.request;

        // Request is being sent, set send flag
        sendFlag = true;

        // As per spec, this is called here for historical reasons.
        self.dispatchEvent("readystatechange");

        // Handler for the response
        var responseHandler = function(resp) {
          // Set response var to the response we got back
          // This is so it remains accessable outside this scope
          response = resp;
          // Check for redirect
          // @TODO Prevent looped redirects
          if (response.statusCode === 302 || response.statusCode === 303 || response.statusCode === 307) {
            // Change URL to the redirect location
            settings.url = response.headers.location;
            var url = url$1.parse(settings.url);
            // Set host var in case it's used later
            host = url.hostname;
            // Options for the new request
            var newOptions = {
              hostname: url.hostname,
              port: url.port,
              path: url.path,
              method: response.statusCode === 303 ? 'GET' : settings.method,
              headers: headers
            };

            if (ssl) {
              newOptions.pfx = opts.pfx;
              newOptions.key = opts.key;
              newOptions.passphrase = opts.passphrase;
              newOptions.cert = opts.cert;
              newOptions.ca = opts.ca;
              newOptions.ciphers = opts.ciphers;
              newOptions.rejectUnauthorized = opts.rejectUnauthorized;
            }

            // Issue the new request
            request = doRequest(newOptions, responseHandler).on('error', errorHandler);
            request.end();
            // @TODO Check if an XHR event needs to be fired here
            return;
          }

          if (response && response.setEncoding) {
            response.setEncoding("utf8");
          }

          setState(self.HEADERS_RECEIVED);
          self.status = response.statusCode;

          response.on('data', function(chunk) {
            // Make sure there's some data
            if (chunk) {
              self.responseText += chunk;
            }
            // Don't emit state changes if the connection has been aborted.
            if (sendFlag) {
              setState(self.LOADING);
            }
          });

          response.on('end', function() {
            if (sendFlag) {
              // The sendFlag needs to be set before setState is called.  Otherwise if we are chaining callbacks
              // there can be a timing issue (the callback is called and a new call is made before the flag is reset).
              sendFlag = false;
              // Discard the 'end' event if the connection has been aborted
              setState(self.DONE);
            }
          });

          response.on('error', function(error) {
            self.handleError(error);
          });
        };

        // Error handler for the request
        var errorHandler = function(error) {
          self.handleError(error);
        };

        // Create the request
        request = doRequest(options, responseHandler).on('error', errorHandler);

        // Node 0.4 and later won't accept empty data. Make sure it's needed.
        if (data) {
          request.write(data);
        }

        request.end();

        self.dispatchEvent("loadstart");
      } else { // Synchronous
        // Create a temporary file for communication with the other Node process
        var contentFile = ".node-xmlhttprequest-content-" + process.pid;
        var syncFile = ".node-xmlhttprequest-sync-" + process.pid;
        fs.writeFileSync(syncFile, "", "utf8");
        // The async request the other Node process executes
        var execString = "var http = require('http'), https = require('https'), fs = require('fs');"
          + "var doRequest = http" + (ssl ? "s" : "") + ".request;"
          + "var options = " + JSON.stringify(options) + ";"
          + "var responseText = '';"
          + "var req = doRequest(options, function(response) {"
          + "response.setEncoding('utf8');"
          + "response.on('data', function(chunk) {"
          + "  responseText += chunk;"
          + "});"
          + "response.on('end', function() {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-STATUS:' + response.statusCode + ',' + responseText, 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + "response.on('error', function(error) {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + "}).on('error', function(error) {"
          + "fs.writeFileSync('" + contentFile + "', 'NODE-XMLHTTPREQUEST-ERROR:' + JSON.stringify(error), 'utf8');"
          + "fs.unlinkSync('" + syncFile + "');"
          + "});"
          + (data ? "req.write('" + data.replace(/'/g, "\\'") + "');":"")
          + "req.end();";
        // Start the other Node Process, executing this string
        var syncProc = spawn(process.argv[0], ["-e", execString]);
        while(fs.existsSync(syncFile)) {
          // Wait while the sync file is empty
        }
        self.responseText = fs.readFileSync(contentFile, 'utf8');
        // Kill the child process once the file has data
        syncProc.stdin.end();
        // Remove the temporary file
        fs.unlinkSync(contentFile);
        if (self.responseText.match(/^NODE-XMLHTTPREQUEST-ERROR:/)) {
          // If the file returned an error, handle it
          var errorObj = self.responseText.replace(/^NODE-XMLHTTPREQUEST-ERROR:/, "");
          self.handleError(errorObj);
        } else {
          // If the file returned okay, parse its data and move to the DONE state
          self.status = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:([0-9]*),.*/, "$1");
          self.responseText = self.responseText.replace(/^NODE-XMLHTTPREQUEST-STATUS:[0-9]*,(.*)/, "$1");
          setState(self.DONE);
        }
      }
    };

    /**
     * Called when an error is encountered to deal with it.
     */
    this.handleError = function(error) {
      this.status = 503;
      this.statusText = error;
      this.responseText = error.stack;
      errorFlag = true;
      setState(this.DONE);
    };

    /**
     * Aborts a request.
     */
    this.abort = function() {
      if (request) {
        request.abort();
        request = null;
      }

      headers = Object.assign({}, defaultHeaders);
      this.responseText = "";
      this.responseXML = "";

      errorFlag = true;

      if (this.readyState !== this.UNSENT
          && (this.readyState !== this.OPENED || sendFlag)
          && this.readyState !== this.DONE) {
        sendFlag = false;
        setState(this.DONE);
      }
      this.readyState = this.UNSENT;
    };

    /**
     * Adds an event listener. Preferred method of binding to events.
     */
    this.addEventListener = function(event, callback) {
      if (!(event in listeners)) {
        listeners[event] = [];
      }
      // Currently allows duplicate callbacks. Should it?
      listeners[event].push(callback);
    };

    /**
     * Remove an event callback that has already been bound.
     * Only works on the matching funciton, cannot be a copy.
     */
    this.removeEventListener = function(event, callback) {
      if (event in listeners) {
        // Filter will return a new array with the callback removed
        listeners[event] = listeners[event].filter(function(ev) {
          return ev !== callback;
        });
      }
    };

    /**
     * Dispatch any events, including both "on" methods and events attached using addEventListener.
     */
    this.dispatchEvent = function(event) {
      if (typeof self["on" + event] === "function") {
        self["on" + event]();
      }
      if (event in listeners) {
        for (var i = 0, len = listeners[event].length; i < len; i++) {
          listeners[event][i].call(self);
        }
      }
    };

    /**
     * Changes readyState and calls onreadystatechange.
     *
     * @param int state New state
     */
    var setState = function(state) {
      if (self.readyState !== state) {
        self.readyState = state;

        if (settings.async || self.readyState < self.OPENED || self.readyState === self.DONE) {
          self.dispatchEvent("readystatechange");
        }

        if (self.readyState === self.DONE && !errorFlag) {
          self.dispatchEvent("load");
          // @TODO figure out InspectorInstrumentation::didLoadXHR(cookie)
          self.dispatchEvent("loadend");
        }
      }
    };
  }

  /*! https://mths.be/utf8js v2.1.2 by @mathias */

  var stringFromCharCode = String.fromCharCode;

  // Taken from https://mths.be/punycode
  function ucs2decode(string) {
  	var output = [];
  	var counter = 0;
  	var length = string.length;
  	var value;
  	var extra;
  	while (counter < length) {
  		value = string.charCodeAt(counter++);
  		if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  			// high surrogate, and there is a next character
  			extra = string.charCodeAt(counter++);
  			if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  				output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  			} else {
  				// unmatched surrogate; only append this code unit, in case the next
  				// code unit is the high surrogate of a surrogate pair
  				output.push(value);
  				counter--;
  			}
  		} else {
  			output.push(value);
  		}
  	}
  	return output;
  }

  // Taken from https://mths.be/punycode
  function ucs2encode(array) {
  	var length = array.length;
  	var index = -1;
  	var value;
  	var output = '';
  	while (++index < length) {
  		value = array[index];
  		if (value > 0xFFFF) {
  			value -= 0x10000;
  			output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  			value = 0xDC00 | value & 0x3FF;
  		}
  		output += stringFromCharCode(value);
  	}
  	return output;
  }

  function checkScalarValue(codePoint, strict) {
  	if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
  		if (strict) {
  			throw Error(
  				'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
  				' is not a scalar value'
  			);
  		}
  		return false;
  	}
  	return true;
  }
  /*--------------------------------------------------------------------------*/

  function createByte(codePoint, shift) {
  	return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
  }

  function encodeCodePoint(codePoint, strict) {
  	if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
  		return stringFromCharCode(codePoint);
  	}
  	var symbol = '';
  	if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
  		symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
  	}
  	else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
  		if (!checkScalarValue(codePoint, strict)) {
  			codePoint = 0xFFFD;
  		}
  		symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
  		symbol += createByte(codePoint, 6);
  	}
  	else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
  		symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
  		symbol += createByte(codePoint, 12);
  		symbol += createByte(codePoint, 6);
  	}
  	symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
  	return symbol;
  }

  function utf8encode(string, opts) {
  	opts = opts || {};
  	var strict = false !== opts.strict;

  	var codePoints = ucs2decode(string);
  	var length = codePoints.length;
  	var index = -1;
  	var codePoint;
  	var byteString = '';
  	while (++index < length) {
  		codePoint = codePoints[index];
  		byteString += encodeCodePoint(codePoint, strict);
  	}
  	return byteString;
  }

  /*--------------------------------------------------------------------------*/

  function readContinuationByte() {
  	if (byteIndex >= byteCount) {
  		throw Error('Invalid byte index');
  	}

  	var continuationByte = byteArray[byteIndex] & 0xFF;
  	byteIndex++;

  	if ((continuationByte & 0xC0) == 0x80) {
  		return continuationByte & 0x3F;
  	}

  	// If we end up here, it’s not a continuation byte
  	throw Error('Invalid continuation byte');
  }

  function decodeSymbol(strict) {
  	var byte1;
  	var byte2;
  	var byte3;
  	var byte4;
  	var codePoint;

  	if (byteIndex > byteCount) {
  		throw Error('Invalid byte index');
  	}

  	if (byteIndex == byteCount) {
  		return false;
  	}

  	// Read first byte
  	byte1 = byteArray[byteIndex] & 0xFF;
  	byteIndex++;

  	// 1-byte sequence (no continuation bytes)
  	if ((byte1 & 0x80) == 0) {
  		return byte1;
  	}

  	// 2-byte sequence
  	if ((byte1 & 0xE0) == 0xC0) {
  		byte2 = readContinuationByte();
  		codePoint = ((byte1 & 0x1F) << 6) | byte2;
  		if (codePoint >= 0x80) {
  			return codePoint;
  		} else {
  			throw Error('Invalid continuation byte');
  		}
  	}

  	// 3-byte sequence (may include unpaired surrogates)
  	if ((byte1 & 0xF0) == 0xE0) {
  		byte2 = readContinuationByte();
  		byte3 = readContinuationByte();
  		codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
  		if (codePoint >= 0x0800) {
  			return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
  		} else {
  			throw Error('Invalid continuation byte');
  		}
  	}

  	// 4-byte sequence
  	if ((byte1 & 0xF8) == 0xF0) {
  		byte2 = readContinuationByte();
  		byte3 = readContinuationByte();
  		byte4 = readContinuationByte();
  		codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
  			(byte3 << 0x06) | byte4;
  		if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
  			return codePoint;
  		}
  	}

  	throw Error('Invalid UTF-8 detected');
  }

  var byteArray;
  var byteCount;
  var byteIndex;
  function utf8decode(byteString, opts) {
  	opts = opts || {};
  	var strict = false !== opts.strict;

  	byteArray = ucs2decode(byteString);
  	byteCount = byteArray.length;
  	byteIndex = 0;
  	var codePoints = [];
  	var tmp;
  	while ((tmp = decodeSymbol(strict)) !== false) {
  		codePoints.push(tmp);
  	}
  	return ucs2encode(codePoints);
  }

  var utf8 = {
  	version: '2.1.2',
  	encode: utf8encode,
  	decode: utf8decode
  };

  var toString$2 = {}.toString;

  var isarray$1 = Array.isArray || function (arr) {
    return toString$2.call(arr) == '[object Array]';
  };

  /* global Blob File */

  /*
   * Module requirements.
   */



  var toString$3 = Object.prototype.toString;
  var withNativeBlob$1 = typeof Blob === 'function' ||
                          typeof Blob !== 'undefined' && toString$3.call(Blob) === '[object BlobConstructor]';
  var withNativeFile$1 = typeof File === 'function' ||
                          typeof File !== 'undefined' && toString$3.call(File) === '[object FileConstructor]';

  /**
   * Module exports.
   */

  var hasBinary2 = hasBinary;

  /**
   * Checks for binary data.
   *
   * Supports Buffer, ArrayBuffer, Blob and File.
   *
   * @param {Object} anything
   * @api public
   */

  function hasBinary (obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    if (isarray$1(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }

    if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
      (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
      (withNativeBlob$1 && obj instanceof Blob) ||
      (withNativeFile$1 && obj instanceof File)
    ) {
      return true;
    }

    // see: https://github.com/Automattic/has-binary/pull/4
    if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  var after_1 = after;

  function after(count, callback, err_cb) {
      var bail = false;
      err_cb = err_cb || noop;
      proxy.count = count;

      return (count === 0) ? callback() : proxy

      function proxy(err, result) {
          if (proxy.count <= 0) {
              throw new Error('after called too many times')
          }
          --proxy.count;

          // after first error, rest are passed to err_cb
          if (err) {
              bail = true;
              callback(err);
              // future error callbacks will go to error handler
              callback = err_cb;
          } else if (proxy.count === 0 && !bail) {
              callback(null, result);
          }
      }
  }

  function noop() {}

  /**
   * Gets the keys for an object.
   *
   * @return {Array} keys
   * @api private
   */

  var keys = Object.keys || function keys (obj){
    var arr = [];
    var has = Object.prototype.hasOwnProperty;

    for (var i in obj) {
      if (has.call(obj, i)) {
        arr.push(i);
      }
    }
    return arr;
  };

  var lib = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */






  /**
   * Current protocol version.
   */
  exports.protocol = 3;

  /**
   * Packet types.
   */

  var packets = exports.packets = {
      open:     0    // non-ws
    , close:    1    // non-ws
    , ping:     2
    , pong:     3
    , message:  4
    , upgrade:  5
    , noop:     6
  };

  var packetslist = keys(packets);

  /**
   * Premade error packet.
   */

  var err = { type: 'error', data: 'parser error' };

  const EMPTY_BUFFER = Buffer.concat([]);

  /**
   * Encodes a packet.
   *
   *     <packet type id> [ <data> ]
   *
   * Example:
   *
   *     5hello world
   *     3
   *     4
   *
   * Binary is encoded in an identical principle
   *
   * @api private
   */

  exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
    if (typeof supportsBinary === 'function') {
      callback = supportsBinary;
      supportsBinary = null;
    }

    if (typeof utf8encode === 'function') {
      callback = utf8encode;
      utf8encode = null;
    }

    if (Buffer.isBuffer(packet.data)) {
      return encodeBuffer(packet, supportsBinary, callback);
    } else if (packet.data && (packet.data.buffer || packet.data) instanceof ArrayBuffer) {
      return encodeBuffer({ type: packet.type, data: arrayBufferToBuffer(packet.data) }, supportsBinary, callback);
    }

    // Sending data as a utf-8 string
    var encoded = packets[packet.type];

    // data fragment is optional
    if (undefined !== packet.data) {
      encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
    }

    return callback('' + encoded);
  };

  /**
   * Encode Buffer data
   */

  function encodeBuffer(packet, supportsBinary, callback) {
    if (!supportsBinary) {
      return exports.encodeBase64Packet(packet, callback);
    }

    var data = packet.data;
    var typeBuffer = Buffer.allocUnsafe(1);
    typeBuffer[0] = packets[packet.type];
    return callback(Buffer.concat([typeBuffer, data]));
  }

  /**
   * Encodes a packet with binary data in a base64 string
   *
   * @param {Object} packet, has `type` and `data`
   * @return {String} base64 encoded message
   */

  exports.encodeBase64Packet = function(packet, callback){
    var data = Buffer.isBuffer(packet.data) ? packet.data : arrayBufferToBuffer(packet.data);
    var message = 'b' + packets[packet.type];
    message += data.toString('base64');
    return callback(message);
  };

  /**
   * Decodes a packet. Data also available as an ArrayBuffer if requested.
   *
   * @return {Object} with `type` and `data` (if any)
   * @api private
   */

  exports.decodePacket = function (data, binaryType, utf8decode) {
    if (data === undefined) {
      return err;
    }

    var type;

    // String data
    if (typeof data === 'string') {

      type = data.charAt(0);

      if (type === 'b') {
        return exports.decodeBase64Packet(data.substr(1), binaryType);
      }

      if (utf8decode) {
        data = tryDecode(data);
        if (data === false) {
          return err;
        }
      }

      if (Number(type) != type || !packetslist[type]) {
        return err;
      }

      if (data.length > 1) {
        return { type: packetslist[type], data: data.substring(1) };
      } else {
        return { type: packetslist[type] };
      }
    }

    // Binary data
    if (binaryType === 'arraybuffer') {
      // wrap Buffer/ArrayBuffer data into an Uint8Array
      var intArray = new Uint8Array(data);
      type = intArray[0];
      return { type: packetslist[type], data: intArray.buffer.slice(1) };
    }

    if (data instanceof ArrayBuffer) {
      data = arrayBufferToBuffer(data);
    }
    type = data[0];
    return { type: packetslist[type], data: data.slice(1) };
  };

  function tryDecode(data) {
    try {
      data = utf8.decode(data, { strict: false });
    } catch (e) {
      return false;
    }
    return data;
  }

  /**
   * Decodes a packet encoded in a base64 string.
   *
   * @param {String} base64 encoded message
   * @return {Object} with `type` and `data` (if any)
   */

  exports.decodeBase64Packet = function(msg, binaryType) {
    var type = packetslist[msg.charAt(0)];
    var data = Buffer.from(msg.substr(1), 'base64');
    if (binaryType === 'arraybuffer') {
      var abv = new Uint8Array(data.length);
      for (var i = 0; i < abv.length; i++){
        abv[i] = data[i];
      }
      data = abv.buffer;
    }
    return { type: type, data: data };
  };

  /**
   * Encodes multiple messages (payload).
   *
   *     <length>:data
   *
   * Example:
   *
   *     11:hello world2:hi
   *
   * If any contents are binary, they will be encoded as base64 strings. Base64
   * encoded strings are marked with a b before the length specifier
   *
   * @param {Array} packets
   * @api private
   */

  exports.encodePayload = function (packets, supportsBinary, callback) {
    if (typeof supportsBinary === 'function') {
      callback = supportsBinary;
      supportsBinary = null;
    }

    if (supportsBinary && hasBinary2(packets)) {
      return exports.encodePayloadAsBinary(packets, callback);
    }

    if (!packets.length) {
      return callback('0:');
    }

    function encodeOne(packet, doneCallback) {
      exports.encodePacket(packet, supportsBinary, false, function(message) {
        doneCallback(null, setLengthHeader(message));
      });
    }

    map(packets, encodeOne, function(err, results) {
      return callback(results.join(''));
    });
  };

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  /**
   * Async array map using after
   */

  function map(ary, each, done) {
    var result = new Array(ary.length);
    var next = after_1(ary.length, done);

    for (var i = 0; i < ary.length; i++) {
      each(ary[i], function(error, msg) {
        result[i] = msg;
        next(error, result);
      });
    }
  }

  /*
   * Decodes data when a payload is maybe expected. Possible binary contents are
   * decoded from their base64 representation
   *
   * @param {String} data, callback method
   * @api public
   */

  exports.decodePayload = function (data, binaryType, callback) {
    if (typeof data !== 'string') {
      return exports.decodePayloadAsBinary(data, binaryType, callback);
    }

    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    if (data === '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    var length = '', n, msg, packet;

    for (var i = 0, l = data.length; i < l; i++) {
      var chr = data.charAt(i);

      if (chr !== ':') {
        length += chr;
        continue;
      }

      if (length === '' || (length != (n = Number(length)))) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      msg = data.substr(i + 1, n);

      if (length != msg.length) {
        // parser error - ignoring payload
        return callback(err, 0, 1);
      }

      if (msg.length) {
        packet = exports.decodePacket(msg, binaryType, false);

        if (err.type === packet.type && err.data === packet.data) {
          // parser error in individual packet - ignoring payload
          return callback(err, 0, 1);
        }

        var more = callback(packet, i + n, l);
        if (false === more) return;
      }

      // advance cursor
      i += n;
      length = '';
    }

    if (length !== '') {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

  };

  /**
   *
   * Converts a buffer to a utf8.js encoded string
   *
   * @api private
   */

  function bufferToString(buffer) {
    var str = '';
    for (var i = 0, l = buffer.length; i < l; i++) {
      str += String.fromCharCode(buffer[i]);
    }
    return str;
  }

  /**
   *
   * Converts a utf8.js encoded string to a buffer
   *
   * @api private
   */

  function stringToBuffer(string) {
    var buf = Buffer.allocUnsafe(string.length);
    for (var i = 0, l = string.length; i < l; i++) {
      buf.writeUInt8(string.charCodeAt(i), i);
    }
    return buf;
  }

  /**
   *
   * Converts an ArrayBuffer to a Buffer
   *
   * @api private
   */

  function arrayBufferToBuffer(data) {
    // data is either an ArrayBuffer or ArrayBufferView.
    var length = data.byteLength || data.length;
    var offset = data.byteOffset || 0;

    return Buffer.from(data.buffer || data, offset, length);
  }

  /**
   * Encodes multiple messages (payload) as binary.
   *
   * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
   * 255><data>
   *
   * Example:
   * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
   *
   * @param {Array} packets
   * @return {Buffer} encoded payload
   * @api private
   */

  exports.encodePayloadAsBinary = function (packets, callback) {
    if (!packets.length) {
      return callback(EMPTY_BUFFER);
    }

    map(packets, encodeOneBinaryPacket, function(err, results) {
      return callback(Buffer.concat(results));
    });
  };

  function encodeOneBinaryPacket(p, doneCallback) {

    function onBinaryPacketEncode(packet) {

      var encodingLength = '' + packet.length;
      var sizeBuffer;

      if (typeof packet === 'string') {
        sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
        sizeBuffer[0] = 0; // is a string (not true binary = 0)
        for (var i = 0; i < encodingLength.length; i++) {
          sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
        }
        sizeBuffer[sizeBuffer.length - 1] = 255;
        return doneCallback(null, Buffer.concat([sizeBuffer, stringToBuffer(packet)]));
      }

      sizeBuffer = Buffer.allocUnsafe(encodingLength.length + 2);
      sizeBuffer[0] = 1; // is binary (true binary = 1)
      for (var i = 0; i < encodingLength.length; i++) {
        sizeBuffer[i + 1] = parseInt(encodingLength[i], 10);
      }
      sizeBuffer[sizeBuffer.length - 1] = 255;

      doneCallback(null, Buffer.concat([sizeBuffer, packet]));
    }

    exports.encodePacket(p, true, true, onBinaryPacketEncode);

  }


  /*
   * Decodes data when a payload is maybe expected. Strings are decoded by
   * interpreting each byte as a key code for entries marked to start with 0. See
   * description of encodePayloadAsBinary

   * @param {Buffer} data, callback method
   * @api public
   */

  exports.decodePayloadAsBinary = function (data, binaryType, callback) {
    if (typeof binaryType === 'function') {
      callback = binaryType;
      binaryType = null;
    }

    var bufferTail = data;
    var buffers = [];
    var i;

    while (bufferTail.length > 0) {
      var strLen = '';
      var isString = bufferTail[0] === 0;
      for (i = 1; ; i++) {
        if (bufferTail[i] === 255)  break;
        // 310 = char length of Number.MAX_VALUE
        if (strLen.length > 310) {
          return callback(err, 0, 1);
        }
        strLen += '' + bufferTail[i];
      }
      bufferTail = bufferTail.slice(strLen.length + 1);

      var msgLength = parseInt(strLen, 10);

      var msg = bufferTail.slice(1, msgLength + 1);
      if (isString) msg = bufferToString(msg);
      buffers.push(msg);
      bufferTail = bufferTail.slice(msgLength + 1);
    }

    var total = buffers.length;
    for (i = 0; i < total; i++) {
      var buffer = buffers[i];
      callback(exports.decodePacket(buffer, binaryType, true), i, total);
    }
  };
  });
  var lib_1 = lib.protocol;
  var lib_2 = lib.packets;
  var lib_3 = lib.encodePacket;
  var lib_4 = lib.encodeBase64Packet;
  var lib_5 = lib.decodePacket;
  var lib_6 = lib.decodeBase64Packet;
  var lib_7 = lib.encodePayload;
  var lib_8 = lib.decodePayload;
  var lib_9 = lib.encodePayloadAsBinary;
  var lib_10 = lib.decodePayloadAsBinary;

  /**
   * Module dependencies.
   */




  /**
   * Module exports.
   */

  var transport = Transport;

  /**
   * Transport abstract constructor.
   *
   * @param {Object} options.
   * @api private
   */

  function Transport (opts) {
    this.path = opts.path;
    this.hostname = opts.hostname;
    this.port = opts.port;
    this.secure = opts.secure;
    this.query = opts.query;
    this.timestampParam = opts.timestampParam;
    this.timestampRequests = opts.timestampRequests;
    this.readyState = '';
    this.agent = opts.agent || false;
    this.socket = opts.socket;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials;

    // SSL options for Node.js client
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;
    this.forceNode = opts.forceNode;

    // results of ReactNative environment detection
    this.isReactNative = opts.isReactNative;

    // other options for Node.js client
    this.extraHeaders = opts.extraHeaders;
    this.localAddress = opts.localAddress;
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Transport.prototype);

  /**
   * Emits an error.
   *
   * @param {String} str
   * @return {Transport} for chaining
   * @api public
   */

  Transport.prototype.onError = function (msg, desc) {
    var err = new Error(msg);
    err.type = 'TransportError';
    err.description = desc;
    this.emit('error', err);
    return this;
  };

  /**
   * Opens the transport.
   *
   * @api public
   */

  Transport.prototype.open = function () {
    if ('closed' === this.readyState || '' === this.readyState) {
      this.readyState = 'opening';
      this.doOpen();
    }

    return this;
  };

  /**
   * Closes the transport.
   *
   * @api private
   */

  Transport.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.doClose();
      this.onClose();
    }

    return this;
  };

  /**
   * Sends multiple packets.
   *
   * @param {Array} packets
   * @api private
   */

  Transport.prototype.send = function (packets) {
    if ('open' === this.readyState) {
      this.write(packets);
    } else {
      throw new Error('Transport not open');
    }
  };

  /**
   * Called upon open
   *
   * @api private
   */

  Transport.prototype.onOpen = function () {
    this.readyState = 'open';
    this.writable = true;
    this.emit('open');
  };

  /**
   * Called with data.
   *
   * @param {String} data
   * @api private
   */

  Transport.prototype.onData = function (data) {
    var packet = lib.decodePacket(data, this.socket.binaryType);
    this.onPacket(packet);
  };

  /**
   * Called with a decoded packet.
   */

  Transport.prototype.onPacket = function (packet) {
    this.emit('packet', packet);
  };

  /**
   * Called upon close.
   *
   * @api private
   */

  Transport.prototype.onClose = function () {
    this.readyState = 'closed';
    this.emit('close');
  };

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  var encode = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };

  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */

  var decode = function(qs){
    var qry = {};
    var pairs = qs.split('&');
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  };

  var parseqs = {
  	encode: encode,
  	decode: decode
  };

  var componentInherit = function(a, b){
    var fn = function(){};
    fn.prototype = b.prototype;
    a.prototype = new fn;
    a.prototype.constructor = a;
  };

  var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
    , length = 64
    , map = {}
    , seed = 0
    , i = 0
    , prev;

  /**
   * Return a string representing the specified number.
   *
   * @param {Number} num The number to convert.
   * @returns {String} The string representation of the number.
   * @api public
   */
  function encode$1(num) {
    var encoded = '';

    do {
      encoded = alphabet[num % length] + encoded;
      num = Math.floor(num / length);
    } while (num > 0);

    return encoded;
  }

  /**
   * Return the integer value specified by the given string.
   *
   * @param {String} str The string to convert.
   * @returns {Number} The integer value represented by the string.
   * @api public
   */
  function decode$1(str) {
    var decoded = 0;

    for (i = 0; i < str.length; i++) {
      decoded = decoded * length + map[str.charAt(i)];
    }

    return decoded;
  }

  /**
   * Yeast: A tiny growing id generator.
   *
   * @returns {String} A unique id.
   * @api public
   */
  function yeast() {
    var now = encode$1(+new Date());

    if (now !== prev) return seed = 0, prev = now;
    return now +'.'+ encode$1(seed++);
  }

  //
  // Map each character to its index.
  //
  for (; i < length; i++) map[alphabet[i]] = i;

  //
  // Expose the `yeast`, `encode` and `decode` functions.
  //
  yeast.encode = encode$1;
  yeast.decode = decode$1;
  var yeast_1 = yeast;

  /**
   * Helpers.
   */

  var s$2 = 1000;
  var m$2 = s$2 * 60;
  var h$2 = m$2 * 60;
  var d$2 = h$2 * 24;
  var y$2 = d$2 * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms$2 = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse$2(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong$2(val) : fmtShort$2(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse$2(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y$2;
      case 'days':
      case 'day':
      case 'd':
        return n * d$2;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h$2;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m$2;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s$2;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort$2(ms) {
    if (ms >= d$2) {
      return Math.round(ms / d$2) + 'd';
    }
    if (ms >= h$2) {
      return Math.round(ms / h$2) + 'h';
    }
    if (ms >= m$2) {
      return Math.round(ms / m$2) + 'm';
    }
    if (ms >= s$2) {
      return Math.round(ms / s$2) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong$2(ms) {
    return plural$2(ms, d$2, 'day') ||
      plural$2(ms, h$2, 'hour') ||
      plural$2(ms, m$2, 'minute') ||
      plural$2(ms, s$2, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural$2(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug$2 = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms$2;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1$1 = debug$2.coerce;
  var debug_2$1 = debug$2.disable;
  var debug_3$1 = debug$2.enable;
  var debug_4$1 = debug$2.enabled;
  var debug_5$1 = debug$2.humanize;
  var debug_6$1 = debug$2.instances;
  var debug_7$1 = debug$2.names;
  var debug_8$1 = debug$2.skips;
  var debug_9$1 = debug$2.formatters;

  var browser$2 = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$2;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1$2 = browser$2.log;
  var browser_2$2 = browser$2.formatArgs;
  var browser_3$2 = browser$2.save;
  var browser_4$2 = browser$2.load;
  var browser_5$2 = browser$2.useColors;
  var browser_6$2 = browser$2.storage;
  var browser_7$2 = browser$2.colors;

  var node$2 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug$2;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util.format.apply(util, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1$2 = node$2.init;
  var node_2$2 = node$2.log;
  var node_3$2 = node$2.formatArgs;
  var node_4$2 = node$2.save;
  var node_5$2 = node$2.load;
  var node_6$2 = node$2.useColors;
  var node_7$2 = node$2.colors;
  var node_8$2 = node$2.inspectOpts;

  var src$2 = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser$2;
  } else {
    module.exports = node$2;
  }
  });

  /**
   * Module dependencies.
   */






  var debug$3 = src$2('engine.io-client:polling');

  /**
   * Module exports.
   */

  var polling = Polling;

  /**
   * Is XHR2 supported?
   */

  var hasXHR2 = (function () {
    var XMLHttpRequest = XMLHttpRequest_1;
    var xhr = new XMLHttpRequest({ xdomain: false });
    return null != xhr.responseType;
  })();

  /**
   * Polling interface.
   *
   * @param {Object} opts
   * @api private
   */

  function Polling (opts) {
    var forceBase64 = (opts && opts.forceBase64);
    if (!hasXHR2 || forceBase64) {
      this.supportsBinary = false;
    }
    transport.call(this, opts);
  }

  /**
   * Inherits from Transport.
   */

  componentInherit(Polling, transport);

  /**
   * Transport name.
   */

  Polling.prototype.name = 'polling';

  /**
   * Opens the socket (triggers polling). We write a PING message to determine
   * when the transport is open.
   *
   * @api private
   */

  Polling.prototype.doOpen = function () {
    this.poll();
  };

  /**
   * Pauses polling.
   *
   * @param {Function} callback upon buffers are flushed and transport is paused
   * @api private
   */

  Polling.prototype.pause = function (onPause) {
    var self = this;

    this.readyState = 'pausing';

    function pause () {
      debug$3('paused');
      self.readyState = 'paused';
      onPause();
    }

    if (this.polling || !this.writable) {
      var total = 0;

      if (this.polling) {
        debug$3('we are currently polling - waiting to pause');
        total++;
        this.once('pollComplete', function () {
          debug$3('pre-pause polling complete');
          --total || pause();
        });
      }

      if (!this.writable) {
        debug$3('we are currently writing - waiting to pause');
        total++;
        this.once('drain', function () {
          debug$3('pre-pause writing complete');
          --total || pause();
        });
      }
    } else {
      pause();
    }
  };

  /**
   * Starts polling cycle.
   *
   * @api public
   */

  Polling.prototype.poll = function () {
    debug$3('polling');
    this.polling = true;
    this.doPoll();
    this.emit('poll');
  };

  /**
   * Overloads onData to detect payloads.
   *
   * @api private
   */

  Polling.prototype.onData = function (data) {
    var self = this;
    debug$3('polling got data %s', data);
    var callback = function (packet, index, total) {
      // if its the first message we consider the transport open
      if ('opening' === self.readyState) {
        self.onOpen();
      }

      // if its a close packet, we close the ongoing requests
      if ('close' === packet.type) {
        self.onClose();
        return false;
      }

      // otherwise bypass onData and handle the message
      self.onPacket(packet);
    };

    // decode payload
    lib.decodePayload(data, this.socket.binaryType, callback);

    // if an event did not trigger closing
    if ('closed' !== this.readyState) {
      // if we got data we're not polling
      this.polling = false;
      this.emit('pollComplete');

      if ('open' === this.readyState) {
        this.poll();
      } else {
        debug$3('ignoring poll - transport state "%s"', this.readyState);
      }
    }
  };

  /**
   * For polling, send a close packet.
   *
   * @api private
   */

  Polling.prototype.doClose = function () {
    var self = this;

    function close () {
      debug$3('writing close packet');
      self.write([{ type: 'close' }]);
    }

    if ('open' === this.readyState) {
      debug$3('transport open - closing');
      close();
    } else {
      // in case we're trying to close while
      // handshaking is in progress (GH-164)
      debug$3('transport not open - deferring close');
      this.once('open', close);
    }
  };

  /**
   * Writes a packets payload.
   *
   * @param {Array} data packets
   * @param {Function} drain callback
   * @api private
   */

  Polling.prototype.write = function (packets) {
    var self = this;
    this.writable = false;
    var callbackfn = function () {
      self.writable = true;
      self.emit('drain');
    };

    lib.encodePayload(packets, this.supportsBinary, function (data) {
      self.doWrite(data, callbackfn);
    });
  };

  /**
   * Generates uri for connection.
   *
   * @api private
   */

  Polling.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'https' : 'http';
    var port = '';

    // cache busting is forced
    if (false !== this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    }

    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // avoid port if default for schema
    if (this.port && (('https' === schema && Number(this.port) !== 443) ||
       ('http' === schema && Number(this.port) !== 80))) {
      port = ':' + this.port;
    }

    // prepend ? to query
    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };

  var globalThis$1 = commonjsGlobal;

  /* global attachEvent */

  /**
   * Module requirements.
   */





  var debug$4 = src$2('engine.io-client:polling-xhr');


  /**
   * Module exports.
   */

  var pollingXhr = XHR;
  var Request_1 = Request;

  /**
   * Empty function
   */

  function empty () {}

  /**
   * XHR Polling constructor.
   *
   * @param {Object} opts
   * @api public
   */

  function XHR (opts) {
    polling.call(this, opts);
    this.requestTimeout = opts.requestTimeout;
    this.extraHeaders = opts.extraHeaders;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      this.xd = (typeof location !== 'undefined' && opts.hostname !== location.hostname) ||
        port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
  }

  /**
   * Inherits from Polling.
   */

  componentInherit(XHR, polling);

  /**
   * XHR supports binary
   */

  XHR.prototype.supportsBinary = true;

  /**
   * Creates a request.
   *
   * @param {String} method
   * @api private
   */

  XHR.prototype.request = function (opts) {
    opts = opts || {};
    opts.uri = this.uri();
    opts.xd = this.xd;
    opts.xs = this.xs;
    opts.agent = this.agent || false;
    opts.supportsBinary = this.supportsBinary;
    opts.enablesXDR = this.enablesXDR;
    opts.withCredentials = this.withCredentials;

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;
    opts.requestTimeout = this.requestTimeout;

    // other options for Node.js client
    opts.extraHeaders = this.extraHeaders;

    return new Request(opts);
  };

  /**
   * Sends data.
   *
   * @param {String} data to send.
   * @param {Function} called upon flush.
   * @api private
   */

  XHR.prototype.doWrite = function (data, fn) {
    var isBinary = typeof data !== 'string' && data !== undefined;
    var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
    var self = this;
    req.on('success', fn);
    req.on('error', function (err) {
      self.onError('xhr post error', err);
    });
    this.sendXhr = req;
  };

  /**
   * Starts a poll cycle.
   *
   * @api private
   */

  XHR.prototype.doPoll = function () {
    debug$4('xhr poll');
    var req = this.request();
    var self = this;
    req.on('data', function (data) {
      self.onData(data);
    });
    req.on('error', function (err) {
      self.onError('xhr poll error', err);
    });
    this.pollXhr = req;
  };

  /**
   * Request constructor
   *
   * @param {Object} options
   * @api public
   */

  function Request (opts) {
    this.method = opts.method || 'GET';
    this.uri = opts.uri;
    this.xd = !!opts.xd;
    this.xs = !!opts.xs;
    this.async = false !== opts.async;
    this.data = undefined !== opts.data ? opts.data : null;
    this.agent = opts.agent;
    this.isBinary = opts.isBinary;
    this.supportsBinary = opts.supportsBinary;
    this.enablesXDR = opts.enablesXDR;
    this.withCredentials = opts.withCredentials;
    this.requestTimeout = opts.requestTimeout;

    // SSL options for Node.js client
    this.pfx = opts.pfx;
    this.key = opts.key;
    this.passphrase = opts.passphrase;
    this.cert = opts.cert;
    this.ca = opts.ca;
    this.ciphers = opts.ciphers;
    this.rejectUnauthorized = opts.rejectUnauthorized;

    // other options for Node.js client
    this.extraHeaders = opts.extraHeaders;

    this.create();
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Request.prototype);

  /**
   * Creates the XHR object and sends the request.
   *
   * @api private
   */

  Request.prototype.create = function () {
    var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

    // SSL options for Node.js client
    opts.pfx = this.pfx;
    opts.key = this.key;
    opts.passphrase = this.passphrase;
    opts.cert = this.cert;
    opts.ca = this.ca;
    opts.ciphers = this.ciphers;
    opts.rejectUnauthorized = this.rejectUnauthorized;

    var xhr = this.xhr = new XMLHttpRequest_1(opts);
    var self = this;

    try {
      debug$4('xhr open %s: %s', this.method, this.uri);
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (var i in this.extraHeaders) {
            if (this.extraHeaders.hasOwnProperty(i)) {
              xhr.setRequestHeader(i, this.extraHeaders[i]);
            }
          }
        }
      } catch (e) {}

      if ('POST' === this.method) {
        try {
          if (this.isBinary) {
            xhr.setRequestHeader('Content-type', 'application/octet-stream');
          } else {
            xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
          }
        } catch (e) {}
      }

      try {
        xhr.setRequestHeader('Accept', '*/*');
      } catch (e) {}

      // ie6 check
      if ('withCredentials' in xhr) {
        xhr.withCredentials = this.withCredentials;
      }

      if (this.requestTimeout) {
        xhr.timeout = this.requestTimeout;
      }

      if (this.hasXDR()) {
        xhr.onload = function () {
          self.onLoad();
        };
        xhr.onerror = function () {
          self.onError(xhr.responseText);
        };
      } else {
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 2) {
            try {
              var contentType = xhr.getResponseHeader('Content-Type');
              if (self.supportsBinary && contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
                xhr.responseType = 'arraybuffer';
              }
            } catch (e) {}
          }
          if (4 !== xhr.readyState) return;
          if (200 === xhr.status || 1223 === xhr.status) {
            self.onLoad();
          } else {
            // make sure the `error` event handler that's user-set
            // does not throw in the same tick and gets caught here
            setTimeout(function () {
              self.onError(typeof xhr.status === 'number' ? xhr.status : 0);
            }, 0);
          }
        };
      }

      debug$4('xhr data %s', this.data);
      xhr.send(this.data);
    } catch (e) {
      // Need to defer since .create() is called directly fhrom the constructor
      // and thus the 'error' event can only be only bound *after* this exception
      // occurs.  Therefore, also, we cannot throw here at all.
      setTimeout(function () {
        self.onError(e);
      }, 0);
      return;
    }

    if (typeof document !== 'undefined') {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  };

  /**
   * Called upon successful response.
   *
   * @api private
   */

  Request.prototype.onSuccess = function () {
    this.emit('success');
    this.cleanup();
  };

  /**
   * Called if we have data.
   *
   * @api private
   */

  Request.prototype.onData = function (data) {
    this.emit('data', data);
    this.onSuccess();
  };

  /**
   * Called upon error.
   *
   * @api private
   */

  Request.prototype.onError = function (err) {
    this.emit('error', err);
    this.cleanup(true);
  };

  /**
   * Cleans up house.
   *
   * @api private
   */

  Request.prototype.cleanup = function (fromError) {
    if ('undefined' === typeof this.xhr || null === this.xhr) {
      return;
    }
    // xmlhttprequest
    if (this.hasXDR()) {
      this.xhr.onload = this.xhr.onerror = empty;
    } else {
      this.xhr.onreadystatechange = empty;
    }

    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {}
    }

    if (typeof document !== 'undefined') {
      delete Request.requests[this.index];
    }

    this.xhr = null;
  };

  /**
   * Called upon load.
   *
   * @api private
   */

  Request.prototype.onLoad = function () {
    var data;
    try {
      var contentType;
      try {
        contentType = this.xhr.getResponseHeader('Content-Type');
      } catch (e) {}
      if (contentType === 'application/octet-stream' || contentType === 'application/octet-stream; charset=UTF-8') {
        data = this.xhr.response || this.xhr.responseText;
      } else {
        data = this.xhr.responseText;
      }
    } catch (e) {
      this.onError(e);
    }
    if (null != data) {
      this.onData(data);
    }
  };

  /**
   * Check if it has XDomainRequest.
   *
   * @api private
   */

  Request.prototype.hasXDR = function () {
    return typeof XDomainRequest !== 'undefined' && !this.xs && this.enablesXDR;
  };

  /**
   * Aborts the request.
   *
   * @api public
   */

  Request.prototype.abort = function () {
    this.cleanup();
  };

  /**
   * Aborts pending requests when unloading the window. This is needed to prevent
   * memory leaks (e.g. when using IE) and to ensure that no spurious error is
   * emitted.
   */

  Request.requestsCount = 0;
  Request.requests = {};

  if (typeof document !== 'undefined') {
    if (typeof attachEvent === 'function') {
      attachEvent('onunload', unloadHandler);
    } else if (typeof addEventListener === 'function') {
      var terminationEvent = 'onpagehide' in globalThis$1 ? 'pagehide' : 'unload';
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }

  function unloadHandler () {
    for (var i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  pollingXhr.Request = Request_1;

  /**
   * Module requirements.
   */





  /**
   * Module exports.
   */

  var pollingJsonp = JSONPPolling;

  /**
   * Cached regular expressions.
   */

  var rNewline = /\n/g;
  var rEscapedNewline = /\\n/g;

  /**
   * Global JSONP callbacks.
   */

  var callbacks;

  /**
   * Noop.
   */

  function empty$1 () { }

  /**
   * JSONP Polling constructor.
   *
   * @param {Object} opts.
   * @api public
   */

  function JSONPPolling (opts) {
    polling.call(this, opts);

    this.query = this.query || {};

    // define global callbacks array if not present
    // we do this here (lazily) to avoid unneeded global pollution
    if (!callbacks) {
      // we need to consider multiple engines in the same page
      callbacks = globalThis$1.___eio = (globalThis$1.___eio || []);
    }

    // callback identifier
    this.index = callbacks.length;

    // add callback to jsonp global
    var self = this;
    callbacks.push(function (msg) {
      self.onData(msg);
    });

    // append to query string
    this.query.j = this.index;

    // prevent spurious errors from being emitted when the window is unloaded
    if (typeof addEventListener === 'function') {
      addEventListener('beforeunload', function () {
        if (self.script) self.script.onerror = empty$1;
      }, false);
    }
  }

  /**
   * Inherits from Polling.
   */

  componentInherit(JSONPPolling, polling);

  /*
   * JSONP only supports binary as base64 encoded strings
   */

  JSONPPolling.prototype.supportsBinary = false;

  /**
   * Closes the socket.
   *
   * @api private
   */

  JSONPPolling.prototype.doClose = function () {
    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    if (this.form) {
      this.form.parentNode.removeChild(this.form);
      this.form = null;
      this.iframe = null;
    }

    polling.prototype.doClose.call(this);
  };

  /**
   * Starts a poll cycle.
   *
   * @api private
   */

  JSONPPolling.prototype.doPoll = function () {
    var self = this;
    var script = document.createElement('script');

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.uri();
    script.onerror = function (e) {
      self.onError('jsonp poll error', e);
    };

    var insertAt = document.getElementsByTagName('script')[0];
    if (insertAt) {
      insertAt.parentNode.insertBefore(script, insertAt);
    } else {
      (document.head || document.body).appendChild(script);
    }
    this.script = script;

    var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

    if (isUAgecko) {
      setTimeout(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };

  /**
   * Writes with a hidden iframe.
   *
   * @param {String} data to send
   * @param {Function} called upon flush.
   * @api private
   */

  JSONPPolling.prototype.doWrite = function (data, fn) {
    var self = this;

    if (!this.form) {
      var form = document.createElement('form');
      var area = document.createElement('textarea');
      var id = this.iframeId = 'eio_iframe_' + this.index;
      var iframe;

      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '-1000px';
      form.style.left = '-1000px';
      form.target = id;
      form.method = 'POST';
      form.setAttribute('accept-charset', 'utf-8');
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.uri();

    function complete () {
      initIframe();
      fn();
    }

    function initIframe () {
      if (self.iframe) {
        try {
          self.form.removeChild(self.iframe);
        } catch (e) {
          self.onError('jsonp polling iframe removal error', e);
        }
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
        iframe = document.createElement(html);
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
        iframe.src = 'javascript:0';
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    }

    initIframe();

    // escape \n to prevent it from being converted into \r\n by some UAs
    // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
    data = data.replace(rEscapedNewline, '\\\n');
    this.area.value = data.replace(rNewline, '\\n');

    try {
      this.form.submit();
    } catch (e) {}

    if (this.iframe.attachEvent) {
      this.iframe.onreadystatechange = function () {
        if (self.iframe.readyState === 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }
  };

  function Queue(options) {
    if (!(this instanceof Queue)) {
      return new Queue(options);
    }

    options = options || {};
    this.concurrency = options.concurrency || Infinity;
    this.pending = 0;
    this.jobs = [];
    this.cbs = [];
    this._done = done.bind(this);
  }

  var arrayAddMethods = [
    'push',
    'unshift',
    'splice'
  ];

  arrayAddMethods.forEach(function(method) {
    Queue.prototype[method] = function() {
      var methodResult = Array.prototype[method].apply(this.jobs, arguments);
      this._run();
      return methodResult;
    };
  });

  Object.defineProperty(Queue.prototype, 'length', {
    get: function() {
      return this.pending + this.jobs.length;
    }
  });

  Queue.prototype._run = function() {
    if (this.pending === this.concurrency) {
      return;
    }
    if (this.jobs.length) {
      var job = this.jobs.shift();
      this.pending++;
      job(this._done);
      this._run();
    }

    if (this.pending === 0) {
      while (this.cbs.length !== 0) {
        var cb = this.cbs.pop();
        process.nextTick(cb);
      }
    }
  };

  Queue.prototype.onDone = function(cb) {
    if (typeof cb === 'function') {
      this.cbs.push(cb);
      this._run();
    }
  };

  function done() {
    this.pending--;
    this._run();
  }

  var asyncLimiter = Queue;

  var bufferUtil = createCommonjsModule(function (module) {

  /**
   * Merges an array of buffers into a new buffer.
   *
   * @param {Buffer[]} list The array of buffers to concat
   * @param {Number} totalLength The total length of buffers in the list
   * @return {Buffer} The resulting buffer
   * @public
   */
  function concat(list, totalLength) {
    const target = Buffer.allocUnsafe(totalLength);
    var offset = 0;

    for (var i = 0; i < list.length; i++) {
      const buf = list[i];
      buf.copy(target, offset);
      offset += buf.length;
    }

    return target;
  }

  /**
   * Masks a buffer using the given mask.
   *
   * @param {Buffer} source The buffer to mask
   * @param {Buffer} mask The mask to use
   * @param {Buffer} output The buffer where to store the result
   * @param {Number} offset The offset at which to start writing
   * @param {Number} length The number of bytes to mask.
   * @public
   */
  function _mask(source, mask, output, offset, length) {
    for (var i = 0; i < length; i++) {
      output[offset + i] = source[i] ^ mask[i & 3];
    }
  }

  /**
   * Unmasks a buffer using the given mask.
   *
   * @param {Buffer} buffer The buffer to unmask
   * @param {Buffer} mask The mask to use
   * @public
   */
  function _unmask(buffer, mask) {
    // Required until https://github.com/nodejs/node/issues/9006 is resolved.
    const length = buffer.length;
    for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
    }
  }

  try {
    const bufferUtil = bufferutil;
    const bu = bufferUtil.BufferUtil || bufferUtil;

    module.exports = {
      mask(source, mask, output, offset, length) {
        if (length < 48) _mask(source, mask, output, offset, length);
        else bu.mask(source, mask, output, offset, length);
      },
      unmask(buffer, mask) {
        if (buffer.length < 32) _unmask(buffer, mask);
        else bu.unmask(buffer, mask);
      },
      concat
    };
  } catch (e) /* istanbul ignore next */ {
    module.exports = { concat, mask: _mask, unmask: _unmask };
  }
  });
  var bufferUtil_1 = bufferUtil.mask;
  var bufferUtil_2 = bufferUtil.unmask;
  var bufferUtil_3 = bufferUtil.concat;

  var constants = {
    BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
    GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
    kStatusCode: Symbol('status-code'),
    kWebSocket: Symbol('websocket'),
    EMPTY_BUFFER: Buffer.alloc(0),
    NOOP: () => {}
  };

  const { kStatusCode, NOOP } = constants;

  const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
  const EMPTY_BLOCK = Buffer.from([0x00]);

  const kPerMessageDeflate = Symbol('permessage-deflate');
  const kTotalLength = Symbol('total-length');
  const kCallback = Symbol('callback');
  const kBuffers = Symbol('buffers');
  const kError = Symbol('error');

  //
  // We limit zlib concurrency, which prevents severe memory fragmentation
  // as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
  // and https://github.com/websockets/ws/issues/1202
  //
  // Intentionally global; it's the global thread pool that's an issue.
  //
  let zlibLimiter;

  /**
   * permessage-deflate implementation.
   */
  class PerMessageDeflate {
    /**
     * Creates a PerMessageDeflate instance.
     *
     * @param {Object} options Configuration options
     * @param {Boolean} options.serverNoContextTakeover Request/accept disabling
     *     of server context takeover
     * @param {Boolean} options.clientNoContextTakeover Advertise/acknowledge
     *     disabling of client context takeover
     * @param {(Boolean|Number)} options.serverMaxWindowBits Request/confirm the
     *     use of a custom server window size
     * @param {(Boolean|Number)} options.clientMaxWindowBits Advertise support
     *     for, or request, a custom client window size
     * @param {Object} options.zlibDeflateOptions Options to pass to zlib on deflate
     * @param {Object} options.zlibInflateOptions Options to pass to zlib on inflate
     * @param {Number} options.threshold Size (in bytes) below which messages
     *     should not be compressed
     * @param {Number} options.concurrencyLimit The number of concurrent calls to
     *     zlib
     * @param {Boolean} isServer Create the instance in either server or client
     *     mode
     * @param {Number} maxPayload The maximum allowed message length
     */
    constructor(options, isServer, maxPayload) {
      this._maxPayload = maxPayload | 0;
      this._options = options || {};
      this._threshold =
        this._options.threshold !== undefined ? this._options.threshold : 1024;
      this._isServer = !!isServer;
      this._deflate = null;
      this._inflate = null;

      this.params = null;

      if (!zlibLimiter) {
        const concurrency =
          this._options.concurrencyLimit !== undefined
            ? this._options.concurrencyLimit
            : 10;
        zlibLimiter = new asyncLimiter({ concurrency });
      }
    }

    /**
     * @type {String}
     */
    static get extensionName() {
      return 'permessage-deflate';
    }

    /**
     * Create an extension negotiation offer.
     *
     * @return {Object} Extension parameters
     * @public
     */
    offer() {
      const params = {};

      if (this._options.serverNoContextTakeover) {
        params.server_no_context_takeover = true;
      }
      if (this._options.clientNoContextTakeover) {
        params.client_no_context_takeover = true;
      }
      if (this._options.serverMaxWindowBits) {
        params.server_max_window_bits = this._options.serverMaxWindowBits;
      }
      if (this._options.clientMaxWindowBits) {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      } else if (this._options.clientMaxWindowBits == null) {
        params.client_max_window_bits = true;
      }

      return params;
    }

    /**
     * Accept an extension negotiation offer/response.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Object} Accepted configuration
     * @public
     */
    accept(configurations) {
      configurations = this.normalizeParams(configurations);

      this.params = this._isServer
        ? this.acceptAsServer(configurations)
        : this.acceptAsClient(configurations);

      return this.params;
    }

    /**
     * Releases all resources used by the extension.
     *
     * @public
     */
    cleanup() {
      if (this._inflate) {
        this._inflate.close();
        this._inflate = null;
      }

      if (this._deflate) {
        this._deflate.close();
        this._deflate = null;
      }
    }

    /**
     *  Accept an extension negotiation offer.
     *
     * @param {Array} offers The extension negotiation offers
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsServer(offers) {
      const opts = this._options;
      const accepted = offers.find((params) => {
        if (
          (opts.serverNoContextTakeover === false &&
            params.server_no_context_takeover) ||
          (params.server_max_window_bits &&
            (opts.serverMaxWindowBits === false ||
              (typeof opts.serverMaxWindowBits === 'number' &&
                opts.serverMaxWindowBits > params.server_max_window_bits))) ||
          (typeof opts.clientMaxWindowBits === 'number' &&
            !params.client_max_window_bits)
        ) {
          return false;
        }

        return true;
      });

      if (!accepted) {
        throw new Error('None of the extension offers can be accepted');
      }

      if (opts.serverNoContextTakeover) {
        accepted.server_no_context_takeover = true;
      }
      if (opts.clientNoContextTakeover) {
        accepted.client_no_context_takeover = true;
      }
      if (typeof opts.serverMaxWindowBits === 'number') {
        accepted.server_max_window_bits = opts.serverMaxWindowBits;
      }
      if (typeof opts.clientMaxWindowBits === 'number') {
        accepted.client_max_window_bits = opts.clientMaxWindowBits;
      } else if (
        accepted.client_max_window_bits === true ||
        opts.clientMaxWindowBits === false
      ) {
        delete accepted.client_max_window_bits;
      }

      return accepted;
    }

    /**
     * Accept the extension negotiation response.
     *
     * @param {Array} response The extension negotiation response
     * @return {Object} Accepted configuration
     * @private
     */
    acceptAsClient(response) {
      const params = response[0];

      if (
        this._options.clientNoContextTakeover === false &&
        params.client_no_context_takeover
      ) {
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      }

      if (!params.client_max_window_bits) {
        if (typeof this._options.clientMaxWindowBits === 'number') {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        }
      } else if (
        this._options.clientMaxWindowBits === false ||
        (typeof this._options.clientMaxWindowBits === 'number' &&
          params.client_max_window_bits > this._options.clientMaxWindowBits)
      ) {
        throw new Error(
          'Unexpected or invalid parameter "client_max_window_bits"'
        );
      }

      return params;
    }

    /**
     * Normalize parameters.
     *
     * @param {Array} configurations The extension negotiation offers/reponse
     * @return {Array} The offers/response with normalized parameters
     * @private
     */
    normalizeParams(configurations) {
      configurations.forEach((params) => {
        Object.keys(params).forEach((key) => {
          var value = params[key];

          if (value.length > 1) {
            throw new Error(`Parameter "${key}" must have only a single value`);
          }

          value = value[0];

          if (key === 'client_max_window_bits') {
            if (value !== true) {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (!this._isServer) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
          } else if (key === 'server_max_window_bits') {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (
            key === 'client_no_context_takeover' ||
            key === 'server_no_context_takeover'
          ) {
            if (value !== true) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
          } else {
            throw new Error(`Unknown parameter "${key}"`);
          }

          params[key] = value;
        });
      });

      return configurations;
    }

    /**
     * Decompress data. Concurrency limited by async-limiter.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    decompress(data, fin, callback) {
      zlibLimiter.push((done) => {
        this._decompress(data, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }

    /**
     * Compress data. Concurrency limited by async-limiter.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @public
     */
    compress(data, fin, callback) {
      zlibLimiter.push((done) => {
        this._compress(data, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }

    /**
     * Decompress data.
     *
     * @param {Buffer} data Compressed data
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _decompress(data, fin, callback) {
      const endpoint = this._isServer ? 'client' : 'server';

      if (!this._inflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits =
          typeof this.params[key] !== 'number'
            ? zlib.Z_DEFAULT_WINDOWBITS
            : this.params[key];

        this._inflate = zlib.createInflateRaw(
          Object.assign({}, this._options.zlibInflateOptions, { windowBits })
        );
        this._inflate[kPerMessageDeflate] = this;
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];
        this._inflate.on('error', inflateOnError);
        this._inflate.on('data', inflateOnData);
      }

      this._inflate[kCallback] = callback;

      this._inflate.write(data);
      if (fin) this._inflate.write(TRAILER);

      this._inflate.flush(() => {
        const err = this._inflate[kError];

        if (err) {
          this._inflate.close();
          this._inflate = null;
          callback(err);
          return;
        }

        const data = bufferUtil.concat(
          this._inflate[kBuffers],
          this._inflate[kTotalLength]
        );

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.close();
          this._inflate = null;
        } else {
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }

    /**
     * Compress data.
     *
     * @param {Buffer} data Data to compress
     * @param {Boolean} fin Specifies whether or not this is the last fragment
     * @param {Function} callback Callback
     * @private
     */
    _compress(data, fin, callback) {
      if (!data || data.length === 0) {
        process.nextTick(callback, null, EMPTY_BLOCK);
        return;
      }

      const endpoint = this._isServer ? 'server' : 'client';

      if (!this._deflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits =
          typeof this.params[key] !== 'number'
            ? zlib.Z_DEFAULT_WINDOWBITS
            : this.params[key];

        this._deflate = zlib.createDeflateRaw(
          Object.assign({}, this._options.zlibDeflateOptions, { windowBits })
        );

        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];

        //
        // An `'error'` event is emitted, only on Node.js < 10.0.0, if the
        // `zlib.DeflateRaw` instance is closed while data is being processed.
        // This can happen if `PerMessageDeflate#cleanup()` is called at the wrong
        // time due to an abnormal WebSocket closure.
        //
        this._deflate.on('error', NOOP);
        this._deflate.on('data', deflateOnData);
      }

      this._deflate.write(data);
      this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
        if (!this._deflate) {
          //
          // This `if` statement is only needed for Node.js < 10.0.0 because as of
          // commit https://github.com/nodejs/node/commit/5e3f5164, the flush
          // callback is no longer called if the deflate stream is closed while
          // data is being processed.
          //
          return;
        }

        var data = bufferUtil.concat(
          this._deflate[kBuffers],
          this._deflate[kTotalLength]
        );

        if (fin) data = data.slice(0, data.length - 4);

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._deflate.close();
          this._deflate = null;
        } else {
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
        }

        callback(null, data);
      });
    }
  }

  var permessageDeflate = PerMessageDeflate;

  /**
   * The listener of the `zlib.DeflateRaw` stream `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function deflateOnData(chunk) {
    this[kBuffers].push(chunk);
    this[kTotalLength] += chunk.length;
  }

  /**
   * The listener of the `zlib.InflateRaw` stream `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function inflateOnData(chunk) {
    this[kTotalLength] += chunk.length;

    if (
      this[kPerMessageDeflate]._maxPayload < 1 ||
      this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
    ) {
      this[kBuffers].push(chunk);
      return;
    }

    this[kError] = new RangeError('Max payload size exceeded');
    this[kError][kStatusCode] = 1009;
    this.removeListener('data', inflateOnData);
    this.reset();
  }

  /**
   * The listener of the `zlib.InflateRaw` stream `'error'` event.
   *
   * @param {Error} err The emitted error
   * @private
   */
  function inflateOnError(err) {
    //
    // There is no need to call `Zlib#close()` as the handle is automatically
    // closed when an error is emitted.
    //
    this[kPerMessageDeflate]._inflate = null;
    err[kStatusCode] = 1007;
    this[kCallback](err);
  }

  /**
   * Class representing an event.
   *
   * @private
   */
  class Event {
    /**
     * Create a new `Event`.
     *
     * @param {String} type The name of the event
     * @param {Object} target A reference to the target to which the event was dispatched
     */
    constructor(type, target) {
      this.target = target;
      this.type = type;
    }
  }

  /**
   * Class representing a message event.
   *
   * @extends Event
   * @private
   */
  class MessageEvent extends Event {
    /**
     * Create a new `MessageEvent`.
     *
     * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The received data
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(data, target) {
      super('message', target);

      this.data = data;
    }
  }

  /**
   * Class representing a close event.
   *
   * @extends Event
   * @private
   */
  class CloseEvent extends Event {
    /**
     * Create a new `CloseEvent`.
     *
     * @param {Number} code The status code explaining why the connection is being closed
     * @param {String} reason A human-readable string explaining why the connection is closing
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(code, reason, target) {
      super('close', target);

      this.wasClean = target._closeFrameReceived && target._closeFrameSent;
      this.reason = reason;
      this.code = code;
    }
  }

  /**
   * Class representing an open event.
   *
   * @extends Event
   * @private
   */
  class OpenEvent extends Event {
    /**
     * Create a new `OpenEvent`.
     *
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(target) {
      super('open', target);
    }
  }

  /**
   * Class representing an error event.
   *
   * @extends Event
   * @private
   */
  class ErrorEvent extends Event {
    /**
     * Create a new `ErrorEvent`.
     *
     * @param {Object} error The error that generated this event
     * @param {WebSocket} target A reference to the target to which the event was dispatched
     */
    constructor(error, target) {
      super('error', target);

      this.message = error.message;
      this.error = error;
    }
  }

  /**
   * This provides methods for emulating the `EventTarget` interface. It's not
   * meant to be used directly.
   *
   * @mixin
   */
  const EventTarget = {
    /**
     * Register an event listener.
     *
     * @param {String} method A string representing the event type to listen for
     * @param {Function} listener The listener to add
     * @public
     */
    addEventListener(method, listener) {
      if (typeof listener !== 'function') return;

      function onMessage(data) {
        listener.call(this, new MessageEvent(data, this));
      }

      function onClose(code, message) {
        listener.call(this, new CloseEvent(code, message, this));
      }

      function onError(error) {
        listener.call(this, new ErrorEvent(error, this));
      }

      function onOpen() {
        listener.call(this, new OpenEvent(this));
      }

      if (method === 'message') {
        onMessage._listener = listener;
        this.on(method, onMessage);
      } else if (method === 'close') {
        onClose._listener = listener;
        this.on(method, onClose);
      } else if (method === 'error') {
        onError._listener = listener;
        this.on(method, onError);
      } else if (method === 'open') {
        onOpen._listener = listener;
        this.on(method, onOpen);
      } else {
        this.on(method, listener);
      }
    },

    /**
     * Remove an event listener.
     *
     * @param {String} method A string representing the event type to remove
     * @param {Function} listener The listener to remove
     * @public
     */
    removeEventListener(method, listener) {
      const listeners = this.listeners(method);

      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i] === listener || listeners[i]._listener === listener) {
          this.removeListener(method, listeners[i]);
        }
      }
    }
  };

  var eventTarget = EventTarget;

  //
  // Allowed token characters:
  //
  // '!', '#', '$', '%', '&', ''', '*', '+', '-',
  // '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
  //
  // tokenChars[32] === 0 // ' '
  // tokenChars[33] === 1 // '!'
  // tokenChars[34] === 0 // '"'
  // ...
  //
  // prettier-ignore
  const tokenChars = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
    0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
  ];

  /**
   * Adds an offer to the map of extension offers or a parameter to the map of
   * parameters.
   *
   * @param {Object} dest The map of extension offers or parameters
   * @param {String} name The extension or parameter name
   * @param {(Object|Boolean|String)} elem The extension parameters or the
   *     parameter value
   * @private
   */
  function push(dest, name, elem) {
    if (Object.prototype.hasOwnProperty.call(dest, name)) dest[name].push(elem);
    else dest[name] = [elem];
  }

  /**
   * Parses the `Sec-WebSocket-Extensions` header into an object.
   *
   * @param {String} header The field value of the header
   * @return {Object} The parsed object
   * @public
   */
  function parse$3(header) {
    const offers = {};

    if (header === undefined || header === '') return offers;

    var params = {};
    var mustUnescape = false;
    var isEscaping = false;
    var inQuotes = false;
    var extensionName;
    var paramName;
    var start = -1;
    var end = -1;

    for (var i = 0; i < header.length; i++) {
      const code = header.charCodeAt(i);

      if (extensionName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x20 /* ' ' */ || code === 0x09 /* '\t' */) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          const name = header.slice(start, end);
          if (code === 0x2c) {
            push(offers, name, params);
            params = {};
          } else {
            extensionName = name;
          }

          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (paramName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x20 || code === 0x09) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 0x3b || code === 0x2c) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          push(params, header.slice(start, end), true);
          if (code === 0x2c) {
            push(offers, extensionName, params);
            params = {};
            extensionName = undefined;
          }

          start = end = -1;
        } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
          paramName = header.slice(start, i);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else {
        //
        // The value of a quoted-string after unescaping must conform to the
        // token ABNF, so only token characters are valid.
        // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
        //
        if (isEscaping) {
          if (tokenChars[code] !== 1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (start === -1) start = i;
          else if (!mustUnescape) mustUnescape = true;
          isEscaping = false;
        } else if (inQuotes) {
          if (tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 0x22 /* '"' */ && start !== -1) {
            inQuotes = false;
            end = i;
          } else if (code === 0x5c /* '\' */) {
            isEscaping = true;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
          inQuotes = true;
        } else if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
          if (end === -1) end = i;
        } else if (code === 0x3b || code === 0x2c) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }

          if (end === -1) end = i;
          var value = header.slice(start, end);
          if (mustUnescape) {
            value = value.replace(/\\/g, '');
            mustUnescape = false;
          }
          push(params, paramName, value);
          if (code === 0x2c) {
            push(offers, extensionName, params);
            params = {};
            extensionName = undefined;
          }

          paramName = undefined;
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
    }

    if (start === -1 || inQuotes) {
      throw new SyntaxError('Unexpected end of input');
    }

    if (end === -1) end = i;
    const token = header.slice(start, end);
    if (extensionName === undefined) {
      push(offers, token, {});
    } else {
      if (paramName === undefined) {
        push(params, token, true);
      } else if (mustUnescape) {
        push(params, paramName, token.replace(/\\/g, ''));
      } else {
        push(params, paramName, token);
      }
      push(offers, extensionName, params);
    }

    return offers;
  }

  /**
   * Builds the `Sec-WebSocket-Extensions` header field value.
   *
   * @param {Object} extensions The map of extensions and parameters to format
   * @return {String} A string representing the given object
   * @public
   */
  function format(extensions) {
    return Object.keys(extensions)
      .map((extension) => {
        var configurations = extensions[extension];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations
          .map((params) => {
            return [extension]
              .concat(
                Object.keys(params).map((k) => {
                  var values = params[k];
                  if (!Array.isArray(values)) values = [values];
                  return values
                    .map((v) => (v === true ? k : `${k}=${v}`))
                    .join('; ');
                })
              )
              .join('; ');
          })
          .join(', ');
      })
      .join(', ');
  }

  var extension = { format, parse: parse$3 };

  var validation = createCommonjsModule(function (module, exports) {

  try {
    const isValidUTF8 = utf8Validate;

    exports.isValidUTF8 =
      typeof isValidUTF8 === 'object'
        ? isValidUTF8.Validation.isValidUTF8 // utf-8-validate@<3.0.0
        : isValidUTF8;
  } catch (e) /* istanbul ignore next */ {
    exports.isValidUTF8 = () => true;
  }

  /**
   * Checks if a status code is allowed in a close frame.
   *
   * @param {Number} code The status code
   * @return {Boolean} `true` if the status code is valid, else `false`
   * @public
   */
  exports.isValidStatusCode = (code) => {
    return (
      (code >= 1000 &&
        code <= 1013 &&
        code !== 1004 &&
        code !== 1005 &&
        code !== 1006) ||
      (code >= 3000 && code <= 4999)
    );
  };
  });
  var validation_1 = validation.isValidUTF8;
  var validation_2 = validation.isValidStatusCode;

  const GET_INFO = 0;
  const GET_PAYLOAD_LENGTH_16 = 1;
  const GET_PAYLOAD_LENGTH_64 = 2;
  const GET_MASK = 3;
  const GET_DATA = 4;
  const INFLATING = 5;

  /**
   * HyBi Receiver implementation.
   *
   * @extends stream.Writable
   */
  class Receiver extends stream.Writable {
    /**
     * Creates a Receiver instance.
     *
     * @param {String} binaryType The type for binary data
     * @param {Object} extensions An object containing the negotiated extensions
     * @param {Number} maxPayload The maximum allowed message length
     */
    constructor(binaryType, extensions, maxPayload) {
      super();

      this._binaryType = binaryType || constants.BINARY_TYPES[0];
      this[constants.kWebSocket] = undefined;
      this._extensions = extensions || {};
      this._maxPayload = maxPayload | 0;

      this._bufferedBytes = 0;
      this._buffers = [];

      this._compressed = false;
      this._payloadLength = 0;
      this._mask = undefined;
      this._fragmented = 0;
      this._masked = false;
      this._fin = false;
      this._opcode = 0;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragments = [];

      this._state = GET_INFO;
      this._loop = false;
    }

    /**
     * Implements `Writable.prototype._write()`.
     *
     * @param {Buffer} chunk The chunk of data to write
     * @param {String} encoding The character encoding of `chunk`
     * @param {Function} cb Callback
     */
    _write(chunk, encoding, cb) {
      if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

      this._bufferedBytes += chunk.length;
      this._buffers.push(chunk);
      this.startLoop(cb);
    }

    /**
     * Consumes `n` bytes from the buffered data.
     *
     * @param {Number} n The number of bytes to consume
     * @return {Buffer} The consumed bytes
     * @private
     */
    consume(n) {
      this._bufferedBytes -= n;

      if (n === this._buffers[0].length) return this._buffers.shift();

      if (n < this._buffers[0].length) {
        const buf = this._buffers[0];
        this._buffers[0] = buf.slice(n);
        return buf.slice(0, n);
      }

      const dst = Buffer.allocUnsafe(n);

      do {
        const buf = this._buffers[0];

        if (n >= buf.length) {
          this._buffers.shift().copy(dst, dst.length - n);
        } else {
          buf.copy(dst, dst.length - n, 0, n);
          this._buffers[0] = buf.slice(n);
        }

        n -= buf.length;
      } while (n > 0);

      return dst;
    }

    /**
     * Starts the parsing loop.
     *
     * @param {Function} cb Callback
     * @private
     */
    startLoop(cb) {
      var err;
      this._loop = true;

      do {
        switch (this._state) {
          case GET_INFO:
            err = this.getInfo();
            break;
          case GET_PAYLOAD_LENGTH_16:
            err = this.getPayloadLength16();
            break;
          case GET_PAYLOAD_LENGTH_64:
            err = this.getPayloadLength64();
            break;
          case GET_MASK:
            this.getMask();
            break;
          case GET_DATA:
            err = this.getData(cb);
            break;
          default:
            // `INFLATING`
            this._loop = false;
            return;
        }
      } while (this._loop);

      cb(err);
    }

    /**
     * Reads the first two bytes of a frame.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getInfo() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      const buf = this.consume(2);

      if ((buf[0] & 0x30) !== 0x00) {
        this._loop = false;
        return error(RangeError, 'RSV2 and RSV3 must be clear', true, 1002);
      }

      const compressed = (buf[0] & 0x40) === 0x40;

      if (compressed && !this._extensions[permessageDeflate.extensionName]) {
        this._loop = false;
        return error(RangeError, 'RSV1 must be clear', true, 1002);
      }

      this._fin = (buf[0] & 0x80) === 0x80;
      this._opcode = buf[0] & 0x0f;
      this._payloadLength = buf[1] & 0x7f;

      if (this._opcode === 0x00) {
        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (!this._fragmented) {
          this._loop = false;
          return error(RangeError, 'invalid opcode 0', true, 1002);
        }

        this._opcode = this._fragmented;
      } else if (this._opcode === 0x01 || this._opcode === 0x02) {
        if (this._fragmented) {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
        }

        this._compressed = compressed;
      } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
        if (!this._fin) {
          this._loop = false;
          return error(RangeError, 'FIN must be set', true, 1002);
        }

        if (compressed) {
          this._loop = false;
          return error(RangeError, 'RSV1 must be clear', true, 1002);
        }

        if (this._payloadLength > 0x7d) {
          this._loop = false;
          return error(
            RangeError,
            `invalid payload length ${this._payloadLength}`,
            true,
            1002
          );
        }
      } else {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002);
      }

      if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
      this._masked = (buf[1] & 0x80) === 0x80;

      if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
      else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
      else return this.haveLength();
    }

    /**
     * Gets extended payload length (7+16).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getPayloadLength16() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }

      this._payloadLength = this.consume(2).readUInt16BE(0);
      return this.haveLength();
    }

    /**
     * Gets extended payload length (7+64).
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    getPayloadLength64() {
      if (this._bufferedBytes < 8) {
        this._loop = false;
        return;
      }

      const buf = this.consume(8);
      const num = buf.readUInt32BE(0);

      //
      // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
      // if payload length is greater than this number.
      //
      if (num > Math.pow(2, 53 - 32) - 1) {
        this._loop = false;
        return error(
          RangeError,
          'Unsupported WebSocket frame: payload length > 2^53 - 1',
          false,
          1009
        );
      }

      this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
      return this.haveLength();
    }

    /**
     * Payload length has been read.
     *
     * @return {(RangeError|undefined)} A possible error
     * @private
     */
    haveLength() {
      if (this._payloadLength && this._opcode < 0x08) {
        this._totalPayloadLength += this._payloadLength;
        if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
          this._loop = false;
          return error(RangeError, 'Max payload size exceeded', false, 1009);
        }
      }

      if (this._masked) this._state = GET_MASK;
      else this._state = GET_DATA;
    }

    /**
     * Reads mask bytes.
     *
     * @private
     */
    getMask() {
      if (this._bufferedBytes < 4) {
        this._loop = false;
        return;
      }

      this._mask = this.consume(4);
      this._state = GET_DATA;
    }

    /**
     * Reads data bytes.
     *
     * @param {Function} cb Callback
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    getData(cb) {
      var data = constants.EMPTY_BUFFER;

      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = false;
          return;
        }

        data = this.consume(this._payloadLength);
        if (this._masked) bufferUtil.unmask(data, this._mask);
      }

      if (this._opcode > 0x07) return this.controlMessage(data);

      if (this._compressed) {
        this._state = INFLATING;
        this.decompress(data, cb);
        return;
      }

      if (data.length) {
        //
        // This message is not compressed so its lenght is the sum of the payload
        // length of all fragments.
        //
        this._messageLength = this._totalPayloadLength;
        this._fragments.push(data);
      }

      return this.dataMessage();
    }

    /**
     * Decompresses data.
     *
     * @param {Buffer} data Compressed data
     * @param {Function} cb Callback
     * @private
     */
    decompress(data, cb) {
      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      perMessageDeflate.decompress(data, this._fin, (err, buf) => {
        if (err) return cb(err);

        if (buf.length) {
          this._messageLength += buf.length;
          if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
            return cb(
              error(RangeError, 'Max payload size exceeded', false, 1009)
            );
          }

          this._fragments.push(buf);
        }

        const er = this.dataMessage();
        if (er) return cb(er);

        this.startLoop(cb);
      });
    }

    /**
     * Handles a data message.
     *
     * @return {(Error|undefined)} A possible error
     * @private
     */
    dataMessage() {
      if (this._fin) {
        const messageLength = this._messageLength;
        const fragments = this._fragments;

        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];

        if (this._opcode === 2) {
          var data;

          if (this._binaryType === 'nodebuffer') {
            data = toBuffer(fragments, messageLength);
          } else if (this._binaryType === 'arraybuffer') {
            data = toArrayBuffer(toBuffer(fragments, messageLength));
          } else {
            data = fragments;
          }

          this.emit('message', data);
        } else {
          const buf = toBuffer(fragments, messageLength);

          if (!validation.isValidUTF8(buf)) {
            this._loop = false;
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('message', buf.toString());
        }
      }

      this._state = GET_INFO;
    }

    /**
     * Handles a control message.
     *
     * @param {Buffer} data Data to handle
     * @return {(Error|RangeError|undefined)} A possible error
     * @private
     */
    controlMessage(data) {
      if (this._opcode === 0x08) {
        this._loop = false;

        if (data.length === 0) {
          this.emit('conclude', 1005, '');
          this.end();
        } else if (data.length === 1) {
          return error(RangeError, 'invalid payload length 1', true, 1002);
        } else {
          const code = data.readUInt16BE(0);

          if (!validation.isValidStatusCode(code)) {
            return error(RangeError, `invalid status code ${code}`, true, 1002);
          }

          const buf = data.slice(2);

          if (!validation.isValidUTF8(buf)) {
            return error(Error, 'invalid UTF-8 sequence', true, 1007);
          }

          this.emit('conclude', code, buf.toString());
          this.end();
        }
      } else if (this._opcode === 0x09) {
        this.emit('ping', data);
      } else {
        this.emit('pong', data);
      }

      this._state = GET_INFO;
    }
  }

  var receiver = Receiver;

  /**
   * Builds an error object.
   *
   * @param {(Error|RangeError)} ErrorCtor The error constructor
   * @param {String} message The error message
   * @param {Boolean} prefix Specifies whether or not to add a default prefix to
   *     `message`
   * @param {Number} statusCode The status code
   * @return {(Error|RangeError)} The error
   * @private
   */
  function error(ErrorCtor, message, prefix, statusCode) {
    const err = new ErrorCtor(
      prefix ? `Invalid WebSocket frame: ${message}` : message
    );

    Error.captureStackTrace(err, error);
    err[constants.kStatusCode] = statusCode;
    return err;
  }

  /**
   * Makes a buffer from a list of fragments.
   *
   * @param {Buffer[]} fragments The list of fragments composing the message
   * @param {Number} messageLength The length of the message
   * @return {Buffer}
   * @private
   */
  function toBuffer(fragments, messageLength) {
    if (fragments.length === 1) return fragments[0];
    if (fragments.length > 1) return bufferUtil.concat(fragments, messageLength);
    return constants.EMPTY_BUFFER;
  }

  /**
   * Converts a buffer to an `ArrayBuffer`.
   *
   * @param {Buffer} buf The buffer to convert
   * @return {ArrayBuffer} Converted buffer
   */
  function toArrayBuffer(buf) {
    if (buf.byteLength === buf.buffer.byteLength) {
      return buf.buffer;
    }

    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  }

  /**
   * HyBi Sender implementation.
   */
  class Sender {
    /**
     * Creates a Sender instance.
     *
     * @param {net.Socket} socket The connection socket
     * @param {Object} extensions An object containing the negotiated extensions
     */
    constructor(socket, extensions) {
      this._extensions = extensions || {};
      this._socket = socket;

      this._firstFragment = true;
      this._compress = false;

      this._bufferedBytes = 0;
      this._deflating = false;
      this._queue = [];
    }

    /**
     * Frames a piece of data according to the HyBi WebSocket protocol.
     *
     * @param {Buffer} data The data to frame
     * @param {Object} options Options object
     * @param {Number} options.opcode The opcode
     * @param {Boolean} options.readOnly Specifies whether `data` can be modified
     * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
     * @return {Buffer[]} The framed data as a list of `Buffer` instances
     * @public
     */
    static frame(data, options) {
      const merge = data.length < 1024 || (options.mask && options.readOnly);
      var offset = options.mask ? 6 : 2;
      var payloadLength = data.length;

      if (data.length >= 65536) {
        offset += 8;
        payloadLength = 127;
      } else if (data.length > 125) {
        offset += 2;
        payloadLength = 126;
      }

      const target = Buffer.allocUnsafe(merge ? data.length + offset : offset);

      target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
      if (options.rsv1) target[0] |= 0x40;

      if (payloadLength === 126) {
        target.writeUInt16BE(data.length, 2);
      } else if (payloadLength === 127) {
        target.writeUInt32BE(0, 2);
        target.writeUInt32BE(data.length, 6);
      }

      if (!options.mask) {
        target[1] = payloadLength;
        if (merge) {
          data.copy(target, offset);
          return [target];
        }

        return [target, data];
      }

      const mask = crypto.randomBytes(4);

      target[1] = payloadLength | 0x80;
      target[offset - 4] = mask[0];
      target[offset - 3] = mask[1];
      target[offset - 2] = mask[2];
      target[offset - 1] = mask[3];

      if (merge) {
        bufferUtil.mask(data, mask, target, offset, data.length);
        return [target];
      }

      bufferUtil.mask(data, mask, data, 0, data.length);
      return [target, data];
    }

    /**
     * Sends a close message to the other peer.
     *
     * @param {(Number|undefined)} code The status code component of the body
     * @param {String} data The message component of the body
     * @param {Boolean} mask Specifies whether or not to mask the message
     * @param {Function} cb Callback
     * @public
     */
    close(code, data, mask, cb) {
      var buf;

      if (code === undefined) {
        buf = constants.EMPTY_BUFFER;
      } else if (
        typeof code !== 'number' ||
        !validation.isValidStatusCode(code)
      ) {
        throw new TypeError('First argument must be a valid error code number');
      } else if (data === undefined || data === '') {
        buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(code, 0);
      } else {
        buf = Buffer.allocUnsafe(2 + Buffer.byteLength(data));
        buf.writeUInt16BE(code, 0);
        buf.write(data, 2);
      }

      if (this._deflating) {
        this.enqueue([this.doClose, buf, mask, cb]);
      } else {
        this.doClose(buf, mask, cb);
      }
    }

    /**
     * Frames and sends a close message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @private
     */
    doClose(data, mask, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x08,
          mask,
          readOnly: false
        }),
        cb
      );
    }

    /**
     * Sends a ping message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    ping(data, mask, cb) {
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      if (this._deflating) {
        this.enqueue([this.doPing, data, mask, readOnly, cb]);
      } else {
        this.doPing(data, mask, readOnly, cb);
      }
    }

    /**
     * Frames and sends a ping message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */
    doPing(data, mask, readOnly, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x09,
          mask,
          readOnly
        }),
        cb
      );
    }

    /**
     * Sends a pong message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    pong(data, mask, cb) {
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      if (this._deflating) {
        this.enqueue([this.doPong, data, mask, readOnly, cb]);
      } else {
        this.doPong(data, mask, readOnly, cb);
      }
    }

    /**
     * Frames and sends a pong message.
     *
     * @param {*} data The message to send
     * @param {Boolean} mask Specifies whether or not to mask `data`
     * @param {Boolean} readOnly Specifies whether `data` can be modified
     * @param {Function} cb Callback
     * @private
     */
    doPong(data, mask, readOnly, cb) {
      this.sendFrame(
        Sender.frame(data, {
          fin: true,
          rsv1: false,
          opcode: 0x0a,
          mask,
          readOnly
        }),
        cb
      );
    }

    /**
     * Sends a data message to the other peer.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback
     * @public
     */
    send(data, options, cb) {
      var opcode = options.binary ? 2 : 1;
      var rsv1 = options.compress;
      var readOnly = true;

      if (!Buffer.isBuffer(data)) {
        if (data instanceof ArrayBuffer) {
          data = Buffer.from(data);
        } else if (ArrayBuffer.isView(data)) {
          data = viewToBuffer(data);
        } else {
          data = Buffer.from(data);
          readOnly = false;
        }
      }

      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      if (this._firstFragment) {
        this._firstFragment = false;
        if (rsv1 && perMessageDeflate) {
          rsv1 = data.length >= perMessageDeflate._threshold;
        }
        this._compress = rsv1;
      } else {
        rsv1 = false;
        opcode = 0;
      }

      if (options.fin) this._firstFragment = true;

      if (perMessageDeflate) {
        const opts = {
          fin: options.fin,
          rsv1,
          opcode,
          mask: options.mask,
          readOnly
        };

        if (this._deflating) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      } else {
        this.sendFrame(
          Sender.frame(data, {
            fin: options.fin,
            rsv1: false,
            opcode,
            mask: options.mask,
            readOnly
          }),
          cb
        );
      }
    }

    /**
     * Dispatches a data message.
     *
     * @param {Buffer} data The message to send
     * @param {Boolean} compress Specifies whether or not to compress `data`
     * @param {Object} options Options object
     * @param {Number} options.opcode The opcode
     * @param {Boolean} options.readOnly Specifies whether `data` can be modified
     * @param {Boolean} options.fin Specifies whether or not to set the FIN bit
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Boolean} options.rsv1 Specifies whether or not to set the RSV1 bit
     * @param {Function} cb Callback
     * @private
     */
    dispatch(data, compress, options, cb) {
      if (!compress) {
        this.sendFrame(Sender.frame(data, options), cb);
        return;
      }

      const perMessageDeflate = this._extensions[permessageDeflate.extensionName];

      this._deflating = true;
      perMessageDeflate.compress(data, options.fin, (_, buf) => {
        this._deflating = false;
        options.readOnly = false;
        this.sendFrame(Sender.frame(buf, options), cb);
        this.dequeue();
      });
    }

    /**
     * Executes queued send operations.
     *
     * @private
     */
    dequeue() {
      while (!this._deflating && this._queue.length) {
        const params = this._queue.shift();

        this._bufferedBytes -= params[1].length;
        params[0].apply(this, params.slice(1));
      }
    }

    /**
     * Enqueues a send operation.
     *
     * @param {Array} params Send operation parameters.
     * @private
     */
    enqueue(params) {
      this._bufferedBytes += params[1].length;
      this._queue.push(params);
    }

    /**
     * Sends a frame.
     *
     * @param {Buffer[]} list The frame to send
     * @param {Function} cb Callback
     * @private
     */
    sendFrame(list, cb) {
      if (list.length === 2) {
        this._socket.write(list[0]);
        this._socket.write(list[1], cb);
      } else {
        this._socket.write(list[0], cb);
      }
    }
  }

  var sender = Sender;

  /**
   * Converts an `ArrayBuffer` view into a buffer.
   *
   * @param {(DataView|TypedArray)} view The view to convert
   * @return {Buffer} Converted view
   * @private
   */
  function viewToBuffer(view) {
    const buf = Buffer.from(view.buffer);

    if (view.byteLength !== view.buffer.byteLength) {
      return buf.slice(view.byteOffset, view.byteOffset + view.byteLength);
    }

    return buf;
  }

  const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
  const kWebSocket = constants.kWebSocket;
  const protocolVersions = [8, 13];
  const closeTimeout = 30 * 1000; // Allow 30 seconds to terminate the connection cleanly.

  /**
   * Class representing a WebSocket.
   *
   * @extends EventEmitter
   */
  class WebSocket$1 extends events {
    /**
     * Create a new `WebSocket`.
     *
     * @param {(String|url.Url|url.URL)} address The URL to which to connect
     * @param {(String|String[])} protocols The subprotocols
     * @param {Object} options Connection options
     */
    constructor(address, protocols, options) {
      super();

      this.readyState = WebSocket$1.CONNECTING;
      this.protocol = '';

      this._binaryType = constants.BINARY_TYPES[0];
      this._closeFrameReceived = false;
      this._closeFrameSent = false;
      this._closeMessage = '';
      this._closeTimer = null;
      this._closeCode = 1006;
      this._extensions = {};
      this._isServer = true;
      this._receiver = null;
      this._sender = null;
      this._socket = null;

      if (address !== null) {
        if (Array.isArray(protocols)) {
          protocols = protocols.join(', ');
        } else if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = undefined;
        }

        initAsClient.call(this, address, protocols, options);
      }
    }

    get CONNECTING() {
      return WebSocket$1.CONNECTING;
    }
    get CLOSING() {
      return WebSocket$1.CLOSING;
    }
    get CLOSED() {
      return WebSocket$1.CLOSED;
    }
    get OPEN() {
      return WebSocket$1.OPEN;
    }

    /**
     * This deviates from the WHATWG interface since ws doesn't support the required
     * default "blob" type (instead we define a custom "nodebuffer" type).
     *
     * @type {String}
     */
    get binaryType() {
      return this._binaryType;
    }

    set binaryType(type) {
      if (!constants.BINARY_TYPES.includes(type)) return;

      this._binaryType = type;

      //
      // Allow to change `binaryType` on the fly.
      //
      if (this._receiver) this._receiver._binaryType = type;
    }

    /**
     * @type {Number}
     */
    get bufferedAmount() {
      if (!this._socket) return 0;

      //
      // `socket.bufferSize` is `undefined` if the socket is closed.
      //
      return (this._socket.bufferSize || 0) + this._sender._bufferedBytes;
    }

    /**
     * @type {String}
     */
    get extensions() {
      return Object.keys(this._extensions).join();
    }

    /**
     * Set up the socket and the internal resources.
     *
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Number} maxPayload The maximum allowed message size
     * @private
     */
    setSocket(socket, head, maxPayload) {
      const receiver$1 = new receiver(
        this._binaryType,
        this._extensions,
        maxPayload
      );

      this._sender = new sender(socket, this._extensions);
      this._receiver = receiver$1;
      this._socket = socket;

      receiver$1[kWebSocket] = this;
      socket[kWebSocket] = this;

      receiver$1.on('conclude', receiverOnConclude);
      receiver$1.on('drain', receiverOnDrain);
      receiver$1.on('error', receiverOnError);
      receiver$1.on('message', receiverOnMessage);
      receiver$1.on('ping', receiverOnPing);
      receiver$1.on('pong', receiverOnPong);

      socket.setTimeout(0);
      socket.setNoDelay();

      if (head.length > 0) socket.unshift(head);

      socket.on('close', socketOnClose);
      socket.on('data', socketOnData);
      socket.on('end', socketOnEnd);
      socket.on('error', socketOnError);

      this.readyState = WebSocket$1.OPEN;
      this.emit('open');
    }

    /**
     * Emit the `'close'` event.
     *
     * @private
     */
    emitClose() {
      this.readyState = WebSocket$1.CLOSED;

      if (!this._socket) {
        this.emit('close', this._closeCode, this._closeMessage);
        return;
      }

      if (this._extensions[permessageDeflate.extensionName]) {
        this._extensions[permessageDeflate.extensionName].cleanup();
      }

      this._receiver.removeAllListeners();
      this.emit('close', this._closeCode, this._closeMessage);
    }

    /**
     * Start a closing handshake.
     *
     *          +----------+   +-----------+   +----------+
     *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
     *    |     +----------+   +-----------+   +----------+     |
     *          +----------+   +-----------+         |
     * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
     *          +----------+   +-----------+   |
     *    |           |                        |   +---+        |
     *                +------------------------+-->|fin| - - - -
     *    |         +---+                      |   +---+
     *     - - - - -|fin|<---------------------+
     *              +---+
     *
     * @param {Number} code Status code explaining why the connection is closing
     * @param {String} data A string explaining why the connection is closing
     * @public
     */
    close(code, data) {
      if (this.readyState === WebSocket$1.CLOSED) return;
      if (this.readyState === WebSocket$1.CONNECTING) {
        const msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this.readyState === WebSocket$1.CLOSING) {
        if (this._closeFrameSent && this._closeFrameReceived) this._socket.end();
        return;
      }

      this.readyState = WebSocket$1.CLOSING;
      this._sender.close(code, data, !this._isServer, (err) => {
        //
        // This error is handled by the `'error'` listener on the socket. We only
        // want to know if the close frame has been sent here.
        //
        if (err) return;

        this._closeFrameSent = true;

        if (this._socket.writable) {
          if (this._closeFrameReceived) this._socket.end();

          //
          // Ensure that the connection is closed even if the closing handshake
          // fails.
          //
          this._closeTimer = setTimeout(
            this._socket.destroy.bind(this._socket),
            closeTimeout
          );
        }
      });
    }

    /**
     * Send a ping.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the ping is sent
     * @public
     */
    ping(data, mask, cb) {
      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();
      if (mask === undefined) mask = !this._isServer;
      this._sender.ping(data || constants.EMPTY_BUFFER, mask, cb);
    }

    /**
     * Send a pong.
     *
     * @param {*} data The data to send
     * @param {Boolean} mask Indicates whether or not to mask `data`
     * @param {Function} cb Callback which is executed when the pong is sent
     * @public
     */
    pong(data, mask, cb) {
      if (typeof data === 'function') {
        cb = data;
        data = mask = undefined;
      } else if (typeof mask === 'function') {
        cb = mask;
        mask = undefined;
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();
      if (mask === undefined) mask = !this._isServer;
      this._sender.pong(data || constants.EMPTY_BUFFER, mask, cb);
    }

    /**
     * Send a data message.
     *
     * @param {*} data The message to send
     * @param {Object} options Options object
     * @param {Boolean} options.compress Specifies whether or not to compress `data`
     * @param {Boolean} options.binary Specifies whether `data` is binary or text
     * @param {Boolean} options.fin Specifies whether the fragment is the last one
     * @param {Boolean} options.mask Specifies whether or not to mask `data`
     * @param {Function} cb Callback which is executed when data is written out
     * @public
     */
    send(data, options, cb) {
      if (typeof options === 'function') {
        cb = options;
        options = {};
      }

      if (this.readyState !== WebSocket$1.OPEN) {
        const err = new Error(
          `WebSocket is not open: readyState ${this.readyState} ` +
            `(${readyStates[this.readyState]})`
        );

        if (cb) return cb(err);
        throw err;
      }

      if (typeof data === 'number') data = data.toString();

      const opts = Object.assign(
        {
          binary: typeof data !== 'string',
          mask: !this._isServer,
          compress: true,
          fin: true
        },
        options
      );

      if (!this._extensions[permessageDeflate.extensionName]) {
        opts.compress = false;
      }

      this._sender.send(data || constants.EMPTY_BUFFER, opts, cb);
    }

    /**
     * Forcibly close the connection.
     *
     * @public
     */
    terminate() {
      if (this.readyState === WebSocket$1.CLOSED) return;
      if (this.readyState === WebSocket$1.CONNECTING) {
        const msg = 'WebSocket was closed before the connection was established';
        return abortHandshake(this, this._req, msg);
      }

      if (this._socket) {
        this.readyState = WebSocket$1.CLOSING;
        this._socket.destroy();
      }
    }
  }

  readyStates.forEach((readyState, i) => {
    WebSocket$1[readyState] = i;
  });

  //
  // Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
  // See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
  //
  ['open', 'error', 'close', 'message'].forEach((method) => {
    Object.defineProperty(WebSocket$1.prototype, `on${method}`, {
      /**
       * Return the listener of the event.
       *
       * @return {(Function|undefined)} The event listener or `undefined`
       * @public
       */
      get() {
        const listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          if (listeners[i]._listener) return listeners[i]._listener;
        }

        return undefined;
      },
      /**
       * Add a listener for the event.
       *
       * @param {Function} listener The listener to add
       * @public
       */
      set(listener) {
        const listeners = this.listeners(method);
        for (var i = 0; i < listeners.length; i++) {
          //
          // Remove only the listeners added via `addEventListener`.
          //
          if (listeners[i]._listener) this.removeListener(method, listeners[i]);
        }
        this.addEventListener(method, listener);
      }
    });
  });

  WebSocket$1.prototype.addEventListener = eventTarget.addEventListener;
  WebSocket$1.prototype.removeEventListener = eventTarget.removeEventListener;

  var websocket = WebSocket$1;

  /**
   * Initialize a WebSocket client.
   *
   * @param {(String|url.Url|url.URL)} address The URL to which to connect
   * @param {String} protocols The subprotocols
   * @param {Object} options Connection options
   * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
   * @param {Number} options.handshakeTimeout Timeout in milliseconds for the handshake request
   * @param {Number} options.protocolVersion Value of the `Sec-WebSocket-Version` header
   * @param {String} options.origin Value of the `Origin` or `Sec-WebSocket-Origin` header
   * @param {Number} options.maxPayload The maximum allowed message size
   * @private
   */
  function initAsClient(address, protocols, options) {
    options = Object.assign(
      {
        protocolVersion: protocolVersions[1],
        perMessageDeflate: true,
        maxPayload: 100 * 1024 * 1024
      },
      options,
      {
        createConnection: undefined,
        socketPath: undefined,
        hostname: undefined,
        protocol: undefined,
        timeout: undefined,
        method: undefined,
        auth: undefined,
        host: undefined,
        path: undefined,
        port: undefined
      }
    );

    if (!protocolVersions.includes(options.protocolVersion)) {
      throw new RangeError(
        `Unsupported protocol version: ${options.protocolVersion} ` +
          `(supported versions: ${protocolVersions.join(', ')})`
      );
    }

    this._isServer = false;

    var parsedUrl;

    if (typeof address === 'object' && address.href !== undefined) {
      parsedUrl = address;
      this.url = address.href;
    } else {
      //
      // The WHATWG URL constructor is not available on Node.js < 6.13.0
      //
      parsedUrl = url$1.URL ? new url$1.URL(address) : url$1.parse(address);
      this.url = address;
    }

    const isUnixSocket = parsedUrl.protocol === 'ws+unix:';

    if (!parsedUrl.host && (!isUnixSocket || !parsedUrl.pathname)) {
      throw new Error(`Invalid URL: ${this.url}`);
    }

    const isSecure =
      parsedUrl.protocol === 'wss:' || parsedUrl.protocol === 'https:';
    const defaultPort = isSecure ? 443 : 80;
    const key = crypto.randomBytes(16).toString('base64');
    const httpObj = isSecure ? https : http;
    const path = parsedUrl.search
      ? `${parsedUrl.pathname || '/'}${parsedUrl.search}`
      : parsedUrl.pathname || '/';
    var perMessageDeflate;

    options.createConnection = isSecure ? tlsConnect : netConnect;
    options.defaultPort = options.defaultPort || defaultPort;
    options.port = parsedUrl.port || defaultPort;
    options.host = parsedUrl.hostname.startsWith('[')
      ? parsedUrl.hostname.slice(1, -1)
      : parsedUrl.hostname;
    options.headers = Object.assign(
      {
        'Sec-WebSocket-Version': options.protocolVersion,
        'Sec-WebSocket-Key': key,
        Connection: 'Upgrade',
        Upgrade: 'websocket'
      },
      options.headers
    );
    options.path = path;
    options.timeout = options.handshakeTimeout;

    if (options.perMessageDeflate) {
      perMessageDeflate = new permessageDeflate(
        options.perMessageDeflate !== true ? options.perMessageDeflate : {},
        false,
        options.maxPayload
      );
      options.headers['Sec-WebSocket-Extensions'] = extension.format({
        [permessageDeflate.extensionName]: perMessageDeflate.offer()
      });
    }
    if (protocols) {
      options.headers['Sec-WebSocket-Protocol'] = protocols;
    }
    if (options.origin) {
      if (options.protocolVersion < 13) {
        options.headers['Sec-WebSocket-Origin'] = options.origin;
      } else {
        options.headers.Origin = options.origin;
      }
    }
    if (parsedUrl.auth) {
      options.auth = parsedUrl.auth;
    } else if (parsedUrl.username || parsedUrl.password) {
      options.auth = `${parsedUrl.username}:${parsedUrl.password}`;
    }

    if (isUnixSocket) {
      const parts = path.split(':');

      options.socketPath = parts[0];
      options.path = parts[1];
    }

    var req = (this._req = httpObj.get(options));

    if (options.handshakeTimeout) {
      req.on('timeout', () => {
        abortHandshake(this, req, 'Opening handshake has timed out');
      });
    }

    req.on('error', (err) => {
      if (this._req.aborted) return;

      req = this._req = null;
      this.readyState = WebSocket$1.CLOSING;
      this.emit('error', err);
      this.emitClose();
    });

    req.on('response', (res) => {
      if (this.emit('unexpected-response', req, res)) return;

      abortHandshake(this, req, `Unexpected server response: ${res.statusCode}`);
    });

    req.on('upgrade', (res, socket, head) => {
      this.emit('upgrade', res);

      //
      // The user may have closed the connection from a listener of the `upgrade`
      // event.
      //
      if (this.readyState !== WebSocket$1.CONNECTING) return;

      req = this._req = null;

      const digest = crypto
        .createHash('sha1')
        .update(key + constants.GUID, 'binary')
        .digest('base64');

      if (res.headers['sec-websocket-accept'] !== digest) {
        abortHandshake(this, socket, 'Invalid Sec-WebSocket-Accept header');
        return;
      }

      const serverProt = res.headers['sec-websocket-protocol'];
      const protList = (protocols || '').split(/, */);
      var protError;

      if (!protocols && serverProt) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (protocols && !serverProt) {
        protError = 'Server sent no subprotocol';
      } else if (serverProt && !protList.includes(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }

      if (protError) {
        abortHandshake(this, socket, protError);
        return;
      }

      if (serverProt) this.protocol = serverProt;

      if (perMessageDeflate) {
        try {
          const extensions = extension.parse(
            res.headers['sec-websocket-extensions']
          );

          if (extensions[permessageDeflate.extensionName]) {
            perMessageDeflate.accept(extensions[permessageDeflate.extensionName]);
            this._extensions[permessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          abortHandshake(this, socket, 'Invalid Sec-WebSocket-Extensions header');
          return;
        }
      }

      this.setSocket(socket, head, options.maxPayload);
    });
  }

  /**
   * Create a `net.Socket` and initiate a connection.
   *
   * @param {Object} options Connection options
   * @return {net.Socket} The newly created socket used to start the connection
   * @private
   */
  function netConnect(options) {
    //
    // Override `options.path` only if `options` is a copy of the original options
    // object. This is always true on Node.js >= 8 but not on Node.js 6 where
    // `options.socketPath` might be `undefined` even if the `socketPath` option
    // was originally set.
    //
    if (options.protocolVersion) options.path = options.socketPath;
    return net.connect(options);
  }

  /**
   * Create a `tls.TLSSocket` and initiate a connection.
   *
   * @param {Object} options Connection options
   * @return {tls.TLSSocket} The newly created socket used to start the connection
   * @private
   */
  function tlsConnect(options) {
    options.path = undefined;
    options.servername = options.servername || options.host;
    return tls.connect(options);
  }

  /**
   * Abort the handshake and emit an error.
   *
   * @param {WebSocket} websocket The WebSocket instance
   * @param {(http.ClientRequest|net.Socket)} stream The request to abort or the
   *     socket to destroy
   * @param {String} message The error message
   * @private
   */
  function abortHandshake(websocket, stream, message) {
    websocket.readyState = WebSocket$1.CLOSING;

    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshake);

    if (stream.setHeader) {
      stream.abort();
      stream.once('abort', websocket.emitClose.bind(websocket));
      websocket.emit('error', err);
    } else {
      stream.destroy(err);
      stream.once('error', websocket.emit.bind(websocket, 'error'));
      stream.once('close', websocket.emitClose.bind(websocket));
    }
  }

  /**
   * The listener of the `Receiver` `'conclude'` event.
   *
   * @param {Number} code The status code
   * @param {String} reason The reason for closing
   * @private
   */
  function receiverOnConclude(code, reason) {
    const websocket = this[kWebSocket];

    websocket._socket.removeListener('data', socketOnData);
    websocket._socket.resume();

    websocket._closeFrameReceived = true;
    websocket._closeMessage = reason;
    websocket._closeCode = code;

    if (code === 1005) websocket.close();
    else websocket.close(code, reason);
  }

  /**
   * The listener of the `Receiver` `'drain'` event.
   *
   * @private
   */
  function receiverOnDrain() {
    this[kWebSocket]._socket.resume();
  }

  /**
   * The listener of the `Receiver` `'error'` event.
   *
   * @param {(RangeError|Error)} err The emitted error
   * @private
   */
  function receiverOnError(err) {
    const websocket = this[kWebSocket];

    websocket._socket.removeListener('data', socketOnData);

    websocket.readyState = WebSocket$1.CLOSING;
    websocket._closeCode = err[constants.kStatusCode];
    websocket.emit('error', err);
    websocket._socket.destroy();
  }

  /**
   * The listener of the `Receiver` `'finish'` event.
   *
   * @private
   */
  function receiverOnFinish() {
    this[kWebSocket].emitClose();
  }

  /**
   * The listener of the `Receiver` `'message'` event.
   *
   * @param {(String|Buffer|ArrayBuffer|Buffer[])} data The message
   * @private
   */
  function receiverOnMessage(data) {
    this[kWebSocket].emit('message', data);
  }

  /**
   * The listener of the `Receiver` `'ping'` event.
   *
   * @param {Buffer} data The data included in the ping frame
   * @private
   */
  function receiverOnPing(data) {
    const websocket = this[kWebSocket];

    websocket.pong(data, !websocket._isServer, constants.NOOP);
    websocket.emit('ping', data);
  }

  /**
   * The listener of the `Receiver` `'pong'` event.
   *
   * @param {Buffer} data The data included in the pong frame
   * @private
   */
  function receiverOnPong(data) {
    this[kWebSocket].emit('pong', data);
  }

  /**
   * The listener of the `net.Socket` `'close'` event.
   *
   * @private
   */
  function socketOnClose() {
    const websocket = this[kWebSocket];

    this.removeListener('close', socketOnClose);
    this.removeListener('end', socketOnEnd);

    websocket.readyState = WebSocket$1.CLOSING;

    //
    // The close frame might not have been received or the `'end'` event emitted,
    // for example, if the socket was destroyed due to an error. Ensure that the
    // `receiver` stream is closed after writing any remaining buffered data to
    // it. If the readable side of the socket is in flowing mode then there is no
    // buffered data as everything has been already written and `readable.read()`
    // will return `null`. If instead, the socket is paused, any possible buffered
    // data will be read as a single chunk and emitted synchronously in a single
    // `'data'` event.
    //
    websocket._socket.read();
    websocket._receiver.end();

    this.removeListener('data', socketOnData);
    this[kWebSocket] = undefined;

    clearTimeout(websocket._closeTimer);

    if (
      websocket._receiver._writableState.finished ||
      websocket._receiver._writableState.errorEmitted
    ) {
      websocket.emitClose();
    } else {
      websocket._receiver.on('error', receiverOnFinish);
      websocket._receiver.on('finish', receiverOnFinish);
    }
  }

  /**
   * The listener of the `net.Socket` `'data'` event.
   *
   * @param {Buffer} chunk A chunk of data
   * @private
   */
  function socketOnData(chunk) {
    if (!this[kWebSocket]._receiver.write(chunk)) {
      this.pause();
    }
  }

  /**
   * The listener of the `net.Socket` `'end'` event.
   *
   * @private
   */
  function socketOnEnd() {
    const websocket = this[kWebSocket];

    websocket.readyState = WebSocket$1.CLOSING;
    websocket._receiver.end();
    this.end();
  }

  /**
   * The listener of the `net.Socket` `'error'` event.
   *
   * @private
   */
  function socketOnError() {
    const websocket = this[kWebSocket];

    this.removeListener('error', socketOnError);
    this.on('error', constants.NOOP);

    if (websocket) {
      websocket.readyState = WebSocket$1.CLOSING;
      this.destroy();
    }
  }

  /**
   * Class representing a WebSocket server.
   *
   * @extends EventEmitter
   */
  class WebSocketServer extends events {
    /**
     * Create a `WebSocketServer` instance.
     *
     * @param {Object} options Configuration options
     * @param {String} options.host The hostname where to bind the server
     * @param {Number} options.port The port where to bind the server
     * @param {http.Server} options.server A pre-created HTTP/S server to use
     * @param {Function} options.verifyClient An hook to reject connections
     * @param {Function} options.handleProtocols An hook to handle protocols
     * @param {String} options.path Accept only connections matching this path
     * @param {Boolean} options.noServer Enable no server mode
     * @param {Boolean} options.clientTracking Specifies whether or not to track clients
     * @param {(Boolean|Object)} options.perMessageDeflate Enable/disable permessage-deflate
     * @param {Number} options.maxPayload The maximum allowed message size
     * @param {Function} callback A listener for the `listening` event
     */
    constructor(options, callback) {
      super();

      options = Object.assign(
        {
          maxPayload: 100 * 1024 * 1024,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          verifyClient: null,
          noServer: false,
          backlog: null, // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null
        },
        options
      );

      if (options.port == null && !options.server && !options.noServer) {
        throw new TypeError(
          'One of the "port", "server", or "noServer" options must be specified'
        );
      }

      if (options.port != null) {
        this._server = http.createServer((req, res) => {
          const body = http.STATUS_CODES[426];

          res.writeHead(426, {
            'Content-Length': body.length,
            'Content-Type': 'text/plain'
          });
          res.end(body);
        });
        this._server.listen(
          options.port,
          options.host,
          options.backlog,
          callback
        );
      } else if (options.server) {
        this._server = options.server;
      }

      if (this._server) {
        this._removeListeners = addListeners(this._server, {
          listening: this.emit.bind(this, 'listening'),
          error: this.emit.bind(this, 'error'),
          upgrade: (req, socket, head) => {
            this.handleUpgrade(req, socket, head, (ws) => {
              this.emit('connection', ws, req);
            });
          }
        });
      }

      if (options.perMessageDeflate === true) options.perMessageDeflate = {};
      if (options.clientTracking) this.clients = new Set();
      this.options = options;
    }

    /**
     * Returns the bound address, the address family name, and port of the server
     * as reported by the operating system if listening on an IP socket.
     * If the server is listening on a pipe or UNIX domain socket, the name is
     * returned as a string.
     *
     * @return {(Object|String|null)} The address of the server
     * @public
     */
    address() {
      if (this.options.noServer) {
        throw new Error('The server is operating in "noServer" mode');
      }

      if (!this._server) return null;
      return this._server.address();
    }

    /**
     * Close the server.
     *
     * @param {Function} cb Callback
     * @public
     */
    close(cb) {
      if (cb) this.once('close', cb);

      //
      // Terminate all associated clients.
      //
      if (this.clients) {
        for (const client of this.clients) client.terminate();
      }

      const server = this._server;

      if (server) {
        this._removeListeners();
        this._removeListeners = this._server = null;

        //
        // Close the http server if it was internally created.
        //
        if (this.options.port != null) {
          server.close(() => this.emit('close'));
          return;
        }
      }

      process.nextTick(emitClose, this);
    }

    /**
     * See if a given request should be handled by this server instance.
     *
     * @param {http.IncomingMessage} req Request object to inspect
     * @return {Boolean} `true` if the request is valid, else `false`
     * @public
     */
    shouldHandle(req) {
      if (this.options.path) {
        const index = req.url.indexOf('?');
        const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

        if (pathname !== this.options.path) return false;
      }

      return true;
    }

    /**
     * Handle a HTTP Upgrade request.
     *
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @public
     */
    handleUpgrade(req, socket, head, cb) {
      socket.on('error', socketOnError$1);

      const version = +req.headers['sec-websocket-version'];
      const extensions = {};

      if (
        req.method !== 'GET' ||
        req.headers.upgrade.toLowerCase() !== 'websocket' ||
        !req.headers['sec-websocket-key'] ||
        (version !== 8 && version !== 13) ||
        !this.shouldHandle(req)
      ) {
        return abortHandshake$1(socket, 400);
      }

      if (this.options.perMessageDeflate) {
        const perMessageDeflate = new permessageDeflate(
          this.options.perMessageDeflate,
          true,
          this.options.maxPayload
        );

        try {
          const offers = extension.parse(req.headers['sec-websocket-extensions']);

          if (offers[permessageDeflate.extensionName]) {
            perMessageDeflate.accept(offers[permessageDeflate.extensionName]);
            extensions[permessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          return abortHandshake$1(socket, 400);
        }
      }

      //
      // Optionally call external client verification handler.
      //
      if (this.options.verifyClient) {
        const info = {
          origin:
            req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
          secure: !!(req.connection.authorized || req.connection.encrypted),
          req
        };

        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(info, (verified, code, message, headers) => {
            if (!verified) {
              return abortHandshake$1(socket, code || 401, message, headers);
            }

            this.completeUpgrade(extensions, req, socket, head, cb);
          });
          return;
        }

        if (!this.options.verifyClient(info)) return abortHandshake$1(socket, 401);
      }

      this.completeUpgrade(extensions, req, socket, head, cb);
    }

    /**
     * Upgrade the connection to WebSocket.
     *
     * @param {Object} extensions The accepted extensions
     * @param {http.IncomingMessage} req The request object
     * @param {net.Socket} socket The network socket between the server and client
     * @param {Buffer} head The first packet of the upgraded stream
     * @param {Function} cb Callback
     * @private
     */
    completeUpgrade(extensions, req, socket, head, cb) {
      //
      // Destroy the socket if the client has already sent a FIN packet.
      //
      if (!socket.readable || !socket.writable) return socket.destroy();

      const key = crypto
        .createHash('sha1')
        .update(req.headers['sec-websocket-key'] + constants.GUID, 'binary')
        .digest('base64');

      const headers = [
        'HTTP/1.1 101 Switching Protocols',
        'Upgrade: websocket',
        'Connection: Upgrade',
        `Sec-WebSocket-Accept: ${key}`
      ];

      const ws = new websocket(null);
      var protocol = req.headers['sec-websocket-protocol'];

      if (protocol) {
        protocol = protocol.trim().split(/ *, */);

        //
        // Optionally call external protocol selection handler.
        //
        if (this.options.handleProtocols) {
          protocol = this.options.handleProtocols(protocol, req);
        } else {
          protocol = protocol[0];
        }

        if (protocol) {
          headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
          ws.protocol = protocol;
        }
      }

      if (extensions[permessageDeflate.extensionName]) {
        const params = extensions[permessageDeflate.extensionName].params;
        const value = extension.format({
          [permessageDeflate.extensionName]: [params]
        });
        headers.push(`Sec-WebSocket-Extensions: ${value}`);
        ws._extensions = extensions;
      }

      //
      // Allow external modification/inspection of handshake headers.
      //
      this.emit('headers', headers, req);

      socket.write(headers.concat('\r\n').join('\r\n'));
      socket.removeListener('error', socketOnError$1);

      ws.setSocket(socket, head, this.options.maxPayload);

      if (this.clients) {
        this.clients.add(ws);
        ws.on('close', () => this.clients.delete(ws));
      }

      cb(ws);
    }
  }

  var websocketServer = WebSocketServer;

  /**
   * Add event listeners on an `EventEmitter` using a map of <event, listener>
   * pairs.
   *
   * @param {EventEmitter} server The event emitter
   * @param {Object.<String, Function>} map The listeners to add
   * @return {Function} A function that will remove the added listeners when called
   * @private
   */
  function addListeners(server, map) {
    for (const event of Object.keys(map)) server.on(event, map[event]);

    return function removeListeners() {
      for (const event of Object.keys(map)) {
        server.removeListener(event, map[event]);
      }
    };
  }

  /**
   * Emit a `'close'` event on an `EventEmitter`.
   *
   * @param {EventEmitter} server The event emitter
   * @private
   */
  function emitClose(server) {
    server.emit('close');
  }

  /**
   * Handle premature socket errors.
   *
   * @private
   */
  function socketOnError$1() {
    this.destroy();
  }

  /**
   * Close the connection when preconditions are not fulfilled.
   *
   * @param {net.Socket} socket The socket of the upgrade request
   * @param {Number} code The HTTP response status code
   * @param {String} [message] The HTTP response body
   * @param {Object} [headers] Additional HTTP response headers
   * @private
   */
  function abortHandshake$1(socket, code, message, headers) {
    if (socket.writable) {
      message = message || http.STATUS_CODES[code];
      headers = Object.assign(
        {
          Connection: 'close',
          'Content-type': 'text/html',
          'Content-Length': Buffer.byteLength(message)
        },
        headers
      );

      socket.write(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
          Object.keys(headers)
            .map((h) => `${h}: ${headers[h]}`)
            .join('\r\n') +
          '\r\n\r\n' +
          message
      );
    }

    socket.removeListener('error', socketOnError$1);
    socket.destroy();
  }

  websocket.Server = websocketServer;
  websocket.Receiver = receiver;
  websocket.Sender = sender;

  var ws = websocket;

  /**
   * Module dependencies.
   */






  var debug$5 = src$2('engine.io-client:websocket');

  var BrowserWebSocket, NodeWebSocket;

  if (typeof WebSocket !== 'undefined') {
    BrowserWebSocket = WebSocket;
  } else if (typeof self !== 'undefined') {
    BrowserWebSocket = self.WebSocket || self.MozWebSocket;
  }

  if (typeof window === 'undefined') {
    try {
      NodeWebSocket = ws;
    } catch (e) { }
  }

  /**
   * Get either the `WebSocket` or `MozWebSocket` globals
   * in the browser or try to resolve WebSocket-compatible
   * interface exposed by `ws` for Node-like environment.
   */

  var WebSocketImpl = BrowserWebSocket || NodeWebSocket;

  /**
   * Module exports.
   */

  var websocket$1 = WS;

  /**
   * WebSocket transport constructor.
   *
   * @api {Object} connection options
   * @api public
   */

  function WS (opts) {
    var forceBase64 = (opts && opts.forceBase64);
    if (forceBase64) {
      this.supportsBinary = false;
    }
    this.perMessageDeflate = opts.perMessageDeflate;
    this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
    this.protocols = opts.protocols;
    if (!this.usingBrowserWebSocket) {
      WebSocketImpl = NodeWebSocket;
    }
    transport.call(this, opts);
  }

  /**
   * Inherits from Transport.
   */

  componentInherit(WS, transport);

  /**
   * Transport name.
   *
   * @api public
   */

  WS.prototype.name = 'websocket';

  /*
   * WebSockets support binary
   */

  WS.prototype.supportsBinary = true;

  /**
   * Opens socket.
   *
   * @api private
   */

  WS.prototype.doOpen = function () {
    if (!this.check()) {
      // let probe timeout
      return;
    }

    var uri = this.uri();
    var protocols = this.protocols;

    var opts = {};

    if (!this.isReactNative) {
      opts.agent = this.agent;
      opts.perMessageDeflate = this.perMessageDeflate;

      // SSL options for Node.js client
      opts.pfx = this.pfx;
      opts.key = this.key;
      opts.passphrase = this.passphrase;
      opts.cert = this.cert;
      opts.ca = this.ca;
      opts.ciphers = this.ciphers;
      opts.rejectUnauthorized = this.rejectUnauthorized;
    }

    if (this.extraHeaders) {
      opts.headers = this.extraHeaders;
    }
    if (this.localAddress) {
      opts.localAddress = this.localAddress;
    }

    try {
      this.ws =
        this.usingBrowserWebSocket && !this.isReactNative
          ? protocols
            ? new WebSocketImpl(uri, protocols)
            : new WebSocketImpl(uri)
          : new WebSocketImpl(uri, protocols, opts);
    } catch (err) {
      return this.emit('error', err);
    }

    if (this.ws.binaryType === undefined) {
      this.supportsBinary = false;
    }

    if (this.ws.supports && this.ws.supports.binary) {
      this.supportsBinary = true;
      this.ws.binaryType = 'nodebuffer';
    } else {
      this.ws.binaryType = 'arraybuffer';
    }

    this.addEventListeners();
  };

  /**
   * Adds event listeners to the socket
   *
   * @api private
   */

  WS.prototype.addEventListeners = function () {
    var self = this;

    this.ws.onopen = function () {
      self.onOpen();
    };
    this.ws.onclose = function () {
      self.onClose();
    };
    this.ws.onmessage = function (ev) {
      self.onData(ev.data);
    };
    this.ws.onerror = function (e) {
      self.onError('websocket error', e);
    };
  };

  /**
   * Writes data to socket.
   *
   * @param {Array} array of packets.
   * @api private
   */

  WS.prototype.write = function (packets) {
    var self = this;
    this.writable = false;

    // encodePacket efficient as it uses WS framing
    // no need for encodePayload
    var total = packets.length;
    for (var i = 0, l = total; i < l; i++) {
      (function (packet) {
        lib.encodePacket(packet, self.supportsBinary, function (data) {
          if (!self.usingBrowserWebSocket) {
            // always create a new object (GH-437)
            var opts = {};
            if (packet.options) {
              opts.compress = packet.options.compress;
            }

            if (self.perMessageDeflate) {
              var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
              if (len < self.perMessageDeflate.threshold) {
                opts.compress = false;
              }
            }
          }

          // Sometimes the websocket has already been closed but the browser didn't
          // have a chance of informing us about it yet, in that case send will
          // throw an error
          try {
            if (self.usingBrowserWebSocket) {
              // TypeError is thrown when passing the second argument on Safari
              self.ws.send(data);
            } else {
              self.ws.send(data, opts);
            }
          } catch (e) {
            debug$5('websocket closed before onclose event');
          }

          --total || done();
        });
      })(packets[i]);
    }

    function done () {
      self.emit('flush');

      // fake drain
      // defer to next tick to allow Socket to clear writeBuffer
      setTimeout(function () {
        self.writable = true;
        self.emit('drain');
      }, 0);
    }
  };

  /**
   * Called upon close
   *
   * @api private
   */

  WS.prototype.onClose = function () {
    transport.prototype.onClose.call(this);
  };

  /**
   * Closes socket.
   *
   * @api private
   */

  WS.prototype.doClose = function () {
    if (typeof this.ws !== 'undefined') {
      this.ws.close();
    }
  };

  /**
   * Generates uri for connection.
   *
   * @api private
   */

  WS.prototype.uri = function () {
    var query = this.query || {};
    var schema = this.secure ? 'wss' : 'ws';
    var port = '';

    // avoid port if default for schema
    if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
      ('ws' === schema && Number(this.port) !== 80))) {
      port = ':' + this.port;
    }

    // append timestamp to URI
    if (this.timestampRequests) {
      query[this.timestampParam] = yeast_1();
    }

    // communicate binary support capabilities
    if (!this.supportsBinary) {
      query.b64 = 1;
    }

    query = parseqs.encode(query);

    // prepend ? to query
    if (query.length) {
      query = '?' + query;
    }

    var ipv6 = this.hostname.indexOf(':') !== -1;
    return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
  };

  /**
   * Feature detection for WebSocket.
   *
   * @return {Boolean} whether this transport is available.
   * @api public
   */

  WS.prototype.check = function () {
    return !!WebSocketImpl && !('__initialize' in WebSocketImpl && this.name === WS.prototype.name);
  };

  /**
   * Module dependencies
   */






  /**
   * Export transports.
   */

  var polling_1 = polling$1;
  var websocket_1 = websocket$1;

  /**
   * Polling transport polymorphic constructor.
   * Decides on xhr vs jsonp based on feature detection.
   *
   * @api private
   */

  function polling$1 (opts) {
    var xhr;
    var xd = false;
    var xs = false;
    var jsonp = false !== opts.jsonp;

    if (typeof location !== 'undefined') {
      var isSSL = 'https:' === location.protocol;
      var port = location.port;

      // some user agents have empty `location.port`
      if (!port) {
        port = isSSL ? 443 : 80;
      }

      xd = opts.hostname !== location.hostname || port !== opts.port;
      xs = opts.secure !== isSSL;
    }

    opts.xdomain = xd;
    opts.xscheme = xs;
    xhr = new XMLHttpRequest_1(opts);

    if ('open' in xhr && !opts.forceJSONP) {
      return new pollingXhr(opts);
    } else {
      if (!jsonp) throw new Error('JSONP disabled');
      return new pollingJsonp(opts);
    }
  }

  var transports = {
  	polling: polling_1,
  	websocket: websocket_1
  };

  var indexOf = [].indexOf;

  var indexof = function(arr, obj){
    if (indexOf) return arr.indexOf(obj);
    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }
    return -1;
  };

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api private
   */

  var re$1 = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts$1 = [
      'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
  ];

  var parseuri$1 = function parseuri(str) {
      var src = str,
          b = str.indexOf('['),
          e = str.indexOf(']');

      if (b != -1 && e != -1) {
          str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
      }

      var m = re$1.exec(str || ''),
          uri = {},
          i = 14;

      while (i--) {
          uri[parts$1[i]] = m[i] || '';
      }

      if (b != -1 && e != -1) {
          uri.source = src;
          uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
          uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
          uri.ipv6uri = true;
      }

      uri.pathNames = pathNames(uri, uri['path']);
      uri.queryKey = queryKey(uri, uri['query']);

      return uri;
  };

  function pathNames(obj, path) {
      var regx = /\/{2,9}/g,
          names = path.replace(regx, "/").split("/");

      if (path.substr(0, 1) == '/' || path.length === 0) {
          names.splice(0, 1);
      }
      if (path.substr(path.length - 1, 1) == '/') {
          names.splice(names.length - 1, 1);
      }

      return names;
  }

  function queryKey(uri, query) {
      var data = {};

      query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
          if ($1) {
              data[$1] = $2;
          }
      });

      return data;
  }

  /**
   * Module dependencies.
   */



  var debug$6 = src$2('engine.io-client:socket');





  /**
   * Module exports.
   */

  var socket = Socket;

  /**
   * Socket constructor.
   *
   * @param {String|Object} uri or options
   * @param {Object} options
   * @api public
   */

  function Socket (uri, opts) {
    if (!(this instanceof Socket)) return new Socket(uri, opts);

    opts = opts || {};

    if (uri && 'object' === typeof uri) {
      opts = uri;
      uri = null;
    }

    if (uri) {
      uri = parseuri$1(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
      opts.port = uri.port;
      if (uri.query) opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parseuri$1(opts.host).host;
    }

    this.secure = null != opts.secure ? opts.secure
      : (typeof location !== 'undefined' && 'https:' === location.protocol);

    if (opts.hostname && !opts.port) {
      // if no port is specified manually, use the protocol default
      opts.port = this.secure ? '443' : '80';
    }

    this.agent = opts.agent || false;
    this.hostname = opts.hostname ||
      (typeof location !== 'undefined' ? location.hostname : 'localhost');
    this.port = opts.port || (typeof location !== 'undefined' && location.port
        ? location.port
        : (this.secure ? 443 : 80));
    this.query = opts.query || {};
    if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
    this.upgrade = false !== opts.upgrade;
    this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
    this.forceJSONP = !!opts.forceJSONP;
    this.jsonp = false !== opts.jsonp;
    this.forceBase64 = !!opts.forceBase64;
    this.enablesXDR = !!opts.enablesXDR;
    this.withCredentials = false !== opts.withCredentials;
    this.timestampParam = opts.timestampParam || 't';
    this.timestampRequests = opts.timestampRequests;
    this.transports = opts.transports || ['polling', 'websocket'];
    this.transportOptions = opts.transportOptions || {};
    this.readyState = '';
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.policyPort = opts.policyPort || 843;
    this.rememberUpgrade = opts.rememberUpgrade || false;
    this.binaryType = null;
    this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
    this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

    if (true === this.perMessageDeflate) this.perMessageDeflate = {};
    if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
      this.perMessageDeflate.threshold = 1024;
    }

    // SSL options for Node.js client
    this.pfx = opts.pfx || null;
    this.key = opts.key || null;
    this.passphrase = opts.passphrase || null;
    this.cert = opts.cert || null;
    this.ca = opts.ca || null;
    this.ciphers = opts.ciphers || null;
    this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
    this.forceNode = !!opts.forceNode;

    // detect ReactNative environment
    this.isReactNative = (typeof navigator !== 'undefined' && typeof navigator.product === 'string' && navigator.product.toLowerCase() === 'reactnative');

    // other options for Node.js or ReactNative client
    if (typeof self === 'undefined' || this.isReactNative) {
      if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
        this.extraHeaders = opts.extraHeaders;
      }

      if (opts.localAddress) {
        this.localAddress = opts.localAddress;
      }
    }

    // set on handshake
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;

    // set on heartbeat
    this.pingIntervalTimer = null;
    this.pingTimeoutTimer = null;

    this.open();
  }

  Socket.priorWebsocketSuccess = false;

  /**
   * Mix in `Emitter`.
   */

  componentEmitter(Socket.prototype);

  /**
   * Protocol version.
   *
   * @api public
   */

  Socket.protocol = lib.protocol; // this is an int

  /**
   * Expose deps for legacy compatibility
   * and standalone browser access.
   */

  Socket.Socket = Socket;
  Socket.Transport = transport;
  Socket.transports = transports;
  Socket.parser = lib;

  /**
   * Creates transport of the given type.
   *
   * @param {String} transport name
   * @return {Transport}
   * @api private
   */

  Socket.prototype.createTransport = function (name) {
    debug$6('creating transport "%s"', name);
    var query = clone(this.query);

    // append engine.io protocol identifier
    query.EIO = lib.protocol;

    // transport name
    query.transport = name;

    // per-transport options
    var options = this.transportOptions[name] || {};

    // session id if we already have one
    if (this.id) query.sid = this.id;

    var transport = new transports[name]({
      query: query,
      socket: this,
      agent: options.agent || this.agent,
      hostname: options.hostname || this.hostname,
      port: options.port || this.port,
      secure: options.secure || this.secure,
      path: options.path || this.path,
      forceJSONP: options.forceJSONP || this.forceJSONP,
      jsonp: options.jsonp || this.jsonp,
      forceBase64: options.forceBase64 || this.forceBase64,
      enablesXDR: options.enablesXDR || this.enablesXDR,
      withCredentials: options.withCredentials || this.withCredentials,
      timestampRequests: options.timestampRequests || this.timestampRequests,
      timestampParam: options.timestampParam || this.timestampParam,
      policyPort: options.policyPort || this.policyPort,
      pfx: options.pfx || this.pfx,
      key: options.key || this.key,
      passphrase: options.passphrase || this.passphrase,
      cert: options.cert || this.cert,
      ca: options.ca || this.ca,
      ciphers: options.ciphers || this.ciphers,
      rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
      perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
      extraHeaders: options.extraHeaders || this.extraHeaders,
      forceNode: options.forceNode || this.forceNode,
      localAddress: options.localAddress || this.localAddress,
      requestTimeout: options.requestTimeout || this.requestTimeout,
      protocols: options.protocols || void (0),
      isReactNative: this.isReactNative
    });

    return transport;
  };

  function clone (obj) {
    var o = {};
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = obj[i];
      }
    }
    return o;
  }

  /**
   * Initializes transport to use and starts probe.
   *
   * @api private
   */
  Socket.prototype.open = function () {
    var transport;
    if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
      transport = 'websocket';
    } else if (0 === this.transports.length) {
      // Emit error on next tick so it can be listened to
      var self = this;
      setTimeout(function () {
        self.emit('error', 'No transports available');
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = 'opening';

    // Retry with the next transport if the transport is disabled (jsonp: false)
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }

    transport.open();
    this.setTransport(transport);
  };

  /**
   * Sets the current transport. Disables the existing one (if any).
   *
   * @api private
   */

  Socket.prototype.setTransport = function (transport) {
    debug$6('setting transport %s', transport.name);
    var self = this;

    if (this.transport) {
      debug$6('clearing existing transport %s', this.transport.name);
      this.transport.removeAllListeners();
    }

    // set up transport
    this.transport = transport;

    // set up transport listeners
    transport
    .on('drain', function () {
      self.onDrain();
    })
    .on('packet', function (packet) {
      self.onPacket(packet);
    })
    .on('error', function (e) {
      self.onError(e);
    })
    .on('close', function () {
      self.onClose('transport close');
    });
  };

  /**
   * Probes a transport.
   *
   * @param {String} transport name
   * @api private
   */

  Socket.prototype.probe = function (name) {
    debug$6('probing transport "%s"', name);
    var transport = this.createTransport(name, { probe: 1 });
    var failed = false;
    var self = this;

    Socket.priorWebsocketSuccess = false;

    function onTransportOpen () {
      if (self.onlyBinaryUpgrades) {
        var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
        failed = failed || upgradeLosesBinary;
      }
      if (failed) return;

      debug$6('probe transport "%s" opened', name);
      transport.send([{ type: 'ping', data: 'probe' }]);
      transport.once('packet', function (msg) {
        if (failed) return;
        if ('pong' === msg.type && 'probe' === msg.data) {
          debug$6('probe transport "%s" pong', name);
          self.upgrading = true;
          self.emit('upgrading', transport);
          if (!transport) return;
          Socket.priorWebsocketSuccess = 'websocket' === transport.name;

          debug$6('pausing current transport "%s"', self.transport.name);
          self.transport.pause(function () {
            if (failed) return;
            if ('closed' === self.readyState) return;
            debug$6('changing transport and sending upgrade packet');

            cleanup();

            self.setTransport(transport);
            transport.send([{ type: 'upgrade' }]);
            self.emit('upgrade', transport);
            transport = null;
            self.upgrading = false;
            self.flush();
          });
        } else {
          debug$6('probe transport "%s" failed', name);
          var err = new Error('probe error');
          err.transport = transport.name;
          self.emit('upgradeError', err);
        }
      });
    }

    function freezeTransport () {
      if (failed) return;

      // Any callback called by transport should be ignored since now
      failed = true;

      cleanup();

      transport.close();
      transport = null;
    }

    // Handle any error that happens while probing
    function onerror (err) {
      var error = new Error('probe error: ' + err);
      error.transport = transport.name;

      freezeTransport();

      debug$6('probe transport "%s" failed because of error: %s', name, err);

      self.emit('upgradeError', error);
    }

    function onTransportClose () {
      onerror('transport closed');
    }

    // When the socket is closed while we're probing
    function onclose () {
      onerror('socket closed');
    }

    // When the socket is upgraded while we're probing
    function onupgrade (to) {
      if (transport && to.name !== transport.name) {
        debug$6('"%s" works - aborting "%s"', to.name, transport.name);
        freezeTransport();
      }
    }

    // Remove all listeners on the transport and on self
    function cleanup () {
      transport.removeListener('open', onTransportOpen);
      transport.removeListener('error', onerror);
      transport.removeListener('close', onTransportClose);
      self.removeListener('close', onclose);
      self.removeListener('upgrading', onupgrade);
    }

    transport.once('open', onTransportOpen);
    transport.once('error', onerror);
    transport.once('close', onTransportClose);

    this.once('close', onclose);
    this.once('upgrading', onupgrade);

    transport.open();
  };

  /**
   * Called when connection is deemed open.
   *
   * @api public
   */

  Socket.prototype.onOpen = function () {
    debug$6('socket open');
    this.readyState = 'open';
    Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
    this.emit('open');
    this.flush();

    // we check for `readyState` in case an `open`
    // listener already closed the socket
    if ('open' === this.readyState && this.upgrade && this.transport.pause) {
      debug$6('starting upgrade probes');
      for (var i = 0, l = this.upgrades.length; i < l; i++) {
        this.probe(this.upgrades[i]);
      }
    }
  };

  /**
   * Handles a packet.
   *
   * @api private
   */

  Socket.prototype.onPacket = function (packet) {
    if ('opening' === this.readyState || 'open' === this.readyState ||
        'closing' === this.readyState) {
      debug$6('socket receive: type "%s", data "%s"', packet.type, packet.data);

      this.emit('packet', packet);

      // Socket is live - any packet counts
      this.emit('heartbeat');

      switch (packet.type) {
        case 'open':
          this.onHandshake(JSON.parse(packet.data));
          break;

        case 'pong':
          this.setPing();
          this.emit('pong');
          break;

        case 'error':
          var err = new Error('server error');
          err.code = packet.data;
          this.onError(err);
          break;

        case 'message':
          this.emit('data', packet.data);
          this.emit('message', packet.data);
          break;
      }
    } else {
      debug$6('packet received with socket readyState "%s"', this.readyState);
    }
  };

  /**
   * Called upon handshake completion.
   *
   * @param {Object} handshake obj
   * @api private
   */

  Socket.prototype.onHandshake = function (data) {
    this.emit('handshake', data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.onOpen();
    // In case open handler closes socket
    if ('closed' === this.readyState) return;
    this.setPing();

    // Prolong liveness of socket on heartbeat
    this.removeListener('heartbeat', this.onHeartbeat);
    this.on('heartbeat', this.onHeartbeat);
  };

  /**
   * Resets ping timeout.
   *
   * @api private
   */

  Socket.prototype.onHeartbeat = function (timeout) {
    clearTimeout(this.pingTimeoutTimer);
    var self = this;
    self.pingTimeoutTimer = setTimeout(function () {
      if ('closed' === self.readyState) return;
      self.onClose('ping timeout');
    }, timeout || (self.pingInterval + self.pingTimeout));
  };

  /**
   * Pings server every `this.pingInterval` and expects response
   * within `this.pingTimeout` or closes connection.
   *
   * @api private
   */

  Socket.prototype.setPing = function () {
    var self = this;
    clearTimeout(self.pingIntervalTimer);
    self.pingIntervalTimer = setTimeout(function () {
      debug$6('writing ping packet - expecting pong within %sms', self.pingTimeout);
      self.ping();
      self.onHeartbeat(self.pingTimeout);
    }, self.pingInterval);
  };

  /**
  * Sends a ping packet.
  *
  * @api private
  */

  Socket.prototype.ping = function () {
    var self = this;
    this.sendPacket('ping', function () {
      self.emit('ping');
    });
  };

  /**
   * Called on `drain` event
   *
   * @api private
   */

  Socket.prototype.onDrain = function () {
    this.writeBuffer.splice(0, this.prevBufferLen);

    // setting prevBufferLen = 0 is very important
    // for example, when upgrading, upgrade packet is sent over,
    // and a nonzero prevBufferLen could cause problems on `drain`
    this.prevBufferLen = 0;

    if (0 === this.writeBuffer.length) {
      this.emit('drain');
    } else {
      this.flush();
    }
  };

  /**
   * Flush write buffers.
   *
   * @api private
   */

  Socket.prototype.flush = function () {
    if ('closed' !== this.readyState && this.transport.writable &&
      !this.upgrading && this.writeBuffer.length) {
      debug$6('flushing %d packets in socket', this.writeBuffer.length);
      this.transport.send(this.writeBuffer);
      // keep track of current length of writeBuffer
      // splice writeBuffer and callbackBuffer on `drain`
      this.prevBufferLen = this.writeBuffer.length;
      this.emit('flush');
    }
  };

  /**
   * Sends a message.
   *
   * @param {String} message.
   * @param {Function} callback function.
   * @param {Object} options.
   * @return {Socket} for chaining.
   * @api public
   */

  Socket.prototype.write =
  Socket.prototype.send = function (msg, options, fn) {
    this.sendPacket('message', msg, options, fn);
    return this;
  };

  /**
   * Sends a packet.
   *
   * @param {String} packet type.
   * @param {String} data.
   * @param {Object} options.
   * @param {Function} callback function.
   * @api private
   */

  Socket.prototype.sendPacket = function (type, data, options, fn) {
    if ('function' === typeof data) {
      fn = data;
      data = undefined;
    }

    if ('function' === typeof options) {
      fn = options;
      options = null;
    }

    if ('closing' === this.readyState || 'closed' === this.readyState) {
      return;
    }

    options = options || {};
    options.compress = false !== options.compress;

    var packet = {
      type: type,
      data: data,
      options: options
    };
    this.emit('packetCreate', packet);
    this.writeBuffer.push(packet);
    if (fn) this.once('flush', fn);
    this.flush();
  };

  /**
   * Closes the connection.
   *
   * @api private
   */

  Socket.prototype.close = function () {
    if ('opening' === this.readyState || 'open' === this.readyState) {
      this.readyState = 'closing';

      var self = this;

      if (this.writeBuffer.length) {
        this.once('drain', function () {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }

    function close () {
      self.onClose('forced close');
      debug$6('socket closing - telling transport to close');
      self.transport.close();
    }

    function cleanupAndClose () {
      self.removeListener('upgrade', cleanupAndClose);
      self.removeListener('upgradeError', cleanupAndClose);
      close();
    }

    function waitForUpgrade () {
      // wait for upgrade to finish since we can't send packets while pausing a transport
      self.once('upgrade', cleanupAndClose);
      self.once('upgradeError', cleanupAndClose);
    }

    return this;
  };

  /**
   * Called upon transport error
   *
   * @api private
   */

  Socket.prototype.onError = function (err) {
    debug$6('socket error %j', err);
    Socket.priorWebsocketSuccess = false;
    this.emit('error', err);
    this.onClose('transport error', err);
  };

  /**
   * Called upon transport close.
   *
   * @api private
   */

  Socket.prototype.onClose = function (reason, desc) {
    if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
      debug$6('socket close with reason: "%s"', reason);
      var self = this;

      // clear timers
      clearTimeout(this.pingIntervalTimer);
      clearTimeout(this.pingTimeoutTimer);

      // stop event from firing again for transport
      this.transport.removeAllListeners('close');

      // ensure transport won't stay open
      this.transport.close();

      // ignore further transport communication
      this.transport.removeAllListeners();

      // set ready state
      this.readyState = 'closed';

      // clear session id
      this.id = null;

      // emit close event
      this.emit('close', reason, desc);

      // clean buffers after, so users can still
      // grab the buffers on `close` event
      self.writeBuffer = [];
      self.prevBufferLen = 0;
    }
  };

  /**
   * Filters upgrades, returning only those matching client transports.
   *
   * @param {Array} server upgrades
   * @api private
   *
   */

  Socket.prototype.filterUpgrades = function (upgrades) {
    var filteredUpgrades = [];
    for (var i = 0, j = upgrades.length; i < j; i++) {
      if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
    }
    return filteredUpgrades;
  };

  var lib$1 = socket;

  /**
   * Exports parser
   *
   * @api public
   *
   */
  var parser = lib;
  lib$1.parser = parser;

  var componentEmitter$1 = createCommonjsModule(function (module) {
  /**
   * Expose `Emitter`.
   */

  {
    module.exports = Emitter;
  }

  /**
   * Initialize a new `Emitter`.
   *
   * @api public
   */

  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  /**
   * Mixin the emitter properties.
   *
   * @param {Object} obj
   * @return {Object}
   * @api private
   */

  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.on =
  Emitter.prototype.addEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};
    (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
      .push(fn);
    return this;
  };

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.once = function(event, fn){
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
  };

  /**
   * Remove the given callback for `event` or all
   * registered callbacks.
   *
   * @param {String} event
   * @param {Function} fn
   * @return {Emitter}
   * @api public
   */

  Emitter.prototype.off =
  Emitter.prototype.removeListener =
  Emitter.prototype.removeAllListeners =
  Emitter.prototype.removeEventListener = function(event, fn){
    this._callbacks = this._callbacks || {};

    // all
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }

    // specific event
    var callbacks = this._callbacks['$' + event];
    if (!callbacks) return this;

    // remove all handlers
    if (1 == arguments.length) {
      delete this._callbacks['$' + event];
      return this;
    }

    // remove specific handler
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  };

  /**
   * Emit `event` with the given args.
   *
   * @param {String} event
   * @param {Mixed} ...
   * @return {Emitter}
   */

  Emitter.prototype.emit = function(event){
    this._callbacks = this._callbacks || {};
    var args = [].slice.call(arguments, 1)
      , callbacks = this._callbacks['$' + event];

    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }

    return this;
  };

  /**
   * Return array of callbacks for `event`.
   *
   * @param {String} event
   * @return {Array}
   * @api public
   */

  Emitter.prototype.listeners = function(event){
    this._callbacks = this._callbacks || {};
    return this._callbacks['$' + event] || [];
  };

  /**
   * Check if this emitter has `event` handlers.
   *
   * @param {String} event
   * @return {Boolean}
   * @api public
   */

  Emitter.prototype.hasListeners = function(event){
    return !! this.listeners(event).length;
  };
  });

  var toArray_1 = toArray;

  function toArray(list, index) {
      var array = [];

      index = index || 0;

      for (var i = index || 0; i < list.length; i++) {
          array[i - index] = list[i];
      }

      return array
  }

  /**
   * Module exports.
   */

  var on_1 = on;

  /**
   * Helper for subscriptions.
   *
   * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
   * @param {String} event name
   * @param {Function} callback
   * @api public
   */

  function on (obj, ev, fn) {
    obj.on(ev, fn);
    return {
      destroy: function () {
        obj.removeListener(ev, fn);
      }
    };
  }

  /**
   * Slice reference.
   */

  var slice = [].slice;

  /**
   * Bind `obj` to `fn`.
   *
   * @param {Object} obj
   * @param {Function|String} fn or string
   * @return {Function}
   * @api public
   */

  var componentBind = function(obj, fn){
    if ('string' == typeof fn) fn = obj[fn];
    if ('function' != typeof fn) throw new Error('bind() requires a function');
    var args = slice.call(arguments, 2);
    return function(){
      return fn.apply(obj, args.concat(slice.call(arguments)));
    }
  };

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */

  var encode$2 = function (obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  };

  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */

  var decode$2 = function(qs){
    var qry = {};
    var pairs = qs.split('&');
    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  };

  var parseqs$1 = {
  	encode: encode$2,
  	decode: decode$2
  };

  var socket$1 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */






  var debug = src('socket.io-client:socket');



  /**
   * Module exports.
   */

  module.exports = exports = Socket;

  /**
   * Internal events (blacklisted).
   * These events can't be emitted by the user.
   *
   * @api private
   */

  var events = {
    connect: 1,
    connect_error: 1,
    connect_timeout: 1,
    connecting: 1,
    disconnect: 1,
    error: 1,
    reconnect: 1,
    reconnect_attempt: 1,
    reconnect_failed: 1,
    reconnect_error: 1,
    reconnecting: 1,
    ping: 1,
    pong: 1
  };

  /**
   * Shortcut to `Emitter#emit`.
   */

  var emit = componentEmitter$1.prototype.emit;

  /**
   * `Socket` constructor.
   *
   * @api public
   */

  function Socket (io, nsp, opts) {
    this.io = io;
    this.nsp = nsp;
    this.json = this; // compat
    this.ids = 0;
    this.acks = {};
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.connected = false;
    this.disconnected = true;
    this.flags = {};
    if (opts && opts.query) {
      this.query = opts.query;
    }
    if (this.io.autoConnect) this.open();
  }

  /**
   * Mix in `Emitter`.
   */

  componentEmitter$1(Socket.prototype);

  /**
   * Subscribe to open, close and packet events
   *
   * @api private
   */

  Socket.prototype.subEvents = function () {
    if (this.subs) return;

    var io = this.io;
    this.subs = [
      on_1(io, 'open', componentBind(this, 'onopen')),
      on_1(io, 'packet', componentBind(this, 'onpacket')),
      on_1(io, 'close', componentBind(this, 'onclose'))
    ];
  };

  /**
   * "Opens" the socket.
   *
   * @api public
   */

  Socket.prototype.open =
  Socket.prototype.connect = function () {
    if (this.connected) return this;

    this.subEvents();
    this.io.open(); // ensure open
    if ('open' === this.io.readyState) this.onopen();
    this.emit('connecting');
    return this;
  };

  /**
   * Sends a `message` event.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.send = function () {
    var args = toArray_1(arguments);
    args.unshift('message');
    this.emit.apply(this, args);
    return this;
  };

  /**
   * Override `emit`.
   * If the event is in `events`, it's emitted normally.
   *
   * @param {String} event name
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.emit = function (ev) {
    if (events.hasOwnProperty(ev)) {
      emit.apply(this, arguments);
      return this;
    }

    var args = toArray_1(arguments);
    var packet = {
      type: (this.flags.binary !== undefined ? this.flags.binary : hasBinary2(args)) ? socket_ioParser.BINARY_EVENT : socket_ioParser.EVENT,
      data: args
    };

    packet.options = {};
    packet.options.compress = !this.flags || false !== this.flags.compress;

    // event ack callback
    if ('function' === typeof args[args.length - 1]) {
      debug('emitting packet with ack id %d', this.ids);
      this.acks[this.ids] = args.pop();
      packet.id = this.ids++;
    }

    if (this.connected) {
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }

    this.flags = {};

    return this;
  };

  /**
   * Sends a packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.packet = function (packet) {
    packet.nsp = this.nsp;
    this.io.packet(packet);
  };

  /**
   * Called upon engine `open`.
   *
   * @api private
   */

  Socket.prototype.onopen = function () {
    debug('transport is open - connecting');

    // write connect packet if necessary
    if ('/' !== this.nsp) {
      if (this.query) {
        var query = typeof this.query === 'object' ? parseqs$1.encode(this.query) : this.query;
        debug('sending connect packet with query %s', query);
        this.packet({type: socket_ioParser.CONNECT, query: query});
      } else {
        this.packet({type: socket_ioParser.CONNECT});
      }
    }
  };

  /**
   * Called upon engine `close`.
   *
   * @param {String} reason
   * @api private
   */

  Socket.prototype.onclose = function (reason) {
    debug('close (%s)', reason);
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emit('disconnect', reason);
  };

  /**
   * Called with socket packet.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onpacket = function (packet) {
    var sameNamespace = packet.nsp === this.nsp;
    var rootNamespaceError = packet.type === socket_ioParser.ERROR && packet.nsp === '/';

    if (!sameNamespace && !rootNamespaceError) return;

    switch (packet.type) {
      case socket_ioParser.CONNECT:
        this.onconnect();
        break;

      case socket_ioParser.EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.BINARY_EVENT:
        this.onevent(packet);
        break;

      case socket_ioParser.ACK:
        this.onack(packet);
        break;

      case socket_ioParser.BINARY_ACK:
        this.onack(packet);
        break;

      case socket_ioParser.DISCONNECT:
        this.ondisconnect();
        break;

      case socket_ioParser.ERROR:
        this.emit('error', packet.data);
        break;
    }
  };

  /**
   * Called upon a server event.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onevent = function (packet) {
    var args = packet.data || [];
    debug('emitting event %j', args);

    if (null != packet.id) {
      debug('attaching ack callback to event');
      args.push(this.ack(packet.id));
    }

    if (this.connected) {
      emit.apply(this, args);
    } else {
      this.receiveBuffer.push(args);
    }
  };

  /**
   * Produces an ack callback to emit with an event.
   *
   * @api private
   */

  Socket.prototype.ack = function (id) {
    var self = this;
    var sent = false;
    return function () {
      // prevent double callbacks
      if (sent) return;
      sent = true;
      var args = toArray_1(arguments);
      debug('sending ack %j', args);

      self.packet({
        type: hasBinary2(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK,
        id: id,
        data: args
      });
    };
  };

  /**
   * Called upon a server acknowlegement.
   *
   * @param {Object} packet
   * @api private
   */

  Socket.prototype.onack = function (packet) {
    var ack = this.acks[packet.id];
    if ('function' === typeof ack) {
      debug('calling ack %s with %j', packet.id, packet.data);
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
      debug('bad ack %s', packet.id);
    }
  };

  /**
   * Called upon server connect.
   *
   * @api private
   */

  Socket.prototype.onconnect = function () {
    this.connected = true;
    this.disconnected = false;
    this.emit('connect');
    this.emitBuffered();
  };

  /**
   * Emit buffered events (received and emitted).
   *
   * @api private
   */

  Socket.prototype.emitBuffered = function () {
    var i;
    for (i = 0; i < this.receiveBuffer.length; i++) {
      emit.apply(this, this.receiveBuffer[i]);
    }
    this.receiveBuffer = [];

    for (i = 0; i < this.sendBuffer.length; i++) {
      this.packet(this.sendBuffer[i]);
    }
    this.sendBuffer = [];
  };

  /**
   * Called upon server disconnect.
   *
   * @api private
   */

  Socket.prototype.ondisconnect = function () {
    debug('server disconnect (%s)', this.nsp);
    this.destroy();
    this.onclose('io server disconnect');
  };

  /**
   * Called upon forced client/server side disconnections,
   * this method ensures the manager stops tracking us and
   * that reconnections don't get triggered for this.
   *
   * @api private.
   */

  Socket.prototype.destroy = function () {
    if (this.subs) {
      // clean subscriptions to avoid reconnections
      for (var i = 0; i < this.subs.length; i++) {
        this.subs[i].destroy();
      }
      this.subs = null;
    }

    this.io.destroy(this);
  };

  /**
   * Disconnects the socket manually.
   *
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.close =
  Socket.prototype.disconnect = function () {
    if (this.connected) {
      debug('performing disconnect (%s)', this.nsp);
      this.packet({ type: socket_ioParser.DISCONNECT });
    }

    // remove socket from pool
    this.destroy();

    if (this.connected) {
      // fire events
      this.onclose('io client disconnect');
    }
    return this;
  };

  /**
   * Sets the compress flag.
   *
   * @param {Boolean} if `true`, compresses the sending data
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.compress = function (compress) {
    this.flags.compress = compress;
    return this;
  };

  /**
   * Sets the binary flag
   *
   * @param {Boolean} whether the emitted data contains binary
   * @return {Socket} self
   * @api public
   */

  Socket.prototype.binary = function (binary) {
    this.flags.binary = binary;
    return this;
  };
  });

  /**
   * Expose `Backoff`.
   */

  var backo2 = Backoff;

  /**
   * Initialize backoff timer with `opts`.
   *
   * - `min` initial timeout in milliseconds [100]
   * - `max` max timeout [10000]
   * - `jitter` [0]
   * - `factor` [2]
   *
   * @param {Object} opts
   * @api public
   */

  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 10000;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }

  /**
   * Return the backoff duration.
   *
   * @return {Number}
   * @api public
   */

  Backoff.prototype.duration = function(){
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand =  Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };

  /**
   * Reset the number of attempts.
   *
   * @api public
   */

  Backoff.prototype.reset = function(){
    this.attempts = 0;
  };

  /**
   * Set the minimum duration
   *
   * @api public
   */

  Backoff.prototype.setMin = function(min){
    this.ms = min;
  };

  /**
   * Set the maximum duration
   *
   * @api public
   */

  Backoff.prototype.setMax = function(max){
    this.max = max;
  };

  /**
   * Set the jitter
   *
   * @api public
   */

  Backoff.prototype.setJitter = function(jitter){
    this.jitter = jitter;
  };

  /**
   * Module dependencies.
   */







  var debug$7 = src('socket.io-client:manager');



  /**
   * IE6+ hasOwnProperty
   */

  var has = Object.prototype.hasOwnProperty;

  /**
   * Module exports
   */

  var manager = Manager;

  /**
   * `Manager` constructor.
   *
   * @param {String} engine instance or engine uri/opts
   * @param {Object} options
   * @api public
   */

  function Manager (uri, opts) {
    if (!(this instanceof Manager)) return new Manager(uri, opts);
    if (uri && ('object' === typeof uri)) {
      opts = uri;
      uri = undefined;
    }
    opts = opts || {};

    opts.path = opts.path || '/socket.io';
    this.nsps = {};
    this.subs = [];
    this.opts = opts;
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1000);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
    this.randomizationFactor(opts.randomizationFactor || 0.5);
    this.backoff = new backo2({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 20000 : opts.timeout);
    this.readyState = 'closed';
    this.uri = uri;
    this.connecting = [];
    this.lastPing = null;
    this.encoding = false;
    this.packetBuffer = [];
    var _parser = opts.parser || socket_ioParser;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this.autoConnect = opts.autoConnect !== false;
    if (this.autoConnect) this.open();
  }

  /**
   * Propagate given event to sockets and emit on `this`
   *
   * @api private
   */

  Manager.prototype.emitAll = function () {
    this.emit.apply(this, arguments);
    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
      }
    }
  };

  /**
   * Update `socket.id` of all sockets
   *
   * @api private
   */

  Manager.prototype.updateSocketIds = function () {
    for (var nsp in this.nsps) {
      if (has.call(this.nsps, nsp)) {
        this.nsps[nsp].id = this.generateId(nsp);
      }
    }
  };

  /**
   * generate `socket.id` for the given `nsp`
   *
   * @param {String} nsp
   * @return {String}
   * @api private
   */

  Manager.prototype.generateId = function (nsp) {
    return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
  };

  /**
   * Mix in `Emitter`.
   */

  componentEmitter$1(Manager.prototype);

  /**
   * Sets the `reconnection` config.
   *
   * @param {Boolean} true/false if it should automatically reconnect
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnection = function (v) {
    if (!arguments.length) return this._reconnection;
    this._reconnection = !!v;
    return this;
  };

  /**
   * Sets the reconnection attempts config.
   *
   * @param {Number} max reconnection attempts before giving up
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionAttempts = function (v) {
    if (!arguments.length) return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  };

  /**
   * Sets the delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionDelay = function (v) {
    if (!arguments.length) return this._reconnectionDelay;
    this._reconnectionDelay = v;
    this.backoff && this.backoff.setMin(v);
    return this;
  };

  Manager.prototype.randomizationFactor = function (v) {
    if (!arguments.length) return this._randomizationFactor;
    this._randomizationFactor = v;
    this.backoff && this.backoff.setJitter(v);
    return this;
  };

  /**
   * Sets the maximum delay between reconnections.
   *
   * @param {Number} delay
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.reconnectionDelayMax = function (v) {
    if (!arguments.length) return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    this.backoff && this.backoff.setMax(v);
    return this;
  };

  /**
   * Sets the connection timeout. `false` to disable
   *
   * @return {Manager} self or value
   * @api public
   */

  Manager.prototype.timeout = function (v) {
    if (!arguments.length) return this._timeout;
    this._timeout = v;
    return this;
  };

  /**
   * Starts trying to reconnect if reconnection is enabled and we have not
   * started reconnecting yet
   *
   * @api private
   */

  Manager.prototype.maybeReconnectOnOpen = function () {
    // Only try to reconnect if it's the first time we're connecting
    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
      // keeps reconnection from firing twice for the same reconnection loop
      this.reconnect();
    }
  };

  /**
   * Sets the current transport `socket`.
   *
   * @param {Function} optional, callback
   * @return {Manager} self
   * @api public
   */

  Manager.prototype.open =
  Manager.prototype.connect = function (fn, opts) {
    debug$7('readyState %s', this.readyState);
    if (~this.readyState.indexOf('open')) return this;

    debug$7('opening %s', this.uri);
    this.engine = lib$1(this.uri, this.opts);
    var socket = this.engine;
    var self = this;
    this.readyState = 'opening';
    this.skipReconnect = false;

    // emit `open`
    var openSub = on_1(socket, 'open', function () {
      self.onopen();
      fn && fn();
    });

    // emit `connect_error`
    var errorSub = on_1(socket, 'error', function (data) {
      debug$7('connect_error');
      self.cleanup();
      self.readyState = 'closed';
      self.emitAll('connect_error', data);
      if (fn) {
        var err = new Error('Connection error');
        err.data = data;
        fn(err);
      } else {
        // Only do this if there is no fn to handle the error
        self.maybeReconnectOnOpen();
      }
    });

    // emit `connect_timeout`
    if (false !== this._timeout) {
      var timeout = this._timeout;
      debug$7('connect attempt will timeout after %d', timeout);

      // set timer
      var timer = setTimeout(function () {
        debug$7('connect attempt timed out after %d', timeout);
        openSub.destroy();
        socket.close();
        socket.emit('error', 'timeout');
        self.emitAll('connect_timeout', timeout);
      }, timeout);

      this.subs.push({
        destroy: function () {
          clearTimeout(timer);
        }
      });
    }

    this.subs.push(openSub);
    this.subs.push(errorSub);

    return this;
  };

  /**
   * Called upon transport open.
   *
   * @api private
   */

  Manager.prototype.onopen = function () {
    debug$7('open');

    // clear old subs
    this.cleanup();

    // mark as open
    this.readyState = 'open';
    this.emit('open');

    // add new subs
    var socket = this.engine;
    this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
    this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
    this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
    this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
    this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
    this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
  };

  /**
   * Called upon a ping.
   *
   * @api private
   */

  Manager.prototype.onping = function () {
    this.lastPing = new Date();
    this.emitAll('ping');
  };

  /**
   * Called upon a packet.
   *
   * @api private
   */

  Manager.prototype.onpong = function () {
    this.emitAll('pong', new Date() - this.lastPing);
  };

  /**
   * Called with data.
   *
   * @api private
   */

  Manager.prototype.ondata = function (data) {
    this.decoder.add(data);
  };

  /**
   * Called when parser fully decodes a packet.
   *
   * @api private
   */

  Manager.prototype.ondecoded = function (packet) {
    this.emit('packet', packet);
  };

  /**
   * Called upon socket error.
   *
   * @api private
   */

  Manager.prototype.onerror = function (err) {
    debug$7('error', err);
    this.emitAll('error', err);
  };

  /**
   * Creates a new socket for the given `nsp`.
   *
   * @return {Socket}
   * @api public
   */

  Manager.prototype.socket = function (nsp, opts) {
    var socket = this.nsps[nsp];
    if (!socket) {
      socket = new socket$1(this, nsp, opts);
      this.nsps[nsp] = socket;
      var self = this;
      socket.on('connecting', onConnecting);
      socket.on('connect', function () {
        socket.id = self.generateId(nsp);
      });

      if (this.autoConnect) {
        // manually call here since connecting event is fired before listening
        onConnecting();
      }
    }

    function onConnecting () {
      if (!~indexof(self.connecting, socket)) {
        self.connecting.push(socket);
      }
    }

    return socket;
  };

  /**
   * Called upon a socket close.
   *
   * @param {Socket} socket
   */

  Manager.prototype.destroy = function (socket) {
    var index = indexof(this.connecting, socket);
    if (~index) this.connecting.splice(index, 1);
    if (this.connecting.length) return;

    this.close();
  };

  /**
   * Writes a packet.
   *
   * @param {Object} packet
   * @api private
   */

  Manager.prototype.packet = function (packet) {
    debug$7('writing packet %j', packet);
    var self = this;
    if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

    if (!self.encoding) {
      // encode, then write to engine with result
      self.encoding = true;
      this.encoder.encode(packet, function (encodedPackets) {
        for (var i = 0; i < encodedPackets.length; i++) {
          self.engine.write(encodedPackets[i], packet.options);
        }
        self.encoding = false;
        self.processPacketQueue();
      });
    } else { // add packet to the queue
      self.packetBuffer.push(packet);
    }
  };

  /**
   * If packet buffer is non-empty, begins encoding the
   * next packet in line.
   *
   * @api private
   */

  Manager.prototype.processPacketQueue = function () {
    if (this.packetBuffer.length > 0 && !this.encoding) {
      var pack = this.packetBuffer.shift();
      this.packet(pack);
    }
  };

  /**
   * Clean up transport subscriptions and packet buffer.
   *
   * @api private
   */

  Manager.prototype.cleanup = function () {
    debug$7('cleanup');

    var subsLength = this.subs.length;
    for (var i = 0; i < subsLength; i++) {
      var sub = this.subs.shift();
      sub.destroy();
    }

    this.packetBuffer = [];
    this.encoding = false;
    this.lastPing = null;

    this.decoder.destroy();
  };

  /**
   * Close the current socket.
   *
   * @api private
   */

  Manager.prototype.close =
  Manager.prototype.disconnect = function () {
    debug$7('disconnect');
    this.skipReconnect = true;
    this.reconnecting = false;
    if ('opening' === this.readyState) {
      // `onclose` will not fire because
      // an open event never happened
      this.cleanup();
    }
    this.backoff.reset();
    this.readyState = 'closed';
    if (this.engine) this.engine.close();
  };

  /**
   * Called upon engine close.
   *
   * @api private
   */

  Manager.prototype.onclose = function (reason) {
    debug$7('onclose');

    this.cleanup();
    this.backoff.reset();
    this.readyState = 'closed';
    this.emit('close', reason);

    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  };

  /**
   * Attempt a reconnection.
   *
   * @api private
   */

  Manager.prototype.reconnect = function () {
    if (this.reconnecting || this.skipReconnect) return this;

    var self = this;

    if (this.backoff.attempts >= this._reconnectionAttempts) {
      debug$7('reconnect failed');
      this.backoff.reset();
      this.emitAll('reconnect_failed');
      this.reconnecting = false;
    } else {
      var delay = this.backoff.duration();
      debug$7('will wait %dms before reconnect attempt', delay);

      this.reconnecting = true;
      var timer = setTimeout(function () {
        if (self.skipReconnect) return;

        debug$7('attempting reconnect');
        self.emitAll('reconnect_attempt', self.backoff.attempts);
        self.emitAll('reconnecting', self.backoff.attempts);

        // check again for the case socket closed in above events
        if (self.skipReconnect) return;

        self.open(function (err) {
          if (err) {
            debug$7('reconnect attempt error');
            self.reconnecting = false;
            self.reconnect();
            self.emitAll('reconnect_error', err.data);
          } else {
            debug$7('reconnect success');
            self.onreconnect();
          }
        });
      }, delay);

      this.subs.push({
        destroy: function () {
          clearTimeout(timer);
        }
      });
    }
  };

  /**
   * Called upon successful reconnect.
   *
   * @api private
   */

  Manager.prototype.onreconnect = function () {
    var attempt = this.backoff.attempts;
    this.reconnecting = false;
    this.backoff.reset();
    this.updateSocketIds();
    this.emitAll('reconnect', attempt);
  };

  var lib$2 = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  var debug = src('socket.io-client');

  /**
   * Module exports.
   */

  module.exports = exports = lookup;

  /**
   * Managers cache.
   */

  var cache = exports.managers = {};

  /**
   * Looks up an existing `Manager` for multiplexing.
   * If the user summons:
   *
   *   `io('http://localhost/a');`
   *   `io('http://localhost/b');`
   *
   * We reuse the existing instance based on same scheme/port/host,
   * and we initialize sockets for each namespace.
   *
   * @api public
   */

  function lookup (uri, opts) {
    if (typeof uri === 'object') {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};

    var parsed = url_1(uri);
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id].nsps;
    var newConnection = opts.forceNew || opts['force new connection'] ||
                        false === opts.multiplex || sameNamespace;

    var io;

    if (newConnection) {
      debug('ignoring socket cache for %s', source);
      io = manager(source, opts);
    } else {
      if (!cache[id]) {
        debug('new io instance for %s', source);
        cache[id] = manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.query;
    }
    return io.socket(parsed.path, opts);
  }

  /**
   * Protocol version.
   *
   * @api public
   */

  exports.protocol = socket_ioParser.protocol;

  /**
   * `connect`.
   *
   * @param {String} uri
   * @api public
   */

  exports.connect = lookup;

  /**
   * Expose constructors for standalone build.
   *
   * @api public
   */

  exports.Manager = manager;
  exports.Socket = socket$1;
  });
  var lib_1$1 = lib$2.managers;
  var lib_2$1 = lib$2.protocol;
  var lib_3$1 = lib$2.connect;
  var lib_4$1 = lib$2.Manager;
  var lib_5$1 = lib$2.Socket;

  var semverCompare = function cmp (a, b) {
      var pa = a.split('.');
      var pb = b.split('.');
      for (var i = 0; i < 3; i++) {
          var na = Number(pa[i]);
          var nb = Number(pb[i]);
          if (na > nb) return 1;
          if (nb > na) return -1;
          if (!isNaN(na) && isNaN(nb)) return 1;
          if (isNaN(na) && !isNaN(nb)) return -1;
      }
      return 0;
  };

  var detectBrowser = createCommonjsModule(function (module, exports) {
  var __spreadArrays = (commonjsGlobal && commonjsGlobal.__spreadArrays) || function () {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++)
          for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
              r[k] = a[j];
      return r;
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var BrowserInfo = /** @class */ (function () {
      function BrowserInfo(name, version, os) {
          this.name = name;
          this.version = version;
          this.os = os;
      }
      return BrowserInfo;
  }());
  exports.BrowserInfo = BrowserInfo;
  var NodeInfo = /** @class */ (function () {
      function NodeInfo(version) {
          this.version = version;
          this.name = 'node';
          this.os = process.platform;
      }
      return NodeInfo;
  }());
  exports.NodeInfo = NodeInfo;
  var BotInfo = /** @class */ (function () {
      function BotInfo() {
          this.bot = true; // NOTE: deprecated test name instead
          this.name = 'bot';
          this.version = null;
          this.os = null;
      }
      return BotInfo;
  }());
  exports.BotInfo = BotInfo;
  // tslint:disable-next-line:max-line-length
  var SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/;
  var SEARCHBOT_OS_REGEX = /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/;
  var REQUIRED_VERSION_PARTS = 3;
  var userAgentRules = [
      ['aol', /AOLShield\/([0-9\._]+)/],
      ['edge', /Edge\/([0-9\._]+)/],
      ['edge-ios', /EdgiOS\/([0-9\._]+)/],
      ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
      ['vivaldi', /Vivaldi\/([0-9\.]+)/],
      ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
      ['samsung', /SamsungBrowser\/([0-9\.]+)/],
      ['silk', /\bSilk\/([0-9._-]+)\b/],
      ['miui', /MiuiBrowser\/([0-9\.]+)$/],
      ['beaker', /BeakerBrowser\/([0-9\.]+)/],
      ['edge-chromium', /Edg\/([0-9\.]+)/],
      [
          'chromium-webview',
          /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/,
      ],
      ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
      ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
      ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
      ['fxios', /FxiOS\/([0-9\.]+)/],
      ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
      ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
      ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
      ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
      ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ['ie', /MSIE\s(7\.0)/],
      ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ['android', /Android\s([0-9\.]+)/],
      ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
      ['safari', /Version\/([0-9\._]+).*Safari/],
      ['facebook', /FBAV\/([0-9\.]+)/],
      ['instagram', /Instagram\s([0-9\.]+)/],
      ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
      ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
      ['searchbot', SEARCHBOX_UA_REGEX],
  ];
  var operatingSystemRules = [
      ['iOS', /iP(hone|od|ad)/],
      ['Android OS', /Android/],
      ['BlackBerry OS', /BlackBerry|BB10/],
      ['Windows Mobile', /IEMobile/],
      ['Amazon OS', /Kindle/],
      ['Windows 3.11', /Win16/],
      ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
      ['Windows 98', /(Windows 98)|(Win98)/],
      ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
      ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
      ['Windows Server 2003', /(Windows NT 5.2)/],
      ['Windows Vista', /(Windows NT 6.0)/],
      ['Windows 7', /(Windows NT 6.1)/],
      ['Windows 8', /(Windows NT 6.2)/],
      ['Windows 8.1', /(Windows NT 6.3)/],
      ['Windows 10', /(Windows NT 10.0)/],
      ['Windows ME', /Windows ME/],
      ['Open BSD', /OpenBSD/],
      ['Sun OS', /SunOS/],
      ['Chrome OS', /CrOS/],
      ['Linux', /(Linux)|(X11)/],
      ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
      ['QNX', /QNX/],
      ['BeOS', /BeOS/],
      ['OS/2', /OS\/2/],
      ['Search Bot', SEARCHBOT_OS_REGEX],
  ];
  function detect(userAgent) {
      if (!!userAgent) {
          return parseUserAgent(userAgent);
      }
      if (typeof navigator !== 'undefined') {
          return parseUserAgent(navigator.userAgent);
      }
      return getNodeVersion();
  }
  exports.detect = detect;
  function parseUserAgent(ua) {
      // opted for using reduce here rather than Array#first with a regex.test call
      // this is primarily because using the reduce we only perform the regex
      // execution once rather than once for the test and for the exec again below
      // probably something that needs to be benchmarked though
      var matchedRule = ua !== '' &&
          userAgentRules.reduce(function (matched, _a) {
              var browser = _a[0], regex = _a[1];
              if (matched) {
                  return matched;
              }
              var uaMatch = regex.exec(ua);
              return !!uaMatch && [browser, uaMatch];
          }, false);
      if (!matchedRule) {
          return null;
      }
      var name = matchedRule[0], match = matchedRule[1];
      if (name === 'searchbot') {
          return new BotInfo();
      }
      var versionParts = match[1] && match[1].split(/[._]/).slice(0, 3);
      if (versionParts) {
          if (versionParts.length < REQUIRED_VERSION_PARTS) {
              versionParts = __spreadArrays(versionParts, createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length));
          }
      }
      else {
          versionParts = [];
      }
      return new BrowserInfo(name, versionParts.join('.'), detectOS(ua));
  }
  exports.parseUserAgent = parseUserAgent;
  function detectOS(ua) {
      for (var ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
          var _a = operatingSystemRules[ii], os = _a[0], regex = _a[1];
          var match = regex.test(ua);
          if (match) {
              return os;
          }
      }
      return null;
  }
  exports.detectOS = detectOS;
  function getNodeVersion() {
      var isNode = typeof process !== 'undefined' && process.version;
      return isNode ? new NodeInfo(process.version.slice(1)) : null;
  }
  exports.getNodeVersion = getNodeVersion;
  function createVersionParts(count) {
      var output = [];
      for (var ii = 0; ii < count; ii++) {
          output.push('0');
      }
      return output;
  }
  });

  unwrapExports(detectBrowser);
  var detectBrowser_1 = detectBrowser.BrowserInfo;
  var detectBrowser_2 = detectBrowser.NodeInfo;
  var detectBrowser_3 = detectBrowser.BotInfo;
  var detectBrowser_4 = detectBrowser.detect;
  var detectBrowser_5 = detectBrowser.parseUserAgent;
  var detectBrowser_6 = detectBrowser.detectOS;
  var detectBrowser_7 = detectBrowser.getNodeVersion;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isFunction(x) {
      return typeof x === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
      Promise: undefined,
      set useDeprecatedSynchronousErrorHandling(value) {
          if (value) {
              var error = /*@__PURE__*/ new Error();
              /*@__PURE__*/ console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
          }
          _enable_super_gross_mode_that_will_cause_bad_things = value;
      },
      get useDeprecatedSynchronousErrorHandling() {
          return _enable_super_gross_mode_that_will_cause_bad_things;
      },
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function hostReportError(err) {
      setTimeout(function () { throw err; }, 0);
  }

  /** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */
  var empty$2 = {
      closed: true,
      next: function (value) { },
      error: function (err) {
          if (config.useDeprecatedSynchronousErrorHandling) {
              throw err;
          }
          else {
              hostReportError(err);
          }
      },
      complete: function () { }
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArray = /*@__PURE__*/ (function () { return Array.isArray || (function (x) { return x && typeof x.length === 'number'; }); })();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isObject(x) {
      return x !== null && typeof x === 'object';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var UnsubscriptionErrorImpl = /*@__PURE__*/ (function () {
      function UnsubscriptionErrorImpl(errors) {
          Error.call(this);
          this.message = errors ?
              errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) { return i + 1 + ") " + err.toString(); }).join('\n  ') : '';
          this.name = 'UnsubscriptionError';
          this.errors = errors;
          return this;
      }
      UnsubscriptionErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return UnsubscriptionErrorImpl;
  })();
  var UnsubscriptionError = UnsubscriptionErrorImpl;

  /** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */
  var Subscription = /*@__PURE__*/ (function () {
      function Subscription(unsubscribe) {
          this.closed = false;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (unsubscribe) {
              this._ctorUnsubscribe = true;
              this._unsubscribe = unsubscribe;
          }
      }
      Subscription.prototype.unsubscribe = function () {
          var errors;
          if (this.closed) {
              return;
          }
          var _a = this, _parentOrParents = _a._parentOrParents, _ctorUnsubscribe = _a._ctorUnsubscribe, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
          this.closed = true;
          this._parentOrParents = null;
          this._subscriptions = null;
          if (_parentOrParents instanceof Subscription) {
              _parentOrParents.remove(this);
          }
          else if (_parentOrParents !== null) {
              for (var index = 0; index < _parentOrParents.length; ++index) {
                  var parent_1 = _parentOrParents[index];
                  parent_1.remove(this);
              }
          }
          if (isFunction(_unsubscribe)) {
              if (_ctorUnsubscribe) {
                  this._unsubscribe = undefined;
              }
              try {
                  _unsubscribe.call(this);
              }
              catch (e) {
                  errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
              }
          }
          if (isArray(_subscriptions)) {
              var index = -1;
              var len = _subscriptions.length;
              while (++index < len) {
                  var sub = _subscriptions[index];
                  if (isObject(sub)) {
                      try {
                          sub.unsubscribe();
                      }
                      catch (e) {
                          errors = errors || [];
                          if (e instanceof UnsubscriptionError) {
                              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
                          }
                          else {
                              errors.push(e);
                          }
                      }
                  }
              }
          }
          if (errors) {
              throw new UnsubscriptionError(errors);
          }
      };
      Subscription.prototype.add = function (teardown) {
          var subscription = teardown;
          if (!teardown) {
              return Subscription.EMPTY;
          }
          switch (typeof teardown) {
              case 'function':
                  subscription = new Subscription(teardown);
              case 'object':
                  if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
                      return subscription;
                  }
                  else if (this.closed) {
                      subscription.unsubscribe();
                      return subscription;
                  }
                  else if (!(subscription instanceof Subscription)) {
                      var tmp = subscription;
                      subscription = new Subscription();
                      subscription._subscriptions = [tmp];
                  }
                  break;
              default: {
                  throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
              }
          }
          var _parentOrParents = subscription._parentOrParents;
          if (_parentOrParents === null) {
              subscription._parentOrParents = this;
          }
          else if (_parentOrParents instanceof Subscription) {
              if (_parentOrParents === this) {
                  return subscription;
              }
              subscription._parentOrParents = [_parentOrParents, this];
          }
          else if (_parentOrParents.indexOf(this) === -1) {
              _parentOrParents.push(this);
          }
          else {
              return subscription;
          }
          var subscriptions = this._subscriptions;
          if (subscriptions === null) {
              this._subscriptions = [subscription];
          }
          else {
              subscriptions.push(subscription);
          }
          return subscription;
      };
      Subscription.prototype.remove = function (subscription) {
          var subscriptions = this._subscriptions;
          if (subscriptions) {
              var subscriptionIndex = subscriptions.indexOf(subscription);
              if (subscriptionIndex !== -1) {
                  subscriptions.splice(subscriptionIndex, 1);
              }
          }
      };
      Subscription.EMPTY = (function (empty) {
          empty.closed = true;
          return empty;
      }(new Subscription()));
      return Subscription;
  }());
  function flattenUnsubscriptionErrors(errors) {
      return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError) ? err.errors : err); }, []);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var rxSubscriber = /*@__PURE__*/ (function () {
      return typeof Symbol === 'function'
          ? /*@__PURE__*/ Symbol('rxSubscriber')
          : '@@rxSubscriber_' + /*@__PURE__*/ Math.random();
  })();

  /** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */
  var Subscriber = /*@__PURE__*/ (function (_super) {
      __extends(Subscriber, _super);
      function Subscriber(destinationOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this.syncErrorValue = null;
          _this.syncErrorThrown = false;
          _this.syncErrorThrowable = false;
          _this.isStopped = false;
          switch (arguments.length) {
              case 0:
                  _this.destination = empty$2;
                  break;
              case 1:
                  if (!destinationOrNext) {
                      _this.destination = empty$2;
                      break;
                  }
                  if (typeof destinationOrNext === 'object') {
                      if (destinationOrNext instanceof Subscriber) {
                          _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                          _this.destination = destinationOrNext;
                          destinationOrNext.add(_this);
                      }
                      else {
                          _this.syncErrorThrowable = true;
                          _this.destination = new SafeSubscriber(_this, destinationOrNext);
                      }
                      break;
                  }
              default:
                  _this.syncErrorThrowable = true;
                  _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
                  break;
          }
          return _this;
      }
      Subscriber.prototype[rxSubscriber] = function () { return this; };
      Subscriber.create = function (next, error, complete) {
          var subscriber = new Subscriber(next, error, complete);
          subscriber.syncErrorThrowable = false;
          return subscriber;
      };
      Subscriber.prototype.next = function (value) {
          if (!this.isStopped) {
              this._next(value);
          }
      };
      Subscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              this.isStopped = true;
              this._error(err);
          }
      };
      Subscriber.prototype.complete = function () {
          if (!this.isStopped) {
              this.isStopped = true;
              this._complete();
          }
      };
      Subscriber.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
      };
      Subscriber.prototype._next = function (value) {
          this.destination.next(value);
      };
      Subscriber.prototype._error = function (err) {
          this.destination.error(err);
          this.unsubscribe();
      };
      Subscriber.prototype._complete = function () {
          this.destination.complete();
          this.unsubscribe();
      };
      Subscriber.prototype._unsubscribeAndRecycle = function () {
          var _parentOrParents = this._parentOrParents;
          this._parentOrParents = null;
          this.unsubscribe();
          this.closed = false;
          this.isStopped = false;
          this._parentOrParents = _parentOrParents;
          return this;
      };
      return Subscriber;
  }(Subscription));
  var SafeSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(SafeSubscriber, _super);
      function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
          var _this = _super.call(this) || this;
          _this._parentSubscriber = _parentSubscriber;
          var next;
          var context = _this;
          if (isFunction(observerOrNext)) {
              next = observerOrNext;
          }
          else if (observerOrNext) {
              next = observerOrNext.next;
              error = observerOrNext.error;
              complete = observerOrNext.complete;
              if (observerOrNext !== empty$2) {
                  context = Object.create(observerOrNext);
                  if (isFunction(context.unsubscribe)) {
                      _this.add(context.unsubscribe.bind(context));
                  }
                  context.unsubscribe = _this.unsubscribe.bind(_this);
              }
          }
          _this._context = context;
          _this._next = next;
          _this._error = error;
          _this._complete = complete;
          return _this;
      }
      SafeSubscriber.prototype.next = function (value) {
          if (!this.isStopped && this._next) {
              var _parentSubscriber = this._parentSubscriber;
              if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                  this.__tryOrUnsub(this._next, value);
              }
              else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.error = function (err) {
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              var useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
              if (this._error) {
                  if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(this._error, err);
                      this.unsubscribe();
                  }
                  else {
                      this.__tryOrSetError(_parentSubscriber, this._error, err);
                      this.unsubscribe();
                  }
              }
              else if (!_parentSubscriber.syncErrorThrowable) {
                  this.unsubscribe();
                  if (useDeprecatedSynchronousErrorHandling) {
                      throw err;
                  }
                  hostReportError(err);
              }
              else {
                  if (useDeprecatedSynchronousErrorHandling) {
                      _parentSubscriber.syncErrorValue = err;
                      _parentSubscriber.syncErrorThrown = true;
                  }
                  else {
                      hostReportError(err);
                  }
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.complete = function () {
          var _this = this;
          if (!this.isStopped) {
              var _parentSubscriber = this._parentSubscriber;
              if (this._complete) {
                  var wrappedComplete = function () { return _this._complete.call(_this._context); };
                  if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
                      this.__tryOrUnsub(wrappedComplete);
                      this.unsubscribe();
                  }
                  else {
                      this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                      this.unsubscribe();
                  }
              }
              else {
                  this.unsubscribe();
              }
          }
      };
      SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
          try {
              fn.call(this._context, value);
          }
          catch (err) {
              this.unsubscribe();
              if (config.useDeprecatedSynchronousErrorHandling) {
                  throw err;
              }
              else {
                  hostReportError(err);
              }
          }
      };
      SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
          if (!config.useDeprecatedSynchronousErrorHandling) {
              throw new Error('bad call');
          }
          try {
              fn.call(this._context, value);
          }
          catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  parent.syncErrorValue = err;
                  parent.syncErrorThrown = true;
                  return true;
              }
              else {
                  hostReportError(err);
                  return true;
              }
          }
          return false;
      };
      SafeSubscriber.prototype._unsubscribe = function () {
          var _parentSubscriber = this._parentSubscriber;
          this._context = null;
          this._parentSubscriber = null;
          _parentSubscriber.unsubscribe();
      };
      return SafeSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */
  function canReportError(observer) {
      while (observer) {
          var _a = observer, closed_1 = _a.closed, destination = _a.destination, isStopped = _a.isStopped;
          if (closed_1 || isStopped) {
              return false;
          }
          else if (destination && destination instanceof Subscriber) {
              observer = destination;
          }
          else {
              observer = null;
          }
      }
      return true;
  }

  /** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */
  function toSubscriber(nextOrObserver, error, complete) {
      if (nextOrObserver) {
          if (nextOrObserver instanceof Subscriber) {
              return nextOrObserver;
          }
          if (nextOrObserver[rxSubscriber]) {
              return nextOrObserver[rxSubscriber]();
          }
      }
      if (!nextOrObserver && !error && !complete) {
          return new Subscriber(empty$2);
      }
      return new Subscriber(nextOrObserver, error, complete);
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var observable = /*@__PURE__*/ (function () { return typeof Symbol === 'function' && Symbol.observable || '@@observable'; })();

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function identity(x) {
      return x;
  }

  /** PURE_IMPORTS_START _identity PURE_IMPORTS_END */
  function pipeFromArray(fns) {
      if (fns.length === 0) {
          return identity;
      }
      if (fns.length === 1) {
          return fns[0];
      }
      return function piped(input) {
          return fns.reduce(function (prev, fn) { return fn(prev); }, input);
      };
  }

  /** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */
  var Observable = /*@__PURE__*/ (function () {
      function Observable(subscribe) {
          this._isScalar = false;
          if (subscribe) {
              this._subscribe = subscribe;
          }
      }
      Observable.prototype.lift = function (operator) {
          var observable = new Observable();
          observable.source = this;
          observable.operator = operator;
          return observable;
      };
      Observable.prototype.subscribe = function (observerOrNext, error, complete) {
          var operator = this.operator;
          var sink = toSubscriber(observerOrNext, error, complete);
          if (operator) {
              sink.add(operator.call(sink, this.source));
          }
          else {
              sink.add(this.source || (config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable) ?
                  this._subscribe(sink) :
                  this._trySubscribe(sink));
          }
          if (config.useDeprecatedSynchronousErrorHandling) {
              if (sink.syncErrorThrowable) {
                  sink.syncErrorThrowable = false;
                  if (sink.syncErrorThrown) {
                      throw sink.syncErrorValue;
                  }
              }
          }
          return sink;
      };
      Observable.prototype._trySubscribe = function (sink) {
          try {
              return this._subscribe(sink);
          }
          catch (err) {
              if (config.useDeprecatedSynchronousErrorHandling) {
                  sink.syncErrorThrown = true;
                  sink.syncErrorValue = err;
              }
              if (canReportError(sink)) {
                  sink.error(err);
              }
              else {
                  console.warn(err);
              }
          }
      };
      Observable.prototype.forEach = function (next, promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var subscription;
              subscription = _this.subscribe(function (value) {
                  try {
                      next(value);
                  }
                  catch (err) {
                      reject(err);
                      if (subscription) {
                          subscription.unsubscribe();
                      }
                  }
              }, reject, resolve);
          });
      };
      Observable.prototype._subscribe = function (subscriber) {
          var source = this.source;
          return source && source.subscribe(subscriber);
      };
      Observable.prototype[observable] = function () {
          return this;
      };
      Observable.prototype.pipe = function () {
          var operations = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              operations[_i] = arguments[_i];
          }
          if (operations.length === 0) {
              return this;
          }
          return pipeFromArray(operations)(this);
      };
      Observable.prototype.toPromise = function (promiseCtor) {
          var _this = this;
          promiseCtor = getPromiseCtor(promiseCtor);
          return new promiseCtor(function (resolve, reject) {
              var value;
              _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
          });
      };
      Observable.create = function (subscribe) {
          return new Observable(subscribe);
      };
      return Observable;
  }());
  function getPromiseCtor(promiseCtor) {
      if (!promiseCtor) {
          promiseCtor =  Promise;
      }
      if (!promiseCtor) {
          throw new Error('no Promise impl found');
      }
      return promiseCtor;
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var ObjectUnsubscribedErrorImpl = /*@__PURE__*/ (function () {
      function ObjectUnsubscribedErrorImpl() {
          Error.call(this);
          this.message = 'object unsubscribed';
          this.name = 'ObjectUnsubscribedError';
          return this;
      }
      ObjectUnsubscribedErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return ObjectUnsubscribedErrorImpl;
  })();
  var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var SubjectSubscription = /*@__PURE__*/ (function (_super) {
      __extends(SubjectSubscription, _super);
      function SubjectSubscription(subject, subscriber) {
          var _this = _super.call(this) || this;
          _this.subject = subject;
          _this.subscriber = subscriber;
          _this.closed = false;
          return _this;
      }
      SubjectSubscription.prototype.unsubscribe = function () {
          if (this.closed) {
              return;
          }
          this.closed = true;
          var subject = this.subject;
          var observers = subject.observers;
          this.subject = null;
          if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
              return;
          }
          var subscriberIndex = observers.indexOf(this.subscriber);
          if (subscriberIndex !== -1) {
              observers.splice(subscriberIndex, 1);
          }
      };
      return SubjectSubscription;
  }(Subscription));

  /** PURE_IMPORTS_START tslib,_Observable,_Subscriber,_Subscription,_util_ObjectUnsubscribedError,_SubjectSubscription,_internal_symbol_rxSubscriber PURE_IMPORTS_END */
  var SubjectSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(SubjectSubscriber, _super);
      function SubjectSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.destination = destination;
          return _this;
      }
      return SubjectSubscriber;
  }(Subscriber));
  var Subject = /*@__PURE__*/ (function (_super) {
      __extends(Subject, _super);
      function Subject() {
          var _this = _super.call(this) || this;
          _this.observers = [];
          _this.closed = false;
          _this.isStopped = false;
          _this.hasError = false;
          _this.thrownError = null;
          return _this;
      }
      Subject.prototype[rxSubscriber] = function () {
          return new SubjectSubscriber(this);
      };
      Subject.prototype.lift = function (operator) {
          var subject = new AnonymousSubject(this, this);
          subject.operator = operator;
          return subject;
      };
      Subject.prototype.next = function (value) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          if (!this.isStopped) {
              var observers = this.observers;
              var len = observers.length;
              var copy = observers.slice();
              for (var i = 0; i < len; i++) {
                  copy[i].next(value);
              }
          }
      };
      Subject.prototype.error = function (err) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          this.hasError = true;
          this.thrownError = err;
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].error(err);
          }
          this.observers.length = 0;
      };
      Subject.prototype.complete = function () {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          this.isStopped = true;
          var observers = this.observers;
          var len = observers.length;
          var copy = observers.slice();
          for (var i = 0; i < len; i++) {
              copy[i].complete();
          }
          this.observers.length = 0;
      };
      Subject.prototype.unsubscribe = function () {
          this.isStopped = true;
          this.closed = true;
          this.observers = null;
      };
      Subject.prototype._trySubscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          else {
              return _super.prototype._trySubscribe.call(this, subscriber);
          }
      };
      Subject.prototype._subscribe = function (subscriber) {
          if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          else if (this.hasError) {
              subscriber.error(this.thrownError);
              return Subscription.EMPTY;
          }
          else if (this.isStopped) {
              subscriber.complete();
              return Subscription.EMPTY;
          }
          else {
              this.observers.push(subscriber);
              return new SubjectSubscription(this, subscriber);
          }
      };
      Subject.prototype.asObservable = function () {
          var observable = new Observable();
          observable.source = this;
          return observable;
      };
      Subject.create = function (destination, source) {
          return new AnonymousSubject(destination, source);
      };
      return Subject;
  }(Observable));
  var AnonymousSubject = /*@__PURE__*/ (function (_super) {
      __extends(AnonymousSubject, _super);
      function AnonymousSubject(destination, source) {
          var _this = _super.call(this) || this;
          _this.destination = destination;
          _this.source = source;
          return _this;
      }
      AnonymousSubject.prototype.next = function (value) {
          var destination = this.destination;
          if (destination && destination.next) {
              destination.next(value);
          }
      };
      AnonymousSubject.prototype.error = function (err) {
          var destination = this.destination;
          if (destination && destination.error) {
              this.destination.error(err);
          }
      };
      AnonymousSubject.prototype.complete = function () {
          var destination = this.destination;
          if (destination && destination.complete) {
              this.destination.complete();
          }
      };
      AnonymousSubject.prototype._subscribe = function (subscriber) {
          var source = this.source;
          if (source) {
              return this.source.subscribe(subscriber);
          }
          else {
              return Subscription.EMPTY;
          }
      };
      return AnonymousSubject;
  }(Subject));

  /** PURE_IMPORTS_START tslib,_Subject,_util_ObjectUnsubscribedError PURE_IMPORTS_END */
  var BehaviorSubject = /*@__PURE__*/ (function (_super) {
      __extends(BehaviorSubject, _super);
      function BehaviorSubject(_value) {
          var _this = _super.call(this) || this;
          _this._value = _value;
          return _this;
      }
      Object.defineProperty(BehaviorSubject.prototype, "value", {
          get: function () {
              return this.getValue();
          },
          enumerable: true,
          configurable: true
      });
      BehaviorSubject.prototype._subscribe = function (subscriber) {
          var subscription = _super.prototype._subscribe.call(this, subscriber);
          if (subscription && !subscription.closed) {
              subscriber.next(this._value);
          }
          return subscription;
      };
      BehaviorSubject.prototype.getValue = function () {
          if (this.hasError) {
              throw this.thrownError;
          }
          else if (this.closed) {
              throw new ObjectUnsubscribedError();
          }
          else {
              return this._value;
          }
      };
      BehaviorSubject.prototype.next = function (value) {
          _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject;
  }(Subject));

  /** PURE_IMPORTS_START tslib,_Subscription PURE_IMPORTS_END */
  var Action = /*@__PURE__*/ (function (_super) {
      __extends(Action, _super);
      function Action(scheduler, work) {
          return _super.call(this) || this;
      }
      Action.prototype.schedule = function (state, delay) {
          return this;
      };
      return Action;
  }(Subscription));

  /** PURE_IMPORTS_START tslib,_Action PURE_IMPORTS_END */
  var AsyncAction = /*@__PURE__*/ (function (_super) {
      __extends(AsyncAction, _super);
      function AsyncAction(scheduler, work) {
          var _this = _super.call(this, scheduler, work) || this;
          _this.scheduler = scheduler;
          _this.work = work;
          _this.pending = false;
          return _this;
      }
      AsyncAction.prototype.schedule = function (state, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (this.closed) {
              return this;
          }
          this.state = state;
          var id = this.id;
          var scheduler = this.scheduler;
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, delay);
          }
          this.pending = true;
          this.delay = delay;
          this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
          return this;
      };
      AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          return setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
          if (delay === void 0) {
              delay = 0;
          }
          if (delay !== null && this.delay === delay && this.pending === false) {
              return id;
          }
          clearInterval(id);
          return undefined;
      };
      AsyncAction.prototype.execute = function (state, delay) {
          if (this.closed) {
              return new Error('executing a cancelled action');
          }
          this.pending = false;
          var error = this._execute(state, delay);
          if (error) {
              return error;
          }
          else if (this.pending === false && this.id != null) {
              this.id = this.recycleAsyncId(this.scheduler, this.id, null);
          }
      };
      AsyncAction.prototype._execute = function (state, delay) {
          var errored = false;
          var errorValue = undefined;
          try {
              this.work(state);
          }
          catch (e) {
              errored = true;
              errorValue = !!e && e || new Error(e);
          }
          if (errored) {
              this.unsubscribe();
              return errorValue;
          }
      };
      AsyncAction.prototype._unsubscribe = function () {
          var id = this.id;
          var scheduler = this.scheduler;
          var actions = scheduler.actions;
          var index = actions.indexOf(this);
          this.work = null;
          this.state = null;
          this.pending = false;
          this.scheduler = null;
          if (index !== -1) {
              actions.splice(index, 1);
          }
          if (id != null) {
              this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
      };
      return AsyncAction;
  }(Action));

  var Scheduler = /*@__PURE__*/ (function () {
      function Scheduler(SchedulerAction, now) {
          if (now === void 0) {
              now = Scheduler.now;
          }
          this.SchedulerAction = SchedulerAction;
          this.now = now;
      }
      Scheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) {
              delay = 0;
          }
          return new this.SchedulerAction(this, work).schedule(state, delay);
      };
      Scheduler.now = function () { return Date.now(); };
      return Scheduler;
  }());

  /** PURE_IMPORTS_START tslib,_Scheduler PURE_IMPORTS_END */
  var AsyncScheduler = /*@__PURE__*/ (function (_super) {
      __extends(AsyncScheduler, _super);
      function AsyncScheduler(SchedulerAction, now) {
          if (now === void 0) {
              now = Scheduler.now;
          }
          var _this = _super.call(this, SchedulerAction, function () {
              if (AsyncScheduler.delegate && AsyncScheduler.delegate !== _this) {
                  return AsyncScheduler.delegate.now();
              }
              else {
                  return now();
              }
          }) || this;
          _this.actions = [];
          _this.active = false;
          _this.scheduled = undefined;
          return _this;
      }
      AsyncScheduler.prototype.schedule = function (work, delay, state) {
          if (delay === void 0) {
              delay = 0;
          }
          if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
              return AsyncScheduler.delegate.schedule(work, delay, state);
          }
          else {
              return _super.prototype.schedule.call(this, work, delay, state);
          }
      };
      AsyncScheduler.prototype.flush = function (action) {
          var actions = this.actions;
          if (this.active) {
              actions.push(action);
              return;
          }
          var error;
          this.active = true;
          do {
              if (error = action.execute(action.state, action.delay)) {
                  break;
              }
          } while (action = actions.shift());
          this.active = false;
          if (error) {
              while (action = actions.shift()) {
                  action.unsubscribe();
              }
              throw error;
          }
      };
      return AsyncScheduler;
  }(Scheduler));

  /** PURE_IMPORTS_START _Observable PURE_IMPORTS_END */
  var EMPTY = /*@__PURE__*/ new Observable(function (subscriber) { return subscriber.complete(); });
  function empty$3(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : EMPTY;
  }
  function emptyScheduled(scheduler) {
      return new Observable(function (subscriber) { return scheduler.schedule(function () { return subscriber.complete(); }); });
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isScheduler(value) {
      return value && typeof value.schedule === 'function';
  }

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var subscribeToArray = function (array) {
      return function (subscriber) {
          for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
              subscriber.next(array[i]);
          }
          subscriber.complete();
      };
  };

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
  function scheduleArray(input, scheduler) {
      return new Observable(function (subscriber) {
          var sub = new Subscription();
          var i = 0;
          sub.add(scheduler.schedule(function () {
              if (i === input.length) {
                  subscriber.complete();
                  return;
              }
              subscriber.next(input[i++]);
              if (!subscriber.closed) {
                  sub.add(this.schedule());
              }
          }));
          return sub;
      });
  }

  /** PURE_IMPORTS_START _Observable,_util_subscribeToArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function fromArray(input, scheduler) {
      if (!scheduler) {
          return new Observable(subscribeToArray(input));
      }
      else {
          return scheduleArray(input, scheduler);
      }
  }

  /** PURE_IMPORTS_START _util_isScheduler,_fromArray,_scheduled_scheduleArray PURE_IMPORTS_END */
  function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
      }
      var scheduler = args[args.length - 1];
      if (isScheduler(scheduler)) {
          args.pop();
          return scheduleArray(args, scheduler);
      }
      else {
          return fromArray(args);
      }
  }

  /** PURE_IMPORTS_START _AsyncAction,_AsyncScheduler PURE_IMPORTS_END */
  var asyncScheduler = /*@__PURE__*/ new AsyncScheduler(AsyncAction);
  var async = asyncScheduler;

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var ArgumentOutOfRangeErrorImpl = /*@__PURE__*/ (function () {
      function ArgumentOutOfRangeErrorImpl() {
          Error.call(this);
          this.message = 'argument out of range';
          this.name = 'ArgumentOutOfRangeError';
          return this;
      }
      ArgumentOutOfRangeErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return ArgumentOutOfRangeErrorImpl;
  })();
  var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var EmptyErrorImpl = /*@__PURE__*/ (function () {
      function EmptyErrorImpl() {
          Error.call(this);
          this.message = 'no elements in sequence';
          this.name = 'EmptyError';
          return this;
      }
      EmptyErrorImpl.prototype = /*@__PURE__*/ Object.create(Error.prototype);
      return EmptyErrorImpl;
  })();
  var EmptyError = EmptyErrorImpl;

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function map$1(project, thisArg) {
      return function mapOperation(source) {
          if (typeof project !== 'function') {
              throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
          }
          return source.lift(new MapOperator(project, thisArg));
      };
  }
  var MapOperator = /*@__PURE__*/ (function () {
      function MapOperator(project, thisArg) {
          this.project = project;
          this.thisArg = thisArg;
      }
      MapOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
      };
      return MapOperator;
  }());
  var MapSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(MapSubscriber, _super);
      function MapSubscriber(destination, project, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.count = 0;
          _this.thisArg = thisArg || _this;
          return _this;
      }
      MapSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.project.call(this.thisArg, value, this.count++);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.destination.next(result);
      };
      return MapSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
  var subscribeToPromise = function (promise) {
      return function (subscriber) {
          promise.then(function (value) {
              if (!subscriber.closed) {
                  subscriber.next(value);
                  subscriber.complete();
              }
          }, function (err) { return subscriber.error(err); })
              .then(null, hostReportError);
          return subscriber;
      };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function getSymbolIterator() {
      if (typeof Symbol !== 'function' || !Symbol.iterator) {
          return '@@iterator';
      }
      return Symbol.iterator;
  }
  var iterator = /*@__PURE__*/ getSymbolIterator();

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
  var subscribeToIterable = function (iterable) {
      return function (subscriber) {
          var iterator$1 = iterable[iterator]();
          do {
              var item = void 0;
              try {
                  item = iterator$1.next();
              }
              catch (err) {
                  subscriber.error(err);
                  return subscriber;
              }
              if (item.done) {
                  subscriber.complete();
                  break;
              }
              subscriber.next(item.value);
              if (subscriber.closed) {
                  break;
              }
          } while (true);
          if (typeof iterator$1.return === 'function') {
              subscriber.add(function () {
                  if (iterator$1.return) {
                      iterator$1.return();
                  }
              });
          }
          return subscriber;
      };
  };

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
  var subscribeToObservable = function (obj) {
      return function (subscriber) {
          var obs = obj[observable]();
          if (typeof obs.subscribe !== 'function') {
              throw new TypeError('Provided object does not correctly implement Symbol.observable');
          }
          else {
              return obs.subscribe(subscriber);
          }
      };
  };

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

  /** PURE_IMPORTS_START  PURE_IMPORTS_END */
  function isPromise(value) {
      return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }

  /** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
  var subscribeTo = function (result) {
      if (!!result && typeof result[observable] === 'function') {
          return subscribeToObservable(result);
      }
      else if (isArrayLike(result)) {
          return subscribeToArray(result);
      }
      else if (isPromise(result)) {
          return subscribeToPromise(result);
      }
      else if (!!result && typeof result[iterator] === 'function') {
          return subscribeToIterable(result);
      }
      else {
          var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
          var msg = "You provided " + value + " where a stream was expected."
              + ' You can provide an Observable, Promise, Array, or Iterable.';
          throw new TypeError(msg);
      }
  };

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */
  function scheduleObservable(input, scheduler) {
      return new Observable(function (subscriber) {
          var sub = new Subscription();
          sub.add(scheduler.schedule(function () {
              var observable$1 = input[observable]();
              sub.add(observable$1.subscribe({
                  next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                  error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                  complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
              }));
          }));
          return sub;
      });
  }

  /** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
  function schedulePromise(input, scheduler) {
      return new Observable(function (subscriber) {
          var sub = new Subscription();
          sub.add(scheduler.schedule(function () {
              return input.then(function (value) {
                  sub.add(scheduler.schedule(function () {
                      subscriber.next(value);
                      sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                  }));
              }, function (err) {
                  sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
              });
          }));
          return sub;
      });
  }

  /** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */
  function scheduleIterable(input, scheduler) {
      if (!input) {
          throw new Error('Iterable cannot be null');
      }
      return new Observable(function (subscriber) {
          var sub = new Subscription();
          var iterator$1;
          sub.add(function () {
              if (iterator$1 && typeof iterator$1.return === 'function') {
                  iterator$1.return();
              }
          });
          sub.add(scheduler.schedule(function () {
              iterator$1 = input[iterator]();
              sub.add(scheduler.schedule(function () {
                  if (subscriber.closed) {
                      return;
                  }
                  var value;
                  var done;
                  try {
                      var result = iterator$1.next();
                      value = result.value;
                      done = result.done;
                  }
                  catch (err) {
                      subscriber.error(err);
                      return;
                  }
                  if (done) {
                      subscriber.complete();
                  }
                  else {
                      subscriber.next(value);
                      this.schedule();
                  }
              }));
          }));
          return sub;
      });
  }

  /** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
  function isInteropObservable(input) {
      return input && typeof input[observable] === 'function';
  }

  /** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
  function isIterable(input) {
      return input && typeof input[iterator] === 'function';
  }

  /** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */
  function scheduled(input, scheduler) {
      if (input != null) {
          if (isInteropObservable(input)) {
              return scheduleObservable(input, scheduler);
          }
          else if (isPromise(input)) {
              return schedulePromise(input, scheduler);
          }
          else if (isArrayLike(input)) {
              return scheduleArray(input, scheduler);
          }
          else if (isIterable(input) || typeof input === 'string') {
              return scheduleIterable(input, scheduler);
          }
      }
      throw new TypeError((input !== null && typeof input || input) + ' is not observable');
  }

  /** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */
  function from(input, scheduler) {
      if (!scheduler) {
          if (input instanceof Observable) {
              return input;
          }
          return new Observable(subscribeTo(input));
      }
      else {
          return scheduled(input, scheduler);
      }
  }

  /** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_util_subscribeTo PURE_IMPORTS_END */
  var SimpleInnerSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(SimpleInnerSubscriber, _super);
      function SimpleInnerSubscriber(parent) {
          var _this = _super.call(this) || this;
          _this.parent = parent;
          return _this;
      }
      SimpleInnerSubscriber.prototype._next = function (value) {
          this.parent.notifyNext(value);
      };
      SimpleInnerSubscriber.prototype._error = function (error) {
          this.parent.notifyError(error);
          this.unsubscribe();
      };
      SimpleInnerSubscriber.prototype._complete = function () {
          this.parent.notifyComplete();
          this.unsubscribe();
      };
      return SimpleInnerSubscriber;
  }(Subscriber));
  var SimpleOuterSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(SimpleOuterSubscriber, _super);
      function SimpleOuterSubscriber() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
          this.destination.next(innerValue);
      };
      SimpleOuterSubscriber.prototype.notifyError = function (err) {
          this.destination.error(err);
      };
      SimpleOuterSubscriber.prototype.notifyComplete = function () {
          this.destination.complete();
      };
      return SimpleOuterSubscriber;
  }(Subscriber));
  function innerSubscribe(result, innerSubscriber) {
      if (innerSubscriber.closed) {
          return undefined;
      }
      if (result instanceof Observable) {
          return result.subscribe(innerSubscriber);
      }
      var subscription;
      try {
          subscription = subscribeTo(result)(innerSubscriber);
      }
      catch (error) {
          innerSubscriber.error(error);
      }
      return subscription;
  }

  /** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */
  function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
      }
      if (typeof resultSelector === 'function') {
          return function (source) { return source.pipe(mergeMap(function (a, i) { return from(project(a, i)).pipe(map$1(function (b, ii) { return resultSelector(a, b, i, ii); })); }, concurrent)); };
      }
      else if (typeof resultSelector === 'number') {
          concurrent = resultSelector;
      }
      return function (source) { return source.lift(new MergeMapOperator(project, concurrent)); };
  }
  var MergeMapOperator = /*@__PURE__*/ (function () {
      function MergeMapOperator(project, concurrent) {
          if (concurrent === void 0) {
              concurrent = Number.POSITIVE_INFINITY;
          }
          this.project = project;
          this.concurrent = concurrent;
      }
      MergeMapOperator.prototype.call = function (observer, source) {
          return source.subscribe(new MergeMapSubscriber(observer, this.project, this.concurrent));
      };
      return MergeMapOperator;
  }());
  var MergeMapSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(MergeMapSubscriber, _super);
      function MergeMapSubscriber(destination, project, concurrent) {
          if (concurrent === void 0) {
              concurrent = Number.POSITIVE_INFINITY;
          }
          var _this = _super.call(this, destination) || this;
          _this.project = project;
          _this.concurrent = concurrent;
          _this.hasCompleted = false;
          _this.buffer = [];
          _this.active = 0;
          _this.index = 0;
          return _this;
      }
      MergeMapSubscriber.prototype._next = function (value) {
          if (this.active < this.concurrent) {
              this._tryNext(value);
          }
          else {
              this.buffer.push(value);
          }
      };
      MergeMapSubscriber.prototype._tryNext = function (value) {
          var result;
          var index = this.index++;
          try {
              result = this.project(value, index);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          this.active++;
          this._innerSub(result);
      };
      MergeMapSubscriber.prototype._innerSub = function (ish) {
          var innerSubscriber = new SimpleInnerSubscriber(this);
          var destination = this.destination;
          destination.add(innerSubscriber);
          var innerSubscription = innerSubscribe(ish, innerSubscriber);
          if (innerSubscription !== innerSubscriber) {
              destination.add(innerSubscription);
          }
      };
      MergeMapSubscriber.prototype._complete = function () {
          this.hasCompleted = true;
          if (this.active === 0 && this.buffer.length === 0) {
              this.destination.complete();
          }
          this.unsubscribe();
      };
      MergeMapSubscriber.prototype.notifyNext = function (innerValue) {
          this.destination.next(innerValue);
      };
      MergeMapSubscriber.prototype.notifyComplete = function () {
          var buffer = this.buffer;
          this.active--;
          if (buffer.length > 0) {
              this._next(buffer.shift());
          }
          else if (this.active === 0 && this.hasCompleted) {
              this.destination.complete();
          }
      };
      return MergeMapSubscriber;
  }(SimpleOuterSubscriber));

  /** PURE_IMPORTS_START _mergeMap,_util_identity PURE_IMPORTS_END */
  function mergeAll(concurrent) {
      if (concurrent === void 0) {
          concurrent = Number.POSITIVE_INFINITY;
      }
      return mergeMap(identity, concurrent);
  }

  /** PURE_IMPORTS_START _mergeAll PURE_IMPORTS_END */
  function concatAll() {
      return mergeAll(1);
  }

  /** PURE_IMPORTS_START _of,_operators_concatAll PURE_IMPORTS_END */
  function concat() {
      var observables = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          observables[_i] = arguments[_i];
      }
      return concatAll()(of.apply(void 0, observables));
  }

  /** PURE_IMPORTS_START _isArray PURE_IMPORTS_END */
  function isNumeric(val) {
      return !isArray(val) && (val - parseFloat(val) + 1) >= 0;
  }

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric PURE_IMPORTS_END */
  function interval(period, scheduler) {
      if (period === void 0) {
          period = 0;
      }
      if (scheduler === void 0) {
          scheduler = async;
      }
      if (!isNumeric(period) || period < 0) {
          period = 0;
      }
      if (!scheduler || typeof scheduler.schedule !== 'function') {
          scheduler = async;
      }
      return new Observable(function (subscriber) {
          subscriber.add(scheduler.schedule(dispatch, period, { subscriber: subscriber, counter: 0, period: period }));
          return subscriber;
      });
  }
  function dispatch(state) {
      var subscriber = state.subscriber, counter = state.counter, period = state.period;
      subscriber.next(counter);
      this.schedule({ subscriber: subscriber, counter: counter + 1, period: period }, period);
  }

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function filter(predicate, thisArg) {
      return function filterOperatorFunction(source) {
          return source.lift(new FilterOperator(predicate, thisArg));
      };
  }
  var FilterOperator = /*@__PURE__*/ (function () {
      function FilterOperator(predicate, thisArg) {
          this.predicate = predicate;
          this.thisArg = thisArg;
      }
      FilterOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
      };
      return FilterOperator;
  }());
  var FilterSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(FilterSubscriber, _super);
      function FilterSubscriber(destination, predicate, thisArg) {
          var _this = _super.call(this, destination) || this;
          _this.predicate = predicate;
          _this.thisArg = thisArg;
          _this.count = 0;
          return _this;
      }
      FilterSubscriber.prototype._next = function (value) {
          var result;
          try {
              result = this.predicate.call(this.thisArg, value, this.count++);
          }
          catch (err) {
              this.destination.error(err);
              return;
          }
          if (result) {
              this.destination.next(value);
          }
      };
      return FilterSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _Observable,_scheduler_async,_util_isNumeric,_util_isScheduler PURE_IMPORTS_END */
  function timer(dueTime, periodOrScheduler, scheduler) {
      if (dueTime === void 0) {
          dueTime = 0;
      }
      var period = -1;
      if (isNumeric(periodOrScheduler)) {
          period = Number(periodOrScheduler) < 1 && 1 || Number(periodOrScheduler);
      }
      else if (isScheduler(periodOrScheduler)) {
          scheduler = periodOrScheduler;
      }
      if (!isScheduler(scheduler)) {
          scheduler = async;
      }
      return new Observable(function (subscriber) {
          var due = isNumeric(dueTime)
              ? dueTime
              : (+dueTime - scheduler.now());
          return scheduler.schedule(dispatch$1, due, {
              index: 0, period: period, subscriber: subscriber
          });
      });
  }
  function dispatch$1(state) {
      var index = state.index, period = state.period, subscriber = state.subscriber;
      subscriber.next(index);
      if (subscriber.closed) {
          return;
      }
      else if (period === -1) {
          return subscriber.complete();
      }
      state.index = index + 1;
      this.schedule(state, period);
  }

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function defaultIfEmpty(defaultValue) {
      if (defaultValue === void 0) {
          defaultValue = null;
      }
      return function (source) { return source.lift(new DefaultIfEmptyOperator(defaultValue)); };
  }
  var DefaultIfEmptyOperator = /*@__PURE__*/ (function () {
      function DefaultIfEmptyOperator(defaultValue) {
          this.defaultValue = defaultValue;
      }
      DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
      };
      return DefaultIfEmptyOperator;
  }());
  var DefaultIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
      __extends(DefaultIfEmptySubscriber, _super);
      function DefaultIfEmptySubscriber(destination, defaultValue) {
          var _this = _super.call(this, destination) || this;
          _this.defaultValue = defaultValue;
          _this.isEmpty = true;
          return _this;
      }
      DefaultIfEmptySubscriber.prototype._next = function (value) {
          this.isEmpty = false;
          this.destination.next(value);
      };
      DefaultIfEmptySubscriber.prototype._complete = function () {
          if (this.isEmpty) {
              this.destination.next(this.defaultValue);
          }
          this.destination.complete();
      };
      return DefaultIfEmptySubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */
  function distinctUntilChanged(compare, keySelector) {
      return function (source) { return source.lift(new DistinctUntilChangedOperator(compare, keySelector)); };
  }
  var DistinctUntilChangedOperator = /*@__PURE__*/ (function () {
      function DistinctUntilChangedOperator(compare, keySelector) {
          this.compare = compare;
          this.keySelector = keySelector;
      }
      DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
      };
      return DistinctUntilChangedOperator;
  }());
  var DistinctUntilChangedSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(DistinctUntilChangedSubscriber, _super);
      function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
          var _this = _super.call(this, destination) || this;
          _this.keySelector = keySelector;
          _this.hasKey = false;
          if (typeof compare === 'function') {
              _this.compare = compare;
          }
          return _this;
      }
      DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
          return x === y;
      };
      DistinctUntilChangedSubscriber.prototype._next = function (value) {
          var key;
          try {
              var keySelector = this.keySelector;
              key = keySelector ? keySelector(value) : value;
          }
          catch (err) {
              return this.destination.error(err);
          }
          var result = false;
          if (this.hasKey) {
              try {
                  var compare = this.compare;
                  result = compare(this.key, key);
              }
              catch (err) {
                  return this.destination.error(err);
              }
          }
          else {
              this.hasKey = true;
          }
          if (!result) {
              this.key = key;
              this.destination.next(value);
          }
      };
      return DistinctUntilChangedSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START tslib,_util_EmptyError,_Subscriber PURE_IMPORTS_END */
  function throwIfEmpty(errorFactory) {
      if (errorFactory === void 0) {
          errorFactory = defaultErrorFactory;
      }
      return function (source) {
          return source.lift(new ThrowIfEmptyOperator(errorFactory));
      };
  }
  var ThrowIfEmptyOperator = /*@__PURE__*/ (function () {
      function ThrowIfEmptyOperator(errorFactory) {
          this.errorFactory = errorFactory;
      }
      ThrowIfEmptyOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new ThrowIfEmptySubscriber(subscriber, this.errorFactory));
      };
      return ThrowIfEmptyOperator;
  }());
  var ThrowIfEmptySubscriber = /*@__PURE__*/ (function (_super) {
      __extends(ThrowIfEmptySubscriber, _super);
      function ThrowIfEmptySubscriber(destination, errorFactory) {
          var _this = _super.call(this, destination) || this;
          _this.errorFactory = errorFactory;
          _this.hasValue = false;
          return _this;
      }
      ThrowIfEmptySubscriber.prototype._next = function (value) {
          this.hasValue = true;
          this.destination.next(value);
      };
      ThrowIfEmptySubscriber.prototype._complete = function () {
          if (!this.hasValue) {
              var err = void 0;
              try {
                  err = this.errorFactory();
              }
              catch (e) {
                  err = e;
              }
              this.destination.error(err);
          }
          else {
              return this.destination.complete();
          }
      };
      return ThrowIfEmptySubscriber;
  }(Subscriber));
  function defaultErrorFactory() {
      return new EmptyError();
  }

  /** PURE_IMPORTS_START tslib,_Subscriber,_util_ArgumentOutOfRangeError,_observable_empty PURE_IMPORTS_END */
  function take(count) {
      return function (source) {
          if (count === 0) {
              return empty$3();
          }
          else {
              return source.lift(new TakeOperator(count));
          }
      };
  }
  var TakeOperator = /*@__PURE__*/ (function () {
      function TakeOperator(total) {
          this.total = total;
          if (this.total < 0) {
              throw new ArgumentOutOfRangeError;
          }
      }
      TakeOperator.prototype.call = function (subscriber, source) {
          return source.subscribe(new TakeSubscriber(subscriber, this.total));
      };
      return TakeOperator;
  }());
  var TakeSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(TakeSubscriber, _super);
      function TakeSubscriber(destination, total) {
          var _this = _super.call(this, destination) || this;
          _this.total = total;
          _this.count = 0;
          return _this;
      }
      TakeSubscriber.prototype._next = function (value) {
          var total = this.total;
          var count = ++this.count;
          if (count <= total) {
              this.destination.next(value);
              if (count === total) {
                  this.destination.complete();
                  this.unsubscribe();
              }
          }
      };
      return TakeSubscriber;
  }(Subscriber));

  /** PURE_IMPORTS_START _util_EmptyError,_filter,_take,_defaultIfEmpty,_throwIfEmpty,_util_identity PURE_IMPORTS_END */
  function first(predicate, defaultValue) {
      var hasDefaultValue = arguments.length >= 2;
      return function (source) { return source.pipe(predicate ? filter(function (v, i) { return predicate(v, i, source); }) : identity, take(1), hasDefaultValue ? defaultIfEmpty(defaultValue) : throwIfEmpty(function () { return new EmptyError(); })); };
  }

  /** PURE_IMPORTS_START _observable_concat,_util_isScheduler PURE_IMPORTS_END */
  function startWith() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          array[_i] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler(scheduler)) {
          array.pop();
          return function (source) { return concat(array, source, scheduler); };
      }
      else {
          return function (source) { return concat(array, source); };
      }
  }

  /** PURE_IMPORTS_START tslib,_innerSubscribe PURE_IMPORTS_END */
  function takeUntil(notifier) {
      return function (source) { return source.lift(new TakeUntilOperator(notifier)); };
  }
  var TakeUntilOperator = /*@__PURE__*/ (function () {
      function TakeUntilOperator(notifier) {
          this.notifier = notifier;
      }
      TakeUntilOperator.prototype.call = function (subscriber, source) {
          var takeUntilSubscriber = new TakeUntilSubscriber(subscriber);
          var notifierSubscription = innerSubscribe(this.notifier, new SimpleInnerSubscriber(takeUntilSubscriber));
          if (notifierSubscription && !takeUntilSubscriber.seenValue) {
              takeUntilSubscriber.add(notifierSubscription);
              return source.subscribe(takeUntilSubscriber);
          }
          return takeUntilSubscriber;
      };
      return TakeUntilOperator;
  }());
  var TakeUntilSubscriber = /*@__PURE__*/ (function (_super) {
      __extends(TakeUntilSubscriber, _super);
      function TakeUntilSubscriber(destination) {
          var _this = _super.call(this, destination) || this;
          _this.seenValue = false;
          return _this;
      }
      TakeUntilSubscriber.prototype.notifyNext = function () {
          this.seenValue = true;
          this.complete();
      };
      TakeUntilSubscriber.prototype.notifyComplete = function () {
      };
      return TakeUntilSubscriber;
  }(SimpleOuterSubscriber));

  var POLLING_INTERVAL = 1500;
  var Daemon = /*#__PURE__*/function () {
    function Daemon() {
      var _this = this;
      var boardsUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'https://builder.arduino.cc/v3/boards';
      _classCallCheck(this, Daemon);
      this.BOARDS_URL = boardsUrl;
      this.UPLOAD_NOPE = 'UPLOAD_NOPE';
      this.UPLOAD_DONE = 'UPLOAD_DONE';
      this.UPLOAD_ERROR = 'UPLOAD_ERROR';
      this.UPLOAD_IN_PROGRESS = 'UPLOAD_IN_PROGRESS';
      this.DOWNLOAD_DONE = 'DOWNLOAD_DONE';
      this.DOWNLOAD_NOPE = 'DOWNLOAD_NOPE';
      this.DOWNLOAD_ERROR = 'DOWNLOAD_ERROR';
      this.DOWNLOAD_IN_PROGRESS = 'DOWNLOAD_IN_PROGRESS';
      this.agentInfo = {};
      this.agentFound = new BehaviorSubject(null);
      this.channelOpen = new BehaviorSubject(null);
      this.channelOpenStatus = this.channelOpen.pipe(distinctUntilChanged());
      this.error = new BehaviorSubject(null).pipe(distinctUntilChanged());
      this.serialMonitorError = new BehaviorSubject(null);
      this.appMessages = new Subject();
      this.serialMonitorOpened = new BehaviorSubject(false);
      this.serialMonitorMessages = new Subject();
      this.serialMonitorMessagesWithPort = new Subject();
      this.uploading = new BehaviorSubject({
        status: this.UPLOAD_NOPE
      });
      this.uploadingDone = this.uploading.pipe(filter(function (upload) {
        return upload.status === _this.UPLOAD_DONE;
      })).pipe(first()).pipe(takeUntil(this.uploading.pipe(filter(function (upload) {
        return upload.status === _this.UPLOAD_ERROR;
      }))));
      this.uploadingError = this.uploading.pipe(filter(function (upload) {
        return upload.status === _this.UPLOAD_ERROR;
      })).pipe(first()).pipe(takeUntil(this.uploadingDone));
      this.uploadInProgress = this.uploading.pipe(filter(function (upload) {
        return upload.status === _this.UPLOAD_IN_PROGRESS;
      }));
      this.devicesList = new BehaviorSubject({
        serial: [],
        network: []
      });
      this.supportedBoards = new BehaviorSubject([]);
      this.appMessages.subscribe(function (message) {
        return _this.handleAppMessage(message);
      });

      // Close all serial ports on startup
      this.devicesList.pipe(filter(function (devices) {
        return devices.serial && devices.serial.length > 0;
      })).pipe(first()).subscribe(function () {
        return _this.closeAllPorts();
      });
      this.downloading = new BehaviorSubject({
        status: this.DOWNLOAD_NOPE
      });
      this.downloadingDone = this.downloading.pipe(filter(function (download) {
        return download.status === _this.DOWNLOAD_DONE;
      })).pipe(first()).pipe(takeUntil(this.downloading.pipe(filter(function (download) {
        return download.status === _this.DOWNLOAD_ERROR;
      }))));
      this.downloadingError = this.downloading.pipe(filter(function (download) {
        return download.status === _this.DOWNLOAD_ERROR;
      })).pipe(first()).pipe(takeUntil(this.downloadingDone));
      this.boardPortAfterUpload = new Subject().pipe(first());
      this.uploadingPort = null;
    }
    _createClass(Daemon, [{
      key: "notifyUploadError",
      value: function notifyUploadError(err) {
        this.uploading.next({
          status: this.UPLOAD_ERROR,
          err: err
        });
      }
    }, {
      key: "openChannel",
      value: function openChannel(cb) {
        var _this2 = this;
        this.channelOpen.subscribe(function (open) {
          if (open) {
            interval(POLLING_INTERVAL).pipe(startWith(0)).pipe(takeUntil(_this2.channelOpen.pipe(filter(function (status) {
              return !status;
            })))).subscribe(cb);
          } else {
            _this2.devicesList.next({
              serial: [],
              network: []
            });
            _this2.agentFound.next(false);
          }
        });
      }

      /**
       * Upload a sketch to serial target
       * Fetch commandline from boards API for serial upload
       * @param {Object} target
       * @param {string} sketchName
       * @param {Object} compilationResult
       * @param {boolean} verbose
       * @param {any[]} dialogCustomizations Optional - Used in Web Serial API to customize the permission dialogs.
       *        It's an array because the Web Serial API library can use more than one dialog, e.g. one to
       *        ask permission and one to give instruction to save an UF2 file.
       *        It's called 'customizations' because the library already provides a basic non-styled dialog.
       */
    }, {
      key: "uploadSerial",
      value: function uploadSerial(target, sketchName, compilationResult) {
        var _this3 = this;
        var verbose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var dialogCustomizations = arguments.length > 4 ? arguments[4] : undefined;
        this.uploadingPort = target.port;
        this.uploading.next({
          status: this.UPLOAD_IN_PROGRESS,
          msg: 'Upload started'
        });
        this.serialDevicesBeforeUpload = this.devicesList.getValue().serial;
        this.closeSerialMonitor(target.port);

        // Fetch command line for the board
        fetch("".concat(this.BOARDS_URL, "/").concat(target.board, "/compute"), {
          method: 'POST',
          body: JSON.stringify({
            action: 'upload',
            verbose: verbose,
            os: this.agentInfo.os
          })
        }).then(function (result) {
          return result.json();
        }).then(function (uploadCommandInfo) {
          var ext = Daemon._extractExtensionFromCommandline(uploadCommandInfo.commandline);
          var data = compilationResult[ext] || compilationResult.bin;
          if (!ext || !data) {
            console.log('we received a faulty ext property, defaulting to .bin');
            ext = 'bin';
          }
          var uploadPayload = _objectSpread2(_objectSpread2({}, target), {}, {
            commandline: uploadCommandInfo.commandline,
            filename: "".concat(sketchName, ".").concat(ext),
            hex: data,
            // For desktop agent
            data: data,
            // For chromeOS plugin, consider to align this
            dialogCustomizations: dialogCustomizations // used only in Web Serial API uploader
          });
          _this3.uploadingDone.subscribe(function () {
            _this3.waitingForPortToComeUp = timer(1000).subscribe(function () {
              var currentSerialDevices = _this3.devicesList.getValue().serial;
              var boardFound = currentSerialDevices.find(function (device) {
                return device.Name === _this3.uploadingPort;
              });
              if (!boardFound) {
                boardFound = currentSerialDevices.find(function (d) {
                  return _this3.serialDevicesBeforeUpload.every(function (e) {
                    return e.Name !== d.Name;
                  });
                });
                if (boardFound) {
                  _this3.uploadingPort = boardFound.Name;
                  _this3.boardPortAfterUpload.next({
                    hasChanged: true,
                    newPort: _this3.uploadingPort
                  });
                }
              }
              if (boardFound) {
                _this3.waitingForPortToComeUp.unsubscribe();
                _this3.uploadingPort = null;
                _this3.serialDevicesBeforeUpload = null;
                _this3.boardPortAfterUpload.next({
                  hasChanged: false
                });
              }
            });
          });
          var files = [].concat(_toConsumableArray(uploadCommandInfo.files || []), _toConsumableArray(compilationResult.files || []));
          _this3._upload(uploadPayload, _objectSpread2(_objectSpread2({}, uploadCommandInfo), {}, {
            files: files
          }));
        });
      }

      /**
       * Compares 2 devices list checking they contains the same ports in the same order
       * @param {Array<device>} a the first list
       * @param {Array<device>} b the second list
       */
    }, {
      key: "stopUpload",
      value:
      /**
       * Interrupt upload - not supported in Chrome app
       */
      function stopUpload() {
        if (typeof this.stopUploadCommand === 'function') {
          this.stopUploadCommand();
        } else {
          throw new Error('Stop Upload not supported on Chrome OS');
        }
      }

      /**
       * Set the board in bootloader mode. This is needed to bo 100% sure to receive the correct vid/pid from the board.
       * To do that we just touch the port at 1200 bps and then close it. The sketch on the board will be erased.
       * @param {String} port the port name
       */
    }, {
      key: "setBootloaderMode",
      value: function setBootloaderMode(port) {
        var _this4 = this;
        this.serialMonitorOpened.pipe(filter(function (open) {
          return open;
        })).pipe(first()).subscribe(function () {
          timer(1000).subscribe(function () {
            return _this4.closeSerialMonitor(port);
          });
        });
        this.openSerialMonitor(port, 1200);
      }
    }], [{
      key: "devicesListAreEquals",
      value: function devicesListAreEquals(a, b) {
        if (!a || !b || a.length !== b.length) {
          return false;
        }
        return a.every(function (item, index) {
          return b[index].Name === item.Name && b[index].IsOpen === item.IsOpen;
        });
      }
    }, {
      key: "_extractExtensionFromCommandline",
      value: function _extractExtensionFromCommandline(commandline) {
        var rx = /\{build\.project_name\}\.(\w\w\w)\b/g;
        var arr = rx.exec(commandline);
        if (arr && arr.length > 0) {
          return arr[1];
        }
        return null;
      }
    }]);
    return Daemon;
  }();

  var SocketDaemonV2 = /*#__PURE__*/function () {
    function SocketDaemonV2(daemonURL) {
      _classCallCheck(this, SocketDaemonV2);
      this.daemonURL = "".concat(daemonURL, "/v2");
    }

    // init tries an HEAD
    _createClass(SocketDaemonV2, [{
      key: "init",
      value: function init() {
        return fetch("".concat(this.daemonURL, "/pkgs/tools/installed"), {
          method: 'HEAD'
        }).then(function (res) {
          if (res.status !== 200) {
            throw Error('v2 not available');
          }
          return res;
        });
      }

      // installedTools uses the new v2 apis to ask the daemon a list of the tools already present in the system
    }, {
      key: "installedTools",
      value: function installedTools() {
        return fetch("".concat(this.daemonURL, "/pkgs/tools/installed"), {
          method: 'GET'
        }).then(function (res) {
          return res.json();
        });
      }

      // installTool uses the new v2 apis to ask the daemon to download a specific tool on the system
      // The expected payload is
      // {
      //   "name": "avrdude",
      //   "version": "6.3.0-arduino9",
      //   "packager": "arduino",
      //   "url": "https://downloads.arduino.cc/...", // system-specific package containing the tool
      //   "signature": "e7Gh8309...",  // proof that the url comes from a trusted source
      //   "checksum": "SHA256:90384nhfoso8..." // proof that the package wasn't tampered with
      // }
    }, {
      key: "installTool",
      value: function installTool(payload) {
        return fetch("".concat(this.daemonURL, "/pkgs/tools/installed"), {
          method: 'POST',
          body: JSON.stringify(payload)
        }).then(function (res) {
          return res.json().then(function (json) {
            if (!res.ok) {
              var error = _objectSpread2(_objectSpread2({}, json), {}, {
                status: res.status,
                statusText: res.statusText
              });
              return Promise.reject(error);
            }
            return json;
          });
        });
      }
    }]);
    return SocketDaemonV2;
  }();

  // Required agent version
  var browser$3 = detectBrowser_4();
  var POLLING_INTERVAL$1 = 3500;
  var PROTOCOL = {
    HTTP: 'http',
    HTTPS: 'https'
  };
  var LOOPBACK_ADDRESS = "".concat(PROTOCOL.HTTP, "://127.0.0.1");
  var LOOPBACK_HOST = "".concat(PROTOCOL.HTTPS, "://localhost");
  var LOOKUP_PORT_START = 8991;
  var LOOKUP_PORT_END = 9000;
  var orderedPluginAddresses = [LOOPBACK_ADDRESS, LOOPBACK_HOST];
  var driversRequested = false;
  var CANT_FIND_AGENT_MESSAGE = 'Arduino Create Agent cannot be found';
  var UPLOAD_DONE_TIMER = 10000;
  if (browser$3.name !== 'chrome' && browser$3.name !== 'firefox') {
    orderedPluginAddresses = [LOOPBACK_HOST, LOOPBACK_ADDRESS];
  }
  var SocketDaemon = /*#__PURE__*/function (_Daemon) {
    _inherits(SocketDaemon, _Daemon);
    function SocketDaemon(boardsUrl) {
      var _this;
      _classCallCheck(this, SocketDaemon);
      _this = _callSuper(this, SocketDaemon, [boardsUrl]);
      _this.selectedProtocol = PROTOCOL.HTTP;
      _this.socket = null;
      _this.pluginURL = null;
      _this.disabled = false;
      _this.openChannel(function () {
        return _this.socket.emit('command', 'list');
      });
      _this.agentV2Found = new BehaviorSubject(null);
      _this.agentFound.subscribe(function (agentFound) {
        if (agentFound) {
          _this._wsConnect();
          var v2 = new SocketDaemonV2(_this.pluginURL);
          v2.init().then(function () {
            _this.v2 = v2;
            _this.agentV2Found.next(_this.v2);
          });
        } else {
          _this.findAgent();
        }
      });
      return _this;
    }
    _createClass(SocketDaemon, [{
      key: "initSocket",
      value: function initSocket() {
        var _this2 = this;
        this.socket.on('message', function (message) {
          try {
            _this2.appMessages.next(JSON.parse(message));
          } catch (SyntaxError) {
            _this2.appMessages.next(message);
          }
        });
      }
    }, {
      key: "notifyDownloadError",
      value: function notifyDownloadError(err) {
        this.downloading.next({
          status: this.DOWNLOAD_ERROR,
          err: err
        });
      }

      /**
       * Look for the agent endpoint.
       * First search in LOOPBACK_ADDRESS, after in LOOPBACK_HOST if in Chrome or Firefox, otherwise vice versa.
       */
    }, {
      key: "findAgent",
      value: function findAgent() {
        var _this3 = this;
        if (this.disabled) {
          return;
        }
        if (this.pluginURL) {
          fetch("".concat(this.pluginURL, "/info")).then(function (response) {
            return response.json().then(function (data) {
              _this3.agentInfo = data;
              _this3.agentFound.next(true);
            });
          })["catch"](function () {
            return timer(POLLING_INTERVAL$1).subscribe(function () {
              _this3.pluginURL = null;
              _this3.findAgent();
            });
          });
          return;
        }
        this._tryPorts(orderedPluginAddresses[0])["catch"](function () {
          return _this3._tryPorts(orderedPluginAddresses[1]);
        }).then(function () {
          return _this3.agentFound.next(true);
        })["catch"](function () {
          return timer(POLLING_INTERVAL$1).subscribe(function () {
            return _this3.findAgent();
          });
        });
      }

      /**
       * Try ports for the selected host. From LOOKUP_PORT_START to LOOKUP_PORT_END
       * @param {string} host - The host value (LOOPBACK_ADDRESS or LOOPBACK_HOST).
       * @return {Promise} info - A promise resolving with the agent info values.
       */
    }, {
      key: "_tryPorts",
      value: function _tryPorts(host) {
        var _this4 = this;
        var pluginLookups = [];
        for (var port = LOOKUP_PORT_START; port < LOOKUP_PORT_END; port += 1) {
          pluginLookups.push(fetch("".concat(host, ":").concat(port, "/info")).then(function (response) {
            return response.json().then(function (data) {
              return {
                response: response,
                data: data
              };
            });
          })["catch"](function () {
            return Promise.resolve(false);
          }));
          // We expect most of those call to fail, because there's only one agent
          // So we have to resolve them with a false value to let the Promise.all catch all the deferred data
        }
        return Promise.all(pluginLookups).then(function (responses) {
          var found = responses.some(function (r) {
            if (r && r.response && r.response.status === 200) {
              _this4.agentInfo = r.data;
              if (_this4.agentInfo.update_url.indexOf('downloads.arduino.cc') === -1) {
                _this4.error.next('unofficial plugin');
              }
              if (r.response.url.indexOf(PROTOCOL.HTTPS) === 0) {
                _this4.selectedProtocol = PROTOCOL.HTTPS;
              } else {
                // Protocol http, force 127.0.0.1 for old agent versions too
                _this4.agentInfo[_this4.selectedProtocol] = _this4.agentInfo[_this4.selectedProtocol].replace('localhost', '127.0.0.1');
              }
              _this4.pluginURL = _this4.agentInfo[_this4.selectedProtocol];
              return true;
            }
            return false;
          });
          if (found) {
            return fetch('https://downloads.arduino.cc/agent-metadata/agent-version.json').then(function (response) {
              return response.json().then(function (data) {
                if (_this4.agentInfo.version && (semverCompare(_this4.agentInfo.version, data.Version) === 0 || _this4.agentInfo.version.indexOf('dev') !== -1 || _this4.agentInfo.version.indexOf('rc') !== -1)) {
                  return _this4.agentInfo;
                }
                {
                  return _this4.update();
                }
              });
            })
            // If version API broken, go ahead with current version
            ["catch"](function () {
              return _this4.agentInfo;
            });
          }

          // Set channelOpen false for the first time
          if (_this4.channelOpen.getValue() === null) {
            _this4.channelOpen.next(false);
          }
          return Promise.reject(new Error("".concat(CANT_FIND_AGENT_MESSAGE, " at ").concat(host)));
        });
      }

      /**
       * Uses the websocket protocol to connect to the agent
       */
    }, {
      key: "_wsConnect",
      value: function _wsConnect() {
        var _this5 = this;
        var wsProtocol = this.selectedProtocol === PROTOCOL.HTTPS ? 'wss' : 'ws';
        var address = this.agentInfo[wsProtocol];

        // Reset
        if (this.socket) {
          this.socket.destroy();
          delete this.socket;
          this.socket = null;
        }
        this.socket = lib$2(address);
        this.socket.on('connect', function () {
          // On connect download windows drivers which are indispensable for detection of boards
          if (!driversRequested) {
            _this5.downloadTool('windows-drivers', 'latest', 'arduino');
            _this5.downloadTool('bossac', '1.7.0', 'arduino');
            _this5.downloadTool('arduino-fwuploader', 'latest', 'arduino');
            _this5.downloadTool('rp2040tools', 'latest', 'arduino');
            driversRequested = false;
          }
          _this5.initSocket();
          _this5.channelOpen.next(true);
        });
        this.socket.on('error', function (error) {
          _this5.socket.disconnect();
          _this5.error.next(error);
        });
        this.socket.on('disconnect', function () {
          _this5.socket.disconnect();
          _this5.channelOpen.next(false);
        });
      }
    }, {
      key: "handleAppMessage",
      value: function handleAppMessage(message) {
        // Result of a list command
        if (message.Ports) {
          this.handleListMessage(message);
        }
        // Serial monitor message
        if (message.D) {
          this.serialMonitorMessages.next(message.D);
          this.serialMonitorMessagesWithPort.next(message);
        }
        if (message.ProgrammerStatus) {
          this.handleUploadMessage(message);
        }
        if (message.DownloadStatus) {
          this.handleDownloadMessage(message);
        }
        if (message.Err) {
          this.uploading.next({
            status: this.UPLOAD_ERROR,
            err: message.Err
          });
        }
        if (message.Error) {
          if (message.Error.indexOf('trying to close') !== -1) {
            // https://github.com/arduino/arduino-create-agent#openclose-ports
            this.serialMonitorOpened.next(false);
          }
        }
      }
    }, {
      key: "handleListMessage",
      value: function handleListMessage(message) {
        var lastDevices = this.devicesList.getValue();
        if (message.Network && !Daemon.devicesListAreEquals(lastDevices.network, message.Ports)) {
          this.devicesList.next({
            serial: lastDevices.serial,
            network: message.Ports
          });
        } else if (!message.Network && !Daemon.devicesListAreEquals(lastDevices.serial, message.Ports)) {
          this.devicesList.next({
            serial: message.Ports,
            network: lastDevices.network
          });
        }
      }

      /**
       * Check the agent version and call the update if needed.
       */
    }, {
      key: "update",
      value: function update() {
        var _this6 = this;
        return fetch("".concat(this.agentInfo[this.selectedProtocol], "/update"), {
          method: 'POST'
        }).then(function (result) {
          return result.json();
        }).then(function (response) {
          if (response && response.error && (response.error.indexOf('proxy') !== -1 || response.error.indexOf('dial tcp') !== -1)) {
            _this6.error.next('proxy error');
            return new Error('proxy error');
          }
          // We reject the promise because the daemon will be restarted, we need to continue looking for the port
          return Promise.reject();
        })["catch"](function () {
          console.log('update plugin failed');
        });
      }

      /**
       * Pauses the plugin
       * @return {Promise}
       */
    }, {
      key: "stopPlugin",
      value: function stopPlugin() {
        if (this.agentFound.getValue()) {
          return fetch("".concat(this.agentInfo[this.selectedProtocol], "/pause"), {
            method: 'POST'
          });
        }
      }

      /**
       * Send 'close' command to all the available serial ports
       */
    }, {
      key: "closeAllPorts",
      value: function closeAllPorts() {
        var _this7 = this;
        var devices = this.devicesList.getValue().serial;
        devices.forEach(function (device) {
          _this7.socket.emit('command', "close ".concat(device.Name));
        });
      }

      /**
       * Send 'message' to serial port
       * @param {string} port the port name
       * @param {string} message the text to be sent to serial
       */
    }, {
      key: "writeSerial",
      value: function writeSerial(port, message) {
        this.socket.emit('command', "send ".concat(port, " ").concat(message));
      }

      /**
       * Request serial port open
       * @param {string} port the port name
       */
    }, {
      key: "openSerialMonitor",
      value: function openSerialMonitor(port) {
        var _this8 = this;
        var baudrate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9600;
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort) {
          return this.serialMonitorError.next("Can't find board at ".concat(port));
        }
        if (this.uploading.getValue().status === this.UPLOAD_IN_PROGRESS || serialPort.IsOpen) {
          return;
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return open;
        })))).subscribe(function (message) {
          if (message.Cmd === 'Open') {
            _this8.serialMonitorOpened.next(true);
          }
          if (message.Cmd === 'OpenFail') {
            _this8.serialMonitorError.next("Failed to open serial monitor at ".concat(port));
          }
        });
        this.socket.emit('command', "open ".concat(port, " ").concat(baudrate, " timed"));
      }

      /**
       * Request serial port close
       * @param {string} port the port name
       */
    }, {
      key: "closeSerialMonitor",
      value: function closeSerialMonitor(port) {
        var _this9 = this;
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort || !serialPort.IsOpen) {
          return;
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return !open;
        })))).subscribe(function (message) {
          if (message.Cmd === 'Close') {
            _this9.serialMonitorOpened.next(false);
          }
          if (message.Cmd === 'CloseFail') {
            _this9.serialMonitorError.next("Failed to close serial monitor at ".concat(port));
          }
        });
        this.socket.emit('command', "close ".concat(port));
      }
    }, {
      key: "handleUploadMessage",
      value: function handleUploadMessage(message) {
        var _this10 = this;
        if (message.Flash === 'Ok' && message.ProgrammerStatus === 'Done') {
          // After the upload is completed the port goes down for a while, so we have to wait a few seconds
          return timer(UPLOAD_DONE_TIMER).subscribe(function () {
            return _this10.uploading.next({
              status: _this10.UPLOAD_DONE,
              msg: message.Flash
            });
          });
        }
        switch (message.ProgrammerStatus) {
          case 'Starting':
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: "Programming with: ".concat(message.Cmd)
            });
            break;
          case 'Busy':
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: message.Msg
            });
            break;
          case 'Error':
            this.uploading.next({
              status: this.UPLOAD_ERROR,
              err: message.Msg
            });
            break;
          case 'Killed':
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: "terminated by user"
            });
            this.uploading.next({
              status: this.UPLOAD_ERROR,
              err: "terminated by user"
            });
            break;
          case 'Error 404 Not Found':
            this.uploading.next({
              status: this.UPLOAD_ERROR,
              err: message.Msg
            });
            break;
          default:
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: message.Msg
            });
        }
      }
    }, {
      key: "handleDownloadMessage",
      value: function handleDownloadMessage(message) {
        switch (message.DownloadStatus) {
          case 'Pending':
            this.downloading.next({
              status: this.DOWNLOAD_IN_PROGRESS,
              msg: message.Msg
            });
            break;
          case 'Success':
            this.downloading.next({
              status: this.DOWNLOAD_DONE,
              msg: message.Msg
            });
            break;
          case 'Error':
            this.downloading.next({
              status: this.DOWNLOAD_ERROR,
              err: message.Msg
            });
            break;
          default:
            this.downloading.next({
              status: this.DOWNLOAD_IN_PROGRESS,
              msg: message.Msg
            });
        }
      }

      /**
       * Perform an upload via http on the daemon
       * @param {Object} data
       */
    }, {
      key: "daemonUpload",
      value: function daemonUpload(data) {
        var _this11 = this;
        fetch("".concat(this.pluginURL, "/upload"), {
          method: 'POST',
          body: JSON.stringify(data)
        }).then(function (result) {
          if (!result.ok) {
            _this11.uploading.next({
              status: _this11.UPLOAD_ERROR,
              err: result.statusText
            });
          }
        })["catch"](function (error) {
          _this11.uploading.next({
            status: _this11.UPLOAD_ERROR,
            err: error
          });
        });
      }

      /**
       * Upload compiled sketch to serial target
       * @param {Object} uploadPayload payload properties defined in parent
       * @param {Object} uploadCommandInfo = {
       *  commandline: "commandline to execute, for serial upload",
          signature: "signature of the commandline",
       *  options: {
       *    wait_for_upload_port: true or false,
       *    use_1200bps_touch: true or false,
       *  },
       *  tools: [{
       *      name: 'avrdude',
       *      packager: 'arduino',
       *      version '6.3.0-arduino9'
       *    },
       *    {...}
       *  ]
       * }
       */
    }, {
      key: "_upload",
      value: function _upload(uploadPayload, uploadCommandInfo) {
        var _this12 = this;
        // Wait for tools to be installed
        var promises = [];
        if (Array.isArray(uploadCommandInfo.tools)) {
          uploadCommandInfo.tools.forEach(function (tool) {
            if (_this12.v2) {
              _this12.downloading.next({
                status: _this12.DOWNLOAD_IN_PROGRESS
              });
              promises.push(_this12.v2.installTool(tool).then(function () {
                _this12.downloading.next({
                  status: _this12.DOWNLOAD_DONE
                });
              }));
            } else {
              _this12.downloadTool(tool.name, tool.version, tool.packager);
            }
          });
        }
        var socketParameters = _objectSpread2(_objectSpread2({}, uploadPayload), {}, {
          extra: _objectSpread2(_objectSpread2({}, uploadPayload.extra), {}, {
            wait_for_upload_port: uploadCommandInfo.options.wait_for_upload_port === 'true' || uploadCommandInfo.options.wait_for_upload_port === true,
            use_1200bps_touch: uploadCommandInfo.options.use_1200bps_touch === 'true' || uploadCommandInfo.options.use_1200bps_touch === true
          }),
          extrafiles: uploadCommandInfo.files || []
          // Consider to push extra resource files from sketch in future if feature requested (from data folder)
        });
        if (!socketParameters.extra.network) {
          socketParameters.signature = uploadCommandInfo.signature;
        }
        Promise.all(promises).then(function () {
          _this12.serialMonitorOpened.pipe(filter(function (open) {
            return !open;
          })).pipe(first()).subscribe(function () {
            _this12.daemonUpload(socketParameters);
          });
        });
        this.downloadingError.subscribe(function (error) {
          return _this12.uploading.next({
            status: _this12.UPLOAD_ERROR,
            err: error
          });
        });
      }

      /**
       * Upload compiled sketch to network target
       * @param {Object} target = {
       *    board: 'fqbn',
       *    port: 'ip address',
       *    extra: {},
       * }
       * @param {string} sketchName
       * @param {Object} compilationResult
       */
    }, {
      key: "uploadNetwork",
      value: function uploadNetwork(target, sketchName, compilationResult) {
        this.uploading.next({
          status: this.UPLOAD_IN_PROGRESS
        });
        var uploadPayload = _objectSpread2(_objectSpread2({}, target), {}, {
          filename: "".concat(sketchName, ".hex"),
          hex: compilationResult.hex
        });
        this.daemonUpload(uploadPayload);
      }

      /**
       * Upload file to network target (arduino-connector)
       * @param {Object} target
       * @param {string} sketchName
       * @param {Object} encodedFile
       * @param {Object} commandData {commandline: '', signature: ''}
       */
    }, {
      key: "uploadConnector",
      value: function uploadConnector(target, sketchName, encodedFile, commandData) {
        this.uploading.next({
          status: this.UPLOAD_IN_PROGRESS
        });
        var uploadPayload = _objectSpread2(_objectSpread2({}, target), {}, {
          commandline: commandData.commandline,
          signature: commandData.signature,
          filename: sketchName,
          hex: encodedFile
        });
        this.daemonUpload(uploadPayload);
      }

      /**
       * Download tool
       * @param {string} toolName
       * @param {string} toolVersion
       * @param {string} packageName
       * @param {string} replacementStrategy
       */
    }, {
      key: "downloadTool",
      value: function downloadTool(toolName, toolVersion, packageName) {
        var replacementStrategy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'keep';
        this.downloading.next({
          status: this.DOWNLOAD_IN_PROGRESS
        });
        this.socket.emit('command', "downloadtool ".concat(toolName, " ").concat(toolVersion, " ").concat(packageName, " ").concat(replacementStrategy));
      }

      /**
       * Interrupt upload
       */
    }, {
      key: "stopUploadCommand",
      value: function stopUploadCommand() {
        this.uploading.next({
          status: this.UPLOAD_ERROR,
          err: 'upload stopped'
        });
        this.socket.emit('command', 'killupload');
      }
    }, {
      key: "disable",
      value: function disable() {
        this.disabled = true;
      }
    }, {
      key: "enable",
      value: function enable() {
        this.disable = false;
        this.findAgent();
      }
    }]);
    return SocketDaemon;
  }(Daemon);

  /**
   * WARNING: the WebSerialDaemon with support for the Web Serial API is still in an alpha version.
   * At the moment it doesn't implement all the features available in the Chrome App Deamon
   * Use at your own risk.
   *
   * The `channel` parameter in the constructor is the component which is
   * used to interact with the Web Serial API.
   *
   * It must provide a `postMessage` method, similarly to the object created with `chrome.runtime.connect` in
   * the `chrome-app-daemon.js` module, which is used to send messages to interact with the Web Serial API.
   */
  var WebSerialDaemon = /*#__PURE__*/function (_Daemon) {
    _inherits(WebSerialDaemon, _Daemon);
    function WebSerialDaemon(boardsUrl, channel) {
      var _this;
      _classCallCheck(this, WebSerialDaemon);
      _this = _callSuper(this, WebSerialDaemon, [boardsUrl]);
      _this.port = null;
      _this.channelOpenStatus.next(true);
      _this.channel = channel; // channel is injected from the client app
      _this.connectedPorts = [];
      _this.init();
      return _this;
    }
    _createClass(WebSerialDaemon, [{
      key: "init",
      value: function init() {
        var _this2 = this;
        this.agentFound.pipe(distinctUntilChanged()).subscribe(function (found) {
          if (!found) {
            // Set channelOpen false for the first time
            if (_this2.channelOpen.getValue() === null) {
              _this2.channelOpen.next(false);
            }
            _this2.connectToChannel();
          } else {
            _this2.openChannel(function () {
              return _this2.channel.postMessage({
                command: 'listPorts'
              });
            });
          }
        });
      }
    }, {
      key: "connectToChannel",
      value: function connectToChannel() {
        var _this3 = this;
        this.channel.onMessage(function (message) {
          if (message.version) {
            _this3.agentInfo = {
              version: message.version,
              os: 'ChromeOS'
            };
            _this3.agentFound.next(true);
            _this3.channelOpen.next(true);
          } else {
            _this3.appMessages.next(message);
          }
        });
        this.channel.onDisconnect(function () {
          _this3.channelOpen.next(false);
          _this3.agentFound.next(false);
        });
      }
    }, {
      key: "handleAppMessage",
      value: function handleAppMessage(message) {
        if (message.ports) {
          this.handleListMessage(message);
        } else if (message.supportedBoards) {
          this.supportedBoards.next(message.supportedBoards);
        }
        if (message.serialData) {
          this.serialMonitorMessages.next(message.serialData);
        }
        if (message.uploadStatus) {
          this.handleUploadMessage(message);
        }
        if (message.err) {
          this.uploading.next({
            status: this.UPLOAD_ERROR,
            err: message.Err
          });
        }
      }
    }, {
      key: "handleUploadMessage",
      value: function handleUploadMessage(message) {
        if (this.uploading.getValue().status !== this.UPLOAD_IN_PROGRESS) {
          return;
        }
        switch (message.uploadStatus) {
          case 'message':
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: message.message,
              operation: message.operation,
              port: message.port
            });
            break;
          case 'error':
            this.uploading.next({
              status: this.UPLOAD_ERROR,
              err: message.message
            });
            break;
          case 'success':
            this.uploading.next({
              status: this.UPLOAD_DONE,
              msg: message.message,
              operation: message.operation,
              port: message.port
            });
            break;
          default:
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS
            });
        }
      }
    }, {
      key: "handleListMessage",
      value: function handleListMessage(message) {
        var lastDevices = this.devicesList.getValue();
        if (!Daemon.devicesListAreEquals(lastDevices.serial, message.ports)) {
          this.devicesList.next({
            serial: message.ports.map(function (port) {
              return {
                Name: port.name,
                SerialNumber: port.serialNumber,
                IsOpen: port.isOpen,
                VendorID: port.vendorId,
                ProductID: port.productId
              };
            }),
            network: []
          });
        }
      }

      /**
       * Send 'close' command to all the available serial ports
       */
    }, {
      key: "closeAllPorts",
      value: function closeAllPorts() {
        var _this4 = this;
        var devices = this.devicesList.getValue().serial;
        if (Array.isArray(devices)) {
          devices.forEach(function (device) {
            _this4.channel.postMessage({
              command: 'closePort',
              data: {
                name: device.Name
              }
            });
          });
        }
      }

      /**
       * Send the 'writePort' message to the serial port
       * @param {string} port the port name
       * @param {string} message the text to be sent to serial
       */
    }, {
      key: "writeSerial",
      value: function writeSerial(port, message) {
        this.channel.postMessage({
          command: 'writePort',
          data: {
            name: port,
            data: message
          }
        });
      }

      /**
       * Request serial port open
       * @param {string} port the port name
       */
    }, {
      key: "openSerialMonitor",
      value: function openSerialMonitor(port, baudrate) {
        var _this5 = this;
        if (this.serialMonitorOpened.getValue()) {
          return;
        }
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort) {
          return this.serialMonitorError.next("Can't find port ".concat(port));
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return open;
        })))).subscribe(function (message) {
          if (message.portOpenStatus === 'success') {
            _this5.serialMonitorOpened.next(true);
          }
          if (message.portOpenStatus === 'error') {
            _this5.serialMonitorError.next("Failed to open serial ".concat(port));
          }
        });
        this.channel.postMessage({
          command: 'openPort',
          data: {
            name: port,
            baudrate: baudrate
          }
        });
      }
    }, {
      key: "closeSerialMonitor",
      value: function closeSerialMonitor(port) {
        var _this6 = this;
        if (!this.serialMonitorOpened.getValue()) {
          return;
        }
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort) {
          return this.serialMonitorError.next("Can't find port ".concat(port));
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return !open;
        })))).subscribe(function (message) {
          if (message.portCloseStatus === 'success') {
            _this6.serialMonitorOpened.next(false);
          }
          if (message.portCloseStatus === 'error') {
            _this6.serialMonitorError.next("Failed to close serial ".concat(port));
          }
        });
        this.channel.postMessage({
          command: 'closePort',
          data: {
            name: port
          }
        });
      }
    }, {
      key: "connectToSerialDevice",
      value: function connectToSerialDevice(_ref) {
        var from = _ref.from,
          dialogCustomization = _ref.dialogCustomization;
        this.channel.postMessage({
          command: 'connectToSerial',
          data: {
            from: from,
            dialogCustomization: dialogCustomization
          }
        });
      }

      /**
       * @param {object} uploadPayload
       * TODO: document param's shape
       */
    }, {
      key: "_upload",
      value: function _upload(uploadPayload, uploadCommandInfo) {
        var _this7 = this;
        var board = uploadPayload.board,
          port = uploadPayload.port,
          commandline = uploadPayload.commandline,
          data = uploadPayload.data,
          pid = uploadPayload.pid,
          vid = uploadPayload.vid,
          filename = uploadPayload.filename,
          dialogCustomizations = uploadPayload.dialogCustomizations;
        var extrafiles = uploadCommandInfo && uploadCommandInfo.files && Array.isArray(uploadCommandInfo.files) ? uploadCommandInfo.files : [];
        try {
          window.oauth.getAccessToken().then(function (token) {
            _this7.channel.postMessage({
              command: 'upload',
              data: {
                board: board,
                port: port,
                commandline: commandline,
                data: data,
                token: token.token,
                extrafiles: extrafiles,
                pid: pid,
                vid: vid,
                filename: filename,
                dialogCustomizations: dialogCustomizations
              }
            });
          });
        } catch (err) {
          this.uploading.next({
            status: this.UPLOAD_ERROR,
            err: 'you need to be logged in on a Create site to upload by Chrome App'
          });
        }
      }
    }]);
    return WebSerialDaemon;
  }(Daemon);

  var POLLING_INTERVAL$2 = 2000;
  var ChromeAppDaemon = /*#__PURE__*/function (_Daemon) {
    _inherits(ChromeAppDaemon, _Daemon);
    function ChromeAppDaemon(boardsUrl, chromeExtensionId) {
      var _this;
      _classCallCheck(this, ChromeAppDaemon);
      _this = _callSuper(this, ChromeAppDaemon, [boardsUrl]);
      _this.chromeExtensionId = chromeExtensionId;
      _this.channel = null;
      _this.init();
      return _this;
    }
    _createClass(ChromeAppDaemon, [{
      key: "init",
      value: function init() {
        var _this2 = this;
        this.openChannel(function () {
          return _this2.channel.postMessage({
            command: 'listPorts'
          });
        });
        this.agentFound.pipe(distinctUntilChanged()).subscribe(function (agentFound) {
          if (!agentFound) {
            _this2.findApp();
          }
        });
      }
    }, {
      key: "findApp",
      value: function findApp() {
        var _this3 = this;
        interval(POLLING_INTERVAL$2).pipe(startWith(0)).pipe(takeUntil(this.channelOpen.pipe(filter(function (status) {
          return status;
        })))).subscribe(function () {
          return _this3._appConnect();
        });
      }

      /**
       * Instantiate connection and events listeners for chrome app
       */
    }, {
      key: "_appConnect",
      value: function _appConnect() {
        var _this4 = this;
        if (chrome.runtime) {
          this.channel = chrome.runtime.connect(this.chromeExtensionId);
          this.channel.onMessage.addListener(function (message) {
            if (message.version) {
              _this4.agentInfo = message;
              _this4.agentFound.next(true);
              _this4.channelOpen.next(true);
            } else {
              _this4.appMessages.next(message);
            }
          });
          this.channel.onDisconnect.addListener(function () {
            _this4.channelOpen.next(false);
            _this4.agentFound.next(false);
          });
        }
      }
    }, {
      key: "handleAppMessage",
      value: function handleAppMessage(message) {
        if (message.ports) {
          this.handleListMessage(message);
        }
        if (message.supportedBoards) {
          this.supportedBoards.next(message.supportedBoards);
        }
        if (message.serialData) {
          this.serialMonitorMessages.next(message.serialData);
        }
        if (message.uploadStatus) {
          this.handleUploadMessage(message);
        }
        if (message.err) {
          this.uploading.next({
            status: this.UPLOAD_ERROR,
            err: message.Err
          });
        }
      }
    }, {
      key: "handleListMessage",
      value: function handleListMessage(message) {
        var lastDevices = this.devicesList.getValue();
        if (!Daemon.devicesListAreEquals(lastDevices.serial, message.ports)) {
          this.devicesList.next({
            serial: message.ports.map(function (port) {
              return {
                Name: port.name,
                SerialNumber: port.serialNumber,
                IsOpen: port.isOpen,
                VendorID: port.vendorId,
                ProductID: port.productId
              };
            }),
            network: []
          });
        }
      }

      /**
       * Send 'close' command to all the available serial ports
       */
    }, {
      key: "closeAllPorts",
      value: function closeAllPorts() {
        var _this5 = this;
        var devices = this.devicesList.getValue().serial;
        devices.forEach(function (device) {
          _this5.channel.postMessage({
            command: 'closePort',
            data: {
              name: device.Name
            }
          });
        });
      }

      /**
       * Send 'message' to serial port
       * @param {string} port the port name
       * @param {string} message the text to be sent to serial
       */
    }, {
      key: "writeSerial",
      value: function writeSerial(port, message) {
        this.channel.postMessage({
          command: 'writePort',
          data: {
            name: port,
            data: message
          }
        });
      }

      /**
       * Request serial port open
       * @param {string} port the port name
       */
    }, {
      key: "openSerialMonitor",
      value: function openSerialMonitor(port, baudrate) {
        var _this6 = this;
        if (this.serialMonitorOpened.getValue()) {
          return;
        }
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort) {
          return this.serialMonitorError.next("Can't find port ".concat(port));
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return open;
        })))).subscribe(function (message) {
          if (message.portOpenStatus === 'success') {
            _this6.serialMonitorOpened.next(true);
          }
          if (message.portOpenStatus === 'error') {
            _this6.serialMonitorError.next("Failed to open serial ".concat(port));
          }
        });
        this.channel.postMessage({
          command: 'openPort',
          data: {
            name: port,
            baudrate: baudrate
          }
        });
      }

      /**
       * Request serial port close
       * @param {string} port the port name
       */
    }, {
      key: "closeSerialMonitor",
      value: function closeSerialMonitor(port) {
        var _this7 = this;
        if (!this.serialMonitorOpened.getValue()) {
          return;
        }
        var serialPort = this.devicesList.getValue().serial.find(function (p) {
          return p.Name === port;
        });
        if (!serialPort) {
          return this.serialMonitorError.next("Can't find port ".concat(port));
        }
        this.appMessages.pipe(takeUntil(this.serialMonitorOpened.pipe(filter(function (open) {
          return !open;
        })))).subscribe(function (message) {
          if (message.portCloseStatus === 'success') {
            _this7.serialMonitorOpened.next(false);
          }
          if (message.portCloseStatus === 'error') {
            _this7.serialMonitorError.next("Failed to close serial ".concat(port));
          }
        });
        this.channel.postMessage({
          command: 'closePort',
          data: {
            name: port
          }
        });
      }
    }, {
      key: "handleUploadMessage",
      value: function handleUploadMessage(message) {
        if (this.uploading.getValue().status !== this.UPLOAD_IN_PROGRESS) {
          return;
        }
        switch (message.uploadStatus) {
          case 'message':
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS,
              msg: message.message
            });
            break;
          case 'error':
            this.uploading.next({
              status: this.UPLOAD_ERROR,
              err: message.message
            });
            break;
          case 'success':
            this.uploading.next({
              status: this.UPLOAD_DONE,
              msg: message.message
            });
            break;
          default:
            this.uploading.next({
              status: this.UPLOAD_IN_PROGRESS
            });
        }
      }

      /**
       * Perform an upload via http on the daemon
       * @param {Object} target = {
       *   board: "name of the board",
       *   port: "port of the board",
       *   commandline: "commandline to execute",
       *   data: "compiled sketch"
       * }
       */
    }, {
      key: "_upload",
      value: function _upload(uploadPayload, uploadCommandInfo) {
        var _this8 = this;
        var board = uploadPayload.board,
          port = uploadPayload.port,
          commandline = uploadPayload.commandline,
          data = uploadPayload.data,
          filename = uploadPayload.filename;
        var extrafiles = uploadCommandInfo && uploadCommandInfo.files && Array.isArray(uploadCommandInfo.files) ? uploadCommandInfo.files : [];
        try {
          window.oauth.token().then(function (token) {
            _this8.channel.postMessage({
              command: 'upload',
              data: {
                board: board,
                port: port,
                commandline: commandline,
                data: data,
                token: token.token,
                filename: filename,
                extrafiles: extrafiles
              }
            });
          });
        } catch (err) {
          this.uploading.next({
            status: this.UPLOAD_ERROR,
            err: 'you need to be logged in on a Create site to upload by Chrome App'
          });
        }
      }
    }, {
      key: "downloadTool",
      value: function downloadTool() {
        // no need to download tool on chromeOS
        this.downloading.next({
          status: this.DOWNLOAD_DONE
        });
      }
    }]);
    return ChromeAppDaemon;
  }(Daemon);

  /*
  * Copyright 2018 ARDUINO SA (http://www.arduino.cc/)
  * This file is part of arduino-create-agent-js-client.
  * Copyright (c) 2018
  * Authors: Alberto Iannaccone, Stefania Mellai, Gabriele Destefanis
  *
  * This software is released under:
  * The GNU General Public License, which covers the main part of
  * arduino-create-agent-js-client
  * The terms of this license can be found at:
  * https://www.gnu.org/licenses/gpl-3.0.en.html
  *
  * You can be released from the requirements of the above licenses by purchasing
  * a commercial license. Buying such a license is mandatory if you want to modify or
  * otherwise use the software for commercial activities involving the Arduino
  * software without disclosing the source code of your own applications. To purchase
  * a commercial license, send an email to license@arduino.cc.
  *
  */

  /**
   * ChromeOSDaemon is a new implementation for ChromeOS which allows
   + to select the legacy Chrome app or the new BETA web serial API,
   * based on the the existance of a `useWebSerial` key available in the constructor.
   * Warning: support for WebSerialDaemon is still in alpha, so if you don't know
   * how to deal with Web Serial API, just stick with the Chrome App Deamon.
   *
   */
  function ChromeOsDaemon(boardsUrl, options) {
    var _this = this;
    var useWebSerial;
    var chromeExtensionId;
    var uploader;

    // check chromeExtensionId OR web serial API
    if (typeof options === 'string') {
      chromeExtensionId = options;
    } else {
      chromeExtensionId = options.chromeExtensionId;
      useWebSerial = options.useWebSerial;
      uploader = options.uploader;
    }
    if ('serial' in navigator && useWebSerial && Boolean(uploader)) {
      console.debug('Instantiating WebSerialDaemon');
      this.flavour = new WebSerialDaemon(boardsUrl, uploader);
    } else {
      console.debug('Instantiating ChromeAppDaemon');
      this.flavour = new ChromeAppDaemon(boardsUrl, chromeExtensionId);
    }
    var handler = {
      get: function get(_, name) {
        return _this.flavour[name];
      },
      set: function set(_, name, value) {
        _this.flavour[name] = value;
        return true;
      }
    };
    return new Proxy(this, handler);
  }

  // For versions of the fwupater tool >= 0.1.2
  var fwupdaterSignatures = Object.freeze({
    GET_FIRMWARE_INFO: '5aae0c2b9cfa783ab6d791491b6ebcb7ffb69644dcc8984def2a5f69029a46701dc8c95fc38a60efebb78c2802b6d172d7f38852b44ae1d2697c0211b6ac389f574c4ff85593ccae55e7c8c415f8d07f932fc64aec620ddb925dbd97b77cf395b9929911b6d4c40b8d3d5a4720a0613fe301344a45f505a430c956a527831896b42fddd0f737d630a3dc3714ce421bd30e9229b2ed503667a915bfc696b6221759640ff492e37356ef025ba9802d578227b8f15fd0f647c395bf73a84adf7a57281c31bc743ca92c09f8eec64d428acd25ced8f8420fdbf989db3625662970d3f16693fec44a418e8c7b12e9f4e94d353e4d6f6876bd74fc543eaeba20a09dc6',
    UPLOAD_FIRMWARE_BOSSAC: 'a965a14ec42c35a67f8d2f3f5235aaacbcc1b998b367d07a02d12992ec691f1723d00f0c3c1c64566e10823cca4947d7dd91e9ba4b28dffc112953f4ccf230adca274133f14ab3a13697c932c6c19ba05b4cd6d93141a31977ce7a53b253d761e2a503f55599a03605264d32e31c938966041709a824e64ddb0a2371e68c8d298dcd93cc8d451b8df1a7c1244e30b310fb10ec13448df3238bd0db5be0d1ec938b82b7c4f81262155c75b805700d0ff20b0404e27142014a2d74c3db677f32854dcda9052ccad9028e16cfb5151c09763e93a3a285be226dac849c519d79301962488c92723781d6a2063ee0021fa9f2c8d2dfcb7a6f01bcb4dbcd6b9f0d6322',
    UPLOAD_FIRMWARE_AVRDUDE: '67e99fc73b0c9359219d30c11851d728a5e5559426c0151518aa947b48af3f58de4d0997143cad18bc1a2f6ae22863baab2e8b0de6fff549185f3dc82cbcce44690e0c50a92cebf0bd4377ae85f3961330c5fda40f3a567242eb74fe3d937b1abfe8be77a9fd658eed1a765bbc264702577fdd63da8d3073dd36dcdd37dc5762b162e18c284715012c1f303c77475703a5c8ef8bfc685e1650eb26058016d771bd4f53929a51666aef70126aabda80431671eb2ba9b729ee166079abac806567b9ae63ce2801f88964250596b8450fda112ac43b868634b91cb59d91d13c286d3ec19eb4a840d3af89413d24b198e2da616cb2bbff45cc58645aa1b1d52f71bf',
    UPLOAD_FIRMWARE_RP2040: '422df04bfb4fc0eea4df716b3d9b075558c6094a2953795cf0f9cfdc58e97f9df80f51f8981d11e23a17fe1c220a164a87e24e1b10442cb6e06bda96737f1c30d7ef5928f4d926428a36ff4ea7d6cd379d2d755cda76f1fc9884628da519197007f9db1233401af387a6684f2a74855168f878d8c67239d99fdf7597379650cd9df6a56c430dc09ccc14fec3ceba56b9a0ab1e7b0a71cb9c9016ee3595a7d914e14d9f333a388aca31093ec77f347ceb0ed3f1d57861c7304bf53e45188ce3a976d294afd1e919496856b760dc708cb2db5cde585c44e8f023ad3ef2353edee5d172c2da936e321bbf11dec51779447534465df9c275eb391f1ada2c089ecb15'
  });

  // For versions of the fwupater tool <= 0.1.1
  var oldFwupdaterSignatures = Object.freeze({
    GET_FIRMWARE_INFO: 'aceffd98d331df0daa5bb3308bb49a95767d77e7a1557c07a0ec544d2f41c3ec67269f01ce9a63e01f3b43e087ab8eb22b7f1d34135b6686e8ce27d4b5dc083ec8e6149df11880d32486448a71280ef3128efccbd45a84dbd7990a9420a65ee86b3822edba3554fa8e6ca11aec12d4dd99ad072285b98bfdf7b2b64f677da50feb8bddef25a36f52d7605078487d8a5d7cbdc84bfa65d510cee97b46baefea149139a9a6ed4b545346040536e33d850e6ad84c83fe605f677e2ca77439de3fa42350ce504ad9a49cf62c6751d4c2a284500d2c628cd52cd73b4c3e7ef08ae823eb8941383f9c6ff0686da532369d3b266ded8fdd33cca1a128068a4795920f25',
    UPLOAD_FIRMWARE_BOSSAC: 'b4fca4587e784952c53ad05bff80ed0b2880be885cb3f6bd9935864863cd36d3c9c26b30b2598727b03b1b409873fa2ce0560bf1933768d5ca45c64d5f0e5032b19146cba60d8f3aa2b19ba107be0c4fa592d86e44bc87f2330fc1c9995db0cc5ec884d8f294af5cbff3a81593849465eb0e4123e9b7ddb3be74b444bed40d539e724f9a41617f2e9c70b145c4a2688d47894319fd65d660ad7d8382fb56a455e28fa78042337d55f8b5ec4f2c16f3410d15c1551973eec2a80a1792c344f7835e2133f9279009a40054bf234f7bc194f7c18d0e6c7102d13823db1ad60d81b40e3e43f89eb26a0cc5fd9759286f11ba4b649829bda8a52d0013ee59e2df3b3b',
    UPLOAD_FIRMWARE_AVRDUDE: '38bb99d99e00d91166ef095477b24b7a52eda0685db819486a723ee09e84ea84422b7f6c973466e97b832c5afa54a84a6d2dfad17a38f8f91059c5f62212c2a3e8a887c63b3b679eb1c4c2e76f2f4e943d8bd59a5f21283c9a3a7a9b5584c14b8adfc881315bcc605d26bfe31c9b2dfa5979d501b2333963614337668f0303ef6ddd3ec72a39b448d38c6af501a1357c6b8527f27ca8a096b7bc0413b1cb5f504d44bd502cee59444c00fae11cc59c51ae8153e4e481fb58a3ee3a7f23447aa9aa368b8cc0d0d107b77b234a7528ab10cbb5dc09de874ef2a6bd427aa2f83f99faabd54b272c7df3922fa5439e54e9d8b2793bc5ce1c5979f3f5e5db03853f53'
  });

  /* The status of the Firmware Updater Tool */
  var FWUToolStatusEnum = Object.freeze({
    NOPE: 'NOPE',
    OK: 'OK',
    CHECKING: 'CHECKING',
    ERROR: 'ERROR DOWNLOADING TOOL'
  });

  /* The signatures needed to run the commands to use the Firmware Updater Tool */
  var signatures = fwupdaterSignatures;
  var updaterBinaryName = 'FirmwareUploader';
  function programmerFor(boardId) {
    if (boardId === 'uno2018') return ['{runtime.tools.avrdude}/bin/avrdude', signatures.UPLOAD_FIRMWARE_AVRDUDE];
    if (boardId === 'nanorp2040connect') return ["{runtime.tools.rp2040tools.path}/rp2040load", signatures.UPLOAD_FIRMWARE_RP2040];
    return ["{runtime.tools.bossac}/bossac", signatures.UPLOAD_FIRMWARE_BOSSAC];
  }
  var FirmwareUpdater = /*#__PURE__*/function () {
    function FirmwareUpdater(Daemon) {
      var _this = this;
      _classCallCheck(this, FirmwareUpdater);
      this.updateStatusEnum = Object.freeze({
        NOPE: 'NOPE',
        STARTED: 'STARTED',
        GETTING_INFO: 'GETTING_INFO',
        GOT_INFO: 'GOT_INFO',
        UPLOADING: 'UPLOADING',
        DONE: 'DONE',
        ERROR: 'ERROR'
      });
      this.Daemon = Daemon;
      this.FWUToolStatus = FWUToolStatusEnum.NOPE;
      this.Daemon.downloadingDone.subscribe(function () {
        _this.FWUToolStatus = FWUToolStatusEnum.OK;
      });
      this.updating = new BehaviorSubject({
        status: this.updateStatusEnum.NOPE
      });
      this.updatingDone = this.updating.pipe(filter(function (update) {
        return update.status === _this.updateStatusEnum.DONE;
      })).pipe(first()).pipe(takeUntil(this.updating.pipe(filter(function (update) {
        return update.status === _this.updateStatusEnum.ERROR;
      }))));
      this.updatingError = this.updating.pipe(filter(function (update) {
        return update.status === _this.updateStatusEnum.ERROR;
      })).pipe(first()).pipe(takeUntil(this.updatingDone));
      this.gotFWInfo = this.updating.pipe(filter(function (update) {
        return update.status === _this.updateStatusEnum.GOT_INFO;
      })).pipe(first()).pipe(takeUntil(this.updatingDone)).pipe(takeUntil(this.updatingError));
    }
    _createClass(FirmwareUpdater, [{
      key: "setToolVersion",
      value: function setToolVersion(version) {
        this.toolVersion = version;
        if (semverCompare(version, '0.1.2') < 0) {
          signatures = oldFwupdaterSignatures;
          updaterBinaryName = 'updater';
        }
      }
    }, {
      key: "getFirmwareInfo",
      value: function getFirmwareInfo(boardId, port, firmwareVersion) {
        var _this2 = this;
        this.firmwareVersionData = null;
        this.loaderPath = null;
        this.updating.next({
          status: this.updateStatusEnum.GETTING_INFO
        });
        var versionsList = [];
        var firmwareInfoMessagesSubscription;
        var handleFirmwareInfoMessage = function handleFirmwareInfoMessage(message) {
          var versions;
          switch (message.ProgrammerStatus) {
            case 'Starting':
              break;
            case 'Busy':
              if (message.Msg.indexOf('Flashing with command:') >= 0) {
                return;
              }
              versions = JSON.parse(message.Msg);
              Object.keys(versions).forEach(function (v) {
                if (versions[v][0].IsLoader) {
                  _this2.loaderPath = versions[v][0].Path;
                } else {
                  versionsList = [].concat(_toConsumableArray(versionsList), _toConsumableArray(versions[v]));
                }
              });
              _this2.firmwareVersionData = versionsList.find(function (version) {
                return version.Name.split(' ').splice(-1)[0].trim() === firmwareVersion;
              });
              if (!_this2.firmwareVersionData) {
                _this2.updating.next({
                  status: _this2.updateStatusEnum.ERROR,
                  err: "Can't get firmware info: couldn't find version '".concat(firmwareVersion, "' for board '").concat(boardId, "'")
                });
              } else {
                firmwareInfoMessagesSubscription.unsubscribe();
                _this2.updating.next({
                  status: _this2.updateStatusEnum.GOT_INFO
                });
              }
              break;
            case 'Error':
              _this2.updating.next({
                status: _this2.updateStatusEnum.ERROR,
                err: "Couldn't get firmware info: ".concat(message.Msg)
              });
              firmwareInfoMessagesSubscription.unsubscribe();
              break;
          }
        };
        if (this.FWUToolStatus !== FWUToolStatusEnum.OK) {
          this.updating.next({
            status: this.updateStatusEnum.ERROR,
            err: "Can't get firmware info: couldn't find firmware updater tool"
          });
          return;
        }
        firmwareInfoMessagesSubscription = this.Daemon.appMessages.subscribe(function (message) {
          if (message.ProgrammerStatus) {
            handleFirmwareInfoMessage(message);
          }
        });
        var data = {
          board: boardId,
          port: port,
          commandline: "\"{runtime.tools.fwupdater.path}/".concat(updaterBinaryName, "\" -get_available_for {network.password}"),
          signature: signatures.GET_FIRMWARE_INFO,
          extra: {
            auth: {
              password: boardId
            }
          },
          filename: 'ListFirmwareVersionsInfo.bin'
        };
        return fetch("".concat(this.Daemon.pluginURL, "/upload"), {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain; charset=utf-8'
          },
          body: JSON.stringify(data)
        }).then(function (response) {
          if (!response.ok) {
            _this2.updating.next({
              status: _this2.updateStatusEnum.ERROR,
              err: "Error fetching ".concat(_this2.Daemon.pluginURL, "/upload")
            });
          }
        })["catch"](function () {
          _this2.updating.next({
            status: _this2.updateStatusEnum.ERROR,
            err: "Coudln't list firmware versions info."
          });
        });
      }
    }, {
      key: "updateFirmware",
      value: function updateFirmware(boardId, port, firmwareVersion) {
        var _this3 = this;
        this.updating.next({
          status: this.updateStatusEnum.STARTED
        });
        this.Daemon.closeSerialMonitor(port);
        this.Daemon.serialMonitorOpened.pipe(filter(function (open) {
          return !open;
        })).pipe(first()).subscribe(function () {
          if (!port) {
            _this3.updating.next({
              status: _this3.updateStatusEnum.ERROR,
              err: "Can't update Firmware: no port selected."
            });
            return;
          }
          _this3.gotFWInfo.subscribe(function () {
            if (!_this3.firmwareVersionData) {
              _this3.updating.next({
                status: _this3.updateStatusEnum.ERROR,
                err: "Can't update Firmware: couldn't find version '".concat(firmwareVersion, "' for board '").concat(boardId, "'")
              });
              return;
            }
            var updateFirmwareMessagesSubscription;
            var handleFirmwareUpdateMessage = function handleFirmwareUpdateMessage(message) {
              switch (message.ProgrammerStatus) {
                case 'Busy':
                  if (message.Msg.indexOf('Operation completed: success! :-)') >= 0) {
                    _this3.updating.next({
                      status: _this3.updateStatusEnum.DONE
                    });
                    updateFirmwareMessagesSubscription.unsubscribe();
                  }
                  break;
                case 'Error':
                  _this3.updating.next({
                    status: _this3.updateStatusEnum.ERROR,
                    err: "Can't update Firmware: ".concat(message.Msg)
                  });
                  updateFirmwareMessagesSubscription.unsubscribe();
                  break;
              }
            };
            updateFirmwareMessagesSubscription = _this3.Daemon.appMessages.subscribe(function (message) {
              if (message.ProgrammerStatus) {
                handleFirmwareUpdateMessage(message);
              }
            });
            var _programmerFor = programmerFor(boardId),
              _programmerFor2 = _slicedToArray(_programmerFor, 2),
              programmer = _programmerFor2[0],
              signature = _programmerFor2[1];
            if (!_this3.loaderPath) {
              _this3.updating.next({
                status: _this3.updateStatusEnum.ERROR,
                err: "Can't update Firmware: 'loaderPath' is empty or 'null'"
              });
              return;
            }
            var data = {
              board: boardId,
              port: port,
              commandline: "\"{runtime.tools.fwupdater.path}/".concat(updaterBinaryName, "\" -flasher {network.password} -port {serial.port} -programmer \"").concat(programmer, "\""),
              hex: '',
              extra: {
                auth: {
                  password: "\"".concat(_this3.loaderPath, "\" -firmware \"").concat(_this3.firmwareVersionData.Path, "\"")
                }
              },
              signature: signature,
              filename: 'CheckFirmwareVersion.bin'
            };
            fetch("".concat(_this3.Daemon.pluginURL, "/upload"), {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain; charset=utf-8'
              },
              body: JSON.stringify(data)
            }).then(function (response) {
              if (!response.ok) {
                _this3.updating.next({
                  status: _this3.updateStatusEnum.ERROR,
                  err: "Can't update Firmware: error fetching ".concat(_this3.Daemon.pluginURL, "/upload")
                });
              }
            })["catch"](function (reason) {
              _this3.updating.next({
                status: _this3.updateStatusEnum.ERROR,
                err: "Can't update Firmware: ".concat(reason)
              });
            });
          });
          _this3.getFirmwareInfo(boardId, port, firmwareVersion);
        });
      }
    }]);
    return FirmwareUpdater;
  }();

  /*
  * Copyright 2018 ARDUINO SA (http://www.arduino.cc/)
  * This file is part of arduino-create-agent-js-client.
  * Copyright (c) 2018
  * Authors: Alberto Iannaccone, Stefania Mellai, Gabriele Destefanis
  *
  * This software is released under:
  * The GNU General Public License, which covers the main part of
  * arduino-create-agent-js-client
  * The terms of this license can be found at:
  * https://www.gnu.org/licenses/gpl-3.0.en.html
  *
  * You can be released from the requirements of the above licenses by purchasing
  * a commercial license. Buying such a license is mandatory if you want to modify or
  * otherwise use the software for commercial activities involving the Arduino
  * software without disclosing the source code of your own applications. To purchase
  * a commercial license, send an email to license@arduino.cc.
  *
  */
  var Daemon$1 = window.navigator.userAgent.indexOf(' CrOS ') !== -1 ? ChromeOsDaemon : SocketDaemon;

  exports.FirmwareUpdater = FirmwareUpdater;
  exports.default = Daemon$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=create-plugin.js.map
