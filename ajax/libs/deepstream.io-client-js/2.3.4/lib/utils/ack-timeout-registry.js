'use strict';

var C = require('../constants/constants');
var EventEmitter = require('component-emitter2');

/**
 * Subscriptions to events are in a pending state until deepstream acknowledges
 * them. This is a pattern that's used by numerour classes. This registry aims
 * to centralise the functionality necessary to keep track of subscriptions and
 * their respective timeouts.
 *
 * @param {Client} client          The deepstream client
 * @param {String} topic           Constant. One of C.TOPIC
 * @param {Number} timeoutDuration The duration of the timeout in milliseconds
 *
 * @extends {EventEmitter}
 * @constructor
 */
var AckTimeoutRegistry = function AckTimeoutRegistry(client, options) {
  this._options = options;
  this._client = client;
  this._register = {};
  this._counter = 1;
  client.on('connectionStateChanged', this._onConnectionStateChanged.bind(this));
};

EventEmitter(AckTimeoutRegistry.prototype); // eslint-disable-line

/**
 * Add an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {Number} The timeout identifier
 */
AckTimeoutRegistry.prototype.add = function (timeout) {
  var timeoutDuration = timeout.timeout || this._options.subscriptionTimeout;

  if (this._client.getConnectionState() !== C.CONNECTION_STATE.OPEN || timeoutDuration < 1) {
    return -1;
  }

  this.remove(timeout);
  timeout.ackId = this._counter++;
  timeout.event = timeout.event || C.EVENT.ACK_TIMEOUT;
  timeout.__timeout = setTimeout(this._onTimeout.bind(this, timeout), timeoutDuration);
  this._register[this._getUniqueName(timeout)] = timeout;
  return timeout.ackId;
};

/**
 * Remove an entry
 *
 * @param {String} name An identifier for the subscription, e.g. a record name or an event name.
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.remove = function (timeout) {
  if (timeout.ackId) {
    for (var uniqueName in this._register) {
      if (timeout.ackId === this._register[uniqueName].ackId) {
        this.clear({
          topic: this._register[uniqueName].topic,
          action: this._register[uniqueName].action,
          data: [this._register[uniqueName].name]
        });
      }
    }
  }

  if (this._register[this._getUniqueName(timeout)]) {
    this.clear({
      topic: timeout.topic,
      action: timeout.action,
      data: [timeout.name]
    });
  }
};

/**
 * Processes an incoming ACK-message and removes the corresponding subscription
 *
 * @param   {Object} message A parsed deepstream ACK message
 *
 * @public
 * @returns {void}
 */
AckTimeoutRegistry.prototype.clear = function (message) {
  var uniqueName = void 0;
  if (message.action === C.ACTIONS.ACK && message.data.length > 1) {
    uniqueName = message.topic + message.data[0] + (message.data[1] ? message.data[1] : '');
  } else {
    uniqueName = message.topic + message.action + message.data[0];
  }

  if (this._register[uniqueName]) {
    clearTimeout(this._register[uniqueName].__timeout);
  }

  delete this._register[uniqueName];
};

/**
 * Will be invoked if the timeout has occured before the ack message was received
 *
 * @param {Object} name The timeout object registered
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onTimeout = function (timeout) {
  delete this._register[this._getUniqueName(timeout)];

  if (timeout.callback) {
    delete timeout.__timeout;
    delete timeout.timeout;
    timeout.callback(timeout);
  } else {
    var msg = 'No ACK message received in time' + (timeout.name ? ' for ' + timeout.name : '');
    this._client._$onError(timeout.topic, timeout.event, msg);
  }
};

/**
 * Returns a unique name from the timeout
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._getUniqueName = function (timeout) {
  return timeout.topic + timeout.action + (timeout.name ? timeout.name : '');
};

/**
 * Remote all timeouts when connection disconnects
 *
 * @private
 * @returns {void}
 */
AckTimeoutRegistry.prototype._onConnectionStateChanged = function (connectionState) {
  if (connectionState !== C.CONNECTION_STATE.OPEN) {
    for (var uniqueName in this._register) {
      clearTimeout(this._register[uniqueName].__timeout);
    }
  }
};

module.exports = AckTimeoutRegistry;