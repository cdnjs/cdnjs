/*! angular-vertxbus - v2.0.0-beta.1 - 2015-04-20
* http://github.com/knalli/angular-vertxbus
* Copyright (c) 2015 Jan Philipp; Licensed MIT */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var moduleName = 'knalli.angular-vertxbus';

exports.moduleName = moduleName;


},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _moduleName = require('./config');

require('./vertxbus-module');

require('./vertxbus-wrapper');

require('./vertxbus-service');

exports['default'] = _moduleName.moduleName;
module.exports = exports['default'];


},{"./config":1,"./vertxbus-module":12,"./vertxbus-service":13,"./vertxbus-wrapper":14}],3:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 Simple queue implementation

 FIFO: #push() + #first()
 LIFO: #push() + #last()
 */

var Queue = (function () {
  function Queue() {
    var maxSize = arguments[0] === undefined ? 10 : arguments[0];

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
})();

exports["default"] = Queue;
module.exports = exports["default"];


},{}],4:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 Simple Map implementation

 This implementation allows usage of non serializable keys for values.
 */

var SimpleMap = (function () {
  function SimpleMap() {
    _classCallCheck(this, SimpleMap);

    this.clear();
  }

  _createClass(SimpleMap, [{
    key: "put",

    // Stores the value under the key.
    // Chainable
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
  }, {
    key: "get",

    // Returns value for key, otherwise undefined.
    value: function get(key) {
      var idx = this._indexForKey(key);
      if (idx > -1) {
        return this.values[idx];
      }
    }
  }, {
    key: "containsKey",

    // Returns true if the key exists.
    value: function containsKey(key) {
      var idx = this._indexForKey(key);
      return idx > -1;
    }
  }, {
    key: "containsValue",

    // Returns true if the value exists.
    value: function containsValue(value) {
      var idx = this._indexForValue(value);
      return idx > -1;
    }
  }, {
    key: "remove",

    // Removes the key and its value.
    value: function remove(key) {
      var idx = this._indexForKey(key);
      if (idx > -1) {
        this.keys[idx] = undefined;
        this.values[idx] = undefined;
      }
    }
  }, {
    key: "clear",

    // Clears all keys and values.
    value: function clear() {
      this.keys = [];
      this.values = [];
      return this;
    }
  }, {
    key: "_indexForKey",

    // Returns index of key, otherwise -1.
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
})();

exports["default"] = SimpleMap;
module.exports = exports["default"];


},{}],5:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InterfaceService = (function () {
  function InterfaceService(delegate, CONSTANTS) {
    var _this = this;

    _classCallCheck(this, InterfaceService);

    this.delegate = delegate;
    this.CONSTANTS = CONSTANTS;
    this.handlers = [];
    this.delegate.observe({
      afterEventbusConnected: function afterEventbusConnected() {
        return _this.afterEventbusConnected();
      }
    });
  }

  _createClass(InterfaceService, [{
    key: "afterEventbusConnected",
    value: function afterEventbusConnected() {
      for (var address in this.handlers) {
        var callbacks = this.handlers[address];
        if (callbacks && callbacks.length) {
          // Explicit not using For Of because of Symbol requirement (not possible on older envs, i.e. PhantomJS)
          for (var callbackIdx in callbacks) {
            var callback = callbacks[callbackIdx];
            this.delegate.registerHandler(address, callback);
          }
        }
      }
    }
  }, {
    key: "registerHandler",
    value: function registerHandler(address, callback) {
      var _this2 = this;

      if (!this.handlers[address]) {
        this.handlers[address] = [];
      }
      this.handlers[address].push(callback);
      var unregisterFn = null;
      if (this.delegate.isConnectionOpen()) {
        unregisterFn = this.delegate.registerHandler(address, callback);
      }
      // and return the deregister callback
      var deconstructor = function deconstructor() {
        if (unregisterFn) {
          unregisterFn();
        }
        // Remove from internal map
        if (_this2.handlers[address]) {
          var index = _this2.handlers[address].indexOf(callback);
          if (index > -1) {
            _this2.handlers[address].splice(index, 1);
          }
        }
        if (_this2.handlers[address].length < 1) {
          _this2.handlers[address] = undefined;
        }
      };
      deconstructor.displayName = "" + this.CONSTANTS.MODULE + "/" + this.CONSTANTS.COMPONENT + ": registerHandler (deconstructor)";
      return deconstructor;
    }
  }, {
    key: "on",
    value: function on(address, callback) {
      return this.registerHandler(address, callback);
    }
  }, {
    key: "addListener",
    value: function addListener(address, callback) {
      return this.registerHandler(address, callback);
    }
  }, {
    key: "unregisterHandler",
    value: function unregisterHandler(address, callback) {
      // Remove from internal map
      if (this.handlers[address]) {
        var index = this.handlers[address].indexOf(callback);
        if (index > -1) {
          this.handlers[address].splice(index, 1);
        }
      }
      if (this.handlers[address].length < 1) {
        this.handlers[address] = undefined;
      }
      // Remove from real instance
      if (this.delegate.isConnectionOpen()) {
        this.delegate.unregisterHandler(address, callback);
      }
    }
  }, {
    key: "un",
    value: function un(address, callback) {
      return this.unregisterHandler(address, callback);
    }
  }, {
    key: "removeListener",
    value: function removeListener(address, callback) {
      return this.unregisterHandler(address, callback);
    }
  }, {
    key: "send",
    value: function send(address, message) {
      var timeout = arguments[2] === undefined ? 10000 : arguments[2];

      return this.delegate.send(address, message, timeout);
    }
  }, {
    key: "publish",
    value: function publish(address, message) {
      return this.delegate.publish(address, message);
    }
  }, {
    key: "emit",
    value: function emit(address, message) {
      return this.publish(address, message);
    }
  }, {
    key: "getConnectionState",
    value: function getConnectionState() {
      return this.delegate.getConnectionState();
    }
  }, {
    key: "readyState",
    value: function readyState() {
      return this.getConnectionState();
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.delegate.enabled;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this.delegate.connected;
    }
  }, {
    key: "login",
    value: function login(username, password, timeout) {
      return this.delegate.login(username, password, timeout);
    }
  }]);

  return InterfaceService;
})();

exports["default"] = InterfaceService;
module.exports = exports["default"];


},{}],6:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BaseDelegate = (function () {
  function BaseDelegate() {
    _classCallCheck(this, BaseDelegate);
  }

  _createClass(BaseDelegate, [{
    key: "isConnectionOpen",
    value: function isConnectionOpen() {
      return false;
    }
  }, {
    key: "validSession",
    get: function () {
      return false;
    },
    set: function (validSession) {}
  }, {
    key: "enabled",
    get: function () {
      return false;
    }
  }, {
    key: "connected",
    get: function () {
      return false;
    }
  }]);

  return BaseDelegate;
})();

