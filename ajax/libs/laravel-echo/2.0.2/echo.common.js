'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function () {
    return !!t;
  })();
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
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == typeof e || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
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
  return "symbol" == typeof i ? i : i + "";
}
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/**
 * This class represents a basic channel.
 */
var Channel = /*#__PURE__*/function () {
  function Channel() {
    _classCallCheck(this, Channel);
  }
  return _createClass(Channel, [{
    key: "listenForWhisper",
    value:
    /**
     * Listen for a whisper event on the channel instance.
     */
    function listenForWhisper(event, callback) {
      return this.listen('.client-' + event, callback);
    }
    /**
     * Listen for an event on the channel instance.
     */
  }, {
    key: "notification",
    value: function notification(callback) {
      return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
    }
    /**
     * Stop listening for a whisper event on the channel instance.
     */
  }, {
    key: "stopListeningForWhisper",
    value: function stopListeningForWhisper(event, callback) {
      return this.stopListening('.client-' + event, callback);
    }
  }]);
}();

/**
 * Event name formatter
 */
var EventFormatter = /*#__PURE__*/function () {
  /**
   * Create a new class instance.
   */
  function EventFormatter(namespace) {
    _classCallCheck(this, EventFormatter);
    this.namespace = namespace;
    //
  }
  /**
   * Format the given event name.
   */
  return _createClass(EventFormatter, [{
    key: "format",
    value: function format(event) {
      if (['.', '\\'].includes(event.charAt(0))) {
        return event.substring(1);
      } else if (this.namespace) {
        event = this.namespace + '.' + event;
      }
      return event.replace(/\./g, '\\');
    }
    /**
     * Set the event namespace.
     */
  }, {
    key: "setNamespace",
    value: function setNamespace(value) {
      this.namespace = value;
    }
  }]);
}();

function isConstructor(obj) {
  try {
    new obj();
  } catch (err) {
    if (err instanceof Error && err.message.includes('is not a constructor')) {
      return false;
    }
  }
  return true;
}

/**
 * This class represents a Pusher channel.
 */
