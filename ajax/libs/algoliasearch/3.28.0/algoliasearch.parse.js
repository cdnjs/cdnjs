module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	

	// This is the Parse entry point
	// See https://www.parse.com/docs/cloud_code_guide#cloud_code
	module.exports = algoliasearch;

	// by default parse has no process.env,
	// force it down for npm modules compatibility
	if (process.env === undefined) {
	  process.env = {};
	}

	// a lot of node modules are expecting to find a `global` object,
	// this has triggered some bugs
	/* global global: true */
	global = global || {};

	var debug = __webpack_require__(1)('algoliasearch:parse');

	var inherits = __webpack_require__(4);

	var AlgoliaSearchServer = __webpack_require__(5);

	debug('loaded the Parse client');

	function algoliasearch(applicationID, apiKey, opts) {
	  var cloneDeep = __webpack_require__(15);
	  opts = cloneDeep(opts || {});

	  if (opts.protocol === undefined) {
	    opts.protocol = 'https:';
	  }

	  opts.timeouts = opts.timeouts || {
	    connect: 2 * 1000,
	    read: 7 * 1000,
	    write: 30 * 1000
	  };

	  opts._setTimeout = _setTimeout;

	  opts._ua = opts._ua || algoliasearch.ua;
	  opts._useCache = false;

	  return new AlgoliaSearchParse(applicationID, apiKey, opts);
	}

	algoliasearch.version = __webpack_require__(26);
	algoliasearch.ua = 'Algolia for Parse ' + algoliasearch.version;

	function AlgoliaSearchParse() {
	  // call AlgoliaSearchServer constructor
	  AlgoliaSearchServer.apply(this, arguments);
	}

	inherits(AlgoliaSearchParse, AlgoliaSearchServer);

	AlgoliaSearchParse.prototype._request = function(rawUrl, opts) {
	  /* global Parse */
	  var clone = __webpack_require__(15);
	  var promise = new Parse.Promise();

	  debug('url: %s, opts: %j', rawUrl, opts);

	  var parseReqOpts = {
	    url: rawUrl,
	    headers: clone(opts.headers),
	    method: opts.method,
	    success: success,
	    error: error
	  };

	  if (opts.body) {
	    // parse is proxing our requests and requires us to set a charset. while json is always utf-8
	    parseReqOpts.headers['content-type'] = 'application/json;charset=utf-8';
	    parseReqOpts.body = opts.body;
	  }

	  Parse.Cloud.httpRequest(parseReqOpts);

	  function error(res) {
	    debug('error: %j  - %s %j', res, rawUrl, opts);

	    // we still resolve, bc Parse does not distinguish network errors
	    // from 400/500 statuses
	    promise.resolve({
	      statusCode: res.status,
	      body: res.data,
	      responseText: res.text,
	      headers: res.headers
	    });
	  }

	  function success(res) {
	    debug('success: %j  - %s %j', res, rawUrl, opts);

	    promise.resolve({
	      statusCode: res.status,
	      body: res.data,
	      headers: res.headers
	    });
	  }

	  return promise;
	};

	AlgoliaSearchParse.prototype._promise = {
	  reject: function(val) {
	    return Parse.Promise.error(val);
	  },
	  resolve: function(val) {
	    return Parse.Promise.as(val);
	  },
	  delay: function(ms) {
	    var promise = new Parse.Promise();

	    _setTimeout(promise.resolve.bind(promise), ms);

	    return promise;
	  },
	  all: function all(promises) {
	    return Parse.Promise.all(promises);
	  }
	};

	// There's no setTimeout in Parse cloud, but we have nextTick
	function _setTimeout(fn, ms) {
	  var start = Date.now();

	  process.nextTick(fakeSetTimeout);

	  function fakeSetTimeout() {
	    if (Date.now() < start + ms) {
	      process.nextTick(fakeSetTimeout);
	      return;
	    }

	    fn();
	  }
	}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(2);
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
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
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
	  args.splice(1, 0, c, 'color: inherit')

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	
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
	exports.humanize = __webpack_require__(3);

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
	 * Previous log timestamp.
	 */

	var prevTime;

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

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
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

	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
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

	module.exports = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
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
	      return n * y;
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
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
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
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	

	// Some methods only accessible server side

	module.exports = AlgoliaSearchServer;

	var inherits = __webpack_require__(4);

	var AlgoliaSearch = __webpack_require__(6);

	function AlgoliaSearchServer(applicationID, apiKey, opts) {
	  // Default protocol is https: on the server, to avoid leaking admin keys
	  if (opts.protocol === undefined) {
	    opts.protocol = 'https:';
	  }

	  AlgoliaSearch.apply(this, arguments);
	}

	inherits(AlgoliaSearchServer, AlgoliaSearch);

	/*
	 * Allow to use IP rate limit when you have a proxy between end-user and Algolia.
	 * This option will set the X-Forwarded-For HTTP header with the client IP and the X-Forwarded-API-Key with the API Key having rate limits.
	 * @param adminAPIKey the admin API Key you can find in your dashboard
	 * @param endUserIP the end user IP (you can use both IPV4 or IPV6 syntax)
	 * @param rateLimitAPIKey the API key on which you have a rate limit
	 */
	AlgoliaSearchServer.prototype.enableRateLimitForward = function(adminAPIKey, endUserIP, rateLimitAPIKey) {
	  this._forward = {
	    adminAPIKey: adminAPIKey,
	    endUserIP: endUserIP,
	    rateLimitAPIKey: rateLimitAPIKey
	  };
	};

	/*
	 * Disable IP rate limit enabled with enableRateLimitForward() function
	 */
	AlgoliaSearchServer.prototype.disableRateLimitForward = function() {
	  this._forward = null;
	};

	/*
	 * Specify the securedAPIKey to use with associated information
	 */
	AlgoliaSearchServer.prototype.useSecuredAPIKey = function(securedAPIKey, securityTags, userToken) {
	  this._secure = {
	    apiKey: securedAPIKey,
	    securityTags: securityTags,
	    userToken: userToken
	  };
	};

	/*
	 * If a secured API was used, disable it
	 */
	AlgoliaSearchServer.prototype.disableSecuredAPIKey = function() {
	  this._secure = null;
	};

	AlgoliaSearchServer.prototype._computeRequestHeaders = function(additionalUA) {
	  var headers = AlgoliaSearchServer.super_.prototype._computeRequestHeaders.call(this, additionalUA);

	  if (this._forward) {
	    headers['x-algolia-api-key'] = this._forward.adminAPIKey;
	    headers['x-forwarded-for'] = this._forward.endUserIP;
	    headers['x-forwarded-api-key'] = this._forward.rateLimitAPIKey;
	  }

	  if (this._secure) {
	    headers['x-algolia-api-key'] = this._secure.apiKey;
	    headers['x-algolia-tagfilters'] = this._secure.securityTags;
	    headers['x-algolia-usertoken'] = this._secure.userToken;
	  }

	  return headers;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = AlgoliaSearch;

	var Index = __webpack_require__(7);
	var deprecate = __webpack_require__(12);
	var deprecatedMessage = __webpack_require__(13);
	var AlgoliaSearchCore = __webpack_require__(24);
	var inherits = __webpack_require__(4);
	var errors = __webpack_require__(10);

	function AlgoliaSearch() {
	  AlgoliaSearchCore.apply(this, arguments);
	}

	inherits(AlgoliaSearch, AlgoliaSearchCore);

	/*
	 * Delete an index
	 *
	 * @param indexName the name of index to delete
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer that contains the task ID
	 */
	AlgoliaSearch.prototype.deleteIndex = function(indexName, callback) {
	  return this._jsonRequest({
	    method: 'DELETE',
	    url: '/1/indexes/' + encodeURIComponent(indexName),
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * Move an existing index.
	 * @param srcIndexName the name of index to copy.
	 * @param dstIndexName the new index name that will contains a copy of
	 * srcIndexName (destination will be overriten if it already exist).
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer that contains the task ID
	 */
	AlgoliaSearch.prototype.moveIndex = function(srcIndexName, dstIndexName, callback) {
	  var postObj = {
	    operation: 'move', destination: dstIndexName
	  };
	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * Copy an existing index.
	 * @param srcIndexName the name of index to copy.
	 * @param dstIndexName the new index name that will contains a copy
	 * of srcIndexName (destination will be overriten if it already exist).
	 * @param scope an array of scopes to copy: ['settings', 'synonyms', 'rules']
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer that contains the task ID
	 */
	AlgoliaSearch.prototype.copyIndex = function(srcIndexName, dstIndexName, scopeOrCallback, _callback) {
	  var postObj = {
	    operation: 'copy',
	    destination: dstIndexName
	  };
	  var callback = _callback;
	  if (typeof scopeOrCallback === 'function') {
	    // oops, old behaviour of third argument being a function
	    callback = scopeOrCallback;
	  } else if (Array.isArray(scopeOrCallback) && scopeOrCallback.length > 0) {
	    postObj.scope = scopeOrCallback;
	  } else if (typeof scopeOrCallback !== 'undefined') {
	    throw new Error('the scope given to `copyIndex` was not an array with settings, synonyms or rules');
	  }
	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * Return last log entries.
	 * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
	 * @param length Specify the maximum number of entries to retrieve starting
	 * at offset. Maximum allowed value: 1000.
	 * @param type Specify the maximum number of entries to retrieve starting
	 * at offset. Maximum allowed value: 1000.
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer that contains the task ID
	 */
	AlgoliaSearch.prototype.getLogs = function(offset, length, callback) {
	  var clone = __webpack_require__(15);
	  var params = {};
	  if (typeof offset === 'object') {
	    // getLogs(params)
	    params = clone(offset);
	    callback = length;
	  } else if (arguments.length === 0 || typeof offset === 'function') {
	    // getLogs([cb])
	    callback = offset;
	  } else if (arguments.length === 1 || typeof length === 'function') {
	    // getLogs(1, [cb)]
	    callback = length;
	    params.offset = offset;
	  } else {
	    // getLogs(1, 2, [cb])
	    params.offset = offset;
	    params.length = length;
	  }

	  if (params.offset === undefined) params.offset = 0;
	  if (params.length === undefined) params.length = 10;

	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/logs?' + this._getSearchParams(params, ''),
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	 * List all existing indexes (paginated)
	 *
	 * @param page The page to retrieve, starting at 0.
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer with index list
	 */
	AlgoliaSearch.prototype.listIndexes = function(page, callback) {
	  var params = '';

	  if (page === undefined || typeof page === 'function') {
	    callback = page;
	  } else {
	    params = '?page=' + page;
	  }

	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes' + params,
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	 * Get the index object initialized
	 *
	 * @param indexName the name of index
	 * @param callback the result callback with one argument (the Index instance)
	 */
	AlgoliaSearch.prototype.initIndex = function(indexName) {
	  return new Index(this, indexName);
	};

	/*
	 * @deprecated use client.listApiKeys
	 */
	AlgoliaSearch.prototype.listUserKeys = deprecate(function(callback) {
	  return this.listApiKeys(callback);
	}, deprecatedMessage('client.listUserKeys()', 'client.listApiKeys()'));

	/*
	 * List all existing api keys with their associated ACLs
	 *
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer with api keys list
	 */
	AlgoliaSearch.prototype.listApiKeys = function(callback) {
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/keys',
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	 * @deprecated see client.getApiKey
	 */
	AlgoliaSearch.prototype.getUserKeyACL = deprecate(function(key, callback) {
	  return this.getApiKey(key, callback);
	}, deprecatedMessage('client.getUserKeyACL()', 'client.getApiKey()'));

	/*
	 * Get an API key
	 *
	 * @param key
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer with the right API key
	 */
	AlgoliaSearch.prototype.getApiKey = function(key, callback) {
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/keys/' + key,
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	 * @deprecated see client.deleteApiKey
	 */
	AlgoliaSearch.prototype.deleteUserKey = deprecate(function(key, callback) {
	  return this.deleteApiKey(key, callback);
	}, deprecatedMessage('client.deleteUserKey()', 'client.deleteApiKey()'));

	/*
	 * Delete an existing API key
	 * @param key
	 * @param callback the result callback called with two arguments
	 *  error: null or Error('message')
	 *  content: the server answer with the date of deletion
	 */
	AlgoliaSearch.prototype.deleteApiKey = function(key, callback) {
	  return this._jsonRequest({
	    method: 'DELETE',
	    url: '/1/keys/' + key,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	 @deprecated see client.addApiKey
	 */
	AlgoliaSearch.prototype.addUserKey = deprecate(function(acls, params, callback) {
	  return this.addApiKey(acls, params, callback);
	}, deprecatedMessage('client.addUserKey()', 'client.addApiKey()'));

	/*
	 * Add a new global API key
	 *
	 * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	 *   can contains the following values:
	 *     - search: allow to search (https and http)
	 *     - addObject: allows to add/update an object in the index (https only)
	 *     - deleteObject : allows to delete an existing object (https only)
	 *     - deleteIndex : allows to delete index content (https only)
	 *     - settings : allows to get index settings (https only)
	 *     - editSettings : allows to change index settings (https only)
	 * @param {Object} [params] - Optionnal parameters to set for the key
	 * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
	 * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	 * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	 * @param {string[]} params.indexes - Allowed targeted indexes for this key
	 * @param {string} params.description - A description for your key
	 * @param {string[]} params.referers - A list of authorized referers
	 * @param {Object} params.queryParameters - Force the key to use specific query parameters
	 * @param {Function} callback - The result callback called with two arguments
	 *   error: null or Error('message')
	 *   content: the server answer with the added API key
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.addApiKey(['search'], {
	 *   validity: 300,
	 *   maxQueriesPerIPPerHour: 2000,
	 *   maxHitsPerQuery: 3,
	 *   indexes: ['fruits'],
	 *   description: 'Eat three fruits',
	 *   referers: ['*.algolia.com'],
	 *   queryParameters: {
	 *     tagFilters: ['public'],
	 *   }
	 * })
	 * @see {@link https://www.algolia.com/doc/rest_api#AddKey|Algolia REST API Documentation}
	 */
	AlgoliaSearch.prototype.addApiKey = function(acls, params, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: client.addApiKey(arrayOfAcls[, params, callback])';

	  if (!isArray(acls)) {
	    throw new Error(usage);
	  }

	  if (arguments.length === 1 || typeof params === 'function') {
	    callback = params;
	    params = null;
	  }

	  var postObj = {
	    acl: acls
	  };

	  if (params) {
	    postObj.validity = params.validity;
	    postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	    postObj.maxHitsPerQuery = params.maxHitsPerQuery;
	    postObj.indexes = params.indexes;
	    postObj.description = params.description;

	    if (params.queryParameters) {
	      postObj.queryParameters = this._getSearchParams(params.queryParameters, '');
	    }

	    postObj.referers = params.referers;
	  }

	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/keys',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * @deprecated Please use client.addApiKey()
	 */
	AlgoliaSearch.prototype.addUserKeyWithValidity = deprecate(function(acls, params, callback) {
	  return this.addApiKey(acls, params, callback);
	}, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addApiKey()'));

	/**
	 * @deprecated Please use client.updateApiKey()
	 */
	AlgoliaSearch.prototype.updateUserKey = deprecate(function(key, acls, params, callback) {
	  return this.updateApiKey(key, acls, params, callback);
	}, deprecatedMessage('client.updateUserKey()', 'client.updateApiKey()'));

	/**
	 * Update an existing API key
	 * @param {string} key - The key to update
	 * @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	 *   can contains the following values:
	 *     - search: allow to search (https and http)
	 *     - addObject: allows to add/update an object in the index (https only)
	 *     - deleteObject : allows to delete an existing object (https only)
	 *     - deleteIndex : allows to delete index content (https only)
	 *     - settings : allows to get index settings (https only)
	 *     - editSettings : allows to change index settings (https only)
	 * @param {Object} [params] - Optionnal parameters to set for the key
	 * @param {number} params.validity - Number of seconds after which the key will be automatically removed (0 means no time limit for this key)
	 * @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	 * @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	 * @param {string[]} params.indexes - Allowed targeted indexes for this key
	 * @param {string} params.description - A description for your key
	 * @param {string[]} params.referers - A list of authorized referers
	 * @param {Object} params.queryParameters - Force the key to use specific query parameters
	 * @param {Function} callback - The result callback called with two arguments
	 *   error: null or Error('message')
	 *   content: the server answer with the modified API key
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.updateApiKey('APIKEY', ['search'], {
	 *   validity: 300,
	 *   maxQueriesPerIPPerHour: 2000,
	 *   maxHitsPerQuery: 3,
	 *   indexes: ['fruits'],
	 *   description: 'Eat three fruits',
	 *   referers: ['*.algolia.com'],
	 *   queryParameters: {
	 *     tagFilters: ['public'],
	 *   }
	 * })
	 * @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
	 */
	AlgoliaSearch.prototype.updateApiKey = function(key, acls, params, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: client.updateApiKey(key, arrayOfAcls[, params, callback])';

	  if (!isArray(acls)) {
	    throw new Error(usage);
	  }

	  if (arguments.length === 2 || typeof params === 'function') {
	    callback = params;
	    params = null;
	  }

	  var putObj = {
	    acl: acls
	  };

	  if (params) {
	    putObj.validity = params.validity;
	    putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	    putObj.maxHitsPerQuery = params.maxHitsPerQuery;
	    putObj.indexes = params.indexes;
	    putObj.description = params.description;

	    if (params.queryParameters) {
	      putObj.queryParameters = this._getSearchParams(params.queryParameters, '');
	    }

	    putObj.referers = params.referers;
	  }

	  return this._jsonRequest({
	    method: 'PUT',
	    url: '/1/keys/' + key,
	    body: putObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * Initialize a new batch of search queries
	 * @deprecated use client.search()
	 */
	AlgoliaSearch.prototype.startQueriesBatch = deprecate(function startQueriesBatchDeprecated() {
	  this._batch = [];
	}, deprecatedMessage('client.startQueriesBatch()', 'client.search()'));

	/**
	 * Add a search query in the batch
	 * @deprecated use client.search()
	 */
	AlgoliaSearch.prototype.addQueryInBatch = deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
	  this._batch.push({
	    indexName: indexName,
	    query: query,
	    params: args
	  });
	}, deprecatedMessage('client.addQueryInBatch()', 'client.search()'));

	/**
	 * Launch the batch of queries using XMLHttpRequest.
	 * @deprecated use client.search()
	 */
	AlgoliaSearch.prototype.sendQueriesBatch = deprecate(function sendQueriesBatchDeprecated(callback) {
	  return this.search(this._batch, callback);
	}, deprecatedMessage('client.sendQueriesBatch()', 'client.search()'));

	/**
	 * Perform write operations accross multiple indexes.
	 *
	 * To reduce the amount of time spent on network round trips,
	 * you can create, update, or delete several objects in one call,
	 * using the batch endpoint (all operations are done in the given order).
	 *
	 * Available actions:
	 *   - addObject
	 *   - updateObject
	 *   - partialUpdateObject
	 *   - partialUpdateObjectNoCreate
	 *   - deleteObject
	 *
	 * https://www.algolia.com/doc/rest_api#Indexes
	 * @param  {Object[]} operations An array of operations to perform
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.batch([{
	 *   action: 'addObject',
	 *   indexName: 'clients',
	 *   body: {
	 *     name: 'Bill'
	 *   }
	 * }, {
	 *   action: 'udpateObject',
	 *   indexName: 'fruits',
	 *   body: {
	 *     objectID: '29138',
	 *     name: 'banana'
	 *   }
	 * }], cb)
	 */
	AlgoliaSearch.prototype.batch = function(operations, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: client.batch(operations[, callback])';

	  if (!isArray(operations)) {
	    throw new Error(usage);
	  }

	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/*/batch',
	    body: {
	      requests: operations
	    },
	    hostType: 'write',
	    callback: callback
	  });
	};

	/**
	 * Assign or Move a userID to a cluster
	 *
	 * @param {string} data.userID The userID to assign to a new cluster
	 * @param {string} data.cluster The cluster to assign the user to
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.assignUserID({ cluster: 'c1-test', userID: 'some-user' });
	 */
	AlgoliaSearch.prototype.assignUserID = function(data, callback) {
	  if (!data.userID || !data.cluster) {
	    throw new errors.AlgoliaSearchError('You have to provide both a userID and cluster', data);
	  }
	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/clusters/mapping',
	    hostType: 'write',
	    body: {cluster: data.cluster},
	    callback: callback,
	    headers: {
	      'x-algolia-user-id': data.userID
	    }
	  });
	};

	/**
	 * Get the top userIDs
	 *
	 * (the callback is the second argument)
	 *
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.getTopUserID();
	 */
	AlgoliaSearch.prototype.getTopUserID = function(callback) {
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/clusters/mapping/top',
	    hostType: 'read',
	    callback: callback
	  });
	};

	/**
	 * Get userID
	 *
	 * @param {string} data.userID The userID to get info about
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.getUserID({ userID: 'some-user' });
	 */
	AlgoliaSearch.prototype.getUserID = function(data, callback) {
	  if (!data.userID) {
	    throw new errors.AlgoliaSearchError('You have to provide a userID', {debugData: data});
	  }
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/clusters/mapping/' + data.userID,
	    hostType: 'read',
	    callback: callback
	  });
	};

	/**
	 * List all the clusters
	 *
	 * (the callback is the second argument)
	 *
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.listClusters();
	 */
	AlgoliaSearch.prototype.listClusters = function(callback) {
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/clusters',
	    hostType: 'read',
	    callback: callback
	  });
	};

	/**
	 * List the userIDs
	 *
	 * (the callback is the second argument)
	 *
	 * @param {string} data.hitsPerPage How many hits on every page
	 * @param {string} data.page The page to retrieve
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.listClusters();
	 * client.listClusters({ page: 3, hitsPerPage: 30});
	 */
	AlgoliaSearch.prototype.listUserIDs = function(data, callback) {
	  return this._jsonRequest({
	    method: 'GET',
	    url: '/1/clusters/mapping',
	    body: data,
	    hostType: 'read',
	    callback: callback
	  });
	};

	/**
	 * Remove an userID
	 *
	 * @param {string} data.userID The userID to assign to a new cluster
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.removeUserID({ userID: 'some-user' });
	 */
	AlgoliaSearch.prototype.removeUserID = function(data, callback) {
	  if (!data.userID) {
	    throw new errors.AlgoliaSearchError('You have to provide a userID', {debugData: data});
	  }
	  return this._jsonRequest({
	    method: 'DELETE',
	    url: '/1/clusters/mapping',
	    hostType: 'write',
	    callback: callback,
	    headers: {
	      'x-algolia-user-id': data.userID
	    }
	  });
	};

	/**
	 * Search for userIDs
	 *
	 * @param {string} data.cluster The cluster to target
	 * @param {string} data.query The query to execute
	 * @param {string} data.hitsPerPage How many hits on every page
	 * @param {string} data.page The page to retrieve
	 * @return {Promise|undefined} Returns a promise if no callback given
	 * @example
	 * client.searchUserIDs({ cluster: 'c1-test', query: 'some-user' });
	 * client.searchUserIDs({
	 *   cluster: "c1-test",
	 *   query: "some-user",
	 *   page: 3,
	 *   hitsPerPage: 2
	 * });
	 */
	AlgoliaSearch.prototype.searchUserIDs = function(data, callback) {
	  return this._jsonRequest({
	    method: 'POST',
	    url: '/1/clusters/mapping/search',
	    body: data,
	    hostType: 'read',
	    callback: callback
	  });
	};

	// environment specific methods
	AlgoliaSearch.prototype.destroy = notImplemented;
	AlgoliaSearch.prototype.enableRateLimitForward = notImplemented;
	AlgoliaSearch.prototype.disableRateLimitForward = notImplemented;
	AlgoliaSearch.prototype.useSecuredAPIKey = notImplemented;
	AlgoliaSearch.prototype.disableSecuredAPIKey = notImplemented;
	AlgoliaSearch.prototype.generateSecuredApiKey = notImplemented;

	function notImplemented() {
	  var message = 'Not implemented in this environment.\n' +
	    'If you feel this is a mistake, write to support@algolia.com';

	  throw new errors.AlgoliaSearchError(message);
	}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var inherits = __webpack_require__(4);
	var IndexCore = __webpack_require__(8);
	var deprecate = __webpack_require__(12);
	var deprecatedMessage = __webpack_require__(13);
	var exitPromise = __webpack_require__(21);
	var errors = __webpack_require__(10);

	var deprecateForwardToSlaves = deprecate(
	  function() {},
	  deprecatedMessage('forwardToSlaves', 'forwardToReplicas')
	);

	module.exports = Index;

	function Index() {
	  IndexCore.apply(this, arguments);
	}

	inherits(Index, IndexCore);

	/*
	* Add an object in this index
	*
	* @param content contains the javascript object to add inside the index
	* @param objectID (optional) an objectID you want to attribute to this object
	* (if the attribute already exist the old object will be overwrite)
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that contains 3 elements: createAt, taskId and objectID
	*/
	Index.prototype.addObject = function(content, objectID, callback) {
	  var indexObj = this;

	  if (arguments.length === 1 || typeof objectID === 'function') {
	    callback = objectID;
	    objectID = undefined;
	  }

	  return this.as._jsonRequest({
	    method: objectID !== undefined ?
	    'PUT' : // update or create
	    'POST', // create (API generates an objectID)
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + // create
	    (objectID !== undefined ? '/' + encodeURIComponent(objectID) : ''), // update or create
	    body: content,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Add several objects
	*
	* @param objects contains an array of objects to add
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that updateAt and taskID
	*/
	Index.prototype.addObjects = function(objects, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: index.addObjects(arrayOfObjects[, callback])';

	  if (!isArray(objects)) {
	    throw new Error(usage);
	  }

	  var indexObj = this;
	  var postObj = {
	    requests: []
	  };
	  for (var i = 0; i < objects.length; ++i) {
	    var request = {
	      action: 'addObject',
	      body: objects[i]
	    };
	    postObj.requests.push(request);
	  }
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Update partially an object (only update attributes passed in argument)
	*
	* @param partialObject contains the javascript attributes to override, the
	*  object must contains an objectID attribute
	* @param createIfNotExists (optional) if false, avoid an automatic creation of the object
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that contains 3 elements: createAt, taskId and objectID
	*/
	Index.prototype.partialUpdateObject = function(partialObject, createIfNotExists, callback) {
	  if (arguments.length === 1 || typeof createIfNotExists === 'function') {
	    callback = createIfNotExists;
	    createIfNotExists = undefined;
	  }

	  var indexObj = this;
	  var url = '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial';
	  if (createIfNotExists === false) {
	    url += '?createIfNotExists=false';
	  }

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: url,
	    body: partialObject,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Partially Override the content of several objects
	*
	* @param objects contains an array of objects to update (each object must contains a objectID attribute)
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that updateAt and taskID
	*/
	Index.prototype.partialUpdateObjects = function(objects, createIfNotExists, callback) {
	  if (arguments.length === 1 || typeof createIfNotExists === 'function') {
	    callback = createIfNotExists;
	    createIfNotExists = true;
	  }

	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: index.partialUpdateObjects(arrayOfObjects[, callback])';

	  if (!isArray(objects)) {
	    throw new Error(usage);
	  }

	  var indexObj = this;
	  var postObj = {
	    requests: []
	  };
	  for (var i = 0; i < objects.length; ++i) {
	    var request = {
	      action: createIfNotExists === true ? 'partialUpdateObject' : 'partialUpdateObjectNoCreate',
	      objectID: objects[i].objectID,
	      body: objects[i]
	    };
	    postObj.requests.push(request);
	  }
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Override the content of object
	*
	* @param object contains the javascript object to save, the object must contains an objectID attribute
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that updateAt and taskID
	*/
	Index.prototype.saveObject = function(object, callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'PUT',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
	    body: object,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Override the content of several objects
	*
	* @param objects contains an array of objects to update (each object must contains a objectID attribute)
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that updateAt and taskID
	*/
	Index.prototype.saveObjects = function(objects, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: index.saveObjects(arrayOfObjects[, callback])';

	  if (!isArray(objects)) {
	    throw new Error(usage);
	  }

	  var indexObj = this;
	  var postObj = {
	    requests: []
	  };
	  for (var i = 0; i < objects.length; ++i) {
	    var request = {
	      action: 'updateObject',
	      objectID: objects[i].objectID,
	      body: objects[i]
	    };
	    postObj.requests.push(request);
	  }
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Delete an object from the index
	*
	* @param objectID the unique identifier of object to delete
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that contains 3 elements: createAt, taskId and objectID
	*/
	Index.prototype.deleteObject = function(objectID, callback) {
	  if (typeof objectID === 'function' || typeof objectID !== 'string' && typeof objectID !== 'number') {
	    var err = new errors.AlgoliaSearchError('Cannot delete an object without an objectID');
	    callback = objectID;
	    if (typeof callback === 'function') {
	      return callback(err);
	    }

	    return this.as._promise.reject(err);
	  }

	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'DELETE',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID),
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Delete several objects from an index
	*
	* @param objectIDs contains an array of objectID to delete
	* @param callback (optional) the result callback called with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that contains 3 elements: createAt, taskId and objectID
	*/
	Index.prototype.deleteObjects = function(objectIDs, callback) {
	  var isArray = __webpack_require__(19);
	  var map = __webpack_require__(20);

	  var usage = 'Usage: index.deleteObjects(arrayOfObjectIDs[, callback])';

	  if (!isArray(objectIDs)) {
	    throw new Error(usage);
	  }

	  var indexObj = this;
	  var postObj = {
	    requests: map(objectIDs, function prepareRequest(objectID) {
	      return {
	        action: 'deleteObject',
	        objectID: objectID,
	        body: {
	          objectID: objectID
	        }
	      };
	    })
	  };

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/batch',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Delete all objects matching a query
	*
	* @param query the query string
	* @param params the optional query parameters
	* @param callback (optional) the result callback called with one argument
	*  error: null or Error('message')
	* @deprecated see index.deleteBy
	*/
	Index.prototype.deleteByQuery = deprecate(function(query, params, callback) {
	  var clone = __webpack_require__(15);
	  var map = __webpack_require__(20);

	  var indexObj = this;
	  var client = indexObj.as;

	  if (arguments.length === 1 || typeof params === 'function') {
	    callback = params;
	    params = {};
	  } else {
	    params = clone(params);
	  }

	  params.attributesToRetrieve = 'objectID';
	  params.hitsPerPage = 1000;
	  params.distinct = false;

	  // when deleting, we should never use cache to get the
	  // search results
	  this.clearCache();

	  // there's a problem in how we use the promise chain,
	  // see how waitTask is done
	  var promise = this
	  .search(query, params)
	  .then(stopOrDelete);

	  function stopOrDelete(searchContent) {
	    // stop here
	    if (searchContent.nbHits === 0) {
	      // return indexObj.as._request.resolve();
	      return searchContent;
	    }

	    // continue and do a recursive call
	    var objectIDs = map(searchContent.hits, function getObjectID(object) {
	      return object.objectID;
	    });

	    return indexObj
	    .deleteObjects(objectIDs)
	    .then(waitTask)
	    .then(doDeleteByQuery);
	  }

	  function waitTask(deleteObjectsContent) {
	    return indexObj.waitTask(deleteObjectsContent.taskID);
	  }

	  function doDeleteByQuery() {
	    return indexObj.deleteByQuery(query, params);
	  }

	  if (!callback) {
	    return promise;
	  }

	  promise.then(success, failure);

	  function success() {
	    exitPromise(function exit() {
	      callback(null);
	    }, client._setTimeout || setTimeout);
	  }

	  function failure(err) {
	    exitPromise(function exit() {
	      callback(err);
	    }, client._setTimeout || setTimeout);
	  }
	}, deprecatedMessage('index.deleteByQuery()', 'index.deleteBy()'));

	/**
	* Delete all objects matching a query
	*
	* the query parameters that can be used are:
	* - filters (numeric, facet, tag)
	* - geo
	*
	* you can not send an empty query or filters
	*
	* @param params the optional query parameters
	* @param callback (optional) the result callback called with one argument
	*  error: null or Error('message')
	*/
	Index.prototype.deleteBy = function(params, callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/deleteByQuery',
	    body: {params: indexObj.as._getSearchParams(params, '')},
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Browse all content from an index using events. Basically this will do
	* .browse() -> .browseFrom -> .browseFrom -> .. until all the results are returned
	*
	* @param {string} query - The full text query
	* @param {Object} [queryParameters] - Any search query parameter
	* @return {EventEmitter}
	* @example
	* var browser = index.browseAll('cool songs', {
	*   tagFilters: 'public,comments',
	*   hitsPerPage: 500
	* });
	*
	* browser.on('result', function resultCallback(content) {
	*   console.log(content.hits);
	* });
	*
	* // if any error occurs, you get it
	* browser.on('error', function(err) {
	*   throw err;
	* });
	*
	* // when you have browsed the whole index, you get this event
	* browser.on('end', function() {
	*   console.log('finished');
	* });
	*
	* // at any point if you want to stop the browsing process, you can stop it manually
	* // otherwise it will go on and on
	* browser.stop();
	*
	* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	*/
	Index.prototype.browseAll = function(query, queryParameters) {
	  if (typeof query === 'object') {
	    queryParameters = query;
	    query = undefined;
	  }

	  var merge = __webpack_require__(14);

	  var IndexBrowser = __webpack_require__(22);

	  var browser = new IndexBrowser();
	  var client = this.as;
	  var index = this;
	  var params = client._getSearchParams(
	    merge({}, queryParameters || {}, {
	      query: query
	    }), ''
	  );

	  // start browsing
	  browseLoop();

	  function browseLoop(cursor) {
	    if (browser._stopped) {
	      return;
	    }

	    var body;

	    if (cursor !== undefined) {
	      body = {
	        cursor: cursor
	      };
	    } else {
	      body = {
	        params: params
	      };
	    }

	    client._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse',
	      hostType: 'read',
	      body: body,
	      callback: browseCallback
	    });
	  }

	  function browseCallback(err, content) {
	    if (browser._stopped) {
	      return;
	    }

	    if (err) {
	      browser._error(err);
	      return;
	    }

	    browser._result(content);

	    // no cursor means we are finished browsing
	    if (content.cursor === undefined) {
	      browser._end();
	      return;
	    }

	    browseLoop(content.cursor);
	  }

	  return browser;
	};

	/*
	* Get a Typeahead.js adapter
	* @param searchParams contains an object with query parameters (see search for details)
	*/
	Index.prototype.ttAdapter = deprecate(function(params) {
	  var self = this;
	  return function ttAdapter(query, syncCb, asyncCb) {
	    var cb;

	    if (typeof asyncCb === 'function') {
	      // typeahead 0.11
	      cb = asyncCb;
	    } else {
	      // pre typeahead 0.11
	      cb = syncCb;
	    }

	    self.search(query, params, function searchDone(err, content) {
	      if (err) {
	        cb(err);
	        return;
	      }

	      cb(content.hits);
	    });
	  };
	},
	'ttAdapter is not necessary anymore and will be removed in the next version,\n' +
	'have a look at autocomplete.js (https://github.com/algolia/autocomplete.js)');

	/*
	* Wait the publication of a task on the server.
	* All server task are asynchronous and you can check with this method that the task is published.
	*
	* @param taskID the id of the task returned by server
	* @param callback the result callback with with two arguments:
	*  error: null or Error('message')
	*  content: the server answer that contains the list of results
	*/
	Index.prototype.waitTask = function(taskID, callback) {
	  // wait minimum 100ms before retrying
	  var baseDelay = 100;
	  // wait maximum 5s before retrying
	  var maxDelay = 5000;
	  var loop = 0;

	  // waitTask() must be handled differently from other methods,
	  // it's a recursive method using a timeout
	  var indexObj = this;
	  var client = indexObj.as;

	  var promise = retryLoop();

	  function retryLoop() {
	    return client._jsonRequest({
	      method: 'GET',
	      hostType: 'read',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/task/' + taskID
	    }).then(function success(content) {
	      loop++;
	      var delay = baseDelay * loop * loop;
	      if (delay > maxDelay) {
	        delay = maxDelay;
	      }

	      if (content.status !== 'published') {
	        return client._promise.delay(delay).then(retryLoop);
	      }

	      return content;
	    });
	  }

	  if (!callback) {
	    return promise;
	  }

	  promise.then(successCb, failureCb);

	  function successCb(content) {
	    exitPromise(function exit() {
	      callback(null, content);
	    }, client._setTimeout || setTimeout);
	  }

	  function failureCb(err) {
	    exitPromise(function exit() {
	      callback(err);
	    }, client._setTimeout || setTimeout);
	  }
	};

	/*
	* This function deletes the index content. Settings and index specific API keys are kept untouched.
	*
	* @param callback (optional) the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the settings object or the error message if a failure occured
	*/
	Index.prototype.clearIndex = function(callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
	    hostType: 'write',
	    callback: callback
	  });
	};

	/*
	* Get settings of this index
	*
	* @param opts an object of options to add
	* @param opts.advanced get more settings like nbShards (useful for Enterprise)
	* @param callback (optional) the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the settings object or the error message if a failure occurred
	*/
	Index.prototype.getSettings = function(opts, callback) {
	  if (arguments.length === 1 && typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  opts = opts || {};

	  var indexName = encodeURIComponent(this.indexName);
	  return this.as._jsonRequest({
	    method: 'GET',
	    url:
	      '/1/indexes/' +
	      indexName +
	      '/settings?getVersion=2' +
	      (opts.advanced ? '&advanced=' + opts.advanced : ''),
	    hostType: 'read',
	    callback: callback
	  });
	};

	Index.prototype.searchSynonyms = function(params, callback) {
	  if (typeof params === 'function') {
	    callback = params;
	    params = {};
	  } else if (params === undefined) {
	    params = {};
	  }

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/search',
	    body: params,
	    hostType: 'read',
	    callback: callback
	  });
	};

	function exportData(method, _hitsPerPage, callback) {
	  function search(page, _previous) {
	    var options = {
	      page: page || 0,
	      hitsPerPage: _hitsPerPage || 100
	    };
	    var previous = _previous || [];

	    return method(options).then(function(result) {
	      var hits = result.hits;
	      var nbHits = result.nbHits;
	      var current = hits.map(function(s) {
	        delete s._highlightResult;
	        return s;
	      });
	      var synonyms = previous.concat(current);
	      if (synonyms.length < nbHits) {
	        return search(options.page + 1, synonyms);
	      }
	      return synonyms;
	    });
	  }
	  return search().then(function(data) {
	    if (typeof callback === 'function') {
	      callback(data);
	      return undefined;
	    }
	    return data;
	  });
	}

	/**
	 * Retrieve all the synonyms in an index
	 * @param [number=100] hitsPerPage The amount of synonyms to retrieve per batch
	 * @param [function] callback will be called after all synonyms are retrieved
	 */
	Index.prototype.exportSynonyms = function(hitsPerPage, callback) {
	  return exportData(this.searchSynonyms.bind(this), hitsPerPage, callback);
	};

	Index.prototype.saveSynonym = function(synonym, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  if (opts.forwardToSlaves !== undefined) deprecateForwardToSlaves();
	  var forwardToReplicas = (opts.forwardToSlaves || opts.forwardToReplicas) ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'PUT',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/' + encodeURIComponent(synonym.objectID) +
	      '?forwardToReplicas=' + forwardToReplicas,
	    body: synonym,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.getSynonym = function(objectID, callback) {
	  return this.as._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/' + encodeURIComponent(objectID),
	    hostType: 'read',
	    callback: callback
	  });
	};

	Index.prototype.deleteSynonym = function(objectID, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  if (opts.forwardToSlaves !== undefined) deprecateForwardToSlaves();
	  var forwardToReplicas = (opts.forwardToSlaves || opts.forwardToReplicas) ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'DELETE',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/' + encodeURIComponent(objectID) +
	      '?forwardToReplicas=' + forwardToReplicas,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.clearSynonyms = function(opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  if (opts.forwardToSlaves !== undefined) deprecateForwardToSlaves();
	  var forwardToReplicas = (opts.forwardToSlaves || opts.forwardToReplicas) ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/clear' +
	      '?forwardToReplicas=' + forwardToReplicas,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.batchSynonyms = function(synonyms, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  if (opts.forwardToSlaves !== undefined) deprecateForwardToSlaves();
	  var forwardToReplicas = (opts.forwardToSlaves || opts.forwardToReplicas) ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/synonyms/batch' +
	      '?forwardToReplicas=' + forwardToReplicas +
	      '&replaceExistingSynonyms=' + (opts.replaceExistingSynonyms ? 'true' : 'false'),
	    hostType: 'write',
	    body: synonyms,
	    callback: callback
	  });
	};

	Index.prototype.searchRules = function(params, callback) {
	  if (typeof params === 'function') {
	    callback = params;
	    params = {};
	  } else if (params === undefined) {
	    params = {};
	  }

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/search',
	    body: params,
	    hostType: 'read',
	    callback: callback
	  });
	};
	/**
	 * Retrieve all the query rules in an index
	 * @param [number=100] hitsPerPage The amount of query rules to retrieve per batch
	 * @param [function] callback will be called after all query rules are retrieved
	 *  error: null or Error('message')
	 */
	Index.prototype.exportRules = function(hitsPerPage, callback) {
	  return exportData(this.searchRules.bind(this), hitsPerPage, callback);
	};

	Index.prototype.saveRule = function(rule, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  if (!rule.objectID) {
	    throw new errors.AlgoliaSearchError('Missing or empty objectID field for rule');
	  }

	  var forwardToReplicas = opts.forwardToReplicas === true ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'PUT',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/' + encodeURIComponent(rule.objectID) +
	      '?forwardToReplicas=' + forwardToReplicas,
	    body: rule,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.getRule = function(objectID, callback) {
	  return this.as._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/' + encodeURIComponent(objectID),
	    hostType: 'read',
	    callback: callback
	  });
	};

	Index.prototype.deleteRule = function(objectID, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  var forwardToReplicas = opts.forwardToReplicas === true ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'DELETE',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/' + encodeURIComponent(objectID) +
	      '?forwardToReplicas=' + forwardToReplicas,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.clearRules = function(opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  var forwardToReplicas = opts.forwardToReplicas === true ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/clear' +
	      '?forwardToReplicas=' + forwardToReplicas,
	    hostType: 'write',
	    callback: callback
	  });
	};

	Index.prototype.batchRules = function(rules, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  var forwardToReplicas = opts.forwardToReplicas === true ? 'true' : 'false';

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/rules/batch' +
	      '?forwardToReplicas=' + forwardToReplicas +
	      '&clearExistingRules=' + (opts.clearExistingRules === true ? 'true' : 'false'),
	    hostType: 'write',
	    body: rules,
	    callback: callback
	  });
	};

	/*
	* Set settings for this index
	*
	* @param settigns the settings object that can contains :
	* - minWordSizefor1Typo: (integer) the minimum number of characters to accept one typo (default = 3).
	* - minWordSizefor2Typos: (integer) the minimum number of characters to accept two typos (default = 7).
	* - hitsPerPage: (integer) the number of hits per page (default = 10).
	* - attributesToRetrieve: (array of strings) default list of attributes to retrieve in objects.
	*   If set to null, all attributes are retrieved.
	* - attributesToHighlight: (array of strings) default list of attributes to highlight.
	*   If set to null, all indexed attributes are highlighted.
	* - attributesToSnippet**: (array of strings) default list of attributes to snippet alongside the number
	* of words to return (syntax is attributeName:nbWords).
	*   By default no snippet is computed. If set to null, no snippet is computed.
	* - attributesToIndex: (array of strings) the list of fields you want to index.
	*   If set to null, all textual and numerical attributes of your objects are indexed,
	*   but you should update it to get optimal results.
	*   This parameter has two important uses:
	*     - Limit the attributes to index: For example if you store a binary image in base64,
	*     you want to store it and be able to
	*       retrieve it but you don't want to search in the base64 string.
	*     - Control part of the ranking*: (see the ranking parameter for full explanation)
	*     Matches in attributes at the beginning of
	*       the list will be considered more important than matches in attributes further down the list.
	*       In one attribute, matching text at the beginning of the attribute will be
	*       considered more important than text after, you can disable
	*       this behavior if you add your attribute inside `unordered(AttributeName)`,
	*       for example attributesToIndex: ["title", "unordered(text)"].
	* - attributesForFaceting: (array of strings) The list of fields you want to use for faceting.
	*   All strings in the attribute selected for faceting are extracted and added as a facet.
	*   If set to null, no attribute is used for faceting.
	* - attributeForDistinct: (string) The attribute name used for the Distinct feature.
	* This feature is similar to the SQL "distinct" keyword: when enabled
	*   in query with the distinct=1 parameter, all hits containing a duplicate
	*   value for this attribute are removed from results.
	*   For example, if the chosen attribute is show_name and several hits have
	*   the same value for show_name, then only the best one is kept and others are removed.
	* - ranking: (array of strings) controls the way results are sorted.
	*   We have six available criteria:
	*    - typo: sort according to number of typos,
	*    - geo: sort according to decreassing distance when performing a geo-location based search,
	*    - proximity: sort according to the proximity of query words in hits,
	*    - attribute: sort according to the order of attributes defined by attributesToIndex,
	*    - exact:
	*        - if the user query contains one word: sort objects having an attribute
	*        that is exactly the query word before others.
	*          For example if you search for the "V" TV show, you want to find it
	*          with the "V" query and avoid to have all popular TV
	*          show starting by the v letter before it.
	*        - if the user query contains multiple words: sort according to the
	*        number of words that matched exactly (and not as a prefix).
	*    - custom: sort according to a user defined formula set in **customRanking** attribute.
	*   The standard order is ["typo", "geo", "proximity", "attribute", "exact", "custom"]
	* - customRanking: (array of strings) lets you specify part of the ranking.
	*   The syntax of this condition is an array of strings containing attributes
	*   prefixed by asc (ascending order) or desc (descending order) operator.
	*   For example `"customRanking" => ["desc(population)", "asc(name)"]`
	* - queryType: Select how the query words are interpreted, it can be one of the following value:
	*   - prefixAll: all query words are interpreted as prefixes,
	*   - prefixLast: only the last word is interpreted as a prefix (default behavior),
	*   - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
	* - highlightPreTag: (string) Specify the string that is inserted before
	* the highlighted parts in the query result (default to "<em>").
	* - highlightPostTag: (string) Specify the string that is inserted after
	* the highlighted parts in the query result (default to "</em>").
	* - optionalWords: (array of strings) Specify a list of words that should
	* be considered as optional when found in the query.
	* @param callback (optional) the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the server answer or the error message if a failure occured
	*/
	Index.prototype.setSettings = function(settings, opts, callback) {
	  if (arguments.length === 1 || typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }

	  if (opts.forwardToSlaves !== undefined) deprecateForwardToSlaves();
	  var forwardToReplicas = (opts.forwardToSlaves || opts.forwardToReplicas) ? 'true' : 'false';

	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'PUT',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings?forwardToReplicas='
	      + forwardToReplicas,
	    hostType: 'write',
	    body: settings,
	    callback: callback
	  });
	};

	/*
	* @deprecated see client.listApiKeys()
	*/
	Index.prototype.listUserKeys = deprecate(function(callback) {
	  return this.listApiKeys(callback);
	}, deprecatedMessage('index.listUserKeys()', 'client.listApiKeys()'));

	/*
	* List all existing API keys to this index
	*
	* @param callback the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the server answer with API keys belonging to the index
	*
	* @deprecated see client.listApiKeys()
	*/
	Index.prototype.listApiKeys = deprecate(function(callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
	    hostType: 'read',
	    callback: callback
	  });
	}, deprecatedMessage('index.listApiKeys()', 'client.listApiKeys()'));

	/*
	* @deprecated see client.getApiKey()
	*/
	Index.prototype.getUserKeyACL = deprecate(function(key, callback) {
	  return this.getApiKey(key, callback);
	}, deprecatedMessage('index.getUserKeyACL()', 'client.getApiKey()'));


	/*
	* Get an API key from this index
	*
	* @param key
	* @param callback the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the server answer with the right API key
	*
	* @deprecated see client.getApiKey()
	*/
	Index.prototype.getApiKey = deprecate(function(key, callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	    hostType: 'read',
	    callback: callback
	  });
	}, deprecatedMessage('index.getApiKey()', 'client.getApiKey()'));

	/*
	* @deprecated see client.deleteApiKey()
	*/
	Index.prototype.deleteUserKey = deprecate(function(key, callback) {
	  return this.deleteApiKey(key, callback);
	}, deprecatedMessage('index.deleteUserKey()', 'client.deleteApiKey()'));

	/*
	* Delete an existing API key associated to this index
	*
	* @param key
	* @param callback the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the server answer with the deletion date
	*
	* @deprecated see client.deleteApiKey()
	*/
	Index.prototype.deleteApiKey = deprecate(function(key, callback) {
	  var indexObj = this;
	  return this.as._jsonRequest({
	    method: 'DELETE',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	    hostType: 'write',
	    callback: callback
	  });
	}, deprecatedMessage('index.deleteApiKey()', 'client.deleteApiKey()'));

	/*
	* @deprecated see client.addApiKey()
	*/
	Index.prototype.addUserKey = deprecate(function(acls, params, callback) {
	  return this.addApiKey(acls, params, callback);
	}, deprecatedMessage('index.addUserKey()', 'client.addApiKey()'));

	/*
	* Add a new API key to this index
	*
	* @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	*   can contains the following values:
	*     - search: allow to search (https and http)
	*     - addObject: allows to add/update an object in the index (https only)
	*     - deleteObject : allows to delete an existing object (https only)
	*     - deleteIndex : allows to delete index content (https only)
	*     - settings : allows to get index settings (https only)
	*     - editSettings : allows to change index settings (https only)
	* @param {Object} [params] - Optionnal parameters to set for the key
	* @param {number} params.validity - Number of seconds after which the key will
	* be automatically removed (0 means no time limit for this key)
	* @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	* @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	* @param {string} params.description - A description for your key
	* @param {string[]} params.referers - A list of authorized referers
	* @param {Object} params.queryParameters - Force the key to use specific query parameters
	* @param {Function} callback - The result callback called with two arguments
	*   error: null or Error('message')
	*   content: the server answer with the added API key
	* @return {Promise|undefined} Returns a promise if no callback given
	* @example
	* index.addUserKey(['search'], {
	*   validity: 300,
	*   maxQueriesPerIPPerHour: 2000,
	*   maxHitsPerQuery: 3,
	*   description: 'Eat three fruits',
	*   referers: ['*.algolia.com'],
	*   queryParameters: {
	*     tagFilters: ['public'],
	*   }
	* })
	* @see {@link https://www.algolia.com/doc/rest_api#AddIndexKey|Algolia REST API Documentation}
	*
	* @deprecated see client.addApiKey()
	*/
	Index.prototype.addApiKey = deprecate(function(acls, params, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: index.addApiKey(arrayOfAcls[, params, callback])';

	  if (!isArray(acls)) {
	    throw new Error(usage);
	  }

	  if (arguments.length === 1 || typeof params === 'function') {
	    callback = params;
	    params = null;
	  }

	  var postObj = {
	    acl: acls
	  };

	  if (params) {
	    postObj.validity = params.validity;
	    postObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	    postObj.maxHitsPerQuery = params.maxHitsPerQuery;
	    postObj.description = params.description;

	    if (params.queryParameters) {
	      postObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
	    }

	    postObj.referers = params.referers;
	  }

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys',
	    body: postObj,
	    hostType: 'write',
	    callback: callback
	  });
	}, deprecatedMessage('index.addApiKey()', 'client.addApiKey()'));

	/**
	* @deprecated use client.addApiKey()
	*/
	Index.prototype.addUserKeyWithValidity = deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
	  return this.addApiKey(acls, params, callback);
	}, deprecatedMessage('index.addUserKeyWithValidity()', 'client.addApiKey()'));

	/*
	* @deprecated see client.updateApiKey()
	*/
	Index.prototype.updateUserKey = deprecate(function(key, acls, params, callback) {
	  return this.updateApiKey(key, acls, params, callback);
	}, deprecatedMessage('index.updateUserKey()', 'client.updateApiKey()'));

	/**
	* Update an existing API key of this index
	* @param {string} key - The key to update
	* @param {string[]} acls - The list of ACL for this key. Defined by an array of strings that
	*   can contains the following values:
	*     - search: allow to search (https and http)
	*     - addObject: allows to add/update an object in the index (https only)
	*     - deleteObject : allows to delete an existing object (https only)
	*     - deleteIndex : allows to delete index content (https only)
	*     - settings : allows to get index settings (https only)
	*     - editSettings : allows to change index settings (https only)
	* @param {Object} [params] - Optionnal parameters to set for the key
	* @param {number} params.validity - Number of seconds after which the key will
	* be automatically removed (0 means no time limit for this key)
	* @param {number} params.maxQueriesPerIPPerHour - Number of API calls allowed from an IP address per hour
	* @param {number} params.maxHitsPerQuery - Number of hits this API key can retrieve in one call
	* @param {string} params.description - A description for your key
	* @param {string[]} params.referers - A list of authorized referers
	* @param {Object} params.queryParameters - Force the key to use specific query parameters
	* @param {Function} callback - The result callback called with two arguments
	*   error: null or Error('message')
	*   content: the server answer with user keys list
	* @return {Promise|undefined} Returns a promise if no callback given
	* @example
	* index.updateApiKey('APIKEY', ['search'], {
	*   validity: 300,
	*   maxQueriesPerIPPerHour: 2000,
	*   maxHitsPerQuery: 3,
	*   description: 'Eat three fruits',
	*   referers: ['*.algolia.com'],
	*   queryParameters: {
	*     tagFilters: ['public'],
	*   }
	* })
	* @see {@link https://www.algolia.com/doc/rest_api#UpdateIndexKey|Algolia REST API Documentation}
	*
	* @deprecated see client.updateApiKey()
	*/
	Index.prototype.updateApiKey = deprecate(function(key, acls, params, callback) {
	  var isArray = __webpack_require__(19);
	  var usage = 'Usage: index.updateApiKey(key, arrayOfAcls[, params, callback])';

	  if (!isArray(acls)) {
	    throw new Error(usage);
	  }

	  if (arguments.length === 2 || typeof params === 'function') {
	    callback = params;
	    params = null;
	  }

	  var putObj = {
	    acl: acls
	  };

	  if (params) {
	    putObj.validity = params.validity;
	    putObj.maxQueriesPerIPPerHour = params.maxQueriesPerIPPerHour;
	    putObj.maxHitsPerQuery = params.maxHitsPerQuery;
	    putObj.description = params.description;

	    if (params.queryParameters) {
	      putObj.queryParameters = this.as._getSearchParams(params.queryParameters, '');
	    }

	    putObj.referers = params.referers;
	  }

	  return this.as._jsonRequest({
	    method: 'PUT',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/keys/' + key,
	    body: putObj,
	    hostType: 'write',
	    callback: callback
	  });
	}, deprecatedMessage('index.updateApiKey()', 'client.updateApiKey()'));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var buildSearchMethod = __webpack_require__(9);
	var deprecate = __webpack_require__(12);
	var deprecatedMessage = __webpack_require__(13);

	module.exports = IndexCore;

	/*
	* Index class constructor.
	* You should not use this method directly but use initIndex() function
	*/
	function IndexCore(algoliasearch, indexName) {
	  this.indexName = indexName;
	  this.as = algoliasearch;
	  this.typeAheadArgs = null;
	  this.typeAheadValueOption = null;

	  // make sure every index instance has it's own cache
	  this.cache = {};
	}

	/*
	* Clear all queries in cache
	*/
	IndexCore.prototype.clearCache = function() {
	  this.cache = {};
	};

	/*
	* Search inside the index using XMLHttpRequest request (Using a POST query to
	* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	*
	* @param {string} [query] the full text query
	* @param {object} [args] (optional) if set, contains an object with query parameters:
	* - page: (integer) Pagination parameter used to select the page to retrieve.
	*                   Page is zero-based and defaults to 0. Thus,
	*                   to retrieve the 10th page you need to set page=9
	* - hitsPerPage: (integer) Pagination parameter used to select the number of hits per page. Defaults to 20.
	* - attributesToRetrieve: a string that contains the list of object attributes
	* you want to retrieve (let you minimize the answer size).
	*   Attributes are separated with a comma (for example "name,address").
	*   You can also use an array (for example ["name","address"]).
	*   By default, all attributes are retrieved. You can also use '*' to retrieve all
	*   values when an attributesToRetrieve setting is specified for your index.
	* - attributesToHighlight: a string that contains the list of attributes you
	*   want to highlight according to the query.
	*   Attributes are separated by a comma. You can also use an array (for example ["name","address"]).
	*   If an attribute has no match for the query, the raw value is returned.
	*   By default all indexed text attributes are highlighted.
	*   You can use `*` if you want to highlight all textual attributes.
	*   Numerical attributes are not highlighted.
	*   A matchLevel is returned for each highlighted attribute and can contain:
	*      - full: if all the query terms were found in the attribute,
	*      - partial: if only some of the query terms were found,
	*      - none: if none of the query terms were found.
	* - attributesToSnippet: a string that contains the list of attributes to snippet alongside
	* the number of words to return (syntax is `attributeName:nbWords`).
	*    Attributes are separated by a comma (Example: attributesToSnippet=name:10,content:10).
	*    You can also use an array (Example: attributesToSnippet: ['name:10','content:10']).
	*    By default no snippet is computed.
	* - minWordSizefor1Typo: the minimum number of characters in a query word to accept one typo in this word.
	* Defaults to 3.
	* - minWordSizefor2Typos: the minimum number of characters in a query word
	* to accept two typos in this word. Defaults to 7.
	* - getRankingInfo: if set to 1, the result hits will contain ranking
	* information in _rankingInfo attribute.
	* - aroundLatLng: search for entries around a given
	* latitude/longitude (specified as two floats separated by a comma).
	*   For example aroundLatLng=47.316669,5.016670).
	*   You can specify the maximum distance in meters with the aroundRadius parameter (in meters)
	*   and the precision for ranking with aroundPrecision
	*   (for example if you set aroundPrecision=100, two objects that are distant of
	*   less than 100m will be considered as identical for "geo" ranking parameter).
	*   At indexing, you should specify geoloc of an object with the _geoloc attribute
	*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
	* - insideBoundingBox: search entries inside a given area defined by the two extreme points
	* of a rectangle (defined by 4 floats: p1Lat,p1Lng,p2Lat,p2Lng).
	*   For example insideBoundingBox=47.3165,4.9665,47.3424,5.0201).
	*   At indexing, you should specify geoloc of an object with the _geoloc attribute
	*   (in the form {"_geoloc":{"lat":48.853409, "lng":2.348800}})
	* - numericFilters: a string that contains the list of numeric filters you want to
	* apply separated by a comma.
	*   The syntax of one filter is `attributeName` followed by `operand` followed by `value`.
	*   Supported operands are `<`, `<=`, `=`, `>` and `>=`.
	*   You can have multiple conditions on one attribute like for example numericFilters=price>100,price<1000.
	*   You can also use an array (for example numericFilters: ["price>100","price<1000"]).
	* - tagFilters: filter the query by a set of tags. You can AND tags by separating them by commas.
	*   To OR tags, you must add parentheses. For example, tags=tag1,(tag2,tag3) means tag1 AND (tag2 OR tag3).
	*   You can also use an array, for example tagFilters: ["tag1",["tag2","tag3"]]
	*   means tag1 AND (tag2 OR tag3).
	*   At indexing, tags should be added in the _tags** attribute
	*   of objects (for example {"_tags":["tag1","tag2"]}).
	* - facetFilters: filter the query by a list of facets.
	*   Facets are separated by commas and each facet is encoded as `attributeName:value`.
	*   For example: `facetFilters=category:Book,author:John%20Doe`.
	*   You can also use an array (for example `["category:Book","author:John%20Doe"]`).
	* - facets: List of object attributes that you want to use for faceting.
	*   Comma separated list: `"category,author"` or array `['category','author']`
	*   Only attributes that have been added in **attributesForFaceting** index setting
	*   can be used in this parameter.
	*   You can also use `*` to perform faceting on all attributes specified in **attributesForFaceting**.
	* - queryType: select how the query words are interpreted, it can be one of the following value:
	*    - prefixAll: all query words are interpreted as prefixes,
	*    - prefixLast: only the last word is interpreted as a prefix (default behavior),
	*    - prefixNone: no query word is interpreted as a prefix. This option is not recommended.
	* - optionalWords: a string that contains the list of words that should
	* be considered as optional when found in the query.
	*   Comma separated and array are accepted.
	* - distinct: If set to 1, enable the distinct feature (disabled by default)
	* if the attributeForDistinct index setting is set.
	*   This feature is similar to the SQL "distinct" keyword: when enabled
	*   in a query with the distinct=1 parameter,
	*   all hits containing a duplicate value for the attributeForDistinct attribute are removed from results.
	*   For example, if the chosen attribute is show_name and several hits have
	*   the same value for show_name, then only the best
	*   one is kept and others are removed.
	* - restrictSearchableAttributes: List of attributes you want to use for
	* textual search (must be a subset of the attributesToIndex index setting)
	* either comma separated or as an array
	* @param {function} [callback] the result callback called with two arguments:
	*  error: null or Error('message'). If false, the content contains the error.
	*  content: the server answer that contains the list of results.
	*/
	IndexCore.prototype.search = buildSearchMethod('query');

	/*
	* -- BETA --
	* Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
	* minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	*
	* @param {string} [query] the similar query
	* @param {object} [args] (optional) if set, contains an object with query parameters.
	*   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
	*   are the two most useful to restrict the similar results and get more relevant content
	*/
	IndexCore.prototype.similarSearch = buildSearchMethod('similarQuery');

	/*
	* Browse index content. The response content will have a `cursor` property that you can use
	* to browse subsequent pages for this query. Use `index.browseFrom(cursor)` when you want.
	*
	* @param {string} query - The full text query
	* @param {Object} [queryParameters] - Any search query parameter
	* @param {Function} [callback] - The result callback called with two arguments
	*   error: null or Error('message')
	*   content: the server answer with the browse result
	* @return {Promise|undefined} Returns a promise if no callback given
	* @example
	* index.browse('cool songs', {
	*   tagFilters: 'public,comments',
	*   hitsPerPage: 500
	* }, callback);
	* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	*/
	IndexCore.prototype.browse = function(query, queryParameters, callback) {
	  var merge = __webpack_require__(14);

	  var indexObj = this;

	  var page;
	  var hitsPerPage;

	  // we check variadic calls that are not the one defined
	  // .browse()/.browse(fn)
	  // => page = 0
	  if (arguments.length === 0 || arguments.length === 1 && typeof arguments[0] === 'function') {
	    page = 0;
	    callback = arguments[0];
	    query = undefined;
	  } else if (typeof arguments[0] === 'number') {
	    // .browse(2)/.browse(2, 10)/.browse(2, fn)/.browse(2, 10, fn)
	    page = arguments[0];
	    if (typeof arguments[1] === 'number') {
	      hitsPerPage = arguments[1];
	    } else if (typeof arguments[1] === 'function') {
	      callback = arguments[1];
	      hitsPerPage = undefined;
	    }
	    query = undefined;
	    queryParameters = undefined;
	  } else if (typeof arguments[0] === 'object') {
	    // .browse(queryParameters)/.browse(queryParameters, cb)
	    if (typeof arguments[1] === 'function') {
	      callback = arguments[1];
	    }
	    queryParameters = arguments[0];
	    query = undefined;
	  } else if (typeof arguments[0] === 'string' && typeof arguments[1] === 'function') {
	    // .browse(query, cb)
	    callback = arguments[1];
	    queryParameters = undefined;
	  }

	  // otherwise it's a .browse(query)/.browse(query, queryParameters)/.browse(query, queryParameters, cb)

	  // get search query parameters combining various possible calls
	  // to .browse();
	  queryParameters = merge({}, queryParameters || {}, {
	    page: page,
	    hitsPerPage: hitsPerPage,
	    query: query
	  });

	  var params = this.as._getSearchParams(queryParameters, '');

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse',
	    body: {params: params},
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	* Continue browsing from a previous position (cursor), obtained via a call to `.browse()`.
	*
	* @param {string} query - The full text query
	* @param {Object} [queryParameters] - Any search query parameter
	* @param {Function} [callback] - The result callback called with two arguments
	*   error: null or Error('message')
	*   content: the server answer with the browse result
	* @return {Promise|undefined} Returns a promise if no callback given
	* @example
	* index.browseFrom('14lkfsakl32', callback);
	* @see {@link https://www.algolia.com/doc/rest_api#Browse|Algolia REST API Documentation}
	*/
	IndexCore.prototype.browseFrom = function(cursor, callback) {
	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse',
	    body: {cursor: cursor},
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	* Search for facet values
	* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
	*
	* @param {string} params.facetName Facet name, name of the attribute to search for values in.
	* Must be declared as a facet
	* @param {string} params.facetQuery Query for the facet search
	* @param {string} [params.*] Any search parameter of Algolia,
	* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
	* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
	* @param callback (optional)
	*/
	IndexCore.prototype.searchForFacetValues = function(params, callback) {
	  var clone = __webpack_require__(15);
	  var omit = __webpack_require__(16);
	  var usage = 'Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])';

	  if (params.facetName === undefined || params.facetQuery === undefined) {
	    throw new Error(usage);
	  }

	  var facetName = params.facetName;
	  var filteredParams = omit(clone(params), function(keyName) {
	    return keyName === 'facetName';
	  });
	  var searchParameters = this.as._getSearchParams(filteredParams, '');

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/' +
	      encodeURIComponent(this.indexName) + '/facets/' + encodeURIComponent(facetName) + '/query',
	    hostType: 'read',
	    body: {params: searchParameters},
	    callback: callback
	  });
	};

	IndexCore.prototype.searchFacet = deprecate(function(params, callback) {
	  return this.searchForFacetValues(params, callback);
	}, deprecatedMessage(
	  'index.searchFacet(params[, callback])',
	  'index.searchForFacetValues(params[, callback])'
	));

	IndexCore.prototype._search = function(params, url, callback, additionalUA) {
	  return this.as._jsonRequest({
	    cache: this.cache,
	    method: 'POST',
	    url: url || '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
	    body: {params: params},
	    hostType: 'read',
	    fallback: {
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName),
	      body: {params: params}
	    },
	    callback: callback,
	    additionalUA: additionalUA
	  });
	};

	/*
	* Get an object from this index
	*
	* @param objectID the unique identifier of the object to retrieve
	* @param attrs (optional) if set, contains the array of attribute names to retrieve
	* @param callback (optional) the result callback called with two arguments
	*  error: null or Error('message')
	*  content: the object to retrieve or the error message if a failure occured
	*/
	IndexCore.prototype.getObject = function(objectID, attrs, callback) {
	  var indexObj = this;

	  if (arguments.length === 1 || typeof attrs === 'function') {
	    callback = attrs;
	    attrs = undefined;
	  }

	  var params = '';
	  if (attrs !== undefined) {
	    params = '?attributes=';
	    for (var i = 0; i < attrs.length; ++i) {
	      if (i !== 0) {
	        params += ',';
	      }
	      params += attrs[i];
	    }
	  }

	  return this.as._jsonRequest({
	    method: 'GET',
	    url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(objectID) + params,
	    hostType: 'read',
	    callback: callback
	  });
	};

	/*
	* Get several objects from this index
	*
	* @param objectIDs the array of unique identifier of objects to retrieve
	*/
	IndexCore.prototype.getObjects = function(objectIDs, attributesToRetrieve, callback) {
	  var isArray = __webpack_require__(19);
	  var map = __webpack_require__(20);

	  var usage = 'Usage: index.getObjects(arrayOfObjectIDs[, callback])';

	  if (!isArray(objectIDs)) {
	    throw new Error(usage);
	  }

	  var indexObj = this;

	  if (arguments.length === 1 || typeof attributesToRetrieve === 'function') {
	    callback = attributesToRetrieve;
	    attributesToRetrieve = undefined;
	  }

	  var body = {
	    requests: map(objectIDs, function prepareRequest(objectID) {
	      var request = {
	        indexName: indexObj.indexName,
	        objectID: objectID
	      };

	      if (attributesToRetrieve) {
	        request.attributesToRetrieve = attributesToRetrieve.join(',');
	      }

	      return request;
	    })
	  };

	  return this.as._jsonRequest({
	    method: 'POST',
	    url: '/1/indexes/*/objects',
	    hostType: 'read',
	    body: body,
	    callback: callback
	  });
	};

	IndexCore.prototype.as = null;
	IndexCore.prototype.indexName = null;
	IndexCore.prototype.typeAheadArgs = null;
	IndexCore.prototype.typeAheadValueOption = null;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = buildSearchMethod;

	var errors = __webpack_require__(10);

	/**
	 * Creates a search method to be used in clients
	 * @param {string} queryParam the name of the attribute used for the query
	 * @param {string} url the url
	 * @return {function} the search method
	 */
	function buildSearchMethod(queryParam, url) {
	  /**
	   * The search method. Prepares the data and send the query to Algolia.
	   * @param {string} query the string used for query search
	   * @param {object} args additional parameters to send with the search
	   * @param {function} [callback] the callback to be called with the client gets the answer
	   * @return {undefined|Promise} If the callback is not provided then this methods returns a Promise
	   */
	  return function search(query, args, callback) {
	    // warn V2 users on how to search
	    if (typeof query === 'function' && typeof args === 'object' ||
	      typeof callback === 'object') {
	      // .search(query, params, cb)
	      // .search(cb, params)
	      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
	    }

	    // Normalizing the function signature
	    if (arguments.length === 0 || typeof query === 'function') {
	      // Usage : .search(), .search(cb)
	      callback = query;
	      query = '';
	    } else if (arguments.length === 1 || typeof args === 'function') {
	      // Usage : .search(query/args), .search(query, cb)
	      callback = args;
	      args = undefined;
	    }
	    // At this point we have 3 arguments with values

	    // Usage : .search(args) // careful: typeof null === 'object'
	    if (typeof query === 'object' && query !== null) {
	      args = query;
	      query = undefined;
	    } else if (query === undefined || query === null) { // .search(undefined/null)
	      query = '';
	    }

	    var params = '';

	    if (query !== undefined) {
	      params += queryParam + '=' + encodeURIComponent(query);
	    }

	    var additionalUA;
	    if (args !== undefined) {
	      if (args.additionalUA) {
	        additionalUA = args.additionalUA;
	        delete args.additionalUA;
	      }
	      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
	      params = this.as._getSearchParams(args, params);
	    }


	    return this._search(params, url, callback, additionalUA);
	  };
	}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	

	// This file hosts our error definitions
	// We use custom error "types" so that we can act on them when we need it
	// e.g.: if error instanceof errors.UnparsableJSON then..

	var inherits = __webpack_require__(4);

	function AlgoliaSearchError(message, extraProperties) {
	  var forEach = __webpack_require__(11);

	  var error = this;

	  // try to get a stacktrace
	  if (typeof Error.captureStackTrace === 'function') {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
	  }

	  this.name = 'AlgoliaSearchError';
	  this.message = message || 'Unknown error';

	  if (extraProperties) {
	    forEach(extraProperties, function addToErrorObject(value, key) {
	      error[key] = value;
	    });
	  }
	}

	inherits(AlgoliaSearchError, Error);

	function createCustomError(name, message) {
	  function AlgoliaSearchCustomError() {
	    var args = Array.prototype.slice.call(arguments, 0);

	    // custom message not set, use default
	    if (typeof args[0] !== 'string') {
	      args.unshift(message);
	    }

	    AlgoliaSearchError.apply(this, args);
	    this.name = 'AlgoliaSearch' + name + 'Error';
	  }

	  inherits(AlgoliaSearchCustomError, AlgoliaSearchError);

	  return AlgoliaSearchCustomError;
	}

	// late exports to let various fn defs and inherits take place
	module.exports = {
	  AlgoliaSearchError: AlgoliaSearchError,
	  UnparsableJSON: createCustomError(
	    'UnparsableJSON',
	    'Could not parse the incoming response as JSON, see err.more for details'
	  ),
	  RequestTimeout: createCustomError(
	    'RequestTimeout',
	    'Request timedout before getting a response'
	  ),
	  Network: createCustomError(
	    'Network',
	    'Network issue, see err.more for details'
	  ),
	  JSONPScriptFail: createCustomError(
	    'JSONPScriptFail',
	    '<script> was loaded but did not call our provided callback'
	  ),
	  JSONPScriptError: createCustomError(
	    'JSONPScriptError',
	    '<script> unable to load due to an `error` event on it'
	  ),
	  Unknown: createCustomError(
	    'Unknown',
	    'Unknown error occured'
	  )
	};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;

	module.exports = function forEach (obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};