exports["default"] = BaseDelegate;
module.exports = exports["default"];


},{}],7:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Queue = require('./../../helpers/Queue');

var _Queue2 = _interopRequireWildcard(_Queue);

var _SimpleMap = require('./../../helpers/SimpleMap');

var _SimpleMap2 = _interopRequireWildcard(_SimpleMap);

var _BaseDelegate2 = require('./Base');

var _BaseDelegate3 = _interopRequireWildcard(_BaseDelegate2);

var LiveDelegate = (function (_BaseDelegate) {
  function LiveDelegate($rootScope, $interval, $log, $q, eventBus, CONSTANTS, _ref) {
    var enabled = _ref.enabled;
    var debugEnabled = _ref.debugEnabled;
    var prefix = _ref.prefix;
    var urlServer = _ref.urlServer;
    var urlPath = _ref.urlPath;
    var reconnectEnabled = _ref.reconnectEnabled;
    var sockjsStateInterval = _ref.sockjsStateInterval;
    var sockjsReconnectInterval = _ref.sockjsReconnectInterval;
    var sockjsOptions = _ref.sockjsOptions;
    var messageBuffer = _ref.messageBuffer;
    var loginRequired = _ref.loginRequired;

    _classCallCheck(this, LiveDelegate);

    _get(Object.getPrototypeOf(LiveDelegate.prototype), 'constructor', this).call(this);
    this.$rootScope = $rootScope;
    this.$interval = $interval;
    this.$log = $log;
    this.$q = $q;
    this.eventBus = eventBus;
    this.CONSTANTS = CONSTANTS;
    this.options = {
      enabled: enabled,
      debugEnabled: debugEnabled,
      prefix: prefix,
      urlServer: urlServer,
      urlPath: urlPath,
      reconnectEnabled: reconnectEnabled,
      sockjsStateInterval: sockjsStateInterval,
      sockjsReconnectInterval: sockjsReconnectInterval,
      sockjsOptions: sockjsOptions,
      messageBuffer: messageBuffer,
      loginRequired: loginRequired
    };
    this.connectionState = this.eventBus.EventBus.CLOSED;
    this.states = {
      connected: false,
      validSession: false
    };
    this.observers = [];
    // internal store of buffered messages
    this.messageQueue = new _Queue2['default'](this.options.messageBuffer);
    // internal map of callbacks
    this.callbackMap = new _SimpleMap2['default']();
    // asap
    this.initialize();
  }

  _inherits(LiveDelegate, _BaseDelegate);

  _createClass(LiveDelegate, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      this.eventBus.onopen = function () {
        return _this.onEventbusOpen();
      };
      this.eventBus.onclose = function () {
        return _this.onEventbusClose();
      };

      // Update the current connection state periodially.
      var connectionIntervalCheck = function connectionIntervalCheck() {
        return _this.getConnectionState(true);
      };
      connectionIntervalCheck.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': periodic connection check';
      this.$interval(function () {
        return connectionIntervalCheck();
      }, this.options.sockjsStateInterval);
    }
  }, {
    key: 'onEventbusOpen',
    value: function onEventbusOpen() {
      this.getConnectionState(true);
      if (!this.connected) {
        this.connected = true;
        this.$rootScope.$broadcast('' + this.options.prefix + 'system.connected');
      }
      this.afterEventbusConnected();
      this.$rootScope.$digest();
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
  }, {
    key: 'onEventbusClose',
    value: function onEventbusClose() {
      this.getConnectionState(true);
      if (this.connected) {
        this.connected = false;
        this.$rootScope.$broadcast('' + this.options.prefix + 'system.disconnected');
      }
    }
  }, {
    key: 'observe',
    value: function observe(observer) {
      this.observers.push(observer);
    }
  }, {
    key: 'afterEventbusConnected',
    value: function afterEventbusConnected() {
      for (var observerIdx in this.observers) {
        // Explicit not using For Of because of Symbol requirement (not possible on older envs, i.e. PhantomJS)
        var observer = this.observers[observerIdx];
        if (angular.isFunction(observer.afterEventbusConnected)) {
          observer.afterEventbusConnected();
        }
      }
    }
  }, {
    key: 'registerHandler',

    // Register a callback handler for the specified address match.
    value: function registerHandler(address, callback) {
      var _this2 = this;

      if (!angular.isFunction(callback)) {
        return;
      }
      if (this.options.debugEnabled) {
        this.$log.debug('[Vert.x EB Service] Register handler for ' + address);
      }
      var callbackWrapper = function callbackWrapper(message, replyTo) {
        callback(message, replyTo);
        _this2.$rootScope.$digest();
      };
      callbackWrapper.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': util.registerHandler (callback wrapper)';
      this.callbackMap.put(callback, callbackWrapper);
      return this.eventBus.registerHandler(address, callbackWrapper);
    }
  }, {
    key: 'unregisterHandler',

    // Remove a callback handler for the specified address match.
    value: function unregisterHandler(address, callback) {
      if (!angular.isFunction(callback)) {
        return;
      }
      if (this.options.debugEnabled) {
        this.$log.debug('[Vert.x EB Service] Unregister handler for ' + address);
      }
      this.eventBus.unregisterHandler(address, this.callbackMap.get(callback));
      this.callbackMap.remove(callback);
    }
  }, {
    key: 'send',

    // Send a message to the specified address (using EventBus.send).
    // @param address a required string for the targeting address in the bus
    // @param message a required piece of message data
    // @param timeout an optional number for a timout after which the promise will be rejected
    value: function send(address, message) {
      var _this3 = this;

      var timeout = arguments[2] === undefined ? 10000 : arguments[2];

      var deferred = this.$q.defer();
      var next = function next() {
        _this3.eventBus.send(address, message, function (reply) {
          deferred.resolve(reply);
        });
        // Register timeout for promise rejecting
        _this3.$interval(function () {
          return deferred.reject();
        }, timeout, 1);
      };
      next.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': util.send (ensureOpenAuthConnection callback)';
      if (!this.ensureOpenAuthConnection(next)) {
        deferred.reject();
      }
      return deferred.promise;
    }
  }, {
    key: 'publish',

    // Publish a message to the specified address (using EventBus.publish).
    // @param address a required string for the targeting address in the bus
    // @param message a required piece of message data
    value: function publish(address, message) {
      var _this4 = this;

      var next = function next() {
        _this4.eventBus.publish(address, message);
      };
      next.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': util.publish (ensureOpenAuthConnection callback)';
      return this.ensureOpenAuthConnection(next);
    }
  }, {
    key: 'login',

    // Send a login message
    // @param username
    // @param password
    // @param timeout
    value: function login() {
      var _this5 = this;

      var username = arguments[0] === undefined ? this.options.username : arguments[0];
      var password = arguments[1] === undefined ? this.options.password : arguments[1];
      var timeout = arguments[2] === undefined ? 5000 : arguments[2];

      var deferred = this.$q.defer();
      var next = function next(reply) {
        if (reply && reply.status === 'ok') {
          _this5.validSession = true;
          deferred.resolve(reply);
          _this5.$rootScope.$broadcast('' + _this5.options.prefix + 'system.login.succeeded', { status: reply.status });
        } else {
          _this5.validSession = false;
          deferred.reject(reply);
          _this5.$rootScope.$broadcast('' + _this5.options.prefix + 'system.login.failed', { status: reply.status });
        }
      };
      next.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': util.login (callback)';
      this.eventBus.login(username, password, next);
      this.$interval(function () {
        return deferred.reject();
      }, timeout, 1);
      return deferred.promise;
    }
  }, {
    key: 'ensureOpenConnection',
    value: function ensureOpenConnection(fn) {
      if (this.isConnectionOpen()) {
        fn();
        return true;
      } else if (this.options.messageBuffer) {
        this.messageQueue.push(fn);
        return true;
      }
      return false;
    }
  }, {
    key: 'ensureOpenAuthConnection',
    value: function ensureOpenAuthConnection(fn) {
      var _this6 = this;

      if (!this.options.loginRequired) {
        // easy: no login required
        this.ensureOpenConnection(fn);
      } else {
        var wrapFn = function wrapFn() {
          if (_this6.validSession) {
            fn();
            return true;
          } else {
            // ignore this message
            if (_this6.options.debugEnabled) {
              _this6.$log.debug('[Vert.x EB Service] Message was not sent because login is required');
            }
            return false;
          }
        };
        wrapFn.displayName = '' + this.CONSTANTS.MODULE + '/' + this.CONSTANTS.COMPONENT + ': ensureOpenAuthConnection function wrapper';
        this.ensureOpenConnection(wrapFn);
      }
    }
  }, {
    key: 'getConnectionState',
    value: function getConnectionState(immediate) {
      if (this.options.enabled) {
        if (immediate) {
          this.connectionState = this.eventBus.readyState();
        }
      } else {
        this.connectionState = this.eventBus.EventBus.CLOSED;
      }
      return this.connectionState;
    }
  }, {
    key: 'isConnectionOpen',
    value: function isConnectionOpen() {
      return this.getConnectionState() === this.eventBus.EventBus.OPEN;
    }
  }, {
    key: 'validSession',
    get: function () {
      return this.states.validSession;
    },
    set: function (validSession) {
      this.states.validSession = validSession === true;
    }
  }, {
    key: 'connected',
    get: function () {
      return this.states.connected;
    },
    set: function (connected) {
      this.states.connected = connected === true;
    }
  }, {
    key: 'enabled',
    get: function () {
      return this.options.enabled;
    }
  }, {
    key: 'messageQueueLength',
    get: function () {
      return this.messageQueue.size();
    }
  }]);

  return LiveDelegate;
})(_BaseDelegate3['default']);

