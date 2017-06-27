(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* globals __USE_JSON__ */
	
	
	var globalnotifier = __webpack_require__(2);
	var notifier = __webpack_require__(3);
	
	
	function setupJSON() {
	  var JSONObject = typeof JSON === 'undefined' ? {} : JSON;
	
	  if (true) {
	    // This adds the script to this context. We need it since this library
	    // is not a CommonJs or AMD module.
	    var setupCustomJSON = __webpack_require__(11);
	
	    var customJSON = {};
	    setupCustomJSON(customJSON);
	
	    JSONObject = customJSON;
	  }
	
	  globalnotifier.setupJSON(JSONObject);
	}
	
	
	setupJSON();
	
	
	var config = window._rollbarConfig;
	var alias = config && config.globalAlias || 'Rollbar';
	var shimRunning = window[alias] && typeof window[alias].shimId !== 'undefined';
	
	
	/* We must not initialize the full notifier here if the
	 * shim is loaded, snippet_callback will do that for us
	 */
	if (!shimRunning && config) {
	  globalnotifier.wrapper.init(config);
	} else {
	  window.Rollbar = globalnotifier.wrapper;
	  // We need to expose Notifier for the snippet
	  window.RollbarNotifier = notifier.Notifier;
	}
	
	module.exports = globalnotifier.wrapper;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var notifier = __webpack_require__(3);
	var Util = __webpack_require__(8);
	
	var Notifier = notifier.Notifier;
	// Stub out the wrapped error which is set
	window._rollbarWrappedError = null;
	
	
	// Global window.onerror handler
	function _rollbarWindowOnError(client, old, args) {
	  if (!args[4] && window._rollbarWrappedError) {
	    args[4] = window._rollbarWrappedError;
	    window._rollbarWrappedError = null;
	  }
	
	  client.uncaughtError.apply(client, args);
	  if (old) {
	    old.apply(window, args);
	  }
	}
	
	
	function _extendListenerPrototype(client, prototype) {
	  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
	    var oldAddEventListener = prototype.addEventListener;
	    prototype.addEventListener = function(event, callback, bubble) {
	      oldAddEventListener.call(this, event, client.wrap(callback), bubble);
	    };
	
	    var oldRemoveEventListener = prototype.removeEventListener;
	    prototype.removeEventListener = function(event, callback, bubble) {
	      oldRemoveEventListener.call(this, event, callback && callback._wrapped || callback, bubble);
	    };
	  }
	}
	
	
	// Add an init() method to do the same things that the shim would do
	var wrapper = {};
	wrapper.init = function(config, parent) {
	  var client = new Notifier(parent);
	  client.configure(config);
	
	  if (config.captureUncaught) {
	    // Set the global onerror handler
	    var oldOnError;
	
	    // If the parent, probably a shim, stores an oldOnError function, use that one
	    if (parent && Util.isType(parent._rollbarOldOnError, 'function')) {
	      oldOnError = parent._rollbarOldOnError;
	    }
	    // If window.onerror doesn't belongs to our shim then we save it. This avoids
	    // using the shim onerror and send reports twice.
	    else if (window.onerror && !window.onerror.belongsToShim) {
	      oldOnError = window.onerror;
	    }
	
	    window.onerror = function() {
	      var args = Array.prototype.slice.call(arguments, 0);
	      _rollbarWindowOnError(client, oldOnError, args);
	    };
	
	    // Adapted from https://github.com/bugsnag/bugsnag-js
	    var globals = ['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource',
	     'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController',
	     'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue',
	     'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget',
	     'XMLHttpRequestUpload'];
	
	    var i;
	    var global;
	    for (i = 0; i < globals.length; ++i) {
	      global = globals[i];
	
	      if (window[global] && window[global].prototype) {
	        _extendListenerPrototype(client, window[global].prototype);
	      }
	    }
	  }
	
	  window.Rollbar = client;
	  // Finally, start processing payloads using the global notifier
	  Notifier.processPayloads();
	  return client;
	};
	
	
	module.exports = {
	  wrapper: wrapper,
	  setupJSON: notifier.setupJSON
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* globals __NOTIFIER_VERSION__ */
	/* globals __DEFAULT_ENDPOINT__ */
	/* globals __DEFAULT_SCRUB_FIELDS__ */
	/* globals __DEFAULT_LOG_LEVEL__ */
	/* globals __DEFAULT_REPORT_LEVEL__ */
	/* globals __DEFAULT_UNCAUGHT_ERROR_LEVEL */
	/* globals __DEFAULT_ITEMS_PER_MIN__ */
	/* globals __DEFAULT_MAX_ITEMS__ */
	/* globals DOMException */
	
	
	var extend = __webpack_require__(4);
	
	var errorParser = __webpack_require__(5);
	var Util = __webpack_require__(8);
	var xhr = __webpack_require__(10);
	
	var XHR = xhr.XHR;
	var RollbarJSON = null;
	
	function setupJSON(JSON) {
	  RollbarJSON = JSON;
	  xhr.setupJSON(JSON);
	}
	
	function _wrapNotifierFn(fn, ctx) {
	  return function() {
	    var self = ctx || this;
	    try {
	      return fn.apply(self, arguments);
	    } catch (e) {
	      console.error('[Rollbar]:', e);
	    }
	  };
	}
	
	
	var payloadProcessorTimeout;
	function _notifyPayloadAvailable() {
	  if (!payloadProcessorTimeout) {
	    payloadProcessorTimeout = setTimeout(_deferredPayloadProcess, 1000);
	  }
	}
	
	
	
	// Updated by the build process to match package.json
	Notifier.NOTIFIER_VERSION = ("1.8.2");
	Notifier.DEFAULT_ENDPOINT = ("api.rollbar.com/api/1/");
	Notifier.DEFAULT_SCRUB_FIELDS = (["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"]);
	Notifier.DEFAULT_LOG_LEVEL = ("debug");
	Notifier.DEFAULT_REPORT_LEVEL = ("debug");
	Notifier.DEFAULT_UNCAUGHT_ERROR_LEVEL = ("error");
	Notifier.DEFAULT_ITEMS_PER_MIN = (60);
	Notifier.DEFAULT_MAX_ITEMS = (0);
	
	Notifier.LEVELS = {
	  debug: 0,
	  info: 1,
	  warning: 2,
	  error: 3,
	  critical: 4
	};
	
	// This is the global queue where all notifiers will put their
	// payloads to be sent to Rollbar.
	window._rollbarPayloadQueue = window._rollbarPayloadQueue || [];
	
	// This contains global options for all Rollbar notifiers.
	window._globalRollbarOptions = {
	  startTime: (new Date()).getTime(),
	  maxItems: Notifier.DEFAULT_MAX_ITEMS,
	  itemsPerMinute: Notifier.DEFAULT_ITEMS_PER_MIN
	};
	
	var _topLevelNotifier;
	
	function topLevelNotifier() {
	  return _topLevelNotifier;
	}
	
	function Notifier(parentNotifier) {
	  // Save the first notifier so we can use it to send system messages like
	  // when the rate limit is reached.
	  _topLevelNotifier = _topLevelNotifier || this;
	
	  var endpoint = 'https://' + Notifier.DEFAULT_ENDPOINT;
	  this.options = {
	    enabled: true,
	    endpoint: endpoint,
	    environment: 'production',
	    scrubFields: extend([], Notifier.DEFAULT_SCRUB_FIELDS),
	    checkIgnore: null,
	    logLevel: Notifier.DEFAULT_LOG_LEVEL,
	    reportLevel: Notifier.DEFAULT_REPORT_LEVEL,
	    uncaughtErrorLevel: Notifier.DEFAULT_UNCAUGHT_ERROR_LEVEL,
	    payload: {}
	  };
	
	  this.lastError = null;
	  this.plugins = {};
	  this.parentNotifier = parentNotifier;
	
	  if (parentNotifier) {
	    // If the parent notifier has the shimId
	    // property it means that it's a Rollbar shim.
	    if (parentNotifier.hasOwnProperty('shimId')) {
	      // After we set this, the shim is just a proxy to this
	      // Notifier instance.
	      parentNotifier.notifier = this;
	    } else {
	      this.configure(parentNotifier.options);
	    }
	  }
	}
	
	
	var NotifierPrototype = Notifier.prototype;
	
	
	/*
	 * Returns an Object with keys:
	 * {
	 *  message: String,
	 *  err: Error,
	 *  custom: Object
	 * }
	 */
	NotifierPrototype._getLogArgs = function(args) {
	  var level = this.options.logLevel || Notifier.DEFAULT_LOG_LEVEL;
	  var message;
	  var err;
	  var custom;
	  var callback;
	  var argT;
	  var arg;
	  var extraArgs = [];
	
	  for (var i = 0; i < args.length; ++i) {
	    arg = args[i];
	
	    argT = Util.typeName(arg);
	    if (argT === 'string') {
	      if (message) {
	        extraArgs.push(arg);
	      } else {
	        message = arg;
	      }
	    } else if (argT === 'function') {
	      callback = _wrapNotifierFn(arg, this);  // wrap the callback in a try/catch block
	    } else if (argT === 'date') {
	      extraArgs.push(arg);
	    } else if (argT === 'error' ||
	               arg instanceof Error ||
	               (typeof DOMException !== 'undefined' && arg instanceof DOMException)) {
	      if (err) {
	        extraArgs.push(arg);
	      } else {
	        err = arg;
	      }
	    } else if (argT === 'object') {
	      if (custom) {
	        extraArgs.push(arg);
	      } else {
	        custom = arg;
	      }
	    }
	  }
	
	  // Save any of the extra arguments passed into the log function
	  // into `extraArgs` so they they show up in the payload.
	  if (extraArgs.length) {
	    custom = custom || {};
	    custom.extraArgs = extraArgs;
	  }
	
	  // TODO(cory): somehow pass in timestamp too...
	
	  return {
	    level: level,
	    message: message,
	    err: err,
	    custom: custom,
	    callback: callback
	  };
	};
	
	
	NotifierPrototype._route = function(path) {
	  var endpoint = this.options.endpoint;
	
	  var endpointTrailingSlash = /\/$/.test(endpoint);
	  var pathBeginningSlash = /^\//.test(path);
	
	  if (endpointTrailingSlash && pathBeginningSlash) {
	    path = path.substring(1);
	  } else if (!endpointTrailingSlash && !pathBeginningSlash) {
	    path = '/' + path;
	  }
	
	  return endpoint + path;
	};
	
	
	/*
	 * Given a queue containing each call to the shim, call the
	 * corresponding method on this instance.
	 *
	 * shim queue contains:
	 *
	 * {shim: Rollbar, method: 'info', args: ['hello world', exc], ts: Date}
	 */
	NotifierPrototype._processShimQueue = function(shimQueue) {
	  var shim;
	  var obj;
	  var method;
	  var args;
	  var shimToNotifier = {};
	  var parentShim;
	  var parentNotifier;
	  var notifier;
	
	  // For each of the messages in the shimQueue we need to:
	  // 1. get/create the notifier for that shim
	  // 2. apply the message to the notifier
	  while ((obj = shimQueue.shift())) {
	    shim = obj.shim;
	    method = obj.method;
	    args = obj.args;
	    parentShim = shim.parentShim;
	
	    // Get the current notifier based on the shimId
	    notifier = shimToNotifier[shim.shimId];
	    if (!notifier) {
	
	      // If there is no notifier associated with the shimId
	      // Check to see if there's a parent shim
	      if (parentShim) {
	
	        // If there is a parent shim, get the parent notifier
	        // and create a new notifier for the current shim.
	        parentNotifier = shimToNotifier[parentShim.shimId];
	
	        // Create a new Notifier which will process all of the shim's
	        // messages
	        notifier = new Notifier(parentNotifier);
	      } else {
	        // If there is no parent, assume the shim is the top
	        // level shim and thus, should use this as the notifier.
	        notifier = this;
	      }
	
	      // Save off the shimId->notifier mapping
	      shimToNotifier[shim.shimId] = notifier;
	    }
	
	    if (notifier[method] && Util.isType(notifier[method], 'function')) {
	      notifier[method].apply(notifier, args);
	    }
	  }
	};
	
	
	/*
	 * Builds and returns an Object that will be enqueued onto the
	 * window._rollbarPayloadQueue array to be sent to Rollbar.
	 */
	NotifierPrototype._buildPayload = function(ts, level, message, stackInfo, custom) {
	  var accessToken = this.options.accessToken;
	
	  // NOTE(cory): DEPRECATED
	  // Pass in {payload: {environment: 'production'}} instead of just {environment: 'production'}
	  var environment = this.options.environment;
	
	  var notifierOptions = extend(true, {}, this.options.payload);
	  var uuid = Util.uuid4();
	
	  if (Notifier.LEVELS[level] === undefined) {
	    throw new Error('Invalid level');
	  }
	
	  if (!message && !stackInfo && !custom) {
	    throw new Error('No message, stack info or custom data');
	  }
	
	  var payloadData = {
	    environment: environment,
	    endpoint: this.options.endpoint,
	    uuid: uuid,
	    level: level,
	    platform: 'browser',
	    framework: 'browser-js',
	    language: 'javascript',
	    body: this._buildBody(message, stackInfo, custom),
	    request: {
	      url: window.location.href,
	      query_string: window.location.search,
	      user_ip: '$remote_ip'
	    },
	    client: {
	      runtime_ms: ts.getTime() - window._globalRollbarOptions.startTime,
	      timestamp: Math.round(ts.getTime() / 1000),
	      javascript: {
	        browser: window.navigator.userAgent,
	        language: window.navigator.language,
	        cookie_enabled: window.navigator.cookieEnabled,
	        screen: {
	          width: window.screen.width,
	          height: window.screen.height
	        },
	        plugins: this._getBrowserPlugins()
	      }
	    },
	    server: {},
	    notifier: {
	      name: 'rollbar-browser-js',
	      version: Notifier.NOTIFIER_VERSION
	    }
	  };
	
	  if (notifierOptions.body) {
	    delete notifierOptions.body;
	  }
	
	  // Overwrite the options from configure() with the payload
	  // data.
	  var payload = {
	    access_token: accessToken,
	    data: extend(true, payloadData, notifierOptions)
	  };
	
	  // Only scrub the data section since we never want to scrub "access_token"
	  // even if it's in the scrub fields
	  this._scrub(payload.data);
	
	  return payload;
	};
	
	
	NotifierPrototype._buildBody = function(message, stackInfo, custom) {
	  var body;
	  if (stackInfo) {
	    body = _buildPayloadBodyTrace(message, stackInfo, custom);
	  } else {
	    body = _buildPayloadBodyMessage(message, custom);
	  }
	  return body;
	};
	
	
	NotifierPrototype._getBrowserPlugins = function() {
	  if (!this._browserPlugins) {
	    var navPlugins = window.navigator.plugins || [];
	    var cur;
	    var numPlugins = navPlugins.length;
	    var plugins = [];
	    var i;
	    for (i = 0; i < numPlugins; ++i) {
	      cur = navPlugins[i];
	      plugins.push({name: cur.name, description: cur.description});
	    }
	    this._browserPlugins = plugins;
	  }
	  return this._browserPlugins;
	};
	
	
	/*
	 * Does an in-place modification of obj such that:
	 * 1. All keys that match the notifier's options.scrubFields
	 *    list will be normalized into all '*'
	 * 2. Any query string params that match the same criteria will have
	 *    their values normalized as well.
	 */
	NotifierPrototype._scrub = function(obj) {
	  var scrubFields = this.options.scrubFields;
	  var paramRes = this._getScrubFieldRegexs(scrubFields);
	  var queryRes = this._getScrubQueryParamRegexs(scrubFields);
	
	  function redactQueryParam(dummy0, paramPart, dummy1, dummy2, dummy3, valPart) {
	    return paramPart + Util.redact(valPart);
	  }
	
	  function paramScrubber(v) {
	    var i;
	    if (Util.isType(v, 'string')) {
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
	        v = Util.redact(v);
	        break;
	      }
	    }
	    return v;
	  }
	
	  function scrubber(k, v) {
	    var tmpV = valScrubber(k, v);
	    if (tmpV === v) {
	      return paramScrubber(tmpV);
	    } else {
	      return tmpV;
	    }
	  }
	
	  Util.traverse(obj, scrubber);
	  return obj;
	};
	
	
	NotifierPrototype._getScrubFieldRegexs = function(scrubFields) {
	  var ret = [];
	  var pat;
	  for (var i = 0; i < scrubFields.length; ++i) {
	    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
	    ret.push(new RegExp(pat, 'i'));
	  }
	  return ret;
	};
	
	
	NotifierPrototype._getScrubQueryParamRegexs = function(scrubFields) {
	  var ret = [];
	  var pat;
	  for (var i = 0; i < scrubFields.length; ++i) {
	    pat = '\\[?(%5[bB])?' + scrubFields[i] + '\\[?(%5[bB])?\\]?(%5[dD])?';
	    ret.push(new RegExp('(' + pat + '=)([^&\\n]+)', 'igm'));
	  }
	  return ret;
	};
	
	NotifierPrototype._urlIsWhitelisted = function(payload){
	  var whitelist, trace, frame, filename, frameLength, url, listLength, urlRegex;
	  var i, j;
	
	  try {
	    whitelist = this.options.hostWhiteList;
	    trace = payload && payload.data && payload.data.body && payload.data.body.trace;
	
	    if (!whitelist || whitelist.length === 0) { return true; }
	    if (!trace) { return true; }
	
	    listLength = whitelist.length;
	    frameLength = trace.frames.length;
	    for (i = 0; i < frameLength; i++) {
	      frame = trace.frames[i];
	      filename = frame.filename;
	
	      if (!Util.isType(filename, 'string')) {
	        return true;
	      }
	
	      for (j = 0; j < listLength; j++) {
	        url = whitelist[j];
	        urlRegex = new RegExp(url);
	
	        if (urlRegex.test(filename)){
	          return true;
	        }
	      }
	    }
	  } catch (e) {
	    this.configure({hostWhiteList: null});
	    console.error("[Rollbar]: Error while reading your configuration's hostWhiteList option. Removing custom hostWhiteList.", e);
	    return true;
	  }
	
	  return false;
	};
	
	NotifierPrototype._messageIsIgnored = function(payload){
	  var exceptionMessage, i, ignoredMessages, len, messageIsIgnored, rIgnoredMessage, trace;
	  try {
	    messageIsIgnored = false;
	    ignoredMessages = this.options.ignoredMessages;
	    trace = payload && payload.data && payload.data.body && payload.data.body.trace;
	
	    if (!ignoredMessages || ignoredMessages.length === 0) {
	      return false;
	    }
	
	    if (!trace) {
	      return false;
	    }
	
	    exceptionMessage = trace.exception.message;
	
	    len = ignoredMessages.length;
	    for (i = 0; i < len; i++) {
	      rIgnoredMessage = new RegExp(ignoredMessages[i], 'gi');
	      messageIsIgnored = rIgnoredMessage.test(exceptionMessage);
	
	      if (messageIsIgnored) {
	        break;
	      }
	    }
	  }
	  catch(e) {
	    this.configure({ignoredMessages: null});
	    console.error("[Rollbar]: Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.");
	  }
	
	  return messageIsIgnored;
	};
	
	NotifierPrototype._enqueuePayload = function(payload, isUncaught, callerArgs, callback) {
	
	  var payloadToSend = {
	    callback: callback,
	    accessToken: this.options.accessToken,
	    endpointUrl: this._route('item/'),
	    payload: payload
	  };
	
	  var ignoredCallback = function() {
	    if (callback) {
	      // If the item was ignored call the callback anyway
	      var msg = 'This item was not sent to Rollbar because it was ignored. ' +
	                'This can happen if a custom checkIgnore() function was used ' +
	                'or if the item\'s level was less than the notifier\' reportLevel. ' +
	                'See https://rollbar.com/docs/notifier/rollbar.js/configuration for more details.';
	
	      callback(null, {err: 0, result: {id: null, uuid: null, message: msg}});
	    }
	  };
	
	  // Internal checkIgnore will check the level against the minimum
	  // report level from this.options
	  if (this._internalCheckIgnore(isUncaught, callerArgs, payload)) {
	    ignoredCallback();
	    return;
	  }
	
	  // Users can set their own ignore criteria using this.options.checkIgnore()
	  try {
	    if (Util.isType(this.options.checkIgnore, 'function') &&
	        this.options.checkIgnore(isUncaught, callerArgs, payload)) {
	      ignoredCallback();
	      return;
	    }
	  } catch (e) {
	    // Disable the custom checkIgnore and report errors in the checkIgnore function
	    this.configure({checkIgnore: null});
	    console.error('[Rollbar]: Error while calling custom checkIgnore() function. Removing custom checkIgnore().', e);
	  }
	
	  if (!this._urlIsWhitelisted(payload)) {
	    return;
	  }
	
	  if (this._messageIsIgnored(payload)) {
	    return;
	  }
	
	  if (this.options.verbose) {
	    if (payload.data && payload.data.body && payload.data.body.trace) {
	      var trace = payload.data.body.trace;
	      var exceptionMessage = trace.exception.message;
	      console.error('[Rollbar]: ', exceptionMessage);
	    }
	
	    // FIXME: Some browsers do not output objects as json to the console, and
	    // instead write [object Object], so let's write the message first to ensure that is logged.
	    console.info('[Rollbar]: ', payloadToSend);
	  }
	
	  if (Util.isType(this.options.logFunction, 'function')) {
	    this.options.logFunction(payloadToSend);
	  }
	
	  try {
	    if (Util.isType(this.options.transform, 'function')) {
	      this.options.transform(payload);
	    }
	  } catch (e) {
	    this.configure({transform: null});
	    console.error('[Rollbar]: Error while calling custom transform() function. Removing custom transform().', e);
	  }
	
	  if (this.options.enabled) {
	    window._rollbarPayloadQueue.push(payloadToSend);
	
	    _notifyPayloadAvailable();
	  }
	};
	
	
	NotifierPrototype._internalCheckIgnore = function(isUncaught, callerArgs, payload) {
	  var level = callerArgs[0];
	  var levelVal = Notifier.LEVELS[level] || 0;
	  var reportLevel = Notifier.LEVELS[this.options.reportLevel] || 0;
	
	  if (levelVal < reportLevel) {
	    return true;
	  }
	
	  var plugins = this.options ? this.options.plugins : {};
	  if (plugins && plugins.jquery && plugins.jquery.ignoreAjaxErrors) {
	    try {
	      // The jQuery plugin adds in this key. Return true if it exists since
	      // we are ignoring ajax errors via the plugin config.
	      return !!(payload.data.body.message.extra.isAjax);
	    } catch (e) {
	      return false;
	    }
	  }
	
	  return false;
	};
	
	
	/*
	 * Logs stuff to Rollbar using the default
	 * logging level.
	 *
	 * Can be called with the following, (order doesn't matter but type does):
	 * - message: String
	 * - err: Error object, must have a .stack property or it will be
	 *   treated as custom data
	 * - custom: Object containing custom data to be sent along with
	 *   the item
	 * - callback: Function to call once the item is reported to Rollbar
	 * - isUncaught: True if this error originated from an uncaught exception handler
	 * - ignoreRateLimit: True if this item should be allowed despite rate limit checks
	 */
	NotifierPrototype._log = function(level, message, err, custom, callback, isUncaught, ignoreRateLimit) {
	  var stackInfo = null;
	  if (err) {
	    try {
	      // If we've already calculated the stack trace for the error, use it.
	      // This can happen for wrapped errors that don't have a "stack" property.
	      stackInfo = err._savedStackTrace ? err._savedStackTrace : errorParser.parse(err);
	
	      // Don't report the same error more than once
	      if (err === this.lastError) {
	        return;
	      }
	
	      this.lastError = err;
	    } catch (e) {
	      console.error('[Rollbar]: Error while parsing the error object.', e);
	      // err is not something we can parse so let's just send it along as a string
	      message = err.message || err.description || message || String(err);
	      err = null;
	    }
	  }
	
	  var payload = this._buildPayload(new Date(), level, message, stackInfo, custom);
	  if (ignoreRateLimit) {
	    payload.ignoreRateLimit = true;
	  }
	  this._enqueuePayload(payload, isUncaught ? true : false, [level, message, err, custom], callback);
	};
	
	NotifierPrototype.log = _generateLogFn();
	NotifierPrototype.debug = _generateLogFn('debug');
	NotifierPrototype.info = _generateLogFn('info');
	NotifierPrototype.warn = _generateLogFn('warning'); // for console.warn() compatibility
	NotifierPrototype.warning = _generateLogFn('warning');
	NotifierPrototype.error = _generateLogFn('error');
	NotifierPrototype.critical = _generateLogFn('critical');
	
	// Adapted from tracekit.js
	NotifierPrototype.uncaughtError = _wrapNotifierFn(function(message, url, lineNo, colNo, err, context) {
	  context = context || null;
	  if (err && Util.isType(err, 'error')) {
	    this._log(this.options.uncaughtErrorLevel, message, err, context, null, true);
	    return;
	  }
	
	  // NOTE(cory): sometimes users will trigger an "error" event
	  // on the window object directly which will result in errMsg
	  // being an Object instead of a string.
	  //
	  if (url && Util.isType(url, 'error')) {
	    this._log(this.options.uncaughtErrorLevel, message, url, context, null, true);
	    return;
	  }
	
	  var location = {
	    'url': url || '',
	    'line': lineNo
	  };
	  location.func = errorParser.guessFunctionName(location.url, location.line);
	  location.context = errorParser.gatherContext(location.url, location.line);
	  var stack = {
	    'mode': 'onerror',
	    'message': err ? String(err) : (message || 'uncaught exception'),
	    'url': document.location.href,
	    'stack': [location],
	    'useragent': navigator.userAgent
	  };
	
	  var payload = this._buildPayload(new Date(), this.options.uncaughtErrorLevel,
	    message, stack, context);
	  this._enqueuePayload(payload, true, [this.options.uncaughtErrorLevel,
	    message, url, lineNo, colNo, err]);
	});
	
	
	NotifierPrototype.global = _wrapNotifierFn(function(options) {
	  options = options || {};
	  var knownOptions = {
	    startTime: options.startTime,
	    maxItems: options.maxItems,
	    itemsPerMinute: options.itemsPerMinute
	  };
	
	  extend(true, window._globalRollbarOptions, knownOptions);
	
	  if (options.maxItems !== undefined) {
	    rateLimitCounter = 0;
	  }
	
	  if (options.itemsPerMinute !== undefined) {
	    rateLimitPerMinCounter = 0;
	  }
	});
	
	
	NotifierPrototype.configure = _wrapNotifierFn(function(options) {
	  // TODO(cory): only allow non-payload keys that we understand
	
	  // Make a copy of the options object for this notifier
	  var newOptionsCopy = extend(true, {}, options);
	  extend(false, this.options, newOptionsCopy);
	  this.global(newOptionsCopy);
	});
	
	/*
	 * Create a new Notifier instance which has the same options
	 * as the current notifier + options to override them.
	 */
	NotifierPrototype.scope = _wrapNotifierFn(function(payloadOptions) {
	  var scopedNotifier = new Notifier(this);
	  extend(true, scopedNotifier.options.payload, payloadOptions);
	  return scopedNotifier;
	});
	
	NotifierPrototype.wrap = function(f, context) {
	  try {
	    var ctxFn;
	    if (Util.isType(context, 'function')) {
	      ctxFn = context;
	    } else {
	      ctxFn = function() {
	        return context || {};
	      };
	    }
	
	    if (!Util.isType(f, 'function')) {
	      return f;
	    }
	
	    // If the given function is already a wrapped function, just
	    // return it instead of wrapping twice
	    if (f._isWrap) {
	      return f;
	    }
	
	    if (!f._wrapped) {
	      f._wrapped = function () {
	        try {
	          return f.apply(this, arguments);
	        } catch(e) {
	          if (!e.stack) {
	            e._savedStackTrace = errorParser.parse(e);
	          }
	          e._rollbarContext = ctxFn() || {};
	          e._rollbarContext._wrappedSource = f.toString();
	
	          window._rollbarWrappedError = e;
	          throw e;
	        }
	      };
	
	      f._wrapped._isWrap = true;
	
	      for (var prop in f) {
	        if (f.hasOwnProperty(prop)) {
	          f._wrapped[prop] = f[prop];
	        }
	      }
	    }
	
	    return f._wrapped;
	  } catch (e) {
	    // Try-catch here is to work around issue where wrap() fails when used inside Selenium.
	    // Return the original function if the wrap fails.
	    return f;
	  }
	};
	
	
	NotifierPrototype.loadFull = function() {
	  console.error('[Rollbar]: Unexpected Rollbar.loadFull() called on a Notifier instance');
	};
	
	
	/***** Misc *****/
	
	function _generateLogFn(level) {
	  return _wrapNotifierFn(function _logFn() {
	    var args = this._getLogArgs(arguments);
	
	    return this._log(level || args.level || this.options.logLevel || Notifier.DEFAULT_LOG_LEVEL,
	      args.message, args.err, args.custom, args.callback);
	  });
	}
	
	
	function _buildPayloadBodyMessage(message, custom) {
	  if (!message) {
	    if (custom) {
	      message = RollbarJSON.stringify(custom);
	    } else {
	      message = '';
	    }
	  }
	  var result = {
	    body: message
	  };
	
	  if (custom) {
	    result.extra = extend(true, {}, custom);
	  }
	
	  return {
	    message: result
	  };
	}
	
	
	function _buildPayloadBodyTrace(description, stackInfo, custom) {
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
	    trace.exception.description = description || 'uncaught exception';
	  }
	
	  // Transform a TraceKit stackInfo object into a Rollbar trace
	  if (stackInfo.stack) {
	    var stackFrame;
	    var frame;
	    var code;
	    var pre;
	    var post;
	    var contextLength;
	    var i, mid;
	
	    trace.frames = [];
	    for (i = 0; i < stackInfo.stack.length; ++i) {
	      stackFrame = stackInfo.stack[i];
	      frame = {
	        filename: stackFrame.url ? Util.sanitizeUrl(stackFrame.url) : '(unknown)',
	        lineno: stackFrame.line || null,
	        method: (!stackFrame.func || stackFrame.func === '?') ? '[anonymous]' : stackFrame.func,
	        colno: stackFrame.column
	      };
	
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
	      trace.extra = extend(true, {}, custom);
	    }
	    return {trace: trace};
	  } else {
	    // no frames - not useful as a trace. just report as a message.
	    return _buildPayloadBodyMessage(className + ': ' + message, custom);
	  }
	}
	
	
	/***** Payload processor *****/
	
	
	Notifier.processPayloads = function(immediate) {
	  if (immediate) {
	    _deferredPayloadProcess();
	
	    return;
	  }
	
	  _notifyPayloadAvailable();
	};
	
	
	function _deferredPayloadProcess() {
	  var payloadObj;
	
	  try {
	    while ((payloadObj = window._rollbarPayloadQueue.shift())) {
	      _processPayload(payloadObj.endpointUrl, payloadObj.accessToken, payloadObj.payload, payloadObj.callback);
	    }
	  } finally {
	    payloadProcessorTimeout = undefined;
	  }
	}
	
	
	var rateLimitStartTime = new Date().getTime();
	var rateLimitCounter = 0;
	var rateLimitPerMinCounter = 0;
	function _processPayload(url, accessToken, payload, callback) {
	  callback = callback || function cb() {};
	  var now = new Date().getTime();
	  if (now - rateLimitStartTime >= 60000) {
	    rateLimitStartTime = now;
	    rateLimitPerMinCounter = 0;
	  }
	
	  // Check to see if we have a rate limit set or if
	  // the rate limit has been met/exceeded.
	  var globalRateLimit = window._globalRollbarOptions.maxItems;
	  var globalRateLimitPerMin = window._globalRollbarOptions.itemsPerMinute;
	  var checkOverRateLimit = function() { return !payload.ignoreRateLimit && globalRateLimit >= 1 && rateLimitCounter >= globalRateLimit; };
	  var checkOverRateLimitPerMin = function() { return !payload.ignoreRateLimit && globalRateLimitPerMin >= 1 && rateLimitPerMinCounter >= globalRateLimitPerMin; };
	
	  if (checkOverRateLimit()) {
	    callback(new Error(globalRateLimit + ' max items reached'));
	    return;
	  } else if (checkOverRateLimitPerMin()) {
	    callback(new Error(globalRateLimitPerMin + ' items per minute reached'));
	    return;
	  } else {
	    rateLimitCounter++;
	    rateLimitPerMinCounter++;
	
	    // Check to see if we have just reached the rate limit. If so, notify the customer.
	    if (checkOverRateLimit()) {
	      _topLevelNotifier._log(_topLevelNotifier.options.uncaughtErrorLevel, //level
	          'maxItems has been hit. Ignoring errors for the remainder of the current page load.', // message
	          null, // err
	          {maxItems: globalRateLimit}, // custom
	          null,  // callback
	          false, // isUncaught
	          true); // ignoreRateLimit
	    }
	    // remove this key since it's only used for internal notifier logic
	    if (payload.ignoreRateLimit) {
	      delete payload.ignoreRateLimit;
	    }
	  }
	
	  // There's either no rate limit or we haven't met it yet so
	  // go ahead and send it.
	  XHR.post(url, accessToken, payload, function xhrCallback(err, resp) {
	    if (err) {
	      return callback(err);
	    }
	
	    // TODO(cory): parse resp as JSON
	    return callback(null, resp);
	  });
	
	}
	
	
	module.exports = {
	  Notifier: Notifier,
	  setupJSON: setupJSON,
	  topLevelNotifier: topLevelNotifier
	};
	


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ErrorStackParser = __webpack_require__(6);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(9);
	
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
	
	
	function typeName(obj) {
	  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	}
	
	
	function isType(obj, name) {
	  return typeName(obj) === name;
	}
	
	
	function parseUri(str) {
	  if (!isType(str, 'string')) {
	    throw new Error('received invalid input');
	  }
	
	  var o = parseUriOptions;
	  var m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str);
	  var uri = {};
	  var i = 14;
	
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
	
	
	function sanitizeUrl(url) {
	  var baseUrlParts = parseUri(url);
	  // remove a trailing # if there is no anchor
	  if (baseUrlParts.anchor === '') {
	    baseUrlParts.source = baseUrlParts.source.replace('#', '');
	  }
	
	  url = baseUrlParts.source.replace('?' + baseUrlParts.query, '');
	  return url;
	}
	
	
	function traverse(obj, func) {
	  var k;
	  var v;
	  var i;
	  var isObj = isType(obj, 'object');
	  var isArray = isType(obj, 'array');
	  var keys = [];
	
	  if (isObj) {
	    for (k in obj) {
	      if (obj.hasOwnProperty(k)) {
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
	    isObj = isType(v, 'object');
	    isArray = isType(v, 'array');
	    if (isObj || isArray) {
	      obj[k] = traverse(v, func);
	    } else {
	      obj[k] = func(k, v);
	    }
	  }
	
	  return obj;
	}
	
	
	function redact(val) {
	  val = String(val);
	  return new Array(val.length + 1).join('*');
	}
	
	
	// from http://stackoverflow.com/a/8809472/1138191
	function uuid4() {
	  var d = new Date().getTime();
	  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
	  });
	  return uuid;
	}
	
	
	var Util = {
	  isType: isType,
	  parseUri: parseUri,
	  parseUriOptions: parseUriOptions,
	  redact: redact,
	  sanitizeUrl: sanitizeUrl,
	  traverse: traverse,
	  typeName: typeName,
	  uuid4: uuid4
	};
	
	
	module.exports = Util;


