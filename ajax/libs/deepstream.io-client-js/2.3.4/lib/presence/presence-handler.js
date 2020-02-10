'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmitter = require('component-emitter2');
var C = require('../constants/constants');
var ResubscribeNotifier = require('../utils/resubscribe-notifier');

function validateArguments(userId, callback, defaultAction) {
  if (typeof userId === 'function' && callback === undefined) {
    callback = userId; // eslint-disable-line
    userId = defaultAction; // eslint-disable-line
  } else if (userId === undefined && callback === undefined) {
    userId = defaultAction; // eslint-disable-line
  } else {
    userId = [userId]; // eslint-disable-line
  }

  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  return { userId: userId, callback: callback };
}

/**
 * The main class for presence in deepstream
 *
 * Provides the presence interface and handles incoming messages
 * on the presence topic
 *
 * @param {Object} options deepstream configuration options
 * @param {Connection} connection
 * @param {Client} client
 *
 * @constructor
 * @public
 */
module.exports = function () {
  function PresenceHandler(options, connection, client) {
    _classCallCheck(this, PresenceHandler);

    this._options = options;
    this._connection = connection;
    this._client = client;
    this._queryEmitter = new EventEmitter();
    this._subscribeEmitter = new EventEmitter();
    this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
    this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
    this._counter = 1;

    this._flush = this._flush.bind(this);
    this._flushTimeout = null;
    this._pendingSubscribes = {};
    this._pendingUnsubscribes = {};
  }
  /**
   * Queries for clients logged into deepstream.
   *
   * @param   {Function} callback Will be invoked with an array of clients
   *
   * @public
   * @returns {void}
   */


  _createClass(PresenceHandler, [{
    key: 'getAll',
    value: function getAll(users, callback) {
      if (typeof users === 'function') {
        this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.QUERY, [C.ACTIONS.QUERY]);
        this._queryEmitter.once(C.ACTIONS.QUERY, users);
      } else {
        var queryId = this._counter++;
        this._connection.sendMsg(C.TOPIC.PRESENCE, C.ACTIONS.QUERY, [queryId, users]);
        this._queryEmitter.once(queryId, callback);
      }
    }

    /**
     * Subscribes to client logins or logouts in deepstream
     *
     * @param   {Function} callback Will be invoked with the username of a client,
     *                              and a boolean to indicate if it was a login or
     *                              logout event
     * @public
     * @returns {void}
     */

  }, {
    key: 'subscribe',
    value: function subscribe(userId, callback) {
      var args = validateArguments(userId, callback, C.ACTIONS.SUBSCRIBE);
      if (!this._subscribeEmitter.hasListeners(args.userId)) {
        if (args.userId === C.ACTIONS.SUBSCRIBE) {
          this._sendGlobalSubscription(C.ACTIONS.SUBSCRIBE);
          this._subscribeEmitter.on(C.ACTIONS.SUBSCRIBE, args.callback);
        } else {
          delete this._pendingUnsubscribes[args.userId];
          this._pendingSubscribes[args.userId] = true;
          if (!this._flushTimeout) {
            this._flushTimeout = setTimeout(this._flush, 0);
          }
          this._subscribeEmitter.on(args.userId, args.callback);
        }
      }
    }

    /**
     * Removes a callback for a specified presence event
     *
     * @param   {Function} callback The callback to unregister via {PresenceHandler#unsubscribe}
     *
     * @public
     * @returns {void}
     */

  }, {
    key: 'unsubscribe',
    value: function unsubscribe(userId, callback) {
      var args = validateArguments(userId, callback, C.ACTIONS.UNSUBSCRIBE);

      if (args.userId === C.ACTIONS.UNSUBSCRIBE) {
        this._subscribeEmitter.off(C.ACTIONS.SUBSCRIBE, args.callback);
      } else {
        this._subscribeEmitter.off(args.userId, args.callback);
      }

      if (!this._subscribeEmitter.hasListeners(args.userId)) {
        if (args.userId === C.ACTIONS.UNSUBSCRIBE) {
          this._sendGlobalSubscription(C.ACTIONS.UNSUBSCRIBE);
        } else {
          delete this._pendingSubscribes[args.userId];
          this._pendingUnsubscribes[args.userId] = true;
          if (!this._flushTimeout) {
            this._flushTimeout = setTimeout(this._flush, 0);
          }
        }
      }
    }

    /**
     * Handles incoming messages from the server
     *
     * @param   {Object} message parsed deepstream message
     *
     * @package private
     * @returns {void}
     */

  }, {
    key: '_$handle',
    value: function _$handle(message) {
      if (message.action === C.ACTIONS.ERROR && message.data[0] === C.EVENT.MESSAGE_DENIED) {
        this._ackTimeoutRegistry.remove(C.TOPIC.PRESENCE, message.data[1]);
        message.processedError = true;
        this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.MESSAGE_DENIED, message.data[1]);
      } else if (message.action === C.ACTIONS.ACK) {
        this._ackTimeoutRegistry.clear(message);
      } else if (message.action === C.ACTIONS.PRESENCE_JOIN) {
        this._subscribeEmitter.emit(C.ACTIONS.SUBSCRIBE, message.data[0], true);
        this._subscribeEmitter.emit(message.data[0], true, message.data[0]);
      } else if (message.action === C.ACTIONS.PRESENCE_LEAVE) {
        this._subscribeEmitter.emit(C.ACTIONS.SUBSCRIBE, message.data[0], false);
        this._subscribeEmitter.emit(message.data[0], false, message.data[0]);
      } else if (message.action === C.ACTIONS.QUERY) {
        try {
          var data = JSON.parse(message.data[1]);
          if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
            this._queryEmitter.emit(message.data[0], data);
            return;
          }
        } catch (e) {
          // not json, old event
        }
        this._queryEmitter.emit(C.ACTIONS.QUERY, message.data);
      } else {
        this._client._$onError(C.TOPIC.PRESENCE, C.EVENT.UNSOLICITED_MESSAGE, message.action);
      }
    }

    /**
     * Resubscribes to presence subscription when connection is lost
     *
     * @package private
     * @returns {void}
     */

  }, {
    key: '_resubscribe',
    value: function _resubscribe() {
      var callbacks = Object.keys(this._subscribeEmitter._callbacks || {});
      if (callbacks.indexOf(C.ACTIONS.SUBSCRIBE) > -1) {
        callbacks.splice(callbacks.indexOf(C.ACTIONS.SUBSCRIBE), 1);
        this._sendGlobalSubscription(C.ACTIONS.SUBSCRIBE);
      }
      if (callbacks.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.SUBSCRIBE, callbacks);
      }
    }
  }, {
    key: '_flush',
    value: function _flush() {
      var pendingSubscribes = Object.keys(this._pendingSubscribes);
      if (pendingSubscribes.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.SUBSCRIBE, pendingSubscribes);
        this._pendingSubscribes = {};
      }
      var pendingUnsubscribes = Object.keys(this._pendingUnsubscribes);
      if (pendingUnsubscribes.length > 0) {
        this._sendSubscriptionBulk(C.ACTIONS.UNSUBSCRIBE, pendingUnsubscribes);
        this._pendingUnsubscribes = {};
      }
      this._flushTimeout = null;
    }
  }, {
    key: '_sendSubscriptionBulk',
    value: function _sendSubscriptionBulk(action, names) {
      var correlationId = this._counter++;
      this._ackTimeoutRegistry.add({
        topic: C.TOPIC.PRESENCE,
        action: action,
        name: correlationId
      });
      this._connection.sendMsg(C.TOPIC.PRESENCE, action, [correlationId, names]);
    }
  }, {
    key: '_sendGlobalSubscription',
    value: function _sendGlobalSubscription(action) {
      this._ackTimeoutRegistry.add({
        topic: C.TOPIC.PRESENCE,
        action: action,
        name: action
      });
      this._connection.sendMsg(C.TOPIC.PRESENCE, action, [action]);
    }
  }]);

  return PresenceHandler;
}();