exports['default'] = LiveDelegate;
module.exports = exports['default'];


},{"./../../helpers/Queue":3,"./../../helpers/SimpleMap":4,"./Base":6}],8:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _BaseDelegate2 = require('./Base');

var _BaseDelegate3 = _interopRequireWildcard(_BaseDelegate2);

var NoopDelegate = (function (_BaseDelegate) {
  function NoopDelegate() {
    _classCallCheck(this, NoopDelegate);

    if (_BaseDelegate != null) {
      _BaseDelegate.apply(this, arguments);
    }
  }

  _inherits(NoopDelegate, _BaseDelegate);

  return NoopDelegate;
})(_BaseDelegate3['default']);

exports['default'] = NoopDelegate;
module.exports = exports['default'];


},{"./Base":6}],9:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BaseWrapper = (function () {
  function BaseWrapper() {
    _classCallCheck(this, BaseWrapper);
  }

  _createClass(BaseWrapper, [{
    key: "connect",
    value: function connect() {}
  }, {
    key: "reconnect",
    value: function reconnect() {}
  }, {
    key: "close",
    value: function close() {}
  }, {
    key: "login",
    value: function login(username, password, replyHandler) {}
  }, {
    key: "send",
    value: function send(address, message, replyHandler) {}
  }, {
    key: "publish",
    value: function publish(address, message) {}
  }, {
    key: "registerHandler",
    value: function registerHandler(address, handler) {}
  }, {
    key: "unregisterHandler",
    value: function unregisterHandler(address, handler) {}
  }, {
    key: "readyState",
    value: function readyState() {}
  }, {
    key: "getOptions",
    value: function getOptions() {
      return {};
    }
  }, {
    key: "onopen",

    // empty: can be overriden by externals
    value: function onopen() {}
  }, {
    key: "onclose",

    // empty: can be overriden by externals
    value: function onclose() {}
  }]);

  return BaseWrapper;
})();