var PusherChannel = /*#__PURE__*/function (_Channel) {
  /**
   * Create a new class instance.
   */
  function PusherChannel(pusher, name, options) {
    var _this;
    _classCallCheck(this, PusherChannel);
    _this = _callSuper(this, PusherChannel);
    _this.name = name;
    _this.pusher = pusher;
    _this.options = options;
    _this.eventFormatter = new EventFormatter(_this.options.namespace);
    _this.subscribe();
    return _this;
  }
  /**
   * Subscribe to a Pusher channel.
   */
  _inherits(PusherChannel, _Channel);
  return _createClass(PusherChannel, [{
    key: "subscribe",
    value: function subscribe() {
      this.subscription = this.pusher.subscribe(this.name);
    }
    /**
     * Unsubscribe from a Pusher channel.
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this.pusher.unsubscribe(this.name);
    }
    /**
     * Listen for an event on the channel instance.
     */
  }, {
    key: "listen",
    value: function listen(event, callback) {
      this.on(this.eventFormatter.format(event), callback);
      return this;
    }
    /**
     * Listen for all events on the channel instance.
     */
  }, {
    key: "listenToAll",
    value: function listenToAll(callback) {
      var _this2 = this;
      this.subscription.bind_global(function (event, data) {
        var _this2$options$namesp;
        if (event.startsWith('pusher:')) {
          return;
        }
        var namespace = String((_this2$options$namesp = _this2.options.namespace) !== null && _this2$options$namesp !== void 0 ? _this2$options$namesp : '').replace(/\./g, '\\');
        var formattedEvent = event.startsWith(namespace) ? event.substring(namespace.length + 1) : '.' + event;
        callback(formattedEvent, data);
      });
      return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
  }, {
    key: "stopListening",
    value: function stopListening(event, callback) {
      if (callback) {
        this.subscription.unbind(this.eventFormatter.format(event), callback);
      } else {
        this.subscription.unbind(this.eventFormatter.format(event));
      }
      return this;
    }
    /**
     * Stop listening for all events on the channel instance.
     */
  }, {
    key: "stopListeningToAll",
    value: function stopListeningToAll(callback) {
      if (callback) {
        this.subscription.unbind_global(callback);
      } else {
        this.subscription.unbind_global();
      }
      return this;
    }
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
  }, {
    key: "subscribed",
    value: function subscribed(callback) {
      this.on('pusher:subscription_succeeded', function () {
        callback();
      });
      return this;
    }
    /**
     * Register a callback to be called anytime a subscription error occurs.
     */
  }, {
    key: "error",
    value: function error(callback) {
      this.on('pusher:subscription_error', function (status) {
        callback(status);
      });
      return this;
    }
    /**
     * Bind a channel to an event.
     */
  }, {
    key: "on",
    value: function on(event, callback) {
      this.subscription.bind(event, callback);
      return this;
    }
  }]);
}(Channel);

/**
 * This class represents a Pusher private channel.
 */
var PusherPrivateChannel = /*#__PURE__*/function (_PusherChannel) {
  function PusherPrivateChannel() {
    _classCallCheck(this, PusherPrivateChannel);
    return _callSuper(this, PusherPrivateChannel, arguments);
  }
  _inherits(PusherPrivateChannel, _PusherChannel);
  return _createClass(PusherPrivateChannel, [{
    key: "whisper",
    value:
    /**
     * Send a whisper event to other clients in the channel.
     */
    function whisper(eventName, data) {
      this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
      return this;
    }
  }]);
}(PusherChannel);

/**
 * This class represents a Pusher private channel.
 */
var PusherEncryptedPrivateChannel = /*#__PURE__*/function (_PusherChannel) {
  function PusherEncryptedPrivateChannel() {
    _classCallCheck(this, PusherEncryptedPrivateChannel);
    return _callSuper(this, PusherEncryptedPrivateChannel, arguments);
  }
  _inherits(PusherEncryptedPrivateChannel, _PusherChannel);
  return _createClass(PusherEncryptedPrivateChannel, [{
    key: "whisper",
    value:
    /**
     * Send a whisper event to other clients in the channel.
     */
    function whisper(eventName, data) {
      this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
      return this;
    }
  }]);
}(PusherChannel);

/**
 * This class represents a Pusher presence channel.
 */
var PusherPresenceChannel = /*#__PURE__*/function (_PusherPrivateChannel) {
  function PusherPresenceChannel() {
    _classCallCheck(this, PusherPresenceChannel);
    return _callSuper(this, PusherPresenceChannel, arguments);
  }
  _inherits(PusherPresenceChannel, _PusherPrivateChannel);
  return _createClass(PusherPresenceChannel, [{
    key: "here",
    value:
    /**
     * Register a callback to be called anytime the member list changes.
     */
    function here(callback) {
      this.on('pusher:subscription_succeeded', function (data) {
        callback(Object.keys(data.members).map(function (k) {
          return data.members[k];
        }));
      });
      return this;
    }
    /**
     * Listen for someone joining the channel.
     */
  }, {
    key: "joining",
    value: function joining(callback) {
      this.on('pusher:member_added', function (member) {
        callback(member.info);
      });
      return this;
    }
    /**
     * Send a whisper event to other clients in the channel.
     */
  }, {
    key: "whisper",
    value: function whisper(eventName, data) {
      this.pusher.channels.channels[this.name].trigger("client-".concat(eventName), data);
      return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
  }, {
    key: "leaving",
    value: function leaving(callback) {
      this.on('pusher:member_removed', function (member) {
        callback(member.info);
      });
      return this;
    }
  }]);
}(PusherPrivateChannel);

/**
 * This class represents a Socket.io channel.
 */
var SocketIoChannel = /*#__PURE__*/function (_Channel) {
  /**
   * Create a new class instance.
   */
  function SocketIoChannel(socket, name, options) {
    var _this;
    _classCallCheck(this, SocketIoChannel);
    _this = _callSuper(this, SocketIoChannel);
    /**
     * The event callbacks applied to the socket.
     */
    _this.events = {};
    /**
     * User supplied callbacks for events on this channel.
     */
    _this.listeners = {};
    _this.name = name;
    _this.socket = socket;
    _this.options = options;
    _this.eventFormatter = new EventFormatter(_this.options.namespace);
    _this.subscribe();
    return _this;
  }
  /**
   * Subscribe to a Socket.io channel.
   */
  _inherits(SocketIoChannel, _Channel);
  return _createClass(SocketIoChannel, [{
    key: "subscribe",
    value: function subscribe() {
      this.socket.emit('subscribe', {
        channel: this.name,
        auth: this.options.auth || {}
      });
    }
    /**
     * Unsubscribe from channel and ubind event callbacks.
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this.unbind();
      this.socket.emit('unsubscribe', {
        channel: this.name,
        auth: this.options.auth || {}
      });
    }
    /**
     * Listen for an event on the channel instance.
     */
  }, {
    key: "listen",
    value: function listen(event, callback) {
      this.on(this.eventFormatter.format(event), callback);
      return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
  }, {
    key: "stopListening",
    value: function stopListening(event, callback) {
      this.unbindEvent(this.eventFormatter.format(event), callback);
      return this;
    }
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
  }, {
    key: "subscribed",
    value: function subscribed(callback) {
      this.on('connect', function (socket) {
        callback(socket);
      });
      return this;
    }
    /**
     * Register a callback to be called anytime an error occurs.
     */
  }, {
    key: "error",
    value: function error(_callback) {
      return this;
    }
    /**
     * Bind the channel's socket to an event and store the callback.
     */
  }, {
    key: "on",
    value: function on(event, callback) {
      var _this2 = this;
      this.listeners[event] = this.listeners[event] || [];
      if (!this.events[event]) {
        this.events[event] = function (channel, data) {
          if (_this2.name === channel && _this2.listeners[event]) {
            _this2.listeners[event].forEach(function (cb) {
              return cb(data);
            });
          }
        };
        this.socket.on(event, this.events[event]);
      }
      this.listeners[event].push(callback);
      return this;
    }
    /**
     * Unbind the channel's socket from all stored event callbacks.
     */
  }, {
    key: "unbind",
    value: function unbind() {
      var _this3 = this;
      Object.keys(this.events).forEach(function (event) {
        _this3.unbindEvent(event);
      });
    }
    /**
     * Unbind the listeners for the given event.
     */
  }, {
    key: "unbindEvent",
    value: function unbindEvent(event, callback) {
      this.listeners[event] = this.listeners[event] || [];
      if (callback) {
        this.listeners[event] = this.listeners[event].filter(function (cb) {
          return cb !== callback;
        });
      }
      if (!callback || this.listeners[event].length === 0) {
        if (this.events[event]) {
          this.socket.removeListener(event, this.events[event]);
          delete this.events[event];
        }
        delete this.listeners[event];
      }
    }
  }]);
}(Channel);

/**
 * This class represents a Socket.io private channel.
 */
var SocketIoPrivateChannel = /*#__PURE__*/function (_SocketIoChannel) {
  function SocketIoPrivateChannel() {
    _classCallCheck(this, SocketIoPrivateChannel);
    return _callSuper(this, SocketIoPrivateChannel, arguments);
  }
  _inherits(SocketIoPrivateChannel, _SocketIoChannel);
  return _createClass(SocketIoPrivateChannel, [{
    key: "whisper",
    value:
    /**
     * Send a whisper event to other clients in the channel.
     */
    function whisper(eventName, data) {
      this.socket.emit('client event', {
        channel: this.name,
        event: "client-".concat(eventName),
        data: data
      });
      return this;
    }
  }]);
}(SocketIoChannel);

/**
 * This class represents a Socket.io presence channel.
 */
var SocketIoPresenceChannel = /*#__PURE__*/function (_SocketIoPrivateChann) {
  function SocketIoPresenceChannel() {
    _classCallCheck(this, SocketIoPresenceChannel);
    return _callSuper(this, SocketIoPresenceChannel, arguments);
  }
  _inherits(SocketIoPresenceChannel, _SocketIoPrivateChann);
  return _createClass(SocketIoPresenceChannel, [{
    key: "here",
    value:
    /**
     * Register a callback to be called anytime the member list changes.
     */
    function here(callback) {
      this.on('presence:subscribed', function (members) {
        callback(members.map(function (m) {
          return m.user_info;
        }));
      });
      return this;
    }
    /**
     * Listen for someone joining the channel.
     */
  }, {
    key: "joining",
    value: function joining(callback) {
      this.on('presence:joining', function (member) {
        return callback(member.user_info);
      });
      return this;
    }
    /**
     * Send a whisper event to other clients in the channel.
     */
  }, {
    key: "whisper",
    value: function whisper(eventName, data) {
      this.socket.emit('client event', {
        channel: this.name,
        event: "client-".concat(eventName),
        data: data
      });
      return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
  }, {
    key: "leaving",
    value: function leaving(callback) {
      this.on('presence:leaving', function (member) {
        return callback(member.user_info);
      });
      return this;
    }
  }]);
}(SocketIoPrivateChannel);

/**
 * This class represents a null channel.
 */
var NullChannel = /*#__PURE__*/function (_Channel) {
  function NullChannel() {
    _classCallCheck(this, NullChannel);
    return _callSuper(this, NullChannel, arguments);
  }
  _inherits(NullChannel, _Channel);
  return _createClass(NullChannel, [{
    key: "subscribe",
    value:
    /**
     * Subscribe to a channel.
     */
    function subscribe() {
      //
    }
    /**
     * Unsubscribe from a channel.
     */
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      //
    }
    /**
     * Listen for an event on the channel instance.
     */
  }, {
    key: "listen",
    value: function listen(_event, _callback) {
      return this;
    }
    /**
     * Listen for all events on the channel instance.
     */
  }, {
    key: "listenToAll",
    value: function listenToAll(_callback) {
      return this;
    }
    /**
     * Stop listening for an event on the channel instance.
     */
  }, {
    key: "stopListening",
    value: function stopListening(_event, _callback) {
      return this;
    }
    /**
     * Register a callback to be called anytime a subscription succeeds.
     */
  }, {
    key: "subscribed",
    value: function subscribed(_callback) {
      return this;
    }
    /**
     * Register a callback to be called anytime an error occurs.
     */
  }, {
    key: "error",
    value: function error(_callback) {
      return this;
    }
    /**
     * Bind a channel to an event.
     */
  }, {
    key: "on",
    value: function on(_event, _callback) {
      return this;
    }
  }]);
}(Channel);

/**
 * This class represents a null private channel.
 */
var NullPrivateChannel = /*#__PURE__*/function (_NullChannel) {
  function NullPrivateChannel() {
    _classCallCheck(this, NullPrivateChannel);
    return _callSuper(this, NullPrivateChannel, arguments);
  }
  _inherits(NullPrivateChannel, _NullChannel);
  return _createClass(NullPrivateChannel, [{
    key: "whisper",
    value:
    /**
     * Send a whisper event to other clients in the channel.
     */
    function whisper(_eventName, _data) {
      return this;
    }
  }]);
}(NullChannel);

/**
 * This class represents a null private channel.
 */
var NullEncryptedPrivateChannel = /*#__PURE__*/function (_NullChannel) {
  function NullEncryptedPrivateChannel() {
    _classCallCheck(this, NullEncryptedPrivateChannel);
    return _callSuper(this, NullEncryptedPrivateChannel, arguments);
  }
  _inherits(NullEncryptedPrivateChannel, _NullChannel);
  return _createClass(NullEncryptedPrivateChannel, [{
    key: "whisper",
    value:
    /**
     * Send a whisper event to other clients in the channel.
     */
    function whisper(_eventName, _data) {
      return this;
    }
  }]);
}(NullChannel);

/**
 * This class represents a null presence channel.
 */
var NullPresenceChannel = /*#__PURE__*/function (_NullPrivateChannel) {
  function NullPresenceChannel() {
    _classCallCheck(this, NullPresenceChannel);
    return _callSuper(this, NullPresenceChannel, arguments);
  }
  _inherits(NullPresenceChannel, _NullPrivateChannel);
  return _createClass(NullPresenceChannel, [{
    key: "here",
    value:
    /**
     * Register a callback to be called anytime the member list changes.
     */
    function here(_callback) {
      return this;
    }
    /**
     * Listen for someone joining the channel.
     */
  }, {
    key: "joining",
    value: function joining(_callback) {
      return this;
    }
    /**
     * Send a whisper event to other clients in the channel.
     */
  }, {
    key: "whisper",
    value: function whisper(_eventName, _data) {
      return this;
    }
    /**
     * Listen for someone leaving the channel.
     */
  }, {
    key: "leaving",
    value: function leaving(_callback) {
      return this;
    }
  }]);
}(NullPrivateChannel);

var Connector = /*#__PURE__*/function () {
  /**
   * Create a new class instance.
   */
  function Connector(options) {
    _classCallCheck(this, Connector);
    this.setOptions(options);
    this.connect();
  }
  /**
   * Merge the custom options with the defaults.
   */
  return _createClass(Connector, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = _objectSpread2(_objectSpread2(_objectSpread2({}, Connector._defaultOptions), options), {}, {
        broadcaster: options.broadcaster
      });
      var token = this.csrfToken();
      if (token) {
        this.options.auth.headers['X-CSRF-TOKEN'] = token;
        this.options.userAuthentication.headers['X-CSRF-TOKEN'] = token;
      }
      token = this.options.bearerToken;
      if (token) {
        this.options.auth.headers['Authorization'] = 'Bearer ' + token;
        this.options.userAuthentication.headers['Authorization'] = 'Bearer ' + token;
      }
    }
    /**
     * Extract the CSRF token from the page.
     */
  }, {
    key: "csrfToken",
    value: function csrfToken() {
      var selector;
      if (typeof window !== 'undefined' && typeof window.Laravel !== 'undefined' && window.Laravel.csrfToken) {
        return window.Laravel.csrfToken;
      }
      if (this.options.csrfToken) {
        return this.options.csrfToken;
      }
      if (typeof document !== 'undefined' && typeof document.querySelector === 'function' && (selector = document.querySelector('meta[name="csrf-token"]'))) {
        return selector.getAttribute('content');
      }
      return null;
    }
  }]);
}();
/**
 * Default connector options.
 */
