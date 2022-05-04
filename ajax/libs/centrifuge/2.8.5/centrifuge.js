(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Centrifuge", [], factory);
	else if(typeof exports === 'object')
		exports["Centrifuge"] = factory();
	else
		root["Centrifuge"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 382:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Centrifuge = void 0;

var _events = _interopRequireDefault(__webpack_require__(187));

var _subscription = _interopRequireDefault(__webpack_require__(471));

var _json = __webpack_require__(147);

var _utils = __webpack_require__(853);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _errorTimeout = 'timeout';
var _errorConnectionClosed = 'connection closed';

var Centrifuge = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Centrifuge, _EventEmitter);

  var _super = _createSuper(Centrifuge);

  function Centrifuge(url, options) {
    var _this;

    _classCallCheck(this, Centrifuge);

    _this = _super.call(this);
    _this._url = url;
    _this._websocket = null;
    _this._sockjs = null;
    _this._isSockjs = false;
    _this._xmlhttprequest = null;
    _this._binary = false;
    _this._methodType = null;
    _this._pushType = null;
    _this._encoder = null;
    _this._decoder = null;
    _this._status = 'disconnected';
    _this._reconnect = true;
    _this._reconnecting = false;
    _this._transport = null;
    _this._transportName = null;
    _this._transportClosed = true;
    _this._messageId = 0;
    _this._clientID = null;
    _this._refreshRequired = false;
    _this._subs = {};
    _this._serverSubs = {};
    _this._lastSeq = {};
    _this._lastGen = {};
    _this._lastOffset = {};
    _this._lastEpoch = {};
    _this._messages = [];
    _this._isBatching = false;
    _this._isSubscribeBatching = false;
    _this._privateChannels = {};
    _this._numRefreshFailed = 0;
    _this._refreshTimeout = null;
    _this._pingTimeout = null;
    _this._pongTimeout = null;
    _this._subRefreshTimeouts = {};
    _this._retries = 0;
    _this._callbacks = {};
    _this._latency = null;
    _this._latencyStart = null;
    _this._connectData = null;
    _this._token = null;
    _this._xhrID = 0;
    _this._xhrs = {};
    _this._dispatchPromise = Promise.resolve();
    _this._protocol = '';
    _this._config = {
      protocol: '',
      debug: false,
      name: 'js',
      version: '',
      websocket: null,
      sockjs: null,
      xmlhttprequest: null,
      minRetry: 1000,
      maxRetry: 20000,
      timeout: 5000,
      ping: true,
      pingInterval: 25000,
      pongWaitTimeout: 5000,
      privateChannelPrefix: '$',
      onTransportClose: null,
      sockjsServer: null,
      sockjsTimeout: null,
      sockjsTransports: ['websocket', 'xdr-streaming', 'xhr-streaming', 'eventsource', 'iframe-eventsource', 'iframe-htmlfile', 'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling'],
      refreshEndpoint: '/centrifuge/refresh',
      refreshHeaders: {},
      refreshParams: {},
      refreshData: {},
      refreshAttempts: null,
      refreshInterval: 1000,
      onRefreshFailed: null,
      onRefresh: null,
      subscribeEndpoint: '/centrifuge/subscribe',
      subscribeHeaders: {},
      subscribeParams: {},
      subRefreshInterval: 1000,
      onPrivateSubscribe: null,
      disableWithCredentials: false
    };

    _this._configure(options);

    return _this;
  }

  _createClass(Centrifuge, [{
    key: "setToken",
    value: function setToken(token) {
      this._token = token;
    }
  }, {
    key: "setConnectData",
    value: function setConnectData(data) {
      this._connectData = data;
    }
  }, {
    key: "setRefreshHeaders",
    value: function setRefreshHeaders(headers) {
      this._config.refreshHeaders = headers;
    }
  }, {
    key: "setRefreshParams",
    value: function setRefreshParams(params) {
      this._config.refreshParams = params;
    }
  }, {
    key: "setRefreshData",
    value: function setRefreshData(data) {
      this._config.refreshData = data;
    }
  }, {
    key: "setSubscribeHeaders",
    value: function setSubscribeHeaders(headers) {
      this._config.subscribeHeaders = headers;
    }
  }, {
    key: "setSubscribeParams",
    value: function setSubscribeParams(params) {
      this._config.subscribeParams = params;
    }
  }, {
    key: "_ajax",
    value: function _ajax(url, params, headers, data, callback) {
      var _this2 = this;

      var query = '';

      this._debug('sending AJAX request to', url, 'with data', JSON.stringify(data));

      var xhr;

      if (this._xmlhttprequest !== null) {
        // use explicitly passed XMLHttpRequest object.
        xhr = new this._xmlhttprequest();
      } else {
        xhr = __webpack_require__.g.XMLHttpRequest ? new __webpack_require__.g.XMLHttpRequest() : new __webpack_require__.g.ActiveXObject('Microsoft.XMLHTTP');
      }

      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          if (query.length > 0) {
            query += '&';
          }

          query += encodeURIComponent(i) + '=' + encodeURIComponent(params[i]);
        }
      }

      if (query.length > 0) {
        query = '?' + query;
      }

      xhr.open('POST', url + query, true);

      if ('withCredentials' in xhr) {
        xhr.withCredentials = !this._config.disableWithCredentials;
      }

      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Content-Type', 'application/json');

      for (var headerName in headers) {
        if (headers.hasOwnProperty(headerName)) {
          xhr.setRequestHeader(headerName, headers[headerName]);
        }
      }

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var _data,
                parsed = false;

            try {
              _data = JSON.parse(xhr.responseText);
              parsed = true;
            } catch (e) {
              callback({
                error: 'Invalid JSON. Data was: ' + xhr.responseText,
                status: 200,
                data: null
              });
            }

            if (parsed) {
              // prevents double execution.
              callback({
                data: _data,
                status: 200
              });
            }
          } else {
            _this2._log('wrong status code in AJAX response', xhr.status);

            callback({
              status: xhr.status,
              data: null
            });
          }
        }
      };

      setTimeout(function () {
        return xhr.send(JSON.stringify(data));
      }, 20);
      return xhr;
    }
  }, {
    key: "_log",
    value: function _log() {
      (0, _utils.log)('info', arguments);
    }
  }, {
    key: "_debug",
    value: function _debug() {
      if (this._config.debug === true) {
        (0, _utils.log)('debug', arguments);
      }
    }
  }, {
    key: "_websocketSupported",
    value: function _websocketSupported() {
      if (this._config.websocket !== null) {
        return true;
      }

      return !(typeof WebSocket !== 'function' && (typeof WebSocket === "undefined" ? "undefined" : _typeof(WebSocket)) !== 'object');
    }
  }, {
    key: "_setFormat",
    value: function _setFormat(format) {
      if (this._formatOverride(format)) {
        return;
      }

      if (format === 'protobuf') {
        throw new Error('not implemented by JSON only Centrifuge client – use client with Protobuf');
      }

      this._binary = false;
      this._methodType = _json.JsonMethodType;
      this._pushType = _json.JsonPushType;
      this._encoder = new _json.JsonEncoder();
      this._decoder = new _json.JsonDecoder();
    }
  }, {
    key: "_formatOverride",
    value: function _formatOverride(format) {
      return false;
    }
  }, {
    key: "_configure",
    value: function _configure(configuration) {
      if (!('Promise' in __webpack_require__.g)) {
        throw new Error('Promise polyfill required');
      }

      (0, _utils.extend)(this._config, configuration || {});

      this._debug('centrifuge config', this._config);

      if (!this._url) {
        throw new Error('url required');
      }

      var isProtobufURL = (0, _utils.startsWith)(this._url, 'ws') && this._url.indexOf('format=protobuf') > -1;

      if (isProtobufURL || this._config.protocol === 'protobuf') {
        this._setFormat('protobuf');

        this._protocol = 'protobuf';
      } else {
        if (this._config.protocol !== '' && this._config.protocol !== 'json') {
          throw new Error('unsupported protocol ' + this._config.protocol);
        }

        this._setFormat('json');
      }

      if ((0, _utils.startsWith)(this._url, 'http')) {
        this._debug('client will try to connect to SockJS endpoint');

        if (this._config.sockjs !== null) {
          this._debug('SockJS explicitly provided in options');

          this._sockjs = this._config.sockjs;
        } else {
          if (typeof __webpack_require__.g.SockJS === 'undefined') {
            throw new Error('SockJS not found, use ws:// in url or include SockJS');
          }

          this._debug('use globally defined SockJS');

          this._sockjs = __webpack_require__.g.SockJS;
        }
      } else {
        this._debug('client will connect to websocket endpoint');
      }

      this._xmlhttprequest = this._config.xmlhttprequest;
    }
  }, {
    key: "_setStatus",
    value: function _setStatus(newStatus) {
      if (this._status !== newStatus) {
        this._debug('Status', this._status, '->', newStatus);

        this._status = newStatus;
      }
    }
  }, {
    key: "_isDisconnected",
    value: function _isDisconnected() {
      return this._status === 'disconnected';
    }
  }, {
    key: "_isConnecting",
    value: function _isConnecting() {
      return this._status === 'connecting';
    }
  }, {
    key: "_isConnected",
    value: function _isConnected() {
      return this._status === 'connected';
    }
  }, {
    key: "_nextMessageId",
    value: function _nextMessageId() {
      return ++this._messageId;
    }
  }, {
    key: "_resetRetry",
    value: function _resetRetry() {
      this._debug('reset retries count to 0');

      this._retries = 0;
    }
  }, {
    key: "_getRetryInterval",
    value: function _getRetryInterval() {
      var interval = (0, _utils.backoff)(this._retries, this._config.minRetry, this._config.maxRetry);
      this._retries += 1;
      return interval;
    }
  }, {
    key: "_abortInflightXHRs",
    value: function _abortInflightXHRs() {
      for (var xhrID in this._xhrs) {
        try {
          this._xhrs[xhrID].abort();
        } catch (e) {
          this._debug('error aborting xhr', e);
        }

        delete this._xhrs[xhrID];
      }
    }
  }, {
    key: "_clearConnectedState",
    value: function _clearConnectedState(reconnect) {
      this._clientID = null;

      this._stopPing(); // fire errbacks of registered outgoing calls.


      for (var id in this._callbacks) {
        if (this._callbacks.hasOwnProperty(id)) {
          var callbacks = this._callbacks[id];
          clearTimeout(callbacks.timeout);
          var errback = callbacks.errback;

          if (!errback) {
            continue;
          }

          errback({
            error: this._createErrorObject('disconnected')
          });
        }
      }

      this._callbacks = {}; // fire unsubscribe events

      for (var channel in this._subs) {
        if (this._subs.hasOwnProperty(channel)) {
          var sub = this._subs[channel];

          if (reconnect) {
            if (sub._isSuccess()) {
              sub._triggerUnsubscribe();

              sub._recover = true;
            }

            if (sub._shouldResubscribe()) {
              sub._setSubscribing();
            }
          } else {
            sub._setUnsubscribed();
          }
        }
      }

      this._abortInflightXHRs(); // clear refresh timer


      if (this._refreshTimeout !== null) {
        clearTimeout(this._refreshTimeout);
        this._refreshTimeout = null;
      } // clear sub refresh timers


      for (var _channel in this._subRefreshTimeouts) {
        if (this._subRefreshTimeouts.hasOwnProperty(_channel) && this._subRefreshTimeouts[_channel]) {
          this._clearSubRefreshTimeout(_channel);
        }
      }

      this._subRefreshTimeouts = {};

      if (!this._reconnect) {
        // completely clear subscriptions
        this._subs = {};
      }
    }
  }, {
    key: "_isTransportOpen",
    value: function _isTransportOpen() {
      if (this._isSockjs) {
        return this._transport && this._transport.transport && this._transport.transport.readyState === this._transport.transport.OPEN;
      }

      return this._transport && this._transport.readyState === this._transport.OPEN;
    }
  }, {
    key: "_transportSend",
    value: function _transportSend(commands) {
      if (!commands.length) {
        return true;
      }

      if (!this._isTransportOpen()) {
        // resolve pending commands with error if transport is not open
        for (var command in commands) {
          var id = command.id;

          if (!(id in this._callbacks)) {
            continue;
          }

          var callbacks = this._callbacks[id];
          clearTimeout(this._callbacks[id].timeout);
          delete this._callbacks[id];
          var errback = callbacks.errback;
          errback({
            error: this._createErrorObject(_errorConnectionClosed, 0)
          });
        }

        return false;
      }

      this._transport.send(this._encoder.encodeCommands(commands));

      return true;
    }
  }, {
    key: "_getSubProtocol",
    value: function _getSubProtocol() {
      if (!this._protocol) {
        return '';
      }

      return 'centrifuge-' + this._protocol;
    }
  }, {
    key: "_setupTransport",
    value: function _setupTransport() {
      var _this3 = this;

      this._isSockjs = false; // detect transport to use - SockJS or Websocket

      if (this._sockjs !== null) {
        var sockjsOptions = {
          transports: this._config.sockjsTransports
        };

        if (this._config.sockjsServer !== null) {
          sockjsOptions.server = this._config.sockjsServer;
        }

        if (this._config.sockjsTimeout !== null) {
          sockjsOptions.timeout = this._config.sockjsTimeout;
        }

        this._isSockjs = true;
        this._transport = new this._sockjs(this._url, null, sockjsOptions);
      } else {
        if (!this._websocketSupported()) {
          this._debug('No Websocket support and no SockJS configured, can not connect');

          throw new Error('No Websocket support and no SockJS configured, can not connect');
        }

        if (this._config.websocket !== null) {
          this._websocket = this._config.websocket;
        } else {
          this._websocket = WebSocket;
        }

        var subProtocol = this._getSubProtocol();

        if (subProtocol !== '') {
          this._transport = new this._websocket(this._url, subProtocol);
        } else {
          this._transport = new this._websocket(this._url);
        }

        if (this._binary === true) {
          this._transport.binaryType = 'arraybuffer';
        }
      }

      this._transport.onopen = function () {
        _this3._transportClosed = false;

        if (_this3._isSockjs) {
          _this3._transportName = 'sockjs-' + _this3._transport.transport;

          _this3._transport.onheartbeat = function () {
            return _this3._restartPing();
          };
        } else {
          _this3._transportName = 'websocket';
        } // Can omit method here due to zero value.


        var msg = {// method: this._methodType.CONNECT
        };

        if (_this3._token || _this3._connectData || _this3._config.name || _this3._config.version) {
          msg.params = {};
        }

        if (_this3._token) {
          msg.params.token = _this3._token;
        }

        if (_this3._connectData) {
          msg.params.data = _this3._connectData;
        }

        if (_this3._config.name) {
          msg.params.name = _this3._config.name;
        }

        if (_this3._config.version) {
          msg.params.version = _this3._config.version;
        }

        var subs = {};
        var hasSubs = false;

        for (var channel in _this3._serverSubs) {
          if (_this3._serverSubs.hasOwnProperty(channel) && _this3._serverSubs[channel].recoverable) {
            hasSubs = true;
            var sub = {
              'recover': true
            };

            if (_this3._serverSubs[channel].seq || _this3._serverSubs[channel].gen) {
              if (_this3._serverSubs[channel].seq) {
                sub['seq'] = _this3._serverSubs[channel].seq;
              }

              if (_this3._serverSubs[channel].gen) {
                sub['gen'] = _this3._serverSubs[channel].gen;
              }
            } else {
              if (_this3._serverSubs[channel].offset) {
                sub['offset'] = _this3._serverSubs[channel].offset;
              }
            }

            if (_this3._serverSubs[channel].epoch) {
              sub['epoch'] = _this3._serverSubs[channel].epoch;
            }

            subs[channel] = sub;
          }
        }

        if (hasSubs) {
          if (!msg.params) {
            msg.params = {};
          }

          msg.params.subs = subs;
        }

        _this3._latencyStart = new Date();

        _this3._call(msg).then(function (resolveCtx) {
          _this3._connectResponse(_this3._decoder.decodeCommandResult(_this3._methodType.CONNECT, resolveCtx.result), hasSubs);

          if (resolveCtx.next) {
            resolveCtx.next();
          }
        }, function (rejectCtx) {
          var err = rejectCtx.error;

          if (err.code === 109) {
            // token expired.
            _this3._refreshRequired = true;
          }

          _this3._disconnect('connect error', true);

          if (rejectCtx.next) {
            rejectCtx.next();
          }
        });
      };

      this._transport.onerror = function (error) {
        _this3._debug('transport level error', error);
      };

      this._transport.onclose = function (closeEvent) {
        _this3._transportClosed = true;
        var reason = _errorConnectionClosed;
        var needReconnect = true;

        if (closeEvent && 'reason' in closeEvent && closeEvent.reason) {
          try {
            var advice = JSON.parse(closeEvent.reason);

            _this3._debug('reason is an advice object', advice);

            reason = advice.reason;
            needReconnect = advice.reconnect;
          } catch (e) {
            reason = closeEvent.reason;

            _this3._debug('reason is a plain string', reason);
          }
        } // onTransportClose callback should be executed every time transport was closed.
        // This can be helpful to catch failed connection events (because our disconnect
        // event only called once and every future attempts to connect do not fire disconnect
        // event again).


        if (_this3._config.onTransportClose !== null) {
          _this3._config.onTransportClose({
            event: closeEvent,
            reason: reason,
            reconnect: needReconnect
          });
        }

        _this3._disconnect(reason, needReconnect);

        if (_this3._reconnect === true) {
          _this3._reconnecting = true;

          var interval = _this3._getRetryInterval();

          _this3._debug('reconnect after ' + interval + ' milliseconds');

          setTimeout(function () {
            if (_this3._reconnect === true) {
              if (_this3._refreshRequired) {
                _this3._refresh();
              } else {
                _this3._connect();
              }
            }
          }, interval);
        }
      };

      this._transport.onmessage = function (event) {
        _this3._dataReceived(event.data);
      };
    }
  }, {
    key: "rpc",
    value: function rpc(data) {
      return this._rpc('', data);
    }
  }, {
    key: "namedRPC",
    value: function namedRPC(method, data) {
      return this._rpc(method, data);
    }
  }, {
    key: "_rpc",
    value: function _rpc(method, data) {
      var params = {
        data: data
      };

      if (method !== '') {
        params.method = method;
      }

      ;
      var msg = {
        method: this._methodType.RPC,
        params: params
      };
      return this._methodCall(msg, function (result) {
        return result;
      });
    }
  }, {
    key: "send",
    value: function send(data) {
      var msg = {
        method: this._methodType.SEND,
        params: {
          data: data
        }
      };

      if (!this.isConnected()) {
        return Promise.reject(this._createErrorObject(_errorConnectionClosed, 0));
      }

      var sent = this._transportSend([msg]); // can send async message to server without id set


      if (!sent) {
        return Promise.reject(this._createErrorObject(_errorConnectionClosed, 0));
      }

      ;
      return Promise.resolve({});
    }
  }, {
    key: "_getHistoryParams",
    value: function _getHistoryParams(channel, options) {
      var params = {
        channel: channel
      };

      if (options !== undefined) {
        if (options.since) {
          params['since'] = {
            'offset': options.since.offset
          };

          if (options.since.epoch) {
            params['since']['epoch'] = options.since.epoch;
          }
        }

        ;

        if (options.limit !== undefined) {
          params['limit'] = options.limit;
        }

        if (options.reverse === true) {
          params['reverse'] = true;
        }
      }

      ;
      return params;
    }
  }, {
    key: "_methodCall",
    value: function _methodCall(msg, resultCB) {
      var _this4 = this;

      if (!this.isConnected()) {
        return Promise.reject(this._createErrorObject(_errorConnectionClosed, 0));
      }

      return new Promise(function (resolve, reject) {
        _this4._call(msg).then(function (resolveCtx) {
          resolve(resultCB(_this4._decoder.decodeCommandResult(msg.method, resolveCtx.result)));

          if (resolveCtx.next) {
            resolveCtx.next();
          }
        }, function (rejectCtx) {
          reject(rejectCtx.error);

          if (rejectCtx.next) {
            rejectCtx.next();
          }
        });
      });
    }
  }, {
    key: "publish",
    value: function publish(channel, data) {
      var msg = {
        method: this._methodType.PUBLISH,
        params: {
          channel: channel,
          data: data
        }
      };
      return this._methodCall(msg, function () {
        return {};
      });
    }
  }, {
    key: "history",
    value: function history(channel, options) {
      var params = this._getHistoryParams(channel, options);

      var msg = {
        method: this._methodType.HISTORY,
        params: params
      };
      return this._methodCall(msg, function (result) {
        return {
          'publications': result.publications,
          'epoch': result.epoch || '',
          'offset': result.offset || 0
        };
      });
    }
  }, {
    key: "presence",
    value: function presence(channel) {
      var msg = {
        method: this._methodType.PRESENCE,
        params: {
          channel: channel
        }
      };
      return this._methodCall(msg, function (result) {
        return {
          'presence': result.presence
        };
      });
    }
  }, {
    key: "presenceStats",
    value: function presenceStats(channel) {
      var msg = {
        method: this._methodType.PRESENCE_STATS,
        params: {
          channel: channel
        }
      };
      return this._methodCall(msg, function (result) {
        return {
          'num_users': result.num_users,
          'num_clients': result.num_clients
        };
      });
    }
  }, {
    key: "_dataReceived",
    value: function _dataReceived(data) {
      var _this5 = this;

      var replies = this._decoder.decodeReplies(data); // we have to guarantee order of events in replies processing - i.e. start processing
      // next reply only when we finished processing of current one. Without syncing things in
      // this way we could get wrong publication events order as reply promises resolve
      // on next loop tick so for loop continues before we finished emitting all reply events.


      this._dispatchPromise = this._dispatchPromise.then(function () {
        var finishDispatch;
        _this5._dispatchPromise = new Promise(function (resolve) {
          finishDispatch = resolve;
        });

        _this5._dispatchSynchronized(replies, finishDispatch);
      });

      this._restartPing();
    }
  }, {
    key: "_dispatchSynchronized",
    value: function _dispatchSynchronized(replies, finishDispatch) {
      var _this6 = this;

      var p = Promise.resolve();

      var _loop = function _loop(i) {
        if (replies.hasOwnProperty(i)) {
          p = p.then(function () {
            return _this6._dispatchReply(replies[i]);
          });
        }
      };

      for (var i in replies) {
        _loop(i);
      }

      p = p.then(function () {
        finishDispatch();
      });
    }
  }, {
    key: "_dispatchReply",
    value: function _dispatchReply(reply) {
      var next;
      var p = new Promise(function (resolve) {
        next = resolve;
      });

      if (reply === undefined || reply === null) {
        this._debug('dispatch: got undefined or null reply');

        next();
        return p;
      }

      var id = reply.id;

      if (id && id > 0) {
        this._handleReply(reply, next);
      } else {
        this._handlePush(reply.result, next);
      }

      return p;
    }
  }, {
    key: "_call",
    value: function _call(msg) {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        var id = _this7._addMessage(msg);

        _this7._registerCall(id, resolve, reject);
      });
    }
  }, {
    key: "_connect",
    value: function _connect() {
      if (this.isConnected()) {
        this._debug('connect called when already connected');

        return;
      }

      if (this._status === 'connecting') {
        return;
      }

      this._debug('start connecting');

      this._setStatus('connecting');

      this._clientID = null;
      this._reconnect = true;

      this._setupTransport();
    }
  }, {
    key: "_disconnect",
    value: function _disconnect(reason, shouldReconnect) {
      var reconnect = shouldReconnect || false;

      if (reconnect === false) {
        this._reconnect = false;
      }

      if (this._isDisconnected()) {
        if (!reconnect) {
          this._clearConnectedState(reconnect);
        }

        return;
      }

      this._clearConnectedState(reconnect);

      this._debug('disconnected:', reason, shouldReconnect);

      this._setStatus('disconnected');

      if (this._refreshTimeout) {
        clearTimeout(this._refreshTimeout);
        this._refreshTimeout = null;
      }

      if (this._reconnecting === false) {
        // fire unsubscribe events for server side subs.
        for (var channel in this._serverSubs) {
          if (this._serverSubs.hasOwnProperty(channel)) {
            this.emit('unsubscribe', {
              channel: channel
            });
          }
        }

        this.emit('disconnect', {
          reason: reason,
          reconnect: reconnect
        });
      }

      if (reconnect === false) {
        this._subs = {};
        this._serverSubs = {};
      }

      if (!this._transportClosed) {
        this._transport.close();
      }
    }
  }, {
    key: "_refreshFailed",
    value: function _refreshFailed() {
      this._numRefreshFailed = 0;

      if (!this._isDisconnected()) {
        this._disconnect('refresh failed', false);
      }

      if (this._config.onRefreshFailed !== null) {
        this._config.onRefreshFailed();
      }
    }
  }, {
    key: "_refresh",
    value: function _refresh() {
      var _this8 = this;

      // ask application for new connection token.
      this._debug('refresh token');

      if (this._config.refreshAttempts === 0) {
        this._debug('refresh attempts set to 0, do not send refresh request at all');

        this._refreshFailed();

        return;
      }

      if (this._refreshTimeout !== null) {
        clearTimeout(this._refreshTimeout);
        this._refreshTimeout = null;
      }

      var clientID = this._clientID;

      var xhrID = this._newXHRID();

      var cb = function cb(resp) {
        if (xhrID in _this8._xhrs) {
          delete _this8._xhrs[xhrID];
        }

        if (_this8._clientID !== clientID) {
          return;
        }

        if (resp.error || resp.status !== 200) {
          // We don't perform any connection status related actions here as we are
          // relying on server that must close connection eventually.
          if (resp.error) {
            _this8._debug('error refreshing connection token', resp.error);
          } else {
            _this8._debug('error refreshing connection token: wrong status code', resp.status);
          }

          _this8._numRefreshFailed++;

          if (_this8._refreshTimeout !== null) {
            clearTimeout(_this8._refreshTimeout);
            _this8._refreshTimeout = null;
          }

          if (_this8._config.refreshAttempts !== null && _this8._numRefreshFailed >= _this8._config.refreshAttempts) {
            _this8._refreshFailed();

            return;
          }

          var jitter = Math.round(Math.random() * 1000 * Math.max(_this8._numRefreshFailed, 20));
          var interval = _this8._config.refreshInterval + jitter;
          _this8._refreshTimeout = setTimeout(function () {
            return _this8._refresh();
          }, interval);
          return;
        }

        _this8._numRefreshFailed = 0;
        _this8._token = resp.data.token;

        if (!_this8._token) {
          _this8._refreshFailed();

          return;
        }

        if (_this8._isDisconnected() && _this8._reconnect) {
          _this8._debug('token refreshed, connect from scratch');

          _this8._connect();
        } else {
          _this8._debug('send refreshed token');

          var msg = {
            method: _this8._methodType.REFRESH,
            params: {
              token: _this8._token
            }
          };

          _this8._call(msg).then(function (resolveCtx) {
            _this8._refreshResponse(_this8._decoder.decodeCommandResult(_this8._methodType.REFRESH, resolveCtx.result));

            if (resolveCtx.next) {
              resolveCtx.next();
            }
          }, function (rejectCtx) {
            _this8._refreshError(rejectCtx.error);

            if (rejectCtx.next) {
              rejectCtx.next();
            }
          });
        }
      };

      if (this._config.onRefresh !== null) {
        var context = {};

        this._config.onRefresh(context, cb);
      } else {
        var xhr = this._ajax(this._config.refreshEndpoint, this._config.refreshParams, this._config.refreshHeaders, this._config.refreshData, cb);

        this._xhrs[xhrID] = xhr;
      }
    }
  }, {
    key: "_refreshError",
    value: function _refreshError(err) {
      var _this9 = this;

      this._debug('refresh error', err);

      if (this._refreshTimeout) {
        clearTimeout(this._refreshTimeout);
        this._refreshTimeout = null;
      }

      var interval = this._config.refreshInterval + Math.round(Math.random() * 1000);
      this._refreshTimeout = setTimeout(function () {
        return _this9._refresh();
      }, interval);
    }
  }, {
    key: "_refreshResponse",
    value: function _refreshResponse(result) {
      var _this10 = this;

      if (this._refreshTimeout) {
        clearTimeout(this._refreshTimeout);
        this._refreshTimeout = null;
      }

      if (result.expires) {
        this._clientID = result.client;
        this._refreshTimeout = setTimeout(function () {
          return _this10._refresh();
        }, this._getTTLMilliseconds(result.ttl));
      }
    }
  }, {
    key: "_newXHRID",
    value: function _newXHRID() {
      this._xhrID++;
      return this._xhrID;
    }
  }, {
    key: "_subRefresh",
    value: function _subRefresh(channel) {
      var _this11 = this;

      this._debug('refresh subscription token for channel', channel);

      if (this._subRefreshTimeouts[channel] !== undefined) {
        this._clearSubRefreshTimeout(channel);
      } else {
        return;
      }

      var clientID = this._clientID;

      var xhrID = this._newXHRID();

      var cb = function cb(resp) {
        if (xhrID in _this11._xhrs) {
          delete _this11._xhrs[xhrID];
        }

        if (resp.error || resp.status !== 200 || _this11._clientID !== clientID) {
          return;
        }

        var channelsData = {};

        if (resp.data.channels) {
          for (var i in resp.data.channels) {
            var channelData = resp.data.channels[i];

            if (!channelData.channel) {
              continue;
            }

            channelsData[channelData.channel] = channelData.token;
          }
        }

        var token = channelsData[channel];

        if (!token) {
          return;
        }

        var msg = {
          method: _this11._methodType.SUB_REFRESH,
          params: {
            channel: channel,
            token: token
          }
        };

        var sub = _this11._getSub(channel);

        if (sub === null) {
          return;
        }

        _this11._call(msg).then(function (resolveCtx) {
          _this11._subRefreshResponse(channel, _this11._decoder.decodeCommandResult(_this11._methodType.SUB_REFRESH, resolveCtx.result));

          if (resolveCtx.next) {
            resolveCtx.next();
          }
        }, function (rejectCtx) {
          _this11._subRefreshError(channel, rejectCtx.error);

          if (rejectCtx.next) {
            rejectCtx.next();
          }
        });
      };

      var data = {
        client: this._clientID,
        channels: [channel]
      };

      if (this._config.onPrivateSubscribe !== null) {
        this._config.onPrivateSubscribe({
          data: data
        }, cb);
      } else {
        var xhr = this._ajax(this._config.subscribeEndpoint, this._config.subscribeParams, this._config.subscribeHeaders, data, cb);

        this._xhrs[xhrID] = xhr;
      }
    }
  }, {
    key: "_clearSubRefreshTimeout",
    value: function _clearSubRefreshTimeout(channel) {
      if (this._subRefreshTimeouts[channel] !== undefined) {
        clearTimeout(this._subRefreshTimeouts[channel]);
        delete this._subRefreshTimeouts[channel];
      }
    }
  }, {
    key: "_subRefreshError",
    value: function _subRefreshError(channel, err) {
      var _this12 = this;

      this._debug('subscription refresh error', channel, err);

      this._clearSubRefreshTimeout(channel);

      var sub = this._getSub(channel);

      if (sub === null) {
        return;
      }

      var jitter = Math.round(Math.random() * 1000);
      var subRefreshTimeout = setTimeout(function () {
        return _this12._subRefresh(channel);
      }, this._config.subRefreshInterval + jitter);
      this._subRefreshTimeouts[channel] = subRefreshTimeout;
      return;
    }
  }, {
    key: "_subRefreshResponse",
    value: function _subRefreshResponse(channel, result) {
      var _this13 = this;

      this._debug('subscription refresh success', channel);

      this._clearSubRefreshTimeout(channel);

      var sub = this._getSub(channel);

      if (sub === null) {
        return;
      }

      if (result.expires === true) {
        var subRefreshTimeout = setTimeout(function () {
          return _this13._subRefresh(channel);
        }, this._getTTLMilliseconds(result.ttl));
        this._subRefreshTimeouts[channel] = subRefreshTimeout;
      }

      return;
    }
  }, {
    key: "_subscribe",
    value: function _subscribe(sub, isResubscribe) {
      var _this14 = this;

      this._debug('subscribing on', sub.channel);

      var channel = sub.channel;

      if (!(channel in this._subs)) {
        this._subs[channel] = sub;
      }

      if (!this.isConnected()) {
        // subscribe will be called later
        sub._setNew();

        return;
      }

      sub._setSubscribing(isResubscribe);

      var msg = {
        method: this._methodType.SUBSCRIBE,
        params: {
          channel: channel
        }
      };

      if (sub._subscribeData) {
        msg.params.data = sub._subscribeData;
      } // If channel name does not start with privateChannelPrefix - then we
      // can just send subscription message to Centrifuge. If channel name
      // starts with privateChannelPrefix - then this is a private channel
      // and we should ask web application backend for permission first.


      if ((0, _utils.startsWith)(channel, this._config.privateChannelPrefix)) {
        // private channel.
        if (this._isSubscribeBatching) {
          this._privateChannels[channel] = true;
        } else {
          this.startSubscribeBatching();

          this._subscribe(sub);

          this.stopSubscribeBatching();
        }
      } else {
        var recover = sub._needRecover();

        if (recover === true) {
          msg.params.recover = true;

          var seq = this._getLastSeq(channel);

          var gen = this._getLastGen(channel);

          if (seq || gen) {
            if (seq) {
              msg.params.seq = seq;
            }

            if (gen) {
              msg.params.gen = gen;
            }
          } else {
            var offset = this._getLastOffset(channel);

            if (offset) {
              msg.params.offset = offset;
            }
          }

          var epoch = this._getLastEpoch(channel);

          if (epoch) {
            msg.params.epoch = epoch;
          }
        }

        this._call(msg).then(function (resolveCtx) {
          _this14._subscribeResponse(channel, recover, _this14._decoder.decodeCommandResult(_this14._methodType.SUBSCRIBE, resolveCtx.result));

          if (resolveCtx.next) {
            resolveCtx.next();
          }
        }, function (rejectCtx) {
          _this14._subscribeError(channel, rejectCtx.error);

          if (rejectCtx.next) {
            rejectCtx.next();
          }
        });
      }
    }
  }, {
    key: "_unsubscribe",
    value: function _unsubscribe(sub) {
      delete this._subs[sub.channel];
      delete this._lastOffset[sub.channel];
      delete this._lastSeq[sub.channel];
      delete this._lastGen[sub.channel];

      if (this.isConnected()) {
        // No need to unsubscribe in disconnected state - i.e. client already unsubscribed.
        this._addMessage({
          method: this._methodType.UNSUBSCRIBE,
          params: {
            channel: sub.channel
          }
        });
      }
    }
  }, {
    key: "_getTTLMilliseconds",
    value: function _getTTLMilliseconds(ttl) {
      // https://stackoverflow.com/questions/12633405/what-is-the-maximum-delay-for-setinterval
      return Math.min(ttl * 1000, 2147483647);
    }
  }, {
    key: "getSub",
    value: function getSub(channel) {
      return this._getSub(channel);
    }
  }, {
    key: "_getSub",
    value: function _getSub(channel) {
      var sub = this._subs[channel];

      if (!sub) {
        return null;
      }

      return sub;
    }
  }, {
    key: "_isServerSub",
    value: function _isServerSub(channel) {
      return this._serverSubs[channel] !== undefined;
    }
  }, {
    key: "_connectResponse",
    value: function _connectResponse(result, isRecover) {
      var _this15 = this;

      var wasReconnecting = this._reconnecting;
      this._reconnecting = false;

      this._resetRetry();

      this._refreshRequired = false;

      if (this.isConnected()) {
        return;
      }

      if (this._latencyStart !== null) {
        this._latency = new Date().getTime() - this._latencyStart.getTime();
        this._latencyStart = null;
      }

      this._clientID = result.client;

      this._setStatus('connected');

      if (this._refreshTimeout) {
        clearTimeout(this._refreshTimeout);
      }

      if (result.expires) {
        this._refreshTimeout = setTimeout(function () {
          return _this15._refresh();
        }, this._getTTLMilliseconds(result.ttl));
      }

      this.startBatching();
      this.startSubscribeBatching();

      for (var channel in this._subs) {
        if (this._subs.hasOwnProperty(channel)) {
          var sub = this._subs[channel];

          if (sub._shouldResubscribe()) {
            this._subscribe(sub, wasReconnecting);
          }
        }
      }

      this.stopSubscribeBatching();
      this.stopBatching();

      this._startPing();

      var ctx = {
        client: result.client,
        transport: this._transportName,
        latency: this._latency
      };

      if (result.data) {
        ctx.data = result.data;
      }

      this.emit('connect', ctx);

      if (result.subs) {
        this._processServerSubs(result.subs);
      }
    }
  }, {
    key: "_processServerSubs",
    value: function _processServerSubs(subs) {
      for (var channel in subs) {
        if (subs.hasOwnProperty(channel)) {
          var sub = subs[channel];
          var isResubscribe = this._serverSubs[channel] !== undefined;
          var subCtx = {
            channel: channel,
            isResubscribe: isResubscribe
          };
          subCtx = this._expandSubscribeContext(subCtx, sub);
          this.emit('subscribe', subCtx);
        }
      }

      for (var _channel2 in subs) {
        if (subs.hasOwnProperty(_channel2)) {
          var _sub = subs[_channel2];

          if (_sub.recovered) {
            var pubs = _sub.publications;

            if (pubs && pubs.length > 0) {
              // handle legacy order.
              // TODO: remove as soon as Centrifuge v1 released.
              if (pubs.length > 1 && (!pubs[0].offset || pubs[0].offset > pubs[1].offset)) {
                pubs = pubs.reverse();
              }

              for (var i in pubs) {
                if (pubs.hasOwnProperty(i)) {
                  this._handlePublication(_channel2, pubs[i]);
                }
              }
            }
          }

          this._serverSubs[_channel2] = {
            'seq': _sub.seq,
            'gen': _sub.gen,
            'offset': _sub.offset,
            'epoch': _sub.epoch,
            'recoverable': _sub.recoverable
          };
        }
      }
    }
  }, {
    key: "_stopPing",
    value: function _stopPing() {
      if (this._pongTimeout !== null) {
        clearTimeout(this._pongTimeout);
        this._pongTimeout = null;
      }

      if (this._pingTimeout !== null) {
        clearTimeout(this._pingTimeout);
        this._pingTimeout = null;
      }
    }
  }, {
    key: "_startPing",
    value: function _startPing() {
      var _this16 = this;

      if (this._config.ping !== true || this._config.pingInterval <= 0) {
        return;
      }

      if (!this.isConnected()) {
        return;
      }

      this._pingTimeout = setTimeout(function () {
        if (!_this16.isConnected()) {
          _this16._stopPing();

          return;
        }

        _this16.ping();

        _this16._pongTimeout = setTimeout(function () {
          _this16._disconnect('no ping', true);
        }, _this16._config.pongWaitTimeout);
      }, this._config.pingInterval);
    }
  }, {
    key: "_restartPing",
    value: function _restartPing() {
      this._stopPing();

      this._startPing();
    }
  }, {
    key: "_subscribeError",
    value: function _subscribeError(channel, error) {
      var sub = this._getSub(channel);

      if (!sub) {
        return;
      }

      if (!sub._isSubscribing()) {
        return;
      }

      if (error.code === 0 && error.message === _errorTimeout) {
        // client side timeout.
        this._disconnect('timeout', true);

        return;
      }

      sub._setSubscribeError(error);
    }
  }, {
    key: "_expandSubscribeContext",
    value: function _expandSubscribeContext(ctx, result) {
      var recovered = false;

      if ('recovered' in result) {
        recovered = result.recovered;
      }

      ctx.recovered = recovered;
      var positioned = false;

      if ('positioned' in result) {
        positioned = result.positioned;
      }

      var epoch = '';

      if ('epoch' in result) {
        epoch = result.epoch;
      }

      var offset = 0;

      if ('offset' in result) {
        offset = result.offset;
      }

      if (positioned) {
        ctx.streamPosition = {
          'offset': offset,
          'epoch': epoch
        };
      }

      ;

      if (result.data) {
        ctx.data = result.data;
      }

      return ctx;
    }
  }, {
    key: "_subscribeResponse",
    value: function _subscribeResponse(channel, isRecover, result) {
      var _this17 = this;

      var sub = this._getSub(channel);

      if (!sub) {
        return;
      }

      if (!sub._isSubscribing()) {
        return;
      }

      sub._setSubscribeSuccess(result);

      var pubs = result.publications;

      if (pubs && pubs.length > 0) {
        if (pubs.length >= 2 && !pubs[0].offset && !pubs[1].offset) {
          // handle legacy order.
          pubs = pubs.reverse();
        }

        for (var i in pubs) {
          if (pubs.hasOwnProperty(i)) {
            this._handlePublication(channel, pubs[i]);
          }
        }
      }

      if (result.recoverable && (!isRecover || !result.recovered)) {
        this._lastSeq[channel] = result.seq || 0;
        this._lastGen[channel] = result.gen || 0;
        this._lastOffset[channel] = result.offset || 0;
      }

      this._lastEpoch[channel] = result.epoch || '';

      if (result.recoverable) {
        sub._recoverable = true;
      }

      if (result.expires === true) {
        var subRefreshTimeout = setTimeout(function () {
          return _this17._subRefresh(channel);
        }, this._getTTLMilliseconds(result.ttl));
        this._subRefreshTimeouts[channel] = subRefreshTimeout;
      }
    }
  }, {
    key: "_handleReply",
    value: function _handleReply(reply, next) {
      var id = reply.id;
      var result = reply.result;

      if (!(id in this._callbacks)) {
        next();
        return;
      }

      var callbacks = this._callbacks[id];
      clearTimeout(this._callbacks[id].timeout);
      delete this._callbacks[id];

      if (!(0, _utils.errorExists)(reply)) {
        var callback = callbacks.callback;

        if (!callback) {
          return;
        }

        callback({
          result: result,
          next: next
        });
      } else {
        var errback = callbacks.errback;

        if (!errback) {
          next();
          return;
        }

        var error = reply.error;
        errback({
          error: error,
          next: next
        });
      }
    }
  }, {
    key: "_handleJoin",
    value: function _handleJoin(channel, join) {
      var ctx = {
        'info': join.info
      };

      var sub = this._getSub(channel);

      if (!sub) {
        if (this._isServerSub(channel)) {
          ctx.channel = channel;
          this.emit('join', ctx);
        }

        return;
      }

      sub.emit('join', ctx);
    }
  }, {
    key: "_handleLeave",
    value: function _handleLeave(channel, leave) {
      var ctx = {
        'info': leave.info
      };

      var sub = this._getSub(channel);

      if (!sub) {
        if (this._isServerSub(channel)) {
          ctx.channel = channel;
          this.emit('leave', ctx);
        }

        return;
      }

      sub.emit('leave', ctx);
    }
  }, {
    key: "_handleUnsub",
    value: function _handleUnsub(channel, unsub) {
      var ctx = {};

      var sub = this._getSub(channel);

      if (!sub) {
        if (this._isServerSub(channel)) {
          delete this._serverSubs[channel];
          ctx.channel = channel;
          this.emit('unsubscribe', ctx);
        }

        return;
      }

      sub.unsubscribe();

      if (unsub.resubscribe === true) {
        sub.subscribe();
      }
    }
  }, {
    key: "_handleSub",
    value: function _handleSub(channel, sub) {
      this._serverSubs[channel] = {
        'seq': sub.seq,
        'gen': sub.gen,
        'offset': sub.offset,
        'epoch': sub.epoch,
        'recoverable': sub.recoverable
      };
      var ctx = {
        'channel': channel,
        isResubscribe: false
      };
      ctx = this._expandSubscribeContext(ctx, sub);
      this.emit('subscribe', ctx);
    }
  }, {
    key: "_handlePublication",
    value: function _handlePublication(channel, pub) {
      var sub = this._getSub(channel);

      var ctx = {
        'data': pub.data,
        'seq': pub.seq,
        'gen': pub.gen,
        'offset': pub.offset
      };

      if (pub.info) {
        ctx.info = pub.info;
      }

      if (!sub) {
        if (this._isServerSub(channel)) {
          if (pub.seq !== undefined) {
            this._serverSubs[channel].seq = pub.seq;
          }

          if (pub.gen !== undefined) {
            this._serverSubs[channel].gen = pub.gen;
          }

          if (pub.offset !== undefined) {
            this._serverSubs[channel].offset = pub.offset;
          }

          ctx.channel = channel;
          this.emit('publish', ctx);
        }

        return;
      }

      if (pub.seq !== undefined) {
        this._lastSeq[channel] = pub.seq;
      }

      if (pub.gen !== undefined) {
        this._lastGen[channel] = pub.gen;
      }

      if (pub.offset !== undefined) {
        this._lastOffset[channel] = pub.offset;
      }

      sub.emit('publish', ctx);
    }
  }, {
    key: "_handleMessage",
    value: function _handleMessage(message) {
      this.emit('message', message.data);
    }
  }, {
    key: "_handlePush",
    value: function _handlePush(data, next) {
      var push = this._decoder.decodePush(data);

      var type = 0;

      if ('type' in push) {
        type = push['type'];
      }

      var channel = push.channel;

      if (type === this._pushType.PUBLICATION) {
        var pub = this._decoder.decodePushData(this._pushType.PUBLICATION, push.data);

        this._handlePublication(channel, pub);
      } else if (type === this._pushType.MESSAGE) {
        var message = this._decoder.decodePushData(this._pushType.MESSAGE, push.data);

        this._handleMessage(message);
      } else if (type === this._pushType.JOIN) {
        var join = this._decoder.decodePushData(this._pushType.JOIN, push.data);

        this._handleJoin(channel, join);
      } else if (type === this._pushType.LEAVE) {
        var leave = this._decoder.decodePushData(this._pushType.LEAVE, push.data);

        this._handleLeave(channel, leave);
      } else if (type === this._pushType.UNSUBSCRIBE) {
        var unsub = this._decoder.decodePushData(this._pushType.UNSUBSCRIBE, push.data);

        this._handleUnsub(channel, unsub);
      } else if (type === this._pushType.SUBSCRIBE) {
        var sub = this._decoder.decodePushData(this._pushType.UNSUBSCRIBE, push.data);

        this._handleSub(channel, sub);
      }

      next();
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var messages = this._messages.slice(0);

      this._messages = [];

      this._transportSend(messages);
    }
  }, {
    key: "_ping",
    value: function _ping() {
      var _this18 = this;

      var msg = {
        method: this._methodType.PING
      };

      this._call(msg).then(function (resolveCtx) {
        _this18._pingResponse(_this18._decoder.decodeCommandResult(_this18._methodType.PING, resolveCtx.result));

        if (resolveCtx.next) {
          resolveCtx.next();
        }
      }, function (rejectCtx) {
        _this18._debug('ping error', rejectCtx.error);

        if (rejectCtx.next) {
          rejectCtx.next();
        }
      });
    }
  }, {
    key: "_pingResponse",
    value: function _pingResponse(result) {
      if (!this.isConnected()) {
        return;
      }

      this._stopPing();

      this._startPing();
    }
  }, {
    key: "_getLastSeq",
    value: function _getLastSeq(channel) {
      var lastSeq = this._lastSeq[channel];

      if (lastSeq) {
        return lastSeq;
      }

      return 0;
    }
  }, {
    key: "_getLastOffset",
    value: function _getLastOffset(channel) {
      var lastOffset = this._lastOffset[channel];

      if (lastOffset) {
        return lastOffset;
      }

      return 0;
    }
  }, {
    key: "_getLastGen",
    value: function _getLastGen(channel) {
      var lastGen = this._lastGen[channel];

      if (lastGen) {
        return lastGen;
      }

      return 0;
    }
  }, {
    key: "_getLastEpoch",
    value: function _getLastEpoch(channel) {
      var lastEpoch = this._lastEpoch[channel];

      if (lastEpoch) {
        return lastEpoch;
      }

      return '';
    }
  }, {
    key: "_createErrorObject",
    value: function _createErrorObject(message, code) {
      var errObject = {
        message: message,
        code: code || 0
      };
      return errObject;
    }
  }, {
    key: "_registerCall",
    value: function _registerCall(id, callback, errback) {
      var _this19 = this;

      this._callbacks[id] = {
        callback: callback,
        errback: errback,
        timeout: null
      };
      this._callbacks[id].timeout = setTimeout(function () {
        delete _this19._callbacks[id];

        if ((0, _utils.isFunction)(errback)) {
          errback({
            error: _this19._createErrorObject(_errorTimeout)
          });
        }
      }, this._config.timeout);
    }
  }, {
    key: "_addMessage",
    value: function _addMessage(message) {
      var id = this._nextMessageId();

      message.id = id;

      if (this._isBatching === true) {
        this._messages.push(message);
      } else {
        this._transportSend([message]);
      }

      return id;
    }
  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._isConnected();
    }
  }, {
    key: "connect",
    value: function connect() {
      this._connect();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._disconnect('client', false);
    }
  }, {
    key: "ping",
    value: function ping() {
      return this._ping();
    }
  }, {
    key: "startBatching",
    value: function startBatching() {
      // start collecting messages without sending them to Centrifuge until flush
      // method called
      this._isBatching = true;
    }
  }, {
    key: "stopBatching",
    value: function stopBatching() {
      this._isBatching = false;

      this._flush();
    }
  }, {
    key: "startSubscribeBatching",
    value: function startSubscribeBatching() {
      // start collecting private channels to create bulk authentication
      // request to subscribeEndpoint when stopSubscribeBatching will be called
      this._isSubscribeBatching = true;
    }
  }, {
    key: "stopSubscribeBatching",
    value: function stopSubscribeBatching() {
      var _this20 = this;

      // create request to subscribeEndpoint with collected private channels
      // to ask if this client can subscribe on each channel
      this._isSubscribeBatching = false;
      var authChannels = this._privateChannels;
      this._privateChannels = {};
      var channels = [];

      for (var channel in authChannels) {
        if (authChannels.hasOwnProperty(channel)) {
          var sub = this._getSub(channel);

          if (!sub) {
            continue;
          }

          channels.push(channel);
        }
      }

      if (channels.length === 0) {
        this._debug('no private channels found, no need to make request');

        return;
      }

      var data = {
        client: this._clientID,
        channels: channels
      };
      var clientID = this._clientID;

      var xhrID = this._newXHRID();

      var cb = function cb(resp) {
        if (xhrID in _this20._xhrs) {
          delete _this20._xhrs[xhrID];
        }

        if (_this20._clientID !== clientID) {
          return;
        }

        if (resp.error || resp.status !== 200) {
          _this20._debug('authorization request failed');

          for (var i in channels) {
            if (channels.hasOwnProperty(i)) {
              var _channel3 = channels[i];

              _this20._subscribeError(_channel3, _this20._createErrorObject('authorization request failed'));
            }
          }

          return;
        }

        var channelsData = {};

        if (resp.data.channels) {
          for (var _i in resp.data.channels) {
            var channelData = resp.data.channels[_i];

            if (!channelData.channel) {
              continue;
            }

            channelsData[channelData.channel] = channelData.token;
          }
        } // try to send all subscriptions in one request.


        var batch = false;

        if (!_this20._isBatching) {
          _this20.startBatching();

          batch = true;
        }

        for (var _i2 in channels) {
          if (channels.hasOwnProperty(_i2)) {
            var _ret = function () {
              var channel = channels[_i2];
              var token = channelsData[channel];

              if (!token) {
                // subscription:error
                _this20._subscribeError(channel, _this20._createErrorObject('permission denied', 103));

                return "continue";
              } else {
                var msg = {
                  method: _this20._methodType.SUBSCRIBE,
                  params: {
                    channel: channel,
                    token: token
                  }
                };

                var _sub2 = _this20._getSub(channel);

                if (_sub2 === null) {
                  return "continue";
                }

                var recover = _sub2._needRecover();

                if (recover === true) {
                  msg.params.recover = true;

                  var seq = _this20._getLastSeq(channel);

                  var gen = _this20._getLastGen(channel);

                  if (seq || gen) {
                    if (seq) {
                      msg.params.seq = seq;
                    }

                    if (gen) {
                      msg.params.gen = gen;
                    }
                  } else {
                    var offset = _this20._getLastOffset(channel);

                    if (offset) {
                      msg.params.offset = offset;
                    }
                  }

                  var epoch = _this20._getLastEpoch(channel);

                  if (epoch) {
                    msg.params.epoch = epoch;
                  }
                }

                _this20._call(msg).then(function (resolveCtx) {
                  _this20._subscribeResponse(channel, recover, _this20._decoder.decodeCommandResult(_this20._methodType.SUBSCRIBE, resolveCtx.result));

                  if (resolveCtx.next) {
                    resolveCtx.next();
                  }
                }, function (rejectCtx) {
                  _this20._subscribeError(channel, rejectCtx.error);

                  if (rejectCtx.next) {
                    rejectCtx.next();
                  }
                });
              }
            }();

            if (_ret === "continue") continue;
          }
        }

        if (batch) {
          _this20.stopBatching();
        }
      };

      if (this._config.onPrivateSubscribe !== null) {
        this._config.onPrivateSubscribe({
          data: data
        }, cb);
      } else {
        var xhr = this._ajax(this._config.subscribeEndpoint, this._config.subscribeParams, this._config.subscribeHeaders, data, cb);

        this._xhrs[xhrID] = xhr;
      }
    }
  }, {
    key: "_setSubscribeSince",
    value: function _setSubscribeSince(sub, since) {
      this._lastOffset[sub.channel] = since.offset;
      this._lastEpoch[sub.channel] = since.epoch;

      sub._setNeedRecover(true);
    }
  }, {
    key: "subscribe",
    value: function subscribe(channel, events, opts) {
      var currentSub = this._getSub(channel);

      if (currentSub !== null) {
        currentSub._setEvents(events);

        if (currentSub._isUnsubscribed()) {
          currentSub.subscribe(opts);
        }

        return currentSub;
      }

      var sub = new _subscription["default"](this, channel, events);
      this._subs[channel] = sub;
      sub.subscribe(opts);
      return sub;
    }
  }]);

  return Centrifuge;
}(_events["default"]);