exports["default"] = BaseWrapper;
module.exports = exports["default"];


},{}],10:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _BaseWrapper2 = require("./Base");

var _BaseWrapper3 = _interopRequireWildcard(_BaseWrapper2);

var EventbusWrapper = (function (_BaseWrapper) {
  function EventbusWrapper(EventBus, $timeout, $log, CONSTANTS, _ref) {
    var enabled = _ref.enabled;
    var debugEnabled = _ref.debugEnabled;
    var prefix = _ref.prefix;
    var urlServer = _ref.urlServer;
    var urlPath = _ref.urlPath;
    var reconnectEnabled = _ref.reconnectEnabled;
    var sockjsStateInterval = _ref.sockjsStateInterval;
    var sockjsReconnectInterval = _ref.sockjsReconnectInterval;
    var sockjsOptions = _ref.sockjsOptions;
    var messageBuffer = _ref.messageBuffer;

    _classCallCheck(this, EventbusWrapper);

    _get(Object.getPrototypeOf(EventbusWrapper.prototype), "constructor", this).call(this);
    // actual EventBus type
    this.EventBus = EventBus;
    this.$timeout = $timeout;
    this.$log = $log;
    this.CONSTANTS = CONSTANTS;
    this.options = {
      enabled: enabled,
      debugEnabled: debugEnabled,
      prefix: prefix,
      urlServer: urlServer,
      urlPath: urlPath,
      reconnectEnabled: reconnectEnabled,
      sockjsStateInterval: sockjsStateInterval,
      sockjsReconnectInterval: sockjsReconnectInterval,
      sockjsOptions: sockjsOptions,
      messageBuffer: messageBuffer
    };
    // asap create connection
    this.connect();
  }

  _inherits(EventbusWrapper, _BaseWrapper);

  _createClass(EventbusWrapper, [{
    key: "connect",
    value: function connect() {
      var _this = this;

      var url = "" + this.options.urlServer + "" + this.options.urlPath;
      if (this.options.debugEnabled) {
        this.$log.debug("[Vert.x EB Stub] Enabled: connecting '" + url + "'");
      }
      // Because we have rebuild an EventBus object (because it have to rebuild a SockJS object)
      // we must wrap the object. Therefore, we have to mimic the behavior of onopen and onclose each time.
      this.instance = new this.EventBus(url, undefined, this.options.sockjsOptions);
      this.instance.onopen = function () {
        if (_this.options.debugEnabled) {
          _this.$log.debug("[Vert.x EB Stub] Connected");
        }
        if (angular.isFunction(_this.onopen)) {
          _this.onopen();
        }
      };
      this.instance.onclose = function () {
        if (_this.options.debugEnabled) {
          _this.$log.debug("[Vert.x EB Stub] Reconnect in " + _this.options.sockjsReconnectInterval + "ms");
        }
        if (angular.isFunction(_this.onclose)) {
          _this.onclose();
        }
        _this.instance = undefined;
        if (_this.options.reconnectEnabled) {
          _this.$timeout(function () {
            return _this.connect();
          }, _this.options.sockjsReconnectInterval);
        }
      };
    }
  }, {
    key: "reconnect",
    value: function reconnect() {
      if (this.instance) {
        return this.instance.close();
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this.instance) {
        return this.instance.close();
      }
    }
  }, {
    key: "login",
    value: function login(username, password, replyHandler) {
      if (this.instance) {
        return this.instance.login(username, password, replyHandler);
      }
    }
  }, {
    key: "send",
    value: function send(address, message, replyHandler) {
      if (this.instance) {
        return this.instance.send(address, message, replyHandler);
      }
    }
  }, {
    key: "publish",
    value: function publish(address, message) {
      if (this.instance) {
        return this.instance.publish(address, message);
      }
    }
  }, {
    key: "registerHandler",
    value: function registerHandler(address, handler) {
      var _this2 = this;

      if (this.instance) {
        this.instance.registerHandler(address, handler);
        // and return the deregister callback
        var deconstructor = function deconstructor() {
          _this2.unregisterHandler(address, handler);
        };
        deconstructor.displayName = "" + this.CONSTANTS.MODULE + "/" + this.CONSTANTS.COMPONENT + ": EventBusStub.registerHandler (deconstructor)";
        return deconstructor;
      }
    }
  }, {
    key: "unregisterHandler",
    value: function unregisterHandler(address, handler) {
      if (this.instance) {
        return this.instance.unregisterHandler(address, handler);
      }
    }
  }, {
    key: "readyState",
    value: function readyState() {
      if (this.instance) {
        return this.instance.readyState();
      } else {
        return this.EventBus.CLOSED;
      }
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      // clone options
      return angular.extend({}, this.options);
    }
  }]);

  return EventbusWrapper;
})(_BaseWrapper3["default"]);