/***/ },
/* 9 */
/***/ function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(global) {
	  'use strict';
	  global.console = global.console || {};
	  var con = global.console;
	  var prop, method;
	  var empty = {};
	  var dummy = function() {};
	  var properties = 'memory'.split(',');
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
	  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
	})(typeof window === 'undefined' ? this : window);
	// Using `this` for web workers while maintaining compatibility with browser
	// targeted script loaders such as Browserify or Webpack where the only way to
	// get to the global object is via `window`.


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/* globals ActiveXObject */
	
	var Util = __webpack_require__(8);
	
	var RollbarJSON = null;
	
	function setupJSON(JSON) {
	  RollbarJSON = JSON;
	}
	
	var XHR = {
	  XMLHttpFactories: [
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
	  ],
	  createXMLHTTPObject: function() {
	    var xmlhttp = false;
	    var factories = XHR.XMLHttpFactories;
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
	  },
	  post: function(url, accessToken, payload, callback) {
	    if (!Util.isType(payload, 'object')) {
	      throw new Error('Expected an object to POST');
	    }
	    payload = RollbarJSON.stringify(payload);
	    callback = callback || function() {};
	    var request = XHR.createXMLHTTPObject();
	    if (request) {
	      try {
	        try {
	          var onreadystatechange = function() {
	            try {
	              if (onreadystatechange && request.readyState === 4) {
	                onreadystatechange = undefined;
	
	                // TODO(cory): have the notifier log an internal error on non-200 response codes
	                if (request.status === 200) {
	                  callback(null, RollbarJSON.parse(request.responseText));
	                } else if (Util.isType(request.status, 'number') &&
	                            request.status >= 400 && request.status < 600) {
	                  // return valid http status codes
	                  callback(new Error(String(request.status)));
	                } else {
	                  // IE will return a status 12000+ on some sort of connection failure,
	                  // so we return a blank error
	                  // http://msdn.microsoft.com/en-us/library/aa383770%28VS.85%29.aspx
	                  callback(new Error());
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
	
	          request.open('POST', url, true);
	          if (request.setRequestHeader) {
	            request.setRequestHeader('Content-Type', 'application/json');
	            request.setRequestHeader('X-Rollbar-Access-Token', accessToken);
	          }
	          request.onreadystatechange = onreadystatechange;
	          request.send(payload);
	        } catch (e1) {
	          // Sending using the normal xmlhttprequest object didn't work, try XDomainRequest
	          if (typeof XDomainRequest !== 'undefined') {
	
	            // Assume we are in a really old browser which has a bunch of limitations:
	            // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	
	            // If the current page is http, try and send over http
	            if (window.location.href.substring(0, 5) === 'http:' && url.substring(0, 5) === 'https') {
	              url = 'http' + url.substring(5);
	            }
	
	            var ontimeout = function() {
	              callback(new Error('Request timed out'));
	            };
	
	            var onerror = function() {
	              callback(new Error('Error during request'));
	            };
	
	            var onload = function() {
	              callback(null, RollbarJSON.parse(request.responseText));
	            };
	
	            request = new XDomainRequest();
	            request.onprogress = function() {};
	            request.ontimeout = ontimeout;
	            request.onerror = onerror;
	            request.onload = onload;
	            request.open('POST', url, true);
	            request.send(payload);
	          }
	        }
	      } catch (e2) {
	        callback(e2);
	      }
	    }
	  }
	};
	
	module.exports = {
	  XHR: XHR,
	  setupJSON: setupJSON
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	/*
	    json2.js
	    2013-05-26
	
	    Public Domain.
	
	    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	
	    See http://www.JSON.org/js.html
	
	
	    This code should be minified before deployment.
	    See http://javascript.crockford.com/jsmin.html
	
	    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
	    NOT CONTROL.
	
	
	    This file creates a global JSON object containing two methods: stringify
	    and parse.
	
	        JSON.stringify(value, replacer, space)
	            value       any JavaScript value, usually an object or array.
	
	            replacer    an optional parameter that determines how object
	                        values are stringified for objects. It can be a
	                        function or an array of strings.
	
	            space       an optional parameter that specifies the indentation
	                        of nested structures. If it is omitted, the text will
	                        be packed without extra whitespace. If it is a number,
	                        it will specify the number of spaces to indent at each
	                        level. If it is a string (such as '\t' or '&nbsp;'),
	                        it contains the characters used to indent at each level.
	
	            This method produces a JSON text from a JavaScript value.
	
	            When an object value is found, if the object contains a toJSON
	            method, its toJSON method will be called and the result will be
	            stringified. A toJSON method does not serialize: it returns the
	            value represented by the name/value pair that should be serialized,
	            or undefined if nothing should be serialized. The toJSON method
	            will be passed the key associated with the value, and this will be
	            bound to the value
	
	            For example, this would serialize Dates as ISO strings.
	
	                Date.prototype.toJSON = function (key) {
	                    function f(n) {
	                        // Format integers to have at least two digits.
	                        return n < 10 ? '0' + n : n;
	                    }
	
	                    return this.getUTCFullYear()   + '-' +
	                         f(this.getUTCMonth() + 1) + '-' +
	                         f(this.getUTCDate())      + 'T' +
	                         f(this.getUTCHours())     + ':' +
	                         f(this.getUTCMinutes())   + ':' +
	                         f(this.getUTCSeconds())   + 'Z';
	                };
	
	            You can provide an optional replacer method. It will be passed the
	            key and value of each member, with this bound to the containing
	            object. The value that is returned from your method will be
	            serialized. If your method returns undefined, then the member will
	            be excluded from the serialization.
	
	            If the replacer parameter is an array of strings, then it will be
	            used to select the members to be serialized. It filters the results
	            such that only members with keys listed in the replacer array are
	            stringified.
	
	            Values that do not have JSON representations, such as undefined or
	            functions, will not be serialized. Such values in objects will be
	            dropped; in arrays they will be replaced with null. You can use
	            a replacer function to replace those with JSON values.
	            JSON.stringify(undefined) returns undefined.
	
	            The optional space parameter produces a stringification of the
	            value that is filled with line breaks and indentation to make it
	            easier to read.
	
	            If the space parameter is a non-empty string, then that string will
	            be used for indentation. If the space parameter is a number, then
	            the indentation will be that many spaces.
	
	            Example:
	
	            text = JSON.stringify(['e', {pluribus: 'unum'}]);
	            // text is '["e",{"pluribus":"unum"}]'
	
	
	            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
	            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'
	
	            text = JSON.stringify([new Date()], function (key, value) {
	                return this[key] instanceof Date ?
	                    'Date(' + this[key] + ')' : value;
	            });
	            // text is '["Date(---current time---)"]'
	
	
	        JSON.parse(text, reviver)
	            This method parses a JSON text to produce an object or array.
	            It can throw a SyntaxError exception.
	
	            The optional reviver parameter is a function that can filter and
	            transform the results. It receives each of the keys and values,
	            and its return value is used instead of the original value.
	            If it returns what it received, then the structure is not modified.
	            If it returns undefined then the member is deleted.
	
	            Example:
	
	            // Parse the text. Values that look like ISO date strings will
	            // be converted to Date objects.
	
	            myData = JSON.parse(text, function (key, value) {
	                var a;
	                if (typeof value === 'string') {
	                    a =
	/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
	                    if (a) {
	                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
	                            +a[5], +a[6]));
	                    }
	                }
	                return value;
	            });
	
	            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
	                var d;
	                if (typeof value === 'string' &&
	                        value.slice(0, 5) === 'Date(' &&
	                        value.slice(-1) === ')') {
	                    d = new Date(value.slice(5, -1));
	                    if (d) {
	                        return d;
	                    }
	                }
	                return value;
	            });
	
	
	    This is a reference implementation. You are free to copy, modify, or
	    redistribute.
	*/
	
	/*jslint evil: true, regexp: true */
	
	/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
	    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
	    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
	    lastIndex, length, parse, prototype, push, replace, slice, stringify,
	    test, toJSON, toString, valueOf
	*/
	
	var setupCustomJSON = function(JSON) {
	    function f(n) {
	        // Format integers to have at least two digits.
	        return n < 10 ? '0' + n : n;
	    }
	
	    if (typeof Date.prototype.toJSON !== 'function') {
	
	        Date.prototype.toJSON = function () {
	
	            return isFinite(this.valueOf())
	                ? this.getUTCFullYear()     + '-' +
	                    f(this.getUTCMonth() + 1) + '-' +
	                    f(this.getUTCDate())      + 'T' +
	                    f(this.getUTCHours())     + ':' +
	                    f(this.getUTCMinutes())   + ':' +
	                    f(this.getUTCSeconds())   + 'Z'
	                : null;
	        };
	
	        String.prototype.toJSON      =
	            Number.prototype.toJSON  =
	            Boolean.prototype.toJSON = function () {
	                return this.valueOf();
	            };
	    }
	
	    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	        gap,
	        indent,
	        meta = {    // table of character substitutions
	            '\b': '\\b',
	            '\t': '\\t',
	            '\n': '\\n',
	            '\f': '\\f',
	            '\r': '\\r',
	            '"' : '\\"',
	            '\\': '\\\\'
	        },
	        rep;
	
	
	    function quote(string) {
	
	// If the string contains no control characters, no quote characters, and no
	// backslash characters, then we can safely slap some quotes around it.
	// Otherwise we must also replace the offending characters with safe escape
	// sequences.
	
	        escapable.lastIndex = 0;
	        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
	            var c = meta[a];
	            return typeof c === 'string'
	                ? c
	                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	        }) + '"' : '"' + string + '"';
	    }
	
	
	    function str(key, holder) {
	
	// Produce a string from holder[key].
	
	        var i,          // The loop counter.
	            k,          // The member key.
	            v,          // The member value.
	            length,
	            mind = gap,
	            partial,
	            value = holder[key];
	
	// If we were called with a replacer function, then call the replacer to
	// obtain a replacement value.
	
	        if (typeof rep === 'function') {
	            value = rep.call(holder, key, value);
	        }
	
	// What happens next depends on the value's type.
	
	        switch (typeof value) {
	        case 'string':
	            return quote(value);
	
	        case 'number':
	
	// JSON numbers must be finite. Encode non-finite numbers as null.
	
	            return isFinite(value) ? String(value) : 'null';
	
	        case 'boolean':
	        case 'null':
	
	// If the value is a boolean or null, convert it to a string. Note:
	// typeof null does not produce 'null'. The case is included here in
	// the remote chance that this gets fixed someday.
	
	            return String(value);
	
	// If the type is 'object', we might be dealing with an object or an array or
	// null.
	
	        case 'object':
	
	// Due to a specification blunder in ECMAScript, typeof null is 'object',
	// so watch out for that case.
	
	            if (!value) {
	                return 'null';
	            }
	
	// Make an array to hold the partial results of stringifying this object value.
	
	            gap += indent;
	            partial = [];
	
	// Is the value an array?
	
	            if (Object.prototype.toString.apply(value) === '[object Array]') {
	
	// The value is an array. Stringify every element. Use null as a placeholder
	// for non-JSON values.
	
	                length = value.length;
	                for (i = 0; i < length; i += 1) {
	                    partial[i] = str(i, value) || 'null';
	                }
	
	// Join all of the elements together, separated with commas, and wrap them in
	// brackets.
	
	                v = partial.length === 0
	                    ? '[]'
	                    : gap
	                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                    : '[' + partial.join(',') + ']';
	                gap = mind;
	                return v;
	            }
	
	// If the replacer is an array, use it to select the members to be stringified.
	
	            if (rep && typeof rep === 'object') {
	                length = rep.length;
	                for (i = 0; i < length; i += 1) {
	                    if (typeof rep[i] === 'string') {
	                        k = rep[i];
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            } else {
	
	// Otherwise, iterate through all of the keys in the object.
	
	                for (k in value) {
	                    if (Object.prototype.hasOwnProperty.call(value, k)) {
	                        v = str(k, value);
	                        if (v) {
	                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                        }
	                    }
	                }
	            }
	
	// Join all of the member texts together, separated with commas,
	// and wrap them in braces.
	
	            v = partial.length === 0
	                ? '{}'
	                : gap
	                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                : '{' + partial.join(',') + '}';
	            gap = mind;
	            return v;
	        }
	    }
	
	// If the JSON object does not yet have a stringify method, give it one.
	
	    if (typeof JSON.stringify !== 'function') {
	        JSON.stringify = function (value, replacer, space) {
	
	// The stringify method takes a value and an optional replacer, and an optional
	// space parameter, and returns a JSON text. The replacer can be a function
	// that can replace values, or an array of strings that will select the keys.
	// A default replacer method can be provided. Use of the space parameter can
	// produce text that is more easily readable.
	
	            var i;
	            gap = '';
	            indent = '';
	
	// If the space parameter is a number, make an indent string containing that
	// many spaces.
	
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }
	
	// If the space parameter is a string, it will be used as the indent string.
	
	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	
	// If there is a replacer, it must be a function or an array.
	// Otherwise, throw an error.
	
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                    typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	
	// Make a fake root object containing our value under the key of ''.
	// Return the result of stringifying the value.
	
	            return str('', {'': value});
	        };
	    }
	
	
	// If the JSON object does not yet have a parse method, give it one.
	
	    if (typeof JSON.parse !== 'function') {
	        JSON.parse = function (text, reviver) {
	
	// The parse method takes a text and an optional reviver function, and returns
	// a JavaScript value if the text is a valid JSON text.
	
	            var j;
	
	            function walk(holder, key) {
	
	// The walk method is used to recursively walk the resulting structure so
	// that modifications can be made.
	
	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }
	
	
	// Parsing happens in four stages. In the first stage, we replace certain
	// Unicode characters with escape sequences. JavaScript handles many characters
	// incorrectly, either silently deleting them, or treating them as line endings.
	
	            text = String(text);
	            cx.lastIndex = 0;
	            if (cx.test(text)) {
	                text = text.replace(cx, function (a) {
	                    return '\\u' +
	                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
	
	// In the second stage, we run the text against regular expressions that look
	// for non-JSON patterns. We are especially concerned with '()' and 'new'
	// because they can cause invocation, and '=' because it can cause mutation.
	// But just to be safe, we want to reject all unexpected forms.
	
	// We split the second stage into 4 regexp operations in order to work around
	// crippling inefficiencies in IE's and Safari's regexp engines. First we
	// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
	// replace all simple value tokens with ']' characters. Third, we delete all
	// open brackets that follow a colon or comma or that begin the text. Finally,
	// we look to see that the remaining characters are only whitespace or ']' or
	// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.
	
	            if (/^[\],:{}\s]*$/
	                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	
	// In the third stage we use the eval function to compile the text into a
	// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
	// in JavaScript: it can begin a block or an object literal. We wrap the text
	// in parens to eliminate the ambiguity.
	
	                j = eval('(' + text + ')');
	
	// In the optional fourth stage, we recursively walk the new structure, passing
	// each name/value pair to a reviver function for possible transformation.
	
	                return typeof reviver === 'function'
	                    ? walk({'': j}, '')
	                    : j;
	            }
	
	// If the text is not JSON parseable, then a SyntaxError is thrown.
	
	            throw new SyntaxError('JSON.parse');
	        };
	    }
	}
	
	module.exports = setupCustomJSON;


/***/ }
/******/ ])
});
;