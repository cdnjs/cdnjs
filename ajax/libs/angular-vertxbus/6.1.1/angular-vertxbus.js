/*! angular-vertxbus - v6.1.1 - 2016-08-21
 * http://github.com/knalli/angular-vertxbus
 * Copyright (c) 2016 Jan Philipp
 * @license MIT */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vertx-eventbus"));
	else if(typeof define === 'function' && define.amd)
		define(["vertx-eventbus"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("vertx-eventbus")) : factory(root["EventBus"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _module = __webpack_require__(1);

	var _module2 = _interopRequireDefault(_module);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _module2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _config = __webpack_require__(2);

	var _VertxEventBusWrapperProvider = __webpack_require__(3);

	var _VertxEventBusWrapperProvider2 = _interopRequireDefault(_VertxEventBusWrapperProvider);

	var _VertxEventBusServiceProvider = __webpack_require__(9);

	var _VertxEventBusServiceProvider2 = _interopRequireDefault(_VertxEventBusServiceProvider);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @ngdoc overview
	 * @module knalli.angular-vertxbus
	 * @name knalli.angular-vertxbus
	 * @description
	 *
	 * Client side library using VertX Event Bus as an Angular Service module
	 *
	 * You have to define the module dependency, this module is named `knalli.angular-vertxbus`.
	 *
	 * <pre>
	 *   angular.module('app', ['knalli.angular-vertxbus'])
	 *     .controller('MyCtrl', function(vertxEventBus, vertxEventBusService) {
	 *
	 *       // using the EventBus directly
	 *       vertxEventBus.send('my.address', {data: 123}, function (reply) {
	 *         // your reply comes here
	 *       });
	 *
	 *       // using the service
	 *       vertxEventBusService.send('my.address', {data: 123}, {timeout: 500})
	 *         .then(function (reply) {
	 *           // your reply comes here
	 *         })
	 *         .catch(function (err) {
	 *           // something went wrong, no connection, no login, timed out, or so
	 *         });
	 *     });
	 * </pre>
	 *
	 * The module itself provides following components:
	 * - {@link knalli.angular-vertxbus.vertxEventBus vertxEventBus}: a low level wrapper around `vertx.EventBus`
	 * - {@link knalli.angular-vertxbus.vertxEventBusService vertxEventBusService}: a high level service around the wrapper
	 *
	 * While the wrapper only provides one single instance (even on reconnects), the service supports automatically
	 * reconnect management, authorization and a clean promise based api.
	 *
	 * If you are looking for a low integration of `vertxbus.EventBus` as an AngularJS component, the wrapper will be your
	 * choice. The only difference (and requirement for the wrapper actually) is how it will manage and replace the
	 * underlying instance of the current `vertx.EventBus`.
	 *
	 * However, if you are looking for a simple, clean and promised based high api, the service is much better you.
	 */
	exports.default = angular.module(_config.moduleName, ['ng']).provider('vertxEventBus', _VertxEventBusWrapperProvider2.default).provider('vertxEventBusService', _VertxEventBusServiceProvider2.default).name;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var moduleName = 'knalli.angular-vertxbus';

	exports.moduleName = moduleName;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _EventBusAdapter = __webpack_require__(4);

	var _EventBusAdapter2 = _interopRequireDefault(_EventBusAdapter);

	var _NoopAdapter = __webpack_require__(7);

	var _NoopAdapter2 = _interopRequireDefault(_NoopAdapter);

	var _ConnectionConfigHolder = __webpack_require__(6);

	var _ConnectionConfigHolder2 = _interopRequireDefault(_ConnectionConfigHolder);

	var _vertxEventbus = __webpack_require__(8);

	var _vertxEventbus2 = _interopRequireDefault(_vertxEventbus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @ngdoc service
	 * @module knalli.angular-vertxbus
	 * @name knalli.angular-vertxbus.vertxEventBusProvider
	 * @description
	 * An AngularJS wrapper for projects using the VertX Event Bus
	 */

	var DEFAULTS = {
	  enabled: true,
	  debugEnabled: false,
	  initialConnectEnabled: true,
	  urlServer: location.protocol + '//' + location.hostname + (function () {
	    if (location.port) {
	      return ':' + location.port;
	    }
	  }() || ''),
	  urlPath: '/eventbus',
	  reconnectEnabled: true,
	  sockjsReconnectInterval: 10000,
	  sockjsOptions: {}
	};

	var VertxEventBusWrapperProvider = function VertxEventBusWrapperProvider() {
	  var _this = this;

	  // options (globally, application-wide)
	  var options = angular.extend({}, DEFAULTS);

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#enable
	   *
	   * @description
	   * Enables or disables the service. This setup is immutable.
	   *
	   * @param {boolean} [value=true] service is enabled on startup
	   * @returns {object} this
	   */
	  this.enable = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.enabled : arguments[0];

	    options.enabled = value === true;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#disableAutoConnect
	   *
	   * @description
	   * Disables the auto connection feature.
	   *
	   * This feature will be only available if `enable == true`.
	   *
	   * @param {boolean} [value=true] auto connect on startup
	   * @returns {object} this
	   */
	  this.disableAutoConnect = function () {
	    options.initialConnectEnabled = false;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useDebug
	   *
	   * @description
	   * Enables a verbose mode in which certain events will be logged to `$log`.
	   *
	   * @param {boolean} [value=false] verbose mode (using `$log`)
	   * @returns {object} this
	   */
	  this.useDebug = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.debugEnabled : arguments[0];

	    options.debugEnabled = value === true;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useUrlServer
	   *
	   * @description
	   * Overrides the url part "server" for connecting. The default is based on
	   * - `location.protocol`
	   * - `location.hostname`
	   * - `location.port`
	   *
	   * i.e. `http://domain.tld` or `http://domain.tld:port`
	   *
	   * @param {boolean} [value=$computed] server to connect (default based on `location.protocol`, `location.hostname` and `location.port`)
	   * @returns {object} this
	   */
	  this.useUrlServer = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.urlServer : arguments[0];

	    options.urlServer = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useUrlPath
	   *
	   * @description
	   * Overrides the url part "path" for connection.
	   *
	   * @param {boolean} [value='/eventbus'] path to connect
	   * @returns {object} this
	   */
	  this.useUrlPath = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.urlPath : arguments[0];

	    options.urlPath = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useReconnect
	   *
	   * @description
	   * Enables or disables the automatic reconnect handling.
	   *
	   * @param {boolean} [value=true] if a disconnect was being noted, a reconnect will be enforced automatically
	   * @returns {object} this
	   */
	  this.useReconnect = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.reconnectEnabled : arguments[0];

	    options.reconnectEnabled = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useSockJsReconnectInterval
	   *
	   * @description
	   * Overrides the timeout for reconnecting after a disconnect was found.
	   *
	   * @param {boolean} [value=10000] time between a disconnect and the next try to reconnect (in ms)
	   * @returns {object} this
	   */
	  this.useSockJsReconnectInterval = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.sockjsReconnectInterval : arguments[0];

	    options.sockjsReconnectInterval = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusProvider
	   * @name .#useSockJsOptions
	   *
	   * @description
	   * Sets additional params for the `SockJS` instance.
	   *
	   * Internally, it will be applied (as `options`) like `new SockJS(url, undefined, options)`.
	   *
	   * @param {boolean} [value={}]  optional params for raw SockJS options
	   * @returns {object} this
	   */
	  this.useSockJsOptions = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.sockjsOptions : arguments[0];

	    options.sockjsOptions = value;
	    return _this;
	  };

	  /**
	   * @ngdoc service
	   * @module knalli.angular-vertxbus
	   * @name knalli.angular-vertxbus.vertxEventBus
	   * @description
	   * A stub representing the Vert.x EventBus (core functionality)
	   *
	   * Because the Event Bus cannot handle a reconnect (because of the underlaying SockJS), a
	   * new instance of the bus have to be created.
	   * This stub ensures only one object holding the current active instance of the bus.
	   *
	   * The stub supports theses Vert.x Event Bus APIs:
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_close close()}
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_send send(address, message, handler)}
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_publish publish(address, message)}
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_registerHandler registerHandler(adress, handler)}
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_unregisterHandler unregisterHandler(address, handler)}
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_readyState readyState()}
	   *
	   * Furthermore, the stub supports theses extra APIs:
	   *  - {@link knalli.angular-vertxbus.vertxEventBus#methods_reconnect reconnect()}
	   *
	   * @requires $timeout
	   * @requires $log
	   */
	  /* @ngInject */
	  this.$get = function ($timeout, $log, $q) {
	    // Current options (merged defaults with application-wide settings)
	    var instanceOptions = angular.extend({}, DEFAULTS, options);
	    if (instanceOptions.enabled && _vertxEventbus2.default) {
	      if (instanceOptions.debugEnabled) {
	        $log.debug('[Vert.x EB Stub] Enabled');
	      }

	      // aggregate server connection params
	      instanceOptions.connectionConfig = new _ConnectionConfigHolder2.default({
	        urlServer: instanceOptions.urlServer,
	        urlPath: instanceOptions.urlPath
	      });
	      delete instanceOptions.urlServer;
	      delete instanceOptions.urlPath;

	      return new _EventBusAdapter2.default(_vertxEventbus2.default, $timeout, $log, $q, instanceOptions);
	    } else {
	      if (instanceOptions.debugEnabled) {
	        $log.debug('[Vert.x EB Stub] Disabled');
	      }
	      return new _NoopAdapter2.default(_vertxEventbus2.default, $q);
	    }
	  };
	  this.$get.$inject = ["$timeout", "$log", "$q"];
	};

	exports.default = VertxEventBusWrapperProvider;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _BaseAdapter2 = __webpack_require__(5);

	var _BaseAdapter3 = _interopRequireDefault(_BaseAdapter2);

	var _ConnectionConfigHolder = __webpack_require__(6);

	var _ConnectionConfigHolder2 = _interopRequireDefault(_ConnectionConfigHolder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @ngdoc service
	 * @module global
	 * @name global.EventBus
	 *
	 * @description
	 * This is the interface of `EventBus`. It is not included.
	 */

	/**
	 * @ngdoc method
	 * @module global
	 * @methodOf global.EventBus
	 * @name .#close
	 */

	/**
	 * @ngdoc method
	 * @module global
	 * @methodOf global.EventBus
	 * @name .#send
	 *
	 * @param {string} address target address
	 * @param {object} message payload message
	 * @param {object=} headers headers
	 * @param {function=} replyHandler optional callback
	 * @param {function=} failureHandler optional callback
	 */

	/**
	 * @ngdoc method
	 * @module global
	 * @methodOf global.EventBus
	 * @name .#publish
	 *
	 * @param {string} address target address
	 * @param {object} message payload message
	 * @param {object=} headers headers
	 */

	/**
	 * @ngdoc method
	 * @module global
	 * @methodOf global.EventBus
	 * @name .#registerHandler
	 *
	 * @param {string} address target address
	 * @param {function} handler callback handler
	 * @param {object=} headers headers
	 */

	/**
	 * @ngdoc method
	 * @module global
	 * @methodOf global.EventBus
	 * @name .#unregisterHandler
	 *
	 * @param {string} address target address
	 * @param {function} handler callback handler to be removed
	 * @param {object=} headers headers
	 */

	/**
	 * @ngdoc property
	 * @module global
	 * @propertyOf global.EventBus
	 * @name .#onopen
	 * @description
	 * Defines the callback called on opening the connection.
	 */

	/**
	 * @ngdoc property
	 * @module global
	 * @propertyOf global.EventBus
	 * @name .#onclose
	 * @description
	 * Defines the callback called on closing the connection.
	 */

	/**
	 * @ngdoc property
	 * @module global
	 * @propertyOf global.EventBus
	 * @name .#onerror
	 * @description
	 * Defines the callback called on any error.
	 */

	var EventBusAdapter = function (_BaseAdapter) {
	  _inherits(EventBusAdapter, _BaseAdapter);

	  function EventBusAdapter(EventBus, $timeout, $log, $q, _ref) {
	    var enabled = _ref.enabled;
	    var debugEnabled = _ref.debugEnabled;
	    var initialConnectEnabled = _ref.initialConnectEnabled;
	    var connectionConfig = _ref.connectionConfig;
	    var reconnectEnabled = _ref.reconnectEnabled;
	    var sockjsReconnectInterval = _ref.sockjsReconnectInterval;
	    var sockjsOptions = _ref.sockjsOptions;

	    _classCallCheck(this, EventBusAdapter);

	    // actual EventBus type
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventBusAdapter).call(this, $q));

	    _this.EventBus = EventBus;
	    _this.$timeout = $timeout;
	    _this.$log = $log;
	    _this.$q = $q;
	    _this.options = {
	      enabled: enabled,
	      debugEnabled: debugEnabled,
	      initialConnectEnabled: initialConnectEnabled,
	      connectionConfig: connectionConfig,
	      reconnectEnabled: reconnectEnabled,
	      sockjsReconnectInterval: sockjsReconnectInterval,
	      sockjsOptions: sockjsOptions
	    };
	    _this.disconnectTimeoutEnabled = true;
	    _this.applyDefaultHeaders();
	    if (initialConnectEnabled) {
	      // asap create connection
	      _this.connect();
	    }
	    return _this;
	  }

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBus
	   * @name .#configureConnect
	   *
	   * @description
	   * Reconfigure the connection details.
	   *
	   * @param {string} urlServer see {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useUrlServer vertxEventBusProvider.useUrlServer()}
	   * @param {string} [urlPath=/eventbus] see {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useUrlPath vertxEventBusProvider.useUrlPath()}
	   */


	  _createClass(EventBusAdapter, [{
	    key: 'configureConnection',
	    value: function configureConnection(urlServer) {
	      var urlPath = arguments.length <= 1 || arguments[1] === undefined ? '/eventbus' : arguments[1];

	      this.options.connectionConfig = new _ConnectionConfigHolder2.default({ urlServer: urlServer, urlPath: urlPath });
	      return this;
	    }
	  }, {
	    key: 'connect',
	    value: function connect() {
	      var _this2 = this;

	      // connect promise
	      var deferred = this.$q.defer();
	      // currently valid url
	      var url = '' + this.options.connectionConfig.urlServer + this.options.connectionConfig.urlPath;
	      if (this.options.debugEnabled) {
	        this.$log.debug('[Vert.x EB Stub] Enabled: connecting \'' + url + '\'');
	      }
	      // Because we have rebuild an EventBus object (because it have to rebuild a SockJS object)
	      // we must wrap the object. Therefore, we have to mimic the behavior of onopen and onclose each time.
	      this.instance = new this.EventBus(url, this.options.sockjsOptions);
	      this.instance.onopen = function () {
	        if (_this2.options.debugEnabled) {
	          _this2.$log.debug('[Vert.x EB Stub] Connected');
	        }
	        if (angular.isFunction(_this2.onopen)) {
	          _this2.onopen();
	        }
	        deferred.resolve();
	      };
	      // instance onClose handler
	      this.instance.onclose = function () {
	        if (_this2.options.debugEnabled) {
	          _this2.$log.debug('[Vert.x EB Stub] Reconnect in ' + _this2.options.sockjsReconnectInterval + 'ms');
	        }
	        if (angular.isFunction(_this2.onclose)) {
	          _this2.onclose();
	        }
	        _this2.instance = undefined;

	        if (!_this2.disconnectTimeoutEnabled) {
	          // reconnect required asap
	          if (_this2.options.debugEnabled) {
	            _this2.$log.debug('[Vert.x EB Stub] Reconnect immediately');
	          }
	          _this2.disconnectTimeoutEnabled = true;
	          _this2.connect();
	        } else if (_this2.options.reconnectEnabled) {
	          // automatic reconnect after timeout
	          if (_this2.options.debugEnabled) {
	            _this2.$log.debug('[Vert.x EB Stub] Reconnect in ' + _this2.options.sockjsReconnectInterval + 'ms');
	          }
	          _this2.$timeout(function () {
	            return _this2.connect();
	          }, _this2.options.sockjsReconnectInterval);
	        }
	      };
	      // instance onError handler
	      this.instance.onerror = function (message) {
	        if (angular.isFunction(_this2.onerror)) {
	          _this2.onerror(message);
	        }
	      };
	      return deferred.promise;
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#reconnect
	     *
	     * @description
	     * Reconnects the underlying connection.
	     *
	     * Unless a connection is open, it will connect using a new one.
	     *
	     * If a connection is already open, it will close this one and opens a new one. If `immediately` is `true`, the
	     * default timeout for reconnect will be skipped.
	     *
	     * @param {boolean} [immediately=false] optionally enforce a reconnect asap instead of using the timeout
	     */

	  }, {
	    key: 'reconnect',
	    value: function reconnect() {
	      var immediately = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	      if (this.instance && this.instance.state === this.EventBus.OPEN) {
	        if (immediately) {
	          this.disconnectTimeoutEnabled = false;
	        }
	        this.instance.close();
	      } else {
	        this.connect();
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#close
	     *
	     * @description
	     * Closes the underlying connection.
	     *
	     * Note: If automatic reconnection is active, a new connection will be established after the {@link knalli.angular-vertxbus.vertxEventBusProvider#methods_useReconnect reconnect timeout}.
	     *
	     * See also:
	     * - {@link EventBus#methods_close EventBus.close()}
	     */

	  }, {
	    key: 'close',
	    value: function close() {
	      if (this.instance) {
	        this.instance.close();
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#send
	     *
	     * @description
	     * Sends a message
	     *
	     * See also:
	     * - {@link global.EventBus#methods_send EventBus.send()}
	     *
	     * @param {string} address target address
	     * @param {object} message payload message
	     * @param {object} headers optional headers
	     * @param {function=} replyHandler optional callback
	     */

	  }, {
	    key: 'send',
	    value: function send(address, message, headers, replyHandler) {
	      if (this.instance) {
	        var mergedHeaders = this.getMergedHeaders(headers);
	        this.instance.send(address, message, mergedHeaders, replyHandler);
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#publish
	     *
	     * @description
	     * Publishes a message
	     *
	     * See also:
	     * - {@link global.EventBus#methods_publish EventBus.publish()}
	     *
	     * @param {string} address target address
	     * @param {object} message payload message
	     * @param {object=} headers optional headers
	     */

	  }, {
	    key: 'publish',
	    value: function publish(address, message, headers) {
	      if (this.instance) {
	        var mergedHeaders = this.getMergedHeaders(headers);
	        this.instance.publish(address, message, mergedHeaders);
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#registerHandler
	     *
	     * @description
	     * Registers a listener
	     *
	     * See also:
	     * - {@link global.EventBus#methods_registerHandler EventBus.registerHandler()}
	     *
	     * @param {string} address target address
	     * @param {object=} headers optional headers
	     * @param {function} handler callback handler
	     */

	  }, {
	    key: 'registerHandler',
	    value: function registerHandler(address, headers, handler) {
	      var _this3 = this;

	      if (this.instance) {
	        var _ret = function () {
	          if (angular.isFunction(headers) && !handler) {
	            handler = headers;
	            headers = undefined;
	          }
	          var mergedHeaders = _this3.getMergedHeaders(headers);
	          _this3.instance.registerHandler(address, mergedHeaders, handler);
	          // and return the deregister callback
	          var deconstructor = function deconstructor() {
	            _this3.unregisterHandler(address, mergedHeaders, handler);
	          };
	          deconstructor.displayName = _config.moduleName + '.wrapper.eventbus.registerHandler.deconstructor';
	          return {
	            v: deconstructor
	          };
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#unregisterHandler
	     *
	     * @description
	     * Removes a registered a listener
	     *
	     * See also:
	     * - {@link global.EventBus#methods_unregisterHandler EventBus.unregisterHandler()}
	     *
	     * @param {string} address target address
	     * @param {object=} headers optional headers
	     * @param {function} handler callback handler to be removed
	     */

	  }, {
	    key: 'unregisterHandler',
	    value: function unregisterHandler(address, headers, handler) {
	      if (this.instance && this.instance.state === this.EventBus.OPEN) {
	        if (angular.isFunction(headers) && !handler) {
	          handler = headers;
	          headers = undefined;
	        }
	        var mergedHeaders = this.getMergedHeaders(headers);
	        this.instance.unregisterHandler(address, mergedHeaders, handler);
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#readyState
	     *
	     * @description
	     * Returns the current connection state
	     *
	     * @returns {number} value of vertx-eventbus connection states
	     */

	  }, {
	    key: 'readyState',
	    value: function readyState() {
	      if (this.instance) {
	        return this.instance.state;
	      } else {
	        return this.EventBus.CLOSED;
	      }
	    }
	  }, {
	    key: 'getOptions',


	    // private
	    value: function getOptions() {
	      // clone options
	      return angular.extend({}, this.options);
	    }
	  }, {
	    key: 'state',
	    get: function get() {
	      return this.readyState();
	    }
	  }]);

	  return EventBusAdapter;
	}(_BaseAdapter3.default);

	exports.default = EventBusAdapter;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseAdapter = function () {
	  function BaseAdapter($q) {
	    _classCallCheck(this, BaseAdapter);

	    this.$q = $q;
	  }

	  _createClass(BaseAdapter, [{
	    key: "configureConnection",
	    value: function configureConnection() {}
	  }, {
	    key: "connect",
	    value: function connect() {
	      return this.$q.reject();
	    }
	  }, {
	    key: "reconnect",
	    value: function reconnect() {}
	  }, {
	    key: "close",
	    value: function close() {}
	  }, {
	    key: "send",
	    value: function send() {}
	  }, {
	    key: "publish",
	    value: function publish() {}
	  }, {
	    key: "registerHandler",
	    value: function registerHandler() {}
	  }, {
	    key: "unregisterHandler",
	    value: function unregisterHandler() {}
	  }, {
	    key: "readyState",
	    value: function readyState() {}
	  }, {
	    key: "getOptions",
	    value: function getOptions() {
	      return {};
	    }

	    // empty: can be overriden by externals

	  }, {
	    key: "onopen",
	    value: function onopen() {}

	    // empty: can be overriden by externals

	  }, {
	    key: "onclose",
	    value: function onclose() {}

	    // private

	  }, {
	    key: "getDefaultHeaders",
	    value: function getDefaultHeaders() {
	      return this.defaultHeaders;
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBus
	     * @name .#applyDefaultHeaders
	     *
	     * @description
	     * Stores the given default headers
	     *
	     * @param {object} headers additional standard headers
	     */

	  }, {
	    key: "applyDefaultHeaders",
	    value: function applyDefaultHeaders() {
	      var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      this.defaultHeaders = angular.extend({}, headers);
	    }

	    // private

	  }, {
	    key: "getMergedHeaders",
	    value: function getMergedHeaders() {
	      var headers = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      return angular.extend({}, this.defaultHeaders, headers);
	    }
	  }]);

	  return BaseAdapter;
	}();

	exports.default = BaseAdapter;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ConnectionConfigHolder = function () {
	  function ConnectionConfigHolder(_ref) {
	    var urlServer = _ref.urlServer;
	    var urlPath = _ref.urlPath;

	    _classCallCheck(this, ConnectionConfigHolder);

	    this._urlServer = urlServer;
	    this._urlPath = urlPath;
	  }

	  _createClass(ConnectionConfigHolder, [{
	    key: "urlServer",
	    get: function get() {
	      return this._urlServer;
	    }
	  }, {
	    key: "urlPath",
	    get: function get() {
	      return this._urlPath;
	    }
	  }]);

	  return ConnectionConfigHolder;
	}();

	exports.default = ConnectionConfigHolder;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseAdapter2 = __webpack_require__(5);

	var _BaseAdapter3 = _interopRequireDefault(_BaseAdapter2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NoopAdapter = function (_BaseAdapter) {
	  _inherits(NoopAdapter, _BaseAdapter);

	  function NoopAdapter(EventBus, $q) {
	    _classCallCheck(this, NoopAdapter);

	    // actual EventBus type
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NoopAdapter).call(this, $q));

	    _this.EventBus = EventBus;
	    return _this;
	  }

	  return NoopAdapter;
	}(_BaseAdapter3.default);

	exports.default = NoopAdapter;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _EventBusDelegate = __webpack_require__(10);

	var _EventBusDelegate2 = _interopRequireDefault(_EventBusDelegate);

	var _NoopDelegate = __webpack_require__(14);

	var _NoopDelegate2 = _interopRequireDefault(_NoopDelegate);

	var _Delegator = __webpack_require__(15);

	var _Delegator2 = _interopRequireDefault(_Delegator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @ngdoc service
	 * @module knalli.angular-vertxbus
	 * @name knalli.angular-vertxbus.vertxEventBusServiceProvider
	 * @description
	 * This is the configuration provider for {@link knalli.angular-vertxbus.vertxEventBusService}.
	 */

	var DEFAULTS = {
	  enabled: true,
	  debugEnabled: false,
	  authRequired: false,
	  prefix: 'vertx-eventbus.',
	  sockjsStateInterval: 10000,
	  messageBuffer: 10000
	};

	var VertxEventBusServiceProvider = function VertxEventBusServiceProvider() {
	  var _this = this;

	  // options (globally, application-wide)
	  var options = angular.extend({}, DEFAULTS);

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#enable
	   *
	   * @description
	   * Enables or disables the service. This setup is immutable.
	   *
	   * @param {boolean} [value=true] service is enabled on startup
	   * @returns {object} this
	   */
	  this.enable = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.enabled : arguments[0];

	    options.enabled = value === true;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#useDebug
	   *
	   * @description
	   * Enables a verbose mode in which certain events will be logged to `$log`.
	   *
	   * @param {boolean} [value=false] verbose mode (using `$log`)
	   * @returns {object} this
	   */
	  this.useDebug = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.debugEnabled : arguments[0];

	    options.debugEnabled = value === true;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#usePrefix
	   *
	   * @description
	   * Overrides the default prefix which will be used for emitted events.
	   *
	   * @param {string} [value='vertx-eventbus.'] prefix used in event names
	   * @returns {object} this
	   */
	  this.usePrefix = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.prefix : arguments[0];

	    options.prefix = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#useSockJsStateInterval
	   *
	   *
	   * @description
	   * Overrides the interval of checking the connection is still valid (required for reconnecting automatically).
	   *
	   * @param {boolean} [value=10000] interval of checking the underlying connection's state (in ms)
	   * @returns {object} this
	   */
	  this.useSockJsStateInterval = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.sockjsStateInterval : arguments[0];

	    options.sockjsStateInterval = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#useMessageBuffer
	   *
	   * @description
	   * Enables buffering of (sending) messages.
	   *
	   * The setting defines the total amount of buffered messages (`0` no buffering). A message will be buffered if
	   * connection is still in progress, the connection is stale or a login is required/pending.
	   *
	   * @param {boolean} [value=0] allowed total amount of messages in the buffer
	   * @returns {object} this
	   */
	  this.useMessageBuffer = function () {
	    var value = arguments.length <= 0 || arguments[0] === undefined ? DEFAULTS.messageBuffer : arguments[0];

	    options.messageBuffer = value;
	    return _this;
	  };

	  /**
	   * @ngdoc method
	   * @module knalli.angular-vertxbus
	   * @methodOf knalli.angular-vertxbus.vertxEventBusServiceProvider
	   * @name .#authHandler
	   *
	   * @description
	   * Function or service reference name for function checking the authorization state.
	   *
	   * The result of the function must be a boolean or promise. The handler can (but is not required) to create authorization on demand.
	   * If it is resolved, the authorization is valid.
	   * If it is rejected, the authorization is invalid.
	   *
	   * @param {string|function} value authorization handler (either a function or a service name)
	   * @returns {object} promise
	   */
	  this.authHandler = function (value) {
	    options.authHandler = value;
	    options.authRequired = !!value;
	    return _this;
	  };

	  /**
	   * @ngdoc service
	   * @module knalli.angular-vertxbus
	   * @name knalli.angular-vertxbus.vertxEventBusService
	   * @description
	   * A service utilizing an underlying Vert.x Event Bus
	   *
	   * The advanced features of this service are:
	   *  - broadcasting the connection changes (vertx-eventbus.system.connected, vertx-eventbus.system.disconnected) on $rootScope
	   *  - registering all handlers again when a reconnect had been required
	   *  - supporting a promise when using send()
	   *  - adding aliases on (registerHandler), un (unregisterHandler) and emit (publish)
	   *
	   * Basic usage:
	   * <pre>
	   * module.controller('MyController', function('vertxEventService') {
	  *   vertxEventService.on('my.address', function(message) {
	  *     console.log("JSON Message received: ", message)
	  *   });
	  *   vertxEventService.publish('my.other.address', {type: 'foo', data: 'bar'});
	  * });
	   * </pre>
	   *
	   * Note the additional {@link knalli.angular-vertxbus.vertxEventBusServiceProvider configuration} of the module itself.
	   *
	   * @requires knalli.angular-vertxbus.vertxEventBus
	   * @requires $rootScope
	   * @requires $q
	   * @requires $interval
	   * @requires $log
	   * @requires $injector
	   */
	  /* @ngInject */
	  this.$get = function ($rootScope, $q, $interval, vertxEventBus, $log, $injector) {
	    // Current options (merged defaults with application-wide settings)
	    var instanceOptions = angular.extend({}, vertxEventBus.getOptions(), options);
	    if (instanceOptions.enabled) {
	      return new _Delegator2.default(new _EventBusDelegate2.default($rootScope, $interval, $log, $q, $injector, vertxEventBus, instanceOptions), $log);
	    } else {
	      return new _Delegator2.default(new _NoopDelegate2.default());
	    }
	  };
	  this.$get.$inject = ["$rootScope", "$q", "$interval", "vertxEventBus", "$log", "$injector"];
	};

	exports.default = VertxEventBusServiceProvider;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	var _Queue = __webpack_require__(11);

	var _Queue2 = _interopRequireDefault(_Queue);

	var _SimpleMap = __webpack_require__(12);

	var _SimpleMap2 = _interopRequireDefault(_SimpleMap);

	var _BaseDelegate2 = __webpack_require__(13);

	var _BaseDelegate3 = _interopRequireDefault(_BaseDelegate2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @ngdoc event
	 * @module knalli.angular-vertxbus
	 * @eventOf knalli.angular-vertxbus.vertxEventBusService
	 * @eventType broadcast on $rootScope
	 * @name disconnected
	 *
	 * @description
	 * After a connection was being terminated.
	 *
	 * Event name is `prefix + 'system.disconnected'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
	 */

	/**
	 * @ngdoc event
	 * @module knalli.angular-vertxbus
	 * @eventOf knalli.angular-vertxbus.vertxEventBusService
	 * @eventType broadcast on $rootScope
	 * @name connected
	 *
	 * @description
	 * After a connection was being established
	 *
	 * Event name is `prefix + 'system.connected'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
	 */

	/**
	 * @ngdoc event
	 * @module knalli.angular-vertxbus
	 * @eventOf knalli.angular-vertxbus.vertxEventBusService
	 * @eventType broadcast on $rootScope
	 * @name login-succeeded
	 *
	 * @description
	 * After a login has been validated successfully
	 *
	 * Event name is `prefix + 'system.login.succeeded'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
	 *
	 * @param {object} data data
	 * @param {boolean} data.status must be `'ok'`
	 */

	/**
	 * @ngdoc event
	 * @module knalli.angular-vertxbus
	 * @eventOf knalli.angular-vertxbus.vertxEventBusService
	 * @eventType broadcast on $rootScope
	 * @name login-failed
	 *
	 * @description
	 * After a login has been destroyed or was invalidated
	 *
	 * Event name is `prefix + 'system.login.failed'` (see {@link knalli.angular-vertxbus.vertxEventBusServiceProvider#methods_usePrefix prefix})
	 *
	 * @param {object} data data
	 * @param {boolean} data.status must be not`'ok'`
	 */

	var EventBusDelegate = function (_BaseDelegate) {
	  _inherits(EventBusDelegate, _BaseDelegate);

	  function EventBusDelegate($rootScope, $interval, $log, $q, $injector, eventBus, _ref) {
	    var enabled = _ref.enabled;
	    var debugEnabled = _ref.debugEnabled;
	    var prefix = _ref.prefix;
	    var sockjsStateInterval = _ref.sockjsStateInterval;
	    var messageBuffer = _ref.messageBuffer;
	    var authRequired = _ref.authRequired;
	    var authHandler = _ref.authHandler;

	    _classCallCheck(this, EventBusDelegate);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventBusDelegate).call(this));

	    _this.$rootScope = $rootScope;
	    _this.$interval = $interval;
	    _this.$log = $log;
	    _this.$q = $q;
	    _this.eventBus = eventBus;
	    _this.options = {
	      enabled: enabled,
	      debugEnabled: debugEnabled,
	      prefix: prefix,
	      sockjsStateInterval: sockjsStateInterval,
	      messageBuffer: messageBuffer,
	      authRequired: authRequired
	    };
	    if (angular.isFunction(authHandler)) {
	      _this.authHandler = authHandler;
	    } else if (angular.isString(authHandler)) {
	      try {
	        _this.authHandler = $injector.get(authHandler);
	      } catch (e) {
	        if (_this.options.debugEnabled) {
	          _this.$log.debug('[Vert.x EB Service] Failed to resolve authHandler: %s', e.message);
	        }
	      }
	    }
	    _this.connectionState = _this.eventBus.EventBus.CLOSED;
	    _this.states = {
	      connected: false,
	      authorized: false
	    };
	    _this.observers = [];
	    // internal store of buffered messages
	    _this.messageQueue = new _Queue2.default(_this.options.messageBuffer);
	    // internal map of callbacks
	    _this.callbackMap = new _SimpleMap2.default();
	    // asap
	    _this.initialize();
	    return _this;
	  }

	  // internal


	  _createClass(EventBusDelegate, [{
	    key: 'initialize',
	    value: function initialize() {
	      var _this2 = this;

	      this.eventBus.onopen = function () {
	        return _this2.onEventbusOpen();
	      };
	      this.eventBus.onclose = function () {
	        return _this2.onEventbusClose();
	      };

	      // Update the current connection state periodically.
	      var connectionIntervalCheck = function connectionIntervalCheck() {
	        return _this2.getConnectionState(true);
	      };
	      connectionIntervalCheck.displayName = 'connectionIntervalCheck';
	      this.$interval(function () {
	        return connectionIntervalCheck();
	      }, this.options.sockjsStateInterval);
	    }

	    // internal

	  }, {
	    key: 'onEventbusOpen',
	    value: function onEventbusOpen() {
	      var connectionStateFlipped = false;
	      this.getConnectionState(true);
	      if (!this.states.connected) {
	        this.states.connected = true;
	        connectionStateFlipped = true;
	      }
	      // Ensure all events will be re-attached
	      this.afterEventbusConnected();
	      // Everything is online and registered again, let's notify everybody
	      if (connectionStateFlipped) {
	        this.$rootScope.$broadcast(this.options.prefix + 'system.connected');
	      }
	      this.$rootScope.$digest(); // explicitly
	      // consume message queue?
	      if (this.options.messageBuffer && this.messageQueue.size()) {
	        while (this.messageQueue.size()) {
	          var fn = this.messageQueue.first();
	          if (angular.isFunction(fn)) {
	            fn();
	          }
	        }
	        this.$rootScope.$digest();
	      }
	    }

	    // internal

	  }, {
	    key: 'onEventbusClose',
	    value: function onEventbusClose() {
	      this.getConnectionState(true);
	      if (this.states.connected) {
	        this.states.connected = false;
	        this.$rootScope.$broadcast(this.options.prefix + 'system.disconnected');
	      }
	    }

	    // internal

	  }, {
	    key: 'observe',
	    value: function observe(observer) {
	      this.observers.push(observer);
	    }

	    // internal

	  }, {
	    key: 'afterEventbusConnected',
	    value: function afterEventbusConnected() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var observer = _step.value;

	          if (angular.isFunction(observer.afterEventbusConnected)) {
	            observer.afterEventbusConnected();
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'registerHandler',
	    value: function registerHandler(address, headers, callback) {
	      var _this3 = this;

	      if (angular.isFunction(headers) && !callback) {
	        callback = headers;
	        headers = undefined;
	      }
	      if (!angular.isFunction(callback)) {
	        return;
	      }
	      if (this.options.debugEnabled) {
	        this.$log.debug('[Vert.x EB Service] Register handler for ' + address);
	      }
	      var callbackWrapper = function callbackWrapper(err, _ref2, replyTo) {
	        var body = _ref2.body;

	        callback(body, replyTo);
	        _this3.$rootScope.$digest();
	      };
	      callbackWrapper.displayName = _config.moduleName + '.service.delegate.live.registerHandler.callbackWrapper';
	      this.callbackMap.put(callback, callbackWrapper);
	      return this.eventBus.registerHandler(address, headers, callbackWrapper);
	    }
	  }, {
	    key: 'unregisterHandler',
	    value: function unregisterHandler(address, headers, callback) {
	      if (angular.isFunction(headers) && !callback) {
	        callback = headers;
	        headers = undefined;
	      }
	      if (!angular.isFunction(callback)) {
	        return;
	      }
	      if (this.options.debugEnabled) {
	        this.$log.debug('[Vert.x EB Service] Unregister handler for ' + address);
	      }
	      this.eventBus.unregisterHandler(address, headers, this.callbackMap.get(callback));
	      this.callbackMap.remove(callback);
	    }
	  }, {
	    key: 'send',
	    value: function send(address, message, headers) {
	      var _this4 = this;

	      var timeout = arguments.length <= 3 || arguments[3] === undefined ? 10000 : arguments[3];
	      var expectReply = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];

	      var deferred = this.$q.defer();
	      var next = function next() {
	        if (expectReply) {
	          (function () {
	            // Register timeout for promise rejecting
	            var timer = _this4.$interval(function () {
	              if (_this4.options.debugEnabled) {
	                _this4.$log.debug('[Vert.x EB Service] send(\'' + address + '\') timed out');
	              }
	              deferred.reject();
	            }, timeout, 1);
	            // Send message
	            _this4.eventBus.send(address, message, headers, function (err, reply) {
	              _this4.$interval.cancel(timer); // because it's resolved
	              if (err) {
	                deferred.reject(err);
	              } else {
	                deferred.resolve(reply);
	              }
	            });
	          })();
	        } else {
	          _this4.eventBus.send(address, message, headers);
	          deferred.resolve(); // we don't care
	        }
	      };
	      next.displayName = _config.moduleName + '.service.delegate.live.send.next';
	      this.ensureOpenAuthConnection(next).then(null, deferred.reject);
	      return deferred.promise;
	    }
	  }, {
	    key: 'publish',
	    value: function publish(address, message, headers) {
	      var _this5 = this;

	      return this.ensureOpenAuthConnection(function () {
	        return _this5.eventBus.publish(address, message, headers);
	      });
	    }

	    /**
	     * Ensures the callback will be performed with an open connection.
	     *
	     * Unless an open connection was found, the callback will be queued in the message buffer (if available).
	     *
	     * @param {function} fn callback
	     * @returns {object} promise (resolved on either performed or queued)
	     */

	  }, {
	    key: 'ensureOpenConnection',
	    value: function ensureOpenConnection(fn) {
	      var deferred = this.$q.defer();
	      if (this.isConnectionOpen()) {
	        fn();
	        deferred.resolve({
	          inQueue: false
	        });
	      } else if (this.options.messageBuffer) {
	        this.messageQueue.push(fn);
	        deferred.resolve({
	          inQueue: true
	        });
	      } else {
	        deferred.reject();
	      }
	      return deferred.promise;
	    }

	    /**
	     * Ensures the callback will be performed with a valid session.
	     *
	     * Unless `authRequired` is enabled, this will be simple forward.
	     *
	     * Unless a valid session exist (but required), the callback will be not invoked.
	     *
	     * @param {function} fn callback
	     * @returns {object} promise (resolved on either performed or queued)
	     */

	  }, {
	    key: 'ensureOpenAuthConnection',
	    value: function ensureOpenAuthConnection(fn) {
	      var _this6 = this;

	      if (!this.options.authRequired) {
	        // easy: no login required
	        return this.ensureOpenConnection(fn);
	      } else {
	        var fnWrapper = function fnWrapper() {
	          if (_this6.authHandler) {
	            var onValidAuth = function onValidAuth() {
	              _this6.states.authorized = true;
	              fn();
	            };
	            var onInvalidAuth = function onInvalidAuth() {
	              _this6.states.authorized = false;
	              if (_this6.options.debugEnabled) {
	                _this6.$log.debug('[Vert.x EB Service] Message was not sent due authHandler rejected');
	              }
	            };
	            var authResult = _this6.authHandler(_this6.eventBus);
	            if (!(authResult && angular.isFunction(authResult.then))) {
	              if (_this6.options.debugEnabled) {
	                _this6.$log.debug('[Vert.x EB Service] Message was not sent because authHandler is returning not a promise');
	              }
	              return false;
	            }
	            authResult.then(onValidAuth, onInvalidAuth);
	            return true;
	          } else {
	            // ignore this message
	            if (_this6.options.debugEnabled) {
	              _this6.$log.debug('[Vert.x EB Service] Message was not sent because no authHandler is defined');
	            }
	            return false;
	          }
	        };
	        fnWrapper.displayName = _config.moduleName + '.service.delegate.live.ensureOpenAuthConnection.fnWrapper';
	        return this.ensureOpenConnection(fnWrapper);
	      }
	    }

	    /**
	     * Returns the current connection state. The state is being cached internally.
	     *
	     * @param {boolean=} [immediate=false] if true, the connection state will be queried directly.
	     * @returns {number} state type of vertx.EventBus
	     */

	  }, {
	    key: 'getConnectionState',
	    value: function getConnectionState(immediate) {
	      if (this.options.enabled) {
	        if (immediate) {
	          this.connectionState = this.eventBus.state;
	        }
	      } else {
	        this.connectionState = this.eventBus.EventBus.CLOSED;
	      }
	      return this.connectionState;
	    }

	    /**
	     * Returns true if the current connection state ({@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()}) is `OPEN`.
	     *
	     * @returns {boolean} connection open state
	     */

	  }, {
	    key: 'isConnectionOpen',
	    value: function isConnectionOpen() {
	      return this.getConnectionState() === this.eventBus.EventBus.OPEN;
	    }

	    /**
	     * Returns true if the session is valid
	     *
	     * @returns {boolean} state
	     */

	  }, {
	    key: 'isAuthorized',
	    value: function isAuthorized() {
	      return this.states.authorized;
	    }

	    // internal

	  }, {
	    key: 'isConnected',
	    value: function isConnected() {
	      return this.states.connected;
	    }
	  }, {
	    key: 'isEnabled',
	    value: function isEnabled() {
	      return this.options.enabled;
	    }

	    /**
	     * Returns the current amount of messages in the internal buffer.
	     *
	     * @returns {number} amount
	     */

	  }, {
	    key: 'getMessageQueueLength',
	    value: function getMessageQueueLength() {
	      return this.messageQueue.size();
	    }
	  }]);

	  return EventBusDelegate;
	}(_BaseDelegate3.default);

	exports.default = EventBusDelegate;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 Simple queue implementation

	 FIFO: #push() + #first()
	 LIFO: #push() + #last()
	 */
	var Queue = function () {
	  function Queue() {
	    var maxSize = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

	    _classCallCheck(this, Queue);

	    this.maxSize = maxSize;
	    this.items = [];
	  }

	  _createClass(Queue, [{
	    key: "push",
	    value: function push(item) {
	      this.items.push(item);
	      return this.recalibrateBufferSize();
	    }
	  }, {
	    key: "recalibrateBufferSize",
	    value: function recalibrateBufferSize() {
	      while (this.items.length > this.maxSize) {
	        this.first();
	      }
	      return this;
	    }
	  }, {
	    key: "last",
	    value: function last() {
	      return this.items.pop();
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.items.shift(0);
	    }
	  }, {
	    key: "size",
	    value: function size() {
	      return this.items.length;
	    }
	  }]);

	  return Queue;
	}();

	exports.default = Queue;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*
	 Simple Map implementation

	 This implementation allows usage of non serializable keys for values.
	 */
	var SimpleMap = function () {
	  function SimpleMap() {
	    _classCallCheck(this, SimpleMap);

	    this.clear();
	  }

	  // Stores the value under the key.
	  // Chainable


	  _createClass(SimpleMap, [{
	    key: "put",
	    value: function put(key, value) {
	      var idx = this._indexForKey(key);
	      if (idx > -1) {
	        this.values[idx] = value;
	      } else {
	        this.keys.push(key);
	        this.values.push(value);
	      }
	      return this;
	    }

	    // Returns value for key, otherwise undefined.

	  }, {
	    key: "get",
	    value: function get(key) {
	      var idx = this._indexForKey(key);
	      if (idx > -1) {
	        return this.values[idx];
	      }
	    }

	    // Returns true if the key exists.

	  }, {
	    key: "containsKey",
	    value: function containsKey(key) {
	      var idx = this._indexForKey(key);
	      return idx > -1;
	    }

	    // Returns true if the value exists.

	  }, {
	    key: "containsValue",
	    value: function containsValue(value) {
	      var idx = this._indexForValue(value);
	      return idx > -1;
	    }

	    // Removes the key and its value.

	  }, {
	    key: "remove",
	    value: function remove(key) {
	      var idx = this._indexForKey(key);
	      if (idx > -1) {
	        this.keys[idx] = undefined;
	        this.values[idx] = undefined;
	      }
	    }

	    // Clears all keys and values.

	  }, {
	    key: "clear",
	    value: function clear() {
	      this.keys = [];
	      this.values = [];
	      return this;
	    }

	    // Returns index of key, otherwise -1.

	  }, {
	    key: "_indexForKey",
	    value: function _indexForKey(key) {
	      for (var i in this.keys) {
	        if (key === this.keys[i]) {
	          return i;
	        }
	      }
	      return -1;
	    }
	  }, {
	    key: "_indexForValue",
	    value: function _indexForValue(value) {
	      for (var i in this.values) {
	        if (value === this.values[i]) {
	          return i;
	        }
	      }
	      return -1;
	    }
	  }]);

	  return SimpleMap;
	}();

	exports.default = SimpleMap;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BaseDelegate = function () {
	  function BaseDelegate() {
	    _classCallCheck(this, BaseDelegate);
	  }

	  _createClass(BaseDelegate, [{
	    key: "observe",
	    value: function observe() {}
	  }, {
	    key: "getConnectionState",
	    value: function getConnectionState() {
	      return 3; // CLOSED
	    }
	  }, {
	    key: "isConnectionOpen",
	    value: function isConnectionOpen() {
	      return false;
	    }
	  }, {
	    key: "isAuthorized",
	    value: function isAuthorized() {
	      return false;
	    }
	  }, {
	    key: "isEnabled",
	    value: function isEnabled() {
	      return false;
	    }
	  }, {
	    key: "isConnected",
	    value: function isConnected() {
	      return false;
	    }
	  }, {
	    key: "send",
	    value: function send() {}
	  }, {
	    key: "publish",
	    value: function publish() {}
	  }]);

	  return BaseDelegate;
	}();

	exports.default = BaseDelegate;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _BaseDelegate2 = __webpack_require__(13);

	var _BaseDelegate3 = _interopRequireDefault(_BaseDelegate2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NoopDelegate = function (_BaseDelegate) {
	  _inherits(NoopDelegate, _BaseDelegate);

	  function NoopDelegate() {
	    _classCallCheck(this, NoopDelegate);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NoopDelegate).apply(this, arguments));
	  }

	  return NoopDelegate;
	}(_BaseDelegate3.default);

	exports.default = NoopDelegate;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _config = __webpack_require__(2);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Delegator = function () {
	  function Delegator(delegate, $log) {
	    var _this = this;

	    _classCallCheck(this, Delegator);

	    this.delegate = delegate;
	    this.$log = $log;
	    this.handlers = {};
	    this.delegate.observe({
	      afterEventbusConnected: function afterEventbusConnected() {
	        return _this.afterEventbusConnected();
	      }
	    });
	  }

	  _createClass(Delegator, [{
	    key: 'afterEventbusConnected',
	    value: function afterEventbusConnected() {
	      for (var address in this.handlers) {
	        if (Object.prototype.hasOwnProperty.call(this.handlers, address)) {
	          var callbacks = this.handlers[address];
	          if (callbacks && callbacks.length) {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _step$value = _step.value;
	                var headers = _step$value.headers;
	                var callback = _step$value.callback;

	                this.delegate.registerHandler(address, headers, callback);
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }
	          }
	        }
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#registerHandler
	     *
	     * @description
	     * Registers a callback handler for the specified address match.
	     *
	     * @param {string} address target address
	     * @param {object} headers optional headers
	     * @param {function} callback handler with params `(message, replyTo)`
	     * @returns {function} deconstructor
	     */

	  }, {
	    key: 'registerHandler',
	    value: function registerHandler(address, headers, callback) {
	      var _this2 = this;

	      if (!this.handlers[address]) {
	        this.handlers[address] = [];
	      }
	      var handler = { headers: headers, callback: callback };
	      this.handlers[address].push(handler);
	      var unregisterFn = null;
	      if (this.delegate.isConnectionOpen()) {
	        this.delegate.registerHandler(address, headers, callback);
	        unregisterFn = function unregisterFn() {
	          return _this2.delegate.unregisterHandler(address, headers, callback);
	        };
	      }
	      // and return the deregister callback
	      var deconstructor = function deconstructor() {
	        if (unregisterFn) {
	          unregisterFn();
	          unregisterFn = undefined;
	        }
	        // Remove from internal map
	        if (_this2.handlers[address]) {
	          var index = _this2.handlers[address].indexOf(handler);
	          if (index > -1) {
	            _this2.handlers[address].splice(index, 1);
	          }
	          if (_this2.handlers[address].length < 1) {
	            _this2.handlers[address] = undefined;
	          }
	        }
	      };
	      deconstructor.displayName = _config.moduleName + '.service.registerHandler.deconstructor';
	      return deconstructor;
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#on
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler registerHandler()})
	     */

	  }, {
	    key: 'on',
	    value: function on(address, headers, callback) {
	      return this.registerHandler(address, headers, callback);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#addListener
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler registerHandler()})
	     */

	  }, {
	    key: 'addListener',
	    value: function addListener(address, headers, callback) {
	      return this.registerHandler(address, headers, callback);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#unregisterHandler
	     *
	     * @description
	     * Removes a callback handler for the specified address match.
	     *
	     * @param {string} address target address
	     * @param {object} headers optional headers
	     * @param {function} callback handler with params `(message, replyTo)`
	     */

	  }, {
	    key: 'unregisterHandler',
	    value: function unregisterHandler(address, headers, callback) {
	      // Remove from internal map
	      if (this.handlers[address]) {
	        var index = this.handlers[address].indexOf({ headers: headers, callback: callback });
	        if (index > -1) {
	          this.handlers[address].splice(index, 1);
	        }
	        if (this.handlers[address].length < 1) {
	          this.handlers[address] = undefined;
	        }
	      }
	      // Remove from real instance
	      if (this.delegate.isConnectionOpen()) {
	        this.delegate.unregisterHandler(address, headers, callback);
	      }
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#un
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler unregisterHandler()})
	     */

	  }, {
	    key: 'un',
	    value: function un(address, headers, callback) {
	      return this.unregisterHandler(address, headers, callback);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#removeListener
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_registerHandler unregisterHandler()})
	     */

	  }, {
	    key: 'removeListener',
	    value: function removeListener(address, headers, callback) {
	      return this.unregisterHandler(address, headers, callback);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#send
	     *
	     * @description
	     * Sends a message to the specified address (using {@link knalli.angular-vertxbus.vertxEventBus#methods_send vertxEventBus.send()}).
	     *
	     * @param {string} address target address
	     * @param {object} message payload message
	     * @param {object} headers headers
	     * @param {number=} [options.timeout=10000] (in ms) after which the promise will be rejected
	     * @param {boolean=} [options.expectReply=true] if false, the promise will be resolved directly and
	     *                                       no replyHandler will be created
	     * @returns {object} promise
	     */

	  }, {
	    key: 'send',
	    value: function send(address, message) {
	      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	      var options = arguments.length <= 3 || arguments[3] === undefined ? { timeout: 10000, expectReply: true } : arguments[3];

	      return this.delegate.send(address, message, headers, options.timeout, options.expectReply);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#publish
	     *
	     * @description
	     * Publishes a message to the specified address (using {@link knalli.angular-vertxbus.vertxEventBus#methods_publish vertxEventBus.publish()}).
	     *
	     * @param {string} address target address
	     * @param {object} message payload message
	     * @param {object=} headers headers
	     * @returns {object} promise (resolved on either performed or queued)
	     */

	  }, {
	    key: 'publish',
	    value: function publish(address, message) {
	      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      return this.delegate.publish(address, message, headers);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#emit
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_publish publish()})
	     */

	  }, {
	    key: 'emit',
	    value: function emit(address, message) {
	      var headers = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	      return this.publish(address, message, headers);
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#getConnectionState
	     *
	     * @description
	     * Returns the current connection state. The state is being cached internally.
	     *
	     * @returns {number} state type of vertx.EventBus
	     */

	  }, {
	    key: 'getConnectionState',
	    value: function getConnectionState() {
	      return this.delegate.getConnectionState();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#readyState
	     *
	     * @description
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()})
	     */

	  }, {
	    key: 'readyState',
	    value: function readyState() {
	      return this.getConnectionState();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#isConnectionOpen
	     *
	     * @description
	     * Returns true if the current connection state ({@link knalli.angular-vertxbus.vertxEventBusService#methods_getConnectionState getConnectionState()}) is `OPEN`.
	     *
	     * @returns {boolean} connection open state
	     */

	  }, {
	    key: 'isConnectionOpen',
	    value: function isConnectionOpen() {
	      return this.isConnectionOpen();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#isEnabled
	     *
	     * @description
	     * Returns true if service is being enabled.
	     *
	     * @returns {boolean} state
	     */

	  }, {
	    key: 'isEnabled',
	    value: function isEnabled() {
	      return this.delegate.isEnabled();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#isConnected
	     *
	     * @description
	     * Returns true if service (and the eventbus) is being connected.
	     *
	     * @returns {boolean} state
	     */

	  }, {
	    key: 'isConnected',
	    value: function isConnected() {
	      return this.delegate.isConnected();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#isAuthorized
	     *
	     * @description
	     * Returns true if the authorization is valid
	     *
	     * @returns {boolean} state
	     */

	  }, {
	    key: 'isAuthorized',
	    value: function isAuthorized() {
	      return this.delegate.isAuthorized();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#isValidSession
	     *
	     * See (using {@link knalli.angular-vertxbus.vertxEventBusService#methods_isAuthorized isAuthorized()})
	     */

	  }, {
	    key: 'isValidSession',
	    value: function isValidSession() {
	      return this.delegate.isAuthorized();
	    }

	    /**
	     * @ngdoc method
	     * @module knalli.angular-vertxbus
	     * @methodOf knalli.angular-vertxbus.vertxEventBusService
	     * @name .#getMessageQueueLength
	     *
	     * @description
	     * Returns the current amount of messages in the internal buffer.
	     *
	     * @returns {number} amount
	     */

	  }, {
	    key: 'getMessageQueueLength',
	    value: function getMessageQueueLength() {
	      return this.delegate.getMessageQueueLength();
	    }
	  }]);

	  return Delegator;
	}();

	exports.default = Delegator;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-vertxbus.js.map