exports["default"] = EventbusWrapper;
module.exports = exports["default"];


},{"./Base":9}],11:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _BaseWrapper2 = require('./Base');

var _BaseWrapper3 = _interopRequireWildcard(_BaseWrapper2);

var NoopWrapper = (function (_BaseWrapper) {
  function NoopWrapper() {
    _classCallCheck(this, NoopWrapper);

    if (_BaseWrapper != null) {
      _BaseWrapper.apply(this, arguments);
    }
  }

  _inherits(NoopWrapper, _BaseWrapper);

  return NoopWrapper;
})(_BaseWrapper3['default']);

exports['default'] = NoopWrapper;
module.exports = exports['default'];


},{"./Base":9}],12:[function(require,module,exports){
'use strict';

var _moduleName = require('./config');

angular.module(_moduleName.moduleName, ['ng']);


},{"./config":1}],13:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _moduleName = require('./config');

var _LiveDelegate = require('./lib/service/delegate/Live');

var _LiveDelegate2 = _interopRequireWildcard(_LiveDelegate);

var _NoopDelegate = require('./lib/service/delegate/Noop');

var _NoopDelegate2 = _interopRequireWildcard(_NoopDelegate);

var _InterfaceService = require('./lib/service/InterfaceService');

var _InterfaceService2 = _interopRequireWildcard(_InterfaceService);

