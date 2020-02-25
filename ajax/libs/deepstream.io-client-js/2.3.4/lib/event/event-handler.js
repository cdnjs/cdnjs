'use strict';

var messageBuilder = require('../message/message-builder');
var messageParser = require('../message/message-parser');
var ResubscribeNotifier = require('../utils/resubscribe-notifier');
var C = require('../constants/constants');
var Listener = require('../utils/listener');
var EventEmitter = require('component-emitter2');

/**
 * This class handles incoming and outgoing messages in relation
 * to deepstream events. It basically acts like an event-hub that's
 * replicated across all connected clients.
 *
 * @param {Object} options    deepstream options
 * @param {Connection} connection
 * @param {Client} client
 * @public
 * @constructor
 */
var EventHandler = function EventHandler(options, connection, client) {
  this._options = options;
  this._connection = connection;
  this._client = client;
  this._emitter = new EventEmitter();
  this._listener = {};
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._resubscribeNotifier = new ResubscribeNotifier(this._client, this._resubscribe.bind(this));
};

EventHandler.prototype.eventNames = function () {
  return this._emitter.eventNames();
};

/**
 * Subscribe to an event. This will receive both locally emitted events
 * as well as events emitted by other connected clients.
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.subscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.SUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [name]);
  }

  this._emitter.on(name, callback);
};

/**
 * Removes a callback for a specified event. If all callbacks
 * for an event have been removed, the server will be notified
 * that the client is unsubscribed as a listener
 *
 * @param   {String}   name
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unsubscribe = function (name, callback) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }
  if (callback !== undefined && typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }
  this._emitter.off(name, callback);

  if (!this._emitter.hasListeners(name)) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.ACTIONS.UNSUBSCRIBE,
      name: name
    });
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.UNSUBSCRIBE, [name]);
  }
};

/**
 * Emits an event locally and sends a message to the server to
 * broadcast the event to the other connected clients
 *
 * @param   {String} name
 * @param   {Mixed} data will be serialized and deserialized to its original type.
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.emit = function (name, data) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new Error('invalid argument name');
  }

  this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.EVENT, [name, messageBuilder.typed(data)]);
  this._emitter.emit(name, data);
};

/**
 * Allows to listen for event subscriptions made by this or other clients. This
 * is useful to create "active" data providers, e.g. providers that only provide
 * data for a particular event if a user is actually interested in it
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.listen = function (pattern, callback) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }
  if (typeof callback !== 'function') {
    throw new Error('invalid argument callback');
  }

  if (this._listener[pattern] && !this._listener[pattern].destroyPending) {
    this._client._$onError(C.TOPIC.EVENT, C.EVENT.LISTENER_EXISTS, pattern);
    return;
  } else if (this._listener[pattern]) {
    this._listener[pattern].destroy();
  }

  this._listener[pattern] = new Listener(C.TOPIC.EVENT, pattern, callback, this._options, this._client, this._connection);
};

/**
 * Removes a listener that was previously registered with listenForSubscriptions
 *
 * @param   {String}   pattern  A combination of alpha numeric characters and wildcards( * )
 * @param   {Function} callback
 *
 * @public
 * @returns {void}
 */
EventHandler.prototype.unlisten = function (pattern) {
  if (typeof pattern !== 'string' || pattern.length === 0) {
    throw new Error('invalid argument pattern');
  }

  var listener = this._listener[pattern];

  if (listener && !listener.destroyPending) {
    listener.sendDestroy();
  } else if (this._listener[pattern]) {
    this._ackTimeoutRegistry.add({
      topic: C.TOPIC.EVENT,
      action: C.EVENT.UNLISTEN,
      name: pattern
    });
    this._listener[pattern].destroy();
    delete this._listener[pattern];
  } else {
    this._client._$onError(C.TOPIC.RECORD, C.EVENT.NOT_LISTENING, pattern);
  }
};

/**
 * Handles incoming messages from the server
 *
 * @param   {Object} message parsed deepstream message
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._$handle = function (message) {
  var name = message.data[message.action === C.ACTIONS.ACK ? 1 : 0];

  if (message.action === C.ACTIONS.EVENT) {
    if (message.data && message.data.length === 2) {
      this._emitter.emit(name, messageParser.convertTyped(message.data[1], this._client));
    } else {
      this._emitter.emit(name);
    }
    return;
  }

  if (message.action === C.ACTIONS.ACK && message.data[0] === C.ACTIONS.UNLISTEN && this._listener[name] && this._listener[name].destroyPending) {
    this._listener[name].destroy();
    delete this._listener[name];
    return;
  } else if (this._listener[name]) {
    this._listener[name]._$onMessage(message);
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    // An unlisten ACK was received before an PATTERN_REMOVED which is a valid case
    return;
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_HAS_PROVIDER) {
    // record can receive a HAS_PROVIDER after discarding the record
    return;
  }

  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
    return;
  }

  if (message.action === C.ACTIONS.ERROR) {
    if (message.data[0] === C.EVENT.MESSAGE_DENIED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: message.data[2]
      });
    } else if (message.data[0] === C.EVENT.NOT_SUBSCRIBED) {
      this._ackTimeoutRegistry.remove({
        topic: C.TOPIC.EVENT,
        name: message.data[1],
        action: C.ACTIONS.UNSUBSCRIBE
      });
    }
    message.processedError = true;
    this._client._$onError(C.TOPIC.EVENT, message.data[0], message.data[1]);
    return;
  }

  this._client._$onError(C.TOPIC.EVENT, C.EVENT.UNSOLICITED_MESSAGE, name);
};

/**
 * Resubscribes to events when connection is lost
 *
 * @package private
 * @returns {void}
 */
EventHandler.prototype._resubscribe = function () {
  var callbacks = this._emitter._callbacks;
  for (var eventName in callbacks) {
    this._connection.sendMsg(C.TOPIC.EVENT, C.ACTIONS.SUBSCRIBE, [eventName]);
  }
};

module.exports = EventHandler;