/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function deprecate(fn, message) {
	  var warned = false;

	  function deprecated() {
	    if (!warned) {
	      /* eslint no-console:0 */
	      console.warn(message);
	      warned = true;
	    }

	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = function deprecatedMessage(previousUsage, newUsage) {
	  var githubAnchorLink = previousUsage.toLowerCase()
	    .replace(/[\.\(\)]/g, '');

	  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
	    '`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#' + githubAnchorLink;
	};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var foreach = __webpack_require__(11);

	module.exports = function merge(destination/* , sources */) {
	  var sources = Array.prototype.slice.call(arguments);

	  foreach(sources, function(source) {
	    for (var keyName in source) {
	      if (source.hasOwnProperty(keyName)) {
	        if (typeof destination[keyName] === 'object' && typeof source[keyName] === 'object') {
	          destination[keyName] = merge({}, destination[keyName], source[keyName]);
	        } else if (source[keyName] !== undefined) {
	          destination[keyName] = source[keyName];
	        }
	      }
	    }
	  });

	  return destination;
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = function clone(obj) {
	  return JSON.parse(JSON.stringify(obj));
	};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = function omit(obj, test) {
	  var keys = __webpack_require__(17);
	  var foreach = __webpack_require__(11);

	  var filtered = {};

	  foreach(keys(obj), function doFilter(keyName) {
	    if (test(keyName) !== true) {
	      filtered[keyName] = obj[keyName];
	    }
	  });

	  return filtered;
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	

	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(18);
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};

	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};

	module.exports = keysShim;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	

	var toStr = Object.prototype.toString;

	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	var foreach = __webpack_require__(11);

	module.exports = function map(arr, fn) {
	  var newArr = [];
	  foreach(arr, function(item, itemIndex) {
	    newArr.push(fn(item, itemIndex, arr));
	  });
	  return newArr;
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	// Parse cloud does not supports setTimeout
	// We do not store a setTimeout reference in the client everytime
	// We only fallback to a fake setTimeout when not available
	// setTimeout cannot be override globally sadly
	module.exports = function exitPromise(fn, _setTimeout) {
	  _setTimeout(fn, 0);
	};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	

	// This is the object returned by the `index.browseAll()` method

	module.exports = IndexBrowser;

	var inherits = __webpack_require__(4);
	var EventEmitter = __webpack_require__(23).EventEmitter;

	function IndexBrowser() {
	}

	inherits(IndexBrowser, EventEmitter);

	IndexBrowser.prototype.stop = function() {
	  this._stopped = true;
	  this._clean();
	};

	IndexBrowser.prototype._end = function() {
	  this.emit('end');
	  this._clean();
	};

	IndexBrowser.prototype._error = function(err) {
	  this.emit('error', err);
	  this._clean();
	};

	IndexBrowser.prototype._result = function(content) {
	  this.emit('result', content);
	};

	IndexBrowser.prototype._clean = function() {
	  this.removeAllListeners('stop');
	  this.removeAllListeners('end');
	  this.removeAllListeners('error');
	  this.removeAllListeners('result');
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("events");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = AlgoliaSearchCore;

	var errors = __webpack_require__(10);
	var exitPromise = __webpack_require__(21);
	var IndexCore = __webpack_require__(8);
	var store = __webpack_require__(25);

	// We will always put the API KEY in the JSON body in case of too long API KEY,
	// to avoid query string being too long and failing in various conditions (our server limit, browser limit,
	// proxies limit)
	var MAX_API_KEY_LENGTH = 500;
	var RESET_APP_DATA_TIMER =
	  process.env.RESET_APP_DATA_TIMER && parseInt(process.env.RESET_APP_DATA_TIMER, 10) ||
	  60 * 2 * 1000; // after 2 minutes reset to first host

	/*
	 * Algolia Search library initialization
	 * https://www.algolia.com/
	 *
	 * @param {string} applicationID - Your applicationID, found in your dashboard
	 * @param {string} apiKey - Your API key, found in your dashboard
	 * @param {Object} [opts]
	 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
	 * another request will be issued after this timeout
	 * @param {string} [opts.protocol='https:'] - The protocol used to query Algolia Search API.
	 *                                        Set to 'http:' to force using http.
	 * @param {Object|Array} [opts.hosts={
	 *           read: [this.applicationID + '-dsn.algolia.net'].concat([
	 *             this.applicationID + '-1.algolianet.com',
	 *             this.applicationID + '-2.algolianet.com',
	 *             this.applicationID + '-3.algolianet.com']
	 *           ]),
	 *           write: [this.applicationID + '.algolia.net'].concat([
	 *             this.applicationID + '-1.algolianet.com',
	 *             this.applicationID + '-2.algolianet.com',
	 *             this.applicationID + '-3.algolianet.com']
	 *           ]) - The hosts to use for Algolia Search API.
	 *           If you provide them, you will less benefit from our HA implementation
	 */
	function AlgoliaSearchCore(applicationID, apiKey, opts) {
	  var debug = __webpack_require__(1)('algoliasearch');

	  var clone = __webpack_require__(15);
	  var isArray = __webpack_require__(19);
	  var map = __webpack_require__(20);

	  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

	  if (opts._allowEmptyCredentials !== true && !applicationID) {
	    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
	  }

	  if (opts._allowEmptyCredentials !== true && !apiKey) {
	    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
	  }

	  this.applicationID = applicationID;
	  this.apiKey = apiKey;

	  this.hosts = {
	    read: [],
	    write: []
	  };

	  opts = opts || {};

	  this._timeouts = opts.timeouts || {
	    connect: 1 * 1000, // 500ms connect is GPRS latency
	    read: 2 * 1000,
	    write: 30 * 1000
	  };

	  // backward compat, if opts.timeout is passed, we use it to configure all timeouts like before
	  if (opts.timeout) {
	    this._timeouts.connect = this._timeouts.read = this._timeouts.write = opts.timeout;
	  }

	  var protocol = opts.protocol || 'https:';
	  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
	  // we also accept `http` and `https`. It's a common error.
	  if (!/:$/.test(protocol)) {
	    protocol = protocol + ':';
	  }

	  if (protocol !== 'http:' && protocol !== 'https:') {
	    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
	  }

	  this._checkAppIdData();

	  if (!opts.hosts) {
	    var defaultHosts = map(this._shuffleResult, function(hostNumber) {
	      return applicationID + '-' + hostNumber + '.algolianet.com';
	    });

	    // no hosts given, compute defaults
	    var mainSuffix = (opts.dsn === false ? '' : '-dsn') + '.algolia.net';
	    this.hosts.read = [this.applicationID + mainSuffix].concat(defaultHosts);
	    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
	  } else if (isArray(opts.hosts)) {
	    // when passing custom hosts, we need to have a different host index if the number
	    // of write/read hosts are different.
	    this.hosts.read = clone(opts.hosts);
	    this.hosts.write = clone(opts.hosts);
	  } else {
	    this.hosts.read = clone(opts.hosts.read);
	    this.hosts.write = clone(opts.hosts.write);
	  }

	  // add protocol and lowercase hosts
	  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
	  this.hosts.write = map(this.hosts.write, prepareHost(protocol));

	  this.extraHeaders = {};

	  // In some situations you might want to warm the cache
	  this.cache = opts._cache || {};

	  this._ua = opts._ua;
	  this._useCache = opts._useCache === undefined || opts._cache ? true : opts._useCache;
	  this._useRequestCache = this._useCache && opts._useRequestCache;
	  this._useFallback = opts.useFallback === undefined ? true : opts.useFallback;

	  this._setTimeout = opts._setTimeout;

	  debug('init done, %j', this);
	}

	/*
	 * Get the index object initialized
	 *
	 * @param indexName the name of index
	 * @param callback the result callback with one argument (the Index instance)
	 */
	AlgoliaSearchCore.prototype.initIndex = function(indexName) {
	  return new IndexCore(this, indexName);
	};

	/**
	* Add an extra field to the HTTP request
	*
	* @param name the header field name
	* @param value the header field value
	*/
	AlgoliaSearchCore.prototype.setExtraHeader = function(name, value) {
	  this.extraHeaders[name.toLowerCase()] = value;
	};

	/**
	* Get the value of an extra HTTP header
	*
	* @param name the header field name
	*/
	AlgoliaSearchCore.prototype.getExtraHeader = function(name) {
	  return this.extraHeaders[name.toLowerCase()];
	};

	/**
	* Remove an extra field from the HTTP request
	*
	* @param name the header field name
	*/
	AlgoliaSearchCore.prototype.unsetExtraHeader = function(name) {
	  delete this.extraHeaders[name.toLowerCase()];
	};

	/**
	* Augment sent x-algolia-agent with more data, each agent part
	* is automatically separated from the others by a semicolon;
	*
	* @param algoliaAgent the agent to add
	*/
	AlgoliaSearchCore.prototype.addAlgoliaAgent = function(algoliaAgent) {
	  if (this._ua.indexOf(';' + algoliaAgent) === -1) {
	    this._ua += ';' + algoliaAgent;
	  }
	};

	/*
	 * Wrapper that try all hosts to maximize the quality of service
	 */
	AlgoliaSearchCore.prototype._jsonRequest = function(initialOpts) {
	  this._checkAppIdData();

	  var requestDebug = __webpack_require__(1)('algoliasearch:' + initialOpts.url);

	  var body;
	  var cacheID;
	  var additionalUA = initialOpts.additionalUA || '';
	  var cache = initialOpts.cache;
	  var client = this;
	  var tries = 0;
	  var usingFallback = false;
	  var hasFallback = client._useFallback && client._request.fallback && initialOpts.fallback;
	  var headers;

	  if (
	    this.apiKey.length > MAX_API_KEY_LENGTH &&
	    initialOpts.body !== undefined &&
	    (initialOpts.body.params !== undefined || // index.search()
	    initialOpts.body.requests !== undefined) // client.search()
	  ) {
	    initialOpts.body.apiKey = this.apiKey;
	    headers = this._computeRequestHeaders({
	      additionalUA: additionalUA,
	      withApiKey: false,
	      headers: initialOpts.headers
	    });
	  } else {
	    headers = this._computeRequestHeaders({
	      additionalUA: additionalUA,
	      headers: initialOpts.headers
	    });
	  }

	  if (initialOpts.body !== undefined) {
	    body = safeJSONStringify(initialOpts.body);
	  }

	  requestDebug('request start');
	  var debugData = [];

	  function doRequest(requester, reqOpts) {
	    client._checkAppIdData();

	    var startTime = new Date();

	    if (client._useCache && !client._useRequestCache) {
	      cacheID = initialOpts.url;
	    }

	    // as we sometime use POST requests to pass parameters (like query='aa'),
	    // the cacheID must also include the body to be different between calls
	    if (client._useCache && !client._useRequestCache && body) {
	      cacheID += '_body_' + reqOpts.body;
	    }

	    // handle cache existence
	    if (isCacheValidWithCurrentID(!client._useRequestCache, cache, cacheID)) {
	      requestDebug('serving response from cache');

	      var responseText = cache[cacheID];

	      // Cache response must match the type of the original one
	      return client._promise.resolve({
	        body: JSON.parse(responseText),
	        responseText: responseText
	      });
	    }

	    // if we reached max tries
	    if (tries >= client.hosts[initialOpts.hostType].length) {
	      if (!hasFallback || usingFallback) {
	        requestDebug('could not get any response');
	        // then stop
	        return client._promise.reject(new errors.AlgoliaSearchError(
	          'Cannot connect to the AlgoliaSearch API.' +
	          ' Send an email to support@algolia.com to report and resolve the issue.' +
	          ' Application id was: ' + client.applicationID, {debugData: debugData}
	        ));
	      }

	      requestDebug('switching to fallback');

	      // let's try the fallback starting from here
	      tries = 0;

	      // method, url and body are fallback dependent
	      reqOpts.method = initialOpts.fallback.method;
	      reqOpts.url = initialOpts.fallback.url;
	      reqOpts.jsonBody = initialOpts.fallback.body;
	      if (reqOpts.jsonBody) {
	        reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
	      }
	      // re-compute headers, they could be omitting the API KEY
	      headers = client._computeRequestHeaders({
	        additionalUA: additionalUA,
	        headers: initialOpts.headers
	      });

	      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
	      client._setHostIndexByType(0, initialOpts.hostType);
	      usingFallback = true; // the current request is now using fallback
	      return doRequest(client._request.fallback, reqOpts);
	    }

	    var currentHost = client._getHostByType(initialOpts.hostType);

	    var url = currentHost + reqOpts.url;
	    var options = {
	      body: reqOpts.body,
	      jsonBody: reqOpts.jsonBody,
	      method: reqOpts.method,
	      headers: headers,
	      timeouts: reqOpts.timeouts,
	      debug: requestDebug
	    };

	    requestDebug('method: %s, url: %s, headers: %j, timeouts: %d',
	      options.method, url, options.headers, options.timeouts);

	    if (requester === client._request.fallback) {
	      requestDebug('using fallback');
	    }

	    // `requester` is any of this._request or this._request.fallback
	    // thus it needs to be called using the client as context
	    return requester.call(client, url, options).then(success, tryFallback);

	    function success(httpResponse) {
	      // compute the status of the response,
	      //
	      // When in browser mode, using XDR or JSONP, we have no statusCode available
	      // So we rely on our API response `status` property.
	      // But `waitTask` can set a `status` property which is not the statusCode (it's the task status)
	      // So we check if there's a `message` along `status` and it means it's an error
	      //
	      // That's the only case where we have a response.status that's not the http statusCode
	      var status = httpResponse && httpResponse.body && httpResponse.body.message && httpResponse.body.status ||

	        // this is important to check the request statusCode AFTER the body eventual
	        // statusCode because some implementations (jQuery XDomainRequest transport) may
	        // send statusCode 200 while we had an error
	        httpResponse.statusCode ||

	        // When in browser mode, using XDR or JSONP
	        // we default to success when no error (no response.status && response.message)
	        // If there was a JSON.parse() error then body is null and it fails
	        httpResponse && httpResponse.body && 200;

	      requestDebug('received response: statusCode: %s, computed statusCode: %d, headers: %j',
	        httpResponse.statusCode, status, httpResponse.headers);

	      var httpResponseOk = Math.floor(status / 100) === 2;

	      var endTime = new Date();
	      debugData.push({
	        currentHost: currentHost,
	        headers: removeCredentials(headers),
	        content: body || null,
	        contentLength: body !== undefined ? body.length : null,
	        method: reqOpts.method,
	        timeouts: reqOpts.timeouts,
	        url: reqOpts.url,
	        startTime: startTime,
	        endTime: endTime,
	        duration: endTime - startTime,
	        statusCode: status
	      });

	      if (httpResponseOk) {
	        if (client._useCache && !client._useRequestCache && cache) {
	          cache[cacheID] = httpResponse.responseText;
	        }

	        return {
	          responseText: httpResponse.responseText,
	          body: httpResponse.body
	        };
	      }

	      var shouldRetry = Math.floor(status / 100) !== 4;

	      if (shouldRetry) {
	        tries += 1;
	        return retryRequest();
	      }

	      requestDebug('unrecoverable error');

	      // no success and no retry => fail
	      var unrecoverableError = new errors.AlgoliaSearchError(
	        httpResponse.body && httpResponse.body.message, {debugData: debugData, statusCode: status}
	      );

	      return client._promise.reject(unrecoverableError);
	    }

	    function tryFallback(err) {
	      // error cases:
	      //  While not in fallback mode:
	      //    - CORS not supported
	      //    - network error
	      //  While in fallback mode:
	      //    - timeout
	      //    - network error
	      //    - badly formatted JSONP (script loaded, did not call our callback)
	      //  In both cases:
	      //    - uncaught exception occurs (TypeError)
	      requestDebug('error: %s, stack: %s', err.message, err.stack);

	      var endTime = new Date();
	      debugData.push({
	        currentHost: currentHost,
	        headers: removeCredentials(headers),
	        content: body || null,
	        contentLength: body !== undefined ? body.length : null,
	        method: reqOpts.method,
	        timeouts: reqOpts.timeouts,
	        url: reqOpts.url,
	        startTime: startTime,
	        endTime: endTime,
	        duration: endTime - startTime
	      });

	      if (!(err instanceof errors.AlgoliaSearchError)) {
	        err = new errors.Unknown(err && err.message, err);
	      }

	      tries += 1;

	      // stop the request implementation when:
	      if (
	        // we did not generate this error,
	        // it comes from a throw in some other piece of code
	        err instanceof errors.Unknown ||

	        // server sent unparsable JSON
	        err instanceof errors.UnparsableJSON ||

	        // max tries and already using fallback or no fallback
	        tries >= client.hosts[initialOpts.hostType].length &&
	        (usingFallback || !hasFallback)) {
	        // stop request implementation for this command
	        err.debugData = debugData;
	        return client._promise.reject(err);
	      }

	      // When a timeout occured, retry by raising timeout
	      if (err instanceof errors.RequestTimeout) {
	        return retryRequestWithHigherTimeout();
	      }

	      return retryRequest();
	    }

	    function retryRequest() {
	      requestDebug('retrying request');
	      client._incrementHostIndex(initialOpts.hostType);
	      return doRequest(requester, reqOpts);
	    }

	    function retryRequestWithHigherTimeout() {
	      requestDebug('retrying request with higher timeout');
	      client._incrementHostIndex(initialOpts.hostType);
	      client._incrementTimeoutMultipler();
	      reqOpts.timeouts = client._getTimeoutsForRequest(initialOpts.hostType);
	      return doRequest(requester, reqOpts);
	    }
	  }

	  function isCacheValidWithCurrentID(
	    useRequestCache,
	    currentCache,
	    currentCacheID
	  ) {
	    return (
	      client._useCache &&
	      useRequestCache &&
	      currentCache &&
	      currentCache[currentCacheID] !== undefined
	    );
	  }


	  function interopCallbackReturn(request, callback) {
	    if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
	      request.catch(function() {
	        // Release the cache on error
	        delete cache[cacheID];
	      });
	    }

	    if (typeof initialOpts.callback === 'function') {
	      // either we have a callback
	      request.then(function okCb(content) {
	        exitPromise(function() {
	          initialOpts.callback(null, callback(content));
	        }, client._setTimeout || setTimeout);
	      }, function nookCb(err) {
	        exitPromise(function() {
	          initialOpts.callback(err);
	        }, client._setTimeout || setTimeout);
	      });
	    } else {
	      // either we are using promises
	      return request.then(callback);
	    }
	  }

	  if (client._useCache && client._useRequestCache) {
	    cacheID = initialOpts.url;
	  }

	  // as we sometime use POST requests to pass parameters (like query='aa'),
	  // the cacheID must also include the body to be different between calls
	  if (client._useCache && client._useRequestCache && body) {
	    cacheID += '_body_' + body;
	  }

	  if (isCacheValidWithCurrentID(client._useRequestCache, cache, cacheID)) {
	    requestDebug('serving request from cache');

	    var maybePromiseForCache = cache[cacheID];

	    // In case the cache is warmup with value that is not a promise
	    var promiseForCache = typeof maybePromiseForCache.then !== 'function'
	      ? client._promise.resolve({responseText: maybePromiseForCache})
	      : maybePromiseForCache;

	    return interopCallbackReturn(promiseForCache, function(content) {
	      // In case of the cache request, return the original value
	      return JSON.parse(content.responseText);
	    });
	  }

	  var request = doRequest(
	    client._request, {
	      url: initialOpts.url,
	      method: initialOpts.method,
	      body: body,
	      jsonBody: initialOpts.body,
	      timeouts: client._getTimeoutsForRequest(initialOpts.hostType)
	    }
	  );

	  if (client._useCache && client._useRequestCache && cache) {
	    cache[cacheID] = request;
	  }

	  return interopCallbackReturn(request, function(content) {
	    // In case of the first request, return the JSON value
	    return content.body;
	  });
	};

	/*
	* Transform search param object in query string
	* @param {object} args arguments to add to the current query string
	* @param {string} params current query string
	* @return {string} the final query string
	*/
	AlgoliaSearchCore.prototype._getSearchParams = function(args, params) {
	  if (args === undefined || args === null) {
	    return params;
	  }
	  for (var key in args) {
	    if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
	      params += params === '' ? '' : '&';
	      params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
	    }
	  }
	  return params;
	};

	/**
	 * Compute the headers for a request
	 *
	 * @param [string] options.additionalUA semi-colon separated string with other user agents to add
	 * @param [boolean=true] options.withApiKey Send the api key as a header
	 * @param [Object] options.headers Extra headers to send
	 */
	AlgoliaSearchCore.prototype._computeRequestHeaders = function(options) {
	  var forEach = __webpack_require__(11);

	  var ua = options.additionalUA ?
	    this._ua + ';' + options.additionalUA :
	    this._ua;

	  var requestHeaders = {
	    'x-algolia-agent': ua,
	    'x-algolia-application-id': this.applicationID
	  };

	  // browser will inline headers in the url, node.js will use http headers
	  // but in some situations, the API KEY will be too long (big secured API keys)
	  // so if the request is a POST and the KEY is very long, we will be asked to not put
	  // it into headers but in the JSON body
	  if (options.withApiKey !== false) {
	    requestHeaders['x-algolia-api-key'] = this.apiKey;
	  }

	  if (this.userToken) {
	    requestHeaders['x-algolia-usertoken'] = this.userToken;
	  }

	  if (this.securityTags) {
	    requestHeaders['x-algolia-tagfilters'] = this.securityTags;
	  }

	  forEach(this.extraHeaders, function addToRequestHeaders(value, key) {
	    requestHeaders[key] = value;
	  });

	  if (options.headers) {
	    forEach(options.headers, function addToRequestHeaders(value, key) {
	      requestHeaders[key] = value;
	    });
	  }

	  return requestHeaders;
	};

	/**
	 * Search through multiple indices at the same time
	 * @param  {Object[]}   queries  An array of queries you want to run.
	 * @param {string} queries[].indexName The index name you want to target
	 * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
	 * @param {Object} queries[].params Any search param like hitsPerPage, ..
	 * @param  {Function} callback Callback to be called
	 * @return {Promise|undefined} Returns a promise if no callback given
	 */
	AlgoliaSearchCore.prototype.search = function(queries, opts, callback) {
	  var isArray = __webpack_require__(19);
	  var map = __webpack_require__(20);

	  var usage = 'Usage: client.search(arrayOfQueries[, callback])';

	  if (!isArray(queries)) {
	    throw new Error(usage);
	  }

	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  } else if (opts === undefined) {
	    opts = {};
	  }

	  var client = this;

	  var postObj = {
	    requests: map(queries, function prepareRequest(query) {
	      var params = '';

	      // allow query.query
	      // so we are mimicing the index.search(query, params) method
	      // {indexName:, query:, params:}
	      if (query.query !== undefined) {
	        params += 'query=' + encodeURIComponent(query.query);
	      }

	      return {
	        indexName: query.indexName,
	        params: client._getSearchParams(query.params, params)
	      };
	    })
	  };

	  var JSONPParams = map(postObj.requests, function prepareJSONPParams(request, requestId) {
	    return requestId + '=' +
	      encodeURIComponent(
	        '/1/indexes/' + encodeURIComponent(request.indexName) + '?' +
	        request.params
	      );
	  }).join('&');

	  var url = '/1/indexes/*/queries';

	  if (opts.strategy !== undefined) {
	    url += '?strategy=' + opts.strategy;
	  }

	  return this._jsonRequest({
	    cache: this.cache,
	    method: 'POST',
	    url: url,
	    body: postObj,
	    hostType: 'read',
	    fallback: {
	      method: 'GET',
	      url: '/1/indexes/*',
	      body: {
	        params: JSONPParams
	      }
	    },
	    callback: callback
	  });
	};

	/**
	* Search for facet values
	* https://www.algolia.com/doc/rest-api/search#search-for-facet-values
	* This is the top-level API for SFFV.
	*
	* @param {object[]} queries An array of queries to run.
	* @param {string} queries[].indexName Index name, name of the index to search.
	* @param {object} queries[].params Query parameters.
	* @param {string} queries[].params.facetName Facet name, name of the attribute to search for values in.
	* Must be declared as a facet
	* @param {string} queries[].params.facetQuery Query for the facet search
	* @param {string} [queries[].params.*] Any search parameter of Algolia,
	* see https://www.algolia.com/doc/api-client/javascript/search#search-parameters
	* Pagination is not supported. The page and hitsPerPage parameters will be ignored.
	*/
	AlgoliaSearchCore.prototype.searchForFacetValues = function(queries) {
	  var isArray = __webpack_require__(19);
	  var map = __webpack_require__(20);

	  var usage = 'Usage: client.searchForFacetValues([{indexName, params: {facetName, facetQuery, ...params}}, ...queries])'; // eslint-disable-line max-len

	  if (!isArray(queries)) {
	    throw new Error(usage);
	  }

	  var client = this;

	  return client._promise.all(map(queries, function performQuery(query) {
	    if (
	      !query ||
	      query.indexName === undefined ||
	      query.params.facetName === undefined ||
	      query.params.facetQuery === undefined
	    ) {
	      throw new Error(usage);
	    }

	    var clone = __webpack_require__(15);
	    var omit = __webpack_require__(16);

	    var indexName = query.indexName;
	    var params = query.params;

	    var facetName = params.facetName;
	    var filteredParams = omit(clone(params), function(keyName) {
	      return keyName === 'facetName';
	    });
	    var searchParameters = client._getSearchParams(filteredParams, '');

	    return client._jsonRequest({
	      cache: client.cache,
	      method: 'POST',
	      url:
	        '/1/indexes/' +
	        encodeURIComponent(indexName) +
	        '/facets/' +
	        encodeURIComponent(facetName) +
	        '/query',
	      hostType: 'read',
	      body: {params: searchParameters}
	    });
	  }));
	};

	/**
	 * Set the extra security tagFilters header
	 * @param {string|array} tags The list of tags defining the current security filters
	 */
	AlgoliaSearchCore.prototype.setSecurityTags = function(tags) {
	  if (Object.prototype.toString.call(tags) === '[object Array]') {
	    var strTags = [];
	    for (var i = 0; i < tags.length; ++i) {
	      if (Object.prototype.toString.call(tags[i]) === '[object Array]') {
	        var oredTags = [];
	        for (var j = 0; j < tags[i].length; ++j) {
	          oredTags.push(tags[i][j]);
	        }
	        strTags.push('(' + oredTags.join(',') + ')');
	      } else {
	        strTags.push(tags[i]);
	      }
	    }
	    tags = strTags.join(',');
	  }

	  this.securityTags = tags;
	};

	/**
	 * Set the extra user token header
	 * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
	 */
	AlgoliaSearchCore.prototype.setUserToken = function(userToken) {
	  this.userToken = userToken;
	};

	/**
	 * Clear all queries in client's cache
	 * @return undefined
	 */
	AlgoliaSearchCore.prototype.clearCache = function() {
	  this.cache = {};
	};

	/**
	* Set the number of milliseconds a request can take before automatically being terminated.
	* @deprecated
	* @param {Number} milliseconds
	*/
	AlgoliaSearchCore.prototype.setRequestTimeout = function(milliseconds) {
	  if (milliseconds) {
	    this._timeouts.connect = this._timeouts.read = this._timeouts.write = milliseconds;
	  }
	};

	/**
	* Set the three different (connect, read, write) timeouts to be used when requesting
	* @param {Object} timeouts
	*/
	AlgoliaSearchCore.prototype.setTimeouts = function(timeouts) {
	  this._timeouts = timeouts;
	};

	/**
	* Get the three different (connect, read, write) timeouts to be used when requesting
	* @param {Object} timeouts
	*/
	AlgoliaSearchCore.prototype.getTimeouts = function() {
	  return this._timeouts;
	};

	AlgoliaSearchCore.prototype._getAppIdData = function() {
	  var data = store.get(this.applicationID);
	  if (data !== null) this._cacheAppIdData(data);
	  return data;
	};

	AlgoliaSearchCore.prototype._setAppIdData = function(data) {
	  data.lastChange = (new Date()).getTime();
	  this._cacheAppIdData(data);
	  return store.set(this.applicationID, data);
	};

	AlgoliaSearchCore.prototype._checkAppIdData = function() {
	  var data = this._getAppIdData();
	  var now = (new Date()).getTime();
	  if (data === null || now - data.lastChange > RESET_APP_DATA_TIMER) {
	    return this._resetInitialAppIdData(data);
	  }

	  return data;
	};

	AlgoliaSearchCore.prototype._resetInitialAppIdData = function(data) {
	  var newData = data || {};
	  newData.hostIndexes = {read: 0, write: 0};
	  newData.timeoutMultiplier = 1;
	  newData.shuffleResult = newData.shuffleResult || shuffle([1, 2, 3]);
	  return this._setAppIdData(newData);
	};

	AlgoliaSearchCore.prototype._cacheAppIdData = function(data) {
	  this._hostIndexes = data.hostIndexes;
	  this._timeoutMultiplier = data.timeoutMultiplier;
	  this._shuffleResult = data.shuffleResult;
	};

	AlgoliaSearchCore.prototype._partialAppIdDataUpdate = function(newData) {
	  var foreach = __webpack_require__(11);
	  var currentData = this._getAppIdData();
	  foreach(newData, function(value, key) {
	    currentData[key] = value;
	  });

	  return this._setAppIdData(currentData);
	};

	AlgoliaSearchCore.prototype._getHostByType = function(hostType) {
	  return this.hosts[hostType][this._getHostIndexByType(hostType)];
	};

	AlgoliaSearchCore.prototype._getTimeoutMultiplier = function() {
	  return this._timeoutMultiplier;
	};

	AlgoliaSearchCore.prototype._getHostIndexByType = function(hostType) {
	  return this._hostIndexes[hostType];
	};

	AlgoliaSearchCore.prototype._setHostIndexByType = function(hostIndex, hostType) {
	  var clone = __webpack_require__(15);
	  var newHostIndexes = clone(this._hostIndexes);
	  newHostIndexes[hostType] = hostIndex;
	  this._partialAppIdDataUpdate({hostIndexes: newHostIndexes});
	  return hostIndex;
	};

	AlgoliaSearchCore.prototype._incrementHostIndex = function(hostType) {
	  return this._setHostIndexByType(
	    (this._getHostIndexByType(hostType) + 1) % this.hosts[hostType].length, hostType
	  );
	};

	AlgoliaSearchCore.prototype._incrementTimeoutMultipler = function() {
	  var timeoutMultiplier = Math.max(this._timeoutMultiplier + 1, 4);
	  return this._partialAppIdDataUpdate({timeoutMultiplier: timeoutMultiplier});
	};

	AlgoliaSearchCore.prototype._getTimeoutsForRequest = function(hostType) {
	  return {
	    connect: this._timeouts.connect * this._timeoutMultiplier,
	    complete: this._timeouts[hostType] * this._timeoutMultiplier
	  };
	};

	function prepareHost(protocol) {
	  return function prepare(host) {
	    return protocol + '//' + host.toLowerCase();
	  };
	}

	// Prototype.js < 1.7, a widely used library, defines a weird
	// Array.prototype.toJSON function that will fail to stringify our content
	// appropriately
	// refs:
	//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
	//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
	//   - http://stackoverflow.com/a/3148441/147079
	function safeJSONStringify(obj) {
	  /* eslint no-extend-native:0 */

	  if (Array.prototype.toJSON === undefined) {
	    return JSON.stringify(obj);
	  }

	  var toJSON = Array.prototype.toJSON;
	  delete Array.prototype.toJSON;
	  var out = JSON.stringify(obj);
	  Array.prototype.toJSON = toJSON;

	  return out;
	}

	function shuffle(array) {
	  var currentIndex = array.length;
	  var temporaryValue;
	  var randomIndex;

	  // While there remain elements to shuffle...
	  while (currentIndex !== 0) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	function removeCredentials(headers) {
	  var newHeaders = {};

	  for (var headerName in headers) {
	    if (Object.prototype.hasOwnProperty.call(headers, headerName)) {
	      var value;

	      if (headerName === 'x-algolia-api-key' || headerName === 'x-algolia-application-id') {
	        value = '**hidden for security purposes**';
	      } else {
	        value = headers[headerName];
	      }

	      newHeaders[headerName] = value;
	    }
	  }

	  return newHeaders;
	}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	var debug = __webpack_require__(1)('algoliasearch:src/hostIndexState.js');
	var localStorageNamespace = 'algoliasearch-client-js';

	var store;
	var moduleStore = {
	  state: {},
	  set: function(key, data) {
	    this.state[key] = data;
	    return this.state[key];
	  },
	  get: function(key) {
	    return this.state[key] || null;
	  }
	};

	var localStorageStore = {
	  set: function(key, data) {
	    moduleStore.set(key, data); // always replicate localStorageStore to moduleStore in case of failure

	    try {
	      var namespace = JSON.parse(global.localStorage[localStorageNamespace]);
	      namespace[key] = data;
	      global.localStorage[localStorageNamespace] = JSON.stringify(namespace);
	      return namespace[key];
	    } catch (e) {
	      return localStorageFailure(key, e);
	    }
	  },
	  get: function(key) {
	    try {
	      return JSON.parse(global.localStorage[localStorageNamespace])[key] || null;
	    } catch (e) {
	      return localStorageFailure(key, e);
	    }
	  }
	};

	function localStorageFailure(key, e) {
	  debug('localStorage failed with', e);
	  cleanup();
	  store = moduleStore;
	  return store.get(key);
	}

	store = supportsLocalStorage() ? localStorageStore : moduleStore;

	module.exports = {
	  get: getOrSet,
	  set: getOrSet,
	  supportsLocalStorage: supportsLocalStorage
	};

	function getOrSet(key, data) {
	  if (arguments.length === 1) {
	    return store.get(key);
	  }

	  return store.set(key, data);
	}

	function supportsLocalStorage() {
	  try {
	    if ('localStorage' in global &&
	      global.localStorage !== null) {
	      if (!global.localStorage[localStorageNamespace]) {
	        // actual creation of the namespace
	        global.localStorage.setItem(localStorageNamespace, JSON.stringify({}));
	      }
	      return true;
	    }

	    return false;
	  } catch (_) {
	    return false;
	  }
	}

	// In case of any error on localStorage, we clean our own namespace, this should handle
	// quota errors when a lot of keys + data are used
	function cleanup() {
	  try {
	    global.localStorage.removeItem(localStorageNamespace);
	  } catch (_) {
	    // nothing to do
	  }
	}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	

	module.exports = '3.28.0';


/***/ })
/******/ ]);