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
/***/ function(module, exports, __webpack_require__) {

	

	// This is the Parse entry point
	// See https://www.parse.com/docs/cloud_code_guide#cloud_code
	module.exports = algoliasearch;

	// parse has no process.env, force it down for npm modules compatibility
	process.env = {};

	// a lot of node modules are expecting to find a `global` object,
	// this has triggered some bugs
	/* global global: true */
	global = {};

	var debug = __webpack_require__(1)('algoliasearch:parse');

	var inherits = __webpack_require__(4);

	var AlgoliaSearchServer = __webpack_require__(5);

	debug('loaded the Parse client');

	function algoliasearch(applicationID, apiKey, opts) {
	  var cloneDeep = __webpack_require__(55);
	  opts = cloneDeep(opts || {});

	  if (opts.protocol === undefined) {
	    opts.protocol = 'https:';
	  }

	  opts._setTimeout = _setTimeout;

	  opts._ua = opts._ua || algoliasearch.ua;
	  opts._useCache = false;

	  return new AlgoliaSearchParse(applicationID, apiKey, opts);
	}

	algoliasearch.version = __webpack_require__(56);
	algoliasearch.ua = 'Algolia for Parse ' + algoliasearch.version;

	function AlgoliaSearchParse() {
	  // call AlgoliaSearchServer constructor
	  AlgoliaSearchServer.apply(this, arguments);
	}

	inherits(AlgoliaSearchParse, AlgoliaSearchServer);

	AlgoliaSearchParse.prototype._request = function(rawUrl, opts) {
	  /* global Parse */
	  var clone = __webpack_require__(34);
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
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

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
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
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
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

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
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

	  var split = (namespaces || '').split(/[\s,]+/);
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = '' + str;
	  if (str.length > 10000) return;
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
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
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	

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

	AlgoliaSearchServer.prototype._computeRequestHeaders = function() {
	  var headers = AlgoliaSearchServer.super_.prototype._computeRequestHeaders.call(this);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	

	module.exports = AlgoliaSearch;

	var process = process || undefined;
	// default debug activated in dev environments
	// this is triggered in package.json, using the envify transform
	if (process && process.env && process.env.APP_ENV === 'development') {
	  __webpack_require__(1).enable('algoliasearch*');
	}

	var errors = __webpack_require__(7);

	/*
	 * Algolia Search library initialization
	 * https://www.algolia.com/
	 *
	 * @param {string} applicationID - Your applicationID, found in your dashboard
	 * @param {string} apiKey - Your API key, found in your dashboard
	 * @param {Object} [opts]
	 * @param {number} [opts.timeout=2000] - The request timeout set in milliseconds,
	 * another request will be issued after this timeout
	 * @param {string} [opts.protocol='http:'] - The protocol used to query Algolia Search API.
	 *                                        Set to 'https:' to force using https.
	 *                                        Default to document.location.protocol in browsers
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
	function AlgoliaSearch(applicationID, apiKey, opts) {
	  var debug = __webpack_require__(1)('algoliasearch');

	  var clone = __webpack_require__(34);
	  var isArray = __webpack_require__(27);

	  var usage = 'Usage: algoliasearch(applicationID, apiKey, opts)';

	  if (!applicationID) {
	    throw new errors.AlgoliaSearchError('Please provide an application ID. ' + usage);
	  }

	  if (!apiKey) {
	    throw new errors.AlgoliaSearchError('Please provide an API key. ' + usage);
	  }

	  this.applicationID = applicationID;
	  this.apiKey = apiKey;

	  var defaultHosts = [
	    this.applicationID + '-1.algolianet.com',
	    this.applicationID + '-2.algolianet.com',
	    this.applicationID + '-3.algolianet.com'
	  ];
	  this.hosts = {
	    read: [],
	    write: []
	  };

	  this.hostIndex = {
	    read: 0,
	    write: 0
	  };

	  opts = opts || {};

	  var protocol = opts.protocol || 'https:';
	  var timeout = opts.timeout === undefined ? 2000 : opts.timeout;

	  // while we advocate for colon-at-the-end values: 'http:' for `opts.protocol`
	  // we also accept `http` and `https`. It's a common error.
	  if (!/:$/.test(protocol)) {
	    protocol = protocol + ':';
	  }

	  if (opts.protocol !== 'http:' && opts.protocol !== 'https:') {
	    throw new errors.AlgoliaSearchError('protocol must be `http:` or `https:` (was `' + opts.protocol + '`)');
	  }

	  // no hosts given, add defaults
	  if (!opts.hosts) {
	    this.hosts.read = [this.applicationID + '-dsn.algolia.net'].concat(defaultHosts);
	    this.hosts.write = [this.applicationID + '.algolia.net'].concat(defaultHosts);
	  } else if (isArray(opts.hosts)) {
	    this.hosts.read = clone(opts.hosts);
	    this.hosts.write = clone(opts.hosts);
	  } else {
	    this.hosts.read = clone(opts.hosts.read);
	    this.hosts.write = clone(opts.hosts.write);
	  }

	  // add protocol and lowercase hosts
	  this.hosts.read = map(this.hosts.read, prepareHost(protocol));
	  this.hosts.write = map(this.hosts.write, prepareHost(protocol));
	  this.requestTimeout = timeout;

	  this.extraHeaders = [];
	  this.cache = {};

	  this._ua = opts._ua;
	  this._useCache = opts._useCache === undefined ? true : opts._useCache;

	  this._setTimeout = opts._setTimeout;

	  debug('init done, %j', this);
	}

	AlgoliaSearch.prototype = {
	  /*
	   * Delete an index
	   *
	   * @param indexName the name of index to delete
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  deleteIndex: function(indexName, callback) {
	    return this._jsonRequest({
	      method: 'DELETE',
	      url: '/1/indexes/' + encodeURIComponent(indexName),
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Move an existing index.
	   * @param srcIndexName the name of index to copy.
	   * @param dstIndexName the new index name that will contains a copy of
	   * srcIndexName (destination will be overriten if it already exist).
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  moveIndex: function(srcIndexName, dstIndexName, callback) {
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
	  },
	  /**
	   * Copy an existing index.
	   * @param srcIndexName the name of index to copy.
	   * @param dstIndexName the new index name that will contains a copy
	   * of srcIndexName (destination will be overriten if it already exist).
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  copyIndex: function(srcIndexName, dstIndexName, callback) {
	    var postObj = {
	      operation: 'copy', destination: dstIndexName
	    };
	    return this._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(srcIndexName) + '/operation',
	      body: postObj,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /**
	   * Return last log entries.
	   * @param offset Specify the first entry to retrieve (0-based, 0 is the most recent log entry).
	   * @param length Specify the maximum number of entries to retrieve starting
	   * at offset. Maximum allowed value: 1000.
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer that contains the task ID
	   */
	  getLogs: function(offset, length, callback) {
	    if (arguments.length === 0 || typeof offset === 'function') {
	      // getLogs([cb])
	      callback = offset;
	      offset = 0;
	      length = 10;
	    } else if (arguments.length === 1 || typeof length === 'function') {
	      // getLogs(1, [cb)]
	      callback = length;
	      length = 10;
	    }

	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/logs?offset=' + offset + '&length=' + length,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * List all existing indexes (paginated)
	   *
	   * @param page The page to retrieve, starting at 0.
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with index list
	   */
	  listIndexes: function(page, callback) {
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
	  },

	  /*
	   * Get the index object initialized
	   *
	   * @param indexName the name of index
	   * @param callback the result callback with one argument (the Index instance)
	   */
	  initIndex: function(indexName) {
	    return new this.Index(this, indexName);
	  },
	  /*
	   * List all existing user keys with their associated ACLs
	   *
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  listUserKeys: function(callback) {
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/keys',
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Get ACL of a user key
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  getUserKeyACL: function(key, callback) {
	    return this._jsonRequest({
	      method: 'GET',
	      url: '/1/keys/' + key,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Delete an existing user key
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  deleteUserKey: function(key, callback) {
	    return this._jsonRequest({
	      method: 'DELETE',
	      url: '/1/keys/' + key,
	      hostType: 'write',
	      callback: callback
	    });
	  },
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
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * client.addUserKey(['search'], {
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
	  addUserKey: function(acls, params, callback) {
	    var isArray = __webpack_require__(27);
	    var usage = 'Usage: client.addUserKey(arrayOfAcls[, params, callback])';

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
	  },
	  /**
	   * Add a new global API key
	   * @deprecated Please use client.addUserKey()
	   */
	  addUserKeyWithValidity: deprecate(function(acls, params, callback) {
	    return this.addUserKey(acls, params, callback);
	  }, deprecatedMessage('client.addUserKeyWithValidity()', 'client.addUserKey()')),

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
	   *   content: the server answer with user keys list
	   * @return {Promise|undefined} Returns a promise if no callback given
	   * @example
	   * client.updateUserKey('APIKEY', ['search'], {
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
	  updateUserKey: function(key, acls, params, callback) {
	    var isArray = __webpack_require__(27);
	    var usage = 'Usage: client.updateUserKey(key, arrayOfAcls[, params, callback])';

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
	  },

	  /**
	   * Set the extra security tagFilters header
	   * @param {string|array} tags The list of tags defining the current security filters
	   */
	  setSecurityTags: function(tags) {
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
	  },

	  /**
	   * Set the extra user token header
	   * @param {string} userToken The token identifying a uniq user (used to apply rate limits)
	   */
	  setUserToken: function(userToken) {
	    this.userToken = userToken;
	  },

	  /**
	   * Initialize a new batch of search queries
	   * @deprecated use client.search()
	   */
	  startQueriesBatch: deprecate(function startQueriesBatchDeprecated() {
	    this._batch = [];
	  }, deprecatedMessage('client.startQueriesBatch()', 'client.search()')),

	  /**
	   * Add a search query in the batch
	   * @deprecated use client.search()
	   */
	  addQueryInBatch: deprecate(function addQueryInBatchDeprecated(indexName, query, args) {
	    this._batch.push({
	      indexName: indexName,
	      query: query,
	      params: args
	    });
	  }, deprecatedMessage('client.addQueryInBatch()', 'client.search()')),

	  /**
	   * Clear all queries in client's cache
	   * @return undefined
	   */
	  clearCache: function() {
	    this.cache = {};
	  },

	  /**
	   * Launch the batch of queries using XMLHttpRequest.
	   * @deprecated use client.search()
	   */
	  sendQueriesBatch: deprecate(function sendQueriesBatchDeprecated(callback) {
	    return this.search(this._batch, callback);
	  }, deprecatedMessage('client.sendQueriesBatch()', 'client.search()')),

	  /**
	  * Set the number of milliseconds a request can take before automatically being terminated.
	  *
	  * @param {Number} milliseconds
	  */
	  setRequestTimeout: function(milliseconds) {
	    if (milliseconds) {
	      this.requestTimeout = parseInt(milliseconds, 10);
	    }
	  },

	  /**
	   * Search through multiple indices at the same time
	   * @param  {Object[]}   queries  An array of queries you want to run.
	   * @param {string} queries[].indexName The index name you want to target
	   * @param {string} [queries[].query] The query to issue on this index. Can also be passed into `params`
	   * @param {Object} queries[].params Any search param like hitsPerPage, ..
	   * @param  {Function} callback Callback to be called
	   * @return {Promise|undefined} Returns a promise if no callback given
	   */
	  search: function(queries, callback) {
	    var isArray = __webpack_require__(27);
	    var usage = 'Usage: client.search(arrayOfQueries[, callback])';

	    if (!isArray(queries)) {
	      throw new Error(usage);
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

	    return this._jsonRequest({
	      cache: this.cache,
	      method: 'POST',
	      url: '/1/indexes/*/queries',
	      body: postObj,
	      hostType: 'read',
	      callback: callback
	    });
	  },

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
	  batch: function(operations, callback) {
	    var isArray = __webpack_require__(27);
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
	  },

	  // environment specific methods
	  destroy: notImplemented,
	  enableRateLimitForward: notImplemented,
	  disableRateLimitForward: notImplemented,
	  useSecuredAPIKey: notImplemented,
	  disableSecuredAPIKey: notImplemented,
	  generateSecuredApiKey: notImplemented,
	  /*
	   * Index class constructor.
	   * You should not use this method directly but use initIndex() function
	   */
	  Index: function(algoliasearch, indexName) {
	    this.indexName = indexName;
	    this.as = algoliasearch;
	    this.typeAheadArgs = null;
	    this.typeAheadValueOption = null;

	    // make sure every index instance has it's own cache
	    this.cache = {};
	  },
	  /**
	  * Add an extra field to the HTTP request
	  *
	  * @param name the header field name
	  * @param value the header field value
	  */
	  setExtraHeader: function(name, value) {
	    this.extraHeaders.push({
	      name: name.toLowerCase(), value: value
	    });
	  },

	  /**
	  * Augment sent x-algolia-agent with more data, each agent part
	  * is automatically separated from the others by a semicolon;
	  *
	  * @param algoliaAgent the agent to add
	  */
	  addAlgoliaAgent: function(algoliaAgent) {
	    this._ua += ';' + algoliaAgent;
	  },

	  _sendQueriesBatch: function(params, callback) {
	    function prepareParams() {
	      var reqParams = '';
	      for (var i = 0; i < params.requests.length; ++i) {
	        var q = '/1/indexes/' +
	          encodeURIComponent(params.requests[i].indexName) +
	          '?' + params.requests[i].params;
	        reqParams += i + '=' + encodeURIComponent(q) + '&';
	      }
	      return reqParams;
	    }

	    return this._jsonRequest({
	      cache: this.cache,
	      method: 'POST',
	      url: '/1/indexes/*/queries',
	      body: params,
	      hostType: 'read',
	      fallback: {
	        method: 'GET',
	        url: '/1/indexes/*',
	        body: {
	          params: prepareParams()
	        }
	      },
	      callback: callback
	    });
	  },
	  /*
	   * Wrapper that try all hosts to maximize the quality of service
	   */
	  _jsonRequest: function(opts) {
	    var requestDebug = __webpack_require__(1)('algoliasearch:' + opts.url);

	    var body;
	    var cache = opts.cache;
	    var client = this;
	    var tries = 0;
	    var usingFallback = false;

	    if (opts.body !== undefined) {
	      body = safeJSONStringify(opts.body);
	    }

	    requestDebug('request start');

	    function doRequest(requester, reqOpts) {
	      var cacheID;

	      if (client._useCache) {
	        cacheID = opts.url;
	      }

	      // as we sometime use POST requests to pass parameters (like query='aa'),
	      // the cacheID must also include the body to be different between calls
	      if (client._useCache && body) {
	        cacheID += '_body_' + reqOpts.body;
	      }

	      // handle cache existence
	      if (client._useCache && cache && cache[cacheID] !== undefined) {
	        requestDebug('serving response from cache');
	        return client._promise.resolve(JSON.parse(cache[cacheID]));
	      }

	      // if we reached max tries
	      if (tries >= client.hosts[opts.hostType].length ||
	        // or we need to switch to fallback
	        client.useFallback && !usingFallback) {
	        // and there's no fallback or we are already using a fallback
	        if (!opts.fallback || !client._request.fallback || usingFallback) {
	          requestDebug('could not get any response');
	          // then stop
	          return client._promise.reject(new errors.AlgoliaSearchError(
	            'Cannot connect to the AlgoliaSearch API.' +
	            ' Send an email to support@algolia.com to report and resolve the issue.' +
	            ' Application id was: ' + client.applicationID
	          ));
	        }

	        requestDebug('switching to fallback');

	        // let's try the fallback starting from here
	        tries = 0;

	        // method, url and body are fallback dependent
	        reqOpts.method = opts.fallback.method;
	        reqOpts.url = opts.fallback.url;
	        reqOpts.jsonBody = opts.fallback.body;
	        if (reqOpts.jsonBody) {
	          reqOpts.body = safeJSONStringify(reqOpts.jsonBody);
	        }

	        reqOpts.timeout = client.requestTimeout * (tries + 1);
	        client.hostIndex[opts.hostType] = 0;
	        usingFallback = true; // the current request is now using fallback
	        return doRequest(client._request.fallback, reqOpts);
	      }

	      var url = client.hosts[opts.hostType][client.hostIndex[opts.hostType]] + reqOpts.url;
	      var options = {
	        body: body,
	        jsonBody: opts.body,
	        method: reqOpts.method,
	        headers: client._computeRequestHeaders(),
	        timeout: reqOpts.timeout,
	        debug: requestDebug
	      };

	      requestDebug('method: %s, url: %s, headers: %j, timeout: %d',
	        options.method, url, options.headers, options.timeout);

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

	        if (process && process.env.DEBUG && process.env.DEBUG.indexOf('debugBody') !== -1) {
	          requestDebug('body: %j', httpResponse.body);
	        }

	        var ok = status === 200 || status === 201;
	        var retry = !ok && Math.floor(status / 100) !== 4 && Math.floor(status / 100) !== 1;

	        if (client._useCache && ok && cache) {
	          cache[cacheID] = httpResponse.responseText;
	        }

	        if (ok) {
	          return httpResponse.body;
	        }

	        if (retry) {
	          tries += 1;
	          return retryRequest();
	        }

	        var unrecoverableError = new errors.AlgoliaSearchError(
	          httpResponse.body && httpResponse.body.message
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
	          tries >= client.hosts[opts.hostType].length &&
	          (usingFallback || !opts.fallback || !client._request.fallback)) {
	          // stop request implementation for this command
	          return client._promise.reject(err);
	        }

	        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;

	        if (err instanceof errors.RequestTimeout) {
	          return retryRequest();
	        } else if (client._request.fallback && !client.useFallback) {
	          // if any error occured but timeout, use fallback for the rest
	          // of the session
	          client.useFallback = true;
	        }

	        return doRequest(requester, reqOpts);
	      }

	      function retryRequest() {
	        client.hostIndex[opts.hostType] = ++client.hostIndex[opts.hostType] % client.hosts[opts.hostType].length;
	        reqOpts.timeout = client.requestTimeout * (tries + 1);
	        return doRequest(requester, reqOpts);
	      }
	    }

	    // we can use a fallback if forced AND fallback parameters are available
	    var useFallback = client.useFallback && opts.fallback;
	    var requestOptions = useFallback ? opts.fallback : opts;

	    var promise = doRequest(
	      // set the requester
	      useFallback ? client._request.fallback : client._request, {
	        url: requestOptions.url,
	        method: requestOptions.method,
	        body: body,
	        jsonBody: opts.body,
	        timeout: client.requestTimeout * (tries + 1)
	      }
	    );

	    // either we have a callback
	    // either we are using promises
	    if (opts.callback) {
	      promise.then(function okCb(content) {
	        exitPromise(function() {
	          opts.callback(null, content);
	        }, client._setTimeout || setTimeout);
	      }, function nookCb(err) {
	        exitPromise(function() {
	          opts.callback(err);
	        }, client._setTimeout || setTimeout);
	      });
	    } else {
	      return promise;
	    }
	  },

	  /*
	  * Transform search param object in query string
	  */
	  _getSearchParams: function(args, params) {
	    if (this._isUndefined(args) || args === null) {
	      return params;
	    }
	    for (var key in args) {
	      if (key !== null && args[key] !== undefined && args.hasOwnProperty(key)) {
	        params += params === '' ? '' : '&';
	        params += key + '=' + encodeURIComponent(Object.prototype.toString.call(args[key]) === '[object Array]' ? safeJSONStringify(args[key]) : args[key]);
	      }
	    }
	    return params;
	  },

	  _isUndefined: function(obj) {
	    return obj === void 0;
	  },

	  _computeRequestHeaders: function() {
	    var forEach = __webpack_require__(8);

	    var requestHeaders = {
	      'x-algolia-api-key': this.apiKey,
	      'x-algolia-application-id': this.applicationID,
	      'x-algolia-agent': this._ua
	    };

	    if (this.userToken) {
	      requestHeaders['x-algolia-usertoken'] = this.userToken;
	    }

	    if (this.securityTags) {
	      requestHeaders['x-algolia-tagfilters'] = this.securityTags;
	    }

	    if (this.extraHeaders) {
	      forEach(this.extraHeaders, function addToRequestHeaders(header) {
	        requestHeaders[header.name] = header.value;
	      });
	    }

	    return requestHeaders;
	  }
	};

	/*
	 * Contains all the functions related to one index
	 * You should use AlgoliaSearch.initIndex(indexName) to retrieve this object
	 */
	AlgoliaSearch.prototype.Index.prototype = {
	  /*
	   * Clear all queries in cache
	   */
	  clearCache: function() {
	    this.cache = {};
	  },
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
	  addObject: function(content, objectID, callback) {
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
	  },
	  /*
	   * Add several objects
	   *
	   * @param objects contains an array of objects to add
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  addObjects: function(objects, callback) {
	    var isArray = __webpack_require__(27);
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
	  },
	  /*
	   * Get an object from this index
	   *
	   * @param objectID the unique identifier of the object to retrieve
	   * @param attrs (optional) if set, contains the array of attribute names to retrieve
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the object to retrieve or the error message if a failure occured
	   */
	  getObject: function(objectID, attrs, callback) {
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
	  },

	  /*
	   * Get several objects from this index
	   *
	   * @param objectIDs the array of unique identifier of objects to retrieve
	   */
	  getObjects: function(objectIDs, attributesToRetrieve, callback) {
	    var isArray = __webpack_require__(27);
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
	  },

	  /*
	   * Update partially an object (only update attributes passed in argument)
	   *
	   * @param partialObject contains the javascript attributes to override, the
	   *  object must contains an objectID attribute
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  partialUpdateObject: function(partialObject, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(partialObject.objectID) + '/partial',
	      body: partialObject,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Partially Override the content of several objects
	   *
	   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  partialUpdateObjects: function(objects, callback) {
	    var isArray = __webpack_require__(27);
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
	        action: 'partialUpdateObject',
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
	  },
	  /*
	   * Override the content of object
	   *
	   * @param object contains the javascript object to save, the object must contains an objectID attribute
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  saveObject: function(object, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'PUT',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/' + encodeURIComponent(object.objectID),
	      body: object,
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Override the content of several objects
	   *
	   * @param objects contains an array of objects to update (each object must contains a objectID attribute)
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that updateAt and taskID
	   */
	  saveObjects: function(objects, callback) {
	    var isArray = __webpack_require__(27);
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
	  },
	  /*
	   * Delete an object from the index
	   *
	   * @param objectID the unique identifier of object to delete
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  deleteObject: function(objectID, callback) {
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
	  },
	  /*
	   * Delete several objects from an index
	   *
	   * @param objectIDs contains an array of objectID to delete
	   * @param callback (optional) the result callback called with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains 3 elements: createAt, taskId and objectID
	   */
	  deleteObjects: function(objectIDs, callback) {
	    var isArray = __webpack_require__(27);
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
	  },
	  /*
	   * Delete all objects matching a query
	   *
	   * @param query the query string
	   * @param params the optional query parameters
	   * @param callback (optional) the result callback called with one argument
	   *  error: null or Error('message')
	   */
	  deleteByQuery: function(query, params, callback) {
	    var clone = __webpack_require__(34);

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
	  },

	  /*
	   * Search inside the index using XMLHttpRequest request (Using a POST query to
	   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	   *
	   * @param query the full text query
	   * @param args (optional) if set, contains an object with query parameters:
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
	   * @param callback the result callback called with two arguments:
	   *  error: null or Error('message'). If false, the content contains the error.
	   *  content: the server answer that contains the list of results.
	   */
	  search: buildSearchMethod('query'),

	  /*
	   * -- BETA --
	   * Search a record similar to the query inside the index using XMLHttpRequest request (Using a POST query to
	   * minimize number of OPTIONS queries: Cross-Origin Resource Sharing).
	   *
	   * @param query the similar query
	   * @param args (optional) if set, contains an object with query parameters.
	   *   All search parameters are supported (see search function), restrictSearchableAttributes and facetFilters
	   *   are the two most useful to restrict the similar results and get more relevant content
	   */
	  similarSearch: buildSearchMethod('similarQuery'),

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
	  // pre 3.5.0 usage, backward compatible
	  // browse: function(page, hitsPerPage, callback) {
	  browse: function(query, queryParameters, callback) {
	    var merge = __webpack_require__(44);

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
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/browse?' + params,
	      hostType: 'read',
	      callback: callback
	    });
	  },

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
	  browseFrom: function(cursor, callback) {
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/browse?cursor=' + encodeURIComponent(cursor),
	      hostType: 'read',
	      callback: callback
	    });
	  },

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
	  browseAll: function(query, queryParameters) {
	    if (typeof query === 'object') {
	      queryParameters = query;
	      query = undefined;
	    }

	    var merge = __webpack_require__(44);

	    var IndexBrowser = __webpack_require__(53);

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

	      var queryString;

	      if (cursor !== undefined) {
	        queryString = 'cursor=' + encodeURIComponent(cursor);
	      } else {
	        queryString = params;
	      }

	      client._jsonRequest({
	        method: 'GET',
	        url: '/1/indexes/' + encodeURIComponent(index.indexName) + '/browse?' + queryString,
	        hostType: 'read',
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
	  },

	  /*
	   * Get a Typeahead.js adapter
	   * @param searchParams contains an object with query parameters (see search for details)
	   */
	  ttAdapter: function(params) {
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

	  /*
	   * Wait the publication of a task on the server.
	   * All server task are asynchronous and you can check with this method that the task is published.
	   *
	   * @param taskID the id of the task returned by server
	   * @param callback the result callback with with two arguments:
	   *  error: null or Error('message')
	   *  content: the server answer that contains the list of results
	   */
	  waitTask: function(taskID, callback) {
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
	  },

	  /*
	   * This function deletes the index content. Settings and index specific API keys are kept untouched.
	   *
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the settings object or the error message if a failure occured
	   */
	  clearIndex: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/clear',
	      hostType: 'write',
	      callback: callback
	    });
	  },
	  /*
	   * Get settings of this index
	   *
	   * @param callback (optional) the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the settings object or the error message if a failure occured
	   */
	  getSettings: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
	      hostType: 'read',
	      callback: callback
	    });
	  },

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
	  setSettings: function(settings, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'PUT',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/settings',
	      hostType: 'write',
	      body: settings,
	      callback: callback
	    });
	  },
	  /*
	   * List all existing user keys associated to this index
	   *
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  listUserKeys: function(callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys',
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Get ACL of a user key associated to this index
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  getUserKeyACL: function(key, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'GET',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	      hostType: 'read',
	      callback: callback
	    });
	  },
	  /*
	   * Delete an existing user key associated to this index
	   *
	   * @param key
	   * @param callback the result callback called with two arguments
	   *  error: null or Error('message')
	   *  content: the server answer with user keys list
	   */
	  deleteUserKey: function(key, callback) {
	    var indexObj = this;
	    return this.as._jsonRequest({
	      method: 'DELETE',
	      url: '/1/indexes/' + encodeURIComponent(indexObj.indexName) + '/keys/' + key,
	      hostType: 'write',
	      callback: callback
	    });
	  },
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
	   *   content: the server answer with user keys list
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
	   */
	  addUserKey: function(acls, params, callback) {
	    var isArray = __webpack_require__(27);
	    var usage = 'Usage: index.addUserKey(arrayOfAcls[, params, callback])';

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
	  },

	  /**
	   * Add an existing user key associated to this index
	   * @deprecated use index.addUserKey()
	   */
	  addUserKeyWithValidity: deprecate(function deprecatedAddUserKeyWithValidity(acls, params, callback) {
	    return this.addUserKey(acls, params, callback);
	  }, deprecatedMessage('index.addUserKeyWithValidity()', 'index.addUserKey()')),

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
	   * index.updateUserKey('APIKEY', ['search'], {
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
	   */
	  updateUserKey: function(key, acls, params, callback) {
	    var isArray = __webpack_require__(27);
	    var usage = 'Usage: index.updateUserKey(key, arrayOfAcls[, params, callback])';

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
	  },

	  _search: function(params, callback) {
	    return this.as._jsonRequest({
	      cache: this.cache,
	      method: 'POST',
	      url: '/1/indexes/' + encodeURIComponent(this.indexName) + '/query',
	      body: {params: params},
	      hostType: 'read',
	      fallback: {
	        method: 'GET',
	        url: '/1/indexes/' + encodeURIComponent(this.indexName),
	        body: {params: params}
	      },
	      callback: callback
	    });
	  },

	  as: null,
	  indexName: null,
	  typeAheadArgs: null,
	  typeAheadValueOption: null
	};

	// extracted from https://github.com/component/map/blob/master/index.js
	// without the crazy toFunction thing
	function map(arr, fn) {
	  var ret = [];
	  for (var i = 0; i < arr.length; ++i) {
	    ret.push(fn(arr[i], i));
	  }
	  return ret;
	}

	function prepareHost(protocol) {
	  return function prepare(host) {
	    return protocol + '//' + host.toLowerCase();
	  };
	}

	function notImplemented() {
	  var message = 'Not implemented in this environment.\n' +
	    'If you feel this is a mistake, write to support@algolia.com';

	  throw new errors.AlgoliaSearchError(message);
	}

	function deprecatedMessage(previousUsage, newUsage) {
	  var githubAnchorLink = previousUsage.toLowerCase()
	    .replace('.', '')
	    .replace('()', '');

	  return 'algoliasearch: `' + previousUsage + '` was replaced by `' + newUsage +
	    '`. Please see https://github.com/algolia/algoliasearch-client-js/wiki/Deprecated#' + githubAnchorLink;
	}

	// Parse cloud does not supports setTimeout
	// We do not store a setTimeout reference in the client everytime
	// We only fallback to a fake setTimeout when not available
	// setTimeout cannot be override globally sadly
	function exitPromise(fn, _setTimeout) {
	  _setTimeout(fn, 0);
	}

	function deprecate(fn, message) {
	  var warned = false;

	  function deprecated() {
	    if (!warned) {
	      /* eslint no-console:0 */
	      console.log(message);
	      warned = true;
	    }

	    return fn.apply(this, arguments);
	  }

	  return deprecated;
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

	function buildSearchMethod(queryParam) {
	  return function search(query, args, callback) {
	    // warn V2 users on how to search
	    if (typeof query === 'function' && typeof args === 'object' ||
	      typeof callback === 'object') {
	      // .search(query, params, cb)
	      // .search(cb, params)
	      throw new errors.AlgoliaSearchError('index.search usage is index.search(query, params, cb)');
	    }

	    if (arguments.length === 0 || typeof query === 'function') {
	      // .search(), .search(cb)
	      callback = query;
	      query = '';
	    } else if (arguments.length === 1 || typeof args === 'function') {
	      // .search(query/args), .search(query, cb)
	      callback = args;
	      args = undefined;
	    }

	    // .search(args), careful: typeof null === 'object'
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

	    if (args !== undefined) {
	      // `_getSearchParams` will augment params, do not be fooled by the = versus += from previous if
	      params = this.as._getSearchParams(args, params);
	    }

	    return this._search(params, callback);
	  };
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	

	// This file hosts our error definitions
	// We use custom error "types" so that we can act on them when we need it
	// e.g.: if error instanceof errors.UnparsableJSON then..

	var inherits = __webpack_require__(4);

	function AlgoliaSearchError(message, extraProperties) {
	  var forEach = __webpack_require__(8);

	  var error = this;

	  // try to get a stacktrace
	  if (typeof Error.captureStackTrace === 'function') {
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    error.stack = (new Error()).stack || 'Cannot get a stacktrace, browser is too old';
	  }

	  this.name = this.constructor.name;
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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(9),
	    baseEach = __webpack_require__(10),
	    createForEach = __webpack_require__(31);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(11),
	    createBaseEach = __webpack_require__(30);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(12),
	    keys = __webpack_require__(16);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(13);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(14);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 15 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    isArrayLike = __webpack_require__(21),
	    isObject = __webpack_require__(15),
	    shimKeys = __webpack_require__(25);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(18);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isObjectLike = __webpack_require__(20);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(15);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(22),
	    isLength = __webpack_require__(24);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(23);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 24 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(27),
	    isIndex = __webpack_require__(28),
	    isLength = __webpack_require__(24),
	    keysIn = __webpack_require__(29);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(21),
	    isObjectLike = __webpack_require__(20);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(17),
	    isLength = __webpack_require__(24),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(27),
	    isIndex = __webpack_require__(28),
	    isLength = __webpack_require__(24),
	    isObject = __webpack_require__(15);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(22),
	    isLength = __webpack_require__(24),
	    toObject = __webpack_require__(14);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(32),
	    isArray = __webpack_require__(27);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(33);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(35),
	    bindCallback = __webpack_require__(32),
	    isIterateeCall = __webpack_require__(43);

	/**
	 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	 * otherwise they are assigned by reference. If `customizer` is provided it's
	 * invoked to produce the cloned values. If `customizer` returns `undefined`
	 * cloning is handled by the method instead. The `customizer` is bound to
	 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var shallow = _.clone(users);
	 * shallow[0] === users[0];
	 * // => true
	 *
	 * var deep = _.clone(users, true);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.clone(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(false);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 0
	 */
	function clone(value, isDeep, customizer, thisArg) {
	  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
	    isDeep = false;
	  }
	  else if (typeof isDeep == 'function') {
	    thisArg = customizer;
	    customizer = isDeep;
	    isDeep = false;
	  }
	  return typeof customizer == 'function'
	    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, isDeep);
	}

	module.exports = clone;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(36),
	    arrayEach = __webpack_require__(9),
	    baseAssign = __webpack_require__(37),
	    baseForOwn = __webpack_require__(11),
	    initCloneArray = __webpack_require__(39),
	    initCloneByTag = __webpack_require__(40),
	    initCloneObject = __webpack_require__(42),
	    isArray = __webpack_require__(27),
	    isObject = __webpack_require__(15);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	cloneableTags[dateTag] = cloneableTags[float32Tag] =
	cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[stringTag] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[mapTag] = cloneableTags[setTag] =
	cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag]
	        ? initCloneByTag(value, tag, isDeep)
	        : (object ? value : {});
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	module.exports = baseClone;


/***/ },
/* 36 */
/***/ function(module, exports) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(38),
	    keys = __webpack_require__(16);

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign(object, source) {
	  return source == null
	    ? object
	    : baseCopy(source, keys(source), object);
	}

	module.exports = baseAssign;


