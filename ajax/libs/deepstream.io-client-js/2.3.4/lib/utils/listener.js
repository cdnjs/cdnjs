'use strict';

var C = require('../constants/constants');
var ResubscribeNotifier = require('./resubscribe-notifier');

/*
 * Creates a listener instance which is usedby deepstream Records and Events.
 *
 * @param {String} topic                 One of CONSTANTS.TOPIC
 * @param {String} pattern              A pattern that can be compiled via new RegExp(pattern)
 * @param {Function} callback           The function which is called when pattern was found and
 *                                      removed
 * @param {Connection} Connection       The instance of the server connection
 * @param {Object} options              Deepstream options
 * @param {Client} client               deepstream.io client
 *
 * @constructor
 */
var Listener = function Listener(topic, pattern, callback, options, client, connection) {
  this._topic = topic;
  this._callback = callback;
  this._pattern = pattern;
  this._options = options;
  this._client = client;
  this._connection = connection;
  this._ackTimeoutRegistry = client._$getAckTimeoutRegistry();
  this._ackTimeoutRegistry.add({
    topic: this._topic,
    name: pattern,
    action: C.ACTIONS.LISTEN
  });

  this._resubscribeNotifier = new ResubscribeNotifier(client, this._sendListen.bind(this));
  this._sendListen();
  this.destroyPending = false;
};

Listener.prototype.sendDestroy = function () {
  this.destroyPending = true;
  this._connection.sendMsg(this._topic, C.ACTIONS.UNLISTEN, [this._pattern]);
  this._resubscribeNotifier.destroy();
};

/*
 * Resets internal properties. Is called when provider cals unlisten.
 *
 * @returns {void}
 */
Listener.prototype.destroy = function () {
  this._callback = null;
  this._pattern = null;
  this._client = null;
  this._connection = null;
};

/*
 * Accepting a listener request informs deepstream that the current provider is willing to
 * provide the record or event matching the subscriptionName . This will establish the current
 * provider as the only publisher for the actual subscription with the deepstream cluster.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.accept = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_ACCEPT, [this._pattern, name]);
};

/*
 * Rejecting a listener request informs deepstream that the current provider is not willing
 * to provide the record or event matching the subscriptionName . This will result in deepstream
 * requesting another provider to do so instead. If no other provider accepts or exists, the
 * record will remain unprovided.
 * Either accept or reject needs to be called by the listener, otherwise it prints out a
 * deprecated warning.
 *
 * @returns {void}
 */
Listener.prototype.reject = function (name) {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN_REJECT, [this._pattern, name]);
};

/*
 * Wraps accept and reject as an argument for the callback function.
 *
 * @private
 * @returns {Object}
 */
Listener.prototype._createCallbackResponse = function (message) {
  return {
    accept: this.accept.bind(this, message.data[1]),
    reject: this.reject.bind(this, message.data[1])
  };
};

/*
 * Handles the incomming message.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._$onMessage = function (message) {
  if (message.action === C.ACTIONS.ACK) {
    this._ackTimeoutRegistry.clear(message);
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_FOUND) {
    this._callback(message.data[1], true, this._createCallbackResponse(message));
  } else if (message.action === C.ACTIONS.SUBSCRIPTION_FOR_PATTERN_REMOVED) {
    this._callback(message.data[1], false);
  } else {
    this._client._$onError(this._topic, C.EVENT.UNSOLICITED_MESSAGE, message.data[0] + '|' + message.data[1]);
  }
};

/*
 * Sends a C.ACTIONS.LISTEN to deepstream.
 *
 * @private
 * @returns {void}
 */
Listener.prototype._sendListen = function () {
  this._connection.sendMsg(this._topic, C.ACTIONS.LISTEN, [this._pattern]);
};

module.exports = Listener;