exports.Centrifuge = Centrifuge;

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _centrifuge = __webpack_require__(382);

var _default = _centrifuge.Centrifuge;
exports["default"] = _default;
module.exports = exports["default"];

/***/ }),

/***/ 147:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.JsonPushType = exports.JsonMethodType = exports.JsonEncoder = exports.JsonDecoder = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JsonMethodType = {
  CONNECT: 0,
  SUBSCRIBE: 1,
  UNSUBSCRIBE: 2,
  PUBLISH: 3,
  PRESENCE: 4,
  PRESENCE_STATS: 5,
  HISTORY: 6,
  PING: 7,
  SEND: 8,
  RPC: 9,
  REFRESH: 10,
  SUB_REFRESH: 11
};
exports.JsonMethodType = JsonMethodType;
var JsonPushType = {
  PUBLICATION: 0,
  JOIN: 1,
  LEAVE: 2,
  UNSUBSCRIBE: 3,
  MESSAGE: 4,
  SUBSCRIBE: 5
};
exports.JsonPushType = JsonPushType;

var JsonEncoder = /*#__PURE__*/function () {
  function JsonEncoder() {
    _classCallCheck(this, JsonEncoder);
  }

  _createClass(JsonEncoder, [{
    key: "encodeCommands",
    value: function encodeCommands(commands) {
      return commands.map(function (c) {
        return JSON.stringify(c);
      }).join('\n');
    }
  }]);

  return JsonEncoder;
}();