/***/ },
/* 38 */
/***/ function(module, exports) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;


/***/ },
/* 39 */
/***/ function(module, exports) {

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var bufferClone = __webpack_require__(41);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag: case float64Tag:
	    case int8Tag: case int16Tag: case int32Tag:
	    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	module.exports = initCloneByTag;


/***/ },
/* 41 */
/***/ function(module, exports) {

	/** Native method references. */
	var ArrayBuffer = global.ArrayBuffer,
	    Uint8Array = global.Uint8Array;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  var result = new ArrayBuffer(buffer.byteLength),
	      view = new Uint8Array(result);

	  view.set(new Uint8Array(buffer));
	  return result;
	}

	module.exports = bufferClone;


/***/ },
/* 42 */
/***/ function(module, exports) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor;
	}

	module.exports = initCloneObject;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(21),
	    isIndex = __webpack_require__(28),
	    isObject = __webpack_require__(15);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var baseMerge = __webpack_require__(45),
	    createAssigner = __webpack_require__(51);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it's invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(9),
	    baseMergeDeep = __webpack_require__(46),
	    isArray = __webpack_require__(27),
	    isArrayLike = __webpack_require__(21),
	    isObject = __webpack_require__(15),
	    isObjectLike = __webpack_require__(20),
	    isTypedArray = __webpack_require__(49),
	    keys = __webpack_require__(16);

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	      props = isSrcArr ? undefined : keys(source);

	  arrayEach(props || source, function(srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    }
	    else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((result !== undefined || (isSrcArr && !(key in object))) &&
	          (isCommon || (result === result ? (result !== value) : (value === value)))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var arrayCopy = __webpack_require__(36),
	    isArguments = __webpack_require__(26),
	    isArray = __webpack_require__(27),
	    isArrayLike = __webpack_require__(21),
	    isPlainObject = __webpack_require__(47),
	    isTypedArray = __webpack_require__(49),
	    toPlainObject = __webpack_require__(50);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merged values.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value)
	        ? value
	        : (isArrayLike(value) ? arrayCopy(value) : []);
	    }
	    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value)
	        ? toPlainObject(value)
	        : (isPlainObject(value) ? value : {});
	    }
	    else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? (result !== value) : (value === value)) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var baseForIn = __webpack_require__(48),
	    isArguments = __webpack_require__(26),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function(subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = isPlainObject;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(12),
	    keysIn = __webpack_require__(29);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(24),
	    isObjectLike = __webpack_require__(20);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseCopy = __webpack_require__(38),
	    keysIn = __webpack_require__(29);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(32),
	    isIterateeCall = __webpack_require__(43),
	    restParam = __webpack_require__(52);

	/**
	 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function(object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 ? sources[length - 2] : undefined,
	        guard = length > 2 ? sources[2] : undefined,
	        thisArg = length > 1 ? sources[length - 1] : undefined;

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : undefined;
	      length -= (customizer ? 1 : 0);
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, rest);
	      case 1: return func.call(this, args[0], rest);
	      case 2: return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	

	// This is the object returned by the `index.browseAll()` method

	module.exports = IndexBrowser;

	var inherits = __webpack_require__(4);
	var EventEmitter = __webpack_require__(54).EventEmitter;

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


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("events");

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseClone = __webpack_require__(35),
	    bindCallback = __webpack_require__(32);

	/**
	 * Creates a deep clone of `value`. If `customizer` is provided it's invoked
	 * to produce the cloned values. If `customizer` returns `undefined` cloning
	 * is handled by the method instead. The `customizer` is bound to `thisArg`
	 * and invoked with up to three argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the deep cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var deep = _.cloneDeep(users);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.cloneDeep(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(true);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 20
	 */
	function cloneDeep(value, customizer, thisArg) {
	  return typeof customizer == 'function'
	    ? baseClone(value, true, bindCallback(customizer, thisArg, 3))
	    : baseClone(value, true);
	}

	module.exports = cloneDeep;


/***/ },
/* 56 */
/***/ function(module, exports) {

	

	module.exports = '3.9.2';


/***/ }
/******/ ]);