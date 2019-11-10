define("rollbar", [], function() { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var rollbar = __webpack_require__(2);
	
	var options = window && window._rollbarConfig;
	var alias = options && options.globalAlias || 'Rollbar';
	var shimRunning = window && window[alias] && typeof window[alias].shimId === 'function' && window[alias].shimId() !== undefined;
	
	if (window && !window._rollbarStartTime) {
	  window._rollbarStartTime = (new Date()).getTime();
	}
	
	if (!shimRunning && options) {
	  var Rollbar = new rollbar(options);
	  window[alias] = Rollbar;
	} else {
	  window.rollbar = rollbar;
	  window._rollbarDidLoad = true;
	}
	
	module.exports = rollbar;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Client = __webpack_require__(3);
	var _ = __webpack_require__(6);
	var API = __webpack_require__(11);
	var logger = __webpack_require__(13);
	var globals = __webpack_require__(16);
	
	var transport = __webpack_require__(17);
	var urllib = __webpack_require__(18);
	
	var transforms = __webpack_require__(19);
	var sharedTransforms = __webpack_require__(23);
	var predicates = __webpack_require__(24);
	var errorParser = __webpack_require__(20);
	var Instrumenter = __webpack_require__(25);
	
	function Rollbar(options, client) {
	  this.options = _.extend(true, defaultOptions, options);
	  var api = new API(this.options, transport, urllib);
	  this.client = client || new Client(this.options, api, logger, 'browser');
	
	  addTransformsToNotifier(this.client.notifier);
	  addPredicatesToQueue(this.client.queue);
	  if (this.options.captureUncaught || this.options.handleUncaughtExceptions) {
	    globals.captureUncaughtExceptions(window, this);
	    globals.wrapGlobals(window, this);
	  }
	  if (this.options.captureUnhandledRejections || this.options.handleUnhandledRejections) {
	    globals.captureUnhandledRejections(window, this);
	  }
	
	  this.instrumenter = new Instrumenter(this.options, this.client.telemeter, this, window, document);
	  this.instrumenter.instrument();
	}
	
	var _instance = null;
	Rollbar.init = function(options, client) {
	  if (_instance) {
	    return _instance.global(options).configure(options);
	  }
	  _instance = new Rollbar(options, client);
	  return _instance;
	};
	
	function handleUninitialized(maybeCallback) {
	  var message = 'Rollbar is not initialized';
	  logger.error(message);
	  if (maybeCallback) {
	    maybeCallback(new Error(message));
	  }
	}
	
	Rollbar.prototype.global = function(options) {
	  this.client.global(options);
	  return this;
	};
	Rollbar.global = function(options) {
	  if (_instance) {
	    return _instance.global(options);
	  } else {
	    handleUninitialized();
	  }
	};
	
	Rollbar.prototype.configure = function(options, payloadData) {
	  var oldOptions = this.options;
	  var payload = {};
	  if (payloadData) {
	    payload = {payload: payloadData};
	  }
	  this.options = _.extend(true, {}, oldOptions, options, payload);
	  this.client.configure(options, payloadData);
	  this.instrumenter.configure(options);
	  return this;
	};
	Rollbar.configure = function(options, payloadData) {
	  if (_instance) {
	    return _instance.configure(options, payloadData);
	  } else {
	    handleUninitialized();
	  }
	};
	
	Rollbar.prototype.lastError = function() {
	  return this.client.lastError;
	};
	Rollbar.lastError = function() {
	  if (_instance) {
	    return _instance.lastError();
	  } else {
	    handleUninitialized();
	  }
	};
	
	Rollbar.prototype.log = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.log(item);
	  return {uuid: uuid};
	};
	Rollbar.log = function() {
	  if (_instance) {
	    return _instance.log.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.debug = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.debug(item);
	  return {uuid: uuid};
	};
	Rollbar.debug = function() {
	  if (_instance) {
	    return _instance.debug.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.info = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.info(item);
	  return {uuid: uuid};
	};
	Rollbar.info = function() {
	  if (_instance) {
	    return _instance.info.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.warn = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.warn(item);
	  return {uuid: uuid};
	};
	Rollbar.warn = function() {
	  if (_instance) {
	    return _instance.warn.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.warning = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.warning(item);
	  return {uuid: uuid};
	};
	Rollbar.warning = function() {
	  if (_instance) {
	    return _instance.warning.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.error = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.error(item);
	  return {uuid: uuid};
	};
	Rollbar.error = function() {
	  if (_instance) {
	    return _instance.error.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.critical = function() {
	  var item = this._createItem(arguments);
	  var uuid = item.uuid;
	  this.client.critical(item);
	  return {uuid: uuid};
	};
	Rollbar.critical = function() {
	  if (_instance) {
	    return _instance.critical.apply(_instance, arguments);
	  } else {
	    var maybeCallback = _getFirstFunction(arguments);
	    handleUninitialized(maybeCallback);
	  }
	};
	
	Rollbar.prototype.handleUncaughtException = function(message, url, lineno, colno, error, context) {
	  var item;
	  var stackInfo = _.makeUnhandledStackInfo(
	    message,
	    url,
	    lineno,
	    colno,
	    error,
	    'onerror',
	    'uncaught exception',
	    errorParser
	  );
	  if (_.isError(error)) {
	    item = this._createItem([message, error, context]);
	    item._unhandledStackInfo = stackInfo;
	  } else if (_.isError(url)) {
	    item = this._createItem([message, url, context]);
	    item._unhandledStackInfo = stackInfo;
	  } else {
	    item = this._createItem([message, context]);
	    item.stackInfo = stackInfo;
	  }
	  item.level = this.options.uncaughtErrorLevel;
	  item._isUncaught = true;
	  this.client.log(item);
	};
	
	Rollbar.prototype.handleUnhandledRejection = function(reason, promise) {
	  var message = 'unhandled rejection was null or undefined!';
	  message = reason ? (reason.message || String(reason)) : message;
	  var context = (reason && reason._rollbarContext) || (promise && promise._rollbarContext);
	
	  var item;
	  if (_.isError(reason)) {
	    item = this._createItem([message, reason, context]);
	  } else {
	    item = this._createItem([message, reason, context]);
	    item.stackInfo = _.makeUnhandledStackInfo(
	      message,
	      '',
	      0,
	      0,
	      null,
	      'unhandledrejection',
	      '',
	      errorParser
	    );
	  }
	  item.level = this.options.uncaughtErrorLevel;
	  item._isUncaught = true;
	  item._originalArgs = item._originalArgs || [];
	  item._originalArgs.push(promise);
	  this.client.log(item);
	};
	
	Rollbar.prototype.wrap = function(f, context, _before) {
	  try {
	    var ctxFn;
	    if(_.isFunction(context)) {
	      ctxFn = context;
	    } else {
	      ctxFn = function() { return context || {}; };
	    }
	
	    if (!_.isFunction(f)) {
	      return f;
	    }
	
	    if (f._isWrap) {
	      return f;
	    }
	
	    if (!f._rollbar_wrapped) {
	      f._rollbar_wrapped = function () {
	        if (_before && _.isFunction(_before)) {
	          _before.apply(this, arguments);
	        }
	        try {
	          return f.apply(this, arguments);
	        } catch(exc) {
	          var e = exc;
	          if (_.isType(e, 'string')) {
	            e = new String(e);
	          }
	          e._rollbarContext = ctxFn() || {};
	          e._rollbarContext._wrappedSource = f.toString();
	
	          window._rollbarWrappedError = e;
	          throw e;
	        }
	      };
	
	      f._rollbar_wrapped._isWrap = true;
	
	      if (f.hasOwnProperty) {
	        for (var prop in f) {
	          if (f.hasOwnProperty(prop)) {
	            f._rollbar_wrapped[prop] = f[prop];
	          }
	        }
	      }
	    }
	
	    return f._rollbar_wrapped;
	  } catch (e) {
	    // Return the original function if the wrap fails.
	    return f;
	  }
	};
	Rollbar.wrap = function(f, context) {
	  if (_instance) {
	    return _instance.wrap(f, context);
	  } else {
	    handleUninitialized();
	  }
	};
	
	Rollbar.prototype.captureEvent = function(metadata, level) {
	  return this.client.captureEvent(metadata, level);
	};
	Rollbar.captureEvent = function(metadata, level) {
	  if (_instance) {
	    return _instance.captureEvent(metadata, level);
	  } else {
	    handleUninitialized();
	  }
	};
	
	// The following two methods are used internally and are not meant for public use
	Rollbar.prototype.captureDomContentLoaded = function(e, ts) {
	  if (!ts) {
	    ts = new Date();
	  }
	  return this.client.captureDomContentLoaded(ts);
	};
	
	Rollbar.prototype.captureLoad = function(e, ts) {
	  if (!ts) {
	    ts = new Date();
	  }
	  return this.client.captureLoad(ts);
	};
	
	/* Internal */
	
	function addTransformsToNotifier(notifier) {
	  notifier
	    .addTransform(transforms.handleItemWithError)
	    .addTransform(transforms.ensureItemHasSomethingToSay)
	    .addTransform(transforms.addBaseInfo)
	    .addTransform(transforms.addRequestInfo(window))
	    .addTransform(transforms.addClientInfo(window))
	    .addTransform(transforms.addPluginInfo(window))
	    .addTransform(transforms.addBody)
	    .addTransform(sharedTransforms.addMessageWithError)
	    .addTransform(sharedTransforms.addTelemetryData)
	    .addTransform(transforms.scrubPayload)
	    .addTransform(transforms.userTransform)
	    .addTransform(sharedTransforms.itemToPayload);
	}
	
	function addPredicatesToQueue(queue) {
	  queue
	    .addPredicate(predicates.checkIgnore)
	    .addPredicate(predicates.userCheckIgnore)
	    .addPredicate(predicates.urlIsNotBlacklisted)
	    .addPredicate(predicates.urlIsWhitelisted)
	    .addPredicate(predicates.messageIsIgnored);
	}
	
	Rollbar.prototype._createItem = function(args) {
	  return _.createItem(args, logger, this);
	};
	
	function _getFirstFunction(args) {
	  for (var i = 0, len = args.length; i < len; ++i) {
	    if (_.isFunction(args[i])) {
	      return args[i];
	    }
	  }
	  return undefined;
	}
	
	/* global __NOTIFIER_VERSION__:false */
	/* global __DEFAULT_BROWSER_SCRUB_FIELDS__:false */
	/* global __DEFAULT_LOG_LEVEL__:false */
	/* global __DEFAULT_REPORT_LEVEL__:false */
	/* global __DEFAULT_UNCAUGHT_ERROR_LEVEL:false */
	/* global __DEFAULT_ENDPOINT__:false */
	
	var defaultOptions = {
	  version: ("2.2.10"),
	  scrubFields: (["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"]),
	  logLevel: ("debug"),
	  reportLevel: ("debug"),
	  uncaughtErrorLevel: ("error"),
	  endpoint: ("api.rollbar.com/api/1/"),
	  verbose: false,
	  enabled: true
	};
	
	module.exports = Rollbar;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var RateLimiter = __webpack_require__(4);
	var Queue = __webpack_require__(5);
	var Notifier = __webpack_require__(9);
	var Telemeter = __webpack_require__(10);
	var _ = __webpack_require__(6);
	
	/*
	 * Rollbar - the interface to Rollbar
	 *
	 * @param options
	 * @param api
	 * @param logger
	 */
	function Rollbar(options, api, logger, platform) {
	  this.options = _.extend(true, {}, options);
	  this.logger = logger;
	  Rollbar.rateLimiter.configureGlobal(this.options);
	  Rollbar.rateLimiter.setPlatformOptions(platform, this.options);
	  this.queue = new Queue(Rollbar.rateLimiter, api, logger, this.options);
	  this.notifier = new Notifier(this.queue, this.options);
	  this.telemeter = new Telemeter(this.options);
	  this.lastError = null;
	}
	
	var defaultOptions = {
	  maxItems: 0,
	  itemsPerMinute: 60
	};
	
	Rollbar.rateLimiter = new RateLimiter(defaultOptions);
	
	Rollbar.prototype.global = function(options) {
	  Rollbar.rateLimiter.configureGlobal(options);
	  return this;
	};
	
	Rollbar.prototype.configure = function(options, payloadData) {
	  this.notifier && this.notifier.configure(options);
	  this.telemeter && this.telemeter.configure(options);
	  var oldOptions = this.options;
	  var payload = {};
	  if (payloadData) {
	    payload = {payload: payloadData};
	  }
	  this.options = _.extend(true, {}, oldOptions, options, payload);
	  this.global(this.options);
	  return this;
	};
	
	Rollbar.prototype.log = function(item) {
	  var level = this._defaultLogLevel();
	  return this._log(level, item);
	};
	
	Rollbar.prototype.debug = function(item) {
	  this._log('debug', item);
	};
	
	Rollbar.prototype.info = function(item) {
	  this._log('info', item);
	};
	
	Rollbar.prototype.warn = function(item) {
	  this._log('warning', item);
	};
	
	Rollbar.prototype.warning = function(item) {
	  this._log('warning', item);
	};
	
	Rollbar.prototype.error = function(item) {
	  this._log('error', item);
	};
	
	Rollbar.prototype.critical = function(item) {
	  this._log('critical', item);
	};
	
	Rollbar.prototype.wait = function(callback) {
	  this.queue.wait(callback);
	};
	
	Rollbar.prototype.captureEvent = function(metadata, level) {
	  return this.telemeter.captureEvent(metadata, level);
	};
	
	Rollbar.prototype.captureDomContentLoaded = function(ts) {
	  return this.telemeter.captureDomContentLoaded(ts);
	};
	
	Rollbar.prototype.captureLoad = function(ts) {
	  return this.telemeter.captureLoad(ts);
	};
	
	/* Internal */
	
	Rollbar.prototype._log = function(defaultLevel, item) {
	  if (this._sameAsLastError(item)) {
	    return;
	  }
	  try {
	    var callback = null;
	    if (item.callback) {
	      callback = item.callback;
	      delete item.callback;
	    }
	    item.level = item.level || defaultLevel;
	    item.telemetryEvents = this.telemeter.copyEvents();
	    this.telemeter._captureRollbarItem(item);
	    this.notifier.log(item, callback);
	  } catch (e) {
	    this.logger.error(e)
	  }
	};
	
	Rollbar.prototype._defaultLogLevel = function() {
	  return this.options.logLevel || 'debug';
	};
	
	Rollbar.prototype._sameAsLastError = function(item) {
	  if (this.lastError && this.lastError === item.err) {
	    return true;
	  }
	  this.lastError = item.err;
	  return false;
	};
	
	module.exports = Rollbar;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	/*
	 * RateLimiter - an object that encapsulates the logic for counting items sent to Rollbar
	 *
	 * @param options - the same options that are accepted by configureGlobal offered as a convenience
	 */
	function RateLimiter(options) {
	  this.startTime = (new Date()).getTime();
	  this.counter = 0;
	  this.perMinCounter = 0;
	  this.platform = null;
	  this.platformOptions = {};
	  this.configureGlobal(options);
	}
	
	RateLimiter.globalSettings = {
	  startTime: (new Date()).getTime(),
	  maxItems: undefined,
	  itemsPerMinute: undefined
	};
	
	/*
	 * configureGlobal - set the global rate limiter options
	 *
	 * @param options - Only the following values are recognized:
	 *    startTime: a timestamp of the form returned by (new Date()).getTime()
	 *    maxItems: the maximum items
	 *    itemsPerMinute: the max number of items to send in a given minute
	 */
	RateLimiter.prototype.configureGlobal = function(options) {
	  if (options.startTime !== undefined) {
	    RateLimiter.globalSettings.startTime = options.startTime;
	  }
	  if (options.maxItems !== undefined) {
	    RateLimiter.globalSettings.maxItems = options.maxItems;
	  }
	  if (options.itemsPerMinute !== undefined) {
	    RateLimiter.globalSettings.itemsPerMinute = options.itemsPerMinute;
	  }
	};
	
	/*
	 * shouldSend - determine if we should send a given item based on rate limit settings
	 *
	 * @param item - the item we are about to send
	 * @returns An object with the following structure:
	 *  error: (Error|null)
	 *  shouldSend: bool
	 *  payload: (Object|null)
	 *  If shouldSend is false, the item passed as a parameter should not be sent to Rollbar, and
	 *  exactly one of error or payload will be non-null. If error is non-null, the returned Error will
	 *  describe the situation, but it means that we were already over a rate limit (either globally or
	 *  per minute) when this item was checked. If error is null, and therefore payload is non-null, it
	 *  means this item put us over the global rate limit and the payload should be sent to Rollbar in
	 *  place of the passed in item.
	 */
	RateLimiter.prototype.shouldSend = function(item, now) {
	  now = now || (new Date()).getTime();
	  if (now - this.startTime >= 60000) {
	    this.startTime = now;
	    this.perMinCounter = 0;
	  }
	
	  var globalRateLimit = RateLimiter.globalSettings.maxItems;
	  var globalRateLimitPerMin = RateLimiter.globalSettings.itemsPerMinute;
	
	  if (checkRate(item, globalRateLimit, this.counter)) {
	    return shouldSendValue(this.platform, this.platformOptions, globalRateLimit + ' max items reached', false);
	  } else if (checkRate(item, globalRateLimitPerMin, this.perMinCounter)) {
	    return shouldSendValue(this.platform, this.platformOptions, globalRateLimitPerMin + ' items per minute reached', false);
	  }
	  this.counter++;
	  this.perMinCounter++;
	
	  var shouldSend = !checkRate(item, globalRateLimit, this.counter);
	  return shouldSendValue(this.platform, this.platformOptions, null, shouldSend, globalRateLimit);
	};
	
	RateLimiter.prototype.setPlatformOptions = function(platform, options) {
	  this.platform = platform;
	  this.platformOptions = options;
	};
	
	/* Helpers */
	
	function checkRate(item, limit, counter) {
	  return !item.ignoreRateLimit && limit >= 1 && counter > limit;
	}
	
	function shouldSendValue(platform, options, error, shouldSend, globalRateLimit) {
	  var payload = null;
	  if (error) {
	    error = new Error(error);
	  }
	  if (!error && !shouldSend) {
	    payload = rateLimitPayload(platform, options, globalRateLimit);
	  }
	  return {error: error, shouldSend: shouldSend, payload: payload};
	}
	
	function rateLimitPayload(platform, options, globalRateLimit) {
	  var environment = options.environment || (options.payload && options.payload.environment);
	  var item = {
	    body: {
	      message: {
	        body: 'maxItems has been hit. Ignoring errors until reset.',
	        extra: {
	          maxItems: globalRateLimit
	        }
	      }
	    },
	    language: 'javascript',
	    environment: environment,
	    notifier: {
	      version: (options.notifier && options.notifier.version) || options.version
	    }
	  };
	  if (platform === 'browser') {
	    item.platform = 'browser';
	    item.framework = 'browser-js';
	    item.notifier.name = 'rollbar-browser-js';
	  } else if (platform === 'server') {
	    item.framework = options.framework || 'node-js';
	    item.notifier.name = options.notifier.name;
	  }
	  return item;
	}
	
	module.exports = RateLimiter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	
	/*
	 * Queue - an object which handles which handles a queue of items to be sent to Rollbar.
	 *   This object handles rate limiting via a passed in rate limiter, retries based on connection
	 *   errors, and filtering of items based on a set of configurable predicates. The communication to
	 *   the backend is performed via a given API object.
	 *
	 * @param rateLimiter - An object which conforms to the interface
	 *    rateLimiter.shouldSend(item) -> bool
	 * @param api - An object which conforms to the interface
	 *    api.postItem(payload, function(err, response))
	 * @param logger - An object used to log verbose messages if desired
	 * @param options - see Queue.prototype.configure
	 */
	function Queue(rateLimiter, api, logger, options) {
	  this.rateLimiter = rateLimiter;
	  this.api = api;
	  this.logger = logger;
	  this.options = options;
	  this.predicates = [];
	  this.pendingItems = [];
	  this.pendingRequests = [];
	  this.retryQueue = [];
	  this.retryHandle = null;
	  this.waitCallback = null;
	  this.waitIntervalID = null;
	}
	
	/*
	 * configure - updates the options this queue uses
	 *
	 * @param options
	 */
	Queue.prototype.configure = function(options) {
	  this.api && this.api.configure(options);
	  var oldOptions = this.options;
	  this.options = _.extend(true, {}, oldOptions, options);
	  return this;
	};
	
	/*
	 * addPredicate - adds a predicate to the end of the list of predicates for this queue
	 *
	 * @param predicate - function(item, options) -> (bool|{err: Error})
	 *  Returning true means that this predicate passes and the item is okay to go on the queue
	 *  Returning false means do not add the item to the queue, but it is not an error
	 *  Returning {err: Error} means do not add the item to the queue, and the given error explains why
	 *  Returning {err: undefined} is equivalent to returning true but don't do that
	 */
	Queue.prototype.addPredicate = function(predicate) {
	  if (_.isFunction(predicate)) {
	    this.predicates.push(predicate);
	  }
	  return this;
	};
	
	Queue.prototype.addPendingItem = function(item) {
	  this.pendingItems.push(item);
	};
	
	Queue.prototype.removePendingItem = function(item) {
	  var idx = this.pendingItems.indexOf(item);
	  if (idx !== -1) {
	    this.pendingItems.splice(idx, 1);
	  }
	};
	
	/*
	 * addItem - Send an item to the Rollbar API if all of the predicates are satisfied
	 *
	 * @param item - The payload to send to the backend
	 * @param callback - function(error, repsonse) which will be called with the response from the API
	 *  in the case of a success, otherwise response will be null and error will have a value. If both
	 *  error and response are null then the item was stopped by a predicate which did not consider this
	 *  to be an error condition, but nonetheless did not send the item to the API.
	 *  @param originalError - The original error before any transformations that is to be logged if any
	 */
	Queue.prototype.addItem = function(item, callback, originalError, originalItem) {
	  if (!callback || !_.isFunction(callback)) {
	    callback = function() { return; };
	  }
	  var predicateResult = this._applyPredicates(item);
	  if (predicateResult.stop) {
	    this.removePendingItem(originalItem);
	    callback(predicateResult.err);
	    return;
	  }
	  this._maybeLog(item, originalError);
	  this.removePendingItem(originalItem);
	  this.pendingRequests.push(item);
	  try {
	    this._makeApiRequest(item, function(err, resp) {
	      this._dequeuePendingRequest(item);
	      callback(err, resp);
	    }.bind(this));
	  } catch (e) {
	    this._dequeuePendingRequest(item);
	    callback(e);
	  }
	};
	
	/*
	 * wait - Stop any further errors from being added to the queue, and get called back when all items
	 *   currently processing have finished sending to the backend.
	 *
	 * @param callback - function() called when all pending items have been sent
	 */
	Queue.prototype.wait = function(callback) {
	  if (!_.isFunction(callback)) {
	    return;
	  }
	  this.waitCallback = callback;
	  if (this._maybeCallWait()) {
	    return;
	  }
	  if (this.waitIntervalID) {
	    this.waitIntervalID = clearInterval(this.waitIntervalID);
	  }
	  this.waitIntervalID = setInterval(function() {
	    this._maybeCallWait();
	  }.bind(this), 500);
	};
	
	/* _applyPredicates - Sequentially applies the predicates that have been added to the queue to the
	 *   given item with the currently configured options.
	 *
	 * @param item - An item in the queue
	 * @returns {stop: bool, err: (Error|null)} - stop being true means do not add item to the queue,
	 *   the error value should be passed up to a callbak if we are stopping.
	 */
	Queue.prototype._applyPredicates = function(item) {
	  var p = null;
	  for (var i = 0, len = this.predicates.length; i < len; i++) {
	    p = this.predicates[i](item, this.options);
	    if (!p || p.err !== undefined) {
	      return {stop: true, err: p.err};
	    }
	  }
	  return {stop: false, err: null};
	};
	
	/*
	 * _makeApiRequest - Send an item to Rollbar, callback when done, if there is an error make an
	 *   effort to retry if we are configured to do so.
	 *
	 * @param item - an item ready to send to the backend
	 * @param callback - function(err, response)
	 */
	Queue.prototype._makeApiRequest = function(item, callback) {
	  var rateLimitResponse = this.rateLimiter.shouldSend(item);
	  if (rateLimitResponse.shouldSend) {
	    this.api.postItem(item, function(err, resp) {
	      if (err) {
	        this._maybeRetry(err, item, callback);
	      } else {
	        callback(err, resp);
	      }
	    }.bind(this));
	  } else if (rateLimitResponse.error) {
	    callback(rateLimitResponse.error);
	  } else {
	    this.api.postItem(rateLimitResponse.payload, callback);
	  }
	};
	
	// These are errors basically mean there is no internet connection
	var RETRIABLE_ERRORS = ['ECONNRESET', 'ENOTFOUND', 'ESOCKETTIMEDOUT', 'ETIMEDOUT', 'ECONNREFUSED', 'EHOSTUNREACH', 'EPIPE', 'EAI_AGAIN'];
	
	/*
	 * _maybeRetry - Given the error returned by the API, decide if we should retry or just callback
	 *   with the error.
	 *
	 * @param err - an error returned by the API transport
	 * @param item - the item that was trying to be sent when this error occured
	 * @param callback - function(err, response)
	 */
	Queue.prototype._maybeRetry = function(err, item, callback) {
	  var shouldRetry = false;
	  if (this.options.retryInterval) {
	    for (var i = 0, len = RETRIABLE_ERRORS.length; i < len; i++) {
	      if (err.code === RETRIABLE_ERRORS[i]) {
	        shouldRetry = true;
	        break;
	      }
	    }
	  }
	  if (shouldRetry) {
	    this._retryApiRequest(item, callback);
	  } else {
	    callback(err);
	  }
	};
	
	/*
	 * _retryApiRequest - Add an item and a callback to a queue and possibly start a timer to process
	 *   that queue based on the retryInterval in the options for this queue.
	 *
	 * @param item - an item that failed to send due to an error we deem retriable
	 * @param callback - function(err, response)
	 */
	Queue.prototype._retryApiRequest = function(item, callback) {
	  this.retryQueue.push({item: item, callback: callback});
	
	  if (!this.retryHandle) {
	    this.retryHandle = setInterval(function() {
	      while (this.retryQueue.length) {
	        var retryObject = this.retryQueue.shift();
	        this._makeApiRequest(retryObject.item, retryObject.callback);
	      }
	    }.bind(this), this.options.retryInterval);
	  }
	};
	
	/*
	 * _dequeuePendingRequest - Removes the item from the pending request queue, this queue is used to
	 *   enable to functionality of providing a callback that clients can pass to `wait` to be notified
	 *   when the pending request queue has been emptied. This must be called when the API finishes
	 *   processing this item. If a `wait` callback is configured, it is called by this function.
	 *
	 * @param item - the item previously added to the pending request queue
	 */
	Queue.prototype._dequeuePendingRequest = function(item) {
	  var idx = this.pendingRequests.indexOf(item);
	  if (idx !== -1) {
	    this.pendingRequests.splice(idx, 1);
	    this._maybeCallWait();
	  }
	};
	
	Queue.prototype._maybeLog = function(data, originalError) {
	  if (this.logger && this.options.verbose) {
	    var message = originalError;
	    message = message || _.get(data, 'body.trace.exception.message');
	    message = message || _.get(data, 'body.trace_chain.0.exception.message');
	    if (message) {
	      this.logger.error(message);
	      return;
	    }
	    message = _.get(data, 'body.message.body');
	    if (message) {
	      this.logger.log(message);
	    }
	  }
	};
	
	Queue.prototype._maybeCallWait = function() {
	  if (_.isFunction(this.waitCallback) && this.pendingItems.length === 0 && this.pendingRequests.length === 0) {
	    if (this.waitIntervalID) {
	      this.waitIntervalID = clearInterval(this.waitIntervalID);
	    }
	    this.waitCallback();
	    return true;
	  }
	  return false;
	};
	
	module.exports = Queue;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var extend = __webpack_require__(7);
	
	var RollbarJSON = {};
	var __initRollbarJSON = false;
	function setupJSON() {
	  if (__initRollbarJSON) {
	    return;
	  }
	  __initRollbarJSON = true;
	
	  if (isDefined(JSON)) {
	    if (isNativeFunction(JSON.stringify)) {
	      RollbarJSON.stringify = JSON.stringify;
	    }
	    if (isNativeFunction(JSON.parse)) {
	      RollbarJSON.parse = JSON.parse;
	    }
	  }
	  if (!isFunction(RollbarJSON.stringify) || !isFunction(RollbarJSON.parse)) {
	    var setupCustomJSON = __webpack_require__(8);
	    setupCustomJSON(RollbarJSON);
	  }
	}
	setupJSON();
	
	/*
	 * isType - Given a Javascript value and a string, returns true if the type of the value matches the
	 * given string.
	 *
	 * @param x - any value
	 * @param t - a lowercase string containing one of the following type names:
	 *    - undefined
	 *    - null
	 *    - error
	 *    - number
	 *    - boolean
	 *    - string
	 *    - symbol
	 *    - function
	 *    - object
	 *    - array
	 * @returns true if x is of type t, otherwise false
	 */
	function isType(x, t) {
	  return t === typeName(x);
	}
	
	/*
	 * typeName - Given a Javascript value, returns the type of the object as a string
	 */
	function typeName(x) {
	  var name = typeof x;
	  if (name !== 'object') {
	    return name;
	  }
	  if (!x) {
	    return 'null';
	  }
	  if (x instanceof Error) {
	    return 'error';
	  }
	  return ({}).toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}
	
	/* isFunction - a convenience function for checking if a value is a function
	 *
	 * @param f - any value
	 * @returns true if f is a function, otherwise false
	 */
	function isFunction(f) {
	  return isType(f, 'function');
	}
	
	/* isNativeFunction - a convenience function for checking if a value is a native JS function
	 *
	 * @param f - any value
	 * @returns true if f is a native JS function, otherwise false
	 */
	function isNativeFunction(f) {
	  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	  var funcMatchString = Function.prototype.toString.call(Object.prototype.hasOwnProperty)
	    .replace(reRegExpChar, '\\$&')
	    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?');
	  var reIsNative = RegExp('^' + funcMatchString + '$');
	  return isObject(f) && reIsNative.test(f);
	}
	
	/* isObject - Checks if the argument is an object
	 *
	 * @param value - any value
	 * @returns true is value is an object function is an object)
	*/
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}
	
	/*
	 * isDefined - a convenience function for checking if a value is not equal to undefined
	 *
	 * @param u - any value
	 * @returns true if u is anything other than undefined
	 */
	function isDefined(u) {
	  return !isType(u, 'undefined');
	}
	
	/*
	 * isIterable - convenience function for checking if a value can be iterated, essentially
	 * whether it is an object or an array.
	 *
	 * @param i - any value
	 * @returns true if i is an object or an array as determined by `typeName`
	 */
	function isIterable(i) {
	  var type = typeName(i);
	  return (type === 'object' || type === 'array');
	}
	
	/*
	 * isError - convenience function for checking if a value is of an error type
	 *
	 * @param e - any value
	 * @returns true if e is an error
	 */
	function isError(e) {
	  return isType(e, 'error');
	}
	
	function traverse(obj, func, seen) {
	  var k, v, i;
	  var isObj = isType(obj, 'object');
	  var isArray = isType(obj, 'array');
	  var keys = [];
	
	  if (isObj && seen.indexOf(obj) !== -1) {
	    return obj;
	  }
	  seen.push(obj);
	
	  if (isObj) {
	    for (k in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, k)) {
	        keys.push(k);
	      }
	    }
	  } else if (isArray) {
	    for (i = 0; i < obj.length; ++i) {
	      keys.push(i);
	    }
	  }
	
	  for (i = 0; i < keys.length; ++i) {
	    k = keys[i];
	    v = obj[k];
	    obj[k] = func(k, v, seen);
	  }
	
	  return obj;
	}
	
	function redact() {
	  return '********';
	}
	
	// from http://stackoverflow.com/a/8809472/1138191
	function uuid4() {
	  var d = now();
	  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	  });
	  return uuid;
	}
	
	var LEVELS = {
	  debug: 0,
	  info: 1,
	  warning: 2,
	  error: 3,
	  critical: 4
	};
	
	function sanitizeUrl(url) {
	  var baseUrlParts = parseUri(url);
	  // remove a trailing # if there is no anchor
	  if (baseUrlParts.anchor === '') {
	    baseUrlParts.source = baseUrlParts.source.replace('#', '');
	  }
	
	  url = baseUrlParts.source.replace('?' + baseUrlParts.query, '');
	  return url;
	}
	
	var parseUriOptions = {
	  strictMode: false,
	  key: [
	    'source',
	    'protocol',
	    'authority',
	    'userInfo',
	    'user',
	    'password',
	    'host',
	    'port',
	    'relative',
	    'path',
	    'directory',
	    'file',
	    'query',
	    'anchor'
	  ],
	  q: {
	    name: 'queryKey',
	    parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	  },
	  parser: {
	    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
	    loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	  }
	};
	
	function parseUri(str) {
	  if (!isType(str, 'string')) {
	    throw new Error('received invalid input');
	  }
	
	  var o = parseUriOptions;
	  var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str);
	  var uri = {};
	  var i = o.key.length;
	
	  while (i--) {
	    uri[o.key[i]] = m[i] || '';
	  }
	
	  uri[o.q.name] = {};
	  uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
	    if ($1) {
	      uri[o.q.name][$1] = $2;
	    }
	  });
	
	  return uri;
	}
	
	function addParamsAndAccessTokenToPath(accessToken, options, params) {
	  params = params || {};
	  params.access_token = accessToken;
	  var paramsArray = [];
	  var k;
	  for (k in params) {
	    if (Object.prototype.hasOwnProperty.call(params, k)) {
	      paramsArray.push([k, params[k]].join('='));
	    }
	  }
	  var query = '?' + paramsArray.sort().join('&');
	
	  options = options || {};
	  options.path = options.path || '';
	  var qs = options.path.indexOf('?');
	  var h = options.path.indexOf('#');
	  var p;
	  if (qs !== -1 && (h === -1 || h > qs)) {
	    p = options.path;
	    options.path = p.substring(0,qs) + query + '&' + p.substring(qs+1);
	  } else {
	    if (h !== -1) {
	      p = options.path;
	      options.path = p.substring(0,h) + query + p.substring(h);
	    } else {
	      options.path = options.path + query;
	    }
	  }
	}
	
	function formatUrl(u, protocol) {
	  protocol = protocol || u.protocol;
	  if (!protocol && u.port) {
	    if (u.port === 80) {
	      protocol = 'http:';
	    } else if (u.port === 443) {
	      protocol = 'https:';
	    }
	  }
	  protocol = protocol || 'https:';
	
	  if (!u.hostname) {
	    return null;
	  }
	  var result = protocol + '//' + u.hostname;
	  if (u.port) {
	    result = result + ':' + u.port;
	  }
	  if (u.path) {
	    result = result + u.path;
	  }
	  return result;
	}
	
	function stringify(obj, backup) {
	  var value, error;
	  try {
	    value = RollbarJSON.stringify(obj);
	  } catch (jsonError) {
	    if (backup && isFunction(backup)) {
	      try {
	        value = backup(obj);
	      } catch (backupError) {
	        error = backupError;
	      }
	    } else {
	      error = jsonError;
	    }
	  }
	  return {error: error, value: value};
	}
	
	function jsonParse(s) {
	  var value, error;
	  try {
	    value = RollbarJSON.parse(s);
	  } catch (e) {
	    error = e;
	  }
	  return {error: error, value: value};
	}
	
	function makeUnhandledStackInfo(
	  message,
	  url,
	  lineno,
	  colno,
	  error,
	  mode,
	  backupMessage,
	  errorParser
	) {
	  var location = {
	    url: url || '',
	    line: lineno,
	    column: colno
	  };
	  location.func = errorParser.guessFunctionName(location.url, location.line);
	  location.context = errorParser.gatherContext(location.url, location.line);
	  var href = document && document.location && document.location.href;
	  var useragent = window && window.navigator && window.navigator.userAgent;
	  return {
	    'mode': mode,
	    'message': error ? String(error) : (message || backupMessage),
	    'url': href,
	    'stack': [location],
	    'useragent': useragent
	  };
	}
	
	function wrapCallback(logger, f) {
	  return function(err, resp) {
	    try {
	      f(err, resp);
	    } catch (e) {
	      logger.error(e);
	    }
	  };
	}
	
	function createItem(args, logger, notifier, requestKeys, lambdaContext) {
	  var message, err, custom, callback, request;
	  var arg;
	  var extraArgs = [];
	
	  for (var i = 0, l = args.length; i < l; ++i) {
	    arg = args[i];
	
	    var typ = typeName(arg);
	    switch (typ) {
	      case 'undefined':
	        break;
	      case 'string':
	        message ? extraArgs.push(arg) : message = arg;
	        break;
	      case 'function':
	        callback = wrapCallback(logger, arg);
	        break;
	      case 'date':
	        extraArgs.push(arg);
	        break;
	      case 'error':
	      case 'domexception':
	        err ? extraArgs.push(arg) : err = arg;
	        break;
	      case 'object':
	      case 'array':
	        if (arg instanceof Error || (typeof DOMException !== 'undefined' && arg instanceof DOMException)) {
	          err ? extraArgs.push(arg) : err = arg;
	          break;
	        }
	        if (requestKeys && typ === 'object' && !request) {
	          for (var j = 0, len = requestKeys.length; j < len; ++j) {
	            if (arg[requestKeys[j]] !== undefined) {
	              request = arg;
	              break;
	            }
	          }
	          if (request) {
	            break;
	          }
	        }
	        custom ? extraArgs.push(arg) : custom = arg;
	        break;
	      default:
	        if (arg instanceof Error || (typeof DOMException !== 'undefined' && arg instanceof DOMException)) {
	          err ? extraArgs.push(arg) : err = arg;
	          break;
	        }
	        extraArgs.push(arg);
	    }
	  }
	
	  if (extraArgs.length > 0) {
	    // if custom is an array this turns it into an object with integer keys
	    custom = extend(true, {}, custom);
	    custom.extraArgs = extraArgs;
	  }
	
	  var item = {
	    message: message,
	    err: err,
	    custom: custom,
	    timestamp: now(),
	    callback: callback,
	    uuid: uuid4()
	  };
	  if (custom && custom.level !== undefined) {
	    item.level = custom.level;
	    delete custom.level;
	  }
	  if (requestKeys && request) {
	    item.request = request;
	  }
	  if (lambdaContext) {
	    item.lambdaContext = lambdaContext;
	  }
	  item._originalArgs = args;
	  return item;
	}
	
	/*
	 * get - given an obj/array and a keypath, return the value at that keypath or
	 *       undefined if not possible.
	 *
	 * @param obj - an object or array
	 * @param path - a string of keys separated by '.' such as 'plugin.jquery.0.message'
	 *    which would correspond to 42 in `{plugin: {jquery: [{message: 42}]}}`
	 */
	function get(obj, path) {
	  if (!obj) {
	    return undefined;
	  }
	  var keys = path.split('.');
	  var result = obj;
	  try {
	    for (var i = 0, len = keys.length; i < len; ++i) {
	      result = result[keys[i]];
	    }
	  } catch (e) {
	    result = undefined;
	  }
	  return result;
	}
	
	function set(obj, path, value) {
	  if (!obj) {
	    return;
	  }
	  var keys = path.split('.');
	  var len = keys.length;
	  if (len < 1) {
	    return;
	  }
	  if (len === 1) {
	    obj[keys[0]] = value;
	    return;
	  }
	  try {
	    var temp = obj[keys[0]] || {};
	    var replacement = temp;
	    for (var i = 1; i < len-1; i++) {
	      temp[keys[i]] = temp[keys[i]] || {};
	      temp = temp[keys[i]];
	    }
	    temp[keys[len-1]] = value;
	    obj[keys[0]] = replacement;
	  } catch (e) {
	    return;
	  }
	}
	
	function scrub(data, scrubFields) {
	  scrubFields = scrubFields || [];
	  var paramRes = _getScrubFieldRegexs(scrubFields);
	  var queryRes = _getScrubQueryParamRegexs(scrubFields);
	
	  function redactQueryParam(dummy0, paramPart, dummy1, dummy2, dummy3, valPart) {
	    return paramPart + redact(valPart);
	  }
	
	  function paramScrubber(v) {
	    var i;
	    if (isType(v, 'string')) {
	      for (i = 0; i < queryRes.length; ++i) {
	        v = v.replace(queryRes[i], redactQueryParam);
	      }
	    }
	    return v;
	  }
	
	  function valScrubber(k, v) {
	    var i;
	    for (i = 0; i < paramRes.length; ++i) {
	      if (paramRes[i].test(k)) {
	        v = redact(v);
	        break;
	      }
	    }
	    return v;
	  }
	
	  function scrubber(k, v, seen) {
	    var tmpV = valScrubber(k, v);
	    if (tmpV === v) {
	      if (isType(v, 'object') || isType(v, 'array')) {
	        return traverse(v, scrubber, seen);
	      }
	      return paramScrubber(tmpV);
	    } else {
	      return tmpV;
	    }
	  }
	
	  traverse(data, scrubber, []);
	  return data;
	}
	
	function _getScrubFieldRegexs(scrubFields) {
	  var ret = [];
	  var pat;
	  for (var i = 0; i < scrubFields.length; ++i) {
	    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
	    ret.push(new RegExp(pat, 'i'));
	  }
	  return ret;
	}
	
	
	function _getScrubQueryParamRegexs(scrubFields) {
	  var ret = [];
	  var pat;
	  for (var i = 0; i < scrubFields.length; ++i) {
	    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
	    ret.push(new RegExp('(' + pat + '=)([^&\\n]+)', 'igm'));
	  }
	  return ret;
	}
	
	function formatArgsAsString(args) {
	  var i, len, arg;
	  var result = [];
	  for (i = 0, len = args.length; i < len; i++) {
	    arg = args[i];
	    if (typeof arg === 'object') {
	      arg = stringify(arg);
	      arg = arg.error || arg.value;
	      if (arg.length > 500)
	        arg = arg.substr(0,500)+'...';
	    } else if (typeof arg === 'undefined') {
	      arg = 'undefined';
	    }
	    result.push(arg);
	  }
	  return result.join(' ');
	}
	
	function now() {
	  if (Date.now) {
	    return +Date.now();
	  }
	  return +new Date();
	}
	
	module.exports = {
	  isType: isType,
	  typeName: typeName,
	  isFunction: isFunction,
	  isNativeFunction: isNativeFunction,
	  isIterable: isIterable,
	  isError: isError,
	  extend: extend,
	  traverse: traverse,
	  redact: redact,
	  uuid4: uuid4,
	  LEVELS: LEVELS,
	  sanitizeUrl: sanitizeUrl,
	  addParamsAndAccessTokenToPath: addParamsAndAccessTokenToPath,
	  formatUrl: formatUrl,
	  stringify: stringify,
	  jsonParse: jsonParse,
	  makeUnhandledStackInfo: makeUnhandledStackInfo,
	  createItem: createItem,
	  get: get,
	  set: set,
	  scrub: scrub,
	  formatArgsAsString: formatArgsAsString,
	  now: now
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	
	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}
	
		return toStr.call(arr) === '[object Array]';
	};
	
	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}
	
		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}
	
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}
	
		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};
	
	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}
	
		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];
	
					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}
	
							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);
	
						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	//  json3.js
	//  2017-02-21
	//  Public Domain.
	//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	//  See http://www.JSON.org/js.html
	//  This code should be minified before deployment.
	//  See http://javascript.crockford.com/jsmin.html
	
	//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	//  NOT CONTROL.
	
	//  This file creates a global JSON object containing two methods: stringify
	//  and parse. This file provides the ES5 JSON capability to ES3 systems.
	//  If a project might run on IE8 or earlier, then this file should be included.
	//  This file does nothing on ES5 systems.
	
	//      JSON.stringify(value, replacer, space)
	//          value       any JavaScript value, usually an object or array.
	//          replacer    an optional parameter that determines how object
	//                      values are stringified for objects. It can be a
	//                      function or an array of strings.
	//          space       an optional parameter that specifies the indentation
	//                      of nested structures. If it is omitted, the text will
	//                      be packed without extra whitespace. If it is a number,
	//                      it will specify the number of spaces to indent at each
	//                      level. If it is a string (such as "\t" or "&nbsp;"),
	//                      it contains the characters used to indent at each level.
	//          This method produces a JSON text from a JavaScript value.
	//          When an object value is found, if the object contains a toJSON
	//          method, its toJSON method will be called and the result will be
	//          stringified. A toJSON method does not serialize: it returns the
	//          value represented by the name/value pair that should be serialized,
	//          or undefined if nothing should be serialized. The toJSON method
	//          will be passed the key associated with the value, and this will be
	//          bound to the value.
	
	//          For example, this would serialize Dates as ISO strings.
	
	//              Date.prototype.toJSON = function (key) {
	//                  function f(n) {
	//                      // Format integers to have at least two digits.
	//                      return (n < 10)
	//                          ? "0" + n
	//                          : n;
	//                  }
	//                  return this.getUTCFullYear()   + "-" +
	//                       f(this.getUTCMonth() + 1) + "-" +
	//                       f(this.getUTCDate())      + "T" +
	//                       f(this.getUTCHours())     + ":" +
	//                       f(this.getUTCMinutes())   + ":" +
	//                       f(this.getUTCSeconds())   + "Z";
	//              };
	
	//          You can provide an optional replacer method. It will be passed the
	//          key and value of each member, with this bound to the containing
	//          object. The value that is returned from your method will be
	//          serialized. If your method returns undefined, then the member will
	//          be excluded from the serialization.
	
	//          If the replacer parameter is an array of strings, then it will be
	//          used to select the members to be serialized. It filters the results
	//          such that only members with keys listed in the replacer array are
	//          stringified.
	
	//          Values that do not have JSON representations, such as undefined or
	//          functions, will not be serialized. Such values in objects will be
	//          dropped; in arrays they will be replaced with null. You can use
	//          a replacer function to replace those with JSON values.
	
	//          JSON.stringify(undefined) returns undefined.
	
	//          The optional space parameter produces a stringification of the
	//          value that is filled with line breaks and indentation to make it
	//          easier to read.
	
	//          If the space parameter is a non-empty string, then that string will
	//          be used for indentation. If the space parameter is a number, then
	//          the indentation will be that many spaces.
	
	//          Example:
	
	//          text = JSON.stringify(["e", {pluribus: "unum"}]);
	//          // text is '["e",{"pluribus":"unum"}]'
	
	//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
	//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
	
	//          text = JSON.stringify([new Date()], function (key, value) {
	//              return this[key] instanceof Date
	//                  ? "Date(" + this[key] + ")"
	//                  : value;
	//          });
	//          // text is '["Date(---current time---)"]'
	
	//      JSON.parse(text, reviver)
	//          This method parses a JSON text to produce an object or array.
	//          It can throw a SyntaxError exception.
	//          This has been modified to use JSON-js/json_parse_state.js as the
	//          parser instead of the one built around eval found in JSON-js/json2.js
	
	//          The optional reviver parameter is a function that can filter and
	//          transform the results. It receives each of the keys and values,
	//          and its return value is used instead of the original value.
	//          If it returns what it received, then the structure is not modified.
	//          If it returns undefined then the member is deleted.
	
	//          Example:
	
	//          // Parse the text. Values that look like ISO date strings will
	//          // be converted to Date objects.
	
	//          myData = JSON.parse(text, function (key, value) {
	//              var a;
	//              if (typeof value === "string") {
	//                  a =
	//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	//                  if (a) {
	//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	//                          +a[5], +a[6]));
	//                  }
	//              }
	//              return value;
	//          });
	
	//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	//              var d;
	//              if (typeof value === "string" &&
	//                      value.slice(0, 5) === "Date(" &&
	//                      value.slice(-1) === ")") {
	//                  d = new Date(value.slice(5, -1));
	//                  if (d) {
	//                      return d;
	//                  }
	//              }
	//              return value;
	//          });
	
	//  This is a reference implementation. You are free to copy, modify, or
	//  redistribute.
	
	/*jslint
	  for, this
	  */
	
	/*property
	  JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	  getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	  lastIndex, length, parse, prototype, push, replace, slice, stringify,
	  test, toJSON, toString, valueOf
	  */
	
	var setupCustomJSON = function(JSON) {
	
	  var rx_one = /^[\],:{}\s]*$/;
	  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
	  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
	  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
	  var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	
	  function f(n) {
	    // Format integers to have at least two digits.
	    return n < 10
	      ? "0" + n
	      : n;
	  }
	
	  function this_value() {
	    return this.valueOf();
	  }
	
	  if (typeof Date.prototype.toJSON !== "function") {
	
	    Date.prototype.toJSON = function () {
	
	      return isFinite(this.valueOf())
	        ? this.getUTCFullYear() + "-" +
	        f(this.getUTCMonth() + 1) + "-" +
	        f(this.getUTCDate()) + "T" +
	        f(this.getUTCHours()) + ":" +
	        f(this.getUTCMinutes()) + ":" +
	        f(this.getUTCSeconds()) + "Z"
	        : null;
	    };
	
	    Boolean.prototype.toJSON = this_value;
	    Number.prototype.toJSON = this_value;
	    String.prototype.toJSON = this_value;
	  }
	
	  var gap;
	  var indent;
	  var meta;
	  var rep;
	
	
	  function quote(string) {
	
	    // If the string contains no control characters, no quote characters, and no
	    // backslash characters, then we can safely slap some quotes around it.
	    // Otherwise we must also replace the offending characters with safe escape
	    // sequences.
	
	    rx_escapable.lastIndex = 0;
	    return rx_escapable.test(string)
	      ? "\"" + string.replace(rx_escapable, function (a) {
	        var c = meta[a];
	        return typeof c === "string"
	          ? c
	          : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
	      }) + "\""
	    : "\"" + string + "\"";
	  }
	
	
	  function str(key, holder) {
	
	    // Produce a string from holder[key].
	
	    var i;          // The loop counter.
	    var k;          // The member key.
	    var v;          // The member value.
	    var length;
	    var mind = gap;
	    var partial;
	    var value = holder[key];
	
	    // If the value has a toJSON method, call it to obtain a replacement value.
	
	    if (value && typeof value === "object" &&
	        typeof value.toJSON === "function") {
	      value = value.toJSON(key);
	    }
	
	    // If we were called with a replacer function, then call the replacer to
	    // obtain a replacement value.
	
	    if (typeof rep === "function") {
	      value = rep.call(holder, key, value);
	    }
	
	    // What happens next depends on the value's type.
	
	    switch (typeof value) {
	      case "string":
	        return quote(value);
	
	      case "number":
	
	        // JSON numbers must be finite. Encode non-finite numbers as null.
	
	        return isFinite(value)
	          ? String(value)
	          : "null";
	
	      case "boolean":
	      case "null":
	
	        // If the value is a boolean or null, convert it to a string. Note:
	        // typeof null does not produce "null". The case is included here in
	        // the remote chance that this gets fixed someday.
	
	        return String(value);
	
	        // If the type is "object", we might be dealing with an object or an array or
	        // null.
	
	      case "object":
	
	        // Due to a specification blunder in ECMAScript, typeof null is "object",
	        // so watch out for that case.
	
	        if (!value) {
	          return "null";
	        }
	
	        // Make an array to hold the partial results of stringifying this object value.
	
	        gap += indent;
	        partial = [];
	
	        // Is the value an array?
	
	        if (Object.prototype.toString.apply(value) === "[object Array]") {
	
	          // The value is an array. Stringify every element. Use null as a placeholder
	          // for non-JSON values.
	
	          length = value.length;
	          for (i = 0; i < length; i += 1) {
	            partial[i] = str(i, value) || "null";
	          }
	
	          // Join all of the elements together, separated with commas, and wrap them in
	          // brackets.
	
	          v = partial.length === 0
	            ? "[]"
	            : gap
	            ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
	            : "[" + partial.join(",") + "]";
	          gap = mind;
	          return v;
	        }
	
	        // If the replacer is an array, use it to select the members to be stringified.
	
	        if (rep && typeof rep === "object") {
	          length = rep.length;
	          for (i = 0; i < length; i += 1) {
	            if (typeof rep[i] === "string") {
	              k = rep[i];
	              v = str(k, value);
	              if (v) {
	                partial.push(quote(k) + (
	                      gap
	                      ? ": "
	                      : ":"
	                      ) + v);
	              }
	            }
	          }
	        } else {
	
	          // Otherwise, iterate through all of the keys in the object.
	
	          for (k in value) {
	            if (Object.prototype.hasOwnProperty.call(value, k)) {
	              v = str(k, value);
	              if (v) {
	                partial.push(quote(k) + (
	                      gap
	                      ? ": "
	                      : ":"
	                      ) + v);
	              }
	            }
	          }
	        }
	
	        // Join all of the member texts together, separated with commas,
	        // and wrap them in braces.
	
	        v = partial.length === 0
	          ? "{}"
	          : gap
	          ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
	          : "{" + partial.join(",") + "}";
	        gap = mind;
	        return v;
	    }
	  }
	
	  // If the JSON object does not yet have a stringify method, give it one.
	
	  if (typeof JSON.stringify !== "function") {
	    meta = {    // table of character substitutions
	      "\b": "\\b",
	      "\t": "\\t",
	      "\n": "\\n",
	      "\f": "\\f",
	      "\r": "\\r",
	      "\"": "\\\"",
	      "\\": "\\\\"
	    };
	    JSON.stringify = function (value, replacer, space) {
	
	      // The stringify method takes a value and an optional replacer, and an optional
	      // space parameter, and returns a JSON text. The replacer can be a function
	      // that can replace values, or an array of strings that will select the keys.
	      // A default replacer method can be provided. Use of the space parameter can
	      // produce text that is more easily readable.
	
	      var i;
	      gap = "";
	      indent = "";
	
	      // If the space parameter is a number, make an indent string containing that
	      // many spaces.
	
	      if (typeof space === "number") {
	        for (i = 0; i < space; i += 1) {
	          indent += " ";
	        }
	
	        // If the space parameter is a string, it will be used as the indent string.
	
	      } else if (typeof space === "string") {
	        indent = space;
	      }
	
	      // If there is a replacer, it must be a function or an array.
	      // Otherwise, throw an error.
	
	      rep = replacer;
	      if (replacer && typeof replacer !== "function" &&
	          (typeof replacer !== "object" ||
	           typeof replacer.length !== "number")) {
	        throw new Error("JSON.stringify");
	      }
	
	      // Make a fake root object containing our value under the key of "".
	      // Return the result of stringifying the value.
	
	      return str("", {"": value});
	    };
	  }
	
	
	  // If the JSON object does not yet have a parse method, give it one.
	
	  if (typeof JSON.parse !== "function") {
	    JSON.parse = (function () {
	
	      // This function creates a JSON parse function that uses a state machine rather
	      // than the dangerous eval function to parse a JSON text.
	
	      var state;      // The state of the parser, one of
	      // 'go'         The starting state
	      // 'ok'         The final, accepting state
	      // 'firstokey'  Ready for the first key of the object or
	      //              the closing of an empty object
	      // 'okey'       Ready for the next key of the object
	      // 'colon'      Ready for the colon
	      // 'ovalue'     Ready for the value half of a key/value pair
	      // 'ocomma'     Ready for a comma or closing }
	      // 'firstavalue' Ready for the first value of an array or
	      //              an empty array
	      // 'avalue'     Ready for the next value of an array
	      // 'acomma'     Ready for a comma or closing ]
	      var stack;      // The stack, for controlling nesting.
	      var container;  // The current container object or array
	      var key;        // The current key
	      var value;      // The current value
	      var escapes = { // Escapement translation table
	        "\\": "\\",
	        "\"": "\"",
	        "/": "/",
	        "t": "\t",
	        "n": "\n",
	        "r": "\r",
	        "f": "\f",
	        "b": "\b"
	      };
	      var string = {   // The actions for string tokens
	        go: function () {
	          state = "ok";
	        },
	        firstokey: function () {
	          key = value;
	          state = "colon";
	        },
	        okey: function () {
	          key = value;
	          state = "colon";
	        },
	        ovalue: function () {
	          state = "ocomma";
	        },
	        firstavalue: function () {
	          state = "acomma";
	        },
	        avalue: function () {
	          state = "acomma";
	        }
	      };
	      var number = {   // The actions for number tokens
	        go: function () {
	          state = "ok";
	        },
	        ovalue: function () {
	          state = "ocomma";
	        },
	        firstavalue: function () {
	          state = "acomma";
	        },
	        avalue: function () {
	          state = "acomma";
	        }
	      };
	      var action = {
	
	        // The action table describes the behavior of the machine. It contains an
	        // object for each token. Each object contains a method that is called when
	        // a token is matched in a state. An object will lack a method for illegal
	        // states.
	
	        "{": {
	          go: function () {
	            stack.push({state: "ok"});
	            container = {};
	            state = "firstokey";
	          },
	          ovalue: function () {
	            stack.push({container: container, state: "ocomma", key: key});
	            container = {};
	            state = "firstokey";
	          },
	          firstavalue: function () {
	            stack.push({container: container, state: "acomma"});
	            container = {};
	            state = "firstokey";
	          },
	          avalue: function () {
	            stack.push({container: container, state: "acomma"});
	            container = {};
	            state = "firstokey";
	          }
	        },
	        "}": {
	          firstokey: function () {
	            var pop = stack.pop();
	            value = container;
	            container = pop.container;
	            key = pop.key;
	            state = pop.state;
	          },
	          ocomma: function () {
	            var pop = stack.pop();
	            container[key] = value;
	            value = container;
	            container = pop.container;
	            key = pop.key;
	            state = pop.state;
	          }
	        },
	        "[": {
	          go: function () {
	            stack.push({state: "ok"});
	            container = [];
	            state = "firstavalue";
	          },
	          ovalue: function () {
	            stack.push({container: container, state: "ocomma", key: key});
	            container = [];
	            state = "firstavalue";
	          },
	          firstavalue: function () {
	            stack.push({container: container, state: "acomma"});
	            container = [];
	            state = "firstavalue";
	          },
	          avalue: function () {
	            stack.push({container: container, state: "acomma"});
	            container = [];
	            state = "firstavalue";
	          }
	        },
	        "]": {
	          firstavalue: function () {
	            var pop = stack.pop();
	            value = container;
	            container = pop.container;
	            key = pop.key;
	            state = pop.state;
	          },
	          acomma: function () {
	            var pop = stack.pop();
	            container.push(value);
	            value = container;
	            container = pop.container;
	            key = pop.key;
	            state = pop.state;
	          }
	        },
	        ":": {
	          colon: function () {
	            if (Object.hasOwnProperty.call(container, key)) {
	              throw new SyntaxError("Duplicate key '" + key + "\"");
	            }
	            state = "ovalue";
	          }
	        },
	        ",": {
	          ocomma: function () {
	            container[key] = value;
	            state = "okey";
	          },
	          acomma: function () {
	            container.push(value);
	            state = "avalue";
	          }
	        },
	        "true": {
	          go: function () {
	            value = true;
	            state = "ok";
	          },
	          ovalue: function () {
	            value = true;
	            state = "ocomma";
	          },
	          firstavalue: function () {
	            value = true;
	            state = "acomma";
	          },
	          avalue: function () {
	            value = true;
	            state = "acomma";
	          }
	        },
	        "false": {
	          go: function () {
	            value = false;
	            state = "ok";
	          },
	          ovalue: function () {
	            value = false;
	            state = "ocomma";
	          },
	          firstavalue: function () {
	            value = false;
	            state = "acomma";
	          },
	          avalue: function () {
	            value = false;
	            state = "acomma";
	          }
	        },
	        "null": {
	          go: function () {
	            value = null;
	            state = "ok";
	          },
	          ovalue: function () {
	            value = null;
	            state = "ocomma";
	          },
	          firstavalue: function () {
	            value = null;
	            state = "acomma";
	          },
	          avalue: function () {
	            value = null;
	            state = "acomma";
	          }
	        }
	      };
	
	      function debackslashify(text) {
	
	        // Remove and replace any backslash escapement.
	
	        return text.replace(/\\(?:u(.{4})|([^u]))/g, function (ignore, b, c) {
	          return b
	            ? String.fromCharCode(parseInt(b, 16))
	            : escapes[c];
	        });
	      }
	
	      return function (source, reviver) {
	
	        // A regular expression is used to extract tokens from the JSON text.
	        // The extraction process is cautious.
	
	        var result;
	        var tx = /^[\u0020\t\n\r]*(?:([,:\[\]{}]|true|false|null)|(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|"((?:[^\r\n\t\\\"]|\\(?:["\\\/trnfb]|u[0-9a-fA-F]{4}))*)")/;
	
	        // Set the starting state.
	
	        state = "go";
	
	        // The stack records the container, key, and state for each object or array
	        // that contains another object or array while processing nested structures.
	
	        stack = [];
	
	        // If any error occurs, we will catch it and ultimately throw a syntax error.
	
	        try {
	
	          // For each token...
	
	          while (true) {
	            result = tx.exec(source);
	            if (!result) {
	              break;
	            }
	
	            // result is the result array from matching the tokenizing regular expression.
	            //  result[0] contains everything that matched, including any initial whitespace.
	            //  result[1] contains any punctuation that was matched, or true, false, or null.
	            //  result[2] contains a matched number, still in string form.
	            //  result[3] contains a matched string, without quotes but with escapement.
	
	            if (result[1]) {
	
	              // Token: Execute the action for this state and token.
	
	              action[result[1]][state]();
	
	            } else if (result[2]) {
	
	              // Number token: Convert the number string into a number value and execute
	              // the action for this state and number.
	
	              value = +result[2];
	              number[state]();
	            } else {
	
	              // String token: Replace the escapement sequences and execute the action for
	              // this state and string.
	
	              value = debackslashify(result[3]);
	              string[state]();
	            }
	
	            // Remove the token from the string. The loop will continue as long as there
	            // are tokens. This is a slow process, but it allows the use of ^ matching,
	            // which assures that no illegal tokens slip through.
	
	            source = source.slice(result[0].length);
	          }
	
	          // If we find a state/token combination that is illegal, then the action will
	          // cause an error. We handle the error by simply changing the state.
	
	        } catch (e) {
	          state = e;
	        }
	
	        // The parsing is finished. If we are not in the final "ok" state, or if the
	        // remaining source contains anything except whitespace, then we did not have
	        //a well-formed JSON text.
	
	        if (state !== "ok" || (/[^\u0020\t\n\r]/.test(source))) {
	          throw (state instanceof SyntaxError)
	            ? state
	            : new SyntaxError("JSON");
	        }
	
	        // If there is a reviver function, we recursively walk the new structure,
	        // passing each name/value pair to the reviver function for possible
	        // transformation, starting with a temporary root object that holds the current
	        // value in an empty key. If there is not a reviver function, we simply return
	        // that value.
	
	        return (typeof reviver === "function")
	          ? (function walk(holder, key) {
	            var k;
	            var v;
	            var val = holder[key];
	            if (val && typeof val === "object") {
	              for (k in value) {
	                if (Object.prototype.hasOwnProperty.call(val, k)) {
	                  v = walk(val, k);
	                  if (v !== undefined) {
	                    val[k] = v;
	                  } else {
	                    delete val[k];
	                  }
	                }
	              }
	            }
	            return reviver.call(holder, key, val);
	          }({"": value}, ""))
	        : value;
	      };
	    }());
	  }
	}
	
	module.exports = setupCustomJSON;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	
	/*
	 * Notifier - the internal object responsible for delegating between the client exposed API, the
	 * chain of transforms necessary to turn an item into something that can be sent to Rollbar, and the
	 * queue which handles the communcation with the Rollbar API servers.
	 *
	 * @param queue - an object that conforms to the interface: addItem(item, callback)
	 * @param options - an object representing the options to be set for this notifier, this should have
	 * any defaults already set by the caller
	 */
	function Notifier(queue, options) {
	  this.queue = queue;
	  this.options = options;
	  this.transforms = [];
	}
	
	/*
	 * configure - updates the options for this notifier with the passed in object
	 *
	 * @param options - an object which gets merged with the current options set on this notifier
	 * @returns this
	 */
	Notifier.prototype.configure = function(options) {
	  this.queue && this.queue.configure(options);
	  var oldOptions = this.options;
	  this.options = _.extend(true, {}, oldOptions, options);
	  return this;
	};
	
	/*
	 * addTransform - adds a transform onto the end of the queue of transforms for this notifier
	 *
	 * @param transform - a function which takes three arguments:
	 *    * item: An Object representing the data to eventually be sent to Rollbar
	 *    * options: The current value of the options for this notifier
	 *    * callback: function(err: (Null|Error), item: (Null|Object)) the transform must call this
	 *    callback with a null value for error if it wants the processing chain to continue, otherwise
	 *    with an error to terminate the processing. The item should be the updated item after this
	 *    transform is finished modifying it.
	 */
	Notifier.prototype.addTransform = function(transform) {
	  if (_.isFunction(transform)) {
	    this.transforms.push(transform);
	  }
	  return this;
	};
	
	/*
	 * log - the internal log function which applies the configured transforms and then pushes onto the
	 * queue to be sent to the backend.
	 *
	 * @param item - An object with the following structure:
	 *    message [String] - An optional string to be sent to rollbar
	 *    error [Error] - An optional error
	 *
	 * @param callback - A function of type function(err, resp) which will be called with exactly one
	 * null argument and one non-null argument. The callback will be called once, either during the
	 * transform stage if an error occurs inside a transform, or in response to the communication with
	 * the backend. The second argument will be the response from the backend in case of success.
	 */
	Notifier.prototype.log = function(item, callback) {
	  if (!callback || !_.isFunction(callback)) {
	    callback = function() {};
	  }
	
	  if (!this.options.enabled) {
	    return callback(new Error('Rollbar is not enabled'));
	  }
	
	  this.queue.addPendingItem(item);
	  var originalError = item.err;
	  this._applyTransforms(item, function(err, i) {
	    if (err) {
	      this.queue.removePendingItem(item);
	      return callback(err, null);
	    }
	    this.queue.addItem(i, callback, originalError, item);
	  }.bind(this));
	};
	
	/* Internal */
	
	/*
	 * _applyTransforms - Applies the transforms that have been added to this notifier sequentially. See
	 * `addTransform` for more information.
	 *
	 * @param item - An item to be transformed
	 * @param callback - A function of type function(err, item) which will be called with a non-null
	 * error and a null item in the case of a transform failure, or a null error and non-null item after
	 * all transforms have been applied.
	 */
	Notifier.prototype._applyTransforms = function(item, callback) {
	  var transformIndex = -1;
	  var transformsLength = this.transforms.length;
	  var transforms = this.transforms;
	  var options = this.options;
	
	  var cb = function(err, i) {
	    if (err) {
	      callback(err, null);
	      return;
	    }
	
	    transformIndex++;
	
	    if (transformIndex === transformsLength) {
	      callback(null, i);
	      return;
	    }
	
	    transforms[transformIndex](i, options, cb);
	  };
	
	  cb(null, item);
	};
	
	module.exports = Notifier;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	
	var MAX_EVENTS = 100;
	
	function Telemeter(options) {
	  this.queue = [];
	  this.options = _.extend(true, {}, options);
	  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
	  this.maxQueueSize = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
	}
	
	Telemeter.prototype.configure = function(options) {
	  this.options = _.extend(true, {}, options);
	  var maxTelemetryEvents = this.options.maxTelemetryEvents || MAX_EVENTS;
	  var newMaxEvents = Math.max(0, Math.min(maxTelemetryEvents, MAX_EVENTS));
	  var deleteCount = 0;
	  if (this.maxQueueSize > newMaxEvents) {
	    deleteCount = this.maxQueueSize - newMaxEvents;
	  }
	  this.maxQueueSize = newMaxEvents;
	  this.queue.splice(0, deleteCount);
	};
	
	Telemeter.prototype.copyEvents = function() {
	  return Array.prototype.slice.call(this.queue, 0);
	};
	
	Telemeter.prototype.capture = function(type, metadata, level, rollbarUUID, timestamp) {
	  var e = {
	    level: getLevel(type, level),
	    type: type,
	    timestamp_ms: timestamp || _.now(),
	    body: metadata,
	    source: 'client'
	  };
	  if (rollbarUUID) {
	    e.uuid = rollbarUUID;
	  }
	  this.push(e);
	  return e;
	};
	
	Telemeter.prototype.captureEvent = function(metadata, level, rollbarUUID) {
	  return this.capture('manual', metadata, level, rollbarUUID);
	};
	
	Telemeter.prototype.captureError = function(err, level, rollbarUUID, timestamp) {
	  var metadata = {
	    message: err.message || String(err)
	  };
	  if (err.stack) {
	    metadata.stack = err.stack;
	  }
	  return this.capture('error', metadata, level, rollbarUUID, timestamp);
	};
	
	Telemeter.prototype.captureLog = function(message, level, rollbarUUID, timestamp) {
	  return this.capture('log', {
	    message: message
	  }, level, rollbarUUID, timestamp);
	};
	
	Telemeter.prototype.captureNetwork = function(metadata, subtype, rollbarUUID) {
	  subtype = subtype || 'xhr';
	  metadata.subtype = metadata.subtype || subtype;
	  var level = this.levelFromStatus(metadata.status_code);
	  return this.capture('network', metadata, level, rollbarUUID);
	};
	
	Telemeter.prototype.levelFromStatus = function(statusCode) {
	  if (statusCode >= 200 && statusCode < 400) {
	    return 'info';
	  }
	  if (statusCode === 0 || statusCode >= 400) {
	    return 'error';
	  }
	  return 'info';
	};
	
	Telemeter.prototype.captureDom = function(subtype, element, value, checked, rollbarUUID) {
	  var metadata = {
	    subtype: subtype,
	    element: element
	  };
	  if (value !== undefined) {
	    metadata.value = value;
	  }
	  if (checked !== undefined) {
	    metadata.checked = checked;
	  }
	  return this.capture('dom', metadata, 'info', rollbarUUID);
	};
	
	Telemeter.prototype.captureNavigation = function(from, to, rollbarUUID) {
	  return this.capture('navigation', {from: from, to: to}, 'info', rollbarUUID);
	};
	
	Telemeter.prototype.captureDomContentLoaded = function(ts) {
	  return this.capture('navigation', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
	  /**
	   * If we decide to make this a dom event instead, then use the line below:
	  return this.capture('dom', {subtype: 'DOMContentLoaded'}, 'info', undefined, ts && ts.getTime());
	  */
	};
	Telemeter.prototype.captureLoad = function(ts) {
	  return this.capture('navigation', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
	  /**
	   * If we decide to make this a dom event instead, then use the line below:
	  return this.capture('dom', {subtype: 'load'}, 'info', undefined, ts && ts.getTime());
	  */
	};
	
	Telemeter.prototype.captureConnectivityChange = function(type, rollbarUUID) {
	  return this.captureNetwork({change: type}, 'connectivity', rollbarUUID);
	};
	
	// Only intended to be used internally by the notifier
	Telemeter.prototype._captureRollbarItem = function(item) {
	  if (item.err) {
	    return this.captureError(item.err, item.level, item.uuid, item.timestamp);
	  }
	  if (item.message) {
	    return this.captureLog(item.message, item.level, item.uuid, item.timestamp);
	  }
	  if (item.custom) {
	    return this.capture('log', item.custom, item.level, item.uuid, item.timestamp);
	  }
	};
	
	Telemeter.prototype.push = function(e) {
	  this.queue.push(e);
	  if (this.queue.length > this.maxQueueSize) {
	    this.queue.shift();
	  }
	};
	
	function getLevel(type, level) {
	  if (level) {
	    return level;
	  }
	  var defaultLevel = {
	    error: 'error',
	    manual: 'info'
	  };
	  return defaultLevel[type] || 'info';
	}
	
	module.exports = Telemeter;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	var helpers = __webpack_require__(12);
	
	var defaultOptions = {
	  hostname: 'api.rollbar.com',
	  path: '/api/1',
	  search: null,
	  version: '1',
	  protocol: 'https:',
	  port: 443
	};
	
	/**
	 * Api is an object that encapsulates methods of communicating with
	 * the Rollbar API.  It is a standard interface with some parts implemented
	 * differently for server or browser contexts.  It is an object that should
	 * be instantiated when used so it can contain non-global options that may
	 * be different for another instance of RollbarApi.
	 *
	 * @param options {
	 *    accessToken: the accessToken to use for posting items to rollbar
	 *    endpoint: an alternative endpoint to send errors to
	 *        must be a valid, fully qualified URL.
	 *        The default is: https://api.rollbar.com/api/1
	 *    proxy: if you wish to proxy requests provide an object
	 *        with the following keys:
	 *          host or hostname (required): foo.example.com
	 *          port (optional): 123
	 *          protocol (optional): https
	 * }
	 */
	function Api(options, t, u, j) {
	  this.options = options;
	  this.transport = t;
	  this.url = u;
	  this.jsonBackup = j;
	  this.accessToken = options.accessToken;
	  this.transportOptions = _getTransport(options, u);
	}
	
	/**
	 *
	 * @param data
	 * @param callback
	 */
	Api.prototype.postItem = function(data, callback) {
	  var transportOptions = helpers.transportOptions(this.transportOptions, '/item/', 'POST');
	  var payload = helpers.buildPayload(this.accessToken, data, this.jsonBackup);
	  this.transport.post(this.accessToken, transportOptions, payload, callback);
	};
	
	Api.prototype.configure = function(options) {
	  var oldOptions = this.oldOptions;
	  this.options = _.extend(true, {}, oldOptions, options);
	  this.transportOptions = _getTransport(this.options, this.url);
	  if (this.options.accessToken !== undefined) {
	    this.accessToken = this.options.accessToken;
	  }
	  return this;
	};
	
	function _getTransport(options, url) {
	  return helpers.getTransportFromOptions(options, defaultOptions, url);
	}
	
	module.exports = Api;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	
	function buildPayload(accessToken, data, jsonBackup) {
	  if (_.isType(data.context, 'object')) {
	    var contextResult = _.stringify(data.context, jsonBackup);
	    if (contextResult.error) {
	      data.context = 'Error: could not serialize \'context\'';
	    } else {
	      data.context = contextResult.value || '';
	    }
	    if (data.context.length > 255) {
	      data.context = data.context.substr(0, 255);
	    }
	  }
	  return {
	    access_token: accessToken,
	    data: data
	  };
	}
	
	function getTransportFromOptions(options, defaults, url) {
	  var hostname = defaults.hostname;
	  var protocol = defaults.protocol;
	  var port = defaults.port;
	  var path = defaults.path;
	  var search = defaults.search;
	
	  var proxy = options.proxy;
	  if (options.endpoint) {
	    var opts = url.parse(options.endpoint);
	    hostname = opts.hostname;
	    protocol = opts.protocol;
	    port = opts.port;
	    path = opts.pathname;
	    search = opts.search;
	  }
	  return {
	    hostname: hostname,
	    protocol: protocol,
	    port: port,
	    path: path,
	    search: search,
	    proxy: proxy
	  };
	}
	
	function transportOptions(transport, path, method) {
	  var protocol = transport.protocol || 'https:';
	  var port = transport.port || (protocol === 'http:' ? 80 : protocol === 'https:' ? 443 : undefined);
	  var hostname = transport.hostname;
	  path = appendPathToPath(transport.path, path);
	  if (transport.search) {
	    path = path + transport.search;
	  }
	  if (transport.proxy) {
	    path = protocol + '//' + hostname + path;
	    hostname = transport.proxy.host || transport.proxy.hostname;
	    port = transport.proxy.port;
	    protocol = transport.proxy.protocol || protocol;
	  }
	  return {
	    protocol: protocol,
	    hostname: hostname,
	    path: path,
	    port: port,
	    method: method
	  };
	}
	
	function appendPathToPath(base, path) {
	  var baseTrailingSlash = /\/$/.test(base);
	  var pathBeginningSlash = /^\//.test(path);
	
	  if (baseTrailingSlash && pathBeginningSlash) {
	    path = path.substring(1);
	  } else if (!baseTrailingSlash && !pathBeginningSlash) {
	    path = '/' + path;
	  }
	
	  return base + path;
	}
	
	module.exports = {
	  buildPayload: buildPayload,
	  getTransportFromOptions: getTransportFromOptions,
	  transportOptions: transportOptions,
	  appendPathToPath: appendPathToPath
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	/* eslint-disable no-console */
	__webpack_require__(14);
	var detection = __webpack_require__(15);
	var _ = __webpack_require__(6);
	
	function error() {
	  var args = Array.prototype.slice.call(arguments, 0);
	  args.unshift('Rollbar:');
	  if (detection.ieVersion() <= 8) {
	    console.error(_.formatArgsAsString(args));
	  } else {
	    console.error.apply(console, args);
	  }
	}
	
	function info() {
	  var args = Array.prototype.slice.call(arguments, 0);
	  args.unshift('Rollbar:');
	  if (detection.ieVersion() <= 8) {
	    console.info(_.formatArgsAsString(args));
	  } else {
	    console.info.apply(console, args);
	  }
	}
	
	function log() {
	  var args = Array.prototype.slice.call(arguments, 0);
	  args.unshift('Rollbar:');
	  if (detection.ieVersion() <= 8) {
	    console.log(_.formatArgsAsString(args));
	  } else {
	    console.log.apply(console, args);
	  }
	}
	
	/* eslint-enable no-console */
	
	module.exports = {
	  error: error,
	  info: info,
	  log: log
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(global) {
	  'use strict';
	  if (!global.console) {
	    global.console = {};
	  }
	  var con = global.console;
	  var prop, method;
	  var dummy = function() {};
	  var properties = ['memory'];
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
	  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
	  // Using `this` for web workers & supports Browserify / Webpack.
	})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	// This detection.js module is used to encapsulate any ugly browser/feature
	// detection we may need to do.
	
	// Figure out which version of IE we're using, if any.
	// This is gleaned from http://stackoverflow.com/questions/5574842/best-way-to-check-for-ie-less-than-9-in-javascript-without-library
	// Will return an integer on IE (i.e. 8)
	// Will return undefined otherwise
	function getIEVersion() {
		var undef;
		if (!document) {
			return undef;
		}
	
	  var v = 3,
	    div = document.createElement('div'),
	    all = div.getElementsByTagName('i');
	
	  while (
	    div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
	      all[0]
	    );
	
	  return v > 4 ? v : undef;
	}
	
	var Detection = {
	  ieVersion: getIEVersion
	};
	
	module.exports = Detection;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';
	
	function captureUncaughtExceptions(window, handler, shim) {
	  if (!window) { return; }
	  var oldOnError;
	
	  if (typeof handler._rollbarOldOnError === 'function') {
	    oldOnError = handler._rollbarOldOnError;
	  } else if (window.onerror && !window.onerror.belongsToShim) {
	    oldOnError = window.onerror;
	    handler._rollbarOldOnError = oldOnError;
	  }
	
	  var fn = function() {
	    var args = Array.prototype.slice.call(arguments, 0);
	    _rollbarWindowOnError(window, handler, oldOnError, args);
	  };
	  fn.belongsToShim = shim;
	  window.onerror = fn;
	}
	
	function _rollbarWindowOnError(window, r, old, args) {
	  if (window._rollbarWrappedError) {
	    if (!args[4]) {
	      args[4] = window._rollbarWrappedError;
	    }
	    if (!args[5]) {
	      args[5] = window._rollbarWrappedError._rollbarContext;
	    }
	    window._rollbarWrappedError = null;
	  }
	
	  r.handleUncaughtException.apply(r, args);
	  if (old) {
	    old.apply(window, args);
	  }
	}
	
	function captureUnhandledRejections(window, handler, shim) {
	  if (!window) { return; }
	
	  if (typeof window._rollbarURH === 'function' && window._rollbarURH.belongsToShim) {
	    window.removeEventListener('unhandledrejection', window._rollbarURH);
	  }
	
	  var rejectionHandler = function (event) {
	    var reason = event.reason;
	    var promise = event.promise;
	    var detail = event.detail;
	
	    if (!reason && detail) {
	      reason = detail.reason;
	      promise = detail.promise;
	    }
	
	    if (handler && handler.handleUnhandledRejection) {
	      handler.handleUnhandledRejection(reason, promise);
	    }
	  };
	  rejectionHandler.belongsToShim = shim;
	  window._rollbarURH = rejectionHandler;
	  window.addEventListener('unhandledrejection', rejectionHandler);
	}
	
	function wrapGlobals(window, handler, shim) {
	  if (!window) { return; }
	  // Adapted from https://github.com/bugsnag/bugsnag-js
	  var globals = 'EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(',');
	  var i, global;
	  for (i = 0; i < globals.length; ++i) {
	    global = globals[i];
	
	    if (window[global] && window[global].prototype) {
	      _extendListenerPrototype(handler, window[global].prototype, shim);
	    }
	  }
	}
	
	function _extendListenerPrototype(handler, prototype, shim) {
	  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
	    var oldAddEventListener = prototype.addEventListener;
	    while (oldAddEventListener._rollbarOldAdd && oldAddEventListener.belongsToShim) {
	      oldAddEventListener = oldAddEventListener._rollbarOldAdd;
	    }
	    var addFn = function(event, callback, bubble) {
	      oldAddEventListener.call(this, event, handler.wrap(callback), bubble);
	    };
	    addFn._rollbarOldAdd = oldAddEventListener;
	    addFn.belongsToShim = shim;
	    prototype.addEventListener = addFn;
	
	    var oldRemoveEventListener = prototype.removeEventListener;
	    while (oldRemoveEventListener._rollbarOldRemove && oldRemoveEventListener.belongsToShim) {
	      oldRemoveEventListener = oldRemoveEventListener._rollbarOldRemove;
	    }
	    var removeFn = function(event, callback, bubble) {
	      oldRemoveEventListener.call(this, event, callback && callback._rollbar_wrapped || callback, bubble);
	    };
	    removeFn._rollbarOldRemove = oldRemoveEventListener;
	    removeFn.belongsToShim = shim;
	    prototype.removeEventListener = removeFn;
	  }
	}
	
	module.exports = {
	  captureUncaughtExceptions: captureUncaughtExceptions,
	  captureUnhandledRejections: captureUnhandledRejections,
	  wrapGlobals: wrapGlobals
	};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	var logger = __webpack_require__(13);
	
	/*
	 * accessToken may be embedded in payload but that should not
	 *   be assumed
	 *
	 * options: {
	 *   hostname
	 *   protocol
	 *   path
	 *   port
	 *   method
	 * }
	 *
	 *  params is an object containing key/value pairs. These
	 *    will be appended to the path as 'key=value&key=value'
	 *
	 * payload is an unserialized object
	 */
	
	function get(accessToken, options, params, callback, requestFactory) {
	  if (!callback || !_.isFunction(callback)) {
	    callback = function() {};
	  }
	  _.addParamsAndAccessTokenToPath(accessToken, options, params);
	
	  var method = 'GET';
	  var url = _.formatUrl(options);
	  _makeRequest(accessToken, url, method, null, callback, requestFactory);
	}
	
	function post(accessToken, options, payload, callback, requestFactory) {
	  if (!callback || !_.isFunction(callback)) {
	    callback = function() {};
	  }
	
	  if (!payload) {
	    return callback(new Error('Cannot send empty request'));
	  }
	
	  var stringifyResult = _.stringify(payload);
	  if (stringifyResult.error) {
	    return callback(stringifyResult.error);
	  }
	
	  var writeData = stringifyResult.value;
	  var method = 'POST';
	  var url = _.formatUrl(options);
	  _makeRequest(accessToken, url, method, writeData, callback, requestFactory);
	}
	
	function _makeRequest(accessToken, url, method, data, callback, requestFactory) {
	  var request;
	  if (requestFactory) {
	    request = requestFactory();
	  } else {
	    request = _createXMLHTTPObject();
	  }
	  if (!request) {
	    // Give up, no way to send requests
	    return callback(new Error('No way to send a request'));
	  }
	  try {
	    try {
	      var onreadystatechange = function() {
	        try {
	          if (onreadystatechange && request.readyState === 4) {
	            onreadystatechange = undefined;
	
	            var parseResponse = _.jsonParse(request.responseText);
	            if (_isSuccess(request)) {
	              callback(parseResponse.error, parseResponse.value);
	              return;
	            } else if (_isNormalFailure(request)) {
	              if (request.status === 403) {
	                // likely caused by using a server access token
	                var message = parseResponse.value && parseResponse.value.message;
	                logger.error(message);
	              }
	              // return valid http status codes
	              callback(new Error(String(request.status)));
	            } else {
	              // IE will return a status 12000+ on some sort of connection failure,
	              // so we return a blank error
	              // http://msdn.microsoft.com/en-us/library/aa383770%28VS.85%29.aspx
	              var msg = 'XHR response had no status code (likely connection failure)';
	              callback(_newRetriableError(msg));
	            }
	          }
	        } catch (ex) {
	          //jquery source mentions firefox may error out while accessing the
	          //request members if there is a network error
	          //https://github.com/jquery/jquery/blob/a938d7b1282fc0e5c52502c225ae8f0cef219f0a/src/ajax/xhr.js#L111
	          var exc;
	          if (ex && ex.stack) {
	            exc = ex;
	          } else {
	            exc = new Error(ex);
	          }
	          callback(exc);
	        }
	      };
	
	      request.open(method, url, true);
	      if (request.setRequestHeader) {
	        request.setRequestHeader('Content-Type', 'application/json');
	        request.setRequestHeader('X-Rollbar-Access-Token', accessToken);
	      }
	      request.onreadystatechange = onreadystatechange;
	      request.send(data);
	    } catch (e1) {
	      // Sending using the normal xmlhttprequest object didn't work, try XDomainRequest
	      if (typeof XDomainRequest !== 'undefined') {
	
	        // Assume we are in a really old browser which has a bunch of limitations:
	        // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	
	        // Extreme paranoia: if we have XDomainRequest then we have a window, but just in case
	        if (!window || !window.location) {
	          return callback(new Error('No window available during request, unknown environment'));
	        }
	
	        // If the current page is http, try and send over http
	        if (window.location.href.substring(0, 5) === 'http:' && url.substring(0, 5) === 'https') {
	          url = 'http' + url.substring(5);
	        }
	
	        var xdomainrequest = new XDomainRequest();
	        xdomainrequest.onprogress = function() {};
	        xdomainrequest.ontimeout = function() {
	          var msg = 'Request timed out';
	          var code = 'ETIMEDOUT';
	          callback(_newRetriableError(msg, code));
	        };
	        xdomainrequest.onerror = function() {
	          callback(new Error('Error during request'));
	        };
	        xdomainrequest.onload = function() {
	          var parseResponse = _.jsonParse(xdomainrequest.responseText);
	          callback(parseResponse.error, parseResponse.value);
	        };
	        xdomainrequest.open(method, url, true);
	        xdomainrequest.send(data);
	      } else {
	        callback(new Error('Cannot find a method to transport a request'));
	      }
	    }
	  } catch (e2) {
	    callback(e2);
	  }
	}
	
	function _createXMLHTTPObject() {
	  /* global ActiveXObject:false */
	
	  var factories = [
	    function () {
	      return new XMLHttpRequest();
	    },
	    function () {
	      return new ActiveXObject('Msxml2.XMLHTTP');
	    },
	    function () {
	      return new ActiveXObject('Msxml3.XMLHTTP');
	    },
	    function () {
	      return new ActiveXObject('Microsoft.XMLHTTP');
	    }
	  ];
	  var xmlhttp;
	  var i;
	  var numFactories = factories.length;
	  for (i = 0; i < numFactories; i++) {
	    /* eslint-disable no-empty */
	    try {
	      xmlhttp = factories[i]();
	      break;
	    } catch (e) {
	      // pass
	    }
	    /* eslint-enable no-empty */
	  }
	  return xmlhttp;
	}
	
	function _isSuccess(r) {
	  return r && r.status && r.status === 200;
	}
	
	function _isNormalFailure(r) {
	  return r && _.isType(r.status, 'number') && r.status >= 400 && r.status < 600;
	}
	
	function _newRetriableError(message, code) {
	  var err = new Error(message);
	  err.code = code || 'ENOTFOUND';
	  return err;
	}
	
	module.exports = {
	  get: get,
	  post: post
	};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';
	
	// See https://nodejs.org/docs/latest/api/url.html
	function parse(url) {
	  var result = {
	    protocol: null, auth: null, host: null, path: null,
	    hash: null, href: url, hostname: null, port: null,
	    pathname: null, search: null, query: null
	  };
	
	  var i, last;
	  i = url.indexOf('//');
	  if (i !== -1) {
	    result.protocol = url.substring(0,i);
	    last = i+2;
	  } else {
	    last = 0;
	  }
	  
	  i = url.indexOf('@', last);
	  if (i !== -1) {
	    result.auth = url.substring(last, i);
	    last = i+1;
	  }
	
	  i = url.indexOf('/', last);
	  if (i === -1) {
	    i = url.indexOf('?', last);
	    if (i === -1) {
	      i = url.indexOf('#', last);
	      if (i === -1) {
	        result.host = url.substring(last);
	      } else {
	        result.host = url.substring(last, i);
	        result.hash = url.substring(i);
	      }
	      result.hostname = result.host.split(':')[0];
	      result.port = result.host.split(':')[1];
	      if (result.port) {
	        result.port = parseInt(result.port, 10);
	      }
	      return result;
	    } else {
	      result.host = url.substring(last, i);
	      result.hostname = result.host.split(':')[0];
	      result.port = result.host.split(':')[1];
	      if (result.port) {
	        result.port = parseInt(result.port, 10);
	      }
	      last = i;
	    }
	  } else {
	    result.host = url.substring(last, i);
	    result.hostname = result.host.split(':')[0];
	    result.port = result.host.split(':')[1];
	    if (result.port) {
	      result.port = parseInt(result.port, 10);
	    }
	    last = i;
	  }
	
	  i = url.indexOf('#', last);
	  if (i === -1) {
	    result.path = url.substring(last);
	  } else {
	    result.path = url.substring(last, i);
	    result.hash = url.substring(i);
	  }
	
	  if (result.path) {
	    var pathParts = result.path.split('?');
	    result.pathname = pathParts[0];
	    result.query = pathParts[1];
	    result.search = result.query ? '?' + result.query : null;
	  }
	  return result;
	}
	
	module.exports = {
	  parse: parse
	};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	var errorParser = __webpack_require__(20);
	var logger = __webpack_require__(13);
	
	function handleItemWithError(item, options, callback) {
	  item.data = item.data || {};
	  if (item.err) {
	    try {
	      item.stackInfo = item.err._savedStackTrace || errorParser.parse(item.err);
	    } catch (e)
	    /* istanbul ignore next */
	    {
	      logger.error('Error while parsing the error object.', e);
	      item.message = item.err.message || item.err.description || item.message || String(item.err);
	      delete item.err;
	    }
	  }
	  callback(null, item);
	}
	
	function ensureItemHasSomethingToSay(item, options, callback) {
	  if (!item.message && !item.stackInfo && !item.custom) {
	    callback(new Error('No message, stack info, or custom data'), null);
	  }
	  callback(null, item);
	}
	
	function addBaseInfo(item, options, callback) {
	  var environment = (options.payload && options.payload.environment) || options.environment;
	  item.data = _.extend(true, {}, item.data, {
	    environment: environment,
	    level: item.level,
	    endpoint: options.endpoint,
	    platform: 'browser',
	    framework: 'browser-js',
	    language: 'javascript',
	    server: {},
	    uuid: item.uuid,
	    notifier: {
	      name: 'rollbar-browser-js',
	      version: options.version
	    }
	  });
	  callback(null, item);
	}
	
	function addRequestInfo(window) {
	  return function(item, options, callback) {
	    if (!window || !window.location) {
	      return callback(null, item);
	    }
	    _.set(item, 'data.request', {
	      url: window.location.href,
	      query_string: window.location.search,
	      user_ip: '$remote_ip'
	    });
	    callback(null, item);
	  };
	}
	
	function addClientInfo(window) {
	  return function(item, options, callback) {
	    if (!window) {
	      return callback(null, item);
	    }
	    _.set(item, 'data.client', {
	      runtime_ms: item.timestamp - window._rollbarStartTime,
	      timestamp: Math.round(item.timestamp / 1000),
	      javascript: {
	        browser: window.navigator.userAgent,
	        language: window.navigator.language,
	        cookie_enabled: window.navigator.cookieEnabled,
	        screen: {
	          width: window.screen.width,
	          height: window.screen.height
	        }
	      }
	    });
	    callback(null, item);
	  };
	}
	
	function addPluginInfo(window) {
	  return function(item, options, callback) {
	    if (!window || !window.navigator) {
	      return callback(null, item);
	    }
	    var plugins = [];
	    var navPlugins = window.navigator.plugins || [];
	    var cur;
	    for (var i=0, l=navPlugins.length; i < l; ++i) {
	      cur = navPlugins[i];
	      plugins.push({name: cur.name, description: cur.description});
	    }
	    _.set(item, 'data.client.javascript.plugins', plugins);
	    callback(null, item);
	  };
	}
	
	function addBody(item, options, callback) {
	  if (item.stackInfo) {
	    addBodyTrace(item, options, callback);
	  } else {
	    addBodyMessage(item, options, callback);
	  }
	}
	
	function addBodyMessage(item, options, callback) {
	  var message = item.message;
	  var custom = item.custom;
	
	  if (!message) {
	    if (custom) {
	      var scrubFields = options.scrubFields;
	      var messageResult = _.stringify(_.scrub(custom, scrubFields));
	      message = messageResult.error || messageResult.value || '';
	    } else {
	      message = '';
	    }
	  }
	  var result = {
	    body: message
	  };
	
	  if (custom) {
	    result.extra = _.extend(true, {}, custom);
	  }
	
	  _.set(item, 'data.body', {message: result});
	  callback(null, item);
	}
	
	
	function addBodyTrace(item, options, callback) {
	  var description = item.data.description;
	  var stackInfo = item.stackInfo;
	  var custom = item.custom;
	
	  var guess = errorParser.guessErrorClass(stackInfo.message);
	  var className = stackInfo.name || guess[0];
	  var message = guess[1];
	  var trace = {
	    exception: {
	      'class': className,
	      message: message
	    }
	  };
	
	  if (description) {
	    trace.exception.description = description;
	  }
	
	  // Transform a TraceKit stackInfo object into a Rollbar trace
	  var stack = stackInfo.stack;
	  if (stack && stack.length === 0 && item._unhandledStackInfo && item._unhandledStackInfo.stack) {
	    stack = item._unhandledStackInfo.stack;
	  }
	  if (stack) {
	    var stackFrame;
	    var frame;
	    var code;
	    var pre;
	    var post;
	    var contextLength;
	    var i, mid;
	
	    trace.frames = [];
	    for (i = 0; i < stack.length; ++i) {
	      stackFrame = stack[i];
	      frame = {
	        filename: stackFrame.url ? _.sanitizeUrl(stackFrame.url) : '(unknown)',
	        lineno: stackFrame.line || null,
	        method: (!stackFrame.func || stackFrame.func === '?') ? '[anonymous]' : stackFrame.func,
	        colno: stackFrame.column
	      };
	      if (frame.method && frame.method.endsWith && frame.method.endsWith('_rollbar_wrapped')) {
	        continue;
	      }
	
	      code = pre = post = null;
	      contextLength = stackFrame.context ? stackFrame.context.length : 0;
	      if (contextLength) {
	        mid = Math.floor(contextLength / 2);
	        pre = stackFrame.context.slice(0, mid);
	        code = stackFrame.context[mid];
	        post = stackFrame.context.slice(mid);
	      }
	
	      if (code) {
	        frame.code = code;
	      }
	
	      if (pre || post) {
	        frame.context = {};
	        if (pre && pre.length) {
	          frame.context.pre = pre;
	        }
	        if (post && post.length) {
	          frame.context.post = post;
	        }
	      }
	
	      if (stackFrame.args) {
	        frame.args = stackFrame.args;
	      }
	
	      trace.frames.push(frame);
	    }
	
	    // NOTE(cory): reverse the frames since rollbar.com expects the most recent call last
	    trace.frames.reverse();
	
	    if (custom) {
	      trace.extra = _.extend(true, {}, custom);
	    }
	    _.set(item, 'data.body', {trace: trace});
	    callback(null, item);
	  } else {
	    item.message = className + ': ' + message;
	    addBodyMessage(item, options, callback);
	  }
	}
	
	function scrubPayload(item, options, callback) {
	  var scrubFields = options.scrubFields;
	  _.scrub(item.data, scrubFields);
	  callback(null, item);
	}
	
	function userTransform(item, options, callback) {
	  var newItem = _.extend(true, {}, item);
	  try {
	    if (_.isFunction(options.transform)) {
	      options.transform(newItem.data);
	    }
	  } catch (e) {
	    options.transform = null;
	    logger.error('Error while calling custom transform() function. Removing custom transform().', e);
	    callback(null, item);
	    return;
	  }
	  callback(null, newItem);
	}
	
	module.exports = {
	  handleItemWithError: handleItemWithError,
	  ensureItemHasSomethingToSay: ensureItemHasSomethingToSay,
	  addBaseInfo: addBaseInfo,
	  addRequestInfo: addRequestInfo,
	  addClientInfo: addClientInfo,
	  addPluginInfo: addPluginInfo,
	  addBody: addBody,
	  scrubPayload: scrubPayload,
	  userTransform: userTransform
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var ErrorStackParser = __webpack_require__(21);
	
	var UNKNOWN_FUNCTION = '?';
	var ERR_CLASS_REGEXP = new RegExp('^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ');
	
	function guessFunctionName() {
	  return UNKNOWN_FUNCTION;
	}
	
	
	function gatherContext() {
	  return null;
	}
	
	
	function Frame(stackFrame) {
	  var data = {};
	
	  data._stackFrame = stackFrame;
	
	  data.url = stackFrame.fileName;
	  data.line = stackFrame.lineNumber;
	  data.func = stackFrame.functionName;
	  data.column = stackFrame.columnNumber;
	  data.args = stackFrame.args;
	
	  data.context = gatherContext(data.url, data.line);
	
	  return data;
	}
	
	
	function Stack(exception) {
	  function getStack() {
	    var parserStack = [];
	
	    try {
	      parserStack = ErrorStackParser.parse(exception);
	    } catch(e) {
	      parserStack = [];
	    }
	
	    var stack = [];
	
	    for (var i = 0; i < parserStack.length; i++) {
	      stack.push(new Frame(parserStack[i]));
	    }
	
	    return stack;
	  }
	
	  return {
	    stack: getStack(),
	    message: exception.message,
	    name: exception.name
	  };
	}
	
	
	function parse(e) {
	  return new Stack(e);
	}
	
	
	function guessErrorClass(errMsg) {
	  if (!errMsg) {
	    return ['Unknown error. There was no error message to display.', ''];
	  }
	  var errClassMatch = errMsg.match(ERR_CLASS_REGEXP);
	  var errClass = '(unknown)';
	
	  if (errClassMatch) {
	    errClass = errClassMatch[errClassMatch.length - 1];
	    errMsg = errMsg.replace((errClassMatch[errClassMatch.length - 2] || '') + errClass + ':', '');
	    errMsg = errMsg.replace(/(^[\s]+|[\s]+$)/g, '');
	  }
	  return [errClass, errMsg];
	}
	
	
	module.exports = {
	  guessFunctionName: guessFunctionName,
	  guessErrorClass: guessErrorClass,
	  gatherContext: gatherContext,
	  parse: parse,
	  Stack: Stack,
	  Frame: Frame
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.ErrorStackParser = factory(root.StackFrame);
	    }
	}(this, function ErrorStackParser(StackFrame) {
	    'use strict';
	
	    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
	    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
	    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
	
	    function _map(array, fn, thisArg) {
	        if (typeof Array.prototype.map === 'function') {
	            return array.map(fn, thisArg);
	        } else {
	            var output = new Array(array.length);
	            for (var i = 0; i < array.length; i++) {
	                output[i] = fn.call(thisArg, array[i]);
	            }
	            return output;
	        }
	    }
	
	    function _filter(array, fn, thisArg) {
	        if (typeof Array.prototype.filter === 'function') {
	            return array.filter(fn, thisArg);
	        } else {
	            var output = [];
	            for (var i = 0; i < array.length; i++) {
	                if (fn.call(thisArg, array[i])) {
	                    output.push(array[i]);
	                }
	            }
	            return output;
	        }
	    }
	
	    return {
	        /**
	         * Given an Error object, extract the most information from it.
	         * @param error {Error}
	         * @return Array[StackFrame]
	         */
	        parse: function ErrorStackParser$$parse(error) {
	            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	                return this.parseOpera(error);
	            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	                return this.parseV8OrIE(error);
	            } else if (error.stack) {
	                return this.parseFFOrSafari(error);
	            } else {
	                throw new Error('Cannot parse given Error object');
	            }
	        },
	
	        /**
	         * Separate line and column numbers from a URL-like string.
	         * @param urlLike String
	         * @return Array[String]
	         */
	        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	            // Fail-fast but return locations like "(native)"
	            if (urlLike.indexOf(':') === -1) {
	                return [urlLike];
	            }
	
	            var locationParts = urlLike.replace(/[\(\)\s]/g, '').split(':');
	            var lastNumber = locationParts.pop();
	            var possibleNumber = locationParts[locationParts.length - 1];
	            if (!isNaN(parseFloat(possibleNumber)) && isFinite(possibleNumber)) {
	                var lineNumber = locationParts.pop();
	                return [locationParts.join(':'), lineNumber, lastNumber];
	            } else {
	                return [locationParts.join(':'), lastNumber, undefined];
	            }
	        },
	
	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	            var filtered = _filter(error.stack.split('\n'), function (line) {
	                return !!line.match(CHROME_IE_STACK_REGEXP);
	            }, this);
	
	            return _map(filtered, function (line) {
	                if (line.indexOf('(eval ') > -1) {
	                    // Throw away eval information until we implement stacktrace.js/stackframe#8
	                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
	                }
	                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = tokens.join(' ') || undefined;
	                var fileName = locationParts[0] === 'eval' ? undefined : locationParts[0];
	
	                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
	            }, this);
	        },
	
	        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	            var filtered = _filter(error.stack.split('\n'), function (line) {
	                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
	            }, this);
	
	            return _map(filtered, function (line) {
	                // Throw away eval information until we implement stacktrace.js/stackframe#8
	                if (line.indexOf(' > eval') > -1) {
	                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
	                }
	
	                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
	                    // Safari eval frames only have function names and nothing else
	                    return new StackFrame(line);
	                } else {
	                    var tokens = line.split('@');
	                    var locationParts = this.extractLocation(tokens.pop());
	                    var functionName = tokens.shift() || undefined;
	                    return new StackFrame(functionName, undefined, locationParts[0], locationParts[1], locationParts[2], line);
	                }
	            }, this);
	        },
	
	        parseOpera: function ErrorStackParser$$parseOpera(e) {
	            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
	                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
	                return this.parseOpera9(e);
	            } else if (!e.stack) {
	                return this.parseOpera10(e);
	            } else {
	                return this.parseOpera11(e);
	            }
	        },
	
	        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	            var lines = e.message.split('\n');
	            var result = [];
	
	            for (var i = 2, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
	                }
	            }
	
	            return result;
	        },
	
	        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	            var lines = e.stacktrace.split('\n');
	            var result = [];
	
	            for (var i = 0, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(match[3] || undefined, undefined, match[2], match[1], undefined, lines[i]));
	                }
	            }
	
	            return result;
	        },
	
	        // Opera 10.65+ Error.stack very similar to FF/Safari
	        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	            var filtered = _filter(error.stack.split('\n'), function (line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) &&
	                    !line.match(/^Error created at/);
	            }, this);
	
	            return _map(filtered, function (line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionCall = (tokens.shift() || '');
	                var functionName = functionCall
	                        .replace(/<anonymous function(: (\w+))?>/, '$2')
	                        .replace(/\([^\)]*\)/g, '') || undefined;
	                var argsRaw;
	                if (functionCall.match(/\(([^\)]*)\)/)) {
	                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
	                }
	                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ? undefined : argsRaw.split(',');
	                return new StackFrame(functionName, args, locationParts[0], locationParts[1], locationParts[2], line);
	            }, this);
	        }
	    };
	}));
	


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.StackFrame = factory();
	    }
	}(this, function () {
	    'use strict';
	    function _isNumber(n) {
	        return !isNaN(parseFloat(n)) && isFinite(n);
	    }
	
	    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
	        if (functionName !== undefined) {
	            this.setFunctionName(functionName);
	        }
	        if (args !== undefined) {
	            this.setArgs(args);
	        }
	        if (fileName !== undefined) {
	            this.setFileName(fileName);
	        }
	        if (lineNumber !== undefined) {
	            this.setLineNumber(lineNumber);
	        }
	        if (columnNumber !== undefined) {
	            this.setColumnNumber(columnNumber);
	        }
	        if (source !== undefined) {
	            this.setSource(source);
	        }
	    }
	
	    StackFrame.prototype = {
	        getFunctionName: function () {
	            return this.functionName;
	        },
	        setFunctionName: function (v) {
	            this.functionName = String(v);
	        },
	
	        getArgs: function () {
	            return this.args;
	        },
	        setArgs: function (v) {
	            if (Object.prototype.toString.call(v) !== '[object Array]') {
	                throw new TypeError('Args must be an Array');
	            }
	            this.args = v;
	        },
	
	        // NOTE: Property name may be misleading as it includes the path,
	        // but it somewhat mirrors V8's JavaScriptStackTraceApi
	        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
	        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
	        getFileName: function () {
	            return this.fileName;
	        },
	        setFileName: function (v) {
	            this.fileName = String(v);
	        },
	
	        getLineNumber: function () {
	            return this.lineNumber;
	        },
	        setLineNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Line Number must be a Number');
	            }
	            this.lineNumber = Number(v);
	        },
	
	        getColumnNumber: function () {
	            return this.columnNumber;
	        },
	        setColumnNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Column Number must be a Number');
	            }
	            this.columnNumber = Number(v);
	        },
	
	        getSource: function () {
	            return this.source;
	        },
	        setSource: function (v) {
	            this.source = String(v);
	        },
	
	        toString: function() {
	            var functionName = this.getFunctionName() || '{anonymous}';
	            var args = '(' + (this.getArgs() || []).join(',') + ')';
	            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
	            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
	            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
	            return functionName + args + fileName + lineNumber + columnNumber;
	        }
	    };
	
	    return StackFrame;
	}));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	
	function itemToPayload(item, options, callback) {
	  var payloadOptions = options.payload || {};
	  if (payloadOptions.body) {
	    delete payloadOptions.body;
	  }
	
	  var data = _.extend(true, {}, item.data, payloadOptions);
	  if (item._isUncaught) {
	    data._isUncaught = true;
	  }
	  if (item._originalArgs) {
	    data._originalArgs = item._originalArgs;
	  }
	  callback(null, data);
	}
	
	function addTelemetryData(item, options, callback) {
	  if (item.telemetryEvents) {
	    _.set(item, 'data.body.telemetry', item.telemetryEvents);
	  }
	  callback(null, item);
	}
	
	function addMessageWithError(item, options, callback) {
	  if (!item.message) {
	    callback(null, item);
	    return;
	  }
	  var tracePath = 'data.body.trace_chain.0';
	  var trace = _.get(item, tracePath);
	  if (!trace) {
	    tracePath = 'data.body.trace';
	    trace = _.get(item, tracePath);
	  }
	  if (trace) {
	    if (!(trace.exception && trace.exception.description)) {
	      _.set(item, tracePath+'.exception.description', item.message);
	      callback(null, item);
	      return;
	    }
	    var extra = _.get(item, tracePath+'.extra') || {};
	    var newExtra =  _.extend(true, {}, extra, {message: item.message});
	    _.set(item, tracePath+'.extra', newExtra);
	  }
	  callback(null, item);
	}
	
	module.exports = {
	  itemToPayload: itemToPayload,
	  addTelemetryData: addTelemetryData,
	  addMessageWithError: addMessageWithError
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	var logger = __webpack_require__(13);
	
	function checkIgnore(item, settings) {
	  var level = item.level;
	  var levelVal = _.LEVELS[level] || 0;
	  var reportLevel = _.LEVELS[settings.reportLevel] || 0;
	
	  if (levelVal < reportLevel) {
	    return false;
	  }
	
	  if (_.get(settings, 'plugins.jquery.ignoreAjaxErrors')) {
	    return !_.get(item, 'body.message.extra.isAjax');
	  }
	  return true;
	}
	
	function userCheckIgnore(item, settings) {
	  var isUncaught = !!item._isUncaught;
	  delete item._isUncaught;
	  var args = item._originalArgs;
	  delete item._originalArgs;
	  try {
	    if (_.isFunction(settings.checkIgnore) && settings.checkIgnore(isUncaught, args, item)) {
	      return false;
	    }
	  } catch (e) {
	    settings.checkIgnore = null;
	    logger.error('Error while calling custom checkIgnore(), removing', e);
	  }
	  return true;
	}
	
	function urlIsNotBlacklisted(item, settings) {
	  return !urlIsOnAList(item, settings, 'blacklist');
	}
	
	function urlIsWhitelisted(item, settings) {
	  return urlIsOnAList(item, settings, 'whitelist');
	}
	
	function urlIsOnAList(item, settings, whiteOrBlack) {
	  // whitelist is the default
	  var black = false;
	  if (whiteOrBlack === 'blacklist') {
	    black = true;
	  }
	  var list, trace, frame, filename, frameLength, url, listLength, urlRegex;
	  var i, j;
	
	  try {
	    list = black ? settings.hostBlackList : settings.hostWhiteList;
	    listLength = list && list.length;
	    trace = _.get(item, 'body.trace');
	
	    // These two checks are important to come first as they are defaults
	    // in case the list is missing or the trace is missing or not well-formed
	    if (!list || listLength === 0) {
	      return !black;
	    }
	    if (!trace || !trace.frames) {
	      return !black;
	    }
	
	    frameLength = trace.frames.length;
	    for (i = 0; i < frameLength; i++) {
	      frame = trace.frames[i];
	      filename = frame.filename;
	
	      if (!_.isType(filename, 'string')) {
	        return !black;
	      }
	
	      for (j = 0; j < listLength; j++) {
	        url = list[j];
	        urlRegex = new RegExp(url);
	
	        if (urlRegex.test(filename)) {
	          return true;
	        }
	      }
	    }
	  } catch (e)
	  /* istanbul ignore next */
	  {
	    if (black) {
	      settings.hostBlackList = null;
	    } else {
	      settings.hostWhiteList = null;
	    }
	    var listName = black ? 'hostBlackList' : 'hostWhiteList';
	    logger.error('Error while reading your configuration\'s ' + listName + ' option. Removing custom ' + listName + '.', e);
	    return !black;
	  }
	  return false;
	}
	
	function messageIsIgnored(item, settings) {
	  var exceptionMessage, i, ignoredMessages,
	      len, messageIsIgnored, rIgnoredMessage,
	      body, traceMessage, bodyMessage;
	
	  try {
	    messageIsIgnored = false;
	    ignoredMessages = settings.ignoredMessages;
	
	    if (!ignoredMessages || ignoredMessages.length === 0) {
	      return true;
	    }
	
	    body = item.body;
	    traceMessage = _.get(body, 'trace.exception.message');
	    bodyMessage = _.get(body, 'message.body');
	
	    exceptionMessage = traceMessage || bodyMessage;
	
	    if (!exceptionMessage){
	      return true;
	    }
	
	    len = ignoredMessages.length;
	    for (i = 0; i < len; i++) {
	      rIgnoredMessage = new RegExp(ignoredMessages[i], 'gi');
	      messageIsIgnored = rIgnoredMessage.test(exceptionMessage);
	
	      if (messageIsIgnored) {
	        break;
	      }
	    }
	  } catch(e)
	  /* istanbul ignore next */
	  {
	    settings.ignoredMessages = null;
	    logger.error('Error while reading your configuration\'s ignoredMessages option. Removing custom ignoredMessages.');
	  }
	
	  return !messageIsIgnored;
	}
	
	module.exports = {
	  checkIgnore: checkIgnore,
	  userCheckIgnore: userCheckIgnore,
	  urlIsNotBlacklisted: urlIsNotBlacklisted,
	  urlIsWhitelisted: urlIsWhitelisted,
	  messageIsIgnored: messageIsIgnored
	};
	


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _ = __webpack_require__(6);
	var urlparser = __webpack_require__(18);
	var domUtil = __webpack_require__(26);
	
	var defaults = {
	  network: true,
	  log: true,
	  dom: true,
	  navigation: true,
	  connectivity: true
	};
	
	function replace(obj, name, replacement, replacements, type) {
	  var orig = obj[name];
	  obj[name] = replacement(orig);
	  if (replacements) {
	    replacements[type].push([obj, name, orig]);
	  }
	}
	
	function restore(replacements, type) {
	  var b;
	  while (replacements[type].length) {
	    b = replacements[type].shift();
	    b[0][b[1]] = b[2];
	  }
	}
	
	function Instrumenter(options, telemeter, rollbar, _window, _document) {
	  var autoInstrument = options.autoInstrument;
	  if (options.enabled === false || autoInstrument === false) {
	    this.autoInstrument = {};
	  } else {
	    if (!_.isType(autoInstrument, 'object')) {
	      autoInstrument = defaults;
	    }
	    this.autoInstrument = _.extend(true, {}, defaults, autoInstrument);
	  }
	  this.scrubTelemetryInputs = !!options.scrubTelemetryInputs;
	  this.telemetryScrubber = options.telemetryScrubber;
	  this.telemeter = telemeter;
	  this.rollbar = rollbar;
	  this._window = _window || {};
	  this._document = _document || {};
	  this.replacements = {
	    network: [],
	    log: [],
	    navigation: [],
	    connectivity: []
	  };
	  this.eventRemovers = {
	    dom: [],
	    connectivity: []
	  };
	
	  this._location = this._window.location;
	  this._lastHref = this._location && this._location.href;
	}
	
	Instrumenter.prototype.configure = function(options) {
	  var autoInstrument = options.autoInstrument;
	  var oldSettings = _.extend(true, {}, this.autoInstrument);
	  if (options.enabled === false || autoInstrument === false) {
	    this.autoInstrument = {};
	  } else {
	    if (!_.isType(autoInstrument, 'object')) {
	      autoInstrument = defaults;
	    }
	    this.autoInstrument = _.extend(true, {}, defaults, autoInstrument);
	  }
	  this.instrument(oldSettings);
	};
	
	Instrumenter.prototype.instrument = function(oldSettings) {
	  if (this.autoInstrument.network && !(oldSettings && oldSettings.network)) {
	    this.instrumentNetwork();
	  } else if (!this.autoInstrument.network && oldSettings && oldSettings.network) {
	    this.deinstrumentNetwork();
	  }
	
	  if (this.autoInstrument.log && !(oldSettings && oldSettings.log)) {
	    this.instrumentConsole();
	  } else if (!this.autoInstrument.log && oldSettings && oldSettings.log) {
	    this.deinstrumentConsole();
	  }
	
	  if (this.autoInstrument.dom && !(oldSettings && oldSettings.dom)) {
	    this.instrumentDom();
	  } else if (!this.autoInstrument.dom && oldSettings && oldSettings.dom) {
	    this.deinstrumentDom();
	  }
	
	  if (this.autoInstrument.navigation && !(oldSettings && oldSettings.navigation)) {
	    this.instrumentNavigation();
	  } else if (!this.autoInstrument.navigation && oldSettings && oldSettings.navigation) {
	    this.deinstrumentNavigation();
	  }
	
	  if (this.autoInstrument.connectivity && !(oldSettings && oldSettings.connectivity)) {
	    this.instrumentConnectivity();
	  } else if (!this.autoInstrument.connectivity && oldSettings && oldSettings.connectivity) {
	    this.deinstrumentConnectivity();
	  }
	};
	
	Instrumenter.prototype.deinstrumentNetwork = function() {
	  restore(this.replacements, 'network');
	};
	
	Instrumenter.prototype.instrumentNetwork = function() {
	  var self = this;
	
	  function wrapProp(prop, xhr) {
	    if (prop in xhr && _.isFunction(xhr[prop])) {
	      replace(xhr, prop, function(orig) {
	        return self.rollbar.wrap(orig);
	      });
	    }
	  }
	
	  if ('XMLHttpRequest' in this._window) {
	    var xhrp = this._window.XMLHttpRequest.prototype;
	    replace(xhrp, 'open', function(orig) {
	      return function(method, url) {
	        if (_.isType(url, 'string')) {
	          this.__rollbar_xhr = {
	            method: method,
	            url: url,
	            status_code: null,
	            start_time_ms: _.now(),
	            end_time_ms: null
	          };
	        }
	        return orig.apply(this, arguments);
	      };
	    }, this.replacements, 'network');
	
	    replace(xhrp, 'send', function(orig) {
	      /* eslint-disable no-unused-vars */
	      return function(data) {
	      /* eslint-enable no-unused-vars */
	        var xhr = this;
	
	        function onreadystatechangeHandler() {
	          if (xhr.__rollbar_xhr && (xhr.readyState === 1 || xhr.readyState === 4)) {
	            if (xhr.__rollbar_xhr.status_code === null) {
	              xhr.__rollbar_xhr.status_code = 0;
	              xhr.__rollbar_event = self.telemeter.captureNetwork(xhr.__rollbar_xhr, 'xhr');
	            }
	            if (xhr.readyState === 1) {
	              xhr.__rollbar_xhr.start_time_ms = _.now();
	            } else {
	              xhr.__rollbar_xhr.end_time_ms = _.now();
	            }
	            try {
	              var code = xhr.status;
	              code = code === 1223 ? 204 : code;
	              xhr.__rollbar_xhr.status_code = code;
	              xhr.__rollbar_event.level = self.telemeter.levelFromStatus(code);
	            } catch (e) {
	              /* ignore possible exception from xhr.status */
	            }
	          }
	        }
	
	        wrapProp('onload', xhr);
	        wrapProp('onerror', xhr);
	        wrapProp('onprogress', xhr);
	
	        if ('onreadystatechange' in xhr && _.isFunction(xhr.onreadystatechange)) {
	          replace(xhr, 'onreadystatechange', function(orig) {
	            return self.rollbar.wrap(orig, undefined, onreadystatechangeHandler);
	          });
	        } else {
	          xhr.onreadystatechange = onreadystatechangeHandler;
	        }
	        return orig.apply(this, arguments);
	      }
	    }, this.replacements, 'network');
	  }
	
	  if ('fetch' in this._window) {
	    replace(this._window, 'fetch', function(orig) {
	      /* eslint-disable no-unused-vars */
	      return function(fn, t) {
	      /* eslint-enable no-unused-vars */
	        var args = new Array(arguments.length);
	        for (var i=0, len=args.length; i < len; i++) {
	          args[i] = arguments[i];
	        }
	        var input = args[0];
	        var method = 'GET';
	        var url;
	        if (_.isType(input, 'string')) {
	          url = input;
	        } else {
	          url = input.url;
	          if (input.method) {
	            method = input.method;
	          }
	        }
	        if (args[1] && args[1].method) {
	          method = args[1].method;
	        }
	        var metadata = {
	          method: method,
	          url: url,
	          status_code: null,
	          start_time_ms: _.now(),
	          end_time_ms: null
	        };
	        self.telemeter.captureNetwork(metadata, 'fetch');
	        return orig.apply(this, args).then(function (resp) {
	          metadata.end_time_ms = _.now();
	          metadata.status_code = resp.status;
	          return resp;
	        });
	      };
	    }, this.replacements, 'network');
	  }
	};
	
	Instrumenter.prototype.deinstrumentConsole = function() {
	  if (!('console' in this._window && this._window.console.log)) {
	    return;
	  }
	  var b;
	  while (this.replacements['log'].length) {
	    b = this.replacements['log'].shift();
	    this._window.console[b[0]] = b[1];
	  }
	};
	
	Instrumenter.prototype.instrumentConsole = function() {
	  if (!('console' in this._window && this._window.console.log)) {
	    return;
	  }
	
	  var self = this;
	  var c = this._window.console;
	
	  function wrapConsole(method) {
	    var orig = c[method];
	    var origConsole = c;
	    var level = method === 'warn' ? 'warning' : method;
	    c[method] = function() {
	      var args = Array.prototype.slice.call(arguments);
	      var message = _.formatArgsAsString(args);
	      self.telemeter.captureLog(message, level);
	      if (orig) {
	        Function.prototype.apply.call(orig, origConsole, args);
	      }
	    };
	    self.replacements['log'].push([method, orig]);
	  }
	  var methods = ['debug','info','warn','error','log'];
	  for (var i=0, len=methods.length; i < len; i++) {
	    wrapConsole(methods[i]);
	  }
	};
	
	Instrumenter.prototype.deinstrumentDom = function() {
	  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
	    return;
	  }
	  this.removeListeners('dom');
	};
	
	Instrumenter.prototype.instrumentDom = function() {
	  if (!('addEventListener' in this._window || 'attachEvent' in this._window)) {
	    return;
	  }
	  var clickHandler = this.handleClick.bind(this);
	  var blurHandler = this.handleBlur.bind(this);
	  this.addListener('dom', this._window, 'click', 'onclick', clickHandler, true);
	  this.addListener('dom', this._window, 'blur', 'onfocusout', blurHandler, true);
	};
	
	Instrumenter.prototype.handleClick = function(evt) {
	  try {
	    var e = domUtil.getElementFromEvent(evt, this._document);
	    var hasTag = e && e.tagName;
	    var anchorOrButton = domUtil.isDescribedElement(e, 'a') || domUtil.isDescribedElement(e, 'button');
	    if (hasTag && (anchorOrButton || domUtil.isDescribedElement(e, 'input', ['button', 'submit']))) {
	        this.captureDomEvent('click', e);
	    } else if (domUtil.isDescribedElement(e, 'input', ['checkbox', 'radio'])) {
	      this.captureDomEvent('input', e, e.value, e.checked);
	    }
	  } catch (exc) {
	    // TODO: Not sure what to do here
	  }
	};
	
	Instrumenter.prototype.handleBlur = function(evt) {
	  try {
	    var e = domUtil.getElementFromEvent(evt, this._document);
	    if (e && e.tagName) {
	      if (domUtil.isDescribedElement(e, 'textarea')) {
	        this.captureDomEvent('input', e, e.value);
	      } else if (domUtil.isDescribedElement(e, 'select') && e.options && e.options.length) {
	        this.handleSelectInputChanged(e);
	      } else if (domUtil.isDescribedElement(e, 'input') && !domUtil.isDescribedElement(e, 'input', ['button', 'submit', 'hidden', 'checkbox', 'radio'])) {
	        this.captureDomEvent('input', e, e.value);
	      }
	    }
	  } catch (exc) {
	    // TODO: Not sure what to do here
	  }
	};
	
	Instrumenter.prototype.handleSelectInputChanged = function(elem) {
	  if (elem.multiple) {
	    for (var i = 0; i < elem.options.length; i++) {
	      if (elem.options[i].selected) {
	        this.captureDomEvent('input', elem, elem.options[i].value);
	      }
	    }
	  } else if (elem.selectedIndex >= 0 && elem.options[elem.selectedIndex]) {
	    this.captureDomEvent('input', elem, elem.options[elem.selectedIndex].value);
	  }
	};
	
	Instrumenter.prototype.captureDomEvent = function(subtype, element, value, isChecked) {
	  if (value !== undefined) {
	    if (this.scrubTelemetryInputs || (domUtil.getElementType(element) === 'password')) {
	      value = '[scrubbed]';
	    } else if (this.telemetryScrubber) {
	      var description = domUtil.describeElement(element);
	      if (this.telemetryScrubber(description)) {
	        value = '[scrubbed]';
	      }
	    }
	  }
	  var elementString = domUtil.elementArrayToString(domUtil.treeToArray(element));
	  this.telemeter.captureDom(subtype, elementString, value, isChecked);
	};
	
	Instrumenter.prototype.deinstrumentNavigation = function() {
	  var chrome = this._window.chrome;
	  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
	  // See https://github.com/angular/angular.js/pull/13945/files
	  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
	  if (!hasPushState) {
	    return;
	  }
	  restore(this.replacements, 'navigation');
	};
	
	Instrumenter.prototype.instrumentNavigation = function() {
	  var chrome = this._window.chrome;
	  var chromePackagedApp = chrome && chrome.app && chrome.app.runtime;
	  // See https://github.com/angular/angular.js/pull/13945/files
	  var hasPushState = !chromePackagedApp && this._window.history && this._window.history.pushState;
	  if (!hasPushState) {
	    return;
	  }
	  var self = this;
	  replace(this._window, 'onpopstate', function(orig) {
	    return function() {
	      var current = self._location.href;
	      self.handleUrlChange(self._lastHref, current);
	      if (orig) {
	        orig.apply(this, arguments);
	      }
	    };
	  }, this.replacements, 'navigation');
	
	  replace(this._window.history, 'pushState', function(orig) {
	    return function() {
	      var url = arguments.length > 2 ? arguments[2] : undefined;
	      if (url) {
	        self.handleUrlChange(self._lastHref, url + '');
	      }
	      return orig.apply(this, arguments);
	    };
	  }, this.replacements, 'navigation');
	};
	
	Instrumenter.prototype.handleUrlChange = function(from, to) {
	  var parsedHref = urlparser.parse(this._location.href);
	  var parsedTo = urlparser.parse(to);
	  var parsedFrom = urlparser.parse(from);
	  this._lastHref = to;
	  if (parsedHref.protocol === parsedTo.protocol && parsedHref.host === parsedTo.host) {
	    to = parsedTo.path + (parsedTo.hash || '');
	  }
	  if (parsedHref.protocol === parsedFrom.protocol && parsedHref.host === parsedFrom.host) {
	    from = parsedFrom.path + (parsedFrom.hash || '');
	  }
	  this.telemeter.captureNavigation(from, to);
	};
	
	Instrumenter.prototype.deinstrumentConnectivity = function() {
	  if (!('addEventListener' in this._window || 'body' in this._document)) {
	    return;
	  }
	  if (this._window.addEventListener) {
	    this.removeListeners('connectivity');
	  } else {
	    restore(this.replacements, 'connectivity');
	  }
	};
	
	Instrumenter.prototype.instrumentConnectivity = function() {
	  if (!('addEventListener' in this._window || 'body' in this._document)) {
	    return;
	  }
	  if (this._window.addEventListener) {
	    this.addListener('connectivity', this._window, 'online', undefined, function() {
	      this.telemeter.captureConnectivityChange('online');
	    }.bind(this), true);
	    this.addListener('connectivity', this._window, 'offline', undefined, function() {
	      this.telemeter.captureConnectivityChange('offline');
	    }.bind(this), true);
	  } else {
	    var self = this;
	    replace(this._document.body, 'ononline', function(orig) {
	      return function() {
	        self.telemeter.captureConnectivityChange('online');
	        if (orig) {
	          orig.apply(this, arguments);
	        }
	      }
	    }, this.replacements, 'connectivity');
	    replace(this._document.body, 'onoffline', function(orig) {
	      return function() {
	        self.telemeter.captureConnectivityChange('offline');
	        if (orig) {
	          orig.apply(this, arguments);
	        }
	      }
	    }, this.replacements, 'connectivity');
	  }
	};
	
	Instrumenter.prototype.addListener = function(section, obj, type, altType, handler, capture) {
	  if (obj.addEventListener) {
	    obj.addEventListener(type, handler, capture);
	    this.eventRemovers[section].push(function() {
	      obj.removeEventListener(type, handler, capture);
	    });
	  } else if (altType) {
	    obj.attachEvent(altType, handler);
	    this.eventRemovers[section].push(function() {
	      obj.detachEvent(altType, handler);
	    });
	  }
	};
	
	Instrumenter.prototype.removeListeners = function(section) {
	  var r;
	  while (this.eventRemovers[section].length) {
	    r = this.eventRemovers[section].shift();
	    r();
	  }
	};
	
	module.exports = Instrumenter;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	function getElementType(e) {
	  return (e.getAttribute('type') || '').toLowerCase();
	}
	
	function isDescribedElement(element, type, subtypes) {
	  if (element.tagName.toLowerCase() !== type.toLowerCase()) {
	    return false;
	  }
	  if (!subtypes) {
	    return true;
	  }
	  element = getElementType(element);
	  for (var i = 0; i < subtypes.length; i++) {
	    if (subtypes[i] === element) {
	      return true;
	    }
	  }
	  return false;
	}
	
	function getElementFromEvent(evt, doc) {
	  if (evt.target) {
	    return evt.target;
	  }
	  if (doc && doc.elementFromPoint) {
	    return doc.elementFromPoint(evt.clientX, evt.clientY);
	  }
	  return undefined;
	}
	
	function treeToArray(elem) {
	  var MAX_HEIGHT = 5;
	  var out = [];
	  var nextDescription;
	  for (var height = 0; elem && height < MAX_HEIGHT; height++) {
	    nextDescription = describeElement(elem);
	    if (nextDescription.tagName === 'html') {
	      break;
	    }
	    out.unshift(nextDescription);
	    elem = elem.parentNode;
	  }
	  return out;
	}
	
	function elementArrayToString(a) {
	  var MAX_LENGTH = 80;
	  var separator = ' > ', separatorLength = separator.length;
	  var out = [], len = 0, nextStr, totalLength;
	
	  for (var i = a.length - 1; i >= 0; i--) {
	    nextStr = descriptionToString(a[i]);
	    totalLength = len + (out.length * separatorLength) + nextStr.length;
	    if (i < a.length - 1 && totalLength >= MAX_LENGTH + 3) {
	      out.unshift('...');
	      break;
	    }
	    out.unshift(nextStr);
	    len += nextStr.length;
	  }
	  return out.join(separator);
	}
	
	function descriptionToString(desc) {
	  if (!desc || !desc.tagName) {
	    return '';
	  }
	  var out = [desc.tagName];
	  if (desc.id) {
	    out.push('#' + desc.id);
	  }
	  if (desc.classes) {
	    out.push('.' + desc.classes.join('.'));
	  }
	  for (var i = 0; i < desc.attributes.length; i++) {
	    out.push('[' + desc.attributes[i].key + '="' + desc.attributes[i].value + '"]');
	  }
	
	  return out.join('');
	}
	
	/**
	 * Input: a dom element
	 * Output: null if tagName is falsey or input is falsey, else
	 *  {
	 *    tagName: String,
	 *    id: String | undefined,
	 *    classes: [String] | undefined,
	 *    attributes: [
	 *      {
	 *        key: OneOf(type, name, title, alt),
	 *        value: String
	 *      }
	 *    ]
	 *  }
	 */
	function describeElement(elem) {
	  if (!elem || !elem.tagName) {
	    return null;
	  }
	  var out = {}, className, key, attr, i;
	  out.tagName = elem.tagName.toLowerCase();
	  if (elem.id) {
	    out.id = elem.id;
	  }
	  className = elem.className;
	  if (className && (typeof className === 'string')) {
	    out.classes = className.split(/\s+/);
	  }
	  var attributes = ['type', 'name', 'title', 'alt'];
	  out.attributes = [];
	  for (i = 0; i < attributes.length; i++) {
	    key = attributes[i];
	    attr = elem.getAttribute(key);
	    if (attr) {
	      out.attributes.push({key: key, value: attr});
	    }
	  }
	  return out;
	}
	
	module.exports = {
	  describeElement: describeElement,
	  descriptionToString: descriptionToString,
	  elementArrayToString: elementArrayToString,
	  treeToArray: treeToArray,
	  getElementFromEvent: getElementFromEvent,
	  isDescribedElement: isDescribedElement,
	  getElementType: getElementType
	};


/***/ })
/******/ ])});;