exports.JsonEncoder = JsonEncoder;

var JsonDecoder = /*#__PURE__*/function () {
  function JsonDecoder() {
    _classCallCheck(this, JsonDecoder);
  }

  _createClass(JsonDecoder, [{
    key: "decodeReplies",
    value: function decodeReplies(data) {
      return data.split('\n').filter(function (r) {
        return r !== '';
      }).map(function (r) {
        return JSON.parse(r);
      });
    }
  }, {
    key: "decodeCommandResult",
    value: function decodeCommandResult(methodType, data) {
      return data;
    }
  }, {
    key: "decodePush",
    value: function decodePush(data) {
      return data;
    }
  }, {
    key: "decodePushData",
    value: function decodePushData(pushType, data) {
      return data;
    }
  }]);

  return JsonDecoder;
}();

exports.JsonDecoder = JsonDecoder;

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _events = _interopRequireDefault(__webpack_require__(187));

var _utils = __webpack_require__(853);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _STATE_NEW = 0;
var _STATE_SUBSCRIBING = 1;
var _STATE_SUCCESS = 2;
var _STATE_ERROR = 3;
var _STATE_UNSUBSCRIBED = 4;

var Subscription = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Subscription, _EventEmitter);

  var _super = _createSuper(Subscription);

  function Subscription(centrifuge, channel, events) {
    var _this;

    _classCallCheck(this, Subscription);

    _this = _super.call(this);
    _this.channel = channel;
    _this._centrifuge = centrifuge;
    _this._status = _STATE_NEW;
    _this._error = null;
    _this._isResubscribe = false;
    _this._ready = false;
    _this._subscriptionPromise = null;
    _this._noResubscribe = false;
    _this._recoverable = false;
    _this._recover = false;

    _this._setEvents(events);

    _this._initializePromise();

    _this._promises = {};
    _this._promiseId = 0;
    _this._subscribeData = null;

    _this.on('error', function (errContext) {
      this._centrifuge._debug('subscription error', errContext);
    });

    return _this;
  }

  _createClass(Subscription, [{
    key: "_nextPromiseId",
    value: function _nextPromiseId() {
      return ++this._promiseId;
    }
  }, {
    key: "_initializePromise",
    value: function _initializePromise() {
      var _this2 = this;

      // this helps us to wait until subscription will successfully
      // subscribe and call actions such as presence, history etc in
      // synchronous way.
      this._ready = false;
      this._subscriptionPromise = new Promise(function (resolve, reject) {
        _this2._resolve = function (value) {
          _this2._ready = true;
          resolve(value);
        };

        _this2._reject = function (err) {
          _this2._ready = true;
          reject(err);
        };
      }).then(function () {}, function () {});
    }
  }, {
    key: "_setNeedRecover",
    value: function _setNeedRecover(enabled) {
      this._recoverable = enabled;
      this._recover = enabled;
    }
  }, {
    key: "_needRecover",
    value: function _needRecover() {
      return this._recoverable === true && this._recover === true;
    }
  }, {
    key: "_setEvents",
    value: function _setEvents(events) {
      if (!events) {
        return;
      }

      if ((0, _utils.isFunction)(events)) {
        // events is just a function to handle publication received from channel.
        this.on('publish', events);
      } else if (Object.prototype.toString.call(events) === Object.prototype.toString.call({})) {
        var knownEvents = ['publish', 'join', 'leave', 'unsubscribe', 'subscribe', 'error'];

        for (var i = 0, l = knownEvents.length; i < l; i++) {
          var ev = knownEvents[i];

          if (ev in events) {
            this.on(ev, events[ev]);
          }
        }
      }
    }
  }, {
    key: "_isNew",
    value: function _isNew() {
      return this._status === _STATE_NEW;
    }
  }, {
    key: "_isUnsubscribed",
    value: function _isUnsubscribed() {
      return this._status === _STATE_UNSUBSCRIBED;
    }
  }, {
    key: "_isSubscribing",
    value: function _isSubscribing() {
      return this._status === _STATE_SUBSCRIBING;
    }
  }, {
    key: "_isReady",
    value: function _isReady() {
      return this._status === _STATE_SUCCESS || this._status === _STATE_ERROR;
    }
  }, {
    key: "_isSuccess",
    value: function _isSuccess() {
      return this._status === _STATE_SUCCESS;
    }
  }, {
    key: "_isError",
    value: function _isError() {
      return this._status === _STATE_ERROR;
    }
  }, {
    key: "_setNew",
    value: function _setNew() {
      this._status = _STATE_NEW;
    }
  }, {
    key: "_setSubscribing",
    value: function _setSubscribing(isResubscribe) {
      this._isResubscribe = isResubscribe || false;

      if (this._ready === true) {
        // new promise for this subscription
        this._initializePromise();
      }

      this._status = _STATE_SUBSCRIBING;
    }
  }, {
    key: "_setSubscribeSuccess",
    value: function _setSubscribeSuccess(subscribeResult) {
      if (this._status === _STATE_SUCCESS) {
        return;
      }

      this._status = _STATE_SUCCESS;

      var successContext = this._getSubscribeSuccessContext(subscribeResult);

      this._recover = false;
      this.emit('subscribe', successContext);

      this._resolve(successContext);

      for (var id in this._promises) {
        clearTimeout(this._promises[id].timeout);

        this._promises[id].resolve();

        delete this._promises[id];
      }
    }
  }, {
    key: "_setSubscribeError",
    value: function _setSubscribeError(err) {
      if (this._status === _STATE_ERROR) {
        return;
      }

      this._status = _STATE_ERROR;
      this._error = err;

      var errContext = this._getSubscribeErrorContext();

      this.emit('error', errContext);

      this._reject(errContext);

      for (var id in this._promises) {
        clearTimeout(this._promises[id].timeout);

        this._promises[id].reject(err);

        delete this._promises[id];
      }
    }
  }, {
    key: "_triggerUnsubscribe",
    value: function _triggerUnsubscribe() {
      this.emit('unsubscribe', {
        channel: this.channel
      });
    }
  }, {
    key: "_setUnsubscribed",
    value: function _setUnsubscribed(noResubscribe) {
      this._centrifuge._clearSubRefreshTimeout(this.channel);

      if (this._status === _STATE_UNSUBSCRIBED) {
        return;
      }

      var needTrigger = this._status === _STATE_SUCCESS;
      this._status = _STATE_UNSUBSCRIBED;

      if (noResubscribe === true) {
        this._recover = false;
        this._noResubscribe = true;
        delete this._centrifuge._lastSeq[this.channel];
        delete this._centrifuge._lastGen[this.channel];
        delete this._centrifuge._lastEpoch[this.channel];
      }

      if (needTrigger) {
        this._triggerUnsubscribe();
      }
    }
  }, {
    key: "_shouldResubscribe",
    value: function _shouldResubscribe() {
      return !this._noResubscribe;
    }
  }, {
    key: "_getSubscribeSuccessContext",
    value: function _getSubscribeSuccessContext(subscribeResult) {
      var ctx = {
        channel: this.channel,
        isResubscribe: this._isResubscribe
      };

      if (subscribeResult) {
        // subscribeResult not available when called from Subscription.ready method at the moment.
        ctx = this._centrifuge._expandSubscribeContext(ctx, subscribeResult);
      }

      return ctx;
    }
  }, {
    key: "_getSubscribeErrorContext",
    value: function _getSubscribeErrorContext() {
      var subscribeErrorContext = this._error;
      subscribeErrorContext.channel = this.channel;
      subscribeErrorContext.isResubscribe = this._isResubscribe;
      return subscribeErrorContext;
    }
  }, {
    key: "_setSubscribeData",
    value: function _setSubscribeData(data) {
      this._subscribeData = data;
    }
  }, {
    key: "ready",
    value: function ready(callback, errback) {
      if (this._ready) {
        if (this._isSuccess()) {
          callback(this._getSubscribeSuccessContext());
        } else {
          errback(this._getSubscribeErrorContext());
        }
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(opts) {
      if (this._status === _STATE_SUCCESS) {
        return;
      }

      if (opts && opts.since) {
        this._centrifuge._setSubscribeSince(this, opts.since);
      }

      if (opts && opts.data) {
        this._setSubscribeData(opts.data);
      }

      this._noResubscribe = false;

      this._centrifuge._subscribe(this);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this._setUnsubscribed(true);

      this._centrifuge._unsubscribe(this);
    }
  }, {
    key: "_methodCall",
    value: function _methodCall() {
      var _this3 = this;

      if (this._isSuccess()) {
        return Promise.resolve();
      } else if (this._isError()) {
        return Promise.reject(this._error);
      }

      var subPromise = new Promise(function (res, rej) {
        var timeout = setTimeout(function () {
          rej({
            'code': 0,
            'message': 'timeout'
          });
        }, _this3._centrifuge._config.timeout);
        _this3._promises[_this3._nextPromiseId()] = {
          timeout: timeout,
          resolve: res,
          reject: rej
        };
      });
      return subPromise;
    }
  }, {
    key: "publish",
    value: function publish(data) {
      var self = this;
      return this._methodCall().then(function () {
        return self._centrifuge.publish(self.channel, data);
      });
    }
  }, {
    key: "presence",
    value: function presence() {
      var self = this;
      return this._methodCall().then(function () {
        return self._centrifuge.presence(self.channel);
      });
    }
  }, {
    key: "presenceStats",
    value: function presenceStats() {
      var self = this;
      return this._methodCall().then(function () {
        return self._centrifuge.presenceStats(self.channel);
      });
    }
  }, {
    key: "history",
    value: function history(options) {
      var self = this;
      return this._methodCall().then(function () {
        return self._centrifuge.history(self.channel, options);
      });
    }
  }]);

  return Subscription;
}(_events["default"]);

exports["default"] = Subscription;
module.exports = exports["default"];

/***/ }),

/***/ 853:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.backoff = backoff;
exports.errorExists = errorExists;
exports.extend = extend;
exports.isFunction = isFunction;
exports.log = log;
exports.startsWith = startsWith;

function startsWith(value, prefix) {
  return value.lastIndexOf(prefix, 0) === 0;
}

;

function isFunction(value) {
  if (value === undefined || value === null) {
    return false;
  }

  return typeof value === 'function';
}

;

function log(level, args) {
  if (__webpack_require__.g.console) {
    var logger = __webpack_require__.g.console[level];

    if (isFunction(logger)) {
      logger.apply(__webpack_require__.g.console, args);
    }
  }
}

;

function backoff(step, min, max) {
  var jitter = 0.5 * Math.random();
  var interval = Math.min(max, min * Math.pow(2, step + 1));
  return Math.floor((1 - jitter) * interval);
}

;

function errorExists(data) {
  return 'error' in data && data.error !== null;
}

;

function extend(a, b) {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }

  return a;
}

;

/***/ }),

/***/ 187:
/***/ (function(module) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(579);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=centrifuge.js.map