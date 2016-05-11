(function() {

  var noop = function() {};
  var objectFreeze = (Object.freeze) ? Object.freeze : noop;
  var objectDefineProperty = Object.defineProperty;
  var isString = angular.isString;
  var isFunction = angular.isFunction;
  var isDefined = angular.isDefined;
  var isArray = angular.isArray;
  // ie8 wat
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      if (from < 0) {
        from += len;
      }

      for (; from < len; from++) {
        if (from in this && this[from] === elt) { return from; }
      }
      return -1;
    };
  }

  $WebSocketProvider.$inject = ['$rootScope', '$q', '$timeout', '$websocketBackend'];
  function $WebSocketProvider($rootScope, $q, $timeout, $websocketBackend) {

    function safeDigest(autoApply) {
      if (autoApply && !$rootScope.$$phase) {
        $rootScope.$apply();
      }
    }

    function $WebSocket(url, options) {
      // var bits = url.split('/');

      var protocols = options && options.protocols;
      if (isString(options) || isArray(options)) {
        protocols = options;
      }

      this.protocols = protocols || 'Sec-WebSocket-Protocol';
      this.url = url || 'Missing URL';
      this.ssl = /(wss)/i.test(this.url);

      // this.binaryType = '';
      // this.extensions = '';
      // this.bufferedAmount = 0;
      // this.trasnmitting = false;
      // this.buffer = [];

      this._reconnectAttempts = 0;
      this.initialTimeout = 500; // 500ms
      this.maxTimeout = 5 * 60 * 1000; // 5 minutes
      this.sendQueue = [];
      this.onOpenCallbacks = [];
      this.onMessageCallbacks = [];
      this.onErrorCallbacks = [];
      this.onCloseCallbacks = [];

      objectFreeze(this._readyStateConstants);

      if (url) {
        this._connect();
      } else {
        this._setInternalState(0);
      }
    }

    $WebSocket.prototype._readyStateConstants = {
      'CONNECTING': 0,
      'OPEN': 1,
      'CLOSING': 2,
      'CLOSED': 3,
      'RECONNECT_ABORTED': 4
    };

    $WebSocket.prototype._reconnectableStatusCodes = [
      4000
    ];

    $WebSocket.prototype.close = function (force) {
      if (force || !this.socket.bufferedAmount) {
        this.socket.close();
      }
      return this;
    };

    $WebSocket.prototype._connect = function (force) {
      if (force || !this.socket || this.socket.readyState !== this._readyStateConstants.OPEN) {
        this.socket = $websocketBackend.createWebSocketBackend(this.url, this.protocol);
        this.socket.onopen = this._onOpenHandler.bind(this);
        this.socket.onmessage = this._onMessageHandler.bind(this);
        this.socket.onerror = this._onErrorHandler.bind(this);
        this.socket.onclose = this._onCloseHandler.bind(this);
      }
    };

    $WebSocket.prototype.fireQueue = function () {
      while (this.sendQueue.length && this.socket.readyState === this._readyStateConstants.OPEN) {
        var data = this.sendQueue.shift();

        this.socket.send(
          isString(data.message) ? data.message : JSON.stringify(data.message)
        );
        data.deferred.resolve();
      }
    };

    $WebSocket.prototype.notifyOpenCallbacks = function () {
      for (var i = 0; i < this.onOpenCallbacks.length; i++) {
        this.onOpenCallbacks[i].call(this);
      }
    };

    $WebSocket.prototype.notifyCloseCallbacks = function (event) {
      for (var i = 0; i < this.onCloseCallbacks.length; i++) {
        this.onCloseCallbacks[i].call(this, event);
      }
    };
    $WebSocket.prototype.notifyErrorCallbacks = function (event) {
      for (var i = 0; i < this.onErrorCallbacks.length; i++) {
        this.onErrorCallbacks[i].call(this, event);
      }
    };

    $WebSocket.prototype.onOpen = function (cb) {
      this.onOpenCallbacks.push(cb);
      return this;
    };

    $WebSocket.prototype.onClose = function (cb) {
      this.onCloseCallbacks.push(cb);
      return this;
    };

    $WebSocket.prototype.onError = function (cb) {
      this.onErrorCallbacks.push(cb);
      return this;
    };


    $WebSocket.prototype.onMessage = function (callback, options) {
      if (!isFunction(callback)) {
        throw new Error('Callback must be a function');
      }

      if (options && isDefined(options.filter) && !isString(options.filter) && !(options.filter instanceof RegExp)) {
        throw new Error('Pattern must be a string or regular expression');
      }

      this.onMessageCallbacks.push({
        fn: callback,
        pattern: options ? options.filter : undefined,
        autoApply: options ? options.autoApply : true
      });
      return this;
    };

    $WebSocket.prototype._onOpenHandler = function () {
      this._reconnectAttempts = 0;
      this.notifyOpenCallbacks();
      this.fireQueue();
    };

    $WebSocket.prototype._onCloseHandler = function (event) {
      this.notifyCloseCallbacks(event);
      if (this._reconnectableStatusCodes.indexOf(event.code) > -1) {
        this.reconnect();
      }
    };

    $WebSocket.prototype._onErrorHandler = function (event) {
      this.notifyErrorCallbacks(event);
    };

    $WebSocket.prototype._onMessageHandler = function (message) {
      var pattern;
      var socket = this;
      var currentCallback;
      for (var i = 0; i < socket.onMessageCallbacks.length; i++) {
        currentCallback = socket.onMessageCallbacks[i];
        pattern = currentCallback.pattern;
        if (pattern) {
          if (isString(pattern) && message.data === pattern) {
            currentCallback.fn.call(this, message);
            safeDigest(currentCallback.autoApply);
          }
          else if (pattern instanceof RegExp && pattern.exec(message.data)) {
            currentCallback.fn.call(this, message);
            safeDigest(currentCallback.autoApply);
          }
        }
        else {
          currentCallback.fn.call(this, message);
          safeDigest(currentCallback.autoApply);
        }
      }
    };

    $WebSocket.prototype.send = function (data) {
      var deferred = $q.defer();
      var socket = this;
      var promise = cancelableify(deferred.promise);

      if (socket.readyState === socket._readyStateConstants.RECONNECT_ABORTED) {
        deferred.reject('Socket connection has been closed');
      }
      else {
        this.sendQueue.push({
          message: data,
          deferred: deferred
        });
        this.fireQueue();
      }

      // Credit goes to @btford
      function cancelableify(promise) {
        promise.cancel = cancel;
        var then = promise.then;
        promise.then = function() {
          var newPromise = then.apply(this, arguments);
          return cancelableify(newPromise);
        };
        return promise;
      }

      function cancel(reason) {
        socket.sendQueue.splice(socket.sendQueue.indexOf(data), 1);
        deferred.reject(reason);
        return this;
      }

      return promise;
    };

    $WebSocket.prototype.reconnect = function () {
      this.close();
      $timeout(angular.bind(this, function() {
        this._connect();
      }), this._getBackoffDelay(++this._reconnectAttempts), true);

      return this;
    };
    // Exponential Backoff Formula by Prof. Douglas Thain
    // http://dthain.blogspot.co.uk/2009/02/exponential-backoff-in-distributed.html
    $WebSocket.prototype._getBackoffDelay = function(attempt) {
      var R = Math.random() + 1;
      var T = this.initialTimeout;
      var F = 2;
      var N = attempt;
      var M = this.maxTimeout;

      return Math.floor(Math.min(R * T * Math.pow(F, N), M));
    };

    $WebSocket.prototype._setInternalState = function(state) {
      if (Math.floor(state) !== state || state < 0 || state > 4) {
        throw new Error('state must be an integer between 0 and 4, got: ' + state);
      }

      // ie8 wat
      if (!objectDefineProperty) {
        this.readyState = state || this.socket.readyState;
      }
      this._internalConnectionState = state;


      angular.forEach(this.sendQueue, function(pending) {
        pending.deferred.reject('Message cancelled due to closed socket connection');
      });
    };

    if (objectDefineProperty) {
      objectDefineProperty($WebSocket.prototype, 'readyState', {
        get: function() {
          return this._internalConnectionState || this.socket.readyState;
        },
        set: function() {
          throw new Error('The readyState property is read-only');
        }
      });
    }

    return function(url, protocols) {
      return new $WebSocket(url, protocols);
    };
  }

  $WebSocketBackend.$inject = ['$window'];
  function $WebSocketBackend($window) {
    this.createWebSocketBackend = function (url, protocols) {
      var match = /wss?:\/\//.exec(url);
      var Socket, ws;
      if (!match) {
        throw new Error('Invalid url provided');
      }
      if (typeof exports === 'object' && require) {
        try {
          ws = require('ws');
          Socket = (ws.Client || ws.client || ws);
        } catch(e) {}
      }
      Socket = Socket || $window.WebSocket || $window.MozWebSocket;

      if (protocols) {
        return new Socket(url, protocols);
      }
      return new Socket(url);
    };
  }

  angular.module('ngWebSocket', [])
  .factory('$websocket', $WebSocketProvider)
  .factory('WebSocket',  $WebSocketProvider)
  .service('$websocketBackend', $WebSocketBackend)
  .service('WebSocketBackend', $WebSocketBackend);


  angular.module('angular-websocket', ['ngWebSocket']);

}());