Connector._defaultOptions = {
  auth: {
    headers: {}
  },
  authEndpoint: '/broadcasting/auth',
  userAuthentication: {
    endpoint: '/broadcasting/user-auth',
    headers: {}
  },
  csrfToken: null,
  bearerToken: null,
  host: null,
  key: null,
  namespace: 'App.Events'
};

/**
 * This class creates a connector to Pusher.
 */
var PusherConnector = /*#__PURE__*/function (_Connector) {
  function PusherConnector() {
    var _this;
    _classCallCheck(this, PusherConnector);
    _this = _callSuper(this, PusherConnector, arguments);
    /**
     * All of the subscribed channel names.
     */
    _this.channels = {};
    return _this;
  }
  /**
   * Create a fresh Pusher connection.
   */
  _inherits(PusherConnector, _Connector);
  return _createClass(PusherConnector, [{
    key: "connect",
    value: function connect() {
      if (typeof this.options.client !== 'undefined') {
        this.pusher = this.options.client;
      } else if (this.options.Pusher) {
        this.pusher = new this.options.Pusher(this.options.key, this.options);
      } else if (typeof window !== 'undefined' && typeof window.Pusher !== 'undefined') {
        this.pusher = new window.Pusher(this.options.key, this.options);
      } else {
        throw new Error('Pusher client not found. Should be globally available or passed via options.client');
      }
    }
    /**
     * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
     */
  }, {
    key: "signin",
    value: function signin() {
      this.pusher.signin();
    }
    /**
     * Listen for an event on a channel instance.
     */
  }, {
    key: "listen",
    value: function listen(name, event, callback) {
      return this.channel(name).listen(event, callback);
    }
    /**
     * Get a channel instance by name.
     */
  }, {
    key: "channel",
    value: function channel(name) {
      if (!this.channels[name]) {
        this.channels[name] = new PusherChannel(this.pusher, name, this.options);
      }
      return this.channels[name];
    }
    /**
     * Get a private channel instance by name.
     */
  }, {
    key: "privateChannel",
    value: function privateChannel(name) {
      if (!this.channels['private-' + name]) {
        this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);
      }
      return this.channels['private-' + name];
    }
    /**
     * Get a private encrypted channel instance by name.
     */
  }, {
    key: "encryptedPrivateChannel",
    value: function encryptedPrivateChannel(name) {
      if (!this.channels['private-encrypted-' + name]) {
        this.channels['private-encrypted-' + name] = new PusherEncryptedPrivateChannel(this.pusher, 'private-encrypted-' + name, this.options);
      }
      return this.channels['private-encrypted-' + name];
    }
    /**
     * Get a presence channel instance by name.
     */
  }, {
    key: "presenceChannel",
    value: function presenceChannel(name) {
      if (!this.channels['presence-' + name]) {
        this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);
      }
      return this.channels['presence-' + name];
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
  }, {
    key: "leave",
    value: function leave(name) {
      var _this2 = this;
      var channels = [name, 'private-' + name, 'private-encrypted-' + name, 'presence-' + name];
      channels.forEach(function (name) {
        _this2.leaveChannel(name);
      });
    }
    /**
     * Leave the given channel.
     */
  }, {
    key: "leaveChannel",
    value: function leaveChannel(name) {
      if (this.channels[name]) {
        this.channels[name].unsubscribe();
        delete this.channels[name];
      }
    }
    /**
     * Get the socket ID for the connection.
     */
  }, {
    key: "socketId",
    value: function socketId() {
      return this.pusher.connection.socket_id;
    }
    /**
     * Disconnect Pusher connection.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.pusher.disconnect();
    }
  }]);
}(Connector);

/**
 * This class creates a connector to a Socket.io server.
 */
var SocketIoConnector = /*#__PURE__*/function (_Connector) {
  function SocketIoConnector() {
    var _this;
    _classCallCheck(this, SocketIoConnector);
    _this = _callSuper(this, SocketIoConnector, arguments);
    /**
     * All of the subscribed channel names.
     */
    _this.channels = {};
    return _this;
  }
  /**
   * Create a fresh Socket.io connection.
   */
  _inherits(SocketIoConnector, _Connector);
  return _createClass(SocketIoConnector, [{
    key: "connect",
    value: function connect() {
      var _this$options$host,
        _this2 = this;
      var io = this.getSocketIO();
      this.socket = io((_this$options$host = this.options.host) !== null && _this$options$host !== void 0 ? _this$options$host : undefined, this.options);
      this.socket.on('reconnect', function () {
        Object.values(_this2.channels).forEach(function (channel) {
          channel.subscribe();
        });
      });
    }
    /**
     * Get socket.io module from global scope or options.
     */
  }, {
    key: "getSocketIO",
    value: function getSocketIO() {
      if (typeof this.options.client !== 'undefined') {
        return this.options.client;
      }
      if (typeof window !== 'undefined' && typeof window.io !== 'undefined') {
        return window.io;
      }
      throw new Error('Socket.io client not found. Should be globally available or passed via options.client');
    }
    /**
     * Listen for an event on a channel instance.
     */
  }, {
    key: "listen",
    value: function listen(name, event, callback) {
      return this.channel(name).listen(event, callback);
    }
    /**
     * Get a channel instance by name.
     */
  }, {
    key: "channel",
    value: function channel(name) {
      if (!this.channels[name]) {
        this.channels[name] = new SocketIoChannel(this.socket, name, this.options);
      }
      return this.channels[name];
    }
    /**
     * Get a private channel instance by name.
     */
  }, {
    key: "privateChannel",
    value: function privateChannel(name) {
      if (!this.channels['private-' + name]) {
        this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);
      }
      return this.channels['private-' + name];
    }
    /**
     * Get a presence channel instance by name.
     */
  }, {
    key: "presenceChannel",
    value: function presenceChannel(name) {
      if (!this.channels['presence-' + name]) {
        this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);
      }
      return this.channels['presence-' + name];
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
  }, {
    key: "leave",
    value: function leave(name) {
      var _this3 = this;
      var channels = [name, 'private-' + name, 'presence-' + name];
      channels.forEach(function (name) {
        _this3.leaveChannel(name);
      });
    }
    /**
     * Leave the given channel.
     */
  }, {
    key: "leaveChannel",
    value: function leaveChannel(name) {
      if (this.channels[name]) {
        this.channels[name].unsubscribe();
        delete this.channels[name];
      }
    }
    /**
     * Get the socket ID for the connection.
     */
  }, {
    key: "socketId",
    value: function socketId() {
      return this.socket.id;
    }
    /**
     * Disconnect Socketio connection.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.socket.disconnect();
    }
  }]);
}(Connector);

/**
 * This class creates a null connector.
 */
var NullConnector = /*#__PURE__*/function (_Connector) {
  function NullConnector() {
    var _this;
    _classCallCheck(this, NullConnector);
    _this = _callSuper(this, NullConnector, arguments);
    /**
     * All of the subscribed channel names.
     */
    _this.channels = {};
    return _this;
  }
  /**
   * Create a fresh connection.
   */
  _inherits(NullConnector, _Connector);
  return _createClass(NullConnector, [{
    key: "connect",
    value: function connect() {
      //
    }
    /**
     * Listen for an event on a channel instance.
     */
  }, {
    key: "listen",
    value: function listen(_name, _event, _callback) {
      return new NullChannel();
    }
    /**
     * Get a channel instance by name.
     */
  }, {
    key: "channel",
    value: function channel(_name) {
      return new NullChannel();
    }
    /**
     * Get a private channel instance by name.
     */
  }, {
    key: "privateChannel",
    value: function privateChannel(_name) {
      return new NullPrivateChannel();
    }
    /**
     * Get a private encrypted channel instance by name.
     */
  }, {
    key: "encryptedPrivateChannel",
    value: function encryptedPrivateChannel(_name) {
      return new NullEncryptedPrivateChannel();
    }
    /**
     * Get a presence channel instance by name.
     */
  }, {
    key: "presenceChannel",
    value: function presenceChannel(_name) {
      return new NullPresenceChannel();
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
  }, {
    key: "leave",
    value: function leave(_name) {
      //
    }
    /**
     * Leave the given channel.
     */
  }, {
    key: "leaveChannel",
    value: function leaveChannel(_name) {
      //
    }
    /**
     * Get the socket ID for the connection.
     */
  }, {
    key: "socketId",
    value: function socketId() {
      return 'fake-socket-id';
    }
    /**
     * Disconnect the connection.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      //
    }
  }]);
}(Connector);

/**
 * This class is the primary API for interacting with broadcasting.
 */
var Echo = /*#__PURE__*/function () {
  /**
   * Create a new class instance.
   */
  function Echo(options) {
    _classCallCheck(this, Echo);
    this.options = options;
    this.connect();
    if (!this.options.withoutInterceptors) {
      this.registerInterceptors();
    }
  }
  /**
   * Get a channel instance by name.
   */
  return _createClass(Echo, [{
    key: "channel",
    value: function channel(_channel) {
      return this.connector.channel(_channel);
    }
    /**
     * Create a new connection.
     */
  }, {
    key: "connect",
    value: function connect() {
      if (this.options.broadcaster === 'reverb') {
        this.connector = new PusherConnector(_objectSpread2(_objectSpread2({}, this.options), {}, {
          cluster: ''
        }));
      } else if (this.options.broadcaster === 'pusher') {
        this.connector = new PusherConnector(this.options);
      } else if (this.options.broadcaster === 'socket.io') {
        this.connector = new SocketIoConnector(this.options);
      } else if (this.options.broadcaster === 'null') {
        this.connector = new NullConnector(this.options);
      } else if (typeof this.options.broadcaster === 'function' && isConstructor(this.options.broadcaster)) {
        this.connector = new this.options.broadcaster(this.options);
      } else {
        throw new Error("Broadcaster ".concat(_typeof(this.options.broadcaster), " ").concat(String(this.options.broadcaster), " is not supported."));
      }
    }
    /**
     * Disconnect from the Echo server.
     */
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.connector.disconnect();
    }
    /**
     * Get a presence channel instance by name.
     */
  }, {
    key: "join",
    value: function join(channel) {
      return this.connector.presenceChannel(channel);
    }
    /**
     * Leave the given channel, as well as its private and presence variants.
     */
  }, {
    key: "leave",
    value: function leave(channel) {
      this.connector.leave(channel);
    }
    /**
     * Leave the given channel.
     */
  }, {
    key: "leaveChannel",
    value: function leaveChannel(channel) {
      this.connector.leaveChannel(channel);
    }
    /**
     * Leave all channels.
     */
  }, {
    key: "leaveAllChannels",
    value: function leaveAllChannels() {
      for (var channel in this.connector.channels) {
        this.leaveChannel(channel);
      }
    }
    /**
     * Listen for an event on a channel instance.
     */
  }, {
    key: "listen",
    value: function listen(channel, event, callback) {
      return this.connector.listen(channel, event, callback);
    }
    /**
     * Get a private channel instance by name.
     */
  }, {
    key: "private",
    value: function _private(channel) {
      return this.connector.privateChannel(channel);
    }
    /**
     * Get a private encrypted channel instance by name.
     */
  }, {
    key: "encryptedPrivate",
    value: function encryptedPrivate(channel) {
      if (this.connectorSupportsEncryptedPrivateChannels(this.connector)) {
        return this.connector.encryptedPrivateChannel(channel);
      }
      throw new Error("Broadcaster ".concat(_typeof(this.options.broadcaster), " ").concat(String(this.options.broadcaster), " does not support encrypted private channels."));
    }
  }, {
    key: "connectorSupportsEncryptedPrivateChannels",
    value: function connectorSupportsEncryptedPrivateChannels(connector) {
      return connector instanceof PusherConnector || connector instanceof NullConnector;
    }
    /**
     * Get the Socket ID for the connection.
     */
  }, {
    key: "socketId",
    value: function socketId() {
      return this.connector.socketId();
    }
    /**
     * Register 3rd party request interceptiors. These are used to automatically
     * send a connections socket id to a Laravel app with a X-Socket-Id header.
     */
  }, {
    key: "registerInterceptors",
    value: function registerInterceptors() {
      if (typeof Vue === 'function' && Vue.http) {
        this.registerVueRequestInterceptor();
      }
      if (typeof axios === 'function') {
        this.registerAxiosRequestInterceptor();
      }
      if (typeof jQuery === 'function') {
        this.registerjQueryAjaxSetup();
      }
      if ((typeof Turbo === "undefined" ? "undefined" : _typeof(Turbo)) === 'object') {
        this.registerTurboRequestInterceptor();
      }
    }
    /**
     * Register a Vue HTTP interceptor to add the X-Socket-ID header.
     */
  }, {
    key: "registerVueRequestInterceptor",
    value: function registerVueRequestInterceptor() {
      var _this = this;
      Vue.http.interceptors.push(function (request, next) {
        if (_this.socketId()) {
          request.headers.set('X-Socket-ID', _this.socketId());
        }
        next();
      });
    }
    /**
     * Register an Axios HTTP interceptor to add the X-Socket-ID header.
     */
  }, {
    key: "registerAxiosRequestInterceptor",
    value: function registerAxiosRequestInterceptor() {
      var _this2 = this;
      axios.interceptors.request.use(function (config) {
        if (_this2.socketId()) {
          config.headers['X-Socket-Id'] = _this2.socketId();
        }
        return config;
      });
    }
    /**
     * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
     */
  }, {
    key: "registerjQueryAjaxSetup",
    value: function registerjQueryAjaxSetup() {
      var _this3 = this;
      if (typeof jQuery.ajax != 'undefined') {
        jQuery.ajaxPrefilter(function (_options, _originalOptions, xhr) {
          if (_this3.socketId()) {
            xhr.setRequestHeader('X-Socket-Id', _this3.socketId());
          }
        });
      }
    }
    /**
     * Register the Turbo Request interceptor to add the X-Socket-ID header.
     */
  }, {
    key: "registerTurboRequestInterceptor",
    value: function registerTurboRequestInterceptor() {
      var _this4 = this;
      document.addEventListener('turbo:before-fetch-request', function (event) {
        event.detail.fetchOptions.headers['X-Socket-Id'] = _this4.socketId();
      });
    }
  }]);
}();

exports.Channel = Channel;
exports.Connector = Connector;
exports.EventFormatter = EventFormatter;
exports.default = Echo;