angular.module(_moduleName.moduleName).provider('vertxEventBusService', function () {
  var _this = this;

  var CONSTANTS = {
    MODULE: 'angular-vertxbus',
    COMPONENT: 'service'
  };

  var DEFAULT_OPTIONS = {
    loginRequired: false
  };

  // options (globally, application-wide)
  var options = angular.extend({}, DEFAULT_OPTIONS);

  this.requireLogin = function () {
    var value = arguments[0] === undefined ? options.loginRequired : arguments[0];

    options.loginRequired = value === true;
    return _this;
  };

  this.$get = ["$rootScope", "$q", "$interval", "vertxEventBus", "$log", function ($rootScope, $q, $interval, vertxEventBus, $log) {
    var instanceOptions = angular.extend({}, vertxEventBus.getOptions(), options);
    if (instanceOptions.enabled) {
      return new _InterfaceService2['default'](new _LiveDelegate2['default']($rootScope, $interval, $log, $q, vertxEventBus, CONSTANTS, instanceOptions), CONSTANTS);
    } else {
      return new _InterfaceService2['default'](new _NoopDelegate2['default'](), CONSTANTS);
    }
  }]; // $get
});


},{"./config":1,"./lib/service/InterfaceService":5,"./lib/service/delegate/Live":7,"./lib/service/delegate/Noop":8}],14:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _moduleName = require('./config');

var _EventbusWrapper = require('./lib/wrapper/Eventbus');

var _EventbusWrapper2 = _interopRequireWildcard(_EventbusWrapper);

var _NoopWrapper = require('./lib/wrapper/Noop');

