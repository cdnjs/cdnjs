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

	'use strict';

	/* globals __DEFAULT_ROLLBARJS_URL__ */
	/* globals _rollbarConfig */

	var RollbarShim = __webpack_require__(1).Rollbar;
	var snippetCallback = __webpack_require__(2);

	_rollbarConfig.rollbarJsUrl = _rollbarConfig.rollbarJsUrl || ("https://d37gvrvc0wt4s1.cloudfront.net/js/vundefined/rollbar.min.js");

	var shim = RollbarShim.init(window, _rollbarConfig);
	var callback = snippetCallback(shim, _rollbarConfig);

	shim.loadFull(window, document, !_rollbarConfig.async, _rollbarConfig, callback);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _shimCounter = 0;

	function _logger() {
	  var console = window.console;
	  if (console && typeof console.log === 'function') {
	    console.log.apply(console, arguments);
	  }
	}


	function _wrapInternalErr(f, logger) {
	  logger = logger || _logger;
	  return function() {
	    try {
	      return f.apply(this, arguments);
	    } catch (e) {
	      logger('Rollbar internal error:', e);
	    }
	  };
	}


	function _rollbarWindowOnError(client, old, args) {
	  if (window._rollbarWrappedError) {
	    if (!args[4]) {
	      args[4] = window._rollbarWrappedError;
	    }
	    if (!args[5]) {
	      args[5] = window._rollbarWrappedError._rollbarContext;
	    }
	    window._rollbarWrappedError = null;
	  }

	  client.uncaughtError.apply(client, args);
	  if (old) {
	    old.apply(window, args);
	  }
	}


	function Rollbar(parentShim) {
	  this.shimId = ++_shimCounter;
	  this.notifier = null;
	  this.parentShim = parentShim;
	  this.logger = _logger;
	  this._rollbarOldOnError = null;
	}


	Rollbar.init = function(window, config) {
	  var alias = config.globalAlias || 'Rollbar';
	  if (typeof window[alias] === 'object') {
	    return window[alias];
	  }

	  // Expose the global shim queue
	  window._rollbarShimQueue = [];
	  window._rollbarWrappedError = null;

	  config = config || {};

	  var client = new Rollbar();

	  return _wrapInternalErr(function() {
	    client.configure(config);

	    if (config.captureUncaught) {
	      // Create the client and set the onerror handler
	      client._rollbarOldOnError = window.onerror;

	      window.onerror = function() {
	        var args = Array.prototype.slice.call(arguments, 0);
	        _rollbarWindowOnError(client, client._rollbarOldOnError, args);
	      };

	      // Adapted from https://github.com/bugsnag/bugsnag-js
	      var globals = 'EventTarget,Window,Node,ApplicationCache,AudioTrackList,ChannelMergerNode,CryptoOperation,EventSource,FileReader,HTMLUnknownElement,IDBDatabase,IDBRequest,IDBTransaction,KeyOperation,MediaController,MessagePort,ModalWindow,Notification,SVGElementInstance,Screen,TextTrack,TextTrackCue,TextTrackList,WebSocket,WebSocketWorker,Worker,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload'.split(',');

	      var i;
	      var global;
	      for (i = 0; i < globals.length; ++i) {
	        global = globals[i];

	        if (window[global] && window[global].prototype) {
	          _extendListenerPrototype(client, window[global].prototype);
	        }
	      }
	    }

	    // Expose Rollbar globally
	    window[alias] = client;
	    return client;
	  }, client.logger)();
	};


	Rollbar.prototype.loadFull = function(window, document, immediate, config, callback) {
	  var onload = function () {
	    var err;
	    if (window._rollbarPayloadQueue === undefined) {
	      // rollbar.js did not load correctly, call any queued callbacks
	      // with an error.
	      var obj;
	      var cb;
	      var args;
	      var i;

	      err = new Error('rollbar.js did not load');

	      // Go through each of the shim objects. If one of their args
	      // was a function, treat it as the callback and call it with
	      // err as the first arg.
	      while ((obj = window._rollbarShimQueue.shift())) {
	        args = obj.args;
	        for (i = 0; i < args.length; ++i) {
	          cb = args[i];
	          if (typeof cb === 'function') {
	            cb(err);
	            break;
	          }
	        }
	      }
	    }
	    if (typeof callback === 'function') {
	      callback(err);
	    }
	  };

	  // Load the full rollbar.js source
	  var done = false;
	  var s = document.createElement('script');
	  var f = document.getElementsByTagName('script')[0];
	  var parentNode = f.parentNode;

	  s.src = config.rollbarJsUrl;
	  s.async = !immediate;

	  // From http://stackoverflow.com/questions/4845762/onload-handler-for-script-tag-in-internet-explorer
	  s.onload = s.onreadystatechange = _wrapInternalErr(function() {
	    if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
	      s.onload = s.onreadystatechange = null;
	      try {
	        parentNode.removeChild(s);
	      } catch (e) {
	        // pass
	      }
	      done = true;

	      onload();
	    }
	  }, this.logger);

	  parentNode.insertBefore(s, f);
	};


	Rollbar.prototype.wrap = function(f, context) {
	  try {
	    var ctxFn;
	    if (typeof context === 'function') {
	      ctxFn = context;
	    } else {
	      ctxFn = function() { return context || {}; };
	    }

	    if (typeof f !== 'function') {
	      return f;
	    }

	    if (f._isWrap) {
	      return f;
	    }

	    if (!f._wrapped) {
	      f._wrapped = function () {
	        try {
	          return f.apply(this, arguments);
	        } catch(e) {
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

	// Stub out rollbar.js methods
	function stub(method) {
	  var R = Rollbar;
	  return _wrapInternalErr(function() {
	    if (this.notifier) {
	      return this.notifier[method].apply(this.notifier, arguments);
	    } else {
	      var shim = this;
	      var isScope = method === 'scope';
	      if (isScope) {
	        shim = new R(this);
	      }
	      var args = Array.prototype.slice.call(arguments, 0);
	      var data = {shim: shim, method: method, args: args, ts: new Date()};
	      window._rollbarShimQueue.push(data);

	      if (isScope) {
	        return shim;
	      }
	    }
	  });
	}


	function _extendListenerPrototype(client, prototype) {
	  if (prototype.hasOwnProperty && prototype.hasOwnProperty('addEventListener')) {
	    var oldAddEventListener = prototype.addEventListener;
	    prototype.addEventListener = function(event, callback, bubble) {
	      oldAddEventListener.call(this, event, client.wrap(callback), bubble);
	    };

	    var oldRemoveEventListener = prototype.removeEventListener;
	    prototype.removeEventListener = function(event, callback, bubble) {
	      oldRemoveEventListener.call(this, event, (callback && callback._wrapped) ? callback._wrapped : callback, bubble);
	    };
	  }
	}


	var _methods = 'log,debug,info,warn,warning,error,critical,global,configure,scope,uncaughtError'.split(',');
	for (var i = 0; i < _methods.length; ++i) {
	  Rollbar.prototype[_methods[i]] = stub(_methods[i]);
	}


	module.exports = {
	  Rollbar: Rollbar,
	  _rollbarWindowOnError: _rollbarWindowOnError
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(shim, _config) {
	  return function(err) {
	    if (err) {
	      // do something?
	      return;
	    }

	    if (!window._rollbarInitialized) {
	      var Notifier = window.RollbarNotifier; // This is exposed by UMD bundle.
	      var config = _config || {};
	      var alias = config.globalAlias || 'Rollbar';

	      // At this time window.Rollbar is globalnotifier.wrapper
	      var fullRollbar = window.Rollbar.init(config, shim);

	      fullRollbar._processShimQueue(window._rollbarShimQueue || []);

	      window[alias] = fullRollbar;

	      window._rollbarInitialized = true;

	      Notifier.processPayloads();
	    }
	  };
	};


/***/ }
/******/ ]);