var _NoopWrapper2 = _interopRequireWildcard(_NoopWrapper);

angular.module(_moduleName.moduleName).provider('vertxEventBus', function () {
  var _this = this;

  // global constants
  var CONSTANTS = {
    MODULE: 'angular-vertxbus',
    COMPONENT: 'wrapper'
  };

  // default options for this module: TODO doc
  var DEFAULT_OPTIONS = {
    enabled: true,
    debugEnabled: false,
    prefix: 'vertx-eventbus.',
    urlServer: '' + location.protocol + '//' + location.hostname + ((function () {
      if (location.port) {
        return ':' + location.port;
      }
    })() || ''),
    urlPath: '/eventbus',
    reconnectEnabled: true,
    sockjsStateInterval: 10000,
    sockjsReconnectInterval: 10000,
    sockjsOptions: {},
    messageBuffer: 0
  };

  // options (globally, application-wide)
  var options = angular.extend({}, DEFAULT_OPTIONS);

  this.enable = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.enabled : arguments[0];

    options.enabled = value === true;
    return _this;
  };
  this.enable.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.enable';

  this.useDebug = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.debugEnabled : arguments[0];

    options.debugEnabled = value === true;
    return _this;
  };
  this.useDebug.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useDebug';

  this.usePrefix = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.prefix : arguments[0];

    options.prefix = value;
    return _this;
  };
  this.usePrefix.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.usePrefix';

  this.useUrlServer = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.urlServer : arguments[0];

    options.urlServer = value;
    return _this;
  };
  this.useUrlServer.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useUrlServer';

  this.useUrlPath = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.urlPath : arguments[0];

    options.urlPath = value;
    return _this;
  };
  this.useUrlPath.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useUrlPath';

  this.useReconnect = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.reconnectEnabled : arguments[0];

    options.reconnectEnabled = value;
    return _this;
  };
  this.useReconnect.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useReconnect';

  this.useSockJsStateInterval = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.sockjsStateInterval : arguments[0];

    options.sockjsStateInterval = value;
    return _this;
  };
  this.useSockJsStateInterval.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useSockJsStateInterval';

  this.useSockJsReconnectInterval = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.sockjsReconnectInterval : arguments[0];

    options.sockjsReconnectInterval = value;
    return _this;
  };
  this.useSockJsReconnectInterval.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useSockJsReconnectInterval';

  this.useSockJsOptions = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.sockjsOptions : arguments[0];

    options.sockjsOptions = value;
    return _this;
  };
  this.useSockJsOptions.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useSockJsOptions';

  this.useMessageBuffer = function () {
    var value = arguments[0] === undefined ? DEFAULT_OPTIONS.messageBuffer : arguments[0];

    options.messageBuffer = value;
    return _this;
  };
  this.useMessageBuffer.displayName = '' + CONSTANTS.MODULE + '/' + CONSTANTS.COMPONENT + ': provider.useMessageBuffer';

  /*
    A stub representing the Vert.x EventBus (core functionality)
     Because the Event Bus cannot handle a reconnect (because of the underlaying SockJS), a new instance of the bus have to be created.
    This stub ensures only one object holding the current active instance of the bus.
     The stub supports theses VertX Event Bus APIs:
    - close()
    - login(username, password, replyHandler)
    - send(address, message, handler)
    - publish(address, message)
    - registerHandler(adress, handler)
    - unregisterHandler(address, handler)
    - readyState()
     Furthermore, the stub supports theses extra APIs:
    - reconnect()
  */
  this.$get = ["$timeout", "$log", function ($timeout, $log) {

    // Current options (merged defaults with application-wide settings)
    var instanceOptions = angular.extend({}, DEFAULT_OPTIONS, options);

    if (instanceOptions.enabled && vertx && vertx.EventBus) {
      if (instanceOptions.debugEnabled) {
        $log.debug('[Vert.x EB Stub] Enabled');
      }
      return new _EventbusWrapper2['default'](vertx.EventBus, $timeout, $log, CONSTANTS, instanceOptions);
    } else {
      if (instanceOptions.debugEnabled) {
        $log.debug('[Vert.x EB Stub] Disabled');
      }
      return new _NoopWrapper2['default']();
    }
  }]; // $get
});


},{"./config":1,"./lib/wrapper/Eventbus":10,"./lib/wrapper/Noop":11}]},{},[2])
//# sourceMappingURL=angular-vertxbus.js.map
